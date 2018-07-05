<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
						
			//달력
			BOOK.fn_create_datepicker("frm","REP_YMD" , 10);					
			BOOK.fn_init_formObject("frm");
			
			BOOK.fn_view_mode('frm');
			
			<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
				BOOK.fn_edit_mode('frm');
			</security:authorize>	
			
		});	
	
	</script>
</head>
<body>

<form id="frm" name="frm" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="openerId" name="openerId" value="<c:out value="${openerId}"/>"/>
<input type="hidden" id="nJDSKSubId" name="nJDSKSubId"  value="<c:out value="${nJDSKSubId}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="REP_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="REP_NUM" name="REP_NUM" value="<c:out value="${result.repNum}"/>"/>
<!--key//-->

		<div class="TxtBg">
			<dl>
				<dt>일련번호</dt>
				<dd><c:out value="${result.repNum}"/></dd>
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
							<th>구분</th>
							<td><select name="REP_CDE" id="REP_CDE">
		                    	<c:forEach var="selectData" items="${rep_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.repCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
						</tr>
						<tr>
							<th>일자</th>
							<td><input type="text" name="REP_YMD" id="REP_YMD" value="<c:out value="${result.repYmd}"/>" class="input DT_DATE" /></td>
						</tr>
						<tr>
							<th>사유</th>
							<td><select name="SBJ_CDE" id="SBJ_CDE" class="select">
		                    	<c:forEach var="selectData" items="${sbj_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sbjCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
						</tr>
						<tr>
							<th>시공자명</th>
							<td><input type="text" name="OPR_NAM" id="OPR_NAM"  style="width:200px" value="<c:out value="${result.oprNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>내용</th>
							<td><input type="text" name="REP_DES" id="REP_DES" value="<c:out value="${result.repDes}"/>" class="MX_500 CS_500" style="width: 95%" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>	
			<div class="Btn_pd2">
				<security:authorize ifAnyGranted ="ROLE_SEWER_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>')">닫기</a></div>
			</div>
	</div>
</form>
</body>
</html>