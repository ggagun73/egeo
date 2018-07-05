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
        <h1>하 수 처 리 장 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>하수처리장대장</caption>
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
					<th scope="row">관리기관</th>
					<td><c:out value="${result.mngCdeNm}"/></td>
					<th scope="row">공사번호</th>
					<td><c:out value="${result.cntNum}"/></td>
					<th scope="row">도엽번호</th>
					<td><c:out value="${result.shtNum}"/></td>
				</tr> 
               <tr>					
					<th scope="row">하수처리장명</th>
					<td colspan="2"><c:out value="${result.drnNam}"/></td>
					<th scope="row">설치일자</th>
					<td colspan="2"><c:out value="${result.istYmd}"/></td>
				</tr>
               <tr>
					<th scope="row">부지면적</th>
					<td><c:out value="${result.drnAara}"/> ㎡</td>
					<th scope="row">처리구역면적</th>
					<td><c:out value="${result.adpSiz}"/> ㎡</td>
					<th scope="row">개통상태</th>
					<td><c:out value="${result.sooCdeNm}"/></td>
				</tr> 
				<tr>
					<th scope="row">처리용량</th>
					<td colspan="3">청천시 : <c:out value="${result.pccVol}"/> ㎥/일 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </br>
									     우천시 : <c:out value="${result.pucVol}"/> ㎥/일</td>
					<th scope="row">하수처리방식</th>
					<td><c:out value="${result.sbbCdeNm}"/></td>
				</tr>	
				<tr>					
					<th scope="row">차집관연장</th>
					<td colspan="2"><c:out value="${result.pipLen}"/> m</td>
					<th scope="row">방류수역명</th>
					<td colspan="2"><c:out value="${result.draNam}"/></td>
				</tr>	
				<tr>
					<th scope="row">설계유입수수질</th>
					<td colspan="5"><c:out value="${result.drnSb1}"/></td>
				</tr>	
				<tr>
					<th scope="row">설계유출수수질</th>
					<td colspan="5"><c:out value="${result.drnSb2}"/></td>
				</tr>			
				<tr>
					<td colspan="6" style="height:500px"></td>
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
