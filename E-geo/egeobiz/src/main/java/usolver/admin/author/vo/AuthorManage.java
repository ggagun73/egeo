package usolver.admin.author.vo;

import usolver.com.cmm.vo.AdmDefaultVO;

/**
 * 권한관리에 대한 model 클래스를 정의한다.
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

public class AuthorManage extends AdmDefaultVO{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 권한관리
	 */	
	private AuthorManage authorManage;
	/**
	 * 권한코드
	 */
	private String authorCode;
	/**
	 * 권한등록일자
	 */
	private String authorCreatDe;
	/**
	 * 권한코드설명
	 */
	private String authorDc;
	/**
	 * 권한 명
	 */
	private String authorNm;
	
	private String userId;
	
	private String sysCode;
	private String reqDate;
	private String approveDate;
	private String compAuth;
	private String authorOrdr;
	private String authorType; 
	
	private String regYn;

	
	
	/**
	 * authorManage attribute 를 리턴한다.
	 * @return AuthorManage
	 */
	public AuthorManage getAuthorManage() {
		return authorManage;
	}
	/**
	 * authorManage attribute 값을 설정한다.
	 * @param authorManage AuthorManage 
	 */
	public void setAuthorManage(AuthorManage authorManage) {
		this.authorManage = authorManage;
	}
	/**
	 * authorCode attribute 를 리턴한다.
	 * @return String
	 */
	public String getAuthorCode() {
		return authorCode;
	}
	/**
	 * authorCode attribute 값을 설정한다.
	 * @param authorCode String 
	 */
	public void setAuthorCode(String authorCode) {
		this.authorCode = authorCode;
	}
	/**
	 * authorCreatDe attribute 를 리턴한다.
	 * @return String
	 */
	public String getAuthorCreatDe() {
		return authorCreatDe;
	}
	/**
	 * authorCreatDe attribute 값을 설정한다.
	 * @param authorCreatDe String 
	 */
	public void setAuthorCreatDe(String authorCreatDe) {
		this.authorCreatDe = authorCreatDe;
	}
	/**
	 * authorDc attribute 를 리턴한다.
	 * @return String
	 */
	public String getAuthorDc() {
		return authorDc;
	}
	/**
	 * authorDc attribute 값을 설정한다.
	 * @param authorDc String 
	 */
	public void setAuthorDc(String authorDc) {
		this.authorDc = authorDc;
	}
	/**
	 * authorNm attribute 를 리턴한다.
	 * @return String
	 */
	public String getAuthorNm() {
		return authorNm;
	}
	/**
	 * authorNm attribute 값을 설정한다.
	 * @param authorNm String 
	 */
	public void setAuthorNm(String authorNm) {
		this.authorNm = authorNm;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSysCode() {
		return sysCode;
	}
	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}
	public String getReqDate() {
		return reqDate;
	}
	public void setReqDate(String reqDate) {
		this.reqDate = reqDate;
	}
	public String getApproveDate() {
		return approveDate;
	}
	public void setApproveDate(String approveDate) {
		this.approveDate = approveDate;
	}
	public String getCompAuth() {
		return compAuth;
	}
	public void setCompAuth(String compAuth) {
		this.compAuth = compAuth;
	}
	public String getAuthorOrdr() {
		return authorOrdr;
	}
	public void setAuthorOrdr(String authorOrdr) {
		this.authorOrdr = authorOrdr;
	}
	public String getAuthorType() {
		return authorType;
	}
	public void setAuthorType(String authorType) {
		this.authorType = authorType;
	}
	public String getRegYn() {
		return regYn;
	}
	public void setRegYn(String regYn) {
		this.regYn = regYn;
	}
	


	

}
