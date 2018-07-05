package usolver.com.gmap.service;

import java.awt.image.BufferedImage;

public interface SaveMapService {
	
	public BufferedImage createImages(String pStr) throws Exception;
	
	public void setType(String type);
	
	public void setRootPath(String rootPath);
	
	public String encodingImgToBase64(BufferedImage image) throws Exception;
	
	public BufferedImage resizeImages(BufferedImage image, int width, int height) throws Exception;
}
