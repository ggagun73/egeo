<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<title>부천시 도시기반시설물 관리시스템</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/reset.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/style.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/ginno/css/common.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/ginno/css/jquery-ui-1.10.4.custom.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jqgrid/css/ui.jqgrid.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/window/css/jquery.window.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/ginno/css/tree.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jquery/contextMenu/jquery.contextMenu.css'/>" />

<script src="<c:url value='/extLib/jquery/jquery-1.11.1.js'/>"></script>
<script src="<c:url value='/extLib/jquery/jquery-ui-1.10.4.custom.js'/>"></script>

<script src="<c:url value='/extLib/jqgrid/js/i18n/grid.locale-kr.js'/>"></script>
<script src="<c:url value='/extLib/jqgrid/js/jquery.jqGrid.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/dynamic.select.js'/>"></script>
<script src="<c:url value='/extLib/ginno/plugin/jquery.mask.js'/>"></script>
<script src="<c:url value='/extLib/window/jquery-migrate-1.2.1.js'/>"></script>
<script src="<c:url value='/extLib/window/jquery.window.js'/>"></script>

<script src="<c:url value='/extLib/ginno/js/common.util.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/init.util.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/util.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/window.util.js'/>"></script>

<script src="<c:url value='/extLib/ginno/js/html5shiv.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/functions.js'/>"></script>

<script src="<c:url value='/extLib/ginno/js/common.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/navigator.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/FileSaver.min.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/ajaxupload.js'/>"></script>


<script type="text/javascript" src="<c:url value='/extLib/jquery/contextMenu/jquery.ui.position.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/contextMenu/jquery.contextMenu.js'/>"></script>


<!-- arcgis Javascript API  -->
<link rel="stylesheet" href="http://js.arcgis.com/3.12/dijit/themes/claro/claro.css"> 
<link rel="stylesheet" href="http://js.arcgis.com/3.12/esri/css/esri.css">
<script src="http://js.arcgis.com/3.12/"></script>

<!-- <link rel="stylesheet" type="text/css" href="/arcgis_js_api/library/3.12/3.12compact/dijit/themes/claro/claro.css"/>
<link rel="stylesheet" type="text/css" href="/arcgis_js_api/library/3.12/3.12compact/esri/css/esri.css" />
<script type="text/javascript" src="/arcgis_js_api/library/3.12/3.12compact/init.js"></script> -->

<script src="<c:url value='/extLib/ginno/aMap/aMapCommon.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapUtil.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapConfig.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapEditor.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapEventListener.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapMeasurement.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapFunction.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapIndex.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapLayerManager.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapToc.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapIdentify.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapUserGraphics.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapPrint.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapAreaSearch.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapControl.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapAnalysis.js'/>"></script>
<script src="<c:url value='/extLib/ginno/aMap/aMapInit.js'/>"></script>


<!-- 칼라 선택 창(color picker) -->
<script type="text/javascript" language="javascript" src="/extLib/ginno/js/colorPicker.js"></script>
<link rel="stylesheet" href="/css/colorPicker.css" type="text/css"></link> 

<link rel="stylesheet" type="text/css" href="/css/dd.css" />
<script src="/extLib/ginno/js/jquery.dd.min.js"></script>

<!--[if lte IE 9]>
<script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.0/jquery.xdomainrequest.min.js'></script>
<![endif]-->



