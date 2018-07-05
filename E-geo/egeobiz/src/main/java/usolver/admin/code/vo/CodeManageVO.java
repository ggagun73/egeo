package usolver.admin.code.vo;

import usolver.com.cmm.vo.AdmDefaultVO;

public class CodeManageVO extends AdmDefaultVO {

	private static final long serialVersionUID = 1L;
	
	private String g2Id;
	private String g2Name;
	private String g2DomainId;
	private String g2Code;
	private String g2Value;
	private String TABLENAME;
	private String g2NewCode;
	private String CODETABLE;
	
	public String getG2Id() {
		return g2Id;
	}
	public void setG2Id(String g2Id) {
		this.g2Id = g2Id;
	}
	public String getG2Name() {
		return g2Name;
	}
	public void setG2Name(String g2Name) {
		this.g2Name = g2Name;
	}
	public String getG2DomainId() {
		return g2DomainId;
	}
	public void setG2DomainId(String g2DomainId) {
		this.g2DomainId = g2DomainId;
	}
	public String getG2Code() {
		return g2Code;
	}
	public void setG2Code(String g2Code) {
		this.g2Code = g2Code;
	}
	public String getG2Value() {
		return g2Value;
	}
	public void setG2Value(String g2Value) {
		this.g2Value = g2Value;
	}
	public String getTABLENAME() {
		return TABLENAME;
	}
	public void setTABLENAME(String tABLENAME) {
		TABLENAME = tABLENAME;
	}
	public String getG2NewCode() {
		return g2NewCode;
	}
	public void setG2NewCode(String g2NewCode) {
		this.g2NewCode = g2NewCode;
	}
	public String getCODETABLE() {
		return CODETABLE;
	}
	public void setCODETABLE(String cODETABLE) {
		CODETABLE = cODETABLE;
	}
	
	
}
