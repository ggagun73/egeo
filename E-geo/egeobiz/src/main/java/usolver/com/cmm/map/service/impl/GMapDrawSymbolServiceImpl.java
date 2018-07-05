package usolver.com.cmm.map.service.impl;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;

import org.springframework.stereotype.Service;

import usolver.com.cmm.map.service.GMapDrawSymbolService;
import usolver.com.cmm.map.service.vo.LineSymbolVO;
import usolver.com.cmm.map.service.vo.PolygonSymbolVO;

@Service("gMapDrawSymbolService")
public class GMapDrawSymbolServiceImpl implements GMapDrawSymbolService {

	/**
	 * 라인 그림
	 */
	
	public BufferedImage drawLineSymbol(LineSymbolVO lineSymbolVO) throws Exception {
		Integer width = lineSymbolVO.getWidth()-1;
		Integer height = lineSymbolVO.getHeight()-1;
		
		BufferedImage bi = new BufferedImage(lineSymbolVO.getWidth(), lineSymbolVO.getHeight(), BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = bi.createGraphics();
		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		graphics.setColor(lineSymbolVO.getColor());
		
		if(lineSymbolVO.getMarker() != null) {
			graphics.drawLine(1, height/2-1, width-1, height/2-1);
			
			graphics.setColor(Color.RED);
			graphics.drawLine(Math.round(width/4), Math.round(height/4), Math.round(width/4*3), Math.round(height/4*3));
			graphics.drawLine(Math.round(width/4), Math.round(height/4*3), Math.round(width/4*3), Math.round(height/4));
		}
		else {
			graphics.drawLine(0, height/2, width/2, 0);
			graphics.drawLine(width/2, 0, width/2, height);
			graphics.drawLine(width/2, height, width, height/2);
			
			if(lineSymbolVO.getArrow() != null) {
				int arrowPixel = Math.round(width/3);
				int[] arrowX = new int[3];
				int[] arrowY = new int[3];
				
				arrowX[0] = width - arrowPixel;
				arrowX[1] = width;
				arrowX[2] = width;
				
				arrowY[0] = height/2;
				arrowY[1] = height/2;
				arrowY[2] = height/2 + arrowPixel;
				
				graphics.fillPolygon(arrowX, arrowY, 3);
			}
		}

		return bi;
	}

	/**
	 * 폴리곤 그림
	 */
	
	public BufferedImage drawPolygonSymbol(PolygonSymbolVO polygonSymbolVO)
			throws Exception {
		Integer width = polygonSymbolVO.getWidth()-1;
		Integer height = polygonSymbolVO.getHeight()-1;
		
		BufferedImage bi = new BufferedImage(polygonSymbolVO.getWidth(), polygonSymbolVO.getHeight(), BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = bi.createGraphics();
		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		graphics.setColor(polygonSymbolVO.getFillColor());
		graphics.fillRect(0, 0, width, height);
		
		graphics.setColor(polygonSymbolVO.getColor());
		graphics.drawRect(0, 0, width, height);
		
		return bi;
	}
	
	
	/**
	 * 선의 각도를 구함
	 */
	protected double getAngle(int x1, int y1, int x2, int y2) {
		int dx = x2 - x1;
		int dy = y2 - y1;
		
		double rad = Math.atan2(dy, dx);
		double degree = (rad*180)/Math.PI;
		
		return degree;
	}
	
	protected double getRotatePointX(double x, double y, double angle) {
		double radian = Math.PI / 180;
		double newX = x * Math.cos((angle) * radian) - y * Math.sin((angle) * radian);
		return newX;
	}
	
	protected double getRotatePointY(double x, double y, double angle) {
		double radian = Math.PI / 180;
		double newY = x * Math.sin((angle) * radian) + y * Math.cos((angle) * radian);
		return newY;
	}
	
	/**
	 * 직선형 라인 그림
	 */
	public BufferedImage drawStraightLineSymbol(LineSymbolVO lineSymbolVO) throws Exception {
		Integer width = lineSymbolVO.getWidth()-1;
		Integer height = lineSymbolVO.getHeight()-1;
		
		BufferedImage bi = new BufferedImage(lineSymbolVO.getWidth(), lineSymbolVO.getHeight(), BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = bi.createGraphics();
		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		graphics.setColor(lineSymbolVO.getColor());
		
		if(lineSymbolVO.getMarker() != null) {
			graphics.drawLine(1, height/2-1, width-1, height/2-1);
			
			graphics.setColor(Color.RED);
			graphics.drawLine(Math.round(width/4), Math.round(height/4), Math.round(width/4*3), Math.round(height/4*3));
			graphics.drawLine(Math.round(width/4), Math.round(height/4*3), Math.round(width/4*3), Math.round(height/4));
		}
		else {
			graphics.drawLine(0, height/2, width, height/2);
			
			if(lineSymbolVO.getArrow() != null) {
				int arrowPixel = Math.round(width/3);
				int[] arrowX = new int[3];
				int[] arrowY = new int[3];
				
				arrowX[0] = width - arrowPixel;
				arrowX[1] = width;
				arrowX[2] = width;
				
				arrowY[0] = height/2;
				arrowY[1] = height/2;
				arrowY[2] = height/2 + arrowPixel;
				
				graphics.fillPolygon(arrowX, arrowY, 3);
			}
		}

		return bi;
	}
}
