/* 
 * Get MapService LayerId
 * call method : fnGetLayerId(MapService, LayerAliasName)
 * return : LayerId
 */
function getLayerId(mapService, layerNm) { 
	var layerId = -1;	
    var layerInfos = mapService.layerInfos;
	dojo.forEach(layerInfos, function(layerInfo) {
		if(layerNm == layerInfo.name) {
			layerId = layerInfo.id;	
		}		
	});	
	return layerId; 
}

/* 
 * Get MapService LayerIds
 * call method : fnGetLayerIds(MapService, [LayerAliasName])
 * return : array
 */
function fnGetLayerIds(mapService, layerNms) {
	var layerIds = [];
	var layerInfos = mapService.layerInfos;
	$(layerNms).each(function(i, data1) {
		$(layerInfos).each(function (j, data2) {
			if (data1 == data2.name) {
				layerIds.push(data2.id);
				return false;
			}
		});
	});
	return layerIds; 
}
/* 
 * Get MapService LayerIds
 * call method : fnGetLayerNames(MapService, [LayerIds])
 * return : array
 */
function fnGetLayerNames(mapService, layerIds) {
	var layerNames = [];
	var layerInfos = mapService.layerInfos;
	$(layerIds).each(function(i, data1) {
		$(layerInfos).each(function (j, data2) {
			if (data1 == data2.id) {
				layerNames.push(data2.name);
				return false;
			}
		});
	});
	return layerNames; 
}

//다이나믹맵서비스  레이어  정보얻어내기
// mapResource :  다이나믹 맵 서비스 아이디를 넣는다. 예: "MapServices"  or "LifeDynService"
// layer  : 레이어명  ( 못얻어내면  -1 리턴
function getLayerInfo(mapService, layerNm)  { 
	var layerInfo2;
	var layerInfos = mapService.layerInfos;
	dojo.forEach(layerInfos, function(layerInfo) {
		if(layerNm == layerInfo.name) {
			layerInfo2 = layerInfo;		
		}			
	  });	
	return layerInfo2; 
}

//다이나믹맵서비스  레이어 명 정보얻어내기
// mapResource :  다이나믹 맵 서비스 아이디를 넣는다. 예: "MapServices"  or "LifeDynService" 	호출방법: getLayerNM(baseIndexMap500,2);
// layer  : 레이어명  ( 못얻어내면  -1 리턴
function getLayerNM(mapService, layerID){ 
	var layerNM;	
	var layerInfos = mapService.layerInfos;
	dojo.forEach(layerInfos, function(layerInfo) {
		if( layerID  == layerInfo.id) {
			layerNM = layerInfo.name;		
		}			
	});	
	return layerNM; 
}
