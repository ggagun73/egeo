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
  * @Description : RDL_OCUP_AS  점용시설(면)
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

			BOOK.fn_edit_mode();
			
		}else {
			
			$('.activeWindow').find('.visBatchUp').hide();
			$('.activeWindow').find('.disBatchUp').show();	
			
			BOOK.fn_view_mode();
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
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="SEC_IDN" name="SEC_IDN" value="<c:out value="${result.secIdn}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="PMS_IDN"/>
<!--key//-->
<div id="wrap2">
	<div id="container2"> 
		<div id="content2">
			<div class="TxtBg">
				<dl class="disBatchUp">
					<dt>관리번호</dt>
					<dd><c:out value="${result.ftrIdn}" /></dd>
					<dt>도엽번호</dt>
					<dd><c:out value="${result.shtNum}" /></dd>
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
						<li class="_Tab2"><a href="#" class="Tab">시설현황</a></li>
						<security:authorize ifAnyGranted ="ROLE_ROAD_MAP_VIEW" >
						<li class="TabBt disBatchUp"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
						</security:authorize>
					</ul>
				</div>
				<!-- // tab -->
				<div class="Btn_pd2">
					<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
					<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
					<div class="Btn disInsert"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
					<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
					</security:authorize>
				</div>
				<!-- _Tab1 -->								
				<div id="_Tab1" class="PSection on">
					<div class="Table_LBx">
						<div class="Table_left" style="height:100px">							
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
									<th>허가일련번호</th>
									<td colspan="3"><input type="text"  readOnly name="PMS_IDN" id="PMS_IDN" value="<c:out value="${result.pmsIdn}"/>" class="input MX_10 CS_10" />
                          				<a href="#" onclick="BOOK.fn_open_searchNum('RDT_OCAL_DT','PMS_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                          				<a href="#" onclick="BOOK.fn_del_searchNum('PMS_IDN');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
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
				<!-- _Tab2  기타-->
				<div id="_Tab2" class="PSection">
					<div class="Table_LBx">
						<div class="Table_left" style="height:100px">																	
							<table>
								<colgroup>
									<col width="19%" />
									<col width="31%" />
									<col width="19%" />
									<col width="31%" />
								</colgroup>
								<tr>
									<th>차도보도구분</th>
									<td colspan="3"><select name="CHB_CDE" id="CHB_CDE"  class="select" >
											<option value=""></option>
											<c:forEach var="selectData" items="${chb_cde_list}">
											<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.chbCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
											</c:forEach>
										</select>
									</td>
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
				<!-- _Tab2 End -->
			</div>
			<!-- TabArea End -->			
			<div class="btnTline"><!--버튼구분자--></div>					
			<div class="Btn_R">
				<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('<c:out value="${result.ftrCde}"/>','<c:out value="${result.ftrIdn}"/>','<c:out value="${result.cntNum}"/>','RDT_IMGE_ET');">도면/사진</a></div>
				<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_OCAL_DT','PMS_IDN')">허가대장</a></div>
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
			</div>
		</div>
	</div>
</div><!-- wrap2 End -->
</form>
</body>
</html>