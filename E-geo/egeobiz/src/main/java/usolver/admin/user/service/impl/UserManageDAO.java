package usolver.admin.user.service.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import usolver.admin.menu.vo.MenuCreatVO;
import usolver.admin.user.vo.UserDataVO;
import usolver.admin.user.vo.UserDefaultVO;
import usolver.admin.user.vo.UserManageVO;

/**
 * 사용자관리에 관한 데이터 접근 클래스를 정의한다.
 * @author 공통서비스 개발팀 조재영
 * @since 2009.04.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.10  조재영          최초 생성
 *
 * </pre>
 */
@Repository("userManageDAO")
public class UserManageDAO extends EgovComAbstractDAO{
	
    /** Log Info */
    protected Log log = LogFactory.getLog(this.getClass());

    /**
     * 입력한 사용자아이디의 중복여부를 체크하여 사용가능여부를 확인
     * @param checkId 중복체크대상 아이디
     * @return int 사용가능여부(아이디 사용회수 )
     */
    public int checkIdDplct(String sUserId){
        return (Integer)getSqlMapClientTemplate().queryForObject("userManageDAO.checkIdDplct_S", sUserId);
    }

    /**
     * 화면에 조회된 사용자의 정보를 데이터베이스에서 삭제
     * @param delId 삭제대상 업무사용자 아이디
     */
    public void deleteUser(String delId){
        delete("userManageDAO.deleteUser_S", delId);
    }

    
    /**
     * 사용자의 기본정보를 화면에서 입력하여 항목의 정합성을 체크하고 데이터베이스에 저장
     * @param userManageVO 업무사용자 등록정보
     * @return String result 등록결과 
     */
    public String insertUser(UserManageVO userManageVO){
        return (String)insert("userManageDAO.insertUser_S", userManageVO);
    }

    /**
     * 기 등록된 사용자 중 검색조건에 맞는 사용자들의 정보를 데이터베이스에서 읽어와 화면에 출력
     * @param uniqId 상세조회대상 업무사용자아이디
     * @return UserManageVO 업무사용자  상세정보
     */
    public UserManageVO selectUser(String uniqId){
        return (UserManageVO) selectByPk("userManageDAO.selectUser_S", uniqId);
    }

    /**
     * 기 등록된 특정 사용자의 정보를 데이터베이스에서 읽어와 화면에 출력
     * @param userSearchVO 검색조건
     * @return List 업무사용자 목록정보
     */
    public List selectUserList(UserDefaultVO userSearchVO){
        return list("userManageDAO.selectUserList_S", userSearchVO);
    }
    
    /**
     * 사용자총 갯수를 조회한다.
     * @param userSearchVO 검색조건
     * @return int 업무사용자 총갯수
     */
    public int selectUserListTotCnt(UserDefaultVO userSearchVO) {
        return (Integer)getSqlMapClientTemplate().queryForObject("userManageDAO.selectUserListTotCnt_S", userSearchVO);
    }

    /**
     * 화면에 조회된 사용자의 기본정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
     * @param userManageVO 업무사용자 수정정보
     */
    public void updateUser(UserManageVO userManageVO){
        update("userManageDAO.updateUser_S",userManageVO);
    }

    /**
     * 사용자정보 수정시 히스토리 정보를 추가
     * @param userManageVO 업무사용자 히스토리 정보
     * @return String 히스토리 등록결과
     */
    public String insertUserHistory(UserManageVO userManageVO){
    	return (String)insert("userManageDAO.insertUserHistory_S", userManageVO);
    }
    
    /**
     * 업무사용자 암호수정
     * @param passVO 업무사용자수정정보(비밀번호)
     */
    public void updatePassword(UserManageVO passVO) {
        update("userManageDAO.updatePassword_S", passVO);
    }
    
    /**
     * 업무사용자가 비밀번호를 기억하지 못할 때 비밀번호를 찾을 수 있도록 함
     * @param userManageVO 업무 사용자암호 조회조건정보
     * @return UserManageVO 업무사용자 암호정보
     */
    public UserManageVO selectPassword(UserManageVO userManageVO){
    	return (UserManageVO) selectByPk("userManageDAO.selectPassword_S", userManageVO);
    }
    
    /**
	 * 사용자 메뉴생성 내역을 조회
	 * @param userSearchVO UserDefaultVO
	 * @return List 
	 * @exception Exception
	 */
	public List selectAllUserList(UserDefaultVO userSearchVO) throws Exception{
		return list("userManageDAO.selectAllUserList_S", userSearchVO);
	}
	
	/**
     * 사용자총 갯수를 조회한다.
     * @return int 사용자 총갯수
     */
    public int selectAllUserListTotCnt(UserDefaultVO userSearchVO) {
        return (Integer)getSqlMapClientTemplate().queryForObject("userManageDAO.selectAllUserListTotCnt_S", userSearchVO);
    }
    
    /**
	 * 기존 데이터 기능목록을 조회
	 * @param  userSearchVO UserDefaultVO
	 * @return List
	 * @throws Exception
	 */
	public List selectUserFunctionList(UserManageVO userVO) throws Exception{
		return list("userManageDAO.selectUserFunctionList_S", userVO);
	}
	
	/**
	 * 데이터 생성내역 삭제
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public void deleteDataFunctionList(UserDataVO userDataVO){
		delete("userManageDAO.deleteDataFunctionList_S", userDataVO);
	}
	
	/**
	 * 데이터 기능목록을 수정(추가)
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public void insertDataFunctionList(UserDataVO userDataVO){
		insert("userManageDAO.insertDataFunctionList_S", userDataVO);
	}
	
	/**
	 * 기존 메뉴 기능목록을 조회
	 * @param UserDataVO userDataVO 
	 * @return List
	 * @exception Exception
	 */
	public List selectUserMenuFunctionList(UserDataVO userDataVO) throws Exception{
		return list("userManageDAO.selectUserMenuFunctionList_D", userDataVO);
	}
	
	/**
	 * 메뉴생성내역 삭제
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public void deleteUserMenuFunctionList(UserDataVO userDataVO){
		delete("userManageDAO.deleteUserMenuFunctionList_S", userDataVO);
	}
	
	/**
	 * 메뉴생성내역 삭제
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public void deleteAllUserMenu(UserDataVO userDataVO){
		delete("userManageDAO.deleteAllUserMenu", userDataVO);
	}
	
	/**
	 * 권한 기능내역 리스트 등록
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public void insertUserMenuFunctionList(UserDataVO userDataVO){
		insert("userManageDAO.insertUserMenuFunctionList_S", userDataVO);
	}
}