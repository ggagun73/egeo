package usolver.com.cmm.map.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
//import org.terracotta.agent.repkg.de.schlichtherle.io.File;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.UserLyrStlyeService;
import usolver.com.cmm.map.service.UserMemoService;
import usolver.com.cmm.map.service.vo.MarkerVO;
import usolver.com.cmm.map.service.vo.MemoFileInfoVO;
import usolver.com.cmm.map.service.vo.MemoGroupVO;
import usolver.com.cmm.map.service.vo.MemoHistVO;
import usolver.com.cmm.map.service.vo.MemoVO;
import usolver.com.cmm.map.service.vo.UserLyrStyleVO;
import usolver.com.cmm.map.service.vo.UserMemoVO;
import usolver.com.cmm.util.FileMngUtil;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;

/**
 * 사용자_스타일
 *
 * @Class Name : UserLyrStlyeServiceImpl.java
 * @Description : UserLyrStlye Business Implement class
 * @Modification Information
 *
 * @author sese5858@g-inno.com
 * @since 2015-08-01
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Service("userLyrStlyeService")
public class UserLyrStlyeServiceImpl extends AbstractServiceImpl implements UserLyrStlyeService {
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;
	
	public void updateUserLyrStyle(UserLyrStyleVO userLyrStyleVO) throws Exception {
		commonMapper.updateData("updateUserLyrStyle", userLyrStyleVO);
	}
	public void insertUserLyrStyle(UserLyrStyleVO userLyrStyleVO) throws Exception {
		commonMapper.insertData("insertUserLyrStyle", userLyrStyleVO);
	}
	public List<UserLyrStyleVO> selectAllUserLyrStlye(UserLyrStyleVO userLyrStyleVO) throws Exception {
		return commonMapper.list("selectAllUserLyrStlye", userLyrStyleVO);
	}
	public UserLyrStyleVO selectUserLyrStlye(UserLyrStyleVO userLyrStyleVO) throws Exception {
		return (UserLyrStyleVO) commonMapper.getSelect("selectUserLyrStlye", userLyrStyleVO);
	}
}
