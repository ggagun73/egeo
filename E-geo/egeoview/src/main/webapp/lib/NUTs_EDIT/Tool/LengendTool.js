/**************************************************************************************************************
 * LengendTool 클래스   
 * @namespace {Object} NUTs.Tool.LengendTool
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Tool.LengendTool = OpenLayers.Class({
	/**
	 * 지도 객체
	 */
	map : null,
	
	/**
	 * 레이어 명
	 */
	layers : null,
	
	/**
	 * 콜백 함수
	 */
	callback : null,
	
	/**
	 * sld 객체
	 */
	 sld : {},
	
	/**
	 * 전체 범례/현재 범례 여부
	 */
	allList : false,
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : NUTs.Tool.LengendTool 객체 생성
	 * 인 자 : map (지도 객체), layerName (WMS 레이어 명), layers (호출할 레이어 목록), callback (요청 처리 후 실행될 함수)
	 * 사용법 : initialize(map, layerName, callback)
	 * 작성일 : 2011.05.19
	 * 작성자 : 연구개발센터
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		연구개발센터		최초생성
	 * 
	 **********************************************************************************/
	initialize : function(map, layerName, layers, callback) {
		this.map = map;
		
		if(layerName) {
			this.layer = this.map.getLayerByName(layerName);
		}
		else {
			this.layer = this.map.baseLayer;
		}
		
		var layerList = [];
		if(layers) {
			layerList = layers;
		}
		else { 
			layerList = this.layer.params.LAYERS;
		}

		this.callback = callback;
		
		var control = this;
		
		NUTs.WMS.getStyles(this.layer.url, layerList + ",", function(res) {
			control.sld = res;
			control.parseStyle();
		});
		
		
		this.map.events.register("moveend", this, function(){
			this.parseStyle();
		});
	},
	
	/**********************************************************************************
	 * 함수명 : parseStyle
	 * 설 명 : XML 을 Parsing 해서 json Object 를 생성
	 * 사용법 : parseStyle()
	 * 
	 * 작성일 : 2011.05.19
	 * 작성자 : 연구개발센터
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		연구개발센터		최초 생성
	 * 2011.06.29		연구개발센터		새로운 Viewer 맵 정의에 맞게 수정
	 * 								
	 **********************************************************************************/
	parseStyle : function() {
		var arr = [];
		
		var curLayers = {};
		if(!this.allList) {
			var pLayers = this.layer.params.LAYERS.split(",");
			for(var i=0, len=pLayers.length; i < len; i++) {
				curLayers[pLayers[i]] = true;
			}
		}
		
		var namedLayers = this.sld.namedLayers;
		for(var i in namedLayers) {
			var userStyles = namedLayers[i].userStyle;
			for(var j in userStyles) {
				var rules = userStyles[j].rules;
				
				for(var k in rules) {
					if(rules[k].symbolizer.text) continue;
					
					if(!this.allList) {
						var scale = parseInt(this.map.getScale());
						var maxScale = rules[k].maxScale;
						if(maxScale == 0) {
							maxScale = parseInt(OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(0), this.map.units));
						}	
					}
					
					var count = 0;
					if((curLayers[namedLayers[i].name] && maxScale >= scale && scale >= rules[k].minScale) || this.allList) {
						if(!rules[k].symbolizer.Text) {
							var lengendObj = {
								layer : namedLayers[i].name,
								style : userStyles[j].name,
								rule : rules[k].name,
								count : count
							};
							
							arr.push(lengendObj); 
							count++;
						}
					}
				}
			}
		}

		this.callback(arr);
	},
	
	/**********************************************************************************
	 * 함수명 : showFullList
	 * 설 명 : 전체 범례를 반환
	 * 사용법 : showFullList()
	 * 작성일 : 2011.05.19
	 * 작성자 : 연구개발센터
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		연구개발센터		최초 생성
	 * 
	 **********************************************************************************/
	showFullList: function() {
		this.allList = true;	
		this.parseStyle();	
	},
	
	/**********************************************************************************
	 * 함수명 : showCurrentList
	 * 설 명 : 현재 범례를 반환
	 * 사용법 : showCurrentList()
	 * 작성일 : 2011.05.19
	 * 작성자 : 연구개발센터
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		연구개발센터		최초 생성
	 * 
	 **********************************************************************************/
	showCurrentList: function() {
		this.allList = false;
		this.parseStyle();
	},
	
	CLASS_NAME: "NUTs.Tool.LengendTool"
});
	