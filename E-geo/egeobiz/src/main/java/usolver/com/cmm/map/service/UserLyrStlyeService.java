package usolver.com.cmm.map.service;

import java.util.List;

import usolver.com.cmm.map.service.vo.UserLyrStyleVO;

/**
 * 사용자_스타일
 * TN_USER_STYLE
 *
 * @Class Name : UserLyrStlyeService.java
 * @Description : UserLyrStlye Business class
 * @Modification Information
 *
 * @author sese5858@g-inno.com
 * @since 2016-08-01
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
/**
 * @author Administrator
 *
 */
public interface UserLyrStlyeService {

	/**
	 * 유저의 레이어 스타일을 전부 검색한다.
	 * @param userLyrStyleVO - 조회할 레이어 스타일의 정보가 있는 UserLyrStyleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	List<UserLyrStyleVO> selectAllUserLyrStlye(UserLyrStyleVO userLyrStyleVO) throws Exception;
	
	/**
	 * 유저의 레이어 스타일을 검색한다.
	 * @param userLyrStyleVO - 조회할 레이어 스타일의 정보가 있는 UserLyrStyleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	UserLyrStyleVO selectUserLyrStlye(UserLyrStyleVO userLyrStyleVO) throws Exception;
	
	/**
	 * 유저의 레이어 스타일을 갱신한다.
	 * @param userLyrStyleVO - 등록할 레이어 스타일의 정보가 있는 UserLyrStyleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	void updateUserLyrStyle(UserLyrStyleVO userLyrStyleVO) throws Exception;
	
	/**
	 * 유저의 레이어 스타일을 추가한다.
	 * @param userLyrStyleVO - 등록할 레이어 스타일의 정보가 있는 UserLyrStyleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	void insertUserLyrStyle(UserLyrStyleVO userLyrStyleVO) throws Exception;
}

