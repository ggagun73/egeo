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

import java.util.*;

import usolver.book.vo.StatisticVO;

/**  
 * @Class Name : WaterStatisticService.java
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
public interface StatisticService {
		

/*	상수도대장 총괄부 현황 : 상수관로 : 취수관, 도수관, 송수관, 배수관, 공업용수관 */
    List wtlPipeLmStatList(StatisticVO searchVO) throws Exception;
/*	상수도대장 총괄부 현황 : 급수관로 : 급수관, 소방관*/
    List wtlSplyLsStatList(StatisticVO searchVO) throws Exception;
/*	상수도대장 총괄부 현황 : 변류시설*/
    List wtlValvPsStatList(StatisticVO searchVO) throws Exception;
    	
	/*	종합 현황*/
	int registerTotalStat(StatisticVO searchVO) throws Exception;
	/*	시설물 현황*/
    List registerStatList(StatisticVO searchVO) throws Exception;

}
   