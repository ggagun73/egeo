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
<body MS_POSITIONING="FlowLayout" onLoad="fn_resize_heightWindow();">
<form name="Form1" method="post" id="Form1">
	<div id="form_wrap">
        <h1>도 로 노 선 대 장</h1>
        <table class="tbprint" summary="대 장">
			<caption>도로노선대장</caption>
			<colgroup>
				<col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" />
				<col width="6.25%"" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" /><col width="6.25%" />
			</colgroup>
			<tbody>
				<tr>
					<th colspan="2" scope="row">노선번호</th>
					<td colspan="2"><c:out value="${result.rutIdn}"/></td>
                    <td colspan="8" class="abrnone"></td>
                    <th colspan="2" scope="row">관리기관</th>
					<td colspan="2"><c:out value="${result.mngCdeNm}"/></td>
				</tr> 
                <tr>
					<th colspan="2" scope="row">도로종류</th>
					<td colspan="6"><c:out value="${result.adaCde}"/></td>
					<th colspan="2" scope="row">노선명</th>
					<td colspan="6"><c:out value="${result.rutNam}"/></td>
				</tr> 
                <tr>
					<th colspan="2" scope="row">관리자</th>
					<td colspan="6"><c:out value="${result.mngNam}"/></td>
					<th colspan="2" scope="row">도로기능</th>
					<td colspan="6"><c:out value="${result.fncCdeNm}"/></td>
				</tr> 
                <tr>
					<th colspan="4" scope="row">노선 지정(인정) 연월일자</th>
					<td colspan="4"><c:out value="${result.apdYmd}"/></td>
					<th colspan="4" scope="row">지적고시 연월일자</th>
					<td colspan="4"><c:out value="${result.entYmd}"/></td>
				</tr> 
				<tr>
					<th rowspan="2" scope="row">위치</th>
					<th scope="row">시점</th>
					<td colspan="6"><c:out value="${result.begLoc}"/></td>
					<th rowspan="2" colspan="2" scope="row">주요경과지</th>
					<td rowspan="2" colspan="6"><c:out value="${result.impLoc}"/></td>
				</tr> 
				<tr>
					<th scope="row">종점</th>
					<td colspan="6"><c:out value="${result.endLoc}"/></td>
				</tr>
				 <tr>
					<th colspan="2" scope="row">노선연장</th>
					<td colspan="2"><c:out value="${result.rutLen}"/>m</td>
					<th colspan="2" scope="row">전용연장</th>
					<td colspan="2"><c:out value="${result.rusLen}"/>m</td>
					<th colspan="2" scope="row">중용연장</th>
					<td colspan="2"><c:out value="${result.rujLen}"/>m</td>
					<th colspan="2" scope="row">총면적</th>
					<td colspan="2"><c:out value="${result.rutAra}"/>㎡</td>
				</tr>  
				<tr>
					<th colspan="6" scope="row">터널</th>
					<th colspan="4" scope="row">교량</th>
					<th colspan="6" scope="row">중앙분리대</th>
				</tr> 
				<tr>
					<td colspan="3"><c:out value="${result.trnNum}"/>개</td>
					<td colspan="3"><c:out value="${result.trnLen}"/>m</td>
					<td colspan="2"><c:out value="${result.brgNum}"/>개</td>
					<td colspan="2"><c:out value="${result.brgLen}"/>m</td>
					<td colspan="3"><c:out value="${result.rdgNum}"/>개</td>
					<td colspan="3"><c:out value="${result.rdgLen}"/>m</td>
				</tr>  
				<tr>
					<th colspan="6" scope="row">차도폭원</th>
					<th colspan="4" scope="row">보도폭원</th>
					<th colspan="6" scope="row">차로수</th>
				</tr> 
				<tr>
					<th colspan="2" scope="row">최소</th>
					<th colspan="2" scope="row">최대</th>
					<th colspan="2" scope="row">최소</th>
					<th colspan="2" scope="row">최대</th>
					<th colspan="2" scope="row">2차로미만</th>
					<th colspan="2" scope="row">2~4차로미만</th>
					<th colspan="2" scope="row">4~6차로미만</th>
					<th colspan="2" scope="row">6차로이상</th>
				</tr> 
				<tr>
					<td colspan="2"><c:out value="${result.micWid}"/>m</td>
					<td colspan="2"><c:out value="${result.macWid}"/>m</td>
					<td colspan="2"><c:out value="${result.mibWid}"/>m</td>
					<td colspan="2"><c:out value="${result.mabWid}"/>m</td>
					<td colspan="2"><c:out value="${result.fnmLen}"/>m</td>
					<td colspan="2"><c:out value="${result.snmLen}"/>m</td>
					<td colspan="2"><c:out value="${result.tnmLen}"/>m</td>
					<td colspan="2"><c:out value="${result.unmLen}"/>m</td>
				</tr>  
				<tr>
					<th colspan="4" scope="row">도로폭원</th>
					<th colspan="4" scope="row">차도</th>
					<th colspan="6" scope="row">보도</th>
					<th rowspan="2" colspan="2" scope="row">자전거도로</th>
				</tr> 
				<tr>
					<th rowspan="2" colspan="2" scope="row">최소</th>
					<th rowspan="2" colspan="2" scope="row">최대</th>
					<th rowspan="2" scope="row">계</th>
					<th rowspan="2" scope="row">아스팔트</th>
					<th rowspan="2" scope="row">콘크리트</th>
					<th rowspan="2" scope="row">비포장</th>
					<th colspan="2" scope="row">계</th>
					<th colspan="2" scope="row">포장</th>
					<th colspan="2" scope="row">비포장</th>
				</tr> 
				<tr>
					<th scope="row">좌</th>
					<th scope="row">우</th>
					<th scope="row">좌</th>
					<th scope="row">우</th>
					<th scope="row">좌</th>
					<th scope="row">우</th>
					<th scope="row">좌</th>
					<th scope="row">우</th>
				</tr>
				<tr>
					<td colspan="2"><c:out value="${result.mirWid}"/>m</td>
					<td colspan="2"><c:out value="${result.marWid}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
					<td><c:out value="${result.ftrCdeNm}"/>m</td>
				</tr>
				<tr>
					<th colspan="6" scope="row">광장</th>
					<th colspan="4" scope="row">낙석방지시설</th>
					<th colspan="6" scope="row">곡선반경</th>
				</tr> 
				<tr>
					<th colspan="2" scope="row">개소</th>
					<th colspan="2" scope="row">연장</th>
					<th colspan="2" scope="row">개소</th>
					<th colspan="2" scope="row">연장</th>
					<th colspan="2" scope="row">100m미만</th>
					<th colspan="2" scope="row">100-150m미만</th>
					<th colspan="2" scope="row">150-200m미만</th>
					<th colspan="2" scope="row">200m 이상</th>
				</tr> 
				<tr>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>m</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>m</td>
					<td colspan="2"><c:out value="${result.fmnCnt}"/>개</td>
					<td colspan="2"><c:out value="${result.smnCnt}"/>개</td>
					<td colspan="2"><c:out value="${result.tmnCnt}"/>개</td>
					<td colspan="2"><c:out value="${result.umnCnt}"/>개</td>
				</tr>  
				<tr>
					<th colspan="8" scope="row">교차</th>
					<th colspan="8" scope="row">종단구배</th>
				</tr> 
				<tr>
					<th rowspan="2" colspan="2" scope="row">육교</th>
					<th rowspan="2" colspan="2" scope="row">지하도</th>
					<th colspan="2" scope="row">철도</th>
					<th colspan="2" scope="row">도로</th>
					<th rowspan="2" colspan="2" scope="row">3%미만</th>
					<th rowspan="2" colspan="2" scope="row">3~5%미만</th>
					<th rowspan="2" colspan="2" scope="row">5~10%미만</th>
					<th rowspan="2" colspan="2" scope="row">10%이상</th>
				</tr>
				<tr>
					<th scope="row">과선</th>
					<th scope="row">과도</th>
					<th scope="row">평면</th>
					<th scope="row">입체</th>
				</tr>  
				<tr>
					<td colspan="2"><c:out value="${result.pdsNum}"/>개</td>
					<td colspan="2"><c:out value="${result.smaNum}"/>개</td>
					<td><c:out value="${result.ftrCdeNm}"/>개</td>
					<td><c:out value="${result.ftrCdeNm}"/>개</td>
					<td><c:out value="${result.ftrCdeNm}"/>개</td>
					<td><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.fgbCnt}"/>개</td>
					<td colspan="2"><c:out value="${result.sgbCnt}"/>개</td>
					<td colspan="2"><c:out value="${result.tgbCnt}"/>개</td>
					<td colspan="2"><c:out value="${result.ugbCnt}"/>개</td>
				</tr> 
				<tr>
					<th colspan="6" scope="row">표지</th>
					<th colspan="12" scope="row">교량</th>
				</tr>  
				<tr>
					<th scope="row">종류</th>
					<th scope="row">분류</th>
					<th colspan="2" scope="row">좌</th>
					<th colspan="2" scope="row">우</th>
					<th colspan="2" scope="row">강교</th>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>m</td>
				</tr>  
				<tr>
					<th rowspan="5" scope="row">도로안내</th>
					<th scope="row">방향</th>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<th colspan="2" scope="row">철근콘크리트교</th>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>m</td>
				</tr>  
				<tr>
					<th scope="row">이정</th>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<th colspan="2" scope="row">혼성교</th>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>m</td>
				</tr>  
				<tr>
					<th scope="row">경계</th>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<th colspan="2" scope="row">기타</th>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="4"><c:out value="${result.ftrCdeNm}"/>m</td>
				</tr>  
				<tr>
					<th scope="row">노선</th>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<th colspan="2" rowspan="2" scope="row">계</th>
					<td colspan="4" rowspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="4" rowspan="2"><c:out value="${result.ftrCdeNm}"/>m</td>
				</tr>  
				<tr>
					<th scope="row">기타</th>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
				</tr>
				<tr>
					<th rowspan="2" scope="row">교통안전</th>
					<th colspan="3" scope="row">규제</th>
					<th colspan="4" scope="row">주의</th>
					<th colspan="4" scope="row">지시</th>
					<th colspan="4" scope="row">기타</th>
				</tr>   
				<tr>
					<td><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
					<td colspan="2"><c:out value="${result.ftrCdeNm}"/>개</td>
				</tr>
                <tr>
					<td colspan="16" class="brnone space"></td>
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
