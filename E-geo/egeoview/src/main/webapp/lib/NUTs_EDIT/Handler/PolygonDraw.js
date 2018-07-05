/**************************************************************************************************************
 * PolygonDraw 클래스
 * @namespace {Object} NUTs.Handler.PolygonDraw
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Handler.PolygonDraw = OpenLayers.Class(OpenLayers.Handler.Polygon, {
	
	attributes : null,
	
	finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone(), this.attributes]);
        if(cancel || !this.persist) {
            this.destroyFeature();
        }
    },
	
	CLASS_NAME: "NUTs.Handler.PolygonDraw"
});