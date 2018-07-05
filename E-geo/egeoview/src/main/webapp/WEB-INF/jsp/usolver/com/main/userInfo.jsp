<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<script type="text/javascript">
$(document).ready(function() {
	
	// 2) input, select 항목 init
	BOOK.fn_init_formObject("userInfoForm");				
	// 3) 디폴트: 편집 불가 상태
	BOOK.fn_view_mode();				
	tabCont("ctab01");
});
	
function fn_save_user(sType){	
	
	if(false) {
        return;
	}else{		
		try {
			
			if( sType == "USER"){
				message = "사용자 정보를 변경하시겠습니까?";
				if (confirm(message)) {
					BOOK.fn_get_form("userInfoForm", "proc_frm", "<c:url value='/main/userUpdateProc.do'/>","fn_save_userInfo_callBack").submit();
				}
			}else if( sType == "AUTHOR"){
				message = "권한신청 하시겠습니까?";
				if (confirm(message)) {
					BOOK.fn_get_form("userInfoForm", "proc_frm", "<c:url value='/main/userAuthorProc.do'/>","fn_save_userInfo_callBack").submit();
				}
			}else {			
				message = "시스템 접근신청을 하시겠습니까?";
				if (confirm(message)) {
					document.userInfoForm.SYSTEM.value = sType;
					BOOK.fn_get_form("userInfoForm", "proc_frm", "<c:url value='/main/userAuthorProc.do'/>","fn_save_userInfo_callBack").submit();
				}
			}
		} catch(E) {
			COMMON.showMessage("폼데이터 변환중 오류가 발생하였습니다. :" +E);
		}
		
	}
}

//글 등록 처리후 :: 생각이 안난다..  기둘리바라.. 
function fn_save_userInfo_callBack() {			
	BOOK.fn_close_window();
	$("#startuserinfo").click();
}

function fn_logout(){
	document.userInfoForm.action="<c:url value='/userLogout.do'/>";
    document.userInfoForm.submit();
}

//권한신청시에는 기존것을 수정 못하게 하자.. 
function fn_edit_mode_author(){
	BOOK.fn_edit_mode();
	
	$('#userInfoForm').find("input[id='USER_AUTHOR_CODE']").each(function(){
		if( $(this).is(":checked") ) {
			
			$(this).attr("checked", false);
			$(this).attr("disabled", true);		//비활성화 처리 		
		
		}else 
			$(this).attr("disabled", false);		//활성화 처리 		
	});	
}

//권한신청시에는 원래대로 처리하자.. 
function fn_view_mode_author(){
		
	$('#userInfoForm').find("input[id='USER_AUTHOR_CODE']").each(function(){
		
		if( $(this).is(':disabled') ) {			
			$(this).attr("disabled", false);	
			$(this).attr("checked", true);
		}
	});
	
	BOOK.fn_reset_form();		
	BOOK.fn_view_mode();
}

//비밀번호 확인
function fn_save_password(){	
		
	if( $("#oldPassword").val() =="" ||  $("#newPassword").val() =="" ||  $("#newPassword2").val() =="" ) { alert("비밀번호를 입력해주세요."); return false; }
	if( $("#newPassword").val() != $("#newPassword2").val() ) { alert("비밀번호가 일치하지않습니다. 다시 입력해주세요."); return false; }
	if( $("#userId").val() == $("#newPassword").val() ) { alert("아이디와 비밀번호가 동일하면 안됩니다."); return false; }
	if( $("#oldPassword").val() == $("#newPassword").val() ) { alert("기존 비밀번호와 동일하면 안됩니다."); return false; }

	if( fn_chkCharWithNum( $("#newPassword").val() )==false) { $("#newPassword").focus(); return false; }
	    
    BOOK.fn_get_form("userInfoForm", "proc_frm", "<c:url value='/main/userPasswdProc.do'/>","fn_save_userInfo_callBack").submit();
}

function tabCont(tabId) {
    var chkid = tabId;

    $('#' + chkid + ' .tab_wrap > div.tabcont').hide();
    $('#' + chkid + ' .tab_wrap > div.tabcont:first').show();

    $('#' + chkid + ' .ctab_menu li:first').addClass('sel');
    
    $('#' + chkid + ' .ctab_menu li a').click(function () {
        var currentTab = $(this).attr('href');

        if ($(this).parent().hasClass('sel')) {
            //$('.tab_menu li').removeClass('sel');
            //$(currentTab).hide();
        }
        else {

            $('#' + chkid + ' .tab_wrap > div.tabcont').hide();
            
            $('#' + chkid + ' .ctab_menu li').removeClass('sel');
            $(this).parent().addClass('sel');
            $(currentTab).show();
        }

        return false;
    });
}

// 영문,숫자,특수문자 혼합하여 8자리~20자리 이내.(비밀번호 표준)
function fn_chkCharWithNum(str) {
	 
	 var pw = str;
	 var num = pw.search(/[0-9]/g);
	 var eng = pw.search(/[a-z]/ig);
	 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
	
	 if(pw.length < 8 || pw.length > 20){
		  alert("8자리 ~ 20자리 이내로 입력해주세요.");
	  	return false;
	 }
	
	 if(pw.search(/₩s/) != -1){
	 	 alert("비밀번호는 공백업이 입력해주세요.");
		  return false;
	 }
	 
	 if(num < 0 || eng < 0 || spe < 0 ){
	 	 alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
	  	return false;
	 }
	
	 return true;
}
</script>
<title>사용자정보</title>
</head>
<body>
<div id="W_640">
<form id="userInfoForm" name="userInfoForm" method="post" >
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value='<c:out value="${action_flag}"/>' /> 
<input type="hidden"	id="screen_mode" name="screen_mode" value="" /> 
<input type="hidden" id="callBackFunction" name="callBackFunction" value="" /> 
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value='<c:out value="${nJDSKMasterId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
<input type="hidden"  id="USER_ID" name="USER_ID" value='<c:out value="${result.USER_ID}"/>' />
<input type="hidden"  id="userId"  name="userId"value='<c:out value="${result.USER_ID}"/>' />
<input type="hidden"  id="SYSTEM" name="SYSTEM" />
    <div>
        <div class="user_content">
            <div id="ctab01">	
                <ul class="ctab_menu">
			        <li><a href="#c_cnt01">사용자 정보</a></li>
			        <li><a href="#c_cnt02">비밀번호 재설정</a></li>
			        <li><a href="#c_cnt03">권한 정보</a></li>
                </ul>
                <div class="tab_wrap">
			        <div id="c_cnt01" class="tabcont">
                        <div style="overflow-x:hidden;;height:200px">
                        <table class="tbview" summary="사용자정보">
				            <caption>사용자정보</caption>
				            <colgroup>
					            <col width="15%" /><col width="35%" /><col width="15%" /><col width="35%" />
				            </colgroup>
				            <tbody>
					            <tr>
						            <th>아이디 </th>
						            <td colspan="3"><c:out value="${result.USER_ID}"/></td>
					            </tr>
					            <tr>
						            <th>사용자명</th>
						            <td colspan="3"><input type="text" name="USER_NAME" id="USER_NAME"  	value='<c:out value="${result.USER_NAME}"/>' class="input" /></td>
					            </tr>
                                <tr>
						            <th>부서정보</th>
						            <td><select name="USER_DEPT" id="USER_DEPT"  class="select" >
													<option value=""></option>
													<c:forEach var="selectData" items="${dept_cde_list}">
													<option value="${selectData.g2Code}" <c:if test = "${selectData.g2Code == result.USER_DEPT}"> selected="selected" </c:if> >${selectData.g2Value}</option>
													</c:forEach>
												</select>
									</td>
                                    <th>전화번호</th>
						            <td><input type="text" name="USER_TEL"  id="USER_TEL"  value='<c:out value="${result.USER_TEL}"/>'  class="input" /></td>
					            </tr>
                                <tr>
						            <th>비고</th>
						            <td colspan="3"><input type="text"  style="width:355px"  name="USER_DESC" id="USER_DESC"  	value='<c:out value="${result.USER_DESC}"/>'  class="input" /></td>
					            </tr>
                                <tr>
						            <th>등록일자</th>
						            <td><c:out value="${result.REQ_DATE}"/></td>
                                    <th>비번변경일자</th>
						            <td><c:out value="${result.PW_DATE}"/></td>
					            </tr>
				            </tbody>
			            </table>
			            </div>
			            <div class="TreeBtBx">
			                <div class="Btn"><a href="#" class="Btn_blue btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
			                <div class="Btn"><a href="#" class="Btn_blue btnClassEdit" onclick='fn_save_user("USER")'>수정</a></div>
			                <div class="Btn"><a href="#" class="Btn_blue btnClassEdit" onclick='BOOK.fn_reset_form();BOOK.fn_view_mode()'>취소</a></div>
			                <div class="Btn"><a href="#" class="Btn_blue btnClassView" onclick="BOOK.fn_close_window();">닫기</a></div>
			            </div>
                    </div>
                    <div id="c_cnt02" class="tabcont">
                        <div style="overflow-x:hidden;;height:200px">
                        <table class="tbview" summary="비밀번호재설정">
				            <caption>비밀번호</caption>
				            <colgroup>
					            <col width="25%" /><col width="75%" />
				            </colgroup>
				            <tbody>
					            <tr>
							        <th>기존 비밀번호<span class="orange">*</span> </th>
							        <td><input type="password"  name="oldPassword" id="oldPassword" class="input"  title="기존 비밀번호" /></td>
	                            </tr>
	                            <tr>
							        <th>신규 비밀번호<span class="orange">*</span> </th>
							        <td><input type="password"  name="newPassword" id="newPassword" class="input"  title="신규 비밀번호" />
							        	 ( 영문,숫자,특수문자 혼합하여 8자리~20자리 이내 )	
							        </td>
	                            </tr>  
	                            <tr>
							        <th>신규 비밀번호확인<span class="orange">*</span> </th>
							        <td><input type="password" name="newPassword2" id="newPassword2" class="input"  title="신규 비밀번호확인"   /></td>
	                            </tr>       					            
				            </tbody>
			            </table>
			            <br>
			             <span class="blue">* 비밀번호는 3개월에 1번씩 주기적으로 변경해 주시는 것이 좋습니다. </span>
			            </div>
			            <div class="TreeBtBx">
			                <div class="Btn"><a href="#" class="Btn_blue btnClassView" onclick='BOOK.fn_edit_mode()'>편집</a></div>
			                <div class="Btn"><a href="#" class="Btn_blue btnClassEdit" onclick='fn_save_password()'>저장</a></div>
			                <div class="Btn"><a href="#" class="Btn_blue btnClassEdit" onclick='BOOK.fn_reset_form();BOOK.fn_view_mode()'>취소</a></div>
			                <div class="Btn"><a href="#" class="Btn_blue btnClassView" onclick="BOOK.fn_close_window();">닫기</a></div>
			            </div>
                    </div>
                    <div id="c_cnt03" class="tabcont" >                    	
                        <div style="overflow-x:hidden;;height:200px">                        
                        <table class="tblist" summary="사용자권한정보">
				            <caption>사용자권한정보</caption>
				            <colgroup>
					            <col width="33%" />
				                <col width="33%" />
				                <col width="34%" />
				            </colgroup>
                            <thead>
                            	 <tr>           
									<th class="ac"><div title='<c:out value="${author_water_list[0].authorDc}"/>'><c:out value="${author_water_list[0].authorNm}"/><c:set var="author_water_regYn" value="${author_water_list[0].regYn}" /></div></th>		
									<th class="ac"><div title='<c:out value="${author_sewer_list[0].authorDc}"/>'><c:out value="${author_sewer_list[0].authorNm}"/><c:set var="author_sewer_regYn" value="${author_sewer_list[0].regYn}" /></div></th>						
									<th class="ac"><div title='<c:out value="${author_road_list[0].authorDc}"/>'><c:out value="${author_road_list[0].authorNm}"/><c:set var="author_road_regYn" value="${author_road_list[0].regYn}" /></div></th>													
							 	</tr>
                            </thead>
				            <tbody>
					            <tr>
                                    <td>
                                        <c:if test="${ author_water_regYn eq 2 && !empty author_water_list }">
	                                       <ul class="list">                                        
	                                        <c:forEach var="author_water_list" items="${author_water_list}" >	                                        
	                                        <c:if test="${author_water_list.authorCode ne 'ROLE_WATER'}" >
	                                        	<c:set var="selectRegYn" value="${author_water_list.regYn}" />											
												<li><input type="checkbox"  id="USER_AUTHOR_CODE"   value="WATER_${author_water_list.authorCode}" <c:if test="${selectRegYn > 0 }"> checked="true" </c:if> />
													<%-- <div title='<c:out value="${author_water_list.authorDc}"/>'> --%>
													<c:out value="${author_water_list.authorNm}"/> 
													<!-- </div> -->
													<c:choose>
														<c:when test="${selectRegYn eq '2'}" > [<span class="red">승인</span>]</c:when>
														<c:when test="${selectRegYn eq '1'}" > [<span class="red">신청중</span>]</c:when>
													</c:choose>
												</li>	
											</c:if>	
											</c:forEach>
											 </ul>
										</c:if>
										<c:if test="${author_water_regYn eq 1}"><div style="line-height:150px;"><c:out value="${author_water_list[0].reqDate}"/> 신청되었습니다.</div></c:if> 
										<c:if test="${author_water_regYn eq 0}"><div style="line-heigh:150px"><a href='#'  class="Btn_gray" onclick='fn_save_user("WATER")'>시스템 접근 신청</a></div></c:if>
                                    </td>                                    
                                    <td>
                                    	<c:if test="${ author_sewer_regYn eq 2  && !empty author_sewer_list }">                                    	
	                                       <ul class="list">                                        
	                                        <c:forEach var="author_sewer_list" items="${author_sewer_list}">
	                                        <c:if test="${author_sewer_list.authorCode ne 'ROLE_SEWER'}" >
											<c:set var="selectRegYn" value="${author_sewer_list.regYn}" />
												<li><input type="checkbox"  id="USER_AUTHOR_CODE"   value="SEWER_${author_sewer_list.authorCode}"  <c:if test="${selectRegYn > 0 }"> checked="true" </c:if> />
													<%-- <div title='<c:out value="${author_sewer_list.authorDc}"/>'> --%>
													<c:out value="${author_sewer_list.authorNm}"/> 
												<!-- 	</div> -->
													<c:choose>
														<c:when test="${selectRegYn eq 2}" > [<span class="red">승인</span>]</c:when>
														<c:when test="${selectRegYn eq 1}" > [<span class="red">신청중</span>]</c:when>
													</c:choose>
													</li>
											</c:if>
											</c:forEach>											
											 </ul>
										</c:if>
										<c:if test="${author_sewer_regYn eq 1}"><div style="line-heigh:150px"><c:out value="${author_sewer_list[0].reqDate}"/> 신청되었습니다.</div></c:if> 
										<c:if test="${author_sewer_regYn eq 0}"><div style="line-heigh:150px"><a href='#'  class="Btn_gray" onclick='fn_save_user("SEWER")'>시스템 접근 신청</a></div></c:if> 
                                    </td>
                                    <td>
                                       <c:if test="${ author_road_regYn eq 2 && !empty author_road_list }">
	                                       <ul class="list">                                        
	                                        <c:forEach var="author_road_list" items="${author_road_list}">
	                                        <c:if test="${author_road_list.authorCode ne 'ROLE_ROAD'}" >
												<li><input type="checkbox"  id="USER_AUTHOR_CODE"   value="ROAD_${author_road_list.authorCode}"  <c:if test="${author_road_list.regYn > 0}"> checked="true" </c:if> />
													<%-- <div title='<c:out value="${author_road_list.authorDc}"/>'> --%>
													<c:out value="${author_road_list.authorNm}"/> 
													<!-- </div> -->
													<c:choose>
														<c:when test="${author_road_list.regYn eq 2}" > [<span class="red">승인</span>]</c:when>
														<c:when test="${author_road_list.regYn eq 1}" > [<span class="red">신청중</span>]</c:when>
													</c:choose>
													</li>
											</c:if>
											</c:forEach>
											 </ul>
										</c:if>
										<c:if test="${author_road_regYn eq 1}"><div style="line-heigh:150px"><c:out value="${author_road_list[0].reqDate}"/> 신청되었습니다.</div></c:if> 
										<c:if test="${author_road_regYn eq 0}"><div style="line-heigh:150px"><a href='#'  class="Btn_gray" onclick='fn_save_user("ROAD")'>시스템 접근 신청</a></div></c:if>
                                    </td>
                                </tr>
				            </tbody>
			            </table>
			            </div>			    
			        <!--     <div class="BtnR">  도움말 아이콘.. ^^ 
                        	<a href="#" onClick="fn_open_helpdesk('helpdesk')" ><img src="/images/usolver/com/map/top/top_b17_off.png"></a>
                        </div>         -->
				        <div class="TreeBtBx">
			                <c:if test="${ (!empty author_water_list ) || (!empty author_sewer_list) ||  (!empty author_road_list)}">
							<div class="Btn"><a href="#" class="Btn_blue btnClassView" onclick='fn_edit_mode_author()'>편집</a></div>
							</c:if>
							<div class="Btn"><a href="#" class="Btn_blue btnClassEdit" onclick='fn_save_user("AUTHOR")'>권한신청</a></div>
							<div class="Btn"><a href="#" class="Btn_blue btnClassEdit" onclick='fn_view_mode_author()'>취소</a></div>
							<div class="Btn"><a href="#" class="Btn_blue btnClassView" onclick="BOOK.fn_close_window();">닫기</a></div>
			            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	</form>	
<%@ include file="/common/include/common.jsp"%>
</div><!-- wrap2 End -->
</body>
</html>