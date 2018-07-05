<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%--
/**
 * @Class Name  : egovAuthorUpdate.java
 * @Description : egovAuthorUpdate jsp
 * @Modification Information
 * @
 * @  수정일         수정자          수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.02.01    lee.m.j          최초 생성
 *
 *  @author lee.m.j
 *  @since 2009.03.11
 *  @version 1.0
 *  @see
 *
 */
--%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>권한관리</title>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javaScript" language="javascript">
$( document ).ready(function() {
	// 1 )달력			
	fn_create_datepicker("frm_manage", "authorCreatDe" , 10);	
	fn_init_formObject("frm_manage");		
});

function fn_go_authorList() {

	document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorList.do'/>";
	document.frm_manage.submit();
}

function fn_save_author() {
	
    document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorWriteProc.do'/>";
    document.frm_manage.submit();

}

function fn_delete_author() {

	document.frm_manage.action = "<c:url value='/admin/author/EgovAuthorDeleteProc.do'/>";
	if(confirm("삭제 하시겠습니까?")){
		document.frm_manage.submit();
	}
}

function fn_add_authorRole(){
	$("#authorRoleEdit").show();
}

function fn_close_authorRole(){
	$("#authorRoleEdit").hide();
}

function fn_save_authorRole(sType) {
	
	document.frm_manage.action_flag.value = sType;	 
	if(fnManageChecked()) {
		   document.frm_manage.action =  "<c:url value='/admin/author/EgovAuthorRoleWriteProc.do'/>";
           document.frm_manage.submit();
    }
}
</script>
</head>
<div id="W_900">
<form id="frm_manage" name="frm_manage" method="post">
<input type="hidden" name="checkList"  id="checkList" />
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
		<div class="admin_content">
        	<div class="TitBx">
            	권한관리
            </div>
            <div class="ContBx">
                * 권한코드는 반드시 ROLE_시작되어야 합니다.
                <table class="tbview" summary="권한관리 상세조회">
				    <caption>권한관리</caption>
				    <colgroup>
					    <col width="15%" /><col width="35%" /><col width="15%" /><col width="35%" />
				    </colgroup>
				    <tbody>
					    <tr>
						    <th>권한  코드 <span class="orange">*</span></th>
						    <td><input type="text" name="authorCode" id="authorCode" value="<c:out value='${authorView.authorCode}'/>"  class="input"  title="권한 코드" /></td>
						    <th>등록일자</th>
						    <td><input type="text"  name="authorCreatDe" id="authorCreatDe" value="<c:out value='${authorView.authorCreatDe}'/>" class="input DT_DATE"  title="등록일자" readonly="readonly"/></td>
					    </tr>
					     <tr>
						    <th>권한 명 <span class="orange">*</span></th>
						    <td colspan="3"><input type="text"  name="authorNm" id="authorNm" value="<c:out value='${authorView.authorNm}'/>" class="input"  style="width:200px"  title="권한명" />&nbsp;</td>
					    </tr>
 					    <tr>
						    <th>시스템종류<span class="orange">*</span></th>
						    <td><select name="authorType" id="authorType" class="select" title="권한 종류">
			                      	<option value="" label="--선택하세요--"/>				                      
			                      	<c:forEach var="selectData" items="${sys_cde_list}">
										<option value="${selectData.g2Code}"  <c:if test = "${selectData.g2Code == authorView.authorType}"> selected="selected" </c:if> >${selectData.g2Value}</option>
								 	 </c:forEach>
								 	 <option value="BASIC" <c:if test="${authorView.authorType eq 'BASIC'}">selected</c:if> >기타</option>					
								  </select>
						    </td>
                            <th>권한순서 <span class="orange">*</span></th>
						    <td><input type="text"  name="authorOrdr" id="authorOrdr"  value="<c:out value='${authorView.authorOrdr}'/>"  class="input MX_3 DT_INT"  title="권한순서"  numberonly="true" />&nbsp;(숫자만)</td>
					    </tr>
					     <tr>
						    <th>설명</th>
						    <td colspan="3"><input type="text"  name="authorDc" id="authorDc"  value="<c:out value='${authorView.authorDc}'/>"  class="input"  style="width:400px" title="설명" /></td>
					    </tr>
					    <tr>
						    <th>관련 롤정보</th>
						    <td colspan="3">
						    <c:forEach var="authorRoleList" items="${authorRoleList}"  varStatus="status">
						    	<c:if test="${authorRoleList.regYn eq 'Y' }">						    	
                        		<input name="checkId" type="hidden" value="<c:out value='${authorRoleList.roleCode}'/>"/>
						    	<label>&nbsp;<input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/><c:out value="${authorRoleList.roleCode}" /> : <c:out value="${authorRoleList.rolePtn}" /></label></br>
						    	</c:if>
						    </c:forEach>
						    </br>
						    <div class="Btn"><a href="#" class="Btn_gray2"   onclick="fn_add_authorRole(); return false;">추가</a></div>
						    <div class="Btn"><a href="#" class="Btn_gray2"   onclick="fn_save_authorRole('DELETE'); return false;">삭제</a></div>
						    </td>						    
					    </tr>
				    </tbody>
			    </table>
                <div class="TreeBtBx">                    
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_save_author()" >저장</a></div>
                    <c:if test="${!empty authorView.authorCode}">				    	
            	    	<div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_delete_author()">삭제</a></div>
            	    </c:if>
            	    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_go_authorList()" >목록</a></div>
                </div>
            </div>
        </div>
    </div>
    <!-- // favorite -->  
    <div id="authorRoleEdit"  class="layer_pop" style="width:400px;top:150px;left:150px;display:none">
		<div class="stit">관련 롤 편집</div>
		<table class="tbview" summary="관련 롤 편집">
			<caption>관련 롤 편집</caption>
			<colgroup>
				<col width="" /><col width="" /><col width="" /><col width="" /><col width="" />
			</colgroup>
		 	<tbody>
		 	  <tr>
		  		<th></th>
		   		<th class="ac">롤ID</th>
		   		<th class="ac">롤명</th>
		   		<th class="ac">롤타입</th>
		   		<th class="ac">롤패턴</th>
			  </tr>
		 	  <c:forEach var="authorRoleList" items="${authorRoleList}"  varStatus="status">
		 	  	<c:if test="${authorRoleList.regYn eq 'N' }">
			   	<tr>
			   		<td class="ac"><input name="checkId" type="hidden" value="<c:out value='${authorRoleList.roleCode}'/>"/><input name="checkField" title="Check <c:out value="${status.count}"/>" type="checkbox"/></td>
			   		<td class="ac"><c:out value="${fn:substring(authorRoleList.roleCode,9,13)}"/></td>
			   		<td class="ac"><c:out  value="${authorRoleList.roleNm}"/></td>
			   		<td class="ac"><c:out  value="${authorRoleList.roleTyp}"/></td>
			   		<td class="ac"><c:out  value="${authorRoleList.rolePtn}"/></td>
				  </tr>
				 </c:if>
			  </c:forEach>
			 </tbody>
		</table>
		<div class="TreeBtBx">
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_save_authorRole('INSERT')">저장</a></div>
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_close_authorRole()">닫기</a></div>
		</div>
	</div>  
<input type="hidden" name="action_flag"   id="action_flag"  value="${empty authorView.authorCode ? 'INSERT' : 'UPDATE'}" />
<input type="hidden" name="searchKeyword"   id="searchKeyword"  value="<c:out value='${authorManage.searchKeyword}'/>"/>
<input type="hidden" name="pageIndex"  id="pageIndex" value="<c:out value='${authorManage.pageIndex}'/>"/>
</form>
</div>
</body>
</html>

