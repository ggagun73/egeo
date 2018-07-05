package usolver.admin.user.service;

import java.util.List;

import egovframework.com.cmm.ComDefaultVO;
import usolver.admin.menu.vo.MenuCreatVO;
import usolver.admin.user.vo.UserDataVO;
import usolver.admin.user.vo.UserDefaultVO;
import usolver.admin.user.vo.UserManageVO;

/**
 * 사용자관리에 관한 인터페이스클래스를 정의한다.
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
public interface EgovUserManageService  {
	
	/**
	 * 입력한 사용자아이디의 중복여부를 체크하여 사용가능여부를 확인
	 * @param checkId 중복여부 확인대상 아이디
	 * @return 사용가능여부(아이디 사용회수 int)
	 * @throws Exception
	 */
	public int checkIdDplct(String checkId) throws Exception;
	
	/**
	 * 화면에 조회된 사용자의 정보를 데이터베이스에서 삭제
	 * @param checkedIdForDel 삭제대상 업무사용자아이디
	 * @throws Exception
	 */
	public int deleteUser(String checkedIdForDel) throws Exception;
	
	/**
	 * @param userManageVO 업무사용자 등록정보
	 * @return result 등록결과
	 * @throws Exception
	 */
	public int insertUser(UserManageVO userManageVO) throws Exception;
	
	/**
	 * 기 등록된 사용자 중 검색조건에 맞는 사용자의 정보를 데이터베이스에서 읽어와 화면에 출력
	 * @param emplyrId 상세조회대상 업무사용자 아이디
	 * @return userManageVO 업무사용자 상세정보
	 * @throws Exception
	 */
	public UserManageVO selectUser(String uniqId) throws Exception;
	
	/**
	 * 기 등록된 특정 사용자의 정보를 데이터베이스에서 읽어와 화면에 출력
	 * @param userSearchVO 검색조건
	 * @return List<UserManageVO> 업무사용자 목록정보
	 * @throws Exception
	 */
	public List selectUserList(UserDefaultVO userSearchVO) throws Exception;
	
	/**
	 * 기 등록된 특정 사용자목록의 전체수를 확인
	 * @param userSearchVO 검색조건
	 * @return 총사용자갯수(int)
	 * @throws Exception
	 */
	public int selectUserListTotCnt(UserDefaultVO userSearchVO) throws Exception;
	
	/**
	 * 화면에 조회된 사용자의 기본정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
	 * @param userManageVO 업무사용자 수정정보
	 * @throws Exception
	 */
	public int updateUser(UserManageVO userManageVO) throws Exception;
		
	/**
	 * 업무사용자 암호 수정
	 * @param userManageVO 업무사용자 수정정보(비밀번호)
	 * @throws Exception
	 */
	public int updatePassword(UserManageVO userManageVO) throws Exception;
		
	/**
	 * 사용자가 비밀번호를 기억하지 못할 때 비밀번호를 찾을 수 있도록 함
	 * @param passVO 업무사용자 암호 조회조건정보
	 * @return userManageVO 업무사용자 암호정보
	 * @throws Exception
	 */
	public UserManageVO selectPassword(UserManageVO passVO) throws Exception;
	
	/**
	 * 사용자 메뉴생성 내역을 조회
	 * @param  userSearchVO UserDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectAllUserList(UserDefaultVO userSearchVO) throws Exception;

	/**
	 * 사용자목록의 전체수를 확인
	 * @param  userSearchVO UserDefaultVO
	 * @return 총사용자갯수(int)
	 * @throws Exception
	 */
	public int selectAllUserListTotCnt(UserDefaultVO userSearchVO) throws Exception;
	
	/**
	 * 기존 데이터 기능목록을 조회
	 * @param  userSearchVO UserDefaultVO
	 * @return List
	 * @throws Exception
	 */
	public List selectUserFunctionList(UserManageVO userVO) throws Exception;
	
	/**
	 * 기존 메뉴 기능목록을 삭제
	 * @exception Exception
	 */
	public int deleteDataFunctionList(UserDataVO userDataVO) throws Exception;
	
	/**
	 * 데이터 기능목록을 수정(추가)
	 * @exception Exception
	 */
	public int insertDataFunctionList(UserDataVO userDataVO) throws Exception;
	
	/**
	 * 메뉴생성관리 목록을 조회
	 * @param UserDataVO userDataVO
	 * @return List
	 * @exception Exception
	 */
	public List selectUserMenuFunctionList(UserDataVO userDataVO) throws Exception;
	
	/**
	 * 기존 메뉴 기능목록을 삭제
	 * @exception Exception
	 */
	public int deleteUserMenuFunctionList(UserDataVO userDataVO) throws Exception;
	/**
	 * 기존 메뉴 기능목록을 수정(추가)
	 * @exception Exception
	 */
	public int insertUserMenuFunctionList(UserDataVO userDataVO) throws Exception;
}