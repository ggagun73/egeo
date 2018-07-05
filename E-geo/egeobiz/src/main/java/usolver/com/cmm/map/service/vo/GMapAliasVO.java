package usolver.com.cmm.map.service.vo;

public class GMapAliasVO {
	private String[] arrTables;
	
	private String[] arrFileds;
	
	private String tables;
	
	private String fields;

	public String[] getArrTables() {
		return arrTables;
	}

	public void setArrTables(String[] arrTables) {
		this.arrTables = arrTables;
	}

	public String[] getArrFileds() {
		return arrFileds;
	}

	public void setArrFileds(String[] arrFileds) {
		this.arrFileds = arrFileds;
	}

	public String getTables() {
		return tables;
	}

	public void setTables(String tables) {
		this.arrTables = tables.split(",");
		this.tables = tables;
	}

	public String getFields() {
		return fields;
	}

	public void setFields(String fields) {
		this.arrFileds = fields.split(",");
		this.fields = fields;
	}
}
