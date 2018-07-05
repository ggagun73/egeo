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
  * @Description :   WTT_SUBC_DT  하도급내역
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
	<script type="text/javascript">
		// 페이지 로딩 초기 설정
		$( document ).ready(function() {
			
			BOOK.fn_init_formObject("frm");

			BOOK.fn_view_mode('frm');
			
			<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
				BOOK.fn_edit_mode('frm');
			</security:authorize>			
		});
	</script>
</head>
<body>
<form id="frm" name="frm" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="openerId" name="openerId" value="<c:out value="${openerId}"/>"/>
<input type="hidden" id="nJDSKSubId" name="nJDSKSubId"  value="<c:out value="${nJDSKSubId}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="SUB_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="CNT_NUM" name="CNT_NUM" value="<c:out value="${result.cntNum}"/>"/>
<input type="hidden" id="SUB_NUM" name="SUB_NUM" value="<c:out value="${result.subNum}"/>"/>
		<div class="TxtBg">
			<dl>
				<dt>하도급일련번호</dt>
				<dd><c:out value="${result.subNum}"/></dd>
			</dl>
		</div>
		<div class="PSection3">
			<div class="Table_LBx">
				<div class="Table_left">
					<table>
						<colgroup>
							<col width="30%" />
							<col width="70%" />
						</colgroup>
						<tr>
							<th>하도급자명</th>
							<td><input type="text" name="SUB_NAM" id="SUB_NAM"  value="<c:out value="${result.subNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>대표자성명</th>
							<td><input type="text" name="PSB_NAM" id="PSB_NAM" value="<c:out value="${result.psbNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>주소</th>
							<td><input type="text" name="SUB_ADR" id="SUB_ADR"  style="width:200px" value="<c:out value="${result.subAdr}"/>" class="input MX_50 CS_50" /></td>
						</tr>
						<tr>
							<th>전화번호</th>
							<td><input type="text" name="SUB_TEL" id="SUB_TEL"  style="width:200px" value="<c:out value="${result.subTel}"/>" class="input MX_30 CS_30" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>		
			<div class="Btn_pd2">
				<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
			</div>
	</div>
</form>
</body>
</html>
