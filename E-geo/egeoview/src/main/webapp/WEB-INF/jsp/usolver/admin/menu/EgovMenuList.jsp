<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
 /**
  * @Class Name : EgovMenuList.jsp
  * @Description : 메뉴목록 화면
  * @Modification Information
  * @
  * @  수정일         수정자         수정내용
  * @ ----------- 	 --------    ---------------------------
  * @ 2009.03.10	   이용          최초 생성
  * @ 2013.10.04	  이기하         메뉴트리 위치 변경
  *
  *  @author 공통서비스 개발팀 이용
  *  @since 2009.03.10
  *  @version 1.0
  *  @see
  *
  */

  /* Image Path 설정 */
  //String imagePath_icon   = "/images/egovframework/com/admin/menu/icon/";
  //String imagePath_button = "/images/egovframework/com/admin/menu/button/";
%>
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
<title>메뉴정보등록</title>
<script language="javascript1.2" type="text/javaScript" src="<c:url value='/js/usolver/admin/EgovMenuList.js' />"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script language="javascript1.2" type="text/javaScript" defer="defer">	

$(document).ready(function(){
    $('#menuType').change(function(){
    	
    	$('#checkboxArea').css({'display':''});
    	$('.disDir').css({'display':''});
    	$('#relateImageNm input').val('');
		$('#relateImagePath input').val('');
		$('#relateImageNm').css({'display':''});
		$('#relateImagePath').css({'display':''});
		$('#viewInfo').css({'visible':'hidden'});
		$('#viewInfo span').css({'display':'none'});
		
		if($(this).val() == 'dir' || $(this).val() == 'INFO'){
			$('#checkboxArea').css({'display':'none'});
			
			if($(this).val() == 'dir'){
				$('.disDir').css({'display':'none'});
				
				$('#relateImageNm input').val('/');
				$('#relateImagePath input').val('/');
			}else{
				$('#viewInfo span').css({'display':''})
				$('#relateImageNm').css({'display':'none'});
				$('#relateImagePath').css({'display':'none'});
			}
		}
    });
});

/* ********************************************************
 * 파일검색 화면 호출 함수
 ******************************************************** */
function searchFileNm() {
	document.menuManageVO.tmp_SearchElementName.value = "progrmFileNm";
	window.parent.REGISTER.fn_open_nJDSKWindow("프로그램 파일명 조회", "<c:url value='/admin/program/EgovProgramListSearch.do' />?", 600, 600,"addPopup");
}

/* ********************************************************
 * 메뉴등록 처리 함수
 ******************************************************** */
function insertMenuList() {
	if(!fn_validatorMenuList()){return;}
    if(document.menuManageVO.tmp_CheckVal.value == "U"){alert("상세조회시는 수정혹은 삭제만 가능합니다."); return;}
	document.menuManageVO.action = "<c:url value='/admin/menu/EgovMenuListInsert.do'/>";
	menuManageVO.submit();

}

/* ********************************************************
 * 메뉴수정 처리 함수
 ******************************************************** */
function updateMenuList() {
    if(!fn_validatorMenuList()){return;}
    if(document.menuManageVO.tmp_CheckVal.value != "U"){alert("상세조회시는 수정혹은 삭제만 가능합니다. 초기화 하신 후 등록하세요."); return;}
	document.menuManageVO.action = "<c:url value='/admin/menu/EgovMenuListUpdt.do'/>";
	menuManageVO.submit();
}

/* ********************************************************
 * 메뉴삭제 처리 함수
 ******************************************************** */
function deleteMenuList() {
    if(!fn_validatorMenuList()){return;}
    if(document.menuManageVO.tmp_CheckVal.value != "U"){alert("상세조회시는 수정혹은 삭제만 가능합니다."); return;}
	document.menuManageVO.action = "<c:url value='/admin/menu/EgovMenuListDelete.do'/>";
	menuManageVO.submit();
}

/* ********************************************************
 * 메뉴리스트 조회 함수
 ******************************************************** */
function selectMenuList() {
    document.menuManageVO.action = "<c:url value='/admin/menu/EgovMenuListSelect.do'/>";
    document.menuManageVO.submit();
}

/* ********************************************************
 * 메뉴이동 화면 호출 함수
 ******************************************************** */
function mvmnMenuList() {

	window.parent.REGISTER.fn_open_nJDSKWindow("상위 메뉴 No 조회", "<c:url value='/admin/menu/EgovMenuListSelectMvmn.do'/>?",450,530,"addPopup");
}

/* ********************************************************
 * 초기화 함수
 ******************************************************** */
function initlMenuList() {
	
	$.ajax({
		type: 'get',
		dataType: 'json',
		url: '/admin/menu/SelectNewMenuNo.do',
		success: function(_data) {
			document.menuManageVO.menuNo.readOnly = true;
			document.menuManageVO.menuNo.value = _data.newMenuNo;
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
	
	document.menuManageVO.upperMenuNo.value = "";
	document.menuManageVO.menuNm.value = "";
	document.menuManageVO.menuOrdr.value = "";
	document.menuManageVO.progrmFileNm.value = "";
	document.menuManageVO.menuDc.value = "";
	document.menuManageVO.relateImagePath.value = "";
	document.menuManageVO.relateImageNm.value = "";
	
	for(var j=0; j<10; j++){
		$('#checkboxArea').css({'display':''});
		document.menuManageVO.functionList[j].checked = false;
	}
	
	document.menuManageVO.menuId.value = "";
	document.menuManageVO.width.value = "";
	document.menuManageVO.height.value = ""
	document.menuManageVO.insertHeight.value = "";
	document.menuManageVO.call.value = "";
	document.menuManageVO.keyColumn.value = "";
	document.menuManageVO.menuType.value = "";
	document.menuManageVO.tmp_CheckVal.value = "";
}

/* ********************************************************
 * 조회 함수

 ******************************************************** */
function selectMenuListTmp() {
	document.menuManageVO.req_RetrunPath.value = "/admin/menu/EgovMenuList";
    document.menuManageVO.action = "<c:url value='/admin/menu/EgovMenuListSelectTmp.do'/>";
    document.menuManageVO.submit();
}

/* ********************************************************
 * 상세내역조회 함수
 ******************************************************** */
 function choiceNodes(nodeNum) {

		var nodeValues = treeNodes[nodeNum].split("|");
		var chk_functionList;
		
		document.menuManageVO.menuNo.value = nodeValues[0];
		document.menuManageVO.upperMenuNo.value = nodeValues[1];
		document.menuManageVO.menuNm.value = nodeValues[2];
		document.menuManageVO.menuOrdr.value = nodeValues[3];
		document.menuManageVO.progrmFileNm.value = nodeValues[4];
		document.menuManageVO.menuDc.value = nodeValues[5];
		document.menuManageVO.relateImagePath.value = nodeValues[6];
		document.menuManageVO.relateImageNm.value = nodeValues[7];
		
		if(document.menuManageVO.upperMenuNo.value == 0 || nodeValues[15] !== 'MAIN'){
			$('#checkboxArea').css({'display':'none'});
		}else{
			$('#checkboxArea').css({'display':''});
			
			//초기화
			for(var j=0; j<10; j++){
				$('#checkboxArea').css({'display':''});
				document.menuManageVO.functionList[j].checked = false;
			}
			
			chk_functionList = nodeValues[8].split(',');
			
			if(chk_functionList == ""){
				for(var j=0; j<10; j++) 
					document.menuManageVO.functionList[j].checked = false;
			}else{
				for(var i=0; i<chk_functionList.length; i++){
					for(var j=0; j<10; j++){
						if(document.menuManageVO.functionList[j].value === chk_functionList[i])
							document.menuManageVO.functionList[j].checked = true;
					}
				}
			}
		}
		
		document.menuManageVO.menuId.value = nodeValues[9];
		document.menuManageVO.width.value = nodeValues[10];
		document.menuManageVO.height.value = nodeValues[11];
		document.menuManageVO.insertHeight.value = nodeValues[12];
		document.menuManageVO.call.value = nodeValues[13];
		document.menuManageVO.keyColumn.value = nodeValues[14];
		document.menuManageVO.menuType.value = nodeValues[15];
		
		document.menuManageVO.menuNo.readOnly=true;
		document.menuManageVO.tmp_CheckVal.value = "U";
}

/* ********************************************************
 * 입력값 validator 함수
 ******************************************************** */
function fn_validatorMenuList() {
	
	if(document.menuManageVO.menuType.value == "INFO"){
		if(document.menuManageVO.menuId.value == ""){
			alert("메뉴ID는 Not Null 항목입니다."); 
			return false;
		}
	}
	
	if(document.menuManageVO.menuNo.value == ""){alert("메뉴번호는 Not Null 항목입니다."); return false;}
	if(!checkNumber(document.menuManageVO.menuNo.value)){alert("메뉴번호는 숫자만 입력 가능합니다."); return false;}

	if(document.menuManageVO.menuOrdr.value == ""){alert("메뉴순서는 Not Null 항목입니다."); return false;}
	if(!checkNumber(document.menuManageVO.menuOrdr.value)){alert("메뉴순서는 숫자만 입력 가능합니다."); return false;}

	if(document.menuManageVO.upperMenuNo.value == ""){alert("상위메뉴번호는 Not Null 항목입니다."); return false;}
	if(!checkNumber(document.menuManageVO.upperMenuNo.value)){alert("상위메뉴번호는 숫자만 입력 가능합니다."); return false;}

	if(document.menuManageVO.progrmFileNm.value == ""){alert("프로그램파일명은 Not Null 항목입니다."); return false;}
	if(document.menuManageVO.menuNm.value == ""){alert("메뉴명은 Not Null 항목입니다."); return false;}
	
    return true;
}

/* ********************************************************
 * 필드값 Number 체크 함수
 ******************************************************** */
function checkNumber(str) {
    var flag=true;
    if (str.length > 0) {
        for (i = 0; i < str.length; i++) {
            if (str.charAt(i) < '0' || str.charAt(i) > '9') {
                flag=false;
            }
        }
    }
    return flag;
}

/* ********************************************************
 * 일괄처리 화면호출 함수
 ******************************************************** */
/* function bndeInsertMenuManage() {
	   	document.menuManageForm.action = "<c:url value='/admin/menu/EgovMenuRegistInsert.do'/>";
	   	document.menuManageForm.submit();
	}
 */
function bndeInsertMenuManage() {
	 location.href = "<c:url value='/admin/menu/EgovMenuBndeRegist.do'/>";
   	/* document.menuManageVO.action = "<c:url value='/admin/menu/EgovMenuBndeRegist.do'/>";
   	document.menuManageVO.submit(); */
}
</script>
</head>
<body>
<div id="W_900">

<input type="hidden" name="req_RetrunPath" value="/admin/menu/EgovMenuList">
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	  <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
         <!-- content start -->
        <form id="menuManageVO"  name="menuManageVO" action ="<c:url value='/admin/menu/EgovMenuListInsert.do' />" method="post">
        <input type="hidden" name="tmp_SearchElementName" value="">
		<input type="hidden" name="tmp_SearchElementVal" value="">
		<input type="hidden" name="tmp_CheckVal" value="">
        <div class="admin_content">
        	<div class="TitBx">
            	메뉴관리
            </div>
            <span class="orange" style="float: right;">*신규등록은 초기화 후 추가 순으로 진행해주세요.</span>
            <div class="ContBx">
                <div class="admintree">
                <!-- Tree_left -->
                	<c:forEach var="result" items="${list_menulist}" varStatus="status" >
						<input type="hidden" name="tmp_menuNmVal"  id="tmp_menuNmVal"  value="${result.menuNo}|${result.upperMenuNo}|${result.menuNm}|${result.menuOrdr}|${result.progrmFileNm}|${result.menuDc}|${result.relateImagePath}|${result.relateImageNm}|${result.functionList}|${result.menuId}|${result.width}|${result.height}|${result.insertHeight}|${result.call}|${result.keyColumn}|${result.menuType}">
					</c:forEach>
                    <div class="Tree_left bg" style="height:458px;width:180px;overflow:scroll"> 						
      	        	<script language="javascript" type="text/javaScript">
						var Tree = new Array;
						
						for (var j = 0; j < document.menuManageVO.tmp_menuNmVal.length; j++) {
							Tree[j] = document.menuManageVO.tmp_menuNmVal[j].value;
					    }
					    createTree(Tree);
				            
					</script>
                    </div>
                    <!-- //Tree_left --> 
                    <div class="FR" style="width:440px; position:relative;">
                        <table class="tbview" summary="메뉴등록">
				            <caption>메뉴등록</caption>
				            <colgroup>
					            <col width="20%" /><col width="25%" /><col width="20%" /><col width="25%" />
				            </colgroup>
							<tbody>
								<tr>
									<th>메뉴No<span class="orange">*</span></th>
									<td><input type="text" class="input" style="width: 109px" name="menuNo" title="메뉴No" readonly="readonly"></td>
									<th>메뉴순서<span class="orange">*</span></th>
									<td><input type="text" class="input" style="width: 109px" name="menuOrdr" title="메뉴순서" numberonly="true"></td>
								</tr>
								<tr>
									<th>메뉴명<span class="orange">*</span></th>
									<td><input type="text" class="input" name="menuNm" style="width: 109px;" title="메뉴명"></td>
									<th>상위메뉴No<span class="orange">*</span></th>
									<td><input type="text" class="input" style="width: 90px" name="upperMenuNo"  id="upperMenuNo"  title="상위메뉴No" readonly="readonly">
										<a href="#" onClick="mvmnMenuList();return false;"><img src="<c:url value='/images/usolver/admin/btn_view.gif' />" /></a></td>
								</tr>
								<tr>
									<th>파일명<span class="orange">*</span></th>
									<td><input type="text" class="input" id="progrmFileNm" name="progrmFileNm" type="text" title="파일명" style="width: 90px;" readonly="readonly">
										<a href="#" onClick="searchFileNm();return false;"><img src="<c:url value='/images/usolver/admin/btn_view.gif' />" /></a></td>
									<th>메뉴종류</th>
									<td>
										<select name="menuType"  id="menuType"  class="select" style="width: 109px;" title="메뉴종류">
								    		<option value="" selected></option>
								    		<option value="MAIN">메인</option>
								    		<option value="dir">디렉토리</option>							    					    		
								    		<option value="INFO">추가정보</option>
								      	</select>
							      	</td>
								</tr>
								<tr class='disDir' id='viewInfo'>
									<th>메뉴ID<span style="display:none;" class="orange">*</span></th>
									<td><input type="text" class="input" name="menuId" style="width: 109px;" title="메뉴ID"></td>
									<th>키 칼럼</th>
									<td><input type="text" class="input" name="keyColumn" style="width: 109px;" title="키 칼럼"></td>
								</tr>
								<tr class='disDir'>
									<th>높이</th>
									<td><input type="text" class="input MX_5 DT_FLOAT DD_2" style="width: 90px" name="height" title="높이" numberonly="true"> px</td>
									<th>넓이</th>
									<td><input type="text" class="input MX_5 DT_FLOAT DD_2" style="width: 90px" name="width" title="넓이" numberonly="true"> px</td>
								</tr>
								<tr class='disDir'>
									<th>등록높이</th>
									<td><input type="text" class="input MX_5 DT_FLOAT DD_2" style="width: 90px" name="insertHeight" title="등록높이" numberonly="true"> px</td>
									<th>콜백 함수</th>
									<td><input type="text" class="input" style="width: 109px" name="call" title="콜백 함수"></td>
								</tr>
								<tr id="relateImageNm">
									<th>이미지명</th>
									<td colspan="3"><input type="text" class="input" style="width: 335px" name="relateImageNm" title="이미지명"></td>
								</tr>
								<tr id="relateImagePath">
									<th>이미지경로</th>
									<td colspan="3"><input type="text" class="input" style="width: 335px" name="relateImagePath" title="관련이미지경로"></td>
								</tr>
								<tr id='checkboxArea'>
									<th>기능목록</th>
									<td colspan="3">
										<input type="checkbox" name="functionList" value="btnExcel" /><label>엑셀출력</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="btnMoveTo" /><label>위치확인</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="btnEditShpe" /><label>도형편집</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="btnRegisterView" /><label>대장조회</label><br>
										<input type="checkbox" name="functionList" value="btnNewSearch" /><label>신규추출</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="btnRegisterBatch" /><label>대장일괄</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="btnRegisterDelete" /><label>대장삭제</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="btnRegisterInsert" /><label>신규등록</label><br>
										<input type="checkbox" name="functionList" value="btnMaintenance" /><label>보수일괄</label>&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="checkbox" name="functionList" value="searchFilterBtn" /><label>사용자검색목록</label>
									</td>
								</tr>
								<tr>
									<th>메뉴설명</th>
									<td colspan="3"><textarea class="input" style="width: 335px; height: 40px; overflow: auto;" name="menuDc" cols="15" rows="4" title="메뉴설명"></textarea></td>
								</tr>
							</tbody>
						</table>
                    </div>
                </div>
                <div class="TreeBtBx" style="position:relative; right:0px;">
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="initlMenuList(); return false;">초기화</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="insertMenuList(); return false;">추가</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="updateMenuList(); return false;">수정</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onclick="bndeInsertMenuManage(); return false;">일괄등록</a></div>
            	    <div class="Btn"><a href="#" class="Btn_blue" onclick="deleteMenuList(); return false;">삭제</a></div>
                </div>
                <span class="orange" style="position: absolute; right: 20px; width: 270px; bottom: -10px;">*수정 후 새로고침을 하셔야 정상적으로 적용됩니다.</span>
            </div>
        </div>
        </form>
	</div>
</div>
</body>
</html>
