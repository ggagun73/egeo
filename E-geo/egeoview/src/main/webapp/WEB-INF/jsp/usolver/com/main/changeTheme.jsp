<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>     
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>테마변경</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/popup02.css'/>" />
</head>
<body>

<div id="W_500">
	<div id="theme">
    	<div class="Title">
        	<p>메인 화면 테마를 선택하세요</p>
        </div>
        <div class="SelectBx">
        	<div class="ImgBx">
            	<label for="gray"><img src="/images/usolver/com/cmm/jdesktop/theme_img1.gif" alt="gray테마" title="gray테마" /></label>
                <div class="CheckBx"><input type="radio" id="gray" name="themeType" value="GRAY" /> <label for="gray">Gray 테마</label></div>
            </div>
        	<div class="ImgBx">
            	<label for="blue"><img src="/images/usolver/com/cmm/jdesktop/theme_img2.gif" alt="blue테마" title="blue테마" /></label>
                <div class="CheckBx2"><input type="radio" id="blue" name="themeType" value="BLUE" /> <label for="blue">Blue 테마</label></div>
            </div>
        </div>
        
        <div class="BtnBx"><a href="#" id="btnApply"> <img  src="/images/usolver/com/cmm/jdesktop/btn_apply.gif" alt="적용" /></a></div>
    </div>
    

</div>
</body>

<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>

<script type="text/javascript">


	$(document).ready(function () {
	    
		var themetype = parent.fn_get_themetype() ;	
		$("input:radio[name=themeType][value='"+themetype+"']").attr("checked","checked");	
	   
		
		
		$(".tabEdit ul a").click(function(){
			$(".tabEdit ul a").each(function() {			
				$(this).removeClass("LeftTab_selected");	
				if($(this).attr("class") == "")
					$(this).addClass("LeftTab");
				$("#"+$(this).attr("id").replace("tab", "div")).css("display","none");
			});			
			$(this).addClass("LeftTab_selected");
			$("#"+$(this).attr("id").replace("tab", "div")).css("display","block");
		});
		
		$("#btnApply").click(function(){			
			
			var rdo = $("input:radio[name=themeType]:checked");
			parent.fn_change_theme(rdo.val());
			
		});
		
	});

</script>

</html>