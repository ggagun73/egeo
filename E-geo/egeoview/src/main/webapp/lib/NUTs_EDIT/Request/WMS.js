/**************************************************************************************************************
 * WMS 클래스  
 * @namespace {Object} NUTs.WMS 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/ 

NUTs.WMS = {

	service : "WMS",
	
	version : "1.3.0",
	
	request : null,
	//change jykw 20160725 for geoserver
    format: new NUTs.Format.SLD.v1_1_0,
    //format: new NUTs.Format.SLD.v1_0_0_GeoServer,
	
    getLayerNameByNamedLayer : function(namedLayerXml) {
    	var layerName = null;
    	if(namedLayerXml.getElementsByTagName("se:FeatureTypeName")[0]) 
    		layerName = namedLayerXml.getElementsByTagName("se:FeatureTypeName")[0].textContent;
    	else 
    		layerName = namedLayerXml.getElementsByTagName("sld:Name")[0].textContent; 
    	
    	return layerName;
    },
	getCapability : function(serviceUrl, callback) {
		var params = {
			service : this.service,
			version : this.version,
			request : "GetCapabilities"
		};
		
		var obj = this;
		NUTs.Util.sendProxyGet(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
			obj.parseGetCapability(res, callback);
		});
	},
	
	parseGetCapability : function(res, callback) {
		var arr = [];
		
		var totalLayers = res.getElementsByTagName("Layer");
		
		for(var i=0, len=totalLayers.length; i < len; i++) {
			var grpLayers = totalLayers[i].getElementsByTagName("Layer");
			if(grpLayers.length > 0 && totalLayers[i].getElementsByTagName("Title")[0].text != "BASIC") {
				var groupArr = {
					title : totalLayers[i].getElementsByTagName("Title")[0].text,
					layers : []
				};
				
				for(var j=0, jLen=grpLayers.length; j < jLen; j++) {
					var obj = {
						name :  grpLayers[j].getElementsByTagName("Name")[0].text,
						style : grpLayers[j].getElementsByTagName("Style")[0].text,
						title : grpLayers[j].getElementsByTagName("Title")[0].text,
						left : grpLayers[j].getElementsByTagName("westBoundLongitude")[0].text,
						bottom : grpLayers[j].getElementsByTagName("southBoundLatitude")[0].text,
						right : grpLayers[j].getElementsByTagName("eastBoundLongitude")[0].text,
						top : grpLayers[j].getElementsByTagName("northBoundLatitude")[0].text
					};
					groupArr.layers.push(obj);
				}
				
				arr.push(groupArr);
			}
		}
		
		callback(arr);
	},
	
	getLengendGraphic : function(serviceUrl, parameters) {
		var params = {
			service : this.service,
			version : this.version,
			request : "GetLegendGraphic",
			layer : "",
			style : "",
			rule : "",
			sld_version : "1.1.0",
			format : "image/png",
			width : 16,
			height : 16
		};
		
		$.extend(params, parameters);
		return serviceUrl + NUTs.Util.fn_convert_objToStr(params);
	},
	
	getStyles : function(serviceUrl, layers, version, callback) {
		var serviceVersion = version;
		var params = {
			service : this.service,
			//jykw 20160708 for geoserver
			//version : this.version,
			version : serviceVersion,
			request : "GetStyles",
			layers : layers
		};
		
		var obj = this;
        //change jykw 20160708 for geoserver
        /*NUTs.Util.sendProxyPost(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
            obj.parseGetStyles(res, callback)
        })*/
        
		NUTs.Util.sendProxyPost(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
            obj.parseGetStyles(res, callback)
        })
	},
	
	getStylesBySync : function(serviceUrl, layers, version, callback) {
		var serviceVersion = version;
		var params = {
			service : this.service,
			version : serviceVersion,
			request : "GetStyles",
			layers : layers
		};
		
		var obj = this;
		NUTs.Util.sendProxyPostSync(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res)
			{
				obj.parseGetStyles(res, callback);
			//	callback(new NUTs.Tool.SLDTool(res,"xml"));
			}
		);
	},
	
	/* ggash 2016.12.29 for geoserver
	 * GeoServer일경우 문제점 수정
	 * 1. GetStyles Response 개체에 LayerFeatureContraints property가 없어  featureTypeName Property에 "table명'이 SET되지 않음
	 * 2. GetStyles Response 개체에 symbolizer - 스타일(fill, stroke..etc)등에 값이 있으나 파싱된 sld에는 누락됨.
	 * 	2-1. GeoServer - point에 size property 없음.
	 * 	2-2. GeoServer - line에 name property 없음.
	 * 	2-3. Line의 경우 GeoServer는 StorkeDashStyle, GeoGate는 StrokeDashArray
	*/
	parseGetStyles : function(res, callback) {
		var obj = {	
			xml : res,
			name : "",
			namedLayers : []
		};
		//debugger;
		// jykw 20160721 for geoserver
        var sld = this.format.read(res);       
        //var sld = this.format.read(res.documentElement);

        var name = sld.name;
        // jykw 20160721 for geoserver
        //if (name.length > 0) obj.name = name;        
        if (name != undefined && name.length > 0) obj.name = name;        
		
		var namedLayers = sld.namedLayers;
		
		var parsedNamedLayers = this.parseGetStylesByNamedLayers(namedLayers);
		
		obj.namedLayers = parsedNamedLayers;
		
		if(callback) {
			callback(obj);	
			return true;
		}
		else {
			return obj;
		}
	},
	
	parseGetStylesByNamedLayers : function(namedLayers){
		var obj = {
			namedLayers : []	
		};
		
		for(var i in namedLayers) {
			
			var namedObj = {
				name : "",
				title : "",
				featureTypeName : "",
				userStyle : []
			};
			
			var name = namedLayers[i].name;
			// jykw 20160721 for geoserver
            //if (name.length > 0) namedObj.name = name;            
            if ( name != undefined && name.length > 0)	namedObj.name = name;
			
            var description = namedLayers[i].description;
            // jykw 20160721 for geoserver
            //if (description.length > 0) namedObj.title = description.title;            
            if (description != undefined && description.length > 0) namedObj.title = description.title;
            var layerFeatureConstraints = namedLayers[i].LayerFeatureConstraints;
            
            // ggash 20161229 for geoserver - GeoServer의 경우 layerFeatureConstraints property가 없음
            if(!layerFeatureConstraints && namedLayers[i].userStyles[0].name ){
            	layerFeatureConstraints = namedLayers[i].userStyles[0].name;
            }
            // jykw 20160721 for geoserver
            //if (layerFeatureConstraints.length > 0) namedObj.featureTypeName = layerFeatureConstraints;
            if (layerFeatureConstraints != undefined && layerFeatureConstraints.length > 0) 
            	namedObj.featureTypeName = layerFeatureConstraints;     
			
            // ggash 20170111 for geoserver - GeoServer의 경우 layerFeatureConstraints property가 없어 featureTypeName에 값 SET되지 않음
            if(!namedObj.featureTypeName && namedLayers[i].userStyles[0].name){
            	namedObj.featureTypeName = namedLayers[i].userStyles[0].name;
            }
            
			var userStyles = namedLayers[i].userStyles;
			for(var j = 0, jLen = userStyles.length; j < jLen; j++) {
				var userdObj = {
					name : "",
					title : "",
					rules : []
				};
				var name = userStyles[j].name;
                // jykw 20160721 for geoserver                
                //if (name.length > 0) userdObj.name = name;
                if (name != undefined && name.length > 0) userdObj.name = name;                
                var description = userStyles[j].description;
                // jykw 20160721 for geoserver                
                //if (description.length > 0) userdObj.title = description;
                if (description != undefined && description.length > 0) userdObj.title = description;
                var layerName = userStyles[j].layerName;
                // jykw 20160721 for geoserver                
                if (layerName != undefined && layerName.length > 0) userdObj.title = layerName;
				
				var rules = userStyles[j].rules;
				var gServerType = "GeoGate";
				for(var k = 0, kLen = rules.length; k < kLen; k++) {
					var ruleObj = {
						name : "",
						minScale : "",
						maxScale : "",
						symbolizer : {},
						filter : {}
					};
					// ggash 20170111 for geoserver - GeoServer의 경우 layerFeatureConstraints property가 없음
					if(!rules[0].hasOwnProperty('minScaleDenominator')){
						gServerType = "GeoServer";
					}
					// 룰 이름
					ruleObj.name = rules[k].name;
					
					// 최소 축척
					ruleObj.minScale = rules[k].minScaleDenominator;
					
					// 최대 축척
					ruleObj.maxScale = rules[k].maxScaleDenominator;
					
					// 필터
					var filter = rules[k].filter;
					if(filter){
						ruleObj.filter.type = filter.type;
						ruleObj.filter.property = filter.property;
						ruleObj.filter.value = filter.value;
					}
					
					var points = rules[k].symbolizer["Point"];
					var lines = rules[k].symbolizer["Line"];
					var polygons = rules[k].symbolizer["Polygon"];
					var texts = rules[k].symbolizer["Text"];
					
					if(points) {
						var pointObj = {};
	
						var size = points.pointSize;//GeoServer에는  pointSize라는 property 없음
						
						// ggash 20170111 for geoserver
						if(gServerType === "GeoGate") {
							if (size != undefined && size.length > 0) {
								
								pointObj["size"] = size;
								
								if(points.name.indexOf('ImageMarker') != -1) {
									
									pointObj["opacity"] = points.graphicOpacity;
									// 텍스처 이미지 Base64값 가져오기
									var externalGraphic;
									if(!points.href) externalGraphic = points.graphicContent;
									else externalGraphic = points.href;
									if(externalGraphic) pointObj["externalGraphic"] = externalGraphic;
									if(points.rotation) pointObj["rotation"] = points.rotation;
									if(points.angleScale) pointObj["angleScale"] = points.angleScale;
	                        		if(points.angleTranslation) pointObj["angleTranslation"] = points.angleTranslation;
	                        		
								} else if (points.name.indexOf('ShapeMarker') != -1) {
									
	                        		pointObj["graphicName"] = points.graphicName;
	                        		pointObj["fillColor"] = points.fillColor;
	                        		pointObj["fillOpacity"] = points.fillOpacity;
	                        		if(points.strokeColor) pointObj["strokeColor"] = points.strokeColor;
	                        		if(points.strokeOpacity) pointObj["strokeOpacity"] = points.strokeOpacity;
	                        		if(points.strokeWidth) pointObj["strokeWidth"] = points.strokeWidth;
	                        		if(points.strokeLinejoin) pointObj["strokeLinejoin"] = points.strokeLinejoin;
	                        		if(points.strokeLinecap) pointObj["strokeLinecap"] = points.strokeLinecap;
	                        	}
								
								pointObj["opacity"] = points.graphicOpacity;
							}
						}
						//GeoServer와 GeoGate의 심볼처리 방식 고려 수정 필요.
						else if(gServerType === "GeoServer") {
							$.extend(true, pointObj, points);
						}
						
						ruleObj.symbolizer["point"] = pointObj;
					}
					
					if(lines) {
						var lineObj = {};
						
						var name = lines.name;
						//  ggash 20170111 for geoserver
						//	FIXME - GIS엔진을 config에 설정하게끔 수정 필요
						
						if(gServerType === "GeoGate") {
							if(name == "Line") {
								//선 색 strokeColor
								var strokeColor = lines.strokeColor ;
								lineObj["stroke"] = strokeColor;
								
								//선 두께 strokeWidth
								var strokeWidth = lines.strokeWidth ;
								lineObj["strokeWidth"] = strokeWidth;
								
								//선 투명도 strokeOpacity
								var strokeOpacity = lines.strokeOpacity ;
								lineObj["strokeOpacity"] = strokeOpacity;
								
								// 모서리 스타일 strokeLinecap
								var strokeLinecap = lines.strokeLinecap ;
								lineObj["strokeLinecap"] = strokeLinecap;

								// 모서리 스타일 strokeLinecap
								var strokeLinecap = lines.strokeLinecap ;
								
								//선 스타일 strokeLinecap
								var strokeDasharray = lines.strokeDasharray;
								if(strokeDasharray) {
									//console.log("선 스타일 strokeLinecap 지정안됨!");
								} else if (lines.strokeDashStyle) { // ggash 20170111 for geoserver
									lineObj["strokeDashArray"] = lines.strokeDashStyle;
								}else {
									lineObj["strokeDashArray"] = "solid";
								}
							} else if(name == "CompositeLineCap") {
								lineObj.arrow = true;
							} else if(name == "CompositeLineMarker") {
								lineObj.marker = true;
							}
						}
						else if(gServerType === "GeoServer") {
							//선 색 strokeColor
							var strokeColor = lines.strokeColor ;
							if(strokeColor) lineObj["stroke"] = strokeColor;
							
							//선 두께 strokeWidth
							var strokeWidth = lines.strokeWidth ;
							if(strokeWidth) lineObj["strokeWidth"] = strokeWidth;
							
							//선 투명도 strokeOpacity
							var strokeOpacity = lines.strokeOpacity ;
							if(strokeOpacity) lineObj["strokeOpacity"] = strokeOpacity;
							
							// 모서리 스타일 strokeLinecap
							var strokeLinecap = lines.strokeLinecap ;
							if(strokeLinecap) lineObj["strokeLinecap"] = strokeLinecap;
							
							//선 스타일 strokeLinecap
							var strokeDasharray = lines.strokeDasharray;
							if(strokeDasharray) {
								//console.log("선 스타일 strokeLinecap 지정안됨!");
							} else if (lines.strokeDashStyle) { //  ggash 20170111 for geoserver
								lineObj["strokeDashArray"] = lines.strokeDashStyle;
							}else {
								lineObj["strokeDashArray"] = "solid";
							}
						}
						
						ruleObj.symbolizer["line"] = lineObj;
					}
					if(polygons) {
						var polyObj = {};
						
						if(polygons.fill) {
							//면색 fillColor
							var fillColor = polygons.fillColor;
							if(fillColor) polyObj["fillColor"] = fillColor;
							
							//면투명도 fillOpacity
							var fillOpacity = polygons.fillOpacity;
							if(fillOpacity) polyObj["fillOpacity"] = fillOpacity;
						}
						
						// 텍스처 이미지 Base64값 가져오기
						var externalGraphic = polygons.InlineContent;
						if(externalGraphic) polyObj["externalGraphic"] = externalGraphic;
						
						if(lines) {
                        	$.extend(true,polyObj,ruleObj.symbolizer.line);
                        	delete ruleObj.symbolizer.line;
                        }
						ruleObj.symbolizer["polygon"] = polyObj;
					}
					
					if(texts) {
						var textObj = {};
						
						var label = texts.label;
						if(label.length > 0) {
							textObj.label = label
						}
						
						//서체 fontFamily
						var fontFamily = texts.fontFamily;
						if(fontFamily) textObj["fontFamily"] = fontFamily;
						
						//글자 크기 fontSize
						var fontSize = texts.fontSize;
						if(fontSize) textObj["fontSize"] = fontSize;
						
						//글자 스타일 fontStyle
						var fontStyle = texts.fontStyle;
						if(fontStyle) textObj["fontStyle"] = fontStyle;
						
						//글자 두께 fontWeight
						var fontWeight = texts.fontWeight;
						if(fontWeight) textObj["fontWeight"] = fontWeight;
						
						
						if(texts.fill) {
							//글자 색
							var fillColor = texts.fillColor;
							if(fillColor) textObj["fillColor"] = fillColor;
							
							//글자 투명도
							var fillOpacity = texts.fillOpacity;
							if(fillOpacity) textObj["fillOpacity"] = fillOpacity;
							
							//배경 색
							var haloColor = texts.haloColor;
							if(haloColor) textObj["haloColor"] = haloColor;
							//배경 투명도
							var haloOpacity = texts.haloOpacity;
							if(haloOpacity) textObj["haloOpacity"] = haloOpacity;
						}
						
						// 벤더 옵션 처리
						if(texts.backgroundType !== "NONE") {
                        	var backgroundType = texts.backgroundType;
                        	if (backgroundType) textObj["backgroundType"] = backgroundType;
                        	var backgroundFill = texts.backgroundFill;
                        	if (backgroundFill) textObj["backgroundFill"] = backgroundFill;
                        	var backgroundLine = texts.backgroundLine;
                        	if (backgroundLine) textObj["backgroundLine"] = backgroundLine;
                        	var backgroundOffset = texts.backgroundOffset;
                        	if (backgroundOffset) textObj["backgroundOffset"] = backgroundOffset;
                        	var backgroundAlign = texts.backgroundAlign;
                        	if (backgroundAlign) textObj["backgroundAlign"] = backgroundAlign;
                        }
                        var textPointBase = texts.textPointBase;
                    	if (textPointBase) textObj["textPointBase"] = textPointBase;
                    	var textPointPosition = texts.textPointPosition;
                    	if (textPointPosition) textObj["textPointPosition"] = textPointPosition;
                    	var textPointArrange = texts.textPointArrange;
                    	if (textPointArrange) textObj["textPointArrange"] = textPointArrange;
                    	var codeDomain = texts.codeDomain;
                    	if (codeDomain) textObj["codeDomain"] = codeDomain;
                    	var textArrangePos = texts.textArrangePos;
                    	if (textArrangePos) textObj["textArrangePos"] = textArrangePos;
                    	var textArrangeLine = texts.textArrangeLine;
                    	if (textArrangeLine) textObj["textArrangeLine"] = textArrangeLine;
                    	var textArrangeGap = texts.textArrangeGap;
                    	if (textArrangeGap) textObj["textArrangeGap"] = textArrangeGap;
						
						ruleObj.symbolizer["text"] = textObj;
					}
					userdObj.rules.push(ruleObj);
				}
				namedObj.userStyle.push(userdObj);
			}
			obj.namedLayers.push(namedObj);
		}
		return obj.namedLayers;
	},
	
	getFeatureInfo : function(serviceUrl, map, options, callback, callbackParams) {
		var params = {
			service : this.service,
	    	version : this.version,
	    	request : "GetFeatureInfo",
	    	layers : "",
	    	styles : "",
	    	query_layers : "",
	    	info_format : "text/xml",
	    	format : "image/jpeg",
	    	feature_count : 9999,
	    	bbox : map.getExtent().toBBOX(),
	    	i : parseInt(map.getSize().w/2),
	    	j : parseInt(map.getSize().h/2),
	    	height : map.getSize().h,
	    	width : map.getSize().w
		};
		
		if(options.layers && !options.styles) {
			options.styles = options.layers;
		}
		if(options.layers && !options.query_layers) {
			options.query_layers = options.layers;
		}
		
		$.extend(params, options);
		
		var obj = this;
		NUTs.Util.sendProxyGet(serviceUrl, NUTs.Util.fn_convert_objToStr(params), function(res) {
			obj.parseGetFeatureInfo(res, callback, callbackParams);
		});
	},
	
	parseGetFeatureInfo : function(res, callback, callbackParams) {
		var arr = [];
		
		var layers = res.getElementsByTagName("Layer");
		
		for (var i = 0, len = layers.length; i < len; i++) {
			var obj = {};
			
			obj.name = layers[i].getAttribute("name");
			obj.fields = {};
			
			fields = layers[i].getElementsByTagName("Field");
			
			for(var j=0, fLen = fields.length; j < fLen; j++) {
				obj.fields[fields[j].getAttribute("name")] = $(fields[j]).text();
			}
			
			arr.push(obj);
		}
		
		callback(arr, callbackParams);
	}
};
