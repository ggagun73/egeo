/*package ginno.com.cmm.util;

import java.net.*;
import java.util.*;

import javax.servlet.http.*;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.*;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.servlet.view.document.*;

public class ExcelView extends AbstractExcelView {
	@Override
	protected void buildExcelDocument(Map<String,Object> ModelMap, HSSFWorkbook workbook,
			
		HttpServletRequest request, HttpServletResponse response)
		throws Exception {
		
		String file_name = (String) ModelMap.get("file_name");
		//file_name = URLEncoder.encode(file_name,"UTF-8");

		String[] excel_title = (String[]) ModelMap.get("excel_title");
		String[] excel_column = (String[]) ModelMap.get("excel_column");		
		List<Map> data_list = (List<Map>)ModelMap.get("data_list");
 
        HSSFSheet worksheet = null;
        HSSFRow row = null;

        worksheet = workbook.createSheet(file_name);

        HSSFCellStyle cs1 = workbook.createCellStyle();
        cs1.setAlignment(CellStyle.ALIGN_CENTER);
        cs1.setFillBackgroundColor(HSSFColor.GREY_50_PERCENT.index);
        
        HSSFCellStyle cs2 = workbook.createCellStyle();
        cs2.setAlignment(CellStyle.ALIGN_RIGHT);

        HSSFCell c;
        
        // 헤더 생성
        row = worksheet.createRow(0);
        for( int i=0; i<excel_title.length; i++) {
        	c = row.createCell(i);
        	c.setCellStyle(cs1);
			c.setCellValue(excel_title[i]);
        }

        String tmp = "";
        for(int i=0;i<data_list.size();i++){
			row = worksheet.createRow(i+1);
			Map map = (Map) data_list.get(i);

			for( int column=0; column<excel_column.length; column++) {
				tmp = ""+map.get( excel_column[column] );
				if( "null".equals(tmp) )
					tmp = "";
				c = row.createCell(column);
				c.setCellValue(tmp);
			}
        }
		//response.setContentType("Application/Msexcel");
        //response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode(file_name,"UTF-8")+".xls");
		response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename="+URLEncoder.encode(file_name,"UTF-8")+".xls");
	}
}*/


package usolver.com.cmm.util;

import java.net.*;
import java.util.*;

import javax.servlet.http.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.*;

public class ExcelViewRegister extends AbstractExcelViewCustom {

		@Override
		protected void buildExcelDocument(Map<String,Object> ModelMap, SXSSFWorkbook workbook,
				
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
			
			String file_name="";
			//String file_name = (String) ModelMap.get("file_name");
			//file_name = URLEncoder.encode(file_name,"UTF-8");
	
			List<Map>  excel_title =  (List<Map>) ModelMap.get("excel_title");
			//String[] excel_column = (String[]) ModelMap.get("excel_column");		
			List<Map> data_list = (List<Map>)ModelMap.get("data_list");
	 
	        Sheet worksheet = null;
	        Row row = null;
	
	        worksheet = workbook.createSheet();
	
	        CellStyle cs1 = workbook.createCellStyle();
	        cs1.setAlignment(CellStyle.ALIGN_CENTER);
	        cs1.setFillBackgroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
	        
	        CellStyle cs2 = workbook.createCellStyle();
	        cs2.setAlignment(CellStyle.ALIGN_RIGHT);
	
	        Cell c;
	        
	        // 헤더 생성
	        row = worksheet.createRow(0);
	        for( int i=0; i<excel_title.size(); i++) {
	        	c = row.createCell(i);
	        	c.setCellStyle(cs1);
	        	Map map = (Map) excel_title.get(i);
				c.setCellValue(map.get("koColumns").toString());
				
				file_name=map.get("koTblename").toString()+"현황";
	        }
	
	        String tmp = "";
	        for(int i=0;i<data_list.size();i++){
				row = worksheet.createRow(i+1);
				Map map = (Map) data_list.get(i);
	
				for( int column=0; column<excel_title.size(); column++) {
					
					Map mapExcel = (Map) excel_title.get(column);
					String enColumns = mapExcel.get("enColumns").toString();
					String retEnColumns=enColumns;
					if(enColumns.contains("_CDE")){
						retEnColumns=enColumns+"_NM";
					}
					
					tmp = ""+map.get( retEnColumns );
					if( "null".equals(tmp) )
						tmp = "";
					c = row.createCell(column);
					c.setCellValue(tmp);
				}
	        }
			//response.setContentType("Application/Msexcel");
	        //response.setHeader("Content-Disposition", "ATTachment; Filename="+URLEncoder.encode(file_name,"UTF-8")+".xls");
			response.setContentType("application/vnd.ms-excel");
	        response.setHeader("Content-Disposition", "attachment; filename="+URLEncoder.encode(file_name,"UTF-8")+".xlsx");
		}

	}	
