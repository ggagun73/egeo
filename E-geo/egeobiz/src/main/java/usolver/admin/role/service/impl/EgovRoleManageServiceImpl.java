package usolver.admin.role.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.role.service.EgovRoleManageService;
import usolver.admin.role.vo.RoleManage;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 롤관리에 관한 ServiceImpl 클래스를 정의한다.
 * @author 공통서비스 개발팀 이문준
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.11  이문준          최초 생성
 *
 * </pre>
 */

@Service("egovRoleManageService")
public class EgovRoleManageServiceImpl extends AbstractServiceImpl implements EgovRoleManageService {

	@Resource(name="roleManageDAO")
	public RoleManageDAO roleManageDAO;
	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
	/**
	 * 등록된 롤 정보 조회
	 * @param roleManage RoleManage
	 * @return RoleManage
	 * @exception Exception
	 */
	public RoleManage selectRole(RoleManage roleManage) throws Exception {
		return (RoleManage)commonMapper.selectByPk("admin.selectRole", roleManage);
	}

	/**
	 * 등록된 롤 정보 목록 조회
	 * @param roleManage RoleManage
	 * @return List<RoleManage>
	 * @exception Exception
	 */
	public List<EgovMap> selectRoleList(RoleManage roleManage) throws Exception {
		return commonMapper.getSelectList("admin.selectRoleList", roleManage);
	}

	/**
	 * 불필요한 롤정보를 화면에 조회하여 데이터베이스에서 삭제
	 * @param roleManage RoleManage
	 * @exception Exception
	 */
	public int deleteRole(RoleManage roleManage) throws Exception {
		
		int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteRole", roleManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}
	
	/**
	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 수정
	 * @param roleManage RoleManage
	 * @exception Exception
	 */
	public int updateRole(RoleManage roleManage) throws Exception {
		
		int result = 0;

    	try {
			result = commonMapper.update("admin.updateRole", roleManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;    	
    	
	}
	
	/**
	 * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록
	 * @param roleManage RoleManage
	 * @param roleManage RoleManage
	 * @return RoleManage
	 * @exception Exception
	 */
	public int insertRole(RoleManage roleManage) throws Exception {

		int result = 0;

    	try {
			result = commonMapper.update("admin.insertRole", roleManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    	
	}
	
    /**
	 * 목록조회 카운트를 반환한다
	 * @param roleManage RoleManage
	 * @return int
	 * @exception Exception
	 */
	public int selectRoleListTotCnt(RoleManage roleManage) throws Exception {
		return commonMapper.getSelectCnt("admin.selectRoleListTotCnt", roleManage);
	}
	
	/**
	 * 등록된 모든 롤 정보 목록 조회
	 * @param roleManage - 등록할 정보가 담긴 RoleManage
	 * @return List
	 * @exception Exception
	 */
	public List<EgovMap> selectRoleAllList(RoleManage roleManage) throws Exception {
		return commonMapper.getSelectList("admin.selectRoleAllList", roleManage);
	} 

}