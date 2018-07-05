<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
 /**
  * @Class Name : EgovUserInsert.jsp
  * @Description : 사용자등록View JSP
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
<title>User Insert</title>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javaScript" language="javascript" defer="defer">
<!--
$(document).ready(function() {
	
	// 중복체크 확인용 플래그
	idCheckFlag = "N";
	
	// 아이디 변경되면 중복체크여부 N으로 변경
	$("#userId").keyup(function(){
		idCheckFlag = "N";
	});
});

function fn_go_list(){
    document.frm_manage.action = "<c:url value='/admin/user/EgovUserList.do'/>";
    document.frm_manage.submit();
}

function fn_save_user(){	
	document.frm_manage.action = "<c:url value='/admin/user/EgovUserInsertProc.do'/>";
    document.frm_manage.submit();    
}

//등록 전 입력값 체크
function fn_reg_check(){	
		
	if( $("#userId").val() =="" ) { alert("아이디를 입력해주세요"); return false; }
	if( $("#userId").val() =="Standard" ) { alert("시스템이 사용하는 ID입니다. 사용하실 수 없습니다."); return false; }
	if( $("#userName").val() =="" ) { alert("성명을 입력해주세요"); $("#userName").focus(); return false; }	
	if( idCheckFlag=="N" ) { alert("아이디 중복체크를 해주세요."); return false; }
	if( $("#password").val() =="" ||  $("#password2").val() =="" ) { alert("비밀번호를 입력해주세요."); return false; }
	if( $("#password").val() != $("#password2").val() ) { alert("비밀번호가 일치하지않습니다. 다시 입력해주세요."); return false; }
	if( $("#userId").val() == $("#password").val() ) { alert("아이디와 암호가 동일하면 안됩니다."); return false; }

	if( $("#userTel").val() =="" ) { alert("전화번호를 입력해주세요"); $("#userTel").focus(); return false; }	
	if( $("#userDept").val() =="" ) { alert("직급을 입력해주세요"); $("#userDept").focus(); return false; }	
	
	if( $("#userId").val().length < 4 ){
		alert("아이디는 4자리 이상 입력해주세요.");
		$("#userId").focus(); return false;
	 }
	
	//관리자 등록시 비밀번호 입력길이, 유효성 체크 안함.. 
	
	// 등록
	fn_save_user();
}


function fn_idCheked(){
	var id = $("#userId").val();

	if( id=="" || id==null ) {
		alert("아이디를 입력해주세요.");
		$("#userId").focus();
		return false;
	}
	
	 $.ajax({
		url:'/idDDCheck.do'
		,data:{USER_ID:id}
		,dataType:'text'
		,type:'post'
		,success:function(msg){
			if( msg == "ERROR") {
				alert("중복된 아이디입니다. 다시 입력해주세요.");
				$("#userId").focus();					
			} else {
				alert("사용 가능한 아이디입니다.");
				idCheckFlag = "Y";
			}
		}
		,error:function(request,status,error){
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);		    
		}
	});
}
//-->
</script>
</head>
<body>
<div id="W_900">
<form name="frm_manage" id="frm_manage"  action="<c:url value='/admin/user/EgovUserList.do'/>"  method="post" >
<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
<input name="checkedIdForDel" type="hidden" />
<!-- 검색조건 유지 -->
<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
<input type="hidden" name="sbscrbSttus" value="<c:out value='${userSearchVO.sbscrbSttus}'/>"/>
<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>					
    <div id="admin">
    	<!-- menu -->
    	 <%@ include file="/common/include/include_admin.jsp" %>     
		<!-- content start -->
		<div class="admin_content">
        	<div class="TitBx">사용자 등록</div>
            <div class="ContBx">
                <div class="af">
                    <div class="stit2">사용자 등록</div>
                    <table class="tbview" summary="사용자 등록">
				        <caption>사용자 등록</caption>
				        <colgroup>
					        <col width="20%" /><col width="80%" />
				        </colgroup>
				        <tbody>
					        <tr>
						        <th>사용자 ID<span class="orange">*</span></th>
						        <td><input type="text" name="userId" id="userId" class="input" title="사용자아이디" />&nbsp;<a href="#" id="idCheck"  onClick="fn_idCheked()"><img src="/images/usolver/com/cmm/login/check.gif" /></a></td>
                    		 </tr>
                            <tr>
						        <th>사용자 이름<span class="orange">*</span> </th>
						        <td><input type="text" name="userName" id="userName" class="input"  title="사용자이름"  /></td>
                            </tr>
                            <tr>
						        <th>비밀번호<span class="orange">*</span> </th>
						        <td><input type="password" name="password" id="password"  class="input"  title="비밀번호" /></td>
                            </tr>  
                            <tr>
						        <th>비밀번호확인<span class="orange">*</span> </th>
						        <td><input type="password" name="password2" id="password2" class="input"  title="비밀번호확인"  /></td>
                            </tr>                              
                            <tr>
                                <th>사용자부서</th>
						        <td><select name="userDept" id="userDept" class="select" title="부서코드">
				                      <option value=""  label="--선택하세요--"/>
				                      <c:forEach var="selectData"  items="${dept_cde_list}">
										<option value="${selectData.g2Code}" >${selectData.g2Value}</option>
									  </c:forEach>
				                      </select>
				                 </td>
				             </tr>
                            <tr>
						        <th>전화번호</th>
						        <td><input type="text"  name="userTel"  id="userTel"  class="input"  title="전화번호"/></td>
					        </tr>
                            <tr>
						        <th>비고</th>
						        <td><input type="text"  class="input"  style="width:400px" name="userDesc" id="userTel"   title="비고"/></td>
					        </tr>
				        </tbody>
			        </table>                	
                    <div class="TreeBtBx ">
                        <div class="Btn "><a href="#" class="Btn_blue"  onclick="javascript:fn_reg_check();">저장</a></div>
						<div class="Btn"><a href="#" class="Btn_blue"  onclick="javascript:document.frm_manage.reset();">취소</a></div>
                        <div class="Btn"><a href="#" class="Btn_blue"  onclick="javascript:fn_go_list();">목록</a></div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</form>
</div> 
</body>
</html>              
       