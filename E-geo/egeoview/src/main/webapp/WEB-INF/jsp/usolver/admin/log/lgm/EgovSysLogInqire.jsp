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
<title>편집 로그 상세보기</title>
</head>
<body>
	<div class="layer_pop" style="width:400px;">
     	<div class="stit">편집 로그 상세보기</div>
            <table class="tbview" summary="편집 로그 상세보기">
		       <caption>편집 로그 상세보기</caption>
		       <colgroup>
		        <col width="30%" /><col width="70%" />
		       </colgroup>
		       <tbody>
		        <tr>
			        <th>요청ID </th>
			        <td><c:out value="${result.requstId}"/></td>
		        </tr>
		        <tr>
			        <th>발생일자</th>
					<td><c:out value="${result.occrrncDe}"/></td>
				</tr>
				<tr>
					<th>서비스명</th>
			        <td><c:out value="${result.srvcNm}"/></td>
		        </tr>
				<tr>
			        <th>메소드명 </th>
			        <td><c:out value="${result.methodNm}"/></td>
				</tr>
				<tr>
					 <th>처리구분</th>
					<td><c:out value="${result.processSeCodeNm}"/></td>
		        </tr> 
		        <tr>
					 <th>처리시간</th>
					<td><c:out value="${result.processTime}"/></td>
		        </tr>
		        <tr>
					 <th>요청자</th>
					<td><c:out value="${result.rqsterNm}"/></td>
		        </tr>
		        <tr>
					 <th>요청자IP</th>
					<td><c:out value="${result.rqesterIp}"/></td>
		        </tr>               
		       </tbody>
		    </table>
            <div class="TreeBtBx">
        	    <div class="Btn"><a href="#" class="Btn_blue" onClick="window.parent.BOOK.fn_close_window()">닫기</a></div>
            </div>
        </div>
<form id="frm_mst"  name="frm_mst"  method="post" action="">
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->        
</form>
</body>
</html>