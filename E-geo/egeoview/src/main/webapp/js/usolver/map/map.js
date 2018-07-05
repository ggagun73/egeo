/**
* 맵 객체 
* @member {Object} map
* @public 
*/
var map;

var vBase;
var vSAT;
var wgs84 = 'EPSG:4326';
var webMercator = 'EPSG:3857';

var serviceUrl = CONFIG.fn_get_serviceUrl();
  
/**
* (현재 서비스중인)레이어 관련 정보를 모두 담고 있는 객체
* @member {Object} layerTool
* @public 
*/
var layerTool;

/**
* (초기서비스)레이어 관련 정보를 모두 담고 있는 객체
* @member {Object} layerTool
* @public 
*/
var orgLayerTool;
/**
* SLD 관련 정보를 모두 담고 있는 객체
* @member {Object} sldTool
* @public 
*/
var sldTool;

/**
* 외부 data(shp/dxf) 관련 정보를 모두 담고 있는 객체
* @member {Object} dataTool
* @public 
*/

var oDataTool;
/**
 * 지도 기본 기능 
 * @namespace {Object} USV.MAP  
 */
USV.MAP = (function(_mod_map, $, undefined){

/**
* 개인별 지도서비스 정보  - 서비스 레이어목록, 지도로딩완료 후 최초 위치및 레벨, 개인화스타일(SLD) 
* @memberof USV.MAP
* @member {String} serviceUrl
*/
var userInfo = {
	userId : '',
	tmapId : '',
	posX : '',
	posY : '',
	scale : '',
	sldbody : '',
	changedLayer : [] //심볼변경 레이어목록
};

var aTreeSelectedLayers = [];
/**
* 그리기 기능 관련 객체
* @memberof USV.MAP
* @member {Object} oDrawTool
*/
var oDrawTool;

/**
* 메모 기능 관련 객체
* @memberof USV.MAP
* @member {Object} oMemoTool
*/
var oMemoTool;

/**
* 로그를 화면상에 기록할 지 여부 값
* @memberof USV.MAP
* @member {Boolean} bLogWrite
*/
var bLogWrite = true;


/**
* 레이어 추가/제외 시 레이어 목록 구성-기준정보(GetStyles값)
* @memberof USV.MAP
* @member {Object} oLayerStyles
*/
var oLayerStyles;

/**
 * 배경지도(다음 맵)
 * 
 * @memberof USV.MAP
 * @member {String} daumMap
 */
var daumMap = null;

/**
 * 배경지도(네이버 맵)
 * 
 * @memberof USV.MAP
 * @member {String} naverMap
 */
var naverMap = null;


var dawulMap = null;


var selectedSubjectGroup;


/**
* @memberof USV.MAP
* @method 
* @description oDrawTool 리턴
* @author 최재훈(2015.12.28)
* @returns 그리기 도구 관련 정보를 모두 담고있는 obj
*/
var fn_get_drawTool = function(){
	return oDrawTool;
};

var fn_get_dataTool = function(){
	return oDataTool;
};

var fn_get_treeSelectedLayers = function(){
	return aTreeSelectedLayers;
};

var fn_set_treeSelectedLayers = function(_aLayers){
	aTreeSelectedLayers = _aLayers;
};
/**
* @memberof USV.MAP
* @method 
* @description oMemoTool 리턴
* @author 김정수(2016.2.28)
* @returns 메모 도구 관련 정보를 모두 담고있는 obj
*/
var fn_get_memoTool = function(){
	return oMemoTool;
};

var fn_get_layerStyles = function(){
	return oLayerStyles;
};

var fn_set_layerStyles = function(_obj){
	oLayerStyles = _obj;
};

var fn_set_userTmapId = function(_id){
	userInfo.tmapId = _id;
};

var fn_get_userInfo = function(){
	return userInfo;
};

var fn_set_userId = function(_userId){
	userInfo.userId = _userId;
};

var fn_get_userId = function(){
	return userInfo.userId;
};


/**
* @memberof USV.MAP
* @method 
* @description 지도 초기화
* @author 임상수(2015.07.31)
* @param  {Object} _oRes : GetStyle 결과 Obj
* @param  {Boolean} _bUserStyle : userStyle사용여부 
* @caller map.jsp 로딩 시 자동호출
*/
var fn_init_map = function (_oRes, _bUserStyle, _sUserId, _sInitExtent) {

	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
	debugger;
	fn_create_map();
	
	//change jykw 20160725 for geoserver
	//fn_create_indexMap({layers : "법정읍면동", maxResolution : 2048, projection : new OpenLayers.Projection(CONFIG.fn_get_dataHouseCrs())});
	//fn_create_indexMap({layers : "TL_SGG", styles : "", maxResolution : 156543, projection : new OpenLayers.Projection(CONFIG.fn_get_dataHouseCrs())});	 - VWORLD
	fn_create_indexMap({layers : "BML_BADM_AS", styles : "", maxResolution : 2048, projection : new OpenLayers.Projection(CONFIG.fn_get_dataHouseCrs())});

	fn_init_divLayerTree(_oRes, _bUserStyle);
	
	fn_init_wms();
	
	fn_add_control();
	
	fn_move_map(_sUserId, _sInitExtent);

	MAP.fn_init_baseMap();
	
	MAP.fn_init_acssService();
	
	MAP.fn_init_alisService();
	
	MAP.fn_init_geocoding();
	
	MAP_EDITOR.fn_init_editor();
	
	EVENT.fn_bind_btnEvent();

	EVENT.fn_bind_btnEvent_CJH();
	
	EVENT.fn_bind_btnEvent_ISS();
	
	EVENT.fn_bind_btnEvent_LSH();
		
	SEARCH.fn_init_search();
	
	fn_load_layerTree(_sUserId);
	
	
	STYLE.fn_init_drawToolview();
	
	STYLE.fn_init_onOffDiv();
	
	fn_init_dataTool();
};


var fn_init_dataTool = function(){
	oDataTool = new NUTs.Tool.DataTool();
};
var fn_show_dataLoading = function() {
	
	COMMON.showWindow($("#dataLoading"));
};

var fn_hide_dataLoading = function() {
	
	$("#dataLoading").hide();
};

var fn_init_shpLoading = function(fileName) {
	//debugger;
	//shp파일의 feature를 띄울 벡터레이어 생성
	var layerName = "shpViewVector_" + fileName;
	var vectorLayer = new NUTs.Layer.Vector(layerName);
	map.addLayer(vectorLayer);
	
	var shp = new NUTs.Tool.DataTool.Shp(fileName);
	shp.setImportFileName(fileName);
	shp.setMode(MAP.fn_get_dataTool().getMode())
	
	if(shp){ 
		shp.initImportData();
		MAP.fn_get_dataTool().addShp( shp );
		shp.setLayer(vectorLayer);
	}
	
};

var fn_init_dataVector = function(){
	
};
 
/**
* @memberof USV.MAP
* @method 
* @description 지도 컨트롤 등록
* @author 최재훈(2015.07.30)
*/
var fn_add_control = function (){
	var controls = {
		// 거리 측정 
        line: new OpenLayers.Control.DynamicMeasure(
            OpenLayers.Handler.Path, {
            	id : 'measurePath'
            }
        ),
        
		// 면적 측정 
        polygon: new OpenLayers.Control.DynamicMeasure(
            OpenLayers.Handler.Polygon, {
            	id : 'measurePolygon'
            }
        ),
        // 마우스 위치 표출
        mousePosition : new OpenLayers.Control.MousePosition(
        			{ 
        				id : "mousePosition",
        				separator : "(N) ,",
            			suffix : "(E)",
            			numDigits: 3,
                		displayProjection : "EPSG:5181"
        			}
        ),
    	
        getFeature : new NUTs.Control.GetFeature(NUTs.Handler.Point, { 
    		id : "getFeature",
    		serviceUrl : CONFIG.fn_get_wfsServiceUrl(),
    		prefix : CONFIG.fn_get_dataHouseName(),
    		tables : [],
    		persist : true,
    		distance : 2,
    		eventListeners : {
    			"callback" : function(res) {
    				SEARCH.fn_search_point(res,"edit");
    			}
    		}
    	}),
        // 스케일
		scale : new OpenLayers.Control.ScaleLine(),
		
		zoomInOut : new OpenLayers.Control.Zoom({
            zoomInId: "customZoomIn",
            zoomOutId: "customZoomOut"
        })
    };
	
	for(var key in controls) {
        control = controls[key];
        map.addControl(control);
    }
	
	oDrawTool = new NUTs.Tool.DrawTool(map, {
		onModificationStart : function(feature) {
			$("#layerManager").trigger("click");
			$("#tabSymbolEdit").trigger("click");
			$("#tabSymbolEditTotal").addClass("LeftTab_selected");
			
			var attributes = feature.attributes;
			
			// 도형에 따라 보이는 속성 메뉴(li) 변경
			STYLE.fn_switch_drawToolshow(attributes.featureType);
			// 도형에 따라 값 설정
			STYLE.fn_bind_drawToolAttr(attributes);
		},
		onSelect : function(feature) {
			$("#layerManager").trigger("click");
			$("#tabSymbolEdit").trigger("click");
			$("#tabSymbolEditTotal").addClass("LeftTab_selected");
			
			var attributes = feature.attributes;
			
			// 도형에 따라 보이는 속성 메뉴(li) 변경
			STYLE.fn_switch_drawToolshow(attributes.featureType);
			// 도형에 따라 값 설정
			STYLE.fn_bind_drawToolAttr(attributes);
		},
		onUnselectAll : function() {
			STYLE.fn_switch_drawToolshow("None");
		},
		eventListeners: {
            featureover: function(e) {
            	if(e.feature.attributes.featureType == "Image") {
            		$(this.map.div).css("cursor", "pointer");
            	}
            },
            featureout: function(e) {
            	if(e.feature.attributes.featureType == "Image") {
            		$(this.map.div).css("cursor", "default");
            	}
            },                    
            featureclick: function(e) {
            	//
            	
            },
            featureadded : function(e) {
            	//
            	
            }
        }
	
	});
	oMemoTool = new NUTs.Tool.MemoTool(map, {
		onModificationStart : function(feature) {
			$("#layerManager").trigger("click");
			$("#tabSymbolEdit").trigger("click");
			$("#tabSymbolEditTotal").addClass("LeftTab_selected");
			
			var attributes = feature.attributes;
			
			// 도형에 따라 보이는 속성 메뉴(li) 변경
			//STYLE.fn_switch_show(attributes.featureType);
			// 도형에 따라 값 설정
			//STYLE.fn_bind_drawAttr(attributes);
		},
		onSelect : function(feature) {
			$("#layerManager").trigger("click");
			$("#tabSymbolEdit").trigger("click");
			$("#tabSymbolEditTotal").addClass("LeftTab_selected");
			
			var attributes = feature.attributes;
			
			// 도형에 따라 보이는 속성 메뉴(li) 변경
			STYLE.fn_switch_show(attributes.featureType);
			// 도형에 따라 값 설정
			STYLE.fn_bind_drawAttr(attributes);
		},
		onUnselectAll : function() {
			STYLE.fn_switch_show("None");
		},
		eventListeners: {
            featureover: function(e) {
            	if(e.feature.attributes.featureType == "Image") {
            		$(this.map.div).css("cursor", "pointer");
            	}
            },
            featureout: function(e) {
            	if(e.feature.attributes.featureType == "Image") {
            		$(this.map.div).css("cursor", "default");
            	}
            },                    
            featureclick: function(e) {
            	if(e.feature.attributes.featureType=="Image"){
            		MAP.fn_get_memo_hist(e.feature);
            		//map.activeControls("drawEditMemo");//마커이동 용
            	}            	
            },
            //featureadded 
            featureadded: function(e) {
            	if(e.feature.attributes.featureType=="Image"){
            		$("#btn_add_memo").data("featureData", e.feature);
                	
                	if(e.feature.attributes.seq < 100000) {	//불러온 객체 이외에 신규로 추가해서 만들어지는 feature인지 체크
                		if(e.feature.attributes.featureType == "Image") {
                			$("#btn_add_memo").trigger("click");    			
                			map.activeControls("drag");
                		}
                	}
            	}
            }
        }
	});
	
	oSearchSpaceTool = new NUTs.Tool.SearchSpaceTool(map,{
		onModificationStart : function(feature) {
		},
		onSelect : function(feature) {
		},
		onUnselectAll : function() {
		},
		eventListeners: {
            featureover: function(e) {
            	if(e.feature.attributes.featureType == "Image") {
            		$(this.map.div).css("cursor", "pointer");
            	}
            },
            featureout: function(e) {
            	if(e.feature.attributes.featureType == "Image") {
            		$(this.map.div).css("cursor", "default");
            	}
            },                    
            featureclick: function(e) {
            	var sFid;
            	try{
            		sFid = fn_get_fidByFeature(e.feature);
            	} catch (e) {
            		sFid = null;
				}
            	if(sFid) window.parent.REGISTER.fn_select_fidRow(sFid);
            },
            featureadded : function(e) {
            	var oSearchSpaceLayer = SEARCH.fn_get_searchSpaceLayer(); 
            	var features = oSearchSpaceLayer.features;
            	var oGeometry = e.feature.geometry;
            	// 검색 그림이 1개보다 많으면 삭제
            	if(features.length > 1) {
            		features[0].destroy();
            	}
            	var oSearchCondition = SEARCH.fn_get_searchCondition();
            	
            	if(oSearchSpaceLayer.callSpaceSearch) {
            		if(oSearchCondition.searchMethod === "edit") {
            			oSearchSpaceLayer.removeAllFeatures();            		           		
            			SEARCH.fn_search_featuresOnWFSLayer(oGeometry);
            		} else {
            			if(e.feature.geometry.id.indexOf('Point') != -1) {
            				SEARCH.fn_search_featuresByPoint(oGeometry,SEARCH.fn_call_register,"searchSpace");
            			} else {
            				SEARCH.fn_search_featuresByUserArea(oGeometry,SEARCH.fn_call_register,"searchSpace");
            			}
            		}
            		if(SEARCH.fn_get_bReScanCheck()) {
						REGISTER.fn_close_rescan();
            		}
            	}
            	map.activeControls("drag");
            }
        }
	})
	getFeatureControl = controls.getFeature;
};

/**
* @memberof USV.MAP
* @method 
* @description 인덱스 맵을 생성한다
* 		  최재훈(2015.12.28) : 주요 서비스 항목 CONFIG.js에 정의 
* @author 임상수(2015.07.30)
* @param {String} _oOptions : 인덱스 생성시 필요한 옵션 정보 
*/
var fn_create_indexMap = function (_oOptions) {
	
	var oIndexMapOption = {
			maxExtent : CONFIG.fn_get_getMapInfo().indexExtent,
			serviceUrl : CONFIG.fn_get_serviceUrl(),
			projection : _oOptions.projection,
			layers : _oOptions.layers,
			styles : _oOptions.layers, 
			maxResolution : _oOptions.maxResolution,
			div : "indexMap"
	};
	
	//ggash 20170112 for geoserver
	if(CONFIG.fn_get_gisEngineType() == "GeoServer"){
		oIndexMapOption.gisEngineType = "GeoServer";
		oIndexMapOption.styles = _oOptions.layers;
	}
	
	var oIndexMap = new NUTs.Maps.IndexMap(map, oIndexMapOption);
	
	oIndexMap.show();
	
	if(bLogWrite) {
		fn_write_log("IndexMap Layer : " + _oOptions.layers );
		fn_write_log("IndexMap resolution : " + _oOptions.maxResolution );
	}
};

/**
* @memberof USV.MAP
* @method 
* @description 지도에서 사용되는 jsTree 생성
* @author 임상수(2015.07.31)
* @param {object} _oRes : GetStyle 결과 obj
* @param {Boolean} _bUserStyle : userStyle 사용여부 
*/
var fn_init_divLayerTree = function (_oRes, _bUserStyle) {
	//MAP.fn_set_layerStyles(_oRes);
	
	$("#divLayerTree").jstree(	{
		"plugins" : [ "themes", "json_data", "ui", "cookies", "types","checkbox" ],
		"themes" : { "theme" : "default" },
		"json_data" : fn_create_treeJson(_oRes, false, true),
		"types" : {
			"valid_children" : [ "tmap" ],
			"types" : {
				"style" : {
					"valid_children" : "none"
				},
				"layer" : {
					"valid_children" : "style"
				},
				"group" : {
					"valid_children" : "layer"
				},
				"tmap" : {
					"valid_children" : [ "layer" ],
					"rename" : false,
					"start_drag" : false,
					"move_node" : false,
					"delete_node" : false,
					"remove" : false
				}
			}
		}
	});
	
	$("#divLayerTree").bind("loaded.jstree", function() {
        $("#divLayerTree li[show=1]").each( function() {
        	$("#divLayerTree").jstree("check_node", $(this));
        	var sLayerId = $(this).attr("id").replace("layer_","");

			var oNamedLayer = STYLE.fn_find_sldNameLayer(sLayerId);
			if(oNamedLayer)
				STYLE.fn_toggle_allRuleWmsLayer('on',oNamedLayer);
	});
    
     $("#divLayerTree").bind("open_node.jstree", function(e, _oData) {
    		if($(_oData.rslt.obj[0]).attr("rel")=="layer") {
    			$(_oData.rslt.obj[0]).find("li[rel=style]").each(function() {
    				if($(this).attr("id").indexOf("symbol") >= 0) {
    					var sTreeId = $(this).attr("id").replace("style_", "").replace("_symbol", "");
    					var aTreeId = sTreeId.split("_");
    					
    					if($(this).find("a ins.jstree-icon").css("background-image").indexOf("blank") >= 0) {
    						var oSld = layerTool.getSld();
    						
    						if(oSld.namedLayers[aTreeId[0]].userStyle[aTreeId[1]].rules[aTreeId[2]]){
    						
    						var oSymbolizer = oSld.namedLayers[aTreeId[0]].userStyle[aTreeId[1]].rules[aTreeId[2]].symbolizer;
    						var sImgUrl;
    						
    						//rule view check
                            if (!$("#divLayerTree").jstree("is_checked",_oData.rslt.obj[0])) {
                            	oSld.namedLayers[aTreeId[0]].userStyle[aTreeId[1]].rules[aTreeId[2]].hidden = true;
                            }

                            if(oSymbolizer["point"]) {
                            	sImgUrl = NUTs.WMS.getLengendGraphic(CONFIG.fn_get_serviceUrl(), {
    								layer : oSld.namedLayers[aTreeId[0]].name,
    								style : oSld.namedLayers[aTreeId[0]].userStyle[aTreeId[1]].name,
    								rule : oSld.namedLayers[aTreeId[0]].userStyle[aTreeId[1]].rules[aTreeId[2]].name
    							});
    						}
                            else {
    							var oTmpSymbolizer = {
    									width : 16,
    									height : 16
    								};
    							if(oSymbolizer["polygon"]) {
    								if(oSymbolizer["polygon"].externalGraphic){
    									sImgUrl = "/gmap/getImageFromBase64.do?encodeImg="+encodeURIComponent(oSymbolizer["polygon"].externalGraphic);
    								}
    								else{
    									oTmpSymbolizer.strFillColor = oSymbolizer["polygon"].fillColor.replace("#", "");
    									if(oSymbolizer["line"]) {
    										if(oSymbolizer["line"].stroke){
    											oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
    										}
    										else{
    											oTmpSymbolizer.strColor = "ffffff";
    										}
    										
    									}
    									sImgUrl = "/gmap/getPolygonSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
    								}
    							} else if(oSymbolizer["line"]) {
									if(oSymbolizer["line"]["arrow"]) {
										oTmpSymbolizer.arrow = 1;
									}
									if(oSymbolizer["line"]["marker"]) {
										oTmpSymbolizer.marker = 1;
									}
									if(oSymbolizer["line"].stroke){
										oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
									}
									else{
										oTmpSymbolizer.strColor = "ffffff";
									}
									sImgUrl = "/gmap/getLineSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
								}
							}
							$(this).find("a ins.jstree-icon").css("background-image", "url('"+sImgUrl+"')");
    						
    						}
    						
    						
    					}
    				}
    			});
    		}
    	});
		// 레이어 on/off
		$("#divLayerTree a ins.jstree-checkbox").on('click',function() {
			var oTreeElement = $(this).parent().parent();
			if(oTreeElement.attr("id").indexOf("group_") > -1) {
				$(oTreeElement).find("li.layer").each(function(index) {
					var sLayerId = $(this).attr("id").replace("layer_","");
					var oNamedLayer = STYLE.fn_find_sldNameLayer(sLayerId);
					
					if ($("#divLayerTree").jstree("is_checked", oTreeElement)) {
						STYLE.fn_toggle_allRuleWmsLayer('off',oNamedLayer);
					} else {
						STYLE.fn_toggle_allRuleWmsLayer('on',oNamedLayer);
					}
				});
			}
			else if (oTreeElement.attr("id").indexOf("layer_") > -1) {
				var sLayerId = oTreeElement.attr("id").replace("layer_", "");
				debugger;
				var oNamedLayer = STYLE.fn_find_sldNameLayer(sLayerId);
				
				if ($("#divLayerTree").jstree("is_checked",oTreeElement)) {
					STYLE.fn_toggle_allRuleWmsLayer('off',oNamedLayer);
				} 
				else {
					STYLE.fn_toggle_allRuleWmsLayer('on',oNamedLayer);
				}
			}
			else {
				var sRuleName = $(this).parent('a').text().replace("심볼 편집","");
				var sLayerName = $(this).closest('.layer').find('a').eq(0).text().replace("심볼 편집","");
				
				if ($("#divLayerTree").jstree("is_checked",oTreeElement)) {
					STYLE.fn_toggle_wmsRule('off',sLayerName,sRuleName);
				}
				else {
					STYLE.fn_toggle_wmsRule('on',sLayerName,sRuleName);
				}
			}
			fn_redraw_wms();
		});
		
		// 레이어 목록 더블클릭시 심볼편집화면
		$("#divLayerTree li.layer a").on("dblclick",function(){
			var layerNum = $(this).parents(".layer").attr("id").substr(6);
			STYLE.fn_create_layerInfo(layerNum);
			$("#tabSymbolEditTotal").trigger("click");
		});
		// 레이어 룰 더블클릭시 심볼편집
		$("#divLayerTree li.style a").on("dblclick",function(){
			var layerNum = $(this).parents(".layer").attr("id").substr(6);
			var styleNum = $(this).parents(".style").attr("id").split("_")[3];
			STYLE.fn_create_layerInfo(layerNum,styleNum);
			$("#tabSymbolEditTotal").trigger("click");
		});
		/*// 레이어 목록 오른쪽 클릭시 contextmenu
		$("#divLayerTree li li a").on("contextmenu",function(event){
			event.preventDefault();
			var oList = $(this);
			var oContextmenu = $("div.custom-menu");
			if(oContextmenu.length > 0) oContextmenu.remove();
			$("<div class='custom-menu'><img src='/images/usolver/com/tree/edit_state_2.png'/><div class='custom-menuText'>심볼 편집</div></div>").appendTo("body").css({top: oList.offset().top + "px", left: oList.offset().left + oList.width() + 10 + "px"});
			$(".leftCont").on("click",function(){
				$("div.custom-menu").remove();
			});
			$("div.custom-menu").on("click",function(){
				oList.trigger("dblclick");
				$(this).remove();
			});
		});*/
		
		$("#divLayerTree li li a").on("mouseover",function(){
			var oList = $(this);
			var oContextmenu = $("div.custom-menu");
			if(oContextmenu.length > 0) oContextmenu.remove();
			//.css({top: oList.offset().top + "px", left: oList.offset().left + oList.width() + 5 + "px"})
			$("<div class='custom-menu'><img src='/images/usolver/com/map/btn_sedit_off.png'/><div class='custom-menuText'>심볼 편집</div></div>").appendTo($(this));
			$("div.custom-menu").on("click",function(){
				oList.trigger("dblclick");
				$(this).remove();
			});
			$("div.custom-menu").on("mouseover",function(event){
				$(this).find("img").attr("src","/images/usolver/com/map/btn_sedit_on.png");
				event.stopPropagation();
			});
			$("div.custom-menu").on("mouseout",function(){
				$(this).find("img").attr("src","/images/usolver/com/map/btn_sedit_off.png");
			});
		});
		
	});
	
	// 레이어 관리
	$("#divLayerCtrl #1down").on('click',function() {
		
	});
};


/**
* @memberof USV.MAP
* @method 
* @description 지도에서 사용되는 jsTree 생성
* @author 최재훈(2016.08.11)
* @param {object} _oRes : GetStyle 결과 obj
* @param {Boolean} _bUserStyle : userStyle 사용여부 
*/ 
var fn_init_divAllLayerTree = function (_oRes, _bUserStyle) {
	
	$("#divAllLayerTree").jstree(	{
		"plugins" : [ "themes", "json_data", "ui", "cookies", "types","checkbox" , "dnd"],
		"themes" : { "theme" : "default" },
		"json_data" : fn_create_treeJson(null, true, false),
		"types" : {
			"valid_children" : [ "tmap" ],
			"types" : {
				"style" : {
					"valid_children" : "none"
				},
				"layer" : {
					"valid_children" : "style"
				},
				"group" : {
					"valid_children" : "layer"
				},
				"tmap" : {
					"valid_children" : [ "layer" ],
					"rename" : false,
					"start_drag" : false,
					"move_node" : false,
					"delete_node" : false,
					"remove" : false
				}
			}
		},
		"dnd" : {

		       "drop_finish" : function () { 

		            alert("DROP_L"); 

		        },

		        "drag_check" : function (data) {

		            alert("CHECK_L"); 

		            if(data.r.attr("id") == "phtml_1") {

		                return false;

		            }

		            return { 

		               after : false, 

		               before : false, 

		               inside : true 

		            };

		        },

		        "drag_finish" : function (data) { 

		            alert("DRAG OK_L"); 

		        }

		}
	}); 
	 
};

var fn_init_divSelLayerTree = function (_oRes, _bUserStyle) {
	
	$("#divSelLayerTree").jstree(	{
		"plugins" : [ "themes", "json_data", "ui", "cookies", "types","checkbox", "dnd" ],
		"themes" : { "theme" : "default" },
		"json_data" : fn_creategroup_treeJson(),
		"types" : {
			"valid_children" : [ "tmap" ],
			"types" : {
				"style" : {
					"valid_children" : "none"
				},
				"layer" : {
					"valid_children" : "style"
				},
				"group" : {
					"valid_children" : "layer"
				},
				"tmap" : {
					"valid_children" : [ "layer" ],
					"rename" : false,
					"start_drag" : false,
					"move_node" : false,
					"delete_node" : false,
					"remove" : false
				}
			}
		},
		"dnd" : {

		       "drop_finish" : function () { 

		            alert("DROP_R"); 

		        },

		        "drag_check" : function (data) {

		            alert("CHECK_R"); 

		            if(data.r.attr("id") == "phtml_1") {

		                return false;

		            }

		            return { 

		               after : false, 

		               before : false, 

		               inside : true 

		            };

		        },

		        "drag_finish" : function (data) { 

		            alert("DRAG OK_R"); 

		        }

		}
	}); 
	 
};
/**
* @memberof USV.MAP
* @method 
* @description 지도의 스타일(SLD)이 변경되었거나 레이어 on/off시 지도를 redraw처리함
* @author 임상수(2015.07.31)
*/
var fn_redraw_wms = function () {
	var sLayerOrder = CONFIG.fn_get_getMapInfo().layerOrder;
	/*var sThemeList = layerTool.getThemeShowList(sLayerOrder).join();*/
	var sThemeList = STYLE.fn_get_checkAllLayerNode();
	if(CONFIG.fn_get_gisEngineType() === "GeoServer")
		sThemeList = STYLE.fn_get_checkAllLayerNode(true);
	//add jykw 20160725 for geoserver	
	//var sStyleList = layerTool.getLayerShowList('asc').join();
	//change ggash 20121226 for geoserver 
	var sStyleList = STYLE.fn_get_checkAllLayerNode(true);
	
	var sDefaultThemeList = "EMPTY_LAYER";
	var sSldBody;
	
	if (!sThemeList && sThemeList.length <= 0) {
		sThemeList = ""; //sDefaultThemeList;
		sSldBody = null;
	} else {
		sSldBody = new XMLSerializer().serializeToString(layerTool.getSld_body(true));
	}
	var oWmsLayer = map.getLayerByName("wmsLayer");
	var oWmsOption = {
			layers : sThemeList,
			//change jykw 20160725 for geoserver			
			//styles : sThemeList,
			styles : sThemeList,
			sld_body : sSldBody
	};
	
	if(CONFIG.fn_get_gisEngineType() === "GeoServer") {
		delete oWmsOption.layers;
		oWmsOption.sld_body = '<?xml version="1.0" encoding="euc-kr"?>'  + sSldBody;
		oWmsOption.styles = sStyleList;
	}
	
	if (oWmsLayer) {
		oWmsLayer.mergeNewParams(oWmsOption);
	}
	else {
		alert('oWmsLayer is null --> mergeNewParams 수행실패');
	}
};

var fn_filter_serviceLayer = function(_aLayers, _bAlert){

	var aNotAllowdLayers = [];
	
	var oUserAuthor = COMMON.fn_get_userAuthorInfo(); 
	var sCurSystem = COMMON.fn_get_currentSystem();
	
	var sAccessibleLayers = oUserAuthor[sCurSystem].VIEW_LAYER.join(",");

	/*for(var item in _aLayers){ 
		if(sAccessibleLayers.indexOf(item) === -1){
			aNotAllowdLayers.push(item);
			delete _aLayers[item];
		} 
	}*/
	var oCloneLayers = COMMON.deepCloneObject(_aLayers); 
	var nCount = oCloneLayers.length;
	
	for(var i = 0; i < nCount; i++) {
		var sTableNm = oCloneLayers[i].table;
		var sLayerNm = oCloneLayers[i].alias;
		if(sAccessibleLayers.indexOf(sTableNm) === -1){
			aNotAllowdLayers.push(sLayerNm); 
		} 
	}
	
	var nNotAllowdCount = aNotAllowdLayers.length;
	
	if(nNotAllowdCount > 0){
		
		for(var i = 0; i < nNotAllowdCount; i ++){
			var sNotAllowdLayer = aNotAllowdLayers[i];
			for(var j in _aLayers) {
				if(_aLayers[j].alias === sNotAllowdLayer){
					_aLayers.splice(j,1);
					break;
				}
			}
			
		}
		if(_bAlert)
			COMMON.showMessage("서비스 레이어 제외 알림 &[" + aNotAllowdLayers.join(',') + "] 레이어에 대한 조회 권한이 없어 서비스 대상에서 제외처리 하였습니다.", 10000);
	}
	
	return _aLayers;
};
/**
* @memberof USV.MAP
* @method 
* @description  jstree에 트리데이터로 사용되는 json을 생성
* @author 임상수(2015.07.31)
* @param {Object} _oLayers 트리를 구성할 레이어 목록
*/
var fn_create_treeJson = function (_oLayers, _bRemove, _bStyle) {
	
	var oTmpLayerTool;
	
	if(_bRemove && orgLayerTool) //맵구성 시 좌측 레이어 트리 
		oTmpLayerTool = orgLayerTool;
	else	//맵관리의 레이어 목록 
		oTmpLayerTool = layerTool;
		
	var sSelectedId = oTmpLayerTool.getTMapId();
	/*if (_oLayers) {
		sSelectedId = baseTMapId;
		
	} else {
		sSelectedId = layerTool.getTMapId();
	}*/
	var oLayerGroups = oTmpLayerTool.getLayerGroups();
	var aLayerList;
	if (_oLayers && !_oLayers.namedLayers) {
		aLayerList = [];
		for ( var i in _oLayers) {
			if (_oLayers[i].tmapid == sSelectedId) {
				aLayerList.push(_oLayers[i]);
			}
		}
	} else {
		aLayerList = oTmpLayerTool.getLayers( {
			con : 'tmapid',
			conVal : sSelectedId,
			order : 'asc'
		});
	}

	aLayerList = fn_filter_serviceLayer(aLayerList, false); //조회 권한이 없는 레이어는 제외처리 
	
	var oSld = oTmpLayerTool.getSld();

	var oJsonData = {
		data : []
	};
	var oLayerInfo 		= COMMON.fn_get_layerTotInfoList();
	var oOrgLayerInfo 	= COMMON.fn_get_orgLayerTotInfoList();
	var oSelectedLayers = MAP.fn_get_treeSelectedLayers();
	
	var fn_check_include = function(_sAlias){
		
		for(var i in oSelectedLayers){
			if(oSelectedLayers[i].alias == _sAlias){
				return true;
				break;
			}
		}
	};
	
	for ( var i in oLayerGroups) {
	
		var oGroupObj = {
			data : {
				title : oLayerGroups[i].name,
				icon : "/images/usolver/com/map/icon/Icon_Group.png"
			},
			attr : {
				'rel' : "group",
				'class' : "group",
				'id' : "group_" + oLayerGroups[i].id,
				'state' : "closed"
			},
			
			children : []
		};

		for ( var j in aLayerList) {
			var bInclude = false;

			//debugger;
			
			if(_bRemove && fn_check_include(aLayerList[j].alias)){
				bInclude = true;
			}
			if (oLayerGroups[i].id == aLayerList[j].layerGroup && !bInclude) {
				var olayerInfo = {
					data : {
						title : aLayerList[j].alias,
						icon : "/images/usolver/com/tree/file.png"
					},
					attr : {
						'rel' : "layer",
						'class' : "layer",
						'id' : "layer_" + aLayerList[j].id,
						'seq' : aLayerList[j].seq,
						'show' : aLayerList[j].show,
						'layerGroup' : aLayerList[j].layerGroup
					},
					children : []
				};
				
				switch(eval(aLayerList[j].layerType)) {
					case 1 : 
						olayerInfo.data.icon = "/images/usolver/com/map/icon/Icon_Point.png";
						break;
					case 2 : 
						olayerInfo.data.icon = "/images/usolver/com/map/icon/Icon_Line.png";
						break;
					case 3 :
						olayerInfo.data.icon = "/images/usolver/com/map/icon/Icon_Area.png";
						break;
				}
				
				if (_bStyle) {
					for ( var k in oSld.namedLayers) {
						if (oSld.namedLayers[k].name == aLayerList[j].table) { // CJH 201703.28 for geoserver (theme - >table)
							var oUserStyles = oSld.namedLayers[k].userStyle;
							for ( var l in oUserStyles) {
								var oRules = oUserStyles[l].rules;
								for(var m in oRules) {
									
									var sIcon;
									if(oRules[m].symbolizer.text) {
										sIcon = "/images/usolver/com/tree/text.gif";
										
										var fileObj = {
											data : {
												title : oRules[m].name,
												icon : sIcon 
											},
											attr : {
												'rel' : "style",
												'class' : "style",
												'id' : "style_" + k + "_" + l + "_" + m + "_" + "text"
											}
										};
										olayerInfo.children.push(fileObj);
									}
									else {
										sIcon = "/images/usolver/com/map/blank.gif";
										
										var oFileInfo = {
											data : {
												title : oRules[m].name,
												icon : sIcon 
											},
											attr : {
												'rel' : "style",
												'class' : "style",
												'id' : "style_" + k + "_" + l + "_" + m + "_" + "symbol"
											}
										};
										olayerInfo.children.push(oFileInfo);
									}
								}
							}
						}
					}
				}
				oGroupObj.children.push(olayerInfo);
			}
		}

		//if (oGroupObj.children.length > 0)
		oJsonData.data.push(oGroupObj);
	}

	return oJsonData;
};


/**
* @memberof USV.MAP
* @method 
* @description  jstree에 트리데이터로 사용되는 json을 생성
* @author 최재훈(2016.08.12)
* @param {Object} _oLayers 트리를 구성할 레이어 목록
*/
var fn_creategroup_treeJson = function (_oLayers) {
	var sSelectedId = layerTool.getTMapId();
	/*if (_oLayers) {
		sSelectedId = baseTMapId;
		
	} else {
		sSelectedId = layerTool.getTMapId();
	}*/
	
	var oLayerGroups = layerTool.getLayerGroups();
	var aLayerList;
	if (_oLayers) {
		aLayerList = [];
		for ( var i in _oLayers) {
			if (_oLayers[i].tmapid == sSelectedId) {
				aLayerList.push(_oLayers[i]);
			}
		}
	} else {
		aLayerList = layerTool.getLayers( {
			con : 'tmapid',
			conVal : sSelectedId,
			order : 'asc'
		});
	}

	var oSld = layerTool.getSld();

	var oJsonData = {
		data : []
	};
	
	var oEditLayerInfo 		= COMMON.fn_get_editLayerInfo();
	var oOrgEditLayerInfo 	= COMMON.fn_get_orgEditLayerInfo();
	var oSelectedLayers 	= MAP.fn_get_treeSelectedLayers();
	

	oSelectedLayers = fn_filter_serviceLayer(oSelectedLayers, false); //조회 권한이 없는 레이어는 제외처리 
	
	for ( var i in oLayerGroups) {
		var sGroupName = oLayerGroups[i].name;
		
		var oGroupObj = {
			data : {
				title : sGroupName,
				icon : "/images/usolver/com/map/icon/Icon_Group.png"
			},
			attr : {
				'rel' : "group",
				'class' : "group",
				'id' : "group_" + oLayerGroups[i].id,
				'state' : "closed"
			},
			
			children : []
		}; 

		//if(oEditLayerInfo.length != oOrgEditLayerInfo.length ){
			
			for(var item in oSelectedLayers) {
				
				var sLayerEngNm = oSelectedLayers[item].table;
				var oLayerInfo 	= COMMON.fn_get_layerInfo(sLayerEngNm); 
				
				if(oLayerInfo.groupName == sGroupName) {

					var olayerInfo = {
							data : {
								title : oSelectedLayers[item].alias,
								icon : "/images/usolver/com/tree/file.png"
							},
							attr : {
								'rel' : "layer",
								'class' : "layer",
								'id' : "layer_" + oSelectedLayers[item].id,
								'seq' : oSelectedLayers[item].seq,
								'show' : oSelectedLayers[item].show,
								'layerGroup' : oSelectedLayers[item].layerGroup
							},
							children : []
					};
					
					switch(eval(oLayerInfo.layerType)) {
					case 1 : 
						olayerInfo.data.icon = "/images/usolver/com/map/icon/Icon_Point.png";
						break;
					case 2 : 
						olayerInfo.data.icon = "/images/usolver/com/map/icon/Icon_Line.png";
						break;
					case 3 :
						olayerInfo.data.icon = "/images/usolver/com/map/icon/Icon_Area.png";
						break;
					}
					
					oGroupObj.children.push(olayerInfo);
					
				}
					
			}
			
		//}
		
		oJsonData.data.push(oGroupObj);
	}

	return oJsonData;
};


/**
* @memberof USV.MAP
* @method 
* @description  맵 개체 생성
*/
var fn_create_map = function () {
	
	var oExtent = CONFIG.fn_get_getMapInfo().serviceExtent;
	var nMaxResolution = CONFIG.fn_get_getMapInfo().maxResolution;
	var nZoomLevels = CONFIG.fn_get_getMapInfo().zoomLevels;
	var aResolution = fn_get_resolution(nMaxResolution, nZoomLevels);
	var sDataHouseCrs =  CONFIG.fn_get_dataHouseCrs();
	var sRequestCrs =  CONFIG.fn_get_requestCrs();
	
	
	map = new NUTs.Maps.Map('map', {
		maxExtent :  oExtent,
		maxResolution: 156543.0339,
		minResolution: aResolution[aResolution.length-1],
		resolutions: aResolution,
        projection: new OpenLayers.Projection(sRequestCrs),
        displayProjection: new OpenLayers.Projection(sRequestCrs),
        units: "m",
        numZoomLevels: 19,
        autoUpdateSize : false,
        fractionalZoom : false,
        zoomMethod: null,
        eventListeners: {
            "moveend": fn_event_moveend
        }
	});
	
	if(bLogWrite) {
		fn_write_log("맵 초기 생성!");
		fn_write_log("create map : map extent = " + oExtent);
	}
	
	//index페이지의 대장 등에서 지도를 사용할 수 있도록....
	if(parent) {
		parent.map = map;
		parent.serviceUrl = CONFIG.fn_get_serviceUrl();
	}
};
/**
* @memberof USV.MAP
* @method 
* @description 레벨별 해상도 계산 후 리턴 
* @author 최재훈(2015.12.28)
* @param {Number} _nMaxResolution : 지도서비스 최대해상도
* @param {Number} _nZoomLevels : 지도서비스 레벨 수 
*/
var fn_get_resolution = function(_nMaxResolution, _nZoomLevels){
	var aRtnRes = [];
	var i, nRes;
	
	for(i = 0 ; i < _nZoomLevels; i++){
		nRes = _nMaxResolution / Math.pow(2,i);
		aRtnRes.push(nRes);
	}
	
	return aRtnRes;
};


/**
* @memberof USV.MAP
* @method 
* @description 맵의 현재 축척을 갱신하며 최대 서비스 가능한 레벨인지 여부 확인
* @author 임상수(2015.07.31)
*/
var fn_event_moveend = function (e) {
	$("#txtSacle").val((Math.round(map.getScale()*100)) / 100); 
	$("#scale_pointer").css("bottom", 94 / map.numZoomLevels * (map.getZoom()));
	
	var nZoom = map.getZoom() + 1;
	
	if(MAP.fn_get_naverMap()){
		if(MAP.fn_get_naverMap().isVisibility) {
			if(map.numZoomLevels == nZoom && MAP.fn_get_naverMap().isVisibility()) {
				map.setCenter(map.getCenter(), map.getZoom() - 1);
				alert('네이버 맵은 더 이상 확대할 수 없습니다.\n지도를 확대하려면 다음 맵을 선택해주세요.');
			}
		}
	}
	
	// [편집] 시설물 생성(좌표)의 좌표값 자동 설정 - ehyun 2016.05.25	
	$('#txtCoordX').val(map.getCenter().lon);
	$('#txtCoordY').val(map.getCenter().lat);
};

/**
* @memberof USV.MAP
* @method 
* @description WMS Layer 생성
*  		  최재훈(2015.12.28) : 주요 서비스 항목 CONFIG.js에 정의 
*  		  최재훈(2017.03.16) : GeoServer sld적용 위한 조치 
* @author 임상수(2015.07.31)
*/
var fn_init_wms = function () {
	debugger;
	var sLayerOrder = CONFIG.fn_get_getMapInfo().layerOrder;
	var sGetMapImageFormat = CONFIG.fn_get_getMapInfo().imageFormat;
	var sGetMapVersion = CONFIG.fn_get_getMapInfo().version;
	var sDataHouseCrs = CONFIG.fn_get_dataHouseCrs();
	var sRequestCrs = CONFIG.fn_get_requestCrs();
	
	//var sThemeList = layerTool.getThemeShowList(sLayerOrder).join();
	var sThemeList = layerTool.getLayerShowList(sLayerOrder).join();
	 
	//if(CONFIG.fn_get_gisEngineType() === "GeoServer")
	//	sThemeList = "TL_SGG,TL_ROAD";
	 
	var sDefaultThemeList = "EMPTY_LAYER";
	var sSldBody;
	//debugger;
	if (!sThemeList && sThemeList.length <= 0) {
		sThemeList = ""; //sDefaultThemeList;
		sSldBody = null;
	} else {
		sSldBody = new XMLSerializer().serializeToString(layerTool.getSld_body());
	}
	/*
	var oTmpWmsOption = {
			layers : sDefaultThemeList,			
			styles : "",
			
			format : sGetMapImageFormat,
			version : sGetMapVersion,
			CRS : new OpenLayers.Projection(sRequestCrs),
			transparent : true,
			//sld_body : sSldBody,
			dataHouse : CONFIG.fn_get_dataHouseName()
	};
	
	if(CONFIG.fn_get_gisEngineType() === "GeoServer") {
		delete oTmpWmsOption.layers;
		if(sSldBody)
			oTmpWmsOption.sld_body = '<?xml version="1.0" encoding="euc-kr"?>'  + sSldBody;
		oTmpWmsOption.yx = {'EPSG:900913' : true};
		oTmpWmsOption.styles = STYLE.fn_get_checkAllLayerNode(true); 
	}

	
	var oTmpWmsLayer = new NUTs.Layer.WMS("wmsLayer1", CONFIG.fn_get_serviceUrl(), 
		oTmpWmsOption,{
		isBaseLayer : true,
		singleTile : true,
		transitionEffect : 'resize',
		tileOptions: {maxGetUrlLength: 2048},
		projection : new OpenLayers.Projection(sDataHouseCrs)
	});
	
	map.addLayer(oTmpWmsLayer);*/
	
	
	var oWmsOption = {
			layers : sThemeList,
			//change jykw 20160725 for geoserver		
			//styles : layerTool.getThemeShowList(sLayerOrder).join(),
			//styles : layerTool.getLayerShowList(sLayerOrder).join(),
			//change ggash 20161226 for geoserver 
			styles : sThemeList,
			
			format : sGetMapImageFormat,
			version : sGetMapVersion,
			CRS : new OpenLayers.Projection(sRequestCrs),
			transparent : true,
			sld_body : sSldBody,
			dataHouse : CONFIG.fn_get_dataHouseName()
	};
	
	if(CONFIG.fn_get_gisEngineType() === "GeoServer") {
		delete oWmsOption.layers;
		if(sSldBody)
			oWmsOption.sld_body = '<?xml version="1.0" encoding="euc-kr"?>'  + sSldBody;
		oWmsOption.yx = {'EPSG:5181' : true};
		//oWmsOption.styles = STYLE.fn_get_checkAllLayerNode(true); 
	}

	
	var oWmsLayer = new NUTs.Layer.WMS("wmsLayer", CONFIG.fn_get_serviceUrl(), 
		oWmsOption,{
		isBaseLayer : true,
		singleTile : true,
		transitionEffect : 'resize',
		tileOptions: {maxGetUrlLength: 2048},
		projection : new OpenLayers.Projection(sDataHouseCrs)
	});
	
	map.addLayer(oWmsLayer);
	
	oWmsLayer.events.register("loadend", oWmsLayer, fn_bind_fullLegendGraphic);        
	
	if(bLogWrite) {
		fn_write_log("NUTs.Layer.WMS 레이어 생성!!  name = " + oWmsLayer.name);
		fn_write_log("layers = : " + layerTool.getThemeShowList(sLayerOrder).join());
	}
};

/**
* @memberof USV.MAP
* @method 
* @description 현재 표출되고 있는 레이어의 범례 조회
* @author 임상수(2015.07.31)
*/
var fn_bind_currentLegendGraphic = function (e) {
	var sSldBody = layerTool.getSld_body(true);
	NUTs.WMS.parseGetStyles(sSldBody, function(_oLayers){
		$("#legendGraphic").empty();
		
		for(var i = 0, i_len = _oLayers.namedLayers.length; i < i_len; i++) {
			var oUserStyles = _oLayers.namedLayers[i].userStyle;
			
			for(var j = 0, j_len = oUserStyles.length; j < j_len; j++) {
				var oRules = oUserStyles[j].rules;
				
				for(var k = 0, k_len = oRules.length; k < k_len; k++) {
					var oSymbolizer = oRules[k].symbolizer;
					var sImgUrl;
					
					var nScale = parseInt(map.getScale());
					var nMaxScale = oRules[k].maxScale;
					if(nMaxScale == 0) {
						nMaxScale = parseInt(OpenLayers.Util.getScaleFromResolution(map.getResolutionForZoom(0), map.units));
					}
					
					if(nMaxScale >= nScale && nScale >= oRules[k].minScale) {
						if(oSymbolizer["point"]) {
							sImgUrl = NUTs.WMS.getLengendGraphic(CONFIG.fn_get_serviceUrl(), {
								layer : _oLayers.namedLayers[i].name,
								style : _oLayers.namedLayers[i].userStyle[j].name,
								rule : _oLayers.namedLayers[i].userStyle[j].rules[k].name
							});
							
							var oImgContainer = $('<div />').css({
								"margin" : 5
							}).appendTo("#legendGraphic");
							
							$('<img />',{
								'class' : 'current-legendGraphic',
								'src' : sImgUrl
							}).css({
								"margin" : 5
							}).appendTo(oImgContainer);
							
							oImgContainer.append(_oLayers.namedLayers[i].userStyle[j].rules[k].name);
						} else {
							var oTmpSymbolizer = {
									width : 16,
									height : 16
							};
							if(oSymbolizer["polygon"]) {
								if(oSymbolizer["polygon"].externalGraphic){
									sImgUrl = "/gmap/getImageFromBase64.do?encodeImg="+encodeURIComponent(oSymbolizer["polygon"].externalGraphic);
								} else {
									oTmpSymbolizer.strFillColor = oSymbolizer["polygon"].fillColor.replace("#", "");
									if(oSymbolizer["line"]) {
										if(oSymbolizer["line"].stroke){
											oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
										}
										else{
											oTmpSymbolizer.strColor = "ffffff";
										}
										
									}
									sImgUrl = "/gmap/getPolygonSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
								}
							} else if(oSymbolizer["line"]) {
								if(oSymbolizer["line"]["arrow"]) {
									oTmpSymbolizer.arrow = 1;
								}
								if(oSymbolizer["line"]["marker"]) {
									oTmpSymbolizer.marker = 1;
								}
								if(oSymbolizer["line"].stroke){
									oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
								}
								else{
									oTmpSymbolizer.strColor = "ffffff";
								}
								sImgUrl = "/gmap/getLineSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
							} else {
								sImgUrl = "/images/usolver/com/tree/text.gif";
							}
							var oImgContainer = $('<div />').css({
								"margin" : 5
							}).appendTo("#legendGraphic");
							
							$('<img />',{
								'class' : 'current-legendGraphic',
								'src' : sImgUrl
							}).css({
								"margin" : 5
							}).appendTo(oImgContainer);
							
							oImgContainer.append(_oLayers.namedLayers[i].userStyle[j].rules[k].name);
						}
					}
				}
			}
		}
	});
};

/**
* @memberof USV.MAP
* @method 
* @description 전체 레이어의 범례 조회
* @author 임상수(2015.07.31)
*/
var fn_bind_fullLegendGraphic = function (e){
	var sSldBody = layerTool.getSld_body(true);
	NUTs.WMS.parseGetStyles(sSldBody, function(_oLayers){
		$("#legendGraphic").empty();
		
		for(var i = 0, i_len = _oLayers.namedLayers.length; i < i_len; i++) {
			var oUserStyles = _oLayers.namedLayers[i].userStyle;
			
			for(var j = 0, j_len = oUserStyles.length; j < j_len; j++) {
				var oRules = oUserStyles[j].rules;
				
				for(var k = 0, k_len = oRules.length; k < k_len; k++) {
					var oSymbolizer = oRules[k].symbolizer;
					var sImgUrl;
					
					if(oSymbolizer["point"]) {
						sImgUrl = NUTs.WMS.getLengendGraphic(CONFIG.fn_get_serviceUrl(), {
							layer : _oLayers.namedLayers[i].name,
							style : _oLayers.namedLayers[i].userStyle[j].name,
							rule : _oLayers.namedLayers[i].userStyle[j].rules[k].name
						});
						
						var oImgContainer = $('<div />').css({
							"margin" : 3
						}).appendTo("#legendGraphic");
						
						$('<img />',{
							'class' : 'current-legendGraphic',
							'src' : sImgUrl
						}).css({
							"margin" : 3
						}).appendTo(oImgContainer);
						
						oImgContainer.append(_oLayers.namedLayers[i].userStyle[j].rules[k].name);
					} else {
						var oTmpSymbolizer = {
								width : 16,
								height : 16
						};
						if(oSymbolizer["polygon"]) {
							if(oSymbolizer["polygon"].externalGraphic){
								sImgUrl = "/gmap/getImageFromBase64.do?encodeImg="+encodeURIComponent(oSymbolizer["polygon"].externalGraphic);
							} else {
								
								if(oSymbolizer["polygon"].fillColor){
									oTmpSymbolizer.strFillColor = oSymbolizer["polygon"].fillColor.replace("#", "");
									if(oSymbolizer["line"]) {
										if(oSymbolizer["line"].stroke){
											oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
										}
										else{
											oTmpSymbolizer.strColor = "ffffff";
										}
										
									}
									sImgUrl = "/gmap/getPolygonSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
								}
								
							}
						} else if(oSymbolizer["line"]) {
							if(oSymbolizer["line"]["arrow"]) {
								oTmpSymbolizer.arrow = 1;
							}
							if(oSymbolizer["line"]["marker"]) {
								oTmpSymbolizer.marker = 1;
							}
							if(oSymbolizer["line"].stroke){
								oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
							}
							else{
								oTmpSymbolizer.strColor = "ffffff";
							}
							sImgUrl = "/gmap/getLineSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
						} else {
							sImgUrl = "/images/usolver/com/tree/text.gif";
						}
						var oImgContainer = $('<div />').css({
							"margin" : 3
						}).appendTo("#legendGraphic");
						
						$('<img />',{
							'class' : 'current-legendGraphic',
							'src' : sImgUrl
						}).css({
							"margin" : 3
						}).appendTo(oImgContainer);
						
						oImgContainer.append(_oLayers.namedLayers[i].userStyle[j].rules[k].name);
					}
				}
			}
		}
	});
};

/**
* @memberof USV.MAP
* @method 
* @description 맵 초기 로딩시 맵 이동 영역
* 					사용자의 최종 맵 조회 영역으로 이동 ->없으면, 사용자 지정영역(즐겨찾기)으로 이동 ->없다면, 시스템 지정영역(initExtent)으로 이동 처리
* 2016.10.05 ehyun : 맵 로딩 시 최초 이동 영역을 사용자의 최종 맵 조회 영역으로 이동 하도록 추가
* @author 임상수(2015.07.31)
*/
var fn_move_map = function (_sUserId, _sInitExtent) {
	if(_sInitExtent){
		var sInitExtent = COMMON.htmlEnDeCode.htmlDecode(_sInitExtent);
		var oExtent = JSON.parse(sInitExtent);
		var initExtent = new NUTs.Bounds(oExtent.left, oExtent.bottom, oExtent.right, oExtent.top);	
		map.zoomToExtent(initExtent);
	}	
	else{
		var oExtent = MAP.fn_search_favExtent(_sUserId);
		if (!oExtent) {
			oExtent = CONFIG.fn_get_getMapInfo().initExtent;
		}
		map.zoomToExtent(oExtent);	
	}	
}

var fn_set_layerTree = function(){
	
	var sXmlChar = $("#divSelLayerTree").jstree("get_xml");

	var oContainer = $.jstree._reference("#divSelLayerTree").get_container();
    
    var oAllChildren = oContainer.find("li[id*='layer']");
    var aSelectedLayers = [];
    var aRefAddedLayer = [];
    
    var fn_check_include = function(_sLayer){
    	for(var i in aSelectedLayers){
    		if( aSelectedLayers[i].table.toLowerCase() == _sLayer.toLowerCase() ){
    			return true;
    			break;
    		}
    	}
    };
    
    $.each(oAllChildren, function(idx, val){
    	var sLayerName = COMMON.trim(val.innerText);
    	var sTableName = COMMON.fn_get_EditEngLayerNm(sLayerName);

        var oTotLayerInfo = COMMON.fn_get_layerTotInfoList();
    	var aRefLayerList;   
    	//선택된 레이어 추가
    	if(sTableName && oTotLayerInfo[sTableName] &&!fn_check_include(sTableName))
    		aSelectedLayers.push(oTotLayerInfo[sTableName]);
    	
    	//(편집을 위해..)참조레이어도 포함 
    	if(!oTotLayerInfo[sTableName])
    		oTotLayerInfo[sTableName] = COMMON.fn_get_orgLayerTotInfoList()[sTableName];
    		
    	aRefLayerList = oTotLayerInfo[sTableName].refLayerList;
    	
    	if(!aRefLayerList){
    		
    		$.ajax({
    			type: 'post',
    			dataType: 'json',
    			async: false,
    			data: {
    				selEditLayerValue : sTableName
    			},
    			url: '/getEditMng.do',
    			success: function(_oRes) {
    				var nResultLen = _oRes.result_refLyr.length; 
    				
    				if(nResultLen > 0){

    					for(var i=0; i < nResultLen; i++){

    						var sRrefEngLayer 	= _oRes.result_refLyr[i].REFLYR_ENG_NM;
    						if(sRrefEngLayer && oTotLayerInfo[sRrefEngLayer] && !fn_check_include(sRrefEngLayer)){
					    		aSelectedLayers.push(oTotLayerInfo[sRrefEngLayer]);
					    		aRefAddedLayer.push(_oRes.result_refLyr[i].REFLYR_KOREAN_NM);
    						}
    					}

    				}
    			},
    			error: function(xhr, status, error) {
    				COMMON.showMessage('레이어 추가/삭제 오류 & 참조레이어 추출 중 오류 ' + error);
    			}
    		});
    	}
    	
    });
    
    if(aSelectedLayers.length > 0){
    	MAP.fn_init_divLayerTree(aSelectedLayers, true);
    	MAP.fn_set_treeSelectedLayers(aSelectedLayers);    	
    }
    
	MAP.fn_set_editLayerInfoList(aSelectedLayers);	//편집가능한 레이어목록 변경처리
	STYLE.fn_init_editLayerList(COMMON.fn_get_editLayerInfo(), true);//편집시설물 선택 초기화
	
	if(aRefAddedLayer.length > 0){
		//COMMON.showMessage("레이어 자동 추가 알림 & 원활한 편집을 위해 참조관계에 있는 레이어[</br>"+aRefAddedLayer.join(', ')+"</br>]가 자동 추가되었습니다.", 4000);
		COMMON.showMessage("레이어 자동 추가 알림 & 원활한 편집을 위해 참조관계에 있는 레이어가</br>["+aRefAddedLayer.join(', ')+"]</br>자동 추가되거나 제외 처리되지 않았습니다.", 4000);
	}
	
	$("#layerAddRemovePane").hide();
	
};
/**
* @memberof USV.MAP
* @method 
* @description 개발진행 간 정보 확인을 위한 로그를 (HTML ELEMENT id가 "map_log" 부분에) 기록한다.
* @author 임상수(2015.07.31)
* @param {String} _sMsg : 보여줄 메시지
*/
var fn_write_log = function (_sMsg) {
	if(_sMsg) {
		var dNow = new Date();
		var dTime = dNow.getHours() + "시 " + dNow.getMinutes() + "분 " + dNow.getSeconds() + "초 ";
		$("#map_log").append(dTime + " : "  + arguments.callee.caller.name + "() -> '" + _sMsg + "'<br />");
	}
};

/**
* @memberof USV.MAP
* @method 
* @description 배경 지도 이미지를 생성하는 함수
* @author 이상호(2015.10.12)
* @return {Object} data : 배경지도의 데이터 (다음 : static map url, 네이버 : 타일맵 url)
*/
var fn_encoding_map = function() {
	var sTileMapUrl,data;
	var sMashupType = $('input[name="mashupType"]:checked').val();
	if(sMashupType == 'daum') {
		var oTempDiv = document.createElement("div");
		oTempDiv.style.visibility = "hidden";
		oTempDiv.style.height = $(map.div).height() + "px";
		oTempDiv.style.width = $(map.div).width() + "px";
		
		var oTempMap = MAP.fn_get_daumMap().getStaticMap(oTempDiv);
		sTileMapUrl = $(oTempDiv).find("img").attr("src");
		sTileMapUrl = sTileMapUrl.replace("IW=0","IW="+$(map.div).width());
		sTileMapUrl = sTileMapUrl.replace("IH=0","IH="+$(map.div).height());
		$(oTempMap).remove();
		data = saveTool.getXML({type:sMashupType,url:sTileMapUrl});
	} else if (sMashupType == 'naver') {
		var oNameMap = MAP.fn_get_naverMap();
		var aNaverTileUrl = [];
		var aNaverTileImg = $('#naverMap div').eq(0).find('div').eq(0).find('img');
		var sInitUrl = aNaverTileImg.eq(0).attr('src');
		var aInitCoordinate = sInitUrl.split('/')[9].split('.')[0].split('-');
		var nMinX,nMaxX,nMinY,nMaxY;
		nMinX = aInitCoordinate[0],nMaxX = aInitCoordinate[0], nMinY = aInitCoordinate[1], nMaxY = aInitCoordinate[1];
		for(var i=0,len=aNaverTileImg.length;i<len;i++) {
			var sUrl = aNaverTileImg.eq(i).attr('src');
			var aCoordinate = sUrl.split('/')[9].split('.')[0].split('-');
			if(nMinX > aCoordinate[0])	nMinX = aCoordinate[0];
			if(nMaxX < aCoordinate[0])	nMaxX = aCoordinate[0];
			if(nMinY > aCoordinate[1])	nMinY = aCoordinate[1];
			if(nMaxY < aCoordinate[1])	nMaxY = aCoordinate[1];
		}
		data = saveTool.getXML({
			type:sMashupType,
			url:sInitUrl.replace(sInitUrl.split('/')[9],""),
			minX:nMinX,
			maxX:nMaxX,
			minY:nMinY,
			maxY:nMaxY,
			});
	}
	return data;
};

/**
* @memberof USV.MAP
* @method 
* @description 지도 이미지를 생성하는 함수
* @author 이상호(2015.10.12)
*/
var fn_create_mapImage = function() {
	$("#datas").val(encodeURIComponent(fn_encoding_map()));
	$("#printForm").submit();
	
	return false;
};

/**
* @memberof USV.MAP
* @method 
* @description 지도 이미지를 base64로 리턴해주는 함수
* @author 이상호(2015.10.12)
* @param {Function} _fCallback : 콜백함수
* @param {Number} _nWidth : 리사이즈시 가로 크기
* @param {Number} _nHeight : 리사이즈시 세로 크기
*/
var fn_create_mapBase64Image = function(_fCallback,_nWidth,_nHeight) {
	$.ajax({
		type: 'post',
		dataType: 'json',
		data: {datas:encodeURIComponent(fn_encoding_map()),width:_nWidth,height:_nHeight},
		url: "/map/saveImageToView.do",
		async: false,
		success: function(_oRes) {
			if(typeof _fCallback == 'function') {
				_fCallback(_oRes.base64);
			}
		}
	});
};

/**
* @memberof USV.MAP
* @method 
* @description 사용자 레이어 순서 관리 함수
* @author 이상호(2015.10.12)
* @param {String} _sMove : 레이어 이동 방식
* @param {String} _sUserId : 유저 아이디
*/
var fn_move_layerTree = function(_sMove,_sUserId) {
	var oSelectedNode = $("#divLayerTree").jstree("get_selected");
	if(oSelectedNode.hasClass("layer")) {
		var aChangeLayers = [];
		var oSelectParentUlNode = oSelectedNode.closest("ul");
		switch(_sMove) {
		case 'up':
			var sIndex = oSelectedNode.index();
			var sSeq = oSelectedNode.attr('seq');
			var aSelectliNodes = oSelectParentUlNode.find(".layer");
			var sFirstSeq = aSelectliNodes.eq(0).attr('seq');
			for (var i=0;i<sIndex;i++) {
				var oSelectliNodes = aSelectliNodes.eq(i);
				var sSelectSeq = oSelectliNodes.attr('seq');
				
				oSelectliNodes.attr('seq',parseInt(sSelectSeq)+1);
				var oChangeLayer = {};
				oChangeLayer.LYR_ID = oSelectliNodes.attr('id').split("_")[1];
				oChangeLayer.LYR_ORDER = oSelectliNodes.attr('seq');
				aChangeLayers.push(oChangeLayer);
			}
			oSelectedNode.attr('seq',sFirstSeq);
			var oChangeLayer = {};
			oChangeLayer.LYR_ID = oSelectedNode.attr('id').split("_")[1];
			oChangeLayer.LYR_ORDER = oSelectedNode.attr('seq');
			aChangeLayers.push(oChangeLayer);
			oSelectParentUlNode.prepend(oSelectedNode);
			break;
		case 'down':
			var sIndex = oSelectedNode.index();
			var sSeq = oSelectedNode.attr('seq');
			var aSelectliNodes = oSelectParentUlNode.find(".layer");
			var sLastSeq = aSelectliNodes.eq(aSelectliNodes.length-1).attr('seq');
			for (var i=sIndex+1;i<aSelectliNodes.length;i++) {
				var oSelectliNodes = aSelectliNodes.eq(i);
				var sSelectSeq = oSelectliNodes.attr('seq');
				
				oSelectliNodes.attr('seq',parseInt(sSelectSeq)-1);
				var oChangeLayer = {};
				oChangeLayer.LYR_ID = oSelectliNodes.attr('id').split("_")[1];
				oChangeLayer.LYR_ORDER = oSelectliNodes.attr('seq');
				aChangeLayers.push(oChangeLayer);
			}
			oSelectedNode.attr('seq',sLastSeq);
			var oChangeLayer = {};
			oChangeLayer.LYR_ID = oSelectedNode.attr('id').split("_")[1];
			oChangeLayer.LYR_ORDER = oSelectedNode.attr('seq');
			aChangeLayers.push(oChangeLayer);
			oSelectParentUlNode.append(oSelectedNode);
			break;
		case 'up1':
			var sPrevSeq = oSelectedNode.prev().attr('seq');
			var sSeq = oSelectedNode.attr('seq');
			oSelectedNode.prev().attr('seq',sSeq);
			oSelectedNode.attr('seq',sPrevSeq);
			oSelectedNode.prev().before(oSelectedNode);
			var oChangeLayer = {};
			oChangeLayer.LYR_ID = oSelectedNode.next().attr('id').split("_")[1];
			oChangeLayer.LYR_ORDER = oSelectedNode.next().attr('seq');
			aChangeLayers.push(oChangeLayer);
			var oChangeLayer = {};
			oChangeLayer.LYR_ID = oSelectedNode.attr('id').split("_")[1];
			oChangeLayer.LYR_ORDER = oSelectedNode.attr('seq');
			aChangeLayers.push(oChangeLayer);
			break;
		case 'down1':
			var sNextSeq = oSelectedNode.next().attr('seq');
			var sSeq = oSelectedNode.attr('seq');
			oSelectedNode.next().attr('seq',sSeq);
			oSelectedNode.attr('seq',sNextSeq);
			oSelectedNode.next().after(oSelectedNode);
			var oChangeLayer = {};
			oChangeLayer.LYR_ID = oSelectedNode.prev().attr('id').split("_")[1];
			oChangeLayer.LYR_ORDER = oSelectedNode.prev().attr('seq');
			aChangeLayers.push(oChangeLayer);
			var oChangeLayer = {};
			oChangeLayer.LYR_ID = oSelectedNode.attr('id').split("_")[1];
			oChangeLayer.LYR_ORDER = oSelectedNode.attr('seq');
			aChangeLayers.push(oChangeLayer);
			break;
		}
		
		fn_save_layerTree(aChangeLayers,_sUserId);
	}
};

/**
* @memberof USV.MAP
* @method 
* @description 사용자 레이어 순서 저장 함수
* @author 이상호(2015.10.12)
* @param {Array} _aChangeLayers : 변환된 레이어 배열
* @param {String} _sUserId : 유저 아이디
*/
var fn_save_layerTree = function(_aChangeLayers,_sUserId) {
	for(var i in _aChangeLayers) {
		_aChangeLayers[i].USER_ID = _sUserId;
	}
	$.ajax({
		type: 'post',
		data: {data:JSON.stringify(_aChangeLayers)},
		url: '/mergeUserLayerOrder.do'
	});
};

/**
* @memberof USV.MAP
* @method 
* @description 사용자 레이어 순서 로드 함수
* @author 이상호(2015.10.12)
* @param {String} _sUserId : 유저 아이디
*/
var fn_load_layerTree = function(_sUserId) {
	$.ajax({
		type: 'post',
		dataType: 'json',
		data: {userId:_sUserId},
		url: '/getUserLayerOrder.do',
		async: false,
		success: function(_oRes) {
			var aLayerOrder = _oRes.layerList;
			for(var i in aLayerOrder) {
				var oLayerOrder = aLayerOrder[i];
				layerTool.setLayerAttr({
					con : "id",
					conVal : oLayerOrder.id,
					attr : "seq",
					value : oLayerOrder.seq
				});
			}
		}
	});
};


var fn_check_userAuthor = function(_sAuthor){
	var oUserAuthor = COMMON.fn_get_userAuthorInfo(); 
	var sCurSystem = COMMON.fn_get_currentSystem();
	
	var sCurSystemName;
	
	switch (sCurSystem){
		case "WTL" :
			sCurSystemName = "상수";
			break;
		case "SWL" :
			sCurSystemName = "하수";
			break;
		case "RDL" :
			sCurSystemName = "도로";
			break;
		 
	}
	
	if(sCurSystem && oUserAuthor) {

		if(_sAuthor == "print") {
			if(oUserAuthor[sCurSystem].PRINT == "Y")
				return true;
			else{
				COMMON.showMessage("권한 오류 &사용중인 [ "+ sCurSystemName + "]시스템에 대한 지도 저장 또는 출력 권한이 없습니다\n필요 시 관리자에게 승인 요청 후 사용하세요", 4000);
				return false;
			}
		}
		else if(_sAuthor == "edit") {
			if(oUserAuthor[sCurSystem].EDIT == "Y")
				return true;
			else{
				COMMON.showMessage("권한 오류 &사용중인 [ "+ sCurSystemName + "]시스템에 대한 지도 편집 권한이 없습니다\n필요 시 관리자에게 승인 요청 후 사용하세요", 4000);
				return false;
			}
		}
		else {
			COMMON.showMessage("권한 체크 오류 &체크 항목 없음", 4000);
			return false;
		} 
	}
	else {
		COMMON.showMessage("권한 체크 오류 &시스템 구분 정보 추출 실패", 4000);
		return false;
	} 
};

/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도(다음 맵) 리턴
 * @author 임상수(2015.07.31)
 * @returns {String} 배경지도(다음 맵)
 */
var fn_get_daumMap = function() {
	return daumMap;
};

/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도(네이버 맵) 리턴
 * @author 임상수(2015.07.31)
 * @returns {String} 배경지도(네이버 맵)
 */
var fn_get_naverMap = function() {
	return naverMap;
};

var fn_get_selSubjectGroup = function() {
	return selectedSubjectGroup;
};

var fn_set_selSubjectGroup = function(_sGroup) {
	selectedSubjectGroup = _sGroup;
}
/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 초기화
 * @author 최재훈(2016.02.17)
 */



/*var fn_add_imajnetLayer = function() {
	var tmsLayer = new OpenLayers.Layer.TMS("Imajnet",
			"http://example.com/", {
				'type' : 'png',
				'getURL' : get_imajnet_tile_url,
				'isBaseLayer' : false
			});

	map.addLayers([ tmsLayer ]);
	
	return tmsLayer;
};*/

/**
 * @memberof USV.MAP
 * @method
 * @description 횡단면도 초기화
 * @author 최재훈(2016.02.17)
 */
var fn_init_acssService = function() {
	//oAcss.init();
}

/**
 * @memberof USV.MAP
 * @method
 * @description 차단제수변 초기화
 * @author 윤은희(2016.09.20)
 */
var fn_init_alisService = function() {
	//oAlis.init();
}

/**
 * @memberof USV.MAP
 * @method
 * @description 지오코딩에 사용될 벡터레이어를 추가하고 FeaturePopup 컨트롤러 등록
 * @author 임상수(2015.10.06)
 */
var fn_init_geocoding = function() {
	var oDefaultStyle = new OpenLayers.Style({
		graphicWidth : '25',
		graphicHeight : '25',
		externalGraphic : COMMON.fn_get_pageContext()
				+ '/images/usolver/com/map/icon/pothole.png'
	}, {
		rules : [ new OpenLayers.Rule({
			maxScaleDenominator : 25000,
			minScaleDenominator : 500,
			symbolizer : {
				label : '${label}',
				fontColor : 'black',
				fontSize : '12px',
				fontWeight : "bold",
				labelAlign : "cb",
				labelYOffset : '${labelYOffset}',
				labelOutlineColor : "white",
				labelOutlineWidth : 2,
			}
		}), new OpenLayers.Rule({
			minScaleDenominator : 6000000,
			minScaleDenominator : 25000
		}) ]
	});

	var oSelectStyle = new OpenLayers.Style({
		cursor : "pointer",
		graphicWidth : '55',
		graphicHeight : '55',
	});

	var oVectorLayer = new NUTs.Layer.Vector("Geocoding Layer", {
		styleMap : new OpenLayers.StyleMap({
			'default' : oDefaultStyle,
			'select' : oSelectStyle
		})
	});

	/*
	 * vectorLayer.events.register('beforefeatureadded', vectorLayer,
	 * function(e){ if(e.feature.geometry.CLASS_NAME ==
	 * "OpenLayers.Geometry.Point") { var circle =
	 * OpenLayers.Geometry.Polygon.createRegularPolygon(e.feature.geometry,10,100,90,
	 * 100); var style = { strokeWidth: 2, strokeOpacity: 1, strokeColor:
	 * '#666666', strokeDashstyle: 'solid', fillColor: 'white', fillOpacity:
	 * 0.5 };
	 * 
	 * var featurecircle = new OpenLayers.Feature.Vector(circle, null,
	 * style) ; this.addFeatures(featurecircle); } });
	 */

	var oFeaturePopupControl = new OpenLayers.Control.FeaturePopups(
			{
				id : 'excelSelectFeature',
				boxSelectionOptions : {},
				layers : [ [
						oVectorLayer,
						{
							templates : {
								hover : '<h4>관리번호 : ${.bld_nam}</h4>',
								single : '<div><h4>${.label} ${.fac_num}-${.fad_num}</h4><h4>관리번호 : ${.bld_nam}</h4><h4>${.startTime}</h4><h4>${.endTime}</h4></div><div><img src="'
										+ COMMON.fn_get_pageContext()
										+ '${.image}" width="300px" height="300px"></div>'
							},
							popupOptions : {
								single : {
									popupClass : OpenLayers.Popup.AnchoredBubble,
								}
							}
						} ] ]
			});

	map.addLayer(oVectorLayer);
	map.addControl(oFeaturePopupControl);

	$('#geocodingForm')
			.fileupload(
					{
						dropZone : $('body'),
						dataType : 'json',
						add : function(e, _oData) {
							var sFileName = _oData.files[0].name;

							var sExt = sFileName.substring(sFileName
									.lastIndexOf('.') + 1);

							if (!(/xlsx|xls/i).test(sExt)) {
								return;
							}

							_oData
									.submit()
									.success(
											function(_oRes, _sStatus,
													_oJqXHR) {
												var oExcelDatas = _oRes.result;
												if (oExcelDatas.length > 0) {
													var oLayer = map
															.getLayerByName('Geocoding Layer');
													oLayer
															.removeAllFeatures();

													var oControl = map
															.getControl('excelSelectFeature');
													oControl.activate();

													for ( var i = 0, len = oExcelDatas.length; i < len; i++) {
														var bjd_nam = oExcelDatas[i]['BJD_NAM']
																|| '';
														var bld_nam = oExcelDatas[i]['BLD_NAM']
																|| '';
														var fac_num = Math
																.round(oExcelDatas[i]['FAC_NUM'])
																|| '';
														var fad_num = Math
																.round(oExcelDatas[i]['FAD_NUM']) || 0;
														var image = oExcelDatas[i]['IMAGE']
																|| '';
														var time = oExcelDatas[i]['SBA_NAM']
																.split(",")
																|| '';
														var startTime = time[0];
														var endTime = time[1];

														// var definition =
														// '';

														var point = new OpenLayers.Geometry.Point(
																oExcelDatas[i]['x'],
																oExcelDatas[i]['y']);
														var feature = new OpenLayers.Feature.Vector(
																point,
																{
																	label : bjd_nam,
																	bld_nam : bld_nam,
																	fac_num : fac_num,
																	fad_num : fad_num,
																	image : image,
																	startTime : startTime,
																	endTime : endTime,

																	fillColor : oExcelDatas[i]['COLORNAME'],
																	pointRadius : oExcelDatas[i]['MARKERSIZE'],
																	labelYOffset : -20
																});

														oLayer
																.addFeatures(feature);
													}
												}
											});
						},
						fail : function(e, data) {
							alert('서버와의 통신에 실패하였습니다. 다시 시도해주세요.');
							return;
						}
					});
}

/**
 * @memberof USV.MAP
 * @method
 * @description 다음 지도 생성
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oMap : map 개체
 */
var fn_create_daumMap = function(_oMap) {

	daumMap = new NUTs.Mashup.DaumMap("daumMap", {
		oMap : _oMap,
		center : _oMap.getCenter(),
		zoom : _oMap.getZoom()
	});

	daumMap.setRoadView(new NUTs.Mashup.DaumMap.RoadView("roadView"));
};

/**
 * @memberof USV.MAP
 * @method
 * @description 네이버 지도 생성
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oMap : map 개체
 */
var fn_create_naverMap = function(_oMap) {

	naverMap = new NUTs.Mashup.NaverMap("naverMap", {
		oMap : _oMap,
		center : _oMap.getCenter(),
		zoom : _oMap.getZoom()
	});

	naverMap.setVisibility(false);
};

var fn_create_dawulMap = function(_oMap) {

	dawulMap = new NUTs.Mashup.DawulMap("dawulMap", {
		oMap : _oMap,
		center : _oMap.getCenter(),
		zoom : _oMap.getZoom()
	});

	dawulMap.setVisibility(true);
};

var fn_factional_map = function(){
	var nZoomLevels = 20;
	var aResolution = MAP.fn_get_resolution(CONFIG.fn_get_getMapInfo().maxResolution, nZoomLevels);
	
	map.numZoomLevels = nZoomLevels;
	
	map.fractionalZoom = true;
	map.minResolution = aResolution[aResolution.length-1];
	map.resolutions = aResolution;

	map.baseLayer.numZoomLevels = nZoomLevels;
	map.baseLayer.minResolution = aResolution[aResolution.length-1];
	map.baseLayer.resolutions = aResolution;
	
	
};

var fn_unFactional_map = function(){

	var nZoomLevels = CONFIG.fn_get_getMapInfo().zoomLevels;
	var aResolution = MAP.fn_get_resolution(CONFIG.fn_get_getMapInfo().maxResolution, nZoomLevels);
	var nCurZoomLevel = map.getZoom();
	
	map.numZoomLevels = nZoomLevels; 
	
	map.fractionalZoom = false;
	map.minResolution = aResolution[aResolution.length-1];
	map.resolutions = aResolution;
	
	map.baseLayer.numZoomLevels = nZoomLevels;
	map.baseLayer.minResolution = aResolution[aResolution.length-1];
	map.baseLayer.resolutions = aResolution;

	if(nCurZoomLevel > (nZoomLevels-1))	{
		map.zoomToScale(nZoomLevels-1);
	}
	
};

/*var fn_set_fractionalZoom = function(_bSet){
	map.setFractionalZoom(_bSet);
};*/

/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 2d 조회 - vworld
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oMap : #btn_map_nomal HTML element 개체
 */
/*var fn_show_external2dMap = function(_oEl) {
	
	if ($(_oEl).hasClass("STab_m1_selected")) {
		$(_oEl).removeClass("STab_m1_selected");
		$(_oEl).addClass("STab_m1");
		
		vBase.setVisibility(false);
	    vSAT.setVisibility(true);	
	    map.setBaseLayer(vSAT);
		  

	} else {

		 
		
		$(_oEl).addClass("STab_m1_selected");

		$("#btn_map_satelite").removeClass("STab_m1_selected");
		$("#btn_map_satelite").addClass("STab_m1");
		
		vBase.setVisibility(true);
		vSAT.setVisibility(false);

		map.setBaseLayer(vBase);
		
	}
	return false;
};

*//**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 영상 조회- vworld
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oEl : #btn_map_satelite HTML element 개체
 *//*
var fn_show_externalSateliteMap = function(_oEl) {
	if ($(_oEl).hasClass("STab_m1_selected")) {
		$(_oEl).removeClass("STab_m1_selected");
		$(_oEl).addClass("STab_m1");

		//fn_factional_map();

	  vBase.setVisibility(true);
	  vSAT.setVisibility(false);

	   map.setBaseLayer(vBase);

	} else {		

		 //fn_unFactional_map();
		
		$(_oEl).addClass("STab_m1_selected");

		$("#btn_map_nomal").removeClass("STab_m1_selected");
		$("#btn_map_nomal").addClass("STab_m1");
 
		
		vBase.setVisibility(false);
	    vSAT.setVisibility(true);	
	    map.setBaseLayer(vSAT);
	}
	return false;
};*/


/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 2d 조회
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oMap : #btn_map_nomal HTML element 개체
 */
var fn_show_external2dMap = function(_oEl) {
	var oDaumMap = MAP.fn_get_daumMap();
	var oNaverMap = MAP.fn_get_naverMap(); 
	
	if ($(_oEl).hasClass("STab_m1_selected")) {
		$(_oEl).removeClass("STab_m1_selected");
		$(_oEl).addClass("STab_m1");
		
		fn_factional_map();
		
		if(oDaumMap) oDaumMap.setVisibility(false);
		if(oNaverMap) oNaverMap.setVisibility(false);

	} else {

		fn_unFactional_map();
		
		$(_oEl).addClass("STab_m1_selected");

		$("#btn_map_satelite").removeClass("STab_m1_selected");
		$("#btn_map_satelite").addClass("STab_m1");

		var type = $("input[name='mashupType']:checked").val();

		if (type == "naver")
			if(oNaverMap) oNaverMap.setVisibility(true);
		else
			if(oDaumMap) oDaumMap.setVisibility(true);

		if(oDaumMap) oDaumMap.setMapMode(1);
		if(oNaverMap) oNaverMap.setMapMode(0);
	}
	return false;
};

/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 영상 조회
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oEl : #btn_map_satelite HTML element 개체
 */
var fn_show_externalSateliteMap = function(_oEl) {
	if ($(_oEl).hasClass("STab_m1_selected")) {
		$(_oEl).removeClass("STab_m1_selected");
		$(_oEl).addClass("STab_m1");

		fn_factional_map();
		if(MAP.fn_get_daumMap())
			MAP.fn_get_daumMap().setVisibility(false);
		if(MAP.fn_get_naverMap())
			MAP.fn_get_naverMap().setVisibility(false);

	} else {			

		fn_unFactional_map();
		
		$(_oEl).addClass("STab_m1_selected");

		$("#btn_map_nomal").removeClass("STab_m1_selected");
		$("#btn_map_nomal").addClass("STab_m1");

		var type = $("input[name='mashupType']:checked").val();

		if (type == "naver")
			MAP.fn_get_naverMap().setVisibility(true);
		else
			MAP.fn_get_daumMap().setVisibility(true);

		if(MAP.fn_get_daumMap())
			MAP.fn_get_daumMap().setMapMode(2);
		if(MAP.fn_get_naverMap())
			MAP.fn_get_naverMap().setMapMode(2);
	}
	return false;
};


/**
 * @memberof USV.MAP
 * @method
 * @description 메모 마커 show/hide
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oEl : #btnMemoList HTML element 개체
 */
var fn_toggle_memoList = function(_oEl) {
	map.getLayerByName("MemoToolLayer").removeAllFeatures();

	if ($(_oEl).data("show")) {
		$(_oEl).data("show", false);
	} else {
		COMMON.fn_excute_ajax({
			url : COMMON.fn_get_pageContext()
					+ "/memo/getMemoList.do",
			type : 'GET',
			data : {
				USER_ID : 'test'
			},
			cache : false,
			dataType : "json",
			success : function(_oData) {
				var oFormat = new OpenLayers.Format.GML();
				for ( var i = 0, len = _oData.userMemoList.length; i < len; i++) {
					var sMemoInfo = _oData.userMemoList[i].MEMO_INFO;
					var oFeature = oFormat.read(sMemoInfo);
					map.getLayerByName("MemoToolLayer")
							.addFeatures(oFeature);
				}
			}
		});
		$(_oEl).data("show", true);
	}

	return false;
};

/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 전환
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oEl : name이 'mashupType'인 input 타입 HTML element 개체
 */
var fn_change_baseMap = function(_oEl) {
	if (!$("#btn_map_nomal").hasClass("STab_m1_selected")
			&& !$("#btn_map_satelite").hasClass("STab_m1_selected"))
		return;

	var bType = $(_oEl).val() == "naver" ? true : false;

	var nZoom = map.getZoom() + 1;


		
		if (map.numZoomLevels == nZoom) {
			if (bType) { // 네이버 일 경우
				if (confirm("네이버는 현재 맵 해상도를 지원하지 않습니다. \n네이버 맵을 선택 할 경우 줌 레벨을 한 단계 축소합니다.")) {
					map.setCenter(map.getCenter(), map.getZoom() - 1);

					MAP.fn_get_naverMap().setVisibility(bType);
					MAP.fn_get_daumMap().setVisibility(!bType);

					MAP.fn_get_daumMap().isVisibility() ? $("#btn_roadView").show() : $("#btn_roadView").hide();
					MAP.fn_get_daumMap().endRoadView();

				} else {
					$('input:radio[value="daum"]').prop('checked', true);
				}
			}
		} else {
			MAP.fn_get_naverMap().setVisibility(bType);
			MAP.fn_get_daumMap().setVisibility(!bType);

			MAP.fn_get_daumMap().isVisibility() ? $("#btn_roadView").show()
					: $("#btn_roadView").hide();
			MAP.fn_get_daumMap().endRoadView();
		}

	

};



/**
 * @memberof USV.MAP
 * @method
 * @description 배경지도 전환
 * @author 임상수(2015.10.06)
 * @param {Object}
 *            _oMap : map 개체
 */
var fn_save_memo = function(files) {
	var oDrawLayer = map.getLayerByName("MemoToolLayer");
	var oFormat = new OpenLayers.Format.GML();
	var oFormData = new FormData($("#memoForm")[0]);
	var oGmlData;
	var parentID = $("#btn_add_memo").data("parentID") ? $("#btn_add_memo").data("parentID") : "0";
	var oFeature;

	var sMemoInfo = $("#btn_add_memo").data("featureData");
	// if($("#btn_save_memo").data("parentID")) //상세목록에서 메모추가 버튼을 클릭한 경우
	// oFeature = oFormat.read(sMemoInfo);
	// else

	oFeature = sMemoInfo;

	if (oFeature) {
		if (confirm("메모를 저장 하시겠습니까?")) {
			var oDate = new Date();

			if (oFeature.attributes.seq < 100000) //
				oFeature.attributes.seq = oDate.getTime();
			oGmlData = oFormat.write(oFeature);

			oFormData.append("FEATURE_SEQ", oFeature.attributes.seq);

			oFormData.append("MEMO_INFO", oGmlData);
			oFormData.append("X", oFeature.geometry.x);
			oFormData.append("Y", oFeature.geometry.y);
			oFormData.append("MAP_SCALE", map.getScale());
			oFormData.append("PARENT_ID", parentID);

			for ( var i = 0; i < files.length; i++) {
				oFormData.append("FILES", files[i]);
			}
			$.ajax({
				url  : COMMON.fn_get_pageContext() + "/memo/saveMemo.do",
				type : 'POST',
				data : oFormData,
				contentType : false,
				processData : false,
				cache : false,
				success : function(_sData) {
					if (_sData > 0) {
						$("#memoForm")[0].reset();
						$("#popup_add_memo").hide();
						
						if($("#btn_add_memo").data("caller")=="detail") 
						{
							$.removeData("#btn_add_memo","caller");
							$.removeData("#btn_add_memo","eventType");
							$.removeData("#btn_add_memo","memoID");				
							$.removeData("#btn_add_memo","parentID");
							
							MAP.fn_get_memo_hist($("#btn_add_memo").data("featureData"));							
						}
						else
							COMMON.showMessage("MEMO&메모가 저장되었습니다.");
					}
					$.removeData("#btn_save_memo", "parentID");
				},
				error : function(e){
					$("#popup_add_memo").hide();
					COMMON.showMessage("MEMO&메모 저장에 실패하엿습니다.");
				}
			});
		}
	} else {
		if (confirm("메모를 저장 하시겠습니까?")) {
			oGmlData = oFormat.write(oDrawLayer.features);

			oFormData.append("MEMO_INFO", oGmlData);
			oFormData.append("X", map.getCenter().lon);
			oFormData.append("Y", map.getCenter().lat);
			oFormData.append("MAP_SCALE", map.getScale());

			COMMON.fn_excute_ajax({
				url : COMMON.fn_get_pageContext() + "/memo/saveMemo.do",
				type : 'POST',
				data : oFormData,
				contentType : false,
				processData : false,
				cache : false,
				success : function(_sData) {
					if (_sData > 0) {
						
						$("#memoForm")[0].reset();
						$("#popup_add_memo").hide();
						
						if($("#btn_add_memo").data("caller")=="detail") 
						{
							$.removeData("#btn_add_memo","caller");
							$.removeData("#btn_add_memo","eventType");
							$.removeData("#btn_add_memo","memoID");				
							$.removeData("#btn_add_memo","parentID");
							
							MAP.fn_get_memo_hist($("#btn_add_memo").data("featureData"));							
						}
						else
							COMMON.showMessage("MEMO&메모가 저장되었습니다.");
					}

					$.removeData("#btn_save_memo", "parentID");
				},
				error : function(e){
					$("#popup_add_memo").hide();
					COMMON.showMessage("MEMO&메모 저장에 실패하엿습니다.");
				}
			});
		}
	}
	
	return false;
};

var fn_update_memo = function(files, memoID){
	
	var oFormData = new FormData($("#memoForm")[0]);
	
	var oDrawLayer = map.getLayerByName("MemoToolLayer");
	var oFormat = new OpenLayers.Format.GML();		
	var oFeature = $("#btn_add_memo").data("featureData");
	var oGmlData = oFormat.write(oFeature);
	
	if (confirm("메모를 저장 하시겠습니까?")) {
		
		oFormData.append("MEMO_ID", memoID);
		oFormData.append("MEMO_INFO", oGmlData);
		oFormData.append("X", oFeature.geometry.x);
		oFormData.append("Y", oFeature.geometry.y);
		
		for ( var i = 0; i < files.length; i++) {
			oFormData.append("FILES", files[i]);
		}			
		
		COMMON.fn_excute_ajax({
			url : COMMON.fn_get_pageContext() + "/memo/updateMemo.do",
			type : 'POST',
			data : oFormData,
			contentType : false,
			processData : false,
			cache : false,
			success : function(_sData) {
				if (_sData > 0) {
					$("#memoForm")[0].reset();
					$("#popup_add_memo").hide();
					
					if($("#btn_add_memo").data("caller")=="detail") 
					{
						$.removeData("#btn_add_memo","caller");
						$.removeData("#btn_add_memo","eventType");
						$.removeData("#btn_add_memo","memoID");				
						$.removeData("#btn_add_memo","parentID");						
						
						MAP.fn_get_memo_hist($("#btn_add_memo").data("featureData"));							
					}
					else
						COMMON.showMessage("MEMO&메모가 저장되었습니다.");
				}
				$.removeData("#btn_save_memo", "parentID");					
			}
		});
	}

};

/**
* @memberof USV.MAP
* @method 
* @description 저장되어 있는 단일 메모를 조회하여 화면에 출력 
* @author 김정수(2016.02.18)
*/
var fn_get_memo = function() {
	var memoID = $("#btn_add_memo").data("memoID");
	if (memoID != undefined) {
		// 메모를 가지고 와서 바인딩
		$("#imgSavedThumbslst").empty();
		
		$.ajax({
			url : COMMON.fn_get_pageContext() + "/memo/getMemo.do",
			type : 'GET',
			data : {
				MEMO_ID : memoID,
				USER_ID : 'test'
			},
			dataType : "json",
			success : function(_oData) {
				var oFormat = new OpenLayers.Format.GML();
				var memoFileInfoList = _oData.memoFileInfoList;

				var memoId, imgTag;							
				// 메모 이력을 모두 불러와 표시
				for ( var i = 0; i < memoFileInfoList.length; i++) {

					if (memoId != memoFileInfoList[i].MEMO_ID) {
						$("input[name*='MEMO_NM']").val(memoFileInfoList[i].MEMO_NM);
						$("textarea[name*='MEMO_CN']").val(	memoFileInfoList[i].MEMO_CN);
						var sMemoInfo = memoFileInfoList[i].MEMO_INFO;
						var oFeature = oFormat.read(sMemoInfo);
						$("#curmarkerImg").attr("src",oFeature[0].attributes.externalGraphic);
						memoId = memoFileInfoList[i].MEMO_ID;
					}
					var fileBase64String = memoFileInfoList[i].FILE_BASE64_STRING;
        			if(fileBase64String){
        				
        				var li = $("<li />");
        				
        				imgTag = $("<img />", {
	        				"src" : "data:image/png;base64," + fileBase64String
	        				,"name" : memoFileInfoList[i].FILE_ID
	        			});
        				$(imgTag).appendTo(li);
        				
						//html += "<img src='"+ e.target.result + "' data-file='" + f.name + "'/>" ;
						
						var tagA  = $("<a href='#' class='delFile'><img src='/images/usolver/com/map/p_btn2_del_on.gif' alt='제거' /></a> ");//data-fileID='"+memoFileInfoList[i].FILE_ID+"'
						$(tagA).data("fileID",memoFileInfoList[i].FILE_ID);
						$(tagA).appendTo(li);	    								
						
						$("#imgSavedThumbslst").append(li);
						fn_image_resize(imgTag, 100, 100);  								
        			}
        		}
				if($("#imgSavedThumbslst").children().length>0)
					$("#imgSavedThumbs").show();
				else
					$("#imgSavedThumbs").hide();
			},
			error : function(_sMsg) {

			}
		});
	}
};

/**
* @memberof USV.MAP
* @method 
* @description 저장되어 있는 메모(부모/자식 포함)를 조회하여 화면에 출력 
* @author 김정수(2016.02.18)
*/
var fn_get_memo_hist = function(feature){
	
	var slider = $("#detailbx").data("sliderPro");		
	if(slider)
		slider.destroy();
	$("#btn_add_memo").data("featureData",feature);
	$.ajax({
        url: COMMON.fn_get_pageContext() + "/memo/getMemoHistList.do",
        type: 'GET',
        data: {
        	FEATURE_SEQ : feature.attributes.seq
        	,USER_ID : 'test'
        },
        dataType : "json",
        success: function (data) {
        	
        	var memoFileInfoList = data.memoHistList;        		        	

    		$(".sp-thumbnails").empty();  	// 날짜 바인딩 
    		$(".sp-slides").empty();    	// 메모이력	슬라이드
    		
    		var memoID, sp_slide, table_left, table, tr_img, td, div, ul,li, imgTag;
    		var imgCnt=0;
    		//메모 이력을 모두 불러와 표시
    		for(var i = 0; i < memoFileInfoList.length; i++) {	        			
    			if(memoID != memoFileInfoList[i].MEMO_ID)
    			{
    				if(i==0) $("#btn_insert_memo").data("featureData", memoFileInfoList[i].MEMO_INFO);
    				
    				if(imgCnt>0){    		    		        
		                var totalWidth = 156 * imgCnt;
		                $(ul).css("width", totalWidth);	
		                imgCnt=0;
    				}        				
    				
    				$(".sp-thumbnails").append($("<div class='sp-thumbnail' name='"+memoFileInfoList[i].MEMO_ID+"'><div class='sp-thumbnail-title'>"+memoFileInfoList[i].CREATE_DT+"</div></div>"));
    				memoID = memoFileInfoList[i].MEMO_ID;
    				
    				sp_slide = $("<div class='sp-slide'>").appendTo($(".sp-slides"));
    				//$(".sp-slides").append(sp_slide);
    				table_left = $("<div class='Table_left'>").appendTo($(sp_slide));
    				//sp_slide.append(table_left);
    				table=$("<table />").appendTo($(table_left));
    				//table_left.append(table);
    				table.append($("<colgroup><col width='30%' /><col width='70%' /></colgroup>"));
    				table.append($("<tr><th>메모 명칭</th><td>"+ memoFileInfoList[i].MEMO_NM +"</td></tr>"));
    				table.append($("<tr><th>메모 내용</th><td><div style='height:100px; overflow-y:auto;'><pre>"+ memoFileInfoList[i].MEMO_CN +"</pre></div></td></tr>"));
    				
    				tr_img = $("<tr />").appendTo($(table)); td = $("<td />",{colspan:'2'}).appendTo($(tr_img)); 
    				//table.append(tr_img);
    				div=$("<div />",{class:"hscroll", style:"width:550px"}).appendTo($(td)); 
    				ul=$("<ul class='imglst' style='width:570px' /> ").appendTo($(div));
    				
    				//tr_img.append(td); 	td.append(div);	div.append(ul);
    			}
    			imgCnt +=1;
    			//하나의 메모에 여러 이미지 처리
    			li = $("<li />");
    			ul.append(li);
    			
    			var fileBase64String = memoFileInfoList[i].FILE_BASE64_STRING;
    			if(fileBase64String){
    				imgTag = $("<img />", {
        				"src" : "data:image/png;base64," + fileBase64String
        				,"name" : memoFileInfoList[i].FILE_ID
        			});
    			}else
				{
    				imgTag = $("<img />", {
        				"src" : "/images/usolver/com/cmm/404_not_found.jpg",
        				"style" : "display:block;margin:0 auto;border:solid 1px #eee; width:116px; height:87px"
        			});
				}     			
    			
				li.append(imgTag);
				MAP.fn_image_resize(imgTag, 100, 100);
    		}
    		
    		
    		$("#detailbx").sliderPro({
    			width: 570,
    			height: 250,
    			arrows: false,
    			buttons: false,
    			waitForLayers: true,
    			thumbnailWidth: 114,
    			thumbnailHeight: 50,
    			thumbnailPointer: true,
    			autoplay: false,
    			autoScaleLayers: false,
    			thumbnailsPosition: 'top',
    			selectedSlideIndex:0,
    			breakpoints: {
    			    570: {
    				    thumbnailWidth: 114,
    					thumbnailHeight: 50
    				}
    			}
    		});
    		slider = $("#detailbx").data("sliderPro");
    		var selectSlideIdx = $("#btn_add_memo").data("selectSlideIdx");
    		if (selectSlideIdx == undefined) 
    			slider.gotoSlide(0);
    		else
    			slider.gotoSlide(selectSlideIdx);
    		$.removeData("#btn_add_memo","selectSlideIdx");
    		
    		//$("#detailbx").css({ 'paddingTop': '59'});
    		//$(".sp-thumbnails-container").css({});
    		$("#divMemoHist").show();    		        		
        }
        ,
		error: function(xhr, status, error) {
			COMMON.showMessage('메모조회오류 & 오류발생.\n'); 
		}
	});
};


var fn_delete_memo = function(memoID) {

	if (memoID == "") {
		COMMON.showMessage("MEMO&삭제할 메모가 없습니다.");
		return false;
	}

	$.ajax({
		url : COMMON.fn_get_pageContext() + "/memo/deleteMemo.do",
		type : 'GET',
		data : {
			USER_ID : 'test',
			MEMO_ID : memoID
		},
		dataType : "json",
		success : function(_sData) {
			if (_sData.resultCnt > 0) {
				COMMON.showMessage("MEMO&메모가 삭제되었습니다.");
				$("#btnMemoList").trigger("click"); // 감추고
				$("#divMemoHist").hide();
				$("#btnMemoList").trigger("click"); // 다시 메모 보이기
			} else {
				COMMON.showMessage("ERROR&메모 삭제에 실패하였습니다.");
			}
		},
		error : function(_sMsg) {
			COMMON.showMessage("ERROR&메모 삭제에 실패하였습니다.");
		}

	});

};

/**
 * 메모이미지 리사이즈
 * @memberof USV.MAP */
var fn_image_resize = function(inImg, maxWidth, maxHeight ){
	var ratio = 0;
    var width = $(inImg).width();
    var height = $(inImg).height();
    if(width > maxWidth){
        ratio = maxWidth / width;
        $(inImg).css("width", maxWidth);
        $(inImg).css("height", height * ratio);
        height = height * ratio;
    }
    width = $(inImg).width();
    height = $(inImg).height();
    if(height > maxHeight){
        ratio = maxHeight / height;
        $(inImg).css("height", maxHeight);
        $(inImg).css("width", width * ratio);
        width = width * ratio;
    }
};


var fn_refresh_subjectList = function(){
	
	var sSelSubjectGroup = fn_get_selSubjectGroup().toLowerCase();
	var oSelEl = $("#mnu_"+sSelSubjectGroup+"_subject");
	if(oSelEl)
		$(oSelEl).trigger("click");
	
};


var fn_get_subjectGroupInfo = function(_sChar){
	var sMsg = "";
	switch(_sChar) 
	{

		case "SYSTEM": 
			sMsg = "기본 맵(<div class='font20'>기본 맵</div>)";
			break;
		case "BASE": 
			sMsg = "내 맵(<div class='font20'>내 맵</div>)";
			break;
		case "RDL": 
			sMsg = "공유 맵(<div class='font20'>도로</div>)";
			break;
		case "WTL": 
			sMsg = "공유 맵(<div class='font20'>상수</div>)";
			break;
		case "SWL": 
			sMsg = "공유 맵(<div class='font20'>하수</div>)";
			break;
		case "UND": 
			sMsg = "공유 맵(<div class='font20'>지하시설물</div>)";
			break;
		case "ETC": 
			sMsg = "공유 맵(<div class='font20'>기타</div>)";
			break; 
	}
	
	return sMsg;
};
/**
 * @memberof USV.MAP
 * @method
 * @description 주제도 추출
 * @param {String} _sGroup 		: 공유맵의 주제도 구분값 혹은...시스템 기본맵중 시스템 구분값
 * @param {String} _bSysMap 	: 시스템 기본맵 여부 -> 시스템 기본맵일 경우 true
 * @author 최재훈(2016.09.01) 
 */
var fn_get_subjectInfo = function(_sGroup, _bSysMap){
	
	fn_set_selSubjectGroup(_sGroup);
	var _sSysCode = 'N';
	
	if(_bSysMap){ 
		_sSysCode = 'Y';
		$("#gallery_listTile").text("기본맵 리스트");
	}
	else{
		if(_sGroup == "BASE")
			$("#gallery_listTile").text("내맵 리스트");
		else
			$("#gallery_listTile").text("공유맵 리스트");
	}
	 
	
	$.ajax({
		url  : COMMON.fn_get_pageContext() + "/subject/getSubjectTotList.do",
		type: 'post',
		dataType: 'json',
		data: {
			USER_ID : COMMON.fn_get_userId(), //FIXME -- 실제 아이디로 변경
			SUBJECT_GROUP : _sGroup,
			SYSTEM_MAP : _sSysCode
		},
		success : function(oData) {
			
			var nDataLen = oData.userSubjectTotList.length;

			var oParentEl = $(".gallery_content .ContBx");				
			oParentEl.html(''); //초기화
			
			if(nDataLen > 0){

				for(var i = 0; i < nDataLen; i++){
					(function(idx) {
						
						var oSubject = oData.userSubjectTotList[idx];
						
						fn_add_subjectEl(oSubject);
						
						
					})(i);
				}
			}
			else{

				oParentEl.html("["+fn_get_subjectGroupInfo(_sGroup) + "] 그룹에 등록된 맵이 없습니다");
			}
			
		},
		error : function(e){
			$("#popup_subject").hide();
			COMMON.showMessage("맵 갤러리&맵 정보 추출에 실패하였습니다.");
		}
	});
};

var fn_add_subjectEl = function(oSubject){

	var sFileId 		= oSubject.FILE_ID;
	var sFilePath 		= oSubject.FILE_PATH;
	var sFileUploadNm 	= oSubject.FILE_UPLOAD_NM;

	var sSubjectId		= oSubject.SUBJECT_ID;
	var sSubjectGroup	= oSubject.SUBJECT_GROUP;
	var sSubjectDesc	= oSubject.SUBJECT_DESC;
	var sSubjectShare	= oSubject.SUBJECT_SHARE;
	var sShareStatus	= oSubject.SHARE_STATUS;
	var sSubjectNm		= oSubject.SUBJECT_NAME;
	var sUserId			= oSubject.USER_ID; 

	var sBase			= oSubject.BASE;
	var sSystemMap		= oSubject.SYSTEM_MAP;
	
	//console.log(sSubjectNm);
	var sElementId = sUserId + '_' + sSubjectId; 
	
	var oParentEl = $(".gallery_content .ContBx");

	//var oNewSubject = $("#gal_dummy").clone(true);
	var oNewSubject = $("#gal_dummy").clone();
	
	var sSubjectDesc = sSubjectDesc.substr(0,30) + "...";
	//$(oNewSubject).find('div[id="'+horaInicial+'"]')
	$(oNewSubject).attr("id","gal_subject_"+sElementId);
	$(oNewSubject).find('img[id=imgSnapshot]').attr("id","img_"+sElementId);
	$(oNewSubject).find('dt[id=subject_title]').text(sSubjectNm).attr("id","subject_title_"+sElementId);
	$(oNewSubject).find('dd[id=subject_desc]').text(sSubjectDesc).attr("id","subject_desc_"+sElementId).show();

	$(oNewSubject).find('a[id=btn_set_basesubject]').attr("id","btn_set_basesubject_"+sElementId);
	$(oNewSubject).find('a[id=btn_modify_subject]').attr("id","btn_modify_subject_"+sElementId);
	$(oNewSubject).find('a[id=btn_delete_subject]').attr("id","btn_delete_subject_"+sElementId); 
	$(oNewSubject).show();
	
	var fileBase64String = oSubject.FILE_BASE64_STRING;
	
	if(fileBase64String){			
		$(oNewSubject).find('img[id=img_'+sElementId+']').attr("src","data:image/png;base64," + fileBase64String);
	}
	
	//기본주제도일 경우
	if(sBase == "Y"){ 
		var oEl = $(oNewSubject).find('a[id=btn_set_basesubject_'+sElementId+']');
		var oImgEl = $(oEl).find("img"); 
		$(oImgEl).attr("src","/images/usolver/com/map/p_btn2_share_on.gif");
	}
	$(oParentEl).append(oNewSubject);
	
	//이벤트 등록
	//1.스냅샷 이미지 클릭 시 주제도 변경처리
	$("#img_" + sElementId).on("click",function(){
		fn_change_subject(sUserId , sSubjectId, sSystemMap);
	});
	
	if(sSystemMap != "Y" && sUserId == COMMON.fn_get_userId() || (sSystemMap == "Y" && COMMON.fn_get_sysAdmin() == "Y" )){  
		
		$("#gallery .gal_bt dl dd").show();
		
		//2.기본주제도로 설정하기
		$("#btn_set_basesubject_" + sElementId).on("click",function(){
			
			fn_set_baseSubject(sUserId , sSubjectId, sBase);
		});
		
		//3.수정하기
		$("#btn_modify_subject_" + sElementId).on("click",function(){
			fn_modify_subject(sUserId , sSubjectId, oSubject);
		});		
		
		//4.삭제하기
		$("#btn_delete_subject_" + sElementId).on("click",function(){
			fn_delete_subject(sUserId , sSubjectId, sBase);
		});
	}
	else{
		//2.기본주제도로 설정하기
		$("#btn_set_basesubject_" + sElementId).on("click",function(){
			COMMON.showMessage("권한 오류&기본도 설정 권한이 없습니다.");
		});
		
		//3.수정하기
		$("#btn_modify_subject_" + sElementId).on("click",function(){
			COMMON.showMessage("권한 오류&수정 권한이 없습니다.");
		});		
		
		//4.삭제하기
		$("#btn_delete_subject_" + sElementId).on("click",function(){
			COMMON.showMessage("권한 오류&삭제 권한이 없습니다.");
		});
	}
	
};

var fn_change_subject = function(_sUserId, _sSubjectId, _sSystempMap){
	//alert(_sUserId +'_c_'+ _sSubjectId);
	var sSysCode = COMMON.fn_get_currentSystem(); //FIXME 실제 시스템 코드로 변경
	if(confirm('맵 변경 시 지도화면 및 저장되지 않은 작업(편집/분석/그리기 등)이 초기화 됩니다. 계속하시겠습니까? ')){
		
		//현재 선택된 주제도 SET
		MAP.fn_set_userTmapId(_sSubjectId);
		//FIXME 권한체크 필요
		location.href="/map/map.do?SYSTEM_MAP="+_sSystempMap+"&SUBJECT_ID="+_sSubjectId+"&SYSTEM="+sSysCode;
		STYLE.fn_init_editLayerList(COMMON.fn_get_editLayerInfo(), true);//편집시설물 선택 초기화
	}
};

var fn_set_baseSubject = function(_sUserId, _sSubjectId, _sBaseSubect){
	//alert(_sUserId +'_b_'+ _sSubjectId);
	var sBase = 'Y';
	var sMent ='기본 맵으로 등록되었습니다';
	
	if(_sBaseSubect == 'Y'){
		sBase = 'N';
		sMent = '기본맵에서 해제되었습니다';
	}
	
	var oSendingData = {
			USER_ID: _sUserId,
			SUBJECT_ID: _sSubjectId,
			BASE:sBase
	};
		
	$.ajax({
		url  : COMMON.fn_get_pageContext() + "/subject/setBaseSubject.do",
		type : 'POST',
		data : oSendingData,
		dataType : "json",
		async : false,
		cache : false,
		success : function(_sData) {

			if (_sData == "1") {
				COMMON.showMessage("맵 관리&"+sMent);
			}
			//$.removeData("#btn_save_memo", "parentID");
		},
		error : function(e){
			$("#popup_subject").hide();
			COMMON.showMessage("맵 관리&기본 맵 등록에 실패하였습니다.");
		}
	});
	
	fn_refresh_subjectList();
};

var fn_modify_subject = function(_sUserId, _sSubjectId, _oSubject){
	//alert(_sUserId +'_m_'+ _sSubjectId);
	
	var sFileId 		= _oSubject.FILE_ID;
	var sFilePath 		= _oSubject.FILE_PATH;
	var sFileUploadNm 	= _oSubject.FILE_UPLOAD_NM;

	var sSubjectId		= _oSubject.SUBJECT_ID;
	var sSubjectGroup	= _oSubject.SUBJECT_GROUP;
	var sSubjectDesc	= _oSubject.SUBJECT_DESC;
	var sSubjectShare	= _oSubject.SUBJECT_SHARE;
	var sShareStatus	= _oSubject.SHARE_STATUS;
	var sSubjectNm		= _oSubject.SUBJECT_NAME;
	var sBase			= _oSubject.BASE;
	var sUserId			= _oSubject.USER_ID; 

	var fileBase64String = _oSubject.FILE_BASE64_STRING;
	
	//초기화
	//$('#SUBJECT_GROUP').val(sSubjectGroup).attr('selected', 'selected');
	//$('#SUBJECT_SHARE').val(sSubjectShare).attr('selected', 'selected');
	$('#BASE').val(sBase).attr('selected', 'selected');
	$("#SUBJECT_NAME").val(sSubjectNm);
	$("#SUBJECT_DESC").val(sSubjectDesc);
	
	//hidden 세팅
	$("#DATA_PROC").val("MODIFY");
	$("#SEL_SUBJECT_ID").val(_sSubjectId);
	
	var sImgSrc = "";
	
	if(fileBase64String){
		sImgSrc	= "data:image/png;base64," + fileBase64String;
		
		var li = $("<li />");
		
		imgTag = $("<img />", {
			"src" : sImgSrc
			,"name" : sFileId
		});
		$(imgTag).appendTo(li);
		
		//html += "<img src='"+ e.target.result + "' data-file='" + f.name + "'/>" ;
		
		var tagA  = $("<a href='#' class='delFile'><img src='/images/usolver/com/map/p_btn2_del_on.gif' alt='제거' /></a> ");//data-fileID='"+memoFileInfoList[i].FILE_ID+"'
		$(tagA).data("fileID",sFileId);
		$(tagA).appendTo(li);	    								
		
		$("#imgSavedThumbslst").append(li);
		fn_image_resize(imgTag, 100, 100);  		
	} 
	
							

	//$('#subject_share option:eq(0)').attr('selected', 'selected')
		
	COMMON.showWindow($("#popup_subject"));
};

var fn_delete_subject = function(_sUserId, _sSubjectId, _sBase){
	
	var sAlertMent = "맵을 삭제하시겠습니까?";
	
	if(_sBase == "Y"){
		sAlertMent = "기본 맵을 삭제할 경우 서비스 레이어가 초기화 됩니다. 계속하시겠습니까?";
	}
	
	if(confirm(sAlertMent)){
		var oSendingData = {
				USER_ID: _sUserId,
				SUBJECT_ID: _sSubjectId
		};
		
		$.ajax({
			url  : COMMON.fn_get_pageContext() + "/subject/deleteSubject.do",
			type : 'POST',
			data : oSendingData,
			dataType : "json",
			async : false,
			cache : false,
			success : function(_sData) {

				if (_sData == "1") {
					$("#gal_subject_admin_"+_sSubjectId).remove();
					COMMON.showMessage("맵 관리&맵이 삭제되었습니다.");
				}
				//$.removeData("#btn_save_memo", "parentID");
			},
			error : function(e){
				$("#popup_subject").hide();
				COMMON.showMessage("맵 관리&맵 삭제에 실패하였습니다.");
			}
		});
	}
	
	fn_refresh_subjectList();
	var sCurTmapId = MAP.fn_get_userTmapId();
	if(sCurTmapId == _sSubjectId) //현재 서비스하고 있는 맵과 삭제한 맵이 동일할 경우 지도 갱신
		location.href="/map/map.do";
	
};

var fn_get_groupIdByGroupName = function(layerNm){
	
	var groupId;
	
	switch(layerNm) {
		case "기본도" :
			groupId = "1001";
			break;
		case "도로" :
			groupId = "1002";
			break;
		case "상수" :
			groupId = "1003";
			break;
		case "하수" :
			groupId = "1004";
			break;
		case "지하시설물" :
			groupId = "1005";
			break;
		case "공유 맵" :
			groupId = "1006";
			break;
	}
	
	return groupId;
		
};

var fn_get_styleFromSld = function(_sLayerName){
	
	var oXml = layerTool.getSld().xml; 
	var tempLayerSld = [];
	
    $.extend(tempLayerSld, oXml.getElementsByTagName("sld:NamedLayer"));

	var layerSld = NUTs.WMS.parseGetStylesByNamedLayers(tempLayerSld); 
	
	for(var i=0,len=layerSld.length;i<len;i++) {
		//영문레이어
		var sLayerName = layerSld[i].getElementsByTagName("se:FeatureTypeName")[0].textContent;
		
		if(_sLayerName === sLayerName) {
			var xmlText = new XMLSerializer().serializeToString(layerSld[i]);
			return xmlText;
			break;
		}
	}	
};

/**
 * @memberof USV.MAP
 * @method
 * @description 주제도 등록
 * @author 최재훈(2016.08.19)
 * @param {Object}
 *            _oMap : map 개체
 */
var fn_save_subject = function(files) {

	var oFormData = new FormData($("#subjectForm")[0]);
	//var oSaveLayerInfo = COMMON.fn_get_editLayerInfo();
	var sDataProc = $("#DATA_PROC").val();
	//debugger;
	
	var sProcMent = "등록";
	var sProcActionUrl = COMMON.fn_get_pageContext() + "/subject/saveSubject.do";
	
	if (oFormData) {
		
		var sSubjectName = $("#SUBJECT_NAME").val();
		if(sSubjectName == "") {
			COMMON.showMessage("맵 "+sProcMent+" 오류&맵 명칭은 필수 입력 항목입니다.");
			return false;
		}
		
		if(sDataProc == "MODIFY"){ 
			sProcMent = "수정";
			sProcActionUrl = COMMON.fn_get_pageContext() + "/subject/updateSubject.do";
		}
			
		
		if (confirm("맵을 "+sProcMent+" 하시겠습니까?")) {
			var oDate = new Date();
			
			//★★★ theme이름에 공백있을 경우 sLayerNm에 table이름이 아닌 theme이름이 할당돼 누락될 가능성 있음.
			//FIXME --> 공백없이 naming하거나 소스 추가 수정 필요.
			var aServiceLayerList = fn_get_serviceLayerList(); //tree Element로부터 서비스중인 레이어목록 추출

			var oLayerStyleInfo = {};
			
			//sldTool = new NUTs.Tool.SLDTool(layerTool.getSld().xml, "xml");
			
			for(var i = 0, nLyrLen = aServiceLayerList.length; i < nLyrLen; i++){
				
				var sLayerNm = aServiceLayerList[i];
				 
				if(COMMON.fn_get_layerInfo(sLayerNm)) {
					var sLayerId = COMMON.fn_get_layerInfo(sLayerNm).id;

					oLayerStyleInfo[sLayerNm] = oLayerStyleInfo[sLayerNm] || {}; 
					 
					var oSldNameLayer = STYLE.fn_find_sldNameLayer(sLayerId);  //namedLayer Obj추출
					var sThemeNm = oSldNameLayer.name;
					var sLayerStyle = fn_get_styleFromSld(sLayerNm);  //namedLayer Obj이용 XML String변환개체 추출

					var sGroupName 	= COMMON.fn_get_layerInfo(sLayerNm).groupName;
					var sLayerOnoff = COMMON.fn_get_layerInfo(sLayerNm).show;
					var sLayerType 	= COMMON.fn_get_layerInfo(sLayerNm).layerType;
					
					oLayerStyleInfo[sLayerNm].themeName = sThemeNm;
					oLayerStyleInfo[sLayerNm].style = sLayerStyle;
					oLayerStyleInfo[sLayerNm].order = String(i+1);
					
					oLayerStyleInfo[sLayerNm].groupId 		= fn_get_groupIdByGroupName(sGroupName);
					oLayerStyleInfo[sLayerNm].groupName 	= sGroupName;
					oLayerStyleInfo[sLayerNm].layerId 		= sLayerId;
					oLayerStyleInfo[sLayerNm].layerOnoff 	= sLayerOnoff;
					oLayerStyleInfo[sLayerNm].layerType 	= sLayerType;
				}

			}
//			var sSubjectShare = $("#SUBJECT_SHARE option:selected").val();
//			var sSubjectGroup = $("#SUBJECT_GROUP option:selected").val();
			
			var sSubjectShare = 'NONE';
			var sSubjectGroup = 'BASE';
			var sSystemMap = $("#SYSTEM_MAP option:selected").val();
			
			if(!sSystemMap) 
				sSystemMap="N";
			
			var sBase = $("#BASE option:selected").val();
			var sStatus;
			if(sSubjectShare == "NONE" || sSubjectShare == ""){
				sStatus = "APPROVED";
			}else{
				sStatus = "STANDBY";
			}
			
			if(sSubjectGroup == ""){
				sSubjectGroup = "BASE";
			}

			if($("#SUBJECT_NAME").val().trim() == ""){
				COMMON.showMessage("맵 관리&맵 이름은 필수 입력 항목입니다.");
			}
			
			oFormData.append("LAYER_SYLE", JSON.stringify(oLayerStyleInfo));
			//oFormData.append("SUBJECT_NAME", $("#SUBJECT_NAME").val());
			oFormData.append("USER_ID", COMMON.fn_get_userId()); //FIXME <-- 실제 계정정보 GET
			//oFormData.append("SUBJECT_DESC", $("#SUBJECT_DESC").val());
			oFormData.append("SUBJECT_GROUP", sSubjectGroup);
			oFormData.append("SUBJECT_SHARE", sSubjectShare);
			oFormData.append("SHARE_STATUS", sStatus); //STANDBY, APPROVED
			oFormData.append("BASE", sBase); //Y, N
			oFormData.append("SYSTEM_MAP", sSystemMap); //Y, N
			
			for ( var i = 0; i < files.length; i++) {
				oFormData.append("FILES", files[i]);
			}
			
			$.ajax({
				url  : sProcActionUrl,
				type : 'POST',
				data : oFormData,
				contentType : false,
				processData : false,
				async : false,
				cache : false,
				success : function(_sData) {
					//alert(_sData);
					if (_sData > 0) {
						$("#subjectForm")[0].reset();
						$("#popup_subject").hide();
						
						COMMON.showMessage("맵 관리&맵이 "+sProcMent+"되었습니다.");
					}
					//$.removeData("#btn_save_memo", "parentID");
				},
				error : function(e){
					$("#popup_subject").hide();
					COMMON.showMessage("맵 관리&맵 "+sProcMent+"에 실패하였습니다.");
				}
			});
		}
	}
	
	//갱신 - 현재 선택된 그룹하위의 주제도(Element)를 모두 제거하고 다시 불러오도록...
	fn_refresh_subjectList();
	
	return false;
};

var fn_get_serviceLayerList = function(){

	var aLayers = [];
	var oContainer = $.jstree._reference("#divLayerTree").get_container();
	var oAllChildren = oContainer.find("li[id*='layer']");

	 $.each(oAllChildren, function(idx, val){
		var sText = val.innerText;
		sText = COMMON.replaceAll(sText,"\r\n"," ");
		var aLayerInfo =  COMMON.ltrim(sText).split(" ");
		
		var sLayerName = COMMON.trim(aLayerInfo[0]);
		var sTableName = COMMON.fn_get_EditEngLayerNm(sLayerName);
		
		aLayers.push(sTableName);
	 });
	 
	 return aLayers;
	 
};

/**
 * 횡단면도 조회 Obj
 * 
 * @memberof USV.MAP
 * @member {Object} acssObj
 */
/*var oAcss = {

	init : function() {
		this.addControl();
		this.addEvent();
	},

	addControl : function() {
		map.addControl(new GAcss({
			serviceUrl : CONFIG.fn_get_serviceUrl(),
			layers : [ CONFIG.fn_get_acssObject().layers ],
			styles : [ CONFIG.fn_get_acssObject().styles ],
			alias : [ CONFIG.fn_get_acssObject().alias ],
			types : [ CONFIG.fn_get_acssObject().types ],
			crs : CONFIG.fn_get_dataHouseCrs(),
			height : CONFIG.fn_get_acssObject().height,
			width : CONFIG.fn_get_acssObject().width,
			id : "acss",
			eventListeners : {
				"callback" : function() {
					oAcss.openAcssPop();
				}
			}
		}));
	},

	addEvent : function() {
		$("#aCross").click(function() {
			map.activeControls("acss");
			$(map.div).css("cursor", "pointer");
			return false;
		});
	},

	openAcssPop : function() {
		NUTs.Util.fn_pop_win("/map/popAcss.do", "acssPopup", {
			width : '820px',
			height : '405px',
			left : '100px',
			top : '50px'
		});
	}
};

*//**
 * 차단제수변 조회 Obj
 * 
 * @memberof USV.MAP
 * @member {Object} alisObj
 *//*
var oAlis = {

	init : function() {
		this.addControl();
		this.addEvent();
	},

	addControl : function() {
		map.addControl(new GAlis({
			serviceUrl : CONFIG.fn_get_serviceUrl(),
			layers : [ CONFIG.fn_get_alisObject().layers ],
			types : [ CONFIG.fn_get_alisObject().types ],
			where : [ CONFIG.fn_get_alisObject().where ],
			id : "alis",
			eventListeners : {
				"callback" : function(res) {
					//성공 여부 판별
					if (res.success()) {
						oAlis.showResultAlis(res);
					} else { //요청 실패							
						editor.searchLayer.removeAllFeatures();
						COMMON.showMessage("차단제수변 조회&지정한 위치에 지하 시설물이 없습니다.");
					}
				}
			}
		}));
	},

	addEvent : function() {
		$("#aLis").click(function() {
			map.activeControls("alis");
			$(map.div).css("cursor", "pointer");
			return false;
		});
	},

	showResultAlis : function(res) {
		this.sleep = function(num){	//millisecond
			var now = new Date();
			var stop = now.getTime() + num;
			while(true){
				now = new Date();
				if(now.getTime() > stop)return;
			}
		}

		editor.searchLayer.removeAllFeatures();
		
		var oProcessing = {
				layer : '',
				values : []
		}
		var type = [ 'pipes', 'valves' ];
		var oGData	= MAP_EDITOR.fn_get_objFactory().Util.createGData();

		for ( var i = 0, len = type.length; i <= len; i++) {
			if(i === len){
				SEARCH.fn_call_register(oGData, 'searchSpace');
			}
			else {
				for ( var j = 0, tblLen = res.data[type[i]].length; j < tblLen; j++) {
					oProcessing.layer = res.data[type[i]][j].table;
					for ( var k = 0, idsLen = res.data[type[i]][j].ids.length; k < idsLen; k++) {
						oProcessing.values.push(res.data[type[i]][j].ids[k]);
					}

					var oParams = {
							prefix : CONFIG.fn_get_dataHouseName(),
							tables : [oProcessing.layer],
							fields : ['FID'],
							values : oProcessing.values
					};

					NUTs.WFS.getFeatureByMultiId(CONFIG.fn_get_wfsServiceUrl(), oParams, function(_oRes){
						if(_oRes && _oRes.data && _oRes.data.length > 0)
							oGData.data.push(_oRes.data[0]);
					},
					{
						alias : '',
						titles : ''
					},
					true);
					
					COMMON.sleep(100);
				}
			}
		}
	}
};*/

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 초기화 함수
* @author 이상호(2015.10.12)
*/
var fn_init_fav = function() {
	$(".fav_list").empty();
	$("#popup_favorites #FavAdd select").empty();
	$("#favList").empty();
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 검색 함수
* @author 이상호(2015.10.12)
* @param {String} _sUserId 사용자 아이디
* @param {String} _sGroupName 그룹 이름
*/
var fn_get_favGroup = function(_sUserId,_sGroupName) {
	var aGroupInfo;
	var oFavGroup = {};
	oFavGroup.USER_ID = _sUserId;
	oFavGroup.GROUP_NAME = _sGroupName;
	
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/selectFavGroup.do",
		type : 'post',
		data : {data:JSON.stringify(oFavGroup)},
		dataType : "json",
		async : false,
		success : function(_oData) {
			aGroupInfo = _oData.groupList;
		}
	});
	return aGroupInfo;
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 그룹 생성 함수
* @author 이상호(2015.10.12)
* @param {Object} _oGroupInfo 그룹 정보
* @reutrn {Object} oFavGroup 즐겨찾기 그룹 html object
*/
var fn_create_favGroup = function(_oGroupInfo) {
	var oFavGroup = $("#fav_dummyGroup").clone(true);
	
	oFavGroup.attr('id',_oGroupInfo.GROUP_NAME);
	oFavGroup.find("dt").text(_oGroupInfo.GROUP_NAME);
	oFavGroup.show();
	if(_oGroupInfo.USER_ID == 'common') {
		oFavGroup.find("dd").remove();
	}
	oFavGroup.on('click',function(e){
		if(e.target.tagName != 'IMG' && e.target.tagName != 'INPUT') {
			$(".fav_list dl").removeClass('selectedFavGroup');
			$(this).addClass('selectedFavGroup');
			var oFavInfo = {};
			oFavInfo.USER_ID = _oGroupInfo.USER_ID;
			oFavInfo.GROUP_NAME = _oGroupInfo.GROUP_NAME;
			fn_create_favTag(oFavInfo);
		}
	});
	return	oFavGroup;
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 그룹 html을 append하는 함수
* @author 이상호(2015.10.12)
* @param {String} _sUserId 사용자 정보
* @param {String} _sGroupName 그룹 이름
*/
var fn_create_favGroupTag = function(_sUserId,_sGroupName) {
	var aGroupList = fn_get_favGroup(_sUserId,_sGroupName);
	$(".fav_list").empty();
	$("#popup_favorites #FavAdd select").empty();
	var aHtml = [];
	for(var i in aGroupList) {
		var oGroupInfo = aGroupList[i];
		if(oGroupInfo.USER_ID == 'common' ) {
			$(".fav_list").prepend(fn_create_favGroup(oGroupInfo));
		} else {
			$(".fav_list").append(fn_create_favGroup(oGroupInfo));
		}
		aHtml.push("<option value="+oGroupInfo.GROUP_NAME+">"+oGroupInfo.GROUP_NAME+"</option>");
	}
	$("#popup_favorites #FavAdd select").append(aHtml.join(''));
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 생성 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
* @reutrn {Object} oFavInfo 즐겨찾기 html object
*/
var fn_create_fav = function(_oFavInfo) {
	var oFavInfo = $("#fav_dummy").clone(true);
	
	oFavInfo.attr('id',_oFavInfo.FAV_ID);
	oFavInfo.find(".fav_tx dt").text(_oFavInfo.FAV_NAME);
	oFavInfo.find(".fav_tx dd").text(_oFavInfo.FAV_CONTENT);
	oFavInfo.find(".fav_img img").attr('src',_oFavInfo.FAV_IMG);
	oFavInfo.find(".fav_img img").attr('alt',_oFavInfo.FAV_G2DATA);
	
	oFavInfo.find(".fav_img img").on('click',function(){
		var oExtent = JSON.parse($(this).attr('alt'));
		map.zoomToExtent(new NUTs.Bounds(oExtent.left, oExtent.bottom, oExtent.right, oExtent.top));
	});
	
	if(_oFavInfo.FAV_EXTENT == 1) {
		oFavInfo.addClass("favExtent").trigger("classChange");
	}
	
	oFavInfo.show();
	
	return	oFavInfo;
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 검색 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
* @reutrn {Object} aFavInfo 즐겨찾기 정보
*/
var fn_get_fav = function(_oFavInfo) {
	var aFavInfo;
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/selectFav.do",
		type : 'post',
		data : {data:JSON.stringify(_oFavInfo)},
		dataType : "json",
		async : false,
		success : function(_oData) {
			aFavInfo = _oData.favList;
		}
	});
	return aFavInfo;
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 를 append 하는 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
*/
var fn_create_favTag = function(_oFavInfo) {
	var aFavList = fn_get_fav(_oFavInfo);
	$("#favList").empty();
	for(var i in aFavList) {
		var oFavInfo = aFavList[i];
		$("#favList").append(fn_create_fav(oFavInfo));
	}
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 그룹 수정 함수
* @author 이상호(2015.10.12)
* @param {String} _sUserId 사용자 아이디
* @param {String} _sOldGroupName 즐겨찾기 그룹 이전 이름
* @param {String} _sNewGroupName 즐겨찾기 그룹 새 이름
*/
var fn_update_favGroup = function(_sUserId,_sOldGroupName,_sNewGroupName) {
	var oFavGroup = {};
	oFavGroup.USER_ID = _sUserId;
	oFavGroup.GROUP_NAME_NEW = _sNewGroupName;
	oFavGroup.GROUP_NAME = _sOldGroupName;
	
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/updateFavGroup.do",
		type : 'post',
		data : {data:JSON.stringify(oFavGroup)},
		async : false,
		dataType : 'json',
		success : function(_oData) {
			if(_oData.groupCount == 1) {
				fn_create_favGroupTag(oFavGroup.USER_ID);
			} else {
				COMMON.showMessage("즐겨찾기 수정&같은 이름의 그룹이 있거나 그룹명이 없습니다.");
			}
		},
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 그룹 삭제 함수
* @author 이상호(2015.10.12)
* @param {String} _sUserId 사용자 아이디
* @param {String} _sGroupName 즐겨찾기 그룹 이름
*/
var fn_delete_favGroup = function(_sUserId,_sGroupName) {
	var oFavGroup = {};
	oFavGroup.USER_ID = _sUserId;
	oFavGroup.GROUP_NAME = _sGroupName;
	
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/deleteFavGroup.do",
		type : 'post',
		data : {data:JSON.stringify(oFavGroup)},
		async : false,
		dataType : "json",
		success : function(_oData) {
			if(_oData.groupCount == 1) {
				fn_create_favGroupTag(oFavGroup.USER_ID);
			} else {
				COMMON.showMessage("즐겨찾기 그룹 삭제&즐겨찾기 그룹 삭제에 실패하였습니다.");
			}
		}
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 그룹 추가 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavGroup 즐겨찾기 그룹 정보
*/
var fn_save_favGroup = function(_oFavGroup) {
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/insertFavGroup.do",
		type : 'post',
		data : {data:JSON.stringify(_oFavGroup)},
		async : false,
		dataType : "json",
		success : function(_oData) {
			if(_oData.count == 1) {
				fn_create_favGroupTag(_oFavGroup.USER_ID);
			} else {
				COMMON.showMessage("즐겨찾기 추가&같은 이름의 그룹이 있거나 그룹명이 없습니다.");
			}
		},
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 수정 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
*/
var fn_update_fav = function(_oFavInfo) {
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/updateFav.do",
		type : 'post',
		data : {data:JSON.stringify(_oFavInfo)},
		async : false,
		dataType : 'json',
		success : function(_oData) {
			if(_oData.count == 1) {
				$("#"+_oData.groupName).trigger('click');
			} else {
				COMMON.showMessage("즐겨찾기 수정&같은 이름의 그룹이 있거나 그룹명이 없습니다.");
			}
		},
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 추가 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
*/
var fn_save_fav = function(_oFavInfo) {
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/insertFav.do",
		type : 'post',
		data : {data:JSON.stringify(_oFavInfo)},
		async : false,
		dataType : "json",
		success : function(_oData) {
			if(_oData.count == 1) {
				$("#"+_oData.groupName).trigger('click');
			} else {
				COMMON.showMessage("즐겨찾기 추가&같은 이름의 그룹이 있거나 그룹명이 없습니다.");
			}
		},
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 즐겨찾기 삭제 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
*/
var fn_delete_fav = function(_oFavInfo) {
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/deleteFav.do",
		type : 'post',
		data : {data:JSON.stringify(_oFavInfo)},
		async : false,
		dataType : "json",
		success : function(_oData) {
			if(_oData.count == 1) {
				$("#"+_oData.groupName).trigger('click');
			} else {
				COMMON.showMessage("즐겨찾기 삭제&삭제의 실패하셨습니다.");
			}
		}
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 초기위치 지정 수정 함수
* @author 이상호(2015.10.12)
* @param {Object} _oFavInfo 즐겨찾기 정보
*/
var fn_update_favExtent = function(_oFavInfo) {
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/updateFavExtent.do",
		type : 'post',
		data : {data:JSON.stringify(_oFavInfo)},
		async : false,
		dataType : "json",
		success : function(_oData) {
			if(_oData.count == 1) {
				
			} else {
				COMMON.showMessage("즐겨찾기 초기영역&초기 영역 지정에 실패하셨습니다.");
			}
		}
	});
}

/**
* @memberof USV.MAP
* @method 
* @description 초기 위치 지정 검색 함수
* @author 이상호(2015.10.12)
* @param {String} _sUserId 사용자 아이디
* @return {Object} (NUTs.Bounds) returnExtent 지정한 bounds 정보
*/
var fn_search_favExtent = function(_sUserId) {
	var oFavInfo = {USER_ID:_sUserId};
	var returnExtent = null;
	$.ajax({
		url : COMMON.fn_get_pageContext() + "/selectFavExtent.do",
		type : 'post',
		data : {data:JSON.stringify(oFavInfo)},
		async : false,
		dataType : "json",
		success : function(_oData) {
			if(_oData.favExtent) {
				var oExtent = JSON.parse(_oData.favExtent);
				returnExtent = new NUTs.Bounds(oExtent.left, oExtent.bottom, oExtent.right, oExtent.top);
			}
		}
	});
	return returnExtent;
};


//================================================================================================================
//  imajnet  
//================================================================================================================


function get_imajnet_tile_url(bounds) {
	var res = this.map.getResolution();
	var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	var z = this.map.getZoom();

	return 'http://wipco.imajbox.com/service/api/tile/{"tile":{"x":' + x + ', "y":' + y + ', "zoom":' + z + '}, "timeframe":null}?client=guest01';

}

var fn_add_facilityByImajnet = function(_nX, _nY) {
	debugger;
	var lonlat = new Proj4js.Point(_nX, _nY);

	var sourceCoord = new Proj4js.Proj(wgs84);
	var targetCoord = new Proj4js.Proj(webMercator);
	
	Proj4js.transform(sourceCoord, targetCoord, lonlat); 
	
	if(MAP_EDITOR.fn_check_editMode()) {
		if(editor.editMode) {
			map.deActiveAllControls();
			var sEditingLayerName = COMMON.fn_get_editingLayer();
			var xCoord = lonlat.x;
			var yCoord = lonlat.y;
			if(!COMMON.isNumber(xCoord) || !COMMON.isNumber(yCoord)){
				COMMON.showMessage('편집오류 & 좌표값에는 숫자정보만 입력가능합니다.');
				return;
			}
			else
				MAP_EDITOR.fn_create_featureByXY(sEditingLayerName, xCoord, yCoord,true);
		}
	}

	map.setCenter(lonlat, 14);
	window.setTimeout(function() {$("#btnEditMonitor").trigger("click");}, 1000);
	
};

var fn_init_baseMap = function() {
	// 다음 맵 생성
	fn_create_daumMap(map);

	// 네이버 맵 생성
	//fn_create_naverMap(map);
	
	// 다울 맵 생성
	//fn_create_dawulMap(map);
	// create OSM layer
	
	
	/*var osm = new OpenLayers.Layer.OSM();   
    if (osm != null){map.addLayers([osm]);}*/
    
	/* vworld */
	//vBase = new vworld.Layers.Base('VBASE'); 
    //vSAT = new vworld.Layers.Satellite('VSAT'); 	//2. 영상지도 추가하기
    
    //if (vBase != null){map.addLayers([vBase, vSAT]);}

    //vBase.setVisibility(true);
    //vSAT.setVisibility(false);
    
    //map.setBaseLayer(vBase);
    
    //var switcherControl = new OpenLayers.Control.LayerSwitcher();
    //map.addControl(switcherControl);

};



var fn_activate_imajbox = function(element){
	
	debugger;
	$("#leftCloseBt").trigger("click");
	var nMapWidth = $("#map").width();
	var nMapHeight = $("#map").height();
	//var nIndeMapWidtgh = $("#index").width();
	$("#imajnetContainer").css("left",nMapWidth/2 + "px");
	$("#imajnetContainer").css("width",nMapWidth/2 + "px");
	$("#imajnetContainer").css("height",nMapHeight + "px");
	$("#imajnetContainer").css("top","65px");
	$("#imajnetContainer").show();
	
	var initExtent = new NUTs.Bounds(14155662, 4339078, 14219017, 4367024);	
	map.zoomToExtent(initExtent);
	
	//----------------------------------
	//if(element.hasClass('opacity30')) {
	//    return;
    //}
    
    //Set options for the imajnet plugin
    var options = {
        serverUrl: 'http://wipco.imajbox.com/service',
        cartographicServerUrl: 'http://wipco.imajbox.com',
        //loginRememberMe: true,
        username: 'guest01',
        password: 'guest01',
        containerId: 'imajnetContainer', // Main image container id

        map: map, // Map object reference
        imajnetPath: 'ImajnetLib/', // Path where imajnet files are located
        activateImajnet: true,
        language: 'en',
        unit: 'm', // Optional - (m or feet) unit in which measurement is displayed
        metadata: 'Imajnet SDK', // An identifier for your application
	    goToClosestPointOfInterest: false, // Optional, if true image will load from the closest point of interest to the user
	    sessionType: 'FULL' // Mandatory - 'FULL'(images, projections and other data) or 'LRS'(only LRS requests)
    };
    
    //Activates imajnet
    Imajnet.init(options);
    	
};


var fn_deActivate_imajbox = function(element){
	

	$("#leftOpenBt").trigger("click");
	$("#imajnetContainer").hide();
	

	//----------------------------------
    
    //Deactivates imajnet
    Imajnet.deactivateImajnet(true);
    jQuery('#activateImajnetButton').removeClass('opacity30');
    element.addClass('opacity30');

	
};

var getStyleImajneLayer = function(){
	return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
        	 fillColor: '#CC3B3B',
             fillOpacity: 0.6,
             strokeColor: '#CC0000',
             strokeWidth: 1
        })	
	});
};

setTimeout( function(){
	
	Proj4js.defs['EPSG:900913'] = Proj4js.defs['EPSG:3785'];
	
	
	ImajnetPlugin.addImajnetLayerToMap= function() {
		debugger;
		var tmsLayer = new OpenLayers.Layer.TMS("Imajnet",
				"http://example.com/", {
					'type' : 'png',
					'getURL' : get_imajnet_tile_url,
					'isBaseLayer' : false
				});

		map.addLayers([ tmsLayer ]);
		
		return tmsLayer;
	};
	
	ImajnetPlugin.addVectorLayerToMap = function(name) {
	   
		var vectorLayer = new NUTs.Layer.Vector(name);
		
	    map.addLayer(vectorLayer);
	    return vectorLayer;
	};
	
	ImajnetPlugin.addMarkerLayerToMap= function(name) {
	
		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	     
	    var markerLayer = new OpenLayers.Layer.Markers(name);
	
		map.addLayer(markerLayer);
	
	    return markerLayer;
	}
	
	ImajnetPlugin.removeLayerFromMap = function(layer) {
	    map.removeLayer(layer);
	};
	
	/*ImajnetPlugin.centerMapToPosition = function(position, onlyIfNotVisible) {
		var positionTranform = new OpenLayers.Geometry.Point(position.lon, position.lat).transform(wgs84, webMercator);

		map.setCenter(positionTranform, map.getZoom());
	};*/
	
	ImajnetPlugin.centerMapToPosition = function(position, onlyIfNotVisible) {
		var positionTranform = new OpenLayers.Geometry.Point(position.lon, position.lat).transform(wgs84, webMercator);
		var coords = new OpenLayers.LonLat(positionTranform.x, positionTranform.y);
		map.setCenter(coords, map.getZoom());
		var center = map.getCenter();
		var extent = map.getExtent();
		
		var lon = (extent.right + center.lon)/2;
		map.setCenter(new OpenLayers.LonLat(lon, center.lat));
	};
	
	ImajnetPlugin.getMapScale = function() {

		var scales = [559082565, 279541282, 139770641, 69885320, 34942660, 17471330, 8735665, 4367832, 2183916, 1091958, 545979, 272989, 136494, 68247, 34123, 17061, 8530, 4265, 2132, 1066, 533, 266, 133, 66, 33];
		return scales[ImajnetPlugin.getCurrentZoomLevel()];
	};
	
	ImajnetPlugin.getCurrentZoomLevel = function() {
		return map.getZoom();
	};
	
	ImajnetPlugin.zoomMapTo = function(zoom) {
		if(!zoom) {
			return;
		}
		map.setCenter(map.getCenter(), zoom);
		//map.getView().setZoom(parseInt(zoom));
	};
	
	ImajnetPlugin.zoomMapToFeatureWrapper = function(featureWrapper) {
		var feature = featureWrapper.getFeature();
		if(!feature) {
			return;
		}

		var zoom = 17;
		if(ImajnetPlugin.getCurrentZoomLevel() > zoom) {
			zoom = null;
		}

		map.getView().fit(feature.getGeometry(), map.getSize(), {
			maxZoom: zoom
		});
	};
	
	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
	    defaultHandlerOptions: {
	        'single': true,
	        'double': false,
	        'pixelTolerance': 0,
	        'stopSingle': false,
	        'stopDouble': false
	    },
	
	    initialize: function(options) {
	        this.handlerOptions = OpenLayers.Util.extend(
	            {}, this.defaultHandlerOptions
	        );
	        OpenLayers.Control.prototype.initialize.apply(
	            this, arguments
	        ); 
	        this.handler = new OpenLayers.Handler.Click(
	            this, {
	                'click': this.trigger
	            }, this.handlerOptions
	        );
	    }, 
	
	    trigger: function(e) {
	    	onMapClick(e);
	    }
	
	});
	
	ImajnetPlugin.registerMapEvents = function() {
		var click = new OpenLayers.Control.Click({
			id : "imajnetClick"
		});
		map.addControl(click);
		click.activate();

		map.events.register("moveend", map, onZoomEnd);
	};
	
	ImajnetPlugin.getClosestImage = function(lon, lat) {
		//Set imajnet mode to closest image;
		Imajnet.activateImajnetControl(null, 'closestImage');

		//Pass the coordinates to the imajnet library
		ImajnetMap.mapClickHandler({
		    lon: lon,
		    lat: lat
		});
	};
	
	/*ImajnetPlugin.addMarker = function(markerLayer, markerData) {
		var coords = new OpenLayers.LonLat(markerData.lon, markerData.lat);
		coords = coords.transform(wgs84, webMercator);
		
		
		var marker = new OpenLayers.Marker(coords, new OpenLayers.Icon(markerData.imagePath));
		
		markerLayer.addMarker(marker);		
		//marker.style.externalGraphic = markerData.imagePath;

		
		
		
		var coords = ol.proj.transform([markerData.lon, markerData.lat], 'EPSG:4326', 'EPSG:3857');
		
		
		
		var iconStyle = new ol.style.Style({
			image: new ol.style.Icon(*//** @type {olx.style.IconOptions} *//*
			({
				src: markerData.imagePath
			}))
		});
		var marker = new ol.Feature({
			geometry: new ol.geom.Point(coords)
		});
		

		marker.setStyle(iconStyle);
		markerLayer.getSource().addFeature(marker);
		var featureWrapper = new FeatureWrapper();
		featureWrapper.setFeature(marker);

		if(typeof markerLayer.push === 'function') {
			markerLayer.push(marker);
		}
		return featureWrapper;
	};
*/
	
	
	 ImajnetPlugin.onPinPointCreated = function(pinpointData) {
	        
	        fn_add_facilityByImajnet (pinpointData.point.coordinates.lon, pinpointData.point.coordinates.lat);

     };
	
	ImajnetPlugin.addMarker = function(markerLayer, markerData) {
		var coords = new OpenLayers.LonLat(markerData.lon, markerData.lat);
		coords = coords.transform(wgs84, webMercator);
		
		var marker = new OpenLayers.Marker(coords, new OpenLayers.Icon(markerData.imagePath));
		
		// @ 사용자 마커입력 확인
		if ( markerData.type == 'imagePoint' ){

		}
		else{
			markerLayer.addMarker(marker);		
		}
		
		var featureWrapper = new FeatureWrapper();
		featureWrapper.setFeature(marker);

		if(typeof markerLayer.push === 'function') {
			markerLayer.push(marker);
		}
		
		return featureWrapper;
	};
	
	ImajnetPlugin.removeMarker = function(markerLayer, markerWrapper) {
		if(!markerWrapper) {
			return;
		}
		
		if ( markerLayer instanceof OpenLayers.Layer.Markers )
			markerLayer.removeMarker(markerWrapper.feature);
		else markerLayer.removeFeatures(markerWrapper.feature);		
			
	};
	
	ImajnetPlugin.removeMarkerFeatures = function(vectorLayer, markersWrapper) {
		for(var i = 0, length = markersWrapper.length; i < length; ++i) {
			this.removeMarker(vectorLayer, markersWrapper[i]);
		}
	};
	

	ImajnetPlugin.addFeature = function(vectorLayer, pointsArray, featureOptions) {
		var featureAttributes = null;
		
		var feature = null;

		// Multipolygon to polygon
		if(pointsArray[0] && pointsArray[0][0]) { // TODO implement multipolygonopenlayers2 vector style example
			pointsArray = pointsArray[0];
			if(featureOptions.type == 'MultiPolygon') {
				featureOptions.type = 'Polygon';
			}
		}
		
		// Creates the coordinates array
		var points = new Array();
		for(var i = 0; i < pointsArray.length; i++) {
			points.push(new OpenLayers.Geometry.Point(pointsArray[i].x, pointsArray[i].y).transform(wgs84, webMercator));
		}
		if(featureOptions.type == 'Point') {
			alert('Point feature not implemented');
			return;
		}
		if(featureOptions.type == 'LineString') {
			var lineGeometry = new OpenLayers.Geometry.LineString(points);
			
			feature = new OpenLayers.Feature.Vector(lineGeometry);
		} else if(featureOptions.type == 'Polygon') {
			var ring = new OpenLayers.Geometry.LinearRing(points);
			var polygonGeometry = new OpenLayers.Geometry.Polygon([ring]);
			feature = new OpenLayers.Feature.Vector(polygonGeometry);	
		}
		
		feature.style = { 
			fillColor: featureOptions.fillColor,
			strokeColor: featureOptions.strokeColor,
			fillOpacity: featureOptions.fillOpacity,
			strokeWidth: featureOptions.strokeWidth
		};
		
		vectorLayer.addFeatures(feature);

		var featureWrapper = new FeatureWrapper();
		featureWrapper.setFeature(feature);
		return featureWrapper;
	};

	ImajnetPlugin.removeFeatures = function(vectorLayer, featureWrappers) {
		if(!vectorLayer || featureWrappers.length < 1) {
			return;
		}

		var features = vectorLayer.features;
		if(!features.length) {
			return;
		}
		for(var i = 0, length1 = features.length; i < length1; ++i) {
			for(var j = 0, length2 = featureWrappers.length; j < length2; ++j) {
				if(features[i] == featureWrappers[j].feature) {
					vectorLayer.removeFeatures(featureWrappers[j].feature);
				}
			}
		}
	};

	ImajnetPlugin.removeAllMarkerFeatures = function(markerLayer) {
		//markerLayer.getSource().clear();
		markerLayer.removeAllFeatures();
	};
	
	
	ImajnetPlugin.removeAllMarkersFromLayer = function(layer) {
		if(!layer) {
			return;
		}
		layer.removeAllFeatures();
	};
	

	ImajnetPlugin.removeAllFeatures = function(layer) {
		layer.removeAllFeatures();
	};

	

	function selectStyle(type) {
		if(type == 'Point') {
			return new ol.style.Style({
			    image: new ol.style.Circle({
			        radius: 6,
			        fill: new ol.style.Fill({
				        color: 'rgba(52, 152, 219, 0.5)'
			        }),
			        stroke: new ol.style.Stroke({
			            color: 'blue',
			            width: 3
			        })
			    }),
			    zIndex: 999
			});
		} else if(type == 'LineString') {
			return new ol.style.Style({
			    stroke: new ol.style.Stroke({
			        color: 'rgba(52, 152, 219, 0.5)',
			        width: 16
			    }),
			    zIndex: 999
			});
		} else if(type == 'Polygon') {
			return new ol.style.Style({
			    stroke: new ol.style.Stroke({
			        color: 'rgba(0, 0, 255, 1)',
			        width: 3
			    }),
			    fill: new ol.style.Fill({
				    color: 'rgba(52, 152, 219, 0.5)'
			    }),
			    zIndex: 999
			});
		}
	}
	
	
	ImajnetPlugin.selectFeature = function(vectorLayer, markerWrapper) {
	    if(!markerWrapper) {
		    return;
	    }
	    if(markerWrapper.length) {
	        for(var i = 0; i < markerWrapper.length; i++) {
	           highlightFeature(markerWrapper[i].feature);
	        }
	    } else {
	        highlightFeature(markerWrapper.feature);
	    }
	};
	
	ImajnetPlugin.unselectFeature = function(vectorLayer, markerWrapper) {
	    if(!markerWrapper) {
		    return;
	    }
	    if(markerWrapper.length) {
	        for(var i = 0; i < markerWrapper.length; i++) {
	           removeSelect(markerWrapper[i].feature);
	        }
	    } else {
	        removeSelect(markerWrapper.feature);
	    }
	};
	
	ImajnetPlugin.selectMarker = function(markerLayer, markerWrapper) {
	    if(!markerWrapper) {
		    return;
	    }
	    highlightFeature(markerWrapper.feature);
	};

	ImajnetPlugin.unselectMarker = function(markerLayer, markerWrapper) {
	    if(!markerWrapper) {
		    return;
	    }
	    removeSelect(markerWrapper.feature);
	};
	
	function highlightFeature(feature) {
		/*if(feature.get('isSelected')) {
			return;
		}
		var type = feature.getGeometry().getType();
		var style = getStyleFromFeature(feature);
		style.push(selectStyle(type));
		feature.setStyle(style);
		feature.set('isSelected', true);
*/
	}
	

	function removeSelect(feature) {
		/*if(!feature.get('isSelected')) {
			return;
		}
		feature.getStyle().pop();
		feature.setStyle(feature.getStyle());
		feature.set('isSelected', false)*/
	}

	function getStyleFromFeature(feature) {

		var style = feature.getStyle();
		if(!style) {
			style = getLayerByName(feature.getGeometry().getType()).getStyle();
		}	
		if(typeof style == 'function') {
			style = style(feature);
		}
		if(!jQuery.isArray(style)) {
			style = [style];
		}

		return style.slice(0);
	}

	
	
	ImajnetPlugin.onImajnetActivated = function() {
		Imajnet.activateImajnetControl(null, 'closestImage');
		console.log('activated');
	}
	
	ImajnetPlugin.onImajnetDeactivated = function() {
		console.log('deactivated');
	}
	
	function onMapClick(event) {

		var lonlat = map.getLonLatFromPixel(event.xy);

		lonlat = lonlat.transform(webMercator, wgs84);
		debugger;
		ImajnetPlugin.getClosestImage(lonlat.lon, lonlat.lat);
	}

	function onZoomEnd(event) {
		ImajnetMap.mapZoomEndHandler();
	};

	function setLayerZIndex(layer, zIndex) {
		layer.setZIndex(zIndex);
	};

	function showImajnetItem(id, width, height) {
		jQuery('#' + id).show();
	};
	
}
,3000);

//------------------------------------------------------------------------------------------------------------------
//$$ public 프로퍼티
//------------------------------------------------------------------------------------------------------------------
_mod_map.oDrawTool							=	oDrawTool;
_mod_map.bLogWrite							=	bLogWrite;
//------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------
//## public 메소드
//------------------------------------------------------------------------------------------------------------------
_mod_map.fn_init_map					= 	fn_init_map;
_mod_map.fn_redraw_wms					=	fn_redraw_wms;
_mod_map.fn_bind_fullLegendGraphic		= 	fn_bind_fullLegendGraphic;
_mod_map.fn_bind_currentLegendGraphic	= 	fn_bind_currentLegendGraphic;
_mod_map.fn_write_log					= 	fn_write_log;
_mod_map.fn_get_drawTool				=	fn_get_drawTool;
_mod_map.fn_get_dataTool				=	fn_get_dataTool;
_mod_map.fn_set_layerStyles				=	fn_set_layerStyles;
_mod_map.fn_set_layerTree				=	fn_set_layerTree;
_mod_map.fn_set_userTmapId				=	fn_set_userTmapId;
_mod_map.fn_get_userInfo				=	fn_get_userInfo;

_mod_map.fn_set_userId					=	fn_set_userId;
_mod_map.fn_get_userId					=	fn_get_userId;

_mod_map.fn_get_layerStyles				=	fn_get_layerStyles;
_mod_map.fn_get_treeSelectedLayers		=	fn_get_treeSelectedLayers;
_mod_map.fn_set_treeSelectedLayers		=	fn_set_treeSelectedLayers;
_mod_map.fn_get_resolution				=	fn_get_resolution;
_mod_map.fn_check_userAuthor			=	fn_check_userAuthor;

_mod_map.fn_init_divLayerTree			=	fn_init_divLayerTree;
_mod_map.fn_init_divAllLayerTree		=	fn_init_divAllLayerTree;
_mod_map.fn_init_divSelLayerTree		=	fn_init_divSelLayerTree;
_mod_map.fn_create_mapImage				=	fn_create_mapImage;
_mod_map.fn_move_layerTree				=	fn_move_layerTree;
_mod_map.fn_load_layerTree				=	fn_load_layerTree;
_mod_map.fn_show_dataLoading			=	fn_show_dataLoading;
_mod_map.fn_hide_dataLoading			=	fn_hide_dataLoading;
_mod_map.fn_create_mapBase64Image		=	fn_create_mapBase64Image;
//_mod_map.fn_leftTab_control				=	fn_leftTab_control;

_mod_map.fn_init_shpLoading				=	fn_init_shpLoading;
_mod_map.fn_init_acssService 			= 	fn_init_acssService;
_mod_map.fn_init_alisService 			= 	fn_init_alisService;
_mod_map.fn_init_baseMap 				= 	fn_init_baseMap;
_mod_map.fn_init_geocoding 				= 	fn_init_geocoding;
_mod_map.fn_get_daumMap 				= 	fn_get_daumMap;
_mod_map.fn_get_naverMap 				= 	fn_get_naverMap;
_mod_map.fn_get_subjectInfo				= 	fn_get_subjectInfo;
_mod_map.fn_show_external2dMap 			= 	fn_show_external2dMap;
_mod_map.fn_show_externalSateliteMap 	= 	fn_show_externalSateliteMap;
_mod_map.fn_toggle_memoList 			= 	fn_toggle_memoList;
_mod_map.fn_change_baseMap 				= 	fn_change_baseMap;
_mod_map.fn_save_memo 					= 	fn_save_memo;
_mod_map.fn_save_subject				= 	fn_save_subject;
_mod_map.fn_update_memo 				= 	fn_update_memo;
_mod_map.fn_get_memo 					= 	fn_get_memo;
_mod_map.fn_get_memo_hist				= 	fn_get_memo_hist;
_mod_map.fn_delete_memo 				= 	fn_delete_memo;
_mod_map.fn_image_resize				= 	fn_image_resize;
_mod_map.fn_init_fav					= 	fn_init_fav;
_mod_map.fn_create_favGroupTag			= 	fn_create_favGroupTag;
_mod_map.fn_save_favGroup				= 	fn_save_favGroup;
_mod_map.fn_update_favGroup				= 	fn_update_favGroup;
_mod_map.fn_delete_favGroup				= 	fn_delete_favGroup;
_mod_map.fn_create_favTag				= 	fn_create_favTag;
_mod_map.fn_update_fav					= 	fn_update_fav;
_mod_map.fn_save_fav					= 	fn_save_fav;
_mod_map.fn_delete_fav					= 	fn_delete_fav;
_mod_map.fn_search_favExtent			= 	fn_search_favExtent;
_mod_map.fn_update_favExtent			= 	fn_update_favExtent;

_mod_map.fn_activate_imajbox			= 	fn_activate_imajbox;
_mod_map.fn_deActivate_imajbox			= 	fn_deActivate_imajbox;
//------------------------------------------------------------------------------------------------------------------



return _mod_map;

}(USV.MAP || {}, jQuery));