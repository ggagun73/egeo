function fnSaveToJPG() {
	$("#print_progress").center();
	$("#print_progress").show();
	
	var template = new esri.tasks.PrintTemplate();
	template.format = "JPG";
	template.layout = "MAP_ONLY";
	//template.outScale = parseInt(m_MainMap.getScale());
	template.preserveScale = false; //true : scale(default or outScale), false : nonscale
	template.exportOptions = {
		width : $("#map_container").width(),
		height : $("#map_container").height(),
		dpi : 96
	};
	var params = new esri.tasks.PrintParameters();
	params.map = m_MainMap;
	params.template = template;
	
	var printTask = new esri.tasks.PrintTask(urlPrinting);
	printTask.execute(params, function(res) {		
		$("#print_progress").hide();
		alert("지도 이미지 저장이 완료되었습니다.\n");
		window.open(res.url);
	}, function(err) {
		$("#print_progress").hide();
		alert("Failed Save JPG\ncause : " + err);
	});
}
function fnIsScale(obj) {
	if ($(obj).prop("checked"))
		$("#txt_scale").prop("disabled", "");
	else
		$("#txt_scale").prop("disabled", "disabled");
}
function fnSaveToPDF() {
	$("#print_progress").center();
	$("#print_progress").show();
	
	var template = new esri.tasks.PrintTemplate();
	template.format = "PDF";
	//template.layout = "MAP_ONLY";
	if ($("#chk_scale").prop("checked")) {
		template.outScale = $("#txt_scale").val();
		template.preserveScale = true; //true : scale(default or outScale), false : nonscale
	} else {
		template.preserveScale = false; //true : scale(default or outScale), false : nonscale
	}
	//The following information applies only in layout MAP_ONLY
	/*template.exportOptions = {
		width : $("#map_container").width(),
		height : $("#map_container").height(),
		dpi : 96
	};*/
	
	var params = new esri.tasks.PrintParameters();
	params.map = m_MainMap; //argument(0)
	params.template = template;
	
	var vUserInfo = $("#USER_DEPT_M_UPPER").val() + " " + $("#USER_DEPT").val() + " " + $("#USER_NAME").val();
	params.extraParameters = {
		Format : "PDF",  //argument(1)
		Layout_Template : m_LayoutFolder + $("#sel_Template").val() + ".mxd", //argument(2)
		title : $("#txt_Title").val(), //argument(3)
		//scale : ($("#chk_scale").prop("checked")) ? $("#txt_scale").val() : String(parseInt(m_MainMap.getScale())), //argument(4)
		scale : "0", //argument(4) Don't use(Defined In PrintTemplate)
		/*compass : $("#chkCompass").is(":checked") ? "Y" : "N", //argument(5)
		scalebar : $("#chkScalebar").is(":checked") ? "Y" : "N", //argument(6)*/
		compass : "Y", //argument(5)
		scalebar : "Y", //argument(6)
		user_info : vUserInfo //argument(7)
	};
	var gp = new esri.tasks.PrintTask(printToolUrl, {async : true});
	gp.execute(params, printComplete, printError);
}

//Print Tool Service 결과 데이터 호출 성공시 Event
function printComplete(result) {
	alert("출력이 완료되었습니다. PDF 뷰어로 열람 후 출력하시기 바랍니다.");
	fnInsertLogPrint();
	$("#dvSaveToPDF").hide();
	$("#print_progress").hide();
	window.open(result.url);
}
function printError(result) {
	alert("출력에 실패하였습니다. 관리자에게 문의하시기 바랍니다.\n사유 : " + result.error);
	$("#dvSaveToPDF").hide();
	$("#print_progress").hide();
}

//고급인쇄 로그 저장
function fnInsertLogPrint() {
	var params = {
			MAP_SCALE : parseInt(m_MainMap.getScale()),
			MAP_TITLE : $("#txt_Title").val(),
			PRINT_LAYER : fnGetLayerNames(basemap, m_VisibleLayers).join(),
			XMIN : m_MainMap.extent.xmin.toFixed(2),
			YMIN : m_MainMap.extent.xmax.toFixed(2),
			XMAX : m_MainMap.extent.xmax.toFixed(2),
			YMAX : m_MainMap.extent.ymax.toFixed(2),
			LAYOUT : $("#sel_Template").val(),
			PRINT_TYPE : "PDF"
	};
	$.post("/etc/UsvLogPrintInsert.do", params);
}

//대장 위치도 포함 출력
var m_PrintLocationImageUrl;
//설계도면 보기 <패키지명> <테이블명> <OBJECTID>
function cfPrint2(package_id, table_id, object_id, layerName, w, h, scale) {
	parent.getComplexLocation(layerName, [object_id]);	
	
	var tmp = table_id.split("_");
	var sId = tmp[0].toLowerCase();
	
	for(var i=1; i<tmp.length; i++) {
		sId += tmp[i].substring(0,1).toUpperCase() + tmp[i].substring(1).toLowerCase();
	}
	
	//지도 이동보다 실행되는게 빨라서리
	setTimeout(function () {
		var template = new esri.tasks.PrintTemplate();
		template.format = "JPG";
		template.layout = "MAP_ONLY";
		template.outScale = scale;
		template.exportOptions = {
			width : w,
			height : h,
			dpi : 96
		};
		var params = new esri.tasks.PrintParameters();
		params.map = m_MainMap;
		params.template = template;
		
		var printTask = new esri.tasks.PrintTask(urlPrinting);
		printTask.execute(params, function(res) {
			m_PrintLocationImageUrl = res.url;
			
			var w = window.open("/"+package_id+"/"+sId+"Print.do?OBJECTID="+object_id, "PRINT_DJ", "left=0,top=0,width=800,height=800,scrollbars=yes");
			w.focus();
		}, function(err) {
			alert("위치도 생성에 실패하였습니다.");
			var w = window.open("/"+package_id+"/"+sId+"Print.do?OBJECTID="+object_id, "PRINT_DJ", "left=0,top=0,width=800,height=800,scrollbars=yes");
			w.focus();
		});
	}, 1000);
}