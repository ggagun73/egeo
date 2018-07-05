package usolver.com.cmm.map.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.com.cmm.map.service.GMapCommonService;

import egovframework.rte.fdl.cmmn.AbstractServiceImpl;

@Service("gMapCommonService")
public class GMapCommonServiceImpl extends AbstractServiceImpl implements GMapCommonService {
	
	
	@Resource(name = "gmapCommonDAO")
	private GMapCommonDAO gmapCommonDAO;
	
	//@Override
	public String selectTableAlias(String table) throws Exception {
		return gmapCommonDAO.selectTableAlias(table);
	}

	//@Override
	public String selectFieldAlias(String table, String field) throws Exception {
		return gmapCommonDAO.selectFieldAlias(table, field);
	}

}
