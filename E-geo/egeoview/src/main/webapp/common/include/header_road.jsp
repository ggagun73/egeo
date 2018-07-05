<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
	<header style="width: 100%">
        <h1><a href="#none" target="_self"><span>도로관리시스템</span></a></h1>
        <section class="menu">
            <nav>
                <ul>
                    <!-- <li class="BG first"><a href="#none" target="_self"><span>권한요청</span></a></li> -->
                    <li style="background:none;"><a href="javascript:fnOpenManual('/filestorage/manual/road.pdf');" target="_self"><span>이용안내</span></a></li>
                	<c:if test="${sessionScope.system_user.SYS_EDITOR eq 2}">
                    	<!-- <li><a href="#none" target="_self"><span>편집시스템</span></a></li> -->
	   				</c:if>
                	<c:if test="${sessionScope.system_user.SYS_ADMIN eq 2}">
                    	<!-- <li><a href="#none" target="_self"><span>관리자</span></a></li> -->
	   				</c:if>
                </ul>
            </nav>
            <span>
                <strong><c:out value="${sessionScope.system_user.USER_NAME }"/></strong>님 안녕하세요
                <!-- 둘 중 선택하여 사용 -->
                <!-- <a href="/logout.do" target="_self">로그아웃</a> -->
                <!-- 둘 중 선택하여 사용 --> 
            </span>
        </section>
    </header>    
    <nav class="gnb">
        <ul class="_over_menu">
            <li class="r_m_1"><img src="../images/pages/road/menu01.gif" alt="도로관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">도로중심선 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '도로중심선 검색', '<c:url value='/road/rdlCtlrLsList.do'/>', 1000, 350, false, '' );">도로중심선 대장</a></li>
    	
                            </ul>
                        </li>
                        <li class="sub2">오르막차로 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '오르막차로 검색', '<c:url value='/road/rdtClbmDtList.do'/>', 1000, 350, false, '' );">오르막차로 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">복개도로 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '복개도로 검색', '<c:url value='/road/rdlClrdAsList.do'/>', 1000, 350, false, '' );">복개도로 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">접도구역 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '접도구역 검색', '<c:url value='/road/rdlRdlnAsList.do'/>', 1000, 350, false, '' );">접도구역 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li class="sub2">도로노선 관리
                        	<ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_ROUT_DT'}">
                                		<li><a href="javascript:cfWindowOpen( '도로노선 대장', '<c:url value='/road/rdtRoutDtCRU.do'/>', 1102, 810, false, '', 'center' );">신규 도로노선대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '도로노선 검색', '<c:url value='/road/rdtRoutDtList.do'/>', 1000, 350, false, '' );">도로노선 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">종단경사 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '종단경사 검색', '<c:url value='/road/rdlCtlrLs2List.do'/>', 1000, 350, false, '' );">종단경사 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">교통광장 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '교통광장 검색', '<c:url value='/road/rdlSqarAsList.do'/>', 1000, 350, false, '' );">교통광장 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">교차시설 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '교차시설 검색', '<c:url value='/road/rdlCrosPsList.do'/>', 1000, 350, false, '' );">교차시설 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul >
                        <li class="sub2">도로실연장 관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_RDCD_DT'}">
                                		<li><a href="javascript:cfWindowOpen( '도로실연장 대장 ', '<c:url value='/road/rdtRdcdDtCRU.do'/>', 630, 720, false, '', 'center' );">신규 도로실연장대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '도로실연장 검색', '<c:url value='/road/rdtRdcdDtList.do'/>', 1000, 350, false, '' );">도로실연장 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">유료도로 관리
                        	<ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_FEED_DT'}">
                        				<li><a href="javascript:cfWindowOpen( '유료도로 대장', '<c:url value='/road/rdtFeedDtCRU.do'/>', 630, 415, false, '', 'center' );">신규 유료도로대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '유료도로 검색', '<c:url value='/road/rdtFeedDtList.do'/>', 1000, 350, false, '' );">유료도로 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">차도구간 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '차도구간관리 검색', '<c:url value='/road/rdtRdwyDtList.do'/>', 1000, 350, false, '' );">차도구간  대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li class="sub2">보도구간 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '보도구간 검색', '<c:url value='/road/rdtSdwkDtList.do'/>', 1000, 350, false, '' );">보도구간  대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">우회도로 관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_RNDW_DT'}">
                                		<li><a href="javascript:cfWindowOpen( '우회도로 대장', '<c:url value='/road/rdtRndwDtCRU.do'/>', 630, 415, false, '', 'center' );">신규 우회도로대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '우회도로 검색', '<c:url value='/road/rdtRndwDtList.do'/>', 1000, 350, false, '' );">우회도로 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">자전거도로 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '자전거도로 검색', '<c:url value='/road/rdlBycpAsList.do'/>', 1000, 350, false, '' );">자전거도로 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2">도로중심선교점 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '도로중심선교점 검색', '<c:url value='/road/rdtIpcrDtList.do'/>', 1000, 350, false, '' );">도로중심선교점 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">용지 관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_LAND_DT'}">
                                		<li><a href="javascript:cfWindowOpen( '용지 대장', '<c:url value='/road/rdtLandDtCRU.do'/>', 630, 415, false, '', 'center' );">신규 용지대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '용지 검색', '<c:url value='/road/rdtLandDtList.do'/>', 1000, 350, false, '' );">용지 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">미개설도로 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '미개설도로 검색', '<c:url value='/road/rdlPlrdAsList.do'/>', 1000, 350, false, '' );">미개설도로 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_2"><img src="../images/pages/road/menu02.gif" alt="공사관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">도로공사 관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_CONS_MA'}">
                                		<li><a href="javascript:cfWindowOpen( '도로공사 대장', '<c:url value='/road/rdtConsMaCRU.do'/>', 895, 855, false, '', 'center' );">신규 도로공사대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '도로공사 검색', '<c:url value='/road/rdtConsMaList.do'/>', 1000, 350, false, '' );">도로공사 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">포장 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '포장 검색', '<c:url value='/road/rdtPaveDtList.do'/>', 1000, 350, false, '' );">포장 대장</a></li>
                        	</ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_3"><img src="../images/pages/road/menu03.gif" alt="시설물관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">교량 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '교량 검색', '<c:url value='/road/rdlBrdgAsList.do'/>', 1000, 350, false, '' );">교량 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">지하차도 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '지하차도 검색', '<c:url value='/road/rdlUgrdAsList.do'/>', 1000, 350, false, '' );">지하차도 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">터널 관리
                       		<ul>
                                <li><a href="javascript:cfWindowOpen( '터널 검색', '<c:url value='/road/rdlTrnlAsList.do'/>', 1000, 350, false, '' );">터널 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        
                        <li class="sub2">지하상가 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '지하상가 검색', '<c:url value='/road/rdlDnsrAsList.do'/>', 1000, 350, false, '' );">지하상가 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">육교 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '육교 검색', '<c:url value='/road/rdlOvpsAsList.do'/>', 1000, 350, false, '' );">육교 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">통로박스 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '통로박스 검색', '<c:url value='/road/rdlPboxAsList.do'/>', 1000, 350, false, '' );">통로박스 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li class="sub2">고가도로 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '고가도로 검색', '<c:url value='/road/rdlEvrdAsList.do'/>', 1000, 350, false, '' );">고가도로 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">공동구 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '공동구 검색', '<c:url value='/road/rdlCmdtAsList.do'/>', 1000, 350, false, '' );">공동구 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">지하보도 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '지하보도 검색', '<c:url value='/road/rdlSbwyAsList.do'/>', 1000, 350, false, '' );">지하보도 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        
                        <li class="sub2">IC 관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_INCH_DT'}">
                                		<li><a href="javascript:cfWindowOpen( 'IC 대장', '<c:url value='/road/rdtInchDtCRU.do?FTR_CDE=AE030'/>', 632, 690, false, '', 'center' );">신규 IC 대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( 'IC대장 검색', '<c:url value='/road/rdtInchDtList.do'/>', 1000, 350, false, '' );">IC 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_4"><img src="../images/pages/road/menu04.gif" alt="부속물관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">석축/옹벽 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '석축/옹벽 검색', '<c:url value='/road/rdlSmrwLsList.do'/>', 1000, 350, false, '' );">석축/옹벽 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">도로반사경 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '도로반사경 검색', '<c:url value='/road/rdlRdcmPsList.do'/>', 1000, 350, false, '' );">도로반사경 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">방호울타리 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '방호울타리 검색', '<c:url value='/road/rdlProtLsList.do'/>', 1000, 350, false, '' );">방호울타리 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">휴게소 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '휴게소 검색', '<c:url value='/road/rdlRestPsList.do'/>', 1000, 350, false, '' );">휴게소 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2">도로표지판 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '도로표지판 검색', '<c:url value='/road/rdlRdsnPsList.do'/>', 1000, 350, false, '' );">도로표지판 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">가드레일 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '가드레일 검색', '<c:url value='/road/rdlGralLsList.do'/>', 1000, 350, false, '' );">가드레일 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">과적검문소 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '과적검문소 검색', '<c:url value='/road/rdlChkpPsList.do'/>', 1000, 350, false, '' );">과적검문소 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">충격흡수시설 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '충격흡수시설 검색', '<c:url value='/road/rdlSockPsList.do'/>', 1000, 350, false, '' );">충격흡수시설 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2">과속방지시설 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '과속방지시설 검색', '<c:url value='/road/rdlSdhpAsList.do'/>', 1000, 350, false, '' );">과속방지시설 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">방음시설 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '방음시설 검색', '<c:url value='/road/rdlSdpfLsList.do'/>', 1000, 350, false, '' );">방음시설 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">방설 및 제설 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '방설 및 제설 검색', '<c:url value='/road/rdlSnowPsList.do'/>', 1000, 350, false, '' );">방설 및 제설 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">자전거보관소 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '자전거보관소 검색', '<c:url value='/road/rdlBystPsList.do'/>', 1000, 350, false, '' );">자전거보관소 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2">미끄럼방지시설 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '미끄럼방지시설 검색', '<c:url value='/road/rdlNspvAsList.do'/>', 1000, 350, false, '' );">미끄럼방지시설 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">낙석방지시설 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '낙석방지시설 검색', '<c:url value='/road/rdlStonLsList.do'/>', 1000, 350, false, '' );">낙석방지시설 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">도로원표 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '도로원표 검색', '<c:url value='/road/rdlRdwpPsList.do'/>', 1000, 350, false, '' );">도로원표 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">가로안내시설물 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '가로안내시설물 검색', '<c:url value='/road/rdlPsgnPsList.do'/>', 1000, 350, false, '' );">가로안내시설물 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 150px">
                        <li class="sub2">절개지/성토면 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '절개지/성토면 검색', '<c:url value='/road/rdlSlopAsList.do'/>', 1000, 350, false, '' );">절개지/성토면 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">중앙분리대 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '중앙분리대 검색', '<c:url value='/road/rdlMdstLsList.do'/>', 1000, 350, false, '' );">중앙분리대 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">차량진입방지시설 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '차량진입방지시설 검색', '<c:url value='/road/rdlNpenLsList.do'/>', 1000, 350, false, '' );">차량진입방지시설 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_5"><img src="../images/pages/road/menu05.gif" alt="교통시설물관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">신호등 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '신호등 검색', '<c:url value='/road/rdlTrsnPsList.do'/>', 1000, 350, false, '' );">신호등 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">일방통행로 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '일방통행로 검색', '<c:url value='/road/rdlOwgrLsList.do'/>', 1000, 350, false, '' );">일방통행로 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">신호등철주 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '신호등철주 검색', '<c:url value='/road/rdlPolePsList.do'/>', 1000, 350, false, '' );">신호등철주 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        
                        <li class="sub2">주정차금지구역 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '주정차금지구역 검색', '<c:url value='/road/rdlNpraAsList.do'/>', 1000, 350, false, '' );">주정차금지구역 대장</a></li>
                            </ul>
                        </li>

                        <li class="sub2">신호등제어기 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '신호등제어기 검색', '<c:url value='/road/rdlSgetPsList.do'/>', 1000, 350, false, '' );">신호등제어기 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">어린이보호구역 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '어린이보호구역 검색', '<c:url value='/road/rdlAbarAsList.do'/>', 1000, 350, false, '' );">어린이보호구역 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2">신호기연동 관리
                        	<ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_YNDG_DT'}">
                        				<li><a href="javascript:cfWindowOpen( '신호기연동 대장', '<c:url value='/road/rdtYndgDtCRU.do'/>', 630, 630, false, '', 'center' );">신규 신호기연동대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '신호기연동 검색', '<c:url value='/road/rdtYndgDtList.do'/>', 1000, 350, false, '' );">신호기연동 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">정류장 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '정류장 검색', '<c:url value='/road/rdlStatPsList.do'/>', 1000, 350, false, '' );">정류장 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">교차로 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '교차로 검색', '<c:url value='/road/rdlSgraAsList.do'/>', 1000, 350, false, '' );">교차로 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        
                        <li class="sub2">횡단보도 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '횡단보도 검색', '<c:url value='/road/rdlPdcrAsList.do'/>', 1000, 350, false, '' );">횡단보도 대장</a></li>
                            </ul>
                        </li>

                        <li class="sub2">교통표지판 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '교통표지판 검색', '<c:url value='/road/rdlTfsnPsList.do'/>', 1000, 350, false, '' );">교통표지판 대장</a></li>
                            </ul>
                        </li>
                	</ul>
                </nav>
            </li>
            <li class="r_m_6"><img src="../images/pages/road/menu06.gif" alt="주차시설/노점상">
                <nav class="sub">
                    <ul  style="width: 140px">
                        <li class="sub2">주차장 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '주차장 검색', '<c:url value='/road/rdlPakpAsList.do'/>', 1000, 350, false, '' );">주차장 대장</a></li>
                            </ul>
                        </li>

                        <li class="sub2">부설주차장 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '부설주차장 검색', '<c:url value='/road/rdlBuslPsList.do'/>', 1000, 350, false, '' );">부설주차장 대장</a></li>
                            </ul>
                        </li>

                        <li class="sub2">내집안주차장 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '내집안주차장 검색', '<c:url value='/road/rdlLvpkPsList.do'/>', 1000, 350, false, '' );">내집안주차장 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2">주차장표지판 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '주차장표지판 검색', '<c:url value='/road/rdlPkgnPsList.do'/>', 1000, 350, false, '' );">주차장표지판 대장</a></li>
                            </ul>
                        </li>

                        <li class="sub2">노점상 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '노점상 검색', '<c:url value='/road/rdlKeepPsList.do'/>', 1000, 350, false, '' );">노점상 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_7"><img src="../images/pages/road/menu07.gif" alt="조명/조경시설관리">
                <nav class="sub">
                    <ul>
                        <li class="sub3">가로등 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '가로등 검색', '<c:url value='/road/rdlStltPsList.do'/>', 1000, 350, false, '' );">가로등 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">공원 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '공원 검색', '<c:url value='/road/rdlParkAsList.do'/>', 1000, 350, false, '' );">공원 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li class="sub3">보안등 관리
                        	<ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDL_SCLT_PS'}">
                                		<li><a href="javascript:fnMapInsertRdlScltPs();">보안등 입력</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '보안등 검색', '<c:url value='/road/rdlScltPsList.do'/>', 1000, 350, false, '' );">보안등 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">약수터 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '약수터 검색', '<c:url value='/water/wtlWcmbPsList.do'/>', 1000, 350, false, '' );">약수터 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub3">배전함 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '배전함 검색', '<c:url value='/road/rdlBejnPsList.do'/>', 1000, 350, false, '' );">배전함 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">가로화단/녹지 관리
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '가로화단/녹지 검색', '<c:url value='/road/rdlGrenAsList.do'/>', 1000, 350, false, '' );">가로화단/녹지 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 170px">
                        <li class="sub3">가로수 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '가로수 검색', '<c:url value='/road/rdlTreePsList.do'/>', 1000, 350, false, '' );">가로수 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub3">가로수노선 관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_NOTR_DT'}">
                           				<li><a href="javascript:cfWindowOpen( '노선별 가로수관리 대장', '<c:url value='/road/rdtNotrDtCRU.do'/>', 630, 600, false, '', 'center' );">신규 노선별 가로수관리 대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '노선별 가로수관리 검색', '<c:url value='/road/rdtNotrDtList.do'/>', 1000, 350, false, '' );">노선별 가로수관리 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '새주소 노선별 가로수 통계', '<c:url value='/statistic/road/rdlTreePsStat.do'/>', 600, 600, false, '', 'center');">새주소 노선별 가로수 통계</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_8"><img src="../images/pages/road/menu08.gif" alt="도로굴착점용관리">
                <nav class="sub">
                    <ul style="width: 130px">
                        <li class="sub2p3">도로굴착관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_EXAL_DT'}">
                                		<li><a href="javascript:cfWindowOpen( '굴착허가 대장', '<c:url value='/road/rdtExalDtCRU.do'/>', 1052, 860, false, '', 'center' );">신규 굴착허가 대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '굴착허가 검색', '<c:url value='/road/rdtExalDtList.do'/>', 1000, 350, false, '' );">굴착허가 대장</a></li>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDL_EXCV_AS'}">
                                		<li><a href="javascript:fnMapInsertRdlExcvAs();">굴착허가위치 입력</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '굴착허가위치 검색', '<c:url value='/road/rdlExcvAsList.do'/>', 1000, 350, false, '' );">굴착허가위치 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '굴착단가관리 검색', '<c:url value='/road/rdtGulcEtList.do'/>', 500, 510, false, '', 'center' );">굴착단가관리</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 130px">
                        <li class="sub2p3">도로점용관리
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'RDT_OCAL_DT'}">
                                		<li><a href="javascript:cfWindowOpen( '점용허가 대장', '<c:url value='/road/rdtOcalDtCRU.do'/>', 630, 720, false, '', 'center' );">신규 점용허가 대장</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '점용허가 검색', '<c:url value='/road/rdtOcalDtList.do'/>', 1000, 350, false, '' );">점용허가 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '점용시설(점) 검색', '<c:url value='/road/rdlOcupPsList.do'/>', 1000, 350, false, '' );">점용시설(점) 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '점용시설(면) 검색', '<c:url value='/road/rdlOcupAsList.do'/>', 1000, 350, false, '' );">점용시설(면) 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '점용료 정기분 산정', '<c:url value='/road/rdtOcalDtPayList.do'/>', 800, 600, false, '', 'center');">점용료 정기분 산정</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="r_m_9"><img src="../images/pages/road/menu09.gif" alt="도로현황통계">
                <nav class="sub">
                    <ul style="width: 140px">
                        <li class="sub2p3">도로현황
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '연도별 도로보급율 현황', '<c:url value='/statistic/road/rdlYearRoadRateStat.do'/>', 600, 600, false, '', 'center');">연도별 도로보급율 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '연도별 도로 현황', '<c:url value='/statistic/road/rdlYearRoadStat.do'/>', 1000, 600, false, '', 'center');">연도별 도로 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '노선별 도로현황', '<c:url value='/statistic/road/rdlRoutRoadStat.do'/>', 1000, 600, false, '', 'center');">노선별 도로현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '연도별 도로포장 현황', '<c:url value='/statistic/road/rdlYearRoadPaveStat.do'/>', 1000, 600, false, '', 'center');">연도별 도로포장 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '동별 자전거도로 현황', '<c:url value='/statistic/road/rdlBycpAsHjdStat.do'/>', 520, 600, false, '', 'center');">동별 자전거도로 현황</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2p3">도로시설물현황
                       		 <ul>
                                <li><a href="javascript:cfWindowOpen( '시설물 현황', '<c:url value='/statistic/road/rdlFacStat.do'/>', 800, 600, false, '', 'center');">시설물 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '연도별 도로시설물 현황', '<c:url value='/statistic/road/rdlFacYearStat.do'/>', 1000, 600, false, '', 'center');">연도별 도로시설물 현황</a></li>
                            </ul>
                    	</li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2p3">교통시설물현황
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '교통시설물 총괄부 현황', '<c:url value='/statistic/road/rdlTrafficTotalStat.do'/>', 800, 600, false, '', 'center');">교통시설물 총괄부 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '교통안전시설물 현황', '<c:url value='/statistic/road/rdlTrafficSafeStat.do'/>', 1000, 600, false, '', 'center');">교통안전시설물 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '신호등설치 현황', '<c:url value='/statistic/road/rdlTrsnPsStat.do'/>', 800, 600, false, '', 'center');">신호등설치 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '제어기설치 현황', '<c:url value='/statistic/road/rdlSgetPsStat.do'/>', 800, 600, false, '', 'center');">제어기설치 현황</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px">
                        <li class="sub2p3">굴착현황
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '연도별 굴착 현황', '<c:url value='/statistic/road/rdlExcvAsYearStat.do'/>', 520, 600, false, '', 'center');">연도별 굴착 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '노선별 굴착 현황', '<c:url value='/statistic/road/rdlExcvAsAdaCdeStat.do'/>', 520, 600, false, '', 'center');">노선별 굴착 현황</a></li>
                                <li><a href="javascript:cfWindowOpen( '행정구역별 굴착 현황', '<c:url value='/statistic/road/rdlExcvAsHjdStat.do'/>', 520, 600, false, '', 'center');">행정구역별 굴착 현황</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
        </ul>
    </nav>