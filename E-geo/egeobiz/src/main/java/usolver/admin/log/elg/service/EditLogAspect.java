package usolver.admin.log.elg.service;

import java.util.HashMap;

import javax.annotation.Resource;

import org.aspectj.lang.ProceedingJoinPoint;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.util.StopWatch;

import usolver.admin.log.elg.vo.EditLog;
import usolver.book.service.BookService;
import usolver.com.main.vo.LoginVO;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : EgovSysLogAspect.java
 * @Description : 시스템 로그 생성을 위한 ASPECT 클래스
 * @Modification Information
 *
 *    수정일         수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 11.   이삼섭         최초생성
 *    2011. 7. 01.   이기하         패키지 분리(sym.log -> sym.log.lgm)
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
public class EditLogAspect {

	
	/** CommonService */
	@Resource(name = "EditLogService")
	private EditLogService EditLogService;
		
	/** CommonService */
	@Resource(name = "bookService")
	private BookService bookService;

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 insert로 시작되는 Method
	 *
	 * @param ProceedingJoinPoint
	 * @return Object
	 * @throws Exception
	 */
	public Object logInsert(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			stopWatch.stop();

			EditLog editLog = new EditLog();
			editLog.setSvcName(joinPoint.getTarget().getClass().getName());
			editLog.setMethodName( joinPoint.getSignature().getName());
			editLog.setProcessTime(Long.toString(stopWatch.getTotalTimeMillis()));
			editLog.setEditType("INSERT"); 	    	
			
			String sTableName = "";
			String sG2Id = "";
			String sData = "";
			
			 for (Object obj : joinPoint.getArgs()) {
				 			 	
				 	ObjectMapper mapper = new ObjectMapper();
				 	String jsonInString = mapper.writeValueAsString(obj);
					System.out.println(" obj => json. =>"+jsonInString);
					editLog.setG2Data(jsonInString);
				 	
					if (obj instanceof HashMap) {
						HashMap map = (HashMap) obj;
						
						sTableName = map.get("TABLENAME").toString();
						
						System.out.println(" sTableName =>"+sTableName);
						if( sTableName.contains("IMGE") ){
							sG2Id = map.get("IMG_IDN").toString();
						}else{
							sG2Id = map.get("G2_ID").toString();
						}
		                editLog.setG2Id(sG2Id);
		                editLog.setG2TableName(sTableName);
		               
					}					
	        }
    							
			/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				
				editLog.setUserId(user.getUSER_ID());			    	
		    	editLog.setUserName(user.getUSER_NAME());	    	
		    	editLog.setUserIp(user.getUSER_IP());
		    	editLog.setUserDept(user.getUSER_DEPT());
	    	}
	    	
	    	EditLogService.logInsertEditLog(editLog);
	    	
		}

	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 update로 시작되는 Method
	 *
	 * @param ProceedingJoinPoint
	 * @return Object
	 * @throws Exception
	 */
	public Object logUpdate(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			stopWatch.stop();
			
			EditLog editLog = new EditLog();
			editLog.setSvcName(joinPoint.getTarget().getClass().getName());
			editLog.setMethodName( joinPoint.getSignature().getName());
			editLog.setProcessTime(Long.toString(stopWatch.getTotalTimeMillis()));
			editLog.setEditType("UPDATE"); 	    	

			String sTableName = "";
			String sG2Id = "";
			
		    for (Object obj : joinPoint.getArgs()) {

			 	ObjectMapper mapper = new ObjectMapper();
			 	String jsonInString = mapper.writeValueAsString(obj);
				System.out.println(" obj => json. =>"+jsonInString);
				editLog.setG2Data(jsonInString);

		    	if (obj instanceof HashMap) {
					
		    		HashMap map = (HashMap) obj;
					sTableName = map.get("TABLENAME").toString();
					
					if( sTableName.contains("IMGE") ){						
						sG2Id = map.get("IMG_IDN").toString();
					}else{
						sG2Id = map.get("G2_ID").toString();
					}
	                
					System.out.println(" sTableName=>"+sTableName);
					System.out.println(" sG2Id=>"+sG2Id);
					
	                editLog.setG2Id(sG2Id);
	                editLog.setG2TableName(sTableName);
	               
				}
		    	
		    	if (obj instanceof HashMap){
		    		
		    	}
	        }
			
		    if( sTableName != null && !sTableName.equals("") && sG2Id != null &&  !sG2Id.equals("") ){
				 HashMap logObject =  new HashMap();
		    	 logObject.put("TABLENAME", sTableName);
		    	
		    	EgovMap preData;
	    		if( sTableName.contains("IMGE") ){
					 logObject.put("IMG_IDN", sG2Id);
					 preData = bookService.bookImgeDetail(logObject);	    			   
				}else{
					 logObject.put("G2_ID", sG2Id);
					 preData = bookService.bookDetail(logObject);	    			    	 
				}
	    		
	    		System.out.println(" preData =>"+preData);
		    	 editLog.setG2Data(EgovMapToString(preData));
			}
		    
	    	/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				
				editLog.setUserId(user.getUSER_ID());			    	
		    	editLog.setUserName(user.getUSER_NAME());	    	
		    	editLog.setUserIp(user.getUSER_IP());
		    	editLog.setUserDept(user.getUSER_DEPT());
	    	}

	    	EditLogService.logInsertEditLog(editLog);

		}

	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 delete로 시작되는 Method
	 *
	 * @param ProceedingJoinPoint
	 * @return Object
	 * @throws Exception
	 */
	public Object logDelete(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			stopWatch.stop();
			
			EditLog editLog = new EditLog();
			
			editLog.setSvcName(joinPoint.getTarget().getClass().getName());
			editLog.setMethodName( joinPoint.getSignature().getName());
			editLog.setProcessTime(Long.toString(stopWatch.getTotalTimeMillis()));
			editLog.setEditType("DELETE"); 	    	
			
			String ip = "";				
			
			for (Object obj : joinPoint.getArgs()) {

			 	ObjectMapper mapper = new ObjectMapper();
			 	String jsonInString = mapper.writeValueAsString(obj);
				System.out.println(" obj => json. =>"+jsonInString);
				editLog.setG2Data(jsonInString);			
				
				if (obj instanceof HashMap) {
					HashMap map = (HashMap) obj;
					
	                editLog.setG2Id(map.get("G2_ID").toString());
	                editLog.setG2TableName(map.get("TABLENAME").toString());
	                
				}
		   }
			  
	    	/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				
				editLog.setUserId(user.getUSER_ID());			    	
		    	editLog.setUserName(user.getUSER_NAME());	    	
		    	editLog.setUserIp(user.getUSER_IP());
		    	editLog.setUserDept(user.getUSER_DEPT());
	    	}
						
	    	EditLogService.logInsertEditLog(editLog);

		}

	}
	
	public static String EgovMapToString(EgovMap parameterObject){
		
		String sResult = "";
		Object[] arrKeySet = parameterObject.keySet().toArray();
		String[] sExcept = {"action_flag","screen_mode","callBackFunction","nJDSKSubId","CALL_TYPE","TABLENAME","FID","KEY_COLUMN","openerId","updateColumnsList","insertColumnsList"};
		
    	for(int i=0; i<arrKeySet.length;i++){
    		String key = (String)arrKeySet[i];       		
	    	
    		if(!chekExcept(sExcept, key)){
    			String values = parameterObject.get(key).toString();	    	
    			sResult = sResult+key+"="+values+",";
    		}
	    		    	
    	}
  
		return sResult;
		
	}
	
	public static boolean chekExcept(String[] sExcept, String keyNm){
		   	  
		   for (int i = 0; i < sExcept.length; i++) {
			   if(sExcept[i].equals(keyNm)){
				   return true;
			   }
		   }	   
		   return false;
	}
}
