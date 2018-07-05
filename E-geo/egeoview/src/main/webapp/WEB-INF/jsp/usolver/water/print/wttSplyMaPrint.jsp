<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>급수공사대장</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/book/print.css'/>"/>
<script  src="<c:url value='/js/usolver/book/print.js'/>"></script>
</head>

<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_heightWindow()">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>급 수 공 사 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>급수공사대장</caption>
			<colgroup>
				<col width="16%" /><col width="17%" /><col width="17%" /><col width="16%" /><col width="17%" /><col width="17%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">공사번호</th>
					<td><c:out value="${result.cntNum}"/></td>
                    <td colspan="4" class="abrnone"></td>
				</tr> 
                <tr>
					<th scope="row">착수일자</th>
					<td><c:out value="${result.begYmd}"/></td>
					<th scope="row">준공일자</th>
					<td><c:out value="${result.fnsYmd}"/></td>
					<th scope="row">관급자재비</th>
					<td class="ar"><c:out value="${result.gvrAmt}"/>원</td>
				</tr>    
                <tr>
					<th scope="row">시급자재비</th>
					<td class="ar"><c:out value="${result.prvAmt}"/>원</td>
					<th scope="row">부가가치세</th>
					<td class="ar"><c:out value="${result.taxAmt}"/>원</td>
					<th scope="row">도로복구비</th>
					<td class="ar"><c:out value="${result.rorAmt}"/>원</td>
				</tr>    
				<tr>
					<th scope="row">설계수수료</th>
					<td class="ar"><c:out value="${result.dfeAmt}"/>원</td>
					<th scope="row">자재검사수수료</th>
					<td class="ar"><c:out value="${result.gfeAmt}"/>원</td>
					<th scope="row">준공검사수수료</th>
					<td class="ar"><c:out value="${result.ffeAmt}"/>원</td>
				</tr> 
				<tr>
					<th scope="row">시설분담금</th>
					<td class="ar"><c:out value="${result.divAmt}"/>원</td>
					<th scope="row">기타금액</th>
					<td class="ar"><c:out value="${result.etcAmt}"/>원</td>
					<th scope="row">공사비총액</th>
					<td class="ar"><c:out value="${result.totAmt}"/>원</td>
				</tr>       
                <tr>
					<th scope="row">수납일자</th>
					<td colspan="2"><c:out value="${result.rcpYmd}"/></td>
                    <th scope="row">시공자명</th>
					<td colspan="2"><c:out value="${result.oprNam}"/></td>
				</tr> 
				<tr>
					<th scope="row">감독자성명</th>
					<td colspan="2"><c:out value="${result.svsNam}"/></td>
                    <th scope="row">준공검사자성명</th>
					<td colspan="2"><c:out value="${result.fnsNam}"/></td>
				</tr>    
				<tr>
                    <td class="lnone" colspan="6" style="height:600px">
                    	<c:if test="${!empty result.rcvNum}" >
							민원번호 : <c:out value="${result.rcvNum}"/>
						</c:if>
                    </td>
				</tr>
				<tr>
					<td colspan="6" class="brnone space"></td>
				</tr>
			</tbody>
		</table>				
		<div class="Btn_pd2"  id="divPrint" >
			<div class="Btn"><a href="#" class="Btn_02" onclick="fn_book_print()">인쇄</a></div>
			<div class="Btn"><a href="#" class="Btn_02" onClick="window.close()">닫기</a></div>
		</div>
	</div>
	<!-- wrap end -->
</form>
</body>
</html>
