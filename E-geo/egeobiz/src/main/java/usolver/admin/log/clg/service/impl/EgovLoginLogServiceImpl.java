package usolver.admin.log.clg.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.log.clg.service.EgovLoginLogService;
import usolver.admin.log.clg.vo.LoginLog;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**
 * @Class Name : EgovLoginLogServiceImpl.java
 * @Description : 접속로그 관리를 위한 서비스 구현 클래스
 * @Modification Information
 *
 *       수정일       수정자         수정내용
 *      -------        -------     -------------------
 *    2009. 3. 11.     이삼섭        최초생성
 *    2011. 7. 01.     이기하        패키지 분리(stm.log -> sym.log.clg)
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
@Service("EgovLoginLogService")
public class EgovLoginLogServiceImpl extends AbstractServiceImpl implements
	EgovLoginLogService {
	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
    /** ID Generation */
	@Resource(name="egovLoginLogIdGnrService")
	private EgovIdGnrService egovLoginLogIdGnrService;

	/**
	 * 접속로그를 기록한다.
	 *
	 * @param LoginLog
	 */

	public int logInsertLoginLog(LoginLog loinLog) throws Exception {
		String logId = egovLoginLogIdGnrService.getNextStringId();
		
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  logId ="+logId);
		loinLog.setLogId(logId);
		
		//loginLogDAO.logInsertLoginLog(loinLog);
		
		int result = 0;
    	try {
			result = commonMapper.insertData("admin.logInsertLoginLog", loinLog);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;

	}

	/**
	 * 접속로그를 조회한다.
	 *
	 * @param loginLog
	 * @return loginLog
	 * @throws Exception
	 */

	public LoginLog selectLoginLog(LoginLog loginLog) throws Exception{

		//return loginLogDAO.selectLoginLog(loginLog);
		
		return (LoginLog)commonMapper.selectByPk("admin.selectLoginLog", loginLog);
	}

	/**
	 * 접속로그 목록을 조회한다.
	 *
	 * @param LoginLog
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List selectLoginLogList(LoginLog loinLog) throws Exception {
		//List _result = loginLogDAO.selectLoginLogList(loinLog);		
		return commonMapper.getSelectList("admin.selectLoginLogList", loinLog);
		
	}
	
	/**
	 * 로그 갯수를 조회한다. 
	 *
	 * @param LoginLog
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public int selectLoginLogCnt(LoginLog loinLog) throws Exception {
		
		 return commonMapper.getSelectCnt("admin.selectLoginLogInfCnt", loinLog);
	}
}
   