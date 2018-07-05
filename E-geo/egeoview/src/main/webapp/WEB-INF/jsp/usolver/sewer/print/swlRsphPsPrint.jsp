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
        <h1>역 사 이 펀 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>역사이펀대장</caption>
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
					<th scope="row">설치일자</th>
					<td><c:out value="${result.istYmd}"/></td>
					<th scope="row">용도</th>
					<td><c:out value="${result.sbaCdeNm}"/></td>
					<th scope="row">형태</th>
					<td><c:out value="${result.forCdeNm}"/></td>
				</tr>
				<tr>					
					<th scope="row">규격</th>
					<td colspan="3">가로 : <c:out value="${result.sphHol}"/> m &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 세로 : <c:out value="${result.sphVel}"/> m</td>
					<th scope="row">재질</th>
					<td><c:out value="${result.mopCdeNm}"/></td>
				</tr>
				<tr>
					<th scope="row">연장</th>
					<td><c:out value="${result.sphLen}"/> m</td>
					<th scope="row">관저고</th>
					<td><c:out value="${result.sphHsl}"/> m</td>
					<th scope="row">경사</th>
					<td><c:out value="${result.sphSlp}"/> %</td>
				</tr>			
				<tr>
					<th scope="row">원형관구경</th>
					<td colspan="2"><c:out value="${result.sphDip}"/></td>
					<th scope="row">차선통로수</th>
					<td colspan="2"><c:out value="${result.sphLin}"/></td>
				</tr>
					
				<tr>
					<td colspan="6" class="brnone space"></td>
				</tr>
				<!-- </table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장"> -->
                <tr>
					<th scope="col" colspan="6" >유 지 보 수 내 역</th>
				</tr> 
                <tr>
					<th scope="col" >보수일자</th>
                    <th scope="col" >보수구분</th>
                    <th scope="col" >보수사유</th>
                    <th scope="col" colspan="2">유지보수내용</th>
                    <th scope="col">시공자</th>
				</tr> 
				<c:forEach var="subdata" items="${swtSutlHtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.repYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.repCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.sbjCdeNm}"/></td>
                    <td class="lnone al" scope="col" colspan="2"><c:out value="${subdata.repDes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.oprNam}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(swtSutlHtList) > 0 ?  fn:length(swtSutlHtList): 0}"  end="${fn:length(swtSutlHtList) > 18 ?  fn:length(swtSutlHtList): 18}">	
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
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
