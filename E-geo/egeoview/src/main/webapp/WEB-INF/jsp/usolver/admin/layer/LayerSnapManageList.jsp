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
<title>스내핑 레이어 관리</title>
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
	fn_create_snaplayerList(aServiceLayerList);
	
	function fn_create_snaplayerList(_aServiceLayerList) {
		$("#snapLayer .tblist tbody").empty();
		var sServiceTagString = "";
		for (var i in _aServiceLayerList) {
			var oLayer = _aServiceLayerList[i];
			sServiceTagString += '<tr class="snapLayer" id='+oLayer.LYR_ID+' layerEng='+oLayer.LYR_ENG_NM +'>';
			sServiceTagString += '<td>' + (parseInt(i) + 1) + "</td>";
			sServiceTagString += '<td><input type="checkbox" class="checkLayer"/></td>';
			sServiceTagString += '<td id="layerName">' + oLayer.G2_NAME + "</td>";
			sServiceTagString += '<td><input type="checkbox" class="checkEdge"/></td>';
			sServiceTagString += '<td><input type="checkbox" class="checkVertex"/></td>';
			sServiceTagString += '<td><input type="checkbox" class="checkNode"/></td>';
			sServiceTagString += '</tr>';
		}
		$("#snapLayer .tblist tbody").append(sServiceTagString);
	}
	
	$(".editLayer").on("click",function() {
		$(".editLayer").removeClass("selectedLayer");
		$(this).addClass("selectedLayer");
		var sLayerName = $(this).attr("layerEng");
		
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {"layerName":sLayerName},
			url: '/admin/layer/selectSnapLayer.do',
			success: function(_data) {
				aSnapLayers = _data.snapLayers;
				$(".snapLayer").find("input[type=checkbox]").prop("checked",false);
				if(aSnapLayers.length>0) {
					for(var i in aSnapLayers) {
						var oSnapLayer = aSnapLayers[i];
						var oSelectSnapLayer = $(".snapLayer[layerEng="+oSnapLayer.SNAPLYR_ENG_NM+"]");
						oSelectSnapLayer.find("input.checkLayer").prop("checked",true);
						if(oSnapLayer.SNAP_EDGE == '1') {
							oSelectSnapLayer.find("input.checkEdge").prop("checked",true);
						}
						if(oSnapLayer.SNAP_VERTEX == '1') {
							oSelectSnapLayer.find("input.checkVertex").prop("checked",true);
						}
						if(oSnapLayer.SNAP_NODE == '1') {
							oSelectSnapLayer.find("input.checkNode").prop("checked",true);
						}
					}
				}
			}
		})
	});
	
	function fn_create_snapLayer (_oSnapLayer) {
		var oSnapLayer = {};
		var oSelectedLayer = $(".selectedLayer");
		oSnapLayer.EDITLYR_ENG_NM = oSelectedLayer.attr("layereng");
		oSnapLayer.SNAPLYR_ENG_NM = _oSnapLayer.attr("layereng");
		oSnapLayer.SNAP_EDGE = _oSnapLayer.find(".checkEdge").is(":checked") ? "1":"0";
		oSnapLayer.SNAP_VERTEX = _oSnapLayer.find(".checkVertex").is(":checked") ? "1":"0";
		oSnapLayer.SNAP_NODE = _oSnapLayer.find(".checkNode").is(":checked") ? "1":"0";
		
		return oSnapLayer;
	}
	
	$(".saveLayer").on("click",function(){
		if($(".selectedLayer").length > 0 && $(".checkLayer:checked").length > 0) {
			var aCheckLayer = [];
			var aInsertLayer = [];
			var aDeleteLayer = [];
			var aUpdateLayer = [];
			var aSnapLayers;
			var aCheckLayerTag = $(".checkLayer:checked");
			
			for(var i=0,len=aCheckLayerTag.length;i<len;i++) {
				var oCheckLayerTag = aCheckLayerTag.eq(i).closest("tr");
				var oCheckLayer = fn_create_snapLayer(oCheckLayerTag);
				aCheckLayer.push(oCheckLayer);
			}
			
			$.extend(aInsertLayer,aCheckLayer);
			var sLayerName = $(".selectedLayer").attr("layerEng");
			
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data: {"layerName":sLayerName},
				url: '/admin/layer/selectSnapLayer.do',
				async:false,
				success: function(_data) {
					aSnapLayers = _data.snapLayers;
				}
			});
			$.extend(aUpdateLayer,aSnapLayers);
			$.extend(aDeleteLayer,aSnapLayers);
			
			for(var i in aSnapLayers) {
				var oSnapLayer = aSnapLayers[i];
				for(var j in aInsertLayer) {
					var oInsertLayer = aInsertLayer[j];
					if(oSnapLayer.SNAPLYR_ENG_NM == oInsertLayer.SNAPLYR_ENG_NM){
						aInsertLayer.splice(j,1);
					}
				}
			}
			
			for(var i=0,len=aDeleteLayer.length;i<len;i++) {
				var oDeleteLayer = aDeleteLayer[i];
				for(var j in aCheckLayer){
					var oCheckLayer = aCheckLayer[j];
					if(oDeleteLayer.SNAPLYR_ENG_NM == oCheckLayer.SNAPLYR_ENG_NM){
						aDeleteLayer.splice(i,1);
						i--;
						len--;
					}
				}
			}
			
			for(var i=0,len=aUpdateLayer.length;i<len;i++) {
				var oUpdateLayer = aUpdateLayer[i];
				for(var j=0,jlen=aDeleteLayer.length;j<jlen;j++){
					var oDeleteLayer = aDeleteLayer[j];
					if(oDeleteLayer.SNAPLYR_ENG_NM == oUpdateLayer.SNAPLYR_ENG_NM){
						aUpdateLayer.splice(i,1);
						i--;
						len--;
					}
				}
			}
			
			$.ajax({
				url : "/admin/layer/saveSnapLayer.do",
				type : 'POST',
				data : {"deleteLayer":JSON.stringify(aDeleteLayer),"insertLayer":JSON.stringify(aInsertLayer),"updateLayer":JSON.stringify(aUpdateLayer)},
				success : function(_oData) {
					$(".selectedLayer").trigger('click');
					alert('저장이 완료 되었습니다');
				},
				error : function(_sMsg) {
				}
			});
		} else if($(".selectedLayer").length > 0 && $(".checkLayer:checked").length == 0)	{
			alert("저장할 스내핑 레이어를 선택해주세요");
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
					<div class="TitBx">스내핑 레이어 관리</div>
					<div class="ContBx" style="overflow: hidden;">
						<div id="editLayer" style="width: 250px; height: 440px; position: absolute; overflow-y: auto">
	                      <table class="tblist" summary="스내핑 레이어 목록">
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
		            <div id="snapLayer" style="height: 440px; width: 400px; overflow-y: auto; position: relative; margin-left: 260px;">
						<table class="tblist" summary="참조 레이어 관리">
							<caption>스내핑 레이어 관리</caption>
							<colgroup>
						        <col width="5%" />
						        <col width="5%" />
						        <col width="18%" />
						        <col width="8%" />
						        <col width="8%" />
						        <col width="8%" />
						    </colgroup>
							<thead>
								<tr>
									<th>번호</th>
									<th><input name="checkAll" type="checkbox" title="Check All" onclick=""/></th>
									<th>스내핑 레이어 이름</th>
									<th>끝점</th>
									<th>점</th>
									<th>라인</th>
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
