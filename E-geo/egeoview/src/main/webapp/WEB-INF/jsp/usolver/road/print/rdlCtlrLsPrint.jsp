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
        <h1>도 로 구 간 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로구간대장</caption>
			<colgroup>
				<col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.secIdn}"/></td>
                    <td colspan="4" class="abrnone"></td>
                    <th scope="row">관리기관</th>
					<td><c:out value="${result.mngCdeNm}"/></td>
				</tr> 
                <tr>
					<th scope="row">노선번호</th>
					<td><c:out value="${rdtRoutDtList[0].rutIdn}"/></td>
					<th scope="row">노선명</th>
					<td colspan="2"><c:out value="${rdtRoutDtList[0].rutNam}"/></td>
					<th scope="row">행정읍/면/동</th>
					<td colspan="2"><c:out value="${result.hjdCdeNm}"/></td>
				</tr> 
              <tr>
					<th scope="row">도로종류</th>
					<td></td>
					<th scope="row">도로기능</th>
					<td><c:out value="${result.secIdn}"/></td>
					<th scope="row">도로규모</th>
					<td><c:out value="${result.secIdn}"/></td>
					<th scope="row">중용여부</th>
					<td><c:out value="${result.jygCdeNm}"/></td>
				</tr> 
                <tr>
					<th scope="row">도로연장</th>
					<td colspan="3"><c:out value="${result.rdlLen}"/>m</td>
					<th colspan="2" scope="row">도로중심선교점관리번호</th>
					<td colspan="2"><c:out value="${result.ipcIdn}"/></td>
				</tr> 
				<tr>
					<th scope="row">도로면적</th>
					<td colspan="3"><c:out value="${result.rdlAra}"/>㎡</td>
					<th colspan="2" scope="row">오르막차로관리번호</th>
					<td colspan="2"><c:out value="${result.clbIdn}"/></td>
				</tr> 	
				<tr>
					<th scope="row">도로폭원</th>
					<td colspan="3"><c:out value="${result.rdlWid}"/>m</td>
					<th scope="row">우회도로관리번호</th>
					<td><c:out value="${result.rouIdn}"/></td>
					<th scope="row">구간구분</th>
					<td><c:out value="${result.ggbCdeNm}"/></td>
				</tr>
				 <tr>
					<td colspan="8" class="brnone space"></td>
				</tr>  
			 </tbody> 
		  </table>	
		  <div style='page-break-before:always'></div> 
		  <table class="tbprint" summary="대 장">
		  	  <caption>차도대장</caption>
				<colgroup>
					<col width="7%" /><col width="7%" /><col width="7%" /><col width="7%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" />
					<col width="7%"" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" />
					<col width="4%" /><col width="4%" /><col width="4%" />				
				</colgroup>
		  	  <tbody>
				 <tr>
					<th scope="col" colspan="19" >차도</th>
				</tr> 
                <tr>
					<th scope="col"  rowspan="2" >도로면일련번호</th>
					<th scope="col"  rowspan="2"  >관리자</th>
					<th scope="col"  rowspan="2" >왕복차로수</th>
                    <th scope="col"  rowspan="2" >공사번호</th>
                    <th scope="col" colspan="2">도로법면</th>
                    <th scope="col" colspan="2">차도구간</th>
                    <th scope="col"  rowspan="2" >차도재질</th>
					<th scope="col"  colspan="2">도로경계석(좌)</th>
					<th scope="col"  colspan="2">도로경계석(우)</th>
                    <th scope="col"  colspan="3">노견(좌)</th>
                    <th scope="col"  colspan="3">노견(우)</th>
				</tr>
				<tr>
					<th scope="col" >연장(m)</th>
					<th scope="col" >면적(㎡)</th>
					<th scope="col" >연장(m)</th>
                    <th scope="col">면적(㎡)</th>
                    <th scope="col" >재질</th>
                    <th scope="col">연장(m)</th>
                    <th scope="col" >재질</th>
                    <th scope="col">연장(m)</th>
					<th scope="col" >연장(m)</th>
                    <th scope="col">면적(㎡)</th>
                    <th scope="col">폭(m)</th>
                    <th scope="col" >연장(m)</th>
                    <th scope="col">면적(㎡)</th>
                    <th scope="col">폭(m)</th>
				</tr> 
				<c:forEach var="subdata" items="${rdtRdwyDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.rdaIdn}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.mngNam}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.lanCnt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.cntNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.iclLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.iclAra}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.jygLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.jygAra}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.addCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.lmaCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.lrlLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rmaCdeNm}"/></td> 
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rrlLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.nolLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.nolAra}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.nolWid}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.norLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.norAra}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.norWid}"/></td>                
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtRdwyDtList) > 0 ?  fn:length(rdtRdwyDtList): 0}"  end="${fn:length(rdtRdwyDtList) > 10 ?  fn:length(rdtRdwyDtList): 10}">			
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
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" ></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="19" class="brnone space"></td>
				</tr>                
			</tbody>
		</table>
		<div style='page-break-before:always'></div> 
		<table class="tbprint" summary="대 장">
			<caption>보도대장</caption>
			<colgroup>
				<col width="7%" /><col width="7%" /><col width="7%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="7%" />
				<col width="7%"" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" />
				<col width="4%" /><col width="4%" /><col width="4%" />				
			</colgroup>
			<tbody>
				 <tr>
					<th scope="col" colspan="19" >보도</th>
				</tr> 
                <tr>
					<th scope="col"  rowspan="2" >도로면일련번호</th>
					<th scope="col"  rowspan="2"  >관리자</th>					
                    <th scope="col"  rowspan="2" >공사번호</th>
                    <th scope="col"  rowspan="2" >폭원(m)</th>
                    <th scope="col"  rowspan="2" >연장(m)</th>
                    <th scope="col"  rowspan="2" >면적(㎡)</th>
                    <th scope="col"  colspan="3">보도턱</th>
                    <th scope="col"  colspan="2">보도경계석</th>
                    <th scope="col"  rowspan="2" >보도재질</th>
					<th scope="col"  colspan="3">유 도 블 록</th>
					<th scope="col"  colspan="4">자 전 거 전 용 도 로</th>
				</tr>
				<tr>
					<th scope="col">총개수</th>
					<th scope="col">횡단보도낮추기</th>
					<th scope="col">보도진입부낮추기</th>
                    <th scope="col">재질</th>
                    <th scope="col">연장(m)</th>
                    <th scope="col">종류</th>
                    <th scope="col">연장(m)</th>
                    <th scope="col">면적(㎡)</th>                    
                    <th scope="col">연장(m)</th>
                    <th scope="col">폭원(m)</th>
                    <th scope="col">면적(㎡)</th>
                    <th scope="col">재질</th>
				</tr> 
				<c:forEach var="subdata" items="${rdtSdwkDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.rdaIdn}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.mngNam}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.cntNum}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.bdlWid}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.bdlLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.bdlAra}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.btkCnt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.htkCnt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.jtkCnt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.lmaCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.lmaAra}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.lavCdeNm}"/></td> 
                    <td class="lnone ac" scope="col"><c:out value="${subdata.blcCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.blcLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.blcAra}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.smwLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.smwlWid}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.smwAra}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.smwCdeNm}"/></td>                
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtSdwkDtList) > 0 ?  fn:length(rdtSdwkDtList): 0}"  end="${fn:length(rdtSdwkDtList) > 10 ?  fn:length(rdtSdwkDtList): 10}">			
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
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col"></td>
						<td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" ></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="19" class="brnone space"></td>
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
