<% response.setHeader("Cache-Control","no-store"); %> 
<% response.setHeader("Pragma","No-cache"); //HTTP 1.0  %>
<% response.setHeader ("Cache-Control", "no-cache");  %>
<% response.setDateHeader ("Expires", 0);  %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="usolver.com.main.vo.LoginVO" %>
<%@ page import="egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<%
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMddHHmmss", java.util.Locale.KOREA);
Long reg_date = Long.parseLong(formatter.format(new java.util.Date())); 
pageContext.setAttribute("reg_date", reg_date);
%>
<% request.setCharacterEncoding("UTF-8"); %>
<%	
	String g_userName = "";
	String g_userId = "";
	//int g_sysAdmin = 0; 
	String g_initExtent = "";
	
	if( EgovUserDetailsHelper.isAuthenticated() ){
		Object egovUserInfo = EgovUserDetailsHelper.getAuthenticatedUser();
		if (egovUserInfo instanceof LoginVO) {
			g_userName = ((LoginVO) egovUserInfo).getUSER_NAME();
			g_userId =  ((LoginVO) egovUserInfo).getUSER_ID();
			//g_sysAdmin = ((LoginVO) egovUserInfo).getSYS_ADMIN();
			g_initExtent =  ((LoginVO) egovUserInfo).getINIT_EXTENT();
		}
	}
%>

<c:set var="reg_date" value="${pageScope.reg_date}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>E-geo 지도</title>

<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/reset.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/map.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/openlayers/OpenLayersEdit/theme/geosilk/geosilk_custom.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jquery/ui/css/jquery-ui.css'/>" />
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css'/>" /> --%>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jqgrid/css/ui.jqgrid.css'/>"/>
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/jquery/css/jquery-ui.css'/>"/> --%>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/spectrum/spectrum.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jquery/msdropdown/css/dd.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jquery/tipped/tipped.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/GMap/GMapStyle.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/popup02.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/slider-pro.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/openlayers/theme/default/style.css'/>" />
<!-- <link href="/extLib/jdesktop/css/jdesktop.css" rel="stylesheet" /> -->
<!-- <link href="/extLib/jdesktop/css/jquery-ui/jquery-ui.min.css" rel="stylesheet" /> -->
<link href="/extLib/jdesktop/css/jquery-ui/jquery-ui.structure.css" rel="stylesheet" />
<!-- <link href="/extLib/jdesktop/css/jquery-ui/jquery-ui.theme.css" rel="stylesheet" /> -->
<link href="/extLib/jdesktop/css/theme/jdesktop.forms.css" rel="stylesheet" />
<link href="/extLib/jdesktop/css/theme/jdesktop.text.css" rel="stylesheet" />
<link href="/extLib/jdesktop/css/theme/style.css" rel="stylesheet" /> 

<!--  imajBox  -->

<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/imajbox/jquery.loadmask.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/imajbox/ui.notify.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/imajbox/colorbox.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/imajbox/imajnetLibrary.css'/>" />

</head>
<body>
	<span id="pc_contextPath" style="display:none;" data-ctx="'${pageContext.request.contextPath}'"></span>
	<iframe id="ifrBlank" name="ifrBlank" style="width:0px;height:0px;"></iframe>
    <div id="wrap">
        <!-- header start -->
        <div id="header">
            <div class="headerBx1">
                <div class="ABx">
                    <p><img src="<c:url value='/images/usolver/com/map/top/top_ico_current.png'/>" alt="편집도구" title="편집도구"/></p>
                    <ul>
                        <li><a id="btn_saveMap" class="onoffdiv" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_a01_off.png'/>"  class="onoffimg" alt="저장" title="저장" /></a></li>
                        <li><a id="btn_print" class="onoffdiv" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_a02_off.png'/>"  class="onoffimg"  alt="인쇄" title="인쇄" /></a></li>
                        <li><a id="btnImportData" class="onoffdiv" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_a03_off.png'/>"  class="onoffimg" alt="데이터관리" title="데이터관리" /></a></li>
                    	<li><label><input id="check_naver" type="radio" name="mashupType" value="naver"/>네이버</label></li>
                    	<li><label><input id="check_daum" type="radio" name="mashupType" checked="checked" value="daum"/>다음</label></li>
                    	<!-- <li><label><input id="testButton" type="button" style="float: right;padding: 0px; display: inline-block;position: absolute;" value="테스트용 버튼"/></label></li> -->
                    	<li><label><input id="check_imajbox" type="checkbox" value="imajbox"/>imajbox</label><a id="btn_imaj_on" onclick="return false;"/> <img src="<c:url value='/images/usolver/com/map/ico_imajnet.png'/>"  alt="imajnet 활성화" style="padding-left:5px;"/></a></li>
                    </ul> 
                </div>
                <div class="BBx">
                    <ul>
                        <li><a id="btnMove" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b13_off.png'/>" class="onoffimg" alt="이동" title="이동" /></a></li>
                        <li><a id="btnPrev" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b01_off.png'/>" class="onoffimg" alt="이전" title="이전" /></a></li>
                        <li><a id="btnNext" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b02_off.png'/>" class="onoffimg"  alt="다음" title="다음" /></a></li>
                        <li><a id="btnMaxExtent" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b03_off.png'/>" class="onoffimg" alt="전체화면" title="전체화면" /></a></li>
                        <li><a id="btnMapClean" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b04_off.png'/>" class="onoffimg"  alt="다시그리기" title="다시그리기" /></a></li>
                        <li><a id="btnPolyGonMeasure" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b05_off.png'/>" class="onoffimg" alt="면적측정" title="면적측정" /></a></li>
                        <li><a id="btnPathMeasure" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b06_off.png'/>" class="onoffimg" alt="거리측정" title="거리측정" /></a></li>
                        <li><a id="aCross" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b08_off.png'/>" class="onoffimg" alt="횡단면도조회" title="횡단면도조회" /></a></li>
                        <li><a id="aLis" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b09_off.png'/>" class="onoffimg" alt="차단제수변조회" title="차단제수변조회" /></a></li>
                        <li class="line"></li>
                        <li><a id="btn_favorite"href="#" class="onoffdiv" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b10_off.png'/>"  class="onoffimg" alt="즐겨찾기" title="즐겨찾기" /></a></li>
                        <li><a id="btn_searchLoc" class="onoffdiv" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b11_off.png'/>" class="onoffimg" alt="위치검색" title="위치검색" /></a></li>
                        <li><a id="btn_searchFacility" class="onoffdiv" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b12_off.png'/>" class="onoffimg" alt="속성조회" title="속성검색" /></a></li>
                        <li class="line"></li>
                        <li><a id="btnDraw" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b07_off.png'/>"  class="onoffimg" alt="그리기도구" title="그리기도구" /></a></li>
                        <li><a id="btnMemoAdd" data-control-name="drawMemo" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_b14_off.png'/>"  class="onoffimg" alt="메모추가" title="메모추가" /></a></li>
                        <li><a id="btnMemoList" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_b15_off.png'/>"  class="onoffimg" alt="메모목록" title="메모목록" /></a></li>
                        <li><a id="btnLink" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b16_off.png'/>"  class="onoffimg" alt="연계설정" title="연계설정" /></a></li>
                        <li class="line"></li>
                        <li><a id="btnTotalSearch" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_b17_off.png'/>"  class="onoffimg" alt="전체검색" title="전체검색" style="margin-top:2px;" /></a></li>
                        <!-- <li><a id="btnDrawSymbol" data-control-name="drawSymbol" class="btn map-draw" href="#"><img src="https://cdn4.iconfinder.com/data/icons/miu/22/editor_document_file_add_2-20.png" title="메모추가" alt="메모추가"/></a></li>
                        <li><a id="btnMemoList" href="#"><img src="https://cdn4.iconfinder.com/data/icons/miu/22/editor_documents_files-20.png" title="메모보기" alt="메모보기"/></a></li> -->
                    </ul>
                </div>
            </div>
            
            <div id="editPane"class="headerBx2">
                <div class="TitleBx">편집도구</div>
                <div class="CBx">
                    <div class="IcoBt" id="IcoBt">
                        <a href="#" id="btnAddFeature"  onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c01_off.png'/>"  class="onoffimg" alt="추가" title="추가" /></a>
                        <a href="#" id="btnDeleteFeature" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c02_off.png'/>"  class="onoffimg" alt="삭제" title="삭제" /></a>
                        <a href="#" id="btnEditVertices" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c03_off.png'/>"  class="onoffimg" alt="정점편집" title="정점편집" /></a>
                        <a href="#" id="btnEditTransform" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c15_off.png'/>"  class="onoffimg" alt="Transform" title="도형변형" /></a>
                        <a href="#" id="btn_editSearch" class="onoffdiv" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c20_off.png'/>"  class="onoffimg" alt="검색" title="검색" /></a>
                        <!-- <a href="#" id="btnEditSelect" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c04_off.png'/>"  class="onoffimg" alt="도형선택" title="도형선택" /></a>-->
                        <a href="#" id="btnEditUndo" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c05_off.png'/>"  class="onoffimg" alt="편집이전" title="편집이전" /></a>
                        <a href="#" id="btnEditRedo" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c06_off.png'/>"  class="onoffimg" alt="편집다음" title="편집다음" /></a>
                        
                        <img src="<c:url value='/images/usolver/com/map/top/line.png'/>" alt="구분선" title="구분선" />
                        <a href="#" id="btnEditCancel" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c07_off.png'/>"  class="onoffimg"  alt="편집취소" title="편집취소" /></a>
                        <a href="#" id="btnEditSave" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c08_off.png'/>"   class="onoffimg" alt="편집저장" title="편집저장" /></a>
                        <a href="#" id="btnEditStop" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c09_off.png'/>"  class="onoffimg" alt="편집종료" title="편집종료" /></a>
                        
                        <img src="<c:url value='/images/usolver/com/map/top/line.png'/>" alt="구분선" title="구분선" />
                        <a href="#" id="btnEditMonitor" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c10_off.png'/>"  class="onoffimg" alt="편집모니터" title="편집모니터"/></a>
						<a href="#" id="btnLoadShp" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c16_off.png'/>"  class="onoffimg" alt="shp파일 불러오기" title="shp파일 불러오기"/></a>
						<a href="#" id="btnEditHis" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_c17_off.png'/>"  class="onoffimg" alt="편집이력" title="편집이력"/></a>
                    </div>
                </div>
            </div>
            
            <div id="drawPane" class="headerBx2_2" style="display: none;">
			   <div class="TitleBx">그리기도구</div>
			   <div class="CBx">
			      <div class="IcoBt">
			         <a id="btnDrawEdit" data-control-name="drawEdit" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c201_off.png'/>"  class="onoffimg" title="편집" alt="편집"/></a>
			         <%-- <a id="" data-control-name="" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c202_off.png'/>"  class="onoffimg"  title="점편집" alt="점편집"/></a> --%>
			         <a id="btnDrawDelete" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c203_off.png'/>"  class="onoffimg"  title="선택도형삭제" alt="선택도형삭제"/></a>
			         <%-- <a id="" data-control-name="" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c204_off.png'/>"  class="onoffimg" title="전체도형삭제" alt="전체도형삭제"/></a> --%>
			         <a id="btnDrawPoint" data-control-name="drawPoint" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c205_off.png'/>"  class="onoffimg"  title="점그리기" alt="점그리기"/></a>
			         <%-- <a id="btnDrawSymbol" data-control-name="drawSymbol" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c206_off.png'/>"  class="onoffimg" title="메모추가" alt="메모추가"/></a> --%>
			         <a id="btnDrawLine" data-control-name="drawLine" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c207_off.png'/>"  class="onoffimg"  title="선그리기" alt="선그리기"/></a>
			         <a id="btnDrawRect" data-control-name="drawRect" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c208_off.png'/>"  class="onoffimg" title="사각형그리기" alt="사각형그리기"/></a>
			         <a id="btnDrawCircle" data-control-name="drawCircle" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c209_off.png'/>"  class="onoffimg"  title="원그리기" alt="원그리기"/></a>
			         <a id="btnDrawEllipse" data-control-name="drawEllipse" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c210_off.png'/>"  class="onoffimg" title="타원그리기" alt="타원그리기"/></a>
			         <a id="btnDrawPolygon" data-control-name="drawPolygon" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c211_off.png'/>"  class="onoffimg" title="다각형그리기" alt="다각형그리기"/></a>
			         <a id="btnDrawText" data-control-name="drawText" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c212_off.png'/>"  class="onoffimg"  title="글자그리기" alt="글자그리기"/></a>
			         <%-- <a id="" data-control-name="" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c213_off.png'/>"  class="onoffimg"  title="단일선택" alt="단일선택"/></a> --%>
			         <a id="btnDrawSelect" data-control-name="drawSelect" class="btn map-draw" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c214_off.png'/>"  class="onoffimg"  title="다중선택" alt="다중선택"/></a>
			         <a id="btn_add_memo" href="#" style="display : none;"><img src="<c:url value='/images/usolver/com/map/top/top_c215_off.png'/>"  class="onoffimg"  title="저장" alt="저장"/></a>
			         <%-- <a id="btn_open_memo" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_c216_off.png'/>"  class="onoffimg" title="불러오기" alt="불러오기"/></a> --%>
			      </div>
			   </div>
			</div>
            
            <div class="headerBx3">
                <div class="Bt_SizeBx">
                    <ul>
                        <li><a href="#" onclick="return false;"><%-- <img src="<c:url value='/images/usolver/com/map/top/top_btn_size1_off.png'/>"  class="onoffimg"   alt="minimize" title="minimize"/> --%></a></li>
                        <li><a href="#" onclick="return false;"><%-- <img src="<c:url value='/images/usolver/com/map/top/top_btn_size2_off.png'/>"  class="onoffimg"   alt="50%" title="50%" /> --%></a></li>
                        <li><a href="#" onclick="return false;"><%-- <img src="<c:url value='/images/usolver/com/map/top/top_btn_size3_off.png'/>"  class="onoffimg"   alt="maxmize" title="maxmize" /> --%></a></li>
                        <li><a href="#" onclick="return false;"><%-- <img src="<c:url value='/images/usolver/com/map/top/top_btn_size4_off.png'/>"  class="onoffimg"   alt="close" title="close" /> --%></a></li>
                    </ul>
                </div>
                <div class="FindBx">
                    <div class="FindLine">
                        <dl>
                            <dt>
                            	<input type="text" style="width:100%;" value=""  onkeydown="javascript: if (event.keyCode == 13) {SEARCH.fn_start_searchKeyword(this.value.replace(/^\s+|\s+$/g,'')); $('#txt_keyword').val(this.value.replace(/^\s+|\s+$/g,''));}"/>
                            </dt>
                            <dd>
                            	<a href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/top/top_btn_find.png'/>"  class="onoffimg" alt="close" title="close" /></a>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <!-- header end  -->
        <!-- container start -->
        <div id="container">
            <div id="left">
                <div class="leftBtArea">
                    <a href="#" id="leftCloseBt" onclick="leftClose(); return false;"><img src="<c:url value='/images/usolver/com/map/left/btn_close.gif'/>"  class="onoffimg"  alt="닫기" title="닫기" /></a>
                    <a href="#" class="hidden" id="leftOpenBt" onclick="leftOpen(); return false;"><img src="<c:url value='/images/usolver/com/map/left/btn_open.gif'/>"  class="onoffimg"  alt="열기" title="열기" /></a>
                </div>
                <div class="leftTab">
                    <ul>
                        <li><a id="layerManager" href="#layerTab" onclick="leftTabChange(this); return false;" data-index="1"><img src="<c:url value='/images/usolver/com/map/left/tab_01_off.gif'/>"  class="onoffimg"  alt="레이어관리" title="레이어관리"/></a></li>
                        <li><a href="#legendTab" onclick="leftTabChange(this); return false;" data-index="2"><img src="<c:url value='/images/usolver/com/map/left/tab_02_off.gif'/>"  class="onoffimg"  alt="범례" title="범례"/></a></li>
                        <li><a href="#editToolTab" onclick="leftTabChange(this); return false;" data-index="3"><img src="<c:url value='/images/usolver/com/map/left/tab_03_off.gif'/>"  class="onoffimg"  alt="편집도구" title="편집도구"/></a></li>
                        <li><a href="#decisionTab" onclick="leftTabChange(this); return false;" data-index="4"><img src="<c:url value='/images/usolver/com/map/left/tab_04_off.gif'/>"  class="onoffimg"  alt="의사결정지원" title="의사결정지원"/></a></li>
                    </ul>
                </div>
                <!-- leftCont -->
                <div class="leftCont">
                	<div id="layerTab">
               			<!-- title -->
		                <div class="Left_TitBx">
		                    <dl>
		                        <dd><img src="/images/usolver/com/map/left/tit_ico2.png" alt="스냅환경설정아이콘"/></dd>
		                        <dt>레이어</dt>
		                    </dl>
		                </div> 
	                	<div id="divSubject"> 
	                    	<dl>
	                    		<dd>기본도</dd>
	                    		<dt>
	                    			<!-- <a href="#" id="btn_add_subject"><img src="/images/usolver/com/map/top/top_b14_on.png" title="주제도 생성"/></a>
	                    			<a href="#" id="btn_select_subject"><img src="/images/usolver/com/map/top/top_b15_on.png" title="주제도 갤러리"/></a> -->
	                    		</dt>
	                    	</dl>	
	                	</div>
	                	<div id="divSubjectMenu"> 
	                    	<ul>
	                    		<li>
	                    			<a href="#" id="btn_layer_addremove"><img src="/images/usolver/com/map/left/btn_make_layerlist_off.png" class="onoffimg"  title="맵 구성"/></a>
	                    		</li>
	                    		<li>
	                    			<a href="#" id="btn_subject_make"><img src="/images/usolver/com/map/left/btn_subject_make_off.png" class="onoffimg"  title="맵 만들기"/></a>
	                    		</li>
	                    		<li>
	                    			<a href="#" id="btn_subject_gallery"><img src="/images/usolver/com/map/left/btn_subject_gallery_off.png" class="onoffimg"  title="맵 갤러리"/></a>
	                    		</li>
	                    	</ul>	
	                	</div>
		                <!-- // title -->
                		<div class="Left_SBx1">
	                		<div id="divLayerTree"></div>
	                		<div id="divSymbolEditTotal" style="display: none;">
	                			<div class="totHead">
		                			<div class="stit" id="totLayer">속성 설정</div>
		                			<strong id="totRule" style="display: none;">심볼</strong>
		                			<strong id="totRuleNum" style="display: none;"></strong>
	                			</div>
	                			<div id="divSymbolEditList" class="scbx" style="display: none; float:left; margin-top:10px; margin-bottom: 10px;">
		                			<ul/>
	                			</div>
	                			
	                			<div class="stit" id="sysTitle">심볼 정의</div>
		                		<div id="divSymbolEditDetail" class="scbx" style="display: none; float:left; margin-top:10px; margin-bottom: 10px;">
		                			<div class="editDefault inbx">
		                				<h2 class="sstit">공통</h2>
		                				<ul class="inlst">
		                					<li id="symbolMark"><span class="divTitle">라벨표시 </span><input id="chkSymbolMark" type="checkbox"/></li>
			                				<li id="symbolScale">
	                							<span class="divTitle">유효축적 </span>
	                							<input id="minScale" type="number" style="width: 35px;"/>~<input id="maxScale" type="number" style="width: 35px;"/>
		                					</li>
		                				</ul>
		                			</div>
		                			<div class="editSymbol">
		                				<div class="pointSymbol inbx">
		                					<h2 class="sstit">점형</h2>
		                					<ul class="inlst">
		                						<li id="pointImageCheck">
		                							<input class="imageCheck" type="radio" name="imageCheck" value="shape">도형</input> 
		                							<input class="imageCheck" type="radio" name="imageCheck" style="margin-left: 50px;" value="image">이미지</input> 
		                						</li>
		                						<div id="imageSymbol" >
	                								<div>
	                									<ul>
					               							<ul class="grayin">
		                										<li>이미지 경로</li>
		                										<li>
		                											<li><input type="radio" name="urlCheck" value="file"/>파일 <input type="radio" name="urlCheck" value="url"/>URL </li>
			                										<input id="imageFileUrl" type="text" style="width: 96px;" readonly="readonly" disabled="disabled"/>
		                											<a href="#" class="btn_black"><img src="/images/usolver/com/map/left/ic_file.png" alt="첨부" />파일찾기</a>
		                											<input id="imageFile" type="file"/>
			                										<input id="imageUrl" type="text" style="width: 150px;"/>
			                										<img id="imageFileEncoding" style="display: none;" src="" imageFormat=""/>
		                										</li>
					               							</ul>
	                										<li id="imageSize"><span class="divTitle">크기 </span><input type="number" id="txtImageSize"/></li>
		                									<li id="imageOpa" class='opacity'>
																<span class="divTitle">투명도 </span><input type="number" id="txtImageOpa" />%<div id="sliderImageOpa" class="slider"></div>
															</li>
	                									</ul>
	                								</div>
		                						</div>
		                						<li id="pointShape">
		                							<span class="divTitle">도형 </span> 
													<select id="selShapeType">
														<option value='circle' selected="selected" >원</option>
														<option value='square'>사각형</option>
														<option value='star'>별</option>
														<option value='x'>엑스</option>
														<option value='cross'>십자</option>
														<option value='triangle'>삼각형</option>
													</select>
		                						</li>
		                						<li id="pointSize">
													<span class="divTitle">크기 </span> <input type="number" id="txtShapeSize"/>
		                						</li>
		                						<li id='pointColor'>
													<span class="divTitle">색상 </span><input type="color" id="colorPoint" class="full_color"/>
												</li>
		                						<li id="pointOpa" class='opacity'>
													<span class="divTitle">투명도 </span><input type="number" id="txtShapeOpa"></input>%<div id="sliderShapeOpa" class="slider" ></div>
												</li>
												<li id='pointOutLineCheck'>
													<span class="divTitle">외곽선 사용 </span><input type="checkbox" class="chkOutLine" id="chkPointOutLine"/>
												</li>
											</ul>
		                				</div>
		                				<div class="polygonSymbol inbx">
		                					<h2 class="sstit">면형</h2>
											<ul class="inlst">
												<li id='polygonColor'>
													<span class="divTitle">색상 </span> <input type="color" id="colorPoly" class="full_color"/>
												</li>
												<li id='polygonOpa' class='opacity'>
													<span class="divTitle">투명도 :</span><input type="number" id="txtPolyOpa" /><span class="divPersent">%</span>
													<div id="sliderPolyOpa" class="slider" ></div>
												</li>
												<li id='polygonOutLineCheck'>
													<span class="divTitle">외곽선 사용 </span><input type="checkbox" class="chkOutLine" id="chkPolygonOutLine"/>
												</li>
		                					</ul>
										</div>
		                				<div class="lineSymbol inbx">
		                					<h2 class="sstit">선형</h2>
		                					<ul class="inlst">
												<li id='lineColor'>
													<span class="divTitle">색상 </span><input type="color" id="colorLine" class="full_color"/>
												</li>
												<li id='lineThickness'>
													<span class="divTitle">두께 </span> <input type="number" id="txtLineThickness" />
												</li>
												<li id='lineStyle'>
													<span class="divTitle">스타일 </span>
													<select id="selLineStyle" style="width : 115px;">
														<option value="solid" name="solid" title="<c:url value='/images/usolver/com/map/style/lineSolid.gif' />" selected="selected"></option>
														<option value="dot" name="dot" title="<c:url value='/images/usolver/com/map/style/lineDot.gif' />"></option>
														<option value="dash" name="dash" title="<c:url value='/images/usolver/com/map/style/lineDash.gif' />"></option>
														<option value="dashdot" name="dashdot" title="<c:url value='/images/usolver/com/map/style/lineDashdot.gif' />"></option>
													</select>
												</li>
												<li id='lineCap'>
													<span class="divTitle">끝모양 </span>
													<select id="selLineCap" style="width : 115px;">
														<option value="butt" name="butt" title="<c:url value='/images/usolver/com/map/style/capButt.gif' />" selected="selected"></option>
														<option value="round" name="round" title="<c:url value='/images/usolver/com/map/style/capRound.gif' />"></option>
														<option value="square" name="square" title="<c:url value='/images/usolver/com/map/style/capSquare.gif' />"></option>
													</select>
												</li>
												<li id="lineJoin">
													<span class="divTitle">조인모양 </span>
													<select id="selLineJoin" style="width : 115px;">
														<option value="round" name="round" title="<c:url value='/images/usolver/com/map/style/joinRound.png' />" selected="selected"></option>
														<option value="miter" name="miter" title="<c:url value='/images/usolver/com/map/style/joinMiter.png' />"></option>
														<option value="bevel" name="bevel" title="<c:url value='/images/usolver/com/map/style/joinBevel.png' />"></option>
													</select>
												</li>
												<li id='lineOpa' class='opacity'>
													<span class="divTitle">투명도 </span> <input type="number" id="txtLineOpa"/>%
													<div id="sliderLineOpa" class="slider" ></div>
												</li>
		                					</ul>
		                				</div>
										<div class="editLabel inbx">
		                					<h2 class="sstit">라벨</h2>
		                					<ul class="inlst">
		                						<li id="labelField">
		                							<span class="divTitle">필드명 </span><select><option></option></select> 
		                						</li>
		                						<li id="labelFont">
		                							<span class="divTitle">글꼴 </span>
			                						<select>
			                							<option value="굴림">굴림</option>
			                							<option value="맑은 고딕">맑은 고딕</option>
			                							<option value="나눔고딕">나눔고딕</option>
			                							<option value="새굴림">새굴림</option>
			                						</select>
		                						</li>
		                						<li id="labelFontColor">
		                							<span class="divTitle" >색상 </span><input type="color" id="colorLabel" class="full_color"/>
		                						</li>
		                						<li id="labelFontOpa">
		                							<span class="divTitle">투명도 </span><input type="number" id="txtLabelFontOpa"/>%<div id="sliderLabelFontOpa" class="slider" ></div>
		                						</li>
		                						<li id="labelFontSize">
		                							<span class="divTitle">크기 </span><input type="number" id="txtLabelFontSize"/>
		                						</li>
		                						<li id="labelFontStyle">
		                							<span class="divTitle">기울게 </span><input id="chkLabelFontStyle" type="checkbox"/>
		                						</li>
		                						<li id="labelFontWeight">
		                							<span class="divTitle">굵기 </span><input id="chkLabelFontWeight" type="checkbox"/>
		                						</li>
		                						<li id="labelCodeDomain">
		                							<span class="divTitle">도메인사용 </span><input id="chkLabelCodeDomain" type="checkbox"/>
		                						</li>
		                						<li id="labelBackground">
		                							<span class="divTitle">배경 사용 </span><input id="chkLabelBackground" type="checkbox"/>
		                						</li>
		                					</ul>
		                				</div>
		                				<div class="editLabel inbx labelPoisition">
                							<h2 class="sstit">기준점</h2>
                							<ul class="inlst">
                								<li id="labelTypeCheck">
		                							<input class="labelCheck" type="radio" name="labelCheck" value="PointText">점형 라벨</input> 
		                							<input class="labelCheck" type="radio" name="labelCheck" style="margin-left: 30px;" value="LineText">선형 라벨</input> 
		                						</li>
                								<li id="labelPointBase">
		                							<span class="divTitle">기준점</span>
		                							<select>
		                								<option value="CENTER">중앙</option>
		                								<option value="CENTROID">무게중심</option>
		                								<option value="BEGIN_POINT">시점</option>
		                								<option value="END_POINT">종점</option>
		                								<option value="MIDDLE_POINT">중점</option>
		                								<option value="INSIDE_AREA">영역내부</option>
		                							</select>
		                						</li>
		                						<li id="labelPointPosition">
		                							<span class="divTitle">기준점에서 라벨의 위치</span>
		                							<select>
		                								<option value="CENTER">중앙</option>
		                								<option value="LEFT">←</option>
		                								<option value="TOP">↑</option>
		                								<option value="RIGHT">→</option>
		                								<option value="BOTTOM">↓</option>
		                								<option value="LEFT_TOP">↖</option>
		                								<option value="RIGHT_TOP">↗</option>
		                								<option value="LEFT_BOTTOM">↙</option>
		                								<option value="RIGHT_BOTTOM">↘</option>
		                							</select>
		                						</li>
		                						<li id="labelPointArrange">
		                							<span class="divTitle">점형 라벨 정렬 방식</span>
		                							<select>
		                								<option value="HORIZONTAL">수평</option>
		                								<option value="VERTICAL">수직</option>
		                							</select>
		                						</li>
		                						<li id="labelLineArrangePos">
		                							<span class="divTitle">선형 라벨 위치</span>
		                							<select>
		                								<option value="CENTER">중앙</option>
		                								<option value="HEAD">시작</option>
		                								<option value="TAIL">종료</option>
		                							</select>
		                						</li>
		                						<li id="labelLineArrangeLine">
		                							<span class="divTitle">선형 라벨 정렬</span>
		                							<select>
		                								<option value="ON">선 중간</option>
		                								<option value="ABOVE">선 위쪽</option>
		                								<option value="BELOW">선 아래</option>
		                							</select>
		                						</li>
		                						<li id="labelLineArrangeGap">
		                							<span class="divTitle">선형 라벨 배치</span>
		                							<select>
		                								<option value="NORMAL">기본 간격</option>
		                								<option value="VERTEX">정점 간격</option>
		                								<option value="PERCENT">비율 간격</option>
		                								<option value="NORMAL_READING">기본 간격(방향무시)</option>
		                								<option value="VERTEX_READING">정점 간격(방향무시)</option>
		                								<option value="PERCENT_READING">비율 간격(방향무시)</option>
		                							</select>
		                						</li>
                							</ul>
                						</div>	
		                				<div class="editLabel inbx labelBackground" style="display: none;">
                							<h2 class="sstit">배경</h2>
                							<ul class="inlst">
		                						<li id="labelBackgroundType">
		                							<span class="divTitle">모양</span>
		                							<select>
		                								<option value="BOX_RECTANGLE">사각형</option>
		                								<option value="BOX_ROUNDRECTANGLE">둥근사각형</option>
		                								<option value="BOX_ELLIPSE">타원</option>
		                								<option value="BOX_STAR">별</option>
		                								<option value="BOX_TRIANGLE">삼각형</option>
		                							</select>
		                						</li>
		                						<li id="labelBackgroundColor">
		                							<span class="divTitle">색상 </span><input type="color" id="colorLabelBackground" class="full_color"/>
		                						</li>
		                						<li id="labelBackgroundLine">
		                							<span class="divTitle">테두리색</span><input type="color" id="colorLabelBackgroundLine" class="full_color"/>
		                						</li>
		                						<li id="labelBackgroundOffset">
		                							<span class="divTitle">심볼 상하 여백</span><input type="number" id="txtLabelBackgroundOffset"/>
		                						</li>
		                						<li id="labelBackgroundAlign">
		                							<span class="divTitle">심볼 내 텍스트 위치</span>
		                							<select>
		                								<option value="CENTER">중앙</option>
		                								<option value="LEFT">←</option>
		                								<option value="TOP">↑</option>
		                								<option value="RIGHT">→</option>
		                								<option value="BOTTOM">↓</option>
		                								<option value="LEFTTOP">↖</option>
		                								<option value="RIGHTTOP">↗</option>
		                								<option value="LEFTBOTTOM">↙</option>
		                								<option value="RIGHTBOTTOM">↘</option>
		                							</select>
		                						</li>
                							</ul>
                						</div>
			                		</div>
		                		</div>
		                		<div id="divbtnSymbolCheck" class="ar" style="display: none; margin-top: 10px;">
		                			<a href="#" id="apply" class="btn_symbol" title="적용">적용</a>
		                			<a href="#" id="accept" class="btn_symbol" title="확인">확인</a>
		                			<a href="#" id="cancel" class="btn_symbol" title="취소">취소</a>
                				</div>
	                		</div>
	                		<div id="divSymbolEdit" style="display: none; float:left; margin-top:10px;">
		                		<div id="attrMng" class="contentTab">
									<div class="totMenu">
										<strong>속성 설정</strong>
									</div>
									<ul>
										<li id='liNone'>
											* 선택된 도형이 없습니다.
										</li>
										<li id='liFont'>
											<span class="divTitle">서체 :</span>
											 <select id="selFont">
												<option value="굴림" >굴림</option>
												<option value="바탕" >바탕</option>
												<option value="궁서" >궁서</option>
												<option value="신명조" >신명조</option>
												<option value="HY헤드라인M" >헤드라인</option>
												<option value="휴먼옛체" >옛체</option>
											</select>
										</li>
										<li id='liType'>
											<span class="divTitle">도형 :</span> 
											<select id="selType">
												<option value='circle' selected="selected" >circle</option>
												<option value='square'>square</option>
												<option value='star'>star</option>
												<option value='x'>x</option>
												<option value='cross'>cross</option>
												<option value='triangle'>triangle</option>
											</select>
										</li>
										<li id='liSize'>
											<span class="divTitle">크기 :</span><input type="text" id="txtSize" />
										</li>
										<li id='liThickness'>
											<span class="divTitle">선두께 :</span> <input type="text" id="txtThickness" />
										</li>
										<li id='liWidth'>
											<span class="divTitle">너비 :</span> <input type="text" id="txtWidth" />
										</li>
										<li id='liHeight'>
											<span class="divTitle">높이 :</span> <input type="text" id="txtHeight" />
										</li>
										
										
										<li id='liColor'>
											<span class="divTitle">선색상표 :</span><input type="color" id="colorAttr" class="full_color" value="" />
										</li>
										<li id='liStyle'>
											<span class="divTitle">선스타일 :</span>
											<select id="selStyle" style="width : 115px;">
												<option value="solid" name="solid" title="<c:url value='/images/usolver/com/map/style/lineSolid.gif' />" selected="selected"></option>
												<option value="dot" name="dot" title="<c:url value='/images/usolver/com/map/style/lineDot.gif' />"></option>
												<option value="dash" name="dash" title="<c:url value='/images/usolver/com/map/style/lineDash.gif' />"></option>
												<option value="dashdot" name="dashdot" title="<c:url value='/images/usolver/com/map/style/lineDashdot.gif' />"></option>
											</select>
										</li>
										<li id='liCap'>
											<span class="divTitle">선끝모양 :</span>
											<select id="selCap" style="width : 115px;">
												<option value="butt" name="butt" title="<c:url value='/images/usolver/com/map/style/capButt.gif' />" selected="selected"></option>
												<option value="round" name="round" title="<c:url value='/images/usolver/com/map/style/capRound.gif' />"></option>
												<option value="square" name="square" title="<c:url value='/images/usolver/com/map/style/capSquare.gif' />"></option>
											</select>
										</li>
										<li id='liOpa' class='opacity'>
											<span class="divTitle">선투명도 :</span> <input type="text" id="txtOpa"/>%
											<div id="sliderOpa" class="slider" ></div>
										</li>
										<li id='liColorPoly'>
											<span class="divTitle">면색상표 :</span> <input type="color" id="colorAttrPoly" class="full_color" value="" />
										</li>
										<li id='liOpaPoly' class='opacity'>
											<span class="divTitle">면투명도 :</span><input type="text" id="txtOpaPoly" /><span class="divPersent">%</span>
											<div id="sliderOpaPoly" class="slider" ></div>
										</li>
										
										<li id="liBackFillColor">
											배경색 : <input type="color" id="colorAttrBack" class="full_color" value="" />
										</li>
										<li id="liBackFillOpa" class='opacity'>
											투명도 : <input type="text" id="txtOpaBack" />%
											<div id="sliderOpaBack" class="slider" ></div>
										</li>
										<li id="liBackLineColor">
											테두리색 : <input type="color" id="colorAttrBackLine" class="full_color" value="" />
										</li>
										<li id="liBackLineOpa" class='opacity'>
											투명도 : <input type="text" id="txtOpaBackLine" />%
											<div id="sliderOpaBackLine" class="slider" ></div>
										</li>		
														
										<li id='liSubmit'>
											<a href="#" class='btnBack' title="원본스타일"><img src="<c:url value='/images/usolver/com/map/draw/btn_back.png'/>" /></a>
											<a href="#" class='btnApply' title="설정 적용" ><img src="<c:url value='/images/usolver/com/map/draw/btn_done.png'/>" /></a>
										</li>
									</ul>
								</div>
	                		</div>
                        </div>
                		<div id="divLayerCtrl" class="LeftLyrBx">
		                    <ul>
		                    	<li><a id="lyrDown" href="#" onclick="return false;"><img class="onoffimg" src="<c:url value='/images/usolver/com/map/left/bt_down1_off.png'/>" title="선택된 레이어를 그룹 최하위 위치로 옮깁니다"/></a></li>
		                    	<li><a id="lyrDown1" href="#" onclick="return false;"><img class="onoffimg" src="<c:url value='/images/usolver/com/map/left/bt_down2_off.png'/>"  title="선택된 레이어를 한단계 아래로 옮깁니다"/></a></li>
		                    	<li><a id="lyrUp1" href="#" onclick="return false;"><img class="onoffimg" src="<c:url value='/images/usolver/com/map/left/bt_up2_off.png'/>"  title="선택된 레이어를 한단계 위로 옮깁니다"/></a></li>
		                    	<li><a id="lyrUp" href="#" onclick="return false;"><img class="onoffimg" src="<c:url value='/images/usolver/com/map/left/bt_up1_off.png'/>"   title="선택된 레이어를 그룹 최상위 위치로 옮깁니다"/></a></li>
		                    	<li><a id="btn_reset_symbol" href="#" onclick="return false;"><img class="onoffimg" src="<c:url value='/images/usolver/com/map/left/btn_reset_symbol_off.gif'/>" title="시스템이 초기 제공하는 표준 스타일로 일괄 변경합니다" /></a></li>
		                    	<li style="display:none;"><a id="btn_layer_refresh" href="#" onclick="return false;"><img class="onoffimg" src="<c:url value='/images/usolver/com/map/left/btn_reset_layerlist_off.gif'/>" /></a></li>
	                        </ul>
	                    </div>
                		<div class="LeftTabBx tabEdit" id="tabLayer">
		                    <ul>
		                    	<li><a id="tabLayerTree" href="#" class="LeftTab_selected" onclick="return false;">레이어</a></li>
		                    	<li class="tabline"></li>
		                        <li><a id="tabSymbolEditTotal" href="#" class="LeftTab" onclick="return false;">심볼 편집</a></li>
		                        <li style="display: none;"><a id="tabSymbolEdit"></a></li>
	                        </ul>
	                    </div>
                	</div>
                	<div id="legendTab" style="display : none;">
                        <!-- title -->
		                <div class="Left_TitBx">
		                    <dl>
		                        <dd><img src="/images/usolver/com/map/left/tit_ico2.png" alt="스냅환경설정아이콘"/></dd>
		                        <dt>범례</dt>
		                    </dl>
		                </div>
		                <!-- // title -->
                		<div id="legendGraphicContainer">
                			<div class="Left_SBx1" style="max-height: 840px; overflow-y: auto;">
	                            <dl class="SBx">
	                                <dd class="TxBx1"><label><input class="radio_legend" name="type" type="radio" id="chkOptSnap" checked="checked" value="0"/> 전체범례</label></dd>
	                                <dd class="TxBx1"><label><input class="radio_legend" name="type" type="radio" id="chkOptBook" value="1"/> 현재범례</label></dd>
	                            </dl>
								<div id="legendGraphic"></div>
	                        </div>
						</div>
                	</div>
                	<div id="editToolTab" style="display : none;">
	                    <!-- Select_2depth -->
	                    <div name="1" id="selEditLayer"  class="topmenu_subbx msub" onMouseOver="MM_showHideLayers('selEditLayer','','show');" onMouseOut="MM_showHideLayers('selEditLayer','','hide');">
	                        <ul class="b_intx">	                            
	                        </ul>
	                    </div>
	                    <!-- // Select_2depth -->
	                    <!-- LeftBox1 -->
	                    <div class="LeftBx1" id="divEditTool">
	                        <!-- 편집시설물선택 -->
	                        <div class="SelectBx">
	                            <div class="Select" id="Select">
	                                <div class="editLayer">편집 시설물 선택</div>
	                                <div class="Select_bt">
	                                    <a href="#" onMouseOut="MM_swapImgRestore()" onClick="MM_showHideLayers('selEditLayer','','show'); return false;"><img src="<c:url value='/images/usolver/com/map/left/btn_select_off.png'/>"  class="onoffimg"  alt="arrow" title="arrow"/></a>
	                                </div>
	                            </div>
	                        </div>
	                        <!-- // 편집시설물선택 -->
	                        <!-- 편집옵션 -->
	                        <div class="Left_SBx1">
	                            <div class="Left_STitBx">
	                                <p>편집옵션</p>
	                            </div>
	                            <dl class="SBx">
	                                <dd class="TxBx1"><label><input type="checkbox" id="chkOptEditSnap" checked="checked"/> 스냅사용</label></dd>
	                                <dd class="TxBx1"><label><input type="checkbox" id="chkOptEditBook"/> 대장나중입력</label></dd>
	                               <!--  <dd class="TxBx1"><label><input type="checkbox" id="chkOptMonitor"/> 신규모니터</label></dd>
	                                <dd class="TxBx1"><label><input type="checkbox" id="chkOptHelp"/> 편집도움말</label></dd> -->
	                            </dl>
	                        </div>
	                        <!-- //편집옵션 -->
	                        <div class="Left_SBx1">
	                            <ul class="BtBx1">
	                                <li><a href="#" id="btnStartFeatureEdit"><img id="btnImgStartFeatureEdit" src="<c:url value='/images/usolver/com/map/left/left_a01_off.png'/>"  class="onoffimg" alt="도형편집 시작" title="도형편집 시작" /></a></li>
	                                <li><a href="#" id="btnStartBookEdit"><img  id="btnImgStartBookEdit" src="<c:url value='/images/usolver/com/map/left/left_a02_off.png'/>"  class="onoffimg"  alt="속성편집 시작" title="속성편집 시작" /></a></li>
	                            </ul>
	                        </div>
	                        <!-- 상수시설물 -->
	                        <div id="divEditOptionWTL">
		                        <!-- 고급편집 -->
		                        <div class="Left_SBx1" id='divAdvancedEdit'>
		                            <div class="Left_STitBx">
		                                <p>고급편집</p>
		                            </div>
		                            <div id="editOption_line">
			                            <ul class="BtBx2">
			                                <li><a href="#" id="btnLineCut"><img src="<c:url value='/images/usolver/com/map/left/left_b01_off.png'/>"   class="onoffimg"  alt="선분할"  title="선분할"/></a></li>
			                                <li><a href="#" id="btnLineMerge"><img src="<c:url value='/images/usolver/com/map/left/left_b02_off.png'/>"  class="onoffimg"  alt="선병합" title="선병합" /></a></li>
			                                <li><a href="#" id="btnDirectChg"><img src="<c:url value='/images/usolver/com/map/left/left_b03_off.png'/>"  class="onoffimg"  alt="방향전환" title="방향전환" /></a></li>
			                                <li><a href="#" id="btnOverSignRemove"><img src="<c:url value='/images/usolver/com/map/left/left_b04_off.png'/>"  class="onoffimg"  alt="상월표시제거" title="상월표시제거" /></a></li>
			                                <li><a href="#" id="btnCrossPointMng"><img src="<c:url value='/images/usolver/com/map/left/left_b05_off.png'/>"  class="onoffimg"  alt="교차지점관리" title="교차지점관리" /></a></li>
			                            </ul>
		                            </div> 
		                            <div id="editOption_polygon" style="display:none;">
			                            <ul class="BtBx2">
			                                <li><a href="#" id="btnPolygonCut"><img src="<c:url value='/images/usolver/com/map/left/left_b07_off.png'/>"   class="onoffimg"  alt="면분할"  title="면분할"/></a></li>
			                                <li><a href="#" id="btnPolygonMerge"><img src="<c:url value='/images/usolver/com/map/left/left_b08_off.png'/>"  class="onoffimg"  alt="면병합" title="면병합" /></a></li>
			                            </ul>
		                            </div>
		                        </div>
		                        <!-- //고급편집 -->
		                        <!-- 편집룰 -->
		                        <div class="Left_SBx1" id="divEditRule">
		                            <div class="Left_STitBx">
		                                <p>편집 룰</p>
		                            </div>
		                            <div class="scroll">
		                                <dl class="SBx">
		                                	<dd class="TxBx2"><input type="checkbox" id="chkLineEndAdd"/> <label>추가시, 관말에 시설추가</label></dd>
		                                    <dd class="TxBx2">
		                                        <select id="selApplyLayer" class="select" style="width:100%;">
		                                            <option value="" selected>적용할 관말시설 선택</option>
								   					<option value="WTL_META_PS" >급수전계량기</option>
								   					<option value="WTL_CLFR_PS" >소화전</option>
								   					<option value="WTL_CLFR_PS" >급수탑</option>	
		                                        </select>
		                                    </dd>
		                                    <dd class="TxBx2"><input type="checkbox" id="chkLineTouch"/> <label>추가시, 배수관과 연결확인</label></dd>		                                    
		                                    <dd class="TxBx2"><input type="checkbox" id="chkLineOverDel"/> <label>삭제시, 관로상의 시설삭제</label></dd>
		                                    <dd class="TxBx2"><label>ㆍ이격거리로 이동</label></dd>
		                                    <dd>X:&nbsp;<input type="text" id="chkMoveX" style="width:60px;"/>&nbsp;&nbsp;Y:&nbsp;<input type="text" id="chkMoveY" style="width:60px;"/>&nbsp;<a id="moveFeaturebyXY" href="#"><img src="/images/usolver/com/map/left/left_d07_off.png"  class="onoffimg"  alt="시설물이동" /></a></dd>		                                    
		                                </dl>
		                                <dl class="SBx">		                                    
		                                </dl>
		                            </div>
		                        </div>
		                     </div>
		                     <!-- 하수시설물 -->
		                     <div id="divEditOptionSWL" style="display:none;">
		                     	<!-- 고급편집 -->
		                        <div class="Left_SBx1" id='divAdvancedEdit'>
		                            <div class="Left_STitBx">
		                                <p>고급편집</p>
		                            </div>
		                            <ul class="BtBx2">
		                                <li><a href="#" id="btnLineCut"><img src="<c:url value='/images/usolver/com/map/left/left_b01_off.png'/>"   class="onoffimg"  alt="선분할"  title="선분할"/></a></li>
		                                <li><a href="#" id="btnLineMerge"><img src="<c:url value='/images/usolver/com/map/left/left_b02_off.png'/>"  class="onoffimg"  alt="선병합" title="선병합" /></a></li>
		                                <li><a href="#" id="btnDirectChg"><img src="<c:url value='/images/usolver/com/map/left/left_b03_off.png'/>"  class="onoffimg"  alt="방향전환" title="방향전환" /></a></li>
		                                <li><a href="#" id="btnUpMarkDel"><img src="<c:url value='/images/usolver/com/map/left/left_b04_off.png'/>"  class="onoffimg"  alt="상월표시제거" title="상월표시제거" /></a></li>
		                                <li><a href="#" id="btnCrossMng"><img src="<c:url value='/images/usolver/com/map/left/left_b05_off.png'/>"  class="onoffimg"  alt="교차지점관리" title="교차지점관리" /></a></li>
		                            </ul>
		                        </div>
		                        <!-- //고급편집 -->
		                        <!-- 편집룰 -->
		                        <div class="Left_SBx1" id="divEditRule">
		                            <div class="Left_STitBx">
		                                <p>편집 룰</p>
		                            </div>
		                            <div class="scroll">
		                                <dl class="SBx">
		                                	<dd class="TxBx2"><input type="checkbox" id="chkLineEndAdd"/> <label>추가시, 관말에 시설추가</label></dd>
		                                    <dd class="TxBx2">
		                                        <select id="selApplyLayer" class="select" style="width:100%;">
		                                            <option value="" selected>적용할 관말시설 선택</option>
								   					<option value="WTL_META_PS" >급수전계량기</option>
								   					<option value="WTL_CLFR_PS" >소화전</option>
								   					<option value="WTL_CLFR_PS" >급수탑</option>	
		                                        </select>
		                                    </dd>
		                                    <dd class="TxBx2"><input type="checkbox" id="chkLineTouch"/> <label>추가시, 배수관과 연결확인</label></dd>		                                    
		                                    <dd class="TxBx2"><input type="checkbox" id="chkLineOverDel"/> <label>삭제시, 관로상의 시설삭제</label></dd>
		                                    <dd class="TxBx2"><label>ㆍ이격거리로 이동</label></dd>
		                                    <dd>X:&nbsp;<input type="text" id="chkMoveX" style="width:60px;"/>&nbsp;&nbsp;Y:&nbsp;<input type="text" id="chkMoveY" style="width:60px;"/>&nbsp;<a id="moveFeaturebyXY" href="#"><img src="/images/usolver/com/map/left/left_d07_off.png"  class="onoffimg"  alt="시설물이동" /></a></dd>		                                    
		                                </dl>
		                                <dl class="SBx">		                                    
		                                </dl>
		                            </div>
		                        </div>		                     
		                     </div> 
		                     <!-- 도로 -->
		                     <div id="divEditOptionRDL" style="display:none;">
		                     	<!-- 고급편집 -->
		                        <div class="Left_SBx1" id='divAdvancedEdit'>
		                            <div class="Left_STitBx">
		                                <p>고급편집</p>
		                            </div>
		                            <div class="STx1">등간격 시설물 자동추가 <a href="#"><img src="/images/usolver/com/map/left/btn_guide_off.gif"  class="onoffimg"  alt="도움말" /></a></div>
		                            <ul class="BtBx3">		                                		                             
		                                <li><dd><a id="btnAddRefEditLine" href="#"><img src="/images/usolver/com/map/left/left_d01_off.png"  class="onoffimg"  alt="참조선입력" /></a></dd><dt>참조선<br />입력</dt></li>
		                                <li><dd><a id="btnRemoveRefEditLine"  href="#"><img src="/images/usolver/com/map/left/left_d02_off.png"  class="onoffimg"  alt="참조선삭제" /></a></dd><dt>참조선<br />삭제</dt></li>
		                                <li><div class="ArrowBx"><img src="/images/usolver/com/map/left/arrow.gif" alt="arrow" /></div></li>
		                                <li><dd style="height:35px;vertical-align:middle;padding: 4px 0 0 0;"><input id="stdDist" style="width:30px;"></input> m <br/></dd><dt>기준거리</dt></li>		                                
		                                <li><dd>&nbsp;&nbsp;<a id="btnGetPoint" href="#"><img src="/images/usolver/com/map/left/left_d03_off.png"  class="onoffimg"  alt="시설물생성" /></a></dd><dt>시설물<br />생성</dt></li>		                                
		                            </ul>
		                            <div class="STx1">시설물 복제(도형+속성) <a href="#"><img src="/images/usolver/com/map/left/btn_guide.gif"  class="onoffimg"  alt="도움말" /></a></div>
		                            <ul class="BtBx4">
										<li><dd><a id="btnSelectFeature" href="#"><img src="/images/usolver/com/map/left/left_d04_off.png"  class="onoffimg"  alt="복제할 시설물 선택" /></a></dd><dt>복제할<br>시설선택</dt></li>
		                                <!-- <li><dd><a id="btnCopyFeature" href="#"><img src="/images/usolver/com/map/left/left_d04_off.png"  class="onoffimg"  alt="시설물복제" /></a></dd><dt>시설물<br />복제</dt></li> -->
		                                <li><dd><a id="btnCancelFeature" href="#"><img src="/images/usolver/com/map/left/left_d05_off.png"  class="onoffimg"  alt="복제 후 추가된 시설물을 삭제합니다" /></a></dd><dt>시설물<br />복제취소</dt></li>
		                                <li><div class="ArrowBx"><img src="/images/usolver/com/map/left/arrow.gif" alt="arrow" /></div></li>
		                                <li><dd><a id="btnCopyFeatureStop" href="#"><img src="/images/usolver/com/map/left/left_d06_off.png"  class="onoffimg"  alt="시설물복제종료" /></a></dd><dt>시설물<br />복제종료</dt></li>		                                
		                            </ul>
		                           <div class="STx1">시설물 생성(좌표) <a href="#"><img src="/images/usolver/com/map/left/btn_guide.gif"  class="onoffimg"  alt="도움말" /></a></div>
		                            <ul class="BtBx3">		                                		                                 
		                                <li><dd>X:&nbsp;<input id="txtCoordX" value="412359.93" style="width:70px;"/>&nbsp;&nbsp;Y:&nbsp;<input id="txtCoordY" value="229789.31" style="width:70px;"/>&nbsp;&nbsp;<a id="btnMakeFeaturebyXY" href="#"><img src="/images/usolver/com/map/left/left_d07_off.png"  class="onoffimg"  alt="시설물생성" /></a></dd></li>
		                            </ul>	 
		                                                    
		                        </div>
		                        <!-- //고급편집 -->
		                     	<!-- 편집룰 -->
		                        <div class="Left_SBx1" id="divEditRule">
		                            <div class="Left_STitBx">
		                                <p>편집 룰</p>
		                            </div>
		                            <div class="scroll">
		                                <dl class="SBx">
		                                    <dd class="TxBx2"><label><input type="checkbox" id="chkLineTouch"/> 추가시, 도로면(보도면)내에 위치</label></dd>		                                    
		                                    <dd class="TxBx2"><label>ㆍ이격거리로 이동</label></dd>
		                                    <dd>X:&nbsp;<input type="text" id="chkMoveX" style="width:80px;"/>&nbsp;&nbsp;Y:&nbsp;<input type="text" id="chkMoveY" style="width:80px;"/></dd>
		                                </dl>		                                
		                            </div>
		                        </div>		                     
		                     </div> 
	                    </div>
	                    <!-- // 스냅설정 -->
	                	<div id="divSnapMng" style="display:none;">
	                		<!-- 편집옵션 -->
	                        <div class="Left_SBx1">
	                            <div class="Left_STitBx">
	                                <p>스냅거리 설정</p>
	                            </div>
	                            <dl class="SBx" style="padding-bottom:20px;">
	                                <dd><label>스냅거리 : </label><input type="text" id="txtSnapDist" style="width:40%;" value="10"/>
	                                <select id="selSnapUnit" class="select">
		                                 <option value="pixel" selected>Pixel</option>
								   		 <option value="meter" >Meter</option>								   					
		                             </select></dd>	                                
	                            </dl>
	                            <dl class="SBx">
	                            	<input type="checkbox" id="chkShowSnapDist"/> 지도상에 스냅거리 표출
	                            </dl> 
	                            <p></p>
	                            <p></p>   
	                            <div class="Left_STitBx">
	                                <p>스냅대상 설정</p>
	                            </div>
	                            <div id="snapMng">
	                            <dl class="SBx" style="line-height:1.5;padding-bottom:20px;"> 
                          
	                            </dl>       
	                            <p></p>       
	                            <!-- <button id="btnSnapSetting"> 스냅 적용 </button>  -->
	                            <li><a id="btnSnapSetting" href="#"><img src="/images/usolver/com/map/left/btn_snap_off.png"  alt="스냅 적용" /></a></li>         
	                            </div>
	                            <!-- jqGrid 적용  -->
	                            <!-- <div id="pager1"><table id="list4"></table></div> -->
	                        </div>
	                	</div>
	                    <!-- //편집룰 -->
	                    <div class="LeftTabBx tabEdit" id="tabEdit">
		                    <ul>
		                    	<li><a id="tabEditTool" href="#" class="LeftTab_selected" onclick="return false;">편집도구</a></li>
		                    	<li class="tabline"></li>
		                        <li><a id="tabSnapMng" href="#" class="LeftTab" onclick="return false;">스냅설정</a></li>
		                        <li class="tabline"></li>
		                        <li><a id="tabEditMng" href="#" class="LeftTab" onclick="return false;">편집환경</a></li>
		                        <li class="tabline"></li>
		                        <li><a id="tabEditHistory" href="#" class="LeftTab" onclick="return false;">편집이력</a></li>
	                        </ul>
	                    </div>
                	</div>                	
                    <!-- 의사결정지원 컨텐트 탭 -->
                    <div id="decisionTab" style="display : none;">    
		                <!-- 계량기 누수 분포도 -->
		                <div class="Left_SBx1">
		                	<div class="Left_STitBx">
		                    	<p> 누수 분포도</p>
		                    </div>
		                	<ul class="BtBx3" style="padding:4px;">
		                    	<li><a href="#" id="btnHeatmapShow"><img src="/images/usolver/com/map/left/left_e01_off.png"  class="onoffimg"  alt="누수분포도" /></a></li>
		                    	<li><a href="#" id="btnHeatmapHide"><img src="/images/usolver/com/map/left/left_e02_off.png"  class="onoffimg"  alt="누수분포도닫기" /></a></li>
		                    	<li><a href="#" id="btnMapchartShow"><img src="/images/usolver/com/map/left/left_e03_off.png"  class="onoffimg"  alt="누수현황" /></a></li>
		                    	<li><a href="#" id="btnMapchartHide"><img src="/images/usolver/com/map/left/left_e04_off.png"  class="onoffimg"  alt="누수현황닫기" /></a></li>
		                    </ul>
		                </div>
		                <!-- //계량기 누수 분포도 -->
		                
		                <!-- 노후관 분포도 -->
		                <div class="Left_SBx1">
		                	<div class="Left_STitBx">
		                    	<p>노후관 분포도</p>
		                    </div>
		                	<ul class="BtBx3" style="padding:4px;">
		                    	<li><a href="#" id="btnWornFacilityShow"><img src="/images/usolver/com/map/left/left_f01_off.png"  class="onoffimg"  alt="노후관주제도" /></a></li>
		                    	<li><a href="#" id="btnWornFacilityHide"><img src="/images/usolver/com/map/left/left_f02_off.png"  class="onoffimg"  alt="노후관주제도닫기" /></a></li>
		                    </ul>
		                    <dl class="SBx" style="padding-top:8px;">
		                        <dd class="TxBx5">행정구역 :</dd>
		                        <dd class="TxBx6"><select name="select" class="select"  style="width:90px;"><option></option></select> <select name="select" class="select"  style="width:90px;"><option></option></select></dd>
		                    </dl>
		                    <dl class="SBx">
		                        <dd class="TxBx5">준공연도 :</dd>
		                        <dd class="TxBx6"><select name="select" class="select"  style="width:180px;"><option></option></select></dd>
		                    </dl>
		                    <dl class="SBx">
		                        <dd class="TxBx2">사용자 영역으로검색<input type="checkbox" /></dd>
		                    </dl>
		                    <div class="SBx5">
		                    	<a href="#"><img src="/images/usolver/com/map/left/btn_search2_off.png"  class="onoffimg"  alt="검색하기" /></a> 
		                    	<a href="#"><img src="/images/usolver/com/map/left/btn_excel_off.png"  class="onoffimg"  alt="엑셀다운로드" /></a>
		                    </div>
		                </div>
		                <!-- //노후관 분포도 -->
		                
		                <!-- 사용자자료 시각화(공간) -->
		                <div class="Left_SBx1">
		                	<div class="Left_STitBx">
		                    	<p>사용자자료 시각화(공간)</p>
		                    </div>
		                	<ul class="BtBx3">
		                    	<li><a href="#"><img src="/images/usolver/com/map/left/left_g01_off.png"  class="onoffimg"  alt="사용자자료" /></a></li>
		                    	<li><a id="btnClearGeoCodeData" href="#"><img src="/images/usolver/com/map/left/left_g02_off.png"  class="onoffimg"  alt="변화자료닫기" /></a></li>
		                    </ul>
		                </div>
		                <!-- //사용자자료 시각화(공간) -->
                    </div>
                    
                    
                    <!-- // LeftBox1 -->
                </div>
                <!-- // leftCont -->
            </div>
            <!-- //cont -->
            
            <div id="roadView" style="width:550px;height:550px; display : none; position : absolute; top:53px; bottom : 3px; left : 0; right : 800px; z-index: 10;">
            
            </div>
            <!-- <div id="desktopOnMap"></div>	 -->
            <!--  imajbox 영역 -->            
            <div id="imajnetContainer" style="z-index:999"></div>
            
            
            
            <!--  지도영역 -->
            <div id="daumMap" class="map" style="z-index:0"></div>
            <div id="naverMap" class="map" style="z-index:0"></div>
            <div id="dawulMap" class="map" style="z-index:0"></div>
            <div id="map" class="map">
                <div class="STab" style="z-index : 4000;">
                    <ul>
                        <li><a id="btn_map_nomal" href="#" onclick="return false;" class="STab_m1_selected" title="2D 맵 On/Off">일반</a></li>
                        <li><a id="btn_map_satelite" href="#" onclick="return false;" class="STab_m1" title="항공사진 On/Off">항공사진</a></li>
                    </ul>
                </div>
               	<div style="position: absolute; right : 20px; bottom : 225px; z-index : 9999;">
               		<a id="btn_roadView" href="#"><img src="<c:url value='/images/usolver/com/map/btn_loadview.png'/>"></img></a>
               	</div>
                <div class="map_scale" style="z-index :4000">
                    <a id="customZoomIn" href="#" onclick="return false;" class="plus"><img src="<c:url value='/images/usolver/com/map/btn_plus.png'/>" alt="확대" title="확대" /></a>
                    <div class="pbx">
                        <a id="scale_pointer" href="#" onclick="return false;" class="pointer"><img src="<c:url value='/images/usolver/com/map/btn_bpoint.png'/>" alt="포인터" title="포인터" /></a>
                    </div>
                    <a id="customZoomOut" href="#" onclick="return false;" class="minus"><img src="<c:url value='/images/usolver/com/map/btn_minus.png'/>" alt="축소" title="축소" /></a>
                </div>
                <div class="map_InputBx" style="z-index:4000">
                    <input id="txtSacle" type="text" value="" />
                </div>
                <div class="map_MagBx" style="z-index:4000">
                    <a id="btnZoomOut" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/ico_minus.png'/>" alt="축소" title="축소" /></a>
                    <a id="btnZoomIn" href="#" onclick="return false;"><img src="<c:url value='/images/usolver/com/map/ico_plus.png'/>" alt="확대" title="확대" /></a>
                </div>
                <div class="index" id="index" style="z-index : 4000;">
                    <div class="btArea" style="z-index : 4000;">
                        <a href="#" id="indexOffBt" onclick="indexClose(); return false;"><img src="<c:url value='/images/usolver/com/map/btn_map_close.gif'/>" alt="닫기" title="닫기" /></a>
                        <a href="#" class="hidden" id="indexOnBt" onclick="indexOpen(); return false;"><img src="<c:url value='/images/usolver/com/map/btn_map_open.gif'/>" alt="열기" title="열기" /></a>
                    </div>
                    <div class="indexmap">
                        <div id="indexMap" class="mapArea" style="z-index : 4000; width:136px; height:98px; background-color : white;"></div>
                    </div>
                </div>
               
				<div id="timeLinBx" class="timeLinBx" style="display:none;bottom:100%;">
					<div id="timeBar" class="timeBar" style="margin-bottom:2px; margin-left:2px; margin-top:3px; height:25px;">
				        <div class="tSelectBx">
				            <div class="tSelect">
				            	<div id="tSelectTx" class="tSelectTx"><li id="0" style="cursor: pointer;">전체</li></div>
									<ul id="tSelectList" class="tList" style="display:none; position: absolute; z-index: 99; top: 31px;">	
										<li id="0" style="cursor: pointer; display:none;">전체</li>
										<li id="1" style="cursor: pointer;">추가</li>
										<li id="2" style="cursor: pointer;">수정</li>
										<li id="4" style="cursor: pointer;">삭제</li>
									</ul>
				                <div class="tSelect_bt">
				                    <a href="#"><img src="../extLib/jquery/ui/css/images/btn_tselect.png" onMouseOver="this.src='../extLib/jquery/ui/css/images/btn_tselect_on.png'" onMouseOut="this.src='../extLib/jquery/ui/css/images/btn_tselect.png'" alt="arrow"/></a>
				                </div>
				            </div>
				        </div>
				        <ul class="timeLegend" id="timeLegend">
				            <li><img src="../extLib/jquery/ui/css/images/edit_state_1.png" alt="추가"/><span class="ttitle1">추가</span></li>
				           	<li><img src="../extLib/jquery/ui/css/images/edit_state_2.png"  alt="수정"/><span class="ttitle2">수정</span></li>
				            <li><img src="../extLib/jquery/ui/css/images/edit_state_4.png"alt="삭제"/><span class="ttitle3">삭제</span></li>
				        </ul>
				        <div class="Close" style="float:right;"><a href="#"><img id="popup_timeLinBx_close" src="/images/usolver/com/map/top/top_btn_close.png" onMouseOver="this.src='/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='/images/usolver/com/map/top/top_btn_close.png'" alt="닫기" /></a></div>
				    </div>
				    <div id="timeLine" ></div>
				</div>
            </div>
            <!-- //map -->
            
        </div>
        <!-- //edit -->
        <div>
	        <!-- 편집모니터 시작-->
			<div id="editMonitor" title="편집모니터">
				<div id="editMonitorList">
					<span id="editListTree"></span>
				</div>
				<div id="editMonitorContent">
					<span id="editContent"></span>
				</div>
			</div>
			<!-- 편집모니터 끝-->
			
			<!-- 속성조회 결과창 시작--><div id="attrViewer" title="검색결과">
				<div id="attrSearchList">
					<span id="searchListTree"></span>
				</div>
				<div id="attrSearchContent">
					<span id="searchContent"></span>
				</div>
			</div>
			
			<!-- 속성조회 결과창 끝-->
			
			<!--  도형선택 시작-->
			<div id="toolbar" class="ui-widget-header ui-corner-all">
			 ...........
			</div>
			<!--  도형선택 끝-->
			
	        <!-- message pop 시작-->
			<div id="dialog-message" title="Title" style="display:none;">
			  <p>
			    <span class="ui-icon ui-icon-circle-check" style="float:left; margin:5px 7px 50px 0;"></span>
			  </p>
			  <p id="detailMessage" style="margin:5px 0 0 0;"></p>
			</div>
			
			<!-- 레이어 추가/제거  팝업 -->
			<div id="layerAddRemovePane" style="display : none;">
			   <div id="W_930">
			      <!-- header -->
			      <div id="P2_Header">
			         <div class="Ico"><img src="<c:url value='/images/usolver/com/map/top/top2_ico_3.png'/>" alt="즐겨찾기아이콘'/>"/></div>
			         <div class="Title">맵 구성</div>
			         <div class="Close"><a href="#" id="btn_close_layeradd"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>"  class="onoffimg" title="닫기" alt="닫기"/></a></div>
			      </div>
			      <!-- // header -->
			      <!-- layerOrg -->
			      <div id="layerOrg">
					
					<div class="layer_all">
			            <div class="TitBx">
			               <dl>
			                  <dt>추가 가능 레이어</dt>
			                  <dd></dd>
			               </dl>
			            </div>
			            <div class="ContBx"> 
			               <div class="list_pd">
			                  <div id="divAllLayerTree"></div>
			               </div>
			            </div>
			         </div>
					 
					 <div class="layer_selectui">
						<div class="addremove">
							<ul>
								<li>
									<img src="<c:url value='/images/usolver/com/map/dragndrop.png'/>" title="레이어를 drag & drop으로 이동하세요."/> 
								</li>
								<li>
									drag & drop <br />
									으로 <br />
									이동하세요.
									
								</li>
							</ul>
						</div>
					 </div>
					 
					 <div class="layer_select">
			            <div class="TitBx">
			               <dl>
			                  <dt>선택된 레이어</dt>
			                  <dd></dd>
			               </dl>
			            </div>
			            <div class="ContBx"> 
			               <div class="list_pd">
			                  	<div id="divSelLayerTree"></div>
			               </div>
			            </div>
			         </div>
					 
			      </div> 
			      <div id="P2_Bottom">
			      	<div>
				      	<a href="#" id="btn_layer_change"><img src="<c:url value='/images/usolver/com/map/btn_ok.png'/>" title="레이어 변경 적용" alt="레이어 변경 적용"/></a>
		                <a href="#" id="btn_layer_changecancel"><img src="<c:url value='/images/usolver/com/map/btn_cancel.png'/>" title="레이어 변경 취소" alt="레이어 변경 취소"/></a>
			      	</div>
			      </div>
			   </div>
			</div>   
			<!--// 레이어 추가/제거 팝업 끝  -->
			
			<!-- 주제도 생성 팝업 -->
			<div id="popup_subject" class="W_400" style="top:100px; left:500px; height:450px; display: none; z-index:1100; ">
			   <!-- header -->
			   <div id="P3_Header">
			      <div class="Title2">맵 만들기</div>
			      <div class="Close"><a id="btn_popup_subject_close" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_off.png'"  alt="닫기"/></a></div>
			   </div>
			   <!-- // header -->
			   <div id="FavAdd" class="memo">
			      <div class="Table_LBx">
			         <div class="Table_left">
				   	  <form id="subjectForm" name="subjectForm" method="post" action="<c:url value='/saveSubject.do'/>" enctype="multipart/form-data">
				            <input type="hidden" id="DATA_PROC" name="DATA_PROC"></input>
				            <input type="hidden" id="SEL_SUBJECT_ID" name="SEL_SUBJECT_ID" ></input>
				            <table>
				               <colgroup>
				                  <col width="30%" />
				                  <col width="70%" />
				               </colgroup>		
				               <tbody>	
				               <security:authorize ifAllGranted ="ROLE_ADMIN" >	               
				               <tr>
				                  <th>시스템 기본 맵 설정</th>
				                  <td> 
										<select id="SYSTEM_MAP">
											<option value="">선 택</option>
											<option value="Y">시스템 기본맵으로 사용</option>
											<option value="N">시스템 기본맵으로 사용안함</option> 
										</select>
								  </td>
				               </tr>	
				               </security:authorize>	               
				               <tr>
				                  <th>내 기본 맵 설정</th>
				                  <td> 
										<select id="BASE">
											<option value="">선 택</option>
											<option value="Y">내 기본맵으로 사용</option>
											<option value="N">내 기본맵으로 사용안함</option> 
										</select>
								  </td>
				               </tr>	               
				               <!-- <tr>
				                  <th>맵 공유(*)</th>
	
				                  <td>
				                  	
				                  	<div id="subjectSel1">
					                  	<select id="SUBJECT_SHARE">
											<option value="">선 택</option>
											<option value="ALL">전체 공유</option>
											<option value="DEPT">부서 공유</option>
											<option value="PER">개인 공유</option>
											<option value="NONE">공유 안함</option> 
										</select>
				                  	</div>
									<div id="subjectSel2"> 그룹 
										<select id="SUBJECT_GROUP">
											<option value="">선 택</option>
											<option value="BASE">기본도</option>
											<option value="RDL">도로 시설물도</option>
											<option value="WTL">상수 시설물도</option>
											<option value="SWL">하수 시설물도</option>
											<option value="UND">지하 시설물도</option>
											<option value="ETC">기타</option> 
										</select>
									</div>
								  </td>
				               </tr> -->
				               <tr>
				                  <th>맵 명칭(*)</th>
	
				                  <td><input id="SUBJECT_NAME" name="SUBJECT_NAME" class="input" style="width:95%;"></input> </td>
				               </tr>
				               <tr>
				                  <th>맵 설명(*)</th>
	
				                  <td><textarea id="SUBJECT_DESC" name="SUBJECT_DESC" class="textarea" style="width:95%;height:75px;"></textarea> </td>
				               </tr>
				               <tr>
				                  <th>스냅샷 이미지 등록</th>
				                  <td>
				                  	<div class="upload">				                  		                  	
				                  	<input name="files[0]" id="subject_file" type="file" style="visibility:hidden; width:192px;" class="input" accept="image/*" multiple />
				                  	<label for="subject_file" style="background:url(/images/usolver/com/map/p_btn_add.gif) no-repeat; display:inline-block;width:26px; height:26px;"> &nbsp;</label>			
				               		</div>
				                  </td>
				               </tr>
				               <tr>
				               		<td colspan="2">
				               		   	<div id="imgSubjectThumbs" name="imgSubjectThumbs" style="width:350px" >
				               		   		<ul id="imgSubjectThumbslst" class="imglst" style="width:800px; height:100px;"><li></li></ul>
				               		   	</div>
				               		</td>
				               </tr>
				               </tbody>
				            </table>
				   	  </form>
			         </div>
			      </div>			     
			   </div>
				<div class="Btn_R">
				    <div class="Btn"><a id="btn_save_subject" href="#" class="Btn_02">저장</a></div>
				    <div class="Btn"><a id="btn_close_subject" href="#" class="Btn_02">취소</a></div>
				 </div> 
			    
			</div> 
			<!-- 주제도 생성 끝 -->	
			
			<!-- 즐겨 찾기 팝업 -->
			<div id="favoritePane" style="display: none;">
			   <div class="Top_arrow" style="padding-left:228px;"><img src="<c:url value='/images/usolver/com/map/top/top_arrow.png" alt="arrow'/>"/></div>
			   <div id="W_920">
			      <!-- header -->
			      <div id="P2_Header">
			         <div class="Ico"><img src="<c:url value='/images/usolver/com/map/top/top2_ico_3.png'/>" alt="즐겨찾기아이콘'/>"/></div>
			         <div class="Title">지도 즐겨찾기</div>
			         <div class="Close"><a href="#" id="btn_close_favorites"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>"  class="onoffimg" title="닫기" alt="닫기"/></a></div>
			      </div>
			      <!-- // header -->
			      <!-- favorite -->
			      <div id="favorite">
			         <div class="fav_left">
			            <div class="TitBx">
			               <dl>
			                  <dt>즐겨찾기그룹</dt>
			                  <dd><a id="btn_add_favoritesGroup" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_add_off.gif'/>"  class="onoffimg"  title="추가" alt="추가"/></a></dd>
			               </dl>
			            </div>
			               <dl id="fav_dummyGroup" style="display: none">
			                  <dt>공유</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify_off.gif'/>"  class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#" style="display: none;"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del_off.gif'/>"  class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			            <div class="fav_list">
			            </div>
			         </div>
			         <div class="fav_content">
			            <div class="TitBx">
			               <dl>
			                  <dt>즐겨찾기 리스트</dt>
			                  <dd style="padding-left: 10px;"><a id="btn_add_favorites" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_add_off.gif'/>"  class="onoffimg"  title="추가" alt="추가"/></a></dd>
			                  <dd>
				                  <div class="SearchBx">
						               <div class="Search">
						                  <dl>
						                     <dt><input type="text" value="" /></dt>
						                     <dd style="padding: 2px 2px 0 0;"><a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_search_off.png'/>"  class="onoffimg"  title="검색" alt="검색"/></a></dd>
						                  </dl>
						               </div>
						           </div>
			                  </dd>
			               </dl>
			            </div>
			            <!-- 즐겨찾기개별항목 dummy -->
			               <div class="list_pd" id="fav_dummy" style="display: none">
			                  <div class="fav_bx">
			                     <div class="fav_imgbg">
			                        <div class="fav_img"><img src="<c:url value='/images/usolver/com/map/img1.gif'/>" alt="test_img" style="cursor:pointer;width: 165px;height: 87px;"/></div>
			                     </div>
			                     <div class="fav_tx">
			                        <dl>
			                           <dt>즐겨찾기 개별항목 </dt>
			                           <dd>지도의 즐겨찾기 리스트중 즐겨찾기<br />개별항목의 내용입니다.</dd>
			                        </dl>
			                     </div>
			                     <div class="fav_bt">
			                        <dl>
			                           <dt><a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn2_share_off.gif'/>"  class="onoffimg"  title="즐겨찾기" alt="즐겨찾기"/></a></dt>
			                           <dd>
			                              <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn2_modify_off.gif'/>"  class="onoffimg"  title="수정" alt="수정"/></a>
			                              <a href="#" style="display: none;"><img src="<c:url value='/images/usolver/com/map/p_btn2_cancel_off.gif'/>"  class="onoffimg"  title="취소" alt="취소"/></a> 
			                              <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn2_del_off.gif'/>"  class="onoffimg"  title="삭제" alt="삭제"/></a>
			                           </dd>
			                        </dl>
			                     </div>
			                  </div>
			               </div> 
			            <!-- // 즐겨찾기개별항목 -->
			            <div class="ContBx" id="favList"></div>
			         </div>
			      </div> <!-- // favorite -->
			   </div>
			</div>   <!--// 즐겨찾기 팝업 끝  -->
			</div>
			
			<!-- 즐겨찾기 그룹 추가 -->
			<div id="popup_favoritesGroup" class="W_400" style="top : 126px; left : 280px; display: none;">
			   <!-- header -->
			   <div id="P3_Header">
			      <div class="Title2">즐겨찾기 그룹 추가</div>
			      <div class="Close"><a id="btn_close_favoritesGroup" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>"  class="onoffimg"   alt="닫기"/></a></div>
			   </div>
			   <!-- // header -->
			   <div id="FavAdd">
			      <div class="Table_LBx">
			         <div class="Table_left">
			            <table>
			               <colgroup>
			                  <col width="30%" />
			                  <col width="70%" />
			               </colgroup>
			               <tr>
			                  <th>즐겨찾기 그룹 명칭</th>
			                  <td><input type="text" style="width:93%;" class="input" value="" /></td>
			               </tr>
			            </table>
			         </div>
			      </div>
			      <div class="Btn_R">
			         <div class="Btn"><a href="#" class="Btn_02">저장</a></div>
			      </div>
			   </div>
			</div> <!-- 즐겨찾기 그룹 추가 끝 -->
						
			<!-- 즐겨찾기 추가 -->
			<div id="popup_favorites" class="W_400" style="top : 145px; left : 900px; display: none; height: 280px;">
			   <!-- header -->
			   <div id="P3_Header">
			      <div class="Title2">즐겨찾기 추가</div>
			      <div class="Close"><a id="btn_close_favoritesAddPopup" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>"  class="onoffimg"   alt="닫기"/></a></div>
			   </div>
			   <!-- // header -->
			   <div id="FavAdd">
			      <div class="Table_LBx">
			         <div class="Table_left">
			            <table>
			               <colgroup>
			                  <col width="30%" />
			                  <col width="70%" />
			               </colgroup>
			               <tr>
			                  <th>즐겨찾기명칭</th>
			                  <td><input type="text" style="width:93%;" class="input" value="" /></td>
			               </tr>
			               <tr>
			                  <th>즐겨찾기내용</th>
			                  <td><textarea name="textarea" class="textarea" style="width:95%; height:85px;"></textarea> </td>
			               </tr>
			               <tr>
			                  <th>즐겨찾기그룹</th>
			                  <td>
			                     <select name="select" class="select"  style="width:200px;">
			                     </select>
			                  </td>
			               </tr>
			            </table>
			         </div>
			      </div>
			      <div class="Btn_R">
			         <div class="Btn"><a href="#" class="Btn_02">저장</a></div>
			      </div>
			   </div>
			</div> <!-- 즐겨찾기 추가 끝 -->
			
			
			<!-- 연계 설정 팝업 -->
			<div id="linkPane" style="display : none;">
			   <div class="Top_arrow" style="padding-left:175px;"><img src="<c:url value='/images/usolver/com/map/top/top_arrow.png" alt="arrow'/>"/></div>
			   <div id="W_350">				
					<!-- header -->
					<div id="P2_Header">
				    	<div class="Ico"><img src="/images/usolver/com/map/top/top2_ico_2.png" alt="위치검색아이콘"/></div>
				    	<div class="Title">연계설정</div>
				    	<div class="Close"><a id="btn_close_link" href="#"><img src="/images/usolver/com/map/top/top_btn_close_off.png"  class="onoffimg"   alt="닫기"/></a></div>
				    </div>
				    <!-- // header -->
				    
				    
				    <div id="Link">
				    	<div class="PTab">
				        	<ul>
				            	<li><a href="#" class="Tab2_selected">국공</a></li>
				            	<li><a href="#" class="Tab3">지하시설물</a></li>
				            	<li><a href="#" class="Tab3">일사편리</a></li>
				            </ul>
				        </div>
				        
				        <div class="PBx1">
				        	<div class="PBx_s1">
				        		<div class="Tx01">연계대상 서버 주소:</div><input type="text" id="url" class="input" value="http://127.0.0.1:8888/" style="width:189px;">
				        		
				            	<div class="Tx01">연계대상 지도:</div>
				                <div class="ListBx">
				                <select name="select" class="input2" multiple style="width:99%; height:60px;">
				                            <option selected="selected">지적</option>
				                            <option>새주소</option>
				                            <option>도로</option>
				                            <option>도시계획(용도지역)</option>
				                            <option>도시계획(용도지구)</option>
				               </select>
				                </div>
				            </div>
				            
				        	<div class="PBx_s1">
				            	<div class="Tx02">동기화 주기 설정</div>
				                <div class="BgBx">
				                	<div class="LCon">
				                    	<ul>
				                        	<li><input id="inputO" type="radio" name="cycle" value="O" checked="checked" /> <label for="inputO">한번(N)</li></label>
				                        	<li><input id="inputD" type="radio" name="cycle" value="D" /> <label for="inputD">매일(D)</li></lable>
				                        	<li><input id="inputW" type="radio" name="cycle" value="W" /> <label for="inputW">매주(W)</li></lable>
				                        	<li><input id="inputM" type="radio" name="cycle" value="M" /> <label for="inputM">매월(M)</li></lable>
				                        </ul>
				                    </div>
				                    <div class="RCon">
				                    	<div class="Bx1">
				                        	시작 : <input type="text" id="datepicker" class="input" value="" style="width:70px;">
				                        </div>
				                        <div id="divDay" class="Bx2" style="display:none;">
				                        	매(C) : <input type="text" style="width:40px;" class="input" value="" /> 일마다
				                        </div>
				                        <div id="divWeek" class="Bx3" style="display:none;">
				                        	<div class="Tx1">주마다 다음 요일에 :</div>
				                        	<div class="Tx2">
				                            	<dl>
				                                	<dd><input type="checkbox" /> 일요일(U) </dd>
				                                    <dd><input type="checkbox" /> 월요일(A) </dd>
				                                    <dd><input type="checkbox" /> 화요일(T) </dd>
				                                    <dd><input type="checkbox" /> 수요일(W) </dd>
				                                    <dd><input type="checkbox" /> 목요일(H) </dd>
				                                    <dd><input type="checkbox" /> 금요일(F) </dd>
				                                    <dd><input type="checkbox" /> 토요일(R) </dd>
				                                </dl>
				                            </div>
				                        </div>
				                        <div id="divMonth" class="Bx3" style="display:none;">
				                        	<div>
				                        	월(H) : <select name="select" class="select"  style="width:95px;">
				                        		<option>1월</option>
				                        		<option>2월</option>
				                        		<option>3월</option>
				                        		<option>4월</option>
				                        		<option>5월</option>
				                        		<option>6월</option>
				                        		<option>7월</option>
				                        		<option>8월</option>
				                        		<option>9월</option>
				                        		<option>10월</option>
				                        		<option>11월</option>
				                        		<option>12월</option></select> 
				                        	</div>
				                        	<div>
				                        	일(A) : <select name="select" class="select"  style="width:95px;">
				                        		<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>
												<option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option>
												<option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option>
												<option>31</option>
				                        		</select> 
				                        	</div>
				                        </div>
				                    </div>
				                </div>
				            </div>
				            
				        	<div class="PBx_s1" style="padding-bottom:0px;">
				            	<div class="Tx02">지도 갱신 이력</div>
				                <div class="Table">
				                            <div class="Table_list3">
				                                <table>
				                                <colgroup>
				                                    <col width="15%" />
				                                    <col width="45%" />
				                                    <col width="40%" />
				                                </colgroup>
				                                <thead>
				                                    <tr> 
				                                        <th>순번</th>
				                                        <th>날짜 및 시간</th>
				                                        <th>레이어</th>
				                                    </tr>
				                                </thead>
				                                <tbody>
				                                    <tr> 
				                                        <td>1</td>
				                                        <td></td>
				                                        <td></td>
				                                    </tr>
				                                    <tr> 
				                                        <td>2</td>
				                                        <td></td>
				                                        <td></td>
				                                    </tr>
				                                    <tr> 
				                                        <td>3</td>
				                                        <td></td>
				                                        <td></td>
				                                    </tr>
				                                    <tr> 
				                                        <td>3</td>
				                                        <td></td>
				                                        <td></td>
				                                    </tr>
				                                </tbody>
				                                </table>
				                                </div>
				                </div>
				            </div>
				            
				        </div>
				        
				        <div class="BtBx">
				            <div class="Btn"><a href="#" id="btn_apply_link" class="Btn_02">확인</a></div>
				        </div>
				    </div>
				
				
				</div>    
			</div>
		<!-- 출력 -->
		<div id="saveMapPane" style="display:none;">
			<div class="Top_arrow" style="padding-left:56px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
            <div id="W_360_2" >
				<!-- header -->
			  <div id="P3_Header">
			    	<div class="Ico"><img src="<c:url value='/images/usolver/com/map/top/top2_ico_1.png'/>" alt="아이콘"/></div>
			    	<div class="Title">지도 저장</div>
			    	<div class="Close"><a href="#" id="btn_saveMap_close"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close.png'/>" onMouseOver="this.src='<c:url value='/images/usolver/com/map/top/top_btn_close_on.png'/>'" onMouseOut="this.src='<c:url value='/images/usolver/com/map/top/top_btn_close.png'/>'"  alt="닫기"/></a></div>
			    </div>
			    <!-- // header -->
			    <div class="savebx">
			       파일명 : <input type="text" id="map_name"></input> 
  			 	</div>
  			  <div class="saveBtn" style="display:block;text-align: right;">
  			  	<a href="#" id="btnSaveMap" style='display: inline;padding-right:20px;'><img src="/images/usolver/com/map/btn_submit.gif" style="padding-top: 7px;"></img></a>
  			  </div>
			</div>	
		</div>
			
		<!-- 출력 -->
		<div id="printPane" style="display:none;">
			<div class="Top_arrow" style="padding-left:80px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
            <div id="W_460_2" >
				<!-- header -->
			  <div id="P3_Header">
			    	<div class="Ico"><img src="<c:url value='/images/usolver/com/map/top/top2_ico_1.png'/>" alt="출력 선택"/></div>
			    	<div class="Title">출력 선택</div>
			    	<div class="Close"><a href="#" id="btn_print_close"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close.png'/>" onMouseOver="this.src='<c:url value='/images/usolver/com/map/top/top_btn_close_on.png'/>'" onMouseOut="this.src='<c:url value='/images/usolver/com/map/top/top_btn_close.png'/>'"  alt="닫기"/></a></div>
			    </div>
			    <!-- // header -->
			    <div class="printbx">
			        <div class="printThumb">
			            <img src="<c:url value='/images/usolver/com/map/print_snapshot.png'/>" width="204" height="171" alt="웹 출력"/>
			            <div class="print_bt">
			                <input type="radio" id="chkBasicPrint" name="print"/> 웹 출력
			            </div>
			        </div>
			        <div class="printThumb" style="margin-left:6px;">
			            <img src="<c:url value='/images/usolver/com/map/printimg4.png'/>" alt="고급 출력"/>
			            <div class="print_bt">
			                <input type="radio" id="chkExpPrint" name="print"/> 고급 출력
			            </div>
			       </div>
  			  </div>
  			  <div id="tempDiv" style=" display:none; width: 1335px;height: 545px"></div>
  			  <form id="printForm" method="post" action="/maputil/save.do">
  			  	<input type="hidden" id="datas" name="datas" />
  			  	<input type="hidden" id="fileName" name="fileName" />
  			  	<!-- <button id="printBtn">확인</button> -->
  			  </form>
  			  <div style="display:block;text-align: right;">
  			  	<a href="#" id="btnPrintSelect" style='display: inline;padding-right:20px;'><img src="/images/usolver/com/map/btn_submit.gif" style="padding-top: 7px;"></img></a>
  			  </div>
			</div>	
		</div>
		
		<!-- 출력 미리보기  팝업 -->
		<div id="printPreview" style="display:none;">
		  <div id="print">  
			<div class="printTitle">
				<span> 인쇄 미리보기 </span>
				<span>
				   <input type="text" id="txtPrintTitle" value="제목을 입력하세요"></input>
				</span> 
			</div>
			<div class="Close"><a id="btn_popup_print_close" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_off.png'"  alt="닫기"/></a></div> 
			<div class="printInfo">
				사용자 : <span id="pirntUser">[ ]</span> 
			</div> 
			<div id="printMap">
				
			</div> 
			<div class="printMsg">
				<span class="msg">업무 참고용으로만 활용하시기 바랍니다.</span> 
				<span class="time">출력일시 : <span id="pirntTime">2016-08-30 15:45</span></span> 
			</div>
		  </div> 
		</div> 
		<!--// 출력 미리보기 팝업 끝  -->
			
		
		<!-- 편집검색 -->
		<div id="editSearchPane" style="display: none">
			<div class="Top_arrow" style="padding-left:160px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
			<div id="W_348">
				<div class="fwbx_edit" style="height: 63px;">
					<ul class="fwicon1">
						<li><a href="#" data-control-name="searchPoint"><img class="onoffimg" src="/images/usolver/com/map/att_bt1_off.png" alt="점" style="max-width: 70%"/></a></li>
						<li><a href="#" data-control-name="searchRect"><img class="onoffimg" src="/images/usolver/com/map/att_bt2_off.png" alt="사각형" style="max-width: 70%"/></a></li>
						<li><a href="#" data-control-name="searchPolygon"><img class="onoffimg" src="/images/usolver/com/map/att_bt3_off.png" alt="다각형" style="max-width: 70%"/></a></li>
						<li><a href="#" data-control-name="searchLine"><img class="onoffimg" src="/images/usolver/com/map/att_bt4_off.png" alt="선" style="max-width: 70%"/></a></li>
						<li><a href="#" data-control-name="searchCircle"><img class="onoffimg" src="/images/usolver/com/map/att_bt5_off.png" alt="원형" style="max-width: 70%"/></a></li>
						<li><a href="#" data-control-name="editSearchAll"><img class="onoffimg" src="/images/usolver/com/map/att_bt6_off.png" alt="현재영역" style="max-width: 70%"/></a></li>
					</ul>
				</div>
			</div>
		</div>		
		
		<!-- 정점편집 -->
		<div id="editVerticesPane" style="visibility: hidden">
			<div class="Top_arrow" style="padding-left:48px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
			<div id="W_349">
				<div class="fwbx_edit" style="height: 63px;">
					<ul class="fwicon1">
						<li><a href="#" id="btnEditVertex"><img class="fw1img" src="/images/usolver/com/map/top_c53_off.png" alt="정점편집" /></a></li>
						<li><a href="#" id="btnDelVertex"><img class="fw1img" src="/images/usolver/com/map/top_c54_off.png" alt="정점삭제" /></a></li>
					</ul>
				</div>
			</div>
		</div>
		
		<!-- 편집개체추가 -->
		<div id="editAddFeaturePane" style="visibility: hidden">
			<div class="Top_arrow" style="padding-left:115px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
			<div id="W_351">
				<div class="fwbx_edit_1" style="height: 63px;">
					<ul class="fwicon3">
						<li><a href="#" data-control-name="none"><img class="fw1img" src="/images/usolver/com/map/empty_on.png" alt="없음"/></a></li>
						<li><a href="#" data-control-name="cut"><img class="fw1img" src="/images/usolver/com/map/cut_off.png" alt="접합"/></a></li>
						<li><a href="#" data-control-name="cross"><img class="fw1img" src="/images/usolver/com/map/cross_off.png" alt="교차"/></a></li>
						<li><a href="#" data-control-name="over"><img class="fw1img" src="/images/usolver/com/map/over_off.png" alt="상월"/></a></li>
						<!-- <li><a href="#" data-control-name="under"><img class="fw1img" src="/images/usolver/com/map/att_bt5_off.png" alt="하월" style="max-width: 80%"/></a></li> -->						
					</ul>
				</div>
			</div>
		</div>

		<!-- 편집저장 -->
		<div id="editMidSaveLayers" class="W_352"
			style="top: 145px; left: 600px; display: none; height: 280px;">
			<!-- header -->
			<div id="P3_Header">
				<div class="Title2">편집저장</div>
				<div class="Close">
					<a id="btnConfirmClose" href="#"><img
						src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>"
						class="onoffimg" alt="닫기" /></a>
				</div>
			</div>
			<!-- // header -->
			<div id="editTableItem">
				<div id='midSaveLayers' class="Table_LBx"></div>
			</div>
			<div id="editTableGuide" style="padding:5px;">
			</div>
			<div style='float:right; padding: 20px 10px 0 0'>
				<div class="Btn">
					<a id='btnSaveConfirm' href="#" class="Btn_02">확인</a>
				</div>
				<div class="Btn">
					<a id='btnConfirmClose2' href="#" class="Btn_02">취소</a>
				</div>
			</div>
		</div>
		<!-- 편집저장 끝 -->

		<!-- 메모 저장 -->
		<div id="popup_add_memo" class="W_400" style="top:100px; left:500px; height:450px; display: none; z-index:1100; ">
		   <!-- header -->
		   <div id="P3_Header">
		      <div class="Title2">메모 등록</div>
		      <div class="Close"><a id="btn_popup_add_memo_close" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_off.png'"  alt="닫기"/></a></div>
		   </div>
		   <!-- // header -->
		   <div id="MemoAdd" class="memo" style="overflow-y:auto;">
		      <div class="Table_LBx">
		         <div class="Table_left">
			   	  <form id="memoForm" name="memoForm" method="post" action="<c:url value='/saveMemo.do'/>" enctype="multipart/form-data">
			            <table>
			               <colgroup>
			                  <col width="30%" />
			                  <col width="70%" />
			               </colgroup>		
			               <tbody>		               
			               <tr>
			                  <th>메모 명칭(*)</th>

			                  <td><input name="MEMO_NM" type="text" style="width:93%;" class="input" value="" /></td>
			               </tr>
			               <tr>
			                  <th>메모 내용(*)</th>

			                  <td><textarea name="MEMO_CN" class="textarea" style="width:95%;height:75px;"></textarea> </td>
			               </tr>
			               <tr>
			                  <th>마커 선택(*)</th>
			                  <td>				         
			                  	<span style="width:200px;display:inline-block" ><img id="curMarkerImg" src="<c:url value='/images/usolver/com/map/marker/edit.png'/>" title="기본 메모 마커" alt="기본 메모 마커" /></span>
			                  	<a href="#"><img id="findMarker" src="<c:url value='/images/usolver/com/map/p_btn_marker_ch.gif'/>" class="onoffimg" title="마커 찾기" alt="마커 찾기" /></a>         
			                  	<input name="MARKER_ID" id="MARKER_ID" type="hidden" value="1"></input>
			                  	<input name="MARKER_TYPE" id="MARKER_TYPE" type="hidden" value="S"></input>
			                  </td>
			               </tr>
			               <!-- 기 저장했던 이미지 -->
			                <tr>
			               		<td colspan="2">
			               		   	<div id="imgSavedThumbs" name="imgSavedThumbs" class="hscroll" style="width:350px" >
			               		   		<ul id="imgSavedThumbslst" class="imglst" style="width:800px; height:80px;"><li></li></ul>
			               		   	</div>
			               		</td>
			               </tr>
			               <tr>
			                  <th>사진 업로드</th>
			                  <td>
			                  	<div class="upload">				                  		                  	
			                  	<input name="files[0]" id="memo_file" type="file" style="visibility:hidden; width:192px;" class="input" accept="image/*" multiple />
			                  	<label for="memo_file" style="background:url(/images/usolver/com/map/p_btn_add.gif) no-repeat; display:inline-block;width:26px; height:26px;"> &nbsp;</label>			
			               		</div>
			                  </td>
			               </tr>
			               <tr>
			               		<td colspan="2">
			               		   	<div id="imgThumbs" name="imgThumbs" class="hscroll" style="width:350px" >
			               		   		<ul id="imgThumbslst" class="imglst" style="width:800px; height:80px;"><li></li></ul>
			               		   	</div>
			               		</td>
			               </tr>
			               </tbody>
			            </table>
			   	  </form>
		         </div>
		      </div>			     
		   </div>
			<div class="Btn_R">
			    <div class="Btn"><a id="btn_save_memo" href="#" class="Btn_02">저장</a></div>
			    <div class="Btn"><a id="btn_memo_close" href="#" class="Btn_02">취소</a></div>
			 </div>
		   
		   
		   <div id="divMarkerList" style="height:400px; display:none;">
			    <!-- header -->
			   <div id="P3_Header">
			      <div class="Title2">마커 선택</div>
			      <div class="Close"><a id="btn_popup_marker_close" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_off.png'"  alt="닫기"/></a></div>
			   </div>
			   <div id="divMarkers" class="memo" style="overflow-y:auto;">
			   		<div class="vscroll" style="height:350px"></div>
			   		<div class="Btn_R" style="margin-top:10px">
			        	<div class="Btn"><a href="#" class="Btn_02" id="btn_select_markerImg">선택</a></div>
			            <div class="Btn"><a href="#" class="Btn_02"  id="btn_cancel_markerImg">취소</a></div>
			        </div>
			   </div>			   
			   
		   </div>
		</div> <!-- 메모저장 끝 -->	
			
			<!-- 메모 목록 -->
			<div id="W_290Bx" style="top : 58px; left : 800px; display: none;">
			   <div class="Top_arrow" style="padding-left:135px;"><img src="<c:url value='/images/usolver/com/map/top/top_arrow.png'/>" alt="arrow"/></div>
			   <div id="W_290" style="width : 220px;">
			      <!-- header -->
			      <div id="P2_Header">
			         <div class="Ico"><img src="<c:url value='/images/usolver/com/map/top/top2_ico_1.png'/>" alt="속성조회아이콘"/></div>
			         <div class="Title">메모 목록</div>
			         <div class="Close"><a id="btn_memo_list_close" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close.png'/>" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close.png'"  alt="닫기"/></a></div>
			      </div>
			      <!-- // header -->
			      <div id="IcoList" style="max-height: 290px; overflow-x: hidden; overflow-y: auto;">
			         <ul id="memoList">
			         </ul>
			      </div>
			   </div>
			</div>			
			<!-- 메모목록 끝 -->
			
			<!--메모 이력보기 시작  -->
			<div id="divMemoHist" class="W_400" style="display:none; top:100px; left:300px; width:600px; height:400px;" >
				<!-- header -->
				<div id="P3_Header">
					<div class="Title2">메모상세정보</div>
				    <div class="Close"><a id="btn_popup_memohist_close" href="#"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>" onMouseOver="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='${pageContext.request.contextPath}/images/usolver/com/map/top/top_btn_close_off.png'"  alt="닫기"/></a></div>
				</div>	
				
				<div class="memoDetail">
		        	<div id="detailbx" class="slider-pro" style="width:570px;" >
		        		<!-- 타임 리스트-->
	        			<div class="sp-thumbnails" style="width:570px; height:250px;">
	        				<!-- 작성일자 리스트 -->
	        			</div>
		        		<!-- 메모리스트 -->
		        		<div class="sp-slides" style="width:570px; height:50px;">
		        			<!-- 메모내용 -->
		        		</div>
		        	</div>
		        </div>
		        <div class="Btn_R">
		            <div class="Btn"><a href="#" id="btn_insert_memo" class="Btn_02">추가</a></div>
		            <div class="Btn"><a href="#" id="btn_update_memo" class="Btn_02">수정</a></div>
		            <div class="Btn"><a href="#" id="btn_delete_memo" class="Btn_02">삭제</a></div>
		        </div>
			</div>
			<!--메모 이력보기 종료  -->
			
			<!--메모 삭제 confirm 시작  -->
			<div id="memo_del_confirm"></div>
			<!--메모 삭제 confirm 종료  -->
			
			
			<!-- 위치검색 -->			
			<div id="searchLocPane" style="display:none;">
				<div class="Top_arrow" style="padding-left:150px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
				<div id="W_310">				
					<!-- header -->
					<div id="P2_Header">
				    	<div class="Ico"><img src="/images/usolver/com/map/top/top2_ico_2.png" alt="위치검색아이콘"/></div>
				    	<div class="Title">위치검색</div>
				    	<div class="Close"><a href="#"><img id="popup_search_position_close" src="/images/usolver/com/map/top/top_btn_close_off.png"  class="onoffimg"   alt="닫기"/></a></div>
				    </div>
				    <!-- // header -->				    
				    <div id="Position">
				    	<div class="PTab">
				        	<ul>
				            	<!-- <li><a href="#" class="Tab2_selected">전체</a></li> -->
				            	<li><a id="tab_bldg" href="#" class="Tab2_selected">건물</a></li>
				            	<li><a id="tab_juso" href="#" class="Tab2">주소</a></li>
				            	<li><a id="tab_newjuso" href="#" class="Tab2" style="width:54px;">새주소</a></li>				            	
				            	<li><a id="tab_keyword" href="#" class="Tab2" style="width:54px;">통합검색</a></li>				            	
				            </ul>
				        </div>	
				        <!-- 위치검색 - 건물 -->					        
				        <div class="PBx1" id="div_bldg" style="display:show;">
				        	<div class="PBx_s1">
				                <div class="InputBx">시군구
				                	<select name="HJD_CD" id="HJD_CD" style="width: 80px;">
				                    	<option value="1"></option>
				                        <c:forEach var="selectData" items="${hjd_cd_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CD}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select>&nbsp;&nbsp;읍면동				                	
									<select name="BJD_CDE" id="BJD_CDE" style="width: 80px;">
										<option value=""></option>
										<c:forEach var="selectData" items="${bjd_cde_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.BJD_CDE}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select>
				                </div>				                
				                <div class="InputBx">건물명
				                	<input id="txt_bldg" type="text" style="width:195px;" class="input" value="" />
				                </div>
				            </div>
				        </div>
				         <!-- 위치검색 - 주소 -->		
				        <div class="PBx1" id="div_juso" style="display:none;">
				        	<div class="PBx_s1">
				                <div class="InputBx">시군구
				                	<select name="HJD_CD2" id="HJD_CD2" style="width: 80px;">
				                    	<option value="1"></option>
				                        <c:forEach var="selectData" items="${hjd_cd_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CD}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select>&nbsp;&nbsp;읍면동				                	
									<select name="BJD_CDE2" id="BJD_CDE2" style="width: 80px;">
										<option value=""></option>
										<c:forEach var="selectData" items="${bjd_cde_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.BJD_CDE}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select>
				                </div>		
				                <div class="InputBx">토지구분
				                	<input type="checkbox" name="chk_san" id="chk_san" value="1"></input>
				                </div>		                	                
				                <div class="InputBx">본번-부번
				                	<input id="txt_bonbun" type="text" style="width:84px;" class="input" value="" />-<input id="txt_boobun" type="text" style="width:84px;" class="input" value="" />
				                </div>
				            </div>
				        </div>	
				        <!-- 위치검색 - 새주소 -->
				        <div class="PBx1" id="div_newjuso" style="display:none;">
				        	<div id="radioArea">
				        		<input type="radio" id="rn_newjuso" name="chk_newjuso" checked>도로명 검색</input>
				        		<input type="radio" id="bd_newjuso" name="chk_newjuso">건물명 검색</input>
				        	</div>
				        	<!-- 서브메뉴 : 도로명 검색 -->
				        	<div class="PBx_s1" id="rn_form" >
				                <div class="InputBx">도로명 초성
				                	<select name="INIT_CDE" id="INIT_CDE" style="width: 80px;">
				                    	<option value=""></option>
				                    	<option value="4403245207">ㄱ</option>
				                        <option value="4520845795">ㄴ</option>
				                        <option value="4579646971">ㄷ</option>
				                        <option value="4697247559">ㄹ</option>
				                        <option value="4756048147">ㅁ</option>
				                        <option value="4814849323">ㅂ</option>
				                        <option value="4932450499">ㅅ</option>
				                        <option value="5050051087">ㅇ</option>
				                        <option value="5108852263">ㅈ</option>
				                        <option value="5226452851">ㅊ</option>
				                        <option value="5285253439">ㅋ</option>
				                    	<option value="5344054027">ㅌ</option>
				                    	<option value="5402854615">ㅍ</option>
				                    	<option value="5461655203">ㅎ</option>
				                    </select>&nbsp;&nbsp;도로명칭		
									<select name="RN" id="RN" style="width: 80px;">
									</select>
				                </div>
				                <div class="InputBx">건물 본번-부번
				                	<input id="txt_Nbonbun" type="text" style="width:84px;" class="input" value="" />-<input id="txt_Nboobun" type="text" style="width:84px;" class="input" value="" />
				                </div>
				            </div>
				            <!-- 서브메뉴 : 건물명 검색 -->
				            <div class="PBx_s1" id="bd_form" style="display:none;">
				            	<div class="InputBx">시군구
				                	<select name="HJD_CD3" id="HJD_CD3" style="width: 80px;">
				                    	<option value="1"></option>
				                        <c:forEach var="selectData" items="${hjd_cd_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CD}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
				                    </select>&nbsp;&nbsp;읍면동				                	
									<select name="BJD_CDE3" id="BJD_CDE3" style="width: 80px;">
										<option value=""></option>
										<c:forEach var="selectData" items="${bjd_cde_list}">
										<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.BJD_CDE}"> selected="selected" </c:if> >${selectData.VAL}</option>
										</c:forEach>
									</select>
				                </div>
				                <div class="InputBx">건물명
				                	<input id="txt_bdnm" type="text" style="width:195px;" class="input" value="" />
				                </div>
				            </div>
				        </div>		
				        <!-- 위치검색 - 키워드 -->		
				        <div class="PBx1" id="div_keyword" style="display:none;">
				        	<div class="PBx_s1">
				                <div class="InputBx">검색어
				                	<input id="txt_keyword" type="text" style="width:86px;" class="input" onkeydown="javascript: if (event.keyCode == 13) {SEARCH.fn_start_searchKeyword(this.value.replace(/^\s+|\s+$/g,''));return false;}" value=""/>
				                </div>
				        	</div>
				        </div>	        
				         <div class="PBx1" id="divSearchResultCnt" style="display:none;">
				        	<div class="PBx_s2">
				            	<dl>
				                	<dt><img  src="/images/usolver/com/map/p2_arrow1.gif" style="padding-bottom:2px;"/> 검색결과 : <span id="searchResultCnt">0</span> 건</dt>
				                    <dd><a href="#" ><img id="imgOpenCondition" src="/images/usolver/com/map/p2_arrow_up.png" alt="결과닫기" title="결과닫기" /></a></dd>
				                </dl>
				            </div>
				        </div>
				        <div class="PBx2" id="divSearchResult" style="display:none;">
				        	<ul>			        				        						            	
				            </ul>
				        </div>
				        <div class="BtBx" id="divNextSearchBtn" style="display:none;">
				            <div class="Btn"><a id="btn_nextSearch" href="#" class="Btn_02" alt="다음">다음</a></div>
				        </div>
				        <div class="BtBx" id="divPreSearchBtn" style="display:none;">
				            <div class="Btn"><a id="btn_preSearch" href="#" class="Btn_02" alt="이전">이전</a></div>
				        </div>
				        <div class="BtBx" id="divSearchBtn" style="display:show;">
				            <div class="Btn"><a id="btn_search" href="#" class="Btn_02" alt="검색">검색</a></div>
				        </div>
				        <div id="divPageNum" style="display:none;">
				        </div>
				    </div>
				</div>    
			</div>		
			<!-- 위치 검색 끝-->
			
			<!-- 속성검색 -->
			<div id="searchFacilityPane" class="facilityBx" style="display:none;">
				<div class="Top_arrow" style="padding-left:135px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
				<div id="W_424">
					<!-- header -->
					<div id="P2_Header">
						<div class="Ico"><img src="/images/usolver/com/map/top/top2_ico_1.png" alt="속성조회아이콘" /></div>
						<div class="Title">시설물 검색</div>
						<div class="Close"><a href="#"><img id="popup_search_facility_close" src="/images/usolver/com/map/top/top_btn_close.png" onMouseOver="this.src='/images/usolver/com/map/top/top_btn_close_on.png'" onMouseOut="this.src='/images/usolver/com/map/top/top_btn_close.png'" alt="닫기" /></a></div>
					</div>
					<!-- // header -->
					<div class="fIcoList">
						<ul> 
							<li><a href="#" class="fIcoM1"><span style="font-size: 14px; font-weight: bold;">공간검색</span><br />사용자가 지정한 영역에 존재하는 <br />단일/다중 시설물 속성조회</a></li>
							<li><a href="#" class="fIcoM2"><span style="font-size: 14px; font-weight: bold;">속성고급검색</span><br />검색식을 직접 작성하여 시설물 <br />속성조회</a></li>
						</ul>
					</div>
					<div class="fcont1">
						<div class="FL">
							<h2><img src="/images/usolver/com/map/step01.png" alt="단계01" /> 검색대상</h2>
							<div class="treebx">
      	        				<c:forEach var="att" items="${layerGroupInfoList }">
      	        					<div class="TreePd">
		        						<div class="Tree_Tx1"><img class="tabbutton" src="/images/usolver/com/map/tree_plus.gif" alt="plus"/><span><input type="checkbox" name="chk_top_tree1" value="${att.id }"/><img src="/images/usolver/com/map/tree_sicon01.gif" alt="폴더"/>${att.name }</span></div>
	        							<c:forEach var="a" items="${layerInfoList }">
	  	        						<c:if test="${a.layerGroup == att.id }">
	  	        							<div class="Tree_sTx" value="${att.id }"><span><input type="checkbox" name="chk_tree1" value="${a.table }" alt="unchk"/><img src="/images/usolver/com/map/tree_sicon02.gif"/><a>${a.alias }</a></span></div>
	  	        						</c:if>
	        							</c:forEach>
   	        						</div>
      	        				</c:forEach>
      	        			</div>
						</div>
						<div class="FL" style="margin-left: 10px">
							<div>
								<h2><img src="/images/usolver/com/map/step02.png" alt="단계02" /> 검색영역</h2>
								<div class="fwbx" style="height: 63px;">
									<ul class="fwicon1">
										<li><a href="#" data-control-name="searchPoint"><img class="fw1img" src="/images/usolver/com/map/att_bt1_off.png" alt="점"/></a></li>
										<li><a href="#" data-control-name="searchRect"><img class="fw1img" src="/images/usolver/com/map/att_bt2_off.png" alt="사각형" /></a></li>
										<li><a href="#" data-control-name="searchPolygon"><img class="fw1img" src="/images/usolver/com/map/att_bt3_off.png" alt="다각형" /></a></li>
										<li><a href="#" data-control-name="searchLine"><img class="fw1img" src="/images/usolver/com/map/att_bt4_off.png" alt="선" /></a></li>
										<li><a href="#" data-control-name="searchCircle"><img class="fw1img" src="/images/usolver/com/map/att_bt5_off.png" alt="원형" /></a></li>
										<li><a href="#" data-control-name="searchAll"><img class="fw1img" src="/images/usolver/com/map/att_bt6_off.png" alt="현재영역" /></a></li>
									</ul>
								</div>
							</div>
							<div style="margin-top: 20px">
								<h2>
									<img src="/images/usolver/com/map/step03.png" alt="단계03" /> 검색방법
								</h2>
								<div class="fwbx" style="height: 75px">
									<ul class="fwicon2">
										<li><a href="#" data-control-name="Intersects"><img class="fw2img" src="/images/usolver/com/map/att_bt7_off.png" alt="영역에 포함되거나 걸치는 도형" /></a></li>
										<li><a href="#" data-control-name="Within"><img class="fw2img" src="/images/usolver/com/map/att_bt8_off.png" alt="영역에 완전히포함되는 도형" /></a></li>
										<li><a href="#" data-control-name="Boundary"><img class="fw2img" src="/images/usolver/com/map/att_bt9_off.png" alt="영역의 경계선에걸치는 도형" /></a></li>
									</ul>
								</div>
							</div>
							<div class="Btn_R" style="margin-top:10px">
               					<div class="Btn"><a href="#" id="btn_searchSpace" class="Btn_02 tooltip" title="설정한 검색 영역을 지도에 지정하여&lt;br/&gt; 시설물을 조회해 주세요">검색</a></div>
           					</div>
						</div>
					</div>
					<div class="fcont2" id="fcont2">    
       					<div class="FL">
            				<h2><img src="/images/usolver/com/map/step01.png" alt="단계01"/> 검색대상</h2>
            				<div class="treebx">
    							<c:forEach var="layerGroupInfoList" items="${layerGroupInfoList}">
      	        					<div class="TreePd">
   	        							<div class="Tree_Tx1"><img class="tabbutton" src="/images/usolver/com/map/tree_plus.gif" alt="plus"/><span><input type="checkbox" name="chk_tree2" disabled="disabled" value="${layerGroupInfoList.id }"/><img src="/images/usolver/com/map/tree_sicon01.gif" alt="폴더"/>${layerGroupInfoList.name }</span></div>
   	        							<c:forEach var="layerInfoList" items="${layerInfoList }">
   	        							<c:if test="${layerInfoList.layerGroup == layerGroupInfoList.id }">
   	        							<div class="Tree_sTx" value="${layerInfoList.id }"><span><input type="checkbox" name="chk_tree2" value="${layerInfoList.table }" alt="unchk"/><img src="/images/usolver/com/map/tree_sicon02.gif"/>${layerInfoList.alias }</span></div>
   	        							</c:if>
   	        							</c:forEach>
      	        					</div>
      	        				</c:forEach>
      	        			</div>
        				</div>
        				<div class="FL" style="margin-left:10px; width:350px;">
            				<div>
                				<h2><img src="/images/usolver/com/map/step02.png" alt="단계02"/> 검색방법</h2>
                				<div style="height:167px">
                    				<div class="fsch">
                        				<dl class="mr5">
                            				<dt>필드목록</dt>
                           	 				<dd>
                                			<div>
                                				<ul class="fsch_lst" id="fsch_lst">
                                				</ul>
                                			</div>
                            				</dd>
                        				</dl>
                        				<dl class="mr5">
                            				<dt>연산자</dt>
                            				<dd>
                                			<ul class="fschbtn_lst" id="fschbtn_lst">
                                    			<li><a class="fschbtn" href="#">=</a></li>
			                                    <li><a class="fschbtn" href="#"><></a></li>
			                                    <li><a class="fschbtn" href="#"><</a></li>
			                                    <li><a class="fschbtn" href="#"><=</a></li>
			                                    <li><a class="fschbtn" href="#">></a></li>
			                                    <li><a class="fschbtn" href="#">>=</a></li>
			                                    <li><a class="fschbtn" href="#">LIKE</a></li>
			                                    <li><a class="fschbtn" href="#">AND</a></li>
			                                    <li><a class="fschbtn" href="#">OR</a></li>
			                                    <li><a class="fschbtn" href="#">NOT</a></li>
			                                    <li><a class="fschbtn" href="#">IS</a></li>
			                                    <li><a class="fschbtn" href="#">NULL</a></li>
                                			</ul>
                            				</dd>
                        				</dl>
                        				<dl>
                            				<dt>표본필드값&nbsp;&nbsp;<a href="#" id="sqlVal"><img src="/images/usolver/com/map/tree_plus.gif"></a></dt>
                            				<dd>
                                			<div>
                                    		<ul class="fsch_lst" id="fsch_lst_val">
                                    		</ul>
                                			</div>
                            				</dd>
                        				</dl>
                    				</div>
                				</div>
            				</div>
           			 		<div>
                				<div class="qf query">
                    				<p class="FL" id="FL">
                    				검색식 :  <span></span>
                    				</p>
                    			</div>
                    				<div>
                    				<p class="FR" id="FR">
                    				 건 
                    				</p>
                				</div>
                				<input type="text"style="width:340px;margin-top:5px;background-color='gray';" id="input" class="input" disabled="disabled"/>
            				</div>
            
            				<div class="Btn_R" id="fcont2_btn" style="margin-top:10px;">
                				<div class="Btn"><a href="#" class="Btn_02">건수 조회</a></div>
                				<div class="Btn"><a href="#" class="Btn_02">초기화</a></div>
                				<div class="Btn"><a href="#" class="Btn_02">검색</a></div>
            				</div>
        				</div>
    				</div>
				</div>
			</div>
			<!-- 속성검색 끝 -->
			
			<!-- 맵 갤러리 팝업 -->
			<div id="galleryPane" style="display : none;">
			   <div class="Top_arrow" style="padding-left:228px;"><img src="<c:url value='/images/usolver/com/map/top/top_arrow.png" alt="arrow'/>"/></div>
			   <div id="W_920">
			      <!-- header -->
			      <div id="P2_Header">
			         <div class="Ico"><img src="<c:url value='/images/usolver/com/map/top/ico_subject.png'/>" alt="맵 갤러리 아이콘'/>"/></div>
			         <div class="Title">맵 갤러리</div>
			         <div class="Close"><a href="#" id="btn_close_subject_gallery"><img src="<c:url value='/images/usolver/com/map/top/top_btn_close_off.png'/>"  class="onoffimg" title="닫기" alt="닫기"/></a></div>
			      </div>
			      <!-- // header -->
			      <!-- favorite -->
			      <div id="gallery">
			         <div class="gal_left">
			            <div class="TitBx">
			               <dl>
			                  <dt>시스템 기본 맵</dt>
			                  <dd><%-- <a id="btn_add_favoritesGroup" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_add_off.gif'/>"  class="onoffimg"  title="추가" alt="추가"/></a> --%></dd>
			               </dl>
			            </div>
			            <div class="group_list">
			               <dl>
			                  <dt id="mnu_system_subject">시스템 기본 맵</dt>
			                  <dd>
			                     <%-- <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>" width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>" width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>" width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a> --%>
			                  </dd>
			               </dl>
			            </div>
			            
			            
			            <div class="TitBx">
			               <dl>
			                  <dt>내 맵</dt>
			                  <dd><%-- <a id="btn_add_favoritesGroup" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_add_off.gif'/>"  class="onoffimg"  title="추가" alt="추가"/></a> --%></dd>
			               </dl>
			            </div>
			            <div class="group_my_list">
			               <dl>
			                  <dt id="mnu_base_subject">내 맵</dt>
			                  <dd>
			                     <%-- <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>" width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>" width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>" width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a> --%>
			                  </dd>
			               </dl>
			            </div>
			            
			            <%-- <div class="TitBx">
			               <dl>
			                  <dt>공유 맵</dt>
			                  <dd><a id="btn_add_favoritesGroup" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_add_off.gif'/>"  class="onoffimg"  title="추가" alt="추가"/></a></dd>
			               </dl>
			            </div>
			            <div class="group_share_list">
			               <security:authorize ifAllGranted ="ROLE_ADMIN" >
			               <dl>
			                  <dt id="mnu_standby_subject">승인 대기 주제도</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>"  width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>"  width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			               </security:authorize>
			               <dl>
			                  <dt id="mnu_rdl_subject">도로 시설물도</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>"  width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>"  width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			               <dl>
			                  <dt id="mnu_wtl_subject">상수 시설물도</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>"  width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>"  width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			               <dl>
			                  <dt id="mnu_swl_subject">하수 시설물도</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>"  width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>"  width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			               <dl>
			                  <dt id="mnu_und_subject">지하 시설물도</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>"  width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>"  width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			               <dl>
			                  <dt id="mnu_etc_subject">기타</dt>
			                  <dd>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_modify.gif'/>"  width="22px" class="onoffimg"  title="수정" alt="수정"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_cancel.gif'/>"  width="22px" class="onoffimg"  title="취소" alt="취소"/></a>
			                     <a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_del.gif'/>"  width="22px" class="onoffimg"  title="삭제" alt="삭제"/></a>
			                  </dd>
			               </dl>
			            </div> --%>
			         </div>
			         <div class="gallery_content">
			            <div class="TitBx">
			               <dl>
			                  <dt>
			                  	<span id="gallery_listTile">맵 리스트</span> 
			                  	<span> 
						            <div class="SearchBx">
						               <div class="Search">
						                  <dl>
						                     <dt><input type="text" value="" /></dt>
						                     <dd><a href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_search_off.png'/>"  class="onoffimg"  title="검색" alt="검색"/></a></dd>
						                  </dl>
						               </div>
						            </div>
			                  	</span>
			                  </dt>
			                  <dd style="display:none;"><a id="btn_add_subject" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn_add_off.gif'/>"  class="onoffimg"  title="추가" alt="추가"/></a></dd>
			               </dl>
			            </div>
			            <div class="ContBx">			               
			            </div> 
		               <!-- 맵갤러리 dummy -->
		               <div id="gal_dummy" class="list_pd" style="display:none;">
		                  <div class="gal_bx">
		                     <div class="gal_imgbg">
		                        <div class="gal_img"><img class="subjectSnapShot" id="imgSnapshot" src="<c:url value='/images/usolver/com/map/subject_snapshot.png'/>" style="cursor:pointer" title="선택한 맵으로 변경됩니다" alt="#gallery .gallery_content .ContBx .list_pd .gal_bx .gal_imgbg .gal_img"/></div>
		                     </div>
		                     <div class="gal_tx">
		                        <dl>
		                           <dt id="subject_title"></dt>
		                           <dd id="subject_desc"></dd>
		                        </dl>
		                     </div>
		                     <div class="gal_bt">
		                        <dl>
		                           <dt><a id="btn_set_basesubject" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn2_share_off.gif'/>"  class="onoffimg"  title="기본주제도로 설정하기" alt="기본주제도로 설정하기"/></a></dt>
		                           <dd>
		                              <a id="btn_modify_subject" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn2_modify_off.gif'/>"  class="onoffimg"  title="수정하기" alt="수정하기"/></a> 
		                              <a id="btn_delete_subject" href="#"><img src="<c:url value='/images/usolver/com/map/p_btn2_del_off.gif'/>"  class="onoffimg"  title="삭제" alt="삭제"/></a>
		                           </dd>
		                        </dl>
		                     </div>
		                  </div>
		               </div>
		               <!-- // 맵갤러리 dummy -->
			         </div>
			      </div> <!-- // favorite -->
			   </div>
			</div>   
			<!--// 주제도갤러리 팝업 끝  -->
			<div id="dataLoading">
				<img src="/images/usolver/com/cmm/loader.gif"></img>
			</div>
			
			<div id="mshp-main-map"></div>	
			<div id="map-layers"></div>			
			<div id="console"></div>			
			<div id="console-buffer"></div>			
			<div id="console-btn"></div>			
		</div>		
        <!-- //edit -->
        <!-- container end -->
    </div>
    <!-- wrap end -->
    
    <form id="geocodingForm" method="post" action="<c:url value='/map/geocoding.do'/>" enctype="multipart/form-data">
    	<input type="file" name="geocodingFile" style='display:none;'/>
    </form>
    
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/attrchange/attrchange.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/attrchange/attrchange_ext.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jqgrid/js/i18n/grid.locale-kr.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jqgrid/js/jquery.jqGrid.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/msdropdown/jquery.dd.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/jquery.jstree.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/lib/jquery.cookie.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jstree/lib/jquery.hotkeys.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/fileupload/jquery.fileupload.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/sliderPro/jquery.sliderPro.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/tipped/tipped.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/spectrum/spectrum.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/vendor/jquery.scrollTo-min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/theme.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/jdesktop.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jdesktop/js/jdesktop.widgets.js'/>"></script>

<!-- 편집이력조회 타임라인 - Yu_mk -->

<script type="text/javascript" src="<c:url value='/extLib/timeline/jquery.themeswitcher.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/google/jsapi.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/timeline/timeline.js'/>"></script>
<script type="text/javascript" src="<c:url value='https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/lib/0.16.0/javascript.util.min.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/lib/0.16.0/jsts.min.js'/>"></script> --%>

<%-- <script type="text/javascript" src="<c:url value='/extLib/jsts/jsts.0.11.1.js'/>"></script>  --%>

<script type="text/javascript" src="<c:url value='/extLib/jsts/javascript.util.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jsts/jsts.js'/>"></script>

<script type="text/javascript" src="<c:url value='/extLib/proj4js/proj4js.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/proj4js/defs.js'/>"></script>

<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.debug.js'/>"></script>

<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayers.extension.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/deprecated.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/OpenLayersEdit.min.js'/>"></script> --%>
<script type="text/javascript" src="<c:url value='/extLib/mapshaper/mapshaper.js'/>"></script>

<!-- heatmap :김정수-->
<script type="text/javascript" src="<c:url value='/extLib/heatmap/heatmap.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/heatmap/heatmap-openlayers.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/d3/js/d3.v3.js'/>"></script>

<!-- openlayer.render chart :김정수-->
<script type="text/javascript" src="<c:url value='/extLib/chart/SVGCharts.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/chart/VMLCharts.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/loader.js'/>"></script> --%>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/compat.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/iefixes.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/CleanFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/ContextMenu.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DragFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DeleteFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DeleteAllFeatures.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/Dialog.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawHole.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawPolygon.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawPath.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawPoint.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawText.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DrawRegular.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/EditorPanel.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/ImportFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/LayerSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/MergeFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/TransformFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/FixedAngleDrawing.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Layer.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Layer/Snapping.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/SnappingSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/DownloadFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/UploadFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/SplitFeature.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/UndoRedo.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/CADTools.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/Editor/Control/ParallelDrawing.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/OpenLayersEditCustom.js'/>"></script> --%>
<%-- <script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/iefixes.js'/>"></script> --%>

<%-- <script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/ole.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/openlayers/OpenLayersEdit/OpenLayersEditCustom.js'/>"></script> --%>

<%-- <script type="text/javascript" src="<c:url value='/lib/gmap/GMap.js'/>"></script> --%>
<%-- <script type="text/javascript" src="<c:url value='/lib/gmap/GMap.min.js'/>"></script> --%>

<!-- GMap DEBUG js -->
<%-- 
<script type="text/javascript" src="<c:url value='/lib/gutil/GUtil.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gutil/GError.js'/>"></script>
<script type="text/javascript" src="<c:url value='/lib/gmap/GMap.debug.js?v=${reg_date}'/>"></script> 
--%>


<!-- NUTs js : minify -->
<%-- <script type="text/javascript" src="<c:url value='/lib/NUTs_20170216_min.js?v=${reg_date}'/>"></script> --%>

<!-- NUTs js : debugging -->
<script type="text/javascript" src="<c:url value='/lib/NUTs_20170406_debug.js?v=${reg_date}'/>"></script>

<!-- NUTs js : devided -->
<%-- <script type="text/javascript" src="<c:url value='/lib/NUTs.js?v=${reg_date}'/>"></script> --%>

<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/namespace.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/config.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/event.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/style.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/search.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/message.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/json/circular-json.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/common.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/commonMap.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/map.js?v=${reg_date}'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/js/usolver/map/map.ss.js?v=${reg_date}'/>"></script> --%>

<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSpecial.js?v=${reg_date}'/>"></script><!-- 김정수 -->
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapEditor.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/usvEditor.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/usvEditRuleInfo.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/usvAdvancedEditInfo.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/map/mapSpecial.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/plugin/jquery.mask.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/mapFrame.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/register.js?v=${reg_date}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/book.js?v=${reg_date}'/>"></script>

<!-- heatmap, chart datas :김정수-->
<script type="text/javascript" src="<c:url value='/js/usolver/map/datas.js'/>"></script>

<!-- 다음 API -->
<!-- <script type="text/javascript" src="http://apis.daum.net/maps/maps3.js?apikey=570b921adf74588961c473e4cd6a6bf3&libraries=services"></script> --> 
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=570b921adf74588961c473e4cd6a6bf3&libraries=services"></script>

<!-- <script type="text/javascript" src="http://apis.daum.net/maps/maps3.js?apikey=f81d41f0183f1101f37fd985dffc0f83&libraries=services"></script>-->

<!-- 네이버 API -->
<script type="text/javascript" src="http://map.naver.com/js/naverMap.naver?key=670f278fb7149a7e300bfdbedc025100"></script>

<!--다울(Dawul) 지도API -->
<!-- <link rel="stylesheet" type="text/css" href="http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapCss"> -->
<!-- <script type="text/javascript" src="http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=f3ae0b2a278247afb61b80ad138eeaae"></script>  -->
<!-- <script type="text/javascript" src="http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=4add6e484b4f4b7eac337318f851d866"></script>  -->

<%-- <script type="text/javascript" src="<c:url value='/extLib/naver/v1_2_63.js'/>"></script> --%>

<!-- 브이월드 API -->
<!-- <script type="text/javascript" src="http://map.vworld.kr/js/apis.do?type=Base&apiKey=50E9ECFF-4D10-30D4-9F19-0B23D619509F&domain=http://www.muhanit.kr:18488&basemap=PHOTO"></script> -->

<script type="text/javascript" src="<c:url value='/js/usolver/com/org/js/dynamic.select.js'/>"></script>



<!--Imajnet dependencies  20171120 CJH -->

<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/book.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/merc.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery-migrate-1.1.0.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery-ui-1.9.0.custom.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.mobile.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.i18n.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.corner.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.mobile-events.min.js'/>"></script> --%>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.loadmask.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/raphael.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.url.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/combobox.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.notify.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.colorbox-min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/three.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/CanvasRenderer.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/Projector.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/jquery.touchSwipe.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/locale-en.js'/>"></script>
 
<!-- Imajnet lib -->
<script type="text/javascript" src="<c:url value='/js/usolver/imajbox/imajnetLibrary.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/js/usolver/imajbox/imajnet.js'/>"></script> --%>

<script type="text/javascript">

var g_userId = '<c:out value="<%=g_userId%>"/>';
//var g_sysAdmin = '';
var g_initExtent = '';
//var g_initExtent = '<c:out value="<%=g_initExtent%>"/>';

if(!g_initExtent || g_initExtent == 'null')
	g_initExtent = JSON.stringify(CONFIG.fn_get_getMapInfo().initExtent);

if(g_userId && MAP.fn_set_userId)
	MAP.fn_set_userId(g_userId);

$(document).ready(function(e){

	Tipped.create('img');
	Tipped.create('a'); 
	Tipped.create('input'); 
	
	// 지도창 body클릭 시 포커싱 처리  
	$(document).on("mousedown",function(){
		var mapWindow = $(window.parent.document).find('.isMap');

		  if(mapWindow.length > 0){
	
			  if(!$(mapWindow).hasClass("activeWindow")) {
				  
				  //window.parent.REGISTER.fn_hide_allWindows();
				  var sMapWinId = $(mapWindow).attr("id").split("_")[1];
				  var oMapWindow = window.parent.nJDSK.WindowList.get_window(sMapWinId);
				  if(oMapWindow)
					  $(oMapWindow.taskbarBtn).click(); 
			  }
			  
		  }
	});
	
	USV.MAP = (function(_mod_map, $, undefined){
	/**
	* 시스템에서 서비스하는 전체 레이어 정보
	* @member {Object} oLayerInfoList
	*/
	var oLayerInfoList;

	/**
	* 시스템에서 편집가능한 전체 레이어 정보
	* @member {Object} oEditLayerInfoList
	*/
	var oEditLayerInfoList;
	
	var oTmapInfoList,
		oTmapGroupInfoList,
		oEditLayerInfoList,	   // 맵 설정 시 변경되는 레이어 목록정보 
		oOrgEditLayerInfoList, // 최초 로딩 레이어 목록정보 
		oLayerGroups;

	//사용자 서비스 레이어 
	oLayerInfoList = 
		 {<c:forEach items="${layerInfoList}" var="layerInfo" varStatus="status">
		 "${layerInfo.table}" : 
		 		{<c:forEach items="${layerInfo}" var="layer" >
			 		'${layer.key}' : '${layer.value}',</c:forEach>
		 		},
		</c:forEach>}; 

    //시스템 서비스 레이어 
	var oOrgLayerInfoList = 
		 {<c:forEach items="${orgLayerInfoList}" var="orgLayerInfo" varStatus="status">
		 "${orgLayerInfo.table}" : 
		 		{<c:forEach items="${orgLayerInfo}" var="orgLayer" >
			 		'${orgLayer.key}' : '${orgLayer.value}',</c:forEach>
		 		},
		</c:forEach>}; 
			
	/* oTmapInfoList = 
		 [<c:forEach items="${tMapInfoList}" var="tMapInfo">
			{<c:forEach items="${tMapInfo}" var="tMap" >
				'${tMap.key}' : '${tMap.value}',</c:forEach>
			},
		</c:forEach>
		];
	
	oTmapGroupInfoList = 
		[<c:forEach items="${tMapGroupInfoList}" var="tMapGroupInfo">
			{<c:forEach items="${tMapGroupInfo}" var="tMapGroup" >
				'${tMapGroup.key}' : '${tMapGroup.value}',</c:forEach>
			},
		</c:forEach>
		]; */
	
	oLayerGroups = 
		[<c:forEach items="${layerGroupInfoList}" var="layerGroupInfo">
			{<c:forEach items="${layerGroupInfo}" var="layerGroup" >
				'${layerGroup.key}' : '${layerGroup.value}',</c:forEach>
			},
		</c:forEach>
		];
		
	oEditLayerInfoList = 
		[<c:forEach items="${editLayerInfoList}" var="editLayerInfo">
	     	{<c:forEach items="${editLayerInfo}" var="editLayer" >
	     	     '${editLayer.key}' : '${editLayer.value}',</c:forEach>
	     	},
	     </c:forEach>
	 	];


	var oOrgLayerGroups = ${orgLayerGroupInfoList};
	var oOrgEditLayerInfoList = ${orgEditLayerInfoList};
	
	oOrgEditLayerInfoList = COMMON.deepCloneObject(oEditLayerInfoList);

	//$.extend(oOrgEditLayerInfoList,oEditLayerInfoList)
	var sTMapId = 1;
	var sOrgTMapId = 1;
	
	if(oLayerInfoList){
		for(var item in oLayerInfoList){
			if(oLayerInfoList[item].tmapid ){
				sTMapId = oLayerInfoList[item].tmapid;
				break;
			}
			
		}
	} else{
		alert('서비스 가능한 레이어 정보 추출 실패');
		//return false;
	}

	if(oOrgLayerInfoList){
		for(var item in oOrgLayerInfoList){
			if(oOrgLayerInfoList[item].tmapid ){
				sOrgTMapId = oOrgLayerInfoList[item].tmapid;
				break;
			}
		}
	}
	//사용자별 기본맵 사용여부 
	var sUseSubject = "${loaded_baseSubject}";

	//주제도를 사용하는 경우 
	if(sUseSubject === "Y"){
		MAP.fn_set_userTmapId(sTMapId); //맵 아이디 SET 
		
		for(var item in oLayerInfoList){
			MAP.fn_get_treeSelectedLayers().push(oLayerInfoList[item]);	//현재 서비스중인 레이어 목록정보 SET 
		} 
	}

	//사용자 권한 
	var oUserAuthor = ${oUserAuthor};
		
	saveTool = null;
	
	fn_init_gisEngine();
	
	orgLayerTool = new NUTs.Tool.TMapLayerTool(oOrgLayerInfoList, null, null, oOrgLayerGroups, { 
		tMapId : sOrgTMapId, 
		serviceUrl : CONFIG.fn_get_serviceUrl(),
		prefix : CONFIG.fn_get_dataHouseName(), 
		gisEngineType : CONFIG.fn_get_gisEngineType(),
		callback : function(_oRes, _bUserStyle){
			saveTool = new NUTs.Tool.SaveTool(map);
		},
		sync : true,
		userStyle : ""
	}); 
	
	layerTool = new NUTs.Tool.TMapLayerTool(oLayerInfoList, oTmapInfoList, oTmapGroupInfoList, oLayerGroups, { 
		tMapId : sTMapId, 
		serviceUrl : CONFIG.fn_get_serviceUrl(), 
		prefix : CONFIG.fn_get_dataHouseName(), 
		gisEngineType : CONFIG.fn_get_gisEngineType(),
		callback : function(_oRes, _bUserStyle){

			this.sld = _oRes;
			
			STYLE.fn_convert_userStyle(COMMON.fn_get_userId());
			USV.MAP.fn_init_map(_oRes, _bUserStyle, g_userId, g_initExtent);
			if('${param.callback}' === "fn_edit_feature") {
				var aG2_id = [];
				var sStringG2_id = '${param.aG2_id}';
				var sParseG2_id = sStringG2_id.split(",");
				var size = sParseG2_id.length;
				for(var i=0;i<size;i++) {
					aG2_id.push(sParseG2_id[i]);
				}
				REGISTER.fn_edit_feature('${param.callbackParam}',aG2_id);
			}
			
			if('${param.callback}' === "fn_move_toFeatures") {
				var aG2_id = [];
				var sStringG2_id = '${param.aG2_id}';
				var sParseG2_id = sStringG2_id.split(",");
				var size = sParseG2_id.length;
				for(var i=0;i<size;i++) {
					aG2_id.push(sParseG2_id[i]);
				}
				REGISTER.fn_move_toFeatures('${param.callbackParam}', aG2_id);
			}
			saveTool = new NUTs.Tool.SaveTool(map);
		},
		userStyle : ""
	}); 
	
	//STYLE.fn_init_editLayerList(oEditLayerInfoList); //편집레이어 목록 표출	
	
	STYLE.fn_init_eventImgOnOff(); //마우스 오버 이미지 표출 
	
	$("#map-left-menu").tabs();

	function fn_init_gisEngine(){
		if(CONFIG.fn_get_gisEngineType() == "GeoServer")
			NUTs.WMS.format = new NUTs.Format.SLD.v1_0_0_GeoServer;
	};
	
	var fn_get_layerInfoList = function (_oLayer){
		return oLayerInfoList[_oLayer];
	};	

	var fn_get_layerTotInfoList = function (){
		return oLayerInfoList;
	};	
	
	var fn_get_orgLayerInfoList = function (_oLayer){
		return oOrgLayerInfoList[_oLayer];
	};
	
	var fn_get_orgLayerTotInfoList = function (){
		return oOrgLayerInfoList;
	};	

	var fn_get_orgLayerGroupInfoList = function (){
		return oOrgLayerGroups;
	};	

	var fn_get_orgEditLayerInfoList = function (){
		return oOrgEditLayerInfoList;
	};

	var fn_get_editLayerInfoList = function (){
		return oEditLayerInfoList;
	};
	
	var fn_get_sysAdmin = function (){
		return oUserAuthor.ADMIN;
	};

	var fn_set_editLayerInfoList = function (_oLayerList){
		oEditLayerInfoList =  _oLayerList;
	};

	var fn_get_userAuthorInfo = function (_oLayerList){
		return oUserAuthor;
	};
	//------------------------------------------------------------------------------------------------------------------
	//## public 메소드
	//------------------------------------------MAP_EDITOR.fn_init_timeLine(); -----------------------------------------
	_mod_map.fn_get_sysAdmin				=	fn_get_sysAdmin;
	_mod_map.fn_get_layerInfoList			=	fn_get_layerInfoList;
	_mod_map.fn_get_layerTotInfoList		=	fn_get_layerTotInfoList;
	_mod_map.fn_get_orgLayerInfoList		=	fn_get_orgLayerInfoList;
	_mod_map.fn_get_orgLayerTotInfoList		=	fn_get_orgLayerTotInfoList;
	_mod_map.fn_get_orgLayerGroupInfoList	=	fn_get_orgLayerGroupInfoList;
	_mod_map.fn_get_editLayerInfoList		=	fn_get_editLayerInfoList;
	_mod_map.fn_set_editLayerInfoList		=	fn_set_editLayerInfoList;
	_mod_map.fn_get_orgEditLayerInfoList	=	fn_get_orgEditLayerInfoList;
	_mod_map.fn_get_userAuthorInfo			=	fn_get_userAuthorInfo;
	//------------------------------------------------------------------------------------------------------------------
	
	return _mod_map;
	

	}(USV.MAP || {}, jQuery));
	
});
MAP_EDITOR.fn_init_timeLine();

</script>
</body>
</html>