<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title></title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/reset.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/login.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/slider-pro.css'/>" media="screen"/>
<%-- <link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/slider-pro.css'/>" media="screen"/> --%>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/mapFrame.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/sliderPro/jquery.sliderPro.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/scrollto/jquery.scrollto.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/namespace.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/book.js'/>"></script><!--등록 -->
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/common.js'/>"></script>
<script type="text/javascript">
$(document).ready(function() {
	
	// 중복체크 확인용 플래그
	idCheckFlag = "N";
	
	// 아이디 변경되면 중복체크여부 N으로 변경
	$("#USER_ID").keyup(function(){
		idCheckFlag = "N";
	});
	
	<c:if test="${not empty param.fail}">
		alert( "다시 로그인 해주시기 바랍니다.\n사유: ${sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message}");
	</c:if>	  	
	
	
	 $("input[name=j_password]").keydown(function (key) {
		 
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)  
           var thisForm = $(this).parents('form').attr('id');
           $("#"+thisForm).submit();       
        }
 
   	 });
	 
});

function fn_idCheked(){
	var id = $("#USER_ID").val();

	if( id=="" || id==null ) {
		alert("아이디를 입력해주세요.");
		$("#USER_ID").focus();
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
				$("#USER_ID").focus();					
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


//등록 전 입력값 체크
function fn_reg_check(){	

	if( $("#USER_NAME").val() =="" ) { alert("성명을 입력해주세요"); $("#USER_NAME").focus(); return false; }		
	if( $("#USER_ID").val() =="" ) { alert("아이디를 입력해주세요"); return false; }
	if( $("#userId").val() =="Standard" ) { alert("시스템이 사용하는 ID입니다. 사용하실 수 없습니다."); return false; }
	if( idCheckFlag=="N" ) { alert("아이디 중복체크를 해주세요."); return false; }
	if( $("#PASSWORD").val() =="" ||  $("#RE_PASSWORD").val() =="" ) { alert("비밀번호를 입력해주세요."); return false; }
	if( $("#PASSWORD").val() != $("#RE_PASSWORD").val() ) { alert("비밀번호가 일치하지않습니다. 다시 입력해주세요."); return false; }
	if( $("#USER_ID").val() == $("#PASSWORD").val() ) { alert("아이디와 암호가 동일하면 안됩니다."); return false; }

	if( $("#USER_TEL").val() =="" ) { alert("전화번호를 입력해주세요"); $("#USER_TEL").focus(); return false; }	
	if( $("#USER_DEPT").val() =="" ) { alert("부서를 선택해주세요"); $("#USER_DEPT").focus(); return false; }	
	
	var uId = $("#USER_ID").val();
	
	if( uId.length < 4 ){
		alert("아이디는 4자리 이상 입력해주세요.");
		$("#USER_ID").focus(); return false;
	 }

	if( fn_chkCharWithNum( $("#PASSWORD").val() )==false) { $("#PASSWORD").focus(); return false; }
	
	// 등록
	fn_save_user();
}

function fn_save_user(){	
	
	if ( idCheckFlag == "N" ){
		alert("아이디 중복체크를 하시기 바랍니다. ");
		return false;
	}
	
	if (confirm('시스템 권한을 신청하시겠습니까?')) {
		try {
			// multipart/form-data 아닌 경우, mask 처리 값을 제거하여 폼 데이터를 전송 처리함
			BOOK.fn_get_form("userInfoForm", "proc_frm", "<c:url value='/userRegProc.do'/>","fn_save_callBack").submit();
		} catch(E) {
			COMMON.showMessage("폼데이터 변환중 오류가 발생하였습니다. :" +E);
		}
	}

}

// 글 등록 처리후 :: 생각이 안난다..  기둘리바라.. 
function fn_save_callBack() {		
	document.userInfoForm.reset();
}

//영문,숫자,특수문자 혼합하여 8자리~20자리 이내.(비밀번호 표준)
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
</head>
<body>
	<div id="content">
			<div id="msilder" class="slider-pro">
				<div class="sp-slides">
					<div class="sp-slide">
						<img class="sp-image" src="<c:url value='/images/usolver/com/cmm/login/slider-bg1.jpg'/>" alt=""/>
						
		                <p class="sp-layer sp-tit sp-padding" 
							data-horizontal="150" data-vertical="70" 
							data-show-transition="right" data-hide-transition="left" data-show-delay="500" >
							Easy to use
						</p>
		
						<p class="sp-layer sp-txt sp-padding hide-small-screen" 
							data-horizontal="150" " data-vertical="140" 
							data-show-transition="left" data-show-delay="700" data-hide-transition="right" data-hide-delay="200">
							기술에 경험을 더한 사용자 중심 인터페이스
						</p>
					</div>
		
			        <div class="sp-slide">
			        	<img class="sp-image" src="<c:url value='/images/usolver/com/cmm/login/slider-bg2.jpg'/>" alt=""/>
						<p class="sp-layer sp-tit sp-padding" 
							data-horizontal="150" data-vertical="70" 
							data-show-transition="right" data-hide-transition="left" data-show-delay="500" >
							Sharing, GeoCoording
						</p>
		
						<p class="sp-layer sp-txt sp-padding hide-small-screen" 
							data-horizontal="150" " data-vertical="140" 
							data-show-transition="left" data-show-delay="700" data-hide-transition="right" data-hide-delay="200">
							잠든 정보에 생명을 불어 넣다
						</p>
					</div>
		
					<div class="sp-slide">
						<img class="sp-image" src="<c:url value='/images/usolver/com/cmm/login/slider-bg3.jpg'/>" alt=""/>
						<p class="sp-layer sp-tit sp-padding" 
							data-horizontal="150" data-vertical="70" 
							data-show-transition="right" data-hide-transition="left" data-show-delay="500" >
							Super powerful Visual Information
						</p>		
						<p class="sp-layer sp-txt sp-padding hide-small-screen" 
							data-horizontal="150" data-vertical="140" 
							data-show-transition="left" data-show-delay="700" data-hide-transition="right" data-hide-delay="200">
							보다, 이해하다
						</p>
					</div>
				</div>
		    </div>
		    <div class="loginBx">
		        <div class="loginInbx">
		            <div class="loginContbx">
		                <div id="hero-slider">
			                <ul>
				                <li><a href="#" rel="#panel-1" class="bg1 active"><span class="hidden">공지사항</span> </a></li>
				                <li><a href="#" rel="#panel-2" class="bg2"><span class="hidden">DashBoard</span> </a></li>
				                <li><a href="#" rel="#panel-3" class="bg3"><span class="hidden">시스템 권한신청</span> </a></li>
			                </ul>
			                <div class="mask">
				                <div class="slider-body">
					                <div class="panel" id="panel-1">
						                <h2>공지사항</h2>
						                <p>최신 공지사항을 확인 하실 수 있습니다. </p>
		                                <dl>
		                                	<c:forEach var="bbsList"  items="${bbsList}"  begin="0" end="4" step="1" >
					                        <dt><c:out value="${bbsList.TITLE_TEXT}"/><span><c:out value="${bbsList.REGIST_DATE}"/></span></dt>
					                        <dd>
		                                        <div>
		                                           <c:out value="${bbsList.BODY_TEXT}"/>
		                                        </div>
		                                    </dd>
		                                   </c:forEach>
		                                   <c:if test="${fn:length(bbsList) eq 0}">
					                        <dt>등록된 공지사항이 없습니다.<span></span></dt>
					                        <dd>
		                                        <div>관리자에서 공지사항을 등록해 주시기 바랍니다.</div>
		                                    </dd>
					                        </c:if>		                                    
					                    </dl>
					                </div>
					                <div class="panel" id="panel-2">
						                <h2>DashBoard</h2>
						                <p>시설물 편집현황과 시공사 신규시설 갱신현황을 확인 하실 수 있습니다. </p>
		                                <div class="blueBx">
		                                    <h4>시설물 편집현황</h4>
		                                    <div class="blueInbx"></div>
		                                </div>
		                                <div class="blueBx mt10">
		                                    <h4>시공사 신규시설 갱신현황</h4>
		                                    <div class="blueInbx"></div>
		                                </div>
		                            </div>
					                <div class="panel" id="panel-3">
					                	<form name="userInfoForm" id="userInfoForm"  method="POST">
					                	<input type="hidden" id="action_flag" name="action_flag" value='<c:out value="${action_flag}"/>' /> 
										<input type="hidden" id="callBackFunction" name="callBackFunction" value="" /> 
						                <h2>사용자 등록 및 권한신청</h2>
						                <p>처음 이용하는 사용자는 사용자 등록 및 권한 신청을 하셔야 합니다. </p>
		                                <div id="user" class="blueBx">
		                                    <h4>사용자등록 및 권한신청</h4>
		                                    <div class="blueInbx" style="height:300px">
		                                        <ul>
		                                            <li><label>사용자명 : </label><input type="text" name="USER_NAME" id="USER_NAME"  style="width:265px" /></li>
		                                            <li><label>아이디 : </label><input type="text" name="USER_ID" id="USER_ID"  style="width:130px" /> <a href="#" id="idCheck"  onClick="fn_idCheked()"><img src="/images/usolver/com/cmm/login/check.gif" /></a></li>
		                                            <li><label>비밀번호 : </label><input type="password" name="PASSWORD" id="PASSWORD"  style="width:265px" /></li>
		                                            <li><label>비밀번호 확인 : </label><input type="password" name="RE_PASSWORD" id="RE_PASSWORD"  style="width:265px" /></li>
		                                            <li><label>부서정보 : </label><select name="USER_DEPT" id="USER_DEPT"  style="width:270px">
														<option value=""></option>
														<c:forEach var="selectData" items="${dept_cde_list}">
														<option value="${selectData.g2Code}" >${selectData.g2Value}</option>
														</c:forEach>
													</select></li>
		                                            <li><label>전화번호 : </label><input type="text" name="USER_TEL" id="USER_TEL"  style="width:265px" /></li>
		                                         	<li><label>시스템명 : </label><select name="SYSTEM" id="SYSTEM"  style="width:270px">
														<option></option>
														<c:forEach var="selectData" items="${sys_cde_list}">
														<option value="${selectData.g2Code}" >${selectData.g2Value}</option>
														</c:forEach>
													</select></li>
		                                            <li class="ac" style="margin-top:40px"><span class="darkblueBtn"><a href="#" onClick="fn_reg_check()">권한신청</a></span></li>
		                                        </ul>
		                                    </div>
		                                </div>			                             
					                </form>
				                </div>
			                </div> <!-- .mask -->
			                <div class="clear"></div>
		                </div> <!-- #hero-slider -->		
		            </div>
		            </div>
		            <div class="loginContbx sysloginBg">
		                <ul>
				            <li>
		                        <a href="#" class="sysic01">
		                            <img src="<c:url value='/images/usolver/com/cmm/login/menu_sys01.png'/>" alt="상수관리시스템" class="img-swap" id="sys1"/>
		                            <img src="<c:url value='/images/usolver/com/cmm/login/menu_sys01_on.png'/>" alt="상수관리시스템" class="img-swap" id="sys1_on"/>
		                        </a>
		                        <div id="sysbx1">
		                            <img src="<c:url value='/images/usolver/com/cmm/login/sys_title1.png'/>" alt="상수관리시스템-상수관리시스템에 오신것을 환영합니다.로그인 하신 후에 시스템을 자유롭게 사용하실 수 있습니다" />
		                            <form name="loginForm1"  id="loginForm1"  action="<c:url value='/userLogin.do'/>" method="POST">			
		                            <input type="hidden" id="SYSTEM" name="SYSTEM"  value="WATER" />			
		                            <div class="loginfrom">
		                                <p><c:if test="${not empty param.fail}">
												<font color="red">다시 로그인 해주시기 바랍니다.<BR><BR></font>
											</c:if>	  
										</p><c:if test="${empty param.fail}">
		                                		<p>로그인하신 후 사용하여 주세요</p>
		                                	</c:if>
		                                <div>
		                                    <ul class="FL">
		                                        <li>
		                                            <input type="text" id="j_username" name="j_username" class="ilogin" title="아이디를 입력하세요" <c:if test="${not empty param.fail}">value='<c:out value="${SPRING_SECURITY_LAST_USERNAME}"/>'</c:if>/> 
		                                        </li>
		                                        <li>
		                                            <input type="password" id="j_password" name="j_password" class="ilogin" title="비밀번호를 입력하세요"/> 
		                                        </li>
		                                    
		                                    </ul>
		                                    <p class="FR" style="margin-right:20px">
		                                        <a href="#" onClick="loginForm1.submit()"><img src="<c:url value='/images/usolver/com/cmm/login/btn_login.png'/>" alt="로그인" onMouseOver="this.src='<c:url value='/images/usolver/com/cmm/login/btn_login_on.png'/>'" onMouseOut="this.src='<c:url value='/images/usolver/com/cmm/login/btn_login.png'/>'" /></a>
		                                    </p>
		                                </div>
		                            </div>
		                            </form>
		                        </div>
		                    </li>
				            <li>
		                        <a href="#" class="sysic02">
		                            <img src="<c:url value='/images/usolver/com/cmm/login/menu_sys02.png'/>" alt="하수관리시스템" class="img-swap" id="sys2"/>
		                            <img src="<c:url value='/images/usolver/com/cmm/login/menu_sys02_on.png'/>" alt="하수관리시스템" class="img-swap" id="sys2_on"/>
		                        </a>
		                        <div id="sysbx2">
		                            <img src="<c:url value='/images/usolver/com/cmm/login/sys_title2.png'/>" alt="하수관리시스템-하수관리시스템에 오신것을 환영합니다.로그인 하신 후에 시스템을 자유롭게 사용하실 수 있습니다" />
		                            <form name="loginForm2"   id="loginForm2"  action="<c:url value='/userLogin.do'/>" method="POST">
		                            <input type="hidden" id="SYSTEM"  name="SYSTEM" value="SEWER" />
		                            <div class="loginfrom">
		                                <p><c:if test="${not empty param.fail}">
												<font color="red">다시 로그인 해주시기 바랍니다.<BR><BR></font>
											</c:if>	  
										</p><c:if test="${empty param.fail}">
		                                		<p>로그인하신 후 사용하여 주세요</p>
		                                	</c:if>
		                                <div>
		                                    <ul class="FL">
		                                        <li>
		                                            <input type="text" id="j_username" name="j_username" class="ilogin" title="아이디를 입력하세요" <c:if test="${not empty param.fail}">value='<c:out value="${SPRING_SECURITY_LAST_USERNAME}"/>'</c:if>/> 
		                                        </li>
		                                        <li>
		                                            <input type="password" id="j_password" name="j_password" class="ilogin" title="비밀번호를 입력하세요"/> 
		                                        </li>
		                                    
		                                    </ul>
		                                    <p class="FR" style="margin-right:20px">
		                                        <a href="#" onClick="loginForm2.submit()"><img src="<c:url value='/images/usolver/com/cmm/login/btn_login.png'/>" alt="로그인" onMouseOver="this.src='<c:url value='/images/usolver/com/cmm/login/btn_login_on.png'/>'" onMouseOut="this.src='<c:url value='/images/usolver/com/cmm/login/btn_login.png'/>'" /></a>
		                                    </p>
		                                </div>
		                            </div>
		                            </form>
		                        </div>
		                    </li>
				            <li>
		                        <a href="#" class="sysic03">
		                            <img src="<c:url value='/images/usolver/com/cmm/login/menu_sys03.png'/>" alt="도로관리시스템" class="img-swap" id="sys3"/>
		                            <img src="<c:url value='/images/usolver/com/cmm/login/menu_sys03_on.png'/>" alt="도로관리시스템" class="img-swap" id="sys3_on"/>
		                        </a>
		                        <div id="sysbx3">
		                            <img src="<c:url value='/images/usolver/com/cmm/login/sys_title3.png'/>" alt="도로관리시스템-도로관리시스템에 오신것을 환영합니다.로그인 하신 후에 시스템을 자유롭게 사용하실 수 있습니다" />
		                            <form name="loginForm3"   id="loginForm3"  action="<c:url value='/userLogin.do'/>"  method="POST">
		                            <input type="hidden" id="SYSTEM"  name="SYSTEM" value="ROAD" />
		                            <div class="loginfrom">
		                                <p><c:if test="${not empty param.fail}">
												<font color="red">다시 로그인 해주시기 바랍니다.<BR><BR></font>
											</c:if>	  
										</p><c:if test="${empty param.fail}">
		                                		<p>로그인하신 후 사용하여 주세요</p>
		                                	</c:if>
		                                <div>
		                                    <ul class="FL">
		                                        <li>
		                                            <input type="text" id="j_username" name="j_username" class="ilogin" title="아이디를 입력하세요" <c:if test="${not empty param.fail}">value='<c:out value="${SPRING_SECURITY_LAST_USERNAME}"/>'</c:if>/> 
		                                        </li>
		                                        <li>
		                                            <input type="password" id="j_password" name="j_password" class="ilogin" title="비밀번호를 입력하세요"/> 
		                                        </li>
		                                    
		                                    </ul>
		                                    <p class="FR" style="margin-right:20px">
		                                        <a href="#" onClick="loginForm3.submit()"><img src="<c:url value='/images/usolver/com/cmm/login/btn_login.png'/>" alt="로그인" onMouseOver="this.src='<c:url value='/images/usolver/com/cmm/login/btn_login_on.png'/>'" onMouseOut="this.src='<c:url value='/images/usolver/com/cmm/login/btn_login.png'/>'" /></a>
		                                    </p>
		                                </div>
		                            </div>
		                            </form>
		                        </div>
		                    </li>
			            </ul>
		            </div>
		        </div>
		    </div>
		</div>
		<!-- // content -->
		<!-- footer -->
		<div id="footer">
			<div class="footer_tx">U-Solver 3 for Web </div>
		</div>  
		<!-- // footer -->
<%@ include file="/common/include/common.jsp"%>
</body>
</html>