package usolver.com.cmm.map.web;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import usolver.com.cmm.map.service.GMapCommonService;
import usolver.com.cmm.map.service.GMapDrawSymbolService;
import usolver.com.cmm.map.service.vo.GMapAliasVO;
import usolver.com.cmm.map.service.vo.LineSymbolVO;
import usolver.com.cmm.map.service.vo.PolygonSymbolVO;

@Controller
public class GMapCommonController {
	
	/** BookMarkService */
	@Resource(name = "gMapDrawSymbolService")
    private GMapDrawSymbolService gMapDrawSymbolService;
	
	@Resource(name = "gMapCommonService")
    private GMapCommonService gMapCommonService;
	
	@RequestMapping(value = "/gmap/getLineSymbol.do")
	public void getLineSymbol(@ModelAttribute("lineSymbolVO") LineSymbolVO lineSymbolVO, HttpServletResponse res) throws Exception {
		res.reset();
		res.setContentType("Image/png");
		OutputStream ios = res.getOutputStream();
		ImageIO.write(gMapDrawSymbolService.drawLineSymbol(lineSymbolVO), "png", ios);
	    ios.close();
	}
	
	@RequestMapping(value = "/gmap/getPolygonSymbol.do")
	public void getPolygonSymbol(@ModelAttribute("polygonSymbolVO") PolygonSymbolVO polygonSymbolVO, HttpServletResponse res) throws Exception {
		res.reset();
		res.setContentType("Image/png");
		OutputStream ios = res.getOutputStream();
		ImageIO.write(gMapDrawSymbolService.drawPolygonSymbol(polygonSymbolVO), "png", ios);
	    ios.close();
	}
	
	@RequestMapping(value = "/gmap/attr/getAlias.do")
	public String getAlias(HttpServletRequest request, ModelMap model) throws Exception {
		List<Map<String, Object>> listRet = new ArrayList<Map<String, Object>>();
		String tbl = request.getParameter("tables");
		String fld = request.getParameter("fields");
		GMapAliasVO vo = new GMapAliasVO();
		vo.setFields(fld);		
		vo.setTables(tbl);
		
		String[] tables = vo.getArrTables();
		String[] fields = vo.getArrFileds();

		Map<String, Object> mapLayers = null;
		for (int i = 0, len = tables.length; i < len; i++) {
			boolean chkTable = false;
			for (int j = 0, jLen = listRet.size(); j < jLen; j++) {
				if (listRet.get(j).get(tables[i]) != null) {
					chkTable = true;
					break;
				}
			}

			if (chkTable)
				continue;
			else
				mapLayers = new HashMap<String, Object>();

			mapLayers.put(tables[i], gMapCommonService.selectTableAlias(tables[i]));
			Map<String, String> mapFields = new HashMap<String, String>();
			for (int j = i, jLen = fields.length; j < jLen; j++) {
				mapFields.put(fields[j], gMapCommonService.selectFieldAlias(tables[i],
						fields[j]));
				mapLayers.put("fields", mapFields);
			}

			listRet.add(mapLayers);
		}

		model.addAttribute("data", listRet);
		return "jsonView";
	}
	
	@RequestMapping(value = "/gmap/getStraightLineSymbol.do")
	public void getStraightLineSymbol(@ModelAttribute("lineSymbolVO") LineSymbolVO lineSymbolVO, HttpServletResponse res) throws Exception {
		res.reset();
		res.setContentType("Image/png");
		OutputStream ios = res.getOutputStream();
		ImageIO.write(gMapDrawSymbolService.drawStraightLineSymbol(lineSymbolVO), "png", ios);
	    ios.close();
	}
}
