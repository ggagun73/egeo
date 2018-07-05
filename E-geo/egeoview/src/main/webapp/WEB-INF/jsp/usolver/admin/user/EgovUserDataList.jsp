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
<script language="javascript1.2" type="text/javaScript" src="<c:url value='/js/usolver/admin/EgovMenuList.js' />"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script language="javascript1.2" type="text/javaScript">
var userId = "";
/* ********************************************************
 * 기능리스트 체크박스 이벤트
 ******************************************************** */
$(document).ready(function() {
 
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
			var topDiv = $(this).parent().prev();
			topDiv.find('input:checkbox')[0].checked = true;
		}else{
			
			selectEmt = ($(this).parent()).children('input:checkbox');
			
			for(var i=0; i<selectEmt.length; i++)
				if(selectEmt[i].checked) checked = true;
			
			if(!checked){	//소그룹 체크된게 없을때
				var topDiv = $(this).parent().prev();
				topDiv.find('input:checkbox')[0].checked = false;
			}
		}
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
 function functionCheck(_userId) {
	userId = _userId;

	$('input:checkbox:checked').each(function() {
		$("input:checkbox[name='functionTree']").prop("checked", false);
	});
	
	//초기화
	//for(var j=0; j<document.frm_manage.functionTree.length; j++) document.frm_manage.functionTree[j].checked = false;

	var _author = $("input:radio[name=author]:checked").val();
	data = {userId : userId, author:_author};
	$.ajax({
		type: 'get',
		dataType: 'json',
		data: data,
		url: '/admin/user/EgovUserFunctionSelect.do',
		success: function(_data) {
			
			if(_data.functionList.length == 0) alert('등록된 기능이 없습니다.');
			else{
				for(var i=0; i<_data.functionList.length; i++){
					for(var j=0; j<document.frm_manage.functionTree.length; j++){
						if(_data.functionList[i].lyrId == document.frm_manage.functionTree[j].value)
							document.frm_manage.functionTree[j].checked = true;
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
	var _author = $("input:radio[name=author]:checked").val();
	var data = {userId : userId, action : _sAction, author : _author};
	var functionList = new Array();
	var functionData = new Array();
	
	if(userId == ''){
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
		url: '/admin/user/EgovDataFunctionModify.do',
		success: function(_data) {
			alert(_data.message);
			userId = '';
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
	document.frm_manage.action = "<c:url value='/admin/user/EgovUserDataList.do'/>";
    document.frm_manage.submit();
}

</script>

</head>
<body>
<div id="W_900">
<form name="frm_manage" id="frm_manage" action="<c:url value='/admin/user/EgovUserDataList.do'/>" method="post">
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
        <!-- content start -->
		<div class="admin_content">  
			<div class="TitBx">사용자 데이터관리</div>                
            <div class="ContBx">
            	<div style="width: 326px; height: 410px; position: absolute;">
                    <div class="schbx">
	                    <div class="FR" >
	                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="${userSearchVO.searchKeyword}"  class="input"  onKeyDown="press()"/>
	                        <a href="#" class="Btn_sch" onClick="javascript:fn_search_list(1)">검색</a>
	                    </div>
	                </div>
                      <table class="tblist" summary="사용자 데이터관리">
					    <caption>사용자 데이터관리</caption>
					    <colgroup>
					        <col width="10%" />
					        <col width="20%" />
					        <col width="30%" />
					    </colgroup>
	                    <thead>
	                        <tr> 
					  	        <th>번호</th>
					  	        <th>사용자 ID</th>
					  	        <th>사용자 이름</th>
					        </tr>
	                    </thead>
					    <tbody>
					    	<c:forEach var="userList" items="${list_userlist}" varStatus="status">
						    <tr class="resultListHover">
	                            <td><c:out value="${(userSearchVO.pageIndex-1) * userSearchVO.pageSize + status.count}"/></td>
	                            <td><c:out value="${userList.userId}"/></a></td>
	                            <td><c:out value="${userList.userName}"/></td>
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
            <div class="admintree">                <!-- Tree_left -->
                <div class="FR" >
                	<input type="radio" id="author"  class="input"  name="author"  value="VIEW"  checked="true"  onClick="functionCheck(userId)")/>조회<input type="radio" class="input"  id="author" name="author" value="EDIT" onClick="functionCheck(userId)")/>편집
                </div>
               	<c:forEach var="layerInfo" items="${layerInfoList}" varStatus="status" >
					<input type="hidden" name="tmp_layerVal" value="${layerInfo.tmapid}|${layerInfo.layerGroup}|${layerInfo.groupName}|${layerInfo.id}|${layerInfo.table}|${layerInfo.theme}|${layerInfo.alias}|${layerInfo.seq}|${result.show}|${result.layerType}">
				</c:forEach>
                   <!-- <div class="Tree_left bg" style="height: 410px; width: 275px; overflow: scroll; position: relative; margin-left: 340px; margin-top: -478px;">  -->
                   <div id="layerTree" class="Tree_left bg" style="height: 400px; width: 290px; overflow: scroll; position: relative; margin-left: 340px;"> 
     	        	<script language="javascript" type="text/javaScript">
					    var Tree = new Array();
					    
						if( typeof document.frm_manage.tmp_layerVal !== 'undefined'  ){
							for (var j = 0; j < document.frm_manage.tmp_layerVal.length; j++) {
								Tree[j] = document.frm_manage.tmp_layerVal[j].value;
						    }
						    createTree2(Tree);
			            }else{
			                alert("메뉴가 존재하지 않습니다. 메뉴 등록 후 사용하세요.");
			            }
				</script>
                </div>
                <!-- //Tree_left -->
        	</div>
	        <div class="TreeBtBx" style="position: absolute; bottom: 0px; right: 35px;">
	        	<div class="Btn"><a href="#" class="Btn_blue" onClick="modifyFunction('CODE_UPDATE')">저장</a></div>
	            <div class="Btn"><a href="#" class="Btn_blue" onClick="modifyFunction('CODE_DELETE')">삭제</a></div>
	        </div>
	</div>
</form>
</div>
</body>
</html>