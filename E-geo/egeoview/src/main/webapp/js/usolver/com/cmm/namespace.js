/**
 * 시스템 기본 네임스페이스 
 * @namespace {Object} USV 
 */
var USV = USV || {};				//1Detph

/*var style = style || {};			//2Detph - view, style 
var map = map || {};				//2Detph - 지도 
var mapEditor = mapEditor || {};	//2Detph - 지도편집 
var mapSpecial = mapSpecial || {};	//2Detph - 지도특화기능 
var search = search || {};			//2Detph - 검색 
var appEvent = appEvent || {};			//2Detph - view, style담당

USV.style = style;
USV.map = map;
USV.mapEditor = mapEditor;
USV.mapSpecial = mapSpecial;
USV.search = search;
USV.appEvent = appEvent;*/

/**
* @method 
* @description 네임스페이스 축약사용 지원을 위한 함수
* @author 최재훈(2015.11.13)
* @param {String} ns_string - 줄여서 사용하고 싶은 FULL 네임스페이스
* @returns {Obecjt} 줄여서 사용가능한 네임스페이스
*/
USV.ns = function(ns_string) {
	var parts = ns_string.split('.'),
    	parent = USV,
    	i;
    
    if(parts[0] === 'USV'){
    	parts = parts.slice(1);
    }
    
    for(i=0; i < parts.length ; i +=1){
    	if ( typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
        }
        
        parent = parent[parts[i]];
    }
    return parent;
};

var MAP 			= USV.ns("USV.MAP");
var MAP_EDITOR 		= USV.ns("USV.MAP_EDITOR");
var MAP_TIMELINE	= USV.ns("USV.MAP_TIMELINE");
var MAP_SPECIAL 	= USV.ns("USV.MAP_SPECIAL");
var COMMON 			= USV.ns("USV.COMMON");
var CONFIG 			= USV.ns("USV.CONFIG");
var EVENT		 	= USV.ns("USV.EVENT");
var STYLE		 	= USV.ns("USV.STYLE");
var SEARCH		 	= USV.ns("USV.SEARCH");
var REGISTER	 	= USV.ns("USV.REGISTER");
var BOOK			= USV.ns("USV.BOOK");
var MAKELIST		= USV.ns("USV.MAKELIST");