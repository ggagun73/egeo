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
  * @Description :  RDT_SDWK_DT : 보도구간
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
			$('.activeWindow').find('.visInsert').hide();
			$('.activeWindow').find('.disInsert').show();
			BOOK.fn_edit_mode();
		
		}else if(sAction === "INSERT"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.visInsert').show();
			$('.activeWindow').find('.disInsert').hide();
			BOOK.fn_edit_mode();
			
		
		}else if( sAction === "ADD_INSERT" || sAction === "ADD_UPDATE" ){

			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.visInsert').show();
			$('.activeWindow').find('.disInsert').hide();
			
			$('.activeWindow').find('form').attr('id', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );		
			$('.activeWindow').find('form').attr('name', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );		
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			$('.activeWindow').find('.visInsert').hide();
			$('.activeWindow').find('.disInsert').show();
			
			BOOK.fn_view_mode();
			
		}
		
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
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="AE002"/>"/>
<input type="hidden" id="RDA_IDN" name="RDA_IDN" value="<c:out value="${result.rdaIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="RDA_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>도로면관리번호</dt>
					<dd><c:out value="${result.rdaIdn}" /></dd>
				</dl>
				<dl class="visBatchUp">
					<dt>선택된 시설물</dt>
					<dd><c:out value="${batch_cnt}"/>건</dd>
				</dl>
				<dl>
					<dt>도로구간번호</dt>
					<dd><input type="hidden" id="SEC_IDN" name="SEC_IDN" value="<c:out value="${result.secIdn}"/>"/><c:out value="${result.secIdn}"/></dd>
				</dl>
			</div>
			<!-- tab -->
			<div class="TabArea">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
						<li class="_Tab2"><a href="#" class="Tab">시설현황</a></li>
						<li class="_Tab3"><a href="#" class="Tab">보도턱/보도경계석</a></li>
						<li class="_Tab4"><a href="#" class="Tab">자전거전용도로</a></li>
						<li class="_Tab5"><a href="#" class="Tab">유도블럭</a></li>
						<%-- <security:authorize ifAnyGranted ="ROLE_ROAD_MAP_VIEW" >
						<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize> --%>
					</ul>
				</div>
				<!-- // tab -->
				<!-- _Tab1 -->				
				<div class="Btn_pd2">
					<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
					<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
					<div class="Btn disInsert"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
					<div class="Btn visInsert"><a href="#" class="Btn_03 btnClassEdit" onclick="BOOK.fn_insert_gridAddInfo('<c:out value='${TABLENAME}'/>','AE002')">저장</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
					</security:authorize>
				</div>				
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Table_left" style="height:135px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>보도관리자</th>
									<td><input type="text" name="MNG_NAM" id="MNG_NAM" value='<c:out value="${result.mngNam}"/>' class="input MX_30 CS_30" /></td>		
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
									<th>관리기관</th>
									<td><select name="MNG_CDE" id="MNG_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${mng_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mngCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>위치구분</th>
									<td><select name="PLC_CDE" id="PLC_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${plc_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.plcCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>	             
								</tr>
								<tr>
									<th>공사번호</th>
									<td colspan="3"><input type="text" readOnly name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10" />
                          									 <a href="#" onclick="BOOK.fn_open_searchNum('RDT_CONS_MA','CNT_NUM')"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          									 <a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
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
				<!-- _Tab2  기타-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="height:135px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>폭원</th>
									<td><input type="text" name="BDL_WID" id="BDL_WID" value='<c:out value="${result.bdlWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>보도재질</th>
									<td><select name="LAV_CDE" id="LAV_CDE" class="select">
		                            <option value=""></option>
				                    	<c:forEach var="selectData" items="${lav_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.lavCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select></td>				                    
								</tr>
								<tr>
									<th>연장</th>
									<td><input type="text" name="BDL_LEN" id="BDL_LEN" value='<c:out value="${result.bdlLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>면적</th>
									<td><input type="text" name="BDL_ARA" id="BDL_ARA" value='<c:out value="${result.bdlAra}"/>' class="input MX_10 DT_FLOAT DD_2" />  ㎡</td>				                    
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3  노선정보-->
				<div id="_Tab3" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="height:135px">
							<table>
								<colgroup>
									<col width="21%" />
									<col width="29%" />
									<col width="21%" />
									<col width="29%" />
								</colgroup>
								<tr>
									<th>보도턱-총개수</th>
									<td><input type="text" name="BTK_CNT" id="BTK_CNT" value='<c:out value="${result.btkCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
									<th>보도경계석-재질</th>
									<td><select name="LMA_CDE" id="LMA_CDE" class="select">
		                            	<option value=""></option>
				                    	<c:forEach var="selectData" items="${lma_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.lmaCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select></td>					                   		                    
								</tr>
								<tr>									
				                    <th>보도턱-횡단보도낮추기</th>
									<td><input type="text" name="HTK_CNT" id="HTK_CNT" value='<c:out value="${result.htkCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
									<th>보도경계석-연장</th>
									<td><input type="text" name="LMA_LEN" id="LMA_LEN" value='<c:out value="${result.lmaAra}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>				                    
								</tr>
								<tr>									
				                    <th>보도턱-보도진입부낮추기</th>
									<td colspan="3"><input type="text" name="JTK_CNT" id="JTK_CNT" value='<c:out value="${result.jtkCnt}"/>' class="input MX_3 DT_INT" /> 개</td>											                    
								</tr>								
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab3 End -->
				<!-- _Tab4  차도정보-->
				<div id="_Tab4" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left" style="height:135px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>자전거전용도로-폭원</th>
									<td><input type="text" name="SMW_WID" id="SMW_WID" value='<c:out value="${result.smwlWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>자전거전용도로-재질</th>
									<td><select name="SMW_CDE" id="SMW_CDE" class="select">
		                            <option value=""></option>
				                    	<c:forEach var="selectData" items="${smw_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.smwCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select></td>				                    
								</tr>
								<tr>
									<th>자전거전용도로-연장</th>
									<td><input type="text" name="SMW_LEN" id="SMW_LEN" value='<c:out value="${result.smwLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>자전거전용도로-면적</th>
									<td><input type="text" name="SMW_ARA" id="SMW_ARA" value='<c:out value="${result.smwAra}"/>' class="input MX_10 DT_FLOAT DD_2" />  ㎡</td>				                    
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab4 End -->		
				<!-- _Tab5  유도블록정보-->
				<div id="_Tab5" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left" style="height:135px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>									
				                    <th>유도블록종류</th>
									<td colspan="3"><select name="BLC_CDE" id="BLC_CDE" class="select">
		                            <option value=""></option>
				                    	<c:forEach var="selectData" items="${blc_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.blcCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select></td>				                    
								</tr>
								<tr>
									<th>유도블록-연장</th>
									<td><input type="text" name="BLC_LEN" id="BLC_LEN" value='<c:out value="${result.blcLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>유도블록-면적</th>
									<td><input type="text" name="BLC_ARA" id="BLC_ARA" value='<c:out value="${result.blcAra}"/>' class="input MX_10 DT_FLOAT DD_2" /> ㎡</td>				                    
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab5 End -->					
			</div>
			<!-- TabArea End -->			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDL_CTLR_LS','SEC_IDN')">도로구간</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','CNT_NUM')">공사대장</a></div>
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>