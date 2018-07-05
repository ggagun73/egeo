package usolver.admin.code.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.code.service.EgovCodeManageService;
import usolver.admin.code.vo.CodeManageVO;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("egovCodeManageService")
public class EgovCodeManageServiceImpl extends AbstractServiceImpl implements EgovCodeManageService {
	
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;

    /**
	 * 코드를 관리하기 위해 등록된 코드목록을 조회한다.
	 * @param codeManageVO - 코드 Vo
	 * @return List - 코드 목록
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectCodeDomainList(CodeManageVO codeManageVO) throws Exception {
		return commonMapper.getSelectList("admin.selectCodeDomainList", codeManageVO);
	}
	
	public List<EgovMap> selectCodeList(CodeManageVO codeManageVO) throws Exception {
		return commonMapper.getSelectList("admin.selectCodeList", codeManageVO);
	}
    /**
	 * 코드목록 총 갯수를 조회한다.
	 * @param codeManageVO - 코드 Vo
	 * @return int - 코드 카운트 수
	 * @exception Exception
	 */
    public int selectCodeCnt(CodeManageVO codeManageVO) throws Exception {        
        return commonMapper.getSelectCnt("admin.selectCodeCnt", codeManageVO);
    }
    
    public int selectCodeDCheck(CodeManageVO codeManageVO) throws Exception {        
        return commonMapper.getSelectCnt("admin.selectCodeDCheck", codeManageVO);
    }
    
	/**
	 * 등록된 코드의 상세정보를 조회한다.
	 * @param codeManageVO - 코드 Vo
	 * @return codeManageVO - 코드 Vo
	 * 
	 * @param bannerVO
	 */
	public List<EgovMap> selectCodeDetail(CodeManageVO codeManageVO) throws Exception {
		return commonMapper.getSelectList("admin.selectCodeDetail", codeManageVO);
	}

	/**
	 * 코드정보를 신규로 등록한다.
	 * @param codeManageVO - 코드 model
	 */
	public void insertCodeDomain(CodeManageVO codeManageVO) throws Exception {
		commonMapper.insert("admin.insertCodeDomain", codeManageVO);
	}
	
	public void insertCode(CodeManageVO codeManageVO) throws Exception {
		commonMapper.insert("admin.insertCode", codeManageVO);
	}
	
	/**
	 * 기 등록된 코드정보를 수정한다.
	 * @param codeManageVO - 코드 model
	 */
	public void updateCodeDomain(CodeManageVO codeManageVO) throws Exception {
		commonMapper.update("admin.updateCodeDomain", codeManageVO);
	}
	public void updateCode(CodeManageVO codeManageVO) throws Exception {
		commonMapper.update("admin.updateCode", codeManageVO);
	}
	/**
	 * 기 등록된 코드정보를 삭제한다.
	 * @param codeManageVO - 코드 model
	 * 
	 * @param banner
	 */
	public void deleteCodeDomain(CodeManageVO codeManageVO) throws Exception {
		commonMapper.delete("admin.deleteCodeDomain", codeManageVO);
	}
	public void deleteCode(CodeManageVO codeManageVO) throws Exception {
		commonMapper.delete("admin.deleteCode", codeManageVO);
	}
	
}
