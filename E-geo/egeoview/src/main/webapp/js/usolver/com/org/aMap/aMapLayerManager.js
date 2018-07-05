//레이어 관리창 활성화 및 기본 세팅
function fnOpenLayerManager() {
	fnGetGroupLayers = function() {
		//그룹레이어 관련
		$("#myGroupLyrSelectBox").empty();
		$.ajax({
			type: "get",
			dataType: "json",
			contentType : "application/json; charset=utf-8",
			url: "/etc/etcMapGroupLayersList.do",
			success: function(res) {
				var html = "<option value='no'>============선택===========</option>";
				$.each(res.list, function(i, data) {
					html += "<option value='" + data.GROUP_LAYERS + "'>" + data.GROUP_NAME +"</option>";
				});
				$("#myGroupLyrSelectBox").append(html);
			},
			error: function(xhr, status, error) {
				alert("failed open group layers");
				alert(status);
				alert(error);
			},
			complete: function() {
			}
		});
	};
	fnGetGroupLayers();
	
	$("#dvLayerManager").center();
	$("#dvLayerManager").show();
	$("#legend_btn_folder").attr("src", "/images/map/legend_btn_folder_over.png");
	$("#btn_layerListSave").attr("src", "../images/map/btn_layerListSave.png");

	if ($("#sel_GroupLayer").children().length == 1) {
		var groupLayerIds = [],
		groupLayerNames = [];
		$.grep(m_LayersInfo.layers, function (data, i) {
			if (data.subLayers.length > 0) {
				groupLayerNames.push(data.name);
			}
		});
		groupLayerNames.sort();
		groupLayerIds = fnGetLayerIds(basemap, groupLayerNames);

		$.each(groupLayerIds, function (i, data) {
			$("#sel_GroupLayer").append("<option value='" + data + "'>" + groupLayerNames[i] + "</option>");
		});
	}
	$("#sel_GroupLayer").val("all");

	fnGetGeometryTypeImage = function (id) {
		var img = "";
		switch (m_LayersInfo.layers[id].geometryType) {
		case "esriGeometryPoint":
			img = "<img style='opacity:1;vertical-align: middle;' src='/images/map/icoPoint.gif' border='0' width='17' />";
			break;
		case "esriGeometryPolyline":
			img = "<img style='opacity:1;vertical-align: middle;' src='/images/map/icoPolyline.gif' border='0' width='17' />";
			break;
		case "esriGeometryPolygon":
			img = "<img style='opacity:1;vertical-align: middle;' src='/images/map/icoPolygon.gif' border='0' width='17' />";
			break;
		}
		img += "&nbsp;";
		return img;
	};

	fnBindLayerList = function (selectedGroupLayerId) {
		$("#ulLayerList").empty();
		var layerListIds = [],
		layerListNames = [];

		if (selectedGroupLayerId == 'all') {
			$.each(m_LayersInfo.layers, function (i, data) {
				if (data.subLayers.length == 0) {
					layerListNames.push(data.name);
				}
			});
		} else {
			$.each(m_LayersInfo.layers[selectedGroupLayerId].subLayers, function (i, data) {
				layerListNames.push(data.name);
			});
		}

		layerListNames.sort(); //가나다순 정렬
		layerListIds = fnGetLayerIds(basemap, layerListNames);

		var html = "";
		$.each(layerListIds, function (i, data) {
			var isChecked = "checked='checked'";
			if ($.inArray(data, m_VisibleLayers) < 0) isChecked = "";
			html += "<li id='subLyrLi_" + data + "' class='subLyrLi'>";
			html += "<input id='subLyrCkbox_" + data + "' " + isChecked + " type='checkbox' value='" + data + "' onchange='fnLayerListCheckedEvent(this);'/>";
			html += fnGetGeometryTypeImage(data);
			html += "<label class='layerNameLabel' for='subLyrCkbox_" + data + "'>" + layerListNames[i] + "</label>";
			html += "</li>";
		});
		$("#ulLayerList").append(html);

		$("li.subLyrLi").hover(function () {
			$(this).css("background-color", "rgb(187, 187, 242)");
		}, function () {
			$(this).css("background-color", "");
		});
	};

	fnBindLayerList("all");

	fnInsertNode = function (id, pos) {
		require(["dojo/dom-construct", "dojo/dom", "dojo/on"],
			function (domConstruct, dom, on) {
			var myLayerName = getLayerNM(basemap, id);

			var divMyLayerList = domConstruct.create("div", {
					"id" : "divMyLayerList_" + id,
					"class" : "divMyLayerList"
				});

			var isChecked = "checked='checked'";
			if (!pos && $.inArray(id, m_VisibleLayers) < 0) isChecked = "";
			
			$(divMyLayerList).append("<input id='chkMyLayerList_" + id + "' type='checkbox' " + isChecked + " style='vertical-align:middle' />" + 
					fnGetGeometryTypeImage(id) + 
					"<LABEL class='layerNameLabel' for='chkMyLayerList_" + id + "'>" + myLayerName + "</LABEL>");
			//where
			//true : 위로, false : 아래로
			dndSource.insertNodes(false, [divMyLayerList], pos, null);
		});
	};

	fnLayerListCheckedEvent = function (obj) {
		if (!$(obj).prop("checked")) {
			$("#divMyLayerList_" + $(obj).val()).remove();
			return;
		}
		fnInsertNode($(obj).val(), true);
	};

	$(".divMyLayerList").remove();

	$.each(m_TocLayers, function(i, data) {
		$("#subLyrCkbox_" + data).prop("checked", true);
		fnInsertNode(data, false);
	});	
}

//레이어 관리창 선택후 확인 버튼 클릭 함수
function fnLayerManagerApply() {
	m_TocLayers = [], m_VisibleLayers = [];
	$(".divMyLayerList").each(function () {
		var id = Number($(this).attr("id").replace("divMyLayerList_", ""));
		m_TocLayers.push(id);
		if ($(this).children().first().is(":checked")) m_VisibleLayers.push(id);
	});
	//m_VisibleLayers
	basemap.setVisibleLayers(m_VisibleLayers);

	fnSetLegend();
	$('#dvLayerManager').hide();
}

//그룹레이어 명 저장 설정 on
function fnGroupDivShow() {
	$("#txt_groupname").val(""); //그룹명지우기
	$("#dvGroup").show();
}

//레이어 관리 그룹명 DB에 저장
function fnGroupSave() {
	if ($("#txt_groupname").val() == "") {
		alert("그룹명을 입력하시기 바랍니다.");
		return;
	}
	
	var isDuplicate = false;
	$.each($("#myGroupLyrSelectBox").children(), function() {
		if ($(this).text() == $("#txt_groupname").val()) {
			isDuplicate = true;
			return false;
		}
	});
	
	if (isDuplicate) {
		if (!confirm("같은 이름의 그룹명을 있습니다.\n덮어 씌우시겠습니까?")) return;
	}
	
	var pGroupLayers = [];
	$(".divMyLayerList").each(function () {
		pGroupLayers.push($(this).find("label").text());
	});
	
	$.ajax({
		type: "post",		
		dataType: "json",
		data: {
			GROUP_NAME : $("#txt_groupname").val(),
			GROUP_LAYERS : pGroupLayers.join()
		},
		//contentType : "application/json; charset=utf-8",
		//contentType : "application/x-www-form-urlencoded",
		url: "/etc/etcMapGroupLayersSave.do",
		success: function(data) {
			if (isDuplicate) {
				var index = 999;
				$("#myGroupLyrSelectBox option").each(function(i, data) {
					if ($(data).text() == $("#txt_groupname").val()) {
						index = i;
						return false;
					}
				});
				$("#myGroupLyrSelectBox option:eq(" + index + ")").remove();
			}
			$("#myGroupLyrSelectBox").append("<option value='" + pGroupLayers.join() + "'>" + $("#txt_groupname").val() +"</option>");
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete: function() {
			alert("저장되었습니다.");
			$("#dvGroup").hide();
		}
	});
}

//새로운 목록으로  서브 레이어 목록 체크 및 나의 목록 레이어 세팅
function fnGroupLayersBind() {
	var v = $("#myGroupLyrSelectBox option:selected").val();
	if (v == "no") return;

	$("#sel_GroupLayer").val("all");
	fnBindLayerList("all");
	
	$(".divMyLayerList").remove();

	$.each(fnGetLayerIds(basemap, v.split(",")), function (i, data) {
		$("#subLyrCkbox_" + data).prop("checked", true);
		fnInsertNode(data, false);
	});
}

//그룹레이어 목록 삭제
function fnGroupDelete() {
	var v = $("#myGroupLyrSelectBox option:selected").val();
	var t = $("#myGroupLyrSelectBox option:selected").text();
	if (v == 'no') {
		alert("그룹명을 선택하세요!");
		return;
	}
	if (!confirm("레이어그룹 [" + t + "]를 삭제하시겠습니까?")) return;
	
	$.ajax({
		type: "post",
		dataType: "json",
		data: {
			GROUP_NAME : t,
		},
		url: "/etc/etcMapGroupLayersDelete.do",
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete: function() {
			var index = $("#myGroupLyrSelectBox option").index($("#myGroupLyrSelectBox option:selected"));
			$("#myGroupLyrSelectBox option:eq(" + index + ")").remove();
			$("#myGroupLyrSelectBox").val("no");
			alert("삭제되었습니다.");
		}
	});
}
