<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : 
  * @Description : WTL_PURI_AS  정수장
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
									
			// 1 )달력
			BOOK.fn_create_datepicker("frm_detail","FNS_YMD" , 10);
			
			// 2) input, select 항목 init
			BOOK.fn_init_formObject("frm_detail");				
			
			// 4) 디폴트: 편집 불가 상태
			if( sAction === "BATCHUP"){

				$('.activeWindow').find('.disBatchUp').hide();
				$('.activeWindow').find('.visBatchUp').show();
				BOOK.fn_edit_mode();
				
			}else {
				
				$('.activeWindow').find('.visBatchUp').hide();
				$('.activeWindow').find('.disBatchUp').show();	
				
				BOOK.fn_view_mode();
				
				// 4) 그리드 설정
				BOOK.fn_get_gridAddInfo("WTT_ATTA_DT");			//세부시설현황
			}	
			
			<security:authorize ifNotGranted="ROLE_WATER_BOOK_EDIT">
				BOOK.fn_init_popup();
			</security:authorize> 
		
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
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
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
								<security:authorize ifAnyGranted ="ROLE_WATER_MAP_VIEW" >
								<li class="TabBt disBatchUp"><a href="#" onclick="REGISTER.fn_check_moveToFeature('WTL_PURI_AS','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
								</security:authorize>
							</ul>
						</div>
						<!-- // tab -->
						<!-- _Tab1 -->
						<div class="Btn_pd2">
							<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
							<div class="Btn"><a href="#" class="Btn_03 btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_save_register(sAction)'>저장</a></div>
							<div class="Btn"><a href="#" class="Btn_03 btnClassEdit" onclick='BOOK.fn_reset_form("cancel");BOOK.fn_view_mode()'>취소</a></div>
							</security:authorize>
						</div>
						<div id="_Tab1" class="PSection on">
							<div class="Table_LBx">
								<div class="Table_left" style="height:141px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>관리기관</th>
											<td><select name="MNG_CDE" id="MNG_CDE" class="select" >
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
												</select></td>
										</tr>
										<tr>
											<th>준공일자</th>
											<td><input type="text" name="FNS_YMD" id="FNS_YMD" value="<c:out value="${result.fnsYmd}"/>" class="input DT_DATE" />
											<input type="hidden" id="DATE_FNS" value="<c:out value="${result.fnsYmd}"/>"/></td>
											<th>대장초기화여부</th>
											<td><select name="SYS_CHK" id="SYS_CHK"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${sys_chk_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sysChk}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
										</tr>
										<tr>
											<th>공사번호</th>
											<td colspan="3"><input type="text" name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10" />
                            									<a href="#" onclick="BOOK.fn_open_searchNum('WTT_CONS_MA','CNT_NUM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                            									<a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
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
								<div class="Table_left">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
										    <th>정수장명</th>
											<td><input type="text" name="PUR_NAM" id="PUR_NAM" value="<c:out value="${result.purNam}"/>" class="input MX_20 CS_20" /></td>
											<th>수원구분</th>
											<td><select name="WSR_CDE" id="WSR_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${wsr_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.wsrCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												 </select>
											</td>
										</tr>
										<tr>
											<th>부지면적</th>
											<td><input type="text" name="PUR_ARA" id="PUR_ARA"  value="<c:out value="${result.purAra}"/>" class="input MX_8 CS_8 DT_DOUBLE DD_2" /> ㎡</td>
											<th>처리용량</th>
											<td><input type="text" name="PUR_VOL" id="PUR_VOL"  value="<c:out value="${result.purVol}"/>" class="input MX_7 CS_7 DT_FLOAT DD_0" /> ㎥/일</td>
										</tr>
										<tr>
											<th>사용전력</th>
											<td><input type="text" name="PWR_VOL" id="PWR_VOL"  value="<c:out value="${result.pwrVol}"/>" class="input MX_8 CS_8 DT_DOUBLE DD_2" /> ㎾/일</td>
											<th>여과방법</th>
											<td><select name="SAM_CDE" id="SAM_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${sam_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.samCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												 </select>
											</td>
										</tr>
										<tr>											
											<th>관련취수장</th>
											<td><input type="text" name="GAI_NAM" id="GAI_NAM"  value="<c:out value="${result.gaiNam}"/>" class="input MX_20 CS_20" /> 
												  <a href="#" onclick="BOOK.fn_open_searchNum('WTL_GAIN_PS','GAI_NAM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
												  <a href="#" onclick="BOOK.fn_del_searchNum('GAI_NAM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
											</td>
											<th>관련배수지</th>
											<td><input type="text" name="SRV_NAM" id="SRV_NAM"  value="<c:out value="${result.srvNam}"/>" class="input MX_20 CS_20" />
												  <a href="#" onclick="BOOK.fn_open_searchNum('WTL_SERV_PS','SRV_NAM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
												  <a href="#" onclick="BOOK.fn_del_searchNum('SRV_NAM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
											</td>
										</tr>												
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab2 End -->
				   </div>
					<!-- TabArea End -->
					<div class="TabArea disBatchUp">
						<div class="TabBx">
							<ul class="Tabs">
								<li class="_TabSub1"><a href="#" class="Tab Tab_selected">시설물현황</a></li>
							</ul>
						</div>
						<div id="_TabSub1" class="PSection on">
							<div class="Btn_pd3">
								<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
								<div class="Btn"><a href="#" class="Btn_03" onclick="BOOK.fn_open_gridAddInfo('WTT_ATTA_DT');">추가</a></div>
								<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_open_gridAddInfo('WTT_ATTA_DT','UPDATE');">수정</a></div>
								<div class="Btn"><a href="#" class="Btn_03"onclick="BOOK.fn_delete_gridAddInfo('WTT_ATTA_DT');">삭제</a></div>
								</security:authorize>
							</div>
							<div class="TableBx2">
								<div class="Table_list2">
									<table id="gridWttAttaDt<c:out value='${nJDSKSubId}'/>"></table>
								</div>
							</div>
						</div>
						<!--  PSection End -->
					</div>
					<!--  TabArea End -->
					<div class="btnTline"><!--버튼구분자--></div>		
					<div class="Btn_R">
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTT_CONS_MA','CNT_NUM');">공사대장</a></div>
						<!-- 한글이 깨짐  안되네.. 필드를 추가하는 방향으로 가는건... ? ?
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTL_GAIN_PS','GAI_NAM')">취수장</a></div>
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTL_SERV_PS','SRV_NAM')">배수지</a></div>
						-->
						<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_PRINT" >
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
						</security:authorize>
						<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window()">닫기</a></div>
					</div>					
				</div>
			</div>
		</div>
</form>
</body>
</html>
