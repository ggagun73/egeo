<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovMenuCreat.jsp
  * @Description : 메뉴생성 화면
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.03.10    이용          최초 생성
  *
  *  @author 공통서비스 개발팀 이용
  *  @since 2009.03.10
  *  @version 1.0
  *  @see
  *
  */

  /* Image Path 설정 */
//  String imagePath_icon   = "/images/egovframework/com/admin/menu/icon/";
//  String imagePath_button = "/images/egovframework/com/admin/menu/button/";
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>메뉴생성</title>
<script type="text/javascript">
var imgpath = "<c:url value='/images/egovframework/com/cmm/utl/'/>";
</script>
<script language="javascript1.2" type="text/javaScript" src="<c:url value='/js/usolver/admin/EgovMenuList.js' />"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script language="javascript1.2" type="text/javaScript">

var authorCode = '';	
var treeType = 'data';
var BASIC, WATER, SEWER, ROAD;

/* ********************************************************
 * 
 *
 * 조회 함수
 ******************************************************** */
function selectMenuCreatTmp() {
    document.frm_manage.action = "<c:url value='/admin/menu/EgovMenuCreatSelect.do'/>";
    document.frm_manage.submit();
}

/* ********************************************************
 * 멀티입력 처리 함수
 ******************************************************** */
function fInsertMenuCreat() {
    var checkField = document.frm_manage.checkField;
    var checkMenuNos = "";
    var checkedCount = 0;
    if(checkField) {
    	if(checkField.length > 1) {
            for(var i=0; i < checkField.length; i++) {
                if(checkField[i].checked) {
                    checkMenuNos += ((checkedCount==0? "" : ",") + checkField[i].value);
                    checkedCount++;
                }
            }
        } else {
            if(checkField.checked) {
                checkMenuNos = checkField.value;
            }
        }
    }
    if(checkedCount == 0){
        alert("선택된 메뉴가 없습니다.");
        return false;
    }
    document.frm_manage.checkedMenuNoForInsert.value=checkMenuNos;
    document.frm_manage.checkedAuthorForInsert.value=document.frm_manage.authorCode.value;
    document.frm_manage.action = "<c:url value='/admin/menu/EgovMenuCreatInsert.do'/>";
    document.frm_manage.submit();
}
/* ********************************************************
 * 메뉴사이트맵 생성 화면 호출
 ******************************************************** */
function fMenuCreatSiteMap() {
	id = document.frm_manage.authorCode.value;
	window.open("<c:url value='/admin/menu/EgovMenuCreatSiteMapSelect.do'/>?authorCode="+id,'Pop_SiteMap','scrollbars=yes, width=550, height=700');
}

/* ********************************************************
 * 기능리스트 체크박스 이벤트
 ******************************************************** */
$(document).ready(function() {
	
	$('#systemType').val("${systemType}").prop('selected', true);
	
	$("input:checkbox").on('click', function() {
		
		var childCheck;
		var chkTop, divTop;
		var bool, checked;
		var selectEmt, selectVal, selectId;
		
		if($(this).prop('checked')) bool = true;
		else bool = false;
		
		if($(this).prev().prop("tagName") == 'A'){	// 하위 메뉴 있음
			childCheck = $('#div'+$(this).val()).find('input:checkbox');
			
			for(var i=0; i<childCheck.length; i++){
				childCheck[i].checked = bool;
			}
			if($('#layerTree').is(':visible')) return 0;
		}
		
		if(bool){
			if($('#dataTree').is(':visible')){
				for(var i=0; i<$(this).parents('div').length; i++){
					
					selectEmt = $(this).parents('div').eq(i);
					selectId = selectEmt.attr('id');
				
					
					if(selectId != undefined){
						if(selectEmt.attr('id').indexOf('div') != -1){
					
							selectVal = selectEmt.attr('id').substring(3);
							
							for(var j=0; j<selectEmt.prevAll('input:checkbox').length; j++){
								var tmpChk = selectEmt.prevAll('input:checkbox').eq(j);
								
								if(tmpChk.val() == selectVal) tmpChk[0].checked = bool;
							}
						}
					}
				}
			}else{
				var topDiv = $(this).parent().prev();
				topDiv.find('input:checkbox')[0].checked = true;
			}
		}else{
			if($('#dataTree').is(':visible')){
				selectEmt = ($(this).parent()).children('input:checkbox');
				
				for(var i=0; i<selectEmt.length; i++)
					if(selectEmt[i].checked) checked = true;
				
				
				if(!checked){	//소그룹 체크된게 없을때
						
					selectEmt = $(this).parents('div').eq(0);
					selectId = selectEmt.attr('id');
					
					if(selectId != undefined){
						if(selectEmt.attr('id').indexOf('div') != -1){
					
							selectEmt.prevAll('input:checkbox')[0].checked = bool;
							
							
							for(var j=0; j<selectEmt.parent().find('div').length; j++){
								
								var tmpChk = selectEmt.parent().find('div').eq(j);
					
								if(tmpChk.prevAll('input:checkbox')[0].checked) checked = true;
							}
						}
					}
				}
				
				if(!checked){	//상위그룹 체크된게 없을때
					selectId = selectEmt.parent().attr('id');
					if(selectId != undefined && selectId != 'dataTree' && selectId != 'layerTree')
						selectEmt.parent().prevAll('input:checkbox')[0].checked = bool;
				}
			}else{
				
				selectEmt = ($(this).parent()).children('input:checkbox');
				
				for(var i=0; i<selectEmt.length; i++)
					if(selectEmt[i].checked) checked = true;
				
				if(!checked){	//소그룹 체크된게 없을때
					
					var topDiv = $(this).parent().prev();
					topDiv.find('input:checkbox')[0].checked = false;
				}
			}
		}
	});
	
	
    $('#systemType').change(function(){
    	location.href = "/admin/menu/EgovMenuCreatSelect.do?systemType="+$(this).val();
    	
    });
    
    $(".resultListHover").hover(
			function(){
				$(this).css("background-color", "rgb(235,242,254)");
				$(this).css("cursor", "pointer");
			}, function(){
				$(this).css("background-color", "white");
				$(this).css("cursor", "default");
			}
	);
	$(".resultListHover").click(function(){
		$(".resultListHover").children().css("background-color", "white");
		$(this).children().css("background-color", "#fbb750");
		var requstId = $(this).children().eq(1).text().trim();
		functionCheck(requstId);
	});
});

/* ********************************************************
 * 기능리스트 초기화 함수
 ******************************************************** */
 function functionCheck(_authorCode) {
	authorCode = _authorCode;
	var layerId = BASIC;
	
	if(authorCode.indexOf('MAP') == -1){
		treeType = 'data';
		$('#dataTree').css({'display' : ''});
		$('#layerTree').css({'display' : 'none'});
	}else{
		treeType = 'map';
		$('#layerTree').css({'display' : ''});
		$('#dataTree').css({'display' : 'none'});
		
		for(var i=0; i<2; i++){
			$('#top'+layerId).css({'display' : ''});
			$('#div'+layerId).css({'display' : ''});
			
			if("${systemType}" == 'WATER') layerId = WATER;
			else if("${systemType}" == 'SEWER') layerId = SEWER;
			else if("${systemType}" == 'ROAD') layerId = ROAD;
		}
	}
	
	//초기화
	for(var j=0; j<document.frm_manage.functionTree.length; j++) document.frm_manage.functionTree[j].checked = false;
	
	data = {authorCode : authorCode, treeType : treeType};
	$.ajax({
		type: 'get',
		dataType: 'json',
		data: data,
		url: '/admin/menu/EgovMenuFunctionSelect.do',
		success: function(_data) {
			
			if(_data.functionList.length == 0) alert('등록된 기능이 없습니다.');
			else{
				for(var i=0; i<_data.functionList.length; i++){
					for(var j=0; j<document.frm_manage.functionTree.length; j++){
						if(treeType == 'data'){
							if(_data.functionList[i].menuno == document.frm_manage.functionTree[j].value)
								document.frm_manage.functionTree[j].checked = true;
						}else{
							if(_data.functionList[i].lyrid == document.frm_manage.functionTree[j].value)
								document.frm_manage.functionTree[j].checked = true;
						}
					}
				}
			}
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
}

/* ********************************************************
 * 기능 수정/삭제 처리 함수
 ******************************************************** */
function modifyFunction(_sAction) {
	var data = {authorCode : authorCode, action : _sAction, treeType : treeType};
	var functionList = new Array();
	var functionData = new Array();
	
	if(authorCode == ''){
		alert('사용자 ID 를 선택해 주세요.');
		return false;
	}
	
	if(_sAction === 'CODE_UPDATE'){
		
		$('input:checkbox:checked').each(function() {
		       functionData.push($(this).val());
		});
		functionList = {functionList : functionData};
		
		$.extend(data,functionList);
	}
	
    jQuery.ajaxSettings.traditional = true;

	$.ajax({
		type: 'get',
		dataType: 'json',
		data: data,
		url: '/admin/menu/EgovMenuFunctionModify.do',
		success: function(_data) {
			alert(_data.message);
			authorCode = '';
			location.reload(); 
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
	
}

function fn_search_list(page){
	document.frm_manage.pageIndex.value = page;
	document.frm_manage.action = "<c:url value='/admin/menu/EgovMenuCreatSelect.do'/>";
    document.frm_manage.submit();
}
</script>

</head>
<body>
<div id="W_900">
<form name="frm_manage" method="post">
<input name="checkedMenuNoForInsert" type="hidden" >
<input name="checkedAuthorForInsert" type="hidden" >
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
        <!-- content start -->
		<div class="admin_content">  
			<div class="TitBx">권한별 메뉴관리</div>                
            <div class="ContBx">
            	<div style="width: 336px; height: 410px; position: absolute;">
            		<div class="schbx">
	                    <div class="FR" >
	                    	<span style="color: cornflowerblue;">* 시스템 변경</span>
	                        <select name="systemType"  id="systemType"  class="select" style="width: 109px;" title="시스템종류">
					    		<option value="WATER">상수</option>
					    		<option value="SEWER">하수</option>							    					    		
					    		<option value="ROAD">도로</option>
					      	</select>
	                    </div>
	                </div>
                      <table class="tblist" summary="권한에 따른 메뉴관리">
					    <caption>권한에 따른 메뉴관리</caption>
					    <colgroup>
					        <col width="5%" />
					        <col width="20%" />
					        <col width="30%" />
					    </colgroup>
	                    <thead>
	                        <tr> 
					  	        <th>번호</th>
					  	        <th>권한 ID</th>
					  	        <th>권한이름</th>
					        </tr>
	                    </thead>
					    <tbody>
					    	<c:forEach var="authorList" items="${authorList}" varStatus="status">
						    <tr class="resultListHover">
	                            <td><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}"/></td>
	                            <td><c:out value="${authorList.authorcode}"/></td>
	                            <td><c:out value="${authorList.authornm}"/></td>
	                        </tr>
	                        </c:forEach>
	                         <c:if test="${paginationInfo.totalRecordCount eq 0}">
	                         <tr>
	                         	<td colspan="4">조회된 데이터가 없습니다. </td>
	                         </tr>
	                         </c:if>
					    </tbody>
				    </table>
                <div class="PagingBx">
            	    <div class="Paging_tx">총 건수 : <span><c:out value="${paginationInfo.totalRecordCount}"/></span>건</div> 
                    <c:if test="${paginationInfo.totalRecordCount ne 0}">
						<ul class="pages">
							<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fnLinkPage" />
						</ul>
					</c:if> 
					<input type="hidden" id="pageIndex" name="pageIndex" value="${paginationInfo.currentPageNo}" />                  
                </div>
            </div>
            <div class="admintree">
                <!-- Tree_left -->
                	<c:forEach var="result" items="${list_menulist}" varStatus="status" >
						<input type="hidden" name="tmp_menuNmVal" value="${result.menuno}|${result.uppermenuno}|${result.menunm}|${result.menuordr}|${result.progrmfilenm}|${result.menudc}|${result.relateimagepath}|${result.relateimagenm}|${result.functionlist}|${result.menuid}|${result.width}|${result.height}|${result.insertheight}|${result.call}|${result.keycolumn}|${result.menutype}">
					</c:forEach>
                    <div id="dataTree" class="Tree_left bg" style="height: 412px; width: 290px; overflow: scroll; position: relative; margin-left: 340px;"> 
      	        	<script language="javascript" type="text/javaScript">
						    var chk_Object = true;
						    var chk_browse = "";
							if (eval(document.frm_manage.req_RetrunPath)=="[object]") chk_browse = "IE";
							if (eval(document.frm_manage.req_RetrunPath)=="[object NodeList]") chk_browse = "Fox";
							if (eval(document.frm_manage.req_RetrunPath)=="[object Collection]") chk_browse = "safai";
				
							var Tree = new Array;
							if(chk_browse=="IE"&&eval(document.frm_manage.tmp_menuNmVal)!="[object]"){
							   alert("메뉴 목록 데이타가 존재하지 않습니다.");
							   chk_Object = false;
							}
							if(chk_browse=="Fox"&&eval(document.frm_manage.tmp_menuNmVal)!="[object NodeList]"){
							   alert("메뉴 목록 데이타가 존재하지 않습니다.");
							   chk_Object = false;
							}
							if(chk_browse=="safai"&&eval(document.frm_manage.tmp_menuNmVal)!="[object Collection]"){
								   alert("메뉴 목록 데이타가 존재하지 않습니다.");
								   chk_Object = false;
							}
							if( chk_Object ){
								for (var j = 0; j < document.frm_manage.tmp_menuNmVal.length; j++) {
									Tree[j] = document.frm_manage.tmp_menuNmVal[j].value;
							    }
								
								createTree(Tree, 'checkBox');
				            }else{
				                alert("메뉴가 존재하지 않습니다. 메뉴 등록 후 사용하세요.");
				            }
					</script>
                    </div>
                    <c:forEach var="layerInfo" items="${layerInfoList}" varStatus="status" >
					<input type="hidden" name="tmp_layerVal" value="${layerInfo.tmapid}|${layerInfo.layerGroup}|${layerInfo.groupName}|${layerInfo.id}|${layerInfo.table}|${layerInfo.theme}|${layerInfo.alias}|${layerInfo.seq}|${result.show}|${result.layerType}">
					</c:forEach>
                    <div id="layerTree" class="Tree_left bg" style="height: 410px; width: 290px; overflow: scroll; position: relative; margin-left: 340px; display: none;"> 
	      	        	<script language="javascript" type="text/javaScript">
		      	        	var chk_Object = true;
						    var chk_browse = "";
							if (eval(document.frm_manage.req_RetrunPath)=="[object]") chk_browse = "IE";
							if (eval(document.frm_manage.req_RetrunPath)=="[object NodeList]") chk_browse = "Fox";
							if (eval(document.frm_manage.req_RetrunPath)=="[object Collection]") chk_browse = "safai";
				
							var Tree = new Array;
							if(chk_browse=="IE"&&eval(document.frm_manage.tmp_layerVal)!="[object]"){
							   alert("메뉴 목록 데이타가 존재하지 않습니다.");
							   chk_Object = false;
							}
							if(chk_browse=="Fox"&&eval(document.frm_manage.tmp_layerVal)!="[object NodeList]"){
							   alert("메뉴 목록 데이타가 존재하지 않습니다.");
							   chk_Object = false;
							}
							if(chk_browse=="safai"&&eval(document.frm_manage.tmp_layerVal)!="[object Collection]"){
								   alert("메뉴 목록 데이타가 존재하지 않습니다.");
								   chk_Object = false;
							}
							if( chk_Object ){
								for (var j = 0; j < document.frm_manage.tmp_layerVal.length; j++) {
									Tree[j] = document.frm_manage.tmp_layerVal[j].value;
							    }
							    var layerId = createTree2(Tree, 'none');
							   
							    BASIC = layerId.BASIC;
							    WATER = layerId.WATER;
							    SEWER = layerId.SEWER;
							    ROAD = layerId.ROAD;
				            }else{
				                alert("메뉴가 존재하지 않습니다. 메뉴 등록 후 사용하세요.");
				            }
						</script>
                    </div>
                    <!-- //Tree_left -->     
        </div>
        <div class="TreeBtBx" style="position: relative; margin-top: -5px; right: 0px;">
        	<div class="Btn"><a href="#" class="Btn_blue" onClick="modifyFunction('CODE_UPDATE')">저장</a></div>
            <div class="Btn"><a href="#" class="Btn_blue" onClick="modifyFunction('CODE_DELETE')">삭제</a></div>
        </div>
	</div>
<input type="hidden" name="tmp_SearchElementName" value="">
<input type="hidden" name="tmp_SearchElementVal" value="">
<input type="hidden" name="tmp_CheckVal" value="">
</form>
</div>
</body>
</html>

