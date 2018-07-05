var m_UserGraphicToolbar;
var m_UserGraphicSelectedGraphic; //선택된 그래픽
var m_UserGraphic_TextSymbol; //텍스트 심볼
var m_IsText = false; //텍스트 입력인지..
var m_UserGraphicClickPt; //텍스트 입력을 위해서
var m_IsGetSymbolFromDB = false; //저장된 사용자 심볼을 검색해봤는지..
var m_OverTextGraphicIdx = -1; //도형 안의 문자 인덱스 : 이동/삭제
var m_DrawEditToolbar;//도형수정시 edit   

function fnUserGraphicGetUserSymbol() {
	if (m_IsGetSymbolFromDB) {
		$("#dvUserGraphicsIcon").show();
		return;
	}

	$.ajax({
		type : "post",
		dataType : "json",
		data : {
			USER_ID : $("#USER_ID").val(),
			SYS_ID : $("#SYS_ID").val()
		},
		url : "/etc/etcMapUserGraphicSymbolList.do",
		success : function (data) {
			if (data.list.length > 0) {
				if (data.list[0].SYMBOL_P != "")
					m_UserGraphic_MarkerSymbol = new esri.symbol.fromJson(JSON.parse(data.list[0].SYMBOL_P));
				if (data.list[0].SYMBOL_L != "")
					m_UserGraphic_LineSymbol = new esri.symbol.fromJson(JSON.parse(data.list[0].SYMBOL_L));
				if (data.list[0].SYMBOL_A != "")
					m_UserGraphic_FillSymbol = new esri.symbol.fromJson(JSON.parse(data.list[0].SYMBOL_A));
				if (data.list[0].SYMBOL_T != "")
					m_UserGraphic_TextSymbol = new esri.symbol.fromJson(JSON.parse(data.list[0].SYMBOL_T));
			}
		},
		error : function (xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete : function (data) {
			m_IsGetSymbolFromDB = true;
			$("#dvUserGraphicsIcon").show();
		}
	});
}

function fnUserGraphicToolbarSet(type) {
	//if (type == "") return;

	if (_navToolbar != undefined)
		_navToolbar.deactivate();
	if (m_UserGraphicToolbar != undefined)
		m_UserGraphicToolbar.deactivate();

	m_MainMap.setMapCursor("url(/images/cur/REQUEST.cur), auto");

	m_UserGraphicToolbar = new esri.toolbars.Draw(m_MainMap, {
			showTooltips : false
		});
	dojo.connect(m_UserGraphicToolbar, "onDrawEnd", addToMap);

	if (type == "text") {
		type = "point";
		m_IsText = true;
	} else {
		m_IsText = false;
	}
	if (type != "") m_UserGraphicToolbar.activate(type);

	m_MainMap.graphics.on("mouse-over", function (evt) {
		// We'll use this "selected" graphic to enable editing tools
		// on this graphic when the user click on one of the tools
		// listed in the menu.
		selected = evt.graphic;

		createGraphicsMenu();
		// Let's bind to the graphic underneath the mouse cursor
		ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
	});

	m_MainMap.graphics.on("mouse-out", function (evt) {
		ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
	});
}

function addToMap(geom) {
	$("img[id^=mapCtrl]").each(function () {
		$(this).attr("toggle", "off");
		$(this).attr("src", $(this).attr("normalSrc"));
	});
	$("#mapCtrl101").attr("src", $("#mapCtrl101").attr("overSrc"));
	$("#mapCtrl101").attr("toggle", "on");

	if (m_IsText) {
		m_UserGraphicClickPt = geom;

		if (m_UserGraphic_TextSymbol == undefined) { //저장 안했으면 기본값으로
			$("#graphic_textContent").val("");
			$("#graphic_textFamily").val("Malgun Gothic");
			$("#graphic_textSize").val(20);
			$("#graphic_textColor").val("#000000");
			$("#graphic_textColor").css("background-color", "#000000");
			$("#graphic_textColor").css("color", "#000000");
			$("#graphic_textAngle").val(0);
		} else {
			$("#graphic_textContent").val(m_UserGraphic_TextSymbol.text);
			$("#graphic_textFamily").val(m_UserGraphic_TextSymbol.font.family);
			$("#graphic_textSize").val(m_UserGraphic_TextSymbol.font.size);
			$("#graphic_textColor").val(m_UserGraphic_TextSymbol.color.toHex());
			$("#graphic_textColor").css("background-color", m_UserGraphic_TextSymbol.color.toHex());
			$("#graphic_textColor").css("color", m_UserGraphic_TextSymbol.color.toHex());
			$("#graphic_textHorizontalAlignment").val(m_UserGraphic_TextSymbol.horizontalAlignment);
			$("#graphic_textVerticalAlignment").val(m_UserGraphic_TextSymbol.verticalAlignment);
			$("#graphic_textAngle").val(m_UserGraphic_TextSymbol.angle);
		}

		$("#chkUserGraphicTextSave").prop("checked", false);
		$("#dvUserGraphicsTextProp").show();
	} else {
		var symbol;
		switch (geom.type) {
		case "point":
		case "multipoint":
			symbol = m_UserGraphic_MarkerSymbol;
			break;
		case "polyline":
			symbol = m_UserGraphic_LineSymbol;
			break;
		case "extent":
		case "polygon":
			symbol = m_UserGraphic_FillSymbol;
			break;
		}
		m_MainMap.graphics.add(new esri.Graphic(geom, symbol));
	}
	m_UserGraphicToolbar.deactivate();

	m_DrawEditToolbar = new esri.toolbars.Edit(m_MainMap);
	m_MainMap.on("click", function (evt) {
		m_DrawEditToolbar.deactivate();
	});
	
	//도형 안의 문자 같이 이동
	m_DrawEditToolbar.on("graphic-move-start", function(res) {
		m_OverTextGraphicIdx = -1;
		if (res.graphic.geometry.type != "polygon") return;
		for ( var i = 0; i < m_MainMap.graphics.graphics.length; i++) {
			var g = m_MainMap.graphics.graphics[i];
			if (g.symbol == undefined) continue;
			if (g.symbol.type != "textsymbol") continue;
			if (res.graphic.geometry.contains(g.geometry)) {
				m_OverTextGraphicIdx = i;
				break;
			}
		}	
	});
	m_DrawEditToolbar.on("graphic-move-stop", function(res) {
		//console.log(res.graphic.geometry.getCentroid().x);
		//console.log(res.graphic.geometry.getCentroid().y);
		if (m_OverTextGraphicIdx == -1) return;
		if (res.transform == null) return;
		var textGeom = m_MainMap.graphics.graphics[m_OverTextGraphicIdx].geometry;
		textGeom.setX(res.graphic.geometry.getCentroid().x);
		textGeom.setY(res.graphic.geometry.getCentroid().y);
		m_MainMap.graphics.graphics[m_OverTextGraphicIdx].setGeometry(textGeom);
	});
}

//도형 컨트롤 메뉴
var ctxMenuForGraphics;
function createGraphicsMenu() {
	// Creates right-click context menu for GRAPHICS
	ctxMenuForGraphics = new dijit.Menu({});
	if (selected.symbol.type != "textsymbol") {
		ctxMenuForGraphics.addChild(new dijit.MenuItem({ //0
				label : "수정",
				onClick : function () {
					if (selected.geometry.type !== "point") {
						m_DrawEditToolbar.activate(esri.toolbars.Edit.EDIT_VERTICES, selected);
					} else {
						alert("Not implemented");
					}
				}
			}));
	}

	ctxMenuForGraphics.addChild(new dijit.MenuItem({ //1
			label : "이동",
			onClick : function () {
				m_DrawEditToolbar.activate(esri.toolbars.Edit.MOVE, selected);
			}
		}));

	ctxMenuForGraphics.addChild(new dijit.MenuItem({ //2
			label : "회전/크기",
			onClick : function () {
				/*if (selected.geometry.type !== "point") {
				m_DrawEditToolbar.activate(esri.toolbars.Edit.ROTATE | esri.toolbars.Edit.SCALE, selected);
				} else {
				alert("Not implemented");
				}*/
				m_DrawEditToolbar.activate(esri.toolbars.Edit.ROTATE | esri.toolbars.Edit.SCALE, selected);
				if (selected.geometry.type == "point") {
					/*$(".esriSymbolEditor").css("left", "60px");
					$(".esriSymbolEditor").css("top", "500px");
					$(".esriFormFieldWidget DIV.top").removeClass("top");*/
				}
			}
		}));

	ctxMenuForGraphics.addChild(new dijit.MenuSeparator()); //3
	if (selected.symbol.type != "textsymbol") {
		ctxMenuForGraphics.addChild(new dijit.MenuItem({ //4
				label : "심볼설정",
				onClick : function () {
					$("#graphic_lineStyle").msDropdown().data("dd"); //{animStyle:'none'} /{animStyle:'slideDown'} {animStyle:'show'}
					$("#graphic_polygonFillStyle").msDropdown().data("dd"); //{animStyle:'none'} /{animStyle:'slideDown'} {animStyle:'show'}

					$("#graphic_pointTransparency_slider").slider({
						range : "max",
						min : 1,
						max : 100,
						value : 100,
						slide : function (event, ui) {
							$("#graphic_pointTransparency").val(ui.value);
						}
					});

					$("#graphic_lineTransparency_slider").slider({
						range : "max",
						min : 1,
						max : 100,
						value : 100,
						slide : function (event, ui) {
							$("#graphic_lineTransparency").val(ui.value);
						}
					});

					$("#graphic_polygonTransparency_slider").slider({
						range : "max",
						min : 1,
						max : 100,
						value : 100,
						slide : function (event, ui) {
							$("#graphic_polygonTransparency").val(ui.value);
						}
					});
					$("#graphic_pointStyleSet").css("display", "none");
					$("#graphic_lineStyleSet").css("display", "none");
					$("#graphic_polygonStyleSet").css("display", "none");

					$("#graphic_" + selected.geometry.type + "StyleSet").css("display", "");
					switch (selected.geometry.type) {
					case "point":
						$("#graphic_lineStyleSet").css("display", "");

						$("#graphic_pointColorPicker").css("color", selected.symbol.color.toCss());
						$("#graphic_pointColorPicker").css("background-color", selected.symbol.color.toCss());
						$("#graphic_pointColorPicker").val(selected.symbol.color.toHex());
						$("#graphic_pointStyle").msDropDown().data("dd").set("value", selected.symbol.style);
						$("#graphic_pointSize").val(selected.symbol.size);
						$("#graphic_pointTransparency").val(selected.symbol.color.a * 100);
						$("#graphic_pointTransparency_slider").slider("option", "value", selected.symbol.color.a * 100);

						$("#graphic_lineColorPicker").css("color", selected.symbol.outline.color.toCss());
						$("#graphic_lineColorPicker").css("background-color", selected.symbol.outline.color.toCss());
						$("#graphic_lineColorPicker").val(selected.symbol.outline.color.toHex());
						$("#graphic_lineStyle").msDropDown().data("dd").set("value", selected.symbol.outline.style);
						$("#graphic_lineWeight").val(selected.symbol.outline.width);
						$("#graphic_lineTransparency").val(selected.symbol.outline.color.a * 100);
						$("#graphic_lineTransparency_slider").slider("option", "value", selected.symbol.outline.color.a * 100);
						break;
					case "polyline":
						$("#graphic_lineColorPicker").css("color", selected.symbol.color.toCss());
						$("#graphic_lineColorPicker").css("background-color", selected.symbol.color.toCss());
						$("#graphic_lineColorPicker").val(selected.symbol.color.toHex());
						$("#graphic_lineStyle").msDropDown().data("dd").set("value", selected.symbol.style);
						$("#graphic_lineWeight").val(selected.symbol.width);
						$("#graphic_lineTransparency").val(selected.symbol.color.a * 100);
						$("#graphic_lineTransparency_slider").slider("option", "value", selected.symbol.color.a * 100);
						break;
					case "polygon":
						$("#graphic_lineStyleSet").css("display", "");

						$("#graphic_lineColorPicker").css("color", selected.symbol.outline.color.toCss());
						$("#graphic_lineColorPicker").css("background-color", selected.symbol.outline.color.toCss());
						$("#graphic_lineColorPicker").val(selected.symbol.outline.color.toHex());
						$("#graphic_lineStyle").msDropDown().data("dd").set("value", selected.symbol.outline.style);
						$("#graphic_lineWeight").val(selected.symbol.outline.width);
						$("#graphic_lineTransparency").val(selected.symbol.outline.color.a * 100);
						$("#graphic_lineTransparency_slider").slider("option", "value", selected.symbol.outline.color.a * 100);

						$("#graphic_polygonFillStyle").msDropDown().data("dd").set("value", selected.symbol.style);
						$("#graphic_polygonColorPicker").css("color", selected.symbol.color.toCss());
						$("#graphic_polygonColorPicker").css("background-color", selected.symbol.color.toCss());
						$("#graphic_polygonColorPicker").val(selected.symbol.color.toHex());
						$("#graphic_polygonTransparency").val(selected.symbol.color.a * 100);
						$("#graphic_polygonTransparency_slider").slider("option", "value", selected.symbol.color.a * 100);
						break;
					}

					m_UserGraphicSelectedGraphic = selected;
					$("#chkUserGraphicSave").prop("checked", false);
					$("#dvUserGraphicsTextProp").hide();
					$("#dvUserGraphicsProp").show();
				}
			}));
	}

	if (selected.symbol.type == "simplefillsymbol") {
		ctxMenuForGraphics.addChild(new dijit.MenuItem({ //5
				label : "글자입력",
				onClick : function () {
					if (m_UserGraphic_TextSymbol == undefined) { //저장 안했으면 기본값으로
						$("#graphic_textContent").val("");
						$("#graphic_textFamily").val("Malgun Gothic");
						$("#graphic_textSize").val(20);
						$("#graphic_textColor").val("#000000");
						$("#graphic_textColor").css("background-color", "#000000");
						$("#graphic_textColor").css("color", "#000000");
						$("#graphic_textAngle").val(0);
					} else {
						$("#graphic_textContent").val(m_UserGraphic_TextSymbol.text);
						$("#graphic_textFamily").val(m_UserGraphic_TextSymbol.font.family);
						$("#graphic_textSize").val(m_UserGraphic_TextSymbol.font.size);
						$("#graphic_textColor").val(m_UserGraphic_TextSymbol.color.toHex());
						$("#graphic_textColor").css("background-color", m_UserGraphic_TextSymbol.color.toHex());
						$("#graphic_textColor").css("color", m_UserGraphic_TextSymbol.color.toHex());
						$("#graphic_textHorizontalAlignment").val(m_UserGraphic_TextSymbol.horizontalAlignment);
						$("#graphic_textVerticalAlignment").val(m_UserGraphic_TextSymbol.verticalAlignment);
						$("#graphic_textAngle").val(m_UserGraphic_TextSymbol.angle);
					}
					/*Vertical alignment is not supported in Internet Explorer versions 7-10*/
					if ($.browser.msie && Number($.browser.version) < 11) {
						$("#li_graphic_textVerticalAlignment").css("display", "none");
					}

					m_UserGraphicSelectedGraphic = selected;
					$("#chkUserGraphicTextSave").prop("checked", false);
					$("#dvUserGraphicsProp").hide();
					$("#dvUserGraphicsTextProp").show();
				}
			}));
		ctxMenuForGraphics.addChild(new dijit.MenuSeparator()); //6
	}

	ctxMenuForGraphics.addChild(new dijit.MenuItem({ //7
			label : "삭제",
			onClick : function () {
				m_MainMap.graphics.remove(selected);
				
				//도형 안의 문자 같이 삭제
				if (selected.geometry.type != "polygon") return;
				for ( var i = 0; i < m_MainMap.graphics.graphics.length; i++) {
					var g = m_MainMap.graphics.graphics[i];
					if (g.symbol == undefined) continue;
					if (g.symbol.type != "textsymbol") continue;
					if (selected.geometry.contains(g.geometry)) {
						m_MainMap.graphics.remove(m_MainMap.graphics.graphics[i]);
						break;
					}
				}	
			}
		}));

	ctxMenuForGraphics.startup();
}

function fnGraphicStyleApply() {
	var pointColorPicker = $("#graphic_pointColorPicker").val();
	var pointStyle = $("#graphic_pointStyle").val();
	var pointSize = $("#graphic_pointSize").val();
	var pointTransparency = $("#graphic_pointTransparency").val();
	var pointColorRgba = hex2rgb(pointColorPicker, pointTransparency);

	var lineColorPicker = $("#graphic_lineColorPicker").val();
	var lineStyle = $("#graphic_lineStyle").val();
	var lineWidth = $("#graphic_lineWeight").val();
	var lineTansparency = $("#graphic_lineTansparency").val();
	var lineColorRgba = hex2rgb(lineColorPicker, lineTansparency);

	var polygonColorPicker = $("#graphic_polygonColorPicker").val();
	var polygonFillStyle = $("#graphic_polygonFillStyle").val();
	var polygonTransparency = $("#graphic_polygonTransparency").val();
	var polygonColorRgba = hex2rgb(polygonColorPicker, polygonTransparency);

	var symbol;
	switch (m_UserGraphicSelectedGraphic.geometry.type) {
	case "point":
		symbol = fnGetMarkerSymbol(pointStyle, pointColorRgba, pointSize, lineStyle, lineColorRgba, lineWidth);
		if ($("#chkUserGraphicSave").prop("checked")) {
			m_UserGraphic_MarkerSymbol = symbol;
			$.post("/etc/etcMapUserGraphicSymbolSave.do", {
				SYMBOL_P : JSON.stringify(symbol.toJson())
			});
		}
		break;
	case "polyline":
		symbol = fnGetPolylineSymbol(lineStyle, lineColorRgba, lineWidth);
		if ($("#chkUserGraphicSave").prop("checked")) {
			m_UserGraphic_LineSymbol = symbol;
			$.post("/etc/etcMapUserGraphicSymbolSave.do", {
				SYMBOL_L : JSON.stringify(symbol.toJson())
			});
		}
		break;
	case "polygon":
		symbol = fnGetPolygonSymbol(polygonFillStyle, polygonColorRgba, lineStyle, lineColorRgba, lineWidth);
		if ($("#chkUserGraphicSave").prop("checked")) {
			m_UserGraphic_FillSymbol = symbol;
			$.post("/etc/etcMapUserGraphicSymbolSave.do", {
				SYMBOL_A : JSON.stringify(symbol.toJson())
			});
		}
		break;
	}
	m_UserGraphicSelectedGraphic.setSymbol(symbol);
	$("#dvUserGraphicsProp").hide();
}
function fnGraphicTextApply() {
	var textSymbol = fnGetTextSymbol($("#graphic_textSize").val(), "normal", hex2rgb($("#graphic_textColor").val(), 100),
			"middle", 0, 0, $("#graphic_textAngle").val(), $("#graphic_textFamily").val(), $("#graphic_textContent").val(),
			$("#graphic_textHorizontalAlignment").val(), "");
	/*Vertical alignment is not supported in Internet Explorer versions 7-10*/
	if ($.browser.msie && Number($.browser.version) < 11) {
		//textSymbol.setOffset(0, -10);
	} else {
		textSymbol.setVerticalAlignment($("#graphic_textVerticalAlignment").val());
	}

	if (m_IsText) {
		m_MainMap.graphics.add(new esri.Graphic(m_UserGraphicClickPt, textSymbol));
		m_IsText = false;
	} else {
		geometryService.labelPoints([m_UserGraphicSelectedGraphic.geometry], function (labelPoints) {
			dojo.forEach(labelPoints, function (labelPoint) {
				m_MainMap.graphics.add(new esri.Graphic(labelPoint, textSymbol));
			});
		});
	}
	if ($("#chkUserGraphicTextSave").prop("checked")) {
		m_UserGraphic_TextSymbol = textSymbol;
		$.post("/etc/etcMapUserGraphicSymbolSave.do", {
			SYMBOL_T : JSON.stringify(textSymbol.toJson())
		});
	}
	$("#dvUserGraphicsTextProp").hide();
}

function fnUserGraphicSaveToFile() {
	if (m_MainMap._layers.map_graphics.graphics.length == 0) {
		alert("한 개 이상의 도형을 그린 후 저장하시기 바랍니다.");
		return;
	}
	fnDivShow("dvUserGraphicsSave", false, true);
}

//그래픽 파일 열기
//Only IE10+ support
function fnFileOpenUserGraphics(event) {
	if (m_MainMap._layers.map_graphics.graphics.length > 1)
		m_MainMap._layers.map_graphics.clear();
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function () {
		var jsonDatas = reader.result;
		$.each(jsonDatas.split("|"), function (i, data) {
			m_MainMap._layers.map_graphics.add(new esri.Graphic(JSON.parse(data)));
		});
	};
	reader.readAsText(input.files[0]);
}
//This Applied
$(document).ready(function () {
	new AjaxUpload($("#mapCtrl115"), {
		action : "/etc/etcMapUserGraphicsLoad.do", //파일 업로드 처리 페이지 설정
		name : "graphic.graphic", //post방식으로 보낼 name 명 지정
		data : {},
		onComplete : function (file, response) { //파일 업로드 성공하였을 때 수행될 함수
			if (m_MainMap._layers.map_graphics.graphics.length > 1)
				m_MainMap._layers.map_graphics.clear();
			// 크롬, FF에서 반환되는 데이터(String)에는 pre 태그가 쌓여있으므로
			// 정규식으로 태그 제거. IE의 경우 정상적으로 값이 반환된다.
			var jsonDatas = response.replace(/[<][^>]*[>]/gi, '');
			$.each(jsonDatas.split("|"), function (i, data) {
				m_MainMap._layers.map_graphics.add(new esri.Graphic(JSON.parse(data)));
			});

			return false;
		},
		onSubmit : function (file, ext) { //파일 업로드 submit 전에 수행될 함수
			//if(!(ext && /^(jpg|png|jpeg|gif|tiff)$/i.test(ext))) {
			if (!(ext && /^(graphic)$/i.test(ext))) {
				alert("확장자가 graphic인 파일을 선택하여 주시기 바랍니다.");
				return false;
			}
		}
	});
});

function fnFileSaveUserGraphics() {
	if ($("#draw_name").val() == "") {
		alert("파일명을 입력하시기 바랍니다.");
		return;
	}
	var saveJsons = [];
	var graphics = m_MainMap._layers.map_graphics.graphics;
	$.each(graphics, function (i, data) {
		if (!data.visible)
			return true; //continue;
		saveJsons.push(JSON.stringify(data.toJson()));
	});

	//Reference FileSaver.min.js
	//Only IE10+ support
	/*var blob = new Blob([saveJsons.join("|")], {
	type : "text/plain;charset=utf-8"
	});
	saveAs(blob, $("#draw_name").val() + ".graphic");*/

	var url = "/etc/etcMapUserGraphicsSave.do";
	var content = saveJsons.join("|");
	var fileName = $("#draw_name").val();
	var fileExt = "graphic";

	var $iframe,
	iframe_doc,
	iframe_html;
	if (($iframe = $('#download_iframe')).length === 0) {
		$iframe = $("<iframe id='download_iframe' style='display: none' src='about:blank'></iframe>").appendTo("body");
	}

	iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
	if (iframe_doc.document) {
		iframe_doc = iframe_doc.document;
	}

	iframe_html = "<html><head></head><body><form method='POST' action='" + url + "'>" +
		"<input type=hidden name='content' value='" + content + "'/>" +
		"<input type=hidden name='fileName' value='" + fileName + "'/>" +
		"<input type=hidden name='fileExt' value='" + fileExt + "'/>" +
		"</form></body></html>";
	iframe_doc.open();
	iframe_doc.write(iframe_html);
	$(iframe_doc).find('form').submit();
}

function fnUserGraphicClear() {
	m_MainMap.graphics.clear();
}
