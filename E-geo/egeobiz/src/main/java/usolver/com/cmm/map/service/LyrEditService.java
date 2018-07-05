package usolver.com.cmm.map.service;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

import usolver.com.cmm.map.service.vo.LyrEditMidSaveVO;
import usolver.com.cmm.map.service.vo.LyrEditRefVO;
import usolver.com.cmm.map.service.vo.LyrEditSchemaInfoVO;
import usolver.com.cmm.map.service.vo.LyrEditSnapInfoVO;
import usolver.com.cmm.map.service.vo.SearchEditHisVO;

/**
 * 편집기능 처리
 * 
 * @Class Name : LyrEditService.java
 * @Description : LyrEdit Business class
 * @Modification Information
 *
 * @author ggash@g-inno.com
 * @since 2015-08-28
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

public interface LyrEditService {
	/**
	 * 편집레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 편집레이어 목록
	 * @exception Exception
	 */
	List<EgovMap> selectEditLyrInfoList(String SYSTEM) throws Exception;
	
	/**
	 * 편집레이어의 참조레이어를 조회한다.
	 * @param name - 조회할 정보가 담긴 EgovMap
	 * @return 편집레이어의 참조 레이어 목록
	 * @exception Exception
	 */
	List<EgovMap> selectRefLyrInfoList(LyrEditRefVO vo) throws Exception;	
	
	/**
	 * 편집레이어의 스냅대상 레이어 및 스냅 정보를 조회한다.
	 * @param lyrEditSnapInfoVO - 조회할 정보가 담긴 EgovMap
	 * @return 편집레이어의 스냅 대상 레이어 및 스냅정보
	 * @exception Exception
	 */
	List<EgovMap> selectSnapLyrInfoList(LyrEditSnapInfoVO lyrEditSnapInfoVO) throws Exception;
	
	/**
	 * 편집중인 데이터(feature) 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 편집중인 데이터(feature) 목록
	 * @exception Exception
	 */
	List<EgovMap> selectMiddleEditFeatureList(EgovMap map) throws Exception;
	
	
	/**
	 * 편집레이어의 스키마정보를 조회한다.
	 * @param name - 조회할 정보가 담긴 String
	 * @return 편집레이어의 스키마정보
	 * @exception Exception
	 */
	List<EgovMap> selectEditLyrSchemaInfoList(String name) throws Exception;	
	
	
	/**
	 * 편집레이어의 스키마정보를 조회한다.
	 * @param name - 조회할 정보가 담긴 String
	 * @return 편집레이어의 스키마정보
	 * @exception Exception
	 */
	List<LyrEditSchemaInfoVO> selectSchemaInfoList(String name) throws Exception;
	
	/**
	 * 중간저장 feature 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 중간저장 feature 목록
	 * @exception Exception
	 */
	List<EgovMap> selectEditMidSaveInfoList(LyrEditMidSaveVO vo) throws Exception;
	
	/**
	 * 선택된 feature를 중간저장테이블에 최초저장한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 저장된 feature 수
	 * @exception Exception
	 */
	int insertEditMidFeature(LyrEditMidSaveVO vo) throws Exception;
	
	/**
	 * 선택된 feature를 중간저장한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 저장된 feature 수
	 * @exception Exception
	 */
	int updateEditMidFeature(LyrEditMidSaveVO vo) throws Exception;
	
	/**
	 * 중간저장 feature를 추가하거나 갱신한다
	 * @param map - 삭제할 정보가 담긴 EgovMap
	 * @return 삭제된 feature 수
	 * @exception Exception
	 */
	int MergeEditMidFeature(LyrEditMidSaveVO vo) throws Exception;
	
	/**
	 * 중간저장 feature를 삭제한다.
	 * @param map - 삭제할 정보가 담긴 EgovMap
	 * @return 삭제된 feature 수
	 * @exception Exception
	 */
	int deleteMidSaveFeature(LyrEditMidSaveVO vo) throws Exception;
	
	
	/**
	 * 편집레이어(중간저장) 정보삭제 :  G2S_EDITHISTORY와 비교하여 중간저장 테이블에 남아있는 항목이 있으면 삭제
	 * @param map - 삭제할 정보가 담긴 EgovMap
	 * @return 삭제된 feature 수
	 * @exception Exception
	 */
	int deleteMidSaveCompHistory(String userId) throws Exception;
	
	/**
	 * 편집레이어(중간저장) 정보삭제 :  DATASET_EDIT와 비교하여 중간저장 테이블에 남아있는 항목이 있으면 삭제
	 * @param map - 삭제할 정보가 담긴 EgovMap
	 * @return 삭제된 feature 수
	 * @exception Exception
	 */
	int deleteMidSaveCompEdit(Object parameterObject) throws Exception;	
	
	/**
	 * 시스템테이블 G2S_EDITHISTORY에 편집이력을 저장한다.
	 * @param map - 저장할 정보가 담긴 EgovMap
	 * @return 저장된 row 수
	 * @exception Exception
	 */
	int insertG2SEditHistory(SearchEditHisVO vo) throws Exception;
	
	/**
	 * _EDIT 테이블에 저장된 데이터를 가져온다
	 * @param map - table 이름과 FID, 날짜 정보가 들어있는 Map
	 * @return _EIDT 테이블의 데이터
	 * @exception Exception
	 */
	Map selectEditG2Data(Map map) throws Exception;
	List<String> selectCloumName(String TableName) throws Exception;
	int mergeLayerOrder(Map map) throws Exception;
	List<Map> selectLayerOrder(String userId) throws Exception;
}
