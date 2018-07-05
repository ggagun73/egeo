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
public class NewIDsVO {
	
    private static final long serialVersionUID = 1L;
    
    private String TABLE_NAME;
    private String FIELD_NAME;
    private int LPAD;
    private String LEADINGCHAR;
    
    private String MASTER_FIELD1;
    private String MASTER_FIELD2;
    private String MASTER_FIELD3;
    private String MAX_FIELD;
    private String MASTER_FIELD1_VAL;
    private String MASTER_FIELD2_VAL;
    private String MASTER_FIELD3_VAL;
    
	public String getTABLE_NAME() {
		return TABLE_NAME;
	}
	public void setTABLE_NAME(String tABLE_NAME) {
		TABLE_NAME = tABLE_NAME;
	}
	public String getFIELD_NAME() {
		return FIELD_NAME;
	}
	public void setFIELD_NAME(String fIELD_NAME) {
		FIELD_NAME = fIELD_NAME;
	}
	public String getLEADINGCHAR() {
		return LEADINGCHAR;
	}
	public void setLEADINGCHAR(String lEADINGCHAR) {
		LEADINGCHAR = lEADINGCHAR;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getLPAD() {
		return LPAD;
	}
	public void setLPAD(int lPAD) {
		LPAD = lPAD;
	}
	public String getMAX_FIELD() {
		return MAX_FIELD;
	}
	public void setMAX_FIELD(String mAX_FIELD) {
		MAX_FIELD = mAX_FIELD;
	}
	public String getMASTER_FIELD1() {
		return MASTER_FIELD1;
	}
	public void setMASTER_FIELD1(String mASTER_FIELD1) {
		MASTER_FIELD1 = mASTER_FIELD1;
	}
	public String getMASTER_FIELD2() {
		return MASTER_FIELD2;
	}
	public void setMASTER_FIELD2(String mASTER_FIELD2) {
		MASTER_FIELD2 = mASTER_FIELD2;
	}
	public String getMASTER_FIELD1_VAL() {
		return MASTER_FIELD1_VAL;
	}
	public void setMASTER_FIELD1_VAL(String mASTER_FIELD1_VAL) {
		MASTER_FIELD1_VAL = mASTER_FIELD1_VAL;
	}
	public String getMASTER_FIELD2_VAL() {
		return MASTER_FIELD2_VAL;
	}
	public void setMASTER_FIELD2_VAL(String mASTER_FIELD2_VAL) {
		MASTER_FIELD2_VAL = mASTER_FIELD2_VAL;
	}
	public String getMASTER_FIELD3() {
		return MASTER_FIELD3;
	}
	public void setMASTER_FIELD3(String mASTER_FIELD3) {
		MASTER_FIELD3 = mASTER_FIELD3;
	}
	public String getMASTER_FIELD3_VAL() {
		return MASTER_FIELD3_VAL;
	}
	public void setMASTER_FIELD3_VAL(String mASTER_FIELD3_VAL) {
		MASTER_FIELD3_VAL = mASTER_FIELD3_VAL;
	}
}
