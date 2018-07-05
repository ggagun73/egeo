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
package usolver.book.vo;

import usolver.com.cmm.vo.DefaultVO;


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
public class AddInfoVO extends DefaultVO {
	
    private static final long serialVersionUID = 1L;
    
    private String FID;
    private String FTR_CDE;
    private String FTR_IDN;
    private String REP_NUM;
    private String REP_YMD;
    private String REP_CDE;
    private String SBJ_CDE;
    private String REP_DES; 
    private String OPR_NAM;  
        
    /* 코드를 명칭으로 처리하기 위한 변수 */
    private String FTR_CDE_NM;
    private String REP_CDE_NM;
    private String SBJ_CDE_NM; 
        
	public String getFID() {
		return FID;
	}
	public void setFID(String g2_ID) {
		FID = g2_ID;
	}
	public String getFTR_CDE() {
		return FTR_CDE;
	}
	public void setFTR_CDE(String fTR_CDE) {
		FTR_CDE = fTR_CDE;
	}
	public String getFTR_IDN() {
		return FTR_IDN;
	}
	public void setFTR_IDN(String fTR_IDN) {
		FTR_IDN = fTR_IDN;
	}
	public String getREP_NUM() {
		return REP_NUM;
	}
	public void setREP_NUM(String rEP_NUM) {
		REP_NUM = rEP_NUM;
	}
	public String getREP_YMD() {
		return REP_YMD;
	}
	public void setREP_YMD(String rEP_YMD) {
		REP_YMD = rEP_YMD;
	}
	public String getREP_CDE() {
		return REP_CDE;
	}
	public void setREP_CDE(String rEP_CDE) {
		REP_CDE = rEP_CDE;
	}
	public String getSBJ_CDE() {
		return SBJ_CDE;
	}
	public void setSBJ_CDE(String sBJ_CDE) {
		SBJ_CDE = sBJ_CDE;
	}
	public String getREP_DES() {
		return REP_DES;
	}
	public void setREP_DES(String rEP_DES) {
		REP_DES = rEP_DES;
	}
	public String getOPR_NAM() {
		return OPR_NAM;
	}
	public void setOPR_NAM(String oPR_NAM) {
		OPR_NAM = oPR_NAM;
	}
   public String getFTR_CDE_NM() {
		return FTR_CDE_NM;
	}
	public void setFTR_CDE_NM(String fTR_CDE_NM) {
		FTR_CDE_NM = fTR_CDE_NM;
	}
	public String getREP_CDE_NM() {
		return REP_CDE_NM;
	}
	public void setREP_CDE_NM(String rEP_CDE_NM) {
		REP_CDE_NM = rEP_CDE_NM;
	}
	public String getSBJ_CDE_NM() {
		return SBJ_CDE_NM;
	}
	public void setSBJ_CDE_NM(String sBJ_CDE_NM) {
		SBJ_CDE_NM = sBJ_CDE_NM;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

 
}
   