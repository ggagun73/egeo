package usolver.com.gmap.web;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.OutputStream;
import java.io.Writer;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import usolver.admin.log.ilg.service.ImgLogService;
import usolver.admin.log.ilg.vo.ImgLog;
import usolver.com.cmm.service.CommonService;
import usolver.com.gmap.service.SaveMapService;

@Controller
public class G2MapSaveController {
	
	/** EgovSampleService */
    @Resource(name = "saveMapService")
    private SaveMapService saveMapService;
    
	/** EgovSampleService */
    @Resource(name = "commonService")
    private CommonService commonService;
    
    @Resource(name = "imgLogService")
    private ImgLogService imgLogService;

	@RequestMapping(value = "/maputil/save.do")
	public void saveMap(HttpServletRequest request, HttpServletResponse res) throws Exception {
		String decodeStr =  URLDecoder.decode(request.getParameter("datas"), "UTF-8");
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddHHmmssSSS");
		String fileName = URLDecoder.decode(request.getParameter("fileName"), "UTF-8");
		
		if(fileName.equals(""))
			fileName =  "Map_"+dateFormat.format(calendar.getTime());
		
		//if(fileName.equals("")) fileName = "save";
		
		saveMapService.setType("save");
		saveMapService.setRootPath(request.getSession().getServletContext().getRealPath("/"));
		BufferedImage image = saveMapService.createImages(decodeStr);
		String browserName = null;
		
		String header = request.getHeader("User-Agent");

        if (header.contains("MSIE") || header.contains("Mozilla")) {
            browserName =  "MSIE";
        } else if(header.contains("Chrome")) {
            browserName =   "Chrome";
        } else if(header.contains("Opera")) {
            browserName =   "Opera";
        }else 
        	browserName =   "Firefox";
        
		String newFileName = commonService.getKorFileName(browserName, fileName);
		
		res.reset();
		res.setContentType("Image/png");
		res.setHeader("Content-Disposition", "attachment;filename=" + newFileName + ".png");
		
	    OutputStream ios = res.getOutputStream();
	    ImageIO.write(image, "png", ios);
	    ImgLog imgLog = new ImgLog();
	    imgLog.setUSER_ID("admin");
	    imgLog.setSAVE_IMG(saveMapService.encodingImgToBase64(image));
	    imgLog.setIMG_STATE("저장");
	   // imgLogService.intsertImgLog(imgLog);
	    res.flushBuffer();
	    ios.close();
	}
	
	@RequestMapping(value = "/map/saveImageToView.do")
	public String saveMapImageToView(HttpServletRequest request, HttpServletResponse res, Model model) throws Exception {
		String decodeStr =  URLDecoder.decode(request.getParameter("datas"), "UTF-8");
		//String fowardUrl = request.getParameter("url");
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddHHmmssSSS");
		String fileName =  "Map_"+dateFormat.format(calendar.getTime());
		
		if(fileName.equals("")) fileName = "save";
		
		saveMapService.setType("save");
		saveMapService.setRootPath(request.getSession().getServletContext().getRealPath("/"));
		BufferedImage image = saveMapService.createImages(decodeStr);
		try {
			int width = Integer.parseInt(request.getParameter("width"));
			int height = Integer.parseInt(request.getParameter("height"));
			image = saveMapService.resizeImages(image, width, height);
		} catch (Exception e) {
		} 
		model.addAttribute("base64", saveMapService.encodingImgToBase64(image));
	    return "jsonView";
	}
	
	@RequestMapping(value = "/map/printSave.do")
	public void printSave(HttpServletRequest request, HttpServletResponse res) throws Exception {
		String decodeStr =  URLDecoder.decode(request.getParameter("datas"), "UTF-8");
		
		saveMapService.setType("save");
		saveMapService.setRootPath(request.getSession().getServletContext().getRealPath("/"));
		BufferedImage image = saveMapService.createImages(decodeStr);
		
		String dirName = "c:/usolver3/printImage/";
		File file = null;
		try {
			file = new File(dirName);
		    if (!file.isDirectory()) {
		          file.mkdirs();        // 상위 디렉토리가 존재하지 않으면 상위디렉토리부터 생성
		   }
		} 
		catch (Exception e) {
		      e.printStackTrace();    
		} 
	    String fileName = dirName + "ImagePrint.png";
	    file = new File(fileName);
	      
	    ImageIO.write(image, "png", file);
	
	    Writer out = res.getWriter();
	    out.write(fileName);
	    out.close();
	}
	
	@RequestMapping(value = "/map/loadImage.do")
	public void loadImage(HttpServletRequest request, HttpServletResponse res) throws Exception {
		String filePath = request.getParameter("filePath");
		
		File file = new File(filePath);
		
		BufferedImage image = ImageIO.read(file);
		
		res.reset();
		res.setContentType("Image/png");
		OutputStream ios = res.getOutputStream();
	    ImageIO.write(image, "png", ios);
	    ios.close();
	}
	
	@RequestMapping(value = "/map/savePopup.do")
	public String savePopup(ModelMap model) {
		return "/egovframework/ginnoframework/gmap/savePop";
	}
	
	@RequestMapping(value = "/map/printPopup.do")
	public String printPopup(ModelMap model) {
		return "/egovframework/ginnoframework/gmap/printPop";
	}
}