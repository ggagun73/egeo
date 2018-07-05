package usolver.admin.role.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.admin.author.service.EgovAuthorManageService;
import usolver.admin.author.vo.AuthorManageVO;
import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import usolver.admin.role.service.EgovRoleManageService;
import usolver.admin.role.vo.RoleManage;
import usolver.admin.role.vo.RoleManageVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.SessionVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 롤관리에 관한 controller 클래스를 정의한다.
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
 *   2011.8.26	정진오			IncludedInfo annotation 추가
 *
 * </pre>
 */


@Controller
@SessionAttributes(types=SessionVO.class)
public class EgovRoleManageController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "egovRoleManageService")
    private EgovRoleManageService egovRoleManageService;

    @Resource(name = "EgovCmmUseService")
    EgovCmmUseService egovCmmUseService;
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
    @Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;    
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    /** Message ID Generation */
    @Resource(name="egovRoleIdGnrService")    
    private EgovIdGnrService egovRoleIdGnrService;
    
    //@Autowired
	//private DefaultBeanValidator beanValidator;

/*    *//**
	 * 롤 목록화면 이동
	 * @return String
	 * @exception Exception
	 *//*
    @RequestMapping("/admin/role/EgovRoleListView.do")
    public String selectRoleListView()
            throws Exception {
        return "usolver/admin/role/EgovRoleManage";
    }    */
    
	/**
	 * 등록된 롤 정보 목록 조회
	 * @param roleManageVO RoleManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleList.do")
	public String selectRoleList(@ModelAttribute("roleManageVO") RoleManage roleManageVO, 
			                      ModelMap model) throws Exception {
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(roleManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(roleManageVO.getPageUnit());
		paginationInfo.setPageSize(roleManageVO.getPageSize());
		
		roleManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		roleManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		roleManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
        model.addAttribute("roleList", egovRoleManageService.selectRoleList(roleManageVO));
        
        int totCnt = egovRoleManageService.selectRoleListTotCnt(roleManageVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("menu", "role");

        return "usolver/admin/role/EgovRoleList";
	}    

	/**
	 * 등록된 롤 정보 조회
	 * @param roleCode String
	 * @param roleManageVO RoleManageVO
	 * @param authorManageVO AuthorManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleView.do")
	public String selectRoleView(@RequestParam("roleCode") String roleCode,
	                         @ModelAttribute("roleManageVO") RoleManage roleManageVO, 
	                         @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
		                      ModelMap model) throws Exception {
        
    	
    	if( roleCode != null && !roleCode.equals("")){    		
    		roleManageVO.setRoleCode(roleCode);  
    		model.addAttribute("roleManage", egovRoleManageService.selectRole(roleManageVO));
    	}
    	
    	System.out.println("ASDFASFASFASDf ==>"+model.get("roleManage"));
    	    	                   
        CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5003");  //롤유형코드
        
        model.addAttribute("cmmCodeDetailList", egovCodeManageService.selectCodeDetail(codeManageVO));
        model.addAttribute("menu", "role");

        return "usolver/admin/role/EgovRoleView";
	}

    
	/**
	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록
	 * @param roleManage RoleManage
	 * @param roleManageVO RoleManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleWriteProc.do")
	public String egovRoleWriteProc(@ModelAttribute("roleManage") RoleManage roleManage,
			                 @ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
			                  SessionStatus status, 
                              ModelMap model) throws Exception {
    	
    	//beanValidator.validate(roleManage, bindingResult); //validation 수행
    	
    	String resultMsg = "info.nodata.msg";
    	
    	try{
    		
    		if (roleManageVO.getRoleCode() == null || roleManageVO.getRoleCode().equals("")){ 
    			
    			String roleTyp = roleManage.getRoleTyp();
    		    
    			if(roleTyp.equals("method")) 	roleTyp = "MTD";
    		    else if(roleTyp.equals("pointcut"))  roleTyp = "PCT";
    		    else roleTyp = "WEB";
    		    	
    			roleManage.setRoleCode(roleTyp.concat("-").concat(egovRoleIdGnrService.getNextStringId()));
    	    	roleManageVO.setRoleCode(roleManage.getRoleCode());
    	    	
    	    	egovRoleManageService.insertRole(roleManage);
    	    	resultMsg = "success.common.insert";
    	    	
    		} else {
    	   
    			egovRoleManageService.updateRole(roleManage);
    			resultMsg = "success.common.update";
    		}	
    		
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
		}
    	
    	status.setComplete();        
        model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));   	
    	return "forward:/admin/role/EgovRoleView.do";
	}
    
	/**
	 * 불필요한 롤정보를 화면에 조회하여 데이터베이스에서 삭제
	 * @param roleManage RoleManage
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleDeleteProc.do")
	public String egovRoleDelete(@ModelAttribute("roleManage") RoleManage roleManage,
										HttpServletRequest request,
										SessionStatus status, 
        ModelMap model) throws Exception {
    	
    	String resultMsg = "info.nodata.msg";    	    	
    	String roleCodes = request.getParameter("checkList");
    	
    	try{
    		
    		if( roleCodes != null && !roleCodes.equals("") ){
	    		String [] strRoleCodes = roleCodes.split(";");    	
	    		if( strRoleCodes.length > 0 ){
		    		for(int i=0; i<strRoleCodes.length;i++) {
		        		roleManage.setRoleCode(strRoleCodes[i]);
		        		egovRoleManageService.deleteRole(roleManage);		        		
		        	}
		    		
		    		resultMsg = "success.common.delete";
	    		}
    		}else {
    			egovRoleManageService.deleteRole(roleManage);
    			resultMsg = "success.common.delete";
    		}
    	
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
		}
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	return "forward:/admin/role/EgovRoleList.do";

	} 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**
	 * 롤 등록화면 이동
	 * @param authorManageVO AuthorManageVO
	 * @return String
	 * @exception Exception
	 */     
    @RequestMapping("/admin/role/EgovRoleInsertView.do")
    public String insertRoleView(@ModelAttribute("authorManageVO") AuthorManageVO authorManageVO, 
    		                      ModelMap model) throws Exception {
    	

    	//이거 어디다 쓸까?
        model.addAttribute("authorManageList", egovAuthorManageService.selectAuthorList(authorManageVO));
        
        CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5003");  //롤유형코드
        
        model.addAttribute("cmmCodeDetailList", egovCodeManageService.selectCodeDetail(codeManageVO));
        model.addAttribute("menu", "role");
        
        return "usolver/admin/role/EgovRoleUpdate";
    }
        
	/**
	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록
	 * @param roleManage RoleManage
	 * @param roleManageVO RoleManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleInsert.do")
	public String insertRole(@ModelAttribute("roleManage") RoleManage roleManage,
			                 @ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
			                  BindingResult bindingResult,
			                  SessionStatus status, 
                              ModelMap model) throws Exception {
    	
    	//beanValidator.validate(roleManage, bindingResult); //validation 수행

    	if (bindingResult.hasErrors()) { 
			return "usolver/admin/role/EgovRoleInsert";
		} else {
    	    String roleTyp = roleManage.getRoleTyp();
	    	if(roleTyp.equals("method")) 
	    		roleTyp = "MTD";
	    	else if(roleTyp.equals("pointcut"))
	    		roleTyp = "PCT";
	    	else roleTyp = "WEB";

	    	roleManage.setRoleCode(roleTyp.concat("-").concat(egovRoleIdGnrService.getNextStringId()));
	    	roleManageVO.setRoleCode(roleManage.getRoleCode());
	    	
	    	status.setComplete();	        
	        CodeManageVO codeManageVO = new CodeManageVO();
	        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
	        codeManageVO.setG2DomainId("5003");  //롤유형코드
	        
	        model.addAttribute("cmmCodeDetailList", egovCodeManageService.selectCodeDetail(codeManageVO));
	        
	    	model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.insert"));
	        model.addAttribute("roleManage", egovRoleManageService.insertRole(roleManage));
	        model.addAttribute("menu", "role");
	        
	        return "usolver/admin/role/EgovRoleUpdate";
		}
	}

	/**
	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 수정
	 * @param roleManage RoleManage
	 * @param bindingResult BindingResult
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleUpdate.do")
	public String updateRole(@ModelAttribute("roleManage") RoleManage roleManage,
			BindingResult bindingResult,
			SessionStatus status, 
            ModelMap model) throws Exception {
    	
    	
    	//beanValidator.validate(roleManage, bindingResult); //validation 수행
    	if (bindingResult.hasErrors()) { 
			return "usolver/admin/role/EgovRoleUpdate";
		} else {
    	egovRoleManageService.updateRole(roleManage);
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.update"));
    	return "forward:/admin/role/EgovRole.do";
		}
	}
	
	/**
	 * 불필요한 롤정보를 화면에 조회하여 데이터베이스에서 삭제
	 * @param roleManage RoleManage
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleDelete.do")
	public String deleteRole(@ModelAttribute("roleManage") RoleManage roleManage,
            SessionStatus status, 
            ModelMap model) throws Exception {
    	
    	egovRoleManageService.deleteRole(roleManage);
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.delete"));
    	return "forward:/admin/role/EgovRoleList.do";

	}
    
	/**
	 * 불필요한 그룹정보 목록을 화면에 조회하여 데이터베이스에서 삭제
	 * @param roleCodes String
	 * @param roleManage RoleManage
	 * @return String
	 * @exception Exception
	 */   
	@RequestMapping(value="/admin/role/EgovRoleListDelete.do")
	public String deleteRoleList(@RequestParam("roleCodes") String roleCodes,
			                     @ModelAttribute("roleManage") RoleManage roleManage, 
	                              SessionStatus status, 
	                              Model model) throws Exception {
    	String [] strRoleCodes = roleCodes.split(";");
    	for(int i=0; i<strRoleCodes.length;i++) {
    		roleManage.setRoleCode(strRoleCodes[i]);
    		egovRoleManageService.deleteRole(roleManage);
    	}
		status.setComplete();
		model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.delete"));
		return "forward:/admin/role/EgovRoleList.do";
	}
    
}