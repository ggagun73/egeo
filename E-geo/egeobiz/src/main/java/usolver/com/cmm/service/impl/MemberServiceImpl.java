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
package usolver.com.cmm.service.impl;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.annotation.Resource;

import org.json.simple.JSONObject;
import org.springframework.security.providers.encoding.PasswordEncoder;
import org.springframework.security.providers.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.LyrInfoService;
import usolver.com.cmm.service.MemberService;
import usolver.com.main.vo.LoginVO;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;



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

@Service("memberService")
public class MemberServiceImpl extends AbstractServiceImpl implements MemberService {
	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
   
	@Resource(name = "lyrInfoService")
	private LyrInfoService lyrInfoService;
    
    // 아이디 중복체크
    public List<LoginVO> idDDCheck(LoginVO lvo) throws Exception {
    	return commonMapper.getSelectList("admin.idDDCheck", lvo);
    }
    
    /**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public int insertUser(LoginVO login) throws Exception {
    	
    	int result = 0;
    	/** ID Generation Service */
    	
    	//sha-256 암호화 처리 
    	PasswordEncoder encoder = new ShaPasswordEncoder(256); 
    	String hashed = encoder.encodePassword(login.getPASSWORD(), null);    	
    	login.setPASSWORD( hashed );
    	
    	try {
    		result = commonMapper.insertData("userInsert", login);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    /**
	 * 사용자정보를 수정한다.
	 * @param vo - 수정할 정보가 담긴 
	 * @return void형
	 * @exception Exception
	 */
    public int updateUser(LoginVO lvo) throws Exception {
    	int result = 0;
    	
    	try {
			result = commonMapper.updateData("userUpdate", lvo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

    // 사용자 정보 조회
    public LoginVO getUserInfo(LoginVO login) throws Exception {
    	LoginVO resultVO = (LoginVO) commonMapper.getSelect("getUserInfo", login);
    	return resultVO;
    }
    
    
    // 임시 비밀번호 부여
    public String changePW(LoginVO lvo) throws Exception {
    	Random ranPW = new Random();
		int start = 10000000, end = 99999999 ;
		int range = end - start + 1 ;
		String newPW = Integer.toString( ranPW.nextInt(range) + start ) ;
		
		//
		
		try {
			commonMapper.updateData("updatePW", lvo);
		} catch (Exception e) {
			throw new Exception(e);
		}
		
    	return newPW;
    }
    
    // 사용자 정보수정
    public int changeUserInfo(LoginVO loginVo) throws Exception {
    	int result = 0;
    	
		try {
			result = commonMapper.updateData("updatePW", loginVo);
		} catch (Exception e) {
			throw new Exception(e);
		}
		
    	return result;
    }
    
    // 사용자 패스워드 조회
    public List<LoginVO> getPWData(LoginVO loginVo) throws Exception {
    	return commonMapper.getSelectList("getPWData", loginVo);
    }

	//@SuppressWarnings("unchecked")
	public JSONObject getUserAuthorites(List<String> AuthorInfo, String userId, String system) throws Exception {
		
		JSONObject rtnObj = new JSONObject();
		
		JSONObject wtlObj = new JSONObject();
		JSONObject swlObj = new JSONObject();
		JSONObject rdlObj = new JSONObject();
		
		String SYS_ADMIN = "N";
		
	    String WTL_SYSTEM 	= "N";
	    String WTL_VIEW 	= "N";
	    String WTL_EDIT 	= "N";
	    String WTL_PRINT 	= "N";
	    
	    String SWL_SYSTEM 	= "N";
	    String SWL_VIEW 	= "N";
	    String SWL_EDIT 	= "N";
	    String SWL_PRINT 	= "N";
	    		    
	    String RDL_SYSTEM 	= "N";
	    String RDL_VIEW 	= "N";
	    String RDL_EDIT 	= "N";
	    String RDL_PRINT 	= "N";
	    
	    String[] empty_array = new String[0];
		    
		List<EgovMap> readAllLayerInfo = null;
		List<EgovMap> editAllLayerInfo = null;
		
		List<String> LIST_WTL_LAYER = new ArrayList<String>();
		List<String> LIST_SWL_LAYER = new ArrayList<String>();
		List<String> LIST_RDL_LAYER = new ArrayList<String>();
		
		List<String> LIST_WTL_EDITLAYER = new ArrayList<String>();
		List<String> LIST_SWL_EDITLAYER = new ArrayList<String>();
		List<String> LIST_RDL_EDITLAYER = new ArrayList<String>();

		
		for(Object object : AuthorInfo) {
		    String AuthorName = (String) object;
		    
		    //시스텝 접속 권한
		    if(AuthorName.equals("ROLE_ADMIN")){
		    	SYS_ADMIN = "Y";
		    }//시스텝 접속 권한
		    else if(AuthorName.equals("ROLE_WATER")){
		    	WTL_SYSTEM = "Y";
		    } 
		    else if(AuthorName.equals("ROLE_SEWER")){
		    	SWL_SYSTEM = "Y";
		    }  
		    else if(AuthorName.equals("ROLE_ROAD")){
		    	RDL_SYSTEM = "Y";
		    }  
		    else if(AuthorName.equals("ROLE_WATER_MAP_VIEW")){
		    	WTL_VIEW = "Y";
		    }
		    else if(AuthorName.equals("ROLE_WATER_MAP_EDIT")){
		    	WTL_EDIT = "Y";
		    }   
		    else if(AuthorName.equals("ROLE_WATER_MAP_PRINT")){
		    	WTL_PRINT = "Y";
		    }   
		    else if(AuthorName.equals("ROLE_SEWER_MAP_VIEW")){
		    	SWL_VIEW = "Y";
		    }   
		    else if(AuthorName.equals("ROLE_SEWER_MAP_EDIT")){
		    	SWL_EDIT = "Y";
		    }    
		    else if(AuthorName.equals("ROLE_SEWER_MAP_PRINT")){
		    	SWL_PRINT = "Y";
		    }  
		    else if(AuthorName.equals("ROLE_ROAD_MAP_VIEW")){
		    	RDL_VIEW = "Y";
		    } 
		    else if(AuthorName.equals("ROLE_ROAD_MAP_EDIT")){
		    	RDL_EDIT = "Y";
		    }
		    else if(AuthorName.equals("ROLE_ROAD_MAP_PRINT")){
		    	RDL_PRINT = "Y";
		    }
		}
		
		wtlObj.put("SYSTEM", 	WTL_SYSTEM);
		wtlObj.put("VIEW", 		WTL_VIEW);
		wtlObj.put("EDIT", 		WTL_EDIT);
		wtlObj.put("PRINT", 	WTL_PRINT); 
		
		swlObj.put("SYSTEM", 	SWL_SYSTEM);
		swlObj.put("VIEW", 		SWL_VIEW);
		swlObj.put("EDIT", 		SWL_EDIT);
		swlObj.put("PRINT", 	SWL_PRINT);
		
		rdlObj.put("SYSTEM", 	RDL_SYSTEM);
		rdlObj.put("VIEW", 		RDL_VIEW);
		rdlObj.put("EDIT", 		RDL_EDIT);
		rdlObj.put("PRINT", 	RDL_PRINT);
		
		//조회 가능한 레이어 목록 SET
		readAllLayerInfo = lyrInfoService.selectAllLyrByUser(userId); //CASE1. 사용자별 접속가능한 레이어 목록 커스터마이징한 경우 우선 적용
		
		if(readAllLayerInfo != null) {
			if(readAllLayerInfo.size() == 0){
				
				readAllLayerInfo = lyrInfoService.selectAllLyrByAuthor(null);	//상수조회 권한에 공통으로 부여된 레이어 조회
				/*if(WTL_VIEW.equals("Y") && system.equals("WTL"))
					readAllLayerInfo = lyrInfoService.selectWaterLyrByAuthor(null);	//상수조회 권한에 공통으로 부여된 레이어 조회
				else if(SWL_VIEW.equals("Y") && system.equals("SWL"))
					readAllLayerInfo = lyrInfoService.selectSewerLyrByAuthor(null);	//하수조회 권한에 공통으로 부여된 레이어 조회
				else if(RDL_VIEW.equals("Y") && system.equals("RDL"))
					readAllLayerInfo = lyrInfoService.selectRoadLyrByAuthor(null);	//도로조회 권한에 공통으로 부여된 레이어 조회
*/			
			}
				
			if(readAllLayerInfo.size() > 0 ){
				Iterator<EgovMap> iter = readAllLayerInfo.iterator();
	
					//주제도 범위 내에서만 편집 가능하도록 목록 수정
					while(iter.hasNext()) {
		
						EgovMap map = iter.next();
						String tableNm = (String) map.get("tablename"); 
						String wtlUse  = (String) map.get("wtluse"); 
						String swlUse  = (String) map.get("swluse"); 
						String rdlUse  = (String) map.get("rdluse"); 
						
						/*if(WTL_VIEW.equals("Y") && system.equals("WTL"))
							LIST_WTL_LAYER.add(tableNm);
						else if(SWL_VIEW.equals("Y") && system.equals("SWL"))
							LIST_SWL_LAYER.add(tableNm);
						else if(RDL_VIEW.equals("Y") && system.equals("RDL"))
							LIST_RDL_LAYER.add(tableNm);*/
						
						if(wtlUse != null && wtlUse.equals("1") && WTL_VIEW.equals("Y"))
							LIST_WTL_LAYER.add(tableNm);
						if(swlUse != null && swlUse.equals("1") && SWL_VIEW.equals("Y"))
							LIST_SWL_LAYER.add(tableNm);
						if(rdlUse != null && rdlUse.equals("1") && RDL_VIEW.equals("Y"))
							LIST_RDL_LAYER.add(tableNm);
					}
					
				wtlObj.put("VIEW_LAYER", 	LIST_WTL_LAYER); 
				swlObj.put("VIEW_LAYER", 	LIST_SWL_LAYER); 
				rdlObj.put("VIEW_LAYER", 	LIST_RDL_LAYER); 
			}
		}
		else{ 
			wtlObj.put("VIEW_LAYER", 	empty_array); 
			swlObj.put("VIEW_LAYER", 	empty_array); 
			rdlObj.put("VIEW_LAYER", 	empty_array); 
		}
		
		//편집 가능한 레이어 목록 SET
		editAllLayerInfo = lyrInfoService.selectAllEditLyrByUser(userId); //CASE1. 사용자별 편집 가능한 레이어 목록 커스터마이징한 경우 우선 적용
		
		if(editAllLayerInfo != null) {
			if(editAllLayerInfo.size() == 0){
				//editAllLayerInfo = lyrInfoService.selectAllEditLyrByAuthor(null);
				if(WTL_EDIT.equals("Y") && system.equals("WTL"))
					editAllLayerInfo = lyrInfoService.selectEditWaterLyrByAuthor(null);	//상수조회 권한에 공통으로 부여된 레이어 조회
				else if(SWL_EDIT.equals("Y") && system.equals("SWL"))
					editAllLayerInfo = lyrInfoService.selectEditSewerLyrByAuthor(null);	//하수조회 권한에 공통으로 부여된 레이어 조회
				else if(RDL_EDIT.equals("Y") && system.equals("RDL"))
					editAllLayerInfo = lyrInfoService.selectEditRoadLyrByAuthor(null);	//도로조회 권한에 공통으로 부여된 레이어 조회
			}
	
			if(editAllLayerInfo.size() > 0 ){
				Iterator<EgovMap> iter = editAllLayerInfo.iterator();
	
					//주제도 범위 내에서만 편집 가능하도록 목록 수정
					while(iter.hasNext()) {
		
						EgovMap map = iter.next();
						String tableNm = (String) map.get("tablename"); 
						/*String wtlUse  = (String) map.get("wtluse"); 
						String swlUse  = (String) map.get("swluse"); 
						String rdlUse  = (String) map.get("rdluse"); */
						
						if(WTL_EDIT.equals("Y") && system.equals("WTL"))
							LIST_WTL_EDITLAYER.add(tableNm);
						else if(SWL_EDIT.equals("Y") && system.equals("SWL"))
							LIST_SWL_EDITLAYER.add(tableNm);
						else if(RDL_EDIT.equals("Y") && system.equals("RDL"))
							LIST_RDL_EDITLAYER.add(tableNm);
						/*if(wtlUse != null && wtlUse.equals("1") && WTL_EDIT.equals("Y"))
							LIST_WTL_EDITLAYER.add(tableNm);
						if(swlUse != null && swlUse.equals("1") && SWL_EDIT.equals("Y"))
							LIST_SWL_EDITLAYER.add(tableNm);
						if(rdlUse != null && rdlUse.equals("1") && RDL_EDIT.equals("Y"))
							LIST_RDL_EDITLAYER.add(tableNm);*/
					}
					
				wtlObj.put("EDIT_LAYER", 	LIST_WTL_EDITLAYER); 
				swlObj.put("EDIT_LAYER", 	LIST_SWL_EDITLAYER); 
				rdlObj.put("EDIT_LAYER", 	LIST_RDL_EDITLAYER); 
			}
		}
		else{ 
			wtlObj.put("EDIT_LAYER", 	empty_array); 
			swlObj.put("EDIT_LAYER", 	empty_array); 
			rdlObj.put("EDIT_LAYER", 	empty_array); 
		}
		
		rtnObj.put("ADMIN", SYS_ADMIN);
		rtnObj.put("WTL", wtlObj);
		rtnObj.put("SWL", swlObj);
		rtnObj.put("RDL", rdlObj);
		
		return rtnObj;
	}
}
