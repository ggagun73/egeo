<% response.setHeader("Cache-Control","no-store"); %> 
<% response.setHeader("Pragma","No-cache"); //HTTP 1.0  %>
<% response.setHeader ("Cache-Control", "no-cache");  %>
<% response.setDateHeader ("Expires", 0);  %>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="usolver.com.main.vo.LoginVO" %>
<%@ page import="egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMddHHmmss", java.util.Locale.KOREA);
Long reg_date = Long.parseLong(formatter.format(new java.util.Date())); 
pageContext.setAttribute("reg_date", reg_date);
%>
<%	
	String g_userName = "";
	String g_userId = "";
	String g_initExtent = "";
	
	if( EgovUserDetailsHelper.isAuthenticated() ){
		Object egovUserInfo = EgovUserDetailsHelper.getAuthenticatedUser();
		if (egovUserInfo instanceof LoginVO) {
			g_userName = ((LoginVO) egovUserInfo).getUSER_NAME();
			g_userId =  ((LoginVO) egovUserInfo).getUSER_ID();
			g_initExtent =  ((LoginVO) egovUserInfo).getINIT_EXTENT();
		}  
	}
%>
<!DOCTYPE html>
<html>
<head>
<!-- 

 * nJDesktop Virtual Desktop basic HTML structure
 * Copyright (C) 2012 Nagy Ervin
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by    
 * the Free Software Foundation, either version 3 of the License, or    
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * -----------------------------------------------------------------------
 * Nagy Ervin
 * nagyervin.bws@gmail.com
 * 
 * License: GPL v.3, see COPYING
 * 
 * If you wish to fork this, please let me know: nagyervin.bws@gmail.com.
 * 
 * Please leave this header intact
 * 
 * -----------------------------------------------------------------------
 * Insert your name below, if you have modified this project. If you wish 
 * that change become part of this project (aka i will endorse it), please 
 * send it to me.
 * 
 * I must remind you, that your changes will be subject to the GPL v.3.

 -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>도시정보활용시스템 E-geo</title>

<!-- <link href="/extLib/jdesktop/css/jdesktop.css" rel="stylesheet" /> -->
<!-- <link href="/extLib/jdesktop/css/jquery-ui/jquery-ui.min.css" rel="stylesheet" /> -->
<link href="/extLib/jdesktop/css/jquery-ui/jquery-ui.structure.css" rel="stylesheet" />
<link href="/extLib/jdesktop/css/jquery-ui/jquery-ui.theme.css" rel="stylesheet" />
<link href="/extLib/jdesktop/css/theme/jdesktop.forms.css" rel="stylesheet" />
<link href="/extLib/jdesktop/css/theme/jdesktop.text.css" rel="stylesheet" />
<!-- <link href="/extLib/jdesktop/css/theme/style.css" rel="stylesheet" /> -->
<link href="/css/usolver/com/cmm/jdesktop/main.css" rel="stylesheet" />

<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/jdesktop.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/jquery-ui/jquery-ui.min.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/jquery-ui/jquery-ui.structure.css'/>" />
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/jquery-ui/jquery-ui.theme.css'/>" /> --%>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/theme/jdesktop.forms.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/theme/jdesktop.text.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jdesktop/css/theme/style.css'/>" />
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/jdesktop/main.css'/>" /> --%>

<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jquery/tipped/tipped.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/reset.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/jdesktop/background.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/jdesktop/magic.css'/>" />

<!-- 신규디자인 적용 -->
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jqgrid/css/ui.jqgrid.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/window/css/jquery.window.css'/>"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/reset.css"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/popup.css"/>
<!--[if IE]>
<link href="css/jdesktop.ie.all.css" rel="stylesheet" type="text/css" />  
<![endif]-->
<!--[if lte IE 8]>
<link href="css/jdesktop.ie.css" rel="stylesheet" type="text/css" />  
<![endif]-->
<script>
	nJDSKCurrentTheme = 'redmond';
	
	var json_MenuList ='${json_menu}';  	//메뉴를 생성해 줍니다. 
	var json_MenuInfo ='${json_object}';  	//메뉴 클릭시 이동할 수 있는 경로 및 창 정보를 가지고 있습니다. 
	var json_system = '${json_system}'; 		//현재 접속해 있는 시스템 정보 입니다. 
	var json_system_size = '${json_system_size}';
	var g_userName = '<c:out value="<%=g_userName%>"/>';
	var g_userId = '<c:out value="<%=g_userId%>"/>';
	var sAuthor = true;
	var g_initExtent = '<c:out value="<%=g_initExtent%>"/>';
	
</script>
<link rel="shortcut icon" href="/images/usolver/com/cmm/jdesktop/icon/usolver_favicon2.ico?v=2016032401" type="image/vnd.microsoft.icon">
<link rel="icon" href="/images/usolver/com/cmm/jdesktop/icon/usolver_favicon2.ico?v=2016032401" type="image/vnd.microsoft.icon">
</head>
<body>
<form name="logoutForm" method="POST">				
	<input type="hidden"  id="system"  name="system"  value="<c:out value="${system}"/>" />
</form>	
	<!-- 메뉴가 여기 들어옵니다.  -->
	<div id="startmenuArea" class="Depth2_Bx1 Depth2_Bx2" onMouseOver="MM_showHideLayers('startmenuArea','','show');" onMouseOut="MM_showHideLayers('startmenuArea','','hide');">	
		 <div id="Depth_2Bx"  class="MainMenu">
		</div>		
	</div>	
	<div id="wrapper">
		<!-- header -->
		<div id="taskbar">
			<a id="startmenu" href="#" onMouseOut="MM_swapImgRestore()" onClick="MM_showHideLayers('startmenuArea','','show')" title="상수시설물 대장 메뉴">대장 메뉴</a>
			<!-- <a id="showdesktop" href="#" title="Show desktop">Menu</a> -->
			<div class="separator"></div>
			<div class="taskbarbuttons" id="taskbarbuttons"></div>
			<div class="separator"></div>
			<div class="TopIcoBx">
				 <security:authorize ifAnyGranted="ROLE_BASIC"> 
					<div class="userBx"><strong><c:out value="<%=g_userName%>"/>(<c:out value="<%=g_userId%>"/>)</strong>님 반갑습니다.					
						<a id="logout"  href="#" title="logout"><img alt="로그아웃" src="/images/usolver/com/cmm/jdesktop/ic_logout.gif"></a>			
					</div>
				</security:authorize>
				<a id="startmapedit" href="#" title="편집지도" class="startmapedit" name="sysico">편집지도</a>
				<a id="startuserinfo" href="#" title="사용자정보" class="startuserinfo" name="sysico">사용자정보</a>				
				<security:authorize  ifAnyGranted="ROLE_BASIC"> 
				<a id="showdesktop" href="#" title="템플릿 선택" class="showdesktop" name="sysico">템플릿</a>
				<a id="startfavorite" href="#" title="즐겨찾기메뉴" class="startfavorite" name="sysico">즐겨찾기메뉴</a>
				<security:authorize ifAnyGranted="ROLE_WATER,ROLE_SEWER,ROLE_ROAD">
					<a id="changeSystem" href="#" title="시스템전환" class="changeSystem" name="sysico">시스템전환</a>
				</security:authorize>
				</security:authorize>
				<security:authorize ifAnyGranted ="ROLE_ADMIN" >
				<a id="startadmin" href="#" title="관리자" class="startadmin" name="sysico">관리자</a>
				</security:authorize>
			</div>
		</div>
		<!-- //header -->
		
		<div id="desktop">
			<div id="desktop_iconarea" ondragover="return false;" ondragenter="return false;" ondrop="drop(this, event);"><div id="desktop_titlearea"></div></div>
		</div>
		<div id="widgets"></div>
		<div id="statusbar">
			<ul></ul>
		</div>		
		<!-- <div id="startmenuDiv" style="left: 5px; top: 30px; width: 80%; height: 520px; display: none; position: absolute; background-color:#fff; z-index: 1005;">
			<a class="draggable iconmenu" id="draggable_menuid-10" ><img src="/extLib/jdesktop/images/bws_logo2k9.png"><span>새로추가</span></a>	
		</div>	 -->
		<!-- Origin -->
		<div id="content"  style="display:none;">
			<div class="FavoriteBx">
		    	<div class="FavoriteTit"><img id="imgFavorite" src="/images/usolver/com/cmm/jdesktop/menu/favorite_tit.png" alt="즐겨찾기"/></div>
		        <div class="FavoriteCon" id="FavoriteCon" ondragover="return false;" ondragenter="return false;" ondrop="drop(this, event);"></div>
	    	</div>	
	    </div>	
		<div id="favoriteMenu" ondragover="return false;" ondragenter="return false;" ondrop="drop(this, event);" style="display: none; top: 32px; width:154px; height: 92%; right: 0px; bottom: 24px; position: absolute; z-index: 1; background:url(/images/usolver/com/cmm/jdesktop/menu/favorite_bg.png) 0 0 repeat-y;">
		<div style="top: 32px; right: 0px; bottom: 24px;"><img src="/images/usolver/com/cmm/jdesktop/menu/favorite_tit.png" alt="즐겨찾기"/></div>	
		</div>
		<!-- <div id="favoriteMenu" style="top: 32px; width: 20%; height: 92%; right: 2px; bottom: 24px; position: absolute; z-index: 1; background-color: rgb(238, 238, 238);" ondragover="return false;" ondragenter="return false;" class="fl" ondrop="drop(this, event);">바로가기 만들기</div> -->	
		<div id="makeShoutcut" style="bottom:0px; width:100%; height:50px; display: none; position: absolute; background-color:#eee; z-index: 1;">바로가기 만들기</div>
		<div id="selectWindowType" style="display: none; top: 32px; width:140px; height: 33px; right: 50px; bottom: 24px; position: absolute; z-index: 9999;border:1px #636363 solid;">
         <ul>
             <li class="FL"><a href="#" id="btnCloseAllWindow"><img src="<c:url value='/images/usolver/com/cmm/jdesktop/ico_bg_window.png'/>"  alt="바탕화면"  title="바탕화면"/></a></li>
             <li class="FL"><a href="#" id="btnShowOnlyMap"><img src="<c:url value='/images/usolver/com/cmm/jdesktop/ico_map_window.png'/>"  alt="지도메인만 보기" title="지도메인만 보기" /></a></li>
             <li class="FL"><a href="#" id="btnShowType1"><img src="<c:url value='/images/usolver/com/cmm/jdesktop/ico_type1_window.png'/>"  alt="창 타입1 보기" title="창 타입1 보기" /></a></li>
             <li class="FL"><a href="#" id="btnShowType2"><img src="<c:url value='/images/usolver/com/cmm/jdesktop/ico_type2_window.png'/>"  alt="창 타입2 보기" title="창 타입2 보기" /></a></li>
         </ul>
        </div>
	</div>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jqgrid/js/i18n/grid.locale-kr.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jqgrid/js/jquery.jqGrid.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/msdropdown/jquery.dd.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/jquery.jstree.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/lib/jquery.cookie.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/lib/jquery.hotkeys.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/fileupload/jquery.fileupload.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/spectrum/spectrum.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/vendor/jquery.scrollTo-min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/sliderPro/jquery.sliderPro.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/theme.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/jdesktop.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/jdesktop.widgets.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/app.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jquery/tipped/tipped.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/extLib/proj4js/proj4js.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/proj4js/defs.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/extLib/jsts/javascript.util.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/jsts/jsts.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.debug.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.extension.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/openlayers/deprecated.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/OpenLayersEdit.min.js'/>"></script>
<%-- 	<script type="text/javascript" src="<c:url value='/extLib/mapshaper/mapshaper.js'/>"></script> --%>
	

	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/mapFrame.js'/>"></script>
	
	<%-- <script type="text/javascript" src="<c:url value='/lib/gmap/GMap.debug.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/lib/gutil/GError.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/lib/gutil/GUtil.js'/>"></script> --%>
		
	<!-- NUTs js : debugging -->
<script type="text/javascript" src="<c:url value='/lib/NUTs_20170406_debug.js?v=${reg_date}'/>"></script>

	<!-- NUTs js : devided -->
<%-- 	<script type="text/javascript" src="<c:url value='/lib/NUTs.js?v=${reg_date}'/>"></script> --%>
	
	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/namespace.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/event.js'/>"></script>
<%-- 	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/style.js'/>"></script> --%>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/plugin/jquery.mask.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/namespace.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/config.js'/>"></script>
 	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/register.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/book.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/makeList.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/usolver/com/org/js/dynamic.select.js'/>"></script>
<%-- 	<script type="text/javascript"  src="<c:url value='/js/usolver/com/cmm/mainMenu.js' />" /></script> --%>
 
	<script> 

	$(document).ready(function(e){
		Tipped.create('img');
		Tipped.create('a'); 
		Tipped.create('input'); 
	});
	
	var _themeType= "GRAY";		//스타일 테마 변경을 위한 테마타입 변수 ("GRAY","BLUE",...)
	var _themeWindow;
	var map;
	var serviceUrl;
	
	$(window).bind('beforeunload', function(e) { 
		fn_update_userMapExtent();
	    return "[▩ USolver3 알림 ▩] \n페이지를 새로고침하면 지도 및 대장 정보가 초기화 됩니다."
	    e.preventDefault();
	});
	
	window.onkeydown = function(event) {
	    event = event || window.event; //IE does not pass the event object
	    /* if (lastEvent && lastEvent.keyCode === event.keyCode) {
	        return;
	    } */
	    /* lastEvent = event;
	    heldKeys[event.keyCode] = true; */

	    var keyCode = event.which || event.keyCode; //key property also different

	    switch (keyCode) {
	        case 116:
	        	fn_update_userMapExtent();
	        	if(!confirm('[▩ USolver3 알림 ▩] \n페이지를 새로고침하면 지도 및 대장 정보가 초기화 됩니다. \n계속하시겠습니까?')){
	       			 event.keyCode = 0;
	       			 return false;
	       		 }
	    }
	};
	
	$(function() {
	    $('#content').hide();  
	});
  
  	//드래그 시작시 호출 할 함수
	function drag(target, evt) {   
	    evt.dataTransfer.setData('Text', target.id);
	};
	
	//드롭시 호출 할 함수	
	function drop(target, evt) {
	
	   var id = evt.dataTransfer.getData('Text');
	   //target.appendChild(document.getElementById(id));
	   var test = document.getElementById(id).cloneNode(true);
	   
	   if(target.id == 'FavoriteCon'){
		   target.appendChild(test);
		   evt.preventDefault();
	   }else if(target.id == 'desktop_iconarea'){
		   for(var i=0; i<$('#FavoriteCon a').length; i++){
			   if($('#FavoriteCon a').eq(i).attr('id') == id){
				   $('#FavoriteCon a').eq(i).remove();
			   }
		   }
	   }
	   
	};
	
	function openMap(_sParamter) {
		if(typeof _sParamter === "undefined") _sParamter = "";
		if($(".isMap").length == 0) {
			var newWindow = new nJDSK.Window(1280,600,'지도메인','','/map/map.do'+_sParamter, nJDSK.uniqid(),null,null,null,null,'urlType');
			newWindow.maximize();
			var resizeId = null;
	
			newWindow.onResize=function(win){
				  clearTimeout(resizeId);
				  resizeId = setTimeout(resizeEnd, 100);
			};
	
			function resizeEnd(){
				var ifrMap = $('#ifrMap');
				if(ifrMap){
					map = ifrMap[0].contentWindow.map;
	
					map.updateSize();
				}
			}
		}
		else {
			$(".isMap").show();
		}
	}
	
	// Menu's Tab
	$(".TabBx1 ul a").click(function(){
		$(".TabBx1 ul a").each(function() {		
			$(this).removeClass("D2_TabM_selected");	
			if($(this).attr("class") == "")
				$(this).addClass("D2_TabM");
			$("#"+$(this).attr("id").replace("tab", "div")).hide();
		});			
		$(this).addClass("D2_TabM_selected");
		$("#"+$(this).attr("id").replace("tab", "div")).show();
	});
	
	// Show/hide windows on desktop
    $('a#startfavorite').click(function(e){
    	nJDSK.clearActive();
    	var options = {};
    	if ($('#content').is(':visible'))
    	{
    		$('#content').hide();    		
    	}
    	else
    	{			 
    		$('#content').show( 'blind', options, 500, '');    		
    	}
    }); 
		
	// editMap
	$("#startmapedit").click(function(){
		//$.get('/map/map.do',function(msg){
			openMap();
		//});
	});
	
 
	
	//메뉴클릭시.. 
	$(".TabBx2>a").click(function(){

		var oMenuInfo = jQuery.parseJSON(REGISTER.fn_get_menuInfo($(this).attr('id')));
				
		var sUrl = oMenuInfo.url+"List.do?page=1&rows=50&TABLENAME="+$(this).attr('id');
		if( oMenuInfo.url.indexOf(".do") > 0 ){
			 sUrl = oMenuInfo.url+"?&page=1&rows=50&MenuId="+$(this).attr('id');
		}	
		var sWidth  = $('#desktop').width()-50;
		var sHeight = $('#desktop').height()-50;
		if($("#ifrMap").length !== 0) {
			sHeight = 340;
		}
		
		if( $(this).attr('id').indexOf("TOTAL") != -1  ||  $(this).attr('id').indexOf("ANA") != -1){
			sWidth = oMenuInfo.width;
			sHeight =oMenuInfo.height;
		}

		REGISTER.fn_open_nJDSKWindow(oMenuInfo.title, sUrl, sWidth, sHeight,'registerOnHome');	
	});

	
	setInterval(function(){
		
		var bgImage = $("#system").val().substring(5).toLowerCase();
		if( bgImage === '' ) bgImage = 'tx1';
		
		$('#desktop_titlearea')
		.css({
				'background-image':'url(/extLib/jdesktop/images/bg_'+bgImage+'.png)',
				'background-repeat':'no-repeat',
				'background-position':'center'
			});		
	    $('#desktop_titlearea').addClass('magictime boingInUp');
	    
	    $('div').remove('.ui-widget .ui-widget-content .ui-corner-all .ui-jqdialog');
	    //$(this).addClass('magictime puffIn');
		//$(this).addClass('magictime perspectiveUpRetourn');
		//$(this).addClass('magictime perspectiveLeftRetourn');
		//$(this).addClass('magictime perspectiveRightRetourn');
		//$(this).addClass('magictime slideDownRetourn');
		//$(this).addClass('magictime slideUpRetourn');
		//$(this).addClass('magictime swashIn');	//*
		//$(this).addClass('magictime tinUpIn');  //**
		//$(this).addClass('magictime boingInUp'); //***
		//$(this).addClass('magictime spaceInUp'); //***
		//$(this).addClass('magictime spaceInLeft'); //*
	}, 300 );
	
	// changeTheme
	$("#changeSystem").click(function(){					
		REGISTER.fn_open_nJDSKWindow("시스템변경","/main/changeSystemView.do?",502,390,"registerOnHome");
	});	
	
	// changeSystem
	function changeSystem( roleId ){						
		document.logoutForm.action='/main/changeSystem.do?SYSTEM='+roleId;
	    document.logoutForm.submit();
	}
	
	$("#logout").on("click", function(){
		fn_update_userMapExtent();
		document.logoutForm.action="<c:url value='/userLogout.do'/>";
	    document.logoutForm.submit();
	});
	
	$('#startuserinfo').on("click",function(){		
		REGISTER.fn_open_nJDSKWindow("사용자정보","/main/userInfo.do?",642,384,"userInfo");
    });	
	
	$('#startadmin').on("click",function(){
		//REGISTER.fn_open_nJDSKWindow("관리자","/admin/board/boardList.do",902,711,"urlType");		
		//ifrmae 때문에 아래처럼 호출해야함.. 나중에 바꾸면.. 위에서처럼 호출하지모.. 
		/* if($("isAdmin")) {
			
		} */
		if($(".isAdmin").length > 0) {
			$(".isAdmin").show()
		} else {
			_adminWindow = new nJDSK.Window(902,750,'관리자','','/admin/board/boardList.do', nJDSK.uniqid(),false,false,null,null,'urlType');
			$(_adminWindow.base).addClass("isAdmin");
			_adminWindow.onResize=function(win){
				$("iframe").contents().find("#W_900").width($(win.contentArea).width());
				$("iframe").contents().find("#W_900").height($(win.contentArea).height());
			};
		}
	});

	function fn_win_open(_sWinTitle, _sUrl, _nWidth, _nHeight, _sCallType ){ //urlType
		_Window = new nJDSK.Window(_nWidth, _nHeight, _sWinTitle,'',_sUrl, nJDSK.uniqid(),false,false,null,null, _sCallType);
	};

	var printData;

	function fn_set_printData(data){
		printData = data;
	};

	function fn_get_printData(){
		return printData;
	};
	
	function mainMenuCreate(){
		
		var upMenuId = -1;
		var dept2MenuList = "";
		var Depth2Start =  '<div class="TabBx1" ><ul>';	
		var Depth2Int = 0;
		var dept3MenuList = "";
		var bDepth3 = false;
			
		var json_Menu = "";
		
		if( json_MenuList.length > 0 ){
			json_Menu = $.parseJSON(json_MenuList);	
		}
		
		if (json_Menu.length > 0 ) {
			
			$('.TabBx1').remove();
			$('.TabBx2').remove();
			
			for (var i = 0; i < json_Menu.length; i++) {
										
				var menuNo = json_Menu[i].menuNo;		//자기자신 아이디 
				var upperMenuNo = json_Menu[i].upperMenuNo;				//상위 메뉴 아이디 
				var menuNm = json_Menu[i].menuNm;				// 메뉴제목
				var menuIcon = json_Menu[i].imagePath+ json_Menu[i].imageNm;		 	//메뉴아이콘 
				var menuId = json_Menu[i].menuId;

				//alert( "depth1  = "+menuNo+ " || depth2 ="+upperMenuNo +"|| menuTitle ="+ menuNm  +"|| menuIcon ="+ menuIcon );
				if( upperMenuNo == 0 ){
						
					if( dept2MenuList == "" ){
						dept2MenuList = Depth2Start;
					}						
					Depth2Int = 0;
					upMenuId = menuNo;					
					
				}else {
				
					//alert( "menuTitle  = "+menuTitle+ " || upMenu ="+upMenu +"|| depth2 ="+ depth2 );
					if ( upMenuId == upperMenuNo ){		    							
							if( bDepth3 == false){
								Depth2Int++;	
								
								if( Depth2Int == 1 ){
									dept2MenuList +='<li><a id="tab-'+Depth2Int+'" href="#tabs-'+Depth2Int+'" class="D2_TabM_selected">'+menuNm+'</a></li>';
								}else {
									dept2MenuList +='<li><a id="tab-'+Depth2Int+'" href="#tabs-'+Depth2Int+'" class="D2_TabM">'+menuNm+'</a></li>';
								}
								dept3MenuList +=  '<div class="TabBx2"  id="div-'+Depth2Int+'" ondragover="return false;" ondragenter="return false;" ondrop="drop(this, event);">	';
								bDepth3 = true;
								upMenuId = menuNo;
							}else {			
								dept3MenuList +='<a id="'+menuId+'"  href="#" ondragstart="drag(this, event)"  draggable="true" ><img src="'+menuIcon+'" alt="'+menuNm+'"/></a>';									
							}
							
					}else if ( upMenuId != upperMenuNo ){			
						
						Depth2Int++;	
						dept2MenuList +='<li><a id="tab-'+Depth2Int+'" href="#tabs-'+Depth2Int+'" class="D2_TabM">'+menuNm+'</a></li>';
						dept3MenuList +=  '</div><div class="TabBx2"  style="display:none;"  id="div-'+Depth2Int+'" ondragover="return false;" ondragenter="return false;" ondrop="drop(this, event);">	';
						bDepth3 = true;
						upMenuId = menuNo;					
					}
				}
				
			}
			
			if( dept2MenuList != null  ){
				dept2MenuList += '</ul></div>';
			}
			if( dept3MenuList != null  ){
				dept3MenuList += '</div>';
			}
			
			$('.MainMenu').append(dept2MenuList);
			$('.MainMenu').append(dept3MenuList);		
			
			var system = $("#system").attr("value");
			if( system === "ROAD" || system === "ROLE_ROAD"){
					$("#Depth_2Bx").css("width","1400px");
					$(".TabBx1").css("width","1400px");
					$(".TabBx2").css("width","1300px");
			}else {		
					$("#Depth_2Bx").css("width","895px");
					$(".TabBx1").css("width","895px");
					$(".TabBx2").css("width","835px");
			}
		}
		
	}	
		
	var fn_leftTab_control = function(_sMode) {
		if(_sMode == "close")
			$(document).find("#ifrMap")[0].contentWindow.leftClose();
		else if(_sMode == "open")
			$(document).find("#ifrMap")[0].contentWindow.leftOpen();
	};
	
	var fn_init_windowArrange = function(_type) {
		
		var oMapWindow, oBookWindow, oMapContentWindow, oBookContentWindow;
		var nBookHeight = 412;
		var nPaddingSize = 10;
		var nTitleBarHeight = $('.titlebar').height();
		
		var nJDSKBookMasterId = $('#nJDSKMasterId').val();	
		
		oMapWindow = nJDSK.oMapWindow;
		oBookWindow = nJDSK.oBookWindow;
 
		oMapContentWindow = $(oMapWindow).children('.contentarea');
		oBookContentWindow = $(oBookWindow).children('.contentarea');
		
		
		function mapWindowResize() {
			$(oMapWindow).show();
			$(oMapWindow).css({'left':0});
			$(oMapWindow).css({'top':0});
			$(oMapWindow).css({'height':nJDSK.desktopHeight - nPaddingSize});
			$(oMapWindow).css({'width':nJDSK.desktopWidth - nPaddingSize});
				
			$(oMapContentWindow).css({'left':(nPaddingSize/2)});
			$(oMapContentWindow).css({'top':0});
			$(oMapContentWindow).css({'width':$(oMapWindow).width() - (nPaddingSize/2)});
  			$(oMapContentWindow).css({'height':$(oMapWindow).height() - nTitleBarHeight - nPaddingSize});
		}
		
		function bookWindowResize(){
			$(oBookWindow).show();
			$(oBookWindow).css({'left':0});
				$(oBookWindow).css({'top':(nJDSK.desktopHeight - nPaddingSize) - $(oBookWindow).height()});
				$(oBookWindow).css({'width':$(oMapWindow).width() - 5});
				//$(oBookWindow).css({'height':nJDSK.desktopHeight - nBookHeight - 10});

				$(oBookContentWindow).css({'left':(nPaddingSize/2)});
				$(oBookContentWindow).css({'top':0});
				$(oBookContentWindow).css({'width':$(oBookWindow).width() - (nPaddingSize/2)});
  			//$(oBookContentWindow).css({'height':$(oBookWindow).height() - nTitleBarHeight - nPaddingSize});

				$('.ui-jqgrid').css({'width':'100%'});
				$('.ui-jqgrid-view').css({'width':'100%'});
				$('.ui-jqgrid-hdiv').css({'width':'100%'});
				$('.ui-jqgrid-bdiv').css({'width':'100%'});
				$('.ui-jqgrid-pager').css({'width':'100%'});
				
				 $('.taskbarbutton').removeClass('activetsk');
		  		 $('#tskbrbtn_'+nJDSKBookMasterId).addClass('activetsk');
		  		 $('#win_'+nJDSKBookMasterId).css({'z-index':nJDSK.WindowList.lastZIndex});
		  		 $('.window').removeClass('activeWindow');
		  		 $('#win_'+nJDSKBookMasterId).addClass('activeWindow');
		}
		
		if(_type == "empty") {
			
			nJDSK.clearActive();
        	if ($('.window').is(':visible'))
        	{
        		$('.window').hide();
        	}
        	else
        	{
        		$('.window').show();
        	}
		}
		else if(_type == "map") {
			
			$('.window').hide();
			
  			if(oMapWindow){
  				mapWindowResize();
  			}
	  			
		}
		else {

			$('.window').hide();
			
			if(_type == "type1") 
				fn_leftTab_control('close');  
			else
				fn_leftTab_control('open'); 
				
			
			if(oMapWindow){
  				mapWindowResize();
  			}
			
			if(oBookWindow){
  				bookWindowResize();
			}
		} 
	};
	/**
	* 시스템 종료(메인브라우저 or 맵창 닫기 or 로그아웃) 시 현재 맵 위치를 저장
	* @member {Object}
	*/
	function fn_update_userMapExtent(obj){
		var map;
		if(obj && obj.frameWindow){			
			map = obj.frameWindow.contentWindow.map;
		}
		else{
			var ifrMap = $('#ifrMap');
			if(ifrMap && ifrMap.length)
				map = ifrMap[0].contentWindow.map;
		}
		
		if(map){
			if(g_userId){
				var updateMapExtent = {
						USER_ID : g_userId,
						INIT_EXTENT : JSON.stringify(map.getExtent())
				}
				
				$.ajax({
					type: 'post',
					dataType: 'json',
					url: '/updateUserMapExtent.do',
					data: {obj : JSON.stringify(updateMapExtent)},
					async : false,
					success: function(_oRes) {;},
					error: function(xhr, status, error) {
						COMMON.showMessage('맵 정보 갱신 오류 & 지도영역 정보갱신 실패하였습니다.');
					}
				});
			}
		}
	}
	
  </script>
</body>
</html>