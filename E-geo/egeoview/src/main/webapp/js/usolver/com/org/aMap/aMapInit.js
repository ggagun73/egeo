require([
		"dijit/registry",
		"dijit/Dialog",
		"dijit/Menu",
		"dijit/MenuItem",
		"dijit/MenuSeparator",
		"dijit/dijit",
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
		"dijit/form/Button",
		"dijit/form/ComboBox",
		"dijit/form/NumberTextBox",
		"dijit/form/CheckBox",
		"dojo/dom",
		"dojo/on",
		"dojo/_base/array",
		"dojo/data/ItemFileReadStore",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/query",
		"dojo/parser",
		"dojo/dnd/Source",
		"dojo/domReady!",
		"esri/dijit/Print",
		"esri/dijit/HomeButton",
		"esri/dijit/Bookmarks",
		"esri/dijit/ColorPicker",
		"esri/dijit/ClassedColorSlider",
		"esri/map",
		"esri/geometry/Circle",
		"esri/tasks/PrintTask",
		"esri/tasks/BufferParameters",
		"esri/tasks/IdentifyTask",
		"esri/tasks/IdentifyParameters",
		"esri/tasks/gp",
		"esri/layers/LabelLayer",
		"esri/layers/FeatureLayer",
		"esri/layers/GraphicsLayer",
		"esri/layers/LabelClass",
		"esri/tasks/FindTask",
		"esri/tasks/FindParameters",
		"esri/InfoTemplate",
		"esri/tasks/PrintTemplate",
		"esri/toolbars/navigation",
		"esri/geometry/webMercatorUtils",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/dijit/OverviewMap",
		"esri/dijit/Measurement",
		"esri/config",
		"esri/units",
		"esri/dijit/Legend",
		"esri/toolbars/draw",
		"esri/tasks/AreasAndLengthsParameters",
		"esri/symbols/SimpleFillSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/TextSymbol",
		"esri/symbols/CartographicLineSymbol",
		"esri/graphic",
		"esri/tasks/GeometryService",
		"esri/tasks/LengthsParameters",
		"esri/Color",
		"esri/geometry/Polygon",
		"esri/geometry/Point",
		"esri/InfoTemplate",
		"esri/symbols/Font",
		"esri/toolbars/edit",
		"esri/renderers/ClassBreaksRenderer",
		"esri/request"],
	function () {
	dojo.parser.parse();

	initExtent = new esri.geometry.Extent({
			"xmin" : 168654.28322115057,
			"ymin" : 538814.3026086797,
			"xmax" : 195392.0700300575,
			"ymax" : 551057.1270943286,
			"spatialReference" : {
				"wkid" : _wkid
			}
		});
	centerPoint = initExtent.getCenter();
	esri.config.defaults.io.proxyUrl = "/proxy.jsp";
	esri.config.defaults.io.alwaysUseProxy = false;
	esri.config.defaults.geometryService = new esri.tasks.GeometryService(urlGeometry);
	  
	m_MainMap = new esri.Map("map", {
			extent : initExtent,
			logo : false,
			slider : false,
			sliderStyle : "large",
			sliderPosition : "top-right"
		});
	
	basemap = new esri.layers.ArcGISDynamicMapServiceLayer(urlBasemap, {
			id : "basemapLayer"
		});
	tifmap = new esri.layers.ArcGISImageServiceLayer(urlTifmap, {
			opacity : 1,
			id : "tifmapLayer",
			visible : false
		});

	m_MainMap.addLayer(tifmap);
	m_MainMap.addLayers([basemap]);
	basemap.setDisableClientCaching(true);
	basemap.setImageFormat("png32");
	
	m_MeasureGraphicLayer = new esri.layers.GraphicsLayer();
	m_FeatureSearchGraphicLayer = new esri.layers.GraphicsLayer();
	m_ArrowGraphicLayer = new esri.layers.GraphicsLayer();
	_scrmdGraphicLayer = new esri.layers.GraphicsLayer();
	_sclmdGraphicLayer = new esri.layers.GraphicsLayer();
	_waterGraphicLayer = new esri.layers.GraphicsLayer();

	m_MainMap.addLayer(m_MeasureGraphicLayer);
	m_MainMap.addLayer(m_FeatureSearchGraphicLayer);
	m_MainMap.addLayer(m_ArrowGraphicLayer);
	m_MainMap.addLayer(_scrmdGraphicLayer);
	m_MainMap.addLayer(_sclmdGraphicLayer);
	m_MainMap.addLayer(_waterGraphicLayer);
	
	geometryService = new esri.tasks.GeometryService(urlGeometry);
	geometryService.on("areas-and-lengths-complete", fnAreasAndLengthsComplete);

	indexMapSet();

	dndSource = new dojo.dnd.Source("myLayerList");

	firstStatus(); //최초 축척 및 x,y좌표는 중심점을 기준으로 한번세팅
	_navToolbar = new esri.toolbars.Navigation(m_MainMap); // set navigation toolbar
	m_MeasureToolbar = new esri.toolbars.Draw(m_MainMap, {
			showTooltips : false
		}); // set Measure toolbar
	dojo.connect(m_MeasureToolbar, "onDrawEnd", fnMeasureEventHandler); // Measure Toolbar Event

	mapCtrlHandler(); //지도 조작 등록

	//북마크 시작
	//dojo.connect(dojo.byId('clear-storage'), 'onclick', clearBookmarks);

	// Create the bookmark widget
	// specify "editable" as true to enable editing
	bookmark = new esri.dijit.Bookmarks({
			map : m_MainMap,
			bookmarks : [],
			editable : true
		}, dojo.byId('bookmarks'));

	// Save new bookmarks in local storage, fall back to a cookie
	// If a cookie is used, it expires after a week
	dojo.connect(bookmark, 'onEdit', refreshBookmarks);
	dojo.connect(bookmark, 'onRemove', refreshBookmarks);

	// Look for stored bookmarks
	if (useLocalStorage) {
		var bmJSON = window.localStorage.getItem(storageName);
	} else {
		var bmJSON = dojo.cookie(storageName);
	}

	// Load bookmarks
	// Fall back to a single bookmark if no cookie
	if (bmJSON && bmJSON != 'null' && bmJSON.length > 4) {
		//console.log('cookie: ', bmJSON, bmJSON.length);
		var bmarks = dojo.fromJson(bmJSON);
		dojo.forEach(bmarks, function (b) {
			bookmark.addBookmark(b);
		});
	} else {
		//console.log('no stored bookmarks...');
		var bookmarkPA = {
			"extent" : {
				"spatialReference" : {
					"wkid" : _wkid
				},
				"xmin" : 171017.5322920705,
				"ymin" : 541092.521162741,
				"xmax" : 192525.47397063574,
				"ymax" : 549045.0073864538
			},
			"name" : "부천시"
		};
		bookmark.addBookmark(bookmarkPA);
	}

	//이벤트 등록
	fnIndexMapEventListener();
	fnMainMapEventListener();

	//하이라이팅 색상
	m_Color = new dojo.Color([255, 0, 0, 0.5]); //red
	//m_OutlineColor = new dojo.Color([0, 0, 0, 1]); //black
	m_OutlineColor = new dojo.Color([0, 255, 252, 0.5]); //aqua
	m_LineSymbol = esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, m_OutlineColor, 3);
	m_MarkerSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 8, m_LineSymbol, m_Color);
	m_FillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, m_LineSymbol, m_Color);

	//사용자그래픽 색상
	m_UserGraphic_Color = new dojo.Color([255, 255, 0, 0.25]);
	m_UserGraphic_MarkerStyle = esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE;
	m_UserGraphic_MarkerSize = 10;
	m_UserGraphic_OutlineColor = new dojo.Color([255, 0, 0, 1]);
	m_UserGraphic_OutlineWidth = 2;
	m_UserGraphic_OutLineStyle = esri.symbol.SimpleLineSymbol.STYLE_SOLID;
	m_UserGraphic_FillStyle = esri.symbol.SimpleLineSymbol.STYLE_SOLID;

	m_UserGraphic_LineSymbol = new esri.symbol.SimpleLineSymbol(m_UserGraphic_OutLineStyle, m_UserGraphic_OutlineColor, m_UserGraphic_OutlineWidth);
	m_UserGraphic_MarkerSymbol = new esri.symbol.SimpleMarkerSymbol(m_UserGraphic_MarkerStyle, m_UserGraphic_MarkerSize, m_UserGraphic_LineSymbol, m_UserGraphic_Color);
	m_UserGraphic_FillSymbol = new esri.symbol.SimpleFillSymbol(m_UserGraphic_FillStyle, m_UserGraphic_LineSymbol, m_UserGraphic_Color);
});
