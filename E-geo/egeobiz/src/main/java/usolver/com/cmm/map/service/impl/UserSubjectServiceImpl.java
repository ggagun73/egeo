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
import usolver.com.cmm.map.service.UserSubjectService;
import usolver.com.cmm.map.service.vo.SubjectFileInfoVO;
import usolver.com.cmm.map.service.vo.SubjectFileTotVO;
import usolver.com.cmm.map.service.vo.SubjectLayerVO;
import usolver.com.cmm.map.service.vo.SubjectVO;
import usolver.com.cmm.util.FileMngUtil;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 사용자_주제도
 *
 * @Class Name : UserSubjectServiceImpl.java
 * @Description : UserSubject Business Implement class
 * @Modification Information
 *
 * @author ggash@g-inno.com
 * @since 2016-08-19
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Service("subjectService")
public class UserSubjectServiceImpl extends AbstractServiceImpl implements UserSubjectService {

	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;


	public int insertSubject(SubjectVO subjectVO) throws Exception {
		return commonMapper.insert("insertSubject", subjectVO);
	}
	
	public int updateSubject(SubjectVO subjectVO) throws Exception {
		return commonMapper.update("updateSubject", subjectVO);
	}
		
	public int insertSubjectLayer(SubjectLayerVO subjectLayerVO) throws Exception {
		return commonMapper.insert("insertSubjectLayer", subjectLayerVO);
	}
	
	public int updateSubjectLayer(SubjectLayerVO subjectLayerVO) throws Exception {
		return commonMapper.update("updateSubjectLayer", subjectLayerVO);
	}
	
	public List<String> selectFilePaths(List<String> list) throws Exception {
		return (List<String>) commonMapper.list("selectFilePaths", list);		
	}
	

	public List<SubjectVO> selectSubject(SubjectVO subjectVO) throws Exception {
		return (List<SubjectVO>) commonMapper.list("selectSubject", subjectVO);
	}

	public List<SubjectVO> selectSubjectList(SubjectVO subjectVO) throws Exception {
		return (List<SubjectVO>) commonMapper.list("selectSubjectList", subjectVO);
	}
	
	public List<SubjectLayerVO> selectSubjectLayerList(SubjectLayerVO subjectLayerVO) throws Exception {
		return (List<SubjectLayerVO>) commonMapper.list("selectSubjectLayerList", subjectLayerVO);
	}
	
	public List<SubjectFileTotVO> selectSubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception {
		return commonMapper.list("selectSubjectFileInfoList", subjectFileTotVO);
	}
	
	public List<SubjectFileTotVO> selectStandbySubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception {
		return commonMapper.list("selectStandbySubjectFileInfoList", subjectFileTotVO);
	}
	
	public List<SubjectFileTotVO> selectSysSubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception {
		return commonMapper.list("selectSysSubjectFileInfoList", subjectFileTotVO);
	}
	
	public List<SubjectFileTotVO> selectMySubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception {
		return commonMapper.list("selectMySubjectFileInfoList", subjectFileTotVO);
	}
	
	public List<SubjectFileTotVO> selectSharedSubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception {
		return commonMapper.list("selectSharedSubjectFileInfoList", subjectFileTotVO);
	}
	/**
	 * 사용자_주제도(TN_USER_SUBJECT) 총 갯수를 조회한다.
	 * @param subjectVO - 조회할 정보가 담긴 SubjectVO
	 * @return TN_USER_SUBJECT 총 갯수
	 * @exception
	 */
	public int selectSubjectListTotCnt(SubjectVO subjectVO) {
		return 0;
	}
	
	/**
	 * 주제도_스냅샷_파일_정보(TN_SUBJECT_FILE_INFO)을 등록한다.
	 * @param subjectFileInfoVO - 등록할 정보가 담긴 SubjectFileInfoVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public int insertSubjectFileInfo(SubjectFileInfoVO subjectFileInfoVO) throws Exception {

		return commonMapper.insert("insertSubjectFileInfo", subjectFileInfoVO);//.insertMemoFileInfo( memoFileInfoVO);
	}
	
	public int deleteSubjectLayer(SubjectLayerVO subjectLayerVO) throws Exception{ 
		return commonMapper.delete("deleteSubjectLayer", subjectLayerVO);
	}
	
	public int deleteSubjectAllLayer(SubjectVO subjectVO) throws Exception{ 
		return commonMapper.delete("deleteSubjectAllLayer", subjectVO);
	}
	
	public int deleteSubjectAllStyle(SubjectVO subjectVO) throws Exception{ 
		return commonMapper.delete("deleteSubjectAllStyle", subjectVO);
	}
	
	public int deleteSubjectFiles(SubjectVO subjectVO) throws Exception{ 
		return commonMapper.delete("deleteSubjectFiles", subjectVO);
	}
	
	public int deleteSubject(SubjectVO subjectVO) throws Exception{
		
		List <String> delFileList;
		int result =0;
		
		//Map <String, Object> map = new HashMap<String, Object>();
		
    	try { 
    		
    		delFileList = commonMapper.list("selectFilePathFromSubjectID", subjectVO);// selectFilePaths(selMemoList);
    		
    			//map.put("memoList",selMemoList);    			
    		result = commonMapper.delete("deleteSubjectFiles", subjectVO);
    		result = commonMapper.delete("deleteSubjectAllStyle", subjectVO);
    		result = commonMapper.delete("deleteSubjectAllLayer", subjectVO);
    		result = commonMapper.delete("deleteSubject", subjectVO);
    			
    		deleteRealFiles(delFileList);
    		
    		
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
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

	public List<EgovMap> selectBaseLyrInfoListBySubject(SubjectVO subjectVO) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectBaseLyrInfoBySubject", subjectVO);
	}
	
	public List<EgovMap> selectMyLyrInfoListBySubject(SubjectVO subjectVO) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectMyLyrInfoBySubject", subjectVO);
	}
	
	public List<EgovMap> selectLyrInfoListBySubject(SubjectVO subjectVO) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectLyrInfoBySubject", subjectVO);
	}

	public int setBaseSubject(SubjectVO subjectVO) throws Exception {
		
		//기본 주제도로 설정할 주제도 외에는 모두 BASE값을'N'으로..
		commonMapper.update("initBaseSubject", subjectVO);
		return commonMapper.update("setBaseSubject", subjectVO);
	}

	public int setApproveSubject(SubjectVO subjectVO) throws Exception {
		 
		return commonMapper.update("setApproveSubject", subjectVO);
	}
	
}
