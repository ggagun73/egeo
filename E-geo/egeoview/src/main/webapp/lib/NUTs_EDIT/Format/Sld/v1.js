/**************************************************************************************************************
 * SLD.v1 클래스
 * @namespace {Object} NUTs.Format.SLD.v1
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Format.SLD.v1 = OpenLayers.Class(OpenLayers.Format.SLD.v1, {
    
    writers: OpenLayers.Util.applyDefaults({
        "sld": {            
            "PointSymbolizer": function(symbolizer) {
                var node = this.createElementNSPlus("sld:PointSymbolizer");
                this.writeNode("Graphic", symbolizer, node);
                return node;
            },
            "Graphic": function(symbolizer) {
                var node = this.createElementNSPlus("sld:Graphic");
                if(symbolizer.externalGraphic != undefined) {
                    this.writeNode("ExternalGraphic", symbolizer, node);
                } else {
                    this.writeNode("Mark", symbolizer, node);
                }
                
                if(symbolizer.graphicOpacity != undefined) {
                    this.writeNode("Opacity", symbolizer.graphicOpacity, node);
                }
                // CJH. 2017.03.17 : SLDv_1_1_0을 지원하는 엔진과 동일한 UI로 처리하기 위한..처리 <--원래는 pointSize는 v1에는 없음.
                if(symbolizer.pointSize != undefined) {
                    this.writeNode("Size", symbolizer.pointSize, node);
                }else if(symbolizer.pointRadius != undefined) {
                    this.writeNode("Size", symbolizer.pointRadius * 2, node);
                } else if (symbolizer.graphicWidth != undefined) {
                    this.writeNode("Size", symbolizer.graphicWidth, node);
                }
                if(symbolizer.rotation != undefined) {
                    this.writeNode("Rotation", symbolizer.rotation, node);
                }
                return node;
            },
            "ExternalGraphic": function(symbolizer) {
                var node = this.createElementNSPlus("sld:ExternalGraphic");
                this.writeNode(
                    "OnlineResource", symbolizer.externalGraphic, node
                );
                var format = symbolizer.graphicFormat ||
                             this.getGraphicFormat(symbolizer.externalGraphic);
                this.writeNode("Format", format, node);
                return node;
            },
            "Mark": function(symbolizer) {
                var node = this.createElementNSPlus("sld:Mark");
                if(symbolizer.graphicName) {
                    this.writeNode("WellKnownName", symbolizer.graphicName, node);
                }
                if (symbolizer.fill !== false) {
                    this.writeNode("Fill", symbolizer, node);
                }
                if (symbolizer.stroke !== false) {
                    this.writeNode("Stroke", symbolizer, node);
                }
                return node;
            },
            "WellKnownName": function(name) {
                return this.createElementNSPlus("sld:WellKnownName", {
                    value: name
                });
            },
            "Opacity": function(value) {
                return this.createElementNSPlus("sld:Opacity", {
                    value: value
                });
            },
            "Size": function(value) {
                return this.writers.sld._OGCExpression.call(
                    this, "sld:Size", value
                );
            },
            "Rotation": function(value) {
                return this.createElementNSPlus("sld:Rotation", {
                    value: value
                });
            },
            "OnlineResource": function(href) {
                return this.createElementNSPlus("sld:OnlineResource", {
                    attributes: {
                        "xlink:type": "simple",
                        "xlink:href": href
                    }
                });
            },
            "Format": function(format) {
                return this.createElementNSPlus("sld:Format", {
                    value: format
                });
            }
        }
    }, OpenLayers.Format.Filter.v1_0_0.prototype.writers),
    
    CLASS_NAME: "OpenLayers.Format.SLD.v1" 

});
