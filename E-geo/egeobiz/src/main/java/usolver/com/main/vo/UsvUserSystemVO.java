package usolver.com.main.vo;

import usolver.com.cmm.vo.DefaultVO;

public class UsvUserSystemVO extends DefaultVO {
	private int SEQ;
	private String USER_ID;
	private String SYS_ID;
	private String USER_NAME;
	private String USER_DEPT;
	private int SYS_AUTH = 0;
	private String CONNECTED;
	private String CON_TIME;
	private String DIS_CONTIME;
	private String COM_NAM;
	private String COM_ADDR;
	private String REQUEST_TIME;
	private String APPROVE_TIME;
	private String APPROVE_STATE;
	private String BOOK_EDIT;
	private String SEARCH_FLAG;
	private String SEARCH_VALUE;
	private String USER_PW;
	
	public int getSEQ() {
		return SEQ;
	}
	public void setSEQ(int sEQ) {
		SEQ = sEQ;
	}
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getSYS_ID() {
		return SYS_ID;
	}
	public void setSYS_ID(String sYS_ID) {
		SYS_ID = sYS_ID;
	}
	public int getSYS_AUTH() {
		return SYS_AUTH;
	}
	public void setSYS_AUTH(int sYS_AUTH) {
		SYS_AUTH = sYS_AUTH;
	}
	public String getCONNECTED() {
		return CONNECTED;
	}
	public void setCONNECTED(String cONNECTED) {
		CONNECTED = cONNECTED;
	}
	public String getCOM_NAM() {
		return COM_NAM;
	}
	public void setCOM_NAM(String cOM_NAM) {
		COM_NAM = cOM_NAM;
	}
	public String getCOM_ADDR() {
		return COM_ADDR;
	}
	public void setCOM_ADDR(String cOM_ADDR) {
		COM_ADDR = cOM_ADDR;
	}
	public String getBOOK_EDIT() {
		return BOOK_EDIT;
	}
	public void setBOOK_EDIT(String bOOK_EDIT) {
		BOOK_EDIT = bOOK_EDIT;
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
	public String getCON_TIME() {
		return CON_TIME;
	}
	public void setCON_TIME(String cON_TIME) {
		CON_TIME = cON_TIME;
	}
	public String getDIS_CONTIME() {
		return DIS_CONTIME;
	}
	public void setDIS_CONTIME(String dIS_CONTIME) {
		DIS_CONTIME = dIS_CONTIME;
	}
	public String getREQUEST_TIME() {
		return REQUEST_TIME;
	}
	public void setREQUEST_TIME(String rEQUEST_TIME) {
		REQUEST_TIME = rEQUEST_TIME;
	}
	public String getAPPROVE_TIME() {
		return APPROVE_TIME;
	}
	public void setAPPROVE_TIME(String aPPROVE_TIME) {
		APPROVE_TIME = aPPROVE_TIME;
	}
	public String getAPPROVE_STATE() {
		return APPROVE_STATE;
	}
	public void setAPPROVE_STATE(String aPPROVE_STATE) {
		APPROVE_STATE = aPPROVE_STATE;
	}
	public String getSEARCH_FLAG() {
		return SEARCH_FLAG;
	}
	public void setSEARCH_FLAG(String sEARCH_FLAG) {
		SEARCH_FLAG = sEARCH_FLAG;
	}
	public String getSEARCH_VALUE() {
		return SEARCH_VALUE;
	}
	public void setSEARCH_VALUE(String sEARCH_VALUE) {
		SEARCH_VALUE = sEARCH_VALUE;
	}
	public String getUSER_PW() {
		return USER_PW;
	}
	public void setUSER_PW(String uSER_PW) {
		USER_PW = uSER_PW;
	}
	
}
