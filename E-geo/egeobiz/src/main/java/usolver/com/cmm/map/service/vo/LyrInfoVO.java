package usolver.com.cmm.map.service.vo;

/**
 * 주제도_정보
 *
 * @Class Name : LyrInfoVO.java
 * @Description : LyrInfo VO class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-07-23
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
@SuppressWarnings("serial")
public class LyrInfoVO extends LyrInfoDefaultVO {

	public LyrInfoVO() {
		super();
	}
	
	/** 
	 * TN_LYR_INFO.LYR_ID, 
	 * 주제도_정보.레이어_아이디
	 */
	private java.math.BigDecimal LYR_ID;

	/** 
	 * TN_LYR_INFO.LYR_ENG_NM, 
	 * 주제도_정보.레이어_영문_이름
	 */
	private java.lang.String LYR_ENG_NM;

	
	/** 
	 * TN_LYR_INFO.LYR_FTR_CDE, 
	 * 주제도_정보.레이어_지형지물부호
	 */
	private java.lang.String LYR_FTR_CDE;
	
	/** 
	 * TN_LYR_INFO.LYR_KOREAN_NM, 
	 * 주제도_정보.레이어_한글_이름
	 */
	private java.lang.String LYR_KOREAN_NM;

	/** 
	 * TN_LYR_INFO.LYR_RDL_USE_YN, 
	 * 주제도_정보.레이어_도로_사용여부
	 */
	private java.lang.String LYR_RDL_USE_YN;

	/** 
	 * TN_LYR_INFO.LYR_WTL_USE_YN, 
	 * 주제도_정보.레이어_상수_사용여부
	 */
	private java.lang.String LYR_WTL_USE_YN;

	/** 
	 * TN_LYR_INFO.LYR_SWL_USE_YN, 
	 * 주제도_정보.레이어_하수_사용여부
	 */
	private java.lang.String LYR_SWL_USE_YN;

	/** 
	 * TN_LYR_INFO.G2_ID, 
	 * 주제도_정보.G2_ID
	 */
	private java.math.BigDecimal G2_ID;

	/**
	 * TN_LYR_INFO.LYR_ID, 
	 * 주제도_정보.레이어_아이디 값읽기
	 * @return
	 */
	public java.math.BigDecimal getLYR_ID() {
		return this.LYR_ID;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_ID, 
	 * 주제도_정보.레이어_아이디 값설정
	 * @param lyrId
	 */
	public void setLYR_ID(java.math.BigDecimal lyrId) {
		this.LYR_ID = lyrId;
	}

	/**
	 * TN_LYR_INFO.LYR_ENG_NM, 
	 * 주제도_정보.레이어_영문_이름 값읽기
	 * @return
	 */
	public java.lang.String getLYR_ENG_NM() {
		return this.LYR_ENG_NM;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_ENG_NM, 
	 * 주제도_정보.레이어_영문_이름 값설정
	 * @param lyrEngNm
	 */
	public void setLYR_ENG_NM(java.lang.String lyrEngNm) {
		this.LYR_ENG_NM = lyrEngNm;
	}

	
	
	/**
	 * TN_LYR_INFO.LYR_FRT_CDE, 
	 * 주제도_정보.레이어_지형지물부호 값읽기
	 * @return
	 */
	public java.lang.String getLYR_FRT_CDE() {
		return this.LYR_FTR_CDE;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_FRT_CDE, 
	 * 주제도_정보.레이어_지형지물부호 값설정
	 * @param lyrFtrCde
	 */
	public void setLYR_FTR_CDE(java.lang.String lyrFtrCde) {
		this.LYR_FTR_CDE = lyrFtrCde;
	}
	
	
	
	
	/**
	 * TN_LYR_INFO.LYR_KOREAN_NM, 
	 * 주제도_정보.레이어_한글_이름 값읽기
	 * @return
	 */
	public java.lang.String getLYR_KOREAN_NM() {
		return this.LYR_KOREAN_NM;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_KOREAN_NM, 
	 * 주제도_정보.레이어_한글_이름 값설정
	 * @param lyrKoreanNm
	 */
	public void setLYR_KOREAN_NM(java.lang.String lyrKoreanNm) {
		this.LYR_KOREAN_NM = lyrKoreanNm;
	}

	/**
	 * TN_LYR_INFO.LYR_RDL_USE_YN, 
	 * 주제도_정보.레이어_도로_사용여부 값읽기
	 * @return
	 */
	public java.lang.String getLYR_RDL_USE_YN() {
		return this.LYR_RDL_USE_YN;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_RDL_USE_YN, 
	 * 주제도_정보.레이어_도로_사용여부 값설정
	 * @param lyrRdlUseYn
	 */
	public void setLYR_RDL_USE_YN(java.lang.String lyrRdlUseYn) {
		this.LYR_RDL_USE_YN = lyrRdlUseYn;
	}

	/**
	 * TN_LYR_INFO.LYR_WTL_USE_YN, 
	 * 주제도_정보.레이어_상수_사용여부 값읽기
	 * @return
	 */
	public java.lang.String getLYR_WTL_USE_YN() {
		return this.LYR_WTL_USE_YN;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_WTL_USE_YN, 
	 * 주제도_정보.레이어_상수_사용여부 값설정
	 * @param lyrWtlUseYn
	 */
	public void setLYR_WTL_USE_YN(java.lang.String lyrWtlUseYn) {
		this.LYR_WTL_USE_YN = lyrWtlUseYn;
	}

	/**
	 * TN_LYR_INFO.LYR_SWL_USE_YN, 
	 * 주제도_정보.레이어_하수_사용여부 값읽기
	 * @return
	 */
	public java.lang.String getLYR_SWL_USE_YN() {
		return this.LYR_SWL_USE_YN;
	}
 
	 /**
	 * TN_LYR_INFO.LYR_SWL_USE_YN, 
	 * 주제도_정보.레이어_하수_사용여부 값설정
	 * @param lyrSwlUseYn
	 */
	public void setLYR_SWL_USE_YN(java.lang.String lyrSwlUseYn) {
		this.LYR_SWL_USE_YN = lyrSwlUseYn;
	}

	/**
	 * TN_LYR_INFO.G2_ID, 
	 * 주제도_정보.G2_ID 값읽기
	 * @return
	 */
	public java.math.BigDecimal getG2_ID() {
		return this.G2_ID;
	}
 
	 /**
	 * TN_LYR_INFO.G2_ID, 
	 * 주제도_정보.G2_ID 값설정
	 * @param g2Id
	 */
	public void setG2_ID(java.math.BigDecimal g2Id) {
		this.G2_ID = g2Id;
	}

}
