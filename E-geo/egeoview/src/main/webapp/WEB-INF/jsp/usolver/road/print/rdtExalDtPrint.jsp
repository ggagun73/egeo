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
        <h1>도 로 굴 착 허 가 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로굴착허가대장</caption>
			<colgroup>
				<col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" /><col width="12.5%" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">관리번호</th>
					<td><c:out value="${result.pmsIdn}"/></td>
                    <td colspan="6" class="abrnone"></td>
				</tr> 
				<tr>
					<th scope="row">설치공작물내역</th>
					<td colspan="3" ><c:out value="${result.insExp}"/></td>
                    <th scope="row">감독자</th>
					<td colspan="3" ><c:out value="${result.svsNam}"/></td>
				</tr> 
                <tr>
					<th scope="row">굴착심의번호</th>
					<td><c:out value="${result.glaIdn}"/></td>
					<th scope="row">허가일자</th>
					<td><c:out value="${result.pmsYmd}"/></td>
					<th scope="row">일시점용면적</th>
					<td><c:out value="${result.tmpAra}"/> ㎡</td>
					<th scope="row">굴착신청방법</th>
					<td><c:out value="${result.adwCdeNm}"/></td>
				</tr> 
              <tr>
					<th colspan="2" scope="row">일시점용료</th>
					<th colspan="2" scope="row">간접손괴비</th>
					<th scope="row">조정점용료</th>
					<td><c:out value="${result.tmpAmt}"/>원</td>
					<th scope="row">일시점용료</th>
					<td><c:out value="${result.secIdn}"/>원</td>
				</tr> 
                <tr>
					<th scope="row">부과일자</th>
					<th scope="row">징수일자</th>
					<th scope="row">부과일자</th>
					<th scope="row">징수일자</th>
					<th scope="row">간접손괴비</th>
					<td><c:out value="${result.secIdn}"/>원</td>
					<th scope="row">예치금</th>
					<td><c:out value="${result.depAmt}"/>원</td>
				</tr> 
				<tr>
					<td><c:out value="${result.onbYmd}"/></td>
					<td><c:out value="${result.oncYmd}"/></td>
					<td><c:out value="${result.driYmd}"/></td>
					<td><c:out value="${result.drcYmd}"/></td>
					<th scope="row">환급예정일자</th>
					<td><c:out value="${result.depYmd}"/></td>
					<th scope="row">부과취소여부</th>
					<td><c:out value="${result.clyCdeNm}"/></td>
				</tr> 	
				<tr>
					<th scope="row">업종구분</th>
					<td><c:out value="${result.ujpCdeNm}"/></td>
					<th scope="row">감면비율</th>
					<td><c:out value="${result.rdcRat}"/> %</td>
					<th scope="row">지역개발공채</th>
					<td><c:out value="${result.pdpAmt}"/> 원</td>
					<th scope="row">환급금액</th>
					<td><c:out value="${result.retAmt}"/> 원</td>
				</tr>
				<tr>
					<th rowspan="5" scope="row">피허가자</th>
					<th scope="row">성명(대표자명)</th>
					<td colspan="6"><c:out value="${result.pmsNam}"/></td>
				</tr>
				<tr>
					<th scope="row">주민(법인)번호</th>
					<td colspan="6"><c:out value="${result.pmbNum}"/></td>
				</tr>
				<tr>
					<th scope="row">업체명</th>
					<td colspan="6"><c:out value="${result.pmbNam}"/></td>
				</tr>
				<tr>
					<th scope="row">주소</th>
					<td colspan="6"><c:out value="${result.pmsAdr}"/></td>
				</tr>
				<tr>
					<th scope="row">전화번호</th>
					<td colspan="6"><c:out value="${result.pmsTel}"/></td>
				</tr>
				 <tr>
					<td colspan="8" class="brnone space"></td>
				</tr>  
			 </tbody> 
		  </table>	
		  <div style='page-break-before:always'></div> 
		  <table class="tbprint" summary="대 장">
		  	  <caption>굴 착 허 가 위 치 내 역</caption>
				<colgroup>
					<col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" />
					<col width="4%"" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" />
					<col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" /><col width="4%" />				
				</colgroup>
		  	  <tbody>
				 <tr>
					<th scope="col" colspan="22" >굴 착 허 가 위 치 내 역</th>
				</tr> 
                <tr>
					<th scope="col">굴착시작일자</th>
					<th scope="col">굴착종료일자</th>
					<th scope="col">굴착위치설명</th>
                    <th scope="col">포장재질</th>
                    <th scope="col">굴착폭</th>
                    <th scope="col">일시점용굴착길이</th>
                    <th scope="col">일시점용 굴착면적</th>
					<th scope="col">일시점용산출내역</th>
					<th scope="col">일시점용점용료</th>
                    <th scope="col">간접손괴비산출내역</th>
                    <th scope="col">간접손괴비</th>
					<th scope="col" >심도</th>
					<th scope="col" >매설관경</th>
					<th scope="col" >매설재질</th>
                    <th scope="col">영구점용길이</th>
                    <th scope="col" >점용기간시작일자</th>
                    <th scope="col">점용기간종료일자</th>
                    <th scope="col" >변경처리일자</th>
                    <th scope="col">원상복구검사일자</th>
					<th scope="col" >공사유형</th>
                    <th scope="col">차도보도구분</th>
                    <th scope="col">관리기관</th>
				</tr> 
				<c:forEach var="subdata" items="${rdlExcvAsList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdata.disYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.dieYmd}"/></td>
                    <td class="lnone ac" scope="col"></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.addCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.digWid}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.digLen}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.digAra}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.oclDes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.oclAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.iclDes}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.iclAmt}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.gulDep}"/></td> 
                    <td class="lnone ac" scope="col"><c:out value="${subdata.pipDip}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.maeMop}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.pjgLen}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.jysYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.jyeYmd}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdata.chgYmd}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.rcvYmd}"/></td>   
                    <td class="lnone ac" scope="col"><c:out value="${subdata.kngCdeNm}"/></td>           
                    <td class="lnone ac" scope="col"><c:out value="${subdata.chbCdeNm}"/></td>           
                    <td class="lnone ac" scope="col"><c:out value="${subdata.mngCdeNm}"/></td>                        
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdlExcvAsList) > 0 ?  fn:length(rdlExcvAsList): 0}"  end="${fn:length(rdlExcvAsList) > 10 ?  fn:length(rdlExcvAsList): 10}">			
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
	                    <td class="lnone" scope="col" ></td>
	                    <td class="lnone" scope="col" ></td>
	                    <td class="lnone" scope="col" ></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="22" class="brnone space"></td>
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
		<div class="Btn_pd2 noprint"  id="divPrint" >
			<div class="Btn"><a href="#" class="Btn_02" onclick="fn_book_print();">인쇄</a></div>
			<div class="Btn"><a href="#" class="Btn_02" onClick="window.close();">닫기</a></div>
		</div>
	</div>
	<!-- wrap end -->
</form>
</body>
</html>
