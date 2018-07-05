package usolver.admin.program.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.program.service.EgovProgrmManageService;
import usolver.admin.program.vo.ProgrmManage;
import usolver.admin.program.vo.ProgrmManageDtlVO;
import usolver.admin.program.vo.ProgrmManageVO;
import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.vo.AdmDefaultVO;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/** 
 * 프로그램목록관리 및 프로그램변경관리에 관한 비즈니스 구현 클래스를 정의한다.
 * @author 개발환경 개발팀 이용
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.20  이  용          최초 생성
 *
 * </pre>
 */
@Service("progrmManageService")
public class EgovProgrmManageServiceImpl extends AbstractServiceImpl implements EgovProgrmManageService {

	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;    
    
	@Resource(name="progrmManageDAO")
    private ProgrmManageDAO progrmManageDAO;
    /**
	 * 프로그램 상세정보를 조회
	 * @param vo ComDefaultVO
	 * @return ProgrmManageVO 
	 * @exception Exception
	 */    
	public ProgrmManage selectProgrm(ProgrmManage vo) throws Exception{		
         	return (ProgrmManage)commonMapper.selectByPk("admin.selectProgrmView", vo);
	}
	/**
	 * 프로그램 목록을 조회
	 * @param vo ComDefaultVO
	 * @return List 
	 * @exception Exception
	 */
	public List<EgovMap> selectProgrmList(ProgrmManage vo) throws Exception {
   		
		return commonMapper.getSelectList("admin.selectProgrmList", vo);
	}
	/**
	 * 프로그램목록 총건수를 조회한다.
	 * @param vo  ComDefaultVO
	 * @return Integer
	 * @exception Exception
	 */
    public int selectProgrmListTotCnt(ProgrmManage vo) throws Exception {
    	 return commonMapper.getSelectCnt("admin.selectProgrmListTotCnt", vo);
	}
    
	/**
	 * 프로그램목록 건수를 조회한다.
	 * @param vo  ComDefaultVO
	 * @return Integer
	 * @exception Exception
	 */
    public int selectProgrmListCnt(ProgrmManage vo) throws Exception {
    	 return commonMapper.getSelectCnt("admin.selectProgrmListCnt", vo);
	}
	/**
	 * 프로그램 정보를 등록
	 * @param vo ProgrmManageVO
	 * @exception Exception
	 */
	public int insertProgrm(ProgrmManage vo) throws Exception {
   	
    	int result = 0;

    	try {
			result = commonMapper.insertData("admin.insertProgrm", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}

	/**
	 * 프로그램 정보를 수정
	 * @param vo ProgrmManageVO
	 * @exception Exception
	 */
	public int updateProgrm(ProgrmManage vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.update("admin.updateProgrm", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
    	
	}

	/**
	 * 프로그램 정보를 삭제
	 * @param vo ProgrmManageVO
	 * @exception Exception
	 */
	public int deleteProgrm(ProgrmManage vo) throws Exception {
    	
    	int result = 0;

    	try {
			result = commonMapper.delete("admin.deleteProgrm", vo);
		} catch (Exception e) {
			throw new Exception(e);
		}
    	return result;
	}

	/**
	 * 프로그램 파일 존재여부를 조회
	 * @param vo ComDefaultVO
	 * @return int  
	 * @exception Exception
	 */
	public int selectProgrmNMTotCnt(ProgrmManage vo) throws Exception{
		return commonMapper.getSelectCnt("admin.selectProgrmNMTotCnt", vo);
	}	
	
	/**
	 * 프로그램 목록을 조회
	 * @param vo ComDefaultVO
	 * @return List 
	 * @exception Exception
	 */
	public List<EgovMap> selectRelatiionMenuList(ProgrmManage vo) throws Exception {   		
		return commonMapper.getSelectList("admin.selectRelatiionMenuList", vo);
	}
	
	
	/**
	 * 프로그램변경요청 정보를 조회
	 * @param vo ProgrmManageDtlVO
	 * @return ProgrmManageDtlVO
	 * @exception Exception
	 */
	public ProgrmManageDtlVO selectProgrmChangeRequst(ProgrmManageDtlVO vo) throws Exception{
       	return progrmManageDAO.selectProgrmChangeRequst(vo);
	}

	/**
	 * 프로그램변경요청 목록을 조회
	 * @param vo ComDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectProgrmChangeRequstList(ProgrmManage vo) throws Exception {
   		return progrmManageDAO.selectProgrmChangeRequstList(vo);
	}

	/**
	 * 프로그램변경요청목록 총건수를 조회한다.
	 * @param vo ComDefaultVO
	 * @return int
	 * @exception Exception
	 */
    public int selectProgrmChangeRequstListTotCnt(AdmDefaultVO vo) throws Exception {
        return progrmManageDAO.selectProgrmChangeRequstListTotCnt(vo);
	}	

	/**
	 * 프로그램변경요청을 등록
	 * @param vo ProgrmManageDtlVO
	 * @exception Exception
	 */
	public void insertProgrmChangeRequst(ProgrmManageDtlVO vo) throws Exception {
    	progrmManageDAO.insertProgrmChangeRequst(vo);
	}

	/**
	 * 프로그램변경요청을 수정
	 * @param vo ProgrmManageDtlVO
	 * @exception Exception
	 */
	public void updateProgrmChangeRequst(ProgrmManageDtlVO vo) throws Exception {
    	progrmManageDAO.updateProgrmChangeRequst(vo);
	}

	/**
	 * 프로그램변경요청을 삭제
	 * @param vo ProgrmManageDtlVO
	 * @exception Exception
	 */
	public void deleteProgrmChangeRequst(ProgrmManageDtlVO vo) throws Exception {
    	progrmManageDAO.deleteProgrmChangeRequst(vo);
	}

	/**
	 * 프로그램변경요청 요청번호MAX 정보를 조회
	 * @param vo ProgrmManageDtlVO
	 * @return ProgrmManageDtlVO
	 * @exception Exception
	 */
	public ProgrmManageDtlVO selectProgrmChangeRequstNo(ProgrmManageDtlVO vo) throws Exception {
   		return progrmManageDAO.selectProgrmChangeRequstNo(vo);
	}

	/**
	 * 프로그램변경요청처리 목록을 조회
	 * @param vo ComDefaultVO
	 * @return List
	 * @exception Exception
	 */
	public List selectChangeRequstProcessList(AdmDefaultVO vo) throws Exception {
   		return progrmManageDAO.selectChangeRequstProcessList(vo);
	}
	
	/**
	 * 프로그램변경요청처리목록 총건수를 조회한다.
	 * @param vo ComDefaultVO
	 * @return int
	 * @exception Exception
	 */
    public int selectChangeRequstProcessListTotCnt(AdmDefaultVO vo) throws Exception {
        return progrmManageDAO.selectChangeRequstListProcessTotCnt(vo);
	}

	/**
	 * 프로그램변경요청처리를 수정
	 * @param vo ProgrmManageDtlVO
	 * @exception Exception
	 */
	public void updateProgrmChangeRequstProcess(ProgrmManageDtlVO vo) throws Exception {
    	progrmManageDAO.updateProgrmChangeRequstProcess(vo);
	}

	/**
	 * 화면에 조회된 메뉴 목록 정보를 데이터베이스에서 삭제
	 * @param checkedProgrmFileNmForDel String
	 * @exception Exception
	 */
	public void deleteProgrmManageList(String checkedProgrmFileNmForDel) throws Exception {
		ProgrmManageVO vo = null;
		String [] delProgrmFileNm = checkedProgrmFileNmForDel.split(",");
		for (int i=0; i<delProgrmFileNm.length ; i++){
			vo = new ProgrmManageVO();
			vo.setProgrmFileNm(delProgrmFileNm[i]);
			progrmManageDAO.deleteProgrm(vo);
		}
	}

	/**
	 * 프로그램변경요청자 Email 정보를 조회
	 * @param vo ProgrmManageDtlVO
	 * @return ProgrmManageDtlVO
	 * @exception Exception
	 */
	public ProgrmManageDtlVO selectRqesterEmail(ProgrmManageDtlVO vo) throws Exception{
       	return progrmManageDAO.selectRqesterEmail(vo);
	}
		
}