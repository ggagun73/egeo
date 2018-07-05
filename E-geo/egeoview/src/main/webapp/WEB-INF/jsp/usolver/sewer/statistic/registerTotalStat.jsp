<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
  /**
  * @Class Name : 
  * @Description :  하수도통계 - 종합현황
  * @Modification Information
  * 
  *   수정일           수정자                수정내용
  *  ----------    --------    ---------------------------
  *  2014.08.05      임상수        최초 생성
  *
  
  * author 지노
  * since 2014.07.10
  *  
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html>
<html lang="UTF-8">
<head>

<script type="text/javascript">
$( document ).ready(function() {
	
	//조건세팅
	fnConditionChangeVal();
	
	// 화면 초기화. 그리드 사이즈 조정 
	BOOK.fn_init_main();	
});

function fn_search_statistic() {
	
	var vWhere = "";
	switch($("#COLUMN").val()) {
	case "ALL" : // 시
		break;
	case "HJG_CDE" : // 구
		vWhere = $("#HJD_CD").val();
		break;
	case "HJD_CDE" : // 행정동
		vWhere = $("#HJD_CDE").val();
		break;
	}
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			COLUMN : $("#COLUMN").val(),
			WHERE : vWhere
		},
		contentType : "application/json; charset=utf-8",
		//url: "/water/statistic/wtlTotalStatXml.do",
		url: "/book/swlTotalStatXml.do",
		success: function(data) {
			//하수관거시설
			$("#swlPipeLm").html(data.r.swlPipeLm + "m");
			$("#swlSideLs").html(data.r.swlSideLs + "m");
			$("#swlConnLs").html(data.r.swlConnLs + "m");
			//하수관망부속시설
			$("#swlManhPs").html(data.r.swlManhPs + "개");
			$("#swlSpotPs").html(data.r.swlSpotPs + "개");
			$("#swlClayPs").html(data.r.swlClayPs + "개");
			$("#swlRsphPs").html(data.r.swlRsphPs + "개");
			$("#swlSpewPs").html(data.r.swlSpewPs + "개");
			$("#swlVentPs").html(data.r.swlVentPs + "개");
			//하수배제,처리시설
			$("#swlDranPs").html(data.r.swlDranPs + "m");
			$("#swlPumpPs").html(data.r.swlPumpPs + "m");
			$("#swlPresPs").html(data.r.swlPresPs + "m");
			$("#swlJihaPs").html(data.r.swlJihaPs + "m");
			$("#msg").html("");
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
}

function fnConditionChangeVal(obj) {
	var item = $(obj).val(); // 선택된 값을 가져옴
	$("#divHJG_CDE").hide();
	$("#divHJD_CDE").hide();
	switch(item) {
		case "HJG_CDE" : // 구			
			$("#divHJG_CDE").show();
			break;
		case "HJD_CDE" : // 행정동
			$("#divHJD_CDE").show();
			break;
	}
};
</script>
</head>
<body>
<div id="W_700">
<form id="frm_statistic" name="frm_statistic" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value="<c:out value="${CALL_TYPE}"/>"/><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
 <div>
        <div class="user_content">
            <div class="schbx">
                <div class="FR" >
                	<div class="Bx1">
	                    <select id="COLUMN" name="COLUMN" onchange="fnConditionChangeVal(this);"  class="select"  style="width:100px;">
							<option value="ALL" selected="selected">시</option>
							<option value="HJG_CDE">구</option>
							<option value="HJD_CDE">행정동</option>
						</select>
					</div>
					<div class="Bx1" id="divHJG_CDE" >					        		
			        	 <select name="HJD_CD" id="HJD_CD"  class="select">
	                    	<option value=""></option>
	                        <c:forEach var="selectData" items="${hjd_cd_list}">
							<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CD}"> selected="selected" </c:if> >${selectData.VAL}</option>
							</c:forEach>
	                    </select>
					</div>
					<div class="Bx1" id="divHJD_CDE"   class="select" >
			       		<select name="HJD_CDE" id="HJD_CDE">
							<c:forEach var="selectData" items="${hjd_cde_list}">
							<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CDE}"> selected="selected" </c:if> >${selectData.VAL}</option>
							</c:forEach>
						</select>
					</div>
					<div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_search_statistic()">검색</a></div>
                </div>
            </div>
            <table class="tbview2" summary="종합현황">
				<caption>종합현황</caption>
				<colgroup>
					<col width="20%" />
				    <col width="80%" />
				</colgroup>
				<tbody>
					<tr>
                        <th scope="row">하수관거시설</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="하수관거시설">
				                <caption>하수관거시설</caption>
				                <colgroup>
					                <col width="30%" />
				                    <col width="30%" />
				                    <col width="30%" />
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>하수관거</th>
                                        <th>측구</th>
                                        <th  class="brnone2">하수연결관</th>
                                    </tr>
                                    <tr>
                                       <td id="swlPipeLm" >개</td>
					                    <td id="swlSideLs" >개</td>
					                    <td id="swlConnLs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
                   <tr>
                        <th scope="row">하수관망부속시설</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="하수관망부속시설">
				                <caption>하수관망부속시설</caption>
				                <colgroup>
					                <col width="16%" />
				                    <col width="16%" />
				                    <col width="16%" />
                                    <col width="16%" />
				                    <col width="16%" />
				                    <col width="16%" />
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>맨홀</th>
								        <th>물받이</th>
								        <th>우수토실</th>
								        <th>역사이펀</th>
								        <th>토구</th>
                                        <th  class="brnone2">환기구</th>
                                    </tr>
                                    <tr>
					                    <td id="swlManhPs">개</td>
								        <td id="swlSpotPs">개</td>
								        <td id="swlClayPs">개</td>
								        <td id="swlRsphPs">개</td>
								        <td id="swlSpewPs">개</td>
					                    <td id="swlVentPs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">하수배제,처리시설</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="하수배제,처리시설">
				                <caption>하수배제,처리시설</caption>
				                <colgroup>
					                <col width="25%" />
				                    <col width="25%" />
				                    <col width="25%" />
                                    <col width="25%" />				                    
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>하수처리장</th>
										 <th>하수펌프장</th>
										 <th class="brnone2">유수지</th>
                                    </tr>
                                    <tr>
								        <td id="swlDranPs">개</td>
								        <td id="swlPumpPs">개</td>
								        <td id="swlPresPs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
				</tbody>
			</table>            
        </div>
    </div>
    <!-- // favorite -->  
</form>  
</div>    
</body>
</html>