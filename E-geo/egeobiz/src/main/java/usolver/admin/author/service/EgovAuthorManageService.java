package usolver.admin.author.service;

import java.util.List;

import usolver.admin.author.vo.AuthorManage;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 권한관리에 관한 서비스 인터페이스 클래스를 정의한다.
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
 *   2009.03.20  이문준          최초 생성
 *
 * </pre>
 */

public interface EgovAuthorManageService {
    /**
	 * 모든 권한목록을 조회한다.
	 * @param authorManageVO AuthorManageVO
	 * @return List<AuthorManageVO>
	 * @exception Exception
	 */
	public List<EgovMap> selectAuthorList(AuthorManage authorManage) throws Exception;
	
	public List<EgovMap> selectAuthorUserList(AuthorManage authorManage) throws Exception;
	
	/**
	 * 목록조회 카운트를 반환한다
	 * @param authorManageVO AuthorManageVO
	 * @return int
	 * @exception Exception
	 */
	public int selectAuthorCnt(AuthorManage authorManage) throws Exception;	
	
	/**
	 * 개별사용자에게 할당된 권한 조회
	 * @param authorManageVO AuthorManageVO
	 * @exception Exception
	 */
	public EgovMap selectAuthor(AuthorManage authorManage) throws Exception;
	
	/**
	 * 개별사용자에게 할당된 시스템 리스트 조회
	 * @param authorManageVO AuthorManageVO
	 * @return List<AuthorManageVO>
	 * @exception Exception
	 */
	public List<EgovMap> selectAuthorSystem(AuthorManage authorManage) throws Exception;
	
	/**
	 * 사용자의 시스테접근권한를 화면에서 입력하여 입력항목의 정합성을 체크하고 데이터베이스에 저장
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
	public int insertAuthor(AuthorManage authorManage) throws Exception;
	
	/**
	 * 화면에 조회된 사용자권한정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
 	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
	public int updateAuthor(AuthorManage authorManage) throws Exception;
	
	/**
	 * 시스템 사용자중 불필요한 시스템권한정보를 화면에 조회하여 데이터베이스에서 삭제
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
	public int deleteAuthor(AuthorManage authorManage) throws Exception;
	
	/**
	 * 시스템 사용자중 불필요한 시스템권한정보를 화면에 조회하여 데이터베이스에서 삭제
	 * @param authorManage AuthorManage
	 * @exception Exception
	 */
	public int deleteAllAuthorMenu(AuthorManage authorManage) throws Exception;
}
