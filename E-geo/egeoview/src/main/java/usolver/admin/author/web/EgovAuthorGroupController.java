package usolver.admin.author.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import usolver.admin.author.service.EgovAuthorGroupService;
import usolver.admin.author.service.EgovAuthorManageService;
import usolver.admin.author.vo.AuthorGroup;
import usolver.admin.author.vo.AuthorGroupVO;
import usolver.admin.author.vo.AuthorManageVO;
import usolver.admin.menu.service.EgovMenuCreateManageService;
import usolver.admin.menu.vo.MenuCreatVO;
import usolver.admin.user.service.EgovUserManageService;
import usolver.admin.user.vo.UserDataVO;
import usolver.com.main.vo.LoginVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.SessionVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

/**
 * 권한그룹에 관한 controller 클래스를 정의한다.
 * @author 공통서비스 개발팀 이문준
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.11  이문준          최초 생성
 *   2011.08.04  서준식          mberTyCodes 구분자 부분 추가
 *   2011.8.26	정진오			IncludedInfo annotation 추가
 * </pre>
 */


@Controller
@SessionAttributes(types=SessionVO.class)
public class EgovAuthorGroupController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "egovAuthorGroupService")
    private EgovAuthorGroupService egovAuthorGroupService;
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
	/** EgovMenuManageService */
	@Resource(name = "meunCreateManageService")
	private EgovMenuCreateManageService menuCreateManageService;
    
    @Resource(name = "userManageService")
    private EgovUserManageService userManageService;
    
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;



	/**
	 * 그룹별 할당된 권한 목록 조회
	 * @param authorGroupVO AuthorGroupVO
	 * @param authorManageVO AuthorManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/author/EgovAuthorGroupList.do")
	public String selectAuthorGroupList(@ModelAttribute("authorGroupVO") AuthorGroupVO authorGroupVO,
			                            @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
			                             ModelMap model) throws Exception {

    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(authorGroupVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(authorGroupVO.getPageUnit());
		paginationInfo.setPageSize(authorGroupVO.getPageSize());
		
		authorGroupVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		authorGroupVO.setLastIndex(paginationInfo.getLastRecordIndex());
		authorGroupVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		authorGroupVO.setAuthorGroupList(egovAuthorGroupService.selectAuthorGroupList(authorGroupVO));
        model.addAttribute("authorGroupList", authorGroupVO.getAuthorGroupList());
        
        int totCnt = egovAuthorGroupService.selectAuthorGroupListTotCnt(authorGroupVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);

        model.addAttribute("authorManageList", egovAuthorManageService.selectAuthorList(authorManageVO));

        model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
        
        return "usolver/admin/author/EgovAuthorGroupManage";
	}

	/**
	 * 그룹에 권한정보를 할당하여 데이터베이스에 등록
	 * @param userIds String
	 * @param authorCodes String
	 * @param regYns String
	 * @param authorGroup AuthorGroup
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value="/admin/author/EgovAuthorGroupInsert.do")
	public String insertAuthorGroup(@RequestParam("userIds") String userIds,
			                        @RequestParam("authorCodes") String authorCodes,
			                        @RequestParam("regYns") String regYns,
			                        //@RequestParam("mberTyCodes") String mberTyCodes,// 2011.08.04 수정 부분
			                        @ModelAttribute("authorGroup") AuthorGroup authorGroup,
			                         SessionStatus status,
			                         ModelMap model) throws Exception {
		
    	String [] strUserIds = userIds.split(";");    	
    	String [] strAuthorCodes = authorCodes.split(";");
    	String [] strRegYns = regYns.split(";");
    	//String [] strMberTyCodes = mberTyCodes.split(";");// 2011.08.04 수정 부분
    	
    	for(int i=0; i<strUserIds.length;i++) {
    		
    		authorGroup.setUniqId(strUserIds[i]);
    		authorGroup.setAuthorCode(strAuthorCodes[i]);
    		//authorGroup.setMberTyCode(strMberTyCodes[i]);// 2011.08.04 수정 부분
    		if(strRegYns[i].equals("N"))
    		    egovAuthorGroupService.insertAuthorGroup(authorGroup);
    		else 
    		    egovAuthorGroupService.updateAuthorGroup(authorGroup);
    	}

        status.setComplete();
        model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.insert"));		
		return "forward:/admin/author/EgovAuthorGroupList.do";
	}

	
	/**
	 * 그룹에 권한정보를 할당하여 데이터베이스에 등록
	 * @param userIds String
	 * @param authorCodes String
	 * @param regYns String
	 * @param authorGroup AuthorGroup
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value="/admin/author/EgovAuthorGroupApprove.do")
	public String approveAuthorGroup(HttpServletRequest request, SessionStatus status,  ModelMap model) throws Exception {
		
		AuthorGroup authorGroup = new AuthorGroup();
		
		String userIds = request.getParameter("userIds");
		String authorCodes = request.getParameter("authorCodes");
		
		String userId = request.getParameter("userId");
		String sysCode = request.getParameter("sysCode");
		String authorCode = request.getParameter("authorCode");
		
		System.out.println("#################### userIds = "+userIds);
		System.out.println("#################### userId = "+userId);
		System.out.println("#################### authorCode = "+authorCode);
		
		if( userIds != null && userIds.length() > 0){
		
	    	String [] strUserIds = userIds.split(";");    	
	    	String [] strAuthorCodes = authorCodes.split(";");
	    	
	    	for(int i=0; i<strUserIds.length;i++) {
	    		
	    		authorGroup.setUserId(strUserIds[i]);
	    		authorGroup.setAuthorCode(strAuthorCodes[i]);
    		    egovAuthorGroupService.updateAuthorGroup(authorGroup);
	    	}
		}
		
		if( userId != null && userId.length() > 0 ){
			
			authorGroup.setUserId(userId);
    		authorGroup.setAuthorCode(authorCode);
    		authorGroup.setSysCode(sysCode);
    		
    		egovAuthorGroupService.updateAuthorGroup(authorGroup);
		}

        status.setComplete();
        model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.insert"));		
		return "forward:/admin/author/EgovAuthorGroupList.do";
	}

	
	/**
	 * 그룹별 할당된 시스템 메뉴 접근권한을 삭제
	 * @param userIds String
	 * @param authorGroup AuthorGroup
	 * @return String
	 * @exception Exception
	 */ 
	@RequestMapping(value="/admin/author/EgovAuthorGroupDelete.do")
	public String deleteAuthorGroup(@RequestParam("userIds") String userIds,
                                    @ModelAttribute("authorGroup") AuthorGroup authorGroup,
                                     SessionStatus status,
                                     ModelMap model) throws Exception {
		
    	String [] strUserIds = userIds.split(";");
    	for(int i=0; i<strUserIds.length;i++) {
    		authorGroup.setUniqId(strUserIds[i]);
    		egovAuthorGroupService.deleteAuthorGroup(authorGroup);
    	}
    	
		status.setComplete();
		model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.delete"));
		return "forward:/admin/author/EgovAuthorGroupList.do";
	}

	
	
	
	
	
    /**
	 * 권한 목록화면 이동
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping("/admin/author/EgovAuthorGroupListView.do")
    public String selectAuthorGroupListView() throws Exception {

        return "usolver/admin/author/EgovAuthorGroupManage";
    }    
	  /**
	  	 * 관리자 권한승인 : EgovUserSelectUpdt.jsp 에서 관리자가 권한 승인할 때 사용.. 
	  	 * @param searchVO - 조회할 정보가 담긴 VO
	  	 * @param model
	  	 * @return ""
	  	 * @exception Exception
	  	 */
	   @RequestMapping(value="/admin/author/EgovAuthorUserApproveProc.do")
	   public String UserAuthorApproveProcWrite(
	   		@ModelAttribute("userAuthorForm") LoginVO loginVo, BindingResult bindingResult, Model model, HttpServletRequest request, HttpSession session) 
	   		throws Exception {
		   
		   //로그인 정보가 없는 경우... 
		 /*  if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
			   model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
	       	   return "forward:/accessDenied.do";
	       	   //return "forward:/accessDenied.do";
		   }*/
		   
		 /*  List<String> autorities = EgovUserDetailsHelper.getAuthorities();
		   if( !autorities.contains("ROLE_ADMIN") ){ 
			   model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
			   return "forward:/accessDenied.do";
		   }*/
		   
		   	// common 결과처리 변수 [수정X]
			String resultMsg = "";
		   	String errorMsg = "";
			
			String userId =  loginVo.getUSER_ID();
		   	String sysCodes =  loginVo.getUSER_SYS_CODE();
		   	String authorCodes = loginVo.getUSER_AUTHOR_CODE();
		   	
			System.out.println("###################### usr.getUSER_ID ="+ userId);
			System.out.println("###################### sysCodes ="+ sysCodes);			
			System.out.println("###################### authorCodes ="+authorCodes);
			
		   	AuthorGroup  authorGroup = new AuthorGroup();   	
				   		
		   	try {
		   		
		   		if ( authorCodes != null ) {  			
					
		   			System.out.println("###################### authorCodes ="+authorCodes);
		   			
		   	   		//사용자가 신청한 권한 정보 받아오기 
		   	   		String[] strAuthorCodes = authorCodes.split(",");   		
		   	   		
		   			//권한정보 승인... 
		   			for(int i=0; i<strAuthorCodes.length;i++) {
		   	    		
		   				String[] strAuthorCodesInfo = strAuthorCodes[i].split(":");   		
		   				
		   				String regYn = strAuthorCodesInfo[0];		//승인여부  : 0 신청도 안함. 1: 신청함 2: 승인함. 
		   	   			String sysCode = strAuthorCodesInfo[1];		//시스템 코드 
		   	   			String authorCode = strAuthorCodesInfo[2];	// 권한 코드 
		   	   			
		   	   			System.out.println("###################### compAuth ="+regYn);
		   	   			System.out.println("###################### sysCode ="+sysCode);
		   	   			System.out.println("###################### authorCode ="+authorCode);
		   	   		
		   	   			authorGroup.setUserId(userId);
		   	   			authorGroup.setSysCode(sysCode);
		   	   			authorGroup.setAuthorCode(authorCode);		   	   			
		   	   			
		   	   			if( regYn != null && regYn.equals("1") ){
		   	   				//승인
		   	   				egovAuthorGroupService.updateAuthorGroup(authorGroup);
		   	   			}else if( regYn != null && regYn.equals("0") ){
		   	   				//등록 : 자동 승인 
		   	   				egovAuthorGroupService.insertAuthorBasic(authorGroup);
		   	   			}
		   	    		
		   	   			MenuCreatVO menuCreatVO = new MenuCreatVO();
		   	   			menuCreatVO.setAuthorCode(authorCode);
		   	   			
			   			//권한에 대한 메뉴정보를 가져온다. 
		   	   			List menuList = menuCreateManageService.selectMenuFunctionList(menuCreatVO);
		   	   			String[] sMenu = new String[menuList.size()];
		   	   		
		   	   			for(int k=0; k < menuList.size(); k++){		   	   				
		   	   				Map map = (Map) menuList.get(k);		   	   				
		   	   				sMenu[k] = new String(map.get("menuno").toString());	
		   	   			}			   			
		   	   		
		   	   			if( sMenu != null && sMenu.length > 0){
				   			UserDataVO userDataVO = new UserDataVO();
				   			userDataVO.setUserId(userId);
				   			userDataVO.setFunctionList(sMenu);   			
			   	   			userManageService.insertUserMenuFunctionList(userDataVO);
		   	   			}
		   	   			
		   	   			//권한에 대한  데이터 정보를 가져온다. 
		   	   			List dataList = menuCreateManageService.selectMenuFunctionList2(menuCreatVO);
		   	   			String[] sData = new String[dataList.size()];
		   	   		
		   	   			for(int k=0; k < dataList.size(); k++){		   	   				
		   	   				Map map = (Map) dataList.get(k);		   	   				
		   	   				sData[k] = new String(map.get("lyrid").toString());	
		   	   			}			   			
		   	   			
			   	   		if( sData != null && sData.length > 0){
				   			UserDataVO userDataVO = new UserDataVO();
				   			userDataVO.setUserId(userId);
				   			userDataVO.setFunctionList(sData);   		
				   			
				   			if(authorCode.contains("VIEW")) userDataVO.setAuthor("VIEW");
				   			if(authorCode.contains("EDIT")) userDataVO.setAuthor("EDIT");
				   			if(authorCode.contains("PRINT")) userDataVO.setAuthor("PRINT");
				   			
				   			userManageService.insertDataFunctionList(userDataVO);
		   	   			}
		   	   			
		   	    	}       			
		   			resultMsg = "success.common.insert";
		   			
		   		}
		   		
		   		if ( sysCodes != null ) {
		   			
		   			String[] strSysCodes = sysCodes.split(",");   		
		   			
		   			//권한정보 승인... 
		   			for(int i=0; i<strSysCodes.length;i++) {		   	    			   	   			
		   	   			
		   				String[] strSysCodesInfo = strSysCodes[i].split(":");   		
		   				
		   				String regYn = strSysCodesInfo[0];		//승인여부
		   	   			String authorCode = strSysCodesInfo[1];		//권한코드 
		   	   			
		   	   			System.out.println("###################### authorCode ="+authorCode);
		   	   		
		   	   			authorGroup.setUserId(userId);
		   	   			authorGroup.setSysCode("ROOT");
		   	   			authorGroup.setAuthorCode(authorCode);
		   	   			
		   	   			if( regYn != null && regYn.equals("1") ){
		   	   				//승인
		   	   				egovAuthorGroupService.updateAuthorGroup(authorGroup);
		   	   				
		   	   			}else if( regYn != null && regYn.equals("0") ){
		   	   				//등록 : 자동 승인인 경우.. 
		   	   				egovAuthorGroupService.insertAuthorBasic(authorGroup);
		   	   				authorGroup.setAuthorCode("ROLE_BASIC");
		   	   				egovAuthorGroupService.insertAuthorBasic(authorGroup);		// 권한 등록 : 기본권한 세팅 
		   	   			}
		   	    		
		   	    	}       			
		   			
		   			resultMsg = "success.common.insert";
		   		}
		   		       		
		   	} catch(Exception e) {
		   		
		   		System.out.println("SSSSSSSSSSSSSSSSSSSSSSSSSSSSS   Exception "+e);
		   		resultMsg = "fail.common.insert";
		   		errorMsg = "등록 오류 발생";
		   	}
	   	
	   	// 결과 처리용 [수정X]  : 승인처리후 구냥 조회화면으로.. 		
		    model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));					
			return "forward:/admin/user/EgovUserUpdateView.do?userId="+userId;  
	   	
	   }
	   
	   /**
		 * 사용자 접근권한을 삭제
		 * @param userIds String
		 * @param authorGroup AuthorGroup
		 * @return String
		 * @exception Exception
		 */ 
		@RequestMapping(value="/admin/author/EgovAuthorUserDeleteProc.do")
		public String deleteAuthorUser(@ModelAttribute("userAuthorForm") LoginVO loginVo, SessionStatus status, ModelMap model) throws Exception {
			
			
			String userId =  loginVo.getUSER_ID();
		   	String sysCodes =  loginVo.getUSER_SYS_CODE();
		   	String authorCodes = loginVo.getUSER_AUTHOR_CODE();
		   	
		   	System.out.println("###################### sysCodes ="+sysCodes);
			System.out.println("###################### authorCodes ="+authorCodes);
		   	
			AuthorGroup  authorGroup = new AuthorGroup();   	
			
		  	// common 결과처리 변수 [수정X]
			String resultMsg = "info.nodata.msg";
   		    	
	    	try {
		   		
		   		if ( authorCodes != null ) {  			
		   			
		   	   		//사용자가 신청한 권한 정보 받아오기 
		   	   		String[] strAuthorCodes = authorCodes.split(",");   		
		   	   		
		   			//권한정보 승인... 
		   			for(int i=0; i<strAuthorCodes.length;i++) {
		   	    		
		   				String[] strAuthorCodesInfo = strAuthorCodes[i].split(":");   		
		   				
		   				String regYn = strAuthorCodesInfo[0];		//승인여부  : 0 신청도 안함. 1: 신청함 2: 승인함. 
		   	   			String sysCode = strAuthorCodesInfo[1];		//시스템 코드 
		   	   			String authorCode = strAuthorCodesInfo[2];	// 권한 코드 
		   	   			
		   	   			System.out.println("###################### regYn ="+regYn);
		   	   			System.out.println("###################### sysCode ="+sysCode);
		   	   			System.out.println("###################### authorCode ="+authorCode);
		   	   		
		   	   			authorGroup.setUserId(userId);
		   	   			authorGroup.setSysCode(sysCode);
		   	   			authorGroup.setAuthorCode(authorCode);		   	   			
		   	   			
		   	   			if( regYn != null && !regYn.equals("0") ){		   	   				
		   	   				egovAuthorGroupService.deleteAuthorGroup(authorGroup);
		   	   			}
		   	    		
		   	    	}       			
		   			resultMsg = "success.common.delete";
		   			
		   		}
		   		
		   		if ( sysCodes != null ) {
		   			
		   			String[] strSysCodes = sysCodes.split(",");   		
		   			
		   			//권한정보 승인... 
		   			for(int i=0; i<strSysCodes.length;i++) {
		   	    			   	   			
		   	   			
		   				String[] strSysCodesInfo = strSysCodes[i].split(":");   		
		   				
		   				String regYn = strSysCodesInfo[0];		//승인여부
		   	   			String authorCode = strSysCodesInfo[1];		//권한코드 
		   	   					   	   		
		   	   			authorGroup.setUserId(userId);
		   	   			authorGroup.setSysCode("ROOT");
		   	   			authorGroup.setAuthorCode(authorCode);
		   	   			
			   	   		System.out.println("###################### regYn ="+regYn);
		   	   			System.out.println("###################### authorCode ="+authorCode);
		   	   			
		   	   			if( regYn != null && !regYn.equals("0") ){

		   	   				egovAuthorGroupService.deleteAuthorGroup(authorGroup);   	  
		   	   				
		   	   			}		   	    		
		   	    	}       			
		   			
		   			resultMsg = "success.common.delete";
		   		}
		   		       		
		   	} catch(Exception e) {
		   		resultMsg = "fail.common.delete";
		   	}

	    	 model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));					
			 return "forward:/admin/user/EgovUserUpdateView.do?userId="+userId;  
		}
	   

}