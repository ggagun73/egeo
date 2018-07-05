<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%

 /**
  * @Class Name : EgovUserManage.jsp
  * @Description : 사용자관리(조회,삭제) JSP
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.03.02    조재영          최초 생성
  *   2011.09.07    서준식          네비게이션명 변경 (사용자 관리 -> 업무사용자관리)
  *  @author 공통서비스 개발팀 조재영
  *  @since 2009.03.02
  *  @version 1.0
  *  @see
  *
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javaScript" language="javascript" defer="defer">
<!--
function fn_search_list(page){
	document.frm_manage.pageIndex.value = page;
	document.frm_manage.action = "<c:url value='/admin/user/EgovUserList.do'/>";
    document.frm_manage.submit();
}

function fn_select_user(id) {
	document.frm_manage.userId.value = id;
    document.frm_manage.action = "<c:url value='/admin/user/EgovUserUpdateView.do'/>";
    document.frm_manage.submit();
}

function fn_insert_user() {
    document.frm_manage.action = "<c:url value='/admin/user/EgovUserInsertView.do'/>";
    document.frm_manage.submit();
}

function fn_delete_userList() {

    if(fnManageChecked()) {
        if(confirm("삭제하시겠습니까?")) {
        	 document.frm_manage.action = "<c:url value='/admin/user/EgovUserDeleteProc.do'/>";
            document.frm_manage.submit();
        }
    }
}
//-->
</script>
</head>
<body>
<div id="W_900">
<form name="frm_manage" id="frm_manage"  action="<c:url value='/admin/user/EgovUserList.do'/>" method="post">
<input type="hidden" name="checkList"  id="checkList" />
<input type="hidden" name="userId"  id="userId" />
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
        <!-- content start -->
        <div class="admin_content">
        	<div class="TitBx">사용자관리</div>
            <div class="ContBx">
                <div class="schbx">
                    <div class="FR" >
                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="${userSearchVO.searchKeyword}"  class="input"  onKeyDown="press()"/>
                        <a href="#" class="Btn_sch" onClick="javascript:fn_search_list(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="사용자관리">
				    <caption>사용자관리</caption>
				    <colgroup>
					    <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				        <col width="" />
				    </colgroup>
                    <thead>
                        <tr> 
				  	        <th>번호</th>
				  	        <th><input name="checkAll" type="checkbox" title="Check All" onclick="javascript:fnCheckAll();"/></th>
				  	        <th>사용자ID</th>
				  	        <th>사용자명</th>
				  	        <th>사용자부서</th>
				  	        <th>전화번호</th>
				  	        <th>등록일자</th>
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${resultList}"  varStatus="status">
					    <tr class="boardListHover">
                            <td><c:out value="${(userSearchVO.pageIndex-1) * userSearchVO.pageSize + status.count}"/></td>
                            <td>
                            	<input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/>
                        		<input name="checkId" type="hidden" value="<c:out value='${resultList.userId}'/>"/>
                        	</td>
                            <td style="cursor:pointer;cursor:hand" >
							<span class="link"><a href="#"  onclick="javascript:fn_select_user('<c:out value="${resultList.userId}"/>'); return false;"><c:out value="${resultList.userId}"/></a></span>
							</td>
                            <td><c:out value="${resultList.userName}"/></td>
                            <td><c:out value="${resultList.userDept}"/></td>
	                        <td><c:out value="${resultList.userTel}"/></td>
                            <td><c:out value="${resultList.reqDate}"/></td>
                        </tr>
                        </c:forEach>
                        <c:if test="${paginationInfo.totalRecordCount eq 0}">
                        	<tr>
                        		<td colspan="7"> 조회된 데이터가 없습니다.</td>
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
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_insert_user(); return false;"><spring:message code="button.create" /></a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_delete_user(); return false;"><spring:message code="button.delete" /></a></div>
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