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
        <h1>공 동 구 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>공동구대장</caption>
			<colgroup>
				<col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.ftrIdn}"/></td>
                    <td colspan="3" class="abrnone"></td>
                    <th scope="row">관리기관</th>
					<td><c:out value="${result.mngCdeNm}"/></td>
				</tr> 
                <tr>
					<th scope="row">도로종류</th>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/></td>
					<th scope="row">노선번호</th>
					<td colspan="3"><c:out value="${rdtRoutDtList[0].rutIdn}"/></td>
				</tr> 
              <tr>
					<th scope="row">노선명</th>
					<td colspan="2"><c:out value="${rdtRoutDtList[0].rutNam}"/></td>
					<th scope="row">도로구간번호</th>
					<td colspan="3"><c:out value="${result.secIdn}"/></td>
				</tr> 
                <tr>
					<th scope="row">행정읍/면/동</th>
					<td colspan="2"><c:out value="${result.hjdCdeNm}"/></td>
					<th scope="row">공사번호</th>
					<td colspan="3"><c:out value="${result.cntNum}"/></td>
				</tr> 
				<tr>
					<th scope="row">관리자</th>
					<td colspan="2"><c:out value="${result.mngNam}"/></td>
					<th scope="row">공동구명</th>
					<td colspan="3"><c:out value="${result.copNam}"/></td>
				</tr> 	
				<tr>
					<th scope="row">설치일자</th>
					<td colspan="2"><c:out value="${result.copYmd}"/></td>
					<th scope="row">종별</th>
					<td colspan="3"><c:out value="${result.facCdeNm}"/></td>
				</tr> 		
				<tr>
					<th scope="row">총연장</th>
					<td colspan="2"><c:out value="${result.totLen}"/>m</td>
					<th scope="row">순찰연장</th>
					<td colspan="3"><c:out value="${result.patLen}"/>m</td>
				</tr> 					
				<tr>
					<th colspan="7" >B O X</th>
				</tr>
				<tr>
					<th colspan="2" scope="row">폭원</th>
					<th scope="row">높이</th>
					<th colspan="2" scope="row">연장</th>
					<th colspan="2" scope="row">면적</th>
				</tr> 	
				<tr>
					<td colspan="2" scope="row"><c:out value="${result.boxWid}"/>m</td>
					<td scope="row"><c:out value="${result.boxHit}"/>m</th>
					<td colspan="2" scope="row"><c:out value="${result.boxLen}"/>m</td>
					<td colspan="2" scope="row"><c:out value="${result.boxAra}"/>m</td>
				</tr> 			
				<tr>
					<td colspan="7" class="brnone space"></td>
				</tr>
				<!-- </table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장"> -->
				 <tr>
					<th scope="col" colspan="7" >유 지 보 수 내 역</th>
				</tr> 
                <tr>
					<th scope="col" >보수시작일</th>
					<th scope="col" >보수종료일</th>
					<th scope="col" >보수사유</th>
                    <th scope="col"  colspan="2">보수내용</th>
                    <th scope="col">공사번호</th>
                    <th scope="col">관리기관</th>
				</tr> 
				<c:forEach var="subdata" items="${rdtPrsvDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.sreYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.ereYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rerDes}"/></td>
                    <td class="lnone ac" colspan="2"><c:out value="${subdata.repDes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.cntNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.mngCdeNm}"/></td>                    
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtPrsvDtList) > 0 ?  fn:length(rdtPrsvDtList): 0}"  end="${fn:length(rdtPrsvDtList) > 15 ?  fn:length(rdtPrsvDtList): 15}">			
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
						<td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="7" class="brnone space"></td>
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
