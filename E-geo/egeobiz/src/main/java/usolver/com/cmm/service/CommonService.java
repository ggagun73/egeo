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
package usolver.com.cmm.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import usolver.com.cmm.map.service.vo.SearchEditHisVO;
import usolver.com.cmm.map.service.vo.SearchFacilityVO;
import usolver.com.cmm.vo.CodeVO;
import usolver.com.cmm.vo.UsvBookLogVO;


/**  
 * @Class Name : EgovSampleService.java
 * @Description : EgovSampleService Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀 * 
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface CommonService {

	List selectDtlCd(CodeVO searchVO) throws Exception;
	List selectCd(CodeVO searchVO) throws Exception;
	List selectG2SCd(CodeVO cv) throws Exception;
	List selectHjgCde(CodeVO searchVO) throws Exception;
	
	List selectCdByDomain(CodeVO cv) throws Exception;
	List selectHjdCd(CodeVO searchVO) throws Exception;
	List selectHjdCde(CodeVO searchVO) throws Exception;	
	List selectBjdCde(CodeVO searchVO) throws Exception;
	List selectNrdNam(CodeVO searchVO) throws Exception;
	List selectAttList(SearchFacilityVO searchVO) throws Exception;
	List selectAttFld(SearchFacilityVO searchVO) throws Exception;
	List selectAttFldVal(SearchFacilityVO searchVO) throws Exception;
	List selectAttResult(SearchFacilityVO searchVO) throws Exception;
	List selectEditHis(SearchEditHisVO searchVO) throws Exception; 
	
	/**
	 * 상수민원종류 코드를 조회한다.
	 * @param cv
	 * @return
	 * @throws Exception
	 */
	List selectAplCde(usolver.com.cmm.vo.CodeVO cv) throws Exception;
	
	/**
	 * 산구분 코드를 조횐한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return
	 * @throws Exception
	 */
	List selectSanCde(CodeVO searchVO) throws Exception;
	
	String getObjectId(String tableNm) throws Exception;	// OBJECTID 추출
    
    /*String fileInsert(String slpMnumbr) throws Exception;*/
    int fileInsert(HttpServletRequest request, String subPath) throws Exception;
    
    // 파일 업로드 (파일명 지정)
    int fileInsert(HttpServletRequest request, String subPath, String fileNm) throws Exception;
    
    // 파일 삭제
    int fileDelete(String subPath, String fileNm) throws Exception;
    
    // 파일 존재 여부 확인
    boolean fileExist(String subPath, String fileNm) throws Exception;
    
    //공사번호로 OBJECTID 가져오기
    public String GetConsMaOID(String type, String cnt_num) throws Exception;
    
    /* 출력 관련 */
	/* 상수 : 유지보수 내역 목록 조회 */
    //public List wttWutlHtList(String ftr_cde, String ftr_idn) throws Exception;
    /* 도로 : 유지보수 내역 목록 조회 
    public List rdtPrsvDtList(String ftr_cde, String ftr_idn) throws Exception;*/
    /* 하수 : 유지보수 내역 목록 조회 
    public List swtSutlHtList(String ftr_cde, String ftr_idn) throws Exception;*/
   
    public String getNewID(String table_name, String field_name) throws Exception;
    
    public String getNewID(String table_name, String field_name, int lpad) throws Exception;
    
    public String getNewID_MM(String table_name, String field_name, int lpad) throws Exception;
    //신규 공사번호 가져오기 : SA20140001 = 테이블명, 필드명, 숫자 자리수(0001), 접두사(SA)
    public String getNewID(String table_name, String field_name, int lpad, String leadingChar) throws Exception;
    
    public String getMaxID(String table_name, String max_field, String master_field1, String master_field1_val, String master_field2, String master_field2_val) throws Exception;
    public String getMaxID(String table_name, String max_field, String master_field1, String master_field1_val, String master_field2, String master_field2_val, String master_field3, String master_field3_val) throws Exception;
    
    public String getNewAddr(String BJD_CDE, String OLD_SAN, String OLD_BON, String OLD_BUB) throws Exception;
    
    public List getGdbFields(String TABLENAME) throws Exception;
    /**
	 * 공간정보 입력 시 위치정보에 따른 속성처리
	 */
    public int setLayerAttr(String TABLENAME, String UPDATESQL, String OBJECTID) throws Exception;

    /**
	 * 공간정보 삭제 시 유지보수이력 삭제
	 */
    //int deleteRWS_HT(WttImgeEtVO vo) throws Exception;

    String InsertBookLog(UsvBookLogVO vo) throws Exception;
	List usvBookLogTagAls(UsvBookLogVO searchVO) throws Exception;
	List usvBookLogList(UsvBookLogVO searchVO) throws Exception;
    int usvBookLogListCnt(UsvBookLogVO searchVO);
	String getFieldAliasByFieldName(String TABLENAME, String FIELDNAME) throws Exception;
	int getCoordScale(String G2_NAME) throws Exception;
	
	public String getBrowser(HttpServletRequest request) throws Exception;
	public String getKorFileName(String browser_name, String file_name) throws Exception;
	public List getDomainMap(String domainId) throws Exception;
}
