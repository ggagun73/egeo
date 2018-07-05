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
public class CodeVO extends DefaultVO {
	
    private static final long serialVersionUID = 1L;
    
    private String CONTENT_ID;
    private String CODE_ID;
    private String CODE;
    private String VAL;
    private String DOMAIN;
    private String TABLE_NM;

    // 새주소 검색
    private int s_INIT;
    private int e_INIT;
    private String RN;
    private String RN_CD;
 
	public String getCONTENT_ID() {
		return CONTENT_ID;
	}
	public void setCONTENT_ID(String cONTENT_ID) {
		CONTENT_ID = cONTENT_ID;
	}
	public String getCODE_ID() {
		return CODE_ID;
	}
	public void setCODE_ID(String cODE_ID) {
		CODE_ID = cODE_ID;
	}
	public String getCODE() {
		return CODE;
	}
	public void setCODE(String cODE) {
		CODE = cODE;
	}
	public String getVAL() {
		return VAL;
	}
	public void setVAL(String vAL) {
		VAL = vAL;
	}
	public String getDOMAIN() {
		return DOMAIN;
	}
	public void setDOMAIN(String dOMAIN) {
		DOMAIN = dOMAIN;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getTABLE_NM() {
		return TABLE_NM;
	}
	public void setTABLE_NM(String tABLE_NM) {
		TABLE_NM = tABLE_NM;
	}
	public int getS_INIT() {
		return s_INIT;
	}
	public void setS_INIT(int s_INIT) {
		this.s_INIT = s_INIT;
	}
	public int getE_INIT() {
		return e_INIT;
	}
	public void setE_INIT(int e_INIT) {
		this.e_INIT = e_INIT;
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
}
