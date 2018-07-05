<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
  /**
  * @Class Name : 
  * @Description :  하수도 통계 - 행정구역별 통계
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
	fn_init_statistic();
	
	if( $('#RESULTFIELD').val().length < 1 ){ 
		$(".Bx1").hide();
	}
});

//그리드 초기화 설정 
function fn_init_statistic() {
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			TABLENAME : $("#TABLENAME").val(), // 통계대상 시설물
			ROWALIAS : $("#ROWALIAS").val(), // 행 이름 
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
		
	fn_send_data();
	
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
<!-- <input type="hidden" id="RESULTFIELD" name="RESULTFIELD" value="PIP_LEN"/>
<input type="hidden" id="ROWALIAS" name="ROWALIAS" value="구"/> -->
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="ROWALIAS" name="ROWALIAS" value="<c:out value="${ROWALIAS}"/>"/>
<input type="hidden" id="ROWFIELD" name="ROWFIELD" value="<c:out value="${ROWFIELD}"/>"/>
<input type="hidden" id="COLFIELD" name="COLFIELD"  value=" <c:out value="${empty COLFIELD? 'HJD_CDE':COLFIELD}"/>"/>
<input type="hidden" id="SUBTABLE" name="SUBTABLE"  value=" <c:out value="${SUBTABLE}"/>"/>
<input type="hidden" id="RESULTFIELD" name="RESULTFIELD" value="<c:out value="${RESULTFIELD}"/>"/>
 	<div>
         <div class="user_content">
            <div class="schbx">
                <div class="FR" >                	
	         		<div class="Bx1">
	             		<div class="Tx1">
							<dl>
								<dd><input type="radio" value="COUNT" id="RESULTTYPE" name="RESULTTYPE" checked="checked" />개수</dd>
								<dd><input type="radio" value="LEN" id="RESULTTYPE" name="RESULTTYPE" />연장</dd>
							</dl>
						</div>
	         		</div>                	
	                <div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_excel_statistic()">엑셀출력</a></div>
	                <div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_send_data()">검색</a></div>
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