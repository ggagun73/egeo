<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovProgramListManage.jsp
  * @Description : 프로그램목록 조회 화면
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
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<title>프로그램목록리스트</title>
<script language="javascript1.2" type="text/javaScript">
<!--
/* ********************************************************
 * 멀티삭제 처리 함수
 ******************************************************** */
function fn_delete_program() {
    if(fnManageChecked()) {
        if(confirm("관련메뉴 목록이 존재할 경우 프로그램 삭제시 기능을 사용할 수 없습니다. 그래도 삭제하시겠습니까?")) {
            document.frm_manage.action = "<c:url value='/admin/program/EgovProgramDeleteProc.do'/>";
            document.frm_manage.submit();
        }
    }
}
/* ********************************************************
 * 조회 처리 함수
 ******************************************************** */
function fn_search_list(page) {
	document.frm_manage.pageIndex.value = page;
	document.frm_manage.action = "<c:url value='/admin/program/EgovProgramList.do'/>";
	document.frm_manage.submit();
}
/* ********************************************************
 * 입력 화면 호출 함수
 ******************************************************** */
function fn_insert_program() {
   	document.frm_manage.action = "<c:url value='/admin/program/EgovProgramView.do'/>";
   	document.frm_manage.submit();
}
/* ********************************************************
 * 상세조회처리 함수
 ******************************************************** */
function fn_select_program(progrmFileNm) {
	document.frm_manage.tmp_progrmNm.value = progrmFileNm;
   	document.frm_manage.action = "<c:url value='/admin/program/EgovProgramView.do'/>";
   	document.frm_manage.submit();
}
-->
</script>
</head>
<body>
<div id="W_900">
<form name="frm_manage"  id="frm_manage"  action="<c:url value='/admin/program/EgovProgramList.do'/>" method="post">
<input type="hidden" name="checkList"  id="checkList" />
<input type="hidden" name="tmp_progrmNm"/>
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
         <!-- content start -->
        <div class="admin_content">
        	<div class="TitBx">프로그램목록관리
            </div>
            <div class="ContBx">
                <div class="schbx">
                    <div class="FR" >
                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="${progrmVO.searchKeyword}"  class="input"  onKeyDown="press()"/>
                        <a href="#" class="Btn_sch" onClick="javascript:fn_search_list(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="프로그램목록관리">
				    <caption>프로그램목록관리</caption>
				    <colgroup>
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
				  	        <th>프로그램파일명</th>
						    <th>프로그램명</th>
						    <th>URL</th>
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${programList}"  varStatus="status">
					    <tr class="resultListHover">
                            <td><c:out value="${(progrmVO.pageIndex-1) * progrmVO.pageSize + status.count}"/></td>
                            <td>
                            	<input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/>
                        		<input name="checkId" type="hidden" value="<c:out value='${resultList.progrmFileNm}'/>"/>
                        	</td>
                            <td style="cursor:pointer;cursor:hand" >
							<span class="link"><a href="#" onclick="fn_select_program('<c:out value="${resultList.progrmFileNm}"/>'); return false;">
								<c:if test="${fn:length(resultList.progrmFileNm)> 20}"><c:out value="${fn:substring(resultList.progrmFileNm,0, 20)}"/>..</c:if><c:if test="${fn:length(resultList.progrmFileNm)<= 20}"><c:out value="${resultList.progrmFileNm}"/></c:if>
							</a></span>
							</td>
                            <td><c:out value="${resultList.progrmKoreanNm}"/></td>
	                        <td><c:if test="${fn:length(resultList.url)> 30}"><c:out value="${fn:substring(resultList.url,0, 30)}"/>..</c:if><c:if test="${fn:length(resultList.url)<= 30}"><c:out value="${resultList.url}"/></c:if></td>                
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
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_insert_program(); return false;">등록</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_delete_program(); return false;">삭제</a></div>
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
