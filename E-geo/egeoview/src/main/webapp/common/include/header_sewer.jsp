<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

	<header style="width: 100%">
        <h1><a href="#none" target="_self"><span>하수관리시스템</span></a></h1>
        <section class="menu">
            <nav>
                <ul>
                    <!-- <li class="BG first"><a href="#none" target="_self"><span>권한요청</span></a></li> -->
                    <li style="background:none;"><a href="javascript:fnOpenManual('/filestorage/manual/sewer.pdf');" target="_self"><span>이용안내</span></a></li>
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
        <ul class="_over_menu" >
            <li class="s_m_1"><img src="../images/pages/sewer/menu01.gif" alt="구역관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">하수처리구역
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '하수처리구역 검색', '<c:url value='/sewer/swlAodpAsList.do'/>', 1000, 350, false, '' );">하수처리구역 대장</a></li>
                            </ul>
                        </li>                    
                        <li class="sub2">하수배수구역
                      		<ul>
                            	<li><a href="javascript:cfWindowOpen( '하수배수구역 검색', '<c:url value='/sewer/swlAodrAsList.do'/>', 1000, 350, false, '' );">하수배수구역 대장</a></li>   	
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li class="sub2">처리분구
                        	<ul>
                            	<li><a href="javascript:cfWindowOpen( '처리분구 검색', '<c:url value='/sewer/swlDodpAsList.do'/>', 1000, 350, false, '' );">처리분구 대장</a></li>  	
                            </ul>
                        </li> 
                        <li class="sub2">배수분구
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '배수분구 검색', '<c:url value='/sewer/swlDodrAsList.do'/>', 1000, 350, false, '' );">배수분구 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                     <ul>
                        <li class="sub2">침수지역
                        	<ul>
                            	<li><a href="javascript:cfWindowOpen( '침수지역 검색', '<c:url value='/sewer/swlChimAsList.do'/>', 1000, 350, false, '' );">침수지역 대장</a></li>   	
                            </ul>
                        </li>                        
                        <li class="sub2">비관리청
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '비관리청 검색', '<c:url value='/sewer/swlMangAsList.do'/>', 1000, 350, false, '' );">비관리청 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="s_m_2"><img src="../images/pages/sewer/menu02.gif" alt="하수민원관리">
                <nav class="sub">
                    <ul style="width:170px">
                        <li class="sub2">하수민원관리
                        	<ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'SWT_SSER_MA'}">
                            			<li><a href="javascript:cfWindowOpen('하수민원 입력', '<c:url value='/sewer/swtSserMaCRU.do'/>', 650, 456, false, '', 'center');">하수민원 입력</a></li>
								    </c:if>
								</c:forEach>
                            	<li><a href="javascript:cfWindowOpen( '하수민원 검색', '<c:url value='/sewer/swtSserMaList.do'/>', 1000, 350, false, '' );">하수민원 조회</a></li>
                            </ul>
                        </li> 
                        <li class="sub2">배수설비인허가관리
                        	<ul>
                        		<li><a href="javascript:cfWindowOpen('배수설비인허가관리 검색', '<c:url value='/sewer/swtSpmtMaList.do'/>', 1000, 350, false, '' );">배수설비인허가관리 조회</a></li>
                        	</ul>
                        </li>                           
					</ul>
                </nav>
            </li>
            <li class="s_m_3"><img src="../images/pages/sewer/menu03.gif" alt="관망관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">하수관거
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '하수관거 검색', '<c:url value='/sewer/swlPipeLmList.do'/>', 1000, 470, false, '' );">하수관거 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">하수폐관
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '하수폐관 검색', '<c:url value='/sewer/swlClosLsList.do'/>', 1000, 350, false, '' );">하수폐관 대장</a></li>
                            </ul>
                        </li>                    
                        <li class="sub2">하수연결관
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '하수연결관 검색', '<c:url value='/sewer/swlConnLsList.do'/>', 1000, 350, false, '' );">하수연결관 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 140px;"> 
                        <li class="sub2">재이용수관리                        
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '재이용수 관로 검색', '<c:url value='/sewer/swlUsepLsList.do'/>', 1000, 350, false, '' );">재이용수 관로 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '재이용수 맨홀 검색', '<c:url value='/sewer/swlUsemPsList.do'/>', 1000, 350, false, '' );">재이용수 맨홀 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '재이용수 제수변 검색', '<c:url value='/sewer/swlUsevPsList.do'/>', 1000, 350, false, '' );">재이용수 제수변 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '재이용수 펌프장 검색', '<c:url value='/sewer/swlUseuPsList.do'/>', 1000, 350, false, '' );" >재이용수 펌프장 대장</a></li>
                            </ul>
                        </li>
                    </ul>                   
                </nav>
            </li>
            <li class="s_m_4"><img src="../images/pages/sewer/menu04.gif" alt="하수시설물">
                <nav class="sub">
                    <ul>
                        <li class="sub2">하수부속시설관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '하수맨홀 검색', '<c:url value='/sewer/swlManhPsList.do'/>', 1000, 350, false, '' );">하수맨홀 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '하수토구 검색', '<c:url value='/sewer/swlSpewPsList.do'/>', 1000, 350, false, '' );">하수토구 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '점형물받이 검색', '<c:url value='/sewer/swlSpotPsList.do'/>', 1000, 350, false, '' );">점형물받이 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '면형물받이 검색', '<c:url value='/sewer/swlSpotAsList.do'/>', 1000, 350, false, '' );">면형물받이 대장</a></li>
                                <li><a href="javascript:cfWindowOpen( '우수토실 검색', '<c:url value='/sewer/swlClayPsList.do'/>', 1000, 350, false, '' );">우수토실 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li class="sub2">집수정
                        	 <ul>
                                <li><a href="javascript:cfWindowOpen( '집수정 검색', '<c:url value='/sewer/swlJipsPsList.do'/>', 1000, 350, false, '' );">집수정 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">역사이펀
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '역사이펀 검색', '<c:url value='/sewer/swlRsphPsList.do'/>', 1000, 350, false, '' );">역사이펀 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">측구
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '측구 검색', '<c:url value='/sewer/swlSideLsList.do'/>', 1000, 350, false, '' );">측구 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 160px;">
                        <li class="sub2">우수유출저감시설
                        	 <ul>
                                <li><a href="javascript:cfWindowOpen( '우수유출 저감시설 검색', '<c:url value='/sewer/swlPresPsList.do'/>', 1000, 350, false, '' );">우수유출 저감시설 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">하수펌프장
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '하수펌프장 검색', '<c:url value='/sewer/swlPumpPsList.do'/>', 1000, 350, false, '' );" target="_self">하수펌프장 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">하수처리장
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '하수처리장 검색', '<c:url value='/sewer/swlDranPsList.do'/>', 1000, 350, false, '' );" target="">하수처리장 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">환기구
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '환기구 검색', '<c:url value='/sewer/swlVentPsList.do'/>', 1000, 350, false, '' );" target="">환기구 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </li>
            <li class="s_m_5"><img src="../images/pages/sewer/menu05.gif" alt="지하수/하천">
                <nav class="sub">
                    <ul>
                        <li class="sub2">지하수
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '지하수 검색', '<c:url value='/sewer/swlJihaPsList.do'/>', 1000, 350, false, '' );" target="">지하수 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">하천
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '하천 검색', '<c:url value='/sewer/swlHachAsList.do'/>', 1000, 350, false, '' );" target="">하천 대장</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                     	<li class="sub2">세류/건천                     
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '세류/건천 검색', '<c:url value='/sewer/swlSeruLsList.do'/>', 1000, 350, false, '' );" target="">세류/건천 대장</a></li>
                            </ul>
                        </li>                      
                    </ul>
                </nav>
            </li>
            <li class="s_m_6"><img src="../images/pages/sewer/menu06.gif" alt="하천부속시설물">
                <nav class="sub">
                    <ul>
                        <li class="sub2">축제
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '축제 검색', '<c:url value='/sewer/swlChucLsList.do'/>', 1000, 350, false, '' );" target="">축제 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">호안
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '호안 검색', '<c:url value='/sewer/swlHoanLsList.do'/>', 1000, 350, false, '' );" target="">호안 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">하천교량
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '하천교량 검색', '<c:url value='/sewer/swlSubfAsList.do?FTR_CDE=AE010'/>', 1000, 350, false, '' );" target="">하천교량 대장</a></li>
                            </ul>
                        </li>
                    </ul>   
                    <ul>
                        <li class="sub2">배수문
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '배수문 검색', '<c:url value='/sewer/swlSubfAsList.do?FTR_CDE=BB010'/>', 1000, 350, false, '' );" target="">배수문 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">보
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '보 검색', '<c:url value='/sewer/swlSubfLsList.do?FTR_CDE=BB030'/>', 1000, 350, false, '' );" target="">보 대장</a></li>
                            </ul>
                        </li>
                    </ul>   
                    <ul style="width: 140px;">   
                        <li class="sub2">낙차공
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '낙차공 검색', '<c:url value='/sewer/swlSubfLsList.do?FTR_CDE=BB099'/>', 1000, 350, false, '' );" target="">낙차공 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2">하천측량기준점
                        	<ul>
                                <li><a href="javascript:cfWindowOpen( '하천측량기준점 검색', '<c:url value='/sewer/swlMeabPsList.do'/>', 1000, 350, false, '' );" target="">하천측량기준점 대장</a></li>
                            </ul>
                        </li>
                    </ul>                   
                </nav>
            </li>
            <li class="s_m_7"><img src="../images/pages/sewer/menu07.gif" alt="공사관리">
                <nav class="sub">
                    <ul style="width: 140px;">
                        <li class="sub3">하수공사
                            <ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'SWT_CONS_MA'}">
                                		<li><a href="javascript:cfWindowOpen( '하수공사 대장', '<c:url value='/sewer/swtConsMaCRU.do?CND_CDE=CND001'/>', 832, 830, false, '', 'center');" target="">신규 하수공사</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '하수공사 검색', '<c:url value='/sewer/swtConsMaList.do?CND_CDE=CND001'/>', 1000, 350, false, '' );" target="">하수공사 대장</a></li>
                            </ul>
                        </li>
                    </ul> 
                    <ul style="width: 140px;">                        
                        <li class="sub3">하천공사
                        	<ul>
								<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'SWT_CONS_MA'}">
                                		<li><a href="javascript:cfWindowOpen( '하천공사 대장', '<c:url value='/sewer/swtConsMaCRU.do?CND_CDE=CND002'/>', 832, 830, false, '', 'center');" target="">신규 하천공사</a></li>
								    </c:if>
								</c:forEach>
                                <li><a href="javascript:cfWindowOpen( '하천공사 검색', '<c:url value='/sewer/swtConsMaList.do?CND_CDE=CND002'/>', 1000, 350, false, '' );" target="">하천공사 대장</a></li>
                            </ul>
                        </li>
                    </ul>                                   
                </nav>
            </li>
            <li class="s_m_8"><img src="../images/pages/sewer/menu08.gif" alt="하천점용관리">
                <nav class="sub">
                    <ul style="width:140px;">
                        <li class="sub2"><a href="#none" target="_self">하천점용</a>
                            <ul>
                            	<li><a href="#none" target="_self" onclick="cfWindowOpen('하천점용목록', '<c:url value='/sewer/swtJumyEtList.do'/>', 1000, 450, false, '');">하천점용 대장</a></li>
                            </ul>
                        </li>
                        <li class="sub2"><a href="#none" target="_self">점용료 산정관리</a>
                            <ul>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '하천점용관리', '<c:url value='/sewer/swtJumyE2List.do'/>', 750, 579, false, '', 'center');">점용료 산정관리</a></li>
                            </ul>
                        </li>
                        <li class="sub2"><a href="#none" target="_self">점용료 수납관리</a>
                            <ul>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '하천점용료 수납관리', '<c:url value='/sewer/swtJumyE1List.do'/>', 1032, 500, false, '', 'center');">점용료 수납관리</a></li>
                            </ul>
                        </li>
                        <li class="sub2"><a href="#none" target="_self">점용료 체납관리</a>
                            <ul>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '하천점용료 체납관리', '<c:url value='/sewer/swtJumyChaMngList.do'/>', 668, 521, false, '', 'center');">점용료 체납관리</a></li>
                            </ul>
                        </li>
                    </ul>                    
                    <ul style="width:170px;">
                        <li class="sub2"><a href="#none" target="_self">인접지 자료점검</a>
                            <ul>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '인접지 자료점검', '<c:url value='/sewer/swtJumyJigaList.do'/>', 1032, 500, false, '', 'center');">인접지 자료점검</a></li>
                            </ul>
                        </li>
                        <li class="sub2"><a href="#none" target="_self">기초자료관리</a>
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '점용료 산정 기준자료관리 검색', '<c:url value='/sewer/swtJumyE3List.do'/>', 665, 600, false, '', 'center');" target="">점용료 산정 기준자료관리</a></li>
                                <li><a href="javascript:cfWindowOpen( '재배작물 및 소득금액 관리 검색', '<c:url value='/sewer/swtJumyE4List.do'/>', 665, 600, false, '', 'center');" target="">재배작물 및 소득금액 관리</a></li>
                            </ul>
                        </li>
                     </ul>   
                </nav>
            </li>
            <li class="s_m_9"><img src="../images/pages/sewer/menu09.gif" alt="원인자부담금관리">
                <nav class="sub">
                    <ul style="width: 180px;">
                        <li class="sub3p3">원인자부담금관리
                            <ul>
								<%-- <c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
									<c:if test = "${auth.key == 'SWL_CHAR_PS'}">
                                		<li><a href="javascript:cfWindowOpen( '신규 원인자부담금 입력', '<c:url value='/sewer/swlCharPsRU.do'/>', 795, 755, true, '', 'center' );" target="">신규 원인자부담금</a></li>
								    </c:if>
								</c:forEach> --%>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '원인자부담금 검색', '<c:url value='/sewer/swlCharPsList.do'/>', 1000, 400, false, '');">원인자부담금 대장</a></li>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '원인자부담금 수납관리 검색', '<c:url value='/sewer/swlCharPs2List.do'/>', 1000, 400, false, '');">원인자부담금 수납관리</a></li>
                                <li><a href="#none" target="_self" onclick="cfWindowOpen( '원인자부담금 단가관리 검색', '<c:url value='/sewer/swtCharEtList.do'/>', 650, 390, true, '');">원인자부담금 단가관리</a></li>
                            </ul>
                        </li>
                    </ul>                   
                </nav>
            </li>
            <li class="s_m_10"><img src="../images/pages/sewer/menu10.gif" alt="통계처리">
                <nav class="sub">
                    <ul style="width: 160px;">
                        <li class="sub2">하수도대장 총괄부현황
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '하수도대장 총괄부현황', '<c:url value='/statistic/sewer/swlTotalStat.do'/>', 800, 450, false, '', 'center');">하수도대장 총괄부현황</a></li>
                            </ul>
                        </li>                  
                        <li class="sub2">하수시설물 현황
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '하수시설물 현황', '<c:url value='/statistic/sewer/swlFacStat.do'/>', 1200, 800, false, '', 'center');">하수시설물 현황</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul style="width: 160px;">
                        <li class="sub2">침수지역피해 현황
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '침수지역피해 현황', '<c:url value='/statistic/sewer/swlChimAsStat.do'/>', 450, 450, false, '', 'center');">침수지역피해 현황</a></li>                                
                            </ul>
                        </li>
                    </ul>               
                </nav>
            </li>
            <li class="s_m_11"><img src="../images/pages/sewer/menu11.gif" alt="참조정보관리">
                <nav class="sub">
                    <ul>
                        <li class="sub2">장비관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '장비관리 검색', '<c:url value='/sewer/swtDeptEtList.do'/>', 1000, 650, false, '', 'center');" target="">장비관리</a></li>                       
                            </ul>
                        </li>  
                    </ul>
                    <ul>
                    	<li class="sub2">공사업체 관리
                            <ul>
                                <li><a href="javascript:cfWindowOpen( '공사업체 검색', '<c:url value='/sewer/swtCompEtList.do'/>', 1000, 650, false, '', 'center');" target="">공사업체 관리</a></li>                            </ul>
                    	</li>
                    </ul>                                 
                </nav>
            </li>
            
        </ul>
    </nav>