<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%

/**
 * @Class Name : EgovRoleHierarchyManage.java
 * @Description : EgovRoleHierarchyManage.jsp
 * @Modification Information
 * @
 * @  수정일                    수정자                수정내용
 * @ ---------     --------    ---------------------------
 * @ 2009.02.01    lee.m.j     최초 생성
 *
 *  @author lee.m.j
 *  @since 2009.03.21
 *  @version 1.0
 *  @see
 *
 */

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>롤 상하관계관리</title>
<script type="text/javaScript" language="javascript" defer="defer">

function fn_select_roleList(pageNo){
    document.frm_manage.pageIndex.value = pageNo;
    document.frm_manage.action = "<c:url value='/admin/role/EgovRoleList.do'/>";
    document.frm_manage.submit();
}

function fn_select_role(roleCode) {
    document.frm_manage.roleCode.value = roleCode;
    document.frm_manage.action = "<c:url value='/admin/role/EgovRole.do'/>";
    document.frm_manage.submit();
}

function fn_save_roleHierarchy() {
	
	if(document.listForm.parentRole.value == ''){
		alert("등록되지 않은 권한이 없습니다.");	
	}else{
		document.frm_manage.action = "<c:url value='/admin/role/EgovRoleHierarchyInsert.do'/>";
	    document.frm_manage.submit();
	}
}

function fn_delete_roleHierarchy() {
	if(fncManageChecked()) {
        if(confirm("삭제하시겠습니까?")) {
            document.frm_manage.action = "<c:url value='/admin/role/EgovRoleListDelete.do'/>";
            document.frm_manage.submit();
        }
    }
}

function fncAddRoleView() {
    document.frm_manage.action = "<c:url value='/admin/role/EgovRoleUpdate.do'/>";
    document.frm_manage.submit();
}

function fnLinkPage(pageNo){
    document.frm_manage.pageIndex.value = pageNo;
    document.frm_manage.action = "<c:url value='/admin/role/EgovRoleList.do'/>";
    document.frm_manage.submit();
}

function fn_layer_open(){
	$("#roleHierarchyEdit").show();
}

function fn_layer_close(){
	$("#roleHierarchyEdit").hide();
}

</script>
<body>
<div id="W_900">
	<!-- favorite -->
<form name="frm_manage"  id="frm_manage"  method="post">
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
		<div class="admin_content">
        	<div class="TitBx">
            	권한 상하관계 관리
            </div>
            <div class="ContBx">
            	<table class="tblist" summary="롤 상하관계">
				    <caption>권한 상하관계</caption>
				    <colgroup>
					    <col width="" />
				        <col width="" />
				    </colgroup>
                    <thead>
                        <tr> 
				  	        <th>상위 권한</th>
				  	        <th>하위 권한</th>
				        </tr>
                    </thead>
                    <tbody>
				    <c:forEach var="resultList" items="${roleHierachyList}" varStatus="status">
					<tr>
						<td>${resultList.childAuthor}</td>
						<td>${resultList.parentAuthor}</td>			
					</tr>
					</c:forEach>
					</tbody>
				     <c:if test="${paginationInfo.totalRecordCount eq 0}">
				    <tr>
						<td colspan="2">조회된 데이터가 없습니다.</td>
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
                <div class="TreeBtBx">
                	<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_layer_open()">등록</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_layer_open()">목록</a></div>
                </div>
            </div>
        </div>
    </div>
    <!-- // favorite -->
    <div id="roleHierarchyEdit"  class="layer_pop" style="width:400px;top:150px;left:150px;display:none">
		<div class="stit">롤 상하관계 편집</div>
		<table class="tbview" summary="롤 상하관계 편집">
			<caption>롤 상하관계 편집</caption>
			<colgroup>
				<col width="30%" /><col width="70%" />
			</colgroup>
		 	<tbody>
			  <tr>
		   		<th>상위 롤</th>
		   		<td><select id="childAuthor" name="childAuthor" style="width:200px; white-space:nowrap;  border:1px solid #d3d3d3; vertical-align:top; height:20px;" title="상위롤 선택">
						<c:if test="${fn:length(authorList) == 0}">
						<option><spring:message code="common.nodata.msg" /></option>				
						</c:if>
						<c:forEach var="author" items="${authorList}" varStatus="status">
							<option value="${author.authorCode}">${author.authorCode}</option>      
						</c:forEach>
					 </select>
			  </tr>
			  <tr>
		  		<th>하위 롤</th>
		   		<td><select id="parentAuthor" name="parentAuthor" style="width:200px; white-space:nowrap;  border:1px solid #d3d3d3; vertical-align:top; height:20px;" title="하위롤 선택">
						<c:if test="${fn:length(noHierarchyList) == 0}">
						<option value="">상하관계를 등록할 새 권한이 없습니다.</option>				
						</c:if>
						<c:forEach var="noHierachy" items="${noHierarchyList}" varStatus="status">
							<option value="${noHierachy}">${noHierachy}</option>      
						</c:forEach>
					</select>
		   		</td>
			  </tr>
			 </tbody>
		</table>
		<div class="TreeBtBx">
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_save_roleHierarchy()">저장</a></div>
			<div class="Btn"><a href="#" class="Btn_blue"  id="btnDomaindelete"  onClick="fn_delete_roleHierarchy()">삭제</a></div>
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_layer_close()">닫기</a></div>
		</div>
	</div>
</form>
</div>
</body>
</html>
