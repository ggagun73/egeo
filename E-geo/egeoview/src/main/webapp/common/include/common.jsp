<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- 파일 관련 폼 -->
<form id="download_frm" name="download_frm" method="post" action="/" >
<input type="hidden" id="FILE_COURS" name="FILE_COURS" value=""/>
<input type="hidden" id="FILE_NM" name="FILE_NM" value=""/>
</form>
<!-- 내부처리 iframe -->
<iframe id="proc_frm" name="proc_frm" frameborder="0" width="0" height="0"></iframe>
<div id="progressbar"></div><!-- Progressbar -->