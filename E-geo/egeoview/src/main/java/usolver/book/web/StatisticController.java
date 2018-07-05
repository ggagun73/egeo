/*
 * BaseContoller.java
 * 프로토타입
 */
package usolver.book.web;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.book.service.RegisterService;
import usolver.book.service.StatisticService;
import usolver.book.util.RegisterUtil;
import usolver.book.vo.StatisticVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.ExcelView;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.CodeVO;
import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

import egovframework.com.cmm.service.Globals;

/**  
 * @Class Name : StatisticController.java
 * @Description : StatisticController.Class
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
public class StatisticController {
	    
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name = "fileUploadProperties")
    Properties fileUploadProperties;
    
    @Resource(name = "statisticService")
    StatisticService statisticService;
    
	/** RegisterService */
	@Resource(name = "registerService")
	private RegisterService registerService;
	
    /** CommonService */
    @Resource(name = "commonService")
    private CommonService commonService;
    
    /** Validator */
    //@Resource(name = "beanValidator")
	//protected DefaultBeanValidator beanValidator;
    
    @Autowired
    private MessageSource messageSource;
    
    /** LOG4J */
    private Logger log = Logger.getLogger(this.getClass());
    
    
    /**
     * 총괄현황
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/book/regsiterTotalStat.do")
    public String regsiterTotalStat(ModelMap model, HttpServletRequest request) 
            throws Exception {    	
    	
    	String system = request.getParameter("MenuId");
    	
    	// [코드 데이터 추출]
    	CodeVO cv = new CodeVO();
        // 행정구
        model.addAttribute("hjd_cd_list", commonService.selectHjgCde(cv));
        // 행정동
        model.addAttribute("hjd_cde_list", commonService.selectHjdCde(cv));
        
 
        model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
        model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
        
        
        String sFileName = RegisterUtil.viewFileName(system, "statistic");
        String formView=sFileName+"TotalStat";

        System.out.println("ssssssssssssssssssssssssssssssssssssss formView =>"+formView);
     	return formView;

    }
    
    
    /**
     * 상수도대장 총괄현황
     * 
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/book/wtlTotalStatXml.do")
    public String waterTotalStatXml(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        
		if (searchVO.getCOLUMN().equals("HJG_CDE")) {
			searchVO.setCOLUMN("SUBSTR(HJD_CDE, 1, 5)");
		}
		
        Map cntMap = new HashMap();
       // 상단
        
        String[] sTableList ={"WTL_HEAD_PS","WTL_GAIN_PS","WTL_PURI_AS","WTL_PRES_PS","WTL_SERV_PS","WTL_META_PS","WTL_RSRV_PS","WTL_PRGA_PS","WTL_FLOW_PS","WTL_STPI_PS"}; 
        
        for(int i=0; i < sTableList.length; i++){
    		
    		String g2Camel = JdbcUtils.convertUnderscoreNameToPropertyName(sTableList[i]);
    		searchVO.setTABLENAME(sTableList[i]);
    		searchVO.setRESULTTYPE("COUNT");
    		
    		cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    	}

        searchVO.setTABLENAME("WTL_FIRE_PS");
        searchVO.setSUBQUERY(" AND FTR_CDE = 'SA118'  ");
        cntMap.put("wtlFirePs1", statisticService.registerTotalStat(searchVO));
        searchVO.setSUBQUERY(" AND FTR_CDE = 'SA119'  ");
        cntMap.put("wtlFirePs2", statisticService.registerTotalStat(searchVO));
        
      	

    	model.addAttribute("r", cntMap);
        
    /*	상수관로 : 취수관, 도수관, 송수관, 배수관, 공업용수관*/
        Map pipeMap = new HashMap();
        List wtlPipeLmList = statisticService.wtlPipeLmStatList(searchVO);
        for (int i = 0; i < wtlPipeLmList.size(); i++) {
			Map m = (Map)wtlPipeLmList.get(i);
			if (m.get("CODE").toString().equals("SAA001")) {
				pipeMap.put("wtlPipeLmCnt001", m.get("PIP_LEN").toString());
			} else if (m.get("CODE").toString().equals("SAA002")) {
				pipeMap.put("wtlPipeLmCnt002", m.get("PIP_LEN").toString());
			} else if (m.get("CODE").toString().equals("SAA003")) {
				pipeMap.put("wtlPipeLmCnt003", m.get("PIP_LEN").toString());
			} else if (m.get("CODE").toString().equals("SAA004")) {
				pipeMap.put("wtlPipeLmCnt004", m.get("PIP_LEN").toString());
			} else if (m.get("CODE").toString().equals("SAA010")) {
				pipeMap.put("wtlPipeLmCnt010", m.get("PIP_LEN").toString());
			}
		}
    	model.addAttribute("pipeCnt", pipeMap);
    	
/*
    	급수관로 : 급수관, 소방관*/
        Map splyMap = new HashMap();
        List wtlSplyLsList = statisticService.wtlSplyLsStatList(searchVO);
        for (int i = 0; i < wtlSplyLsList.size(); i++) {
			Map m = (Map)wtlSplyLsList.get(i);
			if (m.get("CODE").toString().equals("SAA005")) {
				splyMap.put("wtlSplyLsCnt005", m.get("PIP_LEN").toString());
			} else if (m.get("CODE").toString().equals("SAA020")) {
				splyMap.put("wtlSplyLsCnt020", m.get("PIP_LEN").toString());
			}
		}
    	model.addAttribute("splyCnt", splyMap);
    	
    	
 /*   	변류시설    pip_saa 필드 존재 안함*/
    	Map valvMap = new HashMap();
        List wtlValvPsList = statisticService.wtlValvPsStatList(searchVO);
        for (int i = 0; i < wtlValvPsList.size(); i++) {
			Map m = (Map)wtlValvPsList.get(i);
			if (m.get("CODE").toString().equals("SA200")) {
				valvMap.put("wtlValvPsCnt200", m.get("CNT").toString());
			} else if (m.get("CODE").toString().equals("SA201")) {
				valvMap.put("wtlValvPsCnt201", m.get("CNT").toString());
			} else if (m.get("CODE").toString().equals("SA202")) {
				valvMap.put("wtlValvPsCnt202", m.get("CNT").toString());
			} else if (m.get("CODE").toString().equals("SA203")) {
				valvMap.put("wtlValvPsCnt203", m.get("CNT").toString());
			} else if (m.get("CODE").toString().equals("SA204")) {
				valvMap.put("wtlValvPsCnt204", m.get("CNT").toString());
			} else if (m.get("CODE").toString().equals("SA205")) {
				valvMap.put("wtlValvPsCnt205", m.get("CNT").toString());
			} else if (m.get("CODE").toString().equals("SA207")) {
				valvMap.put("wtlValvPsCnt207", m.get("CNT").toString());
			}						
		}
        model.addAttribute("valvCnt", valvMap);
        
        return "jsonView";
	}
	
    /**
     * 하수도 대장 총괄현황
     * 
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/book/swlTotalStatXml.do")
    public String sewerTotalStatXml(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        
		if (searchVO.getCOLUMN().equals("HJG_CDE")) {
			searchVO.setCOLUMN("SUBSTR(HJD_CDE, 1, 5)");
		}
		
		if (searchVO.getCOLUMN().equals("HJG_CDE")) {
			searchVO.setCOLUMN("SUBSTR(HJD_CDE, 1, 5)");
		}
		
        Map cntMap = new HashMap();
        
        //테이블 목록을 가져온다. SELECT * FROM G2S_DATASET WHERE G2_NAME LIKE 'WTL%' ORDER BY G2_ALIAS ASC;
    	JSONObject jCondition = new JSONObject();   	
    	List tableList = registerService.registerGetSelectColumnList("G2S_DATASET","G2_NAME, G2_ALIAS", jCondition, "AND G2_NAME LIKE 'SWL%' ORDER BY G2_ALIAS ASC");
    	
    	for(int i=0; i <tableList.size(); i++){
    		
    		Map mData = (Map)tableList.get(i);
    		
    		String g2Name = mData.get("g2Name").toString();
    		String g2Camel = JdbcUtils.convertUnderscoreNameToPropertyName(g2Name);
    		
    		searchVO.setTABLENAME(g2Name);
    		if( g2Name.equals("SWL_PIPE_LM") || g2Name.equals("SWL_CONN_LS")   ) searchVO.setRESULTTYPE("PIP_LEN");
    		else if( g2Name.equals("SWL_SIDE_LS") ) searchVO.setRESULTTYPE("SID_LEN");
    		else searchVO.setRESULTTYPE("COUNT");
    		
    		//HJD_CDE 가 없는 테이블들입니다. 
    		String[] sExcept ={"SWL_PIPE_AS","SWL_DEPT_PS","SWL_AODP_AS","SWL_DODP_AS","SWL_AODR_AS","SWL_DODR_AS","SWT_CONS_MA","SWL_DEPT_PS1"}; 

    		if( searchVO.getCOLUMN().contains("HJD_CDE") ){    			
    			if( !RegisterUtil.chekExcept(sExcept, g2Name)  ){
    				cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    			}else {    				
    				cntMap.put(g2Camel,"-");
    			}    			
    		}else {
    			cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    		}
    	}
    	
    	String[] sTableList ={"SWT_CONS_MA"};
		
    	for(int i=0; i < sTableList.length; i++){
    		
    		String g2Camel = JdbcUtils.convertUnderscoreNameToPropertyName(sTableList[i]);
    		searchVO.setTABLENAME(sTableList[i]);
    		searchVO.setRESULTTYPE("COUNT");
    		
    		if( searchVO.getCOLUMN().contains("HJD_CDE") ){
    			cntMap.put(g2Camel,"-");
    		}else {
    			cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    		}
    	}
    	
    	System.out.println("~~~~~~~~~~~~~~~~~~~~~~~  cntMap ="+cntMap);
    	model.addAttribute("r", cntMap);
                
        return "jsonView";

	}
	
	
	 /**
     * 도로 대장 총괄현황
     * 
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/book/rdlTotalStatXml.do")
    public String roadTotalStatXml(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        
		if (searchVO.getCOLUMN().equals("HJG_CDE")) {
			searchVO.setCOLUMN("SUBSTR(HJD_CDE, 1, 5)");
		}
		
        Map cntMap = new HashMap();
        
        //테이블 목록을 가져온다. SELECT * FROM G2S_DATASET WHERE G2_NAME LIKE 'WTL%' ORDER BY G2_ALIAS ASC;
    	JSONObject jCondition = new JSONObject();   	
    	List tableList = registerService.registerGetSelectColumnList("G2S_DATASET","G2_NAME, G2_ALIAS", jCondition, "AND G2_NAME LIKE 'RDL%' ORDER BY G2_ALIAS ASC");
    	
    	for(int i=0; i <tableList.size(); i++){
    		
    		Map mData = (Map)tableList.get(i);
    		
    		String g2Name = mData.get("g2Name").toString();
    		String g2Camel = JdbcUtils.convertUnderscoreNameToPropertyName(g2Name);
    		
    		searchVO.setTABLENAME(g2Name);
    		if( g2Name.equals("RDL_CTLR_LS") ) searchVO.setRESULTTYPE("RDL_LEN");
    		else searchVO.setRESULTTYPE("COUNT");
    		
    		if( searchVO.getCOLUMN().contains("HJD_CDE") ){
    			if( !g2Name.equals("RDL_RBLN_LS") && !g2Name.equals("RDL_RDAR_AS") ){
    				cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    			}else {
    				cntMap.put(g2Camel,"-");
    			}
    		}else {
    			cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    		}
    	}
    	
    	String[] sTableList ={"RDT_RDWY_DT","RDT_SDWK_DT","RDT_ROUT_DT","RDT_IPCR_DT","RDT_RNDW_DT","RDT_CLBM_DT","RDT_EXDS_DT","RDT_EXAL_DT","RDT_OCAL_DT","RDT_RSER_MA","RDT_CONS_MA"};
		
    	for(int i=0; i < sTableList.length; i++){
    		
    		String g2Camel = JdbcUtils.convertUnderscoreNameToPropertyName(sTableList[i]);
    		searchVO.setTABLENAME(sTableList[i]);
    		searchVO.setRESULTTYPE("COUNT");
 		    		
    		if( searchVO.getCOLUMN().contains("HJD_CDE") ){
    			if(sTableList[i].equals("RDT_RDWY_DT") || sTableList[i].equals("RDT_SDWK_DT")){
    		 			cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    			}else {
    				cntMap.put(g2Camel,"-");
    			}
    		}else {
    			cntMap.put(g2Camel,statisticService.registerTotalStat(searchVO));
    		}
    	}
    	
    	System.out.println("~~~~~~~~~~~~~~~~~~~~~~~  cntMap ="+cntMap);
    	model.addAttribute("r", cntMap);
                
        return "jsonView";
	}
	
	
    /**
     * 시설물별 통계현황조회 화면
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/book/registerStat.do")
    public String registerStat(ModelMap model, HttpServletRequest request) 
            throws Exception {
    	
    	String system = request.getParameter("MenuId");
    	String systemAbb = system.substring(0,3);
    	
    	System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~   systemAbb =>" +systemAbb);
    	
    	 //테이블 목록을 가져온다. SELECT * FROM G2S_DATASET WHERE G2_NAME LIKE 'WTL%' ORDER BY G2_ALIAS ASC;
    	JSONObject jCondition = new JSONObject();   	
    	List tableList = registerService.registerGetSelectColumnList("G2S_DATASET","G2_NAME, G2_ALIAS", jCondition, "AND G2_NAME LIKE '"+systemAbb+"%' ORDER BY G2_ALIAS ASC");
    	model.addAttribute("table_list", tableList );
    	
    	model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
        model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
          
    	
        String sFileName = RegisterUtil.viewFileName(system, "statistic");
        String formView=sFileName+"Stat";

        System.out.println("ssssssssssssssssssssssssssssssssssssss formView =>"+formView);
     	return formView;
    }
    
    
    /**
     * 해당 테이블의 필드를 불러와서 조건을 만들어 주자~~ 
     * 
     * @param name 시설물 코드
     * @param rowName 행 이름
     * @param row 행 코드
     * @param col 열 코드
     * @param response
     * @throws Exception
     */
	@RequestMapping(value="/book/registerStatCondition.do")
    public String registerStatConditionl(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {

    	String sTableName = request.getParameter("TABLENAME");
    	
    	HashMap parameterObject =  new HashMap();
    	parameterObject.put("TABLENAME", sTableName);
    	List selectColumnsList = registerService.selectColumnsList(parameterObject);
    	    	
    	List<String> sRowData = new ArrayList(); 
    	List<String> sRowCode  = new ArrayList(); 
    	List<String> sColData = new ArrayList(); 
    	List<String> sColCode = new ArrayList(); 
    	List<String> sResultField = new ArrayList(); 
    	
		System.out.println( "########################################    selectColumnsList ="+selectColumnsList);
		
    	for(int i=0; i<selectColumnsList.size();i++){
    		
    		Map map = (Map) selectColumnsList.get(i);
    		
    		String g2Column = map.get("enColumns").toString();
    		String g2ColumnName =  map.get("koColumns").toString(); 
    		String g2Domain =  map.get("g2Domain").toString(); 
    		
    		if(g2Column.equals("HJD_CDE")){ 
    			
    			sRowData.add("구");
    			sRowCode.add("HJG_CDE");
    			sRowData.add(g2ColumnName);
    			sRowCode.add(g2Column); 
    			    			
    		}else if( g2Column.contains("_CDE") || g2Column.contains("_YMD") || g2Column.contains("_DIP") ){
    			
    			if( !g2Domain.equals("1900") ){	//지형지물부호는 뽑지 맙시당... 
	    			sRowData.add(g2ColumnName);
	    			sRowCode.add(g2Column); 
    			}
    		}else if( g2Column.contains("_LEN") ){
    			sResultField.add(g2Column);
    		}
    	}
    	
    	//sRowData,  sRowCode  : 정렬순서 지정해 줘야하나? 
    	
    	//열은 행과 반대로 추가해주자~~ 
    	for(int i=sRowData.size(); i > 0; i--){    	
    		
    		String sData = sRowData.get(i-1).toString();
    		String sCode = sRowCode.get(i-1).toString();
    		
    		sColData.add(sData);
    		sColCode.add(sCode);
    	}
    	
    	 model.addAttribute("rowData", sRowData );
    	 model.addAttribute("rowCode", sRowCode );
    	 model.addAttribute("colData", sColData );
    	 model.addAttribute("colCode", sColCode );
    	 model.addAttribute("resultField", sResultField );
    	
    	return "jsonView";
    	
	}
	
    
    /**
     * 그외 현황화면
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/book/registerEtcStat.do")
    public String regsiterEtcStat(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    	

    	String system = request.getParameter("MenuId");
    	
    	String menuId =  StringUtil.nvl(request.getParameter("MenuId"));
    	
    	System.out.println("###########################################  menuId = "+ menuId);
    	
      	String jsonString = "{ \"WTL_YEAR_PIPE\"	: {\"TABLENAME\" : \"WTL_PIPE_LM\" , \"ROWFIELD\": \"IST_YMD\",  \"RESULTFIELD\" : \"PIP_LEN\" }, "
      						+"	\"WTL_MOP_PIPE\" :{\"TABLENAME\":\"WTL_PIPE_LM\", \"ROWFIELD\":\"MOP_CDE\",  \"RESULTFIELD\" : \"PIP_LEN\" }, "
      						+" \"WTL_DIP_PIPE\" : {\"TABLENAME\" : \"WTL_PIPE_LM\" , \"ROWFIELD\" : \"PIP_DIP\",  \"RESULTFIELD\" : \"PIP_LEN\" }, "
      						+" \"WTL_SAA_PIPE\" : {\"TABLENAME\": \"WTL_PIPE_LM\", \"ROWFIELD\" : \"SAA_CDE\",  \"RESULTFIELD\" : \"PIP_LEN\" },  "
      						+" \"WTL_VALV\" : {\"TABLENAME\" : \"WTL_VALV_PS\" , \"ROWFIELD\" : \"FTR_CDE\"}, "
      						+"	\"WTL_LEAK\" : {\"TABLENAME\": \"WTL_LEAK_PS\", \"ROWFIELD\" : \"LEK_YMD\"},"
      	
      						+"	\"SWL_YEAR_PIPE\" : {\"TABLENAME\" : \"SWL_PIPE_LM\" , \"ROWFIELD\" : \"IST_YMD\",  \"RESULTFIELD\" : \"PIP_LEN\" }, "
					      	+"	\"SWL_MOP_PIPE\" : {\"TABLENAME\" : \"SWL_PIPE_LM\" , \"ROWFIELD\" : \"MOP_CDE\",  \"RESULTFIELD\" : \"PIP_LEN\" }, "
					      	+"	\"SWL_DIP_PIPE\" : {\"TABLENAME\" : \"SWL_PIPE_LM\" , \"ROWFIELD\" : \"PIP_DIP\",  \"RESULTFIELD\" : \"PIP_LEN\" }, "
					      	+"	\"SWL_PIPE_DRDG\" : {\"TABLENAME\" : \"SWT_DRDG_HT\" , \"ROWFIELD\" : \"DRG_YMD\",  \"SUBTABLE\" : \"SWL_PIPE_LM\" }, "
					      	+"	\"SWL_MANH_DRDG\" : {\"TABLENAME\" : \"SWT_DRDG_HT\" , \"ROWFIELD\" : \"DRG_YMD\",  \"SUBTABLE\" : \"SWL_MANH_PS\" }, "
					      	
							+"	\"RDL_YEAR_EXAC\" : {\"TABLENAME\" : \"RDL_EXCV_AS\" , \"ROWFIELD\" : \"DIS_YMD\", \"COLFIELD\" : \"JYP_CDE\"}, "  //년도별 굴착현황 - 기준모호
					      	+"	\"RDL_ROUT_EXAC\" : {\"TABLENAME\" : \"RDL_EXCV_AS\" , \"ROWFIELD\" : \"SEC_IDN\", \"COLFIELD\" : \"JYP_CDE\"}, "  //노선별 굴착현황 - 기준모호
					      	+"	\"RDL_EXAC\" : {\"TABLENAME\" : \"RDL_EXCV_AS\" , \"ROWFIELD\" : \"HJD_CDE\", \"COLFIELD\" : \"JYP_CDE\"}, "  //행정구역별 굴착현황 - 기준모호					      	
					      	+"	\"RDL_YEAR_CTLR\" : {\"TABLENAME\" : \"RDL_CTLR_LS\" , \"ROWFIELD\" : \"FTR_CDE\", \"COLFIELD\" : \"GGB_CDE\"}, "		//년도별 도로현황=> 관계를 잘 모르겠음.. ㅠㅠ					      	
					      	+"	\"RDL_ROUT_CTLR\" : {\"TABLENAME\" : \"RDT_ROUT_DT\" , \"ROWFIELD\" : \"RUT_CDE\", \"COLFIELD\" : \"ADA_CDE\"  \"RESULTFIELD\" : \"RUT_LEN\"}, "	//노선별 도로현황
					      	+"	\"RDL_STLT\" : {\"TABLENAME\" : \"RDL_STLT_PS\" , \"ROWFIELD\" : \"FTR_CDE\"}, "		//가로등현황
					      	+"	\"RDL_RDSN\" : {\"TABLENAME\" : \"RDL_RDSN_PS\" , \"ROWFIELD\" : \"FTR_CDE\"}, "		//도로표지판현황
					      	+"	\"RDL_BYCP\" : {\"TABLENAME\" : \"RDL_BYCP_AS\" , \"ROWFIELD\" : \"FTR_CDE\"}}";		//자전거도로현황
      	
    	
      	JSONObject jsonObject1 = (JSONObject) new JSONParser().parse(jsonString);
      	
      	JSONObject jsonObject2 = (JSONObject) jsonObject1.get(menuId);
      	
      	System.out.println("###########################################  jsonObject2 = "+ jsonObject2);
      	
      	String sTableName = (String)jsonObject2.get("TABLENAME");
      	String sRowField = (String)jsonObject2.get("ROWFIELD");
      	String sColField  = (String)jsonObject2.get("COLFIELD");
      	String sResultField  = (String)jsonObject2.get("RESULTFIELD");    	
    	String sSubTable  = (String)jsonObject2.get("SUBTABLE");
      	
      	System.out.println("###########################################  sColField = "+ sColField);
      	System.out.println("###########################################  sSubTable = "+ sSubTable);
      	
      //Column ALias 가져와서 필드명 넣어주고.. 
      	
      	if( sRowField != null && !sRowField.equals("")){            		
    		String sRowAlias = commonService.getFieldAliasByFieldName(sTableName,sRowField);
    		System.out.println("###########################################  sRowAlias = "+ sRowAlias);
    		
    		if( sRowAlias == null )  sRowAlias = "구분";
    		model.addAttribute("ROWALIAS", sRowAlias );
    	}      	
      	
        model.addAttribute("TABLENAME", sTableName );
        model.addAttribute("ROWFIELD", sRowField );   
        model.addAttribute("COLFIELD", sColField );   
        model.addAttribute("SUBTABLE", sSubTable );   
        model.addAttribute("RESULTFIELD", sResultField );   
        
        model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
        model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
    	        
        String sFileName = RegisterUtil.viewFileName(system, "statistic");
        String formView=sFileName+"EtcStat";
        
        System.out.println("ssssssssssssssssssssssssssssssssssssss formView =>"+formView);
     	return formView;
    }

  
  /**
     * jqGrid의 열의 데이터를 XML로 반환
     * 
     * @param name 시설물 코드
     * @param rowName 행 이름
     * @param row 행 코드
     * @param col 열 코드
     * @param response
     * @throws Exception
     */
	@RequestMapping(value="/book/registerStatCol.do")
    public String registerStatCol(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {

    	List<String> colNames = new ArrayList<String>();
    	List<String> colModels = new ArrayList<String>();
    	List<String> colWidths = new ArrayList<String>();
    	List<String> colAligns = new ArrayList<String>();
    	
    	System.out.println("###################################### searchVO.getTABLENAME() => "+searchVO.getTABLENAME());
    	
    	String subtype = "";
    	if (searchVO.getTABLENAME().indexOf(",") > 0) {
    		subtype = " AND " + searchVO.getTABLENAME().split(",")[1].replace("&apos;", "'");
    		searchVO.setTABLENAME(searchVO.getTABLENAME().split(",")[0]);
    	}
    	
    	String titleWidth = "100";
    	if (searchVO.getROWFIELD().contains("CDE")) {
            titleWidth = "200";
    	}
    	
    	colNames.add(searchVO.getROWALIAS());
		colModels.add("TITLE");
		colWidths.add(titleWidth);
		colAligns.add("center");
		
    	Calendar cal = Calendar.getInstance();
    	
    	if (searchVO.getCOLFIELD().contains("YMD")) {
    		for (int i = 2000; i <= cal.get(cal.YEAR) ; i++) {
    			colNames.add(Integer.toString(i));
    			colModels.add("D" + Integer.toString(i));
    			colWidths.add("70");
    			colAligns.add("right");
			}    		
    	} else if (searchVO.getCOLFIELD().equals("PIP_DIP") || searchVO.getCOLFIELD().equals("MET_DIP")) {
    		String[] arPipDip = new String[]{"13","20","25","32","40","50","75","100","150","200","250","300"};
    		for (int i = 0; i < arPipDip.length; i++) {
    			colNames.add(arPipDip[i]);
    			colModels.add("D" + arPipDip[i]);
    			colWidths.add("70");
    			colAligns.add("right");
			}

    	} else {
        	// [코드 데이터 추출]
        	CodeVO cv = new CodeVO();
        	
        	List codeList = null;
        	
        	//행정구인경우.. 
        	if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJG_CDE")){
        		codeList = commonService.selectHjgCde(cv);
        		
        	}else if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJD_CDE")){
        		codeList = commonService.selectHjdCde(cv);
        		
        	}else {
        		cv.setCONTENT_ID(searchVO.getTABLENAME());
                cv.setCODE_ID(searchVO.getCOLFIELD());                
                codeList = commonService.selectG2SCd(cv);
        	}
            
            for (int i = 0; i < codeList.size(); i++) {
        		cv = (CodeVO)codeList.get(i);
    			colNames.add(cv.getVAL());
    			colModels.add("D" + cv.getCODE());
    			colWidths.add("120");
    			colAligns.add("right");
			}
    	}
    	
    	model.addAttribute("colNames", colNames );
    	model.addAttribute("colModels", colModels );
    	model.addAttribute("colWidths", colWidths );
    	model.addAttribute("colAligns", colAligns );
            
    	return "jsonView";
	}
    
    
    /**
     * 상수 통계 행과 열에 대한 데이터를 XML 데이터로 반환
     * 
     * @param name 시설물 코드
     * @param row 행 코드
     * @param col 열 코드
     * @param response
     * @throws Exception
     */
    @RequestMapping(value="/book/registerStatXml.do", method=RequestMethod.POST)
    public void registerStatXml(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
    	
    	String subtype = "";
    	if (searchVO.getTABLENAME().indexOf(",") > 0) {
    		subtype = " AND " + searchVO.getTABLENAME().split(",")[1].replace("&apos;", "'");
    		searchVO.setTABLENAME(searchVO.getTABLENAME().split(",")[0]);
    	}
    	
    	String select = "DECODE(val, NULL, '합계', val) title";
    	String leftQuery = "";
    	String subQuerys = "";
    	String where = "";
    	String groupby = searchVO.getROWFIELD();
    	String rollup = "val";
    	
    	if (searchVO.getROWFIELD().equals("HJG_CDE")) {
    		leftQuery += "SELECT SUBSTR(GC.G2_CODE,1,5) code, GC.G2_VALUE val ";
    		leftQuery += "FROM  G2S_CODEDDOMAINS GC, G2S_DOMAINS GD ";
    		leftQuery += "	WHERE GC.G2_DOMAINID = GD.G2_ID ";
    		leftQuery += "	   AND  GD.G2_NAME = '행정동' ";
    		leftQuery += "	   AND SUBSTR(G2_CODE,6,5) = '00000'  ";
    		leftQuery += "ORDER BY  SUBSTR(GC.G2_CODE,1,5) ASC ";    		
    		groupby = " SUBSTR(HJD_CDE,1,5) ";	       			   
    	} else if (searchVO.getROWFIELD().equals("HJD_CDE")) {
    		leftQuery += "SELECT GC.G2_CODE code, GC.G2_VALUE val ";
    		leftQuery += "FROM  G2S_CODEDDOMAINS GC, G2S_DOMAINS GD ";
    		leftQuery += "WHERE GC.G2_DOMAINID = GD.G2_ID ";
    		leftQuery += "   AND  GD.G2_NAME = '행정동' ";
    		leftQuery += "   AND SUBSTR(GC.G2_CODE,6,5)!='00000' ";    		   
    	} else if (searchVO.getROWFIELD().equals("SHT_NUM")) {
    		leftQuery += "SELECT sht_num code, sht_num val ";
    		leftQuery += "FROM bml_i005_as ";
    		leftQuery += "GROUP BY sht_num, sht_num";
    	} else if (searchVO.getROWFIELD().contains("YMD")) {
    		leftQuery += "SELECT SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) code, SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) val ";
    		leftQuery += "FROM " + searchVO.getTABLENAME() + " ";
    		leftQuery += "WHERE " + searchVO.getROWFIELD()+ " IS NOT NULL ";
    		if( searchVO.getSUBTABLE().contains("SWL")) leftQuery += " AND (FTR_CDE, FTR_IDN) IN (SELECT FTR_CDE,FTR_IDN FROM " + searchVO.getSUBTABLE() + " ) ";
    		leftQuery += "GROUP BY SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4), SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) ";
    		leftQuery += "ORDER BY SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4)";
    		groupby = " SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) ";
    	}else if( searchVO.getROWFIELD().equals("FTR_CDE") ){   
    		select = "DECODE (fn_g2s_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code), NULL, '합계', fn_g2s_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code)) title";
    		leftQuery += "SELECT code, val ";
    		leftQuery += "FROM TABLE (fn_g2s_domainlist ('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "')) ";
    		leftQuery += "WHERE CODE IN ( SELECT FTR_CDE FROM "+ searchVO.getTABLENAME()+ " ) ";		//해당테이블에 있는 데이터만 조회하도록 수정.. 
    		leftQuery += "GROUP BY code, val";    		
    		rollup = "code";
    	}else if( searchVO.getROWFIELD().contains("_CDE") || searchVO.getROWFIELD().contains("_SAA") || searchVO.getROWFIELD().contains("_MOP")) {
    		select = "DECODE (fn_g2s_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code), NULL, '합계', fn_g2s_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code)) title";
    		leftQuery += "SELECT code, val ";
    		leftQuery += "FROM TABLE (fn_g2s_domainlist ('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "')) ";
    		leftQuery += "GROUP BY code, val";
    		rollup = "code";
    	} else if (searchVO.getROWFIELD().equals("PIP_DIP") || searchVO.getROWFIELD().equals("MET_DIP")) {
    		leftQuery += "SELECT " + searchVO.getROWFIELD() + " code, " + searchVO.getROWFIELD() + " val ";
    		leftQuery += "FROM " + searchVO.getTABLENAME() + " ";
    		leftQuery += "WHERE " + searchVO.getROWFIELD() + " IS NOT NULL ";
    		leftQuery += "GROUP BY " + searchVO.getROWFIELD() + ", " + searchVO.getROWFIELD();
    	}
    	
		String[] arDip = new String[]{"13","20","25","32","40","50","75","100","150","200","250","300"};
		List list = null;
    	
    	if (searchVO.getCOLFIELD().contains("YMD")) {
        	Calendar cal = Calendar.getInstance();
    		for (int i = 2000; i <= cal.get(cal.YEAR) ; i++) {
    			select += ", NVL(SUM(m" + Integer.toString(i) + ".tot), 0) D" + Integer.toString(i);
    			if (searchVO.getRESULTTYPE().equals("COUNT")) {
        			subQuerys += ",(SELECT " + groupby + " flag, COUNT(*) tot FROM " 
        						+ searchVO.getTABLENAME() + " WHERE SUBSTR(" + searchVO.getCOLFIELD() + ", 1, 4)='" + Integer.toString(i) 
        						+ "' " + subtype + " GROUP BY " + groupby + ") m" + Integer.toString(i);
    			} else if (searchVO.getRESULTTYPE().equals("LEN")) {
        			subQuerys += ",(SELECT " + groupby + " flag, SUM(" + searchVO.getRESULTFIELD() + ") tot FROM " 
    						+ searchVO.getTABLENAME() + " WHERE SUBSTR(" + searchVO.getCOLFIELD() + ", 1, 4)='" + Integer.toString(i) 
    						+ "' " + subtype + " GROUP BY " + groupby + ") m" + Integer.toString(i);
    			}
				where += "AND t.code=m" + Integer.toString(i) + ".flag(+) ";
			}    	
    	} else if (searchVO.getCOLFIELD().equals("PIP_DIP") || searchVO.getCOLFIELD().equals("MET_DIP") ) {
    		for (int i = 0; i < arDip.length; i++) {
    			select += ", NVL(SUM(m" + arDip[i] + ".tot), 0) D" + arDip[i];
    			if (searchVO.getRESULTTYPE().equals("COUNT")) {
        			subQuerys += ",(SELECT " + groupby + " flag, COUNT(*) tot FROM " 
        					+ searchVO.getTABLENAME() + " WHERE " + searchVO.getCOLFIELD() + "=" + arDip[i] 
        					+ subtype + " GROUP BY " + groupby + ") m" + arDip[i];
    			} else if (searchVO.getRESULTTYPE().equals("LEN")) {
        			subQuerys += ",(SELECT " + groupby + " flag, SUM(" + searchVO.getRESULTFIELD() + ") tot FROM " 
    						+ searchVO.getTABLENAME() + " WHERE " + searchVO.getCOLFIELD() + "=" + arDip[i]  
							+ subtype + " GROUP BY " + groupby + ") m" + arDip[i];
    			}
    			where += "AND t.code=m" + arDip[i] + ".flag(+) ";
			}
    	} else {
        	// [코드 데이터 추출]
        	CodeVO cv = new CodeVO();
           
        	//행정구인경우.. 
        	if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJG_CDE")){
        		list = commonService.selectHjgCde(cv);
        		searchVO.setCOLFIELD("SUBSTR(HJD_CDE,0,5)");
        		
        	}else if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJD_CDE")){
        		list = commonService.selectHjdCde(cv);
        		
        	}else {
        		cv.setCONTENT_ID(searchVO.getTABLENAME());
                cv.setCODE_ID(searchVO.getCOLFIELD());                
                list = commonService.selectG2SCd(cv);
        	}
        	
            for (int i = 0; i < list.size(); i++) {
        		cv = (CodeVO)list.get(i);
    			
    			select += ", NVL(SUM(m" + cv.getCODE() + ".tot), 0) D" + cv.getCODE();
    			
    			// getSUBTABLE()에 하수 테이블 정보가 들어오면.. 
    			String sSubTable = " WHERE " + searchVO.getCOLFIELD() + "='" + cv.getCODE()+ "' " ; 
    			if (searchVO.getSUBTABLE().contains("SWL")){
    				sSubTable = "  WHERE ( FTR_CDE, FTR_IDN ) IN (SELECT FTR_CDE, FTR_IDN FROM "+searchVO.getSUBTABLE()+" WHERE "+searchVO.getCOLFIELD() + "='" + cv.getCODE() +"' )";
     			}
    			
    			
 				if (searchVO.getRESULTTYPE().equals("COUNT")) {
        			subQuerys += ",(SELECT " + groupby + " flag, COUNT(*) tot FROM " 
        					+ searchVO.getTABLENAME() + sSubTable
        					+ subtype + " GROUP BY " + groupby + ") m" + cv.getCODE();
    			} else if (searchVO.getRESULTTYPE().equals("LEN")) {
        			subQuerys += ",(SELECT " + groupby + " flag, SUM(" + searchVO.getRESULTFIELD() + ") tot FROM " 
    						+ searchVO.getTABLENAME() + sSubTable
    						+ subtype + " GROUP BY " + groupby + ") m" + cv.getCODE();
    			}     			
    			where += "AND t.code=m" + cv.getCODE() + ".flag(+) ";
			}
    	}
    	
    	StatisticVO statVO = new StatisticVO();
    	statVO.setROWFIELD(searchVO.getROWFIELD());
    	statVO.setCOLUMN(select);    	
    	statVO.setLEFTQUERY(leftQuery);
    	statVO.setSUBQUERY(subQuerys);
    	statVO.setWHERE(where);
    	statVO.setROLLUP(rollup);
    	
    	
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        List xmlData = statisticService.registerStatList(statVO);

        xmlSb.append("<rows>");
        
        if( xmlData!=null) {
        	for (int j = 0; j < xmlData.size(); j++) {
        		Map map = (Map)xmlData.get(j);
        		xmlSb.append("<Item>");
        		xmlSb.append("<TITLE>"+map.get("TITLE")+"</TITLE>");
            	if (searchVO.getCOLFIELD().contains("YMD")) {
                	Calendar cal = Calendar.getInstance();
            		for (int i = 2000; i <= cal.get(cal.YEAR) ; i++) {
                		xmlSb.append("<D" + Integer.toString(i) + ">" + map.get("D" + Integer.toString(i)) + "</D" + Integer.toString(i) +">");
        			}    	
            	} else if (searchVO.getCOLFIELD().equals("PIP_DIP") || searchVO.getCOLFIELD().equals("MET_DIP")) {
            		for (int i = 0; i < arDip.length; i++) {
            			xmlSb.append("<D" + arDip[i] + ">" + map.get("D" + arDip[i]) + "</D" + arDip[i] +">");
            		}
            	} else {
                    for (int i = 0; i < list.size(); i++) {
                		CodeVO cv = (CodeVO)list.get(i);
            			xmlSb.append("<D" + cv.getCODE() +">"+map.get("D" + cv.getCODE()) + "</D" + cv.getCODE() +">");
                    }
            	}
        		xmlSb.append("</Item>");
			}
        }
        xmlSb.append("</rows>");
            	
        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print( xmlSb.toString() );
    }
    
    /**
	 * 엑셀 다운로드
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/registerStatExcel.do")
    public View registerStatExcel(@ModelAttribute StatisticVO searchVO, 
    		ModelMap model, HttpSession session) 
            throws Exception {
    	
    	List<String> colNames = new ArrayList<String>();
    	List<String> colModels = new ArrayList<String>();
    	
    	colNames.add(searchVO.getROWALIAS());
    	colModels.add("TITLE");    	
    	
    	Calendar cal = Calendar.getInstance();
    	
    	if (searchVO.getCOLFIELD().contains("YMD")) {
    		for (int i = 2000; i <= cal.get(cal.YEAR) ; i++) {
    			colNames.add(Integer.toString(i));
    			colModels.add("D" + Integer.toString(i));
			}    		
    	} else if (searchVO.getCOLFIELD().equals("PIP_DIP") || searchVO.getCOLFIELD().equals("MET_DIP")) {
    		String[] arPipDip = new String[]{"13","20","25","32","40","50","75","100","150","200","250","300"};
    		for (int i = 0; i < arPipDip.length; i++) {
    			colNames.add(arPipDip[i]);
    			colModels.add("D" + arPipDip[i]);
			}
    	} else {
        	// [코드 데이터 추출]
        	CodeVO cv = new CodeVO();
            List list = null;;
            
          //행정구인경우.. 
        	if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJG_CDE")){
        		list = commonService.selectHjgCde(cv);
        		
        	}else  if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJD_CDE")){
        		list = commonService.selectHjdCde(cv);
        		
        	}else {
        		cv.setCONTENT_ID(searchVO.getTABLENAME());
                cv.setCODE_ID(searchVO.getCOLFIELD());                
                list = commonService.selectG2SCd(cv);
        	}
        	
            for (int i = 0; i < list.size(); i++) {
        		cv = (CodeVO)list.get(i);
    			colNames.add(cv.getVAL());
    			colModels.add("D" + cv.getCODE());
			}
    	}
    	
    	String subtype = "";
    	if (searchVO.getTABLENAME().indexOf(",") > 0) {
    		subtype = " AND " + searchVO.getTABLENAME().split(",")[1].replace("&apos;", "'");
    		searchVO.setTABLENAME(searchVO.getTABLENAME().split(",")[0]);
    	}

    	String select = "DECODE(val, NULL, '합계', val) title";
    	String leftQuery = "";
    	String subQuerys = "";
    	String where = "";
    	String groupby = searchVO.getROWFIELD();
    	String rollup = "val";
    	
    	if (searchVO.getROWFIELD().equals("HJG_CDE")) {
    		leftQuery += "SELECT SUBSTR(GC.G2_CODE,1,5) code, GC.G2_VALUE val ";
    		leftQuery += "FROM  G2S_CODEDDOMAINS GC, G2S_DOMAINS GD ";
    		leftQuery += "	WHERE GC.G2_DOMAINID = GD.G2_ID ";
    		leftQuery += "	   AND  GD.G2_NAME = '행정동' ";
    		leftQuery += "	   AND SUBSTR(G2_CODE,6,5) = '00000'  ";
    		
    		groupby = " SUBSTR(HJD_CDE,1,5) ";	       			   
    	} else if (searchVO.getROWFIELD().equals("HJD_CDE")) {
    		leftQuery += "SELECT GC.G2_CODE code, GC.G2_VALUE val ";
    		leftQuery += "FROM  G2S_CODEDDOMAINS GC, G2S_DOMAINS GD ";
    		leftQuery += "WHERE GC.G2_DOMAINID = GD.G2_ID ";
    		leftQuery += "   AND  GD.G2_NAME = '행정동' ";
    		leftQuery += "   AND SUBSTR(GC.G2_CODE,6,5)!='00000' ";    		   
    	} else if (searchVO.getROWFIELD().equals("SHT_NUM")) {
    		leftQuery += "SELECT sht_num code, sht_num val ";
    		leftQuery += "FROM bml_i005_as ";
    		leftQuery += "GROUP BY sht_num, sht_num";
    	} else if (searchVO.getROWFIELD().contains("YMD")) {
    		leftQuery += "SELECT SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) code, SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) val ";
    		leftQuery += "FROM " + searchVO.getTABLENAME() + " ";
    		leftQuery += "WHERE " + searchVO.getROWFIELD()+ " IS NOT NULL ";
    		if( searchVO.getSUBTABLE().contains("SWL")) leftQuery += " AND (FTR_CDE, FTR_IDN) IN (SELECT FTR_CDE,FTR_IDN FROM " + searchVO.getSUBTABLE() + " ) ";
    		leftQuery += "GROUP BY SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4), SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) ";
    		leftQuery += "ORDER BY SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4)";
    		groupby = " SUBSTR(" + searchVO.getROWFIELD()+ ", 1, 4) ";
    	} else if( searchVO.getROWFIELD().equals("FTR_CDE") ){   
    		select = "DECODE (fn_g2s_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code), NULL, '합계', fn_g2s_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code)) title";
    		leftQuery += "SELECT code, val ";
    		leftQuery += "FROM TABLE (fn_g2s_domainlist ('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "')) ";
    		leftQuery += "WHERE CODE IN ( SELECT FTR_CDE FROM "+ searchVO.getTABLENAME()+ " ) ";		//해당테이블에 있는 데이터만 조회하도록 수정.. 
    		leftQuery += "GROUP BY code, val";    		
    		rollup = "code";
    	}else if (searchVO.getROWFIELD().contains("_CDE") || searchVO.getROWFIELD().contains("_SAA") || searchVO.getROWFIELD().contains("_MOP")) {
    		if(Globals.DB_TYPE.equals("postgresql")) {
        		select = "DECODE (fn_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code), NULL, '합계', fn_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code)) title";
        		leftQuery += "SELECT code, val ";
        		leftQuery += "FROM fn_domainlist ('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "') AS f(domain varchar, code varchar, val varchar) ";
        		leftQuery += "GROUP BY code, val";
        		rollup = "code";
    			
    		}else{
        		select = "DECODE (fn_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code), NULL, '합계', fn_codedvalue('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "', code)) title";
        		leftQuery += "SELECT code, val ";
        		leftQuery += "FROM TABLE (fn_domainlist ('" + searchVO.getTABLENAME()+ "', '" + searchVO.getROWFIELD()+ "')) ";
        		leftQuery += "GROUP BY code, val";
        		rollup = "code";
    			
    		}    		
    	} else if (searchVO.getROWFIELD().equals("PIP_DIP") || searchVO.getROWFIELD().equals("MET_DIP")) {
    		leftQuery += "SELECT " + searchVO.getROWFIELD() + " code, " + searchVO.getROWFIELD() + " val ";
    		leftQuery += "FROM " + searchVO.getTABLENAME() + " ";
    		leftQuery += "WHERE " + searchVO.getROWFIELD() + " IS NOT NULL ";
    		leftQuery += "GROUP BY " + searchVO.getROWFIELD() + ", " + searchVO.getROWFIELD();
    	}
    	
		String[] arDip = new String[]{"13","20","25","32","40","50","75","100","150","200","250","300"};
		List list = null;
    	
    	if (searchVO.getCOLFIELD().contains("YMD")) {
    		for (int i = 2000; i <= cal.get(cal.YEAR) ; i++) {
    			select += ", NVL(SUM(m" + Integer.toString(i) + ".tot), 0) D" + Integer.toString(i);
    			if (searchVO.getRESULTTYPE().equals("COUNT")) {
        			subQuerys += ",(SELECT " + groupby + " flag, COUNT(*) tot FROM " 
        						+ searchVO.getTABLENAME() + " WHERE SUBSTR(" + searchVO.getCOLFIELD() + ", 1, 4)='" + Integer.toString(i) 
        						+ "' " + subtype + " GROUP BY " + groupby + ") m" + Integer.toString(i);
    			} else if (searchVO.getRESULTTYPE().equals("LEN")) {
        			subQuerys += ",(SELECT " + groupby + " flag, SUM(" + searchVO.getRESULTFIELD() + ") tot FROM " 
    						+ searchVO.getTABLENAME() + " WHERE SUBSTR(" + searchVO.getCOLFIELD() + ", 1, 4)='" + Integer.toString(i) 
    						+ "' " + subtype + " GROUP BY " + groupby + ") m" + Integer.toString(i);
    			}
				where += "AND t.code=m" + Integer.toString(i) + ".flag(+) ";
			}    	
    	} else if (searchVO.getCOLFIELD().equals("PIP_DIP") || searchVO.getCOLFIELD().equals("MET_DIP")) {
    		for (int i = 0; i < arDip.length; i++) {
    			select += ", NVL(SUM(m" + arDip[i] + ".tot), 0) D" + arDip[i];
    			if (searchVO.getRESULTTYPE().equals("COUNT")) {
        			subQuerys += ",(SELECT " + groupby + " flag, COUNT(*) tot FROM " 
        					+ searchVO.getTABLENAME() + " WHERE " + searchVO.getCOLFIELD() + "=" + arDip[i] 
        					+ subtype + " GROUP BY " + groupby + ") m" + arDip[i];
    			} else if (searchVO.getRESULTTYPE().equals("LEN")) {
        			subQuerys += ",(SELECT " + groupby + " flag, SUM(" + searchVO.getRESULTFIELD() + ") tot FROM " 
    						+ searchVO.getTABLENAME() + " WHERE " + searchVO.getCOLFIELD() + "=" + arDip[i]  
							+ subtype + " GROUP BY " + groupby + ") m" + arDip[i];
    			}
    			where += "AND t.code=m" + arDip[i] + ".flag(+) ";
			}
    	} else {
        	// [코드 데이터 추출]
        	CodeVO cv = new CodeVO();
            //행정구인경우.. 
        	if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJG_CDE")){
        		list = commonService.selectHjgCde(cv);
        		
        	}else  if( searchVO.getCOLFIELD() != null &&  searchVO.getCOLFIELD().contains("HJD_CDE")){
        		list = commonService.selectHjdCde(cv);
        		
        	}else {
        		cv.setCONTENT_ID(searchVO.getTABLENAME());
                cv.setCODE_ID(searchVO.getCOLFIELD());                
                list = commonService.selectG2SCd(cv);
        	}            
            
            for (int i = 0; i < list.size(); i++) {
        		cv = (CodeVO)list.get(i);
    			
    			select += ", NVL(SUM(m" + cv.getCODE() + ".tot), 0) D" + cv.getCODE();
    			    			
    			String sSubTable = " WHERE " + searchVO.getCOLFIELD() + "='" + cv.getCODE()+ "' " ; 
    			if (searchVO.getSUBTABLE().contains("SWL")){
    				sSubTable = "  WHERE ( FTR_CDE, FTR_IDN ) IN (SELECT FTR_CDE, FTR_IDN FROM "+searchVO.getSUBTABLE()+" WHERE "+searchVO.getCOLFIELD() + "='" + cv.getCODE() +"' )";
     			}
    			   			
    			if (searchVO.getRESULTTYPE().equals("COUNT")) {
        			subQuerys += ",(SELECT " + groupby + " flag, COUNT(*) tot FROM " 
        					+ searchVO.getTABLENAME() + sSubTable
        					+ subtype + " GROUP BY " + groupby + ") m" + cv.getCODE();
    			} else if (searchVO.getRESULTTYPE().equals("LEN")) {
        			subQuerys += ",(SELECT " + groupby + " flag, SUM(" + searchVO.getRESULTFIELD() + ") tot FROM " 
    						+ searchVO.getTABLENAME() + sSubTable
    						+ subtype + " GROUP BY " + groupby + ") m" + cv.getCODE();
    			} 

    			where += "AND t.code=m" + cv.getCODE() + ".flag(+) ";
			}
    	}
    	
    	StatisticVO statVO = new StatisticVO();
    	statVO.setROWFIELD(searchVO.getROWFIELD());
    	statVO.setCOLUMN(select);    	
    	statVO.setLEFTQUERY(leftQuery);
    	statVO.setSUBQUERY(subQuerys);
    	statVO.setWHERE(where);
    	statVO.setROLLUP(rollup);
    	
        List dataList = statisticService.registerStatList(statVO);   
        
        String[] excel_title = colNames.toArray(new String[0]);
        String[] excel_column = colModels.toArray(new String[0]);
        
        model.addAttribute("file_name", "시설물별 통계현황");
        model.addAttribute("excel_title", excel_title);
        model.addAttribute("excel_column", excel_column);
        model.addAttribute("data_list", dataList);
        
        return new ExcelView();
    }    
    
    
    
    
    
    
    
    
    /**
     * 총괄현황
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/book/regsiterAnalysis.do")
    public String regsiterAnalysis(ModelMap model, HttpServletRequest request) 
            throws Exception {    	
    	
    	String system = request.getParameter("MenuId");
    	
    	// [코드 데이터 추출]
    	CodeVO cv = new CodeVO();
    	cv.setCONTENT_ID("WTL_PIPE_LM");
    	// 관종
    	cv.setCODE_ID("MOP_CDE");
    	model.addAttribute(EgovStringUtil.lowerCase("MOP_CDE")+"_list", commonService.selectG2SCd(cv));
        // 관경
    	String[] arPipDip = new String[]{"13","20","25","32","40","50","75","100","150","200","250","300"};
    	model.addAttribute(EgovStringUtil.lowerCase("PIP_DIP")+"_list", arPipDip);
         
        model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
        model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
        
        
        String sFileName = RegisterUtil.viewFileName(system, "statistic");
        String formView=sFileName+"Analysis";

        System.out.println("ssssssssssssssssssssssssssssssssssssss formView =>"+formView);
     	return formView;

    }
    
    
    
}   