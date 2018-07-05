package usolver.com.main.vo;

import java.util.*;

public class UsvUserCompVO {
	private int SEQ;
	private String USER_ID;
	private String SYS_TYPE;
	private String CATEGORY;
	private String PROG_ID;
	private String CAPTION;
	private Date REQUEST_TIME;
	private Date APPROVE_TIME;
	private int COMP_AUTH = 0;
	private String SEQS;

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
	public String getSYS_TYPE() {
		return SYS_TYPE;
	}
	public void setSYS_TYPE(String sYS_TYPE) {
		SYS_TYPE = sYS_TYPE;
	}
	public String getCATEGORY() {
		return CATEGORY;
	}
	public void setCATEGORY(String cATEGORY) {
		CATEGORY = cATEGORY;
	}
	public String getPROG_ID() {
		return PROG_ID;
	}
	public void setPROG_ID(String pROG_ID) {
		PROG_ID = pROG_ID;
	}
	public String getCAPTION() {
		return CAPTION;
	}
	public void setCAPTION(String cAPTION) {
		CAPTION = cAPTION;
	}
	public Date getREQUEST_TIME() {
		return REQUEST_TIME;
	}
	public void setREQUEST_TIME(Date rEQUEST_TIME) {
		REQUEST_TIME = rEQUEST_TIME;
	}
	public Date getAPPROVE_TIME() {
		return APPROVE_TIME;
	}
	public void setAPPROVE_TIME(Date aPPROVE_TIME) {
		APPROVE_TIME = aPPROVE_TIME;
	}
	public int getCOMP_AUTH() {
		return COMP_AUTH;
	}
	public void setCOMP_AUTH(int cOMP_AUTH) {
		COMP_AUTH = cOMP_AUTH;
	}
	public String getSEQS() {
		return SEQS;
	}
	public void setSEQS(String sEQS) {
		SEQS = sEQS;
	}
}
