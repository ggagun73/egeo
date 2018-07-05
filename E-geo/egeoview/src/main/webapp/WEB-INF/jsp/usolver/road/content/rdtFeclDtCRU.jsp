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
  * @Description : RDT_FECL_DT 도로점용료산정기준
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
	
		if( sAction === 'INSERT' || sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			$('.activeWindow').find('.visInsert').hide();
			$('.activeWindow').find('.disInsert').show();
			
			BOOK.fn_edit_mode();
			
		}else if( sAction === 'ADD_INSERT' || sAction === "ADD_BATCHUP"){
				
				$('.activeWindow').find('.disBatchUp').hide();
				$('.activeWindow').find('.visBatchUp').show();
				$('.activeWindow').find('.visInsert').show();
				$('.activeWindow').find('.disInsert').hide();
				
				$('.activeWindow').find('form').attr('id', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );		
				$('.activeWindow').find('form').attr('name', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );	
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
<input type="hidden" id="openerId" name="openerId" value='<c:out value="${openerId}"/>' />
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="JMY_IDN" name="JMY_IDN" value="<c:out value="${result.jmyIdn}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="JMY_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<!-- tab -->
			<div class="TabArea">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
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
						<div class="Table_left">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>점용물관리코드</th>
									<td colspan="3"><select name="JYP_CDE" id="JYP_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${jyp_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.jypCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>											
								</tr>
								<tr>
									<th>점용단위</th>
									<td><select name="UNT_CDE" id="UNT_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${unt_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.untCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>기간단위</th>
									<td><select name="POD_CDE" id="POD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${pod_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.podCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
								</tr>
								<tr>
									<th>점용료단가</th>
									<td colspan="3"><input type="text" name="UST_AMT" id="UST_AMT" value='<c:out value="${result.ustAmt}"/>' class="input MX_11 DT_INT" /> 원</td>											
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
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