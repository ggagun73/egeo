package usolver.admin.program.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.admin.program.service.EgovProgrmManageService;
import usolver.admin.program.service.impl.ProgrmManageDAO;
import usolver.admin.program.vo.ProgrmManage;
import usolver.admin.program.vo.ProgrmManageDtlVO;
import usolver.book.util.RegisterUtil;
import usolver.book.util.RequestParse;
import usolver.com.cmm.util.EtcUtil;
import usolver.com.cmm.util.StringUtil;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cop.ems.service.EgovSndngMailRegistService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
//import usolver.com.main.vo.LoginVO;

/** 
 * 프로그램목록 관리및 변경을 처리하는 비즈니스 구현 클래스
 * @author 개발환경 개발팀 이용
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.20  이  용          최초 생성
 *   2011.08.22  서준식          selectProgrmChangRequstProcess() 메서드 처리일자 trim 처리
 *   2011.8.26	정진오			IncludedInfo annotation 추가 
 * </pre>
 */

@Controller
public class EgovProgrmManageController {

	protected Log log = LogFactory.getLog(this.getClass());

	/** Validator */
	//@Autowired
	//private DefaultBeanValidator beanValidator;
	
	/** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
	
    /** EgovProgrmManageService */
	@Resource(name = "progrmManageService")
    private EgovProgrmManageService progrmManageService;
		
	/** EgovMessageSource */
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
	
    /** EgovSndngMailRegistService */
	@Resource(name = "sndngMailRegistService")
    private EgovSndngMailRegistService sndngMailRegistService;
		
    /**
     * 프로그램목록 리스트조회한다. 
     * @param searchVO ProgrmManageVO
     * @return 출력페이지정보 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramList.do")
    public String selectProgrmManageList(@ModelAttribute("progrmVO") ProgrmManage progrmVO, 	ModelMap model) throws Exception { 
        
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/*if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
    	// 내역 조회
    	/** EgovPropertyService.sample */
    	progrmVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	progrmVO.setPageSize(propertiesService.getInt("pageSize"));

    	/** pageing */  	
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(progrmVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(progrmVO.getPageUnit());
		paginationInfo.setPageSize(progrmVO.getPageSize());

		progrmVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		progrmVO.setLastIndex(paginationInfo.getLastRecordIndex());
		progrmVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
        List programList = progrmManageService.selectProgrmList(progrmVO);
        model.addAttribute("programList", programList);

        int totCnt = progrmManageService.selectProgrmListCnt(progrmVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        
      	return "usolver/admin/program/EgovProgramList";

    }

    
    /**
     * 프로그램목록을 상세화면 호출 및 상세조회한다. 
     * @param tmp_progrmNm  String
     * @return 출력페이지정보 "sym/prm/EgovProgramListDetailSelectUpdt"
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramView.do")
    public String selectProgrmManage(HttpServletRequest request, @ModelAttribute("progrmVO") ProgrmManage progrmVO, 	ModelMap model)   throws Exception {
    	
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
        	return "forward:/accessDenied.do?type=nosession";
    	}*/
    	
    	String sProgrmaFileNm = progrmVO.getProgrmFileNm();
    	String tmp_progrmNm = request.getParameter("tmp_progrmNm");
    	
    	if( tmp_progrmNm != null && !tmp_progrmNm.equals("") ){
    		progrmVO.setSearchKeyword(tmp_progrmNm);
    		progrmVO.setProgrmFileNm(tmp_progrmNm);
    	}else if( sProgrmaFileNm != null && !sProgrmaFileNm.equals("") ){
    		progrmVO.setSearchKeyword(sProgrmaFileNm);
    	}	
	        	
	    if( progrmVO.getSearchKeyword() != null && !progrmVO.getSearchKeyword().equals("") ){
	        model.addAttribute("progrmView", progrmManageService.selectProgrm(progrmVO));
	        model.addAttribute("programMenuList", progrmManageService.selectRelatiionMenuList(progrmVO));	        
    	}
    	
        return "usolver/admin/program/EgovProgramView";
    }
    
    /**
     * 프로그램목록을 등록화면으로 이동 및 등록 한다. 
     * @param progrmManageVO ProgrmManageVO 
     * @param commandMap     Map     
     * @return 출력페이지정보 등록화면 호출시 "sym/prm/EgovProgramListRegist",
     *         출력페이지정보 등록처리시 "forward:/admin/program/EgovProgramListManageSelect.do" 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramWriteProc.do")
    public String insertProgrmManage(HttpServletRequest request, @ModelAttribute("progrmVO") ProgrmManage progrmVO, SessionStatus status, ModelMap model)  throws Exception { 
    	
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}
*/		
    	
    	String resultMsg = "info.nodata.msg";
    	String action_flag = request.getParameter("action_flag");
    	try{
    		
    		if(action_flag.equals("INSERT")){ 
    			    		    	
    			progrmManageService.insertProgrm(progrmVO);
    	    	resultMsg = "success.common.insert";
    	    	
    		} else {
    	   
    			progrmManageService.updateProgrm(progrmVO);
    			resultMsg = "success.common.update";
    		}	
    		
    	} catch(Exception e) {
    		resultMsg = "fail.common.sql";
		}
    	
    	status.setComplete();        
        model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));   	
    	return "forward:/admin/program/EgovProgramView.do";
    	    	
    }    
    
    
    /**
     * 프로그램목록 멀티 삭제한다. 
     * @param checkedProgrmFileNmForDel String
     * @return 출력페이지정보 "forward:/admin/program/EgovProgramListManageSelect.do"
     * @exception Exception
     */
    @RequestMapping("/admin/program/EgovProgramDeleteProc.do")
    public String deleteProgrmManage(HttpServletRequest request, 
            @ModelAttribute("progrmVO") ProgrmManage progrmVO, 
            SessionStatus status,
            ModelMap model) throws Exception {
    	    	
    	String resultMsg = "info.nodata.msg";    	    	
    	String programList = request.getParameter("checkList");
    	try{
    		
    		if( programList != null && !programList.equals("") ){
	    		
    			String [] delProgrmFileNm = programList.split(";");
    			for (int i=0; i<delProgrmFileNm.length ; i++){
    				progrmVO.setProgrmFileNm(delProgrmFileNm[i]);  				
    				progrmManageService.deleteProgrm(progrmVO);
    			}
    			
    			resultMsg = "success.common.delete";
    			
    		}else {
    			progrmManageService.deleteProgrm(progrmVO);
    			resultMsg = "success.common.delete";
    		}
    	
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
		}
    	status.setComplete();
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	return "forward:/admin/program/EgovProgramList.do";
  } 
    
 
    /**
     * 프로그램파일명 중복체크   : 프로그램파일등록/수정에서 수행할때 사용.. 
     * @param dbscode, jbscode
     * @return jbscode, sbscode
     * @exception
     */
    @RequestMapping(value="/admin/program/EgovProgramOverLapCheck.do")
    public @ResponseBody String overLapCheckProgrmManage(
    		 @ModelAttribute ProgrmManage progrmVO, ModelMap model, HttpServletRequest request, HttpSession session)
    		 throws Exception {    	

    	
    	String resultMsg = "info.nodata.msg"; 
    	
    	progrmVO.setSearchKeyword((String)request.getParameter("FILENM"));

    	
    	System.out.println( "############################## progrmVO " +progrmVO);
    	
 	    int result = progrmManageService.selectProgrmNMTotCnt(progrmVO);
 	   
 	    if( result > 0 ){
 	    	resultMsg = "ERROR";
 	    }else {
 	    	resultMsg = "SUCCESS";
 	    }
 	    
    	return resultMsg;
    } 
    
    
    
   
    
    
    
    

    /**
     * 프로그램변경요청목록 조회한다. 
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/prm/EgovProgramChangeRequst" 
     * @exception Exception
     */
    @IncludedInfo(name="프로그램변경요청관리",order = 1112 ,gid = 60)
    @RequestMapping(value="/admin/program/EgovProgramChangeRequstSelect.do")
    public String selectProgrmChangeRequstList(
    		@ModelAttribute("searchVO") ProgrmManage searchVO, 
    		ModelMap model)
            throws Exception { 
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
/*    	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
    	// 내역 조회
    	/** EgovPropertyService.sample */
    	searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	searchVO.setPageSize(propertiesService.getInt("pageSize"));

    	/** pageing */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());
		
		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
    	
        List list_changerequst = progrmManageService.selectProgrmChangeRequstList(searchVO);
        model.addAttribute("list_changerequst", list_changerequst);

        int totCnt = progrmManageService.selectProgrmChangeRequstListTotCnt(searchVO);
 		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
         
         return "usolver/admin/program/EgovProgramChangeRequst";
    }

    /**
     * 프로그램변경요청목록을 상세조회한다. 
     * @param progrmManageDtlVO ProgrmManageDtlVO
     * @return 출력페이지정보 "sym/prm/EgovProgramChangRequstDetailSelectUpdt" 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramChangRequstDetailSelect.do")
    public String selectProgrmChangeRequst(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO,
    		ModelMap model)
            throws Exception {
         // 0. Spring Security 사용자권한 처리
    	 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
/*    	 if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	 }*/
         if(progrmManageDtlVO.getProgrmFileNm()== null||progrmManageDtlVO.getProgrmFileNm().equals("")){
	    	 String FileNm = progrmManageDtlVO.getTmpProgrmNm();    	
	         progrmManageDtlVO.setProgrmFileNm(FileNm);
	         int tmpNo = progrmManageDtlVO.getTmpRqesterNo();    	
	         progrmManageDtlVO.setRqesterNo(tmpNo);
         }
         ProgrmManageDtlVO resultVO = progrmManageService.selectProgrmChangeRequst(progrmManageDtlVO);
         model.addAttribute("progrmManageDtlVO", resultVO);
         return "usolver/admin/program/EgovProgramChangRequstDetailSelectUpdt";
    }
    
    /**
     * 프로그램변경요청 화면을 호출및 프로그램변경요청을 등록한다. 
     * @param progrmManageDtlVO ProgrmManageDtlVO
     * @param commandMap        Map
     * @return 출력페이지정보 등록화면 호출시 "sym/prm/EgovProgramChangRequstStre",
     *         출력페이지정보 등록처리시 "forward:/admin/program/EgovProgramChangeRequstSelect.do" 
     * @exception Exception
     */
    /*프로그램변경요청등록*/
    @RequestMapping(value="/admin/program/EgovProgramChangRequstStre.do")
    public String insertProgrmChangeRequst(
        	Map commandMap, 
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO, 
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception { 
    	String resultMsg = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
 /*   	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
       	    return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
		//로그인 객체 선언
	/*	LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();*/
        String sLocationUrl = null;
        String sCmd = commandMap.get("cmd") == null ? "" : (String)commandMap.get("cmd");	
        if(sCmd.equals("insert")){
    		//beanValidator 처리
	       // beanValidator.validate(progrmManageDtlVO, bindingResult);
			if (bindingResult.hasErrors()){
				sLocationUrl = "usolver/admin/program/EgovProgramChangRequstStre";
				return sLocationUrl;
			}
			if(progrmManageDtlVO.getChangerqesterCn()==null || progrmManageDtlVO.getChangerqesterCn().equals("")){progrmManageDtlVO.setChangerqesterCn("");}
			if(progrmManageDtlVO.getRqesterProcessCn()==null || progrmManageDtlVO.getRqesterProcessCn().equals("")){progrmManageDtlVO.setRqesterProcessCn("");}
			progrmManageService.insertProgrmChangeRequst(progrmManageDtlVO);
	    	resultMsg = egovMessageSource.getMessage("success.common.insert");
	        sLocationUrl = "forward:/admin/program/EgovProgramChangeRequstSelect.do";
        }else{    	
	        /* MAX요청번호 조회 */
	    	ProgrmManageDtlVO tmp_vo = progrmManageService.selectProgrmChangeRequstNo(progrmManageDtlVO);			
			int _tmp_no = tmp_vo.getRqesterNo();
			progrmManageDtlVO.setRqesterNo(_tmp_no);
			//progrmManageDtlVO.setRqesterPersonId(user.getUSER_ID());
            sLocationUrl = "usolver/admin/program/EgovProgramChangRequstStre";
        }
    	model.addAttribute("resultMsg", resultMsg);
		return sLocationUrl; 
    }

    /**
     * 프로그램변경 요청을 수정 한다. 
     * @param progrmManageDtlVO  ProgrmManageDtlVO
     * @return 출력페이지정보 "forward:/admin/program/EgovProgramChangeRequstSelect.do" 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramChangRequstDetailSelectUpdt.do")
    public String updateProgrmChangeRequst(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO, 
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception { 
        String sLocationUrl = null;
    	String resultMsg = "";
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
   /* 	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
		//로그인 객체 선언
		//LoginVO loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		//beanValidator 처리
        //beanValidator.validate(progrmManageDtlVO, bindingResult);
		if (bindingResult.hasErrors()){
			sLocationUrl = "forward:/admin/program/EgovProgramChangRequstDetailSelect.do";
			return sLocationUrl;
		}

    /*	if(progrmManageDtlVO.getRqesterPersonId().equals(loginVO.getUSER_ID())){
			if(progrmManageDtlVO.getChangerqesterCn()==null || progrmManageDtlVO.getChangerqesterCn().equals("")){progrmManageDtlVO.setChangerqesterCn(" ");}
			if(progrmManageDtlVO.getRqesterProcessCn()==null || progrmManageDtlVO.getRqesterProcessCn().equals("")){progrmManageDtlVO.setRqesterProcessCn(" ");}
	        progrmManageService.updateProgrmChangeRequst(progrmManageDtlVO);
    		resultMsg = egovMessageSource.getMessage("success.common.update");
	        sLocationUrl = "forward:/admin/program/EgovProgramChangeRequstSelect.do";
    	}else{
    		resultMsg = "수정이 실패하였습니다. 변경요청 수정은 변경요청자만 수정가능합니다.";
            progrmManageDtlVO.setTmpProgrmNm(progrmManageDtlVO.getProgrmFileNm());    	
            progrmManageDtlVO.setTmpRqesterNo(progrmManageDtlVO.getRqesterNo());    	
			sLocationUrl = "forward:/admin/program/EgovProgramChangRequstDetailSelect.do";
    	}*/
    	model.addAttribute("resultMsg", resultMsg);
		return sLocationUrl; 
    }    

    /**
     * 프로그램변경 요청을 삭제 한다. 
     * @param progrmManageDtlVO  ProgrmManageDtlVO
     * @return 출력페이지정보 "forward:/admin/program/EgovProgramChangeRequstSelect.do" 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramChangRequstDelete.do")
    public String deleteProgrmChangeRequst(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO, 
    		ModelMap model)
            throws Exception {
        String sLocationUrl = null;
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
		//로그인 객체 선언
		//LoginVO loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
    	/*if(progrmManageDtlVO.getRqesterPersonId().equals(loginVO.getUSER_ID())){
    	//progrmManageDtlVO.setRqesterPersonId(user.getId());
    		model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.delete"));
	        progrmManageService.deleteProgrmChangeRequst(progrmManageDtlVO);
	        sLocationUrl = "forward:/admin/program/EgovProgramChangeRequstSelect.do";
    	}else{
    		model.addAttribute("resultMsg", "삭제에 실패하였습니다. 변경요청자만 삭제가능합니다.");
			sLocationUrl = "forward:/admin/program/EgovProgramChangRequstDetailSelect.do";
    	}*/
        return sLocationUrl; 
    } 

    /**
     * 프로그램변경 요청에 대한 처리 사항을 조회한다. 
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/prm/EgovProgramChangeRequstProcess" 
     * @exception Exception
     */
    @IncludedInfo(name="프로그램변경요청처리",order = 1113 ,gid = 60)
    @RequestMapping(value="/admin/program/EgovProgramChangeRequstProcessListSelect.do")
    public String selectProgrmChangeRequstProcessList(
    		@ModelAttribute("searchVO") ProgrmManage searchVO, 
    		ModelMap model)
            throws Exception { 
         // 0. Spring Security 사용자권한 처리
    	 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	 if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	 }*/
     	 // 내역 조회
     	 /** EgovPropertyService.sample */
     	 searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
     	 searchVO.setPageSize(propertiesService.getInt("pageSize"));

     	 /** pageing */
     	 PaginationInfo paginationInfo = new PaginationInfo();
 		 paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
 		 paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
 		 paginationInfo.setPageSize(searchVO.getPageSize());
 		
 		 searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
 		 searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
 		 searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
     	
         List list_changerequst = progrmManageService.selectChangeRequstProcessList(searchVO);
         model.addAttribute("list_changerequst", list_changerequst);

         int totCnt = progrmManageService.selectChangeRequstProcessListTotCnt(searchVO);
  		 paginationInfo.setTotalRecordCount(totCnt);
         model.addAttribute("paginationInfo", paginationInfo);
         
         return "usolver/admin/program/EgovProgramChangeRequstProcess";
    }
    
    /**
     * 프로그램변경 요청에 대한 처리 사항을 상세조회한다. 
     * @param progrmManageDtlVO ProgrmManageDtlVO
     * @return 출력페이지정보 "sym/prm/EgovProgramChangRequstProcessDetailSelectUpdt" 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramChangRequstProcessDetailSelect.do")
    public String selectProgrmChangRequstProcess(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO,
    		ModelMap model)
            throws Exception {
         // 0. Spring Security 사용자권한 처리
    	 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
   /* 	 if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	 }*/
         if(progrmManageDtlVO.getProgrmFileNm()==null){
	    	 String _FileNm = progrmManageDtlVO.getTmpProgrmNm();    	
	         progrmManageDtlVO.setProgrmFileNm(_FileNm);
	         int _Tmp_no = progrmManageDtlVO.getTmpRqesterNo();    	
	         progrmManageDtlVO.setRqesterNo(_Tmp_no);
         }
         ProgrmManageDtlVO resultVO = progrmManageService.selectProgrmChangeRequst(progrmManageDtlVO);
         if(resultVO.getProcessDe() != null){
        	 resultVO.setProcessDe(resultVO.getProcessDe().trim());//2011.08.22
         }
         
         if(resultVO.getOpetrId()== null){
	     	/* LoginVO user = 
				(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	         resultVO.setOpetrId(user.getUSER_ID());*/
         }
         model.addAttribute("progrmManageDtlVO", resultVO);
         return "usolver/admin/program/EgovProgramChangRequstProcessDetailSelectUpdt";
    }    

    /**
     * 프로그램변경요청처리 내용을 수정 한다. 
     * @param progrmManageDtlVO ProgrmManageDtlVO 
     * @return 출력페이지정보 "forward:/admin/program/EgovProgramChangeRequstProcessListSelect.do" 
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramChangRequstProcessDetailSelectUpdt.do")
    public String updateProgrmChangRequstProcess(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO, 
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception { 
        String sLocationUrl = null;
    	boolean result = true;
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
   /* 	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
		
        //beanValidator.validate(progrmManageDtlVO, bindingResult);
		if (bindingResult.hasErrors()){
			sLocationUrl = "forward:/admin/program/EgovProgramChangRequstProcessDetailSelect.do";
			return sLocationUrl;
		}

    	//LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
    	/*if(progrmManageDtlVO.getOpetrId().equals(user.getUSER_ID())){
			if(progrmManageDtlVO.getChangerqesterCn()==null || progrmManageDtlVO.getChangerqesterCn().equals("")){progrmManageDtlVO.setChangerqesterCn(" ");}
			if(progrmManageDtlVO.getRqesterProcessCn()==null || progrmManageDtlVO.getRqesterProcessCn().equals("")){progrmManageDtlVO.setRqesterProcessCn(" ");}
	        progrmManageService.updateProgrmChangeRequstProcess(progrmManageDtlVO);
	        model.addAttribute("resultMsg", egovMessageSource.getMessage("success.common.update"));
	        
	        ProgrmManageDtlVO vo = new ProgrmManageDtlVO();
	        vo = progrmManageService.selectRqesterEmail(progrmManageDtlVO);
	        String sTemp = null;
	        if(progrmManageDtlVO.getProcessSttus().equals("A")){
	        	sTemp = "신청중";
	        }else if(progrmManageDtlVO.getProcessSttus().equals("P")){
	        	sTemp = "진행중";	
	        }else if(progrmManageDtlVO.getProcessSttus().equals("R")){
	        	sTemp = "반려";
	        }else if(progrmManageDtlVO.getProcessSttus().equals("C")){
	        	sTemp = "처리완료";
	        }
	    	// 프로그램 변경요청 사항을 이메일로  발송한다.(메일연동솔루션 활용)
	    	SndngMailVO sndngMailVO = new SndngMailVO();
	    	sndngMailVO.setDsptchPerson(user.getUSER_ID());
	    	sndngMailVO.setRecptnPerson(vo.getTmpEmail());
	    	sndngMailVO.setSj("프로그램변경요청  처리.");
	    	sndngMailVO.setEmailCn("프로그램 변경요청 사항이  "+sTemp+"(으)로 처리 되었습니다.");
	    	sndngMailVO.setAtchFileId(null); 
	    	result = sndngMailRegistService.insertSndngMail(sndngMailVO); 
	        sLocationUrl = "forward:/admin/program/EgovProgramChangeRequstProcessListSelect.do";
    	}else{
    		model.addAttribute("resultMsg", "수정이 실패하였습니다. 변경요청처리 수정은 변경처리해당 담당자만 처리가능합니다.");
            progrmManageDtlVO.setTmpProgrmNm(progrmManageDtlVO.getProgrmFileNm());    	
            progrmManageDtlVO.setTmpRqesterNo(progrmManageDtlVO.getRqesterNo());   
			sLocationUrl = "forward:/admin/program/EgovProgramChangRequstProcessDetailSelect.do";
    	}*/
		return sLocationUrl; 
    }     

    /**
     * 프로그램변경요청처리를 삭제 한다. 
     * @param progrmManageDtlVO  ProgrmManageDtlVO
     * @return 출력페이지정보 "forward:/admin/program/EgovProgramChangeRequstProcessListSelect.do" 
     * @exception Exception
     */
    /*프로그램변경요청처리 삭제*/
    @RequestMapping(value="/admin/program/EgovProgramChangRequstProcessDelete.do")
    public String deleteProgrmChangRequstProcess(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO, 
    		ModelMap model)
            throws Exception {
         // 0. Spring Security 사용자권한 처리
    	 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/* if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	 }*/
         progrmManageService.deleteProgrmChangeRequst(progrmManageDtlVO);

         return "forward:/admin/program/EgovProgramChangeRequstProcessListSelect.do";
    }
    
    /**
     * 프로그램변경이력리스트를 조회한다. 
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/prm/EgovProgramChgHst"
     * @exception Exception
     */
    @IncludedInfo(name="프로그램변경이력",order = 1114 ,gid = 60)
    @RequestMapping(value="/admin/program/EgovProgramChgHstListSelect.do")
    public String selectProgrmChgHstList(
    		@ModelAttribute("searchVO") ProgrmManage searchVO, 
    		ModelMap model)
            throws Exception { 
         // 0. Spring Security 사용자권한 처리
    	 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	 if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	 }*/
     	 // 내역 조회
     	 /** EgovPropertyService.sample */
     	 searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
     	 searchVO.setPageSize(propertiesService.getInt("pageSize"));

     	 /** pageing */
     	 PaginationInfo paginationInfo = new PaginationInfo();
 		 paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
 		 paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
 		 paginationInfo.setPageSize(searchVO.getPageSize());
 		
 		 searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
 		 searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
 		 searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
     	
         List list_changerequst = progrmManageService.selectProgrmChangeRequstList(searchVO);
         model.addAttribute("list_changerequst", list_changerequst);

         int totCnt = progrmManageService.selectProgrmChangeRequstListTotCnt(searchVO);
  		 paginationInfo.setTotalRecordCount(totCnt);
         model.addAttribute("paginationInfo", paginationInfo);
         
         return "usolver/admin/program/EgovProgramChgHst";
    } 

    /*프로그램변경이력상세조회*/ 
    /**
     * 프로그램변경이력을 상세조회한다. 
     * @param progrmManageDtlVO ProgrmManageDtlVO
     * @return 출력페이지정보 "sym/prm/EgovProgramChgHstDetail"
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramChgHstListDetailSelect.do")
    public String selectProgramChgHstListDetail(
    		@ModelAttribute("progrmManageDtlVO") ProgrmManageDtlVO progrmManageDtlVO,
    		ModelMap model)
            throws Exception {
         // 0. Spring Security 사용자권한 처리
    	 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
 /*   	 if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	 }*/
         String _FileNm = progrmManageDtlVO.getTmpProgrmNm();    	
         progrmManageDtlVO.setProgrmFileNm(_FileNm);
         int _tmp_no = progrmManageDtlVO.getTmpRqesterNo();    	
         progrmManageDtlVO.setRqesterNo(_tmp_no);

         ProgrmManageDtlVO resultVO = progrmManageService.selectProgrmChangeRequst(progrmManageDtlVO);
         model.addAttribute("resultVO", resultVO);
         return "usolver/admin/program/EgovProgramChgHstDetail";
    }

    /**
     * 프로그램파일명을 조회한다. 
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/prm/EgovFileNmSearch"
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramListSearch.do")
    public String selectProgrmListSearch(
    		@ModelAttribute("searchVO") ProgrmManage searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response )
            throws Exception { 
        // 0. Spring Security 사용자권한 처리
    	/*	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	return "egovframework/com/uat/uia/EgovLoginUsr";
    	}*/
    	// 내역 조회
    	searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	searchVO.setPageSize(propertiesService.getInt("pageSize"));


    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
        List list_progrmmanage = progrmManageService.selectProgrmList(searchVO);
        model.addAttribute("list_progrmmanage", list_progrmmanage);

        int totCnt = progrmManageService.selectProgrmListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        
        return "usolver/admin/program/EgovFileNmSearch";
    
    }
    
    /**
     * 프로그램파일명을 조회한다. 
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/prm/EgovFileNmSearch"
     * @exception Exception
     */
    @RequestMapping(value="/admin/program/EgovProgramListSearchXml.do")
    public void selectProgrmListSearchXml(
    		@ModelAttribute("searchVO") ProgrmManage searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response )
            throws Exception { 
    	
    	
    	searchVO.setPageUnit(100);
    	searchVO.setPageSize(100);

    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
    	
   		// 페이징 처리
   		int page = StringUtil.parseInt(request.getParameter("page"));
   		int rows = StringUtil.parseInt( request.getParameter("rows"));
   		int firstIndex = rows * page - rows;
   		
		searchVO.setFirstIndex(firstIndex);
		searchVO.setLastIndex(firstIndex+rows);
		
   		// 목록 요청
   		List xmlData = null;
        int total_count = 0;     
                           
        System.out.println(" #####################################   parameterObject =>"+searchVO);
       	xmlData = progrmManageService.selectProgrmList(searchVO);
        total_count = progrmManageService.selectProgrmListTotCnt(searchVO);

   		int total_page = 0;
   		if( total_count>0 )
   			total_page = (int) Math.ceil( (float)total_count/(float)rows );


   		//목록 생성
   		StringBuffer xmlSb = new StringBuffer();
   		Map mapDBXmlSb = new HashMap();
   		mapDBXmlSb.put("page", page);
   		mapDBXmlSb.put("total_page", total_page);
   		mapDBXmlSb.put("total_count", total_count);

   		xmlSb=RegisterUtil.selectDBXmlSbList(xmlData,mapDBXmlSb);

   		//System.out.println(" #####################################   xmlSb =>"+xmlSb);

   		response.setContentType("application/xml");
   		response.setCharacterEncoding("utf-8");
   		response.setHeader("Cache-Control", "no-cache");
   		response.getWriter().print(xmlSb.toString() );
    }
}