package usolver.admin.code.service;

import java.util.List;

import usolver.admin.code.vo.CodeManageVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface EgovCodeManageService {

	/**
	 * 코드를 관리하기 위해 등록된 코드목록을 조회한다.
	 * @param codeManageVO - 코드 Vo
	 * @return List - 코드 목록
	 * 
	 * @param codeManageVO
	 */
	public List<EgovMap> selectCodeDomainList(CodeManageVO codeManageVO) throws Exception;
	public List<EgovMap> selectCodeList(CodeManageVO codeManageVO) throws Exception;
	/**
	 * 코드목록 총 갯수를 조회한다.
	 * @param codeManageVO - 코드 Vo
	 * @return int - 코드 카운트 수
	 * 
	 * @param codeManageVO
	 */
	public int selectCodeCnt(CodeManageVO codeManageVO) throws Exception;
	
	public int selectCodeDCheck(CodeManageVO codeManageVO) throws Exception;
	/**
	 * 등록된 코드의 상세정보를 조회한다.
	 * @param codeManageVO - 코드 Vo
	 * @return codeManageVO - 코드 Vo
	 * 
	 * @param codeManageVO
	 */
	public List<EgovMap> selectCodeDetail(CodeManageVO codeManageVO) throws Exception;

	/**
	 * 코드정보를 신규로 등록한다.
	 * @param codeManageVO - 코드 model
	 * 
	 * @param codeManageVO
	 */
	public void insertCodeDomain(CodeManageVO codeManageVO) throws Exception;
	public void insertCode(CodeManageVO codeManageVO) throws Exception;
	/**
	 * 기 등록된 코드정보를 수정한다.
	 * @param codeManageVO - 코드 model
	 * 
	 * @param codeManageVO
	 */
	public void updateCodeDomain(CodeManageVO codeManageVO) throws Exception;
	public void updateCode(CodeManageVO codeManageVO) throws Exception;
	/**
	 * 기 등록된 코드정보를 삭제한다.
	 * @param codeManageVO - 코드 model
	 * 
	 * @param codeManageVO
	 */
	public void deleteCodeDomain(CodeManageVO codeManageVO) throws Exception;
	public void deleteCode(CodeManageVO codeManageVO) throws Exception;
}
