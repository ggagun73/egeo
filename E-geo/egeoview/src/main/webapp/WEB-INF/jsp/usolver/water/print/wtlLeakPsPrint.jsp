<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/book/print.css'/>"/>
<script  src="<c:url value='/js/usolver/book/print.js'/>"></script>
</head>

<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_heightWindow();">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>누 수 복 구 이 력 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>누수복구이력대장</caption>
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
					<th scope="row">도엽번호</th>
					<td><c:out value="${result.shtNum}"/></td>
					<th scope="row">민원접수일자</th>
					<td><c:out value="${wttWserMa.rcvYmd}"/></td>
					<th scope="row">누수일자</th>
					<td><c:out value="${result.lekYmd}"/></td>
				</tr> 
                <tr>
					<th scope="row">민원인 성명</th>
					<td colspan="2"><c:out value="${wttWserMa.apmNam}"/></td>
					<th scope="row">민원인 전화번호</th>
					<td colspan="2"><c:out value="${wttWserMa.apmTel}"/></td>
				</tr>
				<tr>
					<th scope="row">민원인 주소</th>
					<td colspan="5"><c:out value="${wttWserMa.apmAdr}"/></td>
				</tr>
				<tr>
					<th scope="row">누수위치설명</th>
					<td colspan="5"><c:out value="${result.lekLoc}"/></td>
				</tr>
				<tr>
					<th scope="row">관재질</th>
					<td><c:out value="${result.pipMopNm}"/></td>
					<th scope="row">누수원인</th>
					<td colspan="3"><c:out value="${result.lrsCdeNm}"/></td>
				</tr>
				<tr>
					<th scope="row">관구경</th>
					<td><c:out value="${result.pipDip}"/> mm</td>
					<th scope="row">누수부위</th>
					<td colspan="3"><c:out value="${result.lepCdeNm}"/></td>
				</tr>
				<tr>
					<th scope="row">누수현황</th>
					<td colspan="5"><c:out value="${result.lekExp}"/></td>
				</tr>
				<tr>
					<th scope="row">누수복구내용</th>
					<td colspan="5"><c:out value="${result.repExp}"/></td>
				</tr>
				<tr>
					<th scope="row">소요자재내역</th>
					<td colspan="5"><c:out value="${result.matDes}"/></td>
				</tr>
				<tr>
					<th scope="row">복구일자</th>
					<td colspan="2"><c:out value="${result.repYmd}"/></td>
					<th scope="row">누수복구자</th>
					<td colspan="2"><c:out value="${result.repNam}"/></td>
				</tr>
				<tr>
	                <td class="lnone" colspan="6"  style="height:540px"></td>
				</tr>
				<tr>
					<td colspan="6" class="brnone space"></td>
				</tr>
			</tbody>
		</table>
		<div class="Btn_pd2"  id="divPrint" >
			<div class="Btn"><a href="#" class="Btn_02" onclick="fn_book_print();">인쇄</a></div>
			<div class="Btn"><a href="#" class="Btn_02" onClick="window.close();">닫기</a></div>
		</div>
	</div>
	<!-- wrap end -->
</form>
</body>
</html>
