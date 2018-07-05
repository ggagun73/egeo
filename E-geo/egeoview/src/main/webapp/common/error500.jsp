<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/sample.css'/>"/>
<script type="text/javascript">
alert("오류가 발생하였습니다. 관리자에게 문의하시기 바랍니다.");
</script>
<title>err.500.오류가 발생하였습니다. /common/error500.jsp</title>
</head>
<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="100%" height="100%" align="center" valign="middle" style="padding-top:150px;"><table border="0" cellspacing="0" cellpadding="0">
	  <tr>
		<td class="<spring:message code='image.errorBg' />">
		<span style="font-family:Tahoma; font-weight:bold; color:#000000; line-height:150%; width:440px; height:70px;">
		<c:out value="${exception.message}"/><br>
		status_code = <c:out value="${requestScope['javax.servlet.error.status_code']}"/><br>
		exception_type = <c:out value="${requestScope['javax.servlet.error.exception_type']}"/><br>
		message = <c:out value="${requestScope['javax.servlet.error.message']}"/><br>
		request_uri = <c:out value="${requestScope['javax.servlet.error.request_uri']}"/><br>
		exception = <c:out value="${requestScope['javax.servlet.error.exception']}"/><br>
		servlet_name = <c:out value="${requestScope['javax.servlet.error.servlet_name']}"/><br>
		</span></td>
	  </tr>
	</table></td>
  </tr>
</table>
</body>
</html>