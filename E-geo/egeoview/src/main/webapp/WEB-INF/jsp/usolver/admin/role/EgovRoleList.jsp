<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%

/**
 * @Class Name : EgovRoleManage.java
 * @Description : EgovRoleManage jsp
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
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>롤관리</title>

<script type="text/javaScript" language="javascript" defer="defer">
<!--
function fn_search_list(pageNo){
    document.frm_manage.pageIndex.value = pageNo;
    document.frm_manage.action = "<c:url value='/admin/role/EgovRoleList.do'/>";
    document.frm_manage.submit();
}

function fn_select_role(roleCode) {
    document.frm_manage.roleCode.value = roleCode;
    document.frm_manage.action = "<c:url value='/admin/role/EgovRoleView.do'/>";
    document.frm_manage.submit();
}

function fn_delete_roleList() {
	if(fnManageChecked()) {
        if(confirm("삭제하시겠습니까?")) {
            document.frm_manage.action = "<c:url value='/admin/role/EgovRoleDeleteProc.do'/>";
            document.frm_manage.submit();
        }
    }
}

-->
</script>
</head>
<body>
<div id="W_900">
<form name="frm_manage"  id="frm_manage"  action="<c:url value='/admin/role/EgovRoleList.do'/>"  method="post">
<input type="hidden" name="checkList"  id="checkList" />
<input type="hidden" name="roleCode"/>
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
         <!-- content start -->
        <div class="admin_content">
        	<div class="TitBx">롤 관리
            </div>
            <div class="ContBx">
                <div class="schbx">
                    <div class="FL" style="padding-top:5px"> * 변경 후 프로그램 변경 및 서버를 재시작 하셔야 합니다.</div>
                    <div class="FR" >
                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="${roleManageVO.searchKeyword}"  class="input"  onKeyDown="press()"/>
                        <a href="#" class="Btn_sch" onClick="javascript:fn_search_list(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="롤 관리">
				    <caption>롤 관리</caption>
				    <colgroup>
					    <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				       <%--  <col width="" /> --%>
				    </colgroup>
                    <thead>
                        <tr> 
				  	        <th>번호</th>
				  	        <th><input name="checkAll" type="checkbox" title="Check All" onclick="javascript:fnCheckAll();"/></th>
				  	        <th>롤 ID</th>
				  	        <th>롤 명</th>
				  	        <th>롤 타입</th>
				  	        <th>롤 패턴</th>
				  	        <th>등록일자</th>
				  	       <!--  <th>상세조회</th> -->
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${roleList}"  varStatus="status">
					    <tr class="resultListHover">
                            <td><c:out value="${(roleManageVO.pageIndex-1) * roleManageVO.pageSize + status.count}"/></td>
                            <td>
                            	<input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/>
                        		<input name="checkId" type="hidden" value="<c:out value='${resultList.roleCode}'/>"/>
                        	</td>
                            <td style="cursor:pointer;cursor:hand" >
							<span class="link"><a href="#" onclick="fn_select_role('<c:out value="${resultList.roleCode}"/>'); return false;"><c:out value="${resultList.roleCode}"/></a></span>
							</td>
                            <td><c:out value="${resultList.roleNm}"/></td>
                            <td><c:out value="${resultList.roleTy}"/></td>
                            <td><c:out value="${resultList.rolePttrn}"/></td>
                            <td><c:out value="${resultList.roleCreatDe}"/></td>                          
                        </tr>
                        </c:forEach>
                        <c:if test="${paginationInfo.totalRecordCount eq 0}">
                        	<tr>
                        		<td colspan="8"> 조회된 데이터가 없습니다.</td>
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
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_select_role(); return false;">등록</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_delete_roleList(); return false;">삭제</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_go_List(1)" >목록</a></div>
                </div>
            </div>
        </div>
        <!-- content end -->
    </div>
    <!-- // favorite -->
</form>
</div>
</body>
</html>
