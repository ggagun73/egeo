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
 *  Copyright (C) by MOPAS All right reserved.
 */
public class UsvUserFieldVO extends DefaultVO {
	
    private static final long serialVersionUID = 1L;
    
    private String SEQ;
    private String USER_ID;
    private String SYS_ID;
    private String SEARCH_COLUMN;
    private String VIEW_COLUMN;
    private String REQ_DATE;
    private String SEARCH_COLUMN_ALIAS;
    private String VIEW_COLUMN_ALIAS;
    
	public String getSEQ() {
		return SEQ;
	}
	public void setSEQ(String sEQ) {
		SEQ = sEQ;
	}
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
	public String getSEARCH_COLUMN() {
		return SEARCH_COLUMN;
	}
	public void setSEARCH_COLUMN(String sEARCH_COLUMN) {
		SEARCH_COLUMN = sEARCH_COLUMN;
	}
	public String getVIEW_COLUMN() {
		return VIEW_COLUMN;
	}
	public void setVIEW_COLUMN(String vIEW_COLUMN) {
		VIEW_COLUMN = vIEW_COLUMN;
	}
	public String getREQ_DATE() {
		return REQ_DATE;
	}
	public void setREQ_DATE(String rEQ_DATE) {
		REQ_DATE = rEQ_DATE;
	}
	public String getSEARCH_COLUMN_ALIAS() {
		return SEARCH_COLUMN_ALIAS;
	}
	public void setSEARCH_COLUMN_ALIAS(String sEARCH_COLUMN_ALIAS) {
		SEARCH_COLUMN_ALIAS = sEARCH_COLUMN_ALIAS;
	}
	public String getVIEW_COLUMN_ALIAS() {
		return VIEW_COLUMN_ALIAS;
	}
	public void setVIEW_COLUMN_ALIAS(String vIEW_COLUMN_ALIAS) {
		VIEW_COLUMN_ALIAS = vIEW_COLUMN_ALIAS;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
