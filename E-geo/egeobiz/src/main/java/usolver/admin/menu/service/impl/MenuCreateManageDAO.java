package usolver.admin.menu.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import usolver.admin.menu.vo.MenuCreatVO;
import usolver.com.cmm.vo.AdmDefaultVO;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * 메뉴생성, 사이트맵 생성에 대한 DAO 클래스를 정의한다. * 
 * @author 공통컴포넌트 개발팀 서준식
 * @since 2011.06.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2011.06.30  서 준 식   최초 생성(MenuManageDAO 클래스로 부터 분리
 *   					   메소드들을 MenuManageDAO 클래스에서 분리해옮)
 *
 * </pre>
 */

@Repository("menuCreateManageDAO")
public class MenuCreateManageDAO extends EgovComAbstractDAO{
	
	
	
	/**
	 * ID 존재여부를 조회
	 * @param vo MenuManageVO 
	 * @return int 
	 * @exception Exception
	 */
	public int selectUsrByPk(AdmDefaultVO vo) throws Exception{
		return (Integer)selectByPk("menuManageDAO.selectUsrByPk", vo);  
	}
	
	/**
	 * ID에 대한 권한코드를 조회
	 * @param vo MenuCreatVO
	 * @return int 	 
	 * @exception Exception
	 */
	public MenuCreatVO selectAuthorByUsr(AdmDefaultVO vo) throws Exception{
		return (MenuCreatVO)getSqlMapClientTemplate().queryForObject("menuManageDAO.selectAuthorByUsr", vo);
	}
	
	/**
	 * 메뉴생성관리 내역을 조회
	 * @param vo AdmDefaultVO 
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuCreatManagList(AdmDefaultVO vo) throws Exception{
		return list("menuManageDAO.selectMenuCreatManageList_D", vo);
	}
	/**
	 * 기존 메뉴 기능목록을 조회
	 * @param vo AdmDefaultVO 
	 * @return List
	 * @exception Exception
	 */
	public List selectMenuFunctionList(MenuCreatVO vo) throws Exception{
		return list("menuManageDAO.selectMenuFunctionList_D", vo);
	}
	public List selectMenuFunctionList2(MenuCreatVO vo) throws Exception{
		return list("menuManageDAO.selectMenuFunctionList_D2", vo);
	}
	/**
	 * 메뉴생성관리 전체내역을 조회
	 * @param vo AdmDefaultVO 
	 * @return List
	 * @exception Exception
	 */
	public List selectAllMenuCreatManagList(AdmDefaultVO vo) throws Exception{
		return list("menuManageDAO.selectAllMenuCreatManageList_D", vo);
	}
	
	/**
	 * 메뉴생성관리 총건수를 조회한다.
	 * @param vo AdmDefaultVO 
	 * @return int 
	 * @exception Exception
	 */
    public int selectMenuCreatManagTotCnt(AdmDefaultVO vo) {
        return (Integer)getSqlMapClientTemplate().queryForObject("menuManageDAO.selectMenuCreatManageTotCnt_S", vo);
    }
    
    public int selectMenuCreatManagMultiTotCnt(HashMap<String, Object> paramMap) {
        return (Integer)getSqlMapClientTemplate().queryForObject("menuManageDAO.selectMenuCreatManageMultiTotCnt_S", paramMap);
    }
    /*********** 메뉴 생성 관리 ***************/
	/**
	 * 메뉴생성 내역을 조회
	 * @param vo MenuCreatVO
	 * @return List 
	 * @exception Exception
	 */
	public List selectMenuCreatList(MenuCreatVO vo) throws Exception{
		return list("menuManageDAO.selectMenuCreatList_D", vo);
	}
	/**
	 * 메뉴생성 전체내역을 조회
	 * @param vo MenuCreatVO
	 * @return List 
	 * @exception Exception
	 */
	public List selectAllMenuCreatList(AdmDefaultVO vo) throws Exception{
		return list("menuManageDAO.selectAllMenuCreatList_D", vo);
	}
	
	/**
	 * 메뉴생성내역 등록
	 * @param vo MenuCreatVO
	 * @exception Exception
	 */
	public void insertMenuCreat(MenuCreatVO vo){
		insert("menuManageDAO.insertMenuCreat_S", vo);
	}
	/**
	 * 권한 기능내역 리스트 등록
	 * @param vo MenuCreatVO
	 * @exception Exception
	 */
	public void insertMenuFunctionList(MenuCreatVO vo){
		insert("menuManageDAO.insertMenuFunctionList_S", vo);
	}
	public void insertMenuFunctionList2(MenuCreatVO vo){
		insert("menuManageDAO.insertMenuFunctionList_S2", vo);
	}

	/**
	 * 메뉴생성내역 존재여부 조회한다.
	 * @param vo MenuCreatVO
	 * @return int 
	 * @exception Exception
	 */
    public int selectMenuCreatCnt(MenuCreatVO vo) {
        return (Integer)getSqlMapClientTemplate().queryForObject("menuManageDAO.selectMenuCreatCnt_S", vo);
    }

    
	/**
	 * 메뉴생성내역 수정
	 * @param vo MenuCreatVO
	 * @exception Exception
	 */
	public void updateMenuCreat(MenuCreatVO vo){
		update("menuManageDAO.updateMenuCreat_S", vo);
	}


	/**
	 * 메뉴생성내역 삭제
	 * @param vo MenuCreatVO
	 * @exception Exception
	 */
	public void deleteMenuFunctionList(MenuCreatVO vo){
		delete("menuManageDAO.deleteMenuFunctionList_S", vo);
	}
	public void deleteMenuFunctionList2(MenuCreatVO vo){
		delete("menuManageDAO.deleteMenuFunctionList_S2", vo);
	}
}
