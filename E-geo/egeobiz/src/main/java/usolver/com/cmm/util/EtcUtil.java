package usolver.com.cmm.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import egovframework.rte.psl.dataaccess.util.EgovMap;

import usolver.com.cmm.vo.AuthorVO;


public class EtcUtil {
	// 로그인 세션의 값이 있는지 확인
	// 메뉴 아이디에 해당하는 편집 권한 확인 : W (쓰기 가능)
	public static String getAuthor(HttpSession session, String menuid) {
		AuthorVO auth = (AuthorVO) session.getAttribute("authorities");
    	if( auth!=null && auth.getPROG_ID(menuid) )
    		return "W"; 
    	else
    		return ""; 
	}
	// 현재날짜 구하기
	public static String getCurrentDate() {
		SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ( "yyyyMMdd", Locale.KOREA );  
		Date currentTime = new Date();  
		String mTime = mSimpleDateFormat.format ( currentTime );  
		return mTime; 
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends Object> List<T> cloneList(List<T> list) {
		return ((List<T>) ((ArrayList<T>) list).clone());
	}
}
