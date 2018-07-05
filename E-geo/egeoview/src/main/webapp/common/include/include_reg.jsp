<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<title>도시기반시설물 관리시스템</title>
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/org/reset.css'/>"/> --%>
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/org/style.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/js/usolver/com/org/css/common.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/js/usolver/com/org/css/tree.css'/>"/> --%>

<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/js/usolver/com/org/css/jquery-ui-1.10.4.custom.css'/>"/> --%>
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jqgrid/css/ui.jqgrid.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/window/css/jquery.window.css'/>"/>

<link type="text/css" rel="stylesheet" href="/css/usolver/book/reset.css"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/popup.css"/> --%>

<%--  	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/register.js'/>"></script>
 	<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/book.js'/>"></script> --%>
 	
<%-- <script src="<c:url value='/extLib/jquery/jquery-1.11.1.js'/>"></script>
<script src="<c:url value='/extLib/jquery/jquery-ui-1.10.4.custom.js'/>"></script>
<script src="<c:url value='/extLib/jqgrid/js/i18n/grid.locale-kr.js'/>"></script>
<script src="<c:url value='/extLib/jqgrid/js/jquery.jqGrid.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/dynamic.select.js'/>"></script>
<script src="<c:url value='/js/usolver/com/plugin/jquery.mask.js'/>"></script>
<script src="<c:url value='/extLib/window/jquery-migrate-1.2.1.js'/>"></script>
<script src="<c:url value='/extLib/window/jquery.window.js'/>"></script>

<script src="<c:url value='/js/usolver/com/org/js/navigator.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/window.util.js'/>"></script> --%>

 <%--
<script src="<c:url value='/js/usolver/com/org/js/html5shiv.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/init.util.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/common.util.js'/>"></script>
 <script src="<c:url value='/js/usolver/com/org/js/init.util.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/html5shiv.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/functions.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/util.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/navigator.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/common.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/window.util.js'/>"></script>
<script src="<c:url value='/js/usolver/com/org/js/dynamic.select.js'/>"></script> --%>


<%-- <script src="<c:url value='/js/usolver/book/common.js'/>"></script><!-- 디자이너가 준거  -->
<script src="<c:url value='/js/usolver/book/init.js'/>"></script><!-- 폼 초기화 관련 함수 --> --%>
<%-- <script src="<c:url value='/js/usolver/book/event.js'/>"></script><!-- 폼 이벤트 관련 함수 --> --%>

<!--[if lte IE 9]>
<script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.0/jquery.xdomainrequest.min.js'></script>
<![endif]-->


<!--  맵관련 
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/config.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/register.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.ss.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.eh.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.jh.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSpecial.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapEditor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/usvEditor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSpecial.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/tabMenu.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/mapFrame.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/register.js'/>"></script>
 -->
<%-- 
<script type="text/javascript" src="<c:url value='/lib/gutil/GUtil.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/GMap.debug.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gcontrol/GDynamicMeasure.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gcontrol/GFeaturePopups.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gtool/GDataTool.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gmashup/util/GMahsupUtil.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gmashup/GDaumMap.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gmashup/GNaverMap.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gmashup/GDawulMap.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/gcontrol/GDragFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/gcontrol/GModifyFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/gcontrol/GSnappingSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/gcontrol/GTransformFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/gcontrol/GDrawPoint.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/gcontrol/GDrawPath.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/GEditStyle.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/GEditor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gedit/GEditRule.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gproc/GGeoJson.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/lib/gproc/GGeomJSTSOper.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gutil/GError.js'/>"></script>

<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/namespace.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/config.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/event.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/style.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/search.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/message.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/circular-json.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/common2.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/commonMap.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.ss.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.eh.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.jh.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSpecial.js'/>"></script><!-- 김정수 -->
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapEditor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/usvEditor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSpecial.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/tabMenu.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/mapFrame.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/register.js'/>"></script>

<!-- heatmap, chart datas :김정수-->
<script type="text/javascript" src="<c:url value='/js/usolver/map/datas.js'/>"></script>


<!-- 다음 API -->
<script type="text/javascript" src="http://apis.daum.net/maps/maps3.js?apikey=d30e22e8b8f13522381fd3456bbcb2a2 "></script>

<!-- 네이버 API -->
<script type="text/javascript" src="http://map.naver.com/js/naverMap.naver?key=670f278fb7149a7e300bfdbedc025100"></script>

<!--다울(Dawul) 지도API -->
<!-- <link rel="stylesheet" type="text/css" href="http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapCss">
<script type="text/javascript" src="http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=f3ae0b2a278247afb61b80ad138eeaae"></script> -->

<script type="text/javascript" src="<c:url value='/extLib/naver/v1_2_63.js'/>"></script>

<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSearchPosition.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/org/js/dynamic.select.js'/>"></script>
 --%>