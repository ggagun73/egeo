package usolver.com.excel.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public interface ExcelReadService {

	public HSSFWorkbook loadExcel(InputStream is) throws IOException;

	public List<Map<String, String>> readSheet(HSSFSheet sheet) throws Exception;

	public List<Map<String, String>> selectCentroid(List<Map<String, String>> sheetData) throws Exception;

}
