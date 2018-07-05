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
package usolver.com.cmm.vo;

import java.math.*;
import java.sql.*;

/**  
 * @Class Name : SampleVO.java
 * @Description : SampleVO Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class UsvBookLogVO extends DefaultVO {
	private String SYS_TYP;
	private String TAG_IDN;
	private String CUD_CDE;
	private String COL_NAM;
	private String COL_ALS;
	private String BEF_VAL;
	private String AFT_VAL;
	private Date CHG_YMD;
	private String CHG_NAM;
	private String CHG_DPT;
	private String CHG_UDT;
	private String CHG_UID;
	private String TAG_NAM;
	private String TAG_ALS;
	private BigDecimal LOG_IDN;
	private String LOG_NUM;
	private String COUNTBYTYPE;
	
	public String getSYS_TYP() {
		return SYS_TYP;
	}
	public void setSYS_TYP(String sYS_TYP) {
		SYS_TYP = sYS_TYP;
	}
	public String getTAG_IDN() {
		return TAG_IDN;
	}
	public void setTAG_IDN(String tAG_IDN) {
		TAG_IDN = tAG_IDN;
	}
	public String getCUD_CDE() {
		return CUD_CDE;
	}
	public void setCUD_CDE(String cUD_CDE) {
		CUD_CDE = cUD_CDE;
	}
	public String getCOL_NAM() {
		return COL_NAM;
	}
	public void setCOL_NAM(String cOL_NAM) {
		COL_NAM = cOL_NAM;
	}
	public String getCOL_ALS() {
		return COL_ALS;
	}
	public void setCOL_ALS(String cOL_ALS) {
		COL_ALS = cOL_ALS;
	}
	public String getBEF_VAL() {
		return BEF_VAL;
	}
	public void setBEF_VAL(String bEF_VAL) {
		BEF_VAL = bEF_VAL;
	}
	public String getAFT_VAL() {
		return AFT_VAL;
	}
	public void setAFT_VAL(String aFT_VAL) {
		AFT_VAL = aFT_VAL;
	}
	public String getCHG_NAM() {
		return CHG_NAM;
	}
	public void setCHG_NAM(String cHG_NAM) {
		CHG_NAM = cHG_NAM;
	}
	public String getCHG_DPT() {
		return CHG_DPT;
	}
	public void setCHG_DPT(String cHG_DPT) {
		CHG_DPT = cHG_DPT;
	}
	public String getCHG_UDT() {
		return CHG_UDT;
	}
	public void setCHG_UDT(String cHG_UDT) {
		CHG_UDT = cHG_UDT;
	}
	public String getCHG_UID() {
		return CHG_UID;
	}
	public void setCHG_UID(String cHG_UID) {
		CHG_UID = cHG_UID;
	}
	public String getTAG_NAM() {
		return TAG_NAM;
	}
	public void setTAG_NAM(String tAG_NAM) {
		TAG_NAM = tAG_NAM;
	}
	public String getTAG_ALS() {
		return TAG_ALS;
	}
	public void setTAG_ALS(String tAG_ALS) {
		TAG_ALS = tAG_ALS;
	}
	public Date getCHG_YMD() {
		return CHG_YMD;
	}
	public void setCHG_YMD(Date cHG_YMD) {
		CHG_YMD = cHG_YMD;
	}
	public BigDecimal getLOG_IDN() {
		return LOG_IDN;
	}
	public void setLOG_IDN(BigDecimal lOG_IDN) {
		LOG_IDN = lOG_IDN;
	}
	public String getLOG_NUM() {
		return LOG_NUM;
	}
	public void setLOG_NUM(String lOG_NUM) {
		LOG_NUM = lOG_NUM;
	}
	public String getCOUNTBYTYPE() {
		return COUNTBYTYPE;
	}
	public void setCOUNTBYTYPE(String cOUNTBYTYPE) {
		COUNTBYTYPE = cOUNTBYTYPE;
	}
}
