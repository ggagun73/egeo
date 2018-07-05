/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package usolver.com.cmm.map.service.vo;

import usolver.com.cmm.vo.DefaultVO;


/**  
 * @Class Name : SampleVO.java
 * @Description : SampleVO Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.07.31           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2014.07.31
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class EtcMapEtVO extends DefaultVO {
 
    private static final long serialVersionUID = 1L;
    
    private String LYR_PK;  // 필수 유니크 키
    private String UP_LYR;
    private String LYR_ID ;
    private String CLS_GBN ;
    private String CLS_LVL ;
    private String LVL1_NM ;
    private String LVL2_NM ;
    private String LVL3_NM ;
    private String LYR_SYMBOL ;
    private String BJD_NAM ;
    private String HJD_NAM ;
    private String HJG_NAM ;    


	private String OBJECTID ;  
    private String FTR_CDE ;  
    private String BLD_NAM ; 
    private String DBL_NAM ;   
    private String AAA_CDE ;  
    private String AAB_CDE ;  
    private String BJD_CDE ;  
    private String HJD_CDE ; 
    private String SAN_CDE ;  
    private String FAC_NUM ; 
    private String FAD_NUM ;  
    private String NRD_NAM ;  
    private String NFC_NUM ; 
    private String NFD_NUM ;  
    private String BLD_HIT ;  
    private String IMP_CDE ;  
    private String BLD_USE ;  
    private String HJG_CDE ; 
    

	private String AG_GID ;      
    private String SIG_CD ;      
    private String RDS_MAN_NO ;    
    private String RN ;          
    private String RN_CD ;       
    private String ENG_RN  ;     
    private String NTFC_DE ;      
    private String RN_DLB_DE ;   
    private String ROA_MAN_ES ;  
    private String WDR_RD_CD  ; 
    private String ROA_CLS_SE ;  
    private String RDS_DPN_SE ;   
    private String RBP_CN ;      
    private String REP_CN ;     
    private String ROAD_BT ;    
    private String ROAD_LT ;    
    private String BSI_INT ;     
    private String NLR_LCL_NO ;  
    private String ALWNC_RESN ; 
    
    private String BONBUN;
    private String BUBUN;
    private String SAN_NUM;
    private String PNU;
    private String JIBUN; 
    
    
    private String BUL_MAN_NO; 
    private String BSI_INT_SN;   
    private String EQB_MAN_SN;   
    private String BULD_SE_CD;   
    private String BULD_MNNM ;   
    private String BULD_SLNO;   
    private String BULD_NM;     
    private String BUL_ENG_NM;  
    private String BULD_NM_DC;  
    private String BULD_STTUS;   
    private String BDTYP_CD;      
    private String BUL_DPN_SE;   
    private String GRO_FLO_CO;   
    private String UND_FLO_CO;   
    private String ZIP;         
    private String POS_BUL_NM;   
    private String REG_PUB_NM;   
    private String EMD_CD;       
    private String LI_CD;       
    private String MNTN_YN;      
    private String LNBR_MNNM;    
    private String LNBR_SLNO;    
    private String COMPET_DE;
    
    private String LYR_SEWER_ON;
    private String LYR_WATER_ON;
    private String LYR_ROAD_ON;
    
    private String LYR_ON;
	private String USER_ID;
	
	private String LAYER_INFO;
	
	private String DRAW_NAME;
	private String SEQ;	
	private String GEOMETRY_TYPE;
	private String FILL_COLOR;
	private String FILL_STYLE;
	private String OUTLINE_COLOR;
	private String OUTLINE_STYLE;
	private String OUTLINE_WIDTH;	
	private String SYSTEM_ID;
	
	private String FONT_SIZE;
	private String FONT_WEIGHT;
	private String FONT_STYLE;
	private String FONT_FAMILY;
	private String FONT_COLOR;	
	
	private String MAXSCALE;
	private String MINSCALE;
	private String OPACITY;	
	private String LABEL_FIELD;
	
	private String GROUPLAYER_NAME;
	
	private String LAYER_LIST;
	
	private String USE_YN;
	
	private String LAYER_NAME;
	
	private String PROG_ID;  
	private String CAPTION;
	private String LAYERNAME;
	
	private String WIDTH;
	private String HEIGHT;
	
	private String SYS_TYPE;
	
	private String LEGEND_NUM;
	private String LEGEND_NM;
	private String MARKER_STYLE;
	
	private String TABLENAME;
	private String TABLEID;

	private String POPUP_W;
	private String POPUP_H;
	
	private String RDA_IDN;
	
	
	
	
	
	private String MAP_SCALE;
	private String MAP_TITLE;
	private String PRINT_LAYER;
	private String LAYOUT;
	private String PRINT_TYPE;
	
	private String XMAX;
	private String XMIN;
	
	private String SCALE;
	
	private String LOG_IDN;
	
	
	public String getSCALE() {
		return SCALE;
	}
	public void setSCALE(String sCALE) {
		SCALE = sCALE;
	}
	public String getMAP_SCALE() {
		return MAP_SCALE;
	}
	public void setMAP_SCALE(String mAP_SCALE) {
		MAP_SCALE = mAP_SCALE;
	}
	public String getMAP_TITLE() {
		return MAP_TITLE;
	}
	public void setMAP_TITLE(String mAP_TITLE) {
		MAP_TITLE = mAP_TITLE;
	}
	public String getPRINT_LAYER() {
		return PRINT_LAYER;
	}
	public void setPRINT_LAYER(String pRINT_LAYER) {
		PRINT_LAYER = pRINT_LAYER;
	}
	public String getLAYOUT() {
		return LAYOUT;
	}
	public void setLAYOUT(String lAYOUT) {
		LAYOUT = lAYOUT;
	}
	public String getPRINT_TYPE() {
		return PRINT_TYPE;
	}
	public void setPRINT_TYPE(String pRINT_TYPE) {
		PRINT_TYPE = pRINT_TYPE;
	}
	public String getXMAX() {
		return XMAX;
	}
	public void setXMAX(String xMAX) {
		XMAX = xMAX;
	}
	public String getXMIN() {
		return XMIN;
	}
	public void setXMIN(String xMIN) {
		XMIN = xMIN;
	}
	public String getYMAX() {
		return YMAX;
	}
	public void setYMAX(String yMAX) {
		YMAX = yMAX;
	}
	public String getYMIN() {
		return YMIN;
	}
	public void setYMIN(String yMIN) {
		YMIN = yMIN;
	}


	private String YMAX;
	private String YMIN;
	
	
	
	
	

	
	
	
	
	public String getRDA_IDN() {
		return RDA_IDN;
	}
	public void setRDA_IDN(String rDA_IDN) {
		RDA_IDN = rDA_IDN;
	}
	public String getTABLENAME() {
		return TABLENAME;
	}
	public void setTABLENAME(String tABLENAME) {
		TABLENAME = tABLENAME;
	}
	public String getTABLEID() {
		return TABLEID;
	}
	public void setTABLEID(String tABLEID) {
		TABLEID = tABLEID;
	}
	public String getPOPUP_W() {
		return POPUP_W;
	}
	public void setPOPUP_W(String pOPUP_W) {
		POPUP_W = pOPUP_W;
	}
	public String getPOPUP_H() {
		return POPUP_H;
	}
	public void setPOPUP_H(String pOPUP_H) {
		POPUP_H = pOPUP_H;
	}
	public String getMARKER_STYLE() {
		return MARKER_STYLE;
	}
	public void setMARKER_STYLE(String mARKER_STYLE) {
		MARKER_STYLE = mARKER_STYLE;
	}
	public String getLEGEND_NM() {
		return LEGEND_NM;
	}
	public void setLEGEND_NM(String lEGEND_NM) {
		LEGEND_NM = lEGEND_NM;
	}
	public String getLEGEND_NUM() {
		return LEGEND_NUM;
	}
	public void setLEGEND_NUM(String lEGEND_NUM) {
		LEGEND_NUM = lEGEND_NUM;
	}
	public String getLYR_ON() {
		return LYR_ON;
	}
	public void setLYR_ON(String lYR_ON) {
		LYR_ON = lYR_ON;
	}
	
	public String getSYS_TYPE() {
		return SYS_TYPE;
	}
	public void setSYS_TYPE(String sYS_TYPE) {
		SYS_TYPE = sYS_TYPE;
	}
	public String getWIDTH() {
		return WIDTH;
	}
	public void setWIDTH(String wIDTH) {
		WIDTH = wIDTH;
	}
	public String getHEIGHT() {
		return HEIGHT;
	}
	public void setHEIGHT(String hEIGHT) {
		HEIGHT = hEIGHT;
	}
	public String getLAYERNAME() {
		return LAYERNAME;
	}
	public void setLAYERNAME(String lAYERNAME) {
		LAYERNAME = lAYERNAME;
	}
	public String getPROG_ID() {
		return PROG_ID;
	}
	public void setPROG_ID(String pROG_ID) {
		PROG_ID = pROG_ID;
	}
	public String getCAPTION() {
		return CAPTION;
	}
	public void setCAPTION(String cAPTION) {
		CAPTION = cAPTION;
	}
	public String getLAYER_NAME() {
		return LAYER_NAME;
	}
	public void setLAYER_NAME(String lAYER_NAME) {
		LAYER_NAME = lAYER_NAME;
	}
	public String getUSE_YN() {
		return USE_YN;
	}
	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
	}
	public String getLAYER_LIST() {
		return LAYER_LIST;
	}
	public void setLAYER_LIST(String lAYER_LIST) {
		LAYER_LIST = lAYER_LIST;
	}
	public String getGROUPLAYER_NAME() {
		return GROUPLAYER_NAME;
	}
	public void setGROUPLAYER_NAME(String gROUPLAYER_NAME) {
		GROUPLAYER_NAME = gROUPLAYER_NAME;
	}
	public String getLABEL_FIELD() {
		return LABEL_FIELD;
	}
	public void setLABEL_FIELD(String lABEL_FIELD) {
		LABEL_FIELD = lABEL_FIELD;
	}
	
	public String getMAXSCALE() {
		return MAXSCALE;
	}
	public void setMAXSCALE(String mAXSCALE) {
		MAXSCALE = mAXSCALE;
	}
	public String getMINSCALE() {
		return MINSCALE;
	}
	public void setMINSCALE(String mINSCALE) {
		MINSCALE = mINSCALE;
	}
	public String getOPACITY() {
		return OPACITY;
	}
	public void setOPACITY(String oPACITY) {
		OPACITY = oPACITY;
	}
	public String getFONT_SIZE() {
		return FONT_SIZE;
	}
	public void setFONT_SIZE(String fONT_SIZE) {
		FONT_SIZE = fONT_SIZE;
	}
	public String getFONT_WEIGHT() {
		return FONT_WEIGHT;
	}
	public void setFONT_WEIGHT(String fONT_WEIGHT) {
		FONT_WEIGHT = fONT_WEIGHT;
	}
	public String getFONT_STYLE() {
		return FONT_STYLE;
	}
	public void setFONT_STYLE(String fONT_STYLE) {
		FONT_STYLE = fONT_STYLE;
	}
	public String getFONT_FAMILY() {
		return FONT_FAMILY;
	}
	public void setFONT_FAMILY(String fONT_FAMILY) {
		FONT_FAMILY = fONT_FAMILY;
	}
	public String getFONT_COLOR() {
		return FONT_COLOR;
	}
	public void setFONT_COLOR(String fONT_COLOR) {
		FONT_COLOR = fONT_COLOR;
	}
	public String getSYSTEM_ID() {
		return SYSTEM_ID;
	}
	public void setSYSTEM_ID(String sYSTEM_ID) {
		SYSTEM_ID = sYSTEM_ID;
	}
	public String getGEOMETRY_TYPE() {
		return GEOMETRY_TYPE;
	}
	public void setGEOMETRY_TYPE(String gEOMETRY_TYPE) {
		GEOMETRY_TYPE = gEOMETRY_TYPE;
	}
	public String getFILL_COLOR() {
		return FILL_COLOR;
	}
	public void setFILL_COLOR(String fILL_COLOR) {
		FILL_COLOR = fILL_COLOR;
	}
	public String getFILL_STYLE() {
		return FILL_STYLE;
	}
	public void setFILL_STYLE(String fILL_STYLE) {
		FILL_STYLE = fILL_STYLE;
	}
	public String getOUTLINE_COLOR() {
		return OUTLINE_COLOR;
	}
	public void setOUTLINE_COLOR(String oUTLINE_COLOR) {
		OUTLINE_COLOR = oUTLINE_COLOR;
	}
	public String getOUTLINE_STYLE() {
		return OUTLINE_STYLE;
	}
	public void setOUTLINE_STYLE(String oUTLINE_STYLE) {
		OUTLINE_STYLE = oUTLINE_STYLE;
	}
	public String getOUTLINE_WIDTH() {
		return OUTLINE_WIDTH;
	}
	public void setOUTLINE_WIDTH(String oUTLINE_WIDTH) {
		OUTLINE_WIDTH = oUTLINE_WIDTH;
	}
	public String getSEQ() {
		return SEQ;
	}
	public void setSEQ(String sEQ) {
		SEQ = sEQ;
	}
	public String getDRAW_NAME() {
		return DRAW_NAME;
	}
	public void setDRAW_NAME(String dRAW_NAME) {
		DRAW_NAME = dRAW_NAME;
	}
	
	public String getLAYER_INFO() {
		return LAYER_INFO;
	}
	public void setLAYER_INFO(String lAYER_INFO) {
		LAYER_INFO = lAYER_INFO;
	}
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}    
   
	public String getLYR_SEWER_ON() {
		return LYR_SEWER_ON;
	}
	public void setLYR_SEWER_ON(String lYR_SEWER_ON) {
		LYR_SEWER_ON = lYR_SEWER_ON;
	}
	public String getLYR_WATER_ON() {
		return LYR_WATER_ON;
	}
	public void setLYR_WATER_ON(String lYR_WATER_ON) {
		LYR_WATER_ON = lYR_WATER_ON;
	}
	public String getLYR_ROAD_ON() {
		return LYR_ROAD_ON;
	}
	public void setLYR_ROAD_ON(String lYR_ROAD_ON) {
		LYR_ROAD_ON = lYR_ROAD_ON;
	}
	public String getBJD_NAM() {
		return BJD_NAM;
	}
	public void setBJD_NAM(String bJD_NAM) {
		BJD_NAM = bJD_NAM;
	}
	public String getHJD_NAM() {
		return HJD_NAM;
	}
	public void setHJD_NAM(String hJD_NAM) {
		HJD_NAM = hJD_NAM;
	}
	public String getHJG_NAM() {
		return HJG_NAM;
	}
	public void setHJG_NAM(String hJG_NAM) {
		HJG_NAM = hJG_NAM;
	}
	public String getTotcnt() {
		return totcnt;
	}
	public void setTotcnt(String totcnt) {
		this.totcnt = totcnt;
	}
    
    
    public String getBUL_MAN_NO() {
		return BUL_MAN_NO;
	}
	public void setBUL_MAN_NO(String bUL_MAN_NO) {
		BUL_MAN_NO = bUL_MAN_NO;
	}
	public String getBSI_INT_SN() {
		return BSI_INT_SN;
	}
	public void setBSI_INT_SN(String bSI_INT_SN) {
		BSI_INT_SN = bSI_INT_SN;
	}
	public String getEQB_MAN_SN() {
		return EQB_MAN_SN;
	}
	public void setEQB_MAN_SN(String eQB_MAN_SN) {
		EQB_MAN_SN = eQB_MAN_SN;
	}
	public String getBULD_SE_CD() {
		return BULD_SE_CD;
	}
	public void setBULD_SE_CD(String bULD_SE_CD) {
		BULD_SE_CD = bULD_SE_CD;
	}
	public String getBULD_MNNM() {
		return BULD_MNNM;
	}
	public void setBULD_MNNM(String bULD_MNNM) {
		BULD_MNNM = bULD_MNNM;
	}
	public String getBULD_SLNO() {
		return BULD_SLNO;
	}
	public void setBULD_SLNO(String bULD_SLNO) {
		BULD_SLNO = bULD_SLNO;
	}
	public String getBULD_NM() {
		return BULD_NM;
	}
	public void setBULD_NM(String bULD_NM) {
		BULD_NM = bULD_NM;
	}
	public String getBUL_ENG_NM() {
		return BUL_ENG_NM;
	}
	public void setBUL_ENG_NM(String bUL_ENG_NM) {
		BUL_ENG_NM = bUL_ENG_NM;
	}
	public String getBULD_NM_DC() {
		return BULD_NM_DC;
	}
	public void setBULD_NM_DC(String bULD_NM_DC) {
		BULD_NM_DC = bULD_NM_DC;
	}
	public String getBULD_STTUS() {
		return BULD_STTUS;
	}
	public void setBULD_STTUS(String bULD_STTUS) {
		BULD_STTUS = bULD_STTUS;
	}
	public String getBDTYP_CD() {
		return BDTYP_CD;
	}
	public void setBDTYP_CD(String bDTYP_CD) {
		BDTYP_CD = bDTYP_CD;
	}
	public String getBUL_DPN_SE() {
		return BUL_DPN_SE;
	}
	public void setBUL_DPN_SE(String bUL_DPN_SE) {
		BUL_DPN_SE = bUL_DPN_SE;
	}
	public String getGRO_FLO_CO() {
		return GRO_FLO_CO;
	}
	public void setGRO_FLO_CO(String gRO_FLO_CO) {
		GRO_FLO_CO = gRO_FLO_CO;
	}
	public String getUND_FLO_CO() {
		return UND_FLO_CO;
	}
	public void setUND_FLO_CO(String uND_FLO_CO) {
		UND_FLO_CO = uND_FLO_CO;
	}
	public String getZIP() {
		return ZIP;
	}
	public void setZIP(String zIP) {
		ZIP = zIP;
	}
	public String getPOS_BUL_NM() {
		return POS_BUL_NM;
	}
	public void setPOS_BUL_NM(String pOS_BUL_NM) {
		POS_BUL_NM = pOS_BUL_NM;
	}
	public String getREG_PUB_NM() {
		return REG_PUB_NM;
	}
	public void setREG_PUB_NM(String rEG_PUB_NM) {
		REG_PUB_NM = rEG_PUB_NM;
	}
	public String getEMD_CD() {
		return EMD_CD;
	}
	public void setEMD_CD(String eMD_CD) {
		EMD_CD = eMD_CD;
	}
	public String getLI_CD() {
		return LI_CD;
	}
	public void setLI_CD(String lI_CD) {
		LI_CD = lI_CD;
	}
	public String getMNTN_YN() {
		return MNTN_YN;
	}
	public void setMNTN_YN(String mNTN_YN) {
		MNTN_YN = mNTN_YN;
	}
	public String getLNBR_MNNM() {
		return LNBR_MNNM;
	}
	public void setLNBR_MNNM(String lNBR_MNNM) {
		LNBR_MNNM = lNBR_MNNM;
	}
	public String getLNBR_SLNO() {
		return LNBR_SLNO;
	}
	public void setLNBR_SLNO(String lNBR_SLNO) {
		LNBR_SLNO = lNBR_SLNO;
	}
	public String getCOMPET_DE() {
		return COMPET_DE;
	}
	public void setCOMPET_DE(String cOMPET_DE) {
		COMPET_DE = cOMPET_DE;
	}
	public String getJIBUN() {
		return JIBUN;
	}
	public void setJIBUN(String jIBUN) {
		JIBUN = jIBUN;
	}
	public String getPNU() {
		return PNU;
	}
	public void setPNU(String pNU) {
		PNU = pNU;
	}
	public String getSAN_NUM() {
		return SAN_NUM;
	}
	public void setSAN_NUM(String sAN_NUM) {
		SAN_NUM = sAN_NUM;
	}
	public String getBONBUN() {
		return BONBUN;
	}
	public void setBONBUN(String bONBUN) {
		BONBUN = bONBUN;
	}
	public String getBUBUN() {
		return BUBUN;
	}
	public void setBUBUN(String bUBUN) {
		BUBUN = bUBUN;
	}


	private String totcnt;
    
    
    
    public String getAG_GID() {
		return AG_GID;
	}
	public void setAG_GID(String aG_GID) {
		AG_GID = aG_GID;
	}
	public String getSIG_CD() {
		return SIG_CD;
	}
	public void setSIG_CD(String sIG_CD) {
		SIG_CD = sIG_CD;
	}
	public String getRDS_MAN_NO() {
		return RDS_MAN_NO;
	}
	public void setRDS_MAN_NO(String rDS_MAN_NO) {
		RDS_MAN_NO = rDS_MAN_NO;
	}
	public String getRN() {
		return RN;
	}
	public void setRN(String rN) {
		RN = rN;
	}
	public String getRN_CD() {
		return RN_CD;
	}
	public void setRN_CD(String rN_CD) {
		RN_CD = rN_CD;
	}
	public String getENG_RN() {
		return ENG_RN;
	}
	public void setENG_RN(String eNG_RN) {
		ENG_RN = eNG_RN;
	}
	public String getNTFC_DE() {
		return NTFC_DE;
	}
	public void setNTFC_DE(String nTFC_DE) {
		NTFC_DE = nTFC_DE;
	}
	public String getRN_DLB_DE() {
		return RN_DLB_DE;
	}
	public void setRN_DLB_DE(String rN_DLB_DE) {
		RN_DLB_DE = rN_DLB_DE;
	}
	public String getROA_MAN_ES() {
		return ROA_MAN_ES;
	}
	public void setROA_MAN_ES(String rOA_MAN_ES) {
		ROA_MAN_ES = rOA_MAN_ES;
	}
	public String getWDR_RD_CD() {
		return WDR_RD_CD;
	}
	public void setWDR_RD_CD(String wDR_RD_CD) {
		WDR_RD_CD = wDR_RD_CD;
	}
	public String getROA_CLS_SE() {
		return ROA_CLS_SE;
	}
	public void setROA_CLS_SE(String rOA_CLS_SE) {
		ROA_CLS_SE = rOA_CLS_SE;
	}
	public String getRDS_DPN_SE() {
		return RDS_DPN_SE;
	}
	public void setRDS_DPN_SE(String rDS_DPN_SE) {
		RDS_DPN_SE = rDS_DPN_SE;
	}
	public String getRBP_CN() {
		return RBP_CN;
	}
	public void setRBP_CN(String rBP_CN) {
		RBP_CN = rBP_CN;
	}
	public String getREP_CN() {
		return REP_CN;
	}
	public void setREP_CN(String rEP_CN) {
		REP_CN = rEP_CN;
	}
	public String getROAD_BT() {
		return ROAD_BT;
	}
	public void setROAD_BT(String rOAD_BT) {
		ROAD_BT = rOAD_BT;
	}
	public String getROAD_LT() {
		return ROAD_LT;
	}
	public void setROAD_LT(String rOAD_LT) {
		ROAD_LT = rOAD_LT;
	}
	public String getBSI_INT() {
		return BSI_INT;
	}
	public void setBSI_INT(String bSI_INT) {
		BSI_INT = bSI_INT;
	}
	public String getNLR_LCL_NO() {
		return NLR_LCL_NO;
	}
	public void setNLR_LCL_NO(String nLR_LCL_NO) {
		NLR_LCL_NO = nLR_LCL_NO;
	}
	public String getALWNC_RESN() {
		return ALWNC_RESN;
	}
	public void setALWNC_RESN(String aLWNC_RESN) {
		ALWNC_RESN = aLWNC_RESN;
	}


    
	
	public String getOBJECTID() {
		return OBJECTID;
	}
	public void setOBJECTID(String oBJECTID) {
		OBJECTID = oBJECTID;
	}
	public String getFTR_CDE() {
		return FTR_CDE;
	}
	public void setFTR_CDE(String fTR_CDE) {
		FTR_CDE = fTR_CDE;
	}
	public String getBLD_NAM() {
		return BLD_NAM;
	}
	public void setBLD_NAM(String bLD_NAM) {
		BLD_NAM = bLD_NAM;
	}
	public String getDBL_NAM() {
		return DBL_NAM;
	}
	public void setDBL_NAM(String dBL_NAM) {
		DBL_NAM = dBL_NAM;
	}
	public String getAAA_CDE() {
		return AAA_CDE;
	}
	public void setAAA_CDE(String aAA_CDE) {
		AAA_CDE = aAA_CDE;
	}
	public String getAAB_CDE() {
		return AAB_CDE;
	}
	public void setAAB_CDE(String aAB_CDE) {
		AAB_CDE = aAB_CDE;
	}
	public String getBJD_CDE() {
		return BJD_CDE;
	}
	public void setBJD_CDE(String bJD_CDE) {
		BJD_CDE = bJD_CDE;
	}
	public String getHJD_CDE() {
		return HJD_CDE;
	}
	public void setHJD_CDE(String hJD_CDE) {
		HJD_CDE = hJD_CDE;
	}
	public String getSAN_CDE() {
		return SAN_CDE;
	}
	public void setSAN_CDE(String sAN_CDE) {
		SAN_CDE = sAN_CDE;
	}
	public String getFAC_NUM() {
		return FAC_NUM;
	}
	public void setFAC_NUM(String fAC_NUM) {
		FAC_NUM = fAC_NUM;
	}
	public String getFAD_NUM() {
		return FAD_NUM;
	}
	public void setFAD_NUM(String fAD_NUM) {
		FAD_NUM = fAD_NUM;
	}
	public String getNRD_NAM() {
		return NRD_NAM;
	}
	public void setNRD_NAM(String nRD_NAM) {
		NRD_NAM = nRD_NAM;
	}
	public String getNFC_NUM() {
		return NFC_NUM;
	}
	public void setNFC_NUM(String nFC_NUM) {
		NFC_NUM = nFC_NUM;
	}
	public String getNFD_NUM() {
		return NFD_NUM;
	}
	public void setNFD_NUM(String nFD_NUM) {
		NFD_NUM = nFD_NUM;
	}
	public String getBLD_HIT() {
		return BLD_HIT;
	}
	public void setBLD_HIT(String bLD_HIT) {
		BLD_HIT = bLD_HIT;
	}
	public String getIMP_CDE() {
		return IMP_CDE;
	}
	public void setIMP_CDE(String iMP_CDE) {
		IMP_CDE = iMP_CDE;
	}
	public String getBLD_USE() {
		return BLD_USE;
	}
	public void setBLD_USE(String bLD_USE) {
		BLD_USE = bLD_USE;
	}
	public String getHJG_CDE() {
		return HJG_CDE;
	}
	public void setHJG_CDE(String hJG_CDE) {
		HJG_CDE = hJG_CDE;
	}
	public String getLYR_PK() {
		return LYR_PK;
	}
	public void setLYR_PK(String lYR_PK) {
		LYR_PK = lYR_PK;
	}
	public String getUP_LYR() {
		return UP_LYR;
	}
	public void setUP_LYR(String uP_LYR) {
		UP_LYR = uP_LYR;
	}
	public String getLYR_ID() {
		return LYR_ID;
	}
	public void setLYR_ID(String lYR_ID) {
		LYR_ID = lYR_ID;
	}
	public String getCLS_GBN() {
		return CLS_GBN;
	}
	public void setCLS_GBN(String cLS_GBN) {
		CLS_GBN = cLS_GBN;
	}
	public String getCLS_LVL() {
		return CLS_LVL;
	}
	public void setCLS_LVL(String cLS_LVL) {
		CLS_LVL = cLS_LVL;
	}
	public String getLVL1_NM() {
		return LVL1_NM;
	}
	public void setLVL1_NM(String lVL1_NM) {
		LVL1_NM = lVL1_NM;
	}
	public String getLVL2_NM() {
		return LVL2_NM;
	}
	public void setLVL2_NM(String lVL2_NM) {
		LVL2_NM = lVL2_NM;
	}
	public String getLVL3_NM() {
		return LVL3_NM;
	}
	public void setLVL3_NM(String lVL3_NM) {
		LVL3_NM = lVL3_NM;
	}
	public String getLYR_SYMBOL() {
		return LYR_SYMBOL;
	}
	public void setLYR_SYMBOL(String lYR_SYMBOL) {
		LYR_SYMBOL = lYR_SYMBOL;
	}
	
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getLOG_IDN() {
		return LOG_IDN;
	}
	public void setLOG_IDN(String lOG_IDN) {
		LOG_IDN = lOG_IDN;
	}
	
    
}
