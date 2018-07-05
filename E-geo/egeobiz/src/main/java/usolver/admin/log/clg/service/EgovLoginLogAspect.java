package usolver.admin.log.clg.service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.util.StopWatch;

import usolver.admin.log.clg.vo.LoginLog;
import usolver.com.main.vo.LoginVO;
import egovframework.let.utl.sim.service.EgovClntInfo;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

/**
 * @Class Name : EgovLoginLogAspect.java
 * @Description : 시스템 로그 생성을 위한 ASPECT 클래스
 * @Modification Information
 *
 *    수정일         수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 11.   이삼섭         최초생성
 *    2011. 7. 01.   이기하         패키지 분리(sym.log -> sym.log.clg)
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
public class EgovLoginLogAspect {
	
	@Resource(name="EgovLoginLogService")
	private EgovLoginLogService loginLogService;

	/**
	 * 로그인 로그정보를 생성한다.
	 * EgovLoginController.actionMain Method
	 * 
	 * @param 
	 * @return void
	 * @throws Exception 
	 */
	
	public Object logLogin(ProceedingJoinPoint joinPoint) throws Throwable {
		
		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			stopWatch.stop();
			
			String uniqId = "";
			String ip = "";
			String system = "";
			
	
			/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
	    		LoginVO user =(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();		   
	    		uniqId = user.getUSER_ID();
	    	}
	    	
			 for (Object obj : joinPoint.getArgs()) {
		            if (obj instanceof HttpServletRequest ) {
		                HttpServletRequest request = (HttpServletRequest) obj;
		                ip = EgovClntInfo.getClntIP(request);
		                system = (String)request.getSession().getAttribute("SYSTEM");
		                
		            }

		        }
	    	
	    	LoginLog loginLog = new LoginLog();
	    	loginLog.setLoginId(uniqId);
	        loginLog.setLoginIp(ip);
	        loginLog.setLoginMthd("I"); // 로그인:I, 로그아웃:O
	        loginLog.setErrOccrrAt("N");
	        loginLog.setErrorCode("");
	        loginLog.setSystem(system);
	        int result = loginLogService.logInsertLoginLog(loginLog);
		}

	}
	
	/**
	 * 로그아웃 로그정보를 생성한다.
	 * EgovLoginController.actionLogout Method
	 * 
	 * @param 
	 * @return void
	 * @throws Exception 
	 */
	public Object logLogout(ProceedingJoinPoint joinPoint) throws Throwable {
		
		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			stopWatch.stop();
			
			String uniqId = "";
			String ip = "";
			String system = "";
	
			/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				uniqId = user.getUSER_ID();
	    	}
	    	
			 for (Object obj : joinPoint.getArgs()) {
		            if (obj instanceof HttpServletRequest ) {
		                HttpServletRequest request = (HttpServletRequest) obj;
		                ip = EgovClntInfo.getClntIP(request);
		                system = (String)request.getSession().getAttribute("SYSTEM");		              
		            }		        
		    }
			 
	    	LoginLog loginLog = new LoginLog();
	    	loginLog.setLoginId(uniqId);
	        loginLog.setLoginIp(ip);
	        loginLog.setLoginMthd("O"); // 로그인:I, 로그아웃:O
	        loginLog.setErrOccrrAt("N");
	        loginLog.setErrorCode("");
	        loginLog.setSystem(system);
	        int result = loginLogService.logInsertLoginLog(loginLog);
	        

			
		}
	}
	
}
   