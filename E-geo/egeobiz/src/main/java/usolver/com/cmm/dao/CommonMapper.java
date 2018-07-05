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
package usolver.com.cmm.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


/**  
 * @Class Name : SampleDAO.java
 * @Description : Sample DAO Class
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

@Repository("commonMapper")
public class CommonMapper extends EgovAbstractMapper {
	private final Logger log = Logger.getLogger(this.getClass()); //log4j
	
	// 목록 조회용
	public List getSelectList(String sqlMapId, Object parameter){
		List list;

		try {
			long startTime = System.currentTimeMillis();

			list = list(sqlMapId, parameter);

			long endTime = System.currentTimeMillis();
			if (log.isDebugEnabled()) {
				log.debug("["+sqlMapId+"]query execute TIME : " + (endTime - startTime) + "(ms)]]");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException (e);
		}

		return list;
	}
	
	// 단일 데이터 검색용
	public int getSelectCnt(String sqlMapId, Object parameter){
		int result = 0;

		try {
			long startTime = System.currentTimeMillis();

			result = (Integer)selectByPk(sqlMapId, parameter);

			long endTime = System.currentTimeMillis();
			if (log.isDebugEnabled()) {
				log.debug("["+sqlMapId+"]query execute TIME : " + (endTime - startTime) + "(ms)]]");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException (e);
		}

		return result;
	}
	
	// 단일 데이터 검색용
	public Object getSelect(String sqlMapId, Object parameter){
		Object result = null;

		try {
			long startTime = System.currentTimeMillis();

			result = selectByPk(sqlMapId, parameter);

			long endTime = System.currentTimeMillis();
			if (log.isDebugEnabled()) {
				log.debug("["+sqlMapId+"]query execute TIME : " + (endTime - startTime) + "(ms)]]");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException (e);
		}

		return result;
	}

    
	/**
	 * 파일 등록
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertData(String sqlMapId, Object parameter) throws Exception {
    	int result = 0;

		try {
			long startTime = System.currentTimeMillis();

			result = insert(sqlMapId, parameter);

			long endTime = System.currentTimeMillis();
			if (log.isDebugEnabled()) {
				log.debug("["+sqlMapId+"]query execute TIME : " + (endTime - startTime) + "(ms)]]");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException (e);
		}

		return result;
    }
    
	/**
	 * 파일 등록
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int updateData(String sqlMapId, Object parameter) throws Exception {
    	int result = 0;

		try {
			long startTime = System.currentTimeMillis();

			result = (Integer)update(sqlMapId, parameter);

			long endTime = System.currentTimeMillis();
			if (log.isDebugEnabled()) {
				log.debug("["+sqlMapId+"]query execute TIME : " + (endTime - startTime) + "(ms)]]");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException (e);
		}

		return result;
    }

    /**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 SampleVO
	 * @return void형 
	 * @exception Exception
	 */
    public int deleteData(String sqlMapId, Object parameter) throws Exception {
    	int result = 0;

		try {
			long startTime = System.currentTimeMillis();

			result = (Integer)delete(sqlMapId, parameter);

			long endTime = System.currentTimeMillis();
			if (log.isDebugEnabled()) {
				log.debug("["+sqlMapId+"]query execute TIME : " + (endTime - startTime) + "(ms)]]");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new RuntimeException (e);
		}

		return result;
    }

}
