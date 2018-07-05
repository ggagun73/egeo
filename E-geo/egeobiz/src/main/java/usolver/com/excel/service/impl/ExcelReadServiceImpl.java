package usolver.com.excel.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Service;

import usolver.com.cmm.dao.CommonMapper;
import usolver.com.excel.service.ExcelReadService;

@Service("excelReadService")
public class ExcelReadServiceImpl implements ExcelReadService {
	
	/** common Mapper */
    @Resource(name="commonMapper") private CommonMapper commonMapper;
    
	public HSSFWorkbook loadExcel(InputStream is) throws IOException {
		return new HSSFWorkbook(is);
	}

	public List<Map<String, String>> readSheet(HSSFSheet sheet) throws Exception {
		List<Map<String, String>> excelItems = new ArrayList<Map<String, String>>();
		
		Iterator<Row> rows = sheet.rowIterator();
		
		while(rows.hasNext()) {
			Row row = rows.next();
			Iterator<Cell> cells = row.cellIterator();
			
			Map<String, String> excelItem = new HashMap<String, String>();
			
			while(cells.hasNext()) {
				Cell cell = cells.next();
				String cellType = EXCEL_TYPE.getType(cell.getColumnIndex());
				
				if(cellType == null) continue;
					
				switch(cell.getCellType()) {
					case HSSFCell.CELL_TYPE_STRING :
						excelItem.put(cellType, cell.getStringCellValue());
						break;
						
					case HSSFCell.CELL_TYPE_NUMERIC : 
						excelItem.put(cellType, Double.toString(cell.getNumericCellValue()));
						break;
					case HSSFCell.CELL_TYPE_FORMULA : 
						if (cell.getCachedFormulaResultType() == Cell.CELL_TYPE_NUMERIC) {
							excelItem.put(cellType, Integer.toString(cell.getCachedFormulaResultType()));
						} else if (cell.getCachedFormulaResultType() == Cell.CELL_TYPE_STRING) {
							String cellValue = cell.getStringCellValue();
							if(!cellValue.equals("")) {
								excelItem.put(cellType, cell.getStringCellValue());
							}
						}
						break;
				}
				
			}
			
			if(row.getRowNum() != 0 && !excelItem.isEmpty()) {
				excelItems.add(excelItem);
			}
		}
		return excelItems;
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, String>> selectCentroid(List<Map<String, String>> sheetDatas) throws Exception {
		
		List<Map<String, String>> resultDatas = new ArrayList<Map<String, String>>();
		List<Map<String, String>> queryData = (List<Map<String, String>>) commonMapper.list("selectCentoridList", sheetDatas);
		// Map<String, String> queryData = (Map<String, String>) commonMapper.selectByPk("selectCentorid", sheetData.get(EXCEL_TYPE.getType(EXCEL_TYPE.PNU.getValue())));
		
		for(Map<String, String> sheetData : sheetDatas) {
			String excelPNUData = sheetData.get(EXCEL_TYPE.getType(EXCEL_TYPE.PNU.getValue()));
			
			for(int i = 0, len = queryData.size(); i < len; i++) {
				Map<String, String> map = queryData.get(i);
				String queryPNUData = map.get("pnu").toString();
				
				if(excelPNUData.equals(queryPNUData)) {
					
					sheetData.put("x", queryData.get(i).get("pointX"));
					sheetData.put("y", queryData.get(i).get("pointY"));
					
					resultDatas.add(sheetData);
				}
			}
		}
		
		return resultDatas;
	}
}

enum EXCEL_TYPE {
	PNU(0), // PNU
	BLD_NAM(1), // 명칭
	BJD_NAM(2), // 법정동명
	SAN_CHK(3), // 산구분
	FAC_NUM(4), // 본번
	FAD_NUM(5), // 부번
	COLORNUM(6),
	COLORNAME(7),
	MARKERSIZE(8),
	IMAGE(9), // 이미지
	SBA_NAM(10), // 용도
	UNKOWNVALUE(11);
	
	final int value;
	
	private EXCEL_TYPE(int value) {
		this.value = value;
	}
	
	public int getValue() {
		return this.value;
	}
	
	public static EXCEL_TYPE getValue(int value) throws Exception {		
		switch(value) {
			case 0 : return PNU;
			case 1 : return BLD_NAM;
			case 2 : return BJD_NAM;
			case 3 : return SAN_CHK;
			case 4 : return FAC_NUM;
			case 5 : return FAD_NUM;
			case 6 : return COLORNUM;
			case 7 : return COLORNAME;
			case 8 : return MARKERSIZE;
			case 9 : return IMAGE;
			case 10 : return SBA_NAM;
			default : return UNKOWNVALUE;
		}
	}
	
	public static String getType(int value) throws Exception {
		
		EXCEL_TYPE type = EXCEL_TYPE.getValue(value);
		
		switch(type) {
			case PNU : return "PNU";
			case BLD_NAM : return "BLD_NAM";
			case BJD_NAM : return "BJD_NAM";
			case SAN_CHK : return "SAN_CHK";
			case FAC_NUM : return "FAC_NUM";
			case FAD_NUM : return "FAD_NUM";
			case COLORNUM : return "COLORNUM";
			case COLORNAME : return "COLORNAME";
			case MARKERSIZE :  return "MARKERSIZE";
			case IMAGE :  return "IMAGE";
			case SBA_NAM :  return "SBA_NAM";
			default : return null;
		}
	}
}
