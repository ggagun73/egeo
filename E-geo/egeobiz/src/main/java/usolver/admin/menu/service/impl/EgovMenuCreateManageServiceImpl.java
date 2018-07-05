package usolver.admin.menu.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import usolver.admin.menu.service.EgovMenuCreateManageService;
import usolver.admin.menu.vo.MenuCreatVO;
import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.vo.AdmDefaultVO;
/**
 * 메뉴목록, 사이트맵 생성을 처리하는 비즈니스 구현 클래스를 정의한다.
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
 *   2011.07.01  서준식          EgovMenuManageServiceImpl에서 메뉴 생성 관련 부분 분리
 *   2011.10.07  이기하          finally문을 추가하여 에러시 자원반환할 수 있도록 추가
 *   2011.10.12  이기하			 사이트맵 생성시 특수문자 치환
 *
 *
 * </pre>
 */
@Service("meunCreateManageService")
public class EgovMenuCreateManageServiceImpl extends AbstractServiceImpl implements EgovMenuCreateManageService{

	protected Log log = LogFactory.getLog(this.getClass());

	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
	@Resource(name="menuCreateManageDAO")
    private MenuCreateManageDAO menuCreateManageDAO;

	/**
	 * ID 존재여부를 조회
	 * @param vo AdmDefaultVO
	 * @return int
	 * @exception Exception
	 */
    public int selectUsrByPk(AdmDefaultVO vo) throws Exception {
        //return menuCreateManageDAO.selectUsrByPk(vo);
        
        return commonMapper.getSelectCnt("admin.selectUsrByPk", vo);
	}

    /**
	 * 메뉴생성 내역을 조회
	 * @param  vo MenuCreatVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuCreatList(MenuCreatVO vo) throws Exception {
   		//return menuCreateManageDAO.selectMenuCreatList(vo);
   		
   		return commonMapper.getSelectList("admin.selectMenuCreatList_D", vo);
	}
	/**
	 * 메뉴생성 내역을 조회
	 * @param  vo MenuCreatVO
	 * @return List
	 * @exception Exception
	 */
	public List selectAllMenuCreatList(AdmDefaultVO vo) throws Exception {
   		//return menuCreateManageDAO.selectAllMenuCreatList(vo);
   		
   		return commonMapper.getSelectList("admin.selectAllMenuCreatList_D", vo);
	}

	/**
	 * 화면에 조회된 메뉴정보로 메뉴생성내역 데이터베이스에서 입력
	 * @param checkedAuthorForInsert  String
	 * @param checkedMenuNoForInsert String
	 * @exception Exception
	 */
	public void insertMenuCreatList(
			String checkedAuthorForInsert,
			String checkedMenuNoForInsert
			) throws Exception{
		MenuCreatVO menuCreatVO = null;
		int AuthorCnt    = 0;
		String [] insertMenuNo = checkedMenuNoForInsert.split(",");

		String     insertAuthor = checkedAuthorForInsert;
		menuCreatVO = new MenuCreatVO();
		menuCreatVO.setAuthorCode(insertAuthor);
		AuthorCnt = menuCreateManageDAO.selectMenuCreatCnt(menuCreatVO);

        // 이전에 존재하는 권한코드에 대한 메뉴설정내역 삭제
		if(AuthorCnt>0){
			menuCreateManageDAO.deleteMenuFunctionList(menuCreatVO);
		}
		for (int i=0; i<insertMenuNo.length ; i++){
			menuCreatVO.setAuthorCode(insertAuthor);
			menuCreatVO.setMenuNo(Integer.parseInt(insertMenuNo[i]));
			menuCreateManageDAO.insertMenuCreat(menuCreatVO);
		}
	}

	/**
	 * 메뉴생성관리 목록을 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuCreatManagList(AdmDefaultVO vo) throws Exception {
   		//return menuCreateManageDAO.selectMenuCreatManagList(vo);
   		
   		return commonMapper.getSelectList("admin.selectMenuCreatManageList_D", vo);
	}
	/**
	 * 기존 메뉴 기능목록을 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuFunctionList(MenuCreatVO vo) throws Exception {
		//return menuCreateManageDAO.selectMenuFunctionList(vo);
		
		return commonMapper.getSelectList("admin.selectMenuFunctionList_D", vo);
	}
	public List selectMenuFunctionList2(MenuCreatVO vo) throws Exception {
		//return menuCreateManageDAO.selectMenuFunctionList2(vo);
		
		return commonMapper.getSelectList("admin.selectMenuFunctionList_D2", vo);
	}
	/**
	 * 기존 메뉴 기능목록을 삭제
	 * @param vo AdmDefaultVO
	 * @exception Exception
	 */
	public int deleteMenuFunctionList(MenuCreatVO vo) throws Exception {
		//menuCreateManageDAO.deleteMenuFunctionList(vo);
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteMenuFunctionList_S", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	public int deleteMenuFunctionList2(MenuCreatVO vo) throws Exception {
		//menuCreateManageDAO.deleteMenuFunctionList2(vo);
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteMenuFunctionList_S2", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	/**
	 * 메뉴 기능목록을 수정(추가)
	 * @param vo AdmDefaultVO
	 * @exception Exception
	 */
	public int insertMenuFunctionList(MenuCreatVO vo) throws Exception {
		//menuCreateManageDAO.insertMenuFunctionList(vo);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertMenuFunctionList_S", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	public int insertMenuFunctionList2(MenuCreatVO vo) throws Exception {
		//menuCreateManageDAO.insertMenuFunctionList2(vo);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertMenuFunctionList_S2", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	/**
	 * 메뉴생성관리 전체목록을 조회
	 * @param vo AdmDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectAllMenuCreatManagList(AdmDefaultVO vo) throws Exception {
   		//return menuCreateManageDAO.selectAllMenuCreatManagList(vo);
   		
   		return commonMapper.getSelectList("admin.selectAllMenuCreatManageList_D", vo);
	}
	/**
	 * ID에 대한 권한코드를 조회
	 * @param vo AdmDefaultVO
	 * @return MenuCreatVO
	 * @exception Exception
	 */
	public MenuCreatVO selectAuthorByUsr(AdmDefaultVO vo) throws Exception{
        //return menuCreateManageDAO.selectAuthorByUsr(vo);
        
        return (MenuCreatVO) commonMapper.selectByPk("admin.selectAuthorByUsr", vo);
	}


	/**
	 * 메뉴생성관리 총건수를 조회한다.
	 * @param vo AdmDefaultVO
	 * @return int
	 * @exception Exception
	 */
    public int selectMenuCreatManagTotCnt(AdmDefaultVO vo) throws Exception {
        //return menuCreateManageDAO.selectMenuCreatManagTotCnt(vo);
        
        return commonMapper.getSelectCnt("admin.selectMenuCreatManageTotCnt_S", vo);
	}
    	
}