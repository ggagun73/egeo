package usolver.com.cmm.map.web;

import java.io.File;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import usolver.com.cmm.map.service.UserMemoService;
import usolver.com.cmm.map.service.vo.MarkerVO;
import usolver.com.cmm.map.service.vo.MemoFileInfoVO;
import usolver.com.cmm.map.service.vo.MemoGroupVO;
import usolver.com.cmm.map.service.vo.MemoHistVO;
import usolver.com.cmm.map.service.vo.MemoVO;
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
@RequestMapping("/memo")

public class MemoController {
	
	@Resource(name = "userMemoService") UserMemoService memoService;
	@Resource(name = "EgovFileMngUtil") EgovFileMngUtil egFileMngUtil;
	@Autowired 	ServletContext context;
	
	
    /** LOG4J */
    private Logger log = Logger.getLogger(this.getClass());
	/**
	 * 메모를 저장한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/saveMemo.do", method=RequestMethod.POST)
	public @ResponseBody String saveMemo(HttpServletRequest request,@ModelAttribute("memoVO") MemoVO memoVO ) throws Exception {
		
		String succ="0";
		
		try{
			// 메모저장
			memoService.insertMemo(memoVO);
			
			// 파일저장
			List<MultipartFile> multipartFiles = ((MultipartHttpServletRequest) request).getFiles("FILES");
			
			if(multipartFiles.size()>0)
			{
				MemoFileInfoVO memoFileInfoVO = new MemoFileInfoVO();	
				
				Calendar cal = Calendar.getInstance();
				String stordFilePath = EgovProperties.getProperty("Globals.memoFileStore");
				String addPath = cal.get(Calendar.YEAR) + String.format("%02d",(cal.get(Calendar.MONTH)+1)) + "/";
				stordFilePath += addPath; 
				
				File file = new File(stordFilePath);
				if(!file.exists()){
					
					log.debug("[메모 업로드 디렉토리 생성 시도] ::::::::::::>"+ stordFilePath);
					
					if(file.canWrite())
						try{
							file.mkdir(); 
							log.debug("[메모 업로드 디렉토리 생성 성공]");
						}
						catch(Exception e){
							log.debug("[메모 업로드 디렉토리 생성 오류] ::::::::::::>"+e.getMessage());
						} 
					else{ 
						log.debug("[메모 업로드 디렉토리 생성 실패] - 쓰기 권한 없음");
					} 
					
				} 
				
				String newName= "";
				
				for(MultipartFile multipartFile : multipartFiles )
				{
					FileMngUtil fileMngUtil = new FileMngUtil();					
					newName= fileMngUtil.newFileName();//"yyyyMMddhhmmssSSS"							
					
					HashMap<String, String> uploadFileInfo = fileMngUtil.saveFile(multipartFile, newName, stordFilePath);
					
					memoFileInfoVO.setMEMO_ID(memoVO.getMEMO_ID());
					memoFileInfoVO.setFILE_NM(uploadFileInfo.get(Globals.ORIGIN_FILE_NM));
					memoFileInfoVO.setFILE_PATH(uploadFileInfo.get(Globals.FILE_PATH));
					memoFileInfoVO.setFILE_SIZE(uploadFileInfo.get(Globals.FILE_SIZE));
					memoFileInfoVO.setFILE_UPLOAD_NM(uploadFileInfo.get(Globals.UPLOAD_FILE_NM));
					memoFileInfoVO.setFILE_EXT(uploadFileInfo.get(Globals.FILE_EXT));					
					
					memoService.insertMemoFileInfo(memoFileInfoVO);	
				}
				
			}
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
	 * 메모를 update한다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value="/updateMemo.do")
	public @ResponseBody String updateMemo(HttpServletRequest request,@ModelAttribute("memoVO") MemoVO memoVO ) throws Exception {
		String succ="0";
		
		try{
			// 메모저장
			memoService.updateMemo(memoVO);
			
			// 파일저장
			List<MultipartFile> multipartFiles = ((MultipartHttpServletRequest) request).getFiles("FILES");
			
			if(multipartFiles.size()>0)
			{
				MemoFileInfoVO memoFileInfoVO = new MemoFileInfoVO();	
				
				Calendar cal = Calendar.getInstance();
				String stordFilePath = EgovProperties.getProperty("Globals.memoFileStore");
				String addPath = cal.get(Calendar.YEAR) + String.format("%02d",(cal.get(Calendar.MONTH)+1)) + "/";
				stordFilePath += addPath; 				
				
				String newName= "";
				
				for(MultipartFile multipartFile : multipartFiles )
				{
					FileMngUtil fileMngUtil = new FileMngUtil();					
					newName= fileMngUtil.newFileName();//"yyyyMMddhhmmssSSS"							
					
					HashMap<String, String> uploadFileInfo = fileMngUtil.saveFile(multipartFile, newName, stordFilePath);
					
					memoFileInfoVO.setMEMO_ID(memoVO.getMEMO_ID());
					memoFileInfoVO.setFILE_NM(uploadFileInfo.get(Globals.ORIGIN_FILE_NM));
					memoFileInfoVO.setFILE_PATH(uploadFileInfo.get(Globals.FILE_PATH));
					memoFileInfoVO.setFILE_SIZE(uploadFileInfo.get(Globals.FILE_SIZE));
					memoFileInfoVO.setFILE_UPLOAD_NM(uploadFileInfo.get(Globals.UPLOAD_FILE_NM));
					memoFileInfoVO.setFILE_EXT(uploadFileInfo.get(Globals.FILE_EXT));					
					
					memoService.insertMemoFileInfo(memoFileInfoVO);	
				}
				
			}
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
	 * 메모를 리스트를 불러온다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMemoList.do")
	public String getMemoList(MemoVO memoVO, Model model) throws Exception {
		List<MemoVO> memoList = memoService.selectMemoList(memoVO);
		model.addAttribute("userMemoList", memoList);
		return "jsonView";
	}
	/*public String getMemoList2(UserMemoVO memoVO, Model model) throws Exception {
		List<UserMemoVO> userMemoList = memoService.selectUserMemoList(memoVO);
		model.addAttribute("userMemoList", userMemoList);
		return "jsonView";
	}*/
	/**
	 * 메모를 불러온다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMemo.do")
	public String getMemo(MemoHistVO memoHistVO, Model model) throws Exception {
		List<MemoHistVO> memoFileInfoList = memoService.selectMemoFileInfoList(memoHistVO);
		
		for(MemoHistVO fileInfoVO : memoFileInfoList) {
			FileMngUtil fileMngUtil = new FileMngUtil();
			File file = fileMngUtil.getFile(fileInfoVO.getFILE_UPLOAD_NM()+"_tmb", fileInfoVO.getFILE_PATH());
			if(file != null){
				String base64String = egFileMngUtil.getEncodeBase64String(file, fileInfoVO.getFILE_EXT());
				fileInfoVO.setFILE_BASE64_STRING(base64String);
			}
		}
		
		model.addAttribute("memoFileInfoList", memoFileInfoList);
		
		return "jsonView";
	}
	
	@RequestMapping(value="/getMemoGroup.do")
	public String getMemoGroupList(MemoGroupVO memoGroupVO, Model model) throws Exception{
		List <MemoGroupVO> memoGroupList = memoService.selectMemoGroupList(memoGroupVO);
		model.addAttribute("memoGroupList", memoGroupList);
		return "jsonView";
	}
	
	@RequestMapping(value="/getMarkerList.do")
	public String getMarkerList(MarkerVO markerVO, Model model) throws Exception {
		List<MarkerVO> markerList = memoService.selectMarkerList(markerVO);
		model.addAttribute("markerList", markerList);
		return "jsonView";
	} 
	
	@RequestMapping(value="/getMemoHistList.do")
	public String getMemoHistList(MemoHistVO memoHistVO, Model model) throws Exception
	{
		List<MemoHistVO> memoHistList = memoService.selectMemoHistList(memoHistVO);
		
		for(MemoHistVO fileInfoVO : memoHistList) {
			FileMngUtil fileMngUtil = new FileMngUtil();
			if(fileInfoVO.getFILE_UPLOAD_NM()!="")
			{
				File file = fileMngUtil.getFile(fileInfoVO.getFILE_UPLOAD_NM()+"_tmb", fileInfoVO.getFILE_PATH());
				if(file != null){
					String base64String = egFileMngUtil.getEncodeBase64String(file, fileInfoVO.getFILE_EXT());
					fileInfoVO.setFILE_BASE64_STRING(base64String);
				}
			}			
		}
		
		model.addAttribute("memoHistList", memoHistList);
		return "jsonView";
	}
	
	
	@RequestMapping(value="/deleteMemo.do")
	public String deleteMemo(MemoVO memoVO, Model model) throws Exception{
		
		String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
    	
		try {
    		resultCnt = memoService.deleteMemo( memoVO );
    		resultMsg = "DELETE_SUCCESS";
    	} catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "삭제 오류 발생";
    	}
    	
    	// 결과 처리용 [수정X]
    	model.addAttribute("resultMsg", resultMsg);
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);
    	//model.addAttribute("callBackFunction", StringUtil.nvl(request.getParameter("callBackFunction")));	// 처리후 호출 함수
    	
		return "jsonView";
	}
	
	@RequestMapping(value="/deleteMemoFile.do")
	public String deleteMemofile(MemoHistVO memoHistVO, Model model) throws Exception{
		String resultMsg = "";
    	int resultCnt = 0;
    	String errorMsg = "";
		try {
    		resultCnt = memoService.deleteMemofile( memoHistVO );    		
    		resultMsg = "DELETE_SUCCESS";
    	} catch(Exception e) {
    		resultMsg = "ERROR";
    		errorMsg = "삭제 오류 발생";
    	}
    	
    	model.addAttribute("resultMsg", resultMsg);
    	model.addAttribute("resultCnt", resultCnt);
    	model.addAttribute("errorMsg", errorMsg);
    	
    	
		return "jsonView";
	}
	
	
	
}
