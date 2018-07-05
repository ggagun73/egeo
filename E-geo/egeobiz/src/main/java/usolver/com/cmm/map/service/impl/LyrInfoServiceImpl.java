package usolver.com.cmm.map.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.LyrInfoService;
import usolver.com.cmm.map.service.vo.LyrEditRefVO;
import usolver.com.cmm.map.service.vo.LyrEditSnapInfoVO;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import usolver.com.main.vo.LoginVO;

/**
 * 주제도_정보
 *
 * @Class Name : LyrInfoServiceImpl.java
 * @Description : LyrInfo Business Implement class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-07-23
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Service("lyrInfoService")
public class LyrInfoServiceImpl extends AbstractServiceImpl implements LyrInfoService {
	
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;

	/**
	 * 레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 목록
	 * @exception Exception
	 */
	public List<EgovMap> selectLyrInfoList(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectLyrInfo", map);
	}

	/**
	 * 주제도_정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 주제도 목록
	 * @exception Exception
	 */
	public List<EgovMap> selectTMapInfo(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectTMapInfo", map);
	}
	
	/**
	 * 주제도 그룹 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 주제도 그룹 목록
	 * @exception Exception
	 */
	public List<EgovMap> selectTMapGroupInfo(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectTMapGroupInfo", map);
	}

	/**
	 * 레이어 그룹 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 레이어 그룹 목록
	 * @exception Exception
	 */
	public List<EgovMap> selectLyrGroupInfo(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectLyrGroupInfo", map);
	}

	public List<EgovMap> selectLyrGroupInfoNew(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectLyrGroupInfoNew", map);
	}

	public List<EgovMap> selectAllLyrByUser(String USER_ID) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectAllLyrByUser", USER_ID);
	}

	public List<EgovMap> selectAllEditLyrByUser(String USER_ID) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectAllEditLyrByUser", USER_ID);
	}

	public List<EgovMap> selectWaterLyrByUser(String USER_ID) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectWaterLyrByUser", USER_ID);
	}

	public List<EgovMap> selectSewerLyrByUser(String USER_ID) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectSewerLyrByUser", USER_ID);
	}

	public List<EgovMap> selectRoadLyrByUser(String USER_ID) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectRoadLyrByUser", USER_ID);
	}

	public List<EgovMap> selectAllLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectAllLyrByAuthor", map);
	}

	public List<EgovMap> selectWaterLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectWaterLyrByAuthor", map);
	}

	public List<EgovMap> selectSewerLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectSewerLyrByAuthor", map);
	}

	public List<EgovMap> selectRoadLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectRoadLyrByAuthor", map);
	}


	public List<EgovMap> selectEditWaterLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectEditWaterLyrByAuthor", map);
	}

	public List<EgovMap> selectEditSewerLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectEditSewerLyrByAuthor", map);
	}

	public List<EgovMap> selectEditRoadLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectEditRoadLyrByAuthor", map);
	}
	
	public List<EgovMap> selectAllEditLyrByAuthor(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectAllEditLyrByAuthor", map);
	}	 
	
	/**
	 * 유저 초기 지정영역을 갱신한다
	 * @param loginVO - 업뎃할 정보가 담긴 VO
	 * @return insert 또는 update 수
	 * @exception Exception
	 */
	public int updateMapExtent(LoginVO loginVO) throws Exception {
		return commonMapper.update("updateMapInitExtent", loginVO);
	}
}
