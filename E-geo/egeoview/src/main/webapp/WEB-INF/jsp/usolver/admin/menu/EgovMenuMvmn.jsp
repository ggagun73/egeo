<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"  pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovMenuMvmn.jsp
  * @Description : 메뉴이동 화면
  * @Modification Information
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
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/reset.css"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/popup.css"/>
<title>메뉴이동</title>
<script language="javascript1.2" type="text/javaScript" src="<c:url value='/js/usolver/admin/EgovMenuList.js' />" /></script>
<script language="javascript1.2" type="text/javaScript"  defer="defer">

$(document).ready(function(){
	
	var Tree = new Array;				
	<c:forEach var="result" items="${list_menulist}" varStatus="status" >
		Tree[Tree.length] = "${result.menuNo}|${result.upperMenuNo}|${result.menuNm}|${result.progrmFileNm}|${result.menuNo}|${result.menuOrdr}|${result.menuNm}|${result.upperMenuNo}|${result.menuDc}|${result.relateImagePath}|${result.relateImageNm}|${result.progrmFileNm}|";
	</c:forEach>						
	createTreeDiv(Tree, true, "menuTreeSearch" );		
	
});

function choiceNodes(id) {
    $('#ifrMap').contents().find('#upperMenuNo').val(id);		
    window.parent.BOOK.fn_close_window();
}
</script>
<title>상위 메뉴 No</title>
</head>
<body>
<div class="layer_pop" style="width:394px;height:454px">
	<div class="stit" style="width:400px;">상위 메뉴 No 선택</div>
	   	<div id="admin">
			<table class="tbview" summary="상위메뉴NO" style="width:380px;">
				<tbody>
<!-- 					<tr>
						<th width="30%" >이동할메뉴명</th>
						<td width="70%"><input name="progrmFileNm" type="text" size="30" value=""  maxlength="60" title="이동할메뉴명"></td>
					</tr> -->
					<tr>
						<td>				
							<div id="menuTreeSearch"  class="tree"   style="overflow-x:hidden;height:380px;width:370px;">
<%-- 							 			<c:forEach var="result" items="${list_menulist}" varStatus="status" >
										<input type="hidden" name="tmp_menuNmVal"  id="tmp_menuNmVal"  value="${result.menuNo}|${result.upperMenuNo}|${result.menuNm}|${result.progrmFileNm}|${result.menuNo}|${result.menuOrdr}|${result.menuNm}|${result.upperMenuNo}|${result.menuDc}|${result.relateImagePath}|${result.relateImageNm}|${result.progrmFileNm}|">
										</c:forEach>						
										<script language="javascript" type="text/javaScript">			
										var Tree = new Array;										
										for (var j = 0; j < $('input:hidden[name=tmp_menuNmVal]').length; j++) {
											Tree[j] = $('input:hidden[name=tmp_menuNmVal]')[j].value;
										}
										//createTree(Tree, true, "menuTreeSearch" );		
							           </script> --%>
							</div>
						</td>
					</tr>
				</tbody>
			</table>	
			<div class="TreeBtBx">
				<div class="Btn"><a href="#" class="Btn_blue" onClick="window.parent.BOOK.fn_close_window()">닫기</a></div>
			</div>
	    </div>    
	</div>
</div>
</body>
</html>
