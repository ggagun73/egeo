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
  * @Description :  유지보수 RDT_PRSV_DT
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
			BOOK.fn_create_datepicker("frm","SRE_YMD" , 10);					
			BOOK.fn_create_datepicker("frm","ERE_YMD" , 10);					
			BOOK.fn_init_formObject("frm");
			
			BOOK.fn_view_mode('frm');
			
			<security:authorize ifAnyGranted ="ROLE_ROAD_BOOK_EDIT" >
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
<!-- 보수일괄 일 때 지형지물부호가 여러건 일 경우 -->
<c:if test="${ not empty ftrcdeList }">
	<c:forEach varStatus="st" begin="0" end="${fn:length(ftrcdeList) - 1}">
		<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${ftrcdeList[st.index]}"/>"/>
	</c:forEach>
</c:if>

<c:if test="${ empty ftrcdeList }">
	<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
</c:if>
<!-- 보수일괄 일 경우 -->
<c:if test="${ not empty maxIdList }">
	<c:forEach varStatus="st" begin="0" end="${fn:length(maxIdList) - 1}">
		<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${ftridnList[st.index]}"/>"/>
		<input type="hidden" id="REP_NUM" name="REP_NUM" value="<c:out value="${maxIdList[st.index]}"/>"/>
	</c:forEach>
</c:if>
<c:if test="${empty maxIdList }">
	<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
	<input type="hidden" id="REP_NUM" name="REP_NUM" value="<c:out value="${result.repNum}"/>"/>
</c:if>
		<div class="TxtBg">
			<dl>
				<dt>유지보수일련번호</dt>
				<dd><c:out value="${result.REP_NUM}"/></dd>
			</dl>
		</div>
		<div class="PSection3">
			<div class="Table_LBx">
				<div class="Table_left">
					<table>
						<colgroup>
							<col width="19%" />
							<col width="31%" />
							<col width="19%" />
							<col width="31%" />
						</colgroup>
						<tr>
							<tr>
							<th>보수시작일자</th>
							<td><input type="text" name="SRE_YMD" id="SRE_YMD" value="<c:out value="${result.sreYmd}"/>" class="input DT_DATE" /></td>
							<th>보수종료일자</th>
							<td><input type="text" name="ERE_YMD" id="ERE_YMD" value="<c:out value="${result.ereYmd}"/>" class="input DT_DATE" /></td>
						</tr>
						<tr>
							<th>관리기관</th>
							<td><select name="MNG_CDE" id="MNG_CDE" class="select">
		                    	<c:forEach var="selectData" items="${mng_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.mngCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
							<th>공사번호</th>
							<td><input type="text" name="CNT_NUM" id="CNT_NUM" value="<c:out value="${result.cntNum}"/>" class="input CS_10" />
                        		<a href="#" onclick="BOOK.fn_open_searchNum('RDT_CONS_MA','CNT_NUM')"><img src="/images/usolver/com/book/btn_search.gif" border="0" class="vmiddle btnClassEdit"/></a>
                        		<a href="#" onclick="BOOK.fn_del_searchNum('CNT_NUM');"><img src="/images/usolver/com/book/btn_search_del.gif" border="0" class="vmiddle btnClassEdit"/></a>
                        	</td>
						</tr>
						<tr>
							<th>유지보수사유</th>
							<td colspan="3"><textarea id="RER_DES"  name="RER_DES"  class="MX_100 CS_100" cols="70" rows="3"><c:out value="${result.rerDes}"/></textarea></td>
						</tr>
						<tr>
							<th>유지보수내용</th>
							<td colspan="3"><textarea id="REP_DES"  name="REP_DES"  class="MX_100 CS_100" cols="70" rows="3"><c:out value="${result.repDes}"/></textarea></td>
						</tr>						
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>	
			<div class="Btn_pd2">
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_view_subRegister('RDT_CONS_MA','CNT_NUM')">공사대장</a></div>
				<security:authorize ifAllGranted ="ROLE_ROAD_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>')">닫기</a></div>
			</div>
	</div>
</form>
</body>
</html>