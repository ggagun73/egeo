USV.COMMON = (function(_mod_common_map, $, undefined){

/**
* 편집중인 레이어 
* @memberof USV.COMMON
* @member {String} editingLayer
* @private  
*/
var editingLayer = null;
/**
* 편집중인 벡터레이어 객체 
* @memberof USV.COMMON
* @member {Object} editingLayerObj
*/
var editingLayerObj = null;

/**
* @memberof USV.COMMON
* @method 
* @description 현재 편집중인 레이어명 가져오기
* @author 윤은희(2015.08.31)
* @returns {String} 레이어(table)명
*/
var fn_get_editingLayer = function (_param){
	 var sSelectedLayer = $('div.editLayer').attr('id');
	 if(!editingLayer && !sSelectedLayer) {
		 COMMON.showMessage('편집오류 & 편집대상 레이어를 선택해주세요!');
		
		//[편집시작버튼]을 클릭한 경우 선택 해제
		if(COMMON.$Func(_param).name == 'fn_start_edit'){
			var sBtnUrl = $('#btnStartFeatureEdit').children().attr('src').replace('selected','off').replace('on','off');
			USV.releaseSelect = true;
			$('#btnStartFeatureEdit').children().attr('src', sBtnUrl);
		}

		return false;
	 }
	 return sSelectedLayer.toUpperCase();
};

/**
* @memberof USV.COMMON
* @method 
* @description 레이어 정보 가져오기
* @author 최재훈(2015.11.17)
* @param {String} _sLyrEngNm - 정보를 추출하고자 하는 레이어(table)명
* @returns {Object} layerInfo 
*/
var fn_get_layerInfo = function (_sLyrEngNm){
	 	 return USV.MAP.fn_get_orgLayerInfoList(_sLyrEngNm);
};


var fn_get_layerInfoFromLayerTool = function (_sLyrEngNm){
	 	 return layerTool.layers[_sLyrEngNm];
};

/**
* @memberof USV.COMMON
* @method 
* @description (현재서비스중인) 모든 레이어 정보 가져오기
* @author 최재훈(2015.12.14)
* @returns {Object} oLayerInfoList  
*/
var fn_get_layerTotInfoList = function (){
	 	 return USV.MAP.fn_get_layerTotInfoList();
};

/**
* @memberof USV.COMMON
* @method 
* @description (시스템이 제공하는 기초) 레이어 정보 가져오기
* @author 최재훈(2015.11.17)
* @param {String} _sLyrEngNm - 정보를 추출하고자 하는 레이어(table)명
* @returns {Object} layerInfo 
*/
var fn_get_orgLayerInfoList = function (_sLyrEngNm){
	 return USV.MAP.fn_get_orgLayerInfoList(_sLyrEngNm);
};


/**
* @memberof USV.COMMON
* @method 
* @description (시스템이 제공하는 기초) 모든 레이어 정보 가져오기
* @author 최재훈(2015.12.14)
* @returns {Object} oLayerInfoList  
*/
var fn_get_orgLayerTotInfoList = function (){
	 	 return USV.MAP.fn_get_orgLayerTotInfoList();
};

/**
* @memberof USV.COMMON
* @method 
* @description (시스템이 제공하는 기초) 레이어 그룹 정보 가져오기
* @author 최재훈(2015.12.14)
* @returns {Object} oLayerGroups  
*/
var fn_get_orgLayerGroupInfoList = function (){
	 	 return USV.MAP.fn_get_orgLayerGroupInfoList();
};

/**
* @memberof USV.COMMON
* @method 
* @description 편집 가능한 레이어 정보 반환
* @author 최재훈(2015.11.17)
* @returns {Object} layerInfo 
*/
var fn_get_editLayerInfo = function (){
	 	 return USV.MAP.fn_get_editLayerInfoList();
};

/**
* @memberof USV.COMMON
* @method 
* @description 편집 가능한 레이어(원형:가공되지 않은...) 정보 반환 - 권한체크 / 맵 구성에서 사용할  
* @author 최재훈(2016.09.17)
* @returns {Object} layerInfo 
*/
var fn_get_orgEditLayerInfo = function (){
	 return USV.MAP.fn_get_orgEditLayerInfoList();
};

/**
* @memberof USV.COMMON
* @method 
* @description 사용자 권한 정보 반환
* @author 최재훈(2016.09.17)
* @returns {Object} 사용자 권한 정보 
*/
var fn_get_userAuthorInfo = function (){
	 return USV.MAP.fn_get_userAuthorInfo();
};

/**
* @memberof USV.COMMON
* @method 
* @description 사용자 정보 반환
* @author 최재훈(2016.09.17)
* @returns {Object} 사용자 정보 
*/
var fn_get_userInfo = function (){
	 return USV.MAP.fn_get_userInfo();
};

/**
* @memberof USV.COMMON
* @method 
* @description 관리자 여부를 확인할 수 있는 정보 반환
* @author 최재훈(2016.09.17)
* @returns {Object} 관리자 확인 정보 
*/
var fn_get_sysAdmin = function (){
	 return USV.MAP.fn_get_sysAdmin();
};

/**
* @memberof USV.COMMON
* @method 
* @description 사용자 ID 반환
* @author 최재훈(2016.09.17)
* @returns {Object} 사용자 ID 
*/
var fn_get_userId = function (){
	 var oUserInfo = USV.MAP.fn_get_userInfo();
	 return oUserInfo.userId;
};

/**
* @memberof USV.COMMON
* @method 
* @description 현재 접속중인 시스템 구분 문자열 반환 (상수 - WTL / 하수 - SWL / 도로 - RDL)
* 
* @author 최재훈(2016.09.23)
* @returns {Object} 시스템 구분 문자열
*/
var fn_get_currentSystem = function (){
	
	 var sCurSystemInfo;
	 var sCurSytem;
	 
	 if(parent)
		 sCurSystemInfo= parent.document.getElementById("system").value;
	 else
		 sCurSystemInfo= document.getElementById("system").value;
	 
	 if(sCurSystemInfo) {
		 if(sCurSystemInfo.toUpperCase().contains("WATER"))
			 sCurSytem = "WTL";
		 else if(sCurSystemInfo.toUpperCase().contains("SEWER"))
			 sCurSytem = "SWL";
		 else if(sCurSystemInfo.toUpperCase().contains("ROAD"))
			 sCurSytem = "RDL";
	 }
	 return sCurSytem;
};
/**
* @memberof USV.COMMON
* @method 
* @description 레이어 영문명으로 타입(점,선,면) 추출
* @author 최재훈(2015.08.31)
* @param {String} _sLyrEngNm - 타입을 추출하고자 하는 레이어(table)명
* @returns {String} 'Point', 'LineString', 'Polygon' 중 1
*/
var fn_get_EditLayerType = function (_sLyrEngNm){
	_sLyrEngNm = $.trim(_sLyrEngNm);
	if(!fn_get_layerInfo(_sLyrEngNm)) {
		COMMON.showMessage("레이어 타입 추출 오류&해당데이터 [" + _sLyrEngNm + "]의 공간정보 타입을 추출하는 데 실패하였습니다. \n관리자에게 문의바랍니다.");
		return false;
	}
	var sLayerType = fn_get_layerInfo(_sLyrEngNm).layerType;
	switch (sLayerType) {
	case '1' :
		return 'Point';
		break;
	case '2' :
		return 'LineString';
		break;
	case '3' :
		return 'Polygon';
		break;
	}
};

/**
* @memberof USV.COMMON
* @method
* @description 주어진 레이어가 현재 편집중인 레이어의 참조레이어인지 여부 확인
* @author 최재훈(2015.09.02)
* @param {String} _sLyrEngNm - 레이어(table)명
* @returns {Boolean} true/false
*/
var fn_check_includeRefLayer = function (_sLyrEngNm){
	var sEditingLayer = fn_get_editingLayer();
	if(fn_get_layerInfo(sEditingLayer).refLayerList.lastIndexOf(_sLyrEngNm) > -1){
		return true;
	}
	else{
		return false;
	}
};

/**
* @memberof USV.COMMON
* @method 
* @description 레이어 영문명으로 DataSetId 추출
* @author 최재훈(2015.09.14)
* @param {String} _sLyrEngNm - 레이어(table)명
* @returns {String} 레이어 DataSetId
*/
var fn_get_EditLayerId = function (_sLyrEngNm){
	_sLyrEngNm = $.trim(_sLyrEngNm);
	return fn_get_layerInfo(_sLyrEngNm).id;
};

/**
* @memberof USV.COMMON
* @method 
* @description 레이어 영문명으로 한글명 추출
* @author 최재훈(2015.09.14)
* @param {String} _sLyrEngNm - 레이어(table)명
* @returns {String} 레이어 한글(alias)명
*/
var fn_get_EditKorLayerNm = function (_sLyrEngNm){
	var sRtnLayerKorNm;
	_sLyrEngNm = $.trim(_sLyrEngNm);
	
	if(!fn_get_layerInfo(_sLyrEngNm))
		sRtnLayerKorNm = _sLyrEngNm;
	else 
		sRtnLayerKorNm = fn_get_layerInfo(_sLyrEngNm).alias;
	
	if(!sRtnLayerKorNm){
		sRtnLayerKorNm = _sLyrEngNm;
	}
	return sRtnLayerKorNm;
};

/**
* @memberof USV.COMMON
* @method 
* @description 레이어 한글명으로 영문명 추출
* @author 최재훈(2015.09.14)
* @param {String} _sLyrKorNm - 레이어(alias)명
* @returns {String} 레이어영문(table)명
*/
var fn_get_EditEngLayerNm = function (_sLyrKorNm){
	_sLyrKorNm = $.trim(_sLyrKorNm);
	var sRtnLayerEngNm = null;
	var oLayerInfoList = fn_get_orgLayerTotInfoList();
	for(key in oLayerInfoList){
		if(oLayerInfoList[key].alias == _sLyrKorNm){
			sRtnLayerEngNm = oLayerInfoList[key].table;
			break;
		}
	}	
	
	if(!sRtnLayerEngNm){
		sRtnLayerEngNm = _sLyrKorNm;
	}
	return sRtnLayerEngNm;
};


/**
* @memberof USV.COMMON
* @method 
* @description 레이어 영문명으로 지형지물부호(FTR_CDE) 추출
* @author 최재훈(2016.07.11)
* @param {String} _sLyrKorNm - 레이어(alias)명
* @returns {String} 지형지물부호 코드
*/
var fn_get_Ftrcde = function (_sLyrEngNm){
	_sLyrEngNm = $.trim(_sLyrEngNm);
	var sRtnFtrCde = null;
	var oEditLayerInfoList = fn_get_editLayerInfo();
	for(key in oEditLayerInfoList){
		if(oEditLayerInfoList[key].lyrEngNm == _sLyrEngNm){
			sRtnFtrCde = oEditLayerInfoList[key].lyrFtrCde;
			break;
		}
	}

	return sRtnFtrCde;
};

/**
* @memberof USV.COMMON
* @method
* @description 두 지점간의 거리 구하기
* @author 최재훈(2015.09.23)
* @param {Number} _nX1 - 시작점 X좌표
* @param {Number} _nY1 - 시작점 Y좌표
* @param {Number} _nX2 - 끝점 X좌표
* @param {Number} _nY2 - 끝점 Y좌표
* @returns {Number} 거리
*/
var fn_get_DistanceBy2Point = function (_nX1, _nY1, _nX2, _nY2){
	var nDist;
	var nXdist = _nX2-_nX1;
	var nYdist = _nY2-_nY1;

	nDist = Math.sqrt(Math.pow(nXdist,2) + Math.pow(nYdist,2));

	return nDist;

};


/**
* @memberof USV.COMMON
* @method 
* @description 거리를 이용한 각도 구하기
* @author 최재훈(2015.09.23)
* @param {Number} _nYdist - y좌표간의 거리
* @param {Number} _nXdist - x좌표간의 거리
* @returns {Number} 각도
*/
var fn_get_angleBy2Dist = function (_nYdist, _nXdist){
	var nRtnAngle = 0;
	nRtnAngle = Math.atan2(_nYdist,_nXdist);
	if(nRtnAngle < 0)
		return nRtnAngle += 2* Math.PI;
	else
		return nRtnAngle;
};


/**
* @memberof USV.COMMON
* @method 
* @description 거리를 이용해 구한 각도(Radian)를 Degree로 변환
* @author 윤은희(2016.09.02)
* @param {Number} _nYdist - y좌표간의 거리
* @param {Number} _nXdist - x좌표간의 거리
* @returns {Number} 각도(degree)
*/
var fn_get_angleToDegreeByDist = function(_nYdist, _nXdist){
	var nThetaRadian = Math.atan2(_nYdist, _nXdist);
	var nThetaDegree = (nThetaRadian/Math.PI*180) + (nThetaRadian > 0 ? 0 : 360);
	
	return nThetaDegree;
};

/**
* @memberof USV.COMMON
* @method
* @description 오늘날짜 리턴
* @author 최재훈(2016.07.11)
* @param {String} _sChar 구분문자열
* @returns {String} 오늘날짜
*/
var fn_get_today = function(_sChar){

	var oDate = new Date();
	var sYear = String(oDate.getFullYear());
	var sMonth = String(oDate.getMonth() + 1);
	var sDay = String(oDate.getDate());

	var sRtnVal;

	if(_sChar){
		sRtnVal = sYear + _sChar + COMMON.padding_left(sMonth) +  _sChar + COMMON.padding_left(sDay);
	}
	else{
		sRtnVal = sYear + COMMON.padding_left(sMonth,'0',2) +  COMMON.padding_left(sDay,'0',2);
	}

	return sRtnVal;

};

/**
* @memberof USV.COMMON
* @method
* @description  특정 해상도의 축척값 가져오기
* @param {number} _nResolution : 축척을 가져오고 싶은 해상도
* @author 최재훈(2017.01.23)
*/
var fn_get_scaleByRes = function(_nResolution){
	return _nResolution * OpenLayers.INCHES_PER_UNIT[map.getUnits()] * OpenLayers.DOTS_PER_INCH;
};


//------------------------------------------------------------------------------------------------------------------
//$$ public 프로퍼티
//------------------------------------------------------------------------------------------------------------------
_mod_common_map.editingLayer 			= editingLayer;			//편집중인 레이어 - String
_mod_common_map.editingLayerObj 		= editingLayerObj;			//편집중인 벡터레이어 객체
//------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------
//## public 메소드
//------------------------------------------------------------------------------------------------------------------

_mod_common_map.fn_check_includeRefLayer		=	fn_check_includeRefLayer;

_mod_common_map.fn_get_sysAdmin					=	fn_get_sysAdmin;

_mod_common_map.fn_get_editingLayer				=	fn_get_editingLayer;

_mod_common_map.fn_get_angleBy2Dist				=	fn_get_angleBy2Dist;
_mod_common_map.fn_get_angleToDegreeByDist		=	fn_get_angleToDegreeByDist;
_mod_common_map.fn_get_DistanceBy2Point			=	fn_get_DistanceBy2Point;
_mod_common_map.fn_get_EditEngLayerNm			=	fn_get_EditEngLayerNm;

_mod_common_map.fn_get_EditKorLayerNm			=	fn_get_EditKorLayerNm;
_mod_common_map.fn_get_EditLayerId				=	fn_get_EditLayerId;

_mod_common_map.fn_get_currentSystem			=	fn_get_currentSystem;
_mod_common_map.fn_get_EditLayerType			=	fn_get_EditLayerType;
_mod_common_map.fn_get_Ftrcde					=	fn_get_Ftrcde;
_mod_common_map.fn_get_today					=	fn_get_today;
_mod_common_map.fn_get_userInfo					=	fn_get_userInfo;
_mod_common_map.fn_get_userId					=	fn_get_userId;
_mod_common_map.fn_get_layerInfo				=	fn_get_layerInfo;
_mod_common_map.fn_get_layerInfoFromLayerTool	=	fn_get_layerInfoFromLayerTool;
_mod_common_map.fn_get_layerTotInfoList			=	fn_get_layerTotInfoList;
_mod_common_map.fn_get_editLayerInfo			=	fn_get_editLayerInfo;
_mod_common_map.fn_get_userAuthorInfo			=	fn_get_userAuthorInfo;
_mod_common_map.fn_get_orgEditLayerInfo			=	fn_get_orgEditLayerInfo;
_mod_common_map.fn_get_orgLayerTotInfoList		=	fn_get_orgLayerTotInfoList;
_mod_common_map.fn_get_orgLayerGroupInfoList	=	fn_get_orgLayerGroupInfoList;
_mod_common_map.fn_get_scaleByRes				=	fn_get_scaleByRes;


//------------------------------------------------------------------------------------------------------------------


return _mod_common_map;

}(USV.COMMON || {}, jQuery));