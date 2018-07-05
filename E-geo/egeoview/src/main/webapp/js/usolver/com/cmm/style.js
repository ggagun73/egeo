/**
 * UI 구성 관련  
 * @namespace {Object} USV.STYLE
 */
USV.STYLE = (function(_mod_style, $, undefined){
	
	
var handlerSelCap; // 선 끝모양 객체
var handlerSelLineCap; // 선 끝모양 객체
var handlerSelStyle; // 선 스타일 객체
var handlerSelLineStyle; // 선 스타일 객체
var handlerSelTexture

/**
* @memberof USV.MAP_EDITOR
* @method 
* @description 편집에 필요한 UI를 초기화한다.
* @author 최재훈(2015.10.06)
*/
/*var fn_init_editorView = function (){

    $('#editMonitor').hide(); 	//편집모니터
    $('#attrViewer').hide();	//검색결과창
    $('#toolbar').hide();
};*/




/**
* @memberof USV.STYLE
* @method 
* @description 편집 가능 레이어 목록 표출 
* 1> 편집 대상 레이어 목록 표출
* @caller map.jsp 로딩 시 자동호출
* @author 최재훈(2015.10.06)
*/
var fn_init_editLayerList = function (_oEditLayerInfo, _bEditLayerCheck){

	//debugger;
	var aNotAllowdLayers = [];
	var oUserAuthor = COMMON.fn_get_userAuthorInfo(); 
	var sCurSystem = COMMON.fn_get_currentSystem();
	
	var sAccessibleLayers = oUserAuthor[sCurSystem].EDIT_LAYER.join(",");
	
	var nLayerLen = _oEditLayerInfo.length;	
	var sHtmlString = [];
	
	$("#selEditLayer ul.b_intx").text("");
	
	for(var i = 0; i < nLayerLen ; i++){
		var oEditLayer = _oEditLayerInfo[i];
		var sLyrEngNm, sLyrKorNm;
		
		if(oEditLayer.lyrEngNm){
			sLyrEngNm = oEditLayer.lyrEngNm;
			sLyrKorNm = oEditLayer.lyrKoreanNm;
		}
		else if(oEditLayer.table){
			sLyrEngNm = oEditLayer.table;
			sLyrKorNm = oEditLayer.alias;
		}
		//권한 체크
		if(sAccessibleLayers.indexOf(sLyrEngNm) !== -1 ) {
			if(_bEditLayerCheck){
				if(fn_check_includeEditLayer(sLyrEngNm))
					sHtmlString.push("<li><a href='#' id='" + sLyrEngNm + "' class='depth2'>" + sLyrKorNm + "</a></li>");
			} 
			else
				sHtmlString.push("<li><a href='#' id='" + sLyrEngNm + "' class='depth2'>" + sLyrKorNm + "</a></li>");
		}
		else{
			aNotAllowdLayers.push(sLyrKorNm);
		}
	}
	
	var nNotAllowdCount = aNotAllowdLayers.length;
	
	/*if(nNotAllowdCount > 0){
		COMMON.showMessage("편집 레이어 제외 알림 &[" + aNotAllowdLayers.join(',') + "] 레이어에 대한 편집 권한이 없어 서비스 대상에서 제외처리 하였습니다.", 10000);
	}*/

	//편집 대상 레이어 목록 표출
	$("#selEditLayer ul.b_intx").append(sHtmlString.join(""));
	
};

var fn_check_includeEditLayer = function(_sLayer){
	var oOrgEditLayers = COMMON.fn_get_orgEditLayerInfo();
	for(var item in oOrgEditLayers) {
		if(item != "length" ){

			var sEditLayer = oOrgEditLayers[item].lyrEngNm;
			if(sEditLayer.toLowerCase() == _sLayer.toLowerCase()){
				return true;
				break;
			}
			
		}
	}
}
/**
* @memberof USV.STYLE
* @method 
* @description mouseover, mouseout 이미지 전환 이벤트 등록 
* @caller map.jsp 로딩 시 자동호출
* @author 최재훈(2016.01.27)
*/
var fn_init_eventImgOnOff = function(){
	var oImgElements = $(".onoffimg");
	var nElementSize = oImgElements.length; 
	for(var i=0; i<nElementSize ; i++){
		var oImgElement = oImgElements[i];
		fn_reg_eventImgOnOff(oImgElement);
		
	}
};

/**
* @memberof USV.STYLE
* @method 
* @description mouseover, mouseout 이미지 전환 이벤트 등록
* @author 최재훈(2016.01.27)
* @param  {Object} _oEl : 이벤트 등록대상 img obj
*/
var fn_reg_eventImgOnOff = function(_oEl){
	/*if(_oEl){
		_oEl.addEventListener("mouseover", function(){
		_oEl.src = _oEl.src.replace('off','on');
	}, false);
	_oEl.addEventListener("mouseout", function(){
		_oEl.src = _oEl.src.replace('on','off');
	}, false);
	}*/
	if(_oEl){
		$(_oEl).on("mouseover", function(){
			$(this).attr('src',$(this).attr('src').replace('off','on'));
		});
		$(_oEl).on("mouseout", function(){
			$(this).attr('src',$(this).attr('src').replace('on','off'));
		});
	}
};


/**
* @memberof USV.STYLE
* @method 
* @description drawTool 에 적용할 UI 초기화
*/
var fn_init_drawToolview = function () {
		
		$("#map-left-menu").tabs();

		$(".full_color").spectrum({
		    allowEmpty:true,
		    color: "#FFF",
		    showInput: true,
		    containerClassName: "full-spectrum",
		    showInitial: true,
		    showPalette: true,
		    showSelectionPalette: true,
		    showAlpha: false,
		    maxPaletteSize: 10,
		    chooseText: "선택",
		    cancelText: "취소",
		    preferredFormat: "hex",
		    palette: [
		        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
		        "rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
		        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
		        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
		        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
		        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
		        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
		        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
		        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
		        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
		        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
		        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
		        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
		        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
		    ]
		});
		
		
		$("#popup_add_memo").draggable({ cursor: "move" });		
		$("#popup_subject").draggable({ cursor: "move" });
		$("#printPreview").draggable({ cursor: "move" });
		$("#divMemoHist").draggable({ cursor: "move" });
		
		// 드롭다운 옵션
		var msDropDownOption = {
			animStyle : 'none',
			rowHeight : 30
		};
		
		handlerSelCap = $("#selCap").msDropDown(msDropDownOption).data("dd");
		handlerSelLineCap = $("#selLineCap").msDropDown(msDropDownOption).data("dd");
		handlerSelStyle = $("#selStyle").msDropDown(msDropDownOption).data("dd");
		handlerSelLineStyle = $("#selLineStyle").msDropDown(msDropDownOption).data("dd");
		handlerSelTexture = $("#selExternalGraphic").msDropDown(msDropDownOption).data("dd");
		handlerSelLineJoin = $("#selLineJoin").msDropDown(msDropDownOption).data("dd");
		
		// 슬라이더 바 생성
		$("#sliderOpa").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$c.val(ui.value);
			}
		});
		
		$("#txtOpa").change(function(){
			$("#sliderOpa").slider("value",$(this).val());
		});
		
		// 면 투명도 슬라이더 바 생성
		$("#sliderOpaPoly").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtOpaPoly").val(ui.value);
			}
		});
		
		$("#txtOpaPoly").change(function(){
			$("#sliderOpaPoly").slider("value",$(this).val());
		});
		
		// 이미지 투명도 슬라이더 바 생성
		$("#sliderImageOpa").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtImageOpa").val(ui.value);
			}
		});
		
		$("#txtImageOpa").change(function(){
			$("#sliderImageOpa").slider("value",$(this).val());
		});
		
		// 점 투명도 슬라이더 바 생성
		$("#sliderShapeOpa").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtShapeOpa").val(ui.value);
			}
		});
		
		$("#txtShapeOpa").change(function(){
			$("#sliderShapeOpa").slider("value",$(this).val());
		});
		
		// 선 투명도 슬라이더 바 생성
		$("#sliderLineOpa").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtLineOpa").val(ui.value);
			}
		});
		
		$("#txtLineOpa").change(function(){
			$("#sliderLineOpa").slider("value",$(this).val());
		});
		
		// 면 투명도 슬라이더 바 생성
		$("#sliderPolyOpa").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtPolyOpa").val(ui.value);
			}
		});
		
		$("#txtPolyOpa").change(function(){
			$("#sliderPolyOpa").slider("value",$(this).val());
		});

		
		// 배경색 투명도 슬라이더 바 생성
		$("#sliderOpaBack").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtOpaBack").val(ui.value);
			}
		});
		
		// 테두리색 투명도 슬라이더 바 생성
		$("#sliderOpaBackLine").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtOpaBackLine").val(ui.value);
			}
		});	
		
		// 라벨 글씨 투명도 슬라이더 바 생성
		$("#sliderLabelFontOpa").slider( {
			range : "min",
			min : 0,
			max : 100,
			value : 0,
			slide : function(event, ui) {
				$("#txtLabelFontOpa").val(ui.value);
			}
		});
		
		$("#txtLabelFontOpa").change(function(){
			$("#sliderLabelFontOpa").slider("value",$(this).val());
		});
		
		$("#chkSymbolMark").change(function(){
			var sLayerName = $("#totLayer").text();
			var sRuleName = $("#totRule").text();
			var bCheckedBox = $(this).is(":checked");
			var sStatus;
			if(bCheckedBox) {
				sStatus = "on";
			} else {
				sStatus = "off";
			}
			
			fn_toggle_wmsRule(sStatus,sLayerName,sRuleName);
			fn_select_treeRuleNode(sLayerName,sRuleName);
			MAP.fn_redraw_wms();
		});
		
		$(".chkOutLine").change(function(){
			if($(this).is(":checked")) {
				$(".lineSymbol").show();
			} else {
				$(".lineSymbol").hide();
			}
		});
		
		$("#chkLabelBackground").change(function(){
			if($(this).is(":checked")) {
				$(".labelBackground").show();
			} else {
				$(".labelBackground").hide();
			}
		});
		
		$("a.btn_black").on("click",function(){
			$("#imageFile").trigger("click");
		})
		
		$("#imageFile").change(function(){
			fn_read_Image( this );
			$("#imageFileUrl").val($("#imageFile").val());
		});
		$("#imageFile").trigger("change");
}	

/**
* @memberof USV.STYLE
* @method 
* @description drawTool 에 적용할 타입별 UI 정의
*/
var fn_bind_drawToolAttr = function (attr) {
	switch (attr.featureType) {
		case 'Point':
			//타입 graphicName
			$('#selType').val(attr.graphicName);
			
			// 도형크기 strokeWidth
			$('#txtSize').val(attr.pointRadius);
			
			// 선 두께 strokeWidth
			$('#txtThickness').val(attr.strokeWidth);

			// 선색 strokeColor
//			$('#colorAttr').val(attr.strokeColor);
			$('#colorAttr').spectrum("set", attr.strokeColor);
			
			// 선투명도 strokeOpacity
			var strokeOpacity = Math.ceil((1 - attr.strokeOpacity) * 100);
			$('#txtOpa').val(strokeOpacity);
			$('#sliderOpa').val(strokeOpacity);
			
			// 면색 fillColor
//			$('#colorAttrPoly').val(attr.fillColor);
			$('#colorAttrPoly').spectrum("set", attr.fillColor);
			
			// 면투명도 fillOpacity
			var fillOpacity = Math.ceil((1 - attr.fillOpacity) * 100);
			$('#txtOpaPoly').val(fillOpacity);
			$('#sliderOpaPoly').val(fillOpacity);
			break;
		case 'Line':
			//선 색 strokeColor
//			$('#colorAttr').val(attr.strokeColor);
			$('#colorAttr').spectrum("set", attr.strokeColor);
			
			// 선 두께 strokeWidth
			$('#txtThickness').val(attr.strokeWidth);
			
			// 선 투명도 strokeOpacity
			var strokeOpacity = Math.ceil((1 - attr.strokeOpacity) * 100);
			$('#txtOpa').val(strokeOpacity);
			$('#sliderOpa').val(strokeOpacity);
			
			// 선 스타일 strokeDashstyle
			handlerSelStyle.set("selectedIndex",$("#selStyle option").index($("#selStyle option[value='" + attr.strokeDashstyle + "']").get(0)));
			handlerSelLineStyle.set("selectedIndex",$("#selLineStyle option").index($("#selLineStyle option[value='" + attr.strokeDashstyle + "']").get(0)));
			
			// 모서리 스타일 strokeLinecap
			handlerSelCap.set("selectedIndex",$("#selCap option").index($("#selCap option[value='" + attr.strokeLinecap + "']").get(0)));
			handlerSelLineCap.set("selectedIndex",$("#selLineCap option").index($("#selLineCap option[value='" + attr.strokeLinecap + "']").get(0)));
			break;
		case 'Image':
			//너비 graphicWidth
			$('#txtWidth').val(attr.graphicWidth);
			
			// 높이 graphicHeight
			$('#txtHeight').val(attr.graphicHeight);
			
			// 투명도 graphicOpacity
			var opacity = Math.ceil((1 - attr.graphicOpacity) * 100);
			$('#txtOpa').val(opacity);
			$('#sliderOpa').val(opacity);
			
			break;
		case 'Polygon':
			//선 색 strokeColor
//			$('#colorAttr').val(attr.strokeColor);
			$('#colorAttr').spectrum("set", attr.strokeColor);
			
			// 선 두께 strokeWidth
			$('#txtThickness').val(attr.strokeWidth);
			
			// 선 투명도 strokeOpacity
			var strokeOpacity = Math.ceil((1 - attr.strokeOpacity) * 100);
			$('#txtOpa').val(strokeOpacity);
			$('#sliderOpa').slider("value", strokeOpacity);
			
			handlerSelStyle.set("selectedIndex",$("#selStyle option").index($("#selStyle option[value='" + attr.strokeDashstyle + "']").get(0)));
			
			// 면색 fillColor
			//$('#colorAttrPoly').val(attr.fillColor);
			$('#colorAttrPoly').spectrum("set", attr.fillColor);
			
			// 면투명도 fillOpacity
			var fillOpacity = Math.ceil((1 - attr.fillOpacity) * 100);
			$('#txtOpaPoly').val(fillOpacity);
			$('#sliderOpaPoly').slider("value", fillOpacity);
			
			break;
		case 'Text':
			//서체 font-family
			$('#selFont').val(attr['fontFamily']);
			
			// 글자 크기 font-size
			$('#txtSize').val(attr['fontSize'].replace("px", ""));
			
			// 글자색 color
			$('#colorAttr').val(attr['fontColor']);
			$('#colorAttr').css("background-color", attr['fontColor']);
			
			// 배경 색상 및 투명도
			var res = NUTs.Util.fn_convert_color(attr['background_fill']);
			$('#colorAttrBack').val(res[1]);
			$('#colorAttrBack').css("background-color", res[1]);
			$('#txtOpaBack').val(res[0]);
			$('#sliderOpaBack').slider("value", res[0]);
			
			// 배경 테두리 색상 및 투명도
			var res = NUTs.Util.fn_convert_color(attr['background_line']);
			$('#colorAttrBackLine').val(res[1]);
			$('#colorAttrBackLine').css("background-color", res[1]);
			$('#txtOpaBackLine').val(res[0]);
			$('#sliderOpaBackLine').slider("value", res[0]);
			break;
		}
	
	// IE Height 버그로 인하여 수정
	$('#sliderOpa .ui-slider-range').css('height',$('#sliderOpa .ui-slider-range').parent().innerHeight());
	$('#sliderOpaPoly .ui-slider-range').css('height',$('#sliderOpaPoly .ui-slider-range').parent().innerHeight());
	$('#sliderOpaBack .ui-slider-range').css('height',$('#sliderOpaBack .ui-slider-range').parent().innerHeight());
	$('#sliderOpaBackLine .ui-slider-range').css('height',$('#sliderOpaBackLine .ui-slider-range').parent().innerHeight());	

	$("#liSubmit .btnApply").unbind('click');
	$("#liSubmit .btnApply").click(fn_apply_drawToolattr);
}

/**
* @memberof USV.STYLE
* @method 
* @description drawTool 에 적용할 타입별  UI 
*/
var fn_switch_drawToolshow = function (type) {
	//li 태그 모두 숨김
	$("#attrMng li").hide();

	switch (type) {
	//도형이 선택 되지 않았을 때
	case 'None':
		$('#liNone').show();
		$('#attrMng .totMenu strong').text("속성 설정");
		break;
	// 점형
	case 'Point':
		$('#attrMng .totMenu strong').text("점");
		$('#liType').show(); // 타입 graphicName
		$('#liSize').show(); // 도형크기 strokeWidth
		$('#liThickness').show(); // 선 두께 strokeWidth
		$('#liColor').show(); // 선색 strokeColor
		$('#liOpa').show(); // 선투명도 strokeOpacity
		$('#liColorPoly').show(); // 면색 fillColor
		$('#liOpaPoly').show(); // 면투명도 fillOpacity
		$('#liSubmit .btnBack').hide(); 
		$('#liSubmit').show(); // 적용
		break;
	case 'Line':
		$('#attrMng .totMenu strong').text("선형");
		$('#liColor').show(); // 선 색 strokeColor
		$('#liThickness').show(); // 선 두께 strokeWidth
		$('#liOpa').show(); // 선 투명도 strokeOpacity
		$('#liStyle').show(); // 선 스타일 strokeDashstyle
		$('#liCap').show(); // 모서리 스타일 strokeLinecap
		 $('#liSubmit .btnBack').hide(); 
		$('#liSubmit').show(); // 적용
		break;
	case 'Image':
		$('#attrMng .totMenu strong').text("이미지");
		$('#liWidth').show(); // 너비 graphicWidth
		$('#liHeight').show(); // 높이 graphicHeight
		$('#liOpa').show(); // 투명도 graphicOpacity
		$('#liSubmit .btnBack').hide(); 
		$('#liSubmit').show(); // 적용
		break;
	case 'Polygon':
		$('#attrMng .totMenu strong').text("다각형");
		$('#liColor').show(); // 선 색 strokeColor
		$('#liThickness').show(); // 선 두께 strokeWidth
		$('#liOpa').show(); // 선 투명도 strokeOpacity
		$('#liStyle').show(); // 선 스타일 strokeDashstyle
		$('#liColorPoly').show(); // 면색 fillColor
		$('#liOpaPoly').show(); // 면투명도 fillOpacity
		$('#liSubmit .btnBack').hide(); 
		$('#liSubmit').show(); // 적용
		break;
	case 'Text':
		$('#attrMng .totMenu strong').text("글자");
		$('#liFont').show(); // 서체 font-family
		$('#liSize').show(); // 글자 크기 font-size
		$('#liColor').show(); // 글자색 color
		$('#liSubmit .btnBack').hide(); 
		$('#liSubmit').show(); // 적용
		$('#liBackFillColor').show(); //배경색
		$('#liBackFillOpa').show(); //배경 투명도
		$('#liBackLineColor').show(); //배경 테두리 색
		$('#liBackLineOpa').show(); //배경 테두리 투명도
		break;
	case 'Multi':
		$('#attrMng .totMenu strong').text("다중 선택");
		$('#liColor').show(); // 선 색 strokeColor
		$('#liThickness').show(); // 선 두께 strokeWidth
		$('#liOpa').show(); // 선 투명도 strokeOpacity
		$('#liStyle').show(); // 선 스타일 strokeDashstyle
		$('#liColorPoly').show(); // 면색 fillColor
		$('#liOpaPoly').show(); // 면투명도 fillOpacity
		$('#liSubmit .btnBack').hide();
		$('#liSubmit').show(); // 적용
		$('#liIndex').show(); // 위상변화
		break;
	}
}

/**
* @memberof USV.STYLE
* @method 
* @description drawTool UI에 적용할 타입별 attribute정의 
*/
var fn_apply_drawToolattr = function () {
	
	var feature = MAP.fn_get_drawTool().getSelectFeature();
	var attr = feature.attributes;

	switch (attr.featureType) {
	case 'Point':
		//타입 graphicName
		attr.graphicName = $('#selType').val();
		// 도형크기 strokeWidth
		attr.pointRadius = $('#txtSize').val();
		// 선 두께 strokeWidth
		attr.strokeWidth = $('#txtThickness').val();
		// 선색 strokeColor
		attr.strokeColor = $('#colorAttr').val();
		// 선투명도 strokeOpacity
		attr.strokeOpacity = 1 - ($('#txtOpa').val() / 100);
		// 면색 fillColor
		attr.fillColor = $('#colorAttrPoly').val();
		// 면투명도 fillOpacity
		attr.fillOpacity = 1 - ($('#txtOpaPoly').val() / 100);
		break;
	case 'Line':
		//선 색 strokeColor
		attr.strokeColor = $('#colorAttr').val();
		// 선 두께 strokeWidth
		attr.strokeWidth = $('#txtThickness').val();
		// 선 투명도 strokeOpacity
		attr.strokeOpacity = 1 - ($('#txtOpa').val() / 100);
		// 선 스타일 strokeDashstyle
		attr.strokeDashstyle = $("#selStyle").val();
		// 모서리 스타일 strokeLinecap
		attr.strokeLinecap = $("#selCap").val();
		break;
	case 'Image':
		//너비 graphicWidth
		attr.graphicWidth = $('#txtWidth').val();
		// 높이 graphicHeight
		attr.graphicHeight = $('#txtHeight').val();
		// 투명도 graphicOpacity
		attr.graphicOpacity = 1 - ($('#txtOpa').val() / 100);
		break;
	case 'Polygon':
		//선 색 strokeColor
		attr.strokeColor = $('#colorAttr').val();
		// 선 두께 strokeWidth
		attr.strokeWidth = $('#txtThickness').val();
		// 선 투명도 strokeOpacity
		attr.strokeOpacity = 1 - ($('#txtOpa').val() / 100);
		// 선 스타일 strokeDashstyle
		attr.strokeDashstyle = $("#selStyle").val();
		// 면색 fillColor
		attr.fillColor = $('#colorAttrPoly').val();
		// 면투명도 fillOpacity
		attr.fillOpacity = 1 - ($('#txtOpaPoly').val() / 100);
		break;
	case 'Text':
		//서체 font-family
		attr['fontFamily'] = $('#selFont').val();
		// 글자 크기 font-size
		attr['fontSize'] = $('#txtSize').val() + "px";
		// 글자색 color
		attr['fontColor'] = $('#colorAttr').val();
		// 글자 배경색 및 투명도
		attr['background_fill'] = NUTs.Util.fn_convert_color([$('#txtOpaBack').val(),$('#colorAttrBack').val()]); 
		// 글자 배경 테두리 색 및 투명도
		attr['background_line'] = NUTs.Util.fn_convert_color([$('#txtOpaBackLine').val(),$('#colorAttrBackLine').val()]);

		MAP.fn_get_drawTool().setTextAttr(feature);
		break;
	}

	MAP.fn_get_drawTool().redraw();
};


/**
* @memberof USV.STYLE
* @method 
* @description [편집도구]메뉴 하단의 서브메뉴 UI Show/Hide 처리
* @author 최재훈(2015.10.21)
*/
var fn_show_editTool = function (tabId){
	// 편집도구 - toggle Tab
	 
		$(".tabEdit ul a").each(function() {		
			if($(this).attr("id") == tabId) {
				$(this).addClass("LeftTab_selected");
				$("#"+$(this).attr("id").replace("tab", "div")).css("display","block");
			}
			else{
				$(this).removeClass("LeftTab_selected");	
				if($(this).attr("class") === "")
					$(this).addClass("LeftTab");
				$("#"+$(this).attr("id").replace("tab", "div")).css("display","none");
			}
		});	
	
};

/**
* @memberof USV.STYLE
* @method 
* @description 편집 모니터 트리 초기화
* @author 윤은희(2015.09.21)
*/
function fn_init_editTree(){
	$('#editListTree')[0].innerText = '';
	$('#editListTree')[0].innerHTML = '';
	$('#editContent')[0].innerText = '';
	$('#editContent')[0].innerHTML = '';
}

/**
* @memberof USV.STYLE
* @method 
* @description 버튼에 div on/off 가 있는 경우 일괄 처리
* @author 이상호(2016.09.05)
*/
var fn_init_onOffDiv = function() {
	
	$('.onoffdiv').each(function() {
		var sId = $(this).attr('id');
		var sDivId = sId.replace('btn_','')+"Pane";
		$("#"+sDivId).addClass('onoffdivPane');
		
		$("#"+sDivId).attrchange({
			trackValues: true,
		    callback: function(evnt) {
		        if(evnt.attributeName == "style") {
		            if(evnt.newValue.search('display: none') != -1) {
		            	$("#"+sId).find('img').attr('src',$("#"+sId).find('img').attr('src').replace('selected','off'));
		            }
		            if(evnt.oldValue.search('display: none') != -1){
		            	$("#"+sId).find('img').attr('src',$("#"+sId).find('img').attr('src').replace('on','selected').replace('off','selected'));
		            }
		        }
		    }
		});
	});
	
	$('.onoffdiv').on('click',function() {
		var sId = $(this).attr('id');
		var sDivId = sId.replace('btn_','')+"Pane";
		var oPane = $("#"+sDivId);
		
		if(oPane.css('display') != 'none') {
			$('.onoffdivPane').hide();
		} else {
			$('.onoffdivPane').hide();
			COMMON.showWindow(oPane);
		}
	})
}


/**
* @memberof USV.STYLE
* @method 
* @description ViewVector레이어에 적용할 styleMap정의
* @returns ViewVector styleMap
* @author 최재훈(2015.11.03)
*/
/*var fn_get_styleMapOnViewVector = function(){
	return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            fillColor: '#bcff03',
            fillOpacity: 0.5,
            strokeColor: '#33cc00',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
        }),
        'select': new OpenLayers.Style({
            fillColor: '#bcff03',
            fillOpacity: 0.7,
            strokeColor: '#33cc00',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
        })
    });
}*/

/**
* @memberof USV.STYLE
* @method 
* @description ShpVector에 적용할 styleMap정의
* @returns ShpVector styleMap
* @author 최재훈(2015.11.03)
*/
/*var fn_get_styleMapOnShpVector = function(){
	return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            fillColor: '#bcff03',
            fillOpacity: 0.5,
            strokeColor: '#33cc00',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
        }),
        'select': new OpenLayers.Style({
            fillColor: '#EC5781',
            fillOpacity: 0.7,
            strokeColor: '#E11A51',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
        })
    });
}*/

/**
* @memberof USV.STYLE
* @method 
* @description 참조선,참조점에 적용할 styleMap정의
* @returns 참조선,참조점 styleMap
* @author 최재훈(2015.11.03)
*/
/*var fn_get_styleMapOnRef = function(){
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
}*/

/**
* @memberof USV.STYLE
* @method 
* @description StyleVector에 적용할 styleMap정의
* @returns StyleVector styleMap
* @author 최재훈(2015.11.03)
*/
/*var fn_get_styleMapOnStyleVector = function(){
	return new OpenLayers.StyleMap({
		 'default': new OpenLayers.Style({
             fillColor: '#EC5781',
             fillOpacity: 0.8,
             strokeColor: '#E11A51',
             strokeWidth: 2,
             graphicZIndex: 1,
             pointRadius: 5
         }),
         // defaultLabel and selectLabel Styles are needed for DrawText Control
         'defaultLabel': new OpenLayers.Style({
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
//				labelAlign: 'cm',
//				labelXOffset: 0,
//				labelYOffset: 0,
             labelOutlineColor: '#FFFFFF',
             labelOutlineWidth: 4,
             labelSelect: true
         }),
         'select': new OpenLayers.Style({
             fillColor: '#EC5781',
             strokeColor: '#E11A51',
             graphicZIndex: 2,
             pointRadius: 10,
             strokeWidth: 3
         }),
         // defaultLabel and selectLabel Styles are needed for DrawText Control
         'selectLabel': new OpenLayers.Style({
             pointRadius: 5,
             label: '${label}',
             fontColor: 'black',
             fontSize: '11px',
             fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
             fontWeight: 'bold',
             labelAlign: 'cm',
             labelXOffset: '${xOffset}',
             labelYOffset: '${yOffset}',
             fillColor: '#fc0',
             strokeColor: '#f70',
             labelOutlineColor: '#fc0',
             labelOutlineWidth: 6,
             graphicZIndex: 2
         }),
         'delete': new OpenLayers.Style({
	            display: 'none'
	        }),
         'temporary': new OpenLayers.Style({
             fillColor: '#fc0',
             fillOpacity: 0.8,
             strokeColor: '#f70',
             strokeWidth: 2,
             graphicZIndex: 2,
             pointRadius: 5
         }),
         'rdl_stlt_ps': new OpenLayers.Style({
         	externalGraphic: '/images/usolver/road/RDL_STLT_PS_ON_ico.png',
 	        graphicWidth: 18,
 	        graphicHeight: 18,
 	        fillOpacity: 1,
 	        graphicZIndex: 1
         }),
         'wtl_pipe_lm': new OpenLayers.Style({
         	fillColor: '#E11A51',
             strokeColor: '#E11A51',
             strokeWidth: 2,
             graphicZIndex: 1
         }),
         'wtl_sply_ls': new OpenLayers.Style({
         	fillColor: '#117979',
             strokeColor: '#117979',
             fillColor: '#E11A51',
             strokeColor: '#E11A51',
             strokeDashstyle : 'longdash',
             strokeWidth: 2,
             graphicZIndex: 1
         }),
         'wtl_meta_ps': new OpenLayers.Style({
         	externalGraphic: '/images/usolver/water/WTL_META_PS_ON_ico.png',
 	        graphicWidth: 15,
 	        graphicHeight: 15,
 	        fillOpacity: 1
         }),
         'rdl_tree_ps': new OpenLayers.Style({
         	externalGraphic: '/images/usolver/road/RDL_TREE_PS_ON_ico.png',
 	        graphicWidth: 15,
 	        graphicHeight: 15,
 	        fillOpacity: 1
         }),
         'wtl_fire_ps': new OpenLayers.Style({
	        	externalGraphic: '/images/usolver/water/WTL_FIRE_PS_SA118.png',
		        graphicWidth: 18,
		        graphicHeight: 18,
		        fillOpacity: 1
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
	      		          fillOpacity: 1
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
	      		          fillOpacity: 1
	      			  }
	                })
	            ]
	    }),
	    'wtl_valv_ps': new OpenLayers.Style({
	        	externalGraphic: '/images/usolver/water/WTL_VALV_PS_SA118.png',
		        graphicWidth: 18,
		        graphicHeight: 18,
		        fillOpacity: 1
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
	      		          fillOpacity: 1
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
		    		          fillOpacity: 1
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
		    		          fillOpacity: 1
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
		    		          fillOpacity: 1
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
		    		          fillOpacity: 1
		    			  }
		    		})
	    		
	            ]
	    })
	});
};*/

/**
* @memberof USV.STYLE
* @method 
* @description 동일한 범주내의 메뉴선택상태(주황색)유지 처리
* @param {String} _sAnchorEl - 선택범위내 최하위 element ID
* @author 최재훈(2015.11.03)
*/
var fn_set_menuStatus = function(_sAnchorEl){
		var oAnchorElement,oImgElement;
		if(typeof _sAnchorEl == 'string') {
			oAnchorElement = $(_sAnchorEl);
			oImgElement = $(_sAnchorEl+" img");
		} else if(typeof _sAnchorEl == 'object') {
			oAnchorElement = _sAnchorEl;
			oImgElement = _sAnchorEl.find('img');
			_sAnchorEl = _sAnchorEl.selector;
		}
	    var selectedIdx;
	    var flgEdit = false;
	    
	    if(_sAnchorEl.contains('editPane'))
	    	flgEdit = true;
    	oAnchorElement.on("click", function(e){      
    		fn_keep_menuSelect(oImgElement, e);
    	});
    	
    	oImgElement.on("mouseout", function(e){
    		fn_keep_menuOut(oImgElement, e);
    	});
	    
	    function fn_keep_menuSelect(_oImgObj, _oEvt) {
	    	$.each(_oImgObj, function(idx,el){
				//console.log(_oEvt.target.src + " : " + el.src);
	            if(_oEvt.target.src === el.src){
	            	if(flgEdit){
	            		if(editor.editMode){
	                		el.src=el.src.replace('_on', '_selected').replace('_off', '_selected');    
	    					selectedIdx = idx;
	            		}
	            	}
	            	else {
		                el.src=el.src.replace('_on', '_selected').replace('_off', '_selected');    
						selectedIdx = idx;
	            	}
	            }
	            else{ 
	                el.src=el.src.replace('_selected', '_off').replace('_on', '_off');    
	            }
	        });
	    }
	    
	    function fn_keep_menuOut(_oImgObj, evt){
	  		$.each(_oImgObj, function(i,el){
				//console.log(selectedIdx + '/'+ i + '/'+ evt.target.src + " : " + el.src + "//////USV.releaseSelect - " + USV.releaseSelect);
	            if(selectedIdx == i && !STYLE.releaseSelect){
	            	_oImgObj[i].src = _oImgObj[i].src.replace('_on', '_selected').replace('_off', '_selected');    
	            }
	            else{
	            	_oImgObj[i].src = _oImgObj[i].src.replace('_selected', '_off').replace('_on', '_off');    
	            }
	        });
	    }
};

var fn_set_menuStatusOnOff = function(_sAnchorEl){
	
	var oAnchorElement = $(_sAnchorEl);
    var oImgElement = $(_sAnchorEl + " img");
    var selectedIdx;
    var flgEdit = false;
    
    oAnchorElement.on("click", function(e){      
        fn_keep_menuSelect(oImgElement, e);
    });
    
    oImgElement.on("mouseout", function(e){
    	fn_keep_menuOut(oImgElement, e);
    });
    
    function fn_keep_menuSelect(_oImgObj, _oEvt) {
    	$.each(_oImgObj, function(idx,el){
			//console.log(_oEvt.target.src + " : " + el.src);
            if(_oEvt.target.src === el.src){ 
                el.src = el.src.replace('_off', '_on');    
				selectedIdx = idx; 
            }
            else{ 
                el.src = el.src.replace('_on', '_off');    
            }
        });
    }
    
    function fn_keep_menuOut(_oImgObj, evt){
  		$.each(_oImgObj, function(i,el){
			//console.log(selectedIdx + '/'+ i + '/'+ evt.target.src + " : " + el.src + "//////USV.releaseSelect - " + USV.releaseSelect);
            if(selectedIdx == i && !STYLE.releaseSelect){
            	_oImgObj[i].src = _oImgObj[i].src.replace('_off', '_on');    
            }
            else{
            	_oImgObj[i].src = _oImgObj[i].src.replace('_on', '_off');    
            }
        });
    }
};
/**
* @memberof USV.STYLE
* @method 
* @description searchPosVector를 위한 styleMap정의
* @returns searchPosVector styleMap
* @author 이상호(2016.03.29)
*//*
var fn_get_styleMapOnSearchVector = function() {
	return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            fillColor: '#bcff03',
            fillOpacity: 0.5,
            strokeColor: '#33cc00',
            strokeWidth: 2,
            graphicZIndex: 1,
            pointRadius: 5
        }),
        'select': new OpenLayers.Style({
            fillColor: "red",
            fillOpacity: 0.4, 
            hoverFillColor: "white",
            hoverFillOpacity: 0.8,
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWidth: 2,
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
        })
    });
};*/
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description sld에서 layer의 id값, layer 영어명, 한글명으로 nameLayer 리턴
	* @param {String} _sId - layer의 id, layer 영어명, layer 한글명
	* @returns {Object} oNameLayers - layerTool에서 파싱된 nameLayer
	* @author 이상호 (2016.06.20)
	*/
	var fn_find_sldNameLayer = function(_sId){

		//debugger;
		
		var oSld = layerTool.getSld();
		var oNameLayers = oSld.namedLayers;
		var oLayers = layerTool.layers;
		var _sSldName = _sId.trim();
		
		for(var i in oLayers) {
			if(oLayers[i].id === _sId) {
				_sSldName = oLayers[i].table;
				break;
			}
		}
		
		// ggash 2016.12.28 for geoserver - GeoServer GetStyle결과 다른 구조때문에...
		for(var i in oNameLayers) {
			if(oNameLayers[i].featureTypeName === _sSldName || oNameLayers[i].name === _sSldName || (oNameLayers[i].userStyle &&  oNameLayers[i].userStyle[0].name === _sSldName)){
				return oNameLayers[i];
				break;
			}
		}
		
		return null;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 심볼의 이미지 URL을 생성하는 함수
	* @param {String} _sLayerName - layer의 영어명
	* @param {Object} _oRule - 이미지를 생성할 Rule 객체
	* @returns {String} sReturnUrl - 심볼의 타입 | 심볼 이미지의 url 형식의 문자열
	* @author 이상호 (2016.07.12)
	*/
	var fn_create_symbolImageUrl = function(_sLayerName,_oRule){
		var oNameLayer = fn_find_sldNameLayer(_sLayerName);
		var oSymbolizer = _oRule.symbolizer;
		var sImgUrl="",sType=undefined,sReturnUrl;
		
        if(oSymbolizer["point"]) {
        	sType = "point";
        	sImgUrl = NUTs.WMS.getLengendGraphic(CONFIG.fn_get_serviceUrl(), {
				layer : oNameLayer.name,
				style : oNameLayer.userStyle[0].name,
				rule : _oRule.name,
				width: 20,
				height: 20
			});
		}
        else {
			var oTmpSymbolizer = {
					width : 30,
					height : 16
				};
			if(oSymbolizer["polygon"]) {
				sType = "polygon";
				if(oSymbolizer["polygon"].externalGraphic){
					sImgUrl = "/gmap/getImageFromBase64.do?encodeImg="+encodeURIComponent(oSymbolizer["polygon"].externalGraphic);
				}
				else{
					oTmpSymbolizer.strFillColor = oSymbolizer["polygon"].fillColor.replace("#", "");
					if(oSymbolizer["line"]) {
						if(oSymbolizer["line"].stroke){
							oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
						}
						else{
							oTmpSymbolizer.strColor = "ffffff";
						}
					}
					sImgUrl = "/gmap/getPolygonSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
				}
			} else if(oSymbolizer["line"]) {
				sType = "line";
				if(oSymbolizer["line"]["arrow"]) {
					oTmpSymbolizer.arrow = 1;
				}
				if(oSymbolizer["line"]["marker"]) {
					oTmpSymbolizer.marker = 1;
				}
				if(oSymbolizer["line"].stroke){
					oTmpSymbolizer.strColor = oSymbolizer["line"].stroke.replace("#", "");
				}
				else{
					oTmpSymbolizer.strColor = "ffffff";
				}
				sImgUrl = "/gmap/getStraightLineSymbol.do?" + NUTs.Util.fn_convert_objToStr(oTmpSymbolizer);
			} else if(oSymbolizer["text"]){
				sType = "text";
	        	sImgUrl ="/images/usolver/com/tree/text.gif";
	        }
        }
        sReturnUrl = sType+"|"+sImgUrl
        return sReturnUrl;
		
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 심볼편집시 name레이어의 룰을 리스트로 만들어줌
	* @param {Object} _oNameLayer - layerTool에서 파싱된 nameLayer의 Object 형태
	* @author 이상호 (2016.06.20)
	*/
	var fn_create_ruleList = function(_oNameLayer) {
		$("#divSymbolEditList ul").css("height",$("#left .leftCont").height()*0.2);
		$("#divSymbolEditList ul").empty();
		
		var aRules = _oNameLayer.userStyle[0].rules;
		for(var i in aRules) {
			var aUrl = fn_create_symbolImageUrl(_oNameLayer.featureTypeName,aRules[i]).split("|");
			var sType = aUrl[0];
			var sImgUrl = aUrl[1];
			$("#divSymbolEditList ul").append("<li id="+i+"><span class='divTitle'>"+aRules[i].name+"</sapn>");
			$("#divSymbolEditList ul li[id="+i+"]").append("<div class='symbol_pannel'><img class="+sType+"></img></div>");
			$("#divSymbolEditList li#"+i+" img").attr("src",sImgUrl);
		}
		$("#divSymbolEditList ul li").on("mouseover",function(){
			var oList = $(this);
			var oContextmenu = $("div.custom-menu");
			if(oContextmenu.length > 0) oContextmenu.remove();
			oList.find(".symbol_pannel").append("<div class='custom-menu'><img src='/images/usolver/com/map/btn_sedit_off.png'/><div class='custom-menuText'>심볼 편집</div></div>");
			$("div.custom-menu").on("click",function(){
				oList.trigger("dblclick");
				$(this).remove();
			});
			$("div.custom-menu").on("mouseover",function(event){
				$(this).find("img").attr("src","/images/usolver/com/map/btn_sedit_on.png");
				event.stopPropagation();
			});
			$("div.custom-menu").on("mouseout",function(){
				$(this).find("img").attr("src","/images/usolver/com/map/btn_sedit_off.png");
			});
		});
		
		$("#divSymbolEditList ul li").on("dblclick",function(){
			$("div.custom-menu").remove();
			fn_convert_symbolEditDetail(_oNameLayer.name,aRules,$(this).attr("id"));
		});
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 심볼편집의 룰목록에서 상세화면으로 전환시 심볼의 따른 분기함수
	* @param {String} _sLayerName - nameLayer의 한글명
	* @param {Object} _oRules - nameLayer의 rule Object
	* @param {String} _sRuleNum - 선택한 rule 번호
	* @param {Boolean} _bCallType - 레이어화면에서 바로 호출했는지 여부
	* @author 이상호 (2016.06.20)
	*/
	var fn_convert_symbolEditDetail = function(_sLayerName,_oRules,_sRuleNum,_bCallType) {
		var sRuleName = _oRules[_sRuleNum].name;
		var oSymbol = _oRules[_sRuleNum].symbolizer;
		$("#divSymbolEditList li").removeClass("symbol_selected");
		var oSelectedRule = $("#divSymbolEditList li#"+_sRuleNum);
		oSelectedRule.addClass("symbol_selected");
		if(_bCallType) {
			var nTop = oSelectedRule.offset().top - $("#divSymbolEditList ul").offset().top;
			$("#divSymbolEditList ul").scrollTop( nTop );
		}
		if(typeof oSymbol.polygon !== "undefined") {
			fn_show_symbolEditDetail("polygon",_sLayerName,sRuleName,_sRuleNum);
		} else if(typeof oSymbol.point !== "undefined") {
			fn_show_symbolEditDetail("point",_sLayerName,sRuleName,_sRuleNum);
		} else if(typeof oSymbol.line !== "undefined") {
			fn_show_symbolEditDetail("line",_sLayerName,sRuleName,_sRuleNum);
		} else if(typeof oSymbol.text !== "undefined") {
			fn_show_symbolEditDetail("text",_sLayerName,sRuleName,_sRuleNum);
		}
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 레이어화면에서 심볼편집의 룰 상세화면으로 전환함수
	* @param {String} _sLayerId - 선택한 layer의 id 번호
	* @param {String} _sRuleNum - 선택한 rule 번호
	* @author 이상호 (2016.06.20)
	*/
	var fn_create_layerInfo = function(_sLayerId,_sRuleNum){
		$("#divLayerTree").hide();
		$("#divSymbolEditDetail").hide();
		$("#divbtnSymbolCheck").hide();
		$("#divSymbolEditList").show();
		$("#totRule").hide();
		
		var oSld = layerTool.getSld();
		var oNameLayer = fn_find_sldNameLayer(_sLayerId);
		var oRules = oNameLayer.userStyle[0].rules;
		
		$("#totLayer").text(oNameLayer.name);
		fn_create_ruleList(oNameLayer);
		
		if(_sRuleNum) {
			fn_convert_symbolEditDetail(oNameLayer.name,oRules,_sRuleNum,true);
		}
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 심볼 상세화면을 보여주는 함수
	* @param {String} _sType - 선택한 심볼의 타입
	* @param {String} _sLayerName - 선택한 layer의 한글명
	* @param {String} _sRuleName - 선택한 룰의 한글명
	* @param {String} _sRuleNum - 선택한 rule 번호
	* @author 이상호 (2016.06.20)
	*/
	var fn_show_symbolEditDetail = function(_sType,_sLayerName,_sRuleName,_sRuleNum) {
		$("#divSymbolEditDetail").show();
		$("#divSymbolEditDetail").css("height",$("#left .leftCont").height()*0.4);
		$("#totLayer").text(_sLayerName);
		$("#totRule").text(_sRuleName);
		$("#totRuleNum").text(_sRuleNum);
		$("#divbtnSymbolCheck").show();
		var tempXml = layerTool.sld.xml.cloneNode(true);
        var sld = layerTool.format.read(tempXml);
        var oNameLayers = sld.namedLayers;
        var oSymbolLayer = oNameLayers[_sLayerName];
		var oRule = oNameLayers[_sLayerName].userStyles[0].rules[_sRuleNum];
		
		$(".editDefault").show();
		
		// 라벨 표시
		if(typeof fn_find_rule(oSymbolLayer.name,oRule.name).hidden !== "undefined"  && !fn_find_rule(oSymbolLayer.name,oRule.name).hidden) $("#chkSymbolMark").prop("checked",true);
		else $("#chkSymbolMark").prop("checked",false);
		
		// 유효축척 표시
		$("#minScale").val(fn_get_defaultSize(oRule.minScaleDenominator,'scale'));
		$("#maxScale").val(fn_get_defaultSize(oRule.maxScaleDenominator,'scale'));
		
		$("#divSymbolEditDetail .editSymbol .inbx").hide();
		switch(_sType) {
			case "polygon":
				fn_show_polygon(oRule);
				break;
			case "point":
				fn_show_point(oRule);
				break;
			case "line":
				fn_show_line(oRule);
				break;
			case "text":
				fn_show_text(oSymbolLayer,oRule);
				break;
		}
	}
	var fn_get_defaultSize = function(_nSize, _sType){
		var nSize = 0;

		if(!_nSize || String(_nSize).toUpperCase() == "NAN") {
			debugger;
			switch(_sType.toUpperCase()) {
			case "POINTSIZE":
				nSize = 24;
				break;
			case "FONTSIZE":
				nSize = 12;
				break;
			case "OPACITY":
				nSize = 100;
				break;
			case "WIDTH":
				nSize = 1;
				break;
			case "SCALE":
				nSize = 0;
				break;
			default:
				break;
			}
		}
		else{
			nSize = _nSize;
		}
		
		return nSize;
	};
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 점형 심볼 선택시 처리 함수
	* @param {Object} _oRule - 선택한 rule Object
	* @author 이상호 (2016.06.20)
	*/
	var fn_show_point = function(_oRule){
		var oSymbol = _oRule.symbolizer;
		var oPoint = oSymbol.Point;
		var sCheck;
		
		if(typeof oSymbol === "object") {
			if(oSymbol.Point.name != "ImageMarker") sCheck = "shape";
			else sCheck = "image";
		}
		
		switch (sCheck) {
		case "shape" :
			// 도형 모양
			$("#pointShape option[value='"+oPoint.graphicName+"']").prop("selected",true);
			// 도형 사이즈
			$("#txtShapeSize").val(fn_get_defaultSize(oPoint.pointSize,'pointSize'));
			// 도형 색상
			$("#txtColorPoint").val(oPoint.fillColor);
			$("#txtColorPoint").trigger('change');
			// 도형 투명도
			$("#txtShapeOpa").val(fn_get_defaultSize(oPoint.fillOpacity*100, 'opacity'));
			$("#txtShapeOpa").trigger('change');
			// 선 메뉴
			if(oPoint.strokeWidth) {
				$("#chkPointOutLine").prop("checked",true);
				$("#chkPointOutLine").trigger('change');
				fn_show_line(_oRule);
			} else {
				$("#chkPointOutLine").prop("checked",false);
				$("#chkPointOutLine").trigger('change');
			}
			
			fn_convert_imageShape(sCheck);
			break;
		case "image":
			// 크기
			$("#txtImageSize").val(fn_get_defaultSize(oPoint.pointSize, 'pointsize'));
			// 투명도
			$("#txtImageOpa").val(fn_get_defaultSize(oPoint.graphicOpacity*100, 'opacity'));
			$("#txtImageOpa").trigger('change');
			fn_convert_imageShape(sCheck);
			break;
		}
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 점형 심볼에서의 도형, 이미지 전환 탭 처리함수
	* @param {String} _sCheck - 도형, 이미지 선택값
	* @author 이상호 (2016.06.20)
	*/
	var fn_convert_imageShape = function(_sCheck) {
		$("#divSymbolEditDetail .pointSymbol li").hide();
		$("#divSymbolEditDetail .pointSymbol").show();
		
		$("#imageSymbol").hide();
		$("#pointImageCheck").show();
		
		switch (_sCheck) {
		case "shape" :
			$(".imageCheck[value='shape']").prop("checked",true);
			$("#pointSize").show();
			$("#pointShape").show();
			$("#pointColor").show();
			$("#pointOpa").show();
			$("#pointOutLineCheck").show();
			$("#chkPointOutLine").prop("checked",$("#chkPointOutLine").is(':checked'));
			$("#chkPointOutLine").trigger('change');
			break;
		case "image":
			$("#divSymbolEditDetail .lineSymbol").hide();
			$(".imageCheck[value='image']").prop("checked",true);
			$("#imageSymbol").show();
			$("#imageSymbol li").show();
			fn_change_imageMethod();
			$("#imageSymbol input[name='urlCheck'][value='file']").trigger("click");
			break;
		}
	}
	
	var fn_convert_labelType = function(_sCheck){
		$("#divSymbolEditDetail .labelPoisition li").hide();
		
		$("#labelTypeCheck").show();
		switch (_sCheck) {
		case "PointText":
			$(".labelCheck[value='PointText']").prop("checked",true);
			$("#labelPointBase").show();
			$("#labelPointPosition").show();
			$("#labelPointArrange").show();
			break;
		case "LineText":
			$(".labelCheck[value='LineText']").prop("checked",true);
			$("#labelLineArrangeGap").show();
			$("#labelLineArrangePos").show();
			$("#labelLineArrangeLine").show();
			break;
		}
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 점형 심볼에서 이미지 화면에 로컬,url 선택 처리 함수
	* @author 이상호 (2016.06.20)
	*/
	var fn_change_imageMethod = function(){
		$("#imageSymbol input[name='urlCheck']").on("click",function(){
			var url = $(this).attr("value");
			if(url === "url") {
				$("#imageUrl").show();
				$("#imageFileUrl").hide();
				$("#imageSymbol a.btn_black").hide();
			} else {
				$("#imageUrl").hide();
				$("#imageFileUrl").show();
				$("#imageSymbol a.btn_black").show();
			}
		});
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 선형 심볼 선택시 처리 함수
	* @param {Object} _oRule - 선택한 rule Object
	* @author 이상호 (2016.06.20)
	*/
	var fn_show_line = function(_oRule) {
		var oSymbol = _oRule.symbolizer;
		var oLine;
		if(typeof oSymbol.Line === 'undefined') {
			// 점형 심볼일때 선 메뉴 처리
			oLine = oSymbol.Point;
		} else {
			oLine = oSymbol.Line;
		}
			
		$("#divSymbolEditDetail .lineSymbol").show();
		
		// 선 스타일
		$("#selLineStyle_child li").removeClass("selected hover");
		$("#selLineStyle option[value='"+ fn_convert_valueToLineStyle(oSymbol) +"']").prop("selected",true);
		$("#selLineStyle").trigger("change");
		// 선 끝모양
		$("#selLineCap_child li").removeClass("selected hover");
		$("#selLineCap option[value='"+ oLine.strokeLinecap +"']").prop("selected",true);
		$("#selLineCap").trigger("change");
		
		// 선 조인모양
		$("#selLineJoin_child li").removeClass("selected hover");
		$("#selLineJoin option[value='"+ oLine.strokeLinejoin +"']").prop("selected",true);
		$("#selLineJoin").trigger("change");
		
		debugger;
		// 선 굵기
		$("#txtLineThickness").val(fn_get_defaultSize(oLine.strokeWidth, 'width'));
		// 선 투명도
		$("#txtLineOpa").val(fn_get_defaultSize(oLine.strokeOpacity*100, 'opacity'));
		$("#txtLineOpa").trigger('change');
		// 선 색
		$("#txtColorLine").val(oLine.strokeColor);
		$("#txtColorLine").trigger('change');
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 면형 심볼 선택시 처리 함수
	* @param {Object} _oRule - 선택한 rule Object
	* @author 이상호 (2016.06.20)
	*/
	var fn_show_polygon = function(_oRule) {
		var oSymbol = _oRule.symbolizer;
		var oPolygon = oSymbol.Polygon;
		$("#divSymbolEditDetail .polygonSymbol").show();
		
		// 선 메뉴
		if(_oRule.symbolizer.Line) {
			$("#chkPolygonOutLine").prop("checked",true);
			$("#chkPolygonOutLine").trigger('change');
			fn_show_line(_oRule);
		} else {
			$("#chkPolygonOutLine").prop("checked",false);
			$("#chkPolygonOutLine").trigger('change');
		}
		
		//면 색
		$("#txtColorPoly").val(oPolygon.fillColor);
		$("#txtColorPoly").trigger('change');
		// 면 투명도
		$("#txtPolyOpa").val(fn_get_defaultSize(oPolygon.fillOpacity*100,'opacity'));
		$("#txtPolyOpa").trigger('change');
		
		
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 텍스트형 심볼 선택시 처리 함수
	* @param {Object} _oSymbolLayer - 선택한 심볼의 nameLayer Object
	* @param {Object} _oRule - 선택한 rule Object
	* @author 이상호 (2016.06.20)
	*/
	var fn_show_text = function(_oSymbolLayer,_oRule) {
		var oSymbol = _oRule.symbolizer;
		var oText = oSymbol.Text;
		$("#divSymbolEditDetail .editLabel:not(.labelBackground)").show();
		$("#imageSymbol").hide();
		
		// 필드명
		var sField = oText.label.replace(/[${}]/g,"");
		var oData = {tableName : _oSymbolLayer.LayerFeatureConstraints,fieldName:sField};
		$.ajax({
			type: 'get',
			dataType: 'xml',
			data: oData,
			url: '/register/registerFieldList.do',
			success: function(xml) {
				if($(xml).find("code").find("item").length > 0) {
					$("#labelField select").empty();
					$(xml).find("code").find("item").each(function() {
							var code_name = $(this).find("code_name").text();
							var code_id = $(this).find("code_id").text();
							$("#labelField select").append("<option value="+code_id+">"+code_name+"</option>");
						});  
					}
					$("#labelField select option[value='"+oData.fieldName+"']").prop("selected",true);
				},
				error: function(xhr, status, error) {
				}
		});
		
		// 글자 크기
		$("#txtLabelFontSize").val(fn_get_defaultSize(oText.fontSize,'fontsize'));
		// 글꼴
		$("#labelFont [value='"+oText.fontFamily+"']").prop("selected",true);
		// 글자 색상
		$("#txtColorLabel").val(oText.fillColor);
		$("#txtColorLabel").trigger('change');
		// 글자 투명도
		$("#txtLabelFontOpa").val(fn_get_defaultSize(oText.fillOpacity*100,'fontsize'));
		$("#txtLabelFontOpa").trigger('change');
		// 글자 스타일
		if(oText.fontStyle === "italic") $("chkLabelFontStyle").prop("checked",true);
		// 글자 굵기
		if(oText.fontWeight === "bold")	$("chkLabelFontWeight").prop("checked",true);
		else $("#chkLabelFontWeight").prop("checked",false);
		
		// 코드 도메인 사용
		if(oText.codeDomain === "true")	$("#chkLabelCodeDomain").prop("checked",true);
		else $("#chkLabelCodeDomain").prop("checked",false);
		
		// 라벨 타입
		if(oText.name === 'PointText') fn_convert_labelType('PointText');
		else fn_convert_labelType('LineText');
			
		// 공간객체 내에 라벨이 그려질 위치
		$("#labelPointBase option[value='"+ oText.textPointBase +"']").prop("selected",true);
		// text_point_base에 위치할 라벨의 위치 
		$("#labelPointPosition option[value='"+ oText.textPointPosition +"']").prop("selected",true);
		// 라벨 정렬 방식
		$("#labelPointArrange option[value='"+ oText.textPointArrange +"']").prop("selected",true);
		
		// 
		$("#labelLineArrangeGap option[value='"+ oText.textArrangeGap +"']").prop("selected",true);
		// 
		$("#labelLineArrangePos option[value='"+ oText.textArrangePos +"']").prop("selected",true);
		// 
		$("#labelLineArrangeLine option[value='"+ oText.textArrangeLine +"']").prop("selected",true);
		
		// 배경
		if(typeof oText.backgroundType !== "undefined" && oText.backgroundType !== "NONE") $("#chkLabelBackground").prop("checked",true);
		else $("#chkLabelBackground").prop("checked",false);
		
		// 배경 모양
		$("#labelBackgroundType option[value='"+ oText.backgroundType +"']").prop("selected",true);
		// 배경 색상
		$("#txtColorLabelBackground").val(oText.backgroundFill);
		$("#txtColorLabelBackground").trigger('change');
		// 테두리 색상
		$("#txtColorLabelBackgroundLine").val(oText.backgroundLine);
		$("#txtColorLabelBackgroundLine").trigger('change');
		// 심볼 상하 여백
		$("#txtLabelBackgroundOffset").val(oText.backgroundOffset);
		// 심볼 내 텍스트 위치 
		$("#labelBackgroundAlign option[value='"+ oText.backgroundAlign +"']").prop("selected",true);
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 심볼편집 후 지도에 적용시 처리 함수
	* @param {String} _sLayerName - 선택한 심볼의 nameLayer 한글명
	* @param {String} _sRuleNum - 선택한 rule 번호
	* @returns {Object} oXml - sld에 저장되는 xml
	* @author 이상호 (2016.06.20)
	*/
	var fn_create_symbolChangeObject = function(_sLayerName,_sRuleNum) {
		var tempXml = layerTool.sld.xml.cloneNode(true);
        var sld = layerTool.format.read(tempXml);
        var oNameLayers = sld.namedLayers;
        var oSymbolLayer = oNameLayers[_sLayerName];
        var oRule = oSymbolLayer.userStyles[0].rules[_sRuleNum];
		var oSymbol = oRule.symbolizer;
		var sType;
		for(var i in oSymbol) {
			sType = i;
		}
		
		// 유효축척 표시
		fn_check_input($("#minScale").val(),oRule,"minScaleDenominator",0);
		fn_check_input($("#maxScale").val(),oRule,"maxScaleDenominator",0);
		
		debugger;
		
        switch(sType){
		case "Point" :
			var oPoint = {};
			if($(".imageCheck:checked").val() === "shape") {
				if(oSymbol.Point.name == "ImageMarker") {
					oPoint = {
						name : "ShapeMarker",	
						graphic : true,	
						fillColor : "#000000",	
						fillOpacity : 1,	
						graphicName : "circle",	
						pointSize : 10,	
					}
				} else {
					$.extend(true,oPoint,oSymbol.Point);
				}
				
				fn_check_input($("#txtColorPoint").val(),oPoint,"fillColor","#000000");
				fn_check_input($("#txtShapeOpa").val()*0.01,oPoint,"fillOpacity",1);
				oPoint.graphicName = $("#pointShape option:selected").val();
				fn_check_input($("#txtShapeSize").val(),oPoint,"pointSize",10);
				// 선
				if($('#chkPointOutLine').is(':checked')) {
					fn_check_input($("#txtColorLine").val(),oPoint,"strokeColor","#000000");
					var tempLinestyle = $("#lineStyle option:selected").val();
					oPoint.strokeDashstyle = fn_convert_lineStyleToValue(tempLinestyle);
					oPoint.strokeLinecap = $("#lineCap option:selected").val();
					oPoint.strokeLinejoin = $("#lineJoin option:selected").val();
					fn_check_input($("#txtLineOpa").val()*0.01,oPoint,"strokeOpacity",1);
					fn_check_input($("#txtLineThickness").val(),oPoint,"strokeWidth",1);
				} else {
					delete oPoint.strokeColor;
					delete oPoint.strokeDashstyle;
					delete oPoint.strokeLinecap;
					delete oPoint.strokeLinejoin;
					delete oPoint.strokeOpacity;
					delete oPoint.strokeWidth;
				}
				
			} else {
				if(oSymbol.Point.name == "ShapeMarker") {
					oPoint = {
						name : "ImageMarker",	
						graphic : true,	
						graphicOpacity : 1,	
						pointSize : 10,
						graphicFormat : "image/png",
						href : "http://docs.geoserver.org/stable/en/user/_images/smileyface1.png"
					}
				} else {
					$.extend(true,oPoint,oSymbol.Point);
				}
				
				fn_check_input($("#txtImageSize").val(),oPoint,"pointSize",10);
				fn_check_input($("#txtImageOpa").val()*0.01,oPoint,"graphicOpacity",1);
				if(!$("#imageUrl").is(":visible")) {
					fn_check_input($('#imageFileEncoding').attr("imageFormat"),oPoint,"graphicFormat",oSymbol.Point.graphicFormat);
					fn_check_input($('#imageFileEncoding').attr("src"),oPoint,"graphicContent",oSymbol.Point.graphicContent);
					
					delete oPoint.externalGraphic;
				} else {
					if($('#imageUrl').val() != '') {
						oPoint.graphicFormat = "image/png";
					} else {
						oPoint.graphicFormat = oSymbol.Point.graphicFormat;
					}
					fn_check_input($('#imageUrl').val(), oPoint, "externalGraphic", oSymbol.Point.externalGraphic);
					
					delete oPoint.graphicContent;
				}
			}
			oSymbol.Point = oPoint;
			break;
		case "Line" :
			var oLine = oSymbol.Line;
			fn_check_input($("#txtColorLine").val(),oLine,"strokeColor","#000000");
			var tempLinestyle = $("#lineStyle option:selected").val();
			oLine.strokeDashstyle = fn_convert_lineStyleToValue(tempLinestyle);
			oLine.strokeLinecap = $("#lineCap option:selected").val();
			oLine.strokeLinejoin = $("#lineJoin option:selected").val();
			fn_check_input($("#txtLineOpa").val()*0.01,oLine,"strokeOpacity",1);
			fn_check_input($("#txtLineThickness").val(),oLine,"strokeWidth",1);
			break;
		case "Polygon":
			// 선 심볼
			if($('#chkPolygonOutLine').is(':checked')) {
				var oLine = oSymbol.Line;
				if(typeof oLine === 'undefinded' || oLine == null) oSymbol.Line = {}; 
				oLine = oSymbol.Line;
				oLine.name = "Line";
				fn_check_input($("#txtColorLine").val(),oLine,"strokeColor","#000000");
				var tempLinestyle = $("#lineStyle option:selected").val();
				oLine.strokeDashstyle = fn_convert_lineStyleToValue(tempLinestyle);
				oLine.strokeLinecap = $("#lineCap option:selected").val();
				oLine.strokeLinejoin = $("#lineJoin option:selected").val();
				fn_check_input($("#txtLineOpa").val()*0.01,oLine,"strokeOpacity",1);
				fn_check_input($("#txtLineThickness").val(),oLine,"strokeWidth",1);
			} else {
				delete oSymbol.Line;
			}
			// 면 심볼
			var oPolygon = oSymbol.Polygon;
			fn_check_input($("#txtColorPoly").val(),oPolygon,"fillColor","#000000");
			fn_check_input($("#txtPolyOpa").val()*0.01,oPolygon,"fillOpacity",1);
			break;
		case "Text":
			var oText = oSymbol.Text;
			oText.label = "${" + $("#labelField option:selected").val()+"}";
			oText.fontFamily = $("#labelFont option:selected").val();
			fn_check_input($("#txtLabelFontSize").val(),oText,"fontSize",9);
			fn_check_input($("#txtColorLabel").val(),oText,"fillColor","#000000");
			fn_check_input($("#txtLabelFontOpa").val() * 0.01,oText,"fillOpacity",1);
			if($("#chkLabelFontStyle").is(":checked")) oText.fontStyle = "italic";
			else oText.fontStyle = "normal";
			if($("#chkLabelFontWeight").is(":checked")) oText.fontWeight = "bold";
			else oText.fontWeight = "normal";
			oText.codeDomain = $("#chkLabelCodeDomain").is(":checked");
			
			if($(".labelCheck:checked").val() === "PointText") {
				oText.name = "PointText";
				oText.textPointBase = $("#labelPointBase option:selected").val();
				oText.textPointPosition = $("#labelPointPosition option:selected").val();
				oText.textPointArrange = $("#labelPointArrange option:selected").val();
				delete oText.textArrangePos;
				delete oText.textArrangeGap;
				delete oText.textPointArrange;
			} else {
				oText.name = "LineText";
				oText.textArrangePos = $("#labelLineArrangePos option:selected").val();
				oText.textArrangeGap = $("#labelLineArrangeGap option:selected").val();
				oText.textArrangeLine = $("#labelLineArrangeLine option:selected").val();
				delete oText.textPointBase;
				delete oText.textPointPosition;
				delete oText.textPointArrange;
			}
			
			if($("#chkLabelBackground").is(":checked")){
				oText.backgroundType = $("#labelBackgroundType option:selected").val();
				fn_check_input($("#txtColorLabelBackground").val(),oText,"backgroundFill","#000000");
				fn_check_input($("#txtColorLabelBackgroundLine").val(),oText,"backgroundLine","#000000");
				fn_check_input($("#txtLabelBackgroundOffset").val(),oText,"backgroundOffset",1);
				oText.backgroundAlign = $("#labelBackgroundAlign option:selected").val();
			} else {
				delete oText.backgroundType;
				delete oText.backgroundFill;
				delete oText.backgroundLine;
				delete oText.backgroundOffset;
				delete oText.backgroundAlign;
			}
			break;
		}
        return layerTool.format.write(sld);
	}
	
	var fn_check_input = function(_oSrc,_oDest,_sPoperty,_sDefValue) {
		if(typeof _sDefValue == 'string') {
			_oSrc = _oSrc.trim();
		} else if(typeof _sDefValue == 'number') {
			_oSrc = parseFloat(_oSrc);
		}
		if(_oSrc != '' && _oSrc != null) {
			_oDest[_sPoperty] = _oSrc;
		} else if (_oDest[_sPoperty]) {
		} else {
			_oDest[_sPoperty] = _sDefValue;
		}
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 심볼편집 후 적용된 sld를 바꾸는 함수
	* @param {String} _sLayerName - 선택한 심볼의 nameLayer 한글명
	* @param {Object} _oXml - 변환하는 xml
	* @author 이상호 (2016.06.20)
	*/
	var fn_change_layerSld = function(_sLayerName,_oXml) {
		NUTs.WMS.parseGetStyles(_oXml,function(res){
        	layerTool.sld = res;
        	fn_show_currentCheckRules();
        	var oChangedRule = fn_find_rule($("#totLayer").text(),$("#totRule").text());
        	var aSymbolString = fn_create_symbolImageUrl($("#totLayer").text(),oChangedRule).split("|");
        	$("#divSymbolEditList li.symbol_selected img."+aSymbolString[0]).attr("src",aSymbolString[1]);
        	
        	if(MAP_EDITOR.fn_check_wfsLayer()) {
        		MAP_EDITOR.fn_init_wfs(editor.preEditedLayerName);
    		}
    		MAP.fn_redraw_wms();
        });
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description layerTool의 sld 정보를 바꾸고 DB의 저장하는 함수
	* @param {String} _sLayerName - 저장할 레이어의 영어명
	* @param {Object} _oXml - 변경할 xml 정보
	* @author 이상호 (2016.08.09)
	*/
	var fn_save_layerSld = function(_sLayerName,_oXml,_sUserId) {
		NUTs.WMS.parseGetStyles(_oXml,function(res){
        	layerTool.sld = res;
        	fn_show_currentCheckRules();
        	var oChangedRule = fn_find_rule($("#totLayer").text(),$("#totRule").text());
        	var aSymbolString = fn_create_symbolImageUrl($("#totLayer").text(),oChangedRule).split("|");
        	$("#divSymbolEditList li.symbol_selected img."+aSymbolString[0]).attr("src",aSymbolString[1]);
        	
        	//var tempLayerSld = [];
        	//$.extend(tempLayerSld,_oXml.getElementsByTagName("sld:NamedLayer"));
        	
        	var layerSld = NUTs.WMS.parseGetStylesByNamedLayers(res.namedLayers); 
        		
        	for(var i=0,len=layerSld.length;i<len;i++) {
        		var sLayerName = layerSld[i].getElementsByTagName("se:FeatureTypeName")[0].textContent;
        		if(_sLayerName === COMMON.fn_get_EditKorLayerNm(sLayerName)) {
        			var xmlText = new XMLSerializer().serializeToString(layerSld[i]);
        			// db 변경
        			var oUserStyle = {};
        			oUserStyle.USER_ID = _sUserId;
        			if(COMMON.fn_get_userInfo().tmapId == '') {//FIXME
        				oUserStyle.isDefault = true;
        			} else {
        				oUserStyle.isDefault = false;
        				oUserStyle.SUBJECT_ID = COMMON.fn_get_userInfo().tmapId;
        			}
        			oUserStyle.TABLE_NAME = sLayerName;
        			oUserStyle.LAYER_NAME = _sLayerName;
        			oUserStyle.LAYER_STYLE = xmlText;
        			fn_merge_userStyle(oUserStyle);
        		}
        	}
        	
        	if(MAP_EDITOR.fn_check_wfsLayer()) {
        		MAP_EDITOR.fn_init_wfs(editor.preEditedLayerName);
    		}
        	MAP.fn_redraw_wms();
        });
	}
	
	/*// 변경된 User의 layer Style 정보
	var aUserLayerStyles = [];
	
	*//**
	* @memberof USV.STYLE
	* @method 
	* @description 변경된 User layer Stlye 정보 반환 함수
	* @return {Array} aUserLayerStyles - 변경된 User layer Stlye 정보
	* @author 이상호 (2016.08.09)
	*//*
	var fn_get_userLayerStyles = function() {
		return aUserLayerStyles;
	}
	
	*//**
	* @memberof USV.STYLE
	* @method 
	* @description 변경된 User layer Stlye 정보 변경 함수
	* @param {Array} _aUserLayerStyles - 변경된 User layer Stlye 정보
	* @author 이상호 (2016.08.09)
	*//*
	var fn_set_userLayerStyles = function(_aUserLayerStyles) {
		aUserLayerStyles = _aUserLayerStyles;
	}*/
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 해당 유저의 모든 변경된 layer Style 정보 반환 함수
	* @param {String} _sUserId - 유저 ID
	* @return {Array} aUserLayerStyles - 변경된 User layer Stlye 정보
	* @author 이상호 (2016.08.09)
	*/
	var fn_get_allLayerStyles = function(_sUserId) {
		var aUserLayerStyles = null;
		var oUserStyle = {
			USER_ID : _sUserId,
		}
		if(COMMON.fn_get_userInfo().tmapId == '') { //FIXME
			oUserStyle.isDefault = true;
		} else {
			oUserStyle.isDefault = false;
			oUserStyle.SUBJECT_ID = COMMON.fn_get_userInfo().tmapId;
		}
		$.ajax({
			url : COMMON.fn_get_pageContext() + "/getAllUserLyrStlyeList.do",
			type : 'POST',
			async: false,
			data : {data:JSON.stringify(oUserStyle)},
			dataType : "json",
			success : function(_oData) {
				aUserLayerStyles = _oData.userStyleList;
			},
			error : function(_sMsg) {
				aUserLayerStyles = null;
			}
		});
		return aUserLayerStyles;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 변경된 유저 스타일을 layerTool의 sld 정보를 적용하는 함수
	* @param {String} _sUserId - 유저 ID
	* @param {String} _sSubmapId - 유저의 주제도 ID
	* @author 이상호 (2016.08.09)
	*/
	var fn_convert_userStyle = function(_sUserId) {
		//fn_set_userLayerStyles(fn_get_allLayerStyles(_sUserId,_sSubmapId));
		//debugger;
		var aUserLayerStyles = fn_get_allLayerStyles(_sUserId);
		var oXml = layerTool.getSld().xml;
		var aNamedLayerXml = oXml.getElementsByTagName("sld:NamedLayer");
		if(aUserLayerStyles !=null && aUserLayerStyles.length > 0) {
			for(var i in aUserLayerStyles) {
				var oUserLayerStyle = aUserLayerStyles[i];
				var sLayerName = oUserLayerStyle.TABLE_NAME;
				var sLayerStyle = oUserLayerStyle.LAYER_STYLE;
				var oLayerStyle = $.parseXML(sLayerStyle).getElementsByTagName("sld:NamedLayer")[0];
				for (var j=0,nLen = aNamedLayerXml.length;j<nLen;j++) {
					var oNamedLayerXml = aNamedLayerXml[j];
					var sXmlLayerName;
					var sXmlThemeName;
					//ggash 2016.12.28  for geoserver - GeoServer와 GeoGate의 GetStyles결과(구조)가 다름. 
					if(oNamedLayerXml.getElementsByTagName("se:FeatureTypeName")[0])
						sXmlLayerName = oNamedLayerXml.getElementsByTagName("se:FeatureTypeName")[0].textContent;
					else
						sXmlLayerName = oNamedLayerXml.getElementsByTagName("sld:Name")[1].textContent;
					
					if(oNamedLayerXml.getElementsByTagName("se:Name")[0])
						sXmlThemeName = oNamedLayerXml.getElementsByTagName("se:Name")[0].textContent;
					else
						sXmlThemeName = oNamedLayerXml.getElementsByTagName("sld:Name")[0].textContent;
					
					var oParentNode = oNamedLayerXml.parentNode;
					if(sXmlLayerName === sLayerName && sXmlThemeName == oUserLayerStyle.LAYER_NAME) {
						oParentNode.replaceChild(oLayerStyle, oNamedLayerXml);
					}
				}
			}
			NUTs.WMS.parseGetStyles(oXml,function(res){
				layerTool.sld = res;
				layerTool.userDefaultSld = res.xml;
			});
		}
	};
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 표준심볼전환처리 - 시스템이 제공하는 맵의 (표준)스타일로 일괄 변경처리
	* @author 최재훈 (2016.10.07)
	*/
	var fn_change_standardStyle = function() {
		
		//시스템 제공맵의 스타일 
		var oTmpLayerTool = new NUTs.Tool.TMapLayerTool(COMMON.fn_get_orgLayerTotInfoList(), null, null, COMMON.fn_get_orgLayerGroupInfoList(), { 
			tMapId : orgLayerTool.getTMapId(), 
			serviceUrl : CONFIG.fn_get_serviceUrl(), 
			prefix : CONFIG.fn_get_dataHouseName(), 
			gisEngineType : CONFIG.fn_get_gisEngineType(),
			callback : function(_oRes, _bUserStyle){
				saveTool = new NUTs.Tool.SaveTool(map);
			},
			sync : true,
			userStyle : ""
		});
		
		var oTmpXml = oTmpLayerTool.getSld().xml;
  
		var aOrgNamedLayerXml = oTmpXml.getElementsByTagName("sld:NamedLayer");
		var nOrgLen = aOrgNamedLayerXml.length;
		
		//현재 서비스중인 맵의 스타일
		var oXml = layerTool.getSld().xml;		
		var aNamedLayerXml = oXml.getElementsByTagName("sld:NamedLayer");
		var nLen = aNamedLayerXml.length;
		
		if(aNamedLayerXml.length > 0) {
			for (var i = 0; i < nLen; i++) {
				
				var oNamedLayerXml = aNamedLayerXml[i];
				var sXmlLayerName = NUTs.WMS.getLayerNameByNamedLayer(oNamedLayerXml);
				var oParentNode = oNamedLayerXml.parentNode;
				
				for (var j = 0; j < nOrgLen; j++) {
					var oOrgNamedLayerXml = aOrgNamedLayerXml[j];
					if(oOrgNamedLayerXml){
						var sOrgXmlLayerName = NUTs.WMS.getLayerNameByNamedLayer(oOrgNamedLayerXml);
						
						if(sXmlLayerName === sOrgXmlLayerName) {
							oParentNode.replaceChild(oOrgNamedLayerXml, oNamedLayerXml);
							break;
						}
					}
					
				}
			}
			NUTs.WMS.parseGetStyles(oXml,function(res){
				layerTool.sld = res;
				layerTool.userDefaultSld = res.xml;
			});
		}

    	fn_show_currentCheckRules();
    	
		if(MAP_EDITOR.fn_check_wfsLayer()) {
    		MAP_EDITOR.fn_init_wfs(editor.preEditedLayerName);
		}
    	MAP.fn_redraw_wms();
	};
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 변경된 유저 스타일 중에 해당 레이어가 변경되었는지 확인하는 함수
	* @param {String} _sLayerName - 레이어 영어명
	* @param {Boolean} 레이어의 변경여부
	* @author 이상호 (2016.08.09)
	*//*
	var fn_check_userStyle = function(_sLayerName){
		var aUserLayerStyles = fn_get_userLayerStyles();
		for(var i in aUserLayerStyles) {
			var oUserLayerStyle = aUserLayerStyles[i];
			var sLayerName = oUserLayerStyle.LAYER_NAME;
			if(sLayerName === _sLayerName) return true;
		}
		return false;
	}*/
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 변경된 유저 스타일 중에 해당 레이어를 반환하는 함수
	* @param {String} _sLayerName - 레이어 영어명
	* @return {Object} oUserLayerStyle - User layer Style 정보
	* @author 이상호 (2016.08.09)
	*//*
	var fn_get_userLayerStyle = function(_sLayerName) {
		var aUserLayerStyles = fn_get_userLayerStyles();
		var oUserLayerStyle = null;
		
		for(var i in aUserLayerStyles) {
			var oSearchUserLayerStyle = aUserLayerStyles[i];
			var sLayerName = oSearchUserLayerStyle.LAYER_NAME;
			if(sLayerName === _sLayerName) oUserLayerStyle = oSearchUserLayerStyle;
		}
		
		return oUserLayerStyle;
	}*/
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description User layer Style 정보를 저장하거나 갱신하는 함수
	* @param {Object} _oLayerStyle - 추가 하거나 갱신할 유저 스타일 정보
	* @author 이상호 (2016.08.09)
	*/
	var fn_merge_userStyle = function(_oLayerStyle) {
		var sUrl = '/mergeUserLyrStyle.do';
		$.ajax({
			url : COMMON.fn_get_pageContext() + sUrl,
			type : 'POST',
			async: false,
			data : {data:JSON.stringify(_oLayerStyle)},
			success : function(oData) {
			},
			error : function(oData) {
			}
		});
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 초기 저장된 sld로 전환하는 함수
	* @author 이상호 (2016.06.20)
	*/
	var fn_revert_layerSld = function(_fCallback){
		var oRevertsld = layerTool.userDefaultSld || layerTool.defaultSld;
		NUTs.WMS.parseGetStyles(oRevertsld,function(res){
        	layerTool.sld = res;
        	fn_show_currentCheckRules();
        	var oChangedRule = fn_find_rule($("#totLayer").text(),$("#totRule").text());
        	var aSymbolString = fn_create_symbolImageUrl($("#totLayer").text(),oChangedRule).split("|");
        	$("#divSymbolEditList li.symbol_selected img."+aSymbolString[0]).attr("src",aSymbolString[1]);
        	
        	if(MAP_EDITOR.fn_check_wfsLayer()) {
        		MAP_EDITOR.fn_init_wfs();
        	}
        	MAP.fn_redraw_wms();
        	
        	if(_fCallback){
        		_fCallback();
        	}
        });
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 선형 심볼의 선스타일을 명칭에서 수치값으로 전환하는 함수
	* @param {String} _sLinestyle - 선스타일의 명칭
	* @returns {String} sReutrnValue - 선스타일의 수치값
	* @author 이상호 (2016.06.20)
	*/
	var fn_convert_lineStyleToValue = function(_sLinestyle) {
		var sReutrnValue = "";
		
		switch(_sLinestyle) {
		case "solid":
			sReutrnValue = "";
			break;
		case "dot":
			sReutrnValue = "2.0,2.0";
			break;
		case "dash":
			sReutrnValue = "7.0,3.0";
			break;
		case "dashdot":
			sReutrnValue = "10.0,2.0,2.0,2.0";
			break;
		}
		return sReutrnValue;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 선형 심볼의 선스타일을 수치값에서 명칭으로 전환하는 함수
	* @param {Obejct} _oSymbol - 선택한 선형 심볼
	* @returns {String} sReutrnStyle - 선스타일의 명칭
	* @author 이상호 (2016.06.20)
	*/
	var fn_convert_valueToLineStyle = function(_oSymbol) {
		var sDashValue;
		if(_oSymbol.Point){
			sDashValue = _oSymbol.Point.strokeDashstyle;
		} else {
			sDashValue = _oSymbol.Line.strokeDashstyle;
		}
		var sReutrnStyle = "solid";
		
		switch(sDashValue) {
		case "2.0,2.0":
			sReutrnStyle = "dot";
			break;
		case "7.0,3.0":
			sReutrnStyle = "dash";
			break;
		case "10.0,2.0,2.0,2.0":
			sReutrnStyle = "dashdot";
			break;
		}
		return sReutrnStyle;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 외부 심볼이미지 저장값을 초기화하는 함수
	* @author 이상호 (2016.06.21)
	*/
	var fn_init_imageSrc = function(){
		$("#imageFileUrl").val("");
		$('#imageFileEncoding').attr("imageFormat","");
		$('#imageFileEncoding').attr("src","");
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 이미지 심볼편집시 로컬에서 업로드 하였을때 이미지를 base64 인코딩하여 저장하는 함수
	* @param {Object} _oInput - 업로드된 file object
	* @author 이상호 (2016.06.21)
	*/
	var fn_read_Image = function(_oInput) {
		if ( _oInput.files && _oInput.files[0] ) {
			var oFR= new FileReader();
			oFR.onload = function(e) {
				var sEncodingImage =  e.target.result.split(',');
				var sImageFormat = sEncodingImage[0].split(':')[1].split(';')[0];
				if(sImageFormat.indexOf("image") !== -1) {
					$('#imageFileEncoding').attr("imageFormat",sImageFormat);
					$('#imageFileEncoding').attr("src",sEncodingImage[1]);
				} else {
					COMMON.showMessage('업로드오류 & 이미지파일을 업로드해주세요');
				}
			};       
			oFR.readAsDataURL( _oInput.files[0] );
		}
	}
	
	/**WMS**/
	/**
	* @memberof USV.STYLE
	* @method 
	* @description layerTool에 지정된 레이어 Id를 찾는 함수
	* @param {String} _sLayerName - 선택한 layer의 영어명,한글명
	* @returns {Number} nReturnId - layerTool의 layer Id
	* @author 이상호 (2016.06.20)
	*/
	var fn_find_layerId = function(_sLayerName){
		var nReturnId = null;
		var sLayerName = _sLayerName.trim();
		var aLayers = layerTool.layers;
		for(var i in aLayers) {
			var oLayer = aLayers[i];
			if(oLayer.table === sLayerName || oLayer.alias === sLayerName){
				nReturnId = oLayer.id;
			}
		}
		return nReturnId;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description layerTool에 파싱된 sld에서 rule 한글명으로 rule을 반환하는 함수
	* @param {String} _sRuleName - 선택한 rule의 한글명
	* @returns {Object} oReturnRule - rule Object
	* @author 이상호 (2016.06.20)
	*/
	var fn_find_rule = function(_sLayerName,_sRuleName) {
		var sEngLayerName = COMMON.fn_get_EditEngLayerNm(_sLayerName);
		
		var oSld = layerTool.sld;
		var aNamedLayer = oSld.namedLayers;
		var oReturnRule;
		
		for(var i in aNamedLayer) {
			var oNamedLayer = aNamedLayer[i];
			if(oNamedLayer.featureTypeName === sEngLayerName.trim() || oNamedLayer.name === sEngLayerName.trim() || fn_get_tableNameFromNamedLayer(oNamedLayer) === sEngLayerName.trim()) {
				var aRules = oNamedLayer.userStyle[0].rules;
				for(var j in aRules) {
					var oRule = aRules[j];
					if(oRule.name === _sRuleName.trim()) {
						oReturnRule = oRule;
						break;
					}
				}
			}
		}
		return oReturnRule;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 레이어를 on/off 하는 함수 
	* @param {String} _sStatus - 'on'/'off' 선택 
	* @param {String} _sLayerName - 선택한 레이어명(한글,영어명)
	* @author 이상호 (2016.07.12)
	*/
	var fn_toggle_wmsLayer = function(_sStatus,_sLayerName){
		var sEngLayerName = COMMON.fn_get_EditEngLayerNm(_sLayerName);
		var sLayerId;
		if(sEngLayerName != null) {
			sLayerId = COMMON.fn_get_EditLayerId(sEngLayerName);
		} else {
			sLayerId = COMMON.fn_get_EditLayerId(_sLayerName);
		}
		var nStatus = 0;
		if(_sStatus === "on"){
			nStatus = 1;
		} else if(_sStatus === "off"){
			nStatus = 0;
		}
		
		layerTool.setLayerAttr({
			con : "id",
			conVal : sLayerId,
			attr : "show",
			value : nStatus
		});
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 레이어의 on/off 상태 체크 
	* @param {String} _sLayerName - 선택한 레이어명(한글,영어명)
	* @returns {Boolean} bCheck - 레이의어 on/off 상태 (true/false)
	* @author 이상호 (2016.07.12)
	*/
	var fn_check_wmsLayerShow = function(_sLayerName){
		var bCheck = false;
		var sEngLayerName;
		try{
			sEngLayerName = COMMON.fn_get_EditEngLayerNm(_sLayerName);
		} catch(e){
			sEngLayerName = _sLayerName;
		}
		
		var oLayer = COMMON.fn_get_layerInfoFromLayerTool(sEngLayerName);
		if(oLayer) {
			if(oLayer.show == "1"){
				bCheck = true;
			}
		}
		return bCheck;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 레이어 모든 룰 스타일이 off인지 체크
	* @param {Object/String} _sLayer - layerTool의 선택한 NamedLayer object or 선택한 레이어명(한글,영어명)
	* @returns {Boolean} bCheck -  모든 룰의 off 상태 (true/false)
	* @author 이상호 (2016.07.12)
	*/
	var fn_check_wmsRuleAllOff = function(_sLayer) {
		var bCheck = true;
		var oNamedLayer;
		if(typeof _sLayer === 'object') {
			oNamedLayer = _sLayer;
		} else if(typeof _sLayer === 'string') {
			oNamedLayer = fn_find_sldNameLayer(_sLayer);
		}
		var aRules = oNamedLayer.userStyle[0].rules;
		for(var i in aRules){
			var oRule = aRules[i];
			var bHidden = oRule.hidden;
			if(typeof bHidden !== 'undefined' && bHidden === false){
				bCheck = false;
			}
		}
		return bCheck;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 룰을 on/off 하는 함수
	* @param {String} _sStatus - 'on'/'off' 선택 
	* @param {String} _sLayerName - 선택한 레이어명(한글,영어명)
	* @param {String} _sRuleName - 선택한 룰이름
	* @author 이상호 (2016.07.12)
	*/
	var fn_toggle_wmsRule = function(_sStatus,_sLayerName,_sRuleName, _sLayerLevel) {
		var sRuleName = _sRuleName.trim();
		var sLayerName = _sLayerName.trim();
		var oRule = fn_find_rule(sLayerName,sRuleName);
		var oNamedLayer = fn_find_sldNameLayer(sLayerName);
		if(_sStatus === "on"){
			oRule.hidden = false;
			if(!fn_check_wmsLayerShow(sLayerName)){
				fn_toggle_wmsLayer("on",sLayerName);
			}
			
		} else if(_sStatus === "off"){
			oRule.hidden = true;
			if(fn_check_wmsRuleAllOff(oNamedLayer) || _sLayerLevel === "LAYER_LEVEL"){ //rule을 선택하지 않고 레이어를 선택한 경우에는 하위 룰 모두 OFF처리
				fn_toggle_wmsLayer("off",sLayerName);
			}
		}
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 레이어 트리에서 룰 노드를 찾는 함수
	* @param {String} _sLayerName - 룰을 포함하는 layer의 이름(한글/영어)
	* @param {String} _sRuleName - 룰이름
	* @returns {Object} oReturnNode - 레이어 트리에서의 룰 노드
	* @author 이상호 (2016.07.12)
	*/
	var fn_find_ruleNode = function(_sLayerName,_sRuleName) {
		var sLayerId = fn_find_layerId(_sLayerName);
		var oLayerNode = $("#divLayerTree li.layer[id=layer_"+sLayerId+"]");
		
		var aRuleNodes = oLayerNode.find("li.style");
		var oReturnNode;
		for(var i=0,len=aRuleNodes.length; i<len; i++) {
			var oRuleNode = $(aRuleNodes[i]);
			if(oRuleNode.find("a").text().trim().replace("심볼편집","") === _sRuleName.trim().replace("심볼편집","")){
				oReturnNode = oRuleNode;
			}
		}
		
		return oReturnNode;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 레이어 트리에서 룰 노드의 체크 여부 확인
	* @param {Object} _oRuleNode - 룰노드 object
	* @returns {Boolean} bCheck - 트리에서 체크 상태의 경우/아닌 경우 true/false
	* @author 이상호 (2016.07.12)
	*/
	var fn_check_treeRuleNode = function(_oRuleNode){
		var bCheck = false;
		bCheck = $("#divLayerTree").jstree("is_checked", _oRuleNode);
		return bCheck;
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 선택한 룰과 트리의 상태를 싱크하는 함수
	* @param {String} _sLayerName - 선택한 레이어 이름(한글/영어)
	* @param {String} _sRuleName - 선택한 룰이름
	* @author 이상호 (2016.07.12)
	*/
	var fn_select_treeRuleNode = function(_sLayerName,_sRuleName) {
		var oRuleNode = fn_find_ruleNode(_sLayerName,_sRuleName);
		var oRuele = fn_find_rule(_sLayerName,_sRuleName);
		if(typeof oRuele.hidden === "undefined" || oRuele.hidden) {
			if(fn_check_treeRuleNode(oRuleNode)){
				$("#divLayerTree").jstree("uncheck_node",oRuleNode);
			}
		} else{
			if(!fn_check_treeRuleNode(oRuleNode)){
				$("#divLayerTree").jstree("check_node",oRuleNode);
			}
		}
	}
	
	var fn_get_tableNameFromNamedLayer = function(oNamedLayer){
		if(oNamedLayer.featureTypeName)
			return oNamedLayer.featureTypeName;
		else if(oNamedLayer.userStyle && oNamedLayer.userStyle[0] && oNamedLayer.userStyle[0].name )
			return oNamedLayer.userStyle[0].name;
		
	}
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 선택한 레이어의 룰 전부를 싱크하는 함수
	* @param {Object/String} _sLayer - layerTool의 선택한 NamedLayer object or 선택한 레이어명(한글,영어명)
	* @author 이상호 (2016.07.12)
	*/
	var fn_select_treeAllRuleNode = function(_sLayer) {
		var oNamedLayer,sLayerName;
		if(typeof _sLayer === 'object') {
			oNamedLayer = _sLayer;
		} else if(typeof _sLayer === 'string') {
			oNamedLayer = fn_find_sldNameLayer(_sLayer);
		}
		sLayerName = fn_get_tableNameFromNamedLayer(oNamedLayer);
		var aRules = oNamedLayer.userStyle[0].rules;
		for(var j in aRules){
			var sRuleName = aRules[j].name;
			fn_select_treeRuleNode(sLayerName,sRuleName);
		}
	}
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 선택한 레이어의 룰 전부를 on/off 하는 함수
	* @param {String} _sStatus - 'on'/'off' 선택
	* @param {Object/String} _sLayer - layerTool의 선택한 NamedLayer object or 선택한 레이어명(한글,영어명)
	* @author 이상호 (2016.07.12)
	*/
	var fn_toggle_allRuleWmsLayer = function(_sStatus,_sLayer) {
		var oNamedLayer,sLayerName;

		debugger;
		if(typeof _sLayer === 'object') {
			oNamedLayer = _sLayer;
		} else if(typeof _sLayer === 'string') {
			oNamedLayer = fn_find_sldNameLayer(_sLayer);
		}
		sLayerName = fn_get_tableNameFromNamedLayer(oNamedLayer);
		var aRules = oNamedLayer.userStyle[0].rules;
		for(var j in aRules){
			var sRuleName = aRules[j].name;
			if(_sStatus === 'on'){
				fn_toggle_wmsRule('on',sLayerName,sRuleName, 'LAYER_LEVEL');
			} else if (_sStatus === 'off') {
				fn_toggle_wmsRule('off',sLayerName,sRuleName, 'LAYER_LEVEL');
			}
		}
	}
	
	
	/**
	* @method 
	* @description wms의 레이어를 off하고 초기 설정으로 변환하는 함수
	* @author 이상호(2016.03.24)  
	*/
	var fn_off_defaultLayers = function() {
		NUTs.WMS.parseGetStyles(layerTool.defaultSld,function(res){
			fn_show_currentCheckRules();
			MAP.fn_redraw_wms();
		});
	}
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 트리에서 체크된 룰노드를 반환하는 함수
	* @returns {Array} aLayerObj - oRuleObj{layerName,ruleName} 형태의 배열, layerName은 레이어의 한글명 ruleName은 룰 이름
	* @author 이상호 (2016.07.12)
	*/
	var fn_get_checkAllNode = function() {
		var aNodes = $("#divLayerTree li.style.jstree-checked");
		
		var aLayerObj = [];
		for(var i=0,len=aNodes.length; i<len; i++) {
			var oRuleObj = {
					layerName:"",
					ruleName:""
			};
			var oNode = $(aNodes[i]);
			var sRuleName = oNode.find("a").text().replace("심볼 편집","");
			var sLayerName = oNode.closest('.layer').find('a').eq(0).text().replace("심볼 편집","");
			
			oRuleObj.layerName = sLayerName;
			oRuleObj.ruleName = sRuleName;
			
			aLayerObj.push(oRuleObj);
		}
		
		return aLayerObj;
	};
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 트리에서 체크된 룰을 on 하는 함수
	* @author 이상호 (2016.07.12)
	*/
	var fn_show_currentCheckRules = function() {
		var aCheckNodes = fn_get_checkAllNode();
    	for(var i in aCheckNodes) {
    		var oRuleObj = aCheckNodes[i];
    		fn_toggle_wmsRule('on',oRuleObj.layerName,oRuleObj.ruleName);
    	}
	};
	
	/**
	* @memberof USV.STYLE
	* @method 
	* @description 현재 트리에서 체크된 모든 레이어명 반환 함수
	* @param {boolean} flgTable -- ggash 2016.12.26 for geoserver 
	* true - table 리턴
	* false - theme 리턴
	* @author 이상호 (2016.10.25)
	*/
	var fn_get_checkAllLayerNode = function(flgTable) {
		debugger;
		var aAllNodes = $("#divLayerTree li.layer").get().reverse();
		var aShowLayers = layerTool.getLayers({
            con: "show",
            conVal: 1
        });
		var returnNodes = "";
		
		for(var i in aAllNodes) {
			var oNode = $(aAllNodes).eq(i);
			var oLayer = layerTool.getLayers({
	            con: "id",
	            conVal: oNode.attr("id").replace("layer_","")
	        });
			if(aShowLayers.indexOf(oLayer[0]) != -1) {
				if(flgTable)
					returnNodes += oLayer[0].table+",";
				else
					returnNodes += oLayer[0].theme+",";
			}
		}
		return returnNodes.slice(0,-1);
	};
	
	
	//------------------------------------------------------------------------------------------------------------------
	//## STYLE public 메소드
	//------------------------------------------------------------------------------------------------------------------
	//_mod_style.mainMenuCreate					=	mainMenuCreate;
	_mod_style.fn_init_drawToolview				=	fn_init_drawToolview;
	//_mod_style.fn_init_editorView				=	fn_init_editorView;
	_mod_style.fn_init_editLayerList			=	fn_init_editLayerList;
	_mod_style.fn_init_eventImgOnOff			=	fn_init_eventImgOnOff;
	_mod_style.fn_reg_eventImgOnOff				=	fn_reg_eventImgOnOff;
	_mod_style.fn_init_onOffDiv					=	fn_init_onOffDiv;
	
	
	_mod_style.fn_bind_drawToolAttr				=	fn_bind_drawToolAttr;
	_mod_style.fn_switch_drawToolshow			=	fn_switch_drawToolshow;	
	_mod_style.fn_show_editTool					=	fn_show_editTool;
	_mod_style.fn_init_editTree					=	fn_init_editTree;
	//_mod_style.fn_get_styleMapOnViewVector		=	fn_get_styleMapOnViewVector;
	//_mod_style.fn_get_styleMapOnShpVector		=	fn_get_styleMapOnShpVector;
	//_mod_style.fn_get_styleMapOnStyleVector		=	fn_get_styleMapOnStyleVector;
	//_mod_style.fn_get_styleMapOnRef				=	fn_get_styleMapOnRef;
	_mod_style.fn_set_menuStatus				=	fn_set_menuStatus;
	_mod_style.fn_set_menuStatusOnOff			=	fn_set_menuStatusOnOff;
	//_mod_style.fn_get_styleMapOnSearchVector	=	fn_get_styleMapOnSearchVector;
	
	_mod_style.fn_create_layerInfo				=	fn_create_layerInfo;
	
	_mod_style.fn_change_standardStyle			=	fn_change_standardStyle;
	_mod_style.fn_convert_imageShape			=	fn_convert_imageShape;
	_mod_style.fn_convert_labelType				=	fn_convert_labelType;
	_mod_style.fn_change_layerSld				=	fn_change_layerSld;
	_mod_style.fn_save_layerSld					=	fn_save_layerSld;
	_mod_style.fn_create_symbolChangeObject		=	fn_create_symbolChangeObject;
	_mod_style.fn_revert_layerSld				=	fn_revert_layerSld;
	_mod_style.fn_change_imageMethod			=	fn_change_imageMethod;
	_mod_style.fn_find_rule						=	fn_find_rule;
	_mod_style.fn_init_imageSrc					=	fn_init_imageSrc;
	_mod_style.fn_off_defaultLayers				=	fn_off_defaultLayers;
	_mod_style.fn_find_sldNameLayer				=	fn_find_sldNameLayer;
	_mod_style.fn_toggle_allRuleWmsLayer		=	fn_toggle_allRuleWmsLayer;
	_mod_style.fn_toggle_wmsRule				=	fn_toggle_wmsRule;
	_mod_style.fn_select_treeAllRuleNode		=	fn_select_treeAllRuleNode;
	_mod_style.fn_convert_userStyle				=	fn_convert_userStyle;
	_mod_style.fn_get_allLayerStyles			=	fn_get_allLayerStyles;
	_mod_style.fn_get_checkAllLayerNode			=	fn_get_checkAllLayerNode;
	_mod_style.fn_get_tableNameFromNamedLayer	=	fn_get_tableNameFromNamedLayer;
	//_mod_style.fn_init_windowArrange			=	fn_init_windowArrange;
	//------------------------------------------------------------------------------------------------------------------
	
	
	return _mod_style;
	
}(USV.STYLE || {}, jQuery));

