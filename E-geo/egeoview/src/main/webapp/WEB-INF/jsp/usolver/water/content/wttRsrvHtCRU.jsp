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
  * @Description :    WTT_RSRV_HT   저수조 청소이력
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
						
			//달력
			BOOK.fn_create_datepicker("frm","CLN_YMD" , 10);	
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
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="CLN_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="CLN_NUM" name="CLN_NUM" value="<c:out value="${result.clnNum}"/>"/>
		<div class="TxtBg">
			<dl>
				<dt>청소일련번호</dt>
				<dd><c:out value="${result.clnNum}"/></dd>
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
							<th>청소일자</th>
							<td><input type="text" name="CLN_YMD" id="CLN_YMD" value="<c:out value="${result.clnYmd}"/>" class="input DT_DATE" /></td>
						</tr>
						<tr>
							<th>청소업체명</th>
							<td colspan="3"><input type="text" name="CLN_NAM" id="CLN_NAM"  style="width:200px" value="<c:out value="${result.clnNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>청소내용</th>
							<td colspan="3"><input type="text" name="CLN_EXP" id="CLN_EXP"  style="width:200px" value="<c:out value="${result.clnExp}"/>" class="input MX_50 CS_50" />
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