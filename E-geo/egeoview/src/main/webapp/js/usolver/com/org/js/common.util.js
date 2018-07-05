//  다이얼로그를 관리하기 위한 배열 선언
var dialogs = [];

var progress_spinner;// 프로그래스 스피너

$.fn.center = function () {
	this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
};

function cfShowProgressBar() {
	var opts = {
	  lines: 13, // The number of lines to draw
	  length: 20, // The length of each line
	  width: 10, // The line thickness
	  radius: 30, // The radius of the inner circle
	  corners: 1, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#000', // #rgb or #rrggbb or array of colors
	  speed: 1, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	try {
		$('#progressbar').center();
		var target = document.getElementById('progressbar');
		progress_spinner = new Spinner(opts).spin(target);
	} catch(E) {alert(E);}
}

function cfHideProgressBar() {
	try {
		progress_spinner.stop();
	} catch(E) {}
}

// 폼내부 파라메터 값을 배열로 추출 (jqgrid 용)
$.fn.cfSerializeObject = function()
{
    var o = {};
    /*var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;*/
	
    var nm = "";
    var val = "";
	$(this).find("input[type='hidden'], input[type='text'], input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea,.SPINNER").each( function(){
		nm = $(this).attr('id');
		// mask 처리 된 경우, cleanVal 함수를 통해 마스크 제거된 값을 가져오게 처리
		try {
			val = $(this).cleanVal();
		}catch(E){
			val = $(this).val();
		}
		
		// class 값으로 int, float, doublt 인 경우, 콤마 제거
		var cs = $(this).getClasses();

		if( cs.indexOf("DT_INT")!=-1 || cs.indexOf("DT_DOUBLE")!=-1 || cs.indexOf("DT_FLOAT")!=-1 ) {
			val = val.replace(/[^0-9\.\-]/g,'');
		}

		 if (o[nm] !== undefined) {
            if (!o[nm].push) {
                o[nm] = [o[nm]];
            }            o[nm].push(val || '');
        } else {
            o[nm] =val || '';
        }
	});

	return o;
};

// 
function cfChangePageMode(mode, form_id) {
	if( mode=='VIEW') {
		$('#'+form_id+' input').attr('readonly', true).css("background","#E5E5E5");
		$('select').attr('disabled', true).css("background","#E5E5E5");
	}
	else if( mode=='WRITE') {
		$('#'+form_id+' input').removeAttr('readonly');
		$('#'+form_id+' select').removeAttr('disabled');
	}
}

function cfFiledownload(file_cours, file_nm) {
	try {
		$("#download_frm").find("#FILE_COURS").val( file_cours );
		$("#download_frm").find("#FILE_NM").val( file_nm );
		$("#download_frm").attr("action","/common/downloadFile.do");
		$("#download_frm").attr("target","proc_frm");
		$("#download_frm").submit();
	}catch(E){alert(E);}
}

function cfFiledelete(file_key) {
	try {
		$("#download_frm").find("#ATCHMNFL_SN").val( file_key );
		$("#download_frm").attr("action","/common/deleteFile.do");
		$("#download_frm").attr("target","proc_frm");
		$("#download_frm").submit();
	}catch(E){alert(E);}
}

// 유니크 아이디 생성
function cfCreateRandomId(n) {
	if(!n)
        n = 5;

    var text = '';
    var charGroup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < n; i++)
    {
        text += charGroup.charAt(Math.floor(Math.random() * charGroup.length));
    }

    return text;
}

// 팝업 창을 열어준 부모 객체를 아이디로 추출
function cfWindowOpener(wnd_id) {
	var opener = parent.$.window.getWindow( wnd_id );
	if (opener != undefined) {
		try {
			opener = opener.getContainer().find("iframe")[0].contentWindow;
		}catch(E){
			alert('함수를 호출 할 수 없습니다.(팝업을 다시 실행해 주십시오.)');
		}
	}
	
	return opener;
}

// DIV 팝업 생성 ( plug in 사용)
function cfWindowOpen( div_title, call_url, width, height, modal, opener_id, position ) {
	try {
		if( modal || position=='center' ) {
			if(parent.dialogOpen) {
				parent.dialogOpen(  div_title, call_url, width, height, modal, opener_id );
			} else {
				window.dialogOpen(  div_title, call_url, width, height, modal, opener_id );
			}
		} else {
			windowOpen(  div_title, call_url, width, height, modal, opener_id );
		}
	} catch(E) {
		alert('오류가 발생하였습니다. : ' +E);
	}
}

//DIV 팝업 닫기 ( plug in 사용)
function cfWindowCloseBack( wnd_id ) {
	try {
		//var wnd = window.parent.$.window.getSelectedWindow();
		var wnd = window.parent.$.window.getWindow( wnd_id );
		if( wnd!=null )
			wnd.close();
	} catch(E) {
		alert('오류가 발생하였습니다. : ' +E);
	}
}
function cfWindowClose( wnd_id ) {
	try {
		/*
		var update1 = "[UPDATE]<br/>ATR_YMD = TO_CHAR(SYSDATE, 'YYYYMMDD')";
		update1 += "<br/>,ATR_NAM = fn_user_name(#system_user_id#)";
		var update2 = "[M_UPDATE]<br/>ATR_YMD = TO_CHAR(SYSDATE, 'YYYYMMDD')";
		update2 += "<br/>,ATR_NAM = fn_user_name(#system_user_id#)";
		var insert1 = "[INSERT]<br/>(<br/>OBJECTID";
		insert1 += "<br/>,ATR_YMD";
		insert1 += "<br/>,ATR_NAM";		
		
		var insert2 = "<br/>FN_OID('테이블명을 넣으시오')";
		insert2 += "<br/>,TO_CHAR(SYSDATE, 'YYYYMMDD')";
		insert2 += "<br/>,fn_user_name(#system_user_id#)";
		
		$('#frm').find("input[type='hidden'], input[type='text'], input[type='password'], input[type='checkbox'], input[type='radio'], select,textarea").each( function(){
			nm = $(this).attr('name');

			if( nm=='action_flag' || nm=='screen_mode' || nm=='callBackFunction' || nm=='opener_id' || nm=='wnd_id' || nm=='OBJECTID' ){
				
			}
			else {
				if(  typeof nm != 'undefined' ) {
					update1 += "<br/>," +  nm + " = #"+nm+"#";
					
					insert1 += "<br/>," +  nm;
					insert2 += "<br/>,#" +  nm + "#";
					update1 += "<br/>," +  nm + " = #"+nm+"#";
					update2 += '<br/>&lt;isNotNull property="' + nm + '"&gt;<br />,' +  nm + ' = #'+nm+'#<br />&lt;/isNotNull&gt;';
	
					insert1 += "<br/>," +  nm;
					insert2 += "<br/>,#" +  nm + "#";
				}
			}
		});
		
		var w = window.open('','ginnocode','width=300,height=600');
		w.document.writeln(update1);
		w.document.writeln("<br/><br/>"+update2);
		w.document.writeln("<br/><br/>"+insert1+"<br/>)<br/>VALUES (");
		w.document.writeln(insert2+"<br/>)");
		*/
		
	} catch(E) {
	}
	
	try {
		//자식 창 닫을 때 부모창으로 포커스 가게 처리
		if ($("#opener_id").val() != ""){
			var open_wnd = cfWindowOpener($("#opener_id").val());
			if (open_wnd != undefined) {
				var frm = open_wnd.$("form");
				if (frm != undefined) frm.find("input[type='text']:enabled").first().focus();
			}
		}
		
		//var wnd = window.parent.$.window.getSelectedWindow();
		var wnd = window.parent.$.window.getWindow( wnd_id );
		if( wnd!=null )
			wnd.close();
	} catch(E) {
		alert('오류가 발생하였습니다. : ' +E);
	}
}

// 윈도우 팝업 Footer 작성
function cfWindowSetFooter( wnd_id, content ) {
	try {
		var wnd = null;
		if( wnd_id!='' )
			wnd = window.parent.$.window.getWindow( wnd_id );
		else {
			wnd = window.parent.$.window.getSelectedWindow();
		}
		
		if( wnd!=null )
			wnd.setFooterContent(content);
	} catch(E) {
		alert('오류가 발생하였습니다. : ' +E);
	}
}

// lpad
$.strPad = function(i,l,s) {
	var o = i.toString();
	if (!s) { s = '0'; }
	while (o.length < l) {
		o = s + o;
	}
	return o;
};

// 객체가 속해 있는 클래스 목록 가져오기
$.fn.getClasses = function(){
	var ca = this.attr('class');
	var rval = [];
	if(ca && ca.length && ca.split){
		ca = $.trim(ca);
		ca = ca.replace(/\s+/g,' '); /* remove doube spaces */
		rval = ca.split(' ');
	}
	return rval;
}

// iframe 을 쓸수 있는 객체 가져오기 : 아래
function cfGetIframeBody(frame) {
		var doc = null;

		// IE8 cascading access check
		try {
			if (frame.contentWindow) {
				doc = frame.contentWindow.document;
			}
		} catch(err) {}

		if (doc) { // successful getting content
		}
		else {
			try {
				doc = frame.contentDocument ? frame.contentDocument : frame.document;
			} catch(err) {
				doc = frame.document;
			}
		}
		
		var $doc = doc;
		var $body = $($doc.body) ? $($doc.body) : $($doc.documentElement)
		$body.html('');
		
		return $body;
}

// 마스크 혹은 기타 처리가 된 값을 필터링 하여 순수 데이터만 뽑은 폼을 생성 
// <데이터가지고 있는 폼아이디>, <폼 데이터를 복사할 iframe 아이디>, <처리한 action>, <처리후 돌아올 함수명>
function cfGetMaskClearFormSubmit(frm_id, target_iframe, action, callback) {
	// *MU.do 타입인 경우, 수정대상 체크박스의 체크 확인 20140911
	if( $(location).attr('pathname').indexOf("MU.do")>0 ) {
		if( $( "input[id^='MU_CK_']" ).length>0 && $( "input[id^='MU_CK_']:checked" ).length<=0 ) {
			alert( "등록 대상(체크박스)을 선택하십시오." );
			return;
		}
	}
	
	$("#callBackFunction").val(callback);	// 처리후 복귀 함수
	
	var uniq_id = cfCreateRandomId(10);
	var $iframe = cfGetIframeBody($("#"+target_iframe)[0]);
	var $form = $("<form/>").attr( "action", action ).attr( "id", uniq_id ).attr("method", "post");
	
	try {
		var input_type = "";
		var input_val = "";
		var $ctrl = "";
		
		$iframe.append( $form );
	
		$("#"+frm_id).find("input[type='hidden'], input[type='text'],input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea").each( function(){
			// disabled 된것은 배제
			if( $(this).is(':enabled') ) {
				input_type = $(this).attr("type");
				
				try {	// 마스크 등 제거
					input_val = $(this).cleanVal();
				}catch(E){
					input_val = $(this).val();
				}
				
				// class 값으로 int, float, doublt 인 경우, 콤마 제거
				var cs = $(this).getClasses();
	
				if( cs.indexOf("DT_INT")!=-1 || cs.indexOf("DT_DOUBLE")!=-1 || cs.indexOf("DT_FLOAT")!=-1 ) {
					input_val = input_val.replace(/[^0-9\.\-]/g,'');
				}

				if ($(this).get(0).tagName == "TEXTAREA"){
					$ctrl = $('<TEXTAREA/>').attr({name:$(this).attr("name"), value: input_val });
				} else {
					$ctrl = $('<input/>').attr({ type: 'text', name:$(this).attr("name"), value: input_val });
				}
				
				$iframe.find("#"+uniq_id).append($ctrl);
			}
		});
	} catch(E) {}
	//alert( $iframe.html() );
	$iframe.find("#"+uniq_id).submit();
}
// MULTIPART 폼인 경우
function cfGetMaskClearFileFormSubmit(frm_id, target_iframe, action, callback) {
	$("#callBackFunction").val(callback);	// 처리후 복귀 함수
	
	$("#"+frm_id).attr("action", action);
	$("#"+frm_id).attr("target", target_iframe);
	
	try {
		var nm = Array();
		var val= Array();

		$("#"+frm_id).find("input[type='text'],input[type='password']").each( function(){
			nm.push( $(this).attr("name") );
			val.push( $(this).val() );
			
			try {	// 마스크 등 제거
				$(this).val( $(this).cleanVal() );
			}catch(E){}
		});

		$("#"+frm_id).submit();
		
		for (var i=0; i < nm.length; i++) {
			$("#"+nm[i]).val( val[i] );
		}
	} catch(E) {}
}

// SUBMIT 처리 공통함수
function cfGetForm(frm_id, target_iframe, action, callback) {
		// 호출 주소 뒤에 ? 다음 파라메터가 있는 경우, 별도의 폼을 만들어 해당 파라메터만 전송
		if( action.indexOf('?')>0 ) {
			
			// 기존에 temp_send_frm 이 존재한다면 삭제한다.
			// 기존에 temp_send_frm 이 계속해서 body 에 추가되기때문에
			// OBJECTID 가 여러건 생기는 문제가 발생하여
			// 정상적으로 OBJECTID를 가져오지 못해 삭제할때 문제가 발생한다.
			if($("#temp_send_frm").length > 0) {
				$("#temp_send_frm").remove();
			}
			
			var $form = $("<form id='temp_send_frm' name='temp_send_frm' />").attr( "action", action ).attr("method", "post").attr("target",target_iframe);
			var $cback = $('<input/>').attr({ type: 'hidden', name: 'callBackFunction', value: callback });
			$form.append($cback);
			$('body').append($form);

			return $('#temp_send_frm');
		}
		else {
			
			//엑셀출력 메세지 처리
			/*if( action.indexOf('Excel')>0 ) {
				$(".loading").css("display", "block");
				$(".loading").html("다운로드 창이 나올때까지 기다려 주시기 바랍니다.");
			}*/			
			
			$("#callBackFunction").val(callback);	// 처리후 복귀 함수	
			
			var uniq_id = cfCreateRandomId(10);
			var $iframe = cfGetIframeBody($("#"+target_iframe)[0]);
			var $form = $("<form/>").attr( "action", action ).attr( "id", uniq_id ).attr("method", "post");
			
			try {
				var input_type = "";
				var input_val = "";
				var $ctrl = "";
				
				$iframe.append( $form );
			
				$("#"+frm_id).find("input[type='hidden'], input[type='text'],input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea, .SPINNER").each( function(){
					// disabled 된것은 배제
					if( $(this).is(':enabled') ) {
						input_type = $(this).attr("type");
						try {	// 마스크 등 제거
							input_val = $(this).cleanVal();
						}catch(E){
							input_val = $(this).val();
						}
						
						// class 값으로 int, float, doublt 인 경우, 콤마 제거
						var cs = $(this).getClasses();
			
						if( cs.indexOf("DT_INT")!=-1 || cs.indexOf("DT_DOUBLE")!=-1 || cs.indexOf("DT_FLOAT")!=-1 ) {
							input_val = input_val.replace(/[^0-9\.\-]/g,'');
						}
						
						$ctrl = $('<input/>').attr({ type: 'text', name:$(this).attr("name"), value: input_val });
						
						$iframe.find("#"+uniq_id).append($ctrl);
					}
				});
			} catch(E) {}

			return $iframe.find("#"+uniq_id);
		}
}


// 폼 데이터 카피
function cfCopyFormData(frm_id) {
	var uniq_id = cfCreateRandomId(10);
	var $iframe = $("<iframe/>").attr( "id", uniq_id );
	var $form = $("<form/>").attr( "action", action ).attr( "id", uniq_id ).attr("method", "post");
	
	try {
		var input_type = "";
		var input_val = "";
		var $ctrl = "";
		
		$iframe.append( $form );
	
		$("#"+frm_id).find("input[type='text']").each( function(){
			input_type = $(this).attr("type");
			
			if( input_type=='file' ) {
				$ctrl = $('<input/>').attr({ type: 'file', name:$(this).attr("name"), value: $(this).val() });
			}
			else {
				try {	// 마스크 등 제거
					input_val = $(this).cleanVal();
				}catch(E){
					input_val = $(this).val();
				}
				
				$ctrl = $('<input/>').attr({ type: 'text', name:$(this).attr("name"), value: input_val });
			}
			
			$iframe.find("#"+uniq_id).append($ctrl);
		});
	} catch(E) {}

	return $iframe.find("#"+uniq_id);
}

// 일괄처리용 : 체크박스의 값에 따라 disable 처리
function cfSetDisable(ckbox, target_id) {
	if( $(ckbox).is(":checked") ) {
		$('#'+target_id).removeAttr('disabled');	
		if($.inArray(target_id, ["CNT_NUM","AVN_NAM","CTL_LB2","ROU_IDN","FED_IDN","IPC_IDN","CLB_IDN","RDC_IDN"]) >= 0) {
			$('#'+target_id).next().show(); //공사대장 찾기 버튼	
		}
		if ($('#'+target_id).hasClass("DT_DATE")){ //달력버튼
			$('#'+target_id).next().show();
		}
	}
	else {
		$('#'+target_id).attr('disabled', true);	
		if($.inArray(target_id, ["CNT_NUM","AVN_NAM","CTL_LB2","ROU_IDN","FED_IDN","IPC_IDN","CLB_IDN","RDC_IDN"]) >= 0) {
			$('#'+target_id).next().hide(); //공사대장 찾기 버튼	
		}	
		if ($('#'+target_id).hasClass("DT_DATE")){ //달력버튼
			$('#'+target_id).next().hide();
		}
	}
}

//업데이트 항목 선택용 체크 박스 생성 : 일괄수정 화면용
function cfCreateUpdateCheckbox(frm) {
	var hideSearchBtn = ["CNT_NUM","AVN_NAM","CTL_LB2","ROU_IDN","FED_IDN","IPC_IDN","CLB_IDN","RDC_IDN"];
	for ( var i = 0; i < hideSearchBtn.length; i++) {
		if ($("#"+hideSearchBtn[i]).length && $("#"+hideSearchBtn[i]).next().length && $("#"+hideSearchBtn[i]).next().get(0).tagName == "A") {
			$("#"+hideSearchBtn[i]).next().hide();
		}
	}
	$(".ui-datepicker-trigger").hide();
	
	$("#"+frm).find("input[type='text'], input[type='checkbox'], input[type='radio'], select,textarea").each( function(){
		try {
			var pos = $(this).closest("td").index();
			var pnts = $(this).closest("tr");
			var t = $(pnts).children().eq(pos-1).html();

			$(pnts).children().eq(pos-1).html( "<input type=\"checkbox\" style=\"float: left;\" id=\"MU_CK_"+$(this).attr("name")+"\" onclick=\"cfSetDisable(this, '"+$(this).attr("name")+"');\"/> "  + t );

			if( $(this).is("select") )
				$(this).children("option").eq(1).attr("selected","selected");
			
			$(this).attr('disabled', true);
		} catch(E) {}
	});
}

// 뷰 모드, 수정 모드
function cfViewMode(frm) {
	cfReadonly(frm, true);
	
	$("#screen_mode").val('view');	// 화면 상태 뷰 모드
	
	$("#"+frm).find(".btnClassEdit").hide();
	$("#"+frm).find(".btnClassView").show();
}
function cfEditMode(frm) {
	cfReadonly(frm, false);
	
	$("#screen_mode").val('edit');	// 화면 상태 에디터 모드
	
	$("#"+frm).find(".btnClassEdit").show();
	$("#"+frm).find(".btnClassView").hide();
	
	// 셀렉트 박스의 값이 없는 경우는 첫번째 값으로 세팅
	$("#"+frm).find("select").each( function(){
		if ($(this).val() == '')
			$(this).get(0).selectedIndex = 1;
	});
	
	// 포커스 IN
	$("#"+frm).find("input[type='text']:enabled").first().focus();
}
function cfScreenMode(frm) {
	try {
		return $("#screen_mode").val();
	} catch(E) {
		return '';
	}
}

//ReadOnly 처리
function cfReadonly(frm, tf) {
	createFormObjectInit(frm);
	$("#"+frm+" input[type='text'], input[type='password'], input[type='checkbox'], input[type='radio'], select,textarea").attr("disabled", tf);
	if( tf )
		$(".ui-datepicker-trigger").hide();
	else
		$(".ui-datepicker-trigger").show();
}

//폼 리셋 : 초기화
function cfReset(form_nm) {
	$("#"+form_nm).each(function() {
		this.reset();
	});
}
function cfResetSelect(select_id) {
	// 행정동의 경우, 특별히 값 모두 제거
	$("#"+select_id+" option").remove();
}

// 위치 확인
function cfSearchMap(table_name, object_id) {	
	try {
		if (object_id.indexOf(",") > -1) { //콤마로 구분 된 다중검색
			parent.getComplexLocation(table_name, object_id.split(","));	
			cfBookHide();	
		} else if (!isNaN(object_id)) {	//단일 검색
			parent.getComplexLocation(table_name, [object_id]);	
			cfBookHide();	
		}
	} catch (e) { //목록 다중검색 obejct_id : jqgrid
	    var rowIds = object_id.getGridParam('selarrrow');
	    
	    if( rowIds != null && rowIds!='' ) {
	    	var rowData;
	    	var idList = new Array();
	    	
	    	if (rowIds.length > 1000) {
	    		alert("1000건 미만으로 실행하여 주시기 바랍니다.");
	    		return;
	    	}
	    	
	    	for(var i=0;i<rowIds.length;i++) {
	    		rowData = object_id.getRowData(rowIds[i]); 
	    		idList.push(rowData['OBJECTID']);
	    	}
			parent.getComplexLocation(table_name, idList);	
			cfBookHide();
	    }
	    else {
	    	alert("목록을 선택하여 주시기 바랍니다.");
	    }
	}
}

//화면숨김
function cfBookHide() {	
	/*window.parent.$("#bookRestore").center();
	window.parent.$("#bookRestore").css("top", Number(window.parent.$("#bookRestore").css("top").replace("px", "")) - 200 + "px");
	window.parent.$("#bookRestore").css("left", Number(window.parent.$("#bookRestore").css("left").replace("px", "")) + 200 + "px");*/
	
	window.parent.$("#bookRestore").css("position", "absolute");
	window.parent.$("#bookRestore").css("top", "250px");
	window.parent.$("#bookRestore").css("right", "300px");
	window.parent.$("#bookRestore").show();
	window.parent.$.window.hideAll();
}

function fnBlink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("blink")) 
            $(elem).removeClass("blink");
        else
            $(elem).addClass("blink");
    }

    clearTimeout(function () {
    	fnBlink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(function () {
        	fnBlink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}

//화면복원
function cfBookRestore() {	
	window.parent.$("#bookRestore").hide();
	window.parent.$.window.showAll();
}

// 공통 팝업 생성 함수들
// 상수 공사번호 검색 <공사번호>, <팝업 윈도우 Opener 아이디>
function cfWaterCtnNum(cnt_num, wnd_id) {		
	cfWindowOpen( "공사번호 검색", "/water/wttConsMaSearch.do?CNT_NUM="+cnt_num, 600, 467, true, wnd_id );
}

// 하수 공사번호 검색 <공사번호>, <팝업 윈도우 Opener 아이디>
function cfSewerCtnNum(cnt_num, wnd_id) {		
	cfWindowOpen( "공사번호 검색", "/sewer/swtConsMaSearch.do?CNT_NUM="+cnt_num, 600, 467, true, wnd_id );
}

// 도로 공사번호 검색 <공사번호>, <팝업 윈도우 Opener 아이디>
function cfRoadCtnNum(cnt_num, wnd_id) {		
	cfWindowOpen( "공사번호 검색", "/road/rdtConsMaSearch.do?CNT_NUM="+cnt_num, 600, 467, true, wnd_id );
}

//공사대장 보기 : 공사번호를 받아 OBJECTID로 띄우기
//type : {road, water, sewer}, cnt_num : 공사번호
function cfConsMaView(type, cnt_num, wnd_id) {
	if (cnt_num == null || cnt_num == "") {
		alert("공사대장 번호가 설정되지 않았습니다.");
		return;
	}
	var objectid = "";
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			TYPE : type 
			,CNT_NUM : cnt_num
		},
		contentType : "application/json; charset=utf-8",
		url: "/AjaxGetConsMaOID.do",
		success: function(data) {
			objectid = data.OBJECTID;
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete: function(data) {
			if (objectid == null || objectid == "") {
				alert("해당하는 공사대장이 없습니다.");
				return;
			}
			
			if (type == "road")
				cfWindowOpen( "도로공사 대장", "/road/rdtConsMaCRU.do?OBJECTID="+objectid, 895, 855, false, wnd_id, 'center');
			else if (type == "water")
				cfWindowOpen( "상수공사 대장", "/water/wttConsMaCRU.do?OBJECTID="+objectid, 855, 870, false, wnd_id, 'center');
			else if (type == "sewer")
				cfWindowOpen( "하수공사 대장", "/sewer/swtConsMaCRU.do?OBJECTID="+objectid, 832, 830, false, wnd_id, 'center');
		}
	});
}


// CCTV 보기 <FTR_CDE>, <FTR_IDN>
function cfCctv(ftr_cde, ftr_idn, wnd_id) {		
	cfWindowOpen( "CCTV 관리", "/sewer/swtCctvEtList.do?FTR_CDE="+ftr_cde+"&FTR_IDN="+ftr_idn, 600, 615, true, wnd_id );
}

//상수 설계도면 및 사진  <FTR_CDE>, <FTR_IDN>
function cfImage(ftr_cde, ftr_idn, wnd_id, cnt_num) {		
	if (cnt_num == undefined)
		cfWindowOpen( "상수 설계도면 및 사진", "/water/wttImgeEtList.do?FTR_CDE="+ftr_cde+"&FTR_IDN="+ftr_idn, 600, 615, true, wnd_id );
	else
		cfWindowOpen( "상수 설계도면 및 사진", "/water/wttImgeEtList.do?CNT_NUM="+cnt_num, 600, 615, true, wnd_id );
	
}

//도로 설계도면 및 사진  <FTR_CDE>, <FTR_IDN>
function cfImageRoad(ftr_cde, ftr_idn, wnd_id, cnt_num) {
	if (cnt_num == undefined)
		cfWindowOpen( "도로 설계도면 및 사진", "/road/rdtImgeEtList.do?FTR_CDE="+ftr_cde+"&FTR_IDN="+ftr_idn, 600, 615, true, wnd_id );
	else
		cfWindowOpen( "도로 설계도면 및 사진", "/road/rdtImgeEtList.do?CNT_NUM="+cnt_num, 600, 615, true, wnd_id );
}

//하수 설계도면 및 사진  <FTR_CDE>, <FTR_IDN>
function cfImageSewer(ftr_cde, ftr_idn, wnd_id, cnt_num) {	
	if (cnt_num == undefined)
		cfWindowOpen( "하수 설계도면 및 사진", "/sewer/swtImgeEtList.do?FTR_CDE="+ftr_cde+"&FTR_IDN="+ftr_idn, 600, 615, true, wnd_id );
	else
		cfWindowOpen( "하수 설계도면 및 사진", "/sewer/swtImgeEtList.do?CNT_NUM="+cnt_num, 600, 615, true, wnd_id );	
}

// 노선명 검색
function cfRoadRutNam(rut_nam, wnd_id) {		
	cfWindowOpen( "노선명", "/road/rdtRoutDtSearch.do?RUT_NAM="+rut_nam, 590, 380, true, wnd_id );
}

// 새주소도로명 검색
function cfRoadAvnNam(avn_nam, wnd_id) {		
	cfWindowOpen( "새주소도로명", "/road/rdtAvenEtSearch.do?AVN_NAM="+avn_nam, 590, 380, true, wnd_id );
}

// 우회도로번호 검색
function cfRoadRouIdn(rou_idn, wnd_id) {		
	cfWindowOpen( "우회도로번호", "/road/rdtRndwDtSearch.do?ROU_IDN="+rou_idn, 590, 400, true, wnd_id );
}

// 유로도로번호 검색
function cfRoadFedIdn(fed_idn, wnd_id) {		
	cfWindowOpen( "유로도로번호", "/road/rdtFeedDtSearch.do?FED_IDN="+fed_idn, 590, 400, true, wnd_id );
}

// 실연장대장번호 검색
function cfRoadRdcIdn(rdc_idn, wnd_id) {		
	cfWindowOpen( "실연장대장번호", "/road/rdtRdcdDtSearch.do?RDC_IDN="+rdc_idn, 590, 400, true, wnd_id );
}

// 도로중심선교점관리번호 검색
function cfRoadIpcIdn(ipc_idn, wnd_id) {		
	cfWindowOpen( "도로중심선교점관리번호", "/road/rdtIpcrDtSearch.do?IPC_IDN="+ipc_idn, 590, 400, true, wnd_id );
}

// 오르막차로관리번호 검색
function cfRoadClbIdn(clb_idn, wnd_id) {		
	cfWindowOpen( "오르막차로관리번호", "/road/rdtClbmDtSearch.do?CLB_IDN="+clb_idn, 595, 400, true, wnd_id );
}

//설계도면 보기 <패키지명> <테이블명> <OBJECTID>
function cfPrint(package_id, table_id, object_id) {
	var tmp = table_id.split("_");
	var sId = tmp[0].toLowerCase();
	
	for(var i=1; i<tmp.length; i++) {
		sId += tmp[i].substring(0,1).toUpperCase() + tmp[i].substring(1).toLowerCase();
	}
	
	var w = window.open("/"+package_id+"/"+sId+"Print.do?FID="+object_id, "PRINT_DJ", "left=0,top=0,width=800,height=800,scrollbars=yes");
	w.focus();
}

// jqgrid 용 포맷터
function cfFormatterLpad(cellvalue, options, rowObject) {
	return $.strPad(cellvalue ,6);
}
//현재날짜 리턴 ex) 2014-01-01
function cfGetNowDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
	    dd='0'+dd;
	} 
	if(mm<10) {
	    mm='0'+mm;
	} 
	return yyyy+'-'+mm+'-'+dd;
}

//날짜 형식 리컨 ex) 20140101 --> 2014-01-01
function cfDateFormat(v) {
	var r = v;
	if (v.length == 8)
		r = v.substring(0, 4) + "-" + v.substring(4, 6) + "-" + v.substring(6, 8);
	else if (v.length == 7)
		r = v.substring(0, 4) + "-" + v.substring(4, 6) + "-" + v.substring(6, 7);
	else if (v.length == 6)
		r = v.substring(0, 4) + "-" + v.substring(4, 6);
	else if (v.length == 5)
		r = v.substring(0, 4) + "-" + v.substring(4, 5);
	return r; 			
}

function cfAddCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function fnGoManual() {
	alert("준비 중입니다.");
}

//대장 저장 시 로그 남기기
function fnReturnSysTyp() {
	var sSysTyp = "";
	if ($(location).attr('pathname').indexOf("road/") > 0)
		sSysTyp = "road";
	else if ($(location).attr('pathname').indexOf("water/") > 0)
		sSysTyp = "water";
	else if ($(location).attr('pathname').indexOf("sewer/") > 0)
		sSysTyp = "sewer";
	return sSysTyp;
}
function fnReturnTagNam() {
	var sTagNam = $(location).attr('pathname');
	sTagNam = sTagNam.replace("/road/", "");
	sTagNam = sTagNam.replace("/water/", "");
	sTagNam = sTagNam.replace("/sewer/", "");
	sTagNam = sTagNam.replace("CRU.do", "");
	sTagNam = sTagNam.replace("RU.do", "");
	sTagNam = sTagNam.toUpperCase();
	sTagNam = sTagNam.substring(0, 3) + "_" + sTagNam.substring(3, 7) + "_" + sTagNam.substring(7, 9);
	return sTagNam;
}
function fnReturnTagIdn() {
	var sTagIdn = "", vPathName = $(location).attr('pathname');
	
	// 유지보수 이력 등 연결자를 - 로 설정. 이력보기 화면은 안 나오지만, 기록은 하는 걸로....
	// 기타 UK 값 처리
	if (vPathName.indexOf("ConsMa") > 0)
		sTagIdn = $("#CNT_NUM").val();
	else if (vPathName.indexOf("ImgeEt") > 0)
		if ($("#CNT_NUM").val() != "")
			sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val();
		else
			sTagIdn = $("#CNT_NUM").val();
	else if (vPathName.indexOf("rdtPrsvDt") > 0
			|| vPathName.indexOf("wttWutlHt") > 0
			|| vPathName.indexOf("swtSutlHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#REP_NUM").val();
	else if (vPathName.indexOf("rdtChckHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#CHK_NUM").val();
	else if (vPathName.indexOf("rdtChngDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#CHG_NUM").val();
	else if (vPathName.indexOf("rdtCostDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#PAY_NUM").val();
	else if (vPathName.indexOf("rdtReprDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#RPR_NUM").val();
	else if (vPathName.indexOf("rdtSubcDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#SUB_NUM").val();
	else if (vPathName.indexOf("rdtTestDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#EXM_IDN").val();
	else if (vPathName.indexOf("rdtLampDt") > 0)
		sTagIdn = $("#FTR_IDN").val() + "-" + $("#RMP_NUM").val();
	else if (vPathName.indexOf("rdlCtlrLs") > 0)
		sTagIdn = $("#SEC_IDN").val();
	else if (vPathName.indexOf("rdtRoutDt") > 0)
		sTagIdn = $("#RUT_IDN").val();
	else if (vPathName.indexOf("rdtRdcdDt") > 0)
		sTagIdn = $("#RDC_IDN").val();
	else if (vPathName.indexOf("rdtFeedDt") > 0)
		sTagIdn = $("#FED_IDN").val();
	else if (vPathName.indexOf("rdtRdwyDt") > 0 || vPathName.indexOf("rdtSdwkDt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "_" + $("#RDA_IDN").val();
	else if (vPathName.indexOf("rdtRndwDt") > 0)
		sTagIdn = $("#ROU_IDN").val();
	else if (vPathName.indexOf("rdtIpcrDt") > 0)
		sTagIdn = $("#IPC_IDN").val();
	else if (vPathName.indexOf("rdtLandDt") > 0)
		sTagIdn = $("#LND_IDN").val();
	else if (vPathName.indexOf("rdtPaveDt") > 0)
		sTagIdn = $("#PAV_IDN").val();
	else if (vPathName.indexOf("rdtYndgDt") > 0)
		sTagIdn = $("#FTR_IDN").val();
	else if (vPathName.indexOf("rdtKeepHt") > 0 || vPathName.indexOf("rdtAsetHt") > 0
			|| vPathName.indexOf("rdtTrchDt") > 0 || vPathName.indexOf("rdtTrfcDt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#EXC_NUM").val();
	else if (vPathName.indexOf("rdtPaktDt") > 0 || vPathName.indexOf("rdtPakfDt") > 0)
		sTagIdn = $("#PAK_IDN").val() + "-" + $("#FTR_IDN").val();
	else if (vPathName.indexOf("rdtPaktHt") > 0 || vPathName.indexOf("rdtPakfHt") > 0)
		sTagIdn = $("#PKT_IDN").val() + "-" + $("#PKT_NUM").val();
	else if (vPathName.indexOf("rdtNotrDt") > 0)
		sTagIdn = $("#TRD_IDN").val();
	else if (vPathName.indexOf("rdtExalDt") > 0 || vPathName.indexOf("rdtOcalDt") > 0)
		sTagIdn = $("#PMS_IDN").val();
	else if (vPathName.indexOf("rdtJmygDt") > 0)
		sTagIdn = $("#PMS_IDN").val() + "-" + $("#CHG_NUM").val();
	else if (vPathName.indexOf("rdtGulcEt") > 0 || vPathName.indexOf("swtJumyEt") > 0
			 || vPathName.indexOf("swtJumyE1") > 0 || vPathName.indexOf("swtJumyE2") > 0
			 || vPathName.indexOf("swtJumyE3") > 0)
		sTagIdn = "OID-" + $("#OBJECTID").val();
	else if (vPathName.indexOf("rdtJufcDt") > 0)
		sTagIdn = $("#PMS_IDN").val() + "-" + $("#JFC_NUM").val();
	else if (vPathName.indexOf("rdtFeimDt") > 0)
		sTagIdn = $("#PMS_IDN").val() + "-" + $("#OCP_IDN").val();
	else if (vPathName.indexOf("swtSserMa") > 0)
		sTagIdn = $("#RCV_NUM").val();
	else if (vPathName.indexOf("swtSpmtMa") > 0)
		sTagIdn = $("#PMT_NUM").val();
	else if (vPathName.indexOf("swtDrdgHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#DRG_NUM").val();
	else if (vPathName.indexOf("swtCctvEt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#SHT_NUM").val();
	else if (vPathName.indexOf("swtDeptEt") > 0)
		sTagIdn = $("#EQP_IDN").val();
	else if (vPathName.indexOf("swtDeptE1") > 0)
		sTagIdn = $("#EQP_IDN").val() + "-" + $("#BUD_NUM").val(); 
	else if (vPathName.indexOf("swtDeptE2") > 0)
		sTagIdn = $("#EQP_IDN").val() + "-" + $("#MOV_NUM").val(); 
	else if (vPathName.indexOf("swtDeptE3") > 0)
		sTagIdn = $("#EQP_IDN").val() + "-" + $("#RUN_NUM").val(); 
	else if (vPathName.indexOf("swtDeptE4") > 0)
		sTagIdn = $("#EQP_IDN").val() + "-" + $("#RPR_NUM").val(); 
	else if (vPathName.indexOf("swtCompEt") > 0)
		sTagIdn = $("#COM_IDN").val(); 
	else if (vPathName.indexOf("swtCostDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#PAY_NUM").val();
	else if (vPathName.indexOf("swtEstaDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#KIS_NUM").val();
	else if (vPathName.indexOf("swtChngDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#CHG_NUM").val();
	else if (vPathName.indexOf("swtMtrlDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#JAJ_NUM").val();
	else if (vPathName.indexOf("swtDtilDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#DTL_NUM").val();
	else if (vPathName.indexOf("swtSubcDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#SUB_NUM").val();
	else if (vPathName.indexOf("swtFlawDt") > 0 || vPathName.indexOf("swtInspDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#RPR_NUM").val();
	else if (vPathName.indexOf("swtJihaD1") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-OID-" + $("#OBJECTID").val() ;
	else if (vPathName.indexOf("swtJihaD2") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#EXC_NUM").val() ;
	else if (vPathName.indexOf("wttWserMa") > 0)
		sTagIdn = $("#RCV_NUM").val();
	else if (vPathName.indexOf("wttWnjsEt") > 0)
		sTagIdn = util.removeMinus($("#REC_YMD").val());
	else if (vPathName.indexOf("wttMatrCd") > 0)
		sTagIdn = $("#MAT_IDN").val();
	else if (vPathName.indexOf("wttIlwiCd") > 0)
		sTagIdn = $("#ILW_IDN").val();
	else if (vPathName.indexOf("wttFexpEt") > 0)
		sTagIdn = $("#SHR_IDN").val();
	else if (vPathName.indexOf("wttDfrmEt") > 0 || vPathName.indexOf("wttQfrmEt") > 0)
		sTagIdn = $("#FRM_IDN").val();
	else if (vPathName.indexOf("wttExraCd") > 0)
		sTagIdn = $("#EXP_IDN").val();
	else if (vPathName.indexOf("wttSusuCd") > 0)
		sTagIdn = $("#SSU_IDN").val();
	else if (vPathName.indexOf("wttToolCd") > 0)
		sTagIdn = $("#TOL_IDN").val();
	else if (vPathName.indexOf("wttDeptEt") > 0)
		sTagIdn = $("#EQP_IDN").val();
	else if (vPathName.indexOf("wttCompEt") > 0)
		sTagIdn = $("#COM_IDN").val();
	else if (vPathName.indexOf("wttRsrvMt") > 0)
		sTagIdn = $("#CPN_IDN").val();
	else if (vPathName.indexOf("wttQtstE1") > 0)
		sTagIdn = $("#TST_IDN").val() + "-" + $("#ITM_NUM").val();
	else if (vPathName.indexOf("wttQtabE1") > 0)
		sTagIdn = $("#CLT_IDN").val();
	else if (vPathName.indexOf("wttQualE1") > 0)
		sTagIdn = $("#QUL_IDN").val() + "-" + $("#ITM_NUM").val();
	else if (vPathName.indexOf("wttQitmCd") > 0)
		sTagIdn = $("#ITM_COD").val();
	else if (vPathName.indexOf("wttMinbCd") > 0)
		sTagIdn = $("#MIN_NUM").val();
	else if (vPathName.indexOf("wttYrngHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#EXC_NUM").val() ;
	else if (vPathName.indexOf("wttSuapHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#SAP_NUM").val() ;
	else if (vPathName.indexOf("wttRsrvHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#CLN_NUM").val() ;
	else if (vPathName.indexOf("wttRsrvDt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#REP_NUM").val() ;
	else if (vPathName.indexOf("wttFactDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#FAC_NUM").val();
	else if (vPathName.indexOf("wttCostDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#PAY_NUM").val();
	else if (vPathName.indexOf("wttTestDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#EXE_NUM").val();
	else if (vPathName.indexOf("wttChngDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#CHG_NUM").val();
	else if (vPathName.indexOf("wttCmpnDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#COM_NUM").val();
	else if (vPathName.indexOf("wttSubcDt") > 0)
		sTagIdn = $("#CNT_NUM").val() + "-" + $("#SUB_NUM").val() + "-" + $("#HCM_NUM").val();
	else if (vPathName.indexOf("wttSlbiHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + $("#SLB_NUM").val();
	else if (vPathName.indexOf("wttDrsvHt") > 0)
		sTagIdn = $("#FTR_CDE").val() + "-" + $("#FTR_IDN").val() + "-" + util.removeMinus($("#REC_YMD_TMP").text().trim());
	else if (vPathName.indexOf("wttDeptE1") > 0)
		sTagIdn = $("#EQP_IDN").val() + "-" + $("#REP_NUM").val();
	else if (vPathName.indexOf("wttCompE1") > 0)
		sTagIdn = $("#COM_IDN").val() + "-" + $("#EQP_NUM").val();
	else if (vPathName.indexOf("wttRsv1Dt") > 0)
		sTagIdn = $("#CPN_IDN").val() + "-" + $("#UPT_NUM").val();
	else if (vPathName.indexOf("wttRsrvWt") > 0)
		sTagIdn = $("#CPN_IDN").val() + "-" + $("#EDU_NUM").val();
	else if (vPathName.indexOf("wttRsv2Dt") > 0)
		sTagIdn = $("#CPN_IDN").val() + "-" + $("#MAN_NUM").val();
	else if (vPathName.indexOf("wttRsv3Dt") > 0)
		sTagIdn = $("#CPN_IDN").val() + "-" + $("#PEN_NUM").val();
	else if (vPathName.indexOf("wttQualCd") > 0)
		sTagIdn = $("#WTR_CDE").val() + "-" + $("#ITM_NUM").val();
	else if (vPathName.indexOf("wttSplyEtCRU.do") > 0)
		sTagIdn = $("#RCV_NUM").val();
	else //기본 대장
		sTagIdn = $("#FTR_CDE").val() + "_" + $("#FTR_IDN").val();
	
	return sTagIdn;
}

function fnBookLog() {
	var sSysTyp = fnReturnSysTyp();
	var sTagAls = parent.$.window.getWindow($("#wnd_id").val()).getContainer()
			.find(".window_title_text").text().replace(" 대장", "").replace("대장", "")
			.replace(" 수정", "").replace("수정", "").replace(" 추가", "");
	var sTagIdn = fnReturnTagIdn();
	
	if (sTagIdn.indexOf("_") >= 0) {
		sTagIdn = sTagIdn.substr(sTagIdn.indexOf("_") + 1);
	}
	cfWindowOpen("대장 이력보기", "/common/usvBookLogList.do?SYS_TYP=" + sSysTyp + "&TAG_ALS=" + sTagAls + "&TAG_IDN=" + sTagIdn, 1024, 800, false, '', 'center');
}
var colName1 = [], colValue1 = [], colAlias = [];
$( document ).ready(function() {
	if( $(location).attr('pathname').indexOf("RU.do") < 0 ) return;
	//급수공사 관련 대장 기록 제외
	if( $(location).attr('pathname').indexOf("wttSplyEtCRU.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyPlanRU.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyProRU.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyMaRU.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyC2CRU.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyPlanUnitC.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyPlanUnitRU.do") >= 0 ) return;
	if( $(location).attr('pathname').indexOf("wttSplyPlanUnitBatchC.do") >= 0 ) return;
	
	//특정 서브 대장에서 이력보기 버튼 제외
	if ($(location).attr('pathname').indexOf("rdtPaktDt") >= 0
		|| $(location).attr('pathname').indexOf("rdtPakfDt") >= 0
		|| $(location).attr('pathname').indexOf("wttCmpnDt") >= 0) {
	
	} else if ($(location).attr('pathname').indexOf("swtCompEt") >= 0) {
		if ($("#action_flag").val() == "UPDATE")  //특정 대장에서 이력보기 / 추가, 수정 상태일 경우
			$(".btns").last().children().first().before("<strong><input type='button' value='이력보기' class='btnClassEdit' onclick='fnBookLog();' /></strong>&nbsp;");
	} else {
		if ($("#action_flag").val() == "UPDATE") {
			if ($("input[value='편집']").size() > 0) { //일반대장
				if ($(".btns").last().children().first().is("strong"))
					$(".btns").last().children().first().before("<strong><input type='button' value='이력보기' class='btnClassView' onclick='fnBookLog();' /></strong>&nbsp;");
				else
					$(".btns").last().children().first().before("<input type='button' value='이력보기' class='btnClassView' onclick='fnBookLog();' />&nbsp;");	
			} else { //단가 등 대장 : 안 보이게 하는걸로
				/*if ($(".btns").last().children().first().is("strong"))
					$(".btns").last().children().first().before("<strong><input type='button' value='이력보기' class='btnClassView' onclick='fnBookLog();' /></strong>&nbsp;");
				else
					$(".btns").last().children().first().before("<input type='button' value='이력보기' class='btnClassView' onclick='fnBookLog();' />&nbsp;");*/
			}			
		}	
	}

	var o;
	//급수전계량기 대장 특이사항 처리
	if ($(location).attr('pathname').indexOf("wtlMetaPs") >= 0) {
		var main1 = $("#frm #main1").find("input[type='text'], select, textarea");
		var main2 = $("#frm #main2").find("input[type='text'], select, textarea");
		o = $.merge(main1, main2);
	} else {
		o = $("#frm").find("input[type='text'], select, textarea");
	}
	
	o.each(function() {
		if ($(this).attr("id") ==  "" || $(this).attr("id") == undefined)
			if ($(this).attr("name") == "" || $(this).attr("name") == undefined)
				return;
			else
				colName1.push($(this).attr("name"));
		else
			colName1.push($(this).attr("id"));
		
		if ($(this).parent().prev().is("th"))
			colAlias.push($(this).parent().prev().text());	
		else
			colAlias.push("항목명 확인불가");
		
		if ($(this)[0].tagName == "SELECT") {
			colValue1.push($("option:selected", this).text());
		} else {
			var formattedValue = $(this).val();
			var cs = $(this).getClasses();
			if( cs.indexOf("DT_INT")!=-1 || cs.indexOf("DT_DOUBLE")!=-1 || cs.indexOf("DT_FLOAT")!=-1 ) {
				formattedValue = cfAddCommas(formattedValue); //콤마 추가
			} else if( cs.indexOf("DT_DATE")!=-1) {
				formattedValue = cfDateFormat(formattedValue); //날짜형식으로 변경 2014-01-01
			}
			colValue1.push(formattedValue);	
		}
	});

	//대장 저장 후 콜백함수(fnSaveCallback)에 기능 추가, fnSaveCallback 함수가 있으면
	if (typeof fnSaveCallback == "function") {
		var fnSaveCallbackApply = fnSaveCallback;
		fnSaveCallback = (function () {
			var colName = [];
			var colAliasName = [];
			var colValueBefore = [];
			var colValueAfter = [];
			
			$("#frm").find("input[type='text'], select, textarea").each(function() {
				var colName2 = "";
				if ($(this).attr("id") ==  "" || $(this).attr("id") == undefined)
					if ($(this).attr("name") == "" || $(this).attr("name") == undefined)
						return;
					else
						colName2 = $(this).attr("name");
				else
					colName2 = $(this).attr("id");
				
				var colValue2 = "";
				if ($(this)[0].tagName == "SELECT") {
					colValue2 = $("option:selected", this).text();
				} else {
					colValue2 = $(this).val();	
				}
				
				$(colName1).each(function(i, val) {
					if (val != colName2) return;
					if (colValue1[i].trim() != colValue2.trim()) {
						colName.push(val);
						colAliasName.push(colAlias[i]);
						colValueBefore.push(colValue1[i] == "" ? "없음" : colValue1[i]);
						colValueAfter.push(colValue2 == "" ? "없음" : colValue2);
					}
				});
			});

			var sSysTyp = fnReturnSysTyp();
			var sTagNam = fnReturnTagNam();
			var sTagAls = parent.$.window.getWindow($("#wnd_id").val()).getContainer()
						.find(".window_title_text").text().replace(" 대장", "").replace(" 수정", "").replace(" 추가", "");
			var sTagIdn = fnReturnTagIdn();
			
			var sCudCde = "";
			if ($("#action_flag").val() == "INSERT")
				sCudCde = "C";
			else if ($("#action_flag").val() == "UPDATE")
				sCudCde = "U";
			
			if (colName.length > 0) {
				$.ajax({
					type: "post",
					async : false,
					dataType: "json",
					data: {
						SYS_TYP : sSysTyp,
						TAG_NAM : sTagNam,
						TAG_ALS : sTagAls,
						TAG_IDN : sTagIdn,
						CUD_CDE : sCudCde,
						COL_NAM : colName.join("|"),
						COL_ALS : colAliasName.join("|"),
						BEF_VAL : colValueBefore.join("|"),
						AFT_VAL : colValueAfter.join("|")
					},
					url: "/common/InsertBookLog.do",
					success: function(data) {
					},
					error: function(xhr, status, error) {
						alert(status);
						alert(error);
					}
				});
			}
			fnSaveCallbackApply.apply(this, arguments);
		});
	}
	
	//삭제 시 저장, fnDeleteCallback 함수가 있으면
	if (typeof fnDeleteCallback == "function") {
		//대장 삭제 후 콜백함수(fnDeleteCallback)에 기능 추가
		var fnDeleteCallbackApply = fnDeleteCallback;
		fnDeleteCallback = (function () {
			var sSysTyp = fnReturnSysTyp();
			var sTagNam = fnReturnTagNam();
			var sTagAls = parent.$.window.getWindow($("#wnd_id").val()).getContainer().find(".window_title_text").text().replace(" 대장", "");
			var sTagIdn = fnReturnTagIdn();
			
			$.ajax({
				type: "post",
				async : false,
				dataType: "json",
				data: {
					SYS_TYP : sSysTyp,
					TAG_NAM : sTagNam,
					TAG_ALS : sTagAls,
					TAG_IDN : sTagIdn,
					CUD_CDE : "D",
				},
				url: "/common/InsertBookLog.do",
				success: function(data) {
				},
				error: function(xhr, status, error) {
					alert(status);
					alert(error);
				}
			});
			
			fnDeleteCallbackApply.apply(this, arguments);
		});
	}

	//급수전계량기 대장 특이사항 처리
	if ($(location).attr('pathname').indexOf("wtlMetaPs") >= 0) {
		if (typeof fnSaveCallback1 == "function") {
			var fnSaveCallback1Apply = fnSaveCallback1;
			fnSaveCallback1 = (function () {
				var colName = [];
				var colAliasName = [];
				var colValueBefore = [];
				var colValueAfter = [];
				
				var main1 = $("#frm #main1").find("input[type='text'], select, textarea");
				var main2 = $("#frm #main2").find("input[type='text'], select, textarea");
				
				$.merge(main1, main2).each(function() {
					var colName2 = "";
					if ($(this).attr("id") ==  "" || $(this).attr("id") == undefined)
						if ($(this).attr("name") == "" || $(this).attr("name") == undefined)
							return;
						else
							colName2 = $(this).attr("name");
					else
						colName2 = $(this).attr("id");
					
					var colValue2 = "";
					if ($(this)[0].tagName == "SELECT") {
						colValue2 = $("option:selected", this).text();
					} else {
						colValue2 = $(this).val();	
					}
					
					$(colName1).each(function(i, val) {
						if (val != colName2) return;
						if (colValue1[i].trim() != colValue2.trim()) {
							colName.push(val);
							colAliasName.push(colAlias[i]);
							colValueBefore.push(colValue1[i] == "" ? "없음" : colValue1[i]);
							colValueAfter.push(colValue2 == "" ? "없음" : colValue2);
						}
					});
				});

				var sSysTyp = fnReturnSysTyp();
				var sTagNam = fnReturnTagNam();
				var sTagAls = parent.$.window.getWindow($("#wnd_id").val()).getContainer()
							.find(".window_title_text").text().replace(" 대장", "").replace(" 수정", "").replace(" 추가", "");
				var sTagIdn = fnReturnTagIdn();
				
				var sCudCde = "";
				if ($("#action_flag").val() == "INSERT")
					sCudCde = "C";
				else if ($("#action_flag").val() == "UPDATE")
					sCudCde = "U";
				
				if (colName.length > 0) {
					$.ajax({
						type: "post",
						async : false,
						dataType: "json",
						data: {
							SYS_TYP : sSysTyp,
							TAG_NAM : sTagNam,
							TAG_ALS : sTagAls,
							TAG_IDN : sTagIdn,
							CUD_CDE : sCudCde,
							COL_NAM : colName.join("|"),
							COL_ALS : colAliasName.join("|"),
							BEF_VAL : colValueBefore.join("|"),
							AFT_VAL : colValueAfter.join("|")
						},
						url: "/common/InsertBookLog.do",
						success: function(data) {
						},
						error: function(xhr, status, error) {
							alert(status);
							alert(error);
						}
					});
				}
				fnSaveCallback1Apply.apply(this, arguments);
			});
		}
	}
});

function fnGetImgetEt(systype, ftr_cde, ftr_idn) {
	var r = [];
	var url = "";
	switch (systype) {
		case "road":
			url = "/road/rdtImgeEtListXml.do";
			break;
		case "sewer":
			url = "/sewer/swtImgeEtListXml.do";
			break;
		case "water":
			url = "/water/wttImgeEtListXml.do";
			break;
	}
	$.ajax({
		type: "post",
		async : false,
		dataType: "xml",
		data: {
			FTR_CDE : ftr_cde,
			FTR_IDN : ftr_idn,
			page : 1,
			rows : 100
		},
		url: url,
		success: function(xml) {
			$(xml).find("FLE_NAM").each(function() {
				r.push($(this).text());
			});
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
	return r;
}

function fnOpenManual(file) {
	window.open(file);
}