package usolver.com.cmm.web;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GMapProxyController {
	
	@RequestMapping(value="/gmap/proxyPost.do")
	public void proxyPost(HttpServletRequest request, HttpServletResponse res) throws Exception {
		String urlStr =  URLDecoder.decode(request.getParameter("url"), "UTF-8");
		String params = URLDecoder.decode(request.getParameter("params"), "UTF-8");
		
		URL url = new URL(urlStr);
		URLConnection connection = url.openConnection();
		
		/*if(String.valueOf(params.charAt(0)).equals("<")){
			String headerType = connection.getContentType();
			if(headerType.toUpperCase().indexOf("UTF-8") != -1)
				connection.setRequestProperty("Content-Type", "text/xml; charset=UTF-8");
			else
				connection.setRequestProperty("Content-Type", "text/xml; charset=EUC-KR");
		}*/
		
		HttpURLConnection huc = (HttpURLConnection)connection;
		if(String.valueOf(params.charAt(0)).equals("<"))
			huc.setRequestProperty("Content-Type", "text/xml; charset=UTF-8");
		huc.setRequestMethod("POST");
		huc.setDoOutput(true);
		huc.setDoInput(true);
		huc.setUseCaches(false);
		huc.setDefaultUseCaches(false);			

		//String new_params = URLEncoder.encode(params, "UTF-8");  
		IOUtils.copy(IOUtils.toInputStream(params, "UTF-8"), huc.getOutputStream());
		//PrintWriter pOut = new PrintWriter(huc.getOutputStream());
		//pOut.println(params);
		//pOut.close();

		res.reset();
		res.setContentType(huc.getContentType());
		
		OutputStream ios = res.getOutputStream();
		IOUtils.copy(huc.getInputStream(), ios);
		
		ios.close();
	}
	
	@RequestMapping(value="/gmap/proxyGet.do")
	public void proxyGet(HttpServletRequest request, HttpServletResponse res) throws Exception {
		String urlStr =  URLDecoder.decode(request.getParameter("url"), "UTF-8");
		String params = URLDecoder.decode(request.getParameter("params"), "UTF-8");
		
		URL url = new URL(urlStr+params);
		URLConnection connection = url.openConnection();
		HttpURLConnection huc = (HttpURLConnection)connection;
		huc.setRequestMethod("GET");
		huc.setDoOutput(true);
		huc.setDoInput(true);
		huc.setUseCaches(false);
		huc.setDefaultUseCaches(false);
		
		res.reset();
		res.setContentType(huc.getContentType());
		
		OutputStream ios = res.getOutputStream();
		
		IOUtils.copy(huc.getInputStream(), ios);
		
		ios.close();
	}
}
