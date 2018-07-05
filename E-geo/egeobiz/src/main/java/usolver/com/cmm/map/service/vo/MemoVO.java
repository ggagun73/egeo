
package usolver.com.cmm.map.service.vo;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * 사용자_메모
 *
 * @Class Name : UserMemoVO.java
 * @Description : UserMemo VO class
 * @Modification Information
 *
 * @since 2015-09-03
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class MemoVO {

	public MemoVO() {
		super();
	}
	
	/** 
	 * TN_MEMO.MEMO_ID, 
	 * 사용자_메모.파일_경로
	 */
	private  java.math.BigDecimal MEMO_ID;	
	private java.math.BigDecimal PARENT_ID;
	private java.math.BigDecimal MARKER_ID;	
	private java.lang.String MARKER_TYPE;


	/** 
	 * TN_USER_MEMO.USER_ID, 
	 * 사용자_메모.메모_아이디
	 */
	private java.lang.String USER_ID;

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

	/** 
	 * TN_USER_MEMO.X, 
	 * 사용자_메모.X
	 */
	private java.math.BigDecimal X;

	/** 
	 * TN_USER_MEMO.Y, 
	 * 사용자_메모.Y
	 */
	private java.math.BigDecimal Y;

	/** 
	 * TN_USER_MEMO.MAP_SCALE, 
	 * 사용자_메모.지도_축척
	 */
	private java.math.BigDecimal MAP_SCALE;

	/** 
	 * TN_USER_MEMO.MEMO_CN, 
	 * 사용자_메모.메모_내용
	 */
	private java.lang.String MEMO_CN;
	
	
	private java.lang.String FEATURE_SEQ;
	
	
	
	public java.math.BigDecimal getPARENT_ID() {
		return PARENT_ID;
	}

	public void setPARENT_ID(java.math.BigDecimal pARENT_ID) {
		PARENT_ID = pARENT_ID;
	}

	public java.math.BigDecimal getMARKER_ID() {
		return MARKER_ID;
	}

	public void setMARKER_ID(java.math.BigDecimal mARKER_ID) {
		MARKER_ID = mARKER_ID;
	}

	public java.lang.String getMARKER_TYPE() {
		return MARKER_TYPE;
	}

	public void setMARKER_TYPE(java.lang.String mARKER_TYPE) {
		MARKER_TYPE = mARKER_TYPE;
	}


	public java.lang.String getFEATURE_SEQ() {
		return FEATURE_SEQ;
	}

	public void setFEATURE_SEQ(java.lang.String feature_seq) {
		FEATURE_SEQ = feature_seq;
	}

	/**
	 * TN_USER_MEMO.MEMO_ID, 
	 * 사용자_메모.파일_경로 값읽기
	 * @return
	 */
	@JsonProperty(value="MEMO_ID") 
	public  java.math.BigDecimal getMEMO_ID() {
		return this.MEMO_ID;
	}
 
	 /**
	 * TN_USER_MEMO.MEMO_ID, 
	 * 사용자_메모.파일_경로 값설정
	 * @param memoId
	 */
	public void setMEMO_ID( java.math.BigDecimal  memoId) {
		this.MEMO_ID = memoId;
	}

	/**
	 * TN_USER_MEMO.USER_ID, 
	 * 사용자_메모.메모_아이디 값읽기
	 * @return
	 */
	@JsonProperty(value="USER_ID") 
	public java.lang.String getUSER_ID() {
		return this.USER_ID;
	}
 
	 /**
	 * TN_USER_MEMO.USER_ID, 
	 * 사용자_메모.메모_아이디 값설정
	 * @param userId
	 */
	public void setUSER_ID(java.lang.String userId) {
		this.USER_ID = userId;
	}

	/**
	 * TN_USER_MEMO.MEMO_INFO, 
	 * 사용자_메모.메모_정보 값읽기
	 * @return
	 */
	@JsonProperty(value="MEMO_INFO") 
	public java.lang.String getMEMO_INFO() {
		return this.MEMO_INFO;
	}
 
	 /**
	 * TN_USER_MEMO.MEMO_INFO, 
	 * 사용자_메모.메모_정보 값설정
	 * @param memoInfo
	 */
	public void setMEMO_INFO(java.lang.String memoInfo) {
		this.MEMO_INFO = memoInfo;
	}

	/**
	 * TN_USER_MEMO.MEMO_NM, 
	 * 사용자_메모.메모_이름 값읽기
	 * @return
	 */
	@JsonProperty(value="MEMO_NM") 
	public java.lang.String getMEMO_NM() {
		return this.MEMO_NM;
	}
 
	 /**
	 * TN_USER_MEMO.MEMO_NM, 
	 * 사용자_메모.메모_이름 값설정
	 * @param memoNm
	 */
	public void setMEMO_NM(java.lang.String memoNm) {
		this.MEMO_NM = memoNm;
	}

	/**
	 * TN_USER_MEMO.X, 
	 * 사용자_메모.X 값읽기
	 * @return
	 */
	@JsonProperty(value="X") 
	public java.math.BigDecimal getX() {
		return this.X;
	}
 
	 /**
	 * TN_USER_MEMO.X, 
	 * 사용자_메모.X 값설정
	 * @param x
	 */
	public void setX(java.math.BigDecimal x) {
		this.X = x;
	}

	/**
	 * TN_USER_MEMO.Y, 
	 * 사용자_메모.Y 값읽기
	 * @return
	 */
	@JsonProperty(value="Y") 
	public java.math.BigDecimal getY() {
		return this.Y;
	}
 
	 /**
	 * TN_USER_MEMO.Y, 
	 * 사용자_메모.Y 값설정
	 * @param y
	 */
	public void setY(java.math.BigDecimal y) {
		this.Y = y;
	}

	/**
	 * TN_USER_MEMO.MAP_SCALE, 
	 * 사용자_메모.지도_축척 값읽기
	 * @return
	 */
	@JsonProperty(value="MAP_SCALE") 
	public java.math.BigDecimal getMAP_SCALE() {
		return this.MAP_SCALE;
	}
 
	 /**
	 * TN_USER_MEMO.MAP_SCALE, 
	 * 사용자_메모.지도_축척 값설정
	 * @param mapScale
	 */
	public void setMAP_SCALE(java.math.BigDecimal mapScale) {
		this.MAP_SCALE = mapScale;
	}

	/**
	 * TN_USER_MEMO.MEMO_CN, 
	 * 사용자_메모.메모_내용 값읽기
	 * @return
	 */
	@JsonProperty(value="MEMO_CN") 
	public java.lang.String getMEMO_CN() {
		return this.MEMO_CN;
	}
 
	 /**
	 * TN_USER_MEMO.MEMO_CN, 
	 * 사용자_메모.메모_내용 값설정
	 * @param memoCn
	 */
	public void setMEMO_CN(java.lang.String memoCn) {
		this.MEMO_CN = memoCn;
	}
	
	@Override
	public String toString() {
		return "UserMemoVO [MEMO_ID=" + MEMO_ID + ", PARENT_ID=" + PARENT_ID  
				+ ", USER_ID=" + USER_ID + ", MEMO_INFO=" + MEMO_INFO + ", MEMO_NM=" + MEMO_NM + ", X=" + X + ", Y=" + Y + ", MAP_SCALE="
				+ MAP_SCALE + ", MEMO_CN=" + MEMO_CN + ", MARKER_ID=" + MARKER_ID + ", MARKER_TYPE=" + MARKER_TYPE + ", FEATURE_SEQ=" + FEATURE_SEQ
				+ "]";
	}
}
