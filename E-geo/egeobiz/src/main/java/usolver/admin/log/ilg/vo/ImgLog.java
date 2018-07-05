package usolver.admin.log.ilg.vo;

import java.io.Serializable;

public class ImgLog implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 844437195285685478L;

	/** 로그ID */
	private String LOG_ID;
	
	/** 로그발생일자 */
	private String LOG_DATE;

	/** 사용자ID */
	private String USER_ID;

	/** 사용자명 */
	private String userName;
	
	private String userTel;
	
	private String userDept;
	
	private String userDeptNm;

	/** 접속IP */
	private String userIp;

	/** 구분 */
	private String IMG_STATE;

	/** 이미지 코드 */
	private String SAVE_IMG;
	

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

	public String getLOG_ID() {
		return LOG_ID;
	}

	public void setLOG_ID(String lOG_ID) {
		LOG_ID = lOG_ID;
	}

	public String getLOG_DATE() {
		return LOG_DATE;
	}

	public void setLOG_DATE(String lOG_DATE) {
		LOG_DATE = lOG_DATE;
	}

	public String getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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

	public String getUserIp() {
		return userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

	public String getIMG_STATE() {
		return IMG_STATE;
	}

	public void setIMG_STATE(String iMG_STATE) {
		IMG_STATE = iMG_STATE;
	}

	public String getSAVE_IMG() {
		return SAVE_IMG;
	}

	public void setSAVE_IMG(String sAVE_IMG) {
		SAVE_IMG = sAVE_IMG;
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

	public String getSearchBgnDeView() {
		return searchBgnDeView;
	}

	public void setSearchBgnDeView(String searchBgnDeView) {
		this.searchBgnDeView = searchBgnDeView;
	}

	public String getSearchEndDeView() {
		return searchEndDeView;
	}

	public void setSearchEndDeView(String searchEndDeView) {
		this.searchEndDeView = searchEndDeView;
	}
}
