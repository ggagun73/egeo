<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovFileNmSearch.jsp
  * @Description : 프로그램파일명 검색 화면
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.03.10    이용          최초 생성
  *   2011.10.18    서준식       프로그램파일명 검색 결과를 부모창으로 넘겨주는 자바스크립트 수정(브라우저 호환성 문제로 수정함)
  *  @author 공통서비스 개발팀 이용
  *  @since 2009.03.10
  *  @version 1.0
  *  @see
  *
  */
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jqgrid/css/ui.jqgrid.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/window/css/jquery.window.css'/>"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/reset.css"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/popup.css"/>
<title>프로그램파일 찾기</title>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jqgrid/js/i18n/grid.locale-kr.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jqgrid/js/jquery.jqGrid.js'/>"></script>
<script language="javascript1.2"  type="text/javaScript">

// 페이지 로딩 초기 설정
$( document ).ready(function() {
	
	$('.activeWindow').find("#gridSearchIdn").jqGrid({
		url:  "/admin/program/EgovProgramListSearchXml.do"	
		,datatype: "local"
		,colNames:[ '프로그램명','프로그램파일명','URL']
		,colModel:[		   		
		   		{name:'progrmKoreanNm',index:'progrmKoreanNm', xmlmap:'progrmKoreanNm' , width:120, align:'center',resizable:true},
		   		{name:'progrmFileNm',index:'progrmFileNm', xmlmap:'progrmFileNm' , width:'160px', align:'left', resizable:true },	
		   		{name:'url',index:'url', xmlmap:'url' , width:200, align:'left',resizable:true}
		   	]
		,sortname: 'progrmKoreanNm'
	    ,sortorder: "DESC"
	    ,rowNum: 100
		,rowList:  [100,500,1000,100000000]
		,viewrecords: true
		,xmlReader: { root : "rows",row: "Item",repeatitems: false }
		,rownumbers: false
	    ,loadtext: "검색 중입니다."
		,emptyrecords: "<div class='Paging_tx'>검색된 데이터가 없습니다.</div>"
		,recordtext: "<div class='Paging_tx'>총 <span> {2}</span>건 데이터 ({0}-{1})</div>"
		,ondblClickRow: function(rowId) {	// 더블클릭 처리						
			sRowData =$("#gridSearchIdn").getRowData(rowId); 
			var vFileNm = sRowData["progrmFileNm"];	
			choisProgramListSearch(vFileNm);
		}
	   	,loadComplete: function() { $("option[value=100000000]").text("ALL"); }
		,height: 300
		,width: 550
		,autowidth:false
		,shrinkToFit:true
		,pager: jQuery('#gridSearchIdnPager')
	}).navGrid('#gridSearchIdnPager',{edit:false,add:false,del:false,search:false,refresh:false});
	
	$("#gridSearchIdnPager_left").width(240);
	
	fn_gridSearch();
	
			
});
/* ********************************************************
 * 페이징 처리 함수
 ******************************************************** */
 function fn_gridSearch(){
	 	$('.activeWindow').find('#gridSearchIdn').jqGrid("setGridParam",{
			datatype: "xml"
			,page: 1
			,mtype: "POST"
		}).trigger("reloadGrid"); 
}


function linkPage(pageNo){
	document.progrmManageForm.pageIndex.value = pageNo;
	document.progrmManageForm.action = "<c:url value='/admin/program/EgovProgramListSearch.do'/>";
	document.progrmManageForm.submit();
}

/* ********************************************************
 * 조회 처리 함수
 ******************************************************** */
function selectProgramListSearch() {
	document.progrmManageForm.pageIndex.value = 1;
	document.progrmManageForm.action = "<c:url value='/admin/program/EgovProgramListSearch.do'/>";
	document.progrmManageForm.submit();
}

/* ********************************************************
 * 프로그램목록 선택 처리 함수
 ******************************************************** */
function choisProgramListSearch(vFileNm) {
    $('#ifrMap').contents().find('#progrmFileNm').val(vFileNm);		
    window.parent.BOOK.fn_close_window();
}

</script>
</head>
<body>
<form name="progrmManageForm" action ="<c:url value='/admin/program/EgovProgramListSearch.do'/>" method="post">
<div id="admin">
	<div class="admin_content"  style="width:560px;">
		<div class="TitBx" style="width:545px;">프로그램파일 찾기</div>
			<%-- 
			<div class="schbx">
				<div class="FR" style="margin-left: 100px;">
					<input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="" class="input" onKeyDown="press()"/>
					<a href="#" class="Btn_sch" onClick="selectProgramListSearch()">검색</a>
				</div>
			</div>			                
			<table width="450" border="0" cellspacing="0" cellpadding="0">
			<tr><td height="10">&nbsp;</td></tr>
			</table>			
			<table class="tblist" width="450" cellpadding="8" align="center" style="font-size: 15px;">
				<caption style="visibility:hidden; font-size:0; height:0; margin:0; padding:0; line-height:0;">프로그램파일명 검색</caption>
				<thead>
					<tr>
						<th class="title" width="33%" scope="col">프로그램파일명</th>
						<th class="title" width="33%" scope="col">프로그램명</th>
						<th class="title" width="33%" scope="col">URL</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="result" items="${list_progrmmanage}" varStatus="status">
					<tr>
						<td class="lt_text3">
							<span class="link"><a href="#LINK" onclick="choisProgramListSearch('<c:out value="${result.progrmFileNm}"/>'); return false;">
							<c:out value="${result.progrmFileNm}"/></a></span>
						</td>
						<td class="lt_text3"><c:out value="${result.progrmKoreanNm}"/></td>
						<td class="lt_text3"><c:out value="${result.url}"/></td>
					</tr>
					</c:forEach>
				</tbody>
			</table>
			<div class="PagingBx">
				<div class="Paging_tx">총 건수 : <span><c:out value="${paginationInfo.totalRecordCount}"/></span>건</div> 
				<c:if test="${paginationInfo.totalRecordCount ne 0}">
				<ul class="pages" style="list-style: none;">
					<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="linkPage" />						
				</ul>
				</c:if>                    
				<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>"/>
			</div> --%>
			<div class="PSection3">              
	          <div class="TableBx2" >    
		          <div class="Table_list2">
		            	<table id='gridSearchIdn'></table>
		            	<div id="gridSearchIdnPager"></div>
		            </div>
				</div>
			<div class="btnTline"><!--버튼구분자--></div>			
			<div class="TreeBtBx">
        	    <div class="Btn"><a href="#" class="Btn_blue" onClick="window.parent.BOOK.fn_close_window()">닫기</a></div>
            </div>
		</div>
</div>
</div>
</form>
</body>
</html>