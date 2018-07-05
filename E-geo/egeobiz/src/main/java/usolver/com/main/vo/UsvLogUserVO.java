package usolver.com.main.vo;

import java.util.*;

public class UsvLogUserVO {
	private String LOG_DATE;
	private int LOG_IDN;
	private String USER_ID;
	private String USER_NAME;
	private String USER_DEPT;
	private String USER_DEPT_M_UPPER;
	private String SYS_ID;
	private String COM_NAME;
	private String COM_ADDR;
	private Date CON_TIME;
	private Date DISCON_TIME;
	private int CONNECTING_TIME;
	public String getLOG_DATE() {
		return LOG_DATE;
	}
	public void setLOG_DATE(String lOG_DATE) {
		LOG_DATE = lOG_DATE;
	}
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
	public String getUSER_DEPT() {
		return USER_DEPT;
	}
	public void setUSER_DEPT(String uSER_DEPT) {
		USER_DEPT = uSER_DEPT;
	}
	public String getSYS_ID() {
		return SYS_ID;
	}
	public void setSYS_ID(String sYS_ID) {
		SYS_ID = sYS_ID;
	}
	public String getCOM_NAME() {
		return COM_NAME;
	}
	public void setCOM_NAME(String cOM_NAME) {
		COM_NAME = cOM_NAME;
	}
	public String getCOM_ADDR() {
		return COM_ADDR;
	}
	public void setCOM_ADDR(String cOM_ADDR) {
		COM_ADDR = cOM_ADDR;
	}
	public Date getCON_TIME() {
		return CON_TIME;
	}
	public void setCON_TIME(Date cON_TIME) {
		CON_TIME = cON_TIME;
	}
	public Date getDISCON_TIME() {
		return DISCON_TIME;
	}
	public void setDISCON_TIME(Date dISCON_TIME) {
		DISCON_TIME = dISCON_TIME;
	}
	public int getCONNECTING_TIME() {
		return CONNECTING_TIME;
	}
	public void setCONNECTING_TIME(int cONNECTING_TIME) {
		CONNECTING_TIME = cONNECTING_TIME;
	}
	public String getUSER_DEPT_M_UPPER() {
		return USER_DEPT_M_UPPER;
	}
	public void setUSER_DEPT_M_UPPER(String uSER_DEPT_M_UPPER) {
		USER_DEPT_M_UPPER = uSER_DEPT_M_UPPER;
	}
	
}
