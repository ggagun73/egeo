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
        <h1>하 수 펌 프 장 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>하수펌프장대장</caption>
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
					<th scope="row">하수펌프장명</th>
					<td colspan="2"><c:out value="${result.pmpNam}"/></td>
					<th scope="row">설치일자</th>
					<td colspan="2"><c:out value="${result.istYmd}"/></td>
				</tr>
                 <tr>					
					<th scope="row">하수펌프장용도</th>
					<td colspan="2"><c:out value="${result.sbeCdeNm}"/></td>
					<th scope="row">개통상태</th>
					<td colspan="2"><c:out value="${result.sooCdeNm}"/></td>
				</tr>
				 <tr>					
					<th scope="row">표고</th>
					<td colspan="2"><c:out value="${result.pmpAlt}"/></td>
					<th scope="row">수위</th>
					<td colspan="2"><c:out value="${result.pmpWal}"/></td>
				</tr>
				<tr>
					<th scope="row">부지면적</th>
					<td><c:out value="${result.pmpAra}"/></td>
					<th scope="row">일일처리용량</th>
					<td><c:out value="${result.dayVol}"/> m</td>
					<th scope="row">최대저수용량</th>
					<td><c:out value="${result.maxVol}"/> m</td>
				</tr>				
				<tr>
					<th scope="row">양수능력</th>
					<td colspan="5">
						<table class="tbprint" >
							<tr><th scope="row">청천시오수</th><th scope="row">우천시오수</th><th scope="row">우수</th></tr>
							<tr><td><c:out value="${result.cosVol}"/>㎥/분</td><td><c:out value="${result.uosVol}"/>㎥/분</td><td><c:out value="${result.usuVol}"/>㎥/분</td></tr>
						</table>
					</td>
				<tr>
					<td colspan="6" class="brnone space"></td>
				</tr>
				<!-- </table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장"> -->
				 <tr>
					<th scope="col" colspan="6" >세 부 시 설 현 황</th>
				</tr> 
                <tr>
					<th scope="col" >시설명</th>
                    <th scope="col"  colspan="4">시 설 개 요</th>
                    <th scope="col">비 고</th>
				</tr> 
				<c:forEach var="subdata" items="${swtAttaDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.attNam}"/></td>
                    <td class="lnone ac" colspan="4"><c:out value="${subdata.attDes}"/></td>
                    <td class="lnone ac" scope="col"></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(swtAttaDtList) > 0 ?  fn:length(swtAttaDtList): 0}"  end="${fn:length(swtAttaDtList) > 16 ?  fn:length(swtAttaDtList): 16}">
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
	                    <td class="lnone" scope="col" colspan="4"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="6" class="brnone space"></td>
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
