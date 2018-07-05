package usolver.com.cmm.map.service;

import java.util.List;

import usolver.com.cmm.map.service.vo.LyrEditRefVO;
import usolver.com.cmm.map.service.vo.LyrEditSnapInfoVO;
import usolver.com.main.vo.LoginVO;

import egovframework.rte.psl.dataaccess.util.EgovMap;


/**
 * 주제도_정보
 * TN_LYR_INFO
 *
 * @Class Name : LyrInfoService.java
 * @Description : LyrInfo Business class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-07-23
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public interface LyrInfoService {
	/**
	 * 레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 목록
	 * @exception Exception
	 */
	List<EgovMap> selectLyrInfoList(EgovMap map) throws Exception;
	
	/**
	 * 주제도_정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 주제도 목록
	 * @exception Exception
	 */
	List<EgovMap> selectTMapInfo(EgovMap map) throws Exception;
	
	/**
	 * 주제도 그룹 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 주제도 그룹 목록
	 * @exception Exception
	 */
	List<EgovMap> selectTMapGroupInfo(EgovMap map) throws Exception;
	
	/**
	 * TN_USER_LAYERGROUP에서 주제도 그룹 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 주제도 그룹 목록
	 * @exception Exception
	 */
	List<EgovMap> selectLyrGroupInfoNew(EgovMap map) throws Exception;
	
	/**
	 * 레이어 그룹 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 그룹 목록
	 * @exception Exception
	 */
	List<EgovMap> selectLyrGroupInfo(EgovMap map) throws Exception;
	
		
	List<EgovMap> selectAllLyrByUser(String USER_ID) throws Exception;
	
	List<EgovMap> selectAllEditLyrByUser(String USER_ID) throws Exception;
	
	List<EgovMap> selectWaterLyrByUser(String USER_ID) throws Exception;
	
	List<EgovMap> selectSewerLyrByUser(String USER_ID) throws Exception;
	
	List<EgovMap> selectRoadLyrByUser(String USER_ID) throws Exception;
	
	List<EgovMap> selectAllLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectWaterLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectSewerLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectRoadLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectEditWaterLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectEditSewerLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectEditRoadLyrByAuthor(EgovMap map) throws Exception;
	
	List<EgovMap> selectAllEditLyrByAuthor(EgovMap map) throws Exception;
	
	
	/**
	 * 유저 초기 지정영역을 갱신한다
	 * @param loginVO - 업뎃할 정보가 담긴 VO
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	int updateMapExtent(LoginVO loginVO) throws Exception;
}

