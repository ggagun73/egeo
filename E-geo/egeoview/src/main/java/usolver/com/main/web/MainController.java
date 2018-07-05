package usolver.com.main.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.security.providers.encoding.PasswordEncoder;
import org.springframework.security.providers.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import usolver.admin.author.service.EgovAuthorGroupService;
import usolver.admin.author.service.EgovAuthorManageService;
import usolver.admin.author.vo.AuthorGroup;
import usolver.admin.author.vo.AuthorManageVO;
import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import usolver.admin.menu.service.EgovMenuManageService;
import usolver.admin.menu.vo.MenuManageVO;
import usolver.admin.user.service.EgovUserManageService;
import usolver.admin.user.vo.UserDefaultVO;
import usolver.admin.user.vo.UserManageVO;
import usolver.com.cmm.service.MemberService;
import usolver.com.cmm.util.StringUtil;
import usolver.com.main.util.MenuChangeUtil;
import usolver.com.main.vo.LoginVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
public class MainController {
   	
    /** EgovMenuManageService */
	@Resource(name = "meunManageService")
    private EgovMenuManageService menuManageService;
	
    /** MemberService */
    @Resource(name = "memberService")
    private MemberService memberService;
	
    /** userManageService */
    @Resource(name = "userManageService")
    private EgovUserManageService userManageService;
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
    @Resource(name = "egovAuthorGroupService")
    private EgovAuthorGroupService egovAuthorGroupService;
    
    @Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;    
    
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
    
		
   /** LOG4J */
   private Logger log = Logger.getLogger(this.getClass());
      
   private JSONArray json_system = new JSONArray();
   
   @RequestMapping(value="/main/index.do")
   public String mainIndex(ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
	   
	   
	   String userSystem = (String)session.getAttribute("SYSTEM");	   
	   
	   if( userSystem == null || userSystem.equals(""))	{		   
		   userSystem = StringUtil.nvl(request.getParameter("SYSTEM"));		  
	   }
	   
	   //선택된 시스템이 없는 경우 튕겨내자... 기존엔.. 상수로 자동세팅했는데 그러지 말자.. ^^ 
	   if ( userSystem == null || userSystem.equals("")	) {    			   
      	   return "forward:/accessDenied.do?type=noSystem";
      }
	   
   	   if( !userSystem.contains("ROLE_") )	userSystem = "ROLE_"+userSystem;     
	    
	   //메뉴정보를 가져와서... 보내주자.. 메뉴 DB로 관리함. 
	   HashMap<String, Object> paramMap = new HashMap<String, Object>();
	   
	   PaginationInfo paginationInfo = new PaginationInfo();
	   paramMap.put("firstIndex",paginationInfo.getFirstRecordIndex());
	   paramMap.put("lastIndex",paginationInfo.getLastRecordIndex());
	   paramMap.put("recordCountPerPage",paginationInfo.getRecordCountPerPage());
	   
	   if (EgovUserDetailsHelper.isAuthenticated()) {		   
		   //security 에서 사용자 정보, 권한목록 가져오기 
		  LoginVO user =(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();		 		   
		  List<String> autorities = EgovUserDetailsHelper.getAuthorities();
		   		        
		   //로그인한 시스템에 권한이 없는 경우.. : 기본 페이지는 보여줘도 되지 않나? 메뉴 접속 못하고? 
		  /* if( userSystem != null  && autorities.contains(userSystem) ){			   
			   return "forward:/accessDenied.do";
		   }*/
		   		   
		   json_system.clear();
		   
		    CodeManageVO codeManageVO = new CodeManageVO();
	        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
		    codeManageVO.setG2DomainId("5004");  //시스템정보
		    List systemList = egovCodeManageService.selectCodeDetail(codeManageVO);
			
		    for( int i = 0; i < systemList.size(); i++){
		    	
		       Map systemMap = (Map)systemList.get(i);
		       String systemCode = systemMap.get("g2Code").toString();
		       
			   JSONObject jsonSystem = new JSONObject();
			   
			   if( systemCode.equals("WATER")){
				   jsonSystem.put("CODE", "ROLE_WATER");
				   jsonSystem.put("VAL", "상수관리");
				   jsonSystem.put("IMG", "system_water.gif");
				   json_system.add(jsonSystem);
			   }		   
			  if( systemCode.equals("SEWER")){
				   jsonSystem.put("CODE", "ROLE_SEWER");
				   jsonSystem.put("VAL", "하수관리");
				   jsonSystem.put("IMG", "system_sewer.gif");
				   json_system.add(jsonSystem);
			   }		   		
			   if( systemCode.equals("ROAD")){
				   jsonSystem.put("CODE", "ROLE_ROAD");
				   jsonSystem.put("VAL", "도로관리");
				   jsonSystem.put("IMG", "system_road.gif");
				   json_system.add(jsonSystem);
			   }		   		
			   
		   }
		   
		   model.addAttribute("system", userSystem);
		   model.addAttribute("json_system", json_system);
		   model.addAttribute("json_system_size", json_system.size());
		   
		   System.out.println( " ################################### json_system_size ="+json_system.size());
		   System.out.println( " ################################### userSystem ="+userSystem);
		   
		   if( userSystem != null  && autorities.contains(userSystem) ){			   
	   			   
			   String userId =  user.getUSER_ID();
				
			   MenuManageVO menuVo = new MenuManageVO();	   
			   menuVo.setMenuId(userSystem.substring(5));
			   menuVo.setUserId(userId);				  
			   
			   int iMenuCnt = menuManageService.selectMenuListTotCnt(menuVo);
			   List list_menu;
			   			   
			   if( iMenuCnt > 0  ){
				   	  
				   list_menu =  menuManageService.selectMainMenuHead(menuVo);				   
				   System.out.println("~~~~~~~~~~~~~~ 사용자가 가지고 있는 메뉴권한 "+list_menu);
				   
			   }else {				   
				   
				   ArrayList<String> authorList = new ArrayList<String>();
				   
				   for(Object object : autorities) {
					    String element = (String) object;
					    
					    if( element.contains(userSystem)){
					    	authorList.add(element);					    	
						}
					}				   
				   
				   String[] sAuthor = authorList.toArray( new String[authorList.size()] );
				   
				   menuVo = new MenuManageVO();	   
				   menuVo.setMenuId(userSystem.substring(5));
				   menuVo.setAuthorList(sAuthor);
				   //menuVo.setAuthorCode(userSystem);
				   //해당 권한에 따른 메뉴정보 가져오기 
				   list_menu = menuManageService.selectMainMenuHead(menuVo);				   
				   System.out.println("~~~~~~~~~~~~~~ 해당 권한 "+list_menu);
			   }
			   
			   //JSON 형식으로 변경 한다.  
			   JSONObject menuObject = MenuChangeUtil.selectMenuList(list_menu);
						   
			   model.addAttribute("json_menu", menuObject.get("menuList"));
			   model.addAttribute("json_object", menuObject.get("menuObject"));
		   }
	  }
	   
	   return "/usolver/com/main/index";
   }
   
   
   @RequestMapping(value="/main/changeSystemView.do")
   public String systemChangeView(ModelMap model, HttpServletRequest request, HttpSession session)  throws Exception {
	  	   
	 // if (EgovUserDetailsHelper.isAuthenticated()) {
		   	
		   //List<String> autorities = EgovUserDetailsHelper.getAuthorities();
		   
		   //권한 정보 중 시스템에 해당 하는 것만 뽑아 낸다. 
	   		json_system.clear();
	   		
	   		CodeManageVO codeManageVO = new CodeManageVO();
	        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
		    codeManageVO.setG2DomainId("5004");  //시스템정보
		    List systemList = egovCodeManageService.selectCodeDetail(codeManageVO);
			
		    for( int i = 0; i < systemList.size(); i++){
		    	
		       Map systemMap = (Map)systemList.get(i);
		       String systemCode = systemMap.get("g2Code").toString();
		       
			   JSONObject jsonSystem = new JSONObject();
			   
			   if( systemCode.equals("WATER")){
				   jsonSystem.put("CODE", "ROLE_WATER");
				   jsonSystem.put("VAL", "상수관리");
				   jsonSystem.put("IMG", "system_water.gif");
				   json_system.add(jsonSystem);
			   }		   
			  if( systemCode.equals("SEWER")){
				   jsonSystem.put("CODE", "ROLE_SEWER");
				   jsonSystem.put("VAL", "하수관리");
				   jsonSystem.put("IMG", "system_sewer.gif");
				   json_system.add(jsonSystem);
			   }		   		
			   if( systemCode.equals("ROAD")){
				   jsonSystem.put("CODE", "ROLE_ROAD");
				   jsonSystem.put("VAL", "도로관리");
				   jsonSystem.put("IMG", "system_road.gif");
				   json_system.add(jsonSystem);
			   }		   		
			   
		   }
		   model.addAttribute("json_system", json_system);
		   model.addAttribute("json_system_size", json_system.size());
		   		   
	//  }
  
	   return "/usolver/com/main/changeSystem";
   }

   
   @RequestMapping(value="/main/changeSystem.do")
   public String systemChangeAction(ModelMap model, HttpServletRequest request, HttpSession session)  throws Exception {
	   
	   
	   String userSystem = StringUtil.nvl(request.getParameter("SYSTEM"));		   
	   session.setAttribute("SYSTEM", userSystem);
	  	   
	   return "redirect:/main/index.do";
	   
	   
	   	/*	
	   		if( !userSystem.contains("ROLE_") )	userSystem = "ROLE_"+userSystem;  
	   		
	   		if (EgovUserDetailsHelper.isAuthenticated()) {		   
			   //security 에서 사용자 정보, 권한목록 가져오기 
	   		  	LoginVO user =(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();		 		   
	   			List<String> autorities = EgovUserDetailsHelper.getAuthorities();
		   	
		   		if( userSystem != null  && autorities.contains(userSystem) ){			   
		 			   
					   String userId =  user.getUSER_ID();
						
					   MenuManageVO menuVo = new MenuManageVO();	   
					   menuVo.setMenuId(userSystem.substring(5));
					   menuVo.setUserId(userId);				  
					   
					   int iMenuCnt = menuManageService.selectMenuListTotCnt(menuVo);
					   List list_menu;
					   			   
					   if( iMenuCnt > 0  ){
						   	  
						   list_menu =  menuManageService.selectMainMenuHead(menuVo);				   
						   System.out.println("~~~~~~~~~~~~~~ 사용자가 가지고 있는 메뉴권한 "+list_menu);
						   
					   }else {				   
						   
						   ArrayList<String> authorList = new ArrayList<String>();
						   
						   for(Object object : autorities) {
							    String element = (String) object;
							    
							    if( element.contains(userSystem)){
							    	authorList.add(element);					    	
								}
							}				   
						   
						   String[] sAuthor = authorList.toArray( new String[authorList.size()] );
						   
						   menuVo = new MenuManageVO();	   
						   menuVo.setMenuId(userSystem.substring(5));
						   menuVo.setAuthorList(sAuthor);
						   //menuVo.setAuthorCode(userSystem);
						   //해당 권한에 따른 메뉴정보 가져오기 
						   list_menu = menuManageService.selectMainMenuHead(menuVo);				   
						   System.out.println("~~~~~~~~~~~~~~ 해당 권한 "+list_menu);
					   }
					   
					   //JSON 형식으로 변경 한다.  
					   JSONObject menuObject = MenuChangeUtil.selectMenuList(list_menu);
								   
					   model.addAttribute("json_menu", menuObject.get("menuList"));
					   model.addAttribute("json_object", menuObject.get("menuObject"));
				   }
	   		}
		   	
	   	 	model.addAttribute("system", userSystem);
	   	 	model.addAttribute("json_system", json_system);
	   	 	model.addAttribute("json_system_size", json_system.size());
	   
	   return "/usolver/com/main/index";*/
   }

   
   @RequestMapping(value="/main/changeTheme.do")
   public String temaChangeView(ModelMap model, HttpServletRequest request, HttpSession session){
	   
	   return "/usolver/com/main/changeTheme";
   }

     
   /**
  	 * 사용자 정보조회
  	 * @param searchVO - 조회할 정보가 담긴 VO
  	 * @param model
  	 * @return ""
  	 * @exception Exception
  	 */
      @RequestMapping(value="/main/userInfo.do")
      public String userInfo(Model model, HttpServletRequest request)  throws Exception {
   	   
		   //로그인 정보가 없는 경우.. : 모든 곳에 다 처리해 줘야하나? 흠.흠..
	   	   if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	          	   return "forward:/accessDenied.do?type=nosession";
	   	   }
	   	   
	   	   LoginVO  user =(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	 	   List<String> autorities = EgovUserDetailsHelper.getAuthorities();
		   
/*    	   LoginVO  user = new LoginVO();
    	   user.setUSER_ID("user");*/	
	 	   
		   LoginVO  userInfo =(LoginVO)memberService.getUserInfo(user);
	   
		   model.addAttribute("result", userInfo);
		   //model.addAttribute("autorities",  autorities);
		   model.addAttribute("action_flag", "UPDATE" );	// 처리 상태
   	   
	   	   // [권한정보 추출]
	   	   AuthorManageVO authorVO = new AuthorManageVO();
	   	   authorVO.setFirstIndex(0);
	   	   authorVO.setLastIndex(100);
	   	   authorVO.setRecordCountPerPage(1000);
	   	   System.out.println("################################# user.getUSER_ID() ="+user.getUSER_ID());
	   	   
	   	   // 시스템 정보조회
	   	   CodeManageVO codeManageVO = new CodeManageVO();
	   	   codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
	    
	   	   codeManageVO.setG2DomainId("5004");  //시스템정보
	   	   List SystemList = egovCodeManageService.selectCodeDetail(codeManageVO);

	   	   authorVO.setUserId(user.getUSER_ID());
	   	   authorVO.setSearchKeyword(user.getUSER_ID());
	   	   	   	   
	   	   //authorVO.setAuthorType("SYSTEM");
	   	   //authorVO.setSearchCondition("1");
	   	  // model.addAttribute("author_sys_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 	   	   
	   	   
	   	   // 권한정보 조회 
	   	  // authorVO.setAuthorType("AUTHOR");
	   	   
	   	 //  if( autorities.contains("ROLE_WATER") ){ 
		    	   //authorVO.setSysCode("WATER");
		    	   authorVO.setAuthorType("WATER");
		    	   model.addAttribute("author_water_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 
	   	 //  }
	   	   
	   	 //  if( autorities.contains("ROLE_SEWER") ){ 
		    	   //authorVO.setSysCode("SEWER");
		    	   authorVO.setAuthorType("SEWER");
		    	   model.addAttribute("author_sewer_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 
	   	 //  }
	   	   
	   	  // if( autorities.contains("ROLE_ROAD") ){ 
		    	  // authorVO.setSysCode("ROAD");
		    	   authorVO.setAuthorType("ROAD");
		    	   model.addAttribute("author_road_list", egovAuthorManageService.selectAuthorUserList(authorVO)); 
	   	  // }
	   	   
	   	   // [부서정보 추출]					   
		   codeManageVO.setG2DomainId("5001");  //부서
		   model.addAttribute("dept_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));	
	  		   
	   	   model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
	   	   model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
	   	   return "/usolver/com/main/userInfo";
      }
       
      /**
     	 * 사용자 정보 수정 :userInfo 에서 사용자 정보 수정할 때 사용 
     	 * @param searchVO - 조회할 정보가 담긴 VO
     	 * @param model
     	 * @return ""
     	 * @exception Exception
     	 */
      @RequestMapping(value="/main/userUpdateProc.do")
      public String UserUpdateProcWrite(
      		@ModelAttribute LoginVO loginVo, BindingResult bindingResult, Model model, HttpServletRequest request, HttpSession session) 
      		throws Exception {
   	   
   	   
		   //로그인 정보가 없는 경우.. : 모든 곳에 다 처리해 줘야하나? 흠.흠..
	  /* 	   if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	   		   model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
	          	   return "forward:/accessDenied.do";
	          	   //return "forward:/accessDenied.do";
	   	   }*/
   	   
      	// common 결과처리 변수 [수정X]
	   	   String resultMsg = "";
	   	   String errorMsg = "";
	   	   
	   	   System.out.println("###################### usr.getUSER_ID ="+ loginVo.getUSER_ID());
	   	   System.out.println("###################### usr.getSYSTEM ="+ loginVo.getSYSTEM());
	   	   String action_flag = StringUtil.nvl(request.getParameter("action_flag"));
  	
  		   		
	      	try {
	      		
	      		if (EgovUserDetailsHelper.isAuthenticated() && action_flag.equals("UPDATE") ) {  			
	      			memberService.updateUser( loginVo );
	      			resultMsg = "UPDATE_SUCCESS";
	      		}
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
      
      /**
     	 * 사용자 권한신청 :userInfo 에서 사용자 권한을 신청 할 때 사용 
     	 * @param searchVO - 조회할 정보가 담긴 VO
     	 * @param model
     	 * @return ""
     	 * @exception Exception
     	 */
      @RequestMapping(value="/main/userAuthorProc.do")
      public String UserAuthorProcWrite(
      		@ModelAttribute LoginVO loginVo, BindingResult bindingResult, Model model, HttpServletRequest request, HttpSession session) 
      		throws Exception {
   	   
		   //로그인 정보가 없는 경우.. : 모든 곳에 다 처리해 줘야하나? 흠.흠..
	   	 /*  if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	   		   model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
	          	   return "forward:/accessDenied.do";
	          	   //return "forward:/accessDenied.do";
	   	   }*/
   	   
      	// common 결과처리 변수 [수정X]
	   	   String resultMsg = "";
	   	   String errorMsg = "";
  		
	   	   String action_flag = StringUtil.nvl(request.getParameter("action_flag"));
  		
	   	   String authorCodes = loginVo.getUSER_AUTHOR_CODE();
	   	   System.out.println("###################### authorCodes ="+authorCodes);
  		
	   	   AuthorGroup  authorGroup = new AuthorGroup();   	
  		   		
	   	   try {
      		
      		if ( authorCodes != null  && action_flag.equals("UPDATE") ) {  			
   			
      			System.out.println("###################### authorCodes ="+authorCodes);
      			
      	   		//사용자가 신청한 권한 정보 받아오기 
      	   		String[] strAuthorCodes = authorCodes.split(",");   		
      	   		
      			//권한정보 신청 
      			for(int i=0; i<strAuthorCodes.length;i++) {
      	    		
      	   			int iCh = strAuthorCodes[i].indexOf("_");
      	   			
      	   			String sysCode = strAuthorCodes[i].substring(0,iCh);
      	   			String authorCode = strAuthorCodes[i].substring(iCh+1);
      	   			
      	   			System.out.println("###################### sysCode ="+sysCode);
      	   			System.out.println("###################### authorCode ="+authorCode);
      	   		
      	   			authorGroup.setUserId(loginVo.getUSER_ID());
      	   			authorGroup.setSysCode(sysCode);
      	   			authorGroup.setAuthorCode(authorCode);
      	   			egovAuthorGroupService.insertAuthorGroup(authorGroup);
      	    		
      	    		//if(strRegYns[i].equals("N"))
      	    		//    egovAuthorGroupService.insertAuthorGroup(authorGroup);
      	    		//else 
      	    		//    egovAuthorGroupService.updateAuthorGroup(authorGroup);
      	    	}       			
      			resultMsg = "SAVE_SUCCESS";
      			
      		}else {
      			
      	   		authorGroup.setAuthorCode("ROLE_"+loginVo.getSYSTEM());
      	   		authorGroup.setUserId(loginVo.getUSER_ID());       	   		
      	   		
      	   		System.out.println("###################### authorGroup ="+authorGroup);
      	   		authorGroup.setSysCode(loginVo.getSYSTEM());
      			egovAuthorGroupService.insertAuthorGroup(authorGroup);		// 권한 등록 : 신청권한 등록
      			authorGroup.setSysCode(loginVo.getSYSTEM());
      			authorGroup.setAuthorCode("ROLE_BASIC");
      			egovAuthorGroupService.insertAuthorBasic(authorGroup);		// 권한 등록 : 기본권한 세팅 
      			
      			resultMsg = "SAVE_SUCCESS";
      		}
      		       		
      	} catch(Exception e) {
      		resultMsg = "ERROR";
      		errorMsg = "등록 오류 발생";
      	}
      	
      	// 결과 처리용 [수정X]       	
      	model.addAttribute("resultMsg", resultMsg);
      	model.addAttribute("errorMsg", errorMsg);
      	model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수    	

      	return "/usolver/com/cmm/commonMsg";
      	
      }
         
      /**
       * 사용자 암호 수정처리 후 화면 이동
       * @param model 화면모델
       * @param commandMap 파라메터전달용 commandMap
       * @param userSearchVO 검색조 건
       * @param userManageVO 사용자수정정보(비밀번호)
       * @return uss/umt/EgovUserPasswordUpdt
       * @throws Exception
       */
      @RequestMapping(value="/main/userPasswdProc.do")
      public String UserPasswdProcWrite(ModelMap model, HttpServletRequest request, 
      		  					 @ModelAttribute("searchVO") UserDefaultVO userSearchVO,
      		  					 @ModelAttribute("userManageVO") UserManageVO userManageVO) 
      							throws Exception {
          
          boolean isCorrectPassword=false;
          UserManageVO resultVO = new UserManageVO();
      	 
      	  String resultMsg = "info.nodata.msg";
      	  String errorMsg = "";	
      	 
      	  resultVO = userManageService.selectPassword(userManageVO);
      	
      	  //패스워드 암호화
          //sha-256 암호화 처리 
      	  PasswordEncoder encoder = new ShaPasswordEncoder(256); 
      	  String encryptPass = encoder.encodePassword(userManageVO.getOldPassword(), null);    	
      	  if (encryptPass.equals(resultVO.getPassword())){
      		  isCorrectPassword = true;        	
      	  }else{
      		  isCorrectPassword = false;
      		  resultMsg="fail.user.passwordUpdate1";
      	  }
      	
      	  if (isCorrectPassword){
      		  
      		  try {
      			  userManageVO.setPassword( encoder.encodePassword(userManageVO.getNewPassword(), null));
      			  userManageService.updatePassword(userManageVO);
      			  model.addAttribute("userManageVO", userManageVO);
      			  resultMsg = "SAVE_SUCCESS";
      			  
      		  } catch(Exception e) {
          		resultMsg = "ERROR";
          		errorMsg = "등록 오류 발생";
      		  }
        }
      	
      	// 결과 처리용 [수정X]       	
      	model.addAttribute("resultMsg", resultMsg);
      	model.addAttribute("errorMsg", errorMsg);
      	model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수    	
      	
    	return "/usolver/com/cmm/commonMsg";
      }
}
