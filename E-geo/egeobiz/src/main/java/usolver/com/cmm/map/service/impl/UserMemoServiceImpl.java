package usolver.com.cmm.map.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
//import org.terracotta.agent.repkg.de.schlichtherle.io.File;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.UserMemoService;
import usolver.com.cmm.map.service.vo.MarkerVO;
import usolver.com.cmm.map.service.vo.MemoFileInfoVO;
import usolver.com.cmm.map.service.vo.MemoGroupVO;
import usolver.com.cmm.map.service.vo.MemoHistVO;
import usolver.com.cmm.map.service.vo.MemoVO;
import usolver.com.cmm.map.service.vo.UserMemoVO;
import usolver.com.cmm.util.FileMngUtil;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;

/**
 * 사용자_메모
 *
 * @Class Name : UserMemoServiceImpl.java
 * @Description : UserMemo Business Implement class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-09-03
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Service("userMemoService")
public class UserMemoServiceImpl extends AbstractServiceImpl implements UserMemoService {

	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;

	/**
	 * 사용자_메모(TN_USER_MEMO)을 등록한다.
	 * @param userMemoVO - 등록할 정보가 담긴 UserMemoVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public int insertUserMemo(UserMemoVO userMemoVO) throws Exception {
		return commonMapper.insert("insertUserMemo", userMemoVO);
	}
	
	public int insertMemo(MemoVO memoVO) throws Exception {
		return commonMapper.insert("insertMemo", memoVO);
	}
	
	public int updateMemo(MemoVO memoVO) throws Exception {
		return commonMapper.update("updateMemo", memoVO);
	}
	
	

	/**
	 * 사용자_메모(TN_USER_MEMO)을 수정한다.
	 * @param userMemoVO - 수정할 정보가 담긴 UserMemoVO
	 * @return int형
	 * @exception Exception
	 */
	public int updateUserMemo(UserMemoVO userMemoVO) throws Exception {
		return 0;
	}

	/**
	 * 사용자_메모(TN_USER_MEMO)을 삭제한다.
	 * @param userMemoVO - 삭제할 정보가 담긴 UserMemoVO
	 * @return int형 
	 * @exception Exception
	 */
	public int deleteUserMemo(UserMemoVO userMemoVO) throws Exception {
		return 0;
	}

	/**
	 * 사용자_메모(TN_USER_MEMO)을 조회한다.
	 * @param userMemoVO - 조회할 정보가 담긴 UserMemoVO
	 * @return 조회한 TN_USER_MEMO
	 * @exception Exception
	 */
	public UserMemoVO selectUserMemo(UserMemoVO userMemoVO) throws Exception {
		UserMemoVO resultVO = (UserMemoVO) commonMapper.selectByPk("", userMemoVO);
		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}
	
	
	public List<String> selectMemo(MemoVO memoVO) throws Exception {
		return (List<String>) commonMapper.list("selectMemoIDs", memoVO);		
	}
	
	public List<String> selectFilePaths(List<String> list) throws Exception {
		return (List<String>) commonMapper.list("selectFilePaths", list);		
	}
	
	
	
	
	/**
	 * 사용자_메모(TN_USER_MEMO) 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 userMemoVO
	 * @return TN_USER_MEMO 목록
	 * @exception Exception
	 */
	public List<UserMemoVO> selectUserMemoList(UserMemoVO userMemoVO) throws Exception {
		return (List<UserMemoVO>) commonMapper.list("selectUserMemoList", userMemoVO);
	}

	public List<MemoVO> selectMemoList(MemoVO memoVO) throws Exception {
		return (List<MemoVO>) commonMapper.list("selectMemoList", memoVO);
	}
	
	
	
	/**
	 * 사용자_메모(TN_USER_MEMO) 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 userMemoVO
	 * @return TN_USER_MEMO 총 갯수
	 * @exception
	 */
	public int selectUserMemoListTotCnt(UserMemoVO userMemoVO) {
		return 0;
	}
	
	/**
	 * 메모_파일_정보(TN_MEMO_FILE_INFO)을 등록한다.
	 * @param memoFileInfoVO - 등록할 정보가 담긴 MemoFileInfoVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public int insertMemoFileInfo(MemoFileInfoVO memoFileInfoVO) throws Exception {
		//String id = egovIdGnrService.getNextStringId();
		//memoFileInfoVO.setId(id);

		return commonMapper.insert("insertMemoFileInfo", memoFileInfoVO);//.insertMemoFileInfo( memoFileInfoVO);
	}
	
	/**
	 * 메모_파일_정보(TN_MEMO_FILE_INFO) 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 memoFileInfoVO
	 * @return TN_MEMO_FILE_INFO 목록
	 * @exception Exception
	 */
	public List<MemoHistVO> selectMemoFileInfoList(MemoHistVO memoHistVO) throws Exception {
		return commonMapper.list("selectMemoFileInfoList", memoHistVO);
	}

	
	
	/**
	 * 메모그룹(TN_MEMO_GROUP) 목록을 조회한다.
	 * @param memoGroupVO - 조회할 정보가 담긴 memoGroupVO
	 * @return MemoGroupVO 메모그룹 목록
	 * @exception Exception
	 */
	public List<MemoGroupVO> selectMemoGroupList(MemoGroupVO memoGroupVO) throws Exception{
		return commonMapper.list("selectMemoGroupList", memoGroupVO);
	}
	
	
	public List<MarkerVO> selectMarkerList (MarkerVO markerVO) throws Exception{
		return commonMapper.list("selectMarkerList", markerVO);
	}
	
	

	/**
	 * 메모그룹 이력 목록을 조회한다.
	 * @param memoHistVO - 조회할 정보가 담긴 memoHistVO
	 * @return memoHistVO 목록
	 * @throws Exception
	 */
	public List<MemoHistVO> selectMemoHistList(MemoHistVO memoHistVO) throws Exception{
		return commonMapper.list("selectMemoHistList", memoHistVO);
	}

	public int deleteMemo(MemoVO memoVO) throws Exception{
		
		List <String> selMemoList;
		List <String> delFileList;
		int result =0;
		Map <String, Object> map = new HashMap<String, Object>();
		
    	try {    
    		//삭제 대상 메모 선택
    		selMemoList = selectMemo(memoVO);
    		System.out.println(selMemoList.size());
    		
    		delFileList = commonMapper.list("selectFilePathFromMemoID", selMemoList);// selectFilePaths(selMemoList);
    		
    		
    		if(selMemoList.size()>0){
    			//map.put("memoList",selMemoList);    			
    			result = commonMapper.delete("deleteMemoFiles", selMemoList);    			
    			result = commonMapper.delete("deleteMemos", selMemoList);
    			
    			deleteRealFiles(delFileList);
    		}
    		
    		
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	
	public int deleteMemofile(MemoHistVO memoHistVO) throws Exception{
		int result =0;
		List <String> delFileList = null;
		try {    
			delFileList = commonMapper.list("selectFilePathFromFileID", memoHistVO);
			deleteRealFiles(delFileList);
			
    		result = commonMapper.delete("deleteMemoFile", memoHistVO);    		
		} catch (Exception e) {
			throw new Exception(e);			
		}
		finally
		{
			return result;
		}	
	}
	
	private boolean deleteRealFiles(List<String> list) throws Exception{
		boolean succ = true ;
		//실제 파일을 삭제
		Iterator<String> iterator = list.iterator(); 
		try{
			while(iterator.hasNext()){
				String path =(String) iterator.next();
				System.out.println(path);
			
				File file = new File(path);
				if(file.isFile())
					file.delete();
				 file = new File(path+"_tmb");
					if(file.isFile())
						file.delete();
				
			}
		} catch(Exception e){
			succ = false;
		}finally
		{
			return succ;
		}
		
	}
	
	
}
