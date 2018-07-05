/**
 * indexMap 개체 
 * @namespace {Object} IndexMap
 */

/**********************************************************************************
 * 파일명 	: IndexMap.js
 * 설명 	: IndexMap Class
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자					version				작업내역
 * --------------------------------------------------------------------------------
 * 2017.02.10		ggash				0.1					최초 생성
 * 
**********************************************************************************/

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
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : IndexMap 객체 생성
	 * 인 자 : map (기준 지도 객체), options (생성 옵션 들)
	 * 사용법 : initialize(map, options)
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초 생성
	 * 
	 **********************************************************************************/
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
		
		var layer = new NUTs.Layer.WMS(
			"GIndexLayer",
			options.serviceUrl,
			{
				layers : options.layers,
				styles : options.styles,
	            CRS: "EPSG:5181",
	            //add jykw 20160725 for geoserver 
	            VERSION: "1.3.0"	
			}
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
	
	/**********************************************************************************
	 * 함수명 : show
	 * 설 명 : 색인도 나타냄
	 * 사용법 : show()
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초 생성
	 * 
	 **********************************************************************************/
	show: function() {
		$(this.div).show();
	},
	
	/**********************************************************************************
	 * 함수명 : hide
	 * 설 명 : 색인도 숨김
	 * 사용법 : hide()
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초 생성
	 * 
	 **********************************************************************************/
	hide: function() {
		$(this.div).hide();
	},

	/**********************************************************************************
	 * 함수명 : toggle
	 * 설 명 : 색인도 show, hide 토글
	 * 사용법 : toggle()
	 * 작성일 : 2011.04.28
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.28		최원석		최초 생성
	 * 
	 **********************************************************************************/
	toggle : function() {
		if($(this.div).css("display") == "none") {
			this.show();
		}
		else {
			this.hide();
		}
	},
	
	/**********************************************************************************
	 * 함수명 : isShow
	 * 설 명 : 색인도 화면에 표시 되어 있는지 여부
	 * 사용법 : isShow()
	 * 작성일 : 2011.05.04
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.04		최원석		최초 생성
	 * 
	 **********************************************************************************/
	isShow : function() {
		if($(this.div).css("display") == "none") {
			return false;
		}
		else {
			return true;
		}
	},
	
	/**********************************************************************************
	 * 함수명 : getHeight
	 * 설 명 : 색인도의 너비 반환
	 * 사용법 : getHeight()
	 * 작성일 : 2011.05.04
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.04		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getHeight : function() {
		return parseInt($(this.div).css("height").replace("px", ""));
	},
	
	/**********************************************************************************
	 * 함수명 : getWidth
	 * 설 명 : 색인도의 높이 반환
	 * 사용법 : getWidth()
	 * 작성일 : 2011.05.04
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.04		최원석		최초 생성
	 * 
	 **********************************************************************************/
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