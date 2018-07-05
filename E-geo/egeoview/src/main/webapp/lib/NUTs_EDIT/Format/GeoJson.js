/**************************************************************************************************************
 * GeoJson 클래스
 * @author ehyun 
 * @namespace {Object} NUTs.GeoJson
 * @description 공간연산 처리 위한 obj 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.GeoJson = (function($,undefined) {
	
	/**
	 * 생성된 GeoJson 객체를 담고 있는 Object
	 */
	var oGeoJson = {};
    

	/**
	* @memberof NUTs.GeoJson
	* @method
	* @description GeoJson 객체를 생성하기 위한 Main 함수
	* @author ehyun 
	* @param {String} _sGeomType : Geometry 타입 - Point, LineString, Polygon
	* @param {Object} _oGeometries : 좌표 List Object - ex. [POINT(412164.082 229838.719),POINT(412146.581 229840.085)]
	*/
	var getGeoJson = function(_sGeomType, _oGeometries){
    	 return oGeoJson = makeGeoJson(_sGeomType, _oGeometries);    	 
     };
     
     /**********************************************************************************
		 * 함수명 : makeGeoJson
		 * 설 명 : GeoJson 객체를 생성.
		 * 인 자 : _sGeomType(Geometry 타입 - Point, LineString, Polygon), _oGeometries(좌표 List Object - ex. [POINT(412164.082 229838.719),POINT(412146.581 229840.085)])
		 * 사용법 : makeGeoJson(_sGeomType, _oGeometries)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
     

 	/**
 	* @memberof NUTs.GeoJson
 	* @method
 	* @description GeoJson 객체를 생성
 	* @author ehyun 
 	* @param {String} _sGeomType : Geometry 타입 - Point, LineString, Polygon
 	* @param {Object} _oGeometries(좌표 List Object - ex. [POINT(412164.082 229838.719),POINT(412146.581 229840.085)])
 	*/
     var makeGeoJson = function(_sGeomType, _oGeometries){
    	 
    	 var geoJson = {
    		  'type': 'Feature',
    		  'geometry': {
    		    'type': _sGeomType,
    		    'coordinates': getCoordinates(_sGeomType, _oGeometries)
    		  },
    		  'properties': {}
    		};
    	 
    	 return geoJson;
     };
     

  	/**
  	* @memberof NUTs.GeoJson
  	* @method
  	* @description  Geometry 타입별로 Coordinate 값을 리턴
  	* @author ehyun 
  	* @param {String} _sGeomType : Geometry 타입 - Point, LineString, Polygon
  	* @param {Object} _oGeometries(좌표 List Object - ex. [POINT(412164.082 229838.719),POINT(412146.581 229840.085)])
  	*/
     var getCoordinates = function(_sGeomType, _oGeometries){
    	 var aCoordinates = [];    	
    	 
    	 switch(_sGeomType.toLowerCase()){
	    	 case 'point' : 
	    		 	aCoordinates = [_oGeometries.x, _oGeometries.y]; 
	    		 	break;
	    	 case 'linestring' : 
	    	 		for(var i=0,len=_oGeometries.length;i<len;i++)
	    	 			aCoordinates.push([_oGeometries[i].x, _oGeometries[i].y]);
	    	 		break
	    	 case 'polygon': 
	    		 var aArr = [];
	    		 for(var i=0,len=_oGeometries.length;i<len;i++)
	    			 aArr.push([_oGeometries[i].x, _oGeometries[i].y]); 
	    		 aCoordinates.push(aArr);
	    		 break;
    	 }    	 
    	 return aCoordinates;
     };     
     
     
     /**
 	 * public function
 	 */
     return {    	
    	 getGeoJson : getGeoJson
     };	
     
}(jQuery));
