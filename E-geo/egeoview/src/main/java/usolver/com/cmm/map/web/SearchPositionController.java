package usolver.com.cmm.map.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import usolver.com.cmm.map.service.SearchPositionService;
import usolver.com.cmm.map.service.vo.SearchBLDGVO;
import usolver.com.cmm.map.service.vo.SearchJUSOVO;
import usolver.com.cmm.map.service.vo.SearchNEWJUSOVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;


@Controller
public class SearchPositionController {
	
	@Resource(name = "searchPositionService")
	private SearchPositionService searchPositionService;
	
	/**
	 * 건물 정보를 불러온다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSearchPositionBLDG.do", method = RequestMethod.POST)
	public String getSearchPositionBLDG(@ModelAttribute SearchBLDGVO searchBLDGVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
		String dong = request.getParameter("dong");
		String bldg = request.getParameter("bldg");
		
		if(!dong.equalsIgnoreCase("ALL"))
			searchBLDGVO.setBJD_CDE(dong);
		searchBLDGVO.setBLD_NAM(bldg);	
		List<EgovMap> bldgList = searchPositionService.selectBldgList(searchBLDGVO);		

		model.addAttribute("resList", bldgList);		
        return "jsonView";
	}
	
	/**
	 * 주소 정보를 불러온다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSearchPositionJUSO.do", method = RequestMethod.POST)
	public String getSearchPositionJUSO(@ModelAttribute SearchJUSOVO searchJUSOVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
		String dong = request.getParameter("dong");
		String san = request.getParameter("san");
		String bonbun = request.getParameter("bonbun");
		String boobun = request.getParameter("boobun");		
		
		searchJUSOVO.setBJD_CDE(dong);	
		searchJUSOVO.setSAN(san);
		searchJUSOVO.setBONBUN(bonbun);
		searchJUSOVO.setBOOBUN(boobun);
		List<EgovMap> jusoList = searchPositionService.selectJusoList(searchJUSOVO);
		
		model.addAttribute("resList", jusoList);		
        return "jsonView";
	}	
	
	/**
	 * 도로명 정보를 불러온다.
	 * @param none
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSearchPositionNEWJUSO.do", method = RequestMethod.POST)
	public String getSearchPositionNEWJUSO(@ModelAttribute SearchNEWJUSOVO searchNEWJUSOVO, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {	
		String rncd; 
		String bonbun; 
		String boobun; 		
		String gu;
		String bldg;
		String dong;
		
		List<EgovMap> newjusoList;
		if(request.getParameter("bldg") != null){
			gu = request.getParameter("gu");
			dong = request.getParameter("dong");
			bldg = request.getParameter("bldg");
			searchNEWJUSOVO.setHJD_CD(gu);
			searchNEWJUSOVO.setBJD_CD(dong);
			searchNEWJUSOVO.setBULD_NM(bldg);
			newjusoList = searchPositionService.selectNewJusoList_bd(searchNEWJUSOVO);
		}
		else{
			rncd = request.getParameter("rncd");
			bonbun = request.getParameter("bonbun");
			boobun = request.getParameter("boobun");
			searchNEWJUSOVO.setRN_CD(rncd);
			searchNEWJUSOVO.setBONBUN(bonbun);
			searchNEWJUSOVO.setBOOBUN(boobun);
			newjusoList = searchPositionService.selectNewJusoList_rn(searchNEWJUSOVO);
		}
		
		model.addAttribute("resList", newjusoList);		
        return "jsonView";
	}
}
