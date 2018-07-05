/**************************************************************************************************************
 * SLDTool 클래스   
 * @namespace {Object} NUTs.Tool.SLDTool
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Tool.SLDTool = OpenLayers.Class({
	
	/*
	 *  SLD_BODY의 JSON 객체 타입
	 */
	data : null,
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description NUTs SLD 객체 생성
	* @param {String} sld : SLD_BODY의 XML String 형태
	* @param {String} type : 'xml', 'obj' 
	* @param {Object} options : Layer options
	*/
	initialize : function(sld,type){
		if(type == "xml"){
			this.data = this.getSLDObj(sld);
		}
		else if(type == "obj"){
			this.data = sld.data;
		}
		
	},
	
	getData : function() {
		return this.data;
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY를 Object(Json)형태로 변환
	* @param {String} xml : SLD_BODY의 XML String 형태  
	*/
	getSLDObj : function(xml) {
		var data;
		var namedObj;
		var userdObj;
		var ruleObj;
		
		var namedLayers;
		var userStyles;
		var rules;
		
		data = this.readMapTopic(xml);
		
		namedLayers = xml.getElementsByTagName("sld:NamedLayer");
		for(var i=0, iLen=namedLayers.length ; i < iLen ; i++){
			namedObj =  this.readNamedLayer(namedLayers[i]);
			userStyles = namedLayers[i].getElementsByTagName("sld:UserStyle");
			for(var j=0, jLen=userStyles.length ; j < jLen ; j++){
				userdObj = this.readUserStyle(userStyles[j]);
				rules = userStyles[j].getElementsByTagName("se:Rule");
				for(var k=0, kLen=rules.length ; k < kLen ; k++){
					ruleObj = this.readRule(rules[k]);
					userdObj.rules.push(ruleObj);
				}
				namedObj.userStyle.push(userdObj);
			}
			data.namedLayers.push(namedObj);
		}
		
		return data;
	},


	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 MapTopic부분의 정보를 파싱하고 Object(Json)형태로 return
	* @param {String} xml : SLD_BODY의 XML String 형태  
	*/
	readMapTopic : function(xml){
		var data = {
				name : "",
				title : "",
				namedLayers : []
		};
		
		var element = xml.getElementsByTagName("se:Name");
		
		// MapTopic 명  (서울 상수 맵토픽 이름 : MapTopic)
		if(element.length > 0) {
			data.name = xml.getElementsByTagName("se:Name")[0].text;
		}
		
		element = xml.getElementsByTagName("se:Description");
		
		if(element.length > 0){
			var subElement = element[0].getElementsByTagName("se:Title");
			if(subElement.length > 0) data.title = subElement[0].text;
		}
		
		return data;
		
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 NamedLayer부분의 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object} namedLayers (SLD_BODY의 NamedLayer 엘리먼트 == <sld:NamedLayer>)
	*/
	readNamedLayer : function(namedLayers){
		var namedObj = {
			name : "",
			title : "",
			featureTypeName : "",
			userStyle : []
		};
		
		// NamedLayer 이름 ( 예> 제수밸브 )
		var element = namedLayers.getElementsByTagName("se:Name");
		if(element.length > 0) namedObj.name = element[0].text;
		
		// Description (위의 NamedLayer명과 동일)
		element = namedLayers.getElementsByTagName("se:Description");
		if(element.length > 0) {
			var subElement = element[0].getElementsByTagName("se:Title");
			if(subElement.length > 0) namedObj.title = subElement[0].text;
		}
		
		// LayerFeatureConstraints ( NamedLayer의 DB 명칭 : 예> TE_RVLV )
		element = namedLayers.getElementsByTagName("sld:LayerFeatureConstraints");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("se:FeatureTypeName");
			if(subElement.length > 0) namedObj.featureTypeName = subElement[0].text;
		}
		
		return namedObj;
		
	},


	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 MapTopic부분의 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object} userStyles : SLD_BODY의 UserStyle 엘리먼트 == <sld:UserStyle>
	*/
	readUserStyle : function(userStyles){
		// UserStyle
		var userdObj = {
			name : "",
			title : "",
			featureTypeName : "",
			rules : []
		};
		
		// UserStyle 이름 (현재 상수에선 따로 사용하지 않는다.)
		var element = userStyles.getElementsByTagName("se:Name");
		if(element.length > 0) userdObj.name = element[0].text;
		
		// Description (위의 UserStyle 이름과 동일)
		element = userStyles.getElementsByTagName("se:Description");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("se:Title");
			if(subElement.length > 0) userdObj.title = subElement[0].text;
		}
		
		// FeatureTypeStyle (위의 UserStyle 이름과 동일)
		element = userStyles.getElementsByTagName("se:FeatureTypeStyle");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("se:FeatureTypeName");
			if(subElement.length > 0) userdObj.featureTypeName = subElement[0].text;
		}
			
		return userdObj;
		
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 MapTopic부분의 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object} rules (SLD_BODY의 Rule 엘리먼트 == <se:Rule>)
	*/
	readRule : function(rules){
		var ruleObj = {
			name : "",
			filterName : "",
			filterLiteral : "",
			minScale : "",
			maxScale : "",
			symbolizer : {}
		};
		
		// Rule 이름 ( 예> 제수밸브의 개, 폐, 부분 )
		var element = rules.getElementsByTagName("se:Name");
		if(element.length > 0) ruleObj.name = element[0].text;
		
		// Filter (사업소경계중 남부수도사업소만 보여주고 싶을 때)
		element = rules.getElementsByTagName("ogc:Filter");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("PropertyIsEqualTo");
			if(subElement.length > 0) {
				ruleObj.filterName_equal = subElement[0].getElementsByTagName("ogc:PropertyName")[0].text;
				ruleObj.filterLiteral_equal = subElement[0].getElementsByTagName("Literal")[0].text;
			}
			
			subElement = element[0].getElementsByTagName("PropertyIsGreaterThanOrEqualTo");
			if(subElement.length > 0){
				ruleObj.filterName_more = [];
				ruleObj.more = [];
				for(var i=0,len=subElement.length ; i<len ; i++){
					ruleObj.filterName_more.push(subElement[i].getElementsByTagName("ogc:PropertyName")[0].text);
					ruleObj.more.push(subElement[i].getElementsByTagName("Literal")[0].text);
				}
			}
			subElement = element[0].getElementsByTagName("PropertyIsLessThan");
			if(subElement.length > 0){
				ruleObj.filterName_less = [];
				ruleObj.less = [];
				for(var i=0,len=subElement.length ; i<len ; i++){
					ruleObj.filterName_less.push(subElement[i].getElementsByTagName("ogc:PropertyName")[0].text);
					ruleObj.less.push(subElement[i].getElementsByTagName("Literal")[0].text);
				}
			}
			
			subElement = element[0].getElementsByTagName("PropertyIsGreaterThan");
			if(subElement.length > 0){
				ruleObj.filterName_greater = subElement[0].getElementsByTagName("ogc:PropertyName")[0].text; 
				ruleObj.filterLiteral_greater = subElement[0].getElementsByTagName("Literal")[0].text;
			}
		}
		// MinScaleDenominator (유효축척의 MinScale값)
		element = rules.getElementsByTagName("se:MinScaleDenominator");
		if(element.length > 0) ruleObj.minScale = element[0].text;
		
		// MaxScaleDenominator (유효축척의 MaxScale값)
		element = rules.getElementsByTagName("se:MaxScaleDenominator");
		if(element.length > 0) ruleObj.maxScale = element[0].text;
		
		// Symbolizer (종류 : PointSymbolizer, LineSymbolizer, PolygonSymbolizer, TextSymbolizer)
		var points = rules.getElementsByTagName("se:PointSymbolizer");
		var lines = rules.getElementsByTagName("se:LineSymbolizer");
		var polygons = rules.getElementsByTagName("se:PolygonSymbolizer");
		var texts = rules.getElementsByTagName("se:TextSymbolizer");
		
		if(points.length > 0) {
			ruleObj.symbolizer["point"] = this.readPointSym(points);
		}
		
		if(lines.length > 0) {
			for(var i=0,len=lines.length ; i<len ; i++){
				if(i == 0){
					ruleObj.symbolizer["line"] = this.readLineSym(lines[i]);
				}
				else{
					ruleObj.symbolizer["line" + i] = this.readLineSym(lines[i]);
				}
			}
		}
		
		if(polygons.length > 0) {
			ruleObj.symbolizer["polygon"] = this.readPolySym(polygons);
		}
		
		if(texts.length > 0) {
			ruleObj.symbolizer["text"] = this.readTextSym(texts);
		}
		
		return ruleObj;
		
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 Rule내부의 PointSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object} points : (SLD_BODY의 PointSymbolizer 엘리먼트 == <se:PointSymbolizer>)
	*/
	readPointSym : function(points){
		var pointObj = {};
		
		// PointSymbolizer 타입
		pointObj["type"] = "point";
		
		// PointSymbolizer 버전
		pointObj["version"] = points[0].getAttribute("version");
		
		// PointSymbolizer 이름
		var symbolName = points[0].getElementsByTagName("se:Name");
		if(symbolName.length > 0) pointObj["name"] = symbolName[0].text;
		
		// Point Size 크기
		var svgParam = points[0].getElementsByTagName("se:Size");
		if(svgParam.length > 0) pointObj["size"] = svgParam[0].text;
		
		// Point Opacity 투명도
		svgParam = points[0].getElementsByTagName("se:Opacity");
		//if(svgParam.length > 0) pointObj["opacity"] = svgParam[0].text;
		if(svgParam.length > 0) pointObj["opacity"] = "1.0";
		
		// Point Rotation 회전
		svgParam = points[0].getElementsByTagName("se:Rotation");
		if(svgParam.length > 0) {
			var rotation = svgParam[0].getElementsByTagName("ogc:PropertyName");
			if(rotation.length > 0) pointObj["rotation"] = rotation[0].text;
		}
		
		
		// Point Displacement X,Y
		svgParam = points[0].getElementsByTagName("se:Displacement");
		if(svgParam.length > 0) {
			var x = svgParam[0].getElementsByTagName("se:DisplacementX");
			if(x.length > 0) pointObj["displacementX"] = x[0].text;
			
			var y = svgParam[0].getElementsByTagName("se:DisplacementY");
			if(y.length > 0) pointObj["displacementY"] = y[0].text;
		}
		
		// Point Symbol Image 심볼이미지
		var externalGraphics = points[0].getElementsByTagName("se:ExternalGraphic");
		if(externalGraphics.length > 0) {
			// InlineContent (Base64인코딩된 이미지)
			var inlineContents = externalGraphics[0].getElementsByTagName("se:InlineContent");
			if(inlineContents.length > 0) {
				pointObj["externalGraphic"] = inlineContents[0].text;
				pointObj["encoding"] = inlineContents[0].getAttribute("encoding");
			}
			
			// Format (이미지 형식 : 예> image/png)
			var format = externalGraphics[0].getElementsByTagName("se:Format");
			if(format.length > 0) pointObj["format"] = format[0].text;
		}
		
		// Point Symbol Mark 심볼마커
		var graphic = points[0].getElementsByTagName("se:Graphic");
		if(graphic.length > 0){
			var mark = graphic[0].getElementsByTagName("se:Mark");
			if(mark.length > 0){
				var vendor = mark[0].getElementsByTagName("sld:VendorOption");
				for(var i=0, len=vendor.length ; i < len ; i++){
					if(vendor[i].getAttribute("name") == "font-family"){
						pointObj["markFont"] = vendor[i].text;
					}
					else if(vendor[i].getAttribute("name") == "char-code"){
						pointObj["markCharCode"] = vendor[i].text;
					}
					else if(vendor[i].getAttribute("name") == "fill"){
						pointObj["markFill"] = vendor[i].text;
					}
				}
			}
		}
		return pointObj;
		
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 Rule내부의 LineSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object}lines (SLD_BODY의 LineSymbolizer 엘리먼트 == <se:LineSymbolizer>)
	*/
	readLineSym : function(lines){
		var lineObj = {};
		
		// LineSymbolizer 타입
		lineObj["type"] = "line";
		
		// LineSymbolizer 버전
		lineObj["version"] = lines.getAttribute("version");
		
		// LineSymbolizer 이름
		var symbolName = lines.getElementsByTagName("se:Name");
		if(symbolName.length > 0) lineObj["name"] = symbolName[0].text;
		
		if(lineObj["name"] == "CompositeLineCap"){
			lineObj.arrow = true;
		}
		if(lineObj["name"] == "CompositeLineMarker"){
			lineObj.marker = true;
		}
		
		// LineSymbolizer 속성
		var svgParam = lines.getElementsByTagName("se:SvgParameter");
		for(var l=0, lLen=svgParam.length; l < lLen; l++) {
			// Line 색 ( 예> #ffffff )
			if(svgParam[l].getAttribute("name") == "stroke") {
				lineObj["stroke"] = svgParam[l].text;
			}
			// Line width 두께
			if(svgParam[l].getAttribute("name") == "stroke-width") {
				lineObj["strokeWidth"] = svgParam[l].text;
			}
			// Line opacity 투명도
			if(svgParam[l].getAttribute("name") == "stroke-opacity") {
				lineObj["strokeOpacity"] = svgParam[l].text;
			}
			// Line linecap 모서리 스타일
			if(svgParam[l].getAttribute("name") == "stroke-linecap") {
				lineObj["strokeLinecap"] = svgParam[l].text;
			}
			// Line dasharray 선 스타일
			if(svgParam[l].getAttribute("name") == "stroke-dasharray") {
				lineObj["strokeDasharray"] = svgParam[l].text;
			}
			// Line linejoin 선 연결지점 모양
			if(svgParam[l].getAttribute("name") == "stroke-linejoin") {
				lineObj["strokeLinejoin"] = svgParam[l].text;
			}
		}
		var svgParam = lines.getElementsByTagName("se:VendorOption");
		if(svgParam.length > 0){
			lineObj["cap_style"] = [];
			lineObj["cap_size"] = [];
			lineObj["cap_color"] = [];
			lineObj["cap_fill"] = [];
			lineObj["cap_position"] = [];
		}
		for(var l=0, lLen=svgParam.length; l < lLen; l++) {
			if(svgParam[l].getAttribute("name") == "cap_direction") {
				lineObj["cap_direction"] = svgParam[l].text;
			}
			if(svgParam[l].getAttribute("name") == "cap_angle") {
				lineObj["cap_angle"] = svgParam[l].text;
			}
			if(svgParam[l].getAttribute("name") == "start_cap") {
				lineObj["start_cap"] = svgParam[l].text;
			}
			if(svgParam[l].getAttribute("name") == "end_cap") {
				lineObj["end_cap"] = svgParam[l].text;
			}
			
			if(svgParam[l].getAttribute("name") == "cap_style") {
				lineObj["cap_style"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_size") {
				lineObj["cap_size"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_color") {
				lineObj["cap_color"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_fill") {
				lineObj["cap_fill"].push(svgParam[l].text);
			}
			if(svgParam[l].getAttribute("name") == "cap_position") {
				lineObj["cap_position"].push(svgParam[l].text);
			}
			
		}
		return lineObj;
		
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 Rule내부의 PolygonSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object}  polygons (SLD_BODY의 PolygonSymbolizer 엘리먼트 == <se:PolygonSymbolizer>)
	*/
	readPolySym : function(polygons){
		var polyObj = {};

		// PolygonSymbolizer 타입
		polyObj["type"] = "polygon";
		
		// PolygonSymbolizer 버전
		polyObj["version"] = polygons[0].getAttribute("version");
		
		// PolygonSymbolizer 이름
		var symbolName = polygons[0].getElementsByTagName("se:Name");
		if(symbolName.length > 0) polyObj["name"] = symbolName[0].text;
		
		// PolygonSymbolizer 속성
		svgParam = polygons[0].getElementsByTagName("se:SvgParameter");
		for(var l=0, lLen=svgParam.length; l < lLen; l++) {
			// Polygon fill 면색 ( 예> #ffffff )
			if(svgParam[l].getAttribute("name") == "fill") {
				polyObj["fillColor"] = svgParam[l].text;
			}
			// Polygon opacity 면 투명도
			if(svgParam[l].getAttribute("name") == "fill-opacity") {
				polyObj["fillOpacity"] = svgParam[l].text;
			}
		}
		
		return polyObj;
		
	},

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description XML형태의 SLD_BODY에서 Rule내부의 TextSymbolizer 정보를 파싱하고 Object(Json)형태로 return
	* @param {Object}  texts (SLD_BODY의 TextSymbolizer 엘리먼트 == <se:TextSymbolizer>)
	*/
	readTextSym : function(texts){
		var textObj = {};
		
		// TextSymbolizer 타입
		textObj["type"] = "text";
		
		// TextSymbolizer 버전
		textObj["version"] = texts[0].getAttribute("version");
		
		// TextSymbolizer 이름
		var symbolName = texts[0].getElementsByTagName("se:Name");
		if(symbolName.length > 0) textObj["name"] = symbolName[0].text;
		
		// 라벨 명 (DB의 컬럼명)
		element = texts[0].getElementsByTagName("se:Label");
		if(element.length > 0) {
			subElement = element[0].getElementsByTagName("ogc:PropertyName");
			if(subElement.length > 0) textObj["label"] = subElement[0].text;
		}

		// Text Font 글자 모양
		var fonts = texts[0].getElementsByTagName("se:Font");
		if(fonts.length > 0) {
			svgParam = fonts[0].getElementsByTagName("se:SvgParameter");
			for(var l=0, lLen=svgParam.length; l < lLen; l++) {
				// Text family 서체 ( 예> 맑은고딕 )
				if(svgParam[l].getAttribute("name") == "font-family") {
					textObj["fontFamily"] = svgParam[l].text;
				}
				// Text Size 글자 크기
				else if(svgParam[l].getAttribute("name") == "font-size") {
					textObj["fontSize"] = svgParam[l].text;
				}
				// Text Style 글자 스타일
				else if(svgParam[l].getAttribute("name") == "font-style") {
					textObj["fontStyle"] = svgParam[l].text;
				}
				//  Text weight 글자 두께
				else if(svgParam[l].getAttribute("name") == "font-weight") {
					textObj["fontWeight"] = svgParam[l].text;
				}
			}
		}
		
		var LabelPlacement = texts[0].getElementsByTagName("se:LabelPlacement");
		if(LabelPlacement.length > 0){
			var PointPlacement = LabelPlacement[0].getElementsByTagName("se:PointPlacement");
			var LinePlacement = LabelPlacement[0].getElementsByTagName("se:LinePlacement");
			
			if(PointPlacement.length > 0){
				// Text Displacement
				var Displacement = PointPlacement[0].getElementsByTagName("se:Displacement");
				if(Displacement.length > 0) {
					var DisplacementX = Displacement[0].getElementsByTagName("se:DisplacementX");
					if(DisplacementX.length > 0) textObj["displacementX"] = DisplacementX[0].text;
					
					var DisplacementY = Displacement[0].getElementsByTagName("se:DisplacementY");
					if(DisplacementY.length > 0) textObj["displacementY"] = DisplacementY[0].text;
				}
			}
			
			if(LinePlacement.length > 0){
				var VendorOption = LinePlacement[0].getElementsByTagName("se:VendorOption");
				for(var m=0, mLen=VendorOption.length; m < mLen ; m++){
					// Text text_arrange_pos
					if(VendorOption[m].getAttribute("name") == "text_arrange_pos"){
						textObj["text_arrange_pos"] = VendorOption[m].text;
					}
					// Text text_arrange_line 
					else if(VendorOption[m].getAttribute("name") == "text_arrange_line"){
						textObj["text_arrange_line"] = VendorOption[m].text;
					}
					// Text text_arrange_gap
					else if(VendorOption[m].getAttribute("name") == "text_arrange_gap"){
						textObj["text_arrange_gap"] = VendorOption[m].text;
					}
				}
			}
		}
		
		var halo = texts[0].getElementsByTagName("se:Halo");
		if(halo.length > 0) {
			var radius = halo[0].getElementsByTagName("se:Radius");
			if(radius.length > 0) textObj["radius"] = radius[0].text;
			
			var haloFill = halo[0].getElementsByTagName("se:Fill");
			if(haloFill.length > 0) {
				svgParam = haloFill[0].getElementsByTagName("se:SvgParameter");
				if(svgParam.length > 0){
					for(m=0, mLen=svgParam.length; m < mLen; m++) {
						if(svgParam[m].getAttribute("name") == "fill") {
							//글자 색
							textObj["haloColor"] = svgParam[m].text;
						}
						else if(svgParam[m].getAttribute("name") == "fill-opacity") {
							//글자 투명도
							textObj["haloOpacity"] = svgParam[m].text;
						}
					}
				}
			}
		}
		
		var fill = texts[0].getElementsByTagName("se:Fill");
		for(l=0; l < fill.length; l++) {
			svgParam = fill[l].getElementsByTagName("se:SvgParameter");
			if(svgParam.length > 0){
				for(m=0, mLen=svgParam.length; m < mLen; m++) {
					if(svgParam[m].getAttribute("name") == "fill") {
						//글자 색
						textObj["fillColor"] = svgParam[m].text;
					}
					else if(svgParam[m].getAttribute("name") == "fill-opacity") {
						//글자 투명도
						textObj["fillOpacity"] = svgParam[m].text;
					}
				}
			}
		}
		
		return textObj;
		
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Object(Json)형태의 SLD_BODY를 XML String형태로 변환
	* @param {Object}  data (SLD_BODY의 MapTopic 객체)
	*/
	getSLDXML : function(data) {
		var xml = '<?xml version="1.0" encoding="UTF-8" ?>';
		if(data){
			if(data){
				xml += this.writeMapTopic(this.data,data);
			}
			else{
				xml += this.writeMapTopic(data);
			}
		}
			
		else 
			xml += this.writeMapTopic(this.data);

		return xml;
	},
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description  Object(Json)형태의 SLD_BODY에서 MapTopic부분의 정보를 XML형태로 return
	* @param {Object}  data (SLD_BODY의 MapTopic 객체)
	* @param {Object}  opt option 
	*/
	writeMapTopic : function(data, opt){
		var namedObj = data.namedLayers;
		var str;
		str = '<sld:StyledLayerDescriptor xsi:schemaLocation="" version="1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:se="http://www.opengis.net/se" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld">';
		str += '<se:Name>' + data.name + '</se:Name>';
		str += '<se:Description><se:Title>' + data.title + '</se:Title></se:Description>';
		if(opt == "default"){
			for(var i=0, len=layerTool.layers.length ; i < len ; i++){
				for(var l=0, lLen=namedObj.length ; l<lLen ; l++){
					if(namedObj[l].name == "행정읍면동"){
						str += this.writeNamedLayer(namedObj[l]);
					}
				}
			}
		}
		else{
			for(var j=0, jLen=layerTool.layers.length ; j<jLen ; j++){
				for(var k=0, kLen=namedObj.length ; k<kLen ; k++){
					if(layerTool.layers[j].alias == namedObj[k].name){
						if(layerTool.layers[j].show == "1"){
							namedObj[k].show = "1";
						}
						else{
							namedObj[k].show = "0";
						}
					}
				}
			}
			
			if(opt == "print"){
				// 거꾸로 생성 = 맵토픽에서 sldbody xml 처음레이어를 가장 하단으로 위치시키기 때문
				for(var i=layerTool.layers.length-1 ; i >= 0 ; i--){
					for(var l=0, lLen=namedObj.length ; l<lLen ; l++){
						if(layerTool.layers[i].alias == namedObj[l].name){
							if(namedObj[l].show == "1"){
								str += this.writeNamedLayer(namedObj[l]);
							}
						}
					}
				}
			}
			else{
				for(var i=0, len=layerTool.layers.length ; i < len ; i++){
					for(var l=0, lLen=namedObj.length ; l<lLen ; l++){
						if(layerTool.layers[i].alias == namedObj[l].name){
							if(namedObj[l].show == "1"){
								str += this.writeNamedLayer(namedObj[l]);
							}
						}
					}
				}
			}
		}
				
		str += '</sld:StyledLayerDescriptor>';
		
		return str;
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description  Object(Json)형태의 SLD_BODY에서 NamedLayer부분의 정보를 XML형태로 return
	* @param {Object}  namedObj (SLD_BODY의 NamedLayer 객체)
	*/
	writeNamedLayer : function(namedObj){
		var userdObj = namedObj.userStyle;
		var str;
		
		str = '<sld:NamedLayer>';
		str += '<se:Name>' + namedObj.name + '</se:Name>';
		str += '<se:Description><se:Title>' + namedObj.title + '</se:Title></se:Description>';
		str += '<sld:LayerFeatureConstraints><sld:FeatureTypeConstraint><se:FeatureTypeName>';
		str += namedObj.featureTypeName;
		str += '</se:FeatureTypeName></sld:FeatureTypeConstraint></sld:LayerFeatureConstraints>';
		
		for(var j=0, jLen=userdObj.length ; j < jLen ; j++){
			str += this.writeUserStyle(userdObj[j]);
		}
		
		str += '</sld:NamedLayer>';
		return str;
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Object(Json)형태의 SLD_BODY에서 UserStyle부분의 정보를 XML형태로 return
	* @param {Object}  userdObj (SLD_BODY의 UserStyle 객체)
	*/
	writeUserStyle : function(userdObj){
		var ruleObj = userdObj.rules;
		var str;
		var control = this;
		str = '<sld:UserStyle>';
		str += '<se:Name>' + userdObj.name + '</se:Name>';
		str += '<se:Description><se:Title>' + userdObj.title + '</se:Title></se:Description>';
		str += '<se:FeatureTypeStyle>';
		str += '<se:FeatureTypeName>' + userdObj.featureTypeName + '</se:FeatureTypeName>';
		
		for(var k=0, kLen=ruleObj.length ; k < kLen ; k++){
			if(!(ruleObj[k].hidden != null && ruleObj[k].hidden)){
					str += this.writeRule(ruleObj[k]);
			}
		}
		str += '</se:FeatureTypeStyle>';
		str += '</sld:UserStyle>';
		
		return str;
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Object(Json)형태의 SLD_BODY에서 Rule 정보를 XML형태로 return
	* @param {Object} ruleObj (SLD_BODY의 Rule 객체)
	*/
	writeRule : function(ruleObj,ruleOnOff){
		var points;
		var lines;
		var polygons;
		var texts;
		
		var str;
		
		str = '<se:Rule>';
		str += '<se:Name>' + ruleObj.name + '</se:Name>';
		if(ruleObj.name == "그외관로_주석" || ruleObj.name == "그외관로"){
			str += '<ogc:Filter>';
			str += '<And xmlns="http://www.opengis.net/ogc">';

			str += '<And>';
			str += '<And>';
			str += '<And>';
			str += '<PropertyIsGreaterThanOrEqualTo>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA006';
			str += '</Literal>';
			str += '</PropertyIsGreaterThanOrEqualTo>';
			
			str += '<PropertyIsLessThan>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA009';
			str += '</Literal>';
			str += '</PropertyIsLessThan>';
			str += '</And>';
			
			str += '<PropertyIsGreaterThanOrEqualTo>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA011';
			str += '</Literal>';
			str += '</PropertyIsGreaterThanOrEqualTo>';
			str += '</And>';
			
			str += '<PropertyIsLessThan>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_KND_SE';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += 'SAA030';
			str += '</Literal>';
			str += '</PropertyIsLessThan>';
			str += '</And>';
			
			str += '<PropertyIsGreaterThanOrEqualTo>';
			str += '<ogc:PropertyName>';
			str += 'PLINE_ET';
			str += '</ogc:PropertyName>';
			str += '<Literal>';
			str += '20.0';
			str += '</Literal>';
			str += '</PropertyIsGreaterThanOrEqualTo>';
			
			str += '</And>';
			str += '</ogc:Filter>';
		}
		else 
		if(ruleObj.filterName_equal || ruleObj.filterLiteral_equal || ruleObj.more || ruleObj.less){
			str += '<ogc:Filter>';
			
			if((ruleObj.filterName_equal && ruleObj.filterName_greater)
					|| (ruleObj.filterName_equal && ruleObj.more)){
				str += '<ogc:And>';
			}
			if(ruleObj.filterName_equal && ruleObj.filterLiteral_equal) {
				str += '<PropertyIsEqualTo xmlns="http://www.opengis.net/ogc"><ogc:PropertyName>';
				str += ruleObj.filterName_equal + '</ogc:PropertyName>';
				str += '<Literal>' + ruleObj.filterLiteral_equal + '</Literal>';
				str += '</PropertyIsEqualTo>';
			}
			
			if(ruleObj.filterName_greater && ruleObj.filterLiteral_greater){
				str += '<PropertyIsGreaterThan>';
				str += '<ogc:PropertyName>';
				str += ruleObj.filterName_greater;
				str += '</ogc:PropertyName>';
				str += '<Literal>' + ruleObj.filterLiteral_greater + '</Literal>';
				str += '</PropertyIsGreaterThan>';
			}

			if(ruleObj.more && ruleObj.less){
				var cnt=0;
				str += '<And xmlns="http://www.opengis.net/ogc">';
				for(var j in ruleObj.more){
					cnt++;
				}
				for(var i=0 ; i<cnt ; i++){
					if(cnt >= 2){
						str += '<And>';
					}
					str += '<PropertyIsGreaterThanOrEqualTo>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_more[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.more[i];
					str += '</Literal>';
					str += '</PropertyIsGreaterThanOrEqualTo>';
					
					str += '<PropertyIsLessThan>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_less[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.less[i];
					str += '</Literal>';
					str += '</PropertyIsLessThan>';
					if(cnt >= 2){
						str += '</And>';
					}
				}
				str += '</And>';
			}
			else if(ruleObj.more){
				for(var i in ruleObj.more){
					str += '<PropertyIsGreaterThanOrEqualTo>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_more[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.more[i];
					str += '</Literal>';
					str += '</PropertyIsGreaterThanOrEqualTo>';
				}
			}
			else if(ruleObj.less){
				for(var i in ruleObj.less){
					str += '<PropertyIsLessThan>';
					str += '<ogc:PropertyName>';
					str += ruleObj.filterName_less[i];
					str += '</ogc:PropertyName>';
					str += '<Literal>';
					str += ruleObj.less[i];
					str += '</Literal>';
					str += '</PropertyIsLessThan>';
				}
			}
			
			if((ruleObj.filterName_equal && ruleObj.filterName_greater)
					|| (ruleObj.filterName_equal && ruleObj.more)){
				str += '</ogc:And>';
			}
			
			str += '</ogc:Filter>';
		}
		str += '<se:MinScaleDenominator>' + ruleObj.minScale + '</se:MinScaleDenominator>';
		str += '<se:MaxScaleDenominator>' + ruleObj.maxScale + '</se:MaxScaleDenominator>';
		
		if(ruleObj.symbolizer["polygon"]){
			polygons = ruleObj.symbolizer["polygon"];
			str += this.writePolySym(polygons);
		}
		if(ruleObj.symbolizer["line"]){
			lines = ruleObj.symbolizer["line"];
			str += this.writeLineSym(lines);
			for(var i=0, len=5 ; i<len ; i++){
				if(ruleObj.symbolizer["line" + i]){
					lines = ruleObj.symbolizer["line" + i];
					str += this.writeLineSym(lines);
				}
			}
		}
		if(ruleObj.symbolizer["point"]){
			points = ruleObj.symbolizer["point"];
			str += this.writePointSym(points);
		}
		if(ruleObj.symbolizer["text"]){
			texts = ruleObj.symbolizer["text"];
			str += this.writeTextSym(texts);
		}

		str += '</se:Rule>';
		
		return str;
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Object(Json)형태의 SLD_BODY에서 Rule내부의 PointSymbolizer 정보를 XML형태로 return
	* @param {Object} points (SLD_BODY의 PointSymbolizer 객체)
	*/
	writePointSym : function(points){
		var str;
		
		str = '<se:PointSymbolizer version="' + points.version + '">';
		str += '<se:Name>' + points.name + '</se:Name>';
		
		if(points.name == "CharMarker" || points.name == "CharMarkerAngle"){
			str += '<se:Graphic>';
			str += '<se:Mark>';
			str += '<sld:VendorOption name="font-family">' + points.markFont + '</sld:VendorOption>';
			str += '<sld:VendorOption name="char-code">' + points.markCharCode + '</sld:VendorOption>';
			str += '<sld:VendorOption name="fill">' + points.markFill + '</sld:VendorOption>';
			str += '</se:Mark>';
			str += '<se:Opacity>' + points.opacity + '</se:Opacity>';
			str += '<se:Size>' + points.size + '</se:Size>';
			
			if(points.name == "CharMarkerAngle"){
				str += '<se:Rotation>';
				str += '<ogc:PropertyName>';
				str += points.rotation;
				str += '</ogc:PropertyName>';
				str += '</se:Rotation>';
			}
			
			str += '<se:Displacement>';
			str += '<se:DisplacementX>' + points.displacementX + '</se:DisplacementX>';
			str += '<se:DisplacementY>' + points.displacementY + '</se:DisplacementY>';
			str += '</se:Displacement>';
		}
		else{
			str += '<se:Graphic><se:ExternalGraphic><se:InlineContent encoding="' + points.encoding + '">' + points.externalGraphic + '</se:InlineContent>';
			str += '<se:Format>' + points.format + '</se:Format>';
			str += '</se:ExternalGraphic>';
			str += '<se:Opacity>' + points.opacity + '</se:Opacity>';
			str += '<se:Size>' + points.size + '</se:Size>';
			str += '<se:Rotation>' + points.rotation + '</se:Rotation>';
			str += '<se:Displacement><se:DisplacementX>' + points.displacementX + '</se:DisplacementX>';
			str += '<se:DisplacementY>' + points.displacementY + '</se:DisplacementY></se:Displacement>';
		}
		
		str += '</se:Graphic></se:PointSymbolizer>';
		
		
		return str;
	},
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description  Object(Json)형태의 SLD_BODY에서 Rule내부의 LineSymbolizer 정보를 XML형태로 return
	* @param {Object} lines (SLD_BODY의 LineSymbolizer 객체>)
	*/
	writeLineSym : function(lines){
		var str;
		
		str = '<se:LineSymbolizer version="' + lines.version + '">';
		str += '<se:Name>' + lines.name + '</se:Name>';
		str += '<se:Stroke>';
		
		if(lines.stroke){
			str += '<se:SvgParameter name="stroke">' + lines.stroke + '</se:SvgParameter>';
		}
		if(lines.strokeOpacity){
			str += '<se:SvgParameter name="stroke-opacity">' + lines.strokeOpacity + '</se:SvgParameter>';
		}
		if(lines.strokeWidth){
			str += '<se:SvgParameter name="stroke-width">' + lines.strokeWidth + '</se:SvgParameter>';
		}
		if(lines.strokeLinejoin){
			str += '<se:SvgParameter name="stroke-linejoin">' + lines.strokeLinejoin + '</se:SvgParameter>';
		}
		if(lines.strokeLinecap){
			str += '<se:SvgParameter name="stroke-linecap">' + lines.strokeLinecap + '</se:SvgParameter>';
		}
		if(lines.strokeDasharray && lines.strokeDasharray != "solid"){
			str += '<se:SvgParameter name="stroke-dasharray">' + lines.strokeDasharray + '</se:SvgParameter>';
		}
		
		str += '</se:Stroke>';
		
		if(lines.cap_direction && lines.cap_angle){
			str += '<se:VendorOption name="cap_direction">' + lines.cap_direction + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_angle">' + lines.cap_angle + '</se:VendorOption>';
			
			str += '<se:VendorOption name="start_cap">' + lines.start_cap + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_style">' + lines.cap_style[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_size">' + lines.cap_size[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_color">' + lines.cap_color[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_fill">' + lines.cap_fill[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_position">' + lines.cap_position[0] + '</se:VendorOption>';
			str += '<se:VendorOption name="end_cap">' + lines.end_cap + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_style">' + lines.cap_style[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_size">' + lines.cap_size[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_color">' + lines.cap_color[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_fill">' + lines.cap_fill[1] + '</se:VendorOption>';
			str += '<se:VendorOption name="cap_position">' + lines.cap_position[1] + '</se:VendorOption>';
		}
		str += '</se:LineSymbolizer>';
		
		return str;
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Object(Json)형태의 SLD_BODY에서 Rule내부의 PolygonSymbolizer 정보를 XML형태로 return
	* @param {Object} polygons (SLD_BODY의 PolygonSymbolizer 객체)
	*/
	writePolySym : function(polygons){
		var str;
		
		str = '<se:PolygonSymbolizer version="' + polygons.version + '">';
		str += '<se:Name>' + polygons.name + '</se:Name>';
		str += '<se:Fill>';
		
		if(polygons.fillColor){
			str += '<se:SvgParameter name="fill">' + polygons.fillColor + '</se:SvgParameter>';
		}
		if(polygons.fillOpacity){
			str += '<se:SvgParameter name="fill-opacity">' + polygons.fillOpacity + '</se:SvgParameter>';
		}
		
		str += '</se:Fill>';
		str += '</se:PolygonSymbolizer>';
		
		return str;
	},
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Object(Json)형태의 SLD_BODY에서 Rule내부의 TextSymbolizer 정보를 XML형태로 return
	* @param {Object} texts (SLD_BODY의 TextSymbolizer 엘리먼트 == <se:TextSymbolizer>)
	*/
	writeTextSym : function(texts){
		var str;
		
		str = '<se:TextSymbolizer version="' + texts.version + '">';
		str += '<se:Name>' + texts.name + '</se:Name>';
		if(texts.label){
			str += '<se:Label><ogc:PropertyName>' + texts.label + '</ogc:PropertyName></se:Label>';
		}
		else{
			str += '<se:Label/>';
		}
		
		str += '<se:Font>';
		
		if(texts.fontSize){
			str += '<se:SvgParameter name="font-size">' + texts.fontSize + '</se:SvgParameter>';
		}
		if(texts.fontWeight){
			str += '<se:SvgParameter name="font-weight">' + texts.fontWeight + '</se:SvgParameter>';
		}
		if(texts.fontFamily){
			str += '<se:SvgParameter name="font-family">' + texts.fontFamily + '</se:SvgParameter>';
		}
		if(texts.fontStyle){
			str += '<se:SvgParameter name="font-style">' + texts.fontStyle + '</se:SvgParameter>';
		}
		
		str += '</se:Font>';
		str += '<se:LabelPlacement>';
		if(texts.displacementX || texts.displacementY){
			str += '<se:PointPlacement><se:Displacement>';
			
			if(texts.displacementX){
				str += '<se:DisplacementX>' + texts.displacementX + '</se:DisplacementX>';
			}
			if(texts.displacementY){
				str += '<se:DisplacementY>' + texts.displacementY + '</se:DisplacementY>';
			}
			
			str += '</se:Displacement></se:PointPlacement>';
		}
		if(texts.text_arrange_pos || texts.text_arrange_line || texts.text_arrange_gap){
			str += '<se:LinePlacement>';
			
			if(texts.text_arrange_pos){
				str += '<se:VendorOption name="text_arrange_pos">' + texts.text_arrange_pos + '</se:VendorOption>';
			}
			if(texts.text_arrange_line){
				str += '<se:VendorOption name="text_arrange_line">' + texts.text_arrange_line + '</se:VendorOption>';
			}
			if(texts.text_arrange_gap){
				str += '<se:VendorOption name="text_arrange_gap">' + texts.text_arrange_gap + '</se:VendorOption>';
			}
			
			str += '</se:LinePlacement>';
		}
		
		str += '</se:LabelPlacement>';
		
		if(texts.radius){
			str += '<se:Halo>';
			str += '<se:Radius>' + texts.radius + '</se:Radius>';
			str += '<se:Fill>';
			
			if(texts.haloColor){
				str += '<se:SvgParameter name="fill">' + texts.haloColor + '</se:SvgParameter>';
			}
			if(texts.haloOpacity){
				str += '<se:SvgParameter name="fill-opacity">' + texts.haloOpacity + '</se:SvgParameter>';
			}
			str += '</se:Fill>';
			str += '</se:Halo>';
		}
		
		
		if(texts.fillColor){
			str += '<se:Fill>';
			if(texts.fillColor){
				str += '<se:SvgParameter name="fill">' + texts.fillColor + '</se:SvgParameter>';
			}
			if(texts.fillOpacity){
				str += '<se:SvgParameter name="fill-opacity">' + texts.fillOpacity + '</se:SvgParameter>';
			}
			str += '</se:Fill>';
		}
		
		str += '</se:TextSymbolizer>';
		
		return str;
	},
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description 객체에서 NameLayer 명칭으로 해당 객체를 검색하는 함수 
	* @param {String} layerName (namedLayer명)
	*/
	searchNamedLayer : function(layerName){
		var data = this.data;
		var namedLayers = data.namedLayers;
		var result;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			if(namedLayers[i].name == layerName){
				return namedLayers[i];
			}
		}
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Rule 명칭으로 해당 Rule객체를 검색하는 함수 
	* @param {String} lruleName (rule명)
	* @param {Boolean} chk (해당 rule의 namedLayer명으로 중복체크 여부)
	*/
	searchRule : function(ruleName, chk){
		var data = this.data;
		var namedLayers = data.namedLayers;
		var result;
		
		if(chk){
			var res=[];
			var cnt=0;
			for(var i=0, len=namedLayers.length ; i < len ; i++){
				var userStyle = namedLayers[i].userStyle;
				for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
					var rules = userStyle[j].rules;
					for(var k=0, kLen=rules.length ; k < kLen ; k++){
						if(rules[k].name == ruleName){
							res.push(rules[k]);
							res.push(i);
							cnt++;
						}
					}
				}
			}
			if(cnt > 1){
				for(var i=0,len=res.length ; i<len ; i=i+2){
					if(namedLayers[res[i+1]].name == chk){
						return res[i];
					}
				}
			}
			else if(cnt == 1){
				return res[0];
			}
		}
		else{
			for(var i=0, len=namedLayers.length ; i < len ; i++){
				var userStyle = namedLayers[i].userStyle;
				for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
					var rules = userStyle[j].rules;
					for(var k=0, kLen=rules.length ; k < kLen ; k++){
						if(rules[k].name == ruleName){
							return rules[k];
						}
					}
				}
			}
		}
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method 
	* @description MapTopic 객체에 NamedLayers 객체를 등록하는 함수 
	* @param {Object} data (MapTopic 객체 // 등록 타겟)
	* @param {Object} namedObj  (NamedLayers 객체 // 등록 객체)
	*/
	regNamedLayers : function(data, namedObj){
		data.namedLayers.push(namedObj);
		
		return data;
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method 
	* @description NamedLayers 객체에 UserStyle 객체를 등록하는 함수
	* @param {Object} namedObj(NamedLayers 객체 // 등록 타겟)
	* @param {Object} userdObj (UserStyle 객체 // 등록 객체)
	*/
	regUserStyle : function(namedObj, userdObj){
		namedObj.userStyle.push(userdObj);
		
		return namedObj;
	},
	

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method 
	* @description UserStyle 객체에 Rules 객체를 등록하는 함수 
	* @param {Object} userdObj (UserStyle 객체 // 등록 객체)
	* @param {Object} ruleObj (Rules 객체 // 등록 객체)
	*/
	regRules : function(userdObj, ruleObj){
		userdObj.rules.push(ruleObj);
		
		return userdObj;
	},


	/**
	* @memberof NUTs.Tool.SLDTool
	* @method 
	* @description Rules 객체에 Symbolizer 객체를 등록하는 함수  
	* @param {Object} ruleObj (Rules 객체 // 등록 객체)
	* @param {Object} symbolObj (Symbolizer 객체 // 등록 객체)
	*/
	regSymbolizer : function(ruleObj, symbolObj){
		
		if(symbolObj.type == "point"){
			ruleObj.symbolizer["point"] = symbolObj;
		}
		else if(symbolObj.type == "line"){
			ruleObj.symbolizer["line"] = symbolObj;
		}
		else if(symbolObj.type == "polygon"){
			ruleObj.symbolizer["polygon"] = symbolObj;
		}
		else if(symbolObj.type == "text"){
			ruleObj.symbolizer["text"] = symbolObj;
		}
		
		return ruleObj;
	},

	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @authMapTopic MapTopic 객체를 생성하기 위한 파라미터값을 인자로 받아 MapTopic 객체 생성  
	* @param {Object} params (파라미터 객체) 
	*/
	createMapTopic : function(params){
		var data = {
				xml : params.xml,
				name : params.name,
				namedLayers : []
		}; 
		
		return data;
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description NamedLayer 객체를 생성하기 위한 파라미터값을 인자로 받아 NamedLayer 객체 생성  
	* @param {Object} params (파라미터 객체) 
	*/
	createNamedLayer : function(params){
		var namedObj = {
				name : params.name,
				title : params.title,
				featureTypeName : params.featureTypeName,
				userStyle : []
		};
		
		return namedObj;
	},
		
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description  UserStyle 객체를 생성하기 위한 파라미터값을 인자로 받아 UserStyle 객체 생성  
	* @param {Object} params (파라미터 객체) 
	*/
	createUserStyle : function(params){
		var userdObj = {
				name : params.name,
				title : params.title,
				rules : []
		};
		
		return userdObj;
	},


	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Rule 객체를 생성하기 위한 파라미터값을 인자로 받아 Rule 객체 생성  
	* @param {Object} params (파라미터 객체) 
	* @param {Object} symbol(심볼 객체) 
	*/
	createRule : function(params, symbol){
		var ruleObj = {
				name : params.name,
				filterName : params.filterName,
				filterLiteral : params.Literal,
				minScale : params.minScale,
				maxScale : params.maxScale,
				symbolizer : symbol
		};
		return ruleObj;
	},

	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description Symbolizer 객체를 생성하기 위한 파라미터값을 인자로 받아 Symbolizer 객체 생성
	*		 		 파라미터에 따라 Point, Line, Polygon, Text로 구분되어서 객체 생성  
	* @param {Object} params (파라미터 객체) 
	* @param {String} type ("point","line","polygon","text")
	*/
	createSymbolizer : function(params, type){
		var pointObj;
		var lineObj;
		var polygonObj;
		var textObj;
		var symbolObj;
		
		if(type == "point"){
			if(params.name == "CharMarker" || params.name == "CharMarkerAngle"){
				pointObj = {	
						markFill : params.markFill,
						markFont : params.markFont,
						markCharCode : params.markCharCode,
						
						type : "point",
						version : params.version,
						name : params.name,
						size : params.size,
						opacity : params.opacity,
						rotation : params.rotation,
						displacementX : params.displacementX,
						displacementY : params.displacementY
				};
			}
			else{
				pointObj = {	
						type : "point",
						version : params.version,
						name : params.name,
						size : params.size,
						opacity : params.opacity,
						rotation : params.rotation,
						displacementX : params.displacementX,
						displacementY : params.displacementY,
						externalGraphic : params.externalGraphic,
						encoding : params.encoding,
						format : params.format
				};
			}
			
			symbolObj = pointObj;
		}
		else if(type == "line"){
			lineObj = {
					type : "line",
					version : params.version,
					name : params.name,
					stroke : params.stroke,
					strokeWidth : params.strokeWidth,
					strokeOpacity : params.strokeOpacity,
					strokeLinecap : params.strokeLinecap,
					strokeDasharray : params.strokeDasharray,
					strokeLinejoin : params.strokeLinejoin
			};
			symbolObj = lineObj;
		}
		else if(type == "polygon"){
			polygonObj = {
					type : "polygon",
					version : params.version,
					name : params.name,
 					fillColor : params.fillColor,
					fillOpacity : params.fillOpacity
			};
			symbolObj = polygonObj;
		}
		else if(type == "text"){
			textObj = {
					type : "text",
					version : params.version,
					name : params.name,
					label : params.label,
					fontFamily : params.fontFamily,
					fontSize : params.fontSize,
					fontStyle : params.fontStyle,
					fontWeight : params.fontWeight,
					displacementX : params.displacementX,
					displacementY : params.displacementY,
					text_arrange_pos : params.text_arrange_pos,
					text_arrange_line : params.text_arrange_line,
					text_arrange_gap : params.text_arrange_gap,
					radius : params.radius,
					haloColor : params.haloColor,
					haloOpacity : params.haloOpacity,
					fillColor : params.fillColor,
					fillOpacity : params.fillOpacity
			};
			symbolObj = textObj;
		}
		
		return symbolObj;
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description MapTopic  인자인 NamedLayer 객체가 MapTopic Object내에 존재하면 수정, 존재하지 않으면 추가  
	* @param {Object} nameObj (NamedLayer 객체) 
	*/
	updateNamedLayer : function(nameObj){
		var hasNamedLayer = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			if(namedLayers[i].name == nameObj.name){
				namedLayers[i] = nameObj;
				hasNamedLayer = true;
			}
		}
		
		if(!hasNamedLayer){
			namedLayers.push(nameObj);
		}
	},


	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description 해당 NamedLayer가 MapTopic Object내에 존재하면 삭제  
	* @param {String} layerName (NamedLayer 이름)
	*/
	delNamedLayer : function(layerName){
		var hasNamedLayer = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			if(namedLayers[i].name == layerName){
				hasNamedLayer = true;
				namedLayers.splice(i,1);
				alert("해당 NamedLayer를 삭제하였습니다.");
			}
		}
		
		if(!hasNamedLayer){
			alert("해당 NamedLayer가 없습니다.");
		}
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description  해당 Rule이 MapTopic Object내에 존재하면 삭제 
	* @param {String} ruleName (Rule 이름)
	*/
	delRule : function(ruleName){
		var hasRule = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			var userStyle = namedLayers[i].userStyle;

			for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
				var rules = userStyle[j].rules;
				
				for(var k=0, kLen=rules.length ; k < kLen ; k++){
					if(rules[k].name == ruleName){
						hasRule = true;
						rules.splice(k,1);
						alert("해당 Rule을 삭제하였습니다.");
					}
				}
			}
		}
		
		if(!hasRule){
			alert("해당  Rule이 없습니다.");
		}
	},
	
	
	/**
	* @memberof NUTs.Tool.SLDTool
	* @method
	* @description  해당 Symbolizer가 MapTopic Object내에 존재하면 삭제 
	* @param {String} SymbolName (Symbolizer 이름))
	*/
	delSymbolizer : function(SymbolName){
		var hasSymbol = false;
		var namedLayers = this.data.namedLayers;
		
		for(var i=0, len=namedLayers.length ; i < len ; i++){
			var userStyle = namedLayers[i].userStyle;

			for(var j=0, jLen=userStyle.length ; j < jLen ; j++){
				var rules = userStyle[j].rules;
				
				for(var k=0, kLen=rules.length ; k < kLen ; k++){
					var symbol = rules[k].symbolizer;
					if(symbol["point"] && symbol["point"].name == SymbolName){
						delete symbol["point"];
						hasSymbol = true;
					}
					else if(symbol["line"] && symbol["line"].name == SymbolName){
						delete symbol["line"];
						hasSymbol = true;
					}
					else if(symbol["polygon"] && symbol["polygon"].name == SymbolName){
						delete symbol["polygon"];
						hasSymbol = true;
					}
					else if(symbol["text"] && symbol["text"].name == SymbolName){
						delete symbol["text"];
						hasSymbol = true;
					}
				}
			}
		}
		
		if(!hasSymbol){
			alert("해당 Symbolizer가 없습니다.");
		}
		else{
			alert("해당 Symbolizer를 삭제하였습니다.");
		}
	},
	
	CLASS_NAME: "NUTs.Tool.SLDTool" 
});
