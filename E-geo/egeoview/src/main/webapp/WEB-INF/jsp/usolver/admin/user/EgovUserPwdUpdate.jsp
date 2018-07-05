<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
 /**
  * @Class Name : EgovPasswordUpdt.jsp
  * @Description : 암호수정 JSP
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.04.02    조재영          최초 생성
  *
  *  @author 공통서비스 개발팀 조재영
  *  @since 2009.04.02
  *  @version 1.0
  *  @see
  *  
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<title> 사용자 암호 수정</title>
<script type="text/javaScript" language="javascript" defer="defer">
<!--
function fn_go_list(){
    document.frm_manage.action = "<c:url value='/admin/user/EgovUserList.do'/>";
    document.frm_manage.submit();
}

function fn_go_before(){
    document.frm_manage.action = "<c:url value='/admin/user/EgovUserUpdateView.do'/>";
    document.frm_manage.submit();
}

function fn_save_user(){

	document.frm_manage.action = "<c:url value='/admin/user/EgovUserPwdUpdateProc.do'/>";
    document.frm_manage.submit();
}

//등록 전 입력값 체크
function fn_reg_check(){	
		
	if( $("#oldPassword").val() =="" ||  $("#newPassword").val() =="" ||  $("#newPassword2").val() =="" ) { alert("비밀번호를 입력해주세요."); return false; }
	if( $("#newPassword").val() != $("#newPassword2").val() ) { alert("비밀번호가 일치하지않습니다. 다시 입력해주세요."); return false; }
	if( $("#userId").val() == $("#newPassword").val() ) { alert("아이디와 암호가 동일하면 안됩니다."); return false; }

	//if( fnMsgRangeChk( $("#newPassword").val(), 8, 20, '암호' )==false) { $("#newPassword").focus(); return false; }
	//if( fn_chkCharWithNum( $("#newPassword").val() )==false) { alert("암호는 반드시 영어와 숫자를 혼용해서 사용해야합니다."); $("#newPassword").focus(); return false; }
	
	// 등록
	fn_save_user();
}

//Message Length Range Check Function
function fnMsgRangeChk(objMessage, nStart, nEnd, szAlertMsg) {
  var nbytes = 0;
  for (var i = 0; i < objMessage.length; i++) {
      var szChr = objMessage.charAt(i);
      if (escape(szChr).length > 4) {
          nbytes += 2;
      } else if (szChr == '\n') {
          if (objMessage.charAt(i - 1) != '\r') nbytes += 1;
      } else if (szChr == '<' || szChr == '>') {
          nbytes += 4;
      } else if (szChr == "'") {
          nbytes += 2;
      } else {
          nbytes += 1;
      }
  }
  if (nbytes < nStart) {
      alert(szAlertMsg + ' 항목을 너무 짧게 입력하셨습니다.     \n영문/숫자는 ' + nStart + '자, 한글은 ' + nStart / 2 + '자 이상으로 입력해 주십시요.     ');
      return false;
  }
  if (nbytes > nEnd) {
      alert(szAlertMsg + ' 항목을 너무 길게 입력하셨습니다.     \n영문/숫자는 ' + nEnd + '자, 한글은 ' + nEnd / 2 + '자 이내로 입력해 주십시요.     ');
      return false;
  }
}
//영어 숫자 혼용사용 체크
function fn_chkCharWithNum(str) {
var res1 = false;
var res2 = false;
var res3 = false;

res1 = (/[a-z]/i).test(str); //영문이 있는지
res2 = (/[0-9]/).test(str); //숫자가 있는지
res3 = (/^[0-9a-z_]*$/i).test(str); //영문, 숫자, _ 이외엔 없는지

//영소문이 있고, 숫자가 있으며, 영문과 숫자 이외엔 없으면 'true'
//문자, 숫자가 둘다 있어야만함
if (res1 && res2 && res3)
   return true;
else
   return false;
}

//-->
</script>
</head>
<body>
<div id="W_900">
<form name="frm_manage" method="post"   action="<c:url value="${'/admin/user/EgovUserPwdUpdateProc.do'}"/>" > 
<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
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
        	<div class="TitBx">
            	비밀번호 변경
            </div>
            <div class="ContBx">
                <div class="af">
                    <div class="stit2">비밀번호 변경</div>
                    <table class="tbview" summary="비밀번호 변경">
				        <caption>비밀번호 변경</caption>
				        <colgroup>
					        <col width="20%" /><col width="80%" />
				        </colgroup>
				        <tbody>
					        <tr>
						        <th>사용자 ID<span class="orange">*</span></th>
						        <td>
						        	<input type="text"  name="userId" id="userId"  class="input"  title="사용자아이디" value="<c:out value='${userManageVO.userId}'/>"   readonly/>
                    			</td>
                    		 </tr>
                            <tr>
						        <th>신규 비밀번호<span class="orange">*</span> </th>
						        <td><input type="password"  name="newPassword" id="newPassword" class="input"  title="비밀번호" /></td>
                            </tr>  
                            <tr>
						        <th>비밀번호확인<span class="orange">*</span> </th>
						        <td><input type="password" name="newPassword2" id="newPassword2" class="input"  title="비밀번호확인"   /></td>
                            </tr>       
				        </tbody>
			        </table>  
			        <br><span class="information">* 기존 비밀번호는 암호화 처리되어서 알 수 없습니다.</span>			
			       	<br><span class="information">* 관리자는 비밀번호 유효성 체크를 하지 않습니다. </span>			                      	
                    <div class="TreeBtBx ">
                        <div class="Btn "><a href="#" class="Btn_blue"  onclick="javascript:fn_reg_check(); return false;" >저장</a></div>
						<div class="Btn"><a href="#" class="Btn_blue"  onclick="javascript:document.frm_manage.reset();">취소</a></div>
                        <div class="Btn"><a href="#" class="Btn_blue"  onclick="javascript:fn_go_before(); return false;">이전</a></div>
                    </div>                	
               </div>
      		</div>
    	</div>
    </div>
</form>  
</div> 
</body>
</html>              
       