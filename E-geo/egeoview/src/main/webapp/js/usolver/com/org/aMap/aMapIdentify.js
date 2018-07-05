var m_IdentifyGraphicLayer;         //정보조회 검색 레이어
var m_IdentifyClickGraphicLayer;	//정보조회 클릭지점 그래픽 레이어

function identifyListToolbarSet() {
	identifyListToolbar = new esri.toolbars.Draw(m_MainMap, {showTooltips : false});
	identifyListToolbar.on("draw-end", identifyListSearch);
	identifyListToolbar.activate(esri.toolbars.Draw.POINT);

	if (m_IdentifyGraphicLayer == undefined) {
		m_IdentifyGraphicLayer = new esri.layers.GraphicsLayer();
		m_MainMap.addLayer(m_IdentifyGraphicLayer);	
	}
	if (m_IdentifyClickGraphicLayer == undefined) {
		m_IdentifyClickGraphicLayer = new esri.layers.GraphicsLayer();
		m_MainMap.addLayer(m_IdentifyClickGraphicLayer);	
	}
}

//정보조회(목록)
function identifyListSearch(evt) {
	var point = new esri.geometry.Point(evt.geometry);
	m_IdentifyClickGraphicLayer.clear();
	m_IdentifyClickGraphicLayer.add(new esri.Graphic(point, fnGetMarkerSymbol("x", "black", 10, "solid", "black", 3)));
	
	var circleGeometry = new esri.geometry.Circle(point, {radius : 1}); //반경 1m근방으로 버퍼 확장
	var identifyTask = new esri.tasks.IdentifyTask(urlBasemap);
	var identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.tolerance = 0;
	//identifyParams.returnGeometry = true;

	/*정보조회 목록 세팅*/
	identifyParams.layerIds = m_VisibleLayers;
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
	identifyParams.width = m_MainMap.width;
	identifyParams.height = m_MainMap.height;
	identifyParams.geometry = circleGeometry;
	identifyParams.mapExtent = m_MainMap.extent;
	identifyTask.execute(identifyParams, identifyListSearchResult);

	//drawPointPictureGraphic("", evt.geometry, null, "/images/icon/sIcon_citizen00.png", 24, 24, 0, 0);
	//identifyListToolbar.deactivate();
}

//정보조회(목록) 좌측 검색 목록
function identifyListSearchResult(idResults) {
	$("#identifyContent").empty();
	if (idResults.length == 0) {
		$("#dvIdentify").hide();
		alert("검색 결과가 없습니다.");
		return;
	}
	var htmlTmp = "";
	var layerNameTmp = "";
	for (var i = 0; i < idResults.length; i++) {
		var layerName = idResults[i].layerName;
		var layerName2 = layerName;
		if (layerName == "도로면") {
			layerName2 = layerName + "_" + idResults[i].feature.attributes["지형지물부호"];
		}
		var objectid = idResults[i].feature.attributes["OBJECTID"];
		if (i == 0) { //최상위 목록의 상세정보 조회
			getCaptionsearch(objectid, layerName2);
		}
		if (layerNameTmp == layerName) {
			htmlTmp += "<li>&nbsp;&nbsp;- <a class='identifyIds' href='javascript:getCaptionsearch(" + objectid + ",\"" + layerName2 + "\");'>" + objectid + "</a></li>";
		} else {
			htmlTmp += "<li>" + layerName + "</li>";
			htmlTmp += "<li>&nbsp;&nbsp;- <a class='identifyIds' href='javascript:getCaptionsearch(" + objectid + ",\"" + layerName2 + "\");'>" + objectid + "</a></li>";
		}
		layerNameTmp = layerName;
	}
	$("#identifyList").html(htmlTmp);
	
	$(".identifyIds").first().css("font-weight", "bolder");
	$(".identifyIds").first().attr("toggle", "on");
	$(".identifyIds").each(function () {
		$(this).mouseover(function () {
			$(this).css("font-weight", "bolder");
		});
		$(this).mouseout(function () {
			if ($(this).attr("toggle") != "on")
				$(this).css("font-weight", "normal");
		});
		$(this).click(function () {
			$(".identifyIds").each(function () {
				$(this).css("font-weight", "normal");
				$(this).attr("toggle", "");
			});
			$(this).css("font-weight", "bolder");
			$(this).attr("toggle", "on");
		});
	});
}

/*
 * 정보조회(목록) 대장 영문명 조회
 * Development Date : 2014.07.17
 * Developer : 최규용
 */
var m_OBJECTID;
function getCaptionsearch(objectid, layerName) {
	m_OBJECTID = objectid;
	_searchTable = (layerName.indexOf("도로면") >= 0) ? "도로면" : layerName;

	document.mapFrm.LAYERNAME.value = layerName;
	document.mapFrm.action = "/etc/etcUsvComponentSearch.do";
	document.mapFrm.target = "hiddentarget";
	document.mapFrm.submit();
}

function getIdentifyListSearch() {
	m_IsMoveExtent = false; //지도이동 방지
	getComplexLocation(_searchTable, [m_OBJECTID]);
	
	var params = new esri.tasks.FindParameters();
	params.layerIds = [getLayerId(basemap, _searchTable)];
	params.searchFields = ["OBJECTID"];
	//params.returnGeometry = true;
	params.searchText = m_OBJECTID;
	
	var findTask = new esri.tasks.FindTask(urlBasemap);
	findTask.execute(params, getIdentifyListResult);
}

/*
 * 정보조회검색 결과
 * Development Date : 2014.07.17
 * Developer : 최규용
 */
function getIdentifyListResult(res) {
	var pContent = "";
	var pFtrCde = "";
	var pRdaIdn = "";
	
	var selectedAttributes = res[0].feature.attributes;
	for (var alias in selectedAttributes) {
		if (selectedAttributes.hasOwnProperty(alias)) {
			if ($.inArray(alias.toUpperCase(), ["OBJECTID", "SHAPE", "SHAPE.LEN", "SHAPE.AREA"]) >= 0) continue;

			var value = selectedAttributes[alias].replace("Null", "");
			if (alias == "지형지물부호") pFtrCde = value;
			if (alias == "관리번호") pRdaIdn = value;

			pContent += "<tr>";
			pContent += "<th scope='row'>" + alias + "</th>";
			pContent += "<td>" + value + "</td>";
			pContent += "</tr>";
		}
	}

	if (compListSize > 0) {
		var html = "<strong>";
		html += "<a href='javascript:fnViewDjIdentify(\"" + _searchTable + "\",\"" + prog_id + "\"," + m_OBJECTID + ",\"" + component_w + "\",\"" + component_h + "\",\"" + pFtrCde + "\",\"" + pRdaIdn + "\");'>";
		html += "<input type='button' value='대장조회'></a></strong>";
		$("#viewSearchBtn").html(html);
	} else {
		$("#viewSearchBtn").empty();
	}

	compListSize = 0;
	$("#identifyContent").html(pContent);
	$("#dvIdentify").show();
}


//정보조회 내 대장 조회
function fnViewDjIdentify(tableName, tableId, objectId, popup_w, popup_h, ftr_cde, rda_idn) {
	if (tableName == '도로면') {
		document.mapFrm.TABLENAME.value = tableName;
    	document.mapFrm.TABLEID.value = tableId;
    	document.mapFrm.OBJECTID.value = objectId;
    	document.mapFrm.FTR_CDE.value = ftr_cde;
    	document.mapFrm.POPUP_W.value = popup_w;
    	document.mapFrm.POPUP_H.value = popup_h;
    	document.mapFrm.RDA_IDN.value = rda_idn;	
    	
	    document.mapFrm.action = "/etc/etcMapIdentifyRoadSearch.do";
	    document.mapFrm.target = "hiddentarget";
	    document.mapFrm.submit();	
	} else {
		var url = "";
		var doFileName = "";
		var category = tableId.substr(0, 3);
		var tableIdTranUpper = tableId.replace(/_/gi, '');
		var tableIdTranLower = tableIdTranUpper.toLowerCase();
		var tableIdUpper1 = tableIdTranUpper.substr(3, 1);
		var tableIdUpper2 = tableIdTranUpper.substr(7, 1);

		doFileName = category.toLowerCase() + tableIdUpper1 + tableIdTranLower.substr(4, 3) + tableIdUpper2 + tableIdTranLower.substr(8);

		if (category == 'RDT') { //도로관리
			url = "/road/" + doFileName + "RU.do?OBJECTID=" + objectId;
		} else if (category == 'RDL') { //도로관리
			url = "/road/" + doFileName + "RU.do?OBJECTID=" + objectId;
		} else if (category == 'WTL') { //상수
			url = "/water/" + doFileName + "RU.do?OBJECTID=" + objectId;
		} else if (category == 'WTT') { //상수
			url = "/water/" + doFileName + "RU.do?OBJECTID=" + objectId;
		} else if (category == 'SWL') { //하수
			url = "/sewer/" + doFileName + "RU.do?OBJECTID=" + objectId;
		} else if (category == 'SWT') { //하수
			url = "/sewer/" + doFileName + "RU.do?OBJECTID=" + objectId;
		}

		if (objectId != null) {
			cfWindowOpen(tableName + " 대장", url, popup_w, popup_h, false, '', 'center');
		} else {
			alert('에러가 발생했습니다.관리자에게 문의 하세요!');
		}

		component_w = 0;
		component_h = 0;
	}
}

//속성 정보조회 내 대장목록 조회(도로명:보도구간,차도구간)
function fnListDjRoadIdentify(tableName, tableId, objectIdArr) {
	var objectIdList = objectIdArr.join();

	if (tableName == '차도') {
		tableId = "RDT_RDWY_DT";
		tableName = "차도구간";
	} else {
		tableId = "RDT_SDWK_DT";
		tableName = "보도구간";
	}

	var url = "";
	var doFileName = "";
	var category = tableId.substr(0, 3);
	var tableIdTranUpper = tableId.replace(/_/gi, '');
	var tableIdTranLower = tableIdTranUpper.toLowerCase();
	var tableIdUpper1 = tableIdTranUpper.substr(3, 1);
	var tableIdUpper2 = tableIdTranUpper.substr(7, 1);

	doFileName = category.toLowerCase() + tableIdUpper1 + tableIdTranLower.substr(4, 3) + tableIdUpper2 + tableIdTranLower.substr(8);

	if (category == 'RDT') { //도로관리
		url = "/road/" + doFileName + "List.do?OBJECTID=" + objectIdList;
	} else if (category == 'RDL') { //도로관리
		url = "/road/" + doFileName + "List.do?OBJECTID=" + objectIdList;
	} else if (category == 'WTL') { //상수
		url = "/water/" + doFileName + "List.do?OBJECTID=" + objectIdList;
	} else if (category == 'WTT') { //상수
		url = "/water/" + doFileName + "List.do?OBJECTID=" + objectIdList;
	} else if (category == 'SWL') { //하수
		url = "/sewer/" + doFileName + "List.do?OBJECTID=" + objectIdList;
	} else if (category == 'SWT') { //하수
		url = "/sewer/" + doFileName + "List.do?OBJECTID=" + objectIdList;
	}

	if (objectIdArr.length > 0) {
		cfWindowOpen(tableName + " 검색", url, 1000, 350, false, '');
	} else {
		alert('해당 대장이 존재 하지 않습니다.');
	}
}
