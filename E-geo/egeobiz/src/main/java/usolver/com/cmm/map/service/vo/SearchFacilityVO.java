package usolver.com.cmm.map.service.vo;

import java.util.Map;

/**
 * 시설물 검색 - Yu_mk
 * 
 * @Modification Information
 *  
 *  Copyright (C)  All right reserved.
 */
public class SearchFacilityVO{
	
	private String FID;
    private String G2_TYPE;
    private String G2_BASEID;
    private String G2_ORDER;
    private String G2_NAME;
    private String G2_TABLENAME;
    private String G2_ALIAS;
    private String OPTION;
    private String QUERY;
    private String VAL;
    private String[] G2_ID_MAP;
	public String getFID() {
		return FID;
	}
	public void setFID(String g2_ID) {
		FID = g2_ID;
	}
	public String getG2_TYPE() {
		return G2_TYPE;
	}
	public void setG2_TYPE(String g2_TYPE) {
		G2_TYPE = g2_TYPE;
	}
	public String getG2_BASEID() {
		return G2_BASEID;
	}
	public void setG2_BASEID(String g2_BASEID) {
		G2_BASEID = g2_BASEID;
	}
	public String getG2_ORDER() {
		return G2_ORDER;
	}
	public void setG2_ORDER(String g2_ORDER) {
		G2_ORDER = g2_ORDER;
	}
	public String getG2_NAME() {
		return G2_NAME;
	}
	public void setG2_NAME(String g2_NAME) {
		G2_NAME = g2_NAME;
	}
	public String getOPTION() {
		return OPTION;
	}
	public void setOPTION(String oPTION) {
		OPTION = oPTION;
	}
	public String getQUERY() {
		return QUERY;
	}
	public void setQUERY(String qUERY) {
		QUERY = qUERY;
	}
	public String getVAL() {
		return VAL;
	}
	public void setVAL(String vAL) {
		VAL = vAL;
	}
	public String getG2_TABLENAME() {
		return G2_TABLENAME;
	}
	public void setG2_TABLENAME(String g2_TABLENAME) {
		G2_TABLENAME = g2_TABLENAME;
	}
	public String getG2_ALIAS() {
		return G2_ALIAS;
	}
	public void setG2_ALIAS(String g2_ALIAS) {
		G2_ALIAS = g2_ALIAS;
	}
	public String[] getG2_ID_MAP() {
		return G2_ID_MAP;
	}
	public void setG2_ID_MAP(String[] g2_ID_MAP) {
		G2_ID_MAP = g2_ID_MAP;
	}
}
