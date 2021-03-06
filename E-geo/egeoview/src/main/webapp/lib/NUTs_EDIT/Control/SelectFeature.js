/**************************************************************************************************************
 * Feature 선택 클래스
 * @namespace {Object}NUTs.Control.SelectFeature
 * @description feature를 선택할 경우 필요한 처리를 담당하는 클래스
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Control.SelectFeature = OpenLayers.Class(OpenLayers.Control.SelectFeature, {

	/**
	 * 초기화
	 * box 옵션 추가시 NUTs.Handler.Box 사용
	 */
	initialize: function(layers, options) {
        // concatenate events specific to this control with those from the base
        /*this.EVENT_TYPES =
            OpenLayers.Control.SelectFeature.prototype.EVENT_TYPES.concat(
            OpenLayers.Control.prototype.EVENT_TYPES
        );*/
        OpenLayers.Control.prototype.initialize.apply(this, [options]);

        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);
        var callbacks = {
            click: this.clickFeature,
            clickout: this.clickoutFeature
        };
        if (this.hover) {
            callbacks.over = this.overFeature;
            callbacks.out = this.outFeature;
        }

        this.callbacks = OpenLayers.Util.extend(callbacks, this.callbacks);
        this.handlers = {
            feature: new OpenLayers.Handler.Feature(
                this, this.layer, this.callbacks,
                {geometryTypes: this.geometryTypes}
            )
        };

        if (this.box) {
            this.handlers.box = new NUTs.Handler.Box(
                this, {done: this.selectBox},
                {boxDivClassName: "olHandlerBoxSelectFeature"}
            );
        }
    },


    select: function(feature) {
        var cont = this.onBeforeSelect.call(this.scope, feature);
        var layer = feature.layer;
        if(cont !== false) {
            cont = layer.events.triggerEvent("beforefeatureselected", {
                feature: feature
            });
            if(cont !== false) {
                layer.selectedFeatures.push(feature);
                this.highlight(feature);

                if(editor) {
                	if(editor.getGeomType(feature.geometry) !== "Point")
                		//console.log('GSelectFeature');
                		editor.drawBorder(feature);
                }

                // if the feature handler isn't involved in the feature
                // selection (because the box handler is used or the
                // feature is selected programatically) we fake the
                // feature handler to allow unselecting on click
                if(!this.handlers.feature.lastFeature) {
                    this.handlers.feature.lastFeature = layer.selectedFeatures[0];
                }
                layer.events.triggerEvent("featureselected", {feature: feature});
                this.onSelect.call(this.scope, feature);
            }
        }
    },

    unselect: function(feature) {
        var layer = feature.layer;
        // Store feature style for restoration later
        this.unhighlight(feature);
        OpenLayers.Util.removeItem(layer.selectedFeatures, feature);
        layer.events.triggerEvent("featureunselected", {feature: feature});
        this.onUnselect.call(this.scope, feature);
    },

    highlight: function(feature) {
        var layer = feature.layer;
        var cont = this.events.triggerEvent("beforefeaturehighlighted", {
            feature : feature
        });
        if(cont !== false) {
            feature._prevHighlighter = feature._lastHighlighter;
            feature._lastHighlighter = this.id;
            var style = this.selectStyle || this.renderIntent;
            layer.drawFeature(feature, style);
            this.events.triggerEvent("featurehighlighted", {feature : feature});
        }
    },

    unhighlight: function(feature) {
        var layer = feature.layer;

        if(feature._prevHighlighter == undefined) {
            delete feature._lastHighlighter;
        } else if(feature._prevHighlighter == this.id) {
            delete feature._prevHighlighter;
        } else {
            feature._lastHighlighter = feature._prevHighlighter;
            delete feature._prevHighlighter;
        }
        layer.drawFeature(feature, feature.style || feature.layer.style ||
            "default");
        this.events.triggerEvent("featureunhighlighted", {feature : feature});
    },

    selectBox: function(position) {
        if (position instanceof NUTs.Bounds) {
            var minXY = this.map.getLonLatFromPixel({
                x: position.left,
                y: position.bottom
            });
            var maxXY = this.map.getLonLatFromPixel({
                x: position.right,
                y: position.top
            });
            var bounds = new NUTs.Bounds(
                minXY.lon, minXY.lat, maxXY.lon, maxXY.lat
            );

            // if multiple is false, first deselect currently selected features
            if (!this.multipleSelect()) {
                this.unselectAll();
            }

            // because we're using a box, we consider we want multiple selection
            var prevMultiple = this.multiple;
            this.multiple = true;
            var layers = this.layers || [this.layer];
            this.events.triggerEvent("boxselectionstart", {layers: layers});
            var layer;

            this.unselectAll();

            for(var l=0; l<layers.length; ++l) {
                layer = layers[l];
                for(var i=0, len = layer.features.length; i<len; ++i) {
                    var feature = layer.features[i];
                    // check if the feature is displayed
                    if (!feature.getVisibility()) {
                        continue;
                    }

                    if (this.geometryTypes == null || OpenLayers.Util.indexOf(
                            this.geometryTypes, feature.geometry.CLASS_NAME) > -1) {
                        if (bounds.toGeometry().intersects(feature.geometry)) {
                            if (OpenLayers.Util.indexOf(layer.selectedFeatures, feature) == -1) {
                                this.select(feature);
                            }
                        }
                    }
                }
            }
            this.multiple = prevMultiple;
            this.events.triggerEvent("boxselectionend", {layers: layers});
        }
    },
	/**
	 * hover 시에도 click 이벤트가 실행 되도록 수정
	 * @param {Object} feature
	 */
	clickFeature: function(feature) {
		if(!this.hover) {
	        var selected = (OpenLayers.Util.indexOf(
	            feature.layer.selectedFeatures, feature) > -1);
	        if(selected) {
	            if(this.toggleSelect()) {
	                this.unselect(feature);
	            } else if(!this.multipleSelect()) {
	                this.unselectAll({except: feature});
	            }
	        } else {
	            if(!this.multipleSelect()) {
	                this.unselectAll({except: feature});
	            }
	            this.select(feature);
	        }
	    }
		else {
			if(this.onHoverClick) this.onHoverClick.call(this.scope, feature);
		}
	},

	featureselected: function(feature) {
		alert(feature);
	},

	onUnselectAll: function() {},

	unselectAll: function(options) {
        // we'll want an option to supress notification here
        var layers = this.layers || [this.layer];
        var layer, feature;
        for(var l=0; l<layers.length; ++l) {
            layer = layers[l];
            for(var i=layer.selectedFeatures.length-1; i>=0; --i) {
                feature = layer.selectedFeatures[i];
                if(!options || options.except != feature) {
                    this.unselect(feature);
                }
            }
        }

		$(".olControlDrawText").each(function() {
			$(this).removeClass("on");
			$(this).addClass("off");
		});

		editor.effectLayer.removeAllFeatures();

		this.onUnselectAll();
    },

	selectTextPopup : function(element) {
    	
	},

	CLASS_NAME: "NUTs.Control.SelectFeature"
});