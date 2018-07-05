package usolver.com.cmm.map.service;

import java.util.List;

import usolver.com.cmm.map.service.vo.MarkerVO;
import usolver.com.cmm.map.service.vo.MemoFileInfoVO;
import usolver.com.cmm.map.service.vo.MemoGroupVO;
import usolver.com.cmm.map.service.vo.MemoHistVO;
import usolver.com.cmm.map.service.vo.MemoVO;
import usolver.com.cmm.map.service.vo.UserMemoVO;

/**
 * 사용자_메모
 * TN_USER_MEMO
 *
 * @Class Name : UserMemoService.java
 * @Description : UserMemo Business class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-09-03
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
/**
 * @author Administrator
 *
 */
public interface UserMemoService {

	/**
	 * 사용자_메모(TN_USER_MEMO)을 등록한다.
	 * @param userMemoVO - 등록할 정보가 담긴 UserMemoVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	int insertUserMemo(UserMemoVO userMemoVO) throws Exception;
	
	
	int insertMemo(MemoVO memoVO) throws Exception;
	
	int updateMemo(MemoVO emmoVO) throws Exception;

	/**
	 * 사용자_메모(TN_USER_MEMO)을 수정한다.
	 * @param userMemoVO - 수정할 정보가 담긴 UserMemoVO
	 * @return int형
	 * @exception Exception
	 */
	int updateUserMemo(UserMemoVO userMemoVO) throws Exception;

	/**
	 * 사용자_메모(TN_USER_MEMO)을 삭제한다.
	 * @param userMemoVO - 삭제할 정보가 담긴 UserMemoVO
	 * @return int형 
	 * @exception Exception
	 */
	int deleteUserMemo(UserMemoVO userMemoVO) throws Exception;
	

	/**
	 * 사용자_메모(TN_USER_MEMO) 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 userMemoVO
	 * @return TN_USER_MEMO 목록
	 * @exception Exception
	 */
	List<UserMemoVO> selectUserMemoList(UserMemoVO userMemoVO) throws Exception;
	
	List<MemoVO> selectMemoList(MemoVO memoVO) throws Exception;
	
	/**
	 * 사용자_메모(TN_USER_MEMO)을 조회한다.
	 * @param userMemoVO - 조회할 정보가 담긴 UserMemoVO
	 * @return 조회한 TN_USER_MEMO
	 * @exception Exception
	 */	
	List<String> selectMemo(MemoVO memoVO) throws Exception;

	List<String> selectFilePaths(List<String> list) throws Exception ;
	
	
	/**
	 * 사용자_메모(TN_USER_MEMO) 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 userMemoVO
	 * @return TN_USER_MEMO 총 갯수
	 * @exception
	 */
	int selectUserMemoListTotCnt(UserMemoVO userMemoVO);
	
	
	/**
	 * 메모_파일_정보(TN_MEMO_FILE_INFO)을 등록한다.
	 * @param memoFileInfoVO - 등록할 정보가 담긴 MemoFileInfoVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	int insertMemoFileInfo(MemoFileInfoVO memoFileInfoVO) throws Exception;
	
	/**
	 * 메모_파일_정보(TN_MEMO_FILE_INFO) 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 memoFileInfoVO
	 * @return TN_MEMO_FILE_INFO 목록
	 * @exception Exception
	 */
	List<MemoHistVO> selectMemoFileInfoList(MemoHistVO memoHistVO) throws Exception;
	
	
	/**
	 * 메모그룹(TN_MEMO_GROUP) 목록을 조회한다.
	 * @param memoGroupVO - 조회할 정보가 담긴 memoGroupVO
	 * @return MemoGroupVO 목록
	 * @throws Exception
	 */
	List<MemoGroupVO> selectMemoGroupList(MemoGroupVO memoGroupVO) throws Exception;
	
	
	
	/**
	 * 마커 
	 * @param markerVO
	 * @return
	 * @throws Exception
	 */
	List<MarkerVO> selectMarkerList (MarkerVO markerVO) throws Exception;
	
	/**
	 * 메모그룹 이력 목록을 조회한다.
	 * @param memoHistVO - 조회할 정보가 담긴 memoHistVO
	 * @return memoHistVO 목록
	 * @throws Exception
	 */
	List<MemoHistVO> selectMemoHistList(MemoHistVO memoHistVO) throws Exception;

	
	int deleteMemo(MemoVO memoVO) throws Exception;
	
	int deleteMemofile(MemoHistVO memoHistVO) throws Exception;
}

