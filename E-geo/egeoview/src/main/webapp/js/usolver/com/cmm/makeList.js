/**
 *  사용자 검색항목 설정에 필요한 이벤트 
 * @namespace {Object} USV.MAKELIST
 */
USV.MAKELIST = (function(_mod_makeList, $, undefined){
	var nIndex = 0;
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 대장 목록 조회 
	* @author 유민경(2016.05.25)
	*/
	var fn_search_fieldList = function (){
		var nCnt = 0;
		$("#addFind_column" ).sortable();
	    $("#addFind_column" ).disableSelection();
	    $("#addList_column" ).sortable();
	    $("#addList_column" ).disableSelection();
	    $("#make_lst li").remove();
	    
		data = {tableName : $('.activeWindow').find("#titleTable").attr('name')};
		$.ajax({
			type: 'get',
			dataType: 'xml',
			data: data,
			url: '/register/registerFieldList.do',
			success: function(xml) {
				if($(xml).find("code").find("item").length > 0) {
					$(xml).find("code").find("item").each(function() {
						nCnt++;
							var code_name = $(this).find("code_name").text();
							var code_id = $(this).find("code_id").text();

							$("#make_lst").append("<li><a href='#' class='no' id='"+code_id+"' name='"+nCnt+"' onclick='MAKELIST.fn_click_userList(this)'>"+code_name+"</a></li>");
						});  
					}
				},
				error: function(xhr, status, error) {
					alert(status);
					alert(error);
				}
		});
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 검색/조회 항목 Li 추가
	* @author 유민경(2016.05.26)
	*/
	fn_add_userList = function(id){
		var oChoice = $("#make_lst a");
		$("#"+id.substring(0,7)+"_column").find('li').remove(); //데이타 제거  
		for(var i=0; oChoice.eq(i).attr('class') !== undefined; i++){
			
			if(oChoice.eq(i).attr('class') == "activation"){
				$("#"+id.substring(0,7)+"_column").append("<li><a href='#' name='"+oChoice.eq(i).attr('id')+"'>"+oChoice.eq(i).text()+"</a></li>");
			}
		}
		$("#make_lst a").attr('class', "no");
	}

	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 검색 항목 DB 저장
	* @author 유민경(2016.06.01)
	*/
	fn_save_userList = function(_sUserId,_sAuthor){
		var oAddFind = [],
			oAddList = [],
			oAddFindAlias = [],
			oAddListAlias = [],
			data = {};
		//var sUserId = "USER100001";	// 추후 user_id 가져오기
		
		if($("#addFind_column li").length != 0 || $("#addList_column li").length != 0){
			// 검색항목
			if($("#addFind_column li").length != 0){
				for(var i=0; i<$("#addFind_column li").length; i++){
					oAddFind[i] = $("#addFind_column li a").eq(i).attr('name');
					oAddFindAlias[i] = $("#addFind_column li a").eq(i).text();
				}
				
				data.addFind = oAddFind;
				data.addFindAlias = oAddFindAlias;
			}else{
				data.addFind = null;
				data.addFindAlias = null;
			}
			
			// 조회항목
			if($("#addList_column li").length != 0){
				for(var i=0; i<$("#addList_column li").length; i++){
					oAddList[i] = $("#addList_column li a").eq(i).attr('name');
					oAddListAlias[i] = $("#addList_column li a").eq(i).text();
				}
				
				data.addList = oAddList;
				data.addListAlias = oAddListAlias;
			}else{
				data.addList = null;
				data.addListAlias = null;
			}
			
			data.userId = _sUserId;
			data.tableName = $("#titleTable").attr('name');
			jQuery.ajaxSettings.traditional = true;
			
			$.ajax({
				type: 'get',
				dataType: 'json',
				data: data,
				url: '/register/registerSaveUserList.do',
				success: function(json) {
					alert(json.resultMsg);
					fn_create_userList(_sUserId, _sAuthor);
				},
				error: function(error) {
					alert(error.errorMsg);
				}
			});
		}else alert("추가된 항목이 없습니다.");
		
		BOOK.fn_open_leftSearch();
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 사용자 검색 항목 DB 조회 후 적용
	* @author 유민경(2016.06.07)
	*/
	fn_create_userList = function(_sUserId, _sAuthor, _sCallType){
		var sTableName = $('.activeWindow').find("#titleTable").attr('name');
		var sTableFilter = sTableName.substring(0,3);
		var bViewColumn = false;

		data = {tableName : sTableName, userId : _sUserId};
		$.ajax({
			type: 'get',
			dataType: 'json',
			data: data,
			url: '/register/registerGetUserList.do',
			success: function(data) {
				
				if(Object.keys(data).length != 1){				
					if(data["addFind"].length != 0){		// 변경사항 있음
						$(".SBx1").children(".standard").remove();
						$(".SBx1").append("<div class='standard'>");
						
						for(var i=0; i<data["addFind"].length; i++){
							var sFind = data["addFind"][i];
							var sFindAlias = data["addFindAlias"][i];
							var sCode;
							
							//if(sTableFilter != "WTT"){
								sFind = "@" + sFind;
								sCode = sFind.substring(5);
							//}else sCode = sFind.substring(4);

							if(sFind.substring(5) == "YMD"){
								
								$(".standard").append("<dl><dt>"+sFindAlias+"</dt><dd><input type='text' style='width:70%' name='"+data["addFind"][i]+"_S' id='"+sFind
										+"_S' class='input DT_DATE'/> ~ </dd></dl><dl>"
										+"<dt> </dt><dd><input type='text' style='width:70%' name='"+data["addFind"][i]+"_E' id='"+sFind
										+"_E' class='input DT_DATE'/></dd></dl>");
								
								BOOK.fn_create_datepickerLinked("frm_mst", sFind+"_S", sFind+"_E" , 10);
								
							}else if(sCode == "CDE" || sCode == "MOP" || sCode == "MOF" || sCode == "CHK"){							
								var sListNm = data["addFind"][i].toLowerCase()+"_list";
								var sOption = "";
								
								for(var j=0; j<data[sListNm].length; j++) {
									sOption += "<option value=" + data[sListNm][j].CODE + ">" + data[sListNm][j].VAL + "</option>";
								}
								$(".standard").append("<dl><dt>"+sFindAlias+"</dt><dd><select class='select' style='width:88%;' name='"+data["addFind"][i]+"' id='"+sFind+"'>" 
										+"<option value=''></option>"+sOption+"</select></dd></dl>");
								
							}else{
								$(".standard").append("<dl><dt>"+sFindAlias+"</dt><dd><input type='text' name='"+data["addFind"][i]+"' id='"+sFind+"' class='input'/></dd></dl>");
							}							
						}
						$(".SBx1").append("</div>");
					}
					
					if(data["addListAlias"].length != 0){
						bViewColumn = true;
					}
				}
				
				var sColNames = [],
				sColModel = [],
				sColMap = [],
				sColModels = [];
				var sUrl;
				
				/*var newWith, count;
				count = data["addList"].length;
				if(count<5) count=10;
				
				newWith = $(".Table_list .ui-widget-content").width()/count;
				*/
				for(var i=0; i<data["addList"].length; i++){
					var sList, sListAlias;

					if(bViewColumn == true){
						sList = data["addList"][i];
						sListAlias = data["addListAlias"][i];
					}else{
						sList = data["addList"][i].g2Name;
						sListAlias = data["addList"][i].g2Alias;
					}
				
					var sStrList, sXmlMap;

					sColNames[i] = sListAlias;
					if(sList.substring(4) == "CDE" || sList.substring(4) == "MOP" || sList.substring(4) == "MOF" || sList.substring(4) == "CHK" || sList == "VAL_FOR" || sList == "HOM_HJD") sColModel[i] = sList+"_NM";
					else sColModel[i] = sList;
					
					var sWdith = '80px'; 
					var sListFilter = sList.substring(4, 7);					
					
					if(sListFilter == 'DES') sWdith = '250px';
					else if(sListFilter == 'LOC' || sListFilter == 'ADR' || sListFilter == 'EXP' || sListFilter == 'ARE' || sListFilter == 'LBL') sWdith = '200px';
					else if(sListFilter == 'STD' || sListFilter == 'NAM') sWdith = '180px';
					
					if(sListAlias.length > 6 && sWdith == '80px') sWdith = (sListAlias.length*14)+"px";
											
					sStrList = sColModel[i].split('_');
					sXmlMap = sStrList[0].toLowerCase() + sStrList[1].substring(0,1).toUpperCase() + sStrList[1].substring(1).toLowerCase();
					
					if(sStrList.length > 2) sXmlMap = sXmlMap + sStrList[2].substring(0,1).toUpperCase() + sStrList[2].substring(1).toLowerCase();
					sColMap[i] = sXmlMap;
								
					sColModels[i] = {name:sColModel[i],index:sList,xmlmap:sColMap[i], width:sWdith, align:'center'};						

				}
				debugger;
				
				sColNames.push("FID", "FTR_CDE");
				sColModels.push({name:'FID',index:'FID',xmlmap:'fid', hidden: true},{name:'FTR_CDE',index:'FTR_CDE',xmlmap:'ftrCde', hidden: true});
				sUrl = "/register/registerListXml.do?TABLENAME="+sTableName;			
				
				//jQuery("#gridArea").GridUnload();    충돌떠서 안나오네.. 새로고침이 제대로 안되서 썼었던 것임... 
				
				$('.activeWindow').find('#gridArea').jqGrid({
					url: sUrl
					,datatype: "local"
					,mtype: 'POST'
					,colNames:sColNames
				   	,colModel:sColModels
					,sortname: 'FID'
				    ,sortorder: "DESC"
				   	,rowNum: 100
				   	,rowList: [100,500,1000,100000000]
				    ,viewrecords: true
					,xmlReader: { root : "rows",row: "Item",repeatitems: false }
				   	,pager: jQuery('#gridPager')
				    ,rownumbers: true
				    ,loadtext: "검색 중입니다."
					,emptyrecords: "<div class='Paging_tx'>검색된 데이터가 없습니다.</div>"
					,recordtext: "<div class='Paging_tx'>총 <span> {2}</span>건 데이터 ({0}-{1})</div>"
					,ondblClickRow: function(rowId) {	// 더블클릭 처리				
						if( _sAuthor){		//조회권한이 있는 경우 true; 
							REGISTER.fn_view_register(rowId,sTableName,'VIEW');	//대장조회							
						}else {
							alert("조회권한이 없습니다.");
							return false;
						}
					}
				   	,loadComplete: function() { $("option[value=100000000]").text("ALL"); }
					,multiselect: true
					,multiboxonly: true //체크박스 선택시에만 다중선택
					,shrinkToFit : false
				}).navGrid('#gridPager',{edit:false,add:false,del:false,search:false,refresh:false}); 
				
				// 화면 초기화. 그리드 사이즈 조정 
				BOOK.fn_init_main();
				//BOOK.fn_sort_select("New");
				
				if(_sCallType === "registerOnMap"){
					REGISTER.fn_search_layerMap('searchLayerMap',sTableName);
					setTimeout('REGISTER.fn_update_checkonAllRowOnJQGrid()',1000);
				} else {
					$('.cbEditLayerList').css('display','none');
				}
			},
			error: function(xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
		
		$('#searchFilterPane').hide();
		$("#addFind_column").find('li').remove();
		$("#addList_column").find('li').remove();
		$("#make_lst a").attr('class', "no");
	}
	
	/**
	 * @memberof USV.MAKELIST
	 * @method 
	 * @description 사용자 목록 삭제
	 * @author 유민경(2016.06.15)
	 */
	fn_delete_userList = function(_sUserId){
		data = {tableName : $("#titleTable").attr('name'), userId : _sUserId};
		$.ajax({
			type: 'get',
			dataType: 'json',
			data: data,
			url: '/register/registerDeleteUserList.do',
			success: function(json) {
				alert(json.resultMsg);
				var sTableName = $('#titleTable').attr('name');
				var oMenuInfo = jQuery.parseJSON(REGISTER.fn_get_menuInfo(sTableName));
				
				var sUrl = oMenuInfo.url+"List.do?page=1&rows=50&TABLENAME="+sTableName;
				if( oMenuInfo.url.indexOf(".do") > 0 ){
					 sUrl = oMenuInfo.url+"?&page=1&rows=50&MenuId="+sTableName;
				}	
				var sWidth  = $('#desktop').width()-50;
				var sHeight = 440;
						
		 		if( sTableName === "STAT_TOTAL"){
					sWidth = oMenuInfo.width;
					sHeight =oMenuInfo.height;
				}

				REGISTER.fn_open_nJDSKWindow(oMenuInfo.title, sUrl, sWidth, sHeight,'registerOnHome');	
			},
			error: function(error) {
				alert(error.errorMsg);
			}
		});
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 사용자 검색항목 설정 닫기
	* @author 유민경(2016.06.07)
	*/
	fn_close_userList = function(){
		$('#searchFilterPane').hide();
		$("#addFind_column").find('li').remove();
		$("#addList_column").find('li').remove();
		$("#make_lst a").attr('class', "no");
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 사용자 검색항목 설정 열기
	* @author 유민경(2016.06.07)
	*/
	fn_open_userList = function(){
		if($('#searchFilterPane').is(':visible')){
			$('#searchFilterPane').hide();
		}else{
			alert( $('#searchFilterBtn').offset().left + "||"+ $(".activeWindow").offset().left );
			$('#searchFilterPane').css("margin-top","50px");
			$('#searchFilterPane').css("margin-left", $('#searchFilterBtn').offset().left-$(".activeWindow").offset().left-340+"px");
			$('#searchFilterPane').show();
			
			if (parseInt(navigator.appVersion)>3) {
				document.onmousedown = fn_shift_userList;
				if (navigator.appName=="Netscape") 
					document.captureEvents(Event.MOUSEDOWN);
			} 
			
			fn_search_fieldList();
		}
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 사용자 검색항목 shift 이벤트
	* @author 유민경(2016.06.14)
	*/
	fn_shift_userList = function(e){
		var shiftPressed = 0;
		var evt;
		
		if (parseInt(navigator.appVersion) > 3) {
			evt = e ? e : window.event;
			shiftPressed = evt.shiftKey;
			
			if(evt.target.tagName == 'A' && $('#searchFilterPane').css('display') == 'block')
				if(evt.target.attributes.class.value == 'no'){
				
					if (shiftPressed){
						var nStart = 0, nEnd = 0;
						
						if(nIndex < evt.target.name){
							nStart = nIndex+1;
							nEnd = Number(evt.target.name);
						}else{
							nStart = Number(evt.target.name)+1;
							nEnd = nIndex;
						}
						
						for(var i=nStart; i<nEnd; i++) 
							evt.target.parentNode.parentNode.childNodes[i].children[0].attributes.class.value = 'activation';
					}
					return true;
			}
		}
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 대장 목록 선택
	* @author 유민경(2016.06.07)
	*/
	fn_click_userList = function(_index){
		if(_index.className !== "activation"){
			_index.className = "activation";
			nIndex = Number(_index.name);
		}else _index.className = "no";
	}
	
	/**
	* @memberof USV.MAKELIST
	* @method 
	* @description 사용자 검색항목 설정 초기화
	* @author 유민경(2016.06.08)
	*/
	fn_clear_userList = function(){
		$("#addFind_column").find('li').remove();
		$("#addList_column").find('li').remove();
		$("#make_lst a").attr('class', "no");
	}
	
	//------------------------------------------------------------------------------------------------------------------
	//## public 메소드
	//------------------------------------------------------------------------------------------------------------------
	_mod_makeList.fn_search_fieldList	=	fn_search_fieldList;
	_mod_makeList.fn_add_userList		=	fn_add_userList;
	_mod_makeList.fn_create_userList	=	fn_create_userList;
	_mod_makeList.fn_save_userList		=	fn_save_userList;
	_mod_makeList.fn_close_userList		=	fn_close_userList;
	_mod_makeList.fn_open_userList		=	fn_open_userList;
	_mod_makeList.fn_click_userList		=	fn_click_userList;
	_mod_makeList.fn_clear_userList		=	fn_clear_userList;
	_mod_makeList.fn_shift_userList		=	fn_shift_userList;
	_mod_makeList.fn_delete_userList	=	fn_delete_userList;
	//------------------------------------------------------------------------------------------------------------------

	return _mod_makeList;

}(USV.MAKELIST || {}, jQuery));