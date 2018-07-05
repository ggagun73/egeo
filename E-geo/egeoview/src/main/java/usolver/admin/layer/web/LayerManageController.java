package usolver.admin.layer.web;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.maven.model.Model;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import GeoFrame.Data.SpatialReference.Transformations.aiMathTransform;
import usolver.admin.layer.service.LayerManageService;
import usolver.com.cmm.map.service.LyrInfoService;

@Controller
public class LayerManageController {
	@Resource(name="layerManageService")
	private LayerManageService layerManageService;
	
	@Resource(name = "lyrInfoService")
	private LyrInfoService lyrInfoService;
	
	/**
	 * @return String
	 * @exception Exception
     */
    @RequestMapping("/admin/layer/selectLayerList.do")
    public String selectLayer(ModelMap model,HttpServletRequest request) throws Exception {
    	List<Map> layerList = layerManageService.selectLayer();
    	String params = "";
    	String s = "";
    	for(int i=0;i<layerList.size();i++){
    		params += layerList.get(i).get("G2_NAME");
    		if(i < layerList.size()-1) {
    			params += ",";
    		}
    	}
    	
    	String urlStr =  URLDecoder.decode(request.getParameter("url"), "UTF-8");
    	BufferedReader oBufReader = null;
    	
		URL url = new URL(urlStr+"Service=WMS&Version=1.3.0&Request=GetStyles&Layers="+params);
		URLConnection connection = url.openConnection();
		HttpURLConnection huc = (HttpURLConnection)connection;
		huc.setRequestMethod("GET");
		huc.setDoOutput(true);
		huc.setDoInput(true);
		huc.setUseCaches(false);
		huc.setDefaultUseCaches(false);
		huc.connect();
		oBufReader = new BufferedReader(new InputStreamReader(url.openStream()));
		
		StringBuffer buf = new StringBuffer();
		while((s = oBufReader.readLine()) != null){
			buf.append(s);
		}
		
		DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = builderFactory.newDocumentBuilder();
		Document document = builder.parse(new InputSource(new StringReader(buf.toString())));
		NodeList nodeLayerList = document.getElementsByTagName("sld:FeatureTypeConstraint");
		
		for(int i=0;i<nodeLayerList.getLength();i++) {
			String layerName = nodeLayerList.item(i).getFirstChild().getTextContent();
			layerList.get(i).put("LYR_ENG_NM", layerName);
			layerList.get(i).put("LYR_TYPE", layerManageService.searchSpatialtype(layerName));
		}
		model.addAttribute("layers",new Gson().toJson(layerList));
		model.addAttribute("serviceLayers", new Gson().toJson(layerManageService.selectServiceLayer(null)));
    	/*model.addAttribute("layerGroup", new Gson().toJson(layerManageService.selectGroupLayer()));
    	
    	model.addAttribute("serviceLayerGroup", new Gson().toJson(layerManageService.selectServiceGroup()));
    	model.addAttribute("serviceLayers", new Gson().toJson(layerManageService.selectServiceLayer(null)));*/
    	
        return "usolver/admin/layer/LayerServiceManageList";
    }
    
    @RequestMapping("/admin/layer/saveServiceLayer.do")
    public void mergeServiceLayer(HttpServletRequest request,Model model) {
    	List<Map> updateLayer = new Gson().fromJson((String)request.getParameter("updateLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	List<Map> insertLayer = new Gson().fromJson((String)request.getParameter("insertLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	int updatecount = 0;
    	int insertcount = 0;
    	
    	if(updateLayer.size() > 0) {
    		for(Map layer :updateLayer) {
    			updatecount += layerManageService.updateServiceLayer(layer);
    		}
    	}
    	if(insertLayer.size() > 0) {
    		for(Map layer :insertLayer) {
    			String layerName ="";
    			if((layerName=layerManageService.checkLayerName((String)layer.get("LYR_ENG_NM"))) != null) {
    				int index = 0;
    				try {
    					index = Integer.parseInt(layerName.replaceAll("[^0-9]", ""));
					} catch (Exception e) {
						index=0;
					}
    				layer.put("LYR_ENG_NM", (String)layer.get("LYR_ENG_NM")+(index+1));
    				insertcount = layerManageService.insertServiceLayer(layer);
    			} else {
    				insertcount = layerManageService.insertServiceLayer(layer);
    			}
    		}
    	}
    }
    
    @RequestMapping("/admin/layer/selectRefLayerList.do")
    public String selectRefLayerList(HttpServletRequest request,ModelMap model) {
    	model.addAttribute("editLayers", new Gson().toJson(layerManageService.selectEditLayer()));
    	model.addAttribute("serviceLayers", new Gson().toJson(layerManageService.selectServiceLayer(null)));
    	
    	return "usolver/admin/layer/LayerRefManageList";
    }
    
    @RequestMapping("/admin/layer/selectRefLayer.do")
    public String selectRefLayer(HttpServletRequest request,ModelMap model) {
    	List<Map> refLayers = layerManageService.selectRefLayer(request.getParameter("layerName"));
    	
    	model.addAttribute("refLayers", refLayers);
    	
    	return "jsonView";
    }
    
    @RequestMapping("/admin/layer/saveRefLayer.do")
    public String saveRefLayer(HttpServletRequest request,ModelMap model) {
    	List<Map> deleteLayer = new Gson().fromJson((String)request.getParameter("deleteLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	List<Map> insertLayer = new Gson().fromJson((String)request.getParameter("insertLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	
    	Map paramMap = new HashMap();
    	paramMap.put("deleteLayer", deleteLayer);
    	paramMap.put("insertLayer", insertLayer);
    	int insertCount = layerManageService.insertRefLayer(paramMap);
    	int deleteCount = layerManageService.deleteRefLayer(paramMap);
    	
    	model.addAttribute("insertCount", insertCount);
    	model.addAttribute("deleteCount", deleteCount);
    	
    	return "jsonView";
    }
    
    @RequestMapping("/admin/layer/selectSnapLayerList.do")
    public String selectSnapLayerList(HttpServletRequest request,ModelMap model) {
    	model.addAttribute("editLayers", new Gson().toJson(layerManageService.selectEditLayer()));
    	model.addAttribute("serviceLayers", new Gson().toJson(layerManageService.selectServiceLayer(null)));
    	
    	return "usolver/admin/layer/LayerSnapManageList";
    }
    
    @RequestMapping("/admin/layer/selectSnapLayer.do")
    public String selectSnapLayer(HttpServletRequest request,ModelMap model) {
    	List<Map> snapLayers = layerManageService.selectSnapLayer(request.getParameter("layerName"));
    	
    	model.addAttribute("snapLayers", snapLayers);
    	
    	return "jsonView";
    }
    
    @RequestMapping("/admin/layer/saveSnapLayer.do")
    public String saveSnapLayer(HttpServletRequest request,ModelMap model) {
    	List<Map> deleteLayer = new Gson().fromJson((String)request.getParameter("deleteLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	List<Map> insertLayer = new Gson().fromJson((String)request.getParameter("insertLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	List<Map> updateLayer = new Gson().fromJson((String)request.getParameter("updateLayer"), new TypeToken<List<HashMap>>(){}.getType());
    	
    	Map paramMap = new HashMap();
    	paramMap.put("deleteLayer", deleteLayer);
    	paramMap.put("insertLayer", insertLayer);
    	paramMap.put("updateLayer", updateLayer);
    	int updateCount = 0;
    	for(Map layer:updateLayer) {
    		updateCount += layerManageService.updateSnapLayer(layer);
    	}
    	int insertCount = layerManageService.insertSnapLayer(paramMap);
    	int deleteCount = layerManageService.deleteSnapLayer(paramMap);
    	
    	model.addAttribute("updateCount", updateCount);
    	model.addAttribute("insertCount", insertCount);
    	model.addAttribute("deleteCount", deleteCount);
    	
    	return "jsonView";
    }
}
