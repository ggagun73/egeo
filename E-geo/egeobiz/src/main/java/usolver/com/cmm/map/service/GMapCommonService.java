package usolver.com.cmm.map.service;

public interface GMapCommonService {
	
	String selectTableAlias(String table) throws Exception;
	
	String selectFieldAlias(String table, String field) throws Exception;
}
