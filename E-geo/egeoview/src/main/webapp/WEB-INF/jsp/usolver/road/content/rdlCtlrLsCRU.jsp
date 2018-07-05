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
  * @Description : RDL_CTLR_LS  도로구간
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
				
		if( sAction === "BATCHUP"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			BOOK.fn_edit_mode();

		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			if( sAction === "ADD_UPDATE"){
				
				$('.activeWindow').find('.disInsert').hide();
				$('.activeWindow').find('.visInsert').show();
				
				$('.activeWindow').find('form').attr('id', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );		
				$('.activeWindow').find('form').attr('name', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );
				
			}else {
				
				$('.activeWindow').find('.disInsert').show();
				$('.activeWindow').find('.visInsert').hide();				
			}	 
			
			BOOK.fn_view_mode();
			
			BOOK.fn_get_gridAddInfo("RDT_ROUT_DT");			//노선정보
			BOOK.fn_get_gridAddInfo("RDT_RDWY_DT","AD004");			//차도정보
			BOOK.fn_get_gridAddInfo("RDT_SDWK_DT","AE002");			//보도정보
			
			
		}
		
		// 1 )달력
		BOOK.fn_create_datepicker($('.activeWindow').find('form').attr('id'),"STR_YMD", 10); // 사용개시일자
		
		// 2) input, select 항목 init
		BOOK.fn_init_formObject($('.activeWindow').find('form').attr('id'));		
		
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
<input type="hidden" id="SEC_IDN" name="SEC_IDN" value="<c:out value="${result.secIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="SEC_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>도로구간번호</dt>
					<dd><c:out value="${result.secIdn}" /></dd>
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
						<li class="_Tab2"><a href="#" class="Tab">기타</a></li>
						<li class="_Tab3"><a href="#" class="Tab disBatchUp">노선정보</a></li>
						<li class="_Tab4"><a href="#" class="Tab disBatchUp">차도정보</a></li>
						<li class="_Tab5"><a href="#" class="Tab disBatchUp">보도정보</a></li>
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
						<div class="Table_left" style="height:169px">							
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
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
										 </select>
									</td>
								</tr>
								<tr>								
									<th>중용여부</th>
									<td><select name="JYG_CDE" id="JYG_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${jyg_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.jygCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>
									<th>구간구분</th>
									<td><select name="GGB_CDE" id="GGB_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${ggb_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.ggbCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>
								</tr>
								<tr>
									<th>도로연장</th>
									<td><input type="text" name="RDL_LEN" id="RDL_LEN" value='<c:out value="${result.rdlLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>도로면적</th>
									<td><input type="text" name="RDL_ARA" id="RDL_ARA" value='<c:out value="${result.rdlAra}"/>' class="inputMX_10 DT_FLOAT DD_2" /> ㎡</td>				                    
								</tr>
								<tr>
									<th>도로폭원</th>
									<td><input type="text" name="RDL_WID" id="RDL_WID" value='<c:out value="${result.rdlWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>
				                   <th>대장초기화여부</th>
									<td><select name="SYS_CHK" id="SYS_CHK"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${sys_chk_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sysChk}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>	                    
								</tr>
								<tr>
									<th>공사번호</th>
									<td colspan="3">필드확인필요. DB설계서에 필드 누락
									<%-- <input type="text" readOnly name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10" />
                          			 		 <a href="#" onclick="BOOK.fn_open_searchNum('RDT_CONS_MA','CNT_NUM')"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			 		 <a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>--%>			
                          			</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2  기타-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div class="Table_left" style="height:169px">																	
							<table>
								<colgroup>
									<col width="30%" />
									<col width="70%" />
								</colgroup>
								<tr>
									<th>구간연결</th>
									<td><input type="text" name="SEC_CON" id="SEC_CON" value='<c:out value="${result.secCon}"/>' class="input MX_10 CS_10" /></td>
								</tr>
								<tr>
									<th>우회도로관리번호</th>
									<td><input type="text"  readOnly name="ROU_IDN" id="ROU_IDN" value="<c:out value="${result.rouIdn}"/>" class="input MX_10 CS_10" />
                          									 <a href="#" onclick="BOOK.fn_open_searchNum('RDT_RNDW_DT','ROU_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          									 <a href="#" onclick="BOOK.fn_del_searchNum('ROU_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
								</tr>
								<tr>
									<th>도로중심선교점번호</th>
									<td><input type="text" readOnly name="IPC_IDN" id="IPC_IDN" value="<c:out value="${result.ipcIdn}"/>" class="input MX_10  CS_10" />
                          									 <a href="#" onclick="BOOK.fn_open_searchNum('RDT_IPCR_DT','IPC_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          									 <a href="#" onclick="BOOK.fn_del_searchNum('IPC_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
								</tr>
								<tr>
									<th>오르막차로관리번호</th>
									<td><input type="text" readOnly name="CLB_IDN" id="CLB_IDN" value="<c:out value="${result.clbIdn}"/>" class="input MX_10 CS_10" />
                          									 <a href="#" onclick="BOOK.fn_open_searchNum('RDT_CLBM_DT','CLB_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          									 <a href="#" onclick="BOOK.fn_del_searchNum('CLB_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3  노선정보-->
				<div id="_Tab3" class="PSection">
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
				<!-- _Tab3 End -->
				<!-- _Tab4  차도정보-->
				<div id="_Tab4" class="PSection">
					<div class="Table_LBx">
						<div class="Btn_pd3"> 
							<div class="Btn"></div>
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_RDWY_DT','ADD_INSERT');">추가</a></div>
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_RDWY_DT','ADD_UPDATE');">수정</a></div>
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_delete_gridAddInfo('RDT_RDWY_DT','AD004');">삭제</a></div>
							</security:authorize>
						</div>
						<div class="TableBx2">
							<div class="Table_list2">
								<table id="gridRdtRdwyDt<c:out value="${nJDSKSubId}"/>"></table>
							</div>
	 					</div>
					</div>
				</div>
				<!-- _Tab4 End -->
				<!-- _Tab5  보도정보-->
				<div id="_Tab5" class="PSection">
					<div class="Table_LBx">						
						<div class="Btn_pd3">
							<div class="Btn"></div> 
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_SDWK_DT','ADD_INSERT');">추가</a></div>
							<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_SDWK_DT','ADD_UPDATE');">수정</a></div>
							<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_SDWK_DT','AE002');">삭제</a></div>
							</security:authorize>
						</div>
						<div class="TableBx2">
							<div class="Table_list2">
								<table id="gridRdtSdwkDt<c:out value="${nJDSKSubId}"/>"></table>
							</div>
	 					</div>
					</div>
				</div>
				<!-- _Tab5 End -->
			</div>
			<!-- TabArea End -->			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_ROUT_DT','grid')">도로노선</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_RDWY_DT','grid')">차도</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_SDWK_DT','grid')">보도</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_RNDW_DT','ROU_IDN')">우회도로</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_IPCR_DT','IPC_IDN')">중심선교점</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_CLBM_DT','CLB_IDN')">오르막차로</a></div>
				<!-- <div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','CNT_NUM')">공사대장</a></div> -->
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