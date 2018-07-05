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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import usolver.book.service.AddInfoService;
import usolver.com.cmm.dao.CommonMapper;

import egovframework.com.cmm.service.Globals;
/**  
 * @Class Name : EgovSampleServiceImpl.java
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

@Service("addInfoService")
public class AddInfoServiceImpl extends AbstractServiceImpl implements  AddInfoService {
	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
    
    /**
	 * 목록 컬럼을 조회한다.
	 * @param Map - 조회할 정보가 담긴 VO
	 * @return 조회 목록 컬럼
	 * @exception
	 */
     public List<EgovMap>  selectColumnsList(Map tablename) throws Exception {
    	 if(Globals.GIS_ENGINE_TYPE.equals("GeoServer")) //ggash 20170123 for geoserver
    		 return (List<EgovMap>)commonMapper.list("book.selectColumnsListByGeoServer", tablename);
    	 else
    		 return (List<EgovMap>)commonMapper.list("book.selectColumnsList", tablename);
    }
     
    /**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 AddInfoVO
	 * @return 조회한 글
	 * @exception Exception
	 */
    public EgovMap addInfoDetail(Object parameterObject) throws Exception {
    	EgovMap resultVO = (EgovMap) commonMapper.getSelect("book.selectRegisterDetail", parameterObject);
        if (resultVO == null)
            throw processException("info.nodata.msg");
        return resultVO;
    }
    
    /**
   	 * 관련 테이블의 정보를 조회한다. 
   	 * @param vo - 조회할 정보가 담긴 VO
   	 * @return 조회한 글
   	 * @exception Exception
   	 */
    public EgovMap addInfoView(Object parameterObject) throws Exception {
       	EgovMap resultVO = (EgovMap) commonMapper.getSelect("book.selectAddInfoView",parameterObject);

       	if (resultVO == null)
               throw processException("info.nodata.msg");
        return resultVO;
    }
    
    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<EgovMap> addInfoList(Object parameterObject) throws Exception {
        return commonMapper.getSelectList("book.selectList", parameterObject);
    }
    public List<EgovMap>  addInfoPrint(Object parameterObject) throws Exception {  	
    	return commonMapper.getSelectList("book.selectRegisterPrint", parameterObject);
    }
    public List addInfoExcel(Object parameterObject) throws Exception {
        return commonMapper.getSelectList("book.selectRegisterExcel", parameterObject);
    }

    
    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public int addInfoListCnt(Object parameterObject) {
		return commonMapper.getSelectCnt("book.selectListCnt", parameterObject);
	}

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertAddInfo(Object parameterObject) throws Exception {
    	
    	/** ID Generation Service */
    	/*String id = egovIdGnrService.getNextStringId();

    	egovLogger.debug(vo.toString());*/
    	int result = 0;

    	try {
			result = commonMapper.insertData("book.insertRegister", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    /**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    public int updateAddInfo(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.updateData("book.updateRegister", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    /**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 SampleVO
	 * @return void형 
	 * @exception Exception
	 */
    public int deleteAddInfo(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.deleteData("book.deleteRegister", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    public int deleteRelation(String sTable, String sKeyColumn, String sData) throws Exception {
    	
    	HashMap subObject =  new HashMap();    			
		subObject.put("KEY_COLUMN",sKeyColumn);
		subObject.put(sKeyColumn, sData);
		subObject.put("TABLENAME", sTable);		
    	
    	int result = 0;		
		
    	try {
			result = commonMapper.deleteData("book.deleteRelationTable", subObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    
    public int deleteRdlRdarAs(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.deleteData("book.deleteRdlRdarAs", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    
    public int deleteRdtRtcnDt(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.deleteData("book.deleteRdtRtcnDt", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    public int deleteRdtEachDt(Object parameterObject) throws Exception {
    	int result = 0;

    	try {
			result = commonMapper.deleteData("book.deleteRdtEachDt", parameterObject);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
}
   