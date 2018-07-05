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
        <h1>배 수 설 비 인 허 가 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>배수설비인허가대장</caption>
			<colgroup>
				<col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" />
			</colgroup>
			<tbody>
				<tr>
					<th colspan="2" scope="row">배수설비인허가번호</th>
					<td colspan="2"><c:out value="${result.pmtNum}"/></td>
                    <td colspan="4" class="abrnone"></td>
				</tr> 
                <tr>
					<th colspan="2" scope="row">인허가일자</th>
					<td colspan="2"><c:out value="${result.pmtYmd}"/></td>
					<th colspan="2" scope="row">인허가구분</th>
					<td colspan="2"><c:out value="${result.pmsCdeNm}"/></td>
				</tr> 
              <tr>
					<th colspan="2" scope="row">민원발생위치</th>
					<td colspan="6"><c:out value="${result.hjdCdeNm}"/><c:out value="${result.aplSanNm}"/><c:out value="${result.aplBon}"/><c:out value="${result.aplBub}"/></td>
				</tr> 
                <tr>
					<th colspan="2" scope="row">민원인성명</th>
					<td colspan="2"><c:out value="${result.apmNam}"/></td>
					<th colspan="2" scope="row">민원인전화번호</th>
					<td colspan="2"><c:out value="${result.apmTel}"/></td>
				</tr> 
				<tr>
					<th colspan="2" scope="row">민원인주소</th>
					<td colspan="6"><c:out value="${result.apmAdr}"/></td>
				</tr> 
				<tr>
					<th colspan="2" scope="row">건축용도</th>
					<td colspan="2"><c:out value="${result.bldUse}"/></td>
					<th colspan="2" scope="row">건축연면적</th>
					<td colspan="2"><c:out value="${result.bldAra}"/>m</td>
				</tr> 
				<tr>
					<th colspan="2" scope="row">건축구조</th>
					<td colspan="2"><c:out value="${result.bldStr}"/></td>
					<th colspan="2" scope="row">배수설비준공일자</th>
					<td colspan="2"><c:out value="${result.cntYmd}"/></td>
				</tr> 
				<tr>
					<th colspan="2"  rowspan="2" scope="row">하수연결관</th>
					<th colspan="2" scope="row">연장</th>
					<th colspan="2" scope="row">재질</th>
					<th colspan="2" scope="row">구경</th>
				</tr> 
				<tr>
					<td colspan="2"><c:out value="${result.pipLen}"/>m</td>
					<td colspan="2"><c:out value="${result.mopCdeNm}"/></td>
					<td colspan="2"><c:out value="${result.pipDip}"/></td>
				</tr> 
				<tr>
					<th scope="row">하수배출량</th>
					<td colspan="2" ><c:out value="${result.sdtVol}"/></td>
					<th scope="row">하수처리구분</th>
					<td><c:out value="${result.brcCdeNm}"/></td>
					<th colspan="2" scope="row">처리자성명</th>
					<td><c:out value="${result.proNam}"/></td>
				</tr>
				<tr>
					<td colspan="8"  style="height:500px"></td>
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
