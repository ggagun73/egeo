/*
 * BaseContoller.java
 * 프로토타입
 */
package usolver.book.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springmodules.validation.commons.DefaultBeanValidator;

import usolver.book.service.AddInfoService;
import usolver.book.service.RegisterService;
import usolver.book.util.AddInfoUtil;
import usolver.book.util.RegisterUtil;
import usolver.book.util.RequestParse;
import usolver.book.vo.AddInfoVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.CodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;


/**  
 * @Class Name : SwtSutlHtController.java
 * @Description : SwtSutlHt Controller Class
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

/**
 * @author ginno
 *
 */
@Controller
public class AddInfoController {
	
	/** SwtSutlHtService */
    @Resource(name = "addInfoService")
    private AddInfoService addInfoService;
    
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
    
	/** RegisterService */
	@Resource(name = "registerService")
	private RegisterService registerService;
	
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	private EgovMessageSource egovMessageSource;
	
    @Autowired
    private MessageSource messageSource;
    
    /** LOG4J */
    private Logger log = Logger.getLogger(this.getClass());
        
    /**
	 * 목록 화면
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
 */
    @RequestMapping(value="/book/AddInfoList.do")    
    public String addInfoList(@ModelAttribute AddInfoVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws Exception {
    	
    	
    	//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
	/* 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	       return "forward:/accessDenied.do?type=nosession";
	 	}	 	
	 	*/
		//조회 컬럼 항목 테이블명
    	String sTableName = StringUtil.nvl(request.getParameter("tableName"));
		
    	//대소문자때문에... 값이 안나온다.. ㅠㅠ
    	List result = registerService.registerFieldList(sTableName);
    	
    	List<Map> addList = new ArrayList<Map>();
    	
    	System.out.println("################################  result = "+result);
    	
    	for(int i=0; i < result.size() ; i++){
    		Map map = (Map) result.get(i);
    		
    		String g2Name = map.get("g2Name").toString();    		
    		map.put("g2Name", JdbcUtils.convertUnderscoreNameToPropertyName(g2Name));
    		addList.add(map);
    	}
    	
    	System.out.println("################################  addList = "+addList);
    	
        model.addAttribute("addList", addList);
        
        return "jsonView";
    } 
 
    
    /**
     * @param searchVO
     * @param model
     * @param request
     * @param response
     * @param session
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/book/AddInfoSearch.do")    
    public String addInfoSearch(@ModelAttribute AddInfoVO searchVO, 
    		ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws Exception {
    	
    	
    /*	//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
	 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	       return "forward:/accessDenied.do?type=nosession";
	 	}	 	*/
	 	
		HashMap parameterObject =  new HashMap();
		
		String sTableName = StringUtil.nvl( request.getParameter("TABLENAME"));
    	String sKeyData = "";
		if( sTableName.equals("RDT_ROUT_DT")){  //노선정보 테이블 호출시 
			sKeyData = StringUtil.nvl( request.getParameter("SEC_IDN"));
			parameterObject.put("SEC_IDN", sKeyData);  
		}else if( sTableName.equals("RDT_RDWY_DT") || sTableName.equals("RDT_SDWK_DT")){		// 차도, 보도 테이블 호출시	
			sKeyData = StringUtil.nvl( request.getParameter("SEC_IDN"));
			parameterObject.put("FTR_CDE",StringUtil.nvl( request.getParameter("FTR_CDE")));			
			parameterObject.put("SEC_IDN",sKeyData);  			
		}else if( sTableName.equals("RDT_RTRP_DT")){														// 도로일상보수 호출시
			sKeyData = StringUtil.nvl( request.getParameter("RUT_IDN"));
			parameterObject.put("RUT_IDN",sKeyData);
		}else if( sTableName.equals("RDL_CTLR_LS")){														// 도로구간정보 호출시 
			sKeyData = StringUtil.nvl( request.getParameter("RUT_IDN"));
			parameterObject.put("RUT_IDN",sKeyData);
		}else  if( sTableName.contains("COST_DT") || sTableName.contains("CHNG_DT") || sTableName.contains("SUBC_DT") || sTableName.contains("REPR_DT") || sTableName.contains("FLAW_DT") ){  //공사대장 관련 테이블인 경우 
			sKeyData = StringUtil.nvl( request.getParameter("CNT_NUM"));
			parameterObject.put("CNT_NUM",sKeyData);
		}else if( sTableName.equals("RDL_EXCV_AS")){														// 굴착허가위치 호출시 
			sKeyData = StringUtil.nvl( request.getParameter("PMS_IDN"));
			parameterObject.put("PMS_IDN",sKeyData);
		}else if( sTableName.equals("RDT_OCAL_DT")){
			sKeyData = StringUtil.nvl( request.getParameter("PMS_IDN"));
			parameterObject.put("PMS_IDN",sKeyData);
		}else if( sTableName.equals("RDT_EXAC_DT")){														// 도로굴착허가조건 호출시 
			sKeyData = StringUtil.nvl( request.getParameter("PMS_IDN"));
			parameterObject.put("PMS_IDN",sKeyData);								//도로굴착점용허가조건 호출시 pms_idn 이 필요할거같은데 하.....
		}else if( sTableName.equals("RDT_FECL_DT")){	//도로점용료 산정기준 호출시 
			sKeyData = StringUtil.nvl( request.getParameter("JYP_CDE"));
			parameterObject.put("JYP_CDE",sKeyData);			
		}else if( sTableName.equals("RDT_OCNR_DT")){	//도로인접지번내역 호출시 
			sKeyData = StringUtil.nvl( request.getParameter("PMS_IDN"));
			parameterObject.put("PMS_IDN",sKeyData);			
		}else if( sTableName.equals("RDT_FEIM_DT")){	//점용료 부과내역 호출시
			sKeyData = StringUtil.nvl( request.getParameter("PMS_IDN"));
			parameterObject.put("PMS_IDN",sKeyData);			 
		}else {
			sKeyData = StringUtil.nvl( request.getParameter("FTR_IDN"));
			parameterObject.put("FTR_CDE",StringUtil.nvl( request.getParameter("FTR_CDE")));
			parameterObject.put("FTR_IDN",sKeyData); // 상하수 시설물에서는 필요함. 
		}
    	
		// 키값이 없을때는 수행하지 말자...
    	if( sKeyData != null && !sKeyData.equals("") && !sKeyData.equals("0")){
		    	// 검색 컬럼 쿼리 생성
				parameterObject.put("TABLENAME", sTableName);
				List searchColumnsList = AddInfoUtil.printColumnsList(parameterObject);
				parameterObject.put("searchColumnsList", searchColumnsList);
				System.out.println(" #####################################   searchColumnsList =>"+searchColumnsList);
		
				//조회 컬럼 항목 테이블명
				System.out.println(" #####################################   TABLENAME =>"+sTableName);
				List selectColumnsList = addInfoService.selectColumnsList(parameterObject);		
				System.out.println(" #####################################   selectColumnsList =>"+selectColumnsList);
		
				//조회 컬럼 항목 쿼리 생성
				List selectColumnsRetList =AddInfoUtil.selectColumnsList(selectColumnsList);
				System.out.println(" #####################################   selectColumnsRetList =>"+selectColumnsRetList);
				
				parameterObject.put("selectColumnsList", selectColumnsRetList);  
				
				// 페이징 처리
				int page = StringUtil.parseInt( request.getParameter("page"));
				int rows = StringUtil.parseInt( request.getParameter("rows"));
				
				int firstIndex = rows * page - rows;
				
				if( firstIndex == 0 ) firstIndex = 0;
				if( rows == 0 ) rows = 100;
				
				parameterObject.put("firstIndex", firstIndex);
				parameterObject.put("lastIndex", firstIndex+rows);
		
				// 정렬순서 (필수)
				String sidx = StringUtil.nvl( request.getParameter("sidx"));
				String sord = StringUtil.nvl( request.getParameter("sord"));
				if( sidx.length() <1 )
					parameterObject.put("OrderByColumn", "FID");
				else
					parameterObject.put("OrderByColumn", sidx);
				
				if( sord.length() < 1 )
					parameterObject.put("OrderByType", "DESC");
				else
					parameterObject.put("OrderByType",sord);
						
				    	
		        // DB 요청
		        List resultList = addInfoService.addInfoList(parameterObject);
		        
		        System.out.println(" #####################################   resultList =>"+resultList);
		        
		        int total_count = addInfoService.addInfoListCnt(parameterObject);
		        
		        System.out.println(" #####################################   total_count =>"+total_count);
		        
		        model.addAttribute("total_count", total_count);
		        model.addAttribute("resultList", resultList);
    	}
        
        return "jsonView";
    } 
    
    /**
	 * 세부항목 목록 화면 (추가)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/AddInfoListXml.do")
    public void addInfoXml(@ModelAttribute AddInfoVO searchVO, 
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
			searchVO.setOrderByColumn("FID");
		else
			searchVO.setOrderByColumn(sidx);
		if( sord.equals("") )
			searchVO.setOrderByType("DESC");
		else
			searchVO.setOrderByType(sord);
    	
    	// 권한 처리
    	// 공통 삽입 공간

        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        // DB 요청
        List xmlData = addInfoService.addInfoList(searchVO);
        int total_count = addInfoService.addInfoListCnt(searchVO);
        int total_page = 0;
        if( total_count>0 )
        	total_page = (int) Math.ceil( (float)total_count/(float)rows );

        xmlSb.append("<rows>");
        xmlSb.append("<page>"+page+"</page>");
        xmlSb.append("<total>"+total_page+"</total>");
        xmlSb.append("<records>"+total_count+"</records>");
        
        if( xmlData!=null) {
        	
        	AddInfoVO rs = new AddInfoVO();
        	
        	for (int i = 0; i < xmlData.size(); i++) {
        		rs = (AddInfoVO) xmlData.get(i);
        		xmlSb.append("<Item>");
        		xmlSb.append("<FID>"+StringUtil.nvl(rs.getFID())+"</FID>");
        		xmlSb.append("<FTR_CDE>"+StringUtil.nvl(rs.getFTR_CDE())+"</FTR_CDE>");
        		xmlSb.append("<FTR_IDN>"+StringUtil.nvl(rs.getFTR_IDN())+"</FTR_IDN>");
        		xmlSb.append("<FTR_CDE_NM>"+StringUtil.nvl(rs.getFTR_CDE_NM())+"</FTR_CDE_NM>");
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
	 * 신규 등록 & 수정 & 뷰 화면
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/AddInfoCRU.do")
    public String addInfoCRU(
    		@ModelAttribute AddInfoVO searchVO, Model model, HttpServletRequest request, HttpSession session) 
            throws Exception {
    		
    	
	    /*	//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
		 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
		       return "forward:/accessDenied.do?type=nosession";
		 	}	 	*/
	 	
    		System.out.println(" #####################################   request =>"+request);
    		String  g2Id = StringUtil.nvl(request.getParameter("FID"));
    		System.out.println(" #####################################   g2Id =>"+g2Id);
    		//전달 Map
			HashMap parameterObject =  new HashMap();
			EgovMap result = new EgovMap();

		
			//조회 컬럼 항목 테이블명
			//parameterObject.put("TABLENAME", auth_id);
			String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
			parameterObject.put("TABLENAME", sTableName);
	
			List selectColumnsList = addInfoService.selectColumnsList(parameterObject);		
					
			 System.out.println(" #####################################   selectColumnsList =>"+selectColumnsList);
			 			
			 
			//조회 컬럼 항목 쿼리 생성
			List selectColumnsRetList =AddInfoUtil.selectColumnsList(selectColumnsList);
			parameterObject.put("selectColumnsList", selectColumnsRetList);
			
			 System.out.println(" #####################################   selectColumnsRetList =>"+selectColumnsRetList);
						 
			if( g2Id != null && !g2Id.equals("") ){
				
				System.out.println(" ######   g2Id != null  ");
				parameterObject.put("FID", g2Id);
				System.out.println(" #####################################   parameterObject =>"+parameterObject);
				result = registerService.registerDetail( parameterObject );
				
				model.addAttribute("action_flag", "UPDATE" );
				
			}else {		
				
				System.out.println(" ######   g2Id == null ");
				result.put("FTR_CDE", StringUtil.nvl(request.getParameter("FTR_CDE")));
				result.put("FTR_IDN", StringUtil.nvl(request.getParameter("FTR_IDN")));
				result.put("ftrCde", StringUtil.nvl(request.getParameter("FTR_CDE")));	// 상하수 시설물에서는 필요함. 
				result.put("ftrIdn", StringUtil.nvl(request.getParameter("FTR_IDN")));	// 상하수 시설물에서는 필요함. 
				//REP_NUM  이거 언제쓰는지 확인 필요.. 
	    		//result.put("REP_NUM", commonService.getMaxID("WTT_WUTL_HT", "REP_NUM", "FTR_CDE", searchVO.getFTR_CDE(), "FTR_IDN", searchVO.getFTR_IDN()));
				model.addAttribute("action_flag", "INSERT" );
			}
			
	    	if( request.getParameter("SEC_IDN") != null ){
	    		result.put("SEC_IDN", StringUtil.nvl(request.getParameter("SEC_IDN")));	 // 도로 시설물에서는 필요함. 
	    		result.put("secIdn", StringUtil.nvl(request.getParameter("SEC_IDN")));	 // 도로 시설물에서는 필요함. RUT_IDN
	    	}
	    	
	    	if( request.getParameter("RUT_IDN") != null ){
	    		result.put("rutIdn", StringUtil.nvl(request.getParameter("RUT_IDN")));	 // 도로 시설물에서는 필요함. 
	    	}
	    	
	    	if( request.getParameter("PMS_IDN") != null ){
	    		result.put("pmsIdn", StringUtil.nvl(request.getParameter("PMS_IDN")));	 // 도로 시설물에서는 필요함. 
	    	}
	    	
	    	if( request.getParameter("CNT_NUM") != null ){
	    		result.put("cntNum", StringUtil.nvl(request.getParameter("CNT_NUM")));	 // 공사대장에서는 필요함. 
	    	}
	    	
	    	 if( request.getParameter("action_flag") != null ){
	    		 model.addAttribute("action_flag", StringUtil.nvl(request.getParameter("action_flag")));
	    	 }
	    	 
	    	// [코드 데이터 추출]           	
			CodeVO cv = new CodeVO();
			cv.setCONTENT_ID(sTableName);
	
			for(int i=0; i<selectColumnsList.size();i++){
	
				Map map = (Map) selectColumnsList.get(i);
				String g2Domain = map.get("g2Domain").toString();
				String g2Name = map.get("enColumns").toString();
	
				if( g2Domain != null && !g2Domain.equals("0")){
					cv.setCODE_ID(g2Name);
					model.addAttribute(EgovStringUtil.lowerCase(g2Name)+"_list", commonService.selectG2SCd(cv));
				}
			}
	
			System.out.println(" #####################################   result =>"+result);
	
	    	// 메인 데이터
	    	model.addAttribute("result", result);
	    	model.addAttribute("tablename", sTableName);
	    	model.addAttribute("TABLENAME", sTableName);
	    	//model.addAttribute("batch_cnt", selectedCnt);	// 일괄 처리 대상 수
	    	model.addAttribute("openerId", StringUtil.nvl(request.getParameter("openerId")) );
				
			String sFileName = AddInfoUtil.viewFileName(sTableName, "CRU");
			String formView=sFileName+"CRU";
			System.out.println("formView==>"+formView);		
	
			return formView;
    }
    
    /**
     * DB 등록/수정 처리
     * @param searchVO - 조회할 정보가 담긴 VO
     * @param model
     * @return ""
     * @exception Exception
     */
    @RequestMapping(value="/book/AddInfoProcWrite.do")
    public String addInfoProcWrite(ModelMap model, HttpServletRequest request, HttpSession session) 
    				throws Exception {

    /*	//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
	 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	       return "forward:/accessDenied.do?type=nosession";
	 	}	 	*/
	 	
    	String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
    	
    	System.out.println("################################ sTableName "+sTableName);

		//수정 항목만 저장 화면 ID 값. 기존에 iframe을 이용하여 저장하기 때문에 @로 별도 구분 안함. 또한 Null 값도 입력될 수 있도록 수정
		HashMap parameterObject =  new HashMap();
		parameterObject = RequestParse.RequestToHashMapUpdate(request);
		System.out.println("################################ parameterObject "+parameterObject);
    			
    	String jsonStr = request.getParameter("jsonData");
    	
    	System.out.println("################################ jsonStr "+jsonStr);
    	JSONObject jsonObject = JSONObject.fromObject(jsonStr);
    	
    	Map<String, Object> result = (Map<String, Object>)JSONObject.toBean(jsonObject, java.util.HashMap.class);
    	result.put("TABLENAME", sTableName);
    	
    	// 처리 상태
    	String action_flag = (String)result.get("action_flag");    	
    	String sKeyColumn = (String)result.get("KEY_COLUMN");   

    	final long startTime = System.nanoTime();

    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	try {
    		
    		System.out.println("################################ action_flag : "+action_flag);
    		
    		if( action_flag.equals("INSERT")  ||    action_flag.equals("ADD_INSERT") ){    			
    			
    			String sFtrCde = (String)result.get("FTR_CDE");
    			String sFtrIdn = (String)result.get("FTR_IDN");
    			
    			System.out.println("################################ sFtrCde : sFtrIdn "+sFtrCde+":"+sFtrIdn);
    			
    			if( sFtrCde != null && sFtrCde.contains(",") ){
    				
    				String[] aFtrCdeList = sFtrCde.split(",");
    				String[] aFtrIdnList = sFtrIdn.split(",");
    				
    				for(int i=0; i < aFtrCdeList.length; i++){
    					
    				 	result.put(sKeyColumn,commonService.getMaxID(sTableName,sKeyColumn,"FTR_CDE", aFtrCdeList[i], "FTR_IDN", aFtrIdnList[i]));
	    				result.put("FTR_CDE", aFtrCdeList[i]);
	    				result.put("FTR_IDN", aFtrIdnList[i]);
	    				result.put("FID", commonService.getNewID(sTableName, "FID"));
    					
    					List insertColumnsList = AddInfoUtil.insertColumnsList(result);
    	    			System.out.println("################################ AddInfoUtil insertColumnsList "+insertColumnsList);
    	    			
    	    			result.put("insertColumnsList", insertColumnsList);    			
    	    			System.out.println("################################ AddInfoUtil result "+result);
    				
    	    			int iCnt = registerService.insertRegister( result );
    	    			resultMsg = "success.common.insert";
    				}
    				
    			}else {
    				
    				System.out.println("################################ sTableName : "+sTableName);
    				
					//관계테이블 존재함.: 차도 : RDT_RDWY_DT AD004   보도 : RDT_SDWK_DT  AE002
					if( sTableName != null && ( sTableName.equals("RDT_SDWK_DT") || sTableName.equals("RDT_RDWY_DT"))){
						
						System.out.println("################################ 첫번째.. 조건");
						
						result.put(sKeyColumn,commonService.getNewID(sTableName, sKeyColumn));				
						result.put("insertColumnsList", AddInfoUtil.insertColumnsList(result));
						result.put("FID", commonService.getNewID(sTableName, "FID"));
						int i = registerService.insertRegister( result );						
						
						HashMap addParamObject =  new HashMap();
						addParamObject.put("FTR_CDE", (String)result.get("FTR_CDE"));
						addParamObject.put("RDA_IDN", (String)result.get("RDA_IDN"));
						addParamObject.put("SEC_IDN", (String)result.get("SEC_IDN"));
						addParamObject.put("SYS_CHK", (String)result.get("SYS_CHK"));
						
						addParamObject.put("insertColumnsList", RegisterUtil.insertColumnsList(addParamObject));
						addParamObject.put("TABLENAME", "RDL_RDAR_AS");
						addParamObject.put("FID", commonService.getNewID("RDL_RDAR_AS", "FID"));
						int iCnt = registerService.insertRegister( addParamObject );
						resultMsg = "success.common.insert";
						
					}else if( sTableName != null && sTableName.equals("RDT_ROUT_DT")){
						
						System.out.println("################################ 두번째.. 조건");
						
						result.put(sKeyColumn,commonService.getNewID(sTableName, sKeyColumn));				
						result.put("insertColumnsList", AddInfoUtil.insertColumnsList(result));
						
						System.out.println("################################ AddInfoUtil result "+result);
						result.put("FID", commonService.getNewID(sTableName, "FID"));
						int i = registerService.insertRegister( result );
						
						HashMap addParamObject =  new HashMap();
						addParamObject.put("SEC_IDN", (String)result.get("SEC_IDN"));
						addParamObject.put("RUT_IDN", (String)result.get("RUT_IDN"));						
						
						addParamObject.put("insertColumnsList", RegisterUtil.insertColumnsList(addParamObject));
						addParamObject.put("TABLENAME", "RDT_RTCN_DT");
						
						System.out.println("################################ AddInfoUtil addParamObject : "+addParamObject);
						addParamObject.put("FID", commonService.getNewID("RDT_RTCN_DT", "FID"));
						int iCnt = registerService.insertRegister( addParamObject );
						resultMsg = "success.common.insert";
						
					}else if( sTableName != null && sTableName.equals("RDT_EXAC_DT")){	//도로굴착점용허가조건
						
						result.put(sKeyColumn,commonService.getNewID(sTableName, sKeyColumn));				
						result.put("insertColumnsList", AddInfoUtil.insertColumnsList(result));
						
						System.out.println("################################ AddInfoUtil result "+result);
						result.put("FID", commonService.getNewID(sTableName, "FID"));
						int i = registerService.insertRegister( result );
						
						HashMap addParamObject =  new HashMap();
						addParamObject.put("PMS_IDN", (String)result.get("PMS_IDN"));
						addParamObject.put("AGA_NUM", (String)result.get("AGA_NUM"));						
						
						addParamObject.put("insertColumnsList", RegisterUtil.insertColumnsList(addParamObject));
						addParamObject.put("TABLENAME", "RDT_EACH_DT");
						
						System.out.println("################################ AddInfoUtil addParamObject : "+addParamObject);
						addParamObject.put("FID", commonService.getNewID("RDT_EACH_DT", "FID"));
						int iCnt = registerService.insertRegister( addParamObject );
						resultMsg = "success.common.insert";
						
					}else  if( sTableName != null && sTableName.equals("RDT_RTRP_DT")){
						
						System.out.println("################################ 도로일상보수.. 키값이 틀리네.. ");
						
						result.put(sKeyColumn,commonService.getMaxID(sTableName, sKeyColumn, "RUT_IDN", (String)result.get("RUT_IDN"), "", "" ));				
						result.put("insertColumnsList", AddInfoUtil.insertColumnsList(result));
						result.put("FID", commonService.getNewID(sTableName, "FID"));
						System.out.println("################################ AddInfoUtil result "+result);
						
						int iCnt = registerService.insertRegister( result );
						resultMsg = "success.common.insert";
					
					}else if( sTableName.contains("COST_DT") || sTableName.contains("CHNG_DT") || sTableName.contains("SUBC_DT") || sTableName.contains("REPR_DT") || sTableName.contains("FLAW_DT") ){  //공사대장 관련 테이블인 경우 
						
						System.out.println("################################ 공사대장의 하위는 또 따로?  ");
						
						result.put(sKeyColumn,commonService.getMaxID(sTableName, sKeyColumn, "CNT_NUM", (String)result.get("CNT_NUM"), "", "" ));				
						result.put("insertColumnsList", AddInfoUtil.insertColumnsList(result));
						result.put("FID", commonService.getNewID(sTableName, "FID"));
						System.out.println("################################ AddInfoUtil result "+result);
						
						int iCnt = registerService.insertRegister( result );
						resultMsg = "success.common.insert";
					
					}else if( sTableName != null && sTableName.equals("RDT_FECL_DT")){			//도로점용료산정기준관리
						
						System.out.println("################################ 도로점용료산정기준관리");
						
						result.put(sKeyColumn,commonService.getMaxID(sTableName, sKeyColumn, "JYP_CDE", (String)result.get("JYP_CDE"), "", "" ));		
	    				List insertColumnsList = AddInfoUtil.insertColumnsList(result);
		    			System.out.println("################################ AddInfoUtil insertColumnsList "+insertColumnsList);
		    			
		    			result.put("insertColumnsList", insertColumnsList);    			
		    			System.out.println("################################ AddInfoUtil result "+result);
		    			result.put("FID", commonService.getNewID(sTableName, "FID"));
		    			int iCnt = registerService.insertRegister( result );
		    			resultMsg = "success.common.insert";
					
					}else if( sTableName != null &&  sTableName.equals("RDT_OCNR_DT") ){			//도로인접지번내역
						
						System.out.println("################################ 도로인접지번내역");
						
						result.put(sKeyColumn,commonService.getMaxID(sTableName, sKeyColumn, "PMS_IDN", (String)result.get("PMS_IDN"), "", "" ));		
	    				List insertColumnsList = AddInfoUtil.insertColumnsList(result);
		    			System.out.println("################################ AddInfoUtil insertColumnsList "+insertColumnsList);
		    			
		    			result.put("insertColumnsList", insertColumnsList);    			
		    			System.out.println("################################ AddInfoUtil result "+result);
		    			result.put("FID", commonService.getNewID(sTableName, "FID"));
		    			int iCnt = registerService.insertRegister( result );
		    			resultMsg = "success.common.insert";
		    				
					}else if( sTableName != null &&  sTableName.equals("RDT_FEIM_DT") ){			//점용료부과내역
						
						System.out.println("################################ 점용료부과내역");
						
						result.put(sKeyColumn,commonService.getMaxID(sTableName, sKeyColumn, "PMS_IDN", (String)result.get("PMS_IDN"), "", "" ));		
	    				List insertColumnsList = AddInfoUtil.insertColumnsList(result);
		    			System.out.println("################################ AddInfoUtil insertColumnsList "+insertColumnsList);
		    			
		    			result.put("insertColumnsList", insertColumnsList);    			
		    			System.out.println("################################ AddInfoUtil result "+result);
		    			result.put("FID", commonService.getNewID(sTableName, "FID"));
		    			int iCnt = registerService.insertRegister( result );
		    			resultMsg = "success.common.insert";
		    				
					}else{
						
						System.out.println("################################ 세번째.... 조건");
						
						result.put(sKeyColumn,commonService.getMaxID(sTableName,sKeyColumn,"FTR_CDE", (String)result.get("FTR_CDE"), "FTR_IDN", (String)result.get("FTR_IDN")));
	    				List insertColumnsList = AddInfoUtil.insertColumnsList(result);
		    			System.out.println("################################ AddInfoUtil insertColumnsList "+insertColumnsList);
		    			
		    			result.put("insertColumnsList", insertColumnsList);    			
		    			System.out.println("################################ AddInfoUtil result "+result);
		    			result.put("FID", commonService.getNewID(sTableName, "FID"));
		    			int iCnt = registerService.insertRegister( result );
		    			resultMsg = "success.common.insert";
					}
					
					
    			}

    		}else if( action_flag.equals("UPDATE") || action_flag.equals("ADD_UPDATE") ) {
    			
    			List updateColumnsList = AddInfoUtil.updateColumnsList(result);
    			System.out.println("################################ AddInfoUtil insertColumnsList "+updateColumnsList);
    			
    			result.put("updateColumnsList", updateColumnsList);		
    			
    			System.out.println("################################ AddInfoUtil result "+result);
				registerService.updateRegister( result );    
				
				resultMsg = "success.common.update";
				
    		}
    		
    	} catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "등록 오류 발생";
    	}

    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);

    	return "jsonView";
    }
    
    /**
	 * DB 삭제 처리
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/AddInfoProcDelete.do")
    public String addInfoProcDelete(ModelMap model, HttpServletRequest request, HttpSession session) 
    throws Exception {
    	
    	/*//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
	 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	       return "forward:/accessDenied.do?type=nosession";
	 	}	 	*/
	 	
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
    	String sG2Id = StringUtil.nvl(request.getParameter("FID"));
    	
    	HashMap parameterObject =  new HashMap();
    	parameterObject.put("FID", sG2Id);
    	parameterObject.put("TABLENAME", sTableName);
    	
    	try {
    		    		
    		if( sTableName != null && ( sTableName.equals("RDT_SDWK_DT") || sTableName.equals("RDT_RDWY_DT"))){	
    			resultCnt = addInfoService.deleteRdlRdarAs( parameterObject );
    		}
    		
    		if( sTableName != null && sTableName.equals("RDT_ROUT_DT")){
    			resultCnt = addInfoService.deleteRdtRtcnDt( parameterObject );
    		}
    		
    		if( sTableName != null && sTableName.equals("RDT_EXAC_DT")){
    			resultCnt = addInfoService.deleteRdtEachDt( parameterObject );
    		}
    		
    		resultCnt = addInfoService.deleteAddInfo( parameterObject );
    		resultMsg = "success.common.delete";
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
    		errorMsg = "삭제 오류 발생";
    	}
    	
    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);
    	//model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수
    	
    	return "jsonView";
    }
    
    /**
	 * DB 삭제 처리 : 목록에서 복수개 선택 삭제
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/AddInfoProcDeleteMulti.do")
    public String wttWutlHtProcDeleteMulti(ModelMap model, HttpServletRequest request, HttpSession session) 
    throws Exception {
    	
    	String resultMsg = "DELETE_SUCCESS";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	String[] FID = request.getParameterValues("FID");
    	//String[] FID = dataVO.getFID().split(",");
    	HashMap parameterObject =  new HashMap();
    	
    	for(int i = 0; i < FID.length; i++) {
        	try {
        		//dataVO.setFID(FID[i].trim());
        		parameterObject.put("FID", FID[i]);
        		resultCnt += addInfoService.deleteAddInfo( parameterObject );
        	} catch(Exception e) {
        		log.debug("[복수 삭제 처리시 오류] : " + e.toString());
        		resultMsg = "ERROR";
        		errorMsg = "삭제 오류 발생";
        	}
		}

    	// 결과 처리용 [수정X]
        model.addAttribute("resultMsg", resultMsg);
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);
    	model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수
    	
    	return "/usolver/com/cmm/commonMsg";
    }
}   