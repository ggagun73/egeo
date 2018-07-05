
NUTs.WPS = {
		
	SERVICES : "WPS",
	
	VERSION : "1.0.0",
	
	format : {
		gml : new OpenLayers.Format.GML(),
		filter : new OpenLayers.Format.Filter({ version : "1.0.0" })
	},

	getNearFeature : function(serviceUrl, dataInputs, callback) {
		var params = {
			Service : this.SERVICES,
			Version : this.VERSION,
			Request : "Execute",
			Identifier : "NearFeature",
			DataInputs : "",
			Responsedocument : "NEARFEATURE_OUTPUT"
		};
		
		params.DataInputs = "[";
		params.DataInputs += NUTs.Util.fn_convert_objToStr(dataInputs, ";");
		params.DataInputs += "]";
		
		var control = this;
		NUTs.Util.sendProxyPost(
			serviceUrl,
			NUTs.Util.fn_convert_objToStr(params),
			function(res) {
				control.parseGetFeature(res, callback);
			}
		);
	},
	
	parseGetFeature : function(res, callback) {
		var arr = [];
		var success = true;
		
		var featureCollection = res.getElementsByTagName("wfs:FeatureCollection");
		
		if(featureCollection && featureCollection[0]) {
			var featureMembers = featureCollection[0].getElementsByTagName("gml:featureMember");
			
			for(var i=0, len = featureMembers.length; i < len; i++) {
				for(var i=0, len = featureMembers.length; i < len; i++) {
					var tables = featureMembers[i].firstChild;
					
					var tmpTable = tables.tagName;
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
						feature : null,		//도형
						fields : {}			//필드들
					};
					
					var field = featureMembers[i].firstChild.firstChild;
					while(field) {
						//도형
						if(field.tagName.toLowerCase() == "geometry") {
							// usolver에서 공통 obj로 관리하기 위해 OpenLayers가 생성한 Feature(parsedFeature)에 아래 Custom 속성을 추가함 - ehyun.2016.06.10  
							var parsedFeature = this.format.gml.parseFeature(field);
							parsedFeature.attributes.fid = '';
							parsedFeature.renderIntent = '';
							parsedFeature.featureType = (parsedFeature.geometry.CLASS_NAME.replace('OpenLayers.Geometry.','')).toLowerCase();
							parsedFeature.modified = {
									geometry : {}
							};
							result["feature"] = parsedFeature;
						}
						//속성
						else {
							if(typeof field.text === 'undefined')
								result.fields[field.tagName] = field.textContent;
							else
								result.fields[field.tagName] = field.text;
							
							
						}
						field = field.nextSibling;
					}
					obj.results.push(result);
				}
			}
		}
		else {
			success = false; 
		}
		
		callback({
			data : arr,
			success : function() {
				return success;
			}
		});
	},
	
	getHoldWaterInfo : function(serviceUrl, dataInputs, callback){
		var params = {
			Service : this.SERVICES,
			Version : this.VERSION,
			Request : "Execute",
			Identifier : "HoldWater",
			DataInputs : "",
			Responsedocument : "HOLDWATER_OUTPUT"
		};
		params.DataInputs = "[";
		params.DataInputs += NUTs.Util.fn_convert_objToStr(dataInputs, ";");
		params.DataInputs += "]";
		
		var control = this;
		NUTs.Util.sendProxyPost(
			serviceUrl,
			NUTs.Util.fn_convert_objToStr(params),
			function(res) {
				control.parseHoldWaterInfo(res, callback);
			}
		);
	},
	
	parseHoldWaterInfo : function(res, callback) {
		var arr = [];
		var success = true;
		var results = {};
		var holdWater = res.getElementsByTagName("prof:HoldWater");
		
		var obj = {
			results : []	
		};
		arr.push(obj);
		
		var result = {
				pipes : [],
				valves : [],
				fires : []
		};
		
		if(holdWater && holdWater[0]){
			var field = holdWater[0].firstChild;
			var fieldText = field.text;
			if(typeof fieldText === 'undefined'){
				fieldText = field.textContent;
			}
			while(field){
				if(field.tagName.toLowerCase().split(":")[1] == "pipes"){
					result["pipes"].push(fieldText);
				}
				else if(field.tagName.toLowerCase().split(":")[1] == "valves"){
					result["valves"].push(fieldText);
				}
				else if(field.tagName.toLowerCase().split(":")[1] == "fires"){
					result["fires"].push(fieldText);
				}
				field = field.nextSibling;
			}
			obj.results.push(result);
		}
		else {
			success = false; 
		}
		
		callback({
			data : arr,
			success : function() {
				return success;
			}
		});
	}
};