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
<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_widthWindow();">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>도 로 점 용 허 가 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로점용허가대장</caption>
			<colgroup>
				<col width="11%" /><col width="11%" /><col width="11%" /><col width="11%" /><col width="11%" /><col width="11%" /><col width="11%" /><col width="11%" /><col width="11%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.pmsIdn}"/></td>
                    <td colspan="6" class="abrnone"></td>
				</tr> 
				<tr>
					<th scope="row">허가관리번호</th>
					<td colspan="4" ><c:out value="${result.pmsNum}"/></td>
                    <th scope="row">허가일자</th>
					<td><c:out value="${result.pmsYmd}"/></td>
					<th scope="row">점용물관리코드</th>
					<td><c:out value="${result.jypCdeNm}"/></td>
				</tr> 
               <tr>
					<th scope="row">점용장소</th>
					<td colspan="4" ><c:out value="${result.jygLoc}"/></td>
                    <th scope="row">허가종류</th>
					<td><c:out value="${result.jpkCdeNm}"/></td>
					<th scope="row">지가</th>
					<td><c:out value="${result.enpAmt}"/>원</td>
				</tr> 
                <tr>
					<th scope="row">구허가번호</th>
					<td colspan="4" ><c:out value="${result.opmNum}"/></td>
                    <th scope="row">변경일자</th>
					<td><c:out value="${result.chgYmd}"/></td>
					<th scope="row">면제여부</th>
					<td><c:out value="${result.jfcCdeNm}"/></td>
				</tr> 
              	<tr>
					<th colspan="5" scope="row">점용</th>
					<th colspan="4" scope="row">도로지번</th>
				</tr> 
                <tr>
					<th scope="row">시작일자</th>					
					<th scope="row">종료일자</th>
					<th scope="row">물량(개소)</th>
					<th scope="row">물량(면적)</th>
					<th scope="row">물량(연장)</th>
					<th scope="row">법정동</th>
					<th scope="row">대지구분</th>
					<th scope="row">본번</th>
					<th scope="row">부번</th>
				</tr> 
				<tr>
					<td><c:out value="${result.jysYmd}"/></td>
					<td><c:out value="${result.jyeYmd}"/></td>
					<td><c:out value="${result.jygCnt}"/></td>
					<td><c:out value="${result.jygAra}"/></td>
					<td><c:out value="${result.jygLen}"/></td>
					<td><c:out value="${result.bjdCdeNm}"/></td>
					<td><c:out value="${result.djsCdeNm}"/></td>
					<td><c:out value="${result.facNum}"/></td>
					<td><c:out value="${result.fadNum}"/></td>
				</tr> 	
				<tr>
					<th scope="row">점용목적</th>
					<td colspan="4"><c:out value="${result.jygPrs}"/></td>
					<th scope="row">변경사항</th>
					<td colspan="3"><c:out value="${result.chgDes}"/></td>
				</tr>
				<tr>
					<th rowspan="6" scope="row">피허가자</th>
					<th scope="row">성명(대표자명)</th>
					<td colspan="7"><c:out value="${result.pmsNam}"/></td>
				</tr>
				<tr>
					<th scope="row">허가자구분</th>
					<td colspan="7"><c:out value="${result.idgCdeNm}"/></td>
				</tr>
				<tr>
					<th scope="row">주민(법인)번호</th>
					<td colspan="7"><c:out value="${result.pmbNum}"/></td>
				</tr>
				<tr>
					<th scope="row">상호명</th>
					<td colspan="7"><c:out value="${result.pmbNam}"/></td>
				</tr>
				<tr>
					<th scope="row">주소</th>
					<td colspan="7"><c:out value="${result.pmsAdr}"/></td>
				</tr>
				<tr>
					<th scope="row">전화번호</th>
					<td colspan="7"><c:out value="${result.pmsTel}"/></td>
				</tr>
				 <tr>
					<td colspan="9" class="brnone space"></td>
				</tr>  
			 </tbody> 
		  </table>	
		  <div style='page-break-before:always'></div> 
		  <table class="tbprint" summary="대 장">
		  	  <caption>인 접 지 번 내 역</caption>
				<colgroup>
					<col width="20%" /><col width="20%" /><col width="20%" /><col width="20%" /><col width="20%" />	
				</colgroup>
		  	  <tbody>
				 <tr>
					<th scope="col" colspan="5" >인 접 지 번 내 역</th>
				</tr> 
                <tr>
					<th scope="col">본번</th>
					<th scope="col">부번</th>
					<th scope="col">법정동</th>
                    <th scope="col">대지구분</th>
                    <th scope="col">지가</th>                   
				</tr> 
				<c:forEach var="subdata" items="${rdtOcnrDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.eacNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.eadNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.ebdCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.ebdCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.enpAmt}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtOcnrDtList) > 0 ?  fn:length(rdtOcnrDtList): 0}"  end="${fn:length(rdtOcnrDtList) > 10 ?  fn:length(rdtOcnrDtList): 10}">			
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
						<td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" ></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="5" class="brnone space"></td>
				</tr>                
			</tbody>
		</table>
		<div style='page-break-before:always'></div> 
		<table class="tbprint" summary="대 장">
			<caption>허    가    조    건    내    역</caption>
			<colgroup>
				<col width="10%" /><col width="90%" />
			</colgroup>
			<tbody>
				 <tr>
					<th scope="col" colspan="2" >허    가    조    건    내    역</th>
				</tr> 
                <tr>
					<th scope="col">번호</th>
					<th scope="col">허가조건</th>					
				</tr>
				<c:forEach var="subdata" items="${rdtExacDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.agaNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.cndDes}"/></td>           
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtExacDtList) > 0 ?  fn:length(rdtExacDtList): 0}"  end="${fn:length(rdtExacDtList) > 10 ?  fn:length(rdtExacDtList): 10}">			
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
						<td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="2" class="brnone space"></td>
				</tr>                
			</tbody>
		</table>
		 <div style='page-break-before:always'></div> 
		  <table class="tbprint" summary="대 장">
		  	  <caption>도   로   점   용   료   부   과   내   역</caption>
				<colgroup>
					<col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" />
					<col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" /><col width="6.6%" />					
				</colgroup>
		  	  <tbody>
				 <tr>
					<th scope="col" colspan="15" >도   로   점   용   료   부   과   내   역</th>
				</tr> 
                <tr>
					<th scope="col">점용료부과일자</th>
					<th scope="col">납기만기일자</th>
					<th scope="col">납기후만기일자</th>
                    <th scope="col">전년점용료</th>
                    <th scope="col">증가율</th>
                    <th scope="col">점용료산출내역</th>
                    <th scope="col">점용료-변상금</th>
					<th scope="col">감면비율</th>					
					<th scope="col">감면조정료</th>
                    <th scope="col">조정점용료</th>
                    <th scope="col">과세대상</th>
					<th scope="col">수납번호</th>
					<th scope="col">수납여부</th>
					<th scope="col">납기후금액</th>
                    <th scope="col">체납액</th>
				</tr> 
				<c:forEach var="subdata" items="${rdtFeimDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.assYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.eprYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.aprYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.pyrAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.incRat}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.stmSes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.pvsAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rdcRat}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rdcAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rcnAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.taxDes}"/></td> 
                    <td class="lnone ac" scope="col"><c:out value="${subdata.recNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.recCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.aexAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.fcsAmt}"/></td>                     
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtFeimDtList) > 0 ?  fn:length(rdtFeimDtList): 0}"  end="${fn:length(rdtFeimDtList) > 10 ?  fn:length(rdtFeimDtList): 10}">			
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
						<td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" ></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" ></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" ></td>
	                    <td class="lnone" scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="15" class="brnone space"></td>
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
