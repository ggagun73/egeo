/*
 *	심볼 생성
 */

//포인트 그래픽(기본심볼) 생성
function drawPointGraphic(strlayer, geometry, paramValue) {
	//var infoTemplate = new esri.InfoTemplate();
	//infoTemplate.content = paramValue;

	var sms = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 15,
			new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([255, 0, 0]), 1),
			new dojo.Color([0, 255, 0, 0.5]));

	var pointGraphic = new esri.Graphic(geometry, sms, infoTemplate);

	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.setTitle(paramValue);
	infoTemplate.setContent("내용:" + paramValue);
	pointGraphic.setInfoTemplate(infoTemplate);

	inputGraphicLayer(strlayer, pointGraphic);
}

//포인트 그래픽(이미지심볼) 생성(방향성X)
function drawPointPictureGraphic(strlayer, geometry, paramValue, url, width, height, xoffset, yoffset) {
	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.content = paramValue;
	var pms = new esri.symbol.PictureMarkerSymbol();
	pms.setUrl(url);
	pms.setWidth(width);
	pms.setHeight(height);
	pms.setOffset(xoffset, yoffset);

	var pointGraphic = new esri.Graphic(geometry, pms, infoTemplate);

	inputGraphicLayer(strlayer, pointGraphic);
}

//포인트 그래픽(이미지심볼) 생성(방향성O)
function drawDrPointPictureGraphic(strlayer, geometry, paramValue, url, width, height, xoffset, yoffset, angle) {
	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.content = paramValue;

	var pms = new esri.symbol.PictureMarkerSymbol();
	pms.setUrl(url);
	pms.setWidth(width);
	pms.setHeight(height);
	pms.setOffset(xoffset, yoffset);
	pms.angle = angle;

	var pointGraphic = new esri.Graphic(geometry, pms, infoTemplate);

	inputGraphicLayer(strlayer, pointGraphic);
}

//라벨 그래픽 생성
//layer : 그래픽레이어 지정
//geometry : 라벨 표시할 위치(포인트)
//strLabel : 표시할 라벨 문자열
//strSize : 라벨 사이즈
//strBold : 라벨 굵기
//strColor : 라벨 색상
//strAlign : 라벨 정렬 위치
//xOffset : 포인트 상 XOffset 위치
//yOffset : 포인트 상 YOffset 위치
//angle : 각도
//family : 글자체
function drawLabelGraphic(strlayer, geometry, strLabel, strSize, strBold, strColor, strAlign, xOffset, yOffset, angle, family) {
	var font = new esri.symbol.Font();
	font.setSize(strSize);
	font.setStyle(strBold.toLowerCase());
	var color = new dojo.Color(strColor);
	if (family != null)
		font.setFamily(family);

	var textSymbol = new esri.symbol.TextSymbol(strLabel, font, color);
	textSymbol.setAlign(strAlign.toLowerCase());
	textSymbol.setOffset(xOffset, yOffset);
	textSymbol.setAngle(angle);

	var labelPointGraphic = new esri.Graphic(geometry, textSymbol);
	m_MainMap.graphics.add(labelPointGraphic);
}

//Array 값을 불러와서 점을 그림
function drawPointArr(strlayer, arrDtPoint) {
	var sms = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20,
			new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([255, 0, 0]), 1),
			new dojo.Color([0, 255, 0, 0.5]));
	var sfsymbol;
	for (var i = 0; i < arrDtPoint.length; i++) {
		if (i == 0) {
			sfsymbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND);
			sfsymbol.setColor(new dojo.Color([0, 0, 255]));
			inputGraphicLayer(strlayer, new esri.Graphic(arrDtPoint[i], sfsymbol));
		} else if (i == (arrDtPoint.length - 1)) {
			sfsymbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND);
			sfsymbol.setColor(new dojo.Color([0, 0, 255]));
			inputGraphicLayer(strlayer, new esri.Graphic(arrDtPoint[i], sfsymbol));
		} else {
			inputGraphicLayer(strlayer, new esri.Graphic(arrDtPoint[i], sms));
		}
	}
}

//Array 값을 받아와서 PolyLine 을 그림
function drawPolyLineArr(strlayer, arrDtPoint, strExpMethod, rgb) {
	var polylineSymbol = null;
	var polyLine = new esri.geometry.Polyline();
	var color = new dojo.Color(rgb);

	var rise;
	var run;
	var angle;

	if (strExpMethod == 1) //점선
	{
		polylineSymbol = new esri.symbol.CartographicLineSymbol(esri.symbol.CartographicLineSymbol.STYLE_DASH,
				new dojo.Color(color), 2, esri.symbol.CartographicLineSymbol.CAP_BUTT, null, 5);
	} else if (strExpMethod == 2) //실선
	{
		polylineSymbol = new esri.symbol.CartographicLineSymbol(esri.symbol.CartographicLineSymbol.STYLE_SOLID,
				new dojo.Color(color), 2, esri.symbol.CartographicLineSymbol.CAP_BUTT, null, 5);
	}

	for (var i = 0; i < arrDtPoint.length; i++) {
		if (i == 0) {
			drawPointPictureGraphic(strlayer, arrDtPoint[i], null, "/forest/js/gis/images/flag_red.png", 24, 24, 0, 0);
		} else if (i == (arrDtPoint.length - 1)) {
			polyLine.addPath([arrDtPoint[i - 1], arrDtPoint[i]]);
			inputGraphicLayer(strlayer, new esri.Graphic(polyLine, polylineSymbol));
			drawPointPictureGraphic(strlayer, arrDtPoint[i], null, "/forest/js/gis/images/flag_red.png", 24, 24, 0, 0);
		} else {
			polyLine.addPath([arrDtPoint[i - 1], arrDtPoint[i]]);
			rise = arrDtPoint[i].y - arrDtPoint[i - 1].y;
			run = arrDtPoint[i].x - arrDtPoint[i - 1].x;
			angle = (180 / Math.PI) * Math.atan2(run, rise);

			drawLabelGraphic(strlayer, arrDtPoint[i], "▲", 12, "BOLD", color, "MIDDLE", 0, 0, angle, null);
		}
	}
	//getPolyLineLength(polyLine);
}

//심플라인(점 2개로 이루어진 라인) 생성
//geometry : SimpleLine
//strStyle : 라인스타일
//strColor : 라인색상
//strWidth : 라인너비
function drawLine(strlayer, geometry, strStyle, strColor, strWidth) {
	var symbol = new esri.symbol.SimpleLineSymbol();

	switch (strStyle) {
	case "DASH":
		symbol.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASH);
		break;
	case "DASHDOT":
		symbol.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT);
		break;
	case "DASHDOTDOT":
		symbol.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASHDOTDOT);
		break;
	case "DOT":
		symbol.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DOT);
		break;
	case "NULL":
		symbol.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL);
		break;
	case "SOLID":
		symbol.setStyle(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
		break;
	}

	symbol.setColor(new dojo.Color(strColor));
	symbol.setWidth(strWidth);

	var graphic = new esri.Graphic(geometry, symbol);
	inputGraphicLayer(strlayer, graphic);
}

//지도에 중심점(centerPoint)을 기준으로 거리(radius)만큼 원을 그림
function drawCircle(strlayer, centerPoint, radius) {
	var polygon = new esri.geometry.Polygon();
	var points = [];

	for (var i = 0; i <= 360; i += 10) {
		var radian = i * (Math.PI / 180.0);
		var x = centerPoint.x + radius * Math.cos(radian);
		var y = centerPoint.y + radius * Math.sin(radian);
		points.push(new esri.geometry.Point(x, y));
	}

	polygon.addRing(points);
	polygon.spatialReference = map.spatialReference;

	var sfs = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.25]));

	var polygonGraphic = new esri.Graphic(polygon, sfs);
	inputGraphicLayer(strlayer, polygonGraphic);
}

//폴리곤 생성
//geometry : Polygon
//strFillStyle : 면스타일
//strFillColor : 면색상
//strLineStyle : 라인스타일
//strLineColor : 라인색상
//strLineWidth : 라인너비
function drawPolygon(strlayer, geometry, strFillStyle, strFillColor, strLineStyle, strLineColor, strLineWidth) {

	var sls = new esri.symbol.SimpleLineSymbol();

	switch (strLineStyle) {
	case "DASH":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASH);
		break;
	case "DASHDOT":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT);
		break;
	case "DASHDOTDOT":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASHDOTDOT);
		break;
	case "DOT":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DOT);
		break;
	case "NULL":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL);
		break;
	case "SOLID":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
		break;
	}

	sls.setColor(new dojo.Color(strLineColor));
	sls.setWidth(strLineWidth);

	var sfs = new esri.symbol.SimpleFillSymbol();

	switch (strFillStyle) {
	case "BACKWARD_DIAGONAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL);
		break;
	case "CROSS":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_CROSS);
		break;
	case "DIAGONAL_CROSS":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_DIAGONAL_CROSS);
		break;
	case "FORWARD_DIAGONAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_FORWARD_DIAGONAL);
		break;
	case "HORIZONTAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_HORIZONTAL);
		break;
	case "NULL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_NULL);
		break;
	case "SOLID":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_SOLID);
		break;
	case "VERTICAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_VERTICAL);
		break;
	}

	if (strFillColor == "") {
		sfs.setColor(new dojo.Color([0, 0, 255, 0.25]));
	} else {
		sfs.setColor(new dojo.Color(strFillColor));
	}

	sfs.setOutline(sls);

	var graphic = new esri.Graphic(geometry, sfs);
	inputGraphicLayer(strlayer, graphic);
}

//그래픽레이어에 따라 심볼 입력
function inputGraphicLayer(strlayer, graphic) {
	switch (strlayer) {
	case "SEL": //검색결과(selectGraphicLayer)
		//selectGraphicLayer.add(graphic);
		m_AreaSearchGraphicLayer.add(graphic);
		break;
	case "IDE": //검색결과(selectGraphicLayer)
		//selectGraphicLayer.add(graphic);
		m_IdentifyGraphicLayer.add(graphic);
		break;
	case "LBL": //라벨(labelGraphicLayer)
		labelGraphicLayer.add(graphic);
		break;
	case "DRW": //그리기(drawGraphicLayer)
		m_MeasureGraphicLayer.add(graphic);
		break;
	case "SCR": //반경 검색 원 중심점 모드(scrmdGraphicLayer)
		_scrmdGraphicLayer.add(graphic);
		break;
	case "SCL": //검색후 이동
		_sclmdGraphicLayer.add(graphic);
		break;
	case "WIL": //업체정보 레이어
		_waterGraphicLayer.add(graphic);
		break;
	case "CLL": //업체정보 라벨 레이어
		comInfoLabelLayer.add(graphic);
		break;
	case "QGL": //안벽 그레픽 레이어(quayGraphicLayer)
		quayGraphicLayer.add(graphic);
		break;
	case "QLL": //안벽 라벨 레이어(quayLabelLayer)
		quayLabelLayer.add(graphic);
		break;
	default: //그래픽레이어 지정하지 않은 경우
		m_MainMap.graphics.add(graphic);
		break;
	}
}

//point graphic생성
function creatPointGraphic(geometry, attribute, paramValue) {
	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.content = paramValue;

	var sms = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20,
			new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([255, 0, 0]), 1),
			new dojo.Color([0, 255, 0, 0.5]));

	return new esri.Graphic(geometry, sms, attribute, infoTemplate);
}

//포인트 그래픽(이미지심볼) 생성(방향성O)
function createDrPointPictureGraphic(geometry, attribute, paramValue, url, width, height, xoffset, yoffset, angle) {

	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.content = paramValue;

	var pms = new esri.symbol.PictureMarkerSymbol();
	pms.setUrl(url);
	pms.setWidth(width);
	pms.setHeight(height);
	pms.setOffset(xoffset, yoffset);
	pms.angle = angle;

	return new esri.Graphic(geometry, pms, attribute, infoTemplate);
}

function createLabelGraphic(geometry, strLabel, strSize, strBold, strColor, strAlign, xOffset, yOffset) {
	var font = new esri.symbol.Font();
	font.setSize(strSize);
	font.setStyle(esri.symbol.Font.STYLE_NORMAL);

	if (strBold == "NORMAL") {
		font.setStyle(esri.symbol.Font.WEIGHT_NORMAL);
	} else if (strBold == "LIGHTER") {
		font.setStyle(esri.symbol.Font.WEIGHT_LIGHTER);
	} else if (strBold == "BOLD") {
		font.setStyle(esri.symbol.Font.WEIGHT_BOLD);
	} else if (strBold == "BOLDER") {
		font.setStyle(esri.symbol.Font.WEIGHT_BOLDER);
	}
	var color = new dojo.Color(strColor);

	var textSymbol = new esri.symbol.TextSymbol(strLabel, font, color);

	if (strAlign == "START") {
		textSymbol.setAlign(esri.symbol.TextSymbol.ALIGN_START);
	} else if (strAlign == "MIDDLE") {
		textSymbol.setAlign(esri.symbol.TextSymbol.ALIGN_MIDDLE);
	} else if (strAlign == "END") {
		textSymbol.setAlign(esri.symbol.TextSymbol.ALIGN_END);
	}

	textSymbol.setOffset(xOffset, yOffset);

	return new esri.Graphic(geometry, textSymbol);
}

//======================================================================//
//	Map Navigation														//
//======================================================================//
//Zoom In
function zoomIn(x, y) {
	var offsetX = (_mapExtent.xmax - _mapExtent.xmin) / 4;
	var offsetY = (_mapExtent.ymax - _mapExtent.ymin) / 4;

	var xmin = x - offsetX;
	var ymin = y - offsetY;
	var xmax = x + offsetX;
	var ymax = y + offsetY;
	zoomExtent(xmin, ymin, xmax, ymax);
}

//Zoom Out
function zoomOut(x, y) {
	var offsetX = _mapExtent.xmax - _mapExtent.xmin;
	var offsetY = _mapExtent.ymax - _mapExtent.ymin;

	var xmin = x - offsetX;
	var ymin = y - offsetY;
	var xmax = x + offsetX;
	var ymax = y + offsetY;
	zoomExtent(xmin, ymin, xmax, ymax);
}

//Zoom Extent : 영역으로 이동
function zoomExtent(xmin, ymin, xmax, ymax) {
	var pXmin = 0,
	pYmin = 0,
	pXmax = 0,
	pYmax = 0;

	if ((xmin == xmax) && (ymin == ymax)) {
		pXmin = xmin - 90;
		pYmin = ymin - 90;
		pXmax = xmax + 90;
		pYmax = ymax + 90;
	} else {
		if ((xmax - xmin < 200) || (ymax - ymin < 200)) {
			var temp = 0,
			temp1 = 0;
			if ((ymax - ymin < 200) && !((xmax - xmin) < 200)) { //Y값의 차이가 작을때
				temp = (200 - (ymax - ymin));
				pXmin = xmin - temp;
				pYmin = ymin;
				pXmax = xmax + temp;
				pYmax = ymax;
			} else if ((xmax - xmin < 200) && !(ymax - ymin < 200)) { //X값의 차이가 작을때
				temp = (2000 - (xmax - xmin));
				pXmin = xmin - temp;
				pYmin = ymin;
				pXmax = xmax + temp;
				pYmax = ymax;
			} else { //X,Y값 모두 차이가 작을때
				temp = (200 - (ymax - ymin));
				temp1 = (200 - (xmax - xmin));
				pXmin = xmin - temp1;
				pYmin = ymin - temp;
				pXmax = xmax + temp1;
				pYmax = ymax + temp;
			}
		} else {
			pXmin = xmin - 10;
			pYmin = ymin - 10;
			pXmax = xmax + 10;
			pYmax = ymax + 10;
		}
	}
	var extent = new esri.geometry.Extent(parseFloat(pXmin),
			parseFloat(pYmin), parseFloat(pXmax), parseFloat(pYmax),
			new esri.SpatialReference({
				"wkid" : _wkid
			}));
	m_MainMap.setExtent(extent);
}

//Zoom Extent : 영역으로 이동
function zoomExtentByExtent(ext) {
	zoomExtent(ext.xmin, ext.ymin, ext.xmax, ext.ymax);
}

//Zoom Selected
function zoomSlected(xmin, ymin, xmax, ymax) {
	xmin = xmin * 0.9;
	ymin = ymin * 0.9;
	xmax = xmax * 1.1;
	ymax = ymax * 1.1 // extent의 90% 영역
		var extent = new esri.geometry.Extent(parseFloat(xmin), parseFloat(ymin), parseFloat(xmax), parseFloat(ymax), new esri.SpatialReference({
				"wkid" : _wkid
			}));
	m_MainMap.setExtent(extent);
}

function zoomToScale(x, y, levelOrFactor) {
	var mapPt = new esri.geometry.Point(x, y, new esri.SpatialReference({
				"wkid" : _wkid
			}));
	m_MainMap.centerAndZoom(mapPt, levelOrFactor)
}

//맵 클리어(새로고침)
function refreshMap() {
	$.each(m_MainMap.graphicsLayerIds, function (i, data) {
		m_MainMap.getLayer(data).clear();
	});

	if (m_MeasureToolbar) {
		m_MeasureToolbar.deactivate();
	}
	if (_navToolbar) {
		_navToolbar.deactivate();
	}
	if (_identifyToolbar) {
		_identifyToolbar.deactivate();
	}
	if (m_AreaSearchToolbar) {
		m_AreaSearchToolbar.deactivate();
	}

	if (editDrawTool) {
		editDrawTool.deactivate();
	}
	if (topographToolbar) {
		topographToolbar.deactivate();
	}
	if (crossSectionToolbar) {
		crossSectionToolbar.deactivate();
	}
	if (identifyListToolbar) {
		identifyListToolbar.deactivate();
	}
	if (modifyTool) {
		modifyTool.deactivate();
	}

	m_MainMap.graphics.clear();
	m_MainMap.infoWindow.hide();
	//맵에 onClick를 해제
	//dojo.disconnect(map_onclick);
}

//이전영역
function prevExtent() {
	_navToolbar.zoomToPrevExtent();
}

//다음영역
function nextExtent() {
	_navToolbar.zoomToNextExtent();
}

//onPanStart : event handler
function panStartEventHandler(extent, startPoint) {
	showLoadingMap();
}

//onResize : event handler
function resizeEventHandler(extent, width, height) {
	var pt = new esri.geometry.Point(_centerPoint.x, _centerPoint.y, new esri.SpatialReference({
				"wkid" : _wkid
			}));
	zoomExtent(_mapExtent.xmin, _mapExtent.ymin, _mapExtent.xmax, _mapExtent.ymax);
}

//onZoomEnd : event handler
function zoomEndEventHandler(extent, zoomFactor, anchor, level) {
	showLoadingMap();
}

//onZoomStart : event handler
function zoomStartEventHandler(extent, zoomFactor, anchor, level) {
	showLoadingMap();
}

function showLoadingMap() {
	$("#loadingMapDiv").center();
	$("#loadingMapDiv").css("display", "inline");
}

function hideLoadingMap() {
	$("#loadingMapDiv").css("display", "none");
}

//북마크 시작

// source for supports_local_storage function:
// http://diveintohtml5.org/detect.html
function supports_local_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function refreshBookmarks() {
	if (useLocalStorage) {
		window.localStorage.setItem(storageName, dojo.toJson(bookmark.toJson()));
	} else {
		var exp = 7; // number of days to persist the cookie
		dojo.cookie(storageName, dojo.toJson(bookmark.toJson()), {
			expires : exp
		});
	}
}

function clearBookmarks() {
	var conf = confirm('버튼을 클릭하시면 북마크가 삭제됩니다.');
	if (conf) {
		if (useLocalStorage) {
			// Remove from local storage
			window.localStorage.removeItem(storageName);
		} else {
			// Remove cookie
			dojo.cookie(storageName, null, {
				expires : -1
			});
		}
		// Remove all user defined bookmarks
		// First get all bookmark names
		var bmNames = dojo.map(bookmark.bookmarks, function (bm) {
				if (bm.name != 'Central Pennsylvania') {
					return bm.name;
				}
			});
		// Run removeBookmark
		dojo.forEach(bmNames, function (bName) {
			bookmark.removeBookmark(bName);
		});
		alert('북마크가 삭제됐습니다.');
	}
}
//북마크 끝

//인덱스 맵 변경
function indexMapChage(mapScale) {
	var vL;
	if (mapScale == '500') {
		//vL = [1,8,9,10,11];
		//baseIndexMap500.setVisibleLayers(vL);
		layerOnOff(baseIndexMap500, "1/500 색인도", true);
		layerOnOff(baseIndexMap500, "1/1000 색인도", false);
		layerOnOff(baseIndexMap500, "1/2000 색인도", false);
		layerOnOff(baseIndexMap500, "1/2500 색인도", false);
		//layerOnOff(baseIndexMap500,"1/5000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/10000 색인도",false);
	} else if (mapScale == '1000') {
		//vL = [1];
		//baseIndexMap500.setVisibleLayers(vL);
		layerOnOff(baseIndexMap500, "1/500 색인도", false);
		layerOnOff(baseIndexMap500, "1/1000 색인도", true);
		layerOnOff(baseIndexMap500, "1/2000 색인도", false);
		layerOnOff(baseIndexMap500, "1/2500 색인도", false);
		//layerOnOff(baseIndexMap500,"1/5000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/10000 색인도",false);
	} else if (mapScale == '2000') {
		//vL = [3,8,9,10,11];
		//baseIndexMap500.setVisibleLayers(vL);
		layerOnOff(baseIndexMap500, "1/500 색인도", false);
		layerOnOff(baseIndexMap500, "1/1000 색인도", false);
		layerOnOff(baseIndexMap500, "1/2000 색인도", true);
		layerOnOff(baseIndexMap500, "1/2500 색인도", false);
		//layerOnOff(baseIndexMap500,"1/5000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/10000 색인도",false);
	} else if (mapScale == '2500') {
		//vL = [4,8,9,10,11];
		//baseIndexMap500.setVisibleLayers(vL);
		layerOnOff(baseIndexMap500, "1/500 색인도", false);
		layerOnOff(baseIndexMap500, "1/1000 색인도", false);
		layerOnOff(baseIndexMap500, "1/2000 색인도", false);
		layerOnOff(baseIndexMap500, "1/2500 색인도", true);
		//layerOnOff(baseIndexMap500,"1/5000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/10000 색인도",false);
	} else if (mapScale == '5000') {
		//vL = [5,8,9,10,11];
		//baseIndexMap500.setVisibleLayers(vL);
		//layerOnOff(baseIndexMap500,"1/500 색인도",false);
		//layerOnOff(baseIndexMap500,"1/1000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/2000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/2500 색인도",false);
		//layerOnOff(baseIndexMap500,"1/5000 색인도",true);
		//layerOnOff(baseIndexMap500,"1/10000 색인도",false);
	} else if (mapScale == '10000') {
		//vL = [6,8,9,10,11];
		//baseIndexMap500.setVisibleLayers(vL);
		//layerOnOff(baseIndexMap500,"1/500 색인도",false);
		//layerOnOff(baseIndexMap500,"1/1000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/2000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/2500 색인도",false);
		//layerOnOff(baseIndexMap500,"1/5000 색인도",false);
		//layerOnOff(baseIndexMap500,"1/10000 색인도",true);
	}
}

//레이어 온 오프
// mapResource :  맵 서비스 아이디를 넣는다. 예: "MapServices"  or "LifeDynService"  layerOnOff(baseIndexMap500,"1/500 색인도",true)
// layer  : 레이어명
// bVisible : visible or unvisible 여부
function layerOnOff(mapService, layerNm, bVisible) {
	var layerId = -1;
	var layerInfos;
	if (!mapService.visible) {
		mapService.visible = true;

	}

	layerInfos = mapService.layerInfos;

	var visibleLayers = [];
	if (mapService.visibleLayers == -1) {
		visibleLayers = [];
	} else {
		visibleLayers = mapService.visibleLayers;
	}
	groupLayerRemove(mapService, visibleLayers);

	// 레이어 id 알아내기
	dojo.forEach(layerInfos, function (layerInfo) {
		if (layerNm == layerInfo.name) {
			layerId = layerInfo.id;
			//return layerId;
		}
	});

	if (layerId == -1) {
		return false;
	}

	//키고자 하는 레이어 레이어 정보
	var layerInfo = mapService.layerInfos[layerId];

	//visibleLayers안에 문자로 id값이 들어갔을때
	var idIndex = visibleLayers.indexOf(layerInfo.id + "");

	if (idIndex == -1) { //visibleLayers안에 숫자로 id값이 들어갔을때
		idIndex = visibleLayers.indexOf(layerInfo.id);
	}

	if (bVisible == true) {

		visibleLayers.push(layerInfo.id); // add id

	} else {
		if (idIndex != -1) {
			//if(idIndex != 0){
			visibleLayers.splice(idIndex, 1);
			//}
		}
	}

	if (visibleLayers.length == 0) {
		visibleLayers.push(-1);
		mapService.setVisibleLayers(visibleLayers);
	} else {
		mapService.setVisibleLayers(visibleLayers);
	}

	return true;
}

//레이어 온 오프(id값으로 onoff하기)
//mapResource :  맵 서비스 아이디를 넣는다. 예: "MapServices"  or "LifeDynService"  layerOnOff(baseIndexMap500,"1/500 색인도",true)
//layer  : 레이어명
//bVisible : visible or unvisible 여부
function layerIdOnOff(mapService, layerId, bVisible) {

	var visibleLayers = mapService.visibleLayers;
	groupLayerRemove(mapService, visibleLayers);

	var idIndex = visibleLayers.indexOf(parseInt(layerId));

	if (bVisible == true) {
		visibleLayers.push(parseInt(layerId)); // add id
	} else {
		if (idIndex != -1) {
			visibleLayers.splice(idIndex, 1);
		}
	}

	mapService.setVisibleLayers(visibleLayers);

	return true;
}

//그룹 레이어 제거
function groupLayerRemove(mapService, visibleLayers) {
	//
	var visibleLayerSize = visibleLayers.length;
	var count = 0;
	for (var i = 0; i < visibleLayers.length; i++) {
		var layerId = "";
		//count = i;
		if (visibleLayerSize > visibleLayers.length) {
			var num = visibleLayerSize - visibleLayers.length;
			layerId = visibleLayers[count - num];
		} else {
			layerId = visibleLayers[count];
		}

		layerId = visibleLayers[count];

		var layerInfo = mapService.layerInfos[layerId];
		var groupLayer = layerInfo.parentLayerId; //parentLayerId가 -1이면 group Layrer 임
		var idIndex = visibleLayers.indexOf(layerId);

		if (groupLayer == -1) {
			visibleLayers.splice(idIndex, 1);
			if (count == 0) {
				count = 0;
			} else {
				count = i - 1;
			}
		} else {
			count = count + 1;
		}

	}

}

//그룹 레이어 ID 알기
function groupLayerId(layersInfo) {
	var groupLayerId = [];
	for (var i = 0; i < layersInfo.layers.length; i++) {

		var layerType = layersInfo.layers[i].type;

		if (layerType == "Group Layer") {
			var id = layersInfo.layers[i].id;
			groupLayerId.push(id);
		}

	}

	return groupLayerId;

}

//레이어 id를 가지고 배열 객체의 배열 번호 알기
function arrTolayerId(layerId) {

	var groupLyrIds = groupLayerId(layersInfo);
	var arrNum = 0;
	for (var j = 0; j < groupLyrIds.length; j++) {

		if (j == groupLyrIds.length - 1) {
			if (groupLyrIds[j] < layerId) {
				arrNum = layerId - (j + 1);
			}
		} else {
			if (groupLyrIds[j] < layerId &&
				groupLyrIds[j + 1] > layerId) {
				arrNum = layerId - (j + 1);
			}
		}
	}

	return arrNum;
}

//검색용 폴리곤 생성
//geometry : Polygon
//strFillStyle : 면스타일
//strFillColor : 면색상
//strLineStyle : 라인스타일
//strLineColor : 라인색상
//strLineWidth : 라인너비
function drawPolygonSearch(strlayer, geometry, strFillStyle, strFillColor, strLineStyle, strLineColor, strLineWidth, paramValue) {

	var sls = new esri.symbol.SimpleLineSymbol();

	switch (strLineStyle) {
	case "DASH":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASH);
		break;
	case "DASHDOT":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT);
		break;
	case "DASHDOTDOT":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DASHDOTDOT);
		break;
	case "DOT":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_DOT);
		break;
	case "NULL":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL);
		break;
	case "SOLID":
		sls.setStyle(esri.symbol.SimpleLineSymbol.STYLE_SOLID);
		break;
	}

	sls.setColor(new dojo.Color(strLineColor));
	sls.setWidth(strLineWidth);

	var sfs = new esri.symbol.SimpleFillSymbol();

	switch (strFillStyle) {
	case "BACKWARD_DIAGONAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL);
		break;
	case "CROSS":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_CROSS);
		break;
	case "DIAGONAL_CROSS":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_DIAGONAL_CROSS);
		break;
	case "FORWARD_DIAGONAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_FORWARD_DIAGONAL);
		break;
	case "HORIZONTAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_HORIZONTAL);
		break;
	case "NULL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_NULL);
		break;
	case "SOLID":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_SOLID);
		break;
	case "VERTICAL":
		sfs.setStyle(esri.symbol.SimpleFillSymbol.STYLE_VERTICAL);
		break;
	}

	if (strFillColor == "") {
		sfs.setColor(new dojo.Color([0, 0, 255, 0.25])); //색사,투명도
	} else {
		sfs.setColor(new dojo.Color(strFillColor));
	}

	sfs.setOutline(sls);

	graphicSearch = new esri.Graphic(geometry, sfs);

}

//현재 지도에서 활성화된 레이어 목록만 가지고 옴
//사용법: var visibleLayers = mapLayerList(basemap);//활성화된 레이어 목록만 가지고 옴
function mapLayerList(mapService) {
	var visibleLayers = mapService.visibleLayers;
	//그룹레이어 제거
	groupLayerRemove(mapService, visibleLayers);

	if (!mapService.visible) {
		mapService.visible = true;
	}
	return visibleLayers;
}

/*
 * 검색후 이동 쿼리 task 조작
 * Development Date : 2014.07.17
 * Developer : 최규용
 */
function getSingleLocation(table, objectId, scale) {
	mapLtScale = 0;

	if (scale == '' || scale == 0) {
		mapLtScale = 1000;
	} else {
		mapLtScale = scale;
	}

	_searchTable = table; //검색대상 테이블
	var query = new esri.tasks.Query();
	query.where = "OBJECTID = " + objectId;
	query.outFields = ["*"];
	query.returnGeometry = true;
	//query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	var layerId = getLayerId(basemap, _searchTable); //검색할 레이어 아이디 값 조회

	var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //동경계
	queryTask.execute(query, getLocationSearchTask);
}

function getLocationSearchTask(featureSet) {
	if (featureSet.features.length < 1) {
		alert("해당 위치로 이동 할수가 없습니다.");
	} else {
		_sclmdGraphicLayer.clear();

		zoomExtentByExtent(featureSet.features[0].geometry.getExtent());

		if (featureSet.geometryType == 'esriGeometryPolygon') {
			drawPolygonSearch("SCL", featureSet.features[0].geometry, "SOLID", "", "SOLID", "#00FFFC", 1);
			inputGraphicLayer("SCL", graphicSearch);

		} else if (featureSet.geometryType == 'esriGeometryPolyline') {
			var paths = featureSet.features[0].geometry.paths[0];
			drawPolyLineArr('SCL', paths, '1', '#00FFFC');
		}

		fnShowHighlight(featureSet.features[0].geometry);
	}
}

function errorBack(error) {
	var error2 = error;
	alert(error);
}

/*
 * findtask조회 코드값으로 가지고 있는데이터를 코드명으로 받음
 * Development Date : 2014.09.19
 * Developer : 최규용
 */
function getFindSearchTask(searchTable, objectid, searchField) {

	//FindTask로 해면 코드값을 코드명으로 가지고 올수 있음(도메인설정값)
	var fieldNm = "";
	taskSearchField = searchField;
	var layerId = getLayerId(basemap, searchTable); //검색할 레이어 아이디 값 조회

	var find = new esri.tasks.FindTask(urlBasemap);
	var params = new esri.tasks.FindParameters();
	params.layerIds = [layerId];
	params.searchFields = ["OBJECTID"];
	params.returnGeometry = true;

	params.searchText = objectid;
	//find.execute(params, getFindTaskResult);

	find.execute(params, function (results) {
		//
		fieldNm = eval("results[0].feature.attributes[\"" + searchField + "\"]");

	});

	//alert("값:"+fieldNm.toString());
	return fieldNm.toString();
}

/*
 * 검색후 멀티 이동 쿼리 task 조작
 * Development Date : 2014.07.17
 * Developer : 최규용
 */
function getComplexLocation(table, objectIdArr) {
	m_FeatureSearchGraphicLayer.clear();
	
	_searchTable = table; //검색대상 테이블
	var query = new esri.tasks.Query();
	query.where = "OBJECTID IN (" + objectIdArr.join() + ")";
	query.outFields = ["*"];
	query.returnGeometry = true;
	//query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

	var layerId = getLayerId(basemap, _searchTable); //검색할 레이어 아이디 값 조회
	var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //동경계
	queryTask.execute(query, getComplexLocSearchTask);
}

function getComplexLocSearchTask(featureSet) {
	var unionExtent;
	$.each(featureSet.features, function (i, data) {
		fnShowHighlight(data.geometry);
		if (data.geometry.type == "point") {
			var geom = data.geometry;
			var ext = new esri.geometry.Extent(geom.x, geom.y, geom.x, geom.y,
					new esri.SpatialReference({
						wkid : _wkid
					}));
			if (i == 0)
				unionExtent = new esri.geometry.Extent(ext);
			unionExtent = unionExtent.union(ext);
		} else {
			if (i == 0)
				unionExtent = new esri.geometry.Extent(data.geometry.getExtent());
			unionExtent = unionExtent.union(data.geometry.getExtent());
		}
	});
	if (m_IsMoveExtent)
		zoomExtentByExtent(unionExtent);
	m_IsMoveExtent = true;
}

//라벨 그래픽 생성
//layer : 그래픽레이어 지정
//geometry : 라벨 표시할 위치(포인트)
//strLabel : 표시할 라벨 문자열
//strSize : 라벨 사이즈
//strBold : 라벨 굵기
//strColor : 라벨 색상
//strAlign : 라벨 정렬 위치
//xOffset : 포인트 상 XOffset 위치
//yOffset : 포인트 상 YOffset 위치
//angle : 각도
//family : 글자체
function fnGetTextSymbol(strSize, strBold, strColor, strAlign, xOffset, yOffset, angle, family, text,
		horizontalAlignment, verticalAlignment) {
	var font = new esri.symbol.Font();
	font.setSize(Number(strSize));
	font.setStyle(strBold);
	font.setFamily(family);

	var textSymbol = new esri.symbol.TextSymbol(text, font, new dojo.Color(strColor));
	textSymbol.setAlign(strAlign);
	textSymbol.setOffset(Number(xOffset), Number(yOffset));
	textSymbol.setAngle(Number(angle));
	if (horizontalAlignment != undefined)
		textSymbol.setHorizontalAlignment(horizontalAlignment);
	if (verticalAlignment != undefined)
		textSymbol.setVerticalAlignment(verticalAlignment);

	return textSymbol;
}

//drawPolygonSymbol (면)생성
//geometry : Polygon
//strFillStyle : 면스타일
//strFillColor : 면색상
//strLineStyle : 라인스타일
//strLineColor : 라인색상
//strLineWidth : 라인너비
function fnGetPolygonSymbol(strFillStyle, strFillColor, strLineStyle, strLineColor, strLineWidth) {
	var sls = new esri.symbol.SimpleLineSymbol();
	sls.setStyle(strLineStyle);
	sls.setColor(new dojo.Color(strLineColor));
	sls.setWidth(Number(strLineWidth));

	var sfs = new esri.symbol.SimpleFillSymbol();
	sfs.setStyle(strFillStyle);

	if (strFillColor == "") {
		sfs.setColor(new dojo.Color([0, 0, 255, 0.25]));
	} else {
		sfs.setColor(new dojo.Color(strFillColor));
	}
	sfs.setOutline(sls);
	return sfs;
}

//drawPointSymbol (점)생성
//geometry : Polygon
//strFillStyle : 점스타일
//strFillColor : 점색상
//strLineStyle : 라인스타일
//strLineColor : 라인색상
//strLineWidth : 라인너비
function fnGetMarkerSymbol(strMarkerStyle, strFillColor, strPointSize, strLineStyle, strLineColor, strLineWidth) {
	var sls = new esri.symbol.SimpleLineSymbol();
	sls.setStyle(strLineStyle);
	sls.setColor(new dojo.Color(strLineColor));
	sls.setWidth(Number(strLineWidth));

	var sms = new esri.symbol.SimpleMarkerSymbol();
	sms.setStyle(strMarkerStyle);
	sms.setColor(new dojo.Color(strFillColor));
	sms.setSize(Number(strPointSize));

	if (strFillColor == "") {
		sms.setColor(new dojo.Color([0, 0, 255, 0.25]));
	} else {
		sms.setColor(new dojo.Color(strFillColor));
	}

	sms.setOutline(sls);
	return sms;
}

function fnGetPictureMarkerSymbol(url, width, height, color, callback) {
	if (color) {
		var pColor = new dojo.Color(color);
		var myImg = new Image();
		myImg.src = url;
		var canvas = document.createElement("canvas");
		//canvas.width = width;
		//canvas.height = height;
		var ctx = canvas.getContext("2d");
		
		myImg.onload = function(image) {
		    if(!image) image = this;
		    canvas.width = myImg.naturalWidth;
		    canvas.height = myImg.naturalHeight;
			
			ctx.drawImage(myImg, 0, 0);
			ctx.drawImage(myImg, 0, 0);
			
			//흐리게 보여서 두번 그림

			//var imgd = ctx.getImageData(0, 0, myImg.naturalWidth, myImg.naturalHeight);
			var imgd = ctx.getImageData(0, 0, width, height);

			for (var i = 0; i < imgd.data.length; i += 4) {
				imgd.data[i] = pColor.r;                                        
				imgd.data[i + 1] = pColor.g;                                    
				imgd.data[i + 2] = pColor.b;
			}
			ctx.putImageData(imgd, 0, 0);
			
			url = canvas.toDataURL("image/png",  1);
			var sym = new esri.symbol.PictureMarkerSymbol(url, Number(width), Number(height));
			callback(sym);
		};
	}
	//if (xoffset && yoffset) pms.setOffset(xoffset, yoffset);
}

//drawLineSymbol (선)생성
//geometry : Polygon
//strLineStyle : 라인스타일
//strLineColor : 라인색상
//strLineWidth : 라인너비
function fnGetPolylineSymbol(strLineStyle, strLineColor, strLineWidth) {
	var sls = new esri.symbol.SimpleLineSymbol();
	sls.setStyle(strLineStyle);
	sls.setColor(new dojo.Color(strLineColor));
	sls.setWidth(Number(strLineWidth));
	return sls;
}

//헥사코드에서 rgb컬러로 변경
function hex2rgb(hex, tansparency) {
	var tans = parseInt(tansparency) / 100;
	return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0, tans];
}

//소숫점 자르기
function formatLocalizedDecimal(numberValue, decimalPlaces) {
	numberValue = parseFloat(numberValue);
	if (numberValue == null || numberValue == undefined)
		return;
	var unlocalized = numberValue.toFixed(decimalPlaces);
	var localized = unlocalized;
	var decimalSeparator = ".";
	if (decimalSeparator != "." && decimalSeparator.length > 0) {
		localized = unlocalized.replace(".", decimalSeparator);
	}
	return localized;
}

//최초 축척 및 중심 좌표 구하기
function firstStatus() {
	//현재 위치 좌표 구하기 추가
	var mapCurrentScale = parseInt(m_MainMap.getScale());

	var centerPoint = m_MainMap.extent.getCenter();
	var center_x = formatLocalizedDecimal(centerPoint.x, 4);
	var center_y = formatLocalizedDecimal(centerPoint.y, 4);

	$("#scaleShow").text("축척 1:" + mapCurrentScale);
	$("#coord").text("X:" + center_x + " Y:" + center_y);
	//$("#status").text("상태:초기모드");
}

//geometry 하이라이팅 기능
function fnShowHighlight(geom) {	
	var symbol;
	if (geom.type === "point" || geom.type === "multipoint") {
		symbol = m_MarkerSymbol;
	} else if (geom.type === "line" || geom.type === "polyline") {
		symbol = m_LineSymbol;
	} else {
		symbol = m_FillSymbol;
	}
	//m_MainMap.reorderLayer(graphicFlashLayer, 0);
	m_FeatureSearchGraphicLayer.add(new esri.Graphic(geom, symbol));
}
