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
  * @Description :   WTT_META_HT  계량기 교체이력
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
			
			<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
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
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="CHG_NUM"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="CHG_NUM" name="CHG_NUM" value="<c:out value="${result.chgNum}"/>"/>

		<div class="TxtBg">
			<dl>
				<dt>교체일련번호</dt>
				<dd><c:out value="${result.chgNum}"/></dd>
			</dl>
		</div>
		<div class="PSection3">
			<div class="Table_LBx">
				<div class="Table_left">
					<table>
						<colgroup>
							<col width="35%" />
							<col width="70%" />
							<col width="35%" />
							<col width="70%" />
						</colgroup>
						<tr>
							<th>교체구분</th>
							<td><select name="GCW_CDE" id="GCW_CDE"  class="select" >
									<option value=""></option>
									<c:forEach var="selectData" items="${gcw_cde_list}">
									<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.gcwCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
									</c:forEach>
								</select></td>
							<th>교체일자</th>
							<td><input type="text" name="CHG_YMD" id="CHG_YMD" value="<c:out value="${result.chgYmd}"/>" class="input DT_DATE" /></td>
						</tr>
						<tr>
							<th>교체사유</th>
							<td><select name="CRS_CDE" id="CRS_CDE"  class="select" >
									<option value=""></option>
									<c:forEach var="selectData" items="${crs_cde_list}">
									<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.crsCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
									</c:forEach>
								</select></td>
							<th>철거계량기기물번호</th>
							<td><input type="text" name="OME_NUM" id="OME_NUM" value="<c:out value="${result.omeNum}"/>" class="input MX_14 CS_14" /></td>
						</tr>
						<tr>
							<th>철거계량기구경</th>
							<td><input type="text" name="OME_DIP" id="OME_DIP" value="<c:out value="${result.omeDip}"/>" class="input MX_4 CS_4 DT_INT DD_0" /> mm</td>
							<th>철거계량기형식</th>
							<td><select name="OME_MOF" id="OME_MOF"  class="select" >
									<option value=""></option>
									<c:forEach var="selectData" items="${ome_mof_list}">
									<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.omeMof}"> selected="selected" </c:if> >${selectData.VAL}</option>
									</c:forEach>
								</select></td>
						</tr>
						<tr>
							<th>철거계량기지침수</th>
							<td><input type="text" name="OME_CNT" id="OME_CNT" value="<c:out value="${result.omeCnt}"/>" class="input MX_7 CS_7 DT_INT DD_0" /></td>
							<th>교체자명</th>
							<td><input type="text" name="CHG_NAM" id="CHG_NAM" value="<c:out value="${result.chgNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>철거계량기제작회사</th>
							<td colspan="3"><input type="text" name="OME_NAM" id="OME_NAM" value="<c:out value="${result.omeNam}"/>" class="input MX_20 CS_20" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>	
			<div class="Btn_pd2">
				<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridAddInfo('<c:out value="${tablename}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">닫기</a></div>
			</div>
	</div>
</form>
</body>
</html>