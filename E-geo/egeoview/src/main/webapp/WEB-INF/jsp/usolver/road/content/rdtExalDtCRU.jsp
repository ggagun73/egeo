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
	 * @Description :  RDT_EXAL_DT  도로굴착허가대장
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
		BOOK.fn_create_datepicker("frm_detail","ONB_YMD", 10); 	//점용료 부과일
		BOOK.fn_create_datepicker("frm_detail","ONC_YMD", 10); 	//점용료 징수일
		BOOK.fn_create_datepicker("frm_detail","DRI_YMD", 10); 	//간접손괴비 부과일
		BOOK.fn_create_datepicker("frm_detail","DRC_YMD", 10); 	//간접손괴비 징수일
		BOOK.fn_create_datepicker("frm_detail","DEP_YMD", 10); 	//환급예정일
				
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");				
		
		//등록이면.. 그리드 안보이게 처리하자.. 
		if( sAction === 'INSERT' || sAction === 'BATCHUP' ){					
			$('.activeWindow').find('.disBatchUp').hide();
			$('.activeWindow').find('.visBatchUp').show();
			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			BOOK.fn_get_gridAddInfo("RDL_EXCV_AS");			//굴착허가위치
			BOOK.fn_get_gridAddInfo("RDT_EXAC_DT");			//도로굴착허가조건
			
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
						<li class="_Tab2"><a href="#" class="Tab">점용내역</a></li>
						<li class="_Tab3"><a href="#" class="Tab">부과일자</a></li>
						<li class="_Tab4"><a href="#" class="Tab">피허가자</a></li>
						<li class="_Tab5"><a href="#" class="Tab">기타사항</a></li>
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
						<div class="Table_left"  style="height:136px;">		
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>허가일자</th>
									<td><input type="text" name="PMS_YMD" id="PMS_YMD" value="<c:out value="${result.pmsYmd}"/>" class="input DT_DATE" /></td>											
									<th>굴착신청방법</th>
									<td><select name="ADW_CDE" id="ADW_CDE" class="select">
											<option value=""></option>
											<c:forEach var="selectData" items="${adw_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.adwCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
									</select></td>
								</tr>
								<tr>								
									<th>설치공작물 내역</th>
									<td colspan="3"><input type="text" name="INS_EXP" id="INS_EXP"  value='<c:out value="${result.insExp}"/>'  style="width:400px" class="input MX_50 CS_50" /></td>
								</tr>
								<tr>
								<th>굴착심의번호</th>
									<td colspan="3"><input type="text" readOnly name="GLA_IDN" id="GLA_IDN" value="<c:out value="${result.glaIdn}"/>" class="input MX_10 CS_10" />
                          				<a href="#" onclick="BOOK.fn_open_searchNum('RDT_EXDS_DT','GLA_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          				<a href="#" onclick="BOOK.fn_del_searchNum('GLA_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          			</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab1 End -->
				<!-- _Tab2 점용내역-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="height:136px;">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="37%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>일시점용면적</th>
									<td><input type="text" name="TMP_ARA" id="TMP_ARA" value='<c:out value="${result.tmpAra}"/>' class="input MX_10 DT_FLOAT DD_2" /> ㎡</td>
				                    <th>일시점용료</th>
									<td><input type="text" name="TMP_AMT" id="TMP_AMT" value='<c:out value="${result.tmpAmt}"/>' class="input MX_11 DT_INT" /> 원</td>
								</tr>
								<tr>
									<th>간접손괴비</th>
									<td><input type="text" name="IDR_AMT" id="IDR_AMT" value='<c:out value="${result.idrAmt}"/>' class="input MX_11 DT_INT" /> 원</td>
				                    <th>지역개발공채</th>
									<td><input type="text" name="PDP_AMT" id="PDP_AMT" value='<c:out value="${result.pdpAmt}"/>' class="input MX_11 DT_INT" /> 원</td>
								</tr>
								<tr>
									<th>감면비율</th>
									<td><input type="text" name="RDC_RAT" id="RDC_RAT" value='<c:out value="${result.rdcRat}"/>' class="input MX_5 DT_FLOAT DD_2" /> %</td>
				                    <th>조정점용료</th>
									<td><input type="text" name="SOC_AMT" id="SOC_AMT" value='<c:out value="${result.socAmt}"/>' class="input MX_11 DT_INT" /> 원</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab2 End -->
				<!-- _Tab3 부과일자-->
				<div id="_Tab3" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left" style="height:136px;">
							<table>
								<colgroup>
									<col width="16%" />
									<col width="37%" />
									<col width="16%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>점용료 부과일</th>
									<td><input type="text" name="ONB_YMD" id="ONB_YMD" value="<c:out value="${result.onbYmd}"/>" class="input DT_DATE" /></td>		
				                    <th>점용료 징수일</th>
									<td><input type="text" name="ONC_YMD" id="ONC_YMD" value="<c:out value="${result.oncYmd}"/>" class="input DT_DATE" /></td>				                    
								</tr>
								<tr>
									<th>간접손괴비 부과일</th>
									<td><input type="text" name="DRI_YMD" id="DRI_YMD" value="<c:out value="${result.driYmd}"/>" class="input DT_DATE" /></td>	
				                    <th>간접손괴비 징수일</th>
									<td><input type="text" name="DRC_YMD" id="DRC_YMD" value="<c:out value="${result.drcYmd}"/>" class="input DT_DATE" /></td>			                    
								</tr>
								<tr>
									<th>예치금</th>
									<td colspan="3"><input type="text" name="DEP_AMT" id="DEP_AMT" value='<c:out value="${result.depAmt}"/>' class="input MX_11 DT_INT" /> 원</td>		
								</tr>
								<tr>
									<th>환급금</th>
									<td><input type="text" name="RET_AMT" id="RET_AMT" value='<c:out value="${result.retAmt}"/>' class="input MX_11 DT_INT" /> 원</td>		
				                    <th>환급예정일</th>
									<td><input type="text" name="DEP_YMD" id="DEP_YMD" value="<c:out value="${result.depYmd}"/>" class="input DT_DATE" /></td>		                    
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab3 End -->
				<!-- _Tab4 피허가자 -->
				<div id="_Tab4" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="height:136px;">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>주민등록/사업자번호</th>
									<td><input type="text" name="PMB_NUM" id="PMB_NUM" value='<c:out value="${result.pmbNum}"/>' class="input MX_15 CS_15" /></td>
				                    <th>상호명</th>
									<td><input type="text" name="PMB_NAM" id="PMB_NAM" value='<c:out value="${result.pmbNam}"/>' class="input MX_30 CS_30" /></td>		                    
								</tr>
								<tr>
									<th>성명</th>
									<td><input type="text" name="PMS_NAM" id="PMS_NAM" value='<c:out value="${result.pmsNam}"/>' class="input MX_30 CS_30" /></td>
				                    <th>전화번호</th>
									<td><input type="text" name="PMS_TEL" id="PMS_TEL" value='<c:out value="${result.pmsTel}"/>' class="input MX_30 CS_30" /></td>
								</tr>
								<tr>
									<th>주소</th>
									<td colspan="3"><input type="text" name="PMS_ADR" id="PMS_ADR" value='<c:out value="${result.pmsAdr}"/>'  style="width:400px"  class="input MX_50 CS_50" /></td>		
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab4 End -->
				<!-- _Tab5 기타사항 -->
				<div id="_Tab5" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left"  style="height:136px;">
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>업종구분</th>
									<td><select name="UJP_CDE" id="UJP_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${ujp_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.ujpCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>		
				                    <th>부과취소여부</th>
									<td><select name="CLY_CDE" id="CLY_CDE" class="select">
										<option value=""></option>
										<c:forEach var="selectData" items="${cly_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.clyCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select></td>				                    
								</tr>
								<tr>
									<th>감독자성명</th>
									<td><input type="text" name="SVS_NAM" id="SVS_NAM" value='<c:out value="${result.svsNam}"/>' class="input MX_30 CS_30" /></td>	
				                    <th>당해년도영구점용료</th>
									<td colspan="3"><input type="text" name="JYS_AMT" id="JYS_AMT" value='<c:out value="${result.jysAmt}"/>' class="input MX_11 DT_INT" /> 원</td>				                    
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- _Tab5 End -->
			</div>
			<!-- TabArea End -->
			<div class="TabArea disBatchUp">
				<div class="TabBx">
					<ul class="Tabs">
						<li class="_TabSub1"><a href="#" class="Tab Tab_selected">굴착허가위치</a></li>
						<li class="_TabSub2"><a href="#" class="Tab">도로굴착허가조건</a></li>
					</ul>
				</div>
				<div id="_TabSub1" class="PSection on">					
					<div class="Btn_pd3">
						<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
						<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
						<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDL_EXCV_AS','INSERT');">추가</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDL_EXCV_AS','UPDATE');">수정</a></div>
						<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDL_EXCV_AS');">삭제</a></div>
						</security:authorize>
					</div>
					<div class="TableBx2">
						<div class="Table_list2">
							<table id="gridRdlExcvAs<c:out value="${nJDSKSubId}"/>"></table>
						</div>
					</div>
				</div>
				<div id="_TabSub2" class="PSection">
						<div class="Btn_pd3">
							<!-- <div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','gridRdtRtrpDt')">보수공사</a></div> -->
							<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('RDT_EXAC_DT','ADD_INSERT');">추가</a></div>
							<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('RDT_EXAC_DT','ADD_UPDATE');">수정</a></div>
							<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('RDT_EXAC_DT');">삭제</a></div>
							</security:authorize>
						</div>
						<div class="TableBx2">
							<div class="Table_list2">
								<table id="gridRdtExacDt<c:out value="${nJDSKSubId}"/>"></table>
							</div>
						</div>
					</div>
				</div>
				<div class="btnTline"><!--버튼구분자--></div>					
				<div class="Btn_R">
					<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('','','<c:out value="${result.cntNum}"/>','RDT_IMGE_ET');">도면/사진</a></div>
					<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_EXDS_DT','GLA_IDN')">심의대장</a></div>
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
