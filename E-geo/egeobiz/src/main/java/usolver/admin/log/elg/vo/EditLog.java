package usolver.admin.log.elg.vo;

import java.io.Serializable;

/**
 * @Class Name : LoginLog.java
 * @Description : 접속 로그 관리를 위한 VO 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------      -------     -------------------
 *    2009. 3. 11.  이삼섭      최초생성
 *    2011. 7. 01.  이기하      패키지 분리(sym.log -> sym.log.clg)
 *    2011.09.14       서준식      화면에 검색일자를 표시하기위한 멤버변수 추가.
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
public class EditLog implements Serializable {

	private static final long serialVersionUID = 3492444929272088373L;

	/** 로그ID */
	private String logId;
	
	/** 로그발생일자 */
	private String logDate;

	/** 사용자ID */
	private String userId;

	/** 사용자명 */
	private String userName;
	
	private String userTel;
	
	private String userDept;
	
	private String userDeptNm;

	/** 접속IP */
	private String userIp;

	/** 편집종류 */
	private String editType;

	/** 테이블 */
	private String g2TableName;

	/** 키값 */
	private String g2Id;

	/** 백업데이터 */
	private String g2Data;
	
	private String svcName;
	
	private String methodName;
	
	private String processTime;
	

	/**
	 * 검색시작일
	 */
	private String searchBgnDe = "";
	/**
	 * 검색조건
	 */
	private String searchCnd = "";
	/**
	 * 검색종료일
	 */
	private String searchEndDe = "";
	/**
	 * 검색단어
	 */
	private String searchKeyword = "";
	/**
	 * 정렬순서(DESC,ASC)
	 */
	private String sortOrdr = "";

	/** 검색사용여부 */
    private String searchUseYn = "";

    /** 현재페이지 */
    private int pageIndex = 1;

    /** 페이지갯수 */
    private int pageUnit = 10;

    /** 페이지사이즈 */
    private int pageSize = 10;

    /** firstIndex */
    private int firstIndex = 1;

    /** lastIndex */
    private int lastIndex = 1;

    /** recordCountPerPage */
    private int recordCountPerPage = 10;

    /** rowNo  */
	private int rowNo = 0;

	/**
	 * 검색시작일_화면용
	 */
	private String searchBgnDeView = "";//2011.09.14

	/**
	 * 검색종료일_화면용
	 */
	private String searchEndDeView = "";//2011.09.14

	public String getLogDate() {
		return logDate;
	}
	public void setLogDate(String logDate) {
		this.logDate = logDate;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserIp() {
		return userIp;
	}
	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}
	public String getEditType() {
		return editType;
	}
	public void setEditType(String editType) {
		this.editType = editType;
	}
	public String getG2TableName() {
		return g2TableName;
	}
	public void setG2TableName(String g2TableName) {
		this.g2TableName = g2TableName;
	}
	public String getG2Id() {
		return g2Id;
	}
	public void setG2Id(String g2Id) {
		this.g2Id = g2Id;
	}
	public String getG2Data() {
		return g2Data;
	}
	public void setG2Data(String g2Data) {
		this.g2Data = g2Data;
	}
	public String getSearchEndDeView() {
		return searchEndDeView;
	}
	public void setSearchEndDeView(String searchEndDeView) {
		this.searchEndDeView = searchEndDeView;
	}
	public String getSearchBgnDeView() {
		return searchBgnDeView;
	}
	public void setSearchBgnDeView(String searchBgnDeView) {
		this.searchBgnDeView = searchBgnDeView;
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	
	public String getSearchBgnDe() {
		return searchBgnDe;
	}

	public void setSearchBgnDe(String searchBgnDe) {
		this.searchBgnDe = searchBgnDe;
	}

	public String getSearchCnd() {
		return searchCnd;
	}

	public void setSearchCnd(String searchCnd) {
		this.searchCnd = searchCnd;
	}

	public String getSearchEndDe() {
		return searchEndDe;
	}

	public void setSearchEndDe(String searchEndDe) {
		this.searchEndDe = searchEndDe;
	}

	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	public String getSortOrdr() {
		return sortOrdr;
	}

	public void setSortOrdr(String sortOrdr) {
		this.sortOrdr = sortOrdr;
	}

	public String getSearchUseYn() {
		return searchUseYn;
	}

	public void setSearchUseYn(String searchUseYn) {
		this.searchUseYn = searchUseYn;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageUnit() {
		return pageUnit;
	}

	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getRowNo() {
		return rowNo;
	}

	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}
	public String getUserTel() {
		return userTel;
	}
	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}
	public String getUserDept() {
		return userDept;
	}
	public void setUserDept(String userDept) {
		this.userDept = userDept;
	}
	public String getUserDeptNm() {
		return userDeptNm;
	}
	public void setUserDeptNm(String userDeptNm) {
		this.userDeptNm = userDeptNm;
	}
	public String getSvcName() {
		return svcName;
	}
	public void setSvcName(String svcName) {
		this.svcName = svcName;
	}
	public String getMethodName() {
		return methodName;
	}
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}
	public String getProcessTime() {
		return processTime;
	}
	public void setProcessTime(String processTime) {
		this.processTime = processTime;
	}

}
   