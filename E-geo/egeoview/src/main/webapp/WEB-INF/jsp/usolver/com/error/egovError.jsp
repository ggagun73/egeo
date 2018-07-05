<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/reset.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/login.css'/>"/>
<title>오류가 발생하였습니다. /usolver/com/cmm/egovError.jsp </title>
</head>
<body>
<div id="content">
	<div class="loginBx">
	   <div class="loginInbx">
	      <div class="loginContbx" style="position:absolute; left:50%; margin-left:-200px; margin-top: 100px;">
			<div id="hero-slider">
				<div class="panel">
		            <h2>오류가 발생하였습니다.</h2>
		            <p>관리자에게 문의하시기 바랍니다. </p>
		            <dl>
				        <dt></dt>
				        <dd>
				            <div>
				               <%-- <c:out value="${exception.message}"/><br>  나중엔 이것만 남겨두도록 --%>
								status_code = <c:out value="${requestScope['javax.servlet.error.status_code']}"/><br>
								exception_type = <c:out value="${requestScope['javax.servlet.error.exception_type']}"/><br>
								message = <c:out value="${requestScope['javax.servlet.error.message']}"/><br>
								request_uri = <c:out value="${requestScope['javax.servlet.error.request_uri']}"/><br>
								exception = <c:out value="${requestScope['javax.servlet.error.exception']}"/><br>
								servlet_name = <c:out value="${requestScope['javax.servlet.error.servlet_name']}"/><br>
				            </div>
				        </dd>
				      </dl>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>