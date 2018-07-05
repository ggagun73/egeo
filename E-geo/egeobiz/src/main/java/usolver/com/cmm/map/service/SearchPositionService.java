package usolver.com.cmm.map.service;

import java.util.List;

import usolver.com.cmm.map.service.vo.SearchBLDGVO;
import usolver.com.cmm.map.service.vo.SearchJUSOVO;
import usolver.com.cmm.map.service.vo.SearchNEWJUSOVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;


/**
 * 위치검색
 *
 * @Class Name : SearchPositionService.java
 * @Description : SearchPosition Business class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-07-23
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public interface SearchPositionService {	
	/**
	 * 건물정보를 조회한다.
	 * @param name - 조회할 정보가 담긴 EgovMap
	 * @return 건물 목록
	 * @exception Exception
	 */
	List<EgovMap> selectBldgList(SearchBLDGVO vo) throws Exception;	
	
	/**
	 * 주소정보를 조회한다.
	 * @param name - 조회할 정보가 담긴 EgovMap
	 * @return 주소 목록
	 * @exception Exception
	 */
	List<EgovMap> selectJusoList(SearchJUSOVO vo) throws Exception;	
	
	/**
	 * 새주소 - 도로명정보를 조회한다.
	 * @param name - 조회할 정보가 담긴 EgovMap
	 * @return 도로명 목록
	 * @exception Exception
	 */
	List<EgovMap> selectNewJusoList_rn(SearchNEWJUSOVO vo) throws Exception;
	
	/**
	 * 새주소 - 건물명정보를 조회한다.
	 * @param name - 조회할 정보가 담긴 EgovMap
	 * @return 건물명 목록
	 * @exception Exception
	 */
	List<EgovMap> selectNewJusoList_bd(SearchNEWJUSOVO vo) throws Exception;
}

