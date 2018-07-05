<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
	<validator:javascript formName="wttWutlHtVO" staticJavascript="false" xhtml="true" cdata="false"/>

	<script type="text/javascript">
		// 페이지 로딩 초기 설정
		$( document ).ready(function() {
						
			//달력	
			BOOK.fn_init_formObject("frm");
			BOOK.fn_view_mode('frm');
			
			<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
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
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="ATT_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="ATT_NUM" name="ATT_NUM" value="<c:out value="${result.attNum}"/>"/>
		<div class="TxtBg">
			<dl>
				<dt>세부시설일련번호</dt>
				<dd><c:out value="${result.attNum}"/></dd>
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
							<th>세부시설명</th>
							<td><input type="text" name="ATT_NAM" id="ATT_NAM"  style="width:200px" value="<c:out value="${result.attNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>시설개요</th>
							<td><textarea id="ATT_DES"  name="ATT_DES"  class="MX_500 CS_500" cols="40" rows="6"><c:out value="${result.attDes}"/></textarea></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>	
			<div class="Btn_pd2">
				<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>');">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
			</div>
	</div>
</form>
</body>
</html>
