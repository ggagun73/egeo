package usolver.admin.board.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import usolver.admin.board.service.NoticeService;
import usolver.admin.board.vo.NoticeVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.main.vo.LoginVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;


@Controller
public class NoticeController {
	
   @Resource(name = "noticeService")
    private NoticeService noticeService;
   
   /** EgovPropertyService */
   @Resource(name = "propertiesService")
   protected EgovPropertyService propertiesService;
   
   @Resource(name = "fileUploadProperties")
   Properties fileUploadProperties;
   
   /** CommonService */
   @Resource(name = "commonService")
   private CommonService commonService;
   
   /** CommonService */
   @Resource(name = "egovMessageSource")
   private EgovMessageSource egovMessageSource;
      
   // ========== 공지사항 ==========
   
	@RequestMapping(value="/admin/board/boardList.do")
	public String BoardList(@ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
	
		// 페이징 관련 처리 [수정 불필요]
    	noticeVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	noticeVO.setPageSize(propertiesService.getInt("pageSize"));
    	
    	// 페이징 데이터 설정 [수정 불필요]
    	PaginationInfo paginationInfo = new PaginationInfo();
    	paginationInfo.setCurrentPageNo(noticeVO.getPageIndex());
    	paginationInfo.setRecordCountPerPage(noticeVO.getPageUnit());
    	paginationInfo.setPageSize(noticeVO.getPageSize());
    	
    	noticeVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
    	noticeVO.setLastIndex(paginationInfo.getLastRecordIndex());
    	noticeVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List boardList = noticeService.getBoardList(noticeVO);
		model.addAttribute("resultList", boardList);
        
        int totCnt = noticeService.selectBoardListCnt(noticeVO);
        paginationInfo.setTotalRecordCount(totCnt);

        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("menu", "board");
		
		return "/usolver/admin/board/boardList";
	
	}
	
	@RequestMapping(value="/admin/board/boardView.do")
	public String BoardView(@RequestParam("IDX") String idx ,
								  @ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpSession session) throws Exception {
		
		//String idx = request.getParameter("IDX");		
		System.out.println("####################### IDX =>"+idx );
		System.out.println("####################### IDX =>"+noticeVO.getIDX() );		
		
		LoginVO  user = new LoginVO();
		user.setUSER_ID("user");
		user.setUSER_NAME("사용자");
					
		model.addAttribute("user", user);
		    
		if( idx != null ){
			
			noticeVO.setIDX(idx);
			noticeService.hitCnt(noticeVO);
			NoticeVO boardView = noticeService.getBoardView(noticeVO);
			model.addAttribute("result", boardView);
		
			List fileList = noticeService.boardFileDetail(noticeVO);
			model.addAttribute("fileList",fileList);
			
			model.addAttribute("FILE_COUNT", noticeService.boardFileCnt(noticeVO));
		
		}
		
		model.addAttribute("IDX", idx);
		model.addAttribute("menu", "board");
		
		return "/usolver/admin/board/boardView";
	}
	
	/**
	 * 공지사항을 등록, 수정한다. 
	 * @param boardWriteProc boardWriteProc
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value="/admin/board/boardWriteProc.do")
	public String boardWriteProc(@ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
		String resultMsg = "info.nodata.msg";
		int iResultCnt = 0;
		String idx = noticeVO.getIDX();
		
		try {
				//등록
				if( noticeVO.getIDX() == null || noticeVO.getIDX().equals("")){
					
					int Max = noticeService.maxBoard();
					
					noticeVO.setIDX(String.valueOf(Max));
					
					idx = Integer.toString(Max);
					noticeService.insertBoard(noticeVO);
					resultMsg = "success.common.insert";
					
					uploadFile(noticeVO,"Board");
				
				}else {
					
					//공지사항 수정 
					noticeService.editBoard(noticeVO);
					uploadFile(noticeVO,"Board");
					
					// 파일삭제
					String FILE_NO = request.getParameter("REGSTR_MANAGE_NO");
					if (!FILE_NO.equals("")) {
						noticeVO.setFILE_NO(FILE_NO);
						noticeService.deleteFileBoard(noticeVO);
						//물리파일 삭제
						/*List boardFileList = noticeService.boardFileDetail(noticeVO);
						if (boardFileList != null && boardFileList.size() > 0) {
							for (int i = 0; i < boardFileList.size(); i++) {
								commonService.fileDelete("Board", ((NoticeVO)boardFileList.get(i)).getFILE_NAME());
							}	
						}*/
					}
					
					resultMsg = "success.common.update";
				}

		} catch (Exception ex) {
			resultMsg = "fail.common.update";
		}
		
		model.addAttribute("IDX", idx);
		System.out.println("####################### IDX =>"+idx );
		System.out.println("####################### noticeVO =>"+noticeVO );
        model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
        
        if( resultMsg.contains("insert")){
        	return "forward:/admin/board/boardList.do";
        }else {
        	return "forward:/admin/board/boardView.do?IDX="+idx;
        }
   		
	}
	
	
	/**
	 * 공지사항을 삭제한다. 단일, 복수 삭제 모두 가능.. 
	 * @param uploadFile uploadFile
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value="/admin/board/boardDeleteProc.do")
	public String boardDeleteProc(@ModelAttribute NoticeVO noticeVO, 
										HttpServletRequest request, 
										SessionStatus status,
										ModelMap model  ) throws Exception {
		
		String resultMsg = "info.nodata.msg";
		String idxs = request.getParameter("checkList");
		
		try{
				
				if( idxs != null && !idxs.equals("") ){					
					String [] aNoticeId = idxs.split(";");    	
					if( idxs.length() > 0 ){

						for(int i = 0; i < aNoticeId.length; i++ ){
							
							noticeVO.setIDX(aNoticeId[i]);
							noticeService.delete(noticeVO);		
							noticeService.deleteFileBoard(noticeVO);
							resultMsg = "success.common.delete";
						}
					}
				}else {
					
					noticeService.delete(noticeVO);		
					noticeService.deleteFileBoard(noticeVO);
					resultMsg = "success.common.delete";
					
				}
		
		} catch(Exception e) {
    		resultMsg = "fail.common.delete";
		}
		
		status.setComplete();
		model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
		model.addAttribute("menu", "board");
		
		return "forward:/admin/board/boardList.do";
	}
	
	
	/**
	 * 물리적 파일 다운로드... 난중에 공통을 적용해 보자.. 
	 * @param uploadFile uploadFile
	 * @return String
	 * @exception Exception
	 */	
	@RequestMapping(value = "/admin/file/fileDownload.do")
	public void downloadFile(@ModelAttribute NoticeVO noticeVO, 
			ModelMap model,
			HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		//한글깨짐 방지
		//FILE_PATH =  new String(FILE_PATH.getBytes("8859_1"),"UTF-8"); 
		//FILE_NAME =  new String(FILE_NAME.getBytes("8859_1"),"UTF-8");
		
		File file = null;
		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		
		List boardFileList = noticeService.boardFileDetail(noticeVO);
		if (boardFileList == null || boardFileList.size() == 0) return;
		
		String FILE_NAME = ((NoticeVO) boardFileList.get(0)).getFILE_NAME();
		String FILE_PATH = fileUploadProperties.getProperty("system.uploadpath") + "\\" + req.getParameter("TYPE");
		
		try {
			file = new File(FILE_PATH,FILE_NAME);
			res.reset();
			
			//구분자인 시간을 지우고 원래 파일 이름을 가져옴			
			FILE_NAME=FILE_NAME.substring(13,FILE_NAME.length());
			
			res.setHeader("Context-Type", "application");
			res.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(FILE_NAME, "utf-8") + ";");
			
			if (file != null) {
				fin = new BufferedInputStream(new FileInputStream(file));
				outs = new BufferedOutputStream(res.getOutputStream());

				int read = 0;
				
				while ((read = fin.read()) != -1) {
					outs.write(read);
				}
			}
		} catch(Exception e) {
			res.setContentType("text/html;charset=UTF-8;");
		} finally {
			if(outs != null) fin.close();
			if(fin != null) outs.close();
		}
		
	}
	
	/**
	 * 물리적 파일 업로드... 난중에 공통을 적용해 보자.. 
	 * @param uploadFile uploadFile
	 * @return String
	 * @exception Exception
	 */
	private void uploadFile(NoticeVO noticeVO, String name) throws Exception{
		// 파일 업로드
		List<MultipartFile> files = noticeVO.getFILES();
		if (files == null) return;
		List<String> fileNames = noticeVO.getFILENAMES();

		//업로드 경로				
		String realPath = fileUploadProperties.getProperty("system.uploadpath") + "\\" + name;
		File saveFolder = new File(realPath);
		if (!saveFolder.exists() || saveFolder.isFile()) {
			saveFolder.mkdirs();
		}

		int fileSn = 0;

		for (MultipartFile multipartFile : files) {
			if (null != files && files.size() > 0) {
				String fileName = multipartFile.getOriginalFilename();
				String[] tokens = null;
				tokens = fileName.split(".");

				if (!fileName.equals("")) {

					fileName = System.currentTimeMillis() + fileName;
					String path = realPath + "\\" + fileName;
					File f = new File(path);
					multipartFile.transferTo(f);
					fileNames.add(fileName);

					int pos = fileName.lastIndexOf(".");
					String fileEX ="";
					
					fileEX =fileName.substring(pos + 1);

					String fileNM = fileName.substring(0, fileName.lastIndexOf('.'));

					noticeVO.setFILE_NAME(fileNM+"."+fileEX);
					noticeVO.setFILE_PATH(realPath);
					
					if(name.equals("Board"))
					{
						noticeService.insertBoardFile(noticeVO);
					}
					else if(name.equals("Refer"))
						noticeService.insertReferFile(noticeVO);

					fileSn++;
				}
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value="/board/popNoticeList.do")
	public String PopNoticeList(@ModelAttribute NoticeVO noticeVO, 
			ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
		// 페이징 관련 처리 [수정 불필요]
    	noticeVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	noticeVO.setPageSize(propertiesService.getInt("pageSize"));
    	
    	// 페이징 데이터 설정 [수정 불필요]
    	PaginationInfo paginationInfo = new PaginationInfo();
    	paginationInfo.setCurrentPageNo(noticeVO.getPageIndex());
    	paginationInfo.setRecordCountPerPage(noticeVO.getPageUnit());
    	paginationInfo.setPageSize(noticeVO.getPageSize());
    	
    	noticeVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
    	noticeVO.setLastIndex(paginationInfo.getLastRecordIndex());
    	noticeVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
    	int totCnt = noticeService.selectBoardListCnt(noticeVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
        model.addAttribute("totalRecordCount", ""+totCnt);
		
		List boardList = noticeService.getBoardList(noticeVO);
		model.addAttribute("resultList", boardList);
		
		return "/usolver/admin/board/popNoticeList";
	}
		
	@RequestMapping(value="/board/popNoticeView.do")
	public String PopNoticeView(@ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
		String idx = request.getParameter("IDX");
		noticeVO.setIDX(idx);
		
		noticeService.hitCnt(noticeVO);
		NoticeVO boardView = noticeService.getBoardView(noticeVO);
		model.addAttribute("result", boardView);
		
		List fileList = noticeService.boardFileDetail(noticeVO);
		model.addAttribute("fileList",fileList);
		
		model.addAttribute("IDX", idx);
		
		
		return "/usolver/admin/board/popNoticeView";
	}
	
	@RequestMapping(value="/admin/board/boardWrite.do")
	public String BoardWrite(@ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
		  //로그인 정보가 없는 경우.. : 모든 곳에 다 처리해 줘야하나? 흠.흠..
 	   /*if ( !EgovUserDetailsHelper.isAuthenticated()) {    		   
        	   return "forward:/accessDenied.do?type=nosession";
 	   }*/
 	   
 	  // LoginVO  user =(LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
	  // List<String> autorities = EgovUserDetailsHelper.getAuthorities();
	   
	    LoginVO  user = new LoginVO();
	    user.setUSER_ID("user");
	    user.setUSER_NAME("사용자");
				
	    model.addAttribute("result", user);
	    model.addAttribute("menu", "board");   
		return "/usolver/admin/board/boardWrite";
	}
	
		
	@RequestMapping(value="/admin/board/boardEdit.do")
	public String BoardEdit(@ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
		if( noticeVO.getIDX() != null ){
			
			LoginVO  user = new LoginVO();
		    user.setUSER_ID("user");
		    user.setUSER_NAME("사용자");
					
		    model.addAttribute("user", user);
		    
			NoticeVO boardEdit= noticeService.getBoardEdit(noticeVO);		
			model.addAttribute("result", boardEdit);
		
			List fileList = noticeService.boardFileDetail(noticeVO);
			model.addAttribute("fileList",fileList);
		
			model.addAttribute("FILE_COUNT", noticeService.boardFileCnt(noticeVO));
			
		}
		model.addAttribute("menu", "board");
		return "/usolver/admin/board/boardEdit";
	}
	
	@RequestMapping(value="/admin/board/boardUpdateProc.do")
	public String boardUpdateProc(@ModelAttribute NoticeVO noticeVO, 
		ModelMap model, HttpServletRequest request, HttpSession session) throws Exception {
		
		String resultMsg = "info.nodata.msg";		
		try {
			
			// 제목.내용 수정
			noticeService.editBoard(noticeVO);
			resultMsg = "success.common.update";
			
			System.out.println("###############  resultMsg ="+resultMsg);
			// 파일업로드
			uploadFile(noticeVO,"Board");
			// 파일삭제
			String FILE_NO = request.getParameter("REGSTR_MANAGE_NO");
			if (!FILE_NO.equals("")) {
				noticeVO.setFILE_NO(FILE_NO);
				noticeService.deleteFileBoard(noticeVO);
				//물리파일 삭제
				/*List boardFileList = noticeService.boardFileDetail(noticeVO);
				if (boardFileList != null && boardFileList.size() > 0) {
					for (int i = 0; i < boardFileList.size(); i++) {
						commonService.fileDelete("Board", ((NoticeVO)boardFileList.get(i)).getFILE_NAME());
					}	
				}*/
			}
			model.addAttribute("IDX", noticeVO.getIDX());
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		
/*		NoticeVO boardView = noticeService.getBoardView(noticeVO);
		model.addAttribute("result", boardView);
		
		model.addAttribute("resultMsg", egovMessageSource.getMessage(resultMsg));
		model.addAttribute("menu", "board");
		return "/usolver/admin/board/boardView";*/
		
		
        model.addAttribute("resultMsg",  egovMessageSource.getMessage(resultMsg));
   		return "forward:/admin/board/boardView.do?IDX="+noticeVO.getIDX();
   		
	}
	
	
	
}

