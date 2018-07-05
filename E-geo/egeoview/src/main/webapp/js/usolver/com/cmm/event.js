/**
 * 사용자 이벤트 등록
 * @namespace {Object} USV.EVENT
 */
USV.EVENT = (function(_mod_event, $, undefined){

	var oToggleLayer = "";

    //================================================= [intro] ===================	
	$('#msilder').sliderPro({
        width: '100%',
        height: 550,
        arrows: true,
        buttons: false,
        waitForLayers: true,
        thumbnailPointer: false,
        autoplay: true,
        autoScaleLayers: false,
        responsive:false
        
    });

    $('#hero-slider ul a').click(function () {

        //reset all the items
        $('#hero-slider ul a').removeClass('active');

        //set current item as active
        $(this).addClass('active');

        //scroll it to the right position
        $('.mask').scrollTo($(this).attr('rel'), 300);

        //disable click event
        return false;

    });

    $('#sys1').on('mouseenter', function () {
        $('#sys1_on').fadeIn('slow');
        $('#sys2_on').fadeOut('slow');
        $('#sys3_on').fadeOut('slow');
        $('#sys4_on').fadeOut('slow');
        $('#sysbx1').fadeIn('slow');
        $('#sysbx2').fadeOut('slow');
        $('#sysbx3').fadeOut('slow');
        $('#sysbx4').fadeOut('slow');
    });
    $('#sys2').on('mouseenter', function () {

        $('#sys1_on').fadeOut('slow');
        $('#sys2_on').fadeIn('slow');
        $('#sys3_on').fadeOut('slow');
        $('#sys4_on').fadeOut('slow');
        $('#sysbx1').fadeOut('slow');
        $('#sysbx2').fadeIn('slow');
        $('#sysbx3').fadeOut('slow');
        $('#sysbx4').fadeOut('slow');
    });
    $('#sys3').on('mouseenter', function () {
        $('#sys1_on').fadeOut('slow');
        $('#sys2_on').fadeOut('slow');
        $('#sys3_on').fadeIn('slow');
        $('#sys4_on').fadeOut('slow');
        $('#sysbx1').fadeOut('slow');
        $('#sysbx2').fadeOut('slow');
        $('#sysbx3').fadeIn('slow');
        $('#sysbx4').fadeOut('slow');
    });
    $('#sys4').on('mouseenter', function () {
        $('#sys1_on').fadeOut('slow');
        $('#sys2_on').fadeOut('slow');
        $('#sys3_on').fadeOut('slow');
        $('#sys4_on').fadeIn('slow');
        $('#sysbx1').fadeOut('slow');
        $('#sysbx2').fadeOut('slow');
        $('#sysbx3').fadeOut('slow');
        $('#sysbx4').fadeIn('slow');
    });
    
/*    $(function () {
        $("dd:not(:first)").css("display", "none");
        $("dt:first").addClass("selected");
        $("dl dt").click(function () {
            if ($("+dd", this).css("display") == "none") {
                $("dd").slideUp("slow");
                $("+dd", this).slideDown("slow");
                $("dt").removeClass("selected");
                $(this).addClass("selected");
            }
        }).mouseover(function () {
            $(this).addClass("over");
        }).mouseout(function () {
            $(this).removeClass("over");
        });

    });*/
    //================================================= [intro] ===================
	
	/**
	* @method
	* @description 이벤트 등록/바인딩
	* @author 임상수(2015.07.10)
	*/
	 _mod_event.fn_bind_btnEvent = function() {

		// 로그 보기
		$("#btn_log").click(function(e){
			$("#map_log").is(":visible") ? $("#map_log").hide() : $("#map_log").show();
		});

		// 로그 초기화
		$("#btn_log_delete").click(function(e){
			$("#map_log").text("");
		});

		// 맵 이동
		$("#btnMove").click(function(e){
			//map.activeControls("drag", editor.editMode);
			map.activeControls("drag");
		});

		// 확대
		$("#btnZoomOut").click(function(e){
			//map.activeControls("zoomOut", editor.editMode);
			map.activeControls("zoomOut");
		});

		// 축소
		$("#btnZoomIn").click(function(e){
			//map.activeControls("zoomIn", editor.editMode);
			map.activeControls("zoomIn");
		});

		// 전체 영역
		$("#btnMaxExtent").click(function(e){
			map.zoomToMaxExtent();
		});

		// 이전 영역
		$("#btnPrev").click(function(e){
			map.movePrev();
		});

		// 다음 영역
		$("#btnNext").click(function(e){
			map.moveNext();
		});

		// 거리 측정
		$("#btnPathMeasure").click(function(e){
			//map.activeControls("measurePath", editor.editMode);
			map.activeControls("measurePath");
		});

		// 면적 측정
		$("#btnPolyGonMeasure").click(function(e){
			//map.activeControls("measurePolygon", editor.editMode);
			map.activeControls("measurePolygon");
		});

		// 맵 초기화 (그리기, 측정)
		$("#btnMapClean").click(function(e){

			map.cleanMap(editor.aEditLayers);

			$(".olEditorControlEditorCustomPanel").hide();
			map.activeControls("drag");
		});

		// 스케일 이동
		$("#txtSacle").keypress(function(e){
			var scale = $(this).val();
			
			if(e.keyCode == 13 && scale) {
				if(scale < 12) {
					COMMON.showMessage('축척입력 오류 & 서비스 범위(12)를 벗어났습니다.');
					return false;
				}
				map.zoomToScale(scale);
			}
		});

		// 전체범례, 현제 범례
		$(".radio_legend").change(function(e){
			var legendType = $(this).val();

			var wmsLayer = map.getLayerByName('wmsLayer');

			if(legendType == 0) { // 전체범례
				wmsLayer.events.unregister("loadend", wmsLayer, MAP.fn_bind_currentLegendGraphic);
				wmsLayer.events.register("loadend", wmsLayer, MAP.fn_bind_fullLegendGraphic);
				MAP.fn_bind_fullLegendGraphic();
			} else { // 현재 범례
				wmsLayer.events.unregister("loadend", wmsLayer, MAP.fn_bind_fullLegendGraphic);
				wmsLayer.events.register("loadend", wmsLayer, MAP.fn_bind_currentLegendGraphic);
				MAP.fn_bind_currentLegendGraphic();
			}
		});

		// 그리기 편집패널 활성화
		$("#btnDrawEdit").click(function(e){
			$("#drawEdit-container").is(":visible") ? $("#drawEdit-container").hide() : $("#drawEdit-container").show();

			if($("#draw-container").is(":visible")) {
				$("#draw-container").hide();
			}
		});

		// 그리기 컨트롤 이벤트
		$(".map-draw").click( function() {
			map.activeControls($(this).data("controlName"));

			if($(this).data("controlName")=="drawMemo"){
				$("#btn_add_memo").removeData("memoID");		//메모에서 수정/추가를 구분하기 위해
				$("#imgSavedThumbs").hide();					//신규 추가이므로  기존 이미지 뷰 안보이도록
			}
			$("#draw-container").hide();
		});

		// 그리기 편집 컨트롤 이벤트
		$(".map-edit").click( function() {
			map.activeControls($(this).data("controlName"));
			$("#drawEdit-container").hide();
		});

		// 윈도우 크기 조절 시 발생하는 이벤트
		var resizeId = null;
		$(window).resize(function() {
		    clearTimeout(resizeId);
		    resizeId = setTimeout(resizeEnd, 100);
		});

		function resizeEnd(){
			map.updateSize();
		}
	};


	/**
	* @method
	* @description 이벤트 등록/바인딩
	* @author 최재훈(2015.07.10)
	*/
	 var fn_bind_btnEvent_CJH = function () {
		 
		   $(document).on('click','#btnLineCut',function(){
		 		if(MAP_EDITOR.fn_check_editMode()) {
		 			if(confirm("사용자 임의로 분할하는 편집작업은 권장하지 않습니다. 계속하시겠습니까?")){ 
			 			MAP_EDITOR.fn_split_lineString();
		 			}
		 		}
		 	});

		   $(document).on('click','#btnLineMerge',function(){
		 		if(MAP_EDITOR.fn_check_editMode()) {
		 			MAP_EDITOR.fn_merge_lineString();
		 		}
		 	});


		 	$(document).on('click','#btnPolygonCut',function(){
		 		if(MAP_EDITOR.fn_check_editMode()) {
		 			if(confirm("사용자 임의로 분할하는 편집작업은 권장하지 않습니다. 계속하시겠습니까?")){ 
		 				MAP_EDITOR.fn_split_polygon();
		 			}
		 		}
		 	});

		 	$(document).on('click','#btnPolygonMerge',function(){
		 		if(MAP_EDITOR.fn_check_editMode()) {
		 			MAP_EDITOR.fn_merge_polygon();
		 		}
		 	});

			$("#btnImportData").on("click", function(){
				var oDataTool = MAP.fn_get_dataTool();
				oDataTool.setMode('view');
				//MAP_EDITOR.fn_add_viewVectorLayer();
				//alert(GDataTool.mode);
			});

			$("#btnLoadShp").on("click", function(){
				var oDataTool = MAP.fn_get_dataTool();
				oDataTool.setMode('edit');
				//alert(GDataTool.mode);
			});

			$("#btnWornFacilityShow").on("click", function(){
				MAP_SPECIAL.fn_add_wornFacilityLayer();

			});

			$("#btnWornFacilityHide").on("click", function(){

				MAP_SPECIAL.fn_remove_wornFacilityLayer();

			});

			$(document).on('click','#btnGetPoint',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					MAP_EDITOR.fn_create_facilityBySameDist();
				}
			});

			$(document).on('click','#btnRemoveRefEditLine',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					MAP_EDITOR.fn_remove_AllRefLayer();
					MAP_EDITOR.fn_clear_refLinePopup();
				}
			});

			$(document).on('click','#btnAddRefEditLine',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					MAP_EDITOR.fn_add_refLine()
				}
			});


			//편집시작 - 편집대상 레이어 지정
			$("#btnStartFeatureEdit").on("click", function fnStartEdit() {
				MAP_EDITOR.fn_start_edit();
			});

			$("#btnEditMonitor").on("click", function() {

				if(MAP_EDITOR.fn_check_editMode()) {
					$(".ui-dialog").css("z-index","9999");
					$("#editMonitor").dialog({
						width : 570,
						height : 450
					});
				}
			});

			$("#btnAddFeature").on("click", function() {
				MAP_EDITOR.fn_draw_featureOnEditLayer();
			});


			$("#btnDeleteFeature").on("click", function() {
				MAP_EDITOR.fn_call_deleteFeatureOnEditLayer();
			});


			$("#imgFavorite1").on("click", function() {
				alert('사용안함 - 20170213');
				//var oTmpInitExtent = new OpenLayers.Bounds(412022.5065,229718.619543,412434.7565,229912.619543);
				//map.zoomToExtent(oTmpInitExtent);
			});


			//정점편집 - 객체편집
			$("#btnEditVertices").on("click", function() {


					if(MAP_EDITOR.fn_check_editMode()) {
						map.deActiveAllControls();

						var oSearchResult = editor.oSearchResult;

						if(COMMON.isEmptyObject(oSearchResult) === false){

							var nSearchDatalen = oSearchResult.data[0].results.length;

							if(nSearchDatalen > 1) {
								COMMON.showMessage('편집오류 & [' + nSearchDatalen + ']개의 도형이 선택되었습니다. \n정점편집은 1개의 도형 개체에 대해서만 수행가능합니다.');
								return false;
							}
							
							var sLayer = oSearchResult.data[0].table;
							var sG2Id = String(oSearchResult.data[0].results[0].g2id);
							if(!editor.editingFeatures[sLayer] || !editor.editingFeatures[sLayer][sG2Id]){
								//선택된 feature에 대해 중간저장 후 편집모니터 표출
								MAP_EDITOR.fn_save_middleAll(oSearchResult);
								// filter 갱신 - ehyun 2016.3.8
								MAP_EDITOR.fn_update_filterOnWFSLayer(oSearchResult.data[0].table,String(oSearchResult.data[0].results[0].g2id));
							}

							var arrActiveControls = ['CustomModifyFeature'];
							editor.activateControls(arrActiveControls);
							//feature선택시 selectFeature - collectVertices(버텍스단위 feature 생성후 editLayer에 addDraw) 과정 수행됨.
						}
						else{
							COMMON.showMessage('편집오류 & 편집가능한 개체가 없습니다.');
							return false;
						}

					}
					/*if($("#editVerticesPane").attr("style") === "visibility: visible;") {
						MM_showHideLayers('editVerticesPane','','hide');
					} else {
						MM_showHideLayers('editVerticesPane','','show');
					}*/


			});

			$("#btnEditVertex").on("click", function() {


			});

			$("#btnDelVertex").on("click", function() {

				map.deActiveAllControls();
				var arrActiveControls = ['DeleteVertex'];
				editor.activateControls(arrActiveControls);

			});

			//도형변형 - 객체편집
			$("#btnEditTransform").on("click", function() {

				if(MAP_EDITOR.fn_check_editMode()) {
					map.deActiveAllControls();

					var oSearchResult = editor.oSearchResult;

					if(COMMON.isEmptyObject(oSearchResult) === false){

						var nSearchDatalen = oSearchResult.data[0].results.length;

						if(nSearchDatalen > 1) {
							COMMON.showMessage('편집오류 & [' + nSearchDatalen + ']개의 도형이 선택되었습니다. \n도형이동은 1개의 도형 개체에 대해서만 수행가능합니다.');
							return false;
						}
						
						var sLayer = oSearchResult.data[0].table;
						var sG2Id = String(oSearchResult.data[0].results[0].g2id);
						if(!editor.editingFeatures[sLayer] || !editor.editingFeatures[sLayer][sG2Id]){
							//선택된 feature에 대해 중간저장 후 편집모니터 표출
							MAP_EDITOR.fn_save_middleAll(oSearchResult);
							// filter 갱신 - ehyun 2016.3.8
							MAP_EDITOR.fn_update_filterOnWFSLayer(oSearchResult.data[0].table, String(oSearchResult.data[0].results[0].g2id));
						}
						
						editor.getControlById('CustomDragFeature').editLayer.features[0].renderIntent = 'select';
						var arrActiveControls = ['CustomDragFeature'];
						editor.activateControls(arrActiveControls);
					}
					else{
						COMMON.showMessage('편집오류 & 편집가능한 개체가 없습니다.');
						return false;
					}
				}

			});

			//편집검색
			$("#btn_editSearch").on("click", function() {
				if(MAP_EDITOR.fn_check_editMode()) {
					var nLeft = $("#btn_editSearch").offset().left;
					var nTop = $("#btn_editSearch").offset().top;
					var nImgWidth = $("#btn_editSearch img").width();

					var nWidth = $("#editSearchPane").width();
					
					$("#editSearchPane").css({'top':(nTop+12),'left':nLeft-(nWidth/2)+(nImgWidth/2)});
				}
			});

			//도형선택
			$("#btnEditSelect").on("click", function() {
				if(MAP_EDITOR.fn_check_editMode()) {
					//map.deActiveAllControls();
					//map.activeControls("SelectFeature");
					editor.activateControls(["SelectFeature"]);
					var selectFeatureControl = map.getControl("SelectFeature");
					var editingWfsLayer = map.getLayerByName(COMMON.fn_get_editingLayer());
					var editLayers = [editor.editLayer, editor.styleLayer, editingWfsLayer];

					selectFeatureControl.setLayer(editLayers);

				}
				//$( "#resultMainContainer" ).dialog( "close" );

			});


			$("#btnEditUndo").on("click", function() {
				if(MAP_EDITOR.fn_check_editMode()) {
					map.getControl('UndoRedo').undo();
				}
			});

			$("#btnEditRedo").on("click", function() {
				if(MAP_EDITOR.fn_check_editMode()) {
					map.getControl('UndoRedo').redo();
				}
			});

			//스냅사용 - checkbox
			$("#chkOptEditSnap").on("click", function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					if($(this).is(":checked")) {
						STYLE.fn_show_editTool("tabSnapMng");
					}else{

						MAP_EDITOR.fn_init_snappingControl();

					}
				}else{
					$(this).attr("checked",false);
				}
			});

			//스냅적용 - button
		    $("#btnSnapSetting").on("click", function() {
		    	var arrActiveControls = ["SnappingSettings"];
				editor.activateControls(arrActiveControls);
				var snappingControl = map.getControl('SnappingSettings');
				if(snappingControl){

					$("#snapMng .SBx dd").each(function(index, element) {
						if(index > 0){
							var lyrNm = COMMON.fn_get_EditEngLayerNm($(this).filter(':first')[0].innerText);
							var chkboxEl = $(this).find(':checkbox');
							for(var i=0;i<chkboxEl.length;i++){
								if($(chkboxEl[i]).is(':checked')){
									snappingControl.setLayerSnapping(map.getLayerByName(lyrNm),true);
									MAP_EDITOR.fn_apply_snap(lyrNm);
								}
							}
						}
					});

					//snappingControl.changeSnapping();
				}
				else{
					COMMON.showMessage('편집오류 & 스냅 컨트롤을 찾지 못했습니다.');
					return false;
				}


				STYLE.fn_show_editTool("tabEditTool");

		    });


			// 편집저장
			$("#btnEditSave").click(function() {

				if(editor.editMode) {
					$("#editMidSaveLayers").is(":visible") ? $("#editMidSaveLayers").hide() : COMMON.showWindow($("#editMidSaveLayers"));
					MAP_EDITOR.fn_get_midSaveLayers('save');
				}
				else{
					COMMON.showMessage('편집오류 & 편집모드에서만 제공하는 기능입니다.');
					return false;
				}
			});
						
			// 편집저장 이벤트
			$(document).on('click','#btnSaveConfirm',function(){
				if(confirm("저장 하시겠습니까?") == false)
					return;
				MAP_EDITOR.fn_save_edit();
				$('#editMonitor').hide(); 
				$('#editMonitor').parent().hide(); 
			});
			
			$(document).on('click','#btnConfirmClose',function(){			
				$("#editMidSaveLayers").hide();
			});
			
			$(document).on('click','#btnConfirmClose2',function(){
				$("#btnConfirmClose").trigger("click");
			});

			$("#btnSearchUser").bind("click", function() {
			});


			$("#btnSaveMiddle").bind("click", function() {
				MAP_EDITOR.fn_save_middle();
			});

			// 편집종료
			$("#btnEditStop").bind("click", function() {

				if(MAP_EDITOR.fn_check_editMode()) {

					if (confirm("편집을 종료합니다. \r\n편집 '저장' 하시겠습니까?") == false){
						// 편집 취소 Process
						//MAP_EDITOR.fn_cancel_edit();
						$("#btnEditCancel").trigger('click');
					}
					else{
						// 편집 저장 Process
						MAP_EDITOR.fn_save_edit();
					}
					editor.copyMode = false;
					editor.stopEditMode();
					$("div.editLayer").text("편집 시설물 선택");
					$("div.editLayer").attr("id","");
//					tmpFeature = null;
					$("#btnImgStartFeatureEdit").attr('src','/images/usolver/com/map/left/left_a01_off.png');
					$("#btnImgStartBookEdit").attr('src','/images/usolver/com/map/left/left_a02_off.png');
				}
			});

			// 편집취소
			$("#btnEditCancel").bind("click", function() {

				if(MAP_EDITOR.fn_check_editMode()) {	
					
					MAP_EDITOR.fn_cancel_edit();
					
					editor.copyMode = false;
					editor.stopEditMode();
					$("div.editLayer").text("편집 시설물 선택");
					$("div.editLayer").attr("id","");

					$("#btnImgStartFeatureEdit").attr('src','/images/usolver/com/map/left/left_a01_off.png');
					$("#btnImgStartBookEdit").attr('src','/images/usolver/com/map/left/left_a02_off.png');
				}
			});

			$("#btnClearGeoCodeData").on("click", function() {
				map.cleanMap(editor.aEditLayers);
				$(".olEditorControlEditorCustomPanel").hide();
			});

			// 고급편집 - 방향전환
			$(document).on('click','#btnDirectChg',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					MAP_EDITOR.fn_reverse_direction();
				}
			});

			// 고급편집 - 상월표시제거
			$(document).on('click','#btnOverSignRemove',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					alert('준비중');
				}
			});

			// 고급편집 - 교차지점관리
			$(document).on('click','#btnCrossPointMng',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					alert('준비중');
				}
			});

			// 고급편집 - 홀편집
			$(document).on('click','#btnHoleEdit',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					map.deActiveAllControls();
					var oSearchResult = editor.oSearchResult;
					if(COMMON.isEmptyObject(oSearchResult) === false){
						var nSearchDatalen = oSearchResult.data[0].results.length;
						if(nSearchDatalen > 1) {
							COMMON.showMessage('편집오류 & [' + nSearchDatalen + ']개의 도형이 선택되었습니다. \n홀편집은 1개의 도형 개체에 대해서만 수행가능합니다.');
							return false;
						}
						
						var sLayer = oSearchResult.data[0].table;
						var sG2Id = String(oSearchResult.data[0].results[0].g2id);
						var editLayerType = COMMON.fn_get_EditLayerType(sLayer);
						if(!editor.editingFeatures[sLayer] || !editor.editingFeatures[sLayer][sG2Id]){
							//선택된 feature에 대해 중간저장 후 편집모니터 표출
							MAP_EDITOR.fn_save_middleAll(oSearchResult);
							// filter 갱신 - ehyun 2016.3.8
							MAP_EDITOR.fn_update_filterOnWFSLayer(oSearchResult.data[0].table, String(oSearchResult.data[0].results[0].g2id));
						}
						
						if(editLayerType == "Polygon"){
							//MAP_EDITOR.fn_remove_AllRefLayer();
							editor.activateControls(["DrawHole"]);
						}
					}
					else{
						COMMON.showMessage('편집오류 & 편집가능한 개체가 없습니다. <br>편집할 1개의 개체를 선택하여 주세요');
						return false;
					}
				}
			});
			
			// 고급편집 - 도형 및 속성 복사붙여넣기
			$(document).on('click','#btnCopyPaste',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					map.deActiveAllControls();
					var oSearchResult = editor.oSearchResult;
					if(COMMON.isEmptyObject(oSearchResult) === false){
						var nSearchDatalen = oSearchResult.data[0].results.length;
						if(nSearchDatalen > 1) {
							COMMON.showMessage('편집오류 & [' + nSearchDatalen + ']개의 도형이 선택되었습니다. \n 복사 및 붙여넣기를 수행할 1개의 도형 개체를 선택하여 주세요.');
							return false;
						}
						MAP_EDITOR.fn_copyPaste_feature(oSearchResult);
					}
					else{
						COMMON.showMessage('편집오류 & 복제가능한 개체가 없습니다. <br>복제할 1개의 개체를 선택하여 주세요');
						return false;
					}
				}
			});

			// 고급편집 - 시설물복제 - 시설물 선택
			$(document).on('click','#btnSelectFeature',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					map.deActiveAllControls();
					var editTable = COMMON.fn_get_editingLayer();
					map.getControl('getFeature').setTables(editTable);
					map.activeControls("getFeature");
					editor.copyMode = true;
				}
			});

			// 고급편집 - 시설물복제 - 시설물복제 취소
			$(document).on('click','#btnCancelFeature',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					if(editor.copyMode === false){
						COMMON.showMessage('편집오류 & 복제 모드가 이미 종료되었습니다.');
						return;
					}
					MAP_EDITOR.fn_cancel_featureCopy();
				}
			});

			// 고급편집 - 시설물복제 - 시설물복제종료
			$(document).on('click','#btnCopyFeatureStop',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					map.deActiveAllControls();
					editor.copyMode = false;
					editor.arrCopiedG2Id = [];
					COMMON.showMessage('편집알림 & 복제 모드를 종료합니다.');
					return;
				}
			});

			// 고급편집 - 시설물 생성(좌표)
			$(document).on('click','#btnMakeFeaturebyXY',function(){
				if(MAP_EDITOR.fn_check_editMode()) {
					if(editor.editMode) {
						map.deActiveAllControls();
						var sEditingLayerName = COMMON.fn_get_editingLayer();
						var xCoord = $("#txtCoordX").val();
						var yCoord = $("#txtCoordY").val();
						if(!COMMON.isNumber(xCoord) || !COMMON.isNumber(yCoord)){
							COMMON.showMessage('편집오류 & 좌표값에는 숫자정보만 입력가능합니다.');
							return;
						}
						else
							MAP_EDITOR.fn_create_featureByXY(sEditingLayerName, $("#txtCoordX").val(), $("#txtCoordY").val(),true);
					}
				}
			});

		    $( "#btnSearchPoint" ).button({
		        text: "점"
		    }).click(function() {

		    });

		    $( "#btnSearchLine" ).button({
		        text: "선"
		    }).click(function() {

		    });

		    $( "#btnSearchRect" ).button({
		        text: "사각형"
		    }).click(function() {

		    });

		    $( "#btnSearchUserRect" ).button({
		        text: "다각형"
		    }).click(function() {

		    });


		    //시스템 기본 조작 메뉴(출력/데이터관리..외) 선택유지
		    STYLE.fn_set_menuStatus(".headerBx1 .ABx ul li a");

		    //지도 기본 조작 메뉴 선택유지
		    STYLE.fn_set_menuStatus($(".headerBx1 .BBx ul li a:not(.onoffdiv)"));

		    //편집도구 메뉴 선택유지
		    STYLE.fn_set_menuStatus($("#editPane .IcoBt a:not(.onoffdiv)"));

		    //그리기도구 메뉴 선택유지
		    STYLE.fn_set_menuStatus("#drawPane .IcoBt a");

		    //left 탭 메뉴 선택유지
		    STYLE.fn_set_menuStatus(".leftTab ul li a");

		    //left 탭 편집상태 선택유지
		    STYLE.fn_set_menuStatus(".Left_SBx1 .BtBx1 li a");

		    //left 탭 등간격추가 선택유지
		    STYLE.fn_set_menuStatus(".Left_SBx1 .BtBx3 li a");

		    //left 탭 시설물복제 선택유지
		    STYLE.fn_set_menuStatus(".Left_SBx1 .BtBx4 li a");

		    //left 탭 고급편집 선택유지
		    STYLE.fn_set_menuStatus(".Left_SBx1 .BtBx2 li a");

		    STYLE.fn_set_menuStatusOnOff("#layerTab .LeftLyrBx li a");
		    
		    STYLE.fn_set_menuStatusOnOff("#divSubjectMenu  li a");
		    
		    
		//------------------------------------------------------------------------------------------------------------------
		//$$ public 프로퍼티
		//------------------------------------------------------------------------------------------------------------------


		};


		/**
		* @method
		* @description 이벤트 등록/바인딩<br />
		* 2015.12.28. event.js 분리 위한 별도 함수 정의 작업 진행
		* @author 임상수(2015.07.10)
		*/
		var fn_bind_btnEvent_ISS = function () {

			
			$("#btn_imaj_on").click(function(e){
				var oImajCtrl = map.getControl("imajnetClick");
				if(oImajCtrl){
					oImajCtrl.activate();
				}
			});
			
			// 일반 지도
			$("#btn_map_nomal").click(function(e){
				MAP.fn_show_external2dMap(this);
			});

			// 항공사진
			$("#btn_map_satelite").click(function(e){
				MAP.fn_show_externalSateliteMap(this);
			});

			$("#btnDrawDelete").click(function(e){
				MAP.fn_get_drawTool().deleteFeature();
			});

			$("#btn_roadView").click(function(e){

				var sType = MAP.fn_get_daumMap().getOverlayLayerType();

				if(sType != -1) {
					MAP.fn_get_daumMap().endRoadView();
					MAP.fn_leftTab_control('close');  

				} else {
					MAP.fn_get_daumMap().startRoadView();
					MAP.fn_leftTab_control('open');  
				}

				return false;
			});

			// 맵 저장 이벤트
			$("#btn_gmlSave").click(function(e){
				$("#saveMap").is(":visible") ? $("#saveMap").hide() : COMMON.showWindow($("#saveMap")); 

				return false;
			});
			
			/**
			* @memberof USV.EVENT
			* @method
			* @description 지도 출력 선택
			* @author 이상호(2016.10.12)
			*/
			$("#btnPrintSelect").on("click", function() {

				if(MAP.fn_check_userAuthor('print')){
					
					if($('#chkBasicPrint').is(":checked")){  //기본출력
						$('#printPane').hide();
						//FIXME 현재 지도 이미지 생성후 다운로드만 가능
						//MAP.fn_create_mapImage();					
						window.parent.fn_win_open('지도인쇄미리보기', "/maputil/print.do", 985, 690, 'urlType' ); 				
					}
					else if($('#chkExpPrint').is(":checked")){ //고급출력
						var baseUrl;
						if(location.port)
							baseUrl = location.protocol + "//" + location.host + ":" + location.port;
						else
							baseUrl = location.protocol + "//" + location.host;

						baseUrl += "/maputil/launchprint.do";
						//FIXME 계정, 위치정보등 실제 서비스 정보로 변경 필요.
						var oCurXY = map.getCenter();
						var sCurScale = map.getScale();
						var sUserId = COMMON.fn_get_userId();
						baseUrl += "?baseUrl=http://localhost&printUrl=http://localhost/resource/jnlp/GenerateJNLPprint.jsp&username=SUPERMAN&center="+oCurXY.lon+","+oCurXY.lat+"&scale="+sCurScale+"&SLD=true&USER_IDE="+sUserId;
						$("#ifrBlank").attr('src',baseUrl);
					}
				}
			});
			
			// 전체 검색
			$('#btnTotalSearch').on('click',function(){
				SEARCH.fn_search_total();
			});
			
			// 지도 저장 버튼 클릭
			$("#btnSaveMap").on("click", function() {
				if(MAP.fn_check_userAuthor('print')){
					$('#saveMapPane').hide();
					var fileName = $("#fileName").val();
					$("#fileName").val(encodeURIComponent(fileName));
					$("#printForm").target = "ifrBlank";
					MAP.fn_create_mapImage();
					return false;
				}
			});
			
			// 지도 저장 닫기
			$("#btn_saveMap_close").on("click", function() {
				$('#saveMapPane').hide();
			});
			
			// 지도 출력 닫기
			$("#btn_print_close").on("click", function() {
				$('#printPane').hide();
			});

			// 즐겨찾기 버튼 이벤트
			$("#btn_favorite").click(function(e){
				MAP.fn_init_fav();
				var sUserId = COMMON.fn_get_userId();
				MAP.fn_create_favGroupTag(sUserId); //FIXME
			});

			// 맵 갤러리 버튼 이벤트
			$("#btn_layer_addremove").click(function(e){
				$("#layerAddRemovePane").is(":visible") ? $("#layerAddRemovePane").hide() : COMMON.showWindow($("#layerAddRemovePane"));
				//var oLayerStyles = MAP.fn_get_layerStyles();
				//if(oLayerStyles){
					MAP.fn_init_divAllLayerTree(null, false);
					MAP.fn_init_divSelLayerTree(null, false);
				//}
				/*if(!$("#layerAddRemovePane").is(":layerAddRemovePane")) {
					
				}*/

				return false;
			});

			$("#mnu_system_subject").on('click', function() {			
				//var sSysCode = 'WTL'; //FIXME 실제 시스템 코드로 SET해야함..
				MAP.fn_get_subjectInfo(COMMON.fn_get_currentSystem(),true);				
			});
			
			$("#mnu_base_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('BASE',false);				
			});

			$("#mnu_standby_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('STANDBY',false);				
			});

			$("#mnu_rdl_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('RDL',false);				
			});

			$("#mnu_wtl_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('WTL',false);				
			});

			$("#mnu_swl_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('SWL',false);				
			});

			$("#mnu_und_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('UND',false);				
			});

			$("#mnu_etc_subject").on('click', function() {				
				MAP.fn_get_subjectInfo('ETC','');				
			});
			
			
			//레이어 목록 초기화
			$("#btn_layer_refresh").click(function(e){
				var oLayerStyles = MAP.fn_get_layerTotInfoList();
				if(oLayerStyles){
					MAP.fn_init_divLayerTree(oLayerStyles, true);
				}
				var oOrgEditLayerInfoList = COMMON.fn_get_orgEditLayerInfo();
				MAP.fn_set_editLayerInfoList(oOrgEditLayerInfoList);	//편집가능한 레이어목록 초기화
				STYLE.fn_init_editLayerList(COMMON.fn_get_editLayerInfo());//편집시설물 선택 초기화
			});
			
			//레이어 추가/제거 - [확인]
			$("#btn_layer_change").click(function(e){
				
				MAP.fn_set_layerTree();
				$("#layerAddRemovePane").hide();
				
			});

			$("#btn_add_subject").click(function(e){
				
				$("#popup_subject_gallery").hide();
				
				/*$(".ui-dialog").css("z-index","9999");
				$("#popup_subject").dialog({
					width : 530,
					height : 450
				});*/
				
				//초기화
				$('#SUBJECT_GROUP').val('').attr('selected', 'selected');
				$('#SUBJECT_SHARE').val('').attr('selected', 'selected');
				$('#BASE').val('').attr('selected', 'selected');
				$("input[id*='SUBJECT_']").val("");
				$("textarea[id*='SUBJECT_']").val(""); 
				$("#imgSubjectThumbslst")[0].innerHTML="";
				
				$("#DATA_PROC").val("");
				$("#SEL_SUBJECT_ID").val("");
				storedSubjectFiles = [];
				//$('#subject_share option:eq(0)').attr('selected', 'selected')
					
				COMMON.showWindow($("#popup_subject"));
			});
			
			$("#btn_select_subject").click(function(e){

				$("#popup_subject").hide(); 
				COMMON.showWindow($("#popup_subject_gallery"));
				
			});
			
			$("#SUBJECT_SHARE").change(function(e){

				//debugger;
				
				var sSelGroup = $('#SUBJECT_SHARE').val();
				if(sSelGroup === "ALL"){
					$("#subjectSel2").show();
				}
				else{
					$("#subjectSel2").hide();
					$('#SUBJECT_GROUP').val('');
				}
			});
			

			$("input[id='subject_file']").change(function(e){
				var imgW=80, imgH=80;
				var sAccept = $(this).attr("accept");
				var isNotImages = false;
				var files = e.target.files;
				var filesArr = Array.prototype.slice.call(files);

				filesArr.forEach(function(f){
					if(f.type.match("image/*")){
						storedSubjectFiles.push(f);
						var reader = new FileReader(); //주의 IE10 이상 지원
						reader.onload = function(e){
							var li = $("<li />");
							//html += "<img src='"+ e.target.result + "' data-file='" + f.name + "'/>" ;
							var attachImg = $("<img src='"+e.target.result+"' data-file='' class='memo_attach_img' />") ;
							$(li).append($(attachImg));
							$("<a href='#' data-file='" + f.name + "' class='delFile'><img src='/images/usolver/com/map/p_btn2_del_on.gif' alt='제거' /></a> ").appendTo($(li));


							$("#imgSubjectThumbs ul").append($(li));

							// 이미지 사이즈 조정
							//var img = $("#imgThumbs ul li img:last")[0];
							MAP.fn_image_resize(attachImg, 100, 100);
						}
						reader.readAsDataURL(f);
					}
					else
						isNotImages = true ;

				});


				/*if (isNotImageFiles)
					COMMON.showMessage('이미지 파일만 등록합니다.');

				var sFileName = $(this).val();

				if(sAccept == "image/*" && sFileName) {
					if(!sFileName.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
						alert("이미지 파일을 선택해주세요.");
					    $(this).val("");
					}
				}*/
			});

			//메모 추가 시 현재 추가한 이미지파일 삭제
			$("#imgSubjectThumbs").on("click","a",function(e){

				var file = $(this).data("file");
		        for(var i=0;i<storedSubjectFiles.length;i++) {
		            if(storedSubjectFiles[i].name === file) {
		            	storedSubjectFiles.splice(i,1);
		                break;
		            }
		        }
		        $(this).parent().remove();

			});
			
			//메모 수정 시 기등록된 이미지파일 삭제
			$("#imgSavedThumbs").on("click","a",function(e){

				var fileID = $(this).data("fileID");

				if(fileID != undefined)
				{
					$.ajax({
						url : COMMON.fn_get_pageContext() + "/memo/deleteMemoFile.do",
						type : 'GET',
						data : {
							FILE_ID : fileID
						},
						dataType : "json",
						success : function(_sData) {
							if (_sData.resultCnt > 0) {
								COMMON.showMessage("MEMO&메모가 삭제되었습니다.");
								$("#btnMemoList").trigger("click"); // 감추고
								$("#divMemoHist").hide();
								$("#btnMemoList").trigger("click"); // 다시 메모 보이기

							} else {
								COMMON.showMessage("ERROR&메모 삭제에 실패하였습니다.");
							}
						},
						error : function(_sMsg) {
							COMMON.showMessage("ERROR&메모 삭제에 실패하였습니다.");
						}

					});

					$(this).parent().remove();
				}
			});
			
			// 주제도 저장하기 버튼 이벤트
			$("#btn_save_subject").click(function(e){				
					MAP.fn_save_subject(storedSubjectFiles);
			});

			// 주제도 저장 닫기 이벤트
			$("#btn_popup_subject_close").click(function(e){
					$("#popup_subject").hide();				
			});

			// 인쇄 미리보기 저장 닫기 이벤트
			$("#btn_popup_print_close").click(function(e){
					$("#printPreview").hide();				
			});
			
			// 주제도 저장 취소 이벤트
			$("#btn_close_subject").click(function(e){
					$("#popup_subject").hide();				
			});

			// 주제도 저장 취소 이벤트
			$("#btn_close_subject_gallery").click(function(e){
					$("#galleryPane").hide();				
			});
			 
			$("#btn_close_layeradd").click(function(e){
				$("#layerAddRemovePane").hide();
			});

			$("#btn_layer_changecancel").click(function(e){
				$("#layerAddRemovePane").hide();
			});

			//맵 갤러리
			$("#btn_subject_gallery").click(function(e){
				
				MAP.fn_get_subjectInfo('BASE',false);
				
				if($("#galleryPane").is(":visible")) {
					$("#galleryPane").hide();
				} else {
					COMMON.showWindow($("#galleryPane"));
				}
			});
			
			//맵 만들기
			$("#btn_subject_make").click(function(e){
				
				MAP.fn_get_subjectInfo('BASE',false);
				
				COMMON.showWindow($("#galleryPane"));
				 
				
				$("#btn_add_subject").trigger("click");
				 
			});
			
			// 메모리스트
			$("#btnMemoList").click(function(e){
				MAP.fn_toggle_memoList(this);
			});

			// 그리기 패널 활성화
			$("#btnDraw").click(function(e){
				if($("#drawPane").is(":visible")) {
					$("#drawPane").hide();
					$("#editPane").show();
				} else {
					$("#drawPane").show();
					$("#editPane").hide();
				}
			});

			// 즐겨찾기 닫기 버튼 이벤트
			$("#btn_close_favorites").click(function(e){
				$("#favoritePane").hide();
				$("#popup_favoritesGroup").hide();
				$("#popup_favorites").hide();
				$("#popup_favorites #FavAdd input").val('');
				$("#popup_favorites #FavAdd textarea").val('');
			});

			// 즐겨찾기 그룹 추가 버튼 이벤트
			$("#btn_add_favoritesGroup").click(function(e){
				$("#popup_favoritesGroup").is(":visible") ? $("#btn_close_favoritesGroup").trigger('click') : COMMON.showWindow($("#popup_favoritesGroup"));
			});
			
			// 즐겨찾기 그룹 수정 밎 삭제 버튼 이벤트
			$("#fav_dummyGroup img").on('click',function(e){

				var sUserId = COMMON.fn_get_userId();
				
				if($(this).attr('alt') == '수정') {
					var oFavGroup = $(this).closest('dl');
					var oFavGroupCancel = oFavGroup.find("img[alt='취소']").parent();
					oFavGroup.attr('tmp',oFavGroup.find("dt").text());
					if(!oFavGroupCancel.is(":visible")) {
						oFavGroupCancel.show();
						var oInputPopup = $('<input type="text"/>');
						oInputPopup.val(oFavGroup.find("dt").text());
						oFavGroup.find("dt").replaceWith('<dt/>');
						oFavGroup.find("dt").append(oInputPopup);
					} else {
						MAP.fn_update_favGroup(sUserId,oFavGroup.attr('id'),oFavGroup.find("input").val());//FIXME
						MAP.fn_init_fav();
						MAP.fn_create_favGroupTag(sUserId);//FIXME
					}
				} else if($(this).attr('alt') == '삭제') {
					if(confirm('즐겨찾기 그룹을 삭제하시면 그룹에 해당하는 즐겨찾기 정보도 전부 삭제됩니다.즐겨 찾기 그룹을 삭제 하시겠습니까?')){
						var oFavGroup = $(this).closest('dl');
						MAP.fn_delete_favGroup(sUserId,oFavGroup.attr("id"));//FIXME
						MAP.fn_init_fav();
						MAP.fn_create_favGroupTag(sUserId);//FIXME
					}
				} else if($(this).attr('alt') == '취소') {
					var oFavGroup = $(this).closest('dl');
					oFavGroup.find("dt").replaceWith('<dt/>');
					oFavGroup.find("dt").text(oFavGroup.attr('tmp'));
					$(this).parent().hide();
				} 
			});
			
			// 즐겨찾기 그룹  닫기 이벤트
			$("#btn_close_favoritesGroup").click(function(e){
				$("#popup_favoritesGroup").hide();
				$("#popup_favoritesGroup #FavAdd input").val('');
			});
			
			//즐겨찾기 그룹 추가 저장
			$("#popup_favoritesGroup #FavAdd .Btn").on('click',function(){
				var oFavGroup = {};
				var sGroupName = $("#popup_favoritesGroup #FavAdd input").val();
				if(sGroupName.trim() != "") {
					oFavGroup.USER_ID = COMMON.fn_get_userId();//FIXME
					oFavGroup.GROUP_NAME = sGroupName;
					MAP.fn_init_fav();
					MAP.fn_save_favGroup(oFavGroup);
					$("#popup_favoritesGroup").hide();
					$("#popup_favoritesGroup #FavAdd input").val('');
				} else {
					COMMON.showMessage("즐겨찾기 그룹 추가&그룹이름을 입력해주세요.");
				}
			});

			// 즐겨찾기 추가 버튼 이벤트
			$("#btn_add_favorites").click(function(e){
				$("#popup_favorites").is(":visible") ? $("#btn_close_favoritesAddPopup").trigger("click") : COMMON.showWindow($("#popup_favorites"));
			});
			
			// 즐겨찾기 수정 밎 삭제 버튼 이벤트
			$("#fav_dummy .fav_bt img").on('click',function(){
				var oFavInfo = {};
				var oFav = $(this).closest('.list_pd');
				oFavInfo.USER_ID = COMMON.fn_get_userId();//FIXME
				oFavInfo.FAV_ID = oFav.attr('id');
				oFavInfo.GROUP_NAME = $(".selectedFavGroup").attr('id');
				if($(this).attr('alt') == '수정') {
					var oFavCancel = oFav.find(".fav_bt img[alt='취소']").parent();
					var oFavText = oFav.find(".fav_tx");
					var oFavTextClone = oFav.find(".fav_tx").clone();
					oFavTextClone.addClass("clone");
					oFavTextClone.hide();
					oFav.append(oFavTextClone);
					
					if(!oFavCancel.is(":visible")) {
						var oInputPopup = $('<input type="text"/>');
						oInputPopup.css('width','157');
						var oTextAreaPopup = $('<textarea/>');
						oTextAreaPopup.css('width','157');
						oFavText.find("dt").replaceWith('<dt/>');
						oFavText.find("dd").replaceWith('<dd/>');
						oInputPopup.val(oFavTextClone.find("dt").text());
						oTextAreaPopup.val(oFavTextClone.find("dd").text());
						oFavText.find("dt").append(oInputPopup);
						oFavText.find("dd").append(oTextAreaPopup);
						oFavCancel.show();
					} else {
						oFavInfo.FAV_NAME = oFavText.find("dt input").val();
						oFavInfo.FAV_CONTENT = oFavText.find("dd textarea").val();
						oFavInfo.FAV_G2DATA = JSON.stringify(map.getCenter());
						MAP.fn_create_mapBase64Image(function(_oSrc){
							oFavInfo.FAV_IMG = _oSrc;
						},165,87);
						MAP.fn_update_fav(oFavInfo);
						oFavCancel.hide();
					}
				} else if($(this).attr('alt') == '삭제') {
					if(confirm('즐겨 찾기를 삭제 하시겠습니까?')){
						MAP.fn_delete_fav(oFavInfo);
					}
				} else if($(this).attr('alt') == '즐겨찾기') {
					if(oFav.hasClass("favExtent")){
						oFav.removeClass("favExtent").trigger('classChange');
						oFavInfo.FAV_EXTENT = 0;
						MAP.fn_update_favExtent(oFavInfo);
					} else {
						$(".favExtent").removeClass("favExtent").trigger('classChange');
						oFav.addClass("favExtent").trigger('classChange');
						oFavInfo.FAV_EXTENT = 1;
						MAP.fn_update_favExtent(oFavInfo);
					}
				} else if($(this).attr('alt') == '취소') {
					var oFavText = oFav.find(".fav_tx:not(.clone)");
					var oFavTextClone = oFav.find(".fav_tx.clone");
					oFavText.find("dt").replaceWith('<dt/>');
					oFavText.find("dt").text(oFavTextClone.find("dt").text());
					oFavText.find("dd").replaceWith('<dd/>');
					oFavText.find("dd").text(oFavTextClone.find("dd").text());
					oFavTextClone.remove();
					$(this).parent().hide();
				} 
			});
			
			$(".list_pd").on('classChange',function(e){
				var oFav = $(this);
				var oImg = oFav.find("img[alt='즐겨찾기']");
				if(oFav.hasClass("favExtent")) {
					oImg.attr('src',oImg.attr('src').replace("_on","_selected").replace("_off","_selected"));
				} else {
					oImg.attr('src',oImg.attr('src').replace("_selected","_off"));
				}
			});
			
			//즐겨찾기 추가 저장
			$("#popup_favorites #FavAdd .Btn").on('click',function(){
				var oFavInfo = {};
				if($("#popup_favorites #FavAdd input").val().trim() != "") {
					oFavInfo.USER_ID = COMMON.fn_get_userId();//FIXME
					oFavInfo.FAV_NAME = $("#popup_favorites #FavAdd input").val();
					oFavInfo.FAV_CONTENT = $("#popup_favorites #FavAdd textarea").val();
					oFavInfo.GROUP_NAME = $("#popup_favorites #FavAdd select option:selected").val();
					oFavInfo.FAV_G2DATA = JSON.stringify(map.getExtent());
					MAP.fn_create_mapBase64Image(function(_oSrc){
						oFavInfo.FAV_IMG = _oSrc;
					},165,87);
					MAP.fn_save_fav(oFavInfo);
					$("#popup_favorites").hide();
					$("#popup_favorites #FavAdd input").val('');
					$("#popup_favorites #FavAdd textarea").val('');
				} else {
					COMMON.showMessage("그룹이름을 입력해주세요");
				}
			});

			// 즐겨찾기 닫기 버튼 이벤트
			$("#btn_close_favoritesAddPopup").click(function(e){
				$("#popup_favorites").hide();
				$("#popup_favorites #FavAdd input").val('');
				$("#popup_favorites #FavAdd textarea").val('');
			});
			
			// 즐겨찾기 검색
			$("#favoritePane .Search input").on("keypress",function(e){
				if (e.keyCode == 13){
					$("#favoritePane .Search img").trigger('click');
				}    
			});
			
			// 즐겨찾기 검색
			$("#favoritePane .Search img").on("click",function(){
				var oSelectedGroup = $(".selectedFavGroup");
				if(oSelectedGroup.length > 0) {
					var oFavInfo = {};
					oFavInfo.USER_ID = COMMON.fn_get_userId();//FIXME
					oFavInfo.GROUP_NAME = oSelectedGroup.attr('id');
					oFavInfo.FAV_NAME = $("#favoritePane .Search input").val();
					MAP.fn_create_favTag(oFavInfo);
				}
			});

			// 메모 저장 닫기 이벤트
			$("#btn_popup_add_memo_close").click(function(e){
				var oLayer = map.getLayerByName("MemoToolLayer");
				if(oLayer){
					oLayer.removeFeatures(oLayer.features[oLayer.features.length-1]);
					$("#popup_add_memo").hide();
				}
			});
			
			$("#btn_memo_close").click(function(e){
				$("#btn_popup_add_memo_close").trigger("click");
			});

			//메모 이력 닫기
			$("#btn_popup_memohist_close").click(function(e){
				$("#dates").empty();
        		$("#issues").empty();

        		$("#divMemoHist").hide();

			});

			var storedSubjectFiles = [];
			var storedFiles = [];

			/**
			* @memberof USV.EVENT
			* @method
			* @description 메모작성을 위한 창을 활성
			* @author 김정수(2016.02.18)
			*/
			$("#btn_add_memo").click(function(e){
				if($("#popup_add_memo").is(":visible")) {
					$("#popup_add_memo").hide();
					$(this).removeData("featureData");
				} else {
					//초기화, 저장된 메모 수정 용
					$("input[name*='MEMO_NM']").val("");
					$("textarea[name*='MEMO_CN']").val("");
					$("input[name*='MEMO_NM']").val("");
					$("#imgThumbslst")[0].innerHTML="";
					storedFiles = [];

					//저장된 메모정보를 호출한다.
					MAP.fn_get_memo();

					COMMON.showWindow($("#popup_add_memo"));


				}
			});


			/**
			* @memberof USV.EVENT
			* @method
			* @description 기존 메모에 메모를 추가한다.
			* @author 김정수(2016.02.18)
			*/
			$("#btn_insert_memo").click(function(){
				var parentID="0";
				/*var oFormat = new OpenLayers.Format.GML();
				var oFeature = oFormat.read($("#btn_insert_memo").data("featureData"));*/
				var oFeature = $("#btn_add_memo").data("featureData");

				if($(".sp-thumbnail-container div:first"))
					parentID=$(".sp-thumbnail-container div:first").attr("name");

				$("#btn_add_memo").data("featureData", oFeature[0]);
				$("#btn_add_memo").data("eventType","INSERT");
				$("#btn_add_memo").data("parentID",parentID);
				$("#btn_add_memo").data("caller","DETAIL");			//상세창에서 메모 추가 또는 수정 버튼 이벤트 구분하기 위함
				var slider = $("#detailbx").data("sliderPro");
				if(slider)
					$("#btn_add_memo").data("selectSlideIdx",slider.getSelectedSlide());
				$("#btn_add_memo").trigger("click");

				//메모상세창은 감춘다.
				$("#divMemoHist").hide();
			});



			/**
			* @memberof USV.EVENT
			* @method
			* @description 메모를 수정한다.
			* @author 김정수(2016.02.19)
			*/
			$("#btn_update_memo").click(function(){

				var parentID="0", selMemoID=-1, selIdx=-1, seldiv;
				/*var oFormat = new OpenLayers.Format.GML();
				var oFeature = oFormat.read($("#btn_insert_memo").data("featureData"));*/
				var oFeature = $("#btn_add_memo").data("featureData");

				if($(".sp-thumbnail-container div:first"))
					parentID=$(".sp-thumbnail-container div:first").attr("name");

				seldiv = $(".sp-thumbnail-container").filter(".sp-selected-thumbnail");
				if (seldiv){
					selMemoID= $(seldiv).find(".sp-thumbnail").attr("name");
				}

				if(selMemoID>-1)
				{
					//메모 수정 창 호출
					$("#btn_add_memo").data("featureData", oFeature[0]);
					$("#btn_add_memo").data("eventType","UPDATE");
					$("#btn_add_memo").data("memoID",selMemoID);
					$("#btn_add_memo").data("caller","detail");
					var slider = $("#detailbx").data("sliderPro");
					if(slider)
						$("#btn_add_memo").data("selectSlideIdx",slider.getSelectedSlide());

					$("#btn_add_memo").trigger("click");
				}
				//메모상세창은 감춘다.
				$("#divMemoHist").hide();

			});

			/**
			* @memberof USV.EVENT
			* @method
			* @description 메모를 삭제한다.
			* @author 김정수(2016.02.19)
			*/
			$("#btn_delete_memo").click(function(){
				//parent 메모인지 확인하고 전체를 삭제하거나
				var memoCnt = $(".sp-thumbnail-container").length;
				var seldiv = $(".sp-thumbnail-container").filter(".sp-selected-thumbnail");
				var selMemoID, selIdx=-1;

				if (seldiv){
					selMemoID= $(seldiv).find(".sp-thumbnail").attr("name");
					selIdx=$(seldiv).find(".sp-thumbnail").attr("data-index");
				}

				if(selIdx==0 && memoCnt>1 ){	//parent이면 자 삭제가 된다는 메시지 출력
					$("#memo_del_confirm").html("연결된 메모가 존재합니다.<br />삭제 시 모든 메모가 삭제 됩니다. <br /> 삭제하시겠습니까?");
					$("#memo_del_confirm").css('zIndex',9999);
					$("#memo_del_confirm").dialog({
							 resizable:false
							,modal:true
							,title:"메모 삭제 확인"
							,height:250
							,width:300
							,buttons:{
								 "확인":function(){
									 //
									 MAP.fn_delete_memo(selMemoID);
								 }
								,"취소":function(){
									$(this).dialog('close');
								}
							}
					});
				}
				else
				{
					MAP.fn_delete_memo(selMemoID);
				}
			});



			$("#btn_memo_list_close").click(function(e){
				$("#W_290Bx").hide();
			});

			/**
			* @memberof USV.EVENT
			* @method
			* @description 마커를 변경하기 위해 메모작성 창위에 마커선택 DIV 비지블
			* @author 김정수(2016.02.11)
			*/
			$("#findMarker").click(function(){

				//마커 선택 div를 활성화한다.
				if(!$("#divMarkerList").hasClass("W_400")){
					$("#divMarkerList").addClass("W_400");
					$("#divMarkerList").css("z-index","1200");
					$("#divMarkerList").css("top","0px");
					$("#divMarkerList").css("height","100%");
				}
				// 메모그룹을 불러온다
            	$.ajax({
    		        url: COMMON.fn_get_pageContext() + "/memo/getMarkerList.do",
    		        type: 'GET',
    		        data: {
    		        	USER_ID : COMMON.fn_get_userId()//FIXME
    		        },
    		        dataType : "json",
    		        success: function (data) {

    		        	var markerList ;
    		        	var groupNM="";
    		        	var title="", addMarker="", markersHTML="";

    		        	//마커리스트를 초기화 한다.
    		        	$("#divMarkers").find(".vscroll").empty();
    		        	$("#divMarkers").find("ul").remove();

    		        	//스타일 맞추기
    		        	$("#divMarkers").css("height", parseInt($("#popup_add_memo").css("height")) - parseInt($("#P3_Header").css("height")));
    		        	var divMemo = $("#divMarkers").find(".vscroll")[0]; //$("<div />",{class:"vscroll"}) ;

    		        	if (data)
   		        		{
    		        		markerList = data.markerList;
    		        		var Table_LBx , markerlst;

    		        		for(var i = 0; i < markerList.length; i++) {
    		        			//타이틀 추가
    		        			if (groupNM!=markerList[i].GROUP_NM)
    		        			{
    		        				groupNM = markerList[i].GROUP_NM;
    		        				Table_LBx = $("<div class='Table_LBx' />");
    		        				Table_LBx.appendTo(divMemo);

    		        				$("<div class='TitBx'><p>" + groupNM + "</p></div>").appendTo(Table_LBx);
    		        				markerlst= $("<ul class='markerlst'>");
    		        				Table_LBx.append(markerlst);
    		        			}

    		        			//이미지 바인딩
    		        			if(markerList[i].MARKER_NM!=""){
    		        				markerlst.append($("<li class=''><a id='" + markerList[i].MARKER_ID + "' href='#'><div style='width:60px;'><img src='http://" + $(location).attr("host") +  markerList[i].FILE_PATH + markerList[i].FILE_NM + "' alt='"+markerList[i].MARKER_NM + "' /> </div><div>" +markerList[i].MARKER_NM+ "</div></a></li>"));
    		        			}
    		        			else
    		        				markerlst.append($("<li class='markerList' />"));


    		        			/*if (groupNM!=markerList[i].GROUP_NM)
    		        			{
    		        				groupNM = markerList[i].GROUP_NM;

    		        				if(addMarker != "" && markersHTML !="")
    		        				{
    		        					markersHTML += addMarker;
    		        					markersHTML += "</ul>";

    		        					addMarker="";
    		        				}

    		        				markersHTML +="<div class='Left_STitBx'><p>" + groupNM + "<p></div>";
    		        				markersHTML +="<ul class='BtBx3' style='padding:4px'>";

    		        			}

    		        			//이미지 바인딩
    		        			if(markerList[i].MARKER_NM!="")
    		        				addMarker += "<li class='markerList'><a id='" + markerList[i].MARKER_ID + "' href='#'><img src='http://" + $(location).attr("host") +  markerList[i].FILE_PATH + markerList[i].FILE_NM + "' alt='"+markerList[i].MARKER_NM + "' /> <p>" +markerList[i].MARKER_NM+ "</p></a></li>";
    		        			else
    		        				addMarker += "<li class='markerList' />";*/
    		        		}

    		        		/*markersHTML += addMarker;
        					markersHTML += "</ul>";
    		        		$("#divMarkers").append(markersHTML);*/
   		        		}
    		        },
    		        error: function(xhr, status, error) {
    					COMMON.showMessage('마커 정보가 없습니다.');
    				}
    			});
				$("#divMarkerList").show();
			});


			$("#btn_popup_marker_close").click(function(e){
				$("#btn_cancel_markerImg").trigger("click");
				//$("#divMarkerList").hide();
			});

			/**
			* @memberof USV.EVENT
			* @method
			* @description 마커를 선택하여 지도위에 마커를 변경
			* @author 김정수(2016.02.11)
			*/
			$("#divMarkers").on("click", "li", function(e){

				//선택 스타일 제거
				$("#divMarkers").find(".active").removeClass("active");
				//현재 li를  active
				$(this).addClass("active");
				$("#btn_select_markerImg").data("markerSRC",$(this).find("img").attr("src"));
			});


			$("#btn_select_markerImg").click(function(e){
				var markerSrc  = $(this).data("markerSRC");
				//현재 작성하고 있는 메모 feature를 선택해서 새로운 마커로 memo_info, feature를 변경한다.
				var oFeature = $("#btn_add_memo").data("featureData");

				//map에서 레이어를 찾는다.
				var layer = map.getLayerByName("MemoToolLayer");
				if (layer && markerSrc)
				{
					var feature = layer.getFeatureById(oFeature.id);
					if (typeof feature === "object")
					{
						feature.attributes["externalGraphic"] =markerSrc;
						oFeature.attributes["externalGraphic"] = feature.attributes.externalGraphic;
						$("#curMarkerImg").attr("src",markerSrc);
						//$("#btn_add_memo").data("featureData",oFeature);
					}
					layer.drawFeature(feature);//({force: true});
				}
				else
				{
					//COMMON.showMessage("마커를 변경을 하지 못했습니다.");
				}
				$(this).removeData("markerSRC");
				$("#divMarkerList").hide();
			});

			$("#btn_cancel_markerImg").click(function(e){
				$(this).removeData("markerSRC");
				$("#divMarkerList").hide();
			});

			$("input[id='memo_file']").change(function(e){
				var imgW=80, imgH=80;
				var sAccept = $(this).attr("accept");
				var isNotImages = false;
				var files = e.target.files;
				var filesArr = Array.prototype.slice.call(files);

				filesArr.forEach(function(f){
					if(f.type.match("image/*")){
						storedFiles.push(f);
						var reader = new FileReader(); //주의 IE10 이상 지원
						reader.onload = function(e){
							var li = $("<li />");
							//html += "<img src='"+ e.target.result + "' data-file='" + f.name + "'/>" ;
							var attachImg = $("<img src='"+e.target.result+"' data-file='' class='memo_attach_img' />") ;
							$(li).append($(attachImg));
							$("<a href='#' data-file='" + f.name + "' class='delFile'><img src='/images/usolver/com/map/p_btn2_del_on.gif' alt='제거' /></a> ").appendTo($(li));


							$("#imgThumbs ul").append($(li));

							// 이미지 사이즈 조정
							//var img = $("#imgThumbs ul li img:last")[0];
							MAP.fn_image_resize(attachImg, 100, 100);
						}
						reader.readAsDataURL(f);
					}
					else
						isNotImages = true ;

				});


				/*if (isNotImageFiles)
					COMMON.showMessage('이미지 파일만 등록합니다.');

				var sFileName = $(this).val();

				if(sAccept == "image/*" && sFileName) {
					if(!sFileName.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
						alert("이미지 파일을 선택해주세요.");
					    $(this).val("");
					}
				}*/
			});

			$("input[name='mashupType']").change(function(e){
				MAP.fn_change_baseMap(this);
			});

			
			//fn_init_imajbox
			$("#check_imajbox").click(function(e){
				
				if($(this).is(":checked")) {
					MAP.fn_activate_imajbox($(this));
				}
				else{
					MAP.fn_deActivate_imajbox($(this));
				}
				
				
			});

			// 메모 저장하기 버튼 이벤트
			$("#btn_save_memo").click(function(e){
				if($("#btn_add_memo").data("memoID")=== undefined)
					MAP.fn_save_memo(storedFiles);
				else
					MAP.fn_update_memo(storedFiles,$("#btn_add_memo").data("memoID") );

			});			
			
			//메모 추가 시 현재 추가한 이미지파일 삭제
			$("#imgThumbs").on("click","a",function(e){

				var file = $(this).data("file");
		        for(var i=0;i<storedFiles.length;i++) {
		            if(storedFiles[i].name === file) {
		                storedFiles.splice(i,1);
		                break;
		            }
		        }
		        $(this).parent().remove();

			});

			
			//메모 수정 시 기등록된 이미지파일 삭제
			$("#imgSavedThumbs").on("click","a",function(e){

				var fileID = $(this).data("fileID");

				if(fileID != undefined)
				{
					$.ajax({
						url : COMMON.fn_get_pageContext() + "/memo/deleteMemoFile.do",
						type : 'GET',
						data : {
							FILE_ID : fileID
						},
						dataType : "json",
						success : function(_sData) {
							if (_sData.resultCnt > 0) {
								COMMON.showMessage("MEMO&메모가 삭제되었습니다.");
								$("#btnMemoList").trigger("click"); // 감추고
								$("#divMemoHist").hide();
								$("#btnMemoList").trigger("click"); // 다시 메모 보이기

							} else {
								COMMON.showMessage("ERROR&메모 삭제에 실패하였습니다.");
							}
						},
						error : function(_sMsg) {
							COMMON.showMessage("ERROR&메모 삭제에 실패하였습니다.");
						}

					});

					$(this).parent().remove();
				}
			});
		};

		/**
		* @method
		* @description 이벤트 등록/바인딩<br />
		* @author 이상호(2016.03.17)
		*/
		var fn_bind_btnEvent_LSH = function() {
			$(".fIcoM1").on("click",function () {
	            if (!($(this).parent("li").hasClass("active"))) {
	                $('.fcont1').show();
	                $('.fcont2').hide();
	                $('.fIcoList li').removeClass("active");
	                $(this).parent("li").addClass("active");
	                $(".facilityBx").css("width", "840px");
	            }
	        });
	        $(".fIcoM2").on("click",function () {
	            if (!($(this).parent("li").hasClass("active"))) {
	                $('.fcont2').show();
	                $('.fcont1').hide();
	                $('.fIcoList li').removeClass("active");
	                $(this).parent("li").addClass("active");
	                $(".facilityBx").css("width", "840px");

	            }
	        });
			// 시설물 검색
			$("#btn_searchFacility").on("click",function() {
				if($('#searchFacilityPane').is(':visible')) {
					$('.facilityBx').css({"width":"260px"});
					$(".fIcoM1").parent().removeClass("active");
					$(".fIcoM2").parent().removeClass("active");
				}
			});

			// 시설물 검색 닫기
			$('#popup_search_facility_close').on("click",function(e){
				if(SEARCH.fn_get_bReScanCheck()) {
					if(confirm("공간검색결과 내 재검색을 종료합니다.")) {
						REGISTER.fn_close_rescan();
					} else {
						return false;
					}
				}
				SEARCH.fn_close_facility();
			});
			
			// 타임라인 닫기 - Yu_mk
			$('#popup_timeLinBx_close').on("click",function(e){
				/*$('#timeLinBx').css({
					"top": "1000px",
				});*/
				$('#timeLinBx').hide();
				var sFEsrc = $('#btnEditHis').children('.onoffimg').attr('src');
				$('#btnEditHis').children().attr('src', sFEsrc.replace('selected', 'off'));
			});

			// 공간검색 검색 영역 이미지 변환
			$('#searchFacilityPane .fw1img').hover(
				function() {
					var temp = $(this).attr("src");
					var stringArray = temp.split(".")[0].split("_");
					var status = stringArray[stringArray.length-1];
					if(status != "on") {
						var imgUrl = temp.replace('off','on');
						$(this).attr("src",imgUrl);
					}
				},
				function() {
					if(!$(this).hasClass("selectFw1")) {
						var temp = $(this).attr("src");
						var stringArray = temp.split(".")[0].split("_");
						var status = stringArray[stringArray.length-1];
						if(status == "on") {
							var imgUrl = temp.replace('on','off');
							$(this).attr("src",imgUrl);
						} else {
							$(this).attr("src",temp);
						}
					}
				}
			);
			// 공간검색 검색 방법 이미지 변환
			$('.fw2img').hover(
				function() {
					var temp = $(this).attr("src");
					var stringArray = temp.split(".")[0].split("_");
					var status = stringArray[stringArray.length-1];
					if(status != "on") {
						var imgUrl = temp.replace('off','on');
						$(this).attr("src",imgUrl);
					}
				},
				function() {
					if(!$(this).hasClass("selectFw2")) {
						var temp = $(this).attr("src");
						var stringArray = temp.split(".")[0].split("_");
						var status = stringArray[stringArray.length-1];
						if(status == "on") {
							var imgUrl = temp.replace('on','off');
							$(this).attr("src",imgUrl);
						} else {
							$(this).attr("src",temp);
						}
					}
				}
			);
			// 검색영역 클릭시 처리
			$('.fw1img').on("click",function(){
				if($(this).parents("#searchFacilityPane").length>0) {
					$('.fw1img').removeClass("selectFw1");
					$('.fw1img').mouseout();

					$(this).addClass("selectFw1");
				} else {
					$('.fw1img').removeClass("selectEditFw1");
					$('.fw1img').mouseout();

					$(this).addClass("selectEditFw1");
				}
				$(this).attr("src",$(this).mouseover().attr("src"));
			});
			// 검생방법 클릭시 처리
			$('.fw2img').on("click",function(){
				$('.fw2img').removeClass("selectFw2");
				$('.fw2img').mouseout();

				$(this).addClass("selectFw2");
				$(this).attr("src",$(this).mouseover().attr("src"));
			});
			// 시설물 검색-> 공간검색-> 검색 클릭시
			$("#btn_searchSpace").on("click",function() {
				if($('.fIcoM1').parent().hasClass("active")) {
					if($(".selectFw1").length === 0 || $(".selectFw2").length  === 0 || $("input[name=chk_tree1]:checked").length === 0) {
						COMMON.showMessage("검색 오류&검색 대상/영역/방법을 선택해주세요.");
					}  else {
						$('#searchFacilityPane').hide();
						var searchArea = $(".selectFw1").parent().data("controlName");
						var searchMethod = $(".selectFw2").parent().data("controlName");
						var searchLayer = [];
						var checkedLayer = $("input[name=chk_tree1]:checked");
						for(var i =0;i<checkedLayer.length;i++) {
							searchLayer.push(checkedLayer[i].value);
						}
						SEARCH.fn_set_searchCondition(searchArea, searchMethod, searchLayer);

						editor.initAllEditFeatures();//편집검색 후 공간검색 시 초기화('delete'스타일로 draw)하지 않으면 이전 검색결과가 계속 남게됨. 
						
						SEARCH.fn_search_space();
					}
				}
			});
			// 트리
			$(".TreePd .Tree_Tx1").nextAll(".Tree_sTx").slideUp();

			$(".TreePd .Tree_Tx1 .tabbutton").click(function(){	// 속성검색 단계 01 트리메뉴
				if( $(this).parent().nextAll(".Tree_sTx").is(":visible")){
		        	$(this).parent().nextAll(".Tree_sTx").slideUp();
		        	$(this).parent().find("img[alt='minus']").attr('src', '/images/usolver/com/map/tree_plus.gif');
		        	$(this).parent().find("img[alt='minus']").attr('alt', 'plus');
		        }else{
		        	//var group = $(this).attr('value');
		        	$(this).parent().nextAll(".Tree_sTx").slideDown();
		        	$(this).parent().find("img[alt='plus']").attr('src', '/images/usolver/com/map/tree_minus.gif');
		        	$(this).parent().find("img[alt='plus']").attr('alt', 'minus');
		        }
		    });

			$("input[name='chk_top_tree1']").on("click", function(){
				var chkid = $(this).val();
				if($(this).is(":checked")) {
					$(".Tree_sTx[value='"+chkid+"']").find("input[name='chk_tree1']").prop('checked', true);
				} else {
					$(".Tree_sTx[value='"+chkid+"']").find("input[name='chk_tree1']").prop('checked', false);
				}
			})

			$(".TreePd input[name='chk_tree1']").click(function(){	// 공간검색
				var chkid = $(this).parents(".Tree_sTx").attr('value');
				if($(this).is(":checked") == true) {
					$(this).prop("checked",true);
					$("input[name='chk_top_tree1'][value='"+chkid+"']").prop('checked', true);
				}else {
					$(this).prop("checked",false);
					if(!$(".Tree_sTx[value='"+chkid+"']").find("input[name='chk_tree1']").is(":checked")) {
						$("input[name='chk_top_tree1'][value='"+chkid+"']").prop('checked', false);
					}
				}
			});

			$(".TreePd input[name='chk_tree2']").on("click",function(){	// 속성검색
				var chkid = $(this).parents(".Tree_sTx").attr('value');
				$("input[type=checkbox]").attr('alt', 'unchk')

				if($(this).is(":checked") === true){
					$(this).attr('alt', 'chk');
					$("input[type=checkbox]").prop("checked",false);
					$(this).prop("checked",true);
					$("[name='chk_tree2'][value ='"+chkid+"']").prop('checked', true);
				}else $("input[name='chk_tree2'][type=checkbox]").prop("checked",false);

				$('#fsch_lst_input').remove();
				$("#fsch_lst_val").find('li').remove();
				$('#FL span').html("");
				$("#FR").html(" 건 ");
				$("#input").val("");

				dynamicSelect('attFldXml.do', 'fsch_lst', $(this).val(), '', $(this).parents('.fcont2').attr('id'));
			});
			//$("#IcoBt a").on("click", function(){	// 편집이력조회 타임라인 - Yu_mk
			$("#btnEditHis").on("click", function(){
				//var sFEsrc = $('#btnStartFeatureEdit').children('.onoffimg').attr('src');
				//var sEHsrc = $('#btnEditHis').children('.onoffimg').attr('src');

				//if($(this).attr('id') == 'btnEditHis'){
				if(MAP_EDITOR.fn_check_editMode()) {
					var sUserId = COMMON.fn_get_userId();;
					if(COMMON.fn_get_sysAdmin() == "Y") {	//FIXME 관리자 권한 조건
						if(confirm("전체 계정으로 검색 하시겠습니까?")) {
							sUserId = null;
						}
					}
					var blnShowTimeline = $('#timeLinBx').is(':visible') ? true : false;

					if(blnShowTimeline){
						$('#timeLinBx').hide();
					}else{
						$('#timeLinBx').show();
						if($('.leftCont').width() != 0){
							$('#timeLinBx').css({
								"top":"",
								"bottom": "0%",
								"width": $(window).width() - ( 315 + 55) 
							})
						}else{
							$('#timeLinBx').css({
								"top":"",
								"bottom": "0%",
								"width": $(window).width()- ( 39 + 55)
							})
						}
					data = {tablename : $('#Select').children('.editLayer').attr('id'),userId:sUserId};
					$.ajax({
						type: 'get',
						dataType: 'json',
						url: '/common/editHis.do',
						data: data,
						success: function(data) {
							MAP_EDITOR.fn_create_timeLine(data);
						},
						error: function(xhr, status, error) {
							alert(status + ' : ' + error); 
						}
					});

					$('#editHistoryLayer').text(' [' + COMMON.fn_get_EditKorLayerNm(COMMON.fn_get_editingLayer()) + ']');

					COMMON.showWindow($('#timeLinBx'));
					}
				}
				/*}else{
					$('#timeLinBx').css({
						"top": "1000px",
					})
				}*/
			});

			// 심볼편집의 심볼/라벨 탭전환
			/*$(".symbolTab li").on("click",function(){
				$(".symbolTab li").removeClass("active");
				$(this).addClass("active");
			});*/

			// 점형 심볼 라디오 버튼 전환
			$('input[name="imageCheck"]').change(function(){
				STYLE.fn_convert_imageShape($(this).val());
			});
			
			// 점형 심볼 라디오 버튼 전환
			$('input[name="labelCheck"]').change(function(){
				STYLE.fn_convert_labelType($(this).val());
			});
			
			// 
			$(".editSymbol .leftTabMenu ul li").on("click",function(){
				$(".editSymbol .leftTabMenu ul li").removeClass("active");
				$(this).addClass("active");
				STYLE.fn_change_imageMethod();
			})
			
			// 심볼 편집 메뉴
			$("#divbtnSymbolCheck a").on("click",function(){
				var sLayerName = $("#totLayer").text();
				var sRuleName = $("#totRule").text();
				var sRuleNum = $("#totRuleNum").text();
				var oSymbolObject = STYLE.fn_create_symbolChangeObject(sLayerName,sRuleNum);
				switch($(this).attr("id")){
				case "apply":
					STYLE.fn_change_layerSld(sLayerName,oSymbolObject);
					break;
				case "accept" :
					if(confirm("심볼정보를 저장하시겠습니까?")){
						STYLE.fn_save_layerSld(sLayerName,oSymbolObject, COMMON.fn_get_userId());
					}
					break;
				case "cancel" :
					STYLE.fn_revert_layerSld();
					break;
				}
				STYLE.fn_init_imageSrc();
			});
			
			/*$("#editSearchPane").hover(
				function() {
					MM_showHideLayers('editSearchPane','','show');
				},
				function(){
					MM_showHideLayers('editSearchPane','','hide');
				}
			);*/

			$("#editVerticesPane").hover(
				function() {
					MM_showHideLayers('editVerticesPane','','show');
				},
				function(){
					MM_showHideLayers('editVerticesPane','','hide');
				}
			);

			// 편집개체추가
			$("#editAddFeaturePane").hover(
					function() {
						MM_showHideLayers('editAddFeaturePane','','show');
					},
					function(){
						MM_showHideLayers('editAddFeaturePane','','hide');
					}
			);

			// 편집검색
			$('#editSearchPane .onoffimg').on("click",function(){
				$('#editSearchPane').hide();
				var editSearchArea = $(this).parent().data("controlName");
				
				editor.aSearchTargetLayers = [];
				var editingWfsLayer = map.getLayerByName(COMMON.fn_get_editingLayer());
				var searchTargetLayers = [editor.editLayer, editor.styleLayer, editingWfsLayer];

				editor.aSearchTargetLayers = searchTargetLayers;
				
				SEARCH.fn_set_searchCondition(editSearchArea,"edit","");
				SEARCH.fn_search_space();
			});
			
			// 편집개체추가
			$('#editAddFeaturePane .fw1img').hover(
					function() {
						var temp = $(this).attr("src");
						var stringArray = temp.split(".")[0].split("_");
						var status = stringArray[stringArray.length-1];
						if(status != "on") {
							var imgUrl = temp.replace('off','on');
							$(this).attr("src",imgUrl);
						}
					},
					function() {
						if(!$(this).hasClass("selectEditFw1")) {
							var temp = $(this).attr("src");
							var stringArray = temp.split(".")[0].split("_");
							var status = stringArray[stringArray.length-1];
							if(status == "on") {
								var imgUrl = temp.replace('on','off');
								$(this).attr("src",imgUrl);
							} else {
								$(this).attr("src",temp);
							}
						}
					}
			);

			// 편집개체추가
			$('#editAddFeaturePane .fw1img').on("click",function(){
				var editCrossOpt = $(this).parent().data("controlName");
				var sEditingLayerName = COMMON.fn_get_editingLayer();
				if(sEditingLayerName === 'WTL_PIPE_LM' || sEditingLayerName === 'WTL_SPLY_LS' || sEditingLayerName === 'SWL_PIPE_LM'){
					NUTs.Edit.Control.DrawPath.crossOption = editCrossOpt; //MAP_EDITOR.fn_set_editCrossOpt(editCrossOpt);
				}
			});
			
			$(".FindLine a").on("click",function(){
				var sKeyword = $(".FindLine input").val();
				SEARCH.fn_start_searchKeyword(sKeyword);
			})
			
			$("#divLayerCtrl a").on('click',function() {
				var aMovement = $(this).attr("id");
				if(aMovement.indexOf("lyr") != -1) {
					var sMovement = aMovement.replace("lyr","").toLowerCase();
					MAP.fn_move_layerTree(sMovement,MAP.fn_get_userId());
				}
			});
		}

		//***************************************************************************************************************
		//		map START
		//***************************************************************************************************************
		$('#selEditLayer').on('click','li a.depth2',function() {
			var sEditingLayer = $(this)[0].id;
			var sLayerCategory = sEditingLayer.substring(0,3);
			var aLayerItem = ['WTL','SWL','RDL'];

			for(var i=0, len=aLayerItem.length ; i<len; i++){
				if(sLayerCategory === aLayerItem[i])
					$('#divEditOption'+aLayerItem[i]).show();
				else
					$('#divEditOption'+aLayerItem[i]).hide();
			}

			if(oToggleLayer != '')
				oToggleLayer.show();

			$("div.editLayer").text($(this).text());
			$("div.editLayer").attr("id",$(this).attr("id"));

			oToggleLayer = $(this);
			$(this).hide();

			//시설물 변경시 타임라인 켜져있으면 자동 변경 - Yu_mk
			var sBtnEdit = $('#btnEditHis').children('.onoffimg').attr('src');
			if(sBtnEdit.indexOf('off') == -1){
				$('#btnEditHis').trigger('click');
				$('#btnEditHis').children().attr('src', sBtnEdit.replace('off', 'selected'));
			}
			// 선택한 편집레이어 기준으로 참조레이어 WFS 벡터레이어 생성, 스냅 정보 추출
			MAP_EDITOR.fn_init_editLayerSetting(sEditingLayer);
		});

		//편집도구 - toggle Tab
		$(".tabEdit ul a").click(function(event){
			$(".tabEdit ul a").each(function() {
				$(this).removeClass("LeftTab_selected");
				if($(this).attr("class") == "")
					$(this).addClass("LeftTab");
				$("#"+$(this).attr("id").replace("tab", "div")).css("display","none");
			});
			$(this).addClass("LeftTab_selected");
			$("#"+$(this).attr("id").replace("tab", "div")).css("display","block");
			event.preventDefault();
			
			switch($(this).attr("id")){
			case "tabLayerTree" :
				$("#layerTab .Left_TitBx dt").text("레이어");
				$("#divSubject").show();
				$(".Left_SubTitBx").show();
				break;
			case "tabSymbolEditTotal":
				$("#layerTab .Left_TitBx dt").text("심볼 편집");
				$("#divSubject").hide();
				$(".Left_SubTitBx").hide();
				if($("#totLayer").text() == '속성 설정') {
					COMMON.showMessage('심볼편집 & 심볼편집 아이콘을 이용해주세요');
					$("#tabLayerTree").trigger('click');
				} 
				break;
			}
		});

		/**
		* @memberof USV.MAP_EDITOR
		* @method
		* @description HTML Element의 Event Handler정의 - 편집 룰 DIV에 정의된 각 Element 중 forEventCatch Class에 한해 정의.
		* @author 윤은희(2016.04.19)
		*/
		$(document).on('change','.forEventCatch',function(){
			MAP_EDITOR.fn_set_editRuleInfo(this);
		});
		
		$(document).on('change','.forEventCatch2',function(){
			MAP_EDITOR.fn_set_midSaveLayers(this);
		});

		/**
		* @memberof USV.MAP_EDITOR
		* @method
		* @description 편집 룰 중 '이격거리로 이동'에 대해서만 별도 처리
		* @author 윤은희(2016.04.19)
		*/
		$(document).on('click','#modify_moveXY',function(){
			if(MAP_EDITOR.fn_check_editMode()) {
				var xCoord = parseFloat($('#modify_moveX').val());
				var yCoord = parseFloat($('#modify_moveY').val());

				if(!COMMON.isNumber(xCoord) || !COMMON.isNumber(yCoord)){
					//console.log(xCoord + ','+ yCoord);
					COMMON.showMessage('편집 룰 & 이동할 거리 X, Y를 숫자로 정확히 입력하세요.');
					return;
				}
				
				if(xCoord === 0 && yCoord === 0){
					COMMON.showMessage('편집 룰 & 이동할 거리 X, Y를 정확히 입력하세요.');
					return;
				}

				MAP_EDITOR.fn_set_editRuleInfo(this);
				MAP_EDITOR.fn_call_editRuleInfoforMovePosByOffset();
			}
		});

		//---------------------------------------------------------------------------------------------------------------
		//			map END
		//---------------------------------------------------------------------------------------------------------------

		//***************************************************************************************************************
		//		mapSpecial START
		//***************************************************************************************************************

		//히트맵 보이기
		$("#btnHeatmapShow").click(function(e){

			COMMON.showMessage('분포도 분석 & '+heatmapDatas.length.toString()+' 건의 분포도 자료를 분석했습니다.');
			window.setTimeout(function(){$("#dialog-message").dialog("close");}, 1000);

			MAP_SPECIAL.fn_view_heatmap(heatmapDatas);

			return false;
		});
		//히트맵 감추기
		$("#btnHeatmapHide").click(function(e){
			MAP_SPECIAL.fn_hide_heatmap();
			return false;
		});



		//맵차트 보이기
		$("#btnMapchartShow").click(function(e){
			//fn_view_mapchart("pie", chartDatas);
			MAP_SPECIAL.fn_view_chartmap_d3("pie", chartDatas2);

			return false;
		});
		//맵차트 감추기
		$("#btnMapchartHide").click(function(e){
			MAP_SPECIAL.fn_hide_mapchart();
			return false;
		});



		//연계 창 호출
		$("#btnLink").click(function(e){
			$("#linkPane").is(":visible") ? $("#linkPane").hide() : $("#linkPane").show();
			return false;
		});

		//연계 창 닫기 버튼 이벤트
		$("#btn_close_link").click(function(e){
			$("#linkPane").hide();
		});

		$("#btn_apply_link").click(function(e){
			$("#linkPane").hide();
		});


		$("#btn_reset_symbol").click(function(e){
			STYLE.fn_change_standardStyle(); 
		});
		
		

		//연계 설정 주기 설정 라디오 버튼 클릭
		//$("input:radio[name='cycle']").change(function(e){
		$("input[type='radio'][name='cycle']").change(function(e){

			var val = $(':radio[name="cycle"]:checked').val();
			switch( val) {
				case "O":
					$("#divDay").hide();
					$("#divWeek").hide();
					$("#divMonth").hide();
					break;
				case "D":
					$("#divDay").show();
					$("#divWeek").hide();
					$("#divMonth").hide();
					break;
				case "W":
					$("#divDay").hide();
					$("#divWeek").show();
					$("#divMonth").hide();
					break;
				case "M":
					$("#divDay").hide();
					$("#divWeek").hide();
					$("#divMonth").show();
					break;
			}

		}); 

        $("#showdesktop").on("dbclick",function(){
        	fn_init_windowArrange('empty');
        });
        
        $("#btnCloseAllWindow").on("click",function(){
        	fn_init_windowArrange('empty');
        });
  		
  		
        $("#btnShowOnlyMap").on("click",function(){
        	fn_init_windowArrange('map');
        });
  		
        $("#btnShowType1").on("click",function(){
        	fn_init_windowArrange('type1');
        });
  		
        $("#btnShowType2").on("click",function(){
        	fn_init_windowArrange('type2');
        });
  		
        $("#btnShowType3").on("click",function(){
        	fn_init_windowArrange('type3');
        });
        
		//---------------------------------------------------------------------------------------------------------------
		//		mapSpecial END
		//---------------------------------------------------------------------------------------------------------------


		//------------------------------------------------------------------------------------------------------------------
		//## public 메소드
		//------------------------------------------------------------------------------------------------------------------
		_mod_event.fn_bind_btnEvent_CJH			=	fn_bind_btnEvent_CJH;
		_mod_event.fn_bind_btnEvent_ISS			=	fn_bind_btnEvent_ISS;
		_mod_event.fn_bind_btnEvent_LSH			=	fn_bind_btnEvent_LSH;
	return _mod_event;

}(USV.EVENT || {}, jQuery));