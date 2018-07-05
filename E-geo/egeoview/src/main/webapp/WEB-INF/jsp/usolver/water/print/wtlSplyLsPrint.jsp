<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
        <h1>급 수 관 로 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>급수관로대장</caption>
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
					<th scope="row">관용도</th>
					<td><c:out value="${result.saaCdeNm}"/></td>
					<th scope="row">공사번호</th>
					<td><c:out value="${result.cntNum}"/></td>
					<th scope="row">도엽번호</th>
					<td><c:out value="${result.shtNum}"/></td>
				</tr> 
                <tr>
					<th scope="row">관리기관</th>
					<td colspan="2"><c:out value="${result.mngCdeNm}"/></td>
					<th scope="row">설치일자</th>
					<td colspan="2"><c:out value="${result.istYmd}"/></td>
				</tr>
				<tr>
					<th scope="row">관종</th>
					<td><c:out value="${result.mopCdeNm}"/></td>
					<th scope="row">관경</th>
					<td><c:out value="${result.pipDip}"/></td>
					<th scope="row">관연장</th>
					<td><c:out value="${result.pipLen}"/> m</td>
				</tr>
				<tr>
					<th scope="row">깊이</th>
					<td colspan="3">최고 : <c:out value="${result.hghDep}"/> m &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 최저 : <c:out value="${result.lowDep}"/> m</td>
					<th scope="row">접합종류</th>
					<td><c:out value="${result.jhtCdeNm}"/></td>
				</tr>
				<tr>
	              <td class="lnone" colspan="6" style="height:700px"></td>
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
