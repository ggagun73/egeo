<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v" />
<head>
<meta http-equiv="X-UA-Compatible" content="IE=5" />
<title>횡단면도 조회</title>

<style>
v\:* { behavior: url(#default#VML); }

@media print {
	.popTit .btnPrint {
		display: none;
	}
}

</style>


<!-- Style -->
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/map/GMap/GMapStyle.css' />" />
<link rel='stylesheet'type='text/css' href="<c:url value='/css/usolver/com/map/GMap/popup.css' />" />
<link rel='stylesheet'type='text/css' href="<c:url value='/css/usolver/com/map/popup02.css' />" />

<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/jquery.jstree.js'/>"></script>

<!-- OpenLayers -->
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.debug.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLyers.extension.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/deprecated.js'/>"></script>

<!-- GMap API -->
<script type="text/javascript" src="<c:url value='/lib/gmap/GMap.debug.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gutil/GError.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gutil/GUtil.js'/>"></script>

<script type="text/javascript">

	function callback(table, g2Id) {
		
		opener.NUTs.WFS.getFeatureByComparison(opener.serviceUrl, {
			prefix : opener.dataHouse,
			tables : [table],
			fields : ["FID"],
			values : [g2Id]
		},function(res){
			$("#attrViewer", opener.document).dialog({
				width : 530,
				height : 500,
				position : { my:"left bottom", at:"left bottom", of:opener}
			});
			opener.fn_view_searchList($("#searchListTree", opener.document),$("#searchContent", opener.document),res);
		});
	};

	$(function() {
		/* opener.GRequest.WFS.getFeatureByComparison(opener.serviceUrl, {
			prefix : opener.dataHouse,
			tables : ["WTL_PIPE_LM"],
			fields : ["FID"],
			values : ["5366"]
		},function(res){
			$("#attrViewer", opener.document).dialog({
				width : 530,
				height : 500,
				position : { my:"left bottom", at:"left bottom", of:opener}
			});
			opener.fn_view_searchList($("#searchListTree", opener.document),$("#searchContent", opener.document),res);
		}); */
		
		opener.map.getControl("acss").res.draw($("#divAcssImg"));
		
		fn_event_position($("#divAcssImg"), opener.map.getControl("acss"));

		//위치확인
		$(".btnPosAcss").click(function() {
			fn_event_position($("#divAcssImg"), opener.map.getControl("acss"));
			return false;
		});
		
		//거리측정
		$(".btnDistAcss").click(function() {
			fn_event_dist($("#divAcssImg"), opener.map.getControl("acss"));
			return false;
		});
		
		//속성조회
		$(".btnAttrAcss").click(function() {
			fn_event_attr($("#divAcssImg"), opener.map.getControl("acss"), callback);
			return false;
		});

		//범례표시
		fn_draw_lengend();

		//출력
		$(".btnPrintAcss").click(function() {
			window.print();
			return false;
		});
	});

	function fn_event_init(element, obj) {
		obj.res.eventDist.move = false;
		$("#eventDistLine", element).hide();
		$("#eventDistStr", element).hide();

		$(element).unbind("mousemove");
		$(".underPoi", element).unbind("click");

		$(".underFac", element).unbind("mouseover");		
		$(".underFac", element).unbind("mouseout");
		$(".underFac", element).unbind("click");
	}

	function fn_event_position(element, obj) {
		fn_event_init(element, obj);
		$(element).bind("mousemove", obj, function(evt) {
			var control = evt.data;
			
			if(evt.clientX >=20 && evt.clientX <= 600) {
				var diffX = (control.res.searchPoint.dist.x * (evt.clientX-20)) / 580;
				var diffY = (control.res.searchPoint.dist.y * (evt.clientX-20)) / 580;
				var lon = parseFloat(control.res.searchPoint.start.x) + parseFloat(diffX * control.res.searchPoint.dist.signX);
				var lat = parseFloat(control.res.searchPoint.start.y) + parseFloat(diffY * control.res.searchPoint.dist.signY);
				var lonlat = new OpenLayers.LonLat(lon, lat);
				control.feature.move(lonlat);	
			}
		});
	};

	function fn_event_dist(element, obj) {
		fn_event_init(element, obj);
		obj.res.eventDist.drawOffset.x = $(element).position().left + 10;
		obj.res.eventDist.drawOffset.y = $(element).position().top + 10;
		$(".underPoi", element).bind("click", obj.res, function(evt) {
			var id = $(this).attr("id").replace("underPoi", "");
			if(evt.data.eventDist.move) {
				evt.data.eventDist.move = false;
				evt.data.eventDist.endDist = evt.data.facilities[id].dist;
				evt.data.eventDist.endDep = evt.data.facilities[id].dep;
				var distance =  Math.abs(evt.data.eventDist.endDist - evt.data.eventDist.startDist);
				var dep =  Math.abs(evt.data.eventDist.endDep - evt.data.eventDist.startDep);
				var left = evt.clientX-evt.data.eventDist.drawOffset.x;
				if(evt.data.eventDist.startPos.x-left > 0) left -= 22;
				else left += 14;
				var top = evt.clientY-evt.data.eventDist.drawOffset.y;
				
				$("#eventDistStr", element).attr("from", left+","+top);
				$("#eventDistStr", element).attr("to", (parseFloat(left)+10)+","+(parseFloat(top)+0.1));
				$("#eventDistStr textpath", element).attr("string", NUTs.Util.fn_fmt_fix(Math.sqrt(distance*distance + dep*dep), 2));
				$("#eventDistStr", element).show();
				$(element).unbind("mousemove");
			}
			else {
				evt.data.eventDist.move = true;
				evt.data.eventDist.startDist = evt.data.facilities[id].dist;
				evt.data.eventDist.startDep = evt.data.facilities[id].dep;
				evt.data.eventDist.startPos.x = evt.clientX - evt.data.eventDist.drawOffset.x;
				evt.data.eventDist.startPos.y = evt.clientY - evt.data.eventDist.drawOffset.y;
				
				var left = $(this).css("left").replace("px", "");
				var top = $(this).css("top").replace("px", "");
				$("#eventDistLine", element).attr("from", (parseFloat(left)+4) + "," + (parseFloat(top)+5));
				$("#eventDistLine", element).attr("to", (parseFloat(left)+4) + "," + (parseFloat(top)+5));
				$("#eventDistLine", element).show();
				$("#eventDistStr", element).hide();
				
				$(element).bind("mousemove", evt.data, function(evt) {
					var control = evt.data;
					var left = evt.clientX - evt.data.eventDist.drawOffset.x;
					var top = evt.clientY - evt.data.eventDist.drawOffset.y;
					var offset;
					if(evt.data.eventDist.startPos.x-left > 0) offset = 4;
					else offset = -2;
					$("#eventDistLine", element).attr("to", (left+offset) + "," + top);
				});
			}
		});
	};

	function fn_event_attr(element, obj, callback) {
		fn_event_init(element, obj);
		$("#eventDistLine", element).hide();
		$("#eventDistStr", element).hide();
		
		$(".underFac", element).bind("mouseover", obj.res, function(evt) {
			var id = $(this).attr("id").replace("underFac", "");
			$(".acssAttr span.dip", element).text(evt.data.facilities[id].dip);
			$(".acssAttr span.dep", element).text(evt.data.facilities[id].dep);
			$(".acssAttr span.titLyr", element).text(evt.data.facilities[id].layer);
			$(".acssAttr", element).css("left", $(this).offset().left);
			$(".acssAttr", element).css("top", evt.clientY - $(element).position().top);
			$(".acssAttr", element).show();
		});
		
		$(".underFac", element).bind("mouseout", obj.res, function(evt) {
			$(".acssAttr", element).hide();
		});
		
		$(".underFac", element).bind("click", obj.res, function(evt) {
			var id = $(this).attr("id").replace("underFac", "");
			if(callback) {
				callback(evt.data.facilities[id].table, evt.data.facilities[id].id);
			}
		});
	};

	function fn_draw_lengend() {
		var alias = opener.map.getControl("acss").getAlias();
		var styles = opener.map.getControl("acss").getStyles();
		var liTagsStr = "";
		for ( var i = 0, len = alias.length; i < len; i++) {
			liTagsStr += "<li>";
			if(alias[i] == "상수관로"){
				liTagsStr += "<img src='/map/lineDraw.do?size=14&dash=1&width=1.0&color=" + styles[i].replace("0x", "") + "' style='width:14px;height:14px;' />";
			}
			else if(alias[i] == "하수관거"){
				liTagsStr += "<img src='/map/lineDraw.do?size=14&dash=1&width=1.0&color=" + styles[i].replace("0x", "") + "' style='width:14px;height:14px;' />";
			}
			else if(alias[i] == "급수관로"){
				liTagsStr += "<img src='/map/lineDraw.do?size=14&dash=1&width=1.0&color=" + styles[i].replace("0x", "") + "' style='width:14px;height:14px;' />";
			}
			else if(alias[i] == "가스관로"){
				liTagsStr += "<img src='/map/lineDraw.do?size=14&dash=1&width=1.0&color=" + styles[i].replace("0x", "") + "' style='width:14px;height:14px;' />";
			}
			else if(alias[i] == "도로면"){
				liTagsStr += "<img src='/map/polygonDraw.do?size=13&linecolor=ffffff&width=1&dash=1&fillcolor=" + styles[i].replace("0x", "") + "' style='width:14px;height:14px;' />";
			}
			liTagsStr += "<span>";
			liTagsStr += alias[i];
			liTagsStr += "</span>";
			liTagsStr += "</li>";
		}

		$("#divAcssLengend ul").html(liTagsStr);
	}
</script>

</head>
<body>
	 <div class='divAcss' >
		<div class="popTit">
			<div id="P2_Header">
				    	<div class="Ico" style="padding:5px;"><img src="/images/usolver/com/map/top/top2_ico_2.png" alt="위치검색아이콘"/></div>
				    	<div class="Title">횡단면도 조회</div>
				    	<div class="Close"></div>
			</div>
				
			<div class="btnPrint">
			
				<a href="#" class="btnPosAcss"><img src="<c:url value='/images/usolver/com/map/btn_traverse01_new.png' />" alt='위치확인' /></a>
				<a href="#" class="btnDistAcss"><img src="<c:url value='/images/usolver/com/map/btn_traverse02_new.png' />" alt='거리측정' /></a>
				<a href="#" class="btnAttrAcss"><img src="<c:url value='/images/usolver/com/map/btn_traverse03_new.png' />" alt='속성조회' /></a>
			</div>
		</div>
		<div id='divAcssContent'>
			<div id='divAcssImg' style="position:relative"></div>
		    <div id="divAcssLengend"><ul></ul></div>
		</div>
	</div>
	
	<!-- 속성조회 결과창 시작-->
	<div id="attrViewer" title="검색결과">
		<div id="attrSearchList">
			<span id="searchListTree"></span>
		</div>
		<div id="attrSearchContent">
			<span id="searchContent"></span>
		</div>
	</div>
</body>
</html>