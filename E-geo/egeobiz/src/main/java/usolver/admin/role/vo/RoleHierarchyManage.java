package usolver.admin.role.vo;

import egovframework.com.cmm.ComDefaultVO;

/**
 * 롤 상하관계 관리에 대한 model 클래스를 정의한다.
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

public class RoleHierarchyManage extends ComDefaultVO {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	private String parentAuthor;
	
	private String childAuthor;

	public String getParentAuthor() {
		return parentAuthor;
	}

	public void setParentAuthor(String parentAuthor) {
		this.parentAuthor = parentAuthor;
	}

	public String getChildAuthor() {
		return childAuthor;
	}

	public void setChildAuthor(String childAuthor) {
		this.childAuthor = childAuthor;
	}

	
	
}