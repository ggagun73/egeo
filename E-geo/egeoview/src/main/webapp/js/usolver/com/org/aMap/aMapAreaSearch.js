var m_AreaSearchToolbar;
var m_AreaSearchLayerId;
var m_AreaSearchOIDs = [];
var m_AreaSearchType;
var m_AreaSearchFeatureSet;
var m_AreaSearchGraphicLayer;
var m_AreaSearchInfoTemplateGraphicLayer;

//영역검색 toolbar 세팅
function fnSetAreaSearchToolbar(type) {
	m_AreaSearchLayerId = $("#sel_AreaSearchLayer").val();
	
	if (m_AreaSearchLayerId == "none") {
		$("#mapCtrl1").click();
		alert("검색할 레이어를 선택해주세요!");
	} else {
		if (m_AreaSearchGraphicLayer == undefined) {
			m_AreaSearchGraphicLayer = new esri.layers.GraphicsLayer();
			m_MainMap.addLayer(m_AreaSearchGraphicLayer);	
		}
		if (m_AreaSearchInfoTemplateGraphicLayer == undefined) {
			m_AreaSearchInfoTemplateGraphicLayer = new esri.layers.GraphicsLayer();
			m_MainMap.addLayer(m_AreaSearchInfoTemplateGraphicLayer);	
		}
		
		m_MainMap.setMapCursor("url(/images/cur/DOASidentify.cur), auto");
		_navToolbar.deactivate();
		m_AreaSearchToolbar = new esri.toolbars.Draw(m_MainMap);
		m_AreaSearchToolbar.on("draw-end", fnAddGraphicToMap);
		m_AreaSearchToolbar.activate(esri.toolbars.Draw[type]);

		m_AreaSearchType = type;
	}
	$("#dvAreaSearch").show();
}

//영역검색 그래픽 지도에 표출
function fnAddGraphicToMap(evt) {
	m_AreaSearchGraphicLayer.clear();
	m_AreaSearchInfoTemplateGraphicLayer.clear();
	m_MainMap.infoWindow.hide();
	
	var symbol;
	switch (evt.geometry.type) {
		case "point":
			symbol = new esri.symbol.SimpleMarkerSymbol();
		case "multipoint":
			symbol = new esri.symbol.SimpleMarkerSymbol();
			break;
		case "polyline":
			symbol = new esri.symbol.SimpleLineSymbol();
			break;
		case "polygon":
			symbol = new esri.symbol.SimpleFillSymbol();
			break;
	}
	m_AreaSearchGraphicLayer.add(new esri.Graphic(evt.geometry, symbol)); //영역검색한 영역 그리기
	var centroidPt = evt.geometry.getCentroid();	//무게중심점
	var outPt = evt.geometry.getPoint(0, 0);	//시작점
	var centerPt = evt.geometry.getExtent().getCenter();	//중심 포인트
	//반지름 m로 표현
	var length = Math.abs(esri.geometry.getLength(centroidPt, outPt));
	var strLength = setNumComma(parseInt(length)) + "m";
	//반지름 라인 표현
	var linePath = new esri.geometry.Polyline({"wkid" : _wkid}).addPath([centroidPt, outPt]);
	
	m_AreaSearchGraphicLayer.add(new esri.Graphic(centroidPt, fnGetTextSymbol(15, "bolder", "white", "middle", 0, 0, 0, "Malgun Gothic", strLength)));
	m_AreaSearchGraphicLayer.add(new esri.Graphic(linePath, fnGetPolylineSymbol("solid", "white", 2)));
	
	fnExcuteAreaSearch(evt.geometry);
}

/*
 * 버퍼검색 쿼리 task 조작
 * Development Date : 2014.05.19
 * Developer : 최규용
 */
function fnExcuteAreaSearch(geom) {
	var query = new esri.tasks.Query();
	query.where = "1=1";
	query.outFields = ["*"];
	query.returnGeometry = true;
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	query.geometry = geom;

	var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + m_AreaSearchLayerId);
	queryTask.execute(query, fnExcuteAreaSearchResult);
}

function fnExcuteAreaSearchResult(featureSet) {
	if (featureSet.features.length == 0) {
		alert("검색결과가 없습니다.");
		return;
	}
	m_AreaSearchOIDs = [];
	m_AreaSearchFeatureSet = featureSet;
	
	for (var i = 0; i < featureSet.features.length; i++) {
		fnExcuteAreaSearchFindTaskSearch(featureSet.features[i].attributes.OBJECTID);
		m_AreaSearchOIDs.push(featureSet.features[i].attributes.OBJECTID);
	}
	
	dojo.connect(m_AreaSearchInfoTemplateGraphicLayer, "onClick", function (evt) {
		var g = evt.graphic;
		if (g.infoTemplate == undefined) return;
		m_MainMap.infoWindow.setContent(g.getContent());
		m_MainMap.infoWindow.setTitle(g.getTitle());
		m_MainMap.infoWindow.show(evt.screenPoint, m_MainMap.getInfoWindowAnchor(evt.screenPoint));
	});

	//마우스가 심볼위에 올라갈시 화살표
	dojo.connect(m_AreaSearchInfoTemplateGraphicLayer, "onMouseMove", function () {
		m_MainMap.setMapCursor("url(/images/cur/IDENTIFY2.cur), auto");
		m_AreaSearchToolbar.deactivate();
	});

	//마우스가 심볼위에서 벗어날시 손바닥
	dojo.connect(m_AreaSearchInfoTemplateGraphicLayer, "onMouseOut", function () {
		m_MainMap.setMapCursor("url(/images/cur/DOASidentify.cur), auto");
		m_AreaSearchToolbar.activate(esri.toolbars.Draw[m_AreaSearchType]);
	});

	//대장 목록 조회
	getCaptionListSearch(getLayerNM(basemap, m_AreaSearchLayerId));
}

/*
 * 정보조회(목록) 대장 영문명 조회
 * Development Date : 2014.07.17
 * Developer : 최규용
 */
function getCaptionListSearch(layerName) {
	document.mapFrm.LAYERNAME.value = layerName;
	document.mapFrm.action = "/etc/etcUsvCompListSearch.do";
	document.mapFrm.target = "hiddentarget";
	document.mapFrm.submit();
}

/*
 * 정보조회검색 결과
 * Development Date : 2014.07.17
 * Developer : 최규용
 */
function fnExcuteAreaSearchFindTaskSearch(oid) {
	var find = new esri.tasks.FindTask(urlBasemap);
	var params = new esri.tasks.FindParameters();
	params.layerIds = [m_AreaSearchLayerId];
	params.searchFields = ["OBJECTID"];
	params.returnGeometry = true;
	params.searchText = oid;
	find.execute(params, fnExcuteAreaSearchFindTaskSearchResult);
}

/////////////////////////////////
function fnExcuteAreaSearchFindTaskSearchResult(results) {
	var geom = results[0].feature.geometry;
	var g = new esri.Graphic();
	if (results[0].geometryType == 'esriGeometryPoint') {
		var circleGeom = new esri.geometry.Circle(new esri.geometry.Point(geom), {radius : 1});
		g = new esri.Graphic(circleGeom, fnGetPolygonSymbol("solid", "aqua", "null", "", 0));
	} else if (results[0].geometryType == 'esriGeometryPolygon') {
		g = new esri.Graphic(geom, fnGetPolygonSymbol("solid", "aqua", "null", "", 0));
	} else if (results[0].geometryType == 'esriGeometryPolyline') {
		g = new esri.Graphic(geom, fnGetPolylineSymbol("solid", "aqua", 3));
	}
	m_AreaSearchInfoTemplateGraphicLayer.add(g);

	var content = "";
	for (var i = 0; i < (m_AreaSearchFeatureSet.fields.length - 2); i++) {
		//필드 별칭
		var alias = m_AreaSearchFeatureSet.fields[i].alias;
		//필드 명
		var value = "";
		if (alias != 'OBJECTID') {
			var value = eval("results[0].feature.attributes[\"" + alias + "\"]");
			content += alias + " : " + value + "<br/>";
		}
	}

	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.setTitle("상세조회");
	infoTemplate.setContent(content);
	m_AreaSearchInfoTemplateGraphicLayer.setInfoTemplate(infoTemplate);
}

//정보조회 내 대장목록 조회
function fnListDjIdentify() {
	var tableName = getLayerNM(basemap, m_AreaSearchLayerId);
	var tableId = prog_id;

	var url = "";
	var doFileName = "";
	var category = tableId.substr(0, 3);
	var tableIdTranUpper = tableId.replace(/_/gi, '');
	var tableIdTranLower = tableIdTranUpper.toLowerCase();
	var tableIdUpper1 = tableIdTranUpper.substr(3, 1);
	var tableIdUpper2 = tableIdTranUpper.substr(7, 1);

	doFileName = category.toLowerCase() + tableIdUpper1 + tableIdTranLower.substr(4, 3) + tableIdUpper2 + tableIdTranLower.substr(8);

	if (category == 'RDT') { //도로관리
		url = "/road/" + doFileName + "List.do?OBJECTID=";
	} else if (category == 'RDL') { //도로관리
		url = "/road/" + doFileName + "List.do?OBJECTID=";
	} else if (category == 'WTL') { //상수
		url = "/water/" + doFileName + "List.do?OBJECTID=";
	} else if (category == 'WTT') { //상수
		url = "/water/" + doFileName + "List.do?OBJECTID=";
	} else if (category == 'SWL') { //하수
		url = "/sewer/" + doFileName + "List.do?OBJECTID=";
	} else if (category == 'SWT') { //하수
		url = "/sewer/" + doFileName + "List.do?OBJECTID=";
	}

	cfWindowOpen(tableName + " 검색", url + m_AreaSearchOIDs.join(), 1000, 350, false, '');
}