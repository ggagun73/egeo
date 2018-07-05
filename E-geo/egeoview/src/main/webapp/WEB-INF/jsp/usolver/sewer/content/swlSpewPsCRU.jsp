<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : 
  * @Description :   SWL_SPEW_PS  토구대장
  * @Modification Information
  * 
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 지노
  * since 2014.07.10
  *  
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<script src="<c:url value='/js/usolver/book/init.js'/>"></script><!-- List Form init.js 랑 구분해야겠당..  -->
	<script type="text/javascript">
	
	// 페이지 로딩 초기 설정
	var sAction = "${action_flag}";
	$( document ).ready(function() {
		
		// 1 )달력
		BOOK.fn_create_datepicker("frm_detail","IST_YMD", 10); // 설치 일자
		BOOK.fn_create_datepicker("frm_detail","ECN_YMD", 10); // 최종준설일자
		
		
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");				
		
		if( sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			BOOK.fn_view_mode();
						
			BOOK.fn_get_gridAddInfo("SWT_SUTL_HT");			//유지보수내역조회
			
		}
		
		<security:authorize ifNotGranted="ROLE_SEWER_BOOK_EDIT">
			BOOK.fn_init_popup();
		</security:authorize> 
	});
</script>
</head>
<body>
<form id="frm_detail" name="frm_detail" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="screen_mode" name="screen_mode" value=""/>
<input type="hidden" id="callBackFunction" name="callBackFunction" value=""/>
<input type="hidden" id="nJDSKSubId" name="nJDSKSubId" value='<c:out value="${nJDSKSubId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>관리번호</dt>
					<dd><c:out value="${result.ftrIdn}" /></dd>
					<dt>도엽번호</dt>
					<dd><c:out value="${result.shtNum}" /></dd>
				</dl>
				<dl class="visBatchUp">
					<dt>선택된 시설물</dt>
					<dd><c:out value="${batch_cnt}"/>건</dd>
				</dl>
			</div>
			<!-- tab -->
			<div class="TabArea">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
						<li class="_Tab2"><a href="#" class="Tab">시설현황</a></li>
						<security:authorize ifAnyGranted ="ROLE_SEWER_MAP_VIEW" >
						<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize>
					</ul>
				</div>
				<!-- // tab -->
				<!-- _Tab1 -->				
				<div class="Btn_pd2">
					<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
					<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
					</security:authorize>
				</div>				
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Table_left" style="height:200px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr class='visInsert'>
									<th>관리기관</th>
									<td><select name="MNG_CDE" id="MNG_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mng_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mngCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>행정읍/면/동</th>
									<td><select name="HJD_CDE" id="HJD_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${hjd_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select></td>
								</tr>
								<tr>
									<th>설치일자</th>
									<td><input type="text" name="IST_YMD" id="IST_YMD" value="<c:out value="${result.istYmd}"/>" class="input DT_DATE" />
									<input type="hidden" id="DATE_IST" value="<c:out value="${result.istYmd}"/>"/></td>
									<th>대장초기화여부</th>
									<td><select name="SYS_CHK" id="SYS_CHK"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${sys_chk_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sysChk}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select></td>
								</tr>
								<tr>
									<th>공사번호</th>
									<td colspan="3"><input type="text" name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10"  readonly />
                          									 <a href="#" onclick="BOOK.fn_open_searchNum('SWT_CONS_MA','CNT_NUM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          									 <a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2  공사-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left" style="height:200px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>토구용도</th>
									<td><select name="VMT_CDE" id="VMT_CDE" class="select">
		                            <option value=""></option>
				                    	<c:forEach var="selectData" items="${vmt_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.vmtCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select></td>
				                    <th>방류천명</th>
									<td><input type="text" name="RIV_NAM" id="RIV_NAM" value='<c:out value="${result.rivNam}"/>' class="input MX_20" /> </td>				                    
								</tr>
								<tr>
									<th>토구형태</th>
									<td><select name="FOR_CDE" id="FOR_CDE" class="select">
		                            <option value=""></option>
				                    	<c:forEach var="selectData" items="${for_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.forCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select></td>
				                    <th>토구표고</th>
									<td><input type="text" name="SPW_HSL" id="SPW_HSL"  value='<c:out value="${result.spwHsl}"/>' class="input MX_7 DT_FLOAT DD_2" /> m</td>
								</tr>
								<tr>
									<th>계획방류량</th>
									<td><input type="text" name="SPW_VOL" id="SPW_VOL" value='<c:out value="${result.spwVol}"/>' class="input  MX_9 DT_FLOAT DD_2" /> ㎥</td>
									<th>평균수위</th>
									<td><input type="text" name="SPW_WAL" id="SPW_WAL" value='<c:out value="${result.spwWal}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>									
								</tr>
								<tr>
									<th>원형토구내경</th>
									<td><input type="text" name="SPW_DIP" id="SPW_DIP" value='<c:out value="${result.spwDip}"/>' class="input MX_4 DT_INT" /> mm</td>
									<th>배수구역관리번호</th>
									<td><input type="text" name="DRA_IDN" id="DRA_IDN" value='<c:out value="${result.draIdn}"/>'  class="input CS_10"  readonly /> 
										<a href="#" onclick="BOOK.fn_open_searchNum('SWL_AODR_AS','DRA_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
										<a href="#" onclick="BOOK.fn_del_searchNum('DRA_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
									</td>									
								</tr>	
								<tr>
									<th>각형토구가로길이</th>
									<td><input type="text" name="SPW_HOL" id="SPW_HOL" value='<c:out value="${result.spwHol}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>
									<th>처리구역관리번호</th>
									<td><input type="text" name="DSP_IDN" id="DSP_IDN" value='<c:out value="${result.dspIdn}"/>'  class="input CS_10"  readonly />
										<a href="#" onclick="BOOK.fn_open_searchNum('SWL_AODP_AS','DSP_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a> 
										<a href="#" onclick="BOOK.fn_del_searchNum('DSP_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
									</td>
								</tr>	
								<tr>
									<th>각형토구세로길이</th>
									<td><input type="text" name="SPW_VEL" id="SPW_VEL" value='<c:out value="${result.spwVel}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>	
									<th>방향각</th>
									<td><input type="text" name="ANG_DIR" id="ANG_DIR" value='<c:out value="${result.angDir}"/>' class="input MX_3 DT_INT" /> </td>								
								</tr>		
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->			
			</div>
			<!-- TabArea End -->
			<div class="TabArea disBatchUp">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_TabSub1"><a href="#" class="Tab Tab_selected">유지보수현황</a></li>
					</ul>
				</div>
				<div id="_TabSub1" class="PSection on">					
					<div class="Btn_pd3">
						<div class="Btn"></div>
						<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('SWT_SUTL_HT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('SWT_SUTL_HT','UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('SWT_SUTL_HT');">삭제</a></div>
						</security:authorize>
					</div>					
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridSwtSutlHt<c:out value='${nJDSKSubId}'/>"></table>
						</div>
					</div>
				</div>				
				<!--  PSection End -->
			</div>
			<!--  TabArea End -->
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('SWT_CONS_MA','CNT_NUM');">공사대장</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('SWL_AODR_AS','DRA_IDN');">배수구역</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('SWL_AODP_AS','DSP_IDN');">처리구역</a></div>
				<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_PRINT" >
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>