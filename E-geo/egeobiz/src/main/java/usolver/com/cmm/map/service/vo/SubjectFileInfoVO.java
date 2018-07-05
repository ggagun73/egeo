
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
public class SubjectFileInfoVO {

	public SubjectFileInfoVO() {
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
	private  int SUBJECT_ID;

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
	@JsonProperty(value="SUBJECT_ID") 
	public  int getSUBJECT_ID() {
		return this.SUBJECT_ID;
	}
 
	 /**
	 * TN_MEMO_FILE_INFO.MEMO_ID, 
	 * 메모_파일_정보.메모_아이디 값설정
	 * @param memoId
	 */
	public void setSUBJECT_ID( int subjectId) {
		this.SUBJECT_ID = subjectId;
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
		
	/*@Override
	public String toString() {
		return "MemoFileInfoVO [FILE_ID=" + FILE_ID + ", FILE_SIZE=" + FILE_SIZE + ", FILE_NM=" + FILE_NM + ", FILE_PATH=" + FILE_PATH + ", MEMO_ID=" + MEMO_ID
				+ ", FILE_UPLOAD_NM=" + FILE_UPLOAD_NM + ", FILE_EXT=" + FILE_EXT + ", FEATURE_SEQ=" + FEATURE_SEQ + "]";
	}*/
}
