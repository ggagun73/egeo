package usolver.book.web;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import usolver.admin.log.elg.service.EditLogService;
import usolver.admin.log.elg.vo.EditLog;
import usolver.book.service.AddInfoService;
import usolver.book.service.BookService;
import usolver.book.service.RegisterService;
import usolver.book.util.AddInfoUtil;
import usolver.book.util.RegisterUtil;
import usolver.book.util.RequestParse;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.EtcUtil;
import usolver.com.cmm.util.ExcelViewRegister;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.CodeVO;
import usolver.com.cmm.vo.UsvUserFieldVO;
import usolver.com.main.vo.LoginVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.let.utl.sim.service.EgovClntInfo;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 *
 * @Class Name : RegistrationController.java
 * @Description : Controller Class
 * @Modification Information
 * @
 * @  수정일                      수정자               수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 4. 11.     Administrator     최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2016. 4. 11.
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class RegisterController {

	/** LOG4J */
	private Logger log = Logger.getLogger(this.getClass());

	/** RegisterService */
	@Resource(name = "registerService")
	private RegisterService registerService;

	/** CommonService */
	@Resource(name = "commonService")
	private CommonService commonService;
	
	/** AddInfoService */
	@Resource(name = "addInfoService")
	private AddInfoService  addInfoService;
	
	/** CommonService */
	@Resource(name = "bookService")
	private BookService bookService;
	
	/** CommonService */
	@Resource(name = "EditLogService")
	private EditLogService EditLogService;
	
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	private EgovMessageSource egovMessageSource;
	
	
	
	/** 권한 구분용 아이디 */
	private String auth_id = "";

	/**
	 * 목록화면
	 * @param VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerList.do")
	public String RegisterList(	ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {

		String sTableName = String.valueOf(request.getParameter("TABLENAME"));

		System.out.println("########################################## TABLENAME => "+sTableName);

		//전달 Map
		HashMap parameterObject =  new HashMap();
		//조회 컬럼 항목 테이블명
		parameterObject.put("TABLENAME", sTableName);
		List selectColumnsList = registerService.selectColumnsList(parameterObject);
		System.out.println("########################################## selectColumnsList => "+selectColumnsList);

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

		// 행정구
		/*cv.setCODE_ID("HJD_CDE");
		model.addAttribute("hjd_cde_list", commonService.selectG2SCd(cv));*/
		
		// 권한 처리
		// 공통 삽입 공간
		model.addAttribute("TABLENAME", sTableName );
		model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );

		//파일 호출
		String sFileName = RegisterUtil.viewFileName(sTableName, "List");
		
		String formView=sFileName+"List";
		
		System.out.println("formView==>"+formView);
		return formView;
	}

	/**
	 * 목록 화면
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerListXml.do")
	public void registerListXml(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		//전달 Map
		HashMap parameterObject =  new HashMap();
		//검색 항목만 저장 화면 ID 값 @시작됨
		parameterObject = RequestParse.RequestToHashMap(request);
		System.out.println(" #####################################   parameterObject =>"+parameterObject);
		
		//행정동검색시에는 시, 구도 모두 포함되어서 들어옴.. 그러면 시, 구일경우에는 하위항목까지 검색하도록 수정해야함.   : 시/군에 따라 자릿수 잘 확인해야함.      
        if( parameterObject.get("HJD_CDE") != null ){
        	String sHjdCde = (String)parameterObject.get("HJD_CDE");
        	if( sHjdCde.substring(2).equals("00000000") ) {
	        	parameterObject.put("HJS_CD", sHjdCde.substring(0,2));
	        	parameterObject.remove("HJD_CDE");
        	}else if( sHjdCde.substring(4).equals("000000") ) {
	        	parameterObject.put("HJG_CD", sHjdCde.substring(0,4));
	        	parameterObject.remove("HJD_CDE");
        	}        	
        };
        
        
        //조회 컬럼 항목 테이블명
  		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
  		System.out.println(" #####################################   TABLENAME =>"+sTableName);
  		parameterObject.put("TABLENAME", sTableName);
      		
  		// 검색 컬럼 쿼리 생성
     	List searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
		parameterObject.put("searchColumnsList", searchColumnsList);
		System.out.println(" #####################################   searchColumnsList =>"+searchColumnsList);

		//조회 컬럼 가져오기
		List selectColumnsList = registerService.selectColumnsList(parameterObject);

		//조회 컬럼 항목 쿼리 생성
		List selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
		parameterObject.put("selectColumnsList", selectColumnsRetList);        
		System.out.println(" #####################################   selectColumnsRetList =>"+selectColumnsRetList);

		// 페이징 처리
		int page = StringUtil.parseInt( request.getParameter("page"));
		int rows = StringUtil.parseInt( request.getParameter("rows"));
		int firstIndex = rows * page - rows;

		parameterObject.put("firstIndex", firstIndex);
		parameterObject.put("lastIndex", firstIndex+rows);

		// 정렬순서 (필수)
		String sidx = StringUtil.nvl( request.getParameter("sidx"));
		String sord = StringUtil.nvl( request.getParameter("sord"));
		if( sidx.equals("") )
			parameterObject.put("OrderByColumn", "FID");
		else
			parameterObject.put("OrderByColumn", sidx);
		if( sord.equals("") )
			parameterObject.put("OrderByType", "DESC");
		else
			parameterObject.put("OrderByType",sord);

		// 공간속성검색을 통해 검색된 개체들(복수레이어/개체)에 대한 처리를 위해
		/*if(StringUtil.nvl( request.getParameter("LAYER_MAP"))  != ""){
			JSONParser jsonParser = new JSONParser();
			Object obj = jsonParser.parse(StringUtil.nvl( request.getParameter("LAYER_MAP")));
			JSONObject jsonLayerObj = (JSONObject) obj;

			JSONObject b = (JSONObject) jsonLayerObj.get(auth_id);
			JSONObject jsonFeatureObj = (JSONObject) b;

			JSONArray c = (JSONArray) jsonFeatureObj.get("g2_id");
			int len = c.size();

			List<String> arrG2ID = new ArrayList<String>();

			for(int i=0; i<len; i++){
				arrG2ID.add(c.get(i).toString());
			}

			parameterObject.put("G2_ID_MAP",arrG2ID);

		}*/
		// 공간속성검색 변경으로인한 수정
		if(StringUtil.nvl( request.getParameter("G2_ID_MAP[]"))  != ""){
			String[] tempMap = request.getParameterValues("G2_ID_MAP[]");
			parameterObject.put("G2_ID_MAP",tempMap);
		}

		// 공통 삽입 공간
		model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, auth_id) );
		model.addAttribute("LAYER_MAP", StringUtil.nvl( request.getParameter("LAYER_MAP")) );
		model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );

		// 목록 요청
		List xmlData = null;
        int total_count = 0;     
             
        
        System.out.println(" #####################################   parameterObject =>"+parameterObject);
    	xmlData = registerService.registerList(parameterObject);
       	total_count = registerService.registerListCnt(parameterObject);

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

    /**
   	 * (공통팝업) 공사번호 조회 및 설정
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @param model
   	 * @return ""
   	 * @exception Exception
   	 */
	 @RequestMapping(value="/register/registerSearch.do")
       public String registerSearch(ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
       	
	       	String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
	       	System.out.println(" #####################################   TABLENAME =>"+sTableName);
			model.addAttribute("TABLENAME", sTableName );
			model.addAttribute("KEY_COLUMN", StringUtil.nvl(request.getParameter("KEY_COLUMN")) );
			model.addAttribute("openerId", StringUtil.nvl(request.getParameter("openerId")) );

			//파일 호출
			String sFileName = RegisterUtil.viewFileName(sTableName, "List");
			
			String formView=sFileName+"Search";
			
			System.out.println("formView==>"+formView);
			return formView;
       }
       
	/**
	 * 신규 등록 & 수정 & 뷰 화면
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerCRU.do")
	public String registerCRU(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		// 권한 처리

		Map result = new HashMap();
		// 검색 키
		//String selectedId = StringUtil.nvl( searchVO.getFID() );
		String  g2Id=String.valueOf(request.getParameter("FID"));

		
		//신규등록
		String sNewInsert = StringUtil.nvl(request.getParameter("NEWINSERT"));

		//전달 Map
		HashMap parameterObject =  new HashMap();
		

		//조회 컬럼 항목 테이블명
		//parameterObject.put("TABLENAME", auth_id);
		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", sTableName);

		List selectColumnsList = registerService.selectColumnsList(parameterObject);
		//조회 컬럼 항목 쿼리 생성
		List selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
		parameterObject.put("selectColumnsList", selectColumnsRetList);
		
		//g2Id 가 아닌 colum에 대한 값이 들어왔을 경우 g2id값을 찾아서... 보여주자.. 
		String sKeyColumn = StringUtil.nvl(request.getParameter("KEY_COLUMN"));
		
		if( sKeyColumn  != null &&  !sKeyColumn.equals("") ){
			System.out.println("sKeyColumn =>   "+ sKeyColumn  );
			System.out.println("StringUtil.nvl(request.getParameter(sKeyColumn)) =>   "+  request.getParameter(sKeyColumn)  );
			System.out.println("StringUtil.nvl(request.getParameter(sKeyColumn)) =>   "+  new String(request.getParameter(sKeyColumn).getBytes("ISO-8859-1"), "UTF-8") );
		}
		
		if( sKeyColumn != null && sKeyColumn.length() > 0){
			
			JSONObject jCondition = new JSONObject();	
			
			//상수관로, 급수관로를 참조하는 것들이 왜이리 많으냐.. 
			//상수, 하수를 먼저하다보니.. 도로쪽 사항이 더 많은데.. 예외처리되고 있슴다.. ㅠㅠ. 
			//SEC_IDN : 도로구간번호   IPC_IDN : 도로중심선교점  ROU_IDN : 우회도로  CLB_IDN : 오르막차로		GLA_IDN : 심의대장  
			if( sKeyColumn.contains("IDN")   && !sKeyColumn.equals("PMS_IDN") && !sKeyColumn.contains("SEC_IDN") && !sKeyColumn.contains("IPC_IDN") && !sKeyColumn.contains("ROU_IDN") && !sKeyColumn.contains("CLB_IDN")
					&& !sKeyColumn.contains("GLA_IDN")	){
				jCondition.put("FTR_IDN", StringUtil.nvl(request.getParameter(sKeyColumn)));  
			}else {
				jCondition.put(sKeyColumn, StringUtil.nvl(request.getParameter(sKeyColumn))); 
			}
			g2Id = registerService.registerGetSelectColumn(sTableName,  "FID", jCondition );
		}
		
		parameterObject.put("FID", g2Id);
		
		if( g2Id != null && !g2Id.equals("") && !sNewInsert.equals("true")) {
			result = registerService.registerDetail( parameterObject );
			
			//조회결과값이 없는 경우 에러처리 필수... 난중에 만들자..^^
		   if( result == null  || result.size() < 1 ){			   
			   return "forward:/accessDenied.do";
		   }
			
			model.addAttribute("action_flag", "UPDATE" );	// 처리 상태
			
			//도로노선, 차도구간, 보도구간 조회화면에서 하단에 도로구간 조회하는 버튼이 있음. 
			//우선은 연계 테이블에서 가져오는데 이렇게 가져오는게 맞는지 확인 필요.. 
			//다중값이 있을때는 우째해야할지... 
			 if( sTableName.equals("RDT_ROUT_DT")){
				 
				JSONObject jCondition = new JSONObject();	
				jCondition.put("RUT_IDN", result.get("rutIdn").toString() );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ 
				
				String sSecIdn = registerService.registerGetSelectColumn("RDT_RTCN_DT", "MAX(SEC_IDN) AS SEC_IDN", jCondition );
    			result.put("secIdn", sSecIdn);
					
			 }else if( sTableName.equals("RDT_RDWY_DT") || sTableName.equals("RDT_SDWK_DT")){
				 
				 JSONObject jCondition = new JSONObject();	
				 jCondition.put("RDA_IDN", result.get("rdaIdn").toString() );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ 
				 jCondition.put("FTR_CDE", result.get("ftrCde").toString() );
				 
				 String sSecIdn = registerService.registerGetSelectColumn("RDL_RDAR_AS", "MAX(SEC_IDN) AS SEC_IDN", jCondition );
    			 result.put("secIdn", sSecIdn);
	    			
			 }else if( sTableName.equals("RDT_EXAC_DT")){
				 
				JSONObject jCondition = new JSONObject();	
				jCondition.put("AGA_NUM", result.get("agaNum").toString() );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ 
				
				String sPmsIdn = registerService.registerGetSelectColumn("RDT_EACH_DT", "MAX(PMS_IDN) AS PMS_IDN", jCondition );
    			result.put("pmsIdn", sPmsIdn);
					
			 }
			 
		}else if(  g2Id != null && !g2Id.equals("") && sNewInsert.equals("true")){
			model.addAttribute("action_flag", "INSERT" );
			
			if(sTableName.equals("WTL_LEAK_PS")){
				result.put("g2Id", commonService.getNewID("WTL_LEAK_PS", "FID"));
			}
			
			String sSecIdn = StringUtil.nvl(request.getParameter("SEC_IDN"));
			if( sSecIdn != null ){
				result.put("secIdn", sSecIdn);
			}
		}else {
			
			//조회값이 없는 경우.. 
			model.addAttribute("resultMsg", "NO_DATA");
			 return  "/usolver/com/cmm/commonMsg";
			
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

		// 메인 데이터
		model.addAttribute("result", result);
		model.addAttribute("TABLENAME", sTableName );
		model.addAttribute("nJDSKSubId", StringUtil.nvl(request.getParameter("nJDSKSubId")) );
		model.addAttribute("openerId", StringUtil.nvl(request.getParameter("openerId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
		
		String sFileName = RegisterUtil.viewFileName(sTableName, "CRU");
  		
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
	@RequestMapping(value="/register/registerProcWrite.do")
	public String registerProcWrite(Model model, HttpServletRequest request, HttpSession session) 
			throws Exception {
		//전달 Map
		HashMap parameterObject =  new HashMap();

		//수정 항목만 저장 화면 ID 값. 기존에 iframe을 이용하여 저장하기 때문에 @로 별도 구분 안함. 또한 Null 값도 입력될 수 있도록 수정
		parameterObject = RequestParse.RequestToHashMapUpdate(request);


		/*  	// 로그인 사용자의 정보를 등록
       	LoginVO usr = (LoginVO) session.getAttribute("system_user");
     	parameterObject.put("USER_ID", usr.getUSER_ID());
     	parameterObject.put("USER_NAME", usr.getUSER_NAME());
		 */

		// 처리 상태
		String action_flag = StringUtil.nvl(request.getParameter("action_flag"));	

		final long startTime = System.nanoTime();

		String resultMsg = "";
		String errorMsg = "";       	
		String sG2ID = StringUtil.nvl(request.getParameter("FID"));
		
		Calendar calendar = new GregorianCalendar(Locale.KOREA);
	    String sYear = calendar.get(Calendar.YEAR)+"";
		System.out.println(" #####################################   parameterObject =>"+parameterObject);
		//????? parameterObject = RequestParse.RequestToHashMap2(request);
		try {
			if( action_flag.equals("UPDATE") ) {
				//수정 항목만 저장 화면 ID 값. 기존에 iframe을 이용하여 저장하기 때문에 @로 별도 구분 안함. 		
				List updateColumnsList = RegisterUtil.updateColumnsList(parameterObject);
				parameterObject.put("updateColumnsList", updateColumnsList);
				registerService.updateRegister( parameterObject );    

				resultMsg = "UPDATE_SUCCESS";

			}else if(action_flag.equals("INSERT")){
				
				String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
				String sKeyColumn = StringUtil.nvl(request.getParameter("KEY_COLUMN"));
				
				//공사는 공사번호 따는 형식이 조금 다름.. 
				if( sTableName.contains("CONS_MA")){					
					// WATER : SA   SEWER : SB  ROAD : RD					
					String sPreCode = "SA";
					if( sTableName.startsWith("RDT") )  sPreCode = "RD";
					if( sTableName.startsWith("SWT") )  sPreCode = "SB";
					if( sTableName.contains("WTT_SPLY_MA") )   sPreCode = "SU";
					
					parameterObject.put(sKeyColumn,commonService.getNewID(sTableName,sKeyColumn, 4, sPreCode));
				
				}else if( sTableName.contains("IMGE_MA")){
					
					//도면 및 사진의 관리번호 : 시스템 년도(4자리) + 일련번호(4자리)
					parameterObject.put(sKeyColumn,commonService.getNewID(sTableName,sKeyColumn, 4, sYear));
				}else if( sTableName.contains("SWT_SPMT_MA") || sTableName.contains("SWT_SSER_MA") || sTableName.contains("WTT_WSER_MA") || sTableName.contains("WTT_SPLY_MA") || sTableName.contains("RDT_RSER_MA")){
					//민원의 경우는 년도+
					parameterObject.put(sKeyColumn,commonService.getNewID(sTableName,sKeyColumn, 4 ));
				}else {
					parameterObject.put(sKeyColumn,commonService.getNewID(sTableName, sKeyColumn));					
				}
				
				parameterObject.put("FID", commonService.getNewID(sTableName, "FID"));
				
				System.out.println("################## parameterObject = "+parameterObject);
				
				List insertColumnsList = RegisterUtil.insertColumnsList(parameterObject);
				parameterObject.put("insertColumnsList", insertColumnsList);
				int i = registerService.insertRegister( parameterObject );

				resultMsg = "INSERT_SUCCESS";
				
				//관계테이블 존재함.: 차도 : RDT_RDWY_DT AD004   보도 : RDT_SDWK_DT  AE002
				if( sTableName != null && ( sTableName.equals("RDT_SDWK_DT") || sTableName.equals("RDT_RDWY_DT"))){
					HashMap addParamObject =  new HashMap();
					addParamObject.put("FTR_CDE", StringUtil.nvl(parameterObject.get("FTR_CDE")));
					addParamObject.put("RDA_IDN", StringUtil.nvl(parameterObject.get("RDA_IDN")));
					addParamObject.put("SEC_IDN", StringUtil.nvl(parameterObject.get("SEC_IDN")));
					addParamObject.put("SYS_CHK", StringUtil.nvl(parameterObject.get("SYS_CHK")));
					
					List addInsertColumnsList = RegisterUtil.insertColumnsList(addParamObject);
					addParamObject.put("insertColumnsList", addInsertColumnsList);
					addParamObject.put("TABLENAME", "RDL_RDAR_AS");
					
					int iResult = registerService.insertRegister( addParamObject );
				}
				
				if( sTableName != null && sTableName.equals("RDT_ROUT_DT")){
					
					HashMap addParamObject =  new HashMap();
					addParamObject.put("SEC_IDN", StringUtil.nvl(parameterObject.get("SEC_IDN")));
					addParamObject.put("RUT_IDN", StringUtil.nvl(parameterObject.get("RUT_IDN")));

					List addInsertColumnsList = RegisterUtil.insertColumnsList(addParamObject);
					addParamObject.put("insertColumnsList", addInsertColumnsList);
					addParamObject.put("TABLENAME", "RDT_RTCN_DT");
					
					int iResult = registerService.insertRegister( addParamObject );
				}
				
				if( sTableName != null && sTableName.equals("RDT_EXAC_DT")){	//도로굴착점용허가조건
					
					HashMap addParamObject =  new HashMap();
					addParamObject.put("PMS_IDN", StringUtil.nvl(parameterObject.get("PMS_IDN")));
					addParamObject.put("AGA_NUM", StringUtil.nvl(parameterObject.get("AGA_NUM")));

					List addInsertColumnsList = RegisterUtil.insertColumnsList(addParamObject);
					addParamObject.put("insertColumnsList", addInsertColumnsList);
					addParamObject.put("TABLENAME", "RDT_EACH_DT");
					
					int iResult = registerService.insertRegister( addParamObject );
				}

				//기존거 쓰다가 지저분해진다... 새로만들까나? 
				//sG2ID  = String.valueOf(Integer.parseInt(commonService.getNewID(sTableName, "FID"))-1);
				sG2ID = (String)parameterObject.get("FID");
				
			}
		} catch(Exception e) {
			resultMsg = "ERROR";
			errorMsg = "등록 오류 발생";
		}

		// 결과 처리용 [수정X]
		
		model.addAttribute("g2Id", sG2ID);
		model.addAttribute("resultMsg", resultMsg);
		model.addAttribute("errorMsg", errorMsg);
		model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수

		return  "/usolver/com/cmm/commonMsg";
	}

	/**
	 * 대장 일괄
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerMU.do")
	public String registerMU(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		// 권한 처리
		// 공통 삽입 공간
		model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, auth_id) );

		Map result = new HashMap();

		//전달 Map
		HashMap parameterObject =  new HashMap();
				
		// 검색 키
		String[] selectedIdArr = StringUtil.nvl( request.getParameter("FID") ).split(",");
		String selectedId = StringUtil.nvl( selectedIdArr[0] ).trim();
		log.debug(" #####################################   selectedId =>"+selectedId);
		if( !selectedId.equals("") ) {

			result.put("g2Id", StringUtil.nvl(request.getParameter("FID")));			
			result.put("ftrCde",StringUtil.nvl(request.getParameter("FTR_CDE")));			
			result.put("ftrIdn",StringUtil.nvl(request.getParameter("FTR_IDN")));			

			model.addAttribute("action_flag", "BATCHUP" );	// 일괄수정
		}

		//조회 컬럼 항목 테이블명
		//parameterObject.put("TABLENAME", auth_id);
		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		log.debug(" #####################################   TABLENAME =>"+sTableName);
		parameterObject.put("TABLENAME", sTableName);
		List selectColumnsList = registerService.selectColumnsList(parameterObject);
		//조회 컬럼 항목 쿼리 생성
		List selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
		parameterObject.put("selectColumnsList", selectColumnsRetList);

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

		// 메인 데이터
		model.addAttribute("result",  result);
		model.addAttribute("batch_cnt", selectedIdArr.length);	// 일괄 처리 대상 수
		model.addAttribute("TABLENAME", sTableName );
		model.addAttribute("nJDSKSubId", StringUtil.nvl(request.getParameter("nJDSKSubId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );

		//파일명, 파일위치 호출	
		String sFileName = RegisterUtil.viewFileName(sTableName, "view");
		String formView=sFileName+"CRU";

		return formView;
	}


	/**
	 * DB 등록/수정 처리(대장일괄)
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerMUProcWrite.do")
	public String registerMUProcWrite( Model model,HttpServletRequest request, HttpServletResponse response, HttpSession session) 
			throws Exception {
	 	
		//전달 Map
		HashMap parameterObject =  new HashMap();

		//수정 항목만 저장 화면 ID 값 @시작됨 변경 값이 있는것만 가져옴
		parameterObject = RequestParse.RequestToHashMap2(request);

		// 수정 컬럼 쿼리 생성
		List updateColumnsList = RegisterUtil.updateColumnsList(parameterObject);
		parameterObject.put("updateColumnsList", updateColumnsList);
		log.debug(" #####################################   updateColumnsList =>"+updateColumnsList);

		//시설물 테이블명
		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		log.debug(" #####################################   TABLENAME =>"+sTableName);
		parameterObject.put("TABLENAME", sTableName);

		// 로그인 사용자의 정보를 등록
		/*	LoginVO usr = (LoginVO) session.getAttribute("system_user");
        	dataVO.setSystem_user_id( usr.getUSER_ID() );
        	dataVO.setSystem_user_nm( usr.getUSER_NAME() );*/

		// 권한 처리
		// 공통 삽입 공간
		model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, auth_id) );

		// 처리 상태
		String action_flag = StringUtil.nvl(request.getParameter("action_flag"));

		final long startTime = System.nanoTime();

		String resultMsg = "";
		int resultCnt = 0;
		String errorMsg = "";

		try {

			if( action_flag.equals("BATCHUP") ) {
				String[] selectedIdArr = StringUtil.nvl(  request.getParameter("FID") ).split(",");
				String selectedId = StringUtil.nvl( selectedIdArr[0] ).trim();

				if( !selectedId.equals("") ) {
					for(int i = 0; i < selectedIdArr.length; i++) {
						try {

							parameterObject.put("FID", selectedIdArr[i].trim());

							//PL/SQL로 하니 -1이 나와서
							resultCnt += Math.abs(registerService.updateRegister( parameterObject ));
						} catch(Exception e) {
							log.debug("[일괄 수정 처리시 오류] : " + e.toString());
							resultMsg = "ERROR";
							errorMsg = "삭제 오류 발생";
						}
					}
				}
				resultMsg = "UPDATE_SUCCESS";
			}
		} catch(Exception e) {
			resultMsg = "ERROR";
			errorMsg = "등록 오류 발생";
		}

		// 결과 처리용 [수정X]
		model.addAttribute("resultMsg", resultMsg);
		model.addAttribute("resultCnt", resultCnt);
		model.addAttribute("errorMsg", errorMsg);
		model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수


		return  "/usolver/com/cmm/commonMsg";
	}

	
	 /**
	 * DB 삭제 처리
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/register/registerProcDelete.do")
    public String registerProcDelete(ModelMap model, HttpServletRequest request, HttpSession session)  throws Exception {
    	
    	/*//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
	 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	       return "forward:/accessDenied.do?type=nosession";
	 	}	 	*/
	 	
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
    	
    	
    	
    	HashMap parameterObject =  new HashMap();    
    	parameterObject.put("TABLENAME", sTableName);
    	//parameterObject.put("FID", sG2Id);
    	    	
    	try {
    		String[] selectedG2Ids = StringUtil.nvl(  request.getParameter("FID") ).split(",");
    		//String selectedG2Id = StringUtil.nvl( selectedG2Ids[0] ).trim();
    		
    		for(int i=0; i<selectedG2Ids.length; i++){
    			parameterObject.put("FID", selectedG2Ids[i].trim());
    			//관계테이블, 하위테이블이 있는 경우 먼저 삭제.. 
	    		//차도, 보도면인경우 도로구간과 연결 테이블 존재 
	    		if( sTableName != null && ( sTableName.equals("RDT_SDWK_DT") || sTableName.equals("RDT_RDWY_DT"))){	
	    			resultCnt = addInfoService.deleteRdlRdarAs( parameterObject );
	    			resultMsg = "DELETE_SUCCESS";
	    		}
	    		
	    		//도로노선인 경우 도로구간 연결정보, 도로일상보수 존재 
	    		if( sTableName != null && sTableName.equals("RDT_ROUT_DT")){
	    			
	    			//도로구간 연결정보 삭제 
	    			resultCnt = addInfoService.deleteRdtRtcnDt( parameterObject );
	    			
	    			//노선번호 먼저 가져오고.. 이거 열라 귀찮네.. 쩝.. 
	       		 	JSONObject jCondition = new JSONObject();	
	    			jCondition.put("FID", selectedG2Ids[i].trim() );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ     			 
	    			String sRutIdn = registerService.registerGetSelectColumn("RDT_ROUT_DT", "RUT_IDN", jCondition );
	    			
	    			//도로일상보수 삭제 
	    			resultCnt = addInfoService.deleteRelation( "RDT_RTRP_DT", "CNT_NUM", sRutIdn );   
	    			resultMsg = "DELETE_SUCCESS";
	    			
	    		}
	    		
	    		//도로굴착점용허가조건인 경우 허가조건내역 존재 
	    		if( sTableName != null && sTableName.equals("RDT_EXAC_DT")){
	    			
	    			//도로구간 연결정보 삭제 
	    			resultCnt = addInfoService.deleteRdtRtcnDt( parameterObject );
	    			
	    			//노선번호 먼저 가져오고.. 이거 열라 귀찮네.. 쩝.. 
	       		 	JSONObject jCondition = new JSONObject();	
	    			jCondition.put("FID", selectedG2Ids[i].trim() );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ     			 
	    			String sAgaNum = registerService.registerGetSelectColumn("RDT_EXAC_DT", "AGA_NUM", jCondition );
	    			
	    			//도로일상보수 삭제 
	    			resultCnt = addInfoService.deleteRelation( "RDT_EACH_DT", "PMS_IDN", sAgaNum );   //pms_idn 인지 aga_num인지
	    			resultMsg = "DELETE_SUCCESS";
	    			
	    		}
	    		
	    		//공사대장인 경우 
	    		if( sTableName != null &&  sTableName.equals("RDT_CONS_MA") ){
	    			
	    			//공사번호 먼저 가져오고.. 이거 열라 귀찮네.. 쩝.. 
		       		 JSONObject jCondition = new JSONObject();	
		   			 jCondition.put("FID", selectedG2Ids[i].trim() );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ 
		   			 
		   			 String sCntNum = registerService.registerGetSelectColumn("RDT_CONS_MA", "CNT_NUM", jCondition );
		   			 
		   			 //해당 테이블들 삭제하공.. 	
					 resultCnt = addInfoService.deleteRelation("RDT_COST_DT"	, "CNT_NUM", sCntNum );		//공사비지급내역
					 resultCnt = addInfoService.deleteRelation("RDT_CHNG_DT"	, "CNT_NUM", sCntNum );		//설계변경내역
					 resultCnt = addInfoService.deleteRelation("RDT_REPR_DT"	, "CNT_NUM", sCntNum ); 	//하자보수내역
					 resultCnt = addInfoService.deleteRelation("RDT_SUBC_DT"	, "CNT_NUM", sCntNum ); 	//하도급내역	 
		   			 
					 resultMsg = "DELETE_SUCCESS";
	    		}
	    		
	    		//메인테이블 대장 삭제  :  다중삭제 추가해야하나? 
	    		if( !resultMsg.equals("ERROR") ){	
	    			resultCnt = addInfoService.deleteAddInfo( parameterObject );
	    			resultMsg = "DELETE_SUCCESS";
	    		}
    		}
    	} catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "삭제 오류 발생";
    	}
    	   	
    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg", resultMsg);
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);
    	model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수
    	
    	System.out.println(" resultMsg ===> "+resultMsg);

    	return "/usolver/com/cmm/commonMsg";
    }
/*    public String registerProcDelete(ModelMap model, HttpServletRequest request, HttpSession session)  throws Exception {
    	
    	//로그인 정보가 없는 경우.. : type=nosession ,  duplication,  disapprove
	 	if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
	       return "forward:/accessDenied.do?type=nosession";
	 	}	 	
    	
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
    	String sG2Id = StringUtil.nvl(request.getParameter("FID"));
    	
    	HashMap parameterObject =  new HashMap();    
    	parameterObject.put("TABLENAME", sTableName);
    	parameterObject.put("FID", sG2Id);
    	
    	try {
    		
    		//관계테이블, 하위테이블이 있는 경우 먼저 삭제.. 
    		//차도, 보도면인경우 도로구간과 연결 테이블 존재 
    		if( sTableName != null && ( sTableName.equals("RDT_SDWK_DT") || sTableName.equals("RDT_RDWY_DT"))){	
    			resultCnt = addInfoService.rdlRdarAsDelete( parameterObject );
    			resultMsg = "DELETE_SUCCESS";
    		}
    		
    		//도로노선인 경우 도로구간 연결정보, 도로일상보수 존재 
    		if( sTableName != null && sTableName.equals("RDT_ROUT_DT")){
    			
    			//도로구간 연결정보 삭제 
    			resultCnt = addInfoService.rdtRtcnDtDelete( parameterObject );
    			
    			//노선번호 먼저 가져오고.. 이거 열라 귀찮네.. 쩝.. 
    			JSONObject jCondition = new JSONObject();	
    			jCondition.put("FID", sG2Id );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ     			 
    			String sRutIdn = registerService.registerGetSelectColumn("RDT_ROUT_DT", "RUT_IDN", jCondition );
    			
    			//도로일상보수 삭제 
    			resultCnt = addInfoService.relationDelete( "RDT_RTRP_DT", "CNT_NUM", sRutIdn );   
    			resultMsg = "DELETE_SUCCESS";
    			
    		}
    		
    		//도로굴착점용허가조건인 경우 허가조건내역 존재 
    		if( sTableName != null && sTableName.equals("RDT_EXAC_DT")){
    			
    			//도로구간 연결정보 삭제 
    			resultCnt = addInfoService.rdtRtcnDtDelete( parameterObject );
    			
    			//노선번호 먼저 가져오고.. 이거 열라 귀찮네.. 쩝.. 
    			JSONObject jCondition = new JSONObject();	
    			jCondition.put("FID", sG2Id );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ     			 
    			String sAgaNum = registerService.registerGetSelectColumn("RDT_EXAC_DT", "AGA_NUM", jCondition );
    			
    			//도로일상보수 삭제 
    			resultCnt = addInfoService.relationDelete( "RDT_EACH_DT", "PMS_IDN", sAgaNum );   //pms_idn 인지 aga_num인지
    			resultMsg = "DELETE_SUCCESS";
    			
    		}
    		
    		//공사대장인 경우 
    		if( sTableName != null &&  sTableName.equals("RDT_CONS_MA") ){
    			
    			//공사번호 먼저 가져오고.. 이거 열라 귀찮네.. 쩝.. 
    			JSONObject jCondition = new JSONObject();	
    			jCondition.put("FID", sG2Id );  //검색조건이 여러개인 경우 때문에 이짓을.. ㅠㅠ 
    			
    			String sCntNum = registerService.registerGetSelectColumn("RDT_CONS_MA", "CNT_NUM", jCondition );
    			
    			//해당 테이블들 삭제하공.. 	
    			resultCnt = addInfoService.relationDelete("RDT_COST_DT"	, "CNT_NUM", sCntNum );		//공사비지급내역
    			resultCnt = addInfoService.relationDelete("RDT_CHNG_DT"	, "CNT_NUM", sCntNum );		//설계변경내역
    			resultCnt = addInfoService.relationDelete("RDT_REPR_DT"	, "CNT_NUM", sCntNum ); 	//하자보수내역
    			resultCnt = addInfoService.relationDelete("RDT_SUBC_DT"	, "CNT_NUM", sCntNum ); 	//하도급내역	 
    			
    			resultMsg = "DELETE_SUCCESS";
    		}
    		
    		//메인테이블 대장 삭제  :  다중삭제 추가해야하나? 
    		if( !resultMsg.equals("ERROR") ){	
    			resultCnt = addInfoService.addInfoDelete( parameterObject );
    			resultMsg = "DELETE_SUCCESS";
    		}
    		
    	} catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "삭제 오류 발생";
    	}
    	
    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg", resultMsg);
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);
    	model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수
    	
    	System.out.println(" resultMsg ===> "+resultMsg);
    	
    	return "/usolver/com/cmm/commonMsg";
    }
*/	    
	/**
	 * 엑셀 다운로드
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerExcel.do")
	public View registerExcel( Model model,HttpServletRequest request, HttpServletResponse response, HttpSession session) 
			throws Exception {

		//전달 Map
		HashMap parameterObject =  new HashMap();

		//검색 항목만 저장 화면 ID 값 @시작됨
		parameterObject = RequestParse.RequestToHashMap(request);

		// 검색 컬럼 쿼리 생성
		List searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
		parameterObject.put("searchColumnsList", searchColumnsList);

		//조회 컬럼 항목 테이블명
		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", sTableName);
		List selectColumnsList = registerService.selectColumnsList(parameterObject);

		//조회 컬럼 항목 쿼리 생성
		List selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
		parameterObject.put("selectColumnsList", selectColumnsRetList);

		// FID 로만 검색하는 경우
		if( !StringUtil.nvl(request.getParameter("FID")).equals("") ) {
			parameterObject.put("g2IdList", StringUtil.parseList(request.getParameter("FID")) );
		}

		List dataList = registerService.registerExcel(parameterObject);

		model.addAttribute("excel_title", selectColumnsList);
		model.addAttribute("data_list", dataList);

		return new ExcelViewRegister();
	}           

	/**
	 * 출력화면
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerPrint.do")
	public String registerPrint(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		// 권한 처리
		// 공통 삽입 공간
		model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, auth_id) );

		Map result = null;
		// 검색 키
		//String selectedId = StringUtil.nvl( searchVO.getFID() );
		String  g2Id = StringUtil.nvl(request.getParameter("FID"));
		String sRcvNum = "";
		
		//전달 Map
		HashMap parameterObject =  new HashMap();
		parameterObject.put("FID", g2Id);

		//조회 컬럼 항목 테이블명
		//parameterObject.put("TABLENAME", auth_id);
		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", sTableName);
		
		List selectColumnsList = registerService.selectColumnsList(parameterObject);
		//조회 컬럼 항목 쿼리 생성
		List selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
		parameterObject.put("selectColumnsList", selectColumnsRetList);

		result = registerService.registerDetail( parameterObject );
		// 메인 데이터
		model.addAttribute("result", result);
	

		String sColumnData = "";
		if( result.get("ftrIdn") != null ) sColumnData = StringUtil.nvl(result.get("ftrIdn").toString());						
		
		//맵 이나 키값이 틀려지는 것은 이걸로 하자...  
		String jsonSubTable = "{ \"WTT_CONS_MA\"	: {\"TABLENAME\" : \"WTT_COST_DT,WTT_CHNG_DT,WTT_FLAW_DT,WTT_SUBC_DT\", \"KEYCOLUMN\": \"CNT_NUM\" }, "
				+"	\"WTT_SPLY_MA\" :{\"TABLENAME\":\"WTT_WSER_MA\", \"KEYCOLUMN\": \"RCV_NUM\"  }, "
				+" \"WTL_META_PS\" : {\"TABLENAME\" : \"WTL_SPLY_LS\" , \"KEYCOLUMN\": \"PIP_IDN\" , \"RESUTTYPE\" : \"MAP\"}, "
				+" \"WTL_LEAK_PS\" : {\"TABLENAME\" : \"WTT_WSER_MA\", \"KEYCOLUMN\": \"RCV_NUM\" , \"RESUTTYPE\" : \"MAP\"}, ";				
		
		jsonSubTable += " \"SWT_CONS_MA\"	: {\"TABLENAME\" : \"SWT_CHNG_DT,SWT_COST_DT,SWT_FLAW_DT,SWT_SUBC_DT\", \"KEYCOLUMN\": \"CNT_NUM\" }, "
				+" \"SWL_SPEW_PS\" : {\"TABLENAME\": \"SWL_AODP_AS,SWL_AODR_AS\", \"KEYCOLUMN\": \"DSP_IDN,DRA_IDN\", \"RESUTTYPE\" : \"MAP\" },  "
				+" \"SWL_SPEW_PS\" : {\"TABLENAME\": \"SWL_AODP_AS\", \"KEYCOLUMN\": \"DSP_IDN\", \"RESUTTYPE\" : \"MAP\" },  "
				+" \"SWL_CLAY_PS\" : {\"TABLENAME\": \"SWL_MANH_PS\", \"KEYCOLUMN\": \"MAN_IDN\", \"RESUTTYPE\" : \"MAP\" }, ";
		
		jsonSubTable += " \"RDT_CONS_MA\"	: {\"TABLENAME\" : \"RDT_CHNG_DT,RDT_COST_DT,RDT_REPR_DT,RDT_SUBC_DT\", \"KEYCOLUMN\": \"CNT_NUM\" }, "
				+"	\"RDL_CTLR_LS\" :{\"TABLENAME\":\"RDT_RDWY_DT,RDT_SDWK_DT\", \"KEYCOLUMN\": \"SEC_IDN\"  }, "
				+"	\"RDT_RTCN_DT\" :{\"TABLENAME\":\"RDT_ROUT_DT\", \"KEYCOLUMN\": \"RUT_IDN\"  }, "
				+"	\"RDT_EXAL_DT\" :{\"TABLENAME\":\"RDT_EXAC_DT,RDL_EXCV_AS\", \"KEYCOLUMN\": \"PMS_IDN\"  }, "
				+" \"RDT_OCAL_DT\" : {\"TABLENAME\" : \"RDT_OCNR_DT,RDT_FEIM_DT\", \"KEYCOLUMN\": \"PMS_IDN\"  } } ";
		
		System.out.println("###########################################  jsonSubTable = "+ jsonSubTable);     
		
		JSONObject jsonObject = (JSONObject) new JSONParser().parse(jsonSubTable);      	
      	JSONObject jsonResult = (JSONObject) jsonObject.get(sTableName);
      	
      	System.out.println("###########################################  jsonObject2 = "+ jsonResult);     
      	
      	if( jsonResult != null ){
	      	String sSubTableList = (String)jsonResult.get("TABLENAME");
	      	String sSubKeyColumn = (String)jsonResult.get("KEYCOLUMN");
	      	String sResultType = (String)jsonResult.get("RESUTTYPE");
			
      		String[] sSubTable = sSubTableList.split(",");
      		String[] sSubKey = sSubKeyColumn.split(",");
      		
      		for(int i = 0; i < sSubTable.length; i++){
      			
      			HashMap addInfoObject = new HashMap();	      			
      			if( sSubTable.length == sSubKey.length ){		sSubKeyColumn = sSubKey[i];		} 
      			
      			if( result.get(JdbcUtils.convertUnderscoreNameToPropertyName(sSubKeyColumn)) != null )  sColumnData = StringUtil.nvl(result.get(JdbcUtils.convertUnderscoreNameToPropertyName(sSubKeyColumn)).toString());
      			
      			//값이 없으면.. 수행하지 말자~~ 
      			if( sColumnData != null && !sColumnData.equals("") && !sColumnData.equals("0")){
	      			if( sSubKeyColumn != null && sSubKeyColumn.equals("PIP_IDN")){
	      				addInfoObject.put("FTR_CDE",StringUtil.nvl(result.get("pipCde")));
	      				addInfoObject.put("FTR_IDN",sColumnData);
	      			}else if( sSubKeyColumn != null &&  !sSubKeyColumn.equals("SEC_IDN")   &&  !sSubKeyColumn.equals("PMS_IDN")  && sSubKeyColumn.contains("IDN")){
	      					addInfoObject.put("FTR_IDN",sColumnData);
	      			}else if( sSubKeyColumn != null && !sSubKeyColumn.equals("")){
	      				addInfoObject.put(sSubKeyColumn,sColumnData);
	      			}else {
	      				addInfoObject.put("FTR_CDE",StringUtil.nvl(result.get("ftrCde")));
	      				addInfoObject.put("FTR_IDN",sColumnData);			
	      			}	      			
	      			System.out.println("###########################################  sSubTable[i] = "+ sSubTable[i]);     	 
	      			addInfoObject.put("TABLENAME", sSubTable[i]);
	      			addInfoObject.put("searchColumnsList", AddInfoUtil.printColumnsList(addInfoObject));      			
					addInfoObject.put("selectColumnsList", AddInfoUtil.selectColumnsList(addInfoService.selectColumnsList(addInfoObject)));  

					System.out.println(" addInfoObject = "+ addInfoObject );
					
					if( sResultType != null && sResultType.equals("MAP")){					
						EgovMap addInfoMap = addInfoService.addInfoView(addInfoObject);
						model.addAttribute(JdbcUtils.convertUnderscoreNameToPropertyName(sSubTable[i]), addInfoMap);   // 테이블을 카멜로 변환 WTT_WSER_MA -> wttWserMa
						System.out.println("########################################### sSubTable = "+ JdbcUtils.convertUnderscoreNameToPropertyName(sSubTableList));      	
					}else {
						List addInfoList = addInfoService.addInfoPrint(addInfoObject);
						model.addAttribute(JdbcUtils.convertUnderscoreNameToPropertyName(sSubTable[i]+"_list"), addInfoList);
						System.out.println("########################################32### sSubTable = "+ JdbcUtils.convertUnderscoreNameToPropertyName(sSubTableList));      	
					}  
      			}
      		}	      
      	}
      	      	
      	//리스트를 가져오는 것은 아래서???       	
      	String[]  sWutlInclude = {"WTL_PIPE_LM","WTL_MANH_PS","WTL_VALV_PS","WTL_FIRE_PS","WTL_FLOW_PS","WTL_PRGA_PS","WTL_STPI_PS","WTL_SERV_PS","WTL_PRES_PS"};
      	String[]  sSutlInclude =  {"SWL_PIPE_LM","SWL_CONN_LS","SWL_MANH_PS","SWL_SPOT_PS","SWL_SPOT_PS_GU","SWL_RSPH_PS","SWL_SIDE_LS","SWL_SPEW_PS","SWL_CLAY_PS","SWL_VENT_PS","SWL_PRES_PS"};
      	String[]  sPrsvInclude = {"RDL_BYCP_AS","RDL_BRDG_AS","RDL_TRNL_AS","RDL_UGRD_AS","RDL_SBWY_AS","RDL_OVPS_AS","RDL_EVRD_AS","RDL_PROT_LS","RDL_SMRW_LS","RDL_BYST_PS","RDL_CMDT_AS","RDL_RDSN_PS","RDL_SLOP_AS","RDL_TREE_PS","RDL_STLT_PS","RDL_TRSN_PS","RDL_PDCR_AS","RDL_PAKP_AS","RDL_TFSN_PS","RDL_STAT_PS"};
		String[]  sAttaInclude = {"WTL_HEAD_PS","WTL_GAIN_PS","WTL_PURI_AS","WTL_SERV_PS","WTL_PRES_PS"};
		String[]  sRoutInclude = {"RDL_CTLR_LS","RDT_IPCR_DT","RDT_RNDW_DT","RDT_CLBM_DT","RDL_BYCP_AS","RDL_BRDG_AS","RDL_TRNL_AS","RDL_UGRD_AS","RDL_SBWY_AS","RDL_OVPS_AS","RDL_CROS_PS","RDL_EVRD_AS","RDL_PROT_LS","RDL_SMRW_LS","RDL_SQAR_AS","RDL_MDST_AS","RDL_BYST_PS","RDL_CMDT_AS","RDL_RDSN_PS","RDL_SLOP_AS","RDL_TREE_PS","RDL_STLT_PS","RDL_SCLT_PS","RDL_TRSN_PS","RDL_PDCR_AS","RDL_PAKP_AS","RDL_TFSN_PS","RDL_STAT_PS","RDL_NSPV_AS","RDL_SDHP_AS"};
		
		JSONArray json_sub = new JSONArray();
		
		if( RegisterUtil.chekExcept(sWutlInclude, sTableName) )	json_sub.add("WTT_WUTL_HT");		// 상수 유지보수현황
		if( RegisterUtil.chekExcept(sAttaInclude, sTableName) )	json_sub.add("WTT_ATTA_DT");		// 상수 세부시설현황
		
		if( RegisterUtil.chekExcept(sSutlInclude, sTableName) )	json_sub.add("SWT_SUTL_HT");		// 하수 유지보수현황
		if( RegisterUtil.chekExcept(sPrsvInclude, sTableName) )	json_sub.add("RDT_PRSV_DT");		// 도로 유지보수현황
		if( RegisterUtil.chekExcept(sRoutInclude, sTableName) )	json_sub.add("RDT_ROUT_DT");		// 노선정보
		
		if( sTableName.equals("WTL_META_PS") )	json_sub.add("WTT_META_HT");		
		if( sTableName.equals("WTL_RSRV_PS") ){	json_sub.add("WTT_RSRV_DT");		json_sub.add("WTT_RSRV_HT");	}		

		if( sTableName.equals("SWL_PUMP_PS") ){	json_sub.add("SWT_ATTA_DT");	}		
		if( sTableName.equals("SWL_PIPE_LM") ||  sTableName.equals("SWL_MANH_PS") ){	json_sub.add("SWT_DRDG_HT");	}		

		if(  json_sub != null ){
			System.out.println(" json_sub.size() ="+json_sub.size());
			for( int i = 0; i < json_sub.size(); i++){		
			
			// 공통모듈을 활용한 유지보수 내역
			//if(bSutlInclude){			
				String sSubTable = (String) json_sub.get(i);
				System.out.println(" sSubTable ="+sSubTable);
				
				HashMap addInfoObject = new HashMap();
				
				if( sSubTable.equals("RDT_ROUT_DT")){
					sColumnData = StringUtil.nvl(result.get("secIdn"));
					addInfoObject.put("SEC_IDN",StringUtil.nvl(result.get("secIdn")));
				}else {
					addInfoObject.put("FTR_CDE",StringUtil.nvl(result.get("ftrCde")));
					addInfoObject.put("FTR_IDN",StringUtil.nvl(result.get("ftrIdn")));		
				}
				
				if( sColumnData != null && !sColumnData.equals("") && !sColumnData.equals("0")){
					addInfoObject.put("TABLENAME", sSubTable);
					addInfoObject.put("searchColumnsList", AddInfoUtil.printColumnsList(addInfoObject));				
					addInfoObject.put("selectColumnsList", AddInfoUtil.selectColumnsList(addInfoService.selectColumnsList(addInfoObject)));  
					
					System.out.println(" addInfoObject = "+ addInfoObject );
					
					List addInfoList = addInfoService.addInfoPrint(addInfoObject);
					model.addAttribute(JdbcUtils.convertUnderscoreNameToPropertyName(sSubTable+"_list"), addInfoList);
					
					System.out.println("########################################### sSubTable = "+ JdbcUtils.convertUnderscoreNameToPropertyName(sSubTable+"_list"));      	
					System.out.println("###########################################  addInfoList = "+ addInfoList);
				}
			}
		}
		
		String sFileName = RegisterUtil.viewFileName(sTableName, "print");
		String formView=sFileName+"Print";
		System.out.println("formView==>"+formView);

		return formView;
	}
	
	/**
	 * 사용자 검색항목 대장목록 	- Yu_mk
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerFieldList.do")
	public void registerFieldList(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
	
		String tableName = StringUtil.nvl(request.getParameter("tableName"));
		List xmlData = new ArrayList();
        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        xmlData = registerService.registerFieldList(tableName);
        
        if( xmlData!=null) {
        	xmlSb.append("<code>");
	        for (int i = 0; i < xmlData.size(); i++) {
	        	Map map = (Map)xmlData.get(i);

	        	xmlSb.append("<item>");
        		xmlSb.append("<code_id>"+map.get("g2Name").toString()+"</code_id>");
        		xmlSb.append("<code_name>"+map.get("g2Alias").toString()+"</code_name>");
        		xmlSb.append("</item>");
	        }
	        xmlSb.append("</code>");
        }

        response.setContentType("application/xml");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Cache-Control", "no-cache");
        response.getWriter().print(xmlSb.toString());
    }
	
	/**
	 * 사용자 검색항목 DB 저장	- Yu_mk
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerSaveUserList.do")
	public String registerSaveUserList(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		String[] addFind = request.getParameterValues("addFind"),
				addFindAlias = request.getParameterValues("addFindAlias"),
				addList = request.getParameterValues("addList"),
				addListAlias = request.getParameterValues("addListAlias");
		
		String tableName = StringUtil.nvl(request.getParameter("tableName")),
				userId = StringUtil.nvl(request.getParameter("userId"));

		HashMap parameterObject =  new HashMap();
		String resultMsg = "",
				errorMsg = "";
		
		parameterObject.put("tableName", tableName);
		parameterObject.put("userId", userId);
		int userCheck = registerService.registerCheckUser(parameterObject);
		
		if(!addFind[0].equals("")){
			parameterObject.put("addFind", addFind);
			parameterObject.put("addFindAlias", addFindAlias);
		}
		
		if(!addList[0].equals("")){
			parameterObject.put("addList", addList);
			parameterObject.put("addListAlias", addListAlias);
		}
		
		try {
			if(userCheck == 0) registerService.insertRegisterUserList(parameterObject);
			else registerService.updateRegisterUserList(parameterObject);
			
			resultMsg = "사용자 검색항목이 저장 되었습니다.";
		}catch(Exception e) {
			resultMsg = "ERROR";
			errorMsg = "등록 오류 발생";
		}
		model.addAttribute("resultMsg", resultMsg);
		model.addAttribute("errorMsg", errorMsg);
		
		return "jsonView";
    }
	
	/**
	 * 사용자 검색항목 DB 삭제 	- Yu_mk
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerDeleteUserList.do")
	public String registerDeleteUserList(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
		
		String tableName = StringUtil.nvl(request.getParameter("tableName")),
				userId = StringUtil.nvl(request.getParameter("userId"));

		HashMap parameterObject =  new HashMap();
		String resultMsg = "";
		
		parameterObject.put("tableName", tableName);
		parameterObject.put("userId", userId);
		int userCheck = registerService.registerCheckUser(parameterObject);
		
		if(userCheck != 0){
			registerService.deleteRegisterUserList(parameterObject);
			resultMsg = "사용자 검색항목이 삭제 되었습니다.";
		}else{
			resultMsg = "저장된 사용자 검색항목이 없습니다.";
		}
		
		model.addAttribute("resultMsg", resultMsg);
		return "jsonView";
    }
	
	/**
	 * 사용자 검색항목 가져오기 	- Yu_mk
	 * @exception Exception
	 */
	@RequestMapping(value="/register/registerGetUserList.do")
	public String registerGetUserList(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		String[] addFind = {},
				 addList = {},
				 addFindAlias = {},
				 addListAlias = {};
		String tableName = StringUtil.nvl(request.getParameter("tableName"));
		String userId = StringUtil.nvl(request.getParameter("userId"));
		
		HashMap parameterObject =  new HashMap();
		parameterObject.put("tableName", tableName);
		parameterObject.put("userId", userId);
		
		List userList = registerService.registerGetUserList(parameterObject);
		
		//상수가 아니고..(상수는 List가 별도 )  사용자가 선택한 값이 없을 경우 관리자가 지정한 값으로 세팅해 줍시다... 
		if( userList.size() <1 ){
			parameterObject.put("userId", "Standard");   //초기설정값을 이걸로 정의 함.  사용자 등록시 Standard는 등록 못하도록 막자.. !! 
			userList = registerService.registerGetUserList(parameterObject);
		}
		
		if(userList.size() != 0){
			UsvUserFieldVO uf = new UsvUserFieldVO();
			CodeVO cv = new CodeVO();
			
			uf = (UsvUserFieldVO) userList.get(0);
			cv.setCONTENT_ID(tableName);
			
			
			if(uf.getSEARCH_COLUMN() != null){
				addFind = uf.getSEARCH_COLUMN().split(",");
				addFindAlias = uf.getSEARCH_COLUMN_ALIAS().split(",");
				
				for(int i=0; i<addFind.length;i++){
					addFind[i] = addFind[i].trim();
					addFindAlias[i] = addFindAlias[i].trim();

					String filter = addFind[i].substring(addFind[i].indexOf("_")+1);
					if(filter.equals("CDE") || filter.equals("MOP") || filter.equals("MOF") || filter.equals("CHK")){
						cv.setCODE_ID(addFind[i]);
						model.addAttribute(EgovStringUtil.lowerCase(addFind[i])+"_list", commonService.selectG2SCd(cv));
					}
				}
			}
			
			if(uf.getVIEW_COLUMN() != null){
				addList = uf.getVIEW_COLUMN().split(",");
				addListAlias = uf.getVIEW_COLUMN_ALIAS().split(",");
				
				for(int i=0; i<addList.length;i++){
					addList[i] = addList[i].trim();
					addListAlias[i] = addListAlias[i].trim();
				}
				
				model.addAttribute("addList", addList);
			}else{		
				model.addAttribute("addList", registerService.registerFieldList(tableName));
			}			
			
			model.addAttribute("addFind", addFind);
			model.addAttribute("addFindAlias", addFindAlias);
			model.addAttribute("addListAlias", addListAlias);
			
		}else{
			model.addAttribute("addList", registerService.registerFieldList(tableName));
		}

        return "jsonView";
    }
	
	/**
	 * 목록 화면
	 * @param request
	 * @param model
	 * @return "json"
	 * @exception Exception
	 */
	@RequestMapping(value="/register/attResultXml.do")
	public String attResultXml(ModelMap model, HttpServletRequest request)
			throws Exception {

		//전달 Map
		HashMap parameterObject =  new HashMap();
		parameterObject.put("TABLENAME", request.getParameter("tableName"));
		List selectColumnsList = registerService.selectColumnsList(parameterObject);
		String QueryHead = "SELECT ";
		if(request.getParameter("count").equals("true")) {
			QueryHead += "COUNT(*) count";
		} else {
			for(int i=0;i<selectColumnsList.size();i++) {
				Map colum = (Map) selectColumnsList.get(i);
				QueryHead += colum.get("enColumns").toString();
				if(i != selectColumnsList.size()-1){
					QueryHead += ",";
				}
			}
		}
		String query = new String(request.getParameter("query").getBytes("8859_1"), "UTF-8");
		query = URLDecoder.decode(query);
    	String[] G2_ID_MAP = request.getParameterValues("G2_ID_MAP[]");
    	parameterObject.put("QUERY", QueryHead+query);
    	parameterObject.put("G2_ID_MAP", G2_ID_MAP);
    	
    	List<EgovMap> list = registerService.selectAttResult(parameterObject);
    	model.addAttribute("attResult",list);
		
    	return "jsonView";
	}
}