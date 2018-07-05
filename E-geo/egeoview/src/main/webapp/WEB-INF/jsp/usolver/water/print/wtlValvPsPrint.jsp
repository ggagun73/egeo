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
        <h1>변 류 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>변류대장</caption>
			<colgroup>
				<col width="16%" /><col width="17%" /><col width="10%" /><col width="10%" /><col width="16%" /><col width="8%" /><col width="8%" /><col width="17%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.ftrIdn}"/></td>
                    <td colspan="6" class="abrnone"></td>
				</tr> 
                <tr>
					<th scope="row">변류명</th>
					<td><c:out value="${result.ftrCdeNm}"/></td>
					<th scope="row" colspan="2">공사번호</th>
					<td><c:out value="${result.cntNum}"/></td>
					<th scope="row" colspan="2">도엽번호</th>
					<td><c:out value="${result.shtNum}"/></td>
				</tr> 
                <tr>
					<th scope="row">설치일자</th>
					<td><c:out value="${result.istYmd}"/></td>
					<th scope="row" colspan="2">형식</th>
					<td><c:out value="${result.valMofNm}"/></td>
					<th scope="row" colspan="2">재질</th>
					<td><c:out value="${result.valMopNm}"/></td>
				</tr>
				<tr>
					<th scope="row">구경</th>
					<td><c:out value="${result.valDip}"/> mm</td>
					<th scope="row" colspan="2">이상상태</th>
					<td><c:out value="${result.cstCdeNm}"/></td>
					<th scope="row" colspan="2">개폐여부</th>
					<td><c:out value="${result.offCdeNm}"/></td>
				</tr>
				<tr>
					<th scope="row">제작회사</th>
					<td colspan="3"><c:out value="${result.prdNam}"/></td>
					<th scope="row">관리기관</th>
					<td colspan="3"><c:out value="${result.mngCdeNm}"/></td>
				</tr>
				<tr>
					<th rowspan="2">제수변정보</th>
						<th scope="col">회전방향</th>
						<th scope="col" colspan="2">총회전수</th>
						<th scope="col" colspan="2">현재회전수</th>
						<th scope="col" colspan="2">구동방법</th>
				</tr>
				<tr>
					<td><c:out value="${result.saeCdeNm}"/></td>
					<td colspan="2"><c:out value="${result.troCnt}"/></td>
					<td colspan="2"><c:out value="${result.croCnt}"/></td>
					<td colspan="2"><c:out value="${result.mthCdeNm}"/></td>
				</tr>
				<tr>
					<th rowspan="2">변실</th>
						<th scope="col" colspan="2">형태</th>
						<th scope="col" colspan="2">규격</th>
						<th scope="col" colspan="3">설정압력</th>
				</tr>
				<tr>
					<td colspan="2"><c:out value="${result.valForNm}"/></td>
					<td colspan="2"><c:out value="${result.valStd}"/></td>
					<td colspan="3"><c:out value="${result.valSaf}"/> ㎏/㎠</td>
				</tr>
				<tr>
					<td colspan="8" class="brnone space"></td>
				</tr>
                <tr>
					<th scope="col" colspan="8" >유 지 보 수 내 역</th>
				</tr> 
                <tr>
					<th scope="col" >보수일자</th>
                    <th scope="col" >보수구분</th>
                    <th scope="col" >보수사유</th>
                    <th scope="col" colspan="3">유지보수내용</th>
                    <th scope="col"  colspan="2">시공자</th>
				</tr> 
				<c:forEach var="subdata" items="${wttWutlHtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.repYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.repCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.sbjCdeNm}"/></td>
                    <td class="lnone al" scope="col"  colspan="3"><c:out value="${subdata.repDes}"/></td>
                    <td class="lnone ac" scope="col" colspan="2"><c:out value="${subdata.oprNam}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(wttWutlHtList) > 0 ?  fn:length(wttWutlHtList): 0}"  end="${fn:length(wttWutlHtList) > 14 ?  fn:length(wttWutlHtList): 14}">
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="3"></td>
	                    <td class="lnone" scope="col"  colspan="2"></td>
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
