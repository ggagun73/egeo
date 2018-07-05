package usolver.com.cmm.map.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import usolver.com.cmm.map.service.UserLyrStlyeService;
import usolver.com.cmm.map.service.vo.UserFavVO;
import usolver.com.cmm.map.service.vo.UserLyrStyleVO;


/**
 * @Class Name : EditStyleController.java
 * @Description : EditStyle Controller class
 * @Modification Information
 *
 * @author sese5858@g-inno.com
 * @since 2016-08-01
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Controller
public class EditStyleController {
	
	@Resource(name = "userLyrStlyeService")
	private UserLyrStlyeService userLyrStlyeService;
	
	/**
	 * 유저의 모든 스타일 정보를 조회후 가져온다.
	 * @param UserLyrStyleVO
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getAllUserLyrStlyeList.do")
	public String getAllUserLyrStlye(HttpServletRequest request, Model model) throws Exception {
		UserLyrStyleVO userLyrStyleVO = new Gson().fromJson(request.getParameter("data"), UserLyrStyleVO.class);
		List<UserLyrStyleVO> userStyleList = userLyrStlyeService.selectAllUserLyrStlye(userLyrStyleVO);
		
		model.addAttribute("userStyleList", userStyleList);
		return "jsonView";
	}
	
	/**
	 * 유저의 레이어 스타일 정보를 조회후 가져온다.
	 * @param UserLyrStyleVO
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getUserLyrStlye.do")
	public String getUserLyrStlye(HttpServletRequest request, Model model) throws Exception {
		UserLyrStyleVO userLyrStyleVO = new Gson().fromJson(request.getParameter("data"), UserLyrStyleVO.class);
		UserLyrStyleVO userStyle = userLyrStlyeService.selectUserLyrStlye(userLyrStyleVO);
		
		model.addAttribute("userStyle", userStyle);
		return "jsonView";
	}
	
	/**
	 * 유저의 레이어 스타일 정보를 갱신한다.
	 * @param UserLyrStyleVO
	 * @throws Exception
	 */
	@RequestMapping(value="/updateUserLyrStyle.do")
	public String updateUserLyrStyle(HttpServletRequest request, Model model ) throws Exception {	
		UserLyrStyleVO userLyrStyleVO = new Gson().fromJson(request.getParameter("data"), UserLyrStyleVO.class);
		String msg = null;
		try {
			userLyrStlyeService.updateUserLyrStyle(userLyrStyleVO);
		} catch (Exception e) {
			msg = e.getMessage();
		}
		model.addAttribute("msg", msg);
		return "jsonView";
	}
	
	/**
	 * 유저의 레이어 스타일 정보를 추가한다.
	 * @param UserLyrStyleVO
	 * @throws Exception
	 */
	@RequestMapping(value="/insertUserLyrStyle.do")
	public String insertUserLyrStyle(HttpServletRequest request, Model model ) throws Exception {
		UserLyrStyleVO userLyrStyleVO = new Gson().fromJson(request.getParameter("data"), UserLyrStyleVO.class);
		String msg = null;
		try {
			userLyrStlyeService.insertUserLyrStyle(userLyrStyleVO);
		} catch (Exception e) {
			msg = e.getMessage();
		}
		model.addAttribute("msg", msg);
		return "jsonView";
	}
	
	/**
	 * 유저의 레이어 스타일 정보를 갱신한다.
	 * @param UserLyrStyleVO
	 * @throws Exception
	 */
	@RequestMapping(value="/mergeUserLyrStyle.do")
	public void mergeUserLyrStyle(HttpServletRequest request) throws Exception {		
		UserLyrStyleVO userLyrStyleVO = new Gson().fromJson(request.getParameter("data"), UserLyrStyleVO.class);
		/*String msg = null;
		try {
			userLyrStlyeService.mergeUserLyrStyle(userLyrStyleVO);
		} catch (Exception e) {
			msg = e.getMessage();
		}
		model.addAttribute("msg", msg);*/
		UserLyrStyleVO searchLyrStyle = userLyrStlyeService.selectUserLyrStlye(userLyrStyleVO);
		if(searchLyrStyle == null){
			userLyrStlyeService.insertUserLyrStyle(userLyrStyleVO);
		} else {
			userLyrStlyeService.updateUserLyrStyle(userLyrStyleVO);
		}
	}
}
