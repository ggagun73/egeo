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

import org.json.simple.JSONObject;

import usolver.com.main.vo.LoginVO;


/**  
 * @Class Name : EgovSampleService.java
 * @Description : EgovSampleService Class
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
public interface MemberService {
	
	
	// 아이디 중복체크
	List<LoginVO> idDDCheck(LoginVO lvo) throws Exception;
	
	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	int insertUser(LoginVO loginVo) throws Exception;
    
    /**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 SampleVO
	 * @return void형
	 * @exception Exception
	 */
    int updateUser(LoginVO lvo) throws Exception;
    
    // 사용자 정보 조회
    LoginVO getUserInfo(LoginVO lvo) throws Exception;
	
    // 임시 비밀번호 부여
    String changePW(LoginVO lvo) throws Exception;
    
    // 사용자 정보수정
    int changeUserInfo(LoginVO lvo) throws Exception;
    
    // 사용자 패스워드 가져옴
    List<LoginVO> getPWData(LoginVO lvo) throws Exception;
    
    JSONObject getUserAuthorites(List<String> AuthorInfo, String userId, String system) throws Exception;
    
}
