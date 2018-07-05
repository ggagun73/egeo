<%@page import="usolver.com.main.vo.LoginVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/popup02.css'/>" />
<title>인쇄 미리보기</title>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.debug.js'/>"></script>
<script type="text/javascript"> 

$(document).ready(function(e){

	/* var sData = parent.fn_get_printData(); 

	$.post("/map/printSave.do", {
		datas : sData
	}, function(data) {

		var imgUrl = "/map/loadImage.do?filePath="+data; */

		/* var printViewDiv = OpenLayers.Util.createDiv("printView", null, null, null, "absolute", null, "hidden");
		printViewDiv.style.left = -parseInt(pMap.layerContainerDiv.style.left) + "px";
		printViewDiv.style.top = -parseInt(pMap.layerContainerDiv.style.top) + "px";
		printViewDiv.style.width = pMap.getSize().w + "px";
		printViewDiv.style.height = pMap.getSize().h + "px";
		printViewDiv.style.zIndex = 749;
		pMap.layerContainerDiv.appendChild(printViewDiv);
		 */
		/* var imgId = "imgView";
		var imgWidth = $("#printMap").width();
		var imgHeight = $("#printMap").height(); 

		var printViewImg = OpenLayers.Util.createImage(imgId, null, null, imgUrl, "absolute");
		var printViewImg = OpenLayers.Util.createImage(imgId, null, null, imgUrl, "absolute");
		printViewImg.style.width = imgWidth + "px";
		printViewImg.style.height = imgHeight + "px";
		document.getElementById("printMap").appendChild(printViewImg);

		//pMap.layerContainerDiv.removeChild(printViewDiv);

	}); */
	
	$(window.parent.document).find("#ifrMap")[0].contentWindow.MAP.fn_create_mapBase64Image(function(_oRes){
		var imgId = "imgView";
		var imgWidth = $("#printMap").width();
		var imgHeight = $("#printMap").height(); 
		
		var printViewImg = $("<img id='"+imgId +"'/>")[0];
		printViewImg.style.width = imgWidth + "px";
		printViewImg.style.height = imgHeight + "px";
		printViewImg.src = _oRes;
		
		/* var png = _oRes.split(',')[1];
		var the_file = new Blob([png],  {type: 'image/png'},'temp.png');
		printViewImg.src = the_file; */
			
		/* var printViewImg = OpenLayers.Util.createImage(imgId, null, null, image, "absolute");
		printViewImg.style.width = imgWidth + "px";
		printViewImg.style.height = imgHeight + "px"; */
		
		document.getElementById("printMap").appendChild(printViewImg);
	},$("#printMap").width(),$("#printMap").height());


	$("#btn_print_ok").on("click", function() { 
		window.print();
		var oImgInfo = {};
		oImgInfo.USER_ID = "";
		oImgInfo.IMG_STATE = "출력";
		oImgInfo.SAVE_IMG = $("#printMap img").attr("src");
		
		$.ajax({
			url : "/admin/log/ilg/insertImgLog.do",
			type : 'post',
			data : {data:JSON.stringify(oImgInfo)}
		});
	});
});

 
</script>
<style>

html {overflow-y:scroll; height:100%;}
body {height:100%; color:#666; font-family:'돋움', Dotum, Arial, sans-serif; font-size:75%;}

/* 출력 미리보기 */
#printPreview {position:absolute;width:940px;height:610px; background-color:#ffffff; z-index:1000; top:10px; left:10px; border:1px solid #dcdcdc; padding:10px;}
#print .printTitle{position:relative;font-size:15px;font-weight:bold;float:left;width:900px;;height:40px;vertical-align:middle;padding:10px 0 0 0;}
#print .printTitle input{width:75%; border:1px solid #ffffff; font-size:80%; }
#print .printInfo{position:relative; float:right;text-align:right;}
#print .printMsg{position:relative; float:left; padding:10px 0 0 0;}
#print .printMsg .msg{position:relative; display:inline-block;width:750px;}
#print .printMsg .time{position:relative; width:150px; text-align:right;}
#print .Close { float:right; text-align:right; }
#print .Close img { padding:9px 8px 0 0; }
#printMap {float:left;position:relative; width:100%; height:500px;border:1px solid #dcdcdc;}
#waterMark {position:absolute;font-size:100px; opacity:0.3;margin-top:250px;margin-left:330px;}
</style>
</head>
<body>
		<!-- 출력 미리보기  팝업 -->
		<div id="printPreview">
		  <div id="print">  
			<div class="printTitle">
				<span> 인쇄 미리보기 </span>
				<span>
				   <input type="text" id="txtPrintTitle" value="제목을 입력하세요"></input>
				</span>
				<span><a id="btn_print_ok" href="#"><img src="/images/usolver/com/map/btn_print.gif"  alt="인쇄하기"  title="인쇄하기"/></a></span> 
			</div>
			<div class="Close"><a id="btn_popup_print_close" href="#"><img id="test" src="/images/usolver/com/map/top/top_btn_close_off.png" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_off.png'"  alt="닫기"/></a></div> 
			<div class="printInfo">
				사용자 : <span id="pirntUser">[ ]</span> 
			</div>
			<div id="printMap">
			</div>
			<div id="waterMark">
				열람용
			</div>
			<div class="printMsg">
				<span class="msg">업무 참고용으로만 활용하시기 바랍니다.</span> 
				<span class="time">출력일시 : <span id="pirntTime">2016-08-30 15:45</span></span> 
			</div>
		  </div> 
		</div> 
		<!--// 출력 미리보기 팝업 끝  -->
</body>
</html>