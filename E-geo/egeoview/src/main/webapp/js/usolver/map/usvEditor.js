/****************************************************************
 *
 * 파일명 : usvEditor
 * 설  명 : GEdit 커스터마이징 JavaScript
 *          GEdit 버전업을 위한 별도 구성
 ****************************************************************
 *
 *    수정일      수정자     Version        Function 명
 * ------------    ---------   -------------  ----------------------------
 * 2016.03.21      최재훈       1.0             최초생성
 */

usvEditor = OpenLayers.Class(NUTs.Edit.Editor,{


	/**
     * Property: map
     * {<OpenLayers.Map>} this gets set in the constructor.
     */
    //map: null,

    /**
     * Property: id
     * {String} Unique identifier for the Editor.
     */
    //id: null,

    /**
     * Property: editingFeatures
     * {Object} 편집중인 feature정보
    */
	editingFeatures : null,

	/**
     * Property: selectedG2id
     * {Object} 선택된 Feature의 G2ID
    */
	selectedG2Id : null,

	/**
     * Property: selectedFeatures
     * {Array} 선택된 Feature 목록
    */
	selectedFeatures : [],

    /**
     * Property: editLayer
     * {<OpenLayers.Layer.Vector>} 현재 편집진행중인 feature workspace.
     */
    //editLayer: null,

    /**
     * Property: aEditLayers
     * {Array} 현재 편집진행중인 벡터레이어 id 목록. (초기화 시 feature 삭제 제외 대상 벡터레이어 목록)
     */
    aEditLayers: ['editVectorLayer','styleVectorLayer','refVectorLayer','effectVectorLayer'],

    /**
     * Property: aSearchTargetLayers
     * {Array} 검색 시 대상 레이어 목록
     */
    aSearchTargetLayers: null,

    /**
     * Property: styleLayer
     * {<OpenLayers.Layer.Vector>} 편집모니터에 등록된 (편집중이지만 commit되지 않은) feature workspace.
     */
    styleLayer: null,

    /**
     * Property: searchLayer
     * {<OpenLayers.Layer.Vector>} 검색결과 개체 workspace.
     */
    searchLayer: null,

    /**
     * Property: refLayer
     * {<OpenLayers.Layer.Vector>} 참조선, 참조점, 참조반경 workspace.
     */
    refLayer: null,

    /**
     * Property: refLayer
     * {<OpenLayers.Layer.Vector>} 로딩된 shape파일 workspace.
     */
    dxfLayer: null,

    /**
     * Property: effectLayer
     * {<OpenLayers.Layer.Vector>} 다양한 효과를 표현하기위한 레이어 workspace.
     */
    effectLayer: null,

    /**
     * Property: preEditedLayer
     * {String} 이전 편집 레이어 이름
     */
    preEditedLayerName: null,

    /**
     * Property: preMidSaveRes
     * {String} 이전 중간저장개체 추출결과
     */
    preMidSaveRes: null,
    
    /**
     * Propert: oSearchResult
     * {Object} 검색 결과
     */
    oSearchResult: null,

    /**
     * Property: layerColumnInfo
     * {String} 레이어별 컬럼정보 (name, alias, initValue..etc)
     */
    layerColumnInfo: {},

    /**
     * Property: layerSnapInfo
     * {String} 레이어별 스냅정보 (line,vertex,end  스냅여부)
     */
    layerSnapInfo: {},

    /**
     * Property: layerColumnInfo
     * {String} 편집레이어의 참조레이어 중 (주석 제외)WMS로 표출하는 레이어목록
     * 편집레이어:급수전계량기, 참조레이어:상수관로 인 경우 ADD됨
     */
    arrRefWmsLayer: [],

    /**
     * Property: layerColumnInfo
     * {String} 편집레이어의 참조레이어 중 (주석 포함)WMS로 표출하는 레이어목록
     * 편집레이어:급수관로, 참조레이어:상수관로 인 경우 인접 Rule체크를 위해 WFS(벡터)레이어로 표출해야하나 라벨은 WMS로...그려야 하는 경우 ADD됨
     * 이전 편집레이어는 급수전계량기, 참조레이어중 '상수관로'는 WMS로 그리게 됨.
     * 이때 편집레이어를 가로등으로 변경시...이전 참조레이어중 WFS는 초기화를 하나 WMS(상수관로)는초기화 하지 않아 계속 보이는문제가 있음. 이때 삭제하기 위한 기준레이어 목록으로 사용됨.
     */
    arrRefExpWmsLayer: [],

	/**
     * Property: resultFeature
     * {Array} 병합된 feature
    */
	mergedFeature : {},

	/**
     * Property: orgFeature1
     * {Array} 병합전 feature1
    */
	orgFeature1 : {},
	/**
     * Property: orgFeature2
     * {Array} 병합전 feature2
    */
	orgFeature2 : {},

    /**
     * Property: arrCopiedG2Id
     * {String} 복제된 feature G2ID 목록
     */
    arrCopiedG2Id: [],

    /**
     * Property: layerColumnInfo
     * {Object} 복제된 컬럼정보
     */
    copiedField: {},

    /**
     * Property: preValue
     * {String} 편집이 이루어지기 전 속성정보 (속성변경 여부 파악용)
     */
    preValue: null,

    /**
     * Property: editorPanel
     * {<OpenLayers.Editor.Control.EditorPanel>} Contains icons for active controls
     *     and gets set by startEditMode() and unset by stopEditMode().
     */
    //editorPanel: null,

    /**
     * Property: editMode
     * {Boolean} The editor is active.
     */
    //editMode: false,

    /**
     * Property: copyMode
     * {Boolean} The copywork is active.
     */
    copyMode: false,

    /**
     * Property: dialog
     * {<OpenLayers.Editor.Control.Dialog>} ...
     */
    //dialog: null,

    /**
     * Property: status
     * {function(string, string)} Function to display states, receives status type and message
     */
    //showStatus: function (status, message) {
    //    if (status === 'error') {
    //        alert(message);
    //    }
    //},

    /**
     * Property: activeControls
     * {Array} ...
     */
    //activeControls: [],

    /**
     * Property: editorControls
     * {Array} Contains names of all available editor controls. In particular
     *   this information is needed by this EditorPanel.
     */
    editorControls: ['CleanFeature', 'DeleteFeature', 'DeleteAllFeatures', 'Dialog', 'DrawRegular', 'DrawText', 'EditorPanel', 'ImportFeature','MergeFeature', 'SplitFeature', 'CADTools', 'TransformFeature', 'ContextMenu'],

    /**
     * Geometry types available for editing
     * {Array}
     */
    featureTypes: ['text', 'point', 'linestring', 'polygon', 'multilinestring', 'multipolygon', 'regular'],

    /**
     * Property: sourceLayers
     * {Array} ...
     */
    //sourceLayers: [],

    /**
     * Property: parameters
     * {Object} ...
     */
    //params: {},

    //geoJSON: new OpenLayers.Format.GeoJSON(),

    /**
     * Property: options
     * {Object} ...
     */
    //options: {},

    /**
     * Property: URL of processing service.
     * {String}
     */
    //oleUrl: '',

    /**
     * Instantiated controls
     * {Objects}
     */
    //controls: {},

    /**
     * Property: undoRedoActive
     * {Boolean} Indicates if the UndoRedo control is active. Only read on
     *     initialization right now. Default is true.
     */
    //undoRedoActive: true,
    /**
     * APIProperty: box
     * {<OpenLayers.Feature.Vector>} The transformation box rectangle.
     *     Read-only.
     */
    box: null,
    /**
     * APIProperty: handles
     * {<OpenLayers.Feature.Vector>} The transformation box rectangle.
     *     Read-only.
     */
    handles:null,

    renderIntent:'border',

    editState : {
    	'insert' : 1,
    	'modify' : 2,
    	'delete' : 4,
    	'pseudo' : 0
    },

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

        this.initEditingFeatureObj();

        /**
         * 벡터레이어 스타일맵 지정
         * */
        if (options.editStyleMap) {
            this.editLayer.styleMap = options.editStyleMap;
        } else {
            this.editLayer.styleMap = this.getStyleMapStyleLayer();
        }

        this.editLayer.styleMap = options.editStyleMap ||  this.getStyleMapStyleLayer();

        this.refLayer.styleMap = options.refStyleMap ||  this.getStyleMapRefLayer();

        this.styleLayer.styleMap = options.styleStyleMap ||  this.getStyleMapStyleLayer();

        this.effectLayer.styleMap = options.effectStyleMap ||  this.getStyleMapEffectLayer();

        this.searchLayer.styleMap = options.searchStyleMap ||  this.getStyleMapSearchLayer();

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
        this.map.addLayer(this.effectLayer);
        this.map.addLayer(this.searchLayer);
        this.map.addControl(new OpenLayers.Editor.Control.LayerSettings(this));

        if (this.undoRedoActive) {
            this.map.addControl(new OpenLayers.Editor.Control.UndoRedo(this.editLayer));
        }

        this.addEditorControls();

        return this;
    },

    addEditLayer: function(layerName) {
    	if(this.aEditLayers.indexOf(layerName) === -1)
    		this.aEditLayers.push(layerName);
    },

    /**
     * @method
     * @description json형태의 좌표목록을 이용 feature 변환 후 반환
     * @param {String} geomType - geometry타입 Point,LineString,Polygon 중 1
     * @param {Object} posList - 좌표목록
     * @param {String} featureId - 생성될 feature의 fid값
     * @returns	OpenLayers.Feature.Vector obj
     */
     makeFeatureByPosList: function(geomType, posList, featureId, data){

     	var olFeature = null;
     	var tmpGeometry = null;
     	var arrPosList = [];

     	if (typeof posList == 'string')
     		arrPosList = JSON.parse(posList);
     	if (typeof posList != 'object')
     		posList = JSON.parse(posList);

     	switch(geomType.toLowerCase()){
     		case "point" :
     			tmpGeometry = this.getGeometryByPoint(posList);
     			break;
     		case "linestring" :
     			tmpGeometry = this.getGeometryByLineString(posList);
     			break;
     		case "linearring" :
     			tmpGeometry = this.getGeometryByLinearRing(posList);
     			break;
     		case "polygon" :
     			tmpGeometry = this.getGeometryByPolygon(posList);
     			break;
     		case "multilinestring" :
     			tmpGeometry = this.getGeometryByMultiLineString(posList);
     			break;
     		case "multipolygon" :
     			tmpGeometry = this.getGeometryByMultiPolygon(posList);
     			break;
     	}
     	featureOpt = {
     		fid:String(featureId)
     	};
     	olFeature = new OpenLayers.Feature.Vector(tmpGeometry, featureOpt);
     	var oGInnerFeature = MAP_EDITOR.fn_convert_olFeatureTOoGInnerFeature(olFeature);
     	if(data)
     		oGInnerFeature.data = data;
    	return oGInnerFeature;
     },


	/**********************************************************************************
	 * 함수명 : createBox
	 * 설 명 : 경계선 draw
	 * 인 자 : _oFeature(경계를 그려낼 기준 feature)
	 * 작성일 : 2016.04.19
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.19			최재훈		최초 생성
	 *
	 **********************************************************************************/
    createBox:function(_oFeature){

    	var oTmpBounds = _oFeature.geometry.bounds;

    	var nLeft 	= oTmpBounds.left;
    	var nRight 	= oTmpBounds.right;
    	var nBottom = oTmpBounds.bottom;
    	var nTop 	= oTmpBounds.top;

    	var nHorizenCenter 	= (nLeft + nRight) / 2;
    	var nVerticalCenter = (nBottom + nTop) / 2;

    	this.box = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.LineString([
                    new OpenLayers.Geometry.Point(nLeft, nBottom),
                    new OpenLayers.Geometry.Point(nHorizenCenter, nBottom),
                    new OpenLayers.Geometry.Point(nRight, nBottom),
                    new OpenLayers.Geometry.Point(nLeft, nVerticalCenter),
                    new OpenLayers.Geometry.Point(nHorizenCenter, nVerticalCenter),
                    new OpenLayers.Geometry.Point(nRight, nVerticalCenter),
                    new OpenLayers.Geometry.Point(nLeft, nTop),
                    new OpenLayers.Geometry.Point(nHorizenCenter, nTop),
                    new OpenLayers.Geometry.Point(nRight, nTop)
                ]), null,
                typeof this.renderIntent == "string" ? null : this.renderIntent
            );

    	// Override for box move - make sure that the center gets updated
        this.box.geometry.move = function(x, y) {
            control._moving = true;
            OpenLayers.Geometry.LineString.prototype.move.apply(this, arguments);
            control.center.move(x, y);
            delete control._moving;
        };

        // Overrides for vertex move, resize and rotate - make sure that
        // handle and rotationHandle geometries are also moved, resized and
        // rotated.
        var vertexMoveFn = function(x, y) {
            OpenLayers.Geometry.Point.prototype.move.apply(this, arguments);
            this._rotationHandle && this._rotationHandle.geometry.move(x, y);
            this._handle.geometry.move(x, y);
        };
        var vertexResizeFn = function(scale, center, ratio) {
            OpenLayers.Geometry.Point.prototype.resize.apply(this, arguments);
            this._rotationHandle && this._rotationHandle.geometry.resize(
                scale, center, ratio);
            this._handle.geometry.resize(scale, center, ratio);
        };
        var vertexRotateFn = function(angle, center) {
            OpenLayers.Geometry.Point.prototype.rotate.apply(this, arguments);
            this._rotationHandle && this._rotationHandle.geometry.rotate(
                angle, center);
            this._handle.geometry.rotate(angle, center);
        };

        // Override for handle move - make sure that the box and other handles
        // are updated, and finally transform the feature.
        var handleMoveFn = function(x, y) {
            var oldX = this.x, oldY = this.y;
            OpenLayers.Geometry.Point.prototype.move.call(this, x, y);
            if(control._moving) {
                return;
            }
            var evt = control.dragControl.handlers.drag.evt;
            var preserveAspectRatio = !control._setfeature &&
                control.preserveAspectRatio;
            var reshape = !preserveAspectRatio && !(evt && evt.shiftKey);
            var oldGeom = new OpenLayers.Geometry.Point(oldX, oldY);
            var centerGeometry = control.center;
            this.rotate(-control.rotation, centerGeometry);
            oldGeom.rotate(-control.rotation, centerGeometry);
            var dx1 = this.x - centerGeometry.x;
            var dy1 = this.y - centerGeometry.y;
            var dx0 = dx1 - (this.x - oldGeom.x);
            var dy0 = dy1 - (this.y - oldGeom.y);
            if (control.irregular && !control._setfeature) {
               dx1 -= (this.x - oldGeom.x) / 2;
               dy1 -= (this.y - oldGeom.y) / 2;
            }
            this.x = oldX;
            this.y = oldY;
            var scale, ratio = 1;
            if(control.feature.geometry instanceof OpenLayers.Geometry.Point){
                scale = 1;
            } else {
                if (reshape) {
                    scale = Math.abs(dy0) < 0.00001 ? 1 : dy1 / dy0;
                    ratio = (Math.abs(dx0) < 0.00001 ? 1 : (dx1 / dx0)) / scale;
                } else {
                    var l0 = Math.sqrt((dx0 * dx0) + (dy0 * dy0));
                    var l1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
                    scale = l1 / l0;
                }
            }

            // rotate the box to 0 before resizing - saves us some
            // calculations and is inexpensive because we don't drawFeature.
            control._moving = true;
            control.box.geometry.rotate(-control.rotation, centerGeometry);
            delete control._moving;

            control.box.geometry.resize(scale, centerGeometry, ratio);
            control.box.geometry.rotate(control.rotation, centerGeometry);
            control.transformFeature({scale: scale, ratio: ratio});
            if (control.irregular && !control._setfeature) {
               var newCenter = centerGeometry.clone();
               newCenter.x += Math.abs(oldX - centerGeometry.x) < 0.00001 ? 0 : (this.x - oldX);
               newCenter.y += Math.abs(oldY - centerGeometry.y) < 0.00001 ? 0 : (this.y - oldY);
               control.box.geometry.move(this.x - oldX, this.y - oldY);
               control.transformFeature({center: newCenter});
            }
        };

    	 var handles = new Array(9);
         var geom, handle;
         var positions = ["sw", "s", "se", "e", "ne", "n", "nw", "w"];
         for(var i=0; i < 9; ++i) {
             geom = this.box.geometry.components[i];
             handle = new OpenLayers.Feature.Vector(geom.clone(), {
                 role: positions[i] + "-resize"
             }, typeof this.renderIntent == "string" ? null :
                 this.renderIntent);

             geom.move = vertexMoveFn;
             geom.resize = vertexResizeFn;
             geom.rotate = vertexRotateFn;
             handle.geometry.move = handleMoveFn;

             geom._handle = handle;
             handles[i] = handle;
         }

         this.handles = handles;

    },
	/**********************************************************************************
	 * 함수명 : drawBorder
	 * 설 명 : 경계선 draw
	 * 인 자 : _oFeature(경계를 그려낼 기준 feature)
	 * 작성일 : 2016.04.19
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.19			최재훈		최초 생성
	 *
	 **********************************************************************************/
    drawBorder: function(_oFeature, _styleName){
    	 //테두리
        var oBorderPosList = this.getBoundPosListByFeature(_oFeature);
        var oLinearRing = new OpenLayers.Geometry.LinearRing(oBorderPosList);
        var oBorderFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([oLinearRing]));

       editor.addDrawFeature(editor.effectLayer, oBorderFeature, 'border', true);
       this.createBox(_oFeature);
       if(!_styleName)
    	   _styleName = 'borderpoint';
       this.drawHandles(_styleName);

    },

    drawHandles: function(_styleName) {
        var layer = this.effectLayer;
        for(var i=0; i<9; ++i) {
        	if(i != 4){
        		editor.addDrawFeature(editor.effectLayer, this.handles[i], _styleName, true);
        	}

        }
        map.setLayerIndex(this.effectLayer, map.layers.length-1);
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
    			else if(sGeomType === "MultiLineString")  {
    				for(var i=0, nLen = oComponents.length ;i < nLen; i++){

        				var oComponent = oComponents[i];
        				var oFeatureComponents = oComponent.components;
        				
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

    	debugger;
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
    	//★★★★★
    	else if(sGeomType === "MultiLineString") {
        		
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

    getGmlFeatureStr: function(_oFeature){
    	var sGml = null;
    	var oFormatter = new OpenLayers.Format.GML();
    	sGml = oFormatter.write(_oFeature);
    	return sGml;
    },

    getGmlFeatureObj: function(_oFeature){
    	var oFeature = null;
    	var oFormatter = new OpenLayers.Format.GML();
    	oFeature = oFormatter.read(_sGml);
    	return oFeature;
    },

    /**
     * @description [{"x":"101010", "y":"302302"}] 형태의 포인트 좌표 이용 Point geometry obj 변환 후 반환
     * @param  {Object} _oParamArr - point geometry로 만들 좌표 목록
     * */
    getGeometryByPoint: function(_oParamArr){
    	var oPointGeometry = {};
    	if (_oParamArr[0] instanceof Array)
    		oPointGeometry = new OpenLayers.Geometry.Point(_oParamArr[0][0], _oParamArr[0][1]);
    	else
    		oPointGeometry = new OpenLayers.Geometry.Point(_oParamArr[0].x, _oParamArr[0].y);

    	oPointGeometry.bounds = this.getBoundsByNewGeometry(oPointGeometry);
		return oPointGeometry;
    },

    /**
    * @description [{"x":"101010", "y":"302302"}] 형태의 포인트 좌표 이용 LineString geometry obj 변환 후 반환
    * @param {Object} _oParamArr - LineString geometry로 만들 좌표 목록
    * */
    getGeometryByLineString: function(_oParamArr){
    	var aPoints = [];
    	var oLineStringGeometry = {}
    	for(var i=0; i <_oParamArr.length; i++){
    		if (_oParamArr[i] instanceof Array)
    			aPoints.push(new OpenLayers.Geometry.Point(_oParamArr[i][0],_oParamArr[i][1]));
    		else
    			aPoints.push(new OpenLayers.Geometry.Point(_oParamArr[i].x,_oParamArr[i].y));
    	}
    	oLineStringGeometry = new OpenLayers.Geometry.LineString(aPoints);
    	oLineStringGeometry.bounds = this.getBoundsByNewGeometry(oLineStringGeometry);
		return oLineStringGeometry;
    },

    getGeometryByLinearRing: function(_oParamArr){
    	var aPoints = [];
    	var oLinearRingGeometry = {};

		for(var i=0; i <_oParamArr.length; i++){
			if (_oParamArr[i] instanceof Array)
				aPoints.push(new OpenLayers.Geometry.Point(_oParamArr[i][0],_oParamArr[i][1]));
			else
				aPoints.push(new OpenLayers.Geometry.Point(_oParamArr[i].x,_oParamArr[i].y));
		}
		oLinearRingGeometry =  new OpenLayers.Geometry.LinearRing(aPoints);
		oLinearRingGeometry.bounds = this.getBoundsByNewGeometry(oLinearRingGeometry);
		return oLinearRingGeometry;
    },

    /**
     * @description [{"x":"101010", "y":"302302"}] 형태의 포인트 좌표 이용 Polygon geometry obj 변환 후 반환
     * @param {Object} _oParamArr -  Polygon geometry로 만들 좌표 목록
     * */
    getGeometryByPolygon: function(_oParamArr){
    	var aPoints = [],
			oLinears = null;
    	var oPolygonGeometry = {};

		for(var i=0; i <_oParamArr.length; i++){
			if (_oParamArr[i] instanceof Array)
				aPoints.push(new OpenLayers.Geometry.Point(_oParamArr[i][0],_oParamArr[i][1]));
			else
				aPoints.push(new OpenLayers.Geometry.Point(_oParamArr[i].x,_oParamArr[i].y));
		}
		oLinears =  new OpenLayers.Geometry.LinearRing(aPoints);
		oPolygonGeometry = new OpenLayers.Geometry.Polygon(oLinears);
		oPolygonGeometry.bounds = this.getBoundsByNewGeometry(oPolygonGeometry);
		return oPolygonGeometry;
    },
    
    getGeometryByMultiLineString: function(_aParamArr){
    	
    	var oMultiLineGeometry = {};
    	var aMultiLineGeometry = [];
    	for(var i=0; i < _aParamArr.length; i++ ) {
    		
    		var  oParamArr = _aParamArr[i];
    		var aPoints = [], oLinears = null;
    		var oLineGeometry = {};
    	
    		for(var j=0; j <oParamArr.length; j++){
    			if (oParamArr[j] instanceof Array)
    				aPoints.push(new OpenLayers.Geometry.Point(oParamArr[j][0],oParamArr[j][1]));
    			else
    				aPoints.push(new OpenLayers.Geometry.Point(oParamArr[j].x,oParamArr[j].y));
    		}
    		oLinestring =  new OpenLayers.Geometry.LineString(aPoints); 
    		oLineGeometry = oLinestring;
    		oLineGeometry.bounds = this.getBoundsByNewGeometry(oLinestring);
    		aMultiLineGeometry.push(oLineGeometry);
    	} 
    	oMultiLineGeometry =  new OpenLayers.Geometry.MultiLineString(aMultiLineGeometry);
    	oMultiLineGeometry.bounds = this.getBoundsByNewGeometry(oMultiLineGeometry);
		
		return oMultiLineGeometry;
    },
    
    getGeometryByMultiPolygon: function(_aParamArr){
    	
    	var oMultiPolygonGeometry = {};
    	var aMultiPolygonGeometry = [];
    	for(var i=0; i < _aParamArr.length; i++ ) {
    		
    		var  oParamArr = _aParamArr[i];
    		var aPoints = [], oLinears = null;
    		var oPolygonGeometry = {};
    	
    		for(var j=0; j <oParamArr.length; j++){
    			if (oParamArr[j] instanceof Array)
    				aPoints.push(new OpenLayers.Geometry.Point(oParamArr[j][0],oParamArr[j][1]));
    			else
    				aPoints.push(new OpenLayers.Geometry.Point(oParamArr[j].x,oParamArr[j].y));
    		}
    		oLinears =  new OpenLayers.Geometry.LinearRing(aPoints);
    		oPolygonGeometry = new OpenLayers.Geometry.Polygon(oLinears);
    		oPolygonGeometry.bounds = this.getBoundsByNewGeometry(oPolygonGeometry);
    		aMultiPolygonGeometry.push(oPolygonGeometry);
    	} 
    	oMultiPolygonGeometry =  new OpenLayers.Geometry.MultiPolygon(aMultiPolygonGeometry);
    	oMultiPolygonGeometry.bounds = this.getBoundsByNewGeometry(oMultiPolygonGeometry);
		
		return oMultiPolygonGeometry;
    },
    
    getFeatureByFid: function(layer, featureFId){

    	var feature = layer.getFeatureByFid(featureFId);
    	if(feature)
    		return feature;
    	else{
    		feature = layer.getFeatureById(featureFId);
    		if(feature)
    			return feature;
    		else{
    			feature = layer.getFeaturesByAttribute("fid", featureFId);
        		if(feature.length > 0){ // Array가 리턴됨
        			return feature[0];
    			}
        		else
        			return false;
    		}
    	}

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
    removeFeatureOnMapLayer: function(layerName, g2Id){

    	var oMapLayer = map.getLayerByName(layerName);
    	if(oMapLayer){

    		var oFeature = editor.getFeatureByFid(oMapLayer, layerName + '.' +  g2Id);
    		if(oFeature)
    			oMapLayer.destroyFeatures(oFeature, null);

    	}

    },
    /**
     * 편집중인 feature 심볼스타일 초기화
     * 중간저장된 개체는 delete 스타일로 나머지는 제거
     */
    initAllEditFeatures: function(){

    	var aDelEditFeatures 	= [];
    	var aDelStyleFeatures 	= [];
    	//editLayer의feature는 보이지 않도록..
    	for(var i in editor.editLayer.features){
    		var oFeature 	= editor.editLayer.features[i];
    		var sTblName 	= MAP_EDITOR.fn_get_tblNameByFeature(oFeature);
    		var sG2Id 		= MAP_EDITOR.fn_get_g2idByFeature(oFeature);

    		if(sTblName && sG2Id) {
        		if(editor.editingFeatures[sTblName][sG2Id])//중간저장되어 관리되고있는 feature이면
        			editor.editLayer.drawFeature(oFeature, 'delete');
        		else
        			aDelEditFeatures.push(sTblName.concat(".",sG2Id));
    		}
    	};

    	//styleLayer 의 Feature는 해당 레이어의 편집중 스타일로
    	for(var j in editor.styleLayer.features){
			var oFeature = editor.styleLayer.features[j];
			var sTblName = MAP_EDITOR.fn_get_tblNameByFeature(oFeature);
    		var sG2Id 		= MAP_EDITOR.fn_get_g2idByFeature(oFeature);
    		if(sTblName && sG2Id ) {
	    		if(editor.editingFeatures[sTblName][sG2Id])//중간저장되어 관리되고있는 feature이면
	    			editor.styleLayer.drawFeature(oFeature, 'delete');
	    		else
	    			aDelStyleFeatures.push(sTblName.concat(".",sG2Id));
    		}
		};

		for(var sFid in aDelEditFeatures){
			var oTmpFeature = this.getFeatureByFid(editor.editLayer, aDelEditFeatures[sFid]);
			if(oTmpFeature)
				editor.editLayer.removeFeatures(oTmpFeature);
		}

		for(var sFid in aDelStyleFeatures){
			var oTmpFeature = this.getFeatureByFid(editor.styleLayer, aDelStyleFeatures[sFid]);
			if(oTmpFeature)
				editor.styleLayer.removeFeatures(oTmpFeature);
		}
		
		editor.effectLayer.removeAllFeatures();
    },
    /**
     * 편집레이어의 참조레이어 중 (주석 포함)WMS로 표출하는 레이어목록 추가
     */
    addRefExpWmsLayer: function(layerName){
    	if(this.arrRefExpWmsLayer.indexOf(layerName) === -1)
    		this.arrRefExpWmsLayer.push(layerName);
    },

    /**
     * 편집레이어의 참조레이어 중 (주석 포함)WMS로 표출하는 레이어목록 삭제
     */
    removeRefExpWmsLayer: function(layerName){
    	var nIdx = this.arrRefExpWmsLayer.indexOf(layerName);
    	this.arrRefExpWmsLayer.slice(nIdx,1);
    },

    /**
     * 속성변경 시 이전 속성값 보관
     */
    setPreValue: function(_obj){
    	this.preValue = _obj.value;
    },

    /**
     * 편집중인 feature 목록 초기화
     */
    initEditingFeatureObj: function(){
    	this.editingFeatures = {
        		LayerList : []
        }
    },

    createFeature: function(feature, fid){
    	var featurePosList, oGInnerFeature;
    	
    	var featureType = this.getFeatureType(feature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.',''));
    	//ggash 20170120 for geoserver --> 확인 필요 - GeoServer는 멀티구조가 아닌데도 멀티라인(하나짜리 Components)으로 한번더 감싸고 있음. 
    	/*if(featureType.toUpperCase() === "MULTILINESTRING") {
    		if(feature.geometry.components.length == 1){
    			feature.geometry = feature.geometry.components[0];
    			featureType = "linestring";
    		}
    	}*/
    	
		featurePosList = this.getPosListByGeometry(feature.geometry);
		oGInnerFeature = editor.makeFeatureByPosList(featureType, featurePosList, fid); 
    	

		return oGInnerFeature;
    },

    createGFeature: function(feature, fid){
    	var featureType = this.getFeatureType(feature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.',''));
		var featurePosList = this.getPosListByGeometry(feature.geometry);
		var oGInnerFeature = editor.makeFeatureByPosList(featureType, featurePosList, fid);

		var oGFeature = MAP_EDITOR.objFactory.Util.createGFeature();
		oGFeature.feature = oGInnerFeature;
		oGFeature.fields = feature.attributes;
		oGFeature.g2id = MAP_EDITOR.fn_g2idByFeature(feature);

		return oGFeature;
    },

    /**
     *  feature 추가후 지정된 스타일로 그리기
     */
    addDrawFeature: function(layer, feature, style, overlap){

    	var sFid = MAP_EDITOR.fn_get_fidByFeature(feature);
    	var oExistingFeature = this.getFeatureByFid(layer, sFid);
    	
    	if(oExistingFeature) {
    		layer.removeFeatures(oExistingFeature);
    	}
    	
    	layer.addFeatures(feature);
       	
    	if(layer === editor.searchLayer)
    		feature.style = MAP_EDITOR.fn_get_searchFeatureStyle(feature);
    	
    	if(layer == editor.editLayer)
    		map.setLayerIndex(editor.editLayer,map.layers.length-1);
    	
    	layer.drawFeature(feature, style.toLowerCase());

    },

    /**
     *  feature 추가후 보이지 않게 하기
     */
    addUnDrawFeature: function(layer, feature, style){

    	var sFid = MAP_EDITOR.fn_get_fidByFeature(feature);
    	var oExistingFeature = this.getFeatureByFid(layer, sFid);
    	if(!oExistingFeature) {
    		layer.addFeatures(feature);
    	}
    	layer.drawFeature(feature, 'delete');

    },
    /**
     * Enable or disable controls that depend on selected features.
     *
     * Requires an active SelectFeature control and the following context variables:
     * - editor: this
     * - layer: The layer with selected features.
     * - controls: An array of class names.
     */
    
    /* CJH.2016-10-25
     * selectionChanged: function () {
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
    },*/

    /**
     * Makes the toolbar appear and allows editing
     */
    startEditMode: function () {
        this.editMode = true;
        //this.editorPanel.activate();
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

                case 'DeleteVertex':
                    controls.push(new NUTs.Edit.Control.DeleteVertex(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
	                                    id: control,
	                                    title: OpenLayers.i18n('oleDeleteVertex'),
	                		    		eventListeners : {
	                		    			"vertexclicked" : function(evt) {
	                		    				editor.vertexClick(evt);
	                		    			}
	                		    		}
                                    }, editor.options.ModifyFeature)
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
                                    	id: control,
                                    	map: this.map,
                                    	tolerance: MAP_EDITOR.fn_get_snapDistance()
                                    	//,unit:sUnitMark
                                    }, editor.options.SnappingSettings)
                    ));
                    break;

                case 'DrawPoint':
                    controls.push(new NUTs.Edit.Control.DrawPoint(editor.editLayer,
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

                case 'DrawPolygon':
                    controls.push(new NUTs.Edit.Control.DrawPolygon(editor.editLayer,
                            OpenLayers.Util.extend(
                                    {
                                    	id: control
                                    }, editor.options.DrawPolygon)
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

                case 'DivideLine':
                    controls.push(new NUTs.Control.DrawFeature(editor.refLayer, NUTs.Handler.Path, {
    					id : 'DivideLine',
    					handlerOptions : {
    						attributes : {}
    					},
    		    		eventListeners : {
    		    			"featureadded" : function(evt) {
    		    				editor.divideLine(evt);
    		    			}
    		    		}
    				}));
                    break;


                case 'DividePolygon':
                    controls.push(new NUTs.Control.DrawFeature(editor.refLayer, NUTs.Handler.Path, {
    					id : 'DividePolygon',
    					handlerOptions : {
    						attributes : {}
    					},
    		    		eventListeners : {
    		    			"featureadded" : function(evt) {
    		    				editor.dividePolygon(evt);
    		    			}
    		    		}
    				}));
                    break;

                case 'SelectFeature':
                    controls.push(new NUTs.Control.SelectFeature(
                            editor.sourceLayers.concat([editor.editLayer]),
                            OpenLayers.Util.extend(
                                    {
                                    	id: control,
                                        title: OpenLayers.i18n('oleSelectFeature'),
                                        clickout: true,
                                        toggle: false,
                                        multiple: true,
                                        hover: false,
                                        toggleKey: "ctrlKey",
                                        multipleKey: "ctrlKey",
                                        box: true,
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
    vertexClick: function(evt){
    	//alert('vertexClick : '+ evt);

    	//console.log(event.type, event.feature.id);

        // change the color - sure !
        editor.editLayer.drawFeature(event.feature, "blink");

        // do more - popup to delete the vertex
        c = [];
        c.push("Selected feature id: ");
        c.push(vectors.selectedFeatures[0].id);
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
        	var ctrlModifyFeature = map.getControl("CustomModifyFeature");

        	ctrlModifyFeature.dragControl.feature = event.feature;
        	ctrlModifyFeature.handleKeypress({keyCode: 46});
        } else {
            // simply redraw the vertex back to its default style
        	editor.editLayer.drawFeature(event.feature, "select");
        }

    },
    /**
     * 참조선 추가 시 이미 추가했는 지 여부 체크하며 없을 경우 참조선의 거리를 NUTs.Popup으로 표출
     * */
    checkRefLineCount: function(_oEvt){
    	var nFeatureLen;
    	var nFeatureQty = this.refLayer.features.length;

    	if(nFeatureQty > 1){
    		COMMON.showMessage('편집오류 - 참조선입력 & 참조선은 1개까지만 입력 가능합니다.');
    		this.refLayer.removeFeatures(_oEvt.feature, null);
    		return false;
    	}
    	else {

    		nGeometryLen = this.refLayer.features[0].geometry.getLength();

    		if(this.map.popups.length > 0) {
    			if(this.map.popups[this.map.popups.length-1].type == 'refLine') {
    				this.map.removePopup(this.map.popups[this.map.popups.length-1]);
    			}
    		}

    		//point Feature를 나타낼 지도 좌표를 구함
    	    //var lonlat = this.map.getLonLatFromPixel(_oEvt.xy);
    		var oLonlat;
    		if(event.x && event.y)
    			oLonlat = this.map.getLonLatFromPixel(new OpenLayers.Pixel(window.event.x, window.event.y));
    		else{
    			var nPointLen = _oEvt.feature.geometry.components.length;
    			var oLastFeature = _oEvt.feature.geometry.components[nPointLen - 1];
    			oLonlat = new OpenLayers.LonLat(oLastFeature.x, oLastFeature.y);
    		}
    	    var nTotDist = parseInt(nGeometryLen);
    		var sContentHtml = "<div class='olControlMeasurePopup olControlMeasurePopupEnd'>총거리 : <span class='MeasureColor'>"+ nTotDist + "</san> m</div>";
    	    var oPopup = new NUTs.Popup("refLinePopup", oLonlat, null, sContentHtml, new OpenLayers.Pixel(3,3));
    	    this.map.addPopup(oPopup);
    		oPopup.type = 'refLine';
    		oPopup.updateSize();

    	}
    },
	/**********************************************************************************
	 * 함수명 : getDivideLine
	 * 설 명 : 선분할 처리 후 분할된 좌표목록 리턴
	 * 인 자 : _oStdComponents(분할처리할 대상 feature)
	 *  	 : _oUsrComp(사용자 입력 feature)
	 * 작성일 : 2016.04.07
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.07			최재훈		최초 생성
	 * 2016.08.18			최재훈		function으로 분리 
	 *
	 **********************************************************************************/
    getDivideLine : function(_oStdComponents, _oUsrComp){

		var aPosList1 = [];
		var aPosList2 = [];
		var nFindIdx = 0;
		var bCross = false;
		var oUserDrawGeom;
		
		var aDividedObj = [];
		
		if(_oUsrComp.length)
			oUserDrawGeom = NUTs.GeoJson.getGeoJson('LineString', _oUsrComp);
		else
			oUserDrawGeom = NUTs.GeoJson.getGeoJson('Point', _oUsrComp);
		
		for(var i = 0, nVertexCount = _oStdComponents.length ; i < nVertexCount ; i++){
			if(nVertexCount > i+1 ){

				var oCurComponents = this.getLineGeometryByObj(_oStdComponents, i);
				var oStdPerGeom = NUTs.GeoJson.getGeoJson('LineString', oCurComponents.components);
				var oCurCrossPoint = NUTs.JSTSOperator.Intersection(oStdPerGeom, oUserDrawGeom);

					if(oCurCrossPoint.coordinate){
						bCross = true;
						nFindIdx = i;
    				}

				if(!bCross){ //교차점을 아직 찾지 못한 경우
					aPosList1.push(oStdPerGeom.geometry.coordinates[0]);
				}else if(nFindIdx === i) { //교차점을 처음 찾은 경우

					var aTmpCrossPoint = [];
    				aTmpCrossPoint.push(oCurCrossPoint.coordinate.x, oCurCrossPoint.coordinate.y);

					aPosList1.push(oStdPerGeom.geometry.coordinates[0]);
					aPosList1.push(aTmpCrossPoint);

					aPosList2.push(aTmpCrossPoint);
					aPosList2.push(oStdPerGeom.geometry.coordinates[1]);

				}else {//교차점을 찾은 이후의 경우
					aPosList2.push(oStdPerGeom.geometry.coordinates[1]);
				}
			}
		}
		
		aDividedObj.push(aPosList1);
		aDividedObj.push(aPosList2);
		
		return aDividedObj;
	},
	
	/**********************************************************************************
	 * 함수명 : divideLine
	 * 설 명 : 선분할 처리
	 * 인 자 : _oEvt(사용자 입력 feature), _oStdFeature(분할 대상 feature)
	 * 작성일 : 2016.04.07
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.07			최재훈		최초 생성
	 *
	 **********************************************************************************/
    divideLine: function(_oEvt, _oStdFeature){

    	var nFeatureLen;
    	var nFeatureQty = this.refLayer.features.length;

    	if(nFeatureQty > 1 ){
    		COMMON.showMessage('편집오류 - 분할선입력 & 분할선은 1개까지만 입력 가능합니다.');
    		this.refLayer.removeFeatures(_oEvt.feature, null);
    		return false;
    	}
    	else if(nFeatureQty === 1 ){
    		var oStdOlFeatures = null, oStdGFeatures = null;
    		var oUsrFeature = _oEvt.feature;
    		
    		if(_oStdFeature){
    			var sFId = MAP_EDITOR.fn_get_fidByFeature(_oStdFeature);
    			oStdOlFeatures = [_oStdFeature];
        		oStdGFeatures = [MAP_EDITOR.fn_convert_olFeatureTOoGFeature(_oStdFeature, sFId, _oStdFeature.state)];
    		}
    		else{
    			oStdOlFeatures = SEARCH.fn_get_selectedOlFeatures();
        		oStdGFeatures = SEARCH.fn_get_selectedGFeatures();
    		}
    		
    		if(oStdOlFeatures.length !== 1 ){
        		COMMON.showMessage('편집오류 - 선 분할 & 선 분할은 1개의 feature가 선택되어야 합니다.');
        		return false;
        	}
    		var oStdFeature = oStdOlFeatures[0];
    		var oStdGFeature = oStdGFeatures[0];
    		var oStdComponents = oStdFeature.geometry.components;
    		var oUsrComp, oUserDrawGeom;
    		var oStdGeom = NUTs.GeoJson.getGeoJson('LineString', oStdComponents);
    		if(this.getGeometryType(oUsrFeature) === 'point'){
    			oUsrComp = oUsrFeature.geometry;
    			oUserDrawGeom = NUTs.GeoJson.getGeoJson('Point', oUsrComp);
    		}
    		else{
    			oUsrComp = oUsrFeature.geometry.components;
    			oUserDrawGeom = NUTs.GeoJson.getGeoJson('LineString', oUsrComp);    			
    		}
    		
			var aPosList1 = [];
			var aPosList2 = [];

			var oCrossPoint = NUTs.JSTSOperator.Intersection(oStdGeom, oUserDrawGeom);

			//분할 기준시설물과 사용자가 입력한 라인과 접점이 있을 경우
			if(oCrossPoint.coordinate || oCrossPoint.geometries ){

					var aDividedObj = this.getDivideLine(oStdComponents, oUsrComp);					
					
					aPosList1 = aDividedObj[0];
					aPosList2 = aDividedObj[1];
					
					var oGInnerFeature1, oGInnerFeature2;
					var sLayer = MAP_EDITOR.fn_get_tblNameByFeature(oStdFeature);
					oGInnerFeature1 = this.makeFeatureByPosList('LineString', aPosList1, sLayer.concat('.',MAP_EDITOR.fn_get_newG2Id()));
		    		oGInnerFeature2 = this.makeFeatureByPosList('LineString', aPosList2, sLayer.concat('.',MAP_EDITOR.fn_get_newG2Id()));					
		    		
		    		// 시설물 교차옵션 적용시, 분할된 객체를 연속해서 분할하는 경우가 존재하므로 WFS VectorLayer가 가지고 있는 속성(.data = feature의 fields임) 유지
		    		if(_oStdFeature && oStdFeature.data){		    			
		    			oGInnerFeature1.data = oStdFeature.data;
		    			oGInnerFeature2.data = oStdFeature.data;
		    		}
		    		
		    		editor.copyMode = true;
		    		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(oStdGFeature);

		    		MAP_EDITOR.fn_proc_divideLine(oStdGFeature, oGInnerFeature1, oGInnerFeature2);

		    		// 교차옵션 적용시에는 연속 입력이 가능해야 하므로, active 전환 수행하지 않도록.
		    		if(!_oStdFeature)
		    			map.activeControls("drag");
		    		oCurCrossPoint = null;

		    		editor.copyMode = false; //분할개체의 속성을 복제한 뒤 초기화
			}
			else{
				COMMON.showMessage('편집오류 - 분할선입력 &사용자 입력 분할선과 기준 feature와의 교차점이 없습니다!');	    		
	    		return false;
			}
			this.refLayer.removeFeatures(_oEvt.feature, null);

    	}
    	else{
    		COMMON.showMessage('편집오류 - 분할선입력 & 사용자 입력 분할선이 없습니다.');
    		return false;
    	}
    },
    /**********************************************************************************
	 * 함수명 : dividePolygon
	 * 설 명 : 면분할 처리
	 * 인 자 : _oEvt(사용자 입력 feature)
	 * 작성일 : 2016.05.03
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.05.03			최재훈		최초 생성
	 *
	 **********************************************************************************/
    dividePolygon: function(_oEvt){

    	var nFeatureLen;
    	var nFeatureQty = this.refLayer.features.length;

    	if(nFeatureQty > 1 ){
    		COMMON.showMessage('편집오류 - 분할선입력 & 분할선은 1개까지만 입력 가능합니다.');
    		this.refLayer.removeFeatures(_oEvt.feature, null);
    		return false;
    	}
    	else if(nFeatureQty === 1 ){
    		//var oStdFeature = this.selectedFeatures[0];
    		var oStdOlFeatures = SEARCH.fn_get_selectedOlFeatures();
    		var oStdGFeatures = SEARCH.fn_get_selectedGFeatures();

    		if(oStdGFeatures instanceof Array){
    			var oFields = oStdGFeatures[0].fields;
    			var sFid = oStdGFeatures[0].feature.attributes.fid;
    			oStdGFeatures = oStdGFeatures[0].feature;
    			oStdGFeatures.attributes = oFields;
    			oStdGFeatures.data = oFields;
    			oStdGFeatures.fid = sFid;
    		}

    		var oUsrFeature = this.refLayer.features[0];
    		
    		if(oStdOlFeatures.length !== 1 ){
        		COMMON.showMessage('편집오류 - 면 분할 & 면 분할은 1개의 feature가 선택되어야 합니다.');
        		return false;
        	}
    		
    		var oStdFeature = oStdOlFeatures[0];
			var newFeatures = []

	        var polygonizer = new jsts.operation.polygonize.Polygonizer();

			var oJstsFromWkt = new jsts.io.WKTReader();
	        var oWktFromOl = new OpenLayers.Format.WKT();
	        var oOlFromJsts = new jsts.io.OpenLayersParser();


	        var line = oJstsFromWkt.read(oWktFromOl.write(oUsrFeature));
	        var polygon = oJstsFromWkt.read(oWktFromOl.write(oStdFeature));
	        var union = polygon.getExteriorRing().union(line);

	        polygonizer.add(union);

	        var polygons = polygonizer.getPolygons();
	        for(var pIter = polygons.iterator(); pIter.hasNext();) {
	            var polygon = pIter.next();

	            var feature = new OpenLayers.Feature.Vector(oOlFromJsts.write(polygon), OpenLayers.Util.extend({}, oStdFeature.attributes));
	            feature.state = OpenLayers.State.INSERT;
	            newFeatures.push(feature);
	        }

	        if(newFeatures.length !== 2) {
	        	COMMON.showMessage('편집오류 - 분할선입력 &[면분할]은 2분할만 지원합니다. 다시 시도해주세요!');
	    		this.refLayer.removeFeatures(_oEvt.feature, null);
	    		return false;
	        }
	        else{
	        	var feature1 = newFeatures[0];
	        	var feature2 = newFeatures[1];

	        	if(!feature1.geometry.bounds){
	    			feature1.geometry.bounds = this.getBoundsByGeometry(feature1.geometry);
	    		}
	    		if(!feature2.geometry.bounds){
	    			feature2.geometry.bounds = this.getBoundsByGeometry(feature2.geometry);
	    		}

	    		feature1.fid = COMMON.fn_get_editingLayer().concat('.',MAP_EDITOR.fn_get_newG2Id());
	    		feature2.fid = COMMON.fn_get_editingLayer().concat('.',MAP_EDITOR.fn_get_newG2Id());

	    		editor.copyMode = true;
	    		editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(oStdGFeatures);

	    		MAP_EDITOR.fn_proc_dividePolygon(oStdGFeatures, feature1, feature2);

	    		map.activeControls("drag");

	    		oCurCrossPoint = null;
	    		editor.copyMode = false;//분할개체의 속성을 복제한 뒤 초기화

	        }
    	}
    	else{
    		COMMON.showMessage('편집오류 - 분할선입력 & 사용자 입력 분할선이 없습니다.');
    		return false;
    	}
    },

    flashFeature: function(_oFeature){

    	editor.effectLayer.drawFeature(_oFeature,'select');
    	window.setTimeout(function() {editor.effectLayer.removeFeatures(_oFeature)}, 100);

    },

    /**********************************************************************************
	 * 함수명 : mergeLine
	 * 설 명 : 선병합 처리
	 * 작성일 : 2016.04.12
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.12			최재훈		최초 생성
	 *
	 **********************************************************************************/
    mergeLine: function(){

    	//var oSelectedFeatures = this.selectedFeatures;
		var oSelectedOlFeatures = SEARCH.fn_get_selectedOlFeatures();
		var oSelectedGFeatures = SEARCH.fn_get_selectedGFeatures();
		
    	//var oSelectCtrl = map.getControl("SelectFeature");
    	var aMergePosList = [];

    	if(oSelectedOlFeatures.length !== 2 ){
    		COMMON.showMessage('편집오류 - 선 병합 & 선 병합은 2개의 feature가 선택되어야 합니다.');
    		//oSelectCtrl.unselectAll();
    		return false;
    	}
    	else {

    		var oFeature1 = oSelectedOlFeatures[0];
    		var oFeature2 = oSelectedOlFeatures[1];

    		var oComponents1 = oFeature1.geometry.components;
    		var oComponents2 = oFeature2.geometry.components;

    		aMergePosList = this.checkTouchEndLine(oComponents1, oComponents2);

    		if(aMergePosList.length !== 0){

    			var oGInnerFeature = this.makeFeatureByPosList('LineString', aMergePosList, COMMON.fn_get_editingLayer().concat('.',MAP_EDITOR.fn_get_newG2Id()));

    			//병합된 feature의 속성으로 사용할 기준feature 선택처리
        		var oLonlat;

    			var nPointLen = oGInnerFeature.geometry.components.length;
    			var oLastFeature = oGInnerFeature.geometry.components[nPointLen - 1];
    			oLonlat = new OpenLayers.LonLat(oLastFeature.x, oLastFeature.y);

        		var sG2Id  = MAP_EDITOR.fn_get_g2idByFeature(oGInnerFeature);
        		var sFeature1G2Id = MAP_EDITOR.fn_get_g2idByFeature(oFeature1);
        		var sFeature2G2Id = MAP_EDITOR.fn_get_g2idByFeature(oFeature2);

        		oFeature1.fid = COMMON.fn_get_editingLayer().concat(".",sFeature1G2Id);
        		oFeature2.fid = COMMON.fn_get_editingLayer().concat(".",sFeature2G2Id);

        		oFeature1.attributes = oSelectedGFeatures[0].fields
        		oFeature2.attributes = oSelectedGFeatures[1].fields
        		
        		this.mergedFeature = oGInnerFeature;
        		this.orgFeature1 = oFeature1;
        		this.orgFeature2 = oFeature2;

        		var aContentHtml = [];

        		aContentHtml.push('<div class="olControlMergeFeature">');
        		aContentHtml.push('<span class="popTitle">속성을 복제할 기준 feature를 <br />선택하세요</span>');
        		aContentHtml.push('[1] <span class="textover" onmouseover="MAP_EDITOR.fn_blink_featureByfId('+ sFeature1G2Id +');" >'+ sFeature1G2Id +'</span> &nbsp;&nbsp; <img src="/images/usolver/com/map/select.png" style="cursor:pointer" onclick="MAP_EDITOR.fn_proc_mergeFeature('+ sFeature1G2Id +',\'LineString\');"><br />');
        		aContentHtml.push('[2] <span class="textover"  onmouseover="MAP_EDITOR.fn_blink_featureByfId('+ sFeature2G2Id +');" >'+ sFeature2G2Id +'</span> &nbsp;&nbsp; <img src="/images/usolver/com/map/select.png" style="cursor:pointer" onclick="MAP_EDITOR.fn_proc_mergeFeature('+ sFeature2G2Id +',\'LineString\');"><br />');
        		aContentHtml.push('[3] 신규생성 &nbsp;&nbsp; <img src="/images/usolver/com/map/select.png" onclick="MAP_EDITOR.fn_proc_mergeFeature(null,\'LineString\');">');
        		aContentHtml.push('</div>');

        	    var oPopup = new NUTs.Popup("selectStdFeaturePopup", oLonlat, null, aContentHtml.join(''), new OpenLayers.Pixel(3,3));
        	    this.map.addPopup(oPopup);
        		oPopup.type = 'mergeFeature';
        		oPopup.updateSize();

        		var sLayer = COMMON.fn_get_editingLayer();

        	    editor.editLayer.drawFeature(oGInnerFeature, 'select');

	    		map.activeControls("drag");
    		}else {
    			COMMON.showMessage('편집오류 - 선 병햡 & 선 병합은 선택된 2개의 feature가 맞닿아 있어야 합니다.');
        		//oSelectCtrl.unselectAll();
        		return false;
    		}
    	}
    },

    /**********************************************************************************
	 * 함수명 : mergePolygon
	 * 설 명 : 선병합 처리
	 * 작성일 : 2016.05.04
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.05.04			최재훈		최초 생성
	 *
	 **********************************************************************************/
    mergePolygon: function(){

    	//var oSelectedFeatures = this.selectedFeatures;
		var oSelectedOlFeatures = SEARCH.fn_get_selectedOlFeatures();
		var oSelectedGFeatures = SEARCH.fn_get_selectedGFeatures();
    	var oSelectCtrl = map.getControl("SelectFeature");
    	var aMergePosList = [];

    	if(oSelectedOlFeatures.length !== 2 ){
    		COMMON.showMessage('편집오류 - 면 병햡 & 면 병합은 2개의 feature가 선택되어야 합니다.');
    		oSelectCtrl.unselectAll();
    		return false;
    	}
    	else {

    		var oFeature1 = oSelectedOlFeatures[0];
    		var oFeature2 = oSelectedOlFeatures[1];

    		var oComponents1 = NUTs.GeoJson.getGeoJson('Polygon', oFeature1.geometry.components[0].components);
			var oComponents2 = NUTs.GeoJson.getGeoJson('Polygon', oFeature2.geometry.components[0].components);

    		var bTouches = NUTs.JSTSOperator.Touches(oComponents1, oComponents2);

    		if(bTouches){

    			var oMergeObj =  NUTs.JSTSOperator.Union(oComponents1, oComponents2);

    			//debugger;
    			var aMergePosList;
    			if(oMergeObj.shell){
    				aMergePosList = oMergeObj.shell.points;
    			}
    			var oGInnerFeature = this.makeFeatureByPosList('Polygon', aMergePosList, COMMON.fn_get_editingLayer().concat('.',MAP_EDITOR.fn_get_newG2Id()));

    			//병합된 feature의 속성으로 사용할 기준feature 선택처리
        		var oLonlat;
        		var oMergeComponents = oGInnerFeature.geometry.components[0].components;
    			var nPointLen = oMergeComponents.length;
    			var oLastFeature = oMergeComponents[nPointLen - 1];
    			oLonlat = new OpenLayers.LonLat(oLastFeature.x, oLastFeature.y);

        		var sG2Id  = MAP_EDITOR.fn_get_g2idByFeature(oGInnerFeature);
        		var sFeature1G2Id = MAP_EDITOR.fn_get_g2idByFeature(oFeature1);
        		var sFeature2G2Id = MAP_EDITOR.fn_get_g2idByFeature(oFeature2);
        		
        		oFeature1.fid = COMMON.fn_get_editingLayer().concat(".",sFeature1G2Id);
        		oFeature2.fid = COMMON.fn_get_editingLayer().concat(".",sFeature2G2Id);
        		
        		oFeature1.attributes = oSelectedGFeatures[0].fields
        		oFeature2.attributes = oSelectedGFeatures[1].fields
        		
        		this.mergedFeature = oGInnerFeature;
        		this.orgFeature1 = oFeature1;
        		this.orgFeature2 = oFeature2;

        		var aContentHtml = [];

        		aContentHtml.push('<div class="olControlMergeFeature">');
        		aContentHtml.push('<span class="popTitle">속성을 복제할 기준 feature를 <br />선택하세요</span>');
        		aContentHtml.push('[1] <span class="textover" onmouseover="MAP_EDITOR.fn_blink_featureByfId('+ sFeature1G2Id +');" >'+ sFeature1G2Id +'</span> &nbsp;&nbsp; <img src="/images/usolver/com/map/select.png" style="cursor:pointer" onclick="MAP_EDITOR.fn_proc_mergeFeature('+ sFeature1G2Id +',\'Polygon\');"><br />');
        		aContentHtml.push('[2] <span class="textover"  onmouseover="MAP_EDITOR.fn_blink_featureByfId('+ sFeature2G2Id +');" >'+ sFeature2G2Id +'</span> &nbsp;&nbsp; <img src="/images/usolver/com/map/select.png" style="cursor:pointer" onclick="MAP_EDITOR.fn_proc_mergeFeature('+ sFeature2G2Id +',\'Polygon\');"><br />');
        		aContentHtml.push('[3] 신규생성 &nbsp;&nbsp; <img src="/images/usolver/com/map/select.png" onclick="MAP_EDITOR.fn_proc_mergeFeature(null,\'Polygon\');">');
        		aContentHtml.push('</div>');

        	    var oPopup = new NUTs.Popup("selectStdFeaturePopup", oLonlat, null, aContentHtml.join(''), new OpenLayers.Pixel(3,3));
        	    this.map.addPopup(oPopup);
        		oPopup.type = 'mergeFeature';
        		oPopup.updateSize();

        		var sLayer = COMMON.fn_get_editingLayer();

        	    editor.editLayer.drawFeature(oGInnerFeature, 'select');

	    		map.activeControls("drag");
    		}else {
    			COMMON.showMessage('편집오류 - 면 병햡 & 면 병합은 선택된 2개의 feature가 맞닿아 있어야 합니다.');
        		oSelectCtrl.unselectAll();
        		return false;
    		}
    	}
    },

    /**********************************************************************************
	 * 함수명 : checkTouchEndLine
	 * 설 명 : 지도 좌표스케일 기준으로 2개의 선이 맞닿아 있는지 체크하고 닿아있으면 병합처리된 feature를 리턴한다.
	 * 작성일 : 2016.04.20
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.04.20			최재훈		최초 생성
	 *
	 **********************************************************************************/
    checkTouchEndLine: function(_oComp1, _oComp2){

    	var aMergePosList = [];
    	var nPrecision = CONFIG.fn_get_mapPrecision();

    	//Distance

    	var stdTouchDist = 0.01;

		oCompGeom1 = NUTs.GeoJson.getGeoJson('LineString', _oComp1);
		oCompGeom2 = NUTs.GeoJson.getGeoJson('LineString', _oComp2);

		var nDistGeom = NUTs.JSTSOperator.Distance(oCompGeom1, oCompGeom2);

		//alert('두 개체간 거리 : '+ nDistGeom +'(m)');
		if(nDistGeom < stdTouchDist){

			var nJoinOrder1;
			var nJoinOrder2;
			//선형의 중간지점에 접점이  있는 경우
			for(var i = 0, nComp1Len = _oComp1.length; i < nComp1Len ; i++) {
	        	var nComp1X = parseFloat(_oComp1[i].x).toFixed(nPrecision);
	        	var nComp1Y = parseFloat(_oComp1[i].y).toFixed(nPrecision);

	        	for(var j = 0, nComp2Len = _oComp2.length; j < nComp2Len ; j++) {
	            	var nComp2X = parseFloat(_oComp2[j].x).toFixed(nPrecision);
	            	var nComp2Y = parseFloat(_oComp2[j].y).toFixed(nPrecision);


	            		var nDist2Pt = COMMON.fn_get_DistanceBy2Point(nComp1X,nComp1Y,nComp2X,nComp2Y);
	            		if(nDist2Pt < stdTouchDist) {
	            			if(!(i == 0 || i == (nComp1Len-1)) || !(j == 0 || j == (nComp2Len-1))) { //끝점 비교시점아 아닌 경우
		            			COMMON.showMessage('편집오류 - 선 병합 & 선의 끝점끼리 맞닿은 개체를 선택해주세요!');
		            			break;
	            			}
	            			else{
	            				nJoinOrder1 = i;
	            				nJoinOrder2 = j;
	            				break;
	            			}
	            		}
	        	}
	    	}

			if(nJoinOrder1 === 0) { //1번째 라인의 시점과 접점이면 반대로..
				_oComp1.reverse();
			}

			for(var i = 0, nComp1Len = _oComp1.length; i < nComp1Len ; i++) {

		    	var nCurCoord = {};

	        	nCurCoord.x = parseFloat(_oComp1[i].x).toFixed(nPrecision);
	        	nCurCoord.y = parseFloat(_oComp1[i].y).toFixed(nPrecision);

	        	aMergePosList.push(nCurCoord);
	    	}


    		if(nJoinOrder2 === 0) { //2번째 라인의 시점과 접점이면 첫째(접점) 포인트 제외하고 순서대로 ADD
    			for(var j = 1, nComp2Len = _oComp2.length; j < nComp2Len ; j++) {

                	var nCurCoord = {};

    	        	nCurCoord.x = parseFloat(_oComp2[j].x).toFixed(nPrecision);
    	        	nCurCoord.y = parseFloat(_oComp2[j].y).toFixed(nPrecision);

    	        	aMergePosList.push(nCurCoord);
            	}
    		}
    		else{
    			for(var j = _oComp2.length - 2; j >= 0 ; j--) {

                	var nCurCoord = {};

    	        	nCurCoord.x = parseFloat(_oComp2[j].x).toFixed(nPrecision);
    	        	nCurCoord.y = parseFloat(_oComp2[j].y).toFixed(nPrecision);

    	        	aMergePosList.push(nCurCoord);
            	}
    		}

		}

    	return aMergePosList;
    },

    getLineGeometryByObj : function(_oComponets, _nIdx){

    	var aPoints = [];

    	aPoints.push(new OpenLayers.Geometry.Point(_oComponets[_nIdx].x,_oComponets[_nIdx].y));
		aPoints.push(new OpenLayers.Geometry.Point(_oComponets[_nIdx+1].x,_oComponets[_nIdx+1].y));

		return new OpenLayers.Geometry.LineString(aPoints);

    },

    getTotLineGeometryByObj : function(_oComponets, _oTotComponets, _nIdx){

    	var aPoints = [];

    	aPoints.push(new OpenLayers.Geometry.Point(_oComponets[_nIdx].x,_oComponets[_nIdx].y));
		aPoints.push(new OpenLayers.Geometry.Point(_oComponets[_nIdx+1].x,_oComponets[_nIdx+1].y));

		return new OpenLayers.Geometry.LineString(aPoints);

    },

    getStyleMapSearchLayer : function(){
    	return new OpenLayers.StyleMap({
            'default': new OpenLayers.Style({
            	 fillColor: '#CC3B3B',
	             fillOpacity: 0.6,
	             strokeColor: '#CC0000',
	             graphicZIndex: 2,
	             pointRadius: 6,
	             strokeWidth: 3
            }),
            'select': new OpenLayers.Style({
                fillColor: "#DE6868",
                fillOpacity: 0.4,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "#CC0000",
                strokeOpacity: 1,
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeDashstyle: "solid",
                hoverStrokeColor: "#CC3F3F",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                cursor: "pointer",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3
            }),
	        'blink': new OpenLayers.Style({
	             fillColor: '#84FF00',
	             fillOpacity: 1,
	             strokeColor: '#84FF00',
	             graphicZIndex: 2,
	             pointRadius: 5,
	             strokeWidth: 2
	        }),
	        'wtl_valv_ps': new OpenLayers.Style({
	        	externalGraphic: '/images/usolver/water/z_valve.png',
	        	graphicWidth: 18,
	        	graphicHeight: 18,
	        	fillOpacity: 1,
	        	graphicZIndex: 99999
	        }),
	        'wtl_pipe_lm': new OpenLayers.Style({
	        	fillColor: '#FF8282',
	        	fillOpacity: 1,
	        	strokeColor: '#FF0080',
	        	//graphicZIndex: 1,
	        	pointRadius: 8,
	        	strokeDashstyle : 'solid',
	        	strokeWidth: 3
	        }),
	        'wtl_sply_ls': new OpenLayers.Style({
	        	fillColor: '#FF8282',
	        	fillOpacity: 1,
	        	strokeColor: '#FF0080',
	        	//graphicZIndex: 1,
	        	pointRadius: 8,
	        	strokeDashstyle : 'solid',
	        	strokeWidth: 3
	        }),
	        'wtl_meta_ps': new OpenLayers.Style({
	        	fillColor: '#FF8282',
	        	fillOpacity: 1,
	        	strokeColor: '#FF0080',
	        	//graphicZIndex: 1,
	        	pointRadius: 8,
	        	strokeDashstyle : 'solid',
	        	strokeWidth: 3
	        })    	
    	});
    },


	/**
	 * viewLayer (조회작업간 로딩된 shp레이어의 feature 스타일) 정의 정의
	 * */
	getStyleMapViewLayer : function(){
		return new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
				fillColor: 		NUTs.EditStyle._default.fillColor,
	            fillOpacity: 	NUTs.EditStyle._default.fillOpacity,
	            strokeColor: 	NUTs.EditStyle._default.strokeColor,
	            strokeWidth: 	NUTs.EditStyle._default.strokeWidth,
	            graphicZIndex: 	NUTs.EditStyle._default.graphicZIndex,
	            pointRadius: 	NUTs.EditStyle._default.pointRadius
	        }),
	        'select': new OpenLayers.Style({
	        	fillColor: 		NUTs.EditStyle.select.fillColor,
	            fillOpacity: 	NUTs.EditStyle.select.fillOpacity,
	            strokeColor: 	NUTs.EditStyle.select.strokeColor,
	            strokeWidth: 	NUTs.EditStyle.select.strokeWidth,
	            graphicZIndex: 	NUTs.EditStyle.select.graphicZIndex,
	            pointRadius: 	NUTs.EditStyle.select.pointRadius
	        })
	    });
	},

	/**
	 * refLayer (참조점,참조선,참조반경 등 참조레이어의 feature 스타일) 정의 정의
	 * */
	getStyleMapRefLayer : function(){
		return new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
				fillColor: '#CF9BBC',
	            fillOpacity: 0.5,
	            strokeColor: '#c621cf',
	            strokeWidth: 2,
	            graphicZIndex: 1,
	            pointRadius: 5
	        }),
	        'select': new OpenLayers.Style({
	        	 fillColor: '#BA8ACF',
	             fillOpacity: 0.7,
	             strokeColor: '#7b21cf',
	             strokeWidth: 2,
	             graphicZIndex: 1,
	             pointRadius: 5
	        })
	    });
	},

	/**
	 * editLayer (현재 편집 진행중인 레이어의 feature 스타일) 정의 정의
	 * */
	getStyleMapEditLayer : function(){
		return new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
				fillColor: '#CF9BBC',
	            fillOpacity: 0.5,
	            strokeColor: '#c621cf',
	            strokeWidth: 2,
	            graphicZIndex: 1,
	            pointRadius: 5
	        }),
	        'select': new OpenLayers.Style({
	        	 fillColor: '#BA8ACF',
	             fillOpacity: 0.7,
	             strokeColor: '#7b21cf',
	             strokeWidth: 2,
	             graphicZIndex: 1,
	             pointRadius: 5
	        })
	    });
	},

	/**
	 * effectLayer (flash등 다양한 효과를 표현하기 위한 스타일) 정의 정의
	 * */
	getStyleMapEffectLayer : function(){
		return new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
				fillColor: '#84FF00',
	            fillOpacity: 1,
	            strokeColor: '#84FF00',
	            strokeWidth: 3,
	            graphicZIndex: 1,
	            pointRadius: 5
	        }),
	        'select': new OpenLayers.Style({
	        	 fillColor: '#CC0000',
	             fillOpacity: 1,
	             strokeColor: '#CC0000',
	             strokeWidth: 3,
	             graphicZIndex: 1,
	             pointRadius: 5
	        }),
	        'border': new OpenLayers.Style({
	        	 fillColor: '#FFFFFF',
	             fillOpacity: 0.1,
	             strokeColor: '#FF0000',
	             strokeWidth: 1,
	             graphicZIndex: 1,
	             strokeDashstyle: "dash",
	             pointRadius: 3
	        }),
	        'borderpoint': new OpenLayers.Style({
	        	 fillColor: '#FFFFFF',
	             fillOpacity: 1,
	             strokeColor: '#FF0000',
	             strokeWidth: 1,
	             graphicZIndex: 1,
	             pointRadius: 3
	        }),
	        'selectpoint': new OpenLayers.Style({
	        	 fillColor: '#FFFFFF',
	             fillOpacity: 1,
	             strokeColor: '#FF0073',
	             strokeWidth: 2,
	             graphicZIndex: 1,
	             pointRadius: 4
	        }),
	        'blink': new OpenLayers.Style({
	             fillColor: '#84FF00',
	             fillOpacity: 1,
	             strokeColor: '#84FF00',
	             graphicZIndex: 2,
	             pointRadius: 5,
	             strokeWidth: 2
	         }),
		     'nonblink': new OpenLayers.Style({
		    	 fillColor: '#CC3B3B',
	             fillOpacity: 0.6,
	             strokeColor: '#CC0000',
	             graphicZIndex: 100,
	             pointRadius: 5,
	             strokeDashstyle : 'solid',
	             strokeWidth: 3
		         })
	    });
	},


	/**
	 * editEffectLayer 개체선택 시 테두리 등 편집 스타일 정의
	 * */
	getStyleMapEditEffectLayer : function(){
		return new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                pointRadius: 5,
                fillColor: "#FFFFFF",
                fillOpacity: 0.1,
                strokeColor: "#FF0000",
                strokeDashstyle: "dash",
                strokeWidth : 1
            })
        });
	},
	/**
	 * effectLayer (flash등 다양한 효과를 표현하기 위한 스타일) 정의 정의
	 * */
	getStyleMapShpLayer : function(){
		return new OpenLayers.StyleMap({
			 'default': new OpenLayers.Style({
	             fillColor: '#FF007B',
	             fillOpacity: 1,
	             strokeColor: '#FF0048',
	             strokeDashstyle : 'solid',
	             strokeWidth: 3,
	             graphicZIndex: 1,
	             pointRadius: 5
	         }),
	         'select': new OpenLayers.Style({
	             fillColor: '#FF007B',
	             fillOpacity: 0.7,
	             strokeColor: '#FF0048',
	             graphicZIndex: 100,
	             pointRadius: 5,
	             strokeDashstyle : 'solid',
	             strokeWidth: 3
	         }),
	         'dataload': new OpenLayers.Style({
	             fillColor: '#FF007B',
	             fillOpacity: 0.4,
	             strokeColor: '#FF0048',
	             graphicZIndex: 100,
	             pointRadius: 3,
	             strokeDashstyle : 'solid',
	             strokeWidth: 2
	         })
	    });
	},

	/**
	 * styleLayer (현재 편집진행중인 feature를 제외한 편집모니터에 등록된 레이어의 feature 스타일) 정의 정의
	 * */
	getStyleMapStyleLayer : function(){

		return new OpenLayers.StyleMap({
			 'default': new OpenLayers.Style({
				 fillColor: '#CC3B3B',
	             fillOpacity: 0.6,
	             strokeColor: '#CC0000',
	             strokeDashstyle : 'solid',
	             strokeWidth: 3,
	             graphicZIndex: 1,
	             pointRadius: 5
	         }),

	         'defaultlabel': new OpenLayers.Style({
	        	 fillColor: 		NUTs.EditStyle.defaultLabel.fillColor,
	             fillOpacity: 		NUTs.EditStyle.defaultLabel.fillOpacity,
	             strokeColor: 		NUTs.EditStyle.defaultLabel.strokeColor,
	             strokeWidth: 		NUTs.EditStyle.defaultLabel.strokeWidth,
	             graphicZIndex: 	NUTs.EditStyle.defaultLabel.graphicZIndex,
	             pointRadius: 		NUTs.EditStyle.defaultLabel.pointRadius,
	             cursor: 			NUTs.EditStyle.defaultLabel.cursor,
	             label: 			NUTs.EditStyle.defaultLabel.label,
	             fontColor: 		NUTs.EditStyle.defaultLabel.fontColor,
	             fontSize: 			NUTs.EditStyle.defaultLabel.fontSize,
	             fontFamily: 		NUTs.EditStyle.defaultLabel.fontFamily,
	             fontWeight: 		NUTs.EditStyle.defaultLabel.fontWeight,
	             labelAlign: 		NUTs.EditStyle.defaultLabel.labelAlign,
	             labelXOffset: 		NUTs.EditStyle.defaultLabel.labelXOffset,
	             labelYOffset: 		NUTs.EditStyle.defaultLabel.labelYOffset,
	             labelOutlineColor: NUTs.EditStyle.defaultLabel.labelOutlineColor,
	             labelOutlineWidth: NUTs.EditStyle.defaultLabel.labelOutlineWidth,
	             labelSelect: 		NUTs.EditStyle.defaultLabel.labelSelect
	         }),
	         'selectedvertex': new OpenLayers.Style({
	             fillColor: '#FF8282',
	             fillOpacity: 1,
	             strokeColor: '#FF0080',
	             graphicZIndex: 100,
	             pointRadius: 5,
	             strokeDashstyle : 'solid',
	             strokeWidth: 3
	         }),
	         'select': new OpenLayers.Style({
	             fillColor: '#CC3B3B',
	             fillOpacity: 0.6,
	             strokeColor: '#CC0000',
	             graphicZIndex: 100,
	             pointRadius: 5,
	             strokeDashstyle : 'solid',
	             strokeWidth: 3
	         }),
	         'dataload': new OpenLayers.Style({
	             fillColor: '#CC3B3B',
	             fillOpacity: 0.3,
	             strokeColor: '#CC0000',
	             graphicZIndex: 100,
	             pointRadius: 3,
	             strokeDashstyle : 'solid',
	             strokeWidth: 2
	         }),
	         'blink': new OpenLayers.Style({
	             fillColor: '#84FF00',
	             fillOpacity: 1,
	             strokeColor: '#84FF00',
	             graphicZIndex: 100,
	             pointRadius: 5,
	             strokeDashstyle : 'solid',
	             strokeWidth: 2
	         }),
	         // defaultLabel and selectLabel Styles are needed for DrawText Control
	         'selectlabel': new OpenLayers.Style({
	        	 fillColor: 		NUTs.EditStyle.selectLabel.fillColor,
	             fillOpacity: 		NUTs.EditStyle.selectLabel.fillOpacity,
	             strokeColor: 		NUTs.EditStyle.selectLabel.strokeColor,
	             strokeWidth: 		NUTs.EditStyle.selectLabel.strokeWidth,
	             graphicZIndex: 	NUTs.EditStyle.selectLabel.graphicZIndex,
	             pointRadius: 		NUTs.EditStyle.selectLabel.pointRadius,
	             cursor: 			NUTs.EditStyle.selectLabel.cursor,
	             label: 			NUTs.EditStyle.selectLabel.label,
	             fontColor: 		NUTs.EditStyle.selectLabel.fontColor,
	             fontSize: 			NUTs.EditStyle.selectLabel.fontSize,
	             fontFamily: 		NUTs.EditStyle.selectLabel.fontFamily,
	             fontWeight: 		NUTs.EditStyle.selectLabel.fontWeight,
	             labelAlign: 		NUTs.EditStyle.selectLabel.labelAlign,
	             labelXOffset: 		NUTs.EditStyle.selectLabel.labelXOffset,
	             labelYOffset: 		NUTs.EditStyle.selectLabel.labelYOffset,
	             labelOutlineColor: NUTs.EditStyle.selectLabel.labelOutlineColor,
	             labelOutlineWidth: NUTs.EditStyle.selectLabel.labelOutlineWidth,
	             labelSelect: 		NUTs.EditStyle.selectLabel.labelSelect
	         }),
	         'delete': new OpenLayers.Style({
		            display: 'none'
		        }),
	         'temporary': new OpenLayers.Style({
	        	 fillColor: '#F2BF05',
	             fillOpacity: 0.7,
	             strokeColor: '#ED8302',
	             graphicZIndex: 2,
	             pointRadius: 5,
	             strokeWidth: 3
	         }),
	         'rdl_stlt_ps': new OpenLayers.Style({
	         	externalGraphic: '/images/usolver/road/RDL_STLT_PS_ON_ico.png',
	 	        graphicWidth: 18,
	 	        graphicHeight: 18,
	 	        fillOpacity: 1,
	 	        graphicZIndex: 1
	         }),
	         'wtl_pipe_lm': new OpenLayers.Style({
	             fillColor: '#DE6868',
	             strokeColor: '#0377FC',
	             strokeDashstyle : 'dash',
	             strokeWidth: 2,
	             graphicZIndex: 99999
	         }),
	         'wtl_sply_ls': new OpenLayers.Style({
	         	 fillColor: '#17A6A6',
	             strokeColor: '#117979',
	             /*fillColor: '#DE6868',
	             strokeColor: '#CC0000',*/
	             strokeDashstyle : 'dash',
	             strokeWidth: 2,
	             graphicZIndex: 1
	         }),
	         'wtl_meta_ps': new OpenLayers.Style({
	         	externalGraphic: '/images/usolver/water/WTL_META_PS_ON_ico.png',
	 	        graphicWidth: 15,
	 	        graphicHeight: 15,
	 	        fillOpacity: 1
	         }),
	         'wtl_puri_as': new OpenLayers.Style({
	             fillColor: '#9CC8FF',
	             strokeColor: '#597AA8',
	             strokeDashstyle : 'dash',
	             strokeWidth: 2,
	             graphicZIndex: 1
	         }),
	         'rdl_tree_ps': new OpenLayers.Style({
	         	externalGraphic: '/images/usolver/road/RDL_TREE_PS_ON_ico.png',
	 	        graphicWidth: 15,
	 	        graphicHeight: 15,
	 	        fillOpacity: 1,
	 	       graphicZIndex: 1
	         })/*,
	         'wtl_fire_ps': new OpenLayers.Style({
	        	 externalGraphic: '/images/usolver/water/WTL_FIRE_PS_SA118.png',
	        	 graphicWidth: 18,
	        	 graphicHeight: 18,
	        	 fillOpacity: 1,
	        	 graphicZIndex: 1
	         }),
	         'wtl_valv_ps': new OpenLayers.Style({
	        	 externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA200.png',
	        	 graphicWidth: 18,
	        	 graphicHeight: 18,
	        	 fillOpacity: 1,
	        	 graphicZIndex: 1
	         })*/,
	         'wtl_fire_ps': new OpenLayers.Style({
		        	externalGraphic: '/images/usolver/water/WTL_FIRE_PS_SA119.png',
			        graphicWidth: 18,
			        graphicHeight: 18,
			        fillOpacity: 1,
			        graphicZIndex: 1
		        }, {
		            rules: [
		                new OpenLayers.Rule({
		        			filter: new OpenLayers.Filter.Comparison({
		      			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      			      property: 'FTR_CDE',
		      			      value: 'SA118',
		      			  }),
		      			  symbolizer: {
		      				  externalGraphic: '/images/usolver/water/WTL_FIRE_PS_SA118.png',
		      		          graphicWidth: 18,
		      		          graphicHeight: 18,
		      		          fillOpacity: 1,
		      		          graphicZIndex: 1
		      			  }
		                }),
		                new OpenLayers.Rule({
		        			filter: new OpenLayers.Filter.Comparison({
		      			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      			      property: 'FTR_CDE',
		      			      value: 'SA119',
		      			  }),
		      			  symbolizer: {
		      				  externalGraphic: '/images/usolver/water/WTL_FIRE_PS_SA119.png',
		      		          graphicWidth: 18,
		      		          graphicHeight: 18,
		      		          fillOpacity: 1,
		      		          graphicZIndex: 1
		      			  }
		                })
		            ]
		    }),
		    'wtl_valv_ps': new OpenLayers.Style({
		        	externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA200.png',
			        graphicWidth: 18,
			        graphicHeight: 18,
			        fillOpacity: 1,
			        graphicZIndex: 1
		        }, {
		            rules: [
		                new OpenLayers.Rule({
		        			filter: new OpenLayers.Filter.Comparison({
		      			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      			      property: 'FTR_CDE',
		      			      value: 'SA200',
		      			  }),
		      			  symbolizer: {
		      				  externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA200.png',
		      		          graphicWidth: 18,
		      		          graphicHeight: 18,
		      		          fillOpacity: 1,
		      		          graphicZIndex: 1
		      			  }
			      		}),
			      		new OpenLayers.Rule({
			    			filter: new OpenLayers.Filter.Comparison({
			    			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
			    			      property: 'FTR_CDE',
			    			      value: 'SA201',
			    			  }),
			    			  symbolizer: {
			    				  externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA201.png',
			    		          graphicWidth: 18,
			    		          graphicHeight: 18,
			    		          fillOpacity: 1,
			    		          graphicZIndex: 1
			    			  }
			    		}),
			    		new OpenLayers.Rule({
			    			filter: new OpenLayers.Filter.Comparison({
			    			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
			    			      property: 'FTR_CDE',
			    			      value: 'SA202',
			    			  }),
			    			  symbolizer: {
			    				  externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA202.png',
			    		          graphicWidth: 18,
			    		          graphicHeight: 18,
			    		          fillOpacity: 1,
			    		          graphicZIndex: 1
			    			  }
			    		}),
			    		new OpenLayers.Rule({
			    			filter: new OpenLayers.Filter.Comparison({
			    			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
			    			      property: 'FTR_CDE',
			    			      value: 'SA203',
			    			  }),
			    			  symbolizer: {
			    				  externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA203.png',
			    		          graphicWidth: 18,
			    		          graphicHeight: 18,
			    		          fillOpacity: 1,
			    		          graphicZIndex: 1
			    			  }
			    		}),
			    		new OpenLayers.Rule({
			    			filter: new OpenLayers.Filter.Comparison({
			    			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
			    			      property: 'FTR_CDE',
			    			      value: 'SA204',
			    			  }),
			    			  symbolizer: {
			    				  externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA204.png',
			    		          graphicWidth: 18,
			    		          graphicHeight: 18,
			    		          fillOpacity: 1,
			    		          graphicZIndex: 1
			    			  }
			    		}),
			    		new OpenLayers.Rule({
			    			filter: new OpenLayers.Filter.Comparison({
			    			      type: OpenLayers.Filter.Comparison.EQUAL_TO,
			    			      property: 'FTR_CDE',
			    			      value: 'SA205',
			    			  }),
			    			  symbolizer: {
			    				  externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA205.png',
			    		          graphicWidth: 18,
			    		          graphicHeight: 18,
			    		          fillOpacity: 1,
			    		          graphicZIndex: 1
			    			  }
			    		})
		            ]
		    })
		});

	},

    /**
     * Adds a control to the editor and its panel
     * @param {OpenLayers.Editor.Control} control
     */
    /*CJH.2016-10-25
     * addEditorControl: function (control) {
        this.controls[control.CLASS_NAME] = control;
        this.editorPanel.addControls([control]);
        this.map.addControl(control);
    },*/

    /**
     * Instantiates the container which displays the tools.
     * To be called by OLE only and intended to be overridden by subclasses that want to display something else instead of the default toolbar
     * @param {Array.<OpenLayers.Control>} controls Editing controls
     * @return {OpenLayers.Editor.Control.EditorPanel} Widget to display editing tools
     */
    /*CJH.2016-10-25
     * createEditorPanel: function (controls) {

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

        var editorPanel = new OpenLayers.Editor.Control.EditorPanel(this);
        editorPanel.addControls(controls);
        return editorPanel;
    },

    status: function (options) {
        if (options.type == 'error') {
            alert(options.content);
        }
    },*/

    /**
     * Destroys existing features and loads the provided one into editor
     * @param {Array.<OpenLayers.Feature.Vector>} features
     */
    /*loadFeatures: function (features) {
        this.editLayer.destroyFeatures();
        if (features) {
            this.editLayer.addFeatures(features);
            this.map.zoomToExtent(this.editLayer.getDataExtent());
        }
    },*/

    /**
     * Callback to update selected feature with result of server side processing
     */
    /*requestComplete: function (response) {
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
    },*/

    /**
     * Flattens multipolygons and returns a list of their features
     * @param {Object|Array} multiPolygon Geometry or list of geometries to flatten. Geometries can be of types
     *     OpenLayers.Geometry.MultiPolygon, OpenLayers.Geometry.Collection,
     *     OpenLayers.Geometry.Polygon.
     * @return {Array} List for features of type OpenLayers.Feature.Vector.
     */
    /*CJH.2016-10-25
     * toFeatures: function (multiPolygon) {
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
    },*/

    /**********************************************************************************
	 * 함수명 : getGeometryType
	 * 설 명 :
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.07.07			최재훈		최초 생성
	 *
	 **********************************************************************************/
    getGeometryType: function (feature){

    	var oGeometry = feature.geometry;
    	var sType;
		if(oGeometry.CLASS_NAME){
    		sType = oGeometry.CLASS_NAME.replace('OpenLayers.Geometry.','')
    	}
    	else if(oGeometry.id) {
    		var aId = oGeometry.id.split("_");
    		if(aId.length == 2) {
    			var sTypeName = aid[0];
    			sType = sTypeName.replace('OpenLayers.Geometry.','');
    		}
    	}

    	return this.getFeatureType(sType);
    },

    /**********************************************************************************
	 * 함수명 : getFeatureType
	 * 설 명 :
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.06.10			윤은희		최초 생성
	 *
	 **********************************************************************************/
    getFeatureType: function (_type){
    	//featureTypes: ['text', 'point', 'linestring', 'polygon', 'multilinestring', 'multipolygon', 'regular'];
    	if($.inArray(_type.toLowerCase(), this.featureTypes) > -1)
    		return _type.toLowerCase();
    	else
    		return '';
    },
    
    /**********************************************************************************
	 * 함수명 : getArcFeature
	 * 설 명 : ARC 생성하기
	 * 인 자 : _oCenterP(생성할 Arc의 중심좌표점)
	 *  	  : _nRadius(생성할 Arc의 반지름)
	 *  	  : _nSAngle(시작 각 : 수평선 기준 기울기)
	 *  	  : _nEAngle(끝 각 : 수평선 기준 기울기)
	 *        : _nSegments(Arc를 그리기 위한 segments : 숫자가 커질수록 부드러운 원이 생성됨)
	 * 반환  : Arc Feature 
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2016.09.01			윤은희		최초 생성
	 *
	 **********************************************************************************/
    getArcFeature : function(_oCenterP, _nRadius, _nSAngle, _nEAngle, _nSegments)
    {
    	var aPointList=[];
    	var _nDAngle= _nSegments+1;
    	
    	for(var i=0; i<_nDAngle; i++){
    		var angle = _nSAngle - (_nSAngle-_nEAngle) * i / (_nDAngle-1);
    		var x = _oCenterP.x + _nRadius * Math.cos(angle * Math.PI/180);
    		var y = _oCenterP.y + _nRadius * Math.sin(angle * Math.PI/180);

    		var point = new OpenLayers.Geometry.Point(x, y);

    		aPointList.push(point);
    	}

    	var oArcFeature    = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(aPointList));

    	return oArcFeature;
    },

    
    CLASS_NAME: 'usvEditor'
});