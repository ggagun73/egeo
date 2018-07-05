function dynamicSelect( function_id, select_object_id, where_param, selected_value, content_id ) {
	if(content_id == 'fcont2'){
		$("#"+select_object_id).find('li').remove(); //데이타 제거  
	}
	else{
		$('.activeWindow').find("."+select_object_id).find('option').remove(); //데이타 제거
		$('.activeWindow').find("."+select_object_id).append("<option value=''></option>");
	}
	
	var data;
	
	// 공통코드를 추출하기 위하여 content_id가 있는지 확인 
	// content_id : table name
	if(content_id && content_id != 'fcont2') {
		data = {
				param : where_param
				,content_id : content_id
				,code_id : select_object_id
		};
	} else if(content_id == 'fcont2' && selected_value != ''){	// 표본 필드값
		data = {
				param : where_param
				, selected_value : selected_value
		};
		if(SEARCH.fn_get_bReScanCheck()) {
			var aSearchData = REGISTER.fn_get_searchLayerMap();
			var aFID = [];
			for(var i in aSearchData[selected_value]) {
				aFID.push(aSearchData[selected_value][i].g2id);
			}
			data.G2_ID_MAP = aFID;
		}
	} else data = "param=" + where_param;
	
	$("#"+select_object_id).empty();
	if(function_id == 'nrdNamXml.do') {
		$.ajax({
			type: "get",
			dataType: "json",
			data: data,
			url: "/common/" + function_id,
			success: function(res) {
				var aCodeArray  = res.jsonData;
				var sHtmlStr = "";
				sHtmlStr += "<option value='ALL'>전체검색</option>"
				
				for(var i in aCodeArray) {
					var oCode = aCodeArray[i];
					sHtmlStr += "<option value='"+oCode.RN_CD+"'>"+oCode.RN+"</option>"
				}
				$("#"+select_object_id).append(sHtmlStr);
			}
		});
	} else {
		$.ajax({
			type: "get",
			dataType: "xml",
			data: data,
			url: "/common/" + function_id,
			success: function(xml) {
				if($(xml).find("code").find("item").length > 0) {
					//loop
					$(xml).find("code").find("item").each(function(idx) {
						var code_value = $(this).find("code_value").text();
						var code_name = $(this).find("code_name").text();
						var code_id = $(this).find("code_id").text();
						
						if(content_id == 'fcont2' && code_name != 'null'){	// 속성고급검색 - Yu_mk
							if(selected_value == ''){
								$("#"+select_object_id).append("<li id='"+code_id+"' value='"+code_value+"'>"+code_name+"</li>");
							}
							else $("#"+select_object_id).append("<li id='"+code_id+"'>"+code_name+"</li>");
						}
						else if(code_name != 'null') {
							if(idx == 0)
								$("#"+select_object_id).append("<option value='ALL'>전체선택</option>");	
							else
								$("#"+select_object_id).append("<option value='"+code_value+"'>"+code_name+"</option>");	
						}
						
						$('.activeWindow').find("."+select_object_id).append("<option value='"+code_value+"'>"+code_name+"</option>");
					});  
				}
				try {
					$('.activeWindow').find("."+select_object_id).val(selected_value);
				} catch(E) {}
			},
			error: function(xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
	}
}