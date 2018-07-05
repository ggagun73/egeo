<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	/**
	 * @Class Name : EgovDeptManageList.java
	 * @Description : EgovDeptManageList jsp
	 * @Modification Information
	 * @
	 * @  수정일                    수정자                수정내용
	 * @ ---------     --------    ---------------------------
	 * @ 2009.02.01    lee.m.j     최초 생성
	 *
	 *  @author lee.m.j
	 *  @since 2009.03.21
	 *  @version 1.0
	 *  @see
	 *  
	 *  Copyright (C) 2009 by MOPAS  All right reserved.
	 */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script type="text/javascript"
	src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/extLib/jquery/jstree/jquery.jstree.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/extLib/jquery/jstree/lib/jquery.cookie.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/extLib/jquery/jstree/lib/jquery.hotkeys.js'/>"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>서비스 레이어 관리</title>
<script type="text/javaScript" language="javascript" defer="defer">
	$(document).ready(function(e) {
	var aLayerList = JSON.parse('${layers}');
	var aServiceLayerList = JSON.parse('${serviceLayers}');

	var oTagString = "";
	for ( var i in aLayerList) {
		var oLayer = aLayerList[i];
		var oServiceLayer = fn_search_serviceLayer(oLayer.G2_NAME);
		oTagString += '<tr class="resultListHover" id='+oLayer.FID+'>';
		oTagString += '<td>' + (parseInt(i) + 1) + "</td>";
		oTagString += '<td><input type="checkbox" class="checkLayer"/></td>';
		oTagString += '<td id="layerName">' + oLayer.G2_NAME + "</td>";
		oTagString += '<td><input type="checkbox" id="RDLYN" '
				+ fn_check_YN(oServiceLayer.LYR_RDL_USE_YN)
				+ '></td>';
		oTagString += '<td><input type="checkbox" id="WTLYN" '
				+ fn_check_YN(oServiceLayer.LYR_WTL_USE_YN)
				+ '></td>';
		oTagString += '<td><input type="checkbox" id="SWLYN" '
				+ fn_check_YN(oServiceLayer.LYR_SWL_USE_YN)
				+ '></td>';
		oTagString += '<td><input type="checkbox" id="EditYN" '
				+ fn_check_YN(oServiceLayer.LYR_EDIT_YN)
				+ '></td>';
		oTagString += '<td><input type="text" id="FTR_CDE" value='
			+ fn_convert_ftrcde(oServiceLayer.LYR_FTR_CDE)
			+ '></td>';
		oTagString += '<td><input type="number" id="LyrOrder" value='
			+ oServiceLayer.LYR_ORDER
			+ '></td>';
		oTagString += '<td><input type="checkbox" id="OnOffLyr" '
			+ fn_check_YN(oServiceLayer.LYR_ONOFF)
			+ '></td>';
		oTagString += '</tr>';
	}
	/*
	<th>지형지물부호</th>
				<th>레이어 순서</th>
				<th>시작 레이어</th>
	*/

	$(".tblist tbody").append(oTagString);

	function fn_check_YN(_nColumn) {
		switch (parseInt(_nColumn)) {
		case 0:
			return "";
		case 1:
			return "checked";
		}
	}

	function fn_search_serviceLayer(_sLayerName) {
		var returnLayer = {
			SERVICE_YN : 0,
			LYR_RDL_USE_YN : 0,
			LYR_WTL_USE_YN : 0,
			LYR_SWL_USE_YN : 0,
			LYR_EDIT_YN : 0,
			LYR_ID : null
		};
		for ( var i in aServiceLayerList) {
			var oServiceLayer = aServiceLayerList[i];
			if (oServiceLayer.G2_NAME == _sLayerName) {
				returnLayer = oServiceLayer;
				returnLayer.SERVICE_YN = 1;
			}
		}
		return returnLayer;
	}
	
	function fn_convert_spatialType(_sLayerType) {
		switch (_sLayerType) {
		case "101":
			return 1;
		case "112":
			return 2;
		case "121":
			return 3;
		}
	}
	
	function fn_convert_ftrcde (_sFtrcde) {
		var returnString = "";
		if(typeof _sFtrcde != "undefined" && _sFtrcde != null) {
			returnString = _sFtrcde;
		}
		return returnString;
	}
	
	function fn_insert_serviceLayer(_sId) {
		var oLayer;
		var sLayerName = $("tr[id="+_sId+"] td[id=layerName]").text();
		for(var i in aLayerList){
			if(aLayerList[i].G2_NAME == sLayerName) {
				oLayer = aLayerList[i];
			}
		}
		var oLyrInfo = {};
		oLyrInfo.LYR_ENG_NM = oLayer.LYR_ENG_NM;
		oLyrInfo.LYR_KOREAN_NM = oLayer.G2_NAME;
		oLyrInfo.LYR_RDL_USE_YN = $("tr[id="+_sId+"] input[id=RDLYN]").is(":checked") ? 1:0;
		oLyrInfo.LYR_WTL_USE_YN = $("tr[id="+_sId+"] input[id=WTLYN]").is(":checked") ? 1:0;
		oLyrInfo.LYR_SWL_USE_YN = $("tr[id="+_sId+"] input[id=SWLYN]").is(":checked") ? 1:0;
		oLyrInfo.FID = oLayer.FID;
		oLyrInfo.LYR_EDIT_YN = $("tr[id="+_sId+"] input[id=EditYN]").is(":checked") ? 1:0;
		oLyrInfo.LYR_TYPE = fn_convert_spatialType(oLayer.LYR_TYPE);
		oLyrInfo.LYR_FTR_CDE = $("tr[id="+_sId+"] input[id=FTR_CDE]").val();
		oLyrInfo.LYR_ORDER = $("tr[id="+_sId+"] input[id=LyrOrder]").val();
		oLyrInfo.LYR_ONOFF = $("tr[id="+_sId+"] input[id=OnOffLyr]").is(":checked") ? 1:0;
		
		return oLyrInfo;
	}
	
	function fn_update_serviceLayerMap(_sId) {
		var oLayer;
		var sLayerName = $("tr[id="+_sId+"] td[id=layerName]").text();
		for(var i in aLayerList){
			if(aLayerList[i].G2_NAME == sLayerName) {
				oLayer = aLayerList[i];
			}
		}
		var oLyrInfo = {};
		oLyrInfo.LYR_ID = fn_search_serviceLayer(oLayer.G2_NAME).LYR_ID;
		oLyrInfo.LYR_RDL_USE_YN = $("tr[id="+_sId+"] input[id=RDLYN]").is(":checked") ? 1:0;
		oLyrInfo.LYR_WTL_USE_YN = $("tr[id="+_sId+"] input[id=WTLYN]").is(":checked") ? 1:0;
		oLyrInfo.LYR_SWL_USE_YN = $("tr[id="+_sId+"] input[id=SWLYN]").is(":checked") ? 1:0;
		oLyrInfo.LYR_EDIT_YN = $("tr[id="+_sId+"] input[id=EditYN]").is(":checked") ? 1:0;
		
		return oLyrInfo;
	}
	
	$(".saveLayer").on("click",function(){
		if($(".checkLayer:checked").length > 0){
			var updateLayer = [];
			var insertLayer = [];
			var deleteLayer = [];
			var aCheckLayer = $(".checkLayer:checked");
			aCheckLayer.each(function(){
				var oCheckLayer = $(this).closest("tr");
				var oServiceLayer = fn_search_serviceLayer(oCheckLayer.find("td[id=layerName]").text());
				if(oServiceLayer.LYR_ID == null) {
					insertLayer.push(fn_insert_serviceLayer(oCheckLayer.attr('id')));
				} else {
					updateLayer.push(fn_update_serviceLayerMap(oCheckLayer.attr('id')));
				}
			});
			
			$.ajax({
				url : "/admin/layer/saveServiceLayer.do",
				type : 'POST',
				data : {"updateLayer":JSON.stringify(updateLayer),"insertLayer":JSON.stringify(insertLayer)},
				success : function(_oData) {
					alert('저장 되었습니다');
				},
				error : function(_sMsg) {
				}
			});
		} else{
			alert("저장할 서비스 레이어를 선택해주세요");
		}
	});
	
	$("input[name=checkAll]").on('click',function(){
		if($(this).is(":checked")) {
			$(".checkLayer").prop("checked",true);
		} else {
			$(".checkLayer").prop("checked",false);
		}
	});
});
</script>
<style type="text/css">
input[type=text] {width: 45px;}
input[type=number] {width: 25px;}
</style>
</head>
<body>
	<div id="W_900">
		<!-- favorite -->
		<div id="admin">
			<!-- menu -->
			<%@ include file="/common/include/include_admin.jsp"%>
			<!--  menu end -->
			<!-- content start -->
			<form id="frm_manage" name="frm_manage" method="post">
				<div class="admin_content">
					<div class="TitBx">서비스 레이어 관리</div>
					<div class="ContBx">
						<div id="tableDiv">
							<table class="tblist" summary="서비스 레이어 관리">
								<caption>서비스 레이어 관리</caption>
								<thead>
									<tr>
										<th>번호</th>
										<th><input name="checkAll" type="checkbox" title="Check All" onclick=""/></th>
										<th>레이어 이름</th>
										<th>도로 시스템</th>
										<th>상수 시스템</th>
										<th>하수 시스템</th>
										<th>편집 시설물</th>
										<th>지형지물부호</th>
										<th>레이어 순서</th>
										<th>시작 레이어</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
					<div class="TreeBtBx" style="right: 50px; position: absolute;">
						<div class="Btn">
							<a href="#" class="Btn_blue saveLayer">저장</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
