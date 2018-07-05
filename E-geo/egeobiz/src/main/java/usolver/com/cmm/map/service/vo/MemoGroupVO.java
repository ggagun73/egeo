package usolver.com.cmm.map.service.vo;

import com.fasterxml.jackson.annotation.JsonProperty;



/**
 * 메모 그룹
 *
 * @Class Name : MemoGroupVO.java
 * @Description : MemoGroup VO class
 * @Modification Information
 *
 * @since 2016-01-20
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class MemoGroupVO {
	public MemoGroupVO()
	{
		super();
	}
	
	

	private java.math.BigDecimal GROUP_ID;
	
	private java.lang.String GROUP_NM;
	
	/**
	 * TN_MEMO_GROUP.GROUP_ID, 
	 * 메모그룹.그룹ID 값 읽기
	 * @return
	 */
	@JsonProperty(value="GROUP_ID")		
	public java.math.BigDecimal getGROUP_ID() {
		return GROUP_ID;
	}


	/**
	 * TN_MEMO_GROUP.GROUP_ID, 
	 * 메모그룹.그룹ID 값 설정
	 * @return
	 */
	public void setGROUP_ID(java.math.BigDecimal gROUP_ID) {
		GROUP_ID = gROUP_ID;
	}


	/**
	 * TN_MEMO_GROUP.GROUP_NM, 
	 * 메모그룹.그룹명 값 읽기
	 * @return
	 */
	@JsonProperty(value="GROUP_NM")	
	public java.lang.String getGROUP_NM() {
		return GROUP_NM;
	}



	/**
	 * TN_MEMO_GROUP.GROUP_NM, 
	 * 메모그룹.그룹명 값 설정
	 * @return
	 */
	public void setGROUP_NM(java.lang.String gROUP_NM) {
		GROUP_NM = gROUP_NM;
	}


}
