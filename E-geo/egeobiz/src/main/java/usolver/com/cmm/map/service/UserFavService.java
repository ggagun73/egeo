package usolver.com.cmm.map.service;

import java.util.List;
import java.util.Map;

import usolver.com.cmm.map.service.vo.UserFavVO;

/**
 * 사용자_즐겨찾기
 * TN_USER_FAVGROUP,TN_USER_FAV
 *
 * @Class Name : UserFavService.java
 * @Description : UserFav Business class
 * @Modification Information
 *
 * @author sese5858@g-inno.com
 * @since 2016-09-02
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public interface UserFavService {
	/**
	 * 유저 즐겨찾기 그룹을 검색한다
	 * @param String - 유저 아이디
	 * @return 즐겨 찾기 그룹 
	 * @exception Exception
	 */
	List<Map> selectFavGroup(Map groupInfo) throws Exception;
	
	/**
	 * 유저 즐겨찾기 그룹을 추가한다
	 * @param String - 유저 아이디
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int insertFavGroup(Map groupInfo) throws Exception;

	/**
	 * 유저 즐겨찾기 그룹을 수정한다
	 * @param String - 유저 아이디
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int updateFavGroup(Map groupInfo) throws Exception;
	
	/**
	 * 유저 즐겨찾기 그룹을 삭제한다
	 * @param Map - 그룹 정보
	 * @return delete 수
	 * @exception Exception
	 */
	int deleteFavGroup(Map groupInfo) throws Exception;
	
	/**
	 * 유저 즐겨찾기 그룹의 즐겨찾기를 검색한다
	 * @param UserFavVO - 유저 즐겨찾기 정보
	 * @return 유저 즐겨찾기 정보
	 * @exception Exception
	 */
	List<UserFavVO> selectFav(UserFavVO favVO) throws Exception;
	
	/**
	 * 유저 즐겨찾기를 추가한다
	 * @param String - 유저 아이디
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int insertFav(UserFavVO favVO) throws Exception;

	/**
	 * 유저 즐겨찾기를 수정한다
	 * @param String - 유저 아이디
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int updateFav(UserFavVO favVO) throws Exception;
	
	/**
	 * 유저 즐겨찾기를 삭제한다
	 * @param UserFavVO - 유저 즐겨찾기 정보
	 * @return delete 수
	 * @exception Exception
	 */
	int deleteFav(UserFavVO favVO) throws Exception;
	
	/**
	 * 유저의 초기 지정영역을 검색한다
	 * @param UserFavVO - 유저 즐겨찾기 정보
	 * @return 유저 즐겨찾기 정보
	 * @exception Exception
	 */
	UserFavVO selectFavExtent(UserFavVO favVO) throws Exception;
	
	/**
	 * 유저 초기 지정영역을 초기화한다
	 * @param String - 유저 아이디
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int initFavExtent(UserFavVO favVO) throws Exception;

	/**
	 * 유저 초기 지정영역을 수정한다
	 * @param String - 유저 아이디
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int updateFavExtent(UserFavVO favVO) throws Exception;
	
}
