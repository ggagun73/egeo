package usolver.admin.user.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.providers.encoding.PasswordEncoder;
import org.springframework.security.providers.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;

import usolver.admin.menu.vo.MenuCreatVO;
import usolver.admin.user.service.EgovUserManageService;
import usolver.admin.user.vo.UserDataVO;
import usolver.admin.user.vo.UserDefaultVO;
import usolver.admin.user.vo.UserManageVO;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.com.cmm.ComDefaultVO;
import egovframework.com.utl.sim.service.EgovFileScrty;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 사용자관리에 관한 비지니스 클래스를 정의한다.
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
@Service("userManageService")
public class EgovUserManageServiceImpl extends AbstractServiceImpl implements EgovUserManageService {

	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
	
	/** userManageDAO */
	@Resource(name="userManageDAO")
	private UserManageDAO userManageDAO;
		
	/** egovUsrCnfrmIdGnrService 
	@Resource(name="egovUsrCnfrmIdGnrService")
	private EgovIdGnrService idgenService;*/

	/**
	 * 입력한 사용자아이디의 중복여부를 체크하여 사용가능여부를 확인
	 * @param checkId 중복여부 확인대상 아이디
	 * @return 사용가능여부(아이디 사용회수 int)
	 * @throws Exception
	 */
	public int checkIdDplct(String sUserId) throws Exception {
		return userManageDAO.checkIdDplct(sUserId);
	}

	/**
	 * 화면에 조회된 사용자의 정보를 데이터베이스에서 삭제
	 * @param checkedIdForDel 삭제대상 업무사용자아이디
	 * @throws Exception
	 */
	public int deleteUser(String checkedIdForDel) throws Exception {
		//userManageDAO.deleteUser(checkedIdForDel);			
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteUser", checkedIdForDel);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	
	/**
	 * @param userManageVO 업무사용자 등록정보
	 * @return result 등록결과
	 * @throws Exception
	 */
	public int insertUser(UserManageVO userManageVO) throws Exception {
				
		/*//sha-256 패스워드 암호화
    	PasswordEncoder encoder = new ShaPasswordEncoder(256); 
    	String hashed = encoder.encodePassword(userManageVO.getPassword(), null);    	
    	userManageVO.setPassword( hashed );

		String result = userManageDAO.insertUser(userManageVO);
		return result;*/
				
		int result = 0;
		
		PasswordEncoder encoder = new ShaPasswordEncoder(256); 
    	String hashed = encoder.encodePassword(userManageVO.getPassword(), null);    	
    	userManageVO.setPassword( hashed );

    	try {
			result = commonMapper.insert("admin.insertUser", userManageVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}

	/**
	 * 기 등록된 사용자 중 검색조건에 맞는 사용자의 정보를 데이터베이스에서 읽어와 화면에 출력
	 * @param uniqId 상세조회대상 업무사용자 아이디
	 * @return userManageVO 업무사용자 상세정보
	 * @throws Exception
	 */
	public UserManageVO selectUser(String uniqId) {
		/*UserManageVO userManageVO = userManageDAO.selectUser(uniqId);		
		return userManageVO;*/
		
		return (UserManageVO) commonMapper.selectByPk("admin.selectUser", uniqId);
	}

	/**
	 * 기 등록된 특정 사용자의 정보를 데이터베이스에서 읽어와 화면에 출력
	 * @param userSearchVO 검색조건
	 * @return List<UserManageVO> 업무사용자 목록정보
	 * @throws Exception
	 */
	public List selectUserList(UserDefaultVO userSearchVO) {
/*		List result = userManageDAO.selectUserList(userSearchVO);
		return result;*/
		
		return commonMapper.getSelectList("admin.selectUserList", userSearchVO);
	}

	/**
	 * 기 등록된 특정 사용자목록의 전체수를 확인
	 * @param userSearchVO 검색조건
	 * @return 총사용자갯수(int)
	 * @throws Exception
	 */
	public int selectUserListTotCnt(UserDefaultVO userSearchVO) {
		//return userManageDAO.selectUserListTotCnt(userSearchVO);
		
		 return commonMapper.getSelectCnt("admin.selectUserListTotCnt", userSearchVO);
	}
	
	/**
	 * 화면에 조회된 사용자의 기본정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
	 * @param userManageVO 업무사용자 수정정보
	 * @throws Exception
	 */
	public int updateUser(UserManageVO userManageVO) throws Exception {
/*		//패스워드 암호화
		String pass = EgovFileScrty.encryptPassword(userManageVO.getPassword());
		userManageVO.setPassword(pass);
		
		userManageDAO.updateUser(userManageVO);
		*/
		int result = 0;

    	try {
			result = commonMapper.update("admin.updateUser", userManageVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
		
	/**
	 * 업무사용자 암호 수정
	 * @param userManageVO 업무사용자 수정정보(비밀번호)
	 * @throws Exception
	 */
	public int updatePassword(UserManageVO userManageVO) throws Exception {
		//userManageDAO.updatePassword(userManageVO);
		
		int result = 0;

    	try {
			result = commonMapper.update("admin.updatePassword", userManageVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    	
	}
		

	/**
	 * 사용자가 비밀번호를 기억하지 못할 때 비밀번호를 찾을 수 있도록 함
	 * @param passVO 업무사용자 암호 조회조건정보
	 * @return userManageVO 업무사용자 암호정보
	 * @throws Exception
	 */
	public UserManageVO selectPassword(UserManageVO passVO) {
		//UserManageVO userManageVO = userManageDAO.selectPassword(passVO);
		//return userManageVO;
		
		return (UserManageVO) commonMapper.selectByPk("admin.selectPassword", passVO);
	}
	
	/**
	 * 사용자 메뉴생성 내역을 조회
	 * @param  userSearchVO UserDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectAllUserList(UserDefaultVO userSearchVO) throws Exception {
   		//return userManageDAO.selectAllUserList(userSearchVO);
   		
   		return commonMapper.getSelectList("admin.selectAllUserList", userSearchVO);
	}
	
	/**
	 * 사용자목록의 전체수를 확인
	 * @param  userSearchVO UserDefaultVO
	 * @return 총사용자갯수(int)
	 * @throws Exception
	 */
	public int selectAllUserListTotCnt(UserDefaultVO userSearchVO) {
		//return userManageDAO.selectAllUserListTotCnt(userSearchVO);
		
		 return commonMapper.getSelectCnt("admin.selectAllUserListTotCnt", userSearchVO);
	}
	
	/**
	 * 기존 데이터 기능목록을 조회
	 * @param  userSearchVO UserDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectUserFunctionList(UserManageVO userVO) throws Exception {
		//return userManageDAO.selectUserFunctionList(userVO);		
		return commonMapper.getSelectList("admin.selectUserFunctionList", userVO);
	}
	
	/**
	 * 기존 데이터 기능목록을 삭제
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public int deleteDataFunctionList(UserDataVO userDataVO) throws Exception {
		//userManageDAO.deleteDataFunctionList(userDataVO);		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteDataFunctionList", userDataVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	
	/**
	 * 데이터 기능목록을 수정(추가)
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public int insertDataFunctionList(UserDataVO userDataVO) throws Exception {
		//userManageDAO.insertDataFunctionList(userDataVO);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertDataFunctionList", userDataVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	
	/**
	 * 기존 메뉴 기능목록을 조회
	 * @param UserDataVO userDataVO
	 * @return List
	 * @exception Exception
	 */
	public List selectUserMenuFunctionList(UserDataVO userDataVO) throws Exception {
		//return userManageDAO.selectUserMenuFunctionList(userDataVO);		
		return commonMapper.getSelectList("admin.selectUserMenuFunctionList", userDataVO);
	}
	
	/**
	 * 기존 메뉴 기능목록을 삭제
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public int deleteUserMenuFunctionList(UserDataVO userDataVO) throws Exception {
		//userManageDAO.deleteUserMenuFunctionList(userDataVO);
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteUserMenuFunctionList", userDataVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	/**
	 * 기존 메뉴 기능목록 모두 삭제
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public int deleteAllUserMenu(UserDataVO userDataVO) throws Exception {
		//userManageDAO.deleteUserMenuFunctionList(userDataVO);
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteAllUserMenu", userDataVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	
	/**
	 * 메뉴 기능목록을 수정(추가)
	 * @param UserDataVO userDataVO
	 * @exception Exception
	 */
	public int insertUserMenuFunctionList(UserDataVO userDataVO) throws Exception {
		//userManageDAO.insertUserMenuFunctionList(userDataVO);
		
		int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertUserMenuFunctionList", userDataVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	

}