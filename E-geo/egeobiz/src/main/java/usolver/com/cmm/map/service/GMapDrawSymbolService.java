package usolver.com.cmm.map.service;

import java.awt.image.BufferedImage;

import usolver.com.cmm.map.service.vo.LineSymbolVO;
import usolver.com.cmm.map.service.vo.PolygonSymbolVO;

public interface GMapDrawSymbolService {
	
	public BufferedImage drawLineSymbol(LineSymbolVO lineSymbolVO) throws Exception;
	
	public BufferedImage drawStraightLineSymbol(LineSymbolVO lineSymbolVO) throws Exception;
	
	public BufferedImage drawPolygonSymbol(PolygonSymbolVO polygonSymbolVO) throws Exception;
}
