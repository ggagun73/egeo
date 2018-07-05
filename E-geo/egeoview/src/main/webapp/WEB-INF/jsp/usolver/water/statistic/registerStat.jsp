<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
  /**
  * @Class Name : 
  * @Description :   상수도 통계 - 시설물별 통계현황
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
<html lang="ko">
<head>
<script type="text/javascript">
$( document ).ready(function() {
	fn_change_conditionVal($("#TABLENAME"));
	fn_init_statistic();
	// 검색용 팝업 설정 처리 (리사이즈, 클릭 이벤트...)	: 필수
	BOOK.fn_init_main();			
});

//그리드 초기화 설정 
function fn_init_statistic() {
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			TABLENAME : $("#TABLENAME").val(), // 통계대상 시설물
			ROWALIAS : $("#ROWFIELD :selected").text(), // 행 이름 
			ROWFIELD : $("#ROWFIELD").val(), // 조건1
			COLFIELD : $("#COLFIELD").val() // 조건2
		}
		,url: "/book/registerStatCol.do"
		,success: function(data) {
			fn_create_jqGrid(data); // jqGrid 초기화
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
}

function fn_check_search(){
	
	if($("#TABLENAME").val().length < 1 ){
		alert("시설물이 선택되지 않았습니다.");
		return false;
	}
		
	if($("#ROWFIELD").val() == $("#COLFIELD").val()) { // 조건1과 조건2가 같을 경우
		alert("검색 조건이 중복됩니다.");
		return false;
	}
	//행정동과 구는 같이 검색하실 수 없습니다. 
	if(($("#ROWFIELD").val() === 'HJG_CDE' && $("#COLFIELD").val() === 'HJD_CDE') || ($("#ROWFIELD").val() === 'HJD_CDE' && $("#COLFIELD").val() === 'HJG_CDE')) { 
		alert("구와 행정동은 같이 검색하실 수 없습니다.");
		return false;
	}	
	
	return true;
}

function fn_search_statistic() {
	
	if( fn_check_search() ){
	
		if ($("#ROWFIELD").val() == "SHT_NUM") {
			alert("알림:도엽번호에 대한 통계는 시간이 오래 걸릴 수 있습니다.");
		}
		fn_send_data();
	}
}

function fn_send_data() {
	$("#gridStatisctic").jqGrid("setGridParam",{
		datatype: "xml"
		,page: 1
		,postData: {
			TABLENAME : $("#TABLENAME").val(), // 통계대상 시설물
			ROWFIELD : $("#ROWFIELD").val(), // 조건1
			COLFIELD : $("#COLFIELD").val(), // 조건2
			RESULTTYPE : $("input:radio[name='RESULTTYPE']:checked").val(),
			RESULTFIELD : $("#RESULTFIELD").val(),
			SUBTABLE : $("#SUBTABLE").val()
		}
		,mtype: "POST"
	}).trigger("reloadGrid");
}


function fn_change_conditionVal(_sObject){
	
	var sTableName = $(_sObject).val().substr(0, 11); // 테이블명을 가져옴.. 조건이 추가되는 경우가 있음... 
	
	$("input:radio[name='RESULTTYPE']").attr("disabled", false);
	if( sTableName != null && sTableName.length > 1){
		$.ajax({
			type: "get",
			dataType: 'json',
			data: {
				TABLENAME :sTableName // 통계대상 시설물
			}
			,url: "/book/registerStatCondition.do"
			,success: function(data) {			
				fn_create_select($("#ROWFIELD"), data["rowData"], data["rowCode"]);	//조건1를 생성
				fn_create_select($("#COLFIELD"), data["colData"], data["colCode"]);		//조건2를 생성
				
				if( data["resultField"].length > 0  ){
					$("#RESULTFIELD").val(data["resultField"]);
					$("input:radio[name='RESULTTYPE']").attr("disabled", false);
				}else {
					$("input:radio[value='COUNT']").prop("checked", true);
					$("input:radio[name='RESULTTYPE']").attr("disabled", true);
				}
				
				fn_init_statistic();
			},
			error: function(xhr, status, error) {
				alert(status);
				alert(error);
			}
		});
	}else {
		$("#ROWFIELD").remove();
		$("#COLFIELD").remove();
	}

}

function fn_set_rowAlias() {
	$("#ROWALIAS").val($("#ROWFIELD :selected").text());
}

function fn_create_select(target, data, code) {
	if(!target || !data) return;
	
	if(!code) code = data;	
	var html = "";
	
	if( data.length > 0 ){
		
		for(var i = 0; i < data.length; i++) {
			html += "<option value=" + code[i]+ ">" + data[i] + "</option>";
		}		
		target.html(html);	
	}	
}


function fn_excel_statistic() {

	if ($('.activeWindow').find("#gridStatisctic").getGridParam("records") > 0) {
		if( confirm("통계 목록을 저장하시겠습니까?") ) {
			// SUBMIT
			if ($("input:radio[name='RESULTTYPE']").attr("disabled") == "disabled") {
				$("input:radio[name='RESULTTYPE']").attr("disabled", false);
				BOOK.fn_get_form("frm_statistic", "proc_frm", "<c:url value='/book/registerStatExcel.do'/>","").submit();
				$("input:radio[name='RESULTTYPE']").attr("disabled", true);
			} else {
				BOOK.fn_get_form("frm_statistic", "proc_frm", "<c:url value='/book/registerStatExcel.do'/>","").submit();	
			}
		}	
	} else {
		alert('검색 후에 실행하시기 바랍니다.');
	}
}

//jqGrid의 영역을 생성	
function fn_create_jqGrid(data) {
	
	jQuery("#gridStatisctic").GridUnload();
	
	$("#divStatistc").empty(); 
	var sGridReload = $("#result_statistic").html("<table id='gridStatisctic'></table><div id='gridStatPager'></div>");
	$("#divStatistc").append(sGridReload);
	
	var sColModels = [];		
	for(var i = 0; i < data["colModels"].length; i++) {		
		sColModels[i] = {name:data["colModels"][i],index:data["colModels"][i],xmlmap:data["colModels"][i], width:data["colWidths"][i], align:data["colAligns"][i]};						
	}

	// TODO : jqGrid checkbok 비활성화 옵션
	$('.activeWindow').find("#gridStatisctic").jqGrid({
		url: '/book/registerStatXml.do'
		,datatype: "local"
		,colNames: data["colNames"]
	   	,colModel: sColModels		
	    ,autowidth: false
	   	,rowNum: 100
	   	,rowList: [100,5000,100000000]
	    ,viewrecords: true
		,xmlReader: { root : "rows",row: "Item",repeatitems: false }
	   	,pager: jQuery('#gridStatPager')
	    ,rownumbers: false
	    ,loadtext: "검색 중입니다."
	   	,emptyrecords: "<div class='Paging_tx'>검색된 데이터가 없습니다.</div>"
		,recordtext: "<div class='Paging_tx'>총 <span> {2}</span>건 데이터 ({0}-{1})</div>"
		,ondblClickRow: function(rowId) {		// 더블클릭 처리
	//		fnViewDJ('gridArea', rowId);	// 대장 조회
		}
		,multiselect: false
		,multiboxonly: true
		,shrinkToFit : false
		,width: 1100
		,cmTemplate : {sortable : false}
	}).navGrid('#gridStatPager',{edit:false,add:false,del:false,search:false,refresh:false});
	
	// 화면 초기화. 그리드 사이즈 조정 
	BOOK.fn_init_main();		
		
	
}
</script>
</head>
<body>
<form id="frm_statistic" name="frm_statistic" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="callBackFunction" name="callBackFunction" value=""/>
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value="<c:out value="${CALL_TYPE}"/>"/><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
<input type="hidden" id="RESULTFIELD" name="RESULTFIELD" value="PIP_LEN"/>
<input type="hidden" id="ROWALIAS" name="ROWALIAS" value="구"/>
<input type="hidden" id="SUBTABLE" name="SUBTABLE"  value=" <c:out value="${SUBTABLE}"/>"/>
 <div>
        <div class="user_content">
            <div class="schbx">
                <div class="FR" >
                	<div class="Bx1">통계대상시설물 선택 : 
	             		<select id="TABLENAME" name="TABLENAME" onchange="fn_change_conditionVal(this);fn_init_statistic();" style="min-width: 160px;">
	                        <c:forEach var="selectData" items="${table_list}">
							<option value="${selectData.g2Name}" <c:if test = "${selectData.g2Name == param.TABLENAME}"> selected="selected" </c:if> >${selectData.g2Alias}</option>
							</c:forEach>
						</select>
					</div>
					<div class="Bx1">조건1(별로) :  <select id="ROWFIELD" name="ROWFIELD" onchange="fn_set_rowAlias();fn_init_statistic();" style="min-width: 100px;"></select></div>
					<div class="Bx1">조건2 : <select id="COLFIELD" name="COLFIELD"onchange="fn_init_statistic();" style="min-width: 100px;"></select></div>
	         		<div class="Bx1">
	             		<div class="Tx1">
							<dl>
								<dd><input type="radio" value="COUNT" id="RESULTTYPE" name="RESULTTYPE" checked="checked" />개수</dd>
								<dd><input type="radio" value="LEN" id="RESULTTYPE" name="RESULTTYPE" />연장</dd>
							</dl>
						</div>
	         		</div>                	
	                <div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_excel_statistic()">엑셀출력</a></div>
	                <div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_search_statistic()">검색</a></div>
                </div>
            </div>
            <div class="TableBx">    
	            <div class="Table_list">
	            	<table id='gridStatisctic'></table><div id='gridStatPager'></div>
	            </div>
			</div>
        </div>
    </div>
    <!-- // favorite -->    
</form>
<%@ include file="/common/include/common.jsp" %>
</body>
</html>

  