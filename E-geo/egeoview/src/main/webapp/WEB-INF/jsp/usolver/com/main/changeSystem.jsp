<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<script type="text/javascript">

$(document).ready(function() {
	    		 
		 $("#btnChangeSystemApply").click(function(){			
			var rdo = $("input:radio[name=systemType]:checked");
			
			if( rdo.length > 0 ){
				parent.changeSystem(rdo.val());
			}else {
				alert("선택된 시스템이 없습니다. 시스템을 선택해 주세요");
				return;
			}
		});
		
		 $("#btnChangeSystemClose").click(function(){			
			 BOOK.fn_close_window();
		});
		 
});
</script>
<title>시스템전환</title>
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${param.nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE"  value="<c:out value="${param.CALL_TYPE}"/>"/><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
</head>
<body>
<div id="W_500" style="height:354px;">
	<div id="system">
    	<div class="Title">
        	<p>전환할 시스템을 선택하세요</p>
        </div>
        <div class="SelectBx">        	
        	<div class="sysImgBx">
            	<p><img src="/images/usolver/com/cmm/jdesktop/system_water.gif"  alt="상수관리시스템"/></p>
                <div><security:authorize ifAnyGranted="ROLE_WATER"><input type="radio" id="gray" name="systemType" value="WATER" /></security:authorize>
                		상수관리시스템</div>
            </div>
            <div class="sysImgBx">
            	<p><img src="/images/usolver/com/cmm/jdesktop/system_sewer.gif"  alt="하수관리시스템"/></p>
                <div> <security:authorize ifAnyGranted="ROLE_SEWER"><input type="radio" id="gray" name="systemType" value="SEWER" /></security:authorize>
                		하수관리시스템</div>
            </div> 
            <div class="sysImgBx">
            	<p><img src="/images/usolver/com/cmm/jdesktop/system_road.gif"  alt="도로관리시스템"/></p>
                <div><security:authorize ifAnyGranted="ROLE_ROAD"><input type="radio" id="gray" name="systemType" value="ROAD" /></security:authorize>
                		도로관리시스템</div>
            </div> 
        	<%-- <c:forEach var="selectData" items="${json_system}">			
	        	<div class="sysImgBx">
	            	<p><img src="/images/usolver/com/cmm/jdesktop/<c:out value='${selectData.IMG}'/>"  alt="<c:out value="${selectData.VAL}"/>"/></p>
	                <div><input type="radio" id="gray" name="systemType" value="<c:out value='${selectData.CODE}'/>" /><c:out value="${selectData.VAL}"/></div>
	            </div>
		    </c:forEach> --%>		     
        </div>       
        <div style="margin-left:20px">
        <span class="blue">* 시스템을 선택할 수 없는 경우는 권한신청을 하지 않으셔서 그렇습니다.<br></span> 
		<span class="blue">* 사용자정보에서 권한신청 하시기 바랍니다. </span>
		</div>
        <div class="Btn_pd2">
	        <div class="Btn"><a href="#" class="Btn_02"  id="btnChangeSystemApply">적용</a></div>&nbsp;
	        <div class="Btn"><a href="#" class="Btn_02"  id="btnChangeSystemClose">닫기</a></div>
	    </div>
    </div>
</div>
</body>
</html>