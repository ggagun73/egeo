var m_MesurementPolygonGeom;
function fnMeasureEventHandler(geometry) {
	switch (geometry.type) {
	case "polyline":
		/*if (this._geometryType == "line") { //각도측정
		var startPoint = geometry.getPoint(0, 0);
		var endPoint = geometry.getPoint(0, 1);
		var rise = endPoint.y - startPoint.y;
		var run = endPoint.x - startPoint.x;
		var angle = Math.round(((180 / Math.PI) * Math.atan2(run, rise)) * 100) / 100;
		if (angle < 0) {
		angle = 360 + angle;
		}
		angle = angle.toFixed(2);

		var length = esri.geometry.getLength(startPoint, endPoint);
		var strLength = setNumComma((Math.round(esri.geometry.geodesicLengths([geometry], esri.Units.METERS) * 100) / 100).toFixed(2));

		drawLine("DRW", geometry, "DASH", "red", 1);
		drawCircle("DRW", startPoint, length);
		drawLabelGraphic("DRW", startPoint, "거리:" + strLength + "m, 각도:" + angle + "˚", "12px", "BOLDER", "red", "MIDDLE", 0, 0, 0, null);
		} */

		m_MeasureGraphicLayer.add(new esri.Graphic(geometry, fnGetPolylineSymbol("solid", [255, 0, 0, 0.5], 2)));
		
		//IE는 어찌된지 마지막 PATH가 하나 더 찍힘
		var pathLength = 0;
		var agent = navigator.userAgent.toLowerCase();
		if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			pathLength = geometry.paths[0].length - 1;
		}
		else {
			pathLength = geometry.paths[0].length;
		}
		
		for (var i = 0; i < pathLength; i++) {
			m_MeasureGraphicLayer.add(new esri.Graphic(geometry.getPoint(0, i), fnGetMarkerSymbol("square", "white", 8, "solid", "red", 1)));
		}
			
		var totalLength = 0;
		for (var i = 0; i < pathLength - 1; i++) {
			var startPoint = geometry.getPoint(0, i);
			var endPoint = geometry.getPoint(0, i + 1);
			var nLength = esri.geometry.getLength(startPoint, endPoint);
			totalLength += nLength;

			var partUnit = "m";
			if (nLength > 1000) {
				nLength = nLength / 1000;
				partUnit = "Km";
			}

			var totalUnit = "m";
			if (totalLength > 1000) {
				totalLength = totalLength / 1000;
				totalUnit = "Km";
			}

			if (i < pathLength - 2) {
				var strLength = "부분거리 : " + setNumComma((Math.round(nLength * 100) / 100).toFixed(2)) + partUnit;
				m_MeasureGraphicLayer.add(new esri.Graphic(endPoint, fnGetTextSymbol(15, "bolder", "red", "start", 0, 10, 0, "Malgun Gothic", strLength, "", "top")));
			} else {
				var strTotalLength = "전체거리 : " + setNumComma((Math.round(totalLength * 100) / 100).toFixed(2)) + totalUnit;
				m_MeasureGraphicLayer.add(new esri.Graphic(endPoint, fnGetTextSymbol(20, "bolder", "red", "start", 0, 10, 0, "Malgun Gothic", strTotalLength, "", "top")));
			}
		}

		$("#" + m_MeasureGraphicLayer.id + "_layer").find("text").css("text-shadow", "white 1px 1px 1px");
		//$("#" + m_MeasureGraphicLayer.id + "_layer").find("text").attr("text-anchor", "start");
		break;
	case "polygon":
		m_MesurementPolygonGeom = new esri.geometry.Polygon(geometry);
		m_MeasureGraphicLayer.add(new esri.Graphic(geometry, fnGetPolygonSymbol("solid", [0, 0, 255, 0.5], "solid", "blue", 2)));
		for (var i = 0; i < geometry.rings[0].length - 1; i++) {
			m_MeasureGraphicLayer.add(new esri.Graphic(geometry.getPoint(0, i), fnGetMarkerSymbol("square", "white", 8, "solid", "blue", 1)));
		}

		var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();
		areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
		areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
		areasAndLengthParams.polygons = [geometry];
		geometryService.areasAndLengths(areasAndLengthParams);
		//부분거리 표현
		/*for (var i = 0; i < geometry.rings[0].length - 2; i++) {
			var startPoint = geometry.getPoint(0, i);
			var endPoint = geometry.getPoint(0, i + 1);
			var nLength = esri.geometry.getLength(startPoint, endPoint);

			var partUnit = "m";
			if (nLength > 1000) {
				nLength = nLength / 1000;
				partUnit = "Km";
			}

			if (i < geometry.rings[0].length - 1) {
				var strLength = "부분거리 : " + setNumComma((Math.round(nLength * 100) / 100).toFixed(2)) + partUnit;
				m_MeasureGraphicLayer.add(new esri.Graphic(endPoint, fnGetTextSymbol(15, "bolder", "red", "middle", 10, -10, 0, "Malgun Gothic", strLength)));
			}
		}*/
		break;
	}
}

function fnAreasAndLengthsComplete(res) {
	var around = res.result.lengths;
	var area = res.result.areas;

	var aroundUnit = "㎡";
	var areaUnit = "㎡";

	if (around > 1000) {
		around = around / 1000;
		aroundUnit = "㎢";
	}
	if (area > 1000) {
		area = area / 1000;
		areaUnit = "㎢";
	}
	var strAround = "둘레 : " + setNumComma((Math.round(around * 100) / 100).toFixed(2)) + aroundUnit;
	var strArea = "면적 : " + setNumComma((Math.round(area * 100) / 100).toFixed(2)) + areaUnit;
	var txt = strAround + " \n " + strArea;

	geometryService.labelPoints([m_MesurementPolygonGeom], function (labelPoints) {
		m_MeasureGraphicLayer.add(new esri.Graphic(labelPoints[0], fnGetTextSymbol(15, "bolder", "red", "middle", 0, 0, 0, "Malgun Gothic", txt)));
		$("#" + m_MeasureGraphicLayer.id + "_layer").find("text").css("text-shadow", "white 1px 1px 1px");
	});
	geometryService.on("label-points-complete", function(res) {
		//$("#" + m_MeasureGraphicLayer.id + "_layer").find("text").css("text-shadow", "white 1px 1px 1px");
	});
}
