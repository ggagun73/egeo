<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/jquery.jstree.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/lib/jquery.cookie.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/lib/jquery.hotkeys.js'/>"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>참조 레이어 관리</title>
<script type="text/javaScript" language="javascript" defer="defer">
$(document).ready(function(e) {
	var aEditList = JSON.parse('${editLayers}');
	var aServiceLayerList = JSON.parse('${serviceLayers}');
	
	var sEditTagString = "";
	for (var i in aEditList) {
		var oLayer = aEditList[i];
		sEditTagString += '<tr class="editLayer" id='+oLayer.LYR_ID+' layerEng='+oLayer.LYR_ENG_NM +'>';
		sEditTagString += '<td id="number">' + (parseInt(i) + 1) + "</td>";
		sEditTagString += '<td id="layerName">' + oLayer.LYR_KOREAN_NM + "</td>";
		sEditTagString += '</tr>';
	}
	
	$("#editLayer .tblist tbody").append(sEditTagString);
	fn_create_reflayerList(aServiceLayerList);
	
	function fn_create_reflayerList(_aServiceLayerList) {
		$("#refLayer .tblist tbody").empty();
		var sServiceTagString = "";
		for (var i in _aServiceLayerList) {
			var oLayer = _aServiceLayerList[i];
			sServiceTagString += '<tr class="refLayer" id='+oLayer.LYR_ID+' layerEng='+oLayer.LYR_ENG_NM +'>';
			sServiceTagString += '<td>' + (parseInt(i) + 1) + "</td>";
			sServiceTagString += '<td><input type="checkbox" class="checkLayer"/></td>';
			sServiceTagString += '<td id="layerName">' + oLayer.G2_NAME + "</td>";
			sServiceTagString += '</tr>';
		}
		$("#refLayer .tblist tbody").append(sServiceTagString);
	}
	
	var aRefLayers;
	$(".editLayer").on("click",function() {
		$(".editLayer").removeClass("selectedLayer");
		$(this).addClass("selectedLayer");
		var sLayerName = $(this).attr("layerEng");
		
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {"layerName":sLayerName},
			url: '/admin/layer/selectRefLayer.do',
			success: function(_data) {
				aRefLayers = _data.refLayers;
				$(".refLayer").find("input[type=checkbox]").prop("checked",false);
				if(aRefLayers.length>0) {
					for(var i in aRefLayers) {
						var oRefLayer = aRefLayers[i];
						$(".refLayer[layerEng="+oRefLayer.REFLYR_ENG_NM+"]").find("input[type=checkbox]").prop("checked",true);
					}
				}
			}
		})
	});
	
	function fn_create_refLayer (_oRefLayer) {
		var oRefLayer = {};
		var oSelectedLayer = $(".selectedLayer");
		oRefLayer.EDITLYR_ENG_NM = oSelectedLayer.attr("layereng");
		oRefLayer.REFLYR_ENG_NM = _oRefLayer.attr("layereng")
		oRefLayer.EDITLYR_KOREAN_NM = oSelectedLayer.find("#layerName").text();
		oRefLayer.REFLYR_KOREAN_NM = _oRefLayer.find("#layerName").text();
		
		return oRefLayer;
	}
	
	$(".saveLayer").on("click",function(){
		if($(".selectedLayer").length > 0 && $(".checkLayer:checked").length > 0){
			var aInsertLayer = [];
			var aDeleteLayer = [];
			var aCheckLayer = [];
			
			var aCheckLayerTag = $(".checkLayer:checked");
			
			for(var i=0,len=aCheckLayerTag.length;i<len;i++) {
				var oCheckLayerTag = aCheckLayerTag.eq(i).closest("tr");
				var oCheckLayer = fn_create_refLayer(oCheckLayerTag);
				aCheckLayer.push(oCheckLayer);
			}
			$.extend(aInsertLayer,aCheckLayer);
			$.extend(aDeleteLayer,aRefLayers);
			for(var i in aRefLayers) {
				var oRefLayer = aRefLayers[i];
				for(var j in aInsertLayer) {
					var oInsertLayer = aInsertLayer[j];
					if(oRefLayer.REFLYR_ENG_NM == oInsertLayer.REFLYR_ENG_NM){
						aInsertLayer.splice(j,1);
					}
				}
			}
			
			for(var i=0,len=aDeleteLayer.length;i<len;i++) {
				var oDeleteLayer = aDeleteLayer[i];
				for(var j in aCheckLayer){
					var oCheckLayer = aCheckLayer[j];
					if(oDeleteLayer.REFLYR_ENG_NM == oCheckLayer.REFLYR_ENG_NM){
						aDeleteLayer.splice(i,1);
						i--;
						len--;
					}
				}
			}
			
			$.ajax({
				url : "/admin/layer/saveRefLayer.do",
				type : 'POST',
				data : {"deleteLayer":JSON.stringify(aDeleteLayer),"insertLayer":JSON.stringify(aInsertLayer)},
				success : function(_oData) {
					$(".selectedLayer").trigger('click');
					alert('저장이 완료 되었습니다');
				},
				error : function(_sMsg) {
				}
			});
		} else if($(".selectedLayer").length > 0 && $(".checkLayer:checked").length == 0)	{
			alert("저장할 참조 레이어를 선택해주세요");
		} else {
			alert("편집할 레이어를 선택해주세요");
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
.selectedLayer {background-color: aliceBlue;}
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
					<div class="TitBx">참조 레이어 관리</div>
					<div class="ContBx" style="overflow: hidden;">
						<div id="editLayer" style="width: 300px; height: 440px; position: absolute; overflow-y: auto">
	                      <table class="tblist" summary="편집 레이어 목록">
						    <caption>편집 레이어 목록</caption>
						    <colgroup>
						        <col width="5%" />
						        <col width="20%" />
						    </colgroup>
		                    <thead>
		                        <tr> 
						  	        <th>번호</th>
						  	        <th>편집 레이어 이름</th>
						        </tr>
		                    </thead>
						    <tbody>
						    </tbody>
					    </table>
		            </div>
		            <div id="refLayer" style="height: 440px; width: 340px; overflow-y: auto; position: relative; margin-left: 315px;">
						<table class="tblist" summary="참조 레이어 관리">
							<caption>참조 레이어 관리</caption>
							<colgroup>
						        <col width="5%" />
						        <col width="5%" />
						        <col width="20%" />
						    </colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th><input name="checkAll" type="checkbox" title="Check All" onclick=""/></th>
									<th>참조 레이어 이름</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					</div>
					<div class="TreeBtBx" style="bottom: 0px; right: 35px;">
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
