<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : 
  * @Description :  WTL_META_PS  급수전계량기
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
		BOOK.fn_create_datepicker("frm_detail","IST_YMD" , 10);	//설치일자
		
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
		
			BOOK.fn_get_gridAddInfo("WTT_META_HT");			//계량기 교체이력
			
		}
		
		<security:authorize ifNotGranted="ROLE_WATER_BOOK_EDIT">
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
								<security:authorize ifAnyGranted ="ROLE_WATER_MAP_VIEW" >
								<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('WTL_META_PS','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
								</security:authorize>
							</ul>
						</div>
						<!-- // tab -->
						<!-- _Tab1 -->
						<div class="Btn_pd2">
							<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
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
										<tr>
											<th>행정읍/면/동</th>
											<td><select name="HJD_CDE" id="HJD_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${hjd_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>설치일자</th>
											<td><input type="text" name="IST_YMD" id="IST_YMD" value="<c:out value="${result.istYmd}"/>" class="input DT_DATE" />
											<input type="hidden" id="DATE_IST" value="<c:out value="${result.istYmd}"/>"/></td>
										</tr>
										<tr>
											<th>공사번호</th>
											<td colspan="3"><input type="text" name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10"  readonly />
                            									 <a href="#" onclick="BOOK.fn_open_searchNum('WTT_CONS_MA','CNT_NUM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                            									 <a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                            				</td>
										</tr>
										<tr>
											<th>대장초기화여부</th>
											<td colspan="3"><select name="SYS_CHK" id="SYS_CHK"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${sys_chk_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sysChk}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
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
											<th>수용가번호</th>
											<td><input type="text" name="HOM_NUM" id="HOM_NUM" value='<c:out value="${result.homNum}"/>' class="input MX_19 CS_19" /></td>
											<th>수용가성명</th>
											<td><input type="text" name="HOM_NAM" id="HOM_NAM" value='<c:out value="${result.homNam}"/>' class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>수용가행정읍/면/동</th>
											<td><select name="HOM_HJD" id="HOM_HJD"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${hom_hjd_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.homHjd}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select>
											</td>
											<th>수용가주소설명</th>
											<td><input type="text" name="HOM_ADR" id="HOM_ADR" value='<c:out value="${result.homAdr}"/>' class="input MX_50 CS_50" /></td>
										</tr>
										<tr>
											<th>가구수</th>
											<td><input type="text" name="HOM_CNT" id="HOM_CNT" value='<c:out value="${result.homCnt}"/>' class="input MX_4 CS_4 DT_INT DD_0" /></td>
											<th>업종</th>
											<td><select name="SBI_CDE" id="SBI_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${sbi_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sbiCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
										</tr>
										<tr>
											<th>계량기기물번호</th>
											<td><input type="text" name="MET_NUM" id="MET_NUM" value='<c:out value="${result.metNum}"/>' class="input MX_14 CS_14" /></td>
											<th>계량기구경</th>
											<td><input type="text" name="MET_DIP" id="MET_DIP" value='<c:out value="${result.metDip}"/>' class="input MX_4 CS_4 DT_INT DD_0" /></td>
										</tr>
										<tr>
											<th>계량기형식</th>
											<td><select name="MET_MOF" id="MET_MOF"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${met_mof_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.metMof}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>계량기제작회사명</th>
											<td><input type="text" name="PRD_NAM" id="PRD_NAM" value='<c:out value="${result.prdNam}"/>' class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>급수관지형지물부호</th>
											<td><select name="PIP_CDE" id="PIP_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${pip_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.pipCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>급수관관리번호</th>
											<td><input type="text" name="PIP_IDN" id="PIP_IDN" value='<c:out value="${result.pipIdn}"/>' class="input MX_10 CS_10"  readonly />
												  <a href="#" onclick="BOOK.fn_open_searchNum('WTL_SPLY_LS','PIP_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
												  <a href="#" onclick="BOOK.fn_del_searchNum('PIP_IDN','PIP_CDE');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>	
											</td>
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
								<li class="_TabSub1"><a href="#" class="Tab Tab_selected">계량기교체내역</a></li>
							</ul>
						</div>
						<div id="_TabSub1" class="PSection on">
							<div class="Btn_pd3">
								<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('WTT_META_HT');">추가</a></div>
								<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('WTT_META_HT','UPDATE');">수정</a></div>
								<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('WTT_META_HT');">삭제</a></div>
								</security:authorize>
							</div>
							<div class="TableBx2">
								<div class="Table_list2">
									<table id="gridWttMetaHt<c:out value='${nJDSKSubId}'/>"></table>
								</div>
							</div>
						</div>
						<!--  PSection End -->
					</div>
					<!--  TabArea End -->
					<div class="btnTline"><!--버튼구분자--></div>		
					<div class="Btn_R">
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTT_CONS_MA','CNT_NUM');">공사대장</a></div>
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTL_SPLY_LS','PIP_IDN');">급수관로대장</a></div>
						<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_PRINT" >
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
						</security:authorize>
						<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
					</div>					
				</div>
			</div>
		</div>
</form>
</body>
</html>
