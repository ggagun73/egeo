/**************************************************************************************************************
 * Box 클래스
 * @namespace {Object} NUTs.Handler.Box
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Handler.Box = OpenLayers.Class(OpenLayers.Handler.Box, {

	/**
	* @memberof NUTs.Handler.Box
	* @method
	* @description 인덱스 맵에서 사용 여부 
	*/
	indexMap : false,

	/**
	* @memberof NUTs.Handler.Box
	* @method 
	* @description 영역 박스 시작 
	*/
	startBox: function (xy) {
		if(this.indexMap && this.zoomBox) this.removeBox();
		
	    this.zoomBox = OpenLayers.Util.createDiv('zoomBox',
	                                             this.dragHandler.start);
	    this.zoomBox.className = this.boxDivClassName;         
	    this.zoomBox.style.border = "2px solid #000000";
	    this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
	    this.map.viewPortDiv.appendChild(this.zoomBox);
	
	    OpenLayers.Element.addClass(
	        this.map.viewPortDiv, "olDrawBox"
	    );
	},
	

	/**
	* @memberof NUTs.Handler.Box
	* @method 
	* @description 기준 지도 이동에 따른 색인도의 영역 박스 reraw 
	* @param {Objec} bounds : NUTs.Bounds 객체
	*/
	applyBox: function (bounds) {
		if(this.indexMap && this.zoomBox) this.removeBox();
		
		this.dragHandler.start = this.map.getPixelFromLonLat(new OpenLayers.LonLat(bounds.left, bounds.top));
		var endPixel = this.map.getPixelFromLonLat(new OpenLayers.LonLat(bounds.right, bounds.bottom));
		var width = endPixel.x - this.dragHandler.start.x;
		var height = endPixel.y - this.dragHandler.start.y;
		
		this.zoomBox = OpenLayers.Util.createDiv('zoomBox', this.dragHandler.start);
		this.zoomBox.className = this.boxDivClassName;
		this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
		this.map.viewPortDiv.appendChild(this.zoomBox);
		this.zoomBox.style.width = width + "px";
		this.zoomBox.style.height = height + "px";
    },
    

	/**
	* @memberof NUTs.Handler.Box
	* @method 
	* @description 기준 지도 이동에 따른 박스 이동 처리
	* @param {Objec} xy : NUTs.Bounds 객체
	*/
     moveBox: function (xy) {
    	 var startX = this.dragHandler.start.x;
         var startY = this.dragHandler.start.y;
         var deltaX = Math.abs(startX - xy.x);
         var deltaY = Math.abs(startY - xy.y);

         var offset = this.getBoxOffsets();
         this.zoomBox.style.width = (deltaX + offset.width + 1) + "px";
         this.zoomBox.style.height = (deltaY + offset.height + 1) + "px";
         this.zoomBox.style.left = (xy.x < startX ?
             startX - deltaX - offset.left : startX - offset.left) + "px";
         this.zoomBox.style.top = (xy.y < startY ?
             startY - deltaY - offset.top : startY - offset.top) + "px";
     },

	/**
 	* @memberof NUTs.Handler.Box
 	* @method 
 	* @description 기준 지도 이동에 따른 색인도의 영역 박스 redraw
 	* @param {Objec} end : NUTs.Pixel 객체
 	*/
	endBox: function(end) {
	    var result;
	    if (Math.abs(this.dragHandler.start.x - end.x) > 5 ||    
	        Math.abs(this.dragHandler.start.y - end.y) > 5) {   
	        var start = this.dragHandler.start;
	        var top = Math.min(start.y, end.y);
	        var bottom = Math.max(start.y, end.y);
	        var left = Math.min(start.x, end.x);
	        var right = Math.max(start.x, end.x);
	        result = new OpenLayers.Bounds(left, bottom, right, top);
	    } else {
	        result = this.dragHandler.start.clone(); // i.e. OL.Pixel
	    } 
		
		if(!this.indexMap) {
			this.removeBox();
		} 

	    this.callback("done", [result]);
	},
	
	
	/**
 	* @memberof NUTs.Handler.Box
 	* @method 
 	* @description 핸들러 비 활성화 
 	*/
	deactivate: function () {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            if(this.dragHandler && this.dragHandler.deactivate) this.dragHandler.deactivate();
            return true;
        } else {
            return false;
        }
    },
	
	CLASS_NAME: "NUTs.Handler.Box"
});