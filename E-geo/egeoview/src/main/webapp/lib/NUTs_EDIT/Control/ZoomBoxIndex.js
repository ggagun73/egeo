/**************************************************************************************************************
 * ZoomBoxIndex 클래스
 * @namespace {Object} NUTs.Control.ZoomBoxIndex 
 * @description 색인도의 영역 선택시 처리를 담당하는 클래스
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Control.ZoomBoxIndex = OpenLayers.Class(OpenLayers.Control.ZoomBox, {
	
	/**
	* 기준 지도 객체
	* @memberof NUTs.Control.ZoomBoxIndex
	* @member {NUTs.Maps.Map}  baseMap
	*/
    baseMap : null,

    /**
    * @memberof NUTs.Control.ZoomBoxIndex 
    * @method
    * @description 영역 박스를 그림
    * @author 연구개발센터 (2016.11.26)
    * @param {String} str : 구분자를 포함한 영역정보
    * @param {str} str : 구분자(',')
    */
    draw: function() {
        this.handler = new NUTs.Handler.Box( this,
                            {done: this.zoomBox}, {indexMap: true});
    },
	

    /**
    * @memberof NUTs.Control.ZoomBoxIndex 
    * @method
    * @description 생성자 함수
    * @author 연구개발센터 (2016.11.26)
    * @param {String} str : 구분자를 포함한 영역정보
    * @param {str} str : 구분자(',')
    */
    initialize: function (baseMap, options) {
    	this.baseMap = baseMap;
    	OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },


    /**
     * @memberof NUTs.Control.ZoomBoxIndex 
     * @method
     * @description  색인도 안의 영역 박스에 따른 기준 맵의 이동
     * @author 연구개발센터 (2016.11.26)
     * @param {String} str : 구분자를 포함한 영역정보
     * @param {str} str : 구분자(',')
     */
    zoomBox: function (position) {
    	if(position instanceof OpenLayers.Bounds) {
    		if (!this.out) {
                var minXY = this.map.getLonLatFromPixel(
                            new OpenLayers.Pixel(position.left, position.bottom));
                var maxXY = this.map.getLonLatFromPixel(
                            new OpenLayers.Pixel(position.right, position.top));
                var bounds = new NUTs.Bounds(minXY.lon, minXY.lat,
                                               maxXY.lon, maxXY.lat);
            } else {
                var pixWidth = Math.abs(position.right-position.left);
                var pixHeight = Math.abs(position.top-position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight),
                    (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.getLonLatFromPixel(
                    position.getCenterPixel());
                var xmin = center.lon - (extent.getWidth()/2)*zoomFactor;
                var xmax = center.lon + (extent.getWidth()/2)*zoomFactor;
                var ymin = center.lat - (extent.getHeight()/2)*zoomFactor;
                var ymax = center.lat + (extent.getHeight()/2)*zoomFactor;
                var bounds = new NUTs.Bounds(xmin, ymin, xmax, ymax);
            }
    		this.baseMap.zoomToExtent(bounds, true);
    	}
    	else { // it's a pixel
    		this.baseMap.setCenter(this.map.getLonLatFromPixel(position), this.baseMap.numZoomLevels-1);
    	}
    },
	
    CLASS_NAME: 'NUTs.Control.ZoomBoxIndex'
});
