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
        <h1>급 수 전 계 량 기 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>급수전계량기대장</caption>
			<colgroup>
				<col width="10%" /><col width="6%" /><col width="4%" /><col width="12%" /><col width="12%" /><col width="6%" />
				<col width="2%" /><col width="7%" /><col width="7%" /><col width="3%" /><col width="13%" /><col width="3%" /><col width="15%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row" colspan="2">관리번호</th>
					<td colspan="2"><c:out value="${result.ftrIdn}"/></td>
                    <td colspan="9" class="abrnone"></td>
				</tr> 
                <tr>
					<th scope="row" colspan="2">수용가번호</th>
					<td colspan="2"><c:out value="${result.homNum}"/></td>
					<th scope="row" colspan="2">공사번호</th>
					<td colspan="3"><c:out value="${result.cntNum}"/></td>
					<th scope="row" colspan="2">도엽번호</th>
					<td colspan="2"><c:out value="${result.shtNum}"/></td>
				</tr> 
                <tr>
					<th scope="row" colspan="2">수용가주소</th>
					<td colspan="4"><c:out value="${result.homAdr}"/></td>
					<th scope="row" colspan="3">설치일자</th>
					<td colspan="4"><c:out value="${result.istYmd}"/></td>
				</tr>
				<tr>
					<th scope="row" colspan="2">성명</th>
					<td colspan="2"><c:out value="${result.homNam}"/></td>
					<th scope="row" colspan="2">가구수</th>
					<td colspan="3"><c:out value="${result.homCnt}"/></td>
					<th scope="row" colspan="2">업종</th>
					<td colspan="2"><c:out value="${result.sbiCdeNm}"/></td>
				</tr>
				<tr>
					<th rowspan="2" colspan="2">계량기정보</th>
						<th scope="col" colspan="2">기물번호</th>
						<th scope="col" colspan="2">구경</th>
						<th scope="col" colspan="3">형식</th>
						<th scope="col" colspan="4">제작회사명</th>
				</tr>
				<tr>
					<td colspan="2"><c:out value="${result.metNum}"/></td>
					<td colspan="2"><c:out value="${result.metDip}"/> mm</td>
					<td colspan="3"><c:out value="${result.metMofNm}"/></td>
					<td colspan="4"><c:out value="${result.prdNam}"/></td>
				</tr>
				<tr>
					<th scope="row" colspan="2">급수관연장</th>
					<td colspan="2"><c:out value="${wtlSplyLs.pipLen}"/> m</td>
					<th scope="row" colspan="2">급수관재질</th>
					<td colspan="3"><c:out value="${wtlSplyLs.mopCdeNm}"/></td>
					<th scope="row" colspan="2">급수관구경</th>
					<td colspan="2"><c:out value="${wtlSplyLs.pipDip}"/> mm</td>
				</tr>
				<tr>
					<td colspan="13" class="brnone space"></td>
				</tr>
				
                <tr>
					<th scope="col" colspan="13" >계 량 기 교 체 내 역</th>
				</tr>
				<tr>
					<th scope="col" colspan="4">교체사항</th>
                    <th scope="col" colspan="9">철거사항</th>
				</tr>
                <tr>
					<th scope="col">구분</th>
                    <th scope="col" colspan="2">일자</th>
                    <th scope="col">사유</th>
                    <th scope="col">기물번호</th>
                    <th scope="col" colspan="2">구경</th>
                    <th scope="col">형식</th>
                    <th scope="col" colspan="2">지침수</th>
                    <th scope="col" colspan="2">제작회사</th>
                    <th scope="col">교체자</th>
				</tr>
				<c:forEach var="subdataMeta" items="${wttMetaHtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdataMeta.gcwCdeNm}"/></td>
                    <td class="lnone ac" scope="col" colspan="2"><c:out value="${subdataMeta.chgYmd}"/></td>
                    <td class="lnone al" scope="col"><c:out value="${subdataMeta.crsCdeNm}"/></td>
                    <td class="lnone al" scope="col"><c:out value="${subdataMeta.omeNum}"/></td>
                    <td class="lnone al" scope="col" colspan="2"><c:out value="${subdataMeta.omeDip}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdataMeta.omeMofNm}"/></td>
                    <td class="lnone al" scope="col" colspan="2"><c:out value="${subdataMeta.omeCnt}"/></td>
                    <td class="lnone ac" scope="col" colspan="2"><c:out value="${subdataMeta.omeNam}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdataMeta.chgNam}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(wttMetaHtList) > 0 ?  fn:length(wttMetaHtList): 0}"  end="${fn:length(wttMetaHtList) > 12 ?  fn:length(wttMetaHtList): 12}">
					<tr>
						<td class="lnone" scope="col" style="min-height:40px"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col" colspan="2"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="13" class="brnone space"></td>
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
