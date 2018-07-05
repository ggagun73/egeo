/******************************************************************************************************
 * Feature 공간조회 클래스
 * @namespace {Object} NUTs.Control.GetFeature
 * @description WFS - GetFeature 요청 처리 클래스
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.10.21			연구개발센터		0.1					최초 생성 
 ******************************************************************************************************/

NUTs.Control.GetFeature = OpenLayers.Class(OpenLayers.Control, { 

	/**
	* 이벤트 타입 (요청 완료 시 실행할 이벤트)
	* @memberof NUTs.Control.GetFeature
	* @member {Array}  EVENT_TYPES
	*/
	 EVENT_TYPES: ['callback', 'click'],
	
	/**
	 * 이지도 서비스 주소
	* @memberof NUTs.Control.GetFeature
	* @member {String}  serviceUrl 
	*/
	serviceUrl : null,
	
	/**
	 * XML prefix 명
	* @memberof NUTs.Control.GetFeature
	* @member {String}  prefix 
	*/
	 prefix : null,
	
	/**
	 * 검색 최대 도형 수
	* @memberof NUTs.Control.GetFeature
	* @member {Number}  maxFeatures 
	*/
	maxFeatures : 9999,
	
	/**
	 * 검색대상 테이블 목록
	* @memberof NUTs.Control.GetFeature
	* @member {Array} tables  
	*/
	tables : [],

	/**
	 * 타이틀 필드 리스트
	* @memberof NUTs.Control.GetFeature
	* @member {Object} titles 
	*/
	titles : {},

	/**
	 * 도형 영속성
	* @memberof NUTs.Control.GetFeature
	* @member {Boolean} persist 
	*/
	persist : true,
	
	/**
	 * 검색 거리
	* @memberof NUTs.Control.GetFeature
	* @member {Number} distance 
	* @description  
	*/
	distance : 1,
	
	/**
	 * 검색 후 수행 함수
	* @memberof NUTs.Control.GetFeature
	* @member {Object} callbacks
	*/
	callbacks : null,
	
	/**
	* 테이블, 필드명 Alias 반환여부
	* @memberof NUTs.Control.GetFeature
	* @member {Boolean} alias
	*/
	alias : false,
	
	/**
	 * 도메인 정보 사용 여부
	* @memberof NUTs.Control.GetFeature
	* @member {Boolean} useDomain
	*/
	useDomain : false,
	

	/**
	 * 레이어 관리 객체
	* @memberof NUTs.Control.GetFeature
	* @member {Object} layerTool  
	*/
	layerTool : null,

	/**
	 * GML 객체
	* @memberof NUTs.Control.GetFeature
	* @member {Object} gml  
	*/
	gml : new OpenLayers.Format.GML(),

	/**
	 * 검색 결과
	* @memberof NUTs.Control.GetFeature
	* @member {Object} result  
	*/
	result : null,

	/**
	 * 정렬할 필드명 리스트
	* @memberof NUTs.Control.GetFeature
	* @member {Array} sortFields  
	*/
	sortFields : [],
	
	/**
	 * 정렬 방향 리스트 (ASC | DESC)
	* @memberof NUTs.Control.GetFeature
	* @member {Array} sortOrders  
	*/
	sortOrders : [],
	
	
	/**
	* @memberof NUTs.Control.GetFeature
	* @method
	* @description  default map style 정의
	*/
	handlerOptions : {
		//라인 데이터 유지
		multiLine : true,
		//컨트롤 비 활성화 시 라인 유지 여부
		persistControl : true,
		//레이어 옵션
		layerOptions: {
			styleMap: new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(null, {
					rules: [new OpenLayers.Rule({
						symbolizer : {
							"Point": {
								pointRadius: 4,
								graphicName: "circle",
								fillColor: "#ffffff",
								fillOpacity: 1,
								strokeWidth: 1,
								strokeOpacity: 1,
								strokeColor: "#333333"
							},
							"Line" : {
								strokeWidth: 1,
								strokeOpacity: 1,
								strokeColor: "#333333"
							},
							"Polygon": {
								strokeWidth: 1,
								strokeOpacity: 1,
								strokeColor: "#333333",
								fillColor: "#ffffff",
								fillOpacity: 0.3
							}
						}
					})]
				})
			})
		}
	},
	
	/**
	* @memberof NUTs.Control.GetFeature
	* @method
	* @description 생성자 함수
	* @author 연구개발센터 (2016.11.26)
	* @param {String} str : 구분자를 포함한 영역정보
	* @param {str} str : 구분자(',')
	*/
	initialize: function(handler, options) {
		
		if(options.handlerOptions) {
			OpenLayers.Util.extend(this.handlerOptions, options.handlerOptions);
		}

		OpenLayers.Control.prototype.initialize.apply(this, [options]);
		
		this.EVENT_TYPES =
			NUTs.Control.GetFeature.prototype.EVENT_TYPES.concat(
            OpenLayers.Control.prototype.EVENT_TYPES
        );
		
        this.callbacks = OpenLayers.Util.extend(
            {
                done: this.getFeature
            },
            this.callbacks
        );
		
        this.handlerOptions = OpenLayers.Util.extend(
            {persist: this.persist}, this.handlerOptions
        );
		
        this.handler = new handler(this, this.callbacks, this.handlerOptions);
	},
	

	/**
	* @memberof NUTs.Control.GetFeature
	* @method
	* @description 테이블 명 목록 설정
	* @param {Array} arr : arr (layer 목록 배열 또는 레이어 이름) 
	*/
	setTables : function(arr) {
		if(arr instanceof Object) {
			this.tables = arr;
		}	
		else {
			this.tables = [];
			this.tables.push(arr);
		}
	},
	
	setDistance : function(distance) {
		this.distance = distance;
	},

	/**
	* @memberof NUTs.Control.GetFeature
	* @method
	* @description  속성 정보 요청
	* @param {Object} : geometry (Point Geometry)
	*/
    getFeature: function(geometry) {
		this.events.triggerEvent(this.EVENT_TYPES[1], geometry);
		 
		if(this.handler.radiusDist && (this.handler.radiusDist == 0 || this.handler.radiusDist > 500)) {
			alert("검색반경은 0m 와 500m 이내로 설정해주세요");
			return;
		}
		
		
		if(this.layerTool) {
			this.tables = [];
			var layers = this.layerTool.getLayers({con : 'attr',conVal : 1,order : 'asc'});
			
			var sld = this.layerTool.getSld();
			var namedLayers = sld.namedLayers;
			
			
			for(var i in namedLayers) {
				var userStyles = namedLayers[i].userStyle;
				for(var j in userStyles) {
					var rules = userStyles[j].rules;
					
					for(var k in rules) {
						if(rules[k].symbolizer.text) continue;
						
						var count = 0;
						
						var scale = parseInt(this.map.getScale());
						var maxScale = rules[k].maxScale;
						if(maxScale == 0) {
							maxScale = parseInt(OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(0), this.map.units));
						}
						
						if(maxScale >= scale && scale >= rules[k].minScale) {
							for(var l in layers) {
								if(namedLayers[i].name == layers[l].theme) {
									if(layers[l].show == 1){
										var exist = false;
										for(var m in this.tables) {
											if(this.tables[m] == layers[l].table) {
												exist = true;
												break;
											}
										}
										if(!exist) this.tables.push(layers[l].table);
									}
								}
							}
							break;
						}
					}
				}
			}
			if(this.tables.length < 1) {
				alert("조건에 맞는 레이어가 없습니다.");
				return;
			}
		}
	 
		var control = this;
		if(this.handler.CLASS_NAME == "NUTs.Handler.Point") {
			NUTs.WFS.getFeatureByDWithin(
				this.serviceUrl, 
				{
					prefix : this.prefix,
					tables : this.tables,
					distance : this.distance,
					values : [geometry],
					sortFields : this.sortFields,
					sortOrders : this.sortOrders,
					useDomain : this.useDomain
				}, 
				function(res) {
					control.result = res;
					control.events.triggerEvent(control.EVENT_TYPES[0], res);
				},
				{
					alias : this.alias,
					titles : this.titles
				}
			);
		}
		else {
			NUTs.WFS.getFeatureByGeometry(
				this.serviceUrl, 
				{
					prefix : this.prefix,
					tables : this.tables,
					values : [geometry],
					sortFields : this.sortFields,
					sortOrders : this.sortOrders,
					useDomain : this.useDomain
				}, 
				function(res) {
					control.result = res;
					control.events.triggerEvent(control.EVENT_TYPES[0], res);
				},
				{
					alias : this.alias,
					titles : this.titles
				}
			);
		}
    },
    
    getResult : function() {
    	return this.result;
    },
	
	CLASS_NAME: "NUTs.Control.GetFeature" 
});