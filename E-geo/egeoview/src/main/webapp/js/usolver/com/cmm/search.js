/**
 * 검색 네임스페이스
 * @namespace {Object} USV.SEARCH
 */
USV.SEARCH = (function(_mod_search, $, undefined){
	var sQuery_head='';		// 속성고급검색 쿼리 앞부분 - Yu_mk
	var sQuery_send='';		// 속성고급검색 DB 조회시 사용되는 쿼리 (건수 조회용) - Yu_mk
	var sQuery_send2='';	// 속성고급검색 DB 조회시 사용되는 쿼리 (상제 검색용) - Yu_mk
	var sQuery_back='';		// 속성고급검색 쿼리 뒷부분 - Yu_mk
	var sOp='';				// 속성고급검색 연산자 - Yu_mk
	var nTurn='';			// 속성고급검색 단계 02 순서 저장 변수 - Yu_mk

	/**
	* 검색결과 feature를 표출할 벡터레이어
	* @member {Object} oSearchVectorLayer
	*/
	var oSearchVectorLayer;

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 공간 검색 레이어 찾기
	* @author 이상호(2016.03.17)
	* @returns {Object} oGSearchSpaceLayer - 공간 검색 레이어
	*/
	var fn_get_searchSpaceLayer = function() {
		return map.getLayerByName("searchAreaLayer");
	}

	var fn_get_searchVectorLayer = function() {
		return editor.searchLayer;
	}
	
	var bReScanCheck = false;
	
	var fn_get_bReScanCheck = function() {
		return bReScanCheck;
	}
	
	var fn_set_bReScanCheck = function(bCheck) {
		bReScanCheck = bCheck;
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 위치검색을 수행한 검색결과를 정해진 HTML element에 표출한다.
	* @author 윤은희(2015.09.04)
	*/
	_mod_search.fn_init_search = function(){

		fn_handle_searchPositionMenu();

		/*$('#btn_searchLoc').click(function(e){
			$('#searchLocPane').is(':visible') ? $('#searchLocPane').hide() : $('#searchLocPane').show();
			$('#favoritePane').hide();
			$('#searchAttPane').hide();
			$('#searchFacilityPane').hide();
		});*/
		$('#popup_search_position_close').click(function(e){
			$('#searchLocPane').hide();
		});

		$("#fsch_lst").on("click", "li", function(e){ 	// 속성고급검색 단계 02 필드 목록 - Yu_mk
			var inputBox = $("#input").val();

			if((nTurn !== 1000 || nTurn !== 1000) && (sQuery_back.indexOf("AND") !== -1 || sQuery_back.indexOf("OR") !== -1)){	//있으면
				nTurn = 2;
				$("#input").val(inputBox+$(this).html()+"(이)가");
				sQuery_back = sQuery_back + " " + $(this).attr("id") + " ";
			}else {
				$("#input").val($(this).html()+"(이)가");
				$('#fsch_lst_input').remove();
				nTurn = 2;
				sQuery_head = "";
				sQuery_back = "";
				sQuery_send = "";
				//sQuery_send2 = "";
				sQuery_head = "SELECT * FROM "+$(this).attr("value")+" WHERE "+$(this).attr("id")+" ";
				//sQuery_send = "SELECT COUNT("+$(this).attr("id")+") VAL FROM "+$(this).attr("value")+" WHERE "+$(this).attr("id")+" ";
				sQuery_send = " FROM "+$(this).attr("value")+" WHERE "+$(this).attr("id")+" ";
			}

			dynamicSelect('attFldValXml.do', 'fsch_lst_val', $(this).attr("id"), $(this).attr("value"), $(this).parents('.fcont2').attr('id'));
		});

		$(".fschbtn_lst a").on("click", function(){	// 속성고급검색 단계 02 연산자 - Yu_mk
			sOp = $(this).text();
			var inputBox = $("#input").val();
			if(nTurn === 2 || nTurn === 3){
				if(nTurn === 3){
					inputBox = inputBox.substring(0, inputBox.lastIndexOf(" "));
				}

				if(sOp === '='){
					nTurn = 3;
					$("#input").val(inputBox+" 같다");
				}
				else if(sOp === '<>'){
					nTurn = 3;
					$("#input").val(inputBox+" 같지않다");
				}
				else if(sOp === '<'){
					nTurn = 3;
					$("#input").val(inputBox+" 작다");
				}
				else if(sOp === '<='){
					nTurn = 3;
					$("#input").val(inputBox+" 작거나같다");
				}
				else if(sOp === '>'){
					nTurn = 3;
					$("#input").val(inputBox+" 크다");
				}
				else if(sOp === '>='){
					nTurn = 3;
					$("#input").val(inputBox+" 크거나같다");
				}
				else if(sOp === 'LIKE'){
					nTurn = 3;
					$("#input").val(inputBox+" 포함한다");
				}
				else if(sOp === 'IS'){
					nTurn = 5;
					sQuery_back = sQuery_back + sOp;
					$("#input").val(inputBox+" 이다");
				}
			}else if(nTurn === 5){
				if(sOp === 'NOT'){
					nTurn = 5;
					sQuery_back = sQuery_back +" "+sOp;
					$("#input").val(inputBox+" 아니다");
				}
				else if(sOp === 'NULL'){
					nTurn = 100;
					sQuery_back = sQuery_back +" "+sOp;
					$("#input").val(inputBox+" 값이없다");
				}else alert("IS NOT NULL 또는 IS NULL 로 검색 가능합니다.")
			}else if(nTurn === 100 || nTurn === 10 || nTurn === 1000){	// NULL or END
				if(sOp === 'AND'){
					nTurn = 1;
					sQuery_back = sQuery_back + " " + sOp;
					$("#input").val(inputBox+" 그리고");
				}
				else if(sOp === 'OR'){
					nTurn = 1;
					sQuery_back = sQuery_back + " " + sOp;
					$("#input").val(inputBox+" 또는");
				}else alert("AND나 OR만 선택하세요.");
			}else alert("필드 목록을 선택하세요.");
		});

		$("#fsch_lst_val").on("click","li", function(e){ 	// 속성고급검색 단계 02 표본필드값 - Yu_mk
			var inputBox = $("#input").val();
			if(nTurn === 3){	// 제대로
				$("#input").val(inputBox+" "+$(this).attr('id'));
				nTurn = 10;
				if(sOp === 'LIKE') sQuery_back = sQuery_back + sOp + " '%" + $(this).attr('id') +"%'";
				else sQuery_back = sQuery_back + sOp + " '" + $(this).attr('id') +"'";
			}else if(nTurn === 10){	// 다시
				inputBox = inputBox.substring(0, inputBox.lastIndexOf(" "));
				$("#input").val(inputBox+" "+$(this).attr('id'));
				sQuery_back = sQuery_back.substring(0, sQuery_back.lastIndexOf("'"));
				sQuery_back = sQuery_back.substring(0, sQuery_back.lastIndexOf("'"));
				if(sOp === 'LIKE') sQuery_back = sQuery_back + " '%" + $(this).attr('id') +"%'";
				else sQuery_back = sQuery_back + " '" + $(this).attr('id') +"'";
			}else alert("순서가 틀립니다.");
		});

		$('#sqlVal').on("click", function(){		// 속성고급검색 단계 02 표본필드값 직접입력 - Yu_mk
			if(!$('#fsch_lst_input').is(':visible'))
			$('#fsch_lst_val').prepend("<input type='text' id='fsch_lst_input' name='fsch_lst_input' size='14'>");
			$('#fsch_lst_input').focus();
		});

		$(document).on("change", "#fsch_lst_input",function(){	// 속성고급검색 단계 02 표본필드값 이벤트 - Yu_mk
			var inputBox = $("#input").val();
			if(nTurn === 1000 || nTurn ===10){
				sQuery_back = '';
				nTurn = 3;
				inputBox = inputBox.substring(0, inputBox.lastIndexOf(" "));
			}
			if($('#fsch_lst_input').val() && nTurn === 3){
				$("#input").val(inputBox+" "+$('#fsch_lst_input').val());
				nTurn = 10;
				if(sOp === 'LIKE') sQuery_back = sQuery_back + sOp + " '%" + $('#fsch_lst_input').val() +"%'";
				else sQuery_back = sQuery_back + sOp + " '" + $('#fsch_lst_input').val() +"'";
			}
		});

		$('#fcont2_btn a').on("click", function(){
			var aFID = [];
			var tableNM="";
				tableNM = sQuery_head.substring(0, sQuery_head.indexOf("WHERE"));
				tableNM = tableNM.substring(tableNM.indexOf("FROM")+5, tableNM.length-1);
			if(fn_get_bReScanCheck()) {
				var aSearchData = REGISTER.fn_get_searchLayerMap();
				for(var i in aSearchData[tableNM]) {
					aFID.push(aSearchData[tableNM][i].g2id);
				}
			}
			// 속성고급검색 단계 02 하단 버튼 이벤트 - Yu_mk
			if($(this).text() === '건수 조회'){
				var inputBox = $("#input").val();
				if(nTurn === 1000){
					sQuery_back = '';
					nTurn = 3;
					inputBox = inputBox.substring(0, inputBox.lastIndexOf(" "));
				}
				if($('#fsch_lst_input').val() && nTurn === 3){
					$("#input").val(inputBox+" "+$('#fsch_lst_input').val());
					nTurn = 10;
					if(sOp === 'LIKE') sQuery_back = sQuery_back + sOp + " '%" + $('#fsch_lst_input').val() +"%'";
					else sQuery_back = sQuery_back + sOp + " '" + $('#fsch_lst_input').val() +"'";
				}
				if(nTurn === 10 || nTurn === 100){
					nTurn = 1000;
					$('#FL span').html(sQuery_head+" "+sQuery_back);
					data = {query : sQuery_send+" "+sQuery_back};
					data.G2_ID_MAP = aFID;
					data.tableName = tableNM;
					data.count = true;
					$.ajax({
						type: 'get',
						dataType: 'json',
						url: '/register/attResultXml.do',
						data: data,
						success: function(data) {
							$("#FR").html(/*Number(data.attResult[0].count).toLocaleString('en').split(".")[0]*/data.attResult[0].COUNT+" 건 ");
						},
						error: function(xhr, status, error) {
							alert(status);
							alert(error);
						}
					});
				}else alert("검색식이 부적절 합니다.");
			}else if($(this).text() === '초기화'){
				$('#FL span').html("");
				$("#FR").html(" 건 ");
				$("#input").val("");
				$('#fsch_lst_input').remove();
				sQuery_head = "";
				sQuery_back = "";
				sQuery_send = "";
			}else{
				/*var tableNM="";
				if(nTurn === 1000){
					tableNM = sQuery_head.substring(0, sQuery_head.indexOf("WHERE"));
					tableNM = tableNM.substring(tableNM.indexOf("FROM")+5, tableNM.length-1);*/
				if(nTurn === 1000){
					//$('#popup_search_facility_close').trigger('click');
					fn_close_facility();
					data2 = {query : sQuery_send+" "+sQuery_back};
					data2.G2_ID_MAP = aFID;
					data2.tableName = tableNM;
					data2.count = false;
					$.ajax({
						type: 'post',
						dataType: 'json',
						url: '/register/attResultXml.do',
						data: data2,
						success: function(data) {
							fn_call_register(data,"searchAtt="+tableNM);
						},
						error: function(xhr, status, error) {
							alert(status);
							alert(error);
						}
					});
				}else alert("조회된 결과값이 없습니다.");
			}
		});

		$('#imgOpenCondition').click(function(e){
			if(!$('#tab_keyword').attr('class').contains('Tab2_selected')) {
				if($('#tab_bldg').attr('class').contains('Tab2_selected'))
					$('#div_bldg').show();
				else if($('#tab_juso').attr('class').contains('Tab2_selected'))
					$('#div_juso').show();
				else if($('#tab_newjuso').attr('class').contains('Tab2_selected'))
					$('#div_newjuso').show();

				fn_hide_resultPanel();
			} else if($('#tab_keyword').attr('class').contains('Tab2_selected')){
				if($("#divSearchResult").is(":visible")) {
					$("#divSearchResult").hide();
					$('#divSearchBtn').show();
				} else {
					$("#divSearchResult").show();
					$('#divSearchBtn').hide();
				}
			}


		});

		//새주소 검색시 서브메뉴 도로명or건물명 체크 - Yu_mk
		$("#radioArea").click(function(e){
			var bd = $("#bd_newjuso").is(":checked");
			var rn = $("#rn_newjuso").is(":checked");
			if(rn == true){
				$("#bd_form").hide();
				$("#rn_form").show();
			}
			if(bd == true){
				$("#rn_form").hide();
				$("#bd_form").show();
			}
		});

		// 검색 조건 1차 셀렉트 박스 변경시 2차 셀렉트 재배치
		$( '#HJD_CD' ).change(function() {
			//dynamicSelect( <2차 셀렉트 채울 데이터 XML 처리URL>, <2차 셀렉트 박스 ID>, <제약조건> )
			dynamicSelect( 'bjdCdeXml.do', 'BJD_CDE', $('#HJD_CD').val(), '' );
		});

		$( '#HJD_CD2' ).change(function() {
			dynamicSelect( 'bjdCdeXml.do', 'BJD_CDE2', $('#HJD_CD2').val(), '' );
		});

		$( '#HJD_CD3' ).change(function() {
			dynamicSelect( 'bjdCdeXml.do', 'BJD_CDE3', $('#HJD_CD3').val(), '' );
		});

		$( '#INIT_CDE' ).change(function() {	// 도로명 초성 검색 - Yu_mk
			dynamicSelect( 'nrdNamXml.do', 'RN', $('#INIT_CDE').val(), '' );
		});

		$('#btn_search').click(function(e){

			if($('#div_bldg').is(':visible') &&(!$('#txt_bldg').val())){
				COMMON.showMessage('검색오류 & 검색 조건(건물명)을 설정하여 주세요.');
				return;
			}
			if($('#div_juso').is(':visible') &&(!$('#HJD_CD2').val() || !$('#BJD_CDE2').val() || !$('#txt_bonbun').val())){
				COMMON.showMessage('검색오류 & 검색 조건(구/동/본번-부번)을 설정하여 주세요.');
				return;
			}
			if($('#div_newjuso').is(':visible') && $("#rn_newjuso").is(":checked") && (!$('#INIT_CDE').val() || !$('#RN').val() || !$('#txt_Nbonbun').val())){
				COMMON.showMessage('검색오류 & 검색 조건(도로명칭/본번-부번)을 설정하여 주세요.');
				return;
			}
			if($('#div_newjuso').is(':visible') && $("#bd_newjuso").is(":checked") && (!$('#HJD_CD3').val() || !$('#txt_bdnm').val())){
				COMMON.showMessage('검색오류 & 검색 조건(구/건물명)을 설정하여 주세요.');
				return;
			}

			if($('#div_keyword').is(':visible') &&(!$('#txt_keyword').val())){
				COMMON.showMessage('검색오류 & 검색어를 입력하여 주세요.');
				return;
			}

			var oSearchParam = {};
			var sSearchURL = '';

			if($('#div_bldg').is(':visible') &&  $('#divSearchBtn').is(':visible')){
				$('#div_bldg').hide();
				fn_show_resultPanel();

				oSearchParam.dong=$('#BJD_CDE').val();
				oSearchParam.bldg=$('#txt_bldg').val();
				sSearchURL = '/getSearchPositionBLDG.do';
			}
			else if($('#div_juso').is(':visible') &&  $('#divSearchBtn').is(':visible')){
				$('#div_juso').hide();
				fn_show_resultPanel();

				oSearchParam.dong=$('#BJD_CDE2').val();
				oSearchParam.san=$("#chk_san").is(":checked");
				oSearchParam.bonbun=$('#txt_bonbun').val();
				oSearchParam.boobun=$('#txt_boobun').val();

				if(oSearchParam.san == true) oSearchParam.san = 2;	//토지 구분 체크시
				else oSearchParam.san = 1;

				sSearchURL = '/getSearchPositionJUSO.do';
			}
			else if($('#div_newjuso').is(':visible') &&  $('#divSearchBtn').is(':visible')){	// 새주소 검색 - Yu_mk
				$('#div_newjuso').hide();
				fn_show_resultPanel();

				if($("#bd_newjuso").is(":checked") == true){
					oSearchParam.gu=$('#HJD_CDE3').val();
					oSearchParam.dong=$('#BJD_CDE3').val();
					oSearchParam.bldg=$('#txt_bdnm').val();
				}
				else{
					oSearchParam.rncd=$('#RN').val();
					oSearchParam.bonbun=$('#txt_Nbonbun').val();
					oSearchParam.boobun=$('#txt_Nboobun').val();
				}
				sSearchURL = '/getSearchPositionNEWJUSO.do';
			}

			else if($('#div_keyword').is(':visible') &&  $('#divSearchBtn').is(':visible')){
				var keyword = $('#txt_keyword').val().replace(/^\s+|\s+$/g,'');
				fn_start_searchKeyword(keyword)
			}

			if(sSearchURL != ''){
				$.ajax({
					type: 'post',
					dataType: 'json',
					data: oSearchParam,
					url: sSearchURL,
					success: function(_oRes) {
						var nResultCnt = _oRes.resList.length;
						var sHtml ='';

						$('#divSearchResult ul')[0].innerText = '';
						$('#searchResultCnt')[0].innerText = nResultCnt;

						if(nResultCnt >0){
							if(_oRes.resList[0].BLD_NAM){
								for(var i=0;i<nResultCnt;i++){
									sHtml += "<li><a href='#' onclick=\"fn_move_position('BML_BLDG_AS', '" + _oRes.resList[i].FID + "',"+i+")\" id='" + _oRes.resList[i].BLD_NAM + "' class='depth2'>" + _oRes.resList[i].BLD_NAM + "</a></li>";
								}
							}
							else if(_oRes.resList[0].JIBUN){
								for(var i=0;i<nResultCnt;i++){
									sHtml += "<li><a href='#' onclick=\"fn_move_position('LP_PA_CBND', '" + _oRes.resList[i].FID + "',"+i+")\" id='" + _oRes.resList[i].JIBUN + "' class='depth2'>" + _oRes.resList[i].BJD_NAM +" " + _oRes.resList[i].JIBUN + "</a></li>";
								}
							}
							else if(_oRes.resList[0].BULD_MNNM){
								if(_oRes.resList[0].SIG_CD){
									for(var i=0;i<nResultCnt;i++){
										sHtml += "<li><a href='#' onclick=\"fn_move_position('TL_SPBD_BULD', '" + _oRes.resList[i].FID + "',"+i+")\" id='" + _oRes.resList[i].SIG_CD + "' class='depth2'>" + _oRes.resList[i].BULD_MNNM + " - " + _oRes.resList[i].BULD_SLNO + "  " + _oRes.resList[i].BULD_NM + "  " + _oRes.resList[i].BULD_NM_DC + "</a></li>";
									}
								}
								else{
									for(var i=0;i<nResultCnt;i++){
										sHtml += "<li><a href='#' onclick=\"fn_move_position('TL_SPBD_BULD', '" + _oRes.resList[i].FID + "',"+i+")\" id='" + _oRes.resList[i].BULD_MNNM + "' class='depth2'>" + _oRes.resList[i].BULD_MNNM + " - " + _oRes.resList[i].BULD_SLNO + "  " + _oRes.resList[i].BULD_NM + "  " + _oRes.resList[i].BULD_NM_DC + "</a></li>";
									}
								}
							}
							else{
								sHtml += '<li>검색결과가 존재하지 않습니다.</li>';
							}
							$('#divSearchResult ul').append(sHtml);
						}
					},
					error: function(xhr, status, error) {
						COMMON.showMessage('위치검색 오류 & 검색에 실패하였습니다.');
					}
				});
			}
		});
	};
	
	var fn_close_facility = function(){
		$('#searchFacilityPane').hide();
		$('#searchFacilityPane .fcont1').hide();
		$('#searchFacilityPane .fcont2').hide();
		$('.facilityBx').css({"width":"260px"});
		$(".fIcoM1").parent().removeClass("active");
		$(".fIcoM2").parent().removeClass("active");
		$("#fsch_lst").find('li').remove();
		$("#fsch_lst_val").find('li').remove();
		$('#fsch_lst_input').remove();
		$('#FL span').html("");
		$("#FR").html(" 건 ");
		$("#input").val("");
		$('#searchFacilityPane').css("width", "260px");
		$("input[type=checkbox]").prop("checked",false);
	}
	
	// 시설물검색 탭 전환시 키워드 검색 제외 버튼 숨기기
	$(".PTab li").on("click",function(){
		if($(this).find("a").attr("id") !== "tab_keyword") {
			fn_hide_keywordButton();
		}
	});
	// 시설물검색 div 안보일때 마커 삭제
	$('#searchLocPane').bind('display:none', function(){
		fn_remove_marker();
	});

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 위치검색 창의 메뉴 탭 변경 및 메뉴 변경시 각 컨트롤 초기화
	* @author 윤은희(2015.12.29)
	*/
	fn_handle_searchPositionMenu = function(){
		$('#Position .PTab li a').click(function(){
			$('#Position .PTab li a').each(function() {
				$(this).removeClass('Tab2_selected');
				if($(this).attr('class') == '')
					$(this).addClass('Tab2');
				$('#'+$(this).attr('id').replace('tab', 'div')).hide();

				// all of the search controls be cleared
				fn_clear_allSearchControls();
				fn_hide_resultPanel();
			});
			$(this).addClass('Tab2_selected');
			$('#'+$(this).attr('id').replace('tab', 'div')).show();
		});
	};
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색 창에 존재하는 모든 Selectbox와 TextBox 초기화
	* @author 윤은희(2015.12.29)
	*/
	fn_clear_allSearchControls = function(){
		$('#Position select').each(function() {
			$(this).val('');
			if($(this).attr('id') == 'BJD_CDE' || $(this).attr('id') == 'BJD_CDE2' || $(this).attr('id') == 'BJD_CDE3')
				$(this).text('');
		});
		$('#Position input').each(function() {
			$(this).val('');
		});
	};

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색 결과 패널 감추기
	* @author 윤은희(2015.12.29)
	*/
	fn_hide_resultPanel = function(){
		$('#divSearchBtn').show();
		$('#divSearchResultCnt').hide();
		$('#divSearchResult').hide();
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색 결과 패널 보이기
	* @author 윤은희(2015.12.29)
	*/
	fn_show_resultPanel = function(){
		$('#divSearchBtn').hide();
		$('#divSearchResultCnt').show();
		$('#divSearchResult').show();
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 키워드 검색 결과 버튼 보이기
	* @author 이상호(2016.07.12)
	*/
	fn_show_keywordButton = function(){
		$("#divPreSearchBtn").show();
		$("#divNextSearchBtn").show();
		$("#divPageNum").show();
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 키워드 검색 결과 버튼 숨기기
	* @author 이상호(2016.07.12)
	*/
	fn_hide_keywordButton = function(){
		$("#divPreSearchBtn").hide();
		$("#divNextSearchBtn").hide();
		$("#divPageNum").hide();
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 레이어와 해당 레이어의 id(g2_id)를 이용하여 검색된 feature를 지도상에 표시하고 해당 위치로 이동한다.
	* @author 윤은희(2015.09.04)
	* @param {String} _sLayer - 레이어 영문명
	* @param {String} _sG2_id - feature id
	*/
	fn_move_position = function (_sLayer, _sG2_id, index){

		NUTs.WFS.getFeatureById(CONFIG.fn_get_wfsServiceUrl(), {
				prefix : CONFIG.fn_get_dataHouseName(),
				tables : [_sLayer],
				values : [_sG2_id]
			},
			function(_oRes) {

				if(_oRes && _oRes.data && _oRes.data.length > 0) {
					editor.searchLayer.removeAllFeatures();

					editor.searchLayer.addFeatures(_oRes.data[0].results[0].feature);
					map.zoomToFeature(_oRes.data[0].results[0].feature);
					
				}
				else {
					COMMON.showMessage('위치이동 오류 & 해당 위치로 이동할 수 없습니다.');
				}
		});
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 클릭한 위치의 시설물을 검색하고 검색결과를 지도와 특정 HTML element에 표출한다.
	* @author 최재훈(2015.09.04)
	* @param {Object} _oRes - 레이어(table)명
	*/
	fn_search_point = function (_oRes){

		if(_oRes && _oRes.data && _oRes.data.length > 0) {
			var oResults = _oRes.data[0].results[0];
			if(oResults) {
				editor.editLayer.removeAllFeatures();

				//검색결과 화면표출
				MAP_EDITOR.fn_add_featureBySearchResult(oResults.feature);

				if(editor.copyMode){ //속성복제
					editor.copiedField = MAP_EDITOR.fn_get_jsonPropertyByProp(oResults);
				}
				//console.log('fn_search_point');
				$('#attrViewer').dialog({
					width : 530,
					height : 500,
					zIndex:9999
				});

				//복제된 데이터 이용 treeview 구성
				MAP_EDITOR.fn_create_searchList($('#searchListTree'),$('#searchContent'),_oRes);

				// 공통 대장 사용방식으로 변경함 => (순환참조 문제로 _oRes를 stringfy해서 넘길수 없어서 아래와 같이 조회결과를 담도록 Obj를 새로 생성하여 대장창으로 넘김) - ehyun.
				editor.oSearchResult = _oRes;

				$(".ui-dialog").css("z-index","9999");
			}
			else {
				COMMON.showMessage('검색결과 & 선택하신 위치에 데이터가 존재하지않습니다');
			}

		}
		else {
			COMMON.showMessage('검색결과 & 선택하신 위치에 데이터가 존재하지않습니다');
		}
	}
	
	var fn_start_searchKeyword = function(_sKeyword) {
		/*var searchCK = fn_findsearch_jusoCK();
		if(searchCK != "") {
			COMMON.showMessage(searchCK);
			return;
		}*/
		if(!$("#searchLocPane").is(":visible")) {
			$("#searchLocPane").show();
			$("#tab_keyword").trigger("click");
			$("#txt_keyword").val(_sKeyword);
		}
		fn_show_resultPanel();
		fn_show_keywordButton();
		fn_search_keyword(_sKeyword);
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 다음 API를 이용한 키워드로 장소 검사
	* @author 이상호(2016.02.18)
	* @param {String} _sKeyword - 검색어
	*/
	var fn_search_keyword = function (_sKeyword){
		var oPlaces = new daum.maps.services.Places();
		var oOption = {};
		
		var serviceExtent = CONFIG.fn_get_getMapInfo().serviceExtent;
		var oSwLatLng = new OpenLayers.LonLat(serviceExtent.left, serviceExtent.bottom),
			oNeLatLng = new OpenLayers.LonLat(serviceExtent.right, serviceExtent.top);
		
		var sDaumProjection = MAP.fn_get_daumMap().projection.projCode,
			sMapProjection = map.getProjection();
		
		if(sMapProjection != sDaumProjection) {
			oSwLatLng.transform(sMapProjection, sDaumProjection);
			oNeLatLng.transform(sMapProjection, sDaumProjection);
		}
		
		var oSwDaumLatLng = new daum.maps.LatLng(oSwLatLng.lat, oSwLatLng.lon),
			oNeDaumLatLng = new daum.maps.LatLng(oNeLatLng.lat, oNeLatLng.lon);

		var oServiceDaumBounds = new daum.maps.LatLngBounds(oSwDaumLatLng, oNeDaumLatLng);
		
		oOption.bounds = oServiceDaumBounds;
		oPlaces.keywordSearch(_sKeyword,fn_search_keywordCallback,oOption);
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 다음 API를 검색의 콜백함수
	* @author 이상호(2016.02.18)
	* @param {Object} _oStatus - 결과 존재유무
	* @param {Array} _aData - 결과 배열
	* @param {Object} _oPagination - Pagination 객체
	*/
	var fn_search_keywordCallback = function (_oStatus, _aData, _oPagination){
		var oPlaceData = [];
		fn_remove_marker();
		
		if (_oStatus === daum.maps.services.Status.OK) {
			$("#btn_preSearch").on("click",function(){
				if(_oPagination.hasPrevPage){
					_oPagination.prevPage();
					fn_show_resultPanel();
				}
			});
			
			$("#btn_nextSearch").on("click",function(){
				if(_oPagination.hasNextPage){
					_oPagination.nextPage();
					fn_show_resultPanel();
				}
			});
			
			for (var i = 0; i < _aData.places.length; i++) {
				oPlaceData.push(_aData.places[i]);
	        }
			$("#divPageNum").text(_oPagination.current+" / "+_oPagination.last);
		}
		var nResultCnt = oPlaceData.length;
		var sHtml = '';
		var aHtml = [];
		$('#divSearchResult ul')[0].innerText = '';
		$('#searchResultCnt')[0].innerText = nResultCnt;

		if(nResultCnt >0){
			for (var i=0; i<nResultCnt; i++) {
				var nlatitude = oPlaceData[i].latitude,
					nlongitude = oPlaceData[i].longitude;
				var oPosition = new daum.maps.LatLng(nlatitude, nlongitude);
				var nMarknum = i+1;
				aHtml.push("<li><a href='#' onclick=\"SEARCH.fn_move_daumPosition("+nlatitude+","+nlongitude+")\" id='" + oPlaceData[i].id+ "' class='depth2'>"+ nMarknum +". " + oPlaceData[i].newAddress +" / " +oPlaceData[i].title + "</a></li>");
				fn_add_marker(oPosition,i);
	        }
		}
		else{
			aHtml.push('<li>검색결과가 존재하지 않습니다.</li>');
		}
		$('#divSearchResult ul').append(aHtml.join(''));
	};

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 다음 키워드 API를 이용한 장소 이동
	* @author 이상호(2016.02.25)
	* @param {String} _sLat - daumMap의 위도 좌표
	* @param {String} _sLng - daumMap의 경도 좌표
	*/
	var fn_move_daumPosition = function (_sLat, _sLng){
		var oLatLng = new OpenLayers.LonLat(_sLng, _sLat);
		var oTrans_sLatLng = oLatLng.transform(MAP.fn_get_daumMap().projection.projCode, map.getProjection());
		var oDaumMap = MAP.fn_get_daumMap();

		map.moveTo(oTrans_sLatLng, map.zoom, null);
		oDaumMap.setCenter(new daum.maps.LatLng(_sLat, _sLng));
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 다음 지도 마커 전부 삭제
	* @author 이상호(2016.07.12)
	*/
	var fn_remove_marker = function() {
		 for ( var i = 0; i < daumMakers.length; i++ ) {
			 daumMakers[i].setMap(null);
		    }   
		 daumMakers = [];
	}
	
	/**
	* 다음 검색 마커 배열
	* @member {Array} daumMakers
	*/
	var daumMakers = [];
	
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 공간 검색을 실행하는 함수
	* @author 이상호(2016.07.12)
	* @param {Object} _oPosition - 다음 API의 좌표 객체 daum.maps.LatLng
	* @param {Number} _nIndex - 순서 표기를 위한 숫자 인덱스
	* @returns {Object} marker - 다음 API의 마커 객체 daum.maps.Marker
	*/
	var fn_add_marker = function(_oPosition,_nIndex){
		var imageSrc = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new daum.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new daum.maps.Point(0, (_nIndex*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new daum.maps.Marker({
            position: _oPosition, // 마커의 위치
            image: markerImage 
        });
		var daumMap = MAP.fn_get_daumMap();
	    marker.setMap(daumMap.map); // 지도 위에 마커를 표출합니다
	    daumMakers.push(marker);  // 배열에 생성된 마커를 추가합니다

	    return marker;
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 공간 검색을 요소를 get하는 함수
	* @author 이상호(2016.08.18)
	* @reurn {Object} oSearchCondition - {searchArea,searchMethod,searchLayer}
	*/
	var fn_get_searchCondition = function() {
		return fn_get_searchSpaceLayer().searchCondition;
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 공간 검색을 요소를 set하는 함수
	* @author 이상호(2016.08.18)
	* @param {String} _sSearchArea - 검색영역
	* @param {String} _sSearchMethod - 검색방법
	* @param {Array} _aSearchLayer - 검색할 시설물 배열
	*/
	var fn_set_searchCondition = function(_sSearchArea,_sSearchMethod,_aSearchLayer) {
		var oSearchSpaceVectorLayer = fn_get_searchSpaceLayer();
		oSearchSpaceVectorLayer.searchCondition.searchArea = _sSearchArea;
		oSearchSpaceVectorLayer.searchCondition.searchMethod = _sSearchMethod;
		oSearchSpaceVectorLayer.searchCondition.searchLayer = _aSearchLayer;
	}
	
	var fn_search_featuresByPoint = function(_oGeometry,_fCallbackFucntion,_oCallbackArg) {
		var oSearchCondition = fn_get_searchCondition();
		var aSearchTypeName =  oSearchCondition.searchLayer;
		var sSearchMethod = oSearchCondition.searchMethod;
		
		if(sSearchMethod != 'Boundary') {
			NUTs.WFS.getFeatureByDWithin(CONFIG.fn_get_wfsServiceUrl(),{
				prefix: CONFIG.fn_get_dataHouseName(),
	            tables: aSearchTypeName,
	            values: _oGeometry,
	            distance: '2'
			}, function(_oRes){
				if(typeof _fCallbackFucntion == 'function')
					_fCallbackFucntion(_oRes,_oCallbackArg);
			});
		} else {
			COMMON.showMessage("검색 오류&검색 결과가 없습니다..");
		}
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 공간 검색을 실행하는 함수
	* @author 이상호(2016.03.21)
	* @param {Array} _oGeometry - 검색영역의 Geometry 데이터
	* @param {Function} _fCallbackFucntion - 공간연산후 callback 함수
	* @param {Object} _oCallbackArg - callback 함수의 추가 파라미터
	*/
	var fn_search_featuresByUserArea = function(_oGeometry,_fCallbackFucntion,_oCallbackArg) {
		var oSearchCondition = fn_get_searchCondition();
		var aSearchTypeName =  oSearchCondition.searchLayer;
		var sSearchMethod = oSearchCondition.searchMethod;
		var oGeometry = _oGeometry;
		
		if(!(_oGeometry instanceof OpenLayers.Geometry)) {

			var oTmpPosList 	= editor.getPosListByGeometry(_oGeometry);
			var sGeomType  		= editor.getGeomType(_oGeometry);
			
			var oTmpGInnerFeature	= editor.makeFeatureByPosList(sGeomType. oTmpPosList, '');
			oGeometry = oTmpGInnerFeature.geometry;

			//위에서 생성한 oGeometry를 _oGeometry 대신 사용..
		} 
		
		switch(sSearchMethod) {
		case 'Intersects' :
			NUTs.WFS.getFeatureByGeometry(CONFIG.fn_get_wfsServiceUrl(),{
	            prefix: CONFIG.fn_get_dataHouseName(),
	            tables: aSearchTypeName,
	            values: oGeometry
			}, function(_oRes){
				if(typeof _fCallbackFucntion == 'function')
					_fCallbackFucntion(_oRes,_oCallbackArg);
			});
			break;
		case 'Within' :
			NUTs.WFS.getFeatureByWithin(CONFIG.fn_get_wfsServiceUrl(),{
				prefix: CONFIG.fn_get_dataHouseName(),
				tables: aSearchTypeName,
				values: oGeometry
			}, function(_oRes){
				if(typeof _fCallbackFucntion == 'function')
					_fCallbackFucntion(_oRes,_oCallbackArg);
			});
			break;
		case 'Boundary' :
			var oTempIntersects;
			var oTempWithin;
			NUTs.WFS.getFeatureByGeometry(CONFIG.fn_get_wfsServiceUrl(),{
	            prefix: CONFIG.fn_get_dataHouseName(),
	            tables: aSearchTypeName,
	            values: oGeometry
			}, function(_oResIntersects){
				oTempIntersects = _oResIntersects;
				NUTs.WFS.getFeatureByWithin(CONFIG.fn_get_wfsServiceUrl(),{
					prefix: CONFIG.fn_get_dataHouseName(),
					tables: aSearchTypeName,
					values: oGeometry
				}, function(_oResWithin){
					oTempWithin = _oResWithin;
					var temp = fn_remove_wfsData(oTempIntersects,oTempWithin);
					if(typeof _fCallbackFucntion == 'function')
						_fCallbackFucntion(temp,_oCallbackArg);
				});
			});
			break;
		}
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 경계 영역에 데이터 검색을위한 intersects 공간 연산데이터에서 within 공간 연산데이터를 제거하는 함수
	* @author 이상호(2016.03.24)
	* @param {Object} _oIntersects - intersects 공간 연산후 데이터
	* @param {Object} _oWithin - within 공간 연산후 데이터
	* @returns {Object} oTemp - intersects 공간 연산데이터에서 within 공간 연산데이터 뺀 나머지 공간 데이터
	*/
	var fn_remove_wfsData = function(_oIntersects,_oWithin) {
		var nIntersectsLength = _oIntersects.data.length;
		var nWithinLength = _oWithin.data.length;
		var oIntersectsData , oWithinData;
		var oTemp={};
		$.extend(oTemp,_oIntersects);

		if(nIntersectsLength !== 0 ) {
			for(var i=0;i<nIntersectsLength;i++) {
				oIntersectsData = _oIntersects.data[i].results;
				for(var j=0;j<nWithinLength;j++) {
					oWithinData = _oWithin.data[j].results;
					for(var k=0;k<oWithinData.length;k++) {
						for(var l=0;l<oIntersectsData.length;l++) {
							if(oIntersectsData[l].g2id == oWithinData[k].g2id) {
								oTemp.data[i].results.splice(l,1);
							}
						}
					}
				}
				if(oTemp.data[i].results.length === 0) {
					oTemp.data.splice(i,1);
					nIntersectsLength -= 1;
					i -= 1;
				}
			}
		}
		return oTemp;
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 시설물검색-> 공간검색-> 검색 처리 함수
	* @author 이상호(2016.03.17)
	*/
	var fn_search_space = function() {
		var oSearchSpaceVectorLayer = fn_get_searchSpaceLayer();
		map.addLayer(oSearchSpaceVectorLayer);
		map.deActiveAllControls();
		var oSearchCondition = fn_get_searchCondition();
		oSearchSpaceVectorLayer.callSpaceSearch = true;
				
		if(oSearchCondition.searchArea === "editSearchAll") {//편집모드이면서 현재영역 검색인 경우
			fn_search_featuresOnWFSLayer(map.getExtent().toGeometry());
			map.activeControls("drag");
		} else if(oSearchCondition.searchArea !== "searchAll") {//편집모드아니면서 현재영역 검색인 경우
			map.activeControls(oSearchCondition.searchArea);
		} else {
			map.cleanMap(editor.aEditLayers);
			fn_search_featuresByUserArea(map.getExtent().toGeometry(),fn_call_register,"searchSpace");
			map.activeControls("drag");
		}
		
	}
	
	var fn_init_editLayerStyle = function(){
		
    	for(var i in editor.editLayer.features){
    		var oFeature 	= editor.editLayer.features[i];
    		var sTblName 	= MAP_EDITOR.fn_get_tblNameByFeature(oFeature);
    		var sG2Id 		= MAP_EDITOR.fn_get_g2idByFeature(oFeature);

    		if(sTblName && sG2Id) {
        		if(editor.editingFeatures[sTblName][sG2Id])//중간저장되어 관리되고있는 feature이면
        			editor.editLayer.drawFeature(oFeature, 'delete');
    		}
    	};
	};
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 대장 호출
	* @author 이상호(2016.04.12)
	* @param {Object} _oRes - 검색 결과값
	* @param {String} _sType - 대장 호출 방식
	*/
	var fn_call_register = function(_oRes,_sType){
		var sLayer,sRegisterNM,sTableNM,sTitle, sUrl, sCallFunctionType = '';
		var nWinHeight = 440;

		if(_sType.indexOf('searchAtt') != -1) { //속성검색일 경우
			sTableNM = _sType.split("=")[1];

			var oRes 	= MAP_EDITOR.fn_get_objFactory().Util.createGData();
			var oResult = MAP_EDITOR.fn_get_objFactory().Util.createGResult(sTableNM);
			var oConvertRes = {};
			
			oRes.data.push(oResult);

			$.extend(oConvertRes, oRes);
			oConvertRes.data[0].results = _oRes.attResult;
			
			_oRes = oConvertRes;
		}

		if($.type(_oRes.data[0]) === 'undefined' || _oRes.data[0].results.length < 1) {
			//map.cleanMap();
			//fn_off_layers();
			COMMON.showMessage("검색 오류&검색 결과가 없습니다.");
		} else {
			sCallFunctionType = _sType;
			if(_sType === "searchSpace") {
				editor.searchLayer.removeAllFeatures();
				var oResData = _oRes.data;
				for (var i = 0, nDataLength = oResData.length ; i < nDataLength ; i++) {
					for(var j = 0, nResultLength = oResData[i].results.length; j < nResultLength; j++) {
						var oResults = oResData[i].results[j];
						fn_add_feature(oResults.feature);
					}
				}
				editor.selectedG2Id =_oRes.data[0].results[0].g2id;

			} 
			if(_sType.split("=")[0] === "searchAtt") {
				sCallFunctionType = "searchAtt";
			}
			
			debugger;
			var oSearchResults = REGISTER.fn_get_searchLayerMap();
			$.extend(oSearchResults,fn_create_searchResultsData(_oRes,_sType));
			oSearchResults.callFunctionType = sCallFunctionType;

			REGISTER.fn_set_searchLayerMap(oSearchResults);

			sRegisterNM = oSearchResults.tables[0];


			if(sRegisterNM === 'WTL_META_PS')
				nWinHeight = 520;

			STYLE.fn_off_defaultLayers();
			
			/*if(!map.getLayerByName(oLayerMap.tables)) //이미 wfs(vector) 레이어로 그리고 있는 경우 중복 처리됨
				fn_on_layers(oLayerMap.tables);*/

			sTitle = $.trim(COMMON.fn_get_EditKorLayerNm(sRegisterNM));
			sUrl = '/register/registerList.do?page=1&rows=50&TABLENAME=' + sRegisterNM;

			//REGISTER.fn_open_nJDSKWindow(sTitle+'관리 대장', sUrl, map.size.w-325, nWinHeight, 'registerOnMap');
			window.parent.REGISTER.fn_open_nJDSKWindow(sTitle+'관리 대장', sUrl, map.size.w-325, nWinHeight, 'registerOnMap');
		}
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description searchPosVectorLayer에 feature을 추가한다
	* @author 이상호(2016.03.17)
	* @param {Object} _oFeature - Feature object
	*/
	var fn_add_feature = function(_oFeature){
		var sFId = MAP_EDITOR.fn_get_fidByFeature(_oFeature);
		var oGInnerFeature = editor.createFeature(_oFeature, sFId);
		editor.addDrawFeature(editor.searchLayer, oGInnerFeature, 'search');

		map.setLayerIndex(editor.searchLayer,map.layers.length-1);
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색 또는 선택된 olFeature 목록을 추출한다.
	* @author 최재훈(2016.07.15)
	* @return {Object}  
	*/
	var fn_get_selectedOlFeatures = function(){
		var aRtnObj = [];
		var oTmpSearchResults = editor.oSearchResult;
		
		if(oTmpSearchResults && oTmpSearchResults.data && oTmpSearchResults.data[0].results){
			
			var oResults = oTmpSearchResults.data[0].results;
			var nResultsLen = oResults.length;
			
			for(var i = 0; i < nResultsLen; i++){ 
				aRtnObj.push(oResults[i].feature)
			}
		}
		
		return aRtnObj;
		
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색 또는 선택된 GFeature 목록을 추출한다.
	* @author 최재훈(2016.07.15)
	* @return {Object}  
	*/
	var fn_get_selectedGFeatures = function(){
		var aRtnObj = [];
		var oTmpSearchResults = editor.oSearchResult;
		
		if(oTmpSearchResults && oTmpSearchResults.data && oTmpSearchResults.data[0].results){
			
			var oResults = oTmpSearchResults.data[0].results;
			var nResultsLen = oResults.length;
			
			for(var i = 0; i < nResultsLen; i++){ 
				aRtnObj.push(oResults[i])
			}
		}
		
		return aRtnObj;
		
	}
	/**
	* @memberof USV.SEARCH
	* @method
	* @description editor.selectedFeatures에 동일한 feature 추가 방지
	* @author 최재훈(2016.07.11)
	* @param {Object} _oFeature - Feature object
	*/
	var fn_check_overlapFeature = function(_oResults, _oFeature){
		var oSelectedFeatures = fn_get_selectedOlFeatures();
		 
		var nFeatureLen = oSelectedFeatures.length;
		
		if(nFeatureLen == 0){
			oSelectedFeatures = _oResults;
			nFeatureLen = oSelectedFeatures.length;
		}
		
		var sFid = MAP_EDITOR.fn_get_fidByFeature(_oFeature);
		
		for(var i = 0; i < nFeatureLen ; i++){
			
			var oSelectedFeature = oSelectedFeatures[i];
			
			if(oSelectedFeature.feature) 
				oSelectedFeature = oSelectedFeature.feature;
			
			if(sFid === MAP_EDITOR.fn_get_fidByFeature(oSelectedFeature)){
				return true;
				break;
			}
		}
	
		return false;
	};
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색결과개체 개체(editor.aSearchTargetLayers)를 초기화 한다.
	* @author 최재훈(2016.07.11)
	* @param {Object} _oFeature - Feature object
	*/
	/*var fn_init_selectedFeatures = function(){
		editor.selectedFeatures = [];
		var aSearchTargetLayers = editor.aSearchTargetLayers;
		
		if(aSearchTargetLayers){
			for(var i=0; i<aSearchTargetLayers.length; i++){
				var oLayer =  aSearchTargetLayers[i];
				if(oLayer.selectedFeatures.length > 0){
					oLayer.selectedFeatures = [];
				}
			}
		}
		
	};*/
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 편집검색의 features 정보를 찾는 함수
	* @author 이상호(2016.04.28)
	* @param {Object} _oGeometry - 사용자의 검색지정 영역의 지리정보
	*/
	var fn_search_featuresOnWFSLayer = function(_oGeometry){
		var sLayer =  COMMON.fn_get_editingLayer();
		var oFeatureLayer = map.getLayerByName(sLayer);
		var sLayerType = COMMON.fn_get_EditLayerType(sLayer).toUpperCase();

		editor.searchLayer.removeAllFeatures();
		//editor.editLayer.removeAllFeatures(); //2016.05.19 -C.J.H.

		editor.initAllEditFeatures();//검색된 feature가 편집대상이 되고 그 외(작업중이었던...) feature는 심볼 초기화 처리

		oFeatureLayer.redraw();

    	var oGData = MAP_EDITOR.fn_get_objFactory().Util.createGData();
    	var oGResult = MAP_EDITOR.fn_get_objFactory().Util.createGResult(sLayer);

    	//검색대상 레이어 GET-SET 
    	var aSearchTargetLayers = editor.aSearchTargetLayers;
    	
    	//이전 검색결과(선택된 feature목록) 초기화 
    	//fn_init_selectedFeatures();
    	editor.oSearchResult = null;

    	for(var nIdx = 0, nLayerLen = aSearchTargetLayers.length ; nIdx < nLayerLen; nIdx++) {
    		
    		var oTargetLayer = aSearchTargetLayers[nIdx];
    		oTargetLayer.selectedFeatures = [];

    		for(var i=0, featuresLen = oTargetLayer.features.length ;i < featuresLen; ++i){
    			var oFeature = oTargetLayer.features[i];
        		
    			if(sLayer === MAP_EDITOR.fn_get_tblNameByFeature(oFeature)){
    				if (_oGeometry.intersects(oFeature.geometry)) {

    					if (!fn_check_overlapFeature(oGResult.results, oFeature)) { //해당 feature가 1번만 추가되도록...체크
    						var sG2Id = MAP_EDITOR.fn_get_g2idByFeature(oFeature);
    						editor.selectedG2Id = sG2Id;

    						oTargetLayer.selectedFeatures.push(oFeature);
    						//editor.editLayer.selectedFeatures.push(oGInnerFeature);


    						var oGInnerFeature = editor.createFeature(oFeature, sLayer.concat('.', sG2Id));
    						var oGFeature = MAP_EDITOR.fn_convert_olFeatureTOoGFeature(oGInnerFeature, sLayer.concat('.', sG2Id), '');
    							
    						if(editor.editingFeatures[sLayer] && editor.editingFeatures[sLayer][sG2Id])
    							oGFeature.fields =  editor.editingFeatures[sLayer][sG2Id].properties;
    						else
    							oGFeature.fields = oFeature.attributes;
    						
    						oGResult.results.push(oGFeature);

    						//editor.addDrawFeature(editor.searchLayer, oGInnerFeature, 'default');    						

    						if(sLayerType !== "POINT")
    							editor.drawBorder(oGInnerFeature)

    						var oGEditFeature = MAP_EDITOR.fn_clone_featureToGInnerFeature(oGInnerFeature);
    						var oGStyleFeature = MAP_EDITOR.fn_clone_featureToGInnerFeature(oGInnerFeature);
    						editor.addDrawFeature(editor.editLayer, oGEditFeature,'select');
    						editor.addUnDrawFeature(editor.styleLayer, oGStyleFeature);
    					}
    				}	
    			}    			
    		}
    	}

    	map.setLayerIndex(editor.searchLayer,map.layers.length-1);
    	
        oGData.data.push(oGResult);		
        editor.oSearchResult = oGData;
		MAP_EDITOR.fn_get_middleEditList(); //편집 중 중단하고 다른 feature 검색 시 초기화 필요.

		if(sLayer === "RDL_STLT_PS" || sLayer === "RDL_TREE_PS")
			fn_search_point(oGData);
		else
			fn_call_register(oGData,"searchEdit");
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description searchResult의 추가되는 data 생성
	* @author 이상호(2016.05.17)
	* @param {Object} _oRes - 검색 결과 object
	* @param {String} _sType - 검색 방식(공간검색, 편집검색 구분)
	* @returns {Object} oLayerMap - 결과 데이터
	*/
	var fn_create_searchResultsData = function(_oRes,_sType){
		var oLayerMap = {
				tables : []
		};
		
		if(_sType === "searchSpace" || _sType === "searchEdit") {
			for(var i=0,len=_oRes.data.length; i<len; i++){
				var tableName = _oRes.data[i].table;
				oLayerMap.tables.push(tableName);
				oLayerMap[tableName] = [];

				for(var j=0,jLen=_oRes.data[i].results.length; j<jLen; j++){
					oLayerMap[_oRes.data[i].table].push(_oRes.data[i].results[j]);
				}
			}
		} else {
			var tableName = _oRes.data[0].table;
			oLayerMap.tables.push(tableName);
			oLayerMap[tableName] = [];
			$.extend(oLayerMap[tableName],_oRes.data[0].results);
		}
		return oLayerMap;
	}

	/**
	* @memberof USV.SEARCH
	* @method
	* @description 검색결과 Object를 한글변환이 될경우 추가해줌
	* @author 이상호(2016.07.29)
	* @param {Object} _oResult - 검색 결과 object
	* @param {Object} _oDomainInfo - 도메인 object
	* @returns {Object} oConvertResult - 결과 Object에 한글 property를 추가한 Object
	*/
	var fn_convert_domainInfo = function(_oResult,_oDomainInfo){
		var oConvertResult = {}, aFields = {};
		//$.extend(true,oConvertResult,_oResult);
		var oDomainInfo = _oDomainInfo;
		
		if(typeof _oResult.feature !== 'undefined') {
			$.extend(true,oConvertResult,_oResult.fields);
			aFields = _oResult.fields;
		} else {
			$.extend(true,oConvertResult,_oResult);
			aFields = _oResult;
		}
		for(var i in aFields){
			var sField = aFields[i];
			if(oDomainInfo && oDomainInfo[i]){
				oConvertResult[i+"_NM"] = oDomainInfo[i][sField];
			}
			else{
				oConvertResult[i+"_NM"] = sField;
			}
			
			if(i.indexOf('YMD') != -1) {
				var year = aFields[i].substr(0,4);
				var month = aFields[i].substr(4,2);
				var day = aFields[i].substr(6,2);
				oConvertResult[i] = year+"-"+month+"-"+day;
			}
		}
		return oConvertResult;
	}
	
	/**
	* @memberof USV.SEARCH
	* @method
	* @description 레이어 도메인 오브젝트 검색
	* @author 이상호(2016.10.26)
	* @param {String} _sLayerNM - 레이어 영어명
	* @returns {Object} domainInfo - 도메인 object
	*/
	var fn_get_domainInfo = function(_sLayerNM) {
		var domainInfo = null ;
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: "/getMapToDomain.do",
			data: {"editLayer":_sLayerNM},
			async: false,
			success: function(data) {
				domainInfo = data.returnDomain;
			},
			error: function(xhr, status, error) {
			}
		});
		
		return domainInfo;
	}
	
	/**
	* @method
	* @description 선택 레이어 전체검색
	* @author 이상호(2016.10.12)
	*/
	var fn_search_total = function() {
		var oGroupId, aLayers;
		var aGroup = layerTool.layerGroups;
		for(var i in aGroup) {
			var oGroup = aGroup[i];
			if(oGroup.name == '상수도') {
				oGroupId = oGroup.id;
			}
		}
		if(oGroupId) {
			aLayers = $("#divLayerTree .group[id=group_"+oGroupId+"] li.layer").not(".jstree-unchecked"); 
		} else {
			aLayers = $("#divLayerTree li.layer").not(".jstree-unchecked");
		}
		var aAllLayerNames = [];
		for(var i=0,len=aLayers.length;i<len;i++) {
			var oLayer = aLayers.eq(i);
			var oNameLayer = STYLE.fn_find_sldNameLayer(oLayer.attr("id").replace("layer_",""));
			aAllLayerNames.push(oNameLayer.featureTypeName);
		}
		fn_set_searchCondition("searchPoint","Intersects",aAllLayerNames);
		fn_search_space();
	}

//------------------------------------------------------------------------------------------------------------------
//## public 메소드
//------------------------------------------------------------------------------------------------------------------
_mod_search.fn_search_point					=	fn_search_point;
_mod_search.fn_call_register				=	fn_call_register;
//_mod_search.fn_init_selectedFeatures		=	fn_init_selectedFeatures;
_mod_search.fn_init_editLayerStyle			=	fn_init_editLayerStyle;
_mod_search.fn_search_featuresByUserArea	=	fn_search_featuresByUserArea;
_mod_search.fn_search_featuresByPoint		=	fn_search_featuresByPoint;
_mod_search.fn_search_keyword				=	fn_search_keyword;
_mod_search.fn_get_searchSpaceLayer			=	fn_get_searchSpaceLayer;
_mod_search.fn_get_searchVectorLayer		=	fn_get_searchVectorLayer;
_mod_search.fn_get_searchCondition			=	fn_get_searchCondition;
_mod_search.fn_set_searchCondition			=	fn_set_searchCondition;
_mod_search.fn_search_space					=	fn_search_space;
_mod_search.fn_search_featuresOnWFSLayer	=	fn_search_featuresOnWFSLayer;
_mod_search.fn_move_daumPosition			=	fn_move_daumPosition;
_mod_search.fn_remove_marker				=	fn_remove_marker;
_mod_search.fn_show_keywordButton			=	fn_show_keywordButton;
_mod_search.fn_get_selectedOlFeatures		=	fn_get_selectedOlFeatures;
_mod_search.fn_get_selectedGFeatures		=	fn_get_selectedGFeatures;
_mod_search.fn_start_searchKeyword			=	fn_start_searchKeyword;
_mod_search.fn_get_domainInfo				=	fn_get_domainInfo;
_mod_search.fn_convert_domainInfo			=	fn_convert_domainInfo;
_mod_search.fn_get_bReScanCheck				=	fn_get_bReScanCheck;
_mod_search.fn_set_bReScanCheck				=	fn_set_bReScanCheck;
_mod_search.fn_close_facility				=	fn_close_facility;
_mod_search.fn_search_total					=	fn_search_total;
_mod_search.fn_add_feature					=	fn_add_feature;
//------------------------------------------------------------------------------------------------------------------

return _mod_search;

}(USV.SEARCH || {}, jQuery));