package usolver.book.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StatisticUtil {
	
	// 행 공통 코드
	public static final String COMMON_HJG_CDE = "CM00101"; // 구
	public static final String COMMON_HJD_CDE = "CM00102"; // 행정동
	public static final String COMMON_SHT_NUM = "CM00103"; // 도엽번호
	public static final String COMMON_BLK_NUM = "CM00104"; // 급수구역
	
	
	public static final String WATER_LINE = "SA001"; // 상수관로
	// 상수관로 열 코드
	public static final String WATER_LINE_IST_YMD = "SA00101"; // 매설년도
	public static final String WATER_LINE_MOP_CDE = "SA00102"; // 관종
	public static final String WATER_LINE_PIP_DIP = "SA00103"; // 관경
	public static final String WATER_LINE_UPD_YMD = "SA00104"; // 갱생년도
	
	
	// TODO : 상수맨홀 정의 필요
	
	// TODO : 누수지점 정의 필요
	
	// TODO : 급수관 정의 필요
	
	/**
	 * 상수 통계 조건에 대한 col 값을 가져오기 위한 ibatis namespace를 반환
	 * 
	 * @param code 시설물코드
	 * @param col 열 코드
	 * @return namespace
	 */
	public static String getStatisticColQueryString(String code, String col) {
		String namespace = "";
		if(code.equals(WATER_LINE)) { // 상수관로
			namespace = waterLineQueryString(col);
		} 
		// TODO : 상수맨홀 정의, 누수지점 정의, 급수관 정의
		
		return namespace;
	}

	public static String getStatisticRowQueryString(String code, String row) {
		String namespace = "";
		
		if(code.equals(WATER_LINE)) { // 상수관로
			namespace = waterLineQueryString(row);
			
			// 상수관로 코드에서 quertNamespace 값이 없다면 공통코드에서 찾음
			if(namespace.equals("") || namespace.length() < 1) {
				namespace = commonQueryString(row);
			}
		} 
		
		return namespace;
	}
	
	/**
	 * 공통으로 사용하는 행 코드의 QueyString을 반환
	 * 
	 * @param row 행, 열 코드
	 * @return namespace
	 */
	public static String commonQueryString(String row) {
		
		String namespace = "";
		
		if(row.equals(COMMON_HJG_CDE)) { // 구
			namespace = "statistic.";
		}else if(row.equals(COMMON_HJD_CDE)) { // 행정동
			namespace = "statistic.selectCommonHjdcdeNames";
		}else if(row.equals(COMMON_SHT_NUM)) { // 도엽번호
			namespace = "statistic.";
		}else if(row.equals(COMMON_BLK_NUM)) { // 급수구역
			namespace = "statistic.";
		}
		
		return namespace;
	}
	
	/**
	 * 상수관로에서 사용하는 행, 열 코드의 QueryString을 반환
	 * 
	 * @param code 행, 열 코드
	 * @return namespace
	 */
	public static String waterLineQueryString(String code) {
		
		String namespace = "";
		
		if(code.equals(WATER_LINE_IST_YMD)) { // 매설년도
			namespace = "statistic.selectIstYmdNames";
		}else if(code.equals(WATER_LINE_MOP_CDE)) { // 관종
			namespace = "statistic.selectMopcdeNames";
		}else if(code.equals(WATER_LINE_PIP_DIP)) { // 관경
			namespace = "statistic.selectPipdipNames";
		}else if(code.equals(WATER_LINE_UPD_YMD)) { // 갱생년도
			namespace = "statistic.selectUpdymdNames";
		}
		
		return namespace;
	}

	/**
	 * 상수관로에서 통계 데이터를 조회하기 위한 query namespace 을 반환
	 * 
	 * @param code 시설물 코드
	 * @param row 행 코드
	 * @param col 열 코드
	 * @return namespace
	 */
	public static String getStatisticItemQueryString(String code, String row, String col) {
		
		String namespace = "";
		
		if(code.equals(WATER_LINE)) { // 상수관로
			
			if(row.equals(COMMON_HJD_CDE)) { // 행 : 행정동
				
				if(col.equals(WATER_LINE_IST_YMD)) { // 열 : 매설년도
					namespace = "statistic.selectHjcdeIstymdItem";
				} else if(col.equals(WATER_LINE_MOP_CDE)) { // 열:  관종
					namespace = "statistic.selectHjcdeMopcdeItem";
				//else if 추가 선언 ?
				}
				
			} else if(row.equals(WATER_LINE_IST_YMD)) { // 행 : 매설년도
				if(col.equals(WATER_LINE_MOP_CDE)) { // 열 :  관종
					namespace = "statistic.selectIstymdMopcdeItem";
				}
				
			} else if(row.equals(COMMON_HJG_CDE)) { // 행 : 구
				
			} else if(row.equals(COMMON_SHT_NUM)) { // 행 : 도엽번호
				
			} else if(row.equals(COMMON_BLK_NUM)) { // 행 : 급수구역
				
			} else if(row.equals(WATER_LINE_MOP_CDE)) { // 행 : 관종
				if(col.equals(WATER_LINE_IST_YMD)) {
					namespace = "statistic.selectMopcdeIstymdItem";
				}
				
			} else if(row.equals(WATER_LINE_PIP_DIP)) { // 행 : 관경
				
			} else if(row.equals(WATER_LINE_UPD_YMD)) { // 행 : 갱생년도
				
			}
			
		} // TODO :  상수맨홀 정의, 누수지점, 급수관 정의
		
		return namespace;
	}
	
	/**
	 * 
	 * 엑셀뷰에 맞는 데이터 형식으로 교체
	 * 
	 * @param rowName 조건 명 
	 * @param rowNames 열 이름
	 * @param colNames 행 이름
	 * @param items 엑셀 데이터 
	 * @return
	 */
	public static List<Map<String, String>> getExcelListData(String rowName, List<String> rowNames, List<String> colNames, Map<String, List<String>> items) {
		colNames.add(0, rowName);
        
        List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();
        
        for(int i = 0; i <rowNames.size(); i ++) {
        	
        	Map<String, String> mapItem = new HashMap<String, String>();
        	
        	mapItem.put(colNames.get(0), rowNames.get(i));
        	
        	for(int j = 1; j < colNames.size(); j++) {
        		
        		mapItem.put(colNames.get(j), items.get(colNames.get(j)).get(i));
        	}
        	
        	dataList.add(mapItem);
        }
		
		return dataList;
	}
}
   