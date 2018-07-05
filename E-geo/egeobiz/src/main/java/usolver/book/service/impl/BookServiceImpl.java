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
package usolver.book.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import usolver.book.service.BookService;
import usolver.com.cmm.dao.CommonMapper;


/**  
 * @Class Name : RegisterServiceImpl.java
 * @Description : Sample Business Implement Class
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

@Service("bookService")
public class BookServiceImpl extends AbstractServiceImpl implements BookService {

	/** commonMapper DAO */
	@Resource(name="commonMapper")
	private CommonMapper commonMapper;


	/** ID Generation */
	@Resource(name="egovIdGnrService")    
	private EgovIdGnrService egovIdGnrService;

	/**
	 * 필드 정보를 가져온다. - Yu_mk
	 * @exception Exception
	 */
	public List usvFieldCode(Object parameterObject) throws Exception {
		return commonMapper.getSelectList("book.usvFieldCode", parameterObject);
	}
	public List bookColumnList(String TABLENAME) throws Exception {
		return commonMapper.getSelectList("book.bookColumnList", TABLENAME);
	}

	/**
	 * 글 목록을 조회한다.
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<EgovMap> selectBookG2List( Object parameterObject) throws Exception {
		return (List<EgovMap>)commonMapper.getSelectList("book.selectBookG2List", parameterObject);
	}
	public List<EgovMap> selectBookList( Object parameterObject) throws Exception {
		return (List<EgovMap>)commonMapper.getSelectList("book.selectBookList", parameterObject);
	}
	
	/**
	 * 글 총 갯수를 조회한다.
	 * @return 글 총 갯수
	 * @exception
	 */
	public int selectBookListCnt(Object parameterObject) {
		return commonMapper.getSelectCnt("book.selectBookListCnt", parameterObject);
	}

	/**
	 * 글을 조회한다.
	 * @param object - 조회할 정보가 담긴 object
	 * @return 조회한 글
	 * @exception Exception
	 */
	public EgovMap bookDetail(Object parameterObject) throws Exception {
		EgovMap resultVO = (EgovMap) commonMapper.getSelect("book.bookDetail",parameterObject);

		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}
	public EgovMap bookDetailAll(Object parameterObject) throws Exception {
		EgovMap resultVO = (EgovMap) commonMapper.getSelect("book.bookDetailAll",parameterObject);

		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}
	public EgovMap bookImgeDetail(Object parameterObject) throws Exception {
		EgovMap resultVO = (EgovMap) commonMapper.getSelect("book.bookImgeDetail",parameterObject);
		
		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}
	
	/**
	 * 글을 조회한다.
	 * @param object - 조회할 정보가 담긴 object
	 * @return 조회한 글
	 * @exception Exception
	 */
	public List bookSubDetail(Object parameterObject) throws Exception {
		return commonMapper.getSelectList("book.bookSubDetail",parameterObject);
	}

	/**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
	public int updateBook(Object parameterObject) throws Exception {
		int result = 0;

		try {
			result = commonMapper.updateData("book.bookUpdate", parameterObject);

		} catch (Exception e) {
			throw new Exception(e);
		}
		return result;
	}
	public int updateBookImge(Object parameterObject) throws Exception {
		int result = 0;
		
		try {
			result = commonMapper.updateData("book.bookImgeUpdate", parameterObject);
			
		} catch (Exception e) {
			throw new Exception(e);
		}
		return result;
	}

	/**
	 * 글을 삭제한다.
	 * @param object - 삭제할 정보가 담긴 object
	 * @return void형 
	 * @exception Exception
	 */
    public int deleteBook(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.deleteData("book.bookDelete", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    /**
	 * 글을 등록한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertBook(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.insertData("book.bookInsert", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    /**
	 * 파일명을 추출한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    public String bookImgeFileNameFtr(Object parameterObject) throws Exception {
    	String result = "";

    	try {
			result = (String) commonMapper.getSelect("book.bookImgeFileNameFtr", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    public String bookImgeFileNameCnt(Object parameterObject) throws Exception {
    	String result = "";

    	try {
			result = (String) commonMapper.getSelect("book.bookImgeFileNameCnt", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    /**
	 * 도면사진 관리번호를 추출한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    public String bookImgeIdn(Object parameterObject) throws Exception {
    	String result = "";
    	
    	try {
    		result = (String) commonMapper.getSelect("book.bookImgeIdn", parameterObject);
    	} catch (Exception e) {
    		throw new Exception(e);
    	}
    	return result;
    }
    
    /**
	 * 등록한다.
	 * @param object - 등록할 정보가 담긴 object
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertBookAll(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.insertData("book.bookInsertAll", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    /**
	 * 도면/사진을 삭제한다.
	 * @param object - 삭제할 정보가 담긴 object
	 * @return void형 
	 * @exception Exception
	 */
    public int deleteBookImge(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.deleteData("book.bookImgeDelete", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
}
