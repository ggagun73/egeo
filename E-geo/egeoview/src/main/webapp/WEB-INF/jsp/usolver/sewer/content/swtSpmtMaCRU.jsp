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
  * @Description :  SWT_SPMT_MA   배수설비인허가대장
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
<script src="<c:url value='/js/usolver/book/init.js'/>"></script>
<script type="text/javascript">

	// 페이지 로딩 초기 설정
	var sAction = "${action_flag}";
	$( document ).ready(function() {
	
		// 1 )달력
		BOOK.fn_create_datepicker("frm_cons","PMT_YMD", 10);
		BOOK.fn_create_datepicker("frm_cons","CNT_YMD", 10); 
		
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_min");				

		//등록이면.. 그리드 안보이게 처리하자.. 
		if( sAction === 'INSERT' ){					
			$('.activeWindow').find('.disInsert').hide();
			$('.activeWindow').find('.visInsert').show();		
			
			$('.activeWindow').find('#RCV_YMD').val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    				
			BOOK.fn_edit_mode();
		}else {
			
			$('.activeWindow').find('.visInsert').hide();
			$('.activeWindow').find('.disInsert').show();	
			// 3) 디폴트: 편집 불가 상태
			BOOK.fn_view_mode();			
		}
				
		<security:authorize ifNotGranted="ROLE_SEWER_BOOK_EDIT">
			BOOK.fn_init_popup();
		</security:authorize> 
	});		
</script>
</head>
<body>
<div id="wrap2">
<form id="frm_cons" name="frm_cons" method="post" action="">
	<!-- 필수 파라메터(START) -->
	<input type="hidden" id="action_flag" name="action_flag" value='<c:out value="${action_flag}"/>' /> 
	<input type="hidden" id="screen_mode" name="screen_mode" value="" /> 
	<input type="hidden" id="callBackFunction" name="callBackFunction" value="" />
	<input type="hidden" id="nJDSKSubId" name="nJDSKSubId" value='<c:out value="${nJDSKSubId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
	<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
	<input type="hidden" id="openerId" name="openerId" value='<c:out value="${openerId}"/>' /> 
	<!-- 필수 파라메터(END) -->
	<!--key//-->
	<input type="hidden" id="FID" name="FID" value='<c:out value="${result.g2Id}"/>' /> 
	<input type="hidden" id="PMT_NUM" name="PMT_NUM" value='<c:out value="${result.pmtNum}"/>' /> 
	<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
	<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="PMT_NUM"/>
	<!--key//-->
			<div id="container2">
				<div id="content2">
					<div class="TxtBg">
						<dl >
							<dt>배수설비인허가번호</dt>
							<dd><c:out value="${result.pmtNum}" /></dd>
						</dl>
					</div>
					<!-- tab -->
					<div class="TabArea">
						<div class="TabBx">
							<ul class="Tabs">
								<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
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
										<tr>
											<th>인허가구분</th>
											<td><select class="select"  name="PMS_CDE" id="PMS_CDE">
													<option value=""></option>
													<c:forEach var="selectData" items="${pms_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.pmsCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select><input type="hidden" id="OLD_APL_CDE" value="<c:out value="${result.pmsCde}"/>"/></td>
											<th>인허가일자</th>
											<td><input type="text" name="PMT_YMD" id="PMT_YMD" value="<c:out value="${result.pmtYmd}"/>" class="input DT_DATE" />
											<input type="hidden" id="DATE_PMT" value="<c:out value="${result.pmtYmd}"/>"/></td>
										</tr>
										<tr>											
											<th>처리자성명</th>
											<td colspan="3"><input type="text" name="PRO_NAM" id="PRO_NAM" value="<c:out value="${result.proNam}"/>" class="input MX_20 CS_20" /></td>
										</tr>			
										<tr>
											<th>민원지행정동</th>
											<td><select class="select"  name="HJD_CDE" id="HJD_CDE">
													<option value=""></option>
													<c:forEach var="selectData" items="${hjd_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>민원지산 구분</th>
											<td><select class="select"  name="APL_SAN" id="APL_SAN">
													<option value=""></option>
													<c:forEach var="selectData" items="${apl_san_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.aplSan}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select><input type="hidden" id="OLD_APL_SAN" value="<c:out value="${result.aplSan}"/>"/></td>
										</tr>
										<tr>
											<th>민원지 본번</th>
											<td><input type="text" name="APL_BON" id="APL_BON" value="<c:out value="${result.aplBon}"/>" class="input MX_4 CS_4" /></td> 
											<th>민원지 부번</th>
											<td><input type="text" name="APL_BUB" id="APL_BUB" value="<c:out value="${result.aplBub}"/>" class="input MX_4 CS_4" /></td> 
										</tr>
										<tr>
											<th>건축용도</th>
											<td><input type="text" name="BLD_USE" id="BLD_USE" value="<c:out value="${result.bldUse}"/>" class="input MX_20 CS_20" /></td> 
											<th>준공일자</th>
											<td><input type="text" name="CNT_YMD" id="CNT_YMD" value="<c:out value="${result.cntYmd}"/>" class="input DT_DATE" /></td> <!--  향후 로그인한 사람 정보로 세팅해야하지 않을까? -->
										</tr>
										<tr>
											<th>건축구조</th>
											<td><input type="text" name="BLD_STR" id="BLD_STR" value="<c:out value="${result.bldStr}"/>" class="input MX_20 CS_20" /></td>
											<th>건축연면적</th>
											<td><input type="text" name="BLD_ARA" id="BLD_ARA"  value="<c:out value="${result.bldAra}"/>" class="input MX_8 DT_FLOAT DD_2" /></td>
										</tr>
										<tr>
											<th>하수처리구분</th>
											<td><select class="select"  name="BRC_CDE" id="BRC_CDE">
													<option value=""></option>
													<c:forEach var="selectData" items="${brc_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.brcCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>하수배출량</th>
											<td><input type="text" name="SDR_VOL" id="SDR_VOL"  value="<c:out value="${result.sdtVol}"/>" class="input MX_7 DT_FLOAT DD_2" /></td>
										</tr>
										<tr>
											<th>하수연결관 관리번호</th>
											<td><input type="text"  readOnly name="PIP_IDN" id="PIP_IDN" value="<c:out value="${result.pipIdn}"/>" class="input MX_10 CS_10" />
                          						  <a href="#" onclick="BOOK.fn_open_searchNum('SWL_CONN_LS','PIP_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          						  <a href="#" onclick="BOOK.fn_del_searchNum('PIP_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          					</td>
										</tr>
										<tr>
											<th>민원인성명</th>
											<td><input type="text" name="APM_NAM" id="APM_NAM" value="<c:out value="${result.apmNam}"/>" class="input MX_20 CS_20" /></td>
											<th>민원인전화번호</th>
											<td><input type="text" name="APM_TEL" id="APM_TEL"  value="<c:out value="${result.apmTel}"/>" class="input MX_30 CS_30" /></td>
										</tr>
										<tr>
											<th>민원인주소</th>
											<td colspan="3"><input type="text" style="width:450px" name="APM_ADR" id="APM_ADR"  value="<c:out value="${result.apmAdr}"/>" class="input MX_50 CS_50" /></td>											
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
						<div class="Btn disInsert"><a href="#" class="Btn_02" onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
						<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
					</div>
				</div>
			</div>
	</form>
</div><!-- wrap2 End -->
</body>
</html>