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
  * @Description : RDT_IPCR_DT  도로중심선교점관리
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
		
		var sWinId = "${nJDSKSubId}";
		
		if( sWinId === "" ) sWinId = $('.activeWindow').find('#nJDSKSubId').attr('value');
		
		// 1 )달력
		
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");				
		
		if( sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			BOOK.fn_edit_mode();
			
		}else if( sAction === "INSERT"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disInsert').hide();
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			BOOK.fn_view_mode();
			BOOK.fn_get_gridAddInfo("RDT_ROUT_DT");			//노선정보
	
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
<input type="hidden" id="IPC_IDN" name="IPC_IDN" value="<c:out value="${result.ipcIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="IPC_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg disInsert">
				<dl class="disBatchUp">
					<dt>도로중심선교점관리번호</dt>
					<dd><c:out value="${result.ipcIdn}" /></dd>
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
						<li class="_Tab2"><a href="#" class="Tab disBatchUp">노선정보</a></li>
						<%-- <security:authorize ifAnyGranted ="ROLE_ROAD_MAP_VIEW" >
						<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize> --%>
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
						<div class="Table_left" style="height:169px">		
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>교각IA1도</th>
									<td><input type="text" name="ANG_IDO" id="ANG_IDO" value='<c:out value="${result.angIdo}"/>' class="input MX_3 DT_INT" /> </td>		
				                    <th>곡선반경</th>
									<td><input type="text" name="CUR_RAD" id="CUR_RAD" value='<c:out value="${result.curRad}"/>' class="input MX_7 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>교각IA1분</th>
									<td><input type="text" name="ANG_IBN" id="ANG_IBN" value='<c:out value="${result.angIbn}"/>' class="input MX_2 DT_INT" /> </td>		
				                    <th>접선장</th>
									<td><input type="text" name="TGT_LEN" id="TGT_LEN" value='<c:out value="${result.tgtLen}"/>' class="input MX_10 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>교각IA1초</th>
									<td><input type="text" name="ANG_ICH" id="ANG_ICH" value='<c:out value="${result.angIch}"/>' class="input MX_2 DT_INT" /> </td>		
				                    <th>곡선장</th>
									<td><input type="text" name="CUR_LEN" id="CUR_LEN" value='<c:out value="${result.curLen}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>확폭</th>
									<td><input type="text" name="POK_WID" id="POK_WID" value='<c:out value="${result.pokWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>중앙종거</th>
									<td><input type="text" name="MID_LEN" id="MID_LEN" value='<c:out value="${result.mibWid}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>대장초기화여부</th>
									<td colspan="3" ><select name="SYS_CHK" id="SYS_CHK"  class="select" >
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
				<!-- _Tab2  노선정보-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3"> 
							<div class="Btn"></div>
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03"  onclick="BOOK.fn_open_gridAddInfo('RDT_ROUT_DT','ADD_INSERT');">추가</a></div>
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_ROUT_DT','ADD_UPDATE');">수정</a></div>
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_delete_gridAddInfo('RDT_ROUT_DT');">삭제</a></div>
							</security:authorize>
						</div>
						<div class="TableBx2">
							<div class="Table_list2">
								<table id="gridRdtRoutDt<c:out value="${nJDSKSubId}"/>"></table>
							</div>
	 					</div>
					</div>
				</div>
				<!-- _Tab2 End -->				
			</div>			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDL_CTLR_LS','IPC_IDN')">도로구간</a></div>
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>