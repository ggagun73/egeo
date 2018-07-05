package usolver.admin.menu.service.impl;

import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import usolver.admin.author.service.impl.AuthorManageDAO;
import usolver.admin.author.vo.AuthorManage;
import usolver.admin.menu.service.EgovMenuManageService;
import usolver.admin.menu.vo.MenuManageVO;
import usolver.admin.program.service.EgovProgrmManageService;
import usolver.admin.program.service.impl.ProgrmManageDAO;
import usolver.admin.program.vo.ProgrmManage;
import usolver.admin.user.service.impl.UserManageDAO;
import usolver.admin.user.vo.UserDataVO;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.com.cmm.ComDefaultVO;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.excel.EgovExcelService;

/** 
 * 메뉴목록관리, 생성, 사이트맵을 처리하는 비즈니스 구현 클래스를 정의한다.
 * @author 개발환경 개발팀 이용
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.20  이  용          최초 생성
 *   2011.07.01  서준식			자기 메뉴 정보를 상위메뉴 정보로 참조하는 메뉴정보가 있는지 조회하는 
 *   							selectUpperMenuNoByPk() 메서드 추가   
 *
 * </pre>
 */

@Service("meunManageService")
public class EgovMenuManageServiceImpl extends AbstractServiceImpl implements EgovMenuManageService{

	protected Log log = LogFactory.getLog(this.getClass());
	
	@Resource(name="menuManageDAO")
    private MenuManageDAO menuManageDAO;
	@Resource(name="progrmManageDAO")
    private ProgrmManageDAO progrmManageDAO;

	
	@Resource(name="progrmManageService")
    private EgovProgrmManageService progrmManageService;
	

	@Resource(name="authorManageDAO")
    private AuthorManageDAO authorManageDAO;
	@Resource(name="userManageDAO")
	private UserManageDAO userManageDAO;
	

	@Resource(name = "excelZipService")
    private EgovExcelService excelZipService;
	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
	@Resource(name = "multipartResolver")
	CommonsMultipartResolver mailmultipartResolver;
	/**
	 * 메뉴 상세정보를 조회
	 * @param vo ComDefaultVO
	 * @return MenuManageVO
	 * @exception Exception
	 */
	public MenuManageVO selectMenuManage(ComDefaultVO vo) throws Exception{
        //return menuManageDAO.selectMenuManage(vo);
        return (MenuManageVO)commonMapper.selectByPk("admin.selectMenuManage", vo);
	}

	/**
	 * 메뉴 목록을 조회
	 * @param vo ComDefaultVO 
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuManageList(ComDefaultVO vo) throws Exception {
   		//return menuManageDAO.selectMenuManageList(vo);
   		return commonMapper.getSelectList("admin.selectMenuManageList", vo);
	}
	
	/**
	 * 메뉴목록 총건수를 조회한다.
	 * @param vo ComDefaultVO 
	 * @return int
	 * @exception Exception
	 */
    public int selectMenuManageListTotCnt(ComDefaultVO vo) throws Exception {
        //return menuManageDAO.selectMenuManageListTotCnt(vo);
        return commonMapper.getSelectCnt("admin.selectMenuManageListTotCnt", vo);
	}
    
    
    public int selectMenuListTotCnt(MenuManageVO vo) throws Exception {
         return commonMapper.getSelectCnt("admin.selectMainMenuCnt", vo);
 	}
    
	/**
	 * 메뉴번호를 상위메뉴로 참조하고 있는 메뉴 존재여부를 조회
	 * @param vo ComDefaultVO 
	 * @return int
	 * @exception Exception
	 */
    public int selectUpperMenuNoByPk(MenuManageVO vo) throws Exception {
       // return menuManageDAO.selectUpperMenuNoByPk(vo);
        return commonMapper.getSelectCnt("admin.selectUpperMenuNoByPk", vo);
	}
    
    
    /**
	 * 메뉴번호 존재 여부를 조회한다.
	 * @param vo ComDefaultVO 
	 * @return int
	 * @exception Exception
	 */
    public int selectMenuNoByPk(MenuManageVO vo) throws Exception {
        //return menuManageDAO.selectMenuNoByPk(vo);
        return commonMapper.getSelectCnt("admin.selectMenuNoByPk", vo);
	}
    
	/**
	 * 메뉴 정보를 등록
	 * @param vo MenuManageVO
	 * @exception Exception
	 */
	public void insertMenuManage(MenuManageVO vo) throws Exception {
		//menuManageDAO.insertMenuManage(vo);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertMenuManage", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	/**
	 * 메뉴 정보를 수정
	 * @param vo MenuManageVO 
	 * @exception Exception
	 */
	public void updateMenuManage(MenuManageVO vo) throws Exception {
		//menuManageDAO.updateMenuManage(vo);
		
		int result = 0;

    	try {
			result = commonMapper.update("admin.updateMenuManage", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	/**
	 * 메뉴 정보를 삭제
	 * @param vo MenuManageVO
	 * @exception Exception
	 */
	public void deleteMenuManage(MenuManageVO vo) throws Exception {
		//menuManageDAO.deleteMenuManage(vo);
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteMenuManage", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	/**
	 * 화면에 조회된 메뉴 목록 정보를 데이터베이스에서 삭제
	 * @param checkedMenuNoForDel String
	 * @exception Exception
	 */
	public void deleteMenuManageList(String checkedMenuNoForDel) throws Exception {
		MenuManageVO vo = null;

		String [] delMenuNo = checkedMenuNoForDel.split(",");

		if (delMenuNo == null || (delMenuNo.length ==0)){ throw new java.lang.Exception("String Split Error!"); }
        for (int i=0; i<delMenuNo.length ; i++){
			vo = new MenuManageVO();
			vo.setMenuNo(Integer.parseInt(delMenuNo[i]));
			int result = commonMapper.delete("admin.deleteMenuManage", vo);
		}
	}

	
	/*  메뉴 생성 관리  */
	
	/**
	 * 메뉴 목록을 조회
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuList() throws Exception {
   		//return menuManageDAO.selectMenuList();
		return commonMapper.getSelectList("admin.selectMenuListT", null);
	}

	/**
	 * 신규 메뉴번호를 조회
	 * @return int
	 * @exception Exception
	 */
	public int selectNewMenuNo() throws Exception {
   		//return menuManageDAO.selectNewMenuNo();
		ComDefaultVO vo  = new ComDefaultVO();
		return (Integer)commonMapper.selectByPk("admin.selectNewMenuNo", vo);
	}
	
    
	/*### 메뉴관련 프로세스 ###*/
	/**
	 * MainMenu Head Menu 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMainMenuHead(MenuManageVO vo) throws Exception {
   		//return menuManageDAO.selectMainMenuHead(vo);
		
		return commonMapper.getSelectList("admin.selectMainMenuHead", vo);
	}	
	
	public List selectMainMenu(HashMap<String, Object> paramMap) throws Exception {
   		//return menuManageDAO.selectMainMenu(paramMap);
		
		return commonMapper.getSelectList("admin.selectMainMenu", paramMap);
	}
	/**
	 * MainMenu Head Left 조회
	 * @param vo MenuManageVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMainMenuLeft(MenuManageVO vo) throws Exception {
   		//return menuManageDAO.selectMainMenuLeft(vo);
		
		return commonMapper.getSelectList("admin.selectMainMenuLeft", vo);
	}

	/**
	 * MainMenu Head MenuURL 조회
	 * @param  iMenuNo  int
	 * @param  sUniqId  String
	 * @return String
	 * @exception Exception
	 */
	public String selectLastMenuURL(int iMenuNo, String sUniqId) throws Exception {
		MenuManageVO vo = new MenuManageVO();
		vo.setMenuNo(selectLastMenuNo(iMenuNo, sUniqId)) ;
   		//return menuManageDAO.selectLastMenuURL(vo);
		
		return (String)commonMapper.selectByPk("admin.selectLastMenuURL", vo);
	}
	
	/**
	 * MainMenu Head Menu MenuNo 조회
	 * @param  iMenuNo  int
	 * @param  sUniqId  String
	 * @return String
	 * @exception Exception
	 */
	private int selectLastMenuNo(int iMenuNo, String sUniqId) throws Exception {
		int chkMenuNo = iMenuNo;
		int cntMenuNo = 0;
		for(;chkMenuNo > -1;){
			chkMenuNo = selectLastMenuNoChk(chkMenuNo, sUniqId);
			if(chkMenuNo > 0){
				cntMenuNo = chkMenuNo;
			}
		}
   		return cntMenuNo;
	}
	
	/**
	 * MainMenu Head Menu Last MenuNo 조회
	 * @param  iMenuNo  int
	 * @param  sUniqId  String
	 * @return String
	 * @exception Exception
	 */
	private int selectLastMenuNoChk(int iMenuNo, String sUniqId) throws Exception {
		MenuManageVO vo = new MenuManageVO();
		vo.setMenuNo(iMenuNo);
		vo.setTempValue(sUniqId) ;
		int chkMenuNo = 0;
		int cntMenuNo = 0;
		//cntMenuNo = menuManageDAO.selectLastMenuNoCnt(vo);
		cntMenuNo = (Integer)commonMapper.selectByPk("admin.selectLastMenuNoCnt", vo);
		
		if(cntMenuNo>0){
			//chkMenuNo = menuManageDAO.selectLastMenuNo(vo);
			chkMenuNo = (Integer)commonMapper.selectByPk("admin.selectLastMenuNo", vo);
		}else{
			chkMenuNo = -1; 
		}
		return  chkMenuNo;
	}

/*### 일괄처리 프로세스 ###*/
	/**
	 * 메뉴일괄초기화 프로세스 메뉴목록테이블, 프로그램 목록테이블 전체 삭제
	 * @return boolean
	 * @exception Exception
	 */
	public boolean menuBndeAllDelete() throws Exception {
       	if(!deleteAllMenuList()){return false;}   // 메뉴정보 테이블
       	if(!deleteAllAuthorMenuList()){return false;}   // 권한별 메뉴정보 테이블
       	if(!deleteAllUserMenuList()){return false;}   // 사용자별 메뉴정보 테이블
       	if(!deleteAllProgrm()){return false;}     // 프로그램목록 테이블
       	return true;
	}
	
	/** 
	 * 메뉴일괄등록 프로세스
	 * @param  vo MenuManageVO  
	 * @param  inputStream InputStream  
	 * @exception Exception
	 */
	public String menuBndeRegist(MenuManageVO vo, InputStream inputStream) throws Exception {
		
	   String message = bndeRegist(inputStream);
	   String sMessage = null;
	   
	   switch(Integer.parseInt(message))
	   {
	    case 99: 
	    	log.debug("프로그램목록/메뉴정보테이블 데이타 존재오류 - 초기화 하신 후 다시 처리하세요.");
	    	sMessage = "프로그램목록/메뉴정보테이블 데이타 존재오류 - 초기화 하신 후 다시 처리하세요.";
	     break;
	    case 90: 
	    	log.debug("파일존재하지 않음.");
	    	sMessage = "파일존재하지 않음.";
	     break;
	    case 91: 
	    	log.debug("프로그램시트의 cell 갯수 오류.");
	    	sMessage = "프로그램시트의 cell 갯수 오류.";
	     break;
	    case 92: 
	    	log.debug("메뉴정보시트의 cell 갯수 오류.");
	    	sMessage = "메뉴정보시트의 cell 갯수 오류.";
	     break;
	    case 93: 
	    	log.debug("엑셀 시트갯수 오류.");
	    	sMessage = "엑셀 시트갯수 오류.";
	     break;
	    case 95: 
	    	log.debug("메뉴정보 입력시 에러.");
	    	sMessage = "메뉴정보 입력시 에러.";
	     break;
	    case 96: 
	    	log.debug("프로그램목록입력시 에러.");
	    	sMessage = "프로그램목록입력시 에러.";
	     break;
	    default: 
	    	log.debug("일괄배치처리 완료.");
	    sMessage = "일괄배치처리 완료.";
	     break;
	   }
	   log.debug(message);
	   return sMessage;
	}

	/**
	 * 메뉴목록_프로그램목록 일괄생성
	 * @param  inputStream InputStream
	 * @return  String
	 * @exception Exception
	 */
	private String bndeRegist(InputStream inputStream)throws Exception{
		boolean success = false;
		String  requestValue = null;
	    char FILE_SEPARATOR     = File.separatorChar;
	    int progrmSheetRowCnt = 0;
	    int menuSheetRowCnt   = 0;
	    String xlsFile = null;
	    try {  
	    	/*
	    	오류 메세지 정보
	    	message = "99";	//프로그램목록테이블 데이타 존재오류.
	    	message = "99";	//메뉴정보테이블 데이타 존재오류.
	    	message = "90";	//파일존재하지 않음.
	    	message = "91";	//프로그램시트의 cell 갯수 오류
	    	message = "92";	//메뉴정보시트의 cell 갯수 오류
	    	message = "93";	//엑셀 시트갯수 오류
	    	message = "95";	//메뉴정보 입력시 에러
	    	message = "96";	//프로그램목록입력시 에러
	    	message = "0";	//일괄배치처리 완료
	    	*/

	    	//if(progrmManageDAO.selectProgrmListTotCnt()>0){ return requestValue = "99";} //프로그램목록테이블 데이타 존재오류.
	    	ProgrmManage vo = new ProgrmManage();
	    	if((Integer)commonMapper.getSelectCnt("admin.selectProgrmListTotCnt", vo)>0){ return requestValue = "99";} //프로그램목록테이블 데이타 존재오류.
	    	//if(menuManageDAO.selectMenuListTotCnt()>0){ return requestValue = "99";} //메뉴정보테이블 데이타 존재오류.
	    	if((Integer)commonMapper.getSelectCnt("admin.selectMenuListTotCnt", vo)>0){ return requestValue = "99";} //메뉴정보테이블 데이타 존재오류.

	    	HSSFWorkbook hssfWB = excelZipService.loadWorkbook(inputStream);
            // 엑셀 파일 시트 갯수 확인 sheet = 2  첫번째시트 = 프로그램목록  두번째시트 = 메뉴목록
            if(hssfWB.getNumberOfSheets()== 2)
            {
                HSSFSheet progrmSheet= hssfWB.getSheetAt(0);  //프로그램목록 시트 가져오기
                HSSFSheet menuSheet  = hssfWB.getSheetAt(1);  //메뉴정보 시트 가져오기
                HSSFRow   progrmRow  = progrmSheet.getRow(1); //프로그램 row 가져오기
                HSSFRow   menuRow    = menuSheet.getRow(1);   //메뉴정보 row 가져오기
                progrmSheetRowCnt    = progrmRow.getPhysicalNumberOfCells(); //프로그램 cell Cnt
                menuSheetRowCnt      = menuRow.getPhysicalNumberOfCells();   //메뉴정보 cell Cnt
                
                // 프로그램 시트 파일 데이타 검증 cell = 5개
                if(progrmSheetRowCnt != 5){
                	return requestValue = "91"; //프로그램시트의 cell 갯수 오류
                }
                
                // 메뉴목록 시트 파일 데이타 검증  cell = 8개
                if(menuSheetRowCnt   != 16){
                	return requestValue = "92"; //메뉴정보시트의 cell 갯수 오류                	
                }
                
                /* sheet1번 = 프로그램목록 ,  sheet2번 = 메뉴정보 */
                success = progrmRegist(progrmSheet);
                if(success){
                	success = menuRegist(menuSheet);
                	if(success){
                		return requestValue = "0"; // 일괄배치처리 완료
                	}else{
                		deleteAllProgrm();
                		deleteAllMenuList();
                		return requestValue = "95"; // 메뉴정보 입력시 에러
                	}
                }else{
                	deleteAllProgrm();
                	return requestValue = "96"; // 프로그램목록입력시 에러
                }
            }
            else{
            	return requestValue = "93"; // 엑셀 시트갯수 오류
            }

        }catch(Exception e){
        	log.error("Exception:  "  +  e.getClass().getName());  
        	log.error("Exception  Message:  "  +  e.getMessage()); 
        }   
		return  requestValue ;   
	}

	/**
	 * 프로그램목록 일괄등록
	 * @param  progrmSheet HSSFSheet 
	 * @return  boolean
	 * @exception Exception
	 */
	private boolean progrmRegist(HSSFSheet progrmSheet)throws Exception{
        int count=0;
		boolean success = false;
		try {
            int rows=progrmSheet.getPhysicalNumberOfRows(); //행 갯수 가져오기
            for(int j=1; j<rows; j++){ //row 루프
            	ProgrmManage vo = new ProgrmManage();
                HSSFRow row=progrmSheet.getRow(j); //row 가져오기
                if(row!=null){
                    int cells=row.getPhysicalNumberOfCells(); //cell 갯수 가져오기
                    
                    HSSFCell cell = null;
                	cell = row.getCell(0);  //프로그램명
                	if(cell!=null){
                       vo.setProgrmFileNm(""+cell.getStringCellValue());
                	}
                	cell = row.getCell(1); //프로그램저장경로
                	if(cell!=null){
                		vo.setProgrmStrePath(""+cell.getStringCellValue());
                	}
                    cell = row.getCell(2); //프로그램한글명
                    if(cell!=null){
                       vo.setProgrmKoreanNm(""+cell.getStringCellValue());
                	} 
                    cell = row.getCell(3); //프로그램설명
                    if(cell!=null){
                    	vo.setProgrmDc(""+cell.getStringCellValue());  
                    }
                    cell = row.getCell(4); //프로그램 URL
                    if(cell!=null){
                        vo.setURL(""+cell.getStringCellValue());                        
                    }
                }
                if(insertProgrm(vo)){count++;}
            }
            if(count==rows-1){
                success = true;
            }else{
            	success = false;
            }
		}catch(Exception e){
			log.error("Exception:  "  +  e.getClass().getName());  
			log.error("Exception  Message:  "  +  e.getMessage());
        }
		return success;
	}
	
	/**
	 * 메뉴정보 일괄등록
	 * @param menuSheet HSSFSheet
	 * @return boolean
	 * @exception Exception
	 */
	private boolean menuRegist(HSSFSheet menuSheet)throws Exception{
		boolean success = false;
		int count=0;
		try {
            int rows=menuSheet.getPhysicalNumberOfRows(); //행 갯수 가져오기
            for(int j=1; j<rows; j++){ //row 루프
            	MenuManageVO vo = new MenuManageVO();
                HSSFRow row=menuSheet.getRow(j); //row 가져오기
                if(row!=null){
                    int cells=row.getPhysicalNumberOfCells(); //cell 갯수 가져오기
                    HSSFCell cell = null;
                    
                    cell = row.getCell(0); //메뉴명
                    if(cell!=null){
                        vo.setMenuNm(""+cell.getStringCellValue());
                    }
                    cell = row.getCell(1); //메뉴순서
                    if(cell!=null){
                		Double doubleCell = new Double(cell.getNumericCellValue());
                        vo.setMenuOrdr(Integer.parseInt(""+doubleCell.longValue()));
                	} 
                	cell = row.getCell(2);  //메뉴번호
                	if(cell!=null){
                		Double doubleCell = new Double(cell.getNumericCellValue());
                        vo.setMenuNo(Integer.parseInt(""+doubleCell.longValue()));
                	}
                	cell = row.getCell(3); //메뉴아이디
                    vo.setMenuId(""+cell.getStringCellValue());
                    
                    cell = row.getCell(4); //메뉴설명
                    vo.setMenuDc(""+cell.getStringCellValue());  
                    
                    cell = row.getCell(5); //메뉴종류
                    vo.setMenuType(""+cell.getStringCellValue());
                    
                    cell = row.getCell(6); //창넓이
                    Double doubleCell = new Double(cell.getNumericCellValue());
                    vo.setWidth(""+doubleCell.longValue());
                	
                    cell = row.getCell(7); //창높이
                    doubleCell = new Double(cell.getNumericCellValue());
                    vo.setHeight(""+doubleCell.longValue());
                	
                    cell = row.getCell(8); //삽입창높이
                    doubleCell = new Double(cell.getNumericCellValue());
                    vo.setInsertHeight(""+doubleCell.longValue());
                	
                    cell = row.getCell(9); //콜백
                    vo.setCall(""+cell.getStringCellValue());  
                    
                    cell = row.getCell(10); //키칼럼
                    vo.setKeyColumn(""+cell.getStringCellValue());  
                    
                    cell = row.getCell(11); //상위메뉴번호
                    doubleCell = new Double(cell.getNumericCellValue());
                    vo.setUpperMenuNo(Integer.parseInt(""+doubleCell.longValue()));                        
                    
                    cell = row.getCell(12); //관련이미지경로
                    vo.setRelateImagePath(""+cell.getStringCellValue());  
                    
                    cell = row.getCell(13); //관련이미지명
                    vo.setRelateImageNm(""+cell.getStringCellValue());  
                    
                    cell = row.getCell(14); //기능목록
                    vo.setFunctionList(""+cell.getStringCellValue());  
                    
                    cell = row.getCell(15); //프로그램파일명
                    if(cell!=null){
                        vo.setProgrmFileNm(""+cell.getStringCellValue());  
                    }
                }
                if(insertMenuManageBind(vo)){count++;}
            }
            if(count==rows-1){
                success = true;
            }else{
            	success = false;
            }
		}catch(Exception e){
			log.error("Exception:  "  +  e.getClass().getName());  
			log.error("Exception  Message:  "  +  e.getMessage()); 
        }
		return success;
	}

	/**
	 * 메뉴정보 전체데이타 초기화
	 * @return boolean
	 * @exception Exception
	 */
	private boolean deleteAllMenuList() throws Exception {
		//return menuManageDAO.deleteAllMenuList();
		MenuManageVO vo = new MenuManageVO();
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteAllMenuList", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
		
		return true;
	}

	/**
	 * 프로그램 정보를 등록
	 * @param  vo ProgrmManageVO
	 * @return boolean
	 * @exception Exception
	 */
	private boolean insertProgrm(ProgrmManage vo) throws Exception {
		//progrmManageDAO.insertProgrm(vo);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertProgrm", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}

    	return true;
	}

	/**
	 * 메뉴정보를 일괄 등록
	 * @param  vo MenuManageVO 
	 * @return boolean
	 * @exception Exception
	 */
	private boolean insertMenuManageBind(MenuManageVO vo) throws Exception {
		//menuManageDAO.insertMenuManage(vo);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertMenuManage", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return true;
	}
	
	/**
	 * 프로그램 정보 전체데이타 초기화
	 * @return boolean
	 * @exception Exception
	 */
	private boolean deleteAllProgrm() throws Exception {
		//progrmManageDAO.deleteAllProgrm();
		
		ProgrmManage vo = new ProgrmManage();
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteAllProgrm", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
		return true;
	}
	
	/**
	 * 사용자별 메뉴정보 전체삭제 초기화
	 * @return boolean
	 * @exception Exception
	 */
	private boolean deleteAllUserMenuList() throws Exception {
		UserDataVO userDataVO = new UserDataVO();
		try {
			commonMapper.delete("admin.deleteAllUserMenu", userDataVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return true;
	}
	
	/**
	 * 권한별 메뉴정보 전체삭제 초기화
	 * @return boolean
	 * @exception Exception
	 */
	private boolean deleteAllAuthorMenuList() throws Exception {
		AuthorManage authorManage = new AuthorManage();
		try {
			commonMapper.delete("admin.deleteAllAuthor", authorManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
		
		return true;
	}
}