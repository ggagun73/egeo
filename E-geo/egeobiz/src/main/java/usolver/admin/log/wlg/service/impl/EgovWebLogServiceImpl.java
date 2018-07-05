package usolver.admin.log.wlg.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.log.elg.vo.EditLog;
import usolver.admin.log.wlg.service.EgovWebLogService;
import usolver.admin.log.wlg.vo.WebLog;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Class Name : EgovWebLogServiceImpl.java
 * @Description : 웹로그 관리를 위한 서비스 구현 클래스
 * @Modification Information
 *
 *    수정일         수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 11.   이삼섭         최초생성
 *    2011. 7. 01.   이기하         패키지 분리(sym.log -> sym.log.wlg)
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
@Service("EgovWebLogService")
public class EgovWebLogServiceImpl extends AbstractServiceImpl implements
	EgovWebLogService {

	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;    

    /** ID Generation */
	@Resource(name="egovWebLogIdGnrService")
	private EgovIdGnrService egovWebLogIdGnrService;

	/**
	 * 웹 로그를 기록한다.
	 *
	 * @param WebLog
	 */

	public int logInsertWebLog(WebLog webLog) throws Exception {
		String requstId = egovWebLogIdGnrService.getNextStringId();
		webLog.setRequstId(requstId);
	
		int result = 0;
    	try {
			result = commonMapper.insertData("admin.logInsertWebLog", webLog);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}

	/**
	 * 웹 로그정보를 요약한다.
	 *
	 * @param
	 */

	public int logInsertWebLogSummary() throws Exception {

		int result = 0;
    	try {
			result = commonMapper.insertData("admin.logInsertWebLogSummary", "");
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}

	/**
	 * 웹 로그정보를 조회한다.
	 *
	 * @param webLog
	 * @return webLog
	 * @throws Exception
	 */

	public WebLog selectWebLog(WebLog webLog) throws Exception{
		
		 return (WebLog)commonMapper.selectByPk("admin.selectWebLog", webLog);
	}

	/**
	 * 웹 로그정보 목록을 조회한다.
	 *
	 * @param WebLog
	 */

	public Map<String, Object> selectWebLogInf(WebLog webLog) throws Exception {
				
		List<?> _result = commonMapper.getSelectList("admin.selectWebLogInf", webLog);
		int _cnt = commonMapper.getSelectCnt("admin.selectWebLogInfCnt", webLog);

		Map<String, Object> _map = new HashMap<String, Object>();
		_map.put("resultList", _result);
		_map.put("resultCnt", Integer.toString(_cnt));

		return _map;
	}

}
   