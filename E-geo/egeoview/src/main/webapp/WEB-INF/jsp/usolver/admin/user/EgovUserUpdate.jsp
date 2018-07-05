<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
 /**
  * @Class Name : EgovUserSelectUpdt.jsp
  * @Description : 사용자상세조회, 수정 JSP
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.03.02    조재영          최초 생성
  *
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
<title>사용자 정보조회 및 수정</title>
<script type="text/javaScript" language="javascript" defer="defer">
<!--
function fn_go_list(){
    document.userManageVO.action = "<c:url value='/admin/user/EgovUserList.do'/>";
    document.userManageVO.submit();
}

function fn_go_password(){
	document.userManageVO.action = "<c:url value='/admin/user/EgovUserPwdUpdateView.do'/>";
    document.userManageVO.submit();
}

function fn_delete_user() {
	if(confirm("<spring:message code="common.delete.msg" />")){
	    document.userManageVO.action = "<c:url value='/admin/user/EgovUserDeleteProc.do'/>";
	    document.userManageVO.submit();
	}
}

function fn_save_user(){   
	document.userManageVO.action = "<c:url value='/admin/user/EgovUserUpdateProc.do'/>";
    document.userManageVO.submit(); 
}

function fn_save_author(){
	
    var authCheck = document.userAuthorForm.USER_AUTHOR_CODE;
    
    if( authCheck.length > 1 ){
		document.userAuthorForm.action = "<c:out value='/admin/author/EgovAuthorUserApproveProc.do'/>";
	    document.userAuthorForm.submit();
    }else {
    	alert("선택한 항목이 없습니다.");
    	return false;
    }
}

function fn_delete_author(){
	document.userAuthorForm.action = "<c:out value='/admin/author/EgovAuthorUserDeleteProc.do'/>";
    document.userAuthorForm.submit();
}
//-->
</script>
</head>
<body>
<div id="W_900">
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	 <%@ include file="/common/include/include_admin.jsp" %>     
        <div class="admin_content">
        	<div class="TitBx">
            	사용자 정보 조회
            </div>
            <div class="ContBx">
                <div class="af">
                    <div class="stit2">사용자 정보
	                    <div class="TreeBtBx"  style="position:relative; padding:0px 0 5px 0;">
	                    	<div class="Btn"><a href="#" class="Btn_gray2"  onclick="javascript:document.userManageVO.reset();">취소</a></div>
	                        <div class="Btn "><a href="#" class="Btn_gray2" onclick="javascript:fn_save_user(); return false;">수정</a></div>
	                        <div class="Btn"><a href="#" class="Btn_gray2"  onclick="javascript:fn_delete_user(); return false;">삭제</a></div>                        
	            	        <div class="Btn"><a href="#" class="Btn_gray2"  onclick="javascript:fn_go_password(); return false;">암호변경</a></div>
	                    </div>
                    </div>
                    <div id = "USER_INFO">
                    <form:form commandName="userManageVO" action="/admin/user/EgovUserUpdateProc.do" name="userManageVO" method="post" >
					<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
					<input name="action_flag" type="hidden" value="UPDATE"/>
					<input name="callBackFunction" type="hidden" />
					<!-- 검색조건 유지 -->
					<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
					<input type="hidden" name="sbscrbSttus" value="<c:out value='${userSearchVO.sbscrbSttus}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
                    <table class="tbview" summary="사용자 정보">
				        <caption>사용자 정보</caption>
				        <colgroup>
					        <col width="15%" /><col width="35%" /><col width="15%" /><col width="35%" />
				        </colgroup>
				        <tbody>
					        <tr>
						        <th>사용자 ID<span class="orange">*</span></th>
						        <td><form:input path="userId" id="userId" cssClass="input" maxlength="20" readonly="true" title="사용자아이디" />
                    			</td>
						        <th>사용자 이름<span class="orange">*</span> </th>
						        <td><form:input path="userName" id="userName" cssClass="input"  maxlength="60" title="사용자이름"  /></td>
                            </tr>
                            <tr>
                                <th>사용자부서</th>
						        <td><select name="userDept" id="userDept" class="select" title="부서코드">
				                      <option value="" label="--선택하세요--"/>				                      
				                      <c:forEach var="selectData" items="${dept_cde_list}">
										<option value="${selectData.g2Code}"  <c:if test = "${selectData.g2Code == userManageVO.userDept}"> selected="selected" </c:if> >${selectData.g2Value}</option>
									  </c:forEach>
									  </select>
				                </td>
						        <th>전화번호</th>
						        <td><form:input path="userTel"  id="userTel" cssClass="input" maxlength="20" title="전화번호"/></td>
					        </tr>
                            <tr>
						        <th>비고</th>
						        <td colspan="3"><form:input path="userDesc"  id="userTel" cssClass="input" size="40" maxlength="20" title="비고"/></td>
					        </tr>
                            <tr>
						        <th>등록일자</th>
						        <td><c:out value='${userManageVO.reqDate}'/></td>
						        <th>비번변경일자</th>
						        <td><c:out value='${userManageVO.reqDate}'/></td>
					        </tr>
				        </tbody>
			        </table>
                	</form:form>
                    </div>
                </div>
                <div class="af"  style="padding-top:20px;">
                    <div class="stit2">사용자 권한정보
	                    <div class="TreeBtBx"  style="padding:0px 0 5px 0;">
	                    	<div class="Btn"><a href="#" class="Btn_gray2" onclick="javascript:document.userAuthorForm.reset();">취소</a></div>
	                        <div class="Btn"><a href="#" class="Btn_gray2" onclick="javascript:fn_save_author(); return false;" >승인/등록</a></div>
	                        <div class="Btn"><a href="#" class="Btn_gray2" onclick="javascript:fn_delete_author(); return false;">삭제</a></div>                      
	                    </div>
                    </div>
                    <div id = "USER_AUTHOR">
                    <form:form  name="userAuthorForm"   id="userAuthorForm"  action="/admin/author/EgovAuthorUserApproveProc.do"  method="post" >
        			<input name="USER_ID"  type="hidden"   value="<c:out value='${userManageVO.userId}'/>" >
                    <table class="tblist" summary="사용자권한정보">
				        <caption>사용자권한정보</caption>
				        <colgroup>
					        <col width="33%" />
				            <col width="33%" />
				            <col width="34%" />
				        </colgroup>
                        <thead>
                            	<tr>           
									<th class="ac"><input type="checkbox"  id="USER_AUTHOR_CODE"   name="USER_AUTHOR_CODE"  value="${author_water_list[0].regYn}:WATER:${author_water_list[0].authorCode}"  <c:if test="${ author_water_list[0].regYn eq '1' }"> checked="true" </c:if> >
														<c:out value="${author_water_list[0].authorNm}"/><c:if test="${ author_water_list[0].regYn eq '2' }" ><br><span class="blue">(${author_water_list[0].approveDate} 승인)</span></c:if>
									</th>		
									<th class="ac"><input type="checkbox"  id="USER_AUTHOR_CODE"   name="USER_AUTHOR_CODE"  value="${author_sewer_list[0].regYn}:SEWER:${author_sewer_list[0].authorCode}"  <c:if test="${ author_sewer_list[0].regYn eq '1' }"> checked="true" </c:if> >
														<c:out value="${author_sewer_list[0].authorNm}"/><c:if test="${ author_sewer_list[0].regYn eq '2' }" ><br><span class="blue">(${author_sewer_list[0].approveDate} 승인)</span></c:if>
									</th>						
									<th class="ac"><input type="checkbox"  id="USER_AUTHOR_CODE"   name="USER_AUTHOR_CODE"  value="${author_road_list[0].regYn}:ROAD:${author_road_list[0].authorCode}"  <c:if test="${ author_road_list[0].regYn eq '1' }"> checked="true" </c:if> >
														<c:out value="${author_road_list[0].authorNm}"/><c:if test="${ author_road_list[0].regYn eq '2' }" ><br><span class="blue">(${author_road_list[0].approveDate} 승인)</span></c:if>
									</th>												
							 	</tr>
                        </thead>
				        <tbody>				            
					        <tr>
                               <td>
                                  <ul class="list">
                                   <c:forEach var="author_water_list" items="${author_water_list}">
                                   		<c:if test="${author_water_list.authorCode ne 'ROLE_WATER'}" >
										<c:set var="selectRegYn" value="${author_water_list.regYn}" />
											<li><input type="checkbox"  id="USER_AUTHOR_CODE"   name="USER_AUTHOR_CODE"  value="${author_water_list.regYn}:WATER:${author_water_list.authorCode}"  <c:if test="${ selectRegYn eq '1' }"> checked="true" </c:if> >
											<c:choose>
												<c:when test="${ selectRegYn eq '2' }" >${author_water_list.authorNm}: <span class="blue">${author_water_list.approveDate} 승인</span></c:when>										
												<c:when test="${ selectRegYn eq '1' }" >${author_water_list.authorNm}: <span class="blue">${author_water_list.reqDate} 신청</span></c:when>
												<c:otherwise>${author_water_list.authorNm}</c:otherwise>
											</c:choose>		
											</li>
										</c:if>
									</c:forEach>                                    
                                    </ul>
                                </td>
                                <td>
                                    <ul class="list">
                                        <c:forEach var="author_sewer_list" items="${author_sewer_list}">
                                        <c:if test="${author_sewer_list.authorCode ne 'ROLE_SEWER'}" >
										<c:set var="selectRegYn" value="${author_sewer_list.regYn}" />
											<li><input type="checkbox"  id="USER_AUTHOR_CODE"   name="USER_AUTHOR_CODE"  value="${author_sewer_list.regYn}:SEWER:${author_sewer_list.authorCode}"  <c:if test="${ selectRegYn eq '1' }"> checked="true" </c:if> >
											<c:choose>
												<c:when test="${ selectRegYn eq '2' }" >${author_sewer_list.authorNm}:<span class="blue">${author_sewer_list.approveDate} 승인</span></c:when>										
												<c:when test="${ selectRegYn eq '1' }" >${author_sewer_list.authorNm}:<span class="blue">${author_sewer_list.reqDate} 신청</span></c:when>
												<c:otherwise>${author_sewer_list.authorNm}</c:otherwise>
											</c:choose>			
											</li>
										</c:if>
									</c:forEach>
                                    </ul>
                                </td>
                                <td>
                                    <ul class="list">
                                       <c:forEach var="author_road_list" items="${author_road_list}">
                                        <c:if test="${author_road_list.authorCode ne 'ROLE_ROAD'}" >
										<c:set var="selectRegYn" value="${author_road_list.regYn}" />
											<li><input type="checkbox"  id="USER_AUTHOR_CODE"   name="USER_AUTHOR_CODE"  value="${author_road_list.regYn}:ROAD:${author_road_list.authorCode}"  <c:if test="${selectRegYn eq '1' }"> checked="true" </c:if> >
											<c:choose>
												<c:when test="${ selectRegYn eq '2' }" >${author_road_list.authorNm}:<span class="blue">${author_road_list.approveDate} 승인</span></c:when>										
												<c:when test="${ selectRegYn eq '1' }" >${author_road_list.authorNm}:<span class="blue">${author_road_list.reqDate} 신청</span></c:when>
												<c:otherwise>${author_road_list.authorNm}</c:otherwise>
											</c:choose>		
											</li>
										</c:if>
									</c:forEach>
                                    </ul>
                                </td>
                            </tr>
				        </tbody>
			        </table>
			        </form:form>	                   
                    </div><!--  사용자 권한 정보.. 닫기  -->
                </div>
                <div class="TreeBtBx ">
                   <div class="Btn"><a href="#" class="Btn_blue"  onclick="javascript:fn_go_list(); return false;">목록</a></div>
                 </div>
            </div>
        </div>
    </div>
    <!-- // favorite -->
</div> 
</body>
</html>
