<%@ page language="java" pageEncoding="UTF-8"%>
<% response.setContentType("application/x-java-jnlp-file"); %>
<?xml version="1.0" encoding="UTF-8"?>
<!-- JNLP File for Administration Tool -->
<jnlp
    spec="1.0+"
    codebase="http://localhost/resource/jnlp/"
    href="GenerateJNLPprint.jsp<%="?"+request.getQueryString()%>">
  <!--codebase: URL to the site containing the jnlp application. It should match the value used on  export.
      Href: the name of this file -->
  <information>
    <!-- user readable name of the application -->
    <title>GeoGate DataViewerEditor </title>
    <!-- vendor name -->
    <vendor>G-inno Systems</vendor>
    <!-- vendor homepage -->
    <homepage href="http://g-inno.com" />
    <!-- product description -->
      <description>GeoGate 3 Updater</description>
  </information>

  <!--request all permissions from the application. This does not change-->
  <security>
    <all-permissions/>
  </security>

  <!-- The name of the main class to execute. This does not change-->
    <application-desc main-class="com.ginno.geogate.updater.Program">
   <!--호스트-->
    <argument>/h</argument>
    <argument>203.236.216.152</argument>
    <!--포트-->
    <argument>/p</argument>
    <argument>21</argument>
    <!--사용자-->
    <argument>/u</argument>
    <argument>ginno</argument>
    <!--비밀번호-->
    <argument>/ps</argument>
    <argument>ginno</argument>
	 <!--모드 true : passive, false: active-->
    <argument>/pm</argument>
    <argument>true</argument>
    <!--인코딩-->
    <argument>/e</argument>
    <argument>utf-8</argument>
    <!--로컬 설치 폴더-->
    <argument>/ld</argument>
    <argument>C:\G-Inno Systems\Print</argument>
    <!--원격 배포 폴더.-->
    <argument>/rd</argument>
    <argument>/MapPrint</argument>
    <!--자동 실행 자동 실행. 
	true이면 사용자 입력을 기다리지 않고 바로 업데이트 및 프로그램 실행. 
	false이면 사용자가 버튼을 클릭하여야 업데이트가 진행됨 -->
    <argument>/ar</argument>
    <argument>true</argument>
	 <!--http rollback-->
    <!-- <argument>/mf</argument>
    <argument>http://203.236.216.152:8087/DataViewerEditor/file.xml</argument> -->
	<!--실행 대상-->
    <argument>/t</argument>
    <argument>MapPrint.exe</argument>
     <!--대상에 넘길 인수들-->

    <argument>project="project/Usolver3_158_201607.prj"</argument>
	 
<%--     <%
    Object wfmUserPem = request.getParameter("wfmUserPem");
	if(wfmUserPem != null && wfmUserPem.equals("1"))
	{ 
	%>
    <argument>project="project/suwon-basicUflInt.prj"</argument>
    <%}else{ %>
  	<argument>project="project/suwon-basicInt.prj"</argument>
	
    <%} %> --%>
  
    <%if(request.getParameter("username") != null){ %>
    <argument>/Username</argument>
    <argument><%=request.getParameter("username")%></argument>
	<%}%>

	<%if(request.getParameter("extent") != null){ %>
    <argument>/extent</argument>
    <argument><%=request.getParameter("extent")%></argument>
	<%}%>

	<%if(request.getParameter("center") != null){ %>
    <argument>center=<%=request.getParameter("center")%></argument>
	<%}%>

	<%if(request.getParameter("scale") != null){ %>
    <argument>scale=<%=request.getParameter("scale")%></argument>
	<%}%>
	
	<!-- 엑셀 추가 부분 -->
	<%if(request.getParameter("excelFile") != null){ %>
    <argument>excelpath=<%=request.getParameter("excelFile")%></argument>
	<%}%>
	
	<%if(request.getParameter("geocodingtype") != null){ %>
    <argument>geocodingtype=<%=request.getParameter("geocodingtype")%></argument>
	<%}%>
	
	<%if(request.getParameter("userdbdirectory") != null){ %>
    <argument>/UserDBDirectory</argument>
    <argument><%=request.getParameter("userdbdirectory")%></argument>
	<%}%>

	<%if(request.getParameter("editlayer") != null){  %>
    <argument>/EditGeoDataSet</argument>
    <argument><%=request.getParameter("editlayer")%></argument>
	<%}%>
	<%if(request.getParameter("editrecord") != null){ %>
    <argument>/EditRecord</argument>
    <argument><%=request.getParameter("editrecord")%></argument>
	<%}%>
	<%if(request.getParameter("ufmsEditPrivilege") != null){ %>
	<argument>UFMS_EDIT_PRIVILEGE</argument>
    <argument><%=request.getParameter("ufmsEditPrivilege")%></argument>
	<%}%>


	<%if(request.getParameter("username") != null){ %>
    <argument>USR_IDE</argument>
    <argument><%=request.getParameter("username")%></argument>
	<%}%>
	
	<%if(request.getParameter("prntSysCde") != null){ %>
    <argument>SYS_CDE</argument>
    <argument><%=request.getParameter("prntSysCde")%></argument>
	<%}%>
	<%if(request.getParameter("username") != null){ %>
	<argument>USR_IDE=<%=request.getParameter("username")%></argument>
	<%}%>
	
	<%if(request.getParameter("SLD") != null){ %>
	<argument>SLD=<%=request.getParameter("SLD")%></argument>
	<%}%>
	
	
	
  </application-desc>

  
  
  <resources os="Windows" arch="x86">
    <j2se version="1.4+" />
    <jar href="lib/swt-win32-windows-x86.jar" />
  </resources>
  <resources os="Windows" arch="x86_64">
    <j2se version="1.4+" />
    <jar href="lib/swt-win32-windows-x86_64.jar" />
  </resources>
  <resources os="Windows" arch="amd64">
    <j2se version="1.4+" />
    <jar href="lib/swt-win32-windows-x86_64.jar" />
  </resources>

   <resources>
    <j2se version="1.5+" java-vm-args="-ea " />
    <jar href="lib/commons-net-3.1.jar"/>
    <jar href="lib/ginno.updator.102.jar"/>
  </resources>

</jnlp>
