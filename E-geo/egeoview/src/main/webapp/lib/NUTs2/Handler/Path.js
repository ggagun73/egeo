NUTs.Handler.Path = OpenLayers.Class(OpenLayers.Handler.Path, {
	
	attributes : null,
	editor : null,
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
    
    mousedown: function(evt) {
        // ignore double-clicks
        if (this.lastDown && this.lastDown.equals(evt.xy)) {
            return false;
        }
        if(this.lastDown == null) {
            if(this.persist) {
                this.destroyFeature();
            }
            this.createFeature(evt.xy);
        } else if((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
            this.addPoint(evt.xy);
        }
        this.mouseDown = true;
        this.lastDown = evt.xy;
        this.drawing = true;
        
        //mousedown callback 추가
        this.callback("mousedown", [this.point.geometry, this.getGeometry()]);
        
        //마우스 우클릭 일때 실행
        if(evt.button == "2") {
			this.rightclick(evt);
	        return true;
		}
        
        return false;
    },
    
    rightclick: function(evt) {
    	this.dblclick(evt);
    	return false;
    },
    
    mouseup: function (evt) {
        this.mouseDown = false;
        if(this.drawing) {
            if(this.freehandMode(evt)) {
                this.removePoint();
                this.finalize();
            } else {
                if(this.lastUp == null) {
                   this.addPoint(evt.xy);
                }
                this.lastUp = evt.xy;
            }
            
            //mouseup callback 추가
            this.callback("mouseup", [this.point.geometry, this.getGeometry()]);
            
            return false;
        }
        
        //mouseup callback 추가
        if(this.point && this.point.geometry && this.getGeometry()) {
        	this.callback("mouseup", [this.point.geometry, this.getGeometry()]);
        }
        
        return true;
    },
    
    finish : function() {
    	var index = this.line.geometry.components.length - 1;
        this.line.geometry.removeComponent(this.line.geometry.components[index]);
        this.removePoint();
        this.finalize();
        return false;
    },
    
	/**********************************************************************************
	 * 함수명 : addPoint
	 * 설 명 : LinearRing에 point 추가, 
	 * 			교차옵션-'교차' 사용여부에 따라 입력 point기준으로 생성된 path를 divide 처리
	 * 			교차옵션-'상월' 사용여부에 따라 입력 point기준으로 생성된 path와 교차하는 line 발견시 교차점을 기준으로 상월처리
	 * 인 자 : pixel (사용자 입력지점의 OpenLayers.Pixel)
	 * 사용법 : addPoint(pixel)
	 * 수정일			수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.08.29		윤은희			최초 생성
	 **********************************************************************************/
    addPoint: function(pixel) {
    	// 객체 추가시, 교차옵션적용[교차,상월,하월]
    	var DrawPath = NUTs.Edit.Control.DrawPath;
    	if(DrawPath.mode && DrawPath.crossOption !== 'cut'){
    		!DrawPath.forDivideFeature ? DrawPath.forDivideFeature = this.line.clone() : DrawPath.forDivideFeature.geometry.components.push(this.point.geometry.clone());	
    	}    	
    	
    	this.layer.removeFeatures([this.point]);
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel); 
        this.point = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat)
        );
        this.line.geometry.addComponent(
            this.point.geometry, this.line.geometry.components.length
        );
        this.layer.addFeatures([this.point]);
        this.callback("point", [this.point.geometry, this.getGeometry()]);
        this.callback("modify", [this.point.geometry, this.getSketch()]);
        this.drawFeature();
        delete this.redoStack;
        
    },
    CLASS_NAME: "NUTs.Handler.Path"
});