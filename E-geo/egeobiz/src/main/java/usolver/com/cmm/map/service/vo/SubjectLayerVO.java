
package usolver.com.cmm.map.service.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * 사용자_메모
 *
 * @Class Name : SubjectLayerVO.java
 * @Description : SubjectLayerVO  class
 * @Modification Information
 *
 * @since 2016-08-25
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class SubjectLayerVO {

	/** 
	 * TN_USER_SUBJECT.SUBJECT_ID, 
	 * 사용자_주제도레이어.주제도_아이디
	 */
	private  int SUBJECT_ID;	
	
	/** 
	 * TN_USER_SUBJECT.SUBJECT_NAME, 
	 * 사용자_주제도레이어.레이어_이름
	 */
	private  java.lang.String LAYER_NAME;	
	
	/** 
	 * TN_USER_SUBJECT.USER_ID, 
	 * 사용자_주제도레이어.테이블_이름
	 */
	private  java.lang.String TABLE_NAME;	
	
	/** 
	 * TN_USER_SUBJECT.SUBJECT_GROUP, 
	 * 사용자_주제도레이어.레이어_정렬순서
	 */
	private  int LAYER_ORDER;
	
	private int GROUP_ID;
	
	private   java.lang.String GROUP_NAME;
	
	private int LAYER_ID;
	
	private   java.lang.String LAYER_ONOFF;	
	
	private   java.lang.String LAYER_TYPE;	

	public int getSUBJECT_ID() {
		return SUBJECT_ID;
	}

	public void setSUBJECT_ID(int sUBJECT_ID) {
		SUBJECT_ID = sUBJECT_ID;
	}

	public java.lang.String getLAYER_NAME() {
		return LAYER_NAME;
	}

	public void setLAYER_NAME(java.lang.String lAYER_NAME) {
		LAYER_NAME = lAYER_NAME;
	}

	public java.lang.String getTABLE_NAME() {
		return TABLE_NAME;
	}

	public void setTABLE_NAME(java.lang.String tABLE_NAME) {
		TABLE_NAME = tABLE_NAME;
	}

	public int getLAYER_ORDER() {
		return LAYER_ORDER;
	}

	public void setLAYER_ORDER(int lAYER_ORDER) {
		LAYER_ORDER = lAYER_ORDER;
	}

	public int getGROUP_ID() {
		return GROUP_ID;
	}

	public void setGROUP_ID(int gROUP_ID) {
		GROUP_ID = gROUP_ID;
	}

	public java.lang.String getGROUP_NAME() {
		return GROUP_NAME;
	}

	public void setGROUP_NAME(java.lang.String gROUP_NAME) {
		GROUP_NAME = gROUP_NAME;
	}

	public int getLAYER_ID() {
		return LAYER_ID;
	}

	public void setLAYER_ID(int lAYER_ID) {
		LAYER_ID = lAYER_ID;
	}

	public java.lang.String getLAYER_ONOFF() {
		return LAYER_ONOFF;
	}

	public void setLAYER_ONOFF(java.lang.String lAYER_ONOFF) {
		LAYER_ONOFF = lAYER_ONOFF;
	}

	public java.lang.String getLAYER_TYPE() {
		return LAYER_TYPE;
	}

	public void setLAYER_TYPE(java.lang.String lAYER_TYPE) {
		LAYER_TYPE = lAYER_TYPE;
	}
	
	
}
