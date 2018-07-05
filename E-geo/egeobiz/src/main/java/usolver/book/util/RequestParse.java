package usolver.book.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;

import usolver.com.cmm.util.StringUtil;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.let.utl.sim.service.EgovClntInfo;

public class RequestParse {
	
	

	public static HashMap PropertyToHashMap(Properties properties){

		HashMap map = new HashMap();
		Object[] arrKeySet = properties.keySet().toArray();
    	for(int i=0; i<arrKeySet.length;i++){
    		String key = (String)arrKeySet[i];
    		if(map.containsKey(key)){continue;}
    		map.put(key, properties.get(key));
    	}
		return map;
	}
	
	
	
	public static HashMap RequestToHashMap(HttpServletRequest request){
		
		HashMap map = new HashMap();
		Object[] arrKeySet = request.getParameterMap().keySet().toArray();
		
	
    	for(int i=0; i<arrKeySet.length;i++){
    		String key = (String)arrKeySet[i];
    		
			System.out.println(" #####################################   key =>"+key);   	   		
    		if(key.contains("@")){
    			
    		
	    		if(map.containsKey(key) ){continue;}
	    		
	    		String[] values = request.getParameterValues(key);
	    		
	    		if(values.length == 0){ continue;} //  값이 없는 경우 미실행
	    		
	    		key=key.replace("@","");
	    		
	    	/*	if(values.length == 0 ){
	    			map.put(key,"");
	    		}else */
	    			    		
	    		if(values.length==1){ //단일 명
	    			if(values[0] == null || values[0].equals("")){ continue;} //  값이 없는 경우 미실행
	    			map.put(key, EgovStringUtil.getSpclStrCnvr(values[0]));
	    		}else{//동일명으로 값이 있는 경우 다중 select, check, radio
	    			map.put(key,values);
	    		}
    		}
    	}
  
		return map;
		
	}
	
	public static HashMap RequestToHashMap2(HttpServletRequest request){
		
		HashMap map = new HashMap();
		Object[] arrKeySet = request.getParameterMap().keySet().toArray();
		
	
    	for(int i=0; i<arrKeySet.length;i++){
    		String key = (String)arrKeySet[i];
       		
	    		if(map.containsKey(key) ){continue;}
	    		
	    		String[] values = request.getParameterValues(key);
	    		
	    		System.out.println(" #####################################   key =>"+key+" : "+values[0]);   	   		
	    		
	    		if(values.length == 0){ continue;} //  값이 없는 경우 미실행
	    		
	    		if(values.length==1){ //단일 명
	    			if(values[0] == null || values[0].equals("")){ continue;} //  값이 없는 경우 미실행
	    			map.put(key, EgovStringUtil.getSpclStrCnvr(values[0]));
	    		}else{//동일명으로 값이 있는 경우 다중 select, check, radio
	    			map.put(key,values);
	    		}
    	}
  
		return map;
		
	}
	
	public static HashMap RequestToHashMapUpdate(HttpServletRequest request){
		
		HashMap map = new HashMap();
		Object[] arrKeySet = request.getParameterMap().keySet().toArray();
		
	
    	for(int i=0; i<arrKeySet.length;i++){
    		String key = (String)arrKeySet[i];
       		
	    		if(map.containsKey(key) ){continue;}
	    		
	    		String[] values = request.getParameterValues(key);
	    		
	    		System.out.println(" #####################################   key =>"+key+" : "+values[0]);   	   		
	    		
	    		//if(values.length == 0){ continue;} //  값이 없는 경우 미실행
	    		
	    		if(values.length==1){ //단일 명
	    			//if(values[0] == null || values[0].equals("")){ continue;} //  값이 없는 경우 미실행
	    			map.put(key, EgovStringUtil.getSpclStrCnvr(values[0]));
	    		}else{//동일명으로 값이 있는 경우 다중 select, check, radio
	    			map.put(key,values);
	    		}
    	}
  
		return map;
		
	}

}
