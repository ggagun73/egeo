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
  * @Description : RDT_ROUT_DT 노선정보
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
			$('.activeWindow').find('.disInsert').show();
			$('.activeWindow').find('.visInsert').hide();
			$('.activeWindow').find('.Table_left').attr('style','height:300px');
			BOOK.fn_edit_mode();
		
		}else if(sAction === "INSERT"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.visInsert').show();
			$('.activeWindow').find('.disInsert').hide();
			$('.activeWindow').find('.Table_left').attr('style','height:300px');
			BOOK.fn_edit_mode();
				
		}else if( sAction === "ADD_INSERT" || sAction === "ADD_UPDATE"){
			
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disInsert').hide();
			$('.activeWindow').find('.visInsert').show();
			
			$('.activeWindow').find('form').attr('id', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );		
			$('.activeWindow').find('form').attr('name', BOOK.camelCase('frm_<c:out value="${TABLENAME}"/>') );	
			$('.activeWindow').find('.Table_left').attr('style','height:300px');
			
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			$('.activeWindow').find('.disInsert').show();
			$('.activeWindow').find('.visInsert').hide();
			
			$('.activeWindow').find('.Table_left').attr('style','overflow-x:hidden;height:235px');
			BOOK.fn_view_mode();
			
			BOOK.fn_get_gridAddInfo("RDT_RTRP_DT");		//도로일상보수
			BOOK.fn_get_gridAddInfo("RDL_CTLR_LS");		//도로구간정보
		}
			
		// 1 )달력APD_YMD
		BOOK.fn_create_datepicker($('.activeWindow').find('form').attr('id'),"APD_YMD", 10); 
		BOOK.fn_create_datepicker($('.activeWindow').find('form').attr('id'),"ENT_YMD", 10); 
		
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
<input type="hidden" id="RUT_IDN" name="RUT_IDN" value="<c:out value="${result.rutIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="RUT_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>노선번호</dt>
					<dd><c:out value="${result.rutIdn}" /></dd>
				</dl>
				<dl class="visBatchUp">
					<dt>선택된 시설물</dt>
					<dd><c:out value="${batch_cnt}"/>건</dd>
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
						<li class="_Tab2"><a href="#" class="Tab">시설현황1</a></li>
						<li class="_Tab3"><a href="#" class="Tab">시설현황2</a></li>
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
					<div class="Btn visInsert"><a href="#" class="Btn_03 btnClassEdit" onclick="BOOK.fn_insert_gridAddInfo('<c:out value='${TABLENAME}'/>')">저장</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
					</security:authorize>
				</div>				
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Table_left" style="overflow-x:hidden;height:235px">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>노선명</th>
									<td colspan="3"><input type="text" style="width:375px" name="RUT_NAM" id="RUT_NAM" value='<c:out value="${result.rutNam}"/>' class="input MX_30 CS_30" /> </td>											
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
									<th>노선지정일자</th>
									<td><input type="text" name="APD_YMD" id="APD_YMD" value="<c:out value="${result.apdYmd}"/>" class="input DT_DATE" />
									<th>지적고지일자</th>
									<td><input type="text" name="ENT_YMD" id="ENT_YMD" value="<c:out value="${result.entYmd}"/>" class="input DT_DATE" />
								</tr>
								<tr>								
									<th>도로종류</th>
									<td><select name="ADA_CDE" id="ADA_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${ada_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.adaCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>도로기능</th>
									<td><select name="FNC_CDE" id="FNC_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${fnc_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.fncCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>	             
								</tr>
								<tr>								
									<th>노선구분</th>
									<td><select name="RUT_CDE" id="RUT_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${rut_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.rutCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
									<th>도로규모</th>
									<td><select name="SIZ_CDE" id="SIZ_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${siz_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sizCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>	             
								</tr>
								<tr>
									<th>주요경과지</th>
									<td colspan="3"><input type="text" style="width:375px" name="IMP_LOC" id="IMP_LOC" value='<c:out value="${result.impLoc}"/>' class="input MX_50 CS_50" /> </td>											
								</tr>
								<tr>
									<th>시점</th>
									<td colspan="3"><input type="text" style="width:375px" name="BEG_LOC" id="BEG_LOC" value='<c:out value="${result.begLoc}"/>' class="input MX_50 CS_50" /> </td>											
								</tr>
								<tr>
									<th>종점</th>
									<td colspan="3"><input type="text" style="width:375px" name="END_LOC" id="END_LOC" value='<c:out value="${result.endLoc}"/>' class="input MX_50 CS_50" /> </td>											
								</tr>
								<tr>
									<th>대장초기화여부</th>
									<td colspan="3"  ><select name="SYS_CHK" id="SYS_CHK"  class="select" >
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
						<div class="Table_left" style="overflow-x:hidden;;height:235px">				
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>노선연장</th>
									<td><input type="text" name="RUT_LEN" id="RUT_LEN" value='<c:out value="${result.rutLen}"/>' class="input MX_7 DT_FLOAT DD_2" /> m</td>		
				                    <th>전용연장</th>
									<td><input type="text" name="RUS_LEN" id="RUS_LEN" value='<c:out value="${result.rusLen}"/>' class="input MX_7 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>중용연장</th>
									<td><input type="text" name="RUJ_LEN" id="RUJ_LEN" value='<c:out value="${result.rujLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>총면적</th>
									<td><input type="text" name="RUT_ARA" id="RUT_ARA" value='<c:out value="${result.rutAra}"/>' class="input MX_10 DT_FLOAT DD_2" />  ㎡</td>				                    
								</tr>
								<tr>
									<th>최소차도폭원</th>
									<td><input type="text" name="MIC_WID" id="MIC_WID" value='<c:out value="${result.micWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>최대차도폭원</th>
									<td><input type="text" name="MAC_WID" id="MAC_WID" value='<c:out value="${result.macWid}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>최소보도폭원</th>
									<td><input type="text" name="MIB_WID" id="MIB_WID" value='<c:out value="${result.mibWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>최대보도폭원</th>
									<td><input type="text" name="MAB_WID" id="MAB_WID" value='<c:out value="${result.mabWid}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>최소도로폭원</th>
									<td><input type="text" name="MIR_WID" id="MIR_WID" value='<c:out value="${result.mirWid}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>최대도로폭원</th>
									<td><input type="text" name="MAR_WID" id="MAR_WID" value='<c:out value="${result.marWid}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>차로수 2차로미만</th>
									<td><input type="text" name="FNM_LEN" id="FNM_LEN" value='<c:out value="${result.fnmLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>차로수 2-4차로</th>
									<td><input type="text" name="SNM_LEN" id="SNM_LEN" value='<c:out value="${result.snmLen}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>차로수 2-4차로</th>
									<td><input type="text" name="TNM_LEN" id="TNM_LEN" value='<c:out value="${result.tnmLen}"/>' class="input MX_5 DT_FLOAT DD_2" /> m</td>		
				                    <th>차로수 6차로 이상</th>
									<td><input type="text" name="UNM_LEN" id="UNM_LEN" value='<c:out value="${result.unmLen}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3  노선정보-->
				<div id="_Tab3" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left" style="overflow-x:hidden;;height:235px">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>종단구배-3%미만</th>
									<td><input type="text" name="FGB_CNT" id="FGB_CNT" value='<c:out value="${result.fgbCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>종단구배-3-5%</th>
									<td><input type="text" name="SGB_CNT" id="SGB_CNT" value='<c:out value="${result.sgbCnt}"/>' class="input MX_3 DT_INT" />  개</td>				                    
								</tr>
								<tr>
									<th>종단구배-5-10%</th>
									<td><input type="text" name="TGB_CNT" id="TGB_CNT" value='<c:out value="${result.tgbCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>종단구배-10%이상</th>
									<td><input type="text" name="UGB_CNT" id="UGB_CNT" value='<c:out value="${result.ugbCnt}"/>' class="input MX_3 DT_INT" />  개</td>				                    
								</tr>
								<tr>
									<th>최소곡선반경100미만</th>
									<td><input type="text" name="FMN_CNT" id="FMN_CNT" value='<c:out value="${result.fmnCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>최소곡선반경100-150</th>
									<td><input type="text" name="SMN_CNT" id="SMN_CNT" value='<c:out value="${result.smnCnt}"/>' class="input MX_3 DT_INT" />  개</td>				                    
								</tr>
								<tr>
									<th>최소곡선반경150-200</th>
									<td><input type="text" name="TMN_CNT" id="TMN_CNT" value='<c:out value="${result.tmnCnt}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>최소곡선반경200이상</th>
									<td><input type="text" name="UMN_CNT" id="UMN_CNT" value='<c:out value="${result.umnCnt}"/>' class="input MX_3 DT_INT" />  개</td>				                    
								</tr>
								<tr>
									<th>교량개소</th>
									<td><input type="text" name="BRG_NUM" id="BRG_NUM" value='<c:out value="${result.brgNum}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>교량연장</th>
									<td><input type="text" name="BRG_LEN" id="BRG_LEN" value='<c:out value="${result.brgLen}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>터널개소</th>
									<td><input type="text" name="TRN_NUM" id="TRN_NUM" value='<c:out value="${result.trnNum}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>터널연장</th>
									<td><input type="text" name="TRN_LEN" id="TRN_LEN" value='<c:out value="${result.trnLen}"/>' class="input MX_5 DT_FLOAT DD_2" />  m</td>				                    
								</tr>
								<tr>
									<th>교차육교개소</th>
									<td><input type="text" name="PDS_NUM" id="PDS_NUM" value='<c:out value="${result.pdsNum}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>교차지하도개소</th>
									<td><input type="text" name="SMA_NUM" id="SMA_NUM" value='<c:out value="${result.smaNum}"/>' class="input MX_3 DT_INT" /> 개</td>				                    
								</tr>
								<tr>
									<th>중앙분리대개소</th>
									<td><input type="text" name="RDG_NUM" id="RDG_NUM" value='<c:out value="${result.rdgNum}"/>' class="input MX_3 DT_INT" /> 개</td>		
				                    <th>중앙분리대연장</th>
									<td><input type="text" name="RDG_LEN" id="RDG_LEN" value='<c:out value="${result.rdgLen}"/>' class="input MX_7 DT_FLOAT DD_2" />  m</td>				                    
								</tr>	
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab3 End -->			
			</div>
			<!-- TabArea End -->			
			<div class="TabArea disBatchUp">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_TabSub1"><a href="#" class="Tab Tab_selected">도로일상보수</a></li>
						<li class="_TabSub2"><a href="#" class="Tab">도로구간정보</a></li>
					</ul>
				</div>
				<div id="_TabSub1" class="PSection on">					
					<div class="Btn_pd3">
						<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_RTRP_DT','INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_RTRP_DT','UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_RTRP_DT');">삭제</a></div>
						</security:authorize>
					</div>					
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdtRtrpDt<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
				<div id="_TabSub2" class="PSection">					
					<div class="Btn_pd3">
						<div class="Btn"/>
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDL_CTLR_LS','gridRdlCtlrLs')">상세조회</a></div>
						<%--  도로구간은 수정삭제 버튼이 안보이네.. 
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDL_CTLR_LS','ADD_INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDL_CTLR_LS','ADD_UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDL_CTLR_LS');">삭제</a></div> --%>
						<%-- </security:authorize> --%>
					</div>					
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdlCtlrLs<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
				<!--  PSection End -->
			</div>
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
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