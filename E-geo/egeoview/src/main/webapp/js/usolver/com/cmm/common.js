/**
 * 시스템 환경 설정 

 * @namespace {Object} USV.COMMON 
 */
	
USV.COMMON = (function(_mod_common, $, undefined){

var popupList = popupList || {};
popupList.lastZIndex = 	99999;

/**
* @memberof USV.COMMON
* @method 
* @description zIndex를 1씩 증가시키며 호출되는 Element를 팝업으로 띄우기 
* @author 최재훈(2015.09.10)
* @param {Object} _oWin - 팝업으로 띄울 html Element 개체
*/
var showWindow = function(_oWin){
	if(_oWin){ 
		_oWin.show();
		_oWin.css({'z-index':popupList.lastZIndex});

		popupList.lastZIndex += 1;
	}
};

/**
* @memberof USV.COMMON
* @method 
* @description 시스템 이용에 필요한 알림, 경고 메시지 표출 기능
* @author 최재훈(2015.08.10)
* @param {String} _sMsg - "타이틀 & 내용" 구조의 메시지
* @param {String} _nTimeOut - 창이 닫히기 까지 소요되는 시간(ms)
*/
var showMessage = function (_sMsg, _nTimeOut){
		
	if(!_nTimeOut)_nTimeOut = 2000;
	
	var aMsg = _sMsg.split('&');
	var aMsg2 = _sMsg.split(' ');
	
	if(aMsg2.length !== 2 && aMsg.length !== 2){
		alert('메시지 전달 오류! \n\nMessage : [' + _sMsg +']');
	}
	
	if(aMsg2.length == 2){
		alert(_sMsg);
	}else{
		var dialogMsg = $("#dialog-message");
		var detailgMsg = $("#detailMessage");

		COMMON.showWindow($("#dialog-message"));
		COMMON.showWindow($(".ui-dialog"));
		
		dialogMsg.attr("title",$.trim(aMsg[0]));
		detailgMsg.text('');
		detailgMsg.append($.trim(aMsg[1]));
		dialogMsg.dialog();
		//$("#dialog-message").css("z-index","999999");
		if($("#dialog-message").dialog()){
			setTimeout('$("#dialog-message").dialog("close")', _nTimeOut);
		}
	}
};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


/**
* @memberof USV.COMMON
* @method 
* @description 시스템 테마(디자인) 변경 적용
* @author 김정수(2015.10.20)
* @param {String}  _sThemtype- 사용자가 선택한 테마 타입
*/
var fn_change_theme = function (_sThemtype){
	
	_themeWindow.close();	
	_themeType = _sThemtype;
	switch(_sThemtype){
	case "BLUE":		
		$("#desktop_iconarea").css("background-image","url(/extLib/jdesktop/images/bg2_01.png)");
		$("#imgFavorite").attr("src","/images/usolver/com/cmm/jdesktop/menu/favorite_tit2.png");
		$("#FavoriteCon").css("background","url(/images/usolver/com/cmm/jdesktop/favorite_bg2.png) 0 0 repeat-y");
		$("#Depth_2Bx").css("background","url(/images/usolver/com/cmm/jdesktop/2depth_bg2.png) 0 0 repeat-x");
		break;
	case "ORANGE":
		break;
	default : //SILVER
		$("#desktop_iconarea").css("background-image","url(/extLib/jdesktop/images/bg02.png)");
		$("#imgFavorite").attr("src","/images/usolver/com/cmm/jdesktop/menu/favorite_tit.png");
		$("#FavoriteCon").css("background","url(/images/usolver/com/cmm/jdesktop/favorite_bg.png) 0 0 repeat-y");
		$("#Depth_2Bx").css("background","url(/images/usolver/com/cmm/jdesktop/2depth_bg.png) 0 0 repeat-x");
	}
};

/**
* @memberof USV.COMMON
* @method 
* @description Element별 최대 ZIndex값 리턴
* @author 최재훈(2016.06.28)
* @param {String}  elem - 추출하고자 하는 HTML Element 명.
*/
var fn_get_maxMapZIndex = function(elems){
	var maxIndex = 0;
    elems = typeof elems !== 'undefined' ? elems : $("*");

    $(elems).each(function(){
                      maxIndex = (parseInt(maxIndex) < parseInt($(this).css('z-index'))) ? parseInt($(this).css('z-index')) : maxIndex;
                      });

    return maxIndex; 

};
/**
* @memberof USV.COMMON
* @method 
* @description 현재 theme 타입 반환
* @author 김정수(2015.10.20)
*/
var fn_get_themetype = function (){
	return _themeType;
};

/**
* @memberof USV.COMMON
* @method 
* @description 현재 서비스중인 호스트정보(http://xxx.xxx.xxx.xxx:port) 반환
* @author 김정수(2015.10.20)
*/
var fn_get_hostInfo = function(){
	var hostInfo = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
	return hostInfo;
};
/**
* @memberof USV.COMMON
* @method 
* @description 웹애플리케이션의 ${pageContext.request.contextPath} 반환
* @author 최재훈(2015.12.28)
* @returns {String} 현재 접속중인 페이지 경로 (ex> /map/main.do?a=1&b=2) 
*/
var fn_get_pageContext = function (){
	return $('#pc_contextPath').val();
};

/**
* @memberof USV.COMMON
* @method 
* @description 시스템 테마(디자인) 설정
* @author 김정수(2015.10.20)
* @param {String}  _sThemtype- 사용자가 선택한 테마 타입
*/
var fn_set_themetype = function (_sThemtype)
{
	_themeType= _sThemtype;
	
	//클래스 변경
};

/**
* @memberof USV.COMMON
* @method 
* @description 주어진 파라미터(함수)을 이용 특정 수행시점의 호출 함수를 리턴
* @author 최재훈(2015.11.19)
* @param {Object}  caller - 함수
*/
var $Func = function (caller) { 
    var f = arguments.callee.caller;
   
    if(caller) f = f.caller;
    var pat = /^function\s+([a-zA-Z0-9_]+)\s*\(/i;

    pat.exec(f);  //메서드가 일치하는 부분을 찾으면 배열변수를 반환하고, 검색 결과를 반영하도록 RegExp 개체가 업데이트된다.

    var func = new Object(); 
    func.name = RegExp.$1; 
    
    return func; 
};

/**
* @memberof USV.COMMON
* @method 
* @description 숫자여부 리턴
* @author 최재훈(2015.11.19)
* @param {Object}  caller - 함수
*/
var isNumber = function(s) {
	  s += ''; // 문자열로 변환
	  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	  if (s == '' || isNaN(s)) return false;
	  return true;
};
/**
* @memberof USV.COMMON
* @method 
* @description  왼쪽부터 주어진 문자열과 자릿수로 채워 리턴
* @author 최재훈
* @param {String}  _sMain - 가공할 문자열
* @param {String}  _sChar - 채워질 문자열
* @param {String}  _nLen - 자리수
*/
//left padding s with c to a total of n chars
var padding_left = function(_sMain, _sChar, _nLen) {
    if (! _sMain || ! _sChar || _sMain.length >= _nLen) {
        return _sMain;
    }

    var max = (_nLen - _sMain.length)/_sChar.length;
    for (var i = 0; i < max; i++) {
    	_sMain = _sChar + _sMain;
    }

    return _sMain;
};
/**
* @memberof USV.COMMON
* @method 
* @description  오른쪽부터 주어진 문자열과 자릿수로 채워 리턴
* @author 최재훈
* @param {String}  _sMain - 가공할 문자열
* @param {String}  _sChar - 채워질 문자열
* @param {String}  _nLen - 자리수
*/
// right padding s with c to a total of n chars
var padding_right = function(_sMain, _sChar, _nLen) {
    if (! _sMain || ! _sChar || _sMain.length >= _nLen) {
        return _sMain;
    }

    var max = (_nLen - _sMain.length)/_sChar.length;
    for (var i = 0; i < max; i++) {
    	_sMain += _sChar;
    }

    return _sMain;
};

var isHangul = function(_sChar){
	var sChar = _sChar.charCodeAt(0);
	  if( 0x1100 <= sChar && sChar <= 0x11FF ) return true;
	  if( 0x3130 <= sChar && sChar <= 0x318F ) return true;
	  if( 0xAC00 <= sChar && sChar <= 0xD7A3 ) return true;
	  return false; 
};
/**
* @memberof USV.COMMON
* @method 
* @description ajax 요청을 위한 공통 함수 추가
* @author 임상수(2015.11.20)
* @param {Object} _options - Ajax options
*/
var fn_excute_ajax = (function(){
	

var options = {
	success : success,
	complete : complete,
	error : error
};


function success(res) {
	//console.log(res);
}


function complete(res) {
	//console.log(res);
}
	

function error(xhr, status, error) {
	alert('서버와의 통신에 실패했습니다. 다시 시도해주세요');
	//console.log('code : ' + xhr.status + '\n' + 'message : ' + xhr.responseText + '\n' + 'error : ' + error);
}
	

function keysToLowerCase(obj) {
    if (!obj || !typeof(obj) === "object" || typeof(obj) === "string" || typeof(obj) === "number" || typeof(obj) === "boolean") {
        return obj;
    }
    var keys = Object.keys(obj);
    var n = keys.length;
    var lowKey;
    while (n--) {
        var key = keys[n];
        if (key === (lowKey = key.toLowerCase()))
            continue;
        obj[lowKey] = keysToLowerCase(obj[key]);
        delete obj[key];
    }
    return (obj);
}
	

	return function(_options) {
		// _options = keysToLowerCase(_options);
		
		var ajaxOptions = $.extend({}, options, _options);
		
		//console.log('URL ==> ' + ajaxOptions.url);
		
		if(!ajaxOptions.url) {
			return;
		}
		
		$.ajax(ajaxOptions);
	};
}());

/**
* @memberof USV.COMMON
* @method 
* @description 좌우 공백제거 후 리턴
* @author 최재훈(2015.11.20)
* @param {String} _sChar - 공백제거 문자열
*/
var trim = function(_sChar){
	 
	return _sChar.replace(/(^\s*)|(\s*$)/gi, "");
 
};

/**
* @memberof USV.COMMON
* @method 
* @description 좌측 공백제거 후 리턴
* @author 최재훈(2015.11.20)
* @param {String} _sChar - 공백제거 문자열
*/
var ltrim = function(_sChar){
	 
	return _sChar.replace(/^[ ]*/g, '');
 
};

/**
* @memberof USV.COMMON
* @method 
* @description 우측 공백제거 후 리턴
* @author 최재훈(2015.11.20)
* @param {String} _sChar - 공백제거 문자열
*/
var rtrim = function(_sChar){
	 
	return _sChar.replace(/[ ]*$/g, '');
 
};

var convertToUpper = function(_obj){ 
	var rtnObj = {};
	for (var prop in _obj){
	  	var rtnVal = _obj[prop]; 
	    prop = prop.toUpperCase();
	    rtnObj[prop] = rtnVal;
  }
  return rtnObj;
}



var convertToLower = function(_obj){ 
	var rtnObj = {};
	for (var prop in _obj){
	  	var rtnVal = _obj[prop]; 
	    prop = prop.toLowerCase();
	    rtnObj[prop] = rtnVal;
  }
  return rtnObj;
}
/**
* @memberof USV.COMMON
* @method 
* @description 기준문자열에서 특정문자열을 찾아 대체문자열로 치환 후 반환
* @author 최재훈(2015.11.20)
* @param {String} _sOrg - 기준 문자열
* @param {String} _sChar1 - 찾을 문자열
* @param {String} _sChar2 - 대체 문자열
* @returns {String} 대체 완료된 문자열
*/
var replaceAll = function(_sOrg, _sChar1, _sChar2){
	
	 while (_sOrg.indexOf(_sChar1) != -1) {
	        _sOrg = _sOrg.replace(_sChar1, _sChar2);
	 }

	 return _sOrg;

};
/**
* @memberof USV.COMMON
* @method 
* @description Object가 비어있는지 여부 판단
* @author 윤은희(2015.10.20)
* @param {Object}  검사할 Object
* @returns {Boolean} true/false
*/
var isEmptyObject = function (_oObj)
{
	var sName;
	for ( sName in _oObj ) {
		return false;
	}
	return true; 
};

/**
* @memberof USV.COMMON 
* @method
* @description Object 복제 - Deep Copy
* @author 윤은희(2016.03.24)
* @param {Object}  복제할 Object
* @returns {Object} 복제된 Object
*/
var deepCloneObject = function (_oObj)
{
	var cloneObj = null;
	
	if(_oObj.geometry){											// 공간 객체														
		var sGeomId = _oObj.geometry.id;
		var oGeomClone = _oObj.geometry.clone();
		cloneObj = $.extend(true, {}, _oObj);
		cloneObj.geometry = oGeomClone;
		cloneObj.geometry.id = sGeomId;
	}
	else{
		
		cloneObj = $.extend(true, {}, _oObj);
		
		if(_oObj instanceof Array){
			cloneObj.length = _oObj.length;
		}
		
	}
	
	return cloneObj;
};


/**
* @memberof USV.COMMON 
* @method
* @description Sleep
* @author 윤은희(2016.10.07)
* @param {Number}  sleep 시킬 시간(millisecond)
* @returns N/A
*/
var sleep = function(num){
	var now = new Date();
	var stop = now.getTime() + num;
	while(true){
		now = new Date();
		if(now.getTime() > stop)return;
	}
};


/**
* @memberof USV.COMMON 
* @method
* @description HTML encode, decode
* @author 윤은희(2016.10.05)
* @returns htmlEncode : "{"left":388061.19081633,"bottom":236352.61977551,"right":398741.19081633,"top":240712.61977551}"
* 							    => "{&#034;left&#034;:411859.4324925,&#034;bottom&#034;:229605.56461848,&#034;right&#034;:412526.9324925,&#034;top&#034;:229878.56461848}"	
* @returns htmlDecode : "{&#034;left&#034;:411859.4324925,&#034;bottom&#034;:229605.56461848,&#034;right&#034;:412526.9324925,&#034;top&#034;:229878.56461848}"
* 								=> "{\"left\":388061.19081633,\"bottom\":236352.61977551,\"right\":398741.19081633,\"top\":240712.61977551}"
*/
var htmlEnDeCode = (function() {
    var charToEntityRegex,
        entityToCharRegex,
        charToEntity,
        entityToChar;

    function resetCharacterEntities() {
        charToEntity = {};
        entityToChar = {};
        // add the default set
        addCharacterEntities({
            '&amp;'     :   '&',
            '&gt;'      :   '>',
            '&lt;'      :   '<',
            '&quot;'    :   '"',
            '&#39;'     :   "'",
            '&#034;'     :   "\""
        });
    }

    function addCharacterEntities(newEntities) {
        var charKeys = [],
            entityKeys = [],
            key, echar;
        for (key in newEntities) {
            echar = newEntities[key];
            entityToChar[key] = echar;
            charToEntity[echar] = key;
            charKeys.push(echar);
            entityKeys.push(key);
        }
        charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
        entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
    }

    function htmlEncode(value){
        var htmlEncodeReplaceFn = function(match, capture) {
            return charToEntity[capture];
        };

        return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
    }

    function htmlDecode(value) {
        var htmlDecodeReplaceFn = function(match, capture) {
            return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
        };

        return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
    }

    resetCharacterEntities();

    return {
        htmlEncode: htmlEncode,
        htmlDecode: htmlDecode
    };
})();



//------------------------------------------------------------------------------------------------------------------
//## public 메소드
//------------------------------------------------------------------------------------------------------------------

_mod_common.showWindow				=	showWindow;
_mod_common.showMessage				=	showMessage;
_mod_common.fn_change_theme			=	fn_change_theme;
_mod_common.fn_get_maxMapZIndex		=	fn_get_maxMapZIndex;

_mod_common.fn_get_themetype		=	fn_get_themetype;
_mod_common.fn_get_hostInfo			=	fn_get_hostInfo;
_mod_common.fn_get_pageContext		=	fn_get_pageContext;

_mod_common.fn_set_themetype		=	fn_set_themetype;
_mod_common.$Func					=	$Func;
_mod_common.isNumber				=	isNumber;
_mod_common.padding_left			=	padding_left;
_mod_common.padding_right			=	padding_right;
_mod_common.fn_excute_ajax			=	fn_excute_ajax;
_mod_common.trim					=	trim;
_mod_common.ltrim					=	ltrim;
_mod_common.rtrim					=	rtrim;
_mod_common.replaceAll				=	replaceAll;
_mod_common.isEmptyObject			=	isEmptyObject;
_mod_common.deepCloneObject			=	deepCloneObject;
_mod_common.isHangul				=	isHangul;
_mod_common.sleep					=	sleep;
_mod_common.convertToUpper			=	convertToUpper;
_mod_common.convertToLower			=	convertToLower;

_mod_common.htmlEnDeCode			=	htmlEnDeCode;

return _mod_common;

}(USV.COMMON || {}, jQuery));