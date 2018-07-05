/**************************************************************************************************************
 * 영역 타입 클래스
 * @namespace {Object} NUTs.Bounds
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Bounds = OpenLayers.Class(OpenLayers.Bounds, {
	CLASS_NAME: "NUTs.Bounds"
});


/**
* @memberof NUTs.Bounds
* @method
* @description 문자열로 구성된 영역정보를 이용 ol클래스로 리턴
* @param {String} str : 구분자를 포함한 영역정보
* @param {str} str : 구분자(',')
*/
NUTs.Bounds.fromString = function(str, ch) {
	if(!ch) {
		var ch = ",";
	}
	
	var bounds = str.split(ch);
	return NUTs.Bounds.fromArray(bounds);
};

NUTs.Bounds.fromArray = function (bbox) {
	return new NUTs.Bounds(parseFloat(bbox[0]),parseFloat(bbox[1]),parseFloat(bbox[2]),parseFloat(bbox[3]));
};