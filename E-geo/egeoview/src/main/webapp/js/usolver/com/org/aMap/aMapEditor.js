var webUisEditDrawTool;
var _EditFeatureLayer;
var _wtlSplyLsFeatureLayer;
var _wtlPipeLmFeatureLayer;
var blinkRefreshIntervalId;
var m_FlashGraphicLayer;
var _IsLayerOn = false;
var blinkRefreshIntervalIds = [];

function fnSetEditFeatureLayer(_layerName, _id, tmp) {
	var  layerId = getLayerId(basemap, _layerName);
    var urlLayer = serverIp+"/arcgis/rest/services/bcuis_main/FeatureServer/" + layerId;
    if (tmp == "WTL_SPLY_LS") {
    	_wtlSplyLsFeatureLayer = new esri.layers.FeatureLayer(urlLayer, {
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            id:_id
        });
    } else if (tmp == "WTL_PIPE_LM"){
    	_wtlPipeLmFeatureLayer = new esri.layers.FeatureLayer(urlLayer, {
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            id:_id
        });
    } else {
        _EditFeatureLayer = new esri.layers.FeatureLayer(urlLayer, {
            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            id:_id
        });
    }
}
function fnIsEditLayerOn(_layerName) {
	if (m_MeasureToolbar != undefined) m_MeasureToolbar.deactivate();
	if (_navToolbar != undefined) _navToolbar.deactivate();
	if (identifyListToolbar != undefined) identifyListToolbar.deactivate();
	if (crossSectionToolbar != undefined) crossSectionToolbar.deactivate();
	if (topographToolbar != undefined) topographToolbar.deactivate();
	if (webUisEditDrawTool != undefined) webUisEditDrawTool.deactivate();
	if (m_AreaSearchToolbar != undefined) m_AreaSearchToolbar.deactivate();
	if (m_UserGraphicToolbar != undefined) m_UserGraphicToolbar.deactivate();
	if (m_DrawEditToolbar != undefined) m_DrawEditToolbar.deactivate();
	
	_IsLayerOn = ($.inArray(getLayerId(basemap, _layerName), m_VisibleLayers) >= 0);
}
//보안등 입력
function fnMapInsertRdlScltPs() {
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			auth_id : "RDL_SCLT_PS" 
		},
		contentType : "application/json; charset=utf-8",
		url: "/getMng_auth_prof.do",
		success: function(data) {
			if (data.mng_auth_prof == "W") {
				fnIsEditLayerOn("보안등");
				if (!_IsLayerOn) {
					alert("레이어관리에서 보안등을 켜신 후 실행하시기 바랍니다.");
					return;
				}
				if (m_MainMap.getScale() > 3000) {
		            alert("지도를 좀 더 확대하신 후 실행하시기 바랍니다.(1:3000 이상)");
				} else {
					alert("보안등을 입력할 위치를 선택하세요.");
					m_MainMap.setMapCursor('crosshair');
				    //Feature Layer 추가
					fnSetEditFeatureLayer("보안등", "RDL_SCLT_PS");
					webUisEditDrawTool = new esri.toolbars.Draw(m_MainMap);
					webUisEditDrawTool.activate(esri.toolbars.Draw.POINT);
				    webUisEditDrawTool.on("draw-end",fnMapInsertRdlScltPsAttribute);
				}
			} else {
	            alert("보안등 입력에 대한 권한이 없습니다.");
			}
		},
		error: function(xhr, status, error) {
            alert("권한정보를 가져오는데 실패하였습니다.\n관리자에게 문의하세요.");
		}
	});
}
//보안등 속성입력
function fnMapInsertRdlScltPsAttribute(evt){
    var newAttr = {};	//SDE 기본값으로 처리

    var addFeature = new esri.Graphic(evt.geometry, null, newAttr);  
	showResultsFlash(evt.geometry);

    if (!confirm("보안등을 입력하시겠습니까?")) {
        window.clearInterval(blinkRefreshIntervalId);
	    m_FlashGraphicLayer.clear();
    	return;
    }
    m_MainMap.setMapCursor('wait');
	$("#editor_progress").center();
	$("#editor_progress").show();
    
    _EditFeatureLayer.applyEdits([addFeature], null, null,
        function(featureSet){
            var objectid = featureSet[0].objectId;

        	$.ajax({
        		type: "get",
        		dataType: "json",
        		data: {
        			TABLENAME : "RDL_SCLT_PS"
        			,TABLEALIAS : "보안등"
        			,OBJECTID : objectid        			
        		},
        		contentType : "application/json; charset=utf-8",
        		url: "/setLayerAttr.do",
        		success: function(data) {
                    basemap.refresh();
                    $("#editor_progress").hide();
                    window.clearInterval(blinkRefreshIntervalId);
        		    m_FlashGraphicLayer.clear();
                    alert("보안등[관리번호:"+data.FTR_IDN+"]이 정상적으로 입력되었습니다. \n해당 대장정보를 입력하여 주시기 바랍니다.");
        		},
        		error: function(xhr, status, error) {
                    $("#editor_progress").hide();
                    alert("필수 속성 입력 항목에 대한 값설정이 실패 했습니다.\n대장에서 정확한 정보를 입력하시기 바랍니다.");
        		},
        		complete: function(data) {
        		    webUisEditDrawTool.deactivate();
        		    mapCtrlHandlerButton("mapCtrl1");
        			cfWindowOpen("보안등 대장", '/road/rdlScltPsRU.do?OBJECTID=' + objectid, 630, 690, false, '', 'center');
        		}
        	});
        },
        function(res){
		    webUisEditDrawTool.deactivate();
            mapCtrlHandlerButton("mapCtrl1");
            alert("보안등 도형입력에 실패 했습니다.\n관리자에게 문의하세요.");
        }
    );   
}
//굴착허가위치 입력
function fnMapInsertRdlExcvAs() {
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			auth_id : "RDL_EXCV_AS" 
		},
		contentType : "application/json; charset=utf-8",
		url: "/getMng_auth_prof.do",
		success: function(data) {
			if (data.mng_auth_prof == "W") {
				fnIsEditLayerOn("굴착허가위치");
				if (!_IsLayerOn) {
					alert("레이어관리에서 굴착허가위치를 켜신 후 실행하시기 바랍니다.");
					return;
				}
				if (m_MainMap.getScale() > 3000) {
		            alert("지도를 좀 더 확대하신 후 실행하시기 바랍니다.(1:3000 이상)");
				} else {
					alert("굴착허가위치를 입력할 위치를 선택하세요.");
					m_MainMap.setMapCursor('crosshair');
				    //Feature Layer 추가
					fnSetEditFeatureLayer("굴착허가위치", "RDL_EXCV_AS");
					webUisEditDrawTool = new esri.toolbars.Draw(m_MainMap);
			        webUisEditDrawTool.activate(esri.toolbars.Draw.POLYGON);
				    webUisEditDrawTool.on("draw-end",fnMapInsertRdlExcvAsAttribute);
				}
			} else {
	            alert("굴착허가위치 입력에 대한 권한이 없습니다.");
			}
		},
		error: function(xhr, status, error) {
            alert("권한정보를 가져오는데 실패하였습니다.\n관리자에게 문의하세요.");
		}
	});
}
//굴착허가위치 속성입력
function fnMapInsertRdlExcvAsAttribute(evt){
    var newAttr = {};	//SDE 기본값으로 처리
    
    var addFeature = new esri.Graphic(evt.geometry, null, newAttr);  
     
	showResultsFlash(evt.geometry);

    if (!confirm("굴착허가위치를 입력하시겠습니까?")) {
        window.clearInterval(blinkRefreshIntervalId);
	    m_FlashGraphicLayer.clear();
    	return;
    }
    m_MainMap.setMapCursor('wait');
	$("#editor_progress").center();
	$("#editor_progress").show();
    
    _EditFeatureLayer.applyEdits([addFeature], null, null,
        function(featureSet){
            var objectid = featureSet[0].objectId;

        	$.ajax({
        		type: "get",
        		dataType: "json",
        		data: {
        			TABLENAME : "RDL_EXCV_AS" 
        			,TABLEALIAS : "굴착허가위치"
        			,OBJECTID : objectid
        		},
        		contentType : "application/json; charset=utf-8",
        		url: "/setLayerAttr.do",
        		success: function(data) {
                    basemap.refresh();
                    $("#editor_progress").hide();
                    window.clearInterval(blinkRefreshIntervalId);
        		    m_FlashGraphicLayer.clear();
                    alert("굴착허가위치[관리번호:"+data.FTR_IDN+"]이 정상적으로 입력되었습니다. \n해당 대장정보를 입력하여 주시기 바랍니다.");
        		},
        		error: function(xhr, status, error) {
                    $("#editor_progress").hide();
                    alert("필수 속성 입력 항목에 대한 값설정이 실패 했습니다.\n대장에서 정확한 정보를 입력하시기 바랍니다.");
        		},
        		complete: function(data) {
        		    webUisEditDrawTool.deactivate();
        		    mapCtrlHandlerButton("mapCtrl1");
        		    cfWindowOpen( "굴착허가위치 대장", '/road/rdlExcvAsRU.do?OBJECTID='+objectid, 831, 805, false, '', 'center');
        		}
        	});
        },
        function(res){
		    webUisEditDrawTool.deactivate();
		    mapCtrlHandlerButton("mapCtrl1");
            alert("굴착허가위치 도형입력에 실패 했습니다.\n관리자에게 문의하세요.");
        }
    );   
}
//급수관로 입력
function fnMapInsertWtlSplyLs() {
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			auth_id : "WTL_SPLY_LS" 
		},
		contentType : "application/json; charset=utf-8",
		url: "/getMng_auth_prof.do",
		success: function(data) {
			if (data.mng_auth_prof == "W") {
				fnIsEditLayerOn("상수관로");
				if (!_IsLayerOn) {
					alert("레이어관리에서 상수관로을 켜신 후 실행하시기 바랍니다.");
					return;
				}
				fnIsEditLayerOn("급수관로");
				if (!_IsLayerOn) {
					alert("레이어관리에서 급수관로을 켜신 후 실행하시기 바랍니다.");
					return;
				}
				fnIsEditLayerOn("급수전계량기");
				if (!_IsLayerOn) {
					alert("레이어관리에서 급수전계량기을 켜신 후 실행하시기 바랍니다.");
					return;
				}
				fnIsEditLayerOn("소방시설");
				if (!_IsLayerOn) {
					alert("레이어관리에서 소방시설을 켜신 후 실행하시기 바랍니다.");
					return;
				}
				if (m_MainMap.getScale() > 3000) {
		            alert("지도를 좀 더 확대하신 후 실행하시기 바랍니다.(1:3000 이상)");
				} else {
					alert("급수관로를 입력할 위치를 선택하세요.");
					m_MainMap.setMapCursor('crosshair');
				    //Feature Layer 추가
					fnSetEditFeatureLayer("상수관로", "WTL_PIPE_LM", "WTL_PIPE_LM");
					fnSetEditFeatureLayer("급수관로", "WTL_SPLY_LS");
					webUisEditDrawTool = new esri.toolbars.Draw(m_MainMap);
			        webUisEditDrawTool.activate(esri.toolbars.Draw.POLYLINE);
				    webUisEditDrawTool.on("draw-end",fnMapInsertWtlSplyLsAttribute1);
				}
			} else {
	            alert("급수관로 입력에 대한 권한이 없습니다.");
			}
		},
		error: function(xhr, status, error) {
            alert("권한정보를 가져오는데 실패하였습니다.\n관리자에게 문의하세요.");
		}
	});
}
//급수관로 속성입력
function fnMapInsertWtlSplyLsAttribute1(evt){
    var query = new esri.tasks.Query();
    query.geometry = evt.geometry;
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CROSS; 
    _wtlPipeLmFeatureLayer.queryFeatures(query, function(pipeFeatureSet){
    	if (pipeFeatureSet.features.length == 0) {
    		_EditFeatureLayer.queryFeatures(query, function(splyFeatureSet){
    	    	if (splyFeatureSet.features.length == 0) {
    	    		alert("상수관로 혹은 급수관과 교차하는 지점을 찾을 수 없습니다.");
    	    		return;
    	    	} else {
    	    		var s1, e1, s2, e2, intersectingPoint;
    	    		
    	    		geometryService.cut([evt.geometry], splyFeatureSet.features[0].geometry, function(cutGeometries){
    	    			if (JSON.stringify(cutGeometries.geometries[0].getPoint(0, 1))
    	    					== JSON.stringify(cutGeometries.geometries[1].getPoint(0, 0))) {
        	    			intersectingPoint = cutGeometries.geometries[0].getPoint(0, 1);
    	    			} else {
    	    				intersectingPoint = cutGeometries.geometries[1].getPoint(0, 1);
    	    			}
    	    			fnMapInsertWtlSplyLsAttribute2(evt.geometry, intersectingPoint);
    	    		});
    	    		
            		/*for ( var i = 0; i < splyFeatureSet.features[0].geometry.paths[0].length - 1; i++) {
                		s1 = splyFeatureSet.features[0].geometry.getPoint(0, i);
                		e1 = splyFeatureSet.features[0].geometry.getPoint(0, i + 1);
                		for ( var j = 0; j < evt.geometry.paths[0].length - 1; j++) {
                			s2 = evt.geometry.getPoint(0, j);
                			e2 = evt.geometry.getPoint(0, j + 1);
            	    		intersectingPoint = esri.geometry.getLineIntersection(s1, e1, s2, e2);
						}
					}
    	    		fnMapInsertWtlSplyLsAttribute2(evt.geometry, intersectingPoint);*/
    	    	}
    	    });
    	} else {
    		var s1, e1, s2, e2, intersectingPoint;
    		
    		geometryService.cut([evt.geometry], pipeFeatureSet.features[0].geometry, function(cutGeometries){
    			var paths = evt.geometry.paths[0];
    			var endPoint = evt.geometry.getPoint(0,paths.length-1);
    			if (JSON.stringify(cutGeometries.geometries[0].getPoint(0, 1))
    					== JSON.stringify(cutGeometries.geometries[1].getPoint(0, 0))) {
	    			intersectingPoint = cutGeometries.geometries[0].getPoint(0, 1);
    			} else {
    				intersectingPoint = cutGeometries.geometries[1].getPoint(0, 1);
    			}
    			fnMapInsertWtlSplyLsAttribute2(evt.geometry, intersectingPoint);
    		});
    	}
    });
}
var inputLine;
var endPoint;
function fnMapInsertWtlSplyLsAttribute2(inputGeom, intersectingPoint) {
	var _pointArray = new Array();
	_pointArray.push(intersectingPoint);
	endPoint;
	for ( var i = 0; i < inputGeom.paths[0].length - 1; i++) {
		endPoint = inputGeom.getPoint(0, i + 1);
		_pointArray.push(endPoint);
	}
	
	inputLine = new esri.geometry.Polyline(m_MainMap.spatialReference);
	inputLine.addPath(_pointArray);
     
	showResultsFlash(inputLine);
	
	$("input[name='chkSplyLs']").each(function(){
		$(this).attr("checked", false);
	});
	$("#addFeatureFirePs118").click(function(){	
		if ($("#addFeatureFirePs119").is(":checked")) {
			$("#addFeatureFirePs119").attr("checked", false);
		}
	});
	$("#addFeatureFirePs119").click(function(){
		if ($("#addFeatureFirePs118").is(":checked")) {
			$("#addFeatureFirePs118").attr("checked", false);
		}
	});

    $('#wndSplyLs').center();
    $('#wndSplyLs').show();
}
var vSplyLsObjectID = "", vMetaPsObjectID = "", vFirePsObjectID = "";
function fnMapInsertWtlSplyLsAttribute3() {
	vSplyLsObjectID = ""; vMetaPsObjectID = ""; vFirePsObjectID = "";
    $('#wndSplyLs').hide();
    m_MainMap.setMapCursor('wait');
	$("#editor_progress").center();
	$("#editor_progress").show();

    var newAttr = {};	//SDE 기본값으로 처리
    var addFeature = new esri.Graphic(inputLine, null, newAttr);  
    
    _EditFeatureLayer.applyEdits([addFeature], null, null,
        function(featureSet){
    		vSplyLsObjectID = featureSet[0].objectId;

        	$.ajax({
        		type: "get",
        		dataType: "json",
        		data: {
        			TABLENAME : "WTL_SPLY_LS" 
        			,TABLEALIAS : "급수관로"
        			,OBJECTID : vSplyLsObjectID
        		},
        		contentType : "application/json; charset=utf-8",
        		url: "/setLayerAttr.do",
        		success: function(data) {
        			fnMapInsertWtlSplyLsAttribute4();
        		},
        		error: function(xhr, status, error) {
                    alert("필수 속성 입력 항목에 대한 값설정이 실패 했습니다.\n대장에서 정확한 정보를 입력하시기 바랍니다.");
        		}
        	});
        },
        function(res){
        	editorEnd();
            alert("급수관로 도형입력에 실패 했습니다.\n관리자에게 문의하세요.");
        }
    );   
}
function fnMapInsertWtlSplyLsAttribute4() {
	var newAttr = {"FTR_SEQ":"00"};
	if ($("#addFeatureMetaPs").is(":checked")) {
		fnSetEditFeatureLayer("급수전계량기", "WTL_META_PS");
	    var addFeature = new esri.Graphic(endPoint, null, newAttr);  
	    
	    _EditFeatureLayer.applyEdits([addFeature], null, null,
	        function(featureSet){
	    		vMetaPsObjectID = featureSet[0].objectId;
	        	$.ajax({
	        		type: "get",
	        		dataType: "json",
	        		data: {
	        			TABLENAME : "WTL_META_PS"
            			,TABLEALIAS : "급수전계량기"
	        			,OBJECTID : vMetaPsObjectID
	        		},
	        		contentType : "application/json; charset=utf-8",
	        		url: "/setLayerAttr.do",
	        		success: function(data) {
	        			fnMapInsertWtlSplyLsAttribute5();
	        		},
	        		error: function(xhr, status, error) {
	                    alert("급수전계량기 필수 속성 입력 항목에 대한 값설정이 실패 했습니다.\n대장에서 정확한 정보를 입력하시기 바랍니다.");
	        		}
	        	});
	        },
	        function(res){
	        	editorEnd();
	            alert("급수전계량기 도형입력에 실패 했습니다.\n관리자에게 문의하세요.");
	        }
	    );   
	} else {
		fnMapInsertWtlSplyLsAttribute5();
	}
}
function fnMapInsertWtlSplyLsAttribute5() {
	var newAttr = {};
	var bFirePs = false;
	if ($("#addFeatureFirePs118").is(":checked")) {
		newAttr = {"FTR_CDE":"SA118"};
		bFirePs = true;
	} else if ($("#addFeatureFirePs119").is(":checked")){
		newAttr = {"FTR_CDE":"SA119"};
		bFirePs = true;
	}
	if (!bFirePs) {
		editorEnd();
    	cfWindowOpen("급수관로 대장", '/water/wtlSplyLsRU.do?OBJECTID='+vSplyLsObjectID, 635, 750, false, '', 'center');
    	if (vMetaPsObjectID != "") cfWindowOpen("급수전계량기 대장", '/water/wtlMetaPsRU.do?OBJECTID='+vMetaPsObjectID, 900, 790, false, '', 'center');
		return;
	}
	
	fnSetEditFeatureLayer("소방시설", "WTL_FIRE_PS");
    var addFeature = new esri.Graphic(endPoint, null, newAttr);  
    
    _EditFeatureLayer.applyEdits([addFeature], null, null,
        function(featureSet){
    		vFirePsObjectID = featureSet[0].objectId;
        	$.ajax({
        		type: "get",
        		dataType: "json",
        		data: {
        			TABLENAME : "WTL_FIRE_PS"
        			,TABLEALIAS : "소방시설"
        			,OBJECTID : vFirePsObjectID
        		},
        		contentType : "application/json; charset=utf-8",
        		url: "/setLayerAttr.do",
        		success: function(data) {
                	editorEnd();
        		},
        		error: function(xhr, status, error) {
                    alert("소방시설 필수 속성 입력 항목에 대한 값설정이 실패 했습니다.\n대장에서 정확한 정보를 입력하시기 바랍니다.");
        		},
        		complete: function(data) {
                	cfWindowOpen("급수관로 대장", '/water/wtlSplyLsRU.do?OBJECTID='+vSplyLsObjectID, 635, 750, false, '', 'center');
                	if (vMetaPsObjectID != "") cfWindowOpen("급수전계량기 대장", '/water/wtlMetaPsRU.do?OBJECTID='+vMetaPsObjectID, 900, 790, false, '', 'center');
                	if (vFirePsObjectID != "") cfWindowOpen("소방시설 대장", '/water/wtlFirePsRU.do?OBJECTID='+vFirePsObjectID, 635, 675, false, '', 'center');
        		}
        	});
        },
        function(res){
        	editorEnd();
            alert("소방시설 도형입력에 실패 했습니다.\n관리자에게 문의하세요.");
        }
    );   
}
//급수전계량기 입력
function fnMapInsertWtlMetaPs() {
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			auth_id : "WTL_META_PS" 
		},
		contentType : "application/json; charset=utf-8",
		url: "/getMng_auth_prof.do",
		success: function(data) {
			if (data.mng_auth_prof == "W") {
				fnIsEditLayerOn("급수관로");
				if (!_IsLayerOn) {
					alert("레이어관리에서 급수관로를 켜신 후 실행하시기 바랍니다.");
					return;
				}
				fnIsEditLayerOn("급수전계량기");
				if (!_IsLayerOn) {
					alert("레이어관리에서 급수전계량기를 켜신 후 실행하시기 바랍니다.");
					return;
				}
				if (m_MainMap.getScale() > 3000) {
		            alert("지도를 좀 더 확대하신 후 실행하시기 바랍니다.(1:3000 이상)");
				} else {
					alert("급수전계량기를 입력할 위치를 선택하세요.");
					m_MainMap.setMapCursor('crosshair');
					fnSetEditFeatureLayer("급수관로", "WTL_SPLY_LS", "WTL_SPLY_LS");
					fnSetEditFeatureLayer("급수전계량기", "WTL_META_PS");
					webUisEditDrawTool = new esri.toolbars.Draw(m_MainMap);
			        webUisEditDrawTool.activate(esri.toolbars.Draw.POINT);
				    webUisEditDrawTool.on("draw-end",fnMapInsertWtlMetaPsAttribute);
				}
			} else {
	            alert("급수전계량기 입력에 대한 권한이 없습니다.");
			}
		},
		error: function(xhr, status, error) {
            alert("권한정보를 가져오는데 실패하였습니다.\n관리자에게 문의하세요.");
		}
	});
}
//급수전계량기 속성입력
function fnMapInsertWtlMetaPsAttribute(evt){
	var buffer = 1;
	var params = new esri.tasks.BufferParameters();
    params.geometries = [ evt.geometry ];
    //buffer in linear units such as meters, km, miles etc.
    params.distances = [buffer];
    params.unit = esri.tasks.GeometryService.UNIT_METER;
    params.outSpatialReference = m_MainMap.spatialReference;
    geometryService.buffer(params, function(geometries){
        var query = new esri.tasks.Query();
        query.geometry = geometries[0];
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS; 
        _wtlSplyLsFeatureLayer.queryFeatures(query, function(featureSet){
        	if (featureSet.features.length == 0) {
        		alert("급수관을 찾을 수 없습니다.");
        	} else {
        		var paths = featureSet.features[0].geometry.paths[0];
        		var startPoint = featureSet.features[0].geometry.getPoint(0, 0);
        		var endPoint = featureSet.features[0].geometry.getPoint(0,paths.length-1);
        		var startLength = esri.geometry.getLength(evt.geometry, startPoint);
        		var endLength = esri.geometry.getLength(evt.geometry, endPoint);
        		
        		if (startLength > buffer && endLength > buffer) {
            		alert("급수전계량기를 입력할 위치를 다시 선택하십시요.");
        		} else {
            		var inputPt;
            		if (startLength > endLength) {
            			inputPt  = endPoint;
            		} else {
            			inputPt  = startPoint;
            		}
            	    var newAttr = {};	//SDE 기본값으로 처리

            	    var addFeature = new esri.Graphic(inputPt, null, newAttr);  
            		showResultsFlash(inputPt);

            	    if (!confirm("급수전계량기를 입력하시겠습니까?")) {
            	        window.clearInterval(blinkRefreshIntervalId);
            		    m_FlashGraphicLayer.clear();
            	    } else {
            	    	m_MainMap.setMapCursor('wait');
                		$("#editor_progress").center();
                		$("#editor_progress").show();
                	    
                	    _EditFeatureLayer.applyEdits([addFeature], null, null,
                	        function(featureSet){
                	            var objectid = featureSet[0].objectId;

                	        	$.ajax({
                	        		type: "get",
                	        		dataType: "json",
                	        		data: {
                	        			TABLENAME : "WTL_META_PS"
            	            			,TABLEALIAS : "급수전계량기" 
                	        			,OBJECTID : objectid
                	        		},
                	        		contentType : "application/json; charset=utf-8",
                	        		url: "/setLayerAttr.do",
                	        		success: function(data) {
                	                    basemap.refresh();
                	                    $("#editor_progress").hide();
                	                    window.clearInterval(blinkRefreshIntervalId);
                	        		    m_FlashGraphicLayer.clear();
                	                    alert("급수전계량기[관리번호:"+data.FTR_IDN+"]이 정상적으로 입력되었습니다. \n해당 대장정보를 입력하여 주시기 바랍니다.");
                	        		},
                	        		error: function(xhr, status, error) {
                	                    $("#editor_progress").hide();
                	                    alert("필수 속성 입력 항목에 대한 값설정이 실패 했습니다.\n대장에서 정확한 정보를 입력하시기 바랍니다.");
                	        		},
                	        		complete: function(data) {
                	        		    webUisEditDrawTool.deactivate();
                	        		    mapCtrlHandlerButton("mapCtrl1");
                	        		    cfWindowOpen( "급수전계량기 대장", "/water/wtlMetaPsRU.do?OBJECTID="+objectid, 900, 790, false, '', 'center');
                	        		}
                	        	});
                	        },
                	        function(res){
                    		    webUisEditDrawTool.deactivate();
                    		    mapCtrlHandlerButton("mapCtrl1");
                	            alert("급수전계량기 도형입력에 실패 했습니다.\n관리자에게 문의하세요.");
                	        }
                	    );  
            	    } 
        		}
        	}
        });
    });
}

function showResultsFlash(blinkGeometry) {
    // remove all graphics on the mainMaps graphics layer
	$.each(m_MainMap.graphicsLayerIds, function(i, data) {
		m_MainMap.getLayer(data).clear();
	});
	m_MainMap.graphics.clear();

    // allow different symbols
    var markerSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 8,
    		new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
    				new dojo.Color([0, 0, 0]), 0.5), new dojo.Color([255, 0, 0, 1]));
    var lineSymbol = new esri.symbol.CartographicLineSymbol(esri.symbol.CartographicLineSymbol.STYLE_SOLID,
    		new dojo.Color([0, 255, 255]), 2, esri.symbol.CartographicLineSymbol.CAP_ROUND,
    		esri.symbol.CartographicLineSymbol.JOIN_MITER, 5);
    var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_CROSS,
    		new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
    		new dojo.Color([0, 0, 0]), 0.5), new dojo.Color([255, 0, 0, 1]));

    // figure out which symbol to use      
    var symbol;
    var animStroke_Start_Color = new dojo.Color([0, 0, 0, 1]);
    var animStroke_End_Color = new dojo.Color([255, 0, 0, 1]);
    var animStroke_Start_Width = 0.5;
    var animStroke_End_Width = 0.5;
    if (blinkGeometry.type === "point" || blinkGeometry.type === "multipoint") {
        symbol = markerSymbol;
    } else if (blinkGeometry.type === "line" || blinkGeometry.type === "polyline") {
        symbol = lineSymbol;
        animStroke_Start_Color = new dojo.Color([255, 255, 255, 1]);
        animStroke_End_Color = new dojo.Color([255, 0, 0, 1]);
        animStroke_Start_Width = 2;
        animStroke_End_Width = 2;
    } else {
        symbol = fillSymbol;
    }

    if (m_FlashGraphicLayer == undefined) {
	    m_FlashGraphicLayer = new esri.layers.GraphicsLayer();
	    m_MainMap.addLayer(m_FlashGraphicLayer);
	}

    //m_MainMap.reorderLayer(graphicFlashLayer, 0);

    //graphicFlash.setSymbol(symbol);
    var g = new esri.Graphic(blinkGeometry, symbol);

    //Add graphic to the mainMap graphics layer.
    m_FlashGraphicLayer.add(g);

    //alert("not getting here");
    // using partial: http://dojotoolkit.org/reference-guide/1.9/dojo/_base/lang.html#dojo-base-lang-partial
    
    require(["dojo/_base/lang","dojox/gfx/fx"], function(lang, fx) { 
    	blinkRefreshIntervalId = setInterval(lang.partial(function (animateMe) {
	        var shape = animateMe.getDojoShape();
	        var animStroke = fx.animateStroke({
	            shape: shape,
	            duration: 500,
	            color: {
	                start: animStroke_Start_Color,
	                end: animStroke_End_Color
	            },
	            width: { 
	                start: animStroke_Start_Width,
	                end: animStroke_End_Width
	            }
	        });
	        var animFill = fx.animateFill({
	            shape: shape,
	            duration: 500,
	            color: {
	                start: new dojo.Color([255, 255, 255, 1]),
	                end: new dojo.Color([255, 0, 0, 1])
	            }
	        });
	        if (blinkGeometry.type === "polyline") {
		        dojo.fx.combine([animStroke]).play();
	        } else {	
	        	dojo.fx.combine([animStroke, animFill]).play();
	        }
	    }, g), 500);
    });
}

function fnMapDelete(_layerName, deleteFeatureId, w_opener, w_me) {
	$("#editor_progress").center();
	$("#editor_progress").show();
	var layerId = getLayerId(basemap, _layerName);
    var urlLayer = serverIp+"/arcgis/rest/services/bcuis_main/FeatureServer/" + layerId;
    var _DeleteFeatureLayer = new esri.layers.FeatureLayer(urlLayer, {
        outFields: ["*"],
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
    });
    
    var query = new esri.tasks.Query();
	query.objectIds = [deleteFeatureId];
    
	var vFtrIdn = "", vFtrCde = "";
    _DeleteFeatureLayer.queryFeatures(query, function(featureSet){
    	vFtrIdn = featureSet.features[0].attributes.FTR_IDN;
    	vFtrCde = featureSet.features[0].attributes.FTR_CDE;
    	_DeleteFeatureLayer.applyEdits(null, null, [featureSet.features[0]],function(adds, updates, deletes){
    		if (_layerName == "급수전계량기") { //연관된 호별계량기, 교체이력 삭제
    			$.ajax({
    				type: "get",
    				dataType: "json",
    				data: {
    					FTR_IDN : vFtrIdn 
    				},
    				contentType : "application/json; charset=utf-8",
    				url: "/water/wttMetaDtProcDeleteByFtrIdn.do",
    				error: function(xhr, status, error) {
    					alert(status);
    					alert(error);
    				},
    			});
    		}
    		//유지보수이력 삭제
			$.ajax({
				type: "get",
				dataType: "json",
				data: {
					FTR_CDE : vFtrCde,
					FTR_IDN : vFtrIdn,
					LAYERALIAS : _layerName
				},
				contentType : "application/json; charset=utf-8",
				url: "/common/deleteRWS_HT.do",
				error: function(xhr, status, error) {
					alert(status);
					alert(error);
				},
			});
    		
    		if (w_opener != undefined) w_opener.fnSearch();
            $("#editor_progress").hide();
            alert("삭제되었습니다.");
            if (m_FlashGraphicLayer != undefined) m_FlashGraphicLayer.clear();
            basemap.refresh();
            cfWindowClose(w_me);
        },function(err){
        	if (m_FlashGraphicLayer != undefined) m_FlashGraphicLayer.clear();
            basemap.refresh();
            $("#editor_progress").hide();
        	alert("삭제중 에러가 발생했습니다..\n에러내용 : " + err);
        });
    });
}

function editorEnd() {
	if (webUisEditDrawTool != undefined) webUisEditDrawTool.deactivate();
    m_FlashGraphicLayer.clear();
    window.clearInterval(blinkRefreshIntervalId);
    $("#editor_progress").hide();
    basemap.refresh();
	$("#mapCtrl1").click();
}

//IC대장 위치연결 지도 선택
var rdtInchDt_ftrIdn = "";
function fnConnectRdtInchDtByRdlRdarAs(vFtrIdn) {
	fnIsEditLayerOn("도로면");
	if (!_IsLayerOn) {
		alert("레이어관리에서 도로면을 켜신 후 실행하시기 바랍니다.");
		return;
	}
	if (m_MainMap.getScale() > 5000) {
        alert("지도를 좀 더 확대하신 후 실행하시기 바랍니다.(1:5000 이상)");
        return;
	}
	cfBookHide();
	
	$("#wndConnectRdtInchDtByRdlRdarAs_ul").children().each(function() {
		$(this).remove();
	});

	window.parent.$("#wndConnectRdtInchDtByRdlRdarAs").center();
	window.parent.$("#wndConnectRdtInchDtByRdlRdarAs").css("top", Number(window.parent.$("#wndConnectRdtInchDtByRdlRdarAs").css("top").replace("px", "")) - 200 + "px");
	window.parent.$("#wndConnectRdtInchDtByRdlRdarAs").css("left", Number(window.parent.$("#wndConnectRdtInchDtByRdlRdarAs").css("left").replace("px", "")) - 200 + "px");
	window.parent.$("#wndConnectRdtInchDtByRdlRdarAs").show();

	rdtInchDt_ftrIdn = vFtrIdn;
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			FTR_IDN : vFtrIdn 
		},
		contentType : "application/json; charset=utf-8",
		url: "/AjaxGetIchIdnOID.do",
		success: function(result) {
			for ( var i = 0; i < result.RDA_IDN.length; i++) {
				var vTag = "<li><label><input id='" + result.RDA_IDN[i] + "' type='checkbox' name='chkInchRdaIdn' />" + result.RDA_IDN[i] + "</label></li>";
				$("#wndConnectRdtInchDtByRdlRdarAs_ul").append(vTag);
			}
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}				
	}); 

	m_MainMap.setMapCursor('crosshair');
    
	fnSetEditFeatureLayer("도로면", "RDL_RDAR_AS");
    
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	symbol.style = esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE;
	symbol.setSize(8);
	symbol.setColor(new dojo.Color([255,255,0,0.5]));
	_EditFeatureLayer.setSelectionSymbol(symbol);
	
	selectionToolbar = new esri.toolbars.Draw(m_MainMap);
	selectionToolbar.activate(esri.toolbars.Draw.POINT);

	selectionToolbar.on("draw-end",function(evt){
		var selectQuery = new esri.tasks.Query();
		selectQuery.geometry = evt.geometry;
		selectQuery.returnGeometry = true;
		selectQuery.outFields = ["*"];
		selectQuery.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS; 
		
		//selectionToolbar.deactivate();
		
		//_EditFeatureLayer.selectFeatures(selectQuery, esri.layers.FeatureLayer.SELECTION_NEW);
		_EditFeatureLayer.queryFeatures(selectQuery, function(resultSet){
			if (resultSet.features.length == 0) {
	    		alert("지도 상에서 도로면을 선택하시기 바랍니다.");
			} else {
				var vRdaIdn = resultSet.features[0].attributes.RDA_IDN;
				var vTag = "<li><label><input id='" + vRdaIdn + "' type='checkbox' name='chkInchRdaIdn' />" + vRdaIdn + "</label></li>";
				$("#wndConnectRdtInchDtByRdlRdarAs_ul").append(vTag);
			}
		});
	});
}
function fnConnectRdtInchDtByRdlRdarAsClose() {
	selectionToolbar.deactivate();
	m_MainMap.setMapCursor('default');
	cfBookRestore();
}
//IC대장 위치연결 목록삭제
function fnRemoveInchCheckBox() {
	$("#wndConnectRdtInchDtByRdlRdarAs_ul").find("input[type=checkbox]").each(function() {
		if ($(this).is(":checked")) {
			$(this).parents("li").remove();
		}
	});
}
//IC대장 위치연결 저장
function fnSaveIchIdnInRdlRdarAs() {
	if ($("#wndConnectRdtInchDtByRdlRdarAs_ul").children().length == 0 ) {
		alert("지도 상에서 도로면을 선택하시기 바랍니다.");
		return;
	}
	var vRdaIdns = new Array();
	$("input[name='chkInchRdaIdn']").each(function() {
		vRdaIdns.push($(this).parents("label").text());
	});
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			ICH_IDN : rdtInchDt_ftrIdn,
			RDA_IDN : vRdaIdns.join()
		},
		contentType : "application/json; charset=utf-8",
		url: "/road/rdlRdarAsUpdateByRdtInchDt.do",
		success: function(result) {
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete : function() {
			alert("저장되었습니다.");
			fnConnectRdtInchDtByRdlRdarAsClose();
		}				
	}); 
}