<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/book/print.css'/>" />
<script  src="<c:url value='/js/usolver/book/print.js'/>"></script>
<style type="text/css">
<!-- @page rotated { size : landscape }  가로 먼저 인쇄.  적용이 안되는 이유는 -->
</style>
</head>
<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_heightWindow();">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>배 수 구 역 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>배수구역대장</caption>
			<colgroup>
				<col width="16%" /><col width="17%" /><col width="17%" /><col width="16%" /><col width="17%" /><col width="17%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.ftrIdn}"/></td>
                    <td colspan="4" class="abrnone"></td>
				</tr> 
               <tr>				
					<th scope="row">배수구역명</th>
					<td colspan="2"><c:out value="${result.adrNam}"/></td>
					<th scope="row">관리기관</th>
					<td colspan="2"><c:out value="${result.mngCdeNm}"/></td>
				</tr>
				<tr>				
					<th scope="row">고시번호</th>
					<td colspan="2"><c:out value="${result.notNum}"/></td>
					<th scope="row">유입하천명</th>
					<td colspan="2"><c:out value="${result.rivNam}"/></td>
				</tr>
				<tr>				
					<th scope="row">유출계수</th>
					<td colspan="2"><c:out value="${result.drnCnt}"/></td>
					<th scope="row">사용개시일</th>
					<td colspan="2"><c:out value="${result.strYmd}"/></td>
				</tr>
				<tr>				
					<th scope="row">배수구역면적</th>
					<td colspan="2"><c:out value="${result.adrSiz}"/>  ㏊</td>
					<th scope="row">배수구역인구수</th>
					<td colspan="2"><c:out value="${result.adrPop}"/> 인</td>
				</tr>
				<tr>
					<td colspan="6" style="height:700px">&nbsp;</td>
				</tr>
				<!-- </table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장"> -->
			</tbody>
		</table>
		<div class="Btn_pd2 noprint"  id="divPrint" >
			<div class="Btn"><a href="#" class="Btn_02" onclick="fn_book_print();">인쇄</a></div>
			<div class="Btn"><a href="#" class="Btn_02" onClick="window.close();">닫기</a></div>
		</div>
	</div>
	<!-- wrap end -->
</form>
</body>
</html>
