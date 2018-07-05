<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>도로공사대장</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/book/print.css'/>"/>
<script src="<c:url value='/js/usolver/book/print.js'/>"></script>

</head>

<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_heightWindow()">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>도 로 공 사 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로공사대장</caption>
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
					<th scope="row">공사명</th>
					<td colspan="5"><c:out value="${result.cntNam}"/></td>
				</tr>    
                <tr>
					<th scope="row">공사위치</th>
					<td colspan="5"><c:out value="${result.cntLoc}"/></td>
				</tr>    
                <tr>
					<th scope="row">공사구분</th>
					<td colspan="2"><c:out value="${result.wrkCdeNm}"/></td>
                    <th scope="row">설계자명</th>
					<td colspan="2"><c:out value="${result.dsnNam}"/></td>
				</tr>   
                <tr>
					<th scope="row" rowspan="4">설계금액</th>
                    <th scope="row">순공사비</th>
					<td class="ar"><c:out value="${result.dpcAmt}"/>원</td>
                    <th scope="row" rowspan="4">지출과목</th>
                    <th scope="row">관</th>
					<td><c:out value="${result.kwnExp}"/></td>
				</tr>
                <tr>
                    <th scope="row">관급금액</th>
					<td class="ar"><c:out value="${result.dgcAmt}"/>원</td>
                    <th scope="row">항</th>
					<td><c:out value="${result.hngExp}"/></td>
				</tr>
                <tr>
                    <th scope="row">기타잡비</th>
					<td class="ar"><c:out value="${result.detAmt}"/>원
                    </td>
                    <th rowspan="2" scope="row">세항</th>
					<td rowspan="2"><c:out value="${result.shnExp}"/></td>
				</tr>
                <tr>
                    <th scope="row">총액</th>
					<td class="ar"><c:out value="${result.dsnAmt}"/>원
                    </td>
				</tr>
                <tr>
					<th scope="row" rowspan="5">재원</th>
                    <th scope="row">국비</th>
					<td class="ar"><c:out value="${result.natAmt}"/>원
                    </td>
                    <th scope="row">입찰일자</th>
					<td colspan="2"><c:out value="${result.bidYmd}"/></td>
				</tr>
                <tr>
                    <th scope="row">도비</th>
					<td class="ar"><c:out value="${result.couAmt}"/>원
                    </td>
                    <th scope="row">예정금액</th>
					<td colspan="2" class="ar"><c:out value="${result.estAmt}"/>원
                    </td>
				</tr>
                <tr>
                    <th scope="row">시군비</th>
					<td class="ar"><c:out value="${result.citAmt}"/>원
                    </td>
                    <th scope="row" rowspan="2">계약내용</th>
                    <th scope="row">계약일자</th>
					<td><c:out value="${result.cttYmd}"/></td>
				</tr>
                <tr>
                    <th scope="row">기채</th>
					<td class="ar"><c:out value="${result.bndAmt}"/>원
                    </td>
                    <th scope="row">계약방법</th>
					<td><c:out value="${result.cttCdeNm}"/></td>
				</tr>
                <tr>
                    <th scope="row">양여금</th>
					<td class="ar"><c:out value="${result.cssAmt}"/>원
                    </td>
                    <th scope="row" rowspan="4">계약금액</th>
                    <th scope="row">순공사비</th>
					<td class="ar"><c:out value="${result.cpcAmt}"/>원
                    </td>
				</tr>
                <tr>
                    <th scope="row" rowspan="4">도급내용</th>
                    <th scope="row">회사명</th>
					<td><c:out value="${result.gcnNam}"/></td>
                    <th scope="row">관급금액</th>
					<td class="ar"><c:out value="${result.cgvAmt}"/>원
                    </td>
				</tr>
                <tr>
                    <th scope="row">대표자성명</th>
					<td><c:out value="${result.pocNam}"/></td>
                    <th scope="row">기타잡비</th>
					<td class="ar"><c:out value="${result.cetAmt}"/>원
                    </td>
				</tr>
                <tr>
                    <th scope="row">전화번호</th>
					<td><c:out value="${result.gcnTel}"/></td>
                    <th scope="row">총액</th>
					<td class="ar"><c:out value="${result.tctAmt}"/>원
                    </td>
				</tr>
                <tr>
                    <th scope="row">주소</th>
					<td colspan="4"><c:out value="${result.gcnAdr}"/></td>
				</tr>

                <tr>
					<th scope="row">착공일자</th>
					<td colspan="2"><c:out value="${result.begYmd}"/></td>
                    <th scope="row">준공예정일자</th>
					<td colspan="2"><c:out value="${result.fnsYmd}"/></td>
				</tr>  
                <tr>
					<th scope="row">실준공일자</th>
					<td colspan="2"><c:out value="${result.rfnYmd}"/></td>
                    <th scope="row">준공검사일자</th>
					<td colspan="2"><c:out value="${result.fchYmd}"/></td>
				</tr>  
                <tr>
					<th scope="row">감독자성명</th>
					<td colspan="2"><c:out value="${result.svsNam}"/></td>
                    <th scope="row">준공검사자성명</th>
					<td colspan="2"><c:out value="${result.fchNam}"/></td>
				</tr>  
                <tr>
					<th scope="row">공사개요</th>
					<td colspan="5" style="min-height:120px"><c:out value="${result.cntDes}"/></td>
				</tr>  
                <tr>
					<th scope="row">관급물량</th>
					<td colspan="5" style="min-height:120px"><c:out value="${result.gvrDes}"/></td>
				</tr> 
                <tr>
					<td colspan="6" class="brnone space"></td>
				</tr> 
				</table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장">
                <tr>
					<th scope="col" colspan="6" >공사비지급내역</th>
				</tr> 
                <tr>
					<th scope="col" >지급구분</th>
                    <th scope="col" >지급일자</th>
                    <th scope="col" colspan="4" >지급금액</th>
				</tr> 
				<c:forEach var="subdataCost" items="${rdtCostDtList}">
                <tr>
					<td class="lnone ac" scope="col"><c:out value="${subdataCost.ptyCdeNm}"/></td>
                    <td class="lnone ac" scope="col"><c:out value="${subdataCost.payYmd}"/></td>
                    <td class="lnone ar" scope="col" colspan="4" ><c:out value="${subdataCost.payAmt}"/></td>
				</tr> 
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtCostDtList) > 0 ?  fn:length(rdtCostDtList): 0}"  end="${fn:length(rdtCostDtList) > 12 ?  fn:length(rdtCostDtList): 12}">
					<tr>
						<td class="lnone" scope="col" style="min-height:22px"></td>
	                    <td class="lnone" scope="col"></td>
	                    <td class="lnone" scope="col" colspan="4"></td>
					</tr>
				</c:forEach>				
                <tr>
					<td colspan="6" class="brnone space"></td>
				</tr> 
                <tr>
					<th scope="col" colspan="6" >하자보수내역</th>
				</tr> 
                <tr>
					<th scope="col" >하자발생일자</th>
                    <th scope="col" >하자보수일자</th>
                    <th scope="col" colspan="4" >하자보수내용</th>
				</tr> 
				<c:forEach var="subdataFlaw" items="${rdtReprDtList}">
	                <tr>
						<td class="lnone ac"  scope="col" ><c:out value="${subdataFlaw.flaYmd}"/></td>
	                    <td class="lnone ac"  scope="col" ><c:out value="${subdataFlaw.rprYmd}"/></td>
	                    <td class="lnone al"   scope="col" colspan="4" ><c:out value="${subdataFlaw.rprDes}"/></td>
					</tr>
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtReprDtList) > 0 ?  fn:length(rdtReprDtList): 0}"  end="${fn:length(rdtReprDtList) > 12 ?  fn:length(rdtReprDtList): 12}">
					<tr>
						<td class="lnone"  scope="col" style="min-height:22px"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col" colspan="4"></td>
					</tr>
				</c:forEach>		
                <tr>
					<td colspan="6" class="brnone space"></td>
				</tr> 
				</table>
				<div style='page-break-before:always'></div> 
				<table class="tbprint" summary="대 장">
                <tr>
					<th scope="col" colspan="6" >설계변경내역</th>
				</tr> 
                <tr>
					<th scope="col" >변경일자</th>
                    <th scope="col" >증감금액</th>
                    <th scope="col" >증감관급금액</th>
                    <th scope="col" >변경공사총액</th>
                    <th scope="col" >변경사업량</th>
                    <th scope="col" >변경관급량</th>
				</tr> 
				<c:forEach var="subdataChng" items="${rdtChngDtList}">
	                <tr>
						<td class="lnone ac"  scope="col"><c:out value="${subdataChng.chgYmd}"/></td>
	                    <td class="lnone ar"  scope="col"><c:out value="${subdataChng.incAmt}"/></td>
	                    <td class="lnone ar"  scope="col"><c:out value="${subdataChng.igvAmt}"/></td>
	                    <td class="lnone ar"  scope="col"><c:out value="${subdataChng.chgAmt}"/></td>
	                    <td class="lnone"  scope="col"><c:out value="${subdataChng.chgDes}"/></td>
	                    <td class="lnone"  scope="col"><c:out value="${subdataChng.cgvDes}"/></td>
					</tr>
				</c:forEach>
				<c:forEach begin="${fn:length(rdtChngDtList) > 0 ?  fn:length(rdtChngDtList): 0}"  end="${fn:length(rdtChngDtList) > 12 ?  fn:length(rdtChngDtList): 12}">
					<tr>
						<td class="lnone"  scope="col" style="min-height:22px"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col"></td>
					</tr>
				</c:forEach>					
                <tr>
					<td colspan="6" class="brnone space"></td>
				</tr> 
                <tr>
					<th scope="col" colspan="6" >하도급내역</th>
				</tr> 
                <tr>
					<th scope="col" >하도급자</th>
                    <th scope="col" >하도급대표자</th>
                    <th scope="col" >전화번호</th>
                    <th scope="col" colspan="3" >주소</th>
				</tr> 
				<c:forEach var="subdataSubc" items="${rdtSubcDtList}">
	                <tr>
						<td class="lnone"  scope="col"><c:out value="${subdataSubc.subNam}"/></td>
	                    <td class="lnone"  scope="col"><c:out value="${subdataSubc.psbNam}"/></td>
	                    <td class="lnone"  scope="col"><c:out value="${subdataSubc.subTel}"/></td>
	                    <td class="lnone"  scope="col" colspan="3"><c:out value="${subdataSubc.subAdr}"/></td>
					</tr>
				</c:forEach>	
				<c:forEach begin="${fn:length(rdtSubcDtList) > 0 ?  fn:length(rdtSubcDtList): 0}"  end="${fn:length(rdtSubcDtList) > 10 ?  fn:length(rdtSubcDtList): 10}">
					<tr>
						<td class="lnone"  scope="col" style="min-height:22px"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col"></td>
	                    <td class="lnone"  scope="col" colspan="3"></td>
					</tr>
				</c:forEach>	
				 <tr>
					<td colspan="6" class="brnone space"></td>
				</tr> 			
			</tbody>
		</table>
		<div class="Btn_pd2"  id="divPrint" >
			<div class="Btn"><a href="#" class="Btn_02" onclick="fn_book_print()">인쇄</a></div>
			<div class="Btn"><a href="#" class="Btn_02" onClick="window.close()">닫기</a></div>
			<!-- <input type="image" name="btn_Print" id="btn_Print" onclick="fn_book_print()" src="/images/usolver/com/org/common/btn2_09.gif" alt="" align="AbsMiddle" border="0" style="border-style:None;" /> -->
		</div>
	</div>
	<!-- wrap end -->
</form>
</body>
</html>
