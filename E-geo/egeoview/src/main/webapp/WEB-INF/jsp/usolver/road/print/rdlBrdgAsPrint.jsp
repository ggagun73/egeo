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
        <h1>교 량 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>교량대장</caption>
			<colgroup>
				<col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.ftrIdn}"/></td>
                    <td colspan="4" class="abrnone"></td>
                    <th scope="row">관리기관</th>
					<td><c:out value="${result.mngCdeNm}"/></td>
				</tr> 
                <tr>
					<th scope="row">도로종류</th>
					<td><c:out value="${result.ftrCdeNm}"/></td>
					<th scope="row">노선명</th>
					<td><c:out value="${rdtRoutDtList[0].rutNam}"/></td>
					<th scope="row">노선번호</th>
					<td><c:out value="${rdtRoutDtList[0].rutIdn}"/></td>
					<th scope="row">도로구간번호</th>
					<td><c:out value="${result.secIdn}"/></td>
				</tr> 
              <tr>
					<th scope="row">행정읍/면/동</th>
					<td colspan="3"><c:out value="${result.hjdCdeNm}"/></td>
					<th scope="row">공사번호</th>
					<td colspan="3"><c:out value="${result.cntNum}"/></td>
				</tr> 
                <tr>
					<th scope="row">관리자</th>
					<td colspan="3"><c:out value="${result.mngNam}"/></td>
					<th scope="row">교량형태</th>
					<td><c:out value="${result.aeaCdeNm}"/></td>
					<th scope="row">교량종류</th>
					<td><c:out value="${result.bjlCdeNm}"/></td>
				</tr> 
				 <tr>
					<th scope="row">교량명</th>
					<td colspan="3"><c:out value="${result.brgNam}"/></td>
					<th scope="row">횡단시설명</th>
					<td><c:out value="${result.cntNum}"/></td>
					<th scope="row">구조물등급</th>
					<td><c:out value="${result.grdCdeNm}"/></td>
				</tr> 		
				 <tr>
					<th scope="row">종별</th>
					<td colspan="3"><c:out value="${result.facCdeNm}"/></td>
					<th scope="row">총연장</th>
					<td><c:out value="${result.totLen}"/> m</td>
					<th scope="row">왕복차로수</th>
					<td><c:out value="${result.lanCnt}"/> 차로</td>
				</tr> 	
				<tr>
					<th scope="col" colspan="8" >일 반 제 원</th>
				</tr>
				 <tr>
					<th scope="row">설계활하중</th>
					<td><c:out value="${result.dwgCdeNm}"/></td>
					<th scope="row">허용통행하중</th>
					<td><c:out value="${result.secIdn}"/> TON</td>
					<th scope="row">통과제한높이</th>
					<td><c:out value="${result.secIdn}"/> m</td>
					<th scope="row">교장</th>
					<td><c:out value="${result.brgLen}"/> m</td>
				</tr> 
				 <tr>
					<th scope="row">경간수</th>
					<td><c:out value="${result.disCnt}"/> 개</td>
					<th scope="row">총폭원</th>
					<td><c:out value="${result.allWid}"/> m</td>
					<th scope="row">유효폭원</th>
					<td><c:out value="${result.usgWid}"/> m</td>
					<th scope="row">최대경간장</th>
					<td><c:out value="${result.maxLen}"/> m</td>
				</tr> 	
				 <tr>
					<th scope="row">경간장</th>
					<td><c:out value="${result.disLen}"/> m</td>
					<th scope="row">상부구조형식</th>
					<td colspan="2"><c:out value="${result.utyCdeNm}"/></td>
					<th scope="row">하부구조형식</th>
					<td colspan="2"><c:out value="${result.dntCdeNm}"/></td>
				</tr>
				 <tr>
					<th rowspan="13" scope="row">상부공</th>
					<th rowspan="2" scope="row">주형</th>
					<th scope="row">간격</th>
					<td><c:out value="${result.upjWid}"/> m</td>
					<th rowspan="10" scope="row">하부공</th>
					<th rowspan="5" scope="row">교각</th>
					<th scope="row">형식</th>
					<td><c:out value="${result.kktCdeNm}"/></td>
				</tr> 	
				 <tr>
					<th scope="row">높이</th>
					<td><c:out value="${result.upjHit}"/> m</td>
					<th scope="row">개수</th>
					<td><c:out value="${result.kktCnt}"/> 개</td>
				</tr> 	
				 <tr>
				 	<th rowspan="3" scope="row">상판</th>
					<th scope="row">차도두께</th>
					<td><c:out value="${result.urdTck}"/> m</td>
					<th scope="row">매립깊이</th>
					<td><c:out value="${result.kktDep}"/> m</td>
				</tr> 	
				 <tr>
					<th scope="row">보도두께</th>
					<td><c:out value="${result.ubdTck}"/> m</td>
					<th scope="row">기초형식</th>
					<td><c:out value="${result.kdbCdeNm}"/></td>
				</tr> 	
				 <tr>
					<th scope="row">재료</th>
					<td><c:out value="${result.upmCdeNm}"/></td>
					<th scope="row">총높이</th>
					<td><c:out value="${result.kktHit}"/> ㅡ</td>
				</tr> 	
				 <tr>
					<th scope="row">차도폭</th>
					<td colspan="2"><c:out value="${result.urdWid}"/> m</td>
					<th rowspan="3" scope="row">교대</th>
					<th scope="row">형식</th>
					<td><c:out value="${result.secIdn}"/></td>
				</tr> 	
				 <tr>
					<th scope="row">보도폭</th>
					<td colspan="2"><c:out value="${result.ubdWid}"/> m</td>
					<th scope="row">기초형식</th>
					<td><c:out value="${result.kasCdeNm}"/></td>
				</tr> 	
				 <tr>
				 	<th rowspan="4" scope="row">난간</th>
					<th scope="row">높이</th>
					<td><c:out value="${result.hdrit}"/> m</td>
					<th scope="row">총높이</th>
					<td><c:out value="${result.kdtHit}"/> m</td>
				</tr> 
				<tr>
					<th scope="row">폭</th>
					<td><c:out value="${result.ftrCdeNm}"/> m</td>
					<th rowspan="2" scope="row">교대날개벽</th>
					<th scope="row">종류</th>
					<td><c:out value="${result.kwlExp}"/></td>
				</tr> 	
				 <tr>
					<th scope="row">총연장</th>
					<td><c:out value="${result.totLen}"/> m</td>
					<th scope="row">총면적</th>
					<td><c:out value="${result.kwlAra}"/> ㎡</td>
				</tr> 	
				 <tr>
					<th scope="row">재료</th>
					<td><c:out value="${result.hdrCdeNm}"/></td>
					<th colspan="4" scope="row">조명시설</th>
				</tr> 	
				 <tr>
					<th rowspan="2" scope="row">이음장치</th>					
					<th scope="row">형식</th>
					<td><c:out value="${result.fxtCdeNm}"/></td>
					<th colspan="2" scope="row">종류</th>
					<th colspan="2" scope="row">수량</th>
				</tr> 	
				 <tr>
					<th scope="row">수량</th>
					<td><c:out value="${result.fxtCnt}"/> 개</td>
					<td colspan="2" ><c:out value="${result.lcdExp}"/></td>
					<td colspan="2" ><c:out value="${result.lcdCnt}"/> 개</td>
				</tr> 	 	
				<tr>
					<td colspan="8" class="brnone space"></td>
				</tr>
				<!-- </table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장"> -->
				<tr>
					<th scope="col" colspan="8" >유 지 보 수 내 역</th>
				</tr> 
                <tr>
					<th scope="col" >보수시작일</th>
					<th scope="col" >보수종료일</th>
					<th scope="col" colspan="2">보수사유</th>
                    <th scope="col" colspan="2">보수내용</th>
                    <th scope="col">공사번호</th>
                    <th scope="col">관리기관</th>
				</tr> 
				<c:forEach var="subdata" items="${rdtPrsvDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.sreYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.ereYmd}"/></td>
                    <td class="lnone ac" scope="col" colspan="2"><c:out value="${subdata.rerDes}"/></td>
                    <td class="lnone ac" scope="col" colspan="2"><c:out value="${subdata.repDes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.cntNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.mngCdeNm}"/></td>                    
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtPrsvDtList) > 0 ?  fn:length(rdtPrsvDtList): 0}"  end="${fn:length(rdtPrsvDtList) > 6 ? fn:length(rdtPrsvDtList) : 6 }">			
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
						<td class="lnone" scope="col"></td>
						<td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="8" class="brnone space"></td>
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
