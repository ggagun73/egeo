package usolver.admin.menu.service;

import java.util.List;

import usolver.admin.menu.vo.MenuCreatVO;
import usolver.com.cmm.vo.AdmDefaultVO;


/** 
 * 메뉴관리에 관한 서비스 인터페이스 클래스를 정의한다.
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
 *
 * </pre>
 */
public interface EgovMenuCreateManageService {
	
	/**
	 * ID 존재여부를 조회
	 * @param vo AdmDefaultVO
	 * @return int 
	 * @exception Exception
	 */
	public int selectUsrByPk(AdmDefaultVO vo) throws Exception;
	
	/**
	 * ID에 대한 권한코드를 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public MenuCreatVO selectAuthorByUsr(AdmDefaultVO vo) throws Exception;
	
	
	/**
	 * 메뉴생성관리 목록을 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuCreatManagList(AdmDefaultVO vo) throws Exception;
	/**
	 * 메뉴생성관리 목록을 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuFunctionList(MenuCreatVO vo) throws Exception;
	public List selectMenuFunctionList2(MenuCreatVO vo) throws Exception;
	/**
	 * 메뉴생성관리 전체목록을 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectAllMenuCreatManagList(AdmDefaultVO vo) throws Exception;
	/**
	 * 메뉴생성관리 총건수를 조회한다.
	 * @param vo AdmDefaultVO
	 * @return int 
	 * @exception Exception
	 */
	public int selectMenuCreatManagTotCnt(AdmDefaultVO vo) throws Exception;
	/**
	 * 메뉴생성 내역을 조회
	 * @param  vo MenuCreatVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuCreatList(MenuCreatVO vo) throws Exception;
	/**
	 * 메뉴생성 전체내역을 조회
	 * @return List
	 * @exception Exception
	 */
	public List selectAllMenuCreatList(AdmDefaultVO vo) throws Exception;
	/**
	 * 기존 메뉴 기능목록을 삭제
	 * @exception Exception
	 */
	public int deleteMenuFunctionList(MenuCreatVO vo) throws Exception;
	public int deleteMenuFunctionList2(MenuCreatVO vo) throws Exception;
	/**
	 * 기존 메뉴 기능목록을 수정(추가)
	 * @exception Exception
	 */
	public int insertMenuFunctionList(MenuCreatVO vo) throws Exception;
	public int insertMenuFunctionList2(MenuCreatVO vo) throws Exception;
	
	/**
	 * 화면에 조회된 메뉴정보로 메뉴생성내역 데이터베이스에서 입력
	 * @param checkedScrtyForInsert String
	 * @param checkedMenuNoForInsert String
	 * @exception Exception
	 */
	public void insertMenuCreatList(String checkedScrtyForInsert, String checkedMenuNoForInsert) throws Exception;

	
}
