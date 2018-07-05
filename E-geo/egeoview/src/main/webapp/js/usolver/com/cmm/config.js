/**
 * 시스템 환경 설정 

 * @namespace {Object} USV.CONFIG 
 */
	
USV.CONFIG = (function(_mod_config, $, undefined){
	
	/**
	* 프록시 서비스 URL(POST) 
	* @memberof USV.CONFIG
	* @member {String} sPostProxyUrl
	*/ 
	var sPostProxyUrl 		= "/gmap/proxyPost.do?";

	/**
	* 프로시 서비스 URL(GET) 
	* @memberof USV.CONFIG
	* @member {String} sPostProxyUrl
	*/ 
	var sGetProxyUrl 		= "/gmap/proxyGet.do?";

	/**
	* GIS엔진타입 GIS ENGINE TYPE
	* @memberof USV.CONFIG
	* @member {String} sGisEngineType
	*/
	//var sGisEngineType 		= "GeoGate";
	var sGisEngineType 		= "GeoServer";
	
	//ggash 20170124 for geoserver
	var oGisEngineInfo = {
		"GeoGate" : {
			"prefix" 			: "usolver3", //datathouse name
			"serviceUrl" 		: "http://192.168.0.201:8080/G2DataService/GService?",
			"wfsServiceUrl" 	: "http://192.168.0.201:8080/G2DataService/GService?",
			"geometryField" 	: "G2_SPATIAL",
			"featureIdField" 	: "FID"
		},
		"GeoServer" : {
			"prefix" 			: "egeo",
			"serviceUrl" 		: "http://1.221.39.245:18181/geoserver/egeo/ows?",            // "http://192.168.0.201:8181/geoserver/egeo/ows?", 2017-10-18 CJH       -------"http://192.168.0.201:8282/geoserver/Oracle/wms?"
			"wfsServiceUrl" 	: "http://1.221.39.245:18181/geoserver/egeo/wfs?",
			"geometryField" 	: "geom", // (설정에 따라...geom 일수도..)
			"featureIdField" 	: "fid"
		}	
	};
	/**
	* 지도서비스 URL - ALL
	* @memberof USV.CONFIG
	* @member {String} sServiceUrl
	*/ 
	//var sServiceUrl 		= "http://203.236.216.183:8989/G2DataService/GService?";
	//var sServiceUrl 		= "http://192.168.0.201:8080/G2DataService/GService?";
	//var sServiceUrl 		= "http://192.168.0.201:8181/geoserver/usolver/ows?";
	
	/**
	* 지도서비스 URL - WFS 전용 (GeoServer의 경우 별도 서비스URL필요)
	* @memberof USV.CONFIG
	* @member {String} sWFSServiceUrl
	*/ 
	//var sWFSServiceUrl 		= "http://192.168.0.201:8181/geoserver/usolver/wfs?";

	/**
	* 공간서버, DataHouse(=> wfs prefix로 사용될) 이름 
	* @memberof USV.CONFIG
	* @member {String} sDataHouse
	*/
	//var sDataHouse 			= "dh_usolver3";
	//var sDataHouse 			= "usolver";  //ggash 20170116 for geoserver

	/** add ggash 20170116 for geoserver
	* Geometry정보가 담긴 필드 이름 
	* @memberof USV.CONFIG
	* @member {String} sGeomField
	*/
	//var sGeomField 		= "G2_SPATIAL";		//<-- GeoGate
	//var sGeometryField 			= "geom";		//<-- GeoServer
	
	/**
	* 지도서비스 구축데이터 좌표계
	* @memberof USV.CONFIG
	* @member {String} sDataHouseCrs
	*/
	var sDataHouseCrs			= "EPSG:5181";
	
	/**
	* 지도서비스 요청 좌표계
	* @memberof USV.CONFIG
	* @member {String} sRequestCrs
	*/
	var sRequestCrs				= "EPSG:5181";

	/**
	* 지도서비스 좌표스케일 (유효소수점 자리수값)
	* @memberof USV.CONFIG
	* @member {String} sRequestCrs
	*/
	var sPrecision			= 3;

	/**
	* 편집모드일 경우 deactivate처리할 기본 컨트롤 id 목록
	* desc : 편집간 'SelectFeature' 컨트롤 활성화 유지를 위한 처리 - 지도기본 기능이용 시 모든컨트롤을  deactivate할 경우 feature 선택이 유지되지 않는 문제...
	* @memberof USV.CONFIG
	* @member {String} sRequestCrs
	*/
	var aSelectiveControls			= ["drag", "zoomOut", "zoomIn", "naivgationHistory", "measurePath", "measurePolygon"];
	
	/**
	* GetMap서비스를 위한 설정정보 - 서비스영역/초기영역/최대해상도/서비스레벨/WMS버전/이미지요청포맷 etc
	* @memberof USV.CONFIG
	* @member {Object} oServiceExtent  
	*/
	var oGetMapInfo = { //378731.059	206080.510	423310.164	249646.356
			"serviceExtent" : new NUTs.Bounds(378731.059,206080.51,423310.164,249646.356),	//지도서비스 최대 영역 Obj //전국 -30000, -60000, 494288, 988576 
			"indexExtent" : new NUTs.Bounds(378731.059,206080.51,423310.164,249646.356),		
			"initExtent" : new NUTs.Bounds(401804.0065,232426.369543,402439.5065,232673.369543),	//지도서비스 초기 영역 Obj  - 울산특정지역

			//"initExtent" : new NUTs.Bounds(159467, 418809,247430, 475468),	//지도서비스 초기 영역 Obj 	2017-10-18 CJH
			//"initExtent" : 	new GBounds(203459.82246396,522314.82560228,204404.32246396,522713.82560228),	//지도서비스 초기 영역 Obj  - 수원
			//"initExtent" : new GBounds(189210.18,442844.45,195570.86,450755.22),	//지도서비스 초기 영역 Obj- 서울 영등포
			"maxResolution" : "2048",			//"2048",			//dawulMap - "198.437896875794",												//지도서비스 GetMap maxResolution 
			"zoomLevels" : "14",																			//지도서비스 레벨 개수 
			"layerOrder" : "asc",																			//지도서비스 GetMap Layer Order
			"imageFormat" : "image/jpeg",																	//지도서비스 GetMap 이미지 포맷 - image/jpeg , image/png, image/gif
			"version" : "1.1.0"				 //2017-10-18 CJH																//지도서비스 GetMap Version
	};
	
	/**
	* 횡단면도서비스 필요항목 설정 - 조회대상 레이어 및 스타일 etc
	* @memberof USV.CONFIG
	* @member {String} sLayerOrder
	*/
	var oAcssInfo = {
			"layers" 	: "상수관로,하수관거,도로면,급수관로,가스관로",
			"alias" 	: "상수관로,하수관거,도로면,급수관로,가스관로",
			"styles" 	: "0x0000FF,0xfe994f,0xb2b2b2,0x008080,0xdfdf14",
			"types" 	: "UnderFacility,UnderFacility,ROAD,UnderFacility,UnderFacility",
			"width" 	: "600",	//조회 창 width
			"height" 	: "340"		//조회 창 height
	};
	
	/**
	* 차단제수변 분석 대상 / 타입 설정
	* @memberof USV.CONFIG
	* @member {Object} oAlisInfo
	*/
	var oAlisInfo = {
			"layers" 	: "WTL_PIPE_LM,WTL_SPLY_LS,WTL_VALV_PS,WTL_META_PS",
			"types" 	: "PIPES,PIPES,VALVES,VALVES",
			"where"  : ",,FTR_CDE='SA200',"
	};
	
	/**
	* 시스템별 참조레이어(벡터)의 유효축척  - 편집 기본축척 (min:1417 max:300) 이외 영역이 넓은 레이어에 한해 유효축척 설정이 필요한 경우
	* fn_init_wfs에서 생성하는 참조레이어(vector)의 유효축척 기준이 됨
	* ★★ 서비스되고 있는 축척에서 소수점이하 값을 버린 수치로 설정해야함. 
	* @memberof USV.CONFIG
	* @member {Object} 시스템별 참조레이어의 유효축척  
	*/
	var oRefWfsScaleInfo = {
		"RDL" : {
				"AAA" : {
					"max" : "300",
					"min" : "5669"
				}
		},
		"WTL" : {
				"WTL_PURI_AS" : {
					"max" : "300",
					"min" : "200000"
				} 
				/*,"TEST_SAMPLE" : {
					"max" : "300",
					"min" : "200000"
				}*/
		},
		"SWT" : {
				"BBB" : {
					"max" : "300",
					"min" : "1417"
				}
		}
	};
	
	/**
	* 서브심볼을 구성해 서비스하는 레이어의 feature 신규 추가시 DEFAULT 코드값 정의 필요.
	* 서브심볼로 구성된 레이어의 경우 서브심볼의 구분값이 되는 기준 컬럼이 비어있는 값으로 입력될 경우 보이지 않게되는 문제 방지
	* EX> 상수관로의 경우 관용도(배수관.급수관.취수관..)를 기준으로 구분함 이때 미분류 기준값을 DEFAULT값으로 설정해주면 됨.
	* @memberof USV.CONFIG
	* @member {Object} 서브심볼로 서비스하는 레이어의 해당 컬럼의 DEFAULT값 정의  
	*/
	var oSubSymbolDefaultInfo = {
		"RDL" : {
				"AAA" : {
					"max" : "300" 
				}
		},
		"WTL" : {
				"WTL_PIPE_LM" : {
					"SAA_CDE" : "SAA000" //배수관
				},
				"WTL_VALV_PS" : {
					"FTR_CDE" : "SA200"  //제수밸브
				}
		},
		"SWT" : {
				"BBB" : {
					"SBA_CDE" : "SBA000"
				}
		}
	};
	
	var fn_get_deactiveControls = function(){
		return aSelectiveControls;
	};
	
	/**
	* @memberof USV.MAP_EDITOR
	* @method
	* @description 연장, 면적 자동 갱신 항목 정의 - 시설물마다 연장/면적을 관리하는 컬럼명이 달라 별도 정의함
	* @author 윤은희(2016.09.23)
	*/
	var oUpdateLenAreaFields = {
			'WTL_PIPE_LM' : {length : 'PIP_LEN', area : ''},
			'WTL_SPLY_LS' : {length : 'PIP_LEN', area : ''},
			'SWL_PIPE_LM' : {length : 'PIP_LEN', area : ''},
			'SWL_CONN_LS' : {length : 'PIP_LEN', area : ''},
			'SWL_SIDE_LS' : {length : 'SID_LEN', area : ''},
			'RDL_CTLR_LS' : {length : 'RDL_LEN', area : ''},
			'RDL_BYCP_AS' : {length : 'BYC_LEN', area : ''},
			'RDL_PAVE_AS' : {length : 'PAV_LEN', area : 'PAV_ARA'},
			'RDL_BRDG_AS' : {length : 'TOT_LEN', area : ''},
			'RDL_TRNL_AS' : {length : 'TRN_LEN', area : 'TRN_ARA'},
			'RDL_UGRD_AS' : {length : 'SCR_LEN', area : 'SCR_ARA'},
			'RDL_SBWY_AS' : {length : 'SMN_LEN', area : 'SMN_ARA'},
			'RDL_OVPS_AS' : {length : 'PDS_LEN', area : ''},
			'RDL_EVRD_AS' : {length : 'EVR_LEN', area : ''},
			'RDL_PROT_LS' : {length : 'WOL_LEN', area : ''},
			'RDL_SMRW_LS' : {length : 'FNC_LEN', area : ''},
			'RDL_MDST_AS' : {length : 'RGR_LEN', area : ''},
			'RDL_CMDT_AS' : {length : 'TOT_LEN', area : ''},
			'RDL_SLOP_AS' : {length : 'RCT_LEN', area : ''},
			'RDL_PDCR_AS' : {length : 'CRS_LEN', area : ''},
			'RDL_SDHP_AS' : {length : 'CRE_LEN', area : ''},
			'RDL_NSPV_AS' : {length : 'CRE_LEN', area : ''},
			'RDL_OCUP_LS' : {length : 'PJG_LEN', area : ''},
			'WTL_PURI_AS' : {length : '', area : 'PUR_ARA'},
			'SWL_AODR_AS' : {length : '', area : 'ADR_SIZ'},
			'SWL_DODR_AS' : {length : '', area : 'DDR_SIZ'},
			'SWL_AODP_AS' : {length : 'PIP_LEN', area : 'ADP_SIZ'},
			'SWL_DODP_AS' : {length : '', area : 'DDP_SIZ'},
			'RDL_SQAR_AS' : {length : '', area : 'SQR_ARA'},
			'RDL_PAKP_AS' : {length : '', area : 'PRK_ARA'}
	}
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  연장, 면적 자동 갱신 항목 정의 가져오기
	* @author 윤은희(2016.09.23)
	* @returns {Object} 연장, 면적 자동 갱신 항목 정의 가져오기
	*/
	var fn_get_updateLenAreaFields = function(){
		return oUpdateLenAreaFields;
	};
	
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  시스템별 참조레이어의 유효축척  
	* @author 최재훈(2016.05.02)
	* @returns {Object} 시스템별 참조레이어의 유효축척
	*/
	var fn_get_refScaleInfo = function(){
		return oRefWfsScaleInfo;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  시스템별 참조레이어의 유효축척  
	* @author 최재훈(2016.05.02)
	* @returns {Object} 시스템별 참조레이어의 유효축척
	*/
	var fn_get_subSymbolDefaultInfo = function(){
		return oSubSymbolDefaultInfo;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  지도서비스 좌표스케일 (유효소수점 자리수값)
	* @author 최재훈(2016.04.20)
	* @returns {number} 지도서비스 좌표스케일 (유효소수점 자리수값)
	*/
	var fn_get_mapPrecision = function (){
		return sPrecision;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  프록시 POST 서비스URL 리턴
	* @author 최재훈(2016.03.23)
	* @returns {String} 프록시 POST 서비스URL
	*/
	var fn_get_postProxyUrl = function (){
		return sPostProxyUrl;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  프록시 GET 서비스URL 리턴
	* @author 최재훈(2016.03.23)
	* @returns {String} 프록시 GET 서비스URL
	*/
	var fn_get_getProxyUrl = function (){
		return sGetProxyUrl;
	};
	

	var fn_get_gisEngineType = function (){
		return sGisEngineType;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description 지도 서비스URL 리턴
	* @author 최재훈(2015.11.30)
	* @returns {String} 지도서비스 URL
	*/
	var fn_get_serviceUrl = function (){
		return oGisEngineInfo[sGisEngineType].serviceUrl;
	};

	var fn_get_wfsServiceUrl = function (){
		return oGisEngineInfo[sGisEngineType].wfsServiceUrl;
	};
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  DataHouse(wfs prefix) 이름 리턴
	* @author 최재훈(2015.11.30)
	* @returns {String} 지도서비스 DataHouse 이름
	*/
	var fn_get_dataHouseName = function (){
		return oGisEngineInfo[sGisEngineType].prefix;
	};


	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  지도서비스 Extent 리턴
	* @author 최재훈(2015.11.30)
	* @returns {Object} 지도서비스 Extent
	*/
	var fn_get_getMapInfo = function (){
		return oGetMapInfo;
	};
		
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  지도서비스 GetMap 기본 좌표계(CRS) 리턴
	* @author 최재훈(2015.12.28)
	* @returns {String} 지도서비스 GetMap 기본 좌표계(CRS)
	*/
	var fn_get_dataHouseCrs = function (){
		return sDataHouseCrs;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  지도서비스 GetMap 기본 좌표계(CRS) 리턴
	* @author 최재훈(2015.12.28)
	* @returns {String} 지도서비스 GetMap 기본 좌표계(CRS)
	*/
	var fn_get_requestCrs = function (){
		return sRequestCrs;
	};	
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  횡단면도 조회 서비스를 위한 설정 정보 리턴
	* @author 최재훈(2015.12.28)
	* @returns {String} 횡단면도 조회 서비스를 위한 설정 정보
	*/
	var fn_get_acssObject = function (){
		return oAcssInfo;
	};
	
	/**
	* @memberof USV.CONFIG
	* @method 
	* @private  
	* @description  차단제수변 조회 서비스를 위한 설정 정보 리턴
	* @author 윤은희(2016.09.20)
	* @returns {String} 차단제수변 조회 서비스를 위한 설정 정보
	*/
	var fn_get_alisObject = function (){
		return oAlisInfo;
	};
	
	//ggash 20170124 for geoserver
	var fn_get_geometryField = function (){
		return oGisEngineInfo[sGisEngineType].geometryField;
	};
	//ggash 20170124 for geoserver
	var fn_get_featureIdField = function (){
		return oGisEngineInfo[sGisEngineType].featureIdField;
	};
	//------------------------------------------------------------------------------------------------------------------
	// ## public 메소드
	//------------------------------------------------------------------------------------------------------------------
	
	_mod_config.fn_get_gisEngineType 		= fn_get_gisEngineType;  //ggash 20170124 for geoserver
	_mod_config.fn_get_featureIdField 		= fn_get_featureIdField; //ggash 20170124 for geoserver
	_mod_config.fn_get_serviceUrl 			= fn_get_serviceUrl;
	_mod_config.fn_get_wfsServiceUrl 		= fn_get_wfsServiceUrl; //ggash 20170112 for geoserver
	_mod_config.fn_get_dataHouseName 		= fn_get_dataHouseName; 
	_mod_config.fn_get_dataHouseCrs 		= fn_get_dataHouseCrs;
	_mod_config.fn_get_requestCrs 			= fn_get_requestCrs;
	_mod_config.fn_get_acssObject			= fn_get_acssObject;
	_mod_config.fn_get_alisObject			= fn_get_alisObject;
	_mod_config.fn_get_getMapInfo			= fn_get_getMapInfo;	
	_mod_config.fn_get_postProxyUrl			= fn_get_postProxyUrl;
	_mod_config.fn_get_getProxyUrl			= fn_get_getProxyUrl;
	_mod_config.fn_get_mapPrecision			= fn_get_mapPrecision;
	_mod_config.fn_get_refScaleInfo			= fn_get_refScaleInfo;
	_mod_config.fn_get_deactiveControls		= fn_get_deactiveControls;
	_mod_config.fn_get_subSymbolDefaultInfo	= fn_get_subSymbolDefaultInfo;
	_mod_config.fn_get_updateLenAreaFields	= fn_get_updateLenAreaFields;	
	_mod_config.fn_get_geometryField		= fn_get_geometryField;	//ggash 20170112 for geoserver
	
	
	return _mod_config;
		
}(USV.CONFIG || {}, jQuery));
