util={
	langChk : function (obj,alertStr,rule){
		var value = obj.value;
		var length = value.length;
		var chk=false;
		if(alertStr=="") {
			alertStr="형식에 맞는 문자열로 입력하세요.";
		}
		
		if(rule && length>0){
			for(i=0;i<length;i++){
				var str = value.substr(i,i+1);

				if(rule.indexOf("en") > -1 && !chk){
					chk = util.isAlphabet(str);
					
				}
				
				if(rule.indexOf("int")> -1 && !chk){
					chk = util.isNumber(str);
				}
				
				if(rule.indexOf("kr")> -1 && !chk){
					chk = util.isKorean(str);
				}
				
				if(chk==false) {
					break;
				}
				if(i<length-1) {
					chk=false;
				}
			}	
			if(chk==false){
				//경고메시지 출력
				alert(alertStr);
				obj.value = "";
				setTimeout(function() {obj.focus();}, 0);
			}
		}
	},

	/* --------------------------------------------------
	   check Alphbet
	  ------------------------------------------------*/
	isAlphabet : function (ch) {
	   var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
	   if ( 65 <= numUnicode && numUnicode <= 90 ) return true;            // Uppercase
	   if ( 97 <= numUnicode && numUnicode <= 122 ) return true;           // Lowercase
	   return false;
	},

	/* --------------------------------------------------
	   check Hangul
	  ------------------------------------------------*/
	isKorean : function (ch) {
	   var numUnicode = ch.charCodeAt(0);
	   if ( 44032 <= numUnicode && numUnicode <= 55203 || 12593 <= numUnicode && numUnicode <= 12643 ) return true;            
	   return false;
	},
	  
	
	/* --------------------------------------------------
	   check Number
	  ------------------------------------------------*/
	isNumber : function (ch) {
	   var numUnicode = ch.charCodeAt(0);                                                                                    
	   if ( 48 <= numUnicode && numUnicode <= 57 ) return true;            
	   return false;
	},
	
	// last character
	lastLan : function (val){
		var length = val.length;
		var str = val.substr(length-1,length);
		return str;
	},
	
	/* --------------------------------------------------
	strPad 
	------------------------------------------------*/
	strPad : function ( input, pad_length, pad_string, pad_type ) {
	    input = ''+input;       //추가
	    var half = '', pad_to_go;
	
	    var str_pad_repeater = function(s, len){
	            var collect = '', i;
	
	            while(collect.length < len) collect += s;
	            collect = collect.substr(0,len);
	
	            return collect;
	        };
	
	    if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') { pad_type = 'STR_PAD_RIGHT'; }
	    if ((pad_to_go = pad_length - input.length) > 0) {
	        if (pad_type == 'STR_PAD_LEFT') { input = str_pad_repeater(pad_string, pad_to_go) + input; }
	        else if (pad_type == 'STR_PAD_RIGHT') { input = input + str_pad_repeater(pad_string, pad_to_go); }
	        else if (pad_type == 'STR_PAD_BOTH') {
	            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go/2));
	            input = half + input + half;
	            input = input.substr(0, pad_length);
	        }
	    }
	
	    return input;
	},
	
	// HTML 패러미터 가져오기
	getParameter : function(name) {
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}, 
	
	// Waiting ...
	loading : function(align, padLeft) {
		if (align == "center") {
			var alignStr = "text-align:center;";
		} else {
			var alignStr = "padding-left:" + padLeft + "px;";
		}
		
		var waitStr ="<table width='100%' cellspacing='0' cellpadding='0' border='0'>";
			waitStr+="\n<tr height='24'>";
			waitStr+="\n	<td style='" + alignStr + "'>";
			waitStr+="\n		<img src='/cw/images/loading_small.gif' width='23' height='23'>";
			waitStr+="\n	</td>";
			waitStr+="\n</tr>";
			waitStr+="\n</table>";
			
		return waitStr
	},
	
	// null to ""
	nvl : function(value) {
		if (value == "null")
			return "";
		else
			return value;
	},
	
	nvlToHtml : function(value, str) {
		if (value == "" || value == null || value == "null" || value == undefined)
			return str;
		else
			return value;
	},
	
	//3자리 마다 (,)를 찍어 표시
	makeCommaSeparate : function (a_Value) {
	    var fl = "";
	    var nPointPos = 0;    
		a_Value = util.removeComma(a_Value);

		if(isNaN(parseFloat(a_Value)))  { 
	    	return a_Value;
	    }
		
		a_Value = parseFloat(a_Value);
		
	    if(a_Value == 0) return a_Value;
	    
	    if(a_Value < 0) { 
		    a_Value=a_Value*(-1);
		    fl = "-";
	    }  else if(a_Value == 0)  {
	    	// 처음 입력값이 0부터 시작할때 이것을 제거한다.
	    	a_Value = a_Value*1; 
	    }
	    
	    var a_Value = new String(a_Value);
	    var temp = "";
	    var sRemain = "";
	    var co = 3;
	    
	    nPointPos = a_Value.indexOf(".");

		if( nPointPos == -1 ){
	    	num_len = a_Value.length;
	    } else {
	    	// "." 가 포함되어 있을 경우에 재계산
	    	if( parseInt(a_Value.substr(0,nPointPos)) == 0 )
	    	{
	    		a_Value = "0" + a_Value.substr(nPointPos);
	    		nPointPos = a_Value.indexOf(".");
	    	}
	    	num_len = nPointPos;
	    	sRemain = a_Value.substr(nPointPos);
	    	
	    	if (sRemain.length > 0) {
	    		sRemain = sRemain.substring(0,3);
	    	}
	    }
	    
	    while (num_len>0)
	    {
	        num_len = num_len - co;
	        
	        if(num_len<0)
	        {
	        	co=num_len+co;
	        	num_len=0;
	        }
	        
	        temp = "," + a_Value.substr(num_len,co) + temp;
	    }
	    
	    var tp = fl + temp.substr(1) + sRemain;
	    
	    if(tp != null && tp != '' && tp.substr(0,1)=='.')
	    	tp = '0'+tp;

	    return tp;
	},

	//(,)를 제거한다.
	removeComma : function (sMessage) {
		var r, re;
		re = /,/g;
		r = sMessage.replace(re,"");
		return(r);
	},

	//(-)를 제거한다.
	removeMinus : function (sMessage) {
		var r, re;
		re = /-/g;
		r = sMessage.replace(re,"");
		return(r);
	},
	
	//(,)를 제거한다.
	removeDash : function (sMessage) {
		var r, re;
		re = /-/g;
		r = sMessage.replace(re,"");
		return(r);
	},	
	
	// input 박스에 숫자 0-9 만 허용
	checkNumber : function (obj) { //enter key
		/*if ($(obj).val() == "" && event.keyCode == 48)
			event.returnValue = false;*/
	
		if ((event.keyCode < 48 || event.keyCode > 57))
			 event.returnValue = false;

	},
	
	// input 박스에 .과 숫자 0-9 만 허용
	checkFloatPoint : function (obj) { //enter key
		if ($(obj).val() == "") {
			if (event.keyCode == 48 || event.keyCode == 46)
				event.returnValue = false;
		}
	
		if ($(obj).val().indexOf(".") > 0 && event.keyCode == 46) 
			event.returnValue = false;
		
		if (event.keyCode != 46 && (event.keyCode < 48 || event.keyCode > 57))
			 event.returnValue = false;

	},
	
	// Format Localized Decimal
	formatLocalizedDecimal : function (numberValue, decimalPlaces){
		numberValue = parseFloat(numberValue);
		if (numberValue==null || numberValue==undefined) return;
	    var unlocalized = numberValue.toFixed(decimalPlaces);
	    var localized = unlocalized;
	    var decimalSeparator = ".";
	    if(decimalSeparator != "." && decimalSeparator.length > 0)
	    {
	        localized = unlocalized.replace(".", decimalSeparator);
	    }
	    return localized;
	},	

	// Trim
	trim : function (s){ 
		return  s.replace(/^\s*/,'').replace(/\s*$/, '');
	},
	
	// Clip
	clip : function (s, len){ 
		if (s.length > len) {
			return  s.substr(0, len) + "...";
		} else {
			return  s;
		}
		
	},
	clearTextItems : function () {
		$("td[id^=textItem]").each(function(){
			$(this).html("");
		});
	},

	clearTextAreaItems : function() {
		$("textarea[id^=textAreaItem]").each(function(){
			$(this).html("");
		});
	},

	clearInputItems : function() {
		$("input[id^=inputItem]").each(function(){
			$(this).val("");
		});
	},
	
	// getByte
	getByte : function(str) {
	    var resultSize = 0;
	    if (str == null) {
	        return 0;
	    }

	    for (var i = 0; i < str.length; i++) {
	        var c = escape(str.charAt(i));
	        if (c.length == 1) {
	            resultSize++;
	        }
	        else if (c.indexOf("%u") != -1) {
	            resultSize += 2;
	        }
	        else {
	            resultSize++;
	        }
	    }
	    return resultSize;
	}
	
}
