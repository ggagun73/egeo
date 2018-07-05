package usolver.com.cmm.map.service.vo;

import java.math.BigDecimal;

public class LyrEditMidSaveVO {
	
	/** 편집도형 개체 아이디 */
	private Integer ID;
	
	/** 편집도형 개체 DataSet 아이디 */
	private Long G2_ID;
	
	/** 데이타셋 아이디 */
	private Integer G2_DATASETID;
	
	/** 데이타셋 영문명 */
	private String G2_NAME;
	
	/** 편집 상태 **/
	private Integer G2_STATE;
	
	/** 편집 시간 **/
	private String G2_DATE;
	
	/** 편집 버전 **/
	private Integer G2_SRCVERSION;
	
	/** 사용자 아이디 **/
	private String G2_USERID;
	
	/** 편집 데이터(공간 & 속성) **/
	private String G2_DATA;
	
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public Long getG2_ID() {
		return G2_ID;
	}
	public void setG2_ID(Long g2_ID) {
		G2_ID = g2_ID;
	}
	public Integer getG2_DATASETID() {
		return G2_DATASETID;
	}
	public void setG2_DATASETID(Integer g2_DATASETID) {
		G2_DATASETID = g2_DATASETID;
	}
	public String getG2_NAME() {
		return G2_NAME;
	}
	public void setG2_NAME(String g2_NAME) {
		G2_NAME = g2_NAME;
	}
	public Integer getG2_STATE() {
		return G2_STATE;
	}
	public void setG2_STATE(Integer g2_STATE) {
		G2_STATE = g2_STATE;
	}
	public String getG2_DATE() {
		return G2_DATE;
	}
	public void setG2_DATE(String g2_DATE) {
		G2_DATE = g2_DATE;
	}
	public Integer getG2_SRCVERSION() {
		return G2_SRCVERSION;
	}
	public void setG2_SRCVERSION(Integer g2_SRCVERSION) {
		G2_SRCVERSION = g2_SRCVERSION;
	}
	public String getG2_USERID() {
		return G2_USERID;
	}
	public void setG2_USERID(String g2_USERID) {
		G2_USERID = g2_USERID;
	}
	public String getG2_DATA() {
		return G2_DATA;
	}
	public void setG2_DATA(String g2_DATA) {
		G2_DATA = g2_DATA;
	}
	
	
	
}
