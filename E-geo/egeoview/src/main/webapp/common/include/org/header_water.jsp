<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<header style="width: 100%">
	<h1>
		<a href="#none" target="_self"><span>상수관리시스템</span></a>
	</h1>
	<section class="menu">
        <nav>
            <ul>
                <!-- <li class="BG first"><a href="#none" target="_self"><span>권한요청</span></a></li> -->
                <li class="background:none;"><a href="javascript:fnOpenManual('/filestorage/manual/water.pdf');" target="_self"><span>이용안내</span></a></li>
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
		<li class="w_m_1">
			<img src="../images/pages/water/menu01.gif"alt="구역관리">
			<nav class="sub">
				<ul>
					<li class="sub2">상수배수구역
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수배수구역 검색', '<c:url value='/water/wtlAodrAsList.do'/>', 1000, 350, false, '' );">상수배수구역 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">상수급수구역
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수급수구역 검색', '<c:url value='/water/wtlSplyAsList.do'/>', 1000, 350, false, '' );">상수급수구역 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">상수가압구역
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수가압구역 검색', '<c:url value='/water/wtlPresAsList.do'/>', 1000, 350, false, '' );">상수가압구역 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">상수블럭
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수블럭 검색', '<c:url value='/water/wtlBlckAsList.do'/>', 1000, 350, false, '' );">상수블럭 대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_2">
			<img src="../images/pages/water/menu02.gif" alt="관망관리">
			<nav class="sub">
				<ul>
					<li class="sub2">상수관로
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수관로 검색', '<c:url value='/water/wtlPipeLmList.do'/>', 1000, 450, false, '' );">상수관로 대장</a></li>
						</ul>
					</li>

					<li class="sub3">상수폐관
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수폐관 검색', '<c:url value='/water/wtlClosLsList.do'/>', 1000, 350, false, '' );">상수폐관 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">변류시설
						<ul>
							<li><a href="javascript:cfWindowOpen( '변류시설 검색', '<c:url value='/water/wtlValvPsList.do'/>', 1000, 350, false, '' );">변류시설 대장</a></li>
						</ul>
					</li>
					<li class="sub3">상수맨홀
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수맨홀 검색', '<c:url value='/water/wtlManhPsList.do'/>', 1000, 350, false, '' );">상수맨홀 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">소방시설
						<ul>
							<li><a href="javascript:cfWindowOpen( '소방시설 검색', '<c:url value='/water/wtlFirePsList.do'/>', 1000, 350, false, '' );">소방시설 대장</a></li>
						</ul>
					</li>
					<li class="sub3">스탠드파이프
						<ul>
							<li><a href="javascript:cfWindowOpen( '스탠드파이프 검색', '<c:url value='/water/wtlStpiPsList.do'/>', 1000, 350, false, '' );">스탠드파이프 대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_3">
			<img src="../images/pages/water/menu03.gif" alt="부속시설관리">
			<nav class="sub">
				<ul style="width: 140px;">
					<li class="sub2">먹는물 공동시설
						<ul>
							<li><a href="javascript:cfWindowOpen( '먹는물공동시설 검색', '<c:url value='/water/wtlWcmbPsList.do'/>', 1000, 350, false, '' );">먹는물 공동시설 대장</a></li>
						</ul>
					</li>
					<li class="sub3">가압장
						<ul>
							<li><a href="javascript:cfWindowOpen( '가압장 검색', '<c:url value='/water/wtlPresPsList.do'/>', 1000, 350, false, '' );">가압장 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">유량계
						<ul>
							<li><a href="javascript:cfWindowOpen( '유량계 검색', '<c:url value='/water/wtlFlowPsList.do'/>', 1000, 350, false, '' );">유량계 대장</a></li>
						</ul>
					</li>

					<li class="sub3">수압계
						<ul>
							<li><a href="javascript:cfWindowOpen( '수압계 검색', '<c:url value='/water/wtlPrgaPsList.do'/>', 1000, 350, false, '' );">수압계 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2p3">수원지
						<ul>
							<li><a href="javascript:cfWindowOpen( '수원지 검색', '<c:url value='/water/wtlHeadPsList.do'/>', 1000, 350, false, '' );">수원지 대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_4">
			<img src="../images/pages/water/menu04.gif" alt="누수관리">
			<nav class="sub">
				<ul>
					<li class="sub3">누수민원
						<ul>
							<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
								<c:if test = "${auth.key == 'WTT_WSER_MA'}">
									<li><a href="javascript:cfWindowOpen( '누수민원 대장', '<c:url value='/water/wttWserMaCRU.do'/>', 755, 655, false, '', 'center');">신규 누수민원</a></li>
							    </c:if>
							</c:forEach>
							<li><a href="javascript:cfWindowOpen( '누수민원 검색', '<c:url value='/water/wttWserMaList.do'/>', 1000, 350, false, '' );">누수민원 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub3">누수
						<ul>
							<li><a href="javascript:cfWindowOpen( '누수지점및복구내역 검색', '<c:url value='/water/wtlLeakPsList.do'/>', 1000, 350, false, '' );">누수복구 대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_5">
			<img src="../images/pages/water/menu05.gif" alt="수용가관리">
			<nav class="sub">
				<ul style="width: 140px;">
					<li class="sub2">계량기민원
						<ul>
							<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
								<c:if test = "${auth.key == 'WTT_WSER_MA'}">
									<li><a href="javascript:cfWindowOpen( '계량기민원 대장', '<c:url value='/water/wttWserMaCRU.do'/>', 755, 655, false, '', 'center' );">신규 계량기민원</a></li>
							    </c:if>
							</c:forEach>
							<li><a href="javascript:cfWindowOpen( '계량기민원 검색', '<c:url value='/water/wttWserMaList.do?APLCDE=4'/>', 1000, 350, false, '' );">계량기민원 대장</a></li>
						</ul>
					</li>
					<li class="sub3">급수관
						<ul>
							<li><a href="javascript:fnMapInsertWtlSplyLs();">급수관/소방관 입력</a></li>
							<li><a href="javascript:cfWindowOpen( '급수관로 검색', '<c:url value='/water/wtlSplyLsList.do'/>', 1000, 350, false, '' );">급수관 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub3">급수전계량기
						<ul>
							<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
								<c:if test = "${auth.key == 'WTL_META_PS'}">
									<li><a href="javascript:fnMapInsertWtlMetaPs();">급수전계량기 입력</a></li>
							    </c:if>
							</c:forEach>
							<li><a href="javascript:cfWindowOpen( '급수전계량기 검색', '<c:url value='/water/wtlMetaPsList.do'/>', 1000, 500, false, '' );">급수전계량기 대장</a></li>
							<li><a href="javascript:cfWindowOpen( '호별계량기 검색', '<c:url value='/water/wttMetaDtList.do'/>', 1000, 350, false, '' );">호별계량기 검색</a></li>
						</ul>
					</li>
					<li class="sub3">저수조
						<ul>
							<li><a href="javascript:cfWindowOpen( '저수조 검색', '<c:url value='/water/wtlRsrvPsList.do'/>', 1000, 350, false, '' );">저수조 대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_6">
			<img src="../images/pages/water/menu06.gif" alt="공사관리">
			<nav class="sub">
				<ul style="width: 140px;">
					<li class="sub2p2">상수공사
						<ul>
							<c:forEach var="auth" items="${sessionScope.authorities.PROG}">							
								<c:if test = "${auth.key == 'WTT_CONS_MA'}">
									<li><a href="javascript:cfWindowOpen( '상수공사 대장', '<c:url value='/water/wttConsMaCRU.do'/>', 855, 895, false, '', 'center' );">신규 상수공사</a></li>
							    </c:if>
							</c:forEach>
							<li><a href="javascript:cfWindowOpen( '상수공사 검색', '<c:url value='/water/wttConsMaList.do'/>', 1000, 350, false, '' );">상수공사 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2p2">급수공사
						<ul>
							<li><a href="javascript:cfWindowOpen( '급수민원접수 검색', '<c:url value='/water/wttSplyEtList.do'/>', 1000, 350, false, '' );">급수민원접수</a></li>
							<li><a href="javascript:cfWindowOpen( '급수공사설계 검색', '<c:url value='/water/wttSplyPlanList.do'/>', 1000, 350, false, '' );">공사설계</a></li>
							<li><a href="javascript:cfWindowOpen( '급수공사처리 검색', '<c:url value='/water/wttSplyProList.do'/>', 1000, 420, false, '' );">공사처리</a></li>
							<li><a href="javascript:cfWindowOpen( '급수공사 검색', '<c:url value='/water/wttSplyMaList.do'/>', 1000, 550, false, '' );">급수공사대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_7">
			<img src="../images/pages/water/menu07.gif" alt="정수시설물">
			<nav class="sub">
				<ul>
					<li class="sub2">취수장
						<ul>
							<li><a href="javascript:cfWindowOpen( '취수장 검색', '<c:url value='/water/wtlGainPsList.do'/>', 1000, 350, false, '' );">취수장 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">정수장
						<ul>
							<li><a href="javascript:cfWindowOpen( '정수장 검색', '<c:url value='/water/wtlPuriAsList.do'/>', 1000, 350, false, '' );">정수장 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub2">배수지
						<ul>
							<li><a href="javascript:cfWindowOpen( '배수지 검색', '<c:url value='/water/wtlServPsList.do'/>', 1000, 350, false, '' );">배수지 대장</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_8">
			<img src="../images/pages/water/menu08.gif" alt="원정수관리">
			<nav class="sub">
				<ul style="width: 160px;">
					<li class="sub2">원정수 수수현황
						<ul>
							<li><a href="javascript:cfWindowOpen( '원정수수수현황 검색', '<c:url value='/water/wttWnjsEtList.do'/>', 1000, 350, false, '' );">원정수 수수현황 대장</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 160px;">
					<li class="sub2">원정수 수수량 집계
						<ul>
							<li><a href="javascript:cfWindowOpen( '원정수 수수량집계', '<c:url value='/statistic/water/wttWnjsEtTotalStat.do'/>', 800, 600, false, '', 'center');">원정수 수수량집계</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 180px;">
					<li class="sub2">원정수 수수량 년도별 비교
						<ul>
							<li><a href="javascript:cfWindowOpen( '원정수 수수량 년도별 비교', '<c:url value='/statistic/water/wttWnjsEtYearStat.do'/>', 800, 600, false, '', 'center');">원정수 수수량 년도별 비교</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_9">
			<img src="../images/pages/water/menu09.gif" alt="수질관리">
			<nav class="sub">
				<ul>
					<li class="sub3">원정수 수질검사
						<ul>
							<li><a href="javascript:cfWindowOpen( '원정수 수질검사', '<c:url value='/water/wttQtstEtList.do'/>', 900, 500, false, '' );">원정수 수질검사</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 160px;">
					<li class="sub3">가정수도꼭지 수질검사
						<ul>
							<li><a href="javascript:cfWindowOpen( '가정수도꼭지 수질검사', '<c:url value='/water/wttQtabEtCRU.do'/>', 853, 575, false, '', 'center');">가정수도꼭지 수질검사</a></li>
						</ul>
					</li>
				</ul>
				<ul>
					<li class="sub3">민원수질검사
						<ul>
							<li><a href="javascript:cfWindowOpen( '민원수질검사', '<c:url value='/water/wttQualEtList.do'/>', 1030, 525, false, '', 'center');">민원수질검사</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 160px;">
					<li class="sub3">민원수질검사 월별조회
						<ul>
							<li><a href="javascript:cfWindowOpen( '민원수질검사 월별조회', '<c:url value='/water/wttQualEtSelList.do'/>', 250, 180, true, '');">민원수질검사 월별조회</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 180px;">
					<li class="sub3">구별 민방위비상급수시설
						<ul>
							<li><a href="javascript:cfWindowOpen( '구별 민방위비상급수시설', '<c:url value='/water/wttMinbCdSelList.do'/>', 250, 210, true, '');">구별 민방위비상급수시설</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_10">
			<img src="../images/pages/water/menu10.gif" alt="통계처리">
			<nav class="sub">
				<ul style="width: 160px;">
					<li class="sub2">상수도대장 총괄부현황
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수도대장 총괄부현황', '<c:url value='/statistic/water/wtlTotalStat.do'/>', 800, 600, false, '', 'center');">상수도대장 총괄부현황</a></li>
						</ul>
					</li>
					<li class="sub2">상수시설물 현황
						<ul>
							<li><a href="javascript:cfWindowOpen( '상수시설물 현황', '<c:url value='/statistic/water/wtlFacStat.do'/>', 1200, 800, false, '', 'center');">상수시설물 현황</a></li>
						</ul>
					</li>
					<li class="sub3">저수조 현황
						<ul>
							<li><a href="javascript:cfWindowOpen( '저수조 현황', '<c:url value='/statistic/water/wtlRsrvPsStat.do'/>', 800, 600, false, '', 'center');">저수조 현황</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 160px;">
					<li class="sub2p3">급수공사통계
						<ul>
							<li><a href="javascript:cfWindowOpen( '연도별 급수신청', '<c:url value='/statistic/water/wtlSplyEtYearStat.do'/>', 450, 450, false, '', 'center');">연도별 급수신청</a></li>
							<li><a href="javascript:cfWindowOpen( '연도별 폐전현황', '<c:url value='/statistic/water/wtlClosPsYearStat.do'/>', 450, 450, false, '', 'center');">연도별 폐전현황</a></li>
							<li><a href="javascript:cfWindowOpen( '연도별 폐관현황', '<c:url value='/statistic/water/wtlClosLsYearStat.do'/>', 450, 450, false, '', 'center');">연도별 폐관현황</a></li>
							<li><a href="javascript:cfWindowOpen( '동별접수내역', '<c:url value='/statistic/water/wtlSplyEtHjdStat.do'/>', 520, 600, false, '', 'center');">동별접수내역</a></li>
							<li><a href="javascript:cfWindowOpen( '동별급수공사내역', '<c:url value='/statistic/water/wtlSplyMaHjdStat.do'/>', 1030, 600, false, '', 'center');">동별급수공사내역</a></li>
							<li><a href="javascript:cfWindowOpen( '동별구경별급수공사내역', '<c:url value='/statistic/water/wtlSplyMaHjdDipStat.do'/>', 1000, 600, false, '', 'center');">동별구경별급수공사내역</a></li>
							<li><a href="javascript:cfWindowOpen( '구경별수도계량기설치현황', '<c:url value='/statistic/water/wtlMetaPsDipStat.do'/>', 1000, 600, false, '', 'center');">구경별수도계량기설치현황</a></li>
							<li><a href="javascript:cfWindowOpen( '구경별급수관설치현황', '<c:url value='/statistic/water/wtlSplyLsDipStat.do'/>', 1000, 600, false, '', 'center');">구경별급수관설치 현황</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
		<li class="w_m_11">
			<img src="../images/pages/water/menu11.gif" alt="참조정보관리">
			<nav class="sub">
				<ul>
					<li class="sub2p2">참조정보관리
						<ul>
							<li><a href="javascript:cfWindowOpen( '자재단가 관리', '<c:url value='/water/wttMatrCdList.do'/>', 780, 600, false, '', 'center');">자재단가 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '일위대가 관리', '<c:url value='/water/wttIlwiCdList.do'/>', 780, 600, false, '', 'center');">일위대가 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '분담금 관리', '<c:url value='/water/wttFexpEtList.do'/>', 600, 500, false, '', 'center');">분담금 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '공문양식 관리', '<c:url value='/water/wttDfrmEtList.do'/>', 780, 400, false, '', 'center');">공문양식 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '제경비 관리', '<c:url value='/water/wttExraCdList.do'/>', 780, 400, false, '', 'center');">제경비관리</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 200px;">
					<li class="sub2p2" style="background-image: none;">
						<ul>
							<li><a href="javascript:cfWindowOpen( '급수공사수수료 관리', '<c:url value='/water/wttSusuCdList.do'/>', 780, 400, false, '', 'center');">급수공사수수료 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '장비코드 관리', '<c:url value='/water/wttToolCdList.do'/>', 780, 600, false, '', 'center');">장비코드 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '장비 관리', '<c:url value='/water/wttDeptEtList.do'/>', 780, 600, false, '', 'center');">장비 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '공사업체 관리', '<c:url value='/water/wttCompEtList.do'/>', 780, 600, false, '', 'center');">공사업체 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '저수조청소업체 관리', '<c:url value='/water/wttRsrvMtList.do'/>', 780, 600, false, '', 'center');">저수조청소업체 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '원정수 수질검사 항목별 기준관리', '<c:url value='/water/wttQualCdList.do?TYPE=1'/>', 780, 600, false, '', 'center');">원정수 수질검사 항목별 기준관리</a></li>
						</ul>
					</li>
				</ul>
				<ul style="width: 240px;">
					<li class="sub2p2" style="background-image: none;">
						<ul>
							<li><a href="javascript:cfWindowOpen( '가정수도꼭지 수질검사 항목별 기준관리', '<c:url value='/water/wttQualCdList.do?TYPE=2'/>', 780, 600, false, '', 'center');">가정수도꼭지 수질검사 항목별 기준관리</a></li>
							<li><a href="javascript:cfWindowOpen( '기타 수질검사 항목별 기준관리', '<c:url value='/water/wttQualCdList.do?TYPE=3'/>', 780, 600, false, '', 'center');">기타 수질검사 항목별 기준관리</a></li>
							<li><a href="javascript:cfWindowOpen( '수질검사항목및수수료 관리', '<c:url value='/water/wttQitmCdList.do'/>', 780, 600, false, '', 'center');">수질검사항목 및 수수료 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '민방위비상급수시설 관리', '<c:url value='/water/wttMinbCdList.do'/>', 780, 600, false, '', 'center');">민방위비상급수시설 관리</a></li>
							<li><a href="javascript:cfWindowOpen( '수질검사성적서양식 관리', '<c:url value='/water/wttQfrmEtList.do'/>', 780, 600, false, '', 'center');">수질검사성적서양식 관리</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</li>
	</ul>
</nav>