//ArcGIS Server IP
var serverIp = "http://203.236.216.54:6080";
//var serverIp = "http://105.5.1.114:6080";

//Print LayputFolder
var m_LayoutFolder = "E:\\map_service\\Desktop\\bcuisgp\\layout\\";
//var m_LayoutFolder = "E:\\bcuisgp\\layout\\";

var slopeSecMap;
var indexMap;
var indexExtent;
var indexMapFullExtentYn = false;
var indexMapMoveYn = false;//인텍스맵 이동 여부
var mainMapMoveYn = false;//기본맵 이동 여부
var bookmarks;
var initExtent;
var centerPoint;
var navToolbar;
var measureTool;
var measureViewPt;
var textDrawTool;
var textSymbolGeometry;
var drawTool;
var editTool;
var SWITCH_graphicsEdit = false;    
var toolbar;//툴바
var graphic;    
var centerPoint;
var geometryService;
var MapLtScale;//위치이동 축척

//신규 변수 생성
var overviewMap; //인덱스맵
var _btnType    = {SELECT:0, ZOOMIN:1, ZOOMOUT:2, ZOOMRECT:3, PAN:4, PREVMAP:5, NEXTMAP:6, FULLEXTENT:7, INFO:8, MEASURE:9, INDEXMAP:10, QUERY:99 , INPUTTEXT:100, DRAWOBJECT:101, SAVEIMAGE:102}   // 버튼 유형
var _drawType   = {POINT:"point", MULTIPOINT:"multipoint", LINE:"line", POLYLINE:"polyline", LINESTRING:"linestring", POLYGON:"polygon", EXTENT:"extent", FREEHANDPOLYLINE:"freehandpolyline",FREEHANDPOLYGON:"freehandpolygon"};
var _btnAction  = _btnType.SELECT;
var _drawAction = _drawType.POINT; 

   
var _wkid       = "102082"; //spatialReference정의(102082)(5186)
var _initExtent = {xmin:168654.28322115057, ymin:538814.3026086797, xmax:195392.0700300575, ymax:551057.1270943286};     // 맵 로딩 후 범위
var _mapExtent  = {xmin:0, ymin:0, xmax:0, ymax:0};     // 맵 변경 후 범위 
var _centerPoint= {x:0, y:0};                           // 맵 센터 좌표
var _screenPoint= {x:0, y:0};                           // 맵 스크린 좌표

//공간편집대상 레이어 / 공간타입
var editLayer;
var editLayerType;   

var bookmark; 
var storageName = 'esrijsapi_mapmarks';
var useLocalStorage = supports_local_storage();
var identifyOffCheck = false; 

var saveImageDialogBox;     //지도이미지저장 DialogBox
var basemap = "";//기본지도
var tifmap  = "";//항공지도
var textInputDialogBox;     //글자입력 DialogBox
var inputTextPoint;         //글자입력 지점
var baseIndexMap500;

var graphicSearch; //정보조회
var bufferGcSearch; //영역검색

var _searchTable;
var identifyOptionCheck = true;//정보조회 창 제어
var bufferSearchOptionCheck= true;//영역 검색 창 제어
var featureSetTmp;
var buldLayer;
var modifyFeatureAttr;
var modifyStatus;
var modifyTool;
var deleteFeatureIds;

var dpi = 96;
var globaljobid = "";
//범례정보 저장
var resStore;
var idStr;		
var geometryType;
var featureLayer;
var fLayerInfo;
var layerNameStr;//레이어 이름
var lineLayer;//라인 저장
var pointLayer;//포인트 저장
var polygonLayer;//폴리곤 저장
var sendCount = 1;//도형저장시
var drawStyle_length = 0;//도형저장시 마지막 카운트   
var objectid;
var graphicsNum = 1;//도형저장시
var labels;//스타일 변경 라벨레이어   
var featureLayerList;//지도 스타일 저장정보 세팅   
var areaTotalLength =0;//면적 총길이   
var topographToolbar;//지형단면도 toolbar세팅   
var identifyTask; //지형단면도 쿼리 
var identifyParams;//지형단면도 쿼리파라미터
var topoStartPoint;//지형 단면도 시작 포인트
var crossSectionToolbar;//횡단면도 시작 포인트   
var arrDataTopo = [];//지형단면도 결과값
var arrDataTopoEle = [];//지형단면도 최고높이값   
var arrRoadData = [];//횡단면도 도로,차로 값저장
var arrRoadLen = [];//횡단면도 도로,차로 위치 및 길이값저장   
var goemSet = [];//횡단면도 intersect   
var csLine = [];//횡단면도 검색 라인
var wwSet = [];//횡단면도 geometry검색 상수도
var swSet = [];//횡단면도 geometry검색 하수도
var wwSetData = [];//횡단면도 속성검색 상수도
var swSetData = [];//횡단면도 속성검색 하수도   
var wwSetDataLen = [];//횡단면도 속성검색 상수도
var swSetDataLen = [];//횡단면도 속성검색 하수도    
var crossStartPoint;
var crossEndPoint;   
var cross_totalLength = 0;//횡단면도 검색선 전체길이   
var wCGeometery;      
var waterworksPipeSet;//차단제수변 상수관로 정보   
var waterPipeSet;//급수관 정보
var waterPipeMeterSet = [];//계량기정보
var waPipeCloseStartSet;//제수밸브 시작점
var waPipeCloseEndSet;//제수밸브 종점   
var taskSearchField = "";//차단제수변 findtask 필드변수   
var waPipeCloseStartTaskSet = [];//제수밸브 시작점 taskquery 결과
var waPipeCloseEndTaskSet = [];//제수밸브 종점 taskquery 결과
var waterPipeTaskSet = [];//급수관로 taskquery 결과   
var mapLayerSfs;//지도 레이어 설정 선,채이기 속성   
var labelClass;//지도주석 설정 라벨 속성   
var indexDragTool;//인덱스맵 Draw
var indexNavToolbar;//인덱스맵 NavToolbar   
var identifyGeometry;   
var legendDijit;   
var setStyleCheck = true;//도형,지도스타일은 최소 한번만
var lyrCheckList = [];//레이어관리 체크리스트 저장   
var sublyrCheckList = [];//서브레이어관리 체크리스트 저장
var dndSource;
var myLyrCheckList = [];   
var myLyrDelCheck = false;//레이어관리에서 삭제시 플러그
var mylayerOrder = [];   
var initCheck = true;//getLayerList에서 초기 세팅 한번만 하기 위한값   
var infos = {};     
var confirmCheck = false;//레이이관리에서 확인 버튼 클릭하여 사용여부 판단   
var confirmLayerList = "";//레이어 관리에서 확인 버튼 클릭후 나의 레이어 목록 저장
var visibleLayer_backup =[];   
var waPipeKind;//차단제수변 위치이동시 종류 변수

//Map 객체
var m_MainMap;


//그래픽레이어
var m_MeasureGraphicLayer;          //거리재기 그래픽 레이어
var m_FeatureSearchGraphicLayer;    //객체 이동 그래픽 레이어
var m_ArrowGraphicLayer;    		//화살표표시 그래픽 레이어
var _scrmdGraphicLayer;             //버퍼 검색 레이어
var _sclmdGraphicLayer;             //좌측 검색후 위치이동
var _waterGraphicLayer;

//툴바
var _navToolbar;   // navigation toolbar
var m_MeasureToolbar;  //측정 툴
var _identifyToolbar;  // draw toolbar
var editDrawTool; //웹편집


var m_IsMoveExtent = true; //객체 선택 시 지도영역 이동여부

//TOC
var m_IsSavedMap = false;
var m_UserConfigExtent; //USV_USER_CONFIG.EXTENT
var m_UserConfigLayers; //USV_USER_CONFIG.LAYERS
var m_UserConfigVisibles; //USV_USER_CONFIG.VISIBLES
var m_DefaultViewLayer = ["건물","도로면","편집지적","법정읍/면/동","구경계","행정구역경계"];
var m_VisibleLayers = []; //지도에 보여지는 레이어목록
var m_TocLayers = [];     //TOC에 보여지는 레이어목록
var m_LayersInfo;			
var m_LayersInfo_scale;
var m_DynamicLayerInfos;
var m_SelectedLayerID;			//TOC에서 선택한 레이어
var m_LayerDrawingOptions = [];	

//하이라이팅 색상
var m_Color;
var m_MarkerSymbol;
var m_LineSymbol;
var m_FillSymbol;

//사용자그래픽 색상
var m_UserGraphic_Color;
var m_UserGraphic_OutlineColor;
//사용자그래픽 심볼 저장용
var m_UserGraphic_LineSymbol;
var m_UserGraphic_MarkerSymbol;
var m_UserGraphic_FillSymbol;
var m_UserGraphic_TextSymbol;



var visibleListForSetting = [];		//레이어 관리 Popup에서 지도에 적용하기 전 설정된 레이어 리스트 담는 array
var d_layerInfos = [];
var layerLabelInfos = [];
var layerFields = [];
var label_selectedField;			//해당 레이어의 라벨로 설정된 필드

var identifyListToolbar;//정보조회(목록)
var layerName_idn;//정보조회 layerName 저장
var compListSize;//정보조회 대장 영문명 조회 건수
var prog_id;//정보조회 대장 영문명     

var component_w;//대장 팝업 가로 사이즈
var component_h;//대장 팝업 세로 사이즈
var lmrCancelCheck = true;//레이어 관리창에서 취소 버튼클릭시 체크

var attributeFieldStr;//지도 레이어 스타일설정 uniqueValue 필드값 저장

var layerInfoTemp = [];//레이어 스타일 변경시 uniqueValue의 심볼 저장

var uniqueValueInfosTemp;
var rendererSetStyle = [];//레이어 스타일 각 범례 레이어 스타일 저장

var mylayerOrderDelTmp = [];//레이어관리 현재 체크한 레이어 목록만 가진 배열


var finalLocationCheck = true;
var lyrIdTmp = ""; //레이어 관리 중복 체크 방지
var user_name = '';
	
   
//지도 서비스용 변수 
var urlBasemap = serverIp+"/arcgis/rest/services/bcuis_main_noscale/MapServer";  // 축척없이 발행된 서비스
var urlBasemap_scale = serverIp+"/arcgis/rest/services/bcuis_main/MapServer"; //축척 있게 발행된 서비스
var urlGeometry = serverIp+"/arcgis/rest/services/Utilities/Geometry/GeometryServer"; 
var urlBaseFeatureMap = serverIp+"/arcgis/rest/services/bcuis_main_noscale/FeatureServer";   
var urlTifmap = serverIp+"/arcgis/rest/services/BCUIS_AERO2013_FGDB/ImageServer";   
var urlBuldLayer = serverIp+"/arcgis/rest/services/bcuis_main_noscale/FeatureServer/158";
var urlIndexMap = serverIp+"/arcgis/rest/services/bcuis_index/MapServer";
var urlPrinting = serverIp+"/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";    
var urlGPPrinting = serverIp+"/arcgis/rest/services/SaveToPDF3/GPServer/SaveToPDF2";    
/*도형 저장용 서비스*/   
var urlLineLayer = serverIp+"/arcgis/rest/services/bcuis_graphics/FeatureServer/0";//라인
var urlPointLayer = serverIp+"/arcgis/rest/services/bcuis_graphics/FeatureServer/1";//포인트
var urlPolygonLayer = serverIp+"/arcgis/rest/services/bcuis_graphics/FeatureServer/2";//폴리곤 

/*FeatureLayer url 추가*/
var urlFeatureLayer = serverIp+"/arcgis/rest/services/bcuis_main_noscale/FeatureServer"; 
//고급인쇄
var printToolUrl = serverIp + "/arcgis/rest/services/SaveToPDF/GPServer/SaveToPDF";

