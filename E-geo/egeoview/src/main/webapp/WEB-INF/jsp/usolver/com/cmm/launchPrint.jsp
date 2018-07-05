<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%

String baseUrl="";

String urlInfo="";



if(request.getParameter("baseUrl") != null){ 
	baseUrl=request.getParameter("baseUrl").toString();
}


if(request.getParameter("printUrl") != null){ 
	urlInfo=request.getParameter("printUrl").toString();
}


if(request.getParameter("username") != null){ 
	urlInfo=urlInfo+"?username="+request.getParameter("username").toString();
}


if(request.getParameter("extent") != null){ 
	urlInfo=urlInfo+"&extent="+request.getParameter("extent").toString();
}

if(request.getParameter("center") != null){ 
	urlInfo=urlInfo+"&center="+request.getParameter("center").toString();
}

if(request.getParameter("scale") != null){ 
	urlInfo=urlInfo+"&scale="+request.getParameter("scale").toString();
}

if(request.getParameter("userdbdirectory") != null){ 
	urlInfo=urlInfo+"&userdbdirectory="+request.getParameter("userdbdirectory").toString();
}

if(request.getParameter("editlayer") != null){ 
	urlInfo=urlInfo+"&editlayer="+request.getParameter("editlayer").toString();
}
if(request.getParameter("editrecord") != null){ 
	urlInfo=urlInfo+"&editrecord="+request.getParameter("editrecord").toString();
}

if(request.getParameter("ufmsEditPrivilege") != null){ 
	urlInfo=urlInfo+"&ufmsEditPrivilege="+request.getParameter("ufmsEditPrivilege").toString();
}

if(request.getParameter("wfmUserPem") != null){ 
	urlInfo=urlInfo+"&wfmUserPem="+request.getParameter("wfmUserPem").toString();
}

if(request.getParameter("prntSysCde") != null){ 
	urlInfo=urlInfo+"&prntSysCde="+request.getParameter("prntSysCde").toString();
	
}
if(request.getParameter("SLD") != null){ 
	urlInfo=urlInfo+"&SLD="+request.getParameter("SLD").toString();
	
}
if(request.getParameter("USER_IDE") != null){ 
	urlInfo=urlInfo+"&USER_IDE="+request.getParameter("USER_IDE").toString();
	
}
if(request.getParameter("myTheme") != null){ 
	urlInfo=urlInfo+"&geocodingtype="+request.getParameter("myTheme").toString();
	
}
if(request.getParameter("excelFile") != null){ 
	urlInfo=urlInfo+"&excelFile="+request.getParameter("excelFile").toString();
	
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>편집실행버전확인</title>
<script type="text/javascript" src="http://www.java.com/js/deployJava.js"></script>
<script type="text/javaScript" language="javascript" defer="defer"><!--


	var jnlp ="<%=urlInfo%>";
	//alert("jnlp+>"+jnlp);
	
	//alert(jnlp);

	
	var version = "1.8+";
	//	deployJava.launchWebStartApplication(jnlp, version);


	if (deployJava.versionCheck(version)) {
		//alert("version match");
		deployJava.launchWebStartApplication(jnlp, version);
		self.close();
	}
	else {
		//alert("version mismatch");
		alert("자바 버전이 실행 가능 한 버전이 아닙니다.\n 설치를 진행 합니다. ");
		var install = deployJava.installJRE(version);
		//            var install = deployJava.installLatestJRE();
		

		if (install == false) {
			window.location = "<%=baseUrl%>"+"/resource/jnlp/jdk-8u91-windows-i586.exe";
		}
	}
	
//
--></script>

<style type="text/css">
* {margin:0; padding:0;}
body {background-color:#e8f1f9;}
.popwrappper {width:350px; padding:20px 0; font-size:12px; font-weight:bold; color:#004071; text-align:center;}
.popwrappper p {margin-bottom:5px;}
</style>

</head>
<body>
   <div class="popwrappper">  
    <p>
        곧 JRE 설치와 GeoGate 업데이트가 진행됩니다.</p>
    <p>
        만일 기다려도 프로그램이 시작되지 않는 경우,</p>
    <p><a href="http://localhost/resource/jnlp/jdk-8u91-windows-i586.exe">
         여기</a>를 클릭하여 JRE를 다운로드 하십시오.</p>
   </div>
</body>
</html>
