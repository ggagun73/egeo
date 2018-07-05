//횡단면도 검색 toolbar 세팅
function crossSectionSearch(value) {
	crossSectionToolbar = new esri.toolbars.Draw(m_MainMap);
	crossSectionToolbar.on("draw-end", addCrossSectionToMap);
	crossSectionToolbar.activate(esri.toolbars.Draw.POLYLINE); //POLYLINE
}

//횡단면도 그래픽 지도에 표출
function addCrossSectionToMap(evt) {
	$.each(m_MainMap.graphicsLayerIds, function(i, data) {
		m_MainMap.getLayer(data).clear();
	});
	m_MainMap.graphics.clear();
	m_MainMap.infoWindow.hide();

	cross_totalLength = 0;

	startPoint = "";
	csLine = evt.geometry;
	for (var i = 1; i < evt.geometry.paths[0].length; i++) {
		startPoint = evt.geometry.getPoint(0, i - 1);
		var endPoint = evt.geometry.getPoint(0, i);

		if (i == 1) {
			crossStartPoint = evt.geometry.getPoint(0, i - 1);
		}

		var linePath = new esri.geometry.Polyline();
		linePath.spatialReference = m_MainMap.spatialReference;
		linePath.addPath([startPoint, endPoint]);

		var lingPath2 = esri.geometry.webMercatorToGeographic(linePath);

		var nLength = (esri.geometry.geodesicLengths([lingPath2], esri.Units.METERS) * 100) / 100;
		var strLength = setNumComma(nLength.toFixed(2));

		cross_totalLength += nLength;

		drawLine("DRW", linePath, "SOLID", "#1B1B1B", 2);

		var infoTemplate = new esri.InfoTemplate("title", "contents");

		if (i == 1) {
			m_MainMap.graphics.add(new esri.Graphic(startPoint, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
						8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.2])), null, infoTemplate));
		}
		m_MainMap.graphics.add(new esri.Graphic(endPoint, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
					8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.2])), null, infoTemplate));

		if (i + 1 == evt.geometry.paths[0].length) {
			cross_totalLength = setNumComma((Math.round(cross_totalLength * 100) / 100).toFixed(2));
			crossEndPoint = endPoint;

			if (i + 1 == 2) {
				drawLabelGraphic("DRW", endPoint, "■■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
				drawLabelGraphic("DRW", endPoint, ":■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
				drawLabelGraphic("DRW", endPoint, "전체거리:" + cross_totalLength + "m", "12px", "BOLDER", "red", "START", 0, -15, 0, null);
			} else {
				drawLabelGraphic("DRW", endPoint, "■■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -30, 0, null);
				drawLabelGraphic("DRW", endPoint, ":■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -30, 0, null);

				drawLabelGraphic("DRW", endPoint, "전체거리:" + cross_totalLength + "m", "12px", "BOLDER", "red", "START", 0, -30, 0, null);
			}

		} else {
			drawLabelGraphic("DRW", endPoint, "■■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
			drawLabelGraphic("DRW", endPoint, ":■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
			drawLabelGraphic("DRW", endPoint, "부분거리:" + strLength + "m", "12px", "BOLDER", "red", "START", 0, -15, 0, null);
		}

	}

	var identifyTask = new esri.tasks.IdentifyTask(urlBasemap);

	var identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.tolerance = 5;
	identifyParams.returnGeometry = true;

	var layerId_1 = getLayerId(basemap, "상수관로"); //검색할 레이어 아이디 값 조회
	//var layerId_2 = getLayerId(basemap, "상수관로심도"); //검색할 레이어 아이디 값 조회
	var layerId_3 = getLayerId(basemap, "하수관거"); //검색할 레이어 아이디 값 조회
	//var layerId_4 = getLayerId(basemap, "하수관거심도"); //검색할 레이어 아이디 값 조회

	var layerId_5 = getLayerId(basemap, "도로면"); //검색할 레이어 아이디 값 조회
	//var layerId_6 = getLayerId(basemap, "차도"); //검색할 레이어 아이디 값 조회

	//alert("상수관로:"+layerId_1+"하수관거:"+layerId_3+"도로면:"+layerId_5);
	identifyParams.layerIds = [parseInt(layerId_1), parseInt(layerId_3), parseInt(layerId_5)];
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
	identifyParams.width = m_MainMap.width;
	identifyParams.height = m_MainMap.height;

	identifyParams.geometry = evt.geometry;
	identifyParams.mapExtent = m_MainMap.extent;
	identifyTask.execute(identifyParams, function (idResults) {
		getCrossSectionResult(idResults);
	});
	//crossSectionToolbar.deactivate(); //횡단면도  toolbar정지
}

//횡단면도 검색 결과
function getCrossSectionResult(idResults) {
	arrDataCross = [];
	var value = "";
	goemSet = [];

	wwSet = []; //횡단면도 검색 상수도
	swSet = []; //횡단면도 검색 하수도
	wwSetData = [];
	swSetData = [];

	arrRoadData = [];

	for (var i = 0; i < idResults.length; i++) {
		//alert("길이("+i+")"+idResults.length);

		var point_x = idResults[i].feature.geometry.getExtent().getCenter().x;
		var point_y = idResults[i].feature.geometry.getExtent().getCenter().y;
		//var center_point = new esri.geometry.Point(point_x,point_y);
		var objectid = idResults[i].feature.attributes.OBJECTID;
		var layerName = idResults[i].layerName;

		var dep = 0;
		var dip = 0;

		var startPoint = crossStartPoint;
		var endPoint = new esri.geometry.Point(point_x, point_y);
		var linePath = new esri.geometry.Polyline();

		linePath.spatialReference = m_MainMap.spatialReference;
		linePath.addPath([crossStartPoint, endPoint]);

		var lingPath = esri.geometry.webMercatorToGeographic(linePath); //검색라인 시작점에서 각 점의 거리

		var nLength = (esri.geometry.geodesicLengths([lingPath], esri.Units.METERS) * 100) / 100;

		//drawLabelGraphic("DRW", endPoint, "종류:"+layerName+"길이:"+nLength.toFixed(2), "12px", "BOLDER", "red", "START", 0, -15, 0, null);

		//drawLine("DRW", linePath, "SOLID", "0000CC", 4);


		if (layerName == '상수관로') {
			var paths = idResults[i].feature.geometry.paths[0];
			drawPolyLineArr('SCL', paths, '1', '#3366FF'); //검색된 상수관로 지도에 표현

			dep = idResults[i].feature.attributes["평균깊이"];
			dip = idResults[i].feature.attributes["구경"];

			wwSet.push(idResults[i].feature.geometry);

			wwSetData.push([objectid, dep, dip]);

		} else if (layerName == '하수관거') { //하수관거
			var paths = idResults[i].feature.geometry.paths[0];
			drawPolyLineArr('SCL', paths, '1', '#660033'); //검색된 하수관거 지도에 표현

			var dep_start = idResults[i].feature.attributes["시점깊이"];
			var dep_end = idResults[i].feature.attributes["종점깊이"];
			dip = idResults[i].feature.attributes["구경"];

			dep = (parseInt(dep_start) + parseInt(dep_end)) / 2; //깊이 평균

			swSet.push(idResults[i].feature.geometry);

			swSetData.push([objectid, dep, dip]);

		} else if (layerName == '도로면') {
			value = idResults[i].value; //차도,보도 판단
			goemSet.push(idResults[i].feature.geometry);

			arrRoadData.push([objectid, layerName, value]);

			if (value == '보도') {}
			else if (value == '차도') {}

		}

		//var infoTemplate = new esri.InfoTemplate("title", "contents");

		//시작 포인트 표시
		//m_MainMap.graphics.add(new esri.Graphic(center_point, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
		//        8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([50,50,50]), 1), new dojo.Color([255,255,0,0.2])), null, infoTemplate));


	}

	//


	//시작점에서 가까운 순서대로 등고선 포인트 정렬
	function compareName(a, b) {
		if (a[1] < b[1])
			return -1;
		if (a[1] > b[1])
			return 1;
		return 0;
	}
	arrDataCross.sort(compareName);

	//
	//
	//var goemSet2 =goemSet;
	//var csLine2 =csLine;

	//var wwSet2 =wwSet;

	geometryService.intersect(goemSet, csLine, showIntersect, errorBack);

	geometryService.cut(swSet, csLine, showIntersectSw, errorBack);

	geometryService.cut(wwSet, csLine, showIntersectWw, errorBack);

	window.open("/etc/etcCrossSectional.do", "횡단면도", "width=1000,height=500");

	//cfWindowOpen("횡단면도", '/etc/etcCrossSectional.do', 1000, 500, false, '', 'center');

	//crossSectionToolbar.deactivate(); //횡단면도  toolbar정지
}

//상수관로
function showIntersectWw(intGeometries) {
	var point3 = "";
	var nLength = 0;
	wwSetDataLen = [];

	for (var i = 0; i < intGeometries.geometries.length; i++) {

		if ((i % 2) == 0) {
			/*포인트1의 길이를 뽑기*/
			var line1 = intGeometries.geometries[i].paths[0];
			var geo_point1 = line1[0];
			var point_x1 = geo_point1[0];
			var point_y1 = geo_point1[1];
			var point1 = new esri.geometry.Point(point_x1, point_y1, _wkid);
			var crossStartPoint2 = crossStartPoint;

			var linePath1 = new esri.geometry.Polyline();
			linePath1.spatialReference = m_MainMap.spatialReference;
			linePath1.addPath([crossStartPoint, point1]);
			var lingPath1 = esri.geometry.webMercatorToGeographic(linePath1);
			var nLength1 = (esri.geometry.geodesicLengths([lingPath1], esri.Units.METERS) * 100) / 100;

			/*포인트2의 길이를 뽑기*/
			var line2 = intGeometries.geometries[i + 1].paths[0];
			var geo_point2 = line2[0];
			var point_x2 = geo_point2[0];
			var point_y2 = geo_point2[1];
			var point2 = new esri.geometry.Point(point_x2, point_y2, _wkid);

			var linePath2 = new esri.geometry.Polyline();
			linePath2.spatialReference = m_MainMap.spatialReference;
			linePath2.addPath([crossStartPoint, point2]);
			var lingPath2 = esri.geometry.webMercatorToGeographic(linePath2);
			var nLength2 = (esri.geometry.geodesicLengths([lingPath2], esri.Units.METERS) * 100) / 100;

			if (nLength1 < nLength2) { //포인트1과 포인트2를 비교해서 길이가 작은 포인트를 표시
				point3 = point1;
				nLength = nLength1;
				/*시작점에서 관까지의 길이*/

			} else {
				point3 = point2;
				nLength = nLength2;
				/*시작점에서 관까지의 길이*/
			}

			wwSetDataLen.push(nLength);

			var infoTemplate = new esri.InfoTemplate("title", "contents");

			m_MainMap.graphics.add(new esri.Graphic(point3, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
						8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([50, 50, 50]), 1), new dojo.Color([255, 255, 0, 0.2])), null, infoTemplate));
		}
	}

}
//하수관거
function showIntersectSw(intGeometries) {

	var point3 = "";
	var nLength = 0;
	swSetDataLen = [];
	for (var i = 0; i < intGeometries.geometries.length; i++) {

		if ((i % 2) == 0) {
			/*포인트1의 길이를 뽑기*/
			var line1 = intGeometries.geometries[i].paths[0];
			var geo_point1 = line1[0];
			var point_x1 = geo_point1[0];
			var point_y1 = geo_point1[1];
			var point1 = new esri.geometry.Point(point_x1, point_y1, _wkid);
			var crossStartPoint2 = crossStartPoint;
			var linePath1 = new esri.geometry.Polyline();
			linePath1.spatialReference = m_MainMap.spatialReference;
			linePath1.addPath([crossStartPoint, point1]);
			var lingPath1 = esri.geometry.webMercatorToGeographic(linePath1);
			var nLength1 = (esri.geometry.geodesicLengths([lingPath1], esri.Units.METERS) * 100) / 100;

			/*포인트2의 길이를 뽑기*/
			var line2 = intGeometries.geometries[i + 1].paths[0];
			var geo_point2 = line2[0];
			var point_x2 = geo_point2[0];
			var point_y2 = geo_point2[1];
			var point2 = new esri.geometry.Point(point_x2, point_y2, _wkid);

			var linePath2 = new esri.geometry.Polyline();
			linePath2.spatialReference = m_MainMap.spatialReference;
			linePath2.addPath([crossStartPoint, point2]);
			var lingPath2 = esri.geometry.webMercatorToGeographic(linePath2);
			var nLength2 = (esri.geometry.geodesicLengths([lingPath2], esri.Units.METERS) * 100) / 100;

			if (nLength1 < nLength2) { //포인트1과 포인트2를 비교해서 길이가 작은 포인트를 표시
				point3 = point1;
				nLength = nLength1;
				/*시작점에서 관까지의 길이*/

			} else {
				point3 = point2;
				nLength = nLength2;
				/*시작점에서 관까지의 길이*/
			}
			swSetDataLen.push(nLength);
			var infoTemplate = new esri.InfoTemplate("title", "contents");

			m_MainMap.graphics.add(new esri.Graphic(point3, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
						8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([50, 50, 50]), 1), new dojo.Color([255, 255, 0, 0.2])), null, infoTemplate));
		}
	}
}

//도로
function showIntersect(intGeometries) {
	arrRoadLen = [];
	for (var i = 0; i < intGeometries.length; i++) {

		var line = intGeometries[i].paths[0];
		for (var j = 0; j < line.length; j++) {
			var geo_point = line[j];

			var point_x = geo_point[0];
			var point_y = geo_point[1];

			var point = new esri.geometry.Point(point_x, point_y, _wkid);

			drawLabelGraphic("DRW", point, "P", "12px", "BOLDER", "#0000CC", "START", 0, -15, 0, null);
			var infoTemplate = new esri.InfoTemplate("title", "contents");

			/*포인트의 길이를 뽑기*/
			var linePath = new esri.geometry.Polyline();
			linePath.spatialReference = m_MainMap.spatialReference;
			linePath.addPath([crossStartPoint, point]);
			var lingPath = esri.geometry.webMercatorToGeographic(linePath);
			var nLength = (esri.geometry.geodesicLengths([lingPath], esri.Units.METERS) * 100) / 100;

			arrRoadLen.push(nLength);

			m_MainMap.graphics.add(new esri.Graphic(point, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
						8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 50, 50]), 1), new dojo.Color([255, 50, 0, 0.2])), null, infoTemplate));
		}
	}
}



//지형단면도 검색 toolbar 세팅
function topographicalSearch(value) {
	topographToolbar = new esri.toolbars.Draw(m_MainMap);
	topographToolbar.on("draw-end", addTopoGraphicToMap);
	topographToolbar.activate(esri.toolbars.Draw.POLYLINE); //POLYLINE
}

//지형단면도 검색 그래픽 지도에 표출
function addTopoGraphicToMap(evt) {
	$.each(m_MainMap.graphicsLayerIds, function(i, data) {
		m_MainMap.getLayer(data).clear();
	});
	m_MainMap.graphics.clear();
	m_MainMap.infoWindow.hide();
	var totalLength = 0;
	for (var i = 1; i < evt.geometry.paths[0].length; i++) {

		var startPoint = evt.geometry.getPoint(0, i - 1);
		var endPoint = evt.geometry.getPoint(0, i);

		if (i == 1) {
			topoStartPoint = evt.geometry.getPoint(0, i - 1);
		}

		var linePath = new esri.geometry.Polyline();
		linePath.spatialReference = m_MainMap.spatialReference;
		linePath.addPath([startPoint, endPoint]);

		var lingPath2 = esri.geometry.webMercatorToGeographic(linePath);

		var nLength = (esri.geometry.geodesicLengths([lingPath2], esri.Units.METERS) * 100) / 100;
		var strLength = setNumComma(nLength.toFixed(2));

		totalLength += nLength;

		drawLine("DRW", linePath, "SOLID", "#1B1B1B", 2);

		var infoTemplate = new esri.InfoTemplate("title", "contents");

		if (i == 1) {
			m_MainMap.graphics.add(new esri.Graphic(startPoint, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
						8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.2])), null, infoTemplate));
		}
		m_MainMap.graphics.add(new esri.Graphic(endPoint, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
					8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.2])), null, infoTemplate));

		if (i + 1 == evt.geometry.paths[0].length) {
			totalLength = setNumComma((Math.round(totalLength * 100) / 100).toFixed(2));

			if (i + 1 == 2) {
				drawLabelGraphic("DRW", endPoint, "■■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
				drawLabelGraphic("DRW", endPoint, ":■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
				drawLabelGraphic("DRW", endPoint, "전체거리:" + totalLength + "m", "12px", "BOLDER", "red", "START", 0, -15, 0, null);
			} else {
				drawLabelGraphic("DRW", endPoint, "■■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -30, 0, null);
				drawLabelGraphic("DRW", endPoint, ":■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -30, 0, null);
				drawLabelGraphic("DRW", endPoint, "전체거리:" + totalLength + "m", "12px", "BOLDER", "red", "START", 0, -30, 0, null);
			}

		} else {
			drawLabelGraphic("DRW", endPoint, "■■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
			drawLabelGraphic("DRW", endPoint, ":■■■■■■■■", "16px", "BOLDER", "#FDFDFD", "START", 0, -15, 0, null);
			drawLabelGraphic("DRW", endPoint, "부분거리:" + strLength + "m", "12px", "BOLDER", "red", "START", 0, -15, 0, null);
		}

	}

	var query = new esri.tasks.Query();
	query.where = "CAA_CDE = 'CAA002'"; //주곡선만검색
	query.outFields = ["*"];
	query.returnGeometry = true;
	query.geometry = evt.geometry;
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

	var layerId = getLayerId(basemap, "등고선"); //검색할 레이어 아이디 값 조회


	var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //등고선
	queryTask.execute(query, getTopoSearchResult);

}

//지형단면도 검색 결과 및 정렬
function getTopoSearchResult(featureSet) {

	arrDataTopo = []; //지형단면도 결과값 초기화
	arrDataTopoEle = []; //지형단면도 최고높이값 초기화


	for (var i = 0; i < featureSet.features.length; i++) {

		var point_x = featureSet.features[i].geometry.getExtent().getCenter().x;
		var point_y = featureSet.features[i].geometry.getExtent().getCenter().y;
		var center_point = new esri.geometry.Point(point_x, point_y);
		var objectid = featureSet.features[i].attributes.OBJECTID;
		var ele_alt = featureSet.features[i].attributes.ELE_ALT;

		//var objectid = featureSet.features[i].attributes.OBJECTID;


		var infoTemplate = new esri.InfoTemplate("title", "contents");

		//시작 포인트 표시
		//m_MainMap.graphics.add(new esri.Graphic(center_point, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
		//       8, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([50,50,50]), 1), new dojo.Color([255,255,0,0.2])), null, infoTemplate));


		var startPoint = topoStartPoint;
		var endPoint = new esri.geometry.Point(point_x, point_y);
		var linePath = new esri.geometry.Polyline();

		linePath.spatialReference = m_MainMap.spatialReference;
		linePath.addPath([startPoint, endPoint]);

		var lingPath2 = esri.geometry.webMercatorToGeographic(linePath);

		var nLength = (esri.geometry.geodesicLengths([lingPath2], esri.Units.METERS) * 100) / 100;

		//drawLabelGraphic("DRW", endPoint, nLength.toFixed(2), "12px", "BOLDER", "red", "START", 0, -15, 0, null);


		arrDataTopo.push([objectid, nLength, startPoint, center_point, ele_alt]); //id,길이,시작포인트,등고선중심포인트,높이

		arrDataTopoEle.push([objectid, ele_alt]);

	}

	//시작점에서 가까운 순서대로 등고선 포인트 정렬
	function compareName(a, b) {
		if (a[1] < b[1])
			return -1;
		if (a[1] > b[1])
			return 1;
		return 0;
	}
	arrDataTopo.sort(compareName);
	arrDataTopoEle.sort(compareName);
	//topographToolbar.deactivate();

	var arrDataTopo2 = arrDataTopo;

	if (arrDataTopo.length > 1) {
		var conf = confirm('해당지역의 지형단면도를 보시겠습니까?');
		if (conf) {
			//if(winPopup){
			//  winPopup.close();
			//}

			winPopup = window.open("/etc/etcPoProfile.do", "지형단면도", "width=1200,height=500");
			//cfWindowOpen("지형단면도", '/etc/etcPoProfile.do', 1200, 500, false, '', 'center');

		}
	} else {
		alert("표고점이 2개 이상 있어야 지형단면도를 표시 할수 있습니다.");

	}

	//topographToolbar.deactivate(); //topographToolbar 정지
}


//차단제수변 검색 toolbar 세팅
function waterControlToolbarSet() {
	crossSectionToolbar = new esri.toolbars.Draw(m_MainMap);
	crossSectionToolbar.on("draw-end", waterControlSearch);
	crossSectionToolbar.activate(esri.toolbars.Draw.POINT);
}

//차단제수변 검색
function waterControlSearch(evt) {
	$.each(m_MainMap.graphicsLayerIds, function(i, data) {
		m_MainMap.getLayer(data).clear();
	});
	m_MainMap.graphics.clear();
	m_MainMap.infoWindow.hide();

	wCGeometery = "";
	wCGeometery = evt.geometry;
	var params = new esri.tasks.BufferParameters();
	params.geometries = [evt.geometry];

	//buffer in linear units such as meters, km, miles etc.
	params.distances = [5];
	params.unit = esri.tasks.GeometryService.UNIT_METER;
	params.outSpatialReference = m_MainMap.spatialReference;

	geometryService.buffer(params, waterControlSearchBuffer);

	drawPointPictureGraphic("", evt.geometry, null, "/images/icon/sIcon_citizen00.png", 24, 24, 0, 0);

}

//차단제수변 상수관로 검색
function waterControlSearchBuffer(geometries) {

	var symbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([0, 0, 255, 0.65]), 2),
			new dojo.Color([0, 0, 255, 0.35]));

	dojo.forEach(geometries, function (geometry) {

		var query = new esri.tasks.Query();
		query.outFields = ["*"];
		query.returnGeometry = true;
		query.geometry = geometry;
		query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

		var layerId = getLayerId(basemap, "상수관로"); //검색할 레이어 아이디 값 조회

		var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //상수관로
		queryTask.execute(query, waterControlSearchResult);

	});
}

//차단제수변 상수관로 검색결과
function waterControlSearchResult(featureSet) {
	//
	waterworksPipeSet = "";
	//waterworksPipeSet = featureSet;//querytask의 결과값
	if (0 == featureSet.features.length) {
		alert("가까운 상수관로를 찾을 수 없습니다.");
	}

	var objectid = featureSet.features[0].attributes["OBJECTID"]; //OBJECTID
	var waterworksFind = new esri.tasks.FindTask(urlBasemap);
	var params = new esri.tasks.FindParameters();
	var layerId = getLayerId(basemap, "상수관로"); //검색할 레이어 아이디 값 조회

	params.layerIds = [layerId];
	params.searchFields = ["OBJECTID"];
	params.returnGeometry = true;
	params.searchText = objectid;
	//find.execute(params, getFindTaskResult);

	waterworksFind.execute(params, function (results) {
		//
		waterworksPipeSet = results;

	});

	var paths = featureSet.features[0].geometry.paths[0];
	drawPolyLineArr('WIL', paths, '1', '#339933'); //검색된 상수관로 지도에 표현

	var startPoint = featureSet.features[0].geometry.getPoint(0, 0);
	var endPoint = featureSet.features[0].geometry.getPoint(0, paths.length - 1);

	var params1 = new esri.tasks.BufferParameters();
	params1.geometries = [startPoint];
	params1.distances = [5];
	params1.unit = esri.tasks.GeometryService.UNIT_METER;
	params1.outSpatialReference = m_MainMap.spatialReference;
	geometryService.buffer(params1, waPipeCloseStartBuffer);

	var params2 = new esri.tasks.BufferParameters();
	params2.geometries = [endPoint];
	params2.distances = [5];
	params2.unit = esri.tasks.GeometryService.UNIT_METER;
	params2.outSpatialReference = m_MainMap.spatialReference;
	geometryService.buffer(params2, waPipeCloseEndBuffer);

	//급수관로 검색
	var query = new esri.tasks.Query();
	query.outFields = ["*"];
	query.returnGeometry = true;
	query.geometry = featureSet.features[0].geometry;
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	var layerId = getLayerId(basemap, "급수관로"); //검색할 레이어 아이디 값 조회
	var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //상수관로
	queryTask.execute(query, waterPipeResult);

	//변류시설 검색
	/*var query = new esri.tasks.Query();
	query.outFields = ["*"];
	query.where = "FTR_CDE = 'S'A200'";
	query.returnGeometry = true;
	query.geometry =  featureSet.features[0].geometry;
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	var layerId = getLayerId(basemap, "변류시설"); //검색할 레이어 아이디 값 조회
	var queryTask = new esri.tasks.QueryTask(urlBasemap+"/"+layerId);//상수관로
	queryTask.execute(query, waterPipeCloseResult);*/

	//툴바 해제
	//crossSectionToolbar.deactivate();

	cfWindowOpen("차단제수변", '/etc/etcWaterControlPopup.do', 1100, 350, false, '', 'center');

}
//급수관 검색결과
function waterPipeResult(featureSet) {

	waterPipeSet = "";

	waterPipeSet = featureSet;
	waterPipeMeterSet = [];
	for (var i = 0; i < featureSet.features.length; i++) {

		//급수관 task검색
		var objectid = featureSet.features[i].attributes["OBJECTID"]; //OBJECTID
		var waterPipeFind = new esri.tasks.FindTask(urlBasemap);
		var params = new esri.tasks.FindParameters();
		var layerId = getLayerId(basemap, "급수관로"); //검색할 레이어 아이디 값 조회

		params.layerIds = [layerId];
		params.searchFields = ["OBJECTID"];
		params.returnGeometry = true;
		params.searchText = objectid;
		//find.execute(params, getFindTaskResult);

		waterPipeFind.execute(params, function (results) {
			//waterworksPipeSet = results;
			waterPipeTaskSet.push(results);
		});

		//급수전계량기 검색
		var paths = featureSet.features[i].geometry.paths[0];
		drawPolyLineArr('WIL', paths, '1', '#FF9933'); //검색된 상수관로 지도에 표현

		var query = new esri.tasks.Query();
		query.outFields = ["*"];
		query.returnGeometry = true;
		query.geometry = featureSet.features[i].geometry;
		query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

		var layerId = getLayerId(basemap, "급수전계량기"); //검색할 레이어 아이디 값 조회

		var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //상수관로
		queryTask.execute(query, waterPipeMeterResult);
	}
}

function waterPipeMeterResult(featureSet) {
	//waterPipeMeterSet.push(featureSet);

	var point = featureSet.features[0].geometry;
	drawPointPictureGraphic("WIL", point, null, "/images/icon/meter.png", 24, 24, 0, 0);

	var objectid = featureSet.features[0].attributes["OBJECTID"]; //OBJECTID
	var waterPipeMeterFind = new esri.tasks.FindTask(urlBasemap);
	var params = new esri.tasks.FindParameters();
	var layerId = getLayerId(basemap, "급수전계량기"); //검색할 레이어 아이디 값 조회

	params.layerIds = [layerId];
	params.searchFields = ["OBJECTID"];
	params.returnGeometry = true;
	params.searchText = objectid;
	//find.execute(params, getFindTaskResult);

	waterPipeMeterFind.execute(params, function (results) {
		//
		//waterworksPipeSet = results;
		waterPipeMeterSet.push(results);
	});

	setTimeout(waterworksPipeList, 2000);
}

//상수관 시작점에서 변류시설를 검색 쿼리
function waPipeCloseStartBuffer(geometries) {
	//
	var symbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([0, 0, 255, 0.65]), 2),
			new dojo.Color([0, 0, 255, 0.35]));

	dojo.forEach(geometries, function (geometry) {

		var query = new esri.tasks.Query();
		query.outFields = ["*"];
		//query.where = "FTR_CDE = 'SA200'";
		query.returnGeometry = true;
		query.geometry = geometry;
		query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

		var layerId = getLayerId(basemap, "변류시설"); //검색할 레이어 아이디 값 조회

		var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //상수관로
		queryTask.execute(query, waPipeCloseStartResult);

	});
}

//상수관 시작점에서 변류시설를 검색 결과
function waPipeCloseStartResult(featureSet) {

	//
	waPipeCloseStartSet = "";
	waPipeCloseStartSet = featureSet;
	waPipeCloseStartTaskSet = [];

	for (var i = 0; i < featureSet.features.length; i++) {

		var point = featureSet.features[i].geometry;
		drawPointPictureGraphic("WIL", point, null, "/images/icon/water_close.png", 24, 24, 0, 0);

		var objectid = featureSet.features[i].attributes["OBJECTID"]; //OBJECTID
		var waterPipeMeterFind = new esri.tasks.FindTask(urlBasemap);
		var params = new esri.tasks.FindParameters();
		var layerId = getLayerId(basemap, "변류시설"); //검색할 레이어 아이디 값 조회

		params.layerIds = [layerId];
		params.searchFields = ["OBJECTID"];
		params.returnGeometry = true;
		params.searchText = objectid;
		//find.execute(params, getFindTaskResult);

		waterPipeMeterFind.execute(params, function (results) {
			//
			//waterworksPipeSet = results;
			waPipeCloseStartTaskSet.push(results);

		});

	}

}

//상수관 종점에서 변류시설를 검색 쿼리

function waPipeCloseEndBuffer(geometries) {
	//
	var symbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID,
			new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				new dojo.Color([0, 0, 255, 0.65]), 2),
			new dojo.Color([0, 0, 255, 0.35]));

	dojo.forEach(geometries, function (geometry) {

		var query = new esri.tasks.Query();
		query.outFields = ["*"];
		//query.where = "FTR_CDE = 'SA200'";
		query.returnGeometry = true;
		query.geometry = geometry;
		query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

		var layerId = getLayerId(basemap, "변류시설"); //검색할 레이어 아이디 값 조회

		var queryTask = new esri.tasks.QueryTask(urlBasemap + "/" + layerId); //상수관로
		queryTask.execute(query, waPipeCloseEndResult);

	});
}

//상수관 시작점에서 변류시설를 검색 결과
function waPipeCloseEndResult(featureSet) {

	//
	waPipeCloseEndSet = "";
	waPipeCloseEndSet = featureSet;
	waPipeCloseEndTaskSet = [];

	for (var i = 0; i < featureSet.features.length; i++) {

		var point = featureSet.features[i].geometry;
		drawPointPictureGraphic("WIL", point, null, "/images/icon/water_close.png", 24, 24, 0, 0);

		var objectid = featureSet.features[i].attributes["OBJECTID"]; //OBJECTID
		var waterPipeMeterFind = new esri.tasks.FindTask(urlBasemap);
		var params = new esri.tasks.FindParameters();
		var layerId = getLayerId(basemap, "변류시설"); //검색할 레이어 아이디 값 조회

		params.layerIds = [layerId];
		params.searchFields = ["OBJECTID"];
		params.returnGeometry = true;
		params.searchText = objectid;
		//find.execute(params, getFindTaskResult);

		waterPipeMeterFind.execute(params, function (results) {
			//
			//waterworksPipeSet = results;
			waPipeCloseEndTaskSet.push(results);

		});

	}

}

//급수전계량기
function waterPipeMeterList() {

	waPipeKind = 'waterPipeMeterList';

	var waterPipeMeterSet2 = waterPipeMeterSet;

	var htmlColTmp = "<colgroup>";
	htmlColTmp += "<col width='30px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='100px'>";
	//htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='150px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "</colgroup>";

	var htmlHeadTmp = "<thead>";
	htmlHeadTmp += "<tr>";
	htmlHeadTmp += "<th></th>";
	htmlHeadTmp += "<th>수전번호</th>";
	htmlHeadTmp += "<th>수전번호일련번호</th>";
	htmlHeadTmp += "<th>설계구분</th>";
	htmlHeadTmp += "<th>급수블럭</th>";
	htmlHeadTmp += "<th>호별계량기개수</th>";
	htmlHeadTmp += "<th>수용가명</th>";
	htmlHeadTmp += "<th>수정전수용가명</th>";
	htmlHeadTmp += "<th>구경</th>";
	htmlHeadTmp += "<th>업종</th>";
	htmlHeadTmp += "<th>기물번호</th>";

	htmlHeadTmp += "<th>형식</th>";
	htmlHeadTmp += "<th>민원접수번호</th>";
	htmlHeadTmp += "<th>작업구분</th>";
	htmlHeadTmp += "<th>작업사유</th>";
	htmlHeadTmp += "<th>작업자명</th>";
	htmlHeadTmp += "<th>법정동</th>";
	htmlHeadTmp += "<th>행정동</th>";
	htmlHeadTmp += "<th>주소산구분</th>";
	htmlHeadTmp += "<th>주소본번</th>";
	htmlHeadTmp += "<th>주소부번</th>";

	htmlHeadTmp += "<th>주소번지설명</th>";
	//htmlHeadTmp += "<th>수정전주소</th>";
	htmlHeadTmp += "<th>계량기위치</th>";
	htmlHeadTmp += "<th>설치일자</th>";
	htmlHeadTmp += "<th>설치지침수</th>";
	htmlHeadTmp += "<th>제작업체명</th>";
	htmlHeadTmp += "<th>공사업체</th>";
	htmlHeadTmp += "<th>폐전여부</th>";
	htmlHeadTmp += "<th>관리부서</th>";
	htmlHeadTmp += "<th>공사착수일자</th>";

	htmlHeadTmp += "<th>공사준공일자</th>";
	htmlHeadTmp += "<th>수용가전화번호1</th>";
	htmlHeadTmp += "<th>수용가전화번호2</th>";
	htmlHeadTmp += "<th>새주소가로명</th>";
	htmlHeadTmp += "<th>새주소본번</th>";
	htmlHeadTmp += "<th>새주소부번</th>";
	htmlHeadTmp += "<th>새주소번지설명</th>";
	htmlHeadTmp += "<th>수용가번호</th>";
	htmlHeadTmp += "<th>통합공과금번호</th>";
	htmlHeadTmp += "<th>도엽번호</th>";

	htmlHeadTmp += "<th>봉인일자</th>";
	htmlHeadTmp += "<th>봉인여부</th>";

	htmlHeadTmp += "</tr>";
	htmlHeadTmp += "</thead>";
	var htmlTmp = "";

	for (var i = 0; i < waterPipeMeterSet.length; i++) {

		//if(waterPipeMeterSet[i].feature.length > 0){
		var objectid = waterPipeMeterSet[i][0].feature.attributes["OBJECTID"]; //OBJECTID //급수전계량기


		var sjn_idn = waterPipeMeterSet[i][0].feature.attributes["수전번호"]; //수전번호
		var sjn_num = waterPipeMeterSet[i][0].feature.attributes["수전번호_일련번호"]; //수전번호일련번호
		var sul_cde = waterPipeMeterSet[i][0].feature.attributes["설계구분코드"]; //설계구분코드
		var blk_num = waterPipeMeterSet[i][0].feature.attributes["급수블럭"]; //급수블럭
		var hog_cnt = waterPipeMeterSet[i][0].feature.attributes["호별계량기개수"]; //호별계량기개수

		var hom_nam = waterPipeMeterSet[i][0].feature.attributes["수용가성명"]; //수용가명
		var bhm_nam = waterPipeMeterSet[i][0].feature.attributes["수정전수용가명"]; //수정전수용가명
		var met_dip = waterPipeMeterSet[i][0].feature.attributes["계량기구경"]; //계량기구경
		var sbi_cde = waterPipeMeterSet[i][0].feature.attributes["업종"]; //업종
		var met_num = waterPipeMeterSet[i][0].feature.attributes["계량기기물번호"]; //계량기 기물번호

		var met_mof = waterPipeMeterSet[i][0].feature.attributes["계량기형식"]; //계량기 형식
		var rcv_num = waterPipeMeterSet[i][0].feature.attributes["민원접수번호"]; //민원접수번호
		var cgb_cde = waterPipeMeterSet[i][0].feature.attributes["작업구분"]; //작업구분 000
		var crs_cde = waterPipeMeterSet[i][0].feature.attributes["교체사유"]; //작업사유  000 교체사유
		var exc_nam = waterPipeMeterSet[i][0].feature.attributes["작업자성명"]; //작업자명

		var bjd_cde = waterPipeMeterSet[i][0].feature.attributes["법정동코드"]; //법정동코드
		var hjd_cde = waterPipeMeterSet[i][0].feature.attributes["행정읍/면/동"]; //행정읍/면/동 000
		var old_san = waterPipeMeterSet[i][0].feature.attributes["주소_산구분"]; //주소산구분  000 주소_산구분
		var old_bon = waterPipeMeterSet[i][0].feature.attributes["주소_본번"]; //주소본번
		var old_bub = waterPipeMeterSet[i][0].feature.attributes["주소_부번"]; //주소부번


		var hom_adr = ""; //주소번지설명
		//var ang_dir = waterPipeMeterSet[i][0].feature.attributes["ATR_NAM"];//수정전주소
		var met_loc = waterPipeMeterSet[i][0].feature.attributes["계량기위치"]; //계량기위치
		var ist_ymd = waterPipeMeterSet[i][0].feature.attributes["설치일자"]; //설치일자
		var met_inl = waterPipeMeterSet[i][0].feature.attributes["계량기설치지침"]; //설치지침수

		var prd_num = waterPipeMeterSet[i][0].feature.attributes["계량기제작회사명"]; //제작업체명
		var com_idn = waterPipeMeterSet[i][0].feature.attributes["공사업체코드"]; //공사업체
		var dcn_cde = waterPipeMeterSet[i][0].feature.attributes["계량기페전여부"]; //폐전여부  000
		var dpt_cde = waterPipeMeterSet[i][0].feature.attributes["관리부서"]; //관리부서
		var str_ymd = waterPipeMeterSet[i][0].feature.attributes["공사착수일"]; //공사착수일자


		var end_ymd = waterPipeMeterSet[i][0].feature.attributes["공사준공일"]; //공사준공일자
		var hom_tel = waterPipeMeterSet[i][0].feature.attributes["수용가전화번호"]; //수용가전화번호1
		var hom_tel2 = waterPipeMeterSet[i][0].feature.attributes["수용가전화번호2"]; //수용가전화번호2
		var new_rod = waterPipeMeterSet[i][0].feature.attributes["새주소_가로명"]; //새주소가로명
		var new_bon = waterPipeMeterSet[i][0].feature.attributes["새주소_본번"]; //새주소본번

		var new_bub = waterPipeMeterSet[i][0].feature.attributes["새주소_부번"]; //새주소부번
		var new_des = waterPipeMeterSet[i][0].feature.attributes["새주소_번지설명"]; //새주소번지설명
		var hom_num = waterPipeMeterSet[i][0].feature.attributes["수용가번호"]; //수용가번호
		var tid_num = waterPipeMeterSet[i][0].feature.attributes["통합공과금번호"]; //통합공과금번호
		var sht_num = waterPipeMeterSet[i][0].feature.attributes["도엽번호"]; //도엽번호


		var bng_ymd = waterPipeMeterSet[i][0].feature.attributes["봉인날짜"]; //봉인일자
		var bng_cde = waterPipeMeterSet[i][0].feature.attributes["봉인여부"]; //봉인여부


		/*var objectid = waterPipeMeterSet[i].features[0].attributes["OBJECTID"];//OBJECTID

		var sjn_idn = waterPipeMeterSet[i].features[0].attributes["SJN_IDN"];//수전번호
		var sjn_num = waterPipeMeterSet[i].features[0].attributes["SJN_NUM"];//수전번호일련번호
		var sul_cde = waterPipeMeterSet[i].features[0].attributes["SUL_CDE"];//설계구분코드 000



		var blk_num = waterPipeMeterSet[i].features[0].attributes["BLK_NUM"];//급수블럭
		var hog_cnt = waterPipeMeterSet[i].features[0].attributes["HOG_CNT"];//호별계량기개수

		var hom_nam = waterPipeMeterSet[i].features[0].attributes["HOM_NAM"];//수용가명
		var bhm_nam = waterPipeMeterSet[i].features[0].attributes["BHM_NAM"];//수정전수용가명
		var met_dip = waterPipeMeterSet[i].features[0].attributes["MET_DIP"];//계량기 구경
		var sbi_cde = waterPipeMeterSet[i].features[0].attributes["SBI_CDE"];//업종 000

		var met_num = waterPipeMeterSet[i].features[0].attributes["MET_NUM"];//계량기 기물번호
		var met_mof = waterPipeMeterSet[i].features[0].attributes["MET_MOF"];//계량기 형식
		var rcv_num = waterPipeMeterSet[i].features[0].attributes["RCV_NUM"];//민원접수번호
		var cgb_cde = waterPipeMeterSet[i].features[0].attributes["CGB_CDE"];//작업구분 000 x

		var crs_cde = waterPipeMeterSet[i].features[0].attributes["CRS_CDE"];//작업사유  000 교체사유

		var exc_nam = waterPipeMeterSet[i].features[0].attributes["EXC_NAM"];//작업자명
		var bjd_cde = waterPipeMeterSet[i].features[0].attributes["BJD_CDE"];//법정동코드

		var hjd_cde = waterPipeMeterSet[i].features[0].attributes["HJD_CDE"];//행정읍/면/동 000

		var old_san = waterPipeMeterSet[i].features[0].attributes["OLD_SAN"];//주소산구분  000 주소_산구분



		var old_bon = waterPipeMeterSet[i].features[0].attributes["OLD_BON"];//주소본번
		var old_bub = waterPipeMeterSet[i].features[0].attributes["OLD_BUB"];//주소부번



		var hom_adr = waterPipeMeterSet[i].features[0].attributes["HOM_ADR"];//주소번지설명
		//var ang_dir = waterPipeMeterSet[i].features[0].attributes["ATR_NAM"];//수정전주소 X
		var met_loc = waterPipeMeterSet[i].features[0].attributes["MET_LOC"];//계량기위치
		var ist_ymd = waterPipeMeterSet[i].features[0].attributes["IST_YMD"];//설치일자
		var met_inl = waterPipeMeterSet[i].features[0].attributes["MET_INL"];//설치지침수

		var prd_num = waterPipeMeterSet[i].features[0].attributes["PRD_NUM"];//제작업체명
		var com_idn = waterPipeMeterSet[i].features[0].attributes["COM_IDN"];//공사업체
		var dcn_cde = waterPipeMeterSet[i].features[0].attributes["DCN_CDE"];//폐전여부  000
		var dpt_cde = waterPipeMeterSet[i].features[0].attributes["DPT_CDE"];//관리부서
		var str_ymd = waterPipeMeterSet[i].features[0].attributes["STR_YMD"];//공사착수일자


		var end_ymd = waterPipeMeterSet[i].features[0].attributes["END_YMD"];//공사준공일자
		var hom_tel = waterPipeMeterSet[i].features[0].attributes["HOM_TEL"];//수용가전화번호1
		var hom_tel2 = waterPipeMeterSet[i].features[0].attributes["HOM_TEL2"];//수용가전화번호2
		var new_rod = waterPipeMeterSet[i].features[0].attributes["NEW_ROD"];//새주소가로명
		var new_bon = waterPipeMeterSet[i].features[0].attributes["NEW_BON"];//새주소본번

		var new_bub = waterPipeMeterSet[i].features[0].attributes["NEW_BUB"];//새주소부번
		var new_des = waterPipeMeterSet[i].features[0].attributes["NEW_DES"];//새주소번지설명
		var hom_num = waterPipeMeterSet[i].features[0].attributes["HOM_NUM"];//수용가번호
		var tid_num = waterPipeMeterSet[i].features[0].attributes["TID_NUM"];//통합공과금번호
		var sht_num = waterPipeMeterSet[i].features[0].attributes["SHT_NUM"];//도엽번호


		var bng_ymd = waterPipeMeterSet[i].features[0].attributes["BNG_YMD"];//봉인일자
		var bng_cde = waterPipeMeterSet[i].features[0].attributes["BNG_CDE"];//봉인여부*/

		htmlTmp += "<tr>";
		htmlTmp += "<td><input type='checkbox' id='chk_wpm' name='chk_wpm' value='" + i + "'/></td>";
		htmlTmp += "<td>" + sjn_idn + "</td>";
		htmlTmp += "<td>" + sjn_num + "</td>";
		htmlTmp += "<td>" + sul_cde + "</td>";
		htmlTmp += "<td>" + blk_num + "</td>";
		htmlTmp += "<td>" + hog_cnt + "</td>";
		htmlTmp += "<td>" + hom_nam + "</td>";
		htmlTmp += "<td>" + bhm_nam + "</td>";
		htmlTmp += "<td>" + met_dip + "</td>";
		htmlTmp += "<td>" + sbi_cde + "</td>";
		htmlTmp += "<td>" + met_num + "</td>";

		htmlTmp += "<td>" + met_mof + "</td>";
		htmlTmp += "<td>" + rcv_num + "</td>";
		htmlTmp += "<td>" + cgb_cde + "</td>";
		htmlTmp += "<td>" + crs_cde + "</td>";
		htmlTmp += "<td>" + exc_nam + "</td>";
		htmlTmp += "<td>" + bjd_cde + "</td>";
		htmlTmp += "<td>" + hjd_cde + "</td>";
		htmlTmp += "<td>" + old_san + "</td>";
		htmlTmp += "<td>" + old_bon + "</td>";
		htmlTmp += "<td>" + old_bub + "</td>";

		htmlTmp += "<td>" + hom_adr + "</td>";
		//htmlTmp += 	"<td>"+ang_dir+"</td>";
		htmlTmp += "<td>" + met_loc + "</td>";
		htmlTmp += "<td>" + ist_ymd + "</td>";
		htmlTmp += "<td>" + met_inl + "</td>";
		htmlTmp += "<td>" + prd_num + "</td>";
		htmlTmp += "<td>" + com_idn + "</td>";
		htmlTmp += "<td>" + dcn_cde + "</td>";
		htmlTmp += "<td>" + dpt_cde + "</td>";
		htmlTmp += "<td>" + str_ymd + "</td>";

		htmlTmp += "<td>" + end_ymd + "</td>";
		htmlTmp += "<td>" + hom_tel + "</td>";
		htmlTmp += "<td>" + hom_tel2 + "</td>";
		htmlTmp += "<td>" + new_rod + "</td>";
		htmlTmp += "<td>" + new_bon + "</td>";
		htmlTmp += "<td>" + new_bub + "</td>";
		htmlTmp += "<td>" + new_des + "</td>";
		htmlTmp += "<td>" + hom_num + "</td>";
		htmlTmp += "<td>" + tid_num + "</td>";
		htmlTmp += "<td>" + sht_num + "</td>";

		htmlTmp += "<td>" + bng_ymd + "</td>";
		htmlTmp += "<td>" + bng_cde + "</td>";

		htmlTmp += "</tr>";
		//}

	}

	$("#wworksPipeList").html("<table class='list'>" + htmlColTmp + htmlHeadTmp + htmlTmp + "</table>");
}

//급수관로 ok
function waterPipeList() {

	waPipeKind = 'waterPipeList';
	var waterPipeSet2 = waterPipeSet; //급수관로
	var waterPipeTaskSet2 = waterPipeTaskSet; //급수관로


	var htmlColTmp = "<colgroup>";
	htmlColTmp += "<col width='30px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";

	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";

	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='120px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	//htmlColTmp += "<col width='100px'>";
	htmlColTmp += "</colgroup>";

	var htmlHeadTmp = "<thead>";
	htmlHeadTmp += "<tr>";
	htmlHeadTmp += "<th></th>";
	htmlHeadTmp += "<th>시설명</th>";
	htmlHeadTmp += "<th>일련번호</th>";
	htmlHeadTmp += "<th>도엽번호</th>";
	htmlHeadTmp += "<th>행정동명</th>";
	htmlHeadTmp += "<th>관리부서</th>";
	htmlHeadTmp += "<th>관용도</th>";
	htmlHeadTmp += "<th>폐관여부</th>";
	htmlHeadTmp += "<th>재질1</th>";
	htmlHeadTmp += "<th>관경1</th>";
	htmlHeadTmp += "<th>연장1</th>";

	htmlHeadTmp += "<th>평균깊이1</th>";
	htmlHeadTmp += "<th>접합종류1</th>";
	htmlHeadTmp += "<th>재질2</th>";
	htmlHeadTmp += "<th>관경2</th>";
	htmlHeadTmp += "<th>연장2</th>";
	htmlHeadTmp += "<th>평균깊이2</th>";
	htmlHeadTmp += "<th>접합종류2</th>";
	htmlHeadTmp += "<th>재질3</th>";
	htmlHeadTmp += "<th>관경3</th>";
	htmlHeadTmp += "<th>연장3</th>";

	htmlHeadTmp += "<th>평균깊이3</th>";
	htmlHeadTmp += "<th>접합종류3</th>";
	htmlHeadTmp += "<th>재질4</th>";
	htmlHeadTmp += "<th>관경4</th>";
	htmlHeadTmp += "<th>연장4</th>";
	htmlHeadTmp += "<th>평균깊이4</th>";
	htmlHeadTmp += "<th>접합종류4</th>";
	htmlHeadTmp += "<th>재질5</th>";
	htmlHeadTmp += "<th>관경5</th>";
	htmlHeadTmp += "<th>연장5</th>";

	htmlHeadTmp += "<th>평균깊이5</th>";
	htmlHeadTmp += "<th>접합종류5</th>";
	htmlHeadTmp += "<th>설치년도</th>";
	//htmlHeadTmp += "<th>설치월일</th>";
	htmlHeadTmp += "<th>공사번호</th>";
	htmlHeadTmp += "<th>수전번호</th>";
	htmlHeadTmp += "<th>수전번호일련번호</th>";
	htmlHeadTmp += "<th>시스템연장</th>";
	htmlHeadTmp += "<th>도형최종수정일자</th>";
	htmlHeadTmp += "<th>도형최종수정자명</th>";

	htmlHeadTmp += "<th>속성최종수정일자</th>";
	htmlHeadTmp += "<th>속성최종수정자명</th>";

	htmlHeadTmp += "</tr>";
	htmlHeadTmp += "</thead>";

	var htmlTmp = "";
	for (var i = 0; i < waterPipeTaskSet.length; i++) {

		//시설명
		//일련번호
		//var ang_dir = waterPipeSet.features[i].attributes["ANG_DIR"];//시설명 CNT_NUM:공사번호

		var ftr_idn = waterPipeTaskSet[i][0].feature.attributes["공사번호"];
		var sht_num = waterPipeTaskSet[i][0].feature.attributes["도엽번호"]; //도엽번호
		var hjd_cde = waterPipeTaskSet[i][0].feature.attributes["행정읍/면/동"]; //행정동명
		var dpt_cde = waterPipeTaskSet[i][0].feature.attributes["관리부서"]; //관리부서

		var saa_cde = waterPipeTaskSet[i][0].feature.attributes["상수관용도"]; //관용도
		var cod_cde = waterPipeTaskSet[i][0].feature.attributes["폐관여부"]; //폐관여부
		var mop_cde1 = waterPipeTaskSet[i][0].feature.attributes["재질1"]; //재질1
		var pip_dip1 = waterPipeTaskSet[i][0].feature.attributes["구경1"]; //관경1
		var pip_len1 = waterPipeTaskSet[i][0].feature.attributes["연장1"]; //연장1

		//20
		var avg_dep1 = waterPipeTaskSet[i][0].feature.attributes["평균깊이1"]; //평균깊이1
		var jht_cde1 = waterPipeTaskSet[i][0].feature.attributes["접합종류1"]; //접합종류1
		var mop_cde2 = waterPipeTaskSet[i][0].feature.attributes["재질2"]; //재질2
		var pip_dip2 = waterPipeTaskSet[i][0].feature.attributes["구경2"]; //관경2
		var pip_len2 = waterPipeTaskSet[i][0].feature.attributes["연장2"]; //연장2

		var avg_dep2 = waterPipeTaskSet[i][0].feature.attributes["평균깊이2"]; //평균깊이2
		var jht_cde2 = waterPipeTaskSet[i][0].feature.attributes["접합종류2"]; //접합종류2
		var mop_cde3 = waterPipeTaskSet[i][0].feature.attributes["재질3"]; //재질3
		var pip_dip3 = waterPipeTaskSet[i][0].feature.attributes["구경3"]; //관경3
		var pip_len3 = waterPipeTaskSet[i][0].feature.attributes["연장3"]; //연장3

		//30
		var avg_dep3 = waterPipeTaskSet[i][0].feature.attributes["평균깊이3"]; //평균깊이3
		var jht_cde3 = waterPipeTaskSet[i][0].feature.attributes["접합종류3"]; //접합종류3
		var mop_cde4 = waterPipeTaskSet[i][0].feature.attributes["재질4"]; //재질4
		var pip_dip4 = waterPipeTaskSet[i][0].feature.attributes["구경4"]; //관경4
		var pip_len4 = waterPipeTaskSet[i][0].feature.attributes["연장4"]; //연장4

		var avg_dep4 = waterPipeTaskSet[i][0].feature.attributes["평균깊이4"]; //평균깊이4
		var jht_cde4 = waterPipeTaskSet[i][0].feature.attributes["접합종류4"]; //접합종류4
		var mop_cde5 = waterPipeTaskSet[i][0].feature.attributes["재질5"]; //재질5
		var pip_dip5 = waterPipeTaskSet[i][0].feature.attributes["구경5"]; //관경5
		var pip_len5 = waterPipeTaskSet[i][0].feature.attributes["연장5"]; //연장5
		//40
		var avg_dep5 = waterPipeTaskSet[i][0].feature.attributes["평균깊이5"]; //평균깊이5
		var jht_cde5 = waterPipeTaskSet[i][0].feature.attributes["접합종류5"]; //접합종류5

		var ist_ymd = waterPipeTaskSet[i][0].feature.attributes["설치일자"]; //설치년도
		//var ang_dir = waterPipeTaskSet[i][0].feature.attributes["ANG_DIR"];//설치월일
		var cnt_num = waterPipeTaskSet[i][0].feature.attributes["공사번호"]; //공사번호

		var sjn_idn = waterPipeTaskSet[i][0].feature.attributes["수전번호"]; //수전번호
		var sjn_num = waterPipeTaskSet[i][0].feature.attributes["수전번호_일련번호"]; //수전번호일련번호
		var sys_len = waterPipeTaskSet[i][0].feature.attributes["시스템연장"]; //시스템연장
		var shp_ymd = waterPipeTaskSet[i][0].feature.attributes["도형최종수정일자"]; //도형최종수정일자
		var shp_nam = waterPipeTaskSet[i][0].feature.attributes["도형최종수정자명"]; //도형최종수정자명

		var atr_ymd = waterPipeTaskSet[i][0].feature.attributes["속성최종수정일자"]; //속성최종수정일자
		var atr_nam = waterPipeTaskSet[i][0].feature.attributes["속성최종수정자명"]; //속성최종수정자명

		/*
		var ftr_idn = waterPipeSet.features[i].attributes["FTR_IDN"];//일련번호
		var sht_num = waterPipeSet.features[i].attributes["SHT_NUM"];//도엽번호
		var hjd_cde = waterPipeSet.features[i].attributes["HJD_CDE"];//행정동명
		var dpt_cde = waterPipeSet.features[i].attributes["DPT_CDE"];//관리부서

		var saa_cde = waterPipeSet.features[i].attributes["SAA_CDE"];//관용도
		var cod_cde = waterPipeSet.features[i].attributes["COD_CDE"];//폐관여부
		var mop_cde1 = waterPipeSet.features[i].attributes["MOP_CDE1"];//재질1
		var pip_dip1 = waterPipeSet.features[i].attributes["PIP_DIP1"];//관경1
		var pip_len1 = waterPipeSet.features[i].attributes["PIP_LEN1"];//연장1

		//20
		var avg_dep1 = waterPipeSet.features[i].attributes["AVG_DEP1"];//평균깊이1
		var jht_cde1 = waterPipeSet.features[i].attributes["JHT_CDE1"];//접합종류1
		var mop_cde2 = waterPipeSet.features[i].attributes["MOP_CDE2"];//재질2
		var pip_dip2 = waterPipeSet.features[i].attributes["PIP_DIP2"];//관경2
		var pip_len2 = waterPipeSet.features[i].attributes["PIP_LEN2"];//연장2

		var avg_dep2 = waterPipeSet.features[i].attributes["AVG_DEP2"];//평균깊이2
		var jht_cde2 = waterPipeSet.features[i].attributes["JHT_CDE2"];//접합종류2
		var mop_cde3 = waterPipeSet.features[i].attributes["MOP_CDE3"];//재질3
		var pip_dip3 = waterPipeSet.features[i].attributes["PIP_DIP3"];//관경3
		var pip_len3 = waterPipeSet.features[i].attributes["PIP_LEN3"];//연장3

		//30
		var avg_dep3 = waterPipeSet.features[i].attributes["AVG_DEP3"];//평균깊이3
		var jht_cde3 = waterPipeSet.features[i].attributes["JHT_CDE3"];//접합종류3
		var mop_cde4 = waterPipeSet.features[i].attributes["MOP_CDE4"];//재질4
		var pip_dip4 = waterPipeSet.features[i].attributes["PIP_DIP4"];//관경4
		var pip_len4 = waterPipeSet.features[i].attributes["PIP_LEN4"];//연장4

		var avg_dep4 = waterPipeSet.features[i].attributes["AVG_DEP4"];//평균깊이4
		var jht_cde4 = waterPipeSet.features[i].attributes["JHT_CDE4"];//접합종류4
		var mop_cde5 = waterPipeSet.features[i].attributes["MOP_CDE5"];//재질5
		var pip_dip5 = waterPipeSet.features[i].attributes["PIP_DIP5"];//관경5
		var pip_len5 = waterPipeSet.features[i].attributes["PIP_LEN5"];//연장5
		//40
		var avg_dep5 = waterPipeSet.features[i].attributes["AVG_DEP5"];//평균깊이5
		var jht_cde5 = waterPipeSet.features[i].attributes["JHT_CDE5"];//접합종류5

		var ist_ymd = waterPipeSet.features[i].attributes["IST_YMD"];//설치년도
		//var ang_dir = waterPipeSet.features[i].attributes["ANG_DIR"];//설치월일
		var cnt_num = waterPipeSet.features[i].attributes["CNT_NUM"];//공사번호

		var sjn_idn = waterPipeSet.features[i].attributes["SJN_IDN"];//수전번호
		var sjn_num = waterPipeSet.features[i].attributes["SJN_NUM"];//수전번호일련번호
		var sys_len = waterPipeSet.features[i].attributes["SYS_LEN"];//시스템연장
		var shp_ymd = waterPipeSet.features[i].attributes["SHP_YMD"];//도형최종수정일자
		var shp_nam = waterPipeSet.features[i].attributes["SHP_NAM"];//도형최종수정자명

		var atr_ymd = waterPipeSet.features[i].attributes["ATR_YMD"];//속성최종수정일자
		var atr_nam = waterPipeSet.features[i].attributes["ATR_NAM"];//속성최종수정자명
		 */

		htmlTmp += "<tr>";
		htmlTmp += "<td><input type='checkbox' id='chk_wps' name='chk_wps' value='" + i + "'/></td>";
		htmlTmp += "<td>급수관로</td>";
		htmlTmp += "<td>" + ftr_idn + "</td>";
		htmlTmp += "<td>" + sht_num + "</td>";
		htmlTmp += "<td>" + hjd_cde + "</td>";
		htmlTmp += "<td>" + dpt_cde + "</td>";
		htmlTmp += "<td>" + saa_cde + "</td>";
		htmlTmp += "<td>" + cod_cde + "</td>";
		htmlTmp += "<td>" + mop_cde1 + "</td>";
		htmlTmp += "<td>" + pip_dip1 + "</td>";
		htmlTmp += "<td>" + pip_len1 + "</td>";

		htmlTmp += "<td>" + avg_dep1 + "</td>";
		htmlTmp += "<td>" + jht_cde1 + "</td>";
		htmlTmp += "<td>" + mop_cde2 + "</td>";
		htmlTmp += "<td>" + pip_dip2 + "</td>";
		htmlTmp += "<td>" + pip_len2 + "</td>";
		htmlTmp += "<td>" + avg_dep2 + "</td>";
		htmlTmp += "<td>" + jht_cde2 + "</td>";
		htmlTmp += "<td>" + mop_cde3 + "</td>";
		htmlTmp += "<td>" + pip_dip3 + "</td>";
		htmlTmp += "<td>" + pip_len3 + "</td>";

		htmlTmp += "<td>" + avg_dep3 + "</td>";
		htmlTmp += "<td>" + jht_cde3 + "</td>";
		htmlTmp += "<td>" + mop_cde4 + "</td>";
		htmlTmp += "<td>" + pip_dip4 + "</td>";
		htmlTmp += "<td>" + pip_len4 + "</td>";
		htmlTmp += "<td>" + avg_dep4 + "</td>";
		htmlTmp += "<td>" + jht_cde4 + "</td>";
		htmlTmp += "<td>" + mop_cde5 + "</td>";
		htmlTmp += "<td>" + pip_dip5 + "</td>";
		htmlTmp += "<td>" + pip_len5 + "</td>";

		htmlTmp += "<td>" + avg_dep5 + "</td>";
		htmlTmp += "<td>" + jht_cde5 + "</td>";

		htmlTmp += "<td>" + ist_ymd + "</td>";
		htmlTmp += "<td>" + cnt_num + "</td>";
		htmlTmp += "<td>" + sjn_idn + "</td>";
		htmlTmp += "<td>" + sjn_num + "</td>";
		htmlTmp += "<td>" + sys_len + "</td>";
		htmlTmp += "<td>" + shp_ymd + "</td>";
		htmlTmp += "<td>" + shp_nam + "</td>";
		htmlTmp += "<td>" + atr_ymd + "</td>";

		htmlTmp += "<td>" + atr_nam + "</td>";
		//htmlTmp += 	"<td>"+ang_dir+"</td>";


		htmlTmp += "</tr>";

	}

	$("#wworksPipeList").html("<table class='list'>" + htmlColTmp + htmlHeadTmp + htmlTmp + "</table>");

}

//제수밸브
function waPipeCloseList() {

	waPipeKind = 'waPipeCloseList';
	var waPipeCloseStartSet2 = waPipeCloseStartSet; //제수밸브 시작점
	var waPipeCloseEndSet2 = waPipeCloseEndSet; //제수밸브 종점


	var wwaPipeCloseStartTaskSet2 = waPipeCloseStartTaskSet; //제수밸브 시작점
	var waPipeCloseEndTaskSet2 = waPipeCloseEndTaskSet; //제수밸브 종점


	var htmlColTmp = "<colgroup>";
	htmlColTmp += "<col width='30px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "</colgroup>";

	var htmlHeadTmp = "<thead>";
	htmlHeadTmp += "<tr>";
	htmlHeadTmp += "<th></th>";
	htmlHeadTmp += "<th>시설명</th>";
	htmlHeadTmp += "<th>일련번호</th>";
	htmlHeadTmp += "<th>행정동명</th>";
	htmlHeadTmp += "<th>관리부서</th>";
	htmlHeadTmp += "<th>설치일자</th>";
	htmlHeadTmp += "<th>제작업체명</th>";
	htmlHeadTmp += "<th>형식</th>";
	htmlHeadTmp += "<th>재질</th>";
	htmlHeadTmp += "<th>구경</th>";
	htmlHeadTmp += "<th>회전방향</th>";

	htmlHeadTmp += "<th>총회전수</th>";
	htmlHeadTmp += "<th>구동방법</th>";
	htmlHeadTmp += "<th>이상여부</th>";
	htmlHeadTmp += "<th>개폐여부</th>";
	htmlHeadTmp += "<th>공사번호</th>";
	htmlHeadTmp += "<th>공사명</th>";
	htmlHeadTmp += "<th>각도</th>";
	htmlHeadTmp += "<th>심도</th>";
	htmlHeadTmp += "<th>도엽번호</th>";
	htmlHeadTmp += "<th>도형최종수정일자</th>";

	htmlHeadTmp += "<th>도형최종수정자명</th>";
	htmlHeadTmp += "<th>속성최종수정일자</th>";
	htmlHeadTmp += "<th>속성최종수정자명</th>";

	htmlHeadTmp += "</tr>";
	htmlHeadTmp += "</thead>";

	var htmlTmp = "";
	var count = 0;
	for (var i = 0; i < waPipeCloseStartTaskSet.length; i++) {
		count++;
		var ftr_idn = waPipeCloseStartTaskSet[i][0].feature.attributes["관리번호"]; //일련번호

		var hjd_cde = waPipeCloseStartTaskSet[i][0].feature.attributes["행정읍/면/동"]; //행정동명
		var dpt_cde = waPipeCloseStartTaskSet[i][0].feature.attributes["관리부서"]; //관리부서
		var ist_ymd = waPipeCloseStartTaskSet[i][0].feature.attributes["설치일자"]; //설치일자
		var prd_nam = waPipeCloseStartTaskSet[i][0].feature.attributes["제작회사명"]; //제작업체명
		var val_mof = waPipeCloseStartTaskSet[i][0].feature.attributes["변류형식"]; //형식
		var val_mop = waPipeCloseStartTaskSet[i][0].feature.attributes["재질"]; //재질
		var val_dip = waPipeCloseStartTaskSet[i][0].feature.attributes["구경"]; //구경
		var sae_cde = waPipeCloseStartTaskSet[i][0].feature.attributes["회전방향"]; //회전방향

		var tro_cnt = waPipeCloseStartTaskSet[i][0].feature.attributes["총회전수"]; //총회전수 CRO_CNT:현재회전수
		var mth_cde = waPipeCloseStartTaskSet[i][0].feature.attributes["구동방법"]; //구동방법
		var cst_cde = waPipeCloseStartTaskSet[i][0].feature.attributes["이상상태"]; //이상여부
		var off_cde = waPipeCloseStartTaskSet[i][0].feature.attributes["개폐여부"]; //개폐여부
		var cnt_num = waPipeCloseStartTaskSet[i][0].feature.attributes["공사번호"]; //공사번호
		//var ANG_DIR =  waPipeCloseStartTaskSet[i][0].feature.attributes["ANG_DIR"];//공사명
		var ang_dir = waPipeCloseStartTaskSet[i][0].feature.attributes["방향각"]; //각도  //ANG_DIR1:심볼각도
		var val_dep = waPipeCloseStartTaskSet[i][0].feature.attributes["심도"]; //심도
		var sht_num = waPipeCloseStartTaskSet[i][0].feature.attributes["도엽번호"]; //도엽번호
		var shp_ymd = waPipeCloseStartTaskSet[i][0].feature.attributes["도형최종수정일자"]; //도형최종수정일자

		var shp_nam = waPipeCloseStartTaskSet[i][0].feature.attributes["도형최종수정자명"]; //도형최종수정자명
		var atr_ymd = waPipeCloseStartTaskSet[i][0].feature.attributes["속성최종수정일자"]; //속성최종수정일자
		var atr_nam = waPipeCloseStartTaskSet[i][0].feature.attributes["속성최종수정자명"]; //속성최종수정자명


		//시설명
		//일련번호
		//var ang_dir = waPipeCloseStartSet.features[i].attributes["ANG_DIR"];//시설명
		/*var ftr_idn = waPipeCloseStartSet.features[i].attributes["FTR_IDN"];//일련번호
		var hjd_cde = waPipeCloseStartSet.features[i].attributes["HJD_CDE"];//행정동명
		var dpt_cde = waPipeCloseStartSet.features[i].attributes["DPT_CDE"];//관리부서
		var ist_ymd = waPipeCloseStartSet.features[i].attributes["IST_YMD"];//설치일자
		var prd_nam = waPipeCloseStartSet.features[i].attributes["PRD_NAM"];//제작업체명
		var val_mof = waPipeCloseStartSet.features[i].attributes["VAL_MOF"];//형식
		var val_mop = waPipeCloseStartSet.features[i].attributes["VAL_MOP"];//재질
		var val_dip = waPipeCloseStartSet.features[i].attributes["VAL_DIP"];//구경
		var sae_cde = waPipeCloseStartSet.features[i].attributes["SAE_CDE"];//회전방향

		var tro_cnt = waPipeCloseStartSet.features[i].attributes["TRO_CNT"];//총회전수 CRO_CNT:현재회전수
		var mth_cde = waPipeCloseStartSet.features[i].attributes["MTH_CDE"];//구동방법
		var cst_cde = waPipeCloseStartSet.features[i].attributes["CST_CDE"];//이상여부
		var off_cde = waPipeCloseStartSet.features[i].attributes["OFF_CDE"];//개폐여부
		var cnt_num = waPipeCloseStartSet.features[i].attributes["CNT_NUM"];//공사번호
		//var ANG_DIR = waPipeCloseStartSet.features[i].attributes["ANG_DIR"];//공사명
		var ang_dir = waPipeCloseStartSet.features[i].attributes["ANG_DIR"];//각도  //ANG_DIR1:심볼각도
		var val_dep = waPipeCloseStartSet.features[i].attributes["VAL_DEP"];//심도
		var sht_num = waPipeCloseStartSet.features[i].attributes["SHT_NUM"];//도엽번호
		var shp_ymd = waPipeCloseStartSet.features[i].attributes["SHP_YMD"];//도형최종수정일자

		var shp_nam = waPipeCloseStartSet.features[i].attributes["SHP_NAM"];//도형최종수정자명
		var atr_ymd = waPipeCloseStartSet.features[i].attributes["ATR_YMD"];//속성최종수정일자
		var atr_nam = waPipeCloseStartSet.features[i].attributes["ATR_NAM"];//속성최종수정자명
		 */

		htmlTmp += "<tr>";
		htmlTmp += "<td><input type='checkbox' id='chk_wpcl1' name='chk_wpcl1' value='" + i + "'/></td>";
		htmlTmp += "<td>제수변</td>";
		htmlTmp += "<td>" + ftr_idn + "</td>";
		htmlTmp += "<td>" + hjd_cde + "</td>";
		htmlTmp += "<td>" + dpt_cde + "</td>";
		htmlTmp += "<td>" + ist_ymd + "</td>";
		htmlTmp += "<td>" + prd_nam + "</td>";
		htmlTmp += "<td>" + val_mof + "</td>";
		htmlTmp += "<td>" + val_mop + "</td>";
		htmlTmp += "<td>" + val_dip + "</td>";
		htmlTmp += "<td>" + sae_cde + "</td>";

		htmlTmp += "<td>" + tro_cnt + "</td>";
		htmlTmp += "<td>" + mth_cde + "</td>";
		htmlTmp += "<td>" + cst_cde + "</td>";
		htmlTmp += "<td>" + off_cde + "</td>";
		htmlTmp += "<td>" + cnt_num + "</td>";
		htmlTmp += "<td></td>";
		htmlTmp += "<td>" + ang_dir + "</td>";
		htmlTmp += "<td>" + val_dep + "</td>";
		htmlTmp += "<td>" + sht_num + "</td>";
		htmlTmp += "<td>" + shp_ymd + "</td>";

		htmlTmp += "<td>" + shp_nam + "</td>";
		htmlTmp += "<td>" + atr_ymd + "</td>";
		htmlTmp += "<td>" + atr_nam + "</td>";

		htmlTmp += "</tr>";

	}

	var htmlTmp2 = "";

	for (var i = 0; i < waPipeCloseEndTaskSet.length; i++) {

		//시설명
		//일련번호

		var ftr_idn = waPipeCloseEndTaskSet[i][0].feature.attributes["관리번호"]; //일련번호

		var hjd_cde = waPipeCloseEndTaskSet[i][0].feature.attributes["행정읍/면/동"]; //행정동명
		var dpt_cde = waPipeCloseEndTaskSet[i][0].feature.attributes["관리부서"]; //관리부서
		var ist_ymd = waPipeCloseEndTaskSet[i][0].feature.attributes["설치일자"]; //설치일자
		var prd_nam = waPipeCloseEndTaskSet[i][0].feature.attributes["제작회사명"]; //제작업체명
		var val_mof = waPipeCloseEndTaskSet[i][0].feature.attributes["변류형식"]; //형식
		var val_mop = waPipeCloseEndTaskSet[i][0].feature.attributes["재질"]; //재질
		var val_dip = waPipeCloseEndTaskSet[i][0].feature.attributes["구경"]; //구경
		var sae_cde = waPipeCloseEndTaskSet[i][0].feature.attributes["회전방향"]; //회전방향

		var tro_cnt = waPipeCloseEndTaskSet[i][0].feature.attributes["총회전수"]; //총회전수 CRO_CNT:현재회전수
		var mth_cde = waPipeCloseEndTaskSet[i][0].feature.attributes["구동방법"]; //구동방법
		var cst_cde = waPipeCloseEndTaskSet[i][0].feature.attributes["이상상태"]; //이상여부
		var off_cde = waPipeCloseEndTaskSet[i][0].feature.attributes["개폐여부"]; //개폐여부
		var cnt_num = waPipeCloseEndTaskSet[i][0].feature.attributes["공사번호"]; //공사번호
		//var ANG_DIR =  waPipeCloseEndTaskSet[i][0].feature.attributes["ANG_DIR"];//공사명
		var ang_dir = waPipeCloseEndTaskSet[i][0].feature.attributes["방향각"]; //각도  //ANG_DIR1:심볼각도
		var val_dep = waPipeCloseEndTaskSet[i][0].feature.attributes["심도"]; //심도
		var sht_num = waPipeCloseEndTaskSet[i][0].feature.attributes["도엽번호"]; //도엽번호
		var shp_ymd = waPipeCloseEndTaskSet[i][0].feature.attributes["도형최종수정일자"]; //도형최종수정일자

		var shp_nam = waPipeCloseEndTaskSet[i][0].feature.attributes["도형최종수정자명"]; //도형최종수정자명
		var atr_ymd = waPipeCloseEndTaskSet[i][0].feature.attributes["속성최종수정일자"]; //속성최종수정일자
		var atr_nam = waPipeCloseEndTaskSet[i][0].feature.attributes["속성최종수정자명"]; //속성최종수정자명

		/*
		var ftr_idn = waPipeCloseEndSet.features[i].attributes["FTR_IDN"];//일련번호
		var hjd_cde = waPipeCloseEndSet.features[i].attributes["HJD_CDE"];//행정동명
		var dpt_cde = waPipeCloseEndSet.features[i].attributes["DPT_CDE"];//관리부서
		var ist_ymd = waPipeCloseEndSet.features[i].attributes["IST_YMD"];//설치일자
		var prd_nam = waPipeCloseEndSet.features[i].attributes["PRD_NAM"];//제작업체명
		var val_mof = waPipeCloseEndSet.features[i].attributes["VAL_MOF"];//형식
		var val_mop = waPipeCloseEndSet.features[i].attributes["VAL_MOP"];//재질
		var val_dip = waPipeCloseEndSet.features[i].attributes["VAL_DIP"];//구경
		var sae_cde = waPipeCloseEndSet.features[i].attributes["SAE_CDE"];//회전방향

		var tro_cnt = waPipeCloseEndSet.features[i].attributes["TRO_CNT"];//총회전수 CRO_CNT:현재회전수
		var mth_cde = waPipeCloseEndSet.features[i].attributes["MTH_CDE"];//구동방법
		var cst_cde = waPipeCloseEndSet.features[i].attributes["CST_CDE"];//이상여부
		var off_cde = waPipeCloseEndSet.features[i].attributes["OFF_CDE"];//개폐여부
		var cnt_num = waPipeCloseEndSet.features[i].attributes["CNT_NUM"];//공사번호
		//var ANG_DIR = waPipeCloseEndSet.features[i].attributes["ANG_DIR"];//공사명
		var ang_dir = waPipeCloseEndSet.features[i].attributes["ANG_DIR"];//각도  //ANG_DIR1:심볼각도
		var val_dep = waPipeCloseEndSet.features[i].attributes["VAL_DEP"];//심도
		var sht_num = waPipeCloseEndSet.features[i].attributes["SHT_NUM"];//도엽번호
		var shp_ymd = waPipeCloseEndSet.features[i].attributes["SHP_YMD"];//도형최종수정일자

		var shp_nam = waPipeCloseEndSet.features[i].attributes["SHP_NAM"];//도형최종수정자명
		var atr_ymd = waPipeCloseEndSet.features[i].attributes["ATR_YMD"];//속성최종수정일자
		var atr_nam = waPipeCloseEndSet.features[i].attributes["ATR_NAM"];//속성최종수정자명
		 */

		htmlTmp2 += "<tr>";
		htmlTmp2 += "<td><input type='checkbox' id='chk_wpcl2' name='chk_wpcl2' value='" + i + "'/></td>";
		htmlTmp2 += "<td>제수변</td>";
		htmlTmp2 += "<td>" + ftr_idn + "</td>";
		htmlTmp2 += "<td>" + hjd_cde + "</td>";
		htmlTmp2 += "<td>" + dpt_cde + "</td>";
		htmlTmp2 += "<td>" + ist_ymd + "</td>";
		htmlTmp2 += "<td>" + prd_nam + "</td>";
		htmlTmp2 += "<td>" + val_mof + "</td>";
		htmlTmp2 += "<td>" + val_mop + "</td>";
		htmlTmp2 += "<td>" + val_dip + "</td>";
		htmlTmp2 += "<td>" + sae_cde + "</td>";

		htmlTmp2 += "<td>" + tro_cnt + "</td>";
		htmlTmp2 += "<td>" + mth_cde + "</td>";
		htmlTmp2 += "<td>" + cst_cde + "</td>";
		htmlTmp2 += "<td>" + off_cde + "</td>";
		htmlTmp2 += "<td>" + cnt_num + "</td>";
		htmlTmp2 += "<td></td>";
		htmlTmp2 += "<td>" + ang_dir + "</td>";
		htmlTmp2 += "<td>" + val_dep + "</td>";
		htmlTmp2 += "<td>" + sht_num + "</td>";
		htmlTmp2 += "<td>" + shp_ymd + "</td>";

		htmlTmp2 += "<td>" + shp_nam + "</td>";
		htmlTmp2 += "<td>" + atr_ymd + "</td>";
		htmlTmp2 += "<td>" + atr_nam + "</td>";

		htmlTmp2 += "</tr>";

	}

	$("#wworksPipeList").html("<table class='list'>" + htmlColTmp + htmlHeadTmp + htmlTmp + htmlTmp2 + "</table>");

}

//상수관로
function waterworksPipeList() {

	waPipeKind = 'waterworksPipe';
	var waterworksPipeSet2 = waterworksPipeSet;

	// $("#wworksPipeList").empty();

	var htmlColTmp = "<colgroup>";
	htmlColTmp += "<col width='30px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='140px'>";

	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "<col width='100px'>";
	htmlColTmp += "</colgroup>";

	//alert(htmlColTmp);

	//$("#wworksPipeListCol").html(htmlColTmp);


	var htmlHeadTmp = "<thead>";
	htmlHeadTmp += "<tr>";
	htmlHeadTmp += "<th></th>";
	htmlHeadTmp += "<th>시설명</th>";
	htmlHeadTmp += "<th>일련번호</th>";
	htmlHeadTmp += "<th>도엽번호</th>";
	htmlHeadTmp += "<th>급수블럭</th>";
	htmlHeadTmp += "<th>행정동명</th>";
	htmlHeadTmp += "<th>관리부서</th>";
	htmlHeadTmp += "<th>시점위치</th>";
	htmlHeadTmp += "<th>종점위치</th>";
	htmlHeadTmp += "<th>관용도</th>";
	htmlHeadTmp += "<th>불탐여부</th>";

	htmlHeadTmp += "<th>재질</th>";
	htmlHeadTmp += "<th>관경</th>";
	htmlHeadTmp += "<th>관로연장</th>";
	htmlHeadTmp += "<th>평균깊이</th>";
	htmlHeadTmp += "<th>접합종류</th>";
	htmlHeadTmp += "<th>설치년도</th>";
	htmlHeadTmp += "<th>설치월일</th>";
	htmlHeadTmp += "<th>공사번호</th>";
	htmlHeadTmp += "<th>공사명</th>";
	htmlHeadTmp += "<th>시스템연장</th>";

	htmlHeadTmp += "<th>갱생년도</th>";
	htmlHeadTmp += "<th>갱생유형</th>";
	htmlHeadTmp += "<th>도형최종수정일자</th>";
	htmlHeadTmp += "<th>도형최종수정자명</th>";
	htmlHeadTmp += "<th>속성최종수정일자</th>";
	htmlHeadTmp += "<th>속성최종수정자명</th>";
	htmlHeadTmp += "</tr>";
	htmlHeadTmp += "</thead>";

	var htmlTmp = "<tbody>";

	// for(var i=0; i<waterworksPipeSet.features.length; i++){

	//시설명
	//일련번호

	/*findtask*/
	var objectid = waterworksPipeSet[0].feature.attributes["OBJECTID"]; //OBJECTID

	var sht_num = waterworksPipeSet[0].feature.attributes["도엽번호"]; //도엽번호
	var blk_num = waterworksPipeSet[0].feature.attributes["블럭구역번호"]; //블럭구역번호
	var hjd_cde = waterworksPipeSet[0].feature.attributes["행정읍/면/동"]; //행정읍/면/동
	var dpt_cde = waterworksPipeSet[0].feature.attributes["관리부서"]; //관리부서
	var str_loc = waterworksPipeSet[0].feature.attributes["시점위치"]; //시점위치
	var end_loc = waterworksPipeSet[0].feature.attributes["종점위치"]; //종점위치
	var saa_cde = waterworksPipeSet[0].feature.attributes["상수관용도"]; //상수관용도
	var nos_cde = waterworksPipeSet[0].feature.attributes["불탐여부"]; //불탐여부

	var mop_cde = waterworksPipeSet[0].feature.attributes["관재질"]; //관재질
	var pip_dip = waterworksPipeSet[0].feature.attributes["구경"]; //구경
	var pip_len = waterworksPipeSet[0].feature.attributes["연장"]; //연장
	var avg_dep = waterworksPipeSet[0].feature.attributes["평균깊이"]; //평균깊이
	var jht_cde = waterworksPipeSet[0].feature.attributes["접합종류"]; //접합종류
	var ist_ymd = waterworksPipeSet[0].feature.attributes["설치일자"]; //설치일자
	//설치월일 x
	var cnt_num = waterworksPipeSet[0].feature.attributes["공사번호"]; //공사번호
	//공사명
	var sys_len = waterworksPipeSet[0].feature.attributes["시스템연장"]; //시스템연장

	var upd_ymd = waterworksPipeSet[0].feature.attributes["갱생년도"]; //갱생년도
	var upd_cde = waterworksPipeSet[0].feature.attributes["갱생유형"]; //갱생유형
	var shp_ymd = waterworksPipeSet[0].feature.attributes["도형최종수정일자"]; //도형최종수정일자
	var shp_nam = waterworksPipeSet[0].feature.attributes["도형최종수정자명"]; //도형최종수정자명
	var atr_ymd = waterworksPipeSet[0].feature.attributes["속성최종수정일자"]; //속성최종수정일자
	var atr_nam = waterworksPipeSet[0].feature.attributes["속성최종수정자명"]; //속성최종수정자명


	/*
	var sht_num = waterworksPipeSet.features[i].attributes["SHT_NUM"];//도엽번호
	var blk_num = waterworksPipeSet.features[i].attributes["BLK_NUM"];//블럭구역번호
	var hjd_cde = waterworksPipeSet.features[i].attributes["HJD_CDE"];//행정읍/면/동
	var dpt_cde = waterworksPipeSet.features[i].attributes["DPT_CDE"];//관리부서
	var str_loc = waterworksPipeSet.features[i].attributes["STR_LOC"];//시점위치
	var end_loc = waterworksPipeSet.features[i].attributes["END_LOC"];//종점위치
	var saa_cde = waterworksPipeSet.features[i].attributes["SAA_CDE"];//상수관용도
	var nos_cde = waterworksPipeSet.features[i].attributes["NOS_CDE"];//불탐여부

	var mop_cde = waterworksPipeSet.features[i].attributes["MOP_CDE"];//관재질
	var pip_dip = waterworksPipeSet.features[i].attributes["PIP_DIP"];//구경
	var pip_len = waterworksPipeSet.features[i].attributes["PIP_LEN"];//연장
	var avg_dep = waterworksPipeSet.features[i].attributes["AVG_DEP"];//평균깊이
	var jht_cde = waterworksPipeSet.features[i].attributes["JHT_CDE"];//접합종류
	var ist_ymd = waterworksPipeSet.features[i].attributes["IST_YMD"];//설치일자
	//설치월일 x
	var cnt_num = waterworksPipeSet.features[i].attributes["CNT_NUM"];//공사번호
	//공사명
	var sys_len = waterworksPipeSet.features[i].attributes["SYS_LEN"];//시스템연장

	var upd_ymd = waterworksPipeSet.features[i].attributes["UPD_YMD"];//갱생년도
	var upd_cde = waterworksPipeSet.features[i].attributes["UPD_CDE"];//갱생유형
	var shp_ymd = waterworksPipeSet.features[i].attributes["SHP_YMD"];//도형최종수정일자
	var shp_nam = waterworksPipeSet.features[i].attributes["SHP_NAM"];//도형최종수정자명
	var atr_ymd = waterworksPipeSet.features[i].attributes["ATR_YMD"];//속성최종수정일자
	var atr_nam = waterworksPipeSet.features[i].attributes["ATR_NAM"];//속성최종수정자명*/

	/*
	var atr_nam = waterworksPipeSet.features[i].attributes["ATR_NAM"];//속성최종수정자명
	var objectid = waterworksPipeSet.features[i].attributes["OBJECTID"];//objectid
	var ftr_cde = waterworksPipeSet.features[i].attributes["FTR_CDE"];//지형지물부호
	var ftr_idn = waterworksPipeSet.features[i].attributes["FTR_IDN"];//관리번호
	var hjd_cde = waterworksPipeSet.features[i].attributes["HJD_CDE"];//행정읍/면/동
	var sht_num = waterworksPipeSet.features[i].attributes["SHT_NUM"];//도엽번호
	var mng_cde = waterworksPipeSet.features[i].attributes["MNG_CDE"];//관리기관
	var dpt_cde = waterworksPipeSet.features[i].attributes["DPT_CDE"];//관리부서
	var ist_ymd = waterworksPipeSet.features[i].attributes["IST_YMD"];//설치일자
	var saa_cde = waterworksPipeSet.features[i].attributes["SAA_CDE"];//상수관용도
	var mop_cde = waterworksPipeSet.features[i].attributes["MOP_CDE"];//관재질
	var pip_dip = waterworksPipeSet.features[i].attributes["PIP_DIP"];//구경
	var pip_len = waterworksPipeSet.features[i].attributes["PIP_LEN"];//연장
	var jht_cde = waterworksPipeSet.features[i].attributes["JHT_CDE"];//접합종류
	var low_dep = waterworksPipeSet.features[i].attributes["LOW_DEP"];//최저깊이
	var hgh_dep = waterworksPipeSet.features[i].attributes["HGH_DEP"];//최고깊이
	var avg_dep = waterworksPipeSet.features[i].attributes["AVG_DEP"];//평균깊이
	var cnt_num = waterworksPipeSet.features[i].attributes["CNT_NUM"];//공사번호
	var str_loc = waterworksPipeSet.features[i].attributes["STR_LOC"];//시점위치
	var end_loc = waterworksPipeSet.features[i].attributes["END_LOC"];//종점위치
	var nos_cde = waterworksPipeSet.features[i].attributes["NOS_CDE"];//불탐여부
	var sys_chk = waterworksPipeSet.features[i].attributes["SYS_CHK"];//대장초기화여부
	var pip_lbl = waterworksPipeSet.features[i].attributes["PIP_LBL"];//관라벨

	var sys_len = waterworksPipeSet.features[i].attributes["SYS_LEN"];//시스템연장
	var upd_ymd = waterworksPipeSet.features[i].attributes["UPD_YMD"];//갱생년도
	var upd_cde = waterworksPipeSet.features[i].attributes["UPD_CDE"];//갱생유형
	var shp_ymd = waterworksPipeSet.features[i].attributes["SHP_YMD"];//도형최종수정일자
	var shp_nam = waterworksPipeSet.features[i].attributes["SHP_NAM"];//도형최종수정자명
	var atr_ymd = waterworksPipeSet.features[i].attributes["ATR_YMD"];//속성최종수정일자
	var atr_nam = waterworksPipeSet.features[i].attributes["ATR_NAM"];//속성최종수정자명
	var pip_lbl2 = waterworksPipeSet.features[i].attributes["PIP_LBL2"];//PIP_LBL2
	var idn     = waterworksPipeSet.features[i].attributes["IDN"];//
	var ftc     = waterworksPipeSet.features[i].attributes["FTC"];//
	var orgzid  = waterworksPipeSet.features[i].attributes["ORGZID"];//
	var saa     = waterworksPipeSet.features[i].attributes["SAA"];//
	var nam     = waterworksPipeSet.features[i].attributes["NAM"];//
	var ymd     = waterworksPipeSet.features[i].attributes["YMD"];//
	var mop     = waterworksPipeSet.features[i].attributes["MOP"];//
	var dip     = waterworksPipeSet.features[i].attributes["DIP"];//
	var lenx    = waterworksPipeSet.features[i].attributes["LENX"];//
	var dep     = waterworksPipeSet.features[i].attributes["DEP"];//
	var soo     = waterworksPipeSet.features[i].attributes["SOO"];//
	var lab     = waterworksPipeSet.features[i].attributes["LAB"];//
	var blk_num = waterworksPipeSet.features[i].attributes["BLK_NUM"];//블럭구역번호
	var subtype = waterworksPipeSet.features[i].attributes["SUBTYPE"];// */

	htmlTmp += "<tr>";
	htmlTmp += "<td><input type='checkbox' checked='checked' id='chk_wwps' name='chk_wwps' value='0'/>";
	htmlTmp += "<td>시설명</td>";
	htmlTmp += "<td>일련번호</td>";
	htmlTmp += "<td>" + sht_num + "</td>";
	htmlTmp += "<td>" + blk_num + "</td>";
	htmlTmp += "<td>" + hjd_cde + "</td>";
	htmlTmp += "<td>" + dpt_cde + "</td>";
	htmlTmp += "<td>" + str_loc + "</td>";
	htmlTmp += "<td>" + end_loc + "</td>";
	htmlTmp += "<td>" + saa_cde + "</td>";
	htmlTmp += "<td>" + nos_cde + "</td>";

	htmlTmp += "<td>" + mop_cde + "</td>";
	htmlTmp += "<td>" + pip_dip + "</td>";
	htmlTmp += "<td>" + pip_len + "</td>";
	htmlTmp += "<td>" + avg_dep + "</td>";
	htmlTmp += "<td>" + jht_cde + "</td>";
	htmlTmp += "<td>" + ist_ymd + "</td>";
	htmlTmp += "<td>설치월일</td>";
	htmlTmp += "<td>" + cnt_num + "</td>";
	htmlTmp += "<td>공사명</td>";
	htmlTmp += "<td>" + sys_len + "</td>";

	htmlTmp += "<td>" + upd_ymd + "</td>";
	htmlTmp += "<td>" + upd_cde + "</td>";
	htmlTmp += "<td>" + shp_ymd + "</td>";
	htmlTmp += "<td>" + shp_nam + "</td>";
	htmlTmp += "<td>" + atr_ymd + "</td>";
	htmlTmp += "<td>" + atr_nam + "</td>";
	htmlTmp += "</tr>";

	// }
	htmlTmp += "</tbody>";

	$("#wworksPipeList").html("<table class='list'>" + htmlColTmp + htmlHeadTmp + htmlTmp + "</table>");

}

//차단제수변 위치이동
function waPipeLocationSearch() {

	var objectIdArr = [];
	if (waPipeKind == 'waterworksPipe') {
		//objectIdArr = [];
		var geometryTmp;
		$("[name=chk_wwps]").each(function () {
			if ($(this).is(":checked")) {

				var objectid = waterworksPipeSet[0].value;
				objectIdArr.push(objectid);

				geometryTmp = waterworksPipeSet[0].feature.geometry;

			}
		});
		getComplexLocation('상수관로', objectIdArr);
		fnShowHighlight(geometryTmp);
		waPipeKind = 'no';

	} else if (waPipeKind == 'waPipeCloseList') {
		//objectIdArr = [];

		$("[name=chk_wpcl1]").each(function () {
			if ($(this).is(":checked")) {

				var i = this.value;
				var objectid = waPipeCloseStartTaskSet[i][0].value;
				objectIdArr.push(objectid);
				var geometryTmp = waPipeCloseStartTaskSet[i][0].feature.geometry;
				fnShowHighlight(geometryTmp);
			}
		});

		$("[name=chk_wpcl2]").each(function () {
			if ($(this).is(":checked")) {

				var i = this.value;
				var objectid = waPipeCloseEndTaskSet[i][0].value;
				objectIdArr.push(objectid);
				var geometryTmp = waPipeCloseEndTaskSet[i][0].feature.geometry;
				fnShowHighlight(geometryTmp);
			}
		});

		getComplexLocation('변류시설', objectIdArr);
		waPipeKind = 'no';

	} else if (waPipeKind == 'waterPipeList') {

		$("[name=chk_wps]").each(function () {
			if ($(this).is(":checked")) {

				var i = this.value;
				var objectid = waterPipeSet.features[i].attributes["OBJECTID"]; //속성최종수정자명

				objectIdArr.push(objectid);
				var geometryTmp = waterPipeSet.features[i].geometry;
				fnShowHighlight(geometryTmp);
			}
		});

		getComplexLocation('급수관로', objectIdArr);
		waPipeKind = 'no';

	} else if (waPipeKind == 'waterPipeMeterList') {

		$("[name=chk_wpm]").each(function () {
			if ($(this).is(":checked")) {

				var i = this.value;
				var objectid = waterPipeMeterSet[i][0].feature.attributes["OBJECTID"]; //OBJECTID //급수전계량기

				objectIdArr.push(objectid);
				var geometryTmp = waterPipeMeterSet[i][0].feature.geometry;
				fnShowHighlight(geometryTmp);
			}
		});

		getComplexLocation('급수전계량기', objectIdArr);
		waPipeKind = 'no';

	}
}


//차단제수변 대장 조회
function fnViewDJMap(tableName, objectId, win_id) {

	if (objectId != null) {
		if (tableName == '상수관로') {
			cfWindowOpen(tableName, '/water/wtlPipeLmRU.do?OBJECTID=' + objectId, 632, 672, false, win_id, 'center');
		} else if (tableName == '제수밸브') {
			cfWindowOpen(tableName, '/water/wtlValvPsRU.do?OBJECTID=' + objectId, 635, 770, false, win_id, 'center');
		} else if (tableName == '급수관로') {
			cfWindowOpen(tableName, '/water/wtlSplyLsRU.do?OBJECTID=' + objectId, 635, 750, false, win_id, 'center');
		} else { //급수전계량기
			cfWindowOpen(tableName, '/water/wtlMetaPsRU.do?OBJECTID=' + objectId, 900, 790, false, win_id, 'center');
		}
	} else {
		alert('에러가 발생했습니다.관리자에게 문의 하세요!');
	}
}