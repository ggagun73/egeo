// 달력 생성용
function createDatepickerLinked(start_id, end_id, size) {

	$('.activeWindow').find( "."+start_id ).datepicker({
		changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/org/common/calendar.gif",buttonImageOnly: true,
		onClose: function( selectedDate ) {
			$('.activeWindow').find( "."+end_id ).datepicker( "option", "minDate", selectedDate );
		}
    });
	$('.activeWindow').find( "."+end_id ).datepicker({
		changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/org/common/calendar.gif",buttonImageOnly: true,
		onClose: function( selectedDate ) {
			$('.activeWindow').find( "."+start_id ).datepicker( "option", "maxDate", selectedDate );
		}
    });
	
	createClickDatepicker(start_id);
	createClickDatepicker(end_id);
	
	
}

// datepicker 필드 클릭시 달력 확성화
function createClickDatepicker(id) {
	$('.activeWindow').find("." + id).click(function(){
		$('.activeWindow').find( "."+id ).each(function(){
			$(this).datepicker("show");
		})
	});
	$('.activeWindow').find( "."+id ).each(function(){
		$(this).datepicker();
	})
}

//달력 생성용
function createDatepicker(id, size) {
	$( "#"+id ).width(size*8).datepicker({
		changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/org/common/calendar.gif",buttonImageOnly: true,
    });
	
	createClickDatepicker(id);
}

// 마스크 처리용
function createMask(id, fmt, size) {
	if( size>0 )
		$('#'+id).mask(fmt).width(size*8);
	else
		$('#'+id).mask(fmt);
}

// 탭 기능 지정용
function createTab(id) {
    $('.'+id).bind('click', function(){
        if(!$(this).parents('li').hasClass('on')){
            $(this).parents('ul').find('.on').removeClass('on');
            $(this).parents('nav').next().find('.on').removeClass('on');
            $(this).parents('nav').next().find('div.' + $(this).parents('li').attr('class')).addClass('on');
            $(this).parents('li').addClass('on');
        }
    });
}

//폼 내의 모든 객체에 대한 변경 처리
function createFormObjectInit( frm_id ) {
	$("#"+frm_id).find(".SPINNER").each(function(){
		$(this).spinner();
		$(this).val(new Date().getFullYear());
	});
	$("#"+frm_id+"  input[type='text'], #"+frm_id+" select, #"+frm_id+" textarea").each(
			function(i){
				var inputObj = this;
				var cs = $(this).getClasses();
				
				var MX = "";
				var DT = "";
				var DD = "";
				
				$.each( cs, function(index,value){
					try {
						var class_nm = value;

						if( class_nm!='' ) {
							// CS_ 로 시작될 경우, 자리수 크기 지정
							if( class_nm.match(/CS_/) ) {
								//	$(inputObj).width( size*8 );
								//$(inputObj).width( 80 );
							}
							// 타입
							if( class_nm.match(/DT_/) ) {
								DT = class_nm.substr(3);
							}
							// 최대 자리수
							if( class_nm.match(/MX_/) ) {
								MX = parseInt(class_nm.substr(3));
							}
							// 소수점 자리수
							if( class_nm.match(/DD_/) ) {
								DD = parseInt(class_nm.substr(3));
							}
						}
					}catch(E){ alert(E); }
				});
				
				if( DT=='DATE' ) {
					$(inputObj).mask("0000-00-00");
				}
				else if( DT=='INT' || DT=='DOUBLE' || DT=='FLOAT' ) {
					// 숫자 타입 마스크 처리
					// 소숫점 입력 가능인 경우
					if( DD>0 ) {
						MX = MX-DD;
						$(inputObj).keyup(function (e) {
							//if( event.keyCode!=8 && event.keyCode!=46 && event.keyCode!=37 && event.keyCode!=39 ) {
							if( event.keyCode!=37 && event.keyCode!=39 ) {
								var cur_val = this.value.replace(/[^0-9\.\-]/g,'');
								var x = cur_val.split('.'); 
								var x1 = x[0];
								
								if( x1.length>MX )		x1 = x1.substr(0,MX);
								if( x.length > 1 ) {
									var x2 = x[1];
									
									if( x2.length>DD )			x2 = x2.substr(0,DD);
	
									this.value = x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + x2;
								}
								else {
									this.value = x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
								}
							}
						});
						
						// --------------------------------------
						// 초기 값에 콤마 추가
						var init_val = $(inputObj).val();
						var cur_val = init_val.replace(/[^0-9\.\-]/g,'');
						var x = cur_val.split('.'); 
						var x1 = x[0];
						
						if( x.length > 1 ) {
							var x2 = x[1];
							 $(inputObj).val( x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + x2 );
						}
						else {
							 $(inputObj).val( x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
						}
						// --------------------------------------
					}
					else {
						$(inputObj).keyup(function () {
							if( event.keyCode!=37 && event.keyCode!=39 ) {
								var cur_val = this.value.replace(/[^0-9\.\-]/g,'');
								var x = cur_val.split('.'); 
								var x1 = x[0];
								
								if( x1.length>MX )		x1 = x1.substr(0,MX);
								this.value = x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
							}
						});
						
						// --------------------------------------
						// 초기 값에 콤마 추가
						var init_val = $(inputObj).val();
						var cur_val = init_val.replace(/[^0-9\.\-]/g,'');
						var x = cur_val.split('.'); 
						var x1 = x[0];
						 $(inputObj).val( x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
						// --------------------------------------
					}
					$(inputObj).css("text-decoration", "underline");
				}
				else if(MX>0) {
					$(inputObj).attr('maxlength', MX);
				}
			}
	);
	$("#"+frm_id).find("input[type='text']:enabled").first().focus();
}

// 선택된 윈도우 셀렉트 처리 공통 함수
function windowSelectById( wnd_id, opener_id ) {
	try {
		var wnd = window.parent.$.window.getWindow( wnd_id );
		var opener_wnd = window.parent.$.window.getWindow( opener_id );

		if( wnd!=null ) {
			if( opener_wnd!=null )	opener_wnd.unselect();
			
			var wnd_all = window.parent.$.window.getAll();
			for( var i=0, len=wnd_all.length; i<len; i++ ) {
				try {
					if( opener_wnd!=wnd_all[i] )
						wnd_all[i].unselect();
				} catch(subE){}
			}
			wnd.select();
		}
	} catch(E) {}
}

// 검색 화면용 초기화 설정 (팝업 화면 및 jqgrid)
function initSearchScreen() {
	var nJDSKMasterId = $('.activeWindow').attr('id').substr(4,16);
	
	$('.activeWindow').find(".leftArea").css('height', $($("div.activeWindow")[0]).height() - 150 );
	$('.activeWindow').find(".tabArea").css('height', $($("div.activeWindow")[0]).height() - 220 );
	$('.activeWindow').find(".rightArea").css('height', $($("div.activeWindow")[0]).height() - 50 );
	$('.activeWindow').find(".rightArea").css('width', $($("div.activeWindow")[0]).width() ).css('width', '-=345px' );
	$('.activeWindow').find('.gridArea').jqGrid('setGridHeight', $($("div.activeWindow")[0]).height()-193);
	$('.activeWindow').find('.gridArea').jqGrid('setGridWidth', $($("div.activeWindow")[0]).width()-350);
	
	$(window).resize(function() {
		$('.activeWindow').find(".leftArea").css('height', $($("div.activeWindow")[0]).height() - 150 );
		$('.activeWindow').find(".tabArea").css('height', $($("div.activeWindow")[0]).height() - 220 );
		$('.activeWindow').find(".rightArea").css('height', $($("div.activeWindow")[0]).height() - 50 );
		$('.activeWindow').find(".rightArea").css('width', $($("div.activeWindow")[0]).width() ).css('width', '-=345px' );
		$('.activeWindow').find('.gridArea').jqGrid('setGridHeight', $($("div.activeWindow")[0]).height()-193);
		$('.activeWindow').find('.gridArea').jqGrid('setGridWidth', $($("div.activeWindow")[0]).width()-350);
	});
	
	$("#gridPager_left").width(200);

	// 내용 선택시 select 처리
	$("#frame_div").mousedown(function(){
		//windowSelectById( $("#wnd_id").val(), $("#opener_id").val() );
		//var this_wnd = window.parent.$.window.getWindow(  $("#wnd_id").val() );
		//window.parent.$.window.selectWindow( window.parent, this_wnd );
		windowSort( $("#wnd_id").val(), $("#opener_id").val() );
	});

	//엑셀출력 메세지를 원래대로 
	/*var fnOriSearch = fnSearch;
	fnSearch = (function () {
		$(".loading").html("검색 중입니다.");
		fnOriSearch.apply(this, arguments);
	});*/
}

//대장조회 화면용 초기화 설정 (팝업 화면 및 jqgrid)
function initViewScreen() {
	// 내용 선택시 select 처리
	$("#frame_div").mousedown(function(){
		//windowSelectById( $("#wnd_id").val(), $("#opener_id").val() );
		//var this_wnd = window.parent.$.window.getWindow(  $("#wnd_id").val() );
		//window.parent.$.window.selectWindow( window.parent, this_wnd );
		windowSort( $("#wnd_id").val(), $("#opener_id").val() );
	});
	
	// *MU.do 타입인 경우, 일괄 처리 화면으로 인식하여 체크박스 생성 20140911
	if( $(location).attr('pathname').indexOf("MU.do")>0 ) {
		// 업데이트 항목 선택용 체크 박스 생성
		try {
			cfCreateUpdateCheckbox("frm");
		} catch(E) {}
	}
}

// 전체 윈도우 정렬 처리
function windowSort( wnd_id, opener_id ) {
	/*var wnd = window.parent.$.window.getWindow( wnd_id );
	var opener_wnd = window.parent.$.window.getWindow( opener_id );
	
	var wnd_all = window.parent.$.window.getAll();
	for( var i=0, len=wnd_all.length; i<len; i++ ) {
		try {
			if( opener_wnd!=wnd_all[i] && wnd!=wnd_all[i] )
				wnd_all[i].setzindex(2000);
		} catch(subE){}
	}
	
	if( opener_wnd!=null)
		opener_wnd.setzindex(2002);
	if( wnd!=null )
		wnd.getContainer().mousedown();*/
	// 대장 popup을 jdesktop으로 변경시, 두번 클릭해야 element들이 선택되기 때문에 아래 주석처리함. - ehyun
	/*var this_wnd = window.parent.$.window.getWindow(  $("#wnd_id").val() );
	
	if(this_wnd) {
		this_wnd.getContainer().mousedown();
	}*/
}