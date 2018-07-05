/**************************************************************************************************************
 * RegularPolygonDraw 클래스
 * @namespace {Object} NUTs.Handler.RegularPolygonDraw
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Handler.RegularPolygonDraw = OpenLayers.Class(OpenLayers.Handler.RegularPolygon, {
	
	attributes : null,
	
	callback: function (name, args) {
        // override the callback method to always send the polygon geometry
        if (this.callbacks[name]) {
            this.callbacks[name].apply(this.control,
                                       [this.feature.geometry.clone(), this.attributes]);
        }
        // since sketch features are added to the temporary layer
        // they must be cleared here if done or cancel
        if(!this.persist && (name == "done" || name == "cancel")) {
            this.clear();
        }
    },

	CLASS_NAME: "NUTs.Handler.RegularPolygonDraw"
});