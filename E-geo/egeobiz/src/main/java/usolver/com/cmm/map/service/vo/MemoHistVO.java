package usolver.com.cmm.map.service.vo;


import com.fasterxml.jackson.annotation.JsonProperty;

public class MemoHistVO {

	public MemoHistVO(){
		super();
	}
	
	private java.lang.String FILE_ID;
	private java.lang.String FILE_NM;
	private java.lang.String FILE_PATH;	
	private java.lang.String FILE_UPLOAD_NM;
	private java.lang.String FILE_EXT;
	private java.lang.String MEMO_ID;
	private java.lang.String MEMO_CN;
	private java.lang.String MEMO_INFO;
	private java.lang.String MEMO_NM;
	private java.lang.String CREATE_DT;
	private java.lang.String USER_ID;
	private java.lang.String FEATURE_SEQ;
	private java.lang.String FILE_BASE64_STRING;
	
	

	@Override
	public String toString() {
		return "MemoHistVO [FILE_ID=" + FILE_ID + ", FILE_NM=" + FILE_NM + ", FILE_PATH=" + FILE_PATH + ", MEMO_ID=" + MEMO_ID
				+ ", FILE_UPLOAD_NM=" + FILE_UPLOAD_NM + ", FILE_EXT=" + FILE_EXT + ", MEMO_CN=" + MEMO_CN + ", MEMO_INFO=" + MEMO_INFO 
				+ ", MEMO_NM=" + MEMO_NM + ", CREATE_DT=" + CREATE_DT + ", USER_ID=" + USER_ID + ", FEATURE_SEQ=" + FEATURE_SEQ + "]";
	}


	public java.lang.String getFILE_ID() {
		return FILE_ID;
	}


	public void setFILE_ID(java.lang.String file_id) {
		FILE_ID = file_id;
	}


	public java.lang.String getFILE_NM() {
		return FILE_NM;
	}


	public void setFILE_NM(java.lang.String file_nm) {
		FILE_NM = file_nm;
	}


	public java.lang.String getFILE_PATH() {
		return FILE_PATH;
	}


	public void setFILE_PATH(java.lang.String file_path) {
		FILE_PATH = file_path;
	}


	public java.lang.String getFILE_UPLOAD_NM() {
		return FILE_UPLOAD_NM;
	}


	public void setFILE_UPLOAD_NM(java.lang.String file_upload_nm) {
		FILE_UPLOAD_NM = file_upload_nm;
	}


	public java.lang.String getFILE_EXT() {
		return FILE_EXT;
	}


	public void setFILE_EXT(java.lang.String file_ext) {
		FILE_EXT = file_ext;
	}


	public java.lang.String getMEMO_ID() {
		return MEMO_ID;
	}


	public void setMEMO_ID(java.lang.String memo_id) {
		MEMO_ID = memo_id;
	}


	public java.lang.String getMEMO_CN() {
		return MEMO_CN;
	}


	public void setMEMO_CN(java.lang.String memo_cn) {
		MEMO_CN = memo_cn;
	}


	public java.lang.String getMEMO_INFO() {
		return MEMO_INFO;
	}


	public void setMEMO_INFO(java.lang.String memo_info) {
		MEMO_INFO = memo_info;
	}


	public java.lang.String getMEMO_NM() {
		return MEMO_NM;
	}


	public void setMEMO_NM(java.lang.String memo_nm) {
		MEMO_NM = memo_nm;
	}


	public java.lang.String getCREATE_DT() {
		return CREATE_DT;
	}


	public void setCREATE_DT(java.lang.String create_dt) {
		CREATE_DT = create_dt;
	}


	public java.lang.String getUSER_ID() {
		return USER_ID;
	}


	public void setUSER_ID(java.lang.String user_id) {
		USER_ID = user_id;
	}


	public java.lang.String getFEATURE_SEQ() {
		return FEATURE_SEQ;
	}


	public void setFEATURE_SEQ(java.lang.String feature_seq) {
		FEATURE_SEQ = feature_seq;
	}
	

	public java.lang.String getFILE_BASE64_STRING() {
		return FILE_BASE64_STRING;
	}


	public void setFILE_BASE64_STRING(java.lang.String file_base64_string) {
		FILE_BASE64_STRING = file_base64_string;
	}

}
