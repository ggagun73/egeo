package usolver.com.cmm.map.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import usolver.com.cmm.map.service.UserFavService;
import usolver.com.cmm.map.service.vo.UserFavVO;


/**
 * @Class Name : FavController.java
 * @Description : Fav Controller class
 * @Modification Information
 *
 * @author sese5858@g-inno.com
 * @since 2015-07-27
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.1
 */

@Controller
public class FavController {
	@Resource(name="userFavService")
	private UserFavService userFavService;
	
	/**
	 * 사용자의 즐겨찾기 그룹을 가져온다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectFavGroup.do", method = RequestMethod.POST)
	public String selectFavGroup(Model model, HttpServletRequest request) throws Exception {	
		Map groupInfo = new Gson().fromJson(request.getParameter("data"),new TypeToken<HashMap>(){}.getType());
		List<Map> groupList = userFavService.selectFavGroup(groupInfo);
		model.addAttribute("groupList",groupList);
        return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 그룹을 추가한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertFavGroup.do", method = RequestMethod.POST)
	public String insertFavGroup(Model model, HttpServletRequest request) throws Exception {	
		Map groupInfo = new Gson().fromJson(request.getParameter("data"),new TypeToken<HashMap>(){}.getType());
		int count = userFavService.insertFavGroup(groupInfo);
		model.addAttribute("count", count);
		return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 그룹을 수정한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateFavGroup.do", method = RequestMethod.POST)
	public String updateFavGroup(Model model, HttpServletRequest request) throws Exception {
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		int favCount = userFavService.updateFav(favVO);
		Map groupInfo = new Gson().fromJson(request.getParameter("data"),new TypeToken<HashMap>(){}.getType());
		int groupCount = userFavService.updateFavGroup(groupInfo);
		model.addAttribute("favCount", favCount);
		model.addAttribute("groupCount", groupCount);
		model.addAttribute("groupName", favVO.getGROUP_NAME_NEW());
		return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 그룹을 삭제한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteFavGroup.do", method = RequestMethod.POST)
	public String deleteFavGroup(Model model, HttpServletRequest request) throws Exception {
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		int favCount = userFavService.deleteFav(favVO);
		Map groupInfo = new Gson().fromJson(request.getParameter("data"),new TypeToken<HashMap>(){}.getType());
		int groupCount = userFavService.deleteFavGroup(groupInfo);
		model.addAttribute("favCount", favCount);
		model.addAttribute("groupCount", groupCount);
		model.addAttribute("groupName", favVO.getGROUP_NAME());
		return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 조회한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectFav.do", method = RequestMethod.POST)
	public String selectFav(Model model, HttpServletRequest request) throws Exception {	
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		List<UserFavVO> favList = userFavService.selectFav(favVO);
		model.addAttribute("favList",favList);
		return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 추가한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertFav.do", method = RequestMethod.POST)
	public String insertFav(Model model, HttpServletRequest request) throws Exception {	
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		int count = userFavService.insertFav(favVO);
		model.addAttribute("count", count);
		model.addAttribute("groupName", favVO.getGROUP_NAME());
		return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 수정한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateFav.do", method = RequestMethod.POST)
	public String updateFav(Model model, HttpServletRequest request) throws Exception {	
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		int count = userFavService.updateFav(favVO);
		model.addAttribute("count", count);
		model.addAttribute("groupName", favVO.getGROUP_NAME());
		return "jsonView";
	}
	
	/**
	 * 사용자의 즐겨찾기 삭제한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteFav.do", method = RequestMethod.POST)
	public String deleteFav(Model model, HttpServletRequest request) throws Exception {	
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		int count = userFavService.deleteFav(favVO);
		model.addAttribute("count", count);
		model.addAttribute("groupName", favVO.getGROUP_NAME());
		return "jsonView";
	}
	
	/**
	 * 사용자의 초기 지정영역을 수정한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectFavExtent.do", method = RequestMethod.POST)
	public String selectFavExtent(Model model, HttpServletRequest request) throws Exception {	
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		UserFavVO userFavVO = userFavService.selectFavExtent(favVO);
		model.addAttribute("favExtent", userFavVO.getFAV_G2DATA());
		return "jsonView";
	}
	
	/**
	 * 사용자의 초기 지정영역을 수정한다
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateFavExtent.do", method = RequestMethod.POST)
	public String updateFavExtent(Model model, HttpServletRequest request) throws Exception {	
		UserFavVO favVO = new Gson().fromJson(request.getParameter("data"), UserFavVO.class);
		userFavService.initFavExtent(favVO);
		int count = userFavService.updateFavExtent(favVO);
		model.addAttribute("count", count);
		model.addAttribute("groupName", favVO.getGROUP_NAME());
		return "jsonView";
	}
}
