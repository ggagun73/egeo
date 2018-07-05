package usolver.com.cmm.map.service;

import java.util.List;

import egovframework.rte.psl.dataaccess.util.EgovMap;

import usolver.com.cmm.map.service.vo.SubjectFileInfoVO;
import usolver.com.cmm.map.service.vo.SubjectFileTotVO;
import usolver.com.cmm.map.service.vo.SubjectLayerVO;
import usolver.com.cmm.map.service.vo.SubjectVO;

/**
 * 사용자_주제도
 * TN_USER_SUBJECT
 *
 * @Class Name : UserSubjectService.java
 * @Description : UserSubjectService Business class
 * @Modification Information
 *
 * @author ggash@g-inno.com
 * @since 2016-08-19
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
/**
 * @author Administrator
 *
 */
public interface UserSubjectService {
	
	int insertSubject(SubjectVO subjectVO) throws Exception;
	
	int updateSubject(SubjectVO subjectVO) throws Exception;
	
	int setApproveSubject(SubjectVO subjectVO) throws Exception;
	
	int setBaseSubject(SubjectVO subjectVO) throws Exception;
	
	int deleteSubject(SubjectVO subjectVO) throws Exception;
	
	int insertSubjectLayer(SubjectLayerVO subjectLayerVO) throws Exception;
	
	int updateSubjectLayer(SubjectLayerVO subjectLayerVO) throws Exception;
	
	int deleteSubjectLayer(SubjectLayerVO subjectLayerVO) throws Exception;
	
	int deleteSubjectAllLayer(SubjectVO subjectVO) throws Exception;
	
	int deleteSubjectAllStyle(SubjectVO subjectVO) throws Exception;
	
	int deleteSubjectFiles(SubjectVO subjectVO) throws Exception;

		/**
	 * 기본 레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 목록
	 * @exception Exception
	 */
	List<EgovMap> selectBaseLyrInfoListBySubject (SubjectVO subjectVO) throws Exception;
	
		/**
	 * 레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 목록
	 * @exception Exception
	 */
	List<EgovMap> selectMyLyrInfoListBySubject (SubjectVO subjectVO) throws Exception;
	
		/**
	 * 레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 목록
	 * @exception Exception
	 */
	List<EgovMap> selectLyrInfoListBySubject (SubjectVO subjectVO) throws Exception;
	
	
	/**
	 * 사용자_주제도(TN_USER_SUBJECT) 목록을 조회한다.
	 * @param subjectVO - 조회할 정보가 담긴 SubjectVO
	 * @return TN_USER_SUBJECT 목록
	 * @exception Exception
	 */ 
	
	List<SubjectVO> selectSubjectList(SubjectVO subjectVO) throws Exception;
	
	/**
	 * 사용자_주제도(TN_USER_SUBJECT)을 조회한다.
	 * @param subjectVO - 조회할 정보가 담긴 SubjectVO
	 * @return 조회한 TN_USER_SUBJECT
	 * @exception Exception
	 */	
	List<SubjectVO> selectSubject(SubjectVO subjectVO) throws Exception; 
		
	List<SubjectFileTotVO> selectSubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception;
		
	List<SubjectFileTotVO> selectStandbySubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception;
		
	List<SubjectFileTotVO> selectMySubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception;
		
	List<SubjectFileTotVO> selectSysSubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception;
		
	List<SubjectFileTotVO> selectSharedSubjectFileInfoList(SubjectFileTotVO subjectFileTotVO) throws Exception;
	
		/**
	 * 사용자_주제도(TN_USER_SUBJECT) 목록을 조회한다.
	 * @param subjectVO - 조회할 정보가 담긴 SubjectVO
	 * @return TN_USER_SUBJECT 목록
	 * @exception Exception
	 */ 
	
	List<SubjectLayerVO> selectSubjectLayerList(SubjectLayerVO subjectLayerVO) throws Exception;
	
	/**
	 * 사용자_주제도_스냅샨(TN_SUBJECT_FILE_INFO)을 등록한다.
	 * @param subjectFileInfoVO - 등록할 정보가 담긴 SubjectFileInfoVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	int insertSubjectFileInfo(SubjectFileInfoVO subjectFileInfoVO) throws Exception;
	
	
}

