package usolver.admin.user.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.providers.encoding.PasswordEncoder;
import org.springframework.security.providers.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.admin.author.service.EgovAuthorGroupService;
import usolver.admin.author.service.EgovAuthorManageService;
import usolver.admin.author.vo.AuthorGroup;
import usolver.admin.author.vo.AuthorManageVO;
import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import usolver.admin.menu.service.EgovMenuCreateManageService;
import usolver.admin.user.service.EgovUserManageService;
import usolver.admin.user.vo.UserDataVO;
import usolver.admin.user.vo.UserDefaultVO;
import usolver.admin.user.vo.UserManageVO;
import usolver.book.service.RegisterService;
import usolver.com.cmm.map.service.LyrInfoService;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.AdmDefaultVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;


/**
 * 업무사용자관련 요청을  비지니스 클래스로 전달하고 처리된결과를  해당   웹 화면으로 전달하는  Controller를 정의한다
 * @author 공통서비스 개발팀 조재영
 * @since 2009.04.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.10  조재영          최초 생성
 *   2011.8.26	정진오			IncludedInfo annotation 추가
 *
 * </pre>
 */

@Controller
public class EgovUserManageController {

    /** userManageService */
    @Resource(name = "userManageService")
    private EgovUserManageService userManageService;
        
    /** cmmUseService */
    @Resource(name="EgovCmmUseService")
    private EgovCmmUseService cmmUseService;
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    @Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;     
    
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
	    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
    @Resource(name = "egovAuthorGroupService")
    private EgovAuthorGroupService egovAuthorGroupService;
    
    @Resource(name = "registerService")
    private RegisterService registerService;
    
    @Resource(name = "lyrInfoService")
	private LyrInfoService lyrInfoService;
    
    /** EgovMenuManageService */
	@Resource(name = "meunCreateManageService")
	private EgovMenuCreateManageService menuCreateManageService;
	
    /** Log Info */
    protected Log log = LogFactory.getLog(this.getClass());
    
    /** DefaultBeanValidator beanValidator */
    //@Autowired
	//private DefaultBeanValidator beanValidator;
    
    /**
     * 사용자목록을 조회한다. (pageing)
     * @param userSearchVO 검색조건정보
     * @param model 화면모델
     * @return cmm/admin/user/EgovUserManage
     * @throws Exception
     */
    @RequestMapping(value="/admin/user/EgovUserList.do")
    public String selectUserList(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO,
            ModelMap model)
            throws Exception {
    	
        /** EgovPropertyService.sample */
        userSearchVO.setPageUnit(propertiesService.getInt("pageUnit")); //
		userSearchVO.setPageSize(propertiesService.getInt("pageSize"));  //
		
        /** pageing */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(userSearchVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(userSearchVO.getPageUnit());
        paginationInfo.setPageSize(userSearchVO.getPageSize());
        
        userSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        userSearchVO.setLastIndex(paginationInfo.getLastRecordIndex());
        userSearchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
        
        List userList = userManageService.selectUserList(userSearchVO);
        model.addAttribute("resultList", userList);
        
        int totCnt = userManageService.selectUserListTotCnt(userSearchVO);
        paginationInfo.setTotalRecordCount(totCnt);

        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("menu", "user");
 
        return "usolver/admin/user/EgovUserList";
    } 
    
    /**
     * 사용자등록화면으로 이동한다.
     * @param userSearchVO 검색조건정보
     * @param userManageVO 사용자초기화정보
     * @param model 화면모델
     * @return cmm/admin/user/EgovUserInsert
     * @throws Exception
     */
    @RequestMapping("/admin/user/EgovUserInsertView.do")
    public String insertUserView(
            @ModelAttribute("userSearchVO") UserDefaultVO userSearchVO,
            @ModelAttribute("userManageVO") UserManageVO userManageVO,
            Model model
            )throws Exception {
    	
    	// [부서정보 추출]			
    	CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5001");  //부서
	    model.addAttribute("dept_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));		  
	    model.addAttribute("menu", "user");
        return "usolver/admin/user/EgovUserInsert";
    }
    
    /**
     * 사용자등록처리후 목록화면으로 이동한다.
     * @param userManageVO 사용자등록정보
     * @param bindingResult 입력값검증용 bindingResult
     * @param model 화면모델
     * @return forward:/admin/user/EgovUserManage.do
     * @throws Exception
     */
    @RequestMapping("/admin/user/EgovUserInsertProc.do")
    public String insertUserProc(@ModelAttribute("userManageVO") UserManageVO userManageVO,
    						          BindingResult bindingResult,  Model model
            )throws Exception {
        
/*        beanValidator.validate(userManageVO, bindingResult);
    	if (bindingResult.hasErrors()){
    		return "usolver/admin/user/EgovUserInsert";
		}else{			
			userManageService.insertUser(userManageVO);
	        //Exception 없이 진행시 등록성공메시지
	        model.addAttribute("resultMsg", "success.common.insert");
		}*/
    	    	
    	
    	String resultMsg = "info.nodata.msg";   		
   		System.out.println("###################### usr.getUSER_ID ="+ userManageVO.getUserId());
   	   		   		
       	try {
       		
       		userManageService.insertUser( userManageVO );
   			resultMsg = "success.common.insert";
       	
       	} catch(Exception e) {
       	
       		resultMsg = "fail.common.insert";

       	}

       	// 결과 처리용 [수정X]       	       	
       	model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
   		return "usolver/admin/user/EgovUserList";
   		
    }
    
    /**
     * 사용자정보 수정을 위해 사용자정보를 상세조회한다.
     * @param uniqId 상세조회대상 사용자아이디
     * @param userSearchVO 검색조건
     * @param model 화면모델
     * @return uss/umt/EgovUserSelectUpdt
     * @throws Exception
     */
    @RequestMapping("/admin/user/EgovUserUpdateView.do")
    public String updateUserView(
            @RequestParam("userId") String userId ,
            @ModelAttribute("searchVO") UserDefaultVO userSearchVO, Model model)
            throws Exception {
        	
    	 //로그인 정보가 없는 경우.. : 모든 곳에 다 처리해 줘야하나? 흠.흠..
	 	  /* if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	 		   model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
	        	  // return "forward:/accessDenied.do";
	        	  return "redirect:/accessDenied.do";
	 	   }*/
	 	   		   
	    	  // [권한정보 추출]
	 	   AuthorManageVO authorVO = new AuthorManageVO();
	 	   
	 	   System.out.println("################################# user.getUSER_ID() ="+userId);
	 	   
	 	   // 시스템 정보조회
	 	   authorVO.setUserId(userId);
	 	   authorVO.setSearchKeyword(userId);
	 	   authorVO.setAuthorType("SYSTEM");
	 	   authorVO.setSearchCondition("1");
	 	   authorVO.setFirstIndex(0);
	 	   authorVO.setRecordCountPerPage(100);
	 	   
	 	   System.out.println("################################# authorVO ="+authorVO);
	 	   model.addAttribute("author_sys_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 
	 	   
	 	   // 권한정보 조회 
	 	    
    	   authorVO.setSysCode("WATER");
    	   authorVO.setAuthorType("WATER");	 	 
    	   model.addAttribute("author_water_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 

    	   authorVO.setSysCode("SEWER");
    	   authorVO.setAuthorType("SEWER");	 	 
    	   model.addAttribute("author_sewer_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 
	 	
    	   authorVO.setSysCode("ROAD");
    	   authorVO.setAuthorType("ROAD");	 	 
    	   model.addAttribute("author_road_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 
	   
    	
	        // [부서정보 추출]			
	       	CodeManageVO codeManageVO = new CodeManageVO();
	        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
	        codeManageVO.setG2DomainId("5001");  //부서
		    model.addAttribute("dept_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));		  	  
		   
	        UserManageVO userManageVO = new UserManageVO();
	        
	        userManageVO = userManageService.selectUser(userId);        
	
	        model.addAttribute("userSearchVO", userSearchVO);
	        model.addAttribute("userManageVO", userManageVO);
	        model.addAttribute("menu", "user");
	        return "usolver/admin/user/EgovUserUpdate";
    }
    
    /**
     * 사용자정보 수정후 목록조회 화면으로 이동한다.
     * @param userManageVO 사용자수정정보
     * @param bindingResult 입력값검증용 bindingResult
     * @param model 화면모델
     * @return forward:/admin/user/EgovUserManage.do
     * @throws Exception
     */
    @RequestMapping("/admin/user/EgovUserUpdateProc.do")
    public String updateUserProc(@ModelAttribute("userManageVO") UserManageVO userManageVO, Model model
            )throws Exception {
                    	
    	String resultMsg = "info.nodata.msg";   		
   		System.out.println("###################### usr.getUSER_ID ="+ userManageVO.getUserId());
   	   		   		
       	try {
       		
       		userManageService.updateUser( userManageVO );
   			resultMsg = "success.common.update";
       	
       	} catch(Exception e) {
       	
       		resultMsg = "fail.common.update";

       	}
       	
       	// 결과 처리용 [수정X]       	
        model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
   		return "forward:/admin/user/EgovUserUpdateView.do";  

    }
    
    /**
     * 사용자정보삭제후 목록조회 화면으로 이동한다.
     * @param checkedIdForDel 삭제대상아이디 정보
     * @param userSearchVO 검색조건
     * @param model 화면모델
     * @return forward:/admin/user/EgovUserManage.do
     * @throws Exception
     */
    @RequestMapping("/admin/user/EgovUserDeleteProc.do")
    public String deleteUser(@ModelAttribute("userManageVO") UserManageVO userManageVO, 
						            HttpServletRequest request,
									SessionStatus status, 
            Model model) throws Exception {
    	
    	String resultMsg = "info.nodata.msg";   		
    	
    	String userIds = request.getParameter("checkList");
   		System.out.println("###################### usr.getUSER_ID ="+ userIds);
   	   		   		
       	try {       		
       		//다중삭제... 흠.. 
       		if( userIds != null && !userIds.equals("")){
       			
       			String[] aUserId = userIds.split(",");
	       		
       			for( int i = 0 ; i < aUserId.length; i++){	       			
       				
       				//1. 사용자 권한 삭제 필요..  USV_USER_AUTHOR
		       		AuthorGroup authorGroup = new AuthorGroup();       		
		       		authorGroup.setUserId(aUserId[i]);
		    		egovAuthorGroupService.deleteAuthorGroup(authorGroup);
		    		
		    		//1. 사용자 필드 삭제 필요..  USV_USER_FIELDINFO
		    		HashMap parameterObject =  new HashMap();    		
		    		parameterObject.put("tableName", "USV_USER_FIELDINFO");
		    		parameterObject.put("userId", aUserId[i]);
		    		registerService.deleteRegisterUserList(parameterObject);    			
		    		
		    		//1. 사용자 정보 삭제 필요..  USV_USERS
		       		userManageService.deleteUser(aUserId[i]);   //USV_USERS
		   			resultMsg = "success.common.delete";
       			}
       			
       		}else {
       			//1. 사용자 권한 삭제 필요..  USV_USER_AUTHOR
	       		AuthorGroup authorGroup = new AuthorGroup();       		
	       		authorGroup.setUserId(userManageVO.getUserId());
	    		egovAuthorGroupService.deleteAuthorGroup(authorGroup);
	    		
	    		//1. 사용자 필드 삭제 필요..  USV_USER_FIELDINFO
	    		HashMap parameterObject =  new HashMap();    		
	    		parameterObject.put("tableName", "USV_USER_FIELDINFO");
	    		parameterObject.put("userId", authorGroup.getUserId());
	    		registerService.deleteRegisterUserList(parameterObject);    			
	    		
	    		//1. 사용자 메뉴삭제..  USV_USER_MENU
	    		//1. 사용자 데이터 삭제..  USV_USER_LAYER	    		
	    		
	    		//1. 사용자 정보 삭제 필요..  USV_USERS
	       		userManageService.deleteUser(authorGroup.getUserId());   //USV_USERS
	   			resultMsg = "success.common.delete";
       			
       		}
       	
       	} catch(Exception e) {
       	
       		resultMsg = "fail.common.delete";

       	}
       	
       	status.setComplete();        
        model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
        return "forward:/admin/user/EgovUserList.do";

    }
    
    /**
     * 사용자 암호 수정  화면 이동
     * @param model 화면모델
     * @param commandMap 파라메터전달용 commandMap
     * @param userSearchVO 검색조건
     * @param userManageVO 사용자수정정보(비밀번호)
     * @return uss/umt/EgovUserPasswordUpdt
     * @throws Exception
     */
    @RequestMapping(value="/admin/user/EgovUserPwdUpdateView.do")
    public String updatePasswordView(ModelMap model, 
    								Map<String, Object> commandMap,
    								@RequestParam("userId") String userId ,
    								@ModelAttribute("searchVO") UserDefaultVO userSearchVO,
    								@ModelAttribute("userManageVO") UserManageVO userManageVO) throws Exception {
    	
    	String tt = ToStringBuilder.reflectionToString(userManageVO, ToStringStyle.DEFAULT_STYLE);    	
    	
    	System.out.println("################################### userManageVO = "+tt);
    	model.addAttribute("userManageVO", userManageVO);
        model.addAttribute("userSearchVO", userSearchVO);
        model.addAttribute("menu", "user");
    	return "usolver/admin/user/EgovUserPwdUpdate";
    }
    
   
    /**
     * 업무사용자 암호 수정처리 후 화면 이동
     * @param model 화면모델
     * @param commandMap 파라메터전달용 commandMap
     * @param userSearchVO 검색조 건
     * @param userManageVO 사용자수정정보(비밀번호)
     * @return uss/umt/EgovUserPasswordUpdt
     * @throws Exception
     */
    @RequestMapping(value="/admin/user/EgovUserPwdUpdateProc.do")
    public String updatePasswordProc(ModelMap model, 
    		  					 @ModelAttribute("searchVO") UserDefaultVO userSearchVO,
    		  					 @ModelAttribute("userManageVO") UserManageVO userManageVO) 
    							throws Exception {
        
        boolean isCorrectPassword=false;
        UserManageVO resultVO = new UserManageVO();
    	
    	String resultMsg = "info.nodata.msg";
    	resultVO = userManageService.selectPassword(userManageVO);
    	
    	PasswordEncoder encoder = new ShaPasswordEncoder(256); 
		String encryptPass = encoder.encodePassword(userManageVO.getOldPassword(), null);    	
		
    	/*//패스워드 암호화
        //sha-256 암호화 처리 
		관리자인 경우 비밀번호를 모르더라도 설정할 수 있도록 변경한다. 
		
    	if (encryptPass.equals(resultVO.getPassword())){
    		isCorrectPassword = true;        	
    	}else{
    		isCorrectPassword = false;
    		resultMsg="fail.user.passwordUpdate1";
    	}
    	
    	if (isCorrectPassword){
    		userManageVO.setPassword( encoder.encodePassword(userManageVO.getNewPassword(), null));
    		userManageService.updatePassword(userManageVO);
            model.addAttribute("userManageVO", userManageVO);
            resultMsg = "success.common.update";
        }else{
        	model.addAttribute("userManageVO", userManageVO);      
        }
    	*/
    	userManageVO.setPassword( encoder.encodePassword(userManageVO.getNewPassword(), null));
		userManageService.updatePassword(userManageVO);
        model.addAttribute("userManageVO", userManageVO);
        resultMsg = "success.common.update";
        
        
    	model.addAttribute("userSearchVO", userSearchVO); 
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("menu", "user");
        return "usolver/admin/user/EgovUserPwdUpdate";
    }
    
    /**
	 * 사용자별 데이터관리 세부화면을 조회한다.
	 * 
	 * @param userSearchVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/user/EgovUserDataList.do")
	public String selectUserDataList( @ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, ModelMap model) 
			throws Exception {
		// 0. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		/*if (!isAuthenticated) {
			model.addAttribute("message", egovMessageSource
					.getMessage("fail.common.login"));
			return "egovframework/com/uat/uia/EgovLoginUsr";
		}*/
		
		userSearchVO.setPageUnit(14); //propertiesService.getInt("pageUnit")
		userSearchVO.setPageSize(14);  //propertiesService.getInt("pageSize")
				
		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(userSearchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(userSearchVO.getPageUnit());
		paginationInfo.setPageSize(userSearchVO.getPageSize());
		
		userSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		userSearchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		userSearchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		// 사용자 리스트 
		List list_userlist = userManageService.selectUserList(userSearchVO);
		model.addAttribute("list_userlist", list_userlist);
		
		List<EgovMap> layerInfoList = lyrInfoService.selectLyrInfoList(null);
		model.addAttribute("layerInfoList", layerInfoList);

		
		int totCnt = userManageService.selectUserListTotCnt(userSearchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		model.addAttribute("menu", "userData");
		return "usolver/admin/user/EgovUserDataList";
	}
	
	/**
	 * 기존 데이터관리 목록을 조회한다.
	 * 
	 * @param UserManageVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/user/EgovUserFunctionSelect.do")
	public String selectUserFunctionSelect( @ModelAttribute("userVO") UserManageVO userVO, ModelMap model, HttpServletRequest request)
		throws Exception {
		
		String userId = StringUtil.nvl(request.getParameter("userId"));
		String author = StringUtil.nvl(request.getParameter("author"));
		userVO.setUserId(userId);
		userVO.setAuthor(author);
		
		//데이터 리스트 생성 
		List functionList = userManageService.selectUserFunctionList(userVO);
		model.addAttribute("functionList", functionList);
		
		return "jsonView";
	}
	
	/**
	 * 기존 데이터 기능목록을 수정/삭제한다.
	 * 
	 * @param UserManageVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/user/EgovDataFunctionModify.do")
	public String modifyDataFunctionList(
			ModelMap model, @ModelAttribute("userDataVO") UserDataVO userDataVO, HttpServletRequest request) throws Exception {
		
		String userId = StringUtil.nvl(request.getParameter("userId"));
		String action = StringUtil.nvl(request.getParameter("action"));
		String author = StringUtil.nvl(request.getParameter("author"));
		String[] functionList;

		userDataVO.setUserId(userId);
		userDataVO.setAuthor(author);
		
		//권한 기능 삭제
		userManageService.deleteDataFunctionList(userDataVO);
		String resultMsg = egovMessageSource.getMessage("success.common.delete");
		
		if(action.equals("CODE_UPDATE")){
			functionList = request.getParameterValues("functionList");
			userDataVO.setFunctionList(functionList);
			
			//권한 기능 수정(추가)
			
			userManageService.insertDataFunctionList(userDataVO);
			resultMsg = egovMessageSource.getMessage("success.common.update");
		}
		
		model.addAttribute("message", resultMsg);
		return "jsonView";
	}
	
	/**
	 * 사용자별 메뉴관리 세부화면을 조회한다.
	 * 
	 * @param userSearchVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/user/EgovUserMenuCreat.do")
	public String selectUserMenuCreat(@ModelAttribute("searchVO") AdmDefaultVO searchVO, @ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, ModelMap model) 
			throws Exception {
		// 0. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		/*if (!isAuthenticated) {
			model.addAttribute("message", egovMessageSource
					.getMessage("fail.common.login"));
			return "egovframework/com/uat/uia/EgovLoginUsr";
		}*/
		
		userSearchVO.setPageUnit(14); //propertiesService.getInt("pageUnit")
		userSearchVO.setPageSize(14);  //propertiesService.getInt("pageSize")
			        
		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(userSearchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(userSearchVO.getPageUnit());
		paginationInfo.setPageSize(userSearchVO.getPageSize());
		
		userSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		userSearchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		userSearchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		// 사용자 리스트 
		List list_userlist = userManageService.selectUserList(userSearchVO);
		model.addAttribute("list_userlist", list_userlist);
		
		//메뉴리스트로 트리생성.. 
		List list_menulist = menuCreateManageService.selectAllMenuCreatList(searchVO);
		model.addAttribute("list_menulist", list_menulist);
		
		int totCnt = userManageService.selectUserListTotCnt(userSearchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		model.addAttribute("menu", "userMenu");
		return "usolver/admin/user/EgovUserMenuCreat";
	}
	
	/**
	 * 기존 메뉴생성 기능목록을 조회한다.
	 * 
	 * @param menuCreatVO
	 * @return 출력페이지정보 "EgovUserMenuCreat"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/user/EgovUserMenuFunctionSelect.do")
	public String selectUserMenuFunctionList(
			ModelMap model, @ModelAttribute("userDataVO") UserDataVO userDataVO, HttpServletRequest request) throws Exception {
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		String userId = StringUtil.nvl(request.getParameter("userId"));
		userDataVO.setUserId(userId);
		
		//기능 리스트 생성 
		List functionList = userManageService.selectUserMenuFunctionList(userDataVO);
		model.addAttribute("functionList", functionList);
		
		return "jsonView";
	}
	
	/**
	 * 기존 메뉴생성 기능목록을 수정/삭제한다.
	 * 
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/user/EgovUserMenuFunctionModify.do")
	public String modifyUserMenuFunctionList(
			ModelMap model, @ModelAttribute("userDataVO") UserDataVO userDataVO, HttpServletRequest request) throws Exception {
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		String userId = StringUtil.nvl(request.getParameter("userId"));
		String action = StringUtil.nvl(request.getParameter("action"));
		String[] functionList;

		userDataVO.setUserId(userId);
		
		//권한 기능 삭제
		userManageService.deleteUserMenuFunctionList(userDataVO);
		String resultMsg = egovMessageSource.getMessage("success.common.delete");
		
		if(action.equals("CODE_UPDATE")){
			functionList = request.getParameterValues("functionList");
			userDataVO.setFunctionList(functionList);
			
			//권한 기능 수정(추가)
			userManageService.insertUserMenuFunctionList(userDataVO);
			resultMsg = egovMessageSource.getMessage("success.common.update");
		}
		
		model.addAttribute("message", resultMsg);
		return "jsonView";
	}
	
	
	
	
	
	
	
	
	
	
	
	/**  사용안함?? */
	
    /**
     * 입력한 사용자아이디의 중복확인화면 이동
     * @param model 화면모델
     * @return uss/umt/EgovIdDplctCnfirm
     * @throws Exception
     */
    @RequestMapping(value="/admin/user/EgovIdDplctCnfirmView.do")
    public String checkIdDplct(ModelMap model)
            throws Exception {
        model.addAttribute("checkId", "");
        model.addAttribute("usedCnt", "-1");
        return "usolver/admin/user/EgovIdDplctCnfirm";
    }
    
    /**
     * 입력한 사용자아이디의 중복여부를 체크하여 사용가능여부를 확인
     * @param commandMap 파라메터전달용 commandMap
     * @param model 화면모델
     * @return uss/umt/EgovIdDplctCnfirm
     * @throws Exception
     */
    @RequestMapping(value="/admin/user/EgovIdDplctCnfirm.do")
    public String checkIdDplct(
    		Map<String, Object> commandMap,
            ModelMap model
            )throws Exception {
        
    	String checkId = (String)commandMap.get("checkId");
    	checkId =  new String(checkId.getBytes("ISO-8859-1"), "UTF-8");
        
    	if (checkId==null || checkId.equals("")) return "forward:/admin/user/EgovIdDplctCnfirmView.do";
        
        int usedCnt = userManageService.checkIdDplct(checkId);
        model.addAttribute("usedCnt", usedCnt);
        model.addAttribute("checkId", checkId);
        
        return "usolver/admin/user/EgovIdDplctCnfirm";
    }
    
}
