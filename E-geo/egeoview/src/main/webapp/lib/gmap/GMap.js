singleFile = false;

(function() {
    var singleFile = singleFile;
    
    if(!singleFile) {
        var jsfiles = new Array(
			"GMap.js",
			"GIndexMap.js",
			"GMapUtil.js",
			"gformat/GSLD.js",
			"gformat/gsld/v1_1.js",
			"gformat/gsld/v1_1_0.js",
			"GRequest.js",
			"gbasetypes/GLonLat.js",
            "gbasetypes/GBounds.js",
			"gbasetypes/GPixel.js",
			"gbasetypes/GSize.js",
		//	"gtile/image/IFrame.js",
			"glayer/GWMS.js",
			"glayer/GWMSPost.js",
			"glayer/GTileCache.js",
			"glayer/GVector.js",
			"gArcMap/ArcGISCache.js", // Arc맵 커스터마이징
			"gArcMap/Util.js", // Arc맵 커스터마이징
			"gcontrol/GDrag.js",
			"gcontrol/GZoomIn.js",
			"gcontrol/GZoomOut.js",
			"gcontrol/GMeasure.js",
			"gcontrol/GNavigationHistory.js",
			"gcontrol/GZoomBoxIndex.js",
			"gcontrol/GDrawFeature.js",
			"gcontrol/GPanZoomBar.js",
			"gcontrol/GSelectFeature.js",
			"gcontrol/GModifyFeature.js",
			"gcontrol/GGetFeature.js",
			"gcontrol/GAcss.js",
			"gcontrol/GAlis.js",
			"gcontrol/GProfile.js",
			"ghandler/GBox.js",
			"ghandler/GPath.js",
			"ghandler/GPathMeasure.js",
			"ghandler/GPolygonMeasure.js",
			"ghandler/GPoint.js",
			"ghandler/GPolygon.js",
//			"ghandler/GPolygonSearch.js",
			"ghandler/GPolygonDraw.js",
			"ghandler/GRegularPolygonDraw.js",
			"ghandler/GRegularPolygonDrawAttr.js",
			"gpopup/GPopup.js",
//			"gpopup/GAnchoredBubble.js",
			"gtool/GDrawTool.js",
			"gtool/GMemoTool.js",
			"gtool/GSaveTool.js",
			"gtool/GLengendTool.js",
			"gtool/GTMapLayerTool.js",
			"gtool/GSLDTool.js"
        );

        var agent = navigator.userAgent;
        var docWrite = (agent.match("MSIE") || agent.match("Safari"));
        if(docWrite) {
            var allScriptTags = new Array(jsfiles.length);
        }
        var host = "/lib/gmap/lib/";
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
