/**
 * 지도개체 
 * @namespace {Object} NUTs.Maps.Map
 */

/**********************************************************************************
 * 파일명 	: Map.js
 * 설명 	: Map Class
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자					version				작업내역
 * --------------------------------------------------------------------------------
 * 2017.02.10		ggash				0.1					최초 생성
 * 
**********************************************************************************/

NUTs.Maps.Map = OpenLayers.Class(OpenLayers.Map, {
	
    /**
     * Property: units
     * {String} 지도 거리 단위
    */ 
	units: 'm',
	
	/**
     * Property: numZoomLevels
     * {String} 축척 레벨
    */  
	numZoomLevels : 11,
	
	/**
     * Property: projection
     * {String} 투영법
    */ 
	projection: 'EPSG:4326',

	/**
     * Property: displayProjection
     * {String} 화면 투영법
    */ 
	displayProjection:'EPSG:4326',

	/**
     * Property: fractionalZoom
     * {String} 타일방식 고정축척외 사용자 정의 축척 사용 여부
    */ 
	fractionalZoom : true,
	
	/**
     * Property: allOverlays
     * {String} 기준 레이어 사용 안 함. 가장 아래에 있는 레이어가 기준 레이어가 됨
    */ 
	allOverlays: false,
	
	/**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description Map 객체 생성 (생성자 함수)
	* @param {String} div 	: div ID(지도 DIV 엘리먼트 아이디)
	* @param {Object} options 	: 지도 생성 옵션 
	* @author  ggash(2017.02.10)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	initialize: function (div, options) {
		//mandatory param check
		if(NUTs.Util.debug) this.chkParams(div, options);
		
		// If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }

        // Simple-type defaults are set in class definition. 
        //  Now set complex-type defaults 
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,
                                            OpenLayers.Map.TILE_HEIGHT);
        
        this.paddingForPopups = new NUTs.Bounds(15, 15, 15, 15);

        this.theme = OpenLayers._getScriptLocation() + 
                             'theme/default/style.css'; 

        // now override default options 
        OpenLayers.Util.extend(this, options);
        
        var projCode = this.projection instanceof OpenLayers.Projection ?
            this.projection.projCode : this.projection;
        OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[projCode]);
        
        // allow extents and center to be arrays
        if (this.maxExtent && !(this.maxExtent instanceof NUTs.Bounds)) {
            this.maxExtent = new NUTs.Bounds(this.maxExtent);
        }
        if (this.minExtent && !(this.minExtent instanceof NUTs.Bounds)) {
            this.minExtent = new NUTs.Bounds(this.minExtent);
        }
        if (this.restrictedExtent && !(this.restrictedExtent instanceof NUTs.Bounds)) {
            this.restrictedExtent = new NUTs.Bounds(this.restrictedExtent);
        }
        if (this.center && !(this.center instanceof OpenLayers.LonLat)) {
            this.center = new OpenLayers.LonLat(this.center);
        }

        // initialize layers array
        this.layers = [];

        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");

        this.div = OpenLayers.Util.getElement(div);
        if(!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        
        OpenLayers.Element.addClass(this.div, 'olMap');

        var id = this.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null,
                                                     "relative", null,
                                                     "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        
        this.events = new OpenLayers.Events(
                this, this.viewPortDiv, null, this.fallThrough, 
                {includeXY: true}
            );
            
            if (OpenLayers.TileManager && this.tileManager !== null) {
                if (!(this.tileManager instanceof OpenLayers.TileManager)) {
                    this.tileManager = new OpenLayers.TileManager(this.tileManager);
                }
                this.tileManager.addMap(this);
            }

        id = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;
        this.layerContainerOriginPx = {x: 0, y: 0};
        this.applyTransform();
        
        this.viewPortDiv.appendChild(this.layerContainerDiv);

        this.updateSize();
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
 
        if (this.autoUpdateSize === true) {

            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, 
                this);
            OpenLayers.Event.observe(window, 'resize',
                            this.updateSizeDestroy);
        }
        
        // only append link stylesheet if the theme property is set
        if(this.theme) {
        	
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for(var i=0, len=nodes.length; i<len; ++i) {
                if(OpenLayers.Util.isEquivalentUrl(nodes.item(i).href,
                                                   this.theme)) {
                    addNode = false;
                    break;
                }
            }

            if(addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        
        if (this.controls == null) {
        	 this.controls = [];
            if (OpenLayers.Control != null) { // running full or lite?
            	
            	if(OpenLayers.Control.Navigation){
            		this.controls.push(new OpenLayers.Control.Navigation({id : 'drag'}));
            	}
            	if(NUTs.Control.ZoomIn){
            		this.controls.push(new NUTs.Control.ZoomIn({id : 'zoomIn'}));
            	}
            	if(NUTs.Control.ZoomOut){
            		this.controls.push(new NUTs.Control.ZoomOut({id : 'zoomOut'}));
            	}
            	if(OpenLayers.Control.NavigationHistory){
            		this.controls.push(new OpenLayers.Control.NavigationHistory({id : 'naivgationHistory'}));
            	}
            	
            } 
        }
		
        for(var i=0, len=this.controls.length; i<len; i++) {
            this.addControlToMap(this.controls[i]);
        }
		
        this.popups = [];

        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        

        // always call map.destroy()
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
        
        // add any initial layers
        if (options && options.layers) {

            delete this.center;
            delete this.zoom;
            this.addLayers(options.layers);
            // set center (and optionally zoom)
            if (options.center && !this.getCenter()) {
                // zoom can be undefined here
                this.setCenter(options.center, options.zoom);
            }
        }
        
        if (this.panMethod) {
            this.panTween = new OpenLayers.Tween(this.panMethod);
        }
        if (this.zoomMethod && this.applyTransform.transform) {
            this.zoomTween = new OpenLayers.Tween(this.zoomMethod);
        }
    },
    
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description 필수 파라미터를 검사한다
	* @param {String} div 	: div ID(지도 DIV 엘리먼트 아이디)
	* @param {Object} options 	: 지도 생성 옵션 
	* @author  ggash(2017.02.10)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	chkParams : function(div, options){
		if(!OpenLayers.Util.getElement(div)) {
			NUTs.Util.create_obj(this, "id (지도를 표시할 DIV ID)");
		}
		
		//options 파라미터 존재 여부 확인
		if(options && typeof options === "object") {
			//maxExtent는 필수 옵션
			if(!options.maxExtent) {
				NUTs.Util.create_obj(this, "options maxExtent (최대 영역)");
			}
			if(!options.maxResolution) {
				NUTs.Util.create_obj(this, "options maxResolution (최대 해상도)");
			}
		}
		else {
			NUTs.Util.create_obj(this, "options");
		}
	},
	
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description 레이어 이름으로 레이어 개체를 반환
	* @param 	{String} name 	: 레이어 이름
	* @returns 	{Object} 레이어 개체
	* @author  ggash(2017.02.10)
	* @logs
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	getLayerByName: function(name) {
		var foundLayer = null;
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            if (layer.name == name) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
	},
	
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description 레이어 이름으로 레이어 개체를 삭제처리
	* @param 	{String} name 	: 레이어 이름
	* @returns 	{Object} 레이어 개체
	* @author  ggash(2017.02.10)
	* @logs
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/	
	removeLayerByName: function(name) {
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            if (layer.name == name) {
				this.removeLayer(layer);
                break;
            }
        }
	},
	
	/**********************************************************************************
	 * 함수명 : activeControls
	 * 설 명 : 컨트롤들을 활성화 한다.
	 * 인 자1 : controls - 활성화시키고자 하는 (컨트롤 or 컨트롤들)
	 * 인 자2 : deactiveControls - 비활성화시키고자 하는 (컨트롤 id or 컨트롤들 id)
	 * 사용법 : activeControls(controls, deactiveControls)
	 *	controls 
	 * 		- drag		:	이동 툴
	 * 		- ZoomIn	:	확대 툴
	 * 		- ZoomOut	:	축소 툴
	 * 
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 2016.05.12		최재훈		편집모드일 경우 오류해결
	 * 
	 * 								
	 **********************************************************************************/
	activeControls: function(controls, editMode) {

		this.selectiveDeactivateControl(controls, editMode);
		
		if(typeof controls === "object") {
			if(controls.length && controls.length > 0) {
				for(var i = 0; i < controls.length; i++) {
					this.getControl(controls[i]).activate();
				}
			}
		}
		else {
			this.getControl(controls).activate();
		}
	},
	
	selectiveDeactivateControl: function(controls, editMode) {
	
		if(!editMode)
			this.deActiveAllControls();
		
		/*else if(CONFIG) {
			
			var aDeactiveControls = CONFIG.fn_get_deactiveControls();
			
			for(var i in this.layers) {
				if(this.layers[i].CLASS_NAME == "NUTs.Layer.Vector" || this.layers[i].CLASS_NAME == "OpenLayers.Layer.Vector") {
					if(_aExceptionLayers){
						if(_aExceptionLayers.indexOf(this.layers[i].name) === -1){
							this.layers[i].removeFeatures(this.layers[i].features);
						}
					}
					else
						this.layers[i].removeFeatures(this.layers[i].features);
				}
			}
			
		}*/
		
	},
	/**********************************************************************************
	 * 함수명 : deActiveAllControls
	 * 설 명 : 모든 컨트롤 decativate 
	 * 사용법 : deActiveAllControls()
	 * 작성일 : 2015.10.21
	 * 작성자 : 기술개발팀 최재훈
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2015.10.21		최재훈		최초 생성
	 * 
	 **********************************************************************************/
	deActiveAllControls: function() {
		for(var i in this.controls) {
			if(this.controls[i].type != OpenLayers.Control.TYPE_TOGGLE) {
				//if(this.controls[i].CLASS_NAME.indexOf("OpenLayers.Editor.Control.EditorCustomPanel") === -1 && this.controls[i].id != "mousePosition")
				if(this.controls[i].id != "mousePosition")
					this.controls[i].deactivate();	
			}
		}
	},
	
	/**********************************************************************************
	 * 함수명 : removeAllPopups
	 * 설 명 : 지도 위의 모든 팝업 객체 삭제
	 * 인 자 : div (맵 객체 id)
	 * 사용법 : removeAllPopups()
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 
	 **********************************************************************************/
	removeAllPopups : function() {
		var len = this.popups.length;
		for(var i=len-1; i >= 0; i--) {
			this.removePopup(this.popups[i]);
		}
	},
	
	/**********************************************************************************
	 * 함수명 : getResolutions
	 * 설 명 : 지도 객체의 해상도의 배열을 반환한다.
	 * 사용법 : getResolutions()
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getResolutions : function() {
		return this.resolutions;
	},

	/**********************************************************************************
	 * 함수명 : movePrev
	 * 설 명 : 이전 영역으로 이동한다.
	 * 사용법 : movePrev()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	movePrev: function() {
		this.getControl("naivgationHistory").previousTrigger();
	},
	
	/**********************************************************************************
	 * 함수명 : moveNext
	 * 설 명 : 다음 영역으로 이동한다. (이전으로 되 돌린 영역이 있을 때만 가능)
	 * 사용법 : moveNext()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	moveNext: function() {
		this.getControl("naivgationHistory").nextTrigger();
	},
	
	isPrevStack : function() {
		if(this.getControl("naivgationHistory").previousStack.length > 1) {
			return true;
		}
		else {
			return false;
		}
	},
	
	isNextStack : function() {
		if(this.getControl("naivgationHistory").nextStack.length > 0) {
			return true;
		}
		else {
			return false;
		}
	},
	
	/**********************************************************************************
	 * 함수명 : cleanMap
	 * 설 명 : 지도 위의 모든 도형(사용자 그래픽)과 팝업을 삭제.
	 * 인 자 : _aExceptionLayers (초기화 시 제외할 레이어 목록)
	 * 사용법 : cleanMap()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	cleanMap : function(_aExceptionLayers) {
		var currControls = [];
		for(var i in this.controls) {
			if(this.controls[i].active) {
				currControls.push(this.controls[i]);
			}
			if(this.controls[i].id !== "mousePosition")
				this.controls[i].deactivate();
		}
		
				
		for(var i=0; i < currControls.length; i++) {
			currControls[i].activate();
		}
		
		for(var i in this.layers) {
			if(this.layers[i].CLASS_NAME == "NUTs.Layer.Vector" || this.layers[i].CLASS_NAME == "OpenLayers.Layer.Vector") {
				if(_aExceptionLayers){
					if(_aExceptionLayers.indexOf(this.layers[i].name) === -1)
						this.layers[i].removeFeatures(this.layers[i].features);
				}
				else
					this.layers[i].removeFeatures(this.layers[i].features);
			}
		}
		
		this.removeAllPopups();
	},
	
	/**********************************************************************************
	 * 함수명 : getPopup
	 * 설 명 : 팝업 객체 반환
	 * 인 자 : id (반환할 팝업 ID)
	 * 사용법 : getPopup(id)
	 * 작성일 : 2011.05.11
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.11		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	getPopup : function(id) {
		for(var i in this.popups) {
			if(this.popups[i].id == id) {
				return this.popups[i];
			};
		}
		return false;
	},
	
	/**********************************************************************************
	 * 함수명 : setCenterScale
	 * 설 명 : 지정한 좌표와 축척으로 이동
	 * 인 자 : lonlat (이동할 좌표), scale (이동할 축척)
	 * 사용법 : setCenterScale(lonlat, scale)
	 * 작성일 : 2011.05.11
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.11		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	setCenterScale : function(lonlat, scale) {
		if(scale) {
			this.center = lonlat;
			this.zoomToScale(scale);
		}
		else {
			this.setCetner(lonlat);
		}
	},
	
	zoomToFeature : function(feature, zoom) {
		if(zoom) {
			this.setCenter(new OpenLayers.LonLat(feature.geometry.getCentroid().x, feature.geometry.getCentroid().y), zoom);
		}
		else {
			if(feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point" || feature.geometry.id.indexOf("OpenLayers_Geometry_Point") > -1) {
				this.setCenter(new OpenLayers.LonLat(feature.geometry.getCentroid().x, feature.geometry.getCentroid().y), this.getNumZoomLevels()-1);
			}
			else {
				this.zoomToExtent(feature.geometry.getBounds());	
			}
		}
	},
		
	CLASS_NAME: "NUTs.Maps.Map"
});