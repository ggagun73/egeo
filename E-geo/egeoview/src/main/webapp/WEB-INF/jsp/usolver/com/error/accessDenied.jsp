<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page isErrorPage="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%-- <link href="<c:url value='/css/egovframework/sample.css' />" rel="stylesheet" type="text/css"> --%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<div id="wrap2">
<form name="frm" id="frm" method="post"  action="<c:url value='/userLogout.do'/>">		
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${nJDSKMasterId}"/>"/><!--  nJDSK window창(검색목록)의 Sub창들 관리를 위해-->	
	<div id="container2">
		<div id="content2">	
			<div class="Table_LBx">
				<div class="Table_left">
						<c:set var="errortype"  value="${errorType}" />
						<c:set var="errormsg"  value="${errorMsg}" />
						<c:choose>
						<c:when test="${ errortype eq 'disapprove' }">
							<table><tr><td style="text-align:center; font-weight: bold; padding:20px 0 20px 0; line-height:50px; Color:#5f5f5f;">
							에러메세지 : <c:out value="${errormsg}"/>(<c:out value="${errorType}"/>)
							</td></tr></table>
							<div class="Btn_pd2">
								<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window();fn_clear_window();">닫기</a></div>
							</div>
						</c:when>
						<c:otherwise>
							<table><tr><td style="text-align:center; font-weight: bold; padding:20px 0 20px 0; line-height:50px; Color:#5f5f5f;">
							에러메세지 : <c:out value="${errormsg}"/>(<c:out value="${errorType}"/>)
							</td></tr></table>
							<div class="Btn_pd2">
								<div class="Btn"><a href="#" class="Btn_02" onClick='parent.$("#logout").click();fn_clear_window();'>확인</a></div>
							</div>
						</c:otherwise>	
						</c:choose>						 
				</div>
			</div>
		</div>
	</div>
</form>
</div>
</body>
<script type="text/javascript">
	
//페이지 로딩 초기 설정
$( document ).ready(function() {
		
		var errorType = "<c:out value="${errorType}"/>";
		
    	if( errorType != "directdenied"){
			var sMainHtml = $('#wrap2').html();	
			new nJDSK.customSizeDialog("400", "300", "오류메세지", '',sMainHtml,'',false);		
			$('.buttonarea').remove();
				
			var sWindowId = '<c:out value="${nJDSKMasterId}"/>';			
			if( sWindowId === '' ){
				sWindowId = $('.window').attr('id').substr(4);
			}
		
			$('#win_'+sWindowId).hide();
			$('#tskbrbtn_'+sWindowId).remove();
			
		 }else {
			
			alert(' 에러메세지 : <c:out value="${errormsg}"/>(<c:out value="${errorType}"/>) ');
			history.back(-2);
		} 

});

function fn_clear_window(){
	var sWindowId = '<c:out value="${nJDSKMasterId}"/>';			
	$('#win_'+sWindowId).remove();
	nJDSK.WindowList.delete_item(sWindowId);
}
</script>	
</html>