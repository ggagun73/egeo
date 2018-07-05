<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<footer>
    <div class="wrap">
        <div class="logo"><img src="/images/common/footer_logo.png" alt="환타지아 부천 부천시"></div>
        <div class="info">
            <span class="address">420-736 경기도 부천시 원미구 길주로 210(중동)</span>
            <span class="copyright">COPYRIGHT (C)<strong>BUCHEON CITY</strong> ALL RIGHTS RESERVED.</span>
        </div>
        <div class="bn">
        	<a href="javascript:fnGoIntra();"><img src="/images/common/mbn01.jpg" alt="도시지도정보서비스"></a>
        	<a href="javascript:fnGoUnder();"><img src="/images/common/mbn02.jpg" alt="지하시설물 통합관리시스템 "></a>
        </div>
    </div>
</footer>
    
<script type="text/javascript">
function fnGoIntra() {
	var vUserId = "${sessionScope.system_user.USER_ID}";
	var vUserName = "${sessionScope.system_user.USER_NAME}";
	var vUserDept = "경기도 부천시 ${sessionScope.system_user.USER_DEPT_M_UPPER} ${sessionScope.system_user.USER_DEPT}";
	var param = "id=" + vUserId + "&name=" + vUserName + "&dept=" + vUserDept;
	window.open("http://105.5.1.22/bucheon18_theme/login/sso_login.aspx?" + param);
}
function fnGoUnder() {
	window.open("http://105.5.1.22/bucheon15_g/login/login.aspx");
}
</script>