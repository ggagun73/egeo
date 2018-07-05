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
  * @Description : 
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
		BOOK.fn_create_datepicker("frm_detail","STR_YMD", 10); // 사용개시일
		
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
						<div class="Table_left">
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
									<th>사용개시일자</th>
									<td><input type="text" name="STR_YMD" id="STR_YMD" value="<c:out value="${result.strYmd}"/>" class="input DT_DATE" /></td>
								</tr>
								<tr>
									<th>배수구역명</th>
									<td><input type="text" name="ADR_NAM" id="ADR_NAM" value="<c:out value="${result.adrNam}"/>" class="input MX_20 CS_20 " /></td>
									<th>고시번호</th>
									<td><input type="text" name="NOT_NUM" id="NOT_NUM" value="<c:out value="${result.notNum}"/>" class="input MX_20 CS_20 " /></td>
								</tr>
								<tr>
									<th>배수구역면적</th>
									<td><input type="text" name="ADR_SIZ" id="ADR_SIZ" value="<c:out value="${result.adrSiz}"/>" class="input MX_6 CS_6 DD_INT" /> ㏊</td>
									<th>유입하천명</th>
									<td><input type="text" name="RIV_NAM" id="RIV_NAM" value="<c:out value="${result.rivNam}"/>" class="input MX_20 CS_20 " /></td>
								</tr>
								<tr>
									<th>유출계수</th>
									<td><input type="text" name="DRN_CNT" id="DRN_CNT" value="<c:out value="${result.drnCnt}"/>" class="input MX_5 CS_5 DT_FLOAT DD_2" /></td>
									<th>배수구역인구수</th>
									<td><input type="text" name="ADR_POP" id="ADR_POP" value="<c:out value="${result.adrPop}"/>" class="input MX_8 CS_8 DD_INT" /> 인</td>
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
			</div>			
			<!--  TabArea End -->
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
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