<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"  pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovWebLogList.jsp
  * @Description : 웹 로그 정보목록 화면
  * @Modification Information
  * @
  * @  수정일         수정자          수정내용
  * @ -------        --------    ---------------------------
  * @ 2009.03.11      이삼섭          최초 생성
  * @ 2011.07.08      이기하          패키지 분리로 경로 수정(sym.log -> sym.log.wlg)
  *   2011.09.14      서준식          검색 후 화면에 검색일자 표시안되는 오류 수정
  *  @author 공통서비스 개발팀 이삼섭
  *  @since 2009.03.11
  *  @version 1.0
  *  @see
  *
  */
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript">

	$( document ).ready(function() {
		// 1 )달력			
		fn_create_datepickerLinked("frm_manage", "searchBgnDe", "searchEndDe" , 10);
	});
	
	function fn_egov_search_layerLog(pageNo){
		document.frm_manage.pageIndex.value = pageNo;
		document.frm_manage.action = "<c:url value='/admin/log/elg/SelectLayerLogList.do'/>";
		document.frm_manage.submit();
	}	
</script>
<title>편집로그관리</title>
</head>
<body>
<div id="W_900">
	<!-- favorite -->
    <div id="admin">
    	<!-- menu start-->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
        <!-- content start -->
        <div class="admin_content">
        	<div class="TitBx">편집 로그관리</div>
        	<form name="frm_manage"  id="frm_manage" action ="<c:url value='/admin/log/elg/SelectLayerLogList.do'/>" method="post">
            <div class="ContBx">
                <div class="schbx">
                    <div class="FR" >
                    	조회일자 :                        
                        <input type="text"  style="width:80px;" class="input DT_DATE"   name="searchBgnDe"  id="searchBgnDe"  value="${searchVO.searchBgnDe}"  title="시작일자">
                        ~ <input type="text" style="width:80px;" class="input DT_DATE"  name="searchEndDe"  id="searchEndDe"  value="${searchVO.searchEndDe}"  title="완료일자"/> 
                                          부서 :                        
	                    <select name="userDept" id="userDept">
	                        <option value="">전체</option>
							<c:forEach var="selectData" items="${dept_cde_list}">
								<option value="${selectData.g2Code}" <c:if test = "${selectData.g2Code == searchVO.userDept}"> selected="selected" </c:if> >${selectData.g2Value}</option>
							</c:forEach>
					    </select>
					      사용자명 :
					    <input type="text" style="width:70px;height:19px;" id="userNm" name="userNm" value="${searchVO.userNm}"  class="input" />
                        <a href="#" class="Btn_sch" onClick="fn_egov_search_layerLog(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="레이어편집 로그">
				    <caption>레이어편집 로그</caption>
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
				  	        <th>부서</th>
				  	        <th>사용자</th>
				  	        <th>로그인일시</th>
				  	        <th>편집시각</th>
				  	        <th>테이블명</th>
				  	        <th>테이블종류</th>
				  	        <th>편집상태</th>
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${resultList}"  varStatus="status">
					    <tr class="resultListHover">
                            <td><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}"/></td>
                            <td><c:out value="${resultList.deptNm}"/></td>
                            <td><c:out value="${resultList.userNm}"/></td>
                            <td><c:out value="${resultList.loginDe}"/></td>
                            <td><c:out value="${resultList.loginTime}"/></td>
	                        <td><c:out value="${resultList.tableNm}"/></td>
                            <td><c:out value="${resultList.tableTy}"/></td>
                            <td><c:out value="${resultList.editTy}"/></td>
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
						<ul class="pages">
							<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fnLinkPage" />
							<input type="hidden" id="pageIndex" name="pageIndex" value="${paginationInfo.currentPageNo}" />
						</ul>
                </div>
            </div>
            </form>
        </div>
        <!-- content end -->        
	</div>
</div>
</body>
</html>