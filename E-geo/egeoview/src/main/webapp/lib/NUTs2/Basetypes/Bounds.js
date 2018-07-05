/**********************************************************************************
 * 파일명 : GBounds.js
 * 설 명 : GMapAPI 영역 타입 클래스
 * 필요 라이브러리 : OpenLayers (OpenLayers.Bounds)
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.18		최원석				0.1					최초 생성(namespace 만 GBounds 로 변경)
 * 
**********************************************************************************/
NUTs.Bounds = OpenLayers.Class(OpenLayers.Bounds, {
	CLASS_NAME: "NUTs.Bounds"
});

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