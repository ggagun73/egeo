/**************************************************************************************************************

 * Popup 클래스  
 * @namespace {Object} NUTs.Popup 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  


NUTs.Popup = OpenLayers.Class(OpenLayers.Popup, {
	
	/**
	 * 팝업을 거리를 두고 그림
	 */
	offsetPixel : null,
	

	initialize:function(id, lonlat, contentSize, contentHTML, offsetPixel) {
		if(offsetPixel) {
			this.offsetPixel = offsetPixel;
		}
		
        if (id == null) {
            id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }

        this.id = id;
        this.lonlat = lonlat;

        this.contentSize = (contentSize != null) ? contentSize 
                                  : new OpenLayers.Size(
                                                   OpenLayers.Popup.WIDTH,
                                                   OpenLayers.Popup.HEIGHT);
        if (contentHTML != null) { 
             this.contentHTML = contentHTML;
        }
     //   this.backgroundColor = OpenLayers.Popup.COLOR;
        this.opacity = OpenLayers.Popup.OPACITY;
        this.border = OpenLayers.Popup.BORDER;

        this.div = OpenLayers.Util.createDiv(this.id, null, null, 
                                             null, null, null, "hidden");
        this.div.className = this.displayClass;
        
        var groupDivId = this.id + "_GroupDiv";
        this.groupDiv = OpenLayers.Util.createDiv(groupDivId, null, null, 
                                                    null, "relative", null,
                                                    "hidden");

        var id = this.div.id + "_contentDiv";
        this.contentDiv = OpenLayers.Util.createDiv(id, null, this.contentSize.clone(), 
                                                    null, "relative");
        this.contentDiv.className = this.contentDisplayClass;
        this.groupDiv.appendChild(this.contentDiv);
        this.div.appendChild(this.groupDiv);

		/*
		 * 닫기 버튼 사용 안할 것으로 판단되어 삭제
        if (closeBox) {
            this.addCloseBox(closeBoxCallback);
        } 
        */

        this.registerEvents();
    },
	
	
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description  팝업의 위치 반환 
	* @logs
	* 수정일				수정자			수정내용
	* ---------------------------------------------------------------------- 
	* 
	**********************************************************************************/
	getLonLat : function() {
		return this.lonlat;
	},
	

    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description  화면에 팝업 표시 
	* @logs
	* 수정일				수정자			수정내용
	* ---------------------------------------------------------------------- 
	* 
	**********************************************************************************/
    moveTo: function(px) {
        if ((px != null) && (this.div != null)) {
			// x, y 좌표의 픽셀을 offset으로 지정한 값만큼 증가 시킴
	    	if(this.offsetPixel) {
				px = px.add(this.offsetPixel.x, this.offsetPixel.y);
	    	}
			
			this.div.style.left = px.x + "px";
        	this.div.style.top = px.y + "px";
        }
    },
		
	CLASS_NAME: "NUTs.Popup"
});