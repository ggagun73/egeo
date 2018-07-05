package usolver.admin.log.elg.web;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import usolver.admin.log.elg.service.EditLogService;
import usolver.admin.log.elg.vo.EditLog;
import usolver.admin.log.elg.vo.LayerLog;
import usolver.admin.log.lgm.vo.SysLog;
import usolver.com.cmm.util.StringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Class Name : EgovLayerLogController.java
 * @Description : 레이어 편집 로그정보를 관리하기 위한 컨트롤러 클래스
 * @Modification Information
 *
 *    수정일         수정자         수정내용
 *    -------        -------     -------------------
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */

@Controller
public class EditLogController {
	
	@Resource(name="EditLogService")
	private EditLogService EditLogService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertyService;
	
	@Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;

	/**
	 * 레이어 편집 로그 목록 조회
	 *
	 * @param layerLog
	 * @return sym/log/wlg/EgovWebLogList
	 * @throws Exception
	 */
	@RequestMapping(value="/admin/log/elg/SelectLayerLogList.do")
	public String selectLayerLogInf(@ModelAttribute("searchVO") LayerLog layerLog,
			ModelMap model) throws Exception{

		layerLog.setPageUnit(propertyService.getInt("pageUnit"));
		layerLog.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(layerLog.getPageIndex());
		paginationInfo.setRecordCountPerPage(layerLog.getPageUnit());
		paginationInfo.setPageSize(layerLog.getPageSize());

		layerLog.setFirstIndex(paginationInfo.getFirstRecordIndex());
		layerLog.setLastIndex(paginationInfo.getLastRecordIndex());
		layerLog.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				
//		layerLog.setSearchBgnDe(layerLog.getSearchBgnDe().replace("-", ""));
//		layerLog.setSearchEndDe(layerLog.getSearchEndDe().replace("-", ""));		

		HashMap<?, ?> _map = (HashMap<?, ?>)EditLogService.selectLayerLogInf(layerLog);
		int totCnt = Integer.parseInt((String)_map.get("resultCnt"));

		model.addAttribute("resultList", _map.get("resultList"));
		model.addAttribute("resultCnt", _map.get("resultCnt"));

		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("menu", "layerLog");
		
		// 부서정보 추출
		CodeManageVO codeManageVO = new CodeManageVO();
        codeManageVO.setCODETABLE("USV_CODEDDOMAINS");
        codeManageVO.setG2DomainId("5001");  
        model.addAttribute("dept_cde_list", egovCodeManageService.selectCodeDetail(codeManageVO)); 
		
		return "usolver/admin/log/elg/EditLayerLogList";
	}
	
	
	/**
	 * 편집 로그 목록 조회
	 *
	 * @param sysLog
	 * @return sym/log/lgm/EgovSysLogList
	 * @throws Exception
	 */
	@RequestMapping(value="/admin/log/elg/SelectEditLogList.do")
	public String selectEditLogInf(@ModelAttribute("searchVO") EditLog editLog,
			ModelMap model) throws Exception{

		editLog.setPageUnit(propertyService.getInt("pageUnit"));
		editLog.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(editLog.getPageIndex());
		paginationInfo.setRecordCountPerPage(editLog.getPageUnit());
		paginationInfo.setPageSize(editLog.getPageSize());

		editLog.setFirstIndex(paginationInfo.getFirstRecordIndex());
		editLog.setLastIndex(paginationInfo.getLastRecordIndex());
		editLog.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		HashMap _map = (HashMap)EditLogService.selectEditLogInf(editLog);
		int totCnt = Integer.parseInt((String)_map.get("resultCnt"));

		model.addAttribute("resultList", _map.get("resultList"));
		model.addAttribute("resultCnt", _map.get("resultCnt"));
		model.addAttribute("frm", editLog);
		
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("menu", "editLog");
		
		return "usolver/admin/log/elg/EditLogList";
	}

	/**
	 * 편집 로그 상세 조회
	 *
	 * @param sysLog
	 * @param model
	 * @return sym/log/lgm/EgovSysLogInqire
	 * @throws Exception
	 */
	@RequestMapping(value="/admin/log/elg/SelectEditLog.do")
	public String selectEditLog(@ModelAttribute("searchVO") EditLog editLog,
			@RequestParam("requstId") String requstId, HttpServletRequest request,	
			ModelMap model) throws Exception{

		editLog.setLogId(requstId.trim());

		EditLog vo = EditLogService.selectEditLog(editLog);
		model.addAttribute("result", vo);
		model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
		
		return "usolver/admin/log/elg/EditLogInqire";
	}
}