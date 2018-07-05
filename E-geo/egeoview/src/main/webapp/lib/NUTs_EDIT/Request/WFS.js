/**************************************************************************************************************
 * NUTs.WFS 클래스  
 * @namespace {Object} NUTs.WFS 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/ 

NUTs.WFS = {
		
	SERVICES : "WFS",
	
	VERSION : "1.1.0",
	
	SRSNAME : 'srsName="EPSG:3857"',
	
	REQUEST : null,
	
	format : {
		gml : new NUTs.Format.GML(),
		filter : new OpenLayers.Format.Filter({ version : "1.1.0" }),
		xml : new OpenLayers.Format.XML()
	},
	
	getCapability : function(serviceUrl, callback) {
		var params = NUTs.Util.fn_convert_objToStr({
			SERVICE : this.SERVICES,
			VERSION : this.VERSION,
			REQUEST : "GetCapabilities"
		});
		
		NUTs.Util.sendProxyGet(serviceUrl, params, function(res) {
			var format = new OpenLayers.Format.WFSCapabilities({version : "1.1.0"});
			callback(format.read(res.xml));
		});
	},
	
	extendParams : function(params, options) {
		OpenLayers.Util.extend(params, options);
		
		if(options.tables) {
			//if(CONFIG.fn_get_gisEngineType() === "GeoGate") {
				if(!options.tables instanceof Array)
					params.tables = [options.tables];
			/*}  
			else if(CONFIG.fn_get_gisEngineType() === "GeoServer") { //ggash 20170116 for geoserver
				if (!options.tables instanceof Array) {
					params.tables = [COMMON.fn_get_EditKorLayerNm(options.tables)];
				}
				else{
					var arrAliasInfo = [];
					
					for(var i=0, nTableLen = options.tables.length; i < nTableLen; i++) {
						var sAliasName = COMMON.fn_get_EditKorLayerNm(options.tables[i]);
						if(sAliasName)
							arrAliasInfo.push(sAliasName);
					}
					params.tables = arrAliasInfo;
				}
					
			} */
		}
		if(options.fields && !(options.values instanceof Array)) {
			params.fields = [options.fields];
		}
		if(options.values && !(options.values instanceof Array)) {
			params.values = [options.values];
		}
		if(options.sortFields && !(options.sortFields instanceof Array)) {
			params.sortFields = [options.sortFields];
		}
		if(options.sortOrders && !(options.sortOrders instanceof Array)) {
			params.sortOrders = [options.sortOrders];
		}
	},
	
	getSortBy : function(fields, orders) {
		var str = "";
		
		str += "<ogc:SortBy>";
		
		for(var i=0, len=fields.length; i < len; i++) {
			str += "<ogc:SortProperty>";
			str += "<ogc:PropertyName>";
			str += fields[i];
			str += "</ogc:PropertyName>";
			str += "<ogc:SortOrder>";
			str += orders[i]?orders[i]:"ASC";
			str += "</ogc:SortOrder>";
			str += "</ogc:SortProperty>";
		}
		
		str += "</ogc:SortBy>";
		
		return str;
	},
	
	getFeatureById : function(serviceUrl, parameters, callback, options) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			tables : [],
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);
		
		var queryStr = '';
		for(var i=0, len=params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + ' '+ this.SRSNAME +' >'; //GeoServer - srsName이 누락될 경우 x,y 가 바뀌는 문제 있음
			
			if(i < params.values.length)
				queryStr += '<ogc:Filter xmlns:ogc=\"http://www.opengis.net/ogc\"><ogc:FeatureId fid=\"' + params.tables[i] + '.' + params.values[i] + '\"/></ogc:Filter>';
			
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';
		}
		
		this.getFeature(serviceUrl, params, queryStr, callback, options);
	},
	
	getFeatureByMultiId: function(serviceUrl, parameters, callback, options, sync) {
        var params = {
            maxFeatures: 9999,
            prefix: "",
            tables: [],
            values: [],
            sortFields: [],
            sortOrders: [],
            useDomain: false
        };
        
        //$.extend(params, parameters);
        this.extendParams(params, parameters);
        
        var queryStr = "";
        var useDomain = params.useDomain ? 'useDomain="true"' : "";
        queryStr += '<wfs:Query typeName="' + params.prefix + ":" + params.tables[0] + '" ' + useDomain + " "+ this.SRSNAME +" >";
        queryStr += '<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">';
        for (var i = 0, len = params.values.length; i < len; i++) {
            queryStr += '<ogc:FeatureId fid="' + params.tables[0] + "." + params.values[i] + '"/>';
        }
        if (params.sortFields.length > 0) queryStr += this.getSortBy(params.sortFields, params.sortOrders);
        queryStr += "</ogc:Filter></wfs:Query>"
        this.getFeature(serviceUrl, params, queryStr, callback, options, sync)
    },
	
	getFeatureByComparison : function(serviceUrl, parameters, callback, options) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			type : "==",
			tables : [],
			fields : [],
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);

		var queryStr = '';		
		for(var i=0, len=params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + '  '+ this.SRSNAME +'  >';
			var filter = new OpenLayers.Filter.Comparison({
				type : params.type,
				property : params.fields[i],
				value : params.values[i]
			});
//			queryStr += this.format.filter.write(filter).xml;
			queryStr += this.format.xml.write(this.format.filter.write(filter));
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';
		}
		
		this.getFeature(serviceUrl, params, queryStr, callback, options);
	},
	
	getFeatureByContains: function(serviceUrl, parameters, callback, options, sync) {
        var params = {
            maxFeatures: 9999,
            prefix: "",
            type: OpenLayers.Filter.Spatial.CONTAINS,
            tables: [],
            values: [],
            sortFields: [],
            sortOrders: [],
            useDomain: false
        };
        this.extendParams(params, parameters);
        var queryStr = "";
        var oXMLHttpRequest = window.XMLHttpRequest;
        var bGecko = !!window.controllers,
            bIE = window.document.all && !window.opera,
            bIE7 = bIE && (window.navigator.userAgent.match(/MSIE ([\.0-9]+)/) && RegExp.$1 == 7 || window.navigator.userAgent.match("rv:11.0"));
        for (var i = 0, len = params.tables.length; i < len; i++) {
            var useDomain = params.useDomain ? 'useDomain="true"' : "";
            queryStr += '<wfs:Query typeName="' +
                params.prefix + ":" + params.tables[i] + '" ' + useDomain + " "+ this.SRSNAME +" >";
            var filter = new OpenLayers.Filter.Spatial({
                type: params.type,
                property: "geom",
                value: params.values[0],
            });
            if (oXMLHttpRequest && !bIE7) queryStr += this.format.xml.write(this.format.filter.write(filter));
            else queryStr += this.format.filter.write(filter).xml;
            if (params.sortFields.length > 0) queryStr += this.getSortBy(params.sortFields, params.sortOrders);
            queryStr += "</wfs:Query>"
        }
        this.getFeature(serviceUrl, params, queryStr, callback, options,sync)
    },
	
	getFeatureByWithin: function(serviceUrl, parameters, callback, options, sync) {
        var params = {
            maxFeatures: 9999,
            prefix: "",
            type: OpenLayers.Filter.Spatial.WITHIN,
            tables: [],
            values: [],
            sortFields: [],
            sortOrders: [],
            useDomain: false
        };
        this.extendParams(params, parameters);
        var queryStr = "";
        var oXMLHttpRequest = window.XMLHttpRequest;
        var bGecko = !!window.controllers,
            bIE = window.document.all && !window.opera,
            bIE7 = bIE && (window.navigator.userAgent.match(/MSIE ([\.0-9]+)/) && RegExp.$1 == 7 || window.navigator.userAgent.match("rv:11.0"));
        for (var i = 0, len = params.tables.length; i < len; i++) {
            var useDomain = params.useDomain ? 'useDomain="true"' : "";
            queryStr += '<wfs:Query typeName="' +
                params.prefix + ":" + params.tables[i] + '" ' + useDomain + " "+ this.SRSNAME +" >";
            var filter = new OpenLayers.Filter.Spatial({
                type: params.type,
                property: "geom",
                value: params.values[0],
            });
            if (oXMLHttpRequest && !bIE7) queryStr += this.format.xml.write(this.format.filter.write(filter));
            else queryStr += this.format.filter.write(filter).xml;
            if (params.sortFields.length > 0) queryStr += this.getSortBy(params.sortFields, params.sortOrders);
            queryStr += "</wfs:Query>"
        }
        this.getFeature(serviceUrl, params, queryStr, callback, options,sync)
    },
	
	getFeatureByDWithin : function(serviceUrl, parameters, callback, options, sync) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			type : OpenLayers.Filter.Spatial.DWITHIN,
			tables : [],
			distance : 1000,
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);
		
		var queryStr = '';		
		var oXMLHttpRequest    = window.XMLHttpRequest;
		var bGecko    = !!window.controllers,
		bIE        = window.document.all && !window.opera,
		bIE7    = bIE && ((window.navigator.userAgent.match(/MSIE ([\.0-9]+)/) && RegExp.$1 == 7) ||(window.navigator.userAgent.match("rv:11.0")));

		for (var i = 0, len = params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + ' '+ this.SRSNAME +' >';
			var filter = new OpenLayers.Filter.Spatial({
				type: params.type,
				property : "geom",
				value: params.values[0],
				distance: params.distance
				//,distanceUnits: 'm'
			});
			
			
			/*
			filterStr += this.format.xml.write(this.format.filter.write(filter));
			filterStr += '</wfs:Query>';
			*/
			if(oXMLHttpRequest && !bIE7)
				queryStr += this.format.xml.write(this.format.filter.write(filter));				//Chrome
			else
				queryStr += this.format.filter.write(filter).xml;	//IE
						
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';

		}
		
		//this.getFeature(serviceUrl, params, filterStr, callback, options);
		this.getFeature(serviceUrl, params, queryStr, callback, options, sync);
	},
	
	getFeatureByGeometry : function(serviceUrl, parameters, callback, options, sync) {
		var params = {
			maxFeatures : 9999,
			prefix : "",
			type : OpenLayers.Filter.Spatial.INTERSECTS,
			tables : [],
			values : [],
			sortFields : [],
			sortOrders : [],
			useDomain : false
		};
		
		this.extendParams(params, parameters);
		
		var queryStr = '';		
		for (var i = 0, len = params.tables.length; i < len; i++) {
			var useDomain = params.useDomain?'useDomain="true"':'';
			queryStr += '<wfs:Query typeName="' + params.prefix + ':' + params.tables[i] + '" ' + useDomain + ' '+ this.SRSNAME +' >';
			var filter = new OpenLayers.Filter.Spatial({
				type: params.type,
				property : "geom",
				value: params.values[0]
			});
			
			queryStr += this.format.xml.write(this.format.filter.write(filter));
			
			//queryStr += this.format.filter.write(filter).xml;
			
			if(params.sortFields.length > 0)
				queryStr += this.getSortBy(params.sortFields, params.sortOrders);
			
			queryStr += '</wfs:Query>';
		}
		this.getFeature(serviceUrl, params, queryStr, callback, options, sync);
		//this.getFeature(serviceUrl, params, filterStr, callback, options);
	},
	
	
	getFeature : function(serviceUrl, params, filter, callback, options, sync) {
		var wfsStr = '';
		wfsStr += '<wfs:GetFeature service="WFS" version="1.1.0" maxFeatures="' + params.maxFeatures + '" xmlns:ehmp="http://health-e-waterways.org" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">';
		wfsStr += filter;
		wfsStr += '</wfs:GetFeature>';

		var control = this;
		if(sync){
			NUTs.Util.sendProxyPostSync(				
					serviceUrl,
					wfsStr,
					function(res) {
						control.parseGetFeature(res, callback, options);
					}
				);
		}else{
			NUTs.Util.sendProxyPost(				
					serviceUrl,
					wfsStr,
					function(res) {
						control.parseGetFeature(res, callback, options);
					}
				);
		}		
	},
	
	parseGetFeature : function(res, callback, options) {
		if(res.responseXML) {
			res = res.responseXML;
		}
		
		var arr = [];
		var success = true;

		var featureCollection;
		
		// CJH. 수정 this.getBrowserName()에서 - 자체 정의한 func으로 변경 처리하고 있으나 후에 openlayers버전을 올리는 게 맞을 듯....ie12는 또 다를수 있으니..
		// IE11부터는 msie가 userAgent에서 제외됨에 따른 처리! 
		if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
			featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
		}
		else {
			featureCollection = res.getElementsByTagName("FeatureCollection");
		}
		
		if(featureCollection && featureCollection[0]) {
			if(featureCollection[0].getAttribute("numberOfFeatures") != 0) {
				var featureMembers;

				if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
					featureMembers = featureCollection[0].getElementsByTagName("gml:featureMember");
					if(featureMembers.length == 0){
						featureMembers = featureCollection[0].getElementsByTagName("gml:featureMembers")[0].childNodes;
					}
				}
				else {
					featureMembers = featureCollection[0].getElementsByTagName("featureMember");
				}
				
				
				for(var i=0, len = featureMembers.length; i < len; i++) {
					var tmpArr = featureMembers[i].getAttribute("gml:id").split("."); //CJH 2017-03-23 : for geoserver -> attr : fid 대신 gml:id
					
					//같은 테이블인지 체크 후 테이블 아래로 여러 레코드 들이 들어가게 함
					var tmpTable = tmpArr[0];
					var index = null;
					for(var j in arr) {
						if(arr[j].table == tmpTable) {
							index = j;
							break;
						}; 
					}
					
					if(!index) {
						var obj = {
							table : tmpTable,	//테이블 명
							results : []		//레코드 들
						};
						arr.push(obj);
					}
					else {
						obj = arr[index];
					}
					
					//한개의 레코드
					var result = {
						g2id : tmpArr[1],	//FID 필드 (PK)
						feature : null,		//도형
						title : tmpArr[1],	//제목
						fields : {}			//필드들
					};
					//debugger;
					var field = featureMembers[i].firstChild;
					while(field) {
						//도형
						if(field.tagName.replace(field.prefix+":", "").toLowerCase() == "the_geom" || field.tagName.replace(field.prefix+":", "").toLowerCase() == "geom") {
							// usolver에서 공통 obj로 관리하기 위해 OpenLayers가 생성한 Feature(parsedFeature)에 아래 Custom 속성을 추가함 - ehyun.2016.06.10  
							var parsedFeature = this.format.gml.parseFeature(field);

							
							parsedFeature.attributes.fid = featureMembers[i].getAttribute("gml:id");
							parsedFeature.renderIntent = '';
							parsedFeature.featureType = (parsedFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','')).toLowerCase();
							parsedFeature.modified = {
									geometry : {}
							};
							result["feature"] = parsedFeature;
						}
						//속성
						else {
							//대표 속성
							if(options && options.titles && options.titles[obj.table] && field.tagName.replace(field.prefix+":", "").toLowerCase() == options.titles[obj.table].toLowerCase()) {
								if(typeof field.text === 'undefined')
									result.title = field.textContent;
								else
									result.title = field.text;
									
								/*if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
									result.title = field.text;
								}
								else {
									result.title = field.textContent;
								}*/								
							}
							//속성
							if(field.tagName.replace(field.prefix+":", "").toLowerCase() != "boundedby") {
								
								if(typeof field.text === 'undefined')
									result.fields[field.tagName.replace(field.prefix+":", "")] = field.textContent;
								else
									result.fields[field.tagName.replace(field.prefix+":", "")] = field.text;
								
								/*if(this.getBrowserName() == "msie" || this.getBrowserName() == "firefox") {
									result.fields[field.tagName.replace(field.prefix+":", "").toLowerCase()] = field.text;
								}
								else {
									result.fields[field.tagName.replace(field.prefix+":", "").toLowerCase()] = field.textContent;
								}*/
							}
						}
						
						field = field.nextSibling;
					}
					
					result.feature.fid = featureMembers[i].getAttribute("gml:id");
					obj.results.push(result);
				}
			}
		}
		else {
			success = false; 
		}
		
		if(options && options.alias) {
			this.getRequestAlias(arr, success, callback, options);
		}
		else {
			callback({
				data : arr,
				success : function() {
					return success;
				}
			});
		}
	},

	// IE11부터는 msie가 userAgent에서 제외됨에 따른 처리! 
	getBrowserName : function() {
		var name = "";
	    var ua = navigator.userAgent.toLowerCase();
	    if (ua.indexOf("opera") != -1) {
	        name = "opera";
	    } else if (ua.indexOf("msie") != -1 || (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)) {
	        name = "msie";
	    } else if (ua.indexOf("safari") != -1) {
	        name = "safari";
	    } else if (ua.indexOf("mozilla") != -1) {
	        if (ua.indexOf("firefox") != -1) {
	            name = "firefox";
	        } else {
	            name = "mozilla";
	        }
	    }
	    return name;
	}, 

	insert : function(serviceUrl, features, prefix, table, fields, values, callback) {
		if(features && !(features instanceof Array)) {
			features = [features];
		}

		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf">';
		wfsStr += '<wfs:Insert>';
		wfsStr += '<' + prefix + ':' + table + ' xmlns:' + prefix + '="http://geogate.g-inno.com/dataserver/' + prefix + '">';
		wfsStr += '<' + prefix + ':geom>';
		wfsStr += this.createGmlXml(features);
		wfsStr += '</' + prefix + ':geom>';
		if(fields && fields.length > 0) wfsStr += this.createAttrXml(prefix, fields, values);
		wfsStr += '</' + prefix + ':' + table + '>';
		wfsStr += '</wfs:Insert>';
		wfsStr += '</wfs:Transaction>';
		
		$("#txtTest").val(wfsStr);
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var arr = [];
					
					var totalInserted = transactionResponse[0].getElementsByTagName("wfs:totalInserted");
					var featureId = transactionResponse[0].getElementsByTagName("ogc:FeatureId");
					
					for(var i=0, len=featureId.length; i < len; i++) {
						arr.push(featureId[i].getAttribute("fid"));
					}
					
					if(callback) {
						callback({
							count : totalInserted[0].text,
							ids : arr 
						});
					}
				}
			}
		);
	},
	
	update : function(serviceUrl, features, prefix, table, fields, values, value, callback) {
		if(features && !(features instanceof Array)) {
			features = [features];
		}

		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf">';
		
		wfsStr += '<wfs:Update typeName="' + prefix + ':' + table + '" xmlns:' + prefix + '="http://geogate.g-inno.com/dataserver/' + prefix + '">';
		wfsStr += '<wfs:Property>';
		wfsStr += '<wfs:Name>geom</wfs:Name>';
		wfsStr += '<wfs:Value>';
		wfsStr += this.createGmlXml(features);
		wfsStr += '</wfs:Value>';
		wfsStr += '</wfs:Property>';

		if(fields && fields.length > 0) wfsStr += this.updateAttrXml(fields, values);
		
		wfsStr += '<ogc:Filter>';
		wfsStr += '<ogc:PropertyIsEqualTo matchCase="true">';
		wfsStr += '<ogc:PropertyName>' + table + '.FID</ogc:PropertyName> ';
		wfsStr += '<ogc:Literal>' + value + '</ogc:Literal> ';
		wfsStr += '</ogc:PropertyIsEqualTo>';
		wfsStr += '</ogc:Filter>';
		
		wfsStr += '</wfs:Update>';
		wfsStr += '</wfs:Transaction>';
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var totalUpdated = transactionResponse[0].getElementsByTagName("wfs:totalUpdated");
					
					if(callback) {
						callback({
							count : totalUpdated[0].textContent
						});
					}
				}
			}
		);
	},
	
	del : function(prefix, table, value, callback) {
		var wfsStr = '';
		wfsStr += '<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sf="http://cite.opengeospatial.org/gmlsf" releaseAction="ALL">';
		wfsStr += '<wfs:Delete typeName="' + prefix + ':' + table + '">';
		wfsStr += '<ogc:Filter xmlns:ogc=\"http://www.opengis.net/ogc\"><ogc:FeatureId fid=\"' + table + '.' + value + '\"/></ogc:Filter>';
		wfsStr += '</wfs:Delete>';
		wfsStr += '</wfs:Transaction>';
		
		var control = this;
		NUTs.Util.sendProxyPostSync(
			serviceUrl,
			wfsStr,
			function(res) {
				var transactionResponse = res.getElementsByTagName("wfs:TransactionResponse");
				
				if(transactionResponse.length > 0) {
					var totalDeleted = transactionResponse[0].getElementsByTagName("wfs:totalDeleted");
					
					if(callback) {
						callback({
							count : totalDeleted[0].textContent
						});
					}
				}
			}
		);
	},
	
	createGmlXml :function(features) {
		var lineCount = 0;
		for ( var i in features) {
			if (features[i].geometry.CLASS_NAME == "OpenLayers.Geometry.LineString")
				lineCount++;
		}
		
		var xmlStr = "";
		
		if (features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
			xmlStr += this.createPointXml(features[0].geometry);
		}
		//LineString 이 1개
		if (lineCount == 1) {
			xmlStr += '<gml:LineString xmlns:gml="http://www.opengis.net/gml">';
			xmlStr += this.createLineStringXml(features[0].geometry);
			xmlStr += '</gml:LineString>';
		}
		//LineString 이 2 개 이상이면 MultiLineString (MultiCurve 는 WMS 오류 있음)
		else if (lineCount > 1) {
			xmlStr += '<gml:MultiLineString xmlns:gml="http://www.opengis.net/gml">';
			for ( var i in features) {
				if (features[i].geometry.CLASS_NAME == "OpenLayers.Geometry.LineString") {
					xmlStr += '<gml:lineStringMember><gml:LineString>';
					xmlStr += this.createLineStringXml(features[i].geometry);
					xmlStr += '</gml:LineString></gml:lineStringMember>';
				}
			}
			xmlStr += '</gml:MultiLineString>';
		}
		
		if(features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon"){
			xmlStr += '<gml:Polygon xmlns:gml="http://www.opengis.net/gml">';
			xmlStr += '<gml:exterior>';
			xmlStr += '<gml:LinearRing>';
			xmlStr += this.createPolygonXml(features[0].geometry);
			xmlStr += '</gml:LinearRing>';
			xmlStr += '</gml:exterior>';
			xmlStr += '</gml:Polygon>';
		}
		
		return xmlStr;
	},
	
	//point XML 생성
	createPointXml : function(geometry) {
		var str = '';
		str += '<gml:Point xmlns:gml="http://www.opengis.net/gml"><gml:pos>';
		str += geometry.x + " ";
		str += geometry.y;
		str += '</gml:pos></gml:Point>';
		return str;
	},
	
	//line String XML 을 생성
	createLineStringXml : function(geometry) {
		var str = '';
		str += '<gml:posList>';
		for ( var i in geometry.components) {
			str += geometry.components[i].x + " ";
			str += geometry.components[i].y + " ";
		}
		str += '</gml:posList>';
		return str;
	},
	
	//polygon String XML 을 생성
	createPolygonXml : function(geometry){
		var geom = geometry.components[0];
		var str = '';
		str += '<gml:posList srsDimension="2" dimension="2">';
		for (var i in geom.components) {
			str += geom.components[i].x + " ";
			str += geom.components[i].y + " ";
		}
		str += '</gml:posList>';
		return str;
	},
	
	createAttrXml : function(prefix, fields, values) {
		var str = '';
		for(var i=0,len=fields.length; i<len; i++) {
			str += '<'+prefix+':'+fields[i]+'>'+values[i]+'</'+prefix+':'+fields[i]+'>';
		}
		return str;
	},
	
	updateAttrXml : function(fields, values) {
		var str = '';
		for(var i=0,len=fields.length; i<len; i++) {
			str += "<wfs:Property>";
			str += "<wfs:Name>" + fields[i] + "</wfs:Name>";
			str += "<wfs:Value>" + values[i] + "</wfs:Value>";
			str += "</wfs:Property>";
		}
		return str;
	},
	
	/**********************************************************************************
	 * 함수명 : getRequestAlias
	 * 설 명 : layer, field 명을 alias 명으로 변환
	 * 인 자 : obj (속성정보 결과 배열)
	 * 사용법 : getRequestAlias(obj)
	 * 작성일 : 2011.05.19
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.05.19		최원석		최초 생성
	 * 
	 **********************************************************************************/
	getRequestAlias : function(arr, success, callback, options) {
		var control = this;

		var tables = [];
		var fields = [];
		for(var i=0, len=arr.length; i < len; i++) {
			for (var j in arr[i].results[0].fields) {
				tables.push(arr[i].table);
				fields.push(j);
			}
		}
		
		$.post(
			"/gmap/attr/getAlias.do",
			{
				tables : tables.join(),
				fields : fields.join()
			}, 
			function (res) {
				for(var i=0, len=arr.length; i < len; i++) {
					arr[i].alias = res.data[i];
				}
				
				//트리거 이벤트 실행
				callback({
					data : arr,
					success : function() {
						return success;
					}
				});
			},
			"json"
		);
	},
	
	orderGetFeatureArr : function(arr, field, order) {
		var len = arr.length;
		for(var i=len-1; i > 0; i--) {
			for(var j=0; j < i; j++) {
				if(order.toLowerCase() == 'desc') {
					if(arr[j]["fields"][field] < arr[j+1]["fields"][field]) {
						NUTs.Util.Array.fn_swap_element(arr, j, j+1);
					}
				}
				else {
					if(arr[j]["fields"][field] > arr[j+1]["fields"][field]) {
						NUTs.Util.Array.fn_swap_element(arr, j, j+1);
					}
				}
			}
		}				
	}
};
