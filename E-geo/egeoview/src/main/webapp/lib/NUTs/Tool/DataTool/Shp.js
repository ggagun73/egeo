
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

 