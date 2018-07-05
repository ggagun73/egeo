package usolver.admin.board.vo;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import usolver.com.cmm.vo.AdmDefaultVO;


public class NoticeVO extends AdmDefaultVO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8375279152007510337L;
	private String IDX;
	private String MANAGE_CODE;
	private String TITLE_TEXT;
	private String BODY_TEXT;
	private String WRITE_ID;
	private String HIT;
	private String REGIST_DATE;
	private String EDIT_ID;
	private String EDIT_DATE;
	private String DEL_YN;
	private String SELECT_CODE;
	private String SEARCH_VALUE;
	
	/*답글 작성을 위한 추가 변수*/
	private String SORT_NO;
	private String REFNUM;
	
	/*임시 변수*/
	private String TEMP_IDX;
	
	private List<MultipartFile> FILES;
	private List<String> FILENAMES = new ArrayList<String>();
	
	private String FILE_NAME;	//첨부파일 명
	private String FILE_PATH;	//첨부파일 경로
	private String FILE_NO;		//첨부파일 일련번호
	
	
	public String getIDX() {
		return IDX;
	}
	public void setIDX(String iDX) {
		IDX = iDX;
	}
	public String getMANAGE_CODE() {
		return MANAGE_CODE;
	}
	public void setMANAGE_CODE(String mANAGE_CODE) {
		MANAGE_CODE = mANAGE_CODE;
	}
	public String getTITLE_TEXT() {
		return TITLE_TEXT;
	}
	public void setTITLE_TEXT(String tITLE_TEXT) {
		TITLE_TEXT = tITLE_TEXT;
	}
	public String getBODY_TEXT() {
		return BODY_TEXT;
	}
	public void setBODY_TEXT(String bODY_TEXT) {
		BODY_TEXT = bODY_TEXT;
	}
	public String getWRITE_ID() {
		return WRITE_ID;
	}
	public void setWRITE_ID(String wRITE_ID) {
		WRITE_ID = wRITE_ID;
	}
	public String getHIT() {
		return HIT;
	}
	public void setHIT(String hIT) {
		HIT = hIT;
	}
	public String getREGIST_DATE() {
		return REGIST_DATE;
	}
	public void setREGIST_DATE(String rEGIST_DATE) {
		REGIST_DATE = rEGIST_DATE;
	}
	public String getEDIT_ID() {
		return EDIT_ID;
	}
	public void setEDIT_ID(String eDIT_ID) {
		EDIT_ID = eDIT_ID;
	}
	public String getEDIT_DATE() {
		return EDIT_DATE;
	}
	public void setEDIT_DATE(String eDIT_DATE) {
		EDIT_DATE = eDIT_DATE;
	}
	public String getDEL_YN() {
		return DEL_YN;
	}
	public void setDEL_YN(String dEL_YN) {
		DEL_YN = dEL_YN;
	}
	public String getSELECT_CODE() {
		return SELECT_CODE;
	}
	public void setSELECT_CODE(String sELECT_CODE) {
		SELECT_CODE = sELECT_CODE;
	}
	public String getSEARCH_VALUE() {
		return SEARCH_VALUE;
	}
	public void setSEARCH_VALUE(String sEARCH_VALUE) {
		SEARCH_VALUE = sEARCH_VALUE;
	}
	public List<MultipartFile> getFILES() {
		return FILES;
	}
	public void setFILES(List<MultipartFile> fILES) {
		FILES = fILES;
	}
	public List<String> getFILENAMES() {
		return FILENAMES;
	}
	public void setFILENAMES(List<String> fILENAMES) {
		FILENAMES = fILENAMES;
	}
	public String getFILE_NAME() {
		return FILE_NAME;
	}
	public void setFILE_NAME(String fILE_NAME) {
		FILE_NAME = fILE_NAME;
	}
	public String getFILE_PATH() {
		return FILE_PATH;
	}
	public void setFILE_PATH(String fILE_PATH) {
		FILE_PATH = fILE_PATH;
	}
	public String getFILE_NO() {
		return FILE_NO;
	}
	public void setFILE_NO(String fILE_NO) {
		FILE_NO = fILE_NO;
	}
	public String getSORT_NO() {
		return SORT_NO;
	}
	public void setSORT_NO(String sORT_NO) {
		SORT_NO = sORT_NO;
	}
	public String getREFNUM() {
		return REFNUM;
	}
	public void setREFNUM(String rEFNUM) {
		REFNUM = rEFNUM;
	}
	public String getTEMP_IDX() {
		return TEMP_IDX;
	}
	public void setTEMP_IDX(String tEMP_IDX) {
		TEMP_IDX = tEMP_IDX;
	}
	
}
