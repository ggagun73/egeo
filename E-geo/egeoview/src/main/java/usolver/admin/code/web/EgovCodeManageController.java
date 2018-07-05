package usolver.admin.code.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
public class EgovCodeManageController {

    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

    @Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;

    /** Message ID Generation 
    @Resource(name="egovCodeManageIdGnrService")    
    private EgovIdGnrService egovCodeManageIdGnrService;
	*/
    //@Autowired
	//private DefaultBeanValidator beanValidator;
    
    /**
	 * 코드 목록화면 이동
	 * @return String
	 * @exception Exception
     */
    @RequestMapping("/admin/code/selectCodeDomain.do")
    public String selectCodeDomainList(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO,
	    ModelMap model) throws Exception {
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
    	model.addAttribute("paginationInfo", paginationInfo);        
    	    	    	
    	List domainList = egovCodeManageService.selectCodeDomainList(codeManageVO);    	
    	System.out.println("############################### domainList=>"+domainList );
    	model.addAttribute("domainList", domainList);  
    	
    	model.addAttribute("menu", "code");
        return "usolver/admin/code/EgovCodeManageList";
    }   	
		 
	/**
	 * 코드를 관리하기 위해 등록된 코드목록을 조회한다.
	 * @param bannerVO - 배너 VO
	 * @return String - 리턴 URL
	 * @throws Exception 
	 */    
    @RequestMapping(value="/admin/code/selectCodeManageList.do")
	public String selectCodeManageList(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO,
                             		    ModelMap model) throws Exception{
    	
    	/** EgovPropertyService.sample */
    	//authorManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	//authorManageVO.setPageSize(propertiesService.getInt("pageSize"));
    	
    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(codeManageVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(codeManageVO.getPageUnit());
		paginationInfo.setPageSize(codeManageVO.getPageSize());
		
		codeManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		codeManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
		codeManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		//코드 도메인 조회 
		model.addAttribute("domainList", egovCodeManageService.selectCodeDomainList(codeManageVO));        
		
		//코드 조회
		model.addAttribute("resultList", egovCodeManageService.selectCodeList(codeManageVO));        
        int totCnt = egovCodeManageService.selectCodeCnt(codeManageVO);
		paginationInfo.setTotalRecordCount(totCnt);		
        model.addAttribute("paginationInfo", paginationInfo);        
        model.addAttribute("menu", "code");
        
		return "usolver/admin/code/EgovCodeManageList";
	}



	/**
	 * 코드정보를 등록, 수정한다.
	 * @param banner - 코드 model
	 * @return String - 리턴 Url
	 */
    @RequestMapping(value="/admin/code/CodeManageProc.do")
	public String insertCodeManage(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO, 
									HttpServletRequest request, 
			                        SessionStatus status,
			                        ModelMap model) throws Exception {
    	
    	String actionFlag = request.getParameter("action_flag");    	
    	String resultMsg = "info.nodata.msg";
    	//codeManageVO.setG2Id(egovCodeManageIdGnrService.getNextStringId());    	
    	
    	System.out.println("################################ codeManageVO =>"+codeManageVO);
    	
    	try{
				if (actionFlag.equals("DOMAIN_INSERT")) { 
										
					codeManageVO.setTABLENAME(request.getParameter("DOMAINTABLE"));    	 
					codeManageVO.setG2Name(request.getParameter("g2DomainName"));    	 
								
					egovCodeManageService.insertCodeDomain(codeManageVO);
					resultMsg = "success.common.insert";
				}
				
				if (actionFlag.equals("DOMAIN_UPDATE")) { 
					
					//codeManageVO.setTABLENAME(request.getParameter("DOMAINTABLE"));    	 
					codeManageVO.setG2Name(request.getParameter("g2DomainName"));    	 
					codeManageVO.setG2Id(codeManageVO.getG2DomainId());    	 
					egovCodeManageService.updateCodeDomain(codeManageVO);
					
					resultMsg = "success.common.update";
				}
				
				if (actionFlag.equals("CODE_INSERT")) { 
					codeManageVO.setG2Code(codeManageVO.getG2NewCode());
					egovCodeManageService.insertCode(codeManageVO);
					
					resultMsg = "success.common.insert";
				}
				
				if (actionFlag.equals("CODE_UPDATE"))  {
					egovCodeManageService.updateCode(codeManageVO);
					resultMsg = "success.common.update";
				}
    	} catch(Exception e) {
    		resultMsg = "fail.common.sql";
    	}
		
		status.setComplete();	       
		model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
		
		if (actionFlag.equals("DOMAIN_INSERT")) { 
			return "forward:/admin/code/selectCodeDomain.do";
		}else {
			return "forward:/admin/code/selectCodeManageList.do";
		}
	}
    
    
	/**
	 * 기 등록된 코드정보를 삭제한다.
	 * @param banner Banner
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/code/deleteCodeManageProc.do")
	public String deleteCodeManage(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO, 
									HttpServletRequest request,                         
									SessionStatus status,
                                    Model model) throws Exception {
    	
    	String sChecked = request.getParameter("checkList");    	
    	String resultMsg = "info.nodata.msg";
    	
    	try{
	    	if( sChecked.contains(";") ){
	    		
	    		String[] sCheckList = sChecked.split(";");
	    		
	    		for(int i=0; i < sCheckList.length; i++){	    			
	    			String[] sData = sCheckList[i].split(":");
	    			codeManageVO.setG2Code(sData[1]);
	    			egovCodeManageService.deleteCode(codeManageVO);  	  	
	    		}	    		
	    		resultMsg = "success.common.delete";
	    		
	    	}else {
	    		egovCodeManageService.deleteCode(codeManageVO);	       
	    		resultMsg = "success.common.delete";
	    	}
    	
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
    	}		
    	
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
		return "forward:/admin/code/selectCodeManageList.do";
	}
    
    /**
     * 코드 중복체크   : 코드등록/수정에서 수행할때 사용.. 
     * @param dbscode, jbscode
     * @return jbscode, sbscode
     * @exception
     */
    @RequestMapping(value="/admin/code/CodeManageDCheck.do")
    public @ResponseBody String CodeManageDCheck(
    		 @ModelAttribute CodeManageVO codeManageVO, ModelMap model, HttpServletRequest request, HttpSession session)
    		 throws Exception {    	

    	
    	String resultMsg = "info.nodata.msg"; 
    	
    	codeManageVO.setCODETABLE((String)request.getParameter("CODETABLE"));
    	codeManageVO.setG2Code((String)request.getParameter("G2CODE"));
    	codeManageVO.setG2DomainId((String)request.getParameter("G2DOMAIN"));   	
    	
    	System.out.println( "############################## codeManageVO " +codeManageVO);
    	
 	    int result = egovCodeManageService.selectCodeDCheck(codeManageVO);
 	   
 	    if( result > 0 ){
 	    	resultMsg = "ERROR";
 	    }else {
 	    	resultMsg = "SUCCESS";
 	    }
 	    
    	return resultMsg;
    } 
    
    
    /**
	 * 기 등록된 도메인정보를 삭제한다.
	 * @param banner Banner
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/code/deleteDomainManageProc.do")
	public String deleteDomainManage(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO, 
									HttpServletRequest request,                         
									SessionStatus status,
                                    Model model) throws Exception {
    	
    	String resultMsg = "info.nodata.msg";
    	
    	try{
    		
    		//하위 코드가 없이 도메인 테이블 삭제시.. 
    		if( codeManageVO.getCODETABLE() != null && codeManageVO.getCODETABLE() != ""){
    			egovCodeManageService.deleteCode(codeManageVO);
    		}
    		
    		codeManageVO.setG2Name(request.getParameter("g2DomainName"));    	 
			codeManageVO.setG2Id(codeManageVO.getG2DomainId());    	 
			egovCodeManageService.deleteCodeDomain(codeManageVO);    		
    		
    		resultMsg = "success.common.delete";
    	
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
    	}		
    	
    	status.setComplete();
    	codeManageVO = new CodeManageVO();		//리턴값이 없도록 초기화 하자.. 
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
		return "forward:/admin/code/selectCodeDomain.do";
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	/**
	 * 등록된 코드의 상세정보를 조회한다.
	 * @param bannerVO - 코드 Vo
	 * @return String - 리턴 Url
	 */
    
    @RequestMapping(value="/admin/code/getCodeManage.do")
	public String selectCodeManage(@RequestParam("codeCd") String codeCd, 
			                       @ModelAttribute("codeManageVO") CodeManageVO codeManageVO,
			                        ModelMap model) throws Exception {

    	codeManageVO.setG2Code(codeCd);
    	codeManageVO.setG2DomainId(codeCd);

    	model.addAttribute("codeManage", egovCodeManageService.selectCodeDetail(codeManageVO));
    	model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.select"));
    	return "usolver/admin/code/EgovCodeManageUpdt";
	}

	/**
	 * 코드등록 화면으로 이동한다.
	 * @param banner - 코드 model
	 * @return String - 리턴 Url
	 */
    @RequestMapping(value="/admin/code/addViewCodeManage.do")
	public String insertViewCodeManage(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO,
			                            ModelMap model) throws Exception {

    	model.addAttribute("codeManage", codeManageVO);
    	return "usolver/admin/code/EgovCodeManageInsert";
	}
    
	/**
	 * 기 등록된 코드정보를 수정한다.
	 * @param banner - 코드 model
	 * @return String - 리턴 Url
	 */
    @RequestMapping(value="/admin/code/updtCodeManage.do")
	public String updateCodeManage(@ModelAttribute("codeManageVO") CodeManageVO codeManageVO, 
			                        BindingResult bindingResult,
                                    SessionStatus status,
                                    ModelMap model) throws Exception {
    	//beanValidator.validate(codeManageVO, bindingResult); //validation 수행
    	
		if (bindingResult.hasErrors()) { 
			return "usolver/admin/code/EgovCodeManageUpdt";
		} else {
			egovCodeManageService.updateCode(codeManageVO);
	        status.setComplete();
	        model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.insert"));
	        return "forward:/admin/code/getCodeManage.do";
		}
	}

	/**
	 * 기 등록된 코드정보목록을 일괄 삭제한다.
	 * @param banners String
	 * @param banner Banner
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/admin/code/removeCodeManageList.do")
	public String deleteCodeManageList(@RequestParam("codeManages") String codeManages,
			                           @ModelAttribute("codeManageVO") CodeManageVO codeManageVO, 
			                            SessionStatus status, 
			                            ModelMap model) throws Exception {
    	
    	String [] strCodeManages = codeManages.split(";");
    	for(int i=0; i<strCodeManages.length;i++) {
    		codeManageVO.setG2Code(strCodeManages[i]);
    		egovCodeManageService.deleteCode(codeManageVO);
    	}
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.delete"));
		return "forward:/admin/code/selectCodeManageList.do";
	}    

}
