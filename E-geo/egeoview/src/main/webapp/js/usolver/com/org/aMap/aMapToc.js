var m_ArrowDispLayerIds = []; //라인 심볼 화살표 표시
var dnd_uniqueSymbolList; //확장심볼 리스트
var m_DynamicLayerInfosTmp;
var m_LayerDrawingOptionsTmp = []; //확장심볼 표현용

$(document).ready(function () {
	$("#loadingMapDiv").center();
	//POPUP 창 닫기
	$(".close").click(function () {
		$(this).parent().hide();
	});
	$(".btnClose").click(function () {
		$(this).parents("div.popup").hide();
	});

	fnInitTocControls();
	fnInitTocPopupControls();
});
function fnInitTocControls() {
	/************ TOC 컨트롤 ************/
	//TOC 범례 toggle event
	$(document).on("click", ".legend_toggle", function () {
		var thisCla = $(this).attr("class");
		$(this).parent().siblings(".legend_child").slideToggle("fast");
		if (thisCla.indexOf("legend_hide") >= 0) {
			//$(this).text("[-]");
			$(this).html("<img src='/images/map/toc_minus.png' alt='[-]'/>");
			$(this).removeClass("legend_hide");
			$(this).addClass("legend_show");
		} else if (thisCla.indexOf("legend_show") >= 0) {
			//$(this).text("[+]");
			$(this).html("<img src='/images/map/toc_plus.png' alt='[+]'/>");
			$(this).removeClass("legend_show");
			$(this).addClass("legend_hide");
		}
	});

	//TOC레이블 click event
	$(document).on("mousedown", ".legend_label", function (e) {
		$.each($(".tocSelected"), function (i, l) {
			$(l).removeClass("tocSelected");
		});

		$(this).addClass("tocSelected");

		if (e.button != 2)
			return;

		//범례 변경 메뉴 OPEN
		var labels = $(".tocSelected");

		for (var i = 0; i < labels.length; i++) {
			var layerId = labels[i].id.replace("chgSymbol_", "");
			$("#" + labels[i].id).addClass(labels[i].id);

			//Raster Layer일 경우 context menu 생성 제외
			if (m_LayersInfo.layers[layerId].type == "Raster Layer") {
				continue;
			}

			$.contextMenu({
				selector : ".chgSymbol_" + layerId,
				callback : fnSetContexMenu,
				items : {
					"cmdLayerScale" : {
						name : "유효축척 설정..."
					},
					"cmdLabel" : {
						name : "주석 설정..."
					},
					"cmdSymbol" : {
						name : "심볼 설정..."
					},
					"cmdSeparate1" : {
						name : "------------------"
					},
					"cmdSymbolInit" : {
						name : "심볼 초기화..."
					},
					"cmdZoomToExtent" : {
						name : "현재레이어 전체화면..."
					},
					"cmdSeparate2" : {
						name : "------------------"
					},
					"cmdRemove" : {
						name : "레이어 제거"
					}
				}
			});
		}
	});

	//TOC 체크박스 event
	$(document).on("click", ".legend_ck", function () {
		m_VisibleLayers = [];
		$.each($(".legend_ck:checked"), function (i, data) {
			var id = Number($(data).attr("id").replace("toc_", ""));
			m_VisibleLayers.push(id);
		});

		//방향표시 처리
		var pArrowDispLayerIds = [];
		for (var i = 0; i < m_ArrowDispLayerIds.length; i++) {
			for (var j = 0; j < m_VisibleLayers.length; j++) {
				if (m_ArrowDispLayerIds[i] == m_VisibleLayers[j]) {
					pArrowDispLayerIds.push(m_ArrowDispLayerIds[i]);
				}
			}
		}
		m_ArrowDispLayerIds = pArrowDispLayerIds;

		basemap.setVisibleLayers(m_VisibleLayers);
	});

	$('#legend_btn_folder').bind('mouseover', function () {
		$("#legend_btn_folder").attr("src", "../images/map/legend_btn_folder_over.png");
	});
	$('#legend_btn_folder').bind('mouseout', function () {
		$("#legend_btn_folder").attr("src", "../images/map/legend_btn_folder.png");
	});
	$('#btn_layerListSave').bind('mouseover', function () {
		$("#btn_layerListSave").attr("src", "../images/map/btn_layerListSave_over.png");
	});
	$('#btn_layerListSave').bind('mouseout', function () {
		$("#btn_layerListSave").attr("src", "../images/map/btn_layerListSave.png");
	});
}
function fnInitTocPopupControls() {
	$(".ip_color").each(function () {
		$(this).css("border-color", "black");
	});
	//colorPicker
	$(document).on("click", ".ip_color", function () {
		startColorPicker($(this).attr("id"));
		$(this).css("color", $(this).css("background-color"));
	});
	//주석 유효축척
	$("input[type=radio][name='rdo_LabelIsVisible']").change(function () {
		if ($(this).attr("id") == "rdo_LabelVisible") {
			$("#LabelScaleDiv").show();
		} else {
			$("#LabelScaleDiv").hide();
		}
	});

	//심볼 설정
	$("#sel_SimpleMarkerSymbolStyle").msDropDown();
	$("#sel_PictureMarkerSymbolStyle").msDropDown();
	$("#sel_SimpleLineSymbolStyle").msDropDown();
	$("#sel_SimpleFillSymbolStyle").msDropDown();
	$("#txt_SimpleMarkerSymbolSize").spinner();
	$("#txt_PictureMarkerSymbolSizeW").spinner();
	$("#txt_PictureMarkerSymbolSizeH").spinner();
	$("#txt_SimpleLineSymbolSize").spinner();

	$("#sel_Unique_SimpleMarkerSymbolStyle").msDropDown();
	$("#sel_Unique_PictureMarkerSymbolStyle").msDropDown();
	$("#sel_Unique_SimpleLineSymbolStyle").msDropDown();
	$("#sel_Unique_SimpleFillSymbolStyle").msDropDown();
	$("#txt_Unique_SimpleMarkerSymbolSize").spinner();
	$("#txt_Unique_PictureMarkerSymbolSizeW").spinner();
	$("#txt_Unique_PictureMarkerSymbolSizeH").spinner();
	$("#txt_Unique_SimpleLineSymbolSize").spinner();

	/*$("#sel_PictureMarkerSymbolStyle").change(function () {
	if ($("#sel_PictureMarkerSymbolStyle option:selected").val() != "custom") {
	$("#txt_PictureMarkerSymbolColor").parent().show();
	$("#txt_PictureMarkerSymbolColor").css("background", "black");
	$("#txt_PictureMarkerSymbolColor").css("color", "black");
	$("#txt_PictureMarkerSymbolSize").val(1);
	}
	});*/

	require(["dojo/dnd/Source"], function () {
		dnd_uniqueSymbolList = new dojo.dnd.Source("dv_uniqueSymbolList");
	});
}

function fnSetTocList() {
	$("#legend_progress").show();

	if (m_IsSavedMap) {
		m_TocLayers = m_VisibleLayers = fnGetLayerIds(basemap, m_UserConfigLayers.split(","));
	} else {
		m_TocLayers = m_VisibleLayers = fnGetLayerIds(basemap, m_DefaultViewLayer);
	}
	//DynamicInfo
	m_DynamicLayerInfos = basemap.createDynamicLayerInfosFromLayerInfos();
	/*for (var i in m_DynamicLayerInfos) {
	var d = {
	id : m_DynamicLayerInfos[i].id,
	name : m_DynamicLayerInfos[i].name,
	position : m_DynamicLayerInfos[i].id,
	visible : false
	};
	d_layerInfos[m_DynamicLayerInfos[i].id] = d;
	}*/

	//축척O, 축척X 두 개의 서비스를 발행
	//실제 맵은 축척X로 서비스하고, 축척O의 설정된 축척 정보를 읽어옴
	//축척을 제한하여 발행하면, 다이나믹으로 유효축척을 설정해도 보여지지 않음
	$.each(m_DynamicLayerInfos, function (i, data1) {
		if (data1.subLayerIds)
			return true; //incase group layer; continue;

		$.each(m_LayersInfo_scale.layers, function (j, data2) {
			if (data1.name == data2.name) {
				data1.minScale = data2.minScale;
				data1.maxScale = data2.maxScale;
				return false; //break;
			}
		});
	});

	//보여졌던 레이어 처리
	if (m_IsSavedMap) {
		m_VisibleLayers = [];
		var userConfigVisibles = m_UserConfigVisibles.split(",");
		$.each(m_TocLayers, function (i, data) {
			if (userConfigVisibles[i] == "1") { // 0 : invisible, 1 : visible
				m_VisibleLayers.push(data);
			}
		});
	}

	//저장했던 정보 처리
	$.ajax({
		type : "post",
		dataType : "json",
		data : {
			USER_ID : $("#USER_ID").val(),
			SYS_ID : $("#SYS_ID").val()
		},
		url : "/etc/etcMapUserRendererList.do",
		success : function (data) {
			var pList = data.list;
			for (var i = 0; i < pList.length; i++) {
				var pRow = pList[i];
				var pLayerId = getLayerId(basemap, pRow.LAYER_ALIASNAME);
				if (pRow.MINSCALE != "")
					m_DynamicLayerInfos[pLayerId].minScale = pRow.MINSCALE;
				if (pRow.MAXSCALE != "")
					m_DynamicLayerInfos[pLayerId].maxScale = pRow.MAXSCALE;
				if (pRow.RENDERER != "") {
					var pJson = JSON.parse(pRow.RENDERER);
					m_LayerDrawingOptions[pLayerId] = new esri.layers.LayerDrawingOptions(pJson);
					m_LayerDrawingOptions[pLayerId].renderer.type = pJson.renderer.type;
				}
				if ($.inArray(pLayerId, m_VisibleLayers) >= 0 && pRow.ISARROW == "1") {
					m_ArrowDispLayerIds.push(pLayerId);
				}
			}
			basemap.setLayerDrawingOptions(m_LayerDrawingOptions);
		},
		error : function (xhr, status, error) {
			alert("저장했던 심볼 정보를 불러오는데 오류가 발행하였습니다.\n관리자에게 문의하시기 바랍니다.");
		},
		complete : function () {
			fnSetLegend();
			basemap.setDynamicLayerInfos(m_DynamicLayerInfos);
			basemap.setVisibleLayers(m_VisibleLayers);
		}
	});
}

function fnSetLegend() {
	esri.request({
		url : urlBasemap + "/legend",
		content : {
			f : "json",
			dynamicLayers : JSON.stringify(fnBuildDynamicInfoJson(m_TocLayers))
		},
		handleAs : "json"
	}).then(fnSetLegendHtml, function (error) {
		alert("failed fnSetLegend\ncause :" + error);
	});

	//영역검색 목록 바인딩
	var html = "<option  value='none'>선택</option>";
	$.each(fnGetLayerNames(basemap, m_VisibleLayers), function (i, data) {
		html += "<option  value=" + m_VisibleLayers[i] + ">" + data + "</option>";
	});
	$("#sel_AreaSearchLayer").html(html);
}

//build dynamic json
function fnBuildDynamicInfoJson(layerIds) {
	var data = [];

	var dynamicInfo = m_DynamicLayerInfos;
	var drawingOption = m_LayerDrawingOptions;

	//dynamic Info에 drawingInfo 추가
	if (typeof drawingOption != undefined && typeof drawingOption != "undefined") {
		for (var i in drawingOption) {
			if (drawingOption[i] == null) {
				//사용자 설정이 들어갔다가 삭제된 경우
				dynamicInfo[i].drawingInfo = null;
			} else {
				if (drawingOption[i].declaredClass) {
					dynamicInfo[i].drawingInfo = drawingOption[i].toJson();
				} else {
					dynamicInfo[i].drawingInfo = drawingOption[i];
				}
			}
		}
	}

	for (var i = 0; i < layerIds.length; i++) {
		var d = {
			"id" : layerIds[i],
			"source" : dynamicInfo[layerIds[i]].source,
			"minScale" : dynamicInfo[layerIds[i]].minScale,
			"maxScale" : dynamicInfo[layerIds[i]].maxScale,
			"drawingInfo" : dynamicInfo[layerIds[i]].drawingInfo
		};
		data.push(d);
	}
	return data;
}
//build dynamic json
function fnBuildDynamicInfoJsonTmp(layerIds) {
	var data = [];

	var dynamicInfo = m_DynamicLayerInfos;
	var drawingOption = m_LayerDrawingOptionsTmp;

	//dynamic Info에 drawingInfo 추가
	if (typeof drawingOption != undefined && typeof drawingOption != "undefined") {
		for (var i in drawingOption) {
			if (drawingOption[i] == null) {
				//사용자 설정이 들어갔다가 삭제된 경우
				dynamicInfo[i].drawingInfo = null;
			} else {
				if (drawingOption[i].declaredClass) {
					dynamicInfo[i].drawingInfo = drawingOption[i].toJson();
				} else {
					dynamicInfo[i].drawingInfo = drawingOption[i];
				}
			}
		}
	}

	for (var i = 0; i < layerIds.length; i++) {
		var d = {
			"id" : layerIds[i],
			"source" : dynamicInfo[layerIds[i]].source,
			"minScale" : dynamicInfo[layerIds[i]].minScale,
			"maxScale" : dynamicInfo[layerIds[i]].maxScale
		};

		if (dynamicInfo[layerIds[i]]) {
			d.drawingInfo = dynamicInfo[layerIds[i]].drawingInfo;
		}
		data.push(d);
	}
	return data;
}

//legendImg setting - callback
function fnSetLegendHtml(res) {
	var list = res.layers;
	var html = "<ul>";

	for (var i = 0; i < list.length; i++) {
		var checked = "checked='checked'";
		if ($.inArray(list[i].layerId, m_VisibleLayers) < 0)
			checked = "";

		var legends = list[i].legend;
		html += "<li>";
		html += "<span class='legend_parent'>";
		if (legends.length > 1) {
			html += "<a href='#' class='legend_toggle legend_hide'><img src='/images/map/toc_plus.png' alt='[+]'/></a>";
		} else {
			html += "&nbsp;&nbsp;&nbsp;";
		}
		html += "<input type='checkbox' name='legend_ck' class='legend_ck' id='toc_" + list[i].layerId + "' " + checked + "/>";
		if (legends.length > 1) {
			switch (m_LayersInfo.layers[list[i].layerId].geometryType) {
			case "esriGeometryPoint":
				html += "<img style='margin-left:2px;' src='/images/map/icoPoint.gif' border='0' width='17' />";
				break;
			case "esriGeometryPolyline":
				html += "<img style='margin-left:2px;' src='/images/map/icoPolyline.gif' border='0' width='16' />";
				break;
			case "esriGeometryPolygon":
				html += "<img style='margin-left:2px;' src='/images/map/icoPolygon.gif' border='0' width='17' />";
				break;
			}
		} else {
			var legendImg = legends[0].imageData;
			html += "<img src='data:image/jpeg;base64," + legendImg + "' border='0'/>";
		}
		html += "&nbsp;";
		html += "<a href='#' class='legend_label' id='chgSymbol_" + list[i].layerId + "'>";
		html += "<span class='tocLayerName'>" + list[i].layerName + "</span>";
		html += "</a>";
		html += "</span>";
		if (legends.length > 1) {
			html += "<ul class='legend_child' style='display:none;'>";

			for (var j in legends) {
				/*if(legends[j].label == "<all other values>") {
				legends[j].label = "미분류";
				}*/
				var legendImg = legends[j].imageData;
				html += "<li class='legend_childs' style='margin-left:25px;'>";
				//TODO : 서브 타입도 visible ??
				//html += "└<input type='checkbox' name='' class='' id='' />";
				//html += "└";
				html += "<img style='opacity:1;' src='data:image/png;base64," + legendImg + "' border='0'/>";
				html += "<label>" + legends[j].label + "</label>";
				html += "</li>";
			}
			html += "</ul>";
		}
		html += "</li>";
	}
	html += "</ul>";
	$("#dv_tocArea").html(html);
	$("#legend_progress").hide();

	fnDispArrow();
}

var pLabelStyle;
//context menu 내용 구성
function fnSetContexMenu(key, options) {
	var thisId = parseInt(this.attr("id").replace("chgSymbol_", ""));
	m_SelectedLayerID = thisId;

	$("#dvLayerScale").hide();
	$("#dvLabel").hide();
	$("#dvSymbol").hide();

	switch (key) {
	case "cmdLayerScale":
		$("#dvLayerScaleTitle").text("[" + this.text() + "] 유효축척 설정");
		$("#txt_LayerMaxScale").val(m_DynamicLayerInfos[thisId].maxScale);
		$("#txt_LayerMinScale").val(m_DynamicLayerInfos[thisId].minScale);
		$("#chkScaleSave").prop("checked", false);
		fnDivShow("dvLayerScale", true, false);
		break;
	case "cmdLabel":
		$("#dvLabelTitle").text("[" + this.text() + "] 주석 설정");
		$("#chkLabelSave").prop("checked", false);
		$("#chk_LabelNewLine").prop("checked", false);
		$("#txt_LabelPrefix").empty();
		$("#txt_LabelSuffix").empty();

		if (!m_LayerDrawingOptions[thisId]) {
			var renderer = JSON.parse(JSON.stringify(m_LayersInfo.layers[m_SelectedLayerID].drawingInfo));
			m_LayerDrawingOptions[thisId] = new esri.layers.LayerDrawingOptions(renderer);
			m_LayerDrawingOptions[thisId].renderer.type = m_LayersInfo.layers[thisId].drawingInfo.renderer.type;
			if (m_LayersInfo.layers[thisId].hasLabels)
				m_LayerDrawingOptions[thisId].showLabels = true;
		}

		pLabelStyle = {
			MAXSCALE : 0,
			MINSCALE : 0,
			LABELEXPRESSION : "",
			COLOR : "#000000",
			FONTSIZE : 10,
			FONTFAMILY : "Malgun Gothic",
			FONTWEIGHT : esri.symbol.Font.WEIGHT_NORMAL,
			FONTSTYLE : esri.symbol.Font.STYLE_NORMAL
		};

		$("#LabelScaleDiv").hide();
		$("#rdo_LabelInVisible").prop("checked", true);

		if (m_LayerDrawingOptions[thisId].showLabels) {
			$("#rdo_LabelVisible").prop("checked", true);
			$("#LabelScaleDiv").show();
		}

		var pLabelingInfo,
		pExistLabelField;
		if (m_LayerDrawingOptions[thisId].labelingInfo) {

			pLabelingInfo = m_LayerDrawingOptions[thisId].labelingInfo[0];

			//유효축척
			pLabelStyle.MAXSCALE = pLabelingInfo.maxScale;
			pLabelStyle.MINSCALE = pLabelingInfo.minScale;

			//글꼴
			pLabelStyle.LABELEXPRESSION = pLabelingInfo.labelExpression;
			pExistLabelField = pLabelingInfo.labelExpression.replace(/[\[\]]/g, "");

			var pLabelingInfoSymbol = pLabelingInfo.symbol;
			pLabelStyle.COLOR = pLabelingInfoSymbol.color.toHex();

			var pLabelingInfoSymbolFont = pLabelingInfoSymbol.font;
			pLabelStyle.FONTFAMILY = pLabelingInfoSymbolFont.family;
			pLabelStyle.FONTSIZE = parseInt(pLabelingInfoSymbolFont.size); // pixcel ex) 10pt = 13.3333 pixel
			pLabelStyle.FONTWEIGHT = pLabelingInfoSymbolFont.weight;
			pLabelStyle.FONTSTYLE = pLabelingInfoSymbolFont.style;
		}

		$("#txt_LabelMaxExtent").val(pLabelStyle.MAXSCALE);
		$("#txt_LabelMinExtent").val(pLabelStyle.MINSCALE);
		$("#txt_LabelExpression").val(pLabelStyle.LABELEXPRESSION.replace(/CONCAT/g, "+").replace(/NEWLINE/g, "줄바꿈"));
		$("#txt_LabelFontColor").val(pLabelStyle.COLOR);
		$("#txt_LabelFontColor").css("background", pLabelStyle.COLOR);
		$("#txt_LabelFontColor").css("color", pLabelStyle.COLOR);
		$("#sel_LabelFontFamily option[value='" + pLabelStyle.FONTFAMILY + "']").attr("selected", "selected");
		$("#sel_LabelFontSize option[value='" + pLabelStyle.FONTSIZE + "']").attr("selected", "selected");
		$("#chk_LabelFontBold").prop("checked", (pLabelStyle.FONTWEIGHT == esri.symbol.Font.WEIGHT_BOLD));
		$("#chk_LabelFontOblique").prop("checked", (pLabelStyle.FONTSTYLE == esri.symbol.Font.STYLE_OBLIQUE));

		//필드
		$("#sel_LabelField").empty();
		var isLabelExpressionUserDefinition = true;
		$(m_LayersInfo.layers[thisId].fields).each(function (i, d) {
			if ($.inArray(d.name, ["SHAPE", "SHAPE.AREA", "SHAPE.LEN"]) >= 0)
				return;
			var opt = "";
			if (d.name == pExistLabelField) {
				opt = "<option value='" + d.name + "' selected='selected'>" + d.alias + "</option>";
				isLabelExpressionUserDefinition = false;
			} else {
				opt = "<option value='" + d.name + "'>" + d.alias + "</option>";
			}
			$("#sel_LabelField").append(opt);
		});
		if (isLabelExpressionUserDefinition) {
			$("#sel_LabelField").append("<option selected='selected'>사용자정의</option>");
		}
		fnDivShow("dvLabel", true, false);
		break;
	case "cmdSymbol":
		//alert("오픈 예정입니다.");return;
		$("#dvSymbolTitle").text("[" + this.text() + "] 심볼 설정");
		$("#chkSymbolSave").prop("checked", false);
		fnDivShow("dvSymbol", true, false);

		if (!m_LayerDrawingOptions[thisId]) {
			var renderer = JSON.parse(JSON.stringify(m_LayersInfo.layers[m_SelectedLayerID].drawingInfo));
			m_LayerDrawingOptions[thisId] = new esri.layers.LayerDrawingOptions(renderer);
			m_LayerDrawingOptions[thisId].renderer.type = m_LayersInfo.layers[thisId].drawingInfo.renderer.type;
			if (m_LayersInfo.layers[thisId].hasLabels)
				m_LayerDrawingOptions[thisId].showLabels = true;
		}
		var pRenderer = m_LayerDrawingOptions[thisId].renderer;
		switch (pRenderer.type) {
		case "simple":
			$("#dvSymbol li._tab1 input").click();
			break;
		case "uniqueValue":
			$("#dvSymbol li._tab2 input").click();
			break;
		}
		break;
	case "cmdSymbolInit":
		if (!confirm("심볼 및 축척정보가 초기화됩니다. 계속하시겠습니까?"))
			return;

		m_ArrowDispLayerIds = $.grep(m_ArrowDispLayerIds, function (data, i) {
				return data != thisId;
			});

		var pDrawingInfo = JSON.parse(JSON.stringify(m_LayersInfo.layers[m_SelectedLayerID].drawingInfo));
		m_LayerDrawingOptions[thisId] = new esri.layers.LayerDrawingOptions(pDrawingInfo);
		m_LayerDrawingOptions[thisId].renderer.type = pDrawingInfo.renderer.type;
		basemap.setLayerDrawingOptions(m_LayerDrawingOptions);
		fnSetLegend();

		$.ajax({
			type : "post",
			url : "/etc/etcMapUserRendererDelete.do",
			data : {
				LAYER_ALIASNAME : this.text()
			},
			error : function (xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
		break;
	case "cmdRemove":
		m_VisibleLayers = $.grep(m_VisibleLayers, function (data, i) {
				return data != thisId;
			});
		m_TocLayers = $.grep(m_TocLayers, function (data, i) {
				return data != thisId;
			});
		basemap.setVisibleLayers(m_VisibleLayers);
		fnSetLegend();
		if ($("#dvLayerManager").css("display") != "none")
			fnOpenLayerManager();
		break;
	case "cmdZoomToExtent": //현재레이어 전체화면
		var ext = m_LayersInfo.layers[thisId].extent;
		zoomExtent(ext.xmin, ext.ymin, ext.xmax, ext.ymax);
		break;
	}
}

/*
 * 레이어 유효축척 적용
 */
function fnLayerScaleApply() {
	var min = $("#txt_LayerMinScale").val();
	var max = $("#txt_LayerMaxScale").val();
	if (!util.isNumber(min) || !util.isNumber(min)) {
		alert("숫자 값을 입력하여 주시기 바랍니다.");
		return;
	} else if (min > 80000 || max > 80000) {
		alert("1:80,000 범위의 축척을 입력하여 주시기 바랍니다.");
		return;
	}

	m_DynamicLayerInfos[m_SelectedLayerID].minScale = min;
	m_DynamicLayerInfos[m_SelectedLayerID].maxScale = max;

	//map에 dynamicInfo 적용
	fnSetDynamicInfoToMap(m_VisibleLayers);
	fnSetLegend();

	if ($("#chkScaleSave").prop("checked")) {
		$.ajax({
			type : "post",
			url : "/etc/etcMapUserRendererSave.do",
			data : {
				LAYER_ALIASNAME : $(".tocSelected").first().children().first().text(),
				MINSCALE : min,
				MAXSCALE : max,
			},
			error : function (xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
	}
}

/*
 * 단일심볼
 */
function fnSimpleSymbol() {
	$(".simpleSymbol").each(function () {
		$(this).hide();
	});
	$("#li_SimpleArrowHead").css("display", "none");

	var pInitRenderer = m_LayersInfo.layers[m_SelectedLayerID].drawingInfo.renderer; //발행된 초기값
	var pRenderer = m_LayerDrawingOptions[m_SelectedLayerID].renderer; //현재
	var pSymbol;
	if (pInitRenderer.type == "simple" && pRenderer.type == "simple") {
		pSymbol = pRenderer.symbol;
	} else if (pInitRenderer.type == "simple" && pRenderer.type == "uniqueValue") {
		pSymbol = new esri.symbol.fromJson(pInitRenderer.symbol);
	} else if (pInitRenderer.type == "uniqueValue" && pRenderer.type == "simple") {
		pSymbol = pRenderer.symbol;
	} else if (pInitRenderer.type == "uniqueValue" && pRenderer.type == "uniqueValue") {
		pSymbol = new esri.symbol.fromJson(pInitRenderer.uniqueValueInfos[0].symbol);
	}

	$("#dv_" + pSymbol.type).show();
	$("#dv_" + pSymbol.type + " ul").css("height", "360px");

	switch (pSymbol.type) {
	case "simplemarkersymbol":
		var pSimpleMarkerSymbol = pSymbol;
		$("#txt_SimpleMarkerSymbolColor").val(pSimpleMarkerSymbol.color.toHex());
		$("#txt_SimpleMarkerSymbolColor").css("background", pSimpleMarkerSymbol.color.toHex());
		$("#txt_SimpleMarkerSymbolColor").css("color", pSimpleMarkerSymbol.color.toHex());
		$("#sel_SimpleMarkerSymbolStyle").msDropDown().data("dd").set("value", pSimpleMarkerSymbol.style);
		$("#txt_SimpleMarkerSymbolSize").val(pSimpleMarkerSymbol.size.toFixed(2));
		break;
	case "picturemarkersymbol":
		var pPicturemarkersymbol = pSymbol;
		//$("#sel_PictureMarkerSymbolStyle").msDropDown().data("dd").set("value", "custom");
		var callback = function(color) {
			var hexColor = color.toHex();
			$("#txt_PictureMarkerSymbolColor").val(hexColor);
			$("#txt_PictureMarkerSymbolColor").css("background", hexColor);
			$("#txt_PictureMarkerSymbolColor").css("color", hexColor);
			$("#txt_PictureMarkerSymbolSizeW").val(pPicturemarkersymbol.width.toFixed(2));
			$("#txt_PictureMarkerSymbolSizeH").val(pPicturemarkersymbol.height.toFixed(2));
			//$("#sel_PictureMarkerSymbolStyle").msDropDown().data("dd").get(0).attr("data-image", $("#toc_" + m_SelectedLayerID).next().attr("src"));
			//$("#sel_PictureMarkerSymbolStyle").msDropDown().data("dd").refresh();
		};
		fnGetColorByBase64Image(pPicturemarkersymbol.url, callback);
		break;
	case "simplelinesymbol":
		$("#li_SimpleArrowHead").css("display", "");

		var pSimpleLineSymbol = pSymbol;
		$("#txt_SimpleLineSymbolColor").val(pSimpleLineSymbol.color.toHex());
		$("#txt_SimpleLineSymbolColor").css("background", pSimpleLineSymbol.color.toHex());
		$("#txt_SimpleLineSymbolColor").css("color", pSimpleLineSymbol.color.toHex());
		$("#sel_SimpleLineSymbolStyle").msDropDown().data("dd").set("value", pSimpleLineSymbol.style);
		$("#txt_SimpleLineSymbolSize").val(pSimpleLineSymbol.width.toFixed(2));

		$("#chkSimpleArrowHead").prop("checked", ($.inArray(m_SelectedLayerID, m_ArrowDispLayerIds) >= 0));
		break;
	case "simplefillsymbol":
		$("#dv_simplelinesymbol").show();
		$("#dv_simplelinesymbol ul").css("height", "175px");
		$("#dv_simplefillsymbol ul").css("height", "175px");

		var pSimpleFillSymbol = pSymbol;
		$("#txt_SimpleFillSymbolColor").val(pSimpleFillSymbol.color.toHex());
		$("#txt_SimpleFillSymbolColor").css("background",
			(pSimpleFillSymbol.color.a == 0) ? "#000000" : pSimpleFillSymbol.color.toHex());
		$("#txt_SimpleFillSymbolColor").css("color",
			(pSimpleFillSymbol.color.a == 0) ? "#000000" : pSimpleFillSymbol.color.toHex());
		$("#sel_SimpleFillSymbolStyle").msDropDown().data("dd").set("value",
			(pSimpleFillSymbol.color.a == 0) ? "none" : pSimpleFillSymbol.style);

		var pSimpleLineSymbol = pSimpleFillSymbol.outline;
		$("#txt_SimpleLineSymbolColor").val(pSimpleLineSymbol.color.toHex());
		$("#txt_SimpleLineSymbolColor").css("background", pSimpleLineSymbol.color.toHex());
		$("#txt_SimpleLineSymbolColor").css("color", pSimpleLineSymbol.color.toHex());
		$("#sel_SimpleLineSymbolStyle").msDropDown().data("dd").set("value", pSimpleLineSymbol.style);
		$("#txt_SimpleLineSymbolSize").val(pSimpleLineSymbol.width.toFixed(2));
		break;
	}
}

/*
 * 확장심볼
 */
function fnUniqueSymbol() {
	$("#symbol_progress").center();
	$("#symbol_progress").show();
	//초기화
	$("#lbl_Unique_ArrowHead").css("display", "none");
	$(".uniqueSymbol").each(function () {
		$(this).hide();
	});
	$("#dv_UniqueItemApply").hide();
	dnd_uniqueSymbolList.selectAll().deleteSelectedNodes();

	var pRenderer = m_LayerDrawingOptions[m_SelectedLayerID].renderer;
	var pSymbol;

	//도메인 항목 바인딩
	esri.request({
		url : urlBaseFeatureMap + "/" + m_SelectedLayerID,
		content : {
			f : "json"
		},
		handleAs : "json"
	}).then(function (res) {
		$("#sel_UniqueSymbolDomain").empty();
		var html = "";
		$.each(res.fields, function (i, data) {
			if (data.domain && data.domain.type == "codedValue") {
				if (data.domain.name == "지형지물부호") {
					if (m_LayersInfo.layers[m_SelectedLayerID].drawingInfo.renderer.field1 == "FTR_CDE") {
						html += "<option value='" + data.name + "'>" + data.alias + "</option>";
					}
				} else {
					html += "<option value='" + data.name + "'>" + data.alias + "</option>";
				}
			}

		});
		$("#sel_UniqueSymbolDomain").append(html);

		if (pRenderer.type == "simple") {
			pSymbol = pRenderer.symbol;
		} else if (pRenderer.type == "uniqueValue") {
			pSymbol = pRenderer.infos[0].symbol;
			$("#sel_UniqueSymbolDomain").val(pRenderer.attributeField);
		}
		if (pSymbol.type == "simplelinesymbol") {
			$("#lbl_Unique_ArrowHead").css("display", "");
			$("#chkUniqueArrowHead").prop("checked", ($.inArray(m_SelectedLayerID, m_ArrowDispLayerIds) >= 0));
		}
		if ($("#sel_UniqueSymbolDomain").children().length > 0)
			$("#sel_UniqueSymbolDomain").change();
	}, function (error) {
		alert("failed get domain field\ncause :" + error);
	});

	$("#sel_UniqueSymbolDomain").change(function () {
		$("#symbol_progress").center();
		$("#symbol_progress").show();
		$(".uniqueSymbol").each(function () {
			$(this).hide();
		});
		$("#dv_UniqueItemApply").hide();
		dnd_uniqueSymbolList.selectAll().deleteSelectedNodes();
		fnBindUniqueItem();
	});

	fnBindUniqueItem = function () {
		esri.request({
			url : urlBaseFeatureMap + "/" + m_SelectedLayerID,
			content : {
				f : "json"
			},
			handleAs : "json"
		}).then(fnBindUniqueItemResult, function (error) {
			alert("failed function fnBindUniqueItem\ncause :" + error);
		});
	};

	fnBindUniqueItemResult = function (res) {
		var pFields = res.fields;
		var pDomainField = $("#sel_UniqueSymbolDomain").val();
		//포인터 참조인듯해서 임시 LayerDrawingOptions 생성
		m_LayerDrawingOptionsTmp[m_SelectedLayerID] = new esri.layers.LayerDrawingOptions(m_LayerDrawingOptions[m_SelectedLayerID].toJson());
		m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.type = m_LayerDrawingOptions[m_SelectedLayerID].renderer.type;

		var pInitRenderer = m_LayersInfo.layers[m_SelectedLayerID].drawingInfo.renderer; //발행된 초기값
		var pRenderer = m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer; //현재

		var pLayerName = res.name;

		fnTmpUniqueValueRenderer = function () {
			//create random symbol by codedvalue domain
			var pSelField;
			for (var i = 0; i < pFields.length; i++) {
				if (pFields[i].name == $("#sel_UniqueSymbolDomain").val()) {
					pSelField = pFields[i];
					break;
				}
			}
			var pUniqueValueRenderer = new esri.renderer.UniqueValueRenderer(null, $("#sel_UniqueSymbolDomain").val());
			
			fnSetUniqueValueRenderer = function(uvr) {
				
			};
			
			$.each(pSelField.domain.codedValues, function (idx, data) {
				var symbol;
				if (pRenderer.type == "simple") {
					symbol = pRenderer.symbol;
				} else if (pRenderer.type == "uniqueValue") {
					symbol = pRenderer.infos[0].symbol;
				}

				var pRandomSymbol;
				switch (symbol.type) {
				case "simplemarkersymbol":
					pRandomSymbol = fnGetMarkerSymbol("solid", fnGetRandomColor(), 10, "solid", "black", 1);
					break;
				case "picturemarkersymbol":
					var callback = function(pms) {
						pUniqueValueRenderer.addValue({
							value : data.code,
							symbol : pms.toJson(),
							label : data.name
						});
					};
					fnGetPictureMarkerSymbol(symbol.url, symbol.width, symbol.height, fnGetRandomColor(), callback);
					break;
				case "simplelinesymbol":
					pRandomSymbol = fnGetPolylineSymbol("solid", fnGetRandomColor(), 1);
					break;
				case "simplefillsymbol":
					pRandomSymbol = fnGetPolygonSymbol("solid", fnGetRandomColor(), "solid", "black", 1);
					break;
				}
				
				if (symbol.type != "picturemarkersymbol") {
					pUniqueValueRenderer.addValue({
						value : data.code,
						symbol : pRandomSymbol.toJson(),
						label : data.name
					});
				}
			});
			
			setTimeout(function() {
				pUniqueValueRenderer.setRotationInfo(m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.rotationInfo);
				m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer = pUniqueValueRenderer;
				m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.type = "uniqueValue";
				fnBindUniqueItemResultList();
			}, 1000);
		};

		if (pInitRenderer.type == "simple" && pRenderer.type == "simple") {
			fnTmpUniqueValueRenderer();
		} else if (pInitRenderer.type == "simple" && pRenderer.type == "uniqueValue") {
			if (pRenderer.attributeField != pDomainField) { //현재 renderer와 선택 도메인이 같지 않다면
				fnTmpUniqueValueRenderer();
			} else {
				m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.type = "uniqueValue";
				fnBindUniqueItemResultList();
			}
		} else if (pInitRenderer.type == "uniqueValue") {
			if (pInitRenderer.field1 == pDomainField) { //발행된 정보와 같다면
				var renderer = JSON.parse(JSON.stringify(m_LayersInfo.layers[m_SelectedLayerID].drawingInfo.renderer));
				m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer = new esri.renderer.UniqueValueRenderer(renderer);
				m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.type = "uniqueValue";
				fnBindUniqueItemResultList();
			} else if (pRenderer.attributeField != pDomainField) { //현재 renderer와 선택 도메인이 같지 않다면
				fnTmpUniqueValueRenderer();
			} else {
				m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.type = "uniqueValue";
				fnBindUniqueItemResultList();
			}
		}
	};

	fnSetUniqueItem = function (idx) {
		$("#dv_unique_" + pSymbol.type).show();
		$("#dv_unique_" + pSymbol.type + " ul").css("height", "270px");
		$("#dv_UniqueItemApply").show();

		var pSelectedSubSymbol = m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.infos[idx].symbol;
		switch (pSymbol.type) {
		case "simplemarkersymbol":
			var pSimpleMarkerSymbol = pSelectedSubSymbol;
			$("#txt_Unique_SimpleMarkerSymbolColor").val(pSimpleMarkerSymbol.color.toHex());
			$("#txt_Unique_SimpleMarkerSymbolColor").css("background", pSimpleMarkerSymbol.color.toHex());
			$("#txt_Unique_SimpleMarkerSymbolColor").css("color", pSimpleMarkerSymbol.color.toHex());
			$("#sel_Unique_SimpleMarkerSymbolStyle").msDropDown().data("dd").set("value", pSimpleMarkerSymbol.style);
			$("#txt_Unique_SimpleMarkerSymbolSize").val(pSimpleMarkerSymbol.size.toFixed(2));
			break;
		case "picturemarkersymbol":
			var pPicturemarkersymbol = pSelectedSubSymbol;
			var callback = function(color) {
				var hexColor = color.toHex();
				$("#txt_Unique_PictureMarkerSymbolColor").val(hexColor);
				$("#txt_Unique_PictureMarkerSymbolColor").css("background", hexColor);
				$("#txt_Unique_PictureMarkerSymbolColor").css("color", hexColor);
				//$("#sel_Unique_PictureMarkerSymbolStyle").msDropDown().data("dd").set("value", "custom");
				$("#txt_Unique_PictureMarkerSymbolSizeW").val(pPicturemarkersymbol.width.toFixed(2));
				$("#txt_Unique_PictureMarkerSymbolSizeH").val(pPicturemarkersymbol.height.toFixed(2));
			};
			fnGetColorByBase64Image(pPicturemarkersymbol.url, callback);
			break;
		case "simplelinesymbol":
			var pSimpleLineSymbol = pSelectedSubSymbol;
			$("#txt_Unique_SimpleLineSymbolColor").val(pSimpleLineSymbol.color.toHex());
			$("#txt_Unique_SimpleLineSymbolColor").css("background", pSimpleLineSymbol.color.toHex());
			$("#txt_Unique_SimpleLineSymbolColor").css("color", pSimpleLineSymbol.color.toHex());
			$("#sel_Unique_SimpleLineSymbolStyle").msDropDown().data("dd").set("value", pSimpleLineSymbol.style);
			$("#txt_Unique_SimpleLineSymbolSize").val(pSimpleLineSymbol.width.toFixed(2));
			break;
		case "simplefillsymbol":
			$("#dv_unique_simplelinesymbol ul").css("height", "135px");
			$("#dv_unique_simplefillsymbol ul").css("height", "135px");
			$("#dv_unique_simplelinesymbol").show();

			var pSimpleFillSymbol = pSelectedSubSymbol;
			$("#txt_Unique_SimpleFillSymbolColor").val(pSimpleFillSymbol.color.toHex());
			$("#txt_Unique_SimpleFillSymbolColor").css("background",
				(pSimpleFillSymbol.color.a == 0) ? "#000000" : pSimpleFillSymbol.color.toHex());
			$("#txt_Unique_SimpleFillSymbolColor").css("color",
				(pSimpleFillSymbol.color.a == 0) ? "#000000" : pSimpleFillSymbol.color.toHex());
			$("#sel_Unique_SimpleFillSymbolStyle").msDropDown().data("dd").set("value",
				(pSimpleFillSymbol.color.a == 0) ? "none" : pSimpleFillSymbol.style);

			var pSimpleLineSymbol = pSimpleFillSymbol.outline;
			$("#txt_Unique_SimpleLineSymbolColor").val(pSimpleLineSymbol.color.toHex());
			$("#txt_Unique_SimpleLineSymbolColor").css("background", pSimpleLineSymbol.color.toHex());
			$("#txt_Unique_SimpleLineSymbolColor").css("color", pSimpleLineSymbol.color.toHex());
			$("#sel_Unique_SimpleLineSymbolStyle").msDropDown().data("dd").set("value", pSimpleLineSymbol.style);
			$("#txt_Unique_SimpleLineSymbolSize").val(pSimpleLineSymbol.width.toFixed(2));
			break;
		}
	};
}

function fnBindUniqueItemResultList() {
	esri.request({
		url : urlBasemap + "/legend",
		content : {
			f : "json",
			dynamicLayers : JSON.stringify(fnBuildDynamicInfoJsonTmp([m_SelectedLayerID]))
		},
		handleAs : "json"
	}).then(function (res) {
		dnd_uniqueSymbolList.selectAll().deleteSelectedNodes();
		$.each(res.layers[0].legend, function (i, data) {
			var div = "";
			//div += "<div onclick='fnSetUniqueItem('" + data.values[0] + "');'>";
			div += "<div id='dv_UniqueItem_" + i + "' class='uniqueSymbolList' onclick='fnSetUniqueItem(" + i + ");'>";
			div += "<input type='checkbox' checked='checked' onchange='' class='chk_UniqueItem' />";
			div += "<label>";
			div += "<img src='data:image/png;base64," + data.imageData + "' border='0' style='vertical-align: middle' />";
			div += data.label;
			div += "</label>";
			div += "</div>";
			//where
			//true : 위로, false : 아래로
			dnd_uniqueSymbolList.insertNodes(false, [div], false, null);
		});
		$("#symbol_progress").hide();
	}, function (error) {
		alert("failed get unique symbol\ncause :" + error);
	});
}

function fnGetColorByBase64Image(url, callback) {
	var myImg = new Image();
	myImg.src = url;
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	myImg.onload = function() {
		ctx.drawImage(myImg, 0, 0);
		
		var imgd = ctx.getImageData(0, 0, myImg.naturalWidth, myImg.naturalHeight);
		var r, g, b, a;
		for (var i = 0; i < imgd.data.length; i += 4) {
			r = imgd.data[i];
			g = imgd.data[i + 1];
			b = imgd.data[i + 2];
			a = imgd.data[i + 3];
			if (a > 0)
				break;
		}
		callback(new dojo.Color([r, g, b, 1]));
	};
}

function fnGetRandomColor() {
	var colors = ["red", "green", "blue", "green", "fuchsia", "aqua", "purple", "lime", "maroon", "teal", "yellow"];
	var color = "red";
	for ( var i = 0; i < colors.length; i++) {
		if (i == Math.floor(Math.random() * colors.length)) {
			color = colors[i];
			break;
		}
	}
	return color;
	
	/*var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);

	return [r, g, b];*/
}

function fnUniqueItemSymbolApply() {
	if (dnd_uniqueSymbolList.getSelectedNodes().length == 0) {
		alert("우측 서브심볼 목록을 선택하시기 바랍니다.");
		return;
	}
	var pInfosIndex = Number($(dnd_uniqueSymbolList.getSelectedNodes()).children().attr("id").replace("dv_UniqueItem_", ""));
	var pLayerDrawingOptions = []; //원본을 바꾸면 따라 바뀌어서
	pLayerDrawingOptions[m_SelectedLayerID] = new esri.layers.LayerDrawingOptions(m_LayerDrawingOptionsTmp[m_SelectedLayerID].toJson());
	pLayerDrawingOptions[m_SelectedLayerID].renderer.type = m_LayerDrawingOptionsTmp[m_SelectedLayerID].renderer.type;

	var pUniqueSubSymbol;
	var pType = pLayerDrawingOptions[m_SelectedLayerID].renderer.infos[0].symbol.type;
	switch (pType) {
	case "simplemarkersymbol":
		pUniqueSubSymbol = fnGetMarkerSymbol("solid", $("#txt_Unique_SimpleMarkerSymbolColor").val(),
				"solid", "black", $("#txt_Unique_SimpleMarkerSymbolSize").val());
		break;
	case "picturemarkersymbol":
		var callback = function(sym) {
			pUniqueSubSymbol = sym;
		};
		fnGetPictureMarkerSymbol(pLayerDrawingOptions[m_SelectedLayerID].renderer.infos[pInfosIndex].symbol.url,
				$("#txt_Unique_PictureMarkerSymbolSizeW").val(), $("#txt_Unique_PictureMarkerSymbolSizeH").val(),
				$("#txt_Unique_PictureMarkerSymbolColor").val(), callback);
		break;
	case "simplelinesymbol":
		pUniqueSubSymbol = fnGetPolylineSymbol($("#sel_Unique_SimpleLineSymbolStyle").val(),
				$("#txt_Unique_SimpleLineSymbolColor").val(), $("#txt_Unique_SimpleLineSymbolSize").val());
		break;
	case "simplefillsymbol":
		pUniqueSubSymbol = fnGetPolygonSymbol($("#sel_Unique_SimpleFillSymbolStyle").val(), $("#txt_Unique_SimpleFillSymbolColor").val(),
				$("#sel_Unique_SimpleLineSymbolStyle").val(), $("#txt_Unique_SimpleLineSymbolColor").val(), $("#txt_Unique_SimpleLineSymbolSize").val());
		break;
	}
	if (pType == "picturemarkersymbol") {
		setTimeout(function() {
			pLayerDrawingOptions[m_SelectedLayerID].renderer.infos[pInfosIndex].symbol = pUniqueSubSymbol;
			m_LayerDrawingOptionsTmp[m_SelectedLayerID] = new esri.layers.LayerDrawingOptions(pLayerDrawingOptions[m_SelectedLayerID].toJson());
			m_LayerDrawingOptionsTmp[m_SelectedLayerID].type = pLayerDrawingOptions[m_SelectedLayerID].renderer.type;
			fnBindUniqueItemResultList();
		}, 1000);
	} else {
		pLayerDrawingOptions[m_SelectedLayerID].renderer.infos[pInfosIndex].symbol = pUniqueSubSymbol;
		m_LayerDrawingOptionsTmp[m_SelectedLayerID] = new esri.layers.LayerDrawingOptions(pLayerDrawingOptions[m_SelectedLayerID].toJson());
		m_LayerDrawingOptionsTmp[m_SelectedLayerID].type = pLayerDrawingOptions[m_SelectedLayerID].renderer.type;
		fnBindUniqueItemResultList();
	}
}

function fnSymbolApply() {
	var pRenderer = m_LayerDrawingOptions[m_SelectedLayerID].renderer;
	var pSymbol;
	if (pRenderer.type == "simple") {
		pSymbol = pRenderer.symbol;
	} else if (pRenderer.type == "uniqueValue") {
		pSymbol = pRenderer.infos[0].symbol;
	}

	if ($("#dvSymbol li._tab1").getClasses().indexOf("on") >= 0) { //단일심볼
		var pSimpleSymbol;
		switch (pSymbol.type) {
		case "simplemarkersymbol":
			pSimpleSymbol = fnGetMarkerSymbol($("#sel_SimpleMarkerSymbolStyle").val(), $("#txt_SimpleMarkerSymbolColor").val(),
					$("#txt_SimpleMarkerSymbolSize").val(), "solid", "black", 1);
			break;
		case "picturemarkersymbol":
			var callback = function(sym) {
				pSimpleSymbol = sym;
			};
			fnGetPictureMarkerSymbol(pSymbol.url,
					$("#txt_PictureMarkerSymbolSizeW").val(), $("#txt_PictureMarkerSymbolSizeH").val(),
					$("#txt_PictureMarkerSymbolColor").val(), callback);
			break;
		case "simplelinesymbol":
			pSimpleSymbol = fnGetPolylineSymbol($("#sel_SimpleLineSymbolStyle").val(),
					$("#txt_SimpleLineSymbolColor").val(), $("#txt_SimpleLineSymbolSize").val());

			//방향표시 처리
			if ($("#chkSimpleArrowHead").prop("checked")) {
				m_ArrowDispLayerIds.push(m_SelectedLayerID);
			} else {
				m_ArrowDispLayerIds = $.grep(m_ArrowDispLayerIds, function (data, i) {
						return data != m_SelectedLayerID;
					});
			}
			fnDispArrow(); //in aMapEventListener.js
			break;
		case "simplefillsymbol":
			pSimpleSymbol =
				fnGetPolygonSymbol($("#sel_SimpleFillSymbolStyle").val(),
					$("#txt_SimpleFillSymbolColor").val(), $("#sel_SimpleLineSymbolStyle").val(), $("#txt_SimpleLineSymbolColor").val(),
					$("#txt_SimpleLineSymbolSize").val());
			break;
		}
		if (pSymbol.type == "picturemarkersymbol") {
			setTimeout(function() {
				var pSimpleRenderer = new esri.renderer.SimpleRenderer(pSimpleSymbol);
				pSimpleRenderer.setRotationInfo(m_LayerDrawingOptions[m_SelectedLayerID].renderer.rotationInfo);
				m_LayerDrawingOptions[m_SelectedLayerID].renderer = pSimpleRenderer;
				m_LayerDrawingOptions[m_SelectedLayerID].renderer.type = "simple";
				basemap.setLayerDrawingOptions(m_LayerDrawingOptions);
				fnSetLegend();
				fnLayerDrawingOptionsSave2DB();
			}, 1000);
		} else {
			var pSimpleRenderer = new esri.renderer.SimpleRenderer(pSimpleSymbol);
			pSimpleRenderer.setRotationInfo(m_LayerDrawingOptions[m_SelectedLayerID].renderer.rotationInfo);
			m_LayerDrawingOptions[m_SelectedLayerID].renderer = pSimpleRenderer;
			m_LayerDrawingOptions[m_SelectedLayerID].renderer.type = "simple";
			basemap.setLayerDrawingOptions(m_LayerDrawingOptions);
			fnSetLegend();
			fnLayerDrawingOptionsSave2DB();
		}
	} else if ($("#dvSymbol li._tab2").getClasses().indexOf("on") >= 0) { //확장심볼
		m_LayerDrawingOptions[m_SelectedLayerID] = new esri.layers.LayerDrawingOptions(m_LayerDrawingOptionsTmp[m_SelectedLayerID].toJson());

		var i = 0;
		var m_ReGenUniqueRendererInfos = [];
		$(".chk_UniqueItem").each(function () {
			if ($(this).prop("checked")) {
				var reorderIdx = Number($(this).parent().attr("id").replace("dv_UniqueItem_", ""));
				m_ReGenUniqueRendererInfos[i] = m_LayerDrawingOptions[m_SelectedLayerID].renderer.infos[reorderIdx];
				i++;
			}
		});
		m_LayerDrawingOptions[m_SelectedLayerID].renderer.infos = m_ReGenUniqueRendererInfos;

		switch (pSymbol.type) {
		case "simplemarkersymbol":
			break;
		case "picturemarkersymbol":
			break;
		case "simplelinesymbol":
			//방향표시 처리
			if ($("#chkUniqueArrowHead").prop("checked")) {
				m_ArrowDispLayerIds.push(m_SelectedLayerID);
			} else {
				m_ArrowDispLayerIds = $.grep(m_ArrowDispLayerIds, function (data, i) {
						return data != m_SelectedLayerID;
					});
			}
			fnDispArrow(); //in aMapEventListener.js
			break;
		case "simplefillsymbol":
			break;
		}
		m_LayerDrawingOptions[m_SelectedLayerID].renderer.type = "uniqueValue";
		basemap.setLayerDrawingOptions(m_LayerDrawingOptions);
		fnSetLegend();
		fnLayerDrawingOptionsSave2DB();
	}
}

function fnEsriColorToCssRGBA(color) {
	return "rgba(" + color.toRgba().join() + ")";
}

/*
 * 전체 펼치기
 */
function fnCmdExpand() {
	$(".legend_toggle").parent().siblings(".legend_child").show("fast");
	$(".legend_toggle").html("<img src='/images/map/toc_minus.png' alt='[-]'/>");
	$(".legend_toggle").removeClass("legend_hide");
	$(".legend_toggle").addClass("legend_show");
}

/*
 * 전체 접기
 */
function fnCmdCollapse() {
	$(".legend_toggle").parent().siblings(".legend_child").hide("fast");
	$(".legend_toggle").html("<img src='/images/map/toc_plus.png' alt='[+]'/>");
	$(".legend_toggle").removeClass("legend_show");
	$(".legend_toggle").addClass("legend_hide");
}

/*
 * 라벨 필드 추가 이벤트
 */
function fnLabelExpressionAdd() {
	var v = $("#txt_LabelExpression").val();
	if ($("#chk_LabelNewLine").prop("checked")) {
		if (v != "")
			v += " + ";
		v += " 줄바꿈";
	}
	if ($("#txt_LabelPrefix").val() != "") {
		if (v != "")
			v = v + " + ";
		v = v + "\"" + $("#txt_LabelPrefix").val() + "\"";
	}
	if ($("#sel_LabelField").val() != "") {
		if (v != "")
			v += " + ";
		v += "[" + $("#sel_LabelField").val() + "]";
	}
	if ($("#txt_LabelSuffix").val() != "") {
		if (v != "")
			v += " + ";
		v += "\"" + $("#txt_LabelSuffix").val() + "\"";
	}
	$("#txt_LabelExpression").val(v);
}

/*
 * 라벨 적용
 */
function fnLabelApply() {
	if ($("#rdo_LabelVisible").prop("checked")) { //레이어 보임
		pLabelStyle = {
			MAXSCALE : Number($("#txt_LabelMaxExtent").val()),
			MINSCALE : Number($("#txt_LabelMinExtent").val()),
			LABELEXPRESSION : $("#txt_LabelExpression").val(),
			COLOR : $("#txt_LabelFontColor").val(),
			FONTSIZE : Number($("#sel_LabelFontSize").val()),
			FONTFAMILY : $("#sel_LabelFontFamily").val(),
			FONTWEIGHT : $("#chk_LabelFontBold").prop("checked") ? "bold" : "normal",
			FONTSTYLE : $("#chk_LabelFontOblique").prop("checked") ? "italic" : "normal"
		};

		//기존 layer drawing options에서 라벨에 대한 내용을 없애버림
		//label layer를 생성하여 대신 라벨링 처리
		//(layer drawing options을 이용하여 라벨 변경시 font의 weight&style이 먹지 않음)
		var labelClass = new esri.layers.LabelClass();

		//placement
		var placement = "";
		switch (m_LayersInfo.layers[m_SelectedLayerID].geometryType) {
		case "esriGeometryPoint":
			placement = "above-center";
			break;
		case "esriGeometryPolyline":
			placement = "above-along";
			break;
		case "esriGeometryPolygon":
			placement = "always-horizontal";
			break;
		}
		labelClass.maxScale = pLabelStyle.MAXSCALE;
		labelClass.minScale = pLabelStyle.MINSCALE;
		labelClass.labelExpression = pLabelStyle.LABELEXPRESSION.replace(/\+/g, "CONCAT").replace(/줄바꿈/g, "NEWLINE");
		labelClass.labelPlacement = placement;
		labelClass.symbol = new esri.symbol.TextSymbol("").setColor(
				new esri.Color(new dojo.Color(pLabelStyle.COLOR))).setAlign("middle").setAngle(0).setFont(
				new esri.symbol.Font(pLabelStyle.FONTSIZE).setWeight(pLabelStyle.FONTWEIGHT)
				.setFamily(pLabelStyle.FONTFAMILY).setWeight(pLabelStyle.FONTWEIGHT).setStyle(pLabelStyle.FONTSTYLE));
		labelClass.useCodedValues = true;

		m_LayerDrawingOptions[m_SelectedLayerID].labelingInfo = [labelClass];
		m_LayerDrawingOptions[m_SelectedLayerID].showLabels = true;
	} else {
		if (m_LayerDrawingOptions[m_SelectedLayerID].labelingInfo) {
			m_LayerDrawingOptions[m_SelectedLayerID].showLabels = false;
		} else {
			return;
		}
	}
	basemap.setLayerDrawingOptions(m_LayerDrawingOptions);
	fnLayerDrawingOptionsSave2DB();
}

function fnLayerDrawingOptionsSave2DB() {
	if ($("#chkLabelSave").prop("checked") || $("#chkSymbolSave").prop("checked")) {
		var data = {};
		data.LAYER_ALIASNAME = $(".tocSelected").first().children().first().text();
		data.RENDERER = JSON.stringify(m_LayerDrawingOptions[m_SelectedLayerID].toJson());

		if (m_LayersInfo.layers[m_SelectedLayerID].geometryType == "esriGeometryPolyline") {
			if ($("#chkSimpleArrowHead").prop("checked") || $("#chkUniqueArrowHead").prop("checked")) {
				data.ISARROW = "1";
			} else {
				data.ISARROW = "0";
			}
		}

		$.ajax({
			type : "post",
			url : "/etc/etcMapUserRendererSave.do",
			data : data,
			error : function (xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
	}
}

//dynamicInfo 적용
function fnSetDynamicInfoToMap(list) {
	var setList;
	require(["dojo/_base/array"], function (arrayUtils) {
		setList = arrayUtils.map(list, function (id) {
				return m_DynamicLayerInfos[id];
			});
	});

	for (var i in setList) {
		setList[i].defaultVisibility = true;
	}
	basemap.setDynamicLayerInfos(setList);
}

function fnMapUserConfigDelete() {
	$.ajax({
		type : "post",
		url : "/etc/etcMapUserConfigDelete.do",
		error : function (xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete : function () {
			alert("삭제되었습니다.");
		}
	});
}