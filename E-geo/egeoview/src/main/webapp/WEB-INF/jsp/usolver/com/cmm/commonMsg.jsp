<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="<c:url value='/extLib/jquery/jquery-1.11.1.js'/>"></script>
<script type="text/javaScript" language="javascript" defer="defer">
// 페이지 로딩 초기 설정
$( document ).ready(function() {
	try {
<c:choose>
	<c:when test = "${resultMsg == 'SAVE_SUCCESS'}">
		alert('<c:if test = "${!empty resultCnt}"><c:out value="${resultCnt}"/>건</c:if> <spring:message code="success.common.insert" />');
		 <c:if test = "${!empty callBackFunction}">
		 parent.<c:out value="${callBackFunction}"/>('<c:out value="${OID}"/>');
		</c:if>
	</c:when>
	<c:when test = "${resultMsg == 'INSERT_SUCCESS'}">
		alert('<c:if test = "${!empty resultCnt}"><c:out value="${resultCnt}"/>건</c:if> <spring:message code="success.common.insert" />');
		 <c:if test = "${!empty callBackFunction}">
		 parent.<c:out value="${callBackFunction}"/>(<c:out value="${g2Id}"/>);
		</c:if>
	</c:when>
	<c:when test = "${resultMsg == 'UPDATE_SUCCESS'}">
		alert('<c:if test = "${!empty resultCnt}"><c:out value="${resultCnt}"/>건</c:if> <spring:message code="success.common.update" />');
		 <c:if test = "${!empty callBackFunction}">
		 parent.<c:out value="${callBackFunction}"/>();
		</c:if>
	</c:when>
	<c:when test = "${resultMsg == 'DELETE_SUCCESS'}">
		alert('<spring:message code="success.common.delete"  arguments="${resultCnt}" />');
		var sCall = '<c:out value="${callBackFunction}"/>';
		if( sCall.indexOf("fn") > 0 ){ parent.<c:out value="${callBackFunction}"/>(); }
		else{ parent.BOOK.fn_search_openerGrid('<c:out value="${callBackFunction}"/>');}
		self.close();
	</c:when>
	<c:when test = "${resultMsg == 'FILE_DELETED'}">
		alert('<spring:message code="success.common.delete.file" />');
		 <c:if test = "${!empty callBackFunction}">
		 parent.<c:out value="${callBackFunction}"/>();
		</c:if>
	</c:when>
	<c:when test = "${resultMsg == 'NO_DATA'}">
		alert('<spring:message code="common.nodata.msg" />');		
		parent.BOOK.fn_close_window();
	</c:when>
	<c:when test = "${resultMsg == 'ERROR'}">
		alert('<spring:message code="fail.common.msg"  arguments="${errorMsg}" />');
	</c:when>
	<c:when test = "${resultMsg == 'VALIDATION'}">
		alert('${errorMsg}');
	</c:when>
</c:choose>
	} catch(E) {alert(E);}
});
</script>
</head>
<body>
</body>
</html>