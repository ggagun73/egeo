/**************************************************************************************************************
 * PolygonMeasure 클래스
 * @namespace {Object} NUTs.Handler.PolygonMeasure
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Handler.PolygonMeasure = OpenLayers.Class(OpenLayers.Handler.Polygon, {
	/*
	 * 외부에서 사용하던 팝업을 내부로 이동
	 */
	popup : null,
	

	/**
	* @memberof NUTs.Handler.PolygonMeasure
	* @method
	* @description 지도에서 그린 선의 면적를 계산 
	*/
	measureArea : function() {
		//현재 거리 측정에 사용된 geometry값의 복사본을 가져옴
		var geometry = this.geometryClone();
		
		//geometry.getArea() - geometry의 면적을 구함
		var subLength = geometry.getArea();
		//단위 계산을 위해 tempLength로 거리를 저장
		var tempLength = subLength;
		
		//tempLength 에  km의 제곱 단위를 적용
		tempLength *= Math.pow(OpenLayers.INCHES_PER_UNIT["m"] / OpenLayers.INCHES_PER_UNIT['km'], 2);
	    
		//km의 제곱 단위를 적용 후 결과가 1 이상일 경우에만 km 제곱 단위를 사용
	    if(tempLength > 1) subLength = tempLength.toFixed(2) + "km" + "<sup>2</" + "sup>";
	    //그렇지 않을 경우 m 단위를 사용
	    else subLength = subLength.toFixed(2) + "m" + "<sup>2</" + "sup>";
	    
	    //계산 결과 값을 리턴
		return subLength;
	},


	/**
	* @memberof NUTs.Handler.PolygonMeasure
	* @method
	* @description 지도에서 마우스 다운 이벤트가 발생할 때 실행되는 함수
	* @params {Object} evt : 이벤트 객체
	*/
	mousedown: function(evt) {
		if (this.lastDown && this.lastDown.equals(evt.xy)) {
	       return false;
	    }
		if(this.lastDown == null) {
	    	// 멀티 라인일 경우 이전 측정 결과를 삭제 하지 않음
			if(!this.multiLine) {
				if(this.persist) { this.destroyFeature();  }
				this.removePopup();
			}
	        this.createFeature(evt.xy);
	    } else if((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
	        this.addPoint(evt.xy);
	    }
	    this.lastDown = evt.xy;
	    this.drawing = true;
		
		//마우스 다운 시 생성 되도록 mouseup 의 소스를 이동
        if(this.freehandMode(evt)) {
            this.removePoint();
            this.finalize();
        } else {
            if(this.lastUp == null) {
               this.addPoint(evt.xy);
            }
            this.lastUp = evt.xy;
        }
		
		//point Feature를 나타낼 지도 좌표를 구함
	    var lonlat = this.map.getLonLatFromPixel(evt.xy);
		
		//point Feature를 나타낼 지도 좌표를 구함
    	var pointFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
    	//point Feature 등록
    	this.layer.addFeatures(pointFeature);
		
		var popup;
	    /* 마우스 다운 이벤트 작동 수를 저장 */
	    if(!this.count) {
        	var contentHtml = "<div id='measureStart' class='olControlMeasurePopup olControlMeasurePopupStart'><span class='MeasureColor'>시작</span></div>";
        	popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
        	
			contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupMovePoly'>총면적 : <span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
        	this.popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
        	
        	this.map.addPopup(this.popup);
			
			this.popup.updateSize();
			this.popup.type = "measure";
			
	    	//클릭 횟수 저장 변수를 생성 및 초기화
            this.count = 1;
	    }
	    else {
			if(this.count > 1) {
				contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupDefaultPoly'><span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
	        	popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
			}

	        this.count += 1;
	    }
		
		if (popup) {
			this.map.addPopup(popup);
			popup.type = "measure";
			popup.updateSize();
		}
    	
    	//마우스 우클릭 일때 실행
    	if(evt.button == "2") {
			this.rightclick(evt);
	        return true;
		}
	    
	    return false;
	},

	/**
	* @memberof NUTs.Handler.PolygonMeasure
	* @method
	* @description 마우스 이동 이벤트
	* @params {Object} evt : 이벤트 객체
	*/
	mousemove: function (evt) {
        if(this.drawing) { 
            if(this.mouseDown && this.freehandMode(evt)) {
                this.addPoint(evt.xy);
            } else {
                this.modifyFeature(evt.xy);
				
				//팝업을 마우스 포인터를 따라 다니게 한다.
				if(this.popup) {
					var contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupMovePoly' >총면적 : <span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
					this.popup.setContentHTML(contentHtml);
					this.popup.updateSize();
	                this.popup.moveTo(evt.xy);	
				}
            }
        }
        return true;
    },
	

	/**
	* @memberof NUTs.Handler.PolygonMeasure
	* @method
	* @description 거리 측정 종료
	* @params {Object} evt : 이벤트 객체
	*/
	rightclick: function(evt) {
    	this.dblclick(evt);
    	return false;
    },


	/**
	* @memberof NUTs.Handler.PolygonMeasure
	* @method
	* @description 거리 측정 종료
	* @params {Object} evt : 이벤트 객체
	*/
	dblclick: function(evt) {
		if(this.count < 3) {
			alert('면적은 3개 이상의 지점을 선택해야 합니다.');
			return false;
		}
		
		if(this.map.popups[this.map.popups.length-1].type == "measure") {
			this.map.removePopup(this.map.popups[this.map.popups.length-1]);
		}
		
		//point Feature를 나타낼 지도 좌표를 구함
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
		
		var contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupMovePoly' >총면적 : <span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
	    var popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
		this.map.addPopup(popup);
		popup.type = "measure";
		popup.updateSize();
		
		// 더블클릭시 클릭 카운트 초기화
		this.count = 0;
        if(!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 1;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            this.removePoint();
            this.finalize();
        }
        
		if(this.popup) {
			this.map.removePopup(this.popup);
			this.popup = null;
		}
        
        return false;
    },
    
 	 /**********************************************************************************
	 * 함수명 : deactivate
	 * 설 명 : 컨트롤 비 활성화
	 * 사용법 : deactivate()
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 연구개발센터
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		연구개발센터		컨트롤 비 활성 화 시 측정 결과 유지
	 * 
	 **********************************************************************************/
    deactivate: function() {
        if(!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        // call the cancel callback if mid-drawing
        if(this.drawing) {
            this.cancel();
        }
        //this.destroyFeature();
        
        // If a layer's map property is set to null, it means that that layer
        // isn't added to the map. Since we ourself added the layer to the map
        // in activate(), we can assume that if this.layer.map is null it means
        // that the layer has been destroyed (as a result of map.destroy() for
        // example.

        //컨트롤 비 활성 시 측정 결과 유지 여부
        if(!this.persistControl) {
        	this.layer.destroy(false);
			this.removePopup();
        }
		
        this.layer.prevLayer = true;

        this.layer = null;
        return true;
    },


	/**
	* @memberof NUTs.Handler.PolygonMeasure
	* @method
	* @description 측정 팝업 삭제 
	*/
	removePopup : function() {
		var len = this.map.popups.length;
		for(var i=len-1; i >= 0; i--) {
			if(this.map.popups[i].type == "measure") {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
    CLASS_NAME: "NUTs.Handler.PolygonMeasure"
});