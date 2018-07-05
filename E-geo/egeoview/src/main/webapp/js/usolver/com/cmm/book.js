/**
 * 시스템 환경 설정 

 * @namespace {Object} USV.BOOK 
 */
	
USV.BOOK = (function(_mod_book, $, undefined){

	/**
	* @memberof USV.BOOK
	* @method 
	* @description 객체가 속해 있는 클래스 목록 가져오기
	* @author 김수예
	* @param {String} _sFormId 선택된 form의 ID
	*/
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
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 폼 내의 모든 객체에 대한 변경 처리
	 * @author 김수예(2016.04.01)
	 * @param {String} _sFormId 선택된 form의 ID
	 */
	fn_open_leftSearch = function() {
		$('div.activeWindow').find('#leftCloseBt').removeClass('hidden');
		$('div.activeWindow').find('#leftOpenBt').addClass('hidden');
		$('div.activeWindow').find("#content_b").css("left", "258px");
		$('div.activeWindow').find('#left').css("width", "283px");
		$('div.activeWindow').find('.leftCont').css("width", "258px");
		fn_init_main();		

	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 폼 내의 모든 객체에 대한 변경 처리
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */
	fn_close_leftSearch = function() {
		$('div.activeWindow').find('#leftCloseBt').addClass('hidden');
		$('div.activeWindow').find('#leftOpenBt').removeClass('hidden');
		$('div.activeWindow').find("#content_b").css("left", "0px");
		$('div.activeWindow').find('#left').css("width", "25px");
		$('div.activeWindow').find('.leftCont').css("width", "0px");
		fn_init_main();		
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 폼 내의 모든 객체에 대한 변경 처리
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */
	fn_init_formObject = function(_sFormId) {
		
		//window Id를 가져오는 경우와.. frm id를 가져오는 두가지 경우가 발생함.. ㅠㅠ 
		//window Id를 가져와서 처리해도..잘 안먹네.. 우짤까나... ㅠㅠ
		if( _sFormId.indexOf('frm') != -1){
			_sFormId = "#"+_sFormId;
		}else {
			_sFormId = "#win_"+_sFormId;
		}
		
/*		$(_sFormId).find(".SPINNER").each(function(){
			$(_sFormId).find($(this)).spinner();
			$(_sFormId).find($(this)).val(new Date().getFullYear());
		});*/

		 $(_sFormId).find("input[type='text'],  select,  textarea").each(function(i){
			 		 
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
		 		
		$(_sFormId).find("input[type='text']:enabled").first().focus();
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 검색 화면용 초기화 설정 (팝업 화면 및 jqgrid)
	 * @author 김수예(2016.04.01)
	 * @param 
	 */
	fn_init_main = function() {
		
		$('.activeWindow').find(".TableBx").css('height', $($("div.activeWindow")[0]).height() - 120 );
		$('.activeWindow').find(".Table_list").css('height', $($("div.activeWindow")[0]).height() - 120 );
		
		$('div.activeWindow').find('#gridArea').jqGrid('setGridHeight', $('div.activeWindow').find(".Table_list").height()-60);
		$('div.activeWindow').find('#gridArea').jqGrid('setGridWidth', $('div.activeWindow').find(".Table_list").width()-8);
		
		$('div.activeWindow').find('#gridStatisctic').jqGrid('setGridHeight', $('div.activeWindow').find(".Table_list").height()-60);
		$('div.activeWindow').find('#gridStatisctic').jqGrid('setGridWidth', $('div.activeWindow').find(".Table_list").width()-8);

		$(window).resize(function() {
			
			$('.activeWindow').find(".TableBx").css('height', $($("div.activeWindow")[0]).height() - 120 );
			$('.activeWindow').find(".Table_list").css('height', $($("div.activeWindow")[0]).height() - 120 );
			
			$('div.activeWindow').find('#gridArea').jqGrid('setGridHeight', $('div.activeWindow').find(".Table_list").height()-60);
			$('div.activeWindow').find('#gridArea').jqGrid('setGridWidth', $('div.activeWindow').find(".Table_list").width()-8);
			
			$('div.activeWindow').find('#gridStatisctic').jqGrid('setGridHeight', $('div.activeWindow').find(".Table_list").height()-60);
			$('div.activeWindow').find('#gridStatisctic').jqGrid('setGridWidth', $('div.activeWindow').find(".Table_list").width()-8);
				
		});	
	}
	
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 상세조회 팝업 창 사이즈 조정
	 * @author 김수예(2016.04.01)
	 * @param 
	 */
	fn_init_popup = function() {
		
		var realHeight = $($("div.activeWindow")[0]).height();
		$('.activeWindow').css('height', realHeight - 60 );
		$('.activeWindow').find('.contentarea').css('height', realHeight - 95 );
			
	}
	
	/**
	 * @memberof USV.BOOK
	* @method 
	* @description 뷰 모드 활성화된 창에서만 처리
	* @author 김수예(2016.04.01)
	* @param 
	*/
	fn_view_mode =function(_sWinId){
		
		fn_form_readonly(true);
		
		if( _sWinId != undefined && _sWinId != ''){
			$('#win_'+_sWinId).find("#screen_mode").val('view');	// 화면 상태 뷰 모드
			$('#win_'+_sWinId).find(".btnClassEdit").hide();
			$('#win_'+_sWinId).find(".btnClassView").show();
		}else {
			$('div.activeWindow').find("#screen_mode").val('view');	// 화면 상태 뷰 모드
			$('div.activeWindow').find(".btnClassEdit").hide();
			$('div.activeWindow').find(".btnClassView").show();			
		}
	
	}
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description 수정 모드  : 활성화된 창에서만 처리
	* @author 김수예(2016.04.01)
	* @param _sWinId  윈도우 아이디
	*/
	fn_edit_mode = function(_sWinId) {
		fn_form_readonly(false);
		
		if( _sWinId != undefined ){

			$('#win_'+_sWinId).find("#screen_mode").val('edit');	// 화면 상태 에디터 모드
			
			$('#win_'+_sWinId).find(".btnClassEdit").show();
			$('#win_'+_sWinId).find(".btnClassView").hide();

			//BOOK.fn_sort_select("New");
			// 셀렉트 박스의 값이 없는 경우는 첫번째 값으로 세팅
			/*$('#win_'+_sWinId).find("select").each( function(){
				if ($('#win_'+_sWinId).find($(this)).val() == '')
					$('#win_'+_sWinId).find($(this)).get(0).selectedIndex = 1;
			});*/
		}else {
			$('div.activeWindow').find("#screen_mode").val('edit');	// 화면 상태 에디터 모드
			
			$('div.activeWindow').find(".btnClassEdit").show();
			$('div.activeWindow').find(".btnClassView").hide();

			// 셀렉트 박스의 값이 없는 경우는 첫번째 값으로 세팅
			/*$('div.activeWindow').find("select").each( function(){
				if ($('div.activeWindow').find($(this)).val() == '')
					$('div.activeWindow').find($(this)).get(0).selectedIndex = 1;
			});*/
		}
		//BOOK.fn_sort_select();
		// 포커스 IN
		//$("#"+frm).find("input[type='text']:enabled").first().focus();
	}
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description screen_mode 값을 리턴해 준다. 
	* @author 김수예(2016.04.01)
	* @param 
	*/
	fn_get_screenMode = function() {
		try {
			return $('.activeWindow').find("#screen_mode").val();
		} catch(E) {
			return '';
		}
	}
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description ReadOnly 처리
	* @author 김수예(2016.04.01)
	* @param {boolean} _bCheck  true/false  여부
	*/
	 fn_form_readonly = function(_bCheck) {
		
		var sFormId = $('.activeWindow').find('form').attr('id');	
		//fn_init_formObject(sFormId);	
	
		$('.activeWindow').find("input[type='text'], input[type='password'], input[type='checkbox'], input[type='radio'], select,textarea").attr("disabled", _bCheck);
		if( _bCheck )
			$('.activeWindow').find(".ui-datepicker-trigger").hide();
		else
			$('.activeWindow').find(".ui-datepicker-trigger").show();
	}		 
	 
	/**
	* @memberof USV.BOOK
	 * @method 
	 * @description 달력 생성용
	 * @author 김수예(2016.04.01)
	 * @param {String} _sFormId 선택된 form의 ID
	 * @param {String} _sStartDtId 	시작날짜가 지정된 input ID
	 * @param {String} _sEndDtId 	종료날짜가 지정된 input ID
	 * @param {number} _nSize	날짜의 SIZE
	 */ 
	fn_create_datepickerLinked = function(_sFormId, _sStartDtId, _sEndDtId, _nSize) {

		$('#'+_sFormId).find("input[id='"+_sStartDtId+"']").datepicker({
			changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/book/p_btn_calendar.gif",buttonImageOnly: true,dateFormat: "yy-mm-dd",
			onClose: function( selectedDate ) {
				$('#'+_sFormId).find("input[id='"+_sEndDtId+"']").datepicker( "option", "minDate", selectedDate );
			}
	    }).keyup(function(e) {
	        if(e.keyCode == 8 || e.keyCode == 46) {
	            $.datepicker._clearDate(this);
	            $('#'+_sFormId).find("input[id='"+_sEndDtId+"']").datepicker( "option", "minDate", "" );
	        }
	    });
		$('#'+_sFormId).find("input[id='"+_sEndDtId+"']").datepicker({
			changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/book/p_btn_calendar.gif",buttonImageOnly: true,dateFormat: "yy-mm-dd",
			onClose: function( selectedDate ) {
				$('#'+_sFormId).find("input[id='"+_sStartDtId+"']").datepicker( "option", "maxDate", selectedDate );
			}
	    }).keyup(function(e) {
	        if(e.keyCode == 8 || e.keyCode == 46) {
	            $.datepicker._clearDate(this);
	            $('#'+_sFormId).find("input[id='"+_sStartDtId+"']").datepicker( "option", "maxDate", "" );
	        }
	    });
		
		fn_click_datepicker(_sFormId, _sStartDtId);
		fn_click_datepicker(_sFormId, _sEndDtId);	
		
	}
	
	/**
	* @memberof USV.BOOK
	 * @method 
	 * @description 달력 생성용
	 * @author 김수예(2016.04.01)
	 * @param {String} _sFormId 선택된 form의 ID
	 * @param {String} _sDtId 	선택된 날짜가 지정된 input ID
	 * @param {number} _nSize	날짜의 SIZE
	 */ 
	fn_create_datepicker = function(_sFormId, _sDtId, _nSize) {
		$('#'+_sFormId).find("input[id='"+_sDtId+"']").width(_nSize*8).datepicker({
			changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/book/p_btn_calendar.gif",buttonImageOnly: true,dateFormat: "yy-mm-dd"
	  });
		
		fn_click_datepicker(_sFormId,_sDtId);
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description datepicker 필드 클릭시 달력 확성화
	 * @author 김수예(2016.04.01)
	 * @param {String} _sFormId 선택된 form의 ID
	 * @param {String} _sDtId 	선택된 날짜가 지정된 input ID
	 */ 
	fn_click_datepicker = function(_sFormId,_sDtId) {
		$('#'+_sFormId).find("input[id='"+_sDtId+"']").click(function(){
			$('#'+_sFormId).find("input[id='"+_sDtId+"']").each(function(){
				$('#'+_sFormId).find($(this)).datepicker("show");
			});
		});
		$('#'+_sFormId).find("input[id='"+_sDtId+"']").each(function(){
			$('#'+_sFormId).find($(this)).datepicker();
		});
	}
	
	 /**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 폼 리셋 : 초기화
	 * @author 김수예(2016.04.01)
	 * @param 
	 */
	fn_reset_form = function(_sAction){
		var sFormId =  $('.activeWindow').find('form').attr('id');
		var sName;
		
		$("#"+sFormId).each(function() {
			this.reset();
		});
		
		if(_sAction == "cancel"){	// 편집, 취소 시 날짜 데이터 세팅 - Yu_mk
			for(var i=0; i<$('.activeWindow input.hasDatepicker').length; i++){
				
				if(($('.activeWindow input.hasDatepicker').eq(i)[0].id).substring(0,1) == '@') 
					sName = "DATE_"+($('.activeWindow input.hasDatepicker').eq(0)[0].id).substring(1,4);
				else 
					sName = "DATE_"+($('.activeWindow input.hasDatepicker').eq(i)[0].id).substring(0,3);
				
				 $($('.activeWindow input.hasDatepicker').eq(i)[0]).val($('#'+sName).val());
			}
			
		}else{
			//검색 초기화시 min, max 초기화 안되서 추가
			$('input.hasDatepicker').each(function(){
				$.datepicker._clearDate(this);
				$(this).datepicker( "option", "maxDate", "" );
				$(this).datepicker( "option", "minDate", "" );
			});
		}
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 목록화면에서 대장 조회
	 * @author 김수예(2016.04.01)
	 * @param 
	 */
	fn_search_mainGrid = function(_sAuthor){
		
		if( _sAuthor == null )	_sAuthor = true;
		if( !_sAuthor ){ 
			alert("권한이없습니다.");
			return false;
		}
		
		var sFormId = $('.activeWindow').find('form').attr('id');		

		$('.activeWindow').find('#gridArea').jqGrid("setGridParam",{
			datatype: "xml"
			,page: 1
			,postData: fn_get_serialize("frm_mst")
			,mtype: "POST"
		}).trigger("reloadGrid"); 

		fn_close_leftSearch();	
	}
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 상세에서 편집 저장 후 목록화면 재검색 처리 
	 * @author 김수예(2016.04.01)
	 * @param 
	 */
	fn_search_openerGrid = function(_sGridId, _sFormId){

		if( _sFormId === undefined){
			_sFormId = $('.activeWindow').find('form').attr('id');		
		}

		$("#"+_sGridId).jqGrid("setGridParam", {
			datatype: "xml"
			,page: 1
			,postData: fn_get_serialize(_sFormId) //$("#frm_mst").cfSerializeObject()	//$('.activeWindow').find("#frm_"+winId).serialize()
			,mtype: "POST"
		}).trigger("reloadGrid"); 		
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 상세에서 시설물 내용 수정
	 * @author 김수예(2016.04.01)
	 * @param 
	 */
	  function fn_save_register(_sType) {
		  
		  var _sFormId = $('.activeWindow').find('form').attr('id');		

		  if( _sFormId.length < 1 ){
				alert("저장할 환경이 올바르지 않습니다. 관리자에게 문의하시기 바랍니다.");
				return;
		  }
		  
		  if( _sType === 'BATCHUP' ){
			  
			  if (confirm('시설물의 내용을 일괄수정하시겠습니까?')) {
					try {
						BOOK.fn_get_form(_sFormId, "proc_frm","/register/registerMUProcWrite.do","BOOK.fn_save_registerBatch_callback").submit();
					} catch (E) {
						alert('폼데이터 변환중 오류가 발생하였습니다. :'+ E);
					}
				}
			  	  
		  }else if( _sType === 'INSERT'){
			  
			  if (confirm('시설물의 내용을 등록하시겠습니까?')) {
					try {
						BOOK.fn_submit_createForm(_sFormId, "proc_frm","/register/registerProcWrite.do","BOOK.fn_save_register_callback");
					} catch (E) {
						alert('폼데이터 변환중 오류가 발생하였습니다. :'+ E);
					}
				}  		
			  
		  }else{
			  
			  if (confirm('시설물의 내용을 수정하시겠습니까?')) {
					try {
						BOOK.fn_submit_createForm(_sFormId, "proc_frm","/register/registerProcWrite.do","BOOK.fn_save_register_callback");
					} catch (E) {
						alert('폼데이터 변환중 오류가 발생하였습니다. :'+ E);
					}
				}  	
		  }
	 }
	  
	  /**
	   	 * @memberof USV.BOOK
		 * @method 
		 * @description 상세에서 시설물 내용 수정 후 처리
		 * @author 김수예(2016.04.01)
		 * @param 
		 */
	  function fn_save_register_callback(_sG2ID) {		
		try {
			/* 부모창의 그리드를 reolad 해준다.*/	
			if (typeof BOOK.fn_search_openerGrid === "function") BOOK.fn_search_openerGrid('gridArea','frm_mst');
			
			var	 oOrgWindow = nJDSK.WindowList.get_window($('.activeWindow').find('#nJDSKSubId').val());
			
			if( typeof(_sG2ID) === "undefined" || _sG2ID === "")	_sG2ID = $('.activeWindow').find("#FID").attr('value');
			
			var sTableName = $('.activeWindow').find("#TABLENAME").attr('value');
			var sUrl = '/register/registerCRU.do?TABLENAME='+sTableName+'&FID='+_sG2ID;
			
			//alert(sUrl);
			if( _sG2ID === null ||  _sG2ID === ""){
				alert("대장의 상세내용을 조회할 수 없습니다. 다시 선택해 주시기 바랍니다.");
			}else {
				REGISTER.fn_view_register('',sTableName,'UPDATE',sUrl);  // 대장 조회
			}
			
		} catch (E) {alert(E);}
	}		
	
		/**
	   	 * @memberof USV.BOOK
		 * @method 
		 * @description 시설물 대장 일괄 수정 
		 * @author 김수예(2016.04.01)
		 * @param 
		 */
		  function fn_save_registerBatch(_sTableName){
			  
				if (confirm('시설물의 내용을 저장/수정하시겠습니까?')) {
					try {
						if(_sTableName != undefined) BOOK.fn_get_form('frm_detail', "proc_frm","/book/bookProcWrite.do","BOOK.fn_save_registerBatch_callback").submit();
						else BOOK.fn_get_form('frm_detail', "proc_frm","/register/registerMUProcWrite.do","BOOK.fn_save_registerBatch_callback").submit();
					} catch (E) {
						alert('폼데이터 변환중 오류가 발생하였습니다. :'+ E);
					}
				}
		}
		  
		/**
	   	 * @memberof USV.BOOK
		 * @method 
		 * @description 시설물 대장 일괄 수정 후 호출 함수
		 * @author 김수예(2016.04.01)
		 * @param 
		 */
		  function fn_save_registerBatch_callback() {		
				try {
					
					var sOpenerId = frm_mst.nJDSKMasterId.value;		
	
					//부모창에 있는 그리드 호출. 
					if (typeof fn_search_openerGrid == "function") fn_search_openerGrid('gridArea','frm_mst');
				 	//내창 닫기
					BOOK.fn_close_window(sOpenerId);	
							
				} catch (E) {
					alert(E);
				}
	
		}		   
			  	
	/*******************************************************************  공통으로 부가정보 새로 만들고 있음... *****************************************************************/
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 테이블명을 카멜 표기법으로 변경.. 
	 * @author 김수예(2016.04.01)
	 * @param 
	 */ 
	function camelCase(str) {
		return str.toLowerCase().replace(/(\_[a-z])/g, function(arg){
	        return arg.toUpperCase().replace('_','');
	    });
	}
	
	fn_get_gridAddInfo = function(_sTableName,_sFtrCde){
		
		var sGridName =  camelCase("grid_"+_sTableName)+$('.activeWindow').find('#nJDSKSubId').val();			
		var sType = "UPDATE";
		if( _sFtrCde != "" ) sType = "ADD_UPDATE";
		
		//var sUserId = "USER100001";	// 추후 user_id 가져오기
		data = {tableName : _sTableName};
		$.ajax({
			type: 'get',
			dataType: 'json',
			data: data,
			url: '/book/AddInfoList.do',
			success: function(data) {
				
				var sColNames = [],
				sColModel = [],
				sColMap = [],
				sColModels = [];
				var sUrl;
				
				var newWith, count;
				count = data["addList"].length;
				if(count<5) count=10;
				
				newWith = $(".Table_list .ui-widget-content").width()/count;
				
				for(var i=0; i<data["addList"].length; i++){
					var sList, sListAlias;

					sList = data["addList"][i].g2Name;
					sListAlias = data["addList"][i].g2Alias;
				
					var sStrList, sXmlMap;

					sColNames[i] = sListAlias;
					if(sList.substring(3) == "Cde" || sList.substring(3) == "Mop" || sList.substring(3) == "Mof" || sList.substring(3) == "Chk") sColModel[i] = sList+"Nm";
					else sColModel[i] = sList;
					
					var sWdith = "80px";
					if( sListAlias.length > 6 )  sWdith = (sListAlias.length*14)+"px";					
					if( sList.indexOf("Des") != -1 || sList.indexOf("Exp") != -1)  sWdith = "200px";				
					
					if( sList == "ftrCde"  ||  sList == "ftrIdn"  ){
						sColModels[i] = {name:sColModel[i],index:sList,xmlmap:sColModel[i], width:sWdith, align:'center', hidden: true};
					}else if(  sList == "cntNum" &&  _sTableName.indexOf("RD") == -1){
						sColModels[i] = {name:sColModel[i],index:sList,xmlmap:sColModel[i], width:sWdith, align:'center', hidden: true};
					}else {
						sColModels[i] = {name:sColModel[i],index:sList,xmlmap:sColModel[i], width:sWdith, align:'center'};
					}
				}
				
				sColNames.push("g2Id");
				sColModels.push({name:'g2Id',index:'g2Id',xmlmap:'g2Id', hidden: true});
				sUrl = "/book/AddInfoSearch.do";					
				
				//jQuery("#"+sGridName).GridUnload();  스크립트 에러발생
				
				$('.activeWindow').find("#"+sGridName).jqGrid({
					url: sUrl
					,datatype: "local"
					,colNames:sColNames
				   	,colModel:sColModels
					,sortname: 'FID'
				    ,sortorder: "DESC"
				    ,rowNum: 10
					,rowList: [10,50,100]
					,viewrecords: true
					,xmlReader: { root : "rows",row: "Item",repeatitems: false }
					,rownumbers: false
				    ,loadtext: "검색 중입니다."
					,emptyrecords: "<div class='Paging_tx'>검색된 데이터가 없습니다.</div>"
					,recordtext: "<div class='Paging_tx'>총 <span> {2}</span>건 데이터 ({0}-{1})</div>"
					,ondblClickRow: function(rowId) {	// 더블클릭 처리				
						if( BOOK.fn_get_screenMode()!='edit' ){	// 메인 데이터가 뷰 상태일때만 서브 Grid 수정 가능							
							BOOK.fn_open_gridAddInfo(_sTableName,sType); // 수정창 팝업
						}else {
							alert("일반사항이 편집 중입니다. 편집 완료후 실행해 주시기바랍니다.");
						}
					}
				   	,loadComplete: function() { $("option[value=100000000]").text("ALL"); }
					,shrinkToFit : false
					,height: 140
					,width: 653
				}).navGrid('#gridPager',{edit:false,add:false,del:false,search:false,refresh:false}); 
				
				BOOK.fn_search_gridAddInfo(_sTableName,_sFtrCde);
			},
			error: function(xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
	}
	
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 부가정보 그리드 조회 공통함수 
	 * @author 김수예(2016.04.01)
	 * @param 
	 */ 	
	fn_search_gridAddInfo = function(_sTableName,_sFtrCde){
		
		var sGridName = camelCase("grid_"+_sTableName)+$('.activeWindow').find('#nJDSKSubId').val();						
		
		if( typeof _sFtrCde === "undefined" || _sFtrCde === "") _sFtrCde =$('.activeWindow').find('#FTR_CDE').val();				
		
		data = {	TABLENAME : _sTableName,
					FTR_CDE : _sFtrCde,					
					SEC_IDN : $('.activeWindow').find('#SEC_IDN').val(),
					FTR_IDN : $('.activeWindow').find('#FTR_IDN').val(),
					RUT_IDN : $('.activeWindow').find('#RUT_IDN').val(),
					PMS_IDN : $('.activeWindow').find('#PMS_IDN').val(),
					AGA_NUM : $('.activeWindow').find('#AGA_NUM').val(),
					CNT_NUM : $('.activeWindow').find('#CNT_NUM').val(),
					JYP_CDE : $('.activeWindow').find('#JYP_CDE').val()
				 };
		
		$.ajax({
			type: 'get',
			dataType: 'json',
			data: data,
			url: '/book/AddInfoSearch.do',
			success: function(data) {		
				$("#"+sGridName).clearGridData();  //그리드 삭제후 갯수가 안맞아.. 다시 그리도록.. 
				$("#"+sGridName).jqGrid("setGridParam",{
					datatype: "local"
						,page: 1
						,data: data.resultList
				}).trigger("reloadGrid");
			}
		});
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 부가정보 추가/수정 버튼 클릭시 부가정보 입력/수정창 생성
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */ 
	fn_open_gridAddInfo = function(_sTableName, _sType){
		
		var sGridName = camelCase("grid_"+_sTableName)+$('.activeWindow').find('#nJDSKSubId').val();						
		var sUrl = "TABLENAME="+_sTableName+"&openerId="+$('.activeWindow').find('#nJDSKSubId').val();
		var sFilter = false;
		
		if( BOOK.fn_get_screenMode() == 'edit' ){	// 메인 데이터가 뷰 상태일때만 서브 Grid 수정 가능							
			alert("일반사항이 편집 중입니다. 편집 완료후 실행해 주시기바랍니다.");
			return false;
		}
		
		if(_sTableName.substring(4,8) == "IMGE") sFilter = true;	// 도면/사진 일 경우
		
		if(sFilter){
			sUrl = "/book/IMGE_ETCRU.do?" + sUrl;
			sGridName = "gridImge";
		}
		else
			sUrl = "/book/AddInfoCRU.do?" + sUrl;
		
		if( _sType === "UPDATE" ||  _sType === "ADD_UPDATE"){
			
			var sRowId = $('.activeWindow').find("#" +sGridName).getGridParam("selrow");
			if (sRowId != null) {
				var sRowData = $('.activeWindow').find("#"+sGridName).getRowData(sRowId);				
				
				if(sFilter) sUrl = sUrl +"&IMG_IDN=" + sRowData['IMG_IDN'];
				else sUrl = sUrl +"&FID=" + sRowData['g2Id'];								
				
				if( _sType === "ADD_UPDATE"){
					if(_sTableName === "RDL_EXCV_AS") sUrl = sUrl +"&PMS_IDN="+$('.activeWindow').find('#PMS_IDN').val();
					else sUrl = sUrl +"&SEC_IDN="+$('.activeWindow').find('#SEC_IDN').val();
				}
				
			}else {
				alert("수정할 항목이 선택되지 않았습니다.");
				return;
			}	
			
		}else {
			
			var sFtrCde = $('.activeWindow').find('#FTR_CDE').val();
			var sFtrIdn = $('.activeWindow').find('#FTR_IDN').val();
			var sSecIdn = $('.activeWindow').find('#SEC_IDN').val();
			var sPmsIdn = $('.activeWindow').find('#PMS_IDN').val();
			var sCntNum = $('.activeWindow').find('#CNT_NUM').val();
	
			if( $.trim(sFtrCde) !== 'undefined' && $.trim(sFtrCde) !== ''){
				sUrl = sUrl +"&FTR_CDE="+$('.activeWindow').find('#FTR_CDE').val();
			}
			
			if( $.trim(sFtrIdn) !== 'undefined' && $.trim(sFtrIdn) !== ''){
				sUrl = sUrl +"&FTR_IDN="+$('.activeWindow').find('#FTR_IDN').val();
			}
			
			if( $.trim(sSecIdn) !== 'undefined' && $.trim(sSecIdn) !== ''){
				sUrl = sUrl +"&SEC_IDN="+$('.activeWindow').find('#SEC_IDN').val();
			}
			
			if( $.trim(sPmsIdn) !== 'undefined' && $.trim(sPmsIdn) !== ''){
				sUrl = sUrl +"&PMS_IDN="+$('.activeWindow').find('#PMS_IDN').val();
			}
			
			if( $.trim(sCntNum) !== 'undefined' && $.trim(sCntNum) !== ''){
				sUrl = sUrl +"&CNT_NUM="+$('.activeWindow').find('#CNT_NUM').val();
			}
			
			if( typeof($('.activeWindow').find('#RUT_IDN').val()) !== "undefined" ){
				sUrl = sUrl +"&RUT_IDN="+$('.activeWindow').find('#RUT_IDN').val();
			}
			
		}
		
		if( typeof _sType !== "undefined" && _sType !== "" ){
			sUrl = sUrl +"&action_flag="+_sType;
		}
		
		var oMenuInfo = REGISTER.fn_get_menuInfo(_sTableName);		
		
		//alert( sUrl );		
		//메뉴에 대한 것만 menuInfo에 들어옴.. 유지보수등등은 어떻게 할까요? 
		if( typeof oMenuInfo  !== "undefined" ){
			
			var oWinInfo = jQuery.parseJSON(oMenuInfo);			
			BOOK.fn_open_dialog(oWinInfo.title,sUrl,  oWinInfo.width,  oWinInfo.instHeight);
			
		}else {
			BOOK.fn_open_dialog(sTitle, sUrl, 600, 350);
		}
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 부가정보 추가/수정 버튼 클릭시 부가정보 입력/수정창 생성
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */ 
	fn_insert_gridAddInfo = function(_sTableName,_sFtrCde){
				
		if (confirm('저장하시겠습니까?')) {
			
			var _sFormId = $('.activeWindow').find('form').attr('id');		
			//alert( _sFormId );			
			
			var jsonData = JSON.stringify(BOOK.fn_get_serialize(_sFormId));
			jQuery.ajaxSettings.traditional = true;
			
			//var _sOpenerId = jsonData.get("openerId");
			//alert( _sOpenerId );			
			var _sOpenerId = $('.activeWindow').find('#openerId').attr('value');		
			// alert( _sOpenerId );			
				
			$.ajax({
				type: 'get',
				dataType: 'json',
				data: {"jsonData":jsonData, TABLENAME : _sTableName},
				url: '/book/AddInfoProcWrite.do',
				success: function(json) {
					alert(json.resultMsg);
					BOOK.fn_close_window(_sOpenerId);
					BOOK.fn_search_gridAddInfo(_sTableName,_sFtrCde);
				},
				error: function(error) {
					alert(error.errorMsg);
				}
			});
		}
	
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 부가정보 삭제 버튼 클릭시 발생
	 * @author 김수예(2016.04.01)
	* @param {String} _sGridId 선택된 그리드의 ID
	 */ 
	fn_delete_gridAddInfo	= 	function(_sTableName,_sFtrCde) {
		
		var sGridName = camelCase("grid_"+_sTableName)+$('.activeWindow').find('#nJDSKSubId').val();			
		
		//var oGridInfo = jQuery.parseJSON(fn_get_gridInfo(_sGridId));
		var sRowId = $('.activeWindow').find("#"+sGridName).getGridParam("selrow");
		var selectG2Id;
		
		if (sRowId != null) {
			var sRowData = $('.activeWindow').find("#"+sGridName).getRowData(sRowId);			
			selectG2Id = sRowData['g2Id'];			
			
			if (confirm('해당정보를 삭제하시겠습니까?')) {

					$.ajax({
						type: 'get',
						dataType: 'json',
						data: {TABLENAME:_sTableName, FID : selectG2Id},
						url: "/book/AddInfoProcDelete.do",
						success: function(json) {
							alert(json.resultMsg);
							BOOK.fn_search_gridAddInfo(_sTableName,_sFtrCde);
						},
						error: function(error) {
							alert(error.errorMsg);
						}
					});				
			}
			
		} else
			alert('삭제할 정보가 선택되지 않았습니다.');
	}
	
	/*******************************************************************  공통으로 부가정보 새로 만들고 있음.. 끝. *****************************************************************/
		
	/**
	* @memberof USV.BOOK
	* @method 
	* @description 해당 폼내부 파라메터 값을 배열로 추출
	* @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	*/
	fn_get_serialize = function(_sFormId){
	    var o = {};
	    var nm = "";
	    var val = "";
	    $('#'+_sFormId).find("input[type='hidden'], input[type='text'], input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea,.SPINNER").each( function(){
			nm = $('#'+_sFormId).find($(this)).attr('id');
			// mask 처리 된 경우, cleanVal 함수를 통해 마스크 제거된 값을 가져오게 처리
			try {
				val = $('#'+_sFormId).find($(this)).cleanVal();
			}catch(E){
				val = $('#'+_sFormId).find($(this)).val();
			}
			
			// class 값으로 int, float, doublt 인 경우, 콤마 제거
			var cs = $('#'+_sFormId).find($(this)).getClasses();
			if( cs.indexOf("DT_INT")!=-1 || cs.indexOf("DT_DOUBLE")!=-1 || cs.indexOf("DT_FLOAT")!=-1 ) {
				val = val.replace(/[^0-9\.\-]/g,'');
			}
	
			 if (o[nm] !== undefined) {
	            if (!o[nm].push) {
	                o[nm] = [o[nm]];
	            }
	            o[nm].push(val || '');
	        } else {
	            o[nm] =val || '';
	        }
		});
	    
		return o;
	};
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description 마스크 혹은 기타 처리가 된 값을 필터링 하여 순수 데이터만 뽑은 폼을 생성 : 활성화 창에서 입수삭하는 경우.. 
	* @author 김수예(2016.04.01)
	* @param {String} _sFormId 데이터가지고 있는 폼아이디
	* @param {String} _sTargetIframe 데이터가지고 있는 폼아이디
	* @param {String} _sAction 처리한 action
	* @param {String} _sCallback 처리후 돌아올 함수명
	*/
	fn_submit_createForm = function(_sFormId, _sTargetIframe, _sAction, _sCallback) {
		
		//나중에 _sFormId 제거...  근디.. jdesktop 쓰지 않으면.. 필요할지도... 아님. formid 찾아서 해도되지 머.. 
		// 
		// *MU.do 타입인 경우, 수정대상 체크박스의 체크 확인 20140911
		if( $(location).attr('pathname').indexOf("MU.do") != -1 ) {
			if( $( "input[id^='MU_CK_']" ).length>0 && $( "input[id^='MU_CK_']:checked" ).length<=0 ) {
				COMMON.showMessage("등록 대상(체크박스)을 선택하십시오." );
				return;
			}
		}
		
		//alert(_sFormId +" || "+ _sTargetIframe +" || "+ _sAction +" || "+ _sCallback );
		$('.activeWindow').find("#callBackFunction").val(_sCallback);	// 처리후 복귀 함수
		
		var uniq_id = fn_get_randomId(10);
		var $iframe = fn_get_iframeBody($("#"+_sTargetIframe)[0]);
		var $form = $("<form/>").attr( "action", _sAction ).attr( "id", uniq_id ).attr("method", "post");
		
		try {
			var input_type = "";
			var input_val = "";
			var $ctrl = "";
	
			$iframe.append( $form );
		
			$('.activeWindow').find("input[type='hidden'], input[type='text'],input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea").each( function(){
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
					}else if( cs.indexOf("DT_DATE")!=-1 ) input_val = input_val.replace(/-/g,'');

					if ($(this).get(0).tagName == "TEXTAREA"){
						$ctrl = $('<TEXTAREA/>').attr('name',$(this).attr("name")).text(input_val);
					} else {
						$ctrl = $('<input/>').attr({ type: 'text', name:$(this).attr("name"), value: input_val });
					}
					
					$iframe.find("#"+uniq_id).append($ctrl);
				}
			});
		} catch(E) {}
		
		//alert($iframe.html());		

		try {
			$iframe.find("#"+uniq_id).submit();
		} catch(E) {alert(E);}
	
	}
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description  MULTIPART 폼인 경우
	* @author 김수예(2016.04.01)
	* @param {String} _sFormId 데이터가지고 있는 폼아이디
	* @param {String} _sTargetIframe 데이터가지고 있는 폼아이디
	* @param {String} _sAction 처리한 action
	* @param {String} _sCallback 처리후 돌아올 함수명
	*/
	fn_submit_fileForm =function(_sFormId) {		
		var o = {};
	    var nm = "";
	    var val = "";
	    
		//$('.activeWindow').find("input[type='text'],input[type='password']").each( function(){
	    $('#'+_sFormId).find("input[type='hidden'], input[type='text'], input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea,.SPINNER").each( function(){
			nm = $('#'+_sFormId).find($(this)).attr("name");

			try {
				val = $('#'+_sFormId).find($(this)).cleanVal();
			}catch(E){
				val = $('#'+_sFormId).find($(this)).val();
			}

			if (o[nm] !== undefined) {
	            if (!o[nm].push) {
	                o[nm] = [o[nm]];
	            }
	            o[nm].push(val || '');
	        } else {
	            o[nm] =val || '';
	        }
		});
		return o;
	}
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description SUBMIT 처리 공통함수  : Dialog 창에서 Submit 하는 경우와 삭제를 하는 경우에는 이걸 사용하자.. 
	* @author 김수예(2016.04.01)
	* @param {String} _sFormId 데이터가지고 있는 폼아이디
	* @param {String} _sTargetIframe 데이터가지고 있는 폼아이디
	* @param {String} _sAction 처리한 action
	* @param {String} _sCallback 처리후 돌아올 함수명
	*/
	fn_get_form = function(_sFormId, _sTargetIframe, _sAction, _sCallback){
			
		// $("#"+_sFormId)  =>>  $('.activeWindow').  jdesktop 환경이라 이렇게 수정... 흠흠.. intro에서는 안 먹는다... 우띠.. 
		// 호출 주소 뒤에 ? 다음 파라메터가 있는 경우, 별도의 폼을 만들어 해당 파라메터만 전송
			
			if( _sAction.indexOf('=') != -1 && _sAction.indexOf("TABLENAME") != -1  ) {
				// 기존에 temp_send_frm 이 존재한다면 삭제한다.
				// 기존에 temp_send_frm 이 계속해서 body 에 추가되기때문에
				// FID 가 여러건 생기는 문제가 발생하여
				// 정상적으로 FID를 가져오지 못해 삭제할때 문제가 발생한다.
				if($("#temp_send_frm").length > 0) {
					$("#temp_send_frm").remove();
				}
				
				var $form = $("<form id='temp_send_frm' name='temp_send_frm' />").attr( "action", _sAction ).attr("method", "post").attr("target",_sTargetIframe);	
				var $cback = $('<input/>').attr({ type: 'hidden', name: 'callBackFunction', value: _sCallback });
				
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
				
				$("#"+_sFormId).find("#callBackFunction").val(_sCallback);	// 처리후 복귀 함수	
				
				var uniq_id = fn_get_randomId(10);
				var $iframe = fn_get_iframeBody($("#"+_sTargetIframe)[0]);
				var $form = $("<form/>").attr( "action", _sAction ).attr( "id", uniq_id ).attr("method", "post");
	
				try {
					var input_type = "";
					var input_val = "";
					var $ctrl = "";
					
					$iframe.append( $form );
				
					$("#"+_sFormId).find("input[type='hidden'], input[type='text'],input[type='password'], input[type='checkbox']:checked, input[type='radio']:checked, select,textarea, .SPINNER").each( function(){
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
							
							$ctrl = $('<input/>').attr({ type: 'text', name:$(this).attr("id"), value: input_val });
							
							$iframe.find("#"+uniq_id).append($ctrl);
						}
					});
				} catch(E) {}			
					//alert( $iframe.html() );			
				return $iframe.find("#"+uniq_id);
			}
	}
	/**
	* @memberof USV.BOOK
	* @method 
	* @description 폼의 아이디를 임의로 생성
	* @author 김수예(2016.04.01)
	* @param {number} _n  아이디의 자리수 생성
	*/
	fn_get_randomId = function(_nSize){
		
		 if(!_nSize)    _nSize = 5;
	
		 var sRandomId = '';
		 var charGroup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		
		 for(var i=0; i < _nSize; i++)
		 {
			 sRandomId += charGroup.charAt(Math.floor(Math.random() * charGroup.length));
		 }
		
		 return sRandomId;
	}
	
	/**
	* @memberof USV.BOOK
	* @method 
	* @description iframe 을 쓸수 있는 객체 가져오기 : 아래
	* @author 김수예(2016.04.01)
	* @param {String} _sIframe  IFrame Id
	*/
	fn_get_iframeBody = function(_sIframe) {
			var doc = null;
			// IE8 cascading access check
			try {
				if (_sIframe.contentWindow) {
					doc = _sIframe.contentWindow.document;
				}
			} catch(err) {}
	
			if (doc) { // successful getting content
			}
			else {
				try {
					doc = _sIframe.contentDocument ? _sIframe.contentDocument : _sIframe.document;
				} catch(err) {
					doc = _sIframe.document;
				}
			}
			
			var $doc = doc;
			var $body = $($doc.body) ? $($doc.body) : $($doc.documentElement)
			$body.html('');
			
			return $body;
	}
			
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 공사번호 / 관리번호 검색
	 * @author 김수예(2016.04.01)
	 * @param {String} _sTableName 조회할 테이블 명, _keyColumn 해당 Key 값
	 */
	fn_open_searchNum = function(_sTableName,_sKeyColumn) {		
		
		var title = "관리번호검색";
		if( typeof(REGISTER.fn_get_menuInfo(_sTableName)) !== "undefined" ){
				
			var oWinInfo = jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sTableName));		
			title = oWinInfo.title+"검색";
		}	
			//var sUrl = oWinInfo.url+"Search.do?openerId="+$('.activeWindow').find('#nJDSKSubId').val();
		var sUrl = "/register/registerSearch.do?TABLENAME="+_sTableName+"&KEY_COLUMN="+_sKeyColumn+"&openerId="+$('.activeWindow').find('#nJDSKSubId').val();
		BOOK.fn_open_dialog(title,sUrl, 600, 600); 
		
	}
	
	fn_del_searchNum = function(_sKeyColumn1, _sKeyColumn2){		
		
		 $('.activeWindow').find('#'+_sKeyColumn1).val("");
		 
		 if( typeof _sKeyColumn2 != "undefined" && _sKeyColumn2 != null ){
			 $('.activeWindow').find('#'+_sKeyColumn2).val("");
			 $('.activeWindow').find("#"+_sKeyColumn2+" option").removeAttr("disabled");
		 }
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 시설물 항목에서 공사/민원 상세 조회
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */
	fn_view_consMa = function(_sConsType) {		
		
		var oWinInfo =  jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sConsType));		
		
		var sCntNum = $('.activeWindow').find('#'+oWinInfo.keyColumn).val();
				
		if (sCntNum == null || sCntNum == "") {
			alert( oWinInfo.title+"번호가 설정되지 않았습니다.");
			return;
		}				
		var sUrl = oWinInfo.url+"CRU.do?"+oWinInfo.keyColumn+"="+sCntNum+"&openerId="+$('.activeWindow').find('#nJDSKSubId').val();			 

		REGISTER.fn_open_nJDSKWindow(oWinInfo.title, sUrl, oWinInfo.width,oWinInfo.height,oWinInfo.call);
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 시설물 항목에서 추가정보 상세 조회
	 * @author 김수예(2016.07.14)
	* @param {String} _sTableName 조회할 테이블 명, _sKeyColumn 키가되는 컬럼명
	 */
	fn_view_subRegister = function(_sTableName,_sKeyColumn) {		
				
		var sUrl = "/register/register";
		var sTitle = "대장";
		var sWidth = "680";
		var sHeight = "700";
		var sKeyData = null;
		
		//menuInfo에 정보가 없을 경우.. 
		if( typeof REGISTER.fn_get_menuInfo(_sTableName) !== "undefined" ){
			
			var oWinInfo =  jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sTableName));

			//sUrl = oWinInfo.url;
			sTitle = oWinInfo.title;
			sWidth = oWinInfo.width;
			sHeight = oWinInfo.height
			
			if( typeof _sKeyColumn === "undefined" &&  !_sKeyColumn.startsWith('grid') )		_sKeyColumn = oWinInfo.keyColumn;
		}
		
		sUrl = sUrl+"CRU.do?TABLENAME="+_sTableName+"&openerId="+$('.activeWindow').find('#nJDSKSubId').val();			 
		
		//alert( _sKeyColumn.startsWith('grid'));
		if( _sKeyColumn.startsWith('grid')){			
			
			var sGridName = camelCase("grid_"+_sTableName)+$('.activeWindow').find('#nJDSKSubId').val();											//테이블명으로 그리드 이름 가져오기
						
			var sGridData = $('.activeWindow').find("#"+sGridName).getGridParam("reccount");		//총 데이터 가져오기 
			
			// 다중선택시.. 하나만. 
			var aRowIds = $('.activeWindow').find("#"+sGridName).getGridParam('selarrrow');
			//alert("다중"+aRowIds);
			if( aRowIds != null && aRowIds!='' ) {
				alert("하나만 선택해주세요.")
				return false;
			}
						
			var sRowId = $('.activeWindow').find("#"+sGridName).getGridParam( 'selrow' );
			//alert("하나"+sRowId);
			//선택한 것이 있으면 그걸로.. 
			if( sRowId !== null && sRowId !== '') {
				var oRowData =$('.activeWindow').find("#"+sGridName).getRowData(sRowId); 
				sKeyData = oRowData['g2Id'];
				sUrl = sUrl +"&FID=" + sKeyData;						
			}else {
				//선택한 것이 없으면 무조건 첫번째 값 가져오기.. 다중일경우 방법 없음. 
				sKeyData = $('.activeWindow').find("#" +sGridName).getCell(1,"g2Id");					
				sUrl = sUrl +"&FID=" + sKeyData;		
		    }
						
		}else {
			
			sKeyData = $('.activeWindow').find('#'+_sKeyColumn).val();
			sUrl = sUrl +"&KEY_COLUMN="+_sKeyColumn+"&"+_sKeyColumn+"="+sKeyData;
		}
		
		if ( typeof sKeyData === "undefined" || sKeyData === ""  || sKeyData === "0"  ) {
			
			alert( sTitle+"번호가 설정되지 않았습니다.");
			return;
		}				
		
		//alert(sUrl);
		REGISTER.fn_open_nJDSKWindow(sTitle, sUrl, sWidth,sHeight,"addPopup");
	}

	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 공사대장 항목에서 민원조회
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */
	fn_view_wserMa = function(_sConsType, _sCntNum) {		

		if (_sCntNum == null || _sCntNum == "") {
			alert("민원 번호가 설정되지 않았습니다.");
			return;
		}
		
		var oWinInfo =  jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sConsType));		
		var sUrl = oWinInfo.url+"CRU.do?"+oWinInfo.keyColumn+"="+_sCntNum+"&CALL_TYPE=registerOnConsMa";			 
				
		REGISTER.fn_open_nJDSKWindow(oWinInfo.title, sUrl, oWinInfo.width,oWinInfo.height,'registerOnConsMa');
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 도면/사진 정보 조회
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */ 
	fn_view_image =function(_sFtrCde, _sFtrIdn, _sCntNum, _sTableName) {		
		
		var sUrl = "/book/IMGE_ETList.do?tableName="+_sTableName+"&";
		
		if (_sCntNum == undefined || _sCntNum == "")
			sUrl = sUrl+"FTR_CDE="+_sFtrCde+"&FTR_IDN="+_sFtrIdn;
		else
			sUrl = sUrl+"CNT_NUM="+_sCntNum;
				
		REGISTER.fn_open_nJDSKWindow("도면/사진관리", sUrl, 675, 600,'registerOnImage');
		
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 출력버튼 클릭시 발생되는 이벤트 
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */ 
	fn_print_report = function(_sTableId, _sG2Id) {
		
		var oWinInfo = jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sTableId));		

		var wPrint = window.open(oWinInfo.url+"Print.do?TABLENAME="+_sTableId+"&FID="+_sG2Id, "PRINT_DJ", "left=0,top=0,width=800,height=800,scrollbars=yes");
			 wPrint.focus();
		
	}
	
	function fn_open_dialog(_sTitle,_sUrl,_nWidth,_nHeight){
		$.get(_sUrl,function(msg){			
			new nJDSK.customSizeDialog(_nWidth, _nHeight, _sTitle, '',msg,'',false);		
			$('.activeWindow').find("#nJDSKSubId").attr('value',$('.activeWindow').attr('id').substr(4) );
			$('.buttonarea').remove();
		});	

	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 파일 다운로드 이벤트 
	 * @author 김수예(2016.04.01)
	 * @param 
	 */ 
	fn_download_file = function(_sFileCours, _sFileName) {
		try {
			$("#download_frm").find("#FILE_COURS").val( _sFileCours );
			$("#download_frm").find("#FILE_NM").val( _sFileName );
			$("#download_frm").attr("action","/common/downloadFile.do");
			$("#download_frm").attr("target","proc_frm");
			$("#download_frm").submit();
		}catch(E){alert(E);}
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 닫기버튼 클릭시 발생되는 이벤트 
	 * @author 김수예(2016.04.01)
	 * @param 
	 */ 
	fn_close_window = function(_sOpenerId){
		
		var sWindowId = $('.activeWindow').attr('id');
		
		if( sWindowId === undefined ){
			sWindowId = $('.modalbg').attr('id').substr(6);
		}else {
			sWindowId = $('.activeWindow').attr('id').substr(4);
		}

		var oWindow = nJDSK.WindowList.get_window(sWindowId);		
		oWindow.close();
		
		//이전 윈도우에 포커스를 가도록 처리해야하는데..jdesktop에 추가해 놓은 듯.. 		
		/*if( _sOpenerId === 'Detail')	_sOpenerId = $('#nJDSKMasterId').val();
		
		if( _sOpenerId !== undefined && _sOpenerId.indexOf("w") != -1 ){
			$('#win_'+_sOpenerId).css({'z-index':nJDSK.WindowList.lastZIndex});
	  		$('.window').removeClass('activeWindow');
	  		$('#win_'+_sOpenerId).addClass('activeWindow');
	  		nJDSK.WindowList.lastZIndex+=1;		
		}*/
	};	
	
	
	function multiSelectHandler(sid, e) {
        var grid = $(e.target).closest("table.ui-jqgrid-btable");
        var ts = grid[0], td = e.target;
        var scb = $(td).hasClass("cbox");
        if ((td.tagName == 'INPUT' && !scb) || td.tagName == 'A') {
            return true;
        }
        var sel = grid.getGridParam('selarrrow');
        var selected = $.inArray(sid, sel) >= 0;
        if (e.ctrlKey || (scb && (selected || !e.shiftKey))) {
            grid.setSelection(sid,true);
        } else {
            if (e.shiftKey) {
                var six = grid.getInd(sid);
                var min = six, max = six;
                $.each(sel, function() {
                        var ix = grid.getInd(this);
                        if (ix < min) min = ix;
                        if (ix > max) max = ix;
                    });
                while (min <= max) {
                    var row = ts.rows[min++];
                    var rid = row.id;
                    if (rid != sid && $.inArray(rid, sel)<0) {
                        grid.setSelection(row.id, false);
                    }
                }
            } else if (!selected) {
                grid.resetSelection();
            }
            if (!selected) {
                grid.setSelection(sid,true);
            } else {
                var osr = grid.getGridParam('onSelectRow');
                if ($.isFunction(osr)) {
                    osr(sid, true);
                }
            }
        }
    }

	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 대장/상세창의 select box 정렬 
	 * @author 유민경(2016.06.20)
	 * @param 
	 */ 
	fn_sort_select = function(_sAction){
		
		for(var i=0; i<$(".activeWindow .select").length; i++){
			var oOptionList = $(".activeWindow .select").eq(i).find('option');
			var oSelected = $('.activeWindow').find('.select:eq('+i+') option:selected');
			
			oOptionList.sort(function(a, b){
		        if (a.text > b.text) return 1;
		        else if (a.text < b.text) return -1;
		        else {
		            if (a.value > b.value) return 1;
		            else if (a.value < b.value) return -1;
		            else return 0;
		        }
		    });
			$(".activeWindow .select").eq(i).html(oOptionList);
			
			if(_sAction == "New") 
				$(".activeWindow .select:eq("+i+") option:eq(0)").attr('selected', 'selected');
			
			else if(($(".select").eq(0)[0].id).substring(0,1) != '@'){	// 급수공사민원 접수처리 편집시 셀렉트박스 초기화문제. (크롬)
				
				if($($('#OLD_'+$(".select").eq(i)[0].id)).val() != undefined) 
					$(".activeWindow .select:eq("+i+")").val($($('#OLD_'+$(".select").eq(i)[0].id)).val());
				
			}else 
				$(".activeWindow").find(".select:eq("+i+")").val(oSelected.val());
			
		}
	}

	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 신규등록 버튼 클릭시 입력창 생성
	 * @author 유민경(2016.07.13)
	 * @param String 테이블이름
	 */ 
	fn_open_grid = function(_sTableName){

		var sUrl = "/book/bookCRU.do?TABLENAME="+_sTableName+"&openerId="+$('.activeWindow').find('#nJDSKSubId').val();
		var oWinInfo = jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sTableName));

		fn_open_nJDSKWindow(oWinInfo.title+"추가", sUrl, oWinInfo.width, oWinInfo.instHeight, oWinInfo.call);
	}

	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 신규등록 저장 버튼 클릭시
	 * @author 유민경(2016.07.12)
	 * @param String 테이블이름
	 */ 
	fn_insert_grid = function(_sTableName){

		if (confirm('저장하시겠습니까?')) {

			var sFormId = $('.activeWindow').find('form').attr('id');		
			var oJsonData = JSON.stringify(BOOK.fn_get_serialize(sFormId));
			var nOpenerId = $('.activeWindow').find('#nJDSKSubId').val();		

			jQuery.ajaxSettings.traditional = true;
			$.ajax({
				type: 'get',
				dataType: 'json',
				data: {jsonData : oJsonData, TABLENAME : _sTableName},
				url: '/book/bookProcWrite.do',
				success: function(json) {
					alert(json.resultMsg);
					fn_close_window(nOpenerId);
					fn_search_mainGrid();
					REGISTER.fn_view_register('','SWT_CONS_MA','VIEW');
				},
				error: function(error) {
					alert(error.errorMsg);
				}
			});
		}
	}

	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 그리드 삭제 버튼 클릭시 발생(json)
	 * @author 유민경(2016.07.12)
	 * @param String 선택된 그리드의 테이블이름
	 */ 
	fn_delete_grid = function(_sTableName) {

		var sRowId = $('.activeWindow').find('#gridArea').getGridParam('selarrrow');
		var oG2Id = [];

		if (sRowId != null) {
			if (confirm('해당정보를 삭제하시겠습니까?')) {
				for(var i=0; i<sRowId.length; i++){
					var sRowData = $('.activeWindow').find("#gridArea").getRowData(sRowId[i]);
					oG2Id[i] = sRowData['FID'];			
				}

				jQuery.ajaxSettings.traditional = true;
				$.ajax({
					type: 'get',
					dataType: 'json',
					data: {TABLENAME:_sTableName, FID : oG2Id},
					url: "/book/bookProcDelete.do",
					success: function(json) {
						alert(json.resultMsg);
						fn_search_mainGrid();
					},
					error: function(error) {
						alert(error.errorMsg);
					}
				});				
			}
		} else
			alert('삭제할 정보가 선택되지 않았습니다.');
	}

	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 신규등록 저장 버튼 클릭시
	 * @author 유민경(2016.07.12)
	 * @param String 테이블이름
	 */ 
	fn_save_grid = function(_sTableName, _sAction){

		if (confirm('저장하시겠습니까?')) {

			var sFormId = $('.activeWindow').find('form').attr('id');		
			var oData = BOOK.fn_get_serialize(sFormId);
			var oJsonData = JSON.stringify(oData);
			
			var sUrl = '/book/bookCRU.do?TABLENAME='+_sTableName+'&FID=';
			var nOpenerId = $('.activeWindow').find('#openerId').val();
			var oWinInfo = jQuery.parseJSON(fn_get_menuInfo(_sTableName));
			
			jQuery.ajaxSettings.traditional = true;
			$.ajax({
				type: 'get',
				dataType: 'json',
				data: {jsonData : oJsonData, TABLENAME : _sTableName, action_flag : _sAction},
				url: '/book/bookProcWrite.do',
				success: function(json) {
					alert(json.resultMsg);

					var oWindow = nJDSK.WindowList.get_window(nOpenerId);
					oWindow.close();
					fn_search_mainGrid();
					
					if(_sAction == "INSERT") sUrl = sUrl+json.FID;
					else sUrl = sUrl+oData.FID;
					
					fn_open_nJDSKWindow(oWinInfo.title+"상세", sUrl, oWinInfo.width, oWinInfo.height, oWinInfo.call);
				},
				error: function(error) {
					alert(error.errorMsg);
				}
			});
		}
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 도면/사진 그리드
	 * @author 유민경(2016.07.12)
	 * @param String 테이블이름
	 */ 
	fn_get_ImgeGrid = function(_sFtrCde, _sFtrIdn, _sCntNum, _sTableName){
		var sUrl = '/book/IMGE_ETListXml.do?tableName='+_sTableName+"&";
		
		if( _sFtrCde != null && _sFtrCde !=="" &&  _sFtrIdn != null && _sFtrIdn !=="" ){			
			sUrl = sUrl+"FTR_CDE="+_sFtrCde+"&FTR_IDN="+_sFtrIdn;
		}
		
		if (_sCntNum  != null && _sCntNum !== ""){
			sUrl = sUrl+"CNT_NUM="+_sCntNum;
		}
		
		//도로인경우 필드가 다름... 
		var CdeNm = "CTT_CDE";
		var CdeNmData = "cttCdeNm";
		
		if( _sTableName.indexOf("RDT") != -1 ){
			CdeNm = "DSP_CDE";
			CdeNmData = "dspCdeNm";
		}
		$('.activeWindow').find("#gridImge").jqGrid({
			url: sUrl,
			datatype: "local",
			colNames:["관리번호","구분","도면사진명","도면설명","파일명"],
		   	colModel:[
				{name:'IMG_IDN',index:'IMG_IDN',xmlmap:'imgIdn', align:'center', width:80}	//도면사진관리번호
				,{name:CdeNm+'_NM',index:CdeNm,xmlmap:CdeNmData, align:'center', width:60}	//도면사진구분
				,{name:'IMG_NAM',index:'IMG_NAM',xmlmap:'imgNam', width:120}	//도면사진명
				,{name:'IMG_EXP',index:'IMG_EXP',xmlmap:'imgExp', align:'center', width:120}	//도면사진 설명
				,{name:'FLE_NAM',index:'FLE_NAM',xmlmap:'fleNam', align:'center',  width:160}	//파일명				
			],
		    sortname: 'IMG_IDN',
		    sortorder: "DESC",
			rowNum : 10,
			rowList : [ 10, 50, 100 ],
			viewrecords : true,
			xmlReader : {	root : "rows",row : "Item",	repeatitems : false},
			rownumbers : true,
			loadtext : "검색 중입니다.",
			emptyrecords : "<div class='Paging_tx'>검색된 데이터가 없습니다.</div>",
			recordtext :  "<div class='Paging_tx'>총 <span> {2}</span>건 데이터 ({0}-{1})</div>",
			ondblClickRow: function(rowId) {		// 더블클릭 처리
				BOOK.fn_open_gridAddInfo(_sTableName, "UPDATE");
			},
		    onSelectRow: function(rowId) {		// 클릭 처리
				if( rowId != null ){
					$('#image_area').empty();
					var rowData =$( "#gridImge").getRowData(rowId);
					if (rowData["FILE_EXIST"] == "N") {
						$("input[value='내려받기']").remove();
						alert("파일이 등록되지 않았습니다.");
					}  else {
						$('#image_area').html( "<img src='/filestorage/"+_sTableName+"/"+rowData["FLE_NAM"]+"' width='625px' height='230px'>" );
						if ($("#btns").children().length == 3) {
							$("#btns").prepend("<input type=\"button\" value=\"내려받기\" onclick=\"javascript:BOOK.fn_download_file('"+_sTableName+"', '"+rowData["FLE_NAM"]+"');\">");
						}
					} 
				}
			},
			height : 160,
			width: 650,
			shrinkToFit : true
		}).navGrid('#gridImgePager',{edit:false,add:false,del:false,search:false,refresh:false});
		
		$('.activeWindow').find('#gridImge').jqGrid("setGridParam",{
			datatype: "xml"
			,page: 1
			,mtype: "POST"
		}).trigger("reloadGrid"); 
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 도면/사진 신규추가 및 수정
	 * @author 유민경(2016.07.20)
	 * @param String 테이블이름
	 */
	fn_insert_gridImge = function(_sTableName){
		
		if( $("#DSP_CDE").val() === "" ||  $("#CTT_CDE").val() === ""){
			alert("사진 구분을 선택해 주시기 바랍니다.");
			return;
		}
		
		if( $('.activeWindow').find("#IMG_NAM").val() === "" ){
			alert("도면사진명을 입력하여 주시기 바랍니다.");
			return;
		}
		
		if( $('.activeWindow').find("#action_flag").val() === "INSERT"){
			
			if( $('.activeWindow').find("#FLE_NAM").val() === "" ){
				alert("파일을 선택하여 주시기 바랍니다.");
				return;
			}
			
			if( $("#FLE_NAM").val() !== "" ){
				var ext = $('#FLE_NAM').val().split('.').pop().toLowerCase();
				if($.inArray(ext, ['tif','gif','jpg','bmp','png','pic','dxf','dwg']) == -1) {
					alert('이미지 및 캐드 파일만 업로드가 가능합니다.');
					return;
				}
				// 확장자 지정
				$("#TYP_NAM").val( ext );
			}
		}
										
		if( confirm('저장하시겠습니까?') ) {
			var sFormId = $('.activeWindow').find('form').attr('id');		
			
			var jsonData = JSON.stringify(BOOK.fn_submit_fileForm(sFormId));
			jQuery.ajaxSettings.traditional = true;
			
			var sOpenerId = $('.activeWindow').find('#openerId').attr('value');		
			
			var form = $("#"+sFormId);			
			var formData = new FormData(form);
			
			if( $('.activeWindow').find("#action_flag").val() === "INSERT"){
				formData.append("imgFile",form.find("input[type=file]")[0].files[0]);
			}			
			formData.append("jsonData",jsonData);			
			//formData.append("CNT_NUM",$("#CNT_NUM").val());
			//formData.append("FTR_CDE",$("#FTR_CDE").val());
			//formData.append("FTR_IDN",$("#FTR_IDN").val());
					
			$.ajax({
				type: 'POST',
				dataType: 'json',
				processData: false,
 	            contentType: false, 
				data: formData,
				url: '/book/IMGE_ETProcWrite.do',
				success: function(json) {
					alert(json.resultMsg);
					BOOK.fn_close_window(sOpenerId);
					fn_view_image($("#FTR_CDE").val(), $("#FTR_IDN").val(), $("#CNT_NUM").val(), _sTableName);
				},
				error: function(error) {					
					alert(error.resultMsg);
				}
			});
		}
	}
	
	/**
	 * @memberof USV.BOOK
	 * @method 
	 * @description 도면/사진 삭제
	 * @author 유민경(2016.07.22)
	 * @param {String} _sGridId 선택된 그리드의 ID
	 */ 
	fn_delete_gridImge = function(_sTableName) {
		//var sGridName = $('.activeWindow').find('form').attr('id');
		var sGridName = 'gridImge';
		var sRowId = $('.activeWindow').find("#"+sGridName).getGridParam("selrow");
		var data = {};
		
		if (sRowId != null) {
			var sRowData = $('.activeWindow').find("#"+sGridName).getRowData(sRowId);			
			
			data.IMG_IDN = sRowData['IMG_IDN'];
			data.FLE_NAM = sRowData['FLE_NAM'];
			data.TABLENAME = _sTableName;

			if (confirm('해당정보를 삭제하시겠습니까?')) {

				$.ajax({
					type: 'get',
					dataType: 'json',
					data: data,
					url: "/book/IMGE_ETProcDelete.do",
					success: function(json) {
						alert(json.resultMsg);
						fn_view_image($("#FTR_CDE").val(), $("#FTR_IDN").val(), $("#CNT_NUM").val(), _sTableName);
					},
					error: function(error) {
						alert(error.errorMsg);
					}
				});				
			}

		} else
			alert('삭제할 정보가 선택되지 않았습니다.');
	}
	//------------------------------------------------------------------------------------------------------------------
	//## public 메소드
	//------------------------------------------------------------------------------------------------------------------
		_mod_book.fn_open_leftSearch					=	fn_open_leftSearch;
		_mod_book.fn_close_leftSearch					=	fn_close_leftSearch;
		_mod_book.fn_init_formObject					=	fn_init_formObject;
		_mod_book.fn_init_main							=	fn_init_main;
		_mod_book.fn_init_popup							=  fn_init_popup;
		_mod_book.fn_view_mode							=	fn_view_mode;
		_mod_book.fn_edit_mode						    =	fn_edit_mode;
		_mod_book.fn_get_screenMode						=	fn_get_screenMode;		
		_mod_book.fn_form_readonly						=	fn_form_readonly;		
		_mod_book.fn_create_datepickerLinked			=	fn_create_datepickerLinked;
		_mod_book.fn_create_datepicker					=	fn_create_datepicker;
		_mod_book.fn_click_datepicker					=	fn_click_datepicker;		
		_mod_book.fn_reset_form		            		=	fn_reset_form;
		_mod_book.fn_save_register						=  	fn_save_register;
		_mod_book.fn_save_register_callback				=  	fn_save_register_callback;
		_mod_book.fn_save_registerBatch					=  	fn_save_registerBatch;
		_mod_book.fn_save_registerBatch_callback		=  	fn_save_registerBatch_callback;
		_mod_book.fn_search_mainGrid					=	fn_search_mainGrid;
		_mod_book.fn_search_openerGrid					=  	fn_search_openerGrid;		
		_mod_book.fn_get_serialize					  	=	fn_get_serialize;
		_mod_book.fn_submit_createForm					=	fn_submit_createForm;
		_mod_book.fn_submit_fileForm					= 	fn_submit_fileForm;
		_mod_book.fn_get_form					    	=	fn_get_form;
		_mod_book.fn_get_randomId					    =	fn_get_randomId;
		_mod_book.fn_get_iframeBody						=	fn_get_iframeBody;		
		_mod_book.fn_view_subRegister					=	fn_view_subRegister;
		_mod_book.fn_view_consMa					    =	fn_view_consMa;
		_mod_book.fn_view_image					      	=	fn_view_image;						
		_mod_book.fn_print_report					    =	fn_print_report;				
		_mod_book.fn_open_dialog						=  	fn_open_dialog;
		_mod_book.fn_download_file						=  	fn_download_file;
		_mod_book.fn_close_window					    =	fn_close_window;		
		_mod_book.multiSelectHandler					=  	multiSelectHandler;
		_mod_book.fn_sort_select					    =	fn_sort_select;
		_mod_book.fn_get_gridAddInfo					=  fn_get_gridAddInfo;		
		_mod_book.fn_search_gridAddInfo					=	fn_search_gridAddInfo;
		_mod_book.fn_open_gridAddInfo			    	=  fn_open_gridAddInfo;
		_mod_book.fn_insert_gridAddInfo 				=  fn_insert_gridAddInfo;
		_mod_book.fn_delete_gridAddInfo					=  fn_delete_gridAddInfo;
		_mod_book.fn_open_grid					    	=  fn_open_grid;
		_mod_book.fn_save_grid							=  fn_save_grid;
		_mod_book.fn_delete_grid						=  fn_delete_grid;
		_mod_book.camelCase								=  camelCase;
		_mod_book.fn_open_searchNum						=  fn_open_searchNum;
		_mod_book.fn_del_searchNum					=  fn_del_searchNum;
		_mod_book.fn_get_ImgeGrid						=  fn_get_ImgeGrid;
		_mod_book.fn_insert_gridImge					=  fn_insert_gridImge;
		_mod_book.fn_delete_gridImge					=  fn_delete_gridImge;
	//------------------------------------------------------------------------------------------------------------------

	return _mod_book;

}(USV.BOOK || {}, jQuery));