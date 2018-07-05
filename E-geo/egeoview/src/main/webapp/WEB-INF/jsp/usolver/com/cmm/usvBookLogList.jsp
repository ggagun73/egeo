<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
  /**
  * @Class Name : 
  * @Description : 
  * @Modification Information
  * 
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
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
<%@ include file="/common/include/include.jsp" %>

<script type="text/javascript">
// 페이지 로딩 초기 설정
//셀 병합용
var prevCellVal1 = { cellId: undefined, value: undefined };
var prevCellVal2 = { cellId: undefined, value: undefined };
var prevCellVal3 = { cellId: undefined, value: undefined };
var prevCellVal4 = { cellId: undefined, value: undefined };
var prevCellVal5 = { cellId: undefined, value: undefined };
var prevCellVal6 = { cellId: undefined, value: undefined };
var prevCellVal7 = { cellId: undefined, value: undefined };

$( document ).ready(function() {
	$("#SYS_TYP").change(function() {
		dynamicSelect( 'usvBookLogTagAls.do', 'TAG_ALS', $('#SYS_TYP').val(), '' );
		$("#TAG_ALS option:eq(0)").remove();
		$("#TAG_ALS").prepend("<option value='' selected='selected'>전체</option>");
		$("#TAG_IDN").val("");
	});
	$("#TAG_ALS").change(function() {
		$("#TAG_IDN").val("");
	});
	$("#CHK").change(function() {
		if ($("#CHK").is(":checked"))
			alert("자료사전 표현은 검색 시간이 오래 걸릴 수 있습니다.");
	});
	$("#TAG_IDN").keypress(function(e) {
		if(e.keyCode==13) {
			fnSearch(); return false;
		}
	});
	
	// 4) 검색 목록 그리드 구성
	$("#gridArea").jqGrid({
		url: '/common/usvBookLogListXml.do'
		,datatype: "local"
		,colNames:["LOG_IDN","순번","구분","TAG_NAM","대장명","식별번호","상태","변경항목(화면)","변경항목(자료사전)","이전값","변경값","수정자","수정일시"]
	   	,colModel:[
			{name:'LOG_IDN',index:'LOG_IDN',xmlmap:'LOG_IDN', hidden:true}
			,{name:'LOG_NUM',index:'LOG_NUM',xmlmap:'LOG_NUM', align:'center', width: 30
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal1.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal1.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal1 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
			,{name:'SYS_TYP',index:'SYS_TYP',xmlmap:'SYS_TYP', align:'center', width: 40
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal2.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal2.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal2 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
			,{name:'TAG_NAM',index:'TAG_NAM',xmlmap:'TAG_NAM', hidden:true}
			,{name:'TAG_ALS',index:'TAG_ALS',xmlmap:'TAG_ALS', align:'center', width: 80
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal3.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal3.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal3 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
			,{name:'TAG_IDN',index:'TAG_IDN',xmlmap:'TAG_IDN', align:'center', width: 90
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal4.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal4.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal4 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
			,{name:'CUD_CDE',index:'CUD_CDE',xmlmap:'CUD_CDE', align:'center', width: 45
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal5.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal5.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal5 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
			,{name:'COL_ALS',index:'COL_ALS',xmlmap:'COL_ALS', align:'center', width: 100}
			,{name:'COL_ALS_META',index:'COL_ALS_META',xmlmap:'COL_ALS_META', align:'center', width: 100}
			,{name:'BEF_VAL',index:'BEF_VAL',xmlmap:'BEF_VAL', align:'center', width: 135}
			,{name:'AFT_VAL',index:'AFT_VAL',xmlmap:'AFT_VAL', align:'center', width: 135}
			,{name:'CHG_NAM',index:'CHG_NAM',xmlmap:'CHG_NAM', align:'center', width: 60
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal6.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal6.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal6 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
			,{name:'CHG_YMD',index:'CHG_YMD',xmlmap:'CHG_YMD', align:'center', width: 60
				,cellattr: function (rowId, val, rawObject, cm, rdata) {
                       var result;
                       if (prevCellVal7.value == rdata.LOG_IDN) {
                           result = ' style="display: none" rowspanid="' + prevCellVal7.cellId + '"';
                       }
                       else {
                           var cellId = this.id + '_row_' + rowId + '_' + cm.name;

                           result = ' rowspan="1" id="' + cellId + '"';
                           prevCellVal7 = { cellId: cellId, value: rdata.LOG_IDN };
                       }
                       return result;
                   }
			}
		]
		,height: "100"
	   	,sortname: 'LOG_IDN'
	    ,sortorder: "DESC"
	   	,rowNum: 100
	   	,rowList: [100,500,1000,100000000]
	    ,viewrecords: true
		,xmlReader: { root : "rows",row: "Item",repeatitems: false }
	   	,pager: jQuery('#gridPager')
	    ,rownumbers: true
	    ,loadtext: "검색 중입니다."
		,emptyrecords: "검색된 데이터가 없습니다."
		,recordtext: "총 {2} 건 데이터 ({0}-{1})"
		,ondblClickRow: function(rowId) {		// 더블클릭 처리
		}
	   	,onSelectRow: function(rowId) {		// 클릭 처리
			if( rowId != null ) {
				var rowData =$( "#gridArea" ).getRowData(rowId);
			}
		}
	   	,loadComplete: function() {
	   		$("option[value=100000000]").text("ALL");	
   		}
	   	,gridComplete: function () {
	        var grid = this;

	        $('td[rowspan="1"]', grid).each(function () {
	            var spans = $('td[rowspanid="' + this.id + '"]', grid).length + 1;

	            if (spans > 1) {
	                $(this).attr('rowspan', spans);
	                //$(this).css("backgroud-color", "white");
	            }
	        });	
	    }
		//,scroll : true
		,shrinkToFit : false
	}).navGrid('#gridPager',{edit:false,add:false,del:false,search:false,refresh:false});

	// 대장조회용 팝업 설정 처리 (클릭 이벤트...)	: 필수
	initViewScreen();
	
	// 팝업 화면 윈도우 설정 처리 (클릭 이벤트...)	: 필수
	$('#cntArea').css('width', $(window).width() - 50);
	$('#cntArea').css('height', $(window).height() - 140 );			
	$('#gridArea').jqGrid('setGridWidth', $(window).width() - 55); 
	$('#gridArea').jqGrid('setGridHeight', $(window).height() - 210);
				
	fnSearch();
});

// 검색 처리
function fnSearch() {
	if ($("#CHK").is(":checked")) 
		$("#MTA_CHK").val("1");
	else
		$("#MTA_CHK").val("0");
		
	prevCellVal1 = { cellId: undefined, value: undefined };
	prevCellVal2 = { cellId: undefined, value: undefined };
	prevCellVal3 = { cellId: undefined, value: undefined };
	prevCellVal4 = { cellId: undefined, value: undefined };
	prevCellVal5 = { cellId: undefined, value: undefined };
	prevCellVal6 = { cellId: undefined, value: undefined };
	prevCellVal7 = { cellId: undefined, value: undefined };
	
	$("#gridArea").jqGrid("setGridParam",{
		datatype: "xml"
		,page: 1
		,postData: $("#frm").cfSerializeObject()
		,mtype: "POST"
	}).trigger("reloadGrid");

	$("#CHK").attr("checked", false);
}
</script>
</head>
<body scroll="no">
<div id="frame_div" class='popup searchCondition'>
<form id="frm" name="frm" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="callBackFunction" name="callBackFunction" value=""/>
<input type="hidden" id="opener_id" name="opener_id" value=""/>
<input type="hidden" id="wnd_id" name="wnd_id" value=""/>
<input type="hidden" id="MTA_CHK" name="MTA_CHK" value=""/>
<section class="contents">
<ul class="entries">
    <li>
        <label>
            <span>구분</span>
			<select name="SYS_TYP" id="SYS_TYP">
				<option value="">전체</option>
				<option value="road" <c:if test = "${'road' == result.SYS_TYP}"> selected="selected" </c:if>>도로</option>
				<option value="water" <c:if test = "${'water' == result.SYS_TYP}"> selected="selected" </c:if>>상수</option>
				<option value="sewer" <c:if test = "${'sewer' == result.SYS_TYP}"> selected="selected" </c:if>>하수</option>
			</select>
        </label>
        <label>
            <span>대장명</span>
			<select name="TAG_ALS" id="TAG_ALS">
				<option value="">전체</option>
				<c:forEach var="selectData" items="${tag_als_list}">
				<option value="${selectData.TAG_ALS}" <c:if test = "${selectData.TAG_ALS == result.TAG_ALS}"> selected="selected" </c:if> >${selectData.TAG_ALS}</option>
				</c:forEach>
			</select>
        </label>
        <label for="ALS_MTA">
            <span>자료사전</span>
            <input type="checkbox" name="CHK" id="CHK" />
        </label>
        <label>
            <span style="width: 150px;">관리/공사번호</span>
            <input type="text" name="TAG_IDN" id="TAG_IDN" value="<c:out value="${result.TAG_IDN}"/>" class="MX_10 CS_10" />
        </label>
        <label>
        	<a href="javascript:fnSearch()"><img src="../images/popup/btn_search_search.png" alt="검색" class="vmiddle"></a>
        </label>
    </li>
</ul>
<div class="grid_popup" id="cntArea">
	<table id="gridArea"></table>
	<div id="gridPager"></div>
</div>
<div class="btns">
	<Strong><input type="button" value="닫기" onclick="cfWindowClose(  $('#wnd_id').val() );"></Strong>
</div>
</section>
</form>
</div>
<%@ include file="/common/include/common.jsp" %>
</body>
</html>
