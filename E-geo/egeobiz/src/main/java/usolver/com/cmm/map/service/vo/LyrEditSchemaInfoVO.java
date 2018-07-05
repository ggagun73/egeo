package usolver.com.cmm.map.service.vo;

import java.math.BigDecimal;

/**
 * 편집 도형 스키마 정보
 *
 * @Class Name : LyrEditSchemaInfoVO.java
 * @Description : LyrEditSchemaInfo VO class
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
public class LyrEditSchemaInfoVO extends LyrInfoDefaultVO {

	public LyrEditSchemaInfoVO() {
		super();
	}
	
	/** 
	 * TN_LYR_INFO.LYR_ENG_NM, 
	 * 주제도_정보.레이어_영문_이름
	 */
	private String LYR_ENG_NM;
	/**
	 * G2S_FIELDINFO.G2_DATASETID
	 * 공간데이타셋 ID
	 */
	private Integer G2_DATASETID;
	/**
	 * G2S_FIELDINFO.G2_TABLENAME
	 * 공간데이타셋명
	 */
	private String G2_TABLENAME;
	/**
	 * G2S_FIELDINFO.G2_NAME
	 * 필드명
	 */
	private String G2_NAME;
	/**
	 * G2S_FIELDINFO.G2_ALIAS
	 * 별칭
	 */
	private String G2_ALIAS;
	/**
	 * G2S_FIELDINFO.G2_DATATYPE
	 * 필드타입
	 */
	private BigDecimal G2_DATATYPE;
	/**
	 * G2S_FIELDINFO.G2_LENGTH
	 * 필드길이
	 */
	private BigDecimal G2_LENGTH;
	/**
	 * G2S_FIELDINFO.G2_PRECISION
	 * 정수길이
	 */
	private BigDecimal G2_PRECISION;
	/**
	 * G2S_FIELDINFO.G2_SCALE
	 * 소수길이
	 */
	private BigDecimal G2_SCALE;
	/**
	 * G2S_FIELDINFO.G2_DOMAIN_TYPE
	 * 도메인타입
	 */
	private BigDecimal G2_DOMAIN_TYPE;
	/**
	 * G2S_FIELDINFO.G2_DOMAIN
	 * 도메인
	 */
	private BigDecimal G2_DOMAIN;
	
	
	public String getLYR_ENG_NM() {
		return LYR_ENG_NM;
	}
	public void setLYR_ENG_NM(String lYR_ENG_NM) {
		LYR_ENG_NM = lYR_ENG_NM;
	}
	public Integer getG2_DATASETID() {
		return G2_DATASETID;
	}
	public void setG2_DATASETID(Integer g2_DATASETID) {
		G2_DATASETID = g2_DATASETID;
	}
	public String getG2_TABLENAME() {
		return G2_TABLENAME;
	}
	public void setG2_TABLENAME(String g2_TABLENAME) {
		G2_TABLENAME = g2_TABLENAME;
	}
	public String getG2_NAME() {
		return G2_NAME;
	}
	public void setG2_NAME(String g2_NAME) {
		G2_NAME = g2_NAME;
	}
	public String getG2_ALIAS() {
		return G2_ALIAS;
	}
	public void setG2_ALIAS(String g2_ALIAS) {
		G2_ALIAS = g2_ALIAS;
	}
	public BigDecimal getG2_DATATYPE() {
		return G2_DATATYPE;
	}
	public void setG2_DATATYPE(BigDecimal g2_DATATYPE) {
		G2_DATATYPE = g2_DATATYPE;
	}
	public BigDecimal getG2_LENGTH() {
		return G2_LENGTH;
	}
	public void setG2_LENGTH(BigDecimal g2_LENGTH) {
		G2_LENGTH = g2_LENGTH;
	}
	public BigDecimal getG2_PRECISION() {
		return G2_PRECISION;
	}
	public void setG2_PRECISION(BigDecimal g2_PRECISION) {
		G2_PRECISION = g2_PRECISION;
	}
	public BigDecimal getG2_SCALE() {
		return G2_SCALE;
	}
	public void setG2_SCALE(BigDecimal g2_SCALE) {
		G2_SCALE = g2_SCALE;
	}
	
	
	public BigDecimal getG2_DOMAIN_TYPE() {
		return G2_DOMAIN_TYPE;
	}
	public void setG2_DOMAIN_TYPE(BigDecimal g2_DOMAIN_TYPE) {
		G2_DOMAIN_TYPE = g2_DOMAIN_TYPE;
	}
	
	
	public BigDecimal getG2_DOMAIN() {
		return G2_DOMAIN;
	}
	public void setG2_DOMAIN(BigDecimal g2_DOMAIN) {
		G2_DOMAIN = g2_DOMAIN;
	}
}
