/**
 * 지도 편집 기능
 * @namespace {Object} USV.MAP_EDITOR
 */
var editor;

USV.MAP_EDITOR = (function(_mod_map_editor, $, undefined){

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 레이어별 편집 룰을 담고 있는 Global Object
* @author 윤은희(2016.04.19)
*/
var oEditRuleInfo = {};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 도로시설물 중 가로수, 가로등에 대한 DIV 정보 별도 관리 - 예외처리
* @author 윤은희(2016.06.08)
*/
var sAdvancedEditExtra = $('#divEditOptionRDL #divAdvancedEdit');

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 위치정보를 찾게될때 기준이 되는 시설물 및 기준 필드
* @author 윤은희(2016.07.26)
*/
var aPositionLayerInfo = [{'layer' : 'BML_HADM_AS', 'field' : 'HJD_CDE'}, 
	                          	{'layer' : 'BML_BADM_AS', 'field' : 'BJD_CDE'},
	                          	{'layer' : 'BML_I005_AS', 'field' : 'SHT_NUM'}];


var oSearchTreeData = {};

var fn_init_searchTreeData = function(){
	oSearchTreeData = {};
}

var fn_set_searchTreeData = function(_oData){
	oSearchTreeData = _oData;
}

var fn_get_searchTreeData = function(){
	return oSearchTreeData;
}
/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집관련 Object의 구조 정보를 가지고 있는 Object 리턴
* @author 최재훈(2016.08.26)
*/
var fn_get_objFactory = function(){
	return objFactory;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 위치정보를 찾게될때 기준이 되는 시설물 및 기준 필드 값 (aPositionLayerInfo) 리턴
* @author 최재훈(2016.08.26)
*/
var fn_get_aPositionLayerInfo = function(){
	return aPositionLayerInfo;
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집에 필요한 컨트롤을 등록하고 편집 객체를 생성한다
* @author 최재훈(2015.07.30 )
*/
var fn_init_editor = function (){

	editor = new usvEditor(map, {
		editLayer : new NUTs.Layer.Vector('editVectorLayer'),
		refLayer : new NUTs.Layer.Vector("refVectorLayer"),
		styleLayer : new NUTs.Layer.Vector('styleVectorLayer'),
		searchLayer : new NUTs.Layer.Vector('searchVectorLayer'),
		effectLayer : new NUTs.Layer.Vector('effectVectorLayer'),
		shpLayer : new NUTs.Layer.Vector('shpVectorLayer'),
        activeControls: ['Navigation',
                         'SnappingSettings',
                         'CADTools',
                         'CustomTransformFeature',
                         'Separator',
                         'DeleteFeature',
                         'DeleteAllFeature',
                         'CustomDragFeature',
                         'SelectFeature',
                         'SplitFeature',
                         'MergeFeature',
                         'Separator',                         
                         'DeleteVertex',
                         'CustomModifyFeature',
                         'Separator',
                         'UndoRedo',
                         'DrawRefLine',
                         'DivideLine',
                         'DividePolygon'],
        editorControls: ['CleanFeature',
                         'DeleteFeature',
                         'DeleteAllFeatures',
                         'Dialog',
                         'DrawRegular',
                         'DrawText',
                         'ImportFeature',
                         'MergeFeature',
                         'SplitFeature',
                         'CADTools',
                         'ContextMenu',
                         'UndoRedo']
    });

	fn_set_editLayerSchemaInfo(COMMON.fn_get_editLayerInfo());
	
	STYLE.fn_init_editLayerList(COMMON.fn_get_editLayerInfo()); //편집레이어 목록 표출	
	
	editor.editLayer.events.on({"vertexclicked": function report(event) {
        alert('vertexclicked');
		//console.log(event.type, event.feature.id);

        // change the color - sure !
        editor.editLayer.drawFeature(event.feature, "blink");

        // do more - popup to delete the vertex
        c = [];
        c.push("Selected feature id: ");
        c.push(editor.editLayer.selectedFeatures[0].id);
        c.push("\nSelected vertex id: ");
        c.push(event.feature.id);
        c.push("\n\nRemove this vertex?")
        var removeVertex = confirm(c.join(""));
        if (removeVertex) {
            // I noticed that the ModifyFeature control doesn't have
            // a method to manage a vertices removal, it's only done inside
            // the 'handleKeypress' callback method... but it doesn't
            // prevent us from using it :) so we'll emulate a 'delete' key
            // pressed
        	var ctrl = map.getControl("CustomModifyFeature");
        	if(ctrl) {
        		modify.dragControl.feature = event.feature;
	                modify.handleKeypress({keyCode: 46});
        	}

        } else {
            // simply redraw the vertex back to its default style
        	editor.editLayer.drawFeature(event.feature, "default");
        }
    }});
	editor.searchLayer.events.on({
		multifeatureclick: function(e) {
			if(editor.editMode){
				
			} else {
				var aFeatures = e.feature;
				var aFids = [];
				for(var i in aFeatures) {
					var oFeature = aFeatures[i];
					var sFid = fn_get_fidByFeature(oFeature);
					aFids.push(sFid);
				}
				if(aFids.length>0) window.parent.REGISTER.fn_select_fidRow(aFids);
			}
        },
        featureover: function(e) {
        	$(e.element).css("cursor", "pointer");
        },
        featureout: function(e) {
    		$(e.element).css("cursor", "default");
        },
        beforefeaturesadded: function(e) {
        	var aFeatures = e.features;
        	for(var i in aFeatures) {
        		var oFeature = aFeatures[i];
        		var sFid = fn_get_fidByFeature(oFeature);
        		if(this.getFeatureByFid(sFid) != null) {
        			return false;
        		}
        	}
        	return true;
        }
	});
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 레이어 선택(변경)시 혹은 편집모니터에서 편집중인 시설물이 아닌 다른 시설물의 id를 더블클릭을 한 경우 호출되며, 참조 레이어 on/off, 스냅 설정(WFS 레이어 설정 포함) 처리
* @author 윤은희(2015.11.17)
* @param {String} _sLayer : 검색 대상 레이어 영문명
*/
var fn_init_editLayerSetting = function(_sLayer, _sCaller){

	debugger;
	editor.copyMode = false;
	//debugger;
	$.ajax({
		type: 'post',
		dataType: 'json',
		data: {
			selEditLayerValue : _sLayer
		},
		url: '/getEditMng.do',
		success: function(_oRes) {
			if(_oRes.result_refLyr.length > 0){

				//참조레이어 WMS Show/Hide처리
				fn_show_refLayer(_oRes);

				//편집모드 설정에 따른 초기화
				if(fn_check_editMode(false)) {
					fn_start_edit();
					STYLE.fn_init_editLayerList(COMMON.fn_get_editLayerInfo(), true);//편집시설물 선택 초기화
				}

				//참조레이어 WFS Show 처리
				if(_oRes.result_refLyr.length > 0){
					fn_init_wfs(editor.preEditedLayerName, _sCaller);
				}
				
				if(!fn_check_editMode(false)) 
					fn_show_middleEditFeatures(); //편집모드가 아니어도 편집중인(중간저장된)개체는 화면에 표출처리 필요
				
				//지도 refresh
				MAP.fn_redraw_wms();

				//이전 편집 레이어명 SET --> 편집대상 레이어변경 시 참조레이어도 변경처리 필요.
				editor.preEditedLayerName = _sLayer;


				// map 축척 체크
				if(parseInt(map.getScale(), 10) > 5000)
					COMMON.showMessage('알림 & 축척을 1:5,000이하로 조정하여 주세요');

				//스냅레이어 설정 및 UI구성
                fn_init_snapMng(_sLayer);

                //편집이력 hide
                $('#timeLinBx').hide();
                
                var oDataTool = MAP.fn_get_dataTool();
                var oWorkingShp = MAP.fn_get_dataTool().getShp();
                
                if(oDataTool && oWorkingShp){
                	oWorkingShp.selectedFeature = null;
                	oWorkingShp.editLayerName = _sLayer;
                }
			}
			map.getControl('getFeature').setTables(COMMON.fn_get_EditKorLayerNm(_sLayer));

			//고급 편집 UI 구성
            fn_make_advancedEditHtml(_sLayer, AdvancedEditDefinition[_sLayer]);

            //편집 룰 UI 구성
            fn_make_editRuleHtml(_sLayer, EditRuleDefinition[_sLayer]);
		},
		error: function(xhr, status, error) {
			COMMON.showMessage('오류 & fn_init_editLayerSetting()함수 수행 중 오류가 발생하였습니다.');
		}
	});
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @private
* @description 편집 가능 레이어의 스키마 정보(g2_DATASETID, g2_TABLENAME, g2_NAME, g2_ALIAS, g2_DATATYPE, g2_LENGTH, g2_PRECISION, g2_SCALE) 가져오기
* @author 최재훈(2015.11.17)
*/
var fn_set_editLayerSchemaInfo = function (_oEditLayerInfo){
	var nLayerLen = _oEditLayerInfo.length;
	var aLayerList = [];

	for(var i = 0; i < nLayerLen ; i++){
		aLayerList.push(_oEditLayerInfo[i].lyrEngNm);
	}
	
	// 위치정보를 찾게될때 기준이 되는 시설물 별도 추가
	for(var idx in aPositionLayerInfo){
		if($.inArray(aPositionLayerInfo[idx]['layer'], aLayerList) === -1)
			aLayerList.push(aPositionLayerInfo[idx]['layer']);
	}

	var sLayerList = aLayerList.join(',');

	$.ajax({
		type: 'post',
		dataType: 'json',
		data: {
			sEditLayerList : sLayerList
		},
		async: false,
		url: '/getEditLyrSchemaInfo.do',
		success: function(_oRes) {

			var oFieldsAliasInfo = {};
			var oFieldsValue = {};
			var oFieldsInfo = {};
			var nResultLen = _oRes.result_lyrSchema.length;
			var sPreTableNm = '';
			var sAftTableNm = '';

			for(var i=0; i<nResultLen; i++){
				var oAftLyrSchemaInfo;
				var oLyrSchemaInfo = _oRes.result_lyrSchema[i];

				if(nResultLen >= (i+1)){
					oAftLyrSchemaInfo = _oRes.result_lyrSchema[i+1];
					if(oAftLyrSchemaInfo)
						sAftTableNm = oAftLyrSchemaInfo.g2_TABLENAME.toUpperCase();
				}
				//컬럼명 alias 정보 추출
				var sTableNm = oLyrSchemaInfo.g2_TABLENAME.toUpperCase();
				var sFieldNm = oLyrSchemaInfo.g2_NAME.toUpperCase();
				var sFieldAlias = oLyrSchemaInfo.g2_ALIAS;


				if(i === 0 || sTableNm !== sPreTableNm){
					editor.layerColumnInfo[sTableNm] = {
							fieldAlias : [],
							fieldValue : [],
							fieldInfo : {}
					};

					oFieldsAliasInfo = {};
					oFieldsValue = {};
					oFieldsInfo = {};
				}

				var oFieldInfo = {};
				//g2_TABLENAME, g2_NAME, g2_ALIAS, g2_DATATYPE, g2_LENGTH, g2_PRECISION, g2_SCALE 값 설정
				for(var sFieldInfoNm in oLyrSchemaInfo ){
					if(sFieldInfoNm.indexOf('g2_') > -1)
						oFieldInfo[sFieldInfoNm] = oLyrSchemaInfo[sFieldInfoNm];
				}

				oFieldsAliasInfo[sFieldNm] = sFieldAlias;
				oFieldsValue[sFieldNm] = '';
				oFieldsInfo[sFieldNm] = oFieldInfo;


				if(i !== 0 && (i === (nResultLen-1) || sTableNm !== sAftTableNm)){
			 					
					editor.layerColumnInfo[sTableNm].datasetId = oLyrSchemaInfo.g2_DATASETID;	//DATASETID 설정
					editor.layerColumnInfo[sTableNm].fieldAlias = oFieldsAliasInfo;	//컬럼의 Alais정보 설정
					editor.layerColumnInfo[sTableNm].fieldValue = oFieldsValue;		//컬럼의 목록 및 빈값 설정
					editor.layerColumnInfo[sTableNm].fieldInfo = oFieldsInfo;		//컬럼의 목록 및 빈값 설정
					

					$.ajax({
						type: 'post',
						dataType: 'json',
						data: {
							editLayer : sTableNm
						},
						async: false,
						url: '/getDomainInfo.do',
						success: function(_oRes) {
							
							editor.layerColumnInfo[sTableNm].domainInfo = _oRes.domainInfo;		//컬럼의 도메인정보 설정
							//editor.layerColumnInfo[레이어명].domainInfo.컬럼명 에 코드값 key, val로 SET 처리됨
						},
						error: function(xhr, status, error) {
							COMMON.showMessage('오류 & ['+ sTableNm + '-'+ sFieldNm +']도메인 정보 추출 중 오류가 발생하였습니다 err [' + error + ']');
							return false;
						}
					}); 
					
				}

				sPreTableNm = sTableNm;

			}
		},
		error: function(xhr, status, error) {
			COMMON.showMessage('편집오류 & 편집레이어의 스키마 정보 추출중 오류 발생 err [' + error + ']');
		}
	});
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 시작 처리 - 편집모드설정, 초기화(편집관련 벡터레이어상 feature 삭제, oEditingData 초기화, 편집중 feature 불러오기)
* @author 최재훈(2015.11.20 )
*/
var fn_start_edit = function (){

	//편집중 feature 삭제
	editor.editLayer.removeAllFeatures();
	editor.styleLayer.removeAllFeatures();
	editor.effectLayer.removeAllFeatures();
	editor.oSearchResult = null;
	//editor.selectedFeatures = [];

	var sEditingLayerName = COMMON.fn_get_editingLayer(this);

	if(sEditingLayerName) {

		STYLE.releaseSelect = false;

		var aSearchTarget = new Array(sEditingLayerName);

		map.getControl('getFeature').setTables(aSearchTarget);	//검색대상 레이어 지정
		editor.initEditingFeatureObj();		//편집중인 feature 정보(편집모니터) 초기화
		editor.startEditMode();			//편집모드 시작 설정
		//fn_sync_middleEditList();		//WFS-T 성공후 db 이상문제등으로 인해 편집객체가 중간저장 테이블에서 삭제되지 않았을 경우에 대한 잔여객체 싱크처리
		fn_get_middleEditList();		//편집중인 feature 정보(편집모니터) 추출

		MAP.fn_redraw_wms(); 			//지도 다시 그리기

		$('#drawPane').hide();
		$('#editPane').show();
		$('.olEditorControlEditorCustomPanel').hide();
	}

};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 검색결과창의 tree 구성
* @author 최재훈(2015.08.20 )
* @param {Object} _oTreeElement : tree를 표출할 main HTML element
* @param {Object} _oContentElement : node중 하나를 선택할 때 컨텐츠를 보여줄 HTML element
* @param {Object} _oRes : 검색결과를 가지고 있는 response객체
*/
var fn_create_searchList = function (_oTreeElement, _oContentElement, _oRes){

	editor.oSearchResult = _oRes;
	var sTblName = _oRes.data[0].table;
	var sSelectedG2Id =_oRes.data[0].results[0].g2id;

	$("#searchContent").text('');

	_oTreeElement.jstree({
		"core" : {
			"initially_open" : [sTblName]
		},
        "plugins": ["themes", "json_data", "ui", "contextmenu"],
        "ui": {
            "select_limit": -1,
            "select_multiple_modifier": "ctrl", //중복 선택시 사용할 키
            "selected_parent_close": "select_parent"
        },
		"json_data" : fn_create_searchTreejsonByRes(_oRes),
		"themes" : { "theme" : "default" },
		"contextmenu" : {
			 "show_at_node" : false,
			 "items" : {
				"create" : false,
				"rename" : false,
				"remove" : false,
				"ccp" : false,
				"user_define" : {
		            "label" : "편집하기",
		            "action" : function (_oEvt) {
		            	var sSelectedG2Id  = $.trim(_oEvt[0].innerText);
		            	var sTblName = $.trim(_oEvt[0].parentNode.previousSibling.innerText);

		            	fn_update_filterOnWFSLayer(sTblName, sSelectedG2Id);
		            	fn_start_editFeature(_oRes, sSelectedG2Id , sTblName);

		             }

		          },
		     }
		}
	});

	_oTreeElement.bind("select_node.jstree", function(_oEvt, _oData) {
		var sSelectedG2Id  = _oData.inst.get_text();
		var nSelectedIdx;
		//편집 버튼 노출
		 if(!$("#attrSearchList .jstree-clicked").next()[0]){

			$("#attrSearchList .btnFeatureEdit").remove();

			var sSearchG2Id = 'searchG2Id_'+ sSelectedG2Id ;
			var oImgEl = '#searchG2Id_'+ sSelectedG2Id ;
			$("#attrSearchList .jstree-clicked").after("&nbsp;&nbsp;<a class='btnFeatureEdit' alt='편집' id='"+ sSearchG2Id +"' style='display:inline-block;cursor:hand;'><img src='/images/usolver/com/map/icon/edit.gif' style='cursor:point;' />편집</a>");
			$(oImgEl).on('click', function(){
				fn_update_filterOnWFSLayer(sTblName, sSelectedG2Id);
				fn_start_editFeature(_oRes, sSelectedG2Id , sTblName);
			});
		} 

		if(!isNaN(sSelectedG2Id )) {
			var aListStr = [];
			aListStr.push("<ul>");
			var oResData = _oRes.data[0];
			var tmpCopyFeatureFld = {};
			
			for(var j = 0, nLen=oResData.results.length ; j<nLen;j++){
				if(sSelectedG2Id == oResData.results[j].g2id){
					nSelectedIdx = j;
					break;
				}
			}
			
			for(var i in oResData.results[nSelectedIdx].fields) {
				/*if(editor.copyMode){
					tmpCopyFeatureFld[i] = oResData.results[0].fields[i];
				}*/
				aListStr.push("<li class='ui-state-default'><label style='width:110px;display:inline-block;'>"+ fn_replace_fieldName(oResData.table, i) + "</label> : " + oResData.results[nSelectedIdx].fields[i] +"</li>");
			}
			//editor.copiedField = tmpCopyFeatureFld;
			aListStr.push("</ul>");
			_oContentElement.html(aListStr.join(""));
		}
	});

	_oTreeElement.on("dblclick.jstree", function(_oEvt) {
		var sG2Id = String(_oEvt.target.innerText);
		sG2Id = $.trim(sG2Id);

		var sTblName = _oEvt.target.parentNode.parentNode.parentNode.id;
		sTblName = $.trim(sTblName);
		sEditingLayer = sTblName;

		if(sEditingLayer){

			if(!isNaN(sG2Id)) {

				//var aFieldInfoStr = [];

				editor.oSearchResult = null;
				
				sG2Id = String(sG2Id);

				//속성표출
				if(!isNaN( sG2Id )) {
					var aListStr = [];
					aListStr.push("<ul>");
					var oResData = _oRes.data[0];
					var tmpCopyFeatureFld = {};
					for(var i in oResData.results[0].fields) {

						aListStr.push("<li class='ui-state-default'><label style='width:110px;display:inline-block;'>"+ fn_replace_fieldName(oResData.table, i) + "</label> : " + oResData.results[0].fields[i] +"</li>");
					}
					//editor.copiedField = tmpCopyFeatureFld;
					aListStr.push("</ul>");
					_oContentElement.html(aListStr.join(""));
				}

				var oTmpFeatures;
				var sTmpStyleName;
				var oTmpLayer;
				//선택된 feature Highlight처리 및 이동
				//검색한경우"shpViewVector_BML_GADM_AS"
				var sShpLayer = map.getLayerByName("shpViewVector_"+sTblName) ;
				
				if(editor.searchLayer.features.length > 0){
					editor.editLayer.removeAllFeatures();
					oTmpLayer = editor.searchLayer;
					oTmpFeatures = editor.searchLayer.features;
					sTmpStyleName = 'delete';
				}
				else if(editor.shpLayer.features.length > 0){ //shp로딩 등의 경우
					oTmpLayer = editor.shpLayer;
					oTmpFeatures = editor.shpLayer.features;
					sTmpStyleName = sTblName.toLowerCase();
				}
				else if(editor.editLayer.features.length > 0){ 
					oTmpLayer = editor.editLayer;
					oTmpFeatures = editor.editLayer.features;
					sTmpStyleName = sTblName.toLowerCase();
				}
				else if(sShpLayer.features.length > 0){
					oTmpLayer = sShpLayer;
					oTmpFeatures = sShpLayer.features;
					sTmpStyleName = sTblName.toLowerCase();
					
				}
				
				var oDataTool = MAP.fn_get_dataTool();
				var oWorkingShp = oDataTool.getShp();
				//이전 선택 feature는 최초 로딩된 스타일로..draw
				if(oTmpLayer && oWorkingShp && oWorkingShp.selectedFeature){
					oTmpLayer.drawFeature(oWorkingShp.selectedFeature, 'dataload');
				}
				if(oTmpLayer){
					var oSelectedFeature = editor.getFeatureByFid(oTmpLayer,sTblName.concat('.', sG2Id));
					
					if(oSelectedFeature){
						oTmpLayer.drawFeature(oSelectedFeature, 'default');
						oTmpLayer.drawFeature(oSelectedFeature, 'default');
						
						//검색결과 SET - 2017.03.23
						var oGInnerFeature = editor.createFeature(oSelectedFeature, sTblName.concat('.', sG2Id));
						var oMadeResObj = fn_create_responseObj(oGInnerFeature, sTblName, null, null, sG2Id);
						editor.oSearchResult = oMadeResObj;
						
						if(oWorkingShp)
							oWorkingShp.selectedFeature = oSelectedFeature;
						
						var featureBounds;
						if(oSelectedFeature.bounds)
							featureBounds = oSelectedFeature.bounds;
						else
							featureBounds = editor.getBoundsByGeometry(oSelectedFeature.geometry);

						if(featureBounds){
							var featureExtent = new NUTs.Bounds(featureBounds.left, featureBounds.bottom, featureBounds.right, featureBounds.top);
							map.zoomToExtent(featureExtent);
						}
					}
				}

				/*for(var j=0,len=oTmpFeatures.length; j<len; j++){
					var oSVFeature = oTmpFeatures[j];

					//if(sTblName === fn_get_tblNameByFeature(oSVFeature)){

						if(sG2Id == fn_get_g2idByFeature(oSVFeature)){
							oTmpLayer.drawFeature(oSVFeature, 'select');
						}
						else{
							oTmpLayer.drawFeature(oSVFeature, sTmpStyleName);
						}

						var featureBounds;
						if(oSVFeature.bounds)
							featureBounds = oSVFeature.bounds;
						else
							featureBounds = editor.getBoundsByGeometry(oSVFeature.geometry);

						if(featureBounds){
							var featureExtent = new NUTs.Bounds(featureBounds.left, featureBounds.bottom, featureBounds.right, featureBounds.top);
							map.zoomToExtent(featureExtent);
						} 
				}*/
				
			}
		}

	});
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집모드인지 여부 확인 후 편집모드이면 true 리턴, 아니면 메시지 창 표출
* @author 최재훈(2015.08.20 )
* @param {Boolean} _bFlag : 안내멘트 표출 여부
* @returns {Boolean} 편집모드여부
*/
function fn_check_editMode(_bFlag){
	
	if(MAP.fn_check_userAuthor('edit')){
	
		if(editor.editMode)
			return true;
		else{
			if(_bFlag !== false) {
				COMMON.showMessage('편집오류 - 편집모니터 실행 & 편집모드가 아닙니다. <br/><br/>편집대상 레이어를 선택한 후 [도형편집 시작]을 클릭해주세요',1200);
				return false;
			}
		}
	}
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 검색결과창에서 특정 feature선택 후 [편집]모드로 전환할 때 필요한 과정 처리.
* @author 최재훈(2015.08.20 )
* @param {Object} _oRes : 검색결과를 가지고 있는 response obj
* @param {String} _sSelectG2Id : 검색결과중 선택된 feature의 G2 id
* @param {String} _sTblName : 검색대상 레이어명(영문)
* @param {Boolean} _bStyleDraw : StyleVectorLayer에 Style 추가시, DrawStyle or UnDrawStyle로 그릴지
*/
function fn_start_editFeature(_oRes, _sSelectG2Id, _sTblName, _bStyleDraw){
	$(".ui-dialog").css("z-index","9999");
	$("#editMonitor").dialog({
		width : 570,
		height : 450
	});
	//fn_create_jsonDataByFid(_oRes, _sSelectG2Id, 2);
	fn_create_editingFeature(_oRes, _sSelectG2Id, 2);
	fn_show_editMonitor($("#editListTree"),$("#editContent"),_sTblName,_sSelectG2Id, 2);

	// remove this wfsfeature of the WFSVectorLayer - ehyun 2016.3.4
	editor.removeFeatureOnMapLayer(_sTblName, _sSelectG2Id);

	// oStyleVectorLayer 추가
	var sLayerName = $.trim(COMMON.fn_get_EditEngLayerNm(_sTblName));
	var oFeature = _oRes.data[0].results[0].feature;


	//검색레이어상 feature 삭제
	if(editor.searchLayer != null) {
		editor.searchLayer.removeAllFeatures();
	}

	var oGInnerFeature = editor.createFeature(oFeature, sLayerName.concat('.', _sSelectG2Id));

	//====[선택된 feature editLayer에 표출]================================================================================================
	editor.addDrawFeature(editor.editLayer, oGInnerFeature, 'select');
	map.setLayerIndex(editor.editLayer, map.layers.length-1);

	//====[선택된 feature 정보 SET]================================================================================================
	//editor.selectedFeatures.push(oGInnerFeature);

	//====[검색결과(편집대상) 갱신 SET]================================================================================================
	editor.searchLayer.removeAllFeatures();
	var oMadeResObj = fn_create_responseObj(oGInnerFeature, _sTblName, null, null, _sSelectG2Id);
	if(oMadeResObj.data[0].results.length > 0)
		editor.oSearchResult = oMadeResObj;
	
	//====[선택된 feature 경계 표출]================================================================================================
	if(COMMON.fn_get_EditLayerType(_sTblName).toUpperCase() !== "POINT")
		fn_draw_oneFeatureBorder(oGInnerFeature);
	
	
	/*if(_bStyleDraw){
		editor.addDrawFeature(editor.styleLayer, oGInnerFeature, sLayerName);
	}
	else{
		editor.addUnDrawFeature(editor.styleLayer, oGInnerFeature, '');
	}*/
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집모니터창의 tree 개체 있을 경우 json_data만 갱신처리
* @author 최재훈(2016.06.16 )
* @param {Object} _oListEl 		: 목록이 표출될 HTML element Obj
* @param {Object} _oContentEl 	: 목록중 클릭된 상세정보 표출할 HTML element Obj
* @param {String} _sTblName 	: 초기선택 레이어명(영문)
* @param {String} _sG2Id 	: 초기선택 Featuer의 G2Id
*/
function fn_show_editMonitor(_oListEl, _oContentEl, _sTblName, _sG2Id){
	/*var oJSTree = $.jstree._reference(_oListEl);
	var bExistData = false;

	if(oJSTree) {
		bExistData = oJSTree._get_settings().json_data
	}
	//이미 jstree Object를 생성했으면 갱신만...
	if(bExistData) {
		oJSTree._get_settings().json_data = fn_create_editTreejsonByObj();
		oJSTree.refresh(-1);
	}
	else{*/
		fn_create_editMonitor(_oListEl, _oContentEl, _sTblName, _sG2Id);
	//}
}

function fn_show_fieldInfo(_oContentEl, _oEmSelectFeatureObj, _sTblName, _sG2Id){
	
	for(var sFldName in _oEmSelectFeatureObj.properties) {

		
		(function(sFldName) {
			
			// fieldName 한글처리
			var sLblFldName = fn_replace_fieldName(_sTblName,sFldName);
			var sDbVal = _oEmSelectFeatureObj.properties[sFldName];

			var oFieldInfo = editor.layerColumnInfo[_sTblName].fieldInfo[sFldName];
			var oDomainInfo = editor.layerColumnInfo[_sTblName].domainInfo[sFldName];
			
			if(oFieldInfo){
				var sName 		= oFieldInfo.g2_NAME;
				var sType 		= oFieldInfo.g2_DATATYPE;
				var sDomainType = oFieldInfo.g2_DOMAIN_TYPE;
				var nDataLength = oFieldInfo.g2_LENGTH;
				var nPrecision 	= oFieldInfo.g2_PRECISION;
				var nScale 		= oFieldInfo.g2_SCALE;
	 			
				var sExceptTable = ['WTL_VALV_PS','WTL_MANH_PS','WTL_FIRE_PS','SWL_PIPE_AS','SWL_PIPE_LM']; //--> 지형지물을 코드로 보여줘야하는 레이어 목록
				var bDomainColumn = false;
				
				$(_oContentEl).append($('<ul/>', {
		            id		: 'ul_'+sFldName
		        }));
				
				$('#ul_'+sFldName).append($('<li/>', {
		            id		: 'li_'+sFldName
		            ,class	: 'show_property'
		        }));
				
				$('#li_'+sFldName).append($('<label/>', {
		            id		: 'label_'+sFldName,
		            style	: 'width:110px;display:inline-block;',
		            text	: sLblFldName
		        }));
				
				if((sExceptTable.lastIndexOf(_sTblName) > -1 && sName == "FTR_CDE") || (String(sDomainType) == "2" && sName != "FTR_CDE")){
					bDomainColumn = true;
				}
				
				if(bDomainColumn) {
					$('#label_'+sFldName).after($('<select/>', {
			            id		: sFldName,
			            name	: sFldName,
						style	: 'width:150px;max-width:150px;'
			        }));
	
					$("#"+sFldName).append($('<option/>', {
						value		: '',
						text		: '선택'
					}));
					
					for(var item in oDomainInfo){ 
						
						if(sDbVal == item) {
							$("#"+sFldName).append($('<option/>', {
								value		: item,
								text		: oDomainInfo[item],
								selected	: 1
							}));
						}
						else{
							$("#"+sFldName).append($('<option/>', {
								value		: item,
								text		: oDomainInfo[item]
							}));
						}
					}
					
	
	
					$('#'+sFldName).on("mousedown",function(){
						editor.setPreValue(this);
					});
	
					$('#'+sFldName).on("mouseup",function(){
						MAP_EDITOR.fn_check_fldValueChange(this, _sTblName, _sG2Id, sLblFldName, sType, nDataLength, nPrecision, nScale);
					});
					
				}
				else{
					
					$('#label_'+sFldName).after($('<input/>', {
			            type	: 'text',
			            id		: sFldName,
			            value	: sDbVal,
						style	: 'width:142px;max-width:142px;'
			        }));
	
					$('#'+sFldName).on("mousedown",function(){
						editor.setPreValue(this);
					});
	
					$('#'+sFldName).on("blur",function(){
						MAP_EDITOR.fn_check_fldValueChange(this, _sTblName, _sG2Id, sLblFldName, sType, nDataLength, nPrecision, nScale);
					});
					
				}
				
				if(sName === "FTR_IDN"){
					$('#'+sFldName).attr("readonly", true);
					$('#'+sFldName).attr("disabled", true);
				}
				
			}
			
			
		})(sFldName);
	}	
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집모니터창의 tree 구성 및 이벤트 등록
* @author 최재훈(2015.08.19  )
* @param {Object} _oListEl 		: 목록이 표출될 HTML element Obj
* @param {Object} _oContentEl 	: 목록중 클릭된 상세정보 표출할 HTML element Obj
* @param {String} _sTblName 	: 초기선택 레이어명(영문)
* @param {String} _sG2Id 	: 초기선택 Featuer의 G2Id
*/
function fn_create_editMonitor(_oListEl, _oContentEl, _sTblName, _sG2Id){

	var sEditingLayer = COMMON.fn_get_editingLayer();

	if(editor.editingFeatures === null)
		_oContentEl.html('');

	_oListEl.jstree({
		"core" : {
			"initially_open" : [sEditingLayer]
		},
        "plugins": ["themes", "json_data", "ui", "contextmenu"],
        "ui": {
            "select_limit": -1,
            "select_multiple_modifier": "ctrl", //중복 선택시 사용할 키
            "selected_parent_close": "select_parent",
            "initially_select" : [_sG2Id]
        },
		"json_data" : fn_create_editTreejsonByObj(),
		"themes" : { "theme" : "default" },
		"contextmenu" : {
			 "show_at_node" : false,
			 "items" : {
				"create" : false,
				"rename" : false,
				"remove" : false,
				"ccp" : false,
				"user_define" : {
		            "label" : "중간 저장하기",
		            "action" : function (_oEvt) {

		            	var sG2Id = String($.trim(_oEvt[0].innerText));
		            	var sTblName = $.trim(COMMON.fn_get_EditEngLayerNm(_oEvt[0].parentNode.previousSibling.innerText));

		            	fn_call_saveMiddleBridge(sTblName, sG2Id);

		             }

		          }
		     }
		}

	});

	_oListEl.bind("select_node.jstree", function(_oEvt, _oData) {
		var sG2Id = $.trim(String(_oData.inst.get_text()));
		if(_oData.inst.get_selected()[0].parentNode.previousSibling) {
			
			var sTblName = $.trim(COMMON.fn_get_EditEngLayerNm(_oData.inst.get_selected()[0].parentNode.previousSibling.innerText));
			if(sG2Id){
				//중간저장 버튼 노출
				if(!$("#editMonitorList .jstree-clicked").next()[0]){

					$("#editMonitorList .btnFeatureSave").remove();
					$("#editMonitorList .btnFeatureDel").remove();

					var sEditG2Id = 'editG2Id_'+ sG2Id;
					var sDelG2Id = 'delG2Id_'+ sG2Id;
					var oImgEl = '#editG2Id_'+ sG2Id;
					var oImgElDel = '#delG2Id_'+ sG2Id;
					$("#editMonitorList .jstree-clicked").after("&nbsp;<a class='btnFeatureSave' alt='중간저장' id='"+ sEditG2Id +"' style='display:inline-block;cursor:hand;'><img src='/images/usolver/com/map/icon/save.gif' style='cursor:point;' />중간저장</a>" +
							"&nbsp;<a class='btnFeatureDel' alt='삭제' id='"+ sDelG2Id +"' style='display:inline-block;cursor:hand;'><img src='/images/usolver/com/map/icon/edit.gif' style='cursor:point;' />삭제</a>");
					$(oImgEl).on('click', function(){					
						fn_call_saveMiddleBridge(sTblName, sG2Id);
					});
					$(oImgElDel).on('click', function(){	// 2016.10.07 ehyun. 객체 개별 삭제 기능 추가 - 삭제 순서 중요.
						var oSuccessFeature = {
								name : sTblName,
								g2Id : sG2Id
						};
						deleteMidSaveFeature(oSuccessFeature);		// 중간저장 테이블에서 삭제
						fn_del_filterOnWFSLayer(sTblName, sG2Id);	// wfs filter에서 해당 객체삭제
						// wfs layer의 feature로 추가
						var oWfsLayer = map.getLayerByName(sTblName);
						if(oWfsLayer){
							var emJsonFeatureObj = editor.editingFeatures[sTblName][sG2Id];
							var sFId = sTblName.concat('.', sG2Id);
							var oGInnerFeature = editor.makeFeatureByPosList(emJsonFeatureObj.type, emJsonFeatureObj.posList, sFId, emJsonFeatureObj.properties);
							oGInnerFeature.attributes = emJsonFeatureObj.properties;
							oGInnerFeature.fid = sFId;
							oWfsLayer.addFeatures(oGInnerFeature);
							oWfsLayer.drawFeature(oGInnerFeature);
						}	
						fn_remove_featureOnEditingFeatures(sTblName, sG2Id);
						STYLE.fn_init_editTree();	
						editor.preMidSaveRes = null;
						fn_get_middleEditList();
						map.activeControls('drag');
					});
				}

				//속성 표출
				if(!isNaN(sG2Id)) {
					var oEmSelectTableObj = editor.editingFeatures[sTblName];
					var oEmSelectFeatureObj = editor.editingFeatures[sTblName][sG2Id];
					if(oEmSelectTableObj && oEmSelectFeatureObj){

						if(oEmSelectFeatureObj.properties){
							
							_oContentEl.html('');	

							fn_show_fieldInfo(_oContentEl, oEmSelectFeatureObj, sTblName, sG2Id); 

						}
					}

				}
			}
			
		} 

	});

	_oListEl.on("dblclick.jstree", function(_oEvt) {
		if(editor.copyMode)
			$("#btnCopyFeatureStop").trigger("click");
		
		var sG2Id = String(_oEvt.target.innerText);
		sG2Id = $.trim(sG2Id);
		editor.selectedG2Id = sG2Id;

		var sTblName = _oEvt.target.parentNode.parentNode.parentNode.id;
		sTblName = $.trim(sTblName);
		sEditingLayer = sTblName;
		editor.oSearchResult = null;
		//editor.selectedFeatures = [];
		
		if(editor.selectedG2Id && sEditingLayer){

			if(!isNaN(sG2Id)) {


				// 편집 모니터에 등록된 객체 더블클릭을 통해 현재 편집 레이어 변경시
				//====[편집 레이어 변경시 설정 변경]================================================================================================
				if(sEditingLayer !== $("div.editLayer").attr("id")){
					fn_set_editingLayer(sEditingLayer);

					fn_init_editLayerSetting(sEditingLayer, "dbclick");
					
					var sLayerCategory = sEditingLayer.substring(0,3);
					var aLayerItem = ['WTL','SWL','RDL'];

					for(var i=0, len=aLayerItem.length ; i<len; i++){
						if(sLayerCategory === aLayerItem[i])
							$('#divEditOption'+aLayerItem[i]).show();
						else
							$('#divEditOption'+aLayerItem[i]).hide();
					}
				}
			
				//var aFieldInfoStr = [];

				var emJsonFeatureObj = editor.editingFeatures[sTblName][sG2Id];

				sG2Id = String(sG2Id);
				var sFId = sTblName + "." + sG2Id;
				
				if(emJsonFeatureObj){


					editor.editLayer.removeAllFeatures();
					//SEARCH.fn_init_selectedFeatures();
					
					var oGInnerFeature = editor.makeFeatureByPosList(emJsonFeatureObj.type, emJsonFeatureObj.posList, sFId, emJsonFeatureObj.properties);
					
					var featureExtent = new NUTs.Bounds(parseFloat(emJsonFeatureObj.bounds.left), emJsonFeatureObj.bounds.bottom, parseFloat(emJsonFeatureObj.bounds.right), emJsonFeatureObj.bounds.top);
					map.zoomToExtent(featureExtent);

					var oDelStyleFeature = {};

					// editState = 4 or 0 인 styleLayer의 renderIntent를 다시 delete스타일로 초기화 해주는 작업 필요
					// 아래 과정(for문 - 더블클릭된 객체는 editState와 상관없이 시설물 편집 스타일로 그려야 하므로)을 거치면서 4 or 0인 스타일이 시설물 편집 스타일로 그리도록 설정하는 과정이 들어가므로,
					if(COMMON.isEmptyObject(oDelStyleFeature) === false)
						editor.styleLayer.drawFeature(oDelStyleFeature, 'delete');

					// 편집모니터에 신규 추가시, oStyleVectorLayer delete style로 추가하게 되므로, editvectorlayer를 아래코드(editor.editLayer.removeAllFeatures())에서 삭제해 버리면 모든 심볼이 사라게 되므로
					// 현재 편집모니터에 등록된 모든 개체 stylevectorlayer의 delete 스타일은 스타일 재 설정.

					//=====[스타일레이어의 feature 표출]===============================================================================================
					for(var j=0,len=editor.styleLayer.features.length; j<len; j++){
						var oSVFeature = editor.styleLayer.features[j];

						if(sTblName === fn_get_tblNameByFeature(oSVFeature)){
							var oEditingFeature = editor.editingFeatures[sTblName][fn_get_g2idByFeature(oSVFeature)];
							if(COMMON.isEmptyObject(oEditingFeature) === false){
								var nStyleLayerEditState = oEditingFeature.editState;


								if(sFId != oSVFeature.attributes.fid ){
									if(nStyleLayerEditState !== editor.editState['delete'] && nStyleLayerEditState !== editor.editState['pseudo'])
										editor.styleLayer.drawFeature(oSVFeature, sTblName.toLowerCase());
									else
										editor.styleLayer.drawFeature(oSVFeature, 'delete');
								}
								else{// 더블클릭된 객체	
									if(nStyleLayerEditState === editor.editState['delete'] || nStyleLayerEditState === editor.editState['pseudo']){
										editor.styleLayer.drawFeature(oSVFeature, 'delete'); //오동작 방지를 위해 다시 그리도록 함
										oDelStyleFeature = oSVFeature;
									}
									else
										editor.styleLayer.drawFeature(oSVFeature, sTblName.toLowerCase());										
								}
							}
						}
					}
					editor.deActivateAllEditControls();
					

					//====[속성표출]================================================================================================
					var oEmSelectTableObj = editor.editingFeatures[sTblName];
					var oEmSelectFeatureObj = editor.editingFeatures[sTblName][sG2Id];
					if(oEmSelectTableObj && oEmSelectFeatureObj){

						if(oEmSelectFeatureObj.properties){
							
							_oContentEl.html('');							

							fn_show_fieldInfo(_oContentEl, oEmSelectFeatureObj, sTblName, sG2Id); 

						}
					}
					
					//====[선택된 feature editLayer에 표출]================================================================================================
					editor.addDrawFeature(editor.editLayer, oGInnerFeature, 'select');
					map.setLayerIndex(editor.editLayer, map.layers.length-1);

					//====[선택된 feature 정보 SET]================================================================================================
					//editor.selectedFeatures.push(oGInnerFeature);

					//====[검색결과(편집대상) 갱신 SET]================================================================================================
					editor.searchLayer.removeAllFeatures();
					var oMadeResObj = fn_create_responseObj(oGInnerFeature, sTblName, null, null, sG2Id);
					if(oMadeResObj.data[0].results.length > 0)
						editor.oSearchResult = oMadeResObj;
					
					//====[선택된 feature 경계 표출]================================================================================================
					if(emJsonFeatureObj.type.toUpperCase() !== "POINT")
						fn_draw_oneFeatureBorder(oGInnerFeature);
				}
				//_oContentEl.html(aFieldInfoStr.join(''));
			}
		}

	});
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 자체 정의 response개체의 구조를 갖는 Object 생성 후 리턴
* @param {object} _oOlFeature : openlayers의 feature를 활용 자체 정의한 feature Obj
* @param {String} _sLayerName : DataSet명
* @param {object} _oFields : OGFeature 의 fields property
* @param {object} _sTitle : OGFeature 의 title property
* @param {object} _sG2id : OGFeature 의 g2id property
* @returns {object} 자체 정의 response개체
* @author 최재훈(2016.06.15  )
*/
var fn_create_responseObj = function(_oOlFeature, _sLayerName, _oFields, _sTitle ,_sG2id){
	var oFactory = fn_get_objFactory();

	var oGData 		= oFactory.Util.createGData();
	var oGResult 		= oFactory.Util.createGResult(_sLayerName);
	var oGFeature 		= oFactory.Util.createGFeature();


	if(_oOlFeature)
		oGFeature.feature = _oOlFeature;

	if(_oFields)
		oGFeature.fields = _oFields;

	if(_sTitle)
		oGFeature.title = _sTitle;

	if(_sG2id)
		oGFeature.g2id = _sG2id;


	oGResult.results.push(oGFeature);
	oGData.data.push(oGResult);

	return oGData;

};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature를 중심으로 경계선 그리기
* @author 최재훈(2016.04.19  )
*/
var fn_draw_oneFeatureBorder = function(_oFeature, _styleName){
	editor.effectLayer.removeAllFeatures();

	if(!_styleName)
 	   _styleName = 'borderpoint';

	editor.drawBorder(_oFeature, _styleName);
	//console.log(_oFeature.geometry.components[0].x + ","+ _oFeature.geometry.components[0].y);
}
/**
* @memberof USV.MAP_EDITOR
* @method
* @description shp파일/dxf 표출할 벡터레이어 추가
* @author 최재훈(2015.12.21  )
*/
var fn_add_viewVectorLayer = function (){
	editor.shpLayer = new NUTs.Layer.Vector("viewVectorLayer");
	editor.shpLayer.styleMap = editor.getStyleMapShpLayer();
	map.addLayer(editor.shpLayer);
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description shp파일 표출할 벡터레이어 추가
* @author 최재훈(2015.10.09  )
*/
var fn_add_shpVectorLayer = function (){

	if(fn_check_editMode()) {
		editor.shpLayer = new NUTs.Layer.Vector("shpVectorLayer");
		editor.shpLayer.styleMap = editor.getStyleMapShpLayer();
		map.addLayer(editor.shpLayer);
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 노후관분포도_상수관로 레이어 추가
* @author 최재훈(2015.10.17  )
*/
var fn_add_wornFacilityLayer = function (){
	
	var oWmsOptions = {
			layers : "노후관분포도_상수관로",
			styles : "",
			format : "image/jpeg",
			version : "1.3.0",
			CRS : new OpenLayers.Projection("EPSG:5181"),
			transparent : true
	};
	
	if(CONFIG.fn_get_gisEngineType() === "GeoServer") {
		oWmsOption.yx = {'EPSG:5181' : true};
	}
	
	var wornFacilityLayer = new NUTs.Layer.WMS("wornFacilityLayer", CONFIG.fn_get_serviceUrl(), oWmsOptions,{
		isBaseLayer : false,
		singleTile : true,
		transitionEffect : 'resize',
		tileOptions: {maxGetUrlLength: 2048},
		projection : new OpenLayers.Projection("EPSG:5181")
	});

	var layer = map.getLayerByName("wornFacilityLayer");

	if(!layer){

		map.addLayer(wornFacilityLayer);
		wornFacilityLayer.events.register("loadend", wornFacilityLayer, MAP.fn_bind_fullLegendGraphic);
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 노후관분포도_상수관로 레이어 제거
* @author 최재훈(2015.10.17  )
*/
var fn_remove_wornFacilityLayer = function (){
	var wornFacilityLayer = map.getLayerByName("wornFacilityLayer");
	if(wornFacilityLayer){
		map.removeLayer(wornFacilityLayer);
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature로부터 편집진행중인 개체(editor.editingFeatures) 정보추출
* @author 최재훈(2016.07.13)
*/
var fn_get_editingFeatureByFeature = function(_oFeature){
	var sTblName 	= fn_get_tblNameByFeature(_oFeature); 
	var sG2id 		= fn_get_g2idByFeature(_oFeature); 
	var oEditingFeature = editor.editingFeatures[sTblName][sG2id];
	
	return oEditingFeature;
}
/**
* @memberof USV.MAP_EDITOR
* @method
* @description 분할 또는 병합 시 대상feature의 편집상태에 따른 불가 처리(편집 저장 후 진행처리하도록)
* 
* CASE1> 병합시 - 선택된 2개체 중 하나라도 수정이 아니면(DB에 이미 저장되어있는 개체가아니면) 불가
* CASE2> 분할 시 - 선택된 개체가 수정이 아니라 신규추가거나 삭제대상이면 분할불가  
* @author 최재훈(2015.10.17  )
*/
var fn_check_validEditState = function(_sProc){
	var oSelFeatures = SEARCH.fn_get_selectedOlFeatures();
	//var oSelFeatures = editor.selectedFeatures;	
	if(_sProc === 'merge') {
		
		for(var i=0, nLen=oSelFeatures.length; i < nLen; i++){

			var oEditingFeature = fn_get_editingFeatureByFeature(oSelFeatures[i]);
			
			if(oEditingFeature && oEditingFeature.editState !== editor.editState['modify']) {
				COMMON.showMessage('[편집오류]&개체 분할 또는 병합작업 대상 feature는 \n편집저장이 완료된 개체에 대해서만 지원됩니다.', 3000);
				return false;
				break;
			}
		}
	}
	else if(_sProc === 'split') {
		
		var oEditingFeature = fn_get_editingFeatureByFeature(oSelFeatures[0]);		
		
		if(oEditingFeature && oEditingFeature.editState !== editor.editState['modify']) {
			COMMON.showMessage('[편집오류]&개체 분할 또는 병합작업 대상 feature는 \n편집저장이 완료된 개체에 대해서만 지원됩니다.', 3000);
			return false;
		}
	}
	
	return true;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature(line) 분할처리
* @author 최재훈(2016.02.11  )
*/
var fn_split_lineString = function(){

	if(fn_check_editMode()) {
		//fn_set_selectedFeature();
		var oSelFeatures = SEARCH.fn_get_selectedOlFeatures();
		
		if (oSelFeatures.length !== 1) {
			COMMON.showMessage('[편집오류]&선 분할 작업을 진행할 feature 1개를 선택해주세요! [' + oSelFeatures.length + ']');
		}
		else if(fn_check_validEditState('split')){ 
			if(DrawPath)
				NUTs.Edit.Control.DrawPath.prototype.initDivideProperties();
			fn_remove_AllRefLayer();
			editor.activateControls(["DivideLine"]);
		}
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature(line) 병합 처리
* @author 최재훈(2016.04.12 )
*/
var fn_merge_lineString = function(){

	if(fn_check_editMode()) {
		//fn_set_selectedFeature();
		var oSelFeatures = SEARCH.fn_get_selectedOlFeatures();
		
		if (oSelFeatures.length !== 2) {
			COMMON.showMessage('[편집오류]&선 병합 작업을 진행할 feature 2개를 선택해주세요! [' + oSelFeatures.length + ']');
		}
		else if(fn_check_validEditState('merge')){ 
			fn_remove_AllRefLayer();
			editor.mergeLine();
		}
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature(line) 분할처리
* @author 최재훈(2016.05.03  )
*/
var fn_split_polygon = function(){

	if(fn_check_editMode()) {
		//fn_set_selectedFeature();
		var oSelFeatures = SEARCH.fn_get_selectedOlFeatures();

		if (oSelFeatures.length !== 1) {
			COMMON.showMessage('[편집오류]&면 분할 작업을 진행할 feature 1개를 선택해주세요! [' + oSelFeatures.length + ']');
		}
		else if(fn_check_validEditState('split')){ 
			fn_remove_AllRefLayer();
			editor.activateControls(["DividePolygon"]);
		}
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature(line) 병합 처리
* @author 최재훈(2016.04.12 )
*/
var fn_merge_polygon = function(){

	if(fn_check_editMode()) {
		//fn_set_selectedFeature();
		var oSelFeatures = SEARCH.fn_get_selectedOlFeatures();

		if (oSelFeatures.length !== 2) {
			COMMON.showMessage('[편집오류]&면 병합 작업을 진행할 feature 2개를 선택해주세요! [' + oSelFeatures.length + ']');
		}
		else if(fn_check_validEditState('merge')){ 
			fn_remove_AllRefLayer();
			editor.mergePolygon();
		}
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 선택된 feature 정보 추출
* @author 최재훈(2016.04.05  )
*/
/*var fn_set_selectedFeature = function(){
	var aSelectedFeatures = [];
	var oSelectCtrl = map.getControl("SelectFeature");

	if(oSelectCtrl){
		var oLayers = oSelectCtrl.layers;

		if(oLayers){
			for(var i = 0, nLayerLen = oLayers.length ; i < nLayerLen ; i++ ) {
				var oLayer = oLayers[i];
				for(var j = 0, nFeatureLen = oLayer.selectedFeatures.length ; j < nFeatureLen; j++ ){
					var oFeature = oLayer.selectedFeatures[j];
					aSelectedFeatures.push(oFeature);
				}
			}
			editor.selectedFeatures = aSelectedFeatures;
		}
	}
};*/

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 참조선상에 (사용자가 입력한) 등간격 점형시설물 추가
* @author 최재훈(2015.10.21)
*/
var fn_create_facilityBySameDist = function (){

	//참조선이 있는 지 체크
	if(editor.refLayer.features.length > 0)
	{
		var refLineFeature = editor.refLayer.features[0];
		var refLineDist = refLineFeature.geometry.getLength();

		var refLinePosList = editor.getPosListByGeometry(refLineFeature.geometry);
		var stdDist = Number($("#stdDist").val());
		if(!stdDist){
			COMMON.showMessage(MESSAGE.sEditMent1);
			return false;
		}
		var arrPosList = [];
		var sx, sy, ex, ey, nx, ny;

		var sttObjResult = {};

		sx = refLinePosList[0].x;			//시작 X좌표
		sy = refLinePosList[0].y;			//시작 Y좌표

		arrPosList.push(refLinePosList[0]);

		var i=0;
		var featureOrder = 1;
		var sG2Id = fn_get_newG2Id();
		var editingLayer = COMMON.fn_get_editingLayer();

		//시작점에 시설물 생성 & 추가
		var oGInnerFeature = editor.makeFeatureByPosList("Point", arrPosList, editingLayer+ "." + sG2Id);
		var addedFeature = fn_add_featureToEditMonitor(oGInnerFeature, editingLayer, sG2Id);
		editor.styleLayer.drawFeature(addedFeature, editingLayer.toLowerCase());

		fn_clear_refLinePopup();

			do{

				var blnInsert = false;

				var angle, result_x, result_y;
				var objResult = {};
				var arrResult = [];
				var nextDist = 0;

				sG2Id = fn_get_newG2Id(); //random 시설물 id 부여

				if(i > 0){
					sx = result_x;
					sy = result_y;
				}

				if (featureOrder < refLinePosList.length ){

					nx = refLinePosList[featureOrder].x;		//다음점 X좌표
					ny = refLinePosList[featureOrder].y;		//다음점 Y좌표

					gapNextPoint = COMMON.fn_get_DistanceBy2Point(sx, sy, nx, ny); //현재지점과 다음지점과의 거리

					if(stdDist < gapNextPoint) {
						blnInsert = true;
						ex = nx;		//끝점 X좌표
						ey = ny;		//끝점 Y좌표

						angle = COMMON.fn_get_angleBy2Dist((ey-sy), (ex-sx));

						result_x = sx + stdDist * Math.cos(angle);
						result_y = sy + stdDist * Math.sin(angle);

						objResult = {};
						arrResult = [];

						objResult.x = result_x;
						objResult.y = result_y;
					}
					else if (featureOrder+1 < refLinePosList.length ){

						blnInsert = true;

						featureOrder++;

						sx = nx;
						sy = ny;

						ex = refLinePosList[featureOrder].x;		//다음점 X좌표
						ey = refLinePosList[featureOrder].y;		//다음점 Y좌표

						dist2NextPoint = (stdDist-gapNextPoint);

						angle = COMMON.fn_get_angleBy2Dist((ey-sy), (ex-sx));

						result_x = sx + dist2NextPoint * Math.cos(angle);
						result_y = sy + dist2NextPoint * Math.sin(angle);

						objResult = {};
						arrResult = [];

						objResult.x = result_x;
						objResult.y = result_y;

					}

				}
				if(blnInsert && (gapNextPoint > stdDist || refLineDist - (i*stdDist) > stdDist ) && i < 100 )	{

					arrResult.push(objResult);

					editingLayer = COMMON.fn_get_editingLayer();
					var oGInnerFeature = editor.makeFeatureByPosList("Point", arrResult, editingLayer+ "." + sG2Id);

					var addedFeature = fn_add_featureToEditMonitor(oGInnerFeature, editingLayer, sG2Id);
					editor.styleLayer.drawFeature(addedFeature, editingLayer.toLowerCase());

					i++;
				}
			}
			while((gapNextPoint > stdDist || refLineDist - (i*stdDist) > stdDist ) && i < 100 )
	}
	else{
		COMMON.showMessage('편집오류 - 등간격 시설물 추가 & 등록된 참조선이 없습니다. ');
		return false;
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 참조선 추가
* @author 최재훈(2015.10.21)
*/
var fn_add_refLine = function (){

	if(fn_check_editMode()) {
		map.activeControls("DrawRefLine");
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description (점형/선형/면형) 시설물 추가
* @author 최재훈(2015.10.21)
*/
var fn_draw_featureOnEditLayer = function (){

	if(fn_check_editMode()) {	
		map.deActiveAllControls();
		var sEditingLayerName = COMMON.fn_get_editingLayer();
		var editLayerType = COMMON.fn_get_EditLayerType(sEditingLayerName);
		var arrActiveControls = null;

		if(DrawPath)
			NUTs.Edit.Control.DrawPath.prototype.initDivideProperties();
		
		if(editLayerType == "Point"){
			arrActiveControls = ['DrawPoint'];
			editor.activateControls(arrActiveControls);
		}
		else if(editLayerType == "LineString"){
			if(sEditingLayerName === 'WTL_PIPE_LM' || sEditingLayerName === 'WTL_SPLY_LS' || sEditingLayerName === 'SWL_PIPE_LM'){				
				NUTs.Edit.Control.DrawPath.mode = 'add';
				
				var nLeft = $("#btnAddFeature").offset().left;
				var nTop = $("#btnAddFeature").offset().top;
				var nImgWidth = $("#btnAddFeature img").width();

				var nWidth = $("#editAddFeaturePane").width();
				$("#editAddFeaturePane").css({'top':(nTop+12),'left':nLeft-(nWidth/2)+(nImgWidth/2)});
				if($("#editAddFeaturePane").attr("style") === "visibility: visible;") {
					MM_showHideLayers('editAddFeaturePane','','hide');
				} else {
					MM_showHideLayers('editAddFeaturePane','','show');
				}
			}
			
			arrActiveControls = ['DrawPath'];
			editor.activateControls(arrActiveControls);
		}
		else if(editLayerType == "Polygon"){
			arrActiveControls = ['DrawPolygon'];
			editor.activateControls(arrActiveControls);
		}
		//imajclickCtrl.activate();
		fn_show_snapInfo();
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 스냅거리 표출처리
* @author 최재훈(2016.05.10)
*/
var fn_show_snapInfo = function(){

	var bSnapChecked = $("#chkOptEditSnap").is(":checked") ;
	var bShowChecked = $("#chkShowSnapDist").is(":checked") ;

	var snapCtrl = map.getControl("SnappingSettings");

	if(bSnapChecked && bShowChecked){
		if(!snapCtrl.popup || (snapCtrl.tolerance !== snapCtrl.preTolerance)) {

			fn_remove_snapPopup();

			var mouseXy = {};
    		mouseXy.x 	= event.clientX;
    		mouseXy.y	= event.clientY;
    		var oLonlat = snapCtrl.map.getLonLatFromPixel(mouseXy);

    		var aContentHtml = [];

    		var nDist = $("#txtSnapDist").val();

    		aContentHtml.push('<div class="olControlSnapInfo">');
    		aContentHtml.push('<span>스냅거리 : ' + nDist + '<sub>'+ fn_get_snapMark() +'</sub></span>');
    		aContentHtml.push('</div>');

    	    var oPopup = new NUTs.Popup("snapInfoPopup", oLonlat, null, aContentHtml.join(''), new OpenLayers.Pixel(3,3));
    	    oPopup.type = "snapInfo";
    	    snapCtrl.popup = oPopup;
    	    snapCtrl.map.addPopup(oPopup);
		}
	}
	
/*	if(editor.editMode && bSnapChecked && snapCtrl.snappingLayers.length > 0){
		$("#map")[0].style.cursor = "crosshair";
	}
	else{
		$("#map")[0].style.cursor = "default";
	}*/

};


var fn_remove_snapPopup = function(){
	if(map.popups.length > 0) {
		for(var i = 0, popLen = map.popups.length; i < popLen; i++) {
			if(map.popups[i].type == 'snapInfo') {
				map.removePopup(map.popups[i]);
				break;
			}
		}
	}
};
/**
* @memberof USV.MAP_EDITOR
* @method
* @description (점형/선형/면형) 시설물 삭제 호출
* @author 최재훈(2015.10.21)
*/
var fn_call_deleteFeatureOnEditLayer = function() {

	if(fn_check_editMode()) {
		map.deActiveAllControls();

		// 향후에는, 삭제에 대해서 복수개 삭제가 가능하도록 변경해야지않을까... 복수개시, 룰 적용 관련 시설물도 같이 삭제되도록
		var oSearchResult = editor.oSearchResult;
		if(!COMMON.isEmptyObject(oSearchResult)){
			var nSearchDatalen = oSearchResult.data[0].results.length;
			if(nSearchDatalen > 1) {
				COMMON.showMessage('편집오류 & [' + nSearchDatalen + ']개의 도형이 선택되었습니다. \n삭제는 1개의 도형 개체에 대해서만 수행가능합니다.');
				return false;
			}
			else
				fn_remove_feature(true);
		}
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 시설물 중간저장 호출
* @author 최재훈(2015.10.21)
*/
function fn_call_saveMiddleBridge(_sTblName, _sG2Id){

	var flgChange = editor.editingFeatures[_sTblName][_sG2Id].flgChange;
	var flgSaved = editor.editingFeatures[_sTblName][_sG2Id].midSave;

	if(flgChange){
		if(flgSaved)
			fn_save_middle('update', _sTblName, _sG2Id);
		else
			fn_save_middle('insert', _sTblName, _sG2Id);

	}else{
		COMMON.showMessage('편집 중지 & 변경된 항목이 없습니다.');
		return false;
	}
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 검색된 feature를 편집중인 vectorlayer에 추가한다
* 2016.02.16 벡테러이어의 zIndex를 가장 크게 설정해 다른 레이어에 가리지 않도록 기능 추가.
* @author 최재훈(2015.09.01)
* @param {Object} _oFeature - 검색된 feature
*/
var fn_add_featureBySearchResult = function (_oFeature){
	var sFId = fn_get_fidByFeature(_oFeature);
	var oGInnerFeature = editor.createFeature(_oFeature, sFId);
	editor.addDrawFeature(editor.editLayer, oGInnerFeature, 'select');

	map.setLayerIndex(editor.editLayer, map.layers.length-1);
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 속성 수정 시 편집중인 개체 정보 가지고 있는 json obj 갱신 & 데이터 유효성 검증 처리

* @param {Object} _obj 			: 수정중인 HTML Form element
* @param {String} _sTblName 	: 수정중인 레이어명
* @param {String} _sG2Id 		: 수정중인 레이어의 feature의 G2Id
* @param {String} _sType 		: 수정중인 레이어의 feature의 Alias
* @param {String} _sType 		: 수정중인 레이어의 feature 속성의 데이터타입
* 51	: STRING
* 16,17 : NUMBER
* 23 	: DECIMAL
* @param {NUMBER} _nDataLength 	: 수정중인 레이어의 feature 속성의 데이터 길이
* @param {NUMBER} _nPrecision 	: 수정중인 레이어의 feature 속성의 소수점 앞자리 길이
* @param {NUMBER} _nScale  		: 수정중인 레이어의 feature 속성의 소수점 뒤자리 길이
* @author   최재훈(2015.09.06)
*/
function fn_check_fldValueChange(_obj, _sTblName, _sG2Id, _sAlias, _sType, _nDataLength, _nPrecision, _nScale){
	var oEmJsonFeatureObj = editor.editingFeatures[_sTblName][_sG2Id];
	var sVal = COMMON.trim(_obj.value);
	
	if(editor.editingFeatures[_sTblName] && oEmJsonFeatureObj){

		if(oEmJsonFeatureObj.properties){

			if(editor.preValue != _obj.value) {
				//문자열
				if(_sType == "51") {
					if(sVal.length > _nDataLength) {
						COMMON.showMessage('속성편집오류 & ['+_sAlias+']컬럼의 값은' + _nDataLength + ' 자리 이내로 입력해주세요', 2500);
						$(this).css("background-color","#e2e2e2"); 
						$(this).val('');
						return false;
					}
				} //숫자
				else {
					
					if(!COMMON.isNumber(sVal)){ 
						//COMMON.showMessage('속성편집오류 & ['+_sAlias+']컬럼의 값은 숫자로 입력해주세요', 2500);
						$(this).css("background-color","#e2e2e2"); 
						$(this).val('');
						return false;
					}
					
					if(_sType == "16" || _sType == "17") {
						if(sVal.length > _nDataLength) {
							COMMON.showMessage('속성편집오류 & ['+_sAlias+']컬럼의 값은' + _nDataLength + ' 자리 이내로 입력해주세요', 2500);
							$(this).css("background-color","#e2e2e2"); 
							$(this).val('');
							return false;
						}
					} //소수점포함 숫자
					else if(_sType == "23") {
						var aVal = sVal.split(".");
						
						if(aVal.length == 2) {
							if(aVal[0].length > _nPrecision) {
								COMMON.showMessage('속성편집오류 & ['+_sAlias+']컬럼의 소수점 앞자리 값은' + _nPrecision + ' 자리 이내로 입력해주세요', 2500);
								$(this).css("background-color","#e2e2e2"); 
								$(this).val('');
								return false;
							}
						}
						else if(sVal.length > _nDataLength) {
							COMMON.showMessage('속성편집오류 & ['+_sAlias+']컬럼의 값은' + _nDataLength + ' 자리 이내로 입력해주세요', 2500);
							$(this).css("background-color","#e2e2e2"); 
							$(this).val('');
							return false;
						}
					}
				}
			
				oEmJsonFeatureObj.properties[_obj.id] = _obj.value;
				oEmJsonFeatureObj.flgChange = 1;
				return true;
			}
		}
	}
	else
		return false;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 공간정보 수정 시 편집중인 개체 정보 가지고 있는 json obj 갱신처리.
* @param {Object} _oFeature 	: 수정중인 Feature
* @param {String} _sTblName 	: 수정중인 레이어명
* @param {String} sG2Id 	: 수정중인 레이어의 featured의 G2Id
* @author   최재훈(2015.09.06)
*/
var fn_check_SpatialValueChange = function (_oFeature, _sTblName, _sG2Id){
		var oEmJsonFeatureObj = editor.editingFeatures[_sTblName][_sG2Id];

		_sG2Id = String(_sG2Id);

		if(editor.editingFeatures[_sTblName] && oEmJsonFeatureObj){
			
			oEmJsonFeatureObj.posList = editor.getPosListByGeometry(_oFeature.geometry);
			oEmJsonFeatureObj.bounds = editor.getBoundsByGeometry(_oFeature.geometry);
			oEmJsonFeatureObj.flgChange = 1;

			//검색개체 갱신
			var sEditingLayer = COMMON.fn_get_editingLayer();
			var sFeatureLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oFeature);
			if(sEditingLayer == sFeatureLayer)
				fn_set_searchResultByFeature(_oFeature);
		}
		
};

var fn_set_searchResultByFeature = function(_oFeature){
	var sTblName = fn_get_tblNameByFeature(_oFeature);
	
	var oGData = objFactory.Util.createGData();
    var oGResult = objFactory.Util.createGResult(sTblName);
    var oGFeature = fn_convert_olFeatureTOoGFeature(_oFeature, fn_get_fidByFeature(_oFeature), _oFeature.state);

	oGResult.results.push(oGFeature);
    oGData.data.push(oGResult);

    editor.oSearchResult = oGData;
}
/**
* @memberof USV.MAP_EDITOR
* @method
* @description 검색결과를 이용 리스트 form 구성.
* @param {Object} _oRes : Response 응답객체(res)
* @author   최재훈(2015.08.24)
* @returns	검색결과 HTML element String을 포함하는 배열 obj
*/
function fn_get_listHtml(_oRes){
	var aRtnVal = [];
		aRtnVal.push("<ul>");
		for(var i in _oRes.data[0].results[0].fields) {
			aRtnVal.push("<li class='ui-state-default'>"+ i + " : <input type='text' value='" + _oRes.data[0].results[0].fields[i] +"' class='text ui-widget-content ui-corner-all'/></li>");
		}
		aRtnVal.push("</ul>");

	return aRtnVal.join("");
}





/**
* @memberof USV.MAP_EDITOR
* @method
* @description json 개체에 속성정보를 복제한 후 리턴.
* @param {Object} _obj : res.data[].results개체 or res.data[].results[].feature 개체 or shp파일 객체
* @author   최재훈(2015.08.24)
* @returns 속성이 복제된 json obj
*/
var fn_get_jsonPropertyByProp = function (_obj, _bEmpty){
	
	  var oJsonProperty = {};
	  var oProp;
	  
	  if(!COMMON.isEmptyObject(_obj.fields)){ //res.data[].results개체{}
		  oProp = _obj.fields;
	  }
	  else {
		  if(_obj.feature){
			  _obj = _obj.feature;
		  }
		  
		  if(_obj.data)//res.data[].results[].feature 개체
		  {
			  if(_obj.data.fid)
				  oProp = _obj.attributes;
			  else
				  oProp = _obj.data;
		  }
		  else //shp파일로부터 속성 추출할 경우에만 사용됨
			  oProp = _obj;
	  } 

	  for(var sField in oProp){
		  if(_bEmpty){
			  if(sField == "HJD_CDE")
				  oJsonProperty[sField] = oProp[sField];
			  else
				  oJsonProperty[sField] = "";
		  }
		  else
			  oJsonProperty[sField] = oProp[sField];

	  }

	  return oJsonProperty;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 중간저장테이블 추출결과를 이용한 편집모니터 json 구성
* @param {Object} _oRes : 검색결과 가지고 있는 res obj
* @author  최재훈(2015.08.20)
* @returns 테이블명과 id ex) 'BML_BLDG_AS,1234'
*/
function fn_create_jsonDataByResponse(_oRes){
	var nSearchLen = null;
	var oSearchResult = null;
	var sTblName = null
	fn_init_editingFeature();

	if(_oRes.feature_list){
		nSearchLen = _oRes.feature_list.length;
		oSearchResult = _oRes.feature_list;
	}
	else{
		nSearchLen = _oRes.data.length;
		oSearchResult = _oRes.data;
	}
	var sG2Id = null,
		oJsonData,
		nState;

	for(var i = 0; i < nSearchLen; i++){

		sTblName = oSearchResult[i].g2_NAME;
		sG2Id = String(oSearchResult[i].g2_ID);

		if(oSearchResult[i].g2_DATA){
			oJsonData = JSON.parse(oSearchResult[i].g2_DATA);
			nState = oSearchResult[i].g2_STATE;

			oJsonData.editState = nState;
			oJsonData.midSave = 1;
			oJsonData.flgChange = 0;

			//현재 편집중인 레이어외 이미 저장된 레이어의 정보도 관리필요.
			if(!editor.editingFeatures[sTblName]){
				editor.editingFeatures[sTblName] = {
						g2IdList : [] 	//g2_id목록
				};
			}

			if(editor.editingFeatures.LayerList.lastIndexOf(sTblName) == -1 && sTblName) {
				editor.editingFeatures.LayerList.push(sTblName);
			}
			if(editor.editingFeatures[sTblName].g2IdList.lastIndexOf(sG2Id) == -1) {
				editor.editingFeatures[sTblName].g2IdList.push(sG2Id);
			}

			editor.editingFeatures[sTblName][sG2Id] = oJsonData;
		}
		else{
			COMMON.showMessage('[편집오류]&중간저장결과 추출 중 오류 [g2_DATA] 값이 비었습니다.')
		}
		
	}

	return sTblName + "," + sG2Id;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description OpenLayers의 CLASS_NAME을 이용 geometry 타입 정보 리턴
* @param {Object} _oRes : 검색결과 가지고 있는 res obj
* @author  윤은희(미상)
* @returns {String} geometry 타입 (Point,LineString,Polygon)
*/
function fn_get_LayerTypeByClassName(_sClassName){
	var sRtnType = null;
	if(_sClassName.toLowerCase().contains('point'))
		sRtnType = "Point";
	else if(_sClassName.toLowerCase().contains('line'))
		sRtnType = "LineString";
	else if(_sClassName.toLowerCase().contains('polygon'))
		sRtnType = "Polygon";

	return sRtnType;
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 하나의 G2Id가 선택(검색)된 경우의 편집모니터 json 구성
* @param 	{Object} _oRes : 검색결과 가지고 있는 res obj
* @param	_sSelectG2Id - 선택된 feature의 g2Id
* @param	_nState - 편집모드(추가:1, 수정:2, 삭제:4)
* @author  	최재훈(2015.08.20)
*/
function fn_create_editingFeature(_oRes, _sSelectG2Id, _nState){
	var oResult = null;
	if(_oRes.data[0]){
		for(var i=0,len=_oRes.data[0].results.length;i<len;i++){
			var oRes = _oRes.data[0].results[i];
			if(oRes.g2id == _sSelectG2Id) {
				oResult = oRes;
			}
		}
		if(!oResult) {
			oResult = _oRes.data[0].results[0];
		}
		var oGEmJson = fn_get_oGEmJson(oResult, _nState, 0, 0); //feature단위 json
		var sTblName = _oRes.data[0].table;

		_sSelectG2Id = String(_sSelectG2Id);
		oResult.feature.layer = null;

		if(!editor.editingFeatures[sTblName]){
			editor.editingFeatures[sTblName] = {
					g2IdList : [] 	//g2_id목록
			};
		}

		if(editor.editingFeatures.LayerList.lastIndexOf(sTblName) == -1 && sTblName) {
			editor.editingFeatures.LayerList.push(sTblName);
		}
		if(editor.editingFeatures[sTblName].g2IdList.lastIndexOf(_sSelectG2Id) == -1) {
			editor.editingFeatures[sTblName].g2IdList.push(_sSelectG2Id);
		}

		editor.editingFeatures[sTblName][_sSelectG2Id]=oGEmJson;
	}
	

}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 여러개의 G2Id가 선택(검색)된 경우의 편집모니터 json 구성
* @param 	{Object} _oRes : 검색결과 가지고 있는 res obj
* @param	_sSelectG2Id - 선택된 feature의 g2Id
* @param	_nState - 편집모드(추가:1, 수정:2, 삭제:4)
* @author  	최재훈(2015.08.20)
*/
function fn_create_editingFeatures(_oRes, _nState){

	for(var i = 0, nResultLen = _oRes.data[0].results.length ; i < nResultLen ; i++){

		var oJsonData = {};	//feature단위 json

		var oResult = _oRes.data[0].results[i];
		var oFeature = oResult.feature;
		var sTblName = _oRes.data[0].table;

		var sSelectG2Id = String(fn_get_g2idByFeature(oFeature));


		oResult.feature.layer = null;

		var oGEmJson = fn_get_oGEmJson(oResult, _nState, 0, 0); //feature단위 json

		if(!editor.editingFeatures[sTblName]){
			editor.editingFeatures[sTblName] = {
					g2IdList : [] 	//g2_id목록
			};
		}

		if(editor.editingFeatures.LayerList.lastIndexOf(sTblName) == -1 && sTblName) {
			editor.editingFeatures.LayerList.push(sTblName);
		}
		if(editor.editingFeatures[sTblName].g2IdList.lastIndexOf(sSelectG2Id) == -1) {
			editor.editingFeatures[sTblName].g2IdList.push(sSelectG2Id);
		}

		editor.editingFeatures[sTblName][sSelectG2Id]=oGEmJson;
	}
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집모니터창 jstree 표출을 위한 json(editor.editingFeatures기준) 생성
* @author  	최재훈(2015.08.20)
* @returns {object} jstree 표출용 json obj
*/
function fn_create_editTreejsonByObj(){

	var oEmLayerList = editor.editingFeatures.LayerList;
	var jsonData = {
			data : []
	};

	for(var i = 0, nLayerLen = oEmLayerList.length; i < nLayerLen; i++ ){
		var tblName = oEmLayerList[i];
		var featureLen = editor.editingFeatures[tblName].g2IdList.length;
		var invisibleItemTree = 0;

		var titleTblName = COMMON.fn_get_EditKorLayerNm(tblName);

		var layerObj = {
				data : {
					title :titleTblName,
					icon : "/images/usolver/com/map/icon/Icon_Group.png"
				},
				attr : {
					id : tblName
				},
				children : []
		};

		for(var j = 0; j < featureLen ; j++){
			var sG2Id = editor.editingFeatures[tblName].g2IdList[j];

			var featureObj = {
					data : {
						title : sG2Id,
						icon :  "/images/usolver/com/tree/edit_state_"+editor.editingFeatures[tblName][sG2Id].editState+".png"
					}
			};

			layerObj.children.push(featureObj);
		}

		jsonData.data.push(layerObj);
	}

	return jsonData;
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집모니터창 jstree 표출을 위한 json(검색결과 res기준) 생성
* @author  	최재훈(2015.08.20)
* @param {object} _oRes : 검색결과 res obj
* @returns {object} jstree 표출용 json obj
*/
function fn_create_searchTreejsonByRes(_oRes){

	var oResData = _oRes.data[0];
	var sTblName = oResData.table;
	var nFeatureLen = oResData.results.length;
	var sTitleTblName = COMMON.fn_get_EditKorLayerNm(sTblName);
	var oFeatureObj,sG2Id;
	var oJsonData = {
			data : []
	};

	var oLayerObj = {
		data : {
			title : sTitleTblName,
			icon : "/images/usolver/com/map/icon/Icon_Group.png"
		},
		attr : {
			id : sTblName
		},
		children : []
	};

	for(var i = 0; i < nFeatureLen; i++) {
		sG2Id = oResData.results[i].g2id;

		oFeatureObj = {
				data : {
					title : sG2Id,
					icon : "/images/usolver/com/tree/file.png"
				}
		};
		oLayerObj.children.push(oFeatureObj);
	}

	oJsonData.data.push(oLayerObj);

	return oJsonData;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집중인 레이어 설정
* @author  	최재훈(2015.08.20)
* @param {Stromg} _sLayer : 편집중인 레이어
*/
function fn_set_editingLayer(_sLayer){
	$("div.editLayer").text(COMMON.fn_get_EditKorLayerNm(_sLayer));
	$("div.editLayer").attr("id",_sLayer);
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 위치정보(좌표)를 통해 Layer 특정 필드정보(행정동/법정동 etc) 가져오기
* ----------------------------------------------------------------------------------------------------
* 	2016.05.13		윤은희(제품개발팀)		공간 위치를 찾을 때 기준은 편집 개체의 시작점으로 함.
*
* @author 윤은희(2015.08.28)
* @param {String} _sLayer : 검색 대상 레이어 영문명
* @param {String} _sField :  검색 결과에서 찾을 필드
* @param {Object} _oFeature : 검색지점 공간 정보
* @returns Layer 특정 필드정보(행정동/법정동 etc)
*/
function fn_get_layerPositionInfo(_sLayer, _sField, _oFeature){

	var sFieldValue = '';
	var oSearchFeature = _oFeature.clone();

	if(_oFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','') === 'LineString')
		oSearchFeature.geometry = _oFeature.geometry.components[0];
	
	// sync = true로 전달함. async방식일 경우, 서버에 동일 요청이 시간차를 두고 중복되어 요청되거나 _oRes제어가 잘 되지 않으므로
	NUTs.WFS.getFeatureByGeometry(
			CONFIG.fn_get_wfsServiceUrl(),
			{
				prefix : CONFIG.fn_get_dataHouseName(),
				tables : [_sLayer],
				values : [oSearchFeature.geometry]
			},
			function(_oRes) {
				if(_oRes.data.length >0)
					sFieldValue = _oRes.data[0].results[0].fields[_sField];
			},
			{
				alias : '',
				titles : ''
			},
			true
		);

	return sFieldValue;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description X,Y 좌표점을 가지고 Point타입 개체로 신규 생성 후, 편집모니터에 등록
* @author 윤은희(2015.10.21)
* @param {String} _sLayer : feature의 Layer 영문명
* @param {String} _sCoordX  : X좌표
* @param {String} _sCoordY  : Y좌표
* @param {Boolean} _bMoveState : 해당 좌표로 이동여부
*/
var fn_create_featureByXY = function (_sLayer, _sCoordX, _sCoordY, _bMoveState){

	var sType = COMMON.fn_get_EditLayerType(_sLayer);
	var sG2Id = fn_get_newG2Id();
	var oFeatureExtent = new NUTs.Bounds(_sCoordX, _sCoordY, _sCoordX, _sCoordY);

	var aPosList = [];
	var oFeature = {
			x : _sCoordX,
			y : _sCoordY,
			bounds : oFeatureExtent,
			CLASS_NAME : ''.concat('OpenLayers.Geometry.' + sType)
	};
	aPosList.push(oFeature);

	var oGInnerFeature = editor.makeFeatureByPosList(sType, aPosList, _sLayer.concat('.', sG2Id));

	editor.addDrawFeature(editor.editLayer, oGInnerFeature, _sLayer);

	if(_bMoveState)
		map.zoomToExtent(oFeatureExtent);

	fn_add_featureToEditMonitor(oGInnerFeature, _sLayer, sG2Id);
	return _sLayer +'.'+sG2Id;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 서브심볼로 구성된 레이어의 서브심볼 기준 컬럼에 DEFAULT 값 할당
* @author 최재훈(2016.07.13)
* @param {Object} _oFields : feature의 속성정보 개체

*/
var fn_update_defaultSubSymbolColumn = function(_oFields){
	var oSubSymbolDefaultInfo =  CONFIG.fn_get_subSymbolDefaultInfo();
	var sSysCode = COMMON.fn_get_currentSystem(); //FIXME 실제 사용중인 시스템 아이디로 변경 필요
	var sLayer = COMMON.fn_get_editingLayer();
	
	for(var column in _oFields) {
		if(oSubSymbolDefaultInfo[sSysCode] && oSubSymbolDefaultInfo[sSysCode][sLayer] && oSubSymbolDefaultInfo[sSysCode][sLayer][column]){
			_oFields[column] = oSubSymbolDefaultInfo[sSysCode][sLayer][column];
		}
	}
	
	return _oFields;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 변류시설(밸브), 유량계, 수압계, 누수복구 레이어의 경우 관로관리번호 컬럼에 인접 상수관로의 관리번호(FTR_IDN)을 갖고 있어 자동 추출 처리함.
* 급수전 계량기의 경우 급수관로와 관리번호 매핑관계임.
* @author 최재훈(2016.10.14)
* @param {Object} _oFields : 갱신처리될 field Obj
* @param {Object} _oFeature : feature Obj
* @param {String} _sLayer : feature의 영문 레이어명
* @param {String} _sG2Id : feature의 FID 혹은 랜덤으로 생성된 ID(nanotime)
* @param {Array} _aAttr : feature의 속성 중 객체 생성시 자동으로 할당할 기본항목 외, 추가적으로 자동 할당할 Domain이 적용된 속성 list = oEditRuleInfo.option
*/
var fn_update_pipIdn = function(_oFields, _oFeature, _sLayer, _sG2Id){
	
	if(_sLayer === 'WTL_META_PS' || _sLayer === 'WTL_VALV_PS' || _sLayer === 'WTL_FLOW_PS' || _sLayer === 'WTL_PRGA_PS' || _sLayer === 'WTL_LEAK_PS') {
		
		var sStdLayer = 'WTL_PIPE_LM';
		
		if(_sLayer == 'WTL_META_PS')
			sStdLayer = 'WTL_SPLY_LS';
		
		var oSearchFeature = _oFeature.clone();
		
		// sync = true로 전달함. async방식일 경우, 서버에 동일 요청이 시간차를 두고 중복되어 요청되거나 _oRes제어가 잘 되지 않으므로
		NUTs.WFS.getFeatureByDWithin(
				CONFIG.fn_get_wfsServiceUrl(),
				{
					prefix : CONFIG.fn_get_dataHouseName(),
					tables : [sStdLayer],
					values : [oSearchFeature.geometry],
					distance : 0.5
				},
				function(_oRes) {
					if(_oRes.data.length >0) 
						_oFields['PIP_IDN'] = _oRes.data[0].results[0].fields["FTR_IDN"]; 
					
				},
				{
					alias : '',
					titles : ''
				},
				true
			);
	} 
	
};
/**
* @memberof USV.MAP_EDITOR
* @method
* @description 신규 추가 개체를 편집모니터에 등록 및 중간저장 테이블에 추가
* @author 윤은희(2015.08.28)
* @param {Object} _oFeature : feature Obj
* @param {String} _sLayer : feature의 영문 레이어명
* @param {String} _sG2Id : feature의 FID 혹은 랜덤으로 생성된 ID(nanotime)
* @param {Array} _aAttr : feature의 속성 중 객체 생성시 자동으로 할당할 기본항목 외, 추가적으로 자동 할당할 Domain이 적용된 속성 list = oEditRuleInfo.option
*/
var fn_add_featureToEditMonitor = function (_oFeature, _sLayer, _sG2Id, _aAttr){
	this.updateLenAreaField = function(_sLayer, _oFields){		
		var oUpdateLenAreaFields = CONFIG.fn_get_updateLenAreaFields();
		var oFields = oUpdateLenAreaFields[_sLayer];
		
		if(oFields){
			if(oFields.length){
				var sLenField = oFields.length;
				if(editor.layerColumnInfo[_sLayer]['fieldInfo'][sLenField])
		    		_oFields[sLenField] = _oFeature.geometry.getLength().toFixed(2);
			}
			
			if(oFields.area){
				var sAreaField = oFields.area;
				if(editor.layerColumnInfo[_sLayer]['fieldInfo'][sAreaField])
		    		_oFields[sAreaField] = _oFeature.geometry.getArea().toFixed(2);
			}
		}
	};

	//object 생성
    var oGData = objFactory.Util.createGData();
    var oGResult = objFactory.Util.createGResult(_sLayer);
    var oGFeature = fn_convert_olFeatureTOoGFeature(_oFeature, fn_get_fidByFeature(_oFeature), _oFeature.state);

   // added layer의 field 정보 가져오기
    var oFields = editor.copiedField instanceof Array ? [] : {};

    //속성 채우기
    if(editor.copyMode){
    	this.updateLenAreaField(editor.copiedField);
    	oFields = editor.copiedField;
    	editor.arrCopiedG2Id.push(_sG2Id);
    }
    else{
   		oFields = editor.layerColumnInfo[_sLayer].fieldValue;     	
    }
    
    
    //복제모드이더라도 위치정보 등은 자동 추출하도록...
    // 위치관련 속성(행정/법정/도엽번호)
	for(var idx in aPositionLayerInfo){
		var sSearchLayer = aPositionLayerInfo[idx]['layer'];
		var sField = aPositionLayerInfo[idx]['field'];
		
		if(editor.layerColumnInfo[_sLayer]['fieldInfo'][sField])
    		oFields[sField] = fn_get_layerPositionInfo(sSearchLayer, sField, _oFeature);
	}
	
	//지형지물부호
	if(editor.layerColumnInfo[_sLayer]['fieldInfo'].FTR_CDE)
		oFields['FTR_CDE'] = COMMON.fn_get_Ftrcde(_sLayer);
	
	// 연장, 면적 갱신
	this.updateLenAreaField(_sLayer, oFields);
	
	//설치일
	if(editor.layerColumnInfo[_sLayer]['fieldInfo'].IST_YMD)
		oFields['IST_YMD'] = COMMON.fn_get_today();
	
	//매개변수로 넘어온 속성
	if(!editor.copyMode && _aAttr !== undefined){
		if(_aAttr.length > 0){
			for(var i=0, len=_aAttr.length; i<len; i++){
				if(_aAttr[i].valueType === 'attr'){
					var sField = _aAttr[i].value.field;
    				oFields[sField] = _aAttr[i].value.attr;	
				}
			}
		}
	}
    
	//관로관리번호 자동부여
	fn_update_pipIdn(oFields, _oFeature, _sLayer, _sG2Id);
	
	
    oGFeature.fields = fn_update_defaultSubSymbolColumn(oFields); //서브심볼로 구성된 레이어의 서브심볼 기준 컬럼에 DEFAULT 값 할당
    
    oGResult.results.push(oGFeature);
    oGData.data.push(oGResult);

    editor.oSearchResult = oGData;
    fn_create_editingFeature(oGData, _sG2Id, 1);
    fn_show_editMonitor($('#editListTree'), $('#editContent'), _sLayer, _sG2Id);

    // 중간저장 테이블에 저장
    setTimeout("MAP_EDITOR.fn_save_middle('insert','"+ _sLayer +"','" + _sG2Id+"','Y')",500);

    // editVectorLayer에 등록되는 객체와 oStyleVectorLayer 등록되는 객체는 독립적이어야 함. 아래와 같이 신규생성해야함.
    var oGInnerStyleFeature = editor.createFeature(_oFeature,_sLayer.concat('.', _sG2Id));
    
    // 교차옵션 중 '교차' 수행 시에만 존재하는 feature.data 값으로, 
    // '교차' 기능 수행으로 인해 교차 분할된 개체가 원본 개체의 필드 속성 또한 복제되어 분할되어야 하므로
    if(!COMMON.isEmptyObject(_oFeature.data))
    	oGInnerStyleFeature.data = _oFeature.data;	 
    editor.addUnDrawFeature(editor.styleLayer, oGInnerStyleFeature);

    return oGInnerStyleFeature;
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 로딩된 shp파일 정보 이용
* //FIXME 1. 검색결과 SET (모든 데이터 포함하도록 수정 필요)
* 2. 편집개체(editor.editingFeature) 갱신
* 3. 편집모니터 갱신
* 4. 스타일 레이어에 feature Add & Draw
*
* @author 최재훈(2015.10.20)
* @param {String} _oFeature : 로딩된 shp파일 의 각 feature
* @param {String} _sLayer : 레이어(shp파일) 이름
*/
var fn_add_featureToEditMonitorFromShp = function (_oFeature, _sLayer, _oLayer){

    var oFeatureObj = _oFeature;
    var sG2Id = fn_get_g2idByFeature(oFeatureObj.feature)

    var oGData = objFactory.Util.createGData();
	var oGResult = objFactory.Util.createGResult(_sLayer);

	var sTmpFId;

	oGResult.results.push(oFeatureObj);
	oGData.data.push(oGResult);

    //SEARCH.fn_set_searchResult(oGData);
    fn_create_editingFeature(oGData, sG2Id, 1);
    fn_show_editMonitor($('#editListTree'), $('#editContent'), _sLayer, sG2Id);

	if(_oFeature.feature.attributes.fid.indexOf(_sLayer) > -1)
		sTmpFId = _oFeature.feature.attributes.fid;
	else
		sTmpFId = _sLayer.concat('.', _oFeature.feature.attributes.fid);


	var oGInnerStyleFeature = editor.createFeature(_oFeature.feature, sTmpFId);

	editor.addDrawFeature(_oLayer, oGInnerStyleFeature, 'select');
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 로딩된 shp파일 정보 -> 검색결과창에 표출
* @author 최재훈(2015.10.20)
* @param {String} _oFeature : 로딩된 shp파일 의 각 feature
* @param {String} _sLayer : 레이어(shp파일) 이름
*/
var fn_add_featureToSearchDialogFromShp = function (_oFeature, _sLayer, _oLayer){

    var oFeatureObj = _oFeature;
    var sG2Id = fn_get_g2idByFeature(oFeatureObj.feature)

    var oGData = objFactory.Util.createGData();
	var oGResult = objFactory.Util.createGResult(_sLayer);

	var sTmpFId;

	oGResult.results.push(oFeatureObj);
	oGData.data.push(oGResult);

    //SEARCH.fn_set_searchResult(oGData);
    //fn_create_editingFeature(oGData, sG2Id, 1);
    //fn_show_editMonitor($('#editListTree'), $('#editContent'), _sLayer, sG2Id);

	if(_oFeature.feature.attributes.fid.indexOf(_sLayer) > -1)
		sTmpFId = _oFeature.feature.attributes.fid;
	else
		sTmpFId = _sLayer.concat('.', _oFeature.feature.attributes.fid);


	var oGInnerStyleFeature = editor.createFeature(_oFeature.feature, sTmpFId);
	
	editor.addDrawFeature(_oLayer, oGInnerStyleFeature, 'dataload');
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 신규 추가 개체 정보 -> 편집모니터에 등록 및 중간저장 테이블에 추가
* @author 최재훈(2015.10.20)
* @param {String} _sTableName : feature의 영문 레이어명
* @param {Object} _oFeature : feature Obj
* @param {String} _sG2Id : feature의 FID 혹은 랜덤으로 생성된 ID(nanotime)
*/
var fn_make_resultObjByShp = function (_sTableName, _oFeature, _sG2Id){

    var oGResult = objFactory.Util.createGResult(_sTableName);
    var oGFeature = fn_convert_olFeatureTOoGFeature(_oFeature, _sTableName.concat('.',_sG2Id), '');

    oGResult.results.push(oGFeature);

    return oGResult;
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집중인 feature를 GeoJSON형태로 중간 저장(INSERT 혹은 UPDATE)한다.
* @author 최재훈(2015.08.19)
* @param {String} _sProcType : 데이터 처리 타입(insert / update ...)
* @param {String} _sTblName :  공간데이터 타입(Point, LineString, Polygon)
* @param {String} _sG2Id : 레이어(shp파일)의 G2Id
*/
function fn_save_middle(_sProcType, _sTblName, _sG2Id){
	var oSaveFeatureObj = editor.editingFeatures[_sTblName][_sG2Id];
	var sProcUrl = null;
	var oParamData = {};

	if(oSaveFeatureObj) {

		if(_sProcType == 'insert'){
			oSaveFeatureObj.midSave = 1;
			sProcUrl = '/mapedit/insertEditMidFeatureOne.do';
		}
		else
			sProcUrl = '/mapedit/updateEditMidFeatureOne.do';

		oParamData.inputData =  JSON.stringify(oSaveFeatureObj);
		oParamData.tableName = _sTblName;
		oParamData.datasetId = COMMON.fn_get_EditLayerId(COMMON.fn_get_EditEngLayerNm(_sTblName));
		oParamData.g2Id = _sG2Id;
		oParamData.userId = COMMON.fn_get_userId();

		//중간 저장
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: sProcUrl,
			data : oParamData ,
			async: false,
			success: function(_oRes) {

				oSaveFeatureObj.flgChange = 0;  //수정여부 - '수정안됨'으로 초기화
				oSaveFeatureObj.midSave = 1;  	//수정여부 - '수정'으로 초기화

				fn_show_editMonitor($('#editListTree'),$('#editContent'), _sTblName,_sG2Id);
			},
			error: function(xhr, status, error) {
				if(_sProcType == 'insert')	// DB insert 실패시, editor.editingFeatures객체 midSave 상태를 다시 0으로 되돌려야 함.
					oSaveFeatureObj.midSave = 0;
				
				COMMON.showMessage('편집오류 & 중간저장 실패!.');
			}
		});
	}
	else {
		COMMON.showMessage('편집오류 & 편집 작업중인 feature가 없거나 선택되지 않았습니다.');
	}
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description (단일레이어 대상)검색된 여러개의 feature를 GeoJSON형태로 중간 저장(INSERT 혹은 UPDATE)한다.
* 2015.08.19		최재훈(제품개발팀)		최초 생성
* 2015.09.08		최재훈(제품개발팀)		openlayers가 다루는 feature obj 그대로가 아닌 좌표목록(posList)와 영역(bounds)정보만 담도록 수정
* 2015.11.16		윤은희(제품개발팀)		oStyleVectorLayer 추가
* @param {Object} _oGData - 저장할 oGData객체
* @param {String} _sExcludeEditLayer - editor.editLayer에 추가여부를 결정하는 임의의 값. 파라메터값의 의미는 없음.
* @param {Int} _nState - 편집모드(추가:1, 수정:2, 삭제:4)
* @author 최재훈(2015.08.19)
*/
var fn_save_middleAll = function (_oGData, _sExcludeEditLayer, _nState){	
	var nState = 2;

	if(_nState)
		nState  = _nState;

	if(_oGData) {

		//편집모니터용
		var oJsonTotInfo = {};
		oJsonTotInfo.LayerList = [];
		
		var sG2Id = String();
		var oGDataObj = _oGData.data[0];

		var sTblName = oGDataObj.table;
		var nResultLength = oGDataObj.results.length;

		var oParamData = {};

		for(var i = 0 ; i < nResultLength ; i++) {
			var oGEmJson = {};	//feature단위 json
			var sG2Id = oGDataObj.results[i].g2id;

			if(!sG2Id)
				sG2Id = String(oGDataObj.results[i].FID);
			sG2Id = String(sG2Id);

			oGEmJson = fn_get_oGEmJson(oGDataObj.results[i], nState, 1, 1);
			oGDataObj.results[i].feature.layer = null;

			if(!oJsonTotInfo[sTblName]){
				oJsonTotInfo[sTblName] = {
						g2IdList : []
				};
			}

			//데이터 입력을 위한 json 생성
			if(oJsonTotInfo[sTblName].g2IdList.lastIndexOf(sG2Id) == -1) {
				oJsonTotInfo[sTblName].g2IdList.push(sG2Id);
			}

			oJsonTotInfo[sTblName][sG2Id]=oGEmJson;

			if(oJsonTotInfo.LayerList.lastIndexOf(sTblName) == -1) {
				oJsonTotInfo.LayerList.push(sTblName);
			}
		}
		
		// editor.editingFeatures를 모두 완성하도록 변경 - ehyun.2016.4.5
		if(oJsonTotInfo.LayerList.length > 0){
			oParamData.inputData = JSON.stringify(oJsonTotInfo);
			oParamData.tableName = sTblName;
			oParamData.datasetId = COMMON.fn_get_EditLayerId(sTblName);
			oParamData.editState = nState;
			oParamData.userId = COMMON.fn_get_userId();

			for(var i = 0 ; i < nResultLength ; i++) {
				var sG2Id = oGDataObj.results[i].g2id;
				if(!sG2Id)
					sG2Id = String(oGDataObj.results[i].FID);
				sG2Id = String(sG2Id);

				//이미 (중간저장된 후..)편집중인 feature라면
				if(editor.editingFeatures[sTblName] && editor.editingFeatures[sTblName][sG2Id]){
					var oGInnerFeature = oGDataObj.results[i].feature;
					fn_check_SpatialValueChange(oGInnerFeature, sTblName, sG2Id);
				}
				else{
					if(!editor.editingFeatures[sTblName])
						editor.editingFeatures[sTblName] = oJsonTotInfo[sTblName];

					if(editor.editingFeatures[sTblName].g2IdList.lastIndexOf(sG2Id) == -1) {
						editor.editingFeatures[sTblName].g2IdList.push(sG2Id);
						if(editor.editingFeatures[sTblName][sG2Id] === undefined)
							editor.editingFeatures[sTblName][sG2Id] = oJsonTotInfo[sTblName][sG2Id];
					}

					if(editor.editingFeatures.LayerList.lastIndexOf(sTblName) == -1)
						editor.editingFeatures.LayerList.push(sTblName);
				}
			}

			//중간 저장 or 중간 저장 정보 갱신
			$.ajax({
				type: 'post',
				dataType: 'json',
				url: '/mapedit/insertORupdateEditMidFeature.do',
				data : oParamData ,
				async : false,
				success: function(_oRes) {	// 복수 데이타 처리방식으로 변경 - ehyun. 2016.4.7

					if(_oRes.editMidSaveRes.length > 0){
						for(var i=0,len=_oRes.editMidSaveRes.length; i<len; i++){

							var sG2Id = _oRes.editMidSaveRes[i].FID;
							var oJsonData = JSON.parse(_oRes.editMidSaveRes[i].G2_DATA);

							if(!_sExcludeEditLayer){
								if(i===0)
									editor.editLayer.removeAllFeatures();

								var oGInnerEditFeature = editor.makeFeatureByPosList(oJsonData.type, oJsonData.posList, sTblName+'.'+sG2Id);
								//editor.editLayer.removeAllFeatures();
								editor.addDrawFeature(editor.editLayer, oGInnerEditFeature, 'select');
							}

							//wfs VectorLayer에 있는 해당 개체 삭제 - 이중 drawing 방지
							editor.removeFeatureOnMapLayer(sTblName, sG2Id);

							var oSearchStyleFeature = editor.styleLayer.getFeaturesByAttribute('fid', sTblName+'.'+sG2Id);
							if(COMMON.isEmptyObject(oSearchStyleFeature) === false)
								editor.styleLayer.destroyFeatures(oSearchStyleFeature, null);

							// oEditVectorLayer 등록되는 객체와 oStyleVectorLayer 등록되는 객체는 독립적이어야 함.
							// clone()처리했을 때 제대로 복제되는 않는 경우가 종종발생하여 아래와 같이 신규 생성함.
							var oStyleFeature = editor.makeFeatureByPosList(oJsonData.type, oJsonData.posList, sTblName.concat('.', sG2Id));
							if(oJsonData.editState === editor.editState['delete'] || oJsonData.editState === editor.editState['pseudo'])								
								editor.addDrawFeature(editor.styleLayer, oStyleFeature, 'delete');	
							else
								editor.addDrawFeature(editor.styleLayer, oStyleFeature, sTblName.toLowerCase());

							if( i === (len-1))
								fn_show_editMonitor($('#editListTree'),$('#editContent'),sTblName,sG2Id);
						}
					}
				},
				error: function(xhr, status, error) {
					COMMON.showMessage('편집오류 & 오류발생.\n check!.');
				}
			});
		}
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description Feature Object를 GML 스트링으로 변환하여 리턴
* @author 최재훈(2015.10.12)
* @param {Object} _oFeature - feature 개체
* @returns {String}	  GML String (A string representing the GML document)
*/
function fn_get_gmlFeatureStr(_oFeature){
	var sGml = null;
	var oFormatter = new OpenLayers.Format.GML();
	sGml = oFormatter.write(_oFeature);
	return sGml;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description GML 스트링을 Feature Object로 변환하여 리턴
* @author 최재훈(2015.10.12)
* @param {Object} _oFeature - feature 개체
* @returns {String}	An array of features.
*/
function fn_get_gmlFeatureObj(_sGml){
	var oFeature = null;
	var oFormatter = new OpenLayers.Format.GML();
	oFeature = oFormatter.read(_sGml);
	return oFeature;
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description  shp파일 로딩후 표출처리하는 벡터레이어상 모든 feature 삭제
* @author 최재훈(2015.10.21)
*/
function fn_remove_AllShapeLayer(){
	if(editor.shpLayer){
		editor.shpLayer.removeAllFeatures();
	}
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description  참조점, 참조선 등 참조시설물 표출처리하는 벡터레이어상 모든 feature 삭제
* @author 최재훈(2015.10.21)
*/
var fn_remove_AllRefLayer = function (){
	if(editor.refLayer){
		editor.refLayer.removeAllFeatures();
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description  [편집시작]하지 않아도 편집진행중이 feature들은 해당 스타일로 표출처리
* @author 최재훈(2016.07.13)
*/
var fn_show_middleEditFeatures = function(){
	var oParamData = {};
	oParamData.userId = COMMON.fn_get_userId();//FIXME

	var oPreMidSaveRes = editor.preMidSaveRes; //이전 중간저장개체

	//편집대상 레이어 변경 시 WFS 레이어의 필터 생성을 위해 중간저장개체를 추출<DB접속>하게 됨.
	//이후 편집모니터 갱신을 위해 다시 fn_get_middleEditList이 호출하게 되는데 이때만 이전 추출값을 그대로 사용하기 위한..조건
	if(!oPreMidSaveRes){

		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/getMiddleEditFeature.do',
			data : oParamData ,
			async : false,
			success: function(_oRes) {

				if(_oRes.feature_list.length !== 0) {
					oPreMidSaveRes = _oRes;
				} else {
					oPreMidSaveRes = null;
				}

			},
			error: function(xhr, status, error) {
				COMMON.showMessage('편집오류 & 중간저장 개체 추출 오류발생.\n check2!.');
			}
		});
	}

	oPreMidSaveRes = oPreMidSaveRes || {};

	if(oPreMidSaveRes.feature_list && oPreMidSaveRes.feature_list.length > 0){
		fn_create_jsonDataByResponse(oPreMidSaveRes);
		fn_add_featureOnStyleVector(editor.editingFeatures);
		fn_init_editingFeature(); //드로잉 후 초기화	
	}
	
	editor.preMidSaveRes = null; //이전 중간저장개체 추출값 초기화
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description  중간저장된 편집중인 feature와 dataset 테이블과의 동기화 처리
* 					 : WFS-T(insert/update/delete) 정상수행 후 DB 이상문제로 중간저장 테이블에서 해당 객체를 삭제하지 못해서 남아있는 객체가 있을 수 있으므로 해당 객체 삭제처리
* @author 윤은희(2016.09.27)
*/
var fn_sync_middleEditList = function (){
	var oChkMidSave = {
			add : {},
			modifyNdel : {}
	};
	var oPreMidSaveRes = editor.preMidSaveRes; //이전 중간저장개체
	
	this.getMiddleEditFeatureRes = function(_oRes){
		if(_oRes.feature_list.length !== 0) {
			oPreMidSaveRes = _oRes;
		} else {
			oPreMidSaveRes = null;
		}
	}
	
	this.getDelCnt = function(_oRes){
		_oRes;
	}
	
	this.serverCall = function(_oData, _sUrl, _fCallBack){
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: _sUrl,
			data: _oData,
			async : false,
			success: _fCallBack,
			error: function(xhr, status, error) {
				COMMON.showMessage('편집오류 & 중간저장 개체 sync 오류.');
			}
		});
	}

	//편집대상 레이어 변경 시 WFS 레이어의 필터 생성을 위해 중간저장개체를 추출<DB접속>하게 됨.
	//이후 편집모니터 갱신을 위해 다시 fn_get_middleEditList이 호출하게 되는데 이때만 이전 추출값을 그대로 사용하기 위한..조건
	if(!oPreMidSaveRes){
		var oParamData = {};
		oParamData.userId = COMMON.fn_get_userId();//FIXME
		this.serverCall(oParamData, '/getMiddleEditFeature.do', this.getMiddleEditFeatureRes);	
	}
	
	// 중간 저장된 객체 담기
	if(oPreMidSaveRes && oPreMidSaveRes.feature_list && oPreMidSaveRes.feature_list.length > 0){
		var nSearchLen = oPreMidSaveRes.feature_list.length;
		var oSearchResult = oPreMidSaveRes.feature_list;
		var sG2Id, sTblName, nState;

		for(var i = 0; i < nSearchLen; i++){			
			sG2Id = String(oSearchResult[i].g2_ID);
			sTblName = oSearchResult[i].g2_NAME;
			nState = oSearchResult[i].g2_STATE;
			
			if(nState === 2 || nState === 4){
				if(!oChkMidSave.modifyNdel[sTblName]){
					oChkMidSave.modifyNdel[sTblName] = {
							g2IdList : []
					};
					oChkMidSave.modifyNdel[sTblName].g2IdList.push(sG2Id);
				}
				else
					oChkMidSave.modifyNdel[sTblName].g2IdList.push(sG2Id);
			}
		}
	}

	// DB에서 비교 체크하여 중간 저장 테이블에서 삭제하기
	// 1. 추가된 객체 비교하여 삭제하기 : g2s_edithistory에서 찾아서(g2_remark만 비교) 있으면, 중간저장 테이블에서 삭제하기
	var oCallData = {userId : COMMON.fn_get_userId()};//FIXME
	this.serverCall(oCallData, '/mapedit/deleteMidSaveCompHistory.do', this.getDelCnt);
	
	// 2. 수정 or 삭제된 객체 비교하여 삭제하기 : 각 dataset_edit(ex. WTL_PIPE_LM_EDIT) 테이블에서 찾기
	if(!COMMON.isEmptyObject(oChkMidSave.modifyNdel)){
		var oCallData = {oModifyNDel : JSON.stringify(oChkMidSave.modifyNdel)};
		this.serverCall(oCallData, '/mapedit/deleteMidSaveCompEdit.do', this.getDelCnt);
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description  중간저장된 편집중인 feature를 추출하고 그 결과를 편집모니터창에 표출한다.
* ----------------------------------------------------------------------------------------------------
* 2015.08.19		최재훈(제품개발팀)		최초 생성
* 2015.10.15		윤은희(제품개발팀)		StyleVectorLayer 생성추가
* 2015.10.20		윤은희(제품개발팀)		검색결과 없을 경우 clear처리(기존 값 남아있는 문제수정)
* 2016.06			최재훈(제품개발팀)		fn_wfs_init 처리 후 바로 수행하는경우 DB접속하지 않고 이전 검색결과 활용하도록...
* @author 최재훈(2015.08.19)
*/
var fn_get_middleEditList = function (){
	var oParamData = {};
	oParamData.userId = COMMON.fn_get_userId();//FIXME

	var oPreMidSaveRes = editor.preMidSaveRes; //이전 중간저장개체

	//편집대상 레이어 변경 시 WFS 레이어의 필터 생성을 위해 중간저장개체를 추출<DB접속>하게 됨.
	//이후 편집모니터 갱신을 위해 다시 fn_get_middleEditList이 호출하게 되는데 이때만 이전 추출값을 그대로 사용하기 위한..조건
	if(!oPreMidSaveRes){
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/getMiddleEditFeature.do',
			data : oParamData ,
			async : false,
			success: function(_oRes) {
				
				if(_oRes.feature_list.length !== 0) {
					oPreMidSaveRes = _oRes;
				} else {
					oPreMidSaveRes = null;
				}
				
			},
			error: function(xhr, status, error) {
				COMMON.showMessage('편집오류 & 중간저장개체 추출 오류!.');
			}
		});
	}

	oPreMidSaveRes = oPreMidSaveRes || {};

	if(oPreMidSaveRes.feature_list && oPreMidSaveRes.feature_list.length > 0){
		var oSelectedObjInfo = fn_create_jsonDataByResponse(oPreMidSaveRes);
		var aInitSelInfo = oSelectedObjInfo.split(',');
		if(aInitSelInfo.length > 1 && aInitSelInfo[0] != 'undefined'){
			var sTblName = aInitSelInfo[0];
			var sG2Id = aInitSelInfo[1];
			fn_add_featureOnStyleVector(editor.editingFeatures);
			fn_show_editMonitor($('#editListTree'),$('#editContent'),sTblName,sG2Id, 2);
			//fn_create_editMonitor($('#editListTree'),$('#editContent'),sTblName,sG2Id, 2);
		}
		else{
			fn_show_editMonitor($('#editListTree'),$('#editContent'),null,null, 2);
			//fn_create_editMonitor($('#editListTree'),$('#editContent'),null,null, 2);
		}
	}
	else{
		fn_init_editingFeature();
	}

	editor.preMidSaveRes = null; //이전 중간저장개체 추출값 초기화

};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 중간 저장 테이블에 존재하는(편집중인) feature를 각 레이어의 스타일로 표출함.
* @author 윤은희(2015.10.15)
* @param {Object} _oRes : 편집중인 레이어와 feature정보를 모두 가지고 있는 obj
*/
function fn_add_featureOnStyleVector(_oRes){

	var oGInnerFeature = null;
	var sTableName = null;
	var sCurLayerName = COMMON.fn_get_editingLayer();
	var sG2Id = null;

	editor.styleLayer.removeAllFeatures();

	for(i=0, len=_oRes.LayerList.length; i<len; i++){
		sTableName = _oRes.LayerList[i];

		var oCurEditLayerInfo = COMMON.fn_get_layerInfo(sCurLayerName);

		//편집중인 레이어의 참조레이어 정보가 있으면fn_check_includeRefLayer
		if(oCurEditLayerInfo.refLayerList) {
			if(oCurEditLayerInfo.refLayerList.indexOf(sTableName) > -1) {
				for(j=0, fLen=_oRes[sTableName].g2IdList.length; j<fLen; j++){
					sG2Id = _oRes[sTableName].g2IdList[j];

					oGInnerFeature = editor.makeFeatureByPosList(_oRes[sTableName][sG2Id].type, _oRes[sTableName][sG2Id].posList, sTableName.concat('.', sG2Id));
					if(_oRes[sTableName][sG2Id].editState !== editor.editState['delete'] && _oRes[sTableName][sG2Id].editState !== editor.editState['pseudo'])
						editor.addDrawFeature(editor.styleLayer ,oGInnerFeature, sTableName);
					else
						editor.addUnDrawFeature(editor.styleLayer ,oGInnerFeature);
				}
			}
		}
		else {
			if(COMMON.fn_get_editingLayer() === sTableName) {

				for(j=0, fLen=_oRes[sTableName].g2IdList.length; j<fLen; j++){
					sG2Id = _oRes[sTableName].g2IdList[j];

					oGInnerFeature = editor.makeFeatureByPosList(_oRes[sTableName][sG2Id].type, _oRes[sTableName][sG2Id].posList, sTableName.concat('.', sG2Id));
					if(_oRes[sTableName][sG2Id].editState !== editor.editState['delete'] && _oRes[sTableName][sG2Id].editState !== editor.editState['pseudo'])
						editor.addDrawFeature(editor.styleLayer, oGInnerFeature, sTableName);
					else
						editor.addUnDrawFeature(editor.styleLayer ,oGInnerFeature);
				}
			}
		}
	}
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 레이어 편집시 함께 visible 되어야 하는 레이어 자동 on처리 및 편집 초기 축척 조정
* @author 윤은희(2015.08.13)
* @param {Object} _oData : 편집 참조 레이어 정보
*/
function fn_show_refLayer(_oData){
	var nResultLen = _oData.result_refLyr.length;
	var sEditLayer, sRrefEngLayer, sRrefKorLayer, sRefShowYN;

	editor.arrRefWmsLayer = []; //참조레이어이지만  WMS 로 그려낼 레이어 목록

	for(var i=0; i<nResultLen; i++){

		sEditLayer 	  	= _oData.result_refLyr[i].EDITLYR_ENG_NM;
		sRrefEngLayer 	= _oData.result_refLyr[i].REFLYR_ENG_NM;
		sRrefKorLayer 	= _oData.result_refLyr[i].REFLYR_KOREAN_NM;
		sRefWfsDraw    	= _oData.result_refLyr[i].WFS_DRAW;

		var oLayerInfo = COMMON.fn_get_layerInfo(sEditLayer);

		if(i === 0)
			oLayerInfo.refLayerList = [];

		oLayerInfo.refLayerList.push(sRrefEngLayer);
		var oElement = $("#divLayerTree li.layer[id=layer_"+layerTool.layers[sRrefEngLayer].id+"]");
		
		if(oElement.attr("id") && oElement[0]) {
			
			var sLayerId = oElement.attr("id").replace("layer_","");
			var bShow = 0;

			if(sRefWfsDraw === "0")		//급수전 계량기를 편집할 때 상수관로는 참조레이어이지만 WFS일 필요는 없는...CASE
				editor.arrRefWmsLayer.push(sRrefEngLayer);

			//라벨(주석)만 WMS 표출 처리
			var oTmpElement = oElement[0].childNodes[2];
			if(oTmpElement !== undefined){
				var nStyleCount = oTmpElement.childElementCount;
				var oSld = layerTool.getSld();
				
				if(nStyleCount > 0){
					var sTmpLyrId = oElement[0].id.replace("layer_","");

					for(var q=0; q<nStyleCount; q++){
						var oTmpStyleElement = oElement[0].childNodes[2].childNodes[q];
						var sOrgId = oTmpStyleElement.id;
						var sTmpId = sOrgId.replace("style_","").replace("_symbol","");
						var aTmpId = sTmpId.split("_");
						var oRule = oSld.namedLayers[aTmpId[0]].userStyle[aTmpId[1]].rules[aTmpId[2]];

						if(oRule){
							
							if(sOrgId.indexOf('text') > -1 || sRefWfsDraw === "0") {
								editor.addRefExpWmsLayer(sRrefEngLayer);

								layerTool.setLayerAttr({
									con : 'id',
									conVal : sTmpLyrId,
									attr : 'show',
									value : 1
								});

								$('#divLayerTree').jstree('check_node', oTmpStyleElement);
								oRule.hidden = false;
							}
							else
								oRule.hidden = true;
							
						}
						
					}
				}
			}
		}
		
	}
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description  편집대상 레이어 선택(변경) 시 해당 레이어와 참조레이어는 편집룰 및 스냅핑 적용을 위해 Wfs 레이어로 생성
* * ----------------------------------------------------------------------------------------------------
* 2015.10.19		최재훈(제품개발팀)		최초 생성
* 2015.11.20		윤은희(제품개발팀)		filter적용
* 2016.05.10		최재훈(제품개발팀)		snapLayer 중복입력 방지
* @param  {String} _sPreLayer : 편집대상 레이어
* @param  {String} _sCaller : fn_init_wfs을 호출한 function
* @author 최재훈(2015.10.19)
*/
function fn_init_wfs(_sPreLayer, _sCaller){

	map.cleanMap();

	if(_sPreLayer)
		fn_remove_preRefEditingLayer(_sPreLayer);
	fn_redraw_refEditingFeature();

	var sEditingLayer = COMMON.fn_get_editingLayer();
	var oLayerInfo = COMMON.fn_get_layerInfo(sEditingLayer);
	var aRefLayerList = oLayerInfo.refLayerList;
	var nRefLayerLen = aRefLayerList.length;

	var nMaxScale = 0;
	fn_init_selectJstree();

	// 중간저장 객체들은 제하고 WFS레이어 생성하도록 Filter처리추가(중복 draw 방지) - ehyun
	var oParamData = {};
	oParamData.userId = COMMON.fn_get_userId();//FIXME
	$.ajax({
		type: 'post',
		dataType: 'json',
		url: '/getMiddleEditFeature.do',
		data : oParamData ,
		async : false,
		success: function(_oRes) {
				
				if(_oRes.feature_list.length !== 0) {
					editor.preMidSaveRes = _oRes;
				} else {
					editor.preMidSaveRes = null;
				}
				editor.aEditLayers.splice(4,editor.aEditLayers.length); // 편집에 사용되는 기본 벡터레이어 4종 제외 모두 제거...초기화 시 제외 대상 레이어 목록

				for(var i = 0; i < nRefLayerLen; i++) {

					var sWfsLayer = aRefLayerList[i];
					var sFeatureType = sWfsLayer;
					
					//if(CONFIG.fn_get_gisEngineType() === "GeoServer")
					//	sFeatureType = COMMON.fn_get_EditKorLayerNm(sWfsLayer);
					
					editor.addEditLayer(sWfsLayer); //편집에 사용되는 벡터레이어 id 추가

					if(editor.arrRefWmsLayer.indexOf(sWfsLayer) === -1){

						debugger;
						var oEditstyleMap = fn_get_styleMap(sWfsLayer);

						//proxy를 사용하는 방법으로 변경 필요!!!!!
						//WFS/v1.js 수정...
						var oValidScaleInfo = fn_get_refScale(COMMON.fn_get_currentSystem(), sWfsLayer); //FIXME : 'WTL'대신 시스템 코드값을 갖는 변수로 대체
						var oEditWfsLayer = new NUTs.Layer.Vector(sWfsLayer, {
							strategies: [new OpenLayers.Strategy.BBOX({
								ratio : 1
							})],
					        styleMap: oEditstyleMap,
					        filter: '',
				            protocol: new NUTs.Protocol.ProtocolWFS({
				            	version : '1.1.0',
				            	url: CONFIG.fn_get_wfsServiceUrl(),
				            	featureType: sFeatureType,
				            	featurePrefix: CONFIG.fn_get_dataHouseName(),
				            	geometryName: CONFIG.fn_get_geometryField(),
				            	srsName: CONFIG.fn_get_requestCrs()
				            }),
					        minScale: 1/(oValidScaleInfo.min + 1),
					        maxScale: 1/oValidScaleInfo.max,
					        isWfsLayer: true
						});

						if(nMaxScale < oValidScaleInfo.min){
							nMaxScale = oValidScaleInfo.min;
						}

						// filter 생성
						//edit ggash 20170124 for geoserver - FID대체 컬럼 (FID)을 인식하지 못하는 문제 수정전까지는 Filter적용되지 않도록 주석처리함. 
						/*var aFilter = [];
						for(var j=0,nLen=_oRes.feature_list.length; j<nLen; j++){
							if(_oRes.feature_list[j].g2_NAME == sWfsLayer){
								var oFilterStrategy = new OpenLayers.Filter.Comparison({
									type: OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
									property: CONFIG.fn_get_featureIdField(),
									value: _oRes.feature_list[j].g2_ID
							    });
								aFilter.push(oFilterStrategy);
							}
						}

						if(aFilter.length>0){
							var oFilterOper;
							if(aFilter.length > 1){
								oFilterOper = new OpenLayers.Filter.Logical({
					                type: OpenLayers.Filter.Logical.AND,
					                filters: aFilter
					            });
							}
							else{
								oFilterOper = aFilter[0];
							}
							oEditWfsLayer.filter = oFilterOper;
						}*/
						// filter 생성 끝

						if(map.getLayerByName(sWfsLayer)){
							map.removeLayerByName(sWfsLayer);
						}
						map.addLayer(oEditWfsLayer);
					}
				}

				if(_sCaller !== 'dbclick' && _sCaller !== 'saveEdit')
					map.zoomToScale(nMaxScale);
		},
		error: function(xhr, status, error) {
			COMMON.showMessage('편집오류 & fn_init_wfs 오류');
		}
	});
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 벡터로 그려지는 편집(참조)레이어의 유효축척 추출
* @param {String} _sSysCde : 시스템코드 (WTL,SWL,RDL)
* @param {String} _sLayer : 편집대상 레이어 영문명
* @returns {Object} 레이어의 최소,최대 축척값
* @author 최재훈(2015.10.19)
* edit by 최재훈(2017.01.23) - 최소/최대 서비스 축척 자동계산되도록...
*/
var fn_get_refScale = function(_sSysCde, _sLayer){

	var oRefScale = CONFIG.fn_get_refScaleInfo();
	var nBaseMaxScale = COMMON.fn_get_scaleByRes(map.minResolution);
	var nBaseMinScale = COMMON.fn_get_scaleByRes(map.minResolution * 2);
	var oValidScale = {};

	for(var item in oRefScale[_sSysCde]) {
		if(item == _sLayer) {
			nBaseMaxScale = oRefScale[_sSysCde][item].max;
			nBaseMinScale = oRefScale[_sSysCde][item].min;
			break;
		}
	}

	oValidScale = {
			"max" : nBaseMaxScale,
			"min" : nBaseMinScale
	};

	return oValidScale;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description  편집대상 레이어 선택(변경) 시 참조레이어 초기화(삭제)
* @param {String} _sPreLayer : 편집대상 레이어
* @author 최재훈(2015.10.19)
*/
var fn_remove_preRefEditingLayer = function (_sPreLayer){
	var oRefLayerList = COMMON.fn_get_layerInfo(_sPreLayer).refLayerList;
	var i, oLayer, nQty = oRefLayerList.length;
	for(i = 0;  i < nQty ; i++){
		oLayer = map.getLayerByName(oRefLayerList[i]);
		if(oLayer)
			map.removeLayer(oLayer);
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description  편집대상 레이어 변경 시 map.cleanMap();을 통해 기존에 편집대상 레이어의 참조(혹은 스냅)레이어를 모두 지우게 됨.
* 이때 편집 진행중인(= 편집모니터에 추가된) feature중 선택된 편집대상레이어의 참조레이어의 feature는 다시 draw처리.
* @param _sPreLayer : 편집대상 레이어
* @author 최재훈(2015.10.21)
*/
function fn_redraw_refEditingFeature(){

	if(editor.editingFeatures){
		var oEmLayerList = editor.editingFeatures.LayerList;
		var sEditingTblName = COMMON.fn_get_editingLayer();

		for(var i = 0, nLayerLen = oEmLayerList.length; i < nLayerLen; i++ ){
			var sTblName = oEmLayerList[i];
			if(COMMON.fn_check_includeRefLayer(sTblName)){
				var nFeatureLen = editor.editingFeatures[sTblName].g2IdList.length;
				for(var j = 0; j < nFeatureLen ; j++){
					var sG2Id = editor.editingFeatures[sTblName].g2IdList[j];
					var oEditingFeature = editor.editingFeatures[sTblName][sG2Id];
					var oGInnerFeature = editor.makeFeatureByPosList(COMMON.fn_get_EditLayerType(sTblName), oEditingFeature.posList, sTblName.concat('.', sG2Id));

					if(oEditingFeature.editState === editor.editState['delete'] || oEditingFeature.editState === editor.editState['pseudo'])
						editor.addUnDrawFeature(editor.styleLayer, oGInnerFeature);
					else
						editor.addDrawFeature(editor.styleLayer, oGInnerFeature, sTblName);

					//편집중인 feature 심볼 유지처리
					if(sEditingTblName === sTblName && sG2Id == editor.selectedG2Id) {
							editor.addDrawFeature(editor.editLayer, oGInnerFeature, 'select');

						var sFeatureType = editor.getFeatureType(oGInnerFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.',''));
						if(sFeatureType.toUpperCase() !== "POINT")
							fn_draw_oneFeatureBorder(oGInnerFeature);

						map.setLayerIndex(editor.editLayer, 9999);
					}
				}
			}
		}
	}
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집대상 레이어 변경 시 선택된 레이어는 WMS 요청 목록에서 제외처리 (레이어 목록 선택 UI 갱신 포함)
* @author 최재훈(2015.10.21)
*/
function fn_init_selectJstree(){
	var aAddLyrId = [];

	var sEditingLayer = COMMON.fn_get_editingLayer();
	var oLayerInfo = COMMON.fn_get_layerInfo(sEditingLayer);
	var aRefLayerList = oLayerInfo.refLayerList;

	if(editor.arrRefExpWmsLayer.length > 0){
		for(i=0, nRefWmsLayerLen=editor.arrRefExpWmsLayer.length; i < nRefWmsLayerLen; i++) {
			var sRefExpWmsLayer = editor.arrRefExpWmsLayer[i];

			if(aRefLayerList.indexOf(sRefExpWmsLayer) === -1){ //편집중인 레이어의 참조레이어가 아닌데 (이미)  WMS참조레이어로 그려진 경우 보이지 않도록...
				STYLE.fn_toggle_allRuleWmsLayer("off",sRefExpWmsLayer);
				STYLE.fn_select_treeAllRuleNode(sRefExpWmsLayer);
			}
		}
	}


	$('#divLayerTree ul li .layer').each(function() {
		if(aAddLyrId.indexOf($(this).attr('id').replace('layer_','')) >  -1)
			$('#divLayerTree').jstree('uncheck_node',$(this));
	});

	$('#divLayerTree').jstree('redraw');

}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 종료, 편집 취소 시 WMS로 그려낸 참조레이어 초기화
* @author 최재훈(2016.04.12)
*/
function fn_hide_refWmsLayer(){
	var sEditingLayer = COMMON.fn_get_editingLayer();
	var oLayerInfo = COMMON.fn_get_layerInfo(sEditingLayer);
	var aRefLayerList = oLayerInfo.refLayerList;

	if(editor.arrRefExpWmsLayer.length > 0){
		for(i=0, nRefWmsLayerLen=editor.arrRefExpWmsLayer.length; i < nRefWmsLayerLen; i++) {
			var sRefExpWmsLayer = editor.arrRefExpWmsLayer[i];
			STYLE.fn_toggle_allRuleWmsLayer("off",sRefExpWmsLayer);
			STYLE.fn_select_treeAllRuleNode(sRefExpWmsLayer);
		}
	}
	MAP.fn_redraw_wms();
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description layerTool이 가지고 있는 SLD 스타일 정보를 파싱하여 편집 레이어의 styleMap 설정
* @author 윤은희(2015.11.19)
* @param {String} _sLayer : 편집 레이어
* s {Object} 레이어의 스타일 객체(styleMap)
*/
function fn_get_styleMap(_sLayer){
	var oStyleMap = null;
	var oGetSldStyleLayer = layerTool.sld.namedLayers;

	for(var t=0, nlLen=oGetSldStyleLayer.length; t< nlLen; t++){

		var oStyleMapDefaultStyle = {};
		var oStyleMapRules = {
				rules : []
		};
		var oUserStyle;

		if(STYLE.fn_get_tableNameFromNamedLayer(oGetSldStyleLayer[t]) === _sLayer){
			oUserStyle = oGetSldStyleLayer[t].userStyle[0].rules;

			for(var i=0, len=oUserStyle.length; i<len; i++){
				var oRule ={
						symbolizer : {}
				};

				var oRuleFilter = oUserStyle[i].filter;
				if(!COMMON.isEmptyObject(oRuleFilter)){
					oRule.filter = {};
					oRule.filter = NUTs.EditStyle.getStyleFilter(oRuleFilter.type, oRuleFilter.property, oRuleFilter.value);
				}

				/*var oPoint = oUserStyle[i].symbolizer.point;
				var oLine = oUserStyle[i].symbolizer.line;
				var oPolygon = oUserStyle[i].symbolizer.polygon;
				var oText = oUserStyle[i].symbolizer.text;

				if(oPoint)
					oRule.symbolizer = NUTs.EditStyle.getSymbolizerPoint(oPoint.externalGraphic, oPoint.size, oPoint.opacity);

				if(oLine)
					oRule.symbolizer = NUTs.EditStyle.getSymbolizerLineString(oLine.stroke, oLine.strokeDashArray, oLine.strokeWidth, oLine.strokeOpacity, oLine.strokeLinecap, 1);

				if(oPolygon)
					oRule.symbolizer = NUTs.EditStyle.getSymbolizerPolygon(oPolygon.fillColor, oPolygon.fillOpacity);*/

				/*if(oText)
					oRule.symbolizer = NUTs.EditStyle.getSymbolizerText(oText.label, oText.fillColor, oText.fontSize, oText.fontFamily, oText.fontWeight,oText.codeDomain);*/
				/*if( 0<= i && i<=1 && oText === undefined) // 첫번째 심볼이 주석인 경우는 Default심볼로 담지 않음.
					oStyleMapDefaultStyle = oRule.symbolizer;*/

				if(!oUserStyle[i].symbolizer.text){
					oRule.symbolizer = NUTs.EditStyle.getSymbolizer(oUserStyle[i].symbolizer);
					oStyleMapRules.rules.push(oRule);
				}
			}
			/*if(oUserStyle.length > 1)
				oStyleMap = NUTs.EditStyle.getObjectStyleMapHasRules(oStyleMapDefaultStyle, oStyleMapRules);
			else
				oStyleMap = NUTs.EditStyle.getObjectStyleMap(oStyleMapDefaultStyle);*/
			oStyleMap = NUTs.EditStyle.getObjectStyleMapHasRules(oStyleMapDefaultStyle, oStyleMapRules);
			break;
		}
	}

	return oStyleMap;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 참조선 관련 OpenLayers 팝업(거리 표출용 등) 화면에서 제거
* @author 최재훈(2015.10.21)
*/
var fn_clear_refLinePopup = function (){
	var nRefPopLength = map.popups.length;

	for(var i=0;i<nRefPopLength;i++){
		if(map.popups[i].type == 'refLine') {
			map.removePopup(map.popups[i]);
		}
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 병합 관련 팝업 화면에서 제거
* @author 최재훈(2016.04.20)
*/
var fn_clear_mergePopup = function (){
	var nPopLength = map.popups.length;

	for(var i=0;i<nPopLength;i++){
		if(map.popups[i].type == 'mergeFeature') {
			map.removePopup(map.popups[i]);
		}
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 레이어 편집시 참조하게 되는 레이어 자동 스냅 설정처리
* 2016.03.02 최초 스냅레이어 목록정보에서 레이어  On/Off 처리하다 참조레이어 정보를 기준으로 On/Off로 변경함에 따른 불필요한 코드 제거
			 fn_init_snapLayerInfo, fn_add_snapLayerlist, fn_delete_snapLayerlist...etc
  2016.04.06 스냅대상레이어 및 지점 동적 구성 방식으로 변경 참조레이어가 아닌스냅레이어 정보 기준으로 처리	C.J.H
* @author 윤은희(2015.08.13)
* @param {String} _sLayer : 편집레이어 영문명
*/
function fn_init_snapMng(_sLayer){
	var nResultLen = 0;
	var oEl, oLabel1;
	$.ajax({
		type: 'post',
		dataType: 'json',
		data: {
			editLayerValue : _sLayer
		},
		url: '/getEditSnapInfo.do',
		success: function(_oRes) {
			nResultLen = _oRes.result_snapLyr.length;

			var snapCtrl = map.getControl("SnappingSettings");

			if(nResultLen > 0) {
				for(var i=0; i<nResultLen; i++){

					(function(_nIdx) {
						var oRsltInfo = _oRes.result_snapLyr[_nIdx];
						var sSnapLayer = oRsltInfo.SNAPLYR_ENG_NM;

						if(!editor.layerSnapInfo[sSnapLayer])
							editor.layerSnapInfo[sSnapLayer] = {};

						editor.layerSnapInfo[sSnapLayer]['node'] = parseInt(oRsltInfo.SNAP_NODE);
						editor.layerSnapInfo[sSnapLayer]['vertex'] = parseInt(oRsltInfo.SNAP_VERTEX);
						editor.layerSnapInfo[sSnapLayer]['edge'] = parseInt(oRsltInfo.SNAP_EDGE);

						if(i===0){
							oEl = document.createElement('dd');
							oLabel1 = document.createElement('label');
							oLabel1.className = 'snapLayer';
							oLabel1.innerHTML = '스냅대상';

							var oLabel2 = document.createElement('label');
							oLabel2.innerHTML = ' 선';

							var oLabel3 = document.createElement('label');
							oLabel3.innerHTML = ' 정점';

							var oLabel4 = document.createElement('label');
							oLabel4.innerHTML = ' 끝점';

							oEl.appendChild(oLabel1);
							oEl.appendChild(oLabel2);
							oEl.appendChild(oLabel3);
							oEl.appendChild(oLabel4);

							$('#snapMng .SBx').text('');
							$('#snapMng .SBx').append(oEl);
						}

						oEl = document.createElement('dd');
						oLabel1 = document.createElement('label');
						oLabel1.className = 'snapLayer';
						oLabel1.innerHTML = COMMON.fn_get_EditKorLayerNm(sSnapLayer);

						var oInput1 = document.createElement('input');
						oInput1.type = 'checkbox';
						oInput1.id = sSnapLayer+'_line';
						oInput1.onclick = function(){fn_apply_snap(sSnapLayer);};

						if(parseInt(oRsltInfo.SNAP_EDGE)){
							oInput1.checked = true;
						}

						var oInput2 = document.createElement('input');
						oInput2.type = 'checkbox';
						oInput2.id = sSnapLayer+'_vertex';
						oInput2.onclick = function(){fn_apply_snap(sSnapLayer);};

						if(parseInt(oRsltInfo.SNAP_VERTEX)){
							oInput2.checked = true;
						}

						var oInput3 = document.createElement('input');
						oInput3.type = 'checkbox';
						oInput3.id = sSnapLayer+'_end';
						oInput3.onclick = function(){fn_apply_snap(sSnapLayer);};

						if(parseInt(oRsltInfo.SNAP_NODE)){
							oInput3.checked = true;
						}

						oEl.appendChild(oLabel1);
						oEl.appendChild(oInput1);
						oEl.appendChild(oInput2);
						oEl.appendChild(oInput3);

						$('#snapMng .SBx').append(oEl);

						//스냅컨트롤에 스냅처리할 레이어정보 SET
						var bInSnapControl = false;
						for(var t=0, nLayerLen= snapCtrl.snappingLayers.length; t<nLayerLen; t++){
							if(snapCtrl.snappingLayers[t].name === sSnapLayer){
								bInSnapControl = true;
								break;
							}
						}
						if(bInSnapControl === false){

							var oEditSnapLayer = map.getLayerByName(sSnapLayer);
							if(oEditSnapLayer)
								snapCtrl.addSnappingLayer(oEditSnapLayer);

						}

					})(i);

				}
				snapCtrl.changeSnapping();

				//snappingControl 에 등록된 target레이어의 스내핑지점(node,vertex,edge) SETTING (최초)

				if(snapCtrl.snapping.targets){
					var snapTargets = snapCtrl.snapping.targets;

					var types = ['node','vertex','edge'];
					for(var q = 0, nLayerLen = snapTargets.length; q < nLayerLen; q++) {
						var target = snapTargets[q];

						for(var k = 0; k < types.length; k++) {
							var oSnapInfo = editor.layerSnapInfo[target.layer.name];
							if(oSnapInfo) {
								if(oSnapInfo[types[k]] === 1)
									target[types[k]] = true;
								else
									target[types[k]] = false;

								//console.log('[fn_init_snapMng]'+target.layer.name + '/' + types[k] + ':' + target[types[k]]);
							}
						}
						fn_apply_snap(target.layer.name);
					}
				}
			}
			else{
				$('#snapMng .SBx').text('등록된 스냅정보가 없습니다');
			}

			$('.olEditorControlEditorCustomPanel').hide();
		},
		error: function(xhr, status, error) {
			COMMON.showMessage('편집오류 & 편집대상 레이어의 스냅정보 추출 중 오류 발생');
		}
	});
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 대상 레이어 변경(선택) 시 스내핑 대상 설정 및 변경
* @author 최재훈(2015.10.21)
* @param
*/
function fn_apply_snap(_sLayerName){

	var bLineChecked = 	$("input:checkbox[id='"+ _sLayerName +"_line']").is(":checked");
	var bVertexChecked = 	$("input:checkbox[id='"+ _sLayerName +"_vertex']").is(":checked");
	var bEndChecked = 	$("input:checkbox[id='"+ _sLayerName +"_end']").is(":checked");

	var snapCtrl = map.getControl("SnappingSettings");

	var bSnap = true;

	if(!bLineChecked && !bVertexChecked && !bEndChecked){
		bSnap = false;
	}
	
	if(snapCtrl){
		var oLayer = map.getLayerByName(_sLayerName);
		snapCtrl.setLayerSnapping(oLayer, bSnap);
		if(snapCtrl.snapping.targets){
			var snapTargets = snapCtrl.snapping.targets;
			var types = ['node','vertex','edge'];
			for(var q = 0, nLayerLen = snapTargets.length ; q < nLayerLen ; q++) {
				var target = snapTargets[q];

				if(target.layer){
					if(target.layer.name == _sLayerName) {
						target.layer = oLayer;
						target['edge'] 		= bLineChecked;
						target['vertex'] 	= bVertexChecked;
						target['node'] 		= bEndChecked;

						target.tolerance = fn_get_snapDistance();
						target.edgeTolerance = fn_get_snapDistance();
						target.vertexTolerance = fn_get_snapDistance();
						target.nodeTolerance = fn_get_snapDistance();

						//console.log('[fn_apply_snap]' + _sLayerName + ',' + target['edge'] + '/'+ target['vertex'] + '/'+ target['node']);
						break;
					}
				}
			}
		}
	}
}

var fn_get_snapDistance = function(){
	var nDist = $("#txtSnapDist").val();
	var sUnit = $("#selSnapUnit option:selected").text().toUpperCase();
	var nScale;
	if(sUnit === "METER"){
		nScale = map.getResolution();
		nDist *= parseFloat(1/nScale).toFixed();
	}
	if(!nDist)
		nDist = 1;
	return nDist;
};


var fn_get_snapMark = function(){
	var sUnitMark = 'px';
	var sUnit = $("#selSnapUnit option:selected").text().toUpperCase();

	if(sUnit === "METER"){
		sUnitMark = 'm';
	}
	return sUnitMark;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집중인 레이어/Feature정보 를 담고 있는 obj 초기화
* @author 최재훈(2015.10.21)
*/
function fn_init_editingFeature(){
	editor.initEditingFeatureObj()

	if(COMMON.fn_get_editingLayer()){
		editor.editingFeatures[COMMON.fn_get_editingLayer()] = {
				g2IdList : []
		};
	}
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집모니터에 등록된 모든 편집 레이어의 filter정보를 초기화한다.
* @author 윤은희(2016.3.8)
*/
function fn_init_filterOnWFSLayer(){

	for(var i=0,len=editor.editingFeatures.LayerList.length;i<len;i++){
		var sEditWfsLayer = editor.editingFeatures.LayerList[i];
		var oWfsLayerOnMap = map.getLayerByName(sEditWfsLayer);
		if(oWfsLayerOnMap)
			oWfsLayerOnMap.filter = '';
	}
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description  편집모니터에 객체가 삭제되는 시점에 해당 WFS 레이어의 Filter 삭제
* @param  {String} _sLayer : 갱신할 대상 레이어
* @param  {String} _sG2Id : Filter 삭제할 대상 객체 G2 ID
* @author 윤은희(2016.10.07)
*/
var fn_del_filterOnWFSLayer = function(_sLayer, _sG2Id){
	var oWfsLayer = map.getLayerByName(_sLayer);
	if(oWfsLayer){
		if(_sG2Id){
			if(oWfsLayer.filter){
				if(oWfsLayer.filter.filters){
					var nFilterLen = oWfsLayer.filter.filters.length;
					if(nFilterLen === 2){	// filters.type(=&&) 유지를 위해 2개가 존재하도록 해야함.
						var nChk = 0;
						for(var i=0; i<nFilterLen; i++){
							if(_sG2Id === oWfsLayer.filter.filters[i].value)
								nChk++;
						}
						
						if(nChk === nFilterLen){
							oWfsLayer.filter = '';
						}
						/*else{	// 같은 g2Id로 중복되어 구성되어 있던 filter의 경우 : filters.type(=&&) 유지를 위해 2개가 존재하도록 해야함.
							var sReplaceG2Id, idx;
							for(var i=0; i<nFilterLen; i++){
								if(_sG2Id === oWfsLayer.filter.filters[i].value)
									idx = i;
								else
									sReplaceG2Id = oWfsLayer.filter.filters[i].value;
							}
							oWfsLayer.filter.filters[idx].value = sReplaceG2Id;	
						}			*/			
						else{
							var oNewFilter ={
									property : '',
									type : '',
									value : ''
							}
							for(var idx in oWfsLayer.filter.filters){
								if(_sG2Id !== oWfsLayer.filter.filters[idx].value){
									oNewFilter.property = oWfsLayer.filter.filters[idx].property;
									oNewFilter.type = oWfsLayer.filter.filters[idx].type;
									oNewFilter.value = oWfsLayer.filter.filters[idx].value;
								}
							}
							oWfsLayer.filter = '';
							oWfsLayer.filter = oNewFilter;
						}
					}
					else if(nFilterLen > 2){
						for(var idx in oWfsLayer.filter.filters){
							if(_sG2Id === oWfsLayer.filter.filters[idx].value)
								delete oWfsLayer.filter.filters[idx];
						}
					}
				}
				else{
					oWfsLayer.filter = '';
				}
			}
		}
	}
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 선택 레이어 스키마 정보 한글 처리
* @author 윤은희(2015.09.21)
* @param {String} _sLayer : 편집 레이어 영문명
* @param {String} _sFieldName : 필드명
* @returns {String} 한글명
*/
function fn_replace_fieldName(_sLayer,_sFieldName){
	var sRtnVal = null;
	if(editor.layerColumnInfo && editor.layerColumnInfo[_sLayer] && editor.layerColumnInfo[_sLayer].fieldAlias[_sFieldName])
		sRtnVal = editor.layerColumnInfo[_sLayer].fieldAlias[_sFieldName];
	else
		sRtnVal = _sFieldName;
	return 	sRtnVal;
}




/**
* @memberof USV.MAP_EDITOR
* @method
* @description 시설물 신규 번호 가져오기
* @author 윤은희(2015.12.04 )
* @param {String} G2Id
*/
var fn_get_newG2Id = function (){
	 var dNow = new Date();
     return sG2Id = dNow.getTime() + parseInt(Math.random()*1000);
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description  편집모니터에 객체가 등록되는 시점에 해당 WFS 레이어의 Filter 갱신
* @param  {String} _sLayer : 갱신할 대상 레이어
* @param  {String} _sG2Id : Filter에 추가할 대상 객체 G2 ID
* @author 윤은희(2016.3.4)
*/
var fn_update_filterOnWFSLayer = function(_sLayer, _sG2Id){

	var oWfsLayer = map.getLayerByName(_sLayer);

	if(oWfsLayer){
		var oFilterStrategy = new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
			property: 'FID',
			value: _sG2Id
		});

		if(oWfsLayer.filter !== ''){		// 기존에 Filter가 존재하는 경우

			if(oWfsLayer.filter.filters !== undefined){

				// 객체가 이미 Filter에 적용되었다면 더이상 수행하지 않도록 처리.
				for(var i=0, len=oWfsLayer.filter.filters.length; i<len;i++){
					if(_sG2Id == oWfsLayer.filter.filters[i].value)
						return;
				}

				if(oWfsLayer.filter.type === undefined){
					oWfsLayer.filter.type = '&&';
				}
			}
			else{
				var oPreFilterStrategy = oWfsLayer.filter;
				oWfsLayer.filter = {
						filters : [],
						type : '&&'
				}
				oWfsLayer.filter.filters.push(oPreFilterStrategy);
			}
			oWfsLayer.filter.filters.push(oFilterStrategy);
		}
		else{							// Filter가 존재하지 않는 경우 -> Filter 생성
			var oLogicalFilterStrategy = new OpenLayers.Filter.Logical({
			    type: OpenLayers.Filter.Logical.AND,
			    filters: [
			      oFilterStrategy,
			      oFilterStrategy		// 에러 방지용. 최초 생성시에만 사용되는 정보며, 향후 모든 WFS GetFeature 요청문에 더이상 존재하지 않음.
			  ]
			});

			oWfsLayer.filter= oLogicalFilterStrategy;
		}
	}
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 선택된 편집 객체 삭제
* @author 윤은희, 최재훈(2015.08.28)
*/
var fn_remove_feature = function (_bConfirm, _sLayer){
	if(!fn_check_editMode())
		return;

	if(_bConfirm) {
		if (!confirm('삭제 하시겠습니까?')){
			return;
		}
	}

	var sEditLayer;
	
	sEditLayer = _sLayer ? _sLayer : COMMON.fn_get_editingLayer();
	var sTmpSelectedG2Id = editor.selectedG2Id;
	var sFId = sEditLayer.concat('.',sTmpSelectedG2Id);
	var oGInnerCloneFeature = {};
	var oSearchResult , oSearchResultsObj , oSelectedFeature;

	oSearchResult = editor.oSearchResult;
	oSelectedFeature = editor.getFeatureByFid(editor.editLayer, sFId);

	// 도형 검색을 통해 조회된 개체에 대해 삭제시도 시,
	if(oSearchResult){
		oSearchResultsObj = oSearchResult.data[0].results;

		if(oSearchResultsObj.length>0 && !editor.copyMode){
			oSearchResultsObj[0].feature.attributes.fid = sFId;
			oGInnerCloneFeature = fn_deepClone_featureToGInnerFeature(oSearchResultsObj[0].feature);
		}
	}
	else{ // 편집모니터창(&중간저장 테이블)에 관리되고 있는 개체에 대해 삭제시도 시,
		if(oSelectedFeature instanceof Array) {
			if(oSelectedFeature.length > 0) {
				oSelectedFeature[0].fid = oSelectedFeature[0].attributes.fid = sFId;
				oGInnerCloneFeature = fn_deepClone_featureToGInnerFeature(oSelectedFeature[0]);
			}
		}else{
			oSelectedFeature.fid = oSelectedFeature.attributes.fid = sFId;
			oGInnerCloneFeature = fn_deepClone_featureToGInnerFeature(oSelectedFeature);
		}
	}

	this.remove_feature = function(){
		// 도형 검색을 통해 조회된 개체에 대해 삭제시도 시,
		if(oSearchResult && !editor.copyMode){
			if(oSearchResultsObj.length>0){
				if(sEditLayer === "RDL_TREE_PS" || sEditLayer === "RDL_STLT_PS"){
					MAP_EDITOR.fn_update_filterOnWFSLayer(sEditLayer, sTmpSelectedG2Id);
					editor.removeFeatureOnMapLayer(sEditLayer, sTmpSelectedG2Id);
					MAP_EDITOR.fn_create_editingFeature(editor.oSearchResult, sTmpSelectedG2Id, 4);
					MAP_EDITOR.fn_save_middle('insert', sEditLayer, sTmpSelectedG2Id);
				}
				else
					REGISTER.fn_remove_feature(sEditLayer, sTmpSelectedG2Id);

				var sFId = oGInnerCloneFeature.attributes.fid;
				var oCurDelFeature = editor.editLayer.getFeaturesByAttribute('fid', sFId);
				editor.editLayer.drawFeature(oCurDelFeature[0], 'delete');

				// 시설물 검색 수행에서(SEARCH.fn_search_featuresOnWFSLayer) fn_add_featureOnStyleVector(editor.editingFeatures) 과정을 거치면서 styleLayer가 재생성되는데,
				// 삭제수행하면 현재 검색된 객체는 editor.editingFeatures객체에 등록되지 않은 상태이므로, styleLayer에 존재하지 않게 되므로 아래와 같이 styleLayer에 추가 처리함.
				var oCurStyleFeature = editor.styleLayer.getFeaturesByAttribute('fid', sFId);
				if(COMMON.isEmptyObject(oCurStyleFeature) === false)
					editor.styleLayer.drawFeature(oCurStyleFeature[0], 'delete');
				else
					editor.addUnDrawFeature(editor.styleLayer, fn_clone_featureToGInnerFeature(oCurDelFeature[0]));

				var oCurSearchFeature = editor.searchLayer.getFeaturesByAttribute('fid', sFId);
				editor.searchLayer.removeFeatures(oCurSearchFeature);

			}
		}
		else {	// 편집모니터창(&중간저장 테이블)에 관리되고 있는 개체에 대해 삭제시도 시,
			var oFeature = editor.editingFeatures[sEditLayer][sTmpSelectedG2Id];
			if(oSelectedFeature && oFeature){
				if(oFeature.editState === editor.editState['modify']){//편집인 경우
					if(oFeature.midSave === 1){ //중간저장테이블에 저장된 경우
						oFeature.editState = editor.editState['delete'];
						fn_save_middle('update', sEditLayer, sTmpSelectedG2Id);
					}
					else{
						oFeature.editState = editor.editState['delete'];
						fn_save_middle('insert', sEditLayer, sTmpSelectedG2Id);
					}
				}
				else if(oFeature.editState === editor.editState['insert'] && oFeature.midSave === 1){//신규 추가 및 중간저장 테이블에 저장된 경우
						oFeature.editState = editor.editState['pseudo'];	// pseudo Value
						fn_save_middle('update', sEditLayer, sTmpSelectedG2Id);
				}
				//reload
				fn_create_editMonitor($('#editListTree'), $('#editContent'), sEditLayer, sTmpSelectedG2Id);

				// WFS에서 지우기
				editor.removeFeatureOnMapLayer(sEditLayer, sTmpSelectedG2Id);

				// editlayer, stylelayer에서 delete 스타일로 그리기
				if(oSelectedFeature instanceof Array) {
					if(oSelectedFeature && oSelectedFeature.length > 0)
						editor.editLayer.drawFeature(oSelectedFeature[0], 'delete');
				}
				else
					editor.editLayer.drawFeature(oSelectedFeature, 'delete');

				var oTmpFeature = editor.getFeatureByFid(editor.styleLayer, sEditLayer.concat('.',sTmpSelectedG2Id));
				if(oTmpFeature){
					if(oTmpFeature instanceof Array)
						if(oTmpFeature.length > 0)
							editor.styleLayer.drawFeature(oTmpFeature[0], 'delete');
					else
						editor.styleLayer.drawFeature(oTmpFeature, 'delete');
				}
			}
			else if(console){
				//console.log('[fn_remove_feature] - editor.getFeatureByFid('+sEditLayer.concat('.',sTmpSelectedG2Id)+') 검색결과 없음');
			}
		}

		editor.effectLayer.removeAllFeatures();
	}

	if(COMMON.isEmptyObject(oEditRuleInfo.operType.del))
		this.remove_feature();
	// 룰 적용
	else if(fn_call_editRuleInfoforDeleteOnRelatedLayer(oGInnerCloneFeature))
		this.remove_feature();
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description editor.editingFeatures(편집모니터창에서 다루는 편집중인 레이어와 feature정보를 모두 담고 있는 객체)에서 특정 요소를 삭제한다.
* @author 윤은희(2015.11.17)
* @param {String} _sLayer : 레이어 영문명
* @param {String} _sG2Id : 삭제할 G2Id (ex. 1450342086778)
*/
var fn_remove_featureOnEditingFeatures = function(_sLayer, _sG2Id){
	var nIdx = $.inArray(_sG2Id, editor.editingFeatures[_sLayer].g2IdList);
	if(nIdx > -1){
		var sFId = _sLayer.concat('.', _sG2Id);
		editor.editingFeatures[_sLayer].g2IdList.splice(nIdx,1);
		delete editor.editingFeatures[_sLayer][_sG2Id];
		fn_remove_featureOnVectorLayer(editor.editLayer, sFId);
		fn_remove_featureOnVectorLayer(editor.styleLayer, sFId);
	}
	
	editor.effectLayer.removeAllFeatures();
	
	if(editor.editingFeatures[_sLayer].g2IdList.length === 0){
		var nIdx = $.inArray(_sLayer, editor.editingFeatures.LayerList);
		if(nIdx > -1){
			editor.editingFeatures.LayerList.splice(nIdx,1);
			delete editor.editingFeatures[_sLayer];
			if(editor.editingFeatures.LayerList.length ===0)
				editor.editingFeatures = null;
		}
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 지정한 vectorlayer에서 지정한 객체를 삭제한다.
* @author 윤은희(2016.10.06)
* @param {Object} _oLayer : 객체를 삭제할 vector layer
* @param {Object} _oFId : 삭제할 객체의 FID
*/
var fn_remove_featureOnVectorLayer = function(_oLayer, _oFId){
	var oFeature;
	if(typeof _oFId === 'string'){
		oFeature = editor.getFeatureByFid(_oLayer, _oFId);
		if(oFeature)
			_oLayer.destroyFeatures(oFeature, {silent: true});
	}		
	else if(typeof _oFId === 'object'){
		if(_oFId instanceof Array){
			for(var idx in _oFId){
				oFeature = editor.getFeatureByFid(_oLayer, _oFId[idx]);
				if(oFeature)
					_oLayer.destroyFeatures(oFeature, {silent: true});
			}
		}
	}
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 시설물 복제를 취소한다.
* @author 윤은희(2015.11.17)
*/
var fn_cancel_featureCopy = function(){
	// 현재 선택된 G2Id를 강제로 지정
	editor.selectedG2Id = editor.arrCopiedG2Id.splice(editor.arrCopiedG2Id.length-1,1).toString();
	fn_remove_feature();
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 중간 저장 테이블에서 대상 객체를 삭제한다.
* 2016.06.21 ehyun : layer, g2Id를 array로 받아 처리하던 부분을 단일개체로 받아서 처리하도록 변경함.
* @author 윤은희(2015.09.04)
* @param {Object} _objForDel : 편집 중간 저장 테이블에서 삭제할 개체정보
*/
function deleteMidSaveFeature(_objForDel){
	if(_objForDel){
		var sEditLayer= _objForDel.name, sG2Id=_objForDel.g2Id;

		$.ajax({
			type: 'post',
			dataType: 'json',
			data: {
				userId : COMMON.fn_get_userId(),//FIXME
				editLayer : sEditLayer,
				g2Id : sG2Id
			},
			async: false,
			url: '/mapedit/deleteMidSaveFeature.do',
			success: function(data) {
				//alert("(" + data.delFeatureCnt + "건) 삭제되었습니다.");
			},
			error: function(xhr, status, error) {
				COMMON.showMessage('편집오류 & 중간저장객체 삭제 오류발생 err [' + error + ']');
			}
		});
	}
	else{
		COMMON.showMessage('편집오류 & 삭제할 항목이 없습니다');
	}
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집을 저장한다. 중간저장 객체를 모두 WFS-T 수행 후, 성공 객체들은 중간저장 테이블에서 삭제한다.
* 2016.06.21 ehyun : 중간저장 객체 삭제를 일괄처리방식에서 매 Transaction시마다 수행하도록 변경함.
* @author 윤은희(2015.09.04)
*/
var fn_save_edit = function(){

	var sTableName='', sG2Id='';
	var oGInnerFeature = null;
	var sPrefix = CONFIG.fn_get_dataHouseName();
	var i, j, nLen=0, nG2IdLen=0;

	var oSuccessInfo = {
			insertFeature : [],
			updateFeature : [],
			delFeature : [],
			pseudoFeature : [],
			successCnt : 0
	};

	nLen=editor.editingFeatures.LayerList.length;
	
	if(nLen > 0){
		
		fn_update_ftrIdnProperty(); //ftr_idn 갱신

		for(i=nLen-1; 0<=i; i--){
			sTableName = editor.editingFeatures.LayerList[i];
			
			if($.inArray(sTableName, aMidSaveLayers) > -1){
				for(j=editor.editingFeatures[sTableName].g2IdList.length-1; 0<=j; j--){
					var aFields = [], aValues = [];
					sG2Id = editor.editingFeatures[sTableName].g2IdList[j];
					var oEditingFeature = editor.editingFeatures[sTableName][sG2Id];

					oGInnerFeature = editor.makeFeatureByPosList(oEditingFeature.type, oEditingFeature.posList, sTableName + '.' + sG2Id);

					for(var sFldName in oEditingFeature.properties) {
						aFields.push(sFldName);
						aValues.push(oEditingFeature.properties[sFldName]);
					}

					//WFS-T Insert
					if(oEditingFeature.editState === editor.editState['insert']){
						NUTs.WFS.insert(CONFIG.fn_get_wfsServiceUrl(), oGInnerFeature, sPrefix, sTableName, aFields, aValues, function(_oRes) {
							if(_oRes && _oRes.ids.length > 0) {
								//fn_save_g2sEditHistory(sTableName, _oRes.ids[0], oEditingFeature.editState, sG2Id); // _oRes.ids[0]= ex)WTL_PIPE_LM & _EDIT에 신규추가된 g2_id값
								var oSuccessFeature = fn_make_wfsTResult(oSuccessInfo, _oRes, oEditingFeature.editState, sTableName, sG2Id);
								deleteMidSaveFeature(oSuccessFeature);
								fn_remove_featureOnEditingFeatures(sTableName, sG2Id);
							}
						});
					}
					//WFS-T Update
					else if(oEditingFeature.editState === editor.editState['modify']){
						NUTs.WFS.update(CONFIG.fn_get_wfsServiceUrl(), oGInnerFeature, sPrefix, sTableName, aFields, aValues, sG2Id, function(_oRes) {
							if(_oRes && _oRes.count > 0) {
								//fn_save_g2sEditHistory(sTableName, sG2Id, oEditingFeature.editState);
								var oSuccessFeature = fn_make_wfsTResult(oSuccessInfo, _oRes, oEditingFeature.editState, sTableName, sG2Id);
								deleteMidSaveFeature(oSuccessFeature);
								fn_remove_featureOnEditingFeatures(sTableName, sG2Id);
							}
						});
					}
					//WFS-T Delete
					else if(oEditingFeature.editState === editor.editState['delete']){
						NUTs.WFS.del(sPrefix, sTableName, sG2Id, function(_oRes) {
							if(_oRes && _oRes.count > 0) {
								//fn_save_g2sEditHistory(sTableName, sG2Id, oEditingFeature.editState);
								var oSuccessFeature = fn_make_wfsTResult(oSuccessInfo, _oRes, oEditingFeature.editState, sTableName, sG2Id);
								deleteMidSaveFeature(oSuccessFeature);
								fn_remove_featureOnEditingFeatures(sTableName, sG2Id);
							}
						});
					}
					// 시스템을 통해 객체를 추가 후, 삭제시킨 경우 pseudo값으로 중간 저장 테이블에 저장됨. 이러한 객체는 서버 commit대상에서 제외시켜야 하므로, WFS-T수행하지 않음.
					else if(oEditingFeature.editState === editor.editState['pseudo']){
						var oSuccessFeature = fn_make_wfsTResult(oSuccessInfo, null, oEditingFeature.editState, sTableName, sG2Id);
						deleteMidSaveFeature(oSuccessFeature);
						fn_remove_featureOnEditingFeatures(sTableName, sG2Id);
					}
				}
			}
		}

		var nInsertFeatureCnt = oSuccessInfo.insertFeature.length;
		var nUpdateFeatureCnt = oSuccessInfo.updateFeature.length;
		var nDelFeatureCnt = oSuccessInfo.delFeature.length;

		oSuccessInfo.successCnt = nInsertFeatureCnt + nUpdateFeatureCnt + nDelFeatureCnt;

		var sMsg = '추가 : ' + nInsertFeatureCnt + '건, 수정 : ' + nUpdateFeatureCnt + '건, 삭제 : ' + nDelFeatureCnt + '건';
		COMMON.showMessage('편집저장 결과 & '+ sMsg);

		COMMON.sleep(100);
		
		//fn_init_editingFeature();
		fn_init_wfs(null, 'saveEdit');
		STYLE.fn_init_editTree();	
		fn_get_middleEditList();
		MAP.fn_redraw_wms();
		
		$("#editMonitor").hide();
		$("#btnConfirmClose").trigger("click");
		map.activeControls('drag');		
	}
	else{
		COMMON.showMessage('편집저장&저장할 개체 정보가 없습니다!');
	}


};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 저장 결과 Object를 생성한다.
* @author 윤은희(2015.09.04)
*/
var fn_make_wfsTResult = function(_oSuccessInfo, _oRes, _nEditState, _sTableName, _sG2Id){

	var oSuccessFeature = {
			name : '',
			g2Id : ''
	};
	if(_sTableName)
		oSuccessFeature.name = _sTableName;
	if(_sG2Id)
		oSuccessFeature.g2Id = _sG2Id;

	switch(_nEditState){
		case 0:	_oSuccessInfo.pseudoFeature.push(oSuccessFeature);
					break;
		case 1:	_oSuccessInfo.insertFeature.push(oSuccessFeature);
					break;
		case 2:	_oSuccessInfo.updateFeature.push(oSuccessFeature);
					break;
		case 4:	_oSuccessInfo.delFeature.push(oSuccessFeature);
					break;
	}

	return oSuccessFeature;
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집저장 전 레이어별 FTR_IDN을 갱신처리
* => 추가된 feature의 경우 '0'값 기본 부여됨 이 값을 DB의 ftr_idn+1 값으로 SET
* => 기존 FTR_IDN을 유지해야 되는 feature의 경우, originalFtrIdn값 존재여부로 판단하여 유지처리
* @author 최재훈(2016.04.18)
*/
var fn_update_ftrIdnProperty = function(){
	
	var sEditingTableList = editor.editingFeatures.LayerList.join(",");
	
	var bPipIdnProc = false;
	if(sEditingTableList.indexOf('WTL_SPLY_LS') > -1 && (sEditingTableList.indexOf('WTL_META_PS') > -1 || sEditingTableList.indexOf('WTL_FIRE_PS') > -1)) {
		bPipIdnProc = true;
	}
	$.ajax({
		type: 'post',
		dataType: 'json',
		url: '/getAllMaxIdn.do',
		data: {
			tableList : sEditingTableList
		},
		async : false,
		success: function(_oRes) {

			for(i=0, nLen=editor.editingFeatures.LayerList.length ; i < nLen ; i++){

				var sTableName = editor.editingFeatures.LayerList[i];
				var nMaxFtrIdn = 0;
				var k = 0;
				
				for(j=0, nG2IdLen=editor.editingFeatures[sTableName].g2IdList.length; j < nG2IdLen; j++){
					
					sG2Id = editor.editingFeatures[sTableName].g2IdList[j];
					var oEditingFeature = editor.editingFeatures[sTableName][sG2Id];
					
					//급수관로 관말에 계량기(혹은 소방시설) 자동추가 시 급수관로관리번호에 급수관의 FTR_IDN 자동 SET 처리
					if(bPipIdnProc) {
						if(sTableName == "WTL_SPLY_LS"){
							var sFid = oEditingFeature.refFid;
							if(sFid && sFid.split(".").length == 2){
								var aFid = sFid.split(".");
								
								var sRefTable = aFid[0];
								var sRefG2id = aFid[1];
								
								var oRefEditingFeature = editor.editingFeatures[sRefTable][sRefG2id];
								if(oRefEditingFeature) {
									oRefEditingFeature.properties["PIP_IDN"] = oEditingFeature.properties["FTR_IDN"]; 
								}
							}
						}
					}

					//추가된 feature에 한해서 갱신
					// (editor.editState['insert'] && oEditingFeature.originalFtrIdn > -1) 된 객체는 기존 FTR_IDN을 유지해서 추가하도록 함. 
					if((oEditingFeature.editState === editor.editState['insert']) && oEditingFeature.originalFtrIdn === -1){
						for(var sFldName in oEditingFeature.properties) {
							if(sFldName.toUpperCase() === "FTR_IDN"){
								nMaxFtrIdn = _oRes.result[sTableName];
								oEditingFeature.properties["FTR_IDN"] = parseInt(nMaxFtrIdn) + k;
							}
						}
						k++;
					}
				}
			}
		},
		error: function(xhr, status, error) {
			COMMON.showMessage('편집오류 & 관리번호 부여 오류.');
		}
	});


}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집이력을 시스템 테이블인 G2S_EDITHISTORY에 저장한다.
* @author 윤은희(2016.06.23)
* @param {String} _sLayer : 편집 시설물 영문명
* @param {String} _sG2Id : 저장할 Feature의 G2Id
* @param {Number} _nEditState : 저장할 Feature의 편집 상태
* @param {Number} _nG2IdTmp : 추가된 객체의 경우 임시(MAP_EDITOR.fn_get_newG2Id())로 발급된 feature의 FID임
*/
function fn_save_g2sEditHistory(_sLayer, _sG2Id, _nEditState, _nG2IdTmp){
	var sUrl = '/mapedit/insertG2SEditHistory.do';
	var oData = {};

	oData.datasetId  = editor.layerColumnInfo[_sLayer].datasetId;
	oData.g2Id = _sG2Id;		//ex.WTL_PIPE_LM_EDIT.FID값
	oData.g2State = _nEditState;
	oData.g2User = COMMON.fn_get_userId();	//FIXME//향후 sessionID로 교체
	oData.g2Remark = _nG2IdTmp ? parseInt(_nG2IdTmp) : 0 ;
	oData.tableName = _sLayer;

	//중간 저장
	$.ajax({
		type: 'post',
		dataType: 'json',
		url: sUrl,
		data : oData ,
		async: false,
		success: function(_oRes) {
				;
		},
		error: function(xhr, status, error) {
			COMMON.showMessage('편집오류 & 오류발생!');
		}
	});
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집중인 레이어와 참조관계인레이어를 맵개체에서 제거한다.
* @author 최재훈(2015.09.04)
*/
var fn_remove_refWfsLayer = function(){

	var sEditingLayer = COMMON.fn_get_editingLayer();
	var oLayerInfo = COMMON.fn_get_layerInfo(sEditingLayer);
	var aRefLayerList = oLayerInfo.refLayerList;

	if(aRefLayerList.length > 0){
		for(i=0, nRefWfsLayerLen=aRefLayerList.length; i < nRefWfsLayerLen; i++) {
			var oRefWfsLayer = map.getLayerByName(aRefLayerList[i]);

			map.removeLayer(oRefWfsLayer);
		}
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집을 취소한다. 중간저장 객체를 모두 삭제하고 편집을 취소한다.
* @author 윤은희(2015.09.04)
*/
var fn_cancel_edit = function() {
		/*var oSuccessFeature = {
				name : '',
				g2Id : ''
		};

		deleteMidSaveFeature(oSuccessFeature);*/

		fn_hide_refWmsLayer();

		fn_remove_refWfsLayer();
		
		if($('#editMonitor').dialog())
			$('#editMonitor').dialog('close');

		editor.stopEditMode();
		map.deActiveAllControls();

		editor.editLayer.removeAllFeatures();
		editor.styleLayer.removeAllFeatures();
		map.cleanMap();

		$('.olEditorControlEditorCustomPanel').hide();
		map.activeControls('drag');

		// 초기화
		fn_init_filterOnWFSLayer();

		fn_init_editingFeature();

		STYLE.fn_init_editTree();

		STYLE.fn_init_editLayerList(COMMON.fn_get_editLayerInfo(), true);//편집시설물 선택 초기화
		

		MAP.fn_redraw_wms();
		var oDataTool = MAP.fn_get_dataTool();
		var oWorkingShp = MAP.fn_get_dataTool().getShp();
		
		if(oWorkingShp.mode === 'edit'){
			oWorkingShp.mode = null; 
			oWorkingShp.editLayerName = null;
			oWorkingShp.selectedFeature = null;
		}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 각 레이어별로 정의된 전체 편집 룰 중 현 편집레이어에 적용된(사용자가 선별적으로 지정한 편집 룰) 편집 룰을 담고 있는 Object 초기화
* @author 윤은희(2016.04.19)
*/
var fn_init_editRuleInfo = function(){
	oEditRuleInfo = {
			layer : '',
			operType : {
				add : [],
				del : [],
				modify : []
			},
			option : [], 	//  option=[{id : '', valueType:'', 	value : ''}, ... ] or option=[{id : '', valueType:'', 	value : {field:'',attr:''}}, ... ]
			offset : {x:0, y:0}
	};
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 레이어별 편집 룰을 담고 있는 oEditRuleInfo 객체 반환
* @author 윤은희(2016.04.19)
*/
var fn_get_editRuleInfo = function(){
	return oEditRuleInfo;
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description HTML Element 반환
* C.J.H 라벨 클릭해도 체크되도록 수정 (2016.05.19)
* @author 윤은희(2016.04.19)
*/
var HtmlElement = {};
HtmlElement.Util = {

		/**
		 * label Element 반환
		 */
		getLabel : function(_sLabel, _sStyleText, _sForId){
			var aHtml = [];
			var sFor = _sForId !== 'undefined' ? 'for='+ _sForId : '';

			if(_sStyleText !== undefined)
				aHtml.push('<label '+sFor+'>' + _sStyleText + _sLabel + '</label>');
			else
				aHtml.push('<label '+sFor+'>' +  _sLabel + '</label>');

			return aHtml.join('');
		},

		/**
		 * checkbox Element 반환
		 */
		getCheckbox : function(_sId, _sValue, _sLabel, _sClass, _sMsg){
			var aHtml = [];
			aHtml.push("<input type='checkbox' id='" + _sId + "' value='" + _sValue + "' class='" + _sClass + "' " + _sMsg + "/>");
			aHtml.push(this.getLabel(_sLabel,'', _sId));

			return aHtml.join('');
		},

		/**
		 * textbox Element 반환
		 */
		getTextbox : function(_sId, _sValue, _sStyle){
			var aHtml = [];
			aHtml.push("<input type='text' id='" + _sId + "' value='" + _sValue + "' style='" +  _sStyle + "'/>");

			return aHtml.join('');
		},

		/**
		 * img button Element 반환
		 */
		getBtnImg : function(_sId, _sDo, _sImgUrl, _sAlt, _sTitle){
			var aHtml = [];
			if(_sId === '')
				aHtml.push("<img src='" + _sImgUrl + "' class='onoffimg' value='" + _sDo + "' alt='" + _sAlt + "' title='" + _sTitle + "'/>");
			else
				aHtml.push("<a href='#'><img id='" + _sId + "' src='" + _sImgUrl + "' class='onoffimg' value='" + _sDo + "' alt='" + _sAlt + "' title='" + _sTitle + "'/></a>");

			return aHtml.join('');
		},

		/**
		 * selectbox Element 반환
		 */
		getSelectbox : function(_sId, _sValueType, _aValueList, _sStyle, _sClass){
			var aHtml = [];

			aHtml.push("<select id='"+_sId+"' style='" + _sStyle + "' class='" + _sClass + "'>");

			switch(_sValueType){
					case 'layer' :
									for(var i=0, len=_aValueList.length; i<len; i++){
										aHtml.push("<option value='" + _aValueList[i] + "'>" + COMMON.fn_get_EditKorLayerNm(_aValueList[i]) + "</option>");
									}
									break;
					case 'attr':
									for(var i=0, len=_aValueList.attr.length; i<len; i++){
										var sTblName = COMMON.fn_get_editingLayer();
										var sFldName = _aValueList.field;
										var sFldValue = _aValueList.attr[i];										
										var oDomainInfo = editor.layerColumnInfo[sTblName].domainInfo[sFldName];
										var oOptionValue = {
												field : sFldName,
												attr : sFldValue
										};										
										var sOptionValue = JSON.stringify(oOptionValue);
										
										aHtml.push("<option value='" + sOptionValue + "'>" + oDomainInfo[sFldValue] + "</option>");
									}
									break;
			}
			aHtml.push('</select>');

			return aHtml.join('');
		}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 룰 HTML Element 요소를 동적으로 생성한다.
* @param	{String} _sEditingLayer : 편집 레이어명
* @param 	{Object} _oRuleDef : 레이어별 편집룰 정의 객체
* @author 윤은희(2016.04.19)
*/
var fn_make_editRuleHtml = function(_sEditingLayer, _oRuleDef){
	var aEleHtml = [], aEditRuleHtml = [];
	var sHtmlDDHasCls = "<dd class='TxBx2'>";
	var sHtmlDDOpen = "<dd>";
	var sHtmlDDClose = "</dd>";
	var sHtmlSpace = '&nbsp;';
	var aParseItems = ['add','del','modify'];

	fn_init_editRuleInfo();
	oEditRuleInfo.layer = _sEditingLayer;

	if(_oRuleDef === undefined){
		aEleHtml.push(sHtmlDDHasCls);
		aEleHtml.push(HtmlElement.Util.getBtnImg('', '', '/images/usolver/com/map/left/EditRuleBlank.png', '빈 이미지', '빈 이미지'));
		aEleHtml.push(sHtmlDDClose);
	}
	else{
		for(var idx=0, idxLen=aParseItems.length; idx<idxLen; idx++){

			if(_oRuleDef[aParseItems[idx]]) {
				for(var i=0, len=_oRuleDef[aParseItems[idx]].length; i<len; i++){

					var oRuleSt= _oRuleDef[aParseItems[idx]][i];
					var sId = oRuleSt.operType;

					switch(oRuleSt.htmlType){
						case 'checkbox':
											aEleHtml.push(sHtmlDDHasCls);
											aEleHtml.push(HtmlElement.Util.getCheckbox(sId + '_' + i, oRuleSt.rule, oRuleSt.label, 'forEventCatch', "alt='"+oRuleSt.errorMsg+"'"));
											aEleHtml.push(sHtmlDDClose);
											break;
						case 'textbox':
											aEleHtml.push(sHtmlDDHasCls);
											aEleHtml.push(HtmlElement.Util.getLabel(oRuleSt.label,'ㆍ'));
											aEleHtml.push(sHtmlDDClose);
											aEleHtml.push(sHtmlDDOpen);
											aEleHtml.push('X');
											aEleHtml.push(sHtmlSpace);
											aEleHtml.push(HtmlElement.Util.getTextbox(sId + '_moveX', '0', 'width:60px;'));
											aEleHtml.push(sHtmlSpace);
											aEleHtml.push(sHtmlSpace);
											aEleHtml.push('Y');
											aEleHtml.push(sHtmlSpace);
											aEleHtml.push(HtmlElement.Util.getTextbox(sId + '_moveY', '0', 'width:60px;'));
											aEleHtml.push(sHtmlSpace);
											aEleHtml.push(HtmlElement.Util.getBtnImg(sId + '_moveXY', oRuleSt.rule, '/images/usolver/com/map/left/btn_move_off.png', '', ''));
											aEleHtml.push(sHtmlDDClose);
											break;						
					}

					if(oRuleSt.operType === 'add' && oRuleSt.option !== undefined ){
						for(var j=0,jLen = oRuleSt.option.length; j<jLen; j++){

							var sEleId =  sId + '_' + oRuleSt.option[j].valueType +'_' + j;
							aEleHtml.push(sHtmlDDHasCls);
							aEleHtml.push(HtmlElement.Util.getLabel(oRuleSt.option[j].label,'ㆍ'));
							aEleHtml.push(sHtmlDDClose);
							aEleHtml.push(sHtmlDDHasCls);
							aEleHtml.push(HtmlElement.Util.getSelectbox(sEleId, oRuleSt.option[j].valueType, oRuleSt.option[j].value, 'width:100%;height:23px', 'forEventCatch'));
							aEleHtml.push(sHtmlDDClose);

							var obj = {
									id : sEleId,
									valueType : oRuleSt.option[j].valueType
							};
							
							if(obj.valueType === 'layer'){
								$.extend(obj, {
									value : oRuleSt.option[j].value[0]
								})								
							}
							else if(obj.valueType === 'attr'){
								$.extend(obj, {
									value : {
										field : oRuleSt.option[j].value.field,
										attr : oRuleSt.option[j].value.attr[0]	
									}
								});
							}
							
							oEditRuleInfo.option.push(obj);
						}
					}
				}
			}
		}
	}

	aEditRuleHtml.push("<div class='Left_SBx1' id='divEditRule'><div class='Left_STitBx'><p>편집 룰</p></div><div class='scroll'><dl class='SBx'>");
	aEditRuleHtml.push(aEleHtml.join(''));
	aEditRuleHtml.push("</dl><dl class='SBx'></dl></div></div>");
	var sEditRuleHtml = aEditRuleHtml.join('');

	//시설물별 편집 룰 DIV 교체
	var divID = "divEditOption" + _sEditingLayer.substring(0,3);
	$('#'+divID+' #divEditRule').remove();
	$('#'+divID).append(sEditRuleHtml);
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 사용자가 선별적으로 지정한 편집 룰 정보를 oEditRuleInfo 객체에 지정
* @param 	{Object} _oEle : Html Element
* @author 윤은희(2016.04.19)
*/
var fn_set_editRuleInfo = function(_oEle){

	this.addItemOnArray = function(_oValue, _aTarget){
		var isExist = false;
		if(_aTarget.length === 0)
			_aTarget.push(_oValue);
		else{
			if(typeof _oValue === 'object'){
				for(var i=0; i<_aTarget.length; i++){
					if(JSON.stringify(_oValue) === JSON.stringify(_aTarget[i]))
						isExist = true;
				}
				if(!isExist)
					_aTarget.push(_oValue);
			}
			else if(typeof _oValue === 'string'){
				if($.inArray(_oValue, _aTarget) === -1)
					_aTarget.push(_oValue);
			}
		}
	};

	this.deleteItemOnArray = function(_oValue, _aTarget){
		if(_aTarget.length === 0)
			return;
		if(typeof _oValue === 'object'){
			for(var i=0; i<_aTarget.length; i++){
				if(JSON.stringify(_oValue) === JSON.stringify(_aTarget[i]))
					_aTarget.splice(i,1);
			}
		}
		else if(typeof _oValue === 'string'){
			var nIdx = $.inArray(_oValue, _aTarget);		// index 시작번호 = 0
			if(nIdx !== -1)
				_aTarget.splice(nIdx,1);
		}
	};

	var sId = _oEle.id.split('_')[0];
	var oValue = {};
	if(_oEle.type !== 'select-one'){
		if(_oEle.type === 'checkbox'){
			oValue = {
					rule : _oEle.value,
					errorMsg : _oEle.alt
			};
		}
		else{
			oValue = {
					rule : _oEle.attributes.getNamedItem('value').value,
					errorMsg : ''
			};
		}
	}

	switch(_oEle.type){
		case 'checkbox':
			switch(sId){
				case 'add' :
					if(_oEle.checked)
						this.addItemOnArray(oValue, oEditRuleInfo.operType.add);
					else
						this.deleteItemOnArray(oValue, oEditRuleInfo.operType.add);
					break;
				case 'del' :
					if(_oEle.checked)
						this.addItemOnArray(oValue, oEditRuleInfo.operType.del);
					else
						this.deleteItemOnArray(oValue, oEditRuleInfo.operType.del);
					break;
				case 'modify' :
					if(_oEle.checked)
						this.addItemOnArray(oValue, oEditRuleInfo.operType.modify);
					else
						this.deleteItemOnArray(oValue, oEditRuleInfo.operType.modify);
					break;
				}
				break;
		case 'select-one':	
				var sValueType = _oEle.id.split('_')[1];
				var oEleValue;
				var isExist = false;

				sValueType === 'layer' ? oEleValue = _oEle.value : oEleValue = jQuery.parseJSON((_oEle.value).replace(/\\/g,''));	 	// 'layer' or 'attr'
			
				var obj = {
						id : _oEle.id,
						valueType : sValueType,
						value : oEleValue
				};				

				if(COMMON.isEmptyObject(oEditRuleInfo.option))
					oEditRuleInfo.option.push(obj);
				else{
					for(var i=0,len=oEditRuleInfo.option.length; i<len; i++){
						if(oEditRuleInfo.option[i].id === obj.id){
							isExist = true;
							if(oEditRuleInfo.option[i].value !== obj.value)
								oEditRuleInfo.option[i].value = obj.value;
						}
					}
					if(!isExist)
						oEditRuleInfo.option.push(obj);
				}
				break;
		case undefined:
				if(_oEle.localName === 'img'){
					oEditRuleInfo.offset.x = parseInt($('#modify_moveX')[0].value);
					oEditRuleInfo.offset.y = parseInt($('#modify_moveY')[0].value);
					this.addItemOnArray(oValue, oEditRuleInfo.operType.modify);
				}
				break;
	}
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집룰을 적용하여 편집 객체를 삭제한다.(적용 룰 : 삭제시, 관로상의 시설 삭제)
* @param 	{Object} _oDelFeature : 삭제할 Feature
* @return Boolean 값 ( true : 성공, false : 실패)
* @author 윤은희(2016.05.02)
*/
var fn_call_editRuleInfoforDeleteOnRelatedLayer = function(_oDelFeature){
	var bReturn = false;
	if(COMMON.isEmptyObject(oEditRuleInfo.operType.del) === false){
		NUTs.EditRule.editingGeometry = _oDelFeature;
		var sEditRule = oEditRuleInfo.operType.del[0].rule;
		// 룰 수행
		$.globalEval(sEditRule);
	}
	return bReturn = NUTs.EditRule.resultState;
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 편집 객체를 입력한 이격거리로 이동
* @author 윤은희(2016.04.19)
*/
var fn_call_editRuleInfoforMovePosByOffset = function(){

	var sEditRule = '', sEditRuleGeometryMoveToByOffset = '', sEditRuleGeometryMove = '', sEditRuleGeometryMoveEndPoint = '';
	var oSearchResult = editor.oSearchResult;
	var oSearchResultOriginFeature = {};

	if(COMMON.isEmptyObject(oSearchResult)){
		COMMON.showMessage('편집 룰 & 이동할 객체를 지정하세요.');
		return;
	}
	else{							// ################# 향후, 복수개 개체 이동이 가능하도록 할 필요가 있음.
		var nSearchDatalen = oSearchResult.data[0].results.length;

		if(nSearchDatalen > 1) {
			COMMON.showMessage('편집오류 & [' + nSearchDatalen + ']개의 도형이 선택되었습니다. \n이격거리이동은 1개의 도형 개체에 대해서만 수행가능합니다.');
			return false;
		}
	}

	for(var i=0,len=oEditRuleInfo.operType.modify.length; i<len; i++){
		sEditRule = oEditRuleInfo.operType.modify[i].rule;

		if(sEditRule.indexOf('checkRelationGeometryMoveEndPoint') !== -1){
			var oFeature = oSearchResult.data[0].results[0].feature;

			var sG2Id = oSearchResult.data[0].results[0].g2id;
			var sFId = oSearchResult.data[0].table.concat('.', sG2Id);

			sEditRuleGeometryMoveEndPoint = sEditRule;

			// Object Clone이 아니라 OpenLayers.Geometry 이어야 하므로 아래와 같이 신규 객체 생성함.
			oSearchResultOriginFeature = editor.createFeature(oFeature, sFId);
			oSearchResultOriginFeature.attributes.fid = sFId;
		}
		else if(sEditRule.indexOf('checkRelationGeometryMoveToByOffset') !== -1)
			sEditRuleGeometryMoveToByOffset = sEditRule;
		else if(sEditRule.indexOf('checkRelationGeometryMove') !== -1)
			sEditRuleGeometryMove = sEditRule;
	}

	NUTs.EditRule.editingGeometry = oSearchResult;
	NUTs.EditRule.offset.x = oEditRuleInfo.offset.x;
	NUTs.EditRule.offset.y = oEditRuleInfo.offset.y;

	// 룰 수행
	if(sEditRuleGeometryMove !== '')
		$.globalEval(sEditRuleGeometryMove);	// 복수 룰(checkRelationGeometryMove & checkRelationGeometryMoveToByOffset) 존재시, checkRelationGeometryMove 이 룰만 수행하면 됨.
	else if(sEditRuleGeometryMoveToByOffset !== ''){
		$.globalEval(sEditRuleGeometryMoveToByOffset);	// checkRelationGeometryMoveToByOffset		

		var oGInnerFeature = NUTs.EditRule.resultGeometry.data[0].results[0].feature;
		editor.oSearchResult.data[0].results[0].feature.geometry = oGInnerFeature.geometry;	// 이동한 위치로 oSearchResult 갱신

		if(editor.getGeometryType(oGInnerFeature) !== 'point')
			fn_draw_oneFeatureBorder(oGInnerFeature);

		if(sEditRuleGeometryMoveEndPoint !== ''){	// '관말(Point) 시설 이동시, 연결관의 끝점 동시 이동' 이면
			if(COMMON.isEmptyObject(NUTs.EditRule.resultGeometry) === false){			// 선행 룰의 수행 결과 존재
				if(NUTs.EditRule.resultGeometry.data.length > 0){
					var editingGeometry = NUTs.EditRule.resultGeometry.data[0].results[0].feature;	// 선행 룰의 수행결과(Offset만큼 이동한 현 편집 객체)의 feature
					editingGeometry.attributes.fid = oSearchResultOriginFeature.attributes.fid;
					editingGeometry.modified = $.extend(editingGeometry.modified, {				// offset만큼 이동하기 전 현 편집객체의 original geometry
						geometry: oSearchResultOriginFeature.geometry
					});

					NUTs.EditRule.editingGeometry = editingGeometry;
					$.globalEval(sEditRuleGeometryMoveEndPoint);	//checkRelationGeometryMoveEndPoint(연결관의 끝점 동시 이동)
				}
				NUTs.EditRule.resultGeometry = {};
			}
		}
	}
	editor.searchLayer.removeAllFeatures();
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 고급편집 HTML Element 요소를 동적으로 생성한다.
* @param	{String} _sEditingLayer : 편집 레이어명
* @param 	{Object} _oAdvancedEditDef : 레이어별 고급편집 정의 객체
* @author 윤은희(2016.06.03)
*/
var fn_make_advancedEditHtml = function(_sEditingLayer, _oAdvancedEditDef){

	if(_oAdvancedEditDef === undefined){
		_oAdvancedEditDef = AdvancedEditDefinition.BLANK;
	}

	var aEleHtml = [], aEditRuleHtml = [];

	var sHtmlLIOpen = "<li>";
	var sHtmlLIClose = "</li>";

	for(var i=0, len=_oAdvancedEditDef.length; i<len; i++){
		var sId = _oAdvancedEditDef[i].id;
		var sSrc = _oAdvancedEditDef[i].src;
		var sAlt = _oAdvancedEditDef[i].alt;
		var sTitle = _oAdvancedEditDef[i].title;

		aEleHtml.push(sHtmlLIOpen);
		aEleHtml.push(HtmlElement.Util.getBtnImg(sId, '', sSrc, sAlt, sTitle));
		aEleHtml.push(sHtmlLIClose);
	}

	aEditRuleHtml.push("<div class='Left_SBx1' id='divAdvancedEdit'><div class='Left_STitBx'><p>고급편집</p></div><div><ul class='BtBx2'>");
	aEditRuleHtml.push(aEleHtml.join(''));
	aEditRuleHtml.push("</ul></div></div>");
	var sEditRuleHtml = aEditRuleHtml.join('');

	//시설물별 고급편집 DIV 교체
	var divID = "divEditOption" + _sEditingLayer.substring(0,3);
	$('#'+divID+' #divAdvancedEdit').remove();

	if(_sEditingLayer === 'RDL_STLT_PS' || _sEditingLayer === 'RDL_TREE_PS'){
		$('#'+divID).append(sAdvancedEditExtra);
	}
	else{
		$('#'+divID).append(sEditRuleHtml);

		// set the on/off style
		for(var i=0, len=_oAdvancedEditDef.length; i<len; i++){
			var oEle = $('#' + _oAdvancedEditDef[i].id);
			if(oEle[0])
				STYLE.fn_reg_eventImgOnOff(oEle[0]);
		}
	}
};



/**
* @memberof USV.MAP_EDITOR
* @method
* @description 선형 시설물의 선택된 단일 feature의 방향을 전환한다.
* @author 윤은희(2016.04.19)
*/
var fn_reverse_direction = function(){
	var oSearchResult = editor.oSearchResult;

	if(COMMON.isEmptyObject(oSearchResult))
		COMMON.showMessage('편집오류 & 방향전환할 객체를 지정하세요.');

	if(oSearchResult.data[0].results.length === 1){
		// filter 갱신
		MAP_EDITOR.fn_update_filterOnWFSLayer(oSearchResult.data[0].table, String(oSearchResult.data[0].results[0].g2id));

		// vertex 순서 변경
		var aGeomComponents = oSearchResult.data[0].results[0].feature.geometry.components;
		aGeomComponents.reverse();

		// 방향전환된 feature 중간저장 후 편집모니터 표출
		MAP_EDITOR.fn_save_middleAll(oSearchResult);
	}
	else{
		COMMON.showMessage('편집오류 & 단일 객체를 지정하세요.');
		editor.searchLayer.removeAllFeatures();
	}
}

/**
 * @method
 * @description 편집이력조회 타임라인
 * @author 유민경(2016.03.31)
 */
var oEList;
var fn_create_timeLine = function (_oEditHis, _sSearchState){
	drawVisualization();

	function drawVisualization() {
		if(_sSearchState == null){
			oEList = _oEditHis;
		}else _oEditHis = oEList;	// 재호출시 db 조회 없이 전역 oEList 참조

		var eList = _oEditHis.editHisList;
		var oTmp = new Array();
		var sDate, sUser, sText, nSearchCnt=[0, 0, 0];

		if($("#tSelectTx li").text() != "전체" && _sSearchState == null){		// 셀렉트박스 초기화
			$("#tSelectList li[id='"+$("#tSelectTx li").attr('id')+"']").css("display", "");
			$("#tSelectTx li").text("전체");
			$("#tSelectTx li").attr('id', "0");
			$("#tSelectList li[id='0']").css("display", "none");
			$('#tSelectList').hide();
		}

		if(_sSearchState == null){
			for(var i=0; i<3; i++){
				sText = $("#timeLegend li:eq("+i+")").html();
				if(sText.lastIndexOf(':') != -1) $("#timeLegend li:eq("+i+")").html(sText.substring(0,sText.lastIndexOf(':')));
			}
		}
		data = new google.visualization.DataTable();
		data.addColumn('datetime', 'start');
		data.addColumn('datetime', 'end');
		data.addColumn('string', 'content');

		for(var i=0; i<eList.length; i++){
			sUser = eList[i].g2_USER;
			//sUser = sUser.substring(sUser.indexOf('@')+1, sUser.lastIndexOf('@'));
			sDate = eList[i].g2_DATE;
			sDate = sDate.split(" ")[0]+"T"+sDate.split(" ")[1].split(".")[0]+"Z";

			if((_sSearchState == null || _sSearchState == 1 || _sSearchState == 0) && eList[i].g2_STATE == 1){	// 추가
				nSearchCnt[0] += 1;
				oTmp.push([new Date(sDate), ,
				          '<div><img src="../extLib/jquery/ui/css/images/edit_state_1.png" style="width:18px; height:14px; float:left;"><span class="ttitle1 t_g2" editState="1" id=\"'+"editHistory_"+i+'\" g2_version='+ eList[i].g2_VERSION +'>&nbsp&nbsp'+eList[i].g2_ID
				          +'</span></div><div>편집자 : '+sUser+'</div>']);
			}else if((_sSearchState == null || _sSearchState == 2 || _sSearchState == 0) && eList[i].g2_STATE == 2){	// 수정
				nSearchCnt[1] += 1;
				oTmp.push([new Date(sDate), ,
				          '<div><img src="../extLib/jquery/ui/css/images/edit_state_2.png" style="width:18px; height:14px; float:left;"><span class="ttitle2 t_g2" editState="2" id=\"'+"editHistory_"+i+'\" g2_version='+ eList[i].g2_VERSION +'>&nbsp&nbsp'+eList[i].g2_ID
				          +'</span></div><div>편집자 : '+sUser+'</div>']);
			}else if((_sSearchState == null || _sSearchState == 4 || _sSearchState == 0) && eList[i].g2_STATE == 4){	// 삭제
				nSearchCnt[2] += 1;
				oTmp.push([new Date(sDate), ,
				          '<div><img src="../extLib/jquery/ui/css/images/edit_state_4.png" style="width:18px; height:14px; float:left;"><span class="ttitle3 t_g2" editState="4" id=\"'+"editHistory_"+i+'\" g2_version='+ eList[i].g2_VERSION +'>&nbsp&nbsp'+eList[i].g2_ID
				          +'</span></div><div>편집자 : '+sUser+'</div>']);
			}
		}

		if(_sSearchState == null){
			for(var i=0; i<3; i++){
				sText = $("#timeLegend li:eq("+i+")").html();
				$("#timeLegend li:eq("+i+")").html(sText+':'+nSearchCnt[i]+'건');
			}
		}

		data.addRows(oTmp);
		var options = {
	       width: "100%",
	       editable: true,   // enable dragging and editing events
	       enableKeys: true,
	       axisOnTop: false,
	       showNavigation: true,
	       showButtonNew: true,
	       animate: true,
	       animateZoom: true,
	       layout: "box"
	   };

		timeline = new links.Timeline(document.getElementById('timeLine'), options);
		timeline.draw(data);
		$('.timeline-event-box').on('click',function(){
			var sG2_Id = $(this).find('.t_g2').text().trim();
			var sTableName = editor.preEditedLayerName;
			var sG2_version = $(this).find('.t_g2').attr('g2_version');
			var oContextmenu = $("div.editRecovery");
			if(oContextmenu.length > 0) oContextmenu.remove();
			var oPopupMenu = $("<div class='editRecovery'>편집 복원</div>");
			oPopupMenu.addClass('ui-state-default');
			oPopupMenu.addClass('timeline-event-box');
			oPopupMenu.css({
				"position":'absolute',
				"top":parseFloat($(this).css("top").replace('px'))+$(this).height()/2-7,
				"left":parseFloat($(this).css("left").replace('px'))+$(this).width()+5
				});
			$('.timeline-event-box').attrchange('remove');
			$(this).attrchange({
				trackValues: true,
			    callback: function(evnt) {
			    	 if(evnt.attributeName == "style") {
			    		 if(evnt.newValue.search('left') != -1 || evnt.newValue.search('top') != -1) {
			    			var aNewStyle = evnt.newValue.split(";");
			    			var nNewLeft,nNewTop;
			    			for(var i in aNewStyle) {
			    				var sNewStyle = aNewStyle[i];
			    				if(sNewStyle.indexOf('left') != -1) {
			    					nNewLeft = parseFloat(sNewStyle.replace('left','').replace(':','').trim());
			    				}
			    				if(sNewStyle.indexOf('top') != -1) {
			    					nNewTop = parseFloat(sNewStyle.replace('top','').replace(':','').trim());
			    				}
			    			}
			    			$('.editRecovery').css({
			    				"top": nNewTop+$(this).height()/2-7,
			    				"left": nNewLeft+$(this).width()+5
			    			});
			    		 }
			    	 }
			    }
			});
			oPopupMenu.on('click',function(){
				if(confirm("데이터를 복원 하시겠습니까?")) {
					if(confirm("속성정보도 복원 하시겠습니까?")){
						fn_recovery_g2Data(sG2_Id,sTableName,sG2_version,true);
					} else {
						fn_recovery_g2Data(sG2_Id,sTableName,sG2_version,false);
						COMMON.showMessage('편집복원 & 공간정보만 복원 하였습니다.');
					}
				} else {
					COMMON.showMessage('편집복원 & 편집 복원을 하지않았습니다.');
				}
			});
			$(this).parent().append(oPopupMenu);
		});
	}
};

/**
 * @method
 * @description 편집이력조회 타임라인 셀렉트박스 이벤트
 * @author 유민경(2016.03.31)
 */
$(".tSelect_bt").on("click", function() {
	$('#tSelectList').is(':visible') ? $('#tSelectList').hide() : $('#tSelectList').show();
});

$("#tSelectList li").on("click", function() {
	$("#tSelectList li[id='"+$('#tSelectTx li').attr('id')+"']").css("display", "");
	$('#tSelectList').hide();
	$("#tSelectTx li").text($(this).text());
	$("#tSelectTx li").attr('id', $(this).attr('id'));
	$(this).css("display", "none");
	fn_create_timeLine(null, $(this).attr('id'));
});

/**
 * @memberof USV.MAP_EDITOR
 * @method
 * @description 편집이력조회 타임라인 초기화
 * @author 유민경(2016.03.31)
 */
fn_init_timeLine = function(){
	$("#timeLine").themeswitcher({
	    imgpath: "../images/usolver/com/map/timeline/",
	    loadtheme: "Flick"
	});
	google.load("visualization", "1");

	google.setOnLoadCallback(drawVisualization);

	var timeline;
	var data;

	function getSelectedRow() {
	   var row = undefined
	   var sel = timeline.getSelection();
	   if (sel.length) {
	       if (sel[0].row != undefined) {
	           var row = sel[0].row;
	       }
	   }
	   return row;
	}

	function drawVisualization() {

	   data = new google.visualization.DataTable();
	   data.addColumn('datetime', 'start');
	   data.addColumn('datetime', 'end');
	   data.addColumn('string', 'content');

	   var options = {
	       width: "100%",
	       editable: true,   // enable dragging and editing events
	       enableKeys: true,
	       axisOnTop: false,
	       showNavigation: true,
	       showButtonNew: true,
	       animate: true,
	       animateZoom: true,
	       layout: "box"
	   };

	   timeline = new links.Timeline(document.getElementById('timeLine'), options);
	   timeline.draw(data);
	}

};
/**
* @memberof USV.MAP_EDITOR
* @method
* @description [스냅사용] 선택 시 스내핑 컨트롤 초기화
* @author 최재훈(2015.10.21)
*/
var fn_init_snappingControl = function(){

	var snappingControl = map.getControl("SnappingSettings");

	if(snappingControl){
		snappingControl.snappingLayers = [];
		snappingControl.changeSnapping();
	}
	else{
		COMMON.showMessage('편집오류 & 스냅 컨트롤을 찾지 못했습니다.');
		return false;
	}
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 선분할 시 처리
* @param _oStdFeature : 편집대상 feature(분할전 원본 feature)
* @param _oDiviedFeature1 : 분할된 feature1
* @param _oDiviedFeature2 : 분할된 feature2
* @author 최재훈(2016.04.08)
*/
var fn_proc_divideLine = function(_oStdFeature, _oDiviedFeature1, _oDiviedFeature2){

	var _sLayer = fn_get_tblNameByFeature(_oStdFeature.feature);
	var oStdOlFeature = _oStdFeature.feature;
	var sG2Id = fn_get_g2idByFeature(oStdOlFeature);

    var oGData 	= objFactory.Util.createGData();
    var oGResult 	= objFactory.Util.createGResult(_sLayer);
    var oGFeature = fn_convert_olFeatureTOoGFeature(oStdOlFeature, _sLayer.concat('.',sG2Id), '');

    oGFeature.fields = _oStdFeature.fields;

    oGResult.results.push(oGFeature);
    oGData.data.push(oGResult);

	editor.selectedG2Id = sG2Id;

    fn_create_editingFeature(oGData, sG2Id, 2);
    editor.addDrawFeature(editor.editLayer, oStdOlFeature, _sLayer);	//editor.editingFeature 생성 후 editLayer에 추가해야(즉, 편집중인 feature로 등록해야) fn_remove_feature에서...삭제모드로 중간저장하게됨.

	fn_remove_feature(false, _sLayer);	//1. 원본feature 삭제처리
	fn_update_filterOnWFSLayer(_sLayer, sG2Id);

	//분할된 FEATURE 처리
	var sFeature1G2Id = fn_get_g2idByFeature(_oDiviedFeature1);
	var sFeature2G2Id = fn_get_g2idByFeature(_oDiviedFeature2);

	fn_add_featureToEditMonitor(_oDiviedFeature1, _sLayer, sFeature1G2Id ); 	//2. 분할 feature1 중간저장 및 편집모니터 추가처리

	// 분할 객체 중 1개의 객체에 대해 시설물의 원래 FTR_IDN 유지시키기 originalFtrIdn에 바인드.	
	if(editor.layerColumnInfo[_sLayer].fieldInfo['FTR_IDN'] !== undefined){
		var sG2Id = fn_get_g2idByFeature(_oDiviedFeature1);
		if(editor.editingFeatures[_sLayer][sG2Id] && editor.editingFeatures[_sLayer][sG2Id].properties['FTR_IDN']){
			editor.editingFeatures[_sLayer][sG2Id].originalFtrIdn = parseInt(editor.editingFeatures[_sLayer][sG2Id].properties['FTR_IDN']);
		}
	}
	
	// 	_oDiviedFeature2 객체는 FTR_IDN값이 복제되지 않도록
	if(editor.copiedField && editor.copiedField.FTR_IDN)
		editor.copiedField.FTR_IDN = '';
	
	fn_add_featureToEditMonitor(_oDiviedFeature2, _sLayer, sFeature2G2Id ); 	//3. 분할 feature2 중간저장 및 편집모니터 추가처리

	editor.drawBorder(_oDiviedFeature1);
	editor.drawBorder(_oDiviedFeature2);

	var oGInnerCloneFeature1 = fn_clone_featureToGInnerFeature(_oDiviedFeature1);
	var oGInnerCloneFeature2 = fn_clone_featureToGInnerFeature(_oDiviedFeature2);

	editor.addDrawFeature(editor.editLayer, oGInnerCloneFeature1, 'select');
	editor.addDrawFeature(editor.editLayer, oGInnerCloneFeature2, 'select');
	
	fn_blink_feature(editor.editLayer, _oDiviedFeature1, 200, 200, 2,_oDiviedFeature2);
	
	window.setTimeout(function() {$("#btnEditMonitor").trigger("click");}, 2000);
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 면분할 시 처리
* @param _oStdFeature : 편집대상 feature(분할전 원본 feature)
* @param _oDiviedFeature1 : 분할된 feature1
* @param _oDiviedFeature2 : 분할된 feature2
* @author 최재훈(2016.05.04)
*/
var fn_proc_dividePolygon = function(_oStdFeature, _oDiviedFeature1, _oDiviedFeature2){

	var _sLayer = COMMON.fn_get_editingLayer();
	var sG2Id = fn_get_g2idByFeature(_oStdFeature);

    var oGData 	= objFactory.Util.createGData();
    var oGResult 	= objFactory.Util.createGResult(_sLayer);
    var oGFeature = fn_convert_olFeatureTOoGFeature(_oStdFeature, _sLayer.concat('.',sG2Id), '');

    oGResult.results.push(oGFeature);
    oGData.data.push(oGResult);

	editor.selectedG2Id = sG2Id;

    fn_create_editingFeature(oGData, sG2Id, 2);
    editor.addDrawFeature(editor.editLayer, _oStdFeature, _sLayer);	//editor.editingFeature 생성 후 editLayer에 추가해야(즉, 편집중인 feature로 등록해야) fn_remove_feature에서...삭제모드로 중간저장하게됨.

	fn_remove_feature();	//1. 원본feature 삭제처리
	fn_update_filterOnWFSLayer(_sLayer, sG2Id);

	//분할된 FEATURE 처리
	var sFeature1G2Id = fn_get_g2idByFeature(_oDiviedFeature1);
	var sFeature2G2Id = fn_get_g2idByFeature(_oDiviedFeature2);

	fn_add_featureToEditMonitor(_oDiviedFeature1, _sLayer, sFeature1G2Id ); 	//2. 분할 feature1 중간저장 및 편집모니터 추가처리
	
	// 분할 객체 중 1개의 객체에 대해 시설물의 원래 FTR_IDN 유지시키기 originalFtrIdn에 바인드.	
	if(editor.layerColumnInfo[_sLayer].fieldInfo['FTR_IDN'] !== undefined){
		var sG2Id = fn_get_g2idByFeature(_oDiviedFeature1);
		if(editor.editingFeatures[_sLayer][sG2Id] && editor.editingFeatures[_sLayer][sG2Id].properties['FTR_IDN']){
			editor.editingFeatures[_sLayer][sG2Id].originalFtrIdn = parseInt(editor.editingFeatures[_sLayer][sG2Id].properties['FTR_IDN']);
		}
	}
	
	// 	_oDiviedFeature2 객체는 FTR_IDN값이 복제되지 않도록
	if(editor.copiedField && editor.copiedField.FTR_IDN)
		editor.copiedField.FTR_IDN = '';
	
	fn_add_featureToEditMonitor(_oDiviedFeature2, _sLayer, sFeature2G2Id ); 	//3. 분할 feature2 중간저장 및 편집모니터 추가처리

	editor.drawBorder(_oDiviedFeature1);
	editor.drawBorder(_oDiviedFeature2);

	var oGInnerCloneFeature1 = fn_clone_featureToGInnerFeature(_oDiviedFeature1);
	var oGInnerCloneFeature2 = fn_clone_featureToGInnerFeature(_oDiviedFeature2);

	editor.addDrawFeature(editor.editLayer, oGInnerCloneFeature1, 'select');
	editor.addDrawFeature(editor.editLayer, oGInnerCloneFeature2, 'select');
	
	fn_blink_feature(editor.editLayer, _oDiviedFeature1, 200, 200, 2,_oDiviedFeature2);
	//fn_blink_feature(editor.editLayer, _oDiviedFeature2, 800, 300, 2);

	window.setTimeout(function() {$("#btnEditMonitor").trigger("click");}, 2000);
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 특정 feature에 blink 효과 부여
* @param _oLayer : feature를 Add, draw할 대상 벡터레이어
* @param _oFeature1 : 분할된 feature1
* @param _oFeature2 : 분할된 feature2
* @param _nInterval : blink효과 간격
* @author 최재훈(2016.04.08)
*/
var fn_blink_feature = function(_oLayer, _oFeature,_nStartInterval,_nInterval,_nCount,_oFeature2) {
	var aLayers = map.layers;
	var oFeature = _oFeature.clone();
	var nCount = 0;
	var oEffectLayer = editor.effectLayer;
	var nIndex = map.getLayerIndex(oEffectLayer);
	var nTime = _nStartInterval;
	
	map.setLayerIndex(oEffectLayer,map.layers.length-1);
	oEffectLayer.features.push(oFeature);
	oEffectLayer.drawFeature(oFeature, 'select');
	function loop() {
		window.setTimeout(function() {oEffectLayer.drawFeature(oFeature, 'blink');},nTime);
		window.setTimeout(function() {
			oEffectLayer.drawFeature(oFeature, 'select');
			nCount++;
			if(nCount == _nCount) {
				map.setLayerIndex(_oLayer,map.layers.length-1);
				if(_oFeature2) {
					var oFeature2 = _oFeature2.clone();
					oEffectLayer.removeFeatures(oFeature);
					fn_blink_feature(_oLayer,oFeature2,_nStartInterval,_nInterval,_nCount-1);
				} else {
					oEffectLayer.removeFeatures(oFeature);
				}
			} else {
				loop();
			}
		}, nTime+=_nInterval);
	}
	
	loop();
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 선병합 시 처리
* @param _oMergedFeature : 편집대상 feature(병합된 feature)
* @param _oOrgFeature1 : 병합되기 전 feature1
* @param _oOrgFeature2 : 병합되기 전 feature2
* @param _sSelectedId  : 병합된 feature의 속성이 될 기준 feature Id
* @author 최재훈(2016.04.08)
*/
var fn_proc_mergeFeature = function(_sSelectedId, _sType){


	var _oMergedFeature = editor.mergedFeature; //병합된 feature 정보 GET
	var _oOrgFeature1	= editor.orgFeature1; 	//병합되기 전 feature1 정보 GET
	var _oOrgFeature2	= editor.orgFeature2; 	//병합되기 전 feature2 정보 GET

	var _sLayer = COMMON.fn_get_editingLayer();
    //병합전 FEATURE 처리
	var sFeature1G2Id = fn_get_g2idByFeature(_oOrgFeature1);
	var sFeature2G2Id = fn_get_g2idByFeature(_oOrgFeature2);

	//editingFeature 타입의 Object 구조 GET
    var oGData 	= objFactory.Util.createGData();
    var oGResult 	= objFactory.Util.createGResult(_sLayer);
    var oGFeature1 = fn_convert_olFeatureTOoGFeature(_oOrgFeature1, _sLayer.concat('.',sFeature1G2Id), '');
    var oGFeature2 = fn_convert_olFeatureTOoGFeature(_oOrgFeature2, _sLayer.concat('.',sFeature2G2Id), '');
    oGFeature1.fields = _oOrgFeature1.attributes;
    oGFeature2.fields = _oOrgFeature2.attributes;

    //fn_create_editingFeatures 에서 참조할 데이터 SET
    oGResult.results.push(oGFeature1);
    oGResult.results.push(oGFeature2);

    oGData.data.push(oGResult);

    var sG2Id = fn_get_g2idByFeature(_oMergedFeature); //feature의 ID 추출

   //editor.editingFeature 생성 후 editLayer에 추가해야(즉, 편집중인 feature로 등록해야) fn_remove_feature에서...삭제모드로 중간저장하게됨.
    editor.addDrawFeature(editor.editLayer, _oMergedFeature, _sLayer);
    editor.addDrawFeature(editor.editLayer, _oOrgFeature1, _sLayer);
    editor.addDrawFeature(editor.editLayer, _oOrgFeature2, _sLayer);



    //속성 기준 feature 지정
	editor.copyMode = true;

	if(sFeature1G2Id == _sSelectedId)
		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(_oOrgFeature1);
	else if(sFeature2G2Id == _sSelectedId)
		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(_oOrgFeature2);
	else
		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(_oOrgFeature2, true);

	//editingFeature Object 생성(병합되기 전 feature들 추가)
    fn_create_editingFeatures(oGData, 2); //editor.editingFeature 생성 후 editLayer에 추가해야(즉, 편집중인 feature로 등록해야) fn_remove_feature에서...삭제모드로 중간저장하게됨.


	editor.selectedG2Id = sFeature1G2Id;
	fn_remove_feature();	//1. 원본feature1 삭제처리

	editor.selectedG2Id = sFeature2G2Id;
	fn_remove_feature();	//1. 원본feature2 삭제처리

	//병합되기 전 (분할되어 있던...) feature들은 WFS로 그려내지 않아야해 filter 등록
	fn_update_filterOnWFSLayer(_sLayer, sFeature1G2Id);
	fn_update_filterOnWFSLayer(_sLayer, sFeature2G2Id);

	//병합 feature 중간저장 및 편집모니터 추가처리
	fn_add_featureToEditMonitor(_oMergedFeature, _sLayer, sG2Id );

	editor.drawBorder(_oMergedFeature);

	var oGInnerCloneFeature1 = fn_clone_featureToGInnerFeature(_oMergedFeature);

	editor.addDrawFeature(editor.editLayer, oGInnerCloneFeature1, 'select')
	fn_blink_feature(editor.editLayer, _oMergedFeature, 200, 300, 3);

	fn_clear_mergePopup();
	window.setTimeout(function() {$("#btnEditMonitor").trigger("click");}, 2000);
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 면병합 시 처리
* @param _oMergedFeature : 편집대상 feature(병합된 feature)
* @param _oOrgFeature1 : 병합되기 전 feature1
* @param _oOrgFeature2 : 병합되기 전 feature2
* @param _sSelectedId  : 병합된 feature의 속성이 될 기준 feature Id
* @author 최재훈(2016.04.08)
*/
var fn_proc_mergePolygon = function(_sSelectedId){


	var _oMergedFeature = editor.mergedFeature; //병합된 feature 정보 GET
	var _oOrgFeature1	= editor.orgFeature1; 	//병합되기 전 feature1 정보 GET
	var _oOrgFeature2	= editor.orgFeature2; 	//병합되기 전 feature2 정보 GET

	var _sLayer = COMMON.fn_get_editingLayer();
    //병합전 FEATURE 처리
	var sFeature1G2Id = fn_get_g2idByFeature(_oOrgFeature1);
	var sFeature2G2Id = fn_get_g2idByFeature(_oOrgFeature2);

	//editingFeature 타입의 Object 구조 GET
    var oGData 	= objFactory.Util.createGData();
    var oGResult 	= objFactory.Util.createGResult(_sLayer);
    var oGFeature1 = fn_convert_olFeatureTOoGFeature(_oOrgFeature1, _sLayer.concat('.',sFeature1G2Id), '');
    var oGFeature2 = fn_convert_olFeatureTOoGFeature(_oOrgFeature2, _sLayer.concat('.',sFeature2G2Id), '');

    oGFeature1.fields = _oOrgFeature1.attributes;
    oGFeature2.fields = _oOrgFeature2.attributes;
    //fn_create_editingFeatures 에서 참조할 데이터 SET
    oGResult.results.push(oGFeature1);
    oGResult.results.push(oGFeature2);

    oGData.data.push(oGResult);

    var sG2Id = fn_get_g2idByFeature(_oMergedFeature); //feature의 ID 추출

   //editor.editingFeature 생성 후 editLayer에 추가해야(즉, 편집중인 feature로 등록해야) fn_remove_feature에서...삭제모드로 중간저장하게됨.
    editor.addDrawFeature(editor.editLayer, _oMergedFeature, _sLayer);
    editor.addDrawFeature(editor.editLayer, _oOrgFeature1, _sLayer);
    editor.addDrawFeature(editor.editLayer, _oOrgFeature2, _sLayer);

    //속성 기준 feature 지정
	editor.copyMode = true;

	if(sFeature1G2Id == _sSelectedId)
		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(_oOrgFeature1);
	else if(sFeature2G2Id == _sSelectedId)
		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(_oOrgFeature2);
	else
		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(_oOrgFeature2, true);

	//editingFeature Object 생성(병합되기 전 feature들 추가)
    fn_create_editingFeatures(oGData, 2); //editor.editingFeature 생성 후 editLayer에 추가해야(즉, 편집중인 feature로 등록해야) fn_remove_feature에서...삭제모드로 중간저장하게됨.


	editor.selectedG2Id = sFeature1G2Id;
	fn_remove_feature();	//1. 원본feature1 삭제처리

	editor.selectedG2Id = sFeature2G2Id;
	fn_remove_feature();	//1. 원본feature2 삭제처리

	//병합되기 전 (분할되어 있던...) feature들은 WFS로 그려내지 않아야해 filter 등록
	fn_update_filterOnWFSLayer(_sLayer, sFeature1G2Id);
	fn_update_filterOnWFSLayer(_sLayer, sFeature2G2Id);

	//병합 feature 중간저장 및 편집모니터 추가처리
	fn_add_featureToEditMonitor(_oMergedFeature, _sLayer, sG2Id );

	editor.drawBorder(_oMergedFeature);

	var oGInnerCloneFeature1 = fn_clone_featureToGInnerFeature(_oMergedFeature);

	editor.addDrawFeature(editor.editLayer, oGInnerCloneFeature1, 'select')
	fn_blink_feature(editor.editLayer, _oMergedFeature, 200, 300, 2);

	fn_clear_mergePopup();
	window.setTimeout(function() {$("#btnEditMonitor").trigger("click");}, 2000);
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 도형 복제 및 붙여넣기
* @param {Object}  _oGData : 복제할 객체 Obj
* @author 윤은희(2016.09.05)
*/
var fn_copyPaste_feature = function(_oGData){	
	var oResults = _oGData.data[0].results[0];
	if(oResults) {
		var oOffset = {x:20, y:-20};
		var sEditLayer = _oGData.data[0].table;
		var sFeatureType = COMMON.fn_get_EditLayerType(sEditLayer).toLowerCase();;
		var sG2Id = fn_get_newG2Id();
		var sFId = sEditLayer.concat('.', sG2Id)
		var oResFeature = oResults.feature;			
		
		// 복제할 위치로 shift
		NUTs.EditRule.translateGeometry(oResFeature.geometry, oOffset);
		var oGInnerFeature = editor.createFeature(oResFeature, sEditLayer.concat('.', sG2Id));
		editor.addDrawFeature(editor.editLayer, oGInnerFeature, 'select');
		
		//속성복제
		editor.copyMode = true;
		editor.copiedField = editor.selectedG2Id && editor.editingFeatures[sEditLayer][editor.selectedG2Id] ? editor.editingFeatures[sEditLayer][editor.selectedG2Id].properties : fn_get_jsonPropertyByProp(oResults);	
		fn_add_featureToEditMonitor(oResults.feature, sEditLayer, sG2Id);
		
		// 초기화
		editor.copyMode = false;
		editor.copiedField = {};
		editor.oSearchResult = null;
		editor.searchLayer.removeAllFeatures();
		editor.effectLayer.removeAllFeatures();
	}
};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature Object로부터 테이블 이름 추출
* @param {Object}  _oFeature : feature Obj
* @author 최재훈(2016.09.05)
*/
var fn_get_tblNameByFeature = function(_oFeature){
	var aFIdInfo, sTblName;

    if(_oFeature.fid)
    	aFIdInfo = _oFeature.fid.split(".");
    else if(_oFeature.attributes.fid)
    	aFIdInfo = _oFeature.attributes.fid.split(".");
    else
    	aFIdInfo = '';
    
    aFIdInfo.length === 2 ? sTblName = aFIdInfo[0].toUpperCase() : sTblName = aFIdInfo;
    
    //ggash 201701189 for geoserver - GeoServer는 fid 부여방식이 [급수관로.1234] 방식임 .. 변경 검토 필요
    if(COMMON.isHangul(sTblName) && _oFeature.layer && _oFeature.layer.name){
    	sTblName = _oFeature.layer.name;
    }
    
    return sTblName;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature Object로부터 fid 추출
* @param  {Object} _oFeature : feature Obj
* @author 최재훈(2016.09.05)
*/
var fn_get_fidByFeature = function(_oFeature){
	var sFId;

    if(_oFeature.fid)
    	sFId = _oFeature.fid;
    else if(_oFeature.attributes.fid)
    	sFId = _oFeature.attributes.fid;
    else
    	sFId = '';

    return sFId;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature Object로부터 g2id 추출
* @param {Object}  _oFeature : feature Obj
* @author 최재훈(2016.09.05)
*/
var fn_get_g2idByFeature = function(_oFeature){
	var aFIdInfo;

    if(_oFeature.fid)
    	aFIdInfo = _oFeature.fid.split(".");
    else
    	aFIdInfo = _oFeature.attributes.fid.split(".");

    var sG2Id;
    if(aFIdInfo.length === 2)
    	sG2Id = aFIdInfo[1];
    else{
    	sG2Id = _oFeature.fid;
    }
    return sG2Id;
};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description g2id를 이용 특정 feature 추출 후 blink 처리
* @param {String} _sG2Id : feature 의 G2ID
* @author 최재훈(2016.09.05)
*/
var fn_blink_featureByfId = function(_sG2Id){

	var sEditLayer = COMMON.fn_get_editingLayer();

	var oFeature = editor.getFeatureByFid(editor.editLayer, sEditLayer.concat('.',_sG2Id));

	if(oFeature)
		fn_blink_feature(editor.editLayer, oFeature, 200, 300, 2);

};


/**
* @memberof USV.MAP_EDITOR
* @method
* @description feature의 영역을 사각형 박스로 표출
* @param {Object} _oFeature : feature Obj
* @author 최재훈(2016.09.05)
*/
var fn_create_box = function(_oFeature){

     //테두리
     var oBorderPosList = editor.getBoundPosListByFeature(_oFeature);
     var oLinearRing = new OpenLayers.Geometry.LinearRing(oBorderPosList);
     var oBorderFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([oLinearRing]));;

     //테두리 9개 지점
     var oPointList = editor.getNinePosListByFeature(_oFeature);
     var oPoint = new OpenLayers.Geometry.Point(oPointList);
     var oPointFeature = new OpenLayers.Feature.Vector(oPoint);

    editor.addDrawFeature(editor.effectLayer, oBorderFeature, 'border');

};

/**
* @memberof USV.MAP_EDITOR
* @method
* @description OpenLayers가 생성한 Feature를 Usolver의 공통 GFeature Object로 변환
* @param _olFeature(필수) : oGFeature로 Merge시킬 olFeature
* @param _sFId(필수) : oGFeature로 Merge시킬 olFeature의 fId
* @param _sState : oGFeature로 Merge시킬 olFeature의 state 정보(OpenLayers.State.UPDATE, OpenLayers.State.INSERT, OpenLayers.State.DELETE)
* @author 윤은희(2016.06.10)
*/
var fn_convert_olFeatureTOoGFeature = function(_olFeature, _sFId, _sState){
	var oGFeature = objFactory.Util.createGFeature();
	oGFeature.feature = fn_extend_feature(oGFeature.feature, _olFeature, _sFId, _sState);

	if(_sFId){
		var aFid = _sFId.split('.');
		if(aFid.length === 2)
			oGFeature.g2id = aFid[1];
	}

	return oGFeature;
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description OpenLayers가 생성한 Feature를 Usolver의 공통 InnerFeature Object로 변환
* @param _olFeature : oGInnerFeature로 Merge시킬 olFeature
* @param _sFId : oGInnerFeature로 Merge시킬 olFeature의 fId
* @param _sState : oGInnerFeature로 Merge시킬 olFeature의 state 정보(OpenLayers.State.UPDATE, OpenLayers.State.INSERT, OpenLayers.State.DELETE)
* @author 윤은희(2016.06.10)
*/
var fn_convert_olFeatureTOoGInnerFeature = function(_olFeature, _sFId, _sState){
	var oGInnerFeature = objFactory.Util.createGInnerFeature();
	oGInnerFeature = fn_extend_feature(oGInnerFeature, _olFeature, _sFId, _sState);

	return oGInnerFeature;
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description Feature Clone 후 OGInnerFeature로 변환 후 return
* @param _oFeature : clone시킬 Feature
* @author 윤은희(2016.06.10)
*/
var fn_clone_featureToGInnerFeature = function(_oFeature){
	var oFields;
	if(_oFeature.data)
		oFields = _oFeature.data; 
	
	var oGInnerFeature = objFactory.Util.createGInnerFeature();
	var oFeatureClone = _oFeature.clone();
	if(oFields)
		oFeatureClone.data = oFields;
	
	var oGInnerFeatureClone = fn_extend_feature(oGInnerFeature, oFeatureClone);

	return oGInnerFeatureClone;
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description Feature DeepClone 후 OGInnerFeature로 변환 후 return
* @param _oFeature : deepClone시킬 Feature
* @author 윤은희(2016.06.10)
*/
var fn_deepClone_featureToGInnerFeature = function(_oFeature){
	var oCloneFeature = COMMON.deepCloneObject(_oFeature);
	var oGInnerFeature = objFactory.Util.createGInnerFeature();	
	var oGInnerFeatureClone = fn_extend_feature(oGInnerFeature, oCloneFeature);
	
	return oGInnerFeatureClone;
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description OpenLayers가 생성한 Feature를 Usolver의 공통 Feature Object로 변환
* @param _oStdFeature : Merge시킬 기준 Feature
* @param _olFeature : Merge시킬 olFeature
* @param _sFId : Merge시킬 olFeature의 fId
* @param _sState : Merge시킬 olFeature의 state 정보(OpenLayers.State.UPDATE, OpenLayers.State.INSERT, OpenLayers.State.DELETE)
* @author 윤은희(2016.06.10)
*/
var fn_extend_feature = function(_oStdFeature, _olFeature, _sFId, _sState){
	var oStdFeature = 	_oStdFeature;
	if((oStdFeature && !COMMON.isEmptyObject(oStdFeature)) && (_olFeature && !COMMON.isEmptyObject(_olFeature))){
		$.extend(true, oStdFeature, _olFeature);

		oStdFeature.featureType = editor.getFeatureType(_olFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.',''));

		if(_sFId){
			oStdFeature.attributes = '';		// wfs vectorlayer에서 넘어오는 feature는 attributes에 fields가 존재하므로 제거함.			
			oStdFeature.attributes = $.extend(oStdFeature.attributes, {fid : _sFId});
		}			
		if(_sState)
			oStdFeature.state = _sState;

		delete oStdFeature.CLASS_NAME;
		delete oStdFeature.marker;
		delete oStdFeature.popup;
		delete oStdFeature.popupClass;
		delete oStdFeature.url;
	}
	return oStdFeature;
}



/**
* @memberof USV.MAP_EDITOR
* @method
* @description Feature DeepClone 후 OGInnerFeature로 변환 후 return
* @param {Object} _oResult	 : _oRes.data[0].results[idx]에 해당하는 obj
* @param {Int} _nState 		 : INSERT(1), UPDATE(2), DELETE(4), PSEUDO(0) 정보
* @param {Int} _nFlagChange : _oRes.data[0].results[idx]에 해당하는 obj
* @param {Int} _nMidSave 	 : _oRes.data[0].results[idx]에 해당하는 obj
* @author 윤은희(2016.06.10)
*/
var fn_get_oGEmJson = function(_oResult, _nState, _nFlagChange, _nMidSave){
	var oGEmJson = objFactory.Util.createGEmJson();
	var oGeometry = _oResult.feature.geometry;

	oGEmJson.bounds = editor.getBoundsByGeometry(oGeometry);
	if(_nState)
		oGEmJson.editState = parseInt(_nState, 10);
	if(_nFlagChange)
		oGEmJson.flgChange = parseInt(_nFlagChange, 10);
	if(_nMidSave)
		oGEmJson.midSave = parseInt(_nMidSave, 10);
	oGEmJson.posList = editor.getPosListByGeometry(oGeometry);
	oGEmJson.properties = fn_get_jsonPropertyByProp(_oResult);
	oGEmJson.type = oGeometry.CLASS_NAME.replace('OpenLayers.Geometry.','').toLowerCase();

	return oGEmJson;
}


/**
* @memberof USV.MAP_EDITOR
* @method fn_get_editFeatureStyle
* @description editor.editlayer에서 현재 편집하는 feature의 스타일을 찾아서 style속성 반환
* @param {Object} _oGInnerFeature	 : editor.editlayer에서 스타일을 찾을 feature
* @author 윤은희(2016.08.18)
*/
var fn_get_editFeatureStyle = function(_oGInnerFeature){
	var oStyle = null;
	var sEditLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oGInnerFeature);
	var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(_oGInnerFeature);
	if(editor.editingFeatures[sEditLayer] !== undefined && editor.editingFeatures[sEditLayer][sG2Id] !== undefined){
		var sFtrCdeValue = editor.editingFeatures[sEditLayer][sG2Id].properties.FTR_CDE;
		var sEditLayerStyle = editor.editLayer.styleMap.styles[sEditLayer.toLowerCase()];
		
		if(!sEditLayerStyle)
			sEditLayerStyle = editor.editLayer.styleMap.styles["select"];
		
		if(sEditLayerStyle.rules.length >0){
			for(var i=0, len=sEditLayerStyle.rules.length; i<len; i++){
				if(sEditLayerStyle.rules[i].filter.property === 'FTR_CDE' && sEditLayerStyle.rules[i].filter.value === sFtrCdeValue){
					oStyle = sEditLayerStyle.rules[i].symbolizer;
					break;
				}
			}
		}
		else{
			oStyle = sEditLayerStyle.defaultStyle;
		}
	}
	else{
		var sEditLayerStyle = editor.editLayer.styleMap.styles[sEditLayer.toLowerCase()];
		if(!sEditLayerStyle)
			sEditLayerStyle = editor.editLayer.styleMap.styles["default"];
		oStyle = sEditLayerStyle.defaultStyle;
	}

	return oStyle;
}

/**
* @memberof USV.MAP_EDITOR
* @method fn_get_searchFeatureStyle
* @description editor.searchlayer에서 현재 검색된 feature의 스타일을 찾아서 style속성 반환
* @param {Object} _oGInnerFeature	 : editor.searchlayer에서 스타일을 찾을 feature
* @author 윤은희(2016.09.21)
*/
var fn_get_searchFeatureStyle = function(_oGInnerFeature){
	var oStyle = null;
	var sSearchLayer = MAP_EDITOR.fn_get_tblNameByFeature(_oGInnerFeature);
	var sSearchLayerStyle = editor.searchLayer.styleMap.styles[sSearchLayer.toLowerCase()];
	try {
		oStyle = sSearchLayerStyle.defaultStyle;
	} catch (e) {
	}	
	
	return oStyle;
}

var fn_proc_modifiedFeature = function(_oGInnerFeature, _sLayerName, _sG2Id ){
	var sFId = _sLayerName.concat(".",_sG2Id);
	
	// 편집하는 feature의 위치 속성 자동 갱신(행정동/법정동/도엽번호)
	NUTs.EditRule.CheckRelationLocValueSync(_oGInnerFeature);
	
	MAP_EDITOR.fn_check_SpatialValueChange(_oGInnerFeature, _sLayerName, _sG2Id);
	MAP_EDITOR.fn_call_saveMiddleBridge(_sLayerName, _sG2Id);		// 중간저장(공간정보) 갱신 - ehyun.2016.03.25


	// 이동 전 위치의 feature를 각 레이어에서 제거 후, 이동 후 위치에서 새로 생성/추가 후 다시 그림 - ehyun.
	var oEditFeature = editor.getFeatureByFid(editor.editLayer, sFId);
	if(oEditFeature){
		editor.editLayer.destroyFeatures(oEditFeature, {silent: true});
    	editor.addDrawFeature(editor.editLayer, _oGInnerFeature, 'select');
	}
	
	var oStyleFeature = editor.getFeatureByFid(editor.styleLayer, sFId);
	if(oStyleFeature){
		editor.styleLayer.destroyFeatures(oStyleFeature, {silent: true}); 
		var oStyleGFeature = editor.createFeature(_oGInnerFeature, sFId);
    	editor.addDrawFeature(editor.styleLayer, oStyleGFeature, _sLayerName);
	}
	
	var oSearchFeature = editor.getFeatureByFid(editor.searchLayer, sFId);
	if(oSearchFeature)
		editor.searchLayer.destroyFeatures(oSearchFeature, {silent: true});
	
	editor.effectLayer.removeAllFeatures();

    if(editor.getGeometryType(_oGInnerFeature) !== 'point')
    	MAP_EDITOR.fn_draw_oneFeatureBorder(_oGInnerFeature,'selectpoint');
}


var objFactory = objFactory || {};

objFactory.Util = {
		createGData : function(){
			var oGData = {
					data : []
			};
			return  oGData;
		},

		createGResult : function(_sLayerName){			
			var oGResult = {
					results : [],
					table : _sLayerName ? _sLayerName.toUpperCase() : ''
			};
			return oGResult;
		},

		createGInnerFeature : function(){
			// 기본구조는 OL이 생성한 feature구조이며, * 처리된 속성만 GMAP에서 추가한 속성(*처리된 속성은 GetFeature시 기존에는 존재하지 않았던 속성이므로 추가하였음)
			var oGInnerFeature = {
					attributes : {
						fid : '' 				// *
					},
					bounds : {},
					data : {},
					fid : '',
					geometry : {},
					gml : {},
					id : '',
					layer : {},
					lonlat : {},
					renderIntent : '', 	// *
					state : '',
					style : '',
					featureType : '', 		// *
					modified:{	}			// to store the original geometry
			};
			return oGInnerFeature;
		},

		createGFeature : function(){
			var oGFeature = {
		    		feature : this.createGInnerFeature(),
		    		fields : {},
		    		g2id : '',
		    		title : ''
		    };
			return oGFeature;
		},

		/*createGEditingFeatures : function(){
			var GEditingFeatures = {
					LayerList : [],
					LayerName : {
						g2IdList : [],
						g2idNum : {}
					}
		    };
			return GEditingFeatures;
		},

		createGEmJsonLayer : function(){
			var GEmJsonLayer = {
					FeatureIdList : []
			}
			return GEmJsonLayer;
		},*/

		createGEmJson : function(){
			var oGEmJson = {
					bounds : {},
					editState : 0,
					flgChange : 0,
					midSave : 0,
					posList : [],
					properties : {},
					type : '',
					originalFtrIdn : -1,
					refFid : ''
			}
			return oGEmJson;
		}
};

var fn_remove_searchFeatures = function(){
	map.getLayerByName('searchAreaLayer').removeAllFeatures();
	editor.searchLayer.removeAllFeatures();
}

/**
* @memberof USV.MAP_EDITOR
* @method
* @description 현재 editLayer의 feature가 그려져있는지 확인
* @author  	이상호(2016.04.28)
*/
var fn_check_editLayerSettings = function(_sEditLayer){
	if(map.getLayerByName(_sEditLayer)){
		if(map.getLayerByName(_sEditLayer).features.length < 1) {
			return false;
		} else {
			return true;
		}
	} else
		return false;
}

/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description WFS feature 레이어 켜져있는지 확인 하는 함수
 * @author  	이상호(2016.07.04)
 */
var fn_check_wfsLayer = function(){
	var oLayers = map.layers;
	
	for(var i in oLayers){
		var oLayer = oLayers[i];
		if(oLayer.id.indexOf("WFSLayer") !== -1) {
			return true;
		}
	}
	return false;
}

var fn_get_wfsLayers = function(_sLayerName){
	var aWfsLayers = [];
	var oLayers = map.layers;
	
	if(!_sLayerName){
		for(var i in oLayers){
			aWfsLayers.push(oLayers[i]);
		}
	} else {
		for(var i in oLayers){
			var oLayer = oLayers[i];
			if(oLayer.name ===_sLayerName){
				aWfsLayers.push(oLayers[i]);
			}
		}
	}
	
	return aWfsLayers;
}

/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 편집이력 데이터를 통한 데이터 복원 함수
 * @param {String} _sG2_id : 복원 데이터의 G2_id
 * @param {String} _sTableName : 복원 데이터의 테이블명
 * @param {String} _sG2_version : 복원할 데이터의 날짜 정보
 * @author  이상호(2016.08.30)
 */
var fn_recovery_g2Data = function(_sG2_id,_sTableName,_sG2_version,_bAttRecovery) {
	$.ajax({
		type: 'post',
		dataType: 'json',
		data: {
			g2_id : _sG2_id,
			tableName : _sTableName,
			g2_version: _sG2_version,
			g2_dataHouse: CONFIG.fn_get_dataHouseName()
		},
		url: '/getEditG2Data.do',
		success: function(_oRes) {
			var oTmpG2data = _oRes.g2data;
			var oTmpFeature;
			var aFields = [], aValues = [];
			var oSuccessInfo = {
					insertFeature : [],
					updateFeature : [],
					delFeature : [],
					pseudoFeature : [],
					successCnt : 0
			};
			if(_bAttRecovery) {
				for(var i in oTmpG2data.G2_DATA) {
					if(i.indexOf('G2_') == -1){
						aFields.push(i);
						aValues.push(oTmpG2data.G2_DATA[i]);
					}
				}
			} else {
				aFields = null, aValues = null;
			}
			
			switch(oTmpG2data.G2_STATE) {
			case 1 :
				NUTs.WFS.del(CONFIG.fn_get_dataHouseName(), _sTableName, _sG2_id, function(_oRes) {
					if(_oRes && _oRes.count > 0) {
						fn_save_g2sEditHistory(_sTableName, _sG2_id, 4);
						fn_make_wfsTResult(oSuccessInfo, _oRes, 4, _sTableName, _sG2_id);
					}
				});
				break;
			case 2 :
				oTmpFeature = editor.makeFeatureByPosList(oTmpG2data.G2_SHAPETYPE,oTmpG2data.G2_DATA.G2_SPATIAL,_sTableName+"."+_sG2_id);
				NUTs.WFS.update(CONFIG.fn_get_wfsServiceUrl(), oTmpFeature, CONFIG.fn_get_dataHouseName(), _sTableName, aFields, aValues, _sG2_id, function(_oRes) {
					if(_oRes && _oRes.count > 0) {
						fn_save_g2sEditHistory(_sTableName, _sG2_id, 2);
						fn_make_wfsTResult(oSuccessInfo, _oRes, 2, _sTableName, _sG2_id);
					}
				});
				break;
			case 4 :
				oTmpFeature = editor.makeFeatureByPosList(oTmpG2data.G2_SHAPETYPE,oTmpG2data.G2_DATA.G2_SPATIAL,_sTableName+"."+_sG2_id);
				NUTs.WFS.insert(CONFIG.fn_get_wfsServiceUrl(), oTmpFeature, CONFIG.fn_get_dataHouseName(), _sTableName, aFields, aValues, function(_oRes) {
					if(_oRes && _oRes.ids.length > 0) {
						fn_save_g2sEditHistory(_sTableName, _oRes.ids[0], 1); // _oRes.ids[0]= ex)WTL_PIPE_LM & _EDIT에 신규추가된 g2_id값
						fn_make_wfsTResult(oSuccessInfo, _oRes, 1, _sTableName, _sG2_id);
					}
				});
				break;
			}
			
			
			var nInsertFeatureCnt = oSuccessInfo.insertFeature.length;
			var nUpdateFeatureCnt = oSuccessInfo.updateFeature.length;
			var nDelFeatureCnt = oSuccessInfo.delFeature.length;

			oSuccessInfo.successCnt = nInsertFeatureCnt + nUpdateFeatureCnt + nDelFeatureCnt;

			var sMsg = '추가 : ' + nInsertFeatureCnt + '건, 수정 : ' + nUpdateFeatureCnt + '건, 삭제 : ' + nDelFeatureCnt + '건';
			COMMON.showMessage('편집저장 결과 & '+ sMsg);
			
			if(MAP_EDITOR.fn_check_wfsLayer()) {
        		MAP_EDITOR.fn_init_wfs();
        	}
			MAP.fn_redraw_wms();
			$('#timeLinBx').hide();
		}
	})
};

/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 현재 편집중인 시설물중 급수관 관말에 자동추가한 시설물이 있을 경우 목록 추출
 * @author  최재훈(2016.10.17)
 */
var fn_get_refSaveRelationLayers = function(){
	var oEditingFeatures = editor.editingFeatures;
	var aRefLayers = [];
	
	for(i=0, nLen=oEditingFeatures.LayerList.length ; i < nLen ; i++){

		var sTableName = oEditingFeatures.LayerList[i];
		if(sTableName === "WTL_SPLY_LS") {
			
			for(j=0, nG2IdLen=oEditingFeatures[sTableName].g2IdList.length; j < nG2IdLen; j++){
				
				sG2Id = oEditingFeatures[sTableName].g2IdList[j];
				var oEditingFeature = oEditingFeatures[sTableName][sG2Id];
				
				if(oEditingFeature.refFid) {
					var aRefInfo = oEditingFeature.refFid.split(".");
					var sRefLayer = aRefInfo[0];
					aRefLayers.push(sRefLayer);
				}
			}
			
			break;
		}
	}
	
	return aRefLayers.join(",");
	
};

/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 중간저장 객체를 실 DB에 저장 혹은 편집 취소할 대상 레이어 선정
 * @param {String} _sCallType : 함수 호출 타입(save : 저장, cancel : 취소) 
 * @author  윤은희(2016.10.06)
 */
var aMidSaveLayers = [];
var fn_get_midSaveLayers = function(_sCallType){
	aMidSaveLayers = [];
	
	this.showMidSaveLayers = function(_sTitle){
		var aEleHtml = [], aMidSaveHtml = [];
		var sLayer = '';
		var oEditingFeatures = editor.editingFeatures;
		var sEditingLayer = COMMON.fn_get_editingLayer();
		var sRefSaveLayers = fn_get_refSaveRelationLayers(); //동시저장해야하는 경우 (급수관로 관말에 시설물 자동추가 CASE)에 해당하는 지...     
		
		if(!COMMON.isEmptyObject(oEditingFeatures) && oEditingFeatures.LayerList.length > 0){
			for(var idx in oEditingFeatures.LayerList){
				sLayer = oEditingFeatures.LayerList[idx];
				aMidSaveHtml.push('<tr>');
				aMidSaveHtml.push('<td style="width:60px; text-align:center">');
				
				if(sLayer === sEditingLayer){
					if( sLayer === "WTL_SPLY_LS" && sRefSaveLayers !== '' ) 
						aMidSaveHtml.push(HtmlElement.Util.getCheckbox(idx, sLayer, '', 'forEventCatch2', "checked disabled"));
					else
						aMidSaveHtml.push(HtmlElement.Util.getCheckbox(idx, sLayer, '', 'forEventCatch2', "checked"));
						
					aMidSaveLayers.push(sLayer);
				}
				else if(sRefSaveLayers.indexOf(sLayer) > -1){ 
					
					aMidSaveHtml.push(HtmlElement.Util.getCheckbox(idx, sLayer, '', 'forEventCatch2', "checked disabled")); 
					aMidSaveLayers.push(sLayer);
					
				}
				else{
					aMidSaveHtml.push(HtmlElement.Util.getCheckbox(idx, sLayer, '', 'forEventCatch2', "alt=''"));
				}					
				aMidSaveHtml.push('</td>');
				aMidSaveHtml.push('<th>' + COMMON.fn_get_EditKorLayerNm(sLayer) + '</th>');
				aMidSaveHtml.push('</tr>');
			}
			aEleHtml.push("<div id='midSaveLayers' class='Table_LBx'><div class='Table_left'><table>");
			aEleHtml.push(aMidSaveHtml.join(''));
			aEleHtml.push("</table></div></div>");
			var sMidSaveHtml = aEleHtml.join('');

			$('#editMidSaveLayers .Title2').text(_sTitle);
			$('#editTableItem #midSaveLayers').remove();
			$('#editTableItem').append(sMidSaveHtml);
			
			if(sRefSaveLayers !== '')
				$('#editTableGuide').text('[급수관로] 관말에 시설물 자동추가 옵션 선택시 자동 선택됩니다.');
		}
		else{
			$('#editMidSaveLayers').hide();
			COMMON.showMessage('편집오류 & 저장할 객체가 존재하지 않습니다.');
		}
	}

	if(_sCallType === 'save'){		
		this.showMidSaveLayers('편집저장 항목선택');		
	}
	else if(_sCallType === 'cancel'){
		/*this.showMidSaveLayers('편집취소 항목선택');
		if(confirm("편집을 '취소' 하시겠습니까?") == false)
			return;
		fn_cancel_edit();*/
	}
}


/**
* @memberof USV.MAP_EDITOR
* @method
* @description 중간저장시킬 혹은 취소시킬 레이어를 선별하여 aMidSaveLayers에 지정
* @param 	{Object} _oEle : Html Element
* @author 윤은희(2016.10.06)
*/
var fn_set_midSaveLayers = function(_oEle){
	this.addItemOnArray = function(_oValue, _aTarget){
		if($.inArray(_oValue, _aTarget) === -1)
			_aTarget.push(_oValue);
	};

	this.deleteItemOnArray = function(_oValue, _aTarget){
		if(_aTarget.length === 0)
			return;
		var nIdx = $.inArray(_oValue, _aTarget);		// index 시작번호 = 0
		if(nIdx !== -1)
			_aTarget.splice(nIdx,1);
	};

	var oValue = _oEle.value;
	if(_oEle.checked)
		this.addItemOnArray(oValue, aMidSaveLayers);
	else
		this.deleteItemOnArray(oValue, aMidSaveLayers);
}


//------------------------------------------------------------------------------------------------------------------
// ## public 메소드
//------------------------------------------------------------------------------------------------------------------
_mod_map_editor.fn_init_editor 								= 	fn_init_editor;
_mod_map_editor.fn_init_snappingControl						=	fn_init_snappingControl;
_mod_map_editor.fn_init_editLayerSetting 					= 	fn_init_editLayerSetting;
_mod_map_editor.fn_init_timeLine 							=	fn_init_timeLine;

_mod_map_editor.fn_get_middleEditList 						= 	fn_get_middleEditList;
_mod_map_editor.fn_get_jsonPropertyByProp					= 	fn_get_jsonPropertyByProp;
_mod_map_editor.fn_get_newG2Id								=	fn_get_newG2Id;
_mod_map_editor.fn_get_editRuleInfo 						= 	fn_get_editRuleInfo;
_mod_map_editor.fn_get_layerPositionInfo 					= 	fn_get_layerPositionInfo;
_mod_map_editor.fn_get_snapDistance							=	fn_get_snapDistance;
_mod_map_editor.fn_get_snapMark								=	fn_get_snapMark;
_mod_map_editor.fn_get_objFactory							=	fn_get_objFactory;
_mod_map_editor.fn_get_g2idByFeature						=	fn_get_g2idByFeature;
_mod_map_editor.fn_get_fidByFeature							=	fn_get_fidByFeature;
_mod_map_editor.fn_get_tblNameByFeature						=	fn_get_tblNameByFeature;
_mod_map_editor.fn_get_aPositionLayerInfo						=	fn_get_aPositionLayerInfo;
_mod_map_editor.fn_get_editFeatureStyle 						= 	fn_get_editFeatureStyle;
_mod_map_editor.fn_get_searchFeatureStyle 						= 	fn_get_searchFeatureStyle;
_mod_map_editor.fn_get_midSaveLayers 						= 	fn_get_midSaveLayers;

_mod_map_editor.fn_set_editLayerSchemaInfo					=	fn_set_editLayerSchemaInfo;
_mod_map_editor.fn_set_editRuleInfo 						= 	fn_set_editRuleInfo;
_mod_map_editor.fn_set_midSaveLayers 						= 	fn_set_midSaveLayers;

_mod_map_editor.fn_add_featureBySearchResult				= 	fn_add_featureBySearchResult;
_mod_map_editor.fn_add_featureToEditMonitor					=	fn_add_featureToEditMonitor;
_mod_map_editor.fn_add_featureToEditMonitorFromShp			= 	fn_add_featureToEditMonitorFromShp;
_mod_map_editor.fn_add_shpVectorLayer 						=	fn_add_shpVectorLayer;
_mod_map_editor.fn_add_refLine 								=	fn_add_refLine;
_mod_map_editor.fn_add_viewVectorLayer						=	fn_add_viewVectorLayer;
_mod_map_editor.fn_add_featureToSearchDialogFromShp			=	fn_add_featureToSearchDialogFromShp

_mod_map_editor.fn_create_facilityBySameDist				=	fn_create_facilityBySameDist;
_mod_map_editor.fn_create_searchList 						= 	fn_create_searchList;
_mod_map_editor.fn_create_featureByXY						=	fn_create_featureByXY;
//_mod_map_editor.fn_create_editingFeatureIndex				=	fn_create_editingFeatureIndex;
_mod_map_editor.fn_create_timeLine 							=	fn_create_timeLine;
_mod_map_editor.fn_create_editingFeatures 					=	fn_create_editingFeatures;
_mod_map_editor.fn_create_editingFeature 					=	fn_create_editingFeature;
_mod_map_editor.fn_create_responseObj						=	fn_create_responseObj;

_mod_map_editor.fn_make_resultObjByShp						=	fn_make_resultObjByShp;

//_mod_map_editor.fn_remove_objectOnEmJsonTotInfo 			=	fn_remove_objectOnEmJsonTotInfo;
_mod_map_editor.fn_remove_feature							= 	fn_remove_feature;
_mod_map_editor.fn_remove_AllRefLayer						=	fn_remove_AllRefLayer;
_mod_map_editor.fn_remove_snapPopup							=	fn_remove_snapPopup;
_mod_map_editor.fn_remove_searchFeatures					=	fn_remove_searchFeatures;

_mod_map_editor.fn_cancel_edit								=	fn_cancel_edit;
_mod_map_editor.fn_cancel_featureCopy 						=	fn_cancel_featureCopy;

_mod_map_editor.fn_clear_refLinePopup						=	fn_clear_refLinePopup;
_mod_map_editor.fn_clear_mergePopup							=	fn_clear_mergePopup;

_mod_map_editor.fn_call_deleteFeatureOnEditLayer 			=	fn_call_deleteFeatureOnEditLayer;
_mod_map_editor.fn_call_saveMiddleBridge 					=	fn_call_saveMiddleBridge;
_mod_map_editor.fn_call_editRuleInfoforMovePosByOffset 		=	fn_call_editRuleInfoforMovePosByOffset;

_mod_map_editor.fn_check_editMode							= 	fn_check_editMode;
_mod_map_editor.fn_check_SpatialValueChange					= 	fn_check_SpatialValueChange;
_mod_map_editor.fn_check_fldValueChange						=	fn_check_fldValueChange;
_mod_map_editor.fn_check_editLayerSettings					=	fn_check_editLayerSettings;

_mod_map_editor.fn_proc_divideLine							=	fn_proc_divideLine;
_mod_map_editor.fn_proc_mergeFeature						=	fn_proc_mergeFeature;
_mod_map_editor.fn_proc_dividePolygon						=	fn_proc_dividePolygon;
_mod_map_editor.fn_proc_mergePolygon						=	fn_proc_mergePolygon;

_mod_map_editor.fn_save_middleAll							=	fn_save_middleAll;
_mod_map_editor.fn_save_middle								=	fn_save_middle;
_mod_map_editor.fn_save_edit								=	fn_save_edit;

_mod_map_editor.fn_start_edit								=	fn_start_edit;
_mod_map_editor.fn_start_editFeature						=	fn_start_editFeature;

_mod_map_editor.fn_draw_oneFeatureBorder					=	fn_draw_oneFeatureBorder;
_mod_map_editor.fn_draw_featureOnEditLayer					=	fn_draw_featureOnEditLayer;

_mod_map_editor.fn_split_lineString							=	fn_split_lineString;
_mod_map_editor.fn_split_polygon							=	fn_split_polygon;

_mod_map_editor.fn_merge_polygon							=	fn_merge_polygon;
_mod_map_editor.fn_merge_lineString							=	fn_merge_lineString;

_mod_map_editor.fn_update_filterOnWFSLayer					=	fn_update_filterOnWFSLayer;

_mod_map_editor.fn_reverse_direction						=	fn_reverse_direction;

_mod_map_editor.fn_apply_snap								=	fn_apply_snap

_mod_map_editor.fn_blink_feature							=	fn_blink_feature;
_mod_map_editor.fn_blink_featureByfId						=	fn_blink_featureByfId;

_mod_map_editor.fn_convert_olFeatureTOoGFeature				=	fn_convert_olFeatureTOoGFeature;
_mod_map_editor.fn_convert_olFeatureTOoGInnerFeature		=	fn_convert_olFeatureTOoGInnerFeature;
_mod_map_editor.fn_clone_featureToGInnerFeature				=	fn_clone_featureToGInnerFeature;
_mod_map_editor.fn_deepClone_featureToGInnerFeature			=	fn_deepClone_featureToGInnerFeature;

_mod_map_editor.fn_check_wfsLayer							=	fn_check_wfsLayer;
_mod_map_editor.fn_init_wfs									=	fn_init_wfs;
_mod_map_editor.fn_proc_modifiedFeature						=	fn_proc_modifiedFeature;

_mod_map_editor.fn_replace_fieldName						=	fn_replace_fieldName;
_mod_map_editor.fn_recovery_g2Data							=	fn_recovery_g2Data;

_mod_map_editor.fn_copyPaste_feature						=	fn_copyPaste_feature;
_mod_map_editor.fn_sync_middleEditList 						= 	fn_sync_middleEditList;

//------------------------------------------------------------------------------------------------------------------

return _mod_map_editor;

}(USV.MAP_EDITOR || {}, jQuery));