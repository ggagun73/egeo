package usolver.admin.role.web;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import usolver.admin.author.service.EgovAuthorManageService;
import usolver.admin.author.vo.AuthorManageVO;
import usolver.admin.role.service.EgovRoleHierarchyManageService;
import usolver.admin.role.vo.RoleHierarchyManage;
import usolver.admin.role.vo.RoleHierarchyManageVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.SessionVO;
import egovframework.com.utl.PageUtl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 롤 상하관계 관리에 관한 controller 클래스를 정의한다.
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
public class EgovRoleHierarchyController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "egovRoleHierarchyManageService")
    private EgovRoleHierarchyManageService egovRoleHierarchyManageService;
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
	/**
	 * 등록된 롤 상하관계 정보 목록 조회
	 * @param roleHierarchyManageVO RoleHierarchyManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/role/EgovRoleHierarchyList.do")
	public String selectRoleList(@ModelAttribute("roleHierarchyManageVO") RoleHierarchyManageVO roleHierarchyManageVO,
								 @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
			                      ModelMap model) throws Exception {
    	
    	PaginationInfo paginationInfo = PageUtl.getPaginationInfo(roleHierarchyManageVO);
    	paginationInfo.setTotalRecordCount(egovRoleHierarchyManageService.selectRoleHierarchyListTotCnt(roleHierarchyManageVO));
    	    	
    	List<RoleHierarchyManageVO> roleHierachyList = egovRoleHierarchyManageService.selectRoleHierarchyList(roleHierarchyManageVO);
    	List<?> authorList = egovAuthorManageService.selectAuthorList(new AuthorManageVO());    	
    	
    	ArrayList<String> noHierarchyList = new ArrayList<String>();
    	
    	//기존 권한들을 담는다.
    	for (int i = 0; i < authorList.size(); i++) {
    		    
    		AuthorManageVO resultVO = (AuthorManageVO)authorList.get(i);    		
    		noHierarchyList.add(resultVO.getAuthorCode());
    		
		}
    	
    	for (int i = 0; i < roleHierachyList.size(); i++) {
    		RoleHierarchyManageVO roleHierarchy = roleHierachyList.get(i);
    		noHierarchyList.remove(roleHierarchy.getChildAuthor());
    		noHierarchyList.remove(roleHierarchy.getParentAuthor());
		}
    	
    	for (int i = 0; i < noHierarchyList.size(); i++) {
    		String roleHierarchy = noHierarchyList.get(i);
    		
    		for (int j = 0; j < authorList.size(); j++) {			
    			AuthorManageVO authorVO = (AuthorManageVO)authorList.get(j);
    			if(authorVO.getAuthorCode().equals(roleHierarchy))
    				authorList.remove(authorVO);
			}    		
    		
		}
    	//상하관계를 테이블로 담는다.
//    	for (Iterator<RoleHierarchyManageVO> iterator = roleHierachyList.iterator(); iterator.hasNext();) {
//			
//    		RoleHierarchyManageVO resultVO = iterator.next();
//    		
//    		
//    		hierarchyTable.put(resultVO.getParentRole(), resultVO.getChild());			
//		}
//    	
//    	Enumeration em = noHierarchyTable.keys();
//    	while(em.hasMoreElements()){
//    		String key = (String)em.nextElement();
//
//    		if(hierarchyTable.containsKey(key)){
//    			noHierarchyTable.put(key, (Integer)noHierarchyTable.get(key)+1);
//    			noHierarchyTable.put((String)hierarchyTable.get(key), (noHierarchyTable.get((String)hierarchyTable.get(key)))-1);
//    			
//    			
//    		}else{
//    			System.out.println("이거 없나요??"+key);
//    			System.out.println("이거 없나요??"+key);
//    		}
//    		
//			
//			
//		}
//    	
//    	Enumeration em2 = noHierarchyTable.keys();
//    	while(em.hasMoreElements()){
//    		String key = (String)em.nextElement();
//    		System.out.println("<"+key+">:["+noHierarchyTable.get(key)+"]");
//    	}
    	
		
    	
    	
    	model.addAttribute("authorList",authorList);  
    	model.addAttribute("noHierarchyList",noHierarchyList);    	
    	model.addAttribute("roleHierachyList", roleHierachyList);
		
        model.addAttribute("paginationInfo", paginationInfo);
        
        return "usolver/admin/role/EgovRoleHierarchyManage";
	}    

    /**
	 * 롤 상하관계 등록
	 * @param authorManage AuthorManage
	 * @param bindingResult BindingResult
	 * @return String
	 * @exception Exception
	 */ 
    @RequestMapping(value="/admin/role/EgovRoleHierarchyInsert.do")
    public String insertAuthor(@ModelAttribute("roleHierarchyManage") RoleHierarchyManage roleHierarchyManage, 
    		                    BindingResult bindingResult,
    		                    SessionStatus status, 
    		                    ModelMap model) throws Exception {
		
    	egovRoleHierarchyManageService.insertRoleHierarchyManage(roleHierarchyManage);
        status.setComplete();
        model.addAttribute("message", egovMessageSource.getMessage("success.common.insert"));
        return "redirect:/admin/role/EgovRoleHierarchyList.do";
		
    }

//	/**
//	 * 등록된 롤 정보 조회
//	 * @param roleCode String
//	 * @param roleManageVO RoleManageVO
//	 * @param authorManageVO AuthorManageVO
//	 * @return String
//	 * @exception Exception
//	 */
//    @RequestMapping(value="/admin/role/EgovRole.do")
//	public String selectRole(@RequestParam("roleCode") String roleCode,
//	                         @ModelAttribute("roleManageVO") RoleManageVO roleManageVO, 
//	                         @ModelAttribute("authorManageVO") AuthorManageVO authorManageVO,
//		                      ModelMap model) throws Exception {
//        
//    	roleManageVO.setRoleCode(roleCode);
//    	
//    	authorManageVO.setAuthorManageList(egovAuthorManageService.selectAuthorAllList(authorManageVO));
//
//    	model.addAttribute("roleManage", egovRoleManageService.selectRole(roleManageVO));
//        model.addAttribute("authorManageList", authorManageVO.getAuthorManageList());
//        model.addAttribute("cmmCodeDetailList", getCmmCodeDetailList(new ComDefaultCodeVO(),"COM029"));
//
//        return "egovframework/com/admin/role/EgovRoleUpdate";
//	}
//
//    /**
//	 * 롤 등록화면 이동
//	 * @param authorManageVO AuthorManageVO
//	 * @return String
//	 * @exception Exception
//	 */     
//    @RequestMapping("/admin/role/EgovRoleInsertView.do")
//    public String insertRoleView(@ModelAttribute("authorManageVO") AuthorManageVO authorManageVO, 
//    		                      ModelMap model) throws Exception {
//    	
//    	authorManageVO.setAuthorManageList(egovAuthorManageService.selectAuthorAllList(authorManageVO));
//        model.addAttribute("authorManageList", authorManageVO.getAuthorManageList());
//        model.addAttribute("cmmCodeDetailList", getCmmCodeDetailList(new ComDefaultCodeVO(),"COM029"));
//        
//        return "egovframework/com/admin/role/EgovRoleInsert";
//    }
//
//    /**
//	 * 공통코드 호출
//	 * @param comDefaultCodeVO ComDefaultCodeVO
//	 * @param codeId String
//	 * @return List
//	 * @exception Exception
//	 */ 
//    public List getCmmCodeDetailList(ComDefaultCodeVO comDefaultCodeVO, String codeId)  throws Exception {
//    	comDefaultCodeVO.setCodeId(codeId);
//    	return egovCmmUseService.selectCmmCodeDetail(comDefaultCodeVO);
//    }
//        
//	/**
//	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록
//	 * @param roleManage RoleManage
//	 * @param roleManageVO RoleManageVO
//	 * @return String
//	 * @exception Exception
//	 */
//    @RequestMapping(value="/admin/role/EgovRoleInsert.do")
//	public String insertRole(@ModelAttribute("roleManage") RoleManage roleManage,
//			                 @ModelAttribute("roleManageVO") RoleManageVO roleManageVO,
//			                  BindingResult bindingResult,
//			                  SessionStatus status, 
//                              ModelMap model) throws Exception {
//    	
//    	beanValidator.validate(roleManage, bindingResult); //validation 수행
//
//    	if (bindingResult.hasErrors()) { 
//			return "egovframework/com/admin/role/EgovRoleInsert";
//		} else {
//    	    String roleTyp = roleManage.getRoleTyp();
//	    	if(roleTyp.equals("method")) 
//	    		roleTyp = "mtd";
//	    	else if(roleTyp.equals("pointcut"))
//	    		roleTyp = "pct";
//	    	else roleTyp = "web";
//	    	
//	    	roleManage.setRoleCode(roleTyp.concat("-").concat(egovRoleIdGnrService.getNextStringId()));
//	    	roleManageVO.setRoleCode(roleManage.getRoleCode());
//	    	
//	    	status.setComplete();
//	        model.addAttribute("cmmCodeDetailList", getCmmCodeDetailList(new ComDefaultCodeVO(),"COM029"));
//	    	model.addAttribute("message", egovMessageSource.getMessage("success.common.insert"));
//	        model.addAttribute("roleManage", egovRoleManageService.insertRole(roleManage, roleManageVO));
//	        
//	        return "egovframework/com/admin/role/EgovRoleUpdate";
//		}
//	}
//
//	/**
//	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 수정
//	 * @param roleManage RoleManage
//	 * @param bindingResult BindingResult
//	 * @return String
//	 * @exception Exception
//	 */
//    @RequestMapping(value="/admin/role/EgovRoleUpdate.do")
//	public String updateRole(@ModelAttribute("roleManage") RoleManage roleManage,
//			BindingResult bindingResult,
//			SessionStatus status, 
//            ModelMap model) throws Exception {
//    	
//    	beanValidator.validate(roleManage, bindingResult); //validation 수행
//    	if (bindingResult.hasErrors()) { 
//			return "egovframework/com/admin/role/EgovRoleUpdate";
//		} else {
//    	egovRoleManageService.updateRole(roleManage);
//    	status.setComplete();
//    	model.addAttribute("message", egovMessageSource.getMessage("success.common.update"));
//    	return "forward:/admin/role/EgovRole.do";
//		}
//	}
//	
//	/**
//	 * 불필요한 롤정보를 화면에 조회하여 데이터베이스에서 삭제
//	 * @param roleManage RoleManage
//	 * @return String
//	 * @exception Exception
//	 */
//    @RequestMapping(value="/admin/role/EgovRoleDelete.do")
//	public String deleteRole(@ModelAttribute("roleManage") RoleManage roleManage,
//            SessionStatus status, 
//            ModelMap model) throws Exception {
//    	
//    	egovRoleManageService.deleteRole(roleManage);
//    	status.setComplete();
//    	model.addAttribute("message", egovMessageSource.getMessage("success.common.delete"));
//    	return "forward:/admin/role/EgovRoleList.do";
//
//	}
//    
//	/**
//	 * 불필요한 그룹정보 목록을 화면에 조회하여 데이터베이스에서 삭제
//	 * @param roleCodes String
//	 * @param roleManage RoleManage
//	 * @return String
//	 * @exception Exception
//	 */   
//	@RequestMapping(value="/admin/role/EgovRoleListDelete.do")
//	public String deleteRoleList(@RequestParam("roleCodes") String roleCodes,
//			                     @ModelAttribute("roleManage") RoleManage roleManage, 
//	                              SessionStatus status, 
//	                              Model model) throws Exception {
//    	String [] strRoleCodes = roleCodes.split(";");
//    	for(int i=0; i<strRoleCodes.length;i++) {
//    		roleManage.setRoleCode(strRoleCodes[i]);
//    		egovRoleManageService.deleteRole(roleManage);
//    	}
//		status.setComplete();
//		model.addAttribute("message", egovMessageSource.getMessage("success.common.delete"));
//		return "forward:/admin/role/EgovRoleList.do";
//	}
//    
}