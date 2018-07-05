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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonDAO;
import usolver.com.cmm.dao.CommonMapper;
import usolver.book.service.RegisterService;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.com.cmm.service.Globals;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

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

@Service("registerService")
public class RegisterServiceImpl extends AbstractServiceImpl implements   RegisterService {
	
    
    /** commonMapper DAO */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
    
    /** ID Generation */
    @Resource(name="egovIdGnrService")    
    private EgovIdGnrService egovIdGnrService;

    /**을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List<EgovMap> registerList( Object parameterObject) throws Exception {
        return (List<EgovMap>)commonMapper.getSelectList("book.selectList", parameterObject);
    }
 
    public List registerExcel(Object parameterObject) throws Exception {
        return commonMapper.getSelectList("book.selectRegisterExcel", parameterObject);
    }
  
    /**
	 * 목록 컬럼을 조회한다.
	 * @param Map - 조회할 정보가 담긴 VO
	 * @return 조회 목록 컬럼
	 * @exception
	 */
     public List<EgovMap>  selectColumnsList(Map tablename) throws Exception {
    	 if(Globals.GIS_ENGINE_TYPE.equals("GeoServer"))  //ggash 20170123 for geoserver
    		 return (List<EgovMap>)commonMapper.list("book.selectColumnsListByGeoServer", tablename);
    	 else
    		 return (List<EgovMap>)commonMapper.list("book.selectColumnsList", tablename);
    }
     
    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public int registerListCnt(Object parameterObject) {
		return commonMapper.getSelectCnt("book.selectListCnt", parameterObject);
	}
    
    /**
   	 * 글을 조회한다.
   	 * @param vo - 조회할 정보가 담긴 VO
   	 * @return 조회한 글
   	 * @exception Exception
   	 */
    public EgovMap registerDetail(Object parameterObject) throws Exception {
       	EgovMap resultVO = (EgovMap) commonMapper.getSelect("book.selectRegisterDetail",parameterObject);

       	if (resultVO == null)
               throw processException("info.nodata.msg");
        return resultVO;
    }
      
       
    /**
   	 * KEY Column이 들어왔을때.. G2ID 정보를 조회한다. 
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return G2ID
   	 * @exception
   	 */
    public String registerGetSelectColumn(String sTableName, String sSearchColumn, JSONObject jCondition ) throws Exception {
 	
    	HashMap searchObject =  new HashMap();
		searchObject.put("TABLENAME", sTableName);
		searchObject.put("SEARCH_COLUMN", sSearchColumn);
		
    	//조건이 여러개인 경우도 처리할려면.. 우띠 어려워.. 
		List searchList = new ArrayList();
		
		Iterator iterator = jCondition.keySet().iterator();
		while(iterator.hasNext()){
			
			  String sCondition = (String) iterator.next();
			  String sData = (String)  jCondition.get(sCondition);
			  
			  searchList.add("AND "+sCondition+" = #{"+sCondition+"} ");
			  searchObject.put(sCondition, sData);
		}
		
		searchObject.put("searchColumnsList",searchList);				
		
   		return (String)commonMapper.getSelect("book.selectSearchColumn", searchObject);
   	}
    
    
    /**
   	 * KEY Column이 들어왔을때..특정 필드 리스트를 조회한다. 
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return EgovMap
   	 * @exception
   	 */
    public List<EgovMap> registerGetSelectColumnList(String sTableName, String sSearchColumn, JSONObject jCondition, String sOrderby ) throws Exception {
 	
    	HashMap searchObject =  new HashMap();
		searchObject.put("TABLENAME", sTableName);
		searchObject.put("SEARCH_COLUMN", sSearchColumn);
		
    	//조건이 여러개인 경우도 처리할려면.. 우띠 어려워.. 
		List searchList = new ArrayList();
		
		Iterator iterator = jCondition.keySet().iterator();
		while(iterator.hasNext()){
			
			  String sCondition = (String) iterator.next();
			  String sData = (String)  jCondition.get(sCondition);
			  
			  searchList.add("AND "+sCondition+" = #{"+sCondition+"} ");
			  searchObject.put(sCondition, sData);
		}		
		searchObject.put("searchColumnsList",searchList);		
		searchObject.put("ORDERBY",sOrderby);		
		
	 	return (List<EgovMap>)commonMapper.getSelectList("book.selectSearchColumnList", searchObject); 
   	}
    
    /**
   	 * 글을 수정한다.
   	 * @param vo - 수정할 정보가 담긴 SampleVO
   	 * @return void형
   	 * @exception Exception
   	 */
       public int  updateRegister(Object parameterObject) throws Exception {
       	int result = 0;

       	try {
   			result = commonMapper.updateData("book.updateRegister", parameterObject);
   			
   		} catch (Exception e) {
   			throw new Exception(e);
   		}
       	return result;
       }

       /**
        * 글을 등록한다.
        * @param vo - 등록할 정보가 담긴 SampleVO
        * @return int형
        * @exception Exception
        */
      public int  insertRegister(Object parameterObject) throws Exception {
      	int result = 0;

      	try {
  			result = commonMapper.insertData("book.insertRegister", parameterObject);
  			
  		} catch (Exception e) {
  			throw new Exception(e);
  		}
      	return result;
      }
      
     /**
  	 * 사용자 검색목록을 저장한다. - Yu_mk
  	 * @param 리스트 목록을 담은 List
  	 * @exception Exception
  	 */
     public void insertRegisterUserList(Object parameterObject) throws Exception {
     	try {
 			commonMapper.insertData("book.registerSaveUserList", parameterObject);
 		} catch (Exception e) {
 			throw new Exception(e);
 		}
     }
     
     /**
   	 * 사용자 검색목록을 저장한다. - Yu_mk
   	 * @param 리스트 목록을 담은 List
   	 * @exception Exception
   	 */
      public void updateRegisterUserList(Object parameterObject) throws Exception {
      	try {
  			commonMapper.updateData("book.registerUpdateUserList", parameterObject);
  		} catch (Exception e) {
  			throw new Exception(e);
  		}
      }
      
     /**
	 * 대장목록을 가져온다. - Yu_mk
	 * @exception Exception
	 */
     public List<EgovMap> registerFieldList(String tableName) throws Exception {
    	 if(Globals.GIS_ENGINE_TYPE.equals("GeoServer")) //ggash 20170125 for geoserver
    		 return commonMapper.getSelectList("book.registerFieldListForGeoServer", tableName);
    	 else
    		 return commonMapper.getSelectList("book.registerFieldList", tableName);
     }
     public List<EgovMap> registerFieldList2(String tableName) throws Exception {
         return commonMapper.getSelectList("book.registerFieldList2", tableName);
     }
     
     /**
      * 사용자 검색목록을 삭제한다. - Yu_mk
      * @exception Exception
      */
     public int deleteRegisterUserList(Object parameterObject) throws Exception {
    	 return commonMapper.deleteData("book.registerDeleteUserList", parameterObject);
     }
      
     /**
   	 * 사용자 검색목록을 가져온다. - Yu_mk
   	 * @exception Exception
   	 */
     public List registerGetUserList(Object parameterObject) throws Exception {
         return commonMapper.getSelectList("book.registerGetUserList", parameterObject);
     }
     
     /**
	 * 사용자 조회. - Yu_mk
	 * @exception Exception
	 */
      public int registerCheckUser(Object parameterObject) throws Exception {
    	  return commonMapper.getSelectCnt("book.registerCheckUser", parameterObject);
      }
      
      public List<EgovMap> selectAttResult(Object parameterObject) throws Exception {
          return commonMapper.getSelectList("book.selectAttResult", parameterObject);
      }
}
   