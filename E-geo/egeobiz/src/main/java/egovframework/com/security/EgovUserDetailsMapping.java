package egovframework.com.security;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import usolver.com.main.vo.LoginVO;
import egovframework.let.utl.sim.service.EgovClntInfo;
import egovframework.rte.fdl.security.userdetails.EgovUserDetails;
import egovframework.rte.fdl.security.userdetails.jdbc.EgovUsersByUsernameMapping;

public class EgovUserDetailsMapping extends EgovUsersByUsernameMapping {

    /**
     * EgovUserDetailsMapping 생성자
     * @param ds
     * @param usersByUsernameQuery
     */
    public EgovUserDetailsMapping(DataSource ds, String usersByUsernameQuery) {
        super(ds, usersByUsernameQuery);
    }

    /*
     * (non-Javadoc)
     * @see
     * egovframework.rte.fdl.security.userdetails.jdbc
     * .EgovUsersByUsernameMapping
     * #mapRow(java.sql.ResultSet, int)
     */
    /**
     * EgovUsersByUsernameMapping 클래스를 상속받아
     * jdbc-user-service 에서 지정된 users-by-username-query
     * 의 쿼리문을 조회하여 ResultSet에 매핑된다.
     */
    @Override
    protected EgovUserDetails mapRow(ResultSet rs, int rownum) throws SQLException {

        String userid = rs.getString("user_id");
        String password = rs.getString("password");
        boolean enabled = rs.getBoolean("enabled");
        String username = rs.getString("user_name");
        String userdept = rs.getString("user_dept"); 
        String userdeptname = rs.getString("user_dept_name"); 
        String usertel  = rs.getString("user_tel");
        String pwdate  = rs.getString("pw_date");        
        String userIp = ""; // rs.getString("user_ip");
        String initextent  = rs.getString("init_extent");
        // TODO USERS 테이블 컬럼 변경
        // 세션에서 관리되는 항목 추가
        // 예) String birthDay = rs.getString("birth_day");

        LoginVO userVO = new LoginVO();
        userVO.setUSER_ID(userid);
        userVO.setPASSWORD(password);
        userVO.setUSER_NAME(username);
        userVO.setUSER_DEPT(userdept);
        userVO.setUSER_DEPT_NAME(userdeptname);
        userVO.setUSER_TEL(usertel);
        userVO.setUSER_IP(userIp);
        userVO.setINIT_EXTENT(initextent);
        
        // TODO USERS 테이블 컬럼 변경
        // 세션에서 관리되는 항목 추가
        // 예) userVO.setBirthDay(birthDay);

        return new EgovUserDetails(userid, password, enabled, userVO);
    }

}

