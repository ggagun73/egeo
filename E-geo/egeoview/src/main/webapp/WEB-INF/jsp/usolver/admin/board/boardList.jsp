<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<script type="text/javaScript" language="javascript" defer="defer">

/* 검색 함수 */
function fn_search_list(pageNo) {
	$("#currentPageNo").val(pageNo);
	$("#frm_manage").attr("action", "<c:url value='/admin/board/boardList.do'/>");
	$("#frm_manage").submit();
}

function fn_select_board(id) {
	$("#IDX").val(id);
	$("#frm_manage").attr("action", "/admin/board/boardView.do");
	$("#frm_manage").submit();
}

function fn_insert_board() {
	$("#frm_manage").attr("action", "/admin/board/boardView.do");
	$("#frm_manage").submit();
}

function fn_delete_board() {

    if(fnManageChecked()) {
    	if(confirm("<spring:message code="common.delete.msg" />")){
            document.frm_manage.action = "<c:url value='/admin/board/boardDeleteProc.do'/>";
            document.frm_manage.submit();
        }
    }
}
</script>
</head>
<body>
<div id="W_900">
<form id="frm_manage" name="frm_manage"  action="<c:url value='/admin/board/boardList.do'/>" method="post">
<input type="hidden" id="IDX" name="IDX" value="" />
<input type="hidden" id="checkList" name="checkList" value="" />
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	 <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
        <!-- content start -->
        <div class="admin_content">
        	<div class="TitBx">공지사항관리
            </div>
            <div class="ContBx">
                <div class="schbx">
                    <div class="FR" >
                        <input type="text"  style="height:19px;" id="searchKeyword" name="searchKeyword"  value="${noticeVO.SEARCH_VALUE}"  class="input" />
                        <a href="#" class="Btn_sch" onClick="javascript:fn_search_list(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="공지사항관리">
				    <caption>공지사항관리</caption>
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
				  	        <th>제목</th>
				  	        <th>작성자</th>
				  	        <th>첨부파일</th>
				  	        <th>조회수</th>
				  	        <th>작성일</th>
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${resultList}"  varStatus="status">
					    <tr class="resultListHover">
                            <td><c:out value="${(noticeVO.pageIndex-1) * noticeVO.pageSize + status.count}"/></td>
                            <td><input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/>
                        		  <input name="checkId" type="hidden" value="<c:out value='${resultList.IDX}'/>"/>
                        	</td>
                        	<td style="cursor:pointer;cursor:hand" >
								<span class="link"><a href="#"  onclick="javascript:fn_select_board('<c:out value="${resultList.IDX}"/>'); return false;">
								<c:if test="${fn:length(resultList.TITLE_TEXT)> 20}"><c:out value="${fn:substring(resultList.TITLE_TEXT,0, 20)}"/>..</c:if><c:if test="${fn:length(resultList.TITLE_TEXT)<= 20}"><c:out value="${resultList.TITLE_TEXT}"/></c:if>
								</a></span>
							</td>
                            <td>${resultList.WRITE_ID}</td>
                            <c:if test = "${!empty resultList.FILE_NAME}">
	                        	<td><img src="/images/usolver/admin/list_icon_file.png" alt="첨부파일"></td>
	                        </c:if>
	                        <c:if test = "${empty resultList.FILE_NAME}">
	                        	<td></td>
	                        </c:if>
                            <td>${resultList.HIT}</td>
                            <td><fmt:parseDate var="date" value="${resultList.REGIST_DATE}" pattern="yyyy-MM-dd HH:mm:ss.S"/>
								<fmt:formatDate value="${date}" pattern="yyyy-MM-dd"/> 	</td>
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
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_insert_board(); return false;">등록</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_delete_board(); return false;">삭제</a></div>
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