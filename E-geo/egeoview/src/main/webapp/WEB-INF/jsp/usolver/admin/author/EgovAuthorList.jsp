<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
 /**
  * @Class Name : EgovAuthorManage.java
  * @Description : EgovAuthorManage List 화면
  * @Modification Information
  * @
  * @  수정일                     수정자                    수정내용
  * @ -------       --------    ---------------------------
  * @ 2009.03.01    Lee.m.j       최초 생성
  *
  *  @author 실행환경 개발팀 홍길동
  *  @since 2009.02.01
  *  @version 1.0
  *  @see
  *
  */
%>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>권한관리</title>
<script type="text/javaScript" language="javascript" defer="defer">
<!--
function fn_search_list(pageNo){
    document.frm_manage.pageIndex.value = pageNo;
    document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorList.do'/>";
    document.frm_manage.submit();
}

function fn_select_author(author) {
    document.frm_manage.authorCode.value = author;
    document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorView.do'/>";
    document.frm_manage.submit();
}

function fn_insert_author() {
    document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorView.do'/>";
    document.frm_manage.submit();
}

function fn_delete_authorList() {
    if(fnManageChecked()) {
        if(confirm("삭제하시겠습니까?")) {
            document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorDeleteProc.do'/>";
            document.frm_manage.submit();
        }
    }
}
-->
</script>
</head>
<body>
<div id="W_900">
<form name="frm_manage"  id="frm_manage"  action="<c:url value='/admin/author/EgovAuthorList.do'/>" method="post">
<input type="hidden" name="checkList"  id="checkList" />
<input type="hidden" name="authorCode"/>
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
         <!-- content start -->
        <div class="admin_content">
        	<div class="TitBx">권한 관리
            </div>
            <div class="ContBx">
                <div class="schbx">
                    <div class="FL" style="padding-top:5px"> * 변경 후 프로그램 변경 및 서버를 재시작 하셔야 합니다. </div>
                    <div class="FR" >                        
                        <select name="searchCondition" id="searchCondition"  class="select"   title="권한 종류"  onChange="javascript:fn_search_list(1)">
	                      	<option value="" />				                      
	                      	<c:forEach var="selectData" items="${sys_cde_list}">
								<option value="${selectData.g2Code}"  <c:if test = "${selectData.g2Code == authorManage.searchCondition}"> selected="selected" </c:if> >${selectData.g2Value}</option>
						 	 </c:forEach>
						 	 <option value="BASIC" <c:if test="${authorManage.searchCondition eq 'BASIC'}">selected</c:if> >기타</option>					
						  </select>
                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword"  value="${authorManage.searchKeyword}"  class="input"  onKeyDown="press()"/>
                        <a href="#" class="Btn_sch" onClick="javascript:fn_search_list(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="권한 관리">
				    <caption>권한 관리</caption>
				    <colgroup>
					    <col width="" />
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
				  	        <th>권한 ID</th>
				  	        <th>권한 명</th>
				  	        <th>정렬순서</th>
				  	        <th>등록일자</th>
				  	        <th>시스템종류</th>
				  	       <!--  <th>상세조회</th> -->
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${authorList}"  varStatus="status">
					    <tr class="resultListHover">
                            <td><c:out value="${(authorManage.pageIndex-1) * authorManage.pageSize + status.count}"/></td>
                            <td>
                            	<input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/>
                        		<input name="checkId" type="hidden" value="<c:out value='${resultList.authorCode}'/>"/>
                        	</td>
                            <td style="cursor:pointer;cursor:hand" >
							<span class="link"><a href="#" onclick="fn_select_author('<c:out value="${resultList.authorCode}"/>'); return false;"><c:out value="${resultList.authorCode}"/></a></span>
							</td>
                            <td><c:out value="${resultList.authorNm}"/></td>
                            <td><c:out value="${resultList.authorOrdr}"/></td>
	                        <td><c:out value="${resultList.authorCreatDe}"/></td>
                            <td><c:out value="${resultList.authorType}"/></td>                      
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
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_insert_author(); return false;">등록</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_delete_authorList(); return false;">삭제</a></div>
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
