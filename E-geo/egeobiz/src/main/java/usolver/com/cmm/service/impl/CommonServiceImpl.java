/*
] * Copyright 2008-2009 the original author or authors.
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

import java.io.File;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import usolver.com.cmm.dao.CommonDAO;
import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.vo.SearchEditHisVO;
import usolver.com.cmm.map.service.vo.SearchFacilityVO;
import usolver.com.cmm.service.CommonService;
import usolver.com.cmm.vo.CodeVO;
import usolver.com.cmm.vo.NewIDsVO;
import usolver.com.cmm.vo.UsvBookLogVO;

import egovframework.com.cmm.service.Globals;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

/**  
 * @Class Name : CommonServiceImpl.java
 * @Description : Common Business Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author 지노
 * @since 2014. 07.10
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service("commonService")  
public class CommonServiceImpl extends AbstractServiceImpl implements
        CommonService {  
	 
	/** common DAO */
    @Resource(name="commonDAO")
    private CommonDAO commonDAO;
    
    /** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
    @Resource(name = "fileUploadProperties")
    Properties fileUploadProperties;
    
    /** ID Generation */
    @Resource(name="egovIdGnrService")    
    private EgovIdGnrService egovIdGnrService;

    public List selectCd(CodeVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectCd", searchVO);
    }
    
    public List selectDtlCd(CodeVO searchVO) throws Exception {
        return commonMapper.getSelectList("common.selectDtlCd", searchVO);
    }
    
    public List selectG2SCd(usolver.com.cmm.vo.CodeVO searchVO) throws Exception {
        return commonMapper.getSelectList("common.selectCd", searchVO);
    }
    
    public List selectCdByDomain(usolver.com.cmm.vo.CodeVO searchVO) throws Exception {
        return commonMapper.getSelectList("common.selectCdByDomain", searchVO);
    }
    
    public List selectHjgCde(CodeVO searchVO) throws Exception {
        return commonMapper.getSelectList("common.selectHjgCde", searchVO);
    }
       
    
    public List selectHjdCd(CodeVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectHjdCd", searchVO);
    }
        
    
    public List selectHjdCde(CodeVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectHjdCde", searchVO);
    }
    
    
    public List selectBjdCde(CodeVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectBjdCde", searchVO);
    }
    
    public List selectNrdNam(CodeVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectNrdNam", searchVO);
    }
    
    public List selectAttList(SearchFacilityVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectAttList", searchVO);
    }
    
    public List selectAttFld(SearchFacilityVO searchVO) throws Exception {
    	if(Globals.GIS_ENGINE_TYPE.equals("GeoServer")) //ggash 20170123 for geoserver
    		return commonDAO.getSelectList("common.selectAttFldForGeoServer", searchVO);
    	else
    		return commonDAO.getSelectList("common.selectAttFld", searchVO);
    }
    
    public List selectAttFldVal(SearchFacilityVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectAttFldVal", searchVO);
    } 
    
    public List selectAttResult(SearchFacilityVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectAttResult", searchVO);
    }
    public List selectEditHis(SearchEditHisVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.selectEditHis", searchVO);
    }
    
    /**
	 * 산구분 코드를 조횐한다.
	 * 
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return
	 * @throws Exception
	 */
    public List selectSanCde(CodeVO searchVO) throws Exception {
    	return commonDAO.getSelectList("common.selectSanCde", searchVO);
    }
    
    /**
	 * 상수민원종류 코드를 조회한다.
	 * @param searchVO
	 * @return
	 * @throws Exception
	 */
	public List selectAplCde(usolver.com.cmm.vo.CodeVO searchVO) throws Exception {
		return commonMapper.getSelectList("common.selectAplCde", searchVO);
	}
	
    public String getObjectId(String tableNm) throws Exception {
    	CodeVO searchVO = new CodeVO();
    	searchVO.setTABLE_NM( tableNm );
        return (String) commonDAO.getSelect("common.getObjectId", searchVO);
    }    

    /*public String fileInsert(String slpMnumbr) throws Exception {
		String result = "";
	
		try {
	    	FileInfoVO FVO = new FileInfoVO();
	    	FVO.setSLP_MNUMBR(slpMnumbr);
			result = commonDAO.insertData("common.fileInsert", FVO);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return result;
	}*/
	// 파일 저장
	public int fileInsert(HttpServletRequest request, String subPath) throws Exception {
		int result = 0;

		return result;
	}
   
    // 파일 저장 한건 : 파일명까지 지정처리 (기존의 데이터가 있으면 덮어쓰기처리)
    public int fileInsert(HttpServletRequest request, String subPath, String fileNm) throws Exception {
    	int result = 0;
    	
    	/** validate request type */
		Assert.state(request instanceof MultipartHttpServletRequest,
				"request !instanceof MultipartHttpServletRequest");
		final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		
		/** extract files */
		final Map<String, MultipartFile> files = multiRequest.getFileMap();
		Assert.notNull(files, "files is null");
		Assert.state(files.size() > 0, "0 files exist");

		/** process files */
		String uploadPath = fileUploadProperties.getProperty("system.uploadpath")+File.separator+subPath;
		
		System.out.println("######################################## uploadPath : "+uploadPath);
		System.out.println("######################################## files.size() : "+files.size());
		
		File saveFolder = new File(uploadPath);

		// 디렉토리 생성 (보안 취약점 개선) 2009.04.02
		boolean isDir = false;

		if (!saveFolder.exists() || saveFolder.isFile()) {
			saveFolder.mkdirs();
		}

		if (!isDir) {
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet()
					.iterator();
			MultipartFile file;
			
			List fileInfoList = new ArrayList();
			String filePath;

			if (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next();

				file = entry.getValue();
				if (!"".equals(file.getOriginalFilename())) {
					filePath = uploadPath + File.separator + fileNm;

					file.transferTo(new File(filePath));

					result++;
				}
			}
		}

		return result;
    }
    
    //  파일 삭제
    public int fileDelete(String subPath, String fileNm) throws Exception {
    	int result = 0;

		try {
			String uploadPath = fileUploadProperties.getProperty("system.uploadpath")+File.separator+subPath;
			
			File uFile = new File(uploadPath, fileNm);
			
			uFile.delete();	// 물리적 삭제
		} catch(Exception e) {}

    	return result;
    }
    
    // 파일 존재 여부 확인
    public boolean fileExist(String subPath, String fileNm) throws Exception {
    	boolean result = false;

		try {
			String uploadPath = fileUploadProperties.getProperty("system.uploadpath")+File.separator+subPath;
			
			File uFile = new File(uploadPath, fileNm);
			
			if( uFile!=null && uFile.exists() )
				result = true;
			else
				result = false;
		} catch(Exception e) {}

    	return result;
    }


    //공사번호로 OBJECTID 가져오기
	public String GetConsMaOID(String type, String cnt_num) throws Exception {
		Map<String, String> m = new HashMap<String, String>();
		m.put("TYPE", type);
		m.put("CNT_NUM", cnt_num);
		return (String) commonDAO.getSelect("common.getConsMaOID", m);
	}
    
	/* 출력 관련 */
	/* 상수 : 유지보수 내역 목록 조회 
    /*public List wttWutlHtList(String ftr_cde, String ftr_idn) throws Exception {
    	WttWutlHtVO tmp = new WttWutlHtVO();
    	tmp.setFTR_CDE( ftr_cde );
    	tmp.setFTR_IDN(ftr_idn );
    	tmp.setOrderByColumn("FID");
    	tmp.setOrderByType("DESC");
    	return commonMapper.getSelectList("water.wttWutlHtExcel", tmp);
    }*/
    
    /* 도로 : 유지보수 내역 목록 조회
    public List rdtPrsvDtList(String ftr_cde, String ftr_idn) throws Exception {
    	RdtPrsvDtVO tmp = new RdtPrsvDtVO();
    	tmp.setFTR_CDE( ftr_cde );
    	tmp.setFTR_IDN(ftr_idn );
    	tmp.setOrderByColumn("OBJECTID");
    	tmp.setOrderByType("DESC");
    	return commonDAO.getSelectList("content.road.rdtPrsvDtExcel", tmp);
    }
     */
    /* 하수 : 유지보수 내역 목록 조회
    public List swtSutlHtList(String ftr_cde, String ftr_idn) throws Exception {
    	SwtSutlHtVO tmp = new SwtSutlHtVO();
    	tmp.setFTR_CDE( ftr_cde );
    	tmp.setFTR_IDN(ftr_idn );
    	tmp.setOrderByColumn("OBJECTID");
    	tmp.setOrderByType("DESC");
    	return commonDAO.getSelectList("content.sewer.swtSutlHtExcel", tmp);
    }
     */
	public String getNewID(String table_name, String field_name) throws Exception {
		NewIDsVO newIdsVO = new NewIDsVO();
		newIdsVO.setTABLE_NAME(table_name);
		newIdsVO.setFIELD_NAME(field_name);
		return (String) commonDAO.getSelect("common.getNewIDs1", newIdsVO);
	}

	public String getNewID(String table_name, String field_name, int lpad)
			throws Exception {
		NewIDsVO newIdsVO = new NewIDsVO();
		newIdsVO.setTABLE_NAME(table_name);
		newIdsVO.setFIELD_NAME(field_name);
		newIdsVO.setLPAD(lpad);
		return (String) commonDAO.getSelect("common.getNewIDs2", newIdsVO);
	}

	public String getNewID(String table_name, String field_name, int lpad, String leadingChar) throws Exception {
		NewIDsVO newIdsVO = new NewIDsVO();
		newIdsVO.setTABLE_NAME(table_name);
		newIdsVO.setFIELD_NAME(field_name);
		newIdsVO.setLPAD(lpad);
		newIdsVO.setLEADINGCHAR(leadingChar);
		return (String) commonDAO.getSelect("common.getNewIDs3", newIdsVO);
	}

	public String getNewID_MM(String table_name, String field_name, int lpad)
			throws Exception {
		NewIDsVO newIdsVO = new NewIDsVO();
		newIdsVO.setTABLE_NAME(table_name);
		newIdsVO.setFIELD_NAME(field_name);
		newIdsVO.setLPAD(lpad);
		return (String) commonDAO.getSelect("common.getNewIDs4", newIdsVO);
	}

	public String getMaxID(String table_name, String max_field, String master_field1, String master_field1_val, String master_field2, String master_field2_val)
			throws Exception {
		NewIDsVO newIdsVO = new NewIDsVO();
		newIdsVO.setTABLE_NAME(table_name);
		newIdsVO.setMAX_FIELD(max_field);
		newIdsVO.setMASTER_FIELD1(master_field1);
		newIdsVO.setMASTER_FIELD1_VAL(master_field1_val);
		newIdsVO.setMASTER_FIELD2(master_field2);
		newIdsVO.setMASTER_FIELD2_VAL(master_field2_val);
		
		return (String) commonDAO.getSelect("common.getMaxID", newIdsVO);
	}

	public String getMaxID(String table_name, String max_field, String master_field1, String master_field1_val, String master_field2, String master_field2_val, String master_field3, String master_field3_val)
			throws Exception {
		NewIDsVO newIdsVO = new NewIDsVO();
		newIdsVO.setTABLE_NAME(table_name);
		newIdsVO.setMAX_FIELD(max_field);
		newIdsVO.setMASTER_FIELD1(master_field1);
		newIdsVO.setMASTER_FIELD1_VAL(master_field1_val);
		newIdsVO.setMASTER_FIELD2(master_field2);
		newIdsVO.setMASTER_FIELD2_VAL(master_field2_val);
		newIdsVO.setMASTER_FIELD3(master_field3);
		newIdsVO.setMASTER_FIELD3_VAL(master_field3_val);
		
		return (String) commonDAO.getSelect("common.getMaxID", newIdsVO);
	}
	
	public String getNewAddr(String BJD_CDE, String OLD_SAN, String OLD_BON, String OLD_BUB)
			throws Exception {
		Map<String, String> m = new HashMap<String, String>();
		m.put("BJD_CDE", BJD_CDE.trim());
		m.put("OLD_SAN", OLD_SAN.trim());
		m.put("OLD_BON", OLD_BON.trim());
		if (OLD_BUB.trim().equals("")) {
			m.put("OLD_BUB", "0");	
		} else {
			m.put("OLD_BUB", OLD_BUB.trim());	
		}
		return (String) commonDAO.getSelect("common.getNewAddr", m);
	}
    
	public List getGdbFields(String TABLENAME) throws Exception {
		Map<String, String> m = new HashMap<String, String>();
		m.put("TABLENAME", TABLENAME);
		
		if(Globals.GIS_ENGINE_TYPE.equals("GeoServer")) //ggash 20170123 for geoserver
			return commonDAO.getSelectList("common.getGdbFieldsForGeoServer", m);
		else
			return commonDAO.getSelectList("common.getGdbFields", m);
	}
	
	public int setLayerAttr(String TABLENAME, String UPDATESQL, String OBJECTID) throws Exception {
    	int result = 0;
    	try {
    		Map<String, String> m = new HashMap<String, String>();
    		m.put("TABLENAME", TABLENAME);
    		m.put("UPDATESQL", UPDATESQL);
    		m.put("OBJECTID", OBJECTID);
			result = commonDAO.updateData("common.setLayerAttr", m);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }

	/*public int deleteRWS_HT(WttImgeEtVO vo) throws Exception {
    	int result = 0;

    	try {
			result = commonDAO.deleteData("common.deleteRWS_HT", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    }*/
    
	public String InsertBookLog(UsvBookLogVO vo) throws Exception {
		String result = "";
		
    	try {
			result = commonDAO.insertData("common.InsertBookLog", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return result;
	}
    public List usvBookLogTagAls(UsvBookLogVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.usvBookLogTagAls", searchVO);
    }
    public List usvBookLogList(UsvBookLogVO searchVO) throws Exception {
        return commonDAO.getSelectList("common.usvBookLogList", searchVO);
    }
    public int usvBookLogListCnt(UsvBookLogVO searchVO) {
		return commonDAO.getSelectCnt("common.usvBookLogListCnt", searchVO);
	}
    public String getFieldAliasByFieldName(String TABLENAME, String FIELDNAME) throws Exception {
		Map<String, String> m = new HashMap<String, String>();
		m.put("TABLENAME", TABLENAME);
		m.put("FIELDNAME", FIELDNAME);
		if(Globals.GIS_ENGINE_TYPE.equals("GeoServer"))
			return (String) commonMapper.getSelect("common.getFieldAliasByFieldNameForGeoServer", m);
		else
			return (String) commonMapper.getSelect("common.getFieldAliasByFieldName", m);
    }

	public int getCoordScale(String G2_NAME) throws Exception {
		return (Integer) commonMapper.getSelect("common.getCoordScale", G2_NAME);
	}
	
	public String getBrowser(HttpServletRequest request) throws Exception {
		
		String header =request.getHeader("User-Agent");

        if (header.contains("MSIE") || header.contains("Mozilla")) {
                return "MSIE";

        } else if(header.contains("Chrome")) {
                return "Chrome";

        } else if(header.contains("Opera")) {
                return "Opera";

        }

        return "Firefox";

	}
	
	public String getKorFileName(String HEADER, String fileName) throws Exception {
		String rtnFileName = null;
		
		if (HEADER.contains("MSIE")) {
		       rtnFileName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");
		
		} else if (HEADER.contains("Firefox")) {		
		       rtnFileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1"); 
		
		} else if (HEADER.contains("Opera")) {		
		       rtnFileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1"); 
		
		} else if (HEADER.contains("Chrome")) {		
		       rtnFileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1"); 
		
		}
		return rtnFileName;

	}
	
	public List getDomainMap(String domainId) throws Exception {
		return commonMapper.getSelectList("common.getDomainMap", domainId);

	}
}
