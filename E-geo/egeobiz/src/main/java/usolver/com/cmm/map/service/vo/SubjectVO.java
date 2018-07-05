
package usolver.com.cmm.map.service.vo;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * 사용자_메모
 *
 * @Class Name : SubjectVO.java
 * @Description : SubjectVO VO class
 * @Modification Information
 *
 * @since 2015-09-03
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class SubjectVO {

	/** 
	 * TN_USER_SUBJECT.SUBJECT_ID, 
	 * 사용자_주제도.주제도_아이디
	 */
	private  int SUBJECT_ID;	
	
	/** 
	 * TN_USER_SUBJECT.SUBJECT_NAME, 
	 * 사용자_주제도.주제도_제목
	 */
	private  java.lang.String SUBJECT_NAME;	
	
	/** 
	 * TN_USER_SUBJECT.USER_ID, 
	 * 사용자_주제도.사용자_아이디
	 */
	private  java.lang.String USER_ID;	
	
	/** 
	 * TN_USER_SUBJECT.SUBJECT_GROUP, 
	 * 사용자_주제도.주제도_그룹
	 */
	private  java.lang.String SUBJECT_GROUP;	
	
	/** 
	 * TN_USER_SUBJECT.SUBJECT_SHARE 
	 * 사용자_주제도.주제도_공유범위
	 */
	private  java.lang.String SUBJECT_SHARE;	
	
	/** 
	 * TN_USER_SUBJECT.SUBJECT_DESC, 
	 * 사용자_주제도.주제도_설명
	 */
	private  java.lang.String SUBJECT_DESC;	
	

	/** 
	 * TN_USER_SUBJECT.SHARE_STATUS, 
	 * 사용자_주제도.공유_상태
	 */
	private  java.lang.String SHARE_STATUS;	

	/** 
	 * TN_USER_STYLE.LAYER_STYLE, 
	 * 사용자_주제도.레이어_스타일
	 */
	private  java.lang.String LAYER_SYLE;	

	/** 
	 * TN_USER_STYLE.BASE, 
	 * 사용자_주제도.기본주제도 여부
	 */
	private  java.lang.String BASE;	

	/** 
	 * TN_USER_STYLE.BASE, 
	 * 사용자_주제도.기본주제도 여부
	 */
	private  java.lang.String SYSTEM_MAP;
	
	
	public java.lang.String getSYSTEM_MAP() {
		return SYSTEM_MAP;
	}

	public void setSYSTEM_MAP(java.lang.String sYSTEM_MAP) {
		SYSTEM_MAP = sYSTEM_MAP;
	}

	public int getSUBJECT_ID() {
		return SUBJECT_ID;
	}

	public void setSUBJECT_ID(int sUBJECT_ID) {
		SUBJECT_ID = sUBJECT_ID;
	}

	public java.lang.String getSUBJECT_NAME() {
		return SUBJECT_NAME;
	}

	public void setSUBJECT_NAME(java.lang.String sUBJECT_NAME) {
		SUBJECT_NAME = sUBJECT_NAME;
	}

	public java.lang.String getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(java.lang.String uSER_ID) {
		USER_ID = uSER_ID;
	}

	public java.lang.String getSUBJECT_GROUP() {
		return SUBJECT_GROUP;
	}

	public void setSUBJECT_GROUP(java.lang.String sUBJECT_GROUP) {
		SUBJECT_GROUP = sUBJECT_GROUP;
	}

	public java.lang.String getSUBJECT_SHARE() {
		return SUBJECT_SHARE;
	}

	public void setSUBJECT_SHARE(java.lang.String sUBJECT_SHARE) {
		SUBJECT_SHARE = sUBJECT_SHARE;
	}

	public java.lang.String getSUBJECT_DESC() {
		return SUBJECT_DESC;
	}

	public void setSUBJECT_DESC(java.lang.String sUBJECT_DESC) {
		SUBJECT_DESC = sUBJECT_DESC;
	}

	public java.lang.String getSHARE_STATUS() {
		return SHARE_STATUS;
	}

	public void setSHARE_STATUS(java.lang.String sHARE_STATUS) {
		SHARE_STATUS = sHARE_STATUS;
	}

	public java.lang.String getLAYER_SYLE() {
		return LAYER_SYLE;
	}

	public void setLAYER_SYLE(java.lang.String lAYER_SYLE) {
		LAYER_SYLE = lAYER_SYLE;
	}

	public java.lang.String getBASE() {
		return BASE;
	}

	public void setBASE(java.lang.String bASE) {
		BASE = bASE;
	}
	
	
	/*@Override
	public String toString() {
		return "UserMemoVO [MEMO_ID=" + MEMO_ID + ", PARENT_ID=" + PARENT_ID  
				+ ", USER_ID=" + USER_ID + ", MEMO_INFO=" + MEMO_INFO + ", MEMO_NM=" + MEMO_NM + ", X=" + X + ", Y=" + Y + ", MAP_SCALE="
				+ MAP_SCALE + ", MEMO_CN=" + MEMO_CN + ", MARKER_ID=" + MARKER_ID + ", MARKER_TYPE=" + MARKER_TYPE + ", FEATURE_SEQ=" + FEATURE_SEQ
				+ "]";
	}*/
}
