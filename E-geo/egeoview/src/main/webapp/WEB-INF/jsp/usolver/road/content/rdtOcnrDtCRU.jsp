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
  * @Description : RDT_OCNR_DT 도로인접지번내역
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
		//createDatepicker( "ATR_YMD" , 10);
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
<input type="hidden" id="JFC_NUM" name="JFC_NUM" value="<c:out value="${result.jfcNum}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="JFC_NUM"/>
<!--key//-->
		<div class="TxtBg">
			<dl class="disInsert">
				<dt>인접지일련번호</dt>
				<dd><c:out value="${result.jfcNum}" /></dd>
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
							<th>법정읍/면/동</th>
							<td><select name="EBD_CDE" id="EBD_CDE" class="select">
									<option value=""></option>
									<c:forEach var="selectData" items="${ebd_cde_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.ebdCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
									</c:forEach>
								 </select>
							</td>
							<th>대지구분</th>
							<td><select name="EDJ_CDE" id="EDJ_CDE" class="select">
									<option value=""></option>
									<c:forEach var="selectData" items="${edj_cde_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.edjCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
									</c:forEach>
								 </select>
							</td>													
						</tr>
						<tr>
							<th>도로지번-본번</th>
							<td><input type="text" name="EAC_NUM" id="EAC_NUM" value='<c:out value="${result.eacNum}"/>' class="input MX_4 CS_4" /></td>
							<th>도로지번-부번</th>
							<td><input type="text" name="EAD_NUM" id="EAD_NUM" value='<c:out value="${result.eadNum}"/>' class="input MX_4 CS_4" /></td>											
						</tr>
						<tr>
							<th>지가</th>
							<td colspan="3"><input type="text" name="ENP_AMT" id="ENP_AMT" value='<c:out value="${result.enpAmt}"/>' class="input MX_11 DT_INT" />원</td>											
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