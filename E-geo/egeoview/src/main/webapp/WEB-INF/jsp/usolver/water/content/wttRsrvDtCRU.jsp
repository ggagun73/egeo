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
  * @Description :    WTT_RSRV_DT   저수조 세부시설현황
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
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="ATT_IDN"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="FID" name="FID" value="<c:out value="${result.g2Id}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${result.ftrIdn}"/>"/>
<input type="hidden" id="ATT_IDN" name="ATT_IDN" value="<c:out value="${result.attIdn}"/>"/>	

		<div class="TxtBg">
			<dl>
				<dt>세부시설번호</dt>
				<dd><c:out value="${result.attIdn}"/></dd>
			</dl>
		</div>
		<div class="PSection3">
			<div class="Table_LBx">
				<div class="Table_left">
					<table>
						<colgroup>
							<col width="40%" />
							<col width="70%" />
							<col width="40%" />
							<col width="70%" />
						</colgroup>
						<tr>
							<th>저수조 위치</th>
							<td><select name="OUG_CDE" id="OUG_CDE">
		                    	<c:forEach var="selectData" items="${oug_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.ougCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
							<th>재질</th>
							<td><select name="RSR_MOP" id="RSR_MOP" class="select">
		                    	<c:forEach var="selectData" items="${rsr_mop_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.rsrMop}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
						</tr>
						<tr>
							<th>저수조 개소수</th>
							<td><input type="text" name="RSR_CNT" id="RSR_CNT"  style="width:180px" value="<c:out value="${result.rsrCnt}"/>" class="input MX_2 CS_2 DT_INT DD_0" /></td>
							<th>저수조 용량</th>
							<td><input type="text" name="RSR_VOL" id="RSR_VOL"  style="width:180px" value="<c:out value="${result.rsrVol}"/>" class="input MX_8 CS_8 DT_INT DD_0" /> (톤)</td>
						</tr>
						<tr>
							<th>저수조 규격</th>
							<td colspan="3"><input type="text" name="RSR_STD" id="RSR_STD"  style="width:180px" value="<c:out value="${result.rsrStd}"/>" class="input MX_20 CS_20" /></td>
						</tr>
						<tr>
							<th>저수조 용도</th>
							<td><select name="SAC_CDE" id="SAC_CDE">
		                    	<c:forEach var="selectData" items="${sac_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.sacCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
							<th>맨홀 개소수</th>
							<td><input type="text" name="MAN_CNT" id="MAN_CNT" style="width:180px" value="<c:out value="${result.manCnt}"/>" class="input MX_2 CS_2 DT_INT DD_0" style="width: 95%" /></td>
						</tr>
						<tr>
							<th>맨홀 규격</th>
							<td><input type="text" name="MAN_STD" id="MAN_STD"  style="width:180px" value="<c:out value="${result.manStd}"/>" class="input MX_20 CS_20" /></td>
							<th>맨홀 설치위치</th>
							<td><input type="text" name="MAN_LOC" id="MAN_LOC"  style="width:180px" value="<c:out value="${result.manLoc}"/>" class="input MX_50 CS_50" /></td>
						</tr>
						<tr>
							<th>침전물 배출구여부</th>
							<td><select name="DCW_CDE" id="DCW_CDE">
		                    	<c:forEach var="selectData" items="${dcw_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.dcwCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
							<th>침전물 배출구위치</th>
							<td><input type="text" name="DCW_LOC" id="DCW_LOC" style="width:180px" value="<c:out value="${result.dcwLoc}"/>" class="MX_50 CS_50" style="width: 95%" /></td>
						</tr>
						<tr>
							<th>유입/배출구 시설현황</th>
							<td colspan="3"><input type="text" name="IOH_EXP" id="IOH_EXP" style="width:180px" value="<c:out value="${result.iohExp}"/>" class="input MX_50 CS_50" /></td>
						</tr>
						<tr>
							<th>월류관 규격</th>
							<td><input type="text" name="WOL_STD" id="WOL_STD"  style="width:180px" value="<c:out value="${result.wolStd}"/>" class="input MX_20 CS_20" /> mm</td>
							<th>월류관 위치</th>
							<td><input type="text" name="WOL_LOC" id="WOL_LOC"  style="width:180px" value="<c:out value="${result.wolLoc}"/>" class="input MX_50 CS_50" /></td>
						</tr>
						<tr>
							<th>통기관 규격</th>
							<td><input type="text" name="TOG_STD" id="TOG_STD"  style="width:180px" value="<c:out value="${result.togStd}"/>" class="input MX_20 CS_20" /> mm</td>
							<th>통기관 위치</th>
							<td><input type="text" name="TOG_LOC" id="TOG_LOC"  style="width:180px" value="<c:out value="${result.togLoc}"/>" class="input MX_50 CS_50" /></td>
						</tr>
						<tr>
							<th>만수/감수 경보장치여부</th>
							<td><select name="LHW_CDE" id="LHW_CDE">
		                    	<c:forEach var="selectData" items="${lhw_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.lhwCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
							<th>수조구획여부</th>
							<td><select name="TNK_CDE" id="TNK_CDE" class="select">
		                    	<c:forEach var="selectData" items="${tnk_cde_list}">
								<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.tnkCde}"> selected="selected" </c:if> >${selectData.VAL}</option>
								</c:forEach>
		                    </select></td>
						</tr>
						<tr>
							<th>만수/감수 경보장치위치</th>
							<td><input type="text" name="LHW_LOC" id="LHW_LOC"  style="width:180px" value="<c:out value="${result.lhwLoc}"/>" class="input MX_50 CS_50" /></td>
							<th>기타설명</th>
							<td><input type="text" name="ETC_EXP" id="ETC_EXP"  style="width:180px" value="<c:out value="${result.etcExp}"/>" class="input MX_50 CS_50" /></td>
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