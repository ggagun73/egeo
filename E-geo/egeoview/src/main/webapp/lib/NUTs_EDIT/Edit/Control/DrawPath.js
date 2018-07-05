/**************************************************************************************************************
 * DrawPath 클래스
 * @author ehyun 
 * @namespace {Object} NUTs.Edit.Control.DrawPath
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Edit.Control.DrawPath = OpenLayers.Class(OpenLayers.Editor.Control.DrawPath, {

    minLength: 0,

    title: OpenLayers.i18n('oleDrawPath'),
   
    featureType: 'linestring',
    
	/**
	* divide 수행할 Base Feature
	* @memberof NUTs.Edit.Control.DrawPath
	* @member {OpenLayers.Feature}  forDivideFeature
	*/
    forDivideFeature: null,
    
    /**
     * Draw Mode : 'add'
     */
    mode: '',
    
    /**
     * 교차옵션
     */
    crossOption: '',

    initialize: function (layer, options) {
        this.callbacks = OpenLayers.Util.extend(this.callbacks, {
            point: function(point) {
                this.layer.events.triggerEvent('pointadded', {point: point});
            }
        });
        
        OpenLayers.Control.DrawFeature.prototype.initialize.apply(this,
//        	[layer, OpenLayers.Handler.Path, options]);
        	[layer, NUTs.Handler.Path, options]);
        
        this.title = OpenLayers.i18n('oleDrawPath');
    },
    activate: function () {
    	
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if(this.map) {
            OpenLayers.Element.addClass(
                this.map.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("activate");
        return true;
    },
    
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.map) {
                OpenLayers.Element.removeClass(
                    this.map.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
             
            var snapCtrl = map.getControl("SnappingSettings");
            if(snapCtrl){
            	MAP_EDITOR.fn_remove_snapPopup();
                snapCtrl.popup = null;
            }
            
            return true;
        }
        
        return false;
    },
      
    initDivideProperties: function(){
    	NUTs.Edit.Control.DrawPath.forDivideFeature = null;		// this.forDivideFeature = null ??
    	NUTs.Edit.Control.DrawPath.mode = '';					// this.mode = '' ??
    	NUTs.Edit.Control.DrawPath.crossOption = '';			// this.crossOption = '' ??
    },

    /**
     * Method: draw path only if area greater than or equal to minLength
     */
    drawFeature: function (geometry) {
    	var DrawPath = NUTs.Edit.Control.DrawPath;
    	if(DrawPath.crossOption === 'cross'){	// 더블클릭 종료시, 분할 대상이 되지 않은 마지막 입력 개체
    		geometry = DrawPath.forDivideFeature.geometry;
    		if(geometry.components.length === 1){
    			this.initDivideFeature();
    			return;
    		}
    	}
    	
    	this.addDrawFeatures = function(){
    		var oStyle = MAP_EDITOR.fn_get_editFeatureStyle(feature);
    		feature.style = oStyle;
    		
    		this.layer.addFeatures([feature]);
            this.featureAdded(feature);            
            this.events.triggerEvent('featureadded', {feature : feature});
            this.layer.drawFeature(feature, sEditLayer.toLowerCase());
    	}
    	
    	this.initDivideFeature = function(){
    		 if(DrawPath.crossOption === 'cross' || DrawPath.crossOption === 'over')
    			 DrawPath.forDivideFeature = null;
    	}
    	
    	this.applyCrossOption = function(){
    		var sState = '';
    		
    		if(DrawPath.crossOption){
    			switch(DrawPath.crossOption){
	    			case 'none':			// [없음]
	    				break;
	    			case 'cut':				// [접합] 입력 feature와 교차하는 개체를 찾아서 발견되면, 입력한 feature와의 교차점에서 분할처리(교차점부터 입력 feature의 끝점까지는 제거함)
	    				var oIntersectsGeom = NUTs.EditRule.checkRelationGeometry(feature, sEditLayer, NUTs.EditRule.spatialOperType.INTERSECTS);
	    				if(NUTs.Util.isEmptyObject(oIntersectsGeom) === false){	    					
	    					if(oIntersectsGeom.data.length === 1){
	    						if(oIntersectsGeom.data[0].results.length >= 2)
		    						sState = 'over';
	    						else{
	    							// 입력 feature의 시작점과 intersect된 객체와의 거리가 입력 feature의 끝점보다 가깝고 tolerance보다 작으면, 시작점이 접점(ex. 스냅을 걸었을 경우)에 해당하므로 divide 수행하지 않음.	    							
	    							var oSPointGeom = NUTs.GeoJson.getGeoJson('Point', feature.geometry.components[0]);	    							
	    							var oEPointGeom = NUTs.GeoJson.getGeoJson('Point', feature.geometry.components[feature.geometry.components.length-1]);	    							
	    							var oCompLineStringGeom = NUTs.GeoJson.getGeoJson('LineString', oIntersectsGeom.data[0].results[0].feature.geometry.components);

	    							var nSCompDist = NUTs.JSTSOperator.Distance(oCompLineStringGeom, oSPointGeom);
	    							var nECompDist = NUTs.JSTSOperator.Distance(oCompLineStringGeom, oEPointGeom);

	    							if(nSCompDist > nECompDist){
	    								var aDividedObj = editor.getDivideLine(feature.geometry.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
			    						feature.geometry = editor.getGeometryByLineString(aDividedObj[0]);
	    							}
	    							else{		 
	    								if(nSCompDist < NUTs.EditRule.tolerance){		// 접점(ex. 스냅을 걸었을 경우)에 해당하는 경우
	    									;	// do nothing
	    								}
	    								else{
	    									var aDividedObj = editor.getDivideLine(feature.geometry.components, oIntersectsGeom.data[0].results[0].feature.geometry.components);
				    						feature.geometry = editor.getGeometryByLineString(aDividedObj[0]);
	    								}
	    							}	
	    						}	    						
	    					}
	    				}	    				
	    				break;
	    			case 'cross':			// [교차]
	    				break;
	    			case 'over':			// [상월]
	    				break;
	    			case 'under':			// [하월]
	    				break;
    			}    			
    		}
    		
    		return sState;
    	}
    	
    	if(editor.copyMode && NUTs.Util.isEmptyObject(editor.copiedField) === true){
    		NUTs.Util.showMessage('편집오류 - 시설물 복제 & 복제된 속성이 존재하지 않습니다. [검색결과]창에서 복제할 시설물의 속성을 먼저 선택하여 주세요.');
    		return;
    	}

    	var feature = new OpenLayers.Feature.Vector(geometry),
            proceed = this.layer.events.triggerEvent('sketchcomplete', {feature: feature});
    	
        if (proceed !== false && geometry.getLength() >= this.minLength) {   
        	var sG2Id = MAP_EDITOR.fn_get_newG2Id();
            var sEditLayer = COMMON.fn_get_editingLayer();
            
            var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(feature, sEditLayer.concat('.', sG2Id), OpenLayers.State.INSERT);
        	feature = oGFeature.feature;

            // check for EditRule
            var oResultLastPoint = {};
            var aAppliedEditRule=[];
            var oEditRuleInfo = MAP_EDITOR.fn_get_editRuleInfo();
            if(NUTs.Util.isEmptyObject(oEditRuleInfo.operType.add) === false){
            	var sErrorMsg = [];
        		NUTs.EditRule.editingGeometry = feature;
            	
            	for(var i=0,len=oEditRuleInfo.operType.add.length; i<len; i++){

            		var sEditRule = oEditRuleInfo.operType.add[i].rule;            		
        			$.globalEval(sEditRule);

            		if(sEditRule.indexOf('checkRelationGeometry') !== -1){
            			if(NUTs.Util.isEmptyObject(NUTs.EditRule.resultGeometry) === false)
            				aAppliedEditRule.push('checkRelationGeometry');
            			else
            				sErrorMsg.push(oEditRuleInfo.operType.add[i].errorMsg + '</br>');
            		}
            		else if(sEditRule.indexOf('checkRelationAddPointOnGeometryEnd') !== -1){
            			if(NUTs.Util.isEmptyObject(NUTs.EditRule.resultGeometry) === false){
            				oResultLastPoint = NUTs.EditRule.resultGeometry;
            				aAppliedEditRule.push('checkRelationAddPointOnGeometryEnd');
            			}
            			else
            				sErrorMsg.push(oEditRuleInfo.operType.add[i].errorMsg + '</br>');
            		}	
            	}
            	
            	if(sErrorMsg.length >0){            		
            		this.initDivideFeature();            		
            		NUTs.Util.showMessage('편집룰오류 & [룰 위반] ' + sErrorMsg.join(''),4000);
            		return;
            	}	
            	
            	// draw the results
                if(aAppliedEditRule.length === oEditRuleInfo.operType.add.length){
                	if(!this.applyCrossOption()){
                		MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);
                		
            			this.addDrawFeatures();
            			
                    	for(var j=0; j<aAppliedEditRule.length; j++){
                    		if(aAppliedEditRule[j] === 'checkRelationAddPointOnGeometryEnd'){
                    			var sAddLayer = oEditRuleInfo.option[0].value;
                    			var madeKey = MAP_EDITOR.fn_create_featureByXY(sAddLayer, oResultLastPoint.x, oResultLastPoint.y, false);          	                
                    			if(madeKey){
                    				var aTmpInfo = madeKey.split('.');
                        			if(aTmpInfo.length ==2){
                        				
                        				var sTmpLayer = aTmpInfo[0];
                        				var sTmpG2id = aTmpInfo[1];
                        				
                                		var oTmpMasterEditingFeature 	= editor.editingFeatures[sEditLayer][sG2Id];
                        				var oTmpSubEditingFeature 		= editor.editingFeatures[sTmpLayer][sTmpG2id];

                                		if(oTmpMasterEditingFeature)
                                			oTmpMasterEditingFeature.refFid = madeKey;
                                		
                        				if(oTmpSubEditingFeature)
                        					oTmpSubEditingFeature.refFid = sEditLayer +'.'+sG2Id;

                        			}
                    			}
                    			
                    		}
                    	}
                    	NUTs.EditRule.resultGeometry = {};
                	}
                	else{
                		NUTs.EditRule.resultGeometry = {};
                		NUTs.Util.showMessage('편집오류 &  ' + COMMON.fn_get_EditKorLayerNm(sEditLayer) + '를 2개 이상 만나면 처리를 할 수 없습니다.');
                		return;
                	}
                }
            }
            else{
            	if(!this.applyCrossOption()){
            		MAP_EDITOR.fn_add_featureToEditMonitor(feature, sEditLayer, sG2Id, oEditRuleInfo.option);
            		if(editor.editingFeatures[sEditLayer] && editor.editingFeatures[sEditLayer][sG2Id])
            			feature.data = editor.editingFeatures[sEditLayer][sG2Id].properties; 		// 접합,교차를 통해 추가된 객체가 필드 속성을 보유하도록.

                	this.addDrawFeatures();	
            	}
            	else{
            		NUTs.Util.showMessage('편집오류 &  ' + COMMON.fn_get_EditKorLayerNm(sEditLayer) + '를 2개 이상 만나면 처리를 할 수 없습니다.');
            		return;
            	}
            }
            
            this.initDivideFeature();
        }
    },
    CLASS_NAME: 'NUTs.Edit.Control.DrawPath'
});
