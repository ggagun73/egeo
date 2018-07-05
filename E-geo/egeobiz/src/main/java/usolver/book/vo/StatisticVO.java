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
 * @Class Name : WtlAodrAsVO.java
 * @Description : WtlAodrAsVO Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.07.24           최초생성
 * 
 * @author 지노시스템
 * @since 2014. 07.24
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class StatisticVO extends DefaultVO {
	
    private static final long serialVersionUID = 1L;
    
    private String TABLENAME;
    private String ROWFIELD;
    private String ROWALIAS;
    private String COLFIELD;
    private String RESULTTYPE;
    private String RESULTFIELD;
    
    private String COLUMN;
    private String LEFTQUERY;
    private String SUBQUERY;
    private String WHERE;
    private String ROLLUP;
    
    private String SUBTABLE;
    
    private String YYY;
    private String GU;
    private String YYY_S;
    private String YYY_E;
    
	public String getYYY() {
		return YYY;
	}
	public void setYYY(String yYY) {
		YYY = yYY;
	}
	public String getGU() {
		return GU;
	}
	public void setGU(String gU) {
		GU = gU;
	}
	public String getTABLENAME() {
		return TABLENAME;
	}
	public void setTABLENAME(String tABLENAME) {
		TABLENAME = tABLENAME;
	}
	public String getCOLUMN() {
		return COLUMN;
	}
	public void setCOLUMN(String cOLUMN) {
		COLUMN = cOLUMN;
	}
	public String getSUBQUERY() {
		return SUBQUERY;
	}
	public void setSUBQUERY(String sUBQUERY) {
		SUBQUERY = sUBQUERY;
	}
	public String getWHERE() {
		return WHERE;
	}
	public void setWHERE(String wHERE) {
		WHERE = wHERE;
	}
	public String getROWFIELD() {
		return ROWFIELD;
	}
	public void setROWFIELD(String rOWFIELD) {
		ROWFIELD = rOWFIELD;
	}
	public String getROWALIAS() {
		return ROWALIAS;
	}
	public void setROWALIAS(String rOWALIAS) {
		ROWALIAS = rOWALIAS;
	}
	public String getCOLFIELD() {
		return COLFIELD;
	}
	public void setCOLFIELD(String cOLFIELD) {
		COLFIELD = cOLFIELD;
	}
	public String getRESULTTYPE() {
		return RESULTTYPE;
	}
	public void setRESULTTYPE(String rESULTTYPE) {
		RESULTTYPE = rESULTTYPE;
	}
	public String getRESULTFIELD() {
		return RESULTFIELD;
	}
	public void setRESULTFIELD(String rESULTFIELD) {
		RESULTFIELD = rESULTFIELD;
	}
	public String getLEFTQUERY() {
		return LEFTQUERY;
	}
	public void setLEFTQUERY(String lEFTQUERY) {
		LEFTQUERY = lEFTQUERY;
	}
	public String getROLLUP() {
		return ROLLUP;
	}
	public void setROLLUP(String rOLLUP) {
		ROLLUP = rOLLUP;
	}
	public String getYYY_S() {
		return YYY_S;
	}
	public String getSUBTABLE() {
		return SUBTABLE;
	}
	public void setSUBTABLE(String sUBTABLE) {
		SUBTABLE = sUBTABLE;
	}
	public void setYYY_S(String yYY_S) {
		YYY_S = yYY_S;
	}
	public String getYYY_E() {
		return YYY_E;
	}
	public void setYYY_E(String yYY_E) {
		YYY_E = yYY_E;
	}
}
   