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

import java.util.List;

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

public interface BookService {
	/**
	 * 칼럼 정보를 가져온다.
	 * @exception Exception
	 */
	List usvFieldCode(Object parameterObject) throws Exception;
	List bookColumnList(String TABLENAME) throws Exception;

	/**
	 * 글 목록을 조회한다.
	 * @return 글 목록
	 * @exception Exception
	 */
	List<EgovMap> selectBookG2List(Object parameterObject) throws Exception;
	List<EgovMap> selectBookList(Object parameterObject) throws Exception;
	
	/**
	 * 글 총 갯수를 조회한다.
	 * @return 글 총 갯수
	 * @exception
	 */
	int selectBookListCnt(Object parameterObject);

	/**
	 * 글을 조회한다.
	 * @param object - 조회할 정보가 담긴 object
	 * @return 조회한 글
	 * @exception Exception
	 */
	EgovMap bookDetail(Object parameterObject) throws Exception;
	EgovMap bookDetailAll(Object parameterObject) throws Exception;
	EgovMap bookImgeDetail(Object parameterObject) throws Exception;
	
	/**
	 * 글을 조회한다.
	 * @param object - 조회할 정보가 담긴 object
	 * @return 조회한 글
	 * @exception Exception
	 */
	List bookSubDetail(Object parameterObject) throws Exception;
	
	/**
	 * 글을 수정한다.
	 * @param object - 조회할 정보가 담긴 object
	 * @return int형
	 * @exception Exception
	 */
	int updateBook(Object parameterObject) throws Exception;
	int updateBookImge(Object parameterObject) throws Exception;
	
	/**
	 * 글을 삭제한다.
	 * @param object - 삭제할 정보가 담긴 object
	 * @return void형 
	 * @exception Exception
	 */
    int deleteBook(Object parameterObject) throws Exception;
    
    /**
	 * 글을 등록한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    int insertBook(Object parameterObject) throws Exception;
    
    /**
	 * 도면/사진 파일명을 추출한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    String bookImgeFileNameFtr(Object parameterObject) throws Exception;
    String bookImgeFileNameCnt(Object parameterObject) throws Exception;
    
    /**
	 * 도면/사진 관리번호를 추출한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    String bookImgeIdn(Object parameterObject) throws Exception;
    
    /**
	 * 등록한다. (공통 사용 가능)
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    int insertBookAll(Object parameterObject) throws Exception;
    
    /**
	 * 도면/사진을 삭제한다.
	 * @param object - 삭제할 정보가 담긴 object
	 * @return void형 
	 * @exception Exception
	 */
    int deleteBookImge(Object parameterObject) throws Exception;
}
