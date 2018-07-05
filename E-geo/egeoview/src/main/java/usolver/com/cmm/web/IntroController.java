package usolver.com.cmm.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import usolver.admin.author.service.EgovAuthorGroupService;
import usolver.admin.author.vo.AuthorGroup;
import usolver.admin.board.service.NoticeService;
import usolver.admin.board.vo.NoticeVO;
import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import usolver.admin.user.service.EgovUserManageService;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.service.MemberService;
import usolver.com.cmm.util.StringUtil;
import usolver.com.main.vo.LoginVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.let.utl.sim.service.EgovClntInfo;

@Controller
public class IntroController {
	
	/** CommonService */
    @Resource(name = "commonService")
    private CommonService commonService;
    
    /** NoticeService  */
    @Resource(name = "noticeService")
    private NoticeService noticeService;
	   
    @Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;    
    
    /** MemberService */
    @Resource(name = "memberService")
    private MemberService memberService;
    
    /** userManageService */
    @Resource(name = "userManageService")
    private EgovUserManageService userManageService;
    
    @Resource(name = "egovAuthorGroupService")
    private EgovAuthorGroupService egovAuthorGroupService;
    
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	private EgovMessageSource egovMessageSource;

	
	@RequestMapping(value = "/intro.do")
	public String intro(ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
				
		session.setAttribute("SYSTEM", null);
		session.setAttribute("USER_IP", null);
		
    	// 가장 최근 등록된 공지사항을 가져오기
		NoticeVO noticeVO = new NoticeVO();

		model.addAttribute("bbsList", noticeService.getLatesBbs(noticeVO));
		 	   
        // [부서정보 추출]			
		CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5001");  //부서
	    model.addAttribute("dept_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));		   
	    
    	codeManageVO.setG2DomainId("5004");  //시스템정보
		model.addAttribute("sys_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));
		   
		return "/usolver/com/cmm/intro";
	}
	
	@RequestMapping(value = "/userLogin.do")
	public String actionLogin(ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
	   String userId = request.getParameter("j_username");
	   String userPassword = request.getParameter("j_password");
	   
	   String userSystem = request.getParameter("SYSTEM");	   
	   String userIp = EgovClntInfo.getClntIP(request);
	   
	   System.out.println(" ###############################################  SYSTEM = "+userSystem);
	   System.out.println(" ###############################################  USER_IP = "+userIp);
	   
	   session.setAttribute("SYSTEM", userSystem);
	   session.setAttribute("USER_IP", userIp);
	   
	   return "redirect:/j_spring_security_check?j_username="+userId + "&j_password=" +userPassword;
	}
		
	/**
	 * 로그아웃한다.
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/userLogout.do")
	public String actionLogout(HttpServletRequest request, ModelMap model) throws Exception {

		// 세션정보 : 사용자의 로그 기록 때문에 session 정보 초기화는 /intro.do 에서 수행		
		String system = (String)request.getSession().getAttribute("SYSTEM");
		//System.out.println(" ###############################################  SYSTEM = "+system);
			
		return "redirect:/j_spring_security_logout";
	}
	
	/**
	 * 권한이 없는 경우 여기로... 
	 * @return String
	 * @exception Exception
	 */
   @RequestMapping(value="/accessDenied.do")
   public String AccessDenied(ModelMap model, HttpServletRequest request, HttpSession session){	   
	    
	   // type=nosession ,  duplication,  disapprove  이외에 것은 message에 추가해야함.. 
	   String errorType = StringUtil.nvl(request.getParameter("type"));
	   
	   if( errorType == null || errorType.length() < 1 ) errorType = "nosession";
	   
	   model.addAttribute("errorType", errorType );
	   model.addAttribute("errorMsg", egovMessageSource.getMessage("fail.common."+errorType+"")); 
 	   model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
 	   
 	  if( errorType != null && errorType.equals("directdenied") )
 		  return "/usolver/com/error/directDenied";   // URL 주소를 직접 입력하여 접근한 경우.. 
 	  else 
 		 return "/usolver/com/error/accessDenied";   // 권한이 없는 경우.. 
   }
   
   /**
    * 아이디 중복체크   : Intro에서도  사용.. 
    * @param dbscode, jbscode
    * @return jbscode, sbscode
    * @exception
    */
   @RequestMapping(value="/idDDCheck.do")
   public @ResponseBody String idDDCheck(
   		 @ModelAttribute LoginVO loginVo, ModelMap model, HttpServletRequest request, HttpSession session)
   		 throws Exception {    	

   	
   	String resultMsg = "info.nodata.msg"; 
   	String userId = (String)request.getParameter("USER_ID");
   	
   	System.out.println( "############################## USER_ID " +userId);
   	System.out.println( "############################## request " +request);
   	System.out.println( "############################## loginVo " +loginVo);
   	
   	//int result = userManageService.checkIdDplct(userId);
   	int result = 0;
    
	    if( result > 0 ){
	    	resultMsg = "ERROR";
	    }else {
	    	resultMsg = "SUCCESS";
	    }
	    
   	return resultMsg;
   } 
   
   /**
 	 * 사용자 등록처리 : Intro에서 권한 신청할때 사용... 
 	 * @param searchVO - 조회할 정보가 담긴 VO
 	 * @param model
 	 * @return ""
 	 * @exception Exception
 	 */
     @RequestMapping(value="/userRegProc.do")
     public String UserInsertProcWrite(
     		@ModelAttribute LoginVO loginVo, BindingResult bindingResult, Model model, HttpServletRequest request, HttpSession session) 
     		throws Exception {

     	// common 결과처리 변수 [수정X]
    	String resultMsg = "";
     	String errorMsg = "";
 		
    	String userId = (String)request.getParameter("USER_ID");       	
    	
       	System.out.println( "############################## USER_ID " +userId);
       	
 		System.out.println("###################### usr.getUSER_ID ="+ loginVo.getUSER_ID());
 		System.out.println("###################### usr.getSYSTEM ="+ loginVo.getSYSTEM());
 		String action_flag = StringUtil.nvl(request.getParameter("action_flag"));
		
	   	AuthorGroup  authorGroup = new AuthorGroup();
 	
 		   		
     	try {
     		  			
     	   		authorGroup.setAuthorCode("ROLE_"+loginVo.getSYSTEM());
     	   		authorGroup.setUserId(loginVo.getUSER_ID());
     			memberService.insertUser( loginVo );		// 사용자정보 등록
     			
     			authorGroup.setSysCode(loginVo.getSYSTEM());
     			egovAuthorGroupService.insertAuthorGroup(authorGroup);		// 권한 등록 : 신청권한 등록
     			
     			authorGroup.setSysCode(loginVo.getSYSTEM());
     			authorGroup.setAuthorCode("ROLE_BASIC");
     			egovAuthorGroupService.insertAuthorBasic(authorGroup);		// 권한 등록 : 기본권한 세팅 
      		
     			resultMsg = "SAVE_SUCCESS";

     		
     	} catch(Exception e) {
     		resultMsg = "ERROR";
     		errorMsg = "등록 오류 발생";
     	}
     	
     	// 결과 처리용 [수정X]       	
     	model.addAttribute("resultMsg", resultMsg);
     	model.addAttribute("errorMsg", errorMsg);
     	model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수

  	       	
     	System.out.println("###################### resultMsg ="+ resultMsg);
 		System.out.println("###################### errorMsg ="+ errorMsg);
 		System.out.println("###################### callBackFunction ="+ StringUtil.nvl(request.getParameter("callBackFunction")));
     	
     	//status.setComplete();	//Double Submit 방지
     	return "/usolver/com/cmm/commonMsg";
     	
     }
}
