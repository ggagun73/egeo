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
  * @Description : RDL_OVPS_AS 육교관리
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
	
		if( sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			$('.activeWindow').find('.Table_left').attr('style','height:200px');
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			BOOK.fn_view_mode();
			
			BOOK.fn_get_gridAddInfo("RDT_PRSV_DT");			//도로일상보수
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
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="SEC_IDN" name="SEC_IDN" value="<c:out value="${result.secIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>관리번호</dt>
					<dd><c:out value="${result.ftrIdn}" /></dd>
				</dl>
				<dl class="visBatchUp">
					<dt>선택된 시설물</dt>
					<dd><c:out value="${batch_cnt}"/>건</dd>
				</dl>
				<dl class="disBatchUp">
					<dt>도엽번호</dt>
					<dd><input type="hidden" id="SHT_NUM" name="SHT_NUM" value="<c:out value="${result.shtNum}"/>"/><c:out value="${result.shtNum}"/></dd>
				</dl>
			</div>
			<!-- tab -->
			<div class="TabArea">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
						<li class="_Tab2"><a href="#" class="Tab">시설현황</a></li>
						<li class="_Tab3"><a href="#" class="Tab">규모</a></li>
						<li class="_Tab4"><a href="#" class="Tab disBatchUp">노선정보</a></li>
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
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="overflow-x:hidden;height:175px;">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>육교명</th>
									<td colspan="3"><input type="text" style="width:375px" name="PDS_NAM" id="PDS_NAM" value='<c:out value="${result.pdsNam}"/>' class="input MX_30 CS_30" /> </td>											
								</tr>
								<tr>
									<th>관리기관</th>
									<td><select name="MNG_CDE" id="MNG_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mng_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mngCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>관리자</th>
									<td><input type="text" name="MNG_NAM" id="MNG_NAM" value='<c:out value="${result.mngNam}"/>' class="input MX_30 CS_30" /></td>		
								</tr>
								<tr>
									<th>행정읍/면/동</th>
									<td><select name="HJD_CDE" id="HJD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${hjd_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>종별</th>
									<td><select name="FAC_CDE" id="FAC_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${fac_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.facCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
								</tr>
								<tr>								
									<th>구조물등급</th>
									<td><select name="GRD_CDE" id="GRD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${grd_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.grdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>공사번호</th>
									<td colspan="3"><input type="text" readOnly name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10" />
                          				<a href="#" onclick="BOOK.fn_open_searchNum('RDT_CONS_MA','CNT_NUM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
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
										</select>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2 시설현황 -->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="overflow-x:hidden;height:175px;">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="37%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>구체-상부구조</th>
									<td><select name="UTY_CDE" id="UTY_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${uty_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.utyCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>		
				                    <th>난간-재질</th>
									<td><select name="HDR_CDE" id="HDR_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${hdr_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hdrCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>			                    
								</tr>
								<tr>
									<th>구체-하부구조</th>
									<td><select name="DTY_CDE" id="DTY_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${dty_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.dtyCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>
				                    <th>난간-연장</th>
									<td><input type="text" name="HDR_LEN" id="HDR_LEN" value='<c:out value="${result.hdrLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>
								</tr>
								<tr>
									<th>통행제한높이</th>
									<td><input type="text" name="LIM_HIT" id="LIM_HIT" value='<c:out value="${result.limHit}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>난간-높이</th>
									<td><input type="text" name="HDR_HIT" id="HDR_HIT" value='<c:out value="${result.hdrHit}"/>' class="input MX_10 DT_FLOAT DD_2" /> m</td>			                    
								</tr>
								<tr>
									<th>설계활하중</th>
									<td><select name="DWG_CDE" id="DWG_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${dwg_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.dwgCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>
				                    <th>난간-면적</th>
									<td><input type="text" name="HDR_ARA" id="HDR_ARA" value='<c:out value="${result.hdrAra}"/>' class="input MX_10 DT_FLOAT DD_2" /> ㎡</td>
								</tr>
								<tr>
				                    <th>총연장</th>
									<td><input type="text" name="PDS_LEN" id="PDS_LEN" value='<c:out value="${result.pdsLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>
									<th>장애자램프유무</th>
									<td><select name="HOS_CDE" id="HOS_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${hos_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hosCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>				                    
								</tr>
								<tr>
									<th>장애자램프경사도</th>
									<td colspan="3"><input type="text" name="HOS_ANG" id="HOS_ANG" value='<c:out value="${result.hosAng}"/>' class="input MX_5 DT_FLOAT DD_2" /></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3 규모 -->
				<div id="_Tab3" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="overflow-x:hidden;height:175px;">
							<table>
								<colgroup>
									<col width="16%" />
									<col width="37%" />
									<col width="16%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>계단-개수</th>
									<td><input type="text" name="STR_CNT" id="STR_CNT" value='<c:out value="${result.strCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>구체-폭원</th>
									<td><input type="text" name="SPH_WID" id="SPH_WID" value='<c:out value="${result.sphWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>					                    
								</tr>
								<tr>
									<th>계단-폭원</th>
									<td><input type="text" name="STR_WID" id="STR_WID" value='<c:out value="${result.strWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>			
				                    <th>구체-연장</th>
									<td><input type="text" name="SPH_LEN" id="SPH_LEN" value='<c:out value="${result.sphLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>					                    
								</tr>
								<tr>
				                    <th>계단-연장</th>
									<td><input type="text" name="STR_LEN" id="STR_LEN" value='<c:out value="${result.strLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>				                    
									<th>구체-면적</th>
									<td><input type="text" name="SPH_ARA" id="SPH_ARA" value='<c:out value="${result.sphAra}"/>' class="input MX_10 DT_FLOAT DD_2" /> ㎡</td>	
								</tr>
								<tr>
									<th>계단-면적</th>
									<td colspan="3"><input type="text" name="STR_ARA" id="STR_ARA" value='<c:out value="${result.strAra}"/>' class="input MX_10 DT_FLOAT DD_2" /> ㎡</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab3 End -->
				<!-- _Tab4 노선정보 -->
				<div id="_Tab4" class="PSection">
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
				<!-- _Tab4 End -->
			</div>
			<!-- TabArea End -->			
			<div class="TabArea disBatchUp">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_TabSub1"><a href="#" class="Tab Tab_selected">유지보수이력</a></li>
					</ul>
				</div>
				<div id="_TabSub1" class="PSection on">					
					<div class="Btn_pd3">
						<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_PRSV_DT','INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_PRSV_DT','UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_PRSV_DT');">삭제</a></div>
						</security:authorize>
					</div>
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdtPrsvDt<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
				<!--  PSection End -->
			</div>
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('<c:out value="${result.ftrCde}"/>','<c:out value="${result.ftrIdn}"/>','<c:out value="${result.cntNum}"/>','RDT_IMGE_ET');">도면/사진</a></div>
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