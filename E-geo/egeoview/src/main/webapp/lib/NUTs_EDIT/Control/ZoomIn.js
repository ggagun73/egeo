/**************************************************************************************************************
 * 지도 확대 클래스
 * @namespace {Object} NUTs.Control.ZoomIn 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Control.ZoomIn = OpenLayers.Class(OpenLayers.Control.ZoomBox, {
	
	draw: function() {
        this.handler = new NUTs.Handler.Box( this,
                            {done: this.zoomBox}, {keyMask: this.keyMask} );
    },
		
	CLASS_NAME: "NUTs.Control.ZoomIn"
});