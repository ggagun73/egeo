package usolver.admin.menu.web;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.admin.menu.service.EgovMenuManageService;
import usolver.admin.menu.vo.MenuManageVO;
import usolver.admin.program.service.EgovProgrmManageService;
import usolver.admin.program.vo.ProgrmManage;
import usolver.com.cmm.util.StringUtil;
import egovframework.com.cmm.ComDefaultVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 메뉴목록 관리및 메뉴생성, 사이트맵 생성을 처리하는 비즈니스 구현 클래스
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
 *	 2011.07.01	 서준식	   	메뉴정보 삭제시 참조되고 있는 하위 메뉴가 있는지 체크하는 로직 추가
 *	 2011.07.27	 서준식	   	deleteMenuManageList() 메서드에서 메뉴 멀티 삭제 버그 수정
 *	 2011.08.26	 정진오		IncludedInfo annotation 추가
 *	 2011.10.07	 이기하		보안취약점 수정(파일 업로드시 엑셀파일만 가능하도록 추가)
 * </pre>
 */

@Controller
public class EgovMenuManageController {

	protected Log log = LogFactory.getLog(this.getClass());

	/* Validator */
	//@Autowired
	//private DefaultBeanValidator beanValidator;
	/** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /** EgovMenuManageService */
	@Resource(name = "meunManageService")
    private EgovMenuManageService menuManageService;

    /** EgovMenuManageService */
	@Resource(name = "progrmManageService")
	private EgovProgrmManageService progrmManageService;

    /** EgovFileMngService */
//	@Resource(name="EgovFileMngService")
//	private EgovFileMngService fileMngService;

    /** EgovFileMngUtil */
//	@Resource(name="EgovFileMngUtil")
//	private EgovFileMngUtil fileUtil;

//	@Resource(name = "excelZipService")
//    private EgovExcelService excelZipService;

	/** EgovMessageSource */
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;


    /**
     * 메뉴정보목록을 상세화면 호출 및 상세조회한다.
     * @param req_menuNo  String
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuDetailSelectUpdt"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuManageListDetailSelect.do")
    public String selectMenuManage(
    		@RequestParam("req_menuNo") String req_menuNo ,
    		@ModelAttribute("searchVO") ComDefaultVO searchVO,
    		ModelMap model)
            throws Exception {
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/*if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
    	searchVO.setSearchKeyword(req_menuNo);

    	MenuManageVO resultVO = menuManageService.selectMenuManage(searchVO);
        model.addAttribute("menuManageVO", resultVO);
        model.addAttribute("menu", "menu");

        return "usolver/admin/menu/EgovMenuDetailSelectUpdt";
    }

    /**
     * 메뉴목록 리스트조회한다.
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuManage"
     * @exception Exception
     */
    @IncludedInfo(name="메뉴관리리스트", order = 1091 ,gid = 60)
    @RequestMapping(value="/admin/menu/EgovMenuManageSelect.do")
    public String selectMenuManageList(
    		@ModelAttribute("searchVO") ComDefaultVO searchVO,
    		ModelMap model)
            throws Exception {
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	
    	System.out.println("   >>>>>>>>>>>> isAuthenticated ="+isAuthenticated);
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
    		 return "forward:/accessDenied.do?type=nosession";
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

		List list_menumanage = menuManageService.selectMenuManageList(searchVO);
		model.addAttribute("list_menumanage", list_menumanage);

        int totCnt = menuManageService.selectMenuManageListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("menu", "menu");

      	return "usolver/admin/menu/EgovMenuManage";
    }

    /**
     * 메뉴목록 멀티 삭제한다.
     * @param checkedMenuNoForDel  String
     * @return 출력페이지정보 "forward:/admin/menu/EgovMenuManageSelect.do"
     * @exception Exception
     */
    @RequestMapping("/admin/menu/EgovMenuManageListDelete.do")
    public String deleteMenuManageList(
            @RequestParam("checkedMenuNoForDel") String checkedMenuNoForDel ,
            @ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
            ModelMap model)
            throws Exception {
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/*if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
		String sLocationUrl = null;
    	String resultMsg    = "";

		String [] delMenuNo = checkedMenuNoForDel.split(",");
		menuManageVO.setMenuNo(Integer.parseInt(delMenuNo[0]));

		if (menuManageService.selectUpperMenuNoByPk(menuManageVO) != 0){
    		resultMsg = egovMessageSource.getMessage("fail.common.delete.upperMenuExist");
    		sLocationUrl = "forward:/admin/menu/EgovMenuManageSelect.do";
		}else if (delMenuNo == null || (delMenuNo.length ==0)){
    		resultMsg = egovMessageSource.getMessage("fail.common.delete");
    		sLocationUrl = "forward:/admin/menu/EgovMenuManageSelect.do";
		}else{
			menuManageService.deleteMenuManageList(checkedMenuNoForDel);
			resultMsg = egovMessageSource.getMessage("success.common.delete");
			sLocationUrl ="forward:/admin/menu/EgovMenuManageSelect.do";
		}
		model.addAttribute("resultMsg", resultMsg);
        return sLocationUrl;
    }

    /**
     * 메뉴정보를 등록화면으로 이동 및 등록 한다.
     * @param menuManageVO    MenuManageVO
     * @param commandMap      Map
     * @return 출력페이지정보 등록화면 호출시 "sym/mnu/mpm/EgovMenuRegist",
     *         출력페이지정보 등록처리시 "forward:/admin/menu/EgovMenuManageSelect.do"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuRegistInsert.do")
    public String insertMenuManage(
    		Map commandMap,
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception {
		String sLocationUrl = null;
    	String resultMsg    = "";
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
        String sCmd = commandMap.get("cmd") == null ? "" : (String)commandMap.get("cmd");
		//if(sCmd.equals("insert")){
           // beanValidator.validate(menuManageVO, bindingResult);
    		if (bindingResult.hasErrors()){
    			sLocationUrl = "usolver/admin/menu/EgovMenuRegist";
    			return sLocationUrl;
    		}
    		if(menuManageService.selectMenuNoByPk(menuManageVO) == 0){
    			ProgrmManage searchVO = new ProgrmManage();
    			searchVO.setSearchKeyword(menuManageVO.getProgrmFileNm());
    			if(progrmManageService.selectProgrmNMTotCnt(searchVO)==0){
    	    		resultMsg = egovMessageSource.getMessage("fail.common.insert");
    		        sLocationUrl = "usolver/admin/menu/EgovMenuRegist";
    			}else{
    	        	menuManageService.insertMenuManage(menuManageVO);
            		resultMsg = egovMessageSource.getMessage("success.common.insert");
    		        sLocationUrl = "forward:/admin/menu/EgovMenuManageSelect.do";
    			}
    		}else{
        		resultMsg = egovMessageSource.getMessage("common.isExist.msg");
        		sLocationUrl = "usolver/admin/menu/EgovMenuRegist";
    		}
    		model.addAttribute("resultMsg", resultMsg);
		/*}else{
            sLocationUrl = "usolver/admin/menu/EgovMenuRegist";
        }*/
		return sLocationUrl;
    }

    /**
     * 메뉴정보를 수정 한다.
     * @param menuManageVO  MenuManageVO
     * @return 출력페이지정보 "forward:/admin/menu/EgovMenuManageSelect.do"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuDetailSelectUpdt.do")
    public String updateMenuManage(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception {
        String sLocationUrl = null;
    	String resultMsg    = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
        //beanValidator.validate(menuManageVO, bindingResult);
		if (bindingResult.hasErrors()){
			sLocationUrl = "forward:/admin/menu/EgovMenuManageListDetailSelect.do";
			return sLocationUrl;
		}
		ProgrmManage searchVO = new ProgrmManage();
		searchVO.setSearchKeyword(menuManageVO.getProgrmFileNm());
		if(progrmManageService.selectProgrmNMTotCnt(searchVO)==0){
    		resultMsg = egovMessageSource.getMessage("fail.common.update");
	        sLocationUrl = "forward:/admin/menu/EgovMenuManageListDetailSelect.do";
		}else{
			menuManageService.updateMenuManage(menuManageVO);
	    	resultMsg = egovMessageSource.getMessage("success.common.update");
	       	sLocationUrl = "forward:/admin/menu/EgovMenuManageSelect.do";
		}
    	model.addAttribute("resultMsg", resultMsg);
		return sLocationUrl;
    }

    /**
     * 메뉴정보를 삭제 한다.
     * @param menuManageVO MenuManageVO
     * @return 출력페이지정보 "forward:/admin/menu/EgovMenuManageSelect.do"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuManageDelete.do")
    public String deleteMenuManage(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		ModelMap model)
            throws Exception {
    	String resultMsg    = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
    	if (menuManageService.selectUpperMenuNoByPk(menuManageVO) != 0){
    		resultMsg = egovMessageSource.getMessage("fail.common.delete.upperMenuExist");
    		model.addAttribute("resultMsg", resultMsg);
    		return "forward:/admin/menu/EgovMenuManageSelect.do";
		}

    	menuManageService.deleteMenuManage(menuManageVO);
    	resultMsg = egovMessageSource.getMessage("success.common.delete");
    	String _MenuNm = "%";
    	menuManageVO.setMenuNm(_MenuNm);
    	model.addAttribute("resultMsg", resultMsg);
      	return "forward:/admin/menu/EgovMenuManageSelect.do";
    }

    /**
     * 메뉴리스트를 조회한다.
     * @param searchVO ComDefaultVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuList"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuListSelect.do")
    public String selectMenuList(@ModelAttribute("searchVO") ComDefaultVO searchVO,ModelMap model)  throws Exception {
    	
    	String resultMsg    = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
    	List list_menulist = menuManageService.selectMenuList();
    	resultMsg = egovMessageSource.getMessage("success.common.select");
        model.addAttribute("list_menulist", list_menulist);

        model.addAttribute("menu", "menuList");
      	return  "usolver/admin/menu/EgovMenuList";
    }

    /**
     * 메뉴리스트의 메뉴정보를 등록한다.
     * @param menuManageVO MenuManageVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuList"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuListInsert.do")
    public String insertMenuList(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception {
        String sLocationUrl = null;
    	String resultMsg    = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/*if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/

        //beanValidator.validate(menuManageVO, bindingResult);
		if (bindingResult.hasErrors()){
			sLocationUrl = "usolver/admin/menu/EgovMenuList";
			return sLocationUrl;
		}

		if(menuManageService.selectMenuNoByPk(menuManageVO) == 0){
			ProgrmManage searchVO = new ProgrmManage();
			searchVO.setSearchKeyword(menuManageVO.getProgrmFileNm());
			if(progrmManageService.selectProgrmNMTotCnt(searchVO)==0){
	    		resultMsg = egovMessageSource.getMessage("fail.common.insert");
		        sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
			}else{
				if(menuManageVO.getFunctionList() == null) menuManageVO.setFunctionList("");
	        	menuManageService.insertMenuManage(menuManageVO);
	    		resultMsg = egovMessageSource.getMessage("success.common.insert");
		        sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
			}
		}else{
			if(menuManageVO.getFunctionList() == null) menuManageVO.setFunctionList("");
    		resultMsg = egovMessageSource.getMessage("common.isExist.msg");
    		sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
		}
		model.addAttribute("resultMsg", resultMsg);
		
      	return sLocationUrl;
    }

    /**
     * 메뉴리스트의 메뉴정보를 수정한다.
     * @param menuManageVO MenuManageVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuList"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuListUpdt.do")
    public String updateMenuList(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception {
        String sLocationUrl = null;
    	String resultMsg    = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/

        //beanValidator.validate(menuManageVO, bindingResult);
		if (bindingResult.hasErrors()){
			sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
			return sLocationUrl;
		}
		ProgrmManage searchVO = new ProgrmManage();
		searchVO.setSearchKeyword(menuManageVO.getProgrmFileNm());
		if(progrmManageService.selectProgrmNMTotCnt(searchVO)==0){
    		resultMsg = egovMessageSource.getMessage("fail.common.update");
	        sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
		}else{
			if(menuManageVO.getFunctionList() == null) menuManageVO.setFunctionList("");
			menuManageService.updateMenuManage(menuManageVO);
			resultMsg = egovMessageSource.getMessage("success.common.update");
	        sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
		}
		model.addAttribute("resultMsg", resultMsg);
      	return sLocationUrl;
    }

    /**
     * 메뉴리스트의 메뉴정보를 삭제한다.
     * @param menuManageVO MenuManageVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuList"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuListDelete.do")
    public String deleteMenuList(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		BindingResult bindingResult,
    		ModelMap model)
            throws Exception {
        String sLocationUrl = null;
    	String resultMsg    = "";
    	// 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    /*	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/

        //beanValidator.validate(menuManageVO, bindingResult);
		if (bindingResult.hasErrors()){
			sLocationUrl = "usolver/admin/menu/EgovMenuList";
			return sLocationUrl;
		}
		menuManageService.deleteMenuManage(menuManageVO);
		resultMsg = egovMessageSource.getMessage("success.common.delete");
        sLocationUrl = "forward:/admin/menu/EgovMenuListSelect.do";
		model.addAttribute("resultMsg", resultMsg);
      	return sLocationUrl;
    }

    /**
     * 메뉴리스트의 메뉴정보를 이동 메뉴목록을 조회한다.
     * @param searchVO  ComDefaultVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuMvmn"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuListSelectMvmn.do")
    public String selectMenuListMvmn(
    		@ModelAttribute("searchVO") ComDefaultVO searchVO,
    		HttpServletRequest request,
    		ModelMap model)
            throws Exception {
    	// 0. Spring Security 사용자권한 처리
    	//Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/*if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}
*/
    	List list_menulist = menuManageService.selectMenuList();
    	model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
        model.addAttribute("list_menulist", list_menulist);
      	return  "usolver/admin/menu/EgovMenuMvmn";
    }

    /**
     * 메뉴리스트 신규추가시 메뉴번호를 조회한다.
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/SelectNewMenuNo.do")
   	public String selectNewMenuNoMvmn(ModelMap model, HttpServletResponse response)
    	throws Exception {

    	int newMenuNo = menuManageService.selectNewMenuNo();
        model.addAttribute("newMenuNo", newMenuNo);
        
        return "jsonView";
    }
    

    /*### 일괄처리 프로세스 ###*/

    /**
     * 메뉴생성 일괄삭제프로세스
     * @param menuManageVO MenuManageVO
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuBndeRegist"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuBndeAllDelete.do")
    public String menuBndeAllDelete(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		ModelMap model)
            throws Exception {
    	String resultMsg = "";
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    	/*if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
    		 return "forward:/accessDenied.do?type=nosession";
    	}*/
    	menuManageService.menuBndeAllDelete();
    	resultMsg = egovMessageSource.getMessage("success.common.delete");
    	model.addAttribute("resultMsg", resultMsg);
        return "usolver/admin/menu/EgovMenuBndeRegist";
    }


    /**
     * 메뉴일괄등록화면 호출 및  메뉴일괄등록처리 프로세스
     * @param commandMap    Map
     * @param menuManageVO  MenuManageVO
     * @param request       HttpServletRequest
     * @return 출력페이지정보 "sym/mnu/mpm/EgovMenuBndeRegist"
     * @exception Exception
     */
    @RequestMapping(value="/admin/menu/EgovMenuBndeRegist.do")
    public String menuBndeRegist(
    		Map commandMap,
    		final HttpServletRequest request,
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		ModelMap model)
            throws Exception {
        String sLocationUrl = null;
        String resultMsg = "";
        String sMessage  = "";
        // 0. Spring Security 사용자권한 처리
    	Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
 /*   	if(!isAuthenticated) {
    		model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
        	 return "forward:/accessDenied.do?type=nosession";
    	}*/
    	System.out.println("@@@@@@@@@@@@@@@@@@@@@@   sCmd ="+ StringUtil.nvl(request.getParameter("cmd")));
    	System.out.println("@@@@@@@@@@@@@@@@@@@@@@   sCmd ="+ (String)commandMap.get("cmd"));
        String sCmd = StringUtil.nvl(request.getParameter("cmd")) == null ? "" : StringUtil.nvl(request.getParameter("cmd"));
        if(sCmd.equals("bndeInsert")){
	    	final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			MultipartFile file;
			while (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next();
				file = entry.getValue();
				if (!"".equals(file.getOriginalFilename())) {
					// 2011.10.07 업로드 파일에 대한 확장자를 체크
					if (file.getOriginalFilename().endsWith(".xls")
							|| file.getOriginalFilename().endsWith(".xlsx")
							|| file.getOriginalFilename().endsWith(".XLS")
							|| file.getOriginalFilename().endsWith(".XLSX")) {
						
						if(menuManageService.menuBndeAllDelete()){
							sMessage = menuManageService.menuBndeRegist(menuManageVO, file.getInputStream());
				    	    resultMsg = sMessage;
						}else{
							resultMsg = egovMessageSource.getMessage("fail.common.msg");
							menuManageVO.setTmpCmd("EgovMenuBndeRegist Error!!");
					        model.addAttribute("resultVO", menuManageVO);
						}
					}else{
						log.info("xls, xlsx 파일 타입만 등록이 가능합니다.");
						resultMsg = egovMessageSource.getMessage("fail.common.msg");
						model.addAttribute("resultMsg", resultMsg);
						return "usolver/admin/menu/EgovMenuBndeRegist";
					}
					// *********** 끝 ***********
					
				}else{
					resultMsg = egovMessageSource.getMessage("fail.common.msg");
				}
			}
			sLocationUrl = "usolver/admin/menu/EgovMenuBndeRegist";
	    	model.addAttribute("resultMsg", resultMsg);
        }else{
            sLocationUrl = "usolver/admin/menu/EgovMenuBndeRegist";
        }
    	return sLocationUrl;
    }
}