package usolver.com.cmm.map.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.SearchPositionService;
import usolver.com.cmm.map.service.vo.SearchBLDGVO;
import usolver.com.cmm.map.service.vo.SearchJUSOVO;
import usolver.com.cmm.map.service.vo.SearchNEWJUSOVO;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 위치정보
 *
 * @Class Name : SearchPositionServiceImpl.java
 * @Description : SearchPosition Business Implement class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-07-23
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Service("searchPositionService")
public class SearchPositionServiceImpl extends AbstractServiceImpl implements SearchPositionService {
	
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;
	
	/**
	 * 건물정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 건물 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectBldgList(SearchBLDGVO vo) throws Exception {
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectBldgList", vo);
	}	
	
	/**
	 * 주소정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 주소 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectJusoList(SearchJUSOVO vo) throws Exception {
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectJusoList", vo);
	}	
	
	/**
	 * 새주소 - 도로명정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 도로명 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectNewJusoList_rn(SearchNEWJUSOVO vo) throws Exception { 
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectNewJusoList_rn", vo);
	}
	
	/**
	 * 새주소 - 건물명정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 건물명 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectNewJusoList_bd(SearchNEWJUSOVO vo) throws Exception {
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectNewJusoList_bd", vo);
	}
}
