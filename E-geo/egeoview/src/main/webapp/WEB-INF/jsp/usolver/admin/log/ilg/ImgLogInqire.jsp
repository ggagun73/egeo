<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovSysLogInqire.jsp
  * @Description : 시스템 로그 정보 상세조회 화면
  * @Modification Information
  * @
  * @  수정일      수정자          수정내용
  * @  -------    --------       ---------------------------
  * @ 2009.03.11   이삼섭          최초 생성
  * @ 2011.07.08   이기하          패키지 분리, 경로수정(sym.log -> sym.log.lgm)
  * @ 2016.07.08   김수예          usolver3 디자인 수정
  *  @author 공통서비스 개발팀 이삼섭
  *  @since 2009.03.11
  *  @version 1.0
  *  @see
  *
  */
%>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<script type="text/javascript">
	function fn_download_image() {
		var oForm = document.frm_mst;
	    oForm.target = "logImageDown";
	    oForm.action = "/admin/log/ilg/downloadImgLogToImg.do";
	    oForm.submit();
		return false;
	}
</script>
<title>이미지 로그 상세보기</title>
</head>
<body>
	<div class="layer_pop" style="width:484px;">
     	<div class="stit">이미지 로그 상세보기</div>
            <table class="tbview" summary="이미지 로그 상세보기">
		       <caption>이미지 로그 상세보기</caption>
		       <colgroup>
		        <col width="20%" /><col width="30%" />
		         <col width="20%" /><col width="30%" />
		       </colgroup>
		       <tbody>
		        <tr>
			        <th>요청ID </th>
			        <td><c:out value="${result.LOG_ID}"/></td>
			        <th>발생일자</th>
					<td><c:out value="${result.LOG_DATE}"/></td>
		        </tr>
				<tr>
					 <th>처리구분</th>
					<td colspan="3"><c:out value="${result.IMG_STATE}"/></td>
		        </tr> 
		        <tr>
					<th>요청자 ID</th>
					<td><c:out value="${result.USER_ID}"/></td>
					<th>요청자 이름</th>
					<td><c:out value="${result.userName}"/></td>
		        </tr>
		        <tr>
		        	<th>요청자 부서</th>
					<td><c:out value="${result.userDept}"/></td>
					<th>요청자 전화</th>
					<td><c:out value="${result.userTel}"/></td>
		        </tr> 
		        <tr>
					 <th>이미지</th>
					 <td colspan="3" style="word-break:break-all;height:128px;"><img id="LogImg" style="width: 400px;" src="<c:out value="${result.SAVE_IMG}"/>"></img></td>
		        </tr>
		       </tbody>
		    </table>
            <div class="TreeBtBx">
        	    <div class="Btn"><a href="#" class="Btn_blue" onClick="javascript:fn_download_image()">이미지 다운로드</a></div>
        	    <div class="Btn"><a href="#" class="Btn_blue" onClick="window.parent.BOOK.fn_close_window()">닫기</a></div>
            </div>
			<form id="frm_mst"  name="frm_mst"  method="post" action="/admin/log/ilg/downloadImgLogToImg.do">
				<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->        
				<input type="hidden" id="img" name="img" value="<c:out value="${result.SAVE_IMG}"/>"/>        
				<input type="hidden" id="date" name="date" value="<c:out value="${result.LOG_DATE}"/>"/>        
			</form>
        </div>
        <iframe id="logImageDown" style='display:inline' name='logImageDown' width="0" height="0"></iframe>
</body>
</html>