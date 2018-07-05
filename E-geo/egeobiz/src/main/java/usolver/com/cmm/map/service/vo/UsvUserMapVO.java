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
public class UsvUserMapVO {
 
    private static final long serialVersionUID = 1L;
    
    //USV_USER_GROUP
    private String USER_ID;
    private String SYS_ID;
    private String GROUP_NAME;
    private String GROUP_LAYERS;
    
    //USV_LOG_USER
    private int LOG_IDN;
    
    //USV_USER_CONFIG
    private String LAYERS;
    private String EXTENT;
    private String VISIBLES;
    
    //USV_USER_SYMBOL
    private String SYMBOL_P;
    private String SYMBOL_L;
    private String SYMBOL_A;
    private String SYMBOL_T;

    //USV_USER_RENDERER
    private String LAYER_ALIASNAME;
    private String RENDERER;
    private String MINSCALE;
    private String MAXSCALE;
    private String ISARROW;
    
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getSYS_ID() {
		return SYS_ID;
	}
	public void setSYS_ID(String sYS_ID) {
		SYS_ID = sYS_ID;
	}
	public String getGROUP_NAME() {
		return GROUP_NAME;
	}
	public void setGROUP_NAME(String gROUP_NAME) {
		GROUP_NAME = gROUP_NAME;
	}
	public String getGROUP_LAYERS() {
		return GROUP_LAYERS;
	}
	public void setGROUP_LAYERS(String gROUP_LAYERS) {
		GROUP_LAYERS = gROUP_LAYERS;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getLAYERS() {
		return LAYERS;
	}
	public void setLAYERS(String lAYERS) {
		LAYERS = lAYERS;
	}
	public String getVISIBLES() {
		return VISIBLES;
	}
	public void setVISIBLES(String vISIBLES) {
		VISIBLES = vISIBLES;
	}
	public int getLOG_IDN() {
		return LOG_IDN;
	}
	public void setLOG_IDN(int lOG_IDN) {
		LOG_IDN = lOG_IDN;
	}
	public String getEXTENT() {
		return EXTENT;
	}
	public void setEXTENT(String eXTENT) {
		EXTENT = eXTENT;
	}
	public String getSYMBOL_P() {
		return SYMBOL_P;
	}
	public void setSYMBOL_P(String sYMBOL_P) {
		SYMBOL_P = sYMBOL_P;
	}
	public String getSYMBOL_L() {
		return SYMBOL_L;
	}
	public void setSYMBOL_L(String sYMBOL_L) {
		SYMBOL_L = sYMBOL_L;
	}
	public String getSYMBOL_A() {
		return SYMBOL_A;
	}
	public void setSYMBOL_A(String sYMBOL_A) {
		SYMBOL_A = sYMBOL_A;
	}
	public String getSYMBOL_T() {
		return SYMBOL_T;
	}
	public void setSYMBOL_T(String sYMBOL_T) {
		SYMBOL_T = sYMBOL_T;
	}
	public String getLAYER_ALIASNAME() {
		return LAYER_ALIASNAME;
	}
	public void setLAYER_ALIASNAME(String lAYER_ALIASNAME) {
		LAYER_ALIASNAME = lAYER_ALIASNAME;
	}
	public String getRENDERER() {
		return RENDERER;
	}
	public void setRENDERER(String rENDERER) {
		RENDERER = rENDERER;
	}
	public String getMINSCALE() {
		return MINSCALE;
	}
	public void setMINSCALE(String mINSCALE) {
		MINSCALE = mINSCALE;
	}
	public String getMAXSCALE() {
		return MAXSCALE;
	}
	public void setMAXSCALE(String mAXSCALE) {
		MAXSCALE = mAXSCALE;
	}
	public String getISARROW() {
		return ISARROW;
	}
	public void setISARROW(String iSARROW) {
		ISARROW = iSARROW;
	}
}
