<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<header style="width: 100%">    
    <h1 class="logosub"><span>부천시 도시기반시설물 관리시스템</span></h1>
    <section class="menu" >
        <nav>
            <ul>
                <!-- <li class="BG first"><a href="javascript:alert('준비중입니다.');" target="_self"><span>이용안내</span></a></li> -->
                <!-- <li><a href="javascript:alert('준비중입니다.');" target="_self"><span>편집시스템</span></a></li> -->
                <li class="BG last"><a href="javascript:location.href='/login.do';" target="_self" ><span>메인으로</span></a></li>                
            </ul>
        </nav>
        <span>
            <strong>${sessionScope.system_user.USER_NAME}</strong>님 안녕하세요
        </span>
    </section>
</header>
<nav class="gnb">
    <ul class="_over">
        <li><a href="javascript:location.href='/board/list.do';" target="_self"><img src="../images/pages/gnb_manageboard.png" alt="게시판관리"></a></li>
        <li><a href="javascript:location.href='/manage/userList.do'" target="_self"><img src="../images/pages/gnb_manageuser.png" alt="사용자관리"></a></li>
        <!-- <li><a href="javascript:alert('준비중입니다.');" target="_self"><img src="../images/pages/gnb_managecode.png" alt="코드관리"></a></li> -->
        <li><a href="javascript:location.href='/sysLog/logUser.do';" target="_self"><img src="../images/pages/gnb_managelog.png" alt="로그관리"></a></li>
    </ul>
</nav>