<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>도로민원접수처리대장</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/book/print.css'/>"/>
<script  src="<c:url value='/js/usolver/book/print.js'/>"></script>
</head>

<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_heightWindow()">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>도 로 민 원 접 수 처 리 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로민원접수처리대장</caption>
			<colgroup>
				<col width="16%" /><col width="17%" /><col width="17%" /><col width="16%" /><col width="17%" /><col width="17%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">민원접수번호</th>
					<td><c:out value="${result.rcvNum}"/></td>
                    <th scope="row">민원구분</th>
					<td><c:out value="${result.aplCdeNm}"/></td>
				</tr> 
                <tr>
					<th scope="row">접수일자</th>
					<td><c:out value="${result.rcvYmd}"/></td>
					<th scope="row">접수자성명</th>
					<td><c:out value="${result.rcvNam}"/></td>
				</tr>    
                <tr>
					<th scope="row">민원발생위치</th>
					<td colspan="3"><c:out value="${result.hjdCdeNm}"/> <c:out value="${result.aplAdr}"/></td>
				</tr>    
				<tr>
					<th scope="row">민원내용</th>
					<td colspan="3"><c:out value="${result.aplExp}"/></td>
				</tr> 
				<tr>
					<th scope="row">민원인성명</th>
					<td><c:out value="${result.apmNam}"/></td>
					<th scope="row">민원인전화번호</th>
					<td><c:out value="${result.apmTel}"/></td>
				</tr>       
                <tr>
					<th scope="row">민원인주소</th>
					<td colspan="3"><c:out value="${result.apmAdr}"/></td>
				</tr> 
				<tr>
					<th scope="row">처리기한</th>
					<td><c:out value="${result.durYmd}"/></td>
                    <th scope="row">처리상태</th>
					<td><c:out value="${result.proCdeNm}"/></td>
				</tr>    
				 <tr>
					<th scope="row">처리내용</th>
					<td colspan="3"><c:out value="${result.proExp}"/></td>
				</tr> 
				<tr>
					<th scope="row">처리완료일자</th>
					<td><c:out value="${result.proYmd}"/></td>
                    <th scope="row">처리자성명</th>
					<td><c:out value="${result.proNam}"/></td>
				</tr>    
                <tr>
					<td colspan="6" style="height:600px"></td>
				</tr> 
			</tbody>
		</table>				
		<div class="Btn_pd2"  id="divPrint" >
			<div class="Btn"><a href="#" class="Btn_02" onclick="fn_book_print()">인쇄</a></div>
			<div class="Btn"><a href="#" class="Btn_02" onClick="window.close()">닫기</a></div>
		</div>
	</div>
	<!-- wrap end -->
</form>
</body>
</html>
