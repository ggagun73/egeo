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
  * @Description :   WTL_LEAK_PS  누수지점 및 복구관리 
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
		BOOK.fn_create_datepicker("frm_detail","LEK_YMD" , 10);	//누수일자
		BOOK.fn_create_datepicker("frm_detail","REP_YMD" , 10);	//복구일자
		
		// 2) input, select 항목 init
		BOOK.fn_init_formObject("frm_detail");
		
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
<form id="frm_detail" name="frm_detail" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="screen_mode" name="screen_mode" value=""/>
<input type="hidden" id="callBackFunction" name="callBackFunction" value=""/>
<input type="hidden" id="nJDSKSubId" name="nJDSKSubId" value='<c:out value="${nJDSKSubId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
<!--key//-->
<%-- <input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/> --%>
<input type="hidden" id="FID" name="FID" value="<c:choose><c:when test="${result.g2Id eq null}"><c:out value="${g2Id}"/></c:when><c:otherwise><c:out value="${result.g2Id}"/></c:otherwise></c:choose>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME"  value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN" value="FTR_IDN"/>
<!--key//-->
		<div id="wrap2">
			<div id="container2"> 
				<div id="content2">
					<div class="TxtBg">
						<dl>
							<dt>관리번호</dt>
							<dd><c:out value="${result.ftrIdn}" /></dd>
							<dt>도엽번호</dt>
							<dd><c:out value="${result.shtNum}" /></dd>
						</dl>
					</div>
					<!-- tab -->
					<div class="TabArea">
						<div class="TabBx">
							<ul class="Tabs">
								<li class="_Tab1"><a href="#" class="Tab Tab_selected">일반사항</a></li>
								<li class="_Tab2"><a href="#" class="Tab">복구현황</a></li>
								<security:authorize ifAnyGranted ="ROLE_WATER_MAP_VIEW" >
								<li class="TabBt disInsert"><a href="#" onClick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>','<c:out value="${result.g2Id}"/>');"><img id="imgPosition" src="<c:url value='/images/usolver/com/book/p_btn_view.gif'/>" alt="위치보기" /></a></li>
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
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="19%" />
											<col width="31%" />
											<col width="19%" />
											<col width="31%" />
										</colgroup>
										<tr>
											<th>행정읍/면/동</th>
											<td><select name="HJD_CDE" id="HJD_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${hjd_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.hjdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>누수일자</th>
											<td><input type="text" name="LEK_YMD" id="LEK_YMD" value="<c:out value="${result.lekYmd}"/>" class="input DT_DATE" />
											<input type="hidden" id="DATE_LEK" value="<c:out value="${result.lekYmd}"/>"/></td>
										</tr>
										<tr>
											<th>누수위치설명</th>
											<td colspan="3"><input type="text" name="LEK_LOC" id="LEK_LOC" style="width:80%;" value='<c:out value="${result.lekLoc}"/>' class="input MX_50 CS_50" /></td>
										</tr>
										<tr>
											<th>민원접수번호</th>
											<td><input type="text" name="RCV_NUM" id="RCV_NUM" value="<c:out value="${result.rcvNum}"/>" class="input CS_9"  readonly />
                            					  <a href="#" onclick="BOOK.fn_open_searchNum('WTT_WSER_MA','RCV_NUM');">	<img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                            					  <a href="#" onclick="BOOK.fn_del_searchNum('RCV_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                            				</td>
											<th>대장초기화여부</th>
											<td><select name="SYS_CHK" id="SYS_CHK"  class="select" >
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
						<!-- _Tab2  공사-->
						<div id="_Tab2" class="PSection">
							<div class="Table_LBx">
								<div class="Table_left" style="height:200px">
									<table>
										<colgroup>
											<col width="22%" />
											<col width="30%" />
											<col width="22%" />
											<col width="30%" />
										</colgroup>
										<tr>
											<th>상수관로 지형지물부호</th>
											<td><select name="PIP_CDE" id="PIP_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${pip_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.pipCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>상수관로 관리번호</th>
											<td><input type="text" name="PIP_IDN" id="PIP_IDN" value='<c:out value="${result.pipIdn}"/>' class="input MX_10 CS_10 "  readonly />
												  <a href="#" onclick="BOOK.fn_open_searchNum('WTL_PIPE_LM','PIP_IDN');"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
												  <a href="#" onclick="BOOK.fn_del_searchNum('PIP_IDN','PIP_CDE');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
											</td>
										</tr>
										<tr>
											<th>관재질</th>
											<td><select name="PIP_MOP" id="PIP_MOP"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${pip_mop_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.pipMop}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>관구경</th>
											<td><input type="text" name="PIP_DIP" id="PIP_DIP" value='<c:out value="${result.pipDip}"/>' class="input MX_4 CS_4 DT_INT DD_0" /> mm</td>
										</tr>
										<tr>
											<th>누수원인</th>
											<td><select name="LRS_CDE" id="LRS_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${lrs_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.lrsCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select></td>
											<th>누수부위</th>
											<td><select name="LEP_CDE" id="LEP_CDE"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${lep_cde_list}">
													<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.lepCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
													</c:forEach>
												</select>
											</td>
										</tr>
										<tr>
											<th>누수현황</th>
											<td><input type="text" name="LEK_EXP" id="LEK_EXP" value='<c:out value="${result.lekExp}"/>' class="input MX_50 CS_50" /></td>
											<th>복구일자</th>
											<td><input type="text" name="REP_YMD" id="REP_YMD" value='<c:out value="${result.repYmd}"/>' class="input DT_DATE" />
											<input type="hidden" id="DATE_REP" value="<c:out value="${result.repYmd}"/>"/></td>
										</tr>
										<tr>
											<th>누수복구내용</th>
											<td><input type="text" name="REP_EXP" id="REP_EXP" value='<c:out value="${result.repExp}"/>' class="input MX_50 CS_50" /></td>
											<th>소요자재내역</th>
											<td><input type="text" name="MAT_DES" id="MAT_DES" value='<c:out value="${result.matDes}"/>' class="input MX_100 CS_100" /></td>
										</tr>
										<tr>
											<th>누수복구자명</th>
											<td colspan="3"><input type="text" name="REP_NAM" id="REP_NAM" value='<c:out value="${result.repNam}"/>' class="input MX_20 CS_20" /></td>
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
						<div class="Btn disBatchUp"><a href="#" class="Btn_02"  onclick="BOOK.fn_view_image('<c:out value="${result.ftrCde}"/>','<c:out value="${result.ftrIdn}"/>','','WTT_IMGE_ET');">도면/사진</a></div>						
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTT_WSER_MA','RCV_NUM');">민원</a></div>  <!-- onclick="fn_Image('', '', $('#CNT_NUM').val());" -->
						<div class="Btn disBatchUp"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('WTL_PIPE_LM','PIP_IDN');">상수관로대장</a></div>  
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
