/**************************************************************************************************************
 * IndexMap 클래스 
 * @author jhchoi
 * @namespace {Object} NUTs.Maps.IndexMap
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  

NUTs.Maps.IndexMap = OpenLayers.Class({
	/**
	 * 기준 지도 객체
	 */
	map : null,
	
	/**
	 * Div Container
	 */
	div : null,
	
	indexMap : null,
	
	/**
	 * 최대 해상도
	 */
	maxResolution : null,
	

	initialize: function (map, options) {
		if(!options.div) {
    		this.div = document.createElement("div");
    		$(this.div).addClass("olIndexMap").css({
    			"width": "200px",
    			"height": "200px",
    			"position": "absolute",
    			"z-index": "9999",
    			"top": "86px",
    			"right": "10px",
    			"border": "1px solid #bbb",
    			"background-color": "white"
    		});
    		$(map.div).append(this.div);
    	} else {
    		this.div = document.getElementById(options.div);
    	}
		
		var lonlat;
					
		if (options && options.maxResolution) {
			this.maxResolution = options.maxResolution;
		}
		else {
			this.maxResolution = Math.min(map.getMaxExtent().getWidth(), map.getMaxExtent().getHeight()) / Math.min($(this.div).css("width").replace("px", ""), $(this.div).css("height").replace("px", ""));
		}
			
		this.indexMap = new NUTs.Maps.Map(this.div, {
			maxExtent: options.maxExtent,
			maxResolution: this.maxResolution,
			projection: options.projection,
			controls : []
		});
		
		var indexWmsOptions = {
				layers : options.layers,
				styles : options.styles,
	            CRS: "EPSG:3857",
	            //add jykw 20160725 for geoserver 
	            VERSION: "1.3.0"	
		};
		
		if(options.gisEngineType == "GeoServer"){ 
			indexWmsOptions.yx = {'EPSG:3857' : true};
		}
		
		var layer = new NUTs.Layer.WMS(
			"GIndexLayer",
			options.serviceUrl,
			indexWmsOptions
		);
		
		this.indexMap.addLayer(layer);
		this.indexMap.setBaseLayer(layer);
		
	    this.indexMap.addControl(new NUTs.Control.ZoomBoxIndex(map, {id : "indexMap"}));
		this.indexMap.activeControls("indexMap");
		
		if(options && options.offsetPixel && options.offsetPixel.CLASS_NAME == "OpenLayers.Pixel") {
			this.indexMap.zoomToMaxExtent();
			lonlat = this.indexMap.getLonLatFromPixel(this.indexMap.getPixelFromLonLat(this.indexMap.getMaxExtent().getCenterLonLat()).add(options.offsetPixel.x, options.offsetPixel.y));
			this.indexMap.center = lonlat;
		}
		
		map.events.register("moveend", this, function() {
			this.indexMap.getControl("indexMap").handler.applyBox(map.getExtent());
		});
		
		this.indexMap.zoomToMaxExtent();
	},


	/**
	* @memberof NUTs.Maps.IndexMap
	* @method
	* @auth
	* @description 색인도 show
	*/
	show: function() {
		$(this.div).show();
	},
	

	/**
	* @memberof NUTs.Maps.IndexMap
	* @method
	* @auth
	* @description 색인도 hide
	*/
	hide: function() {
		$(this.div).hide();
	},


	/**
	* @memberof NUTs.Maps.IndexMap
	* @method
	* @auth
	* @description 색인도 토글
	*/
	toggle : function() {
		if($(this.div).css("display") == "none") {
			this.show();
		}
		else {
			this.hide();
		}
	},


	/**
	* @memberof NUTs.Maps.IndexMap
	* @method
	* @auth
	* @description  색인도가 화면에 표시 되고 있는지 여부
	*/
	isShow : function() {
		if($(this.div).css("display") == "none") {
			return false;
		}
		else {
			return true;
		}
	},
	

	/**
	* @memberof NUTs.Maps.IndexMap
	* @method
	* @auth
	* @description  색인도의 너비 반환
	*/
	getHeight : function() {
		return parseInt($(this.div).css("height").replace("px", ""));
	},
	

	/**
	* @memberof NUTs.Maps.IndexMap
	* @method
	* @auth
	* @description  색인도의 높이 반환
	*/
	getWidth : function() {
		return parseInt($(this.div).css("width").replace("px", ""));
	},
	
	getPosition : function() {
		var result = {
			left : parseInt($(this.div).css("left").replace("px", "")),
			bottom : parseInt($(this.div).css("bottom").replace("px", "")),
			right : parseInt($(this.div).css("right").replace("px", "")),
			top : parseInt($(this.div).css("top").replace("px", ""))
		}

		return result;
	},
	
	setPosition : function(left, bottom, right, top) {
		if(left) $(this.div).css("left", left);
		if(right) $(this.div).css("right", right);
		if(bottom) $(this.div).css("bottom", bottom);
		if(top) $(this.div).css("top", top);
	},
	
	setHeight : function(height) {
		$(this.div).css("height", height);
	},
	
	setWidht : function(widht) {
		$(this.div).css("widht", widht);
	},
	
	changeLayer : function(layers, styles) {
		this.indexMap.baseLayer.mergeNewParams({
			layers : layers,
			styles : styles
		});
	},
	
	CLASS_NAME: "NUTs.Maps.IndexMap"
});