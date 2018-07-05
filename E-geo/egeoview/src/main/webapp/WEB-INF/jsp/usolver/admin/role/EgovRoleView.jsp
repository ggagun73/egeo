<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%--
/**
 * @Class Name  : EgovRoleUpdate.java
 * @Description : EgovRoleUpdate jsp
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
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>롤관리</title>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javaScript" language="javascript">

$( document ).ready(function() {
	// 1 )달력			
	fn_create_datepicker("roleManage", "roleCreatDe", 10);
});

function fn_select_roleList() {
    var varFrom = document.getElementById("roleManage");
    varFrom.action = "<c:url value='/admin/role/EgovRoleList.do'/>";
    varFrom.submit();
}

function fn_save_role() {

	//저장 전 체크는... 
    document.roleManage.action = "<c:url value='/admin/role/EgovRoleWriteProc.do'/>";
    document.roleManage.submit();
}

function fn_delete_role() {

    document.roleManage.action =  "<c:url value='/admin/role/EgovRoleDeleteProc.do'/>";
    if(confirm("삭제 하시겠습니까?")){
    	 document.roleManage.submit();
    }
}

</script>
</head>
<body>
<div id="W_900">
<form id="roleManage" name="roleManage" method="post">
<input type="hidden" name="roleCode" id="roleCode" value="<c:out value='${roleManage.roleCode}'/>"/>
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
		<div class="admin_content">
        	<div class="TitBx">
            	롤관리 <c:out value="${registerFlagName}"/>
            </div>
            <div class="ContBx">
                <table class="tbview" summary="롤관리 상세조회">
				    <caption>롤관리</caption>
				    <colgroup>
					    <col width="15%" /><col width="35%" /><col width="15%" /><col width="35%" />
				    </colgroup>
				    <tbody>
					    <tr>
						    <th>롤  코드 </th>
						    <td><c:out value="${roleManage.roleCode}"/></td>
						    <th>등록일자</th>
						    <td><input type="text"  name="roleCreatDe" id="roleCreatDe" value="<c:out value='${roleManage.roleCreatDe}'/>" class="input DT_DATE"  title="등록일자" readonly="readonly"/></td>
					    </tr>
					     <tr>
						    <th>롤 명 <span class="orange">*</span></th>
						    <td colspan="3"><input type="text"  name="roleNm" id="roleNm" value="<c:out value='${roleManage.roleNm}'/>" class="input"  style="width:400px"  title="롤명" />&nbsp;</td>
					    </tr>
					    <tr>
						    <th>롤 타입 <span class="orange">*</span></th>
						    <td><select name="roleTyp"  id="roleTyp"  class="select">
							        <c:forEach var="cmmCodeDetail" items="${cmmCodeDetailList}" varStatus="status">
							          <option value="<c:out value="${cmmCodeDetail.g2Code}"/>" <c:if test="${cmmCodeDetail.g2Code == roleManage.roleTyp}">selected</c:if> ><c:out value="${cmmCodeDetail.g2Value}"/></option>
							        </c:forEach>
							      </select></td>
                            <th>롤순서 <span class="orange">*</span></th>
						    <td><input type="text"  name="roleSort" id="roleSort"  value="<c:out value='${roleManage.roleSort}'/>" class="input"  title="롤sort"  numberonly="true" /> (숫자만)</td>
					    </tr>
					     <tr>
						    <th>롤 패턴 <span class="orange">*</span></th>
						    <td colspan="3"><input type="text"  name="rolePtn" id="rolePtn"  value="<c:out value='${roleManage.rolePtn}'/>"  class="input"  style="width:400px" title="롤패턴" />&nbsp;</td>
					    </tr>
					     <tr>
						    <th>설명</th>
						    <td colspan="3"><input type="text"  name="roleDc" id="roleDc"  value="<c:out value='${roleManage.roleDc}'/>"  class="input"  style="width:400px" title="설명" /></td>
					    </tr>
				    </tbody>
			    </table>
                <div class="TreeBtBx">                    
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_save_role()" >저장</a></div>
                     <c:if test="${!empty roleManage.roleCode}">
            	    	<div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_delete_role()">삭제</a></div>
            	    </c:if>
            	    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_select_roleList()" >목록</a></div>
                </div>
            </div>
        </div>
    </div>
    <!-- // favorite -->    
<input type="hidden" name="searchKeyword" value="<c:out value='${roleManageVO.searchKeyword}'/>"/>
<input type="hidden" name="pageIndex" value="<c:out value='${roleManageVO.pageIndex}'/>"/>
<input type="hidden" name="roleCodes"/>
</form>
</div>
</body>
</html>

