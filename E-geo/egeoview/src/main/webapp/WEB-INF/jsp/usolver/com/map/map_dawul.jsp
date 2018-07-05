<!-- <script type="text/javascript" src="/js/common/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="/js/common/jquery.jqprint-0.3.js"></script>
<script type="text/javascript" src="/js/common/flexslider.js"></script>
<script type="text/javascript" src="/js/common/jquery.corner.js"></script>
<script type="text/javascript" src="/js/common/makePCookie.js"></script>

<script type="text/javascript" src="/js/lib/proj4js/proj4js.js"></script>
<script type="text/javascript" src="/js/lib/proj4js/defs.js"></script>
<script type="text/javascript" src="/js/lib/openlayers/OpenLayers.debug.js"></script>
<script type="text/javascript" src="/js/lib/openlayers/OpenLayersEdit/OpenLayersEdit.min.js"></script>
<script type="text/javascript" src="/js/lib/jsts/jsts.min.js"></script> 
<script type="text/javascript" src="/js/lib/NUTs/NUTs_20170406_debug.js"></script>
<script type="text/javascript" src="/js/jibsuri/test.js"></script> -->




<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="usolver.com.main.vo.LoginVO" %>
<%@ page import="egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 

<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jsts/javascript.util.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jsts/jsts.js'/>"></script>

<script type="text/javascript" src="<c:url value='/extLib/proj4js/proj4js.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/proj4js/defs.js'/>"></script>

<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.debug.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.extension.js'/>"></script>


<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/compat.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/iefixes.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/CleanFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/ContextMenu.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DragFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DeleteFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DeleteAllFeatures.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/Dialog.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawHole.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawPolygon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawPath.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawPoint.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawText.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawRegular.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/EditorPanel.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/ImportFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/LayerSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/MergeFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/TransformFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/FixedAngleDrawing.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Layer.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Layer/Snapping.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/SnappingSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DownloadFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/UploadFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/SplitFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/UndoRedo.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/CADTools.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/ParallelDrawing.js'/>"></script>


<script type="text/javascript" src="<c:url value='/lib/NUTs_20170406_debug.js'/>"></script>

<!-- <script type="text/javascript" src="http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=4add6e484b4f4b7eac337318f851d866"></script> -->
<script>
//tileMapInfo = new TileMapInfos('4add6e484b4f4b7eac337318f851d866');
$(document).ready(function(){
    //var bounds = new OpenLayers.Bounds(155467, 418809,241430, 477468);
    //var bounds = new OpenLayers.Bounds(179189.73895015, 436547.418191234, 216242.252847569, 466863.544277719);
    var bounds = new NUTs.Bounds(155467, 418809,241430, 477468);
    var lon = 5;
    var lat = 40;
    var zoom = 5;
    var map, layer;
    
    
    var controls = {
    		// 거리 측정 
            line: new OpenLayers.Control.DynamicMeasure(
                OpenLayers.Handler.Path, {
                	id : 'measurePath'
                }
            ),
            
    		// 면적 측정 
            polygon: new OpenLayers.Control.DynamicMeasure(
                OpenLayers.Handler.Polygon, {
                	id : 'measurePolygon'
                }
            ),
            // 마우스 위치 표출
            mousePosition : new OpenLayers.Control.MousePosition(
            			{ 
            				id : "mousePosition",
            				separator : "(N) ,",
                			suffix : "(E)",
                			numDigits: 3,
                    		displayProjection : "EPSG:5181"
            			}
            ),
        	
            // 스케일
    		scale : new OpenLayers.Control.ScaleLine(),
    		
    		zoomInOut : new OpenLayers.Control.Zoom({
                zoomInId: "customZoomIn",
                zoomOutId: "customZoomOut"
            })
        };
    	
    var init = function(){

        map = new NUTs.Maps.Map( 'mapContainer', {        
        //map = new OpenLayers.Map( 'mapContainer',{ 
            maxExtent: bounds,
            //restrictedExtent: extent,
            // maxResolution 값을 늘이면 축소됨 
            maxResolution: 2048,
            numZoomLevels: 14,
            units: 'm',
            displayProjection: new OpenLayers.Projection("EPSG:5181"),
            projection: new OpenLayers.Projection("EPSG:5181"),
        });

        //layer = new OpenLayers.Layer.WMS( "OpenLayers WMS",
        layer = new NUTs.Layer.WMS( "OpenLayers WMS",
                'http://192.168.0.205:8282/geoserver/Oracle/wms', {
                	layers: 'Oracle:LT_C_UQ111',             
                	format : 'image/png',
                    version : '1.1.0',
                    visibility : true,
                    crs : new OpenLayers.Projection("EPSG:5181") 
		} ,
		{
			isBaseLayer : true,
			singleTile : true,
			transitionEffect : 'resize',
			projection: new OpenLayers.Projection("EPSG:5181") 
			//tileOptions: {maxGetUrlLength: 2048},
		}
		) ; 
        
        /*layer = new NUTs.Layer.WMS("testLayer", 'http://192.168.0.205:8282/geoserver/Oracle/wms', {
            layers : 'Oracle:LT_C_UQ111',
            //styles : sLayerList,
            format : 'image/png',
            version : '1.1.0',
            visibility : true
            //crs : new OpenLayers.Projection('EPSG:5181'),
        });*/
        
        map.addLayer(layer);
        //map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
        //map.addControl( new OpenLayers.Control.LayerSwitcher() );
        
        // zoom 값을 줄이면 축소됨.
        //map.setCenter(new OpenLayers.LonLat(199659.07, 451466.18), 4);
        debugger;
        console.log("abcd");
        //map.zoomToExtent(bounds);
        
    	 for(var key in controls) {
            control = controls[key];
            map.addControl(control);
        }     
    };
    
    init();
	map.zoomToExtent(bounds);	
    
/*     var mainMap = new NUTs.Maps.Map('mapContainer',{ 
            controls: [
               new OpenLayers.Control.LayerSwitcher()
               ],
               maxExtent : bounds,
                maxResolution: 198.437896875794,
                autoUpdateSize : false,
                fractionalZoom : false,
               resolutions: [198.437896875794, 79.3751587503175, 39.6875793751588, 26.4583862501058, 13.2291931250529, 7.93751587503175, 3.96875793751588, 2.64583862501058, 1.32291931250529, 0.661459656252646, 0.264583862501058],
               projection: new OpenLayers.Projection("EPSG:5181"),
                units: "m",
                numZoomLevels: 10,
                autoUpdateSize : false,
                fractionalZoom : false,
                zoomMethod: null
        });
    mainMap.addLayer(new OpenLayers.Layer("EmptyLayer", { isBaseLayer: true, visibility: true, transparent: true}));
    
     var fn_create_dawulMap = function(_oMap) {
        dawulMap = new NUTs.Mashup.DawulMap("dawulMap", {
            oMap : _oMap,
            center : _oMap.getCenter(),
            zoom : _oMap.getZoom()
        });
    
        dawulMap.setVisibility(true);
    };
     */
     
    /*var mainMap = new OpenLayers.Map('mapContainer');
    var oWmsLayer = new NUTs.Layer.WMS("testLayer", 'http://192.168.0.205:8282/geoserver/Oracle/wms', {
        layers : 'Oracle:LT_C_UQ111',
        //styles : sLayerList,
        format : 'image/png',
        version : '1.1.0',
        visibility : true,
        //crs : new OpenLayers.Projection('EPSG:5181'),
        transparent : true
    });

    mainMap.addLayer(oWmsLayer);
    
	mainMap.zoomToExtent(bounds);*/    
	//fn_create_dawulMap(mainMap);
        
/*    (function init() {
       var bounds = new OpenLayers.Bounds(
                        126.76402302765138, 37.42807534240376,
                        127.18417853922499, 37.701453459838596
                 );

                 var options = {
                                 maxExtent: bounds
                 };

        // Add osm background layer
        var map = new OpenLayers.Map('mapContainer', options); 
        // Add wms layer locally
        var dma_504 = new OpenLayers.Layer.WMS( "Buildings 504","http://192.168.0.205:8282/geoserver/Oracle/wms", 
            {layers: 'Oracle:LT_C_UQ111', transparent:true, srs : 'EPSG:5181'}, {isBaseLayer:true} );
        map.addLayer(dma_504);
        // Set the centre of the map
        var zoom = 6;
        map.setCenter([37.566611,126.978509], 1);

        
   })(); */

});

</script>
<body>

<!-- header start -->

<!-- header end -->

<!-- content start -->
				<div id='mapContainer' style='z-index:10;width:800px;height:480px;position:absolute;border-style:solid'></div>

        
        <!--/내용-->
</div>




<!-- content end -->


<!-- footer start -->
<!-- footer end -->