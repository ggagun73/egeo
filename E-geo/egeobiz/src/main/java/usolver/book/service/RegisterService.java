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
package usolver.book.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**  
 * @Class Name : RegisterService.java
 * @Description : RegisterService Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.04.11           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */

public interface RegisterService {
	/**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	List<EgovMap> registerList(Object parameterObject) throws Exception;

	/**
	 * 컬럼 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 컬럼 목록
	 * @exception Exception
	 */
	List<EgovMap> selectColumnsList(Map tablename) throws Exception;
	List registerExcel(Object parameterObject) throws Exception;
	
	/**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	int registerListCnt(Object parameterObject);

	/**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 VO
	 * @return 조회한 글
	 * @exception Exception
	 */
	EgovMap registerDetail(Object parameterObject) throws Exception;
	
    /**
   	 * KEY Column이 들어왔을때.. G2ID 정보를 조회한다. 
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return G2ID
   	 * @exception
   	 */
	public String registerGetSelectColumn(String sTableName, String sSearchColumn, JSONObject jCondition) throws Exception;
	
	
	  /**
   	 * KEY Column이 들어왔을때.. 결과 정보를 조회한다. 
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return G2ID
   	 * @exception
   	 */
	List<EgovMap> registerGetSelectColumnList(String sTableName, String sSearchColumn, JSONObject jCondition, String sOrderby) throws Exception;
	/**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	int updateRegister(Object parameterObject) throws Exception;

	/**
	 * 글을 등록한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	int insertRegister(Object parameterObject) throws Exception;
	
	/**
	 * 사용자 검색목록 설정 관련
	 * @exception Exception
	 */
	List<EgovMap> registerFieldList(String tableName) throws Exception;
	List<EgovMap> registerFieldList2(String tableName) throws Exception;
	void insertRegisterUserList(Object parameterObject) throws Exception;
	void updateRegisterUserList(Object parameterObject) throws Exception;
	int deleteRegisterUserList(Object parameterObject) throws Exception;
	
	int registerCheckUser(Object parameterObject) throws Exception;
	List registerGetUserList(Object parameterObject) throws Exception;	
	List<EgovMap> selectAttResult(Object parameterObject) throws Exception;
}
