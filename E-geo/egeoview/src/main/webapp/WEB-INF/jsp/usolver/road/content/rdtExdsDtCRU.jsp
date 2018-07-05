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
  * @Description : RDT_EXDS_DT 도로굴착심의대장
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
		
		// 1) input, select 항목 init
		BOOK.fn_init_formObject($('.activeWindow').find('form').attr('id'));
	
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");	
	
		// 3)달력
		BOOK.fn_create_datepicker("frm_detail","DIS_YMD", 10); // 굴착시작일
		BOOK.fn_create_datepicker("frm_detail","DIE_YMD", 10); // 굴착종료일
		
		if( sAction === 'INSERT' || sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			$('.activeWindow').find('.Table_left').attr('style','height:160px');
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
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
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="GLA_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<!-- tab -->
			<div class="TabArea">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
						<li class="_Tab2"><a href="#" class="Tab">심의내용</a></li>
					</ul>
				</div>
				<!-- // tab -->
				<!-- _Tab1 일반사항 -->		
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="overflow-x:hidden;height:190px;">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>분기번호</th>
									<td colspan="3"><select name="CIR_CDE" id="CIR_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${cir_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.cirCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>											
								</tr>
								<tr>
									<th>굴착시작일</th>
									<td><input type="text" name="DIS_YMD" id="DIS_YMD" value="<c:out value="${result.disYmd}"/>" class="input DT_DATE" />
									<th>굴착종료일</th>
									<td><input type="text" name="DIE_YMD" id="DIE_YMD" value="<c:out value="${result.dieYmd}"/>" class="input DT_DATE" />
								</tr>
								<tr>
									<th>굴착업체명</th>
									<td colspan="3"><input type="text" style="width:375px" name="CNB_NAM" id="CNB_NAM" value='<c:out value="${result.cnbNam}"/>' class="input MX_30 CS_30" /></td>											
								</tr>
								<tr>
									<th>사업개요</th>
									<td colspan="3"><textarea id="CNT_DES"  name="CNT_DES"  class="MX_100 CS_100" cols="70" rows="3"><c:out value="${result.cntDes}"/></textarea></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2 심의내용 -->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="overflow-x:hidden;height:190px;">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="37%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>심의번호</th>
									<td colspan="3"><input type="text" name="GLA_IDN" id="GLA_IDN" value='<c:out value="${result.glaIdn}"/>' class="input MX_10 CS_10" /></td>										
								</tr>
								<tr>
									<th>심의조정결과</th>
									<td colspan="3"><select name="CSD_CDE" id="CSD_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${csd_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.csdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>
								</tr>
								<tr>
									<th>심의조정내용</th>
									<%-- <td><input type="text" name="CSD_DES" id="CSD_DES" value='<c:out value="${result.csdDes}"/>' class="input MX_200 CS_200" /></td> --%>
									<td colspan="3"><textarea id="CSD_DES"  name="CSD_DES"  class="MX_200 CS_200" cols="70" rows="3"><c:out value="${result.csdDes}"/></textarea></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
			</div>
			<!-- TabArea End -->			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>