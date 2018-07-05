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
        <h1>배 수 지 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>배수지대장</caption>
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
					<th scope="row">배수지명</th>
					<td><c:out value="${result.srvNam}"/></td>
					<th scope="row">공사번호</th>
					<td><c:out value="${result.cntNum}"/></td>
					<th scope="row">도엽번호</th>
					<td><c:out value="${result.shtNum}"/></td>
				</tr> 
                <tr>
					<th scope="row">관리기관</th>
					<td colspan="2"><c:out value="${result.mngCdeNm}"/></td>
					<th scope="row">준공일자</th>
					<td colspan="2"><c:out value="${result.fnsYmd}"/></td>
				</tr>
				<tr>
					<th scope="row">관련정수장</th>
					<td colspan="2"><c:out value="${result.purNam}"/></td>
					<th scope="row">부지면적</th>
					<td colspan="2"><c:out value="${result.srvAra}"/> ㎡</td>
				</tr>
				<tr>
					<th scope="row">관리방법</th>
					<td><c:out value="${result.sagCdeNm}"/></td>
					<th scope="row">시설용량</th>
					<td><c:out value="${result.srvVol}"/> ㎥/일</td>
					<th scope="row">유입량</th>
					<td><c:out value="${result.isrVol}"/> ㎥/일</td>
				</tr>
				<tr>
					<th scope="row">최고수위</th>
					<td><c:out value="${result.hghWal}"/> m</td>
					<th scope="row">최저수위</th>
					<td><c:out value="${result.lowWal}"/> m</td>
					<th scope="row">제어방법</th>
					<td><c:out value="${result.scwCdeNm}"/></td>
				</tr>
				<tr>
					<th scope="row">급수지역</th>
					<td colspan="3"><c:out value="${result.supAre}"/></td>
					<th scope="row">급수인구</th>
					<td><c:out value="${result.supPop}"/> 인</td>
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
				<c:forEach begin="${fn:length(wttAttaDtList) > 0 ?  fn:length(wttAttaDtList): 0}"  end="${fn:length(wttAttaDtList) > 5 ?  fn:length(wttAttaDtList): 5}">			
					<tr>
						<td class="lnone" scope="col" colspan="2" style="min-height:22px"></td>
	                    <td class="lnone" scope="col" colspan="3"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="6" class="brnone space"></td>
				</tr>				
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
				<c:forEach var="subdata" items="${wttWutlHtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.repYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.repCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.sbjCdeNm}"/></td>
                    <td class="lnone al" scope="col" colspan="2"><c:out value="${subdata.repDes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.oprNam}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(wttWutlHtList) > 0 ?  fn:length(wttWutlHtList): 0}"  end="${fn:length(wttWutlHtList) > 5 ?  fn:length(wttWutlHtList): 5}">
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="8" class="brnone space"></td>
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
