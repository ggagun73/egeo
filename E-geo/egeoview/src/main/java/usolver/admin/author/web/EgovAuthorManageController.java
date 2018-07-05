package usolver.admin.author.web;

import java.util.List;

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
import usolver.admin.author.service.EgovAuthorRoleManageService;
import usolver.admin.author.vo.AuthorManage;
import usolver.admin.author.vo.AuthorRoleManageVO;
import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.SessionVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 권한관리에 관한 controller 클래스를 정의한다.
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
 *   2011.8.26	정진오			IncludedInfo annotation 추가s
 *
 * </pre>
 */
 

@Controller
@SessionAttributes(types=SessionVO.class)
public class EgovAuthorManageController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;   
    
    
    @Resource(name = "egovAuthorManageService")
    private EgovAuthorManageService egovAuthorManageService;
    
    
    @Resource(name = "egovAuthorRoleManageService")
    private EgovAuthorRoleManageService egovAuthorRoleManageService;
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    //@Autowired
	//private DefaultBeanValidator beanValidator;
    
    
    /**
	 * 권한 목록을 조회한다
	 * @param authorManageVO AuthorManageVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/author/EgovAuthorList.do")
    public String selectAuthorList(@ModelAttribute("authorManage") AuthorManage authorManage, 
    		                        ModelMap model)
            throws Exception {
    	
    	/** EgovPropertyService.sample */
    	authorManage.setPageUnit(propertiesService.getInt("pageUnit"));
    	authorManage.setPageSize(propertiesService.getInt("pageSize"));
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(authorManage.getPageIndex());
		paginationInfo.setRecordCountPerPage(authorManage.getPageUnit());
		paginationInfo.setPageSize(authorManage.getPageSize());
		
		authorManage.setFirstIndex(paginationInfo.getFirstRecordIndex());
		authorManage.setLastIndex(paginationInfo.getLastRecordIndex());
		authorManage.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		//권한 정보를 가져온다. 
		List authorList = egovAuthorManageService.selectAuthorList(authorManage);
        model.addAttribute("authorList", authorList);
        
        int totCnt = egovAuthorManageService.selectAuthorCnt(authorManage);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        
        CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5004");  //시스템 코드 
	    model.addAttribute("sys_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));		  
       
        model.addAttribute("menu", "author");
        return "usolver/admin/author/EgovAuthorList";
    } 
    
    /**
	 * 권한 세부정보를 조회한다.
	 * @param authorCode String
	 * @param authorManageVO AuthorManageVO
	 * @return String
	 * @exception Exception
	 */   
    @RequestMapping(value="/admin/author/EgovAuthorView.do")
    public String selectAuthor(@ModelAttribute("authorManage") AuthorManage authorManage, 
    		                    ModelMap model) throws Exception {
    	
    	//권한code가 선택된 경우 권한 정보를 조회한다. 
    	if( authorManage.getAuthorCode() != null && !authorManage.getAuthorCode().equals("")){
    		
    		model.addAttribute("authorView", egovAuthorManageService.selectAuthor(authorManage));
    	}
    	
    	AuthorRoleManageVO  authorRoleManageVO = new AuthorRoleManageVO();
    	authorRoleManageVO.setAuthorCode(authorManage.getAuthorCode());
    	authorRoleManageVO.setSearchKeyword(authorManage.getAuthorCode());
    	authorRoleManageVO.setFirstIndex(0);
    	authorRoleManageVO.setRecordCountPerPage(100);
    	//해당 권한에 따른 롤 정보를 조회한다. 또는 권한 등록시 롤 등록을 해볼까?     	
        model.addAttribute("authorRoleList", egovAuthorRoleManageService.selectAuthorRoleList(authorRoleManageVO));
        
        
        CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5004");  //시스템 코드 
	    model.addAttribute("sys_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO));		  
	    
	    
    	model.addAttribute("menu", "author");    	
    	return "usolver/admin/author/EgovAuthorView";
    }     

    
    /**
	 * 권한 세부정보를 등록한다.
	 * @param authorManage AuthorManage
	 * @param bindingResult BindingResult
	 * @return String
	 * @exception Exception
	 */ 
    @RequestMapping(value="/admin/author/EgovAuthorWriteProc.do")
    public String egovAutorWriteProc(@ModelAttribute("authorManage") AuthorManage authorManage, 
    							HttpServletRequest request,
    							SessionStatus status, 
    		                    ModelMap model) throws Exception {
    	
    	
    	String resultMsg = "info.nodata.msg";
    	String action_flag = request.getParameter("action_flag");
    	try{
    		
    		if(action_flag.equals("INSERT")){ 
    			    		    	
    	    	egovAuthorManageService.insertAuthor(authorManage);
    	    	resultMsg = "success.common.insert";
    	    	
    		} else {
    	   
    			egovAuthorManageService.updateAuthor(authorManage);
    			resultMsg = "success.common.update";
    		}	
    		
    	} catch(Exception e) {
    		resultMsg = "fail.common.sql";
		}
    	
    	status.setComplete();        
        model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));   	
    	return "forward:/admin/author/EgovAuthorView.do";
    	
    }
    
    
    /**
	 * 권한 세부정보를 삭제한다.
	 * @param authorManage AuthorManage
	 * @return String
	 * @exception Exception
	 */  
    @RequestMapping(value="/admin/author/EgovAuthorDeleteProc.do")
    public String egovAuthorDeleteProc(@ModelAttribute("authorManage") AuthorManage authorManage, 
    							HttpServletRequest request,
    							SessionStatus status,
    		                    Model model) throws Exception {
    	
    	String resultMsg = "info.nodata.msg";    	    	
    	String authorCodes = request.getParameter("checkList");
    	try{
    		
    		if( authorCodes != null && !authorCodes.equals("") ){
	    		String [] strAuthorCodes = authorCodes.split(";");    	
	    		if( strAuthorCodes.length > 0 ){
		    		for(int i=0; i<strAuthorCodes.length;i++) {
		    			authorManage.setAuthorCode(strAuthorCodes[i]);
		        		egovAuthorManageService.deleteAuthor(authorManage);		        		
		        	}
		    		
		    		resultMsg = "success.common.delete";
	    		}
    		}else {
    			egovAuthorManageService.deleteAuthor(authorManage);
    			resultMsg = "success.common.delete";
    		}
    	
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
		}
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	return "forward:/admin/author/EgovAuthorList.do";
    	
    }   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**
	 * 권한 목록화면 이동
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping("/admin/author/EgovAuthorListView.do")
    public String selectAuthorListView()
            throws Exception {
        return "usolver/admin/author/EgovAuthorManage";
    }    
    
    /**
	 * 권한 등록화면 이동
	 * @return String
	 * @exception Exception
	 */     
    @RequestMapping("/admin/author/EgovAuthorInsertView.do")
    public String insertAuthorView()
            throws Exception {
        return "usolver/admin/author/EgovAuthorInsert";
    }
    
    
    
    /**
	 * 권한 세부정보를 수정한다.
	 * @param authorManage AuthorManage
	 * @param bindingResult BindingResult
	 * @return String
	 * @exception Exception
	 */   
    @RequestMapping(value="/admin/author/EgovAuthorUpdate.do")
    public String updateAuthor(@ModelAttribute("authorManage") AuthorManage authorManage, 
    		                    BindingResult bindingResult,
    		                    SessionStatus status, 
    		                    Model model) throws Exception {

    	//beanValidator.validate(authorManage, bindingResult); //validation 수행
    	
		if (bindingResult.hasErrors()) {
			return "usolver/admin/author/EgovAuthorUpdate";
		} else {
	    	egovAuthorManageService.updateAuthor(authorManage);
	        status.setComplete();
	        model.addAttribute("message", egovMessageSource.getMessage("success.common.update"));
	        return "forward:/admin/author/EgovAuthor.do";
		}
    }    

    
    /**
	 * 권한목록을 삭제한다.
	 * @param authorCodes String
	 * @param authorManage AuthorManage
	 * @return String
	 * @exception Exception
	 */  
    @RequestMapping(value="/admin/author/EgovAuthorListDelete.do")
    public String deleteAuthorList(@RequestParam("authorCodes") String authorCodes,
    		                       @ModelAttribute("authorManage") AuthorManage authorManage, 
    		                        SessionStatus status,
    		                        Model model) throws Exception {

    	String [] strAuthorCodes = authorCodes.split(";");
    	for(int i=0; i<strAuthorCodes.length;i++) {
    		authorManage.setAuthorCode(strAuthorCodes[i]);
    		egovAuthorManageService.deleteAuthor(authorManage);
    	}
    	status.setComplete();
    	model.addAttribute("message", egovMessageSource.getMessage("success.common.delete"));
        return "forward:/admin/author/EgovAuthorList.do";
    }    
    
    /**
	 * 권한제한 화면 이동
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping("/admin/author/accessDenied.do")
    public String accessDenied()
            throws Exception {
        return "egovframework/sec/accessDenied";
    } 
}
