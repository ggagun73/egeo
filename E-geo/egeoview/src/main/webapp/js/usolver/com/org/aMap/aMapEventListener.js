function fnIndexMapEventListener() {
	//기본 인덱스맵일때 사용
	indexMap.on("load", function (res) {
		indexMap.disablePan();
		indexMap.disableDoubleClickZoom();
		indexMap.disableClickRecenter();
		indexMap.disableKeyboardNavigation();
		indexMap.disableScrollWheelZoom();
		indexMap.disableRubberBandZoom();

		var indexDragTool = new esri.toolbars.Draw(indexMap, {
				"showTooltips" : false
			});

		indexDragTool.on("draw-end", indexDragCallback);
		indexDragTool.activate(esri.toolbars.Draw.RECTANGLE);

		function indexDragCallback(res) {
			var extent = new esri.geometry.Extent(res.geometry._extent.xmin, res.geometry._extent.ymin, res.geometry._extent.xmax,
					res.geometry._extent.ymax, new esri.SpatialReference({
						wkid : _wkid
					}));
			m_MainMap.setExtent(extent);
		}
	});
	indexMap.on("mouse-wheel", function (res) {
		indexMapMoveYn = true;
		mainMapMoveYn = false;

	});
	indexMap.on("mouse-down", function (res) {
		indexMapMoveYn = true;
		mainMapMoveYn = false;
	});
}

//var m_UserGraphicFontSize = [];
function fnMainMapEventListener() {
	dojo.connect(basemap, "onUpdateStart", function() {
		showLoadingMap(); //로딩바 보이기
		
		//화살표 표시
		fnDispArrow();
		
		/*if ($("#map_graphics_layer").find("text").length != m_UserGraphicFontSize.length) {
			m_UserGraphicFontSize = [];
			$("#map_graphics_layer").find("text").each(function() {
				m_UserGraphicFontSize.push(Number($(this).attr("font-size")));
			});	
		}*/
	});
	dojo.connect(basemap, "onUpdateEnd", function() {
		hideLoadingMap(); //로딩바 숨기기
		
		/*$("#map_graphics_layer").find("text").each(function(i, data) {
			$(this).attr("font-size", 1 / m_MainMap.getScale() * m_UserGraphicFontSize[i]);
		});*/
	});

	m_MainMap.on("mouse-wheel", function (res) {
		indexMapMoveYn = false;
		mainMapMoveYn = true;
	});

	m_MainMap.on("mouse-down", function (res) {
		indexMapMoveYn = false;
		mainMapMoveYn = true;
	});
	m_MainMap.on("mouse-move", function (res) {
		var mapPt = res.mapPoint;
		var curCoordX = formatLocalizedDecimal(mapPt.x, 4);
		var curCoordY = formatLocalizedDecimal(mapPt.y, 4);

		$("#coord").text("X:" + curCoordX + " Y:" + curCoordY);
	});

	//축척변경 이벤트 - 축척View 변경/인덱스맵 변경/분할지도 변경
	m_MainMap.on("extent-change", function (res) {
		//축척View변경
		$("#txt_Scale").val(parseInt(m_MainMap.getScale()));

		if (indexMap.graphics == null)
			return;
		indexMap.graphics.clear();

		var xmax = m_MainMap.extent.xmax;
		var xmin = m_MainMap.extent.xmin;
		var ymax = m_MainMap.extent.ymax;
		var ymin = m_MainMap.extent.ymin;
		var extPolygon = new esri.geometry.Polygon([
					[xmin, ymin],
					[xmax, ymin],
					[xmax, ymax],
					[xmin, ymax],
					[xmin, ymin]]);
		var indexGraphic = new esri.Graphic(extPolygon, new esri.symbol.SimpleFillSymbol(
					esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 0, 0, 0])));
		indexMap.graphics.add(indexGraphic);
	});

	//범례 생성
	m_MainMap.on("layers-add-result", function (evt) {
		$("#mapCtrl1").click();

		esri.request({
			url : urlBasemap + "/layers",
			content : {
				f : "json"
			},
			handleAs : "json"
		}).then(function (res) {
			m_LayersInfo = res; //published map with noscale

			esri.request({
				url : urlBasemap_scale + "/layers",
				content : {
					f : "json"
				},
				handleAs : "json"
			}).then(function (res) {
				m_LayersInfo_scale = res; //published map with scale

				//drawing legend with user_config
				$.ajax({
					type : "post",
					dataType : "json",
					data : {
						USER_ID : $("#USER_ID").val(),
						SYS_ID : $("#SYS_ID").val()
					},
					url : "/etc/etcMapUserConfigList.do",
					success : function (data) {
						if (data.list.length > 0) {
							m_IsSavedMap = true;
							m_UserConfigExtent = data.list[0].EXTENT;
							m_UserConfigLayers = data.list[0].LAYERS;
							m_UserConfigVisibles = data.list[0].VISIBLES;
						}
					},
					error : function (xhr, status, error) {
						alert(status);
						alert(error);
					},
					complete : function (data) {
						if (m_IsSavedMap)
							m_MainMap.setExtent(new esri.geometry.fromJson(JSON.parse(m_UserConfigExtent)));
						// In aMapToc.js
						fnSetTocList();
					}
				});
			}, function (error) {
				alert("failed get m_LayersInfo_scale\ncause :" + error);
			});
		}, function (error) {
			alert("failed get m_LayersInfo\ncause :" + error);
		});
	});
}

function fnDispArrow() {	
	m_ArrowGraphicLayer.clear();
	if (m_ArrowDispLayerIds.length == 0) return;
	if (m_MainMap.getScale() > 3000) return;
	
	var arrow = function (pt1, pt2, color) {
		return new fnGetTextSymbol(10, "normal", color, "middle", 0, 0, setAngle(pt1, pt2), "Lucida Grande Console", "▲", "", "middle");
	};

	var setAngle = function (p1, p2) {
		var rise = p2[1] - p1[1];
		var run = p2[0] - p1[0];
		var angle = ((180 / Math.PI) * Math.atan2(run, rise));
		//return 360 - angle;
		return angle;
	};

	//현재 맵 영역을 계산하여 화살표 표출
	var identifyTask = new esri.tasks.IdentifyTask(urlBasemap);
	var identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.tolerance = 0;
	identifyParams.returnGeometry = true;
	identifyParams.layerIds = m_ArrowDispLayerIds;
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
	identifyParams.geometry = m_MainMap.extent;
	identifyParams.mapExtent = m_MainMap.extent;
	identifyTask.execute(identifyParams, function (res) {
		for (var i = 0; i < res.length; i++) {
			var pt1 = res[i].feature.geometry.paths[0][res[i].feature.geometry.paths[0].length - 2];
			var pt2 = res[i].feature.geometry.paths[0][res[i].feature.geometry.paths[0].length - 1];
			var point = new esri.geometry.Point(pt2);
			var color;
			if (m_LayerDrawingOptions[res[i].layerId]) {
				var renderer = m_LayerDrawingOptions[res[i].layerId].renderer;
				if (renderer.type == "simple") {
					color = renderer.symbol.color;
				} else if (renderer.type == "uniqueValue") {
					var domainFieldName = renderer.attributeField;
					var domainFieldAlias = "";
					var fields = m_LayersInfo.layers[res[i].layerId].fields;
					for ( var j = 0; j < fields.length; j++) {
						if (fields[j].name == domainFieldName) {
							domainFieldAlias = fields[j].alias;
							break;
						}
					}
					var infos = renderer.infos;
					for ( var k = 0; k < infos.length; k++) { // 행정읍/면/동
						if (infos[k].label == eval("res[i].feature.attributes['" + domainFieldAlias + "']")) {
							color = infos[k].symbol.color;
							break;
						}
					}
				}
			} else { //심볼 저장 방식으로 되면, 이 부분은 안 탈듯...
				var renderer = m_LayersInfo.layers[2].drawingInfo.renderer;
				if (renderer.type == "simple") {
					color = renderer.symbol.color;
				} else if (renderer.type == "uniqueValue") {
					var domainFieldName = renderer.field1;
					var domainFieldAlias = "";
					var fields = m_LayersInfo.layers[res[i].layerId].fields;
					for ( var j = 0; j < fields.length; j++) {
						if (fields[j].name == domainFieldName) {
							domainFieldAlias = fields[j].alias;
							break;
						}
					}
					var infos = renderer.uniqueValueInfos;
					for ( var k = 0; k < infos.length; k++) {
						if (infos[k].label == eval("res[i].feature.attributes." + domainFieldAlias)) {
							color = infos[k].symbol.color;
							break;
						}
					}
				}
			}
			m_ArrowGraphicLayer.add(new esri.Graphic(point, arrow(pt1, pt2, color)));
		}
	});
}