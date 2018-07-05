<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/reset.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/login.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<title>잘못된 접근입니다.</title>

<script type="text/javascript">
function fn_go_page(){

	if( typeof $(".activeWindow") != "undefined" ){
		window.parent.location.href="/intro.do";	
	}else {
		window.location.href="/intro.do";	
	}

}
</script>
</head>
<body>
<div id="content">
	<div class="loginBx" >
	   <div class="loginInbx">
	     <div class="loginContbx" style="position:absolute; left:50%; margin-left:-200px; margin-top: 100px;">
            <div class="errorBxin" style="width:250px;">
                <h1>잘못된 접근입니다.</h1>
                <br>올바른 방법으로 접근하시기 바랍니다.</p>            
            </div>
            <div class="Btn_R" style="width:300px;">
            	<div class="Btn"><a href="#" onClick="fn_go_page()" class="Btn_02">확인</a></div>
            </div>
   		 </div>	    
		</div>
	</div>
</div>
</body>
</html>