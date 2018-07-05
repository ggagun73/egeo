package usolver.admin.log.elg.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.log.elg.service.EditLogService;
import usolver.admin.log.elg.vo.EditLog;
import usolver.admin.log.elg.vo.LayerLog;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : EditLogServiceImpl.java
 * @Description : 로그관리(편집)를 위한 서비스 구현 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2016 9. 11.     김수예
 *
 * @author 공통 서비스 개발팀 김수예
 * @since  2016 9. 11.
 * @version
 * @see
 *
 */
@Service("EditLogService")
public class EditLogServiceImpl extends AbstractServiceImpl implements EditLogService {

	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;

	/**
	 * 편집 로그정보를 생성한다.
	 * 
	 * @param SysLog
	 */
	public int logInsertEditLog(EditLog editLog) throws Exception {
		// TODO Auto-generated method stub		
		int result = 0;
    	try {
			result = commonMapper.insertData("admin.logInsertEditLog", editLog);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}

	/**
	 * 편집 로그정보를 조회한다.
	 * 
	 * @param sysLog
	 * @return sysLog
	 * @throws Exception 
	 */
	public Map<String, Object> selectEditLogInf(EditLog editLog) throws Exception{
			 
		List<?> _result = commonMapper.getSelectList("admin.selectEditLogInf", editLog);
		int _cnt = commonMapper.getSelectCnt("admin.selectEditLogCnt", editLog);

		Map<String, Object> _map = new HashMap<String, Object>();
		_map.put("resultList", _result);
		_map.put("resultCnt", Integer.toString(_cnt));

		return _map;
	}	

	/**
	 * 편집 로그정보를 조회한다.
	 * 
	 * @param sysLog
	 * @return sysLog
	 * @throws Exception 
	 */
	public EditLog selectEditLog(EditLog editLog) throws Exception{
		
		 return (EditLog)commonMapper.selectByPk("admin.selectEditLog", editLog);
	}	
	
	
	/**
	 * 레이어 로그정보 목록을 조회한다.
	 *
	 * @param LayerLog
	 */
	public Map<String, Object> selectLayerLogInf(LayerLog layerLog) throws Exception {
		List<?> _result = commonMapper.getSelectList("admin.selectLayerLogInf", layerLog);
		int _cnt = commonMapper.getSelectCnt("admin.selectLayerLogInfCnt", layerLog);

		Map<String, Object> _map = new HashMap<String, Object>();
		_map.put("resultList", _result);
		_map.put("resultCnt", Integer.toString(_cnt));

		return _map;
	}
}
