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
        <h1>도 로 포 장 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로포장대장</caption>
			<colgroup>
				<col width="16%" /><col width="16%" /><col width="16%" /><col width="16%" /><col width="16%" /><col width="16%" />
			</colgroup>
			<tbody>
				<tr>
                    <td colspan="4" class="abrnone"></td>
                    <th scope="row">관리기관</th>
					<td><c:out value="${result.mngCdeNm}"/></td>
				</tr> 
                <tr>
                	<th scope="row">관리번호</th>
					<td colspan="2"><c:out value="${result.ftrIdn}"/></td>
					<th scope="row">도로구간번호</th>
					<td colspan="2"><c:out value="${result.secIdn}"/></td>
				</tr> 
                <tr>
					<th scope="row">공사명</th>
					<td colspan="2"><c:out value="${result.cntNam}"/></td>
					<th scope="row">면적</th>
					<td colspan="2"><c:out value="${result.pavAra}"/></td>
				</tr> 
                <tr>
					<th scope="row">도엽번호</th>
					<td colspan="2"><c:out value="${result.shtNum}"/></td>
					<th scope="row">행정동</th>
					<td colspan="2"><c:out value="${result.hjdCdeNm}"/></td>
				</tr> 
				<tr>
					<th scope="row">공사시작일</th>
					<td colspan="2"><c:out value="${result.spvYmd}"/></td>
					<th scope="row">공사종료일</th>
					<td colspan="2"><c:out value="${result.epvYmd}"/></td>
				</tr> 
				<tr>
					<th scope="row">폭원</th>
					<td colspan="2"><c:out value="${result.pavWid}"/></td>
					<th scope="row">연장</th>
					<td colspan="2"><c:out value="${result.pavLen}"/></td>
				</tr> 
				<tr>
					<th colspan="2" scope="row">보수</th>
					<th colspan="2" scope="row">포장재질</th>
					<th colspan="2" scope="row">이전포장재</th>
				</tr> 
				<tr>
					<th scope="row">종류</th>
					<th scope="row">공종</th>
					<th scope="row">차도</th>
					<th scope="row">보도</th>
					<th scope="row">차도</th>
					<th scope="row">보도</th>
				</tr> 
				<tr>
					<td><c:out value="${result.mncCdeNm}"/></td>
					<td><c:out value="${result.mnsCdeNm}"/></td>
					<td><c:out value="${result.addCdeNm}"/></td>
					<td><c:out value="${result.pavCdeNm}"/></td>
					<td><c:out value="${result.badCdeNm}"/></td>
					<td><c:out value="${result.bpvCdeNm}"/></td>
				</tr> 
				<!-- </table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장"> -->
				 <tr>
					<th scope="col" colspan="6"  style="height:600px"></th>
				</tr>                
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
