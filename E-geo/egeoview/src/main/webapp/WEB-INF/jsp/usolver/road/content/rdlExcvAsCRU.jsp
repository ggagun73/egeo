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
  * @Description : RDL_EXCV_AS 굴착허가위치
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
		BOOK.fn_init_formObject("frm");	
	
		// 3) 달력
		BOOK.fn_create_datepicker("frm","DIS_YMD", 10); 	//굴착시작일
		BOOK.fn_create_datepicker("frm","DIE_YMD", 10); 	//굴착종료일
		BOOK.fn_create_datepicker("frm","JYS_YMD", 10); 	//당해년도점용시작일
		BOOK.fn_create_datepicker("frm","JYE_YMD", 10); 	//당해년도점용종료일
		BOOK.fn_create_datepicker("frm","CHG_YMD", 10); 	//변경처리일
		BOOK.fn_create_datepicker("frm","RCV_YMD", 10); 	//원상복구 검사일
		
		if( sAction === "BATCHUP" || sAction === "INSERT"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			$('.activeWindow').find('.Table_left').attr('style','height:190px');
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
<form id="frm" name="frm" method="post" action="">
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
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="PMS_IDN" name="PMS_IDN" value="<c:out value="${result.pmsIdn}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="FTR_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl>
					<dt>허가일련번호</dt>
					<dd><c:out value="${result.pmsIdn}" /></dd>
				</dl>
				<dl class="visInsert">
					<dt>도로구간번호</dt>
					<dd><input type="hidden" id="SEC_IDN" name="SEC_IDN" value="<c:out value="${result.secIdn}"/>"/><c:out value="${result.secIdn}"/></dd>
				</dl>
			</div>
			<!-- tab -->
			<div class="TabArea">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
						<li class="_Tab2"><a href="#" class="Tab">일시점용</a></li>
						<li class="_Tab3"><a href="#" class="Tab">영구점용</a></li>
						<li class="_Tab4"><a href="#" class="Tab">허가조건</a></li>
						<li class="_Tab5"><a href="#" class="Tab disBatchUp">노선정보</a></li>
						<security:authorize ifAnyGranted ="ROLE_ROAD_MAP_VIEW" >
						<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize>
					</ul>
				</div>
				<!-- // tab -->
				<!-- _Tab1 일반사항 -->		
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick="BOOK.fn_insert_gridAddInfo('<c:out value='${TABLENAME}'/>')">저장</a></div>
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
									<th>행정읍/면/동</th>
									<td colspan="3"><select name="HJD_CDE" id="HJD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${hjd_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
								</tr>
								<tr>								
									<th>굴착시작일</th>
									<td><input type="text" name="DIS_YMD" id="DIS_YMD" value="<c:out value="${result.disYmd}"/>" class="input DT_DATE" /></td>
									<th>굴착종료일</th>
									<td><input type="text" name="DIE_YMD" id="DIE_YMD" value="<c:out value="${result.dieYmd}"/>" class="input DT_DATE" /></td>      
								</tr>
								<tr>
									<th>점용물관리코드</th>
									<td colspan="3"><select name="JYP_CDE" id="JYP_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${jyp_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.jypCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2 일시점용-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick="BOOK.fn_insert_gridAddInfo('<c:out value='${TABLENAME}'/>')">저장</a></div>
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
									<th>포장재질</th>
									<td><select name="ADD_CDE" id="ADD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${add_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.addCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>		
				                    <th>굴착폭</th>
									<td><input type="text" name="DIG_WID" id="DIG_WID" value='<c:out value="${result.digWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>
								</tr>
								<tr>
									<th>굴착길이</th>
									<td><input type="text" name="DIG_LEN" id="DIG_LEN" value='<c:out value="${result.digLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>	
				                    <th>굴착면적</th>
									<td><input type="text" name="DIG_ARA" id="DIG_ARA" value='<c:out value="${result.digAra}"/>' class="input MX_10 DT_FLOAT DD_2" /> ㎡</td>			                    
								</tr>
								<tr>
				                    <th>점용료</th>
									<td><input type="text" name="OCL_AMT" id="OCL_AMT" value='<c:out value="${result.oclAmt}"/>' class="input MX_11 DT_INT" /> 원</td>
									<th>간접손괴비-손괴비</th>
									<td><input type="text" name="ICL_AMT" id="ICL_AMT" value='<c:out value="${result.iclAmt}"/>' class="input MX_11 DT_INT" /> 원</td>			                    
										
								</tr>
								<tr>
									<th>산출내역</th>
									<td colspan="3"><input type="text" name="OCL_DES" id="OCL_DES" value='<c:out value="${result.oclDes}"/>' class="input MX_100 CS_100" /></td>
								</tr>
								<tr>
				                    <th>간접손괴비-산출내역</th>
									<td colspan="3"><input type="text" name="ICL_DES" id="ICL_DES" value='<c:out value="${result.iclDes}"/>' class="input MX_100 CS_100" /></td>		
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3  영구점용-->
				<div id="_Tab3" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick="BOOK.fn_insert_gridAddInfo('<c:out value='${TABLENAME}'/>')">저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="overflow-x:hidden;height:190px;">
							<table>
								<colgroup>
									<col width="16%" />
									<col width="37%" />
									<col width="16%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>심도</th>
									<td><input type="text" name="GUL_DEP" id="GUL_DEP" value='<c:out value="${result.gulDep}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>관경</th>
									<td><input type="text" name="PIP_DIP" id="PIP_DIP" value='<c:out value="${result.pipDip}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>				                    
								</tr>
								<tr>
									<th>재질</th>
									<td><select name="MAE_MOP" id="MAE_MOP" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mae_mop_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.maeMop}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>		
				                    <th>길이</th>
									<td><input type="text" name="PJG_LEN" id="PJG_LEN" value='<c:out value="${result.pjgLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>			                    
								</tr>
								<tr>
									<th>당해년도점용시작일</th>
									<td><input type="text" name="JYS_YMD" id="JYS_YMD" value="<c:out value="${result.jysYmd}"/>" class="input DT_DATE" /></td>		
				                    <th>당해년도점용종료일</th>
									<td><input type="text" name="JYE_YMD" id="JYE_YMD" value="<c:out value="${result.jyeYmd}"/>" class="input DT_DATE" /></td>				                    
								</tr>
								<tr>
									<th>당해년도산출내역</th>
									<td><input type="text" name="JYS_DES" id="JYS_DES" value='<c:out value="${result.jysDes}"/>' class="input MX_200 CS_200" /></td>		
									<th>당해년도점용료</th>
									<td><input type="text" name="JYS_AMT" id="JYS_AMT" value='<c:out value="${result.jysAmt}"/>' class="input MX_11 DT_INT" /> 원</td>		
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab3 End -->
				<!-- _Tab4 허가조건 -->
				<div id="_Tab4" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick="BOOK.fn_insert_gridAddInfo('<c:out value='${TABLENAME}'/>')">저장</a></div>
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
									<th>변경처리일</th>
									<td><input type="text" name="CHG_YMD" id="CHG_YMD" value="<c:out value="${result.chgYmd}"/>" class="input DT_DATE" /></td>
				                    <th>원상복구 검사일</th>
									<td><input type="text" name="RCV_YMD" id="RCV_YMD" value="<c:out value="${result.rcvYmd}"/>" class="input DT_DATE" /></td>		                    
								</tr>
								<tr>
									<th>공사유형코드</th>
									<td><select name="KNG_CDE" id="KNG_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${kng_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.kngCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>		
				                    <th>차도보도구분</th>
									<td><select name="CHB_CDE" id="CHB_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${chb_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.chbCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>				                    
								</tr>
								<tr>
									<th>허가조건이행사항</th>
									<td colspan="3"><input type="text" name="EXE_DES" id="EXE_DES" value='<c:out value="${result.exeDes}"/>' class="input MX_500 CS_500" /></td>		
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab4 End -->
				<!-- _Tab5 노선정보 -->
				<div id="_Tab5" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3"> 
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_RDWY_DT','ADD_INSERT');">추가</a></div>
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_RDWY_DT','ADD_UPDATE');">수정</a></div>
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
				<!-- _Tab6 End -->
			</div>
			<!-- TabArea End -->			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('<c:out value="${result.ftrCde}"/>','<c:out value="${result.ftrIdn}"/>','<c:out value="${result.cntNum}"/>','RDT_IMGE_ET');">도면/사진</a></div>
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>