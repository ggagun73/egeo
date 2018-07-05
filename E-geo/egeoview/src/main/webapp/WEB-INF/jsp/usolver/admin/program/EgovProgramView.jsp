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
  * @Class Name : EgovProgramView.jsp
  * @Description : 프로그램목록 상세조회및 수정 화면
  * @Modification Ination
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
--%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<title>프로그램상세조회</title>
<script language="javascript1.2" type="text/javaScript">
<!--
/* ********************************************************
 * 등록 처리 함수
 ******************************************************** */
function fn_save_program(){
	
	if( $("#progrmFileNm").val() == 'undefined' ||  $("#progrmFileNm").val() == ''){
		alert("프로그램 파일은 반드시 입력하셔야 합니다.");
		$("#progrmFileNm").focus();	
		return false;
	}
	
	if( $("#action_flag").val() == "INSERT" ){
		$.ajax({
			url:'/admin/program/EgovProgramOverLapCheck.do'
			,data:{FILENM:$("#progrmFileNm").val()}
			,dataType:'text'
			,type:'post'
			,success:function(msg){
				if( msg == "ERROR") {
					alert("프로그램 파일명이 중복되었습니다.");
					$("#progrmFileNm").focus();	
				}else {					
					document.frm_manage.action="<c:url value='/admin/program/EgovProgramWriteProc.do' />";
					document.frm_manage.submit();
				}
			}
			,error:function(request,status,error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);		    
				bCheck = false;
			}
		});
	}else {
		
		var massage = "<spring:message code='common.update.msg' />";
		
		if( typeof $("#programMenuList").val() != 'undefined' ){
			massage = "관련목록이 존재할 경우 수정시 문제가 발생할 수 있습니다. 수정하시겠습니까?";
		}
		
		if(confirm(massage)){
			document.frm_manage.action="<c:url value='/admin/program/EgovProgramWriteProc.do' />";
			document.frm_manage.submit();
		}		
		
	}
}

/* ********************************************************
 * 삭제처리함수
 ******************************************************** */
function fn_delete_program() {
	
	var message =  "<spring:message code='common.delete.msg' />";
	
	if( typeof $("#programMenuList") != 'undefined'){
		massage ="관련메뉴 목록이 존재할 경우 프로그램 삭제시 기능을 사용할 수 없습니다. 그래도 삭제하시겠습니까?";
	}
	
	if(confirm(message)){
        document.frm_manage.action="<c:url value='/admin/program/EgovProgramDeleteProc.do' />";
        document.frm_manage.submit();
	}
}

/* ********************************************************
 * 목록조회
 ******************************************************** */
function fn_go_programList(){
	document.frm_manage.action = "<c:url value='/admin/program/EgovProgramList.do'/>";
	document.frm_manage.submit();	
}

-->
</script>
</head>
<body>
<body>
<div id="W_900">
<form name="frm_manage"  id="frm_manage"  action="<c:url value='/admin/program/EgovProgramList.do'/>" method="post">
<input type="hidden" name="tmp_progrmNm"/>
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
         <!--  menu end -->
		<div class="admin_content">
        	<div class="TitBx">
            	프로그램관리
            </div>
            <div class="ContBx">
                <table class="tbview" summary="프로그램관리 상세조회">
				    <caption>프로그램관리</caption>
				    <colgroup>
					    <col width="25%" /><col width="75%" />
				    </colgroup>
				    <tbody>
					    <tr>
						    <th>프로그램 파일명<span class="orange">*</span></th>
						    <td><c:if test="${empty progrmVO.progrmFileNm}">				    	
						    		<input type="text" name="progrmFileNm" id="progrmFileNm" value="<c:out value='${progrmView.progrmFileNm}'/>"  class="input" style="width:250px" title="프로그램파일명" />
						    	 </c:if>
						    	 <c:if test="${!empty progrmVO.progrmFileNm}">
						    	 	<input type="hidden" name="progrmFileNm" id="progrmFileNm" value="<c:out value='${progrmView.progrmFileNm}'/>" /><c:out value='${progrmView.progrmFileNm}'/>						    	 
						    	 </c:if>				    
						    </td>
					    </tr>
					     <tr>
						    <th>저장경로 <span class="orange">*</span></th>
						    <td><input type="text"  name="progrmStrePath" id="progrmStrePath" value="<c:out value='${progrmView.progrmStrePath}'/>" class="input"  style="width:250px"  title="저장경로" />&nbsp;</td>
					    </tr>
 					     <tr>
						    <th>프로그램 한글명 <span class="orange">*</span></th>
						    <td><input type="text"  name="progrmKoreanNm" id=progrmKoreanNm value="<c:out value='${progrmView.progrmKoreanNm}'/>" class="input"  style="width:250px"  title="프로그램 한글명" />&nbsp;</td>
					    </tr>
					     <tr>
						    <th>URL <span class="orange">*</span></th>
						    <td><input type="text"  name="URL" id="URL" value="<c:out value='${progrmView.URL}'/>" class="input"  style="width:400px"  title="URL" />&nbsp;</td>
					    </tr>
					     <tr>
						    <th>프로그램설명</th>
						    <td><textarea name="progrmDc" id="progrmDc"  title="프로그램설명"  rows="5" cols="80"><c:out value='${progrmView.progrmDc}'/></textarea></td>
					    </tr>
					    <c:if test="${!empty programMenuList}">			
					    <tr>
						    <th>관련 메뉴 목록</th>
						    <td>						    	
						    	<c:forEach var="programMenuList" items="${programMenuList}"  varStatus="status">						    		    	
                        			<c:if test="${!status.first}">,&nbsp;</c:if><c:out value='${programMenuList.menuNm}'/>(<c:out value='${programMenuList.menuNo}'/>)
						    	</c:forEach>
						    	<input type="hidden"  name="programMenuList" id="programMenuList"   value="<c:out value='${fn:length(programMenuList)}'/>"/>					    	
						    </td>
					    </tr>
					    </c:if>
				    </tbody>
			    </table>
                <div class="TreeBtBx">                    
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_save_program()" >저장</a></div>
                    <c:if test="${!empty progrmView.progrmFileNm}">				    	
            	    	<div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_delete_program()">삭제</a></div>
            	    </c:if>
            	    <div class="Btn"><a href="#" class="Btn_blue" onclick="javascript:fn_go_programList()" >목록</a></div>
                </div>
            </div>
        </div>
    </div>
<input type="hidden" name="action_flag"   id="action_flag"  value="${empty progrmView.progrmFileNm ? 'INSERT' : 'UPDATE'}" />
<input type="hidden" name="pageIndex"  id="pageIndex"  value="<c:out value='${progrmVO.pageIndex}'/>"/>
</form>
</div>
</body>
</html>    
    
        



