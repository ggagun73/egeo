package usolver.com.cmm.map.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.com.cmm.service.Globals;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.LyrEditService;
import usolver.com.cmm.map.service.vo.LyrEditMidSaveVO;
import usolver.com.cmm.map.service.vo.LyrEditRefVO;
import usolver.com.cmm.map.service.vo.LyrEditSchemaInfoVO;
import usolver.com.cmm.map.service.vo.LyrEditSnapInfoVO;
import usolver.com.cmm.map.service.vo.SearchEditHisVO;

@Service("lyrEditService")
public class LyrEditServiceImpl extends AbstractServiceImpl implements LyrEditService  {


	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
    /**
	 * 편집레이어 정보 목록을 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 편집레이어 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectEditLyrInfoList(String SYSTEM) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectEditLyrInfo", SYSTEM);
	}
	
	/**
	 * 편집레이어의 참조레이어를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 편집레이어의 참조레이어 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectRefLyrInfoList(LyrEditRefVO vo) throws Exception {
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectRefLyrInfo", vo);
	}
	
	/**
	 * 편집레이어의 스냅대상 레이어 및 스냅 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 편집레이어의 스냅 대상 레이어 및 스냅정보
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectSnapLyrInfoList(LyrEditSnapInfoVO map) throws Exception {
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectSnapLyrInfo", map);
	}	
	
	/**
	 * 편집중인 데이터(feature) 정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 EgovMap
	 * @return 편집중인 데이터(feature) 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectMiddleEditFeatureList(EgovMap map) throws Exception {
		return (List<EgovMap>) commonMapper.list("selectMiddleEditInfo", map);
	}
	
	/**
	 * 편집레이어의 스키마정보를 조회한다.
	 * @param map - 조회할 정보가 담긴 String
	 * @return 편집레이어의 스키마정보
	 * @exception Exception
	 */	
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectEditLyrSchemaInfoList(String layerList) throws Exception {
		String[] arrLayer = layerList.split(",");
		List<String> list = new ArrayList<String>();
		for(int i=0;i<arrLayer.length;i++){
			list.add(arrLayer[i]);
			System.out.println(arrLayer[i]);
		}
		if(Globals.GIS_ENGINE_TYPE.equals("GeoServer")) //ggash 20170116 for geoserver
			return (List<EgovMap>) commonMapper.list("selectEditLyrSchemaInfoByGeoServer", list);
		else
			return (List<EgovMap>) commonMapper.list("selectEditLyrSchemaInfo", list);
	}
	
	@SuppressWarnings("unchecked")
	public List<LyrEditSchemaInfoVO> selectSchemaInfoList(String layerList) throws Exception {
		String[] arrLayer = layerList.split(",");
		List<String> list = new ArrayList<String>();
		for(int i=0;i<arrLayer.length;i++){
			list.add(arrLayer[i]);
			System.out.println(arrLayer[i]);
		}

		if(Globals.GIS_ENGINE_TYPE.equals("GeoServer")) //ggash 20170116 for geoserver
			return (List<LyrEditSchemaInfoVO>) commonMapper.list("selectEditLyrSchemaInfoByGeoServer", list);
		else
			return (List<LyrEditSchemaInfoVO>) commonMapper.list("selectEditLyrSchemaInfo", list);
		
	}
	
	
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectEditMidSaveInfoList(LyrEditMidSaveVO vo) throws Exception {
		return (List<EgovMap>) commonMapper.list("usolver.com.cmm.dao.CommonMapper.selectEditMidSaveInfo", vo);
	}
    
	/**
	 * 선택된 feature를 중간저장테이블에 최초저장한다.
	 * @param vo - 저장할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertEditMidFeature(LyrEditMidSaveVO vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.insertData("usolver.com.cmm.dao.CommonMapper.insertEditMidSave", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
    
	/**
	 * 선택된 feature를 중간저장한다.
	 * @param vo - 수정할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int updateEditMidFeature(LyrEditMidSaveVO vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.updateData("usolver.com.cmm.dao.CommonMapper.updateEditMidSave", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
    

    
    /**
	 * 편집레이어(중간저장)를 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 VO
	 * @return 삭제결과
	 * @exception Exception
	 */
    public int deleteMidSaveFeature(LyrEditMidSaveVO vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.deleteData("usolver.com.cmm.dao.CommonMapper.deleteMidSaveFeature", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
    
    /**
	 * 편집레이어(중간저장) 정보삭제 :  G2S_EDITHISTORY와 비교하여 중간저장 테이블에 남아있는 항목이 있으면 삭제
	 * @param userId - 사용자 ID
	 * @return 삭제결과
	 * @exception Exception
	 */
    public int deleteMidSaveCompHistory(String userId) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.deleteData("usolver.com.cmm.dao.CommonMapper.deleteMidSaveCompHistory", userId);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
    
    /**
	 * 편집레이어(중간저장) 정보삭제 :  DATASET_EDIT와 비교하여 중간저장 테이블에 남아있는 항목이 있으면 삭제 
	 * @param userId - 사용자 ID
	 * @return 삭제결과
	 * @exception Exception
	 */
    public int deleteMidSaveCompEdit(Object parameterObject) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.deleteData("usolver.com.cmm.dao.CommonMapper.deleteMidSaveCompEdit", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
	
    /**
	 * 선택된 feature를 중간저장테이블에 저장 혹은 갱신한다
	 * @param vo - 저장할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int MergeEditMidFeature(LyrEditMidSaveVO vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.update("usolver.com.cmm.dao.CommonMapper.mergeEditMidSave", vo);
					//insertData("usolver.com.cmm.dao.CommonMapper.insertEditMidSave", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
    
    
    /**
	 * 시스템테이블 G2S_EDITHISTORY에 편집이력을 저장한다.
	 * @param map - 저장할 정보가 담긴 EgovMap
	 * @return 저장된 row 수
	 * @exception Exception
	 */
    public int insertG2SEditHistory(SearchEditHisVO vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.insertData("usolver.com.cmm.dao.CommonMapper.insertG2SEditHistory", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	
    	return result;
    }
    
    public Map selectEditG2Data(Map map) throws Exception {
    	return (Map) commonMapper.getSelect("usolver.com.cmm.dao.CommonMapper.selectEditG2data", map);
    }
    
    public List<String> selectCloumName(String TableName) throws Exception {
    	return (List<String>) commonMapper.getSelectList("usolver.com.cmm.dao.CommonMapper.selectCloumName", TableName);
    }
    
    public int mergeLayerOrder(Map map) throws Exception {
    	return commonMapper.update("usolver.com.cmm.dao.CommonMapper.mergeLayerOrder", map);
    }
    public List<Map> selectLayerOrder(String userId) throws Exception {
    	return commonMapper.getSelectList("usolver.com.cmm.dao.CommonMapper.selectLayerOrder", userId);
    }
}
