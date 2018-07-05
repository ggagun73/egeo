<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"  pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
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
			var requstId = $(this).children().eq(1).text().trim();
			fn_egov_inqire_webLog(requstId);
		});	
			
	});

	function fn_search_list(pageNo){
			document.frm_manage.pageIndex.value = pageNo;
			document.frm_manage.action = "<c:url value='/admin/log/wlg/SelectWebLogList.do'/>";
			document.frm_manage.submit();
	}

	function fn_egov_inqire_webLog(requstId){
		var url = "<c:url value='/admin/log/wlg/InqireWebLog.do'/>?requstId="+requstId;
		window.parent.REGISTER.fn_open_nJDSKWindow("웹로그정보조회",url,454,282,"registerOnHome");
	}

</script>
<title>웹 로그 목록</title>
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
        	<div class="TitBx">웹 로그관리</div>
        	<form name="frm_manage"  id="frm_manage" action ="<c:url value='/admin/log/wlg/SelectWebLogList.do'/>" method="post">
            <div class="ContBx">
                <div class="schbx">
                    <div class="FR" >
                    	발생일자 :                        
                        <input type="text"  style="width:80px;" class="input DT_DATE"   name="searchBgnDe"  id="searchBgnDe"  value="${searchVO.searchBgnDe}"  title="시작일자">
                        ~ <input type="text" style="width:80px;" class="input DT_DATE"  name="searchEndDe"  id="searchEndDe"  value="${searchVO.searchEndDe}"  title="완료일자"/>&nbsp;                      
                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="${searchVO.searchKeyword}"  class="input" />
                        <a href="#" class="Btn_sch" onClick="fn_search_list(1)">검색</a>
                    </div>
                </div>
                <table class="tblist" summary="웹 로그">
				    <caption>웹 로그</caption>
				    <colgroup>
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
				  	        <th>요청ID</th>
				  	        <th>발생일자</th>
				  	        <th>URL</th>
				  	        <th>요청자</th>
				  	        <th>요청자IP</th>
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${resultList}"  varStatus="status">
					    <tr class="resultListHover">
                            <td><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}"/></td>
                            <td><c:out value="${resultList.requstId}"/></td>
                            <td><c:out value="${fn:substring(resultList.occrrncDe,0,10)}"/></td>
                            <td class="al">
                            	<c:if test="${fn:length(resultList.url)> 20}"><c:out value="${fn:substring(resultList.url,0, 20)}"/>..</c:if><c:if test="${fn:length(resultList.url)<= 20}"><c:out value="${resultList.url}"/></c:if>
                            </td>
	                        <td><c:out value="${resultList.rqsterNm}"/></td>
                            <td>
                            	<c:if test="${fn:length(resultList.rqesterIp)> 10}"><c:out value="${fn:substring(resultList.rqesterIp,0, 10)}"/>..</c:if><c:if test="${fn:length(resultList.rqesterIp)<= 10}"><c:out value="${resultList.rqesterIp}"/></c:if>
                            </td>
	                  </tr>
                        </c:forEach>
                        <c:if test="${paginationInfo.totalRecordCount eq 0}">
                        	<tr>
                        		<td colspan="6"> 조회된 데이터가 없습니다.</td>
                        	</tr>
                        </c:if>
				    </tbody>
			    </table>
                <div class="PagingBx">
            	    <div class="Paging_tx">총 건수 : <span><c:out value="${paginationInfo.totalRecordCount}"/></span>건</div> 
                    <c:if test="${paginationInfo.totalRecordCount ne 0}">
						<ul class="pages">
							<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fnLinkPage" />
							<input type="hidden" id="pageIndex" name="pageIndex" value="${paginationInfo.currentPageNo}" />
						</ul>
					</c:if>                    
                </div>
            </div>
            </form>
        </div>
        <!-- content end -->        
	</div>
</div>
</body>
</html>