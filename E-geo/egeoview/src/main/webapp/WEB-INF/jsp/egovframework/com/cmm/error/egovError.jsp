<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>오류메세지</title>
<link type="text/css" rel="stylesheet" href="/css/usolver/com/cmm/admin.css"/>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="/js/usolver/com/comm/common.js"></script>
</head>
<body> 
<div id="W_400">
    <div class="errorBx">
            <div class="errorBxin">
                <h1>에러메세지</h1>
                <div>
                    <c:out value="${exception.message}"/><br />
                    request_uri = <c:out value="${requestScope['javax.servlet.error.request_uri']}"/><br>
                    exception = <c:out value="${requestScope['javax.servlet.error.exception']}"/><br>
                </div>                
            </div>
            <div class="Btn_R">
            	<div class="Btn"><a href="#" class="Btn_02">확인</a></div>
            </div>
      </div>
</div>
</body>
</html>

<%-- 
<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/egovCvpl.css'/>"/>
<title>오류가 발생하였습니다./egovframework/com/cmm/error/egovError.jsp</title>
</head>
<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="100%" height="100%" align="center" valign="middle" style="padding-top:150px;"><table border="0" cellspacing="0" cellpadding="0">
	  <tr>
		<td class="<spring:message code='image.errorBg' />">
		<img src="<c:url value='/images/egovframework/com/cmm/danger.jpg' />" width="74" height="74" alt="경고이미지"/>
		<span style="font-family:Tahoma; font-weight:bold; color:#000000; line-height:150%; width:440px; height:70px;">
		 <c:out value="${exception.message}"/><br>
		status_code = <c:out value="${requestScope['javax.servlet.error.status_code']}"/><br>
		exception_type = <c:out value="${requestScope['javax.servlet.error.exception_type']}"/><br>
		message = <c:out value="${requestScope['javax.servlet.error.message']}"/><br>
		request_uri = <c:out value="${requestScope['javax.servlet.error.request_uri']}"/><br>
		exception = <c:out value="${requestScope['javax.servlet.error.exception']}"/><br>
		servlet_name = <c:out value="${requestScope['javax.servlet.error.servlet_name']}"/><br>
 </td>
	  </tr>
	</table></td>
  </tr>
</table>
</body>
</html> --%>