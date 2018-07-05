package usolver.book.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import net.sf.json.JSONObject;
import usolver.book.service.BookService;
import usolver.book.util.AddInfoUtil;
import usolver.com.cmm.service.CommonService;
import usolver.book.service.RegisterService;
import usolver.book.util.RegisterUtil;
import usolver.book.util.RequestParse;
import usolver.com.cmm.util.EtcUtil;
import usolver.com.cmm.util.ExcelViewRegister;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.CodeVO;

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
public class BookController {

	/** LOG4J */
	private Logger log = Logger.getLogger(this.getClass());

	/** RegisterService */
	@Resource(name = "registerService")
	private RegisterService registerService;

	/** CommonService */
	@Resource(name = "commonService")
	private CommonService commonService;

	/** CommonService */
	@Resource(name = "bookService")
	private BookService bookService;

	/** AddInfoService */
	@Resource(name = "egovMessageSource")
	private EgovMessageSource  egovMessageSource;


	/** 권한 구분용 아이디 */
	private String auth_id = "";

	/**
	 * 검색 화면
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/book/bookList.do")
	public String bookList(	ModelMap model, HttpServletRequest request, HttpSession session)
			throws Exception {

		String  sTableName = String.valueOf(request.getParameter("facNm"));

		//전달 Map
		HashMap parameterObject =  new HashMap();
		parameterObject.put("TABLENAME", sTableName);

		List columnList = bookService.usvFieldCode(parameterObject);

		// [코드 데이터 추출]
		CodeVO cv = new CodeVO();

		cv.setCONTENT_ID(sTableName);
		for(int i=0; i<columnList.size(); i++){
			Map map = (Map) columnList.get(i);
			String domainNM = map.get("G2_NAME").toString();
			String fieldNM = map.get("FIELDNAME").toString().toLowerCase();
			cv.setDOMAIN(domainNM);
			model.addAttribute(fieldNM+"_list", commonService.selectCdByDomain(cv));
		}

		// 공통 삽입 공간
		model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );
		model.addAttribute("TABLENAME", sTableName );

		String sFileName = RegisterUtil.viewFileName(sTableName, "List");

		return sFileName+"List";
	}

	/**
	 * 목록 화면
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/book/bookListXml.do")
	public void bookListXml(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		// 전달 Map
		HashMap parameterObject =  new HashMap();

		parameterObject = RequestParse.RequestToHashMap2(request);

		// 검색 조건
		List searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
		parameterObject.put("searchColumnsList", searchColumnsList);

		// 조회 컬럼 항목 테이블명
		String sTableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", sTableName);

		// 컬럼 리스트
		List bookColumnList = bookService.bookColumnList(sTableName);
		// 조회 컬럼
		List selectColumnsList = new ArrayList();

		for(int i=0; i<bookColumnList.size();i++){

			Map map = (Map) bookColumnList.get(i);

			String g2Name = map.get("G2_NAME").toString();
			String g2Domain = map.get("G2_DOMAIN").toString();
			String g2TableName = map.get("G2_TABLENAME").toString();

			if(g2Domain != null && !g2Domain.equals("0")){					

				selectColumnsList.add("NVL(TO_CHAR("+g2Name+"),'') AS " +g2Name);
				selectColumnsList.add("NVL(FN_G2S_CODEDVALUE('"+g2TableName+"','"+g2Name+"',"+g2Name+"),'') AS "+g2Name+"_NM");

			}else if(g2Name.contains("_YMD")){				

				selectColumnsList.add("DECODE(LENGTH("+g2Name+"), 8, SUBSTR("+g2Name+",1,4)||'-'||SUBSTR("+g2Name+",5,2)||'-'||SUBSTR("+g2Name+",7,2), "+g2Name+") AS " +g2Name);

			}else if(g2Name.contains("_AMT")){				

				selectColumnsList.add("TRIM(TO_CHAR("+g2Name+",'999,999,999,999,999')) AS " +g2Name);

			}else{

				selectColumnsList.add("NVL(TO_CHAR("+g2Name+"),'') AS " +g2Name);

			}
		}

		parameterObject.put("selectColumnsList", selectColumnsList); 

		// 페이징 처리
		int page = StringUtil.parseInt( request.getParameter("page"));
		int rows = StringUtil.parseInt( request.getParameter("rows"));
		int firstIndex = rows * page - rows;

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


		// 공통 삽입 공간
		model.addAttribute("LAYER_MAP", StringUtil.nvl( request.getParameter("LAYER_MAP")) );
		model.addAttribute("nJDSKMasterId", StringUtil.nvl(request.getParameter("nJDSKMasterId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );

		// 목록 요청
		List xmlData = bookService.selectBookG2List(parameterObject);
		int total_count = bookService.selectBookListCnt(parameterObject);
		int total_page = 0;
		if( total_count>0 )
			total_page = (int) Math.ceil( (float)total_count/(float)rows );


		//목록 생성
		StringBuffer xmlSb = new StringBuffer();
		Map mapDBXmlSb = new HashMap();
		mapDBXmlSb.put("page", page);
		mapDBXmlSb.put("total_page", total_page);
		mapDBXmlSb.put("total_count", total_count);

		xmlSb=RegisterUtil.selectDBXmlSbList(xmlData, mapDBXmlSb);

		response.setContentType("application/xml");
		response.setCharacterEncoding("utf-8");
		response.setHeader("Cache-Control", "no-cache");
		response.getWriter().print(xmlSb.toString() );
	}

	/**
	 * 신규 등록 & 수정 & 뷰 화면
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/book/bookCRU.do")
	public String bookCRU(ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {

		Map result = null;
		
		//전달 Map
		HashMap parameterObject =  new HashMap();
				
		// 검색 키
		String g2Id = StringUtil.nvl(request.getParameter("FID"));
		parameterObject.put("FID", g2Id);

		//조회 컬럼 항목 테이블명
		String tableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", tableName);
		
		if( g2Id.equals("") && g2Id == null) {
			model.addAttribute("action_flag", "INSERT" );
		}else{
			result = bookService.bookDetail( parameterObject );
			model.addAttribute("action_flag", "UPDATE" );	// 처리 상태
		}

		// [코드 데이터 추출]
		List columnList = bookService.usvFieldCode(parameterObject);
		
		CodeVO cv = new CodeVO();

		cv.setCONTENT_ID(tableName);
		for(int i=0; i<columnList.size(); i++){
			Map map = (Map) columnList.get(i);
			String domainNM = map.get("G2_NAME").toString();
			String fieldNM = map.get("FIELDNAME").toString().toLowerCase();
			cv.setDOMAIN(domainNM);
			model.addAttribute(fieldNM+"_list", commonService.selectCdByDomain(cv));
		}

		// 메인 데이터
		model.addAttribute("result", result);
		model.addAttribute("TABLENAME", tableName );
		model.addAttribute("openerId", StringUtil.nvl(request.getParameter("nJDSKSubId")) );
		model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")) );

		String fileName = RegisterUtil.viewFileName(tableName, "CRU");

		return fileName+"CRU";
	}
	
	/**
	 * 엑셀 다운로드
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
	@RequestMapping(value="/book/bookExcel.do")
	public View bookExcel(Model model, HttpServletRequest request, HttpSession session) 
		throws Exception {
		
		// 권한 처리
		// 공통 삽입 공간
		//model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, auth_id) );
		
		//전달 Map
		HashMap parameterObject =  new HashMap();

		//검색 항목만 저장 화면 ID 값 @시작됨
		parameterObject = RequestParse.RequestToHashMap(request);

		// 검색 컬럼 쿼리 생성
		List searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
		parameterObject.put("searchColumnsList", searchColumnsList);

		//조회 컬럼 항목 테이블명
		String tableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", tableName);
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
	 * DB 삭제 처리
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/bookProcDelete.do")
    public String addInfoProcDelete(Model model, HttpServletRequest request, HttpSession session) 
    throws Exception {
	 	
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	String tableName = StringUtil.nvl(request.getParameter("TABLENAME"));
    	String[] g2Id = request.getParameterValues("FID");

    	HashMap parameterObject =  new HashMap();
    	parameterObject.put("FID", g2Id);
    	parameterObject.put("TABLENAME", tableName);
    	
    	try {
    		resultCnt = bookService.deleteBook( parameterObject );
    		resultMsg = "success.common.delete";
    	} catch(Exception e) {
    		resultMsg = "fail.common.delete";
    		errorMsg = "삭제 오류 발생";
    	}
    	
    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);

    	return "jsonView";
    }

    /**
     * DB 등록/수정 처리
     * @param Object - 조회할 정보가 담긴 Object
     * @return ""
     * @exception Exception
     */
    @RequestMapping(value="/book/bookProcWrite.do")
    public String bookProcWrite( Model model,HttpServletRequest request, HttpServletResponse response, HttpSession session) 
    		throws Exception {

		//수정 항목만 저장 화면 ID 값. 기존에 iframe을 이용하여 저장하기 때문에 @로 별도 구분 안함. 또한 Null 값도 입력될 수 있도록 수정
		HashMap parameterObject =  new HashMap();
		
		String sTableName = request.getParameter("TABLENAME");
		String jsonStr = request.getParameter("jsonData");
		parameterObject = RequestParse.RequestToHashMapUpdate(request);
    	
    	JSONObject jsonObject = JSONObject.fromObject(jsonStr);
    	
    	Map<String, Object> result = (Map<String, Object>)JSONObject.toBean(jsonObject, java.util.HashMap.class);
    	result.put("TABLENAME", sTableName);
    	
    	// 처리 상태
    	String action_flag = (String)result.get("action_flag");    	
    	String keyColumn = (String)result.get("key_colunm");

    	final long startTime = System.nanoTime();

    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
    	try {
    		if(action_flag.equals("INSERT")){   
    			//keyColumn 이 CNT_NUM 이라는 가정하
				result.put(keyColumn, commonService.getNewID(sTableName, keyColumn, 4, "SA"));
				model.addAttribute("FID", commonService.getNewID(sTableName, "FID"));
				List insertColumnsList = AddInfoUtil.insertColumnsList(result);
    			result.put("insertColumnsList", insertColumnsList);    			
    			result.put("FID", commonService.getNewID(sTableName, "FID"));
    			int cnt = bookService.insertBook( result );
    			
    			resultMsg = "success.common.insert";
    			
        	}else if( action_flag.equals("UPDATE") ) {
        		
				String sCntNum = (String)result.get("CNT_NUM");
				result.put("CNT_NUM", sCntNum);

    			List updateColumnsList = AddInfoUtil.updateColumnsList(result);
    			result.put("updateColumnsList", updateColumnsList);		
    			
				bookService.updateBook( result );    
				
				resultMsg = "success.common.update";
				
    		}
    	}catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "등록 오류 발생";
    	}

    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("nJDSKSubId", StringUtil.nvl(request.getParameter("nJDSKSubId")));
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);

    	return "jsonView";
    }
    
    /**
	 * 출력화면
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/bookPrint.do")
	public String bookPrint(Model model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws Exception {
		
		// 권한 처리
		// 공통 삽입 공간
		model.addAttribute("mng_auth_prof", EtcUtil.getAuthor(session, auth_id) );
		
		Map result = null;
		List resultSub = null;
		// 검색 컬럼 쿼리 생성
		List searchColumnsList = null;
		List selectColumnsList = null;
		//조회 컬럼 항목 쿼리 생성
		List selectColumnsRetList = null;
		
		//전달 Map
		HashMap parameterObject =  new HashMap();
		
		// 검색 키
		String g2Id = StringUtil.nvl(request.getParameter("FID"));
		parameterObject.put("FID", g2Id);
		
		
		//조회 컬럼 항목 테이블명
		String tableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", tableName);
		
		selectColumnsList = registerService.selectColumnsList(parameterObject);
		selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
		parameterObject.put("selectColumnsList", selectColumnsRetList);
		
		// 메인 데이터
		result = bookService.bookDetailAll( parameterObject );
		model.addAttribute("result", result);
		parameterObject.put("CNT_NUM", result.get("cntNum"));	//하위 테이블 검색 키
		parameterObject.remove("FID");
		
		List<String> tableList = new ArrayList();	//하위 테이블
		tableList.add("COST_DT");
		tableList.add("CHNG_DT");
		tableList.add("SUBC_DT");
		tableList.add("FLAW_DT");
		
		
		for(int i=0; i<tableList.size(); i++){
			parameterObject.put("TABLENAME", tableName.substring(0, 3)+"_"+tableList.get(i));
			
			searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
			parameterObject.put("searchColumnsList", searchColumnsList);
			
			selectColumnsList = registerService.selectColumnsList(parameterObject);
			selectColumnsRetList =RegisterUtil.selectColumnsList(selectColumnsList);
			parameterObject.put("selectColumnsList", selectColumnsRetList);
			
			model.addAttribute(tableList.get(i), bookService.bookSubDetail(parameterObject));
		}
		
		String sFileName = RegisterUtil.viewFileName(tableName, "print");
		String formView=sFileName+"Print";
		System.out.println("formView==>"+formView);
		
		return formView;
	}
    
    /**
	 * 이미지 목록 검색
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/IMGE_ETList.do")
    public String imgeEtList(Model model, HttpServletRequest request, HttpSession session) 
            throws Exception {																																																																																																																																																																																																																																																																															
    	model.addAttribute("FTR_IDN", StringUtil.nvl(request.getParameter("FTR_IDN")));
    	model.addAttribute("FTR_CDE", StringUtil.nvl(request.getParameter("FTR_CDE")));
    	model.addAttribute("CNT_NUM", StringUtil.nvl(request.getParameter("CNT_NUM")));
    	model.addAttribute("tableName", StringUtil.nvl(request.getParameter("tableName")));
        model.addAttribute("nJDSKSubId", StringUtil.nvl(request.getParameter("nJDSKSubId")));
        model.addAttribute("CALL_TYPE", StringUtil.nvl(request.getParameter("CALL_TYPE")));
        
        return "/usolver/com/book/imgeEtList";
    }
    
    /**
	 * 목록 화면
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/IMGE_ETListXml.do")
    public void imgeEtListXml(Model model, HttpServletRequest request, HttpServletResponse response, HttpSession session)
            throws Exception {
    	// 전달 Map
    	HashMap parameterObject =  new HashMap();
    	String FTR_IDN = StringUtil.nvl(request.getParameter("FTR_IDN"));
    	String FTR_CDE = StringUtil.nvl(request.getParameter("FTR_CDE"));
    	String CNT_NUM = StringUtil.nvl(request.getParameter("CNT_NUM"));
    	String g2Name = "", 
			   g2Domain = "",
			   g2TableName = "";
    	
    	if( CNT_NUM != null && !CNT_NUM.equals("")){
    		parameterObject.put("CNT_NUM", StringUtil.nvl(request.getParameter("CNT_NUM")));
    	}else if( FTR_IDN != null && !FTR_IDN.equals("")  &&  FTR_CDE != null && !FTR_CDE.equals("")){
    		parameterObject.put("FTR_IDN", StringUtil.nvl(request.getParameter("FTR_IDN")));
        	parameterObject.put("FTR_CDE", StringUtil.nvl(request.getParameter("FTR_CDE")));
    	}
    	
    	// 검색 조건
		List searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
		parameterObject.put("searchColumnsList", searchColumnsList);
    			
		
		String tableName = StringUtil.nvl( request.getParameter("tableName"));
    	parameterObject.put("TABLENAME", tableName);
    	
    	// 컬럼 리스트
		List bookColumnList = bookService.bookColumnList(tableName);
		// 조회 컬럼
		List selectColumnsList = new ArrayList();

		for(int i=0; i<bookColumnList.size();i++){

			Map map = (Map) bookColumnList.get(i);

			g2Name = map.get("G2_NAME").toString();
			g2TableName = map.get("G2_TABLENAME").toString();
			if(map.containsKey("G2_DOMAIN")) g2Domain = map.get("G2_DOMAIN").toString();
			else g2Domain = null;
			
			if(g2Domain != null && !g2Domain.equals("0")){					
				selectColumnsList.add("NVL(TO_CHAR("+g2Name+"),'') AS " +g2Name);
				selectColumnsList.add("NVL(FN_G2S_CODEDVALUE('"+g2TableName+"','"+g2Name+"',"+g2Name+"),'') AS "+g2Name+"_NM");
			
			//이미지 테이블에 맞도록 수정  : 2016-10-06 김수예  		
			/*	
			}else if(g2Name.contains("_YMD")){				
				selectColumnsList.add("DECODE(LENGTH("+g2Name+"), 8, SUBSTR("+g2Name+",1,4)||'-'||SUBSTR("+g2Name+",5,2)||'-'||SUBSTR("+g2Name+",7,2), "+g2Name+") AS " +g2Name);			
			
			}else if(g2Name.contains("_AMT")){				
				selectColumnsList.add("TRIM(TO_CHAR("+g2Name+",'999,999,999,999,999')) AS " +g2Name);*/

			}else if(g2Name.contains("_IMG")){
				selectColumnsList.add("IMG_IMG");
				
			}else{
				selectColumnsList.add("NVL(TO_CHAR("+g2Name+"),'') AS " +g2Name);
			}
		}
		parameterObject.put("selectColumnsList", selectColumnsList);
    	
    	int page = StringUtil.parseInt(request.getParameter("page"));
    	int rows = StringUtil.parseInt(request.getParameter("rows"));
    	String sidx = StringUtil.nvl(request.getParameter("sidx"));
    	String sord = StringUtil.nvl(request.getParameter("sord"));
    	
    	int firstIndex = rows * page - rows;
    	
    	parameterObject.put("firstIndex", firstIndex);
		parameterObject.put("lastIndex", firstIndex+rows);
		
		//이미지 테이블에 맞도록 수정  : 2016-10-06 김수예  		
		if( sidx.length() <1 )
			parameterObject.put("OrderByColumn", "IMG_IDN");
		else
			parameterObject.put("OrderByColumn", sidx);

		if( sord.length() < 1 )
			parameterObject.put("OrderByType", "DESC");
		else
			parameterObject.put("OrderByType",sord);
    	

        StringBuffer xmlSb = new StringBuffer();
        String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
        xmlSb.append(xmlHeader);
        
        // DB 요청
        List xmlData = bookService.selectBookList(parameterObject);
		int total_count = bookService.selectBookListCnt(parameterObject);
        int total_page = 0;
        if( total_count>0 )
        	total_page = (int) Math.ceil( (float)total_count/(float)rows );

        xmlSb.append("<rows>");
        xmlSb.append("<page>"+page+"</page>");
        xmlSb.append("<total>"+total_page+"</total>");
        xmlSb.append("<records>"+total_count+"</records>");
        
        if( xmlData!=null) {
        	String keyNm = "";
        	
        	for (int i = 0; i < xmlData.size(); i++) {
        		Map map = (Map)xmlData.get(i);
        		
        		xmlSb.append("<Item>");
        		Iterator<String> it = map.keySet().iterator(); 

        		while(it.hasNext()) { 

        			keyNm = (String)it.next();
        			String value = map.get(keyNm).toString();

        			xmlSb.append("<"+keyNm+">"+StringUtil.nvl(value)+"</"+keyNm+">");
        		}
        		
        	// 이건 실제 파일이 서버에 저장되어 있는지를 표시하는 것임.. 수정필요.. 
        	/*
        	 * 	if (map.containsKey("fleNam")){
        			xmlSb.append("<FILE_EXIST>Y</FILE_EXIST>");
        		}else{
        			xmlSb.append("<FILE_EXIST>N</FILE_EXIST>");
        		}*/

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
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/book/IMGE_ETCRU.do")
    public String imgeEtCRU(Model model, HttpServletRequest request, HttpSession session) 
    		throws Exception {
    	
    	Map result = null;

    	String action_flag = StringUtil.nvl(request.getParameter("action_flag"));
		//전달 Map
		HashMap parameterObject =  new HashMap();
				
		// 검색 키
		String IMG_IDN = StringUtil.nvl(request.getParameter("IMG_IDN"));
		parameterObject.put("IMG_IDN", IMG_IDN);
		
		// 검색 조건
		List searchColumnsList = RegisterUtil.searchColumnsList(parameterObject);
		parameterObject.put("searchColumnsList", searchColumnsList);
		
		String tableName = StringUtil.nvl(request.getParameter("TABLENAME"));
		parameterObject.put("TABLENAME", tableName);
		
		
		if( action_flag.equals("UPDATE")) {
			result = bookService.bookImgeDetail( parameterObject );
			model.addAttribute("action_flag", "UPDATE" );	// 처리 상태
			
		}else{
			model.addAttribute("action_flag", "INSERT" );
		}

		
		// [코드 데이터 추출]
		List columnList = bookService.usvFieldCode(parameterObject);
		
		CodeVO cv = new CodeVO();

		cv.setCONTENT_ID(tableName);
		for(int i=0; i<columnList.size(); i++){
			Map map = (Map) columnList.get(i);
			String domainNM = map.get("G2_NAME").toString();
			String fieldNM = map.get("FIELDNAME").toString().toLowerCase();
			cv.setDOMAIN(domainNM);
			model.addAttribute(fieldNM+"_list", commonService.selectCdByDomain(cv));
		}

		// 메인 데이터
		model.addAttribute("result", result);
		model.addAttribute("TABLENAME", tableName);
		model.addAttribute("FTR_CDE",  StringUtil.nvl(request.getParameter("FTR_CDE")));
		model.addAttribute("FTR_IDN",  StringUtil.nvl(request.getParameter("FTR_IDN")));
		model.addAttribute("CNT_NUM",  StringUtil.nvl(request.getParameter("CNT_NUM")));
		model.addAttribute("openerId", StringUtil.nvl(request.getParameter("openerId")));
		model.addAttribute("action_flag", action_flag);
		
		return "/usolver/com/book/imgeEtCRU";
    }
    
    /**
	 * DB 등록/수정 처리
	 * @param Object - 조회할 정보가 담긴 Object
	 * @return ""
	 * @exception Exception
	 */   
    @RequestMapping(value="/book/IMGE_ETProcWrite.do")
    public String imgeEtProcWrite(Model model, MultipartHttpServletRequest request, HttpSession session) 
    		throws Exception {
    	
    	// 데이터 파싱
    	String jsonStr = request.getParameter("jsonData");
    	JSONObject jsonObject = JSONObject.fromObject(jsonStr);
    	Map<String, Object> result = (Map<String, Object>)JSONObject.toBean(jsonObject, java.util.HashMap.class);
    	
    	// 처리 상태
    	String action_flag = (String)result.get("action_flag");    	
    	String keyColumn = (String)result.get("KEY_COLUMN");
    	String tableName = (String)result.get("TABLENAME");
    	
    	String CNT_NUM = (String)result.get("CNT_NUM");
    	String FTR_IDN = (String)result.get("FTR_IDN");
    	String FTR_CDE = (String)result.get("FTR_CDE");
   	    	
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	String file_nm = "";
    	String g2Name = ""; 
    	
    	final long startTime = System.nanoTime();
    	
    	try{
    		
    		if(action_flag.equals("UPDATE")){   
    			// 컬럼 리스트
    			List bookColumnList = bookService.bookColumnList(tableName);
    			// 조회 컬럼
    			List selectColumnsList = new ArrayList();

    			for(int i=0; i<bookColumnList.size();i++){
    				
    				Map map = (Map) bookColumnList.get(i);
    				g2Name = map.get("G2_NAME").toString();
    				
    				if(!g2Name.equals("IMG_IDN") && !g2Name.equals("FLE_NAM") && !g2Name.equals("IMG_IMG"))
    					selectColumnsList.add(g2Name + " = #{" + g2Name + " , jdbcType=VARCHAR}");
    			}
    			result.put("selectColumnsList", selectColumnsList);
    			
				int cnt = bookService.updateBookImge(result);    	
				resultMsg = "success.common.update";
				
        	}else{
        		
        		// key 값인 IMG_IDN 를 생성
        		result.put(keyColumn, bookService.bookImgeIdn(result));
        		        		
        		// 이미지 파일명
				if(CNT_NUM != null && !CNT_NUM.equals("")){
					file_nm = CNT_NUM+"_"+result.get(keyColumn);/*bookService.bookImgeFileNameCnt(result);*/
					
					result.remove("FTR_CDE");
					result.remove("FTR_IDN");
				}
				
				if(FTR_CDE != null && !FTR_CDE.equals("") &&  FTR_IDN != null && !FTR_IDN.equals("")){
					file_nm = FTR_CDE+"_"+FTR_IDN+"_"+result.get(keyColumn);
					result.remove("CNT_NUM");
				}
				
    			result.put("FLE_NAM", file_nm+"."+(String)result.get("TYP_NAM"));

    			//insert query를 만들때.. null 데이터가 문제인가??? 확인필요..     			
				List insertColumnsList = AddInfoUtil.insertColumnsList(result);
    			result.put("insertColumnsList", insertColumnsList);
    			int cnt = bookService.insertBookAll(result);    			
    			resultMsg = "success.common.insert";

    		}    		
    	}catch(Exception e) {
    		resultMsg = "fail.common.sql";
    		errorMsg = "등록 오류 발생";
    	}
    	
    	// 결과 처리용 [수정X]
    	System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  resultMsg "+ resultMsg);
    	model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("errorMsg", errorMsg);

    	// DB 정상 처리시 물리적 파일 업로드 : 수정시에는 파일 안올라가도록.... 
    	if( resultMsg.contains("success.common.insert") ) {
    		// 파라메터 <HttpServletRequest>, <파일올라갈 위치>, <파일명>
    		commonService.fileInsert(request, (String)result.get("TABLENAME"), (String)result.get("FLE_NAM"));    		
    		//프로젝트 경로와 톰캣 경로가 달라 파일 업로드시 새로고침 해줘야 하는 문제때문에 
    		String path = session.getServletContext().getRealPath("/");
    	}
    	
    	return "jsonView";
    }
    
    /**
     * DB 삭제 처리
     * @param Object - 조회할 정보가 담긴 Object
     * @param model
     * @return ""
     * @exception Exception
     */
    @RequestMapping(value="/book/IMGE_ETProcDelete.do")
    public String imgeEtProcDelete(Model model, HttpServletRequest request, HttpSession session) 
    		throws Exception {

    	String TABLENAME = StringUtil.nvl(request.getParameter("TABLENAME"));
    	String IMG_IDN = StringUtil.nvl(request.getParameter("IMG_IDN"));
    	String FLE_NAM = StringUtil.nvl(request.getParameter("FLE_NAM"));
    	
    	HashMap parameterObject =  new HashMap();
		parameterObject.put("TABLENAME", TABLENAME);
		parameterObject.put("IMG_IDN", IMG_IDN);
		
    	String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";

    	// 첨부파일 삭제를 위한 처리
    	try {
    		resultCnt = bookService.deleteBookImge(parameterObject);
    		resultMsg = "success.common.delete";    		
    	} catch(Exception e) {    		
    		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Exception e : "+  e);    		
    		resultMsg = "success.common.delete";
    		errorMsg = "삭제 오류 발생";
    	}

    	// DB 가 정상적으로 삭제 된 경우, 물리 파일 삭제
    	if( !resultMsg.contains("fail") ) {
    		commonService.fileDelete(TABLENAME, FLE_NAM);
    	}

    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);

    	return "jsonView";
    }
}
