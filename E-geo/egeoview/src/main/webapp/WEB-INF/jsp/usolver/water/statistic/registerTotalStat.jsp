<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
  /**
  * @Class Name : 
  * @Description :   상수도통계 - 종합현황
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
	case "SHT_NUM" : // 도엽번호
		vWhere = $("#WHERE").val();
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
		url: "/book/wtlTotalStatXml.do",
		success: function(data) {
			//상단
			$("#wtlHeadPs").html(data.r.wtlHeadPs + "개");
			$("#wtlGainPs").html(data.r.wtlGainPs + "개");
			$("#wtlPuriAs").html(data.r.wtlPuriAs + "개");
			$("#wtlPresPs").html(data.r.wtlPresPs + "개");
			$("#wtlServPs").html(data.r.wtlServPs + "개");
			//하단
			$("#wtlMetaPs").html(data.r.wtlMetaPs + "개");
			$("#wtlFirePs1").html(data.r.wtlFirePs1 + "개");
			$("#wtlFirePs2").html(data.r.wtlFirePs2 + "개");
			$("#wtlRsrvPs").html(data.r.wtlRsrvPs + "개");
			$("#wtlStpiPs").html(data.r.wtlStpiPs + "개");
			$("#wtlRsrvPs").html(data.r.wtlRsrvPs + "개");
			
			//상수관로
			$("#wtlPipeLmCnt001").html(data.pipeCnt.wtlPipeLmCnt001 + "m");
			$("#wtlPipeLmCnt002").html(data.pipeCnt.wtlPipeLmCnt002 + "m");
			$("#wtlPipeLmCnt003").html(data.pipeCnt.wtlPipeLmCnt003 + "m");
			$("#wtlPipeLmCnt004").html(data.pipeCnt.wtlPipeLmCnt004 + "m");
			$("#wtlPipeLmCnt010").html(data.pipeCnt.wtlPipeLmCnt010 + "m");

			//급수관/소방관
			$("#wtlSplyLsCnt005").html(data.splyCnt.wtlSplyLsCnt005 + "m");
			$("#wtlSplyLsCnt020").html(data.splyCnt.wtlSplyLsCnt020 + "m");
			
			//변류시설
			$("#wtlValvPsCnt200").html(data.valvCnt.wtlValvPsCnt200 + "개"); //제수변
			$("#wtlValvPsCnt203").html(data.valvCnt.wtlValvPsCnt203 + "개"); //배기변
			$("#wtlValvPsCnt202").html(data.valvCnt.wtlValvPsCnt202 + "개"); //이토변
			$("#wtlValvPsCnt201").html(data.valvCnt.wtlValvPsCnt201 + "개"); //역지변
			$("#wtlValvPsCnt204").html(data.valvCnt.wtlValvPsCnt204 + "개"); //감압변
			$("#wtlValvPsCnt205").html(data.valvCnt.wtlValvPsCnt205 + "개"); //안전변
			$("#wtlValvPsCnt207").html(data.valvCnt.wtlValvPsCnt207 + "개"); //안전변
			
			//수압계
			$("#wtlPrgaPs").html(data.resultCnt.wtlPrgaPs+ "개");
			//유량계
			$("#wtlFlowPs").html(data.resultCnt.wtlFlowPs + "개");
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
	$("#divWHERE").hide();
	switch(item) {
		case "ALL" : // 시
			$("#divALL").show();
			break;
		case "HJG_CDE" : // 구
			$("#divALL").hide();
			$("#divHJG_CDE").show();
			break;
		case "HJD_CDE" : // 행정동
			$("#divALL").hide();
			$("#divHJD_CDE").show();
			$("#HJD_CDE option:eq(0)").attr("selected","selected");
			break;
		case "SHT_NUM" : // 도엽번호
			$("#divALL").hide();
			$("#divWHERE").show();
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
	                    <select id="COLUMN" name="COLUMN" onchange="fnConditionChangeVal(this);"    class="select"  style="width:100%">
							<option value="ALL" selected="selected">시</option>
							<option value="HJG_CDE">구</option>
							<option value="HJD_CDE">행정동</option>
							<option value="SHT_NUM">도엽번호</option>
						</select>
					</div>
					<div class="Bx1" id="divHJG_CDE" >					        		
			        	 <select name="HJD_CD" id="HJD_CD"  class="select" >
	                    	<option value=""></option>
	                        <c:forEach var="selectData" items="${hjd_cd_list}">
							<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CD}"> selected="selected" </c:if> >${selectData.VAL}</option>
							</c:forEach>
	                    </select>
					</div>
					<div class="Bx1" id="divHJD_CDE" >
			       		<select name="HJD_CDE" id="HJD_CDE"  class="select">
							<c:forEach var="selectData" items="${hjd_cde_list}">
							<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CDE}"> selected="selected" </c:if> >${selectData.VAL}</option>
							</c:forEach>
						</select>
					</div>
					<div class="Bx1" id="divWHERE">
						<input style="display: inline;width: 160px;" type="text" id="WHERE" name="WHERE" />
					</div>
					<div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_search_statistic()">검색</a></div>
                </div>
            </div>
            <table class="tbview2" summary="종합현황">
				<caption>종합현황</caption>
				<colgroup>
					<col width="14%" />
				    <col width="14%" />
				    <col width="24%" />
                    <col width="24%" />
				    <col width="24%" />
				</colgroup>
				<tbody>
					<tr>
                        <th colspan="2" scope="row">상수시설현황</th>
                        <td colspan="3" class="tbview2_tdpad">
                            <table class="tbin" summary="상수시설현황">
				                <caption>상수시설현황</caption>
				                <colgroup>
					                <col width="20%" />
				                    <col width="20%" />
				                    <col width="20%" />
                                    <col width="20%" />
				                    <col width="20%" />
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>수원지</th>
                                        <th>취수장</th>
                                        <th>정수장</th>
                                        <th>가압장</th>
                                        <th class="brnone2">배수지</th>
                                    </tr>
                                    <tr>
                                       <td id="wtlHeadPs" >개</td>
					                    <td id="wtlGainPs" >개</td>
					                    <td id="wtlPuriAs" >개</td>
					                    <td id="wtlPresPs" >개</td>
					                    <td id="wtlServPs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">상수관로현황</th>
                        <th scope="col">연장</th>
                        <th scope="col" rowspan="2" colspan="3">변류시설현황</th>
                    </tr>
                    <tr>
                        <th scope="row">취수관</th>
                        <td id="wtlPipeLmCnt001" >m</td>
                    </tr>
                    <tr>
                        <th scope="row">도수관</th>
                        <td id="wtlPipeLmCnt002" >m</td>					       
                        <th scope="col">제수변</th>
                        <th scope="col">배기변</th>
                        <th scope="col">이토변</th>
                    </tr>
                    <tr>
                        <th scope="row">송수관</th>
                        <td id="wtlPipeLmCnt003" >m</td>
                        <td id="wtlValvPsCnt200" >개</td>
						<td id="wtlValvPsCnt203" >개</td>
						<td id="wtlValvPsCnt202" >개</td>
                    </tr>
                    <tr>
                        <th scope="row">배수관</th>
                        <td id="wtlPipeLmCnt004" >m</td>
                        <th scope="col">역지변</th>
                        <th scope="col">감압변</th>
                        <th scope="col">안전변</th>
                    </tr>
                    <tr>
                        <th scope="row">급수관</th>
                        <td id="wtlSplyLsCnt005" >m</td>
                        <td id="wtlValvPsCnt201">개</td>
						<td id="wtlValvPsCnt204" >개</td>
						<td id="wtlValvPsCnt205">개</td>
                    </tr>
                    <tr>
                        <th scope="row">공업용수관</th>
                        <td id="wtlPipeLmCnt010" >m</td>
                        <th scope="col">공기변+이토변</th>
                        <th scope="col">수압계</th>
                        <th scope="col">유량계</th>
                    </tr>
                    <tr>
                        <th scope="row">소방관</th>
                        <td id="wtlSplyLsCnt020">m</td>
                        <td id="wtlValvPsCnt207" >개</td>
						<td id="wtlPrgaPs" >개</td>
						<td id="wtlFlowPs" >개</td>
                    </tr>
                    <tr>
                        <th colspan="2" scope="row">수용가시설현황</th>
                        <td colspan="3" class="tbview2_tdpad">
                            <table class="tbin" summary="수용가시설현황">
				                <caption>수용가시설현황</caption>
				                <colgroup>
					                <col width="20%" />
				                    <col width="20%" />
				                    <col width="20%" />
                                    <col width="20%" />
				                    <col width="20%" />
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th rowspan="2">급수전계량기</th>
                                        <th colspan="2">소방시설</th>
                                        <th rowspan="2">저수조</th>
                                        <th rowspan="2" class="brnone2">스탠드파이프</th>
                                    </tr>
                                    <tr>
                                        <th>급수탑</th>
                                        <th>소화전</th>
                                    </tr>
                                    <tr>
                                        <td id="wtlMetaPs">개</td>
					                    <td id="wtlFirePs1" >개</td>
					                    <td id="wtlFirePs2">개</td>
					                    <td id="wtlRsrvPs">개</td>
					                    <td id="wtlStpiPs" class="brnone2">개</td>
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