/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package usolver.com.cmm.web;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.com.cmm.map.service.EtcMapEtService;
import usolver.com.cmm.map.service.vo.EtcMapEtVO;
import usolver.com.cmm.map.service.vo.SearchEditHisVO;
import usolver.com.cmm.map.service.vo.SearchFacilityVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.EtcUtil;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.CodeVO;
import usolver.com.cmm.vo.FileInfoVO;
import usolver.com.cmm.vo.UsvBookLogVO;
import usolver.com.main.vo.LoginVO;
import egovframework.rte.fdl.property.EgovPropertyService;

/**  
 * @Class Name : EgovBindingInitializer.java
 * @Description : EgovBindingInitializer Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class CommonController {
	
    /** CommonService */
    @Resource(name = "commonService")
    private CommonService commonService;
    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    
    @Resource(name = "fileUploadProperties")
    Properties fileUploadProperties;
    
    /** Validator */
    //@Resource(name = "beanValidator")
	//protected DefaultBeanValidator beanValidator;

	/** EtcMapEtService */
    @Resource(name = "EtcMapEtService")
    private EtcMapEtService etcMapEtService;
    
    /**
	 * 메인 페이지
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/test.do")
    public String testPage(
    		Model model, HttpServletRequest request) 
            throws Exception {
    	
        return "/test";
    }
    
    /**
	 * 메인 페이지
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/idx.do")
    public String indexPage(
    		Model model, HttpServletRequest request) 
            throws Exception {
    	
        return "/idx";
    }

    @RequestMapping(value="/maputil/launchprint.do")
	public String launchPrint() throws Exception {
  
        return "/usolver/com/cmm/launchPrint";
	}
    
    @RequestMapping(value="/generateJNLPprint.do")
	public String generateJNLPprint() throws Exception {
  
        return "/usolver/com/cmm/GenerateJNLPprint";
	}
    	
    /**
	 * 코드용 XML 생성 : 동
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    /*@RequestMapping(value="/common/getFieldInfo.do")
    public String getFieldInfo(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        
    	String tableid = StringUtil.nvl( request.getParameter("tableid") );
    	
        return "/common/fieldInfo/"+tableid;
    }*/
    
    /**
	 * 코드용 XML 생성
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/common/hjdCdeXml.do")
    public void hjdCdeXml(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        
    	String param = StringUtil.nvl( request.getParameter("param") );
    	
        CodeVO cv = new CodeVO();
        cv.setCODE( param );
 
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        List xmlData = commonService.selectHjdCde(cv);
        
        if( xmlData!=null) {
        	xmlSb.append("<code>");

        	for (int i = 0; i < xmlData.size(); i++) {
        		cv = (CodeVO) xmlData.get(i);
        		xmlSb.append("<item>");
        		xmlSb.append("<code_value>"+cv.getCODE()+"</code_value>");
        		xmlSb.append("<code_name>"+cv.getVAL()+"</code_name>");
        		xmlSb.append("</item>");
			}
        	xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    }
    
    /**
     * 법정동 코드를 조회한다.
     * 
     * @param model
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value="/common/bjdCdeXml.do")
    public void bjdCdeXml(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
    	String param = StringUtil.nvl( request.getParameter("param") );
    	
        CodeVO cv = new CodeVO();
        cv.setCODE( param );
 
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        List xmlData = commonService.selectBjdCde(cv);
        
        if( xmlData!=null) {
        	xmlSb.append("<code>");

        	for (int i = 0; i < xmlData.size(); i++) {
        		cv = (CodeVO) xmlData.get(i);
        		xmlSb.append("<item>");
        		xmlSb.append("<code_value>"+cv.getCODE()+"</code_value>");
        		xmlSb.append("<code_name>"+cv.getVAL()+"</code_name>");
        		xmlSb.append("</item>");
			}
        	xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    }
    
    //새주소 도로명 조회 - Yu_mk
    @RequestMapping(value="/common/nrdNamXml.do")
    public String nrdNamXml(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {		
    	String param = StringUtil.nvl( request.getParameter("param") );
        CodeVO cv = new CodeVO();
        cv.setCODE( param );
        cv.setS_INIT(Integer.parseInt(param.substring(0, 5)));
        cv.setE_INIT(Integer.parseInt(param.substring(5, 10)));
        
        /*StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);*/
        
        List jsonData = commonService.selectNrdNam(cv);
        model.addAttribute("jsonData", jsonData);
        return "jsonView";
        /*if( xmlData!=null) {
        	xmlSb.append("<code>");
        	for (int i = 0; i < xmlData.size(); i++) {
        		cv = (CodeVO) xmlData.get(i);
        		xmlSb.append("<item>");
        		xmlSb.append("<code_value>"+cv.getRN_CD()+"</code_value>");
        		xmlSb.append("<code_name>"+cv.getRN()+"</code_name>");
        		xmlSb.append("</item>");
			}
        	xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );*/
    }
    
    //속성고급검색 필드목록 - Yu_mk
    @RequestMapping(value="/common/attFldXml.do")
    public void attFldXml(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {		
    	String param = StringUtil.nvl( request.getParameter("param") );
    	SearchFacilityVO cv = new SearchFacilityVO();
        cv.setG2_TABLENAME(param);
        
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        List xmlData = commonService.selectAttFld(cv);
        
        if( xmlData!=null) {
        	xmlSb.append("<code>");
        	for (int i = 0; i < xmlData.size(); i++) {
        		cv = (SearchFacilityVO) xmlData.get(i);
        		xmlSb.append("<item>");
        		xmlSb.append("<code_id>"+cv.getG2_NAME()+"</code_id>");
        		xmlSb.append("<code_value>"+cv.getG2_TABLENAME()+"</code_value>");
        		xmlSb.append("<code_name>"+cv.getG2_ALIAS()+"</code_name>");
        		xmlSb.append("</item>");
			}
        	xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    }
    
    //속성고급검색 표본필드 값 - Yu_mk
    @RequestMapping(value="/common/attFldValXml.do")
    public void attFldValXml(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {		
    	String param = StringUtil.nvl( request.getParameter("param"));
    	String tablename = StringUtil.nvl( request.getParameter("selected_value"));
    	SearchFacilityVO cv = new SearchFacilityVO();
        cv.setG2_TABLENAME(tablename);
        cv.setG2_NAME(param);
        String[] G2_ID_MAP = request.getParameterValues("G2_ID_MAP[]");
    	cv.setG2_ID_MAP(G2_ID_MAP);
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        List xmlData = commonService.selectAttFldVal(cv);
        
        if( xmlData!=null) {
        	xmlSb.append("<code>");
        	for (int i = 0; i < xmlData.size(); i++) {
        		cv = (SearchFacilityVO) xmlData.get(i);
        		xmlSb.append("<item>"); 
        		if(param.equals("IST_YMD")){	// 날짜 데이터
        			xmlSb.append("<code_id>"+cv.getVAL()+"</code_id>");
        			xmlSb.append("<code_name>"+cv.getVAL().substring(0,4)+"-"+cv.getVAL().substring(4,6)+"-"+cv.getVAL().substring(6)+"</code_name>");
        		}
        		else{
        			xmlSb.append("<code_id>"+cv.getVAL()+"</code_id>");
        			xmlSb.append("<code_name>"+cv.getVAL()+"</code_name>");
        		}
        		xmlSb.append("</item>");
			}
        	xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    }
    
    //속성고급검색 쿼리 결과 - Yu_mk
    @RequestMapping(value = "/common/attResultXml.do")
    public String attResultXml(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {		
    	SearchFacilityVO cv = new SearchFacilityVO();
    	String query = new String(request.getParameter("query").getBytes("8859_1"), "UTF-8");
    	cv.setQUERY(query);
    	String[] G2_ID_MAP = request.getParameterValues("G2_ID_MAP[]");
    	cv.setG2_ID_MAP(G2_ID_MAP);
		List attQList = commonService.selectAttResult(cv);
		model.addAttribute("attQList", attQList);		
        return "jsonView";
	}	
    
    //편집 이력 조회 - Yu_mk
    @RequestMapping(value = "/common/editHis.do")
    public String editHis(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {		
    	SearchEditHisVO ev = new SearchEditHisVO();
    	String tablename = StringUtil.nvl( request.getParameter("tablename"));
    	String userId;
    	try {
    		userId = request.getParameter("userId");
    		ev.setG2_USER(userId);
		} catch (Exception e) {
		}
    	ev.setTABLENAME(tablename);
    	ev.setTABLENAME_EDIT(tablename+"_EDIT");
		List editHisList = commonService.selectEditHis(ev);
		model.addAttribute("editHisList", editHisList);		
        return "jsonView";
	}
    
    /**
     * 공통 코드를 추출
     * 
     * @param model
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value="/common/cmdCdeXml.do")
    public void cmdCdeXml(ModelMap model, HttpServletRequest request, HttpServletResponse response)
    		throws Exception {
    	
    	String param = StringUtil.nvl( request.getParameter("param"));
    	String content_id = StringUtil.nvl( request.getParameter("content_id")); // 테이블 이름
    	String code_id = StringUtil.nvl( request.getParameter("code_id")); // 컬럼 이름
    	
    	CodeVO cv = new CodeVO();
    	cv.setCONTENT_ID(content_id);
    	cv.setCODE_ID(code_id);
    	cv.setCODE( param );
    	
    	StringBuffer xmlSb = new StringBuffer();
    	String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
    	xmlSb.append(xmlHeader);
    	
    	List xmlData = commonService.selectCd(cv);
    	
    	if( xmlData!=null) {
    		xmlSb.append("<code>");
    		
    		for (int i = 0; i < xmlData.size(); i++) {
    			cv = (CodeVO) xmlData.get(i);
    			xmlSb.append("<item>");
    			xmlSb.append("<code_value>"+cv.getCODE()+"</code_value>");
    			xmlSb.append("<code_name>"+cv.getVAL()+"</code_name>");
    			xmlSb.append("</item>");
    		}
    		xmlSb.append("</code>");
    	}
    	
    	response.setContentType("application/xml");
    	response.setCharacterEncoding("utf-8");
    	response.setHeader("Cache-Control", "no-cache");
    	response.getWriter().print( xmlSb.toString() );
    }
    
    /**
	 * 파일 다운로드 처리
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value = "/common/downloadFile.do")
	public void downloadFile(
			@ModelAttribute FileInfoVO searchVO, 
			HttpServletResponse response, Model model) 
	throws Exception {

		FileInfoVO FVO =  searchVO;
		
		if( FVO!=null ) {
			try {
				String fileName = FVO.getFILE_NM();
				String subPath = FVO.getFILE_COURS();
				String uploadPath = fileUploadProperties.getProperty("system.uploadpath")+File.separator+subPath;
				
				File uFile = new File(uploadPath, fileName);
				int fSize = (int) uFile.length();
		
				if (fSize > 0) {
					BufferedInputStream in = new BufferedInputStream(
							new FileInputStream(uFile));
					// String mimetype = servletContext.getMimeType(requestedFile);
					String mimetype = "text/html";
		
					response.setBufferSize(fSize);
					response.setContentType(mimetype);
					response.setHeader("Content-Disposition", "attachment; filename=\""
							+ URLEncoder.encode(fileName,"UTF-8") + "\"");
					response.setContentLength(fSize);
		
					FileCopyUtils.copy(in, response.getOutputStream());
					in.close();
					response.getOutputStream().flush();
					response.getOutputStream().close();
				}
				else {
					//setContentType을 프로젝트 환경에 맞추어 변경
					response.setContentType("application/x-msdownload");
					PrintWriter printwriter = response.getWriter();
					printwriter.println("<html>");
					printwriter.println("<br><br><br><h2>파일이 손상되었습니다.</h2>");
					printwriter.println("<br><br><br><center><h3><a href='javascript: history.go(-1)'>Back</a></h3></center>");
					printwriter.println("<br><br><br>&copy; webAccess");
					printwriter.println("</html>");
					printwriter.flush();
					printwriter.close();
				}
			} catch(Exception e) {
				//setContentType을 프로젝트 환경에 맞추어 변경
				response.setContentType("application/x-msdownload");
				PrintWriter printwriter = response.getWriter();
				printwriter.println("<html>");
				printwriter.println("<br><br><br><h2>파일을 찾을 수 없습니다.</h2>");
				printwriter.println("<br><br><br><center><h3><a href='javascript: history.go(-1)'>Back</a></h3></center>");
				printwriter.println("<br><br><br>&copy; webAccess");
				printwriter.println("</html>");
				printwriter.flush();
				printwriter.close();
			}
		}
	}

    /**
	 * JSP 호출작업만 처리하는 공통 함수
	 */
	@RequestMapping(value="/EgovPageLink.do")
	public String moveToPage(@RequestParam("link") String linkPage){
		String link = linkPage;
		// service 사용하여 리턴할 결과값 처리하는 부분은 생략하고 단순 페이지 링크만 처리함
		if (linkPage==null || linkPage.equals("")){
			link="egovframework/com/cmm/egovError";
		}
		return link;
	}
	
    /**
	 * validato rule dynamic Javascript
	 */
	@RequestMapping("/validator.do")
	public String validate(){
		return "/usolver/com/cmm/validator";
	}
	
	/**
	 * 통계 대상 시설물(상수관로, 급수관, 공업용수관)에 해당하는 시설물 조건 값을 XML로 반환
	 * 
	 * @param ftrCd  - 통계 대상 시설물
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/common/statisticXml.do")
	public void statisticXml(
			String param
			,HttpServletRequest request
			,HttpServletResponse response) throws IOException {
 
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
    	xmlSb.append("<code>");
		xmlSb.append("<item>");
		xmlSb.append("<code_value>" + " " + "</code_value>");
		xmlSb.append("<code_name>" + " " + "</code_name>");
		xmlSb.append("</item>");
    	xmlSb.append("</code>");

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
	}
	
	//공사번호로 OBJECTID 가져오기
    @RequestMapping(value="/AjaxGetConsMaOID.do")
    public String AjaxGetConsMaOID(
    		Model model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	String sCntNum = request.getParameter("CNT_NUM");
    	String sType = request.getParameter("TYPE");
    	if (sType.toLowerCase().equals("road")) {
    		sType = "RDT";
    	} else if (sType.toLowerCase().equals("water")) {
    		sType = "WTT";
    	} else if (sType.toLowerCase().equals("sewer")) {
    		sType = "SWT";
    	}
		model.addAttribute("OBJECTID", commonService.GetConsMaOID(sType, sCntNum));
        return "jsonView";
     }
    
	//구주소로 새주소 가져오기
    @RequestMapping(value="/AjaxGetNewAddr.do")
    public String AjaxGetNewAddr(
    		Model model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	String sBjdCde = StringUtil.nvl(request.getParameter("BJD_CDE"));
    	String sOldSan = StringUtil.nvl(request.getParameter("OLD_SAN"));
    	String sOldBon = StringUtil.nvl(request.getParameter("OLD_BON"));
    	String sOldBub = StringUtil.nvl(request.getParameter("OLD_BUB"));
    	
    	String sNewAdr = commonService.getNewAddr(sBjdCde, sOldSan, sOldBon, sOldBub);
    	if (sNewAdr != null && !sNewAdr.equals("")) {
        	String[] aNewAdr = sNewAdr.split(",");
        	
    		model.addAttribute("NEW_ROD", aNewAdr[0]);
    		model.addAttribute("NEW_BON", aNewAdr[1]);
    		model.addAttribute("NEW_BUB", aNewAdr[2]);
    		if (aNewAdr.length == 4) model.addAttribute("NEW_DES", aNewAdr[3]);
    	}
        return "jsonView";
     }
    

    @RequestMapping(value="/getMng_auth_prof.do")
    public String getMng_auth_prof(
    		ModelMap model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, request.getParameter("auth_id")));
        return "jsonView";
    }
    
	//레이어 편집 : 위치에 따른 필수값 리턴
    //소스테이블명, 소스필드명, OID
    @RequestMapping(value="/setLayerAttr.do")
    public String setLayerAttr(Model model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	String sTABLENAME = StringUtil.nvl(request.getParameter("TABLENAME"));
    	String sTABLEALIAS = StringUtil.nvl(request.getParameter("TABLEALIAS"));
    	String sFIELDNAME = "";
    	String sDEFAULTVALUE = "";
    	String sOBJECTID = StringUtil.nvl(request.getParameter("OBJECTID"));
    	String sFtrIdn = "";
    	String sUPDATESQL = "";
    	String sDATATYPE = "";
		String currentDate = new SimpleDateFormat("yyyyMMdd").format(new Date());
    	LoginVO usr = (LoginVO) session.getAttribute("system_user");
    	
    	List gdbFields = commonService.getGdbFields(sTABLENAME);
    	if (gdbFields != null  && gdbFields.size() > 0) {
    		for (int i = 0; i < gdbFields.size(); i++) {
    			sFIELDNAME = ((Map)gdbFields.get(i)).get("FIELDNAME").toString().toUpperCase();
    			sDATATYPE = ((Map)gdbFields.get(i)).get("DATATYPE").toString().toUpperCase();
    			
    			//숫자 필드는 0으로 처리 FTR_IDN, SEC_IDN 제외
    			if (sDATATYPE.equals("INT") || sDATATYPE.equals("SINGLE") 
    					|| sDATATYPE.equals("FLOAT") || sDATATYPE.equals("DOUBLE")) {
    				if (!sFIELDNAME.equals("FTR_IDN") && !sFIELDNAME.equals("SEC_IDN")
    					&& !sFIELDNAME.equals("SYS_LEN") && !sFIELDNAME.equals("SYS_ARA")) {
        		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
        		    	sUPDATESQL += sFIELDNAME + " = 0";
    				}
    			}
    			
    			if (sFIELDNAME.equals("FTR_IDN")) {
    				sFtrIdn = commonService.getNewID(sTABLENAME, sFIELDNAME);
    		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
    		    	sUPDATESQL += sFIELDNAME + " = " + sFtrIdn;
    			} else if (sFIELDNAME.equals("HJD_CDE") || sFIELDNAME.equals("HJG_CDE") || sFIELDNAME.equals("SHT_NUM")
    					|| sFIELDNAME.equals("SEC_IDN") || sFIELDNAME.equals("BLK_NUM") || sFIELDNAME.equals("BJD_CDE")) {
    		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
    		    	sUPDATESQL += sFIELDNAME + " = (SELECT FN_SETLAYERATTR('" + sFIELDNAME +
    		    			"', (SELECT shape FROM " + sTABLENAME + " WHERE OBJECTID = " + sOBJECTID + ")) FROM DUAL)";
    			} else if (sFIELDNAME.equals("SHP_YMD") || sFIELDNAME.equals("ATR_YMD") || sFIELDNAME.equals("BOA_YMD")
    					|| sFIELDNAME.equals("DIE_YMD") || sFIELDNAME.equals("IST_YMD")) {
    		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
    		    	sUPDATESQL += sFIELDNAME + " = '" + currentDate + "'";
    			} else if (sFIELDNAME.equals("SHP_NAM") || sFIELDNAME.equals("ATR_NAM")) {
    		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
    		    	sUPDATESQL += sFIELDNAME + " = '" + usr.getUSER_NAME() + "'";
    			} else if (sFIELDNAME.equals("SYS_ARA")) {
    		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
    		    	sUPDATESQL += sFIELDNAME + " = (SELECT SDE.ST_AREA(SHAPE) FROM "
    		    			+ sTABLENAME + " WHERE OBJECTID = " + sOBJECTID + ")";
    			} else if (sFIELDNAME.equals("SYS_LEN")) {
    		    	if (!sUPDATESQL.equals("")) sUPDATESQL += ",";
    		    	sUPDATESQL += sFIELDNAME + " = (SELECT SDE.ST_LENGTH(SHAPE) FROM "
    		    			+ sTABLENAME + " WHERE OBJECTID = " + sOBJECTID + ")";
    			} else if (sFIELDNAME.endsWith("FTR_CDE")) {
    				sDEFAULTVALUE = ((Map)gdbFields.get(i)).get("DEFAULTVALUE").toString().toUpperCase();
    			}
			}
	    	commonService.setLayerAttr(sTABLENAME, sUPDATESQL, sOBJECTID);
    	}
    	//추가 이력 저장
    	UsvBookLogVO vo = new UsvBookLogVO();
    	if (sTABLENAME.substring(0, 3).toUpperCase().equals("RDL"))
    		vo.setSYS_TYP("road");
    	else if (sTABLENAME.substring(0, 3).toUpperCase().equals("WTL"))
    		vo.setSYS_TYP("water");
    	else if (sTABLENAME.substring(0, 3).toUpperCase().equals("SWL"))
    		vo.setSYS_TYP("sewer");
    	vo.setTAG_NAM(sTABLENAME);
    	vo.setTAG_ALS(sTABLEALIAS);
    	vo.setTAG_IDN(sDEFAULTVALUE + "_" + sFtrIdn);
    	vo.setCUD_CDE("I");
    	vo.setCHG_UID(usr.getUSER_ID());
    	vo.setCHG_NAM(usr.getUSER_NAME());
    	vo.setCHG_DPT(usr.getUSER_DEPT());
    	/*vo.setCHG_UDT(usr.getUSER_DEPT_M_UPPER());*/
		commonService.InsertBookLog(vo);

    	/*//계량기 도형입력 시 교체이력 추가
    	/*if (sTABLENAME.equals("WTL_META_PS")) {
			WttMetaHtVO metaHtVO = new WttMetaHtVO();
			metaHtVO.setFTR_CDE("SA122");
			metaHtVO.setFTR_IDN(sFtrIdn);
			metaHtVO.setCHG_NUM("1");
			//metaHtVO.setNME_CNT("0");
			metaHtVO.setCHG_YMD(currentDate);
			//metaHtVO.setMNG_CDE("MNG001");
			//metaHtVO.setFTR_NUM("0");
    		metaHtVO.setSystem_user_id( usr.getUSER_ID() );
    		metaHtVO.setSystem_user_nm( usr.getUSER_NAME() );
			wttMetaHtService.wttMetaHtInsert(metaHtVO);
    	}*/
    	
		model.addAttribute("FTR_IDN", sFtrIdn);
        return "jsonView";
     }
      
    
    /*@RequestMapping(value="/common/deleteRWS_HT.do")
    public String deleteRWS_HT(
			@ModelAttribute WttImgeEtVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	try {
    		resultCnt = commonService.deleteRWS_HT(searchVO);
    		resultMsg = "DELETE_SUCCESS";

        	//도형삭제 이력 저장
        	LoginVO usr = (LoginVO) session.getAttribute("system_user");
        	UsvBookLogVO vo = new UsvBookLogVO();
        	String sLayerAlias = request.getParameter("LAYERALIAS");
        	String sLayerName = "";
        	if (sLayerAlias.equals("보안등")) sLayerName = "RDL_SCLT_PS";
        	if (sLayerAlias.equals("굴착허가위치")) sLayerName = "RDL_EXCV_AS";
        	if (sLayerAlias.equals("급수관로")) {
        		sLayerAlias = "급수관";
        		sLayerName = "WTL_SPLY_LS";
        	}
        	if (sLayerAlias.equals("급수전계량기")) sLayerName = "WTL_META_PS";
        	if (sLayerAlias.equals("소방시설")) sLayerName = "WTL_FIRE_PS";
        	if (sLayerName.substring(0, 3).toUpperCase().equals("RDL"))
        		vo.setSYS_TYP("road");
        	else if (sLayerName.substring(0, 3).toUpperCase().equals("WTL"))
        		vo.setSYS_TYP("water");
        	else if (sLayerName.substring(0, 3).toUpperCase().equals("SWL"))
        		vo.setSYS_TYP("sewer");
        	vo.setTAG_NAM(sLayerName);
        	vo.setTAG_ALS(request.getParameter("LAYERALIAS"));
        	vo.setTAG_IDN(searchVO.getFTR_CDE() + "_" + searchVO.getFTR_IDN());
        	vo.setCUD_CDE("E");
        	vo.setCHG_UID(usr.getUSER_ID());
        	vo.setCHG_NAM(usr.getUSER_NAME());
        	vo.setCHG_DPT(usr.getUSER_DEPT());
        	vo.setCHG_UDT(usr.getUSER_DEPT_M_UPPER());
    		commonService.InsertBookLog(vo);
    	} catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "삭제 오류 발생";
    	}
        return "jsonView";
    }*/
    
	@RequestMapping(value="/common/InsertBookLog.do")
	public String InsertBookLog(
			@ModelAttribute UsvBookLogVO vo,
			ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {

    	LoginVO usr = (LoginVO) session.getAttribute("system_user");
    	vo.setCHG_UID(usr.getUSER_ID());
    	vo.setCHG_NAM(usr.getUSER_NAME());
    	vo.setCHG_DPT(usr.getUSER_DEPT());
    	/*vo.setCHG_UDT(usr.getUSER_DEPT_M_UPPER());*/
    	//vo.setLOG_NUM(commonService.getMaxID("USV_BOOK_LOG", "LOG_NUM", "TAG_ALS", vo.getTAG_ALS(), "TAG_IDN", vo.getTAG_IDN()));
    	
		commonService.InsertBookLog(vo);
        return "jsonView";
	}

    @RequestMapping(value="/common/usvBookLogList.do")
    public String wtlAodrAsList(@ModelAttribute UsvBookLogVO vo,
    		ModelMap model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	
       	model.addAttribute("tag_als_list", commonService.usvBookLogTagAls(vo));
        model.addAttribute("result", vo);
        
    	return "/common/usvBookLogList";
    }
    
    @RequestMapping(value="/common/usvBookLogTagAls.do")
    public void usvBookLogTagAls(ModelMap model, HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        
    	String param = StringUtil.nvl( request.getParameter("param") );
    	
        UsvBookLogVO usvBookLogVO = new UsvBookLogVO();
        usvBookLogVO.setSYS_TYP(param);
 
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        List xmlData = commonService.usvBookLogTagAls(usvBookLogVO);
        
        if( xmlData!=null) {
        	xmlSb.append("<code>");

        	for (int i = 0; i < xmlData.size(); i++) {
        		usvBookLogVO = (UsvBookLogVO) xmlData.get(i);
        		xmlSb.append("<item>");
        		xmlSb.append("<code_value>"+usvBookLogVO.getTAG_ALS()+"</code_value>");
        		xmlSb.append("<code_name>"+usvBookLogVO.getTAG_ALS()+"</code_name>");
        		xmlSb.append("</item>");
			}
        	xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    }
    
    @RequestMapping(value="/common/usvBookLogListXml.do")
    public void usvBookLogListXml(@ModelAttribute UsvBookLogVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws Exception {
    	
    	int page = StringUtil.parseInt( request.getParameter("page"));
    	int rows = StringUtil.parseInt( request.getParameter("rows"));
    	String sidx = StringUtil.nvl( request.getParameter("sidx"));
    	String sord = StringUtil.nvl( request.getParameter("sord"));
    	
    	int firstIndex = rows * page - rows;
    	
    	searchVO.setFirstIndex(firstIndex);
		searchVO.setLastIndex(firstIndex+rows);
		
		// 정렬순서 (필수)
		if( sidx.equals("") )
			searchVO.setOrderByColumn("LOG_NUM");
		else
			searchVO.setOrderByColumn(sidx);
		if( sord.equals("") )
			searchVO.setOrderByType("DESC");
		else
			searchVO.setOrderByType(sord);
    	
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        // DB 요청
        List xmlData = null;
        int total_count = 0;
        
    	xmlData = commonService.usvBookLogList(searchVO);
    	total_count = commonService.usvBookLogListCnt(searchVO);
        
        int total_page = 0;
        if( total_count>0 )
        	total_page = (int) Math.ceil( (float)total_count/(float)rows );

        xmlSb.append("<rows>");
        xmlSb.append("<page>"+page+"</page>");
        xmlSb.append("<total>"+total_page+"</total>");
        xmlSb.append("<records>"+total_count+"</records>");
        
        if( xmlData!=null) {
        	
        	UsvBookLogVO rs = new UsvBookLogVO();
        	
        	for (int i = 0; i < xmlData.size(); i++) {
        		rs = (UsvBookLogVO) xmlData.get(i);
        		if (rs.getCUD_CDE().equals("삭제") || rs.getCUD_CDE().equals("도형삭제")
        				|| rs.getCUD_CDE().equals("도형추가")) {
            		xmlSb.append("<Item>");
            		xmlSb.append("<LOG_IDN>"+rs.getLOG_IDN().toString()+"</LOG_IDN>");
            		xmlSb.append("<LOG_NUM>"+rs.getLOG_NUM().toString()+"</LOG_NUM>");
            		xmlSb.append("<SYS_TYP>"+StringUtil.stripNonValidXMLCharacters(rs.getSYS_TYP())+"</SYS_TYP>");
            		xmlSb.append("<TAG_NAM>"+StringUtil.stripNonValidXMLCharacters(rs.getTAG_NAM())+"</TAG_NAM>");
            		xmlSb.append("<TAG_ALS>"+StringUtil.stripNonValidXMLCharacters(rs.getTAG_ALS())+"</TAG_ALS>");
            		xmlSb.append("<TAG_IDN>"+StringUtil.stripNonValidXMLCharacters(rs.getTAG_IDN())+"</TAG_IDN>");
            		xmlSb.append("<CUD_CDE>"+StringUtil.stripNonValidXMLCharacters(rs.getCUD_CDE())+"</CUD_CDE>");
            		xmlSb.append("<CHG_UID>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_UID())+"</CHG_UID>");
            		xmlSb.append("<CHG_NAM>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_NAM())+"</CHG_NAM>");
            		xmlSb.append("<CHG_DPT>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_DPT())+"</CHG_DPT>");
            		xmlSb.append("<CHG_UDT>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_UDT())+"</CHG_UDT>");
            		xmlSb.append("<CHG_YMD>"+rs.getCHG_YMD().toString()+"</CHG_YMD>");
            		xmlSb.append("</Item>");
        		} else {
            		String delimit = "\\|";
            		String[] arrCOL_NAM = rs.getCOL_NAM().split(delimit);
            		String[] arrCOL_ALS = rs.getCOL_ALS().split(delimit);
            		String[] arrBEF_VAL = rs.getBEF_VAL().split(delimit);
            		String[] arrAFT_VAL = rs.getAFT_VAL().split(delimit);
            		for (int j = 0; j < arrCOL_NAM.length; j++) {
                		xmlSb.append("<Item>");
                		xmlSb.append("<LOG_IDN>"+rs.getLOG_IDN().toString()+"</LOG_IDN>");
                		xmlSb.append("<LOG_NUM>"+rs.getLOG_NUM().toString()+"</LOG_NUM>");
                		xmlSb.append("<SYS_TYP>"+StringUtil.stripNonValidXMLCharacters(rs.getSYS_TYP())+"</SYS_TYP>");
                		xmlSb.append("<TAG_NAM>"+StringUtil.stripNonValidXMLCharacters(rs.getTAG_NAM())+"</TAG_NAM>");
                		xmlSb.append("<TAG_ALS>"+StringUtil.stripNonValidXMLCharacters(rs.getTAG_ALS())+"</TAG_ALS>");
                		xmlSb.append("<TAG_IDN>"+StringUtil.stripNonValidXMLCharacters(rs.getTAG_IDN())+"</TAG_IDN>");
                		xmlSb.append("<CUD_CDE>"+StringUtil.stripNonValidXMLCharacters(rs.getCUD_CDE())+"</CUD_CDE>");
                		xmlSb.append("<COL_NAM>"+StringUtil.stripNonValidXMLCharacters(arrCOL_NAM[j])+"</COL_NAM>");
                		xmlSb.append("<COL_ALS>"+StringUtil.stripNonValidXMLCharacters(arrCOL_ALS[j])+"</COL_ALS>");
                		if (request.getParameter("MTA_CHK").equals("1")) {
                			String sFieldAlias = commonService.getFieldAliasByFieldName(rs.getTAG_NAM(), arrCOL_NAM[j]);
                			if (sFieldAlias == null || sFieldAlias.equals(""))
                				xmlSb.append("<COL_ALS_META>"+commonService.getFieldAliasByFieldName(null, arrCOL_NAM[j])+"</COL_ALS_META>");
                			else
                				xmlSb.append("<COL_ALS_META>"+sFieldAlias+"</COL_ALS_META>");
                		}
                		xmlSb.append("<BEF_VAL>"+StringUtil.stripNonValidXMLCharacters(arrBEF_VAL[j])+"</BEF_VAL>");
                		xmlSb.append("<AFT_VAL>"+StringUtil.stripNonValidXMLCharacters(arrAFT_VAL[j])+"</AFT_VAL>");
                		xmlSb.append("<CHG_UID>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_UID())+"</CHG_UID>");
                		xmlSb.append("<CHG_NAM>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_NAM())+"</CHG_NAM>");
                		xmlSb.append("<CHG_DPT>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_DPT())+"</CHG_DPT>");
                		xmlSb.append("<CHG_UDT>"+StringUtil.stripNonValidXMLCharacters(rs.getCHG_UDT())+"</CHG_UDT>");
                		xmlSb.append("<CHG_YMD>"+rs.getCHG_YMD().toString()+"</CHG_YMD>");
                		xmlSb.append("</Item>");	
    				}
        		}
			}
        }
        xmlSb.append("</rows>");
        
        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    } 

	@RequestMapping(value="/common/getUsvComponentSize.do")
	public String getUsvComponentSize(
			@ModelAttribute EtcMapEtVO vo,
			ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {

		List usvComponentList = etcMapEtService.etcUsvComponentSearch(vo);
		model.addAttribute("W", ((EtcMapEtVO)usvComponentList.get(0)).getWIDTH());
		model.addAttribute("H", ((EtcMapEtVO)usvComponentList.get(0)).getHEIGHT());
    	
        return "jsonView";
	}
}
