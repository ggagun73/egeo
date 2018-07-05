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
public class LyrEditSnapInfoVO{
	
	private Integer SNAP_ID;
	private String EDITLYR_ENG_NM;	
	private String SNAPLYR_ENG_NM;
	private Integer SNAP_EDGE;
	private Integer SNAP_VERTEX;
	private Integer SNAP_NODE;
	
	public Integer getSNAP_ID() {
		return SNAP_ID;
	}
	public void setSNAP_ID(Integer sNAP_ID) {
		SNAP_ID = sNAP_ID;
	}
	public String getEDITLYR_ENG_NM() {
		return EDITLYR_ENG_NM;
	}
	public void setEDITLYR_ENG_NM(String eDITLYR_ENG_NM) {
		EDITLYR_ENG_NM = eDITLYR_ENG_NM;
	}
	public String getSNAPLYR_ENG_NM() {
		return SNAPLYR_ENG_NM;
	}
	public void setSNAPLYR_ENG_NM(String sNAPLYR_ENG_NM) {
		SNAPLYR_ENG_NM = sNAPLYR_ENG_NM;
	}
	public Integer getSNAP_EDGE() {
		return SNAP_EDGE;
	}
	public void setSNAP_EDGE(Integer sNAP_EDGE) {
		SNAP_EDGE = sNAP_EDGE;
	}
	public Integer getSNAP_VERTEX() {
		return SNAP_VERTEX;
	}
	public void setSNAP_VERTEX(Integer sNAP_VERTEX) {
		SNAP_VERTEX = sNAP_VERTEX;
	}
	public Integer getSNAP_NODE() {
		return SNAP_NODE;
	}
	public void setSNAP_NODE(Integer sNAP_NODE) {
		SNAP_NODE = sNAP_NODE;
	}	
}
