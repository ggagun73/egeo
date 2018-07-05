package usolver.com.cmm.util;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Locale;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

import egovframework.com.cmm.EgovWebUtil;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.service.Globals;
import egovframework.com.cmm.util.EgovResourceCloseHelper;

public class FileMngUtil extends EgovFileMngUtil {

	
	public static HashMap<String, String>  saveFile(MultipartFile file, String newName, String stordFilePath) throws Exception {
		
        int maxWidth = 100;
        int maxHeight = 100;
        int thumbWidth; int thumbHeight;
		HashMap<String, String> map = new HashMap<String, String>();
		
		try {		
			
			//디렉토리가 존재하는지
			File dir = new File(EgovWebUtil.filePathBlackList(stordFilePath));

			if(!dir.isDirectory()){
				dir.mkdir();
			}
			
			
			//Write File 이후 Move File
			String orginFileName = file.getOriginalFilename();

			int index = orginFileName.lastIndexOf(".");
			//String fileName = orginFileName.substring(0, _index);
			String fileExt = orginFileName.substring(index + 1);
			long size = file.getSize();

			//storedFilePath는 지정
			map.put(Globals.ORIGIN_FILE_NM, orginFileName);
			map.put(Globals.UPLOAD_FILE_NM, newName);
			map.put(Globals.FILE_EXT, fileExt);
			map.put(Globals.FILE_PATH, stordFilePath);
			map.put(Globals.FILE_SIZE, String.valueOf(size));
			
			//thumb 생성			
			File convFile = new File( file.getOriginalFilename());
	        file.transferTo(convFile);	        
			BufferedImage img = ImageIO.read(convFile);
			
			int width = img.getWidth();
			int height = img.getHeight();
			
			
			if((float)maxWidth/img.getWidth() > (float)maxHeight/img.getHeight()) {
			    maxWidth = (int)(img.getWidth() * ((float)maxHeight/img.getHeight()));
			} else {
				maxHeight = (int)(img.getHeight() * ((float)maxWidth/img.getWidth()));
			}
			
			//int maxWH= width>height ? width : height;
			//System.out.println(maxWH);
			//double ratio =  (maxWidth / maxWH)<1 ? 1 : maxWidth / maxWH;
			
			//System.out.println(width + "," + height + "," + ratio);
			//System.out.println((int)(width*ratio) + "," +(int)(height*ratio));
			
			File thumb_file_name = new File( stordFilePath + File.separator + newName + "_tmb" );
            BufferedImage buffer_thumbnail_image;
            System.out.println(fileExt.toUpperCase());
            if(fileExt.toUpperCase().equals("PNG"))
            	buffer_thumbnail_image= new BufferedImage(maxWidth, maxHeight, BufferedImage.TYPE_INT_ARGB);
            else
            	buffer_thumbnail_image= new BufferedImage(maxWidth, maxHeight, BufferedImage.TYPE_INT_RGB);
            Graphics2D graphic = buffer_thumbnail_image.createGraphics();
            //graphic.setColor(new Color(255,255,255,0));
            //graphic.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
               
            //AlphaComposite ac = java.awt.AlphaComposite.getInstance(AlphaComposite.CLEAR,0.5F);
            //graphic.setComposite(ac);
            //graphic.fillRect(0, 0, maxWidth, maxHeight);
            graphic.drawImage(img, 0, 0, maxWidth, maxHeight, null);
            ImageIO.write(buffer_thumbnail_image, fileExt, thumb_file_name );
            graphic.dispose();
            
          //폴더가 없으면 자동으로 생성함.
			writeFile(file, newName, stordFilePath);
			
			return map;
			
		}catch(Exception e)
		{
			return null ;
		}
		finally {
			return map;
		}		
	}
	
	
	
	
	
	public static String newFileName()
	{
		String rtnStr = null;

		// 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
		String pattern = "yyyyMMddhhmmssSSS";

		SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
		Timestamp ts = new Timestamp(System.currentTimeMillis());

		rtnStr = sdfCurrent.format(ts.getTime());
		
		return rtnStr;
	}
	
	
	public File getFile(String fileName, String filePath) throws Exception {
		
		//String stordFilePath = EgovProperties.getProperty("Globals.fileStorePath");
		
		File file = new File(filePath + fileName);
		
		if (!file.exists()) {
			return null;
			//throw new FileNotFoundException(fileName);
		}

		if (!file.isFile()) {
			return null;
			//throw new FileNotFoundException(fileName);
		}
		
		return file;
	}
	
}
