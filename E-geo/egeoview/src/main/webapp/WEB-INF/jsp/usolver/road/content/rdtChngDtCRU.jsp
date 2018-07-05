<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : 
  * @Description :  RDT_CHNG_DT  설계변경내역
  * @Modification Information
  * 
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 지노
  * since 2014.07.10
  *  
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<script type="text/javascript">
		// 페이지 로딩 초기 설정
		$( document ).ready(function() {
			
			//달력
			BOOK.fn_create_datepicker("frm","CHG_YMD" , 10);			
			BOOK.fn_init_formObject("frm");
			BOOK.fn_view_mode('frm');
			
			<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
				BOOK.fn_edit_mode('frm');
			</security:authorize>
			
			if( '<c:out value="${action_flag}"/>' === 'INSERT' ){
				$('.activeWindow').find('.disInsert').hide(); 
				$('.activeWindow').find('.visInsert').show(); 
			}else {
				$('.activeWindow').find('.disInsert').show(); 
				$('.activeWindow').find('.visInsert').hide(); 
			}
		});
	</script>
</head>
<body>
<form id="frm" name="frm" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="openerId" name="openerId" value="<c:out value="${openerId}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${tablename}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="CHG_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="CNT_NUM" name="CNT_NUM" value="<c:out value="${result.cntNum}"/>"/>
<input type="hidden" id="CHG_NUM" name="CHG_NUM" value="<c:out value="${result.chgNum}"/>"/>
<!--key//-->
		<div class="TxtBg">
			<dl class="disInsert">
				<dt>변경일련번호</dt>
				<dd><c:out value="${result.chgNum}" /></dd>
			</dl>
			<dl class="visInsert">
				<dt>공사번호</dt>
				<dd><c:out value="${result.cntNum}" /></dd>
			</dl>
		</div>
		<div class="PSection3">
			<div class="Table_LBx">
				<div class="Table_left">
					<table>
						<colgroup>
							<col width="30%" />
							<col width="70%" />
							<col width="30%" />
							<col width="70%" />
						</colgroup>
						<tr>
							<th>변경일자</th>
							<td><input type="text" name="CHG_YMD" id="CHG_YMD" value="<c:out value="${result.chgYmd}"/>" class="input DT_DATE" /></td>
							<th>증감금액</th>
							<td><input type="text" name="INC_AMT" id="INC_AMT" value="<c:out value="${result.incAmt}"/>" class="input MX_11 CS_11 DT_INT DD_0" /> 원</td>
						</tr>
						<tr>
							<th>증감관급금액</th>
							<td><input type="text" name="IGV_AMT" id="IGV_AMT" value="<c:out value="${result.igvAmt}"/>" class="input MX_11 CS_11 DT_INT DD_0" /> 원</td>
							<th>변경공사총액</th>
							<td><input type="text" name="CHG_AMT" id="CHG_AMT" value="<c:out value="${result.chgAmt}"/>" class="input MX_11 CS_11 DT_INT DD_0" /> 원</td>
						</tr>
						<tr>
							<th>변경사업량</th>
							<td colspan="3"><input type="text"  style="width:400px" name="CHG_DES" id="CHG_DES" value="<c:out value="${result.chgDes}"/>" class="input MX_500 CS_500" /></td>
						</tr>
						<tr>
							<th>변경관급량</th>
							<td colspan="3"><input type="text" style="width:400px" name="CGV_DES" id="CGV_DES" value="<c:out value="${result.cgvDes}"/>" class="input MX_500 CS_500" /></td>
						</tr>
						<tr>
							<th>설계변경사유</th>
							<td colspan="3"><input type="text" name="CHR_DES" id="CHR_DES"  style="width:400px" value="<c:out value="${result.chrDes}"/>" class="input MX_100 CS_100" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>		
			<div class="Btn_pd2">
				<security:authorize ifAllGranted ="ROLE_ROAD_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>')">닫기</a></div>
			</div>
		</div>
</form>
</body>
</html>
