package usolver.admin.author.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.author.service.EgovAuthorManageService;
import usolver.admin.author.vo.AuthorManage;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 권한관리에 관한 ServiceImpl 클래스를 정의한다.
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

@Service("egovAuthorManageService")
public class EgovAuthorManageServiceImpl extends AbstractServiceImpl implements EgovAuthorManageService {
    
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;

    /**
	 * 권한 목록을 조회한다.
	 * @param authorManageVO AuthorManageVO
	 * @return List<AuthorManageVO>
	 * @exception Exception
	 */
    public List<EgovMap> selectAuthorList(AuthorManage authorManage) throws Exception {
    	 return commonMapper.getSelectList("admin.selectAuthorList", authorManage);
    }
    
    public List<EgovMap> selectAuthorUserList(AuthorManage authorManage) throws Exception {
        return commonMapper.getSelectList("admin.selectAuthorUserList", authorManage);
    }
    
    /**
  	 * 권한 목록 카운트를 조회한다.
  	 * @param authorManageVO AuthorManageVO
  	 * @return int
  	 * @exception Exception
  	 */
      public int selectAuthorCnt(AuthorManage authorManage) throws Exception {
      	 return commonMapper.getSelectCnt("admin.selectAuthorListTotCnt", authorManage);
      }    
      
    /**
	 * 권한을 조회한다.
	 * @param authorManageVO AuthorManageVO
	 * @return AuthorManageVO
	 * @exception Exception
	 */
    public EgovMap selectAuthor(AuthorManage authorManage) throws Exception {
    	return (EgovMap) commonMapper.selectByPk("admin.selectAuthor", authorManage);
    }

	
    /**
	 * 권한을 조회한다.
	 * @param authorManageVO AuthorManageVO
	 * @return AuthorManageVO
	 * @exception Exception
	 */
	public List<EgovMap> selectAuthorSystem(AuthorManage authorManage) throws Exception {
		 return commonMapper.list("admin.selectAuthorSystem", authorManage);
    }   
	
	/**
	 * 권한을 등록한다.
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
    public int insertAuthor(AuthorManage authorManage) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertAuthor", authorManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    /**
	 * 권한을 수정한다.
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
    public int updateAuthor(AuthorManage authorManage) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.update("admin.updateAuthor", authorManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    /**
	 * 권한을 삭제한다.
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
    public int deleteAuthor(AuthorManage authorManage) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteAuthor", authorManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
	
    /**
	 * 권한을 삭제한다.
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
    public int deleteAllAuthorMenu(AuthorManage authorManage) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteAllAuthor", authorManage);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
}
