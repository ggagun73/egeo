package usolver.com.cmm.map.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

@Repository("gmapCommonDAO")
public class GMapCommonDAO extends EgovComAbstractDAO {
	/*
	public String selectTableAlias(String table) throws Exception {
		return (String)getSqlMapClientTemplate().queryForObject("GMap.Common.selectTableAlias", table);
	}

	public String selectFieldAlias(String table, String field) throws Exception {
		Map<String, String> inputMap = new HashMap<String, String>();
		
		inputMap.put("table", table);
		inputMap.put("field", field);
		
		return (String)getSqlMapClientTemplate().queryForObject("GMap.Common.selectFieldAlias", inputMap);
	}*/
	
	public String selectTableAlias(String table) throws Exception {
		@SuppressWarnings("unchecked")
		List<String> result = list("GMap.Common.selectTableAlias", table);
		
		if (result.isEmpty()) {
			return "n";
		} else {
			return (String) result.get(0);
		}
		// return (String)
		// getSqlMapClientTemplate().queryForObject("GMap.Common.selectTableAlias",
		// table).toString();
	}

	public String selectFieldAlias(String table, String field) throws Exception {
		Map<String, String> inputMap = new HashMap<String, String>();

		inputMap.put("table", table);
		inputMap.put("field", field);
		
		@SuppressWarnings("unchecked")
		List<String> result = list("GMap.Common.selectFieldAlias", inputMap);
 
		
		if (result.isEmpty()) {
			return "n";
		} else {
			return (String) result.get(0);
		}
		// return
		// (String)getSqlMapClientTemplate().queryForObject("GMap.Common.selectFieldAlias",
		// inputMap);
	}
}
