<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
	/**
	 * @Class Name : 
	 * @Description :  RDT_OCAL_DT  도로점용허가대장
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
		BOOK.fn_create_datepicker("frm_detail","PMS_YMD", 10); 	//허가일자
		BOOK.fn_create_datepicker("frm_detail","JYS_YMD", 10); 		//점용시작일
		BOOK.fn_create_datepicker("frm_detail","JYE_YMD", 10); 		//점용종료일
		BOOK.fn_create_datepicker("frm_detail","CHG_YMD", 10); 	//변경일자
				
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");				
		
		//등록이면.. 그리드 안보이게 처리하자.. 
		if( sAction === 'INSERT' || sAction === 'BATCHUP' ){					
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			$('.activeWindow').find('.Table_left').attr('style','height:300px');
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			BOOK.fn_get_gridAddInfo("RDT_OCNR_DT");		//도로인접지번.. 
			BOOK.fn_get_gridAddInfo("RDT_FECL_DT");			//점용료산정기준
			BOOK.fn_get_gridAddInfo("RDT_FEIM_DT");			//점용료부가내역
			
			//fn_reload_addInfoGrid();	// 그리드의 정보를 가져온다. 
			// 3) 디폴트: 편집 불가 상태
			BOOK.fn_view_mode();			
		}
		
	});			
</script>
</head>
<body>
<form id="frm_detail" name="frm_detail" method="post"  action="">
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
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="PMS_IDN" name="PMS_IDN" value="<c:out value="${result.pmsIdn}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="PMS_IDN"/>
<input type="hidden" id="ENP_AMT" name="ENP_AMT" />
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<!-- tab -->
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>허가일련번호</dt>
					<dd><c:out value="${result.pmsIdn}" /></dd>
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
						<li class="_Tab2"><a href="#" class="Tab">세부현황</a></li>
						<li class="_Tab3"><a href="#" class="Tab">피허가자</a></li>
						<%-- <security:authorize ifAnyGranted ="ROLE_ROAD_MAP_VIEW" >
						<li class="TabBt disInsert"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize> --%>
					</ul>
				</div>
				<!-- // tab -->
				<div class="Btn_pd3">
					<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
					<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
					</security:authorize>
				</div>
				<!-- _Tab1 일반사항 -->		
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Table_left"  style="overflow-x:hidden;height:235px;">		
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>허가관리번호</th>
									<td><input type="text" name="PMS_NUM" id="PMS_NUM"  value='<c:out value="${result.pmsNum}"/>'  class="input MX_20 CS_20" /></td>
									<th>허가일자</th>
									<td><input type="text" name="PMS_YMD" id="PMS_YMD" value="<c:out value="${result.pmsYmd}"/>" class="input DT_DATE" /></td>				
								</tr>
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
									<th>점용장소</th>
									<td colspan="3"><input type="text" name="JYG_LOC" id="JYG_LOC"  value='<c:out value="${result.jygLoc}"/>'  style="width:400px" class="input MX_50 CS_50" /></td>
								</tr>
								<tr>								
									<th>점용목적</th>
									<td colspan="3"><input type="text" name="JYG_PRS" id="JYG_PRS"  value='<c:out value="${result.jygPrs}"/>'  style="width:400px" class="input MX_50 CS_50" /></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2 점용내역-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="overflow-x:hidden;height:235px;">		
							<table>
								<colgroup>
									<col width="19%" />
									<col width="37%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>점용시작일</th>
									<td><input type="text" name="JYS_YMD" id="JYS_YMD" value='<c:out value="${result.jysYmd}"/>'  class="input DT_DATE" /></td>
				                    <th>점용종료일</th>
									<td><input type="text" name="JYE_YMD" id="JYE_YMD" value='<c:out value="${result.jyeYmd}"/>'  class="input DT_DATE" /></td>
								</tr>
								<tr>
									<th>점용물량-연장</th>
									<td><input type="text" name="JYG_LEN" id="JYG_LEN" value='<c:out value="${result.jygLen}"/>' class="input MX_7 DT_FLOAT DD_2" /> m</td>
				                    <th>점용물량-개소</th>
									<td><input type="text" name="JYG_CNT" id="JYG_CNT" value='<c:out value="${result.jygCnt}"/>' class="input MX_4 DT_INT" /> 개</td>
								</tr>
								<tr>
									<th>점용물량-면적</th>
									<td><input type="text" name="JYG_ARA" id="JYG_ARA" value='<c:out value="${result.jygAra}"/>' class="input MX_10 DT_FLOAT DD_2" />㎡</td>
				                    <th>면제여부</th>
									<td><select name="JFC_CDE" id="JFC_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${jfc_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.jfcCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>
								</tr>
								<tr>
									<th>도로지번-법정동</th>
									<td><select name="BJD_CDE" id="BJD_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${bjd_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.bjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>
				                    <th>도로지번-대지구분</th>
									<td><select name="DJS_CDE" id="DJS_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${djs_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.djsCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>
								</tr>
								<tr>
									<th>도로지번-본번</th>
									<td><input type="text" name="FAC_NUM" id="FAC_NUM" value='<c:out value="${result.facNum}"/>' class="input MX_4 CS_4" /></td>
				                    <th>도로지번-부번</th>
									<td><input type="text" name="FAD_NUM" id="FAD_NUM" value='<c:out value="${result.fadNum}"/>' class="input MX_4 CS_4" /></td>
								</tr>
								<tr>
									<th>허가종류</th>
									<td><select name="JPK_CDE" id="JPK_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${jpk_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.jpkCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>
				                    <th>구허가번호</th>
									<td><input type="text" name="OPM_NUM" id="OPM_NUM" value='<c:out value="${result.opmNum}"/>' class="input MX_20 CS_20" /></td>
								</tr>
								<tr>
									<th>변경일자</th>
									<td colspan="3"><input type="text" name="CHG_YMD" id="CHG_YMD" value='<c:out value="${result.chgYmd}"/>' class="input DT_DATE" /></td>
								</tr>
								<tr>
									<th>변경사항</th>
									<td colspan="3"><input type="text" name="CHG_DES" id="CHG_DES" value='<c:out value="${result.chgDes}"/>'  style="width:400px"  class="input MX_100 CS_100" /></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3 부과일자-->
				<div id="_Tab3" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="overflow-x:hidden;height:235px;">		
							<table>
								<colgroup>
									<col width="16%" />
									<col width="37%" />
									<col width="16%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>피허가자구분</th>
									<td><select name="IDG_CDE" id="IDG_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${idg_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.idgCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										 </select>
									</td>		
				                    <th>성명</th>
									<td><input type="text" name="PMS_NAM" id="PMS_NAM" value="<c:out value="${result.pmsNam}"/>" class="input MX_30 CS_30" /></td>				                    
								</tr>
								<tr>
									<th>주민등록/사업자번호</th>
									<td><input type="text" name="PMB_NUM" id="PMB_NUM" value="<c:out value="${result.pmbNum}"/>" class="input MX_15 CS_15" /></td>	
				                    <th>상호명</th>
									<td><input type="text" name="PMB_NAM" id="PMB_NAM" value="<c:out value="${result.pmbNam}"/>" class="input MX_30 CS_30" /></td>			                    
								</tr>
								<tr>
									<th>전화번호</th>
									<td colspan="3"><input type="text" name="PMS_TEL" id="PMS_TEL" value='<c:out value="${result.pmsTel}"/>' class="input MX_30 CS_30" /></td>		
								</tr>
								<tr>
									<th>주소</th>
									<td colspan="3"><input type="text" name="PMS_ADR" id="PMS_ADR" value='<c:out value="${result.pmsAdr}"/>'  style="width:400px" class="input MX_50 CS_50" /> </td>		                    
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
						<li class="_TabSub1"><a href="#" class="Tab Tab_selected">도로인접지번내역</a></li>
						<li class="_TabSub2"><a href="#" class="Tab">점용료산정기준</a></li>
						<li class="_TabSub3"><a href="#" class="Tab">점용료부과내역</a></li>
					</ul>
				</div>
				<div id="_TabSub1" class="PSection on">					
					<div class="Btn_pd3">
						<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_OCNR_DT','INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_OCNR_DT','UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_OCNR_DT');">삭제</a></div>
						</security:authorize>
					</div>
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdtOcnrDt<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
				<div id="_TabSub2" class="PSection">
					<div class="Btn_pd3">
						<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_FECL_DT','ADD_INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_FECL_DT','ADD_UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_FECL_DT');">삭제</a></div>
						</security:authorize>
					</div>
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdtFeclDt<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
				<div id="_TabSub3" class="PSection">
					<div class="Btn_pd3">
						<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_FEIM_DT','INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_FEIM_DT','UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_FEIM_DT');">삭제</a></div>
						</security:authorize>
					</div>
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdtFeimDt<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('','','<c:out value="${result.cntNum}"/>','RDT_IMGE_ET');">도면/사진</a></div>
				<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_PRINT" >
				<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>
