<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<c:choose>
	<c:when test = "${file_mode == 'DOWNLOAD_ONLY'}">
		<table>
		<c:forEach var="listData" items="${file_list}">
		<tr>
			<td><a href="javascript:fn_filedownload('<c:out value="${listData.ATCHMNFL_SN}"/>');"><c:out value="${listData.FILE_NM}"/></a></td>
		</tr>
		</c:forEach>
		</table>
	</c:when>
	<c:when test = "${file_mode == 'DOWNLOAD_DELETE'}">
		<table>
		<c:forEach var="listData" items="${file_list}">
		<tr>
			<td>
				<input type="checkbox" name="DEL_ATCHMNFL_SN" value="<c:out value="${listData.ATCHMNFL_SN}"/>"/>삭제 체크
				<a href="javascript:fn_filedownload('<c:out value="${listData.ATCHMNFL_SN}"/>');"><c:out value="${listData.FILE_NM}"/></a>
				<a href="javascript:fn_filedelete('<c:out value="${listData.ATCHMNFL_SN}"/>');">[삭제]</a>
			</td>
		</tr>
		</c:forEach>
		<c:forEach begin="1" end="${file_limit_count}" step="1" var="fcount">
		<tr>
			<td><input type="file" name="file_column${fcount}" size="10" /></td>
		</tr>			
		</c:forEach>
		</table>
	</c:when>
	<c:otherwise>
		<table>
		<c:forEach var="listData" items="${file_list}">
		<tr>
			<td><c:out value="${listData.FILE_NM}"/></td>
		</tr>
		</c:forEach>
		</table>
	</c:otherwise>
</c:choose>