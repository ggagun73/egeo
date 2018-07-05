package usolver.com.cmm.map.service.vo;

import java.math.BigDecimal;

/**
 * 편집 참조레이어 정보
 *
 * @Class Name : LyrEditRefVO.java
 * @Description : LyrEditRef VO class
 * @Modification Information
 *
 * @author leehb1592@g-inno.com
 * @since 2015-09-11
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */
@SuppressWarnings("serial")
public class LyrEditRefVO{
	
	private Integer LYR_ID;
	private String EDITLYR_ENG_NM;	
	private String REFLYR_ENG_NM;
	private String EDITLYR_KOREAN_NM;
	private String REFLYR_KOREAN_NM;
	private String WFS_DRAW;
	
	public Integer getLYR_ID() {
		return LYR_ID;
	}
	public void setLYR_ID(Integer lYR_ID) {
		LYR_ID = lYR_ID;
	}
	public String getEDITLYR_ENG_NM() {
		return EDITLYR_ENG_NM;
	}
	public void setEDITLYR_ENG_NM(String eDITLYR_ENG_NM) {
		EDITLYR_ENG_NM = eDITLYR_ENG_NM;
	}
	public String getREFLYR_ENG_NM() {
		return REFLYR_ENG_NM;
	}
	public void setREFLYR_ENG_NM(String rEFLYR_ENG_NM) {
		REFLYR_ENG_NM = rEFLYR_ENG_NM;
	}
	public String getEDITLYR_KOREAN_NM() {
		return EDITLYR_KOREAN_NM;
	}
	public void setEDITLYR_KOREAN_NM(String eDITLYR_KOREAN_NM) {
		EDITLYR_KOREAN_NM = eDITLYR_KOREAN_NM;
	}
	public String getREFLYR_KOREAN_NM() {
		return REFLYR_KOREAN_NM;
	}
	public void setREFLYR_KOREAN_NM(String rEFLYR_KOREAN_NM) {
		REFLYR_KOREAN_NM = rEFLYR_KOREAN_NM;
	}	
	public String getWFS_DRAW() {
		return WFS_DRAW;
	}
	public void setWFS_DRAW(String wFS_DRAW) {
		WFS_DRAW = wFS_DRAW;
	}
}
