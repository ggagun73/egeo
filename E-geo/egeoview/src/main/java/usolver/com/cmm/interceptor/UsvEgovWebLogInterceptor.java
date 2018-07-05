package usolver.com.cmm.interceptor;

import java.util.Iterator;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;

import usolver.admin.log.wlg.service.EgovWebLogService;
import usolver.admin.log.wlg.vo.WebLog;
import usolver.admin.log.wlg.web.EgovWebLogInterceptor;
import usolver.com.main.vo.LoginVO;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;



/**
 * @Class Name : EgovWebLogInterceptor.java
 * @Description : 웹로그 생성을 위한 인터셉터 클래스
 * @Modification Information
 *
 *    수정일        수정자         수정내용
 *    -------      -------     -------------------
 *    2009. 3. 9.   이삼섭         최초생성
 *    2011. 7. 1.   이기하         패키지 분리(sym.log -> sym.log.wlg)
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 9.
 * @version
 * @see
 * 
 * 
 * << 개정이력(Modification Information) >>
 * 
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011.07.05  최재훈          최초 생성 
 *
 */
public class UsvEgovWebLogInterceptor extends EgovWebLogInterceptor {

	private Set<String> permittedURL;
	
	public void setPermittedURL(Set<String> permittedURL) {
		this.permittedURL = permittedURL;
	}
	
	@Resource(name="EgovWebLogService")
	private EgovWebLogService webLogService;

	/**
	 * 웹 로그정보를 생성한다.
	 * 
	 * @param HttpServletRequest request, HttpServletResponse response, Object handler 
	 * @return 
	 * @throws Exception 
	 */
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler, ModelAndView modeAndView) throws Exception {
		
		WebLog webLog = new WebLog();
		String reqURL = request.getRequestURI();
		String uniqId = "";
		
		
		System.out.println("GinnoWebLogIntercepter - 요기오나요??? ㅠㅠ ");  
		
		
    	/* Authenticated  */
        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	if(isAuthenticated.booleanValue()) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			uniqId = user.getUSER_ID();
    	}

		webLog.setUrl(reqURL);
		webLog.setRqesterId(uniqId);
		webLog.setRqesterIp(request.getRemoteAddr());
		
		webLogService.logInsertWebLog(webLog);
		
	}
	
	/*
	 * Ginnoframework
	 */
	@Override  //after completely handling a Web request and rendering the view
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
			Object handler, Exception ex) throws Exception {    
		System.out.println("GinnoWebLogIntercepter - afterCompletion................done with request");  
	}	
	//private ConnectInfoService connectInfoService;
	
    /************************************************
     * Spring Security를 사용하지 않을 경우 
     ************************************************/
    
	/**
	 * 세션에 계정정보(LoginVO)가 있는지 여부로 인증 여부를 체크한다.
	 * 계정정보(LoginVO)가 없다면, 로그인 페이지로 이동한다.
	 */
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {	
		
		String requestURI = request.getRequestURI(); //요청 URI
		boolean isPermittedURL = false; 

		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		System.out.println("GinnoWebLogIntercepter - 요기오나요2222222222222222??? ㅠㅠ ");  
		if(loginVO != null){
			return true;
		}else{
			for(Iterator<String> it = this.permittedURL.iterator(); it.hasNext();){
				String urlPattern = request.getContextPath() + (String) it.next();

				if(Pattern.matches(urlPattern, requestURI)){// 정규표현식을 이용해서 요청 URI가 허용된 URL에 맞는지 점검함.
					isPermittedURL = true;
				}
			}
			
			if(!isPermittedURL){
				ModelAndView modelAndView = new ModelAndView("redirect:/intro.do");
				throw new ModelAndViewDefiningException(modelAndView);
			}else{
				return true;
			}
		}
	}

}
