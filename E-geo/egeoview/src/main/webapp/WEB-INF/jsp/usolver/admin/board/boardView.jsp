<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>공지사항관리</title>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javaScript" language="javascript" defer="defer">
$( document ).ready(function() {
	// 1 )달력			
	fn_create_datepicker("frm_manage", "REGIST_DATE" , 10);
	
	fn_init_formObject("frm_manage");				
	
	<c:if test="${result.IDX eq null}">
		$(".insertHidden").hide();
		$("#btnDelete").hide();
		$("#WRITE_ID").val('<c:out value="${user.USER_NAME}"/>');
	</c:if>
	
});

function fn_go_list() {
	$("#frm_manage").attr("action", "/admin/board/boardList.do");
	$("#frm_manage").submit();
}

function fn_save_board() {	
	if ($("#TITLE_TEXT").val() == "") {
		alert("제목을 입력하시기 바랍니다.");
		return;
	}
	if ($("#BODY_TEXT").val() == "") {
		alert("내용을 입력하시기 바랍니다.");
		return;
	}	
	var arrCheckedRegNo = new Array();
	$("input[name=chkRegNo]:checkbox").each(function(){
		if ($(this).prop("checked")) arrCheckedRegNo.push($(this).val());
	});
	$("#REGSTR_MANAGE_NO").val(arrCheckedRegNo.join());
	$("#frm_manage").attr("action", "/admin/board/boardWriteProc.do");
	$("#frm_manage").submit();
}

function fn_delete_board() {
	if (!confirm("삭제하시겠습니까?")) return;
	$("#frm_manage").attr("action", "/admin/board/boardDeleteProc.do");
	$("#frm_manage").submit();
}

var index=0;
function fn_add_file(){
	var fileCount = Number($("#FILE_COUNT").val());
	
	var totalCount = index+fileCount;
	
    if( totalCount >= 10) 
   	{    	
   		alert("파일은 10개이상 입력할 수 없습니다");
   		return false;
   	}
    var fileTable = $("#fileTable");
	var str = "";
    str += "<div>";
    str += "<input id='fileName"+index+"' readonly style=\"float: left; width: 300px; height:20px; font-size: 12px; top: 10px; border-width: 0.5px;\" type='text'>";
    str += "<div style='position: relative; overflow: hidden;' >";
    str += "<div class='Btn'><a href='#' class='Btn_gray2'>첨부파일</a></div>";
    str += "<input type=\"file\" id='FILE"+index+"' name='FILES["+index+"]' size='20' onchange=\"javascript: document.getElementById('fileName"+index+"').value = this.value\" style='font-size: 45px; position: absolute; right: 0px; top: 0px; opacity: 0;'>";
    str += "</div>";
    str += "</div>";    
    
    index++;
    fileTable.append(str);
}

</script>
</head>
<body>
<div id="W_900">
<form id="frm_manage"  name="frm_manage"  action="<c:url value='/admin/board/boardList.do'/>"  method="post" enctype="multipart/form-data">
<input type="hidden" id="EDIT_ID" name="EDIT_ID" value="${user.USER_NAME}" />
<input type="hidden" id="REGSTR_MANAGE_NO" name="REGSTR_MANAGE_NO" value="" />
<input type="hidden" id="FILE_COUNT"  name="FILE_COUNT"  value="${FILE_COUNT}" />
<input type="hidden" id="IDX" name="IDX"  value="${result.IDX}" />
		<!-- favorite -->
    <div id="admin">
        <%@ include file="/common/include/include_admin.jsp" %>
        <div class="admin_content">
        	<div class="TitBx">
            	공지사항
            </div>
            <div class="ContBx">
                <table class="tbview" summary="공지사항">
				    <caption>공지사항</caption>
				    <colgroup>
					    <col width="15%" /><col width="35%" /><col width="15%" /><col width="35%" />
				    </colgroup>
				    <tbody>
					    <tr class="insertHidden">
						    <th>번호 </th>
						    <td ><c:out value="${result.IDX}"/></td>
						    <th>조회수</th>
						    <td><c:out value="${empty result.HIT ? 0:result.HIT}"/></td>
					    </tr>
                        <tr>
						    <th>게시자 <span class="orange">*</span></th>
						    <td><input name="WRITE_ID" id="WRITE_ID"  value='<c:out value="${empty result.WRITE_ID ?  user.USER_NAME : result.WRITE_ID}"/>'  class="input MX_20 CS_20"  readOnly /></td>
                            <th>게시일</th>
						    <td><input class="input" name="REGIST_DATE" id="REGIST_DATE" style="width: 153px;" value='<c:out value="${result.REGIST_DATE}"/>' /></td>
					    </tr>
                        <tr>
						    <th>제목 <span class="orange">*</span></th>
						    <td colspan="3"><input name="TITLE_TEXT" id="TITLE_TEXT"  style="width:375px;" value='<c:out value="${result.TITLE_TEXT}"/>'   class="input MX_200 CS_200"  /></td>
					    </tr>
                        <tr>
						    <th>내용 <span class="orange">*</span></th>
						    <td colspan="3"><textarea id="BODY_TEXT" name="BODY_TEXT" rows="15" cols="80" ><c:out value="${result.BODY_TEXT}"/></textarea></td>
					    </tr>
                        <tr>
						    <th>첨부파일</th>
						    <td id="fileTable"  colspan="3">
						    	<c:forEach var="file" items="${fileList}" varStatus="status">
									<label>삭제&nbsp;<input name="chkRegNo" type="checkbox" value="${file.FILE_NO}" /><a href="/admin/file/fileDownload.do?FILE_NO=${file.FILE_NO}&amp;TYPE=Board">${fn:substring(file.FILE_NAME,13,100)}</a><br/>
								</c:forEach>
						    	<div class="Btn"><a href="#" class="Btn_gray2"   onclick="fn_add_file(); return false;">추가</a></div>						    	
						    </td>
					    </tr>
				    </tbody>
			    </table>
                <div class="TreeBtBx">                    
                    <div class="Btn"><a href="#" class="Btn_blue"  onClick="javascript:fn_save_board();" target="_self">저장</a></div>
                    <c:if test="${!empty result.IDX}">
            	    	<div class="Btn"><a href="#" class="Btn_blue"  id="btnDelete" onclick="javascript:fn_delete_board();" target="_self">삭제</a></div>
            	    </c:if>
            	    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_go_list()" target="_self">목록</a></div>
                </div>
            </div>
        </div>
    </div>
    <!-- // favorite -->
 </form>
</div>  
</body>
</html>