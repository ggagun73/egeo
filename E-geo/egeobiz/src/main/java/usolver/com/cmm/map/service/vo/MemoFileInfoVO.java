
package usolver.com.cmm.map.service.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * 메모_파일_정보
 *
 * @Class Name : MemoFileInfoVO.java
 * @Description : MemoFileInfo VO class
 * @Modification Information
 *
 * @since 2015-09-04
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class MemoFileInfoVO {

	public MemoFileInfoVO() {
		super();
	}
	
	/** 
	 * TN_MEMO_FILE_INFO.FILE_ID, 
	 * 메모_파일_정보.파일_아이디
	 */
	private java.lang.String FILE_ID;

	/** 
	 * TN_MEMO_FILE_INFO.FILE_SIZE, 
	 * 메모_파일_정보.파일_크기
	 */
	private java.lang.String FILE_SIZE;

	/** 
	 * TN_MEMO_FILE_INFO.FILE_NM, 
	 * 메모_파일_정보.파일_이름
	 */
	private java.lang.String FILE_NM;

	/** 
	 * TN_MEMO_FILE_INFO.FILE_PATH, 
	 * 메모_파일_정보.파일_경로
	 */
	private java.lang.String FILE_PATH;

	/** 
	 * TN_MEMO_FILE_INFO.MEMO_ID, 
	 * 메모_파일_정보.메모_아이디
	 */
	private  java.math.BigDecimal MEMO_ID;

	/** 
	 * TN_MEMO_FILE_INFO.FILE_UPLOAD_NM, 
	 * 메모_파일_정보.파일_업로드_이름
	 */
	private java.lang.String FILE_UPLOAD_NM;

	/** 
	 * TN_MEMO_FILE_INFO.FILE_EXT, 
	 * 메모_파일_정보.파일_확장자
	 */
	private java.lang.String FILE_EXT;
	
	/** 
	 * 파일 Base64 Encode 문자열
	 */
	private java.lang.String FILE_BASE64_STRING;
	
	
	//추가 
	/** 
	 * TN_USER_MEMO.MEMO_CN, 
	 * 사용자_메모.메모_내용
	 */
	private java.lang.String MEMO_CN;
	
	/** 
	 * TN_USER_MEMO.MEMO_INFO, 
	 * 사용자_메모.메모_정보
	 */
	private java.lang.String MEMO_INFO;
	
	/** 
	 * TN_USER_MEMO.MEMO_NM, 
	 * 사용자_메모.메모_이름
	 */
	private java.lang.String MEMO_NM;

	
	private java.lang.String FEATURE_SEQ;
	

	/**
	 * TN_MEMO_FILE_INFO.FILE_ID, 
	 * 메모_파일_정보.파일_아이디 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_ID") 
	public java.lang.String getFILE_ID() {
		return this.FILE_ID;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.FILE_ID, 
	 * 메모_파일_정보.파일_아이디 값설정
	 * @param fileId
	 */
	public void setFILE_ID(java.lang.String fileId) {
		this.FILE_ID = fileId;
	}

	/**
	 * TN_MEMO_FILE_INFO.FILE_SIZE, 
	 * 메모_파일_정보.파일_크기 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_SIZE") 
	public java.lang.String getFILE_SIZE() {
		return this.FILE_SIZE;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.FILE_SIZE, 
	 * 메모_파일_정보.파일_크기 값설정
	 * @param fileSize
	 */
	public void setFILE_SIZE(java.lang.String fileSize) {
		this.FILE_SIZE = fileSize;
	}

	/**
	 * TN_MEMO_FILE_INFO.FILE_NM, 
	 * 메모_파일_정보.파일_이름 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_NM") 
	public java.lang.String getFILE_NM() {
		return this.FILE_NM;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.FILE_NM, 
	 * 메모_파일_정보.파일_이름 값설정
	 * @param fileNm
	 */
	public void setFILE_NM(java.lang.String fileNm) {
		this.FILE_NM = fileNm;
	}

	/**
	 * TN_MEMO_FILE_INFO.FILE_PATH, 
	 * 메모_파일_정보.파일_경로 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_PATH") 
	public java.lang.String getFILE_PATH() {
		return this.FILE_PATH;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.FILE_PATH, 
	 * 메모_파일_정보.파일_경로 값설정
	 * @param filePath
	 */
	public void setFILE_PATH(java.lang.String filePath) {
		this.FILE_PATH = filePath;
	}

	/**
	 * TN_MEMO_FILE_INFO.MEMO_ID, 
	 * 메모_파일_정보.메모_아이디 값읽기
	 * @return
	 */
	@JsonProperty(value="MEMO_ID") 
	public  java.math.BigDecimal getMEMO_ID() {
		return this.MEMO_ID;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.MEMO_ID, 
	 * 메모_파일_정보.메모_아이디 값설정
	 * @param memoId
	 */
	public void setMEMO_ID( java.math.BigDecimal memoId) {
		this.MEMO_ID = memoId;
	}

	/**
	 * TN_MEMO_FILE_INFO.FILE_UPLOAD_NM, 
	 * 메모_파일_정보.파일_업로드_이름 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_UPLOAD_NM") 
	public java.lang.String getFILE_UPLOAD_NM() {
		return this.FILE_UPLOAD_NM;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.FILE_UPLOAD_NM, 
	 * 메모_파일_정보.파일_업로드_이름 값설정
	 * @param fileUploadNm
	 */
	public void setFILE_UPLOAD_NM(java.lang.String fileUploadNm) {
		this.FILE_UPLOAD_NM = fileUploadNm;
	}

	/**
	 * TN_MEMO_FILE_INFO.FILE_EXT, 
	 * 메모_파일_정보.파일_확장자 값읽기
	 * @return
	 */
	@JsonProperty(value="FILE_EXT") 
	public java.lang.String getFILE_EXT() {
		return this.FILE_EXT;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.FILE_EXT, 
	 * 메모_파일_정보.파일_확장자 값설정
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
	
	public java.lang.String getMEMO_CN() {
		return MEMO_CN;
	}

	public void setMEMO_CN(java.lang.String mEMO_CN) {
		MEMO_CN = mEMO_CN;
	}

	public java.lang.String getMEMO_INFO() {
		return MEMO_INFO;
	}

	public void setMEMO_INFO(java.lang.String mEMO_INFO) {
		MEMO_INFO = mEMO_INFO;
	}

	public java.lang.String getMEMO_NM() {
		return MEMO_NM;
	}

	public void setMEMO_NM(java.lang.String mEMO_NM) {
		MEMO_NM = mEMO_NM;
	}


	public java.lang.String getFEATURE_SEQ() {
		return FEATURE_SEQ;
	}

	public void setFEATURE_SEQ(java.lang.String feature_seq) {
		FEATURE_SEQ = feature_seq;
	}
	
	@Override
	public String toString() {
		return "MemoFileInfoVO [FILE_ID=" + FILE_ID + ", FILE_SIZE=" + FILE_SIZE + ", FILE_NM=" + FILE_NM + ", FILE_PATH=" + FILE_PATH + ", MEMO_ID=" + MEMO_ID
				+ ", FILE_UPLOAD_NM=" + FILE_UPLOAD_NM + ", FILE_EXT=" + FILE_EXT + ", FEATURE_SEQ=" + FEATURE_SEQ + "]";
	}
}
