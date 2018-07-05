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
  * @Description : 
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
			BOOK.fn_create_datepicker("frm","FLA_YMD",10);
			BOOK.fn_create_datepicker("frm","RPR_YMD",10);
			
			BOOK.fn_init_formObject("frm");
			BOOK.fn_view_mode('frm');
			
			<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
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
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="RPR_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="CNT_NUM" name="CNT_NUM" value="<c:out value="${result.cntNum}"/>"/>
<input type="hidden" id="RPR_NUM" name="RPR_NUM" value="<c:out value="${result.rprNum}"/>"/>
<div class="TxtBg">
	<dl>
		<dt>하자보수일련번호</dt>
		<dd><c:out value="${result.rprNum}"/></dd>
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
				</colgroup>
				<tr>
					<th>하자발생일자</th>
					<td><input type="text" name="FLA_YMD" id="FLA_YMD"  value="<c:out value="${result.flaYmd}"/>" class="input DT_DATE" /></td>							
				</tr>
				<tr>
					<th>하자보수일자</th>
					<td><input type="text" name="RPR_YMD" id="RPR_YMD" value="<c:out value="${result.rprYmd}"/>" class="input DT_DATE" /></td>
				</tr>
				<tr>
					<th>하자보수내용</th>
					<td><input type="text" name="RPR_DES" id="RPR_DES"  style="width:200px" value="<c:out value="${result.rprDes}"/>" class="input MX_100 CS_100" /></td>
				</tr>
			</table>
		</div>
	</div>
	<div class="btnTline"><!--버튼구분자--></div>		
	<div class="Btn_pd2">
		<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
		<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${TABLENAME}"/>')">저장</a></div>
		</security:authorize>
		<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>')">닫기</a></div>
	</div>
</div>
</form>
</body>
</html>