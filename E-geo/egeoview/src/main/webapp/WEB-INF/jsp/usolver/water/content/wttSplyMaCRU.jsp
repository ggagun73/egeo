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
  * @Description : 
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
			BOOK.fn_create_datepicker("frm_cons","BEG_YMD", 10);
			BOOK.fn_create_datepicker("frm_cons","FNS_YMD", 10); 
			BOOK.fn_create_datepicker("frm_cons","RCP_YMD", 10);
			
			// 2) input, select 항목 init
			BOOK.fn_init_formObject("frm_cons");				

			//등록이면.. 그리드 안보이게 처리하자.. 
			if( sAction === 'INSERT' ){					
				$('.activeWindow').find('.disInsert').hide();
				BOOK.fn_edit_mode();
			}else {
				$('.activeWindow').find('.disInsert').show();	
				// 3) 디폴트: 편집 불가 상태
				BOOK.fn_view_mode();			
			}
			
			<security:authorize ifNotGranted="ROLE_WATER_BOOK_EDIT">
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
			<div id="container2">
				<div id="content2">
					<div class="TxtBg">
						<dl>
							<dt>공사번호</dt>
							<dd><c:out value="${result.cntNum}" /></dd>
						</dl>
					</div>
					<!-- tab -->
					<div class="TabArea">
						<div class="TabBx">
							<ul class="Tabs">
								<li class="_Tab1"><a href="#" class="Tab Tab_selected">공사일반</a></li>
								<li class="_Tab2"><a href="#" class="Tab" >공사비용</a></li>
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
								<div class="Table_left" style="height:165px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>수납일자</th>
											<td><input type="text" name="RCP_YMD" id="RCP_YMD" value='<c:out value="${result.rcpYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_RCP" value="<c:out value="${result.rcpYmd}"/>"/></td>
											<th>시공자명</th>
											<td><input type="text" name="OPR_NAM" id="OPR_NAM" value='<c:out value="${result.oprNam}"/>'class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>착수일자</th>
											<td><input type="text" name="BEG_YMD" id="BEG_YMD" value='<c:out value="${result.begYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_BEG" value="<c:out value="${result.begYmd}"/>"/></td>
											<th>감독자성명</th>
											<td><input type="text" name="SVS_NAM" id="SVS_NAM" value='<c:out value="${result.svsNam}"/>'class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>준공일자</th>
											<td><input type="text" name="FNS_YMD" id="FNS_YMD" value='<c:out value="${result.fnsYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_FNS" value="<c:out value="${result.fnsYmd}"/>"/></td>
											<th>준공검사자성명</th>
											<td><input type="text" name="FNS_NAM" id="FNS_NAM" value='<c:out value="${result.fnsNam}"/>'class="input MX_20 CS_20" /></td>
										</tr>
										<tr>
											<th>민원접수번호</th>
											<td colspan="3"><input type="text" name="RCV_NUM" id="RCV_NUM" value="<c:out value="${result.rcvNum}"/>" class="input MX_9 CS_9" />
                            									 <a href="#" onclick="BOOK.fn_open_searchNum('WTT_WSER_MA','RCV_NUM');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                            									 <a href="#" onclick="BOOK.fn_del_searchNum('RCV_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
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
								<div class="Table_left" style="height:165px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>관급자재비</th>
											<td><input type="text" name="GVR_AMT" id="GVR_AMT" value='<c:out value="${result.gvrAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
											<th>사급자재비</th>
											<td><input type="text" name="PRV_AMT" id="PRV_AMT" value='<c:out value="${result.prvAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
										</tr>
										<tr>
											<th>부가가치세</th>
											<td><input type="text" name="TAX_AMT" id="TAX_AMT" value='<c:out value="${result.taxAmt}"/>'  class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
											<th>도로복구비</th>
											<td><input type="text" name="ROR_AMT" id="ROR_AMT" value='<c:out value="${result.rorAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
										</tr>
										<tr>
											<th>설계수수료</th>
											<td><input type="text" name="DFE_AMT" id="DFE_AMT" value='<c:out value="${result.dfeAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
											<th>자재검사수수료</th>
											<td><input type="text" name="GFE_AMT" id="GFE_AMT" value='<c:out value="${result.gfeAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
										</tr>										
										<tr>
											<th>준공검사수수료</th>
											<td><input type="text" name="FFE_AMT" id="FFE_AMT" value='<c:out value="${result.ffeAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
											<th>시설분담금</th>
											<td><input type="text" name="DIV_AMT" id="DIV_AMT" value='<c:out value="${result.divAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
										</tr>	
										<tr>
											<th>기타금액</th>
											<td><input type="text" name="ETC_AMT" id="ETC_AMT" value='<c:out value="${result.etcAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
											<th>공사비총액</th>
											<td><input type="text" name="TOT_AMT" id="TOT_AMT" value='<c:out value="${result.totAmt}"/>' class="input MX_13 CS_13 DT_DOUBLE DD_0" /> 원</td>
										</tr>			
									</table>
								</div>
							</div>
						</div>
						<!-- _Tab2 End -->
					</div>
					<!--  TabArea End -->
					<div class="btnTline"><!--버튼구분자--></div>			
					<div class="Btn_R">
						<div class="Btn disInsert"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTT_WSER_MA','RCV_NUM');">민원</a></div>
						<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_PRINT" >
						<div class="Btn disInsert"><a href="#" class="Btn_02"  onclick="BOOK.fn_print_report('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');">출력</a></div>
						</security:authorize>
						<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
					</div>
				</div>
			</div>
	</form>
</div><!-- wrap2 End -->
</body>
</html>
