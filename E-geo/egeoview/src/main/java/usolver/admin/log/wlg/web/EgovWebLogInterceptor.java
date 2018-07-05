package usolver.admin.log.wlg.web;

import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import usolver.admin.author.service.EgovAuthorRoleManageService;
import usolver.admin.author.vo.AuthorRoleManageVO;
import usolver.admin.log.wlg.service.EgovWebLogService;
import usolver.admin.log.wlg.vo.WebLog;
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
 */
public class EgovWebLogInterceptor extends HandlerInterceptorAdapter {

	@Resource(name="EgovWebLogService")
	private EgovWebLogService webLogService;
	
    @Resource(name = "egovAuthorRoleManageService")
    private EgovAuthorRoleManageService egovAuthorRoleManageService;
	
	private Set<String> permittedURL;
	
	public void setPermittedURL(Set<String> permittedURL) {
		this.permittedURL = permittedURL;
	}
	
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
		
		
		System.out.println("####################################### 여기가 수행되는지 확인필요.. 1111 ###################### ");
		
		WebLog webLog = new WebLog();
		String reqURL = request.getRequestURI();
		String uniqId = "";
		
        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	if(isAuthenticated.booleanValue()) {
			LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
			uniqId = user.getUSER_ID();
    	}
    	    	
		webLog.setUrl(reqURL);
		webLog.setRqesterId(uniqId);
		webLog.setRqesterIp(request.getRemoteAddr());
		
		
		//로그조회시에도 기록에 남아서 막자.. ^^ 
		if( !reqURL.contains("/admin/log/") ) webLogService.logInsertWebLog(webLog);
		
	}
	
	/**
	 * 계정정보(LoginVO)가 없다면, 로그인 페이지로 이동한다.
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {	
		
		String requestURI = request.getRequestURI(); //요청 URI
		boolean isPermittedURL = false; 

		System.out.println("####################################### 여기가 수행되는지 확인필요.. 222 ###################### ");
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		System.out.println("####################################### isAuthenticated = "+ isAuthenticated);
		
		if(isAuthenticated){
			//return true;
			//로그인 정보가 있을 때.. 해당 패턴에 대한 권한이 있는지 확인.. 			
			/*for(Iterator<String> it = this.permittedURL.iterator(); it.hasNext();){
				String urlPattern = request.getContextPath() + (String) it.next();
				
				System.out.println("####################################### urlPattern = "+ urlPattern);
				System.out.println("####################################### requestURI = "+ requestURI);
				
				if(Pattern.matches(urlPattern, requestURI)){// 정규표현식을 이용해서 요청 URI가 허용된 URL에 맞는지 점검함.
					isPermittedURL = true;
				}
			}*/
			
			//해당 사용자의 권한 정보를 가져온다. 
			List<String> autorities = EgovUserDetailsHelper.getAuthorities();
			
			System.out.println("####################################### autorities = "+ autorities.size());
			
			//사용자가 가지고 있는 권한에 해당 패턴이 적용되는지 확인한다... 
			for( int i = 0; i < autorities.size(); i++){

				System.out.println("####################################### autorities.get(i) = "+ autorities.get(i));
				AuthorRoleManageVO  authorRoleManageVO = new AuthorRoleManageVO();
		    	authorRoleManageVO.setAuthorCode(autorities.get(i));
		    	authorRoleManageVO.setSearchKeyword(autorities.get(i));
		    	authorRoleManageVO.setFirstIndex(0);
		    	authorRoleManageVO.setRecordCountPerPage(100);
		    	List<AuthorRoleManageVO> rolePattenList = egovAuthorRoleManageService.selectAuthorRoleList(authorRoleManageVO);
		    	
		    	//System.out.println("####################################### rolePattenList = "+ rolePattenList.size());
		    	for(int j = 0; j < rolePattenList.size(); j++ ){
		    		
		    		AuthorRoleManageVO  authorRolePatten = (AuthorRoleManageVO)rolePattenList.get(j);
		    		//System.out.println("####################################### authorRolePatten = "+ authorRolePatten);
		    		String roleType = authorRolePatten.getRoleTyp();
		    		String regYn = authorRolePatten.getRegYn();
		    		
		    		//System.out.println("####################################### roleType = "+ roleType);
		    		//System.out.println("####################################### regYn = "+ regYn);
		    		//롤정보 중 해당 권한에 등록되어있고 URL 인것만 체크한다. 
		    		if( regYn.equals("Y") && roleType.equals("url")){			    		
			    		
			    		String sRolePatten = authorRolePatten.getRolePtn();
			    		
			    		System.out.println("####################################### sRolePatten = "+ sRolePatten);
			    		System.out.println("####################################### requestURI = "+ requestURI);
			    					            
				    	if(Pattern.matches(sRolePatten, requestURI)){// 정규표현식을 이용해서 요청 URI가 허용된 URL에 맞는지 점검함.
							isPermittedURL = true;
							System.out.println("####################################### isPermittedURL = "+ isPermittedURL);
						}
		    		}
		    	}
				
			}
			
			System.out.println("####################################### isPermittedURL = "+ isPermittedURL);
			
			if(!isPermittedURL){
				ModelAndView modelAndView = new ModelAndView("redirect:/accessDenied.do?type=disapprove");
				throw new ModelAndViewDefiningException(modelAndView);
			}else{
				return true;
			}
			
		}else{			
			ModelAndView modelAndView = new ModelAndView("redirect:/accessDenied.do?type=directdenied");
			throw new ModelAndViewDefiningException(modelAndView);			
			
		}
	}

}
   