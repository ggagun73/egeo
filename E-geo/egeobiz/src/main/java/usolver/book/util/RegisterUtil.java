package usolver.book.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.jdbc.support.JdbcUtils;

import egovframework.let.utl.fcc.service.EgovStringUtil;
import usolver.com.cmm.util.StringUtil;
import egovframework.com.cmm.service.Globals;

public class RegisterUtil {
	
	 public static List selectColumnsList(List selectColumnsList) throws Exception{
	    	
   	  List returnList = new ArrayList();
   	  
   	 // List selectColumnsList = registerService.selectColumnsList(mapColumns); 
   	  
   	  for(int i=0; i<selectColumnsList.size();i++){
   		  
   		  Map map = (Map) selectColumnsList.get(i);
   		  
   		  String g2Name = map.get("enColumns").toString();
   		  String g2Domain = map.get("g2Domain").toString();
   		  String g2TableName = map.get("enTablename").toString();
				
				if(g2Domain != null && !g2Domain.equals("0")){					
					returnList.add("NVL(TO_CHAR("+g2Name+"),'') AS " +g2Name);
					returnList.add("NVL(FN_G2S_CODEDVALUE('"+g2TableName+"','"+g2Name+"',"+g2Name+"),'') AS "+g2Name+"_NM");					
					
				}else if(g2Name.contains("_YMD")){				
					
					returnList.add("DECODE(LENGTH("+g2Name+"), 8, SUBSTR("+g2Name+",1,4)||'-'||SUBSTR("+g2Name+",5,2)||'-'||SUBSTR("+g2Name+",7,2), "+g2Name+") AS " +g2Name);
				
				}else if(g2Name.contains("_AMT")){				
					
					returnList.add("TRIM(TO_CHAR("+g2Name+",'999,999,999,999,999')) AS " +g2Name);
										
				}else{
					returnList.add("NVL(TO_CHAR("+g2Name+"),'') AS " +g2Name);
					
				}
		
   	  }
   	      	
   	  return returnList;
   	
   }
   
	 public static List searchColumnsList( HashMap parameterObject ){
		 List returnList = new ArrayList();
		 String[] sExcept = {"action_flag","screen_mode","callBackFunction","nJDSKSubId","CALL_TYPE","TABLENAME","KEY_COLUMN","openerId", "nd", "selectColumnsList", "searchColumnsList", "nJDSKMasterId", "page", "sord", "rows", "_search", "undefined[]", "sidx", "jqg_gridArea_6", "undefined"};
		 String sTableName = StringUtil.nvl(parameterObject.get("TABLENAME"));
		 
		 if(parameterObject.size() >0){
			 Set key = parameterObject.keySet();

			 for (Iterator iterator = key.iterator(); iterator.hasNext();) {
				 String keyNm = (String)iterator.next();

				 		 if( keyNm.equals("HJS_CD")){
				 			returnList.add("AND SUBSTR(HJD_CDE,0,2) LIKE  #{"+keyNm+"}||'%' ");    
				 		 }else if( keyNm.equals("HJG_CD")){
							 returnList.add("AND SUBSTR(HJD_CDE,0,4) LIKE  #{"+keyNm+"}||'%' ");    
						 }else if( keyNm.equals("SEARCHNAM")){
							 if( sTableName.contains("CONS_MA")){
								 returnList.add("AND ( CNT_NUM LIKE  '%'||#{"+keyNm+"}||'%' OR  CNT_NAM LIKE '%'||#{"+keyNm+"}||'%'  OR CNT_LOC LIKE '%'||#{"+keyNm+"}||'%' )  ");    
							 }else if( sTableName.contains("ROUT_DT")){
								 returnList.add("AND ( RUT_IDN LIKE  '%'||#{"+keyNm+"}||'%'  OR  RUT_NAM LIKE  '%'||#{"+keyNm+"}||'%'  ) ");     
							 }else if( sTableName.equals("RDT_RNDW_DT")){		
								 returnList.add("AND ( ROU_IDN LIKE  '%'||#{"+keyNm+"}||'%'  OR  ROT_EXP  LIKE  '%'||#{"+keyNm+"}||'%'  ) ");    	//우회도로대장,  	 
							 }else if( sTableName.equals("RDT_IPCR_DT")){		
								 returnList.add("AND ( IPC_IDN LIKE  '%'||#{"+keyNm+"}||'%' ) ");    	//도로중심선교점대장
							 }else if( sTableName.equals("RDT_CLBM_DT")){		
								 returnList.add("AND ( CLB_IDN LIKE  '%'||#{"+keyNm+"}||'%' ) ");    	//오르막차로대장
							 }else {
								 returnList.add("AND ( FTR_IDN LIKE  '%'||#{"+keyNm+"}||'%'  OR  SHT_NUM  LIKE  '%'||#{"+keyNm+"}||'%' ) ");      
							 }							 
			 			 }else if(keyNm.contains("_YMD") ||  keyNm.contains("PIP_DIP")   ||  keyNm.contains("PRS_SAH")  ){ // 설치 일자, 관로 구경

							 String sRealFiled = keyNm.substring(0,7);

							 if(keyNm.endsWith("_S")){ //설치일자 시작 AND <![CDATA[ IST_YMD >= #{IST_YMD_S} ]]>
								 returnList.add("AND "+sRealFiled+ ">= #{"+keyNm+"} ");
							 }else{							//설치일자 끝 AND <![CDATA[ IST_YMD <= #{IST_YMD_E} ]]>
								 returnList.add("AND "+sRealFiled+ "<= #{"+keyNm+"}"); 
							 }

						 }else if(keyNm.contains("_CDE") || keyNm.contains("SYS_CHK")){
							 returnList.add("AND "+keyNm+ " = #{"+keyNm+"}");
						 }else if(!chekExcept(sExcept, keyNm)){
							 returnList.add("AND "+keyNm+ " LIKE  '%'||#{"+keyNm+"}||'%' ");
						 }
			 }
		 }
		 return returnList;
   }
  	 
   public static List updateColumnsList( HashMap parameterObject ){

	   	List returnList = new ArrayList();
	   	String[] sExcept = {"action_flag","screen_mode","callBackFunction","nJDSKSubId","CALL_TYPE","TABLENAME","FID","KEY_COLUMN","openerId"};
	   	String sTableName = StringUtil.nvl(parameterObject.get("TABLENAME"));
	   	
	   	if(parameterObject.size() >0){

		    	Set key = parameterObject.keySet();

		    	for (Iterator iterator = key.iterator(); iterator.hasNext();) {

		    		 String keyNm = (String)iterator.next();
		    		 //String value=(String)parameterObject.get(keyNm);


		    		 if(keyNm.equals("ATR_YMD")){ //속성최종수정일자
		    			 returnList.add(keyNm+" = TO_CHAR(SYSDATE, 'YYYYMMDD')");
		    		 }else if(keyNm.equals("ATR_NAM")){ //속성최종수정자명
		    			 returnList.add(keyNm+" =#{USER_NAME}");
			    	
		    		 }else if(keyNm.contains("PIP_LBL") ){ // 관라벨
		    			 
		    			 String avgData = "";
		    			 if( sTableName.equals("WTL_PIPE_LM") ||  sTableName.equals("WTL_SPLY_LS") ){
		    				 avgData = "|| '/D'|| ( NVL(#{LOW_DEP},0) * NVL(#{HGH_DEP},0) / 2 ) ";		
			    		 }else  if( sTableName.equals("SWL_PIPE_LM")){
			    			 avgData = "|| '/D'|| ( NVL(#{BEG_DEP},0) * NVL(#{END_DEP},0) / 2 ) ";	   				
		    			 }
		    			
		    			String	pipLbl = "SUBSTR (#{IST_YMD}, 1, 4)|| '/'	|| CASE "
									+"WHEN INSTR (fn_g2s_codedvalue ('"+sTableName+"', 'MOP_CDE', #{MOP_CDE}), '(', 1 ) > 0" 
									+"THEN" 
									+"	SUBSTR (fn_g2s_codedvalue ('"+sTableName+"', 'MOP_CDE', #{MOP_CDE}), INSTR (fn_g2s_codedvalue ('"+sTableName+"','MOP_CDE',#{MOP_CDE}),'(',1)+ 1, LENGTH (fn_g2s_codedvalue ('"+sTableName+"','MOP_CDE',#{MOP_CDE})) - INSTR (fn_g2s_codedvalue ('"+sTableName+"','MOP_CDE',#{MOP_CDE}),'(',1)- 1)"
									+"ELSE fn_g2s_codedvalue ('"+sTableName+"', 'MOP_CDE', #{MOP_CDE})"
									+"END"
								    +"|| '/Ø'|| #{PIP_DIP}|| '/L' || #{PIP_LEN} "+avgData;		    			
		    			 
		    			 returnList.add(keyNm+ " = "+pipLbl);		    			 

		    		 }else if( keyNm.equals("SEC_IDN") ){
						   
						   if( !sTableName.equals("RDT_ROUT_DT") &&  !sTableName.equals("RDT_SDWK_DT")  &&  !sTableName.equals("RDT_RDWY_DT") )
							   returnList.add(keyNm+ " = #{"+keyNm+" , jdbcType=VARCHAR}");
						   
		    		 }else if( keyNm.equals("PMS_IDN") ){
						   
						   if( !sTableName.equals("RDT_EXAC_DT"))
							   returnList.add(keyNm+ " = #{"+keyNm+" , jdbcType=VARCHAR}");
						   
		    		 }else if(!chekExcept(sExcept, keyNm)){
		    			 
		    			 returnList.add(keyNm+ " = #{"+keyNm+" , jdbcType=VARCHAR}");
		    			 
		    		 }
		    	 }

	   	}

	   	 return returnList;

   }
   

   public static List insertColumnsList( HashMap parameterObject ){

	   List returnList = new ArrayList();
	   
	   String[] sExcept = {"action_flag","screen_mode","callBackFunction","nJDSKSubId","CALL_TYPE","TABLENAME","FID","KEY_COLUMN","openerId"};
	   String sTableName = StringUtil.nvl(parameterObject.get("TABLENAME"));

	   if(parameterObject.size() >0){

		   Set key = parameterObject.keySet();

		   for (Iterator iterator = key.iterator(); iterator.hasNext();) {

			   String keyNm = (String)iterator.next();
			   
			   if( keyNm.equals("SEC_IDN") ){
				   
				   if( !sTableName.equals("RDT_ROUT_DT") &&  !sTableName.equals("RDT_SDWK_DT")  &&  !sTableName.equals("RDT_RDWY_DT") )
					   returnList.add(keyNm);
				   
			   }else  if (!chekExcept(sExcept, keyNm)) returnList.add(keyNm);
			   //returnList.add(keyNm+ " = #{"+keyNm+"}");
		   }
	   }
	   return returnList;
   }
   
   public static boolean chekExcept(String[] sExcept, String keyNm){
	   	  
	   for (int i = 0; i < sExcept.length; i++) {
		   if(sExcept[i].equals(keyNm)){
			   return true;
		   }
	   }	   
	   return false;
   }
   
   
   public static StringBuffer selectDBXmlSbList( List xmlData, Map mapDBXmlSb ){
	   
	   StringBuffer xmlSb = new StringBuffer();
	   
	   String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
       xmlSb.append(xmlHeader);
       xmlSb.append("<rows>");
       xmlSb.append("<page>"+mapDBXmlSb.get("page").toString()+"</page>");
       xmlSb.append("<total>"+mapDBXmlSb.get("total_page").toString()+"</total>");
       xmlSb.append("<records>"+mapDBXmlSb.get("total_count").toString()+"</records>");
       
       if( xmlData!=null) {
       
       	for (int i = 0; i < xmlData.size(); i++) {
       		 Map map = (Map)xmlData.get(i);
       	    
       		 xmlSb.append("<Item>");
       		
       		 Iterator<String> it = map.keySet().iterator(); 

      	         while(it.hasNext()) { 
	    		 
   	    		 String keyNm = (String)it.next();
   	    		 String value=map.get(keyNm).toString();
   	    		 
   	    		 xmlSb.append("<"+keyNm+">"+StringUtil.nvl(value)+"</"+keyNm+">");
   	    		 
   	    	}
       	 
       		xmlSb.append("</Item>");
			}

       }
       xmlSb.append("</rows>");
	   
	   return xmlSb;
	   
   }

   public static String viewFileName(  String sTableName, String sFileType ){
	   
	   if (sTableName == null) {
           return null;
       }
	   
	   String sDirectory = "/usolver";

	   String[] returnVal = EgovStringUtil.split(sTableName,"_",3);
	   
       if( returnVal[0].substring(0, 2).equals("WT"))	sDirectory += "/water";
       if( returnVal[0].substring(0, 2).equals("SW"))	sDirectory += "/sewer";
       if( returnVal[0].substring(0, 2).equals("RD"))	sDirectory += "/road";
       	
       if( sFileType.equals("SUWON")){    	       	  
    	   sDirectory += "/"+EgovStringUtil.lowerCase(returnVal[1]);		 
       }
       else if( sFileType.equals("print"))	sDirectory += "/print";
       else if( sFileType.equals("statistic"))	sDirectory += "/statistic";
       else sDirectory += "/content";
       
       String sFileName = "/"+JdbcUtils.convertUnderscoreNameToPropertyName(sTableName);
       if(sFileType.equals("List") || sFileType.equals("statistic")) sFileName = "/register";     
            
	   return sDirectory+sFileName;
   }
}
