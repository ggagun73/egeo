package usolver.admin.log.elg.service;

import java.util.List;
import java.util.Map;

import usolver.admin.log.elg.vo.EditLog;
import usolver.admin.log.elg.vo.LayerLog;
import egovframework.rte.psl.dataaccess.util.EgovMap;


/**
 * @Class Name : EditLogService.java
 * @Description : 로그관리(편집)를 위한 서비스 인터페이스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------      -------     -------------------
 *    2009. 3. 11.  이삼섭      최초생성
 *    2011. 7. 01.  이기하      패키지 분리(sym.log -> sym.log.lgm)
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
public interface EditLogService {

	/**
	 * 편집 로그정보를 생성한다.
	 * 
	 * @param SysLog
	 */
	public int logInsertEditLog(EditLog editLog) throws Exception;

	/**
	 * 편집 로그정보를 요약한다.
	 * 
	 * @param 
	 */
	public  Map<String, Object> selectEditLogInf(EditLog editLog) throws Exception;

	/**
	 * 편집로그를 조회한다.
	 * 
	 * @param sysLog
	 * @return sysLog
	 * @throws Exception 
	 */
	public EditLog selectEditLog(EditLog editLog) throws Exception;
	
	/**
	 * 레이어 편집 로그정보 목록을 조회한다.
	 *
	 * @param LayerLog
	 */
	public Map<String, Object> selectLayerLogInf(LayerLog layerLog) throws Exception;
	
	
}
