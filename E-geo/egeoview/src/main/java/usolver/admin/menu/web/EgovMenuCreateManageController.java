package usolver.admin.menu.web;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.admin.menu.service.EgovMenuCreateManageService;
import usolver.admin.menu.vo.MenuCreatVO;
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
 * 메뉴목록 관리및 메뉴생성, 사이트맵 생성을 처리하는 비즈니스 구현 클래스
 * 
 * @author 개발환경 개발팀 이용
 * @since 2009.06.01
 * @version 1.0
 * @see <pre>
 * &lt;&lt; 개정이력(Modification Information) &gt;&gt;
 *   
 *     수정일       수정자           수정내용
 *  ------------   --------    ---------------------------
 *   2009.03.20		이  용          최초 생성
 * 	 2011.07.29		서준식          사이트맵 저장경로 수정
 *	 2011.08.26		정진오			IncludedInfo annotation 추가
 *	 2013.06.17		이기하			사이트맵 생성시 경로 오류 수정
 * </pre>
 */

@Controller
public class EgovMenuCreateManageController {

	protected Log log = LogFactory.getLog(this.getClass());
	/* Validator */
	//@Autowired
	//private DefaultBeanValidator beanValidator;
	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** cmmUseService */
    @Resource(name="EgovCmmUseService")
    private EgovCmmUseService cmmUseService;
    
	/** EgovMenuManageService */
	@Resource(name = "meunCreateManageService")
	private EgovMenuCreateManageService menuCreateManageService;

	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	@Resource(name = "lyrInfoService")
	private LyrInfoService lyrInfoService;
	
	/*********** 메뉴 생성 관리 ***************/

	/**
	 * *메뉴생성목록을 조회한다.
	 * 
	 * @param searchVO
	 *            AdmDefaultVO
	 * @return 출력페이지정보 "sym/mnu/mcm/EgovMenuCreatManage"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/menu/EgovMenuCreatManageSelect.do")
	public String selectMenuCreatManagList(@ModelAttribute("searchVO") AdmDefaultVO searchVO, ModelMap model)  throws Exception {
		
		String resultMsg = "";
		// 0. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	/*	if (!isAuthenticated) {
			model.addAttribute("message", egovMessageSource
					.getMessage("fail.common.login"));
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
		
		if (searchVO.getSearchKeyword() != null && !searchVO.getSearchKeyword().equals("")) {
			int IDcnt = menuCreateManageService.selectUsrByPk(searchVO);
			if (IDcnt == 0) {
				resultMsg = egovMessageSource.getMessage("info.nodata.msg");
			} else {
				/* AuthorCode 검색 */
				MenuCreatVO vo = new MenuCreatVO();
				vo = menuCreateManageService.selectAuthorByUsr(searchVO);
				searchVO.setSearchKeyword(vo.getAuthorCode());
			}
		}
		List resultList = menuCreateManageService.selectMenuCreatManagList(searchVO);
		model.addAttribute("resultList", resultList);
		model.addAttribute("menu", "menuCreate");

		int totCnt = menuCreateManageService.selectMenuCreatManagTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		return "usolver/admin/menu/EgovMenuCreatManage";
	}

	/**
	 * 기존 메뉴생성 기능목록을 조회한다.
	 * 
	 * @param menuCreatVO
	 * @return 출력페이지정보 "sym/mnu/mcm/EgovMenuCreat"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/menu/EgovMenuFunctionSelect.do")
	public String selectMenuFunctionList(
			ModelMap model, @ModelAttribute("menuCreatVO") MenuCreatVO menuCreatVO, HttpServletRequest request) throws Exception {
		
		List functionList = new ArrayList();
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		String authorCode = StringUtil.nvl(request.getParameter("authorCode"));
		menuCreatVO.setAuthorCode(authorCode);
		
		String treeType = StringUtil.nvl(request.getParameter("treeType"));
		
		if(treeType.equals("data"))
			functionList = menuCreateManageService.selectMenuFunctionList(menuCreatVO);
		else{
			functionList = menuCreateManageService.selectMenuFunctionList2(menuCreatVO);
		}
			
		
		model.addAttribute("functionList", functionList);
		
		return "jsonView";
	}
	
	/**
	 * 기존 메뉴생성 기능목록을 수정/삭제한다.
	 * 
	 * @param menuCreatVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/menu/EgovMenuFunctionModify.do")
	public String modifyMenuFunctionList(
			ModelMap model, @ModelAttribute("menuCreatVO") MenuCreatVO menuCreatVO, HttpServletRequest request) throws Exception {
		
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		String treeType = StringUtil.nvl(request.getParameter("treeType"));
		String authorCode = StringUtil.nvl(request.getParameter("authorCode"));
		String action = StringUtil.nvl(request.getParameter("action"));
		String[] functionList;
		String resultMsg = "";
		
		menuCreatVO.setAuthorCode(authorCode);
		
		if(treeType.equals("data")){
			//권한 기능 삭제
			menuCreateManageService.deleteMenuFunctionList(menuCreatVO);
			resultMsg = egovMessageSource.getMessage("success.common.delete");
			
			if(action.equals("CODE_UPDATE")){
				functionList = request.getParameterValues("functionList");
				menuCreatVO.setFunctionList(functionList);
				
				//권한 기능 수정(추가)
				menuCreateManageService.insertMenuFunctionList(menuCreatVO);
				resultMsg = egovMessageSource.getMessage("success.common.update");
			}
		}else{
			//권한 기능 삭제
			menuCreateManageService.deleteMenuFunctionList2(menuCreatVO);
			resultMsg = egovMessageSource.getMessage("success.common.delete");
			
			if(action.equals("CODE_UPDATE")){
				functionList = request.getParameterValues("functionList");
				menuCreatVO.setFunctionList(functionList);
				
				//권한 기능 수정(추가)
				menuCreateManageService.insertMenuFunctionList2(menuCreatVO);
				resultMsg = egovMessageSource.getMessage("success.common.update");
			}
		}
		
		model.addAttribute("message", resultMsg);
		return "jsonView";
	}
	
	/**
	 * 메뉴생성 세부화면을 조회한다.
	 * 
	 * @param menuCreatVO
	 *            MenuCreatVO
	 * @return 출력페이지정보 "sym/mnu/mcm/EgovMenuCreat"
	 * @exception Exception
	 */
	@RequestMapping(value = "/admin/menu/EgovMenuCreatSelect.do")
	public String selectMenuCreatList(
			@ModelAttribute("searchVO") AdmDefaultVO searchVO,
			@ModelAttribute("menuCreatVO") MenuCreatVO menuCreatVO,
			HttpServletRequest request,
			ModelMap model) throws Exception {
		// 0. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		/*if (!isAuthenticated) {
			model.addAttribute("message", egovMessageSource
					.getMessage("fail.common.login"));
			return "egovframework/com/uat/uia/EgovLoginUsr";
		}*/
		
		
		String systemType = StringUtil.nvl(request.getParameter("systemType"));
		String systemNum = "";
		
		if(systemType.equals("DEFAULT")){
			systemNum = "1";
			systemType = "WATER";
		}else if(systemType.equals("WATER")){
			systemNum = "1";
		}
		else if(systemType.equals("SEWER")) systemNum = "3";
		else systemNum = "5";
		
		searchVO.setSearchKeyword(systemNum);
		
		searchVO.setPageUnit(14); //propertiesService.getInt("pageUnit")
		searchVO.setPageSize(14); //propertiesService.getInt("pageSize")
		
		//메뉴리스트로 트리생성.. 
		List list_menulist = menuCreateManageService.selectAllMenuCreatList(searchVO);
		model.addAttribute("list_menulist", list_menulist);
				
		List<EgovMap> layerInfoList = lyrInfoService.selectLyrInfoList(null);
		model.addAttribute("layerInfoList", layerInfoList);
		
		// 메뉴 추가 삭제
		/** pageing */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());
		
		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		searchVO.setSearchKeyword(systemType);
		
		//권한 리스트 생성 
		List authorList = menuCreateManageService.selectAllMenuCreatManagList(searchVO);
		model.addAttribute("authorList", authorList);

		MenuCreatVO menuCreatVo = new MenuCreatVO();
		
		menuCreatVo.setAuthorCode(searchVO.getSearchKeyword());
		
		List resultList = menuCreateManageService.selectMenuCreatList(menuCreatVo);
		model.addAttribute("resultList", resultList);
		model.addAttribute("menu", "menuCreate");
		
		int totCnt = menuCreateManageService.selectMenuCreatManagTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		model.addAttribute("menu", "menuCreate");
		model.addAttribute("systemType", systemType);
		return "usolver/admin/menu/EgovMenuCreat";
	}
	
	/**
	 * 메뉴생성처리 및 메뉴생성내역을 등록한다.
	 * 
	 * @param checkedAuthorForInsert
	 *            String
	 * @param checkedMenuNoForInsert
	 *            String
	 * @return 출력페이지정보 등록처리시 "forward:/admin/menu/EgovMenuCreatSelect.do"
	 * @exception Exception
	 */
	@RequestMapping("/admin/menu/EgovMenuCreatInsert.do")
	public String insertMenuCreatList(
			@RequestParam("checkedAuthorForInsert") String checkedAuthorForInsert,
			@RequestParam("checkedMenuNoForInsert") String checkedMenuNoForInsert,
			@ModelAttribute("menuCreatVO") MenuCreatVO menuCreatVO,
			ModelMap model) throws Exception {
		String resultMsg = "";
		// 0. Spring Security 사용자권한 처리
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		/*if (!isAuthenticated) {
			model.addAttribute("message", egovMessageSource.getMessage("fail.common.login"));
			return "egovframework/com/uat/uia/EgovLoginUsr";
		}*/
		String[] insertMenuNo = checkedMenuNoForInsert.split(",");
		if (insertMenuNo == null || (insertMenuNo.length == 0)) {
			resultMsg = egovMessageSource.getMessage("fail.common.insert");
		} else {
			menuCreateManageService.insertMenuCreatList(checkedAuthorForInsert,
					checkedMenuNoForInsert);
			resultMsg = egovMessageSource.getMessage("success.common.insert");
		}
		model.addAttribute("resultMsg", resultMsg);
		return "forward:/admin/menu/EgovMenuCreatSelect.do";
	}


}
