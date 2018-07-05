package usolver.com.main.vo;

import java.io.*;

/**
 * @Class Name : LoginVO.java
 * @Description : Login VO class
 * @Modification Information
 * @
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.03.03    박지욱          최초 생성
 *
 *  @author 공통서비스 개발팀 박지욱
 *  @since 2009.03.03
 *  @version 1.0
 *  @see
 *  
 */
public class LoginVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8274004534207618049L;
	
	private int LOG_IDN;
	
	/** 아이디 */
	private String USER_ID;
	/** 이름 */
	private String USER_NAME;
	/** 비번 */
	private String PASSWORD;
	/** 부서 */
	private String USER_DEPT;
	private String USER_DEPT_NAME;

	private String REQ_DATE;
	private String ENABLED;
	
	private String USER_TEL;
	private String USER_DESC;
	private String PW_DATE;
	
	private String USER_AUTHOR_CODE;
	private String USER_SYS_CODE;
	
	private String USER_IP;
	
	/** 초기 맵 영역 */
	private String INIT_EXTENT;
	
	//0 : 권한없음, 1:신청중, 2: 권한있음, 3: 권한철회
	private int SYS_ADMIN = 0;
	private int SYS_EDITOR = 0;
	private int SYS_ROAD = 0;
	private int SYS_WATER = 0;
	private int SYS_SEWER = 0;
	
	private String SYSTEM;
	private String SYS_ID;
	private String SYS_TYPE;
	private int SYS_AUTH;
	
	public int getLOG_IDN() {
		return LOG_IDN;
	}
	public void setLOG_IDN(int lOG_IDN) {
		LOG_IDN = lOG_IDN;
	}
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getUSER_NAME() {
		return USER_NAME;
	}
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}
	public String getPASSWORD() {
		return PASSWORD;
	}
	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}
	public String getUSER_DEPT() {
		return USER_DEPT;
	}
	public void setUSER_DEPT(String uSER_DEPT) {
		USER_DEPT = uSER_DEPT;
	}
	public String getUSER_DEPT_NAME() {
		return USER_DEPT_NAME;
	}
	public void setUSER_DEPT_NAME(String uSER_DEPT_NAME) {
		USER_DEPT_NAME = uSER_DEPT_NAME;
	}
	public String getREQ_DATE() {
		return REQ_DATE;
	}
	public void setREQ_DATE(String rEQ_DATE) {
		REQ_DATE = rEQ_DATE;
	}
	public String getENABLED() {
		return ENABLED;
	}
	public void setENABLED(String eNABLED) {
		ENABLED = eNABLED;
	}
	public String getUSER_TEL() {
		return USER_TEL;
	}
	public void setUSER_TEL(String uSER_TEL) {
		USER_TEL = uSER_TEL;
	}
	public String getUSER_DESC() {
		return USER_DESC;
	}
	public void setUSER_DESC(String uSER_DESC) {
		USER_DESC = uSER_DESC;
	}
	public String getPW_DATE() {
		return PW_DATE;
	}
	public void setPW_DATE(String pW_DATE) {
		PW_DATE = pW_DATE;
	}
	
	public int getSYS_ADMIN() {
		return SYS_ADMIN;
	}
	public void setSYS_ADMIN(int sYS_ADMIN) {
		SYS_ADMIN = sYS_ADMIN;
	}
	public int getSYS_EDITOR() {
		return SYS_EDITOR;
	}
	public void setSYS_EDITOR(int sYS_EDITOR) {
		SYS_EDITOR = sYS_EDITOR;
	}
	public int getSYS_ROAD() {
		return SYS_ROAD;
	}
	public void setSYS_ROAD(int sYS_ROAD) {
		SYS_ROAD = sYS_ROAD;
	}
	public int getSYS_WATER() {
		return SYS_WATER;
	}
	public void setSYS_WATER(int sYS_WATER) {
		SYS_WATER = sYS_WATER;
	}
	public int getSYS_SEWER() {
		return SYS_SEWER;
	}
	public void setSYS_SEWER(int sYS_SEWER) {
		SYS_SEWER = sYS_SEWER;
	}
	public String getSYS_ID() {
		return SYS_ID;
	}
	public void setSYS_ID(String sYS_ID) {
		SYS_ID = sYS_ID;
	}
	public String getSYS_TYPE() {
		return SYS_TYPE;
	}
	public void setSYS_TYPE(String sYS_TYPE) {
		SYS_TYPE = sYS_TYPE;
	}
	public int getSYS_AUTH() {
		return SYS_AUTH;
	}
	public void setSYS_AUTH(int sYS_AUTH) {
		SYS_AUTH = sYS_AUTH;
	}
	public String getSYSTEM() {
		return SYSTEM;
	}
	public void setSYSTEM(String sYSTEM) {
		SYSTEM = sYSTEM;
	}
	public String getUSER_AUTHOR_CODE() {
		return USER_AUTHOR_CODE;
	}
	public void setUSER_AUTHOR_CODE(String uSER_AUTHOR_CODE) {
		USER_AUTHOR_CODE = uSER_AUTHOR_CODE;
	}
	public String getUSER_SYS_CODE() {
		return USER_SYS_CODE;
	}
	public void setUSER_SYS_CODE(String uSER_SYS_CODE) {
		USER_SYS_CODE = uSER_SYS_CODE;
	}
	public String getUSER_IP() {
		return USER_IP;
	}
	public void setUSER_IP(String uSER_IP) {
		USER_IP = uSER_IP;
	}
	public String getINIT_EXTENT() {
		return INIT_EXTENT;
	}
	public void setINIT_EXTENT(String iNIT_EXTENT) {
		INIT_EXTENT = iNIT_EXTENT;
	}
}
