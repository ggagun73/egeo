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
package usolver.com.cmm.map.service;

import java.util.List;

import usolver.com.cmm.map.service.vo.EtcMapEtVO;
import usolver.com.cmm.map.service.vo.UsvUserMapVO;



/**  
 * @Class Name : SwtCctvEtService.java
 * @Description : SwtCctvEtService Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.07.24           최초생성
 * 
 * @author 지노시스템
 * @since 2014. 07.24
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface EtcMapEtService {	
    
    /**
	 * 지도 레이어 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
     List etcMapLayerList(EtcMapEtVO searchVO) throws Exception;
     
     
     /**
    	 * 지도에서 레이어 on/off 설정 조회
    	 * @param searchVO - 조회할 정보가 담긴 VO
    	 * @return 글 총 갯수
    	 * @exception
    	 */
     List etcMapLayerListOn(EtcMapEtVO searchVO) throws Exception;
    
    
    
    /**
   	 * 글 목록을 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 목록
   	 * @exception Exception
   	 */
     List etcBuildSearchList(EtcMapEtVO searchVO) throws Exception;
       
    /**
   	 * 글 총 갯수를 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 총 갯수
   	 * @exception
   	 */
    int etcBuildSearchListCnt(EtcMapEtVO searchVO);
    
    
    
    
    
    /**
   	 * 글 목록을 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 목록
   	 * @exception Exception
   	 */
     List etcJibunSearchList(EtcMapEtVO searchVO) throws Exception;
       
    /**
   	 * 글 총 갯수를 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 총 갯수
   	 * @exception
   	 */
    int etcJibunSearchListCnt(EtcMapEtVO searchVO);
    
    
    
    /**
   	 * 글 목록을 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 목록
   	 * @exception Exception
   	 */
     List etcRoadSearchList(EtcMapEtVO searchVO) throws Exception;
       
    /**
   	 * 글 총 갯수를 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 총 갯수
   	 * @exception
   	 */
    int etcRoadSearchListCnt(EtcMapEtVO searchVO);
    
    
    /**
   	 * 글 목록을 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 목록
   	 * @exception Exception
   	 */
     List etcNewAddressSearchList(EtcMapEtVO searchVO) throws Exception;
       
    /**
   	 * 글 총 갯수를 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 총 갯수
   	 * @exception
   	 */
    int etcNewAddressSearchListCnt(EtcMapEtVO searchVO);
    
    
    
    /**
	 * 레이어정보를 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    String etcMapLayerInfoSave(EtcMapEtVO vo) throws Exception;
    
    
    /**
	 * 레이어 스타일 정보를 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
     String etcMapLayerStyleDelete(EtcMapEtVO vo) throws Exception;
     
    
    
    /**
	 * 레이어정보를 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    String etcMapLayerInfoDetailSave(EtcMapEtVO vo) throws Exception;
    
    
    /**
	 * 지도 도형정보를 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    String etcMapDrawInfoSave(EtcMapEtVO vo) throws Exception;
    
    
    
    
    
    /**
	 * 지도 도형 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
     List etcMapDrawInfoList(EtcMapEtVO searchVO) throws Exception;
     
    
     
     /**
 	 * 지도 도형정보를 삭제한다.
 	 * @param vo - 등록할 정보가 담긴 SampleVO
 	 * @return 등록 결과
 	 * @exception Exception
 	 */
     String etcMapDrawInfoDelete(EtcMapEtVO vo) throws Exception;
     
     
     /**
 	 * 글을 조회한다.
 	 * @param vo - 조회할 정보가 담긴 VO
 	 * @return 조회한 글
 	 * @exception Exception
 	 */
     List etcMapDrawInfoDetail(EtcMapEtVO vo) throws Exception;
     
     
     /**
 	 * 글을 수정한다.
 	 * @param vo - 수정할 정보가 담긴 SampleVO
 	 * @return void형
 	 * @exception Exception
 	 */
     int etcMapLayerInfoDetailUpdate(EtcMapEtVO vo) throws Exception;
     
     
     
     /**
    	 * 글 목록을 조회한다.
    	 * @param searchVO - 조회할 정보가 담긴 VO
    	 * @return 글 목록
    	 * @exception Exception
    	 */
      List etcMapLayerInfoDetailCheck(EtcMapEtVO searchVO) throws Exception;
      
      
      
      /**
   	 * 지도레이어 스타일 삭제.
   	 * @param vo - 등록할 정보가 담긴 SampleVO
   	 * @return 등록 결과
   	 * @exception Exception
   	 */
       String etcMapLayerInfoDetailDelete(EtcMapEtVO vo) throws Exception;
       
       
       /**
   	 * 지도 레이어 저 목록을 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 목록
   	 * @exception Exception
   	 */
        List etcMapLayerInfoSaveList(EtcMapEtVO searchVO) throws Exception;
     
     
    /**
	 * 그룹레이어명을 등록한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
       String etcMapGroupLayerNameSave(EtcMapEtVO vo) throws Exception;
     
       
       
     /**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 VO
	 * @return 조회한 글
	 * @exception Exception
	 */
      List etcMapGroupLayerNameDetail(EtcMapEtVO vo) throws Exception;
      
      
      /**
  	 * 지도 도형 목록을 조회한다.
  	 * @param searchVO - 조회할 정보가 담긴 VO
  	 * @return 글 목록
  	 * @exception Exception
  	 */
       List etcMapGroupLayerNameList(EtcMapEtVO searchVO) throws Exception;
      
     
       
     /**
	 * 지도 도형정보를 삭제한다.
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
     String etcMapGroupLayerNameDelete(EtcMapEtVO vo) throws Exception;
     
     
     
     /**
 	 * 지도 도형정보를 삭제한다.
 	 * @param vo - 등록할 정보가 담긴 SampleVO
 	 * @return 등록 결과
 	 * @exception Exception
 	 */
      String etcMapGroupLayerDefaultNameDelete(EtcMapEtVO vo) throws Exception;
      
     
     
         
     /**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 VO
	 * @return 조회한 글
	 * @exception Exception
	 */
     List etcMapGroupLayerSelect(EtcMapEtVO vo) throws Exception;
     
     
     
     /**
 	 * 글을 조회한다.
 	 * @param vo - 조회할 정보가 담긴 VO
 	 * @return 조회한 글
 	 * @exception Exception
 	 */
      List etcMapMyLayerList(EtcMapEtVO vo) throws Exception;
      
      
      
      
    /**
   	 * 글을 수정한다.
   	 * @param vo - 수정할 정보가 담긴 SampleVO
   	 * @return void형
   	 * @exception Exception
   	 */
       int etcMapGroupLayerConfirm(EtcMapEtVO vo) throws Exception;
       
       
       
    /**
  	 * 지도 레이어 체크 목록 삭제
  	 * @param vo - 등록할 정보가 담긴 SampleVO
  	 * @return 등록 결과
  	 * @exception Exception
  	 */
      String etcMapLayerInfoDelete(EtcMapEtVO vo) throws Exception;
       
    
      /**
  	 * 정보조회 (목록) 대장 영문명 조회
  	 * @param vo - 조회할 정보가 담긴 VO
  	 * @return 조회한 글
  	 * @exception Exception
  	 */
      List etcUsvComponentSearch(EtcMapEtVO vo) throws Exception;
      
      
      
      
      /**
  	 * 도로면 차도 보도 조회
  	 * @param vo - 조회할 정보가 담긴 VO
  	 * @return 조회한 글
  	 * @exception Exception
  	 */
      List etcMapIdentifyRoadSearch(EtcMapEtVO vo) throws Exception;
      
      
      
      
     /**
	 * 지도 최종위치 목록 확인
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
      List etcMapFilnalLocationList(EtcMapEtVO vo) throws Exception;
     
     
     
     /**
 	 * 지도 최종위치 저장
 	 * @param vo - 등록할 정보가 담긴 SampleVO
 	 * @return 등록 결과
 	 * @exception Exception
 	 */
     String etcMapFilnalLocationInsert(EtcMapEtVO vo) throws Exception;
     
     
        
        
    /**
	 * 지도 최종위치 수정
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
     String etcMapGroupLayerNameUpdate(EtcMapEtVO vo) throws Exception;
          
        
     
     
     
     
     
     
     
     

     int etcMapGroupLayersSave(UsvUserMapVO vo) throws Exception;
     List etcMapGroupLayersList(UsvUserMapVO vo) throws Exception;
     int etcMapGroupLayersDelete(UsvUserMapVO vo) throws Exception;
     List etcMapUserConfigList(UsvUserMapVO vo) throws Exception;
     int etcMapUserConfigDelete(UsvUserMapVO vo) throws Exception;
     int etcMapUserGraphicSymbolSave(UsvUserMapVO vo) throws Exception;
     List etcMapUserGraphicSymbolList(UsvUserMapVO vo) throws Exception;
     int etcMapUserRendererInsert(UsvUserMapVO vo) throws Exception;
     int etcMapUserRendererUpdate(UsvUserMapVO vo) throws Exception;
     List etcMapUserRendererList(UsvUserMapVO vo) throws Exception;
     int etcMapUserRendererCnt(UsvUserMapVO vo) throws Exception;
     int etcMapUserRendererDelete(UsvUserMapVO vo) throws Exception;
}
