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
  * @Description : RDL_PAVE_AS  도로포장대장
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
		BOOK.fn_create_datepickerLinked("frm_detail", "SPV_YMD", "EPV_YMD" , 10);
		
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");				
		
		if( sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			$('.activeWindow').find('.visInsert').hide();
			BOOK.fn_edit_mode();
			
		}else if( sAction === "INSERT"){
				
				$('.activeWindow').find('.disBatchUp').hide();
				$('.activeWindow').find('.visBatchUp').hide();
				$('.activeWindow').find('.disInsert').hide();
				$('.activeWindow').find('.visInsert').show();
				BOOK.fn_edit_mode();
				
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();				
			$('.activeWindow').find('.visInsert').hide();
			BOOK.fn_view_mode();
			
		}
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
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="SEC_IDN" name="SEC_IDN" value="<c:out value="${result.secIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="FTR_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg disInsert">
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
						<security:authorize ifAnyGranted ="ROLE_ROAD_MAP_VIEW" >
						<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize>
					</ul>
				</div>
				<!-- // tab -->
				<!-- _Tab1 -->								
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Btn_pd2">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>				
						<div class="Table_left" style="height:210px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr class="visInsert">
									<th>지형지물부호</th>
									<td><select name="FTR_CDE" id="FTR_CDE" class="select">
											<option value=""></option>											
											<c:forEach var="selectData" items="${ftr_cde_list}">
												<c:if test="${selectData.CODE eq 'AZ900' || selectData.CODE eq 'AZ901' }">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.ftrCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
												</c:if>
											</c:forEach>
											</select>
									 </td>
									 <th>도엽번호</th>
									 <td><input type="text" readOnly name="SHT_NUM" id="SHT_NUM" value="<c:out value="${result.shtNum}"/>" class="input CS_10" /></td>
								</tr>
								<tr>
									<th>관리기관</th>
									<td><select name="MNG_CDE" id="MNG_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mng_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mngCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
									 <th>행정읍/면/동</th>
									 <td><select name="HJD_CDE" id="HJD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${hjd_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
								</tr>
								<tr>
									<th>공사번호</th>
									<td><input type="text" readOnly name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10" />
                          					 <a href="#" onclick="BOOK.fn_open_searchNum('RDT_CONS_MA','CNT_NUM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          					 <a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
                          			<th>도로구간번호</th>
									<td><input type="text"  name="SEC_IDN" id="SEC_IDN" value="<c:out value="${result.secIdn}"/>" class="input CS_10" /></td>
								</tr>
								<tr>
									<th>대장초기화여부</th>
									<td colspan="3"><select name="SYS_CHK" id="SYS_CHK"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${sys_chk_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sysChk}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2  시설정보-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd2">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>				
						<div class="Table_left" style="height:210px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>보수종류</th>
									<td><select name="MNC_CDE" id="MNC_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mnc_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mncCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
									 <th>보수공종</th>
									 <td><select name="MNS_CDE" id="MNS_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mns_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mnsCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
								</tr>
								<tr>
									<th>차도포장재질</th>
									<td><select name="ADD_CDE" id="ADD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${add_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.addCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
									 <th>보도포장재질</th>
									 <td><select name="PAV_CDE" id="PAV_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${pav_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.pavCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
								</tr>
								<tr>
									<th>이전차도포장재질</th>
									<td><select name="BAD_CDE" id="BAD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${bad_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.badCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
									 <th>이전보도포장재질</th>
									 <td><select name="BPV_CDE" id="BPV_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${bpv_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.bpvCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
											</select>
									 </td>
								</tr>
								<tr>
									<th>연장</th>
									<td colspan="3"><input type="text"  name="PAV_LEN" id="PAV_LEN" value="<c:out value="${result.pavLen}"/>"  class="input MX_5 DT_FLOAT DD_2" />m</td>
								</tr>
								<tr>
									<th>면적</th>
									<td><input type="text"  name="PAV_ARA" id="PAV_ARA" value="<c:out value="${result.pavAra}"/>"  class="input MX_10 DT_FLOAT DD_2" />㎡</td>
									<th>폭원</th>
									<td><input type="text"  name="PAV_WID" id="PAV_WID" value="<c:out value="${result.pavWid}"/>"  class="input MX_5 DT_FLOAT DD_2" /></td>
								</tr>
								<tr>
									<th>시작일</th>
									<td><input type="text" readOnly name="SPV_YMD" id="SPV_YMD" value="<c:out value="${result.spvYmd}"/>" class="input DT_DATE" /></td>
									<th>종료일</th>
									<td><input type="text" readOnly name="EPV_YMD" id="EPV_YMD" value="<c:out value="${result.epvYmd}"/>" class="input DT_DATE" /></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->				
			</div>			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','CNT_NUM')">공사대장</a></div>
				<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_PRINT" >
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