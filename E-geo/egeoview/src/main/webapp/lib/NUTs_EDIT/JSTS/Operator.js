/**************************************************************************************************************
 * TextDraw 클래스
 * @author ehyun
 * @namespace {Object} NUTs.Handler.TextDraw
 * @description JSTS를 이용한 공간연산 지원 Obj
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

Object.defineProperty(Array.prototype, 'fill', { enumerable: false });

NUTs.JSTSOperator = (function($,undefined) {

	/**
	 * JSTS 연산용 GeoJsonReader 
	 */
	var oJSTSGeoReader = new jsts.io.GeoJSONReader();

	/**
	 * JSTS 연산용 GeoJsonWriter
	 */	 	
	var oJSTSGeoWriter = new jsts.io.GeoJSONWriter();

	/**
	 * 거리값(실수형)
	 */
	var nDist = 0;

	/**
	 * Intersects 연산 결과 Boolean 
	 */
	var bIntersects = false;

	/**
	 * Disjoint 연산 결과 Boolean 
	 */
	var bDisjoint = false;

	/**
	 * Touches 연산 결과 Boolean 
	 */    
	var bTouches = false;

	/**
	 * Crosses 연산 결과 Boolean 
	 */
	var bCrosses = false;

	/**
	 * Equals 연산 결과 Boolean 
	 */
	var bEquals = false;

	/**
	 * Buffer 연산 결과를 담는 Object 
	 */
	var oBuffer = {};

	/**
	 * GeoJson 타입 객체(GeoJson.geometry 만 보유)
	 */
	var oGeoJsonGeom = {};



	/**********************************************************************************
	 * 함수명 : Distance
	 * 설 명 : GeoJson 객체간 거리를 측정하여 거리 수치를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Distance(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Distance = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return nDist = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).distance(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};


	/**********************************************************************************
	 * 함수명 : Buffer
	 * 설 명 : GeoJson 객체를 지정한 Distance만큼의 간격으로 Buffer 객체를 생성하여 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _nDistance(버퍼를 생성할 거리 (단위:m))
	 * 사용법 : Buffer(_oGeoJsonStdGeom, _nDistance)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Buffer = function(_oGeoJsonStdGeom, _nDistance){
		return oBuffer = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).buffer(_nDistance);
	};

	

	/**********************************************************************************
	 * 함수명 : Intersects
	 * 설 명 : GeoJson 객체간 교차 여부를 판단하여 결과(Boolean)를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Intersects(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Intersects = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return bIntersects = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).intersects(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};


	/**********************************************************************************
	 * 함수명 : Intersection
	 * 설 명 : GeoJson 객체간 교차된 Geometry(the points shared by this Geometry and other) 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Intersection(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 작성일 : 2016.04.04 
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.04			최재훈		최초 생성
	 * 
	 **********************************************************************************/
	var Intersection = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return oIntersection = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).intersection(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};


	/**********************************************************************************
	 * 함수명 : Intersection
	 * 설 명 : GeoJson 객체간 병합된 Geometry(the points shared by this Geometry and other)를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Intersection(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 작성일 : 2016.05.04 
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.05.04			최재훈		최초 생성
	 * 
	 **********************************************************************************/
	var Union = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return oUnion = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).union(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};

	/**********************************************************************************
	 * 함수명 : Disjoint
	 * 설 명 : GeoJson 객체간 만나지 않는지 여부를 판단하여 결과(Boolean)를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Disjoint(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Disjoint = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return bDisjoint = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).disjoint(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};



	/**********************************************************************************
	 * 함수명 : Touches
	 * 설 명 : GeoJson 객체간 Touche 연산이 성립하는지 여부를 판단하여 결과(Boolean)를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Touches(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Touches = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return bTouches = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).touches(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};



	/**********************************************************************************
	 * 함수명 : Crosses
	 * 설 명 : GeoJson 객체간 교차 여부를 판단하여 결과(Boolean)를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Crosses(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Crosses = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return bCrosses = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).crosses(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};



	/**********************************************************************************
	 * 함수명 : Equals
	 * 설 명 : GeoJson 객체가 서로 동일한지 여부를 판단하여 결과(Boolean)를 리턴한다.
	 * 인 자 : _oGeoJsonStdGeom(연산 기준 객체(GeoJson타입)), _oGeoJsonCompGeom(연산 비교 객체(GeoJson타입))
	 * 사용법 : Equals(_oGeoJsonStdGeom, _oGeoJsonCompGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var Equals = function(_oGeoJsonStdGeom, _oGeoJsonCompGeom){
		return bEquals = oJSTSGeoReader.read(_oGeoJsonStdGeom.geometry).equals(oJSTSGeoReader.read(_oGeoJsonCompGeom.geometry));			
	};



	/**********************************************************************************
	 * 함수명 : makeGeoJsonGeom
	 * 설 명 : JSTS 연산 결과 객체를 GeoJson 타입 객체(GeoJson.geometry 반환)를 생성하여 리턴한다.
	 * 인 자 : _oJSTSCalcOutputGeom(JSTS 연산 결과 객체 - JSTS 정의 타입)
	 * 사용법 : makeGeoJsonGeom(_oJSTSCalcOutputGeom)
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.03.25			윤은희		최초 생성
	 * 
	 **********************************************************************************/
	var makeGeoJsonGeom = function(_oJSTSCalcOutputGeom){
		return oGeoJsonGeom = oJSTSGeoWriter.write(_oJSTSCalcOutputGeom);
	}

	/**
	 * 외부 노출 함수 및 Property
	 */
	return {
		oJSTSGeoReader 			: oJSTSGeoReader,
		oJSTSGeoWriter 			: oJSTSGeoWriter,
		Distance 		: Distance,
		Buffer 			: Buffer,
		Intersection 	: Intersection,
		Intersects 		: Intersects,
		Disjoint 		: Disjoint,
		Touches 		: Touches,
		Crosses 		: Crosses,
		Equals 			: Equals,
		Union			: Union,
		makeGeoJsonGeom 		: makeGeoJsonGeom
	}

}(jQuery));
