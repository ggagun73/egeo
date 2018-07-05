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
  * @Description : RDT_FEIM_DT 도로점용료부과내역
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
	$( document ).ready(function() {			
		// 1 )달력
		BOOK.fn_create_datepicker("frm","ASS_YMD", 10);
		BOOK.fn_create_datepicker("frm","EPR_YMD", 10);
		BOOK.fn_create_datepicker("frm","APR_YMD", 10);
		
		BOOK.fn_init_formObject("frm");
		BOOK.fn_view_mode('frm');
		
		<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
			BOOK.fn_edit_mode('frm');
		</security:authorize>
		
		if( '<c:out value="${action_flag}"/>' === 'INSERT' ){
			$('.activeWindow').find('.disInsert').hide(); 
			$('.activeWindow').find('.visInsert').show(); 
		}else {
			$('.activeWindow').find('.disInsert').show(); 
			$('.activeWindow').find('.visInsert').hide(); 
		}
		
	});
</script>
</head>
<body>
<form id="frm" name="frm" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="nJDSKSubId" name="nJDSKSubId" value='<c:out value="${nJDSKSubId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<input type="hidden" id="openerId" name="openerId" value='<c:out value="${openerId}"/>' />
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="PMS_IDN" name="PMS_IDN" value="<c:out value="${result.pmsIdn}"/>"/>
<input type="hidden" id="OCP_IDN" name="OCP_IDN" value="<c:out value="${result.ocpIdn}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="OCP_IDN"/>
<!--key//-->
		<div class="TxtBg">
			<dl class="disInsert">
				<dt>부과일련번호</dt>
				<dd><c:out value="${result.ocpIdn}" /></dd>
			</dl>
			<dl class="visInsert">
				<dt>허가일련번호</dt>
				<dd><c:out value="${result.pmsIdn}" /></dd>
			</dl>
		</div>
		<div class="PSection3">
			<div class="Table_LBx">
				<div class="Table_left">
					<table>
						<colgroup>
							<col width="20%" />
							<col width="30%" />
							<col width="20%" />
							<col width="30%" />
						</colgroup>
						<tr>
							<th>점용료부과일자</th>
							<td colspan="3"><input type="text" name="ASS_YMD" id="ASS_YMD" value="<c:out value="${result.assYmd}"/>" class="input DT_DATE" /></td>
						</tr>
						<tr>
							<th>납기만기일</th>
							<td><input type="text" name="EPR_YMD" id="EPR_YMD" value="<c:out value="${result.eprYmd}"/>" class="input DT_DATE" /></td>
							<th>납기후만기일</th>
							<td><input type="text" name="APR_YMD" id="APR_YMD" value="<c:out value="${result.aprYmd}"/>" class="input DT_DATE" /></td>												
						</tr>
						<tr>
							<th>전년점용료</th>
							<td><input type="text" name="PYR_AMT" id="PYR_AMT" value='<c:out value="${result.pyrAmt}"/>' class="input MX_11 DT_INT" />원</td>
							<th>조정점용료</th>
							<td><input type="text" name="RCN_AMT" id="RCN_AMT" value='<c:out value="${result.rcnAmt}"/>' class="input MX_11 DT_INT" />원</td>											
						</tr>
						<tr>
							<th>증가율</th>
							<td><input type="text" name="INC_RAT" id="INC_RAT" value='<c:out value="${result.incRat}"/>' class="input MX_4 DT_FLOAT DD_2" />%</td>
							<th>감면조정료</th>
							<td><input type="text" name="RDC_AMT" id="RDC_AMT" value='<c:out value="${result.rdcAmt}"/>' class="input MX_11 DT_INT" />원</td>										
						</tr>
						<tr>
							<th>감면비율</th>
							<td><input type="text" name="RDC_RAT" id="RDC_RAT" value='<c:out value="${result.rdcRat}"/>' class="input MX_4 DT_FLOAT DD_2" />%</td>
							<th>점용료-변상금</th>
							<td><input type="text" name="PVS_AMT" id="PVS_AMT" value='<c:out value="${result.pvsAmt}"/>' class="input MX_11 DT_INT" />원</td>										
						</tr>
						<tr>
							<th>점용료산출내역</th>
							<td colspan="3"><textarea id="STM_DES" name="STM_DES" class="MX_100 CS_100" cols="70" rows="4"><c:out value="${result.stmDes}"/></textarea></td>
						</tr>
						<tr>
							<th>과세대상</th>
							<td colspan="3"><input type="text" name="TAX_DES" id="TAX_DES" value='<c:out value="${result.taxDes}"/>' class="input MX_100 CS_100" /></td>
						</tr>
						<tr>
							<th>수납번호</th>
							<td><input type="text" name="REC_NUM" id="REC_NUM" value='<c:out value="${result.recNum}"/>' class="input MX_30 CS_30" /></td>
							<th>수납여부</th>
							<td><select name="REC_CDE" id="REC_CDE" class="select">
								<option value=""></option>
								<c:forEach var="selectData" items="${rec_cde_list}">
									<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.recCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
							</select></td>						
						</tr>
						<tr>
							<th>납기후금액</th>
							<td><input type="text" name="AEX_AMT" id="AEX_AMT" value='<c:out value="${result.aexAmt}"/>' class="input MX_11 DT_INT" />원</td>
							<th>체납액</th>
							<td><input type="text" name="FCS_AMT" id="FCS_AMT" value='<c:out value="${result.fcsAmt}"/>' class="input MX_11 DT_INT" />원</td>										
						</tr>
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>		
			<div class="Btn_pd2">
				<security:authorize ifAllGranted ="ROLE_ROAD_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>')">닫기</a></div>
			</div>
		</div>
</form>
</body>
</html>