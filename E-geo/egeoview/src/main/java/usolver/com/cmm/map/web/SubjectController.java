package usolver.com.cmm.map.web;

import java.io.File;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import usolver.com.cmm.map.service.UserLyrStlyeService;
import usolver.com.cmm.map.service.UserSubjectService;
import usolver.com.cmm.map.service.vo.SubjectFileInfoVO;
import usolver.com.cmm.map.service.vo.SubjectFileTotVO;
import usolver.com.cmm.map.service.vo.SubjectLayerVO;
import usolver.com.cmm.map.service.vo.UserLyrStyleVO;
import usolver.com.cmm.map.service.vo.SubjectVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.util.FileMngUtil;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.service.Globals;


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
@RequestMapping("/subject")

public class SubjectController {
	
	@Resource(name = "EgovFileMngUtil") EgovFileMngUtil egFileMngUtil;
	@Autowired 	ServletContext context;
	
	
	 /** CommonService */
    @Resource(name = "commonService")
    private CommonService commonService;
    
	 /** UserSubjectService */
    @Resource(name = "subjectService")
    private UserSubjectService subjectService;
    
	 /** UserSubjectService */
    @Resource(name = "userLyrStlyeService")
    private UserLyrStlyeService userLyrStlyeService;
    /** LOG4J */
    private Logger log = Logger.getLogger(this.getClass());
	/**
	 * 주제도를 저장한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/saveSubject.do", method=RequestMethod.POST)
	public @ResponseBody String saveSubject(HttpServletRequest request,@ModelAttribute("subjectVO") SubjectVO subjectVO ) throws Exception {
		String data = subjectVO.getLAYER_SYLE();
		String succ="0";
		

		try{
			
			int subjectId = Integer.parseInt(commonService.getNewID("TN_USER_SUBJECT","SUBJECT_ID"));			
			subjectVO.setSUBJECT_ID(subjectId); 
			
			String sReqSubjectBASE = request.getParameter("BASE");
			String sUserId = request.getParameter("USER_ID");
			
			if(sUserId != null)
				subjectVO.setUSER_ID(sUserId);
			
			if(sReqSubjectBASE != null)
				subjectVO.setBASE(sReqSubjectBASE);
		
			// [★★★ DB INSERT - 1 ]주제도저장
			subjectService.insertSubject(subjectVO);
			
		    String userId = subjectVO.getUSER_ID(); 
		    if(userId == "" || userId == null)
		    	userId = "admin";
			//스타일 저장
			JSONParser jsonParser = new JSONParser();
			Object obj = jsonParser.parse(data);
			JSONObject jsonTotObj = (JSONObject) obj;

			for (Object key : jsonTotObj.keySet()) {
		       
		        String keyStr = (String)key;
		        Object keyvalue = jsonTotObj.get(keyStr);
		        JSONObject jsonObj = (JSONObject) keyvalue;
		        
		        //for(int i = 0; i < jsonObj.size(); i++){
		        	String tableName = keyStr;
		        	String themeName =(String)jsonObj.get("themeName");
		        	String styleInfo =(String)jsonObj.get("style");
		        	int layerOrder =Integer.parseInt((String) jsonObj.get("order")) ; 
		        	
		        	int groupId 		=	Integer.parseInt((String) jsonObj.get("groupId")) ; 
		        	String groupName 	=	(String)jsonObj.get("groupName");
		        	int layerId	 		=	Integer.parseInt((String) jsonObj.get("layerId")) ; 
		        	String layerOnoff 	=	(String)jsonObj.get("layerOnoff");
		        	String layerType 	=	(String)jsonObj.get("layerType");
		        	
		        	
		        	SubjectLayerVO  subjectLayerVO = new SubjectLayerVO();
		        	
		        	subjectLayerVO.setSUBJECT_ID(subjectId);
		        	subjectLayerVO.setLAYER_NAME(themeName);
		        	subjectLayerVO.setTABLE_NAME(tableName);
		        	subjectLayerVO.setLAYER_ORDER(layerOrder);
		        	subjectLayerVO.setGROUP_ID(groupId);
		        	subjectLayerVO.setGROUP_NAME(groupName);
		        	subjectLayerVO.setLAYER_ID(layerId);
		        	subjectLayerVO.setLAYER_ONOFF(layerOnoff);
		        	subjectLayerVO.setLAYER_TYPE(layerType);
		        	
		        	
		        	// [★★★ DB INSERT - 2 ]주제도 레이어 목록 저장 - 주제도에 포함된 레이어 개수만큼
		        	subjectService.insertSubjectLayer(subjectLayerVO);
		        	
		        	// [★★★ DB INSERT - 3 ]주제도 레이어 스타일 목록 저장 - 별도 심볼을 정의한 레이어 개수만큼
		        	if(styleInfo != null && styleInfo != ""){
		        		
			        	UserLyrStyleVO  subjectStyleVO = new UserLyrStyleVO();
			        	
			        	subjectStyleVO.setSUBJECT_ID(subjectId);
			        	subjectStyleVO.setLAYER_NAME(themeName);
			        	subjectStyleVO.setTABLE_NAME(tableName);
			        	subjectStyleVO.setLAYER_STYLE(styleInfo);
			        	subjectStyleVO.setUSER_ID(userId);
		        	
			        	userLyrStlyeService.insertUserLyrStyle(subjectStyleVO);
		        	}
		        //}
		        
		    }
			
			// 파일저장
			List<MultipartFile> multipartFiles = ((MultipartHttpServletRequest) request).getFiles("FILES");
			
			if(multipartFiles.size()>0)
			{
				SubjectFileInfoVO subjectFileInfoVO = new SubjectFileInfoVO();	
				
				Calendar cal = Calendar.getInstance();
				String stordFilePath = EgovProperties.getProperty("Globals.subjectFileStore");
				String addPath = cal.get(Calendar.YEAR) + String.format("%02d",(cal.get(Calendar.MONTH)+1)) + "/";
				stordFilePath += addPath; 				
				
				File file = new File(stordFilePath);
				if(!file.exists()){
					
					log.debug("[주제도 스냅샷 업로드 디렉토리 생성 시도] ::::::::::::>"+ stordFilePath);
					
					if(file.canWrite())
						try{
							file.mkdir(); 
							log.debug("[주제도 스냅샷 업로드 디렉토리 생성 성공]");
						}
						catch(Exception e){
							log.debug("[주제도 스냅샷 업로드 디렉토리 생성 오류] ::::::::::::>"+e.getMessage());
						} 
					else{ 
						log.debug("[주제도 스냅샷 업로드 디렉토리 생성 실패] - 쓰기 권한 없음");
					} 
					
				} 
				
				String newName= "";
				
				for(MultipartFile multipartFile : multipartFiles )
				{
					FileMngUtil fileMngUtil = new FileMngUtil();					
					newName= fileMngUtil.newFileName();//"yyyyMMddhhmmssSSS"							
					
					HashMap<String, String> uploadFileInfo = fileMngUtil.saveFile(multipartFile, newName, stordFilePath);
					
					subjectFileInfoVO.setSUBJECT_ID(subjectVO.getSUBJECT_ID());
					subjectFileInfoVO.setFILE_NM(uploadFileInfo.get(Globals.ORIGIN_FILE_NM));
					subjectFileInfoVO.setFILE_PATH(uploadFileInfo.get(Globals.FILE_PATH));
					subjectFileInfoVO.setFILE_SIZE(uploadFileInfo.get(Globals.FILE_SIZE));
					subjectFileInfoVO.setFILE_UPLOAD_NM(uploadFileInfo.get(Globals.UPLOAD_FILE_NM));
					subjectFileInfoVO.setFILE_EXT(uploadFileInfo.get(Globals.FILE_EXT));					
					
					subjectService.insertSubjectFileInfo(subjectFileInfoVO);	
				}
				
			}
			succ= "1";
			
		}catch(Exception e)
		{
			e.printStackTrace();
			succ="0";
		}
		finally
		{
			return succ;
		}
	}
	
	/**
	 * 주제도를 update한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateSubject.do", method=RequestMethod.POST)
	public @ResponseBody String updateSubject(HttpServletRequest request,@ModelAttribute("subjectVO") SubjectVO subjectVO ) throws Exception {
		String data = subjectVO.getLAYER_SYLE();
		String succ="0";
		String sReqSubjectId = request.getParameter("SEL_SUBJECT_ID");
		String sUserId = request.getParameter("USER_ID");
		
		if(sUserId != null)
			subjectVO.setUSER_ID(sUserId);
		
		if(sReqSubjectId == null)
			sReqSubjectId = "0";
		
		try{
			
			int subjectId = Integer.parseInt(sReqSubjectId);
			
			if(subjectId != 0){
				
				subjectVO.setSUBJECT_ID(subjectId); 
			
				// [★★★ DB INSERT - 1 ]주제도저장
				subjectService.updateSubject(subjectVO);
				
				//입력전 기존 데이터 삭제
				subjectService.deleteSubjectAllLayer(subjectVO);
				subjectService.deleteSubjectAllStyle(subjectVO);
				
			    String userId = subjectVO.getUSER_ID(); 
			    if(userId == "" || userId == null)
			    	userId = "admin";
				//스타일 저장
				JSONParser jsonParser = new JSONParser();
				Object obj = jsonParser.parse(data);
				JSONObject jsonTotObj = (JSONObject) obj;
	
				for (Object key : jsonTotObj.keySet()) {
			       
			        String keyStr = (String)key;
			        Object keyvalue = jsonTotObj.get(keyStr);
			        JSONObject jsonObj = (JSONObject) keyvalue;
			        
			        //for(int i = 0; i < jsonObj.size(); i++){
			        	String tableName = keyStr;
			        	String themeName =(String)jsonObj.get("themeName");
			        	String styleInfo =(String)jsonObj.get("style");
			        	int layerOrder =Integer.parseInt((String) jsonObj.get("order")) ; 
			        	
			        	int groupId 		=	Integer.parseInt((String) jsonObj.get("groupId")) ; 
			        	String groupName 	=	(String)jsonObj.get("groupName");
			        	int layerId	 		=	Integer.parseInt((String) jsonObj.get("layerId")) ; 
			        	String layerOnoff 	=	(String)jsonObj.get("layerOnoff");
			        	String layerType 	=	(String)jsonObj.get("layerType");
			        	
			        	
			        	SubjectLayerVO  subjectLayerVO = new SubjectLayerVO();
			        	
			        	subjectLayerVO.setSUBJECT_ID(subjectId);
			        	subjectLayerVO.setLAYER_NAME(themeName);
			        	subjectLayerVO.setTABLE_NAME(tableName);
			        	subjectLayerVO.setLAYER_ORDER(layerOrder);
			        	subjectLayerVO.setGROUP_ID(groupId);
			        	subjectLayerVO.setGROUP_NAME(groupName);
			        	subjectLayerVO.setLAYER_ID(layerId);
			        	subjectLayerVO.setLAYER_ONOFF(layerOnoff);
			        	subjectLayerVO.setLAYER_TYPE(layerType);
			        	
			        	
			        	// [★★★ DB INSERT - 2 ]주제도 레이어 목록 저장 - 주제도에 포함된 레이어 개수만큼
			        	subjectService.insertSubjectLayer(subjectLayerVO);
			        	
			        	// [★★★ DB INSERT - 3 ]주제도 레이어 스타일 목록 저장 - 별도 심볼을 정의한 레이어 개수만큼
			        	if(styleInfo != null && styleInfo != ""){
			        		
				        	UserLyrStyleVO  subjectStyleVO = new UserLyrStyleVO();
				        	
				        	subjectStyleVO.setSUBJECT_ID(subjectId);
				        	subjectStyleVO.setLAYER_NAME(themeName);
				        	subjectStyleVO.setTABLE_NAME(tableName);
				        	subjectStyleVO.setLAYER_STYLE(styleInfo);
				        	subjectStyleVO.setUSER_ID(userId);
			        	
				        	userLyrStlyeService.insertUserLyrStyle(subjectStyleVO);
			        	}
			        //}
			        
			    }
				
				// 파일저장
				List<MultipartFile> multipartFiles = ((MultipartHttpServletRequest) request).getFiles("FILES");
				
				if(multipartFiles.size()>0)
				{
					
					subjectService.deleteSubjectFiles(subjectVO);
				
					SubjectFileInfoVO subjectFileInfoVO = new SubjectFileInfoVO();	
					
					Calendar cal = Calendar.getInstance();
					String stordFilePath = EgovProperties.getProperty("Globals.subjectFileStore");
					String addPath = cal.get(Calendar.YEAR) + String.format("%02d",(cal.get(Calendar.MONTH)+1)) + "/";
					stordFilePath += addPath; 				
					
					File file = new File(stordFilePath);
					if(!file.exists()){
						
						log.debug("[주제도 스냅샷 업로드 디렉토리 생성 시도] ::::::::::::>"+ stordFilePath);
						
						if(file.canWrite())
							try{
								file.mkdir(); 
								log.debug("[주제도 스냅샷 업로드 디렉토리 생성 성공]");
							}
							catch(Exception e){
								log.debug("[주제도 스냅샷 업로드 디렉토리 생성 오류] ::::::::::::>"+e.getMessage());
							} 
						else{ 
							log.debug("[주제도 스냅샷 업로드 디렉토리 생성 실패] - 쓰기 권한 없음");
						} 
						
					} 
					
					String newName= "";
					
					for(MultipartFile multipartFile : multipartFiles )
					{
						FileMngUtil fileMngUtil = new FileMngUtil();					
						newName= fileMngUtil.newFileName();//"yyyyMMddhhmmssSSS"							
						
						HashMap<String, String> uploadFileInfo = fileMngUtil.saveFile(multipartFile, newName, stordFilePath);
						
						subjectFileInfoVO.setSUBJECT_ID(subjectVO.getSUBJECT_ID());
						subjectFileInfoVO.setFILE_NM(uploadFileInfo.get(Globals.ORIGIN_FILE_NM));
						subjectFileInfoVO.setFILE_PATH(uploadFileInfo.get(Globals.FILE_PATH));
						subjectFileInfoVO.setFILE_SIZE(uploadFileInfo.get(Globals.FILE_SIZE));
						subjectFileInfoVO.setFILE_UPLOAD_NM(uploadFileInfo.get(Globals.UPLOAD_FILE_NM));
						subjectFileInfoVO.setFILE_EXT(uploadFileInfo.get(Globals.FILE_EXT));					
						
						subjectService.insertSubjectFileInfo(subjectFileInfoVO);	
					}
					
				}
				succ= "1";
			}
			else{
				succ="0";
			}
			
			
		}catch(Exception e)
		{
			e.printStackTrace();
			succ="0";
		}
		finally
		{
			return succ;
		}
	}
	
	/**
	 * 주제도를 update한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/setBaseSubject.do", method = RequestMethod.POST)
	public @ResponseBody String setBaseSubject( HttpServletRequest request ) throws Exception {
		String succ="0";
		String subjectId = request.getParameter("SUBJECT_ID");
		String userId = request.getParameter("USER_ID");
		String baseSubject = request.getParameter("BASE");
		
		SubjectVO subjectVO = new SubjectVO();
		
		subjectVO.setSUBJECT_ID(Integer.parseInt(subjectId));
		subjectVO.setUSER_ID(userId);
		subjectVO.setSUBJECT_GROUP("BASE");
		subjectVO.setBASE(baseSubject);
		
		try{
			// 주제도저장
			subjectService.setBaseSubject(subjectVO);
			
			succ= "1";
			
		}catch(Exception e)
		{
			succ="0";
		}
		finally
		{
			return succ;
		}
	}
	
	
	/**
	 * 주제도 리스트를 불러온다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSubjectList.do")
	public String getSubjectList(SubjectVO subjectVO, Model model) throws Exception {
		
		List<SubjectVO> subjectList = subjectService.selectSubjectList(subjectVO);
		model.addAttribute("userSubjectList", subjectList);
		return "jsonView";
	}
	/*public String getMemoList2(UserSubjectVO subjectVO, Model model) throws Exception {
		List<UserSubjectVO> userMemoList = subjectService.selectUserMemoList(subjectVO);
		model.addAttribute("userMemoList", userMemoList);
		return "jsonView";
	}*/
	
	@RequestMapping(value = "/getSubjectTotList.do")
	public String getSubjectTotList(HttpServletRequest request, Model model) throws Exception {
		SubjectFileTotVO subjectFileTotVO = new SubjectFileTotVO();
		
		String userId = request.getParameter("USER_ID");
		String subjectGroup = request.getParameter("SUBJECT_GROUP");
		String systemMap = request.getParameter("SYSTEM_MAP");
		
		subjectFileTotVO.setUSER_ID(userId);
		subjectFileTotVO.setSUBJECT_GROUP(subjectGroup);
		subjectFileTotVO.setSYSTEM_MAP(systemMap);
		
		List<SubjectFileTotVO> subjectTotList;
		
		if(systemMap.toUpperCase().equals("Y"))
			subjectTotList = subjectService.selectSysSubjectFileInfoList(subjectFileTotVO);
		else if(subjectGroup.toUpperCase().equals("STANDBY")) //승인대기상태 주제도
			subjectTotList = subjectService.selectStandbySubjectFileInfoList(subjectFileTotVO);
		else if(subjectGroup.toUpperCase().equals("BASE"))
			subjectTotList = subjectService.selectMySubjectFileInfoList(subjectFileTotVO);
		else
			subjectTotList = subjectService.selectSharedSubjectFileInfoList(subjectFileTotVO);
		
		for(SubjectFileTotVO fileInfoVO : subjectTotList) {
			FileMngUtil fileMngUtil = new FileMngUtil();
			File file = fileMngUtil.getFile(fileInfoVO.getFILE_UPLOAD_NM()+"_tmb", fileInfoVO.getFILE_PATH());
			if(file != null){
				String base64String = egFileMngUtil.getEncodeBase64String(file, fileInfoVO.getFILE_EXT());
				fileInfoVO.setFILE_BASE64_STRING(base64String);
			}
		}
		
		model.addAttribute("userSubjectTotList", subjectTotList);
		
		return "jsonView";
	}

	
	@RequestMapping(value="/deleteSubject.do", method = RequestMethod.POST)
	public @ResponseBody String deleteSubject( HttpServletRequest request ) throws Exception{
		
		String succ="0";
		String subjectId = request.getParameter("SUBJECT_ID");
		String userId = request.getParameter("USER_ID");
		
		SubjectVO subjectVO = new SubjectVO();
		
		subjectVO.setSUBJECT_ID(Integer.parseInt(subjectId));
		subjectVO.setUSER_ID(userId);
    	
    	try{
			// 주제도저장
			subjectService.deleteSubject(subjectVO);
			//subjectService.deleteSubjectFiles(subjectVO);
			//subjectService.deleteSubjectAllLayer(subjectVO);
			//subjectService.deleteSubjectAllStyle(subjectVO);
			
			succ= "1";
			
		}catch(Exception e)
		{
			succ="0";
		}
		finally
		{
			return succ;
		}
		
	}
	
	
}
