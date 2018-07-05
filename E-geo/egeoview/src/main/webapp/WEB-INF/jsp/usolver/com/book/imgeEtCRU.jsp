<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : 
  * @Description : 
  * @Modification Information
  * 
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2014.07.24            최초 생성
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
	<validator:javascript formName="wttImgeEtVO" staticJavascript="false" xhtml="true" cdata="false"/>

	<script type="text/javascript">
		// 페이지 로딩 초기 설정
		$( document ).ready(function() {
			
			BOOK.fn_init_formObject("frm");
			//edit mode
			BOOK.fn_edit_mode('frm');
			
			// 포커스 IN
			$("#IMG_NAM").focus();
			
			$("#FLE_NAM").change(function(){
					 
				  var file = document.getElementById("FLE_NAM").files[0];			
				  //$('#IMG_IMG').val(file.name);
				  
				  if (file == undefined) {
					  $('#prevImg').attr('src','');
				  } else {
					  var readImg = new FileReader();
					  readImg.readAsDataURL(file);
					  readImg.onload = function(e) {
						  if (e.target.result.indexOf("image") >= 0) {
							  $('#prevImg').attr('src',e.target.result).fadeIn();
							  
							  var image = new Image();
							  image.src = e.target.result;
							  
							  image.onload = function() {
								  $('#VER_LEN').val(  this.height );
								  $('#HOR_LEN').val( this.width );
							  };  
						  } else {
							  $('#prevImg').attr('src','');
						  }
					   };
				  }
			  });

			<c:if test = "${!empty result.fleNam}">
				  $('#prevImg').css('display','');
			</c:if>
		});

		// 이미지 미리보기
		function fnImagePreview(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
	</script>
</head>
<body>
<form id="frm" name="frm" method="post" action="" enctype="multipart/form-data">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="openerId" name="openerId" value="<c:out value="${openerId}"/>"/>
<input type="hidden" id="TABLENAME" name="TABLENAME" value="<c:out value="${TABLENAME}"/>"/>
<input type="hidden" id="KEY_COLUMN" name="KEY_COLUMN"  value="IMG_IDN"/>
<!-- 필수 파라메터(END) -->
<!--key//-->
<input type="hidden" id="IMG_IDN" name="IMG_IDN" value="<c:out value="${result.imgIdn}"/>"/>
<input type="hidden" id="FTR_CDE" name="FTR_CDE" value="<c:out value="${empty result.ftrCde? FTR_CDE:result.ftrCde}"/>"/>
<input type="hidden" id="FTR_IDN" name="FTR_IDN" value="<c:out value="${empty result.ftrIdn? FTR_IDN:result.ftrIdn}"/>"/>
<input type="hidden" id="CNT_NUM" name="CNT_NUM" value="<c:out value="${empty result.cntNum? CNT_NUM:result.cntNum}"/>"/>
<input type="hidden" id="TYP_NAM" name="TYP_NAM" value=""/>
		<div class="TxtBg">
			<dl>
				<dt>도면사진관리번호</dt>
				<dd> 
					<c:out value="${result.imgIdn}" />
				</dd>	
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
							<th>도면/사진구분</th>
							<td>
								<c:choose>
									<%-- <c:set var="table" value="${TABLENAME}" /> --%>
									<c:when test = "${fn:substring(TABLENAME, 0, 3) ne 'RDT'}">
										<select name="CTT_CDE" id="CTT_CDE" class="select">
											<c:forEach var="selectData" items="${ctt_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.cttCde}"> selected="selected" </c:if>>${selectData.VAL}</option>
											</c:forEach>
										</select>
									</c:when>
									<c:otherwise>
										<select name="DSP_CDE" id="DSP_CDE" class="select">
											<c:forEach var="selectData" items="${dsp_cde_list}">
												<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == result.dspCde}"> selected="selected" </c:if>>${selectData.VAL}</option>
											</c:forEach>
										</select>
									</c:otherwise>
								</c:choose>
							</td>
						</tr>
						<tr>
							<th>도면/사진명</th>
							<td><input type="text" name="IMG_NAM" id="IMG_NAM" value="<c:out value="${result.imgNam}"/>" class="input MX_50 CS_10" /></td>
						</tr>
						<tr>
							<th>파일명</th>
							<td>
								<c:if test = "${!empty result.fleNam}">
									<a href="#"  onClick="BOOK.fn_download_file('<c:out value="${TABLENAME}"/>', '<c:out value="${result.fleNam}"/>');"><c:out value="${result.fleNam}"/></a>
									<br/>
									<input type="hidden" name="FLE_NAM" id="FLE_NAM" value='<c:out value="${result.fleNam}"/>'  class="MX_50 CS_10" />
								</c:if>
								<c:if test = "${empty result.fleNam}">
								<input type="file" name="FLE_NAM" id="FLE_NAM" value=''  class="MX_50 CS_10" />
								</c:if>
							</td>
						</tr>
						<tr>
							<th>도면사진 설명</th>
							<td><input type="text" name="IMG_EXP" id="IMG_EXP" style="width:300px" value="<c:out value="${result.imgExp}"/>" class="input MX_100 CS_40" /></td>
						</tr>
					</table>
				</div>
			</div>
			<div id="divImg" style="width: 550px; height:456px;">
		   		<img id="prevImg" src="<c:if test = "${!empty result.fleNam}">/filestorage/<c:out value="${TABLENAME}"/>/<c:out value="${result.fleNam}"/></c:if>" style="width: 550px;height:280px;display: none;">
			</div>
			<div class="btnTline"><!--버튼구분자--></div>		
			<div class="Btn_pd2">
				<security:authorize ifAnyGranted ="ROLE_WATER_BOOK_EDIT,ROLE_SEWER_BOOK_EDIT,ROLE_ROAD_BOOK_EDIT" >
				<div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_insert_gridImge('<c:out value="${TABLENAME}"/>')">저장</a></div>
				</security:authorize>
				<div class="Btn"><a href="#" class="Btn_02" onClick="BOOK.fn_close_window('Detail')">닫기</a></div>
			</div>
	</div>
</form>
</body>
</html>
