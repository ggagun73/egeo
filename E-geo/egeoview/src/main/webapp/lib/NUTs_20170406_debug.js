



/*=[ NUTs.js ]==========================================================================*/

var NUTs 			= NUTs || {};
NUTs.Protocol 		= NUTs.Protocol || {};
NUTs.Control 		= NUTs.Control || {};
NUTs.Format 		= NUTs.Format || {};
NUTs.Format.SLD 	= NUTs.Format.SLD || {};
NUTs.Handler 		= NUTs.Handler || {};
NUTs.Layer 			= NUTs.Layer || {};
NUTs.Maps 			= NUTs.Maps || {};
NUTs.Request 		= NUTs.Request || {};
NUTs.Mashup 		= NUTs.Mashup || {};
NUTs.Tool 			= NUTs.Tool || {};
NUTs.Tool.DataTool	= NUTs.Tool.DataTool || {};
NUTs.GeoServer		= NUTs.GeoServer || {};
NUTs.GeoServer.Tool	= NUTs.GeoServer.Tool || {};
NUTs.Edit			= NUTs.Edit || {};
NUTs.Edit.Control 	= NUTs.Edit.Control || {};




/*=[ Util.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : Util.js
 * 설 명 : GInno 공통 유틸리티
 * 필요 라이브러리 : jQuery
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.15		최원석				1.0					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * Base64 Encoding, Decoding
 * 출처 : http://www.webtoolkit.info/javascript-base64.html
 * 
 * 
  **********************************************************************************/

/************************************************************************************
 * OpenLayers Property 재정의 시작
 */

/**
 * DPI 재설정
 */
OpenLayers.DOTS_PER_INCH = 96;

/**
  **********************************************************************************/

NUTs.Util = {

		//=========================================================================
		//									Proxy
		//=========================================================================
		
		sendProxyGet: function(serviceUrl, params, callback) {
	        $.get("/gmap/proxyGet.do", {
	            url: encodeURIComponent(serviceUrl),
	            params: encodeURIComponent(params)
	        }, function(res) {
	        	if(!NUTs.Util.hasErr(res, this))
	        		callback(res);
	        });
	    },
	    sendProxyPost: function(serviceUrl, params, callback) {
	        $.post("/gmap/proxyPost.do", {
	            url: encodeURIComponent(serviceUrl),
	            params: encodeURIComponent(params)
	        }, function(res) {
	        	if(!NUTs.Util.hasErr(res, this))
	        		callback(res);
	        });
	    },
	    sendProxyPostSync: function(serviceUrl, params, callback) {
	    	debugger;
	        $.ajax({
	            type: "post",
	            dataType: "xml",
	            data: {
	                url: encodeURIComponent(serviceUrl),
	                params: encodeURIComponent(params)
	            },
	            async: false,
	            url: "/gmap/proxyPost.do",
	            success: function(res) {
	                callback(res);
	            },
	            error: function(xhr, status, error) {
	                alert("sendProxyPostSync \uc624\ub958\ubc1c\uc0dd.\n check2!. status = " + status + ", error=" + error);
	            }
	        });
	    },
	    hasErr: function(objRes, objReq) {
	    	var nResElementSize  = $(objRes).length;
	    	var blnHasError = false;
	    	for(var i=0;i<nResElementSize;i++){
	    		var oTmp = $(objRes)[i];
	    		if(oTmp.attributes){
	    			if(oTmp.getElementsByClassName("error").length > 0){
	        			alert("Error Message - [" + oTmp.getElementsByClassName("error")[0].innerText +"]\n\n" + decodeURIComponent(decodeURIComponent(objReq.data)));
	        			blnHasError = true;
	        			break;
	        		}
	    		}
	    	}
	    	return blnHasError;
	    },
	    

		//=========================================================================
		//									GIS COMPUTE
		//=========================================================================
	    fn_get_DistanceBy2Point : function (_nX1, _nY1, _nX2, _nY2){
	    	var nDist;
	    	var nXdist = _nX2-_nX1;
	    	var nYdist = _nY2-_nY1;

	    	nDist = Math.sqrt(Math.pow(nXdist,2) + Math.pow(nYdist,2));

	    	return nDist;

	    },

	    fn_get_angleBy2Dist : function (_nYdist, _nXdist){
	    	var nRtnAngle = 0;
	    	nRtnAngle = Math.atan2(_nYdist,_nXdist);
	    	if(nRtnAngle < 0)
	    		return nRtnAngle += 2* Math.PI;
	    	else
	    		return nRtnAngle;
	    },

	    fn_get_angleToDegreeByDist : function(_nYdist, _nXdist){
	    	var nThetaRadian = Math.atan2(_nYdist, _nXdist);
	    	var nThetaDegree = (nThetaRadian/Math.PI*180) + (nThetaRadian > 0 ? 0 : 360);
	    	
	    	return nThetaDegree;
	    },

	    
		//=========================================================================
		//									Object
		//=========================================================================
	    deepCloneObject : function (_oObj)
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
	    },
	    
		//=========================================================================
		//									String
		//=========================================================================
		/**********************************************************************************
		 * 함수명 : fn_convert_pixel
		 * 설 명 : int 형 픽셀을 받아서 "px"를 리턴해준다.
		 * 인 자 : pixel (픽셀 값)
		 * 사용법 : Util.fn_convert_pixel(20)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_convert_pixel : function(pixel) {
			if(!this.fn_chk_pixel(pixel)) {
				if(!this.fn_chk_num(pixel)) {
					alert("숫자형 또는 pixel 형이 아닙니다. ex)123  or  123px");
					return false;
				}
				else {
					return pixel += "px";
				}
			}
			else {
				return pixel;
			}
		},
		
		/**********************************************************************************
		 * 함수명 : fn_convert_objToStr
		 * 설 명 : object 를 String의 연결 형태로 변형해준다.(1차 object 만 가능)
		 * 인 자 : obj (변형할 object), ch(연결 문자열)
		 * 사용법 : Util.fn_convert_objToStr(obj, ch)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_convert_objToStr : function(obj, ch) {
			var retVal = "";
			
			if(!ch) {
				ch = "&";
			}
			
			for(var i in obj) {
				retVal += ch;
				retVal += i;
				retVal += "=";
				retVal += obj[i];
			}
			
			return retVal.substr(1);
		},
		/**********************************************************************************
		 * 함수명 : fn_set_lpad
		 * 설 명 : 지정된 길이만큼 좌측에 특정문자열 채움
		 * 인 자 : str (기준문자열)
		 * 		  len (길이)
		 *        ch  (특정문자)	
		 * 사용법 : Util.fn_set_lpad("test",10,"0")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_set_lpad : function(str, len, ch) {
			var retVal = '';
			for(var i=str.length; i < len; i++) {
				if(ch) retVal += ch;
				else retVal += "0";
			}
			retVal += str;
			return retVal;
		},
		
		/**********************************************************************************
		 * 함수명 : fn_set_rpad
		 * 설 명 : 지정된 길이만큼 우측에 특정문자열 채움
		 * 인 자 : str (기준문자열)
		 * 		  len (길이)
		 *        ch  (특정문자)	
		 * 사용법 : Util.fn_set_rpad("test",10,"0")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_set_rpad : function(str, len, ch) {
			var retVal = '';
			retVal += str;
			for(var i=str.length; i < len; i++) {
				if(ch) retVal += ch;
				else retVal += "0";
			}
			return retVal;
		},
		
		/**********************************************************************************
		 * 함수명 : fn_replaceall
		 * 설 명 : 지정된 길이만큼 우측에 특정문자열 채움
		 * 인 자 : str (기준문자열)
		 * 		  from (변경될문자열)
		 *        to  (변경할문자열)	
		 * 사용법 : Util.fn_replaceall("test","")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_replaceAll : function(str, from, to) {
			return str.replace(new RegExp(from, "g"), to);
		},
		
		
		/**********************************************************************************
		 * 함수명 : fn_ltrim
		 * 설 명 : 좌측 공백 제거
		 * 인 자 : str (문자열)
		 * 사용법 : Util.fn_ltrim("   t  e s  t    ")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_ltrim : function(str) {
			return str.replace(/^\s\s*/, '');
		},
		
		/**********************************************************************************
		 * 함수명 : fn_rtrim
		 * 설 명 : 우측 공백 제거
		 * 인 자 : str (문자열)
		 * 사용법 : Util.fn_rtrim("   t  e s  t    ")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_rtrim : function(str) {
			return str.replace(/\s\s*$/, '');
		},
		
		/**********************************************************************************
		 * 함수명 : fn_trim
		 * 설 명 : 공백 제거
		 * 인 자 : str (문자열)
		 * 사용법 : Util.fn_trim("   t  e s  t    ")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_trim : function(str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		
		/**********************************************************************************
		 * 함수명 : fn_remove_space
		 * 설 명 : 문자열 공백 제거
		 * 인 자 : String (문자열)
		 * 사용법 : Util.fn_remove_space("   t  e s  t    ")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_remove_space : function(str) {
			return str.replace(/\s/g, '');
		},
		
		/**********************************************************************************
		 * 함수명 : fn_fmt_cur
		 * 설 명 : 통화 형태 반환
		 * 인 자 : number (숫자)
		 * 사용법 : Util.fn_fmt_cur(3215647)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_fmt_cur : function(number) {
			if(this.fn_chk_num(number)) {
				number += "";
			}
			
			return number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},
		
		/**********************************************************************************
		 * 함수명 : fn_fmt_fix
		 * 설 명 : 소수 점 아래 자리수
		 * 인 자 : number (실수), length (소수 아래 자리수)
		 * 사용법 : Util.fn_fmt_fix(256.1234, 2)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_fmt_fix : function(number, length) {
			var temp = Math.pow(10, length);
			
			return Math.round(number * temp) / temp;
		},
		

	    

		//=========================================================================
		//									Number
		//=========================================================================

		fn_get_random : function(max) {
			return Math.floor(Math.random() * max);
		},
	    

	    

		//=========================================================================
		//									Array
		//=========================================================================
		/**********************************************************************************
		 * 함수명 : fn_contain
		 * 설 명 : 배열에 포함 여부 반환
		 * 인 자 : arr (기준 배열), str (찾을 문자열 값)
		 * 사용법 : Util.Array.fn_contain(['a','b','c','d'], 'a')
		 * 작성일 : 2011.05.20
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_contain : function(arr, str) {
			for(var i in arr) {
				if(arr[i] == str) {
					return true;
				}
			}
			return false; 
		},
		
		/**********************************************************************************
		 * 함수명 : fn_swap_element
		 * 설 명 : 배열 원소 
		 * 인 자 : arr (기준 배열), origin (변경할 배열인덱스), target (대상 배열 인덱스)
		 * 사용법 : Util.Array.fn_swap_element(['a','b','c','d'], 1, 3)
		 * 작성일 : 2011.05.26
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2011.05.26		최원석			최초 생성
		 * 
		 **********************************************************************************/
		fn_swap_element : function(arr, origin, target) {
			var tmp = arr[origin];
			arr[origin] = arr[target];
			arr[target] = tmp;
		},
		
		/**********************************************************************************
		 * 함수명 : fn_isArray
		 * 설 명 : 배열 여부 판별
		 * 인 자 : arr (대상 객체)
		 * 사용법 : Util.Array.fn_isArray(['a','b','c','d'])
		 * 작성일 : 2011.07.06
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2011.07.06		최원석			최초 생성
		 * 
		 **********************************************************************************/
		fn_isArray : function(arr) {
			if(arr instanceof Array) {
				return true;
			}
			else {
				return false;
			}
		},

		//=========================================================================
		//									Date
		//=========================================================================
		/**********************************************************************************
		 * 함수명 : fn_getDateTime
		 * 설 명 : 현재 날짜 시간 리턴
		 * 인 자 : type (반환할 타입)
		 *	  options
		 		- y	: 년도
		 		- m	: 월
		 		- h : 시간
		 		- M : 분
		 		- s : 초
		 * 사용법 :  Util.fn_getDateTime()
		 * 			Util.fn_getDateTime('y')
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_get_now : function(type) {
			var date = new Date();
			switch(type) {
				case 'y' : return date.getYear();
				case 'm' : return date.getMonth()+1;
				case 'd' : return date.getDate();
				case 'h' : return date.getHours();
				case 'M' : return date.getMinutes();
				case "s" : return date.getSeconds(); 
			}
			
			return date;
		},
		


		//=========================================================================
		//									Validation
		//=========================================================================
		/**********************************************************************************
		 * 함수명 : fn_chk_length
		 * 설 명 : 문자 길이 체크
		 * 인 자 : str (문자열), len (길이)
		 * 사용법 : Util.fn_chk_length("test", 4)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_length : function(str, len) {
			return (str.length == len);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_chk_number
		 * 설 명 : 숫자형 여부 체크
		 * 인 자 : str (문자열)
		 * 사용법 : Util.fn_chk_length(1234)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_num : function(str) {
			var regExp = /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/;
			return regExp.test(str);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_chk_tel
		 * 설 명 : 전화번호 여부 체크
		 * 인 자 : str (전화번호 '-'으로 구분된)
		 * 사용법 : Util.fn_chk_tel(010-000-0000)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_tel : function(str) {
			var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
			return regExp.test(str);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_chk_ema
		 * 설 명 : email 여부 체크
		 * 인 자 : email (email)
		 * 사용법 : Util.fn_chk_tel(010-000-0000)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_ema : function(str) {
			var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
			return regExp.test(str);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_chk_pixel
		 * 설 명 : pixel 형식 여부 확인 (크로스 브라우징 문제 해결)
		 * 인 자 : pixel (픽셀 값)
		 * 사용법 : Util.fn_chk_pixel(50)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_pixel : function(pixel) {
			var regExp = /^\d+px/;
			return regExp.test(pixel);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_chk_url
		 * 설 명 : Url 형식 여부 확인 (크로스 브라우징 문제 해결)
		 * 인 자 : str (url)
		 * 사용법 : Util.fn_chk_url("http://www.g-inno.com")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_url : function(str) {
			var regExp = /(\w+):\/\/([^\/:]+)(:\d*)?([^# ]*)/;
			return regExp.test(str);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_chk_ip
		 * 설 명 : IP 형식 여부 확인 (크로스 브라우징 문제 해결)
		 * 인 자 : str (IP Adress)
		 * 사용법 : Util.fn_chk_ip("203.236.231.7")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_chk_ip : function(str) {
			var regExp = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
			return regExp.test(str);
		},
		
		isEmptyObject : function (_oObj)
		{
			var sName;
			for ( sName in _oObj ) {
				return false;
			}
			return true; 
		},

		//=========================================================================
		//									Event
		//=========================================================================
		/**********************************************************************************
		 * 함수명 : fn_deactive_rightClick
		 * 설 명 : 마우스 우클릭 방지
		 * 사용법 : Util.fn_deactive_rightClick()
		 * 작성일 : 2011.04.28
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_deactive_rightClick : function() {
			document.oncontextmenu = function(){return false;}
		},
		
		/**********************************************************************************
		 * 함수명 : fn_redirect_page
		 * 설 명 : 페이지 이동
		 * 인 자 : url (이동 할 url)
		 * 사용법 : Util.fn_redirect_page("http://www.g-inno.com")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_redirect_page : function(url) {
			document.location.href = url;
		},
		


		//=========================================================================
		//									Popup
		//=========================================================================
		/**********************************************************************************
		 * 함수명 : fn_pop_win
		 * 설 명 : 페이지 이동
		 * 인 자 : url (팝업으로 열 주소), name (팝업 타켓 or 팝업명), options (팝업 옵션)
		 * 	options
		 		- name : 팝업 명
		 		- width : 팝업 가로 사이
		 		- height : 팝업 높이 
		 		- scrollbars : 스크롤 여부
		 		- toolbar : 툴 바
		 		- menubars : 메뉴 바
		 		- locationbar : 로케이션 바
		 		- statusbar : 상태 바
		 		- resizable : 리 사이징
		 		- titlebar : 타이틀 바
		 		- left : 팝업 가로 위치
		 		- top : 팝업 세로 위치
		 		- message : 팝업 창이 막혀 있을 때 메시지
		 		
		 * 사용법 : Util.fn_pop_win(url, options)
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_pop_win : function(url, name, options) {
			//url Check
			if(!url) {
				alert("Url(주소)는 필수 입력 대상 입니다.");
				return;
			}
			
			//default 항상 새 창으로
			if(!name) {
				name = "_blank";
			}
			
			//default options
			var optObj = {
			    'width'  : '300px' ,
			    'height' : '300px' ,
			    'scrollbars' : 'yes' ,
			    'toolbar' : 'no'    ,
			    'menubars' : 'no'   ,
			    'locationbar' : 'no'  ,
			    'statusbar'   : 'no'  ,
			    'resizable'   : 'no' ,
			    'titlebar'    : 'no'  ,
			    'left'    : '0px'  ,
			    'top'     : '0px'  ,
			    'message' : '팝업차단을 해제해주세요.'
			};
			
			$.extend(optObj, options);
			
			
			//pixel or int type Check
			if(!(optObj.width = this.fn_convert_pixel(optObj.width))) {
				return;
			}
			if(!(optObj.height = this.fn_convert_pixel(optObj.height))) {
				return;
			}
			if(!(optObj.left = this.fn_convert_pixel(optObj.left))) {
				return;
			}
			if(!(optObj.top = this.fn_convert_pixel(optObj.top))) {
				return;
			}
			
			var optStr = this.fn_convert_objToStr(optObj, ",");
			
			var popup = window.open(url, name, optStr);
			
			if(!popup) {
				alert(optObj.message);
				return false;
			}
			else {
				popup.focus();	
			}
		},
		
		showMessage : function (_sMsg, _nTimeOut){
			
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
		},

		//=========================================================================
		//									Encode
		//=========================================================================
		/**********************************************************************************
		 * 외부 자료 가져 옴
		 * Base64 Encoding, Decoding
		 * 출처 : http://www.webtoolkit.info/javascript-base64.html
		 **********************************************************************************/
		Base64 : {
			// private property
			_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		 
			// public method for encoding
			encode : function (input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
		 
				input = this._utf8_encode(input);
		 
				while (i < input.length) {
		 
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
		 
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
		 
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
		 
					output = output +
					this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
					this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		 
				}
		 
				return output;
			},
		 
			// public method for decoding
			decode : function (input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
		 
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		 
				while (i < input.length) {
		 
					enc1 = this._keyStr.indexOf(input.charAt(i++));
					enc2 = this._keyStr.indexOf(input.charAt(i++));
					enc3 = this._keyStr.indexOf(input.charAt(i++));
					enc4 = this._keyStr.indexOf(input.charAt(i++));
		 
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
		 
					output = output + String.fromCharCode(chr1);
		 
					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
		 
				}
		 
				output = this._utf8_decode(output);
		 
				return output;
		 
			},
		 
			// private method for UTF-8 encoding
			_utf8_encode : function (string) {
				string = string.replace(/\r\n/g,"\n");
				var utftext = "";
		 
				for (var n = 0; n < string.length; n++) {
		 
					var c = string.charCodeAt(n);
		 
					if (c < 128) {
						utftext += String.fromCharCode(c);
					}
					else if((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					}
					else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
		 
				}
		 
				return utftext;
			},
		 
			// private method for UTF-8 decoding
			_utf8_decode : function (utftext) {
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;
		 
				while ( i < utftext.length ) {
		 
					c = utftext.charCodeAt(i);
		 
					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					}
					else if((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i+1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					}
					else {
						c2 = utftext.charCodeAt(i+1);
						c3 = utftext.charCodeAt(i+2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
		 
				}
				return string;
			}
		},

		
		/**********************************************************************************
		 * 함수명 : fn_enc_base64
		 * 설 명 : 페이지 이동
		 * 인 자 : str (문자열)
		 * 사용법 : Util.fn_enc_base64("test")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_enc_base64 : function(str) {
			return this.Base64.encode(str);
		},
		
		/**********************************************************************************
		 * 함수명 : fn_dec_base64
		 * 설 명 : 페이지 이동
		 * 인 자 : str (문자열)
		 * 사용법 : Util.fn_dec_base64("dGVzdA==")
		 * 작성일 : 2011.04.15
		 * 작성자 : 기술개발팀 최원석
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 
		 **********************************************************************************/
		fn_dec_base64 : function(str) {
			return this.Base64.decode(str);
		},

		


		//=========================================================================
		//									Error
		//=========================================================================
		debug : false,
		
		create_obj : function(obj, msg) {
			if(this.debug) alert(obj.CLASS_NAME + " 객체 생성 오류 : " + msg + "은(는) 필수 프로퍼티 입니다.");
		},
		
		//일단 보류
		call_function : function(obj, fnName, msg) {
			//if(this.debug) alert(obj.CLASS_NAME + " : " + fnName + " : "
		}
};
 
 



/*=[ Bounds.js ]==========================================================================*/

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



/*=[ DrawFeature.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : DrawFeature.js
 * 설 명 : OpenLayers.Control.DrawFeature 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.05.04		최원석				0.1					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Control.DrawFeature = OpenLayers.Class(OpenLayers.Control.DrawFeature, {
	
	inputTextPopup : null,
	
	seq : 0,
	
	drawFeature: function(geometry, attributes) {
		if (attributes && attributes.featureType && attributes.featureType == 'Text') {
			this.removeInputTextPopup();
		}
		
		attributes.seq = this.seq;
		this.seq++;
		
        var feature = new OpenLayers.Feature.Vector(geometry, attributes);
        var proceed = this.layer.events.triggerEvent(
            "sketchcomplete", {feature: feature}
        );
        if(proceed !== false) {
            feature.state = OpenLayers.State.INSERT;
            this.layer.addFeatures([feature]);
            this.featureAdded(feature);
            this.events.triggerEvent("featureadded",{feature : feature});
        }
		
		if (attributes && attributes.featureType && attributes.featureType == 'Text') {
			this.addInputTextPopup(feature);
		}
		
    },
	
	addInputTextPopup : function(feature) {
		var contentHtml = "";
		contentHtml += 	"<div class='olControlDrawInputText'>";
		contentHtml += 		"<textarea class='olControlDrawInputTextArea'></textarea>";
		contentHtml += 		"<img class='olControlDrawInputTextConfirm' src='/images/usolver/com/map/btn_submit.gif' alt='확인' title='확인' />";
		contentHtml += 		"<img class='olControlDrawInputTextCancel' src='/images/usolver/com/map/btn_close.gif' alt='닫기' title='닫기' />";
		contentHtml +=	"</div>";
		
		var lonlat = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
		this.inputTextPopup = new NUTs.Popup("drawInputText", lonlat, new OpenLayers.Size(500, 200), contentHtml, new OpenLayers.Pixel(0,0));
		
		this.map.addPopup(this.inputTextPopup);

		this.inputTextPopup.updateSize();
		this.inputTextPopup.type = "draw";
		
		$(".olControlDrawInputTextArea").focus();
		
		$(".olControlDrawInputTextConfirm").click(this, function() {
			arguments[0].data.addTextPopup();
		});
		
		$(".olControlDrawInputTextCancel").click(this, function() {
			arguments[0].data.removeInputTextPopup();
		});
	},
	
	removeInputTextPopup : function() {
		if (this.inputTextPopup) {
			this.map.removePopup(this.inputTextPopup);
			this.inputTextPopup = null;
		}
		
		var len = this.layer.features.length;
		for(var i=len-1; i >=0; i--) {
			if(this.layer.features[i].attributes.featureType == "Text") {
				this.layer.removeFeatures(this.layer.features[i]);	
			}
		}
	},
	
	addTextPopup : function() {
		var str = $(".olControlDrawInputTextArea").val();
		
		if(NUTs.Util.fn_trim(str) == "") return;
		
		str = str.replace(/\x20/gi, "&nbsp;");
		str = str.replace(/\x0D\x0A/gi, "<br/>");
		str = str.replace(/\x0D/gi, "<br/>");
		str = str.replace(/\n/gi, "<br/>");
		
		var contentHtml = "";
		contentHtml += "<div class='olControlDrawText off' id='drawText" + this.seq + "'>" + str + "</div>";
		
		var lonlat = this.inputTextPopup.getLonLat();

		var popup = new NUTs.Popup("drawPopup" + this.seq, lonlat, null, contentHtml, new OpenLayers.Pixel(0,0));
		
		this.map.addPopup(popup);

		popup.updateSize();
		popup.type = "draw";
		
		popup.attributes = {
			'featureType' : 'Text',
			'fontFamily' : $("#drawText"+this.seq).css('font-family'),
			'fontSize' : $("#drawText"+this.seq).css('font-size').replace("px", ""),
			'fontColor' : $("#drawText"+this.seq).css('color'),
			'seq' : this.seq,
			'text' : $(".olControlDrawInputTextArea").val(),
			'print' : true
		};
		
		this.seq++;
		
		$(".olControlDrawText").unbind();
		$(".olControlDrawText").click(this.map, function() {
			var map = arguments[0].data;
			if(map.getControl("drawSelect") && map.getControl("drawSelect").active) {
				map.getControl("drawSelect").selectTextPopup(this);
			}
			else if(map.getControl("drawEdit") && map.getControl("drawEdit").active) {
				map.getControl("drawEdit").selectTextPopup(this);
			}
		});
		
		this.removeInputTextPopup();
	},
	
	removeTextPopup : function() {
		var id;
		
		$(".olControlDrawText").each(function() {
			$(this).hasClass("on");
			id = $(this).attr("id");
			return;
		});
		
		for(var i in this.map.popups) {
			if(this.map.popups[i].id == id) {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
	CLASS_NAME: "NUTs.Control.DrawFeature"
});



/*=[ FeaturePopups.js ]==========================================================================*/

/* Copyright 2011-2015 by Xavier Mamano http://github.com/jorix/OL-FeaturePopups
 * Published under MIT license. */

/**
 * @requires OpenLayers/Control/SelectFeature.js
 * @requires OpenLayers/Lang.js
 * @requires OpenLayers/Popup.js
 */

/**
 * Class: OpenLayers.Control.FeaturePopups
 * The FeaturePopups control selects vector features from a given layers on
 * click and hover and can show the feature attributes in a popups.
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */
NUTs.Control.FeaturePopups = OpenLayers.Class(OpenLayers.Control, {

    /**
     * APIProperty: mode
     * To enable or disable the various behaviors of the control.
     *
     * Use bitwise operators and one or more <OpenLayers.Control.FeaturePopups>:
     *  NONE - To not activate any particular behavior.
     *  CLOSE_ON_REMOVE -Popups will close when removing features in a layer,
     *     is ignored when used in conjunction with SAFE_SELECTION.
     *  SAFE_SELECTION - Features will remain selected even have been removed
     *     from the layer. Is useful when using <OpenLayers.Strategy.BBOX> with
     *     features with "fid" or when using <OpenLayers.Strategy.Cluster>.
     *     Using "BBOX" when a feature is added back to the layer will be
     *     re-selected automatically by "fid".
     *  CLOSE_ON_UNSELECT - Popups will close when unselect the feature.
     *  CLOSE_BOX - Display a close box inside the popups.
     *  UNSELECT_ON_CLOSE - To unselect all features when a popup is closed.
     *  DEFAULT - Includes default behaviors SAFE_SELECTION |
     *      CLOSE_ON_UNSELECT | CLOSE_BOX | UNSELECT_ON_CLOSE
     *
     * Default is <OpenLayers.Control.FeaturePopups.DEFAULT>.
     */
    mode: null,

    /**
     * APIProperty: autoActivate
     * {Boolean} Activate the control when it is added to a map. Default is
     *     true.
     */
    autoActivate: true,

    /**
     * APIProperty: selectOptions
     * {Object|null} Used to set non-default properties on SelectFeature control
     *     dedicated to select features. When using a null value the select
     *     features control is not created. The default is create the control.
     *
     * Default options other than SelectFeature control:
     * - clickout: false
     * - multipleKey: 'shiftKey'
     * - toggleKey: 'shiftKey'
     *
     * Options ignored:
     * - highlightOnly: always false.
     * - box: always false (use <boxSelectionOptions>).
     */
    selectOptions: null,

    /**
     * APIProperty: boxSelectionOptions
     * {Object|null} Used to set non-default properties on
     *     <OpenLayers.Handler.Box> dedicated to select features by a box.
     *     When using a null value the handler is not created.
     *     The default is do not create the handler, so don't use box selection.
     *
     * Default options other than Box handler:
     * - KeyMask: OpenLayers.Handler.MOD_CTRL
     * - boxDivClassName: 'olHandlerBoxSelectFeature'
     */
    boxSelectionOptions: null,

    /**
     * APIProperty: hoverOptions
     * {Object|null} Used to set non-default properties on SelectFeature control
     *     dedicated to highlight features. When using a null value (or
     *     selectOptions.hover == true) the highlight features control is
     *     not created. The default is create the control.
     *
     * Options ignored:
     * - hover: always true
     * - highlightOnly: always true
     * - box: always false (use <boxSelectionOptions>).
     */
    hoverOptions: null,

    /**
     * APIProperty: popupOptions
     * {Object} Options used to create a popup manager for hover & selections,
     *     see defaults for any valid keys.
     *
     * May contain 5 valid keys: "hover","hoverList", "list", "single" and,
     *     "listItem". To not use the popups associated with a key set the value
     *     of the key to null.
     *
     * For more details of valid options for any key see
     *     <FeaturePopups.Popup.Constructor>.
     *
     * NOTE: Use this keys instead of <popupHoverOptions>,
     *     <popupHoverListOptions>, <popupListOptions>, <popupSingleOptions> and
     *     <popupListItemOptions>.
     *
     * Default options for "hover":
     * popupClass - <OpenLayers.Popup.Anchored>
     * panMapIfOutOfView - false
     * followCursor - true
     * anchor - {size: new OpenLayers.Size(15, 19),
     *           offset: new OpenLayers.Pixel(-1, -1)}
     * relatedToClear - ["hoverList"]
     *
     * Default options for "hoverList":
     * popupClass - <OpenLayers.Popup.Anchored>
     * panMapIfOutOfView - false
     * followCursor - true
     * anchor - {size: new OpenLayers.Size(15, 19),
     *           offset: new OpenLayers.Pixel(-1, -1)}
     * relatedToClear - ["hover"]
     *
     * Default options for "list":
     * popupClass - <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     * unselectFunction - Depends on the <FeaturePopups.mode> (internal use)
     * closeBox - Depends on the <FeaturePopups.mode> (internal use)
     * observeItems - true (internal use)
     * relatedToClear - ["hover", "hoverList", "listItem", "single"]
     *
     * Default options for "single":
     * popupClass - <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     * unselectFunction - Depends on the <mode> (internal use)
     * closeBox - Depends on the <mode> (internal use)
     * relatedToClear: ["hover", "hoverList", "listItem", "list"]
     *
     * Default options for "listItem":
     * popupClass -  <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     * closeBox - Depends on the <mode> (internal use)
     * relatedSimultaneous - {axis: "v", related: "list"} (internal use)
     * relatedToClear - ["single"]
     */
    popupOptions: null,

    /**
     * APIProperty: popupHoverOptions
     * {Object} Options used to create a popup manager to highlight on hover.
     *     See <FeaturePopups.Popup> constructor options for more details.
     *
     * Default options:
     * popupClass - <OpenLayers.Popup.Anchored>
     * panMapIfOutOfView - false
     *
     * Default options for internal use:
     * followCursor - true
     * anchor - {size: new OpenLayers.Size(15, 19),
     *                                     offset: new OpenLayers.Pixel(-1, -1)}
     * relatedToClear - ["hoverList"]
     */
    popupHoverOptions: null,

    /**
     * APIProperty: popupHoverListOptions
     * {Object} Options used to create a popup manager for highlight on
     *     hover a cluster. See <FeaturePopups.Popup> constructor options
     *     for more details.
     *
     * Default options:
     * popupClass - <OpenLayers.Popup.Anchored>
     * panMapIfOutOfView - false
     *
     * Default options for internal use:
     * followCursor - true
     * anchor - {size: new OpenLayers.Size(15, 19),
     *                                     offset: new OpenLayers.Pixel(-1, -1)}
     * relatedToClear - ["hover"]
     */
    popupHoverListOptions: null,

    /**
     * APIProperty: popupSingleOptions
     * {Object} Options used to create a popup manager for single selections.
     *     See <FeaturePopups.Popup> constructor options for more details.
     *
     * Default options:
     * popupClass - <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     *
     * Default options for internal use:
     * unselectFunction - Depends on the <mode>
     * closeBox - Depends on the <mode>
     * relatedToClear: ["hover", "hoverList", "list", "listItem"]
     */
    popupSingleOptions: null,

    /**
     * APIProperty: popupListOptions
     * {Object} Options used to create a popup manager for multiple selections.
     *     See <FeaturePopups.Popup> constructor options for more details.
     *
     * Default options:
     * popupClass - <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     *
     * Default options for internal use:
     * unselectFunction - Depends on the <mode>
     * closeBox - Depends on the <mode>
     * observeItems - true
     * relatedToClear - ["hover", "hoverList", "single", "listItem"]
     */
    popupListOptions: null,

    /**
     * APIProperty: popupListItemOptions
     * {Object} Options used to create the popup manager for show a single item
     *     into a multiple selection. See <FeaturePopups.Popup> constructor
     *     options for more details.
     *
     * Default options:
     * popupClass -  <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     *
     * Default options for internal use:
     * closeBox - Depends on the <mode>
     * relatedToClear - ["single"]
     * relatedSimultaneous - {axis: "v", related: "list"}
     */
    popupListItemOptions: null,

    /**
     * APIProperty: layerListTemplate
     * Default is
     *    "<h2>${layer.name} - ${count}</h2><ul>${html}</ul>"
     */
    layerListTemplate: '<h2>${layer.name} - ${count}</h2><ul>${html}</ul>',

    /**
     * APIProperty: hoverClusterTemplate
     * Default is
     *   "Cluster with ${cluster.length} features<br>on layer \"${layer.name}\""
     */
    hoverClusterTemplate:
      "${i18n('Cluster with ${count} features<br>on layer \"${layer.name}\"')}",

    /**
     * Property: selectingSet
     * {Boolean} The control set to true this property while being selected a
     *    set of features to can ignore individual selection, internal use only.
     */
    selectingSet: false,

    /**
     * Property: unselectingAll
     * {Boolean} The control set to true this property while being unselected
     *     all features to can ignore individual unselection, internal use only.
     */
    unselectingAll: false,

    /**
     * Property: hoverListeners
     * {Object} hoverListeners object will be registered with
     *     <OpenLayers.Events.on> on hover control, internal use only.
     */
    hoverListeners: null,

    /**
     * Property: popupObjs
     * {Object} Internal use only.
     */
    popupObjs: null,

    /**
     * Property: controls
     * {Object} Internal use only.
     */
    controls: null,

    /**
     * Property: layerObjs
     * {Object} stores templates and others objects of this control's layers,
     *     internal use only.
     */
    layerObjs: null,

    /**
     * Property: layers
     * {Array(<OpenLayers.Layer.Vector>)} The layers this control will work on,
     *     internal use only.
     */
    layers: null,

    /**
     * Constructor: OpenLayers.Control.FeaturePopups
     * Create a new control that internally uses two
     *     <OpenLayers.Control.SelectFeature> one for selecting features, and
     *     another only to highlight them by hover (see <selectOptions>,
     *     and <hoverOptions>). This control can use also a
     *     <OpenLayers.Handler.Box> to select features by a box, see
     *     <boxSelectionOptions> .
     *
     * The control can generates three types of popup: "hover", "single" and
     *     "list", see <addLayer>.
     * Each popup has a displayClass according to their type:
     *     "[displayClass]_hover" ,"[displayClass]_select" and
     *     "[displayClass]_list" respectively.
     *
     * options - {Object}
     */
    initialize: function(options) {
        // Options
        // -------
        var MODES = OpenLayers.Control.FeaturePopups;
        options = OpenLayers.Util.applyDefaults(options, {
            mode: MODES.DEFAULT
        });
        var layers = options.layers;
        delete options.layers;
        OpenLayers.Control.prototype.initialize.call(this, options);

        // Internal Objects
        // ----------------
        this.layerObjs = {};
        this.layers = [];

        // Controls
        // --------
        this.controls = {};
        var self = this; // to do some tricks.

        // Hover control
        if (options.hoverOptions !== null &&
                            !(this.selectOptions && this.selectOptions.hover)) {
            var hoverOptions = OpenLayers.Util.extend(this.hoverOptions, {
                hover: true,
                highlightOnly: true,
                box: false
            });
            var hoverClass = OpenLayers.Class(
                                             OpenLayers.Control.SelectFeature, {
                // Trick to close hover popup when over a selected feature and
                //     leave it.
                outFeature: function(feature) {
                    if (feature._lastHighlighter === this.id) {
                        if (feature._prevHighlighter &&
                                    feature._prevHighlighter !== this.id) {
                            this.events.triggerEvent(
                                    'featureunhighlighted', {feature: feature});
                        }
                    }
                    OpenLayers.Control.SelectFeature.prototype.outFeature
                                                        .apply(this, arguments);
                }
            });
            var controlHover = new hoverClass([], hoverOptions);
            this.hoverListeners = {
                scope: this,
                featurehighlighted: this.onFeaturehighlighted,
                featureunhighlighted: this.onFeatureunhighlighted
            };
            controlHover.events.on(this.hoverListeners);
            this.controls.hover = controlHover;
        }

        // Select control
        if (options.selectOptions !== null) {
            var selOptions = OpenLayers.Util.applyDefaults(this.selectOptions, {
                clickout: false,
                multipleKey: 'shiftKey',
                toggleKey: 'shiftKey'
            });
            OpenLayers.Util.extend(selOptions,
                                            {box: false, highlightOnly: false});
            var selectClass = OpenLayers.Class(
                                             OpenLayers.Control.SelectFeature, {
                // Trick to close hover popup when the feature is selected.
                highlight: function(feature) {
                    var _lastHighlighter = feature._lastHighlighter;
                    OpenLayers.Control.SelectFeature.prototype.highlight.apply(
                                                    this, arguments);
                    if (controlHover && _lastHighlighter &&
                                _lastHighlighter !== feature._lastHighlighter) {
                        controlHover.events.triggerEvent(
                                    'featureunhighlighted', {feature: feature});
                    }
                }
            });
            var control = new selectClass([], selOptions);
            if (this.boxSelectionOptions) {
                // Handler for the trick to manage selection box.
                this.handlerBox = new OpenLayers.Handler.Box(
                    this, {
                        done: this.onSelectBox
                    },
                    OpenLayers.Util.applyDefaults(this.boxSelectionOptions, {
                        boxDivClassName: 'olHandlerBoxSelectFeature',
                        keyMask: OpenLayers.Handler.MOD_CTRL
                    })
                );
            }
            // Trick to refresh popups when click a feature of a multiple
            //     selection.
            control.unselectAll = function(options) {
                self.unselectingAll = true;
                OpenLayers.Control.SelectFeature.prototype.unselectAll.apply(
                                          this, arguments);
                self.unselectingAll = false;

                var exceptLayerId,
                    layerObjs = self.layerObjs;
                if (options && options.except) {
                    exceptLayerId = options.except.layer.id;
                }
                var layers = this.layers || [this.layer];
                for (var i = 0, len = layers.length; i < len; i++) {
                    var layerId = layers[i].id,
                    layerObj = layerObjs[layerId];
                    if (layerObj) {
                        if (layerObj.safeSelection) {
                            layerObj.selection = {}; // clear selection storage
                            layerObj.refreshSelection();
                            if (layerId === exceptLayerId) {
                                layerObj.storeAsSelected(options.except);
                                // Force refreshSelection() if the 
                                //    feature excepted is selected.
                                var selFeats = layerObj.layer.selectedFeatures;
                                if (selFeats.length &&
                                         selFeats[0].id === options.except.id) {
                                    layerObj.refreshSelection();
                                }
                            }
                        } else {
                            layerObj.refreshSelection();
                        }
                    }
                }
                self.refreshLayers();
            };
            this.controls.select = control;
        }

        // Popup Object Managers
        // ---------------------
        var _closeBox = !!(this.mode & MODES.CLOSE_BOX),
            _unselectFunction = (
                this.mode & MODES.UNSELECT_ON_CLOSE ?
                function() {
                    self.unselectGeneric();
                } :
                null
            );
        var defaultPopupOptions = {
            list: {
                popupClass: OpenLayers.Popup.FramedCloud,
                panMapIfOutOfView: true,
                // options for internal use
                closeBox: _closeBox,
                unselectFunction: _unselectFunction,
                observeItems: true,
                relatedToClear: ['hover', 'hoverList', 'single', 'listItem']
            },
            single: {
                popupClass: OpenLayers.Popup.FramedCloud,
                panMapIfOutOfView: true,
                // options for internal use
                closeBox: _closeBox,
                unselectFunction: _unselectFunction,
                relatedToClear: ['hover', 'hoverList', 'list', 'listItem']
            },
            listItem: {
                popupClass: OpenLayers.Popup.FramedCloud,
                panMapIfOutOfView: true,
                // options for internal use
                closeBox: _closeBox,
                relatedToClear: ['single'],
                relatedSimultaneous: {axis: 'v', related: 'list'}
            },
            hover: {
                popupClass: OpenLayers.Popup.Anchored,
                panMapIfOutOfView: false,
                // options for internal use
                followCursor: true,
                anchor: {
                    size: new OpenLayers.Size(15, 19),
                    offset: new OpenLayers.Pixel(-1, -1)
                },
                relatedToClear: ['hoverList']
            },
            hoverList: {
                popupClass: OpenLayers.Popup.Anchored,
                panMapIfOutOfView: false,
                // options for internal use
                followCursor: true,
                anchor: {
                    size: new OpenLayers.Size(15, 19),
                    offset: new OpenLayers.Pixel(-1, -1)
                },
                relatedToClear: ['hover']
            }
        };
        var popupOptions = options.popupOptions;
        if (!popupOptions) {
            popupOptions = {
                list: options.popupListOptions,
                single: options.popupSingleOptions,
                listItem: options.popupListItemOptions,
                hover: options.popupHoverOptions,
                hoverList: options.popupHoverListOptions
            };
        }
        this.popupObjs =
            OpenLayers.Control.FeaturePopups_Utils.createPopupObjs(
                                       this, popupOptions, defaultPopupOptions);

        // Add layers
        // ----------------
        layers && this.addLayers(layers);
    },

    /**
     * APIMethod: destroy
     */
    destroy: function() {
        if (!this.events) {
        // Don't destroy again (if events === null then control was destroyed)
            return;
        }
        this.deactivate();
        for (var popupType in this.popupObjs) {
            this.popupObjs[popupType].destroy();
        }
        this.popupObjs = null;

        for (var layerId in this.layerObjs) {
            this.layerObjs[layerId].destroy();
        }
        this.layerObjs = null;

        this.layers = null;
        this.handlerBox && this.handlerBox.destroy();
        this.handlerBox = null;

        var controls = this.controls;
        // Another process may have destroyed the controls, don't destroy again.
        controls.select && controls.select.events &&
                                                 this.controls.select.destroy();
        if (controls.hover && controls.hover.events) {
            controls.hover.events.un(this.hoverListeners);
            controls.hover.destroy();
        }
        this.controls = null;

        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: draw
     * This control does not have HTML component, so this method should
     *     be empty.
     */
    draw: function() {},

    /**
     * APIMethod: activate
     * Activates the control.
     *
     * Returns:
     * {Boolean} The control was effectively activated.
     */
    activate: function() {
        if (!this.events) { // This should be in OpenLayers.Control: Can not
                            //     activate a destroyed control.
            return false;
        }
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.map.events.on({
                scope: this,
                'addlayer': this.onAddlayer,
                'removelayer': this.onRemovelayer,
                'changelayer': this.onChangelayer
            });
            var controls = this.controls;
            if (controls.hover) {
                controls.hover.setLayer(this.layers.slice());
                controls.hover.activate();
            }
            this.handlerBox && this.handlerBox.activate();
            if (controls.select) {
                controls.select.setLayer(this.layers.slice());
                controls.select.activate();
            }
            for (var layerId in this.layerObjs) {
                this.layerObjs[layerId].activate();
            }
            this.refreshLayers();
            return true;
        } else {
            return false;
        }
    },

    /**
     * APIMethod: deactivate
     * Deactivates the control.
     *
     * Returns:
     * {Boolean} The control was effectively deactivated.
     */
    deactivate: function() {
        if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.map.events.un({
                scope: this,
                'addlayer': this.onAddlayer,
                'removelayer': this.onRemovelayer,
                'changelayer': this.onChangelayer
            });
            for (var layerId in this.layerObjs) {
                this.layerObjs[layerId].deactivate();
            }
            this.handlerBox && this.handlerBox.deactivate();
            var controls = this.controls;
            // OL bug: Another process may have destroyed the controls, then
            //         deactivate fails (if events === null then the control was
            //         destroyed)
            controls.hover && controls.hover.events &&
                                                    controls.hover.deactivate();
            controls.select && controls.select.events &&
                                                   controls.select.deactivate();
            for (var popupType in this.popupObjs) {
                this.popupObjs[popupType].clearPopup();
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * Method: setMap
     * Set the map property for the control.
     *
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function(map) {
        if (this.boxSelectionOptions &&
            this.boxSelectionOptions.keyMask === OpenLayers.Handler.MOD_CTRL) {
        // To disable the context menu for machines which use CTRL-Click as
        //      a right click.
            map.viewPortDiv.oncontextmenu = OpenLayers.Function.False;
        }
        this.controls.hover && map.addControl(this.controls.hover);
        this.controls.select && map.addControl(this.controls.select);
        this.handlerBox && this.handlerBox.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },

    /**
     * Method: onAddlayer
     * Listens only if the control it is active, internal use only.
     */
    onAddlayer: function(evt) {
        var layerObj = this.layerObjs[evt.layer.id];
        if (layerObj) {
            // Set layers in the control when added to the map after activating
            //     this control.
            var controls = this.controls;
            controls.hover && controls.hover.setLayer(this.layers.slice());
            controls.select && controls.select.setLayer(this.layers.slice());
            layerObj.activate();
            this.refreshLayers();
        }
    },

    /**
     * Method: onRemovelayer
     * Internal use only.
     */
    onRemovelayer: function(evt) {
        this.removeLayer(evt.layer);
    },

    /**
     * Method: onChangelayer
     * Internal use only.
     */
    onChangelayer: function(evt) {
        var layerObj = this.layerObjs[evt.layer.id];
        if (layerObj && evt.property === 'visibility') {
            layerObj.refreshFeatures();
            this.refreshLayers();
        }
    },

    /**
     * APIMethod: clear
     * Clear selecction and popups.
     */
    clear: function() {
        this.unselectAll();
        for (var layerId in this.layerObjs) {
            this.layerObjs[layerId].clear();
        }
        for (var key in this.popupObjs) {
            this.popupObjs[key].clearPopup();
        }
    },

    /**
     * APIMethod: addLayer
     * Add the layer to control and assigns it the templates, see options.
     *
     * To add a layer that has already been added (maybe automatically),
     *     first must be removed using <removeLayer>.
     *
     * Templates containing patterns as ${i18n("key")} are internationalized
     *     using <OpenLayers.i18n> function.
     *
     * The control uses the patterns as ${showPopup()} in a "item" template
     *     to show individual popups from a list. This pattern becomes a
     *     combination of the layer.id+feature.id and can be used only as an
     *     html attribute.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>}
     * options - {Object} Optional
     *
     * Valid options:
     * templates - {Object} Templates
     * listContext - {Object} Contains the keys with the values that were used
     *     instead of values of context used by templates `list` and
     *    `hoverList`. If 'undefined' key exists their value will be
     *     used instead of text 'undefined'.
     * featureContext - {Object} Contains the keys with the values --could be a
     *     function or {string}--, the resulting value is used instead of values
     *     of feature property with the same name. Used by templates: single,
     *     item, hover, hoverItem. If 'undefined' key exists their value will
     *     be used instead of text 'undefined'.
     * eventListeners - {Object} This object will be registered with
     *     <OpenLayers.Events.on>, default scope is the control.
     * pupupOptions - {Object} Inform to display the list popup separate from
     *     other layers, set to {} to use default options. See
     *     <FeaturePopups.Layer.pupupOptions> property for more details.
     *
     * (code)
     * templates: {
     *   hover: '${.name}',
     *   single: 'Name: ${.name}<br>Area: ${area} km2<hr>${.description}',
     *   item: '<li><a href="#" ${showPopup()}>${.name}</a></li>'
     * },
     * featureContext: {
     *   area: function(feature) { return feature.geometry.getArea(); },
     *   ...
     * }, ...
     * (end)
     *
     * *NOTE*: If the features of the layer may have an *"fid" duplicate* the
     *     key "fid" of "featureContext" *should be declared*, and returns
     *     unique values for each layer features, e.g. as
     * (code)
     * ... },
     * featureContext: {
     *   fid: function(feature) { return feature.id; },
     *   ...
     * }, ...
     * (end)
     *
     * Valid templates:
     * single - {String || Function} template used to show a single feature.
     * list - {String || Function} template used to show selected
     *     features as a list (each feature is shown using "item"),
     *     defaul is <layerListTemplate>.
     * item - {String || Function} template used to show a feature as
     *     a item in a list.
     * hover - {String || Function} template used on hover a single feature.
     * hoverList - {String || Function} template used on hover a clustered
     *     feature.
     * hoverItem - {String || Function} template used to show a feature as
     *     a item in a list on hover a clustered feature.
     *
     * Contexts of templates:
     * single, item, hover, hoverItem - Context is feature, can use `.` instead
     *     of `attributes.`, note that the feature can not have a layer property
     *     whether it belongs from clustered feature.
     * list, hoverList - context is a object with three properties: "count"
     *     (number of features) "html" (html of list of features) and "layer"
     *     (vector layer)
     *
     * If specified some template as layer property and as options has priority
     *     the options template.
     *
     * Valid events on eventListeners:
     * selectionchanged - Triggered after selection is changed, receives a event
     *      with "layer" and "selection" as array of features (note that
     *      features are not clustered and in this case may lack the property
     *      layer)
     * featureschanged - Triggered after layer features are changed, fired only
     *      changing the list of features and ignore the clusters changes or
     *      recharge if obtained new features but with the same "fid". Receives
     *      a event with "layer" and "features" as array of features (note that
     *      features are not clustered and in this case may lack the property
     *      layer)
     *
     * Note: "featureschanged" event is the first if the "selectionchanged"
     *     event is also triggered.
     */
    addLayer: function(layer, options) {
        this.addLayers([[layer, options]]);
    },

    /**
     * APIMethod: addLayers
     *
     * Parameters:
     * layers - Array({<OpenLayers.Layer.Vector>} || Array({Object})) Layers to
     *     add, and array of layers or pairs of arguments layer and options.
     */
    addLayers: function(layers) {
        var added = false,
            response,
            layerItem;
        for (var i = 0, len = layers.length; i < len; i++) {
            layerItem = layers[i];
            if (OpenLayers.Util.isArray(layerItem)) {
                response = this.addLayerToControl.apply(this, layerItem);
            } else {
                response = this.addLayerToControl(layerItem);
            }
            added = added || response;
        }
        if (added && this.active) {
            var controls = this.controls;
            controls.hover && controls.hover.setLayer(this.layers.slice());
            controls.select && controls.select.setLayer(this.layers.slice());
            this.refreshLayers(); // could be removed: called by 
                                  //    select.setLayer() on unselectAll()
        }
    },

    /**
     * Method: addLayerToControl
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>}
     * options - {Object}
     *
     * Returns:
     * {Boolean} True if the layer has been added.
     */
    addLayerToControl: function(layer, options) {
        var layerObj = this.getLayerObj(layer),
            response = false;
        if (!layerObj) {
            options = OpenLayers.Util.applyDefaults(options, {templates: {} });
            var oTemplates = options.templates;
            OpenLayers.Util.applyDefaults(options.templates, {
                list: (oTemplates.item ? this.layerListTemplate : ''),
                hoverList: (
                    (oTemplates.hover || oTemplates.hoverItem) ?
                                                 this.hoverClusterTemplate : '')
            });
            layerObj = new OpenLayers.Control.FeaturePopups.Layer(
                                                         this, layer, options);
            this.layers.push(layer);
            this.layerObjs[layer.id] = layerObj;
            this.active && layerObj.activate();
            response = true;
        }
        return response;
    },

    /**
     * APIMethod: removeLayer
     */
    removeLayer: function(layer) {
        var layerObj = this.getLayerObj(layer);
        if (layerObj) {
            layerObj.destroy();
            OpenLayers.Util.removeItem(this.layers, layer);
            delete this.layerObjs[layer.id];
            if (this.active) {
                this.controls.hover && this.controls.hover.setLayer(
                                                           this.layers.slice());
                this.controls.select && this.controls.select.setLayer(
                                                           this.layers.slice());
                this.refreshLayers(); // could be removed: called by 
                                      //    select.setLayer() on unselectAll()
            }
        }
    },

    /**
     * Method: onSelectBox
     * Callback from the handlerBox set up when <selectBox> is true.
     *
     * Parameters:
     * position - {<OpenLayers.Bounds> || <OpenLayers.Pixel>}
     */
    onSelectBox: function(position) {
        // Trick to not show individual features when using a selection box.
        this.selectingSet = true;
        OpenLayers.Control.SelectFeature.prototype.selectBox.apply(
                                              this.controls.select, arguments);
        this.selectingSet = false;
        for (var layerId in this.layerObjs) {
            this.layerObjs[layerId].refreshSelection();
        }
        this.refreshLayers();
    },

    /**
     * Method: onFeaturehighlighted
     * Internal use only.
     */
    onFeaturehighlighted: function(evt) {
        var feature = evt.feature, layerObj = this.layerObjs[feature.layer.id];
        
        if(feature.geometry.CLASS_NAME === layerObj.hoverGeometryType[0]) {
        	layerObj.highlightFeature(feature);
        }
    },

    /**
     * Method: onFeatureunhighlighted
     */
    onFeatureunhighlighted: function(evt) {
        this.popupObjs.hover && this.popupObjs.hover.clear();
    },

    /**
     * APIMethod: unselectAll
     * Unselect all selected features, only works if the control is active.
     */
    unselectAll: function() {
        var selControl = this.controls.select;
        if (selControl && this.active) {
            selControl.unselectAll();
        }
    },

    /**
     * APIMethod: unselectGeneric
     * Unselect all selected features on layers on the control that don't
     *     have <popupOptions>. Only works if the control is active.
     */
    unselectGeneric: function() {
        var selControl = this.controls.select;
        if (selControl && this.active) {
            var layerObjs = this.layerObjs;
            for (var key in layerObjs) {
                var layerObj = layerObjs[key];
                if (!layerObj.popupObjs) {
                    layerObj.unselectLayer(selControl);
                }
            }
            this.refreshLayers();
        }
    },

    /**
     * APIMethod: unselectLayer
     * Unselect all selected features on the layer, only works if the control
     *     is active and layer is on the control.
     */
    unselectLayer: function(layer) {
        var selectedFeatures = layer.selectedFeatures;
        // layer.selectedFeatures is null after a layer is destroyed.
        if (selectedFeatures) {
            var selControl = this.controls.select,
                layerObj = this.getLayerObj(layer);
            if (selControl && layerObj && this.active) {
                layerObj.unselectLayer(selControl);
                this.refreshLayers();
            }
        }
    },

    /**
     * Function: getLayerObj
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} The layer of selected feature.
     */
    getLayerObj: function(layer) {
        return layer ? this.layerObjs[layer.id] : null;
    },

    /**
     * Method: refreshLayers
     *
     * Parameters:
     * useCursorLocation - {Boolean}
     */
    refreshLayers: function(useCursorLocation) {
        var layers = OpenLayers.Array.filter(this.layers,
            function(layer) {
                return !!layer.map;
            }
        );
        var bounds = new OpenLayers.Bounds(),
            invalid = false,
            staticInvalid = false,
            html = [],
            selectedFeatures = [];
        var layerObj, r, layerPopObjs;
        for (var layerId in this.layerObjs) {
            layerObj = this.layerObjs[layerId];
            if (layerObj.active) {
                r = layerObj.selectionObject;
                layerPopObjs = layerObj.popupObjs;
                if (layerPopObjs) {
                    if(r.invalid) {
                        OpenLayers.Control.FeaturePopups_Utils.showListPopup(
                            layerPopObjs, [{
                                layerObj: layerObj,
                                layer: layerObj.layer,
                                features: r.features
                            }],
                            r.bounds, [r.html],
                            r.staticInvalid,
                            useCursorLocation,
                            this.controls.select.handlers.feature
                        );
                    }
                } else {
                    r.html && html.push(r.html);
                    invalid = invalid || r.invalid;
                    staticInvalid = staticInvalid || r.staticInvalid;
                    if (r.features.length) {
                        bounds.extend(r.bounds);
                        selectedFeatures.push({
                            layerObj: layerObj,
                            layer: layerObj.layer,
                            features: r.features
                        });
                    }
                }
                // reset flags of layerObj
                r.invalid = false;
                r.staticInvalid = false;
            }
        }
        if (invalid) {
            OpenLayers.Control.FeaturePopups_Utils.showListPopup(
                this.popupObjs, selectedFeatures, bounds, html,
                staticInvalid,
                useCursorLocation, this.controls.select.handlers.feature
            );
        }
    },

    CLASS_NAME: 'OpenLayers.Control.FeaturePopups'
});

/**
 * Constants: Modes
 * NONE - {Integer} Used in <mode> indicates to not activate any particular
 *     behavior.
 * CLOSE_ON_REMOVE - {Integer} Used in <mode> indicates that the popups will
 *     close when removing features in a layer.
 * SAFE_SELECTION - {Integer} Used in <mode> indicates that the features will
 *     remain selected even have been removed from the layer. Is useful when
 *     using <OpenLayers.Strategy.BBOX> with features with "fid" or when using
 *     <OpenLayers.Strategy.Cluster>. Using "BBOX" when a feature is added
 *     back to the layer will be re-selected automatically by "fid".
 * CLOSE_ON_UNSELECT - {Integer} Used in <mode> indicates that the popups will
 *     close when unselect the feature.
 * CLOSE_BOX - {Integer} Used in <mode> indicates to display a close box inside
 *     the popups.
 * UNSELECT_ON_CLOSE - {Integer} Used in <mode> indicates to unselect all
 *     features when a popup is closed.
 * DEFAULT - {Integer} Used in <mode> indicates to activate default behaviors
 *     as <SAFE_SELECTION> | <CLOSE_ON_UNSELECT> | <CLOSE_BOX> |
 *     <UNSELECT_ON_CLOSE>.
 */
OpenLayers.Control.FeaturePopups.NONE = 0;
OpenLayers.Control.FeaturePopups.CLOSE_ON_REMOVE = 1;
OpenLayers.Control.FeaturePopups.SAFE_SELECTION = 2;
OpenLayers.Control.FeaturePopups.CLOSE_ON_UNSELECT = 4;
OpenLayers.Control.FeaturePopups.CLOSE_BOX = 8;
OpenLayers.Control.FeaturePopups.UNSELECT_ON_CLOSE = 16;
OpenLayers.Control.FeaturePopups.DEFAULT =
    OpenLayers.Control.FeaturePopups.SAFE_SELECTION |
    OpenLayers.Control.FeaturePopups.CLOSE_ON_UNSELECT |
    OpenLayers.Control.FeaturePopups.CLOSE_BOX |
    OpenLayers.Control.FeaturePopups.UNSELECT_ON_CLOSE;

/**
 * Namespace: FeaturePopups_Utils
 */
 OpenLayers.Control.FeaturePopups_Utils = {};

 /**
 * Function: createPopupObjs
 *
 * Parameters:
 * environments - {<OpenLayers.Control.FeaturePopups>}|Array()
 * popupOptions - {Object}
 * popupDefaults - {Object}
 *
 * Returns:
 * {Object of <OpenLayers.Control.FeaturePopups.Popup>}
 */
OpenLayers.Control.FeaturePopups_Utils.createPopupObjs =
                           function(environments, popupOptions, popupDefaults) {
    var popupManager = OpenLayers.Control.FeaturePopups.Popup,
        applyDefaults = OpenLayers.Util.applyDefaults;
    var popupObjs = {};
    for (var key in popupDefaults) {
        var pOptions = popupOptions[key];
        if (pOptions !== null) {
            popupObjs[key] = new popupManager(
                environments,
                key,
                applyDefaults(pOptions, popupDefaults[key])
            );
        }
    }
    return popupObjs;
};

 /**
 * Function: showListPopup
 *
 * Parameters:
 *
 */
OpenLayers.Control.FeaturePopups_Utils.showListPopup = function(
                            popupObjs, selectedFeatures, bounds, html,
                            staticInvalid,
                            useCursorLocation, featureHandler) {
    var feature,
        lonLat,
        response = false,
        listPopupObj = popupObjs.list,
        singlePopupObj = popupObjs.single;
    // only one single feature is selected? so... try to show
    if (singlePopupObj && selectedFeatures.length === 1 &&
                              selectedFeatures[0].features.length === 1) {
        var selObject = selectedFeatures[0],
            feature = selObject.features[0],
            layerObj = selObject.layerObj;
        var rr = layerObj.getSingleHtml(feature);
        if (rr.hasTemplate) {
            if (useCursorLocation &&
                            feature.geometry.getVertices().length > 1) {
                lonLat = OpenLayers.Control.FeaturePopups_Utils
                            .getLocationFromHandler(
                                featureHandler,
                                feature);
            } else {
                lonLat = feature.geometry.getBounds().getCenterLonLat();
            }
            singlePopupObj.showPopup({
                                layerObj: layerObj,
                                layer: layerObj.layer,
                                feature: feature
                            }, lonLat, rr.html, staticInvalid);
            response = true;
        }
    }
    if (listPopupObj && !response) {
        listPopupObj.showPopup(
            selectedFeatures,
            bounds.getCenterLonLat(),
            (selectedFeatures.length ? html.join('\n') : ''),
            staticInvalid
        );
    }
};

/**
 * APIFunction: getLocationFromHandler
 * Get location from event handler.
 *
 * Parameters:
 * featureHandler - {<OpenLayers.Control.Handler.Feature>}
 * feature - {<OpenLayers.Feature.Vector>}
 *
 * Retruns:
 * {<OpenLayers.LonLat>} Location from pixel where the feature was selected.
 */
OpenLayers.Control.FeaturePopups_Utils.getLocationFromHandler =
                                             function(featureHandler, feature) {
    var lonLat;
    var xy = (featureHandler.feature === feature) ?
                                                   featureHandler.evt.xy : null;
    return (xy ? featureHandler.map.getLonLatFromPixel(xy) :
                feature.geometry.getBounds().getCenterLonLat()
           );
};

/**
 * Class: OpenLayers.Control.FeaturePopups.Popup
 */
OpenLayers.Control.FeaturePopups.Popup = OpenLayers.Class({
    /**
     * APIProperty: events
     * {<OpenLayers.Events>} Events instance for listeners and triggering
     *     specific events.
     *
     * Supported event types:
     *  beforepopupdisplayed - Triggered before a popup is displayed.
     *      To stop the popup from being displayed, a listener should return
     *      false. Receives an event with: "selection" a selection object
     *      (except for the "list" popup is an array of selection objects),
     *      "html" the html of the popup content (alter the html is allowed)
     *      Selection objects have three
     *      keys, "layerObj" (the <FeaturePopups.Layer> manager of the layer),
     *      "layer" (the layer) and "features" or "feature" (the singular key
     *      "feature" is used only for popupType: "single", "hover" or
     *      "listItem")
     *  popupdisplayed - Triggered after a popup is displayed. Receives an event
     *      with; "selection" (with the same structure described in the event
     *      "beforepopupdisplayed"), "div" the DOMElement used by the popup.
     *  closedbybox - Triggered after close a popup using close box. Receives
     *      an event with "popupType" see <Constructor>
     */
    events: null,

    /**
     * Constant: EVENT_TYPES
     * Only required to use <OpenLayers.Control.FeaturePopups> with 2.11 or less
     */
    EVENT_TYPES: ['beforepopupdisplayed', 'popupdisplayed', 'closedbybox'],

    /**
     * APIProperty: eventListeners
     * {Object} If set on options at construction, the eventListeners
     *     object will be registered with <OpenLayers.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,
    
    /** Property: environments
     * Array(<OpenLayers.Control.FeaturePopups>) First item is the control
     *     that initialized this popup manager.
     */
    environments: null,

    /** Property: control
     * {<OpenLayers.Control.FeaturePopups>} The control that initialized this
     *     popup manager.
     */
    control: null,

    /** APIProperty: type
     * {String} Type of popup manager, read only.
     */
    type: '',

    /** APIProperty: popupClass
     * {String|<OpenLayers.Popup>|Function} Type of popup to manage.
     */
    popupClass: null,

    /**
     * APIProperty: anchor
     * {Object} Object to which we'll anchor the popup. Must expose a
     *     'size' (<OpenLayers.Size>) and 'offset' (<OpenLayers.Pixel>).
     */
    anchor: null,

    /**
     * APIProperty: minSize
     * {<OpenLayers.Size>} Minimum size allowed for the popup's contents.
     */
    minSize: null,

    /**
     * APIProperty: maxSize
     * {<OpenLayers.Size>} Maximum size allowed for the popup's contents.
     */
    maxSize: null,

    /**
     * APIProperty: unselectFunction
     * {Function} Closing a popup all features are
     *     unselected using this function (used only if is not null)
     */
    unselectFunction: null,

    /**
     * APIProperty: closeBox
     * {Boolean} To display a close box inside the popup.
     */
    closeBox: false,

    /**
     * APIProperty: panMapIfOutOfView
     * {Boolean} When drawn, pan map such that the entire popup is visible in
     *     the current viewport (if necessary).
     *     Default is true.
     */
    panMapIfOutOfView: true,

    /**
     * Property: observeItems
     * {Boolean} If true, will be activated observers of the DOMElement of the
     *     popup to trigger some events (mostly in list popups).
     */
    observeItems: false,

    /**
     * Property: relatedToClear
     * Array({String}) Related <FeaturePopups.popupObjs> codes from <control>
     *     to clear.
     */
    relatedToClear: null,

    /** Property: origin
     * {<OpenLayers.Control.FeaturePopups.Popup>} Popup from where requested
     *     showing the current popup (usually an "listItem" that is requested
     *     from a "list")
     */
    origin: null,

    /**
     * Property: relatedSimultaneous
     * {Object} Object with two keys: "axis" key is the axis on which to display
     *     the two popups (valid values are "h" or "v") and "related" key is a
     *     code of <FeaturePopups.popupObjs> from <control> to show
     *     simultaneously without much overlap.
     */
    relatedSimultaneous: null,

    /** Property: popupType
     * {String} Code of type of popup to manage: "div", "OL" or "custom"
     */
    popupType: '',

    /**
     * Property: popup
     * {Boolean|<OpenLayers.Popup>} True or instance of OpenLayers.Popup when
     *     popup is showing.
     */
    popup: null,

    /**
     * Property: clearCustom
     * {Function|null} stores while displaying a custom popup the function to
     *     clear the popup, this function is returned by the custom popup.
     */
    clearCustom: null,

    /**
     * Property: onCloseBoxMethod
     * {Function|null} When the popup is created with closeBox argument to true,
     *     this property stores the method that implement any measures to close
     *     the popup, otherwise is null.
     */
    onCloseBoxMethod: null,

    /**
     * Property: moveListener
     * {Object} moveListener object will be registered with
     *     <OpenLayers.Events.on>, use only when <followCursor> is true.
     */
    moveListener: null,

    /**
     * Constructor: OpenLayers.Control.FeaturePopups.Popup
     * This class is a handler that is responsible for displaying and clear the
     *     one kind of popups managed by a <OpenLayers.Control.FeaturePopups>.
     *
     * The manager popup can handle three types of popups: a div a
     *     OpenLayers.Popup class or a custom popup, it depends on the type of
     *     "popupClass" argument.
     *
     * Parameters:
     * environments - {<OpenLayers.Control.FeaturePopups>}|Array() The control
     *     that initialized this popup manager, if array first item must be the
     *     control.
     * popupType - {String} Type of popup manager: "list", "single", "listItem"
     *     "hover" or "hoverList"
     * options - {Object}
     *
     * Valid ptions:
     * eventListeners - {Object} Listeners to register at object creation.
     * minSize - {<OpenLayers.Size>} Minimum size allowed for the popup's
     *     contents.
     * maxSize - {<OpenLayers.Size>} Maximum size allowed for the popup's
     *     contents.
     * popupClass - {String|<OpenLayers.Popup>|Function} Type of popup to
     *     manage: string for a "id" of a DOMElement, OpenLayers.Popup and a
     *     function for a custom popup.
     * anchor -{Object} Object to which we'll anchor the popup. Must expose a
     *     'size' (<OpenLayers.Size>) and 'offset' (<OpenLayers.Pixel>).
     * followCursor - {Boolean} If true, the popup will follow the cursor
     *     (useful for hover)
     * unselectFunction - {Function} Closing a popup all features are
     *     unselected using this function (used only if is not null)
     * closeBox - {Boolean} To display a close box inside the popup.
     * observeItems - {Boolean} If true, will be activated observers of the
     *     DOMElement of the popup to trigger some events (mostly by list
     *     popups).
     * relatedToClear - Array({String})|Array(Array({String})) Related
     *     <FeaturePopups.popupObjs> codes from <environments> to clear.
     * relatedSimultaneous - {Object} Object with two keys: "axis" key is the
     *     axis on which to display the two popups (valid values are "h" or "v")
     *     and "related" key is a code of <FeaturePopups.popupObjs> from
     *     <control> to show simultaneously without much overlap.
     * panMapIfOutOfView -{Boolean} When drawn, pan map such that the entire
     *     popup is visible in the current viewport (if necessary), default is
     *     true.
     */
    initialize: function(environments, popupType, options) {
        // Options
        OpenLayers.Util.extend(this, options);

        // Arguments
        if (OpenLayers.Util.isArray(environments)) {
            this.control = environments[0];
            this.environments = environments;
        } else {
            this.control = environments;
            this.environments = [environments];
        }
        
        this.type = popupType;

        // close box
        if (this.closeBox) {
            this.onCloseBoxMethod = OpenLayers.Function.bind(
                function(evt) {
                    this.unselectFunction && this.unselectFunction();
                    this.clear();
                    OpenLayers.Event.stop(evt);
                    this.events.triggerEvent(
                                         'closedbybox', {popupType: this.type});
                },
                this
            );
        }

        // Options
        this.relatedToClear = this.relatedToClear || [[]];
        if (this.relatedToClear.length === 0 ||
                             !OpenLayers.Util.isArray(this.relatedToClear[0])) {
            this.relatedToClear = [this.relatedToClear];
        }
        var popupClass = this.popupClass;
        if (popupClass) {
            var pClass = popupClass.prototype;
            if (typeof popupClass == 'string') {
                this.popupType = 'div';
            } else if (pClass && // Do some duck typed
                        pClass.contentDisplayClass &&
                        pClass.CLASS_NAME &&
                        pClass.map === null) {
                this.popupType = 'OL';
                var pClass = popupClass.prototype,
                    maxSize = this.maxSize,
                    minSize = this.minSize;
                if (maxSize) {
                    maxSize = new OpenLayers.Size(
                        isNaN(maxSize.w) ? 999999 : maxSize.w,
                        isNaN(maxSize.h) ? 999999 : maxSize.h
                    );
                }
                if (minSize) {
                    minSize = new OpenLayers.Size(
                        isNaN(minSize.w) ? 0 : minSize.w,
                        isNaN(minSize.h) ? 0 : minSize.h
                    );
                }
                if (pClass.maxSize) {
                    if (maxSize) {
                        maxSize.w = Math.min(maxSize.w, pClass.maxSize.w);
                        maxSize.h = Math.min(maxSize.h, pClass.maxSize.h);
                    } else {
                        maxSize = pClass.maxSize;
                    }
                }
                if (pClass.minSize) {
                    if (minSize) {
                        minSize.w = Math.max(minSize.w, pClass.minSize.w);
                        minSize.h = Math.max(minSize.h, pClass.minSize.h);
                    } else {
                        minSize = pClass.minSize;
                    }
                }
                var self = this; // To do tricks
                this.popupClass = OpenLayers.Class(popupClass, {
                    autoSize: true,
                    minSize: minSize,
                    maxSize: maxSize,
                    panMapIfOutOfView: this.panMapIfOutOfView,
                    panIntoView: function() {
                        self.panMapIfOutOfView &&
                            OpenLayers.Popup.prototype.panIntoView.call(this);
                    },
                    contentDisplayClass:
                        pClass.contentDisplayClass + ' ' +
                        this.control.displayClass + '_' + this.type
                });
            } else if (typeof popupClass == 'function') {
                this.popupType = 'custom';
            }
        }
        if (this.followCursor) {
            this.moveListener = {
                scope: this,
                mousemove: function(evt) {
                    var popup = this.popup;
                    if (popup && popup.moveTo) {
                        var map = this.control.map;
                        popup.moveTo(
                            map.getLayerPxFromLonLat(
                                map.getLonLatFromPixel(evt.xy)));
                    }
                }
            };
        }
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
        this.eventListeners && this.events.on(this.eventListeners);
    },

    /**
     * APIMethod: destroy
     */
    destroy: function() {
        this.clear();
        this.eventListeners && this.events.un(this.eventListeners);
        this.events.destroy();
        this.events = null;
    },

    /**
     * Method: showPopup
     * Shows the popup if it has changed, and clears it previously
     *
     * Parameters:
     * selection - {Object}|Aray({Object}) Selected features.
     * lonlat - {<OpenLayers.LonLat>}  The position on the map the popup will
     *     be shown.
     * html - {String} An HTML string to display inside the popup.
     * panMap - {Boolean} If <panMapIfOutOfView> is true then pan map such that
     *     the entire popup is visible, defaul is true.
     * origin - {<OpenLayers.Control.FeaturePopups.Popup>|null} Popup from where
     *     requested showing the current popup
     */
    showPopup: function(selection, lonLat, html, panMap, origin) {
        this.clear();
        var popupClass = this.popupClass;
        if (popupClass && html) {
            var evt = {
                selection: selection,
                html: html
            };
            var cont = this.events.triggerEvent('beforepopupdisplayed', evt);
            if (cont !== false) {
                // this create "this.popup"
                html = evt.html;
                this.create(lonLat, html, panMap);
                if (this.popup) {
                    this.origin = origin ? origin : null;
                    this.observeItems && this.observeShowPopup(this.div);
                    this.events.triggerEvent('popupdisplayed', {
                        selection: selection,
                        div: this.div
                    });
                }
            }
        }
    },

    /**
     * APIMethod: clear
     * Clear the popup and related popups.
     */
    clear: function() {
        this.clearPopup();
        var iiLen = Math.min(this.relatedToClear.length,
                             this.environments.length);
        for (var ii = 0; ii < iiLen; ii++) {
            var popupObjs = this.environments[ii].popupObjs,
                relatedToClear = this.relatedToClear[ii];
            if(relatedToClear.length > 0 && popupObjs) {

                for (var i = 0, len = relatedToClear.length; i < len; i++) {
                    var related = popupObjs[relatedToClear[i]];
                    if (related &&
                             (related.origin === null || related.origin === this)) {
                        related.clearPopup();
                    }
                }
                
            }
        }
    },

    /**
     * Method: observeShowPopup
     * Internal use only.
     *
     * Parameters:
     * div - {DOMElement}
     */
    observeShowPopup: function(div) {
        for (var i = 0, len = div.childNodes.length; i < len; i++) {
            var child = div.childNodes[i];
            if (child.id && OpenLayers.String.startsWith(child.id,
                                              'showPopup-OpenLayers')) {
                OpenLayers.Event.observe(child, 'touchend',
                    OpenLayers.Function.bindAsEventListener(
                                              this.showListItem, this));
                OpenLayers.Event.observe(child, 'click',
                    OpenLayers.Function.bindAsEventListener(
                                              this.showListItem, this));
            } else {
                this.observeShowPopup(child);
            }
        }
    },

    /**
     * Method: showListItem
     * Internal use only.
     *
     * Parameters:
     * div - {DOMElement}
     *
     * Scope:
     * - {<OpenLayers.Control.FeaturePopups>}
     */
    showListItem: function(evt) {
        var elem = OpenLayers.Event.element(evt);
        if (elem.id) {
            var ids = elem.id.split('-');
            if (ids.length >= 2) {
                var layerObj = this.control.layerObjs[ids[1]];
                layerObj && layerObj.showSingleFeatureById(ids[2], this);
                OpenLayers.Event.stop(evt);
            }
        }
    },

    /**
     * Method: removeChildren
     * Internal use only.
     *
     * Parameters:
     * div - {DOMElement}
     */
    removeChildren: function(div) {
        var child;
        while (child = div.firstChild) {
            if (child.id && OpenLayers.String.startsWith(child.id,
                                              'showPopup-OpenLayers')) {
                OpenLayers.Event.stopObservingElement(child);
            }
            this.removeChildren(child);
            div.removeChild(child);
        }
    },

    /**
     * Method: create
     * Create the popup.
     */
    create: function(lonLat, html, panMap) {
        var div, popup,
            control = this.control;
        switch (this.popupType) {
        case 'div':
            div = document.getElementById(this.popupClass);
            if (div) {
                div.innerHTML = html;
                this.div = div;
                this.popup = true;
            }
            break;
        case 'OL':
            var _relatedPopup = null,
                _relatedAxis = null;
            if (this.relatedSimultaneous) {
                var relatedObj =
                            control.popupObjs[this.relatedSimultaneous.related];
                if (relatedObj &&
                            relatedObj.popup && relatedObj.popupType === 'OL') {
                    _relatedPopup = relatedObj.popup;
                    _relatedAxis = this.relatedSimultaneous.axis;
                }
            }
            popup = new this.popupClass(
                control.id + '_' + this.type,
                lonLat,
                new OpenLayers.Size(100, 100),
                html
            );
            if (this.anchor) {
                popup.anchor = this.anchor;
            }
            if (this.onCloseBoxMethod) {
                // The API of the popups is not homogeneous, closeBox may
                //      be the fifth or sixth argument, it depends!
                // So forces closeBox using other ways.
                popup.addCloseBox(this.onCloseBoxMethod);
                popup.closeDiv.style.zIndex = 1;
            }
            if (_relatedPopup) {
                var _prevCalcRelativePosition = popup.calculateRelativePosition,
                    _relpopRelPosition =
                                       (_relatedPopup.relativePosition || 'tr');
                var syncRelativePosition = function(px) {
                    if (!_relatedPopup.id) {
                        // if related is dretroyed
                        _prevCalcRelativePosition.call(popup, px);
                    }
                    var relPos = _relpopRelPosition || 'tr';
                    if (_relatedAxis === 'h') {
                        return relPos[0] + ((relPos[1] === 'l') ? 'r' : 'l');
                    } else {
                        return ((relPos[0] === 'b') ? 't' : 'b') + relPos[1];
                    }
                };
                if (_relatedPopup.calculateRelativePosition) {
                    _relatedPopup.calculateRelativePosition = function() {
                        return _relpopRelPosition;
                    };
                }
                if (popup.calculateRelativePosition) {
                    popup.calculateRelativePosition = syncRelativePosition;
                } else {
                    popup.relativePosition = syncRelativePosition();
                }
            }
            var save = this.panMapIfOutOfView;
            this.panMapIfOutOfView = (panMap !== false);
            control.map.addPopup(popup);
            this.panMapIfOutOfView = save;

            this.div = popup.contentDiv;
            this.popup = popup;
            this.moveListener && control.map.events.on(this.moveListener);
            break;
        case 'custom':
            var returnObj = this.popupClass(
                        control.map, lonLat, html, this.onCloseBoxMethod, this);
            if (returnObj.div) {
                this.clearCustom = returnObj.destroy;
                this.div = returnObj.div;
                this.popup = true;
            }
            break;
        }
    },

    /**
     * Method: clearPopup
     * Clear the popup if it is showing.
     */
    clearPopup: function() {
        if (this.popup) {
            this.observeItems && this.removeChildren(this.div);
            switch (this.popupType) {
            case 'OL':
                var control = this.control;
                if (control.map) {
                    control.map.removePopup(this.popup);
                }
                this.popup.destroy();
                this.moveListener && control.map.events.un(this.moveListener);
                break;
            case 'custom':
                if (this.popup) {
                    if (this.clearCustom) {
                        this.clearCustom();
                        this.clearCustom = null;
                    }
                }
                break;
            }
            this.div = null;
            this.popup = null;
            this.origin = null;
        }
    },

    CLASS_NAME: 'OpenLayers.Control.FeaturePopups.Popup'
});

/**
 * Class: OpenLayers.Control.FeaturePopups.Layer
 */
OpenLayers.Control.FeaturePopups.Layer = OpenLayers.Class({
    /**
     * APIProperty: events
     * {<OpenLayers.Events>} Events instance for listeners and triggering
     *     specific events.
     *
     * Supported event types: see  <FeaturePopups.addLayer>
     */
    events: null,

    /**
     * Constant: EVENT_TYPES
     * Only required to use <OpenLayers.Control.FeaturePopups> with 2.11 or less
     */
    EVENT_TYPES: ['featureschanged', 'selectionchanged'],

    /**
     * APIProperty: eventListeners
     * {Object} If set on options at construction, the eventListeners
     *     object will be registered with <OpenLayers.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,

    /**
     * Property: listenFeatures
     * {Boolean} internal use to optimize performance, true if <eventListeners>
     *     contains a "featureschanged" event.
     */
    listenFeatures: false,

    /**
     * APIProperty: templates
     * {Object} Set of templates, see <FeaturePopups.addLayer>
     */
    templates: null,

    /**
     * APIProperty: featureContext
     * {Object} See <FeaturePopups.addLayer>
     */
    featureContext: null,

    /**
     * APIProperty: listContext
     * {Object} See <FeaturePopups.addLayer>
     */
    listContext: null,

     /**
     * APIProperty: safeSelection
     * {Boolean} Read only, true if the control constructor argument in the
     *     <FeaturePopups.mode> have set
     *     <OpenLayers.Control.FeaturePopups.SAFE_SELECTION>.
     */
    safeSelection: false,

    /**
     * APIProperty: popupOptions
     * {Object} Options used to create a popup manager for selections only on
     *     this layer, set to {} to use default options, default is null.
     *
     * May contain two keys: "list" and "single".
     *
     * For more details of valid options for any key see
     *     <FeaturePopups.Popup.Constructor>.
     *
     * Default options for "list":
     * popupClass - <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     * unselectFunction - Depends on the <FeaturePopups.mode> (internal use)
     * closeBox - Depends on the <FeaturePopups.mode> (internal use)
     * observeItems - true (internal use)
     * relatedToClear - [["hover", "hoverList", "listItem"], ["single"]]
     *     (internal use)
     *
     * Default options for "single":
     * popupClass - <OpenLayers.Popup.FramedCloud>
     * panMapIfOutOfView - true
     * unselectFunction - Depends on the <mode> (internal use)
     * closeBox - Depends on the <mode> (internal use)
     * relatedToClear: [["hover", "hoverList", "listItem"], ["list"]] (internal
     *     use)
     */
    popupOptions: null,

    /**
     * Property: popupObj
     * <OpenLayers.Control.FeaturePopups.Popup> Internal use.
     */
    popupObj: null,

    /**
     * Property: selection
     * {Object} Used if <safeSelection> is true. Set of the identifiers (id or
     *     fid if it exists) of the features that were selected, a feature
     *     remains on the object after being removed from the layer until
     *     occurs new selection.
     */
    selection: null,

    /**
     * Property: selectionObject
     * {Object} Used to store calculations associated with current selection.
     */
    selectionObject: null,

    /**
     * Property: selectionHash
     * {String} String unique for the single features of the selected features
     *     of the layer regardless of the order or clustering of these, is
     *     based on its id or fid (if it exists)
     */
    selectionHash: '',

    /**
     * Property: staticSelectionHash
     * {String} String unique for the single features of the static selected
     *     features of the layer regardless of the order or clustering of these,
     *     is based on its id or fid (if it exists)
     */
    staticSelectionHash: '',

    /**
     * Property: featuresHash
     * {String} String unique for the single features of the layer regardless
     *     of the order or clustering of these, is based on its id or fid (if
     *     it exists)
     */
    featuresHash: '',

    /**
     * Property: layerListeners
     * {Object} layerListeners object will be registered with
     *     <OpenLayers.Events.on>, internal use only.
     */
    layerListeners: null,

    /**
     * APIProperty: active
     * {Boolean} The object is active (read-only)
     */
    active: null,

    /**
     * Property: updatingSelection
     * {Boolean} The control set to true this property while being refreshed
     *     selection on a set of features to can ignore others acctions,
     *     internal use only.
     */
    updatingSelection: false,

    /**
     * Property: silentSelection
     * {Boolean} Suppress "selectionchanged" event triggering during a selection
     *     process, internal use only.
     */
    silentSelection: false,

    /**
     * Property: refreshDelay
     * {Number} Number of accepted milliseconds of waiting between removing and
     *     re-add features (useful when using strategies such as BBOX), after
     *     this time has expired is forced a popup refresh.
     */
    refreshDelay: 300,

    /**
     * Property: delayedRefresh
     * {Number} Timeout id of forced refresh.
     */
    delayedRefresh: null,

    /**
     * Property: regExpI18n
     * {RegEx} Used to internationalize templates.
     */
    regExpI18n: /\$\{i18n\(["']?([\s\S]+?)["']?\)\}/g,

    /**
     * Property: regExpShow
     * {RegEx} Used to activate events in the html elements to show individual
     *     popup.
     */
    regExpShow: /\$\{showPopup\(\w*\)\w*\}/g,

    /**
     * Property: regExpAttributes
     * {RegEx} Used to omit the name "attributes" as ${.myPropertyName} instead
     *     of ${attributes.myPropertyName} to show data on a popup using
     *     templates.
     */
    regExpAttributes: /\$\{\./g,
    
    hoverGeometryType : ["OpenLayers.Geometry.Point"],

    /**
     * Constructor: OpenLayers.Control.FeaturePopups.Layer
     */
    initialize: function(control, layer, options) {
        // Options
        OpenLayers.Util.extend(this, options);

        // Objects
        this.selection = {};
        this.selectionObject = {};

        // Arguments
        this.control = control;
        this.layer = layer;

        // Prepare for special options
        options = options || {};

        // Templates
        var oTemplates = options.templates || {};
        var _templates = {};
        for (var templateName in oTemplates) {
            _templates[templateName] =
                                 this.prepareTemplate(oTemplates[templateName]);
        }
        this.templates = _templates;

        // Events
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
        if (this.eventListeners) {
            this.events.on(this.eventListeners);
            this.listenFeatures = !!(this.eventListeners &&
                                       this.eventListeners['featureschanged']);
        }

        // Layer listeners
        // ---------------
        var mode = control.mode,
            MODES = OpenLayers.Control.FeaturePopups;
        this.safeSelection = !!(mode & MODES.SAFE_SELECTION);
        this.layerListeners = {
            scope: this,
            'featureselected': this.onFeatureselected
        };
        if (mode & MODES.CLOSE_ON_UNSELECT || this.safeSelection) {
            this.layerListeners['featureunselected'] = this.onFeatureunselected;
        }
        if (this.safeSelection) {
            this.layerListeners['beforefeaturesremoved'] =
                                                   this.onBeforefeaturesremoved;
            this.layerListeners['featuresadded'] = this.onFeaturesadded;
        } else if (mode & MODES.CLOSE_ON_REMOVE) {
            this.layerListeners['featuresremoved'] = this.onFeaturesremoved;
        }

        // Create a popups for this layer
        // -----------------------------
        if (options.popupOptions) {
            var _closeBox = !!(mode & MODES.CLOSE_BOX),
                _unselectFunction = (
                    mode & MODES.UNSELECT_ON_CLOSE ?
                    function() {
                        control.unselectLayer(layer);
                    } :
                    null
                );
            var defaultPopupOptions = {
                list: {
                    popupClass: OpenLayers.Popup.FramedCloud,
                    panMapIfOutOfView: true,
                    // options for internal use
                    closeBox: _closeBox,
                    unselectFunction: _unselectFunction,
                    observeItems: true,
                    relatedToClear: [
                        ['hover', 'hoverList', 'listItem'],
                        ['single']
                    ]
                },
                single: {
                    popupClass: OpenLayers.Popup.FramedCloud,
                    panMapIfOutOfView: true,
                    // options for internal use
                    closeBox: _closeBox,
                    unselectFunction: _unselectFunction,
                    relatedToClear: [
                        ['hover', 'hoverList', 'listItem'],
                        ['list']
                    ]
                }
            };
            this.popupObjs =
                    OpenLayers.Control.FeaturePopups_Utils.createPopupObjs(
                        [control, this],
                        options.popupOptions,
                        defaultPopupOptions
                    );
        }

        // Contexts as a private vars
        var _featureContext = this.featureContext || {},
            _listContext = this.listContext || {};
        // fid by feature context
        var getFId = _featureContext.fid;
        if (getFId) {
            this.getFeatureId = getFId;
        } else {
            /**
             * APIFunction: getFeatureId
             * Returns the id of the feature used specifically for this layer.
             *     Usually the id returned is the `fid` feature if it exists and
             *     otherwise is the `id`.
             *
             * This function can not be overwritten, use <featureContext> to
             *     change this behavior.
             *
             * Parameters:
             * feature - {OpenLayers.Feature.Vector}
             *
             * Returns:
             * {String} A unique identifier of the feature within the layer
             *     according <featureContext>.
             */
            this.getFeatureId = function(feature) {
                return feature.fid || feature.id;
            };
            _featureContext.fid = this.getFeatureId;
        }
        this.featureContext = _featureContext;
        this.listContext = _listContext;

        // Renderer of templates
        // ---------------
        // private vars
        var _context, _extendedContext;
        var _replacer = function(str, match) {
            var replacement;
            // Loop through all subs. Example: ${a.b.c}
            var subs = match.split(/\.+/);
            if (_extendedContext && subs.length === 1) {
                replacement = _extendedContext[subs[0]];
                if (replacement && typeof replacement == 'function') {
                    replacement = replacement.call(this, _context);
                }
            }
            if (replacement === undefined) {
                for (var i = 0; i < subs.length; i++) {
                    if (i == 0) {
                        replacement = _context;
                    }
                    if (replacement === undefined) {
                        break;
                    }
                    replacement = replacement[subs[i]];
                }
            }
            // If replacement is undefined, return the string 'undefined'.
            if (replacement === undefined) {
                if (_extendedContext) {
                    replacement = _extendedContext['undefined'];
                }
                replacement =
                        (replacement !== undefined ? replacement : 'undefined');
            }
            return replacement;
        };

        /**
         * Function: renderTemplate
         * Given a string with tokens in the form ${token}, return a string
         *     with tokens replaced with properties from the given context
         *     object.  Represent a literal "${" by doubling it, e.g. "${${".
         *
         * Parameters:
         * template - {String || Function}
         *     If template is a string then template
         *     has the form "literal ${token}" where the token will be replaced
         *     by the value of context["token"]. When is a function it will
         *     receive the context as a argument.
         * context - {Object} Object with properties corresponding to the tokens
         *     in the template.
         * extendedContext - {Object} Object with properties corresponding to
         *     the overlaid tokens, if a token is a function its scope is
         *     context.
         *
         * Returns:
         * {String} A string with tokens replaced from the context object.
         */
        var renderTemplate = function(template, context, extendedContext) {
            if (typeof template == 'string') {
                _context = context;
                _extendedContext = extendedContext;
                return template.replace(
                                       OpenLayers.String.tokenRegEx, _replacer);
            } else if (typeof template == 'function') {
                return template(context);
            } else {
                return '';
            }
        };

        /**
         * APIProperty: applyTemplate
         * {Object} The object contains an applicator of the template for each
         *    template name. Each applicator returns a {String} with tokens
         *    replaced from the context of feature (for names single, item,
         *    hover, hoverItem) or context of list (for names list and
         *    hoverList)
         */
        this.applyTemplate = {
            single: function(feature) {
                return renderTemplate(
                                   _templates.single, feature, _featureContext);
            },
            item: function(feature) {
                return renderTemplate(
                                     _templates.item, feature, _featureContext);
            },
            hover: function(feature) {
                return renderTemplate(
                                    _templates.hover, feature, _featureContext);
            },
            hoverItem: function(feature) {
                return renderTemplate(
                                _templates.hoverItem, feature, _featureContext);
            },
            list: function(listObj) {
                return renderTemplate(_templates.list, listObj, _listContext);
            },
            hoverList: function(listObj) {
                return renderTemplate(
                                   _templates.hoverList, listObj, _listContext);
            }
        };

        // published as public function
        this.renderTemplate = renderTemplate;
    },

    /**
     * Function: prepareTemplate
     * When the template is a string returns a prepared template, otherwise
     *     returns it as is.
     *
     * Parameters:
     * template - {String || Function}
     *
     * Returns:
     * {String || Function} A internationalized template.
     */
    prepareTemplate: function(template) {
        if (typeof template == 'string') {
            var _subId = 0,
                _layerId = this.layer.id;
            template = template.replace(
                this.regExpShow,
                function(a) {
                    _subId++;
                    return 'id="showPopup-' + _layerId +
                                                      '-${fid}-' + _subId + '"';
                }
            );
            template = template.replace(
                this.regExpAttributes,
                '${attributes.'
            );
            return template.replace( // internationalize template.
                this.regExpI18n,
                function(a, key) {
                    return OpenLayers.i18n(key);
                }
            );
        } else {
            return template;
        }
    },

    /**
     * APIMethod: destroy
     */
    destroy: function() {
        this.deactivate();
        this.selection = null;
        this.selectionObject = null;
        if (this.popupObjs) {
            for (var key in this.popupObjs) {
                this.popupObjs[key].destroy();
            }
        }
        this.eventListeners && this.events.un(this.eventListeners);
        this.events.destroy();
    },

    /**
     * APIMethod: activate
     */
    activate: function() {
        if (!this.active && this.layer.map) {
            this.layer.events.on(this.layerListeners);
            this.refreshFeatures();
            this.active = true;
            return true;
        } else {
            return false;
        }
    },

    /**
     * APIMethod: deactivate
     */
    deactivate: function() {
        if (this.active) {
            this.layer.events.un(this.layerListeners);
            this.active = false;
            if (this.popupObjs) {
                for (var key in this.popupObjs) {
                    this.popupObjs[key].clearPopup();
                }
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * Method: isEmptyObject
     *
     * Parameters:
     * obj - {Object}
     */
    isEmptyObject: function(obj) {
        for (var prop in obj) {
            return false;
        }
        return true;
    },

    /**
     * Method: highlightFeature
     * Internal use only.
     */
    highlightFeature: function(feature) {
        var control = this.control,
            popupObjHover = control.popupObjs.hover;
        if (!popupObjHover) { return; }

        popupObjHover.clear();
        var templates = this.templates,
            template = templates.hover,
            oContextFeature = this.featureContext;
        if (template) {
            var lonLat = OpenLayers.Control.FeaturePopups_Utils
                            .getLocationFromHandler(
                                control.controls.hover.handlers.feature,
                                feature);
            if (feature.cluster) {
                if (feature.cluster.length == 1) {
                    // show cluster as a single feature.
                    popupObjHover.showPopup({
                                layerObj: this,
                                layer: this.layer,
                                feature: feature
                            },
                            lonLat,
                            this.renderTemplate(
                                template, feature.cluster[0], oContextFeature));
                } else {
                    var html = '',
                        popupObjHoverList = control.popupObjs.hoverList;
                    if (popupObjHoverList) {
                        var cFeatures = feature.cluster,
                            itemTemplate = templates.hoverItem;
                        if (itemTemplate) {
                            var htmlAux = [];
                            for (var i = 0, len = cFeatures.length;
                                                                 i < len; i++) {
                                htmlAux.push(this.renderTemplate(itemTemplate,
                                                cFeatures[i], oContextFeature));
                            }
                            html = htmlAux.join('\n');
                        }
                        popupObjHoverList.showPopup({
                                layerObj: this,
                                layer: this.layer,
                                features: cFeatures
                            },
                            lonLat,
                            this.renderTemplate(templates.hoverList, {
                                layer: feature.layer,
                                count: cFeatures.length,
                                html: html
                            }, this.listContext)
                        );
                    }
                }
            } else {
                popupObjHover.showPopup({
                            layerObj: this,
                            layer: this.layer,
                            feature: feature
                        },
                        lonLat,
                        this.renderTemplate(template, feature, oContextFeature)
                );
            }
        }
    },

    /**
     * Method: onFeatureselected
     *
     * Parameters:
     * evt - {Object}
     */
    onFeatureselected: function(evt) {
        if (!this.updatingSelection && this.safeSelection) {
            this.storeAsSelected(evt.feature);
        }
        if (!this.control.selectingSet) {
            this.refreshSelection();
            this.control.refreshLayers(true);
        }
    },

    /**
     * Method: storeAsSelected
     *
     * Parameter:
     * feature - {OpenLayers.Feature.Vector} Feature to store as selected.
     */
    storeAsSelected: function(feature) {
        var savedSF = this.selection;
        if (feature.cluster) {
            for (var i = 0 , len = feature.cluster.length; i < len; i++) {
                savedSF[this.getFeatureId(feature.cluster[i])] = true;
            }
        } else {
            savedSF[this.getFeatureId(feature)] = true;
        }
    },

    /**
     * Method: onFeatureunselected
     * Called when the select feature control unselects a feature.
     *
     * Parameters:
     * evt - {Object}
     */
    onFeatureunselected: function(evt) {
        var control = this.control;
        if (!control.unselectingAll) {
            if (this.safeSelection) {
                var savedSF = this.selection,
                    feature = evt.feature;
                if (savedSF) {
                    if (feature.cluster) {
                        for (var i = 0, len = feature.cluster.length;
                                                                 i < len; i++) {
                            delete savedSF[
                                         this.getFeatureId(feature.cluster[i])];
                        }
                    } else {
                        delete savedSF[this.getFeatureId(feature)];
                    }
                }
            }
            if (control.mode &
                           OpenLayers.Control.FeaturePopups.CLOSE_ON_UNSELECT) {
                this.refreshSelection();
                control.refreshLayers();
            }
        }
    },

    /**
     * Method: onBeforefeaturesremoved
     * Called before some features are removed, only used when <mode>
     *    contains <OpenLayers.Control.FeaturePopups.SAFE_SELECTION>.
     *
     * Parameters:
     * evt - {Object}
     */
    onBeforefeaturesremoved: function(evt) {
        if (evt.features.length && this.layer.getVisibility() &&
                                          !this.isEmptyObject(this.selection)) {
            // The features may be deleted to add others, so we will wait...
            if (this.delayedRefresh !== null) {
                window.clearTimeout(this.delayedRefresh);
            }
            this.delayedRefresh = window.setTimeout(
                OpenLayers.Function.bind(
                    function() {
                        if (this.layer.getVisibility()) {
                            this.delayedRefresh = null;
                            this.refreshFeatures();
                            this.control.refreshLayers();
                        }
                    },
                    this
                ),
                this.refreshDelay
            );
        }
    },

    /**
     * Method: onFeaturesremoved
     * Called when some features are removed, only used when
     *     <mode> = <OpenLayers.Control.FeaturePopups.CLOSE_ON_REMOVE>
     *
     * Parameters:
     * evt - {Object}
     */
    onFeaturesremoved: function(evt) {
        if (this.layer.getVisibility()) {
            this.refreshSelection();
            this.control.refreshLayers();
        }
    },

    /**
     * Method: onFeaturesadded
     * Called when some features are added, only used when value of <mode>
     *    conbtains <OpenLayers.Control.FeaturePopups.SAFE_SELECTION>.
     *
     * Parameters:
     * evt - {Object}
     */
    onFeaturesadded: function(evt) {
        if (!this.layer.getVisibility()) {
            return;
        }
        if (this.delayedRefresh !== null) {
            // Waiting for new features has been successful.
            window.clearTimeout(this.delayedRefresh);
            this.delayedRefresh = null;
        }
        var layerId = this.layer.id,
            control = this.control,
            features = evt.features,
            savedSF = this.selection;
        if (!this.isEmptyObject(savedSF)) {
            var selectCtl = control.controls.select;
            // Trick to can operate clickout after a zoom.
            // NOTE: SAFE_SELECTION mode is required.
            var _handlerFeature = selectCtl.handlers.feature,
                _replaceLastFeature = false;
            if (_handlerFeature.lastFeature &&
                                           !_handlerFeature.lastFeature.layer) {
                _replaceLastFeature = true;
            }
            var select = function(feature) {
                selectCtl.select(feature);
                if (_replaceLastFeature) {
                    _handlerFeature.lastFeature = feature;
                    _replaceLastFeature = false;
                }
            };
            control.selectingSet = true;
            this.updatingSelection = true;
            for (var i = 0 , len = features.length; i < len; i++) {
                var feature = features[i];
                if (feature.cluster) {
                    for (var ii = 0, lenlen = feature.cluster.length;
                                                            ii < lenlen; ii++) {
                        if (savedSF[this.getFeatureId(feature.cluster[ii])]) {
                            select(feature);
                            break;
                        }
                    }
                } else if (savedSF[this.getFeatureId(feature)]) {
                    select(feature);
                }
            }
            control.selectingSet = false;
            this.updatingSelection = false;
        }
        this.refreshFeatures();
        control.refreshLayers();
    },

    /**
     * Method: unselectLayer
     * Unselect all selected features by `selControl` on the layer.
     */
    unselectLayer: function(selControl) {
        var layer = this.layer,
            selectedFeatures = layer.selectedFeatures,
            control = this.control;
        // Clear internal selection objects
        this.selection = {};
        this.selectionObject = {
            invalidStatic: (this.staticSelectionHash !== ''),
            invalid: (this.selectionHash !== ''),
            html: '',
            features: [],
            bounds: new OpenLayers.Bounds()
        };
        this.selectionHash = '';
        this.staticSelectionHash = '';
        // Unselect by the selControl
        control.unselectingAll = true;
        for (var i = selectedFeatures.length - 1; i >= 0; i--) {
            selControl.unselect(selectedFeatures[i]);
        }
        control.unselectingAll = false;
    },

    /**
     * Method: refreshFeatures
     */
    refreshFeatures: function() {
        if (this.listenFeatures) {
            var featuresHash,
                layer = this.layer,
                layerFeatures = this.getSingleFeatures(layer.features);
            // get hash
            if (layer.getVisibility() && layer.map) {
                var ids = [];
                for (var i = 0, len = layerFeatures.length; i < len; ++i) {
                    ids.push(this.getFeatureId(layerFeatures[i]));
                }
                featuresHash = ids.sort().join('\t');
            } else {
                featuresHash = '';
                layerFeatures = [];
            }
            // have been changed?
            if (featuresHash !== this.featuresHash) {
                this.featuresHash = featuresHash;
                this.events.triggerEvent('featureschanged', {
                    layer: layer,
                    features: layerFeatures
                });
            }
        }
        this.refreshSelection();
    },

    /**
     * Function: refreshSelection
     */
    refreshSelection: function() {
        var layer = this.layer;

        var html = '',
            features = [],
            bounds = new OpenLayers.Bounds(),
            invalid = false,
            staticInvalid = false;
        if (layer.getVisibility() && layer.inRange) {
            var i, len, feature,
                selectionHash = [],
                staticSelectionHash = '',
                layerSelection = this.layer.selectedFeatures,
                oContextFeature = this.featureContext;
            if (this.safeSelection) {
                var savedSF = this.selection;
                for (i = 0, len = layerSelection.length; i < len; ++i) {
                    feature = layerSelection[i];
                    if (feature.cluster) {
                        // Not all features on layerSelection may be selected
                        //     on a cluster.
                        var clusterFeatures = feature.cluster;
                        for (var ii = 0, llen = clusterFeatures.length;
                                                              ii < llen; ii++) {
                            var cFeature = clusterFeatures[ii];
                            if (savedSF[this.getFeatureId(cFeature)]) {
                                features.push(cFeature);
                            }
                        }
                    } else {
                        features.push(feature);
                    }
                }
                var aux = [];
                for (var id in savedSF) {
                    aux.push(id);
                }
                staticSelectionHash = aux.sort().join('\t');
            } else {
                features = this.getSingleFeatures(layerSelection);
            }

            var layerTemplate = this.templates.list,
                htmlAux = [],
                itemTemplate = this.templates.item;
            for (i = 0, len = features.length; i < len; ++i) {
                feature = features[i];
                bounds.extend(feature.geometry.getBounds());
                layerTemplate && htmlAux.push(
                    this.renderTemplate(itemTemplate, feature, oContextFeature)
                );
                if (feature.fid) {
                    selectionHash.push(feature.fid);
                } else {
                    selectionHash.push(feature.id);
                }
            }
            selectionHash = selectionHash.sort().join('\t');
            if (!this.safeSelection) {
                staticSelectionHash = selectionHash;
            }
            if (selectionHash !== this.selectionHash) {
                invalid = true;
                this.selectionHash = selectionHash;
            }
            if (staticSelectionHash !== this.staticSelectionHash) {
                staticInvalid = true;
                this.staticSelectionHash = staticSelectionHash;
            }
            if (layerTemplate) {
                if (htmlAux.length) {
                    html = this.renderTemplate(
                        layerTemplate, {
                            layer: layer,
                            count: features.length,
                            html: htmlAux.join('\n')
                        },
                        this.listContext
                    );
                }
            }
        } else if (this.selectionHash !== '') {
            invalid = true;
            this.selectionHash = '';
        }
        if (invalid && !this.silentSelection) {
            this.events.triggerEvent('selectionchanged', {
                layer: layer,
                selection: features
            });
        }

        this.selectionObject = {
            invalid: invalid,
            staticInvalid: staticInvalid,
            html: html,
            bounds: bounds,
            features: features
        };
    },

    /**
     * Function: getSingleHtml
     */
    getSingleHtml: function(feature) {
        var html = '',
            hasTemplate = false,
            sTemplate = this.templates.single;
        if (sTemplate) {
            html = this.renderTemplate(
                             sTemplate, feature, this.featureContext);
            hasTemplate = true;
        }
        return {hasTemplate: hasTemplate, html: html};
    },

    /**
     * APIMethod: showSingleFeatureById
     * See featureContext at <FeaturePopups.addLayer> to know how to use "id" or
     *     "fid" of features.
     *
     * Parameters:
     * featureId - {String} id of the feature.
     * origin - {<OpenLayers.Control.FeaturePopups.Popup>|null}
     */
    showSingleFeatureById: function(featureId, origin) {
        var popupObj = this.control.popupObjs.listItem;
        if (!popupObj) { return; }

        var clearPopup = true;
        if (featureId) {
            var i, len, feature,
                found = false,
                layer = this.layer,
                features = layer.features;
            for (i = 0, len = features.length; i < len; i++) {
                feature = features[i];
                if (feature.cluster) {
                    var ii, len2, cFeature;
                    cFeature = feature;
                    for (ii = 0, len2 = cFeature.cluster.length;
                                                              ii < len2; ii++) {
                        feature = cFeature.cluster[ii];
                        if (this.getFeatureId(feature) == featureId) {
                            found = true;
                            break;
                        }
                    }
                } else {
                    found = this.getFeatureId(feature) == featureId;
                }
                // Don't try to show a cluster as a single feature,
                //      templates.single does not support it.
                if (found && !feature.cluster) {
                    var template = this.templates.single;
                    if (template) {
                        popupObj.showPopup({
                                layerObj: this,
                                layer: layer,
                                feature: feature
                            },
                            feature.geometry.getBounds().getCenterLonLat(),
                            this.renderTemplate(
                                template, feature, this.featureContext
                            ),
                            true,
                            origin
                        );
                        clearPopup = false;
                    }
                    break;
                }
            }
        }
        if (clearPopup) {
            popupObj.clear();
        }
    },

    /**
     * Function: getSingleFeatures
     */
    getSingleFeatures: function(features) {
        var sFeatures = [];
        var i, len, feature;
        for (i = 0, len = features.length; i < len; ++i) {
            feature = features[i];
            if (feature.cluster) {
                Array.prototype.push.apply(sFeatures, feature.cluster);
            } else {
                sFeatures.push(feature);
            }
        }
        return sFeatures;
    },

    CLASS_NAME: 'NUTs.Control.FeaturePopups'
});



/*=[ GetFeature.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : GGetFeature.js
 * 설 명 : 속성 조회 컨트롤
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.18		최원석				0.1					최초 생성
	
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Control.GetFeature = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * 이벤트 타입 (요청 완료 시 실행할 이벤트)
	 */
	 EVENT_TYPES: ['callback', 'click'],
	
	/**
	 * Geogate 지도 서비스 주소
	 */
	serviceUrl : null,
	
	/**
	 * XML prefix 명
	 */
	 prefix : null,
	
	/**
	 * 최대 도형 수
	 */
	maxFeatures : 9999,
	
	/**
	 * 테이블 목록
	 */
	tables : [],
	
	/**
	 * 타이틀 필드 리스트
	 */
	titles : {},
	
	/**
	 * 도형 영속성
	 */
	persist : true,
	
	/**
	 * 거리
	 */
	distance : 1,
	
	/**
	 * 반환 함수
	 */
	callbacks : null,
	
	/**
	 * 현재 레이어목록
	 */
	currennt : false,
	
	/**
	 * 테이블, 필드명 Alias 반환여부
	 */
	alias : false,
	
	/**
	 * 도메인 정보 사용 여부 
	 */
	useDomain : false,
	
	/**
	 * 레이어 관리 객체
	 */
	layerTool : null,
	
	/**
	 * GML 객체
	 */
	gml : new OpenLayers.Format.GML(),
	
	/**
	 * 검색 결과
	 */
	result : null,
	
	/*
	 * 정렬할 필드명 리스트
	 */
	sortFields : [],
	
	/*
	 * 정렬 방향 리스트 (ASC | DESC)
	 */
	sortOrders : [],
	
	/**
	 * default map style 정의
	 */
	handlerOptions : {
		//라인 데이터 유지
		multiLine : true,
		//컨트롤 비 활성화 시 라인 유지 여부
		persistControl : true,
		//레이어 옵션
		layerOptions: {
			styleMap: new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(null, {
					rules: [new OpenLayers.Rule({
						symbolizer : {
							"Point": {
								pointRadius: 4,
								graphicName: "circle",
								fillColor: "#ffffff",
								fillOpacity: 1,
								strokeWidth: 1,
								strokeOpacity: 1,
								strokeColor: "#333333"
							},
							"Line" : {
								strokeWidth: 1,
								strokeOpacity: 1,
								strokeColor: "#333333"
							},
							"Polygon": {
								strokeWidth: 1,
								strokeOpacity: 1,
								strokeColor: "#333333",
								fillColor: "#ffffff",
								fillOpacity: 0.3
							}
						}
					})]
				})
			})
		}
	},
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GGetFeatureAttrInfo 생성자 함수
	 * 인 자 : handler (handler 객체), options(옵션 들)
	 * 사용법 : initialize(handler, options)
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		OpenLayers.Map 의 initialize 복사
	 * 								생성 시 옵션 체크 추가
	 * 2011.04.20		최원석		default Control 수정
	 * 
	 **********************************************************************************/
	initialize: function(handler, options) {
		
		if(options.handlerOptions) {
			OpenLayers.Util.extend(this.handlerOptions, options.handlerOptions);
		}

		OpenLayers.Control.prototype.initialize.apply(this, [options]);
		
		this.EVENT_TYPES =
			NUTs.Control.GetFeature.prototype.EVENT_TYPES.concat(
            OpenLayers.Control.prototype.EVENT_TYPES
        );
		
        this.callbacks = OpenLayers.Util.extend(
            {
                done: this.getFeature
            },
            this.callbacks
        );
		
        this.handlerOptions = OpenLayers.Util.extend(
            {persist: this.persist}, this.handlerOptions
        );
		
        this.handler = new handler(this, this.callbacks, this.handlerOptions);
	},
	
	/**********************************************************************************
	 * 함수명 : setTables
	 * 설 명 : 테이블 명 목록 설정
	 * 인 자 : arr (layer 목록 배열 또는 레이어 이름)
	 * 사용법 : setTables(arr)
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		최초 생성
	 * 
	 **********************************************************************************/
	setTables : function(arr) {
		if(arr instanceof Object) {
			this.tables = arr;
		}	
		else {
			this.tables = [];
			this.tables.push(arr);
		}
	},
	
	setDistance : function(distance) {
		this.distance = distance;
	},

	/**********************************************************************************
	 * 함수명 : getFeature
	 * 설 명 : 속성 정보 요청
	 * 인 자 : geometry (Point Geometry)
	 * 사용법 : getFeature(geometry)
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		최원석		최초 생성
	 * 
	 **********************************************************************************/
    getFeature: function(geometry) {
		this.events.triggerEvent(this.EVENT_TYPES[1], geometry);
		 
		if(this.handler.radiusDist && (this.handler.radiusDist == 0 || this.handler.radiusDist > 500)) {
			alert("검색반경은 0m 와 500m 이내로 설정해주세요");
			return;
		}
		
		
		if(this.layerTool) {
			this.tables = [];
			var layers = this.layerTool.getLayers({con : 'attr',conVal : 1,order : 'asc'});
			
			var sld = this.layerTool.getSld();
			var namedLayers = sld.namedLayers;
			
			
			for(var i in namedLayers) {
				var userStyles = namedLayers[i].userStyle;
				for(var j in userStyles) {
					var rules = userStyles[j].rules;
					
					for(var k in rules) {
						if(rules[k].symbolizer.text) continue;
						
						var count = 0;
						
						var scale = parseInt(this.map.getScale());
						var maxScale = rules[k].maxScale;
						if(maxScale == 0) {
							maxScale = parseInt(OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(0), this.map.units));
						}
						
						if(maxScale >= scale && scale >= rules[k].minScale) {
							for(var l in layers) {
								if(namedLayers[i].name == layers[l].theme) {
									if(layers[l].show == 1){
										var exist = false;
										for(var m in this.tables) {
											if(this.tables[m] == layers[l].table) {
												exist = true;
												break;
											}
										}
										if(!exist) this.tables.push(layers[l].table);
									}
								}
							}
							break;
						}
					}
				}
			}
			if(this.tables.length < 1) {
				alert("조건에 맞는 레이어가 없습니다.");
				return;
			}
		}
	 
		var control = this;
		if(this.handler.CLASS_NAME == "NUTs.Handler.Point") {
			NUTs.WFS.getFeatureByDWithin(
				this.serviceUrl, 
				{
					prefix : this.prefix,
					tables : this.tables,
					distance : this.distance,
					values : [geometry],
					sortFields : this.sortFields,
					sortOrders : this.sortOrders,
					useDomain : this.useDomain
				}, 
				function(res) {
					control.result = res;
					control.events.triggerEvent(control.EVENT_TYPES[0], res);
				},
				{
					alias : this.alias,
					titles : this.titles
				}
			);
		}
		else {
			NUTs.WFS.getFeatureByGeometry(
				this.serviceUrl, 
				{
					prefix : this.prefix,
					tables : this.tables,
					values : [geometry],
					sortFields : this.sortFields,
					sortOrders : this.sortOrders,
					useDomain : this.useDomain
				}, 
				function(res) {
					control.result = res;
					control.events.triggerEvent(control.EVENT_TYPES[0], res);
				},
				{
					alias : this.alias,
					titles : this.titles
				}
			);
		}
    },
    
    getResult : function() {
    	return this.result;
    },
	
	CLASS_NAME: "NUTs.Control.GetFeature" 
});



/*=[ PanZoomBar.js ]==========================================================================*/


/**
 * Constant: X
 * {Integer}
 */
OpenLayers.Control.PanZoom.X = 4;

/**
 * Constant: Y
 * {Integer}
 */
OpenLayers.Control.PanZoom.Y = 4;

NUTs.Control.PanZoomBar = OpenLayers.Class(OpenLayers.Control.PanZoomBar, {
	/**
	 * 툴바 이미지 정보
	 */
	imgUrl : "/images/GMap/PanZoomBar/",

	/**
	 * 축척 확대 툴바
	 */
	imgZoomIn : "scale_plus.png",
	
	/**
	 * 축척 축소 툴바
	 */
	imgZoomOut : "scale_minus.png",
	
	/**
	 * 현재 축척바 위쪽 표현 이미지
	 */
	imgZoomBasic : "scale_basic.png",
	
	/**
	 * 현재 축척바 아래쪽 표현 이미지
	 */
	imgZoomBarOn : "scale_on.png",
	
	/**
	 * 현재 축척바
	 */
	imgZoomBar : "scale_bar.png",
	
	/**
	 * 축척 확대/축소 이미지 사이즈
	 */
	size : new OpenLayers.Size(25, 20),
	
	/**
	 * 축척바 사이즈
	 */
	zoombarSize : new OpenLayers.Size(27,7),
	
	/**
	 * 정렬 기준 
	 */
	flow : "right",
	
	/**
	 *	위치 
	 */
	offsetPixel : new OpenLayers.Pixel(50, 0),
	
	draw: function(px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);

		this.moveToZoomBar();
		
		px = this.position.clone();
		
        // place the controls
        this.buttons = [];

		var sz = this.size;
        var centered = new OpenLayers.Pixel(px.x+sz.w/2, px.y);
		
		/**
		 * 필요 없는 버튼 제거
		 */
        this._addButton("zoomin", this.imgUrl + this.imgZoomIn, centered.add(0, sz.h*3+5), sz);
        centered = this._addZoomBar(centered.add(0, sz.h*4 + 5));
        this._addButton("zoomout", this.imgUrl + this.imgZoomOut, centered, sz);
		
        return this.div;
    },
	
	moveToZoomBar : function() {
		/**
		 * 우측 정렬일 경우
		 */
		if(this.flow == "right") {
			this.offsetPixel.x = $("#map").width() - this.offsetPixel.x;
		}		
		this.moveTo(this.offsetPixel);
	},
	
	_addZoomBar:function(centered) {
		/**
		 * 전체적으로 이미지 경로 수정
		 */
        var imgLocation = this.imgUrl;
        
        var id = this.id + "_" + this.map.id;
        var zoomsToEnd = this.map.getNumZoomLevels() - 1 - this.map.getZoom();
        var slider = OpenLayers.Util.createAlphaImageDiv(id,
                       centered.add(-1, zoomsToEnd * this.zoomStopHeight), 
                       new OpenLayers.Size(27,7),
                       imgLocation+this.imgZoomBar,
                       "absolute");
        this.slider = slider;
        
        this.sliderEvents = new OpenLayers.Events(this, slider, null, true,
                                            {includeXY: true});
        this.sliderEvents.on({
            "mousedown": this.zoomBarDown,
            "mousemove": this.zoomBarDrag,
            "mouseup": this.zoomBarUp,
            "dblclick": this.doubleClick,
            "click": this.doubleClick
        });
        
        var sz = new OpenLayers.Size();
        sz.h = this.zoomStopHeight * this.map.getNumZoomLevels();
        sz.w = this.zoomStopWidth;
        var div = null;
        
        if (OpenLayers.Util.alphaHack()) {
            var id = this.id + "_" + this.map.id;
            div = OpenLayers.Util.createAlphaImageDiv(id, centered,
                                      new OpenLayers.Size(sz.w, 
                                              this.zoomStopHeight),
                                      imgLocation + this.imgZoomBarOn, 
                                      "absolute", null, "crop");
            div.style.height = sz.h + "px";
        } else {
            div = OpenLayers.Util.createDiv(
                        'OpenLayers_Control_PanZoomBar_Zoombar' + this.map.id,
                        centered,
                        sz,
                        imgLocation+this.imgZoomBarOn);
        }
		
        this.zoombarDiv = div;
        
        this.divEvents = new OpenLayers.Events(this, div, null, true, 
                                                {includeXY: true});
												
        this.divEvents.on({
            "mousedown": this.divClick,
            "mousemove": this.passEventToSlider,
            "dblclick": this.doubleClick,
            "click": this.doubleClick
        });
        
        this.div.appendChild(div);
		
		/**
		 * 축척바 위쪽 표현 DIV 추가
		 */
		this.zoomBasicDiv = OpenLayers.Util.createDiv(
                        'OpenLayers_Control_PanZoomBar_ZoombarBasic' + this.map.id,
                        centered,
                        new OpenLayers.Size(sz.w, this.zoomStopHeight * (this.map.getNumZoomLevels() - this.map.getZoom() - 1)),
                        imgLocation+this.imgZoomBasic);
						
		this.divEvents = new OpenLayers.Events(this, this.zoomBasicDiv, null, true, 
                                                {includeXY: true});
												
        this.divEvents.on({
            "mousedown": this.divClick,
            "mousemove": this.passEventToSlider,
            "dblclick": this.doubleClick,
            "click": this.doubleClick
        });				
		
		this.div.appendChild(this.zoomBasicDiv);

        this.startTop = parseInt(div.style.top);
        this.div.appendChild(slider);

        this.map.events.register("zoomend", this, this.moveZoomBar);

        centered = centered.add(0, 
            this.zoomStopHeight * this.map.getNumZoomLevels());
        return centered; 
    },
	
	zoomBarUp:function(evt) {
        if (!OpenLayers.Event.isLeftClick(evt)) {
            return;
        }
        if (this.mouseDragStart) {
            this.div.style.cursor="";
            this.map.events.un({
                "mouseup": this.passEventToSlider,
                "mousemove": this.passEventToSlider,
                scope: this
            });
            var deltaY = this.zoomStart.y - evt.xy.y;
            var zoomLevel = this.map.zoom;
            if (!this.forceFixedZoomLevel && this.map.fractionalZoom) {
                zoomLevel += deltaY/this.zoomStopHeight;
                zoomLevel = Math.min(Math.max(zoomLevel, 0), 
                                     this.map.getNumZoomLevels() - 1);
            } else {
                zoomLevel += Math.round(deltaY/this.zoomStopHeight);
            }
			
			/**
			 * 최소, 최대 이상 축척으로 드래그 시 처리
			 */ 			
			if(zoomLevel > this.map.getNumZoomLevels()-1) {
				zoomLevel = this.map.getNumZoomLevels()-1;
			}
			else if(zoomLevel < 0) {
				zoomLevel = 0;
			}
			
            this.map.zoomTo(zoomLevel);
            this.mouseDragStart = null;
            this.zoomStart = null;
            OpenLayers.Event.stop(evt);
        }
    },
	
    moveZoomBar:function() {
        var newTop = 
            ((this.map.getNumZoomLevels()-1) - this.map.getZoom()) * 
            this.zoomStopHeight + this.startTop + 1;
        this.slider.style.top = newTop + "px";
		
		/**
		 * 축척바 위쪽의 DIV 높이 수정
		 */		
		this.zoomBasicDiv.style.height = (this.zoomStopHeight * (this.map.getNumZoomLevels() - this.map.getZoom() - 1)) + "px";
    },
	

	CLASS_NAME: "NUTs.Control.PanZoomBar"
});





/*=[ SelectFeature.js ]==========================================================================*/

NUTs.Control.SelectFeature = OpenLayers.Class(OpenLayers.Control.SelectFeature, {

	/**
	 * 초기화
	 * box 옵션 추가시 NUTs.Handler.Box 사용
	 */
	initialize: function(layers, options) {
        // concatenate events specific to this control with those from the base
        /*this.EVENT_TYPES =
            OpenLayers.Control.SelectFeature.prototype.EVENT_TYPES.concat(
            OpenLayers.Control.prototype.EVENT_TYPES
        );*/
        OpenLayers.Control.prototype.initialize.apply(this, [options]);

        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);
        var callbacks = {
            click: this.clickFeature,
            clickout: this.clickoutFeature
        };
        if (this.hover) {
            callbacks.over = this.overFeature;
            callbacks.out = this.outFeature;
        }

        this.callbacks = OpenLayers.Util.extend(callbacks, this.callbacks);
        this.handlers = {
            feature: new OpenLayers.Handler.Feature(
                this, this.layer, this.callbacks,
                {geometryTypes: this.geometryTypes}
            )
        };

        if (this.box) {
            this.handlers.box = new NUTs.Handler.Box(
                this, {done: this.selectBox},
                {boxDivClassName: "olHandlerBoxSelectFeature"}
            );
        }
    },
    /**
     * Method: select
     * Add feature to the layer's selectedFeature array, render the feature as
     * selected, and call the onSelect function.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>}
     */
    select: function(feature) {
        var cont = this.onBeforeSelect.call(this.scope, feature);
        var layer = feature.layer;
        if(cont !== false) {
            cont = layer.events.triggerEvent("beforefeatureselected", {
                feature: feature
            });
            if(cont !== false) {
                layer.selectedFeatures.push(feature);
                this.highlight(feature);

                if(editor) {
                	if(editor.getGeomType(feature.geometry) !== "Point")
                		//console.log('GSelectFeature');
                		editor.drawBorder(feature);
                }

                // if the feature handler isn't involved in the feature
                // selection (because the box handler is used or the
                // feature is selected programatically) we fake the
                // feature handler to allow unselecting on click
                if(!this.handlers.feature.lastFeature) {
                    this.handlers.feature.lastFeature = layer.selectedFeatures[0];
                }
                layer.events.triggerEvent("featureselected", {feature: feature});
                this.onSelect.call(this.scope, feature);
            }
        }
    },

    /**
     * Method: unselect
     * Remove feature from the layer's selectedFeature array, render the feature as
     * normal, and call the onUnselect function.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>}
     */
    unselect: function(feature) {
        var layer = feature.layer;
        // Store feature style for restoration later
        this.unhighlight(feature);
        OpenLayers.Util.removeItem(layer.selectedFeatures, feature);
        layer.events.triggerEvent("featureunselected", {feature: feature});
        this.onUnselect.call(this.scope, feature);
    },

    /**
     * Method: highlight
     * Redraw feature with the select style.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>}
     */
    highlight: function(feature) {
        var layer = feature.layer;
        var cont = this.events.triggerEvent("beforefeaturehighlighted", {
            feature : feature
        });
        if(cont !== false) {
            feature._prevHighlighter = feature._lastHighlighter;
            feature._lastHighlighter = this.id;
            var style = this.selectStyle || this.renderIntent;
            layer.drawFeature(feature, style);
            this.events.triggerEvent("featurehighlighted", {feature : feature});
        }
    },

    /**
     * Method: unhighlight
     * Redraw feature with the "default" style
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>}
     */
    unhighlight: function(feature) {
        var layer = feature.layer;

        if(feature._prevHighlighter == undefined) {
            delete feature._lastHighlighter;
        } else if(feature._prevHighlighter == this.id) {
            delete feature._prevHighlighter;
        } else {
            feature._lastHighlighter = feature._prevHighlighter;
            delete feature._prevHighlighter;
        }
        layer.drawFeature(feature, feature.style || feature.layer.style ||
            "default");
        this.events.triggerEvent("featureunhighlighted", {feature : feature});
    },

    /**
     * Method: selectBox
     * Callback from the handlers.box set up when <box> selection is true
     *     on.
     *
     * Parameters:
     * position - {<OpenLayers.Bounds> || <OpenLayers.Pixel> }
     */
    selectBox: function(position) {
        if (position instanceof NUTs.Bounds) {
            var minXY = this.map.getLonLatFromPixel({
                x: position.left,
                y: position.bottom
            });
            var maxXY = this.map.getLonLatFromPixel({
                x: position.right,
                y: position.top
            });
            var bounds = new NUTs.Bounds(
                minXY.lon, minXY.lat, maxXY.lon, maxXY.lat
            );

            // if multiple is false, first deselect currently selected features
            if (!this.multipleSelect()) {
                this.unselectAll();
            }

            // because we're using a box, we consider we want multiple selection
            var prevMultiple = this.multiple;
            this.multiple = true;
            var layers = this.layers || [this.layer];
            this.events.triggerEvent("boxselectionstart", {layers: layers});
            var layer;

            this.unselectAll();

            for(var l=0; l<layers.length; ++l) {
                layer = layers[l];
                for(var i=0, len = layer.features.length; i<len; ++i) {
                    var feature = layer.features[i];
                    // check if the feature is displayed
                    if (!feature.getVisibility()) {
                        continue;
                    }

                    if (this.geometryTypes == null || OpenLayers.Util.indexOf(
                            this.geometryTypes, feature.geometry.CLASS_NAME) > -1) {
                        if (bounds.toGeometry().intersects(feature.geometry)) {
                            if (OpenLayers.Util.indexOf(layer.selectedFeatures, feature) == -1) {
                                this.select(feature);
                            }
                        }
                    }
                }
            }
            this.multiple = prevMultiple;
            this.events.triggerEvent("boxselectionend", {layers: layers});
        }
    },
	/**
	 * hover 시에도 click 이벤트가 실행 되도록 수정
	 * @param {Object} feature
	 */
	clickFeature: function(feature) {
		if(!this.hover) {
	        var selected = (OpenLayers.Util.indexOf(
	            feature.layer.selectedFeatures, feature) > -1);
	        if(selected) {
	            if(this.toggleSelect()) {
	                this.unselect(feature);
	            } else if(!this.multipleSelect()) {
	                this.unselectAll({except: feature});
	            }
	        } else {
	            if(!this.multipleSelect()) {
	                this.unselectAll({except: feature});
	            }
	            this.select(feature);
	        }
	    }
		else {
			if(this.onHoverClick) this.onHoverClick.call(this.scope, feature);
		}
	},

	featureselected: function(feature) {
		alert(feature);
	},

	onUnselectAll: function() {},

	unselectAll: function(options) {
        // we'll want an option to supress notification here
        var layers = this.layers || [this.layer];
        var layer, feature;
        for(var l=0; l<layers.length; ++l) {
            layer = layers[l];
            for(var i=layer.selectedFeatures.length-1; i>=0; --i) {
                feature = layer.selectedFeatures[i];
                if(!options || options.except != feature) {
                    this.unselect(feature);
                }
            }
        }

		$(".olControlDrawText").each(function() {
			$(this).removeClass("on");
			$(this).addClass("off");
		});

		editor.effectLayer.removeAllFeatures();

		this.onUnselectAll();
    },

	selectTextPopup : function(element) {
    	/*
		var active = $(element).hasClass("on");

		this.unselectAll();

		if(!active) {
			$(element).removeClass("off");
			$(element).addClass("on");

			var popup = this.map.getPopup($(element).attr("id"));

			popup.attributes = {
				'fontFamily' : $(element).css('font-family'),
				'fontSize' : $(element).css('font-size'),
				'fontColor' : $(element).css('color')
			};
		}
		*/
	},

	CLASS_NAME: "NUTs.Control.SelectFeature"
});



/*=[ ZoomBoxIndex.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : GMap.js
 * 설 명 : GMapAPI
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.25		최원석				0.1					최초 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Control.ZoomBoxIndex = OpenLayers.Class(OpenLayers.Control.ZoomBox, {
	/**
	 * 기준 지도 객체
	 */
    baseMap : null,

   /**********************************************************************************
	 * 함수명 : draw
	 * 설 명 : 영역 박스를 그림
	 * 사용법 : draw()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		핸들러로 Box 에서 NUTs.Handler.Box를 등록 하도록 수정
	 * 								indexMap 을 true 로 지정
	 * 								
	 **********************************************************************************/  
    draw: function() {
        this.handler = new NUTs.Handler.Box( this,
                            {done: this.zoomBox}, {indexMap: true});
    },
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GZoomBoxIndex 객체 생성
	 * 인 자 : baseMap (기준 지도 객체), options(생성 옵션 들)
	 * 사용법 : initialize(baseMap, options)
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초생성
	 * 
	 **********************************************************************************/  
    initialize: function (baseMap, options) {
    	this.baseMap = baseMap;
    	OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },

    /**********************************************************************************
	 * 함수명 : zoomBox (생성자 함수)
	 * 설 명 : 색인도 안의 영역 박스에 따른 기준 맵의 이동
	 * 인 자 : position (기준 지도 객체), options(생성 옵션 들)
	 * 사용법 : zoomBox(position)
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		ZoomBox.js 의 zoomBox 함수를 복사
	 * 								색인도의 기능을 하도록 기준 맵의 이동 기능 추가
	 * 
	 **********************************************************************************/
    zoomBox: function (position) {
    	if(position instanceof OpenLayers.Bounds) {
    		if (!this.out) {
                var minXY = this.map.getLonLatFromPixel(
                            new OpenLayers.Pixel(position.left, position.bottom));
                var maxXY = this.map.getLonLatFromPixel(
                            new OpenLayers.Pixel(position.right, position.top));
                var bounds = new NUTs.Bounds(minXY.lon, minXY.lat,
                                               maxXY.lon, maxXY.lat);
            } else {
                var pixWidth = Math.abs(position.right-position.left);
                var pixHeight = Math.abs(position.top-position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight),
                    (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.getLonLatFromPixel(
                    position.getCenterPixel());
                var xmin = center.lon - (extent.getWidth()/2)*zoomFactor;
                var xmax = center.lon + (extent.getWidth()/2)*zoomFactor;
                var ymin = center.lat - (extent.getHeight()/2)*zoomFactor;
                var ymax = center.lat + (extent.getHeight()/2)*zoomFactor;
                var bounds = new NUTs.Bounds(xmin, ymin, xmax, ymax);
            }
    		this.baseMap.zoomToExtent(bounds, true);
    	}
    	else { // it's a pixel
    		this.baseMap.setCenter(this.map.getLonLatFromPixel(position), this.baseMap.numZoomLevels-1);
    	}
    },
	
    CLASS_NAME: 'NUTs.Control.ZoomBoxIndex'
});




/*=[ ZoomIn.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : GZoomIn.js
 * 설 명 : OpenLayers.Control.ZoomBox 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Control.ZoomIn = OpenLayers.Class(OpenLayers.Control.ZoomBox, {
	
	/**********************************************************************************
	 * 함수명 : draw
	 * 설 명 : 영역 박스를 그림
	 * 사용법 : draw()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		핸들러로 Box 에서 NUTs.Handler.Box를 등록 하도록 수정
	 * 								
	 **********************************************************************************/
	draw: function() {
        this.handler = new NUTs.Handler.Box( this,
                            {done: this.zoomBox}, {keyMask: this.keyMask} );
    },
		
	CLASS_NAME: "NUTs.Control.ZoomIn"
});



/*=[ ZoomOut.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : GZoomOut.js
 * 설 명 : OpenLayers.Control.ZoomBox 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Control.ZoomOut = OpenLayers.Class(OpenLayers.Control.ZoomBox, {
	
	/**
	 * 축소
	 */
	out : true,
	
	/**********************************************************************************
	 * 함수명 : draw
	 * 설 명 : 영역 박스를 그림
	 * 사용법 : draw()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		핸들러로 Box 에서 NUTs.Handler.Box를 등록 하도록 수정
	 * 								
	 **********************************************************************************/
	draw: function() {
        this.handler = new NUTs.Handler.Box( this,
                            {done: this.zoomBox}, {keyMask: this.keyMask} );
    },
	
	CLASS_NAME: "NUTs.Control.ZoomOut"
});



/*=[ DeleteVertex.js ]==========================================================================*/

NUTs.Edit.Control.DeleteVertex = OpenLayers.Class(OpenLayers.Control.ModifyFeature, {
    initialize: function(layer, options) {
        options = options || {};
        this.layer = layer;
        this.vertices = [];
        this.virtualVertices = [];
        this.virtualStyle = OpenLayers.Util.extend({},
            this.layer.style ||
            this.layer.styleMap.createSymbolizer(null, options.vertexRenderIntent)
        );
        this.virtualStyle.fillOpacity = 0.3;
        this.virtualStyle.strokeOpacity = 0.3;
        this.deleteCodes = [46, 68];
        this.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        if(!(OpenLayers.Util.isArray(this.deleteCodes))) {
            this.deleteCodes = [this.deleteCodes];
        }
        var control = this;

        // configure the select control
        var selectOptions = {
            geometryTypes: this.geometryTypes,
            clickout: this.clickout,
            toggle: this.toggle,
            onBeforeSelect: this.beforeSelectFeature,
            onSelect: this.selectFeature,
            onUnselect: this.unselectFeature,
            scope: this
        };
        if(this.standalone === false) {
            this.selectControl = new OpenLayers.Control.SelectFeature(
                layer, selectOptions
            );
        }
        
        var dragCallbacks = {};
        // configure the drag control
        var dragOptions = {
            geometryTypes: ["OpenLayers.Geometry.Point"],
            onStart: function(feature, pixel) {
                control.dragStart.apply(control, [feature, pixel]);
            },
            onDrag: function(feature, pixel) {
                control.dragVertex.apply(control, [feature, pixel]);
            },
            onComplete: function(feature) {
                control.dragComplete.apply(control, [feature]);
            },
            featureCallbacks: {
                over: function(feature) {
                    /**
                     * In normal mode, the feature handler is set up to allow
                     * dragging of all points.  In standalone mode, we only
                     * want to allow dragging of sketch vertices and virtual
                     * vertices - or, in the case of a modifiable point, the
                     * point itself.
                     */
                    if(control.standalone !== true || feature._sketch ||
                       control.feature === feature) {
                        control.dragControl.overFeature.apply(
                            control.dragControl, [feature]);
                    }
                },
                // === Override is here ===
                // register a click callback as well to trigger a custom vector
                // layer event : "vertexclicked".
                click: function(feature) {
                    this.layer.events.triggerEvent(
                        "vertexclicked", {feature: feature}
                    );
                }
            }
        };
        this.dragControl = new OpenLayers.Control.DragFeature(
            layer, dragOptions
        );

        // configure the keyboard handler
        var keyboardOptions = {
            keydown: this.handleKeypress
        };
        
        this.handlers = {
            keyboard: new OpenLayers.Handler.Keyboard(this, keyboardOptions) 
        };
    }, 
    activate: function() {
        return ((this.standalone || this.selectControl.activate()) &&
                this.handlers.keyboard.activate() &&
                OpenLayers.Control.prototype.activate.apply(this, arguments));
    },
    deactivate: function() {
        var deactivated = false;
        // the return from the controls is unimportant in this case
        if(OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.layer.removeFeatures(this.vertices, {silent: true});
            this.layer.removeFeatures(this.virtualVertices, {silent: true});
            this.vertices = [];
            this.dragControl.deactivate();
            var feature = this.feature;
            var valid = feature && feature.geometry && feature.layer;
            if(this.standalone === false) {
                if(valid) {
                    this.selectControl.unselect.apply(this.selectControl,
                                                      [feature]);
                }
                this.selectControl.deactivate();
            } else {
                if(valid) {
                    this.unselectFeature(feature);
                }
            }
            this.handlers.keyboard.deactivate();
            deactivated = true;
        }
        return deactivated;
    },
    setMap: function(map) {
        this.standalone || this.selectControl.setMap(map);
        this.dragControl.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },
    CLASS_NAME: "NUTs.Edit.Control.DeleteVertex"
});



/*=[ DragFeature.js ]==========================================================================*/


NUTs.Edit.Control.DragFeature = OpenLayers.Class(OpenLayers.Editor.Control.DragFeature, {
	/**
     * @type {OpenLayers.Layer.Vector}
     */
    editLayer: null,
	title: OpenLayers.i18n('oleDragFeature'),
    EVENT_TYPES: ["activate", "deactivate", 'dragstart', 'dragdrag', 'dragcomplete', 'dragenter', 'dragleave'],
    
    initialize: function(layer, options) {

        this.editLayer = layer;
        OpenLayers.Control.DragFeature.prototype.initialize.apply(this, [layer, options]);
        // allow changing the layer title by using translations
        this.title = OpenLayers.i18n('oleDragFeature');
    },
    
    /**
     * Method: clickFeature
     * Called when the feature handler detects a click-in on a feature.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>}
     */
    clickFeature: function(feature) {

    	MAP_EDITOR.fn_draw_oneFeatureBorder(feature,'selectpoint');

        if (this.handlers.feature.touch && !this.over && this.overFeature(feature)) {
            this.handlers.drag.dragstart(this.handlers.feature.evt);
            // to let the events propagate to the feature handler (click callback)
            this.handlers.drag.stopDown = false;
        }
    },
    
    // Add events corresponding to callbacks of OpenLayers.Control.DragFeature
    onStart: function(feature, pixel){
    	var featureLength = feature.length;
    	var arrFeatureInfo = new Array();
    	
    	if(featureLength > 0) {
    		var posList = new Array();
    		var pointLength = 0;
    		var posX, posY;
    		
    		for(var i=0;i<featureLength;i++){
    			
    			posList = feature[i].geometry.getVertices();
    			pointLength = posList.length;
    			if(pointLength >0)
    			for(var j=0;j<pointLength;j++){
    				posX = posList[j].x;
    				posY = posList[j].y;
    				//arrFeatureInfo.push(posX + " " + posY);
    				if(j == 0 || j == (pointLength-1))
    					alert("["+j+"]"+posX+","+posY);
    			}
    		}
    	}
    },
    
    onComplete: function(feature, pixel) {
    	
    	var olFeature = feature;
    	editor.oSearchResult.data[0].results[0].feature.geometry = olFeature.geometry; // 이동한 위치로 oSearchResult 갱신

    	this.drawDragFeature = function(){    		
    		MAP_EDITOR.fn_proc_modifiedFeature(oOriginGInnerFeatureClone, sLayerName, sG2Id);
    		
            oOriginGInnerFeatureClone.state = OpenLayers.State.UPDATE;
            this.editLayer.events.triggerEvent("dragcomplete", {
                feature: oOriginGInnerFeatureClone
            });
    	}

    	var sFId = MAP_EDITOR.fn_get_fidByFeature(olFeature);
    	var sLayerName = MAP_EDITOR.fn_get_tblNameByFeature(olFeature);
    	var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(olFeature);
    	var oOriginGInnerFeatureClone = MAP_EDITOR.fn_deepClone_featureToGInnerFeature(olFeature); // 현재 편집된(dragcomplete 된) feature 원본. this.drawDragFeature()에서 인자 feature를 썻을때 scope문제로 못 찾는 경우가 생겨서.
    	
    	var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(olFeature, sFId, '');
    	olFeature = oGFeature.feature;
    	
        // 룰 적용 - ehyun.2016.05.09
    	var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();    
        if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.modify) === false){
        	for(var key in oEditRuleInfo.operType.modify){
        		var sEditRule = oEditRuleInfo.operType.modify[key].rule;	
        		if(sEditRule.indexOf('checkRelationGeometryMoveToByOffset') > -1){
        			oEditRuleInfo.operType.modify.splice(key,1);
        			break;
        		}
        	}
        	
        	if(oEditRuleInfo.operType.modify.length > 0){	// 'checkRelationGeometryMove' or 'checkRelationGeometryMoveEndPoint' 일때
            	// feature.modified 정보는 편집 시점을 기준으로, 편집 시도 바로 전 originalGeometry임.
            	// DragFeature편집시 마다 최종 편집이 완료된 바로 전 도형정보를 가져와야 하므로
            	var oEmJsonFeatureObj = editor.editingFeatures[sLayerName][sG2Id];
        		if(NUTs.Util.isEmptyObject(oEmJsonFeatureObj) === false){
        			var oGInnerFeature = editor.makeFeatureByPosList(oEmJsonFeatureObj.type, oEmJsonFeatureObj.posList, sFId);
        			olFeature.state = OpenLayers.State.UPDATE;
        			olFeature.modified = OpenLayers.Util.extend(olFeature.modified, {
                        geometry: oGInnerFeature.geometry,
                        control : 'CustomDragFeature'
                    });
        		}
        		else
        			olFeature.modified = {};

        		NUTs.EditRule.editingGeometry = olFeature;

        		if(olFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','') === 'LineString'){
        			// Drag 이전과 이후, feature의 첫번째 vertex를(정점 편집이 아닌 feature전체가 이동하므로 특정 점 하나만 기준으로 삼으면 됨) 가지고 이동 거리를 계산하여 이동수치를 찾아낸다.            		                	
        			NUTs.EditRule.offset.x = olFeature.geometry.components[0].x - olFeature.modified.geometry.components[0].x;
        			NUTs.EditRule.offset.y = olFeature.geometry.components[0].y - olFeature.modified.geometry.components[0].y;
        		}

        		for(var i=0,len=oEditRuleInfo.operType.modify.length; i<len; i++){
        			var sEditRule = oEditRuleInfo.operType.modify[i].rule;

        			$.globalEval(sEditRule);

        			this.drawDragFeature();
        			NUTs.EditRule.resultGeometry = {};
        		}
        	}
        	else			// checkRelationGeometryMoveToByOffset 일때
        		this.drawDragFeature();
        }	
        else 
        	this.drawDragFeature();
    },
    
    CLASS_NAME: "NUTs.Edit.Control.DragFeature"
});



/*=[ DrawHole.js ]==========================================================================*/

/**
 * @copyright  2011 geOps
 * @license    https://github.com/geops/ole/blob/master/license.txt
 * @link       https://github.com/geops/ole
 */

/**
 * Class: OpenLayers.Editor.Control.DrawHole
 * The DrawHole control provides a method to cut holes in features
 *     from a given layer. All vertices from the hole feature must
 *     lay within the targted feature and only the top most feature
 *     will be processed.
 *
 * Inherits from:
 *  - <OpenLayers.Control.DrawFeature>
 */

NUTs.Edit.Control.DrawHole = OpenLayers.Class(OpenLayers.Editor.Control.DrawHole, {

    /**
     * Property: minArea
     * {Number} Minimum hole area.
     */
    minArea: 0,

    title: OpenLayers.i18n('oleDrawHole'),
    
    /**
     * Constructor: OpenLayers.Editor.Control.DrawHole
     * Create a new control for deleting features.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>}
     * options - {Object} An optional object whose properties will be used
     *     to extend the control.
     */
    initialize: function (layer, options) {
        this.callbacks = OpenLayers.Util.extend(this.callbacks, {
            point: function(point) {
                this.layer.events.triggerEvent('pointadded', {point: point});
            }
        });
        
        OpenLayers.Control.DrawFeature.prototype.initialize.apply(this,
            [layer, OpenLayers.Handler.Polygon, options]);

        this.title = OpenLayers.i18n('oleDrawHole');

    },

    /**
     * Method: drawFeature
     * Cut hole only if area greater than or equal to minArea and all
     *     vertices intersect the targeted feature.
     * @param {OpenLayers.Geometry} geometry The hole to be drawn
     */
    drawFeature: function (geometry) {

        var feature = new OpenLayers.Feature.Vector(geometry);
        feature.state = OpenLayers.State.INSERT;
        // Trigger sketchcomplete and allow listeners to prevent modifications
        var proceed = this.layer.events.triggerEvent('sketchcomplete', {feature: feature});
        
        if (proceed !== false && geometry.getArea() >= this.minArea) {
            var vertices = geometry.getVertices(), intersects;
            
            features: for (var i = 0, li = this.layer.features.length; i < li; i++) {
                var layerFeature = this.layer.features[i];
                
                intersects = true;
                for (var j = 0, lj = vertices.length; j < lj; j++) {
                    if (!layerFeature.geometry.intersects(vertices[j])) {
                        intersects = false;
                    }
                }
                if (intersects) {
                    layerFeature.state = OpenLayers.State.UPDATE;
                    // Notify listeners that a feature is about to be modified
                    this.layer.events.triggerEvent("beforefeaturemodified", {
                        feature: layerFeature
                    });
                    layerFeature.geometry.components.push(geometry.components[0]);
                    this.layer.drawFeature(layerFeature);
                    // More event triggering but documentation is not clear how the following 2 are distinguished
                    // Notify listeners that a feature is modified
                    this.layer.events.triggerEvent("featuremodified", {
                        feature: layerFeature
                    });
                    // Notify listeners that a feature was modified
                    this.layer.events.triggerEvent("afterfeaturemodified", {
                        feature: layerFeature
                    });
                    break features;
                }
            }
        }
    },

    CLASS_NAME: 'NUTs.Edit.Control.DrawHole'
});



/*=[ DrawPath.js ]==========================================================================*/

/**********************************************
 * 클래스명 : OpenLayers.Editor.Control.DrawCustomPath
 * 설  명 : 커스터마이징 DrawPath
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.08.27    윤은희      신규작업
 * 2015.08.28    윤은희		  featureType 추가
 * 2015.08.28    윤은희		  added feature의 정보를 편집모니터에 등록
 * 2016.05.02    윤은희		  룰 적용
 * 2016.05.13    최재훈		  deactive 추가
 * 2016.08.18    윤은희		  교차옵션처리 추가
 */

NUTs.Edit.Control.DrawPath = OpenLayers.Class(OpenLayers.Editor.Control.DrawPath, {
	 /**
     * Property: minLength
     * {Number} Minimum length of new paths.
     */
    minLength: 0,

    title: OpenLayers.i18n('oleDrawPath'),
   
    featureType: 'linestring',
    
    /**
     * divide 수행할 Base Feature
     */
    forDivideFeature: null,
    
    /**
     * Draw Mode : 'add'
     */
    mode: '',
    
    /**
     * 교차옵션
     */
    crossOption: '',

    /**
     * Constructor: OpenLayers.Editor.Control.DrawPath
     * Create a new control for drawing paths.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} Paths will be added to this layer.
     * options - {Object} An optional object whose properties will be used
     *     to extend the control.
     */
    initialize: function (layer, options) {
        this.callbacks = OpenLayers.Util.extend(this.callbacks, {
            point: function(point) {
                this.layer.events.triggerEvent('pointadded', {point: point});
            }
        });
        
        OpenLayers.Control.DrawFeature.prototype.initialize.apply(this,
//        	[layer, OpenLayers.Handler.Path, options]);
        	[layer, NUTs.Handler.Path, options]);
        
        this.title = OpenLayers.i18n('oleDrawPath');
    },
    activate: function () {
    	
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if(this.map) {
            OpenLayers.Element.addClass(
                this.map.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("activate");
        return true;
    },
    
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.map) {
                OpenLayers.Element.removeClass(
                    this.map.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
             
            var snapCtrl = map.getControl("SnappingSettings");
            if(snapCtrl){
            	MAP_EDITOR.fn_remove_snapPopup();
                snapCtrl.popup = null;
            }
            
            return true;
        }
        
        return false;
    },
      
    initDivideProperties: function(){
    	NUTs.Edit.Control.DrawPath.forDivideFeature = null;		// this.forDivideFeature = null ??
    	NUTs.Edit.Control.DrawPath.mode = '';					// this.mode = '' ??
    	NUTs.Edit.Control.DrawPath.crossOption = '';			// this.crossOption = '' ??
    },

    /**
     * Method: draw path only if area greater than or equal to minLength
     */
    drawFeature: function (geometry) {
    	var DrawPath = NUTs.Edit.Control.DrawPath;
    	if(DrawPath.crossOption === 'cross'){	// 더블클릭 종료시, 분할 대상이 되지 않은 마지막 입력 개체
    		geometry = DrawPath.forDivideFeature.geometry;
    		if(geometry.components.length === 1){
    			this.initDivideFeature();
    			return;
    		}
    	}
    	
    	this.addDrawFeatures = function(){
    		var oStyle = MAP_EDITOR.fn_get_editFeatureStyle(feature);
    		feature.style = oStyle;
    		
    		this.layer.addFeatures([feature]);
            this.featureAdded(feature);            
            this.events.triggerEvent('featureadded', {feature : feature});
            this.layer.drawFeature(feature, sEditLayer.toLowerCase());
    	}
    	
    	this.initDivideFeature = function(){
    		 if(DrawPath.crossOption === 'cross' || DrawPath.crossOption === 'over')
    			 DrawPath.forDivideFeature = null;
    	}
    	
    	this.applyCrossOption = function(){
    		var sState = '';
    		
    		if(DrawPath.crossOption){
    			switch(DrawPath.crossOption){
	    			case 'none':			// [없음]
	    				break;
	    			case 'cut':				// [접합] 입력 feature와 교차하는 개체를 찾아서 발견되면, 입력한 feature와의 교차점에서 분할처리(교차점부터 입력 feature의 끝점까지는 제거함)
	    				var oIntersectsGeom = NUTs.EditRule.checkRelationGeometry(feature, sEditLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
	    				if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false){	    					
	    					if(oIntersectsGeom.data.length === 1){
	    						if(oIntersectsGeom.data[0].results.length >= 2)
		    						sState = 'over';
	    						else{
	    							// 입력 feature의 시작점과 intersect된 객체와의 거리가 입력 feature의 끝점보다 가깝고 tolerance보다 작으면, 시작점이 접점(ex. 스냅을 걸었을 경우)에 해당하므로 divide 수행하지 않음.	    							
	    							var oSPointGeom = NUTs.GeoJson.getGeoJson('Point', feature.geometry.components[0]);	    							
	    							var oEPointGeom = NUTs.GeoJson.getGeoJson('Point', feature.geometry.components[feature.geometry.components.length-1]);	    							
	    							var oCompLineStringGeom = NUTs.GeoJson.getGeoJson('LineString', oIntersectsGeom.data[0].results[0].feature.geometry.components);

	    							var nSCompDist = NUTs.JSTSOperator.Distance(oCompLineStringGeom, oSPointGeom);
	    							var nECompDist = NUTs.JSTSOperator.Distance(oCompLineStringGeom, oEPointGeom);

	    							if(nSCompDist > nECompDist){
	    								var aDividedObj = editor.getDivideLine(feature.geometry.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
			    						feature.geometry = editor.getGeometryByLineString(aDividedObj[0]);
	    							}
	    							else{		 
	    								if(nSCompDist < NUTs.EditRule.tolerance){		// 접점(ex. 스냅을 걸었을 경우)에 해당하는 경우
	    									;	// do nothing
	    								}
	    								else{
	    									var aDividedObj = editor.getDivideLine(feature.geometry.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
				    						feature.geometry = editor.getGeometryByLineString(aDividedObj[0]);
	    								}
	    							}	
	    						}	    						
	    					}
	    				}	    				
	    				break;
	    			case 'cross':			// [교차]
	    				break;
	    			case 'over':			// [상월]
	    				break;
	    			case 'under':			// [하월]
	    				break;
    			}    			
    		}
    		
    		return sState;
    	}
    	
    	if(editor.copyMode && NUTs.Util.isEmptyObject(editor.copiedField) === true){
    		NUTs.Util.showMessage('편집오류 - 시설물 복제 & 복제된 속성이 존재하지 않습니다. [검색결과]창에서 복제할 시설물의 속성을 먼저 선택하여 주세요.');
    		return;
    	}

    	var feature = new OpenLayers.Feature.Vector(geometry),
            proceed = this.layer.events.triggerEvent('sketchcomplete', {feature: feature});
    	
        if (proceed !== false && geometry.getLength() >= this.minLength) {   
        	var sG2Id = MAP_EDITOR.fn_get_newG2Id();
            var sEditLayer = COMMON.fn_get_editingLayer();
            
            var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(feature, sEditLayer.concat('.', sG2Id), OpenLayers.State.INSERT);
        	feature = oGFeature.feature;

            // check for EditRule
            var oResultLastPoint = {};
            var aAppliedEditRule=[];
            var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();
            if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.add) === false){
            	var sErrorMsg = [];
        		NUTs.EditRule.editingGeometry = feature;
            	
            	for(var i=0,len=oEditRuleInfo.operType.add.length; i<len; i++){

            		var sEditRule = oEditRuleInfo.operType.add[i].rule;            		
        			$.globalEval(sEditRule);

            		if(sEditRule.indexOf('checkRelationGeometry') !== -1){
            			if(NUTs.Util.isEmptyObject(NUTs.EditRule.resultGeometry) === false)
            				aAppliedEditRule.push('checkRelationGeometry');
            			else
            				sErrorMsg.push(oEditRuleInfo.operType.add[i].errorMsg + '</br>');
            		}
            		else if(sEditRule.indexOf('checkRelationAddPointOnGeometryEnd') !== -1){
            			if(NUTs.Util.isEmptyObject(NUTs.EditRule.resultGeometry) === false){
            				oResultLastPoint = NUTs.EditRule.resultGeometry;
            				aAppliedEditRule.push('checkRelationAddPointOnGeometryEnd');
            			}
            			else
            				sErrorMsg.push(oEditRuleInfo.operType.add[i].errorMsg + '</br>');
            		}	
            	}
            	
            	if(sErrorMsg.length >0){            		
            		this.initDivideFeature();            		
            		NUTs.Util.showMessage('편집룰오류 & [룰 위반] ' + sErrorMsg.join(''),4000);
            		return;
            	}	
            	
            	// draw the results
                if(aAppliedEditRule.length === oEditRuleInfo.operType.add.length){
                	if(!this.applyCrossOption()){
                		MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);
                		
            			this.addDrawFeatures();
            			
                    	for(var j=0; j<aAppliedEditRule.length; j++){
                    		if(aAppliedEditRule[j] === 'checkRelationAddPointOnGeometryEnd'){
                    			var sAddLayer = oEditRuleInfo.option[0].value;
                    			var madeKey = MAP_EDITOR.fn_create_featureByXY(sAddLayer, oResultLastPoint.x, oResultLastPoint.y, false);          	                
                    			if(madeKey){
                    				var aTmpInfo = madeKey.split('.');
                        			if(aTmpInfo.length ==2){
                        				
                        				var sTmpLayer = aTmpInfo[0];
                        				var sTmpG2id = aTmpInfo[1];
                        				
                                		var oTmpMasterEditingFeature 	= editor.editingFeatures[sEditLayer][sG2Id];
                        				var oTmpSubEditingFeature 		= editor.editingFeatures[sTmpLayer][sTmpG2id];

                                		if(oTmpMasterEditingFeature)
                                			oTmpMasterEditingFeature.refFid = madeKey;
                                		
                        				if(oTmpSubEditingFeature)
                        					oTmpSubEditingFeature.refFid = sEditLayer +'.'+sG2Id;

                        			}
                    			}
                    			
                    		}
                    	}
                    	NUTs.EditRule.resultGeometry = {};
                	}
                	else{
                		NUTs.EditRule.resultGeometry = {};
                		NUTs.Util.showMessage('편집오류 &  ' + COMMON.fn_get_EditKorLayerNm(sEditLayer) + '를 2개 이상 만나면 처리를 할 수 없습니다.');
                		return;
                	}
                }
            }
            else{
            	if(!this.applyCrossOption()){
            		MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);
            		if(editor.editingFeatures[sEditLayer] && editor.editingFeatures[sEditLayer][sG2Id])
            			feature.data = editor.editingFeatures[sEditLayer][sG2Id].properties; 		// 접합,교차를 통해 추가된 객체가 필드 속성을 보유하도록.

                	this.addDrawFeatures();	
            	}
            	else{
            		NUTs.Util.showMessage('편집오류 &  ' + COMMON.fn_get_EditKorLayerNm(sEditLayer) + '를 2개 이상 만나면 처리를 할 수 없습니다.');
            		return;
            	}
            }
            
            this.initDivideFeature();
        }
    },
    CLASS_NAME: 'NUTs.Edit.Control.DrawPath'
});




/*=[ DrawPoint.js ]==========================================================================*/

/**********************************************
 * 클래스명 : OpenLayers.Editor.Control.DrawCustomPoint
 * 설  명 : 커스터마이징 DrawPoint
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.08.28    윤은희      신규작업
 * 2015.08.28    윤은희		  added feature의 정보를 편집모니터에 등록
 * 2015.11.18	 	윤은희		  시설물 복제 시, 복제속성이 존재하지 않을 경우 수행하지 않도록.
 */

NUTs.Edit.Control.DrawPoint = OpenLayers.Class(OpenLayers.Editor.Control.DrawPoint, {
	 title: OpenLayers.i18n('oleDrawPoint'),
	    featureType: 'point',

	    /**
	     * Constructor: OpenLayers.Editor.Control.DrawPath
	     * Create a new control for drawing points.
	     *
	     * Parameters:
	     * layer - {<OpenLayers.Layer.Vector>} Points will be added to this layer.
	     * options - {Object} An optional object whose properties will be used
	     *     to extend the control.
	     */
	    initialize: function (layer, options) {
	        this.callbacks = OpenLayers.Util.extend(this.callbacks, {
	            point: function (point) {
	                this.layer.events.triggerEvent('pointadded', {point: point});
	            }
	        });

	        OpenLayers.Control.DrawFeature.prototype.initialize.apply(this,
	                [layer, OpenLayers.Handler.Point, options]);

	        this.title = OpenLayers.i18n('oleDrawPoint');
	    },
	   
	    /**
	     * Method: draw point
	     */
	    drawFeature: function (geometry) {
	    	this.addDrawFeatures = function(){	    		
	    		var oStyle = MAP_EDITOR.fn_get_editFeatureStyle(feature);
	    		feature.style = oStyle;
	    			    		
	    		this.layer.addFeatures([feature]);
				this.featureAdded(feature);
				this.events.triggerEvent('featureadded', {feature: feature});				
				this.layer.drawFeature(feature, sEditLayer.toLowerCase());
	    	}
	    	
	    	if(editor.copyMode && NUTs.Util.isEmptyObject(editor.copiedField) === true){
	    		NUTs.Util.showMessage('편집오류 - 시설물 복제 & 복제된 속성이 존재하지 않습니다. [검색결과]창에서 복제할 시설물의 속성을 먼저 선택하여 주세요.');
	    		return;
	    	}
	    	
	    	var feature = new OpenLayers.Feature.Vector(geometry),
	    	proceed = this.layer.events.triggerEvent('sketchcomplete', {feature: feature});

	    	if (proceed !== false) {
	    		this.events.triggerEvent('beforefeatureadded', {feature: feature});
	    		
	    		var sG2Id = MAP_EDITOR.fn_get_newG2Id();
	    		var sEditLayer = COMMON.fn_get_editingLayer();	    
	    		
	    		var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(feature, sEditLayer.concat('.', sG2Id), OpenLayers.State.INSERT);
	        	feature = oGFeature.feature;
	           
   	            // check for EditRule - ehyun. 2016.04.05
	            var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();	            
	            if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.add) === false){		// 룰 적용 ex) EditRule.checkRelationGeometryEnd, checkRelationGeometry(Contains)
	            	var sErrorMsg = [];
	            	NUTs.EditRule.editingGeometry = feature;

	            	for(var i=0,len=oEditRuleInfo.operType.add.length; i<len; i++){
	            		var sEditRule = oEditRuleInfo.operType.add[i].rule;	            		
	            		$.globalEval(sEditRule);

	            		if(NUTs.Util.isEmptyObject(NUTs.EditRule.resultGeometry) === false){	            				            			
	            			if(NUTs.EditRule.resultGeometry.data.length > 0){
	            				
	            				// WTL_VALV_PS 이면 교차된 상수관 분할처리
	            				if(sEditLayer === 'WTL_VALV_PS'){
	            					editor.addUnDrawFeature(editor.refLayer, oGFeature.feature);
	            					editor.divideLine(oGFeature, NUTs.EditRule.resultGeometry.data[0].results[0].feature);
	            					map.activeControls("drag");
	            				}
	            				
	            				MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);
	            				this.addDrawFeatures();

	            				NUTs.EditRule.resultGeometry = {};
	            			}
	            		}
	            		else
	            			sErrorMsg.push(oEditRuleInfo.operType.add[i].errorMsg + '</br>');
	            	}
	            	if(sErrorMsg.length >0){
	            		NUTs.Util.showMessage('편집룰오류 & [룰 위반] ' + sErrorMsg.join(''),4000);
	            		return;
	            	}
	            } else{	            	
	            	MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);
	            	this.addDrawFeatures();
	            }	                      
	        }
	    },
		deactivate: function () {
	        if (this.active) {
	            if (this.handler) {
	                this.handler.deactivate();
	            }
	            this.active = false;
	            if(this.map) {
	                OpenLayers.Element.removeClass(
	                    this.map.viewPortDiv,
	                    this.displayClass.replace(/ /g, "") + "Active"
	                );
	            }
	            this.events.triggerEvent("deactivate");
	             
	            var snapCtrl = map.getControl("SnappingSettings");
	            if(snapCtrl){
	            	MAP_EDITOR.fn_remove_snapPopup();
	                snapCtrl.popup = null;
	            }
	            
	            return true;
	        }
	        
	        return false;
	    },
	    CLASS_NAME: 'NUTs.Edit.Control.DrawPoint'
	});



/*=[ DrawPolygon.js ]==========================================================================*/

/**
 * @copyright  2011 geOps
 * @license    https://github.com/geops/ole/blob/master/license.txt
 * @link       https://github.com/geops/ole
 */

/**
 * Class: NUTs.Edit.Control.DrawPolygon
 * The DeleteFeature provides a button to delete all selected features
 *     from a given layer.
 *
 * Inherits from:
 *  - <OpenLayers.Control.DrawFeature>
 */

NUTs.Edit.Control.DrawPolygon = OpenLayers.Class(OpenLayers.Editor.Control.DrawPolygon, {

    /**
     * Property: minArea
     * {Number} Minimum area of new polygons.
     */
    minArea: 0,

    title: OpenLayers.i18n('oleDrawPolygon'),
   
    featureType: 'polygon',

    /**
     * Constructor: OpenLayers.Editor.Control.DrawPolygon
     * Create a new control for drawing polygons.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} Polygons will be added to this layer.
     * options - {Object} An optional object whose properties will be used
     *     to extend the control.
     */
    initialize: function (layer, options) {
        this.callbacks = OpenLayers.Util.extend(this.callbacks, {
            point: function(point) {
                this.layer.events.triggerEvent('pointadded', {point: point});
            }
        });
        
        OpenLayers.Control.DrawFeature.prototype.initialize.apply(this,
            [layer, OpenLayers.Handler.Polygon, options]);

        this.title = OpenLayers.i18n('oleDrawPolygon');
    },

    /**
     * Method: draw polygon only if area greater than or equal to minArea
     */
    drawFeature: function (geometry) {
        var feature = new OpenLayers.Feature.Vector(geometry),
            proceed = this.layer.events.triggerEvent('sketchcomplete', {feature: feature});
        
    	if(editor.copyMode && NUTs.Util.isEmptyObject(editor.copiedField) === true){
    		NUTs.Util.showMessage('편집오류 - 시설물 복제 & 복제된 속성이 존재하지 않습니다. [검색결과]창에서 복제할 시설물의 속성을 먼저 선택하여 주세요.');
    		return;
    	}
    	
        if (proceed !== false && geometry.getArea() >= this.minArea) {
        	var sG2Id = MAP_EDITOR.fn_get_newG2Id();
    		var sEditLayer = COMMON.fn_get_editingLayer();
    		
    		 var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(feature, sEditLayer.concat('.', sG2Id), OpenLayers.State.INSERT);
         	feature = oGFeature.feature;
         	
         	 var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();
         	MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);         	
    		
         	var oStyle = MAP_EDITOR.fn_get_editFeatureStyle(feature);
    		feature.style = oStyle;
    		
            this.layer.addFeatures([feature]);
            this.featureAdded(feature);
            this.events.triggerEvent('featureadded', {feature : feature});            
    		this.layer.drawFeature(feature, sEditLayer.toLowerCase());    		
        }
    },
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.map) {
                OpenLayers.Element.removeClass(
                    this.map.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
             
            var snapCtrl = map.getControl("SnappingSettings");
            if(snapCtrl){
            	MAP_EDITOR.fn_remove_snapPopup();
                snapCtrl.popup = null;
            }
            
            return true;
        }
        
        return false;
    },
    CLASS_NAME: 'NUTs.Edit.Control.DrawPolygon'
});



/*=[ EditPanel.js ]==========================================================================*/

/**********************************************
 * 클래스명 : OpenLayers.Editor.Control.EditorCustomPanel
 * 설  명 : 커스터마이징 Editor Panel .
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.08.03    최재훈      신규작업
 *
 */

NUTs.Edit.Control.EditPanel = OpenLayers.Class(OpenLayers.Editor.Control.EditorPanel, {
    /*
     * {boolean} Whether to show by default. Leave value FALSE and show by starting editor's edit mode.
     */
    autoActivate: false,
    
    /**
     * Constructor: OpenLayers.Editor.Control.EditorPanel
     * Create an editing toolbar for a given editor.
     *
     * Parameters:
     * editor - {<OpenLayers.Editor>}
     * options - {Object}
     */
    initialize: function (editor, options) {
        OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);
    },
    
    draw: function() {
        OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
        if (!this.active) {
            this.div.style.display = 'none';
        }
        return this.div;
    },
    
    redraw: function(){
        if (!this.active) {
            this.div.style.display = 'none';
        }
        
        OpenLayers.Control.Panel.prototype.redraw.apply(this, arguments);
        
        if (this.active) {
            this.div.style.display = '';
        }
    },
    
       
    /**********************************************
     * 함수명 : activateControl
     * 설  명 : EditPanel상의 control클릭 시 수행.
     * 인  자 : 활성화할 control
     * 사용법 : activateControl(control)
     *
     * 수정일        수정자      수정내용
     * ------        ------     -------------------
     * 2015.07.27    최재훈      신규작업
     *
     */
    activateControl: function (control) {

    	//alert('OpenLayers.Editor.Control.EditorPanel.Custom - activateControl');
    	map.deActiveAllControls();
    	
        if (!this.active) { return false; }
        if (control.type == OpenLayers.Control.TYPE_BUTTON) {
            control.trigger();
            return;
        }
        if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
            if (control.active) {
                control.deactivate();
            } else {
                control.activate();
            }
            return;
        }
        if (this.allowDepress && control.active) {
            control.deactivate();
        } else {
            var c;
            for (var i=0, len=this.controls.length; i<len; i++) {
                c = this.controls[i];
                if (c != control &&
                   (c.type === OpenLayers.Control.TYPE_TOOL || c.type == null)) {
                    c.deactivate();
                }
            }
            control.activate();
        }
    },
    CLASS_NAME: 'NUTs.Edit.Control.EditPanel'
});



/*=[ ModifyFeature.js ]==========================================================================*/


NUTs.Edit.Control.ModifyFeature = OpenLayers.Class(OpenLayers.Control.ModifyFeature, {

	selectedVertex: null,
	/**
     * Constructor: OpenLayers.Control.ModifyFeature
     * Create a new modify feature control.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} Layer that contains features that
     *     will be modified.
     * options - {Object} Optional object whose properties will be set on the
     *     control.
     */
    initialize: function(layer, options) {
        options = options || {};
        this.layer = layer;
        this.vertices = [];
        this.virtualVertices = [];
        this.virtualStyle = OpenLayers.Util.extend({},
            this.layer.style ||
            this.layer.styleMap.createSymbolizer(null, options.vertexRenderIntent)
        );
        this.virtualStyle.fillOpacity = 0.3;
        this.virtualStyle.strokeOpacity = 0.3;
        this.deleteCodes = [46, 68];
        this.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        if(!(OpenLayers.Util.isArray(this.deleteCodes))) {
            this.deleteCodes = [this.deleteCodes];
        }

        // configure the drag handler
        var dragCallbacks = {
            down: function(pixel) {
                this.vertex = null;
                var feature = this.layer.getFeatureFromEvent(
                        this.handlers.drag.evt);
                if (feature) {

                	if(this.selectedVertex && (this.selectedVertex.id != feature.id) && editor.getGeometryType(feature) == 'point')
                		this.layer.drawFeature(this.selectedVertex, 'default');

                	this.selectedVertex = feature;

                	//console.log('down - feature');
                    this.dragStart(feature);
                } else if (this.clickout) {
                	//console.log('down - clickout');
                	this.selectedVertex = null;
                    this._unselect = this.feature;
                }
            },
            move: function(pixel) {
            	//console.log('move');

            	this.selectedVertex = null;

                delete this._unselect;
                if (this.vertex) {
                    this.dragVertex(this.vertex, pixel);
                }
            },
            up: function() {
            	//console.log('up');
                this.handlers.drag.stopDown = false;
                if (this._unselect) {

                	//console.log('up = _unselect');
                    this.unselectFeature(this._unselect);
                    delete this._unselect;
                    this.selectedVertex = null;
                }
                else{
                	if(this.selectedVertex && this.vertex)
                		this.layer.drawFeature(this.selectedVertex, 'selectedvertex');
                }
            },
            done: function(pixel) {
            	//console.log('done');
                if (this.vertex) {
                	//console.log('done = vertex');
                    this.dragComplete(this.vertex);
                }
            }
        };
        var dragOptions = {
            documentDrag: this.documentDrag,
            stopDown: false
        };

        // configure the keyboard handler
        var keyboardOptions = {
            keydown: this.handleKeypress
        };

        this.handlers = {
            keyboard: new OpenLayers.Handler.Keyboard(this, keyboardOptions),
            drag: new OpenLayers.Handler.Drag(this, dragCallbacks, dragOptions)
        };
    },

    initSelectedVertex: function(){
    	var selectedVertex = this.selectedVertex;
    	if(selectedVertex){
    		this.layer.drawFeature(this.selectedVertex, 'default');
    		this.selectedVertex = null;
    	}

    },
    /**
     * APIMethod: selectFeature
     * Select a feature for modification in standalone mode. In non-standalone
     * mode, this method is called when a feature is selected by clicking.
     * Register a listener to the beforefeaturemodified event and return false
     * to prevent feature modification.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} the selected feature.
     */
    selectFeature: function(feature) {
    	//debugger;
        if (this.feature === feature ||
           (this.geometryTypes && OpenLayers.Util.indexOf(this.geometryTypes,
           feature.geometry.CLASS_NAME) == -1)) {
            return;
        }
        if (this.beforeSelectFeature(feature) !== false) {
            if (this.feature) {
                this.unselectFeature(this.feature);
            }
            this.feature = feature;
            this.layer.selectedFeatures.push(feature);
            this.layer.drawFeature(feature, 'select');
            this.modified = false;
            this.resetVertices();
            this.onModificationStart(this.feature);
        }
        // keep track of geometry modifications
        var modified = feature.modified;
        if (feature.geometry && !(modified && modified.geometry)) {
            this._originalGeometry = feature.geometry.clone();
        }
    },

    /**
     * APIMethod: unselectFeature
     * Called when the select feature control unselects a feature.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The unselected feature.
     */
    unselectFeature: function(feature) {
        this.layer.removeFeatures(this.vertices, {silent: true});
        this.vertices = [];
        this.layer.destroyFeatures(this.virtualVertices, {silent: true});
        this.virtualVertices = [];
        if(this.dragHandle) {
            this.layer.destroyFeatures([this.dragHandle], {silent: true});
            delete this.dragHandle;
        }
        if(this.radiusHandle) {
            this.layer.destroyFeatures([this.radiusHandle], {silent: true});
            delete this.radiusHandle;
        }
        this.layer.drawFeature(this.feature, 'select'); //CJH - 2016.02.19
        this.feature = null;
        OpenLayers.Util.removeItem(this.layer.selectedFeatures, feature);
        this.onModificationEnd(feature);
        this.layer.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: this.modified
        });
        this.modified = false;
    },

	/**
     * Method: dragStart
     * Called by the drag handler before a feature is dragged.  This method is
     *     used to differentiate between points and vertices
     *     of higher order geometries.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The point or vertex about to be
     *     dragged.
     */
    dragStart: function(feature) {
    	
    	// 룰 적용하지 않도록 함 - ehyun 2016.07.29
    	var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();
    	if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.modify) === false){
    		for(var key in oEditRuleInfo.operType.modify){
    			var sEditRule = oEditRuleInfo.operType.modify[key].rule;
    			if(sEditRule.indexOf('checkRelationGeometryMoveToByOffset') > -1){
    				oEditRuleInfo.operType.modify.splice(key,1);
    				break;
    			}
    		}

    		if(oEditRuleInfo.operType.modify.length > 0){ // 'checkRelationGeometryMove' or 'checkRelationGeometryMoveEndPoint' 일때
    			NUTs.Util.showMessage('편집룰오류 & [정점편집] 기능은 "동시 이동" 관련 룰을 적용하지 않습니다. <br>해당 룰을 체크 해지하신 후 사용하시기 바랍니다.');
    			return;
    		}
    	}
    	
        var isPoint = feature.geometry.CLASS_NAME == 'OpenLayers.Geometry.Point';
        if (!this.standalone &&
                ((!feature._sketch && isPoint) || !feature._sketch)) {
            if (this.toggle && this.feature === feature) {
                // mark feature for unselection
                this._unselect = feature;
            }
            this.selectFeature(feature);
        }
        if (feature._sketch || isPoint) {
            // feature is a drag or virtual handle or point
            this.vertex = feature;
            this.handlers.drag.stopDown = true;
        }
    },

    /**
     * Method: dragVertex
     * Called by the drag handler with each drag move of a vertex.
     *
     * Parameters:
     * vertex - {<OpenLayers.Feature.Vector>} The vertex being dragged.
     * pixel - {<OpenLayers.Pixel>} Pixel location of the mouse event.
     */
    dragVertex: function(vertex, pixel) {

        var pos = this.map.getLonLatFromViewPortPx(pixel);
        var geom = vertex.geometry;
        var geomClone = geom.clone();
        geom.move(pos.lon - geom.x, pos.lat - geom.y);
        this.modified = true;        
        NUTs.EditRule.dist = NUTs.Util.fn_get_DistanceBy2Point(geomClone.x, geomClone.y, geom.x, geom.y);        // vertex 정점편집 시, 이동거리 - 2016.7.28 ehyun
        
        /**
         * Five cases:
         * 1) dragging a simple point
         * 2) dragging a virtual vertex
         * 3) dragging a drag handle
         * 4) dragging a real vertex
         * 5) dragging a radius handle
         */
        if(this.feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
            // dragging a simple point
            this.layer.events.triggerEvent("vertexmodified", {
                vertex: vertex.geometry,
                feature: this.feature,
                pixel: pixel
            });
        } else {
            if(vertex._index) {
                // dragging a virtual vertex
                vertex.geometry.parent.addComponent(vertex.geometry,
                                                    vertex._index);
                // move from virtual to real vertex
                delete vertex._index;
                OpenLayers.Util.removeItem(this.virtualVertices, vertex);
                this.vertices.push(vertex);
            } else if(vertex == this.dragHandle) {
                // dragging a drag handle
                this.layer.removeFeatures(this.vertices, {silent: true});
                this.vertices = [];
                if(this.radiusHandle) {
                    this.layer.destroyFeatures([this.radiusHandle], {silent: true});
                    this.radiusHandle = null;
                }
            } else if(vertex !== this.radiusHandle) {
                // dragging a real vertex
                this.layer.events.triggerEvent("vertexmodified", {
                    vertex: vertex.geometry,
                    feature: this.feature,
                    pixel: pixel
                });
            }
            // dragging a radius handle - no special treatment
            if(this.virtualVertices.length > 0) {
                this.layer.destroyFeatures(this.virtualVertices, {silent: true});
                this.virtualVertices = [];
            }
            this.layer.drawFeature(this.feature, this.standalone ? undefined : 'select');
        }
        // keep the vertex on top so it gets the mouseout after dragging
        // this should be removed in favor of an option to draw under or
        // maintain node z-index
        this.layer.drawFeature(vertex);
    },

    /**
     * Method: dragComplete
     * Called by the drag handler when the feature dragging is complete.
     *
     * Parameters:
     * vertex - {<OpenLayers.Feature.Vector>} The vertex being dragged.
     */
	dragComplete: function(vertex) {
		
    	var olFeature = this.feature;
    	editor.oSearchResult.data[0].results[0].feature.geometry = olFeature.geometry; // 이동한 위치로 oSearchResult 갱신
    	
    	this.drawModifiedFeature = function(){
    		MAP_EDITOR.fn_proc_modifiedFeature(oOriginGInnerFeatureClone, sLayerName, sG2Id);
    		
	    	this.resetVertices();
	    	if(!oOriginGInnerFeatureClone.state)
	    		this.setFeatureState();
	        this.onModification(oOriginGInnerFeatureClone);
	        this.layer.events.triggerEvent("featuremodified", {feature: oOriginGInnerFeatureClone});
    	}

    	var sFId = MAP_EDITOR.fn_get_fidByFeature(this.feature);
    	var sLayerName = MAP_EDITOR.fn_get_tblNameByFeature(this.feature);
    	var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(this.feature);
    	var oOriginGInnerFeatureClone = MAP_EDITOR.fn_deepClone_featureToGInnerFeature(this.feature); // 현재 편집된(dragCompleted 된) feature 원본. this.drawModifiedFeature()에서 this.feature를 썻을때 scope문제로 못 찾는 경우가 생겨서.
    	
    	var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(this.feature, sFId, '');
    	this.feature = oGFeature.feature;
    	
    	// 룰 적용 - ehyun.2016.05.09
    	/*var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();        
    	if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.modify) === false){
    		var sErrorMsg = [];

    		for(var key in oEditRuleInfo.operType.modify){
    			var sEditRule = oEditRuleInfo.operType.modify[key].rule;	
    			if(sEditRule.indexOf('checkRelationGeometryMoveToByOffset') > -1){
    				oEditRuleInfo.operType.modify.splice(key,1);
    				break;
    			}
    		}

    		if(oEditRuleInfo.operType.modify.length > 0){	// 'checkRelationGeometryMove' or 'checkRelationGeometryMoveEndPoint' 일때
    			// this.feature.modified 정보는 편집 시점을 기준으로, 편집 시도 바로 전 originalGeometry임.
    			// this.setFeatureState()를 사용하지 않고 아래와 같이 사용하는 이유는, vertex 정점편집시 마다 최종 편집이 완료된 바로 전 도형정보를 가져와야 하므로(매 편집 vertex마다 룰 적용위해)
    			var oEmJsonFeatureObj = editor.editingFeatures[sLayerName][sG2Id];                	
    			if(NUTs.Util.isEmptyObject(oEmJsonFeatureObj) === false){      
    				var oGInnerFeature = editor.makeFeatureByPosList(oEmJsonFeatureObj.type, oEmJsonFeatureObj.posList, sFId);
    				this.feature.state = OpenLayers.State.UPDATE;
    				this.feature.modified = OpenLayers.Util.extend(this.feature.modified, {
    					geometry: oGInnerFeature.geometry,
    					control : 'CustomModifyFeature'
    				});
    			}
    			else
    				this.feature.modified = {};

    			NUTs.EditRule.editingGeometry = this.feature;

    			for(var i=0,len=oEditRuleInfo.operType.modify.length; i<len; i++){
    				var sEditRule = oEditRuleInfo.operType.modify[i].rule;

    				$.globalEval(sEditRule);

    				if(NUTs.Util.isEmptyObject(NUTs.EditRule.resultGeometry) === false){
    					//if(NUTs.EditRule.resultGeometry.data.length > 0){
    						this.drawModifiedFeature();
    						NUTs.EditRule.resultGeometry = {};
    					//}
    				}
    				else{
    					if(sEditRule.indexOf('checkRelationGeometryMoveEndPoint') > -1)// 룰 수행 결과가 없는(연결된 관이 없어서) point일 경우,
            				this.drawModifiedFeature();            				 
            			else
            				sErrorMsg.push(oEditRuleInfo.operType.modify[i].errorMsg + '</br>');    
    					if(!oEditRuleInfo.operType.modify[i].errorMsg)	// 룰 수행 결과가 없는(연결된 관이 없어서) point or line일 경우
    						this.drawModifiedFeature();
    					else
    						sErrorMsg.push(oEditRuleInfo.operType.modify[i].errorMsg + '</br>');
    				}
    			}
    			if(sErrorMsg.length >0){   		   			
    				NUTs.Util.showMessage('편집룰오류 & [룰 위반] ' + sErrorMsg.join(''));    				
    				return;
    			}
    		}
    		else			// checkRelationGeometryMoveToByOffset 일때
    			this.drawModifiedFeature();
        } else*/
        	this.drawModifiedFeature();
    },

    /**
     * Method: setFeatureState
     * Called when the feature is modified.  If the current state is not
     *     INSERT or DELETE, the state is set to UPDATE.
     */
    setFeatureState: function() {
        if(this.feature.state != OpenLayers.State.INSERT &&
           this.feature.state != OpenLayers.State.DELETE) {
            this.feature.state = OpenLayers.State.UPDATE;
            if (this.modified && this._originalGeometry) {
                var feature = this.feature;
                feature.modified = OpenLayers.Util.extend(feature.modified, {
                    geometry: this._originalGeometry
                });
                delete this._originalGeometry;
            }
        }
    },

    handleKeypress: function(evt) {
        var code = evt.keyCode;

        if(this.feature &&
           OpenLayers.Util.indexOf(this.deleteCodes, code) != -1) {

        	//this.resetVertices(); //--> edited BY CJH (2016.07.04)
        	// 수행시 collectVertices를 재수행해 id를 다시할당함. 그러나 아래  getFeatureFromEvent에서는 할당하기전 id를 가져와비교하고 있음.
        	// 꼭 수행해야한다면 getFeatureFromEvent 수행할때의 feature정보도갱신되도록 변경필요.
            var vertex = this.layer.getFeatureFromEvent(this.handlers.drag.evt);

            if(!vertex){
            	vertex = this.selectedVertex;
            }

            if(vertex){

            	var sGeomType = editor.getGeometryType(this.feature);

            	if(sGeomType == 'linestring'){
            		if(this.feature.geometry.components.length === 2){
            			NUTs.Util.showMessage('편집룰 오류 & 선형데이터는 최소 2개의 정점이 필요합니다. 삭제작업이 중단됩니다!');
                		return false;
            		}

            	}
            	else if(sGeomType == 'polygon'){
            		if(this.feature.geometry.components[0].components.length === 4){
            			NUTs.Util.showMessage('편집룰 오류 & 면형데이터는 최소 4개의 정점이 필요합니다. 삭제작업이 중단됩니다!');
            			return false;
            		}
            	}
            	//this.layer.drawFeature(vertex, 'blink');
            	if(code === 46 || code === 68){
                	if(!confirm('선택된 정점을 삭제하시겠습니까?')){
                		this.layer.drawFeature(vertex, 'select');
                		return false;
                	}
                }

                if (vertex &&  OpenLayers.Util.indexOf(this.vertices, vertex) != -1 && !this.handlers.drag.dragging && vertex.geometry.parent) {
                    // remove the vertex
                    vertex.geometry.parent.removeComponent(vertex.geometry);
                    this.layer.events.triggerEvent("vertexremoved", {
                        vertex: vertex.geometry,
                        feature: this.feature,
                        pixel: evt.xy
                    });
                    this.layer.drawFeature(this.feature, this.standalone ?
                                           undefined : 'select');
                    this.modified = true;
                    this.selectedVertex = null;
                    this.resetVertices();
                    this.setFeatureState();
                    this.onModification(this.feature);
                    this.layer.events.triggerEvent("featuremodified",{feature: this.feature});
                    
                    var sLayerName = MAP_EDITOR.fn_get_tblNameByFeature(this.feature);
                	var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(this.feature);
                	var oOriginGInnerFeatureClone = MAP_EDITOR.fn_deepClone_featureToGInnerFeature(this.feature.clone()); // 현재 편집된(dragCompleted 된) feature 원본. this.drawModifiedFeature()에서 this.feature를 썻을때 scope문제로 못 찾는 경우가 생겨서.
                	
                    MAP_EDITOR.fn_proc_modifiedFeature(oOriginGInnerFeatureClone, sLayerName, sG2Id);
                    
                }
            }
            else{
            	//console.log('vertex삭제 실패 [keycode:' + code + '] this.layer.getFeatureFromEvent(this.handlers.drag.evt) 수행결과 없음');
            }

        }
    },
    CLASS_NAME: "NUTs.Edit.Control.ModifyFeature"
});



/*=[ SnappingSettings.js ]==========================================================================*/

/**********************************************
 * 클래스명 : SnappingSettings
 * 설  명 : 커스터마이징 DrawPoint
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.08.28    윤은희      신규작업
 *
 */

NUTs.Edit.Control.SnappingSettings = OpenLayers.Class(OpenLayers.Editor.Control.SnappingSettings, {

    title: OpenLayers.i18n('oleSnappingSettings'),

    map : null,
    
    popup : null,
    
    layer: null,

    snapping: new OpenLayers.Control.Snapping(),

    tolerance: 10,
    
    preTolerance: 10,

    /**
     * @var {Array.<String>} Identifiers of checkboxes to enable snapping for individual layers
     */
    snappingLayers: null,

    //각 레이어의 스냅대상 지정 {node, vertex, edge}
    snappingPoints: {},
    /**
     * Layer that displays guide lines and snapping points
     * @var OpenLayers.Editor.Layer.Snapping
     */
    snappingGuideLayer: null,

    layerListDiv: null,

    toleranceInput: null,

    initialize: function (layer, options) {
        this.snappingLayers = [];
        this.layer = layer;
        this.map = options.map;
        
        if(options.tolerance){ 
        	this.tolerance = options.tolerance;
        	this.preTolerance = options.tolerance;
        }
        
        OpenLayers.Control.Button.prototype.initialize.apply(this, [options]);

        this.trigger = OpenLayers.Function.bind(this.setSnappingEnv, this);
        this.trigger = OpenLayers.Function.bind(this.changeSnapping, this);

        this.events.register("deactivate", this, this.onDeactivate);

        this.title = OpenLayers.i18n('oleSnappingSettings');
        
        
        //스냅기준거리 팝업생성
        /*var mouseXy = {};
		
		mouseXy.x 	= event.clientX;
		mouseXy.y	= event.clientY;
		var oLonlat = this.map.getLonLatFromPixel(mouseXy);
		
		var aContentHtml = [];
		
		aContentHtml.push('<div class="olControlSnapInfo">');
		aContentHtml.push('<span>Snap 기준 : ' + this.tolerance + ' (px)</span>');
		aContentHtml.push('</div>');
		
	    var oPopup = new GPopup("snapInfoPopup", oLonlat, null, aContentHtml.join(''), new OpenLayers.Pixel(3,3));
	    this.popup = oPopup;
	    this.map.addPopup(oPopup);*/
	    
        this.map.events.register('mousemove', this, this.mapMouseMove);
	    
    },

    deactivate: function () {
        OpenLayers.Control.Button.prototype.deactivate.call(this);
        if (this.map && this.map.editor && this.map.editor.dialog) {
            this.map.editor.dialog.hide();
        }

        //this.map.events.unregister('mousemove', this, this.mapMouseMove);
        
    },

    onDeactivate: function () {
        if (this.snapping.active) {
            this.activate();
        }
    },

    setSnappingEnv: function () {

        var content, toleranceHeader, layerHeader;

        this.activate();

    },
    
    mapMouseMove: function(){
    	
    	var editor = editor || map.editor;  
    	
    	var bSnapChecked = $("#chkOptEditSnap").is(":checked") ;
    	var bShowChecked = $("#chkShowSnapDist").is(":checked") ;
    	
		if(editor.editMode && this.popup && bSnapChecked && bShowChecked) {  
    		
    		//console.log(this.popup.getLonLat().lon +',' + this.popup.getLonLat().lat + '/' + event.clientX + ','+ event.clientY);
        	var oPixel = new OpenLayers.Pixel(event.clientX, event.clientY);  
        	
        	oPixel.x -= $(this.popup.div).parent().offset().left;
        	oPixel.y -= $(this.popup.div).parent().offset().top;
    		 
            this.popup.updateSize();
        	this.popup.moveTo(oPixel); 
    	
		}
    	 
    	
    	
	},
	
    redraw: function () {

        var layer, element, content;

        this.layerListDiv.innerHTML = '';

        for (var i = 0; i < this.map.layers.length; i++) {

            layer = this.map.layers[i];

            if (!(layer instanceof OpenLayers.Layer.Vector.RootContainer) &&
                    layer instanceof OpenLayers.Layer.Vector && !(layer instanceof OpenLayers.Editor.Layer.Snapping) &&
                    layer.name.search(/OpenLayers.Handler.+/) == -1) {

                content = document.createElement('div');

                element = document.createElement('input');
                element.type = 'checkbox';
                element.name = 'snappingLayer';
                element.id = 'Snapping.' + layer.id;
                element.value = 'true';
                if (this.snappingLayers.indexOf(layer) >= 0) {
                    element.checked = 'checked';
                    element.defaultChecked = 'selected'; // IE7 hack
                }
                content.appendChild(element);
                OpenLayers.Event.observe(element, 'click',
                        OpenLayers.Function.bind(this.setLayerSnapping, this, layer, element.checked));

                element = document.createElement('label');
                element.setAttribute('for', 'Snapping.' + layer.id);
                element.innerHTML = layer.name;
                OpenLayers.Event.observe(element, 'click', OpenLayers.Function.bind(function (event) {
                    // Allow to check checkbox by clicking its label even when drawing tools are active
                    OpenLayers.Event.stop(event, true);
                }, this));
                content.appendChild(element);

                this.layerListDiv.appendChild(content);
            }
        }
    },

    /**
     * Enables or disables a layer for snapping
     * @param {OpenLayers.Layer} layer
     * @param {Boolean} snappingEnabled Set TRUE to enable snapping to this layer's objects
     */
    setLayerSnapping: function (layer, snappingEnabled) {
        if (!snappingEnabled) {
        		this.snappingLayers.splice(this.snappingLayers.indexOf(layer), 1);
            
        } else {
        	this.addSnappingLayer(layer);
        }
    },

    addSnappingLayer:function(layer){
    	var snapLayerLen = this.snappingLayers.length;
    	var bInclude = false;
    	for(var i = 0; i < snapLayerLen ; i++) {
    		var oLayer = this.snappingLayers[i];
    		if(oLayer.name == layer.name) {
    			bInclude = true;
    			break;
    		} 
    	}
    	if(!bInclude)
    		this.snappingLayers.push(layer);
    },
    
    changeSnapping: function () {
    	
    	/*var nDist = $("#txtSnapDist").val();
		var sUnit = $("#selSnapUnit option:selected").text().toUpperCase();
		if(sUnit === "METER"){
			var nScale = map.getResolution();
			nDist *= parseFloat(1/nScale).toFixed();
		}
		
		nDist = nDist || 1;
		
        this.tolerance = nDist;*/
        
        //console.log("snap distance : " + nDist);
        
        if (this.snappingLayers.length > 0) {

            this.snapping.deactivate();
            var targets = [];
            for (var i = 0; i < this.snappingLayers.length; i++) {
                targets.push({
                    layer: this.snappingLayers[i],
                    tolerance: this.tolerance
                });
            }
            this.snapping = new OpenLayers.Control.Snapping({
                layer: this.layer,
                targets: targets
            });
            for (var i = 0; i < targets.length; i++) {
                var layer = targets[i].layer;
                if (layer.visibility === false) {
                    for (var j=0, len=layer.strategies.length; j<len; j++) {
                        if (layer.strategies[j].CLASS_NAME === 'OpenLayers.Strategy.BBOX') {
                            layer.strategies[j].update({force: true});
                        }
                    }
                }
            }
            this.snapping.activate();
        } else {
            if (this.snapping.active) {
                this.snapping.deactivate();
                this.snapping.targets = null;
            }
        }
        if (!this.snapping.active) this.deactivate();
    },

    setMap: function (map) {
        OpenLayers.Control.Button.prototype.setMap.apply(this, arguments);

        if (this.snappingGuideLayer === null) {
            this.snappingGuideLayer = this.createSnappingGuideLayer();
        }
    },

    /**
     * Adds a layer for guidelines to the map
     * @return {OpenLayers.Editor.Layer.Snapping}
     */
    createSnappingGuideLayer: function () {
        var snappingGuideLayer = new OpenLayers.Editor.Layer.Snapping(OpenLayers.i18n('Snapping Layer'), {
            visibility: false
        });
        this.map.addLayer(snappingGuideLayer);

        return snappingGuideLayer;
    },

    CLASS_NAME: "NUTs.Edit.Control.SnappingSettings"
});



/*=[ TransformFeature.js ]==========================================================================*/


NUTs.Edit.Control.TransformFeature = OpenLayers.Class(OpenLayers.Editor.Control.TransformFeature, {
    
	/**
     * @type {OpenLayers.Layer.Vector}
     */
    editLayer: null,
    
	/**
     * @param {OpenLayers.Layer.Vector} editLayer
     */
    initialize: function(editLayer, refLayer){
        this.strategiesOnHold = [];
        
        OpenLayers.Control.TransformFeature.prototype.initialize.call(this, editLayer, {
            renderIntent: "transform",
            rotationHandleSymbolizer: "rotate",
            id:"CustomTransformFeature"
        });
        
        this.editLayer = editLayer;
        
        this.addStyles();
        
        this.events.on({
            'transformcomplete': function(e){
            	
            	this.drawTransformFeature = function(){            		
            		MAP_EDITOR.fn_check_SpatialValueChange(oOriginGInnerFeatureClone, sLayerName, sG2Id);
                	MAP_EDITOR.fn_call_saveMiddleBridge(sLayerName, sG2Id);		// 중간저장(공간정보) 갱신 - ehyun.2016.03.25
                	
                	// 편집하는 feature의 위치 속성 자동 갱신(행정동/법정동/도엽번호)
                	NUTs.EditRule.CheckRelationLocValueSync(oOriginGInnerFeatureClone);

                	// 이동 전 위치의 feature를 MAP_EDITOR.oStyleVectorLayer에서 제거 후, 이동 후 위치에서 새로 생성/추가 후 다시 그림 - ehyun.
                	var oEditFeature = editor.getFeatureByFid(editor.editLayer, sFId);
        	    	if(oEditFeature){
        	    		editor.editLayer.destroyFeatures(oEditFeature, {silent: true});
                    	editor.addDrawFeature(editor.editLayer, oOriginGInnerFeatureClone, 'select');
        	    	}
        	    	
        	    	var oStyleFeature = editor.getFeatureByFid(editor.styleLayer, sFId);
        	    	if(oStyleFeature){
        	    		editor.styleLayer.destroyFeatures(oStyleFeature, {silent: true}); 
            			var oStyleGFeature = editor.createFeature(oOriginGInnerFeatureClone, sFId);
                    	editor.addDrawFeature(editor.styleLayer, oStyleGFeature, sLayerName);
        	    	}
        	    	
        	    	var oSearchFeature = editor.getFeatureByFid(editor.searchLayer, sFId);
        			if(oSearchFeature)
        				editor.searchLayer.destroyFeatures(oSearchFeature, {silent: true});
        			
        			editor.effectLayer.removeAllFeatures();
                	
                    oOriginGInnerFeatureClone.state = OpenLayers.State.UPDATE;
                    this.editLayer.events.triggerEvent("afterfeaturemodified", {
                        feature: oOriginGInnerFeatureClone
                    });
                    
                    if(editor.getGeometryType(oOriginGInnerFeatureClone) !== 'point')
                    	MAP_EDITOR.fn_draw_oneFeatureBorder(oOriginGInnerFeatureClone,'selectpoint');
            	}

            	var sFId = MAP_EDITOR.fn_get_fidByFeature(e.feature);
            	var sLayerName = MAP_EDITOR.fn_get_tblNameByFeature(e.feature);
            	var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(e.feature);
            	var oOriginGInnerFeatureClone = MAP_EDITOR.fn_deepClone_featureToGInnerFeature(e.feature); // 현재 편집된(transformcomplete 된) feature 원본. this.drawTransformFeature()에서 e.feature를 썻을때 scope문제로 못 찾는 경우가 생겨서.
            	
            	var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(e.feature, sFId, '');
            	e.feature = oGFeature.feature;
            	
            	// 룰 적용 - ehyun.2016.05.09
            	var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();        
                if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.modify) === false){
                	for(var key in oEditRuleInfo.operType.modify){
                		var sEditRule = oEditRuleInfo.operType.modify[key].rule;	
                		if(sEditRule.indexOf('checkRelationGeometryMoveToByOffset') > -1){
                			oEditRuleInfo.operType.modify.splice(key,1);
                			break;
                		}
                	}
                	
                	if(oEditRuleInfo.operType.modify.length > 0){	// 'checkRelationGeometryMove' or 'checkRelationGeometryMoveEndPoint' 일때
                		// e.feature.modified 정보는 편집 시점을 기준으로, 편집 시도 바로 전 originalGeometry임.
                    	// Transform편집시 마다 최종 편집이 완료된 바로 전 도형정보를 가져와야 하므로
                    	var oEmJsonFeatureObj = editor.editingFeatures[sLayerName][sG2Id];
                		if(NUTs.Util.isEmptyObject(oEmJsonFeatureObj) === false){
                			var oGInnerFeature = editor.makeFeatureByPosList(oEmJsonFeatureObj.type, oEmJsonFeatureObj.posList, sFId);
                			e.feature.state = OpenLayers.State.UPDATE;
                			e.feature.modified = OpenLayers.Util.extend(e.feature.modified, {
                                geometry: oGInnerFeature.geometry
                            });
                		}
                		else
                			e.feature.modified = {};

                		NUTs.EditRule.editingGeometry = e.feature;

                		if(e.feature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','') === 'LineString'){
                			// Transform 이전과 이후, feature의 첫번째 vertex를(정점 편집이 아닌 feature전체가 이동하므로 특정 점 하나만 기준으로 삼으면 됨) 가지고 이동 거리를 계산하여 이동수치를 찾아낸다.
                			NUTs.EditRule.offset.x = e.feature.geometry.components[0].x - e.feature.modified.geometry.components[0].x;
                			NUTs.EditRule.offset.y = e.feature.geometry.components[0].y - e.feature.modified.geometry.components[0].y;
                		}

                		for(var i=0,len=oEditRuleInfo.operType.modify.length; i<len; i++){
                			var sEditRule = oEditRuleInfo.operType.modify[i].rule;

                			$.globalEval(sEditRule);

                			this.drawTransformFeature();
                			NUTs.EditRule.resultGeometry = {};
                		}
                	}
                	else			// checkRelationGeometryMoveToByOffset 일때
                		this.drawTransformFeature();
                }	
                else 
                	this.drawTransformFeature();                	
            },
            scope: this
        });
        
        this.title = OpenLayers.i18n('oleTransformFeature');
    },
    /**
     * Adds style of box around object and handles shown during transformation
     */
    addStyles: function(){
        var control = this;
        this.editLayer.styleMap.styles.transform =new OpenLayers.Style({
            display: "${getDisplay}",
            cursor: "${role}",
            pointRadius: 5,
            fillColor: "#07f",
            strokeOpacity: "${getStrokeOpacity}",
            fillOpacity: 1,
            strokeColor: "${getStrokeColor}",
            strokeWidth: "${getStrokeWidth}",
            strokeDashstyle: '${getStrokeDashstyle}'
        }, {
            context: {
                getDisplay: function(feature) {
                    if(control.feature===null || control.feature.geometry instanceof OpenLayers.Geometry.Point){
                        return "none";
                    }
                    // hide the resize handle at the south-east corner
                    return feature.attributes.role === "se-resize" ? "none" : "";
                },
                getStrokeColor: function(feature){
                    return feature.geometry instanceof OpenLayers.Geometry.Point ? '#037' : "#ff00ff";
                },
                getStrokeOpacity: function(feature){
                    return feature.geometry instanceof OpenLayers.Geometry.Point ? 0.8 : 0.5;
                },
                getStrokeWidth: function(feature){
                    return feature.geometry instanceof OpenLayers.Geometry.Point ? 2 : 1;
                },
                getStrokeDashstyle: function(feature){
                    return feature.geometry instanceof OpenLayers.Geometry.Point ? 'solid' : 'longdash';
                }
            }
        });
        this.editLayer.styleMap.styles.rotate = new OpenLayers.Style({
            display: "${getDisplay}",
            pointRadius: 10,
            fillColor: "#ddd",
            fillOpacity: 1,
            strokeColor: "black",
            // Display arrow image (rotationHandle.png) unless Browser is IE which does not reliable support data URI
            externalGraphic: OpenLayers.Util.getBrowserName()==='msie' ? undefined : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOnAAADnUBiCgbeAAAAAd0SU1FB9wIAgsPAyGVVyoAAAQFSURBVDjLjZVfTJNnFMZ//aQ0UVMgIi11Kngx1KUGBo0XU+bmmFnmErzRkBK2RBMUyfaV4cQ4t5GNm8UMTJTMbDSj4YI5GFmcMxvyZ4yIJJUbY5GNJv7ZQtGJNBoTL+yzC+NnugJykpO8Oe85z/u85z3vOUhiPj13tsfcX71PGzesV0ZGhgA5nU5tWF+gfXvf0089Z8yF4uc0XvjtnOkrKRbwXC1+uUjnzvaYiwL/4vNPtWTJEgHKyclRTU2Nurq6FA6HFY1GdfnyZXV3d+vgwYPKyckRIMMw9MnHR7Qg+Id1HwiQzWZTdXW1rly5omg0Oq9evXpVtbW1MgxDgGpr9mtO8OC3X5s2m01paWk6derUgqD/19OnT8tutwtQ68kTVopskgDIzl6hu3dnaGxspLKykvnk4cOHRCKRJJvD4eDatWs0NDSQkeFkdjZuA54wP1QfEKDNmzc/l6Xf70951DVr1igajaq0tFSA3q+tkSQMgO/PdAFgmmYSo4mJiRTm9+/ft9Z1dXWEQiGOHz8OQCAQAOCHrh8BMEaGB8ybN2/hcrnw+XxWYDgcZufOnfT29qYckJmZSV5eHu3t7Xi9XoqLiwHYtGkTq1evZioWY7D/V9P486/JZoDCwkJsNpsF0NLSgsfjobS0NAV86dKltLa2MjMzQygUStorKSkBYHx8otmYmooBkJubazk8evSI0dFRdu3ahcPhmPNhCwoKKCoqYmhoKMm+cuVKAGKxGGlP2SYSCcshHo+TSCRwu90poKZp8uDBAwBcLhfj4+NJ+0+rzzAM0jyeJ4ynpqYsh6ysLNLT07l+/XoK+Nq1a631jRs3Ugjcvn0bALfbhVFQ8GIAYGxsjMePHwNgt9vZtm0b3d3d3Lt3b860XLx4kUgkQllZWRLrS5cuAfDSxg0BJJGfnydA7e3tVj2fP39eDodDXq9Xg4ODSbXe0dGhrKws5efnKxKJWPbOzk4BWrXKI+v7HzvaIECFhYWanJy0nNva2rRs2TLZ7XZt3bpV5eXl8nq9ArRu3ToNDAwkHerz+QToUH1ASd8/1+1WbHqa+vp6Dhw4YF11enqaYDDIyMgI8Xgct9vNjh078Pv9SZUUDAZpamoiO3sFd+78awOegZ/p7DAr/O82AzQ1NbF7924WKz09PRw+fJhEIkHou2+orNr7rLc81cbPjln9Ys+ePVYPn0/D4bCqqqqsmKNHPtKCw6L15Ak5HOkCtHz5clVUVKitrU19fX0aGxtTf3+/gsGg/H6/nE6nANntdrV89aUWNeZGR4bMN8u2L2rMbX/9NQ3/fmHOMWflfC4ZGR4wz/78S/PQH8Pc+vsfZmfjZGZm8MIqD1u2vMI7b78V2PLqGy3zxf8Hbd5G4wGXKsEAAAAASUVORK5CYII=',
            graphicWidth:23,
            graphicHeight:22
        }, {
            context: {
                getDisplay: function(feature) {
                    if(control.feature===null || control.feature.geometry instanceof OpenLayers.Geometry.Point){
                        return "none";
                    }
                    // only display the rotate handle at the south-east corner
                    return feature.attributes.role === "se-rotate" ? "" : "none";
                }
            }
        });
    },
    
    activate: function(){
        // Disable BBOX strategy since it destroys all features whilst updating data
        for(var strategyIter=0; OpenLayers.Util.isArray(this.layer.strategies) && strategyIter<this.layer.strategies.length; strategyIter++){
            if(this.layer.strategies[strategyIter] instanceof OpenLayers.Strategy.BBOX){
                this.strategiesOnHold.push(this.layer.strategies[strategyIter]);
                this.layer.strategies[strategyIter].deactivate();
            }
        }
        
        var activated = OpenLayers.Control.TransformFeature.prototype.activate.call(this);
        if(this.feature===null || this.feature.geometry instanceof OpenLayers.Geometry.Point){
            // Re-render handles to hide them when control is activated initially without a feature selected so far
            this.editLayer.drawFeature(this.box, this.renderIntent);
            var f, handleIter;
            for(handleIter=0; handleIter<this.rotationHandles.length; handleIter++){
                f = this.rotationHandles[handleIter];
                this.editLayer.drawFeature(f, this.renderIntent);
            }
            for(handleIter=0; handleIter<this.handles.length; handleIter++){
                f = this.handles[handleIter];
                this.editLayer.drawFeature(f, this.renderIntent);
            }
        }
        
        this.events.on({
            setfeature: this.highlightTransformedFeature,
            scope: this
        });
        return activated;
    },
    /**
     * Method: createControl
     * Creates a DragFeature control for this control.
     */
    createControl: function() {
        var control = this;
        this.dragControl = new OpenLayers.Control.DragFeature(this.layer, {
            documentDrag: true,
            // avoid moving the feature itself - move the box instead
            moveFeature: function(pixel) {
                if(this.feature === control.feature) {
                    this.feature = control.box;
                }
                OpenLayers.Control.DragFeature.prototype.moveFeature.apply(this,
                    arguments);
            },
            // transform while dragging
            onDrag: function(feature, pixel) {
                if(feature === control.box) {
                    control.transformFeature({center: control.center});
                }
            },
            // set a new feature
            onStart: function(feature, pixel) {
            	
                var eligible = !control.geometryTypes ||
                    OpenLayers.Util.indexOf(control.geometryTypes,
                        feature.geometry.CLASS_NAME) !== -1;
                var i = OpenLayers.Util.indexOf(control.handles, feature);
                i += OpenLayers.Util.indexOf(control.rotationHandles,
                    feature);
                if(feature !== control.feature && feature !== control.box &&
                                                        i == -2 && eligible) {
                    control.setFeature(feature);
                }
            },
            onComplete: function(feature, pixel) {
                control.events.triggerEvent("transformcomplete",
                    {feature: control.feature});
            }
        });
    },
    	
    CLASS_NAME: 'NUTs.Edit.Control.TransformFeature'
});




/*=[ Editor.js ]==========================================================================*/

/****************************************************************
 *
 * 파일명 : OpenLayersEditCustom.js
 * 설  명 : OpenLayersEditor 커스터마이징 JavaScript
 *          OpenLayersEditor버전업을 위한 별도 구성 
 ****************************************************************          
 *          버전업시 필요한 작업
 *          1. loader.js에 본 파일 경로 추가
 *          2. 본 파일에 정의한 클래스 및 함수 변경여부 확인 후 수정
 *          3. 스타일(geosilk.css -> geosilk_custom.css에 변경내역 수정-주로 editorpanel class 명칭.) 
 *
 *    수정일      수정자     Version        Function 명
 * ------------    ---------   -------------  ----------------------------
 * 2015.07.27      최재훈       1.0             최초생성
 * 2015.08.26      최재훈       1.0             activate처리
 * 2015.08.27      윤은희       1.1             NUTs.Edit.Control.DrawPath,DrawCustomPoint Class 추가
 */


/**********************************************
 * 클래스명 : NUTs.Edit.Editor BASIC
 * 설  명 : 커스터마이징 Editor .
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.07.27    최재훈      신규작업
 *
 */

NUTs.Edit.Editor = OpenLayers.Class(OpenLayers.Editor,{
	
	
	/**
     * Property: map
     * {<OpenLayers.Map>} this gets set in the constructor.
     */
    map: null,

    /**
     * Property: id
     * {String} Unique identifier for the Editor.
     */
    id: null,
    
    	
    /**
     * Property: editLayer
     * {<OpenLayers.Layer.Vector>} 현재 편집진행중인 feature workspace.
     */
    editLayer: null,
           
    /**
     * Property: editorPanel
     * {<OpenLayers.Editor.Control.EditorPanel>} Contains icons for active controls
     *     and gets set by startEditMode() and unset by stopEditMode().
     */
    editorPanel: null,

    /**
     * Property: editMode
     * {Boolean} The editor is active.
     */
    editMode: false,

    /**
     * Property: dialog
     * {<OpenLayers.Editor.Control.Dialog>} ...
     */
    dialog: null,

    /**
     * Property: status
     * @type {function(string, string)} Function to display states, receives status type and message
     */
    showStatus: function (status, message) {
        if (status === 'error') {
            alert(message);
        }
    },

    /**
     * Property: activeControls
     * {Array} ...
     */
    activeControls: [],

    /**
     * Property: editorControls
     * {Array} Contains names of all available editor controls. In particular
     *   this information is needed by this EditorPanel.
     */
    editorControls: ['CleanFeature', 'DeleteFeature', 'DeleteAllFeatures', 'Dialog', 'DrawRegular', 'DrawText', 'EditorPanel', 'ImportFeature','MergeFeature', 'SplitFeature', 'CADTools', 'TransformFeature', 'ContextMenu'],


    /**
     * Geometry types available for editing
     * {Array}
     */
    featureTypes: ['text', 'point', 'linestring', 'polygon', 'regular'],

    /**
     * Property: sourceLayers
     * {Array} ...
     */
    sourceLayers: [],

    /**
     * Property: parameters
     * {Object} ...
     */
    params: {},

    geoJSON: new OpenLayers.Format.GeoJSON(),

    /**
     * Property: options
     * {Object} ...
     */
    options: {},

    /**
     * Property: URL of processing service.
     * {String}
     */
    oleUrl: '',

    /**
     * Instantiated controls
     * {Objects}
     */
    controls: {},

    /**
     * Property: undoRedoActive
     * {Boolean} Indicates if the UndoRedo control is active. Only read on
     *     initialization right now. Default is true.
     */
    undoRedoActive: true,

    /**
     * @param {OpenLayers.Map} map A map that shall be equipped with an editor; can be left undefined in which case a map is created.
     * @param {Object} options
     */
    initialize: function (map, options) {

        OpenLayers.Util.extend(this, options);

        if (map instanceof OpenLayers.Map) {
            this.map = map;
        } else {
            this.map = new OpenLayers.Map();
        }

        if (!options) {
            options = {};
        }

        if (!options.dialog) {
            this.dialog = new OpenLayers.Editor.Control.Dialog();
            this.map.addControl(this.dialog);
        }

        this.id = OpenLayers.Util.createUniqueID('OpenLayers.Editor_');

        if (options.editLayer) {
            this.editLayer = options.editLayer;
        } else {
            this.editLayer = new OpenLayers.Layer.Vector('Editor', {
                displayInLayerSwitcher: false
            });
        }        

        var selectionContext = {
            editor: this,
            layer: this.editLayer,
            controls: [
                'OpenLayers.Editor.Control.DeleteFeature',
                'OpenLayers.Editor.Control.CleanFeature',
                'OpenLayers.Editor.Control.MergeFeature',
                'OpenLayers.Editor.Control.SplitFeature'
            ]};
        this.editLayer.events.register('featureselected', selectionContext, this.selectionChanged);
        this.editLayer.events.register('featureunselected', selectionContext, this.selectionChanged);

        for (var i = 0, il = this.featureTypes.length; i < il; i++) {
            if (this.featureTypes[i] == 'polygon') {
                this.activeControls.push('DrawPolygon');
                this.activeControls.push('DrawHole');
            }
            else if (this.featureTypes[i] == 'linestring') {
                this.activeControls.push('DrawPath');
            }
            else if (this.featureTypes[i] == 'point') {
                this.activeControls.push('DrawPoint');
            }
            else if (this.featureTypes[i] == 'regular') {
                this.activeControls.push('DrawRegular');
            }
            else if (this.featureTypes[i] == 'text') {
                this.activeControls.push('DrawText');
            }
        }

        for (var i = 0, il = this.sourceLayers.length; i < il; i++) {
            var selectionContext = {
                editor: this,
                layer: this.sourceLayers[i],
                controls: ['OpenLayers.Editor.Control.ImportFeature']
            };
            this.sourceLayers[i].events.register('featureselected', selectionContext, this.selectionChanged);
            this.sourceLayers[i].events.register('featureunselected', selectionContext, this.selectionChanged);
            this.sourceLayers[i].styleMap = new OpenLayers.StyleMap({
                'default': new OpenLayers.Style({
                    fillColor: '#0c0',
                    fillOpacity: 0.8,
                    strokeColor: '#070',
                    strokeWidth: 2,
                    graphicZIndex: 1,
                    pointRadius: 5
                }),
                'select': new OpenLayers.Style({
                    fillColor: '#fc0',
                    strokeColor: '#f70',
                    graphicZIndex: 2
                }),
                'temporary': new OpenLayers.Style({
                    fillColor: '#fc0',
                    fillOpacity: 0.8,
                    strokeColor: '#f70',
                    strokeWidth: 2,
                    graphicZIndex: 2,
                    pointRadius: 5
                })
            });
            this.map.addLayer(this.sourceLayers[i]);
        }

        this.map.editor = this;
        this.map.addLayer(this.editLayer);
        this.map.addLayer(this.refLayer);
        this.map.addLayer(this.styleLayer);
        this.map.addControl(new OpenLayers.Editor.Control.LayerSettings(this));

        if (this.undoRedoActive) {
            this.map.addControl(new OpenLayers.Editor.Control.UndoRedo(this.editLayer));
        }

        this.addEditorControls();

        return this;
    },
    
    /**
     * Enable or disable controls that depend on selected features.
     *
     * Requires an active SelectFeature control and the following context variables:
     * - editor: this
     * - layer: The layer with selected features.
     * - controls: An array of class names.
     */
    selectionChanged: function () {
        var selectFeature = this.editor.editorPanel.getControlsByClass('OpenLayers.Control.SelectFeature')[0];

        if (this.layer.selectedFeatures.length > 0 && selectFeature && selectFeature.active) {
            // enable controls
            for (var ic = 0, lic = this.controls.length; ic < lic; ic++) {
                var control = this.editor.editorPanel.getControlsByClass(this.controls[ic])[0];
                if (control) {
                    OpenLayers.Element.removeClass(control.panel_div, 'oleControlDisabled');
                }
            }
        } else {
            // disable controls
            for (var ic = 0, lic = this.controls.length; ic < lic; ic++) {
                var control = this.editor.editorPanel.getControlsByClass(this.controls[ic])[0];
                if (control) {
                    OpenLayers.Element.addClass(control.panel_div, 'oleControlDisabled');
                }
            }
        }

        this.editor.editorPanel.redraw();
    },

    /**
     * Makes the toolbar appear and allows editing
     */
    startEditMode: function () {
        this.editMode = true;
        this.editorPanel.activate();
    },

    /**
     * Hides the toolbar and prevents editing
     */
    stopEditMode: function () {
        this.editMode = false;
        this.editorPanel.deactivate();
    },

    /**
     * Initializes configured controls and shows them
     */
    addEditorControls: function () {
        var control = null, controls = [];
        var editor = this;

        for (var i = 0, len = editor.activeControls.length; i < len; i++) {
            control = editor.activeControls[i];

            if (OpenLayers.Util.indexOf(editor.editorControls, control) > -1) {
            	
        		controls.push(new OpenLayers.Editor.Control[control](
                        editor.editLayer, 
                        OpenLayers.Util.extend({
                        	id : control
                        }, editor.options[control])
                        
                ));
                
            }

            switch (control) {

                case 'Separator':
                    controls.push(new OpenLayers.Control.Button({
                    	id: control,
                        displayClass: 'olControlSeparator'
                        	
                    }));
                    break;

                case 'Navigation':
                    controls.push(new OpenLayers.Control.Navigation(
                            OpenLayers.Util.extend(
                                    {
                                    id: control,
                                    title: OpenLayers.i18n('oleNavigation')},
                                    editor.options.Navigation)
                    ));
                    break;

                case 'CustomDragFeature':
                    controls.push(new NUTs.Edit.Control.DragFeature(editor.editLayer,
                            OpenLayers.Util.extend(
                            		{
                            			id: control
                            		}, editor.options.DragFeature)
                    ));
                    break;

                case 'CustomModifyFeature':
                    controls.push(new NUTs.Edit.Control.ModifyFeature(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
	                                    id: control,
	                                    title: OpenLayers.i18n('oleModifyFeature')
                                    }, editor.options.ModifyFeature)
                    ));
                    break;

                case 'CustomTransformFeature':
                    controls.push(new NUTs.Edit.Control.TransformFeature(editor.editLayer,editor.refLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.TransformFeature)
                    ));
                    break;

                case 'SnappingSettings':
                    controls.push(new NUTs.Edit.Control.SnappingSettings(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.SnappingSettings)
                    ));
                    break;

                case 'DrawCustomPoint':
                    controls.push(new DrawPoint(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawPoint)
                    ));
                    break;

                case 'DrawPath':
                    controls.push(new NUTs.Edit.Control.DrawPath(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawPath)
                    ));
                    break;
                    
                case 'DrawHole':
                    controls.push(new NUTs.Edit.Control.DrawHole(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawHole)
                    ));
                    break;

                case 'DrawRefLine':
                    controls.push(new NUTs.Control.DrawFeature(editor.refLayer, NUTs.Handler.Path, {
    					id : 'DrawRefLine',
    					handlerOptions : {
    						attributes : {}
    					},
    		    		eventListeners : {
    		    			"featureadded" : function(evt) {
    		    				editor.checkRefLineCount(evt);
    		    			}
    		    		}
    				}));
                    break;

                case 'SelectFeature':
                    controls.push(new OpenLayers.Control.SelectFeature(
                            editor.sourceLayers.concat([editor.editLayer]),
                            OpenLayers.Util.extend(
                                    {
                                    	id: control,
                                        title: OpenLayers.i18n('oleSelectFeature'),
                                        clickout: true,
                                        toggle: false,
                                        multiple: false,
                                        hover: false,
                                        toggleKey: "ctrlKey",
                                        multipleKey: "ctrlKey",
                                        box: true
                                    },
                                    editor.options.SelectFeature)
                    ));
                    break;

                case 'DownloadFeature':
                    controls.push(new OpenLayers.Editor.Control.DownloadFeature(editor.editLayer,
                            OpenLayers.Util.extend({
                            	id: control
                            	}, this.DownloadFeature)
                    ));
                    break;

                case 'UploadFeature':
                    controls.push(new OpenLayers.Editor.Control.UploadFeature(editor.editLayer,
                            OpenLayers.Util.extend({
                            	id: control
                            	}, this.UploadFeature)
                    ));
                    break;
            }

            // Save instance in editor's controls mapping
            this.controls[control] = controls[controls.length - 1];
        }

        // Add toolbar to map
        this.editorPanel = this.createEditorPanel(controls);
        editor.map.addControl(this.editorPanel);
    },
    
    /**
     * Adds a control to the editor and its panel
     * @param {OpenLayers.Editor.Control} control
     */
    addEditorControl: function (control) {
        this.controls[control.CLASS_NAME] = control;
        this.editorPanel.addControls([control]);
        this.map.addControl(control);
    },

    /**
     * Instantiates the container which displays the tools.
     * To be called by OLE only and intended to be overridden by subclasses that want to display something else instead of the default toolbar
     * @param {Array.<OpenLayers.Control>} controls Editing controls
     * @return {OpenLayers.Editor.Control.EditorPanel} Widget to display editing tools
     */
    createEditorPanel: function (controls) {

        // remove controls from context menu
        if (this.controls['ContextMenu']) {
            var ctrls = this.controls['ContextMenu'].contextMenuControls || [];
            var i = ctrls.length;
            while (i--) {
                var pos = controls.indexOf(this.controls[ctrls[i]]);
                if (~pos) {
                    controls.splice(pos, 1);
                }
            }

            controls.splice(controls.indexOf(this.controls['ContextMenu']), 1);
        }

        var editorPanel = new NUTs.Edit.Control.EditPanel(this);
        editorPanel.addControls(controls);
        return editorPanel;
    },

    status: function (options) {
        if (options.type == 'error') {
            alert(options.content);
        }
    },

    /**
     * Destroys existing features and loads the provided one into editor
     * @param {Array.<OpenLayers.Feature.Vector>} features
     */
    loadFeatures: function (features) {
        this.editLayer.destroyFeatures();
        if (features) {
            this.editLayer.addFeatures(features);
            this.map.zoomToExtent(this.editLayer.getDataExtent());
        }
    },

    /**
     * Callback to update selected feature with result of server side processing
     */
    requestComplete: function (response) {
        var responseJSON = new OpenLayers.Format.JSON().read(response.responseText);
        this.map.editor.stopWaiting();
        if (!responseJSON) {
            this.showStatus('error', OpenLayers.i18n('oleNoJSON'))
        } else if (responseJSON.error) {
            this.showStatus('error', responseJSON.message)
        } else {
            if (responseJSON.params) {
                OpenLayers.Util.extend(this.params, responseJSON.params);
            }
            if (responseJSON.geo) {
                var geo = this.geoJSON.read(responseJSON.geo);
                this.editLayer.removeFeatures(this.editLayer.selectedFeatures);
                this.editLayer.addFeatures(this.toFeatures(geo));
                this.editLayer.events.triggerEvent('featureselected');
            }
        }
    },

    /**
     * Flattens multipolygons and returns a list of their features
     * @param {Object|Array} multiPolygon Geometry or list of geometries to flatten. Geometries can be of types
     *     OpenLayers.Geometry.MultiPolygon, OpenLayers.Geometry.Collection,
     *     OpenLayers.Geometry.Polygon.
     * @return {Array} List for features of type OpenLayers.Feature.Vector.
     */
    toFeatures: function (multiPolygon) {
        if (multiPolygon === null || typeof(multiPolygon) !== 'object') {
            throw new Error('Parameter does not match expected type.');
        }
        var features = [];
        if (!(multiPolygon instanceof Array)) {
            multiPolygon = [multiPolygon];
        }
        for (var i = 0, li = multiPolygon.length; i < li; i++) {
            if (multiPolygon[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.MultiPolygon' ||
                    multiPolygon[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.Collection') {
                for (var j = 0, lj = multiPolygon[i].geometry.components.length; j < lj; j++) {
                    features.push(new OpenLayers.Feature.Vector(
                            multiPolygon[i].geometry.components[j]
                    ));
                }
            } else if (multiPolygon[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
                features.push(new OpenLayers.Feature.Vector(multiPolygon[i].geometry));
            }
        }
        return features;
    },

    toMultiPolygon: function (features) {
        var components = [];
        for (var i = 0, l = features.length; i < l; i++) {
            if (features[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
                components.push(features[i].geometry);
            }
        }
        return new OpenLayers.Geometry.MultiPolygon(components);
    },

    startWaiting: function (panel_div) {
        OpenLayers.Element.addClass(panel_div, 'olEditorWaiting');
        OpenLayers.Element.addClass(this.map.div, 'olEditorWaiting');
        this.waitingDiv = panel_div;
    },

    stopWaiting: function () {
        OpenLayers.Element.removeClass(this.waitingDiv, 'olEditorWaiting');
        OpenLayers.Element.removeClass(this.map.div, 'olEditorWaiting');
    },

    isArray: function(o) {    	
	     return Object.prototype.toString.call(o) == '[object Array]';
	},
	
	getControlById:function(control){
		for(var ctrl in this.controls){
			if(ctrl == control){
				return this.controls[ctrl];
				break;
			}
    	}
	},
	
	deActivateAllEditControls: function(){
		for(var ctrl in this.controls){
    		c = this.controls[ctrl];
            c.deactivate();
    	}
	},
	
    activateControls: function (control_list){

    	map.deActiveAllControls();
    	
    	if(this.isArray(control_list)){
    		
    		for(var j = 0 ; j < control_list.length ; j++) {
    			var control = this.controls[control_list[j]];
    			
	            if (control.type == OpenLayers.Control.TYPE_BUTTON) {
	                control.trigger();
	                return;
	            }
	            
	            if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
	                if (control.active) {
	                    control.deactivate();
	                } else {
	                    control.activate();
	                }
	                return;
	            }
	            
	            if (this.allowDepress && control.active) {
	                control.deactivate();
	            } else {
	            	
	                var c;
	                for(var ctrl in this.controls){
                		c = this.controls[ctrl];
                		if (c != control && control_list.indexOf(c.id) == -1 ) {
 		                        c.deactivate();
 		                }
                	}
	               
	                control.activate();
	            }
    		}
            
    	}else{
    		var control = this.getControl(control_list);
    		
    		if (!this.active) { return false; }
            if (control.type == OpenLayers.Control.TYPE_BUTTON) {
                control.trigger();
                return;
            }
            
            if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
                if (control.active) {
                    control.deactivate();
                } else {
                    control.activate();
                }
                return;
            }
            
            if (this.allowDepress && control.active) {
                control.deactivate();
            } else {
            	
                var c;
                var c;
                for(var ctrl in this.controls){
            		c = this.controls[ctrl];
            		if (c != control && control_list.indexOf(c.id) == -1 ) {
		                        c.deactivate();
		                }
            	}
               
                control.activate();
            }
    	}
    },
    CLASS_NAME: 'NUTs.Edit.Editor'
});



/*=[ EditRule.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : EditRule.js
 * 설 명 : 편집 Rule 
 * 필요 라이브러리 : JSTS
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2016.03.25			윤은희				1.0					최초 생성
 * 
 * 
**********************************************************************************/

NUTs.EditRule = {

		/**
		 * Spatial Operation Type
		 */
		spatialOperType : {
			TOUCHES : 0,
			CONTAINS : 1,
			INTERSECTS : 2
		},
		
		/**
		 *  Rule 체크할 geometry
		 */		
		editingGeometry : {},
		
		/**
		 * 기본 offset 값
		 */
		offset : {x:0, y:0},
		
		/**
		 * Rule 체크 결과 geometry
		 */
		resultGeometry : {},
		
		/**
		 * Rule 체크 결과 Boolean 
		 */
		resultState : false,
		
		/**
		 * 허용 오차, 단위(m)
		 */
		tolerance : 0.01,
		
		
		/**
		 * vertices 간 거리
		 */
		dist: 0,

		/**********************************************************************************
		 * 함수명 : checkRelationGeometry
		 * 설 명 : 지오메트리와 관련 레이어의 기존 지오메트리와의 공간관계
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어 배열), _sOperator(수행할 연산 - TOUCHES, CONTAINS, INTERSECTS), _sWfsServiceUrl(서비스URL), _sPrefix(prefix이름)
		 * 반환값 : 
		 * 			-> 룰 성공 : 값이 존재하는 결과 객체 리턴 - 공간 연산 성립하는 Obj(레이어별-객체들) 리턴
		 * 			-> 룰 실패 : 값이 존재하지 않는 결과 객체 리턴 - Empty obj 리턴
		 * 사용법 : checkRelationGeometry(_oSourceFeature, _aCompLayer, _sOperator)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 2017.03.13			최재훈		contains의 경우 서비스 직접호추방식임(webapp func 직접 호출하지 않도록 개선)
		 **********************************************************************************/
		checkRelationGeometry : function(_oSourceFeature, _aCompLayer, _sOperator, _sWfsServiceUrl, _sPrefix){
			
			var oResultGeom = {};
			
			switch(_sOperator){			
				case 0 : 
					oResultGeom = this.checkRelationGeometryTouches(_oSourceFeature, _aCompLayer); 
					break; 
				case 1 : 
					oResultGeom = this.checkRelationGeometryContains(_oSourceFeature, _aCompLayer, _sWfsServiceUrl, _sPrefix);
					break; 
				case 2 : 
					oResultGeom = this.checkRelationGeometryIntersects(_oSourceFeature, _aCompLayer);
					break;
			}

			return this.resultGeometry = oResultGeom;
		},
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryTouches
		 * 설 명 : 선형 지오메트리 상에 위치(연결)하는지 (LL)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : LINE 과 LINE 사이의 연결성은 Intersect연산으로 할 수 없고(Cross 객체도 true 이므로) 반드시 Touches 연산으로만 수행해야함
		 * 			2) 현 편집 객체가 대상 객체와 touch되어 있는지 체크하여 상태 리턴.
		 * 				A) 상수시설물 : 급수관로와 연결 확인, 배수관과 연결확인, 기존관로와 연결확인
		 * 				B) 하수시설물 : 하수관거-기존관로와연결확인, 하수연결관-기존하수관거에 인입
		 * 				C) 도로시설물 : 도로중심선-기존 도로중심선과 연결
		 * 				D) 기타 : 이외, 연산 대상 레이어가 배열(복수개 레이어)일 경우도 해당함.
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP 1. 편집을 수행하는(추가/수정) 객체 기준으로 룰 체크할 대상객체를 찾는다.
		 * 				STEP 1-1. JSTS 연산을 통해 대상 객체를 찾기 위해 편집 객체를 GeoJson 객체로 생성 및 Buffer연산 수행 후 Openlayers 객체로 변환한다. 
		 * 				STEP 1-2. 편집을 수행하는(추가/수정) 객체 기준으로 룰 체크할 대상객체를 찾는다.
		 * 			STEP 2. 찾은 대상 객체와 편집을 수행하는(추가/수정) 객체간의 거리를 측정하여 오차율 범위안에 존재하면 
		 * 						-> 룰 성공 : 값이 존재하는 결과 객체 리턴 - Touches 성립하는 Obj(레이어별-객체들) 리턴
		 * 						-> 룰 실패 : 값이 존재하지 않는 결과 객체 리턴 - Empty obj 리턴 
		 * 
		 * 인 자 	: _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어 배열)
		 * 반환값 : 
		 * 			-> 룰 성공 : 값이 존재하는 결과 객체 리턴 - Touches 성립하는 Obj(레이어별-객체들) 리턴
		 * 			-> 룰 실패 : 값이 존재하지 않는 결과 객체 리턴 - Empty obj 리턴
		 * 사용법 : checkRelationGeometryTouches(_oSourceFeature, _aCompLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryTouches : function(_oSourceFeature, _aCompLayer){
			
			var oResultGeom = {};
			
			// STEP 1.
			// STEP 1-1.   
			var oInputGeom = GGeoJson.getGeoJson('LineString', _oSourceFeature.geometry.components);        
			var oBufferGeom = GGeomJSTSOper.calcGeomBuffer(oInputGeom, 1); // 1m
			var oCalcPolyGeom = GGeomJSTSOper.makeGeoJsonGeom(oBufferGeom);
			var oGInnerFeature = editor.makeFeatureByPosList('polygon', oCalcPolyGeom.coordinates[0], MAP_EDITOR.fn_get_fidByFeature(_oSourceFeature));

			// STEP 1-2.		
			var oGData = this.checkRelationGeometryIntersects(oGInnerFeature, _aCompLayer);
			if(oGData.data.length >0){

				// STEP 2.							
				var oInputGeom = GGeoJson.getGeoJson('LineString', _oSourceFeature.geometry.components);
				var oCompGeom = {};							

				// Distance 오차 범위안에(Touches 성립) 존재하는 각 레이어별 Feature를 찾아내서 최종 결과 oResultGeom에 담는다.
				for(var i=oGData.data.length-1; 0<=i; i--){		// Layer 별,

					var oResults = oGData.data[i].results;
					for(var j=oResults.length-1; 0<=j; j--){		// feature 별,

						oCompGeom = GGeoJson.getGeoJson('LineString', oResults[j].feature.geometry.components);    

						var nDistGeom = GGeomJSTSOper.calcGeomDistance(oInputGeom, oCompGeom);
						var bCrossesGeom =  GGeomJSTSOper.calcGeomCrosses(oInputGeom, oCompGeom);

						// nDistGeom이 0이면서 bCorssesGeom이 true인 경우가 있어서(=현 지도 축척에서 육안으로 확인 불가한 cross상태인 시설물들-상수관에 붙어있는 급수관), nDistGeom이 0이면 Touches성립으로 간주하도록 함.
						// 단, 동일 시설물들끼리는 이 조건에서 제외시킴. 비교하는 시설물이 서로 다른 시설물일 경우, nDistGeom이 0이면 cross상태를 무시하도록 하여 Touche로 판단함.
						if(MAP_EDITOR.fn_get_tblNameByFeature(_oSourceFeature) !== MAP_EDITOR.fn_get_tblNameByFeature(oResults[j].feature))
							if(nDistGeom === 0) 
								continue;

						if(nDistGeom > NUTs.EditRule.tolerance || bCrossesGeom){		// 허용오차범위를 벗어나거나 Crosses된 객체면 해당 feature는 결과 Obj에서 제거함.
							oResults.splice(j,1);
							if(oResults.length === 0)
								oGData.data.splice(i,1);
						}
					}
				}

				if(oGData.data.length === 0)
					oGData = {};

				oResultGeom = oGData;  // oGData = 위의 for 수행이 끝난 최종 결과를 담고 있는 obj
			}
			
			return oResultGeom;	
		},
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryIntersects
		 * 설 명 : 점형(선형) 지오메트리와 선형(점형) 지오메트리와의 INTERSECTS 체크(Anything)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황(예) : 점형 지오메트리가 선형 지오메트리 상(위)에 위치하는지  
		 * 			2) 현 편집 객체가 대상 객체와 INTERSECTS되어 있는지 체크하여 상태 리턴.  예를 들어,  
		 * 				A) 상수시설물 : 
		 * 						- 상수관로와 연결확인 				: 가압장/스탠드파이프/변류시설/유량계/수압계/수원지/취수장/가압장/배수지/상수관로심도/누수지점 및 복구내역/신축관실 
		 * 						- 급수관로와 연결확인 				: 급수전계량기/소화전/급수탑/지수전
		 * 				B) 하수시설물 : 
		 * 						- 하수관거와 연결확인 				: 하수관거심도/하수맨홀/환기구/하수펌프장/유수지/역사이펀/토구/하수처리장/측구 
		 * 						- 하수관거(합류관)과 연결확인 	: 우수토실 
		 * 						- 하수관거(차집관거)와 연결확인 	: 하수처리장 
		 * 						- 하수연결관(말)						: 물받이
		 * 				C) 도로시설물 :
		 * 						- 도로중심선 						: 교차시설
		 * 
		 * 			[ 처리 단계 ]
		 * 			설명 생략		
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어 배열)
		 * 반환값 : 
		 * 			-> 룰 성공 : 값이 존재하는 결과 객체 리턴 - Intersects 성립하는 Obj(레이어별-객체들) 리턴
		 * 			-> 룰 실패 : 값이 존재하지 않는 결과 객체 리턴 - Empty obj 리턴
		 * 사용법 : checkRelationGeometryIntersects(_oSourceFeature, _aCompLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryIntersects : function(_oSourceFeature, _aCompLayer){
	    	
			this.addResultOnGData = function(_oLayerFeature, _sCase, _oGDatasData){
				var sLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oLayerFeature);
				var sFId = MAP_EDITOR.fn_get_fidByFeature(_oLayerFeature); 
				var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(_oLayerFeature);

				var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(_oLayerFeature, sFId, '');
				// true = wfs vectorLayer, false = editLayer or styleLayer
				!_oLayerFeature.featureType ? oGFeature.fields = _oLayerFeature.attributes : oGFeature.fields = editor.editingFeatures[sLayer][sG2Id].properties;							

				if(_sCase === 'all'){
					var oGResult = MAP_EDITOR.fn_get_objFactory().Util.createGResult();
					oGResult.table = sLayer;
					oGResult.results.push(oGFeature);
					oGData.data.push(oGResult);
				}
				else if(_sCase === 'result')
					_oGDatasData.results.push(oGFeature);
			}

			var oResultGeom = {};
			var aCompLayer =  _aCompLayer;
			var aSearchingLayer = [], oSearchingLayer = {};
			var oGData = MAP_EDITOR.fn_get_objFactory().Util.createGData();			

			if(!(aCompLayer instanceof Array)){
				if(!aCompLayer)
					return oResultGeom;
				else if(typeof aCompLayer === 'string'){
					aCompLayer = [];
					aCompLayer.push(_aCompLayer);
				}									
			}

			for(var t=0, tLen=aCompLayer.length; t<tLen; t++){
				var oLayer = map.getLayerByName(aCompLayer[t]);
				if(oLayer)
					aSearchingLayer.push(oLayer);
			}
			aSearchingLayer.push(editor.styleLayer);
			aSearchingLayer.push(editor.editLayer);

			for(var j=0, jLen=aSearchingLayer.length; j<jLen; j++){
				oSearchingLayer = aSearchingLayer[j];
				for(var i=0, len=oSearchingLayer.features.length ; i<len; i++){
					var oLayerFeature = oSearchingLayer.features[i];

					if(MAP_EDITOR.fn_get_fidByFeature(_oSourceFeature) !== MAP_EDITOR.fn_get_fidByFeature(oLayerFeature)){
						var sLayer = MAP_EDITOR.fn_get_tblNameByFeature(oLayerFeature);
						var sFId = MAP_EDITOR.fn_get_fidByFeature(oLayerFeature);
						
						if($.inArray(sLayer, aCompLayer) > -1){
							if (!oLayerFeature.getVisibility())
								continue;

							if (_oSourceFeature.geometry.intersects(oLayerFeature.geometry)) {	
								var isExist = false;

								// intersects 결과 만들기
								if(sLayer !== ''){
									if(oGData.data.length === 0)
										this.addResultOnGData(oLayerFeature, 'all');
									else{
										for(var k=0, kLen=oGData.data.length; k<kLen; k++){
											var oGResultObj = oGData.data[k];
											if(oGResultObj.table === sLayer){
												for(var t=0, tLen=oGResultObj.results.length; t<tLen; t++){
													var oGFeatureObj = oGResultObj.results[t];
													if(oGFeatureObj.feature.attributes.fid === sFId){
														isExist = true;
														break;
													}
												}
												if(!isExist)
													this.addResultOnGData(oLayerFeature, 'result', oGResultObj);
											}
											else
												this.addResultOnGData(oLayerFeature, 'all');
										}
									}
								}
							}
						}
					}
				}
			}

			return oResultGeom = oGData;
		},
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryContains
		 * 설 명 : 면형 지오메트리 상(위)에 위치하는지 (AP/AL/AA)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : POLYGON 과 POINT/LINE/POLYGON 과의 관계성 체크
		 * 			2) 현 편집 객체가 대상 객체와 Contain되어 있는지 체크하여 상태 리턴.
		 * 				A) 도로시설물 : 
		 * 					Case 1) 도로면 내에 위치 - 교통표지판/기타시설(점)/도로표지판/보안등/신호등/점용시설(점)/정류장/공동구/교통광장/기타시설(면)/점용시설(선)//자전거도로/절개면/성토면/점용시설(면)/주차장/지하보도/포장
		 * 					Case 2) 도로면(보도면) 내에 위치 - CCTV/가로수/자전거보관소
		 * 					Case 3) 도로면(차도면) 내에 위치 - 과속방지턱/미끄럼방지시설/중앙분리대/횡단보도 
		 * 
		 * 			[ 처리 단계 ]
		 * 			설명 생략		
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어 배열),_sWfsServiceUrl(서비스URL), _sPrefix(prefix이름)
		 * 사용법 : checkRelationGeometryContains(_oSourceFeature, _aCompLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 2017.03.12			최재훈		webapp function 직접 호출(강결합 문제 개선)
		 **********************************************************************************/
		checkRelationGeometryContains : function(_oSourceFeature, _aCompLayer, _sWfsServiceUrl, _sPrefix){

			var oResultGeom = {};			
			
			NUTs.WFS.getFeatureByContains(
					_sWfsServiceUrl, 
					{
						prefix : _sPrefix,
						tables : [_aCompLayer],						
						values : [_oSourceFeature.geometry]
					}, 
					function(_oRes) {
						debugger;
						if(_oRes.data.length > 0)
							oResultGeom = _oRes;
					},
					{
						alias : '',
						titles : ''
					},
					true
			);
			
			return oResultGeom;
		},



		/**********************************************************************************
		 * 함수명 : checkRelationGeometryEnd
		 * 설 명 : 점형 지오메트리와 관련 선형 지오메트리의 끝점과의 공간관계 (PL)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 선형 객체의 끝점과 연결되는 지
		 * 			2) 현 편집 객체가 대상 객체의 끝점과 touch되어 있는지 체크하여 결과 obj 리턴.
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP 1. 추가/수정 객체(point) 기준으로 연산대상시설물(ex.급수관) 찾기
		 * 				STEP 1-1. 기준 객체 생성 : 추가/수정한 객체(geometry)를 JTS 연산을 위한 GeoJson 형태의 객체로 변환
		 * 			STEP 2. 찾은 연산 대상 시설물(ex.급수관)의 양 끝점과 추가/수정 객체점과의 거리연산 -> 오차 범위안에 있는 점 선정 -> 없으면 룰 위배! -> empty obj return
		 * 			STEP 3. 찾은 연산 대상 시설물의 끝점 찾기 
		 * 				STEP 3-1. 찾은 점이 인접한 연관시설물(ex.상수관)이 있으면 끝점에 입력한게 아니므로 -> 룰 위배! -> empty obj return
		 * 				STEP 3-2. 찾은 점이 인접한 연관시설물(ex.상수관)이 없으면 끝점에 입력하였으므로 -> 룰 성공! -> 찾은 연산 대상 시설물(ex.급수관)의 끝점 obj return
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어 배열), _aRefLayer(연산 대상 레이어의 연관 레이어)
		 * 반환값 : 
		 * 			-> 룰 성공 : 값이 존재하는 결과 객체 리턴 - 추가/수정 객체(point) 기준으로 찾은 연산 대상 시설물(ex.급수관)의 끝점 obj return
		 * 			-> 룰 실패 : 값이 존재하지 않는 결과 객체 리턴 - Empty obj 리턴
		 * 사용법 : checkRelationGeometryEnd(_oSourceFeature, _aCompLayer, _aRefLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryEnd : function(_oSourceFeature, _aCompLayer, _aRefLayer){

			var oResultGeom = {};
			var oCompGeom1 = {}, oCompGeom2 = {};
			var oInputGeomClone = MAP_EDITOR.fn_clone_featureToGInnerFeature(_oSourceFeature);

			// Step 1.
			// Step 1-1.			
			var oInputGeom = GGeoJson.getGeoJson('Point', _oSourceFeature.geometry);
			var oBufferGeom = GGeomJSTSOper.calcGeomBuffer(oInputGeom, 0.5); // 50cm (인접 객체를 찾기 위한 수치: 실제로는 떨어져 있는 시설물이지만 웹 편집시스템의 제한 축척(최대 1:708)으로 인해 육안으로는 붙어있는것으로 보이는 거리이므로 50cm범위안에서 찾음)
			var oCalcPolyGeom = GGeomJSTSOper.makeGeoJsonGeom(oBufferGeom);
			var oGInnerFeature = editor.makeFeatureByPosList('Polygon', oCalcPolyGeom.coordinates[0], MAP_EDITOR.fn_get_fidByFeature(_oSourceFeature));
			
			var oGData = this.checkRelationGeometryIntersects(oGInnerFeature, _aCompLayer);			
			if(oGData.data.length >0){
				// STEP 2.
				var oResults = oGData.data[0].results;
				for(var i=0, len=oResults.length;  i<len; i++){ // feature별(비교 객체)
					var oPoint1 = oResults[i].feature.geometry.components[0];
					oCompGeom1 = GGeoJson.getGeoJson('Point', oPoint1);
					var oPoint2 = oResults[i].feature.geometry.components[oResults[i].feature.geometry.components.length-1];   
					oCompGeom2 = GGeoJson.getGeoJson('Point', oPoint2); 					

					var nDist1 = GGeomJSTSOper.calcGeomDistance(oInputGeom, oCompGeom1);
					var nDist2 = GGeomJSTSOper.calcGeomDistance(oInputGeom, oCompGeom2);
					var nDist;
					var oEndPointGeom = {};

					if(nDist1 < nDist2){
						nDist = nDist1;
						oEndPointGeom = oPoint1;	        							
					}
					else{
						nDist = nDist2;
						oEndPointGeom = oPoint2;
					}

					if(nDist < NUTs.EditRule.tolerance){
						// STEP 3.
						// STEP 3-1. & 3-2.
						var oSearchGeom = GGeoJson.getGeoJson('Point', oEndPointGeom);
						var oBufferGeom = GGeomJSTSOper.calcGeomBuffer(oSearchGeom, 0.5);
						var oCalcPolyGeom = GGeomJSTSOper.makeGeoJsonGeom(oBufferGeom);
						var oGInnerFeature = editor.makeFeatureByPosList('Polygon', oCalcPolyGeom.coordinates[0], MAP_EDITOR.fn_get_fidByFeature(oResults[i].feature));
						
						var oGData2 = this.checkRelationGeometryIntersects(oGInnerFeature, _aRefLayer);						
						if(oGData2.data.length === 0){ // 끝점으로 확인되어 결과 obj 에 담음.	 입력점이 끝점으로 판정되면 대부분 입력점(_oSourceFeature)과 동일하나 혹 오차로 인해 다를 경우를 대비해 아래와 같이 처리함. 												

							oInputGeomClone.geometry =  oEndPointGeom;

							var oGResult = MAP_EDITOR.fn_get_objFactory().Util.createGResult('');
							var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(oInputGeomClone, 'TEMP_LAYER.0', '');  

							oGResult.results.push(oGFeature);
							oGData2.data.push(oGResult);
							oResultGeom = oGData2;
						}
					}
				}
			}

			return this.resultGeometry = oResultGeom;
		},
		
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationAddPointOnGeometryEnd
		 * 설 명 : 선형 지오메트리의 끝점 찾기
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 선형 객체의 끝점(관말)에 점형시설추가 - ex) 급수관 추가시 관말에 계량기 자동 생성.
		 * 			2) 현 편집 객체(Line)의 끝점 Point obj 리턴.
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP 1. 입력 객체(Line)의 양 끝점을 가져와서 연산 대상 시설물(ex.상수관)과 인접하지 않는 끝점이 입력 객체의 실제 끝점(관말)임. 해당 점을 찾음.
		 * 			STEP 2. 연산 대상 시설물과 떨어져 있는 시설물일 경우(메인 관에 붙어 있어야 하는데 떨어져 있는 잘못된 관들의 경우에 해당함) 입력 객체의 순서상 끝점을 끝점(관말)으로 지정함.
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어)
		 * 반환값 : 끝점 Point Object 
		 * 			-> 성공 : 값이 존재하는 결과 객체 리턴 - 끝점 Ponit Object
		 * 			-> 실패 : 값이 존재하지 않는 결과 객체 리턴 - Empty obj 리턴
		 * 사용법 : checkRelationAddPointOnGeometryEnd(_oSourceFeature, _aCompLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.05.02			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationAddPointOnGeometryEnd : function(_oSourceFeature, _aCompLayer){
			
			var oResultGeom = {};
			var oEndPointGeom = {};
			var nGeomLength = _oSourceFeature.geometry.components.length;
			var nChkCnt = 0;
			
			// STEP 1.
			for(var i=0; i<2; i++){
				i === 0 ? oEndPointGeom = _oSourceFeature.geometry.components[i] : oEndPointGeom = _oSourceFeature.geometry.components[nGeomLength-1];
				
				var oInputGeom = GGeoJson.getGeoJson('Point', oEndPointGeom);
				var oBufferGeom = GGeomJSTSOper.calcGeomBuffer(oInputGeom, 0.5); // 50cm (인접 객체를 찾음. 웹 편집시스템의 제한 축척(최대 1:708)으로 인해 떨어져 있는 시설물이지만 육안으로는 확인되지 않는 거리이므로.)
				var oCalcPolyGeom = GGeomJSTSOper.makeGeoJsonGeom(oBufferGeom);
				var oGInnerFeature = editor.makeFeatureByPosList('Polygon', oCalcPolyGeom.coordinates[0], MAP_EDITOR.fn_get_fidByFeature(_oSourceFeature));

				
				var oGData = this.checkRelationGeometryIntersects(oGInnerFeature, _aCompLayer);
				if(oGData.data.length === 0){	
					oResultGeom = oEndPointGeom;		// 끝점으로 확인되어 결과 obj 에 담음.
					nChkCnt++;
				}
			}
			
			// STEP 2.
			if(nChkCnt === 2) // 연관시설물과 떨어져 있는 시설물일 경우(메인 관에 붙어 있어야 하는데 떨어져 있는 잘못된 관들의 경우에 해당함)
				oResultGeom = _oSourceFeature.geometry.components[nGeomLength-1];			

			return this.resultGeometry = oResultGeom;
		},

		
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryMove
		 * 설 명 : 선형 지오메트리상의(위에 존재하는 혹은, 연결된) 지오메트리(L,P) 동시 이동
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 선형시설물(상수관로,급수관로,하수관거,하수연결관) 이동시 연결된(혹은, 위에 존재하는) 선/점형 시설물 동시이동
		 * 				A) 상수시설물 : 상수관로 - 상수관로 위에 존재하는 시설물, 연결된 급수관, 급수관로에 연결된 시설물(관말시설)
		 * 								   급수관로 - 급수관로에 연결된 시설물(관말시설)
		 * 				B) 하수시설물 : 하수관거 - 하수관거 위에 존재하는 시설물, 연결된 하수연결관, 하수연결관에 연결된 시설물(관말시설)
		 * 								   하수연결관 - 하수연결관에 연결된 시설물(관말시설)
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP1. 현 편집(수정)객체 이동 및 그 '위'에 존재하는 객체 이동
		 * 				STEP1-1. 현 편집(수정)객체 이동 : 현 편집(수정) 객체는 이동 후 '중간저장 갱신'시켜야 함. - "정점편집 or 개체이동" 기능을 통해 편집 중인 객체들은 수행하지 않음(각 custom class에서 자기 자신을 이동시킴)
		 * 						   현 현 편집(수정)객체 위치이동 후 속성 중 공간정보를 자동으로 변경
		 * 				STEP1-2. 현 편집(수정)객체와의 연관 객체 찾기 - '위'에 존재하는 객체(INTERSECT 연산수행)
		 * 				STEP1-3. STEP1-2에서 찾은 연관 객체 이동
		 * 				
		 * 			STEP2. 현 편집(수정)객체와 연결된 객체 이동		
		 * 				STEP2-1. 현 편집(수정)객체와 연결된 객체 찾기 - TOUCHES 연산수행
		 * 				STEP2-2. STEP2-1에서 찾은 객체와 연관 객체 찾기(관말객체) - '위'에 존재하는 객체(INTERSECT 연산수행)
		 * 				STEP2-3. STEP2-2-1에서 찾은 객체 이동(관말 객체)
		 * 				STEP2-4. 현 편집(수정)객체와 연결된 객체 이동
		 * 
		 * 인 자 : _oSourceObj(연산할 기준 Feature를 담고 있는 Obj : oRes 혹은 Feature 둘 중 하나임), _oOffset(이동 수치)
		 * 사용법 : checkRelationGeometryMove(_oSourceObj, _oOffset)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryMove : function(_oSourceObj, _oOffset){			
			var oSourceFeature = {};								// 인자로 넘어온 객체에서(_oSourceObj) 연산할 기준 Feature를 담기 위한 용도.
			var sSourceFeatureLayer='', sSourceFeatureG2Id='', sSourceFeatureType='', aCompMainLayer=[], sCompLayer='', aCompSubLayer=[], oOriginSourceRes={};
			var oTouchesGeom = {}, oIntersectsGeom = {};
		
			if(_oSourceObj.data instanceof Array){				// _oSourceObj = 결과Obj 일 경우(ex.시설물 검색결과-oRes) - 좌표이동 전 객체
				oOriginSourceRes = NUTs.Util.deepCloneObject(_oSourceObj);
				
				sSourceFeatureType = 'gResObject';
				sSourceFeatureLayer = _oSourceObj.data[0].table;
				sSourceFeatureG2Id = _oSourceObj.data[0].results[0].g2id;
				oSourceFeature = _oSourceObj.data[0].results[0].feature;	
			}
			else{														// _oSourceObj = Feature일 경우(ex.정점편집/개체이동을 통해 넘어온 객체)
				oSourceFeature = _oSourceObj;
				
				sSourceFeatureType = 'oGInnerFeature';
				sSourceFeatureLayer = MAP_EDITOR.fn_get_tblNameByFeature(oSourceFeature);
				sSourceFeatureG2Id = MAP_EDITOR.fn_get_g2idByFeature(oSourceFeature);				

				if(oSourceFeature.modified.geometry){
					oSourceFeature.layer.editingFeatureGeometry = oSourceFeature.geometry.clone();
					oSourceFeature.geometry = oSourceFeature.modified.geometry; // modified에는 original geometry정보가 담겨있음('정점편집/개체이동'을 통한 좌표이동 전 geometry)
				}
			}

			if(EditRuleRelatedLayer[sSourceFeatureLayer].connectedlayer instanceof Object){
				var oRelatedLayer = EditRuleRelatedLayer[sSourceFeatureLayer].connectedlayer;
				if(oRelatedLayer.length === undefined){
					sCompLayer = oRelatedLayer.mainlayer.toString();
					aCompSubLayer = oRelatedLayer.onlayer;	
				}				
			}
			aCompMainLayer = EditRuleRelatedLayer[sSourceFeatureLayer].onlayer;
			
			/*var oSourceFeatureClone = oSourceFeature.clone(); 			// 좌표값 이동전 원본(original) feature
			oSourceFeatureClone = MAP_EDITOR.fn_deepClone_featureToGInnerFeature(oSourceFeatureClone);*/
			var oSourceFeatureClone = MAP_EDITOR.fn_deepClone_featureToGInnerFeature(oSourceFeature); // 좌표값 이동전 원본(original) feature
			

			// STEP1.
			// STEP1-1.	
			if(sSourceFeatureType === 'gResObject'){
				// _oOffset만큼 이동 및 중간저장
				this.checkRelationGeometryMoveToByOffset(oOriginSourceRes, _oOffset, true);

				// 중간저장 정보 갱신 - 윗 라인 수행으로 oSourceFeature 위치정보가 변경되었으므로 갱신함 : 공간정보 clone이 아니기에 oOriginSourceRes과 oSourceFeature는 같은 공간을 참조하고 있음.
				MAP_EDITOR.fn_check_SpatialValueChange(oSourceFeature, sSourceFeatureLayer, sSourceFeatureG2Id);	
				MAP_EDITOR.fn_call_saveMiddleBridge(sSourceFeatureLayer, sSourceFeatureG2Id);				
	        	this.CheckRelationLocValueSync(oSourceFeature);	// 편집하는 feature의 위치 속성 자동 갱신(행정동/법정동/도엽번호)
			
				var sFId = sSourceFeatureLayer.concat('.',sSourceFeatureG2Id);

				// 변경된 위치 기준으로 다시 그리기 - editlayer, stylelayer, effectlayer
				editor.editLayer.removeAllFeatures();
				editor.addDrawFeature(editor.editLayer, oSourceFeature, 'select');

				var oCurStyleFeature = editor.styleLayer.getFeaturesByAttribute('fid', sFId);
				editor.styleLayer.destroyFeatures(oCurStyleFeature, {silent: true});
				var oGInnerNewStyleFeature = editor.createFeature(oSourceFeature, sFId);
				editor.addDrawFeature(editor.styleLayer, oGInnerNewStyleFeature, sSourceFeatureLayer);
				
				if(editor.getGeometryType(oSourceFeature) !== 'point')
					MAP_EDITOR.fn_draw_oneFeatureBorder(oSourceFeature);
			}
			
			// STEP1-2.
			oIntersectsGeom = this.checkRelationGeometry(oSourceFeatureClone, aCompMainLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
			if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false){ //존재하면
				if(oIntersectsGeom.data.length > 0){

					var aRelateLayer = [];
					var sRelateLayer = '';
					for(var t=0,tLen=oIntersectsGeom.data.length; t<tLen; t++){
						aRelateLayer.push(COMMON.fn_get_EditKorLayerNm(oIntersectsGeom.data[t].table));
					}
					sRelateLayer = aRelateLayer.join(',');

					// STEP1-3.
					if (confirm(COMMON.fn_get_EditKorLayerNm(sSourceFeatureLayer)+' 위에 [' + sRelateLayer + ']  존재하는데 같이 이동하시겠습니까?'))    // 복수 시설물 존재함.
						this.checkRelationGeometryMoveToByOffset(oIntersectsGeom, _oOffset, false, oSourceFeature);
				}
			}

			// STEP2.
			// STEP2-1.
			if(sCompLayer !== '')
				oTouchesGeom = this.checkRelationGeometry(oSourceFeatureClone, sCompLayer, NUTs.EditRule.spatialOperType.TOUCHES);

			// STEP2-2.
			if(NUTs.Util.isEmptyObject(oTouchesGeom) === false){
				if(oTouchesGeom.data.length > 0){

					var nTouchesGeomCnt = oTouchesGeom.data[0].results.length;
					if (confirm('연결된 [' + COMMON.fn_get_EditKorLayerNm(sCompLayer) + '] ' + nTouchesGeomCnt + '개 존재하는데 같이 이동하시겠습니까?')){

						for(var k=0,kLen=nTouchesGeomCnt; k<kLen; k++){	// 단일 시설물이며, Feature 별로,
							// 연산 대상을 찾아야 하므로 JSTS 연산을 사용할 수 없음.
							oIntersectsGeom = this.checkRelationGeometry(oTouchesGeom.data[0].results[k].feature, aCompSubLayer, NUTs.EditRule.spatialOperType.INTERSECTS);

							// STEP2-3.
							if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false) // 관말이 존재하면,
								this.checkRelationGeometryMoveToByOffset(oIntersectsGeom, _oOffset, false, oSourceFeature);
						}

						// STEP2-4.
						this.checkRelationGeometryMoveToByOffset(oTouchesGeom, _oOffset, false, oSourceFeature);
					}
				}								
			}
			
			// editor.oSearchResults를 위치이동이 끝난 위치로 공간을 갱신해야 하는 여부....
			// 1. [객체이동]을 통해 들어온 _oSourceObj는 NUTs.Edit.Control.DragFeature 클래스에서 좌표이동된 위치로 변경갱신함.
			// 2. [시설물 검색]을 통해 들어온 _oSourceObj는 checkRelationGeometryMoveToByOffset()를 통해 offset 만큼 위치이동 된 위치로 좌표가 갱신되어 있으므로 별도 작업 필요하지 않음.
		},

		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryMoveToByOffset
		 * 설 명 : 레이어별 Feature이동 - Offset 만큼 이동시킨 후 편집 모니터 등록.
		 * 
		 * 			[ 처리 단계 ]
		 * 			레이어별 Feature를 이동 시킨 후 WFS Layer의 Filter를 업데이트 시킨 후, 중간저장 DB에 저장시킴.
		 * 			중간저장 단계 : 중간저장 DB Insert -> 정상 insert 개체에 대해 WFS Layer에서 삭제-> Style Layer에 추가 -> 편집모니터 등록
		 * 			중간저장 시킨 객체에 대해 위치속성을 갱신시킴 : 갱신시킬 위치 정보는 편집 기준 객체의 위치임.
		 * 
		 * 인 자 : _oRes(이동시킬 레이어 Object), _oOffset(이동시킬 OffSet수치), _bAdd(editor.editLayer에 추가시킬지 여부, true=추가, false=추가시키지 않음)
		 * 			_oSourceFeature(기준객체 : 이동시킨 객체 속성 갱신 및 ) 
		 * 반환값 : 인수로 받았던 '이동시킬 레이어 Object'를 Offset만큼 이동된 결과 Object
		 * 사용법 : checkRelationGeometryMoveToByOffset(_oRes, _oOffset, _bAdd)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryMoveToByOffset : function(_oRes, _oOffset, _bAdd, _oSourceFeature){
			
			/*this.addPoint = function(_oGInnerFeature, _nStartIdx, _nEndIdx, _nDist, _nAddIdx){
				var sx, sy, nx, ny, angle;				
				var objResult = {};
				var posList = [];
				
				sx = _oGInnerFeature.geometry.components[_nStartIdx].x;			//시작점 X좌표
				sy = _oGInnerFeature.geometry.components[_nStartIdx].y;			//시작점 Y좌표
				nx = _oGInnerFeature.geometry.components[_nEndIdx].x;			//다음점 X좌표
				ny = _oGInnerFeature.geometry.components[_nEndIdx].y;			//다음점 Y좌표

				angle = NUTs.Util.fn_get_angleBy2Dist((ny-sy), (nx-sx));

				if(_nAddIdx === 1){	// 선분 중앙에 신규 point 추가
					var gapNextPoint = NUTs.Util.fn_get_DistanceBy2Point(sx, sy, nx, ny); //현재지점과 다음지점과의 거리					
					_nDist = gapNextPoint/2;
				}
				
				objResult.x = sx + _nDist * Math.cos(angle);
				objResult.y = sy + _nDist * Math.sin(angle);					
				posList.push(objResult);
				var tmpGeometry = editor.getGeometryByPoint(posList);
				_oGInnerFeature.geometry.addComponent(tmpGeometry, _nAddIdx);		
			};*/
			
			
			var oResultGeom = {};
			var oCurLayer = {}, oCurGFeature = {};
			
			// _oRes가 복수개 레이어를 담고 있을경우, 
			// 레이어단위별로 가져올 때 _oRes.data[i]로 값을 읽어오게되므로 oGData에 값을 담기 위해서는 다시 data 속성을 생성해줘야 함.
			var oGData = MAP_EDITOR.fn_get_objFactory().Util.createGData();
		
			if(_oSourceFeature &&  _oSourceFeature.modified && _oSourceFeature.modified.control){ 	// '정점편집/객체이동'을 통해 편집된 객체의 geometry
				if(NUTs.Util.isEmptyObject(_oSourceFeature.layer.editingFeatureGeometry) === false)		// 위치이동이 끝난 geomtry
					_oSourceFeature.geometry = _oSourceFeature.layer.editingFeatureGeometry;
			}
			
			for(var i=0,len=_oRes.data.length; i<len; i++){ // 레이어 별로,				
				oCurLayer = _oRes.data[i];				
				for(var j=0, jLen=oCurLayer.results.length; j<jLen; j++){	 // Feature 별로,								
					oCurGFeature = oCurLayer.results[j];
					/*
					// Modified Action을 통해 넘어온 경우, offset 계산하기( geom type 체크 : 점이면 선으로 변환 -> 선은 연장선을 만들어서 modified 지점과 교차점 찾기)	
					if(_oSourceFeature &&  _oSourceFeature.modified && _oSourceFeature.modified.control){ // '정점편집'을 통해 편집된 객체의 geometry
						var oEditingGeom = _oSourceFeature.geometry;								// '정점편집' 통해 위치 이동된 geometry
						var oOriginGeom = _oSourceFeature.modified.geometry;						// '정점편집' 통해 위치 이동된 geometry의 편집 전 geomtry
						var oCurGInnerFeatureClone = oCurGFeature.feature.clone();				// '정점편집' 통해 위치 이동된 geometry에 따라 같이 이동시킬 연관 시설 객체
						
						if(editor.getGeometryType(oCurGInnerFeatureClone) === 'point'){
							;
						}
						else if(editor.getGeometryType(oCurGInnerFeatureClone) === 'linestring'){
							// 2점만 있는 선분일 경우, 3점으로 분할
							if(oCurGInnerFeatureClone.geometry.components.length === 2)
								this.addPoint(oCurGInnerFeatureClone, 0, 1, 0, 1);
							
							// 시작점과 끝점 각각으로부터 연장 점 생성하여 추가함.
							var moveDist = this.dist;	 															// 이동 거리. NUTs.Edit.Control.ModifyFeature에서 정점편집 vertex의 이동 거리						
							var len = oCurGInnerFeatureClone.geometry.components.length;
							this.addPoint(oCurGInnerFeatureClone, 0, 1, moveDist+10, 0);					// 시작점에 추가
							this.addPoint(oCurGInnerFeatureClone, len-1, len-2, moveDist+10, len-1);		// 끝점에 추가
						}
					}*/
					
					
					this.translateGeometry(oCurGFeature.feature.geometry, _oOffset);	// Feature의 geometry vertex 이동 - offset 만큼,
					MAP_EDITOR.fn_update_filterOnWFSLayer(oCurLayer.table, oCurGFeature.g2id);
				}
				
				// 레이어 단위로 중간 저장 DB에 Insert
				oGData.data.push(oCurLayer);
				
				if(_bAdd)
					MAP_EDITOR.fn_save_middleAll(oGData);							// editor.editLayer에 추가함.					
				else
					MAP_EDITOR.fn_save_middleAll(oGData, 'excludeEditLayer');		// editor.editLayer에 추가하지 않음.
				
				// editor.editingFeatures에 등록이 되어 있어야 하므로 fn_save_middleAll() 수행 후 실행함.
				if(_oSourceFeature){
					for(var k=0, kLen=oCurLayer.results.length; k<kLen; k++){	 // Feature 별로,	 편집개체(_oSourceFeature)의 공간속성값으로 연관된 oCurFeature를 모두 갱신.
						var oCurFeature = oCurLayer.results[k].feature;
						
						// 편집하는 feature 및 이와 연관된 feature의 위치 속성 자동 갱신(행정동/법정동/도엽번호)
			        	this.CheckRelationLocValueSync(_oSourceFeature, oCurFeature.attributes.fid);
					}
				}
			}
			
			oResultGeom = _oRes;
			return this.resultGeometry = oResultGeom;
		},
		
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryMoveEndPoint
		 * 설 명 : 선형 지오메트리 끝점에 존재하는 점형 지오메트리 이동시 선형 지오메트리 끝점 동시 이동(PL)
		 * 			혹은, 선형 지오메트리 이동시 선형 지오메트리 끝점에 존재하는 점형 지오메트리 동시 이동(LP)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 점형시설물(급수전계량기)이동시 연결된 선형시설물(급수관로) 끝점 동시이동 혹은, 선형시설물(급수관로) 끝점 이동시 연결된 점형시설물(급수전계량기) 동시 이동
		 * 			2) 현 편집 객체가 대상 객체와의 INTERSECTS결과를 찾아서 현 편집 객체의 이동된 좌표점으로 찾은 대상 객체의 끝점 변경하여 대상 객체(Object) 리턴. 
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP 1. 편집 객체 기준으로 연산대상객체 찾기 :  편집 객체의 이동전 좌표값으로 연산대상객체를 찾음.
		 * 
		 * 			Case 1 > PL 				
		 * 				STEP 2. 찾은 연산 대상 객체(ex.급수관)의 끝점 찾기 : 양 끝점과 편집 객체(수정객체-좌표 이동전 point)와의 거리연산 -> 오차 범위안에 있는 점 선정(jsts distance)
		 * 				STEP 3. 찾은 연산 대상 객체의 끝점을 편집 객체(수정객체-좌표 이동 후 point)의 좌표점으로 변경
		 * 
		 * 		 	Case 2 > LP 				
		 * 				STEP 2. 찾은 연산 대상 객체(ex.급수전계량기) 점과 편집 객체 양끝점(수정객체-좌표 이동전 양 끝 point)과 거리계산 -> 오차 범위안에 있는 점 선정(jsts distance)
		 * 				STEP 3. 찾은 연산 대상 객체의 좌표점을 편집 객체(수정객체-좌표 이동 후 point)의 Step2 에서 찾은 좌표점으로 변경  
		 * 
		 * 			STEP 4. (끝점이) 변경된 연산 대상 객체를 WFS Filter 갱신 -> 편집 객체로 전환(편집모니터 등록 등) -> 중간저장 혹은 중간저장 갱신
		 * 			STEP 5. 편집하는 feature 및 이와 연관된 feature의 위치 속성 자동 갱신(행정동/법정동/도엽번호)
		 * 			STEP 6. 반환값 생성 : (끝점이) 변경된 연산 대상 객체 반환 
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어)
		 * 반환값 : 성공시 -> (끝점이) 변경된 연산 대상 객체(oGData) 반환, 실패시 -> Feature가 없는 빈 oGData 반환
		 * 사용법 : checkRelationGeometryMoveEndPoint(_oSourceFeature, _aCompLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryMoveEndPoint : function(_oSourceFeature, _aCompLayer){
			var oResultGeom = {};
			var oRelatedResult = {};
			
			// STEP 1.
			var oInputGeomClone = MAP_EDITOR.fn_clone_featureToGInnerFeature(_oSourceFeature);			
			var oSourceFeatureOriginGeom = _oSourceFeature.modified.geometry;
			oInputGeomClone.geometry = oSourceFeatureOriginGeom;
			
			var oCalcResGeom = this.checkRelationGeometry(oInputGeomClone, _aCompLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
			var sCompLayer = _aCompLayer[0];

			// STEP 2.
			if(oCalcResGeom.data.length >0){	// ex. 찾은 급수관이 있으면 or 급수전 계량기가 있으면,

				oRelatedResult = oCalcResGeom.data[0].results[0];
				oRelatedResult.feature.attributes.fid=sCompLayer.concat('.',oRelatedResult.g2id);
				
				var sSourceType = _oSourceFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','');
				var oRelatedFeature = oRelatedResult.feature;

				if(sSourceType === 'Point'){
					var oRelatedFeatureComponents = oRelatedFeature.geometry.components;
					var oInputOriginGeomP = GGeoJson.getGeoJson('Point', oSourceFeatureOriginGeom);
					var oCompGeomP1 = GGeoJson.getGeoJson('Point', oRelatedFeatureComponents[0]);
					var oCompGeomP2 = GGeoJson.getGeoJson('Point', oRelatedFeatureComponents[oRelatedFeatureComponents.length-1]);

					//  STEP 2. ~ STEP 3.
					if(GGeomJSTSOper.calcGeomDistance(oCompGeomP1, oInputOriginGeomP) < this.tolerance){		                			 
						oRelatedFeatureComponents[0] = _oSourceFeature.geometry;
					}		                			 
					else if(GGeomJSTSOper.calcGeomDistance(oCompGeomP2, oInputOriginGeomP) < this.tolerance){
						oRelatedFeatureComponents[oRelatedFeatureComponents.length-1] = _oSourceFeature.geometry;
					}
				}
				else if(sSourceType === 'LineString'){
					var oInputOriginGeomP1 = GGeoJson.getGeoJson('Point', oSourceFeatureOriginGeom.components[0]);
					var oInputOriginGeomP2 = GGeoJson.getGeoJson('Point', oSourceFeatureOriginGeom.components[oSourceFeatureOriginGeom.components.length-1]);
					var oCompGeomP = GGeoJson.getGeoJson('Point', oRelatedFeature.geometry);					

					//  STEP 2. ~ STEP 3.
					if(GGeomJSTSOper.calcGeomDistance(oCompGeomP, oInputOriginGeomP1) < this.tolerance){
						oRelatedFeature.geometry = _oSourceFeature.geometry.components[0];
					}		                			 
					else if(GGeomJSTSOper.calcGeomDistance(oCompGeomP, oInputOriginGeomP2) < this.tolerance){
						oRelatedFeature.geometry = _oSourceFeature.geometry.components[_oSourceFeature.geometry.components.length-1];
					}
				}				

				// STEP 4.
				var sFId = MAP_EDITOR.fn_get_fidByFeature(oRelatedFeature);
				var sG2Id = oCalcResGeom.data[0].results[0].g2id;
								
				if(editor.editingFeatures[sCompLayer] && editor.editingFeatures[sCompLayer][sG2Id]){		// 중간 저장 갱신					
					MAP_EDITOR.fn_check_SpatialValueChange(oRelatedFeature, sCompLayer, sG2Id);
					MAP_EDITOR.fn_call_saveMiddleBridge(sCompLayer, sG2Id);
					
					var oStyleFeature = editor.getFeatureByFid(editor.styleLayer, sFId);
			    	if(oStyleFeature){
			    		editor.styleLayer.destroyFeatures(oStyleFeature, {silent: true}); 
		    			var oStyleGFeature = editor.createFeature(oRelatedFeature, sFId);
		            	editor.addDrawFeature(editor.styleLayer, oStyleGFeature, sCompLayer);
			    	}
				}
				else{																			// 신규 중간 저장
					MAP_EDITOR.fn_update_filterOnWFSLayer(sCompLayer, sG2Id);
					MAP_EDITOR.fn_start_editFeature(oCalcResGeom, sG2Id, sCompLayer, true);
					MAP_EDITOR.fn_save_middle('insert', sCompLayer, sG2Id);	
				}
				
				// STEP 5.
	        	this.CheckRelationLocValueSync(oRelatedFeature, sFId);
			}
			
			// STEP 6.	
        	var oGData = MAP_EDITOR.fn_get_objFactory().Util.createGData();
        	var oGResult = MAP_EDITOR.fn_get_objFactory().Util.createGResult('');
			oGResult.results.push(oRelatedResult);
			oGData.data.push(oGResult);
			oResultGeom = oGData;
			
			return this.resultGeometry = oResultGeom;
		},


		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryDelete
		 * 설 명 : 선형 지오메트리상에 존재 혹은 연결된 연관 지오메트리 삭제 확인(LL, LP)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 선형 데이타 상 시설물 삭제
		 * 			2) 현 편집 객체상에 존재 혹은 연결된 객체 삭제 수행. 반환값 없음.
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP1. 현 편집(수정)객체위에 존재하는 객체 삭제
		 * 				STEP1-1. 현 편집(수정)객체와의 연관 객체 찾기 - '위'에 존재하는 객체(INTERSECT 연산수행)
		 * 				STEP1-2. STEP1-1에서 찾은 연관 객체 삭제
		 * 			STEP2. 현 편집(수정)객체와 연결된 객체 삭제		
		 * 				STEP2-1. 현 편집(수정)객체와 연결된 객체 찾기 - TOUCHES 연산수행
		 * 				STEP2-2. STEP2-1에서 찾은 객체와 연관 객체 찾기(관말객체) - '위'에 존재하는 객체(INTERSECT 연산수행)
		 * 				STEP2-3. STEP2-2-1에서 찾은 객체 삭제(관말 객체)
		 * 				STEP2-4. 현 편집(수정)객체와 연결된 객체 삭제
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체 : Feature임 - attributes, geometry, layer등을 보유하고 있음)
		 * 반환값 : this.resultState 값(Boolean)
		 * 사용법 : checkRelationGeometryDelete(_oSourceFeature)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryDelete : function(_oSourceFeature){

			var sSourceFeatureLayer= '';
			var aCompMainLayer = [], sCompLayer = '', aCompSubLayer = [];
			var oTouchesGeom = {}, oIntersectsGeom = {};
															
			sSourceFeatureLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oSourceFeature);	
			
			if(EditRuleRelatedLayer[sSourceFeatureLayer].connectedlayer instanceof Object){
				var oRelatedLayer = EditRuleRelatedLayer[sSourceFeatureLayer].connectedlayer;
				if(oRelatedLayer.length === undefined){
					sCompLayer = oRelatedLayer.mainlayer.toString();
					aCompSubLayer = oRelatedLayer.onlayer;	
				}				
			}
			aCompMainLayer = EditRuleRelatedLayer[sSourceFeatureLayer].onlayer;

				
			var oSourceFeatureClone = MAP_EDITOR.fn_clone_featureToGInnerFeature(_oSourceFeature);	// 원본 Feature
			
			// STEP1.
			// STEP1-1.
			oIntersectsGeom = this.checkRelationGeometry(_oSourceFeature, aCompMainLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
			if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false){ //존재하면
				if(oIntersectsGeom.data.length > 0){
					
					var aRelateLayer = [];
					var sRelateLayer = '';
					for(var t=0,tLen=oIntersectsGeom.data.length; t<tLen; t++){
						aRelateLayer.push(COMMON.fn_get_EditKorLayerNm(oIntersectsGeom.data[t].table));
					}
					sRelateLayer = aRelateLayer.join(',');
					
					// STEP1-2.
					if (confirm(COMMON.fn_get_EditKorLayerNm(sSourceFeatureLayer)+' 위에 [' + sRelateLayer + ']  존재하는데 같이 삭제하시겠습니까?')){    // 복수 시설물 존재함.		
						
						this.deleteGeometry(oIntersectsGeom, false);
					}
				}				
			}		
			
			// STEP2. 
			// STEP2-1.
			if(sCompLayer !== '')
				oTouchesGeom = this.checkRelationGeometry(oSourceFeatureClone, sCompLayer, NUTs.EditRule.spatialOperType.TOUCHES);

			// STEP2-2.
			if(NUTs.Util.isEmptyObject(oTouchesGeom) === false){
				if(oTouchesGeom.data.length > 0){
					
					var nTouchesGeomCnt = oTouchesGeom.data[0].results.length;
					if (confirm('연결된 [' + COMMON.fn_get_EditKorLayerNm(sCompLayer) + '] ' + nTouchesGeomCnt + '개 존재하는데 같이 삭제하시겠습니까?')){

						for(var k=0,kLen=nTouchesGeomCnt; k<kLen; k++){	// 단일 시설물이며, Feature 별로,
							// 연산 대상을 찾아야 하므로 JSTS 연산을 사용할 수 없음.							
							oIntersectsGeom = this.checkRelationGeometry(oTouchesGeom.data[0].results[k].feature, aCompSubLayer, NUTs.EditRule.spatialOperType.INTERSECTS);

							// STEP2-3.
							if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false) // 관말이 존재하면,	
								this.deleteGeometry(oIntersectsGeom, false);															
						}
						
						// STEP2-4.
						this.deleteGeometry(oTouchesGeom, false);
					}
				}								
			}
			
			return this.resultState = true;
		},
		
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryDoNotDelete
		 * 설 명 : 선형 지오메트리상에 존재하는 다른 지오메트리 삭제 여부 확인(PL,LL) : INTERSECTS
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 선형 데이타 상 시설물 삭제, 선형 데이타 상 시설물 삭제 불가
		 * 			2) 현 편집 객체가 대상 객체와 INTERSECTS되어 있는지 체크하여 결과(Boolean) 리턴.
		 * 
		 * 			[ 처리 단계 ]
		 * 			설명 생략
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _aCompLayer(연산 대상 레이어 배열)
		 * 사용법 : checkRelationGeometryDoNotDelete(_oSourceFeature, _aCompLayer)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryDoNotDelete : function(_oSourceFeature, _aCompLayer){

			var oChkResult = this.checkRelationGeometry(_oSourceFeature, _aCompLayer, NUTs.EditRule.spatialOperType.INTERSECTS);

			// 편집시설물 삭제 불가하도록 Rule 연산 결과 Return
			if(oChkResult.data.length >0)
				return this.resultState = false;
			else
				return this.resultState = true;
		},
		
		
		
		/**********************************************************************************
		 * 함수명 : CheckRelationLocValueSync
		 * 설 명 : 지오메트리 위치 변경시 속성 중 공간정보를 자동으로 변경하며, 연결 지오메트리의 공간속성도 동일 정보로 변경처리
		 * 			연관된 geometry의 정보(fid)가 인자로 넘어오지 않을 경우, 편집하는 geometry의 위치 속성만 갱신함.
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 급수관로 공간편집 시 연결된 급수전계량기 공간 속성정보(행정동, 법정동, 도엽번호) 변경처리 or 급수전계량기 공간 편집 시 연결된 급수관로 공간 속성정보 변경처리
		 * 
		 * 			[ 처리 단계 ]
		 * 			설명 생략
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체), _sRelatedLayerFId(연관 레이어의 fid)
		 * 사용법 : CheckRelationLocValueSync(_oSourceFeature, _sRelatedLayerFId)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		CheckRelationLocValueSync : function(_oSourceFeature, _sRelatedLayerFId){			
			this.checkFldValueChange = function(_obj, _sLayer, _sG2Id, _sFldName){
				var bChgState = false;
				var sLblFldName = MAP_EDITOR.fn_replace_fieldName(_sLayer, _sFldName);
				var sType 		= editor.layerColumnInfo[_sLayer].fieldInfo[_sFldName].g2_DATATYPE;
				var nDataLength = editor.layerColumnInfo[_sLayer].fieldInfo[_sFldName].g2_LENGTH;
				var nPrecision 	= editor.layerColumnInfo[_sLayer].fieldInfo[_sFldName].g2_PRECISION;
				var nScale 		= editor.layerColumnInfo[_sLayer].fieldInfo[_sFldName].g2_SCALE;				
				
				return bChgState = MAP_EDITOR.fn_check_fldValueChange(_obj, _sLayer, _sG2Id, sLblFldName, sType, nDataLength, nPrecision, nScale);				
			};
			
			this.initPreValueObj = function(){
				oPreValue = {
						id : '',									// FieldName
						value : ''								// FieldValue
				}
			};

			var bRuleChkState = false;
			var sSourceFeatureLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oSourceFeature);
			var sSourceFeatureG2Id = MAP_EDITOR.fn_get_g2idByFeature(_oSourceFeature);
			var sRelatedFeatureLayer = '', sRelatedG2Id = '';
			var oPreValue = {};
		
			if(_sRelatedLayerFId  && _sRelatedLayerFId !== ''){
				sRelatedFeatureLayer = _sRelatedLayerFId.split('.')[0];
				sRelatedG2Id = _sRelatedLayerFId.split('.')[1];
			}

			this.initPreValueObj();
			editor.setPreValue(oPreValue);

			var aPositionLayerInfo = MAP_EDITOR.fn_get_aPositionLayerInfo();
			for(var idx in aPositionLayerInfo){
				var sSearchLayer = aPositionLayerInfo[idx]['layer'];
				var sSearchFldName = aPositionLayerInfo[idx]['field'];

				if(editor.layerColumnInfo[sSourceFeatureLayer].fieldInfo[sSearchFldName] !== undefined){
					oPreValue.id = sSearchFldName;
					oPreValue.value = MAP_EDITOR.fn_get_layerPositionInfo(sSearchLayer, sSearchFldName, _oSourceFeature);
					bRuleChkState = this.checkFldValueChange(oPreValue, sSourceFeatureLayer, sSourceFeatureG2Id, sSearchFldName);
				}

				if(sRelatedFeatureLayer !== ''){
					if(oPreValue.value !== '' && editor.layerColumnInfo[sRelatedFeatureLayer].fieldInfo[sSearchFldName] !== undefined)
						bRuleChkState = this.checkFldValueChange(oPreValue, sRelatedFeatureLayer, sRelatedG2Id, sSearchFldName);
				}

				this.initPreValueObj();
				editor.setPreValue(oPreValue);
			}

			return this.resultState = bRuleChkState;
		},
		
		
		/**********************************************************************************
		 * 함수명 : CheckRelationValueUpdate
		 * 설 명 : 지오메트리의 속성을 지정한 값으로 변경처리
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 급수관로의  속성정보(ex. 폐전여부, 수전번호, etc) 변경처리
		 * 
		 * 			[ 처리 단계 ]
		 * 			설명 생략
		 * 
		 * 인 자 : _sRelatedLayerFId(변경할 레이어의 FID), _sField(변경할 필드), _sValue(변경할 속성값)
		 * 사용법 : CheckRelationValueUpdate(sRelateLayerFId, _sField, _sValue)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		CheckRelationValueUpdate : function(_sRelatedLayerFId, _sField, _sValue){

			var bRuleChkState = false;
			
			var sLayer = _sRelatedLayerFId.split('.')[0];
			var sG2Id = _sRelatedLayerFId.split('.')[1];
			
			var sLblFldName = MAP_EDITOR.fn_replace_fieldName(sLayer, _sField);
			var sType 		= editor.layerColumnInfo[sLayer].fieldInfo[_sField].g2_DATATYPE;
			var nDataLength = editor.layerColumnInfo[sLayer].fieldInfo[_sField].g2_LENGTH;
			var nPrecision 	= editor.layerColumnInfo[sLayer].fieldInfo[_sField].g2_PRECISION;
			var nScale 		= editor.layerColumnInfo[sLayer].fieldInfo[_sField].g2_SCALE;
	    	
			var oPreValue = {
					id : _sField.toLowerCase(),			// FieldName
					value : ''								// FieldValue
			}

			editor.setPreValue(oPreValue);
			
			oPreValue.value =_sValue;
			
			return this.resultState = bRuleChkState = MAP_EDITOR.fn_check_fldValueChange(oPreValue, sLayer, sG2Id, sLblFldName, sType, nDataLength, nPrecision, nScale);					
		},
		
		
		/**********************************************************************************
		 * 함수명 : translateGeometry
		 * 설 명 : 개별 지오메트리 Vertex Offset 만큼 이동
		 * 
		 * 인 자 : _oGeometry(이동할 geometry), _oOffset(이동시킬 Offset수치)
		 * 사용법 : translateGeometry(_oGeometry, _oOffset)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		translateGeometry : function(_oGeometry, _oOffset){
			this.newCoordinates = function(sx, sy, nx, ny){
				var objResult = {};															// 거리와 각을 이용해서 계산한 새로운 좌표점(x,y)		
				var nAngle = NUTs.Util.fn_get_angleBy2Dist((ny-sy), (nx-sx));		//현재지점과 다음지점과의 각		
				var nDist = 5;
				objResult.x = sx + nDist * Math.cos(nAngle);
				objResult.y = sy + nDist * Math.sin(nAngle);

				return objResult;
			}
			
			var nOffsetX = parseFloat(_oOffset.x);
			var nOffsetY = parseFloat(_oOffset.y);
			
			if(typeof _oOffset !== 'object')
				_oOffset = {x:0, y:0};

			var sSourceType = _oGeometry.CLASS_NAME.replace('OpenLayers.Geometry.','');
			
			switch(sSourceType){
				case 'Point' :
					_oGeometry.x += nOffsetX;
					_oGeometry.y += nOffsetY;
					break; 
				case 'LineString' :
					for(var i=0,len=_oGeometry.components.length; i<len; i++){
						_oGeometry.components[i].x += nOffsetX;
						_oGeometry.components[i].y += nOffsetY;
					}
					break;
				case 'Polygon' :
		    		var oComponents = _oGeometry.components;
		    		if(oComponents.length > 0) {
		    			for(var i=0, len=oComponents.length; i<len; i++){
		    				var oComponent = oComponents[i];
		        			for(var j=0, jLen=oComponent.components.length-1; j<jLen; j++){
		        				var oInnerComponent = oComponent.components[j];
			    				oInnerComponent.x += nOffsetX;
			    				oInnerComponent.y += nOffsetY;
		        			}
		    			}
		    		}
					break;
			}
			_oGeometry.bounds = null;
			_oGeometry.bounds = editor.getBoundsByNewGeometry(_oGeometry);

			return _oGeometry;
		},

		
		/**********************************************************************************
		 * 함수명 : deleteGeometry
		 * 설 명 : 레이어별 Feature 삭제
		 * 
		 * 			[ 처리 단계 ]
		 * 			레이어별 Feature를 삭제 시킨 후 WFS Layer의 Filter를 업데이트 시킨 후, 중간저장 DB에 저장시킴.
		 * 			중간저장 단계 : 중간저장 DB Insert(삭제객체 상태로 : state = 4) -> 정상 insert 개체에 대해 WFS Layer에서 삭제-> Style Layer에 추가 -> 편집모니터 등록
		 * 
		 * 인 자 : _oRes(연산 결과를 가지고 있는 삭제할 Object), _bAdd(editor.editLayer에 추가시킬지 여부, true=추가, false=추가시키지 않음)
		 * 사용법 : deleteGeometry(_oRes)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		deleteGeometry : function(_oRes, _bAdd){
			
			var oCurLayer = {}, oCurGFeature = {};
			
			// _oRes가 복수개 레이어를 담고 있을경우, 
			// 레이어단위별로 가져올 때 _oRes.data[i]로 값을 읽어오게되므로 oGData에 값을 담기 위해서는 다시 data 속성을 생성해줘야 함.
			var oGData = MAP_EDITOR.fn_get_objFactory().Util.createGData();
			
			for(var i=0,len=_oRes.data.length; i<len; i++){ // 레이어 별로,	
				
				oCurLayer = _oRes.data[i];				
				
				for(var j=0, jLen=oCurLayer.results.length; j<jLen; j++){	 // Feature 별로,								
					oCurGFeature = oCurLayer.results[j];	
					MAP_EDITOR.fn_update_filterOnWFSLayer(oCurLayer.table, oCurGFeature.g2id);								
				}
				
				// 레이어 단위로 중간 저장 DB에 Insert
				oGData.data.push(oCurLayer);
				
				if(_bAdd)
					MAP_EDITOR.fn_save_middleAll(oGData);								// editor.editLayer에 추가함.					
				else
					MAP_EDITOR.fn_save_middleAll(oGData, 'excludeEditLayer', 4);		// editor.editLayer에 추가하지 않음.				
			}
		},
		
		
		
		
		
		
		/**********************************************************************************
		 * 여기서 부터는 수원 프로젝트에서만 사용하는 Customized 된 함수들 정의 
		 **********************************************************************************/
		
		
		
		
		/**********************************************************************************
		 * 함수명 : checkRelationGeometryDeleteForSuwon
		 * 설 명 : 선형 지오메트리상에 존재 혹은 연결된 연관 지오메트리 삭제 확인(LL, LP)
		 * 
		 * 			[ 상세 설명 ]
		 * 			1) 적용 상황 : 선형 데이타 상 시설물 삭제 & 급수전계량기가 연결되어 있는 경우 급수관로 삭제 불가처리 
		 * 			2) 현 편집 객체상에 존재 혹은 연결된 객체 삭제 수행. 반환값 없음.
		 * 
		 * 			[ 처리 단계 ]
		 * 			STEP1. 현 편집(수정)객체위에 존재하는 객체 삭제
		 * 				STEP1-1. 현 편집(수정)객체와의 연관 객체 찾기 - '위'에 존재하는 객체(INTERSECT 연산수행)
		 * 				STEP1-2. STEP1-1에서 찾은 연관 객체 삭제
		 * 			STEP2. 현 편집(수정)객체와 연결된 객체 삭제		
		 * 				STEP2-1. 현 편집(수정)객체와 연결된 객체 찾기 - TOUCHES 연산수행
		 * 				STEP2-2. STEP2-1에서 찾은 객체와 연관 객체 찾기(관말객체) - '위'에 존재하는 객체(INTERSECT 연산수행)
		 * 				STEP2-3. STEP2-2-1에서 찾은 객체 삭제(관말 객체)
		 * 				STEP2-4. 현 편집(수정)객체와 연결된 객체 삭제(ex. 급수관)
		 * 
		 * 인 자 : _oSourceFeature(연산할 기준 객체 : Feature임 - attributes, geometry, layer등을 보유하고 있음)
		 * 반환값 : this.resultState(Boolean) 값
		 * 사용법 : checkRelationGeometryDeleteForSuwon(_oSourceFeature)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
		checkRelationGeometryDeleteForSuwon : function(_oSourceFeature){	
			
			this.makeResObjForDelete = function(_oGFeature){

				var oGData = MAP_EDITOR.fn_get_objFactory().Util.createGData();
				var oGResult = MAP_EDITOR.fn_get_objFactory().Util.createGResult(MAP_EDITOR.fn_get_tblNameByFeature(_oGFeature.feature));
				
				oGResult.results.push(_oGFeature);
				oGData.data.push(oGResult);	
				return oGData;
			};	
			
			
			
			var sSourceFeatureLayer= '';
			var aCompMainLayer = [], sCompLayer = '', aCompSubLayer = [];
			var oTouchesGeom = {}, oIntersectsGeom = {};
															
			sSourceFeatureLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oSourceFeature);		
			
			if(EditRuleRelatedLayer[sSourceFeatureLayer].connectedlayer instanceof Object){
				var oRelatedLayer = EditRuleRelatedLayer[sSourceFeatureLayer].connectedlayer;
				if(oRelatedLayer.length === undefined){
					sCompLayer = oRelatedLayer.mainlayer.toString();
					aCompSubLayer = oRelatedLayer.onlayer;	
				}				
			}
			aCompMainLayer = EditRuleRelatedLayer[sSourceFeatureLayer].onlayer;
				
			var oSourceFeatureClone = MAP_EDITOR.fn_clone_featureToGInnerFeature(_oSourceFeature);	// 원본 Feature			
			
			// STEP1.
			// STEP1-1.
			oIntersectsGeom = this.checkRelationGeometry(_oSourceFeature, aCompMainLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
			if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false){ //존재하면
				this.resultState = true;
				if(oIntersectsGeom.data.length > 0){
					
					var aRelateLayer = [];
					var sRelateLayer = '';
					for(var t=0,tLen=oIntersectsGeom.data.length; t<tLen; t++){
						aRelateLayer.push(COMMON.fn_get_EditKorLayerNm(oIntersectsGeom.data[t].table));
					}
					sRelateLayer = aRelateLayer.join(',');
					
					// STEP1-2.
					if(sSourceFeatureLayer === 'WTL_SPLY_LS'){						
						NUTs.Util.showMessage('편집오류 & ' + COMMON.fn_get_EditKorLayerNm(sSourceFeatureLayer)+' 와 연결된 [' + sRelateLayer + ']가 존재하므로 삭제할 수 없습니다.',4000);	
						this.resultState = false;
					}
					else{
						if (confirm(COMMON.fn_get_EditKorLayerNm(sSourceFeatureLayer)+' 위에 [' + sRelateLayer + ']  존재하는데 같이 삭제하시겠습니까?')){    // 복수 시설물 존재함.		
							
							this.deleteGeometry(oIntersectsGeom, false);
							this.resultState = true;
						}	
					}
				}				
			}		
			
			// STEP2. 
			// STEP2-1.
			if(sCompLayer !== '')
				oTouchesGeom = this.checkRelationGeometry(oSourceFeatureClone, sCompLayer, NUTs.EditRule.spatialOperType.TOUCHES);

			// STEP2-2.
			var oDoNotDelLayer = {};
			if(NUTs.Util.isEmptyObject(oTouchesGeom) === false){
				if(oTouchesGeom.data.length > 0){
					
					var nTouchesGeomCnt = oTouchesGeom.data[0].results.length;
					if (confirm('연결된 [' + COMMON.fn_get_EditKorLayerNm(sCompLayer) + '] ' + nTouchesGeomCnt + '개 존재하는데 같이 삭제하시겠습니까?')){

						for(var k=0,kLen=nTouchesGeomCnt; k<kLen; k++){	// 단일 시설물이며, Feature 별로,
							// 연산 대상을 찾아야 하므로 JSTS 연산을 사용할 수 없음.							
							oIntersectsGeom = this.checkRelationGeometry(oTouchesGeom.data[0].results[k].feature, aCompSubLayer, NUTs.EditRule.spatialOperType.INTERSECTS);

							// STEP2-3.							
							if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false && oIntersectsGeom.data.length > 0){ 	 // 관말이 존재하면,								
								
								if(sCompLayer === 'WTL_SPLY_LS')
									oDoNotDelLayer[oTouchesGeom.data[0].results[k].g2id] = oIntersectsGeom.data[0].results[0].g2id;
								else{
									this.deleteGeometry(oIntersectsGeom, false);									
									// STEP2-4.
									this.deleteGeometry(this.makeResObjForDelete(oTouchesGeom.data[0].results[k]), false);
									this.resultState = true;
								}
							}
							else{	// STEP2-4.			//관말이 존재하지 않으면
								this.deleteGeometry(this.makeResObjForDelete(oTouchesGeom.data[0].results[k]), false);
								this.resultState = true;
							}		
						}
						
						var sMsg = [];				
						$.each(oDoNotDelLayer, function(key, value){
							sMsg.push(key + '-' + value + '</br> ');
						});
						NUTs.Util.showMessage('편집오류 & 연결된 급수전 계량기 존재시 급수관로 삭제 불가</br> 불가 시설물관리번호 : [급수관로-급수전계량기] </br>'+ sMsg.join(''),5000);						
					}
				}								
			}	
			
			return this.resultState;
		}
		
};



/*=[ EditStyle.js ]==========================================================================*/

/****************************************************************
 *
 * 파일명 : EditStyle.js
 * 설  명 : 편집에 사용되는 vector레이어상의 feature 스타일 정의 
 ****************************************************************          
 *
 *    수정일      수정자     Version        Function 명
 * ------------    ---------   -------------  ----------------------------
 * 2016.03.18      최재훈       1.0             최초생성
 */

/**
 * 기본심볼 정의
 * */
 
OpenLayers.Feature.Vector.style = {
    'default': {
        fillColor: "#ee9900",
        fillOpacity: 0.4, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#ee9900",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },
    'select': {
        fillColor: "#FF7373",
        fillOpacity: 0.6, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#FF4545",
        strokeOpacity: 1,
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3

    },
    'temporary': {
        fillColor: "#66cccc",
        fillOpacity: 0.2, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#66cccc",
        strokeOpacity: 1,
        strokeLinecap: "round",
        strokeWidth: 2,
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3

    },
    'delete': {
        display: "none"
    }
};    


/**********************************************************************************
 * 설 명 : 벡터레이어의 StyleMap 구성을 위한 정의
 * 인 자 : N/A
 * 사용법 : 각 함수별 정의. ex) NUTs.EditStyle.getSymbolizerLineString('#F26161', 'solid', 3, 1)
 * 수정일				수정자			수정내용
 * ----------------------------------------------------------------------
 * 2015.11.19			윤은희		최초 생성
 * 
 **********************************************************************************/
NUTs.EditStyle = {
		
		'_default' : {
			fillColor: '#00CCFF',
            fillOpacity: 0.5,
            strokeColor: '#00AAFF',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
		},
		
		'select' : {
			fillColor: '#DE6868',
            fillOpacity: 0.7,
            strokeColor: '#CC0000',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5	
		},
		
		'defaultLabel' : {
            fillColor: '#EC5781',
            fillOpacity: 0.8,
            strokeColor: '#E11A51',
            strokeWidth: 2,
            graphicZIndex: 11,
            pointRadius: 0,
            cursor: 'default',
            label: '${label}',
            fontColor: '#000000',
            fontSize: '11px',
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            labelAlign: 'cm',
            labelXOffset: '${xOffset}',
            labelYOffset: '${yOffset}',
            labelOutlineColor: '#FFFFFF',
            labelOutlineWidth: 4,
            labelSelect: false
		},
		
		'selectLabel' : {
            fillColor: '#fc0',
            fillOpacity: 0.8,
            strokeColor: '#f70',
            strokeWidth: 2,
            graphicZIndex: 2,
			pointRadius: 5,
            cursor: 'default',
            label: '${label}',
            fontColor: 'black',
            fontSize: '11px',
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            labelAlign: 'cm',
            labelXOffset: '${xOffset}',
            labelYOffset: '${yOffset}',
            labelOutlineColor: '#fc0',
            labelOutlineWidth: 6,
            labelSelect: true
		},
		
		/**
		 * 포인트 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerPoint : function(_oGraphic, _nSize, _nOpacity){	
			var oSymbolizer = {
				externalGraphic: 'data:image/png;base64'.concat(',', _oGraphic.replace(/\r?\n/g, '')),
				graphicWidth: parseInt(_nSize,10),
				graphicHeight: parseInt(_nSize,10),
				fillOpacity: parseFloat(_nOpacity).toFixed(2)
			  };
			
			return oSymbolizer;
		},
		getSymbolizerPointType2 : function(_oGraphic, _nSize){	
			var oSymbolizer = {
					externalGraphic: _oGraphic,
					pointRadius: parseInt(_nSize,10)
				  };
			
			return oSymbolizer;
		},
		/**
		 * 라인 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerLineString : function(_sColor, _sDashStyle, _nWidth, _nOpacity, _sLinecap, _nIndex){
			var oSymbolizer = {
				fillColor: _sColor,
				strokeColor: _sColor,
				strokeDashstyle : _sDashStyle,
				strokeWidth: parseInt(_nWidth,10),
				strokeOpacity: parseFloat(_nOpacity).toFixed(2),
				strokeLinecap: _sLinecap,
				graphicZIndex: parseInt(_nIndex,10)
			};	

			return oSymbolizer;	
		},

		/**
		 * 폴리곤 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerPolygon : function(_oPolygon){
			var oSymbolizer = {
				fillColor: _oPolygon.fillColor,
				fillOpacity: parseFloat(_oPolygon.fillOpacity).toFixed(2),
			};
			if(_oPolygon.strokeWidth) {
				$.extend(true,oSymbolizer,{
					strokeColor: _oPolygon.stroke,
					strokeDashstyle : _oPolygon.strokeDashstyle,
					strokeWidth: parseInt(_oPolygon.strokeWidth,10),
					strokeOpacity: parseFloat(_oPolygon.strokeOpacity).toFixed(2),
					strokeLinecap: _oPolygon.strokeLinecap
				});
			} else {
				oSymbolizer.stroke = false;
			}
			return oSymbolizer;	
		},

		/**
		 * 텍스트 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerText : function(_sLabel, _sColor, _nSize, _sFontFamily, _sFontWeight,_sCodeDomain){
			var oSymbolizer = {
				label : _sLabel,                    
				fontColor: _sColor,
				fontSize: parseInt(_nSize,10),
				fontFamily: _sFontFamily,
				fontWeight: _sFontWeight,
				codeDomain: _sCodeDomain
			};	

			return oSymbolizer;	
		},
		
		/**
		 * 심볼 필터 obj 리턴
		 */
		getStyleFilter : function(_sFilterType, _sProperty, _sValue){
			var oFilter = {};
			
			if (_sFilterType !== OpenLayers.Filter.Comparison.BETWEEN) {
				oFilter = new OpenLayers.Filter.Comparison({
					type: _sFilterType,
					property: _sProperty,
					value: _sValue
				  });
			}
			
			return oFilter;			
		},
		
		/**
		 * 기본 심볼 obj 리턴
		 */
		getObjectStyleMap : function(_oStyleMap){
			
			var oStyleMap = new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(
						_oStyleMap
				)
			});
			
			return oStyleMap;	
		},

		/**
		 * 룰을 포함한 심볼 obj 리턴
		 */
		getObjectStyleMapHasRules : function(_oStyleMap, _oRules){	
			var aRuleArray = [];
			var aRules = _oRules.rules;
			
			for(var i in aRules){
				aRuleArray.push(new OpenLayers.Rule(aRules[i]));
			}
			
			var oStyleMap = new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(
						_oStyleMap,
						{
							rules: aRuleArray
						})
			});

			return oStyleMap;	
		},
		
		getSymbolizerPointShape : function(_oPoint) {
			var oSymbolizer = {
					graphicName : _oPoint.graphicName,
					fillColor : _oPoint.fillColor,
					fillOpacity : parseFloat(_oPoint.fillOpacity).toFixed(2),
					pointRadius : parseInt(_oPoint.size,10)/2,
				};
			if(_oPoint.strokeWidth) {
				$.extend(true,oSymbolizer,{
					strokeWidth :parseInt( _oPoint.strokeWidth,10),
					strokeColor : _oPoint.strokeColor,
					strokeOpacity : parseFloat(_oPoint.strokeOpacity).toFixed(2)
				});
			} else {
				oSymbolizer.stroke = false;
			}
			return oSymbolizer;	
		},
		
		getSymbolizer : function(_oRule) {
			var oSymbolizer = {};
			
			if(_oRule.point) {
				var oPoint = _oRule.point;
				if(oPoint.externalGraphic) { 
					if(!oPoint.size) //ggash 20170118 for geoserver ==> 엔진 구분방식 개선 필요 & 해당 property(size / opacity)를 원래 기본 제공하지 않는 건지 확인 필요.
						$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPointType2(oPoint.externalGraphic, oPoint.pointRadius ));
					else	//base64  encode된 값 전달방식 
						$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPoint(oPoint.externalGraphic, oPoint.size, oPoint.opacity));
				} else {
					$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPointShape(oPoint));
				}
			} else if(_oRule.line) {
				var oLine = _oRule.line;
				if(!oLine.strokeOpacity) //ggash 20170118 for geoserver ==> 엔진 구분방식 개선 필요 & 해당 property(strokeWidth / strokeOpacity)를 원래 기본 제공하지 않는 건지 확인 필요.
					$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerLineString(oLine.stroke, oLine.strokeDashArray, 1, 1, oLine.strokeLinecap, 1));
				else
					$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerLineString(oLine.stroke, oLine.strokeDashArray, oLine.strokeWidth, oLine.strokeOpacity, oLine.strokeLinecap, 1));
			} else if(_oRule.polygon) {
				var oPolygon = _oRule.polygon;
				$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPolygon(oPolygon));
			}
			
			return oSymbolizer;
		}
		
};



/*=[ GeoJson.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : GeoJson.js
 * 설 명 : GeoJson 객체를 생성/관리한다.
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2016.03.25			윤은희				1.0					최초 생성
 * 
 * 
**********************************************************************************/
NUTs.GeoJson = (function($,undefined) {
	
	/**
	 * 생성된 GeoJson 객체를 담고 있는 Object
	 */
	var oGeoJson = {};
    
     /**********************************************************************************
		 * 함수명 : getGeoJson
		 * 설 명 : GeoJson 객체를 생성하기 위한 Main 함수
		 * 인 자 : _sGeomType(Geometry 타입 - Point, LineString, Polygon), _oGeometries(좌표 List Object - ex. [POINT(412164.082 229838.719),POINT(412146.581 229840.085)])
		 * 사용법 : getGeoJson(_sGeomType, _oGeometries)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
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
     

     /**********************************************************************************
		 * 함수명 : getCoordinates
		 * 설 명 : Geometry 타입별로 Coordinate 값을 리턴.
		 * 인 자 : _sGeomType(Geometry 타입 - Point, LineString, Polygon), _oGeometries(좌표 List Object - ex. [POINT(412164.082 229838.719),POINT(412146.581 229840.085)])
		 * 사용법 : getCoordinates(_sGeomType, _oGeometries)
		 * 수정일				수정자			수정내용
		 * ----------------------------------------------------------------------
		 * 2016.03.25			윤은희		최초 생성
		 * 
		 **********************************************************************************/
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
 	 * 외부 노출 함수
 	 */
     return {    	
    	 getGeoJson : getGeoJson
     }	
     
}(jQuery));




/*=[ GML.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/XML.js
 * @requires OpenLayers/Feature/Vector.js
 * @requires OpenLayers/Geometry/Point.js
 * @requires OpenLayers/Geometry/MultiPoint.js
 * @requires OpenLayers/Geometry/LineString.js
 * @requires OpenLayers/Geometry/MultiLineString.js
 * @requires OpenLayers/Geometry/Polygon.js
 * @requires OpenLayers/Geometry/MultiPolygon.js
 */

/**
 * Class: OpenLayers.Format.GML
 * Read/Write GML. Create a new instance with the <OpenLayers.Format.GML>
 *     constructor.  Supports the GML simple features profile.
 * 
 * Inherits from:
 *  - <OpenLayers.Format.XML>
 */
NUTs.Format.GML = OpenLayers.Class(OpenLayers.Format.GML, {
    
    
    /**
     * Constructor: OpenLayers.Format.GML
     * Create a new parser for GML.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        // compile regular expressions once instead of every time they are used
        this.regExes = {
            trimSpace: (/^\s*|\s*$/g),
            removeSpace: (/\s*/g),
            splitSpace: (/\s+/),
            trimComma: (/\s*,\s*/g)
        };
        OpenLayers.Format.XML.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * Method: parseFeature
     * This function is the core of the GML parsing code in OpenLayers.
     *    It creates the geometries that are then attached to the returned
     *    feature, and calls parseAttributes() to get attribute data out.
     *    
     * Parameters:
     * node - {DOMElement} A GML feature node. 
     */
    parseFeature: function(node) {
        // only accept one geometry per feature - look for highest "order"
        var order = ["MultiPolygon", "Polygon",
                     "MultiLineString", "LineString",
                     "MultiPoint", "Point", "Envelope"];
        // FIXME: In case we parse a feature with no geometry, but boundedBy an Envelope,
        // this code creates a geometry derived from the Envelope. This is not correct.
        var type, nodeList, geometry, parser;
        for(var i=0; i<order.length; ++i) {
            type = order[i];
            nodeList = this.getElementsByTagNameNS(node, this.gmlns, type);
            if(nodeList.length > 0) {
                // only deal with first geometry of this type
                parser = this.parseGeometry[type.toLowerCase()];
                if(parser) {
                    geometry = parser.apply(this, [nodeList[0]]);
                    if (this.internalProjection && this.externalProjection) {
                        geometry.transform(this.externalProjection, 
                                           this.internalProjection); 
                    }                       
                } else {
                    throw new TypeError("Unsupported geometry type: " + type);
                }
                // stop looking for different geometry types
                break;
            }
        }

        var bounds;
        var boxNodes = this.getElementsByTagNameNS(node.parentNode, this.gmlns, "Envelope");
        for(i=0; i<boxNodes.length; ++i) {
            var boxNode = boxNodes[i];
            var box = this.parseGeometry["envelope"].apply(this, [boxNode]);
            var parentNode = boxNode.parentNode;
            var parentName = parentNode.localName ||
                             parentNode.nodeName.split(":").pop();
            if(parentName === "boundedBy") {
                bounds = box;
            } else {
                geometry = box.toGeometry();
            }
        }
        
        // construct feature (optionally with attributes)
        var attributes;
        if(this.extractAttributes) {
            attributes = this.parseAttributes(node);
        }
        var feature = new OpenLayers.Feature.Vector(geometry, attributes);
        feature.bounds = bounds;
        
        feature.gml = {
            featureType: node.firstChild.nodeName.split(":")[1],
            featureNS: node.firstChild.namespaceURI,
            featureNSPrefix: node.firstChild.prefix
        };
                
        // assign fid - this can come from a "fid" or "id" attribute
        var childNode = node.firstChild;
        var fid;
        while(childNode) {
            if(childNode.nodeType == 1) {
                fid = childNode.getAttribute("fid") ||
                childNode.getAttribute("id")||
                childNode.getAttribute("gml:id");
                if(fid) {
                    break;
                }
            }
            childNode = childNode.nextSibling;
        }
        feature.fid = fid;
        return feature;
    },
    
    /**
     * Property: parseGeometry
     * Properties of this object are the functions that parse geometries based
     *     on their type.
     */
    parseGeometry: {
        
        /**
         * Method: parseGeometry.point
         * Given a GML node representing a point geometry, create an OpenLayers
         *     point geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Geometry.Point>} A point geometry.
         */
        point: function(node) {
            /**
             * Three coordinate variations to consider:
             * 1) <gml:pos>x y z</gml:pos>
             * 2) <gml:coordinates>x, y, z</gml:coordinates>
             * 3) <gml:coord><gml:X>x</gml:X><gml:Y>y</gml:Y></gml:coord>
             */
            var nodeList, coordString;
            var coords = [];

            // look for <gml:pos>
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "pos");
            if(nodeList.length > 0) {
                coordString = nodeList[0].firstChild.nodeValue;
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coords = coordString.split(this.regExes.splitSpace);
            }

            // look for <gml:coordinates>
            if(coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "coordinates");
                if(nodeList.length > 0) {
                    coordString = nodeList[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.removeSpace,
                                                      "");
                    coords = coordString.split(",");
                }
            }

            // look for <gml:coord>
            if(coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "coord");
                if(nodeList.length > 0) {
                    var xList = this.getElementsByTagNameNS(nodeList[0],
                                                            this.gmlns, "X");
                    var yList = this.getElementsByTagNameNS(nodeList[0],
                                                            this.gmlns, "Y");
                    if(xList.length > 0 && yList.length > 0) {
                        coords = [xList[0].firstChild.nodeValue,
                                  yList[0].firstChild.nodeValue];
                    }
                }
            }
                
            // preserve third dimension
            if(coords.length == 2) {
                coords[2] = null;
            }
            
            if (this.xy) {
                return new OpenLayers.Geometry.Point(coords[0], coords[1],
                                                 coords[2]);
            }
            else{
                return new OpenLayers.Geometry.Point(coords[1], coords[0],
                                                 coords[2]);
            }
        },
        
        /**
         * Method: parseGeometry.multipoint
         * Given a GML node representing a multipoint geometry, create an
         *     OpenLayers multipoint geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Geometry.MultiPoint>} A multipoint geometry.
         */
        multipoint: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "Point");
            var components = [];
            if(nodeList.length > 0) {
                var point;
                for(var i=0; i<nodeList.length; ++i) {
                    point = this.parseGeometry.point.apply(this, [nodeList[i]]);
                    if(point) {
                        components.push(point);
                    }
                }
            }
            return new OpenLayers.Geometry.MultiPoint(components);
        },
        
        /**
         * Method: parseGeometry.linestring
         * Given a GML node representing a linestring geometry, create an
         *     OpenLayers linestring geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Geometry.LineString>} A linestring geometry.
         */
        linestring: function(node, ring) {
            /**
             * Two coordinate variations to consider:
             * 1) <gml:posList dimension="d">x0 y0 z0 x1 y1 z1</gml:posList>
             * 2) <gml:coordinates>x0, y0, z0 x1, y1, z1</gml:coordinates>
             */
            var nodeList, coordString;
            var coords = [];
            var points = [];

            // look for <gml:posList>
            nodeList = this.getElementsByTagNameNS(node, this.gmlns, "posList");
            if(nodeList.length > 0) {
                coordString = this.getChildValue(nodeList[0]);
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coords = coordString.split(this.regExes.splitSpace);
                var dim = parseInt(nodeList[0].getAttribute("dimension"));
                if(!dim && node.parentNode && node.parentNode.parentNode){ //CJH 2017-03-23 for geoserver
                	var oParent = node.parentNode.parentNode;
                	
                	dim = parseInt(oParent.getAttribute("srsDimension"));
                	var maxLoopCnt  = 10;
                	var curLoopCnt = 0;
                	while(!dim){
                		if(oParent.parentNode && curLoopCnt < maxLoopCnt ){
                			oParent = oParent.parentNode;
                			dim = parseInt(oParent.getAttribute("srsDimension"));
                		}else{
                			break;
                		}
                		curLoopCnt++;
                	}
                	
                }
                var j, x, y, z;
                for(var i=0; i<coords.length/dim; ++i) {
                    j = i * dim;
                    x = coords[j];
                    y = coords[j+1];
                    z = (dim == 2) ? null : coords[j+2];
                    if (this.xy) {
                        points.push(new OpenLayers.Geometry.Point(x, y, z));
                    } else {
                        points.push(new OpenLayers.Geometry.Point(y, x, z));
                    }
                }
            }

            // look for <gml:coordinates>
            if(coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "coordinates");
                if(nodeList.length > 0) {
                    coordString = this.getChildValue(nodeList[0]);
                    coordString = coordString.replace(this.regExes.trimSpace,
                                                      "");
                    coordString = coordString.replace(this.regExes.trimComma,
                                                      ",");
                    var pointList = coordString.split(this.regExes.splitSpace);
                    for(var i=0; i<pointList.length; ++i) {
                        coords = pointList[i].split(",");
                        if(coords.length == 2) {
                            coords[2] = null;
                        }
                        if (this.xy) {
                            points.push(new OpenLayers.Geometry.Point(coords[0],
                                                                  coords[1],
                                                                  coords[2]));
                        } else {
                            points.push(new OpenLayers.Geometry.Point(coords[1],
                                                                  coords[0],
                                                                  coords[2]));
                        }
                    }
                }
            }

            var line = null;
            if(points.length != 0) {
                if(ring) {
                    line = new OpenLayers.Geometry.LinearRing(points);
                } else {
                    line = new OpenLayers.Geometry.LineString(points);
                }
            }
            return line;
        },
        
        /**
         * Method: parseGeometry.multilinestring
         * Given a GML node representing a multilinestring geometry, create an
         *     OpenLayers multilinestring geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Geometry.MultiLineString>} A multilinestring geometry.
         */
        multilinestring: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "LineString");
            var components = [];
            if(nodeList.length > 0) {
                var line;
                for(var i=0; i<nodeList.length; ++i) {
                    line = this.parseGeometry.linestring.apply(this,
                                                               [nodeList[i]]);
                    if(line) {
                        components.push(line);
                    }
                }
            }
            return new OpenLayers.Geometry.MultiLineString(components);
        },
        
        /**
         * Method: parseGeometry.polygon
         * Given a GML node representing a polygon geometry, create an
         *     OpenLayers polygon geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Geometry.Polygon>} A polygon geometry.
         */
        polygon: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "LinearRing");
            var components = [];
            if(nodeList.length > 0) {
                // this assumes exterior ring first, inner rings after
                var ring;
                for(var i=0; i<nodeList.length; ++i) {
                    ring = this.parseGeometry.linestring.apply(this,
                                                        [nodeList[i], true]);
                    if(ring) {
                        components.push(ring);
                    }
                }
            }
            return new OpenLayers.Geometry.Polygon(components);
        },
        
        /**
         * Method: parseGeometry.multipolygon
         * Given a GML node representing a multipolygon geometry, create an
         *     OpenLayers multipolygon geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Geometry.MultiPolygon>} A multipolygon geometry.
         */
        multipolygon: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "Polygon");
            var components = [];
            if(nodeList.length > 0) {
                var polygon;
                for(var i=0; i<nodeList.length; ++i) {
                    polygon = this.parseGeometry.polygon.apply(this,
                                                               [nodeList[i]]);
                    if(polygon) {
                        components.push(polygon);
                    }
                }
            }
            return new OpenLayers.Geometry.MultiPolygon(components);
        },
        
        envelope: function(node) {
            var components = [];
            var coordString;
            var envelope;
            
            var lpoint = this.getElementsByTagNameNS(node, this.gmlns, "lowerCorner");
            if (lpoint.length > 0) {
                var coords = [];
                
                if(lpoint.length > 0) {
                    coordString = lpoint[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coords = coordString.split(this.regExes.splitSpace);
                }
                
                if(coords.length == 2) {
                    coords[2] = null;
                }
                if (this.xy) {
                    var lowerPoint = new OpenLayers.Geometry.Point(coords[0], coords[1],coords[2]);
                } else {
                    var lowerPoint = new OpenLayers.Geometry.Point(coords[1], coords[0],coords[2]);
                }
            }
            
            var upoint = this.getElementsByTagNameNS(node, this.gmlns, "upperCorner");
            if (upoint.length > 0) {
                var coords = [];
                
                if(upoint.length > 0) {
                    coordString = upoint[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coords = coordString.split(this.regExes.splitSpace);
                }
                
                if(coords.length == 2) {
                    coords[2] = null;
                }
                if (this.xy) {
                    var upperPoint = new OpenLayers.Geometry.Point(coords[0], coords[1],coords[2]);
                } else {
                    var upperPoint = new OpenLayers.Geometry.Point(coords[1], coords[0],coords[2]);
                }
            }
            
            if (lowerPoint && upperPoint) {
                components.push(new OpenLayers.Geometry.Point(lowerPoint.x, lowerPoint.y));
                components.push(new OpenLayers.Geometry.Point(upperPoint.x, lowerPoint.y));
                components.push(new OpenLayers.Geometry.Point(upperPoint.x, upperPoint.y));
                components.push(new OpenLayers.Geometry.Point(lowerPoint.x, upperPoint.y));
                components.push(new OpenLayers.Geometry.Point(lowerPoint.x, lowerPoint.y));
                
                var ring = new OpenLayers.Geometry.LinearRing(components);
                envelope = new OpenLayers.Geometry.Polygon([ring]);
            }
            return envelope; 
        },

        /**
         * Method: parseGeometry.box
         * Given a GML node representing a box geometry, create an
         *     OpenLayers.Bounds.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<OpenLayers.Bounds>} A bounds representing the box.
         */
        box: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                   "coordinates");
            var coordString;
            var coords, beginPoint = null, endPoint = null;
            if (nodeList.length > 0) {
                coordString = nodeList[0].firstChild.nodeValue;
                coords = coordString.split(" ");
                if (coords.length == 2) {
                    beginPoint = coords[0].split(",");
                    endPoint = coords[1].split(",");
                }
            }
            if (beginPoint !== null && endPoint !== null) {
                return new OpenLayers.Bounds(parseFloat(beginPoint[0]),
                    parseFloat(beginPoint[1]),
                    parseFloat(endPoint[0]),
                    parseFloat(endPoint[1]) );
            }
        }
        
    },
    
    /**
     * Method: parseAttributes
     *
     * Parameters:
     * node - {DOMElement}
     *
     * Returns:
     * {Object} An attributes object.
     */
    parseAttributes: function(node) {
        var attributes = {};
        // assume attributes are children of the first type 1 child
        var childNode = node.firstChild;
        var children, i, child, grandchildren, grandchild, name, value;
        while(childNode) {
            if(childNode.nodeType == 1) {
                // attributes are type 1 children with one type 3 child
                children = childNode.childNodes;
                for(i=0; i<children.length; ++i) {
                    child = children[i];
                    if(child.nodeType == 1) {
                        grandchildren = child.childNodes;
                        if(grandchildren.length == 1) {
                            grandchild = grandchildren[0];
                            if(grandchild.nodeType == 3 ||
                               grandchild.nodeType == 4) {
                                name = (child.prefix) ?
                                        child.nodeName.split(":")[1] :
                                        child.nodeName;
                                value = grandchild.nodeValue.replace(
                                                this.regExes.trimSpace, "");
                                attributes[name] = value;
                            }
                        } else {
                            // If child has no childNodes (grandchildren),
                            // set an attribute with null value.
                            // e.g. <prefix:fieldname/> becomes
                            // {fieldname: null}
                            attributes[child.nodeName.split(":").pop()] = null;
                        }
                    }
                }
                break;
            }
            childNode = childNode.nextSibling;
        }
        return attributes;
    },
    
    /**
     * APIMethod: write
     * Generate a GML document string given a list of features. 
     * 
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>)} List of features to
     *     serialize into a string.
     *
     * Returns:
     * {String} A string representing the GML document.
     */
    write: function(features) {
        if(!(OpenLayers.Util.isArray(features))) {
            features = [features];
        }
        var gml = this.createElementNS("http://www.opengis.net/wfs",
                                       "wfs:" + this.collectionName);
        for(var i=0; i<features.length; i++) {
            gml.appendChild(this.createFeatureXML(features[i]));
        }
        return OpenLayers.Format.XML.prototype.write.apply(this, [gml]);
    },

    /** 
     * Method: createFeatureXML
     * Accept an OpenLayers.Feature.Vector, and build a GML node for it.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The feature to be built as GML.
     *
     * Returns:
     * {DOMElement} A node reprensting the feature in GML.
     */
    createFeatureXML: function(feature) {
        var geometry = feature.geometry;
        var geometryNode = this.buildGeometryNode(geometry);
        var geomContainer = this.createElementNS(this.featureNS,
                                                 this.featurePrefix + ":" +
                                                 this.geometryName);
        geomContainer.appendChild(geometryNode);
        var featureNode = this.createElementNS(this.gmlns,
                                               "gml:" + this.featureName);
        var featureContainer = this.createElementNS(this.featureNS,
                                                    this.featurePrefix + ":" +
                                                    this.layerName);
        var fid = feature.fid || feature.id;
        featureContainer.setAttribute("fid", fid);
        featureContainer.appendChild(geomContainer);
        for(var attr in feature.attributes) {
            var attrText = this.createTextNode(feature.attributes[attr]); 
            var nodename = attr.substring(attr.lastIndexOf(":") + 1);
            var attrContainer = this.createElementNS(this.featureNS,
                                                     this.featurePrefix + ":" +
                                                     nodename);
            attrContainer.appendChild(attrText);
            featureContainer.appendChild(attrContainer);
        }    
        featureNode.appendChild(featureContainer);
        return featureNode;
    },
    
    /**
     * APIMethod: buildGeometryNode
     */
    buildGeometryNode: function(geometry) {
        if (this.externalProjection && this.internalProjection) {
            geometry = geometry.clone();
            geometry.transform(this.internalProjection, 
                               this.externalProjection);
        }    
        var className = geometry.CLASS_NAME;
        var type = className.substring(className.lastIndexOf(".") + 1);
        var builder = this.buildGeometry[type.toLowerCase()];
        return builder.apply(this, [geometry]);
    },

    /**
     * Property: buildGeometry
     * Object containing methods to do the actual geometry node building
     *     based on geometry type.
     */
    buildGeometry: {
        // TBD retrieve the srs from layer
        // srsName is non-standard, so not including it until it's right.
        // gml.setAttribute("srsName",
        //                  "http://www.opengis.net/gml/srs/epsg.xml#4326");

        /**
         * Method: buildGeometry.point
         * Given an OpenLayers point geometry, create a GML point.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.Point>} A point geometry.
         *
         * Returns:
         * {DOMElement} A GML point node.
         */
        point: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:Point");
            gml.appendChild(this.buildCoordinatesNode(geometry));
            return gml;
        },
        
        /**
         * Method: buildGeometry.multipoint
         * Given an OpenLayers multipoint geometry, create a GML multipoint.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.MultiPoint>} A multipoint geometry.
         *
         * Returns:
         * {DOMElement} A GML multipoint node.
         */
        multipoint: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiPoint");
            var points = geometry.components;
            var pointMember, pointGeom;
            for(var i=0; i<points.length; i++) { 
                pointMember = this.createElementNS(this.gmlns,
                                                   "gml:pointMember");
                pointGeom = this.buildGeometry.point.apply(this,
                                                               [points[i]]);
                pointMember.appendChild(pointGeom);
                gml.appendChild(pointMember);
            }
            return gml;            
        },
        
        /**
         * Method: buildGeometry.linestring
         * Given an OpenLayers linestring geometry, create a GML linestring.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.LineString>} A linestring geometry.
         *
         * Returns:
         * {DOMElement} A GML linestring node.
         */
        linestring: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:LineString");
            gml.appendChild(this.buildCoordinatesNode(geometry));
            return gml;
        },
        
        /**
         * Method: buildGeometry.multilinestring
         * Given an OpenLayers multilinestring geometry, create a GML
         *     multilinestring.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.MultiLineString>} A multilinestring
         *     geometry.
         *
         * Returns:
         * {DOMElement} A GML multilinestring node.
         */
        multilinestring: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiLineString");
            var lines = geometry.components;
            var lineMember, lineGeom;
            for(var i=0; i<lines.length; ++i) {
                lineMember = this.createElementNS(this.gmlns,
                                                  "gml:lineStringMember");
                lineGeom = this.buildGeometry.linestring.apply(this,
                                                                   [lines[i]]);
                lineMember.appendChild(lineGeom);
                gml.appendChild(lineMember);
            }
            return gml;
        },
        
        /**
         * Method: buildGeometry.linearring
         * Given an OpenLayers linearring geometry, create a GML linearring.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.LinearRing>} A linearring geometry.
         *
         * Returns:
         * {DOMElement} A GML linearring node.
         */
        linearring: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:LinearRing");
            gml.appendChild(this.buildCoordinatesNode(geometry));
            return gml;
        },
        
        /**
         * Method: buildGeometry.polygon
         * Given an OpenLayers polygon geometry, create a GML polygon.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.Polygon>} A polygon geometry.
         *
         * Returns:
         * {DOMElement} A GML polygon node.
         */
        polygon: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:Polygon");
            var rings = geometry.components;
            var ringMember, ringGeom, type;
            for(var i=0; i<rings.length; ++i) {
                type = (i==0) ? "outerBoundaryIs" : "innerBoundaryIs";
                ringMember = this.createElementNS(this.gmlns,
                                                  "gml:" + type);
                ringGeom = this.buildGeometry.linearring.apply(this,
                                                                   [rings[i]]);
                ringMember.appendChild(ringGeom);
                gml.appendChild(ringMember);
            }
            return gml;
        },
        
        /**
         * Method: buildGeometry.multipolygon
         * Given an OpenLayers multipolygon geometry, create a GML multipolygon.
         *
         * Parameters:
         * geometry - {<OpenLayers.Geometry.MultiPolygon>} A multipolygon
         *     geometry.
         *
         * Returns:
         * {DOMElement} A GML multipolygon node.
         */
        multipolygon: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiPolygon");
            var polys = geometry.components;
            var polyMember, polyGeom;
            for(var i=0; i<polys.length; ++i) {
                polyMember = this.createElementNS(this.gmlns,
                                                  "gml:polygonMember");
                polyGeom = this.buildGeometry.polygon.apply(this,
                                                                [polys[i]]);
                polyMember.appendChild(polyGeom);
                gml.appendChild(polyMember);
            }
            return gml;

        },
 
        /**
         * Method: buildGeometry.bounds
         * Given an OpenLayers bounds, create a GML box.
         *
         * Parameters:
         * bounds - {<OpenLayers.Geometry.Bounds>} A bounds object.
         *
         * Returns:
         * {DOMElement} A GML box node.
         */
        bounds: function(bounds) {
            var gml = this.createElementNS(this.gmlns, "gml:Box");
            gml.appendChild(this.buildCoordinatesNode(bounds));
            return gml;
        }
    },

    /**
     * Method: buildCoordinates
     * builds the coordinates XmlNode
     * (code)
     * <gml:coordinates decimal="." cs="," ts=" ">...</gml:coordinates>
     * (end)
     *
     * Parameters: 
     * geometry - {<OpenLayers.Geometry>} 
     *
     * Returns:
     * {XmlNode} created xmlNode
     */
    buildCoordinatesNode: function(geometry) {
        var coordinatesNode = this.createElementNS(this.gmlns,
                                                   "gml:coordinates");
        coordinatesNode.setAttribute("decimal", ".");
        coordinatesNode.setAttribute("cs", ",");
        coordinatesNode.setAttribute("ts", " ");

        var parts = [];

        if(geometry instanceof OpenLayers.Bounds){
            parts.push(geometry.left + "," + geometry.bottom);
            parts.push(geometry.right + "," + geometry.top);
        } else {
            var points = (geometry.components) ? geometry.components : [geometry];
            for(var i=0; i<points.length; i++) {
                parts.push(points[i].x + "," + points[i].y);                
            }            
        }

        var txtNode = this.createTextNode(parts.join(" "));
        coordinatesNode.appendChild(txtNode);
        
        return coordinatesNode;
    },

    CLASS_NAME: "NUTs.Format.GML" 
});




/*=[ Base.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/XML.js
 * @requires OpenLayers/Format/GML.js
 */

/**
 * Though required in the full build, if the GML format is excluded, we set
 * the namespace here.
 */
if(!NUTs.Format.GML) {
	NUTs.Format.GML = {};
}

/**
 * Class: OpenLayers.Format.GML.Base
 * Superclass for GML parsers.
 *
 * Inherits from:
 *  - <OpenLayers.Format.XML>
 */
NUTs.Format.GML.Base = OpenLayers.Class(OpenLayers.Format.XML, {
    
    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        gml: "http://www.opengis.net/gml",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        wfs: "http://www.opengis.net/wfs" // this is a convenience for reading wfs:FeatureCollection
    },
    
    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "gml",

    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocation: null,
    
    /**
     * APIProperty: featureType
     * {Array(String) or String} The local (without prefix) feature typeName(s).
     */
    featureType: null,
    
    /**
     * APIProperty: featureNS
     * {String} The feature namespace.  Must be set in the options at
     *     construction.
     */
    featureNS: null,

    /**
     * APIProperty: geometry
     * {String} Name of geometry element.  Defaults to "geometry". If null, it
     * will be set on <read> when the first geometry is parsed.
     */
    geometryName: "geometry",

    /**
     * APIProperty: extractAttributes
     * {Boolean} Extract attributes from GML.  Default is true.
     */
    extractAttributes: true,
    
    /**
     * APIProperty: srsName
     * {String} URI for spatial reference system.  This is optional for
     *     single part geometries and mandatory for collections and multis.
     *     If set, the srsName attribute will be written for all geometries.
     *     Default is null.
     */
    srsName: null,

    /**
     * APIProperty: xy
     * {Boolean} Order of the GML coordinate true:(x,y) or false:(y,x)
     * Changing is not recommended, a new Format should be instantiated.
     */ 
    xy: true,

    /**
     * Property: geometryTypes
     * {Object} Maps OpenLayers geometry class names to GML element names.
     *     Use <setGeometryTypes> before accessing this property.
     */
    geometryTypes: null,

    /**
     * Property: singleFeatureType
     * {Boolean} True if there is only 1 featureType, and not an array
     *     of featuretypes.
     */
    singleFeatureType: null,
    
    /**
     * Property: autoConfig
     * {Boolean} Indicates if the format was configured without a <featureNS>,
     * but auto-configured <featureNS> and <featureType> during read.
     * Subclasses making use of <featureType> auto-configuration should make
     * the first call to the <readNode> method (usually in the read method)
     * with true as 3rd argument, so the auto-configured featureType can be
     * reset and the format can be reused for subsequent reads with data from
     * different featureTypes. Set to false after read if you want to keep the
     * auto-configured values.
     */

    /**
     * Property: regExes
     * Compiled regular expressions for manipulating strings.
     */
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g),
        featureMember: (/^(.*:)?featureMembers?$/)
    },

    /**
     * Constructor: OpenLayers.Format.GML.Base
     * Instances of this class are not created directly.  Use the
     *     <OpenLayers.Format.GML.v2> or <OpenLayers.Format.GML.v3> constructor
     *     instead.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     *
     * Valid options properties:
     * featureType - {Array(String) or String} Local (without prefix) feature 
     *     typeName(s) (required for write).
     * featureNS - {String} Feature namespace (required for write).
     * geometryName - {String} Geometry element name (required for write).
     */
    initialize: function(options) {
        OpenLayers.Format.XML.prototype.initialize.apply(this, [options]);
        this.setGeometryTypes();
        if(options && options.featureNS) {
            this.setNamespace("feature", options.featureNS);
        }
        this.singleFeatureType = !options || (typeof options.featureType === "string");
    },
    
    /**
     * Method: read
     *
     * Parameters:
     * data - {DOMElement} A gml:featureMember element, a gml:featureMembers
     *     element, or an element containing either of the above at any level.
     *
     * Returns:
     * {Array(<OpenLayers.Feature.Vector>)} An array of features.
     */
    read: function(data) {
        if(typeof data == "string") { 
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var features = [];
        this.readNode(data, {features: features}, true);
        if(features.length == 0) {
            // look for gml:featureMember elements
            var elements = this.getElementsByTagNameNS(
                data, this.namespaces.gml, "featureMember"
            );
            if(elements.length) {
                for(var i=0, len=elements.length; i<len; ++i) {
                    this.readNode(elements[i], {features: features}, true);
                }
            } else {
                // look for gml:featureMembers elements (this is v3, but does no harm here)
                var elements = this.getElementsByTagNameNS(
                    data, this.namespaces.gml, "featureMembers"
                );
                if(elements.length) {
                    // there can be only one
                    this.readNode(elements[0], {features: features}, true);
                }
            }
        }
        return features;
    },
    
    /**
     * Method: readNode
     * Shorthand for applying one of the named readers given the node
     *     namespace and local name.  Readers take two args (node, obj) and
     *     generally extend or modify the second.
     *
     * Parameters:
     * node - {DOMElement} The node to be read (required).
     * obj - {Object} The object to be modified (optional).
     * first - {Boolean} Should be set to true for the first node read. This
     *     is usually the readNode call in the read method. Without this being
     *     set, auto-configured properties will stick on subsequent reads.
     *
     * Returns:
     * {Object} The input object, modified (or a new one if none was provided).
     */
    readNode: function(node, obj, first) {
        // on subsequent calls of format.read(), we want to reset auto-
        // configured properties and auto-configure again.
        if (first === true && this.autoConfig === true) {
            this.featureType = null;
            delete this.namespaceAlias[this.featureNS];
            delete this.namespaces["feature"];
            this.featureNS = null;
        }
        // featureType auto-configuration
        if (!this.featureNS && (!(node.prefix in this.namespaces) &&
                node.parentNode.namespaceURI == this.namespaces["gml"] &&
                this.regExes.featureMember.test(node.parentNode.nodeName))) {
            this.featureType = node.nodeName.split(":").pop();
            this.setNamespace("feature", node.namespaceURI);
            this.featureNS = node.namespaceURI;
            this.autoConfig = true;
        }
        return OpenLayers.Format.XML.prototype.readNode.apply(this, [node, obj]);
    },
    
    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "gml": {
            "_inherit": function(node, obj, container) {
                // To be implemented by version specific parsers
            },
            "featureMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "featureMembers": function(node, obj) {
                this.readChildNodes(node, obj);                
            },
            "name": function(node, obj) {
                obj.name = this.getChildValue(node);
            },
            "boundedBy": function(node, obj) {
                var container = {};
                this.readChildNodes(node, container);
                if(container.components && container.components.length > 0) {
                    obj.bounds = container.components[0];
                }
            },
            "Point": function(node, container) {
                var obj = {points: []};
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(obj.points[0]);
            },
            "coordinates": function(node, obj) {
                var str = this.getChildValue(node).replace(
                    this.regExes.trimSpace, ""
                );
                str = str.replace(this.regExes.trimComma, ",");
                var pointList = str.split(this.regExes.splitSpace);
                var coords;
                var numPoints = pointList.length;
                var points = new Array(numPoints);
                for(var i=0; i<numPoints; ++i) {
                    coords = pointList[i].split(",");
                    if (this.xy) {
                        points[i] = new OpenLayers.Geometry.Point(
                            coords[0], coords[1], coords[2]
                        );
                    } else {
                        points[i] = new OpenLayers.Geometry.Point(
                            coords[1], coords[0], coords[2]
                        );
                    }
                }
                obj.points = points;
            },
            "coord": function(node, obj) {
                var coord = {};
                this.readChildNodes(node, coord);
                if(!obj.points) {
                    obj.points = [];
                }
                obj.points.push(new OpenLayers.Geometry.Point(
                    coord.x, coord.y, coord.z
                ));
            },
            "X": function(node, coord) {
                coord.x = this.getChildValue(node);
            },
            "Y": function(node, coord) {
                coord.y = this.getChildValue(node);
            },
            "Z": function(node, coord) {
                coord.z = this.getChildValue(node);
            },
            "MultiPoint": function(node, container) {
                var obj = {components: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                container.components = [
                    new OpenLayers.Geometry.MultiPoint(obj.components)
                ];
            },
            "pointMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "LineString": function(node, container) {
                var obj = {};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(
                    new OpenLayers.Geometry.LineString(obj.points)
                );
            },
            "MultiLineString": function(node, container) {
                var obj = {components: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                container.components = [
                    new OpenLayers.Geometry.MultiLineString(obj.components)
                ];
            },
            "lineStringMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Polygon": function(node, container) {
                var obj = {outer: null, inner: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                obj.inner.unshift(obj.outer);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(
                    new OpenLayers.Geometry.Polygon(obj.inner)
                );
            },
            "LinearRing": function(node, obj) {
                var container = {};
                this.readers.gml._inherit.apply(this, [node, container]);
                this.readChildNodes(node, container);
                obj.components = [new OpenLayers.Geometry.LinearRing(
                    container.points
                )];
            },
            "MultiPolygon": function(node, container) {
                var obj = {components: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                container.components = [
                    new OpenLayers.Geometry.MultiPolygon(obj.components)
                ];
            },
            "polygonMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "GeometryCollection": function(node, container) {
                var obj = {components: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                container.components = [
                    new OpenLayers.Geometry.Collection(obj.components)
                ];
            },
            "geometryMember": function(node, obj) {
                this.readChildNodes(node, obj);
            }
        },
        "feature": {
            "*": function(node, obj) {
                // The node can either be named like the featureType, or it
                // can be a child of the feature:featureType.  Children can be
                // geometry or attributes.
                var name;
                var local = node.localName || node.nodeName.split(":").pop();
                // Since an attribute can have the same name as the feature type
                // we only want to read the node as a feature if the parent
                // node can have feature nodes as children.  In this case, the
                // obj.features property is set.
                if (obj.features) {
                    if (!this.singleFeatureType &&
                        (OpenLayers.Util.indexOf(this.featureType, local) !== -1)) {
                        name = "_typeName";
                    } else if(local === this.featureType) {
                        name = "_typeName";
                    }
                } else {
                    // Assume attribute elements have one child node and that the child
                    // is a text node.  Otherwise assume it is a geometry node.
                    if(node.childNodes.length == 0 ||
                       (node.childNodes.length == 1 && node.firstChild.nodeType == 3)) {
                        if(this.extractAttributes) {
                            name = "_attribute";
                        }
                    } else {
                        name = "_geometry";
                    }
                }
                if(name) {
                    this.readers.feature[name].apply(this, [node, obj]);
                }
            },
            "_typeName": function(node, obj) {
                var container = {components: [], attributes: {}};
                this.readChildNodes(node, container);
                // look for common gml namespaced elements
                if(container.name) {
                    container.attributes.name = container.name;
                }
                var feature = new OpenLayers.Feature.Vector(
                    container.components[0], container.attributes
                );
                if (!this.singleFeatureType) {
                    feature.type = node.nodeName.split(":").pop();
                    feature.namespace = node.namespaceURI;
                }
                var fid = node.getAttribute("fid") ||
                    this.getAttributeNS(node, this.namespaces["gml"], "id");
                if(fid) {
                    feature.fid = fid;
                }
                if(this.internalProjection && this.externalProjection &&
                   feature.geometry) {
                    feature.geometry.transform(
                        this.externalProjection, this.internalProjection
                    );
                }
                if(container.bounds) {
                    feature.bounds = container.bounds;
                }
                obj.features.push(feature);
            },
            "_geometry": function(node, obj) {
                if (!this.geometryName) {
                    this.geometryName = node.nodeName.split(":").pop();
                }
                this.readChildNodes(node, obj);
            },
            "_attribute": function(node, obj) {
                var local = node.localName || node.nodeName.split(":").pop();
                var value = this.getChildValue(node);
                obj.attributes[local] = value;
            }
        },
        "wfs": {
            "FeatureCollection": function(node, obj) {
                this.readChildNodes(node, obj);
            }
        }
    },
    
    /**
     * Method: write
     *
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>) | OpenLayers.Feature.Vector}
     *     An array of features or a single feature.
     *
     * Returns:
     * {String} Given an array of features, a doc with a gml:featureMembers
     *     element will be returned.  Given a single feature, a doc with a
     *     gml:featureMember element will be returned.
     */
    write: function(features) {
        var name;
        if(OpenLayers.Util.isArray(features)) {
            name = "featureMembers";
        } else {
            name = "featureMember";
        }
        var root = this.writeNode("gml:" + name, features);
        this.setAttributeNS(
            root, this.namespaces["xsi"],
            "xsi:schemaLocation", this.schemaLocation
        );

        return OpenLayers.Format.XML.prototype.write.apply(this, [root]);
    },
    
    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "gml": {
            "featureMember": function(feature) {
                var node = this.createElementNSPlus("gml:featureMember");
                this.writeNode("feature:_typeName", feature, node);
                return node;
            },
            "MultiPoint": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiPoint");
                var components = geometry.components || [geometry];
                for(var i=0, ii=components.length; i<ii; ++i) {
                    this.writeNode("pointMember", components[i], node);
                }
                return node;
            },
            "pointMember": function(geometry) {
                var node = this.createElementNSPlus("gml:pointMember");
                this.writeNode("Point", geometry, node);
                return node;
            },
            "MultiLineString": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiLineString");
                var components = geometry.components || [geometry];
                for(var i=0, ii=components.length; i<ii; ++i) {
                    this.writeNode("lineStringMember", components[i], node);
                }
                return node;
            },
            "lineStringMember": function(geometry) {
                var node = this.createElementNSPlus("gml:lineStringMember");
                this.writeNode("LineString", geometry, node);
                return node;
            },
            "MultiPolygon": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiPolygon");
                var components = geometry.components || [geometry];
                for(var i=0, ii=components.length; i<ii; ++i) {
                    this.writeNode(
                        "polygonMember", components[i], node
                    );
                }
                return node;
            },
            "polygonMember": function(geometry) {
                var node = this.createElementNSPlus("gml:polygonMember");
                this.writeNode("Polygon", geometry, node);
                return node;
            },
            "GeometryCollection": function(geometry) {
                var node = this.createElementNSPlus("gml:GeometryCollection");
                for(var i=0, len=geometry.components.length; i<len; ++i) {
                    this.writeNode("geometryMember", geometry.components[i], node);
                }
                return node;
            },
            "geometryMember": function(geometry) {
                var node = this.createElementNSPlus("gml:geometryMember");
                var child = this.writeNode("feature:_geometry", geometry);
                node.appendChild(child.firstChild);
                return node;
            }
        },
        "feature": {
            "_typeName": function(feature) {
                var node = this.createElementNSPlus("feature:" + this.featureType, {
                    attributes: {fid: feature.fid}
                });
                if(feature.geometry) {
                    this.writeNode("feature:_geometry", feature.geometry, node);
                }
                for(var name in feature.attributes) {
                    var value = feature.attributes[name];
                    if(value != null) {
                        this.writeNode(
                            "feature:_attribute",
                            {name: name, value: value}, node
                        );
                    }
                }
                return node;
            },
            "_geometry": function(geometry) {
                if(this.externalProjection && this.internalProjection) {
                    geometry = geometry.clone().transform(
                        this.internalProjection, this.externalProjection
                    );
                }    
                var node = this.createElementNSPlus(
                    "feature:" + this.geometryName
                );
                var type = this.geometryTypes[geometry.CLASS_NAME];
                var child = this.writeNode("gml:" + type, geometry, node);
                if(this.srsName) {
                    child.setAttribute("srsName", this.srsName);
                }
                return node;
            },
            "_attribute": function(obj) {
                return this.createElementNSPlus("feature:" + obj.name, {
                    value: obj.value
                });
            }
        },
        "wfs": {
            "FeatureCollection": function(features) {
                /**
                 * This is only here because GML2 only describes abstract
                 * feature collections.  Typically, you would not be using
                 * the GML format to write wfs elements.  This just provides
                 * some way to write out lists of features.  GML3 defines the
                 * featureMembers element, so that is used by default instead.
                 */
                var node = this.createElementNSPlus("wfs:FeatureCollection");
                for(var i=0, len=features.length; i<len; ++i) {
                    this.writeNode("gml:featureMember", features[i], node);
                }
                return node;
            }
        }
    },
    
    /**
     * Method: setGeometryTypes
     * Sets the <geometryTypes> mapping.
     */
    setGeometryTypes: function() {
        this.geometryTypes = {
            "OpenLayers.Geometry.Point": "Point",
            "OpenLayers.Geometry.MultiPoint": "MultiPoint",
            "OpenLayers.Geometry.LineString": "LineString",
            "OpenLayers.Geometry.MultiLineString": "MultiLineString",
            "OpenLayers.Geometry.Polygon": "Polygon",
            "OpenLayers.Geometry.MultiPolygon": "MultiPolygon",
            "OpenLayers.Geometry.Collection": "GeometryCollection"
        };
    },

    CLASS_NAME: "NUTs.Format.GML.Base" 

});




/*=[ v2.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/GML/Base.js
 */

/**
 * Class: OpenLayers.Format.GML.v2
 * Parses GML version 2.
 *
 * Inherits from:
 *  - <OpenLayers.Format.GML.Base>
 */
NUTs.Format.GML.v2 = OpenLayers.Class(NUTs.Format.GML.Base, {
    
    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd",

    /**
     * Constructor: OpenLayers.Format.GML.v2
     * Create a parser for GML v2.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     *
     * Valid options properties:
     * featureType - {String} Local (without prefix) feature typeName (required).
     * featureNS - {String} Feature namespace (required).
     * geometryName - {String} Geometry element name.
     */
    initialize: function(options) {
        OpenLayers.Format.GML.Base.prototype.initialize.apply(this, [options]);
    },

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "gml": OpenLayers.Util.applyDefaults({
            "outerBoundaryIs": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.outer = obj.components[0];
            },
            "innerBoundaryIs": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.inner.push(obj.components[0]);
            },
            "Box": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                var min = obj.points[0];
                var max = obj.points[1];
                container.components.push(
                    new OpenLayers.Bounds(min.x, min.y, max.x, max.y)
                );
            }
        }, OpenLayers.Format.GML.Base.prototype.readers["gml"]),
        "feature": OpenLayers.Format.GML.Base.prototype.readers["feature"],
        "wfs": OpenLayers.Format.GML.Base.prototype.readers["wfs"]
    },

    /**
     * Method: write
     *
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>) | OpenLayers.Feature.Vector}
     *     An array of features or a single feature.
     *
     * Returns:
     * {String} Given an array of features, a doc with a gml:featureMembers
     *     element will be returned.  Given a single feature, a doc with a
     *     gml:featureMember element will be returned.
     */
    write: function(features) {
        var name;
        if(OpenLayers.Util.isArray(features)) {
            // GML2 only has abstract feature collections
            // wfs provides a feature collection from a well-known schema
            name = "wfs:FeatureCollection";
        } else {
            name = "gml:featureMember";
        }
        var root = this.writeNode(name, features);
        this.setAttributeNS(
            root, this.namespaces["xsi"],
            "xsi:schemaLocation", this.schemaLocation
        );

        return OpenLayers.Format.XML.prototype.write.apply(this, [root]);
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "gml": OpenLayers.Util.applyDefaults({
            "Point": function(geometry) {
                var node = this.createElementNSPlus("gml:Point");
                this.writeNode("coordinates", [geometry], node);
                return node;
            },
            "coordinates": function(points) {
                var numPoints = points.length;
                var parts = new Array(numPoints);
                var point;
                for(var i=0; i<numPoints; ++i) {
                    point = points[i];
                    if(this.xy) {
                        parts[i] = point.x + "," + point.y;
                    } else {
                        parts[i] = point.y + "," + point.x;
                    }
                    if(point.z != undefined) { // allow null or undefined
                        parts[i] += "," + point.z;
                    }
                }
                return this.createElementNSPlus("gml:coordinates", {
                    attributes: {
                        decimal: ".", cs: ",", ts: " "
                    },
                    value: (numPoints == 1) ? parts[0] : parts.join(" ")
                });
            },
            "LineString": function(geometry) {
                var node = this.createElementNSPlus("gml:LineString");
                this.writeNode("coordinates", geometry.components, node);
                return node;
            },
            "Polygon": function(geometry) {
                var node = this.createElementNSPlus("gml:Polygon");
                this.writeNode("outerBoundaryIs", geometry.components[0], node);
                for(var i=1; i<geometry.components.length; ++i) {
                    this.writeNode(
                        "innerBoundaryIs", geometry.components[i], node
                    );
                }
                return node;
            },
            "outerBoundaryIs": function(ring) {
                var node = this.createElementNSPlus("gml:outerBoundaryIs");
                this.writeNode("LinearRing", ring, node);
                return node;
            },
            "innerBoundaryIs": function(ring) {
                var node = this.createElementNSPlus("gml:innerBoundaryIs");
                this.writeNode("LinearRing", ring, node);
                return node;
            },
            "LinearRing": function(ring) {
                var node = this.createElementNSPlus("gml:LinearRing");
                this.writeNode("coordinates", ring.components, node);
                return node;
            },
            "Box": function(bounds) {
                var node = this.createElementNSPlus("gml:Box");
                this.writeNode("coordinates", [
                    {x: bounds.left, y: bounds.bottom},
                    {x: bounds.right, y: bounds.top}
                ], node);
                // srsName attribute is optional for gml:Box
                if(this.srsName) {
                    node.setAttribute("srsName", this.srsName);
                }
                return node;
            }
        }, OpenLayers.Format.GML.Base.prototype.writers["gml"]),
        "feature": OpenLayers.Format.GML.Base.prototype.writers["feature"],
        "wfs": OpenLayers.Format.GML.Base.prototype.writers["wfs"]
    },
    
    CLASS_NAME: "NUTs.Format.GML.v2" 

});




/*=[ v3.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/GML/Base.js
 */

/**
 * Class: OpenLayers.Format.GML.v3
 * Parses GML version 3.
 *
 * Inherits from:
 *  - <OpenLayers.Format.GML.Base>
 */
NUTs.Format.GML.v3 = OpenLayers.Class(NUTs.Format.GML.Base, {
    
    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.  The writers
     *     conform with the Simple Features Profile for GML.
     */
    schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd",

    /**
     * Property: curve
     * {Boolean} Write gml:Curve instead of gml:LineString elements.  This also
     *     affects the elements in multi-part geometries.  Default is false.
     *     To write gml:Curve elements instead of gml:LineString, set curve
     *     to true in the options to the contstructor (cannot be changed after
     *     instantiation).
     */
    curve: false,
    
    /**
     * Property: multiCurve
     * {Boolean} Write gml:MultiCurve instead of gml:MultiLineString.  Since
     *     the latter is deprecated in GML 3, the default is true.  To write
     *     gml:MultiLineString instead of gml:MultiCurve, set multiCurve to
     *     false in the options to the constructor (cannot be changed after
     *     instantiation).
     */
    multiCurve: true,
    
    /**
     * Property: surface
     * {Boolean} Write gml:Surface instead of gml:Polygon elements.  This also
     *     affects the elements in multi-part geometries.  Default is false.
     *     To write gml:Surface elements instead of gml:Polygon, set surface
     *     to true in the options to the contstructor (cannot be changed after
     *     instantiation).
     */
    surface: false,

    /**
     * Property: multiSurface
     * {Boolean} Write gml:multiSurface instead of gml:MultiPolygon.  Since
     *     the latter is deprecated in GML 3, the default is true.  To write
     *     gml:MultiPolygon instead of gml:multiSurface, set multiSurface to
     *     false in the options to the constructor (cannot be changed after
     *     instantiation).
     */
    multiSurface: true,

    /**
     * Constructor: OpenLayers.Format.GML.v3
     * Create a parser for GML v3.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     *
     * Valid options properties:
     * featureType - {String} Local (without prefix) feature typeName (required).
     * featureNS - {String} Feature namespace (required).
     * geometryName - {String} Geometry element name.
     */
    initialize: function(options) {
        OpenLayers.Format.GML.Base.prototype.initialize.apply(this, [options]);
    },

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "gml": OpenLayers.Util.applyDefaults({
            "_inherit": function(node, obj, container) {
                // SRSReferenceGroup attributes
                var dim = parseInt(node.getAttribute("srsDimension"), 10) ||
                    (container && container.srsDimension);
                if (dim) {
                    obj.srsDimension = dim;
                }
            },
            "featureMembers": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Curve": function(node, container) {
                var obj = {points: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(
                    new OpenLayers.Geometry.LineString(obj.points)
                );
            },
            "segments": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "LineStringSegment": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                if(obj.points) {
                    Array.prototype.push.apply(container.points, obj.points);
                }
            },
            "pos": function(node, obj) {
                var str = this.getChildValue(node).replace(
                    this.regExes.trimSpace, ""
                );
                var coords = str.split(this.regExes.splitSpace);
                var point;
                if(this.xy) {
                    point = new OpenLayers.Geometry.Point(
                        coords[0], coords[1], coords[2]
                    );
                } else {
                    point = new OpenLayers.Geometry.Point(
                        coords[1], coords[0], coords[2]
                    );
                }
                obj.points = [point];
            },
            "posList": function(node, obj) {
                var str = this.getChildValue(node).replace(
                    this.regExes.trimSpace, ""
                );
                var coords = str.split(this.regExes.splitSpace);
                // The "dimension" attribute is from the GML 3.0.1 spec.
                var dim = obj.srsDimension ||
                    parseInt(node.getAttribute("srsDimension") || node.getAttribute("dimension"), 10) || 2;
                var j, x, y, z;
                var numPoints = coords.length / dim;
                var points = new Array(numPoints);
                for(var i=0, len=coords.length; i<len; i += dim) {
                    x = coords[i];
                    y = coords[i+1];
                    z = (dim == 2) ? undefined : coords[i+2];
                    if (this.xy) {
                        points[i/dim] = new OpenLayers.Geometry.Point(x, y, z);
                    } else {
                        points[i/dim] = new OpenLayers.Geometry.Point(y, x, z);
                    }
                }
                obj.points = points;
            },
            "Surface": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "patches": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "PolygonPatch": function(node, obj) {
                this.readers.gml.Polygon.apply(this, [node, obj]);
            },
            "exterior": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.outer = obj.components[0];
            },
            "interior": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.inner.push(obj.components[0]);
            },
            "MultiCurve": function(node, container) {
                var obj = {components: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                if(obj.components.length > 0) {
                    container.components = [
                        new OpenLayers.Geometry.MultiLineString(obj.components)
                    ];
                }
            },
            "curveMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "MultiSurface": function(node, container) {
                var obj = {components: []};
                this.readers.gml._inherit.apply(this, [node, obj, container]);
                this.readChildNodes(node, obj);
                if(obj.components.length > 0) {
                    container.components = [
                        new OpenLayers.Geometry.MultiPolygon(obj.components)
                    ];
                }
            },
            "surfaceMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "surfaceMembers": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "pointMembers": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "lineStringMembers": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "polygonMembers": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "geometryMembers": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Envelope": function(node, container) {
                var obj = {points: new Array(2)};
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                var min = obj.points[0];
                var max = obj.points[1];
                container.components.push(
                    new OpenLayers.Bounds(min.x, min.y, max.x, max.y)
                );
            },
            "lowerCorner": function(node, container) {
                var obj = {};
                this.readers.gml.pos.apply(this, [node, obj]);
                container.points[0] = obj.points[0];
            },
            "upperCorner": function(node, container) {
                var obj = {};
                this.readers.gml.pos.apply(this, [node, obj]);
                container.points[1] = obj.points[0];
            }
        }, OpenLayers.Format.GML.Base.prototype.readers["gml"]),            
        "feature": OpenLayers.Format.GML.Base.prototype.readers["feature"],
        "wfs": OpenLayers.Format.GML.Base.prototype.readers["wfs"]
    },
    
    /**
     * Method: write
     *
     * Parameters:
     * features - {Array(<OpenLayers.Feature.Vector>) | OpenLayers.Feature.Vector}
     *     An array of features or a single feature.
     *
     * Returns:
     * {String} Given an array of features, a doc with a gml:featureMembers
     *     element will be returned.  Given a single feature, a doc with a
     *     gml:featureMember element will be returned.
     */
    write: function(features) {
        var name;
        if(OpenLayers.Util.isArray(features)) {
            name = "featureMembers";
        } else {
            name = "featureMember";
        }
        var root = this.writeNode("gml:" + name, features);
        this.setAttributeNS(
            root, this.namespaces["xsi"],
            "xsi:schemaLocation", this.schemaLocation
        );

        return OpenLayers.Format.XML.prototype.write.apply(this, [root]);
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "gml": OpenLayers.Util.applyDefaults({
            "featureMembers": function(features) {
                var node = this.createElementNSPlus("gml:featureMembers");
                for(var i=0, len=features.length; i<len; ++i) {
                    this.writeNode("feature:_typeName", features[i], node);
                }
                return node;
            },
            "Point": function(geometry) {
                var node = this.createElementNSPlus("gml:Point");
                this.writeNode("pos", geometry, node);
                return node;
            },
            "pos": function(point) {
                // only 2d for simple features profile
                var pos = (this.xy) ?
                    (point.x + " " + point.y) : (point.y + " " + point.x);
                return this.createElementNSPlus("gml:pos", {
                    value: pos
                });
            },
            "LineString": function(geometry) {
                var node = this.createElementNSPlus("gml:LineString");
                this.writeNode("posList", geometry.components, node);
                return node;
            },
            "Curve": function(geometry) {
                var node = this.createElementNSPlus("gml:Curve");
                this.writeNode("segments", geometry, node);
                return node;
            },
            "segments": function(geometry) {
                var node = this.createElementNSPlus("gml:segments");
                this.writeNode("LineStringSegment", geometry, node);
                return node;
            },
            "LineStringSegment": function(geometry) {
                var node = this.createElementNSPlus("gml:LineStringSegment");
                this.writeNode("posList", geometry.components, node);
                return node;
            },
            "posList": function(points) {
                // only 2d for simple features profile
                var len = points.length;
                var parts = new Array(len);
                var point;
                for(var i=0; i<len; ++i) {
                    point = points[i];
                    if(this.xy) {
                        parts[i] = point.x + " " + point.y;
                    } else {
                        parts[i] = point.y + " " + point.x;
                    }
                }
                return this.createElementNSPlus("gml:posList", {
                    value: parts.join(" ")
                }); 
            },
            "Surface": function(geometry) {
                var node = this.createElementNSPlus("gml:Surface");
                this.writeNode("patches", geometry, node);
                return node;
            },
            "patches": function(geometry) {
                var node = this.createElementNSPlus("gml:patches");
                this.writeNode("PolygonPatch", geometry, node);
                return node;
            },
            "PolygonPatch": function(geometry) {
                var node = this.createElementNSPlus("gml:PolygonPatch", {
                    attributes: {interpolation: "planar"}
                });
                this.writeNode("exterior", geometry.components[0], node);
                for(var i=1, len=geometry.components.length; i<len; ++i) {
                    this.writeNode(
                        "interior", geometry.components[i], node
                    );
                }
                return node;
            },
            "Polygon": function(geometry) {
                var node = this.createElementNSPlus("gml:Polygon");
                this.writeNode("exterior", geometry.components[0], node);
                for(var i=1, len=geometry.components.length; i<len; ++i) {
                    this.writeNode(
                        "interior", geometry.components[i], node
                    );
                }
                return node;
            },
            "exterior": function(ring) {
                var node = this.createElementNSPlus("gml:exterior");
                this.writeNode("LinearRing", ring, node);
                return node;
            },
            "interior": function(ring) {
                var node = this.createElementNSPlus("gml:interior");
                this.writeNode("LinearRing", ring, node);
                return node;
            },
            "LinearRing": function(ring) {
                var node = this.createElementNSPlus("gml:LinearRing");
                this.writeNode("posList", ring.components, node);
                return node;
            },
            "MultiCurve": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiCurve");
                var components = geometry.components || [geometry];
                for(var i=0, len=components.length; i<len; ++i) {
                    this.writeNode("curveMember", components[i], node);
                }
                return node;
            },
            "curveMember": function(geometry) {
                var node = this.createElementNSPlus("gml:curveMember");
                if(this.curve) {
                    this.writeNode("Curve", geometry, node);
                } else {
                    this.writeNode("LineString", geometry, node);
                }
                return node;
            },
            "MultiSurface": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiSurface");
                var components = geometry.components || [geometry];
                for(var i=0, len=components.length; i<len; ++i) {
                    this.writeNode("surfaceMember", components[i], node);
                }
                return node;
            },
            "surfaceMember": function(polygon) {
                var node = this.createElementNSPlus("gml:surfaceMember");
                if(this.surface) {
                    this.writeNode("Surface", polygon, node);
                } else {
                    this.writeNode("Polygon", polygon, node);
                }
                return node;
            },
            "Envelope": function(bounds) {
                var node = this.createElementNSPlus("gml:Envelope");
                this.writeNode("lowerCorner", bounds, node);
                this.writeNode("upperCorner", bounds, node);
                // srsName attribute is required for gml:Envelope
                if(this.srsName) {
                    node.setAttribute("srsName", this.srsName);
                }
                return node;
            },
            "lowerCorner": function(bounds) {
                // only 2d for simple features profile
                var pos = (this.xy) ?
                    (bounds.left + " " + bounds.bottom) :
                    (bounds.bottom + " " + bounds.left);
                return this.createElementNSPlus("gml:lowerCorner", {
                    value: pos
                });
            },
            "upperCorner": function(bounds) {
                // only 2d for simple features profile
                var pos = (this.xy) ?
                    (bounds.right + " " + bounds.top) :
                    (bounds.top + " " + bounds.right);
                return this.createElementNSPlus("gml:upperCorner", {
                    value: pos
                });
            }
        }, OpenLayers.Format.GML.Base.prototype.writers["gml"]),
        "feature": OpenLayers.Format.GML.Base.prototype.writers["feature"],
        "wfs": OpenLayers.Format.GML.Base.prototype.writers["wfs"]
    },

    /**
     * Method: setGeometryTypes
     * Sets the <geometryTypes> mapping.
     */
    setGeometryTypes: function() {
        this.geometryTypes = {
            "OpenLayers.Geometry.Point": "Point",
            "OpenLayers.Geometry.MultiPoint": "MultiPoint",
            "OpenLayers.Geometry.LineString": (this.curve === true) ? "Curve": "LineString",
            "OpenLayers.Geometry.MultiLineString": (this.multiCurve === false) ? "MultiLineString" : "MultiCurve",
            "OpenLayers.Geometry.Polygon": (this.surface === true) ? "Surface" : "Polygon",
            "OpenLayers.Geometry.MultiPolygon": (this.multiSurface === false) ? "MultiPolygon" : "MultiSurface",
            "OpenLayers.Geometry.Collection": "GeometryCollection"
        };
    },
    
    CLASS_NAME: "NUTs.Format.GML.v3" 

});




/*=[ v1.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Rule.js
 * @requires OpenLayers/Format/SLD.js
 * @requires OpenLayers/Format/Filter/v1_0_0.js
 * @requires OpenLayers/Symbolizer/Point.js
 * @requires OpenLayers/Symbolizer/Line.js
 * @requires OpenLayers/Symbolizer/Polygon.js
 * @requires OpenLayers/Symbolizer/Text.js
 * @requires OpenLayers/Symbolizer/Raster.js
 */

/**
 * Class: OpenLayers.Format.SLD.v1
 * Superclass for SLD version 1 parsers.
 *
 * Inherits from:
 *  - <OpenLayers.Format.Filter.v1_0_0>
 */
NUTs.Format.SLD.v1 = OpenLayers.Class(OpenLayers.Format.SLD.v1, {
    
    writers: OpenLayers.Util.applyDefaults({
        "sld": {            
            "PointSymbolizer": function(symbolizer) {
                var node = this.createElementNSPlus("sld:PointSymbolizer");
                this.writeNode("Graphic", symbolizer, node);
                return node;
            },
            "Graphic": function(symbolizer) {
                var node = this.createElementNSPlus("sld:Graphic");
                if(symbolizer.externalGraphic != undefined) {
                    this.writeNode("ExternalGraphic", symbolizer, node);
                } else {
                    this.writeNode("Mark", symbolizer, node);
                }
                
                if(symbolizer.graphicOpacity != undefined) {
                    this.writeNode("Opacity", symbolizer.graphicOpacity, node);
                }
                // CJH. 2017.03.17 : SLDv_1_1_0을 지원하는 엔진과 동일한 UI로 처리하기 위한..처리 <--원래는 pointSize는 v1에는 없음.
                if(symbolizer.pointSize != undefined) {
                    this.writeNode("Size", symbolizer.pointSize, node);
                }else if(symbolizer.pointRadius != undefined) {
                    this.writeNode("Size", symbolizer.pointRadius * 2, node);
                } else if (symbolizer.graphicWidth != undefined) {
                    this.writeNode("Size", symbolizer.graphicWidth, node);
                }
                if(symbolizer.rotation != undefined) {
                    this.writeNode("Rotation", symbolizer.rotation, node);
                }
                return node;
            },
            "ExternalGraphic": function(symbolizer) {
                var node = this.createElementNSPlus("sld:ExternalGraphic");
                this.writeNode(
                    "OnlineResource", symbolizer.externalGraphic, node
                );
                var format = symbolizer.graphicFormat ||
                             this.getGraphicFormat(symbolizer.externalGraphic);
                this.writeNode("Format", format, node);
                return node;
            },
            "Mark": function(symbolizer) {
                var node = this.createElementNSPlus("sld:Mark");
                if(symbolizer.graphicName) {
                    this.writeNode("WellKnownName", symbolizer.graphicName, node);
                }
                if (symbolizer.fill !== false) {
                    this.writeNode("Fill", symbolizer, node);
                }
                if (symbolizer.stroke !== false) {
                    this.writeNode("Stroke", symbolizer, node);
                }
                return node;
            },
            "WellKnownName": function(name) {
                return this.createElementNSPlus("sld:WellKnownName", {
                    value: name
                });
            },
            "Opacity": function(value) {
                return this.createElementNSPlus("sld:Opacity", {
                    value: value
                });
            },
            "Size": function(value) {
                return this.writers.sld._OGCExpression.call(
                    this, "sld:Size", value
                );
            },
            "Rotation": function(value) {
                return this.createElementNSPlus("sld:Rotation", {
                    value: value
                });
            },
            "OnlineResource": function(href) {
                return this.createElementNSPlus("sld:OnlineResource", {
                    attributes: {
                        "xlink:type": "simple",
                        "xlink:href": href
                    }
                });
            },
            "Format": function(format) {
                return this.createElementNSPlus("sld:Format", {
                    value: format
                });
            }
        }
    }, OpenLayers.Format.Filter.v1_0_0.prototype.writers),
    
    CLASS_NAME: "OpenLayers.Format.SLD.v1" 

});




/*=[ v1_1.js ]==========================================================================*/

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Rule.js
 * @requires OpenLayers/Format/SLD.js
 * @requires OpenLayers/Format/Filter/v1_1_0.js
 */

/**
 * Class: OpenLayers.Format.SLD.v1
 * Superclass for SLD version 1 parsers.
 *
 * Inherits from:
 *  - <OpenLayers.Format.Filter.v1_1_0>
 */

NUTs.Format.SLD.v1_1 = OpenLayers.Class(OpenLayers.Format.Filter.v1_1_0, {
    
    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {	
        sld: "http://www.opengis.net/sld",
    	se:"http://www.opengis.net/se",
        ogc: "http://www.opengis.net/ogc",
        gml: "http://www.opengis.net/gml",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        version : "1.1.0"
    },    
       
    /**
     * Property: defaultPrefix 
     * se 로 해야하나?
     */
    defaultPrefix: "se", 

    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocation: null,

    /**
     * APIProperty: defaultSymbolizer.
     * {Object} A symbolizer with the SLD defaults.
     */
    defaultSymbolizer: {
        fillColor: "#808080",
        fillOpacity: 1,
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeDashstyle: "solid",
        pointRadius: 3,
        graphicName: "square"
    },
    
    /**
     * Constructor: OpenLayers.Format.SLD.v1_1
     * Instances of this class are not created directly.  Use the
     *     <OpenLayers.Format.SLD> constructor instead.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        OpenLayers.Format.Filter.v1_1_0.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * Method: read
     *
     * Parameters:
     * data - {DOMElement} An SLD document element.
     * options - {Object} Options for the reader.
     *
     * Valid options:
     * namedLayersAsArray - {Boolean}  Generate a namedLayers array.  If false,
     *     the namedLayers property value will be an object keyed by layer name.
     *     Default is false.
     *
     * Returns:
     * {Object} An object representing the SLD.
     */
    read: function(data, options) {
        options = OpenLayers.Util.applyDefaults(options, this.options);
        //options.namedLayersAsArray = true; // 수정 
       // alert("options" +options.namedLayersAsArray);
        var sld = {
        		 namedLayers: options.namedLayersAsArray === true ? [] : {}
        };        
        this.readChildNodes(data, sld);
        return sld;
    },
    
    /**
	* Method: readOgcExpression
	* Limited support for OGC expressions.
	*
	* Parameters:
	* node - {DOMElement} A DOM element that contains an ogc:expression.
	*
	* Returns:
	* {String} A value to be used in a symbolizer.
	*/
    readOgcExpression: function(node) {
       var obj = {};
       this.readChildNodes(node, obj);
       var value = obj.value;
       if(value === undefined) {
           value = this.getChildValue(node);
       }
       return value;
   },
    
       
    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: OpenLayers.Util.applyDefaults(	{
        "sld": {
            "StyledLayerDescriptor": function(node, sld) {
                sld.version = node.getAttribute("version");
                this.readChildNodes(node, sld);
                
            },          
            "NamedLayer": function(node, sld) {            	 
            	//alert("V1.1");
            	var layer = {
                    userStyles: [],
                    namedStyles:[]
                };     
            	
                this.readChildNodes(node, layer);
                // give each of the user styles this layer name
                for(var i=0, len=layer.userStyles.length; i<len; ++i) {
                    layer.userStyles[i].layerName = layer.name;
                }
                if(sld.namedLayers instanceof Array) {                 
                	sld.namedLayers.push(layer);                
                } else {
                    sld.namedLayers[layer.name] = layer;
                }             
               
                    
            },            
            "NamedStyle": function(node, layer) {
                layer.namedStyles.push(
                    this.getChildName(node.firstChild)
                );
            },
            "UserStyle": function(node, layer) {
                var obj = {defaultsPerSymbolizer: true, rules: []};
                this.readChildNodes(node, obj);
                var style = new OpenLayers.Style(this.defaultSymbolizer, obj);
                layer.userStyles.push(style);
            },
            "LayerFeatureConstraints" : function (node , layer){
            	//alert("LayerFeatureConstraints");            
            	  this.readChildNodes(node, layer);    
            },
            "FeatureTypeConstraint" : function (node , layer)
            {
            	this.readChildNodes(node, layer);    
            	// alert("FeatureTypeConstraint "  + layer.LayerFeatureConstraints);
            },
            "VendorOption" : function(node, symbolizer) {
                var Property = node.getAttribute("name");
                var symProperty = this.cssMap[Property];
                if (symProperty) {
                    var value = this.readOgcExpression(node);
                    if (value) symbolizer[symProperty] = value
                }
            }                        
        },
        "se": {
            "Name": function(node, obj) {
                 obj.name = this.getChildValue(node);
             },
             "Title": function(node, obj) {
                 obj.title = this.getChildValue(node);
             },
             "Description": function(node, obj) {
                 obj.description = this.getChildValue(node);
             },         
             "IsDefault": function(node, style) {
                 if(this.getChildValue(node) == "1") {
                     style.isDefault = true;
                 }
             }, 
            
             "CoverageStyle":function(node , style){
            	 var obj = {
                         rules: []
                     };
            	 this.readChildNodes(node, obj);
                 style.rules = obj.rules;
             },
             "FeatureTypeName": function(node, layer) {
            	 layer.LayerFeatureConstraints = this.getChildValue(node);
             },
             "FeatureTypeStyle": function(node, style) {
                 // OpenLayers doesn't have a place for FeatureTypeStyle
                 // Name, Title, Abstract, FeatureTypeName, or
                 // SemanticTypeIdentifier so, we make a temporary object
                 // and later just use the Rule(s).
                 var obj = {
                     rules: []
                 };
                 this.readChildNodes(node, obj);
                 style.rules = obj.rules;
             },
             "Rule": function(node, obj) {
                 var rule = new OpenLayers.Rule();
                 this.readChildNodes(node, rule);
                 obj.rules.push(rule);
             },
             "ElseFilter": function(node, rule) {
                 rule.elseFilter = true;
             },
             "MinScaleDenominator": function(node, rule) {
                 rule.minScaleDenominator = parseFloat(this.getChildValue(node));
             },
             "MaxScaleDenominator": function(node, rule) {
                 rule.maxScaleDenominator = parseFloat(this.getChildValue(node));
             },
             "TextSymbolizer": function(node, rule) {
                 // OpenLayers doens't do painter's order, instead we extend
                 var symbolizer = rule.symbolizer["Text"] || {};
                 this.readChildNodes(node, symbolizer);
                 // in case it didn't exist before
                 rule.symbolizer["Text"] = symbolizer;
             },
             "Label": function(node, symbolizer) {
                 // only supporting literal or property name
                 var obj = {};
                 this.readChildNodes(node, obj);
                 if(obj.property) {
                     symbolizer.label = "${" + obj.property + "}";
                 } else {
                     var value = this.readOgcExpression(node);
                     if(value) {
                         symbolizer.label = value;
                     }
                 }
             },
             "Font": function(node, symbolizer) {
               this.readChildNodes(node, symbolizer);
             },
                 
             "Halo": function(node, symbolizer) {
                 // halo has a fill, so send fresh object
                 var obj = {};
                 this.readChildNodes(node, obj);
                 symbolizer.haloRadius = obj.haloRadius;
                 symbolizer.haloColor = obj.fillColor;
                 symbolizer.haloOpacity = obj.fillOpacity;
             },
             "Radius": function(node, symbolizer) {
                 var radius = this.readOgcExpression(node);
                 if(radius != null) {
                     // radius is only used for halo
                     symbolizer.haloRadius = radius;
                 }
             },
             
             "LabelPlacement" : function(node, symbolizer) {
            	 this.readChildNodes(node, symbolizer);
             },
             "LinePlacement": function(node, symbolizer) {
                 this.readChildNodes(node, symbolizer);
             },
             "PointPlacement" : function(node, symbolizer) {
            	 this.readChildNodes(node, symbolizer);
             },
             "Displacement" : function(node, symbolizer) {
            	 this.readChildNodes(node, symbolizer);
             },
             "DisplacementX" : function(node, symbolizer) {
            	 var displacementX = this.readOgcExpression(node);
                 if(displacementX != null) {
                     // radius is only used for halo
                     symbolizer.displacementX = displacementX;
                 }
             },
             "DisplacementY" : function(node, symbolizer) {
            	 var displacementY = this.readOgcExpression(node);
                 if(displacementY != null) {
                     // radius is only used for halo
                     symbolizer.displacementY = displacementY;
                 }
             },
             
             "PolygonSymbolizer": function(node, rule) {
                 // OpenLayers doens't do painter's order, instead we extend
                 var symbolizer = rule.symbolizer["Polygon"] || {};
                 this.readChildNodes(node, symbolizer);
                 // in case it didn't exist before
                   
                 rule.symbolizer["Polygon"] = symbolizer;
             },
             "LineSymbolizer": function(node, rule) {
                 // OpenLayers doesn't do painter's order, instead we extend
                 var symbolizer = rule.symbolizer["Line"] || {};
                 this.readChildNodes(node, symbolizer);
                 // in case it didn't exist before
                 rule.symbolizer["Line"] = symbolizer;
             },
             "PointSymbolizer": function(node, rule) {
                 // OpenLayers doens't do painter's order, instead we extend
                 var symbolizer = rule.symbolizer["Point"] || {};
                 this.readChildNodes(node, symbolizer);
                 // in case it didn't exist before
                 rule.symbolizer["Point"] = symbolizer;
             },"RasterSymbolizer": function(node, rule){
            	 var symbolizer = rule.symbolizer["Raster"] || {};
                 this.readChildNodes(node, symbolizer);
                 // in case it didn't exist before
                 rule.symbolizer["Raster"] = symbolizer;
             },
             "SvgParameter":function(node, symbolizer){          	  
            	 var Property = node.getAttribute("name");
                 var symProperty = this.cssMap[Property];
                 if(symProperty) {
                     // Limited support for parsing of OGC expressions
                     var value = this.readOgcExpression(node);
                     // always string, could be an empty string
                     if(value) {
                         symbolizer[symProperty] = value;
                     }
                 }
                 },                 
             "Stroke": function(node, symbolizer) {
                 symbolizer.stroke = true;
                 this.readChildNodes(node, symbolizer);
             },
             "Fill": function(node, symbolizer) {
                 symbolizer.fill = true;
                 this.readChildNodes(node, symbolizer);
             },
             "CssParameter": function(node, symbolizer) {
                 var cssProperty = node.getAttribute("name");
                 var symProperty = this.cssMap[cssProperty];
                 if(symProperty) {
                     // Limited support for parsing of OGC expressions
                     var value = this.readOgcExpression(node);
                     // always string, could be an empty string
                     if(value) {
                         symbolizer[symProperty] = value;
                     }
                 }
             },
             "Graphic": function(node, symbolizer) {
                 symbolizer.graphic = true;
                 var graphic = {};
                 // painter's order not respected here, clobber previous with next
                 this.readChildNodes(node, graphic);
                 // directly properties with names that match symbolizer properties
                 var properties = [
                     "strokeColor", "strokeWidth", "strokeOpacity",
                     "strokeLinecap", "strokeLinejoin", "fillColor", "fillOpacity", 
                     "graphicName", "rotation", "graphicFormat"  ,
                     "graphicContent" , "href", "angleScale", "angleTranslation"                   
                 ];
                 var prop, value;
                 for(var i=0, len=properties.length; i<len; ++i) {
                     prop = properties[i];
                     value = graphic[prop];
                     if(value != undefined) {
                                 		 
                    		 symbolizer[prop] = value;
                     }
                 }
                 // set other generic properties with specific graphic property names
                 if(graphic.opacity != undefined) {
                     symbolizer.graphicOpacity = graphic.opacity;
                 }
                 if(graphic.size != undefined) {
                     symbolizer.pointSize= graphic.size ;
                 }
                 if(graphic.href != undefined) {
                     symbolizer.externalGraphic = graphic.href;
                 }
                 if(graphic.rotation != undefined) {
                     symbolizer.rotation = graphic.rotation;
                 }
                 if(graphic.angleScale != undefined) {
                	 symbolizer.angleScale = graphic.angleScale;
                 }
                 if(graphic.angleTranslation != undefined) {
                	 symbolizer.angleTranslation = graphic.angleTranslation;
                 }
             },
             "ExternalGraphic": function(node, graphic) {
                 this.readChildNodes(node, graphic);
             },
             "Mark": function(node, graphic) {
                 this.readChildNodes(node, graphic);
             },
             "WellKnownName": function(node, graphic) {
                 graphic.graphicName = this.getChildValue(node);
             },
             "Opacity": function(node, obj) {
                 var opacity = this.readOgcExpression(node);
                 // always string, could be empty string
                 if(opacity) {
                     obj.opacity = opacity;
                 }
             },
             "Size": function(node, obj) {
                 var size = this.readOgcExpression(node);
                 // always string, could be empty string
                 if(size) {
                     obj.size = size;
                 }
             },
             "Rotation": function(node, obj) {
                 var rotation = this.readOgcExpression(node.firstChild);
                 // always string, could be empty string
                 if(rotation) {
                     obj.rotation = rotation;
                 }
             },
             "OnlineResource": function(node, obj) {
                 obj.href = this.getAttributeNS(
                     node, this.namespaces.xlink, "href"
                 );
             },
             "Format": function(node, graphic) {
                 graphic.graphicFormat = this.getChildValue(node);
             },
             "InlineContent":function(node, graphic){
            	 graphic.graphicContent = this.getChildValue(node);
             },
             "VendorOption" : function(node, symbolizer) {
             	var Property = node.getAttribute("name");
                 var symProperty = this.cssMap[Property];
                 if (symProperty) {
                     var value = this.readOgcExpression(node);
                     if (value) symbolizer[symProperty] = value
                 }
             }
         }
    }, OpenLayers.Format.Filter.v1_1_0.prototype.readers),
    
    /**
     * Property: cssMap
     * {Object} Object mapping supported css property names to OpenLayers
     *     symbolizer property names.
     */
    cssMap: {    	
        "stroke": "strokeColor",
        "stroke-opacity": "strokeOpacity",
        "stroke-width": "strokeWidth",
        "stroke-linecap": "strokeLinecap",
        "stroke-linejoin":"strokeLinejoin",
        "stroke-dasharray": "strokeDashstyle",
        "fill": "fillColor",
        "fill-opacity": "fillOpacity",
        "font-family": "fontFamily",
        "font-size": "fontSize",
        "font-weight": "fontWeight",
        "font-style": "fontStyle",
        "background_type":"backgroundType",
        "background_fill":"backgroundFill",
        "background_line":"backgroundLine",
        "background_offset":"backgroundOffset",
        "background_align":"backgroundAlign",
        "text_point_base":"textPointBase",
        "text_point_position":"textPointPosition",
        "text_point_arrange":"textPointArrange",
        "code_domain":"codeDomain",
        "text_arrange_pos":"textArrangePos",
        "text_arrange_line":"textArrangeLine",
        "text_arrange_gap":"textArrangeGap",
        "char-code":"charCode",
        "angle_scale":"angleScale",
        "angle_translation":"angleTranslation"
    },
    
    /**
     * Method: getCssProperty
     * Given a symbolizer property, get the corresponding CSS property
     *     from the <cssMap>.
     *
     * Parameters:
     * sym - {String} A symbolizer property name.
     *
     * Returns:
     * {String} A CSS property name or null if none found.
     */
    getCssProperty: function(sym) {
        var css = null;
        for(var prop in this.cssMap) {
            if(this.cssMap[prop] == sym) {
                css = prop;
                break;
            }
        }
        return css;
    },
    
    /**
     * Method: getGraphicFormat
     * Given a href for an external graphic, try to determine the mime-type.
     *     This method doesn't try too hard, and will fall back to
     *     <defautlGraphicFormat> if one of the known <graphicFormats> is not
     *     the file extension of the provided href.
     *
     * Parameters:
     * href - {String}
     *
     * Returns:
     * {String} The graphic format.
     */
    getGraphicFormat: function(href) {
        var format, regex;
        for(var key in this.graphicFormats) {
            if(this.graphicFormats[key].test(href)) {
                format = key;
                break;
            }
        }
        return format || this.defautlGraphicFormat;
    },
    
    /**
     * Property: defaultGraphicFormat
     * {String} If none other can be determined from <getGraphicFormat>, this
     *     default will be returned.
     */
    defaultGraphicFormat: "image/png",
    
    /**
     * Property: graphicFormats
     * {Object} Mapping of image mime-types to regular extensions matching 
     *     well-known file extensions.
     */
    graphicFormats: {
        "image/jpeg": /\.jpe?g$/i,
        "image/gif": /\.gif$/i,
        "image/png": /\.png$/i
    },

    /**
     * Method: write
     *
     * Parameters:
     * sld - {Object} An object representing the SLD.
     *
     * Returns:
     * {DOMElement} The root of an SLD document.
     */

 
    write: function(sld) {
        return this.writers.sld.StyledLayerDescriptor.apply(this, [sld]);
    },

    /* Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     *     {
     *  
     */
    
    writers: OpenLayers.Util.applyDefaults({
        "sld": {
            "StyledLayerDescriptor": function(sld) {     	

    			/*var url ="xmlns:ogc=" + this.namespaces.ogc; 		
    			url +=" xmlns:se=" +  + " xmlns:xlink=" + this.namespaces["xlink"];
    			url +=" xmlns:xsi=" + this.namespaces["xsi"] + " xmlns:sld="+ this.namespaces["sld"];
    			url +=" version='1.1.0'";*/ //xsi:schemaLocation='' */  								
    			
    			
                 var root = this.createElementNSPlus(
                    "sld:StyledLayerDescriptor",                    
                    {attributes: {  
                    	"version": this.namespaces.version
                   //     "extend": "STANDARD_MAP", 
//                    	"se": this.namespaces["se"],
//                    	"xlink":  this.namespaces["xlink"],
//                    	"xsi" :this.namespaces["xsi"] ,
//                    	"ogc" :this.namespaces["ogc"],
//                    	"xsi:schemaLocation": this.schemaLocation ? this.schemaLocation : ""                    	
                    	 } 
                    });         
                 
                 root.setAttribute(null, "xmlns:se", this.namespaces.se);
                 root.setAttribute(null, "xmlns:xlink", this.namespaces.xlink);
                 root.setAttribute(null, "xmlns:xsi", this.namespaces.xsi);
                 root.setAttribute(null, "xmlns:sld", this.namespaces.sld);
                 root.setAttribute(null, "xmlns:ogc", this.namespaces.ogc);
                
//    			 var root = this.createElementNS( url ,"sld:StyledLayerDescriptor");
    			 
                /*add in optional name
                 * "xsi:schemaLocation": this.schemaLocation
                 * */
                 
                if(sld.name) {
                    this.writeNode("Name", sld.name, root);
                }
                
                //add in optional title
                if(sld.title) {
                    this.writeNode("title", sld.title, root);
                }
                
                // add in optional description
            	this.writeNode("Description", sld.description, root);
                
                // add in named layers
                // allow namedLayers to be an array
                if(sld.namedLayers instanceof Array) {
                    for(var i=0, len=sld.namedLayers.length; i<len; ++i) {
                        this.writeNode("sld:NamedLayer", sld.namedLayers[i], root);
                    }
                } else {
                    for(var name in sld.namedLayers) {
                        this.writeNode("sld:NamedLayer", sld.namedLayers[name], root);
                    }
                }
                
                return root;
            },           
            "NamedLayer": function(layer) {
                var node = this.createElementNSPlus("sld:NamedLayer");

                // add in required name
                this.writeNode("se:Name", layer.name, node);
              
                this.writeNode("se:Description", layer.description, node);
                    
                // optional sld:LayerFeatureConstraints here                    
                    if(layer.LayerFeatureConstraints) {
                        this.writeNode("sld:LayerFeatureConstraints", layer.LayerFeatureConstraints, node);
                    }

                // add in named styles
                if(layer.namedStyles) {
                    for(var i=0, len=layer.namedStyles.length; i<len; ++i) {
                        this.writeNode(
                            "sld:NamedStyle", layer.namedStyles[i], node
                        );
                    }
                }                
               
                // add in user styles
                if(layer.userStyles) {
                    for(var i=0, len=layer.userStyles.length; i<len; ++i) {
                        this.writeNode(
                            "sld:UserStyle", layer.userStyles[i], node
                        );
                    }
                }  
                
               
                return node;
            },              
         
            "NamedStyle": function(name) {
                var node = this.createElementNSPlus("sld:NamedStyle");
                this.writeNode("se:Name", name, node);
                return node;
            },
            "UserStyle": function(style) {
                var node = this.createElementNSPlus("sld:UserStyle");

                // add in optional name
                if(style.name) {
                    this.writeNode("se:Name", style.name, node);
                }
                // add in optional title
                if(style.title) {
                    this.writeNode("se:Title", style.title, node);
                }
                // add in optional description
                this.writeNode("se:Description", style.description, node);
                
                // add isdefault
                if(style.isDefault) {
                    this.writeNode("se:IsDefault", style.isDefault, node);
                }
                
                // add FeatureTypeStyles
                this.writeNode("se:FeatureTypeStyle", style, node);
                
                return node;
            	} ,	
            "LayerFeatureConstraints" : function ( FeatureConstraints){            	
            	var node = this.createElementNSPlus("sld:LayerFeatureConstraints");
           	 	this.writeNode("sld:FeatureTypeConstraint", FeatureConstraints, node);
           	 	return node;       	 
            	
            },
            "FeatureTypeConstraint" : function (constranint) {
            	var node = this.createElementNSPlus("sld:FeatureTypeConstraint");              
            	this.writeNode("se:FeatureTypeName", constranint, node);    
             	return node;
             },
             "Name": function(name) {
                 return this.createElementNSPlus("se:Name", {value: name});
             },
             "Title": function(title) {
                 return this.createElementNSPlus("se:Title", {value: title});
             },
             "Description" : function (title){            	
             	var node = this.createElementNSPlus("se:Description");
             	this.writeNode("Title", title, node);
             	return node;
             },
             "VendorOption" : function(obj) {
             	return this.createElementNSPlus("sld:VendorOption", {
                     attributes: {
                         name: this.getCssProperty(obj.key)
                     },
                     value: obj.symbolizer[obj.key]
                 })
             }
    	},
   	 "se": { 
            "Name": function(name) {
                return this.createElementNSPlus("se:Name", {value: name});
            },
            "Title": function(title) {
                return this.createElementNSPlus("se:Title", {value: title});
            },
            "Description" : function (title){      
            	var node = this.createElementNSPlus("se:Description");
            	 this.writeNode("Title", title, node);
            	 return node;
            },
            "Abstract": function(description) {
                return this.createElementNSPlus(
                    "Abstract", {value: description}
                );
            },            
            "IsDefault": function(bool) {
                return this.createElementNSPlus(
                    "sd:IsDefault", {value: (bool) ? "1" : "0"}
                );
            },
            "FeatureTypeName" : function (typename){
            	 return this.createElementNSPlus(
                         "se:FeatureTypeName", {value: typename}
                     );
            },
           
            "FeatureTypeStyle": function(style) {
                var node = this.createElementNSPlus("se:FeatureTypeStyle");
                
                // OpenLayers currently stores no Name, Title, Abstract,
                // FeatureTypeName, or SemanticTypeIdentifier information
                // related to FeatureTypeStyle
                
                // add in rules
                for(var i=0, len=style.rules.length; i<len; ++i) {
                    this.writeNode("Rule", style.rules[i], node);
                }
                
                return node;
            },                  
            "Rule": function(rule) {
                var node = this.createElementNSPlus("se:Rule");

                // add in optional name
                if(rule.name) {
                    this.writeNode("Name", rule.name, node);
                }
                /*add in optional title
                if(rule.title) {
                    this.writeNode("Title", rule.title, node);
                }
                // add in optional description
                if(rule.description) {
                    this.writeNode("Abstract", rule.description, node);
                }*/
                
                // add in LegendGraphic here
                
                // add in optional filters
                if(rule.elseFilter) {
                    this.writeNode("ElseFilter", null, node);
                } else if(rule.filter) {
                    this.writeNode("ogc:Filter", rule.filter, node);
                }
                
                // add in scale limits
                if(rule.minScaleDenominator != undefined) {
                    this.writeNode(
                        "MinScaleDenominator", rule.minScaleDenominator, node
                    );
                }
                if(rule.maxScaleDenominator != undefined) {
                    this.writeNode(
                        "MaxScaleDenominator", rule.maxScaleDenominator, node
                    );
                }
                
                // add in symbolizers (relies on geometry type keys)
                var types = OpenLayers.Style.SYMBOLIZER_PREFIXES;
                var type, symbolizer;
                for(var i=0, len=types.length; i<len; ++i) {
                    type = types[i];
                    symbolizer = rule.symbolizer[type];
                    if(symbolizer) {
                        this.writeNode(
                            type + "Symbolizer", symbolizer, node
                        );
                    }
                }
                return node;

            },
            "ElseFilter": function() {
                return this.createElementNSPlus("se:ElseFilter");
            },
            "MinScaleDenominator": function(scale) {
                return this.createElementNSPlus(
                    "se:MinScaleDenominator", {value: scale}
                );
            },
            "MaxScaleDenominator": function(scale) {
                return this.createElementNSPlus(
                    "se:MaxScaleDenominator", {value: scale}
                );
            },            
      
            "LineSymbolizer": function(symbolizer) {
                var node = this.createElementNSPlus("se:LineSymbolizer" ,
                		 {attributes: {"version": this.VERSION  }} );
                if (symbolizer.name)
                	this.writeNode("Name" , symbolizer.name , node);
                
                this.writeNode("Stroke", symbolizer, node);
                return node;
            },
            "Stroke": function(symbolizer) {
                var node = this.createElementNSPlus("se:Stroke");

                // GraphicFill here
                
                // GraphicStroke here

                // add in CssParameters
                if(symbolizer.strokeColor != undefined) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "strokeColor"},
                        node
                    );
                }
                if(symbolizer.strokeOpacity != undefined) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "strokeOpacity"},
                        node
                    );
                }
                if(symbolizer.strokeWidth != undefined) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "strokeWidth"},
                        node
                    );
                }
                
                if(symbolizer.strokeLinecap != undefined) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "strokeLinecap"},
                        node
                    );                    
                }
                
                if(symbolizer.strokeLinejoin != undefined) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "strokeLinejoin"},
                        node
                    ); 
                }
                    if(symbolizer.strokeDashstyle != undefined) {
                        this.writeNode(
                            "SvgParameter",
                            {symbolizer: symbolizer, key: "strokeDashstyle"},
                            node
                        );        
                    }
                    
                return node;
            },    
            "SvgParameter": function(obj) {
                // not handling ogc:expressions for now
                return this.createElementNSPlus("se:SvgParameter", {
                    attributes: {name: this.getCssProperty(obj.key)},
                    value: obj.symbolizer[obj.key]
                });
            },
            "CssParameter": function(obj) {
                // not handling ogc:expressions for now
                return this.createElementNSPlus("se:CssParameter", {
                    attributes: {name: this.getCssProperty(obj.key)},
                    value: obj.symbolizer[obj.key]
                });
            },
            "TextSymbolizer": function(symbolizer) {
                var node = this.createElementNSPlus("se:TextSymbolizer" ,{attributes: {  
            		"version": this.VERSION 
        		} });
                if (symbolizer.name)
                	this.writeNode("Name" , symbolizer.name , node);
                // add in optional Label
                if(symbolizer.label != null) {
                    this.writeNode("Label", symbolizer.label, node);
                }
                // add in optional Font
                if(symbolizer.fontFamily != null ||
                   symbolizer.fontSize != null ||
                   symbolizer.fontWeight != null ||
                   symbolizer.fontStyle != null) {
                    this.writeNode("Font", symbolizer, node);
                }
                // add in optional Halo
                
                if(symbolizer.haloRadius != null ||
                   symbolizer.haloColor != null ||
                   symbolizer.haloOpacity != null) {
                    this.writeNode("Halo", symbolizer, node);
                }
                // add in optional Fill
                if(symbolizer.fillColor != null ||
                   symbolizer.fillOpacity != null) {
                    this.writeNode("Fill", symbolizer, node);
                }
                
                // add in optional LabelPlacement
                if(symbolizer.displacementX != null &&
                		symbolizer.displacementY != null || symbolizer.name == "LineText") {
                    this.writeNode("LabelPlacement", symbolizer, node);
                }
                
                // Vendor Optin 추가
                if (symbolizer.textPointBase != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"textPointBase"}, node);
                if (symbolizer.textPointPosition != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"textPointPosition"}, node);
                if (symbolizer.textPointArrange != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"textPointArrange"}, node);
                if (symbolizer.backgroundType != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"backgroundType"}, node);
                if (symbolizer.backgroundFill != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"backgroundFill"}, node);
                if (symbolizer.backgroundLine != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"backgroundLine"}, node);
                if (symbolizer.backgroundOffset != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"backgroundOffset"}, node);
                if (symbolizer.backgroundAlign != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"backgroundAlign"}, node);
                if (symbolizer.codeDomain != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"codeDomain"}, node);
                return node;
            },
            "LabelPlacement" : function(symbolizer) {
            	var node = this.createElementNSPlus("se:LabelPlacement");
            	if(symbolizer.name == "LineText") {
                    this.writeNode("LinePlacement", symbolizer, node);
              
                }
            	else if(symbolizer.displacementX != null &&
                		symbolizer.displacementY != null) {
            		this.writeNode("PointPlacement", symbolizer, node);
            	}
            		
            	return node;
            },
            "LinePlacement" : function(symbolizer) {
            	var node = this.createElementNSPlus("se:LinePlacement");
                if (symbolizer.textArrangePos != null) this.writeNode("VendorOption", {symbolizer: symbolizer, key:"textArrangePos"}, node);
                if (symbolizer.textArrangeLine != null) this.writeNode("VendorOption", {symbolizer: symbolizer, key:"textArrangeLine"}, node);
                if (symbolizer.textArrangeGap != null) this.writeNode("VendorOption", {symbolizer: symbolizer, key:"textArrangeGap"}, node);
                return node;
            },
            "VendorOption" : function(obj) {
            	return this.createElementNSPlus("se:VendorOption", {
                    attributes: {
                        name: this.getCssProperty(obj.key)
                    },
                    value: obj.symbolizer[obj.key]
                })
            },
            "PointPlacement" : function(symbolizer) { 
            	var node = this.createElementNSPlus("se:PointPlacement");
            	if(symbolizer.displacementX != null &&
                		symbolizer.displacementY != null) {
                    this.writeNode("Displacement", symbolizer, node);
              
                }
            	return node;
            },
            "Displacement" : function(symbolizer) {
            	var node = this.createElementNSPlus("se:Displacement");
            	if(symbolizer.displacementX != null &&
                		symbolizer.displacementY != null) {
                    this.writeNode("DisplacementX", symbolizer, node);
                    this.writeNode("DisplacementY", symbolizer, node);
                }
            	return node;
            },
            "DisplacementX" : function(symbolizer) {
            	return node = this.createElementNSPlus("se:DisplacementX", {
            		value : symbolizer.displacementX
            	});
            },
            "DisplacementY" : function(symbolizer) {
            	return node = this.createElementNSPlus("se:DisplacementY", {
            		value : symbolizer.displacementY
            	});
            },
            

            "Font": function(symbolizer) {
                var node = this.createElementNSPlus("se:Font");
                // add in CssParameters
                if(symbolizer.fontFamily) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "fontFamily"},
                        node
                    );
                }
                if(symbolizer.fontStyle) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "fontStyle"},
                        node
                    );
                }
                if(symbolizer.fontWeight) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "fontWeight"},
                        node
                    );
                }
                if(symbolizer.fontSize) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "fontSize"},
                        node
                    );
                }
                return node;
            },
            "Label": function(label) {
                // only the simplest of ogc:expression handled
                // {label: "some text and a ${propertyName}"}
            	   var node = this.createElementNSPlus("se:Label");
                   var tokens = label.split("${");
                   node.appendChild(this.createTextNode(tokens[0]));
                   var item, last;
                   for(var i=1, len=tokens.length; i<len; i++) {
                       item = tokens[i];
                       last = item.indexOf("}"); 
                       if(last > 0) {
                           this.writeNode(
                               "ogc:PropertyName",
                               {property: item.substring(0, last)},
                               node
                           );
                           node.appendChild(
                               this.createTextNode(item.substring(++last))
                           );
                       } else {
                           // no ending }, so this is a literal ${
                           node.appendChild(
                               this.createTextNode("${" + item)
                           );
                       }
                   }
                   return node;
            },
            "Halo": function(symbolizer) {
                var node = this.createElementNSPlus("se:Halo");
                if(symbolizer.haloRadius) {
                    this.writeNode("Radius", symbolizer.haloRadius, node);
                }
                if(symbolizer.haloColor || symbolizer.haloOpacity) {
                    this.writeNode("Fill", {
                        fillColor: symbolizer.haloColor,
                        fillOpacity: symbolizer.haloOpacity
                    }, node);
                }
                return node;
            },
            "Radius": function(value) {
                return node = this.createElementNSPlus("se:Radius", {
                    value: value
                });
            },        
            "RasterSymbolizer":function (symbolizer){
            	   var node = this.createElementNSPlus("se:PolygonSymbolizer" ,{attributes: {  
               		"version": this.VERSION 
           		} });
            	   if (symbolizer.name)
                   	this.writeNode("Name" , symbolizer.name , node);
            	   
            	   if (symbolizer.Opacity != undefined)
            	   {
            		   this.writeNode("Opacity", symbolizer, node);
            	   }           	   

                   return node;
            },
            "PolygonSymbolizer": function(symbolizer) {
                var node = this.createElementNSPlus("se:PolygonSymbolizer" ,{attributes: {  
            		"version": this.VERSION 
        		} });
                
                if (symbolizer.name)
                	this.writeNode("Name" , symbolizer.name , node);
                
                if(symbolizer.fillColor != undefined ||
                   symbolizer.fillOpacity != undefined) {
                    this.writeNode("Fill", symbolizer, node);
                }
                if(symbolizer.strokeWidth != undefined ||
                   symbolizer.strokeColor != undefined ||
                   symbolizer.strokeOpacity != undefined ||
                   symbolizer.strokeDashstyle != undefined) {
                    this.writeNode("Stroke", symbolizer, node);
                }
                
              
                return node;
            },
            "Fill": function(symbolizer) {
                var node = this.createElementNSPlus("se:Fill");
                
                // GraphicFill here
                
                // add in CssParameters
                if(symbolizer.fillColor) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "fillColor"},
                        node
                    );
                }
                if(symbolizer.fillOpacity != null) {
                    this.writeNode(
                        "SvgParameter",
                        {symbolizer: symbolizer, key: "fillOpacity"},
                        node
                    );
                }
                return node;
            },
            "PointSymbolizer": function(symbolizer) {
                var node = this.createElementNSPlus("se:PointSymbolizer" ,{attributes: {  
            		"version": this.VERSION 
        		}} );
               
                if (symbolizer.name)
                	this.writeNode("Name" , symbolizer.name , node);
                
                this.writeNode("Graphic", symbolizer, node);
                return node;
            },
            "Graphic": function(symbolizer) {
            	if (symbolizer.graphic == true )
            	{            
	                var node = this.createElementNSPlus("se:Graphic");	                                
	                
	                if(symbolizer.graphicContent != undefined  || symbolizer.href != undefined) {
	                    this.writeNode("ExternalGraphic", symbolizer, node);
	                } else {
	                    this.writeNode("Mark", symbolizer, node);
	                }
	                if(symbolizer.pointSize != undefined) {
	                    this.writeNode("Size", symbolizer.pointSize, node);
	                }
	                if(symbolizer.graphicOpacity != undefined) {
	                    this.writeNode("Opacity", symbolizer.graphicOpacity, node);
	                }
	                if(symbolizer.rotation != undefined) {
	                	this.writeNode("se:Rotation", symbolizer.rotation, node);
	                }
	                if(symbolizer.angleScale != undefined) {
	                	this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"angleScale"}, node);
	                }
	                if(symbolizer.angleTranslation != undefined) {
	                	this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"angleTranslation"}, node);
	                }
                return node;
            	}
            },
            "ExternalGraphic": function(symbolizer) {
                var node = this.createElementNSPlus("se:ExternalGraphic");
                /*
                this.writeNode(
                    "OnlineResource", symbolizer.externalGraphic, node
                );        
                var str = symbolizer.graphicContent;
               
                alert("처음" + str);                
                str.replace(/+/g, " ");
                alert('+    ' +str);
                str.replace(/=/g, " ");
                alert('=    ' +str);
                str.replace(///g, " ");
                alert('/    ' + str);*/
                
               // alert("ExternalGraphic"); 
                
               // this.writeNode("InlineContent" ,encodeURIComponent(symbolizer.graphicContent) , node);
                if(!symbolizer.href){
                	this.writeNode("InlineContent" ,symbolizer.graphicContent , node);                
                } else {
                	this.writeNode("OnlineResource", symbolizer.href, node);
                }
                
                var format = symbolizer.graphicFormat || this.getGraphicFormat(symbolizer.externalGraphic);
                this.writeNode("Format", format, node);
                return node;
            },
            "Mark": function(symbolizer) {
                var node = this.createElementNSPlus("se:Mark");
                if(symbolizer.graphicName) {
                    this.writeNode("WellKnownName", symbolizer.graphicName, node);
                }
                /*this.writeNode("Fill", symbolizer, node);
                this.writeNode("Stroke", symbolizer, node);*/
                if (symbolizer.charCode != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"charCode"}, node);
                if (symbolizer.fillColor != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"fillColor"}, node);
                if (symbolizer.fontFamily != null) this.writeNode("sld:VendorOption", {symbolizer: symbolizer, key:"fontFamily"}, node);
                return node;
            },
            "WellKnownName": function(name) {
                return this.createElementNSPlus("se:WellKnownName", {
                    value: name
                });
            },
            "Opacity": function(value) {
                return this.createElementNSPlus("se:Opacity", {
                    value: value
                });
            },
            "Size": function(value) {
                return this.createElementNSPlus("se:Size", {
                    value: value
                });
            },
            "Rotation": function(value) {
            	var node = this.createElementNSPlus("se:Rotation");
            	if (value != null) this.writeNode("ogc:PropertyName", {
                    property: value
                }, node);
                return node
            },
            "OnlineResource": function(href) {
                return this.createElementNSPlus("se:OnlineResource", {
                    attributes: {
                        "xlink:type": "simple",
                        "xlink:href": href
                    }
                });
            },
            "Format": function(format) {
                return this.createElementNSPlus("se:Format", {
                    value: format
                });
           	},
            "InlineContent": function(Content) {
                return this.createElementNSPlus("se:InlineContent", {
                	attributes: {encoding: "base64"},
                    value: Content
                });
           	}
            }
         },                 
       OpenLayers.Format.Filter.v1_1_0.prototype.writers),    
    CLASS_NAME: "NUTs.Format.SLD.v1_1" 

});



/*=[ v1_1_0.js ]==========================================================================*/

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/SLD/v1_1.js
 * @requires OpenLayers/Format/Filter/v1_1_0.js
 */

/**
 * Class: OpenLayers.Format.SLD.v1_1_0
 * Write SLD version 1.1.0.
 * 
 * Inherits from:
 *  - <OpenLayers.Format.SLD.v1_1>
 */

NUTs.Format.SLD.v1_1_0 = OpenLayers.Class(
		NUTs.Format.SLD.v1_1, {
    
    /**
     * Constant: VERSION
     * {String} 1.1.0
     */
    VERSION: "1.1.0",
    
    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/sld
     *   http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd
     */
    schemaLocation: "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd",

    initialize: function(options) {
    	NUTs.Format.SLD.v1_1.prototype.initialize.apply(
            this, [options]
        );
    },

    CLASS_NAME: "NUTs.Format.SLD.v1_1_0" 

});




/*=[ v1_0_0.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/SLD/v1.js
 * @requires OpenLayers/Format/Filter/v1_0_0.js
 */

/**
 * Class: OpenLayers.Format.SLD.v1_0_0
 * Write SLD version 1.0.0.
 * 
 * Inherits from:
 *  - <OpenLayers.Format.SLD.v1>
 */
NUTs.Format.SLD.v1_0_0 = OpenLayers.Class(
		NUTs.Format.SLD.v1, {
    
    /**
     * Constant: VERSION
     * {String} 1.0.0
     */
    VERSION: "1.0.0",
    
    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/sld
     *   http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd
     */
    schemaLocation: "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd",

    /**
     * Constructor: OpenLayers.Format.SLD.v1_0_0
     * Instances of this class are not created directly.  Use the
     *     <OpenLayers.Format.SLD> constructor instead.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    CLASS_NAME: "OpenLayers.Format.SLD.v1_0_0" 

});




/*=[ v1_0_0_GeoServer.js ]==========================================================================*/

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/SLD/v1_0_0.js
 */

/**
 * Class: OpenLayers.Format.SLD/v1_0_0_GeoServer
 * Read and write SLD version 1.0.0 with GeoServer-specific enhanced options.
 * See http://svn.osgeo.org/geotools/trunk/modules/extension/xsd/xsd-sld/src/main/resources/org/geotools/sld/bindings/StyledLayerDescriptor.xsd
 * for more information.
 *
 * Inherits from:
 *  - <OpenLayers.Format.SLD.v1_0_0>
 */

NUTs.Format.SLD.v1_0_0_GeoServer = OpenLayers.Class(
    NUTs.Format.SLD.v1_0_0, {

    /**
     * Property: version
     * {String} The specific parser version.
     */
    version: "1.0.0",

    /**
     * Property: profile
     * {String} The specific profile
     */
    profile: "GeoServer",

   /**
     * Constructor: OpenLayers.Format.SLD.v1_0_0_GeoServer
     * Create a new parser for GeoServer-enhanced SLD version 1.0.0.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: OpenLayers.Util.applyDefaults({
        "sld": OpenLayers.Util.applyDefaults({
            "Priority": function(node, obj) {
                var value = this.readers.ogc._expression.call(this, node);
                if (value) {
                    obj.priority = value;
                }
            },
            "VendorOption": function(node, obj) {
                if (!obj.vendorOptions) {
                    obj.vendorOptions = {};
                }
                obj.vendorOptions[node.getAttribute("name")] = this.getChildValue(node);
            },
            "TextSymbolizer": function(node, rule) {
                OpenLayers.Format.SLD.v1_0_0.prototype.readers.sld.TextSymbolizer.apply(this, arguments);
                var symbolizer = this.multipleSymbolizers ? rule.symbolizers[rule.symbolizers.length-1] : rule.symbolizer["Text"];
                if (symbolizer.graphic === undefined) {
                    symbolizer.graphic = false;
                }
            }
        }, OpenLayers.Format.SLD.v1_0_0.prototype.readers["sld"])
    }, OpenLayers.Format.SLD.v1_0_0.prototype.readers),

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: OpenLayers.Util.applyDefaults({
        "sld": OpenLayers.Util.applyDefaults({
            "Priority": function(priority) {
                return this.writers.sld._OGCExpression.call(
                    this, "sld:Priority", priority
                );
            },
            "VendorOption": function(option) {
                return this.createElementNSPlus("sld:VendorOption", {
                    attributes: {name: option.name},
                    value: option.value
                });
            },
            "TextSymbolizer": function(symbolizer) {
                var writers = OpenLayers.Format.SLD.v1_0_0.prototype.writers;
                var node = writers["sld"]["TextSymbolizer"].apply(this, arguments);
                if (symbolizer.graphic !== false && (symbolizer.externalGraphic || symbolizer.graphicName)) {
                    this.writeNode("Graphic", symbolizer, node);
                }
                if ("priority" in symbolizer) {
                    this.writeNode("Priority", symbolizer.priority, node);
                }
                return this.addVendorOptions(node, symbolizer);
            },
            "PointSymbolizer": function(symbolizer) {
            	var writers = OpenLayers.Format.SLD.v1_0_0.prototype.writers;
                var node = writers["sld"]["PointSymbolizer"].apply(this, arguments);
                return this.addVendorOptions(node, symbolizer);
            },
            "LineSymbolizer": function(symbolizer) {
                var writers = OpenLayers.Format.SLD.v1_0_0.prototype.writers;
                var node = writers["sld"]["LineSymbolizer"].apply(this, arguments);
                return this.addVendorOptions(node, symbolizer);
            },
            "PolygonSymbolizer": function(symbolizer) {
                var writers = OpenLayers.Format.SLD.v1_0_0.prototype.writers;
                var node = writers["sld"]["PolygonSymbolizer"].apply(this, arguments);
                return this.addVendorOptions(node, symbolizer);
            }
        }, OpenLayers.Format.SLD.v1_0_0.prototype.writers["sld"])
    }, OpenLayers.Format.SLD.v1_0_0.prototype.writers),

    /**
     * Method: addVendorOptions
     * Add in the VendorOption tags and return the node again.
     *
     * Parameters:
     * node - {DOMElement} A DOM node.
     * symbolizer - {Object}
     *
     * Returns:
     * {DOMElement} A DOM node.
     */
    addVendorOptions: function(node, symbolizer) {
        var options = symbolizer.vendorOptions;
        if (options) {
            for (var key in symbolizer.vendorOptions) {
                this.writeNode("VendorOption", {
                    name: key, 
                    value: symbolizer.vendorOptions[key]
                }, node);
            }
        }
        return node;
    },

    CLASS_NAME: "NUTs.Format.SLD.v1_0_0_GeoServer"

});




/*=[ Box.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : Box.js
 * 설 명 : OpenLayers.Control.Box 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Handler.Box = OpenLayers.Class(OpenLayers.Handler.Box, {
	/**
	 * 인덱스 맵에서 사용 여부
	 */
	indexMap : false,
	
	/**********************************************************************************
	 * 함수명 : startBox
	 * 설 명 : 영역 박스 시작
	 * 인 자 : xy (GPixel 좌표객체)
	 * 사용법 : startBox(xy)
	 * 작성일 : 2011.04.26
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.26		최원석		인덱스 맵 일때 새로 그리기 시작 시 기존 영역 박스를 삭제하도록 함
	 * 								
	 **********************************************************************************/
	startBox: function (xy) {
		if(this.indexMap && this.zoomBox) this.removeBox();
		
	    this.zoomBox = OpenLayers.Util.createDiv('zoomBox',
	                                             this.dragHandler.start);
	    this.zoomBox.className = this.boxDivClassName;         
	    this.zoomBox.style.border = "2px solid #000000";
	    this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
	    this.map.viewPortDiv.appendChild(this.zoomBox);
	
	    OpenLayers.Element.addClass(
	        this.map.viewPortDiv, "olDrawBox"
	    );
	},
	
	/**********************************************************************************
	 * 함수명 : applyBox
	 * 설 명 : 기준 지도 이동에 따른 색인도의 영역 박스 다시 그림
	 * 인 자 : xy (GBounds 객체)
	 * 사용법 : applyBox(bounds)
	 * 작성일 : 2011.04.26
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.26		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	applyBox: function (bounds) {
		if(this.indexMap && this.zoomBox) this.removeBox();
		
		this.dragHandler.start = this.map.getPixelFromLonLat(new OpenLayers.LonLat(bounds.left, bounds.top));
		var endPixel = this.map.getPixelFromLonLat(new OpenLayers.LonLat(bounds.right, bounds.bottom));
		var width = endPixel.x - this.dragHandler.start.x;
		var height = endPixel.y - this.dragHandler.start.y;
		
		this.zoomBox = OpenLayers.Util.createDiv('zoomBox', this.dragHandler.start);
		this.zoomBox.className = this.boxDivClassName;
		this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
		this.map.viewPortDiv.appendChild(this.zoomBox);
		this.zoomBox.style.width = width + "px";
		this.zoomBox.style.height = height + "px";
    },
    
    /**********************************************************************************
	 * 함수명 : moveBox
	 * 설 명 : 기준 지도 이동에 따른 영역 박스
	 * 인 자 : xy (GBounds 객체)
	 * 사용법 : applyBox(bounds)
	 * 작성일 : 2011.04.26
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.26		최원석		최초 생성
	 * 								
	 **********************************************************************************/
     moveBox: function (xy) {
    	 var startX = this.dragHandler.start.x;
         var startY = this.dragHandler.start.y;
         var deltaX = Math.abs(startX - xy.x);
         var deltaY = Math.abs(startY - xy.y);

         var offset = this.getBoxOffsets();
         this.zoomBox.style.width = (deltaX + offset.width + 1) + "px";
         this.zoomBox.style.height = (deltaY + offset.height + 1) + "px";
         this.zoomBox.style.left = (xy.x < startX ?
             startX - deltaX - offset.left : startX - offset.left) + "px";
         this.zoomBox.style.top = (xy.y < startY ?
             startY - deltaY - offset.top : startY - offset.top) + "px";
     },

	/**********************************************************************************
	 * 함수명 : endBox
	 * 설 명 : 기준 지도 이동에 따른 색인도의 영역 박스 다시 그림
	 * 인 자 : end (GPixel 객체)
	 * 사용법 : endBox(end)
	 * 작성일 : 2011.04.26
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.26		최원석		영역 지정 완료 후 다시 그리거나 초기화 전 까지 삭제 안함 
	 * 								
	 **********************************************************************************/
	endBox: function(end) {
	    var result;
	    if (Math.abs(this.dragHandler.start.x - end.x) > 5 ||    
	        Math.abs(this.dragHandler.start.y - end.y) > 5) {   
	        var start = this.dragHandler.start;
	        var top = Math.min(start.y, end.y);
	        var bottom = Math.max(start.y, end.y);
	        var left = Math.min(start.x, end.x);
	        var right = Math.max(start.x, end.x);
	        result = new OpenLayers.Bounds(left, bottom, right, top);
	    } else {
	        result = this.dragHandler.start.clone(); // i.e. OL.Pixel
	    } 
		
		if(!this.indexMap) {
			this.removeBox();
		} 

	    this.callback("done", [result]);
	},
	
	/**********************************************************************************
	 * 함수명 : deactivate
	 * 설 명 : 핸들러 비 활성화
	 * 사용법 : deactivate()
	 * 작성일 : 2011.04.26
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.26		최원석		닫기, 새로고침 시 오류 발생 수정 
	 * 								
	 **********************************************************************************/
	deactivate: function () {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            if(this.dragHandler && this.dragHandler.deactivate) this.dragHandler.deactivate();
            return true;
        } else {
            return false;
        }
    },
	
	CLASS_NAME: "NUTs.Handler.Box"
});



/*=[ Path.js ]==========================================================================*/

NUTs.Handler.Path = OpenLayers.Class(OpenLayers.Handler.Path, {
	
	attributes : null,
	
	finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone(), this.attributes]);
        if(cancel || !this.persist) {
            this.destroyFeature();
        }
    },
    
    mousedown: function(evt) {
        // ignore double-clicks
        if (this.lastDown && this.lastDown.equals(evt.xy)) {
            return false;
        }
        if(this.lastDown == null) {
            if(this.persist) {
                this.destroyFeature();
            }
            this.createFeature(evt.xy);
        } else if((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
            this.addPoint(evt.xy);
        }
        this.mouseDown = true;
        this.lastDown = evt.xy;
        this.drawing = true;
        
        //mousedown callback 추가
        this.callback("mousedown", [this.point.geometry, this.getGeometry()]);
        
        //마우스 우클릭 일때 실행
        if(evt.button == "2") {
			this.rightclick(evt);
	        return true;
		}
        
        return false;
    },
    
    rightclick: function(evt) {
    	this.dblclick(evt);
    	return false;
    },
    
    mouseup: function (evt) {
        this.mouseDown = false;
        if(this.drawing) {
            if(this.freehandMode(evt)) {
                this.removePoint();
                this.finalize();
            } else {
                if(this.lastUp == null) {
                   this.addPoint(evt.xy);
                }
                this.lastUp = evt.xy;
            }
            
            //mouseup callback 추가
            this.callback("mouseup", [this.point.geometry, this.getGeometry()]);
            
            return false;
        }
        
        //mouseup callback 추가
        if(this.point && this.point.geometry && this.getGeometry()) {
        	this.callback("mouseup", [this.point.geometry, this.getGeometry()]);
        }
        
        return true;
    },
    
    finish : function() {
    	var index = this.line.geometry.components.length - 1;
        this.line.geometry.removeComponent(this.line.geometry.components[index]);
        this.removePoint();
        this.finalize();
        return false;
    },
    
	/**********************************************************************************
	 * 함수명 : addPoint
	 * 설 명 : LinearRing에 point 추가, 
	 * 			교차옵션-'교차' 사용여부에 따라 입력 point기준으로 생성된 path를 divide 처리
	 * 			교차옵션-'상월' 사용여부에 따라 입력 point기준으로 생성된 path와 교차하는 line 발견시 교차점을 기준으로 상월처리
	 * 인 자 : pixel (사용자 입력지점의 OpenLayers.Pixel)
	 * 사용법 : addPoint(pixel)
	 * 수정일			수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.08.29		윤은희			최초 생성
	 **********************************************************************************/
    addPoint: function(pixel) {
    	// 객체 추가시, 교차옵션적용[교차,상월,하월]
    	var DrawPath = NUTs.Edit.Control.DrawPath;
    	if(DrawPath.mode && DrawPath.crossOption !== 'cut'){
    		!DrawPath.forDivideFeature ? DrawPath.forDivideFeature = this.line.clone() : DrawPath.forDivideFeature.geometry.components.push(this.point.geometry.clone());	
    	}    	
    	
    	this.layer.removeFeatures([this.point]);
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel); 
        this.point = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat)
        );
        this.line.geometry.addComponent(
            this.point.geometry, this.line.geometry.components.length
        );
        this.layer.addFeatures([this.point]);
        this.callback("point", [this.point.geometry, this.getGeometry()]);
        this.callback("modify", [this.point.geometry, this.getSketch()]);
        this.drawFeature();
        delete this.redoStack;
        
        this.replaceStartPoint = function(_nX, _nY){
        	for(var i=0, len=this.line.geometry.components.length; i<len; i++){
				if((this.point.geometry.x === this.line.geometry.components[i].x) && (this.point.geometry.y === this.line.geometry.components[i].y)){
					this.line.geometry.components[i].x = _nX;
					this.line.geometry.components[i].y = _nY;
				}
			}
			this.layer.features[3].geometry.x = _nX;
			this.layer.features[3].geometry.y = _nY;        						
			this.point = this.layer.features[3];
        }

		this.newCoordinates = function(sx, sy, nx, ny, flag){			// 시작점 X좌표, 시작점 Y좌표, 다음점 X좌표, 다음점 Y좌표, dist 연산 여부
			var objResult = {};			// 거리와 각을 이용해서 계산한 새로운 좌표점(x,y)
			var nGap = 0.5; 			// 50cm
			var nDist = 0;
			var nAngle = NUTs.Util.fn_get_angleBy2Dist((ny-sy), (nx-sx));							//현재지점과 다음지점과의 각
			
			nDist = flag ? NUTs.Util.fn_get_DistanceBy2Point(sx, sy, nx, ny)-nGap : nGap;		//현재지점과 다음지점과의 거리
			objResult.x = sx + nDist * Math.cos(nAngle);
			objResult.y = sy + nDist * Math.sin(nAngle);

			return objResult;
		}

		
        // 객체 추가시, 교차옵션적용[교차, 상월, 하월] : path의 segment마다 교차옵션 적용하여 처리함.
        if(DrawPath.mode && DrawPath.crossOption !== 'cut'){
        	var sEditLayer = COMMON.fn_get_editingLayer();
        	if(DrawPath.forDivideFeature && DrawPath.forDivideFeature.geometry.components.length > 1){			

        		// intersect판단은 tolerance가 적용된 가상의 지점과 교차여부 판단하도록 처리함.
        		// 교차점에 일정 tolerance를 줘서 이전 입력 point 지점은 교차점 판단 지점에서 제외되도록 처리함. intersect 연산을 위해서만 사용함. 
        		var oTmpPointFeatureForCalc = DrawPath.forDivideFeature.clone();
        		var sx, sy, nx, ny, angle, nDist;

        		sx = oTmpPointFeatureForCalc.geometry.components[0].x;			//시작점 X좌표
        		sy = oTmpPointFeatureForCalc.geometry.components[0].y;			//시작점 Y좌표
        		nx = oTmpPointFeatureForCalc.geometry.components[1].x;			//다음점 X좌표
        		ny = oTmpPointFeatureForCalc.geometry.components[1].y;			//다음점 Y좌표
        		nDist = NUTs.EditRule.tolerance;

        		angle = NUTs.Util.fn_get_angleBy2Dist((ny-sy), (nx-sx));					
        		oTmpPointFeatureForCalc.geometry.components[0].x = sx + nDist * Math.cos(angle);
        		oTmpPointFeatureForCalc.geometry.components[0].y = sy + nDist * Math.sin(angle);

        		var oIntersectsGeom = NUTs.EditRule.checkRelationGeometry(oTmpPointFeatureForCalc, sEditLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
        		if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false && oIntersectsGeom.data.length === 1){
        			if(oIntersectsGeom.data[0].results.length >= 2){
        				// 방금 입력점 삭제 : this.line(=this.layer.feature.geometry.components중 3번째 item이랑 동일)에 동일점이 두번 add되어 있는데 둘다 삭제하지 않고 먼저 add한 점만 삭제해야 하므로
        				var index = this.line.geometry.components.length - 2;
        				this.line.geometry.removeComponent(this.line.geometry.components[index]);
        				this.removePoint();

        				if(this.line.geometry.components.length > 1)
        					this.drawFeature();

        				var index = DrawPath.forDivideFeature.geometry.components.length - 1;        				
        				OpenLayers.Util.removeItem(DrawPath.forDivideFeature.geometry.components, DrawPath.forDivideFeature.geometry.components[index]);        				

        				NUTs.Util.showMessage('편집오류 &  ' + sEditLayer + '를 2개 이상 만나면 처리를 할 수 없습니다.');
        			}
        			else{        				
        				// 입력 feature의 시작점과 intersect된 객체와의 거리가 입력 feature의 끝점보다 가깝고 tolerance보다 작으면, 시작점이 접점(ex. 스냅을 걸었을 경우)에 해당하므로 divide 수행하지 않음.	    							
        				var oSPointGeom = NUTs.GeoJson.getGeoJson('Point', DrawPath.forDivideFeature.geometry.components[DrawPath.forDivideFeature.geometry.components.length-2]);	    							
        				var oEPointGeom = NUTs.GeoJson.getGeoJson('Point', DrawPath.forDivideFeature.geometry.components[DrawPath.forDivideFeature.geometry.components.length-1]);	    							
        				var oCompLineStringGeom = NUTs.GeoJson.getGeoJson('LineString', oIntersectsGeom.data[0].results[0].feature.geometry.components);

        				var nSCompDist = NUTs.JSTSOperator.Distance(oCompLineStringGeom, oSPointGeom);
        				var nECompDist = NUTs.JSTSOperator.Distance(oCompLineStringGeom, oEPointGeom);

        				// if(nSCompDist < EditRule.tolerance)이면, 접점(ex. 스냅을 걸었을 경우)에 해당하는 경우이며 이때는 'do nothing'
        				if((nSCompDist > nECompDist) || (nSCompDist < nECompDist && nSCompDist > NUTs.EditRule.tolerance)){
        					switch(DrawPath.crossOption){
        					case 'cross' : 
        									// #0. 입력선분할
        									var aDividedPosList = [], aDividedFrontPosList;
			        						if(DrawPath.forDivideFeature.geometry.components.length > 2) 
						        			{
			        							var oTmpCloneCal = DrawPath.forDivideFeature.geometry.clone();
			        							var oTmpCloneResult = DrawPath.forDivideFeature.geometry.clone();
			        							for(var i=0, len=oTmpCloneCal.components.length-2; i<len; i++){	// 입력선의 마지막 segment를 가지고 분할 연산하는데 사용
			        								OpenLayers.Util.removeItem(oTmpCloneCal.components, oTmpCloneCal.components[0]);
			        							}
			        							aDividedPosList = editor.getDivideLine(oTmpCloneCal.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
			        							
			        							// 분할 결과(aDividedPosList)를 입력선(oTmpCloneResult)에 합치기
			        							var aTmpDividedPosList = [];
			        							for(var j=0, jLen=oTmpCloneResult.components.length-1; j<jLen; j++){	// 마지막 점은 분할 객체 중 2번째 분할 객체의 끝점에 해당하므로 제외시킴 
			        								aTmpDividedPosList.push([oTmpCloneResult.components[j].x, oTmpCloneResult.components[j].y]);
			        							}			        		    				
			        							aTmpDividedPosList.push(aDividedPosList[0][aDividedPosList.length-1]);		// 분할 객체 중 1번째 선분의 끝점
			        							aDividedFrontPosList = aTmpDividedPosList;
					        				}
			        						else{
			        							aDividedPosList = editor.getDivideLine(DrawPath.forDivideFeature.geometry.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
			        							aDividedFrontPosList = aDividedPosList[0];
			        						}

			        						// #1. divided 객체(입력된 line feature)는 신규 관로로 (편집모니터에) 추가.
			        						var sG2Id = MAP_EDITOR.fn_get_newG2Id();
			        						var oGInnerFeature = editor.makeFeatureByPosList('linestring', aDividedFrontPosList, sEditLayer.concat('.', sG2Id));
			        						editor.addDrawFeature(editor.editLayer, oGInnerFeature, sEditLayer);
			        						MAP_EDITOR.fn_add_featureToEditMonitor(oGInnerFeature, sEditLayer, sG2Id);
			
			        						// #2. this.point 좌표점을 찾아서 분할지점(교차되었던) 좌표점으로 대체			        						
			        						var aDividedFrontObjEndPoint = aDividedFrontPosList[aDividedFrontPosList.length-1];
			        						this.replaceStartPoint(aDividedFrontObjEndPoint[0], aDividedFrontObjEndPoint[1]);
			        						this.drawFeature();
			
			        						// #3. 교차된 기존 시설물(oIntersectsGeom) divide 수행
			        						var oGFeatureForDivideBaseLine, oGInnerFeatureForDivideTarget;
			        						var sFId = MAP_EDITOR.fn_get_fidByFeature(DrawPath.forDivideFeature);
			        						if(DrawPath.forDivideFeature.geometry.components.length > 2){
			        							var oTmpCloneCal = MAP_EDITOR.fn_clone_featureToGInnerFeature(DrawPath.forDivideFeature);			        							
			        							for(var i=0, len=oTmpCloneCal.geometry.components.length-2; i<len; i++){	// 입력선의 마지막 segment를 가지고 분할 연산하는데 사용
			        								OpenLayers.Util.removeItem(oTmpCloneCal.geometry.components, oTmpCloneCal.geometry.components[0]);
			        							}			        							
			        							oGFeatureForDivideBaseLine = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(oTmpCloneCal, sFId, oTmpCloneCal.state);
			        						}
			        						else{
			        							oGFeatureForDivideBaseLine = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(DrawPath.forDivideFeature, sFId, DrawPath.forDivideFeature.state);				        										        						
			        						}
			        						editor.addUnDrawFeature(editor.refLayer, oGFeatureForDivideBaseLine.feature);
			        						oGInnerFeatureForDivideTarget = oIntersectsGeom.data[0].results[0].feature;
			        						editor.divideLine(oGFeatureForDivideBaseLine, oGInnerFeatureForDivideTarget);
			        						
			        						break;
        					case 'over' :
		        						// #1. 선 분할
		        						var aDividedPosList = editor.getDivideLine(DrawPath.forDivideFeature.geometry.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
		        						var aDividedFrontPosList = aDividedPosList[0];
		        						var aDividedBackPosList = aDividedPosList[1];
		
		        						// 분할된 첫번째 선의 끝 segment 정보 가져오기
		        						var aFrontPoint1 = aDividedFrontPosList[aDividedFrontPosList.length-2];  		// 끝 segment 시작점
		        						var aFrontPoint2 = aDividedFrontPosList[aDividedFrontPosList.length-1];		// 끝 segment 끝점
		
		        						// 분할된 두번째 선의 첫번째 segment 정보 가져오기
		        						var aBackPoint1 = aDividedBackPosList[0];  		// 첫 segment 시작점
		        						var aBackPoint2 = aDividedBackPosList[1];			// 첫 segment 끝점
		
		        						// #2. 교차점 찾아서 상월 geometry 생성
		        						var oForDivideLineStringGeom = NUTs.GeoJson.getGeoJson('LineString', DrawPath.forDivideFeature.geometry.components);
		        						var oCrossPoint = NUTs.JSTSOperator.Intersection(oForDivideLineStringGeom, oCompLineStringGeom);
		
		        						if(oCrossPoint.coordinate){
		        							var nAngle = NUTs.Util.fn_get_angleToDegreeByDist((aFrontPoint2[1]-aFrontPoint1[1]), (aFrontPoint2[0]-aFrontPoint1[0]));	// fn_get_angleToDegreeByDist((ny-sy), (nx-sx));
		        							var oOpt = {
		        									cx : oCrossPoint.coordinate.x,
		        									cy : oCrossPoint.coordinate.y,
		        									radius : 5,
		        									startAngle : nAngle+180,	// Degree (생성시킬 arc를 입력 geometry의 진행방향으로 poslist를 생성하기 위한 start 각도)
		        									endAngle :  nAngle,		// Degree
		        									segments : 10
		        							};
		        							var oFeatureArc = editor.getArcFeature(new OpenLayers.Geometry.Point(oOpt.cx,oOpt.cy), oOpt.radius, oOpt.startAngle, oOpt.endAngle, oOpt.segments);
		
		        							// 입력선의 마지막 segment의 시작점 - 여기가 교체 시작지점
		        							var oSeg1 = DrawPath.forDivideFeature.geometry.components[DrawPath.forDivideFeature.geometry.components.length-2];
		
		        							// 생성된 상월을 교차점이 존재하는 입력선 segment에 merge
		        							for(var i=0, len=this.line.geometry.components.length; i<len; i++){
		        								if((oSeg1.x === this.line.geometry.components[i].x) && (oSeg1.y === this.line.geometry.components[i].y)){
		        									var aCompo1=[], aCompo2=[];
		        									if(len === 3){												// 사용자 입력선(DrawPath.forDivideFeature)이 1개의 segment만 가지고 있었을경우, this.line은 중복점이 존재하므로 length=3임
		        										aCompo1.push(this.line.geometry.components[0]);
		        										aCompo2 = this.line.geometry.components.slice(1, this.line.geometry.components.length);
		        									}
		        									else{
		        										aCompo1 = this.line.geometry.components.slice(0,i+1);
		        										aCompo2 = this.line.geometry.components.slice(i+1, this.line.geometry.components.length);
		        									}
		
		        									for(var j=0, jLen=oFeatureArc.geometry.components.length; j<jLen; j++){
		        										aCompo1.push(oFeatureArc.geometry.components[j]);
		        									}
		        									this.line.geometry.components = aCompo1.concat(aCompo2);
		        									
		        									break;
		        								}
		        							}
		        						}
		        						
		        						break;
        					case 'under' : break;
        					}
        					
        					// 초기화
            				var oPointGeomClone = this.point.geometry.clone();
            				DrawPath.forDivideFeature.geometry.components = [];
            				DrawPath.forDivideFeature.geometry.components.push(oPointGeomClone);
        				}
        			}
        		}
        	}
        }


    },
    CLASS_NAME: "NUTs.Handler.Path"
});



/*=[ PathMeasure.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : PathMeasure.js
 * 설 명 : 거리 측정을 위한 클래스
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자		Function 명
 * --------------------------------------------------------------------------------
 * 2010-04-05     	최원석		거리 측정 실행 시 결과 출력까지의 딜레이 생기는 부분을 수정하기 위해서 OpenLayers.Control.Measure 클래스의 거리 측정하는 것을 참고로 함수(measureDistance)를 생성
 *	 							거리 측정 실행 결과 중간 지점마다 팝업으로 생성하는 부분 추가
 * 							  	거리 측정 실행 후 다른 컨트롤을 실행하더라도 결과창이 없어지지 않게 수정
 * 2010-04-07		최원석		지도위의 DIV 클릭 시에도 거리가 찍히는 현상을 위해 수정(마우스 업의 내용을 마우스 다운으로 옮김)
 * 2010-06-21     	최원석		거리 계산을 MeasureControl이 아닌 이 객체에서 바로 하도록 수정
 * 2010-10-01     	최원석		거리 측정 조건을 외부 옵션을 통해 조절이 가능하도록 수정
 * 							  	소스 및 주석 정리
 * 2011-04-22		최원석		GMAP API 작업으로 인해 수정 및 정리
 * 2012-06-05		최원석		부분거리 추가, 이동 시 팝업 UI 변경
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/


/**************************************************************************************

 *  
 ***************************************************************************************/

NUTs.Handler.PathMeasure = OpenLayers.Class(OpenLayers.Handler.Path, {
	/*
	 * 외부에서 사용하던 팝업을 내부로 이동
	 */
	popup : null,
	
	/**
	 * 마우스 이동 시 팝업 생성 여부
	 */
	movePopup : true,
	
	/**
	 * 중간 거리
	 */
	partDist : [],
	
	/**********************************************************************************
	 * 함수명 : measureDistance
	 * 설 명 : 지도에서 그린 선의 거리를 계산한다.
	 * 사용법 : measureDistance()
	 * 작성일 : 2010.06.21
	 *
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010-06-21		최원석		최초 생성
	 * 
	 **********************************************************************************/ 
	measureDistance : function(geometry) {
		//geometry.getLength() - geometry의 거리를 구함
		var subLength = geometry.getLength();
		//단위 계산을 위해 tempLength로 거리를 저장
    	var tempLength = subLength;
    	//기본 거리 단위
    	var unit = "";
    	
    	//tempLength 에 km 단위를 적용
    	tempLength *= (OpenLayers.INCHES_PER_UNIT["m"] / OpenLayers.INCHES_PER_UNIT['km']);
        
    	//km 단위를 적용 후 거리가  1km 이상일 경우 km 단위를 사용 
        if(tempLength > 1) {
        	subLength = tempLength.toFixed(2);
        	unit = "km";
        }
        else {
        	subLength = subLength.toFixed(2);
        	unit = "m";
        }
        
        //계산 결과 값을 리턴
		return [subLength, unit];
	},
	
	/**********************************************************************************
	 * 함수명 : measureDistancePart
	 * 설 명 : 지도에서 그린 마지막 선의 거리를 계산한다.
	 * 사용법 : measureDistancePart()
	 * 작성일 : 2012.06.05
	 *
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2012.06.05		최원석		최초 생성
	 * 
	 **********************************************************************************/ 
	measureDistancePart : function() {
		// 현재 거리 측정에 사용된 geometry값의 복사본을 가져옴
		var geometry = this.geometryClone();
		
		//마지막 선분 추출
		var vertices = geometry.getVertices();
		var points = [
		    new OpenLayers.Geometry.Point(vertices[vertices.length-2].x, vertices[vertices.length-2].y),
		    new OpenLayers.Geometry.Point(vertices[vertices.length-1].x, vertices[vertices.length-1].y)
		];
		var lineString = new OpenLayers.Geometry.LineString(points);
		
		return this.measureDistance(lineString);		
	},
	
	/**********************************************************************************
	 * 함수명 : measureDistanceAll
	 * 설 명 : 지도에서 그린 전체 선의 거리를 계산한다.
	 * 사용법 : measureDistanceAll()
	 * 작성일 : 2012.06.05
	 *
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2012.06.05		최원석		최초 생성
	 * 
	 **********************************************************************************/ 
	measureDistanceAll : function() {
		// 현재 거리 측정에 사용된 geometry값의 복사본을 가져옴
		var geometry = this.geometryClone();
		
		return this.measureDistance(geometry);		
	},
	
	/**********************************************************************************
	 * 함수명 : mousedown
	 * 설 명 : 지도에서 마우스 다운 이벤트가 발생할 때 실행되는 함수
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : mousedown(evt)
	 * 
	 * 작성일 : 2010.06.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.06.21		최원석		최초 생성
	 * 								마우스 다운 시 feature, popup 생성
	 * 2011.04.25		최원석		지도 API 작업에 맞게 수정								
	 * 
	 **********************************************************************************/
	mousedown: function(evt) {
		if (this.lastDown && this.lastDown.equals(evt.xy)) {
	        return false;
	    }
		if(this.lastDown == null) {
	    	// 멀티 라인일 경우 이전 측정 결과를 삭제 하지 않음
			if(!this.multiLine) {
				if(this.persist) { this.destroyFeature();  }
				this.removePopup();
			}
	        this.createFeature(evt.xy);
	    } else if((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
	        this.addPoint(evt.xy);
	    }
	    this.lastDown = evt.xy;
	    this.drawing = true;
		
		//마우스 다운 시 생성 되도록 mouseup 의 소스를 이동
        if(this.freehandMode(evt)) {
            this.removePoint();
            this.finalize();
        } else {
            if(this.lastUp == null) {
               this.addPoint(evt.xy);
            }
            this.lastUp = evt.xy;
        }
        
        //point Feature를 나타낼 지도 좌표를 구함
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
        
        //point Feature 생성
    	var pointFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
    	pointFeature.type = "measure" + GPathMeasureINDEX;
    	//point Feature 등록
    	this.layer.addFeatures(pointFeature);
    	
		var popup;
    	//처음 일 경우 시작 메시지 팝업창 생성
        if(!this.count) {
			var contentHtml = "<div id='measureStart' class='olControlMeasurePopup olControlMeasurePopupStart'><span class='MeasureColor'>시작</span></div>";
			popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
			
			if(this.movePopup) {
				contentHtml = '<div class="olControlMeasureContent">'
					+ '<div class="measureDist" >'
					+ '<span class="measureResTit">상대거리</span>'
					+ '<span class="measureResCon"></span>'
					+ '<span class="measureResUnit"></span>'
					+ '</div>'
					+ '<div class="MeasureAllDist" >'
					+ '<span class="measureResTit">총거리</span>'
					+ '<span class="measureResCon"></span>'
					+ '<span class="measureResUnit"></span>'
					+ '</div>'
					+ '<div class="MeasureEndDescript">마우스 오른쪽 버튼을 누르시면 끝마칩니다</div>'
					+ '</div>';
	        	this.popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(15,5));
	
	        	this.map.addPopup(this.popup);
				
				this.popup.updateSize();
				this.popup.type = "measure" + GPathMeasureINDEX;
			}
			
	    	//클릭 횟수 저장 변수를 생성 및 초기화
            this.count = 1;
	    }
        //처음 클릭이 아닐 경우
	    else {
	    	contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupDefault'><span class='MeasureColor'>"+ this.partDist[0] + "</span> " + this.partDist[1] + "</div>";
	    	popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
	    	//클릭 횟수 증가
            this.count += 1;
	    }
		
		if (popup) {
			this.map.addPopup(popup);
			popup.type = "measure" + GPathMeasureINDEX;
			popup.updateSize();
		}
        
        //마우스 우클릭 일때 실행
        if(evt.button == "2") {
			this.rightclick(evt);
	        return true;
		}
        
        /* 거리 계산 결과 출력 팝업 추가 끝 */
        return false;
	},
	
	addPoint: function(pixel) {
        this.layer.removeFeatures([this.point]);
        var lonlat = this.control.map.getLonLatFromPixel(pixel);
        this.point = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat)
        );
        this.line.geometry.addComponent(
            this.point.geometry, this.line.geometry.components.length
        );
        this.callback("point", [this.point.geometry, this.getGeometry()]);
        this.callback("modify", [this.point.geometry, this.getSketch()]);
        this.line.type = "measure" + GPathMeasureINDEX;
        this.drawFeature();
    },
	
	/**********************************************************************************
	 * 함수명 : mousemove
	 * 설 명 : 마우스 이동 이벤트
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : mousemove(evt)
	 * 
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		측정 결과를 마우스 포인터를 따라 다니게 한다.
	 * 
	 **********************************************************************************/
	mousemove: function (evt) {
        if(this.drawing) { 
            if(this.mouseDown && this.freehandMode(evt)) {
                this.addPoint(evt.xy);
            } else {
                this.modifyFeature(evt.xy);
				
				//팝업을 마우스 포인터를 따라 다니게 한다.
				if(this.popup) {
					var resDist = this.measureDistancePart();
					var allDist = this.measureDistanceAll();
					$(this.popup.contentDiv).find(".measureDist .measureResCon").text(resDist[0]);
					$(this.popup.contentDiv).find(".measureDist .measureResUnit").text(" " + resDist[1]);
					$(this.popup.contentDiv).find(".MeasureAllDist .measureResCon").text(allDist[0]);
					$(this.popup.contentDiv).find(".MeasureAllDist .measureResUnit").text(" " + allDist[1]);
					this.partDist = this.measureDistancePart();
					this.popup.updateSize();
					evt.xy.x -= $(this.popup.div).parent().offset().left;
					evt.xy.y -= $(this.popup.div).parent().offset().top;
	                this.popup.moveTo(evt.xy);	
				}
            }
        }
        return true;
    },
	
	/**********************************************************************************
	 * 함수명 : rightclick
	 * 설 명 : 마우스 우 클릭 시 거리 측정 종료
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : rightclick(evt)
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		최원석		최초 생성
	 * 
	 **********************************************************************************/
	rightclick: function(evt) {
    	this.dblclick(evt);
    	return false;
    },
	
	/**********************************************************************************
	 * 함수명 : dblclick
	 * 설 명 : 더블 클릭 시 거리 측정 종료.
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : dblclick(evt)
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		최원석		마우스 포인터에 따라다니는 팝업 삭제
	 * 
	 **********************************************************************************/
	dblclick: function(evt) {
		if(this.map.popups[this.map.popups.length-1].type == "measure") {
			this.map.removePopup(this.map.popups[this.map.popups.length-1]);
		}
		
		//point Feature를 나타낼 지도 좌표를 구함
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
        var allDist = this.measureDistanceAll();
		var contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupEnd'>총거리 : <span class='MeasureColor'>"+ allDist[0] + "</span> " + allDist[1] + "</div>";
	    var popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
		this.map.addPopup(popup);
		popup.type = "measure" + GPathMeasureINDEX;
		popup.updateSize();
		
		//현재 결과 삭제
		/*contentHtml = '<div class="olControlMeasureClose"><input type="hidden" value="measure' + GPathMeasureINDEX + '" /><img src="/images/egovframework/ginnoframework/gmap/draw/measureClose.gif" alt="닫기" /></div>';
		var closePopup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(7,-7));
		this.map.addPopup(closePopup);
		closePopup.type = "measure" + GPathMeasureINDEX;
		closePopup.updateSize();*/
		
		var gmap = this.layer.map;
		$(".olControlMeasureClose").click(function() {
			var remTyp = $(this).find("input").val();
			
			var map = gmap;
			var popups = map.popups;
			for(var i=map.layers.length-1; i >= 0; i--) {
				if(map.layers[i].type == "measure") {
					for(var j=map.layers[i].features.length-1; j >= 0; j--) {
						if(map.layers[i].features[j].type == remTyp) {
							map.layers[i].removeFeatures(map.layers[i].features[j]);
						}
					}
				}
			}
			
			for(var i = popups.length-1; i >= 0; i--) {
				if(popups[i].type == remTyp) {
					map.removePopup(popups[i]);
				}
			}
		});
		
		//팝업 최대 수 증가
		GPathMeasureINDEX++;
		
		// 더블클릭시 클릭 카운트 초기화
		this.count = 0;
        if(!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 1;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            this.removePoint();
            this.finalize();
        }
        
		if(this.popup) {
			this.map.removePopup(this.popup);
			this.popup = null;
		}

        return false;
    },
    
    activate: function() {
        if(!OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            return false;
        }
        // create temporary vector layer for rendering geometry sketch
        // TBD: this could be moved to initialize/destroy - setting visibility here
        var options = OpenLayers.Util.extend({
            displayInLayerSwitcher: false,
            // indicate that the temp vector layer will never be out of range
            // without this, resolution properties must be specified at the
            // map-level for this temporary layer to init its resolutions
            // correctly
            calculateInRange: OpenLayers.Function.True
        }, this.layerOptions);
        this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, options);
        this.layer.type = "measure";
        this.map.addLayer(this.layer);
        
        return true;
    },
    
 	 /**********************************************************************************
	 * 함수명 : deactivate
	 * 설 명 : 컨트롤 비 활성화
	 * 사용법 : deactivate()
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		최원석		컨트롤 비 활성 화 시 측정 결과 유지
	 * 
	 **********************************************************************************/
    deactivate: function() {
		 
		if(this.drawing) {
			//alert('거리 측정 기능 종료 후 실행하여 주십시오.');
			return false;
		}
		 
        if(!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        // call the cancel callback if mid-drawing
        if(this.drawing) {
            this.cancel();
        }
        //this.destroyFeature();
        
        // If a layer's map property is set to null, it means that that layer
        // isn't added to the map. Since we ourself added the layer to the map
        // in activate(), we can assume that if this.layer.map is null it means
        // that the layer has been destroyed (as a result of map.destroy() for
        // example.

        //컨트롤 비 활성 시 측정 결과 유지 여부
        if(!this.persistControl) {
        	this.layer.destroy(false);
			this.removePopup();
        }
        
        this.layer = null;
        return true;
    },
	
	/**********************************************************************************
	 * 함수명 : removePopup
	 * 설 명 : 측정 팝업 삭제
	 * 사용법 : removePopup()
	 * 
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		측정 결과 팝업 삭제
	 * 
	 **********************************************************************************/
	removePopup : function() {
		var len = this.map.popups.length;
		for(var i=len-1; i >= 0; i--) {
			if(this.map.popups[i].type == "measure") {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
    CLASS_NAME: "NUTs.Handler.PathMeasure"
});

GPathMeasureINDEX = NUTs.Handler.PathMeasure.INDEX = 0;





/*=[ Point.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : Point.js
 * 설 명 : 그리기도구 점 그리기
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.26		최원석				0.1					최초 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Handler.Point = OpenLayers.Class(OpenLayers.Handler.Point, {
	
	attributes : null,
	
	finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone(), this.attributes]);
        if(cancel || !this.persist) {
            this.destroyFeature();
        }
    },

	CLASS_NAME: "NUTs.Handler.Point"
});



/*=[ Polygon.js ]==========================================================================*/

NUTs.Handler.Polygon = OpenLayers.Class(OpenLayers.Handler.Polygon, {
	
	attributes : null,
	
	finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone(), this.attributes]);
        if(cancel || !this.persist) {
            this.destroyFeature();
        }
    },
    
    mousedown: function(evt) {
        // ignore double-clicks
        if (this.lastDown && this.lastDown.equals(evt.xy)) {
            return false;
        }
        if(this.lastDown == null) {
            if(this.persist) {
                this.destroyFeature();
            }
            this.createFeature(evt.xy);
        } else if((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
            this.addPoint(evt.xy);
        }
        this.mouseDown = true;
        this.lastDown = evt.xy;
        this.drawing = true;
        
        //mousedown callback 추가
        this.callback("mousedown", [this.point.geometry, this.getGeometry()]);
        
        return false;
    },

    mouseup: function (evt) {
        this.mouseDown = false;
        if(this.drawing) {
            if(this.freehandMode(evt)) {
                this.removePoint();
                this.finalize();
            } else {
                if(this.lastUp == null) {
                   this.addPoint(evt.xy);
                }
                this.lastUp = evt.xy;
            }
            
            //mouseup callback 추가
            this.callback("mouseup", [this.point.geometry, this.getGeometry()]);
            
            return false;
        }
        
        //mouseup callback 추가
        this.callback("mouseup", [this.point.geometry, this.getGeometry()]);
        
        return true;
    },
	
	CLASS_NAME: "NUTs.Handler.Polygon"
});



/*=[ PolygonDraw.js ]==========================================================================*/

NUTs.Handler.PolygonDraw = OpenLayers.Class(OpenLayers.Handler.Polygon, {
	
	attributes : null,
	
	finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone(), this.attributes]);
        if(cancel || !this.persist) {
            this.destroyFeature();
        }
    },
	
	CLASS_NAME: "NUTs.Handler.PolygonDraw"
});



/*=[ PolygonMeasure.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : PolygonMeasure.js
 * 설 명 : 면적 측정을 위한 클래스
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자		Function 명
 * --------------------------------------------------------------------------------
 * 2010-04-05     최원석       	면적 측정 실행 시 결과 출력까지의 딜레이 생기는 부분을 수정
 * 							  	measureArea 함수 생성
 * 							  	면적 측정 실행 후 다른 컨트롤을 실행하더라도 결과창이 없어지지 않게 수정
 * 2010-05-13     최원석 		  	지도위의 DIV 클릭 시에도 거리가 찍히는 현상을 위해 수정(마우스 업의 내용을 마우스 다운으로 옮김)		  
 * 2010-10-01     최원석		  	면적 측정 조건을 외부 옵션을 통해 조절이 가능하도록 수정
 * 							  	소스 및 주석 정리
 * 2011-04-22		최원석		GMAP API 작업으로 인해 수정 및 정리
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Handler.PolygonMeasure = OpenLayers.Class(OpenLayers.Handler.Polygon, {
	/*
	 * 외부에서 사용하던 팝업을 내부로 이동
	 */
	popup : null,
	
	/**********************************************************************************
	 * 함수명 : measureArea
	 * 설 명 : 지도에서 그린 선의 면적를 계산한다.
	 * 사용법 : measureArea()
	 * 작성일 : 2010.06.21
	 *
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010-06-21		최원석		최초 생성
	 * 
	 **********************************************************************************/ 
	measureArea : function() {
		//현재 거리 측정에 사용된 geometry값의 복사본을 가져옴
		var geometry = this.geometryClone();
		
		//geometry.getArea() - geometry의 면적을 구함
		var subLength = geometry.getArea();
		//단위 계산을 위해 tempLength로 거리를 저장
		var tempLength = subLength;
		
		//tempLength 에  km의 제곱 단위를 적용
		tempLength *= Math.pow(OpenLayers.INCHES_PER_UNIT["m"] / OpenLayers.INCHES_PER_UNIT['km'], 2);
	    
		//km의 제곱 단위를 적용 후 결과가 1 이상일 경우에만 km 제곱 단위를 사용
	    if(tempLength > 1) subLength = tempLength.toFixed(2) + "km" + "<sup>2</" + "sup>";
	    //그렇지 않을 경우 m 단위를 사용
	    else subLength = subLength.toFixed(2) + "m" + "<sup>2</" + "sup>";
	    
	    //계산 결과 값을 리턴
		return subLength;
	},


	/**********************************************************************************
	 * 함수명 : mousedown
	 * 설 명 : 지도에서 마우스 다운 이벤트가 발생할 때 실행되는 함수
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : mousedown(evt)
	 * 
	 * 작성일 : 2010.06.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010-06-21   	최원석       	지도에 마우스 다운 이벤트에 PointFeature 생성.	
	 *                          	선택한 지점과 조금의 거리를 둔 곳에 팝업 생성
	 * 2011.04.25		최원석		지도 API 작업에 맞게 수정								
	 * 
	 **********************************************************************************/
	mousedown: function(evt) {
		if (this.lastDown && this.lastDown.equals(evt.xy)) {
	       return false;
	    }
		if(this.lastDown == null) {
	    	// 멀티 라인일 경우 이전 측정 결과를 삭제 하지 않음
			if(!this.multiLine) {
				if(this.persist) { this.destroyFeature();  }
				this.removePopup();
			}
	        this.createFeature(evt.xy);
	    } else if((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
	        this.addPoint(evt.xy);
	    }
	    this.lastDown = evt.xy;
	    this.drawing = true;
		
		//마우스 다운 시 생성 되도록 mouseup 의 소스를 이동
        if(this.freehandMode(evt)) {
            this.removePoint();
            this.finalize();
        } else {
            if(this.lastUp == null) {
               this.addPoint(evt.xy);
            }
            this.lastUp = evt.xy;
        }
		
		//point Feature를 나타낼 지도 좌표를 구함
	    var lonlat = this.map.getLonLatFromPixel(evt.xy);
		
		//point Feature를 나타낼 지도 좌표를 구함
    	var pointFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
    	//point Feature 등록
    	this.layer.addFeatures(pointFeature);
		
		var popup;
	    /* 마우스 다운 이벤트 작동 수를 저장 */
	    if(!this.count) {
        	var contentHtml = "<div id='measureStart' class='olControlMeasurePopup olControlMeasurePopupStart'><span class='MeasureColor'>시작</span></div>";
        	popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
        	
			contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupMovePoly'>총면적 : <span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
        	this.popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
        	
        	this.map.addPopup(this.popup);
			
			this.popup.updateSize();
			this.popup.type = "measure";
			
	    	//클릭 횟수 저장 변수를 생성 및 초기화
            this.count = 1;
	    }
	    else {
			if(this.count > 1) {
				contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupDefaultPoly'><span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
	        	popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
			}

	        this.count += 1;
	    }
		
		if (popup) {
			this.map.addPopup(popup);
			popup.type = "measure";
			popup.updateSize();
		}
    	
    	//마우스 우클릭 일때 실행
    	if(evt.button == "2") {
			this.rightclick(evt);
	        return true;
		}
	    
	    return false;
	},
	
	/**********************************************************************************
	 * 함수명 : mousemove
	 * 설 명 : 마우스 이동 이벤트
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : mousemove(evt)
	 * 
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		측정 결과를 마우스 포인터를 따라 다니게 한다.
	 * 
	 **********************************************************************************/
	mousemove: function (evt) {
        if(this.drawing) { 
            if(this.mouseDown && this.freehandMode(evt)) {
                this.addPoint(evt.xy);
            } else {
                this.modifyFeature(evt.xy);
				
				//팝업을 마우스 포인터를 따라 다니게 한다.
				if(this.popup) {
					var contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupMovePoly' >총면적 : <span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
					this.popup.setContentHTML(contentHtml);
					this.popup.updateSize();
	                this.popup.moveTo(evt.xy);	
				}
            }
        }
        return true;
    },
	
	/**********************************************************************************
	 * 함수명 : rightclick
	 * 설 명 : 마우스 우 클릭 시 거리 측정 종료
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : rightclick(evt)
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		최원석		최초 생성
	 * 
	 **********************************************************************************/
	rightclick: function(evt) {
    	this.dblclick(evt);
    	return false;
    },
	
	/**********************************************************************************
	 * 함수명 : dblclick
	 * 설 명 : 더블 클릭 시 거리 측정 종료.
	 * 인 자 : evt (이벤트 객체)
	 * 사용법 : dblclick(evt)
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		최원석		마우스 포인터에 따라다니는 팝업 삭제
	 * 
	 **********************************************************************************/
	dblclick: function(evt) {
		if(this.count < 3) {
			alert('면적은 3개 이상의 지점을 선택해야 합니다.');
			return false;
		}
		
		if(this.map.popups[this.map.popups.length-1].type == "measure") {
			this.map.removePopup(this.map.popups[this.map.popups.length-1]);
		}
		
		//point Feature를 나타낼 지도 좌표를 구함
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
		
		var contentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupMovePoly' >총면적 : <span class='MeasureColor'>"+ this.measureArea() +"</span></div>";
	    var popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));
		this.map.addPopup(popup);
		popup.type = "measure";
		popup.updateSize();
		
		// 더블클릭시 클릭 카운트 초기화
		this.count = 0;
        if(!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 1;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            this.removePoint();
            this.finalize();
        }
        
		if(this.popup) {
			this.map.removePopup(this.popup);
			this.popup = null;
		}
        
        return false;
    },
    
 	 /**********************************************************************************
	 * 함수명 : deactivate
	 * 설 명 : 컨트롤 비 활성화
	 * 사용법 : deactivate()
	 * 
	 * 작성일 : 2010.04.07
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2010.04.07		최원석		컨트롤 비 활성 화 시 측정 결과 유지
	 * 
	 **********************************************************************************/
    deactivate: function() {
        if(!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        // call the cancel callback if mid-drawing
        if(this.drawing) {
            this.cancel();
        }
        //this.destroyFeature();
        
        // If a layer's map property is set to null, it means that that layer
        // isn't added to the map. Since we ourself added the layer to the map
        // in activate(), we can assume that if this.layer.map is null it means
        // that the layer has been destroyed (as a result of map.destroy() for
        // example.

        //컨트롤 비 활성 시 측정 결과 유지 여부
        if(!this.persistControl) {
        	this.layer.destroy(false);
			this.removePopup();
        }
		
        this.layer.prevLayer = true;

        this.layer = null;
        return true;
    },
	
	/**********************************************************************************
	 * 함수명 : removePopup
	 * 설 명 : 측정 팝업 삭제
	 * 사용법 : removePopup()
	 * 
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		측정 결과 팝업 삭제
	 * 
	 **********************************************************************************/
	removePopup : function() {
		var len = this.map.popups.length;
		for(var i=len-1; i >= 0; i--) {
			if(this.map.popups[i].type == "measure") {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
    CLASS_NAME: "NUTs.Handler.PolygonMeasure"
});



/*=[ RegularPolygonDraw.js ]==========================================================================*/


NUTs.Handler.RegularPolygonDraw = OpenLayers.Class(OpenLayers.Handler.RegularPolygon, {
	
	attributes : null,
	
	callback: function (name, args) {
        // override the callback method to always send the polygon geometry
        if (this.callbacks[name]) {
            this.callbacks[name].apply(this.control,
                                       [this.feature.geometry.clone(), this.attributes]);
        }
        // since sketch features are added to the temporary layer
        // they must be cleared here if done or cancel
        if(!this.persist && (name == "done" || name == "cancel")) {
            this.clear();
        }
    },

	CLASS_NAME: "NUTs.Handler.RegularPolygonDraw"
});



/*=[ RegularPolygonDrawAttr.js ]==========================================================================*/


NUTs.Handler.RegularPolygonDrawAttr = OpenLayers.Class(OpenLayers.Handler.RegularPolygon, {
	
	attributes : null,
	
	dragStartX : 0,
	
	dragStartY : 0,
	
	down: function(evt) {
        this.fixedRadius = !!(this.radius);
        var maploc = this.map.getLonLatFromPixel(evt.xy);
        this.origin = new OpenLayers.Geometry.Point(maploc.lon, maploc.lat);
        // create the new polygon
        if(!this.fixedRadius || this.irregular) {
            // smallest radius should not be less one pixel in map units
            // VML doesn't behave well with smaller
            this.radius = this.map.getResolution();
        }
        if(this.persist) {
            this.clear();
        }
        this.feature = new OpenLayers.Feature.Vector();
        this.createGeometry();
        this.callback("create", [this.origin, this.feature]);
        this.layer.addFeatures([this.feature], {silent: true});
        this.layer.drawFeature(this.feature, this.style);
        
        //point Feature를 나타낼 지도 좌표를 구함
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
        
        this.dragStartX = lonlat.lon;
        this.dragStartY = lonlat.lat;
        
        var popup;
    	//처음 일 경우 시작 메시지 팝업창 생성
		var contentHtml = "<div class='olControlMeasurePopup olControlCircleAttr'><span class='MeasureColor'>0.0m</span></div>";
    	this.popup = new NUTs.Popup("measurePopup", lonlat, null, contentHtml, new OpenLayers.Pixel(5,5));

    	this.map.addPopup(this.popup);
		
		this.popup.updateSize();
		this.popup.type = "attrCircle";
    },
    
    move: function(evt) {
        var maploc = this.map.getLonLatFromPixel(evt.xy);
        var point = new OpenLayers.Geometry.Point(maploc.lon, maploc.lat);
        if(this.irregular) {
            var ry = Math.sqrt(2) * Math.abs(point.y - this.origin.y) / 2;
            this.radius = Math.max(this.map.getResolution() / 2, ry);
        } else if(this.fixedRadius) {
            this.origin = point;
        } else {
            this.calculateAngle(point, evt);
            this.radius = Math.max(this.map.getResolution() / 2,
                                   point.distanceTo(this.origin));
        }
        this.modifyGeometry();
        if(this.irregular) {
            var dx = point.x - this.origin.x;
            var dy = point.y - this.origin.y;
            var ratio;
            if(dy == 0) {
                ratio = dx / (this.radius * Math.sqrt(2));
            } else {
                ratio = dx / dy;
            }
            this.feature.geometry.resize(1, this.origin, ratio);
            this.feature.geometry.move(dx / 2, dy / 2);
        }
        this.layer.drawFeature(this.feature, this.style);
        
        //팝업을 마우스 포인터를 따라 다니게 한다.
		if(this.popup) {
			var lonlat = this.map.getLonLatFromPixel(evt.xy);
			
			var dragEndX = Math.abs(lonlat.lon);
			var dragEndY = Math.abs(lonlat.lat);

			this.radiusDist = NUTs.Util.fn_fmt_fix(Math.sqrt(Math.pow(dragEndX-this.dragStartX,2)+Math.pow(dragEndY-this.dragStartY,2)),1);
			
			contentHtml = "<div class='olControlMeasurePopup olControlCircleAttr'><span class='MeasureColor'>" + this.measureDistance(this.radiusDist) + "</span></div>";
			this.popup.setContentHTML(contentHtml);
			this.popup.updateSize();
            this.popup.moveTo(evt.xy);	
		}
    },
    
    measureDistance : function(subLength) {
		//단위 계산을 위해 tempLength로 거리를 저장
    	var tempLength = subLength;
    	
    	//tempLength 에 km 단위를 적용
    	tempLength *= (OpenLayers.INCHES_PER_UNIT["m"] / OpenLayers.INCHES_PER_UNIT['km']);
        
    	//km 단위를 적용 후 거리가  1km 이상일 경우 km 단위를 사용 
        if(tempLength > 1) subLength = tempLength.toFixed(2) + "km";
        
        //그렇지 않을 경우 m 단위를 사용
        else subLength = subLength.toFixed(2) + "m";
        
        //계산 결과 값을 리턴
		return subLength;
	},
    
    up: function(evt) {
        this.finalize();
        // the mouseup method of superclass doesn't call the
        // "done" callback if there's been no move between
        // down and up
        if (this.start == this.last) {
            this.callback("done", [evt.xy]);
        }
    },
	
	callback: function (name, args) {
        // override the callback method to always send the polygon geometry
        if (this.callbacks[name]) {
            this.callbacks[name].apply(this.control,
                                       [this.feature.geometry.clone(), this.attributes]);
        }
        // since sketch features are added to the temporary layer
        // they must be cleared here if done or cancel
        if(!this.persist && (name == "done" || name == "cancel")) {
            this.clear();
        }
    },

	CLASS_NAME: "NUTs.Handler.RegularPolygonDrawAttr"
});



/*=[ TextDraw.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : TextDraw.js
 * 설 명 : 그리기도구 글자 그리기
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.26		최원석				0.1					최초 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Handler.TextDraw = OpenLayers.Class(OpenLayers.Handler.Point, {
	
	attributes : null,
	
	mousedown: function(evt) {
        // check keyboard modifiers
        if(!this.checkModifiers(evt)) {
            return true;
        }
        // ignore double-clicks
        if(this.lastDown && this.lastDown.equals(evt.xy)) {
            return true;
        }
        this.drawing = true;
        if(this.lastDown == null) {
            if(this.persist) {
                this.destroyFeature();
            }
            this.createFeature(evt.xy);
        } else {
            this.modifyFeature(evt.xy);
        }
        this.lastDown = evt.xy;
		
        return false;
    },
	
	mousedown: function(evt) {
	    drawObject.closeTextAddPopup();
	    
	    //화면좌표를 지도좌표로 변환
	    var lonLat = this.map.getLonLatFromPixel(evt.xy);
	    
	    var attributes = {
	    	featureType : "labelPoint"
	    }
	    
	    drawObject.textAddFeature = new OpenLayers.Feature.Vector(this.geometryClone(), attributes);
	    drawObject.layer.addFeatures(drawObject.textAddFeature);
	    
	    var popupSize = new OpenLayers.Size(376, 75);
	    var content = "<div style='width:360px;border:1px solid #768349;position:relative;padding:7px;background:#ffffff;z-index:99997'>";
	    content += "<label for='keyword' class='blind'>글씨입력</label><textarea name='keyword' id='keyword' style='width:310px;height:50px'></textarea>";
	    content += "<a href='#' style='position:absolute;bottom:8px;right:7px;'><img src='/gg_pb/images/btn/btn_ly_confirm.gif' alt='확인' class='vam' onclick='drawObject.addTextPopup()' /></a>";
	    content += "<p style='position:absolute;top:11px;right:7px;'><a href='#' onclick='drawObject.closeTextAddPopup();'><img src='/gg_pb/images/btn/btn_close2.gif' alt='닫기'  /></a></p></div>";
	    
	    drawObject.textAddPopup = new OpenLayers.Popup.AnchoredBubbleCustom("text", lonLat, popupSize, content);
	    drawObject.textAddPopup.setBackgroundColor("");
	    
	    map.addPopup(drawObject.textAddPopup);
        
	    return false;
	},
	
	finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone(), this.attributes]);
        if(cancel || !this.persist) {
            this.destroyFeature();
        }
    },

	CLASS_NAME: "NUTs.Handler.TextDraw"
});



/*=[ Operator.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : Operator.js
 * 설 명 : JSTS를 통한 객체 공간연산을 수행하고 수행 결과를 반환한다.
 * 필요 라이브러리 : JSTS lib
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2016.03.25			윤은희				1.0			최초 생성
 * 
 * 
 **********************************************************************************/

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




/*=[ ArcGISCache.js ]==========================================================================*/

/** 
 * @requires OpenLayers/Layer/XYZ.js 
 */   

NUTs.Layer.ArcGISCache = OpenLayers.Class(OpenLayers.Layer.XYZ, {  

   /**
    * Method: getURL
    * Determine the URL for a tile given the tile bounds.  This is should support
    *     urls that access tiles through an ArcGIS Server MapServer or directly through
    *     the hex folder structure using HTTP.  Just be sure to set the useArcGISServer
    *     property appropriately!  This is basically the same as 
    *     'OpenLayers.Layer.TMS.getURL',  but with the addition of hex addressing,
    *     and tile rounding.
    *
    * Parameters:
    * bounds - {<OpenLayers.Bounds>}
    *
    * Returns:
    * {String} The URL for a tile based on given bounds.
    */
    getURL: function (bounds) {
        var res = this.getResolution(); 

        // tile center
        var originTileX = (this.tileOrigin.lon + (res * this.tileSize.w/2)); 
        var originTileY = (this.tileOrigin.lat - (res * this.tileSize.h/2));

        var center = bounds.getCenterLonLat();
        var point = { x: center.lon, y: center.lat };
        var x = (Math.round(Math.abs((center.lon - originTileX) / (res * this.tileSize.w)))); 
        var y = (Math.round(Math.abs((originTileY - center.lat) / (res * this.tileSize.h)))); 
        var z = this.map.getZoom();

        // this prevents us from getting pink tiles (non-existant tiles)
        if (this.lods) {        
            var lod = this.lods[this.map.getZoom()];
            if ((x < lod.startTileCol || x > lod.endTileCol) 
                || (y < lod.startTileRow || y > lod.endTileRow)) {
                    return null;
            }
        }
        else {
            var start = this.getUpperLeftTileCoord(res);
            var end = this.getLowerRightTileCoord(res);
            if ((x < start.x || x >= end.x)
                || (y < start.y || y >= end.y)) {
                    return null;
            }        
        }

        // Construct the url string
        var url = this.url;
        var s = '' + x + y + z;

        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(s, url);
        }

        // Accessing tiles through ArcGIS Server uses a different path
        // structure than direct access via the folder structure.
        if (this.useArcGISServer) {
            // AGS MapServers have pretty url access to tiles
            url = url + '/tile/${z}/${y}/${x}';
        } else {
            // The tile images are stored using hex values on disk.
            x = 'C' + this.zeroPad(x, 8, 16);
            y = 'R' + this.zeroPad(y, 8, 16);
            z = 'L' + this.zeroPad(z, 2, 16);
            url = url + '/${z}/${y}/${x}.' + this.type;
        }

        // Write the values into our formatted url
        url = OpenLayers.String.format(url, {'x': x, 'y': y, 'z': z});

        return OpenLayers.Util.urlAppend(
            url, OpenLayers.Util.getParameterString(this.params)
        );
    },

    /**
     * Method: zeroPad
     * Create a zero padded string optionally with a radix for casting numbers.
     *
     * Parameters:
     * num - {Number} The number to be zero padded.
     * len - {Number} The length of the string to be returned.
     * radix - {Number} An integer between 2 and 36 specifying the base to use
     *     for representing numeric values.
     */
    zeroPad: function(num, len, radix) {
        var str = num.toString(radix || 10);
        while (str.length < len) {
            str = "0" + str;
        }
        return str;
    },

    CLASS_NAME: 'NUTs.Layer.ArcGISCache' 
}); 




/*=[ TileCache.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : TileCache.js
 * 설 명 : OpenLayers.Layer.TileCache 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Layer.TileCache = OpenLayers.Class(OpenLayers.Layer.TileCache, {
	/**
	 * 버전 정보 - 파일 별로 타일이 갱신 될 경우 캐쉬 되어있는 이미지를 요청 하지 않는 부분 수정을 위해서 사용
	 */
	version : null,
	
	/**
	 * 지도 조작 이벤트
	 */
	transitionEffect: 'resize',
	
	/**
	 * 속도 문제로 인해서 버퍼를 사용 안함
	 */
	buffer: 0,

	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GTileCache 객체 생성
	 * 작성일 : 2011.04.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.19		최원석		생성 시 'jpg'를 'jpeg' 로 변형하는 것을 막음
	 * 								생성 시 옵션 체크 추가
	 * 
	 **********************************************************************************/
	initialize: function(name, url, layername, options) {
		//필수 파라미터 체크
		if(NUTs.Util.debug) this.chkParams(name, url, layername, options);
		
		this.layername = layername;
        OpenLayers.Layer.Grid.prototype.initialize.apply(this,
                                                         [name, url, {}, options]);
        this.extension = this.format.split('/')[1].toLowerCase();
        //this.extension = (this.extension == 'jpg') ? 'jpeg' : this.extension;
    },
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GTileCache 객체 생성
	 * 작성일 : 2011.04.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.19		최재훈		파일 호출 디렉토리 구조를 G-inno 에 맞게 수정
	 * 2011.04.19		최원석		버전 정보를 외부에서 조작 가능하도록 수정
	 * 
	 **********************************************************************************/
	getURL: function(bounds) {
    
        var res = this.map.getResolution();
        var bbox = this.maxExtent;
        var size = this.tileSize;
        /*
        var tileX = Math.round((bounds.left - bbox.left) / (res * size.w));
        var tileY = Math.round((bounds.bottom - bbox.bottom) / (res * size.h));
        var tileZ = this.serverResolutions != null ?
        */
        var tileX = bounds.bottom;
        var tileY = bounds.left;
        var tileZ = this.serverResolutions != null ?
            OpenLayers.Util.indexOf(this.serverResolutions, res) :
            this.map.getZoom();
             
        /**
         * Zero-pad a positive integer.
         * number - {Int} 
         * length - {Int} 
         *
         * Returns:
         * {String} A zero-padded string
         */
        
        function zeroPad(number, length) {
            number = String(number);
            var zeros = [];
            for(var i=0; i<length; ++i) {
                zeros.push('0');
            }
            return zeros.join('').substring(0, length - number.length) + number;
        }
        var components = [
            this.layername,
            zeroPad(tileZ, 2),
            /**
            zeroPad(parseInt(203676.18 / 1000000), 3),
            zeroPad((parseInt(203676.18 / 1000) % 1000), 3),
            zeroPad((parseInt(203676.18) % 1000), 3),
            zeroPad(parseInt(197361.87 / 1000000), 3),
            zeroPad((parseInt(197361.87 / 1000) % 1000), 3),
            zeroPad((parseInt(197361.87 ) % 1000), 3) + '.' + this.extension
            */
            zeroPad(parseInt(tileX / 1000000), 3),
            zeroPad((parseInt(tileX / 1000) % 1000), 3),
            zeroPad((parseInt(tileX) % 1000), 3),
            zeroPad(parseInt(tileY / 1000000), 3),
            zeroPad((parseInt(tileY / 1000) % 1000), 3),
            zeroPad((parseInt(tileY ) % 1000), 3) + '.' + this.extension
        ]; 
        var path = components.join('/');  
		/*
		 * 버전정보가 설정 되어 있을 경우 버전 정보에 맞게 수정
		 */
		if(this.version) path += "?v=" + this.version;
        var url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        } 
        url = (url.charAt(url.length - 1) == '/') ? url : url + '/';
        return url + path;
    },	
	
	/**********************************************************************************
	 * 함수명 : chkParams
	 * 설 명 : options 을 체크 하고 변형 생성한다.
	 * 인 자 : name (레이어 명), url (타일 서비스 주소), layername (타일 서비스 이름), options (Layer options 들)
	 * 사용법 : chkParams(options)
	 * 작성일 : 2011.04.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.19		최원석		OpenLayers.Map 의 initialize 복사
	 * 								생성 시 옵션 체크 추가
	 * 
	 **********************************************************************************/
	chkParams : function(name, url, layername, options){
		//name 체크
		if(!name) {
			NUTs.Util.create_obj(this, "Layer Name(레이어 명)");
		}
		if(!url) {
			NUTs.Util.create_obj(this, "Url (서비스 주소)");
		}
		if(!layername) {
			NUTs.Util.create_obj(this, "TileCache Layer Name (타일 서비스 이름)");
		}
	},

	CLASS_NAME: "NUTs.Layer.TileCache"
});




/*=[ Vector.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : Vector.js
 * 설 명 : OpenLayers.Layer.Vector 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 2016.08.18		윤은희									drawFeature() 추가
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Layer.Vector = OpenLayers.Class(OpenLayers.Layer.Vector, {
	
	redraw: function() {
        var redrawn = false;
        if (this.map) {

            // min/max Range may have changed
            this.inRange = this.calculateInRange();

            // map's center might not yet be set
            var extent = this.getExtent();

            if (extent && this.inRange && this.visibility) {
                var zoomChanged = true;
                this.moveTo(extent, zoomChanged, false);
                this.events.triggerEvent("moveend",
                    {"zoomChanged": zoomChanged});
                redrawn = true;
            }
        }
		
		//창 닫기 에러 - 조건문 추가
		if(this.map.paddingForPopups) {
			for(var i in this.map.popups) {
				var popup = this.map.popups[i];
				if(popup && popup.attributes && popup.attributes.featureType && popup.attributes.featureType == 'Text' && popup.type == 'draw') {
					if(popup.attributes['font-family']) {
						$("#"+popup.id).css('font-family', popup.attributes['font-family']);
					}
					if(popup.attributes['font-size']) {
						$("#"+popup.id).css('font-size', popup.attributes['font-size']);
					}
					if(popup.attributes['color']) {
						$("#"+popup.id).css('color', popup.attributes['color']);
					}
				}
				
				popup.updateSize();
			}
		}
		
        return redrawn;
    },
    
    /**
     * APIMethod: drawFeature
     * Draw (or redraw) a feature on the layer.  If the optional style argument
     * is included, this style will be used.  If no style is included, the
     * feature's style will be used.  If the feature doesn't have a style,
     * the layer's style will be used.
     * 
     * This function is not designed to be used when adding features to 
     * the layer (use addFeatures instead). It is meant to be used when
     * the style of a feature has changed, or in some other way needs to 
     * visually updated *after* it has already been added to a layer. You
     * must add the feature to the layer for most layer-related events to 
     * happen.
     *
     * Parameters: 
     * feature - {<OpenLayers.Feature.Vector>} 
     * style - {String | Object} Named render intent or full symbolizer object.
     */
    drawFeature: function(feature, style) {
        // don't try to draw the feature with the renderer if the layer is not 
        // drawn itself
        if (!this.drawn) {
            return;
        }
        if (typeof style != "object") {
            if(!style && feature.state === OpenLayers.State.DELETE) {
                style = "delete";
            }
            var renderIntent = style || feature.renderIntent;
            // ehyun. 2016.08.18 : 편집 feature에 style 속성지정하여, [select or delete]가 아닌 경우는 편집레이어에 정의된 자신의 스타일로 feature그리도록(서브심볼포함)
            if(style === 'select' || style === 'delete' || style === 'blink'){
            	style = '';            	
            }
            else{
            	if(feature.attributes.fid !== undefined && feature.attributes.fid !== ''){
            		var oStyle;
            		if(feature.layer && feature.layer.name === editor.searchLayer.name)
            			style = 'search';
            		oStyle = style === 'search' ? MAP_EDITOR.fn_get_searchFeatureStyle(feature) : MAP_EDITOR.fn_get_editFeatureStyle(feature);            		

            		if(feature.renderIntent === '')
            			feature.renderIntent = 'default';
    	    		feature.style = oStyle;
    	    		
    	    		if(!style){
    	    			if(feature.renderIntent === 'delete')
        	    			feature.style = '';	
    	    		}
            	}
            	style = feature.style || this.style;
            }
            	
            if (!style) {
                style = this.styleMap.createSymbolizer(feature, renderIntent);
            }
        }
        
        var drawn = this.renderer.drawFeature(feature, style);
        //TODO remove the check for null when we get rid of Renderer.SVG
        if (drawn === false || drawn === null) {
            this.unrenderedFeatures[feature.id] = feature;
        } else {
            delete this.unrenderedFeatures[feature.id];
        }
    },
	
	parseStyle : function(feature, style) {
		// don't try to draw the feature with the renderer if the layer is not 
	    // drawn itself

	    if (typeof style != "object") {
	        if(!style && feature.state === OpenLayers.State.DELETE) {
	            style = "delete";
	        }
	        var renderIntent = style || feature.renderIntent;
	        style = feature.style || this.style;
	        if (!style) {
	            style = this.styleMap.createSymbolizer(feature, renderIntent);
	        }
	    }

		return style;
	},
    
    addPoint : function(lon, lat, attributes) {
    	var point  = new OpenLayers.Geometry.Point(lon, lat);
    	var feature = new OpenLayers.Feature.Vector(point, attributes);
    	
    	this.addFeatures(feature);
		
		return feature;
    },
    
    getGML : function() {
    	var gml = new OpenLayers.Format.GML();
    	return gml.write(this.features);
    },
    
    setGML : function(str) {
    	var gml = new OpenLayers.Format.GML();
    	var features = gml.read(str);
    	
    	if(features && features.length) {
    		this.addFeatures(features);
    	}
    },
    
	CLASS_NAME: "NUTs.Layer.Vector"
});



/*=[ WMS.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : GWMS.js
 * 설 명 : OpenLayers.Layer.GWMS 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 2011.04.21		최원석				0.2					getParam, getParams 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.WMS, {
	
	/**
	 * G-Inno 설정에 맞게 Default 값 정의
	 */
	DEFAULT_PARAMS: { 
		service: "WMS",
		version: "1.1.0",
		request: "GetMap",
		styles: "",
		exceptions: "application/vnd.ogc.se_inimage",
		format: "image/jpeg",
		crs : "SR_ORG:6640",
		transparent: true
    },
	
	/**
	 * 싱글 타일 사용 여부
	 * 디폴트로 싱글 타일 사용 (현재 싱글 타일이 속도가 빠름)
	 */
	singleTile: true,
	
	/**
	 * 싱글 타일 시 지도 객체 화면 대비 불러올 이미지 비율
	 * 비율이 높을 수록 이동 시 속도는 빠르지만 호출 속도가 느려짐 (1:1 비율 default)
	 */
	ratio : 1,
	
	/**
	 * 타일 서비스 시에 불러올 타일의 비율
	 */
	buffer : 0,
	
	/**
	 * 화면 조작 시 이벤트
	 */
	transitionEffect : "resize",

    yx : {},
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GWMS 객체 생성
	 * 인 자 : name (레이어 명), url (타일 서비스 주소), params (WMS 호출 파라미터), options (Layer options 들)
	 * 사용법 : initialize(name, url, params, options)
	 * 작성일 : 2011.04.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		OpenLayers.Layer.WMS 의 initialize 복사
	 * 								생성 시 옵션 체크 추가
	 * 
	 **********************************************************************************/
	initialize: function(name, url, params, options) {
		//필수 파라미터 체크
		if(NUTs.Util.debug) this.chkParams(name, url, params, options);
		
		if(params.yx){
			this.yx = params.yx;	
		}
		
        var newArguments = [];
        //uppercase params
        params = OpenLayers.Util.upperCaseObject(params);
        if (parseFloat(params.VERSION) >= 1.3 && !params.EXCEPTIONS) {
            params.EXCEPTIONS = "INIMAGE";
        } 
        delete params.yx;
        
        newArguments.push(name, url, params, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
        OpenLayers.Util.applyDefaults(
                       this.params, 
                       OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS)
                       );


        //layer is transparent        
        if (!this.noMagic && this.params.TRANSPARENT && 
            this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            
            // unless explicitly set in options, make layer an overlay
            if ( (options == null) || (!options.isBaseLayer) ) {
                this.isBaseLayer = false;
            } 
            
            // jpegs can never be transparent, so intelligently switch the 
            //  format, depending on teh browser's capabilities
            if (this.params.FORMAT == "image/jpeg") {
                this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif"
                                                                 : "image/png";
            }
        }

    },
	
	/**********************************************************************************
	 * 함수명 : getParam
	 * 설 명 : WMS 호출 파라미터 반환
	 * 인 자 : property (반환할 프로퍼티 명)
	 * 사용법 : getParam(property)
	 * 
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	getParam: function(property) {
		if(property) {
			for(var i in this.params) {
				if(i.toUpperCase() == property.toUpperCase()) {
					return this.params[i];
				}
			}
			/* 에러 처리 방안 후 일괄 처리
			alert('GWMS 레이어 : 현재 레이어에 지정한 Property 가 없습니다.');
			*/
			return false;
		}
		else {
			/* 에러 처리 방안 후 일괄 처리
			alert('GWMS 레이어 : property를 지정하여 주십시오.');
			*/
		}
	},
	
	/**********************************************************************************
	 * 함수명 : getParams
	 * 설 명 : WMS 호출 파라미터들 반환
	 * 사용법 : getParams()
	 * 
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	getParams: function() {
		return this.params;
	},
	
	/**********************************************************************************
	 * 함수명 : chkParams
	 * 설 명 : options 을 체크 하고 변형 생성한다.
	 * 인 자 : name (레이어 명), url (타일 서비스 주소), params (WMS 호출 파라미터), options (Layer options 들)
	 * 사용법 : chkParams(options)
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.19		최원석		최초생성
	 * 
	 **********************************************************************************/
	chkParams : function(name, url, params, options){
		//name 체크
		if(!name) {
			NUTs.Util.create_obj(this, "Layer Name(레이어 명)");
		}
		else if(!url) {
			NUTs.Util.create_obj(this, "Url (서비스 주소)");
		}
		else if(!(params && params.layers)) {
			NUTs.Util.create_obj(this, "Parameter layers (요청 레이어 명 리스트)");
		}
	},
						
	CLASS_NAME: "NUTs.Layer.WMS"
});



/*=[ IndexMap.js ]==========================================================================*/

/**
 * indexMap 개체 
 * @namespace {Object} IndexMap
 */

/**********************************************************************************
 * 파일명 	: IndexMap.js
 * 설명 	: IndexMap Class
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자					version				작업내역
 * --------------------------------------------------------------------------------
 * 2017.02.10		ggash				0.1					최초 생성
 * 
**********************************************************************************/

NUTs.Maps.IndexMap = OpenLayers.Class({
	/**
	 * 기준 지도 객체
	 */
	map : null,
	
	/**
	 * Div Container
	 */
	div : null,
	
	indexMap : null,
	
	/**
	 * 최대 해상도
	 */
	maxResolution : null,
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : IndexMap 객체 생성
	 * 인 자 : map (기준 지도 객체), options (생성 옵션 들)
	 * 사용법 : initialize(map, options)
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초 생성
	 * 
	 **********************************************************************************/
	initialize: function (map, options) {
		if(!options.div) {
    		this.div = document.createElement("div");
    		$(this.div).addClass("olIndexMap").css({
    			"width": "200px",
    			"height": "200px",
    			"position": "absolute",
    			"z-index": "9999",
    			"top": "86px",
    			"right": "10px",
    			"border": "1px solid #bbb",
    			"background-color": "white"
    		});
    		$(map.div).append(this.div);
    	} else {
    		this.div = document.getElementById(options.div);
    	}
		
		var lonlat;
					
		if (options && options.maxResolution) {
			this.maxResolution = options.maxResolution;
		}
		else {
			this.maxResolution = Math.min(map.getMaxExtent().getWidth(), map.getMaxExtent().getHeight()) / Math.min($(this.div).css("width").replace("px", ""), $(this.div).css("height").replace("px", ""));
		}
			
		this.indexMap = new NUTs.Maps.Map(this.div, {
			maxExtent: options.maxExtent,
			maxResolution: this.maxResolution,
			projection: options.projection,
			controls : []
		});
		
		var indexWmsOptions = {
				layers : options.layers,
				styles : options.styles,
	            CRS: "EPSG:5181",
	            //add jykw 20160725 for geoserver 
	            VERSION: "1.1.0"	
		};
		
		/*if(options.gisEngineType == "GeoServer"){
			indexWmsOptions.yx = {'EPSG:5181' : true};
		}*/
		
		var layer = new NUTs.Layer.WMS(
			"GIndexLayer",
			options.serviceUrl,
			indexWmsOptions
		);
		
		this.indexMap.addLayer(layer);
		this.indexMap.setBaseLayer(layer);
		
	    this.indexMap.addControl(new NUTs.Control.ZoomBoxIndex(map, {id : "indexMap"}));
		this.indexMap.activeControls("indexMap");
		
		if(options && options.offsetPixel && options.offsetPixel.CLASS_NAME == "OpenLayers.Pixel") {
			this.indexMap.zoomToMaxExtent();
			lonlat = this.indexMap.getLonLatFromPixel(this.indexMap.getPixelFromLonLat(this.indexMap.getMaxExtent().getCenterLonLat()).add(options.offsetPixel.x, options.offsetPixel.y));
			this.indexMap.center = lonlat;
		}
		
		map.events.register("moveend", this, function() {
			this.indexMap.getControl("indexMap").handler.applyBox(map.getExtent());
		});
		
		this.indexMap.zoomToMaxExtent();
	},
	
	/**********************************************************************************
	 * 함수명 : show
	 * 설 명 : 색인도 나타냄
	 * 사용법 : show()
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초 생성
	 * 
	 **********************************************************************************/
	show: function() {
		$(this.div).show();
	},
	
	/**********************************************************************************
	 * 함수명 : hide
	 * 설 명 : 색인도 숨김
	 * 사용법 : hide()
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		최초 생성
	 * 
	 **********************************************************************************/
	hide: function() {
		$(this.div).hide();
	},

	/**********************************************************************************
	 * 함수명 : toggle
	 * 설 명 : 색인도 show, hide 토글
	 * 사용법 : toggle()
	 * 작성일 : 2011.04.28
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.28		최원석		최초 생성
	 * 
	 **********************************************************************************/
	toggle : function() {
		if($(this.div).css("display") == "none") {
			this.show();
		}
		else {
			this.hide();
		}
	},
	
	/**********************************************************************************
	 * 함수명 : isShow
	 * 설 명 : 색인도 화면에 표시 되어 있는지 여부
	 * 사용법 : isShow()
	 * 작성일 : 2011.05.04
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.04		최원석		최초 생성
	 * 
	 **********************************************************************************/
	isShow : function() {
		if($(this.div).css("display") == "none") {
			return false;
		}
		else {
			return true;
		}
	},
	
	/**********************************************************************************
	 * 함수명 : getHeight
	 * 설 명 : 색인도의 너비 반환
	 * 사용법 : getHeight()
	 * 작성일 : 2011.05.04
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.04		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getHeight : function() {
		return parseInt($(this.div).css("height").replace("px", ""));
	},
	
	/**********************************************************************************
	 * 함수명 : getWidth
	 * 설 명 : 색인도의 높이 반환
	 * 사용법 : getWidth()
	 * 작성일 : 2011.05.04
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.04		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getWidth : function() {
		return parseInt($(this.div).css("width").replace("px", ""));
	},
	
	getPosition : function() {
		var result = {
			left : parseInt($(this.div).css("left").replace("px", "")),
			bottom : parseInt($(this.div).css("bottom").replace("px", "")),
			right : parseInt($(this.div).css("right").replace("px", "")),
			top : parseInt($(this.div).css("top").replace("px", ""))
		}

		return result;
	},
	
	setPosition : function(left, bottom, right, top) {
		if(left) $(this.div).css("left", left);
		if(right) $(this.div).css("right", right);
		if(bottom) $(this.div).css("bottom", bottom);
		if(top) $(this.div).css("top", top);
	},
	
	setHeight : function(height) {
		$(this.div).css("height", height);
	},
	
	setWidht : function(widht) {
		$(this.div).css("widht", widht);
	},
	
	changeLayer : function(layers, styles) {
		this.indexMap.baseLayer.mergeNewParams({
			layers : layers,
			styles : styles
		});
	},
	
	CLASS_NAME: "NUTs.Maps.IndexMap"
});



/*=[ Map.js ]==========================================================================*/

/**
 * 지도개체 
 * @namespace {Object} NUTs.Maps.Map
 */

/**********************************************************************************
 * 파일명 	: Map.js
 * 설명 	: Map Class
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자					version				작업내역
 * --------------------------------------------------------------------------------
 * 2017.02.10		ggash				0.1					최초 생성
 * 
**********************************************************************************/

NUTs.Maps.Map = OpenLayers.Class(OpenLayers.Map, {
	
    /**
     * Property: units
     * {String} 지도 거리 단위
    */ 
	units: 'm',
	
	/**
     * Property: numZoomLevels
     * {String} 축척 레벨
    */  
	numZoomLevels : 11,
	
	/**
     * Property: projection
     * {String} 투영법
    */ 
	projection: 'EPSG:4326',

	/**
     * Property: displayProjection
     * {String} 화면 투영법
    */ 
	displayProjection:'EPSG:4326',

	/**
     * Property: fractionalZoom
     * {String} 타일방식 고정축척외 사용자 정의 축척 사용 여부
    */ 
	fractionalZoom : true,
	
	/**
     * Property: allOverlays
     * {String} 기준 레이어 사용 안 함. 가장 아래에 있는 레이어가 기준 레이어가 됨
    */ 
	allOverlays: false,
	
	/**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description Map 객체 생성 (생성자 함수)
	* @param {String} div 	: div ID(지도 DIV 엘리먼트 아이디)
	* @param {Object} options 	: 지도 생성 옵션 
	* @author  ggash(2017.02.10)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	initialize: function (div, options) {
		//mandatory param check
		if(NUTs.Util.debug) this.chkParams(div, options);
		
		// If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }

        // Simple-type defaults are set in class definition. 
        //  Now set complex-type defaults 
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,
                                            OpenLayers.Map.TILE_HEIGHT);
        
        this.paddingForPopups = new NUTs.Bounds(15, 15, 15, 15);

        this.theme = OpenLayers._getScriptLocation() + 
                             'theme/default/style.css'; 

        // now override default options 
        OpenLayers.Util.extend(this, options);
        
        var projCode = this.projection instanceof OpenLayers.Projection ?
            this.projection.projCode : this.projection;
        OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[projCode]);
        
        // allow extents and center to be arrays
        if (this.maxExtent && !(this.maxExtent instanceof NUTs.Bounds)) {
            this.maxExtent = new NUTs.Bounds(this.maxExtent);
        }
        if (this.minExtent && !(this.minExtent instanceof NUTs.Bounds)) {
            this.minExtent = new NUTs.Bounds(this.minExtent);
        }
        if (this.restrictedExtent && !(this.restrictedExtent instanceof NUTs.Bounds)) {
            this.restrictedExtent = new NUTs.Bounds(this.restrictedExtent);
        }
        if (this.center && !(this.center instanceof OpenLayers.LonLat)) {
            this.center = new OpenLayers.LonLat(this.center);
        }

        // initialize layers array
        this.layers = [];

        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");

        this.div = OpenLayers.Util.getElement(div);
        if(!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        
        OpenLayers.Element.addClass(this.div, 'olMap');

        var id = this.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null,
                                                     "relative", null,
                                                     "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        
        this.events = new OpenLayers.Events(
                this, this.viewPortDiv, null, this.fallThrough, 
                {includeXY: true}
            );
            
            if (OpenLayers.TileManager && this.tileManager !== null) {
                if (!(this.tileManager instanceof OpenLayers.TileManager)) {
                    this.tileManager = new OpenLayers.TileManager(this.tileManager);
                }
                this.tileManager.addMap(this);
            }

        id = this.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;
        this.layerContainerOriginPx = {x: 0, y: 0};
        this.applyTransform();
        
        this.viewPortDiv.appendChild(this.layerContainerDiv);

        this.updateSize();
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
 
        if (this.autoUpdateSize === true) {

            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, 
                this);
            OpenLayers.Event.observe(window, 'resize',
                            this.updateSizeDestroy);
        }
        
        // only append link stylesheet if the theme property is set
        if(this.theme) {
        	
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for(var i=0, len=nodes.length; i<len; ++i) {
                if(OpenLayers.Util.isEquivalentUrl(nodes.item(i).href,
                                                   this.theme)) {
                    addNode = false;
                    break;
                }
            }

            if(addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        
        if (this.controls == null) {
        	 this.controls = [];
            if (OpenLayers.Control != null) { // running full or lite?
            	
            	if(OpenLayers.Control.Navigation){
            		this.controls.push(new OpenLayers.Control.Navigation({id : 'drag'}));
            	}
            	if(NUTs.Control.ZoomIn){
            		this.controls.push(new NUTs.Control.ZoomIn({id : 'zoomIn'}));
            	}
            	if(NUTs.Control.ZoomOut){
            		this.controls.push(new NUTs.Control.ZoomOut({id : 'zoomOut'}));
            	}
            	if(OpenLayers.Control.NavigationHistory){
            		this.controls.push(new OpenLayers.Control.NavigationHistory({id : 'naivgationHistory'}));
            	}
            	
            } 
        }
		
        for(var i=0, len=this.controls.length; i<len; i++) {
            this.addControlToMap(this.controls[i]);
        }
		
        this.popups = [];

        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        

        // always call map.destroy()
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
        
        // add any initial layers
        if (options && options.layers) {

            delete this.center;
            delete this.zoom;
            this.addLayers(options.layers);
            // set center (and optionally zoom)
            if (options.center && !this.getCenter()) {
                // zoom can be undefined here
                this.setCenter(options.center, options.zoom);
            }
        }
        
        if (this.panMethod) {
            this.panTween = new OpenLayers.Tween(this.panMethod);
        }
        if (this.zoomMethod && this.applyTransform.transform) {
            this.zoomTween = new OpenLayers.Tween(this.zoomMethod);
        }
    },
    
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description 필수 파라미터를 검사한다
	* @param {String} div 	: div ID(지도 DIV 엘리먼트 아이디)
	* @param {Object} options 	: 지도 생성 옵션 
	* @author  ggash(2017.02.10)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	chkParams : function(div, options){
		if(!OpenLayers.Util.getElement(div)) {
			NUTs.Util.create_obj(this, "id (지도를 표시할 DIV ID)");
		}
		
		//options 파라미터 존재 여부 확인
		if(options && typeof options === "object") {
			//maxExtent는 필수 옵션
			if(!options.maxExtent) {
				NUTs.Util.create_obj(this, "options maxExtent (최대 영역)");
			}
			if(!options.maxResolution) {
				NUTs.Util.create_obj(this, "options maxResolution (최대 해상도)");
			}
		}
		else {
			NUTs.Util.create_obj(this, "options");
		}
	},
	
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description 레이어 이름으로 레이어 개체를 반환
	* @param 	{String} name 	: 레이어 이름
	* @returns 	{Object} 레이어 개체
	* @author  ggash(2017.02.10)
	* @logs
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	getLayerByName: function(name) {
		var foundLayer = null;
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            if (layer.name == name) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
	},
	
    /**********************************************************************************
	* @memberof NUTs.Maps.Map
	* @method
	* @description 레이어 이름으로 레이어 개체를 삭제처리
	* @param 	{String} name 	: 레이어 이름
	* @returns 	{Object} 레이어 개체
	* @author  ggash(2017.02.10)
	* @logs
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/	
	removeLayerByName: function(name) {
        for (var i=0, len=this.layers.length; i<len; i++) {
            var layer = this.layers[i];
            if (layer.name == name) {
				this.removeLayer(layer);
                break;
            }
        }
	},
	
	/**********************************************************************************
	 * 함수명 : activeControls
	 * 설 명 : 컨트롤들을 활성화 한다.
	 * 인 자1 : controls - 활성화시키고자 하는 (컨트롤 or 컨트롤들)
	 * 인 자2 : deactiveControls - 비활성화시키고자 하는 (컨트롤 id or 컨트롤들 id)
	 * 사용법 : activeControls(controls, deactiveControls)
	 *	controls 
	 * 		- drag		:	이동 툴
	 * 		- ZoomIn	:	확대 툴
	 * 		- ZoomOut	:	축소 툴
	 * 
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 2016.05.12		최재훈		편집모드일 경우 오류해결
	 * 
	 * 								
	 **********************************************************************************/
	activeControls: function(controls, editMode) {

		this.selectiveDeactivateControl(controls, editMode);
		
		if(typeof controls === "object") {
			if(controls.length && controls.length > 0) {
				for(var i = 0; i < controls.length; i++) {
					this.getControl(controls[i]).activate();
				}
			}
		}
		else {
			this.getControl(controls).activate();
		}
	},
	
	selectiveDeactivateControl: function(controls, editMode) {
	
		if(!editMode)
			this.deActiveAllControls();
		
		/*else if(CONFIG) {
			
			var aDeactiveControls = CONFIG.fn_get_deactiveControls();
			
			for(var i in this.layers) {
				if(this.layers[i].CLASS_NAME == "NUTs.Layer.Vector" || this.layers[i].CLASS_NAME == "OpenLayers.Layer.Vector") {
					if(_aExceptionLayers){
						if(_aExceptionLayers.indexOf(this.layers[i].name) === -1){
							this.layers[i].removeFeatures(this.layers[i].features);
						}
					}
					else
						this.layers[i].removeFeatures(this.layers[i].features);
				}
			}
			
		}*/
		
	},
	/**********************************************************************************
	 * 함수명 : deActiveAllControls
	 * 설 명 : 모든 컨트롤 decativate 
	 * 사용법 : deActiveAllControls()
	 * 작성일 : 2015.10.21
	 * 작성자 : 기술개발팀 최재훈
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2015.10.21		최재훈		최초 생성
	 * 
	 **********************************************************************************/
	deActiveAllControls: function() {
		for(var i in this.controls) {
			if(this.controls[i].type != OpenLayers.Control.TYPE_TOGGLE) {
				//if(this.controls[i].CLASS_NAME.indexOf("OpenLayers.Editor.Control.EditorCustomPanel") === -1 && this.controls[i].id != "mousePosition")
				if(this.controls[i].id != "mousePosition")
					this.controls[i].deactivate();	
			}
		}
	},
	
	/**********************************************************************************
	 * 함수명 : removeAllPopups
	 * 설 명 : 지도 위의 모든 팝업 객체 삭제
	 * 인 자 : div (맵 객체 id)
	 * 사용법 : removeAllPopups()
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 
	 **********************************************************************************/
	removeAllPopups : function() {
		var len = this.popups.length;
		for(var i=len-1; i >= 0; i--) {
			this.removePopup(this.popups[i]);
		}
	},
	
	/**********************************************************************************
	 * 함수명 : getResolutions
	 * 설 명 : 지도 객체의 해상도의 배열을 반환한다.
	 * 사용법 : getResolutions()
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getResolutions : function() {
		return this.resolutions;
	},

	/**********************************************************************************
	 * 함수명 : movePrev
	 * 설 명 : 이전 영역으로 이동한다.
	 * 사용법 : movePrev()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	movePrev: function() {
		this.getControl("naivgationHistory").previousTrigger();
	},
	
	/**********************************************************************************
	 * 함수명 : moveNext
	 * 설 명 : 다음 영역으로 이동한다. (이전으로 되 돌린 영역이 있을 때만 가능)
	 * 사용법 : moveNext()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	moveNext: function() {
		this.getControl("naivgationHistory").nextTrigger();
	},
	
	isPrevStack : function() {
		if(this.getControl("naivgationHistory").previousStack.length > 1) {
			return true;
		}
		else {
			return false;
		}
	},
	
	isNextStack : function() {
		if(this.getControl("naivgationHistory").nextStack.length > 0) {
			return true;
		}
		else {
			return false;
		}
	},
	
	/**********************************************************************************
	 * 함수명 : cleanMap
	 * 설 명 : 지도 위의 모든 도형(사용자 그래픽)과 팝업을 삭제.
	 * 인 자 : _aExceptionLayers (초기화 시 제외할 레이어 목록)
	 * 사용법 : cleanMap()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	cleanMap : function(_aExceptionLayers) {
		var currControls = [];
		for(var i in this.controls) {
			if(this.controls[i].active) {
				currControls.push(this.controls[i]);
			}
			if(this.controls[i].id !== "mousePosition")
				this.controls[i].deactivate();
		}
		
				
		for(var i=0; i < currControls.length; i++) {
			currControls[i].activate();
		}
		
		for(var i in this.layers) {
			if(this.layers[i].CLASS_NAME == "NUTs.Layer.Vector" || this.layers[i].CLASS_NAME == "OpenLayers.Layer.Vector") {
				if(_aExceptionLayers){
					if(_aExceptionLayers.indexOf(this.layers[i].name) === -1)
						this.layers[i].removeFeatures(this.layers[i].features);
				}
				else
					this.layers[i].removeFeatures(this.layers[i].features);
			}
		}
		
		this.removeAllPopups();
	},
	
	/**********************************************************************************
	 * 함수명 : getPopup
	 * 설 명 : 팝업 객체 반환
	 * 인 자 : id (반환할 팝업 ID)
	 * 사용법 : getPopup(id)
	 * 작성일 : 2011.05.11
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.11		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	getPopup : function(id) {
		for(var i in this.popups) {
			if(this.popups[i].id == id) {
				return this.popups[i];
			};
		}
		return false;
	},
	
	/**********************************************************************************
	 * 함수명 : setCenterScale
	 * 설 명 : 지정한 좌표와 축척으로 이동
	 * 인 자 : lonlat (이동할 좌표), scale (이동할 축척)
	 * 사용법 : setCenterScale(lonlat, scale)
	 * 작성일 : 2011.05.11
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.11		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	setCenterScale : function(lonlat, scale) {
		if(scale) {
			this.center = lonlat;
			this.zoomToScale(scale);
		}
		else {
			this.setCetner(lonlat);
		}
	},
	
	zoomToFeature : function(feature, zoom) {
		if(zoom) {
			this.setCenter(new OpenLayers.LonLat(feature.geometry.getCentroid().x, feature.geometry.getCentroid().y), zoom);
		}
		else {
			if(feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point" || feature.geometry.id.indexOf("OpenLayers_Geometry_Point") > -1) {
				this.setCenter(new OpenLayers.LonLat(feature.geometry.getCentroid().x, feature.geometry.getCentroid().y), this.getNumZoomLevels()-1);
			}
			else {
				this.zoomToExtent(feature.geometry.getBounds());	
			}
		}
	},
		
	CLASS_NAME: "NUTs.Maps.Map"
});



/*=[ DaumMap.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : DaumMap
 * 설 명 : 다음 매쉬업을 하기 위한 클래스 
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2015.10.06			임상수				1.0					최초 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Mashup.DaumMap = OpenLayers.Class({
	/**
     * Property: id
     * {String} 다음맵 유니크 아이디
     */
	id : null,
	
	/**
     * Property: projection
     * {<OpenLayers.Projection>} 다음 맵 좌표계 기본은 EPSG:4326 좌표계를 사용
     */
	projection : new OpenLayers.Projection("EPSG:4326"), 
	
	/**
     * Property: oMap
     * {<OpenLayers.Map>} OpenLayers Map 객체
     */
	oMap : null,
	
	/**
     * Property: oPosition
     * {GMahsupUtil.Position} OpenLayers Map의 container 정보를 담을 GMahsupUtil.Position 객체
     */
	oPosition : new OpenLayers.Bounds(),
	
	/**
     * Property: position
     * {GMahsupUtil.Position} Daum Map의 container 정보를 담을 GMahsupUtil.Position 객체
     */
	position : new OpenLayers.Bounds(),
	
	/**
     * Property: map
     * {<daum.maps.Map>} OpenLayers Map 객체
     */
	map : null,
	
	/**
     * Property: div
     * {DOMElement|String} The element that contains the map (or an id for
     *     that element)
     */
	div: null,
	
	/**
     * Property: level
     * {Number} 다음 맵 최대 축척
     */
	maxLevel : 14,
	
	/**
     * Property: overlayLayerType
     * {Number} 지도에 중첩된 레이어 타입
     */
	overlayLayerType : -1,
	
	/**
     * Property: roadView
     * {<NUTs.Mashup.DaumMap.RoadView>} NUTs.Mashup.DaumMap.RoadView 객체
     */
	roadView : null,
	
	/**
     * Property: zoom
     * {Number} 다음맵과 오픈레이어스 맵의 싱크를 맞추기 위한 줌 레벨
     */
	zoom : -1,
	
	/**
	 * Property: oMapSize
	 * {Number} 
	 */
	oMapSize : null,
	
	/**
     * Constructor: NUTs.Mashup.DaumMap
     * Constructor for a new OpenLayers.Map instance.  There are two possible
     *     ways to call the map constructor.  See the examples below.
     *
     * Parameters:
     * div - {DOMElement|String}  The element or id of an element in your page
     *     that will contain the map.  May be omitted if the <div> option is
     *     provided or if you intend to call the <render> method later.
     * options - {Object} Optional object with properties to tag onto the map.
     *
     * (end)
     */
    initialize: function (div, options) {
    	
    	 // If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }
        
        OpenLayers.Util.extend(this, options);
        
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
        
        this.div = OpenLayers.Util.getElement(div);
        if(!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        
        debugger;
        if(this.oMap.getProjection() != this.projection.projCode) {
        	options.center.transform(this.oMap.getProjection(), this.projection.projCode);
        }
        
        var daumMapOption = {
        		center: new daum.maps.LatLng(options.center.lat, options.center.lon),
        		level: this.maxLevel - this.oMap.getZoom()  // 지도의 확대 레벨
        };
    	
    	this.map = this.createMap(daumMapOption);
    	
    	this.oMapSize = this.oMap.getSize();
    	
    	this.oMap.events.register("moveend", this, function(e){
    		this.syncMap(e.object);
    	});
    	
    	this.oMap.events.register("move", this, function(e){
    		 this.move(e.object);
    	});
    },
    
    /**
     * APIMethod: craeteMap
     * 다음 맵을 초기화하고 생성한다.
     *
     * Parameters:
     * options - 
     *
     */
    createMap : function(options) {
    	
    	 var w = this.oMap.div.offsetWidth * 2;
         var h = this.oMap.div.offsetHeight * 2;
         
         this.div.style.width = w + "px";
         this.div.style.height = h + "px";
         
         var oMapW = this.oMap.div.offsetWidth;
         var oMapH = this.oMap.div.offsetHeight;
         var oMapTop = this.oMap.div.offsetTop;
         
         var left = (oMapW - w) / 2;
         var top = ((oMapH - h) / 2) + oMapTop;
         
         this.div.style.left = left + "px";
         this.div.style.top = top + "px";
         
     	// 다음맵을 생성합니다.
     	var map = new daum.maps.Map(this.div, options);
     	
     	return map;
    },
    /**
     * APIMethod: panTo
     * 좌표 위치로 지도를 부드럽게 이동시킨다.
     *
     * Parameters:
     * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
     *
     */
    setRoadView : function(roadView) {
    	this.roadView = roadView;
    	
    	if(roadView) {
    		this.roadView.setMap(this);
    	}
    },
    
    /**
     * APIMethod: panTo
     * 좌표 위치로 지도를 부드럽게 이동시킨다.
     *
     * Parameters:
     * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
     *
     */
    panTo : function(latlng) {
    	this.map.panTo(latlng);
    },
    
    /**
     * APIMethod: setLevel
     * 다음 맵 레벨을 변경한다.
     *
     * Parameters:
     * zoom - {Number} 줌 레벨.
     *
     */
    setLevel : function(level) {
    	level = this.maxLevel - level;
    	this.map.setLevel(level);
    },
    
    /**
     * APIMethod: getLevel
     * 다음 맵 레벨을 반환한다.
     *
     * Parameters:
     * zoom - {Number} 줌 레벨.
     *
     */
    getLevel : function() {
    	return this.map.getLevel();
    },
    
    /**
     * APIMethod: setCenter
     * 좌표 위치로 지도가 이동한다.
     *
     * Parameters:
     * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
     *
     */
    setCenter : function(latlon) {
    	this.map.setCenter(latlon);
    },
    
    /**
     * APIMethod: syncMap
     * 다음 맵과 타겟맵의 위치를 맞춘다.
     *
     * Parameters:
     * target - {<OpenLayers.Map>} 위치를 맞출 기준 맵 
     *
     */
    syncMap : function(target) {
    	
    	var resize = !((this.oMapSize.w == target.getSize().w) && (this.oMapSize.h == target.getSize().h));
    	
    	var center = target.getCenter().clone();
		
		if(target.getProjection() != this.projection.projCode) {
			center.transform(target.getProjection(), this.projection.projCode);
		}
		debugger;
		var latlng = new daum.maps.LatLng(center.lat, center.lon);
		
		if(resize) {
			if(this.div.children.length > 0) {
				for(var i = this.div.children.length - 1; i >= 0; i--) {
					this.div.removeChild(this.div.children[i]);
				}
			}
			this.map = this.createMap({center : latlng, level: this.maxLevel - this.oMap.getZoom() });
		} else {
			this.setCenter(latlng);
			this.setLevel(target.getZoom());
			
	    	var container = this.div.children[0].firstChild;
	    	
	    	var left = parseInt(container.style.getPropertyValue("left"), 10);
	    	var top = parseInt(container.style.getPropertyValue("top"), 10);
	    	
	    	this.position.left = left;
	    	this.position.top = top;
	    	
	    	left = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("left"), 10);
	    	top = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("top"), 10);
	    	
	    	this.oPosition.left = left;
	    	this.oPosition.top = top;
		}
		this.oMapSize = this.oMap.getSize();
    },
    
    /**
     * APIMethod: move
     * 맵을 이동한다.
     *
     * Parameters:
     * target - {<OpenLayers.Map>} 위치를 맞출 기준 맵 
     *
     */
    move : function(target) {
    			
    	var container = this.div.children[0].firstChild;
    	
    	var left = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("left"), 10);
    	var top = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("top"), 10);
    	
    	left = left - this.oPosition.left + this.position.left;
    	top = top - this.oPosition.top + this.position.top;
    	

    	//var center = target.getCenter().clone();
    	//console.log("[move] " + center.lon + "," + center.lat + ":"+ left + ","+top);
    	
    	container.style.left = left + "px";
    	container.style.top = top + "px";
    	
    },
    
    /**
     * APIMethod: setMapMode
     * 지도의 타입을 변경한다.
     *
     * Parameters:
     * type - {Number}
     * 	1 - 일반지도
     * 	2 - 스카이뷰
     * 	3 - 하이브리드(스카이뷰 + 레이블)
     */
    setMapMode : function(type) {
		this.map.setMapTypeId(type);
    },
    
    /**
     * APIMethod: addOverlayMap
     * 지도에 레이어를 중첩한다.
     *
     * Parameters:
     * type - {Number}
     * 	5 - 로드뷰
     * 	6 - 지형정보
     * 	7 - 교통정보
     */
    addOverlayLayer : function(type) {
    	this.overlayLayerType = type;
    	this.map.addOverlayMapTypeId(type);
    },
    
    /**
     * APIMethod: removeOverlayLayer
     * 중첩된 레이어를 제거한다.
     *
     * Parameters:
     * type - {Number}
     * 	5 - 로드뷰
     * 	6 - 지형정보
     * 	7 - 교통정보
     */
    removeOverlayLayer : function(type) {
    	this.overlayLayerType = -1;
    	this.map.removeOverlayMapTypeId(type);
    },
    
    /**
     * APIMethod: addOverlayMap
     * 지도에 중천됩 레이어를 반환한다.
     */
    getOverlayLayerType : function() {
    	return this.overlayLayerType;
    },
    
    /**
	 * APIMethod: isVisibility
	 * 지도가 켜져있는지 확인한다.
	 *
	 * Return:
	 * {Boolean} - visible
	 */
    isVisibility : function() {
    	return (this.div.style.visibility != "hidden" ? true : false);
    },
    
    /**
     * APIMethod: setVisibility
     * 지도를 켜고 끈다.
     *
     * Parameters:
     * visible - {Boolean}
     */
    setVisibility : function(visible) {
    	if(visible) {
    		this.div.style.visibility = "visible";
    	} else {
    		this.div.style.visibility = "hidden";
    	}
    },
    
    startRoadView : function() {
    	// 로드뷰를 중첩
    	this.addOverlayLayer(5);
    	this.roadView.run();
    	return true;
    },
    
    endRoadView : function(e) {
    	// 로드뷰 중첩 해지
    	this.removeOverlayLayer(5);
    	this.roadView.stop();
    	return true;
    },
    
    /**
     * APIMethod: setRoadViewVisibility
     * 로드뷰를 켜고 끈다.
     *
     * Parameters:
     * visible - {Boolean}
     */
    setRoadViewVisibility : function(visible) {
    	this.roadView.setVisibility(visible);
    },
    
    getStaticMap : function(div) {
    	var staticMapOption = {
    		center : this.map.getCenter(),
    		level : this.getLevel()
    	};
    	return new daum.maps.StaticMap(div, staticMapOption);
    },
    CLASS_NAME: "NUTs.Mashup.DaumMap"
});


NUTs.Mashup.DaumMap.RoadView = OpenLayers.Class({
	/**
     * Property: id
     * {String} 다음맵 유니크 아이디
     */
	id : null,
	
	/**
     * Property: div
     * {DOMElement|String} The element that contains the map (or an id for
     *     that element)
     */
	div : null,
	
	/**
     * Property: map
     * {DOMElement|String} The element that contains the map (or an id for
     *     that element)
     */
	map : null,
	
	/**
     * Property: position
     * {<daum.maps.LatLng>} 로드뷰를 실행하고 맵을 클릭했을때 저장할 위치값
     */
	position : null,
	
	/**
     * Property: position
     * {<OpenLayers.Layer.Vector>} 로드뷰에 동동이를 추가하기 위한 임시 레이어
     */
	layer : null,
	
	/**
     * Property: mapWalker
     * {<NUTs.Mashup.DaumMap.RoadView.MapWalker>} 로드맵 Walker
     */
	mapWalker : null,
	
	 /**
     * Constructor: NUTs.Mashup.DaumMap.RoadView
     * 다음 로드뷰 클래스
     *
     * Parameters:
     * div - {DOMElement|String}  The element or id of an element in your page
     *     that will contain the map.  May be omitted if the <div> option is
     *     provided or if you intend to call the <render> method later.
     * options - {Object} Optional object with properties to tag onto the map.
     *
     * (end)
     */
	initialize: function (div, options) {
		
		 // If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }
        
        OpenLayers.Util.extend(this, options);
        
		if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
		
		this.div = OpenLayers.Util.getElement(div); // 로드뷰를 표시할 div
		
		if(!this.div) {
			return;
		}
		
		this.roadView = new daum.maps.Roadview(this.div); // 로드뷰 객체
		this.roadViewClient = new daum.maps.RoadviewClient(); // 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
		
		daum.maps.event.addListener(this.roadView, 'init', this.roadViewInit.bind(this));
		daum.maps.event.addListener(this.roadView, 'viewpoint_changed', this.roadViewPointChanged.bind(this));
		daum.maps.event.addListener(this.roadView, 'position_changed', this.positionChanged.bind(this));
	},
	
	/**
     * APIMethod: roadViewInit
     * 로드뷰가 초기화 될때 발생하는 이벤트
     *
     */
	roadViewInit : function() {
		this.mapWalker = new NUTs.Mashup.DaumMap.RoadView.MapWalker(this.position);
	    this.mapWalker.setMap(this.map.map);
	},
	
	/**
     * APIMethod: roadViewPointChanged
     * 로드뷰의 시야가 변경되면 발생한다.
     *
     */
	roadViewPointChanged : function() {
		var viewpoint = this.roadView.getViewpoint();
		this.mapWalker.setAngle(viewpoint.pan);
	},
	
	/**
     * APIMethod: positionChanged
     * 로드뷰의 위치가 변경되면 반영한다.
     *
     */
	positionChanged : function() {
		var position = this.roadView.getPosition();
        this.mapWalker.setPosition(position);
	},
	
	/**
     * APIMethod: setMap
     * 로드뷰에서 사용할 맵을 지정한다.
     *
     * Parameters:
     * map - {<NUTs.Mashup.DaumMap>}
     */
	setMap : function(map) {
		this.map = map;
	},
	
	/**
     * APIMethod: run
     * 로드뷰를 실행한다.
     *
     * Parameters:
     * map - {<NUTs.Mashup.DaumMap>}
     */
	run : function() {
		this.layer = new OpenLayers.Layer.Vector("roadView Vector Layer");
		this.layer.events.register("nofeatureclick", this, this.click);
		this.map.oMap.addLayer(this.layer);
		
		this.div.style.display = "block";
	},
	
	/**
     * APIMethod: click
     * 클릭이벤트
     *
     * Parameters:
     * e - {<OpenLayers.ClickEvents>}
     */
	click : function(e) {
		var pixcel = new OpenLayers.Pixel(window.event.clientX, (window.event.clientY - this.map.oMap.div.offsetTop));
		var lonlat = this.map.oMap.getLonLatFromPixel(pixcel);
		
		if(this.map.oMap.getProjection() != this.map.projection) {
			lonlat.transform(this.map.oMap.getProjection(), this.map.projection);
		}
		
		this.position = new daum.maps.LatLng(lonlat.lat , lonlat.lon);
		
		this.roadViewClient.getNearestPanoId(this.position, 50, this.nearestPanoIdcallback.bind(this));
	},
	
	/**
	 * APIMethod: nearestPanoIdcallback
	 * 클릭한 지점의 가장 근접한 파노라마 아이디를 가져온다.
	 *
	 * Parameters:
	 * panoId - {Number} 파노라마 아이디
	 */
	nearestPanoIdcallback : function(panoId) {
		this.roadView.setPanoId(panoId, this.position);
	},
	
	/**
	 * APIMethod: stop
	 * 로드뷰를 중지한다.
	 *
	 * Parameters:
	 * map - {<NUTs.Mashup.DaumMap>}
	 */
	stop : function() {
		if(this.layer) {
			this.map.oMap.removeLayer(this.layer);
		}
		
		if(this.mapWalker !== null) {
			this.mapWalker.destory();
		}
		
		this.layer = null;
		this.div.style.display = "none";
	},
	
	setVisibility : function(visible) {
		if(visible) {
    		this.div.style.visibility = "visible";
    	} else {
    		this.div.style.visibility = "hidden";
    	}
	},
	CLASS_NAME: "NUTs.Mashup.DaumMap.RoadView"
});

NUTs.Mashup.DaumMap.RoadView.MapWalker = OpenLayers.Class({
	
	/**
     * Property: walker
     * {<daum.maps.CustomOverlay>} 다음 커스텀 오버레이 객체
     */
	walker : null,
	
	/**
     * Property: div
     * {DOMElement|String} The element that contains the map (or an id for
     *     that element)
     */
	div : null,
	
	/**
     * Constructor: NUTs.Mashup.DaumMap.RoadView.MapWalker
     * 다음에서 제공하는 동동이를 사용하는 클래스
     * 동동이란? 로드뷰를 사용할때 시야각을 표현해주는 이미지 아이콘
     *
     * Parameters:
     * position - {<daum.maps.LatLng>} 동동이를 생성할 좌표
     *
     * (end)
     */
	initialize : function(position) {
		
	    this.div = document.createElement('div');
	    var figure = document.createElement('div');
	    var angleBack = document.createElement('div');

	    this.div.className = 'MapWalker';
	    figure.className = 'figure';
	    angleBack.className = 'angleBack';

	    this.div.appendChild(angleBack);
	    this.div.appendChild(figure);

	    this.walker = new daum.maps.CustomOverlay({
	        position: position,
	        content: this.div,
	        yAnchor: 1
	    });
	},
	
	destory : function() {
		this.walker = null;
		if(this.div.parentNode)
			this.div.parentNode.removeChild(this.div);
	},
	
	/**
     * APIMethod: setAngle
     * 앵글을 계산한다.
     *
     * Parameters:
     * angle - {Float}
     */
	setAngle : function(angle) {
		var threshold = 22.5; 
		
	    for(var i = 0; i < 16; i++){ 
	        if(angle > (threshold * i) && angle < (threshold * (i + 1))){
	        	
	            var className = 'm' + i;
	            this.div.className = this.div.className.split(' ')[0];
	            this.div.className += (' ' + className);
	            
	            break;
	        }
	    }
	},
	
	/**
     * APIMethod: setPosition
     * 동동이의 위치를 변경한다.
     *
     * Parameters:
     * position - {<daum.maps.LatLng>}
     */
	setPosition : function(position) {
		this.walker.setPosition(position);
	},
	
	/**
     * APIMethod: setMap
     * 동동이를 띄울 타겟맵을 지정한다.
     *
     * Parameters:
     * map - {<daum.maps.LatLng>}
     */
	setMap : function(map) {
		this.walker.setMap(map);
	},
	
	CLASS_NAME: "NUTs.Mashup.DaumMap.RoadView.MapWalker"
});




/*=[ DawulMap.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : DawulMap
 * 설 명 : 네이버 매쉬업을 하기 위한 클래스 
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2015.10.14			임상수				1.0					최초 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
 **********************************************************************************/

NUTs.Mashup.DawulMap = OpenLayers.Class({
	/**
	 * Property: id
	 * {String} 다음맵 유니크 아이디
	 */
	id : null,
	
	/**
	 * Property: projection
	 * {<OpenLayers.Projection>} 다음 맵 좌표계 기본은 EPSG:4326 좌표계를 사용
	 */
	projection : new OpenLayers.Projection("EPSG:4326"), 
	
	/**
	 * Property: oMap
	 * {<OpenLayers.Map>} OpenLayers Map 객체
	 */
	oMap : null,
	
	/**
	 * Property: oPosition
	 * {GMahsupUtil.Position} OpenLayers Map의 container 정보를 담을 GMahsupUtil.Position 객체
	 */
	oPosition : new OpenLayers.Bounds(),
	
	/**
	 * Property: position
	 * {GMahsupUtil.Position} Daum Map의 container 정보를 담을 GMahsupUtil.Position 객체
	 */
	position : new OpenLayers.Bounds(),
	
	/**
	 * Property: map
	 * {<daum.maps.Map>} OpenLayers Map 객체
	 */
	map : null,
	
	/**
	 * Property: div
	 * {DOMElement|String} The element that contains the map (or an id for
	 *     that element)
	 */
	div: null,
	
	/**
	 * Property: level
	 * {Number} 다음 맵 최대 축척
	 */
	maxLevel : 10,
	
	/**
	 * Property: zoom
	 * {Number} 다음맵과 오픈레이어스 맵의 싱크를 맞추기 위한 줌 레벨
	 */
	zoom : -1,
	
	/**
	 * Property: oMapSize
	 * {Number} 
	 */
	oMapSize : null,
	
	/**
	 * Constructor: NUTs.Mashup.NaverMap
	 * Constructor for a new OpenLayers.Map instance.  There are two possible
	 *     ways to call the map constructor.  See the examples below.
	 *
	 * Parameters:
	 * div - {DOMElement|String}  The element or id of an element in your page
	 *     that will contain the map.  May be omitted if the <div> option is
	 *     provided or if you intend to call the <render> method later.
	 * options - {Object} Optional object with properties to tag onto the map.
	 *
	 * (end)
	 */
	initialize: function (div, options) {
		
   	 // If only one argument is provided, check if it is an object.
        if(arguments.length === 1 && typeof div === "object") {
            options = div;
            div = options && options.div;
        }
        
        OpenLayers.Util.extend(this, options);
        
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
        
        this.div = OpenLayers.Util.getElement(div);
        if(!this.div) {
            this.div = document.createElement("div");
            this.div.style.height = "1px";
            this.div.style.width = "1px";
        }
        
        if(this.oMap.getProjection() != this.projection.getCode()) {
        	options.center.transform(this.oMap.getProjection(), this.projection.getCode());
        }
        
       /* var daumMapOption = { 
        		center: new daum.maps.LatLng(options.center.lat, options.center.lon),
        		level: this.maxLevel - this.oMap.getZoom()  // 지도의 확대 레벨
        };*/
    	
    	this.map = this.createMap();
    	
    	this.oMapSize = this.oMap.getSize();
    	
    	this.oMap.events.register("moveend", this, function(e){
    			this.syncMap(e.object);
    		
    	});
    	
    	this.oMap.events.register("move", this, function(e){
    		 this.move(e.object);
    	});
	},
	
	/**
	 * APIMethod: createMap 
	 * 네이버 맵을 생성하고 div를 초기화 합니다.
	 *
	 */
	createMap : function(options) {
		

	   	 var w = this.oMap.div.offsetWidth * 2;
	     var h = this.oMap.div.offsetHeight * 2;
	     var level = 3;
	     this.div.style.width = w + "px";
	     this.div.style.height = h + "px";
	     
	     var oMapW = this.oMap.div.offsetWidth;
	     var oMapH = this.oMap.div.offsetHeight;
	     var oMapTop = this.oMap.div.offsetTop;
	     
	     var left = (oMapW - w) / 2;
	     var top = ((oMapH - h) / 2) + oMapTop;
	     
	     this.div.style.left = left + "px";
	     this.div.style.top = top + "px";
	     
	 	// 다울맵을 생성합니다.
	 	var map = L.map(this.div, {
			continuousWorld: true
			,worldCopyJump: false
			,zoomControl: false
			,zoomAnimation: true
			,fadeAnimation : true
			,inertia : false
			,closePopupOnClick : false
			,attributionControl : false //- 로고

		});

	    map.scrollWheelZoom.enable();     
	 	//지도 초기 위치정보 세팅
		var center = this.oMap.getCenter().clone();
		var newCenter;
		
		if(options) {
			newCenter = options.center;
			level = options.level;
		}
		else{
			Proj4js.defs["EPSG:5181"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";
			Proj4js.defs["EPSG:900913"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";

			if(this.oMap.getProjection() != this.projection.getCode()) {

				var source = new Proj4js.Proj(this.oMap.getProjection());
				var target = new Proj4js.Proj(this.projection.getCode());
				newCenter = new Proj4js.Point(center.lon, center.lat);
				Proj4js.transform(source, target, newCenter);
			}
		}

		debugger;
		var container = this.getContainer(this.div.children[0]);
		
		this.position.left = container.offsetLeft;
		this.position.top = container.offsetTop;
		
		//this.div.style.position = "fixed";
		
		//126.91392097322163 37.52065309783127
		//console.log(newCenter.y + '/' + newCenter.x + ':' + level);
	    map.setView([newCenter.y, newCenter.x], level); //192415.02, 446799.835       
	    //map.setView([37.566611,126.978509], level); //192415.02, 446799.835                          

	    BaseMapChange(map,L.Dawul.BASEMAP_GEN);	
	 	return map;
    
	},
	
	/**
	 * APIMethod: panTo
	 * 좌표 위치로 지도를 부드럽게 이동시킨다.
	 *
	 * Parameters:
	 * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
	 *
	 */
	panTo : function(latlng) {
		this.map.panTo(latlng);
	},
	
	/**
	 * APIMethod: setLevel
	 * 다음 맵 레벨을 변경한다.
	 *
	 * Parameters:
	 * zoom - {Number} 줌 레벨.
	 *
	 */
	setLevel : function(level) {
		level = this.maxLevel - level;
		this.map.setZoom(level);
	},
	
	/**
	 * APIMethod: getLevel
	 * 다음 맵 레벨을 반환한다.
	 *
	 * Parameters:
	 * zoom - {Number} 줌 레벨.
	 *
	 */
	getLevel : function() {
		return this.map.getZoom();
	},
	
	/**
	 * APIMethod: setCenter
	 * 좌표 위치로 지도가 이동한다.
	 *
	 * Parameters:
	 * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
	 *
	 */
	setCenterAndZoom : function(latlon, targetMaxLevel, curZoom) {
		
		var z = (this.maxLevel - ( targetMaxLevel - curZoom));
		
		var zoom = (z < 0 ? 0 : z);

		
		var source = new Proj4js.Proj(this.oMap.getProjection());
		var target = new Proj4js.Proj(this.projection.getCode());
		
		var newCenter = new Proj4js.Point(latlon.x, latlon.y);
		Proj4js.transform(source, target, newCenter); 
		
		console.log(sessionStorage.getItem("last_mouse_x") + "," + sessionStorage.getItem("last_mouse_y") + " : " + latlon.x + "," + latlon.y);
		this.map.setView([latlon.y, latlon.x], zoom);
		//this.map.setZoom(z);
	},
	
	checkSameCenterZoom : function(_center, _targetMaxLevel, _curZoom) {
		var bSame = false;
		if(sessionStorage) {
			var z = (this.maxLevel - ( _targetMaxLevel - _curZoom));			
			var zoom = (z < 0 ? 0 : z);
			
			var preX = sessionStorage.getItem("last_mouse_x");
			var preY = sessionStorage.getItem("last_mouse_y");
			var preZoom = sessionStorage.getItem("last_zoom");
				
			var curX = _center.lon;
			var curY = _center.lat;			
			
			
			if(preX == curX && preY == curY && preZoom == z)
				bSame = true;
		}
		
		
		return bSame;
		
	},
	
	/**
	 * APIMethod: syncMap
	 * 다음 맵과 타겟맵의 위치를 맞춘다.
	 *
	 * Parameters:
	 * target - {<OpenLayers.Map>} 위치를 맞출 기준 맵 
	 *
	 */
	syncMap : function(target) {

		debugger;
			var resize = !((this.oMapSize.w == target.getSize().w) && (this.oMapSize.h == target.getSize().h));
			
			var center = target.getCenter().clone();
			var latlng;
			if(target.getProjection() != this.projection.getCode()) {
				
				Proj4js.defs["EPSG:5181"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";
				Proj4js.defs["EPSG:900913"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";

				var sourceCoord = new Proj4js.Proj(target.getProjection());
				var targetCoord = new Proj4js.Proj(this.projection.getCode());
				latlng = new Proj4js.Point(center.lon, center.lat);
				Proj4js.transform(sourceCoord, targetCoord, latlng); 
				
	        }
			 
			if(resize) {
				if(this.div.children.length > 0) {
					for(var i = this.div.children.length - 1; i >= 0; i--) {
						this.div.removeChild(this.div.children[i]);
					}
				}
				
				this.map = this.createMap({center : latlng, level : this.maxLevel - this.oMap.getZoom()});
				
				this.oPosition.left = 0;
				this.oPosition.top = 0;
			} else {
				//var bLastMousePoint = this.checkSameCenterZoom(center, target.numZoomLevels, target.getZoom());

				//if(!bLastMousePoint)
				this.setCenterAndZoom(latlng, target.numZoomLevels, target.getZoom());
				
				var container = this.getContainer(this.div.children[0]);
				
				var left = parseInt(container.style.getPropertyValue("left"), 10);
				var top = parseInt(container.style.getPropertyValue("top"), 10);
								
				
				this.position.left = left;
				this.position.top = top;
				
				left = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("left"), 10);
				top = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("top"), 10);
				
				this.oPosition.left = left;
				this.oPosition.top = top;
				
				var z = (this.maxLevel - ( target.numZoomLevels - target.getZoom()));			
				var zoom = (z < 0 ? 0 : z);
				
				var preY = sessionStorage.setItem("last_zoom",z);
				
			}
			this.oMapSize = this.oMap.getSize();

		
	},
	getContainer : function(_divEl){
		if(_divEl.className.indexOf("leaflet-map-pane") != -1)
			return _divEl;
		else{
			return _divEl.firstChild;
		}
			
	},
	
	/**
	 * APIMethod: move
	 * 맵을 이동한다.
	 *
	 * Parameters:
	 * target - {<OpenLayers.Map>} 위치를 맞출 기준 맵 
	 *
	 */
	move : function(target) {
		var container = this.getContainer(this.div.children[0]);
		
		var left = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("left"), 10) ;
		var top = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("top"), 10) ;
		
		left = left - this.oPosition.left + this.position.left;
		top = top - this.oPosition.top + this.position.top;
		
		container.style.left = left + "px";
		container.style.top = top + "px";

		if(sessionStorage) {
			sessionStorage.setItem("last_mouse_x", this.oMap.getCenter().lon);
			sessionStorage.setItem("last_mouse_y", this.oMap.getCenter().lat);
		}
		
	},
	
	/**
	 * APIMethod: setMapMode
	 * 지도의 타입을 변경한다.
	 *
	 * Parameters:
	 * type - {Number}
	 * 	1 - 일반지도
	 * 	2 - 스카이뷰
	 * 	3 - 하이브리드(스카이뷰 + 레이블)
	 */
	setMapMode : function(type) {
		this.map.setMapMode(type);
	},
	
	/**
	 * APIMethod: isVisibility
	 * 지도가 켜져있는지 확인한다.
	 *
	 * Return:
	 * {Boolean} - visible
	 */
	isVisibility : function() {
    	return (this.div.style.visibility != "hidden" ? true : false);
    },
    
	/**
	 * APIMethod: setVisibility
	 * 지도를 켜고 끈다.
	 *
	 * Parameters:
	 * visible - {Boolean}
	 */
	setVisibility : function(visible) {
		if(visible) {
			this.div.style.visibility = "visible";
		} else {
			this.div.style.visibility = "hidden";
		}
	},
	CLASS_NAME: "NUTs.Mashup.DawulMap"
});




/*=[ NaverMap.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : NaverMap
 * 설 명 : 네이버 매쉬업을 하기 위한 클래스 
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2015.10.14			임상수				1.0					최초 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
 **********************************************************************************/

NUTs.Mashup.NaverMap = OpenLayers.Class({
	/**
	 * Property: id
	 * {String} 다음맵 유니크 아이디
	 */
	id : null,
	
	/**
	 * Property: projection
	 * {<OpenLayers.Projection>} 다음 맵 좌표계 기본은 EPSG:4326 좌표계를 사용
	 */
	projection : new OpenLayers.Projection("EPSG:5179"), 
	
	/**
	 * Property: oMap
	 * {<OpenLayers.Map>} OpenLayers Map 객체
	 */
	oMap : null,
	
	/**
	 * Property: oPosition
	 * {GMahsupUtil.Position} OpenLayers Map의 container 정보를 담을 GMahsupUtil.Position 객체
	 */
	oPosition : new OpenLayers.Bounds(),
	
	/**
	 * Property: position
	 * {GMahsupUtil.Position} Daum Map의 container 정보를 담을 GMahsupUtil.Position 객체
	 */
	position : new OpenLayers.Bounds(),
	
	/**
	 * Property: map
	 * {<daum.maps.Map>} OpenLayers Map 객체
	 */
	map : null,
	
	/**
	 * Property: div
	 * {DOMElement|String} The element that contains the map (or an id for
	 *     that element)
	 */
	div: null,
	
	/**
	 * Property: level
	 * {Number} 다음 맵 최대 축척
	 */
	maxLevel : 10,
	
	/**
	 * Property: zoom
	 * {Number} 다음맵과 오픈레이어스 맵의 싱크를 맞추기 위한 줌 레벨
	 */
	zoom : -1,
	
	/**
	 * Property: oMapSize
	 * {Number} 
	 */
	oMapSize : null,
	
	/**
	 * Constructor: NUTs.Mashup.NaverMap
	 * Constructor for a new OpenLayers.Map instance.  There are two possible
	 *     ways to call the map constructor.  See the examples below.
	 *
	 * Parameters:
	 * div - {DOMElement|String}  The element or id of an element in your page
	 *     that will contain the map.  May be omitted if the <div> option is
	 *     provided or if you intend to call the <render> method later.
	 * options - {Object} Optional object with properties to tag onto the map.
	 *
	 * (end)
	 */
	initialize: function (div, options) {
		
		// If only one argument is provided, check if it is an object.
		if(arguments.length === 1 && typeof div === "object") {
			options = div;
			div = options && options.div;
		}
		
		OpenLayers.Util.extend(this, options);
		
		if (this.id == null) {
			this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
		}
		
		this.div = OpenLayers.Util.getElement(div);
		if(!this.div) {
			this.div = document.createElement("div");
			this.div.style.height = "1px";
			this.div.style.width = "1px";
		}
		
		var center = options.center;
		
		if(this.oMap.getProjection() != this.projection) {
			center.transform(this.oMap.getProjection(), this.projection);
		}
		
		var latlng = new NUTMK(center.lon, center.lat);
		
		this.map = this.createMap({center : latlng, mapMode : 0});
		
		this.oMapSize = this.oMap.getSize();
		
		this.oMap.events.register("moveend", this, function(e){			
				this.syncMap(e.object);
		});
		
		this.oMap.events.register("move", this, function(e){
			this.move(e.object);
		});
	},
	
	/**
	 * APIMethod: createMap 
	 * 네이버 맵을 생성하고 div를 초기화 합니다.
	 *
	 */
	createMap : function(options) {
		var w = this.oMap.div.offsetWidth * 2;
		var h = this.oMap.div.offsetHeight * 2;
		
		this.div.style.width = w + "px";
		this.div.style.height = h + "px";
		
		var oMapW = this.oMap.div.offsetWidth;
		var oMapH = this.oMap.div.offsetHeight;
		var oMapTop = this.oMap.div.offsetTop;
		
		var left = (oMapW - w) / 2;
		var top = ((oMapH - h) / 2) + oMapTop;
		
		this.div.style.left = left + "px";
		this.div.style.top = top + "px";
		
		var naverMapOption = { 
			point: options.center
			,mapMode : options.mapMode || 0
		};
		
		var map = new NMap(this.div, naverMapOption);
		map.setCenterAndZoom(naverMapOption.point, 12 - this.oMap.getZoom());
		
		var container = this.div.children[0];
		
		this.position.left = container.offsetLeft;
		this.position.top = container.offsetTop;
		
		this.div.style.position = "fixed";
		
		return map;
	},
	
	/**
	 * APIMethod: panTo
	 * 좌표 위치로 지도를 부드럽게 이동시킨다.
	 *
	 * Parameters:
	 * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
	 *
	 */
	panTo : function(latlng) {
		this.map.panTo(latlng);
	},
	
	/**
	 * APIMethod: setLevel
	 * 다음 맵 레벨을 변경한다.
	 *
	 * Parameters:
	 * zoom - {Number} 줌 레벨.
	 *
	 */
	setLevel : function(level) {
		level = this.maxLevel - level;
		this.map.setZoom(level);
	},
	
	/**
	 * APIMethod: getLevel
	 * 다음 맵 레벨을 반환한다.
	 *
	 * Parameters:
	 * zoom - {Number} 줌 레벨.
	 *
	 */
	getLevel : function() {
		return this.map.getZoom();
	},
	
	/**
	 * APIMethod: setCenter
	 * 좌표 위치로 지도가 이동한다.
	 *
	 * Parameters:
	 * latlng - {<daum.maps.LatLng>} 이동시킬 좌표 - 좌표의값은 다음에서 사용하는 LatLng 객체.
	 *
	 */
	setCenterAndZoom : function(latlon, zoom) {
		var z = (this.maxLevel - zoom < 0 ? 0 : this.maxLevel - zoom);

		this.map.setCenter(latlon);
		this.map.setZoom(z);
	},
	
	/**
	 * APIMethod: syncMap
	 * 다음 맵과 타겟맵의 위치를 맞춘다.
	 *
	 * Parameters:
	 * target - {<OpenLayers.Map>} 위치를 맞출 기준 맵 
	 *
	 */
	syncMap : function(target) {
		
		var resize = !((this.oMapSize.w == target.getSize().w) && (this.oMapSize.h == target.getSize().h));
		
		var center = target.getCenter().clone();
		
		if(target.getProjection() != this.projection) {
			center.transform(target.getProjection(), this.projection);
		}
		var latlng = new NUTMK(center.lon, center.lat);
		
		//console.log("[naver syncMap] " + latlng.x + ","+ latlng.y);
		
		if(resize) {
			if(this.div.children.length > 0) {
				for(var i = this.div.children.length - 1; i >= 0; i--) {
					this.div.removeChild(this.div.children[i]);
				}
			}
			
			this.map = this.createMap({center : latlng, mapMode : 0});
			
			this.oPosition.left = 0;
			this.oPosition.top = 0;
		} else {
			this.setCenterAndZoom(latlng, target.getZoom());
			
			var container = this.div.children[0];
			
			var left = parseInt(container.style.getPropertyValue("left"), 10);
			var top = parseInt(container.style.getPropertyValue("top"), 10);
			
			this.position.left = left;
			this.position.top = top;
			
			var left2 = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("left"), 10);
			var top2 = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("top"), 10);
			
			this.oPosition.left = left2;
			this.oPosition.top = top2;
		}
		this.oMapSize = this.oMap.getSize();
	},
	
	/**
	 * APIMethod: move
	 * 맵을 이동한다.
	 *
	 * Parameters:
	 * target - {<OpenLayers.Map>} 위치를 맞출 기준 맵 
	 *
	 */
	move : function(target) {
		var container = this.div.children[0];
		
		var left = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("left"), 10) ;
		var top = parseInt(target.viewPortDiv.firstChild.style.getPropertyValue("top"), 10) ;
		
		left = left - this.oPosition.left + this.position.left;
		top = top - this.oPosition.top + this.position.top;
		
		container.style.left = left + "px";
		container.style.top = top + "px";
		
	},
	
	/**
	 * APIMethod: setMapMode
	 * 지도의 타입을 변경한다.
	 *
	 * Parameters:
	 * type - {Number}
	 * 	1 - 일반지도
	 * 	2 - 스카이뷰
	 * 	3 - 하이브리드(스카이뷰 + 레이블)
	 */
	setMapMode : function(type) {
		this.map.setMapMode(type);
	},
	
	/**
	 * APIMethod: isVisibility
	 * 지도가 켜져있는지 확인한다.
	 *
	 * Return:
	 * {Boolean} - visible
	 */
	isVisibility : function() {
    	return (this.div.style.visibility != "hidden" ? true : false);
    },
    
	/**
	 * APIMethod: setVisibility
	 * 지도를 켜고 끈다.
	 *
	 * Parameters:
	 * visible - {Boolean}
	 */
	setVisibility : function(visible) {
		if(visible) {
			this.div.style.visibility = "visible";
		} else {
			this.div.style.visibility = "hidden";
		}
	},
	CLASS_NAME: "NUTs.Mashup.NaverMap"
});




/*=[ Popup.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : Popup.js
 * 설 명 : Popup 클래스
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2010.04.05		최원석				0.1					updatePosition 함수 생성
 * 2011.04.25		최원석				0.2					GMap API 로 수정 생성
 * 2011.05.03		최원석				0.3					getLonLat 함수 생성
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Popup = OpenLayers.Class(OpenLayers.Popup, {
	
	/**
	 * 팝업을 거리를 두고 그림
	 */
	offsetPixel : null,
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GMap 객체 생성
	 * 인 자 : div (맵 객체 id)
	 * 사용법 : initialize('map', options)
	 * 작성일 : 2011.04.18
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		OpenLayers.Map 의 initialize 복사
	 * 								생성 시 옵션 체크 추가
	 * 2011.04.25		최원석		default Control 수정
	 * 
	 **********************************************************************************/
	initialize:function(id, lonlat, contentSize, contentHTML, offsetPixel) {
		if(offsetPixel) {
			this.offsetPixel = offsetPixel;
		}
		
        if (id == null) {
            id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }

        this.id = id;
        this.lonlat = lonlat;

        this.contentSize = (contentSize != null) ? contentSize 
                                  : new OpenLayers.Size(
                                                   OpenLayers.Popup.WIDTH,
                                                   OpenLayers.Popup.HEIGHT);
        if (contentHTML != null) { 
             this.contentHTML = contentHTML;
        }
     //   this.backgroundColor = OpenLayers.Popup.COLOR;
        this.opacity = OpenLayers.Popup.OPACITY;
        this.border = OpenLayers.Popup.BORDER;

        this.div = OpenLayers.Util.createDiv(this.id, null, null, 
                                             null, null, null, "hidden");
        this.div.className = this.displayClass;
        
        var groupDivId = this.id + "_GroupDiv";
        this.groupDiv = OpenLayers.Util.createDiv(groupDivId, null, null, 
                                                    null, "relative", null,
                                                    "hidden");

        var id = this.div.id + "_contentDiv";
        this.contentDiv = OpenLayers.Util.createDiv(id, null, this.contentSize.clone(), 
                                                    null, "relative");
        this.contentDiv.className = this.contentDisplayClass;
        this.groupDiv.appendChild(this.contentDiv);
        this.div.appendChild(this.groupDiv);

		/*
		 * 닫기 버튼 사용 안할 것으로 판단되어 삭제
        if (closeBox) {
            this.addCloseBox(closeBoxCallback);
        } 
        */

        this.registerEvents();
    },
	
	/**********************************************************************************
	 * 함수명 : getLonLat
	 * 설 명 : 팝업의 위치 반환
	 * 사용법 : getLonLat()
	 * 
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.03		최원석		최초 생성
	 * 								
	 **********************************************************************************/
	getLonLat : function() {
		return this.lonlat;
	},
	
	/**********************************************************************************
	 * 함수명 : moveTo
	 * 설 명 : 화면에 팝업 표시
	 * 인 자 : px (팝업 위치)
	 * 사용법 : moveTo(name)
	 * 
	 * 작성일 : 2011.04.25
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.25		최원석		OpenLayers.Popup의 moveTo 복사
	 * 								지정된 위치에서 약간 이동한 곳에 팝업 생성
	 * 								
	 **********************************************************************************/
    moveTo: function(px) {
        if ((px != null) && (this.div != null)) {
			// x, y 좌표의 픽셀을 offset으로 지정한 값만큼 증가 시킴
	    	if(this.offsetPixel) {
				px = px.add(this.offsetPixel.x, this.offsetPixel.y);
	    	}
			
			this.div.style.left = px.x + "px";
        	this.div.style.top = px.y + "px";
        }
    },
		
	CLASS_NAME: "NUTs.Popup"
});



/*=[ GProtocolWFS.js ]==========================================================================*/

NUTs.Protocol.ProtocolWFS = function(options){
	options = OpenLayers.Util.applyDefaults(
	        options, OpenLayers.Protocol.WFS.DEFAULTS
	    );
	options.url = "/gmap/proxyPost.do?url="+encodeURIComponent(options.url);
	return new NUTs.Protocol.ProtocolWFS_v1_1_0(options);
}



/*=[ GProtocolWFS_v1_1_0.js ]==========================================================================*/

NUTs.Protocol.ProtocolWFS_v1_1_0 = OpenLayers.Class(OpenLayers.Protocol.WFS.v1_1_0,{
	read: function(options) {
        OpenLayers.Protocol.prototype.read.apply(this, arguments);
        options = OpenLayers.Util.extend({}, options);
        OpenLayers.Util.applyDefaults(options, this.options || {});
        var response = new OpenLayers.Protocol.Response({requestType: "read"});

        var data = OpenLayers.Format.XML.prototype.write.apply(
            this.format, [this.format.writeNode("wfs:GetFeature", options)]
        );

        response.priv = NUTs.Request.POST({
            url: options.url,
            callback: this.createCallback(this.handleRead, response, options),
            params: options.params,
            headers: options.headers,
            data: data,
        });

        return response;
    },
	CLASS_NAME: "NUTs.Protocol.ProtocolWFS_v1_1_0"
});



/*=[ Request.js ]==========================================================================*/


OpenLayers.Util.extend(NUTs.Request,OpenLayers.Request);

NUTs.Request.POST = function(config) {
	config = OpenLayers.Util.extend(config, {method: "POST"});
    // set content type to application/xml if it isn't already set
    config.headers = config.headers ? config.headers : {};
    if(!("CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(config.headers))) {
        config.headers["Content-Type"] = "application/xml";
    }
    return NUTs.Request.issue(config);
};

NUTs.Request.issue = function(config) {
	
    var defaultConfig = OpenLayers.Util.extend(
        this.DEFAULT_CONFIG,
        {proxy: OpenLayers.ProxyHost}
    );
    config = config || {};
    config.headers = config.headers || {};
    config = OpenLayers.Util.applyDefaults(config, defaultConfig);
    config.headers = OpenLayers.Util.applyDefaults(config.headers, defaultConfig.headers);
    
    var customRequestedWithHeader = false,
        headerKey;
    for(headerKey in config.headers) {
        if (config.headers.hasOwnProperty( headerKey )) {
            if (headerKey.toLowerCase() === 'x-requested-with') {
                customRequestedWithHeader = true;
            }
        }
    }
    if (customRequestedWithHeader === false) {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    // create request, open, and set headers
    var request = new OpenLayers.Request.XMLHttpRequest();
   /* var url = OpenLayers.Util.urlAppend(config.url, 
        OpenLayers.Util.getParameterString(config.params || {}));
    url = OpenLayers.Request.makeSameOrigin(url, config.proxy);*/
    var url = config.url+"&params="+encodeURIComponent(config.data);
    request.open(
        config.method, url, config.async, config.user, config.password
    );
    for(var header in config.headers) {
        request.setRequestHeader(header, config.headers[header]);
    }

    var events = this.events;

    // we want to execute runCallbacks with "this" as the
    // execution scope
    var self = this;
    
    request.onreadystatechange = function() {
        if(request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
            var proceed = events.triggerEvent(
                "complete",
                {request: request, config: config, requestUrl: url}
            );
            if(proceed !== false) {
                self.runCallbacks(
                    {request: request, config: config, requestUrl: url}
                );
            }
        }
    };
    
    // send request (optionally with data) and return
    // call in a timeout for asynchronous requests so the return is
    // available before readyState == 4 for cached docs
    if(config.async === false) {
        request.send(config.data);
    } else {
        window.setTimeout(function(){
            if (request.readyState !== 0) { // W3C: 0-UNSENT
                request.send(config.data);
            }
        }, 0);
    }
    return request;
};




/*=[ WFS.js ]==========================================================================*/


NUTs.WFS = {
		
	SERVICES : "WFS",
	
	VERSION : "1.1.0",
	
	SRSNAME : 'srsName="EPSG:900913"',
	
	REQUEST : null,
	
	format : {
		gml : new NUTs.Format.GML(),
		filter : new OpenLayers.Format.Filter({ version : "1.1.0" }),
		xml : new OpenLayers.Format.XML()
	},
	
	getCapability : function(serviceUrl, callback) {
		var params = NUTs.Util.fn_convert_objToStr({
			SERVICE : this.SERVICES,
			VERSION : this.VERSION,
			REQUEST : "GetCapabilities"
		});
		
		NUTs.Util.sendProxyGet(serviceUrl, params, function(res) {
			var format = new OpenLayers.Format.WFSCapabilities({version : "1.1.0"});
			callback(format.read(res.xml));
		});
	},
	
	extendParams : function(params, options) {
		OpenLayers.Util.extend(params, options);
		
		if(options.tables) {
			//if(CONFIG.fn_get_gisEngineType() === "GeoGate") {
				if(!options.tables instanceof Array)
					params.tables = [options.tables];
			/*}  
			else if(CONFIG.fn_get_gisEngineType() === "GeoServer") { //ggash 20170116 for geoserver
				if (!options.tables instanceof Array) {
					params.tables = [COMMON.fn_get_EditKorLayerNm(options.tables)];
				}
				else{
					var arrAliasInfo = [];
					
					for(var i=0, nTableLen = options.tables.length; i < nTableLen; i++) {
						var sAliasName = COMMON.fn_get_EditKorLayerNm(options.tables[i]);
						if(sAliasName)
							arrAliasInfo.push(sAliasName);
					}
					params.tables = arrAliasInfo;
				}
					
			} */
		}
		if(options.fields && !(options.values instanceof Array)) {
			params.fields = [options.fields];
		}
		if(options.values && !(options.values instanceof Array)) {
			params.values = [options.values];
		}
		if(options.sortFields && !(options.sortFields instanceof Array)) {
			params.sortFields = [options.sortFields];
		}
		if(options.sortOrders && !(options.sortOrders instanceof Array)) {
			params.sortOrders = [options.sortOrders];
		}
	},
	
	getSortBy : function(fields, orders) {
		var str = "";
		
		str += "<ogc:SortBy>";
		
		for(var i=0, len=fields.length; i < len; i++) {
			str += "<ogc:SortProperty>";
			str += "<ogc:PropertyName>";
			str += fields[i];
			str += "</ogc:PropertyName>";
			str += "<ogc:SortOrder>";
			str += orders[i]?orders[i]:"ASC";
			str += "</ogc:SortOrder>";
			str += "</ogc:SortProperty>";
		}
		
		str += "</ogc:SortBy>";
		
		return str;
	},
	
	getFeatureById : function(serviceUrl, parameters, callback, options) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			tables : [],
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);
		
		var queryStr = '';
		for(var i=0, len=params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + ' '+ this.SRSNAME +' >'; //GeoServer - srsName이 누락될 경우 x,y 가 바뀌는 문제 있음
			
			if(i < params.values.length)
				queryStr += '<ogc:Filter xmlns:ogc=\"http://www.opengis.net/ogc\"><ogc:FeatureId fid=\"' + params.tables[i] + '.' + params.values[i] + '\"/></ogc:Filter>';
			
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';
		}
		
		this.getFeature(serviceUrl, params, queryStr, callback, options);
	},
	
	getFeatureByMultiId: function(serviceUrl, parameters, callback, options, sync) {
        var params = {
            maxFeatures: 9999,
            prefix: "",
            tables: [],
            values: [],
            sortFields: [],
            sortOrders: [],
            useDomain: false
        };
        
        //$.extend(params, parameters);
        this.extendParams(params, parameters);
        
        var queryStr = "";
        var useDomain = params.useDomain ? 'useDomain="true"' : "";
        queryStr += '<wfs:Query typeName="' + params.prefix + ":" + params.tables[0] + '" ' + useDomain + " "+ this.SRSNAME +" >";
        queryStr += '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">';
        for (var i = 0, len = params.values.length; i < len; i++) {
            queryStr += '<ogc:FeatureId fid="' + params.tables[0] + "." + params.values[i] + '"/>';
        }
        if (params.sortFields.length > 0) queryStr += this.getSortBy(params.sortFields, params.sortOrders);
        queryStr += "</ogc:Filter></wfs:Query>"
        this.getFeature(serviceUrl, params, queryStr, callback, options, sync)
    },
	
	getFeatureByComparison : function(serviceUrl, parameters, callback, options) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			type : "==",
			tables : [],
			fields : [],
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);

		var queryStr = '';		
		for(var i=0, len=params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + '  '+ this.SRSNAME +'  >';
			var filter = new OpenLayers.Filter.Comparison({
				type : params.type,
				property : params.fields[i],
				value : params.values[i]
			});
//			queryStr += this.format.filter.write(filter).xml;
			queryStr += this.format.xml.write(this.format.filter.write(filter));
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';
		}
		
		this.getFeature(serviceUrl, params, queryStr, callback, options);
	},
	
	getFeatureByContains: function(serviceUrl, parameters, callback, options, sync) {
        var params = {
            maxFeatures: 9999,
            prefix: "",
            type: OpenLayers.Filter.Spatial.CONTAINS,
            tables: [],
            values: [],
            sortFields: [],
            sortOrders: [],
            useDomain: false
        };
        this.extendParams(params, parameters);
        var queryStr = "";
        var oXMLHttpRequest = window.XMLHttpRequest;
        var bGecko = !!window.controllers,
            bIE = window.document.all && !window.opera,
            bIE7 = bIE && (window.navigator.userAgent.match(/MSIE ([\.0-9]+)/) && RegExp.$1 == 7 || window.navigator.userAgent.match("rv:11.0"));
        for (var i = 0, len = params.tables.length; i < len; i++) {
            var useDomain = params.useDomain ? 'useDomain="true"' : "";
            queryStr += '<wfs:Query typeName="' +
                params.prefix + ":" + params.tables[i] + '" ' + useDomain + " "+ this.SRSNAME +" >";
            var filter = new OpenLayers.Filter.Spatial({
                type: params.type,
                property: "geom",
                value: params.values[0],
            });
            if (oXMLHttpRequest && !bIE7) queryStr += this.format.xml.write(this.format.filter.write(filter));
            else queryStr += this.format.filter.write(filter).xml;
            if (params.sortFields.length > 0) queryStr += this.getSortBy(params.sortFields, params.sortOrders);
            queryStr += "</wfs:Query>"
        }
        this.getFeature(serviceUrl, params, queryStr, callback, options,sync)
    },
	
	getFeatureByWithin: function(serviceUrl, parameters, callback, options, sync) {
        var params = {
            maxFeatures: 9999,
            prefix: "",
            type: OpenLayers.Filter.Spatial.WITHIN,
            tables: [],
            values: [],
            sortFields: [],
            sortOrders: [],
            useDomain: false
        };
        this.extendParams(params, parameters);
        var queryStr = "";
        var oXMLHttpRequest = window.XMLHttpRequest;
        var bGecko = !!window.controllers,
            bIE = window.document.all && !window.opera,
            bIE7 = bIE && (window.navigator.userAgent.match(/MSIE ([\.0-9]+)/) && RegExp.$1 == 7 || window.navigator.userAgent.match("rv:11.0"));
        for (var i = 0, len = params.tables.length; i < len; i++) {
            var useDomain = params.useDomain ? 'useDomain="true"' : "";
            queryStr += '<wfs:Query typeName="' +
                params.prefix + ":" + params.tables[i] + '" ' + useDomain + " "+ this.SRSNAME +" >";
            var filter = new OpenLayers.Filter.Spatial({
                type: params.type,
                property: "geom",
                value: params.values[0],
            });
            if (oXMLHttpRequest && !bIE7) queryStr += this.format.xml.write(this.format.filter.write(filter));
            else queryStr += this.format.filter.write(filter).xml;
            if (params.sortFields.length > 0) queryStr += this.getSortBy(params.sortFields, params.sortOrders);
            queryStr += "</wfs:Query>"
        }
        this.getFeature(serviceUrl, params, queryStr, callback, options,sync)
    },
	
	getFeatureByDWithin : function(serviceUrl, parameters, callback, options, sync) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			type : OpenLayers.Filter.Spatial.DWITHIN,
			tables : [],
			distance : 1000,
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);
		
		var queryStr = '';		
		var oXMLHttpRequest    = window.XMLHttpRequest;
		var bGecko    = !!window.controllers,
		bIE        = window.document.all && !window.opera,
		bIE7    = bIE && ((window.navigator.userAgent.match(/MSIE ([\.0-9]+)/) && RegExp.$1 == 7) ||(window.navigator.userAgent.match("rv:11.0")));

		for (var i = 0, len = params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + ' '+ this.SRSNAME +' >';
			var filter = new OpenLayers.Filter.Spatial({
				type: params.type,
				property : "geom",
				value: params.values[0],
				distance: params.distance
				//,distanceUnits: 'm'
			});
			
			
			/*
			filterStr += this.format.xml.write(this.format.filter.write(filter));
			filterStr += '</wfs:Query>';
			*/
			if(oXMLHttpRequest && !bIE7)
				queryStr += this.format.xml.write(this.format.filter.write(filter));				//Chrome
			else
				queryStr += this.format.filter.write(filter).xml;	//IE
						
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';

		}
		
		//this.getFeature(serviceUrl, params, filterStr, callback, options);
		this.getFeature(serviceUrl, params, queryStr, callback, options, sync);
	},
	
	getFeatureByGeometry : function(serviceUrl, parameters, callback, options, sync) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			type : OpenLayers.Filter.Spatial.INTERSECTS,
			tables : [],
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);
		
		var queryStr = '';		
		for (var i = 0, len = params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + ' '+ this.SRSNAME +' >';
			var filter = new OpenLayers.Filter.Spatial({
				type: params.type,
				property : "geom",
				value: params.values[0]
			});
			
			queryStr += this.format.xml.write(this.format.filter.write(filter));
			
			//queryStr += this.format.filter.write(filter).xml;
			
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';
		}
		this.getFeature(serviceUrl, params, queryStr, callback, options, sync);
		//this.getFeature(serviceUrl, params, filterStr, callback, options);
	},
	
	
	getFeature : function(serviceUrl, params, filter, callback, options, sync) {
		var wfsStr = '';
		wfsStr += '<wfs:GetFeature service="WFS" version="1.1.0" maxFeatures="' + params.maxFeatures + '" xmlns:ehmp="http://health-e-waterways.org" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">';
		wfsStr += filter;
		wfsStr += '</wfs:GetFeature>';

		var control = this;
		if(sync){
			NUTs.Util.sendProxyPostSync(				
					serviceUrl,
					wfsStr,
					function(res) {
						control.parseGetFeature(res, callback, options);
					}
				);
		}else{
			NUTs.Util.sendProxyPost(				
					serviceUrl,
					wfsStr,
					function(res) {
						control.parseGetFeature(res, callback, options);
					}
				);
		}		
	},
	
	parseGetFeature : function(res, callback, options) {
		if(res.responseXML) {
			res = res.responseXML;
		}
		
		var arr = [];
		var success = true;

		var featureCollection;
		
		// CJH. 수정 this.getBrowserName()에서 - 자체 정의한 func으로 변경 처리하고 있으나 후에 openlayers버전을 올리는 게 맞을 듯....ie12는 또 다를수 있으니..
		// IE11부터는 msie가 userAgent에서 제외됨에 따른 처리! 
		if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
			featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
		}
		else {
			featureCollection = res.getElementsByTagName("FeatureCollection");
		}
		
		if(featureCollection && featureCollection[0]) {
			if(featureCollection[0].getAttribute("numberOfFeatures") != 0) {
				var featureMembers;

				if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
					featureMembers = featureCollection[0].getElementsByTagName("gml:featureMember");
					if(featureMembers.length == 0){
						featureMembers = featureCollection[0].getElementsByTagName("gml:featureMembers")[0].childNodes;
					}
				}
				else {
					featureMembers = featureCollection[0].getElementsByTagName("featureMember");
				}
				
				
				for(var i=0, len = featureMembers.length; i < len; i++) {
					var tmpArr = featureMembers[i].getAttribute("gml:id").split("."); //CJH 2017-03-23 : for geoserver -> attr : fid 대신 gml:id
					
					//같은 테이블인지 체크 후 테이블 아래로 여러 레코드 들이 들어가게 함
					var tmpTable = tmpArr[0];
					var index = null;
					for(var j in arr) {
						if(arr[j].table == tmpTable) {
							index = j;
							break;
						}; 
					}
					
					if(!index) {
						var obj = {
							table : tmpTable,	//테이블 명
							results : []		//레코드 들
						};
						arr.push(obj);
					}
					else {
						obj = arr[index];
					}
					
					//한개의 레코드
					var result = {
						g2id : tmpArr[1],	//FID 필드 (PK)
						feature : null,		//도형
						title : tmpArr[1],	//제목
						fields : {}			//필드들
					};
					//debugger;
					var field = featureMembers[i].firstChild;
					while(field) {
						//도형
						if(field.tagName.replace(field.prefix+":", "").toLowerCase() == "the_geom" || field.tagName.replace(field.prefix+":", "").toLowerCase() == "geom") {
							// usolver에서 공통 obj로 관리하기 위해 OpenLayers가 생성한 Feature(parsedFeature)에 아래 Custom 속성을 추가함 - ehyun.2016.06.10  
							var parsedFeature = this.format.gml.parseFeature(field);

							
							parsedFeature.attributes.fid = featureMembers[i].getAttribute("gml:id");
							parsedFeature.renderIntent = '';
							parsedFeature.featureType = (parsedFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','')).toLowerCase();
							parsedFeature.modified = {
									geometry : {}
							};
							result["feature"] = parsedFeature;
						}
						//속성
						else {
							//대표 속성
							if(options && options.titles && options.titles[obj.table] && field.tagName.replace(field.prefix+":", "").toLowerCase() == options.titles[obj.table].toLowerCase()) {
								if(typeof field.text === 'undefined')
									result.title = field.textContent;
								else
									result.title = field.text;
									
								/*if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
									result.title = field.text;
								}
								else {
									result.title = field.textContent;
								}*/								
							}
							//속성
							if(field.tagName.replace(field.prefix+":", "").toLowerCase() != "boundedby") {
								
								if(typeof field.text === 'undefined')
									result.fields[field.tagName.replace(field.prefix+":", "")] = field.textContent;
								else
									result.fields[field.tagName.replace(field.prefix+":", "")] = field.text;
								
								/*if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
									result.fields[field.tagName.replace(field.prefix+":", "").toLowerCase()] = field.text;
								}
								else {
									result.fields[field.tagName.replace(field.prefix+":", "").toLowerCase()] = field.textContent;
								}*/
							}
						}
						
						field = field.nextSibling;
					}
					
					result.feature.fid = featureMembers[i].getAttribute("gml:id");
					obj.results.push(result);
				}
			}
		}
		else {
			success = false; 
		}
		
		if(options && options.alias) {
			this.getRequestAlias(arr, success, callback, options);
		}
		else {
			callback({
				data : arr,
				success : function() {
					return success;
				}
			});
		}
	},

	// IE11부터는 msie가 userAgent에서 제외됨에 따른 처리! 
	getBrowserName : function() {
		var name = "";
	    var ua = navigator.userAgent.toLowerCase();
	    if (ua.indexOf("opera") != -1) {
	        name = "opera";
	    } else if (ua.indexOf("msie") != -1 || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)) {
	        name = "msie";
	    } else if (ua.indexOf("safari") != -1) {
	        name = "safari";
	    } else if (ua.indexOf("mozilla") != -1) {
	        if (ua.indexOf("firefox") != -1) {
	            name = "firefox";
	        } else {
	            name = "mozilla";
	        }
	    }
	    return name;
	}, 

	insert : function(serviceUrl, features, prefix, table, fields, values, callback) {
		if(features && !(features instanceof Array)) {
			features = [features];
		}

		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf">';
		wfsStr += '<wfs:Insert>';
		wfsStr += '<' + prefix + ':' + table + ' xmlns:' + prefix + '="http://usolver.com">';
		wfsStr += '<' + prefix + ':geom>';
		wfsStr += this.createGmlXml(features);
		wfsStr += '</' + prefix + ':geom>';
		if(fields && fields.length > 0) wfsStr += this.createAttrXml(prefix, fields, values);
		wfsStr += '</' + prefix + ':' + table + '>';
		wfsStr += '</wfs:Insert>';
		wfsStr += '</wfs:Transaction>';
		
		$("#txtTest").val(wfsStr);
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var arr = [];
					
					var totalInserted = transactionResponse[0].getElementsByTagName("wfs:totalInserted");
					var featureId = transactionResponse[0].getElementsByTagName("ogc:FeatureId");
					
					for(var i=0, len=featureId.length; i < len; i++) {
						arr.push(featureId[i].getAttribute("fid"));
					}
					
					if(callback) {
						callback({
							count : totalInserted[0].text,
							ids : arr 
						});
					}
				}
			}
		);
	},
	
	insert_bak : function(serviceUrl, features, prefix, table, fields, values, callback) {
		if(features && !(features instanceof Array)) {
			features = [features];
		}

		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf">';
		wfsStr += '<wfs:Insert>';
		wfsStr += '<' + prefix + ':' + table + ' xmlns:' + prefix + '="http://geogate.g-inno.com/dataserver/' + prefix + '">';
		wfsStr += '<' + prefix + ':geom>';
		wfsStr += this.createGmlXml(features);
		wfsStr += '</' + prefix + ':geom>';
		if(fields && fields.length > 0) wfsStr += this.createAttrXml(prefix, fields, values);
		wfsStr += '</' + prefix + ':' + table + '>';
		wfsStr += '</wfs:Insert>';
		wfsStr += '</wfs:Transaction>';
		
		$("#txtTest").val(wfsStr);
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var arr = [];
					
					var totalInserted = transactionResponse[0].getElementsByTagName("wfs:totalInserted");
					var featureId = transactionResponse[0].getElementsByTagName("ogc:FeatureId");
					
					for(var i=0, len=featureId.length; i < len; i++) {
						arr.push(featureId[i].getAttribute("fid"));
					}
					
					if(callback) {
						callback({
							count : totalInserted[0].text,
							ids : arr 
						});
					}
				}
			}
		);
	},
	
	update : function(serviceUrl, features, prefix, table, fields, values, value, callback) {
		if(features && !(features instanceof Array)) {
			features = [features];
		}

		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf">';
		
		wfsStr += '<wfs:Update typeName="' + prefix + ':' + table + '" xmlns:' + prefix + '="http://geogate.g-inno.com/dataserver/' + prefix + '">';
		wfsStr += '<wfs:Property>';
		wfsStr += '<wfs:Name>geom</wfs:Name>';
		wfsStr += '<wfs:Value>';
		wfsStr += this.createGmlXml(features);
		wfsStr += '</wfs:Value>';
		wfsStr += '</wfs:Property>';

		if(fields && fields.length > 0) wfsStr += this.updateAttrXml(fields, values);
		
		wfsStr += '<ogc:Filter>';
		wfsStr += '<ogc:PropertyIsEqualTo matchCase="true">';
		wfsStr += '<ogc:PropertyName>' + table + '.FID</ogc:PropertyName> ';
		wfsStr += '<ogc:Literal>' + value + '</ogc:Literal> ';
		wfsStr += '</ogc:PropertyIsEqualTo>';
		wfsStr += '</ogc:Filter>';
		
		wfsStr += '</wfs:Update>';
		wfsStr += '</wfs:Transaction>';
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var totalUpdated = transactionResponse[0].getElementsByTagName("wfs:totalUpdated");
					
					if(callback) {
						callback({
							count : totalUpdated[0].textContent
						});
					}
				}
			}
		);
	},
	
	del : function(prefix, table, value, callback) {
		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf" releaseAction="ALL">';
		wfsStr += '<wfs:Delete typeName="' + prefix + ':' + table + '">';
		wfsStr += '<ogc:Filter xmlns:ogc=\"http://www.opengis.net/ogc\"><ogc:FeatureId fid=\"' + table + '.' + value + '\"/></ogc:Filter>';
		wfsStr += '</wfs:Delete>';
		wfsStr += '</wfs:Transaction>';
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var totalDeleted = transactionResponse[0].getElementsByTagName("wfs:totalDeleted");
					
					if(callback) {
						callback({
							count : totalDeleted[0].textContent
						});
					}
				}
			}
		);
	},
	
	createGmlXml :function(features) {
		var lineCount = 0;
		for ( var i in features) {
			if (features[i].geometry.CLASS_NAME == "OpenLayers.Geometry.LineString")
				lineCount++;
		}
		
		var xmlStr = "";
		
		if (features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
			xmlStr += this.createPointXml(features[0].geometry);
		}
		//LineString 이 1개
		if (lineCount == 1) {
			xmlStr += '<gml:LineString xmlns:gml="http://www.opengis.net/gml">';
			xmlStr += this.createLineStringXml(features[0].geometry);
			xmlStr += '</gml:LineString>';
		}
		//LineString 이 2 개 이상이면 MultiLineString (MultiCurve 는 WMS 오류 있음)
		else if (lineCount > 1) {
			xmlStr += '<gml:MultiLineString xmlns:gml="http://www.opengis.net/gml">';
			for ( var i in features) {
				if (features[i].geometry.CLASS_NAME == "OpenLayers.Geometry.LineString") {
					xmlStr += '<gml:lineStringMember><gml:LineString>';
					xmlStr += this.createLineStringXml(features[i].geometry);
					xmlStr += '</gml:LineString></gml:lineStringMember>';
				}
			}
			xmlStr += '</gml:MultiLineString>';
		}
		
		if(features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon"){
			xmlStr += '<gml:Polygon xmlns:gml="http://www.opengis.net/gml">';
			xmlStr += '<gml:exterior>';
			xmlStr += '<gml:LinearRing>';
			xmlStr += this.createPolygonXml(features[0].geometry);
			xmlStr += '</gml:LinearRing>';
			xmlStr += '</gml:exterior>';
			xmlStr += '</gml:Polygon>';
		}
		
		return xmlStr;
	},
	
	//point XML 생성 ------------- 수정필요 //TOFIXED imajnet
	createPointXml : function(geometry) {
		var str = '';
		str += '<gml:Point srsName="EPSG:3857" xmlns:gml="http://www.opengis.net/gml"><gml:pos>';
		str += geometry.x + " ";
		str += geometry.y;
		str += '</gml:pos></gml:Point>';
		return str;
	},
	
	//line String XML 을 생성
	createLineStringXml : function(geometry) {
		var str = '';
		str += '<gml:posList>';
		for ( var i in geometry.components) {
			str += geometry.components[i].x + " ";
			str += geometry.components[i].y + " ";
		}
		str += '</gml:posList>';
		return str;
	},
	
	//polygon String XML 을 생성
	createPolygonXml : function(geometry){
		var geom = geometry.components[0];
		var str = '';
		str += '<gml:posList srsDimension="2" dimension="2">';
		for (var i in geom.components) {
			str += geom.components[i].x + " ";
			str += geom.components[i].y + " ";
		}
		str += '</gml:posList>';
		return str;
	},
	
	createAttrXml : function(prefix, fields, values) {
		var str = '';
		for(var i=0,len=fields.length; i<len; i++) {
			str += '<'+prefix+':'+fields[i]+'>'+values[i]+'</'+prefix+':'+fields[i]+'>';
		}
		return str;
	},
	
	updateAttrXml : function(fields, values) {
		var str = '';
		for(var i=0,len=fields.length; i<len; i++) {
			str += "<wfs:Property>";
			str += "<wfs:Name>" + fields[i] + "</wfs:Name>";
			str += "<wfs:Value>" + values[i] + "</wfs:Value>";
			str += "</wfs:Property>";
		}
		return str;
	},
	
	/**********************************************************************************
	 * 함수명 : getRequestAlias
	 * 설 명 : layer, field 명을 alias 명으로 변환
	 * 인 자 : obj (속성정보 결과 배열)
	 * 사용법 : getRequestAlias(obj)
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getRequestAlias : function(arr, success, callback, options) {
		var control = this;

		var tables = [];
		var fields = [];
		for(var i=0, len=arr.length; i < len; i++) {
			for (var j in arr[i].results[0].fields) {
				tables.push(arr[i].table);
				fields.push(j);
			}
		}
		
		$.post(
			"/gmap/attr/getAlias.do",
			{
				tables : tables.join(),
				fields : fields.join()
			}, 
			function (res) {
				for(var i=0, len=arr.length; i < len; i++) {
					arr[i].alias = res.data[i];
				}
				
				//트리거 이벤트 실행
				callback({
					data : arr,
					success : function() {
						return success;
					}
				});
			},
			"json"
		);
	},
	
	orderGetFeatureArr : function(arr, field, order) {
		var len = arr.length;
		for(var i=len-1; i > 0; i--) {
			for(var j=0; j < i; j++) {
				if(order.toLowerCase() == 'desc') {
					if(arr[j]["fields"][field] < arr[j+1]["fields"][field]) {
						NUTs.Util.Array.fn_swap_element(arr, j, j+1);
					}
				}
				else {
					if(arr[j]["fields"][field] > arr[j+1]["fields"][field]) {
						NUTs.Util.Array.fn_swap_element(arr, j, j+1);
					}
				}
			}
		}				
	}
};




/*=[ WMS.js ]==========================================================================*/


NUTs.WMS = {

	service : "WMS",
	
	version : "1.1.0",
	
	request : null,
	//change jykw 20160725 for geoserver
    format: new NUTs.Format.SLD.v1_1_0,
    //format: new NUTs.Format.SLD.v1_0_0_GeoServer,
	
    getLayerNameByNamedLayer : function(namedLayerXml) {
    	var layerName = null;
    	if(namedLayerXml.getElementsByTagName("se:FeatureTypeName")[0]) 
    		layerName = namedLayerXml.getElementsByTagName("se:FeatureTypeName")[0].textContent;
    	else 
    		layerName = namedLayerXml.getElementsByTagName("sld:Name")[0].textContent; 
    	
    	return layerName;
    },
	getCapability : function(serviceUrl, callback) {
		var params = {
			service : this.service,
			version : this.version,
			request : "GetCapabilities"
		};
		
		var obj = this;
		NUTs.Util.sendProxyGet(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
			obj.parseGetCapability(res, callback);
		});
	},
	
	parseGetCapability : function(res, callback) {
		var arr = [];
		
		var totalLayers = res.getElementsByTagName("Layer");
		
		for(var i=0, len=totalLayers.length; i < len; i++) {
			var grpLayers = totalLayers[i].getElementsByTagName("Layer");
			if(grpLayers.length > 0 && totalLayers[i].getElementsByTagName("Title")[0].text != "BASIC") {
				var groupArr = {
					title : totalLayers[i].getElementsByTagName("Title")[0].text,
					layers : []
				};
				
				for(var j=0, jLen=grpLayers.length; j < jLen; j++) {
					var obj = {
						name :  grpLayers[j].getElementsByTagName("Name")[0].text,
						style : grpLayers[j].getElementsByTagName("Style")[0].text,
						title : grpLayers[j].getElementsByTagName("Title")[0].text,
						left : grpLayers[j].getElementsByTagName("westBoundLongitude")[0].text,
						bottom : grpLayers[j].getElementsByTagName("southBoundLatitude")[0].text,
						right : grpLayers[j].getElementsByTagName("eastBoundLongitude")[0].text,
						top : grpLayers[j].getElementsByTagName("northBoundLatitude")[0].text
					};
					groupArr.layers.push(obj);
				}
				
				arr.push(groupArr);
			}
		}
		
		callback(arr);
	},
	
	getLengendGraphic : function(serviceUrl, parameters) {
		var params = {
			service : this.service,
			version : this.version,
			request : "GetLegendGraphic",
			layer : "",
			style : "",
			rule : "",
			sld_version : "1.1.0",
			format : "image/png",
			width : 16,
			height : 16
		};
		
		$.extend(params, parameters);
		return serviceUrl + NUTs.Util.fn_convert_objToStr(params);
	},
	
	getStyles : function(serviceUrl, layers, version, callback) {
		var serviceVersion = version;
		var params = {
			service : this.service,
			//jykw 20160708 for geoserver
			//version : this.version,
			version : serviceVersion,
			request : "GetStyles",
			layers : layers
		};
		
		var obj = this;
        //change jykw 20160708 for geoserver
        /*NUTs.Util.sendProxyPost(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
            obj.parseGetStyles(res, callback)
        })*/
        
		NUTs.Util.sendProxyPost(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
            obj.parseGetStyles(res, callback)
        })
	},
	
	getStylesBySync : function(serviceUrl, layers, version, callback) {
		var serviceVersion = version;
		var params = {
			service : this.service,
			version : serviceVersion,
			request : "GetStyles",
			layers : layers
		};
		
		var obj = this;
		NUTs.Util.sendProxyPostSync(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res)
			{
				obj.parseGetStyles(res, callback);
			//	callback(new NUTs.Tool.SLDTool(res,"xml"));
			}
		);
	},
	
	/* ggash 2016.12.29 for geoserver
	 * GeoServer일경우 문제점 수정
	 * 1. GetStyles Response 개체에 LayerFeatureContraints property가 없어  featureTypeName Property에 "table명'이 SET되지 않음
	 * 2. GetStyles Response 개체에 symbolizer - 스타일(fill, stroke..etc)등에 값이 있으나 파싱된 sld에는 누락됨.
	 * 	2-1. GeoServer - point에 size property 없음.
	 * 	2-2. GeoServer - line에 name property 없음.
	 * 	2-3. Line의 경우 GeoServer는 StorkeDashStyle, GeoGate는 StrokeDashArray
	*/
	parseGetStyles : function(res, callback) {
		var obj = {	
			xml : res,
			name : "",
			namedLayers : []
		};
		//debugger;
		// jykw 20160721 for geoserver
        var sld = this.format.read(res);       
        //var sld = this.format.read(res.documentElement);

        var name = sld.name;
        // jykw 20160721 for geoserver
        //if (name.length > 0) obj.name = name;        
        if (name != undefined && name.length > 0) obj.name = name;        
		
		var namedLayers = sld.namedLayers;
		
		var parsedNamedLayers = this.parseGetStylesByNamedLayers(namedLayers);
		
		obj.namedLayers = parsedNamedLayers;
		
		if(callback) {
			callback(obj);	
			return true;
		}
		else {
			return obj;
		}
	},
	
	parseGetStylesByNamedLayers : function(namedLayers){
		var obj = {
			namedLayers : []	
		};
		
		for(var i in namedLayers) {
			
			var namedObj = {
				name : "",
				title : "",
				featureTypeName : "",
				userStyle : []
			};
			
			var name = namedLayers[i].name;
			// jykw 20160721 for geoserver
            //if (name.length > 0) namedObj.name = name;            
            if ( name != undefined && name.length > 0)	namedObj.name = name;
			
            var description = namedLayers[i].description;
            // jykw 20160721 for geoserver
            //if (description.length > 0) namedObj.title = description.title;            
            if (description != undefined && description.length > 0) namedObj.title = description.title;
            var layerFeatureConstraints = namedLayers[i].LayerFeatureConstraints;
            
            // ggash 20161229 for geoserver - GeoServer의 경우 layerFeatureConstraints property가 없음
            if(!layerFeatureConstraints && namedLayers[i].userStyles[0].name ){
            	layerFeatureConstraints = namedLayers[i].userStyles[0].name;
            }
            // jykw 20160721 for geoserver
            //if (layerFeatureConstraints.length > 0) namedObj.featureTypeName = layerFeatureConstraints;
            if (layerFeatureConstraints != undefined && layerFeatureConstraints.length > 0) 
            	namedObj.featureTypeName = layerFeatureConstraints;     
			
            // ggash 20170111 for geoserver - GeoServer의 경우 layerFeatureConstraints property가 없어 featureTypeName에 값 SET되지 않음
            if(!namedObj.featureTypeName && namedLayers[i].userStyles[0].name){
            	namedObj.featureTypeName = namedLayers[i].userStyles[0].name;
            }
            
			var userStyles = namedLayers[i].userStyles;
			for(var j = 0, jLen = userStyles.length; j < jLen; j++) {
				var userdObj = {
					name : "",
					title : "",
					rules : []
				};
				var name = userStyles[j].name;
                // jykw 20160721 for geoserver                
                //if (name.length > 0) userdObj.name = name;
                if (name != undefined && name.length > 0) userdObj.name = name;                
                var description = userStyles[j].description;
                // jykw 20160721 for geoserver                
                //if (description.length > 0) userdObj.title = description;
                if (description != undefined && description.length > 0) userdObj.title = description;
                var layerName = userStyles[j].layerName;
                // jykw 20160721 for geoserver                
                if (layerName != undefined && layerName.length > 0) userdObj.title = layerName;
				
				var rules = userStyles[j].rules;
				var gServerType = "GeoGate";
				for(var k = 0, kLen = rules.length; k < kLen; k++) {
					var ruleObj = {
						name : "",
						minScale : "",
						maxScale : "",
						symbolizer : {},
						filter : {}
					};
					// ggash 20170111 for geoserver - GeoServer의 경우 layerFeatureConstraints property가 없음
					if(!rules[0].hasOwnProperty('minScaleDenominator')){
						gServerType = "GeoServer";
					}
					// 룰 이름
					ruleObj.name = rules[k].name;
					
					// 최소 축척
					ruleObj.minScale = rules[k].minScaleDenominator;
					
					// 최대 축척
					ruleObj.maxScale = rules[k].maxScaleDenominator;
					
					// 필터
					var filter = rules[k].filter;
					if(filter){
						ruleObj.filter.type = filter.type;
						ruleObj.filter.property = filter.property;
						ruleObj.filter.value = filter.value;
					}
					
					var points = rules[k].symbolizer["Point"];
					var lines = rules[k].symbolizer["Line"];
					var polygons = rules[k].symbolizer["Polygon"];
					var texts = rules[k].symbolizer["Text"];
					
					if(points) {
						var pointObj = {};
	
						var size = points.pointSize;//GeoServer에는  pointSize라는 property 없음
						
						// ggash 20170111 for geoserver
						if(gServerType === "GeoGate") {
							if (size != undefined && size.length > 0) {
								
								pointObj["size"] = size;
								
								if(points.name.indexOf('ImageMarker') != -1) {
									
									pointObj["opacity"] = points.graphicOpacity;
									// 텍스처 이미지 Base64값 가져오기
									var externalGraphic;
									if(!points.href) externalGraphic = points.graphicContent;
									else externalGraphic = points.href;
									if(externalGraphic) pointObj["externalGraphic"] = externalGraphic;
									if(points.rotation) pointObj["rotation"] = points.rotation;
									if(points.angleScale) pointObj["angleScale"] = points.angleScale;
	                        		if(points.angleTranslation) pointObj["angleTranslation"] = points.angleTranslation;
	                        		
								} else if (points.name.indexOf('ShapeMarker') != -1) {
									
	                        		pointObj["graphicName"] = points.graphicName;
	                        		pointObj["fillColor"] = points.fillColor;
	                        		pointObj["fillOpacity"] = points.fillOpacity;
	                        		if(points.strokeColor) pointObj["strokeColor"] = points.strokeColor;
	                        		if(points.strokeOpacity) pointObj["strokeOpacity"] = points.strokeOpacity;
	                        		if(points.strokeWidth) pointObj["strokeWidth"] = points.strokeWidth;
	                        		if(points.strokeLinejoin) pointObj["strokeLinejoin"] = points.strokeLinejoin;
	                        		if(points.strokeLinecap) pointObj["strokeLinecap"] = points.strokeLinecap;
	                        	}
								
								pointObj["opacity"] = points.graphicOpacity;
							}
						}
						//GeoServer와 GeoGate의 심볼처리 방식 고려 수정 필요.
						else if(gServerType === "GeoServer") {
							$.extend(true, pointObj, points);
						}
						
						ruleObj.symbolizer["point"] = pointObj;
					}
					
					if(lines) {
						var lineObj = {};
						
						var name = lines.name;
						//  ggash 20170111 for geoserver
						//	FIXME - GIS엔진을 config에 설정하게끔 수정 필요
						
						if(gServerType === "GeoGate") {
							if(name == "Line") {
								//선 색 strokeColor
								var strokeColor = lines.strokeColor ;
								lineObj["stroke"] = strokeColor;
								
								//선 두께 strokeWidth
								var strokeWidth = lines.strokeWidth ;
								lineObj["strokeWidth"] = strokeWidth;
								
								//선 투명도 strokeOpacity
								var strokeOpacity = lines.strokeOpacity ;
								lineObj["strokeOpacity"] = strokeOpacity;
								
								// 모서리 스타일 strokeLinecap
								var strokeLinecap = lines.strokeLinecap ;
								lineObj["strokeLinecap"] = strokeLinecap;

								// 모서리 스타일 strokeLinecap
								var strokeLinecap = lines.strokeLinecap ;
								
								//선 스타일 strokeLinecap
								var strokeDasharray = lines.strokeDasharray;
								if(strokeDasharray) {
									//console.log("선 스타일 strokeLinecap 지정안됨!");
								} else if (lines.strokeDashStyle) { // ggash 20170111 for geoserver
									lineObj["strokeDashArray"] = lines.strokeDashStyle;
								}else {
									lineObj["strokeDashArray"] = "solid";
								}
							} else if(name == "CompositeLineCap") {
								lineObj.arrow = true;
							} else if(name == "CompositeLineMarker") {
								lineObj.marker = true;
							}
						}
						else if(gServerType === "GeoServer") {
							//선 색 strokeColor
							var strokeColor = lines.strokeColor ;
							if(strokeColor) lineObj["stroke"] = strokeColor;
							
							//선 두께 strokeWidth
							var strokeWidth = lines.strokeWidth ;
							if(strokeWidth) lineObj["strokeWidth"] = strokeWidth;
							
							//선 투명도 strokeOpacity
							var strokeOpacity = lines.strokeOpacity ;
							if(strokeOpacity) lineObj["strokeOpacity"] = strokeOpacity;
							
							// 모서리 스타일 strokeLinecap
							var strokeLinecap = lines.strokeLinecap ;
							if(strokeLinecap) lineObj["strokeLinecap"] = strokeLinecap;
							
							//선 스타일 strokeLinecap
							var strokeDasharray = lines.strokeDasharray;
							if(strokeDasharray) {
								//console.log("선 스타일 strokeLinecap 지정안됨!");
							} else if (lines.strokeDashStyle) { //  ggash 20170111 for geoserver
								lineObj["strokeDashArray"] = lines.strokeDashStyle;
							}else {
								lineObj["strokeDashArray"] = "solid";
							}
						}
						
						ruleObj.symbolizer["line"] = lineObj;
					}
					if(polygons) {
						var polyObj = {};
						
						if(polygons.fill) {
							//면색 fillColor
							var fillColor = polygons.fillColor;
							if(fillColor) polyObj["fillColor"] = fillColor;
							
							//면투명도 fillOpacity
							var fillOpacity = polygons.fillOpacity;
							if(fillOpacity) polyObj["fillOpacity"] = fillOpacity;
						}
						
						// 텍스처 이미지 Base64값 가져오기
						var externalGraphic = polygons.InlineContent;
						if(externalGraphic) polyObj["externalGraphic"] = externalGraphic;
						
						if(lines) {
                        	$.extend(true,polyObj,ruleObj.symbolizer.line);
                        	delete ruleObj.symbolizer.line;
                        }
						ruleObj.symbolizer["polygon"] = polyObj;
					}
					
					if(texts) {
						var textObj = {};
						
						var label = texts.label;
						if(label.length > 0) {
							textObj.label = label
						}
						
						//서체 fontFamily
						var fontFamily = texts.fontFamily;
						if(fontFamily) textObj["fontFamily"] = fontFamily;
						
						//글자 크기 fontSize
						var fontSize = texts.fontSize;
						if(fontSize) textObj["fontSize"] = fontSize;
						
						//글자 스타일 fontStyle
						var fontStyle = texts.fontStyle;
						if(fontStyle) textObj["fontStyle"] = fontStyle;
						
						//글자 두께 fontWeight
						var fontWeight = texts.fontWeight;
						if(fontWeight) textObj["fontWeight"] = fontWeight;
						
						
						if(texts.fill) {
							//글자 색
							var fillColor = texts.fillColor;
							if(fillColor) textObj["fillColor"] = fillColor;
							
							//글자 투명도
							var fillOpacity = texts.fillOpacity;
							if(fillOpacity) textObj["fillOpacity"] = fillOpacity;
							
							//배경 색
							var haloColor = texts.haloColor;
							if(haloColor) textObj["haloColor"] = haloColor;
							//배경 투명도
							var haloOpacity = texts.haloOpacity;
							if(haloOpacity) textObj["haloOpacity"] = haloOpacity;
						}
						
						// 벤더 옵션 처리
						if(texts.backgroundType !== "NONE") {
                        	var backgroundType = texts.backgroundType;
                        	if (backgroundType) textObj["backgroundType"] = backgroundType;
                        	var backgroundFill = texts.backgroundFill;
                        	if (backgroundFill) textObj["backgroundFill"] = backgroundFill;
                        	var backgroundLine = texts.backgroundLine;
                        	if (backgroundLine) textObj["backgroundLine"] = backgroundLine;
                        	var backgroundOffset = texts.backgroundOffset;
                        	if (backgroundOffset) textObj["backgroundOffset"] = backgroundOffset;
                        	var backgroundAlign = texts.backgroundAlign;
                        	if (backgroundAlign) textObj["backgroundAlign"] = backgroundAlign;
                        }
                        var textPointBase = texts.textPointBase;
                    	if (textPointBase) textObj["textPointBase"] = textPointBase;
                    	var textPointPosition = texts.textPointPosition;
                    	if (textPointPosition) textObj["textPointPosition"] = textPointPosition;
                    	var textPointArrange = texts.textPointArrange;
                    	if (textPointArrange) textObj["textPointArrange"] = textPointArrange;
                    	var codeDomain = texts.codeDomain;
                    	if (codeDomain) textObj["codeDomain"] = codeDomain;
                    	var textArrangePos = texts.textArrangePos;
                    	if (textArrangePos) textObj["textArrangePos"] = textArrangePos;
                    	var textArrangeLine = texts.textArrangeLine;
                    	if (textArrangeLine) textObj["textArrangeLine"] = textArrangeLine;
                    	var textArrangeGap = texts.textArrangeGap;
                    	if (textArrangeGap) textObj["textArrangeGap"] = textArrangeGap;
						
						ruleObj.symbolizer["text"] = textObj;
					}
					userdObj.rules.push(ruleObj);
				}
				namedObj.userStyle.push(userdObj);
			}
			obj.namedLayers.push(namedObj);
		}
		return obj.namedLayers;
	},
	
	getFeatureInfo : function(serviceUrl, map, options, callback, callbackParams) {
		var params = {
			service : this.service,
	    	version : this.version,
	    	request : "GetFeatureInfo",
	    	layers : "",
	    	styles : "",
	    	query_layers : "",
	    	info_format : "text/xml",
	    	format : "image/jpeg",
	    	feature_count : 9999,
	    	bbox : map.getExtent().toBBOX(),
	    	i : parseInt(map.getSize().w/2),
	    	j : parseInt(map.getSize().h/2),
	    	height : map.getSize().h,
	    	width : map.getSize().w
		};
		
		if(options.layers && !options.styles) {
			options.styles = options.layers;
		}
		if(options.layers && !options.query_layers) {
			options.query_layers = options.layers;
		}
		
		$.extend(params, options);
		
		var obj = this;
		NUTs.Util.sendProxyGet(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
			obj.parseGetFeatureInfo(res, callback, callbackParams);
		});
	},
	
	parseGetFeatureInfo : function(res, callback, callbackParams) {
		var arr = [];
		
		var layers = res.getElementsByTagName("Layer");
		
		for (var i = 0, len = layers.length; i < len; i++) {
			var obj = {};
			
			obj.name = layers[i].getAttribute("name");
			obj.fields = {};
			
			fields = layers[i].getElementsByTagName("Field");
			
			for(var j=0, fLen = fields.length; j < fLen; j++) {
				obj.fields[fields[j].getAttribute("name")] = $(fields[j]).text();
			}
			
			arr.push(obj);
		}
		
		callback(arr, callbackParams);
	}
};




/*=[ WPS.js ]==========================================================================*/


NUTs.WPS = {
		
	SERVICES : "WPS",
	
	VERSION : "1.0.0",
	
	format : {
		gml : new OpenLayers.Format.GML(),
		filter : new OpenLayers.Format.Filter({ version : "1.0.0" })
	},

	getNearFeature : function(serviceUrl, dataInputs, callback) {
		var params = {
			Service : this.SERVICES,
			Version : this.VERSION,
			Request : "Execute",
			Identifier : "NearFeature",
			DataInputs : "",
			Responsedocument : "NEARFEATURE_OUTPUT"
		};
		
		params.DataInputs = "[";
		params.DataInputs += NUTs.Util.fn_convert_objToStr(dataInputs, ";");
		params.DataInputs += "]";
		
		var control = this;
		NUTs.Util.sendProxyPost(
			serviceUrl,
			NUTs.Util.fn_convert_objToStr(params),
			function(res) {
				control.parseGetFeature(res, callback);
			}
		);
	},
	
	parseGetFeature : function(res, callback) {
		var arr = [];
		var success = true;
		
		var featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
		
		if(featureCollection && featureCollection[0]) {
			var featureMembers = featureCollection[0].getElementsByTagName("gml:featureMember");
			
			for(var i=0, len = featureMembers.length; i < len; i++) {
				for(var i=0, len = featureMembers.length; i < len; i++) {
					var tables = featureMembers[i].firstChild;
					
					var tmpTable = tables.tagName;
					var index = null;
					for(var j in arr) {
						if(arr[j].table == tmpTable) {
							index = j;
							break;
						}; 
					}
					
					if(!index) {
						var obj = {
							table : tmpTable,	//테이블 명
							results : []		//레코드 들
						};
						arr.push(obj);
					}
					else {
						obj = arr[index];
					}
					
					//한개의 레코드
					var result = {
						feature : null,		//도형
						fields : {}			//필드들
					};
					
					var field = featureMembers[i].firstChild.firstChild;
					while(field) {
						//도형
						if(field.tagName.toLowerCase() == "geometry") {
							// usolver에서 공통 obj로 관리하기 위해 OpenLayers가 생성한 Feature(parsedFeature)에 아래 Custom 속성을 추가함 - ehyun.2016.06.10  
							var parsedFeature = this.format.gml.parseFeature(field);
							parsedFeature.attributes.fid = '';
							parsedFeature.renderIntent = '';
							parsedFeature.featureType = (parsedFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','')).toLowerCase();
							parsedFeature.modified = {
									geometry : {}
							};
							result["feature"] = parsedFeature;
						}
						//속성
						else {
							if(typeof field.text === 'undefined')
								result.fields[field.tagName] = field.textContent;
							else
								result.fields[field.tagName] = field.text;
							
							
						}
						field = field.nextSibling;
					}
					obj.results.push(result);
				}
			}
		}
		else {
			success = false; 
		}
		
		callback({
			data : arr,
			success : function() {
				return success;
			}
		});
	},
	
	getHoldWaterInfo : function(serviceUrl, dataInputs, callback){
		var params = {
			Service : this.SERVICES,
			Version : this.VERSION,
			Request : "Execute",
			Identifier : "HoldWater",
			DataInputs : "",
			Responsedocument : "HOLDWATER_OUTPUT"
		};
		params.DataInputs = "[";
		params.DataInputs += NUTs.Util.fn_convert_objToStr(dataInputs, ";");
		params.DataInputs += "]";
		
		var control = this;
		NUTs.Util.sendProxyPost(
			serviceUrl,
			NUTs.Util.fn_convert_objToStr(params),
			function(res) {
				control.parseHoldWaterInfo(res, callback);
			}
		);
	},
	
	parseHoldWaterInfo : function(res, callback) {
		var arr = [];
		var success = true;
		var results = {};
		var holdWater = res.getElementsByTagName("prof:HoldWater");
		
		var obj = {
			results : []	
		};
		arr.push(obj);
		
		var result = {
				pipes : [],
				valves : [],
				fires : []
		};
		
		if(holdWater && holdWater[0]){
			var field = holdWater[0].firstChild;
			var fieldText = field.text;
			if(typeof fieldText === 'undefined'){
				fieldText = field.textContent;
			}
			while(field){
				if(field.tagName.toLowerCase().split(":")[1] == "pipes"){
					result["pipes"].push(fieldText);
				}
				else if(field.tagName.toLowerCase().split(":")[1] == "valves"){
					result["valves"].push(fieldText);
				}
				else if(field.tagName.toLowerCase().split(":")[1] == "fires"){
					result["fires"].push(fieldText);
				}
				field = field.nextSibling;
			}
			obj.results.push(result);
		}
		else {
			success = false; 
		}
		
		callback({
			data : arr,
			success : function() {
				return success;
			}
		});
	}
};



/*=[ DataTool.js ]==========================================================================*/


NUTs.Tool.DataTool = OpenLayers.Class({


	/**
	 * Property: shp
	 * {Array(<NUTs.Tool.DataTool.Shp>)}: 로딩된 shp 목록
	 */
	shps : null,
	
	/**
	 * Property: dxf
	 * {Array(<NUTs.Tool.DataTool.Dxf>)}: 로딩된 dxf 목록
	 */
	dxfs : null,
	
	mode : null,
	
	initialize: function() {
        this.shps = [];
        this.dxfs = [];
    },
    
    setMode : function(mode){
    	this.mode = mode;
    },
    
    getMode : function(){
    	return this.mode;
    },
	/**********************************************************************************
	* @memberof NUTs.Tool.DataTool
	* @method
	* @description DataTool 개체 초기화
	* @param {String} type 	: "shp", "dxf"
	* @author  ggash(2017.02.20)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	initShp : function() { 
		this.shps = null;			
	},
	
	initDxf : function() { 
		this.dxfs = null;			
	},
	
	/**********************************************************************************
	* @memberof NUTs.Tool.DataTool
	* @method
	* @description 타입("shp", "dxf")에 따른 데이터 추가
	* @param {String} type 	: "shp", "dxf"
	* @param {Object} data 	: NUTs.Tool.DataTool.Shp 개체 또는 NUTs.Tool.DataTool.Dxf 개체
	* @author  ggash(2017.02.20)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	addShp : function( shp ) {		

		for(var i = 0, len = this.shps.length; i < len ; i++){
			if(this.shps == shp || this.shps[i].name == shp.name){
				 return false;
			}
		}
		
		this.shps.push(shp);
 		 
	},
	
	addDxf : function(dxf) {		

		for(var i = 0, len = this.dxfs.length; i < len ; i++){
			if(this.dxfs == dxf || this.dxfs[i].name == dxf.name){
				 return false;
			}
		}
		
		this.dxfs.push(dxf);
	},
	
	removeShp : function (shp) {
		
		for(var i = 0, len = this.shps.length; i < len ; i++){
			if(this.shps == shp || this.shps[i].name == shp.name){
				 this.shps.splice(i,1);
				 break;
			}
		}
	},
	
	removeDxf : function (dxf) {
		
		for(var i = 0, len = this.dxfs.length; i < len ; i++){
			if(this.dxfs == dxf || this.dxfs[i].name == dxf.name){
				 this.dxfs.splice(i,1);
				 break;
			}
		}
	},
	
	/**********************************************************************************
	* @memberof NUTs.Tool.DataTool
	* @method
	* @description 타입("shp", "dxf")에 따른 데이터 추출
	* => id가 지정되지 않은 경우 마지막 추가된 개체 리턴
	* @param {String} type 	: "shp", "dxf"
	* @param {Object} id 	: NUTs.Tool.DataTool.Shp 개체의 id 또는 NUTs.Tool.DataTool.Dxf 개체의 id
	* @author  ggash(2017.02.20)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	getShp : function(name) {
		var shp; 
		var shpLen = this.shps.length;  
				
		if(name){
			for(var i = 0; i < shpLen ; i++){
				var tmpShp = this.shps[i];
				if(tmpShp.name == name){
					shp = tmpShp;
					break;
				}
			}
		}
		else{
			
			if(shpLen === 0){
				var tmpShp = new NUTs.Tool.DataTool.Shp("empty_shp");
				this.addShp(tmpShp);
			}
			
			shp = this.shps[shpLen-1]
		} 
		return shp;
	},
	
	getDxf : function(name) {
		var dxf; 
		var dxfLen = this.dxfs.length;  
			
		if(name){
			for(var i = 0; i < dxfLen ; i++){
				var tmpDxf = this.dxfs[i];
				if(tmpDxf.name == name){
					dxf = tmpDxf;
					break;
				}
			}
		}
		else{
			dxf = this.dxfs[dxfLen-1]
		} 
		return dxf;
	},
	
	CLASS_NAME: "NUTs.Tool.DataTool"
});



/*=[ Dxf.js ]==========================================================================*/


NUTs.Tool.DataTool.Dxf = OpenLayers.Class(NUTs.Tool.DataTool, {
		 /**
	     * Property: maxFeatureLength
	     * {String}: 로딩할 Dxf파일의 최대 feature 수
	     */
		layer : null,
		maxFeatureLength :500,
		initialize: function(name, options) {

	        // allow user-set renderer, otherwise assign one
	        if (options.maxFeatureLength) {  
	            this.maxFeatureLength = options.maxFeatureLength;
	        } 

	    },
	    CLASS_NAME: "NUTs.Tool.DataTool.Dxf"
});



/*=[ Shp.js ]==========================================================================*/


NUTs.Tool.DataTool.Shp = OpenLayers.Class(NUTs.Tool.DataTool, {
		/**
	     * APIProperty: id
	     * {String}
	     */
	    id: null,
	    /**
	     * APIProperty: name
	     * {String}
	     */
	    name: null,
		 /**
	     * Property: maxFeatureLength
	     * {String}: 로딩할 shp파일의 최대 feature 수
	     */
		maxFeatureLength :500,
		/**
		 * (더블클릭 등의 Action으) 선택된 feature
		 */
		selectedFeature : null,
		/**
		 * 조회 : "view"
		 * 편집 : "edit"
		 */
		mode:null,

		 /**
	     * Property: layer
	     * {NUTs.Layer.Vector}: 로딩된 feature가 그려질 벡터레이어
	     */
		layer : null,
		/**
		 * Property: importFileName
		 * {String}: 읽어들인 파일 이름
		 */
		importFileName: null,

		/**
		 * Property: importFileName
		 * {String}: 읽어들인 파일 확장자
		 */
		importFileExt: null,

		 /**
	     * Property: importData
	     * {Array}
	     */
		importData: [],
		
		initialize: function(name, options) {

	        this.name = name;
	        // allow user-set renderer, otherwise assign one
	        if (options && options.maxFeatureLength) {  
	            this.maxFeatureLength = options.maxFeatureLength;
	        } 
	        if (options && options.layer) {  
	            this.layer = options.layer;
	        } 
	        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");

	    },
	    
		initImportData : function(){
			this.importData = [];
		},
		setLayer : function(layer){
			this.layer = layer;
		},
		setWorkingMode : function(mode){

			USV.COMMON.editingLayerObj = USV.COMMON.editingLayerObj || map.getLayerByName(this.importFileName);

			this.mode = mode;
			/*if(USV.COMMON.editingLayerObj)
				MAP_EDITOR.fn_set_workingMode("EDITING");*/
		},

		setImportFileName : function(fileName){
			this.importFileName = fileName;
		},
		addData : function(shape, featureCount){

			if(featureCount < this.maxFeatureLength){
				this.importData.push(this.makeDataByShp(shape));
			}
			else{
				NUTs.Util.showMessage('shp파일 로딩 오류 & 로딩 가능한 최대 개체 갯수(500)를 초과해 로딩을 중단합니다\n시스템 관리자에게 문의하세요.', 4000);
				return false;
			}

		},

		getData : function(){
			return this.importData;
		},
		
		makeDataByShp : function(shp){

			if(this.mode)
			{
				  var shpType, oGInnerShpFeature, poiList, fId;
				  switch(shp.type){
				  	case 1 :
				  		shpType = "Point";
				  		break;
				  	case 3 :
				  		shpType = "LineString";
				  		break;
				  	case 5 :
				  		shpType = "Polygon";
				  		break;
				  }

				  poiList = shp.readPoints();
				  var now =new Date();
				  shpG2Id = now.getTime() + NUTs.Util.fn_get_random(1000);

				  oGInnerShpFeature = editor.makeFeatureByPosList(shpType, poiList, shpG2Id);

				  return MAP_EDITOR.fn_make_resultObjByShp(this.importFileName, oGInnerShpFeature, shpG2Id);

				  //_importedResult = jsonData;
			  }
			  else{
				  NUTs.Util.showMessage('shp파일 로딩 오류 & 외부파일 로딩을 위한 작업 모드 설정이 필요합니다.');
				 return false;
			  }
		},

		addDataOnMap : function(arrObj){

			if(this.mode){

				  var importedFeatureLen = this.importData.length;
				  var sSelectedDataFile = this.importFileName;
				  var oTmpFeature = this.importData[0];
				  
				  var shpType;
				  if(oTmpFeature && oTmpFeature.results[0] && oTmpFeature.results[0].feature){
					  shpType = oTmpFeature.results[0].feature.featureType;
				  }
				  else{
					  shpType = COMMON.fn_get_EditLayerType(sSelectedDataFile);
				  }
				
				  var bL = 0, bR = 0, bT = 0, bB = 0;
				  var featureSumInfo = 0;
				  var featureInfoNam, featurePosList, featureInfoUnit, oGInnerFeature;

				  var oFactory = MAP_EDITOR.fn_get_objFactory();

				  var oGData 	= oFactory.Util.createGData();
				  var oGResult 	= oFactory.Util.createGResult(sSelectedDataFile);
				  
				  editor.shpLayer.removeAllFeatures();
				  
				  MAP.fn_show_dataLoading();
				  
				  setTimeout( addDataToViewLayer ,1000, this);
				  
				  function addDataToViewLayer(_oShp){
					  for(var idx = 0; idx < importedFeatureLen ; idx++) {
						  var refLinePosList;
						  var resultsObj = _oShp.importData[idx].results[0];
						  var boundsObj = resultsObj.feature.geometry.bounds;
						  oGInnerFeature = editor.makeFeatureByPosList(shpType, editor.getPosListByGeometry(resultsObj.feature.geometry), resultsObj.feature.attributes.fid);
						  //madeFeature = editor.makeFeatureByPosList(shpType, editor.getPosListByGeometry(resultsObj.feature.geometry), sSelectedDataFile +"."+resultsObj.attributes.fid);

						  oGResult.results.push(resultsObj);

						  if(shpType == "LineString"){
							  featureSumInfo += oGInnerFeature.geometry.getLength();
							  featureInfoNam = "연장";
							  featureInfoUnit = "m";
						  }
						  else if(shpType == "Polygon"){
							  featureSumInfo +=  oGInnerFeature.geometry.getArea();
							  featureInfoNam = "면적";
							  featureInfoUnit = "㎡";
						  }

						  resultsObj.fields = MAP_EDITOR.fn_get_jsonPropertyByProp(arrObj[idx]);

						  if(_oShp.mode == 'edit' && _oShp.editLayerName == sSelectedDataFile)
							  MAP_EDITOR.fn_add_featureToEditMonitorFromShp(resultsObj, sSelectedDataFile, _oShp.layer);
						  else
							  MAP_EDITOR.fn_add_featureToSearchDialogFromShp(resultsObj, sSelectedDataFile, _oShp.layer);


						  if(!bL)
							  bL = boundsObj.left;
						  else if(bL > boundsObj.left)
							  bL = boundsObj.left;

						  if(!bR)
							  bR = boundsObj.right;
						  else if(bL < boundsObj.right)
							  bR = boundsObj.right;

						  if(!bB)
							  bB = boundsObj.bottom;
						  else if(bB > boundsObj.bottom)
							  bB = boundsObj.bottom;

						  if(!bT)
							  bT = boundsObj.top;
						  else if(bT < boundsObj.top)
							  bT = boundsObj.top;

					  }
					  
					  oGData.data.push(oGResult);

					  if(_oShp.mode == 'edit')
						  editor.oSearchResult = oGData;
					  else{
						  	MAP_EDITOR.fn_create_searchList($('#searchListTree'),$('#searchContent'),oGData);

						  	$('#attrViewer').dialog({
								width : 530,
								height : 500,
								zIndex:9999
							});
						  	$(".ui-dialog").css("z-index","99999");
					  }
					  var nOffset = (map.getScale() * map.getResolution()) / 5;
					  //console.log(nOffset);
					  var loadFeatureExtent = new NUTs.Bounds(bL-nOffset, bB-nOffset, bR+nOffset, bT+nOffset);
					  map.zoomToExtent(loadFeatureExtent);

					  MAP.fn_hide_dataLoading();
					  
					  NUTs.Util.showMessage('외부파일(shp) 로딩결과 & * 파일명 : [ <strong>' + sSelectedDataFile + '.shp</strong> ]<br/>* 피쳐 개수  : [ <strong>' + importedFeatureLen + '</strong> ]개 <br/>* 총 ' + featureInfoNam + ' : [ <strong>' + NUTs.Util.fn_fmt_cur(featureSumInfo.toFixed(2)) + '</strong> ]' + featureInfoUnit + '<br/>* 데이터 유효성 점검 결과 : <span style="color:blue">이상 없음</span>', 10000);
					  return false;
					  
				  };
				  
				  
				  
			  }
			  else{
				  NUTs.Util.showMessage('shp파일 로딩 오류 & 외부파일 로딩을 위한 작업 모드 설정이 필요합니다.', 4000);
				  return false;
			  }

			$(".ui-dialog").css("z-index","99999");
		},

	    CLASS_NAME: "NUTs.Tool.DataTool.Shp"
});

 



/*=[ DrawTool.js ]==========================================================================*/

NUTs.Tool.DrawTool = OpenLayers.Class({
	
	map : null,
	
	layer : null,
	
	controls : null,
	
	defaultStyle : {
		'Point' : {
			featureType : "Point",
			pointRadius : 6,
			graphicName: "circle",
			fillColor : "#C4F500",
			fillOpacity : 0.5,
			strokeWidth : 1,
			strokeOpacity : 1,
			strokeColor : "#94E619"
		},
		
		'Line' : {
			featureType : "Line",
			strokeColor : "#C4F500",
			strokeWidth : 2,
			strokeOpacity : 1,
			strokeDashstyle : "solid",
			strokeLinecap : "butt"
		},
		
		'Polygon' : {
			featureType : "Polygon",
			fillColor : "#C4F500",
			fillOpacity : 0.4,
			strokeColor : "#94E619",
			strokeWidth : 2,
			strokeOpacity : 1,
			strokeDashstyle : "solid"
		},
		
		'Image' : {
			featureType : "Image",
			graphicOpacity : 1,
			externalGraphic : "/images/usolver/com/map/marker/edit.png",
			graphicWidth : 32,
			graphicHeight :  32
		},
		
		'Text' : {
			featureType : "Text",
			pointRadius: 4,
            graphicName: "square",
            fillColor: "white",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#245282"
		}
	},
	
	initialize : function(map, options) {
		var control = this;
		
		this.map = map;
		
		//Vector 레이어 생성
		this.layer = new NUTs.Layer.Vector(
			"DrawToolLayer",
			{
				styleMap : this.getStyleMap(),
				eventListeners: options.eventListeners
			}
		);
		
		OpenLayers.Util.extend(this, options);
		
		//벡터 레이어 등록
		map.addLayer(this.layer);
		
		//그리기 도구 컨트롤 등록
		this.controls = [
			/*new GSelectFeature(this.layer, {
				id : 'drawSelect'	
			}),*/
			/*
			new GSelectFeature(this.layer, {
				id : 'drawMultiSelect',
				toggleKey: "ctrlKey", // ctrl key removes from selection
                multipleKey: "shiftKey", // shift key adds to selection
                box: true
			}),
 */
			new OpenLayers.Control.SelectFeature(this.layer,{
				id : 'drawSelect',
                clickout: true, 
                toggleKey: "ctrlKey", // ctrl key removes from selection
                multipleKey: "shiftKey", // shift key adds to selection
                box: true
            }),
			new OpenLayers.Control.ModifyFeature(this.layer, {
				id : 'drawEdit',
				mode : OpenLayers.Control.ModifyFeature.RESHAPE | OpenLayers.Control.ModifyFeature.DRAG
			}),
			/*new NUTs.Edit.Control.ModifyFeature(this.layer, {
				id : 'drawEdit',
				mode : OpenLayers.Control.ModifyFeature.DRAG | OpenLayers.Control.ModifyFeature.RESIZE
			}),*/
			/*
			new NUTs.Edit.Control.ModifyFeature(this.layer, {
				id : 'drawEditPoint',
				mode : OpenLayers.Control.ModifyFeature.RESHAPE
			}),*/
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Point, {
				id : 'drawPoint',
				handlerOptions : {
					attributes : this.defaultStyle['Point']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Point, {
				id : 'drawSymbol',
				handlerOptions : {
					attributes : this.defaultStyle['Image']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Path, {
				id : 'drawLine',
				handlerOptions : {
					attributes : this.defaultStyle['Line']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.RegularPolygonDraw, {
				id : 'drawRect',
				handlerOptions : {
					irregular : true,
					attributes : this.defaultStyle['Polygon']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.RegularPolygonDraw, {
				id : 'drawCircle',
				handlerOptions : {
					sides : 50,
					irregular : true,
					attributes : this.defaultStyle['Polygon']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.RegularPolygonDraw, {
				id : 'drawEllipse',
				handlerOptions : {
					sides : 50,
					attributes : this.defaultStyle['Polygon']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.PolygonDraw, {
				id : 'drawPolygon',
				handlerOptions : {
					attributes : this.defaultStyle['Polygon']
				}
			}),
			new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Point, {
				id : 'drawText',
				handlerOptions : {
					attributes : this.defaultStyle['Text']
				}
			})
		];
		
		map.addControls(this.controls);
		
		if(options) {
			if(options.onFeatureAdded) {
				this.layer.events.register("featureadded", this, options.onFeatureAdded);
			}
			
			if(options.onModificationStart) {
				map.getControl('drawEdit').onModificationStart = options.onModificationStart;
//				map.getControl('drawEditPoint').onModificationStart = options.onModificationStart;
			}
			
			if(options.onSelect){
				map.getControl('drawSelect').onSelect = options.onSelect;
			}
			
			if(options.onDeactivate) {
				map.getControl('drawEdit').onDeactivate = options.onDeactivate;
//				map.getControl('drawEditPoint').onDeactivate = options.onDeactivate;
			}
			
			if(options.onUnselectAll) {
			//	map.getControl('drawEdit').selectControl.onUnselectAll = options.onUnselectAll;
//				map.getControl('drawEditPoint').selectControl.onUnselectAll = options.onUnselectAll;
			}
		}
	},
	
	getStyleMap : function() {
		//스타일 생성
		var style = new OpenLayers.Style(null);
		// 룰 생성
		style.addRules( [
			//점 스타일
			new OpenLayers.Rule( {
				symbolizer : {
					pointRadius: "\${pointRadius}",		//크기
					//그래픽 이름  "circle", "square", "star", "x", "cross", "triangle" 지원
					//저장 기능에서는 circle, square 만 지원
					graphicName: "\${graphicName}",
					fillColor: "\${fillColor}",			//면 색상
					fillOpacity: "\${fillOpacity}",		//면 투명도
					strokeWidth: "\${strokeWidth}",		//선 굵기
					strokeOpacity: "\${strokeOpacity}",	//선 투명도
					strokeColor: "\${strokeColor}"		//선 색
				},
				filter : new OpenLayers.Filter.Comparison( {
					type : "==",
					property : "featureType",
					value : "Point"
				})
			}),
			//선 스타일
			new OpenLayers.Rule( {
				symbolizer : {
					strokeColor : "\${strokeColor}", //색
					strokeWidth : "\${strokeWidth}", //굵기
					strokeOpacity : "\${strokeOpacity}", //투명도
					strokeDashstyle : "\${strokeDashstyle}", //스타일
					strokeLinecap : "\${strokeLinecap}" // 끝모양
				},
				filter : new OpenLayers.Filter.Comparison( {
					type : "==",
					property : "featureType",
					value : "Line"
				})
			}),
			//도형 스타일
			new OpenLayers.Rule( {
				symbolizer : {
					fillColor : "\${fillColor}", //면 색
					fillOpacity : "\${fillOpacity}", //면 투명도
					strokeColor : "\${strokeColor}", //선 색
					strokeWidth : "\${strokeWidth}", //선 굵기
					strokeOpacity : "\${strokeOpacity}", //선 투명도
					strokeDashstyle : "\${strokeDashstyle}" // 선 스타일
				},
				filter : new OpenLayers.Filter.Comparison( {
					type : "==",
					property : "featureType",
					value : "Polygon"
				})
			}),
			//텍스트 스타일
			new OpenLayers.Rule( {
				symbolizer : {
					pointRadius: "\${pointRadius}",
					graphicName: "\${graphicName}",
					fillColor: "\${fillColor}",
					fillOpacity: "\${fillOpacity}",
					strokeWidth: "\${strokeWidth}",
					strokeOpacity: "\${strokeOpacity}",
					strokeColor: "\${strokeColor}"
				},
				filter : new OpenLayers.Filter.Comparison( {
					type : "==",
					property : "featureType",
					value : "Text"
				})
			}),
			//이미지 스타일
			new OpenLayers.Rule( {
				symbolizer : {
					graphicOpacity : "\${graphicOpacity}", //투명도
					externalGraphic : "\${externalGraphic}", //이미지
					graphicWidth : "\${graphicWidth}", //너비
					graphicHeight : "\${graphicHeight}" // 높이
				},
				filter : new OpenLayers.Filter.Comparison( {
					type : "==",
					property : "featureType",
					value : "Image"
				})
			}),
			// default 스타일
			new OpenLayers.Rule( {
				symbolizer : {
					 strokeColor: "#0033ff",
			            strokeOpacity: .7,
			            strokeWidth: 2,
			            fillColor: "#0033ff",
			            fillOpacity: 0,
			            graphicZIndex: 2,
			            cursor: "pointer"
				},
				elseFilter: true
			})
		]);
		
		// styleMap 생성
		var styleMap = new OpenLayers.StyleMap( {
			"default" : style
		});
		
		return styleMap;
	},
	
	deleteFeature : function() {
		this.removeTextPopup();
		
		var features = [];
		if (this.layer.selectedFeatures.length > 0) {
			for(var i in this.layer.selectedFeatures) {
				features.push(this.layer.selectedFeatures[i]);
			}
		}
		
		for(var i in this.map.controls) {
			if(this.map.getControl("drawSelect") && this.map.getControl("drawSelect").active) {
				this.map.activeControls("drawSelect");
			}
			else if(this.map.getControl("drawEdit") && this.map.getControl("drawEdit").active) {
				this.map.activeControls("drawEdit");
			}
			else if(this.map.getControl("drawEditPoint") && this.map.getControl("drawEditPoint").active) {
				this.map.activeControls("drawEditPoint");
			}
		}
		
		if(features.length > 0) {
			this.layer.removeFeatures(features);
		}
	},
	
	removeTextPopup : function() {
		var id;
		
		$(".olControlDrawText").each(function() {
			if($(this).hasClass("on")) {
				id = $(this).parent().parent().parent().attr("id");	
			};
		});
		
		for(var i=this.map.popups.length-1; i >= 0; i--) {
			if(this.map.popups[i].id == id) {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
	getSelectFeature : function() {
		var id;
		
		if(this.map.getLayerByName('DrawToolLayer') && this.map.getLayerByName('DrawToolLayer').selectedFeatures && this.map.getLayerByName('DrawToolLayer').selectedFeatures.length > 0) {
			return this.map.getLayerByName('DrawToolLayer').selectedFeatures[0];
		};
		
		$(".olControlDrawText").each(function() {
			if($(this).hasClass("on")) {
				id = $(this).attr('id');
			}
		});
		
		for(var i in this.map.popups) {
			if(this.map.popups[i].attributes.seq == id.replace("drawText", "")) {
				return this.map.popups[i];
			};
		}

		return false;
	},
	
	setTextAttr : function(feature) {
		var seq = feature.attributes.seq;
		$("#drawText"+seq).css('font-family', feature.attributes.fontFamily);
		$("#drawText"+seq).css('font-size', feature.attributes.fontSize);
		$("#drawText"+seq).css('color', feature.attributes.fontColor);
		feature.updateSize();
	},
	
	addTextPopup : function(popup) {
		var seq = popup.attributes.seq;
		var str = popup.attributes.text;
		
		str = str.replace(/\x20/gi, "&nbsp;");
		str = str.replace(/\x0D\x0A/gi, "<br/>");
		str = str.replace(/\x0D/gi, "<br/>");
		str = str.replace(/\n/gi, "<br/>");
		
		var contentHtml = "";
		contentHtml += "<div class='olControlDrawText off' id='drawText" + seq + "'>" + str + "</div>";
		
		var pop = new NUTs.Popup("drawPopup" + seq, popup.getLonLat(), null, contentHtml, new OpenLayers.Pixel(0,0));
		
		this.map.addPopup(pop);
		pop.type = "draw";
		pop.attributes = popup.attributes;
		this.setTextAttr(pop);
	},
	
	removeAllFeatures : function() {
		this.layer.removeAllFeatures();
		
		for(var i=this.map.popups.length-1; i >= 0; i--) {
			if(this.map.popups[i].type == 'draw') {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
	redraw : function() {
		this.layer.redraw();
	},

	CLASS_NAME: "NUTs.Tool.DrawTool"
});



/*=[ LengendTool.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : LengendTool.js
 * 설 명 : 범례 구성을 위한 툴 개념의 클래스
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.05.19		최원석				0.1					최초 생성
 * 
 * 
**********************************************************************************/

NUTs.Tool.LengendTool = OpenLayers.Class({
	/**
	 * 지도 객체
	 */
	map : null,
	
	/**
	 * 레이어 명
	 */
	layers : null,
	
	/**
	 * 콜백 함수
	 */
	callback : null,
	
	/**
	 * sld 객체
	 */
	 sld : {},
	
	/**
	 * 전체 범례/현재 범례 여부
	 */
	allList : false,
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : NUTs.Tool.LengendTool 객체 생성
	 * 인 자 : map (지도 객체), layerName (WMS 레이어 명), layers (호출할 레이어 목록), callback (요청 처리 후 실행될 함수)
	 * 사용법 : initialize(map, layerName, callback)
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.18		최원석		최초생성
	 * 
	 **********************************************************************************/
	initialize : function(map, layerName, layers, callback) {
		this.map = map;
		
		if(layerName) {
			this.layer = this.map.getLayerByName(layerName);
		}
		else {
			this.layer = this.map.baseLayer;
		}
		
		var layerList = [];
		if(layers) {
			layerList = layers;
		}
		else { 
			layerList = this.layer.params.LAYERS;
		}

		this.callback = callback;
		
		var control = this;
		
		NUTs.WMS.getStyles(this.layer.url, layerList + ",", function(res) {
			control.sld = res;
			control.parseStyle();
		});
		
		
		this.map.events.register("moveend", this, function(){
			this.parseStyle();
		});
	},
	
	/**********************************************************************************
	 * 함수명 : parseStyle
	 * 설 명 : XML 을 Parsing 해서 json Object 를 생성
	 * 사용법 : parseStyle()
	 * 
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		최원석		최초 생성
	 * 2011.06.29		최원석		새로운 Viewer 맵 정의에 맞게 수정
	 * 								
	 **********************************************************************************/
	parseStyle : function() {
		var arr = [];
		
		var curLayers = {};
		if(!this.allList) {
			var pLayers = this.layer.params.LAYERS.split(",");
			for(var i=0, len=pLayers.length; i < len; i++) {
				curLayers[pLayers[i]] = true;
			}
		}
		
		var namedLayers = this.sld.namedLayers;
		for(var i in namedLayers) {
			var userStyles = namedLayers[i].userStyle;
			for(var j in userStyles) {
				var rules = userStyles[j].rules;
				
				for(var k in rules) {
					if(rules[k].symbolizer.text) continue;
					
					if(!this.allList) {
						var scale = parseInt(this.map.getScale());
						var maxScale = rules[k].maxScale;
						if(maxScale == 0) {
							maxScale = parseInt(OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(0), this.map.units));
						}	
					}
					
					var count = 0;
					if((curLayers[namedLayers[i].name] && maxScale >= scale && scale >= rules[k].minScale) || this.allList) {
						if(!rules[k].symbolizer.Text) {
							var lengendObj = {
								layer : namedLayers[i].name,
								style : userStyles[j].name,
								rule : rules[k].name,
								count : count
							};
							
							arr.push(lengendObj); 
							count++;
						}
					}
				}
			}
		}

		this.callback(arr);
	},
	
	/**********************************************************************************
	 * 함수명 : showFullList
	 * 설 명 : 전체 범례를 반환
	 * 사용법 : showFullList()
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		최원석		최초 생성
	 * 
	 **********************************************************************************/
	showFullList: function() {
		this.allList = true;	
		this.parseStyle();	
	},
	
	/**********************************************************************************
	 * 함수명 : showCurrentList
	 * 설 명 : 현재 범례를 반환
	 * 사용법 : showCurrentList()
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		최원석		최초 생성
	 * 
	 **********************************************************************************/
	showCurrentList: function() {
		this.allList = false;
		this.parseStyle();
	},
	
	CLASS_NAME: "NUTs.Tool.LengendTool"
});
	



/*=[ MemoTool.js ]==========================================================================*/


NUTs.Tool.MemoTool = OpenLayers.Class({
    map: null,
    layer: null,
    controls: null,
    defaultStyle: {
        "Point": {
            featureType: "Point",
            pointRadius: 6,
            graphicName: "cross",
            fillColor: "#ffffff",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#333333"
        },
        "Line": {
            featureType: "Line",
            strokeColor: "#000000",
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashstyle: "solid",
            strokeLinecap: "butt"
        },
        "Polygon": {
            featureType: "Polygon",
            fillColor: "#e0e0e0",
            fillOpacity: 1,
            strokeColor: "#000000",
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashstyle: "solid"
        },
        "Image": {
            featureType: "Image",
            graphicOpacity: 1,
            externalGraphic: "http://" + $(location).attr("host") + "/images/usolver/com/map/marker/edit.png",
            graphicWidth: 32,
            graphicHeight: 32
        },
        "Text": {
            featureType: "Text",
            pointRadius: 4,
            graphicName: "square",
            fillColor: "white",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#333333"
        }
    },
    initialize: function(map, options) {
        var control = this;
        this.map = map;
        this.layer = new NUTs.Layer.Vector("MemoToolLayer", {
            styleMap: this.getStyleMap(),
            eventListeners: options.eventListeners
        });
        OpenLayers.Util.extend(this, options);
        map.addLayer(this.layer);
        this.controls = [new OpenLayers.Control.SelectFeature(this.layer, {
                id: "drawSelectMemo",
                clickout: true,
                toggleKey: "ctrlKey",
                multipleKey: "shiftKey",
                box: true
            }), new OpenLayers.Control.ModifyFeature(this.layer, {
                id: "drawEditMemo",
                mode: OpenLayers.Control.ModifyFeature.RESHAPE | OpenLayers.Control.ModifyFeature.DRAG
            }), new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Point, {
                id: "drawMemo",
                handlerOptions: {
                    attributes: this.defaultStyle["Image"]
                }
            })/*,new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Point, {
                id: "drawMemoText",
                handlerOptions: {
                    attributes: this.defaultStyle["Text"]
                }
            })*/
        ];
        map.addControls(this.controls);
        if (options) {
            if (options.onFeatureAdded) this.layer.events.register("featureadded", this, options.onFeatureAdded);
            if (options.onModificationStart) map.getControl("drawEditMemo").onModificationStart = options.onModificationStart;
            if (options.onSelect) map.getControl("drawSelectMemo").onSelect = options.onSelect;
            if (options.onDeactivate) map.getControl("drawEditMemo").onDeactivate = options.onDeactivate;
            if (options.onUnselectAll);
        }
    },
    getStyleMap: function() {
        var style = new OpenLayers.Style(null);
        style.addRules([new OpenLayers.Rule({
            symbolizer: {
                pointRadius: "${pointRadius}",
                graphicName: "${graphicName}",
                fillColor: "${fillColor}",
                fillOpacity: "${fillOpacity}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeColor: "${strokeColor}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Point"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                strokeColor: "${strokeColor}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeDashstyle: "${strokeDashstyle}",
                strokeLinecap: "${strokeLinecap}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Line"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                fillColor: "${fillColor}",
                fillOpacity: "${fillOpacity}",
                strokeColor: "${strokeColor}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeDashstyle: "${strokeDashstyle}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Polygon"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                pointRadius: "${pointRadius}",
                graphicName: "${graphicName}",
                fillColor: "${fillColor}",
                fillOpacity: "${fillOpacity}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeColor: "${strokeColor}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Text"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                graphicOpacity: "${graphicOpacity}",
                externalGraphic: "${externalGraphic}",
                graphicWidth: "${graphicWidth}",
                graphicHeight: "${graphicHeight}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Image"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                strokeColor: "#0033ff",
                strokeOpacity: .7,
                strokeWidth: 2,
                fillColor: "#0033ff",
                fillOpacity: 0,
                graphicZIndex: 2,
                cursor: "pointer"
            },
            elseFilter: true
        })]);
        var styleMap = new OpenLayers.StyleMap({
            "default": style
        });
        return styleMap
    },
    deleteFeature: function() {
        this.removeTextPopup();
        var features = [];
        if (this.layer.selectedFeatures.length >
            0)
            for (var i in this.layer.selectedFeatures) features.push(this.layer.selectedFeatures[i]);
        for (var i in this.map.controls)
            if (this.map.getControl("drawSelect") && this.map.getControl("drawSelect").active) this.map.activeControls("drawSelect");
            else if (this.map.getControl("drawEdit") && this.map.getControl("drawEdit").active) this.map.activeControls("drawEdit");
        else if (this.map.getControl("drawEditPoint") && this.map.getControl("drawEditPoint").active) this.map.activeControls("drawEditPoint");
        if (features.length >
            0) this.layer.removeFeatures(features)
    },
    removeTextPopup: function() {
        var id;
        $(".olControlDrawText").each(function() {
            if ($(this).hasClass("on")) id = $(this).parent().parent().parent().attr("id")
        });
        for (var i = this.map.popups.length - 1; i >= 0; i--)
            if (this.map.popups[i].id == id) this.map.removePopup(this.map.popups[i])
    },
    getSelectFeature: function() {
        var id;
        if (this.map.getLayerByName("MemoToolLayer") && this.map.getLayerByName("MemoToolLayer").selectedFeatures && this.map.getLayerByName("MemoToolLayer").selectedFeatures.length >
            0) return this.map.getLayerByName("MemoToolLayer").selectedFeatures[0];
        $(".olControlDrawText").each(function() {
            if ($(this).hasClass("on")) id = $(this).attr("id")
        });
        for (var i in this.map.popups)
            if (this.map.popups[i].attributes.seq == id.replace("drawText", "")) return this.map.popups[i];
        return false
    },
    setTextAttr: function(feature) {
        var seq = feature.attributes.seq;
        $("#drawText" + seq).css("font-family", feature.attributes.fontFamily);
        $("#drawText" + seq).css("font-size", feature.attributes.fontSize);
        $("#drawText" +
            seq).css("color", feature.attributes.fontColor);
        feature.updateSize()
    },
    addTextPopup: function(popup) {
        var seq = popup.attributes.seq;
        var str = popup.attributes.text;
        str = str.replace(/\x20/gi, "&nbsp;");
        str = str.replace(/\x0D\x0A/gi, "<br/>");
        str = str.replace(/\x0D/gi, "<br/>");
        str = str.replace(/\n/gi, "<br/>");
        var contentHtml = "";
        contentHtml += "<div class='olControlDrawText off' id='drawText" + seq + "'>" + str + "</div>";
        var pop = new NUTs.Popup("drawPopup" + seq, popup.getLonLat(), null, contentHtml, new OpenLayers.Pixel(0, 0));
        this.map.addPopup(pop);
        pop.type = "draw";
        pop.attributes = popup.attributes;
        this.setTextAttr(pop)
    },
    removeAllFeatures: function() {
        this.layer.removeAllFeatures();
        for (var i = this.map.popups.length - 1; i >= 0; i--)
            if (this.map.popups[i].type == "draw") this.map.removePopup(this.map.popups[i])
    },
    redraw: function() {
        this.layer.redraw()
    },
    CLASS_NAME: "NUTs.Tool.MemoTool"
});



/*=[ SaveTool.js ]==========================================================================*/


NUTs.Tool.SaveTool = OpenLayers.Class( {

	map : null,

	xml : null,

	style : null,

	initialize : function(map) {
		this.map = map;
	},

	getXML : function(mashupLayer) {
		this.xml = "<LAYERS>";
		
		this.parseMap();
		this.parseLayer();
		this.parseVector();
		this.parsePopup();
		this.parseMashupLayer(mashupLayer);

		this.xml += "</LAYERS>";
		
		return this.xml;
	},

	parseMap : function() {
		this.xml += "<MAP>";
		var params;

		// modify ehyun 2017.02.23 for geoserver - reverse yx
		//if(CONFIG.fn_get_gisEngineType() === "GeoGate") {
			params = {
					left : this.map.getExtent().left,
					bottom : this.map.getExtent().bottom,
					right : this.map.getExtent().right,
					top : this.map.getExtent().top,
					width : this.map.getSize().w,
					height : this.map.getSize().h,
					resolution : this.map.getResolution()
				};
		/*}
		else if(CONFIG.fn_get_gisEngineType() === "GeoServer") {
			params = {
					left : this.map.getExtent().bottom,
					bottom : this.map.getExtent().left,
					right : this.map.getExtent().top,
					top : this.map.getExtent().right,
					width : this.map.getSize().w,
					height : this.map.getSize().h,
					resolution : this.map.getResolution()
				};
		}*/

		this.write(params);

		this.xml += "</MAP>";
	},
	
	parseLayer : function() {
		for ( var i = 0; i < this.map.layers.length; i++) {
//			if ((this.map.layers[i].CLASS_NAME == "GWMS" || this.map.layers[i].CLASS_NAME == "GWMSPost") && this.map.layers[i].visibility) {
			if ((this.map.layers[i].CLASS_NAME == "NUTs.Layer.WMS") && this.map.layers[i].visibility) {
				this.xml += '<LAYER type="wms">';
				
				var params = {
					url : this.map.layers[i].url,
					layers : this.map.layers[i].params.LAYERS,
					styles : this.map.layers[i].params.STYLES,
					format : this.map.layers[i].params.FORMAT,
					version : this.map.layers[i].params.VERSION,
					crs : this.map.layers[i].params.CRS,
					service : this.map.layers[i].params.SERVICE,
					request : this.map.layers[i].params.REQUEST,
					exceptions : this.map.layers[i].params.EXCEPTIONS
				};
				
				if(this.map.layers[i].params.SLD_BODY) {
					params.sldbody = this.map.layers[i].params.SLD_BODY;
				};
				
				this.write(params);

				this.xml += "</LAYER>";
			}
			else if (this.map.layers[i].CLASS_NAME == "GTileCache" && this.map.layers[i].visibility) {
				this.xml += '<LAYER type="tilecache">';

				params = {
					url : this.map.layers[i].url,
					layername : this.map.layers[i].layername,
					scaleLevel : this.map.getZoom()+2,
					maxLeft : this.map.layers[i].maxExtent.left,
					maxBottom : this.map.layers[i].maxExtent.bottom,
					maxRight : this.map.layers[i].maxExtent.right,
					maxTop : this.map.layers[i].maxExtent.top,
					extension : "."+ this.map.layers[i].format.split('/')[1].toLowerCase()
				};

				this.write(params);

				this.xml += "</LAYER>";
			}
			else if(this.map.layers[i].CLASS_NAME == "OpenLayers.Layer.ArcGISCache" && this.map.layers[i].visibility) {
				this.xml += '<LAYER type="ArcGISCache">';
				
				var res = this.map.layers[i].getResolution();
				var start = this.map.layers[i].getUpperLeftTileCoord(res);
		        var end = this.map.layers[i].getLowerRightTileCoord(res);

		        var numTileCols = (end.x - start.x) + 1;
		        var numTileRows = (end.y - start.y) + 1;
				params = {
					url : this.map.layers[i].url,
					tileOriginLon : this.map.layers[i].tileOrigin.lon,
					tileOriginLat : this.map.layers[i].tileOrigin.lat,
					minRows : numTileRows,
					minCols : numTileCols,
					centerX : this.map.getExtent().getCenterLonLat().lon,
					centerY : this.map.getExtent().getCenterLonLat().lat,
					scaleLevel : this.map.getZoom(),
					maxLeft : this.map.layers[i].maxExtent.left,
					maxBottom : this.map.layers[i].maxExtent.bottom,
					maxRight : this.map.layers[i].maxExtent.right,
					maxTop : this.map.layers[i].maxExtent.top
				};

				this.write(params);

				this.xml += "</LAYER>";
			}
		}
	},

	parseVector : function() {
		for(var i=0; i < this.map.layers.length; i++) {
			if(this.map.layers[i].CLASS_NAME == "NUTs.Layer.Vector" && this.map.layers[i].visibility) {
				
				this.xml += "<VECTORLAYER>";
				for(var j=0; j < this.map.layers[i].features.length; j++) {
					if(this.map.layers[i].features[j].geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
						/*if(!this.map.layers[i].features[j].attributes.featureType) {
							continue;
						}*/
						
						var params;
						var style = this.map.layers[i].parseStyle(this.map.layers[i].features[j]);
						
						if(/*this.map.layers[i].features[j].attributes.featureType == "Image"*/style.externalGraphic) {
							params = {
								x : this.map.layers[i].features[j].geometry.x,
								y : this.map.layers[i].features[j].geometry.y,
								featureType : "Image",
								opacity : style.fillOpacity,
								width : style.graphicWidth,
								height : style.graphicHeight,
								image : style.externalGraphic
							};
						}
						else if (/*this.map.layers[i].features[j].attributes.featureType == "Point"*/style.graphicName) {
							
							if(!(style.graphicName == "circle" || style.graphicName == "square")) {
								style.graphicName == "circle";
							}
							
							params = {
								x : this.map.layers[i].features[j].geometry.x,
								y : this.map.layers[i].features[j].geometry.y,
								featureType : "Point",
								radius : style.pointRadius,
								graphicName : style.graphicName,
								stroke : style.strokeWidth,
								color : style.strokeColor,
								opacity : style.strokeOpacity,
								fillColor : style.fillColor,
								fillOpacity : style.fillOpacity
							};
						}
						
						this.xml += '<FEATURE type="point">';
						
						this.write(params);
						
						this.xml += "</FEATURE>";
					}
					else if(this.map.layers[i].features[j].geometry.CLASS_NAME == "OpenLayers.Geometry.LineString") {
						
						var style = this.map.layers[i].parseStyle(this.map.layers[i].features[j]);

						if(this.map.layers[i].features[j].attributes.featureType == "arrow") {
							this.xml += '<FEATURE type="arrow">';
						}
						else {
							this.xml += '<FEATURE type="lineString">';
						}

						var x = [];
						var y = [];

						for(var k = 0; k < this.map.layers[i].features[j].geometry.components.length; k++) {
							x.push(this.map.layers[i].features[j].geometry.components[k].x);
							y.push(this.map.layers[i].features[j].geometry.components[k].y);
						}

						var params = {
							x : x,
							y : y,
							color : style.strokeColor,
							opacity : style.strokeOpacity,
							stroke : style.strokeWidth,
							strokeDashstyle : style.strokeDashstyle,
							strokeLinecap : style.strokeLinecap
						};

						this.write(params);

						this.xml += "</FEATURE>";
					}
					else if(this.map.layers[i].features[j].geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon") {
						var style = this.map.layers[i].parseStyle(this.map.layers[i].features[j]);
						
						this.xml += '<FEATURE type="polygon">';

						var x = [];
						var y = [];

						for(var k = 0; k < this.map.layers[i].features[j].geometry.components[0].components.length; k++) {
							x.push(this.map.layers[i].features[j].geometry.components[0].components[k].x);
							y.push(this.map.layers[i].features[j].geometry.components[0].components[k].y);
						}
						
						var params = {
							x : x,
							y : y,
							color : style.strokeColor,
							opacity : style.strokeOpacity,
							stroke : style.strokeWidth,
							fillColor : style.fillColor,
							fillOpacity : style.fillOpacity,
							label : style.label,
							fontColor : style.fontColor,
							centerX : this.map.layers[i].features[j].geometry.getCentroid().x,
							centerY : this.map.layers[i].features[j].geometry.getCentroid().y,
							strokeDashstyle : style.strokeDashstyle,
							strokeLinecap : style.strokeLinecap
						};
						this.write(params);

						this.xml += "</FEATURE>";
					}
					else if(this.map.layers[i].features[j].geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPolygon") {
						var style = this.map.layers[i].parseStyle(this.map.layers[i].features[j]);
						
						var feature = this.map.layers[i].features[j];
						
						for(var k=0; k < feature.geometry.components.length; k++) {
							this.xml += '<FEATURE type="polygon">';

							var x = [];
							var y = [];
							
							var polygonComponent = feature.geometry.components[k];
							
							for(var l=0; l < polygonComponent.components[0].components.length; l++) {
								x.push(polygonComponent.components[0].components[l].x);
								y.push(polygonComponent.components[0].components[l].y);
							}
							
							var params = {
								x : x,
								y : y,
								color : style.strokeColor,
								opacity : style.strokeOpacity,
								stroke : style.strokeWidth,
								fillColor : style.fillColor,
								fillOpacity : style.fillOpacity,
								label : style.label,
								fontColor : style.fontColor,
								centerX : this.map.layers[i].features[j].geometry.getCentroid().x,
								centerY : this.map.layers[i].features[j].geometry.getCentroid().y,
								strokeDashstyle : style.strokeDashstyle,
								strokeLinecap : style.strokeLinecap
							};
							
							this.write(params);
							
							this.xml += "</FEATURE>";
						}
					}
				}
				
				this.xml += "</VECTORLAYER>";
			}
		}
	},
	
	parsePopup : function() {
		if(this.map.popups.length > 0) this.xml += "<POPUPS>";
		
		for(var i=0; i < this.map.popups.length; i++) {
			if(this.map.popups[i].attributes && this.map.popups[i].attributes.print) {
				this.xml += "<POPUP>";
				
				if(!this.map.popups[i].attributes.fontFamily) {
					this.map.popups[i].attributes.fontFamily = "굴림";
				}
				if(!this.map.popups[i].attributes.fontSize) {
					this.map.popups[i].attributes.fontSize = "12";
				}
				if(!this.map.popups[i].attributes.fontColor)
					this.map.popups[i].attributes.fontColor = "#000000";
				
				var params = {
					x : this.map.popups[i].lonlat.lon,
					y : this.map.popups[i].lonlat.lat,
					width : $(this.map.popups[i].contentDiv).css("width").replace("px",""),
					height : $(this.map.popups[i].contentDiv).css("height").replace("px",""),
					text : this.map.popups[i].attributes.text,
					fontFamily : this.map.popups[i].attributes.fontFamily,
					fontSize : this.map.popups[i].attributes.fontSize.replace("px", ""),
					fontColor : this.map.popups[i].attributes.fontColor
				};
			
				this.write(params);
				
				this.xml += "</POPUP>";
			}
		}
		
		if(this.map.popups.length > 0) this.xml += "</POPUPS>";
	},
	
	parseMashupLayer : function(mashupLayer) {
		this.xml += '<MASHUPLAYER type="'+mashupLayer.type+'">';
		var params = {
			url : mashupLayer.url,
			minX : mashupLayer.minX,
			maxX : mashupLayer.maxX,
			minY : mashupLayer.minY,
			maxY : mashupLayer.maxY,
		}
		this.write(params);
		this.xml += "</MASHUPLAYER>";
	},

	write : function(obj) {
		for ( var i in obj) {
			this.xml += "<" + i + ">" + encodeURIComponent(obj[i])
					+ "</" + i + ">";
		}
	},

	CLASS_NAME : "NUTs.Tool.SaveTool"
});



/*=[ SearchSpaceTool.js ]==========================================================================*/


NUTs.Tool.SearchSpaceTool = OpenLayers.Class({
    map: null,
    layer: null,
    controls: null,
    defaultStyle: {
        "Point": {
            featureType: "Point",
            pointRadius: 6,
            graphicName: "cross",
            fillColor: "#CFF207",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#41B020"
        },
        "Line": {
            featureType: "Line",
            strokeColor: "#41B020",
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeDashstyle: "dash",
            strokeLinecap: "butt"
        },
        "Polygon": {
            featureType: "Polygon",
            fillColor: "#CFF207",
            fillOpacity: 0.2,
            strokeColor: "#41B020",
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeDashstyle: "dash"
        }
    },
    initialize: function(map, options) {
        var control = this;
        this.map = map;
        this.layer = new NUTs.Layer.Vector("searchAreaLayer", {
        	searchCondition: {},
            styleMap: this.getStyleMap(),
            eventListeners: options.eventListeners
        });
        OpenLayers.Util.extend(this, options);
        map.addLayer(this.layer);
        this.controls = [new OpenLayers.Control.SelectFeature(this.layer, {
                id: "searchSelect",
                clickout: true,
                toggleKey: "ctrlKey",
                multipleKey: "shiftKey",
                box: true
            }), new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Point, {
                id: "searchPoint",
                handlerOptions: {
                    attributes: this.defaultStyle["Point"]
                }
            }), new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.RegularPolygonDraw, {
                id: "searchRect",
                handlerOptions: {
                	irregular: true,
                    attributes: this.defaultStyle["Polygon"]
                }
            }), new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.PolygonDraw, {
                id: "searchPolygon",
                handlerOptions: {
                    attributes: this.defaultStyle["Polygon"]
                }
            }), new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.Path, {
                id: "searchLine",
                handlerOptions: {
                    attributes: this.defaultStyle["Line"]
                }
            }), new NUTs.Control.DrawFeature(this.layer, NUTs.Handler.RegularPolygonDraw, {
                id: "searchCircle",
                handlerOptions: {
                	 sides: 50,
                    attributes: this.defaultStyle["Polygon"]
                }
            })
        ];
        map.addControls(this.controls);
        if (options) {
            if (options.onFeatureAdded) this.layer.events.register("featureadded", this, options.onFeatureAdded);
            if (options.onSelect) map.getControl("searchSelect").onSelect = 
                options.onSelect;
            if (options.onUnselectAll);
        }
    },
    getStyleMap: function() {
        var style = new OpenLayers.Style(null);
        style.addRules([new OpenLayers.Rule({
            symbolizer: {
                pointRadius: "${pointRadius}",
                graphicName: "${graphicName}",
                fillColor: "${fillColor}",
                fillOpacity: "${fillOpacity}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeColor: "${strokeColor}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Point"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                strokeColor: "${strokeColor}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeDashstyle: "${strokeDashstyle}",
                strokeLinecap: "${strokeLinecap}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Line"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                fillColor: "${fillColor}",
                fillOpacity: "${fillOpacity}",
                strokeColor: "${strokeColor}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeDashstyle: "${strokeDashstyle}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Polygon"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                pointRadius: "${pointRadius}",
                graphicName: "${graphicName}",
                fillColor: "${fillColor}",
                fillOpacity: "${fillOpacity}",
                strokeWidth: "${strokeWidth}",
                strokeOpacity: "${strokeOpacity}",
                strokeColor: "${strokeColor}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Text"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                graphicOpacity: "${graphicOpacity}",
                externalGraphic: "${externalGraphic}",
                graphicWidth: "${graphicWidth}",
                graphicHeight: "${graphicHeight}"
            },
            filter: new OpenLayers.Filter.Comparison({
                type: "==",
                property: "featureType",
                value: "Image"
            })
        }), new OpenLayers.Rule({
            symbolizer: {
                strokeColor: "#0033ff",
                strokeOpacity: .7,
                strokeWidth: 2,
                fillColor: "#0033ff",
                fillOpacity: 0,
                graphicZIndex: 2,
                cursor: "pointer"
            },
            elseFilter: true
        })]);
        var styleMap = new OpenLayers.StyleMap({
            "default": style,
        });
        return styleMap
    },
    /*deleteFeature: function() {
        this.removeTextPopup();
        var features = [];
        if (this.layer.selectedFeatures.length >
            0)
            for (var i in this.layer.selectedFeatures) features.push(this.layer.selectedFeatures[i]);
        for (var i in this.map.controls)
            if (this.map.getControl("drawSelect") && this.map.getControl("drawSelect").active) this.map.activeControls("drawSelect");
            else if (this.map.getControl("drawEdit") && this.map.getControl("drawEdit").active) this.map.activeControls("drawEdit");
        else if (this.map.getControl("drawEditPoint") && this.map.getControl("drawEditPoint").active) this.map.activeControls("drawEditPoint");
        if (features.length >
            0) this.layer.removeFeatures(features)
    },*/
    /*removeTextPopup: function() {
        var id;
        $(".olControlDrawText").each(function() {
            if ($(this).hasClass("on")) id = $(this).parent().parent().parent().attr("id")
        });
        for (var i = this.map.popups.length - 1; i >= 0; i--)
            if (this.map.popups[i].id == id) this.map.removePopup(this.map.popups[i])
    },*/
    /*getSelectFeature: function() {
        var id;
        if (this.map.getLayerByName("GDrawToolLayer") && this.map.getLayerByName("GDrawToolLayer").selectedFeatures && this.map.getLayerByName("GDrawToolLayer").selectedFeatures.length >
            0) return this.map.getLayerByName("GDrawToolLayer").selectedFeatures[0];
        $(".olControlDrawText").each(function() {
            if ($(this).hasClass("on")) id = $(this).attr("id")
        });
        for (var i in this.map.popups)
            if (this.map.popups[i].attributes.seq == id.replace("drawText", "")) return this.map.popups[i];
        return false
    },*/
    /*setTextAttr: function(feature) {
        var seq = feature.attributes.seq;
        $("#drawText" + seq).css("font-family", feature.attributes.fontFamily);
        $("#drawText" + seq).css("font-size", feature.attributes.fontSize);
        $("#drawText" +
            seq).css("color", feature.attributes.fontColor);
        feature.updateSize()
    },
    addTextPopup: function(popup) {
        var seq = popup.attributes.seq;
        var str = popup.attributes.text;
        str = str.replace(/\x20/gi, "&nbsp;");
        str = str.replace(/\x0D\x0A/gi, "<br/>");
        str = str.replace(/\x0D/gi, "<br/>");
        str = str.replace(/\n/gi, "<br/>");
        var contentHtml = "";
        contentHtml += "<div class='olControlDrawText off' id='drawText" + seq + "'>" + str + "</div>";
        var pop = new GPopup("drawPopup" + seq, popup.getLonLat(), null, contentHtml, new OpenLayers.Pixel(0, 0));
        this.map.addPopup(pop);
        pop.type = "draw";
        pop.attributes = popup.attributes;
        this.setTextAttr(pop)
    },*/
    removeAllFeatures: function() {
        this.layer.removeAllFeatures();
        for (var i = this.map.popups.length - 1; i >= 0; i--)
            if (this.map.popups[i].type == "draw") this.map.removePopup(this.map.popups[i])
    },
    redraw: function() {
        this.layer.redraw()
    },
    CLASS_NAME: "NUTs.Tool.SearchSpaceTool"
});



/*=[ SLDTool.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : SLDTool.js
 * 설 명 : 지도 SLD_BODY 객체 형태로 관리
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2012.05.23		이경찬				0.1					최초 생성
 * 2012.05.24		이경찬				0.2					getSLDXML 생성
 * 2012.05.25		이경찬				0.3					getXMLSLD 생성
 * 2012.05.25		이경찬				0.4					searchNamedLayer 생성 (명칭검색)
 * 															searchRule 생성 (명칭검색)
 * 2012.05.25		이경찬				0.5					createMapTopic, createNamedLayers
 * 															createUserStyle, createRules
 * 															createSymbolizer 생성 (속성으로 객체생성)
 * 															regNamedLayers, regUserStyle
 * 															regRules, regSymbolizer 생성 (상위 객체에 해당객체 등록)
 * 															updateNamedLayer(해당 NamedLayer 수정 or 추가)
 * 															delNamedLayer, delRule
 * 															delSymbolizer 생성 (해당 객체 삭제)
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/

NUTs.Tool.SLDTool = OpenLayers.Class({
	
	/*
	 *  SLD_BODY의 JSON 객체 타입
	 */
	data : null,
	
	/**********************************************************************************
	* 함수명 : initialize (생성자 함수)
	* 설 명 : GSLD 객체 생성
	* 인 자 : xml (SLD_BODY의 XML String 형태)
	* 사용법 : new GSLD(xml)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	initialize : function(sld,type){
		if(type == "xml"){
			this.data = this.getSLDObj(sld);
		}
		else if(type == "obj"){
			this.data = sld.data;
		}
		
	},
	
	getData : function() {
		return this.data;
	},
	
	/**********************************************************************************
	* 함수명 : getSLDObj
	* 설 명 : XML형태의 SLD_BODY를 Object(Json)형태로 변환
	* 인 자 : xml (SLD_BODY의 XML String 형태)
	* 사용법 : getSLDObj(xml)
	* 작성일 : 2012.05.23
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 2012.05.23		이경찬		NamedLayer, UserStyle, Rule별로 함수화
	* 
	**********************************************************************************/
	getSLDObj : function(xml) {
		var data;
		var namedObj;
		var userdObj;
		var ruleObj;
		
		var namedLayers;
		var userStyles;
		var rules;
		
		data = this.readMapTopic(xml);
		
		namedLayers = xml.getElementsByTagName("sld:NamedLayer");
		for(var i=0, iLen=namedLayers.length ; i < iLen ; i++){
			namedObj =  this.readNamedLayer(namedLayers[i]);
			userStyles = namedLayers[i].getElementsByTagName("sld:UserStyle");
			for(var j=0, jLen=userStyles.length ; j < jLen ; j++){
				userdObj = this.readUserStyle(userStyles[j]);
				rules = userStyles[j].getElementsByTagName("se:Rule");
				for(var k=0, kLen=rules.length ; k < kLen ; k++){
					ruleObj = this.readRule(rules[k]);
					userdObj.rules.push(ruleObj);
				}
				namedObj.userStyle.push(userdObj);
			}
			data.namedLayers.push(namedObj);
		}
		
		return data;
	},

	/**********************************************************************************
	* 함수명 : readMapTopic
	* 설 명 : XML형태의 SLD_BODY에서 MapTopic부분의 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : xml (SLD_BODY의 XML String 형태)
	* 사용법 : readMapTopic(xml)
	* 작성일 : 2012.05.23
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	readMapTopic : function(xml){
		var data = {
				name : "",
				title : "",
				namedLayers : []
		};
		
		var element = xml.getElementsByTagName("se:Name");
		
		// MapTopic 명  (서울 상수 맵토픽 이름 : MapTopic)
		if(element.length > 0) {
			data.name = xml.getElementsByTagName("se:Name")[0].text;
		}
		
		element = xml.getElementsByTagName("se:Description");
		
		if(element.length > 0){
			var subElement = element[0].getElementsByTagName("se:Title");
			if(subElement.length > 0) data.title = subElement[0].text;
		}
		
		return data;
		
	},
	
	/**********************************************************************************
	* 함수명 : readNamedLayer
	* 설 명 : XML형태의 SLD_BODY에서 NamedLayer부분의 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : namedLayers (SLD_BODY의 NamedLayer 엘리먼트 == <sld:NamedLayer>)
	* 사용법 : readNamedLayer(namedLayers)
	* 작성일 : 2012.05.23
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	readNamedLayer : function(namedLayers){
		var namedObj = {
			name : "",
			title : "",
			featureTypeName : "",
			userStyle : []
		};
		
		// NamedLayer 이름 ( 예> 제수밸브 )
		var element = namedLayers.getElementsByTagName("se:Name");
		if(element.length > 0) namedObj.name = element[0].text;
		
		// Description (위의 NamedLayer명과 동일)
		element = namedLayers.getElementsByTagName("se:Description");
		if(element.length > 0) {
			var subElement = element[0].getElementsByTagName("se:Title");
			if(subElement.length > 0) namedObj.title = subElement[0].text;
		}
		
		// LayerFeatureConstraints ( NamedLayer의 DB 명칭 : 예> TE_RVLV )
		element = namedLayers.getElementsByTagName("sld:LayerFeatureConstraints");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("se:FeatureTypeName");
			if(subElement.length > 0) namedObj.featureTypeName = subElement[0].text;
		}
		
		return namedObj;
		
	},
	
	/**********************************************************************************
	* 함수명 : readUserStyle
	* 설 명 : XML형태의 SLD_BODY에서 UserStyle부분의 정보를 파싱하고 Object(Json)형태로 return
	* 		 (현재 상수도 프로젝트에서는 UserStyle를 활용하지 않음.)
	* 인 자 : userStyles (SLD_BODY의 UserStyle 엘리먼트 == <sld:UserStyle>)
	* 사용법 : readUserStyle(userStyles)
	* 작성일 : 2012.05.23
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	readUserStyle : function(userStyles){
		// UserStyle
		var userdObj = {
			name : "",
			title : "",
			featureTypeName : "",
			rules : []
		};
		
		// UserStyle 이름 (현재 상수에선 따로 사용하지 않는다.)
		var element = userStyles.getElementsByTagName("se:Name");
		if(element.length > 0) userdObj.name = element[0].text;
		
		// Description (위의 UserStyle 이름과 동일)
		element = userStyles.getElementsByTagName("se:Description");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("se:Title");
			if(subElement.length > 0) userdObj.title = subElement[0].text;
		}
		
		// FeatureTypeStyle (위의 UserStyle 이름과 동일)
		element = userStyles.getElementsByTagName("se:FeatureTypeStyle");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("se:FeatureTypeName");
			if(subElement.length > 0) userdObj.featureTypeName = subElement[0].text;
		}
			
		return userdObj;
		
	},
	
	/**********************************************************************************
	* 함수명 : readRule
	* 설 명 : XML형태의 SLD_BODY에서 Rule 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : rules (SLD_BODY의 Rule 엘리먼트 == <se:Rule>)
	* 사용법 : readRule(rules)
	* 작성일 : 2012.05.23
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 2012.05.24		이경찬		Symbolizer 함수화
	**********************************************************************************/
	readRule : function(rules){
		var ruleObj = {
			name : "",
			filterName : "",
			filterLiteral : "",
			minScale : "",
			maxScale : "",
			symbolizer : {}
		};
		
		// Rule 이름 ( 예> 제수밸브의 개, 폐, 부분 )
		var element = rules.getElementsByTagName("se:Name");
		if(element.length > 0) ruleObj.name = element[0].text;
		
		// Filter (사업소경계중 남부수도사업소만 보여주고 싶을 때)
		element = rules.getElementsByTagName("ogc:Filter");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("PropertyIsEqualTo");
			if(subElement.length > 0) {
				ruleObj.filterName_equal = subElement[0].getElementsByTagName("ogc:PropertyName")[0].text;
				ruleObj.filterLiteral_equal = subElement[0].getElementsByTagName("Literal")[0].text;
			}
			
			subElement = element[0].getElementsByTagName("PropertyIsGreaterThanOrEqualTo");
			if(subElement.length > 0){
				ruleObj.filterName_more = [];
				ruleObj.more = [];
				for(var i=0,len=subElement.length ; i<len ; i++){
					ruleObj.filterName_more.push(subElement[i].getElementsByTagName("ogc:PropertyName")[0].text);
					ruleObj.more.push(subElement[i].getElementsByTagName("Literal")[0].text);
				}
			}
			subElement = element[0].getElementsByTagName("PropertyIsLessThan");
			if(subElement.length > 0){
				ruleObj.filterName_less = [];
				ruleObj.less = [];
				for(var i=0,len=subElement.length ; i<len ; i++){
					ruleObj.filterName_less.push(subElement[i].getElementsByTagName("ogc:PropertyName")[0].text);
					ruleObj.less.push(subElement[i].getElementsByTagName("Literal")[0].text);
				}
			}
			
			subElement = element[0].getElementsByTagName("PropertyIsGreaterThan");
			if(subElement.length > 0){
				ruleObj.filterName_greater = subElement[0].getElementsByTagName("ogc:PropertyName")[0].text; 
				ruleObj.filterLiteral_greater = subElement[0].getElementsByTagName("Literal")[0].text;
			}
		}
		// MinScaleDenominator (유효축척의 MinScale값)
		element = rules.getElementsByTagName("se:MinScaleDenominator");
		if(element.length > 0) ruleObj.minScale = element[0].text;
		
		// MaxScaleDenominator (유효축척의 MaxScale값)
		element = rules.getElementsByTagName("se:MaxScaleDenominator");
		if(element.length > 0) ruleObj.maxScale = element[0].text;
		
		// Symbolizer (종류 : PointSymbolizer, LineSymbolizer, PolygonSymbolizer, TextSymbolizer)
		var points = rules.getElementsByTagName("se:PointSymbolizer");
		var lines = rules.getElementsByTagName("se:LineSymbolizer");
		var polygons = rules.getElementsByTagName("se:PolygonSymbolizer");
		var texts = rules.getElementsByTagName("se:TextSymbolizer");
		
		if(points.length > 0) {
			ruleObj.symbolizer["point"] = this.readPointSym(points);
		}
		
		if(lines.length > 0) {
			for(var i=0,len=lines.length ; i<len ; i++){
				if(i == 0){
					ruleObj.symbolizer["line"] = this.readLineSym(lines[i]);
				}
				else{
					ruleObj.symbolizer["line" + i] = this.readLineSym(lines[i]);
				}
			}
		}
		
		if(polygons.length > 0) {
			ruleObj.symbolizer["polygon"] = this.readPolySym(polygons);
		}
		
		if(texts.length > 0) {
			ruleObj.symbolizer["text"] = this.readTextSym(texts);
		}
		
		return ruleObj;
		
	},
	
	/**********************************************************************************
	* 함수명 : readPointSym
	* 설 명 : XML형태의 SLD_BODY에서 Rule내부의 PointSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : points (SLD_BODY의 PointSymbolizer 엘리먼트 == <se:PointSymbolizer>)
	* 사용법 : readPointSym(points)
	* 작성일 : 2012.05.24
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.24		이경찬		최초 생성
	* 
	**********************************************************************************/
	readPointSym : function(points){
		var pointObj = {};
		
		// PointSymbolizer 타입
		pointObj["type"] = "point";
		
		// PointSymbolizer 버전
		pointObj["version"] = points[0].getAttribute("version");
		
		// PointSymbolizer 이름
		var symbolName = points[0].getElementsByTagName("se:Name");
		if(symbolName.length > 0) pointObj["name"] = symbolName[0].text;
		
		// Point Size 크기
		var svgParam = points[0].getElementsByTagName("se:Size");
		if(svgParam.length > 0) pointObj["size"] = svgParam[0].text;
		
		// Point Opacity 투명도
		svgParam = points[0].getElementsByTagName("se:Opacity");
		//if(svgParam.length > 0) pointObj["opacity"] = svgParam[0].text;
		if(svgParam.length > 0) pointObj["opacity"] = "1.0";
		
		// Point Rotation 회전
		svgParam = points[0].getElementsByTagName("se:Rotation");
		if(svgParam.length > 0) {
			var rotation = svgParam[0].getElementsByTagName("ogc:PropertyName");
			if(rotation.length > 0) pointObj["rotation"] = rotation[0].text;
		}
		
		
		// Point Displacement X,Y
		svgParam = points[0].getElementsByTagName("se:Displacement");
		if(svgParam.length > 0) {
			var x = svgParam[0].getElementsByTagName("se:DisplacementX");
			if(x.length > 0) pointObj["displacementX"] = x[0].text;
			
			var y = svgParam[0].getElementsByTagName("se:DisplacementY");
			if(y.length > 0) pointObj["displacementY"] = y[0].text;
		}
		
		// Point Symbol Image 심볼이미지
		var externalGraphics = points[0].getElementsByTagName("se:ExternalGraphic");
		if(externalGraphics.length > 0) {
			// InlineContent (Base64인코딩된 이미지)
			var inlineContents = externalGraphics[0].getElementsByTagName("se:InlineContent");
			if(inlineContents.length > 0) {
				pointObj["externalGraphic"] = inlineContents[0].text;
				pointObj["encoding"] = inlineContents[0].getAttribute("encoding");
			}
			
			// Format (이미지 형식 : 예> image/png)
			var format = externalGraphics[0].getElementsByTagName("se:Format");
			if(format.length > 0) pointObj["format"] = format[0].text;
		}
		
		// Point Symbol Mark 심볼마커
		var graphic = points[0].getElementsByTagName("se:Graphic");
		if(graphic.length > 0){
			var mark = graphic[0].getElementsByTagName("se:Mark");
			if(mark.length > 0){
				var vendor = mark[0].getElementsByTagName("sld:VendorOption");
				for(var i=0, len=vendor.length ; i < len ; i++){
					if(vendor[i].getAttribute("name") == "font-family"){
						pointObj["markFont"] = vendor[i].text;
					}
					else if(vendor[i].getAttribute("name") == "char-code"){
						pointObj["markCharCode"] = vendor[i].text;
					}
					else if(vendor[i].getAttribute("name") == "fill"){
						pointObj["markFill"] = vendor[i].text;
					}
				}
			}
		}
		return pointObj;
		
	},
	
	/**********************************************************************************
	* 함수명 : readLineSym
	* 설 명 : XML형태의 SLD_BODY에서 Rule내부의 LineSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : lines (SLD_BODY의 LineSymbolizer 엘리먼트 == <se:LineSymbolizer>)
	* 사용법 : readLineSym(lines)
	* 작성일 : 2012.05.24
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.24		이경찬		최초 생성
	* 
	**********************************************************************************/
	readLineSym : function(lines){
		var lineObj = {};
		
		// LineSymbolizer 타입
		lineObj["type"] = "line";
		
		// LineSymbolizer 버전
		lineObj["version"] = lines.getAttribute("version");
		
		// LineSymbolizer 이름
		var symbolName = lines.getElementsByTagName("se:Name");
		if(symbolName.length > 0) lineObj["name"] = symbolName[0].text;
		
		if(lineObj["name"] == "CompositeLineCap"){
			lineObj.arrow = true;
		}
		if(lineObj["name"] == "CompositeLineMarker"){
			lineObj.marker = true;
		}
		
		// LineSymbolizer 속성
		var svgParam = lines.getElementsByTagName("se:SvgParameter");
		for(var l=0, lLen=svgParam.length; l < lLen; l++) {
			// Line 색 ( 예> #ffffff )
			if(svgParam[l].getAttribute("name") == "stroke") {
				lineObj["stroke"] = svgParam[l].text;
			}
			// Line width 두께
			if(svgParam[l].getAttribute("name") == "stroke-width") {
				lineObj["strokeWidth"] = svgParam[l].text;
			}
			// Line opacity 투명도
			if(svgParam[l].getAttribute("name") == "stroke-opacity") {
				lineObj["strokeOpacity"] = svgParam[l].text;
			}
			// Line linecap 모서리 스타일
			if(svgParam[l].getAttribute("name") == "stroke-linecap") {
				lineObj["strokeLinecap"] = svgParam[l].text;
			}
			// Line dasharray 선 스타일
			if(svgParam[l].getAttribute("name") == "stroke-dasharray") {
				lineObj["strokeDasharray"] = svgParam[l].text;
			}
			// Line linejoin 선 연결지점 모양
			if(svgParam[l].getAttribute("name") == "stroke-linejoin") {
				lineObj["strokeLinejoin"] = svgParam[l].text;
			}
		}
		var svgParam = lines.getElementsByTagName("se:VendorOption");
		if(svgParam.length > 0){
			lineObj["cap_style"] = [];
			lineObj["cap_size"] = [];
			lineObj["cap_color"] = [];
			lineObj["cap_fill"] = [];
			lineObj["cap_position"] = [];
		}
		for(var l=0, lLen=svgParam.length; l < lLen; l++) {
			if(svgParam[l].getAttribute("name") == "cap_direction") {
				lineObj["cap_direction"] = svgParam[l].text;
			}
			if(svgParam[l].getAttribute("name") == "cap_angle") {
				lineObj["cap_angle"] = svgParam[l].text;
			}
			if(svgParam[l].getAttribute("name") == "start_cap") {
				lineObj["start_cap"] = svgParam[l].text;
			}
			if(svgParam[l].getAttribute("name") == "end_cap") {
				lineObj["end_cap"] = svgParam[l].text;
			}
			
			if(svgParam[l].getAttribute("name") == "cap_style") {
				lineObj["cap_style"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_size") {
				lineObj["cap_size"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_color") {
				lineObj["cap_color"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_fill") {
				lineObj["cap_fill"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_position") {
				lineObj["cap_position"].push(svgParam[l].text);
			}
			
		}
		return lineObj;
		
	},
	
	/**********************************************************************************
	* 함수명 : readPolySym
	* 설 명 : XML형태의 SLD_BODY에서 Rule내부의 PolygonSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : polygons (SLD_BODY의 PolygonSymbolizer 엘리먼트 == <se:PolygonSymbolizer>)
	* 사용법 : readPolySym(polygons)
	* 작성일 : 2012.05.24
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.24		이경찬		최초 생성
	* 
	**********************************************************************************/
	readPolySym : function(polygons){
		var polyObj = {};

		// PolygonSymbolizer 타입
		polyObj["type"] = "polygon";
		
		// PolygonSymbolizer 버전
		polyObj["version"] = polygons[0].getAttribute("version");
		
		// PolygonSymbolizer 이름
		var symbolName = polygons[0].getElementsByTagName("se:Name");
		if(symbolName.length > 0) polyObj["name"] = symbolName[0].text;
		
		// PolygonSymbolizer 속성
		svgParam = polygons[0].getElementsByTagName("se:SvgParameter");
		for(var l=0, lLen=svgParam.length; l < lLen; l++) {
			// Polygon fill 면색 ( 예> #ffffff )
			if(svgParam[l].getAttribute("name") == "fill") {
				polyObj["fillColor"] = svgParam[l].text;
			}
			// Polygon opacity 면 투명도
			if(svgParam[l].getAttribute("name") == "fill-opacity") {
				polyObj["fillOpacity"] = svgParam[l].text;
			}
		}
		
		return polyObj;
		
	},
		
	/**********************************************************************************
	* 함수명 : readTextSym
	* 설 명 : XML형태의 SLD_BODY에서 Rule내부의 TextSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* 인 자 : texts (SLD_BODY의 TextSymbolizer 엘리먼트 == <se:TextSymbolizer>)
	* 사용법 : readTextSym(texts)
	* 작성일 : 2012.05.24
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.24		이경찬		최초 생성
	* 
	**********************************************************************************/
	readTextSym : function(texts){
		var textObj = {};
		
		// TextSymbolizer 타입
		textObj["type"] = "text";
		
		// TextSymbolizer 버전
		textObj["version"] = texts[0].getAttribute("version");
		
		// TextSymbolizer 이름
		var symbolName = texts[0].getElementsByTagName("se:Name");
		if(symbolName.length > 0) textObj["name"] = symbolName[0].text;
		
		// 라벨 명 (DB의 컬럼명)
		element = texts[0].getElementsByTagName("se:Label");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("ogc:PropertyName");
			if(subElement.length > 0) textObj["label"] = subElement[0].text;
		}

		// Text Font 글자 모양
		var fonts = texts[0].getElementsByTagName("se:Font");
		if(fonts.length > 0) {
			svgParam = fonts[0].getElementsByTagName("se:SvgParameter");
			for(var l=0, lLen=svgParam.length; l < lLen; l++) {
				// Text family 서체 ( 예> 맑은고딕 )
				if(svgParam[l].getAttribute("name") == "font-family") {
					textObj["fontFamily"] = svgParam[l].text;
				}
				// Text Size 글자 크기
				else if(svgParam[l].getAttribute("name") == "font-size") {
					textObj["fontSize"] = svgParam[l].text;
				}
				// Text Style 글자 스타일
				else if(svgParam[l].getAttribute("name") == "font-style") {
					textObj["fontStyle"] = svgParam[l].text;
				}
				//  Text weight 글자 두께
				else if(svgParam[l].getAttribute("name") == "font-weight") {
					textObj["fontWeight"] = svgParam[l].text;
				}
			}
		}
		
		var LabelPlacement = texts[0].getElementsByTagName("se:LabelPlacement");
		if(LabelPlacement.length > 0){
			var PointPlacement = LabelPlacement[0].getElementsByTagName("se:PointPlacement");
			var LinePlacement = LabelPlacement[0].getElementsByTagName("se:LinePlacement");
			
			if(PointPlacement.length > 0){
				// Text Displacement
				var Displacement = PointPlacement[0].getElementsByTagName("se:Displacement");
				if(Displacement.length > 0) {
					var DisplacementX = Displacement[0].getElementsByTagName("se:DisplacementX");
					if(DisplacementX.length > 0) textObj["displacementX"] = DisplacementX[0].text;
					
					var DisplacementY = Displacement[0].getElementsByTagName("se:DisplacementY");
					if(DisplacementY.length > 0) textObj["displacementY"] = DisplacementY[0].text;
				}
			}
			
			if(LinePlacement.length > 0){
				var VendorOption = LinePlacement[0].getElementsByTagName("se:VendorOption");
				for(var m=0, mLen=VendorOption.length; m < mLen ; m++){
					// Text text_arrange_pos
					if(VendorOption[m].getAttribute("name") == "text_arrange_pos"){
						textObj["text_arrange_pos"] = VendorOption[m].text;
					}
					// Text text_arrange_line 
					else if(VendorOption[m].getAttribute("name") == "text_arrange_line"){
						textObj["text_arrange_line"] = VendorOption[m].text;
					}
					// Text text_arrange_gap
					else if(VendorOption[m].getAttribute("name") == "text_arrange_gap"){
						textObj["text_arrange_gap"] = VendorOption[m].text;
					}
				}
			}
		}
		
		var halo = texts[0].getElementsByTagName("se:Halo");
		if(halo.length > 0) {
			var radius = halo[0].getElementsByTagName("se:Radius");
			if(radius.length > 0) textObj["radius"] = radius[0].text;
			
			var haloFill = halo[0].getElementsByTagName("se:Fill");
			if(haloFill.length > 0) {
				svgParam = haloFill[0].getElementsByTagName("se:SvgParameter");
				if(svgParam.length > 0){
					for(m=0, mLen=svgParam.length; m < mLen; m++) {
						if(svgParam[m].getAttribute("name") == "fill") {
							//글자 색
							textObj["haloColor"] = svgParam[m].text;
						}
						else if(svgParam[m].getAttribute("name") == "fill-opacity") {
							//글자 투명도
							textObj["haloOpacity"] = svgParam[m].text;
						}
					}
				}
			}
		}
		
		var fill = texts[0].getElementsByTagName("se:Fill");
		for(l=0; l < fill.length; l++) {
			svgParam = fill[l].getElementsByTagName("se:SvgParameter");
			if(svgParam.length > 0){
				for(m=0, mLen=svgParam.length; m < mLen; m++) {
					if(svgParam[m].getAttribute("name") == "fill") {
						//글자 색
						textObj["fillColor"] = svgParam[m].text;
					}
					else if(svgParam[m].getAttribute("name") == "fill-opacity") {
						//글자 투명도
						textObj["fillOpacity"] = svgParam[m].text;
					}
				}
			}
		}
		
		return textObj;
		
	},
	
	/**********************************************************************************
	* 함수명 : getSLDXML
	* 설 명 : Object(Json)형태의 SLD_BODY를 XML String형태로 변환
	* 인 자 : data (SLD_BODY의 MapTopic 객체)
	* 사용법 : getSLDXML(data)
	* 작성일 : 2012.05.24
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.24		이경찬		최초 생성
	* 
	**********************************************************************************/
	getSLDXML : function(data) {
		var xml = '<?xml version="1.0" encoding="UTF-8" ?>';
		if(data){
			if(data){
				xml += this.writeMapTopic(this.data,data);
			}
			else{
				xml += this.writeMapTopic(data);
			}
		}
			
		else 
			xml += this.writeMapTopic(this.data);

		return xml;
	},
	
	/**********************************************************************************
	* 함수명 : writeMapTopic
	* 설 명 : Object(Json)형태의 SLD_BODY에서 MapTopic부분의 정보를 XML형태로 return
	* 인 자 : data (SLD_BODY의 MapTopic 객체)
	* 사용법 : writeMapTopic(data)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writeMapTopic : function(data, opt){
		var namedObj = data.namedLayers;
		var str;
		str = '<sld:StyledLayerDescriptor xsi:schemaLocation="" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:se="http://www.opengis.net/se" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld">';
		str += '<se:Name>' + data.name + '</se:Name>';
		str += '<se:Description><se:Title>' + data.title + '</se:Title></se:Description>';
		if(opt == "default"){
			for(var i=0, len=layerTool.layers.length ; i < len ; i++){
				for(var l=0, lLen=namedObj.length ; l<lLen ; l++){
					if(namedObj[l].name == "행정읍면동"){
						str += this.writeNamedLayer(namedObj[l]);
					}
				}
			}
		}
		else{
			for(var j=0, jLen=layerTool.layers.length ; j<jLen ; j++){
				for(var k=0, kLen=namedObj.length ; k<kLen ; k++){
					if(layerTool.layers[j].alias == namedObj[k].name){
						if(layerTool.layers[j].show == "1"){
							namedObj[k].show = "1";
						}
						else{
							namedObj[k].show = "0";
						}
					}
				}
			}
			
			if(opt == "print"){
				// 거꾸로 생성 = 맵토픽에서 sldbody xml 처음레이어를 가장 하단으로 위치시키기 때문
				for(var i=layerTool.layers.length-1 ; i >= 0 ; i--){
					for(var l=0, lLen=namedObj.length ; l<lLen ; l++){
						if(layerTool.layers[i].alias == namedObj[l].name){
							if(namedObj[l].show == "1"){
								str += this.writeNamedLayer(namedObj[l]);
							}
						}
					}
				}
			}
			else{
				for(var i=0, len=layerTool.layers.length ; i < len ; i++){
					for(var l=0, lLen=namedObj.length ; l<lLen ; l++){
						if(layerTool.layers[i].alias == namedObj[l].name){
							if(namedObj[l].show == "1"){
								str += this.writeNamedLayer(namedObj[l]);
							}
						}
					}
				}
			}
		}
				
		str += '</sld:StyledLayerDescriptor>';
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writeNamedLayer
	* 설 명 : Object(Json)형태의 SLD_BODY에서 NamedLayer부분의 정보를 XML형태로 return
	* 인 자 : namedObj (SLD_BODY의 NamedLayer 객체)
	* 사용법 : writeNamedLayer(namedObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writeNamedLayer : function(namedObj){
		var userdObj = namedObj.userStyle;
		var str;
		
		str = '<sld:NamedLayer>';
		str += '<se:Name>' + namedObj.name + '</se:Name>';
		str += '<se:Description><se:Title>' + namedObj.title + '</se:Title></se:Description>';
		str += '<sld:LayerFeatureConstraints><sld:FeatureTypeConstraint><se:FeatureTypeName>';
		str += namedObj.featureTypeName;
		str += '</se:FeatureTypeName></sld:FeatureTypeConstraint></sld:LayerFeatureConstraints>';
		
		for(var j=0, jLen=userdObj.length ; j < jLen ; j++){
			str += this.writeUserStyle(userdObj[j]);
		}
		
		str += '</sld:NamedLayer>';
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writeUserStyle
	* 설 명 : Object(Json)형태의 SLD_BODY에서 UserStyle부분의 정보를 XML형태로 return
	* 		 (현재 상수도 프로젝트에서는 UserStyle를 활용하지 않음.)
	* 인 자 : userdObj (SLD_BODY의 UserStyle 객체)
	* 사용법 : writeUserStyle(userdObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writeUserStyle : function(userdObj){
		var ruleObj = userdObj.rules;
		var str;
		var control = this;
		str = '<sld:UserStyle>';
		str += '<se:Name>' + userdObj.name + '</se:Name>';
		str += '<se:Description><se:Title>' + userdObj.title + '</se:Title></se:Description>';
		str += '<se:FeatureTypeStyle>';
		str += '<se:FeatureTypeName>' + userdObj.featureTypeName + '</se:FeatureTypeName>';
		
		for(var k=0, kLen=ruleObj.length ; k < kLen ; k++){
			if(!(ruleObj[k].hidden != null && ruleObj[k].hidden)){
					str += this.writeRule(ruleObj[k]);
			}
		}
		str += '</se:FeatureTypeStyle>';
		str += '</sld:UserStyle>';
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writeRule
	* 설 명 : Object(Json)형태의 SLD_BODY에서 Rule 정보를 XML형태로 return
	* 		 (ogc:Filter 부분 파싱은 제외되어 있음.)
	* 인 자 : ruleObj (SLD_BODY의 Rule 객체)
	* 사용법 : writeRule(ruleObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	**********************************************************************************/
	writeRule : function(ruleObj,ruleOnOff){
		var points;
		var lines;
		var polygons;
		var texts;
		
		var str;
		
		str = '<se:Rule>';
		str += '<se:Name>' + ruleObj.name + '</se:Name>';
		if(ruleObj.name == "그외관로_주석" || ruleObj.name == "그외관로"){
			str += '<ogc:Filter>';
			str += '<And xmlns="http://www.opengis.net/ogc">';

			str += '<And>';
			str += '<And>';
			str += '<And>';
			str += '<PropertyIsGreaterThanOrEqualTo>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA006';
			str += '</Literal>';
			str += '</PropertyIsGreaterThanOrEqualTo>';
			
			str += '<PropertyIsLessThan>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA009';
			str += '</Literal>';
			str += '</PropertyIsLessThan>';
			str += '</And>';
			
			str += '<PropertyIsGreaterThanOrEqualTo>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA011';
			str += '</Literal>';
			str += '</PropertyIsGreaterThanOrEqualTo>';
			str += '</And>';
			
			str += '<PropertyIsLessThan>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA030';
			str += '</Literal>';
			str += '</PropertyIsLessThan>';
			str += '</And>';
			
			str += '<PropertyIsGreaterThanOrEqualTo>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_ET';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += '20.0';
			str += '</Literal>';
			str += '</PropertyIsGreaterThanOrEqualTo>';
			
			str += '</And>';
			str += '</ogc:Filter>';
		}
		else 
		if(ruleObj.filterName_equal || ruleObj.filterLiteral_equal || ruleObj.more || ruleObj.less){
			str += '<ogc:Filter>';
			
			if((ruleObj.filterName_equal && ruleObj.filterName_greater)
					|| (ruleObj.filterName_equal && ruleObj.more)){
				str += '<ogc:And>';
			}
			if(ruleObj.filterName_equal && ruleObj.filterLiteral_equal) {
				str += '<PropertyIsEqualTo xmlns="http://www.opengis.net/ogc"><ogc:PropertyName>';
				str += ruleObj.filterName_equal + '</ogc:PropertyName>';
				str += '<Literal>' + ruleObj.filterLiteral_equal + '</Literal>';
				str += '</PropertyIsEqualTo>';
			}
			
			if(ruleObj.filterName_greater && ruleObj.filterLiteral_greater){
				str += '<PropertyIsGreaterThan>';
				str += '<ogc:PropertyName>';
				str += ruleObj.filterName_greater;
				str += '</ogc:PropertyName>';
				str += '<Literal>' + ruleObj.filterLiteral_greater + '</Literal>';
				str += '</PropertyIsGreaterThan>';
			}

			if(ruleObj.more && ruleObj.less){
				var cnt=0;
				str += '<And xmlns="http://www.opengis.net/ogc">';
				for(var j in ruleObj.more){
					cnt++;
				}
				for(var i=0 ; i<cnt ; i++){
					if(cnt >= 2){
						str += '<And>';
					}
					str += '<PropertyIsGreaterThanOrEqualTo>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_more[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.more[i];
					str += '</Literal>';
					str += '</PropertyIsGreaterThanOrEqualTo>';
					
					str += '<PropertyIsLessThan>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_less[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.less[i];
					str += '</Literal>';
					str += '</PropertyIsLessThan>';
					if(cnt >= 2){
						str += '</And>';
					}
				}
				str += '</And>';
			}
			else if(ruleObj.more){
				for(var i in ruleObj.more){
					str += '<PropertyIsGreaterThanOrEqualTo>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_more[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.more[i];
					str += '</Literal>';
					str += '</PropertyIsGreaterThanOrEqualTo>';
				}
			}
			else if(ruleObj.less){
				for(var i in ruleObj.less){
					str += '<PropertyIsLessThan>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_less[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.less[i];
					str += '</Literal>';
					str += '</PropertyIsLessThan>';
				}
			}
			
			if((ruleObj.filterName_equal && ruleObj.filterName_greater)
					|| (ruleObj.filterName_equal && ruleObj.more)){
				str += '</ogc:And>';
			}
			
			str += '</ogc:Filter>';
		}
		str += '<se:MinScaleDenominator>' + ruleObj.minScale + '</se:MinScaleDenominator>';
		str += '<se:MaxScaleDenominator>' + ruleObj.maxScale + '</se:MaxScaleDenominator>';
		
		if(ruleObj.symbolizer["polygon"]){
			polygons = ruleObj.symbolizer["polygon"];
			str += this.writePolySym(polygons);
		}
		if(ruleObj.symbolizer["line"]){
			lines = ruleObj.symbolizer["line"];
			str += this.writeLineSym(lines);
			for(var i=0, len=5 ; i<len ; i++){
				if(ruleObj.symbolizer["line" + i]){
					lines = ruleObj.symbolizer["line" + i];
					str += this.writeLineSym(lines);
				}
			}
		}
		if(ruleObj.symbolizer["point"]){
			points = ruleObj.symbolizer["point"];
			str += this.writePointSym(points);
		}
		if(ruleObj.symbolizer["text"]){
			texts = ruleObj.symbolizer["text"];
			str += this.writeTextSym(texts);
		}

		str += '</se:Rule>';
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writePointSym
	* 설 명 : Object(Json)형태의 SLD_BODY에서 Rule내부의 PointSymbolizer 정보를 XML형태로 return
	* 인 자 : points (SLD_BODY의 PointSymbolizer 객체)
	* 사용법 : writePointSym(points)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writePointSym : function(points){
		var str;
		
		str = '<se:PointSymbolizer version="' + points.version + '">';
		str += '<se:Name>' + points.name + '</se:Name>';
		
		if(points.name == "CharMarker" || points.name == "CharMarkerAngle"){
			str += '<se:Graphic>';
			str += '<se:Mark>';
			str += '<sld:VendorOption name="font-family">' + points.markFont + '</sld:VendorOption>';
			str += '<sld:VendorOption name="char-code">' + points.markCharCode + '</sld:VendorOption>';
			str += '<sld:VendorOption name="fill">' + points.markFill + '</sld:VendorOption>';
			str += '</se:Mark>';
			str += '<se:Opacity>' + points.opacity + '</se:Opacity>';
			str += '<se:Size>' + points.size + '</se:Size>';
			
			if(points.name == "CharMarkerAngle"){
				str += '<se:Rotation>';
				str += '<ogc:PropertyName>';
				str += points.rotation;
				str += '</ogc:PropertyName>';
				str += '</se:Rotation>';
			}
			
			str += '<se:Displacement>';
			str += '<se:DisplacementX>' + points.displacementX + '</se:DisplacementX>';
			str += '<se:DisplacementY>' + points.displacementY + '</se:DisplacementY>';
			str += '</se:Displacement>';
		}
		else{
			str += '<se:Graphic><se:ExternalGraphic><se:InlineContent encoding="' + points.encoding + '">' + points.externalGraphic + '</se:InlineContent>';
			str += '<se:Format>' + points.format + '</se:Format>';
			str += '</se:ExternalGraphic>';
			str += '<se:Opacity>' + points.opacity + '</se:Opacity>';
			str += '<se:Size>' + points.size + '</se:Size>';
			str += '<se:Rotation>' + points.rotation + '</se:Rotation>';
			str += '<se:Displacement><se:DisplacementX>' + points.displacementX + '</se:DisplacementX>';
			str += '<se:DisplacementY>' + points.displacementY + '</se:DisplacementY></se:Displacement>';
		}
		
		str += '</se:Graphic></se:PointSymbolizer>';
		
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writeLineSym
	* 설 명 : Object(Json)형태의 SLD_BODY에서 Rule내부의 LineSymbolizer 정보를 XML형태로 return
	* 인 자 : lines (SLD_BODY의 LineSymbolizer 객체>)
	* 사용법 : writeLineSym(lines)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writeLineSym : function(lines){
		var str;
		
		str = '<se:LineSymbolizer version="' + lines.version + '">';
		str += '<se:Name>' + lines.name + '</se:Name>';
		str += '<se:Stroke>';
		
		if(lines.stroke){
			str += '<se:SvgParameter name="stroke">' + lines.stroke + '</se:SvgParameter>';
		}
		if(lines.strokeOpacity){
			str += '<se:SvgParameter name="stroke-opacity">' + lines.strokeOpacity + '</se:SvgParameter>';
		}
		if(lines.strokeWidth){
			str += '<se:SvgParameter name="stroke-width">' + lines.strokeWidth + '</se:SvgParameter>';
		}
		if(lines.strokeLinejoin){
			str += '<se:SvgParameter name="stroke-linejoin">' + lines.strokeLinejoin + '</se:SvgParameter>';
		}
		if(lines.strokeLinecap){
			str += '<se:SvgParameter name="stroke-linecap">' + lines.strokeLinecap + '</se:SvgParameter>';
		}
		if(lines.strokeDasharray && lines.strokeDasharray != "solid"){
			str += '<se:SvgParameter name="stroke-dasharray">' + lines.strokeDasharray + '</se:SvgParameter>';
		}
		
		str += '</se:Stroke>';
		
		if(lines.cap_direction && lines.cap_angle){
			str += '<se:VendorOption name="cap_direction">' + lines.cap_direction + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_angle">' + lines.cap_angle + '</se:VendorOption>';
			
			str += '<se:VendorOption name="start_cap">' + lines.start_cap + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_style">' + lines.cap_style[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_size">' + lines.cap_size[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_color">' + lines.cap_color[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_fill">' + lines.cap_fill[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_position">' + lines.cap_position[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="end_cap">' + lines.end_cap + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_style">' + lines.cap_style[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_size">' + lines.cap_size[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_color">' + lines.cap_color[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_fill">' + lines.cap_fill[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_position">' + lines.cap_position[1] + '</se:VendorOption>';
		}
		str += '</se:LineSymbolizer>';
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writePolySym
	* 설 명 : Object(Json)형태의 SLD_BODY에서 Rule내부의 PolygonSymbolizer 정보를 XML형태로 return
	* 인 자 : polygons (SLD_BODY의 PolygonSymbolizer 객체)
	* 사용법 : writePolySym(polygons)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writePolySym : function(polygons){
		var str;
		
		str = '<se:PolygonSymbolizer version="' + polygons.version + '">';
		str += '<se:Name>' + polygons.name + '</se:Name>';
		str += '<se:Fill>';
		
		if(polygons.fillColor){
			str += '<se:SvgParameter name="fill">' + polygons.fillColor + '</se:SvgParameter>';
		}
		if(polygons.fillOpacity){
			str += '<se:SvgParameter name="fill-opacity">' + polygons.fillOpacity + '</se:SvgParameter>';
		}
		
		str += '</se:Fill>';
		str += '</se:PolygonSymbolizer>';
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : writeTextSym
	* 설 명 : Object(Json)형태의 SLD_BODY에서 Rule내부의 TextSymbolizer 정보를 XML형태로 return
	* 인 자 : texts (SLD_BODY의 TextSymbolizer 엘리먼트 == <se:TextSymbolizer>)
	* 사용법 : writeTextSym(texts)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	writeTextSym : function(texts){
		var str;
		
		str = '<se:TextSymbolizer version="' + texts.version + '">';
		str += '<se:Name>' + texts.name + '</se:Name>';
		if(texts.label){
			str += '<se:Label><ogc:PropertyName>' + texts.label + '</ogc:PropertyName></se:Label>';
		}
		else{
			str += '<se:Label/>';
		}
		
		str += '<se:Font>';
		
		if(texts.fontSize){
			str += '<se:SvgParameter name="font-size">' + texts.fontSize + '</se:SvgParameter>';
		}
		if(texts.fontWeight){
			str += '<se:SvgParameter name="font-weight">' + texts.fontWeight + '</se:SvgParameter>';
		}
		if(texts.fontFamily){
			str += '<se:SvgParameter name="font-family">' + texts.fontFamily + '</se:SvgParameter>';
		}
		if(texts.fontStyle){
			str += '<se:SvgParameter name="font-style">' + texts.fontStyle + '</se:SvgParameter>';
		}
		
		str += '</se:Font>';
		str += '<se:LabelPlacement>';
		if(texts.displacementX || texts.displacementY){
			str += '<se:PointPlacement><se:Displacement>';
			
			if(texts.displacementX){
				str += '<se:DisplacementX>' + texts.displacementX + '</se:DisplacementX>';
			}
			if(texts.displacementY){
				str += '<se:DisplacementY>' + texts.displacementY + '</se:DisplacementY>';
			}
			
			str += '</se:Displacement></se:PointPlacement>';
		}
		if(texts.text_arrange_pos || texts.text_arrange_line || texts.text_arrange_gap){
			str += '<se:LinePlacement>';
			
			if(texts.text_arrange_pos){
				str += '<se:VendorOption name="text_arrange_pos">' + texts.text_arrange_pos + '</se:VendorOption>';
			}
			if(texts.text_arrange_line){
				str += '<se:VendorOption name="text_arrange_line">' + texts.text_arrange_line + '</se:VendorOption>';
			}
			if(texts.text_arrange_gap){
				str += '<se:VendorOption name="text_arrange_gap">' + texts.text_arrange_gap + '</se:VendorOption>';
			}
			
			str += '</se:LinePlacement>';
		}
		
		str += '</se:LabelPlacement>';
		
		if(texts.radius){
			str += '<se:Halo>';
			str += '<se:Radius>' + texts.radius + '</se:Radius>';
			str += '<se:Fill>';
			
			if(texts.haloColor){
				str += '<se:SvgParameter name="fill">' + texts.haloColor + '</se:SvgParameter>';
			}
			if(texts.haloOpacity){
				str += '<se:SvgParameter name="fill-opacity">' + texts.haloOpacity + '</se:SvgParameter>';
			}
			str += '</se:Fill>';
			str += '</se:Halo>';
		}
		
		
		if(texts.fillColor){
			str += '<se:Fill>';
			if(texts.fillColor){
				str += '<se:SvgParameter name="fill">' + texts.fillColor + '</se:SvgParameter>';
			}
			if(texts.fillOpacity){
				str += '<se:SvgParameter name="fill-opacity">' + texts.fillOpacity + '</se:SvgParameter>';
			}
			str += '</se:Fill>';
		}
		
		str += '</se:TextSymbolizer>';
		
		return str;
	},
	
	/**********************************************************************************
	* 함수명 : searchNamedLayer
	* 설 명 : SLD_BODY 객체에서 NameLayer 명칭으로 해당 객체를 검색하는 함수 
	* 인 자 : layerName (namedLayer명)
	* 사용법 : searchNamedLayer(layerName)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	searchNamedLayer : function(layerName){
		var data = this.data;
		var namedLayers = data.namedLayers;
		var result;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			if(namedLayers[i].name == layerName){
				return namedLayers[i];
			}
		}
	},
	
	/**********************************************************************************
	* 함수명 : searchRule
	* 설 명 : Rule 명칭으로 해당 Rule객체를 검색하는 함수
	* 인 자 : ruleName (rule명), chk(해당 rule의 namedLayer명으로 중복체크)
	* 사용법 : searchRule
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	searchRule : function(ruleName, chk){
		var data = this.data;
		var namedLayers = data.namedLayers;
		var result;
		
		if(chk){
			var res=[];
			var cnt=0;
			for(var i=0, len=namedLayers.length ; i < len ; i++){
				var userStyle = namedLayers[i].userStyle;
				for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
					var rules = userStyle[j].rules;
					for(var k=0, kLen=rules.length ; k < kLen ; k++){
						if(rules[k].name == ruleName){
							res.push(rules[k]);
							res.push(i);
							cnt++;
						}
					}
				}
			}
			if(cnt > 1){
				for(var i=0,len=res.length ; i<len ; i=i+2){
					if(namedLayers[res[i+1]].name == chk){
						return res[i];
					}
				}
			}
			else if(cnt == 1){
				return res[0];
			}
		}
		else{
			for(var i=0, len=namedLayers.length ; i < len ; i++){
				var userStyle = namedLayers[i].userStyle;
				for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
					var rules = userStyle[j].rules;
					for(var k=0, kLen=rules.length ; k < kLen ; k++){
						if(rules[k].name == ruleName){
							return rules[k];
						}
					}
				}
			}
		}
	},
	
	/**********************************************************************************
	* 함수명 : regNamedLayers
	* 설 명 : MapTopic 객체에 NamedLayers 객체를 등록하는 함수
	* 인 자 : data(MapTopic 객체 // 등록 타겟), namedObj (NamedLayers 객체 // 등록 객체)
	* 사용법 : regNamedLayers(namedObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	regNamedLayers : function(data, namedObj){
		data.namedLayers.push(namedObj);
		
		return data;
	},
	
	/**********************************************************************************
	* 함수명 : regUserStyle
	* 설 명 : NamedLayers 객체에 UserStyle 객체를 등록하는 함수
	* 인 자 : namedObj(NamedLayers 객체 // 등록 타겟), userdObj (UserStyle 객체 // 등록 객체)
	* 사용법 : regUserStyle(namedObj, userdObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	regUserStyle : function(namedObj, userdObj){
		namedObj.userStyle.push(userdObj);
		
		return namedObj;
	},
	
	/**********************************************************************************
	* 함수명 : regRules
	* 설 명 : UserStyle 객체에 Rules 객체를 등록하는 함수
	* 인 자 : userdObj(UserStyle 객체 // 등록 타겟), ruleObj (Rules 객체 // 등록 객체)
	* 사용법 : regRules(userdObj, ruleObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	regRules : function(userdObj, ruleObj){
		userdObj.rules.push(ruleObj);
		
		return userdObj;
	},
	
	/**********************************************************************************
	* 함수명 : regSymbolizer
	* 설 명 : Rules 객체에 Symbolizer 객체를 등록하는 함수
	* 인 자 : ruleObj(Rules 객체 // 등록 타겟), symbolObj (Symbolizer 객체 // 등록 객체)
	* 사용법 : regSymbolizer(ruleObj, symbolObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	regSymbolizer : function(ruleObj, symbolObj){
		
		if(symbolObj.type == "point"){
			ruleObj.symbolizer["point"] = symbolObj;
		}
		else if(symbolObj.type == "line"){
			ruleObj.symbolizer["line"] = symbolObj;
		}
		else if(symbolObj.type == "polygon"){
			ruleObj.symbolizer["polygon"] = symbolObj;
		}
		else if(symbolObj.type == "text"){
			ruleObj.symbolizer["text"] = symbolObj;
		}
		
		return ruleObj;
	},
	
	/**********************************************************************************
	* 함수명 : createMapTopic
	* 설 명 : MapTopic 객체를 생성하기 위한 파라미터값을 인자로 받아 MapTopic 객체 생성
	* 인 자 : params (파라미터 객체)
	* 사용법 : createMapTopic(params)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	createMapTopic : function(params){
		var data = {
				xml : params.xml,
				name : params.name,
				namedLayers : []
		}; 
		
		return data;
	},
	
	/**********************************************************************************
	* 함수명 : createNamedLayer
	* 설 명 : NamedLayer 객체를 생성하기 위한 파라미터값을 인자로 받아 NamedLayer 객체 생성
	* 인 자 : params (파라미터 객체)
	* 사용법 : createNamedLayer(params)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	createNamedLayer : function(params){
		var namedObj = {
				name : params.name,
				title : params.title,
				featureTypeName : params.featureTypeName,
				userStyle : []
		};
		
		return namedObj;
	},
		
	/**********************************************************************************
	* 함수명 : createUserStyle
	* 설 명 : UserStyle 객체를 생성하기 위한 파라미터값을 인자로 받아 UserStyle 객체 생성
	* 인 자 : params (파라미터 객체)
	* 사용법 : createUserStyle(params)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	createUserStyle : function(params){
		var userdObj = {
				name : params.name,
				title : params.title,
				rules : []
		};
		
		return userdObj;
	},
	
	/**********************************************************************************
	* 함수명 : createRule
	* 설 명 : Rule 객체를 생성하기 위한 파라미터값을 인자로 받아 Rule 객체 생성
	* 인 자 : params (파라미터 객체), symbol(심볼 객체)
	* 사용법 : createRule(params)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	createRule : function(params, symbol){
		var ruleObj = {
				name : params.name,
				filterName : params.filterName,
				filterLiteral : params.Literal,
				minScale : params.minScale,
				maxScale : params.maxScale,
				symbolizer : symbol
		};
		return ruleObj;
	},
	
	/**********************************************************************************
	* 함수명 : createSymbolizer
	* 설 명 : Symbolizer 객체를 생성하기 위한 파라미터값을 인자로 받아 Symbolizer 객체 생성
	*		 파라미터에 따라 Point, Line, Polygon, Text로 구분되어서 객체 생성	
	* 인 자 : params (파라미터 객체), type ("point","line","polygon","text")
	* 사용법 : createSymbolizer(params)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.25		이경찬		최초 생성
	* 
	**********************************************************************************/
	createSymbolizer : function(params, type){
		var pointObj;
		var lineObj;
		var polygonObj;
		var textObj;
		var symbolObj;
		
		if(type == "point"){
			if(params.name == "CharMarker" || params.name == "CharMarkerAngle"){
				pointObj = {	
						markFill : params.markFill,
						markFont : params.markFont,
						markCharCode : params.markCharCode,
						
						type : "point",
						version : params.version,
						name : params.name,
						size : params.size,
						opacity : params.opacity,
						rotation : params.rotation,
						displacementX : params.displacementX,
						displacementY : params.displacementY
				};
			}
			else{
				pointObj = {	
						type : "point",
						version : params.version,
						name : params.name,
						size : params.size,
						opacity : params.opacity,
						rotation : params.rotation,
						displacementX : params.displacementX,
						displacementY : params.displacementY,
						externalGraphic : params.externalGraphic,
						encoding : params.encoding,
						format : params.format
				};
			}
			
			symbolObj = pointObj;
		}
		else if(type == "line"){
			lineObj = {
					type : "line",
					version : params.version,
					name : params.name,
					stroke : params.stroke,
					strokeWidth : params.strokeWidth,
					strokeOpacity : params.strokeOpacity,
					strokeLinecap : params.strokeLinecap,
					strokeDasharray : params.strokeDasharray,
					strokeLinejoin : params.strokeLinejoin
			};
			symbolObj = lineObj;
		}
		else if(type == "polygon"){
			polygonObj = {
					type : "polygon",
					version : params.version,
					name : params.name,
 					fillColor : params.fillColor,
					fillOpacity : params.fillOpacity
			};
			symbolObj = polygonObj;
		}
		else if(type == "text"){
			textObj = {
					type : "text",
					version : params.version,
					name : params.name,
					label : params.label,
					fontFamily : params.fontFamily,
					fontSize : params.fontSize,
					fontStyle : params.fontStyle,
					fontWeight : params.fontWeight,
					displacementX : params.displacementX,
					displacementY : params.displacementY,
					text_arrange_pos : params.text_arrange_pos,
					text_arrange_line : params.text_arrange_line,
					text_arrange_gap : params.text_arrange_gap,
					radius : params.radius,
					haloColor : params.haloColor,
					haloOpacity : params.haloOpacity,
					fillColor : params.fillColor,
					fillOpacity : params.fillOpacity
			};
			symbolObj = textObj;
		}
		
		return symbolObj;
	},
	
	/**********************************************************************************
	* 함수명 : updateNamedLayer
	* 설 명 : 인자인 NamedLayer 객체가 MapTopic Object내에 존재하면 수정, 존재하지 않으면 추가 
	* 인 자 : nameObj (NamedLayer 객체)
	* 사용법 : updateNamedLayer(nameObj)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	updateNamedLayer : function(nameObj){
		var hasNamedLayer = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			if(namedLayers[i].name == nameObj.name){
				namedLayers[i] = nameObj;
				hasNamedLayer = true;
			}
		}
		
		if(!hasNamedLayer){
			namedLayers.push(nameObj);
		}
	},
	
	/**********************************************************************************
	* 함수명 : delNamedLayer
	* 설 명 : 해당 NamedLayer가 MapTopic Object내에 존재하면 삭제 
	* 인 자 : layerName (NamedLayer 이름)
	* 사용법 : delNamedLayer(layerName)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	delNamedLayer : function(layerName){
		var hasNamedLayer = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			if(namedLayers[i].name == layerName){
				hasNamedLayer = true;
				namedLayers.splice(i,1);
				alert("해당 NamedLayer를 삭제하였습니다.");
			}
		}
		
		if(!hasNamedLayer){
			alert("해당 NamedLayer가 없습니다.");
		}
	},
	
	/**********************************************************************************
	* 함수명 : delRule
	* 설 명 : 해당 Rule이 MapTopic Object내에 존재하면 삭제 
	* 인 자 : ruleName (Rule 이름)
	* 사용법 : delRule(ruleName)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	delRule : function(ruleName){
		var hasRule = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			var userStyle = namedLayers[i].userStyle;

			for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
				var rules = userStyle[j].rules;
				
				for(var k=0, kLen=rules.length ; k < kLen ; k++){
					if(rules[k].name == ruleName){
						hasRule = true;
						rules.splice(k,1);
						alert("해당 Rule을 삭제하였습니다.");
					}
				}
			}
		}
		
		if(!hasRule){
			alert("해당  Rule이 없습니다.");
		}
	},
	
	/**********************************************************************************
	* 함수명 : delSymbolizer
	* 설 명 : 해당 Symbolizer가 MapTopic Object내에 존재하면 삭제
	* 인 자 : SymbolName (Symbolizer 이름)
	* 사용법 : delSymbolizer(SymbolName)
	* 작성일 : 2012.05.25
	* 작성자 : 기술교육팀 이경찬
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	* 2012.05.23		이경찬		최초 생성
	* 
	**********************************************************************************/
	delSymbolizer : function(SymbolName){
		var hasSymbol = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			var userStyle = namedLayers[i].userStyle;

			for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
				var rules = userStyle[j].rules;
				
				for(var k=0, kLen=rules.length ; k < kLen ; k++){
					var symbol = rules[k].symbolizer;
					if(symbol["point"] && symbol["point"].name == SymbolName){
						delete symbol["point"];
						hasSymbol = true;
					}
					else if(symbol["line"] && symbol["line"].name == SymbolName){
						delete symbol["line"];
						hasSymbol = true;
					}
					else if(symbol["polygon"] && symbol["polygon"].name == SymbolName){
						delete symbol["polygon"];
						hasSymbol = true;
					}
					else if(symbol["text"] && symbol["text"].name == SymbolName){
						delete symbol["text"];
						hasSymbol = true;
					}
				}
			}
		}
		
		if(!hasSymbol){
			alert("해당 Symbolizer가 없습니다.");
		}
		else{
			alert("해당 Symbolizer를 삭제하였습니다.");
		}
	},
	
	CLASS_NAME: "NUTs.Tool.SLDTool" 
});




/*=[ TMapLayerTool.js ]==========================================================================*/

/**********************************************************************************
 * 파일명 : TMapLayerTool.js
 * 설 명 : 주제도 & 레이어 관리 객체
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.05.26		최원석				0.1					최초 생성
 * 2011.06.27		최원석				0.2					클래스 정리 및 수정
 * 2012.02.08		최원석									groups, tMaps, layers, layerGroups 모두 각각 클래스로 구분하면 좋을 것 같음
 * 2012.05.31		최원석				0.3					상수에 맞춰서 수정 (유지 필요성 여부 고려)
 * 
**********************************************************************************/

NUTs.Tool.TMapLayerTool = OpenLayers.Class({

	/**
	 * 주제도(TMap) 그룹 객체들의 배열
	 * groups = [group1, group2, .... , group99];
	 * 
	 * 주제도 그룹 객체
	 * group = {
	 * 		id : id,		//주제도 그룹 아이디
	 * 		name : name,	//주제도 그룹 이름
	 * 		seq : seq		//주제도 그룹 순서
	 * }
	 * 
	 */
	groups : [],
	
	/**
	 * 
	 * 주제도(TMap) 객체들의 배열
	 * tMaps = [tMap1, tMap2, ..... , tMap99];
	 * 
	 * 주제도 객체
	 * tMap = {
	 * 		id : id,		//주제도 아이디
	 * 		name : name,	//주제도 이름
	 * 		seq : seq,		//주제도 순서
	 * 		group : group	//주제도 그룹 아이디
	 * }
	 */
	tMaps : [],
	
	/**
	 * 레이어 객체들의 배열
	 * layers = [layer1, layer2, .... , layer99];
	 * 
	 * 레이어 객체
	 * layer = {
	 * 		id : id,				//아이디
	 * 		table : table,			//테이블
	 * 		theme : theme,			//THEME 이름
	 * 		alias : alias,			//ALIAS 이름
	 * 		seq   : seq,			//레이어 순서
	 * 		show  : show,			//레이어 화면에 표시 여부 (1:표시, 0:미표시)
	 * 		tmapid  : tmapid,		//주제도 아이디
	 *      layerGroup : layerGroup,	//레이어 그룹 아이디
	 *		attr : attr,				//속성조회 여부
	 *		type : type,				//도형타입 (점,선,면)
	 * }
	 */
	layers : [],
	
	prefix : '',
	
	cloneLayers : [],
	
	/**
	 * 
	 * 레이어 그룹 객체들의 배열
	 * layerGroups = [layerGroup1, layerGroup2, ..... , layerGroup99];
	 * 
	 * 주제도 객체
	 * layerGroup = {
	 * 		id : id,		//그룹 아이디
	 * 		name : name		//그룹 이름
	 * }
	 */
	layerGroups : [],
	
	cloneLayerGroups : [],

	/**
	 * 현재 주제도 아이디
	 */
	tMapId : null,
	
	/**
	 * 기본 맵 정의
	 */
	defaultSld : null,
	
	/**
	 * 맵 정의
	 */
	sld : null,

	getStyle_version : "1.1.0",
    //change jykw 20160725 for geoserver
    format: new NUTs.Format.SLD.v1_1_0,
    //format: new NUTs.Format.SLD.v1_0_0_GeoServer,
	
	/**********************************************************************************
	 * 함수명 : initialize (생성자 함수)
	 * 설 명 : GLayerManagerTool 객체 생성
	 * 인 자 : layer(배열(레이어객체)), tMaps(배열(주제도객체)), groups(배열(주제도그룹객체))
	 			, tMapId 현재주제도 아이디
	 * 사용법 : new GLayerManagerTool(layers[, tMaps, groups, tMapId])
	 * 작성일 : 2011.05.26
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.26		최원석		최초 생성
	 
	 **********************************************************************************/
	initialize : function(layers, tMaps, groups, layerGroups, options) {
		this.layers = layers;
		
		this.cloneLayers = this.getCloneLayers(layers);
		
		if(tMaps) {
			this.tMaps = tMaps;
		}		
		if(groups) {
			this.groups = groups;			
		}
		if(layerGroups) {
			this.layerGroups = layerGroups;
			this.cloneLayerGroups = this.getCloneLayerGroups(layerGroups);
		}

		if(options.gisEngineType == "GeoServer"){ 
			this.format = new NUTs.Format.SLD.v1_0_0_GeoServer;
			this.getStyle_version = "1.1.1";
		}
		else {
			this.format = new NUTs.Format.SLD.v1_1_0;
		}
		
		if(options.prefix) 
			this.prefix = options.prefix;
		
		//받은 객체 초기화 (-1 값은 null 로 변환)
		this.changeNull(this.layers);
		this.changeNull(this.tMaps);
		this.changeNull(this.groups);
		
		if(options && options.tMapId) {
			this.tMapId = options.tMapId;
		}
		else {
			if(tMaps && tMaps[0] && tMaps[0].tmapid) this.tMapId = tMaps[0].tmapid;
		}
		control = this;
		var layerOptions = { 
	            retAttr: "table"  //CJH  GeoServer? 2017-11-01
		};
		if(options && options.serviceUrl && options.callback) {

			if(options.sync){
				NUTs.WMS.getStylesBySync(options.serviceUrl,this.getLayers(layerOptions), this.getStyle_version, function(res) {
					control.defaultSld = res.xml.cloneNode(true);
					var bool = false;
					if(options.userStyle) {
						control.setUserStyle(options.userStyle, res);
						bool = true;
					}
					else {
						control.sld = res;
					}
					options.callback(res, bool);
				});
			}
			else{

				NUTs.WMS.getStyles(options.serviceUrl,this.getLayers(layerOptions), this.getStyle_version, function(res) {
					control.defaultSld = res.xml.cloneNode(true);
					var bool = false;
					if(options.userStyle) {
						control.setUserStyle(options.userStyle, res);
						bool = true;
					}
					else {
						control.sld = res;
					}
					options.callback(res, bool);
				});
			}
		}
	},
	setUserStyle : function(userStyle, res) {
		var xml = new OpenLayers.Format.XML();
		var str = decodeURIComponent(userStyle);
		var sldObj = xml.read(str);
		
		
		var userDesc = sldObj.getElementsByTagName("sld:StyledLayerDescriptor");
		var userNamedLayers = userDesc[0].getElementsByTagName("sld:NamedLayer");
		
		var desc = res.xml.getElementsByTagName("sld:StyledLayerDescriptor");
		var namedLayers = desc[0].getElementsByTagName("sld:NamedLayer");
		
		for(var i=0, len=userNamedLayers.length; i < len; i++) {
			var userName;
			element = userNamedLayers[i].getElementsByTagName("se:Name");
			if(element.length > 0) userName = this.prefix + ":" + element[0].text;
			
			for(var j=0, jLen=namedLayers.length; j < jLen; j++) {
				var name;
				element = namedLayers[j].getElementsByTagName("se:Name");
				if(element.length > 0) name = element[0].text;

				if(userName == name) {
					desc[0].removeChild(namedLayers[j]);
					desc[0].appendChild(userNamedLayers[i]);
				}
			}
		}
		
		this.sld = NUTs.WMS.parseGetStyles(res.xml);
	},
	
	setLayers : function(layers, options) {
		this.layers = layers;
		
		control = this;
		if(options && options.serviceUrl && options.callback) {
			NUTs.WMS.getStyles(options.serviceUrl, this.getLayers({retAttr:"theme"}), this.getStyle_version, function(res) {
				/*
				control.defaultSld = res.xml.cloneNode(true);
				var bool = 0;
				if(options.userStyle) {
					control.setUserStyle(options.userStyle, res);
					bool = 1;
				}
				else {
					control.sld = res;
				}
				options.callback(res, bool);
				*/
				// SLD 객체
				control.sld = res;
				
				// SLD 클론 객체
				var sldStr = encodeURIComponent(JSON.stringify(res, replacer));
				var cloneSld = JSON.parse(decodeURIComponent(sldStr.replace('/+/g', "%20")), reviver);
				control.defaultSld = cloneSld;
								
				var bool = 0;
				if(options.userStyle) bool = 1;
				
				options.callback(res, bool);
			});
		}
	},
	
	setLayerGroups : function(){
		var control = this; 
		var layers = this.getThemeShowList('asc');
		var groupsIdx = [];
		
		for(var i in layers){
			for(var j in control.layers){
				if(layers[i] == control.layers[j].theme){
					if(groupsIdx.length == 0 || groupsIdx.length > 0 && groupsIdx[groupsIdx.length-1] != control.layers[j].layerGroup){
						groupsIdx.push(control.layers[j].layerGroup);
					}
				}
			}
		}
	},
	
	getLayerGroups : function() {
		return this.layerGroups;
	},
	
	/**********************************************************************************
	 * 함수명 : getTMapName
	 * 설 명 : 현재 주제도 이름 반환
	 * 반환값 : 성공(현재 주제도 이름), 실패(false)
	 * 사용법 : getTMapName()
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	getTMapName : function() {
		for(var i in this.tMaps) {
			if(this.tMaps[i].id == this.tMapId) {
				return this.tMaps[i].name;
			}
		}
		return false;
	},
	
	/**********************************************************************************
	 * 함수명 : setTMapByName
	 * 설 명 : 주제도 이름으로 현재 주제도 설정
	 * 인 자 : name(주제도 이름)
	 * 반환값 : 성공(true), 실패(false)
	 * 사용법 : setTMapByName(name)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	setTMapByName : function(name) {
		for(var i in this.tMaps) {
			if(this.tMaps[i].name == name) {
				tMapId = this.tMaps[i].id;
				return true;
			}
		}
		return false;
	},
	
	/**********************************************************************************
	 * 함수명 : setTMapById
	 * 설 명 : 주제도 아이디로 현재 주제도 설정
	 * 인 자 : id  (주제도 이름)
	 * 사용법 : setTMapbyId(id)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	setTMapbyId : function(id) {
		for(var i in this.tMaps) {
			if(this.tMaps[i].id == id) {
				this.tMapId = id;
				return true;
			}
		}
		return false;
	},
	
	
	/**********************************************************************************
	 * 함수명 : getTMapId
	 * 설 명 : 현재 주제도 아이디 반환
	 * 반환값 : 현재 주제도 아이디
	 * 사용법 : getTMapId()
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	getTMapId : function() {
		return this.tMapId;
	},
	
	getLayerGroups : function(options) {
		if(!options) {
			return this.layerGroups;
		}
		
		var results = [];
		
		var arr = [];
		if(options.con) {
			if(options.conVal) {
				
				for(var i in this.layerGroups) {
					if(options.reverse) {
						if(this.layerGroups[i][options.con] != options.conVal) {
							arr.push(this.layerGroups[i]);
						}
					}
					else {
						if(this.layerGroups[i][options.con] == options.conVal) {
							arr.push(this.layerGroups[i]);
						}
					}
				}
			}
			else {
				for(i in this.layerGroups) {
					if(options.reverse) {
						if(!this.layerGroups[i][options.con]) {
							arr.push(this.layerGroups[i]);
						}
					}
					else {
						if(this.layerGroups[i][options.con]) {
							arr.push(this.layerGroups[i]);
						}
					}
				}
			}
		}
		else {
			for(var i in this.layerGroups) {
				arr.push(this.layerGroups[i]);
			}
		}
		
		if(options.order) {
			this.orderBySeq(arr, 'seq', options.order);
		}
		
		if(options.retAttr) {
			var retAttr = [];
			if(!(options.retAttr instanceof Array)) {
				retAttr = [options.retAttr];
			}
			else {
				retAttr = options.retAttr;
			}
			for(var i in arr) {
				for(var j in retAttr) {
					results.push(arr[i][retAttr[j]]);
				}
			}
		}
		else {
			results = arr;
		}
		
		return results;
	},
	
	/**********************************************************************************
	 * 함수명 : getLayers
	 * 설 명 : 레이어 리스트를 반환
	 * 인 자 : options(객체)
	 * 	options = {
	 * 		con : 조건이 되는 필드명
	 * 		conVal : 찾는 조건 값
	 * 		order : 정렬 ('asc' : 오름차순, 'desc' : 내림차순)
	 * 		retAttr : 반환 필드 명
	 *  }
	 * 반환값 : 조건에 맞는 레이어 리스트
	 * 사용법 : getLayers(options)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	getLayers : function(options) {
		if(!options) {
			return this.layers;
		}
		
		var results = [];
		
		var arr = [];
		if(options.con) {
			if(options.conVal) {
				
				for(var i in this.layers) {
					if(options.reverse) {
						if(this.layers[i][options.con] != options.conVal) {
							arr.push(this.layers[i]);
						}
					}
					else {
						if(this.layers[i][options.con] == options.conVal) {
							arr.push(this.layers[i]);
						}
					}
				}
			}
			else {
				for(var i in this.layers) {
					if(options.reverse) {
						if(!this.layers[i][options.con]) {
							arr.push(this.layers[i]);
						}
					}
					else {
						//change jykw 20160726 for geoserver
	                    //if (this.layers[i][options.con]) arr.push(this.layers[i])                	
	                	// this.layers[i][options.con]의 값이 "0"일때  if (this.layers[i][options.con]) 은 true임.
	                	// this.layers[i][options.con]의 값이 "0"일때  if (this.layers[i][options.con] == true ) 는 false임.
	                	// 즉, if("0") : true, if("0" == true) : false
	                    if (this.layers[i][options.con] == true) arr.push(this.layers[i]);         
					}
				}
			}
		}
		else {
			for(var i in this.layers) {
				arr.push(this.layers[i]);
			}
		}
		
		if(options.order) {
			this.orderBySeq(arr, 'seq', options.order);
		}
		
		if(options.retAttr) {
			var retAttr = [];
			if(!(options.retAttr instanceof Array)) {
				retAttr = [options.retAttr];
			}
			else {
				retAttr = options.retAttr;
			}
			for(var i in arr) {
				for(var j in retAttr) {
					results.push(arr[i][retAttr[j]]);
				}
			}
		}
		else {
			results = arr;
		}
		
		return results;
	},
	
	/**********************************************************************************
	 * 함수명 : getThemeList
	 * 설 명 : 현재 주제도 Theme 리스트 반환
	 * 인 자 : order('asc' : 오름차순, 'desc' : 내림차순)
	 * 반환값 : 현재 주제도 Theme 배열 반환
	 * 사용법 : getThemeList(order)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	getThemeList : function(order) {
		var options = { 
			con : 'tmapid',
			conVal : this.getTMapId(),
			order : order,
			retAttr : 'theme'
		};
		return this.getLayers(options);
	},
	
	/**********************************************************************************
	 * 함수명 : getThemeShowList
	 * 설 명 : 현재 주제도에서 화면에 보여 줄 Theme 리스트 반환
	 * 인 자 : order('asc' : 오름차순, 'desc' : 내림차순)
	 * 반환값 : Theme 배열
	 * 사용법 : getThemeShowList(order)
	 * 작성일 : 2011.06.29
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.29		최원석		최초 생성
	 
	 **********************************************************************************/
	getThemeShowList : function(order) {
		var options = {
			con : 'show',
			order : order,
			retAttr : 'theme'
		};
		return this.getLayers(options);
	},
	
	//add jykw 20160725 for geoserver
    getLayerShowList: function(order) {
        var options = {
            con: "show",
            order: order,
            retAttr: "table"
        };
        return this.getLayers(options);
    },
	/**********************************************************************************
	 * 함수명 : getAliasList
	 * 설 명 : 현재 주제도 Alias 리스트 반환
	 * 인 자 : order('asc' : 오름차순, 'desc' : 내림차순)
	 * 반환값 : 현재 주제도 Theme 배열 반환
	 * 사용법 : getAliasList(order)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	getAliasList : function(order) {
		var options = { 
			con : 'tmapid',
			conVal : this.getTMapId(),
			order : order,
			retAttr : 'alias'
		};
		return this.getLayers(options);
	},
	
	/**********************************************************************************
	 * 함수명 : getTableList
	 * 설 명 : 현재 주제도 table 리스트 반환
	 * 인 자 : order('asc' : 오름차순, 'desc' : 내림차순)
	 * 반환값 : 현재 주제도 table 배열 반환
	 * 사용법 : getTableList(order)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	getTableList : function(order) {
		var options = { 
			con : 'tmapid',
			conVal : this.getTMapId(),
			order : order,
			retAttr : 'table'
		};
		return this.getLayers(options);
	},
	
	/**********************************************************************************
	 * 함수명 : getLayersSize
	 * 설 명 : 현재 layer 리스트의 크기를 반환
	 * 반환값 : layer 리스트의 크기
	 * 사용법 : getLayersSize()
	 * 작성일 : 2011.06.29
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.29		최원석		최초 생성
	 
	 **********************************************************************************/
	getLayersSize : function() {
		var nLayerSize = 0;
		
		if(this.layers.length)
			return this.layers.length;
		else{
			for (var i in this.getLayers()){
				nLayerSize++;
			}
			return nLayerSize;
		}
	},
	
	/**********************************************************************************
	 * 함수명 : setLayerAttr
	 * 설 명 : 특정 조건에 부합하는 레이어의 속성 설정
	 * 인 자 : options
	 * 	options = {
	 * 		con : 조건이 되는 필드명
	 * 		conVal : 찾는 조건 값
	 * 		attr : 설정할 필드 값 배열 or 문자열
	 * 		value : 설정할 필드 값 배열 or 문자열
	 *  }
	 * 반환값 : 성공(true), 실패(false)
	 * 사용법 : setLayerAttr(options)
	 * 작성일 : 2011.06.29
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.29		최원석		최초 생성
	 
	 **********************************************************************************/
	setLayerAttr : function(options) {
		if(options && options.con && options.conVal && options.attr) {
			var attrs = [];
			var values = [];
			if(!(options.attr instanceof Array)) {
				attrs = [options.attr];
			}
			else {
				attrs = options.attr;
			}
			if(!(options.value instanceof Array)) {
				values = [options.value];
			}
			else {
				values = options.value;
			}

			for(var i in this.layers) {
				if(this.layers[i][options.con] == options.conVal) {
					for(var j=0,len=attrs.length; j < len; j++) {
						this.layers[i][attrs[j]] = values[j];	
					}
					return true;
				}
			}
		}
		else {
			return false;
		}
	},
	
	/**********************************************************************************
	 * 함수명 : orderBySeq
	 * 설 명 : 특정 조건에 부합하는 레이어의 속성 설정
	 * 인 자 : arr(기준 배열), field(기준 필드명), order(정렬 기준 : asc[오름차순], desc[내림차순])
	 * 반환값 : 순서 변경된 레이어 리스트
	 * 사용법 : orderBySeq(arr, field, order)
	 * 작성일 : 2011.06.29
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.29		최원석		최초 생성
	 
	 **********************************************************************************/
	orderBySeq : function(arr, field, order) {
		var len = arr.length;
		for(var i=len-1; i > 0; i--) {
			for(var j=0; j < i; j++) {
				if(order.toLowerCase() == 'desc') {
					if(eval(arr[j][field]) < eval(arr[j+1][field])) {
						NUTs.Util.fn_swap_element(arr, j, j+1);
					}
				}
				else {
					if(eval(arr[j][field]) > eval(arr[j+1][field])) {
						NUTs.Util.fn_swap_element(arr, j, j+1);
					}
				}
			}
		}
	},
	
	
	/**********************************************************************************
	 * 함수명 : changeNull
	 * 설 명 : 배열에 포함된 -1 값을 null 값으로 변환
	 * 인 자 : arr  (배열)
	 * 사용법 : changeNull(arr)
	 * 작성일 : 2011.06.27
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.06.27		최원석		최초 생성
	 
	 **********************************************************************************/
	changeNull : function(arr) {
		for(var i in arr) {
			for(var j in arr[i]) {
				if(arr[i][j] == -1) {
					arr[i][j] = null;
				}
			}
		}
	},
	
	setSld : function(sld) {
		this.sld = sld;
	},

	getSld : function() {
		return this.sld;
	},
	
	getSld_body : function(ruleView, baseLayer) {
		var tempXml = this.sld.xml.cloneNode(true);
		
		var sld = this.format.read(tempXml);
		
		var namedLayers = sld.namedLayers;
		
		var delLayers = [];
		for(var i in this.layers) {
			if(this.layers[i].show != 1) {
				delLayers.push(this.layers[i].table); //CJH 2017.03 for geoserver
			}
		}
		
		if(baseLayer) {
			for(var i=delLayers.length-1; i >= 0; i--) {
				if(delLayers[i] == baseLayer) {
					delLayers.splice(i, 1);
				}
			}
		}
		
		if(ruleView) {
			var index = 0;

			for(var i in sld.namedLayers) {
				var name = "";
				namedLayersName = sld.namedLayers[i].name;
				
                if(!sld.namedLayers[i].userStyles[0].layerName){
                	delete sld.namedLayers[i];
                }
                else {
                	if(namedLayersName.length > 0) name = namedLayersName;
    				
    				var check = false;
    				for(var j in delLayers) {
    					if(delLayers[j] == name) {
    						delete namedLayers[i];
    						check = true;
    						break;
    					}
    				}
    				if(!check) {
    					if(this.sld.namedLayers[index] && this.sld.namedLayers[index].userStyle) {
    						for(var j in this.sld.namedLayers[index].userStyle) {
        						for(var k in this.sld.namedLayers[index].userStyle[j].rules) {
        							if(this.sld.namedLayers[index].userStyle[j].rules[k].hidden) {
        								
        								//2016.02.16 CJH 수정 - splice를 통해 배열의 크기가 조정되는(줄어드는) 부분이 반영되지 않아 다른 룰을 hidden처리하게 되는 문제 수정. 
                                        var featureTypeStyle = sld.namedLayers[i].userStyles[j];
                                        var rules = featureTypeStyle.rules;
                                        for (var l = 0, lLen = rules.length; l < lLen; l++) {
                                            var ruleName = rules[l].name;
                                            if (this.sld.namedLayers[index].userStyle[j].rules[k].name ==
                                                ruleName) {
                                                //console.log("delete " + sld.namedLayers[i].userStyles[j].rules[l].name);
                                                sld.namedLayers[i].userStyles[j].rules.splice(l, 1);
                                                if (rules.length == 1) {
                                                //   console.log("delete " + namedLayers[index]);
                                                    delete sld.namedLayers[index]
                                                }
                                                break
                                            }
                                        }
        							}
        						}
        					}
    					}
    					
    				}
                }
                
				
				index++;
			}
			
			
			/*for(var i=Object.keys(sld.namedLayers).length - 1; i >= 0; i--) {
				var name;
				element = namedLayers[i].getElementsByTagName("se:Name");
				if(element.length > 0) name = element[0].textContent;
				
				var check = false;
				for(var j in delLayers) {
					if(delLayers[j] == name) {
						desc[0].removeChild(namedLayers[i]);
						check = true;
						break;
					}
				}
				if(!check) {
					for(var j in this.sld.namedLayers[i].userStyle) {
						for(var k in this.sld.namedLayers[i].userStyle[j].rules) {
							if(this.sld.namedLayers[i].userStyle[j].rules[k].hidden) {
								var featureTypeStyle = namedLayers[i].getElementsByTagName("sld:UserStyle")[j].getElementsByTagName("se:FeatureTypeStyle")[0];
								var rules = featureTypeStyle.getElementsByTagName("se:Rule");
								for(var l=0, lLen=rules.length; l < lLen; l++) {
									var ruleName = rules[l].getElementsByTagName("se:Name")[0].textContent;
									if(this.sld.namedLayers[i].userStyle[j].rules[k].name == ruleName) {
										featureTypeStyle.removeChild(rules[l]);
										
										if(rules.length == 1) {
											desc[0].removeChild(namedLayers[i]);
										}
										break;
									}
								}
							}
						}
					}
				}
			}*/
		}
		else {
			for(var i in sld.namedLayers) {
				var name = "";
				var namedLayerName = sld.namedLayers[i].name;
				
                if(!sld.namedLayers[i].userStyles[0].layerName){
                	delete sld.namedLayers[i];
                }
                else{ 
                	if(namedLayerName.length > 0) {
    					name = namedLayerName;
    				}
    				
    				for(var j in delLayers) {
    					if(delLayers[j] == name) {
    						delete namedLayers[i];
    						break;
    					}
    				}
                }
			}
		}
		return this.format.write(sld);
	},
	
	getDefaultSld : function() {
		return this.defaultSld;
	},
	
	getModifyStr : function() {
		// 화면에 보이는 sld만 저장
		var tempXml = this.sld.xml.cloneNode(true);
		var desc = tempXml.getElementsByTagName("sld:StyledLayerDescriptor");
		var namedLayers = desc[0].getElementsByTagName("sld:NamedLayer");
		
		var delLayers = [];
		for(var i in this.sld.namedLayers) {
			//if(!this.sld.namedLayers[i].modify) {
				//delLayers.push(this.sld.namedLayers[i].name);
			//};
		};
		
		for(var i=0, len=namedLayers.length; i < len; i++) {
			var name;
			element = namedLayers[i].getElementsByTagName("se:Name");
			if(element.length > 0) name = element[0].text;

			for(var j in delLayers) {
				if(delLayers[j] == name) {
					desc[0].removeChild(namedLayers[i]);
				}
			}
		}
		
		return tempXml.xml;
	},
	
	backSld : function(layer) {
				
	},
	
	updateSld : function(layer) {
		layer.modify = true;
		
		/*
		var namedLayers = this.sld.xml.getElementsByTagName("sld:NamedLayer");
		
		for(var i=0, len=namedLayers.length; i < len; i++) {
			var name;
			element = namedLayers[i].getElementsByTagName("se:Name");
			if(element.length > 0) name = element[0].text;
			
			if(layer.name == name) {
				var userStyles = namedLayers[i].getElementsByTagName("sld:UserStyle");
				
				for(var j=0, jLen=userStyles.length; j < jLen; j++) {
					var rules = userStyles[j].getElementsByTagName("se:Rule");
					for(var k=0, kLen=rules.length; k < kLen; k++) {
						var points = rules[k].getElementsByTagName("se:PointSymbolizer");
						var lines = rules[k].getElementsByTagName("se:LineSymbolizer");
						var polygons = rules[k].getElementsByTagName("se:PolygonSymbolizer");
						var texts = rules[k].getElementsByTagName("se:TextSymbolizer");
						
						if(points.length > 0) {
							var externalGraphics = points[0].getElementsByTagName("se:ExternalGraphic");
							if(externalGraphics.length > 0) {
								var inlineContents = externalGraphics[0].getElementsByTagName("se:InlineContent");
								if(inlineContents.length > 0) inlineContents[0].text = layer.userStyle[j].rules[k].symbolizer.point.externalGraphic;
							}
							
							
							var svgParam = points[0].getElementsByTagName("se:Size");
							if(svgParam.length > 0) {
								svgParam[0].text = layer.userStyle[j].rules[k].symbolizer.point.size;
							}
						}
						
						if(lines.length > 0) {
							var svgParam = lines[0].getElementsByTagName("se:SvgParameter");
							
							var exist = 0;
							for(var l=0, lLen=svgParam.length; l < lLen; l++) {
								//선 색 strokeColor
								if(svgParam[l].getAttribute("name") == "stroke") {
									svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.line.stroke;
								}
								//선 두께 strokeWidth
								else if(svgParam[l].getAttribute("name") == "stroke-width") {
									svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.line.strokeWidth;
								}
								//선 투명도 strokeOpacity
								else if(svgParam[l].getAttribute("name") == "stroke-opacity") {
									svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.line.strokeOpacity;
								}
								//모서리 스타일 strokeLinecap
								else if(svgParam[l].getAttribute("name") == "stroke-linecap") {
									svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.line.strokeLinecap;
								}
								else if(svgParam[l].getAttribute("name") == "stroke-dasharray") {
									var selStyle = layer.userStyle[j].rules[k].symbolizer.line.strokeDashArray;
									
									if(selStyle == "dot") {
										svgParam[l].text = "2.0,2.0";
									}
									else if(selStyle == "dash") {
										svgParam[l].text = "7.0,3.0";
									}
									else if(selStyle == "dashdot") {
										svgParam[l].text = "10.0,2.0,2.0,2.0";
									}
									else {
										svgParam[l].parentNode.removeChild(svgParam[l]);
									}
									
									exist = 1;
								}
								
								//모서리 스타일 strokeLinecap
								//else if(svgParam[l].getAttribute("name") == "stroke-linecap") {
								//  strokeLinecap
								//	svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.line.strokeLinecap;
								//}
								
							}
							
							if(svgParam.length > 0 && exist==0) {
								var text = "";
								var selStyle = layer.userStyle[j].rules[k].symbolizer.line.strokeDashArray;
								
								if(selStyle != "solid") {
									if(selStyle == "dot") {
										text = "2.0,2.0";
									}
									else if(selStyle == "dash") {
										text = "7.0,3.0";
									}
									else if(selStyle == "dashdot") {
										text = "10.0,2.0,2.0,2.0";
									}
									
									var node = this.sld.xml.createElement("se:SvgParameter");
									var textNode = this.sld.xml.createTextNode(text);
									node.setAttribute("name", "stroke-dasharray");
									node.appendChild(textNode);
									svgParam[0].parentNode.appendChild(node);
								}
							}
						};
						
						if(polygons.length > 0) {
							svgParam = polygons[0].getElementsByTagName("se:SvgParameter");
							for(l=0, lLen=svgParam.length; l < lLen; l++) {
								//면색 fillColor
								if(svgParam[l].getAttribute("name") == "fill") {
									svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.polygon.fillColor;
								}
								//면투명도 fillOpacity
								else if(svgParam[l].getAttribute("name") == "fill-opacity") {
									svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.polygon.fillOpacity;
								}
							}
						}
						
						if(texts.length > 0) {
							var fonts = texts[0].getElementsByTagName("se:Font");
							if(fonts.length > 0) {
								svgParam = fonts[0].getElementsByTagName("se:SvgParameter");
								for(l=0, lLen=svgParam.length; l < lLen; l++) {
									//서체 fontFamily
									if(svgParam[l].getAttribute("name") == "font-family") {
										svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.text.fontFamily;
									}
									//글자 크기 fontSize
									else if(svgParam[l].getAttribute("name") == "font-size") {
										svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.text.fontSize;
									}
									//글자 스타일 fontStyle
									else if(svgParam[l].getAttribute("name") == "font-style") {
										svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.text.fontStyle;
									}
									//글자 두께 fontWeight
									else if(svgParam[l].getAttribute("name") == "font-weight") {
										svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.text.fontWeight;
									}
								}
							}
							
							var fill = texts[0].getElementsByTagName("se:Fill");
							for(var l=0; l < fill.length; l++) {
								svgParam = fill[l].getElementsByTagName("se:SvgParameter");

								if(fill[l].previousSibling.nodeName == "se:Halo") {
									for(var m=0, mLen=svgParam.length; m < mLen; m++) {
										if(svgParam[l].getAttribute("name") == "fill") {
											//배경 색 haloColor
											svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.text.haloColor;
										}
										else if(svgParam[l].getAttribute("name") == "fill-opacity") {
											//배경 투명도 haloOpacity
											svgParam[l].text = layer.userStyle[j].rules[k].symbolizer.text.haloOpacity;
										}
									}
								}
								else {
									for(var m=0, mLen=svgParam.length; m < mLen; m++) {
										if(svgParam[m].getAttribute("name") == "fill") {
											//글자 색 fillColor
											svgParam[m].text = layer.userStyle[j].rules[k].symbolizer.text.fillColor;
										}
										else if(svgParam[m].getAttribute("name") == "fill-opacity") {
											//글자 투명도 fillOpacity
											svgParam[m].text = layer.userStyle[j].rules[k].symbolizer.text.fillOpacity;;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		*/
		for(var i=0, len=this.sld.data.namedLayers.length; i < len; i++) {
			if(layer.name == this.sld.data.namedLayers[i].name) {
				var userStyles = this.sld.data.namedLayers[i].userStyle;
				
				for(var j=0, jLen=userStyles.length; j < jLen; j++) {
					var rules = userStyles[j].rules;
					for(var k=0, kLen=rules.length; k < kLen; k++) {
						if(rules[k].symbolizer["point"]){
							rules[k].symbolizer["point"].externalGraphic = layer.userStyle[j].rules[k].symbolizer.point.externalGraphic;
							
							//ggash 20170111 for geoserver - GeoServer에는 size가 필수 property 아님.
                            if(layer.userStyle[j].rules[k].symbolizer.point.size)
                            	rules[k].symbolizer["point"].size = layer.userStyle[j].rules[k].symbolizer.point.size;
							
						}
						
						if(rules[k].symbolizer["line"]){
							rules[k].symbolizer["line"].stroke = layer.userStyle[j].rules[k].symbolizer.line.stroke;
							rules[k].symbolizer["line"].strokeWidth = layer.userStyle[j].rules[k].symbolizer.line.strokeWidth;
							rules[k].symbolizer["line"].strokeOpacity = layer.userStyle[j].rules[k].symbolizer.line.strokeOpacity;
							rules[k].symbolizer["line"].strokeLinecap = layer.userStyle[j].rules[k].symbolizer.line.strokeLinecap;
							
							if(rules[k].symbolizer["line"].strokeDashArray){
								var selStyle = layer.userStyle[j].rules[k].symbolizer.line.strokeDashArray;
								
								if(selStyle == "dot") {
									rules[k].symbolizer["line"].strokeDashArray = "2.0,2.0";
								}
								else if(selStyle == "dash") {
									rules[k].symbolizer["line"].strokeDashArray = "7.0,3.0";
								}
								else if(selStyle == "dashdot") {
									rules[k].symbolizer["line"].strokeDashArray = "10.0,2.0,2.0,2.0";
								}
							}
						};
						
						if(rules[k].symbolizer["polygon"]) {
							rules[k].symbolizer["polygon"].fillColor = layer.userStyle[j].rules[k].symbolizer.polygon.fillColor;
							rules[k].symbolizer["polygon"].fillOpacity = layer.userStyle[j].rules[k].symbolizer.polygon.fillOpacity;
						}
						
						if(rules[k].symbolizer["text"]) {
							rules[k].symbolizer["text"].fontFamily = layer.userStyle[j].rules[k].symbolizer.text.fontFamily;
							rules[k].symbolizer["text"].fontSize = layer.userStyle[j].rules[k].symbolizer.text.fontSize;
							rules[k].symbolizer["text"].fontStyle = layer.userStyle[j].rules[k].symbolizer.text.fontStyle;
							rules[k].symbolizer["text"].fontWeight = layer.userStyle[j].rules[k].symbolizer.text.fontWeight;
							rules[k].symbolizer["text"].haloColor = layer.userStyle[j].rules[k].symbolizer.text.haloColor;
							rules[k].symbolizer["text"].haloOpacity = layer.userStyle[j].rules[k].symbolizer.text.haloOpacity;
							rules[k].symbolizer["text"].fillColor = layer.userStyle[j].rules[k].symbolizer.text.fillColor;
							rules[k].symbolizer["text"].fillOpacity = layer.userStyle[j].rules[k].symbolizer.text.fillOpacity;
						}
					}
				}
			}
		}
	},
	
	getTMapGroup : function() {
		return this.groups;
	},
	
	getTMap : function() {
		return this.tMaps;
	},
	
	addTMap : function(obj) {
		this.tMaps.push(obj);
	},
	
	
	/**********************************************************************************
	 * 함수명 : insertGroup
	 * 설 명 : 그룹 이동시 해당 레이어의 Seq값 변경을 위한 함수
	 * 		  기준 그룹의 Seq값을 타겟 그룹의 Seq값으로 변경 후 타겟그룹과 그 두 그룹 사이에 있는
	 * 		  그룹들의 Seq값을 1씩 증가 또는 1씩 감소 시켜준다.
	 * 인 자 : aGroupId(이동할 기준 그룹의 ID값), bGroupId(타겟이 되는 그룹의 ID값)
	 * 사용법 : insertGroup(aGroupId, bGroupId)
	 * 작성일 : 2012.06.08
	 * 작성자 : 기술교육팀 이경찬
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 20121.06.08		이경찬			최초 생성
	 * 
	 **********************************************************************************/
	insertGroup : function(aGroupId, bGroupId){
		aGroupId = parseInt(aGroupId);
		bGroupId = parseInt(bGroupId);
		
		// 그룹 리스트 정렬
		this.orderBySeq(this.layerGroups, 'seq', "asc");
		
		var idA; // 기준 그룹의 layerGroups에서의 index값
		var idB; // 타겟 그룹의 layerGroups에서의 index값
		var seqA; // 기준 그룹의 Seq값
		var seqB; // 타겟 그룹의 Seq값
		
		for(var i in this.layerGroups){
			if(this.layerGroups[i].id == aGroupId){
				seqA = this.layerGroups[i].seq; 
				idA = i;
			}
			if(this.layerGroups[i].id == bGroupId){
				seqB = this.layerGroups[i].seq;
				idB = i;
			}
		}
		
		// 기준 그룹이 위로 이동
		if(idA-idB > 0){
			this.layerGroups[idA].seq = this.layerGroups[idB].seq;
			for(var i=idB, len=idA ; i < len ; i++){
				this.layerGroups[i].seq += 1;
			}
		}
		
		// 기준 그룹이 아래로 이동
		else {
			this.layerGroups[idA].seq = this.layerGroups[idB].seq;
			for(var i=idB, len=idA ; i > len ; i--){
				this.layerGroups[i].seq -= 1; 
			}
		}
		
		// 변경된 그룹의 Seq에 의해 그룹내에 포함된 레이어의 Seq값도 변경해준다.
		this.setLayerSeq(this.layerGroups);
	},
	
	/**********************************************************************************
	 * 함수명 : setLayerSeq
	 * 설 명 : 변경된 그룹의 Seq에 의해 그룹내에 포함된 레이어들(this.layers)의 Seq값도 변경해주는 함수
	 * 인 자 : layerGroups(레이어 그룹 배열)
	 * 사용법 : setLayerSeq(layerGroups)
	 * 작성일 : 2012.06.08
	 * 작성자 : 기술교육팀 이경찬
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 20121.06.08		이경찬			최초 생성
	 * 
	 **********************************************************************************/
	setLayerSeq : function(layerGroups){
		var layerSeq = 1;
		this.orderBySeq(layerGroups, 'seq', "asc");
		for(var i in layerGroups){
			for(var j in this.layers){
				if(layerGroups[i].id == this.layers[j].layerGroup){
					this.layers[j].seq = layerSeq++;
				}
			}
		}
	},
	
	/**********************************************************************************
	 * 함수명 : insertLayer
	 * 설 명 : 레이어 이동시 해당 레이어의 Seq값을 변경해주는 함수
	 * 		  기준 레이어의 Seq값을 타겟 레이어의 Seq값으로 변경해주고 두 레이어 사이에 있는
	 * 		  레이어들의 Seq값을 1씩 증가 또는 1씩 감소시켜준다.
	 * 인 자 : layerId(기준 레이어 ID값), targetId(타겟 레이어 ID값)
	 * 사용법 : insertLayer(layerId, targetId)
	 * 작성일 : 2012.06.08
	 * 작성자 : 기술교육팀 이경찬
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 20121.06.08		이경찬			최초 생성
	 * 
	 **********************************************************************************/
	insertLayer : function(layerId,targetId){
		this.orderBySeq(this.layers, 'seq', "asc");
		var layerIdx; // 기준 레이어의 layers에서의 index값
		var layerSeq; // 기준 레이어의 Seq값
		var targetIdx; // 타겟 레이어의 layers에서의 index값
		var targetSeq; // 타겟 레이어의 Seq값
		
		for(var i in this.layers){
			if(this.layers[i].id == layerId){
				layerSeq = this.layers[i].seq;
				layerIdx = i;
			}
			if(this.layers[i].id == targetId){
				targetSeq = this.layers[i].seq;
				targetIdx = i;
			}
		}
		if(layerIdx-targetIdx > 0){
			this.layers[layerIdx].seq = this.layers[targetIdx].seq;
			for(var i=targetIdx, len=layerIdx ; i < len ; i++){
				this.layers[i].seq += 1;
			}
		}
		else {
			this.layers[layerIdx].seq = this.layers[targetIdx].seq;
			for(var i=targetIdx, len=layerIdx ; i > len ; i--){
				this.layers[i].seq -= 1;
			}
		}
		this.orderBySeq(this.layers, 'seq', "asc");
	},
	
	/**********************************************************************************
	 * 함수명 : getCloneLayerGroups
	 * 설 명 : LayerGroups 객체의 클론 객체를 생성하는 함수
	 * 인 자 : obj(LayerGroups 객체)
	 * 사용법 : getCloneLayerGroups(obj)
	 * 작성일 : 2012.06.08
	 * 작성자 : 기술교육팀 이경찬
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 20121.06.08		이경찬			최초 생성
	 * 
	 **********************************************************************************/
	getCloneLayerGroups : function(obj) {
		var arr = [];
		if(obj){
			for(var i=0, len=obj.length; i < len; i++) {
				arr.push(this.cloneObj(obj[i]));
			}
		}
		else{
			for(var i=0, len=this.layerGroups.length; i < len; i++) {
				arr.push(this.cloneObj(this.layerGroups[i]));
			}
		}
		
		return arr;
	},
	
	/**********************************************************************************
	 * 함수명 : getCloneLayers
	 * 설 명 : Layers 객체의 클론 객체를 생성하는 함수
	 * 인 자 : obj(Layers 객체)
	 * 사용법 : getCloneLayers(obj)
	 * 작성일 : 2012.06.08
	 * 작성자 : 기술교육팀 이경찬
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 20121.06.08		이경찬			최초 생성
	 * 
	 **********************************************************************************/
	getCloneLayers : function(obj) {
		var arr = [];
		if(obj){
			for(var i=0, len=obj.length; i < len; i++) {
				arr.push(this.cloneObj(obj[i]));
			}
		}
		else{
			for(var i=0, len=this.layers.length; i < len; i++) {
				arr.push(this.cloneObj(this.layers[i]));
			}
		}
		
		return arr;
	},
	
	/**********************************************************************************
	 * 함수명 : cloneObj
	 * 설 명 : 새로운 객체안에 인자로 들어간 obj의 값들을 하나씩 넣어주는 함수
	 * 		  ((사용시 주의 사항)) obj 객체의 값중에 객체 타입이 있을 경우 복사가 아닌 참조 형태로 들어간다.
	 * 인 자 : obj(복제할 객체)
	 * 사용법 : cloneObj(obj)
	 * 작성일 : 2012.06.08
	 * 작성자 : 기술교육팀 이경찬
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 20121.06.08		이경찬			최초 생성
	 * 
	 **********************************************************************************/
	cloneObj : function(obj){
		var clone = {};
		for(var i in obj) {
			clone[i] = obj[i];
		}
		return clone;
	},
	
	CLASS_NAME: "NUTs.Tool.TMapLayerTool"
});


/*
 * 임시 소스 코드
 * 레이어 순서 조절  임시로 남김 
 * 클라이언트에 따라 조작할 경우 클라이언트 조작이 빠를 경우 순서가 제대로 동작안한느 현상이 있어 보류
changeSeqByMove : function(seq, target) {
	var layer = this.getLayerAttrByAttr('seq', seq);
	this.changeSeqByDelete(seq);
	this.changeSeqByInsert(target);
	layer.seq = parseInt(target);
},
changeSeqByInsert : function(seq) {
	for(var i in this.layers) {
		if(this.layers[i].seq != -1) {
			if(this.layers[i].seq >= seq) {
				this.layers[i].seq++;
			}
		}
	}	
},
changeSeqByDelete : function(seq) {
	for(var i in this.layers) {
		if(this.layers[i].seq != -1) {
			if(this.layers[i].seq > seq) {
				this.layers[i].seq--;
			}
		}
	}
},
*/



/*=[ SaveTool.js ]==========================================================================*/


NUTs.GeoServer.Tool.SaveTool = OpenLayers.Class(NUTs.Tool.SaveTool, {

	parseMap : function() {
		this.xml += "<MAP>";
		var params;

			params = {
					left : this.map.getExtent().bottom,
					bottom : this.map.getExtent().left,
					right : this.map.getExtent().top,
					top : this.map.getExtent().right,
					width : this.map.getSize().w,
					height : this.map.getSize().h,
					resolution : this.map.getResolution()
				};
	
		this.write(params);

		this.xml += "</MAP>";
	},

	CLASS_NAME : "NUTs.GeoServer.Tool.SaveTool"
});