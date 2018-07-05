function fnDivShow(divName, isCenter, isInputInit) {
	if (isCenter) $("#" + divName).center();
	$("#" + divName).show();
	if (isInputInit) {
		$("#" + divName).find("input[type='text']:enabled").each(function() {
			$(this).val("");
		});
	}
	$("#" + divName).find("input[type='text']:enabled").first().focus();
	
}
function fnDivHide(divName) {
	$("#" + divName).css("z-index", "0");
	$("#" + divName).hide();
}


/*지도 축척 변경*/
function fnMapSetScale() {
	m_MainMap.setScale($("#txt_Scale").val());
}

function fnExitProcess() {
	if (!confirm("현재 위치와 레이어 환경을 저장하시겠습니까?")) return;
	if (m_MainMap == undefined) return;
		
	var pVisibles = [];

	$.each(m_TocLayers, function(i, data) {
		if ($.inArray(data, m_VisibleLayers) >= 0)
			pVisibles.push(1); //Layer visible
		else
			pVisibles.push(0); //Layer invisible
	});
	
	$.post("/logoutWrite.do", {
		EXTENT : JSON.stringify(m_MainMap.extent.toJson()),
		LAYERS : fnGetLayerNames(basemap, m_TocLayers).join(),
		VISIBLES : pVisibles.join()
	});
	alert("현재 위치와 레이어 정보가 저장되었습니다.");
}

function fnMapDefaultControl() {
	$("img[id^=mapCtrl]").each(function () {
		$(this).attr("toggle", "off");
	});
	$("#mapCtrl1").attr("src", $("#mapCtrl1").attr("overSrc"));
	$("#mapCtrl1").attr("toggle", "on");
}