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

<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_widthWindow();">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>저 수 조 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>저수조대장</caption>
			<colgroup>
				<col width="13%" /><col width="13%" /><col width="2%" /><col width="5%" /><col width="7%" /><col width="6%" /><col width="13%" /><col width="14%" /><col width="13%" /><col width="16%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td colspan="2"><c:out value="${result.ftrIdn}"/></td>
                    <td colspan="7" class="abrnone"></td>
				</tr> 
                <tr>
					<th scope="row">저수조명</th>
					<td colspan="2"><c:out value="${result.rsrNam}"/></td>
					<th scope="row" colspan="2">도엽번호</th>
					<td colspan="2"><c:out value="${result.shtNum}"/></td>
					<th scope="row">관리기관</th>
					<td colspan="2"><c:out value="${result.mngCdeNm}"/></td>
				</tr> 
                <tr>
					<th scope="row">건물주소</th>
					<td colspan="5"><c:out value="${result.bldAdr}"/></td>
					<th scope="row">허가일자</th>
					<td><c:out value="${result.pmsYmd}"/></td>
					<th scope="row">준공일자</th>
					<td><c:out value="${result.fnsYmd}"/></td>
				</tr>
				<tr>
					<th scope="row">건물유형</th>
					<td><c:out value="${result.blsCdeNm}"/></td>
					<th scope="row" colspan="2">세대수</th>
					<td colspan="2"><c:out value="${result.famCnt}"/></td>
					<th scope="row">건축면적</th>
					<td><c:out value="${result.bldAra}"/> ㎡</td>
					<th scope="row">건축연면적</th>
					<td><c:out value="${result.tblAra}"/> ㎡</td>
				</tr>
				<tr>
					<th scope="row">소유자성명</th>
					<td colspan="3"><c:out value="${result.ownNam}"/></td>
					<th scope="row" colspan="2">소유자전화번호</th>
					<td colspan="4"><c:out value="${result.ownTel}"/></td>
				</tr>
				<tr>
					<th scope="row">소유자주소</th>
					<td colspan="9"><c:out value="${result.ownAdr}"/></td>
				</tr>
				<tr>
					<th scope="row">관리자성명</th>
					<td colspan="3"><c:out value="${result.mngNam}"/></td>
					<th scope="row" colspan="2">관리자전화번호</th>
					<td colspan="4"><c:out value="${result.mngTel}"/></td>
				</tr>
				<tr>
					<th scope="row">관리자주소</th>
					<td colspan="9"><c:out value="${result.mngAdr}"/></td>
				</tr>
			</tbody>
		</table>
		<div style='height:40px;page-break-before:always'></div> 
		<table class="tbprint" summary="대 장">
            <caption>저수조대장</caption>
			<colgroup>
				<col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" />
				<col width="12%" /><col width="6.6%" /><col width="7%" /><col width="12%" /><col width="8%" />
				<col width="18%" />
			</colgroup>
			<tbody>
	             <tr>
					<th scope="col" colspan="11" >저수조 세부시설현황(1)</th>
				</tr> 
	               <tr>
					<th scope="col" >저수조위치</th>
	                <th scope="col" >저수조재질</th>
	                <th scope="col" >저수조개소수</th>
	                <th scope="col" >저수조용량</th>
	                <th scope="col" >저수조용도</th>
	                <th scope="col" >저수조규격</th>
	                <th scope="col" >맨홀개소수</th>
	                <th scope="col" >맨홀규격</th>
	                <th scope="col" >맨홀위치</th>
	                <th scope="col" >침전물배출구여부</th>
	                <th scope="col">침전물배출구위치</th>
				</tr> 
				<c:forEach var="subdata" items="${wttRsrvDtList}">
	               <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.ougCdeNm}"/></td>
	                <td class="lnone ac" scope="col"><c:out value="${subdata.rsrMopNm}"/></td>
	                <td class="lnone ar" scope="col"><c:out value="${subdata.rsrCnt}"/></td>
	                <td class="lnone ac" scope="col"><c:out value="${subdata.rsrVol}"/></td>
	                <td class="lnone ac" scope="col"><c:out value="${subdata.sacCdeNm}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.rsrStd}"/></td>
	                <td class="lnone ar" scope="col"><c:out value="${subdata.manCnt}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.manStd}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.manLoc}"/></td>
	                <td class="lnone ac" scope="col"><c:out value="${subdata.dcwCdeNm}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.dcwLoc}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(wttRsrvDtList) > 0 ?  fn:length(wttRsrvDtList): 0}"  end="${fn:length(wttRsrvDtList) > 15 ?  fn:length(wttRsrvDtList): 15}">
					<tr>
						<td class="lnone" scope="col" style="min-height:20px"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
	               <tr>
					<td colspan="11" class="brnone space"></td>
				</tr> 
			</tbody>
		</table>
		<div style='height:40px;page-break-before:always'></div> 
		<table class="tbprint" summary="대 장">
            <caption>저수조대장</caption>
			<colgroup>
				<col width="12%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="12%" />
				<col width="13%" /><col width="13%" /><col width="8%" /><col width="18%" />
			</colgroup>
			<tbody>
	             <tr>
					<th scope="col" colspan="9" >저수조 세부시설현황(2)</th>
				</tr> 
	               <tr>
					<th scope="col" >유입/배출구시설현황</th>
	                <th scope="col" >월류관규격</th>
	                <th scope="col" >월류관위치</th>
	                <th scope="col" >통기관규격</th>
	                <th scope="col" >통기관위치</th>
	                <th scope="col" >만수/감수경보장치여부</th>
	                <th scope="col" >만수/감수경보장치위치</th>
	                <th scope="col" >수조구획여부</th>
	                <th scope="col" >기타설명</th>
				</tr> 
				<c:forEach var="subdata" items="${wttRsrvDtList}">
	               <tr>
					<td class="lnone al" scope="col"><c:out value="${subdata.iohExp}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.wolStd}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.wolLoc}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.togStd}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.togLoc}"/></td>
	                <td class="lnone ac" scope="col"><c:out value="${subdata.lhwCdeNm}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.lhwLoc}"/></td>
	                <td class="lnone ac" scope="col"><c:out value="${subdata.tnkCdeNm}"/></td>
	                <td class="lnone al" scope="col"><c:out value="${subdata.etcExp}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(wttRsrvDtList) > 0 ?  fn:length(wttRsrvDtList): 0}"  end="${fn:length(wttRsrvDtList) > 15 ?  fn:length(wttRsrvDtList): 15}">
					<tr>
						<td class="lnone" scope="col" style="min-height:20px"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
	               <tr>
					<td colspan="9" class="brnone space"></td>
				</tr> 
			</tbody>
		</table>
		<div style='height:40px;page-break-before:always'></div> 
		<table class="tbprint" summary="대 장">
			<caption>저수조대장</caption>
			<colgroup>
				<col width="20%" /><col width="60%" /><col width="20%" />
			</colgroup>
			<tbody>
	            <tr>
					<th scope="col" colspan="3" >청소내역</th>
				</tr> 
	            <tr>
					<th scope="col" >청소일자</th>
	                <th scope="col">청소내용</th>
	                <th scope="col">청소업체명</th>
				</tr> 
				<c:forEach var="subdataRsrv" items="${wttRsrvHtList}">
	                <tr>
						<td class="lnone ac"  scope="col" ><c:out value="${subdataRsrv.clnYmd}"/></td>
	                    <td class="lnone al"  scope="col" ><c:out value="${subdataRsrv.clnExp}"/></td>
	                    <td class="lnone ac"   scope="col"><c:out value="${subdataRsrv.clnNam}"/></td>
					</tr>
				</c:forEach>	
				<c:forEach begin="${fn:length(wttRsrvHtList) > 0 ?  fn:length(wttRsrvHtList): 0}"  end="${fn:length(wttRsrvHtList) > 15 ?  fn:length(wttRsrvHtList): 15}">
					<tr>
						<td class="lnone"  scope="col" style="min-height:22px"></td>
	                    <td class="lnone"  scope="col" ></td>
	                    <td class="lnone"  scope="col"></td>
					</tr>
				</c:forEach>		
	               <tr>
					<td colspan="3" class="brnone space"></td>
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
