/****************************************************************
 *
 * 파일명 : EditStyle.js
 * 설  명 : 편집에 사용되는 vector레이어상의 feature 스타일 정의 
 ****************************************************************          
 *
 *    수정일      수정자     Version        Function 명
 * ------------    ---------   -------------  ----------------------------
 * 2016.03.18      최재훈       1.0             최초생성
 */

/**
 * 기본심볼 정의
 * */
 
OpenLayers.Feature.Vector.style = {
    'default': {
        fillColor: "#ee9900",
        fillOpacity: 0.4, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#ee9900",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },
    'select': {
        fillColor: "#FF7373",
        fillOpacity: 0.6, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#FF4545",
        strokeOpacity: 1,
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
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

    },
    'temporary': {
        fillColor: "#66cccc",
        fillOpacity: 0.2, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#66cccc",
        strokeOpacity: 1,
        strokeLinecap: "round",
        strokeWidth: 2,
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3

    },
    'delete': {
        display: "none"
    }
};    


/**********************************************************************************
 * 설 명 : 벡터레이어의 StyleMap 구성을 위한 정의
 * 인 자 : N/A
 * 사용법 : 각 함수별 정의. ex) NUTs.EditStyle.getSymbolizerLineString('#F26161', 'solid', 3, 1)
 * 수정일				수정자			수정내용
 * ----------------------------------------------------------------------
 * 2015.11.19			윤은희		최초 생성
 * 
 **********************************************************************************/
NUTs.EditStyle = {
		
		'_default' : {
			fillColor: '#00CCFF',
            fillOpacity: 0.5,
            strokeColor: '#00AAFF',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
		},
		
		'select' : {
			fillColor: '#DE6868',
            fillOpacity: 0.7,
            strokeColor: '#CC0000',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5	
		},
		
		'defaultLabel' : {
            fillColor: '#EC5781',
            fillOpacity: 0.8,
            strokeColor: '#E11A51',
            strokeWidth: 2,
            graphicZIndex: 11,
            pointRadius: 0,
            cursor: 'default',
            label: '${label}',
            fontColor: '#000000',
            fontSize: '11px',
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            labelAlign: 'cm',
            labelXOffset: '${xOffset}',
            labelYOffset: '${yOffset}',
            labelOutlineColor: '#FFFFFF',
            labelOutlineWidth: 4,
            labelSelect: false
		},
		
		'selectLabel' : {
            fillColor: '#fc0',
            fillOpacity: 0.8,
            strokeColor: '#f70',
            strokeWidth: 2,
            graphicZIndex: 2,
			pointRadius: 5,
            cursor: 'default',
            label: '${label}',
            fontColor: 'black',
            fontSize: '11px',
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'bold',
            labelAlign: 'cm',
            labelXOffset: '${xOffset}',
            labelYOffset: '${yOffset}',
            labelOutlineColor: '#fc0',
            labelOutlineWidth: 6,
            labelSelect: true
		},
		
		/**
		 * 포인트 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerPoint : function(_oGraphic, _nSize, _nOpacity){	
			var oSymbolizer = {
				externalGraphic: 'data:image/png;base64'.concat(',', _oGraphic.replace(/\r?\n/g, '')),
				graphicWidth: parseInt(_nSize,10),
				graphicHeight: parseInt(_nSize,10),
				fillOpacity: parseFloat(_nOpacity).toFixed(2)
			  };
			
			return oSymbolizer;
		},
		getSymbolizerPointType2 : function(_oGraphic, _nSize){	
			var oSymbolizer = {
					externalGraphic: _oGraphic,
					pointRadius: parseInt(_nSize,10)
				  };
			
			return oSymbolizer;
		},
		/**
		 * 라인 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerLineString : function(_sColor, _sDashStyle, _nWidth, _nOpacity, _sLinecap, _nIndex){
			var oSymbolizer = {
				fillColor: _sColor,
				strokeColor: _sColor,
				strokeDashstyle : _sDashStyle,
				strokeWidth: parseInt(_nWidth,10),
				strokeOpacity: parseFloat(_nOpacity).toFixed(2),
				strokeLinecap: _sLinecap,
				graphicZIndex: parseInt(_nIndex,10)
			};	

			return oSymbolizer;	
		},

		/**
		 * 폴리곤 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerPolygon : function(_oPolygon){
			var oSymbolizer = {
				fillColor: _oPolygon.fillColor,
				fillOpacity: parseFloat(_oPolygon.fillOpacity).toFixed(2),
			};
			if(_oPolygon.strokeWidth) {
				$.extend(true,oSymbolizer,{
					strokeColor: _oPolygon.stroke,
					strokeDashstyle : _oPolygon.strokeDashstyle,
					strokeWidth: parseInt(_oPolygon.strokeWidth,10),
					strokeOpacity: parseFloat(_oPolygon.strokeOpacity).toFixed(2),
					strokeLinecap: _oPolygon.strokeLinecap
				});
			} else {
				oSymbolizer.stroke = false;
			}
			return oSymbolizer;	
		},

		/**
		 * 텍스트 타입 심볼라이저 obj 리턴
		 * */
		getSymbolizerText : function(_sLabel, _sColor, _nSize, _sFontFamily, _sFontWeight,_sCodeDomain){
			var oSymbolizer = {
				label : _sLabel,                    
				fontColor: _sColor,
				fontSize: parseInt(_nSize,10),
				fontFamily: _sFontFamily,
				fontWeight: _sFontWeight,
				codeDomain: _sCodeDomain
			};	

			return oSymbolizer;	
		},
		
		/**
		 * 심볼 필터 obj 리턴
		 */
		getStyleFilter : function(_sFilterType, _sProperty, _sValue){
			var oFilter = {};
			
			if (_sFilterType !== OpenLayers.Filter.Comparison.BETWEEN) {
				oFilter = new OpenLayers.Filter.Comparison({
					type: _sFilterType,
					property: _sProperty,
					value: _sValue
				  });
			}
			
			return oFilter;			
		},
		
		/**
		 * 기본 심볼 obj 리턴
		 */
		getObjectStyleMap : function(_oStyleMap){
			
			var oStyleMap = new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(
						_oStyleMap
				)
			});
			
			return oStyleMap;	
		},

		/**
		 * 룰을 포함한 심볼 obj 리턴
		 */
		getObjectStyleMapHasRules : function(_oStyleMap, _oRules){	
			var aRuleArray = [];
			var aRules = _oRules.rules;
			
			for(var i in aRules){
				aRuleArray.push(new OpenLayers.Rule(aRules[i]));
			}
			
			var oStyleMap = new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(
						_oStyleMap,
						{
							rules: aRuleArray
						})
			});

			return oStyleMap;	
		},
		
		getSymbolizerPointShape : function(_oPoint) {
			var oSymbolizer = {
					graphicName : _oPoint.graphicName,
					fillColor : _oPoint.fillColor,
					fillOpacity : parseFloat(_oPoint.fillOpacity).toFixed(2),
					pointRadius : parseInt(_oPoint.size,10)/2,
				};
			if(_oPoint.strokeWidth) {
				$.extend(true,oSymbolizer,{
					strokeWidth :parseInt( _oPoint.strokeWidth,10),
					strokeColor : _oPoint.strokeColor,
					strokeOpacity : parseFloat(_oPoint.strokeOpacity).toFixed(2)
				});
			} else {
				oSymbolizer.stroke = false;
			}
			return oSymbolizer;	
		},
		
		getSymbolizer : function(_oRule) {
			var oSymbolizer = {};
			
			if(_oRule.point) {
				var oPoint = _oRule.point;
				if(oPoint.externalGraphic) { 
					if(!oPoint.size) //ggash 20170118 for geoserver ==> 엔진 구분방식 개선 필요 & 해당 property(size / opacity)를 원래 기본 제공하지 않는 건지 확인 필요.
						$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPointType2(oPoint.externalGraphic, oPoint.pointRadius ));
					else	//base64  encode된 값 전달방식 
						$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPoint(oPoint.externalGraphic, oPoint.size, oPoint.opacity));
				} else {
					$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPointShape(oPoint));
				}
			} else if(_oRule.line) {
				var oLine = _oRule.line;
				if(!oLine.strokeOpacity) //ggash 20170118 for geoserver ==> 엔진 구분방식 개선 필요 & 해당 property(strokeWidth / strokeOpacity)를 원래 기본 제공하지 않는 건지 확인 필요.
					$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerLineString(oLine.stroke, oLine.strokeDashArray, 1, 1, oLine.strokeLinecap, 1));
				else
					$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerLineString(oLine.stroke, oLine.strokeDashArray, oLine.strokeWidth, oLine.strokeOpacity, oLine.strokeLinecap, 1));
			} else if(_oRule.polygon) {
				var oPolygon = _oRule.polygon;
				$.extend(true,oSymbolizer,NUTs.EditStyle.getSymbolizerPolygon(oPolygon));
			}
			
			return oSymbolizer;
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
		         })
			});

		}
		
};