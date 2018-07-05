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
        <h1>수 원 지 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>수원지대장</caption>
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
					<th scope="row">수원지명</th>
					<td><c:out value="${result.heaNam}"/></td>
					<th scope="row">공사번호</th>
					<td><c:out value="${result.cntNum}"/></td>
					<th scope="row">도엽번호</th>
					<td><c:out value="${result.shtNum}"/></td>
				</tr> 
                <tr>
					<th scope="row">관리기관</th>
					<td><c:out value="${result.mngCdeNm}"/></td>
					<th scope="row">준공일자</th>
					<td><c:out value="${result.fnsYmd}"/></td>
					<th scope="row">수원구분</th>
					<td><c:out value="${result.wsrCdeNm}"/></td>
				</tr>
				 <tr>
					<th scope="row">유입하천명</th>
					<td><c:out value="${result.irvNam}"/></td>
					<th scope="row">유효면적</th>
					<td><c:out value="${result.rsvAra}"/> ㎢</td>
					<th scope="row">만수면적</th>
					<td><c:out value="${result.fulAra}"/> ㎢</td>
				</tr>
				 <tr>
					<th scope="row">유효저수량</th>
					<td><c:out value="${result.rsvVol}"/> ㎥</td>
					<th scope="row">갈수위</th>
					<td><c:out value="${result.thrWal}"/> m</td>
					<th scope="row">최대갈수위</th>
					<td><c:out value="${result.hthWal}"/> m</td>
				</tr>
				 <tr>
					<th scope="row">평수위</th>
					<td><c:out value="${result.avgWal}"/> m</td>
					<th scope="row">홍수위</th>
					<td><c:out value="${result.draWal}"/> m</td>
					<th scope="row">최대홍수위 </th>
					<td><c:out value="${result.hdrWal}"/> m</td>
				</tr>
				<tr>
					<th scope="row">사수위</th>
					<td><c:out value="${result.keeWal}"/> m</td>
					<th scope="row">상수원보호구역</th>
					<td colspan="3"><b>면적 :</b> <c:out value="${result.guaAra}"/> ㎢ <b>인구</b> : <c:out value="${result.guaPop}"/> 인</td>
				</tr>		
				<tr>
					<td colspan="6" class="brnone space"></td>
				</tr>
				<tr>
					<th scope="col" colspan="6" >세부시설현황</th>
				</tr> 
                <tr>
					<th scope="col"  colspan="2">시설명</th>
                    <th scope="col"  colspan="3">시설개요</th>
                    <th scope="col" >비고</th>
				</tr> 
				<c:forEach var="subdataAtta" items="${wttAttaDtList}">
                <tr>
					<td class="lnone ac" scope="col" colspan="2"><c:out value="${subdataAtta.attNam}"/></td>
                    <td class="lnone al" scope="col" colspan="3"><c:out value="${subdataAtta.attDes}"/></td>
                    <td class="lnone al" scope="col"></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(wttAttaDtList) > 0 ?  fn:length(wttAttaDtList): 0}"  end="${fn:length(wttAttaDtList) > 18 ?  fn:length(wttAttaDtList): 18}">			
					<tr>
						<td class="lnone" scope="col" colspan="2" style="min-height:22px"></td>
	                    <td class="lnone" scope="col" colspan="3"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
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
