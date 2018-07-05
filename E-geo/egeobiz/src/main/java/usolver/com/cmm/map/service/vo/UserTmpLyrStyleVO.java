package usolver.com.cmm.map.service.vo;

/**
 * 레이어 스타일 정보
 *
 * @Class Name : UserTmpLyrStyleVO.java
 * @Description : UserTmpLyrStyleVO VO class
 * @Modification Information
 *
 * @author sese5858@g-inno.com
 * @since 2016-08-01
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
public class UserTmpLyrStyleVO {
	private String USER_ID;	
	private String LAYER_NAME;
	private String TABLE_NAME;
	private String LAYER_STYLE;
	
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getLAYER_NAME() {
		return LAYER_NAME;
	}
	public void setLAYER_NAME(String lAYER_NAME) {
		LAYER_NAME = lAYER_NAME;
	}
	public String getTABLE_NAME() {
		return TABLE_NAME;
	}
	public void setTABLE_NAME(String tABLE_NAME) {
		TABLE_NAME = tABLE_NAME;
	}
	public String getLAYER_STYLE() {
		return LAYER_STYLE;
	}
	public void setLAYER_STYLE(String lAYER_STYLE) {
		LAYER_STYLE = lAYER_STYLE;
	}
}
