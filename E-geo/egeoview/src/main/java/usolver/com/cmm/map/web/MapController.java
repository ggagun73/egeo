package usolver.com.cmm.map.web;

import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.Stroke;
import java.awt.image.BufferedImage;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import usolver.com.cmm.map.service.LyrEditService;
import usolver.com.cmm.map.service.LyrInfoService;
import usolver.com.cmm.map.service.UserSubjectService;
import usolver.com.cmm.map.service.vo.SearchFacilityVO;
import usolver.com.cmm.map.service.vo.SubjectVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.service.MemberService;
import usolver.com.cmm.vo.CodeVO;

import usolver.com.cmm.util.EtcUtil;
import usolver.com.excel.service.ExcelReadService;
import usolver.com.main.vo.LoginVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

/**
 * @Class Name : MapController.java
 * @Description : Map Controller class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-07-27
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Controller
public class MapController {
	
	@Resource(name = "lyrInfoService")
	private LyrInfoService lyrInfoService;
	
	@Resource(name = "subjectService")
	private UserSubjectService subjectService;
	
	@Resource(name = "lyrEditService")
	private LyrEditService lyrEditService;
	
	@Resource(name = "memberService")
	private MemberService memberService;
	 /** CommonService */
    @Resource(name = "commonService")
    private CommonService commonService;
    
    @Resource(name = "excelReadService")
    private ExcelReadService excelReadService;
	
	 // [코드 데이터 추출]
	CodeVO cv = new CodeVO();
	SearchFacilityVO fv = new SearchFacilityVO();
	
	/**
	 * 레이어와 그룹 정보를 조회한다.
	 * @return "/usolver/com/map/map"
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = { "/map/map.do", "/map/map"})
	public String map(HttpServletResponse res, HttpServletRequest req, Model model) throws Exception {
		
		String system = req.getParameter("SYSTEM"); 
		String subjectId = req.getParameter("SUBJECT_ID"); 
		String systemMap = req.getParameter("SYSTEM_MAP"); 
		String serviceLayerList = "";
		String systemName = "";
		
		if(system == null) 
			system = "WTL";
		
		
		if(system.equals("WTL")) 
			systemName = "상수관리";
		else if(system.equals("SWL"))
			systemName = "하수관리";
		else if(system.equals("RDL"))
			systemName = "도로관리";
		else if(system.equals("UNDER"))
			systemName = "지하시설물";
		else if(system.equals("BASE"))
			systemName = "기본도";
		
		
		List<EgovMap> layerInfoList = null;				//현재 서비스 레이어 목록
		List<EgovMap> layerGroupInfoList = null;		
		List<EgovMap> layerGroupInfoListNew = null;		 
		
		List<EgovMap> orgLayerInfoList = null;			//시스템별 기본 서비스 레이어 목록
		List<EgovMap> orgLayerGroupInfoList = null;
		List<EgovMap> orgEditLayerInfoList = null;
		
		List<EgovMap> editLayerInfoList = lyrEditService.selectEditLyrInfoList(systemName);
		List<EgovMap> layerInfoListBySubject;
		
		List<EgovMap> layerInfoListByUserAuthor = null;			
		List<EgovMap> layerInfoListBySystemAuthor = null;		
		
		orgEditLayerInfoList 	= EtcUtil.cloneList(editLayerInfoList);
		   	   
   	    LoginVO  user =(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
 	    List<String> authorities = EgovUserDetailsHelper.getAuthorities();
	 	String userId =  user.getUSER_ID();
	 	
		//주제도에서 추출
		SubjectVO subjectVO = new SubjectVO();
		subjectVO.setUSER_ID(userId);
		
		//로그인 정보가 없는 경우.. : 모든 곳에 다 처리해 줘야하나? 흠.흠..
   	    if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
          	   return "forward:/accessDenied.do?type=nosession";
   	    }
		
		JSONObject userAuthor = memberService.getUserAuthorites(authorities, userId, system);
		
		//특정 주제도를 선택한 경우
		if(subjectId != null){			
			
			subjectVO.setSUBJECT_ID(Integer.parseInt(subjectId));
			layerInfoList = subjectService.selectLyrInfoListBySubject(subjectVO);
			
			//시스템맵이면 그룹레이어정보를 G2V_LAYER에서 추출 
			if(systemMap == "Y"){
				layerGroupInfoList = lyrInfoService.selectLyrGroupInfo(null);
			}
			else{ //아니면 별도 그룹레이어 (TN_USER_LAYERGROUP)에서 추출
				layerGroupInfoList = lyrInfoService.selectLyrGroupInfoNew(null); 
			}
			//접근 가능한 레이어범위내에서만 편집 가능하도록.. 
			for(EgovMap map : layerInfoList){
					serviceLayerList = serviceLayerList + (String) map.get("table")+",";
				}
				
				Iterator<EgovMap> iter = editLayerInfoList.iterator();
				
				//주제도 범위 내에서만 편집 가능하도록 목록 수정
				while(iter.hasNext()) {
	
					EgovMap map = iter.next();
					String tableNm = (String) map.get("lyrEngNm");
					if(serviceLayerList.indexOf(tableNm) == -1) {
						iter.remove();
					}
				}
		}
		else{ //기본주제도로 설정한 주제도를 갖고 있는 경우 
			layerInfoListBySubject = subjectService.selectBaseLyrInfoListBySubject(subjectVO); 
		
			//사용자가 기본 주제도로 설정한 내역이 있으면 서비스할 레이어정보와 그룹정보를 주제도로부터 가져온 값으로 대체 
			if(layerInfoListBySubject.size() > 0){
				
				layerGroupInfoListNew = lyrInfoService.selectLyrGroupInfoNew(null);
			
				layerInfoList = layerInfoListBySubject;
				layerGroupInfoList = layerGroupInfoListNew;
	
				for(EgovMap map : layerInfoList){
					serviceLayerList = serviceLayerList + (String) map.get("table")+",";
				}
				
				Iterator<EgovMap> iter = editLayerInfoList.iterator();
				
				//주제도 범위 내에서만 편집 가능하도록 목록 수정
				while(iter.hasNext()) {
	
					EgovMap map = iter.next();
					String tableNm = (String) map.get("lyrEngNm");
					if(serviceLayerList.indexOf(tableNm) == -1) {
						iter.remove();
					}
				} 
			} 
		} 
		
		orgLayerInfoList = lyrInfoService.selectLyrInfoList(null);
		orgLayerGroupInfoList = lyrInfoService.selectLyrGroupInfo(null);
			
		//기본 시스템주제도로 서비스하는 경우
		if(layerInfoList == null){
				
			layerInfoList = orgLayerInfoList;
			layerGroupInfoList = orgLayerGroupInfoList;
		}
		else{
			model.addAttribute("loaded_baseSubject", "Y"); //기본주제도 사용중인지 여부 구분
		}
		
		String sOrgGroupInfoList = new Gson().toJson(orgLayerGroupInfoList) ;
		String sOrgEditLayerInfoList = new Gson().toJson(orgEditLayerInfoList) ;
				
		model.addAttribute("layerInfoList", layerInfoList);
		model.addAttribute("layerGroupInfoList", layerGroupInfoList);
		model.addAttribute("editLayerInfoList", editLayerInfoList);
		
		model.addAttribute("orgLayerInfoList", orgLayerInfoList);
		model.addAttribute("orgLayerGroupInfoList", sOrgGroupInfoList);
		model.addAttribute("orgEditLayerInfoList", sOrgEditLayerInfoList);
		
		model.addAttribute("oUserAuthor", userAuthor);
		
		// 행정구
        model.addAttribute("hjd_cd_list", commonService.selectHjdCd(cv));
        // 행정읍/면/동
     	cv.setCODE_ID("HJD_CDE");
     	model.addAttribute("hjd_cde_list", commonService.selectCd(cv)); 
     	
     	// 새주소
     	//model.addAttribute("nrd_nam_list", commonService.selectNrdNam(cv));
     	// 속성검색
     	model.addAttribute("att_list", commonService.selectAttList(fv));

		return "/usolver/com/map/map" ;
	}
	
	@RequestMapping(value = { "/map/map_dawul.do", "/map/map_dawul"})
	public String map_dawul(HttpServletResponse res, HttpServletRequest req, Model model) throws Exception {
		
		return "/usolver/com/map/map_dawul" ;
	}	
	
	/**
	 * 횡단면도
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/map/popAcss.do")
	public String popAnalysisCross() throws Exception {
		return "/usolver/com/map/popAcss";
	}
		
	/**
	 * 인쇄 미리보기
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/maputil/print.do")
	public String popPrintMap() throws Exception {
		return "/usolver/com/map/printMap";
	}
	/**
	 * 라인 그림
	 */
	@RequestMapping("/map/lineDraw.do")
	public void drawLineSymbol(HttpServletResponse res, HttpServletRequest req) throws Exception {
		Integer size = Integer.parseInt(req.getParameter("size")); 
		Color color = setStrColor(req.getParameter("color"));
		String width = req.getParameter("width"); 
		String style = req.getParameter("dash"); 
		String marker = req.getParameter("marker");
		String arrow = req.getParameter("arrow");
		
		BufferedImage bi = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = (Graphics2D) bi.getGraphics();
		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		Stroke stroke = null;
		
		graphics.setColor(Color.white);
		graphics.fillRect(0, 0, size, size);

		float dotfloat = 3.0F;
		float dashfloat = 7.0F;

		if (style.equals("1")) {
			stroke = new BasicStroke(Float.parseFloat(width)); // solid
		} else if (style.equals("2")) // dot
		{
			float[] dash = { dotfloat, dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		} else if (style.equals("3")) // dashdot
		{
			float[] dash = { dashfloat, dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		} else if (style.equals("4")) // dashdotdat
		{
			float[] dash = { dashfloat, dotfloat, dotfloat, dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		} else if (style.equals("5")) // dashdotdat
		{
			float[] dash = { dashfloat, dotfloat, dotfloat, dotfloat, dotfloat,
					dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		}
		graphics.setColor(color);
		graphics.setStroke(stroke);
		
		int[] xs = { 0, size / 2, size / 2, size };
		int[] ys = { size / 2, 0, size, size / 2 };
		graphics.drawPolyline(xs, ys, xs.length);
		
		
		graphics.dispose();
		res.reset();
		res.setContentType("image/png");
		OutputStream os = res.getOutputStream();
		ImageIO.write(bi, "png", os);
		os.flush();
		os.close();
	}

	public Color setStrColor(String strColor) {
		Integer r = Integer.parseInt(getHexToDec(strColor.substring(0, 2)));
		Integer g = Integer.parseInt(getHexToDec(strColor.substring(2, 4)));
		Integer b = Integer.parseInt(getHexToDec(strColor.substring(4, 6)));
		
		return new Color(r, g, b);
	}
	
	public String getHexToDec(String hex) {
		long v = Long.parseLong(hex, 16);
		return String.valueOf(v);
	}
	
	/**
	 * 폴리곤 그림
	 */
	@RequestMapping("/map/polygonDraw.do")
	public void drawPolygonSymbol(HttpServletResponse res, HttpServletRequest req) throws Exception {
		Integer size = Integer.parseInt(req.getParameter("size"));
		String fillOpa = req.getParameter("fillOpa");
		Color fillColor = setStrColor(req.getParameter("fillcolor"));
		Color lineColor = setStrColor(req.getParameter("linecolor"));
		String width = req.getParameter("width"); 
		String style = req.getParameter("dash");
		
		//면 투명도 구함
		AlphaComposite alphaFill;
		if(fillOpa != null) {
			alphaFill = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, Float.parseFloat(fillOpa));
		}
		else {
			alphaFill = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, (float)1.0);	
		}
		
		
		BufferedImage bi = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = (Graphics2D) bi.getGraphics();
		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		graphics.setComposite(alphaFill);
		graphics.setColor(fillColor);
		graphics.fillRect(0, 0, size, size);
		
		graphics.setColor(fillColor);
		graphics.drawRect(0, 0, size, size);
		
		Stroke stroke = null;
		graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, (float)1.0));
		graphics.setColor(lineColor);
		
		
		float dotfloat = 3.0F;
		float dashfloat = 7.0F;

		if (style.equals("1")) {
			stroke = new BasicStroke(Float.parseFloat(width)); // solid
		} else if (style.equals("2")) // dot
		{
			float[] dash = { dotfloat, dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		} else if (style.equals("3")) // dashdot
		{
			float[] dash = { dashfloat, dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		} else if (style.equals("4")) // dashdotdat
		{
			float[] dash = { dashfloat, dotfloat, dotfloat, dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		} else if (style.equals("5")) // dashdotdat
		{
			float[] dash = { dashfloat, dotfloat, dotfloat, dotfloat, dotfloat,
					dotfloat };
			stroke = new BasicStroke(Float.parseFloat(width),
					BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1.0F, dash,
					0.F);
		}
		
		graphics.setStroke(stroke);
		int[] xs = { 1, size - 1, size - 1, 1 };
		int[] ys = { 1, 1, size - 1, size - 1 };
		graphics.drawPolygon(xs, ys, xs.length);
		
		graphics.dispose();
		res.reset();
		res.setContentType("image/png");
		OutputStream os = res.getOutputStream();
		ImageIO.write(bi, "png", os);
		os.flush();
		os.close();
	}
	
	
	@RequestMapping(value="/map/geocoding.do")
	public String geocoding(Model model, @RequestParam(value="geocodingFile") MultipartFile geocodingFile) throws Exception{
		
		HSSFWorkbook workbook = excelReadService.loadExcel(geocodingFile.getInputStream());
		HSSFSheet sheet = workbook.getSheetAt(0);
		
		List<Map<String, String>> sheetData = excelReadService.readSheet(sheet);
		
		sheetData = excelReadService.selectCentroid(sheetData);
		
		model.addAttribute("result", sheetData);
		return "jsonView";
	}
	
	/**
	 * 편집을 진행하는 feature의 공간정보와 속성정보를 업데이트한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/updateUserMapExtent.do", method = RequestMethod.POST)
	public String updateEditMidData(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
	
		try {
			LoginVO loginVO = new Gson().fromJson(request.getParameter("obj"), LoginVO.class);
			int count = lyrInfoService.updateMapExtent(loginVO);
			model.addAttribute("count", count);
		} catch (Exception e) {
			e.printStackTrace();
		}
				
        return "jsonView";
	}
	
}
