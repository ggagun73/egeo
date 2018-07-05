/**************************************************************************************************************
 * DragFeature 클래스
 * @namespace {Object} NUTs.Edit.Control.DragFeature
 * @description 편집대상 feature를 선택 후 드래그할 경우 처리 담당
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

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
        this.title = OpenLayers.i18n('oleDragFeature');
    },
    
    clickFeature: function(feature) {

    	MAP_EDITOR.fn_draw_oneFeatureBorder(feature,'selectpoint');

        if (this.handlers.feature.touch && !this.over && this.overFeature(feature)) {
            this.handlers.drag.dragstart(this.handlers.feature.evt);
            this.handlers.drag.stopDown = false;
        }
    },
    
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