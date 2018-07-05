<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
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
		$(document).ready(function() {
			
			// input 항목 초기화
			BOOK.fn_init_formObject("frm_imge");
			
			// 4) 검색 목록 그리드 구성
			BOOK.fn_get_ImgeGrid("${FTR_CDE}", "${FTR_IDN}", "${CNT_NUM}", "${tableName}");
		});
	</script>
</head>
<body> 
<form id="frm_imge" name="frm_imge" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value='<c:out value="${action_flag}"/>' /> 
<input type="hidden"	id="screen_mode" name="screen_mode" value="" /> 
<input type="hidden" id="callBackFunction" name="callBackFunction" value="" /> 
<input type="hidden" id="nJDSKSubId" name="nJDSKSubId" value='<c:out value="${nJDSKSubId}"/>' /><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value='<c:out value="${CALL_TYPE}"/>' /><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="IMG_IDN" name="IMG_IDN" value="<c:out value="${IMG_IDN}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${FTR_CDE}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${FTR_IDN}"/>"/>
<input type="hidden" id="CNT_NUM" name="CNT_NUM" value="<c:out value="${CNT_NUM}"/>"/>
<!--key//-->

<div id="wrap2">
	<div id="container2">
		<div id="content2">
				<!-- Section1 -->
			<div class="PSection3" style="padding-top: 15px;">
				<div class="TableBx" style="height: 200px;">
					<div class="Table_list2" style="height: 200px;">
						<table id="gridImge"></table>
					</div>
				</div>
				<div class="Btn_R">
					<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT,ROLE_SEWER_BOOK_EDIT,ROLE_ROAD_BOOK_EDIT" >
					<div class="Btn"><a href="#" class="Btn_03" onClick='BOOK.fn_open_gridAddInfo("${tableName}", "INSERT");'>추가</a></div>
					<div class="Btn"><a href="#" class="Btn_03" onClick='BOOK.fn_open_gridAddInfo("${tableName}", "UPDATE");'>수정</a></div>
					<div class="BtnR"><a href="#" class="Btn_03" onClick='BOOK.fn_delete_gridImge("${tableName}");'>삭제</a></div>
					</security:authorize>
				</div>
				<div class="graylinebx FL" style="height:230px;">
					<div id="image_area" ></div>
				</div>
				<div class="btnTline"><!--버튼구분자--></div>					
				<div class="Btn_R">
					<div class="BtnR"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window();">닫기</a></div>
				</div>
			</div>
		</div>
	</div>
</div>
</form>
</body>
</html>
