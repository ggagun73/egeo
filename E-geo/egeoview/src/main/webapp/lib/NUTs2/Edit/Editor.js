/****************************************************************
 *
 * 파일명 : OpenLayersEditCustom.js
 * 설  명 : OpenLayersEditor 커스터마이징 JavaScript
 *          OpenLayersEditor버전업을 위한 별도 구성 
 ****************************************************************          
 *          버전업시 필요한 작업
 *          1. loader.js에 본 파일 경로 추가
 *          2. 본 파일에 정의한 클래스 및 함수 변경여부 확인 후 수정
 *          3. 스타일(geosilk.css -> geosilk_custom.css에 변경내역 수정-주로 editorpanel class 명칭.) 
 *
 *    수정일      수정자     Version        Function 명
 * ------------    ---------   -------------  ----------------------------
 * 2015.07.27      최재훈       1.0             최초생성
 * 2015.08.26      최재훈       1.0             activate처리
 * 2015.08.27      윤은희       1.1             NUTs.Edit.Control.DrawPath,DrawCustomPoint Class 추가
 */


/**********************************************
 * 클래스명 : NUTs.Edit.Editor BASIC
 * 설  명 : 커스터마이징 Editor .
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.07.27    최재훈      신규작업
 *
 */

NUTs.Edit.Editor = OpenLayers.Class(OpenLayers.Editor,{
	
	
	/**
     * Property: map
     * {<OpenLayers.Map>} this gets set in the constructor.
     */
    map: null,
    
    /**
     * Property: editingFeatures
     * {Object} 편집중인 feature정보
    */
	editingFeatures : null,
    /**
     * Property: id
     * {String} Unique identifier for the Editor.
     */
    id: null,
    
    	
    /**
     * Property: editLayer
     * {<OpenLayers.Layer.Vector>} 현재 편집진행중인 feature workspace.
     */
    editLayer: null,
           
    /**
     * Property: editorPanel
     * {<OpenLayers.Editor.Control.EditorPanel>} Contains icons for active controls
     *     and gets set by startEditMode() and unset by stopEditMode().
     */
    editorPanel: null,

    /**
     * Property: editMode
     * {Boolean} The editor is active.
     */
    editMode: false,

    /**
     * Property: dialog
     * {<OpenLayers.Editor.Control.Dialog>} ...
     */
    dialog: null,

    /**
     * Property: status
     * @type {function(string, string)} Function to display states, receives status type and message
     */
    showStatus: function (status, message) {
        if (status === 'error') {
            alert(message);
        }
    },

    /**
     * Property: activeControls
     * {Array} ...
     */
    activeControls: [],

    /**
     * Property: editorControls
     * {Array} Contains names of all available editor controls. In particular
     *   this information is needed by this EditorPanel.
     */
    editorControls: ['CleanFeature', 'DeleteFeature', 'DeleteAllFeatures', 'Dialog', 'DrawRegular',
        'DrawPolygon', 'DrawPath', 'DrawPoint', 'DrawText', 'EditorPanel', 'ImportFeature',
        'MergeFeature', 'SnappingSettings', 'SplitFeature', 'CADTools',
        'TransformFeature', 'ContextMenu'],

    /**
     * Geometry types available for editing
     * {Array}
     */
    featureTypes: ['text', 'point', 'linestring', 'polygon', 'regular'],

    /**
     * Property: sourceLayers
     * {Array} ...
     */
    sourceLayers: [],

    /**
     * Property: parameters
     * {Object} ...
     */
    params: {},

    geoJSON: new OpenLayers.Format.GeoJSON(),

    /**
     * Property: options
     * {Object} ...
     */
    options: {},

    /**
     * Property: URL of processing service.
     * {String}
     */
    oleUrl: '',

    /**
     * Instantiated controls
     * {Objects}
     */
    controls: {},

    /**
     * Property: undoRedoActive
     * {Boolean} Indicates if the UndoRedo control is active. Only read on
     *     initialization right now. Default is true.
     */
    undoRedoActive: true,

    /**
     * @param {OpenLayers.Map} map A map that shall be equipped with an editor; can be left undefined in which case a map is created.
     * @param {Object} options
     */
    initialize: function (map, options) {

        OpenLayers.Util.extend(this, options);

        if (map instanceof OpenLayers.Map) {
            this.map = map;
        } else {
            this.map = new OpenLayers.Map();
        }

        if (!options) {
            options = {};
        }

        if (!options.dialog) {
            this.dialog = new OpenLayers.Editor.Control.Dialog();
            this.map.addControl(this.dialog);
        }

        this.id = OpenLayers.Util.createUniqueID('OpenLayers.Editor_');

        if (options.editLayer) {
            this.editLayer = options.editLayer;
        } else {
            this.editLayer = new OpenLayers.Layer.Vector('Editor', {
                displayInLayerSwitcher: false
            });
        }        

        var selectionContext = {
            editor: this,
            layer: this.editLayer,
            controls: [
                'OpenLayers.Editor.Control.DeleteFeature',
                'OpenLayers.Editor.Control.CleanFeature',
                'OpenLayers.Editor.Control.MergeFeature',
                'OpenLayers.Editor.Control.SplitFeature'
            ]};
        this.editLayer.events.register('featureselected', selectionContext, this.selectionChanged);
        this.editLayer.events.register('featureunselected', selectionContext, this.selectionChanged);

        for (var i = 0, il = this.featureTypes.length; i < il; i++) {
            if (this.featureTypes[i] == 'polygon') {
                this.activeControls.push('DrawPolygon');
                this.activeControls.push('DrawHole');
            }
            else if (this.featureTypes[i] == 'linestring') {
                this.activeControls.push('DrawPath');
            }
            else if (this.featureTypes[i] == 'point') {
                this.activeControls.push('DrawPoint');
            }
            else if (this.featureTypes[i] == 'regular') {
                this.activeControls.push('DrawRegular');
            }
            else if (this.featureTypes[i] == 'text') {
                this.activeControls.push('DrawText');
            }
        }

        for (var i = 0, il = this.sourceLayers.length; i < il; i++) {
            var selectionContext = {
                editor: this,
                layer: this.sourceLayers[i],
                controls: ['OpenLayers.Editor.Control.ImportFeature']
            };
            this.sourceLayers[i].events.register('featureselected', selectionContext, this.selectionChanged);
            this.sourceLayers[i].events.register('featureunselected', selectionContext, this.selectionChanged);
            this.sourceLayers[i].styleMap = new OpenLayers.StyleMap({
                'default': new OpenLayers.Style({
                    fillColor: '#0c0',
                    fillOpacity: 0.8,
                    strokeColor: '#070',
                    strokeWidth: 2,
                    graphicZIndex: 1,
                    pointRadius: 5
                }),
                'select': new OpenLayers.Style({
                    fillColor: '#fc0',
                    strokeColor: '#f70',
                    graphicZIndex: 2
                }),
                'temporary': new OpenLayers.Style({
                    fillColor: '#fc0',
                    fillOpacity: 0.8,
                    strokeColor: '#f70',
                    strokeWidth: 2,
                    graphicZIndex: 2,
                    pointRadius: 5
                })
            });
            this.map.addLayer(this.sourceLayers[i]);
        }

        this.map.editor = this;
        this.map.addLayer(this.editLayer);
        this.map.addLayer(this.refLayer);
        this.map.addLayer(this.styleLayer);
        this.map.addControl(new OpenLayers.Editor.Control.LayerSettings(this));

        if (this.undoRedoActive) {
            this.map.addControl(new OpenLayers.Editor.Control.UndoRedo(this.editLayer));
        }

        this.addEditorControls();

        return this;
    },
    
    /**
     * Enable or disable controls that depend on selected features.
     *
     * Requires an active SelectFeature control and the following context variables:
     * - editor: this
     * - layer: The layer with selected features.
     * - controls: An array of class names.
     */
    selectionChanged: function () {
        var selectFeature = this.editor.editorPanel.getControlsByClass('OpenLayers.Control.SelectFeature')[0];

        if (this.layer.selectedFeatures.length > 0 && selectFeature && selectFeature.active) {
            // enable controls
            for (var ic = 0, lic = this.controls.length; ic < lic; ic++) {
                var control = this.editor.editorPanel.getControlsByClass(this.controls[ic])[0];
                if (control) {
                    OpenLayers.Element.removeClass(control.panel_div, 'oleControlDisabled');
                }
            }
        } else {
            // disable controls
            for (var ic = 0, lic = this.controls.length; ic < lic; ic++) {
                var control = this.editor.editorPanel.getControlsByClass(this.controls[ic])[0];
                if (control) {
                    OpenLayers.Element.addClass(control.panel_div, 'oleControlDisabled');
                }
            }
        }

        this.editor.editorPanel.redraw();
    },

    /**
     * Makes the toolbar appear and allows editing
     */
    startEditMode: function () {
        this.editMode = true;
        this.editorPanel.activate();
    },

    /**
     * Hides the toolbar and prevents editing
     */
    stopEditMode: function () {
        this.editMode = false;
        this.editorPanel.deactivate();
    },

    /**
     * Initializes configured controls and shows them
     */
    addEditorControls: function () {
        var control = null, controls = [];
        var editor = this;

        for (var i = 0, len = editor.activeControls.length; i < len; i++) {
            control = editor.activeControls[i];

            if (OpenLayers.Util.indexOf(editor.editorControls, control) > -1) {
            	
        		controls.push(new OpenLayers.Editor.Control[control](
                        editor.editLayer, 
                        OpenLayers.Util.extend({
                        	id : control
                        }, editor.options[control])
                        
                ));
                
            }

            switch (control) {

                case 'Separator':
                    controls.push(new OpenLayers.Control.Button({
                    	id: control,
                        displayClass: 'olControlSeparator'
                        	
                    }));
                    break;

                case 'Navigation':
                    controls.push(new OpenLayers.Control.Navigation(
                            OpenLayers.Util.extend(
                                    {
                                    id: control,
                                    title: OpenLayers.i18n('oleNavigation')},
                                    editor.options.Navigation)
                    ));
                    break;

                case 'CustomDragFeature':
                    controls.push(new NUTs.Edit.Control.DragFeature(editor.editLayer,
                            OpenLayers.Util.extend(
                            		{
                            			id: control
                            		}, editor.options.DragFeature)
                    ));
                    break;

                case 'CustomModifyFeature':
                    controls.push(new NUTs.Edit.Control.ModifyFeature(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
	                                    id: control,
	                                    title: OpenLayers.i18n('oleModifyFeature')
                                    }, editor.options.ModifyFeature)
                    ));
                    break;

                case 'CustomTransformFeature':
                    controls.push(new NUTs.Edit.Control.TransformFeature(editor.editLayer,editor.refLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.TransformFeature)
                    ));
                    break;

                case 'SnappingSettings':
                    controls.push(new NUTs.Edit.Control.SnappingSettings(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.SnappingSettings)
                    ));
                    break;

                case 'DrawCustomPoint':
                    controls.push(new DrawPoint(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawPoint)
                    ));
                    break;

                case 'DrawPath':
                    controls.push(new NUTs.Edit.Control.DrawPath(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawPath)
                    ));
                    break;
                    
                case 'DrawHole':
                    controls.push(new NUTs.Edit.Control.DrawHole(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawHole)
                    ));
                    break;

                case 'DrawRefLine':
                    controls.push(new NUTs.Control.DrawFeature(editor.refLayer, NUTs.Handler.Path, {
    					id : 'DrawRefLine',
    					handlerOptions : {
    						attributes : {}
    					},
    		    		eventListeners : {
    		    			"featureadded" : function(evt) {
    		    				editor.checkRefLineCount(evt);
    		    			}
    		    		}
    				}));
                    break;

                case 'SelectFeature':
                    controls.push(new OpenLayers.Control.SelectFeature(
                            editor.sourceLayers.concat([editor.editLayer]),
                            OpenLayers.Util.extend(
                                    {
                                    	id: control,
                                        title: OpenLayers.i18n('oleSelectFeature'),
                                        clickout: true,
                                        toggle: false,
                                        multiple: false,
                                        hover: false,
                                        toggleKey: "ctrlKey",
                                        multipleKey: "ctrlKey",
                                        box: true
                                    },
                                    editor.options.SelectFeature)
                    ));
                    break;

                case 'DownloadFeature':
                    controls.push(new OpenLayers.Editor.Control.DownloadFeature(editor.editLayer,
                            OpenLayers.Util.extend({
                            	id: control
                            	}, this.DownloadFeature)
                    ));
                    break;

                case 'UploadFeature':
                    controls.push(new OpenLayers.Editor.Control.UploadFeature(editor.editLayer,
                            OpenLayers.Util.extend({
                            	id: control
                            	}, this.UploadFeature)
                    ));
                    break;
            }

            // Save instance in editor's controls mapping
            this.controls[control] = controls[controls.length - 1];
        }

        // Add toolbar to map
        this.editorPanel = this.createEditorPanel(controls);
        editor.map.addControl(this.editorPanel);
    },
    
    /**
     * Adds a control to the editor and its panel
     * @param {OpenLayers.Editor.Control} control
     */
    addEditorControl: function (control) {
        this.controls[control.CLASS_NAME] = control;
        this.editorPanel.addControls([control]);
        this.map.addControl(control);
    },

    /**
     * Instantiates the container which displays the tools.
     * To be called by OLE only and intended to be overridden by subclasses that want to display something else instead of the default toolbar
     * @param {Array.<OpenLayers.Control>} controls Editing controls
     * @return {OpenLayers.Editor.Control.EditorPanel} Widget to display editing tools
     */
    createEditorPanel: function (controls) {

        // remove controls from context menu
        if (this.controls['ContextMenu']) {
            var ctrls = this.controls['ContextMenu'].contextMenuControls || [];
            var i = ctrls.length;
            while (i--) {
                var pos = controls.indexOf(this.controls[ctrls[i]]);
                if (~pos) {
                    controls.splice(pos, 1);
                }
            }

            controls.splice(controls.indexOf(this.controls['ContextMenu']), 1);
        }

        var editorPanel = new NUTs.Edit.Control.EditPanel(this);
        editorPanel.addControls(controls);
        return editorPanel;
    },

    status: function (options) {
        if (options.type == 'error') {
            alert(options.content);
        }
    },

    /**
     * Destroys existing features and loads the provided one into editor
     * @param {Array.<OpenLayers.Feature.Vector>} features
     */
    loadFeatures: function (features) {
        this.editLayer.destroyFeatures();
        if (features) {
            this.editLayer.addFeatures(features);
            this.map.zoomToExtent(this.editLayer.getDataExtent());
        }
    },

    /**
     * Callback to update selected feature with result of server side processing
     */
    requestComplete: function (response) {
        var responseJSON = new OpenLayers.Format.JSON().read(response.responseText);
        this.map.editor.stopWaiting();
        if (!responseJSON) {
            this.showStatus('error', OpenLayers.i18n('oleNoJSON'))
        } else if (responseJSON.error) {
            this.showStatus('error', responseJSON.message)
        } else {
            if (responseJSON.params) {
                OpenLayers.Util.extend(this.params, responseJSON.params);
            }
            if (responseJSON.geo) {
                var geo = this.geoJSON.read(responseJSON.geo);
                this.editLayer.removeFeatures(this.editLayer.selectedFeatures);
                this.editLayer.addFeatures(this.toFeatures(geo));
                this.editLayer.events.triggerEvent('featureselected');
            }
        }
    },

    /**
     * Flattens multipolygons and returns a list of their features
     * @param {Object|Array} multiPolygon Geometry or list of geometries to flatten. Geometries can be of types
     *     OpenLayers.Geometry.MultiPolygon, OpenLayers.Geometry.Collection,
     *     OpenLayers.Geometry.Polygon.
     * @return {Array} List for features of type OpenLayers.Feature.Vector.
     */
    toFeatures: function (multiPolygon) {
        if (multiPolygon === null || typeof(multiPolygon) !== 'object') {
            throw new Error('Parameter does not match expected type.');
        }
        var features = [];
        if (!(multiPolygon instanceof Array)) {
            multiPolygon = [multiPolygon];
        }
        for (var i = 0, li = multiPolygon.length; i < li; i++) {
            if (multiPolygon[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.MultiPolygon' ||
                    multiPolygon[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.Collection') {
                for (var j = 0, lj = multiPolygon[i].geometry.components.length; j < lj; j++) {
                    features.push(new OpenLayers.Feature.Vector(
                            multiPolygon[i].geometry.components[j]
                    ));
                }
            } else if (multiPolygon[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
                features.push(new OpenLayers.Feature.Vector(multiPolygon[i].geometry));
            }
        }
        return features;
    },

    toMultiPolygon: function (features) {
        var components = [];
        for (var i = 0, l = features.length; i < l; i++) {
            if (features[i].geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
                components.push(features[i].geometry);
            }
        }
        return new OpenLayers.Geometry.MultiPolygon(components);
    },

    startWaiting: function (panel_div) {
        OpenLayers.Element.addClass(panel_div, 'olEditorWaiting');
        OpenLayers.Element.addClass(this.map.div, 'olEditorWaiting');
        this.waitingDiv = panel_div;
    },

    stopWaiting: function () {
        OpenLayers.Element.removeClass(this.waitingDiv, 'olEditorWaiting');
        OpenLayers.Element.removeClass(this.map.div, 'olEditorWaiting');
    },

    isArray: function(o) {    	
	     return Object.prototype.toString.call(o) == '[object Array]';
	},
	
	getControlById:function(control){
		for(var ctrl in this.controls){
			if(ctrl == control){
				return this.controls[ctrl];
				break;
			}
    	}
	},
	
	deActivateAllEditControls: function(){
		for(var ctrl in this.controls){
    		c = this.controls[ctrl];
            c.deactivate();
    	}
	},
	
    activateControls: function (control_list){

    	map.deActiveAllControls();
    	
    	if(this.isArray(control_list)){
    		
    		for(var j = 0 ; j < control_list.length ; j++) {
    			var control = this.controls[control_list[j]];
    			
	            if (control.type == OpenLayers.Control.TYPE_BUTTON) {
	                control.trigger();
	                return;
	            }
	            
	            if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
	                if (control.active) {
	                    control.deactivate();
	                } else {
	                    control.activate();
	                }
	                return;
	            }
	            
	            if (this.allowDepress && control.active) {
	                control.deactivate();
	            } else {
	            	
	                var c;
	                for(var ctrl in this.controls){
                		c = this.controls[ctrl];
                		if (c != control && control_list.indexOf(c.id) == -1 ) {
 		                        c.deactivate();
 		                }
                	}
	               
	                control.activate();
	            }
    		}
            
    	}else{
    		var control = this.getControl(control_list);
    		
    		if (!this.active) { return false; }
            if (control.type == OpenLayers.Control.TYPE_BUTTON) {
                control.trigger();
                return;
            }
            
            if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
                if (control.active) {
                    control.deactivate();
                } else {
                    control.activate();
                }
                return;
            }
            
            if (this.allowDepress && control.active) {
                control.deactivate();
            } else {
            	
                var c;
                var c;
                for(var ctrl in this.controls){
            		c = this.controls[ctrl];
            		if (c != control && control_list.indexOf(c.id) == -1 ) {
		                        c.deactivate();
		                }
            	}
               
                control.activate();
            }
    	}
    },

    //=============================================================
    // 2017.03 추가
    //============================================================= 
    fn_draw_oneFeatureBorder : function(_oFeature, _styleName){
    	this.effectLayer.removeAllFeatures();

    	if(!_styleName)
     	   _styleName = 'borderpoint';

    	this.drawBorder(_oFeature, _styleName);
    	//console.log(_oFeature.geometry.components[0].x + ","+ _oFeature.geometry.components[0].y);
    },
    
    fn_proc_modifiedFeature : function(_oGInnerFeature, _sLayerName, _sG2Id ){
    	var sFId = _sLayerName.concat(".",_sG2Id);
    	
    	// 편집하는 feature의 위치 속성 자동 갱신(행정동/법정동/도엽번호)
    	NUTs.EditRule.CheckRelationLocValueSync(_oGInnerFeature);
    	
    	this.fn_check_SpatialValueChange(_oGInnerFeature, _sLayerName, _sG2Id);
    	
    	// 이동 전 위치의 feature를 각 레이어에서 제거 후, 이동 후 위치에서 새로 생성/추가 후 다시 그림 - ehyun.
    	var oEditFeature = this.getFeatureByFid(this.editLayer, sFId);
    	if(oEditFeature){
    		this.editLayer.destroyFeatures(oEditFeature, {silent: true});
    		this.addDrawFeature(this.editLayer, _oGInnerFeature, 'select');
    	}
    	
    	var oStyleFeature = this.getFeatureByFid(this.styleLayer, sFId);
    	if(oStyleFeature){
    		this.styleLayer.destroyFeatures(oStyleFeature, {silent: true}); 
    		var oStyleGFeature = this.createFeature(_oGInnerFeature, sFId);
    		this.addDrawFeature(this.styleLayer, oStyleGFeature, _sLayerName);
    	}
    	
    	/*var oSearchFeature = this.getFeatureByFid(this.searchLayer, sFId);
    	if(oSearchFeature)
    		this.searchLayer.destroyFeatures(oSearchFeature, {silent: true});*/
    	
    	this.effectLayer.removeAllFeatures();

        if(this.getGeometryType(_oGInnerFeature) !== 'point')
        	this.fn_draw_oneFeatureBorder(_oGInnerFeature,'selectpoint');
    },
    
    fn_get_fidByFeature : function(_oFeature){
    	var sFId;

        if(_oFeature.fid)
        	sFId = _oFeature.fid;
        else if(_oFeature.attributes.fid)
        	sFId = _oFeature.attributes.fid;
        else
        	sFId = '';

        return sFId;
    },
    
    fn_get_tblNameByFeature : function(_oFeature){
    	var aFIdInfo, sTblName;

        if(_oFeature.fid)
        	aFIdInfo = _oFeature.fid.split(".");
        else if(_oFeature.attributes.fid)
        	aFIdInfo = _oFeature.attributes.fid.split(".");
        else
        	aFIdInfo = '';
        
        aFIdInfo.length === 2 ? sTblName = aFIdInfo[0].toUpperCase() : sTblName = aFIdInfo;
        
        //ggash 201701189 for geoserver - GeoServer는 fid 부여방식이 [급수관로.1234] 방식임 .. 변경 검토 필요
        if(NUTs.Util.isHangul(sTblName) && _oFeature.layer && _oFeature.layer.name){
        	sTblName = _oFeature.layer.name;
        }
        
        return sTblName;
    },
    
    fn_get_g2idByFeature : function(_oFeature){
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
    },
    
    fn_remove_snapPopup : function(){
    	if(this.map.popups.length > 0) {
    		for(var i = 0, popLen = this.map.popups.length; i < popLen; i++) {
    			if(this.map.popups[i].type == 'snapInfo') {
    				this.map.removePopup(map.popups[i]);
    				break;
    			}
    		}
    	}
    },
    
    fn_get_searchFeatureStyle : function(_oGInnerFeature){
    	var oStyle = null;
    	var sSearchLayer = this.fn_get_tblNameByFeature(_oGInnerFeature);
    	var sSearchLayerStyle = this.searchLayer.styleMap.styles[sSearchLayer.toLowerCase()];
    	if(sSearchLayerStyle) { 
        	try {
        		oStyle = sSearchLayerStyle.defaultStyle;
        	} catch (e) {
        	}	
    	}
    	else{
    		oStyle = NUTs.EditStyle.getStyleMapSearchLayer().styles["default"];
    	}
    	
    	return oStyle;
    },
    
    fn_get_editFeatureStyle : function(_oGInnerFeature){
    	var oStyle = null;
    	var sEditLayer = this.fn_get_tblNameByFeature(_oGInnerFeature);
    	var sG2Id = this.fn_get_g2idByFeature(_oGInnerFeature);
    	
		var sEditLayerStyle = this.editLayer.styleMap.styles[sEditLayer.toLowerCase()];
		if(!sEditLayerStyle)
			sEditLayerStyle = this.editLayer.styleMap.styles["default"];
		oStyle = sEditLayerStyle.defaultStyle;
    	
		if(!oStyle)
			oStyle = NUTs.EditStyle.getStyleMapEditLayer().styles["default"];
	 

    	return oStyle;
    },
    
    fn_get_newG2Id : function (){
   	 var dNow = new Date();
        return sG2Id = dNow.getTime() + parseInt(Math.random()*1000);
    },
    
    fn_create_featureByXY : function (_sLayer, _sCoordX, _sCoordY, _bMoveState){

    	var sType = "Point";
    	var sG2Id = this.fn_get_newG2Id();
    	var oFeatureExtent = new NUTs.Bounds(_sCoordX, _sCoordY, _sCoordX, _sCoordY);

    	var aPosList = [];
    	var oFeature = {
    			x : _sCoordX,
    			y : _sCoordY,
    			bounds : oFeatureExtent,
    			CLASS_NAME : ''.concat('OpenLayers.Geometry.' + sType)
    	};
    	aPosList.push(oFeature);

    	var oGInnerFeature = this.makeFeatureByPosList(sType, aPosList, _sLayer.concat('.', sG2Id));

    	this.addDrawFeature(this.editLayer, oGInnerFeature, _sLayer);

    	if(_bMoveState)
    		map.zoomToExtent(oFeatureExtent);

    	this.fn_add_featureToEditMonitor(oGInnerFeature, _sLayer, sG2Id);
    	return _sLayer +'.'+sG2Id;
    },
    
    fn_check_SpatialValueChange : function (_oFeature, _sTblName, _sG2Id){
		var oEmJsonFeatureObj = this.editingFeatures[_sTblName][_sG2Id];

		_sG2Id = String(_sG2Id);

		if(this.editingFeatures[_sTblName] && oEmJsonFeatureObj){
			
			oEmJsonFeatureObj.posList = this.getPosListByGeometry(_oFeature.geometry);
			oEmJsonFeatureObj.bounds = this.getBoundsByGeometry(_oFeature.geometry);
			oEmJsonFeatureObj.flgChange = 1;

		} 
    },
    getBoundsByGeometry: function(_oGeometry){
    	var oBounds = new NUTs.Bounds();
    	var bSupportGetBounds = false;

    	if(_oGeometry.components){
    		var oCompObj = _oGeometry.components;
    		if (oCompObj) {
    			if(oCompObj[0].getBounds)
    				bSupportGetBounds = true;

    		    for (var i = 0, nLen = oCompObj.length; i < nLen; i++) {
    		    	if(bSupportGetBounds)
    		    		oBounds.extend(oCompObj[i].getBounds());
    		    	else
    		    		oBounds.extend(this.getBoundsByPoint(oCompObj[i]));
    		    }
    		}
    	}
    	else if(_oGeometry){

    		oBounds = this.getBoundsByPoint(_oGeometry);
    	}

    	return oBounds;
    },

    getBoundsByPoint: function(_oGeometry){
    	return new NUTs.Bounds(_oGeometry.x,_oGeometry.y,_oGeometry.x,_oGeometry.y);
    },

    /**
     * @description 신규추가된 feature의 geometry로부터 bounds  구하기
     * @param   {Object} _oGeometry
     * @returns {Object} new NUTs.Bounds
     * */
    getBoundsByNewGeometry: function(_oGeometry){

    	if(_oGeometry.bounds){
    		return _oGeometry.bounds;
    	}
    	else{
    		var nLeft 	= 0;
    		var nRight 	= 0;
    		var nBottom 	= 0;
    		var nTop 	= 0;
    		var sGeomType = this.getGeomType(_oGeometry);

    		nLeft 	= OpenLayers.Util.toFloat(nLeft);
    		nRight 	= OpenLayers.Util.toFloat(nRight);
    		nBottom = OpenLayers.Util.toFloat(nBottom);
    		nTop 	= OpenLayers.Util.toFloat(nTop);

    		var oBounds = new NUTs.Bounds();
    		var oComponents = _oGeometry.components;

    		if (oComponents) {
    			//POINT
    			if(sGeomType === "Point")  {
    				nLeft 		= oComponents[i].x;
    				nRight 		= oComponents[i].x;
    				nBottom 	= oComponents[i].y;
    				nTop 		= oComponents[i].y;
    			}
    			else if(sGeomType === "MultiPolygon")  {

    				for(var i=0, nLen = oComponents.length ;i < nLen; i++){

        				var oComponent = oComponents[i];
        				var oFeatureComponents = oComponent.components[0].components;
        				
            			for(var k=0, nSubLen = oFeatureComponents.length ;k < nSubLen; k++){

            				var oSubComponent = oFeatureComponents[k];

            				if(i === 0 && k === 0) {
            					if(nLeft === 0)
            			    		nLeft 	= oSubComponent.x;
            		   	 		if(nRight === 0)
            		   	 			nRight 	= oSubComponent.x;
            		    		if(nBottom === 0)
            		    			nBottom = oSubComponent.y;
            		    		if(nTop === 0)
            		    			nTop 	= oSubComponent.y;
            				}
            				else {

                				if(nLeft > oSubComponent.x)
            		    			nLeft 	= oSubComponent.x;

            		        	if(nRight < oSubComponent.x)
            		        		nRight 	= oSubComponent.x;

            		        	if(nBottom > oSubComponent.y)
            		        		nBottom = oSubComponent.y;

            		        	if(nTop < oSubComponent.y)
            		        		nTop 	= oSubComponent.y;

            				}
            			}
        			}
    			}
    			else if(sGeomType === "Polygon")  {

    				for(var i=0, nLen = oComponents.length ;i < nLen; i++){

        				var oComponent = oComponents[i];

            			for(var k=0, nSubLen = oComponent.components.length ;k < nSubLen; k++){

            				var oSubComponent = oComponent.components[k];

            				if(i === 0 && k === 0) {
            					if(nLeft === 0)
            			    		nLeft 	= oSubComponent.x;
            		   	 		if(nRight === 0)
            		   	 			nRight 	= oSubComponent.x;
            		    		if(nBottom === 0)
            		    			nBottom = oSubComponent.y;
            		    		if(nTop === 0)
            		    			nTop 	= oSubComponent.y;
            				}
            				else {

                				if(nLeft > oSubComponent.x)
            		    			nLeft 	= oSubComponent.x;

            		        	if(nRight < oSubComponent.x)
            		        		nRight 	= oSubComponent.x;

            		        	if(nBottom > oSubComponent.y)
            		        		nBottom = oSubComponent.y;

            		        	if(nTop < oSubComponent.y)
            		        		nTop 	= oSubComponent.y;

            				}
            			}
        			}
    			}
    			else if(sGeomType === "LineString")  {
    			    for (var i = 0, nLen = oComponents.length; i < nLen; i++) {
    			    	if(nLeft === 0)
    			    		nLeft 	= oComponents[i].x;
    		   	 		if(nRight === 0)
    		   	 			nRight 	= oComponents[i].x;
    		    		if(nBottom === 0)
    		    			nBottom = oComponents[i].y;
    		    		if(nTop === 0)
    		    			nTop 	= oComponents[i].y;


    		    		if(nLeft > oComponents[i].x)
    		    			nLeft 	= oComponents[i].x;

    		        	if(nRight < oComponents[i].x)
    		        		nRight 	= oComponents[i].x;

    		        	if(nBottom > oComponents[i].y)
    		        		nBottom = oComponents[i].y;

    		        	if(nTop < oComponents[i].y)
    		        		nTop 	= oComponents[i].y;
    		    	}
    			}
    			oBounds = new NUTs.Bounds(nLeft, nBottom, nRight, nTop);
			}
			else if(_oGeometry){
				oBounds = new NUTs.Bounds(_oGeometry.x,_oGeometry.y,_oGeometry.x,_oGeometry.y);
			}
			return oBounds;
		}

    },

    getPosListByGeometry: function(_oGeometry){

    	//var aMultiPosList = []; 멀티 Geometry타입처리 시 주석해제 - 구조는 최종확인 필요
    	var aPosList = [];
    	var oCoords = {};
    	var sGeomType = this.getGeomType(_oGeometry);

    	if(sGeomType === "MultiPolygon") {
    		
    		var aMultiPosList = [];
    		var aSubPosList = [];
    		var oComponents = _oGeometry.components;
    		
    		if(oComponents.length > 0) {
    			
    			//feature수 만큼 반복
    			for(var i=0, nLen = oComponents.length ;i < nLen; i++){
    			
    				var oGeometry = oComponents[i]; 
    				var aSubPosList = this.getPosListByGeometry(oGeometry);
    				
    				aMultiPosList.push(aSubPosList);
    			}
    			aPosList = aMultiPosList;
    		}
    	}
    	else if(sGeomType === "Polygon") {

    		var oComponents = _oGeometry.components;

    		if(oComponents.length > 0) {

    			for(var j=0, nLen = oComponents.length ;j < nLen; j++){

    				var oComponent = oComponents[j];

        			for(var k=0, nSubLen = oComponent.components.length ;k < nSubLen; k++){

        				var oSubComponent = oComponent.components[k];

        				oCoords = {};

	    				oCoords.x = oSubComponent.x;
	    				oCoords.y = oSubComponent.y;

	    				aPosList.push(oCoords);
        			}
        			//aMultiPosList.push(aPosList); //멀티 Geometry타입처리 시 주석해제 - 구조는 최종확인 필요

    			}
    		}

    	}
    	else if(sGeomType === "LineString"){
    		if(_oGeometry.components[0].components) {
    			var aComponents = _oGeometry.components;
    			for(var i=0;i<aComponents.length;i++) {
    				var oComponents = _oGeometry.components[i].components;
    				for(var j=0, nLen = oComponents.length ;j < nLen; j++){
        				oCoords = {};

        				oCoords.x = oComponents[j].x;
        				oCoords.y = oComponents[j].y;

        				aPosList.push(oCoords);
        			}
    			}
    		} else {
    			var oComponents = _oGeometry.components;
        		if(oComponents.length > 0) {

        			for(var j=0, nLen = oComponents.length ;j < nLen; j++){
        				oCoords = {};

        				oCoords.x = oComponents[j].x;
        				oCoords.y = oComponents[j].y;

        				aPosList.push(oCoords);
        			}
        		}
    		}
    	}
    	else if(sGeomType === "Point"){
    		oCoords.x = _oGeometry.x;
    		oCoords.y = _oGeometry.y;
    		aPosList.push(oCoords);
    	}

    	return aPosList;
    },

    getBoundPosListByFeature: function(_oFeature){

    	var _oGeometry = _oFeature.geometry;
    	var aPosList = [];

    	if(!_oGeometry.bounds)
    		_oFeature.geometry.bounds = this.getBoundsByGeometry(_oGeometry);

		var oPoints = new OpenLayers.Geometry.Point(_oGeometry.bounds.left, _oGeometry.bounds.bottom);
		aPosList.push(oPoints);
		var oPoints = new OpenLayers.Geometry.Point(_oGeometry.bounds.right, _oGeometry.bounds.bottom);
		aPosList.push(oPoints);
		var oPoints = new OpenLayers.Geometry.Point(_oGeometry.bounds.right, _oGeometry.bounds.top);
		aPosList.push(oPoints);
		var oPoints = new OpenLayers.Geometry.Point(_oGeometry.bounds.left, _oGeometry.bounds.top);
		aPosList.push(oPoints);

    	return aPosList;
    },
 
    getGeomType:function(geometry){

    	var type;
    	var geomId = geometry.id ? geometry.id.toUpperCase() : geometry.CLASS_NAME.toUpperCase();

    	if(geomId) {
    		if(geomId.lastIndexOf('MULTIPOLYGON') > -1){
        		type = 'MultiPolygon';
        	}
        	else if(geomId.lastIndexOf('POLYGON') > -1){
        		type = 'Polygon';
        	}
        	else if(geomId.lastIndexOf('MULTILINESTRING') > -1){
        		type = 'MultiLineString';
        	}
        	else if(geomId.lastIndexOf('LINESTRING') > -1){
        		type = 'LineString';
        	}
        	else if(geomId.lastIndexOf('POINT') > -1){
        		type = 'Point';
        	}
    	}

    	return type;
    },
    
    
    CLASS_NAME: 'NUTs.Edit.Editor'
});