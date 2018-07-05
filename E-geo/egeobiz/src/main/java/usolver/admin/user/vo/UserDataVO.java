package usolver.admin.user.vo;

import java.io.Serializable;

/**
 * 사용자정보 VO클래스로서일반회원, 기업회원, 업무사용자의  비지니스로직 처리시 기타조건성 항을 구성한다.
 * @author 공통서비스 개발팀 조재영
 * @since 2009.04.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.04.10  조재영          최초 생성
 *
 * </pre>
 */
public class UserDataVO implements Serializable {
	
    /** 순서 고유아이디 */
    private int seq;
    
    /** 사용자 아이디 */
    private String userId = "";

    private String[] functionList;
    
    private int menuNo;
    
    private String author;
    
	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getUserId() {
		
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String[] getFunctionList() {
		return functionList;
	}

	public void setFunctionList(String[] functionList) {
		this.functionList = functionList;
	}

	public int getMenuNo() {
		return menuNo;
	}

	public void setMenuNo(int menuNo) {
		this.menuNo = menuNo;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
	
}
