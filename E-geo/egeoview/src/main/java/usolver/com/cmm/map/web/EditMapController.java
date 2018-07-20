package usolver.com.cmm.map.web;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.google.gson.reflect.TypeToken;

/*import GeoFrame.Base.Io.aMemoryStreamReader;
import GeoFrame.Base.Io.aMemoryStreamWriter;
import GeoFrame.Base.Lang.aValueFactory;
import GeoFrame.Base.Lang.aiPoint;
import GeoFrame.Data.GEODATA_TYPE;
import GeoFrame.Data.GeoShape.aGeometryFactory;
import GeoFrame.Data.GeoShape.aiGeometry;
import GeoFrame.Data.LocalEdit.aEditFactory;
import GeoFrame.Data.LocalEdit.aiInfoEditHistory;*/
import egovframework.rte.psl.dataaccess.util.EgovMap;
import oracle.sql.BLOB;
import usolver.com.cmm.map.service.LyrEditService;
import usolver.com.cmm.map.service.vo.LyrEditMidSaveVO;
import usolver.com.cmm.map.service.vo.LyrEditRefVO;
import usolver.com.cmm.map.service.vo.LyrEditSchemaInfoVO;
import usolver.com.cmm.map.service.vo.LyrEditSnapInfoVO;
import usolver.com.cmm.map.service.vo.SearchEditHisVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.DateUtil;
import usolver.com.cmm.util.StringUtil;
import usolver.com.cmm.vo.CodeVO;


/**
 * @Class Name : EditMapController.java
 * @Description : EditMap Controller class
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
public class EditMapController {
	
	@Resource(name = "lyrEditService")
	private LyrEditService lyrEditService;
	
	 /** CommonService */
    @Resource(name = "commonService")
    private CommonService commonService;

	
	/**
	 * 편집 대상 레이어 기준 참조레이어를 조회한다.
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getEditMng.do", method = RequestMethod.POST)
	public String getEditMng(@ModelAttribute LyrEditRefVO lyrEditRefVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
		String name = request.getParameter("selEditLayerValue");
		
		lyrEditRefVO.setEDITLYR_ENG_NM(name);
		List<EgovMap> editRefLyrInfoList = lyrEditService.selectRefLyrInfoList(lyrEditRefVO);	
		
		model.addAttribute("result_refLyr", editRefLyrInfoList);
        return "jsonView";
	}
	        
    /**
	 * 파라미터로 받은레이어목록의 최대 FTR_IDN 값을 조회한다.
	 * @param model
	 * @return ""
	 * @exception Exception
	 */
    @RequestMapping(value="/getAllMaxIdn.do", method = RequestMethod.POST)
    public String getAllMaxIdn(Model model, HttpServletRequest request)  throws Exception {
    	
    	String tableList = StringUtil.nvl( request.getParameter("tableList") ); 
    	String[] aTables = tableList.split(",");
    	HashMap<String, String> map = new HashMap<String, String>();
    	
    	for(int i = 0; i < aTables.length; i++){
    		map.put(aTables[i],commonService.getNewID(aTables[i], "FTR_IDN"));
    	}
    	
       	model.addAttribute("result", map);
        return "jsonView";
    }
	
	/**
	 * 편집 대상 레이어 스냅 설정정보를 조회한다.
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getEditSnapInfo.do", method = RequestMethod.POST)
	public String getEditSnapInfo(@ModelAttribute LyrEditSnapInfoVO lyrEditSnapInfoVO,Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
		String name = request.getParameter("editLayerValue");
		
		lyrEditSnapInfoVO.setEDITLYR_ENG_NM(name);
		
		List<EgovMap> editSnapLyrList = lyrEditService.selectSnapLyrInfoList(lyrEditSnapInfoVO);

		model.addAttribute("result_snapLyr", editSnapLyrList);		
        return "jsonView";
	}
	
	/**
	 * 편집 대상 레이어 스키마 정보를 조회한다.
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getEditLyrSchemaInfo.do", method = RequestMethod.POST)
	public String getEditLyrSchemaInfo(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
		String editLayerList = request.getParameter("sEditLayerList");		
		List<EgovMap> editLyrSchemaInfoList = lyrEditService.selectEditLyrSchemaInfoList(editLayerList);			

		model.addAttribute("result_lyrSchema", editLyrSchemaInfoList);		
        return "jsonView";
	}
	
	/**
	 * 편집을 시작하는 데이터 목록을 저장한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings({ "null", "unchecked" })
	@RequestMapping(value = "/mapedit/insertORupdateEditMidFeature.do", method = RequestMethod.POST)
	public String insertEditMidData(@ModelAttribute LyrEditMidSaveVO editMidSaveVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
	
		String data = request.getParameter("inputData");
		String tblName = request.getParameter("tableName");
		String datasetId = request.getParameter("datasetId");
		String editState = request.getParameter("editState");
		String userId = request.getParameter("userId");
		
		try {
			JSONParser jsonParser = new JSONParser();
		Object obj = jsonParser.parse(data);
		JSONObject jsonTotObj = (JSONObject) obj;
		JSONObject jsonTblObj = (JSONObject) jsonTotObj.get(tblName);
		JSONArray jsonFeatureArr = (JSONArray) jsonTblObj.get("g2IdList");
		
		JSONObject resObj = new JSONObject();		
		int resCnt = 0;
		
		for(int i = 0 ; i < jsonFeatureArr.size(); i++){
			Long g2_ID = Long.valueOf((String) jsonFeatureArr.get(i));
			String g2_NAME = tblName;
			String g2_DATE = DateUtil.getCurrentTime();
			String g2_USERID = userId;
			String g2_DATA = jsonTblObj.get(String.valueOf(g2_ID)).toString();
					
			editMidSaveVO.setG2_DATASETID(Integer.valueOf(datasetId));
			editMidSaveVO.setG2_ID(g2_ID);
			editMidSaveVO.setG2_NAME(g2_NAME);
			editMidSaveVO.setG2_STATE(Integer.valueOf(editState));
			editMidSaveVO.setG2_DATE(g2_DATE);
			editMidSaveVO.setG2_SRCVERSION(1);
			editMidSaveVO.setG2_USERID(g2_USERID);
			editMidSaveVO.setG2_DATA(g2_DATA);
			
			List<EgovMap> middleEditFeatureList = lyrEditService.selectEditMidSaveInfoList(editMidSaveVO);
					
			
			if(middleEditFeatureList.size() == 0){
				if(lyrEditService.insertEditMidFeature(editMidSaveVO) > 0){
					
					JSONObject resObjTmp = new JSONObject();
					
					resObjTmp.put("G2_DATASETID", editMidSaveVO.getG2_DATASETID());
					resObjTmp.put("G2_ID", editMidSaveVO.getG2_ID());
					resObjTmp.put("G2_NAME", editMidSaveVO.getG2_NAME());					
					resObjTmp.put("G2_STATE", editMidSaveVO.getG2_STATE());
					resObjTmp.put("G2_DATE", editMidSaveVO.getG2_DATE());
					resObjTmp.put("G2_SRCVERSION", editMidSaveVO.getG2_SRCVERSION());
					resObjTmp.put("G2_USERID", editMidSaveVO.getG2_USERID());
					resObjTmp.put("G2_DATA", editMidSaveVO.getG2_DATA());
					
					resObj.put(i, resObjTmp);
					resCnt++;	
				}
			}
			else{
				if(lyrEditService.updateEditMidFeature(editMidSaveVO) > 0){
					
					JSONObject resObjTmp = new JSONObject();
					
					resObjTmp.put("G2_DATASETID", editMidSaveVO.getG2_DATASETID());
					resObjTmp.put("G2_ID", editMidSaveVO.getG2_ID());
					resObjTmp.put("G2_NAME", editMidSaveVO.getG2_NAME());					
					resObjTmp.put("G2_STATE", editMidSaveVO.getG2_STATE());
					resObjTmp.put("G2_DATE", editMidSaveVO.getG2_DATE());
					resObjTmp.put("G2_SRCVERSION", editMidSaveVO.getG2_SRCVERSION());
					resObjTmp.put("G2_USERID", editMidSaveVO.getG2_USERID());
					resObjTmp.put("G2_DATA", editMidSaveVO.getG2_DATA());
					
					resObj.put(i, resObjTmp);
					resCnt++;	
				}
			}
		}
		
		resObj.put("length", resCnt);		
		model.addAttribute("editMidSaveRes", resObj);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
        return "jsonView";
	}	
	
	/**
	 * 편집을 진행하는 feature의 공간정보와 속성정보를 업데이트한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/updateEditMidFeatureOne.do", method = RequestMethod.POST)
	public String updateEditMidData(@ModelAttribute LyrEditMidSaveVO editMidSaveVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
	
		String data = request.getParameter("inputData");
		String tblName = request.getParameter("tableName");
		String g2Id = request.getParameter("g2Id");
		String userId = request.getParameter("userId");
		
		try {
			
			JSONParser jsonParser = new JSONParser();
			Object obj = jsonParser.parse(data);
			JSONObject jsonFeatureObj = (JSONObject) obj;
		
			Long g2_ID = Long.valueOf(g2Id);
			String g2_NAME = tblName;
			String g2_DATE = DateUtil.getCurrentTime();
			String g2_USERID = userId;
			String g2_DATA = jsonFeatureObj.toString();
					
			editMidSaveVO.setG2_ID(g2_ID);
			editMidSaveVO.setG2_NAME(g2_NAME);
			editMidSaveVO.setG2_DATE(g2_DATE);
			editMidSaveVO.setG2_STATE(Integer.valueOf(jsonFeatureObj.get("editState").toString()));
			editMidSaveVO.setG2_USERID(g2_USERID);
			editMidSaveVO.setG2_DATA(g2_DATA);
			
			lyrEditService.updateEditMidFeature(editMidSaveVO);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
        return "jsonView";
	}
	
	/**
	 * 편집을 진행하는 feature의 공간정보와 속성정보를 업데이트한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/insertEditMidFeatureOne.do", method = RequestMethod.POST)
	public String insertEditMidDataOne(@ModelAttribute LyrEditMidSaveVO editMidSaveVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
	
		String data = request.getParameter("inputData");
		String tblName = request.getParameter("tableName");
		String datasetId = request.getParameter("datasetId");
		String g2Id = request.getParameter("g2Id");
		String userId = request.getParameter("userId");
		
		try {
			JSONParser jsonParser = new JSONParser();
			Object obj = jsonParser.parse(data);
			JSONObject jsonFeatureObj = (JSONObject) obj;
			
			Long g2_ID = Long.valueOf(g2Id);			
			String g2_NAME = tblName;
			String g2_DATE = DateUtil.getCurrentTime();
			String g2_USERID = userId;
			String g2_DATA = jsonFeatureObj.toString();
					
			editMidSaveVO.setG2_DATASETID(Integer.valueOf(datasetId));
			editMidSaveVO.setG2_ID(g2_ID);
			editMidSaveVO.setG2_NAME(g2_NAME);
			editMidSaveVO.setG2_STATE(Integer.valueOf(jsonFeatureObj.get("editState").toString()));
			editMidSaveVO.setG2_DATE(g2_DATE);
			editMidSaveVO.setG2_SRCVERSION(1);
			editMidSaveVO.setG2_USERID(g2_USERID);
			editMidSaveVO.setG2_DATA(g2_DATA);
				
			lyrEditService.insertEditMidFeature(editMidSaveVO);
			
	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
        return "jsonView";
	}
	
	/**
	 * 편집을 진행하는 feature의 공간정보와 속성정보를 업데이트한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/mergeEditMidFeatureOne.do", method = RequestMethod.POST)
	public String mergeEditMidDataOne(@ModelAttribute LyrEditMidSaveVO editMidSaveVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
	
		String data = request.getParameter("inputData");
		String tblName = request.getParameter("tableName");
		String datasetId = request.getParameter("datasetId");
		String g2Id = request.getParameter("g2Id");
		String userId = request.getParameter("userId");
		
		try {
			JSONParser jsonParser = new JSONParser();
			Object obj = jsonParser.parse(data);
			JSONObject jsonFeatureObj = (JSONObject) obj;
			
			Long g2_ID = Long.valueOf(g2Id);
			String g2_NAME = tblName;
			String g2_DATE = DateUtil.getCurrentTime();
			String g2_USERID = userId;
			String g2_DATA = jsonFeatureObj.toString();
					
			editMidSaveVO.setG2_DATASETID(Integer.valueOf(datasetId));
			editMidSaveVO.setG2_ID(g2_ID);
			editMidSaveVO.setG2_NAME(g2_NAME);
			editMidSaveVO.setG2_STATE(Integer.valueOf(jsonFeatureObj.get("editState").toString()));
			editMidSaveVO.setG2_DATE(g2_DATE);
			editMidSaveVO.setG2_SRCVERSION(1);
			editMidSaveVO.setG2_USERID(g2_USERID);
			editMidSaveVO.setG2_DATA(g2_DATA);
				
			lyrEditService.MergeEditMidFeature(editMidSaveVO);
			
	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
        return "jsonView";
	}
	
	/**
	 * 편집중인(중간저장되어 있는) 데이터 목록을 조회한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMiddleEditFeature.do", method = RequestMethod.POST)
	public String getMiddleEditFeature(@ModelAttribute LyrEditMidSaveVO editMidSaveVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
		
		String userId = request.getParameter("userId");		
		editMidSaveVO.setG2_USERID(userId);
		
		List<EgovMap> middleEditFeatureList = lyrEditService.selectEditMidSaveInfoList(editMidSaveVO);

		model.addAttribute("feature_list", middleEditFeatureList);		
        return "jsonView";
	}
	
	
	/**
	 * 중간저장되어 있는 feature를 삭제한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/deleteMidSaveFeature.do", method = RequestMethod.POST)
	public String deleteMidSaveFeature(@ModelAttribute LyrEditMidSaveVO editMidSaveVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
	
		String userId = request.getParameter("userId");		
		String layer = request.getParameter("editLayer");    	
    	String g2Id = request.getParameter("g2Id");		
		int delCnt = 0;
		
		editMidSaveVO.setG2_USERID(userId);
		if(layer == "" || layer == null){
			delCnt = lyrEditService.deleteMidSaveFeature(editMidSaveVO);	
		}
		else{
			editMidSaveVO.setG2_NAME(layer);
			editMidSaveVO.setG2_ID(Long.valueOf(g2Id));
			delCnt = lyrEditService.deleteMidSaveFeature(editMidSaveVO);
		}

		model.addAttribute("delFeatureCnt", delCnt);

        return "jsonView";
	}
	
	
	/**
	 * 편집레이어(중간저장) 정보삭제 :  G2S_EDITHISTORY와 비교하여 중간저장 테이블에 남아있는 항목이 있으면 삭제
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/deleteMidSaveCompHistory.do", method = RequestMethod.POST)
	public String deleteMidSaveCompHistory(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
		int delCnt = lyrEditService.deleteMidSaveCompHistory(request.getParameter("userId"));
		model.addAttribute("delCnt", delCnt);
		return "jsonView";
	}
	
	
	/**
	 * 편집레이어(중간저장) 정보삭제 :  DATASET_EDIT와 비교하여 중간저장 테이블에 남아있는 항목이 있으면 삭제 
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/deleteMidSaveCompEdit.do", method = RequestMethod.POST)
	public String deleteMidSaveCompEdit(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
		String modifyDelJson = request.getParameter("oModifyNDel");
				
		JsonObject jsonObj = new JsonParser().parse(modifyDelJson).getAsJsonObject();
		Iterator<Map.Entry<String, JsonElement>> iterator = jsonObj.entrySet().iterator();
		Map.Entry<String, JsonElement> entry;
		while(iterator.hasNext()){
			entry = iterator.next();
			String tableName = entry.getKey();
			JsonElement value = entry.getValue();
			if(value.isJsonPrimitive()){
				/*try {
					entry.setValue(new JsonPrimitive(entry.getValue().getAsString()));
				} catch (Exception e) {}*/
			}
			else if(value.isJsonObject()){
				JsonObject valueObj = value.getAsJsonObject();
				Iterator<Map.Entry<String, JsonElement>> itr = valueObj.entrySet().iterator();
				Map.Entry<String, JsonElement> entryG2Id;
				JsonElement g2Id;
				if(itr.hasNext()){					
					entryG2Id = itr.next();
					g2Id = entryG2Id.getValue();
					if(g2Id.isJsonArray()){
						Map map = new HashMap();
						List <Long> g2IdList = new ArrayList();
						JsonArray jsonArray = g2Id.getAsJsonArray();						
						for(int i=0; i<jsonArray.size(); i++){
							g2IdList.add(jsonArray.get(i).getAsLong());
						}
						// DB call
						map.put("TABLENAME_EDIT", tableName + "_EDIT");
						map.put("g2IdList", g2IdList);
						int cnt = lyrEditService.deleteMidSaveCompEdit(map);
					}
				}
			}
			else if(value.isJsonArray()){
				/*JsonArray jsonArray = value.getAsJsonArray();				
				JsonElement jsonElement;
				for(int i=0; i<jsonArray.size(); i++){
					jsonElement = jsonArray.get(i);
					jsonElement.getAsJsonObject(); // recall
				}*/
			}
		}		

		return "jsonView";
	}
	
	
	/**
	 * 편집을 진행하는 feature의 공간정보와 속성정보를 업데이트한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/mapedit/insertG2SEditHistory.do", method = RequestMethod.POST)
	public String insertG2SEditHistory(@ModelAttribute SearchEditHisVO searchEditHisVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {				
	
		Integer g2_DATASETID = Integer.valueOf(request.getParameter("datasetId"));
		Integer g2_ID = Integer.valueOf(request.getParameter("g2Id"));
		Integer g2_STATE = Integer.valueOf(request.getParameter("g2State"));
		String g2_USER = request.getParameter("g2User");
		String g2_DATE = DateUtil.getCurrentTime();
		Long g2_REMARK = Long.valueOf(request.getParameter("g2Remark"));
		String tableName = request.getParameter("tableName");
		
		try {					
			searchEditHisVO.setG2_DATASETID(g2_DATASETID);
			searchEditHisVO.setG2_ID(g2_ID);			
			searchEditHisVO.setG2_STATE(g2_STATE);
			searchEditHisVO.setG2_USER(g2_USER);
			searchEditHisVO.setG2_DATE(g2_DATE);			
			searchEditHisVO.setG2_REMARK(g2_REMARK);
			searchEditHisVO.setTABLENAME_EDIT(tableName+"_EDIT");
				
			lyrEditService.insertG2SEditHistory(searchEditHisVO);			
	
		} catch (Exception e) {
			e.printStackTrace();
		}
				
        return "jsonView";
	}
	
	/**
	 * 레이어의 도메인컬럼정보를 추출한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/getDomainInfo.do", method = RequestMethod.POST)
	public String deleteMidSaveFeature(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
	
		String layer = request.getParameter("editLayer");
		JSONObject obj = new JSONObject();

		if(layer != ""){
			
			List<LyrEditSchemaInfoVO> schemaInfoList = lyrEditService.selectSchemaInfoList(layer);
			
			for(int i=0; i<schemaInfoList.size(); i++){
				
				LyrEditSchemaInfoVO vo = (LyrEditSchemaInfoVO)schemaInfoList.get(i);
				
				BigDecimal dDomain = (BigDecimal) vo.getG2_DOMAIN();
				BigDecimal dDomainType = (BigDecimal) vo.getG2_DOMAIN_TYPE();
				
				String fieldNm = vo.getG2_NAME();
				boolean bDomainColumn = false;
				boolean bFtrCdeColumn = false;
				String sExceptTables = "WTL_VALV_PS,WTL_MANH_PS,WTL_FIRE_PS,SWL_PIPE_AS,SWL_PIPE_LM";
				
				if(sExceptTables.contains(layer) && fieldNm.equals("FTR_CDE")){
					bFtrCdeColumn = true;
				}
				if((String.valueOf(dDomainType).equals(String.valueOf(BigDecimal.valueOf(2))) && !fieldNm.equals("FTR_CDE"))){
					bDomainColumn = true;
				}
				//지형지물부호 제외
				if(bDomainColumn || bFtrCdeColumn){
					
					CodeVO cv = new CodeVO();
					cv.setCONTENT_ID(layer);
					cv.setCODE_ID(fieldNm);
					List codeList = null;
					
					if(bFtrCdeColumn)
						codeList = commonService.selectDtlCd(cv);
					else						
						codeList = commonService.selectCd(cv);
					
					if(codeList != null) {
						
			    		JSONObject objDomain = new JSONObject();
			    			
						for (int j = 0; j < codeList.size(); j++) {
			    			cv = (CodeVO) codeList.get(j);
			    			
			    			objDomain.put(cv.getCODE(),cv.getVAL());
			    			
			    		}
						
						obj.put(vo.getG2_NAME(), objDomain);
					}
					
				}
				
			}
		}

		model.addAttribute("domainInfo", obj);

        return "jsonView";
	}
	
	@SuppressWarnings("null")
	@RequestMapping(value = "/getEditG2Data.do", method = RequestMethod.POST)
	public String getEditG2Data(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map map = new HashMap();
		map.put("G2_ID", request.getParameter("g2_id"));
		map.put("TABLENAME", request.getParameter("tableName"));
		map.put("G2_VERSION", request.getParameter("g2_version"));
		List<String> columnName = lyrEditService.selectCloumName(request.getParameter("tableName"));
		Map editG2data = lyrEditService.selectEditG2Data(map);
		int coordScale = commonService.getCoordScale(request.getParameter("g2_dataHouse"));
		
		
		/*if(editG2data.containsKey("G2_DATA")) {
			BLOB blob = (BLOB)editG2data.get("G2_DATA");
			aMemoryStreamWriter outstream = new aMemoryStreamWriter();
			int start = 1;
			int len = 2048;
			byte[] buff = null;
			while (true)
			{
				buff = blob.getBytes(start, len);

				if (buff == null)
					break;

				outstream.write(buff, buff.length);

				if (buff.length < len)
					break;

				start = start + len;
			}
			aMemoryStreamReader reader = new aMemoryStreamReader(outstream.getBuffer());
			aiInfoEditHistory info = aEditFactory.createEditHistoryInfo();
        	if (info.getBackData() == null)
        	{
        		info.setBackData(aValueFactory.createValueSet());
        	}
            info.getBackData().read(reader);
            
            Object[] fields = info.getBackData().get();
            GEODATA_TYPE shapeType = null;
            Map g2data = new HashMap();
            for(int i=0;i<columnName.size();i++) {
            	if(columnName.get(i).equals("G2_SPATIALTYPE")) {
            		int infoGetType = Integer.parseInt(String.valueOf((Long) info.getBackData().get(i)));
            		shapeType = GEODATA_TYPE.fromInt(infoGetType);
            	} else if(columnName.get(i).equals("G2_SPATIAL")) {
            		aiGeometry geoData = aGeometryFactory.create(shapeType, coordScale);
                    byte[] infoBuff = (byte[]) info.getBackData().get(i);
                    aMemoryStreamReader shapeReader = new aMemoryStreamReader(infoBuff);
                    geoData.decode(shapeReader);
                    List<aiPoint> points =  geoData.getPoint();
                    g2data.put(columnName.get(i), points);
                    shapeReader.close();
            	} else {
            		g2data.put(columnName.get(i), fields[i]);
            	}
            }
            editG2data.put("G2_SHAPETYPE",shapeType.toString().split("_")[1]);
            editG2data.put("G2_DATA", g2data);
            reader.close();
		}*/
		model.addAttribute("g2data", editG2data);
		return "jsonView";
	}
	
	@SuppressWarnings("null")
	@RequestMapping(value = "/mergeUserLayerOrder.do", method = RequestMethod.POST)
	public void mergeUserLayerOrder(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<Map> list = new Gson().fromJson(request.getParameter("data"), new TypeToken<List<HashMap>>(){}.getType());
		for(Map map:list){
			lyrEditService.mergeLayerOrder(map);
		}
	}
	
	@RequestMapping(value = "/getUserLayerOrder.do", method = RequestMethod.POST)
	public String getUserLayerOrder(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<Map> list = lyrEditService.selectLayerOrder(request.getParameter("userId"));
		model.addAttribute("layerList", list);
		return "jsonView";
	}
	
	@RequestMapping(value = "/getMapToDomain.do", method = RequestMethod.POST)
	public String getMapToDomain(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String layer = request.getParameter("editLayer");
		Map returnDomain = new HashMap();
		
		if(layer != ""){
			
			List<LyrEditSchemaInfoVO> schemaInfoList = lyrEditService.selectSchemaInfoList(layer);
			
			for(int i=0; i<schemaInfoList.size(); i++){
				
				LyrEditSchemaInfoVO vo = (LyrEditSchemaInfoVO)schemaInfoList.get(i);
				if(vo.getG2_DOMAIN().compareTo(new BigDecimal("0")) != 0) {
					Map map = new HashMap();
					for(Map domainMap:(List<Map>)commonService.getDomainMap(vo.getG2_DOMAIN().toString())){
						map.put(domainMap.get("G2_CODE"), domainMap.get("G2_VALUE"));
					}
					returnDomain.put(vo.getG2_NAME(),map);
				}
			}
		}
		model.addAttribute("returnDomain",returnDomain);
		
		return "jsonView";
	}
}
