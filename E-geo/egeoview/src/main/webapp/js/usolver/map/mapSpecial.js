/**
 * 지도 특화기능 
 * @namespace {Object} USV.MAP_SPECIAL  
 */
USV.MAP_SPECIAL = (function(_mod_map_special, $, undefined){
	
	// heatmap 관련 변수
	var oHeatmap ;		//heatmap 객체
	var oLegendCanvas = document.createElement('canvas');  //heatmap legend
	var oLegendCtx = oLegendCanvas.getContext('2d');
	var oGradientCfg = {};

	// chat 관련 변수
	var oChartLayer ; 	//차트를 생성할 레이어
	//var style;			
	//var chartype = "pie";
	//var max = 0;

	//var legendRectSize = 18;                                  // NEW
	//var legendSpacing = 4;                                    // NEW

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 노후관 레이어 추가
	* @author 최재훈(2015.10.21 )
	*/
	var fn_add_wornFacilityLayer = function (){
		
		var oWmsOptions = {
				layers : "노후관분포도_상수관로",
				styles : "",
				format : "image/jpeg",
				version : "1.3.0",
				CRS : new OpenLayers.Projection(CONFIG.fn_get_dataHouseCrs()),
				transparent : true
		};
		
		if(CONFIG.fn_get_gisEngineType() === "GeoServer") {
			oWmsOption.yx = {'EPSG:5181' : true};
		}
		
		var oWornFacilityLayer = new NUTs.Layer.WMS("wornFacilityLayer", CONFIG.fn_get_serviceUrl(), oWmsOptions,{
			isBaseLayer : false,
			singleTile : true,
			transitionEffect : 'resize',
			tileOptions: {maxGetUrlLength: 2048},
			projection : new OpenLayers.Projection(CONFIG.fn_get_dataHouseCrs())
		});
		
		var oLayer = map.getLayerByName("wornFacilityLayer");
		
		if(!oLayer){

			map.addLayer(oWornFacilityLayer);
			oWornFacilityLayer.events.register("loadend", oWornFacilityLayer, MAP.fn_bind_fullLegendGraphic); 
		}
	}
	
	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 노후관 레이어 제거
	* @author 최재훈(2015.10.21 )
	*/
	var fn_remove_wornFacilityLayer = function (){
		var oWornFacilityLayer = map.getLayerByName("wornFacilityLayer");
		if(oWornFacilityLayer){
			map.removeLayer(oWornFacilityLayer);
		}
	}
	
	
	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 히트맵 레이어 생성 및 추가/위치이동
	* @author 김정수(2015.10.11 )
	* @param {Object} _oData :  heatmap 생성할 데이터, 구조(lon, lat, count: [{lon:420057.6046,lat:225992.087,count:0})]
	*/
	fn_view_heatmap = function(_oData) {
		
		if(oHeatmap != null && typeof oHeatmap === 'object')
		{
			if(!oHeatmap.isVisible())
				oHeatmap.toggle();
		}
		else if(map.getLayerByName("heatmap"))
		{
			oHeatmap.setDataSet(transformedTestData);
		}
		else
		{
			var oHeatmapData = {
		            max: 50,
		            data:_oData
		        };            
			
			var oTransformedTestData = { max: oHeatmapData.max , data: [] },
		    oTmpData = oHeatmapData.data,
		    nDatalen = oTmpData.length,
		    aNudata = [];
			
			while(nDatalen--){
				aNudata.push({
			        lonlat: new OpenLayers.LonLat(oTmpData[nDatalen].lon, oTmpData[nDatalen].lat),
			        count: oTmpData[nDatalen].count
			    });
			}
			
			oTransformedTestData.data = aNudata;
			
			// heatmap 레이어 생성
			oHeatmap = new OpenLayers.Layer.Heatmap("heatmap", map, map.layers[0], 
		            {visible: true, radius: 10}, 
		            {isBaseLayer: false, opacity: 0.3, projection: new OpenLayers.Projection(CONFIG.fn_get_dataHouseCrs()),
		        	/*"legend": {
		                "title": "범례",
		                "position": "bl",
		                "offset": 10
		            },*/
		            onExtremaChange: function onExtremaChange(data) {
		                fn_heatmap_legend(data);
		            }
		    });
			
		    
		    map.addLayer(oHeatmap);
			
		    oHeatmap.setDataSet(oTransformedTestData);
			
			
			
			var zoomExtent =oHeatmap.getMaxBounds();// new NUTs.Bounds(412019.8074925,229629.68961848,412366.5574925,229854.43961848);
			map.zoomToExtent(zoomExtent);
			
			if(MAP.bLogWrite) {
				MAP.fn_write_log("HEATMAP 레이어 생성!!  name = " + oHeatmap.name);
				MAP.fn_write_log("layers = : " + layerTool.getThemeShowList('asc').join());
			}		
			
		}
		
	}	

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 히트맵 레이어 숨기기 (toggle)
	* @author 김정수(2015.10.11 )
	*/
	var fn_hide_heatmap = function()
	{	
		if(oHeatmap != null && typeof oHeatmap === 'object'){		
			if( oHeatmap.isVisible())
				oHeatmap.toggle();	
		}
	}


	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트맵의 Max 데이터 찾기
	* @author 김정수(2015.10.16 )
	* @param {Object} _oData : 차트를 생성할 데이터
	* @returns {Number} Max 데이터
	*/
	var fn_get_maxdata = function (_oData)
	{	
		var nMaxval = 0;
		$.each(_oData.features, function (key, val) {
			  
			var properties = val.properties;
			var tot=0;		  
			  
			$.each(properties, function (i, val) {
				tot += parseInt(val);	            
		    });
			if (nMaxval < tot) nMaxval = tot;
		});	
		
		return nMaxval;
	}

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트맵 레이어 생성 및 추가 
	* @author 김정수(2015.10.16 )
	* @param {String} _sChartKind : 차트의 종류 (pie, donut)
	* @param {Object} _oChartDatas : 차트를 생성할 데이터
	*/
	var fn_view_chartmap_d3 = function (_sChartKind, _oChartDatas)
	{	
		var nMax = fn_get_maxdata(_oChartDatas);
		var oSymbol = new fn_get_geometrySize('circle', 20, nMax);
		
		
		var oTemplate = {
	             fillOpacity: 1.0,
	             pointRadius: "${getRadius}", //24,
	             externalGraphic: "${getChartURL}",
	             graphicWidth: "${getSize}",
	             graphicHeight: "${getSize}",
	             strokeWidth: 0
	         };
		 var oContext = {
				 	getSize: function(_oFeature) {
		            	return 3*(20+Math.round(oSymbol.getSize(_oFeature.data.radius)));
		                //return 20 + Math.round(symbol.getSize(maxData()) * Math.pow(2,map.getZoom()-1));
		            },
		            getChartURL: function(_oFeature) {
		                var nValues = _oFeature.data.values;
		                var nSize = 3*(20+Math.round(oSymbol.getSize(_oFeature.data.radius)));
		                var sXmlString = fn_make_d3_piechart(nValues, nSize, nSize,_sChartKind); //maxData()
		                return sXmlString;
		            }            
		        };
		 	 
		var oStyle = new OpenLayers.Style(oTemplate, {context: oContext});
		var oStyleMap = new OpenLayers.StyleMap
						({	"default": oStyle, 
							"select": 
							{	pointRadius: 40,
								strokeWidth:2,
								fontSize:12,
								fontWeight:"bold",
								fontColor:"#000",
								zindex:1
							}});
		
		oChartLayer = new NUTs.Layer.Vector ("charts",
				{	visibility:true,				
					styleMap: oStyleMap
				});
		
		
		
	    map.addLayer(oChartLayer);
	    
	    fn_add_features(_oChartDatas);
	    
	    var oSelectFeature = new OpenLayers.Control.SelectFeature(oChartLayer,{onSelect:fn_proc_chartSelect, onUnselect:fn_proc_unCchartSelect});
		 map.addControl(oSelectFeature);
		 oSelectFeature.activate();
	}

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트맵 레이어 제거 
	* @author 김정수(2015.10.16 )
	*/
	var fn_hide_mapchart = function (){
		if(oChartLayer != null && typeof oChartLayer === 'object'){
			oChartLayer.display(false);
				map.removeLayer(oChartLayer);
		}
	}

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트맵 레이어상 피처 선택 시 팝업 표출 
	* @param {Object} _oFeature : 선택된 feature
	* @author 김정수(2015.10.16 )
	*/
	var fn_proc_chartSelect = function(_oFeature) {
		
		var sMsg="<UL>";
		
		$(_oFeature.attributes.values).each(function(index){
			sMsg += "<LI>" + this.label + ":" + this.value + "</LI>";
		});
		sMsg+="</UL>";
		
	    var oPopup = new OpenLayers.Popup.AnchoredBubble("popup",
	            OpenLayers.LonLat.fromString(_oFeature.geometry.toShortString()),
	            null,
	            sMsg,
	            null,
	            true,
	            function(){
			    	map.removePopup(_oFeature.popup);
			    	_oFeature.popup.destroy();
			    	_oFeature.popup = null;
		    	}
	        );
	    	oPopup.autoSize = true;
	        //popup.minSize = new OpenLayers.Size(200,200);
	    	oPopup.maxSize = new OpenLayers.Size(400,800);
	    	oPopup.fixedRelativePosition = true;
	    	oPopup.setOpacity(0.9);
	        _oFeature.popup = oPopup;
	        map.addPopup(oPopup);
	};

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트맵 레이어상의 피처 팝업 제거 
	* @param {Object} _oFeature : 선택된 feature
	* @author 김정수(2015.10.16 )
	*/
	var fn_proc_unCchartSelect = function(_oFeature) {    
	    
		if(_oFeature.popup) 
	    {
	    	map.removePopup(_oFeature.popup);
	    	_oFeature.popup.destroy();
	    	_oFeature.popup = null;
	    }
	};

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description D3 chart obj 생성 후 String 변환 후 리턴
	* @param {Object} data : feature.data.values
	* @param {Number} size : 3*(20+Math.round(symbol.getSize(feature.data.radius)))
	* @param {Number} radius : 3*(20+Math.round(symbol.getSize(feature.data.radius)))
	* @param {String} chartType : 차트 타입 ex. 'pie', 'donut'
	* @author 김정수(2015.10.16 )
	*/
	var fn_make_d3_piechart = function (data, size, radius, chartType )
	{
		var w = size,                        //width
	    h = size,                            //height
	    r = Math.min(w, h) / 2,                            //radius
	    color = d3.scale.category20();     //builtin range of colors
		
		var legendRectSize = 10,                   
		    legendSpacing = 4;                    
		
		var innerRadius, outerRadius;
		
		
		innerRadius = chartType=="donut" ? r*0.6:0;
		outerRadius = r;
		
		var chartSVG = document.createElement('canvas');
		chartSVG.setAttribute("id","chartSVG");
		
	    var vis = d3.select(chartSVG)
	        .append("svg:svg")      
	        .data([data])                   
	            .attr("width", w)           
	            .attr("height", h)
	        .append("svg:g")                
	            .attr("transform", "translate(" + r + "," + r + ")");  
	    var arc = d3.svg.arc()             
	    	.innerRadius(innerRadius)
	        .outerRadius(outerRadius);
	    var pie = d3.layout.pie()          
	        .value(function(d) { return d.value; }); 
	    var arcs = vis.selectAll("g.slice")     
	        .data(pie)                           
	        .enter()                            
	            .append("svg:g")                
	                .attr("class", "slice");    
	        
	    arcs.append("svg:path")
	            .attr("fill", function(d, i) { return color(i); } ) 
	            .attr("d", arc);                                    

	    
	    if(chartType=="donut")
	    {
	        var legend = vis.selectAll('.legend')                    
	        .data(color.domain())                                  
	        .enter()                                               
	        .append('g')                                           
	        .attr('class', 'legend')                               
	        .attr('transform', function(d, i) {                    
	          var height = legendRectSize + legendSpacing;         
	          var offset =  height * color.domain().length / 2;    
	          var horz = -2 * legendRectSize;                      
	          var vert = i * height - offset;                      
	          return 'translate(' + horz + ',' + vert + ')';       
	        });                                                    

	    	legend.append('rect')                                  
	    		.attr('width', legendRectSize)                     
	    		.attr('height', legendRectSize)                    
	    		.style('fill', color)                              
	    		.style('stroke', color);                           
	    		    
	    	legend.append('text')                                  
	    		.attr('x', legendRectSize + legendSpacing)         
	    		.attr('y', legendRectSize - legendSpacing)         
	    		.style("font", "bold 10px Arial")
	    		.text(function(d,i) { return data[i].value; });
	    }
	    else
	    {
	    	 // label 표시 미사용
	        /*arcs.append("svg:text")                                     
	        		.attr("class", "chartlabel")
	                .attr("transform", function(d) {
	                    d.innerRadius = innerRadius;
	                    d.outerRadius = outerRadius+20;
	                    return "translate(" + arc.centroid(d) + ")";        
	                })
	                //.attr("text-anchor", "middle")                        
	                .attr("text-anchor", function(d) {			  
	    			    return (d.endAngle + d.startAngle)/2 > Math.PI ?
	    			        "end" : "start";
	    			})
	    			.style("fill", "Purple")
	    			.style("font", "bold 11px Arial")
	                .text(function(d, i) { return data[i].label; });        
	       */
	        //value 표시
	        arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
	    	    .attr("dy", ".35em")
	    	    .attr("text-anchor", "middle")
	    	    .attr("transform", function(d) {       
	    	      d.innerRadius = r/2; // Set Inner Coordinate
	    	      d.outerRadius = r; // Set Outer Coordinate
	    	      return "translate(" + arc.centroid(d) + ")rotate(" + fn_get_angle(d) + ")";
	    	    })
	    	    .style("fill", "White")
	    	    .style("font", "bold 12px Arial")
	    	    .text(function(d) { return d.data.value; 
	    	    });        
	    }   
		
	    var serializer = new XMLSerializer();
	    var xmlString ='data:image/svg+xml;base64,' + btoa( serializer.serializeToString(d3.select(chartSVG).select("svg").node()));
	    
	    return xmlString;
	}

	var fn_get_angle = function (d) {
	    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
	    return a > 90 ? a - 180 : a;
	}

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 가장 큰 값의 도형 사이즈와 비교해서 현재 값으로 그릴 수 있는 도형 크기 계산 
	* @param {Object} symbol : 차트 모양
	* @param {Number} maxSize : 가장 큰 도형의 사이즈
	* @param {Number} maxValue : 가장 큰값
	* @author 김정수(2015.10.16 )
	*/
	var fn_get_geometrySize = function (symbol, maxSize, maxValue){
		
	    this.symbol = symbol;
	    this.maxSize = maxSize;
	    this.maxValue = maxValue;

	    this.getSize = function(value){
	        switch(this.symbol) {
	            case 'circle': 
	            case 'square': 
	                return Math.sqrt(value/this.maxValue)*this.maxSize;
	            case 'bar': 
	                return (value/this.maxValue)*this.maxSize;
	            case 'sphere': 
	            case 'cube': 
	                return Math.pow(value/this.maxValue, 1/3)*this.maxSize;
	        }
	    };
	}

	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트를 그릴 위치값과 values를 이용하여  feature 생성 후 챠트레이어에 추가 
	* @param {Object} _oChartDatas : geojson 타입의 차트 그릴 데이터(현재는 샘플로 위치값만 사용하고 차트에 바인딩할 데이터는 랜덤 생성
	* @author 김정수(2015.10.16 )
	*/
	var fn_add_features = function (_oChartDatas)
	{	
		oChartLayer.removeAllFeatures();
			
		var b = map.calculateBounds();
		var d = 20*map.getResolution(); // inset 20px
		
		
		String.format = function() {
		    var theString = arguments[0];
		    
		    for (var i = 1; i < arguments.length; i++) {
		        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		        theString = theString.replace(regEx, arguments[i]);
		    }
		    
		    return theString;
		};
		
		$.each(_oChartDatas.features, function (key, val) {
			  var geometry = val.geometry;		  
			  var coordinates = geometry.coordinates;
			  
			  var properties = val.properties;
			  
			  var jsonData = "";
			  var jsonRow = "";
			  var sum =0;
			  $.each(properties, function (i, val) {
					sum += parseInt(val);
					
					jsonRow = String.format("{'label':'{0}', 'value':{1}},",i,val.toString());
					jsonData += jsonRow;				
			  });
			  
			  jsonData = "[" + jsonData.substring(0, jsonData.length-1) + "]";
			  jsonData = eval(jsonData);
			  
			  var f = new OpenLayers.Feature.Vector( new OpenLayers.Geometry.Point(coordinates[0], coordinates[1]), { values:jsonData, radius:sum });
				
			  oChartLayer.addFeatures(f);		    
		});
	}


	/**
	* @memberof USV.MAP_SPECIAL
	* @method 
	* @description 차트 범례 변경
	* @param {Object} data : 차트 데이터
	* @author 김정수(2015.10.16 )
	*/
	var fn_heatmap_legend = function (_oData) {

		oLegendCanvas.width = 100;
		oLegendCanvas.height = 10;
	    
		$('min').innerHTML = _oData.min;
	    $('max').innerHTML = _oData.max;

	    if (_oData.gradient != oGradientCfg) {
	    	oGradientCfg = _oData.gradient;
	      var oGradient = oLegendCtx.createLinearGradient(0, 0, 100, 1);
	      for (var key in oGradientCfg) {
	    	  oGradient.addColorStop(key, oGradientCfg[key]);
	      }

	      oLegendCtx.fillStyle = oGradient;
	      oLegendCtx.fillRect(0, 0, 100, 10);
	      $('gradient').src = oLegendCanvas.toDataURL();
	    }
	};


	$(function() {
		
	    $( "#datepicker" ).datepicker({
	    	showButtonPanel : true, 
	        currentText: '오늘 날짜', 
	        closeText: '닫기',        
	        dateFormat: 'yy-mm-dd',
	        prevText: '이전 달',
	        nextText: '다음 달',
	        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	        dayNames: ['일','월','화','수','목','금','토'],
	        dayNamesShort: ['일','월','화','수','목','금','토'],
	        dayNamesMin: ['일','월','화','수','목','금','토'],
	        showMonthAfterYear: true,
	        yearSuffix: '년'        
	      });
	    $( "#datepicker" ).datepicker("setDate",new Date());
	 });
	//------------------------------------------------------------------------------------------------------------------
	// ## public 메소드
	//------------------------------------------------------------------------------------------------------------------
	_mod_map_special.fn_view_heatmap						=	fn_view_heatmap;
	_mod_map_special.fn_hide_heatmap						=	fn_hide_heatmap;
	_mod_map_special.fn_view_chartmap_d3					=	fn_view_chartmap_d3;
	_mod_map_special.fn_hide_mapchart						=	fn_hide_mapchart;
	_mod_map_special.fn_add_wornFacilityLayer				=	fn_add_wornFacilityLayer;
	_mod_map_special.fn_remove_wornFacilityLayer			=	fn_remove_wornFacilityLayer;
	
	//------------------------------------------------------------------------------------------------------------------
	
	return _mod_map_special;
	
}(USV.MAP_SPECIAL || {}, jQuery));