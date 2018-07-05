package usolver.admin.log.ilg.web;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.OutputStream;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.net.util.Base64;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;

import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.log.ilg.service.ImgLogService;
import usolver.admin.log.ilg.vo.ImgLog;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.StringUtil;

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
public class ImgLogController {
	
	@Resource(name="imgLogService")
	private ImgLogService imgLogService;

	@Resource(name="propertiesService")
	protected EgovPropertyService propertyService;
	
	@Resource(name = "egovCodeManageService")
    private EgovCodeManageService egovCodeManageService;
	@Resource(name = "commonService")
	private CommonService commonService;

	/**
	 * 편집 로그 목록 조회
	 *
	 * @param sysLog
	 * @return sym/log/lgm/EgovSysLogList
	 * @throws Exception
	 */
	@RequestMapping(value="/admin/log/ilg/SelectImgLogList.do")
	public String selectEditLogInf(@ModelAttribute("searchVO") ImgLog imgLog,
			ModelMap model) throws Exception{

		imgLog.setPageUnit(propertyService.getInt("pageUnit"));
		imgLog.setPageSize(propertyService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(imgLog.getPageIndex());
		paginationInfo.setRecordCountPerPage(imgLog.getPageUnit());
		paginationInfo.setPageSize(imgLog.getPageSize());

		imgLog.setFirstIndex(paginationInfo.getFirstRecordIndex());
		imgLog.setLastIndex(paginationInfo.getLastRecordIndex());
		imgLog.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		HashMap _map = (HashMap)imgLogService.getImgLogInfo(imgLog);
		int totCnt = Integer.parseInt((String)_map.get("resultCnt"));

		model.addAttribute("resultList", _map.get("resultList"));
		model.addAttribute("resultCnt", _map.get("resultCnt"));
		model.addAttribute("frm", imgLog);
		
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("menu", "imgLog");
		
		return "usolver/admin/log/ilg/ImgLogList";
	}

	/**
	 * 편집 로그 상세 조회
	 *
	 * @param sysLog
	 * @param model
	 * @return sym/log/lgm/EgovSysLogInqire
	 * @throws Exception
	 */
	@RequestMapping(value="/admin/log/ilg/SelectImgLog.do")
	public String selectEditLog(@ModelAttribute("searchVO") ImgLog imgLog,
			@RequestParam("requstId") String requstId, HttpServletRequest request,	
			ModelMap model) throws Exception{
		
		ImgLog vo = imgLogService.getImgLogImg(Integer.parseInt(requstId.trim()));
		model.addAttribute("result", vo);
		model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
		
		return "usolver/admin/log/ilg/ImgLogInqire";
	}
	
	@RequestMapping(value = "/admin/log/ilg/insertImgLog.do")
	public void insertImgLog(HttpServletRequest request) throws Exception {
		ImgLog imgLog = new Gson().fromJson(request.getParameter("data"), ImgLog.class);
		imgLogService.intsertImgLog(imgLog);
	}
	
	@RequestMapping(value = "/admin/log/ilg/downloadImgLogToImg.do")
	public void downloadImgLogToImg(HttpServletRequest request,HttpServletResponse response) throws Exception {
		/*ImgLog imgLog = new Gson().fromJson(request.getParameter("data"), ImgLog.class);
		String base64Img = imgLog.getSAVE_IMG();
		String date = imgLog.getLOG_DATE().replaceAll("-", "").replaceAll(":", "").replaceAll(" ", "_");*/
		
		String base64Img = request.getParameter("img");
		String date = request.getParameter("date").replaceAll("-", "").replaceAll(":", "").replaceAll(" ", "_");
		BufferedImage image = ImageIO.read(new ByteArrayInputStream(Base64.decodeBase64(base64Img.split(",")[1])));
		
		String browserName = null;
		String fileName = "IMGLOG_"+date;
		
		String header = request.getHeader("User-Agent");

        if (header.contains("MSIE") || header.contains("Mozilla")) {
            browserName =  "MSIE";
        } else if(header.contains("Chrome")) {
            browserName =   "Chrome";
        } else if(header.contains("Opera")) {
            browserName =   "Opera";
        }else 
        	browserName =   "Firefox";
        
        String newFileName = commonService.getKorFileName(browserName, fileName);
		
		response.setContentType("Image/png");
		response.setHeader("Content-Disposition", "attachment;filename=" + newFileName + ".png");
		
		OutputStream ios = response.getOutputStream();
		ImageIO.write(image, "png", ios);
		response.flushBuffer();
	    ios.close();
	}
}