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
package usolver.com.cmm.map.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonDAO;
import usolver.com.cmm.map.service.EtcMapEtService;
import usolver.com.cmm.map.service.vo.EtcMapEtVO;
import usolver.com.cmm.map.service.vo.UsvUserMapVO;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**  
 * @Class Name : EtcMapEtServiceImpl.java
 * @Description : Business Implement Class
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

@Service("EtcMapEtService")
public class EtcMapEtServiceImpl extends AbstractServiceImpl implements
			EtcMapEtService {
	
	/** common DAO */
    @Resource(name="commonDAO")
    private CommonDAO commonDAO;
    
    /** ID Generation *///
    @Resource(name="egovIdGnrService")    
    private EgovIdGnrService egovIdGnrService;


    
    /**
	 * 지도 레이어 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List etcMapLayerList(EtcMapEtVO searchVO) throws Exception {
    	
    	log.debug("EtcMapEtServiceImpl들어옵니다."+searchVO.toString());
        return commonDAO.getSelectList("content.etc.etcMapLayerList", searchVO);
    }    
    
    
    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public List etcMapLayerListOn(EtcMapEtVO searchVO) {
		return commonDAO.getSelectList("content.etc.etcMapLayerListOn", searchVO);
	}
    

    
    
    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List etcBuildSearchList(EtcMapEtVO searchVO) throws Exception {
        return commonDAO.getSelectList("content.etc.etcBuildSearchList", searchVO);
    }
    

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public int etcBuildSearchListCnt(EtcMapEtVO searchVO) {
		return commonDAO.getSelectCnt("content.etc.etcBuildSearchListCnt", searchVO);
	}
    
    
    
    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List etcJibunSearchList(EtcMapEtVO searchVO) throws Exception {
        return commonDAO.getSelectList("content.etc.etcJibunSearchList", searchVO);
    }
    

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public int etcJibunSearchListCnt(EtcMapEtVO searchVO) {
		return commonDAO.getSelectCnt("content.etc.etcJibunSearchListCnt", searchVO);
	}
    
    
    /**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
    public List etcRoadSearchList(EtcMapEtVO searchVO) throws Exception {
        return commonDAO.getSelectList("content.etc.etcRoadSearchList", searchVO);
    }
    

    /**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
    public int etcRoadSearchListCnt(EtcMapEtVO searchVO) {
		return commonDAO.getSelectCnt("content.etc.etcRoadSearchListCnt", searchVO);
	}
    
    
    /**
   	 * 글 목록을 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 목록
   	 * @exception Exception
   	 */
       public List etcNewAddressSearchList(EtcMapEtVO searchVO) throws Exception {
           return commonDAO.getSelectList("content.etc.etcNewAddressSearchList", searchVO);
       }
       

       /**
   	 * 글 총 갯수를 조회한다.
   	 * @param searchVO - 조회할 정보가 담긴 VO
   	 * @return 글 총 갯수
   	 * @exception
   	 */
       public int etcNewAddressSearchListCnt(EtcMapEtVO searchVO) {
   		return commonDAO.getSelectCnt("content.etc.etcNewAddressSearchListCnt", searchVO);
   	}
       
       
     /**
   	 * 레이어 목록을 등록한다.
   	 * @param vo - 등록할 정보가 담긴 SampleVO
   	 * @return 등록 결과
   	 * @exception Exception
   	 */
       public String etcMapLayerInfoSave(EtcMapEtVO vo) throws Exception {
       	log.debug(vo.toString());
       	
       	/** ID Generation Service */
       	/*String id = egovIdGnrService.getNextStringId();

       	log.debug(vo.toString());*/
       	String result = "";

       	try {
   			result = commonDAO.insertData("content.etc.etcMapLayerInfoSave", vo);
   		} catch (Exception e) {
   			throw new Exception(e);
   		}
       	return result;
       }
       
       
       /**
      	 * 레이어 상세정보를 등록한다.
      	 * @param vo - 등록할 정보가 담긴 SampleVO
      	 * @return 등록 결과
      	 * @exception Exception
      	 */
          public String etcMapLayerInfoDetailSave(EtcMapEtVO vo) throws Exception {
          	log.debug(vo.toString());
          	
          	/** ID Generation Service */
          	/*String id = egovIdGnrService.getNextStringId();

          	log.debug(vo.toString());*/
          	String result = "";

          	try {
      			result = commonDAO.insertData("content.etc.etcMapLayerInfoDetailSave", vo);
      		} catch (Exception e) {
      			throw new Exception(e);
      		}
          	return result;
          }
       
       
       
       /**
      	 * 도형 등록한다.
      	 * @param vo - 등록할 정보가 담긴 SampleVO
      	 * @return 등록 결과
      	 * @exception Exception
      	 */
          public String etcMapDrawInfoSave(EtcMapEtVO vo) throws Exception {
          	log.debug(vo.toString());
          	
          	/** ID Generation Service */
          	/*String id = egovIdGnrService.getNextStringId();

          	log.debug(vo.toString());*/
          	String result = "";

          	try {
      			result = commonDAO.insertData("content.etc.etcMapDrawInfoSave", vo);
      		} catch (Exception e) {
      			throw new Exception(e);
      		}
          	return result;
          }
          
          
          /**
      	 * 지도 레이어 목록을 조회한다.
      	 * @param searchVO - 조회할 정보가 담긴 VO
      	 * @return 글 목록
      	 * @exception Exception
      	 */
          public List etcMapDrawInfoList(EtcMapEtVO searchVO) throws Exception {
          	
          	log.debug("etcMapDrawInfoList들어옵니다."+searchVO.toString());
              return commonDAO.getSelectList("content.etc.etcMapDrawInfoList", searchVO);
          } 
          
          
          /**
    	 * 도형 삭제한다.
    	 * @param vo - 등록할 정보가 담긴 SampleVO
    	 * @return 등록 결과
    	 * @exception Exception
    	 */
        public String etcMapDrawInfoDelete(EtcMapEtVO vo) throws Exception {
        	log.debug(vo.toString());
        	
        	
        	String result = "";

        	try {
    			result = commonDAO.insertData("content.etc.etcMapDrawInfoDelete", vo);
    			/*입력한 도형 삭제*/
    			result = commonDAO.insertData("content.etc.etcMapDrawLineDelete", vo);
    			result = commonDAO.insertData("content.etc.etcMapDrawPointDelete", vo);
    			result = commonDAO.insertData("content.etc.etcMapDrawPolygonDelete", vo);

    		
        	
        	} catch (Exception e) {
    			throw new Exception(e);
    		}
        	return result;
        }
        
        
        /**
    	 * 지도 레이어 스타일 삭제
    	 * @param vo - 등록할 정보가 담긴 SampleVO
    	 * @return 등록 결과
    	 * @exception Exception
    	 */
        public String etcMapLayerStyleDelete(EtcMapEtVO vo) throws Exception {
        	log.debug(vo.toString());
        	
        	
        	String result = "";

        	try {
    			result = commonDAO.insertData("content.etc.etcMapLayerStyleDelete", vo);
    			        	
        	} catch (Exception e) {
    			throw new Exception(e);
    		}
        	return result;
        }
        
        
        /**
    	 * 글을 조회한다.
    	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
    	 * @return 조회한 글
    	 * @exception Exception
    	 */
        public List etcMapDrawInfoDetail(EtcMapEtVO searchVO) throws Exception {
            return commonDAO.getSelectList("content.etc.etcMapDrawInfoDetail", searchVO);

        }
            
            
            
        /**
    	 * 글을 수정한다.
    	 * @param vo - 수정할 정보가 담긴 SwtCctvEtVO
    	 * @return void형
    	 * @exception Exception
    	 */
        public int etcMapLayerInfoDetailUpdate(EtcMapEtVO vo) throws Exception {
        	int result = 0;

        	try {
    			result = commonDAO.updateData("content.etc.etcMapLayerInfoDetailUpdate", vo);
    		} catch (Exception e) {
    			throw new Exception(e);
    		}
        	return result;
        }
            
            
        /**
       	 * 글 목록을 조회한다.
       	 * @param searchVO - 조회할 정보가 담긴 VO
       	 * @return 글 목록
       	 * @exception Exception
       	 */
           public List etcMapLayerInfoDetailCheck(EtcMapEtVO searchVO) throws Exception {
               return commonDAO.getSelectList("content.etc.etcMapLayerInfoDetailCheck", searchVO);
           }
           
           
           
           /**
       	 * 도형 삭제한다.
       	 * @param vo - 등록할 정보가 담긴 SampleVO
       	 * @return 등록 결과
       	 * @exception Exception
       	 */
           public String etcMapLayerInfoDetailDelete(EtcMapEtVO vo) throws Exception {
           	log.debug(vo.toString());
           	
           	
           	String result = "";

           	try {
       			result = commonDAO.insertData("content.etc.etcMapLayerInfoDetailDelete", vo);
       		} catch (Exception e) {
       			throw new Exception(e);
       		}
           	return result;
           }
           
           
           
           /**
         	 * 지도 레이어 목록을 조회한다.
         	 * @param searchVO - 조회할 정보가 담긴 VO
         	 * @return 글 목록
         	 * @exception Exception
         	 */
             public List etcMapLayerInfoSaveList(EtcMapEtVO searchVO) throws Exception {
             	
             	log.debug("etcMapLayerInfoSaveList들어옵니다."+searchVO.toString());
                 return commonDAO.getSelectList("content.etc.etcMapLayerInfoSaveList", searchVO);
             } 
          
          
             /**
           	 * 도형 등록한다.
           	 * @param vo - 등록할 정보가 담긴 SampleVO
           	 * @return 등록 결과
           	 * @exception Exception
           	 */
               public String etcMapGroupLayerNameSave(EtcMapEtVO vo) throws Exception {
               	log.debug(vo.toString());
               	
               	/** ID Generation Service */
               	/*String id = egovIdGnrService.getNextStringId();

               	log.debug(vo.toString());*/
               	String result = "";

               	try {
           			result = commonDAO.insertData("content.etc.etcMapGroupLayerNameSave", vo);
           		} catch (Exception e) {
           			throw new Exception(e);
           		}
               	return result;
               }
    
    
             /**
           	 * 그룹레이어 조회
           	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
           	 * @return 조회한 글
           	 * @exception Exception
           	 */
               public List etcMapGroupLayerNameDetail(EtcMapEtVO searchVO) throws Exception {
                   return commonDAO.getSelectList("content.etc.etcMapGroupLayerNameDetail", searchVO);

               }
               
               
               
           /**
         	 * 지도 레이어 목록을 조회한다.
         	 * @param searchVO - 조회할 정보가 담긴 VO
         	 * @return 글 목록
         	 * @exception Exception
         	 */
             public List etcMapGroupLayerNameList(EtcMapEtVO searchVO) throws Exception {
             	
             	log.debug("etcMapGroupLayerNameList들어옵니다."+searchVO.toString());
                 return commonDAO.getSelectList("content.etc.etcMapGroupLayerNameList", searchVO);
             }
             
             
             /**
         	 * 레이어 관리 그룹레이어 명 삭제한다.
         	 * @param vo - 등록할 정보가 담긴 SampleVO
         	 * @return 등록 결과
         	 * @exception Exception
         	 */
             public String etcMapGroupLayerNameDelete(EtcMapEtVO vo) throws Exception {
             	log.debug(vo.toString());
             	
             	
             	String result = "";

             	try {
         			result = commonDAO.insertData("content.etc.etcMapGroupLayerNameDelete", vo);
             	
             	} catch (Exception e) {
         			throw new Exception(e);
         		}
             	return result;
             }
             
             
             /**
          	 * 레이어 관리 default 그룹레이어 명 삭제한다.
          	 * @param vo - 등록할 정보가 담긴 SampleVO
          	 * @return 등록 결과
          	 * @exception Exception
          	 */
              public String etcMapGroupLayerDefaultNameDelete(EtcMapEtVO vo) throws Exception {
              	log.debug(vo.toString());
              	
              	String result = "";

              	try {
        			commonDAO.updateData("content.etc.etcMapGroupLayerConfirmUseN", vo);

        			result = commonDAO.insertData("content.etc.etcMapGroupLayerDefaultNameDelete", vo);
              	
              	} catch (Exception e) {
          			throw new Exception(e);
          		}
              	return result;
              }
             
             
             /**
        	 * 그룹레이어 조회
        	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
        	 * @return 조회한 글
        	 * @exception Exception
        	 */
            public List etcMapGroupLayerSelect(EtcMapEtVO searchVO) throws Exception {
                return commonDAO.getSelectList("content.etc.etcMapGroupLayerSelect", searchVO);

            }
            
            
            
            /**
        	 * 저장된 나의 레이어 목록 조회
        	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
        	 * @return 조회한 글
        	 * @exception Exception
        	 */
            public List etcMapMyLayerList(EtcMapEtVO searchVO) throws Exception {
                return commonDAO.getSelectList("content.etc.etcMapMyLayerList", searchVO);

            }
            
            
            /**
        	 * 글을 수정한다.
        	 * @param vo - 수정할 정보가 담긴 SwtCctvEtVO
        	 * @return void형
        	 * @exception Exception
        	 */
            public int etcMapGroupLayerConfirm(EtcMapEtVO vo) throws Exception {
            	int result1 = 0;
            	int result2 = 0;

            	try {
        			result1 = commonDAO.updateData("content.etc.etcMapGroupLayerConfirmUseN", vo);
        			result2 = commonDAO.updateData("content.etc.etcMapGroupLayerConfirmUseY", vo);
        		} catch (Exception e) {
        			throw new Exception(e);
        		}
            	return result2;
            }
            
            
            
            
            /**
        	 * 지도 레이어 체크 목록 삭제
        	 * @param vo - 등록할 정보가 담긴 SampleVO
        	 * @return 등록 결과
        	 * @exception Exception
        	 */
            public String etcMapLayerInfoDelete(EtcMapEtVO vo) throws Exception {
            	log.debug(vo.toString());
            	
            	
            	String result = "";

            	try {
        			result = commonDAO.insertData("content.etc.etcMapLayerInfoDelete", vo);
        			            	
            	} catch (Exception e) {
        			throw new Exception(e);
        		}
            	return result;
            }
            
            
        /**
       	 * 정보조회 (목록) 대장 영문명 조회
       	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
       	 * @return 조회한 글
       	 * @exception Exception
       	 */
           public List etcUsvComponentSearch(EtcMapEtVO searchVO) throws Exception {
               return commonDAO.getSelectList("content.etc.etcUsvComponentSearch", searchVO);

           }
           
           
           
           
           /**
       	 * 글을 조회한다.
       	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
       	 * @return 조회한 글
       	 * @exception Exception
       	 */
           public List etcMapIdentifyRoadSearch(EtcMapEtVO searchVO) throws Exception {
              
        	   List infoList = null;
        			   
        	   if(searchVO.getFTR_CDE().equals("보도")){	
               	   searchVO.setLAYERNAME("도로면_보도");
        		   infoList = commonDAO.getSelectList("content.etc.etcMapIdentifyRoadSearch_SDWK", searchVO);
        	   }else{//차도구간
               	   searchVO.setLAYERNAME("도로면_차도");	
        		   infoList = commonDAO.getSelectList("content.etc.etcMapIdentifyRoadSearch_RDWY", searchVO); 
        	   }        	   
        	   return infoList;

           }
           
           
           
           
           /**
      	 * 정보조회 (목록) 대장 영문명 조회
      	 * @param vo - 조회할 정보가 담긴 EtcMapEtVO
      	 * @return 조회한 글
      	 * @exception Exception
      	 */
          public List etcMapFilnalLocationList(EtcMapEtVO searchVO) throws Exception {
              return commonDAO.getSelectList("content.etc.etcMapFilnalLocationList", searchVO);

          }
          
          
          
          /**
     	 * 레이어 목록을 등록한다.
     	 * @param vo - 등록할 정보가 담긴 SampleVO
     	 * @return 등록 결과
     	 * @exception Exception
     	 */
         public String etcMapFilnalLocationInsert(EtcMapEtVO vo) throws Exception {
         	log.debug(vo.toString());
         	
         	
         	String result = "";

         	try {
     			result = commonDAO.insertData("content.etc.etcMapFilnalLocationInsert", vo);
     		} catch (Exception e) {
     			throw new Exception(e);
     		}
         	return result;
         }
         
         
         
         /**
    	 * 레이어 목록을 등록한다.
    	 * @param vo - 등록할 정보가 담긴 SampleVO
    	 * @return 등록 결과
    	 * @exception Exception
    	 */
        public String etcMapGroupLayerNameUpdate(EtcMapEtVO vo) throws Exception {
        	log.debug(vo.toString());
        	
        	String result = "";

        	try {
    			result = commonDAO.insertData("content.etc.etcMapGroupLayerNameUpdate", vo);
    		} catch (Exception e) {
    			throw new Exception(e);
    		}
        	return result;
        }   
    
   
        
        

	public int etcMapGroupLayersSave(UsvUserMapVO vo) throws Exception {
    	int result = 0;
    	try {
			result = commonDAO.updateData("content.etc.etcMapGroupLayersSave", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    public List etcMapGroupLayersList(UsvUserMapVO vo) throws Exception {
        return commonDAO.getSelectList("content.etc.etcMapGroupLayersList", vo);
    }
    public int etcMapGroupLayersDelete(UsvUserMapVO vo) throws Exception {
    	int result = 0;

    	try {
			result = commonDAO.deleteData("content.etc.etcMapGroupLayersDelete", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    public List etcMapUserConfigList(UsvUserMapVO vo) throws Exception {
        return commonDAO.getSelectList("content.etc.etcMapUserConfigList", vo);
    }
    public int etcMapUserConfigDelete(UsvUserMapVO vo) throws Exception {
    	int result = 0;

    	try {
			result = commonDAO.deleteData("content.etc.etcMapUserConfigDelete", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
	public int etcMapUserGraphicSymbolSave(UsvUserMapVO vo) throws Exception {
    	int result = 0;
    	try {
			result = commonDAO.updateData("content.etc.etcMapUserGraphicSymbolSave", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    public List etcMapUserGraphicSymbolList(UsvUserMapVO vo) throws Exception {
        return commonDAO.getSelectList("content.etc.etcMapUserGraphicSymbolList", vo);
    }
	public int etcMapUserRendererInsert(UsvUserMapVO vo) throws Exception {
    	int result = 0;
    	try {
			result = commonDAO.updateData("content.etc.etcMapUserRendererInsert", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
	public int etcMapUserRendererUpdate(UsvUserMapVO vo) throws Exception {
    	int result = 0;
    	try {
			result = commonDAO.updateData("content.etc.etcMapUserRendererUpdate", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
    public List etcMapUserRendererList(UsvUserMapVO vo) throws Exception {
        return commonDAO.getSelectList("content.etc.etcMapUserRendererList", vo);
    }
    public int etcMapUserRendererCnt(UsvUserMapVO vo) throws Exception {
        return commonDAO.getSelectCnt("content.etc.etcMapUserRendererCnt", vo);
    }
    public int etcMapUserRendererDelete(UsvUserMapVO vo) throws Exception {
    	int result = 0;

    	try {
			result = commonDAO.deleteData("content.etc.etcMapUserRendererDelete", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }
}
