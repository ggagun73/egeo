package usolver.com.cmm.map.service.vo;

/**
 * 위치검색 : 주소 정보
 *
 * @Class Name : SearchJUSOVO.java
 * @Description : SearchJUSOVO class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-09-11
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class SearchJUSOVO{
	
	private Integer FID;
	private String BJD_NAM;
	private String BJD_CDE;
	private String JIBUN;
	private String SAN;
	private String BONBUN;
	private String BOOBUN;
	
	
	public Integer getFID() {
		return FID;
	}
	public void setFID(Integer g2_ID) {
		FID = g2_ID;
	}
	public String getBJD_NAM() {
		return BJD_NAM;
	}
	public void setBJD_NAM(String bJD_NAM) {
		BJD_NAM = bJD_NAM;
	}
	
	public String getBJD_CDE() {
		return BJD_CDE;
	}
	public void setBJD_CDE(String bJD_CDE) {
		BJD_CDE = bJD_CDE;
	}
	public String getJIBUN() {
		return JIBUN;
	}
	public void setJIBUN(String jIBUN) {
		JIBUN = jIBUN;
	}	
	public String getSAN() {
		return SAN;
	}
	public void setSAN(String sAN) {
		SAN = sAN;
	}
	public String getBONBUN() {
		return BONBUN;
	}
	public void setBONBUN(String bONBUN) {
		BONBUN = bONBUN;
	}
	public String getBOOBUN() {
		return BOOBUN;
	}
	public void setBOOBUN(String bOOBUN) {
		BOOBUN = bOOBUN;
	}
}
