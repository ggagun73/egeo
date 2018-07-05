
package usolver.com.cmm.map.service.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * 주제도_파일_정보
 *
 * @Class Name : SUBJECTFileInfoVO.java
 * @Description : SUBJECTFileInfo VO class
 * @Modification Information
 *
 * @since 2015-09-04
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class SubjectFileTotVO {

	public SubjectFileTotVO() {
		super();
	}
	
	/** 
	 * TN_SUBJECT_FILE_INFO.FILE_ID, 
	 * 주제도_파일_정보.파일_아이디
	 */
	private java.lang.String FILE_ID;

	/** 
	 * TN_SUBJECT_FILE_INFO.FILE_SIZE, 
	 * 주제도_파일_정보.파일_크기
	 */
	private java.lang.String FILE_SIZE;

	/** 
	 * TN_SUBJECT_FILE_INFO.FILE_NM, 
	 * 주제도_파일_정보.파일_이름
	 */
	private java.lang.String FILE_NM;

	/** 
	 * TN_SUBJECT_FILE_INFO.FILE_PATH, 
	 * 주제도_파일_정보.파일_경로
	 */
	private java.lang.String FILE_PATH;

	/** 
	 * TN_SUBJECT_FILE_INFO.SUBJECT_ID, 
	 * 주제도_파일_정보.주제도_아이디
	 */
	private  java.math.BigDecimal SUBJECT_ID;

	/** 
	 * TN_SUBJECT_FILE_INFO.FILE_UPLOAD_NM, 
	 * 주제도_파일_정보.파일_업로드_이름
	 */
	private java.lang.String FILE_UPLOAD_NM;

	/** 
	 * TN_SUBJECT_FILE_INFO.FILE_EXT, 
	 * 주제도_파일_정보.파일_확장자
	 */
	private java.lang.String FILE_EXT;
	
	/** 
	 * 파일 Base64 Encode 문자열
	 */
	private java.lang.String FILE_BASE64_STRING;
	
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
	 * 사용자_주제도.기본맵여부
	 */
	private  java.lang.String BASE;	

	/** 
	 * TN_USER_STYLE.LAYER_STYLE, 
	 * 사용자_주제도.시스템제공맵 여부
	 */
	private  java.lang.String SYSTEM_MAP;	

	
	public java.lang.String getSYSTEM_MAP() {
		return SYSTEM_MAP;
	}

	public void setSYSTEM_MAP(java.lang.String sYSTEM_MAP) {
		SYSTEM_MAP = sYSTEM_MAP;
	}

	/** 
	 * TN_USER_STYLE.LAYER_STYLE, 
	 * 사용자_주제도.레이어_스타일
	 */
	private  java.lang.String LAYER_SYLE;	
	
	
	public java.math.BigDecimal getSUBJECT_ID() {
		return SUBJECT_ID;
	}

	public void setSUBJECT_ID(java.math.BigDecimal sUBJECT_ID) {
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
	
	/**
	 * TN_SUBJECT_FILE_INFO.FILE_ID, 
	 * 주제도_파일_정보.파일_아이디 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_ID") 
	public java.lang.String getFILE_ID() {
		return this.FILE_ID;
	}
 
	 /**
	 * TN_SUBJECT_FILE_INFO.FILE_ID, 
	 * 주제도_파일_정보.파일_아이디 값설정
	 * @param fileId
	 */
	public void setFILE_ID(java.lang.String fileId) {
		this.FILE_ID = fileId;
	}

	/**
	 * TN_SUBJECT_FILE_INFO.FILE_SIZE, 
	 * 주제도_파일_정보.파일_크기 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_SIZE") 
	public java.lang.String getFILE_SIZE() {
		return this.FILE_SIZE;
	}
 
	 /**
	 * TN_SUBJECT_FILE_INFO.FILE_SIZE, 
	 * 주제도_파일_정보.파일_크기 값설정
	 * @param fileSize
	 */
	public void setFILE_SIZE(java.lang.String fileSize) {
		this.FILE_SIZE = fileSize;
	}

	/**
	 * TN_SUBJECT_FILE_INFO.FILE_NM, 
	 * 주제도_파일_정보.파일_이름 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_NM") 
	public java.lang.String getFILE_NM() {
		return this.FILE_NM;
	}
 
	 /**
	 * TN_SUBJECT_FILE_INFO.FILE_NM, 
	 * 주제도_파일_정보.파일_이름 값설정
	 * @param fileNm
	 */
	public void setFILE_NM(java.lang.String fileNm) {
		this.FILE_NM = fileNm;
	}

	/**
	 * TN_SUBJECT_FILE_INFO.FILE_PATH, 
	 * 주제도_파일_정보.파일_경로 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_PATH") 
	public java.lang.String getFILE_PATH() {
		return this.FILE_PATH;
	}
 
	 /**
	 * TN_SUBJECT_FILE_INFO.FILE_PATH, 
	 * 주제도_파일_정보.파일_경로 값설정
	 * @param filePath
	 */
	public void setFILE_PATH(java.lang.String filePath) {
		this.FILE_PATH = filePath;
	}

	/**
	 * TN_SUBJECT_FILE_INFO.FILE_UPLOAD_NM, 
	 * 주제도_파일_정보.파일_업로드_이름 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_UPLOAD_NM") 
	public java.lang.String getFILE_UPLOAD_NM() {
		return this.FILE_UPLOAD_NM;
	}
 
	 /**
	 * TN_SUBJECT_FILE_INFO.FILE_UPLOAD_NM, 
	 * 주제도_파일_정보.파일_업로드_이름 값설정
	 * @param fileUploadNm
	 */
	public void setFILE_UPLOAD_NM(java.lang.String fileUploadNm) {
		this.FILE_UPLOAD_NM = fileUploadNm;
	}

	/**
	 * TN_SUBJECT_FILE_INFO.FILE_EXT, 
	 * 주제도_파일_정보.파일_확장자 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_EXT") 
	public java.lang.String getFILE_EXT() {
		return this.FILE_EXT;
	}
 
	 /**
	 * TN_SUBJECT_FILE_INFO.FILE_EXT, 
	 * 주제도_파일_정보.파일_확장자 값설정
	 * @param fileExt
	 */
	public void setFILE_EXT(java.lang.String fileExt) {
		this.FILE_EXT = fileExt;
	}
	
	public java.lang.String getFILE_BASE64_STRING() {
		return FILE_BASE64_STRING;
	}

	public void setFILE_BASE64_STRING(java.lang.String fILE_BASE64_STRING) {
		FILE_BASE64_STRING = fILE_BASE64_STRING;
	}

	public java.lang.String getBASE() {
		return BASE;
	}

	public void setBASE(java.lang.String bASE) {
		BASE = bASE;
	}
	
	
	/*@Override
	public String toString() {
		return "SUBJECTFileInfoVO [FILE_ID=" + FILE_ID + ", FILE_SIZE=" + FILE_SIZE + ", FILE_NM=" + FILE_NM + ", FILE_PATH=" + FILE_PATH + ", SUBJECT_ID=" + SUBJECT_ID
				+ ", FILE_UPLOAD_NM=" + FILE_UPLOAD_NM + ", FILE_EXT=" + FILE_EXT + ", FEATURE_SEQ=" + FEATURE_SEQ + "]";
	}*/
}
