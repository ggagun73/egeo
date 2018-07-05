package usolver.com.cmm.map.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.cmm.map.service.UserFavService;
import usolver.com.cmm.map.service.vo.UserFavVO;

@Service("userFavService")
public class UserFavServiceImpl implements UserFavService {
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;
	
	public List<Map> selectFavGroup(Map groupInfo) throws Exception {
		return commonMapper.getSelectList("selectFavGroup", groupInfo);
	}
	
	public int insertFavGroup(Map groupInfo) throws Exception {
		return commonMapper.insert("insertFavGroup", groupInfo);
	}

	public int updateFavGroup(Map groupInfo) throws Exception {
		return commonMapper.update("updateFavGroup", groupInfo);
	}

	public int deleteFavGroup(Map groupInfo) throws Exception {
		return commonMapper.delete("deleteFavGroup", groupInfo);
	}

	public List<UserFavVO> selectFav(UserFavVO favVO) throws Exception {
		return commonMapper.getSelectList("selectFav", favVO);
	}
	
	public int insertFav(UserFavVO favVO) throws Exception {
		return commonMapper.insert("insertFav", favVO);
	}
	
	public int updateFav(UserFavVO favVO) throws Exception {
		return commonMapper.update("updateFav", favVO);
	}
	
	public int deleteFav(UserFavVO favVO) throws Exception {
		return commonMapper.delete("deleteFav", favVO);
	}
	public UserFavVO selectFavExtent(UserFavVO favVO) throws Exception {
		return (UserFavVO) commonMapper.getSelect("selectFavExtent", favVO);
	}
	public int initFavExtent(UserFavVO favVO) throws Exception {
		return commonMapper.update("initFavExtent", favVO);
	}
	public int updateFavExtent(UserFavVO favVO) throws Exception {
		return commonMapper.update("updateFavExtent", favVO);
	}
}
