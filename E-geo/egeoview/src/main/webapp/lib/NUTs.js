var NUTs 			= NUTs || {};
NUTs.Protocol 		= NUTs.Protocol || {};
NUTs.Control 		= NUTs.Control || {};
NUTs.Format 		= NUTs.Format || {};
NUTs.Format.SLD 	= NUTs.Format.SLD || {};
NUTs.Handler 		= NUTs.Handler || {};
NUTs.Layer 			= NUTs.Layer || {};
NUTs.Maps 			= NUTs.Maps || {};
NUTs.Request 		= NUTs.Request || {};
NUTs.Mashup 		= NUTs.Mashup || {};
NUTs.Tool 			= NUTs.Tool || {};
NUTs.Tool.DataTool	= NUTs.Tool.DataTool || {};
NUTs.Edit			= NUTs.Edit || {};
NUTs.Edit.Control 	= NUTs.Edit.Control || {};

singleFile = false;

(function() {
    var singleFile = singleFile;
    
    if(!singleFile) {
        var jsfiles = new Array(
		//	"NUTs.js",
			"Maps/Map.js",
			"Maps/IndexMap.js",
			"Mashup/DaumMap.js",
			"Mashup/NaverMap.js",
			"Util.js",
			"Format/GeoJson.js",
			"Format/GML.js",
			"Format/GML/Base.js",
			"Format/GML/v2.js",
			"Format/GML/v3.js",
		//	"Format/GSLD.js",
			"Format/Sld/v1.js",
			"Format/Sld/v1_0_0.js",
			"Format/Sld/v1_1.js",
			"Format/Sld/v1_1_0.js",
			"Format/Sld/v1_0_0_GeoServer.js",
			"Request.js",
			"Request/WMS.js",
			"Request/WFS.js",
			"Request/WPS.js",
			"Basetypes/Bounds.js",
		//	"gtile/image/IFrame.js",
			"Layer/WMS.js",
		//	"Layer/GWMSPost.js",
			"Layer/TileCache.js",
			"Layer/Vector.js",
			"Layer/ArcGISCache.js", // Arc맵 커스터마이징
		//	"gArcMap/Util.js", // Arc맵 커스터마이징
		//	"Control/GDrag.js",
			"Control/ZoomIn.js",
			"Control/ZoomOut.js",
			"Control/ZoomBoxIndex.js",
		//	"Control/GMeasure.js",
		//	"Control/GNavigationHistory.js",
			"Control/DrawFeature.js",
			"Control/PanZoomBar.js",
			"Control/SelectFeature.js",
			"Control/GetFeature.js",
			"Control/FeaturePopups.js",
			"Edit/EditStyle.js",
			"Edit/Editor.js",
			"Edit/EditRule.js",
			"Edit/Control/DeleteVertex.js",
			"Edit/Control/DragFeature.js",
			"Edit/Control/DrawHole.js",
			"Edit/Control/DrawPath.js",
			"Edit/Control/DrawPoint.js",
			"Edit/Control/DrawPolygon.js",
			"Edit/Control/ModifyFeature.js",
			"Edit/Control/SnappingSettings.js",
			"Edit/Control/TransformFeature.js",
			"Edit/Control/EditPanel.js",
		//	"gcontrol/GAcss.js",
		//	"gcontrol/GAlis.js",
		//	"gcontrol/GProfile.js",
			"Handler/Box.js",
			"Handler/Path.js",
			"Handler/PathMeasure.js",
			"Handler/PolygonMeasure.js",
			"Handler/Point.js",
			"Handler/Polygon.js",
//			"Handler/GPolygonSearch.js",
			"Handler/PolygonDraw.js",
			"Handler/RegularPolygonDraw.js",
			"Handler/RegularPolygonDrawAttr.js",
			"Popup/Popup.js", 
			"Popup/Popup.js",
			"Protocol/ProtocolWFS.js",
			"Protocol/ProtocolWFS_v1_1_0.js", 
//			"gpopup/GAnchoredBubble.js",
			"Tool/DataTool.js",
			"Tool/DataTool/Shp.js",
			"Tool/DataTool/Dxf.js",
			"Tool/DrawTool.js",
			"Tool/MemoTool.js",
			"Tool/SaveTool.js",
			"Tool/LengendTool.js",
			"Tool/TMapLayerTool.js",
			"Tool/SLDTool.js", 
			"Tool/SearchSpaceTool.js", 
			"JSTS/Operator.js" 
        );

        var agent = navigator.userAgent;
        var docWrite = (agent.match("MSIE") || agent.match("Safari"));
        if(docWrite) {
            var allScriptTags = new Array(jsfiles.length);
        }
        var host = "/lib/NUTs/";
        for (var i=0, len=jsfiles.length; i<len; i++) {
            if (docWrite) {
                allScriptTags[i] = "<script src='" + host + jsfiles[i] +
                                   "'></script>"; 
            } else {
                var s = document.createElement("script");
                s.src = host + jsfiles[i];
                var h = document.getElementsByTagName("head").length ? 
                           document.getElementsByTagName("head")[0] : 
                           document.body;
                h.appendChild(s);
            }
        }
        if (docWrite) {
            document.write(allScriptTags.join(""));
        }
    }
})();
