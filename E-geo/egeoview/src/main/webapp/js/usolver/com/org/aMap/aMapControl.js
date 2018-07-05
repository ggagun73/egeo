function mapCtrlHandler() {
	$("img[id^=mapCtrl]").each(function () {
		$(this).attr("toggle", "off");
	});
	$("img[id^=mapCtrl]").each(function () {
		$(this).mouseover(function () {
			$(this).attr("src", $(this).attr("overSrc"));
		});
		$(this).mouseout(function () {
			if ($(this).attr("toggle") == "off")
				$(this).attr("src", $(this).attr("normalSrc"));
		});
		$(this).click(function () {
			if ($(this).attr("selectCtrl") == "on") {
				$("img[id^=mapCtrl]").each(function () {
					if ($(this).attr("toggle") == "on") {
						$(this).attr("src", $(this).attr("normalSrc"));
						$(this).attr("toggle", "off");
					}
				});

				$(this).attr("src", $(this).attr("overSrc"));
				$(this).attr("toggle", "on");
			}
			mapCtrlHandlerButton($(this).attr("id"));
		});
	});
}
// 지도제어 버튼이 클릭했을 때
function mapCtrlHandlerButton(mapCtrlId) {
	if ($("#" + mapCtrlId).attr("selectCtrl") == "on") {
		if (m_MeasureToolbar != undefined) m_MeasureToolbar.deactivate();
		if (_navToolbar != undefined) _navToolbar.deactivate();
		if (identifyListToolbar != undefined) identifyListToolbar.deactivate();
		if (crossSectionToolbar != undefined) crossSectionToolbar.deactivate();
		if (topographToolbar != undefined) topographToolbar.deactivate();
		if (webUisEditDrawTool != undefined) webUisEditDrawTool.deactivate();
		if (m_AreaSearchToolbar != undefined) m_AreaSearchToolbar.deactivate();
		if (m_UserGraphicToolbar != undefined) m_UserGraphicToolbar.deactivate();
		if (m_DrawEditToolbar != undefined) m_DrawEditToolbar.deactivate();
	}

	$("#dvBookmarks").hide();
	$("#dvAnalysisIcon").hide();
	$("#dvAreaSearch").hide();
	if (Number(mapCtrlId.replace("mapCtrl", "")) < 100) $("#dvUserGraphicsIcon").hide();
	$("#dvUserGraphicsProp").hide();
	$("#dvUserGraphicsTextProp").hide();
	
	switch (mapCtrlId) {
	case "mapCtrl1": // Pan : 이동
		m_MainMap.setMapCursor("url(/images/cur/PAN.cur), auto");
		_btnAction = _btnType.PAN;
		_navToolbar.activate(esri.toolbars.Navigation.PAN);
		buttonStatus('이동');
		break;
	case "mapCtrl2": // Zoom Area : 영역 확대
		m_MainMap.setMapCursor("url(/images/cur/zoomin.cur), auto");
		_btnAction = _btnType.ZOOMRECT;
		_drawAction = _drawType.EXTENT;
		_navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
		buttonStatus('확대');
		break;
	case "mapCtrl3": // Zoom out : 축소
		m_MainMap.setMapCursor("url(/images/cur/zoomout.cur), auto");
		_btnAction = _btnType.ZOOMOUT;
		_drawAction = _drawType.EXTENT;
		_navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
		buttonStatus('축소');
		break;
	case "mapCtrl4": // 전체 보기
		_btnAction = _btnType.FULLEXTENT;
		zoomExtent(_initExtent.xmin, _initExtent.ymin, _initExtent.xmax, _initExtent.ymax);
		buttonStatus('전체보기');
		break;
	case "mapCtrl5": // 거리재기
		m_MainMap.setMapCursor("url(/images/cur/measure.cur), auto");
		m_MeasureToolbar.activate(esri.toolbars.Draw.POLYLINE);
		buttonStatus('거리측정');
		break;
	case "mapCtrl6": // 면적재기
		m_MainMap.setMapCursor("url(/images/cur/area.cur), auto");
		m_MeasureToolbar.activate(esri.toolbars.Draw.POLYGON);
		buttonStatus('면적측정');
		break;
	case "mapCtrl7": // 초기화
		$.each(m_MainMap.graphicsLayerIds, function(i, data) {
			m_MainMap.getLayer(data).clear();
		});
		m_MainMap.graphics.clear();
		m_MainMap.infoWindow.hide();
		buttonStatus('초기화');
		break;
	case "mapCtrl8": // 정보
		m_MainMap.setMapCursor("url(/images/cur/identify.cur), auto");
		identifyListToolbarSet();
		buttonStatus('정보조회');
		break;
	case "mapCtrl9": // 이미지저장
		fnSaveToJPG();
		buttonStatus('저장');
		break;
	case "mapCtrl10": // 이전
		prevExtent();
		buttonStatus('이전');
		break;
	case "mapCtrl11": // 이후
		nextExtent();
		buttonStatus('이후');
		break;
	case "mapCtrl12": // 북마크 on/off
		$("#dvBookmarks").show();
		buttonStatus('북마크');
		break;
	case "mapCtrl14": // 글자입력
		_btnAction = _btnType.INPUTTEXT;
		inputTextDialog();
		buttonStatus('글입력');
		break;
	case "mapCtrl15": // 버퍼검색(원)
		fnSetAreaSearchToolbar("CIRCLE");
		buttonStatus('버퍼검색(원)');
		break;
	case "mapCtrl16": // 버퍼검색(사각형)
		fnSetAreaSearchToolbar("RECTANGLE");
		buttonStatus('버퍼검색(사각형)');
		break;
	case "mapCtrl21": // 버퍼검색(다각형)
		fnSetAreaSearchToolbar("POLYGON");
		buttonStatus('버퍼검색(다각형)');
		break;
	case "mapCtrl17": // 고급인쇄
		$("#txt_Title").val("도시기반시설물도");
		$("#sel_Template").val("A4P");
		$("#chk_scale").prop("checked", "");
		$("#txt_scale").val("");
		$("#txt_scale").prop("disabled", "disabled");

		$("#dvSaveToPDF").center();
		$("#dvSaveToPDF").show();
		buttonStatus('고급인쇄');
		break;
	case "mapCtrl18": // 횡단면도
		m_MainMap.setMapCursor("url(/images/cur/LINE.cur), auto");
		$("#dvAnalysisIcon").show();
		crossSectionSearch();
		buttonStatus('횡단면도');
		break;
	case "mapCtrl19": // 지형단면도
		m_MainMap.setMapCursor("url(/images/cur/RECTANGLE.cur), auto");
		$("#dvAnalysisIcon").show();
		topographicalSearch("topo");
		buttonStatus('지형단면도');
		break;
	case "mapCtrl20": // 차단제수변
		m_MainMap.setMapCursor("crosshair");
		$("#dvAnalysisIcon").show();
		waterControlToolbarSet();
		buttonStatus('차단제수변');
		break;
	case "mapCtrl51": //영역관리
		$("#dvAreaSearch").show();
		$("#sel_AreaSearchLayer option:eq(0)").attr("selected", "selected");
		break;
	case "mapCtrl52": //분석기능
		$("#dvAnalysisIcon").show();
		break;
	case "mapCtrl100": //사용자그래픽
		fnUserGraphicGetUserSymbol();
		break;
	}
}

//일반지도 활성화
function fnShowBaseMap() {
	$("#btn_selmap01").attr("src", "../images/map/btn_selmap01_on.png");
	$("#btn_selmap02").attr("src", "../images/map/btn_selmap02_off.png");
	$("#dvSelectMap").hide();
	basemap.show();
	tifmap.hide();
	basemap.setOpacity(1.0);
}

//항공사진 투명도 조절
function fnShowAeroMap() {
	$("#btn_selmap01").attr("src", "../images/map/btn_selmap01_off.png");
	$("#btn_selmap02").attr("src", "../images/map/btn_selmap02_on.png");
	$("#dvSelectMap").show();
	basemap.show();
	tifmap.show();

	$("#map_Tansparency_slider").slider({
		range : "max",
		min : 1,
		max : 100,
		value : $("#map_Tansparency").val(),
		slide : function (event, ui) {
			$("#map_Tansparency").val(ui.value);
			basemap.setOpacity(parseInt(ui.value) / 100);
		}
	});
}

function buttonStatus(val) {
	$("#status").text("상태 : " + val);
}
