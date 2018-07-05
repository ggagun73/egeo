/**
 * 대장조회 네임스페이스 
 * @namespace {Object} USV.REGISTER 
 */
USV.REGISTER = (function(_mod_register, $, undefined){
	
	var oSearchLayerMap = {};
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description oSearchLayerMap 리턴
	* @author 윤은희(2016.02.16 )
	* @returns {Object} oSearchLayerMap
	*/
	var fn_get_searchLayerMap = function (){
		return oSearchLayerMap;
	};

	/**
	* @memberof USV.REGISTER
	* @method 
	* @description oSearchLayerMap 설정
	* @author 윤은희(2016.02.16 )
	* @returns {Object} oSearchLayerMap
	*/
	var fn_set_searchLayerMap = function (_oLayerMap){
		oSearchLayerMap = _oLayerMap;
	};
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 대장창을 띄워서 대장을 검색한다. 
	* 					대장창을 [메뉴]에서 바로 호출하거나, 지도의 [시설물 검색] 기능을 통해 호출시 혹은 [시설물 검색] 기능을 통해 호출 후 내부의 [검색] 기능을 통해 재 호출 시 사용된다. 
	* @author 윤은희(2016.02.24)
	* @param {String} _sSearchType - 대장 검색을 호출하는 타입. ex) [메뉴]에서 바로 호출 = 빈값, [시설물 검색]에서 호출 = 'searchLayerMap', [시설물검색-검색]에서 호출 = 빈값
	* @param {String} _sIsEmptyLayerMap - LAYER_MAP객체(호출페이지에 존재하는 html 객체) 값이 비어있는지 여부에 대한 문자열.
	* @param {String} _sLayerName - 레이어(table)명  
	*/
	fn_search_register = function (_sSearchType,_sIsEmptyLayerMap,_sLayerName){

		var aOptionList = [],	
		oJsonData = {}, 
		oJsonDataSearch = null;
			
		if(_sIsEmptyLayerMap === 'true'){ 							 // [시설물 검색] 기능을 통해 검색된 경우만
			if(_sSearchType === 'searchLayerMap'){	 			 // [시설물 검색] 기능을 통해 바로 호출시 	
				oJsonData = JSON.parse($('#LAYER_MAP').val());
				//oJsonDataSearch = MAP_EDITOR.fn_get_searchLayerMap();	// 시설물 검색 결과를 바인드 시켰던 객체 정보 가져오기
			}
			else{									  						 // [검색] 버튼을 눌러 대장 검색을 시도한 경우
				$('#LAYER_MAP').val('');
				oJsonDataSearch = {
						tables : []
				};
				oJsonDataSearch.tables.push(_sLayerName);
			}
			
			// listbox에 표시						
			if(oJsonDataSearch === null || oJsonDataSearch.tables.length === 0){
				REGISTER.fn_set_searchLayerMap(oJsonData);	
				
				//oSearchLayerMap가 존재해야 하는 이유 = 검색결과에는 여러개의  다른 시설물(레이어+객체) 정보가 존재하며
				//listbox를 통해 시설물 검색결과를 변경시도하게 되므로, 전역변수가 담고 있어야 함.
				oJsonDataSearch = REGISTER.fn_get_searchLayerMap();
			}
			
			for(var i=0,len=oJsonDataSearch.tables.length; i<len; i++){	
				if(oJsonDataSearch.tables[i] !== oJsonDataSearch.tables[i-1])	// 속성고급검색 상세조회시 시설물 중복표현 방지 - Yu_mk
				aOptionList.push('<option value=' + oJsonDataSearch.tables[i] + '>' + COMMON.fn_get_EditKorLayerNm(oJsonDataSearch.tables[i]) + '</option>');					
			}
			$('.cbEditLayerList').html(aOptionList);
			$('.cbEditLayerList').val(_sLayerName).attr('selected', 'selected');
			$('.cbEditLayerList option:selected').val();
		}	
					
		if( _sSearchType!='FID' )	$('#FID').val('');			// FID 검색은 지도에서만 진행되기 때문에 초기화		
	}
	
	// 시설물 변경시,
	$( '.cbEditLayerList' ).change(function() {			
		$('.cbEditLayerList option:selected').val();
		// 창 추가로 open ....  추후 진행 : 복수 시설물 검색 작업 후.
	});
	
	//구찮다.. 하나에서 관리해 보자.. 
	fn_get_menuInfo = function(_sMenuId) {		
		var menuInfo =$.parseJSON(json_MenuInfo); 		
		return JSON.stringify(menuInfo[_sMenuId]); 
	}; 
	
	fn_view_register = function (_sRowId,_sDbId,_sType,_sUrl){
		debugger;
		
		var sObjectId = null;
		if( $.type(_sRowId)=== 'undefined' || _sRowId=='' )
			 _sRowId = $('.activeWindow').find('#gridArea').getGridParam( 'selrow' );
		
		if( _sRowId !== null && _sRowId !== '') {
			var oRowData =$('.activeWindow').find('#gridArea').getRowData(_sRowId); 
			sObjectId = oRowData['FID'];
		}
				
		var oWinInfo = jQuery.parseJSON(fn_get_menuInfo(_sDbId));

		//기존에 열렸던 아이는 또 열리나?  어떻게 찾을까? 
		if( _sType === 'INSERT' ){
			
			if(_sDbId == 'WTL_LEAK_PS') fn_open_nJDSKWindow(oWinInfo.title+"추가", oWinInfo.url+"CRU.do?TABLENAME="+_sDbId+"&NEWINSERT=true", oWinInfo.width, oWinInfo.instHeight, oWinInfo.call);
			else fn_open_nJDSKWindow(oWinInfo.title+"추가", oWinInfo.url+"CRU.do?TABLENAME="+_sDbId+"&NEWINSERT=true", oWinInfo.width, oWinInfo.instHeight, oWinInfo.call);

		}else if( _sType === 'UPDATE' ){

			fn_open_nJDSKWindow(oWinInfo.title+"상세", _sUrl, oWinInfo.width, oWinInfo.height, oWinInfo.call);
			
		}else {
	
			if( sObjectId !== null && sObjectId !== '' ){
				
				_sUrl = oWinInfo.url + 'CRU.do?TABLENAME='+_sDbId+'&FID='+sObjectId;
				fn_open_nJDSKWindow(oWinInfo.title+"상세", _sUrl, oWinInfo.width, oWinInfo.height, oWinInfo.call);		
		
			}else { 
				/* 조회해야할 데이터가 없다고 메세지 처리.. */
				alert('조회해야할 데이터가 선택되지 않았습니다.');
			}
		}
				
	}

	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 대장을 삭제한다. 
	* @author 김수예(2016.04.01)
	* @param {String} _sUrl 				- 수행 서버 URL
	* @param {Number} _nWidth 		- width
	* @param {Number} _nHeight 		- height  
	*/
	fn_delete_register = function (_sTableName, _sGridId, _sFromId){
		
		//var sRowId = $('.activeWindow').find("#"+_sGridId).getGridParam("selrow");
		var oRowIds = $('.activeWindow').find( '#gridArea' ).getGridParam('selarrrow');
		
		if( oRowIds != null && oRowIds != '') {
			var oRowData;
	    	var sIdList = '';
			//var sRowData =$( "#"+_sGridId ).getRowData(sRowId); 
    		//var aG2Id = sRowData['FID'];
			//var aCntNum = sRowData['CNT_NUM'];


			if( oRowIds.length > 1) {
	    		oRowData =$('.activeWindow').find('#'+_sGridId).getRowData(oRowIds[0]); 
	    		sIdList = oRowData['FID'];
	    		
		    	for(var i=1; i<oRowIds.length; i++) {
		    		oRowData =$('.activeWindow').find('#'+_sGridId).getRowData(oRowIds[i]); 
		    		sIdList += ','+oRowData['FID'];
		    	}
	    	}
	    	else {
	    		oRowData =$('.activeWindow').find('#'+_sGridId).getRowData(oRowIds);
	    		sIdList = oRowData['FID'];
	    	}

    		if (confirm('해당정보를 삭제하시겠습니까?')) {				
    			
    			var oWinInfo = jQuery.parseJSON(fn_get_menuInfo(_sTableName));
    			
//	    		var sUrl = oWinInfo.url+"ProcDelete.do?TABLENAME="+_sTableName+"&FID="+sIdList+"&CNT_NUM=" + aCntNum;
	    		var sUrl = oWinInfo.url+"ProcDelete.do?TABLENAME="+_sTableName+"&FID="+sIdList;
	    		
	    		BOOK.fn_get_form(_sFromId,"proc_frm",sUrl,_sGridId).submit();
			}
	    }
	    else
	    	alert('삭제할 정보가 선택되지 않았습니다.');
				
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택한 시설물의 대장상세내용을 상세창을 통해 조회한다.
	* @author 윤은희(2016.02.24)
	* @param {String} _sRowId		- 선택한 row의 ID
	* @param {String} _sTitle		    - 대장 타이틀명
	* @param {String} _sUrl			- 대장 상세조회 수행 서버 URL
	* @param {Number} _nWidth		- 대장 창 width  
    */
	fn_view_detailRegister = function (_sRowId,_sTitle,_sUrl,_nWidth,_nHeight){
		debugger;
		var sObjectId = null;
		if( $.type(_sRowId)=== 'undefined' || _sRowId=='' )
			 _sRowId = $('.activeWindow').find('#gridArea').getGridParam( 'selrow' );
		
		if( _sRowId !== null && _sRowId !== '') {
			var oRowData =$('.activeWindow').find('#gridArea').getRowData(_sRowId); 
			sObjectId = oRowData['FID'];
		}
		
		//기존에 열렸던 아이는 또 열리나?  어떻게 찾을까? 
		if( sObjectId !== null && sObjectId !== '' ){
			
			_sUrl = _sUrl + '?FID='+sObjectId; 
			fn_open_nJDSKWindow(_sTitle, _sUrl, _nWidth, _nHeight, "registerOnDetail");
	
		}else {
			/* 조회해야할 데이터가 없다고 메세지 처리.. */
			alert('조회해야할 데이터가 선택되지 않았습니다.');
		}
				
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택한 시설물의 대장을 일괄수정한다.
	* @author 윤은희(2016.02.24)
	* @param {String} _sUrl 				- 대장 일괄수정 수행 서버 URL
	* @param {Number} _nWidth 		- 일괄 수정창 width
	* @param {Number} _nHeight 		- 일괄 수정창 height  
	*/
	fn_update_pluralRegister = function (_sDbId){

		var aRowIds = $('.activeWindow').find( '#gridArea' ).getGridParam('selarrrow');
	    
	    if( aRowIds != null && aRowIds!='' ) {
	    	var oRowData;
	    	var sIdList = '';
	    	
	    	if( aRowIds.length>1) {
	    		oRowData =$('.activeWindow').find( '#gridArea' ).getRowData(aRowIds[0]); 
	    		sIdList = oRowData['FID'];
	    		
		    	for(var i=1;i<aRowIds.length;i++) {
		    		oRowData =$('.activeWindow').find( '#gridArea' ).getRowData(aRowIds[i]); 
		    		sIdList += ','+oRowData['FID'];
		    	}
	    	}
	    	else {
	    		oRowData =$('.activeWindow').find( '#gridArea' ).getRowData(aRowIds);
	    		sIdList = oRowData['FID'];
	    	}

	    	//cfWindowOpen( '대장일괄', _sUrl+'?FID='+idList, _nWidth, _nHeight, true, $('#wnd_id').val(), 'center');
			//var nJDSKSubId = nJDSK.uniqid() + '_' + $('#nJDSKMasterId').val();			
			//fn_open_nJDSKWindow('대장일괄', _sUrl+'?FID='+sIdList, _nWidth, _nHeight, nJDSKSubId, $('#CALL_TYPE').val());
			
			var oGridInfo = jQuery.parseJSON(REGISTER.fn_get_menuInfo(_sDbId));	    	

			oGridInfo.url = oGridInfo.url+"MU.do?TABLENAME="+_sDbId+"&FID="+sIdList;
			
			//fn_open_nJDSKWindow(oGridInfo.title+"일괄수정", oGridInfo.url, oGridInfo.width, oGridInfo.instHeight, oGridInfo.instHeight, oGridInfo.call);
			
	    	BOOK.fn_open_dialog(oGridInfo.title+"일괄수정", oGridInfo.url, oGridInfo.width, oGridInfo.instHeight); 		
	    	
	    }else
	    	alert('선택된 항목이 존재하지 않습니다.');
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택한 시설물의 유지보수대장을 일괄등록한다.
	* @author 김수예(2016.07.05)
	* @param {String} _sTableName : 유지보수테이블명 
	*/
	fn_insert_maintenance = function (_sTableName){
				
		var aRowIds = $('.activeWindow').find('#gridArea').getGridParam('selarrrow');
	    
	    if( aRowIds != null && aRowIds!='' ) {
	    	var oRowData;
	    	var sFtrCdeList = '';
	    	var sFtrIdnList = '';

	    	if( aRowIds.length>1) {
	    		oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds[0]); 
	    		sFtrCdeList = oRowData['FTR_CDE'];
	    		sFtrIdnList = oRowData['FTR_IDN'];
	    		
		    	for(var i=1;i<aRowIds.length;i++) {
		    		oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds[i]); 
		    		sFtrCdeList += ','+oRowData['FTR_CDE'];
		    		sFtrIdnList += ','+oRowData['FTR_IDN'];
		    	}
	    	}
	    	else {
	    		oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds);
	    		sFtrCdeList = oRowData['FTR_CDE'];
	    		sFtrIdnList = oRowData['FTR_IDN'];
	    	}
	    		    	
	    	BOOK.fn_open_dialog("유지보수일괄등록","/book/AddInfoCRU.do?TABLENAME="+_sTableName+"&FTR_CDE="+sFtrCdeList+"&FTR_IDN="+sFtrIdnList, 600, 350); 		

	    }else
	    	alert('선택된 항목이 존재하지 않습니다.');
	}
	
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택한 시설물의 유지보수대장을 일괄수정한다.
	* @author 윤은희(2016.02.24)
	* @param {String} _sUrl 				- 유지보수 대장 일괄수정 수행 id  
	*/
	fn_update_wutlHtBatch = function (_sGridId){
				
		var aRowIds = $('.activeWindow').find('#gridArea').getGridParam('selarrrow');
	    
	    if( aRowIds != null && aRowIds!='' ) {
	    	var oRowData;
	    	var sFtrCdeList = '';
	    	var sFtrIdnList = '';

	    	if( aRowIds.length>1) {
	    		oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds[0]); 
	    		sFtrCdeList = oRowData['FTR_CDE'];
	    		sFtrIdnList = oRowData['FTR_IDN'];
	    		
		    	for(var i=1;i<aRowIds.length;i++) {
		    		oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds[i]); 
		    		sFtrCdeList += ','+oRowData['FTR_CDE'];
		    		sFtrIdnList += ','+oRowData['FTR_IDN'];
		    	}
	    	}
	    	else {
	    		oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds);
	    		sFtrCdeList = oRowData['FTR_CDE'];
	    		sFtrIdnList = oRowData['FTR_IDN'];
	    	}

	    	var oGridInfo = jQuery.parseJSON(BOOK.fn_get_gridInfo(_sGridId));
	    	
	    	BOOK.fn_open_dialog( oGridInfo.title,oGridInfo.url+"?FTR_CDE="+sFtrCdeList+"&FTR_IDN="+sFtrIdnList, oGridInfo.width, oGridInfo.height); 		

	    }else
	    	alert('선택된 항목이 존재하지 않습니다.');
	}
	
	
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택 시설물 편집을 위해 해당 시설물을 지도에서 찾아서 편집모니터에 추가한다. 
	* @author 윤은희(2016.02.24)
	* @param {String} _sLayerName 			- 레이어(table)명  
	*/
	fn_edit_feature = function (_sLayerName,aG2_id){
		/*if(!MAP_EDITOR.fn_check_editMode()) {
			editor.editMode = true;
		}*/
		$("a[href=#editToolTab]").trigger("click");
		MAP_EDITOR.fn_start_edit();
		$("div.editLayer").text($("li a.depth2#"+_sLayerName).text());
		$("div.editLayer").attr("id",_sLayerName);
		if(!MAP_EDITOR.fn_check_editLayerSettings(_sLayerName)) {
			$("li a.depth2[id="+_sLayerName+"]").trigger("click");
		}
		$("#btnStartFeatureEdit").trigger("click");
		var oParams = {
			prefix : CONFIG.fn_get_dataHouseName(),
			tables : [_sLayerName],
			fields : ['FID'],
			values : aG2_id
		};
		NUTs.WFS.getFeatureByMultiId(CONFIG.fn_get_wfsServiceUrl(), oParams, function(res){
			var sEditLayer = res.data[0].table;
			var oData = res.data[0].results;
			if(editor.searchLayer != null) {
				MAP_EDITOR.fn_remove_searchFeatures();
			}
			for(var i=0,len=oData.length;i<len;i++){
				var sG2_id = oData[i].g2id;
				MAP_EDITOR.fn_update_filterOnWFSLayer(sEditLayer, sG2_id);
				MAP_EDITOR.fn_start_editFeature(res, sG2_id, sEditLayer);
				MAP_EDITOR.fn_save_middle('insert', sEditLayer, sG2_id);
				//editor.removeFeatureOnMapLayer(sEditLayer, sG2_id);
			}
			MAP_EDITOR.fn_get_middleEditList();
			//map.setLayerIndex(editor.styleLayer,map.layers.length-1);
			var oFeature = res.data[0].results[0].feature;
			//for(var i=0; i<oData.length; i++) oFeature.push(res.data[0].results[i].feature);
			map.zoomToFeature(oFeature);
		});
		
		$("#editMonitor").dialog({
			width : 570,
			height : 450
		});
		//};
	};
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 삭제한 시설물을 편집모니터에 추가한다. 
	* @author 윤은희(2016.02.24)
	* @param {String} _sLayerName 			- 레이어(table)명
	* @param {String} _sFID 				- _sFID  
	*/
	fn_remove_feature = function (_sLayerName, _sFID){
		var sG2_id = '';
		var aRowIds = $('.activeWindow').find('.gridArea').getGridParam('selarrrow');
		
		if( aRowIds === undefined) 
			sG2_id = _sFID;
		else if( aRowIds != null && aRowIds!='' ) {			
			var oRowData =$('.activeWindow').find('.gridArea').getRowData(aRowIds[0]);			
			sG2_id = oRowData['FID'];
		}
		
		// 시설물별 복수 개체건에 대한 추가 조치 필요
		var oParams = {
				prefix : CONFIG.sDataHouse,
				tables : [_sLayerName],
				fields : ['FID'],
				values : [sG2_id]
		}
		NUTs.WFS.getFeatureById(CONFIG.fn_get_wfsServiceUrl(), oParams, function(res){
			MAP_EDITOR.fn_update_filterOnWFSLayer(_sLayerName,sG2_id);
			editor.removeFeatureOnMapLayer(_sLayerName, sG2_id);				
			MAP_EDITOR.fn_create_editingFeature(res, sG2_id, 4);	 
			MAP_EDITOR.fn_save_middle('insert', _sLayerName, sG2_id);
		});
	}
	
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택 시설물의 위치로 지도를 이동하고 해당 시설물을 selection한다. 
	* @author 윤은희(2016.02.24)
	* @param {String} _sLayerName 			- 레이어(table)명  
	*/

	fn_search_feature = function(_sLayerName){

		var aRowIds = $('.activeWindow').find('#gridArea').getGridParam( 'selarrrow' );
		
		if( aRowIds != null && aRowIds!='' ) {			
			if(aRowIds.length > 1) {
				alert('한개의 시설물만 선택해주세요');
				return;
			}
			
			//var oRowData =$('#'+gridAreaId).getRowData(aRowIds[0]);

			var oRowData =$('.activeWindow').find('#gridArea').getRowData(aRowIds[0]);

			
			var sG2_id = oRowData['FID'];
			var oParams = {
					prefix : CONFIG.sDataHouse,
					tables : [_sLayerName],
					fields : ['FID'],
					values : [sG2_id]
			}
			
			NUTs.WFS.getFeatureByComparison(CONFIG.fn_get_wfsServiceUrl(), oParams, function(res){
				var oFeature = res.data[0].results[0].feature;
				
				var oVectorLayer = map.getLayerByName('DrawToolLayer');
				
				// 추후, 공통 스타일로 변경적용.
				oFeature.style ={
			        strokeColor: '#FF0000',
			        strokeOpacity: 1,
			        strokeWidth: 3,
			        pointRadius: 6
				};
				
				oVectorLayer.addFeatures(oFeature);
				map.zoomToFeature(oFeature, 11);
			});
		}else {
			
			alert('시설물을 선택한 후 버튼을 클릭해 주세요.');
		}
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 대장창에서 선택 시설물의 위치로 지도를 이동하고 해당 시설물을 selection한다. 
	* @author 유민경(2016.05.03)
	* @param {String} _sLayerName 			- 레이어(table)명  
	* @param {String} _aRowIds 				- 선택 행
	* @param {Object} _oRowData 			- 선택 행 데이터
	*/
	fn_move_toFeatures = function(_sLayerName, _oRowData){ 
		debugger;
		var oParams = {
				prefix : CONFIG.fn_get_dataHouseName(),
				tables : [_sLayerName],
				fields : ['FID'],
				values : _oRowData
		}
		
		NUTs.WFS.getFeatureByMultiId(CONFIG.fn_get_wfsServiceUrl(), oParams, function(res){
			var bReturn = false;
			var aFeature = [];
			
			try {							
			var aResults = res.data[0].results;
			
			for(var i in aResults) {
				var oFeature = aResults[i].feature;
				var oBounds = oFeature.geometry.getBounds();
				if(typeof oBounds !== 'undefined' || oBounds != null) {
					bReturn = true;
				}
				aFeature.push(oFeature);
			}
			
			} catch (E) {
				bReturn = false;
			}

			if(bReturn) {
				var oMap = $(".isMap",parent.document);
				if(oMap.length == 0) {
					oMap = false;
				}
				if(oMap) {
					var oVectorLayer = editor.searchLayer;
					oVectorLayer.removeAllFeatures();
					map.zoomToFeature(aFeature[0]);
					for(var i in aFeature) {
						var oFeature = aFeature[i];
						SEARCH.fn_add_feature(oFeature);
						MAP_EDITOR.fn_blink_feature(oVectorLayer,oFeature,200,200,3);
					}
				} else {
					var sParameter = '?callback=fn_move_toFeatures&callbackParam='+oParams.tables+"&aG2_id="+oParams.values;
					openMap(sParameter);
				}
			} else {
				alert("시설물 공간 데이터가 없습니다.");
			}
		});
	}
	
	var fn_check_featureG2Data = function(_sLayerName, _aG2id) {
		var oParams = {
				prefix : CONFIG.fn_get_dataHouseName(),
				tables : [_sLayerName],
				fields : ['FID'],
				values : _aG2id
		}
		NUTs.WFS.getFeatureByMultiId(CONFIG.fn_get_wfsServiceUrl(), oParams, function(res){
			var bReturn = false;
			var aResults = res.data[0].results;
			for(var i in aResults) {
				var oFeature = aResults[i].feature;
				var oBounds = oFeature.geometry.getBounds();
				if(typeof oBounds !== 'undefined' || oBounds != null) {
					bReturn = true;
				}
			}
			return bReturn;
		});
	}
	

	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 신규 시설물을 조회한다. 
	* @author 윤은희(2016.02.24)
	* @param {String} _sLayerName 			- 레이어(table)명  
	*/
	fn_search_newFeature = function (_sLayerName){
		$('.activeWindow').find("input[id='@@SYS_CHK']").val('0');
		BOOK.fn_search_mainGrid();
		$('.activeWindow').find("input[id='@@SYS_CHK']").val('');
	}
	
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 시설물을 엑셀로 저장한다. 
	* @author 윤은희(2016.02.24)
	* @param {String} _sURL 					- 엑셀저장 수행 서버 URL  
	*/
	fn_save_excel = function (_sDbId){
				
		var oWinInfo = jQuery.parseJSON(fn_get_menuInfo(_sDbId));

		if( confirm('해당 내용을 엑셀로 출력하시겠습니까?\n(검색된 데이터의 양에 따라 다소 시간이 소요됩니다.)') ) {
			// SUBMIT
			BOOK.fn_get_form('frm_mst', 'proc_frm', oWinInfo.url+"Excel.do?TABLENAME="+_sDbId,'').submit();
		}
	}
		
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description jDesktop 윈도우 창 열기를 수행한다.
	* @author 윤은희(2016.02.24)
	* @param {String} _sTitle 				- 창 타이틀
	* @param {String} _sUrl 				- 수행 서버 URL
	* @param {Number} _nWidth 		- 창 width
	* @param {Number} _nHeight 		- 창 height
	* @param {String} _sWinType 		- 창 Type  mst 대장목록, sub 상세조회, con 공사대장, img 도면/사진, print 출력 
	* @param {String} _sCallType			- 창을 호출하는 위치 (ex.  registerOnMap = 지도창에서 [시설물 검색]을 통해 호출, registerOnHome = 시스템 메인 [메뉴]를 통해 호출.   
	*/
	fn_open_nJDSKWindow = function (_sTitle,_sUrl,_nWidth,_nHeight,_sCallType){
				
		var bMultiWindow = true;			
		var nJDSKWinId = $('#nJDSKMasterId').val();	
		var nJDSKNewId = nJDSK.uniqid();
		
		//alert(_sTitle+"||"+_sUrl+"||"+_nWidth+"||"+_nHeight+"||"+_sCallType+"||"+nJDSKWinId);
		
		switch(_sCallType){
			case 'registerOnHome' : 	var	 oOrgWindow = nJDSK.WindowList.get_window(nJDSKWinId);
											if( oOrgWindow !== undefined ){		oOrgWindow.close();	}		
											_sUrl = _sUrl +"&nJDSKMasterId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;
			case 'registerOnDetail' :   var nJDSKOrgWinId = $('#frm_detail').find('#nJDSKSubId').val();	
											var	 oOrgWindow = nJDSK.WindowList.get_window(nJDSKOrgWinId);
											if( oOrgWindow !== undefined ){	oOrgWindow.close();	}
											nJDSKNewId = nJDSKNewId+"_"+nJDSKWinId;				
											_sUrl = _sUrl +"&nJDSKSubId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;		
			case 'registerOnConsMa' : var nJDSKOrgWinId = $('#frm_cons').find('#nJDSKSubId').val();	
											var	 oOrgWindow = nJDSK.WindowList.get_window(nJDSKOrgWinId);
											if( oOrgWindow !== undefined ){	oOrgWindow.close();	}
											if( _sUrl.indexOf("opener") != -1)	nJDSKNewId = nJDSKNewId+"_"+$('.activeWindow').find('#nJDSKSubId').val();
											else  nJDSKNewId = nJDSKNewId+"_"+nJDSKWinId;
											_sUrl = _sUrl +"&nJDSKSubId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;		
			case 'registerOnMinwon' : var nJDSKOrgWinId = $('#frm_min').find('#nJDSKSubId').val();	
											var	 oOrgWindow = nJDSK.WindowList.get_window(nJDSKOrgWinId);
											if( oOrgWindow !== undefined ){	oOrgWindow.close();	}
											if( _sUrl.indexOf("opener") != -1)	nJDSKNewId = nJDSKNewId+"_"+$('.activeWindow').find('#nJDSKSubId').val();
											else nJDSKNewId = nJDSKNewId+"_"+nJDSKWinId;
											_sUrl = _sUrl +"&nJDSKSubId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;
			case 'registerOnImage'   : var nJDSKOrgWinId = $('#frm_imge').find('#nJDSKSubId').val();	
											var	 oOrgWindow = nJDSK.WindowList.get_window(nJDSKOrgWinId);
											if( oOrgWindow !== undefined ){	oOrgWindow.close();	}
											if( _sUrl.indexOf("opener") != -1) nJDSKNewId = nJDSKNewId+"_"+$('.activeWindow').find('#nJDSKSubId').val();
											else nJDSKNewId = nJDSKNewId+"_"+nJDSKWinId;				
											_sUrl = _sUrl +"&nJDSKSubId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;		
			case 'registerOnMap'   :   var	 oOrgWindow = nJDSK.WindowList.get_window(nJDSKWinId);
											if( oOrgWindow !== undefined ){		oOrgWindow.close();	}
											_sUrl = _sUrl +"&nJDSKMasterId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;										
			default 				: 		_sUrl = _sUrl +"&nJDSKSubId="+nJDSKNewId+"&CALL_TYPE="+_sCallType;		
											break;
		}

		//alert(_sUrl);
		$.get(_sUrl,function(msg){
						
			var sTableName =_sUrl.substring(_sUrl.indexOf('TABLENAME')+10);
			var sTableName1 =_sUrl.substring(_sUrl.indexOf('TABLENAME')+10);
			
			if(  _sUrl.indexOf('TABLENAME') > -1 ){
				if(_sCallType == 'registerOnHome' || _sCallType === 'registerOnMap') sTableName = sTableName.substring(0,sTableName.indexOf('&'));
				else sTableName = sTableName1.substring(0,sTableName1.indexOf('&'));  
			}else{
				sTableName = "ETC";
			}
			
			var oNewWindow = new nJDSK.Window(_nWidth, _nHeight, _sTitle, '', msg, nJDSKNewId, null, null, null, null, _sCallType, sTableName);	
			$('.activeWindow').find("label").css({"display": "inline","float" : "none"});		
		});	
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description jqGrid의 모든 row를 체크한다.
	* @author 윤은희(2016.03.7)   
	*/
	fn_update_checkonAllRowOnJQGrid = function(){
		if($('.activeWindow').parents('#desktopOnMap').attr('alt') !== 'registerOnMap'){	// 속성고급검색 상세조회시 검색결과 자동체크 방지 - Yu_mk
			for(var i=0,len=$('.activeWindow').find('#gridArea').getGridParam('reccount'); i<len; i++){
				$('.activeWindow').find('#gridArea').jqGrid('setSelection', i+1);
			}	
		}
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 복수 검색후 대장 시설물 전환시 대장을 전환하는 함수
	* @author 이상호(2016.03.28)
	* @param {String} _sTable : 전환되는 시설물의 테이블 영어명  
	*/
	var fn_change_selectRegister = function(_sTable) {
		var nJDSKMasterId = $(".activeWindow").attr("id").split("_")[1];
		var oRegister = nJDSK.WindowList.get_window(nJDSKMasterId);
		
		var sLayer = $('#LAYER_MAP').val();
		var sTitle, sUrl = '';
		
		var oIframe = ifrMap.contentWindow || ifrMap.contentDocument || ifrMap;
		
		sTitle = $.trim(oIframe.COMMON.fn_get_EditKorLayerNm(_sTable))+"관리 대장";
		$(oRegister.titleText).html(sTitle);
		$(oRegister.taskbarBtn).html(sTitle);
		$("#titleTable").attr("name",_sTable);
		
		sUrl = '/register/registerList.do?CALL_TYPE=registerOnMap&page=1&rows=50&TABLENAME=' + _sTable+"&nJDSKMasterId="+nJDSKMasterId;
		
		$.get(sUrl,function(msg){
			$(oRegister.contentArea).html(msg);
		});
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 검색결과를 그리드의 붙여넣는 함수
	* @author 이상호(2016.05.17)
	* @param {String} _sType : 검색 타입 
	* @param {String} _sLayerNM : 검색결과의 레이어 영어명
	*/
	var fn_search_layerMap = function(_sType,_sLayerNM) {
		debugger;
		var aOptionList = [], aSearchResults = [];
		var oIframe = ifrMap.contentWindow || ifrMap.contentDocument || ifrMap;
		var oSearchResults = oIframe.REGISTER.fn_get_searchLayerMap();
		
		var oSearchTables = oSearchResults.tables;
		
		if(oSearchTables){
			for(var i=0,len= oSearchTables.length; i<len; i++){	
				if(oSearchTables[i] !== oSearchTables[i-1])	// 속성고급검색 상세조회시 시설물 중복표현 방지 - Yu_mk
				aOptionList.push('<option value=' + oSearchTables[i] + '>' + oIframe.COMMON.fn_get_EditKorLayerNm(oSearchTables[i]) + '</option>');					
			}
			$('.cbEditLayerList').html(aOptionList);
			$('.cbEditLayerList').val(_sLayerNM).attr('selected', 'selected');
			
			
			if(oSearchResults.callFunctionType == 'searchG2id') {
				var G2_ID_MAP = [];
				var aSearchResult = oSearchResults[_sLayerNM];
				for(var i in aSearchResult) {
					G2_ID_MAP.push(aSearchResult[i]);
				}
				
				$("#gridArea").jqGrid("setGridParam",{
					datatype : "xml",
					page : 1,
					postData : {
						"G2_ID_MAP" : G2_ID_MAP
					}
				}).trigger("reloadGrid");
				BOOK.fn_close_leftSearch();
			} else {
				var oDomainInfo = oIframe.SEARCH.fn_get_domainInfo(_sLayerNM);
				for(var i=0, oLayer = oSearchResults[_sLayerNM],  len=oLayer.length; i<len; i++){
					var oConvertFeature = oIframe.SEARCH.fn_convert_domainInfo(oLayer[i],oDomainInfo);
					var oNewSearchResult = {
							FID:""
					};
					$.extend(true,oNewSearchResult,oConvertFeature);
					if(oSearchResults.callFunctionType !== "searchAtt") {
						oNewSearchResult.FID = oLayer[i].g2id;
					}
					aSearchResults.push(oNewSearchResult);
				}
				
				$("#gridArea").jqGrid("setGridParam",{
					datatype: "local",
					page: 1,
					data: aSearchResults
				}).trigger("reloadGrid");
				BOOK.fn_close_leftSearch();
			}
		}
		else{
			oIframe.COMMON.showMessage("[대장조회오류]&검색결과가 없거나 전달되지 않았습니다.");
		}	
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택한 대상 도형편집
	* @author 이상호(2016.05.19)
	* @param {String} _sLayerNM : 선택 대상의 레이어 이름
	*/
	var fn_check_editShpae = function(_sLayerNM) {
		fn_hide_allWindows();
		if($(".isMap").length>0){
			var sMapWinId = $(".isMap").attr("id").split("_")[1];
			var oMapWindow = nJDSK.WindowList.get_window(sMapWinId);
			$(oMapWindow.taskbarBtn).click();
		}
		var aRowIds = $('#gridArea').getGridParam('selarrrow');
		
		var aG2_id = [];
		for(var i=0,len=aRowIds.length;i<len;i++) {
			var oRowData =$('#gridArea').getRowData(aRowIds[i]);
			aG2_id.push(oRowData['FID']);
		}
		if(aG2_id.length !== 0) {
			if($("#ifrMap").length !== 0) {
				var oIframe = ifrMap.contentWindow || ifrMap.contentDocument || ifrMap;
				var oSearchResults = oIframe.REGISTER.fn_edit_feature(_sLayerNM,aG2_id);
			} else{
				var sParameter = '?callback=fn_edit_feature&callbackParam='+_sLayerNM+"&aG2_id="+aG2_id;
				openMap(sParameter);
			}
		} else {
			// 공통으로 쓰는 common.js를 index.jsp에서 호출시 오류가 발생함
			//COMMON.showMessage("검색 오류&편집할 대상을 선택해주세요");
			// 우선 alert로 대체
			alert("편집할 대상을 선택해주세요");
		}
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 선택한 대상 위치이동
	* @author 이상호(2016.05.19)
	* @param {String} _sLayerNM : 선택 대상의 레이어 이름
	* @param {String} _sFID : 선택 feature의 FID
	*/
	var fn_check_moveToFeature = function(_sLayerNM,_sFID){
		fn_hide_allWindows();
		if($(".isMap").length>0){
			var sMapWinId = $(".isMap").attr("id").split("_")[1];
			var oMapWindow = nJDSK.WindowList.get_window(sMapWinId);
			$(oMapWindow.taskbarBtn).click();
		}
		var aG2_id = [];
		
		if(!_sFID) {
			var aRowIds = $('#gridArea').getGridParam('selarrrow');
			for(var i=0,len=aRowIds.length;i<len;i++) {
				var oRowData =$('#gridArea').getRowData(aRowIds[i]);
				aG2_id.push(oRowData['FID']);
			}
		} else {
			aG2_id.push(_sFID);
		}
		
		if(aG2_id.length !== 0) {
			if($("#ifrMap").length !== 0) {
				var oIframe = ifrMap.contentWindow || ifrMap.contentDocument || ifrMap;
				var oSearchResults = oIframe.REGISTER.fn_move_toFeatures(_sLayerNM,aG2_id);
			} else{
				var sParameter = '?callback=fn_move_toFeatures&callbackParam='+_sLayerNM+"&aG2_id="+aG2_id;
				openMap(sParameter);
			}
		} else {
			// 공통으로 쓰는 common.js를 index.jsp에서 호출시 오류가 발생함
			//COMMON.showMessage("검색 오류&이동할 대상을 선택해주세요");
			// 우선 alert로 대체
			alert("이동할 대상을 선택해주세요");
		}
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 윈도우 창 전부 하이드
	* @author 이상호(2016.07.29)
	*/
	var fn_hide_allWindows = function() {
		var aWindowList = nJDSK.WindowList.items;
		for(var i in aWindowList) {
			var oWindow = aWindowList[i].window_object;
			$(oWindow.minimizeBtn).click();
		}
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description feature에 fid로 대장창 열을 선택하는 함수
	* @author 이상호(2016.07.29)
	* @param {String} _sFid : 선택하고 싶은 feature에 fid
	*/
	var fn_select_fidRow = function(_aFid) {
		var sLayerName, sG2_Id;
		var oGridArea = $("#gridArea");

		var oSearchResults= {
				"tables" : [],
				"callFunctionType": "searchG2id"
		}
		for(var i in _aFid) {
			var sFid = _aFid[i];
			sLayerName = sFid.split(".")[0];
			sG2_Id = sFid.split(".")[1];
			if ($.inArray(sLayerName, oSearchResults.tables) == -1) {
				oSearchResults.tables.push(sLayerName);
			}
			oSearchResults[sLayerName] = [];
			oSearchResults[sLayerName].push(sG2_Id);
		}
		oSearchResults.tables.pop();
		var oIframe = ifrMap.contentWindow || ifrMap.contentDocument || ifrMap;
		var sUrl = '/register/registerList.do?page=1&rows=50&TABLENAME=' + oSearchResults.tables[0]+"&CALL_TYPE=registerOnMap";
		var sTitle = $.trim(oIframe.COMMON.fn_get_EditKorLayerNm(oSearchResults.tables[0]));
		oIframe.REGISTER.fn_set_searchLayerMap(oSearchResults);
		
		if(oGridArea.length>0) {
			var oRegister = oGridArea.closest(".window");
			var sRegisterId = oRegister.attr("id").split("_")[1];
    		var oRegisterWindow = nJDSK.WindowList.get_window(sRegisterId);
    		$(oRegisterWindow.closeBtn).click();
		}
		
		$.get(sUrl,function(msg){
			var sTableName = oSearchResults.tables[0];
			var oNewWindow = new nJDSK.Window(map.size.w-325, 440, sTitle+"관리 대장", '', msg, nJDSK.uniqid(), null, null, null, null, 'registerOnMap', sTableName);
			$('.activeWindow').find("label").css({"display": "inline","float" : "none"});
		});
			
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 공간검색 결과 내에 속성 재검색을 위한 함수
	* @author 이상호(2016.07.29)
	* @param {String} _sTabeName : 테이블 영어명
	*/
	var fn_rescan_searchData = function(_sTabeName) {
		SEARCH.fn_set_bReScanCheck(true);
		var sMapId = $(window.parent.document).find('.isMap').attr('id').replace('win_','');
		var oMapWindow = window.parent.nJDSK.WindowList.get_window(sMapId);
		$(oMapWindow.taskbarBtn).trigger('click');
		if(!$("#searchFacilityPane").is(":visible")) {
			$("#btn_searchFacility").trigger("click");
		}
		if(!$("#searchFacilityPane .fcont2").is(":visible") || $('#searchFacilityPane').width() == '260') {
			$(".fIcoList .fIcoM2").trigger("click");
		}
		
		var aLayerTree = $('#searchFacilityPane .fcont2 .treebx .TreePd');
		for(var i=0,len=aLayerTree.length;i<len;i++) {
			var oLayerTree = $('.fcont2 .treebx .TreePd').eq(i);
			if(oLayerTree.find('.Tree_sTx').is(':visible')) {
				oLayerTree.find('.Tree_Tx1 img.tabbutton').trigger("click");
			}
		}
		
		var oLayerCheckbox = $("#searchFacilityPane .fcont2 input[value="+_sTabeName+"]");
		if(!oLayerCheckbox.is(':checked')) {
			oLayerCheckbox.trigger("click");
		}
		
		oLayerCheckbox.closest('.TreePd').find('.Tree_Tx1 img.tabbutton').trigger("click");
		/*if(!oLayerCheckbox.is(':visible')) {
		}*/
		$("#searchFacilityPane .fcont2 .Tree_sTx input[type=checkbox]").prop("disabled", true);
	}
	
	/**
	* @memberof USV.REGISTER
	* @method 
	* @description 공간검색 결과 내에 속성 재검색을 종료하는 함수
	* @author 이상호(2016.07.29)
	*/
	var fn_close_rescan = function() {
		$("#searchFacilityPane .fcont2 .Tree_sTx input[type=checkbox]").prop("disabled", false);
		SEARCH.fn_set_bReScanCheck(false);
		$("#searchFacilityPane .fcont2 .Tree_sTx input[type=checkbox]:checked").trigger('click');
		var aLayerTree = $('#searchFacilityPane .fcont2 .treebx .TreePd');
		for(var i=0,len=aLayerTree.length;i<len;i++) {
			var oLayerTree = $('.fcont2 .treebx .TreePd').eq(i);
			if(oLayerTree.find('.Tree_sTx').is(':visible')) {
				oLayerTree.find('.Tree_Tx1 img.tabbutton').trigger("click");
			}
		}
	}

//------------------------------------------------------------------------------------------------------------------
//## public 메소드
//------------------------------------------------------------------------------------------------------------------
	_mod_register.fn_search_register					=	fn_search_register;
	_mod_register.fn_edit_feature						=	fn_edit_feature;
	_mod_register.fn_search_feature						=	fn_search_feature;
	_mod_register.fn_move_toFeatures					=	fn_move_toFeatures;
	_mod_register.fn_view_detailRegister				=	fn_view_detailRegister;
	_mod_register.fn_view_register						=   fn_view_register;
	_mod_register.fn_get_menuInfo						=   fn_get_menuInfo;
	_mod_register.fn_search_newFeature					=	fn_search_newFeature;
	_mod_register.fn_save_excel							=	fn_save_excel;
	_mod_register.fn_update_pluralRegister				=	fn_update_pluralRegister;
	_mod_register.fn_insert_maintenance 				=  fn_insert_maintenance;
	_mod_register.fn_update_wutlHtBatch					=	fn_update_wutlHtBatch;
	_mod_register.fn_open_nJDSKWindow					=	fn_open_nJDSKWindow;
	_mod_register.fn_update_checkonAllRowOnJQGrid		=	fn_update_checkonAllRowOnJQGrid;
	_mod_register.fn_remove_feature						=	fn_remove_feature;
	_mod_register.fn_delete_register					=   fn_delete_register;
	_mod_register.fn_change_selectRegister				=	fn_change_selectRegister;
	_mod_register.fn_search_layerMap					=	fn_search_layerMap;
	_mod_register.fn_check_editShpae					=	fn_check_editShpae;
	_mod_register.fn_check_moveToFeature				=	fn_check_moveToFeature;
	
	_mod_register.fn_get_searchLayerMap					=	fn_get_searchLayerMap;
	_mod_register.fn_set_searchLayerMap					=	fn_set_searchLayerMap;
	_mod_register.fn_select_fidRow						=	fn_select_fidRow;
	_mod_register.fn_rescan_searchData					=	fn_rescan_searchData;
	_mod_register.fn_close_rescan						=	fn_close_rescan;
	_mod_register.fn_hide_allWindows					=	fn_hide_allWindows;
//------------------------------------------------------------------------------------------------------------------

return _mod_register;
	
}(USV.REGISTER || {}, jQuery));