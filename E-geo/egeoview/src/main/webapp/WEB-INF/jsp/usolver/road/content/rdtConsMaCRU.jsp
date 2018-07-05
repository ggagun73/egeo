<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
	/**
	 * @Class Name : 
	 * @Description :  RDT_CONS_MA  도로공사대장
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
	
	var sAction = "${action_flag}";
	$(document).ready(function() {
							
		// 1 )달력
		BOOK.fn_create_datepicker("frm_cons","BID_YMD", 10); 	//입찰일자
		BOOK.fn_create_datepicker("frm_cons","CTT_YMD", 10); 	//계약일자
		BOOK.fn_create_datepicker("frm_cons","BEG_YMD", 10); 	//착공일자
		BOOK.fn_create_datepicker("frm_cons","FNS_YMD", 10); 	//준공예정일자
		BOOK.fn_create_datepicker("frm_cons","RFN_YMD", 10); 	//실준공일자
		BOOK.fn_create_datepicker("frm_cons","FCH_YMD", 10); 	//준공검사일자
				
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_cons");				
		
		//등록이면.. 그리드 안보이게 처리하자.. 
		if( sAction === 'INSERT' || sAction === 'BATCHUP' ){					
			$('.activeWindow').find('.disInsert').hide();
			$('.activeWindow').find('.visInsert').show();
			$('.Table_left').attr('style','height:230px');
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visInsert').hide();
			$('.activeWindow').find('.disInsert').show();	
			
			BOOK.fn_get_gridAddInfo("RDT_COST_DT");			// 공사비 지급내역 
			BOOK.fn_get_gridAddInfo("RDT_CHNG_DT");			// 설계변경내역
			BOOK.fn_get_gridAddInfo("RDT_SUBC_DT");			// 하도급내역
			BOOK.fn_get_gridAddInfo("RDT_REPR_DT");			    // 하자보수내역
			
			//fn_reload_addInfoGrid();	// 그리드의 정보를 가져온다. 
			// 3) 디폴트: 편집 불가 상태
			BOOK.fn_view_mode();			
		}
		
	});			
</script>
</head>
<body>
<form id="frm_cons" name="frm_cons" method="post"  action="">
	<!-- 필수 파라메터(START) -->
	<input type="hidden" id="action_flag" name="action_flag" value='<c:out value="${action_flag}"/>' /> 
	<input type="hidden"	id="screen_mode" name="screen_mode" value="" /> 
	<input type="hidden" id="callBackFunction" name="callBackFunction" value="" /> 
	<input type="hidden" id="nJDSKSubId" name="nJDSKSubId" value='<c:out value="${nJDSKSubId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
	<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
	<input type="hidden" id="openerId" name="openerId" value='<c:out value="${openerId}"/>' />
	<!-- 필수 파라메터(END) -->
	<!--key//-->
	<input type="hidden" id="FID" name="FID" value='<c:out value="${result.g2Id}"/>' /> 
	<input type="hidden" id="CNT_NUM" name="CNT_NUM" value='<c:out value="${result.cntNum}"/>' /> 
	<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
	<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="CNT_NUM"/>
	<!--key//-->
		<div id="wrap2">
			<div id="container2"> 
				<div id="content2">
					<div class="TxtBg">
						<dl>
							<dt>공사번호</dt>
							<dd><c:out value="${result.cntNum}" /></dd>
							<dt class="disInsert">공사명</dt>
							<dd class="disInsert"><c:out value="${result.cntNam}" /></dd>
						</dl>
					</div>
					<!-- tab -->
					<div class="TabArea">
						<div class="TabBx">
							<ul class="Tabs">
								<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반</a></li>
								<li class="_Tab2"><a href="#" class="Tab" >공사</a></li>
								<li class="_Tab3"><a href="#" class="Tab" >예산</a></li>
								<li class="_Tab4"><a href="#" class="Tab" >지출항목</a></li>
								<li class="_Tab5"><a href="#" class="Tab">계약</a></li>
								<li class="_Tab6"><a href="#" class="Tab">도급자</a></li>
								<%-- <li class="TabBt"><a href="#"><img src="<c:url value='/images/usolver/com/book/p_btn_view_on.gif'/>" alt="위치보기" /></a></li> --%>
							</ul>
						</div>
						<!-- // tab -->
						<!-- _Tab1 -->
						<div class="Btn_pd2">
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div id="_Tab1" class="PSection on">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr class='visInsert'>
											<th>공사명</th>
											<td colspan="3"><input type="text"  style="width: 475px;" name="CNT_NAM" id="CNT_NAM"value='<c:out value="${result.cntNam}"/>' class="input MX_100 CS_100" /></td>
										</tr>
										<tr>
											<th>공사구분</th>
											<td><select name="WRK_CDE" id="WRK_CDE" class="select">
													<option value=""></option>
													<c:forEach var="selectData" items="${wrk_cde_list}">
														<option value="${selectData.CODE}"
															<c:if test = "${selectData.CODE == result.wrkCde}"> selected="selected" </c:if>>${selectData.VAL}</option>
													</c:forEach>
											</select></td>
											<th>설계자명</th>
											<td><input type="text" name="DSN_NAM" id="DSN_NAM" value='<c:out value="${result.dsnNam}"/>'class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>공사위치</th>
											<td colspan="3"><input type="text"  style="width: 475px;" name="CNT_LOC" id="CNT_LOC"value='<c:out value="${result.cntLoc}"/>'class="input MX_50 CS_50" /></td>
										</tr>
										<tr>
											<th>설계총액</th>
											<td><input type="text" name="DSN_AMT" id="DSN_AMT"  value='<c:out value="${result.dsnAmt}"/>'class="input MX_11 CS_11 DT_DOUBLE DD_0" /></td>
											<th>관급금액</th>
											<td><input type="text" name="DGC_AMT" id="DGC_AMT"  value='<c:out value="${result.dgcAmt}"/>'class="input MX_11 CS_11 DT_DOUBLE DD_0" /></td>
										</tr>
										<tr>
											<th>순공사비</th>
											<td><input type="text" name="DPC_AMT" id="DPC_AMT"  value='<c:out value="${result.dpcAmt}"/>'  class="input MX_11 CS_11 DT_DOUBLE DD_0" /></td>
											<th>기타잡비</th>
											<td><input type="text" name="DET_AMT" id="DET_AMT" value='<c:out value="${result.detAmt}"/>'  class="input MX_11 CS_11 DT_DOUBLE DD_0" /></td>
										</tr>
										<tr>
											<th>공사개요</th>
											<td colspan="3"><input type="text" style="width: 475px;" name="CNT_DES" id="CNT_DES" value='<c:out value="${result.cntDes}"/>' class="input MX_500 CS_500" /></td>
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
						<!-- _Tab2  공사-->
						<div id="_Tab2" class="PSection">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>감독자성명</th>
											<td><input type="text" name="SVS_NAM" id="SVS_NAM"  value='<c:out value="${result.svsNam}"/>' class="input MX_20 CS_20" /></td>
											<th>착공일자</th>
											<td><input type="text" name="BEG_YMD" id="BEG_YMD"  value='<c:out value="${result.begYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_BEG" value="<c:out value="${result.begYmd}"/>"/></td>
										</tr>
										<tr>
											<th>준공검사자성명</th>
											<td><input type="text" name="FCH_NAM" id="FCH_NAM"  value='<c:out value="${result.fchNam}"/>'  class="input MX_20 CS_20" /></td>
											<th>준공예정일자</th>
											<td><input type="text" name="FNS_YMD" id="FNS_YMD"  value='<c:out value="${result.fnsYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_FNS" value="<c:out value="${result.fns_ymd}"/>"/></td>
										</tr>
										<tr>
											<th>준공검사일자</th>
											<td><input type="text" name="FCH_YMD" id="FCH_YMD"  value='<c:out value="${result.fchYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_FCH" value="<c:out value="${result.fch_ymd}"/>"/></td>
											<th>실준공일자</th>
											<td><input type="text" name="RFN_YMD" id="RFN_YMD"  value='<c:out value="${result.rfnYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_RFN" value="<c:out value="${result.rfnYmd}"/>"/></td>
										</tr>										
										<tr>
											<th>관급물량</th>
											<td colspan="3"><textarea id="GVR_DES"  name="GVR_DES"  class="MX_500 CS_500" cols="70" rows="4"><c:out value="${result.gvrDes}"/></textarea></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab2 End -->
						<!-- _Tab3  예산-->
						<div id="_Tab3" class="PSection">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>국비</th>
											<td><input type="text" name="NAT_AMT" id="NAT_AMT"  value='<c:out value="${result.natAmt}"/>'   class="input MX_11 CS_11 DT_DOUBLE DD_0" /> 원</td>
											<th>도비</th>
											<td><input type="text" name="COU_AMT" id="COU_AMT"  value='<c:out value="${result.couAmt}"/>'   class="input MX_11 CS_11 DT_DOUBLE DD_0"  /> 원</td>
										</tr>
										<tr>											
										</tr>
										<tr>
											<th>시군비</th>
											<td><input type="text" name="CIT_AMT" id="CIT_AMT"	value='<c:out value="${result.citAmt}"/>'   class="input MX_11 CS_11 DT_DOUBLE DD_0" /> 원</td>
											<th>기채</th>
											<td><input type="text" name="BND_AMT" id="BND_AMT"	value='<c:out value="${result.bndAmt}"/>'   class="input MX_11 CS_11 DT_DOUBLE DD_0" /> 원</td>
										</tr>
										<tr>
											<th>양여금</th>
											<td colspan="3"><input type="text" name="CSS_AMT" id="CSS_AMT" value='<c:out value="${result.cssAmt}"/>'   class="input MX_11 CS_11 DT_DOUBLE DD_0" /> 원</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab3 End -->
						<!-- _Tab4  지출항목-->
						<div id="_Tab4" class="PSection">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>관</th>
											<td><input type="text" name="KWN_EXP" id="KWN_EXP" value='<c:out value="${result.kwnExp}"/>' class="input MX_30 CS_30" /></td>
											<th>항</th>
											<td><input type="text" name="HNG_EXP" id="HNG_EXP" value='<c:out value="${result.hngExp}"/>' class="input MX_30 CS_30" /></td>
										</tr>
										<tr>
											<th>세항</th>
											<td colspan="3"><input type="text"  name="SHN_EXP" id="SHN_EXP" value='<c:out value="${result.shnExp}"/>' class="input MX_30 CS_30" /></td>
											<%-- <th>목</th>
											<td><input type="text" name="MOK_EXP" id="MOK_EXP" value='<c:out value="${result.mokExp}"/>' class="input MX_30 CS_30" /></td> --%>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab4 End -->
						<!-- _Tab5  계약-->
						<div id="_Tab5" class="PSection">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>입찰일자</th>
											<td><input type="text" name="BID_YMD" id="BID_YMD" value="<c:out value="${result.bidYmd}"/>" class="input DT_DATE" />
											<input type="hidden" id="DATE_BID" value="<c:out value="${result.bidYmd}"/>"/></td>
											<th>계약일자</th>
											<td><input type="text" name="CTT_YMD" id="CTT_YMD" value="<c:out value="${result.cttYmd}"/>" class="input DT_DATE" />
											<input type="hidden" id="DATE_CTT" value="<c:out value="${result.cttYmd}"/>"/></td>
										</tr>
										<tr>
											<th>계약방법</th>
											<td><select name="CTT_CDE" id="CTT_CDE" class="select">
													<option value=""></option>
													<c:forEach var="selectData" items="${ctt_cde_list}">
														<option value="${selectData.CODE}"
															<c:if test = "${selectData.CODE == result.cttCde}"> selected="selected" </c:if>>${selectData.VAL}</option>
													</c:forEach>
											</select></td>
											<th>예정금액</th>
											<td><input type="text" name="EST_AMT" id="EST_AMT" value="<c:out value="${result.estAmt}"/>" class="input MX_11 CS_11 DT_INT DD_0" /> 원</td>
										</tr>
										<tr>
											<th>계약총액</th>
											<td><input type="text" name="TCT_AMT" id="TCT_AMT" value='<c:out value="${result.tctAmt}"/>'  class="input MX_11 CS_11 DT_INT DD_0" /> 원</td>
											<th>순공사비</th>
											<td><input type="text" name="CPC_AMT" id="CPC_AMT"value='<c:out value="${result.cpcAmt}"/>'  class="input MX_12 CS_12 DT_INT DD_0" /> 원</td>
										</tr>
										<tr>
											<th>관급금액</th>
											<td><input type="text" name="CGV_AMT" id="CGV_AMT"value='<c:out value="${result.cgvAmt}"/>'   class="input MX_13 CS_13 DT_INT DD_0" /> 원</td>
											<th>기타잡비</th>
											<td><input type="text" name="CET_AMT" id="CET_AMT"value='<c:out value="${result.cetAmt}"/>'   class="input MX_14 CS_14 DT_INT DD_0" /> 원</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab5 End -->
						<!-- _Tab6  도급자-->
						<div id="_Tab6" class="PSection">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>도급자명</th>
											<td><input type="text" style="width: 150px;" name="GCN_NAM" id="GCN_NAM"value='<c:out value="${result.gcnNam}"/>'   class="input MX_20 CS_20" /></td>
											<th>대표자명</th>
											<td><input type="text" style="width: 150px;" name="POC_NAM" id="POC_NAM"value='<c:out value="${result.pocNam}"/>'   class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>도급자주소</th>
											<td colspan="3"><input type="text" style="width: 475px;"name="GCN_ADR" id="GCN_ADR"value='<c:out value="${result.gcnAdr}"/>'  class="input MX_50 CS_50"  /></td>
										</tr>
										<tr>
											<th>도급자전화번호</th>
											<td colspan="3"><input type="text" style="width: 475px;" name="GCN_TEL" id="GCN_TEL"value='<c:out value="${result.gcnTel}"/>'   class="input MX_30 CS_30" /></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab6 End -->
					</div>
					<!-- TabArea End -->
					<div class="TabArea disInsert">
						<div class="TabBx">
							<ul class="Tabs">
								<li class="_TabSub1"><a href="#" class="Tab Tab_selected">공사비지급내역</a></li>
								<li class="_TabSub2"><a href="#" class="Tab">설계변경내역</a></li>
								<li class="_TabSub3"><a href="#" class="Tab">하도급내역</a></li>
								<li class="_TabSub4"><a href="#" class="Tab">하자보수내역</a></li>
							</ul>
						</div>
						<div id="_TabSub1" class="PSection on">
							<div class="Btn_pd3">
								<div class="Btn"></div>
								<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
								<div class="Btn"><a href="#" class="Btn_03"  onclick="BOOK.fn_open_gridAddInfo('RDT_COST_DT');">추가</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_COST_DT','UPDATE');">수정</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_delete_gridAddInfo('RDT_COST_DT');">삭제</a></div>
								</security:authorize>
							</div>
							<div class="TableBx2">
								<div class="Table_list2">
									<table id="gridRdtCostDt<c:out value="${nJDSKSubId}"/>"></table>
								</div>
							</div>
						</div>
						<div id="_TabSub2" class="PSection">
							<div class="Btn_pd3">
								<div class="Btn"></div>
								<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
								<div class="Btn"><a href="#" class="Btn_03"  onclick="BOOK.fn_open_gridAddInfo('RDT_CHNG_DT');">추가</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_CHNG_DT','UPDATE');">수정</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_delete_gridAddInfo('RDT_CHNG_DT');">삭제</a></div>
								</security:authorize>
							</div>
							<div class="TableBx2">
								<div class="Table_list2">
									<table id="gridRdtChngDt<c:out value="${nJDSKSubId}"/>"></table>
								</div>
							</div>
						</div>
						<!--  PSection End -->
						<div id="_TabSub3" class="PSection">
							<div class="Btn_pd3">
								<div class="Btn"></div>
								<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
								<div class="Btn"><a href="#" class="Btn_03"  onclick="BOOK.fn_open_gridAddInfo('RDT_SUBC_DT');">추가</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_SUBC_DT','UPDATE');">수정</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_delete_gridAddInfo('RDT_SUBC_DT');">삭제</a></div>
								</security:authorize>
							</div>
							<div class="TableBx2">
								<div class="Table_list2">
									<table id="gridRdtSubcDt<c:out value="${nJDSKSubId}"/>"></table>
								</div>
							</div>
						</div>
						<!--  PSection End -->
						<div id="_TabSub4" class="PSection">
							<div class="Btn_pd3">
								<div class="Btn"></div>
								<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
								<div class="Btn"><a href="#" class="Btn_03"  onclick="BOOK.fn_open_gridAddInfo('RDT_REPR_DT');">추가</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_REPR_DT','UPDATE');">수정</a></div>
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_delete_gridAddInfo('RDT_REPR_DT');">삭제</a></div>
								</security:authorize>
							</div>
							<div class="TableBx2">
								<div class="Table_list2">
									<table id="gridRdtReprDt<c:out value="${nJDSKSubId}"/>"></table>
								</div>
							</div>
						</div>
						<!--  PSection End -->
					</div>
					<!--  TabArea End -->
					<div class="btnTline"><!--버튼구분자--></div>					
					<div class="Btn_R">
						<div class="Btn disInsert"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('','','<c:out value="${result.cntNum}"/>','RDT_IMGE_ET');">도면/사진</a></div>
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_PRINT" >
						<div class="Btn disInsert"><a href="#" class="Btn_02"  onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
						</security:authorize>
						<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
					</div>
				</div>
 			</div>
		</div><!-- wrap2 End -->
</form>
</body>
</html>
