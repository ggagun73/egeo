package usolver.admin.log.lgm.service;

import java.util.HashMap;

import javax.annotation.Resource;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.util.StopWatch;

import usolver.admin.log.elg.service.EditLogService;
import usolver.admin.log.elg.vo.EditLog;
import usolver.admin.log.lgm.vo.SysLog;
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
public class EgovSysLogAspect {

	@Resource(name="EgovSysLogService")
	private EgovSysLogService sysLogService;	
	
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

			SysLog sysLog = new SysLog();
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCode = "C";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String userId = "";
			String userName = "";
			String ip = "";
			
			String sTableName = "";
			String sG2Id = "";
			String sData = "";
			
			EditLog editLog = new EditLog();
			
			 for (Object obj : joinPoint.getArgs()) {

					sData = obj.toString();			
					
					if (obj instanceof HashMap) {
						HashMap map = (HashMap) obj;
						
						sTableName = map.get("TABLENAME").toString();
		                sG2Id = map.get("G2_ID").toString();
		                
		                editLog.setG2Id(sG2Id);
		                editLog.setG2TableName(sTableName);
		               
					}
	        }

	    	/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				userId = user.getUSER_ID();
				userName = user.getUSER_NAME();
	    	}
	    	
			sysLog.setSrvcNm(className);
			sysLog.setMethodNm(methodName);
			sysLog.setProcessSeCode(processSeCode);
			sysLog.setProcessTime(processTime);
			sysLog.setRqesterId(userId);
			sysLog.setRqesterIp(ip);

			sysLogService.logInsertSysLog(sysLog);		
			
			if( sTableName != null && !sTableName.equals("") && sG2Id != null &&  !sG2Id.equals("") ){
				 HashMap logObject =  new HashMap();
		    	 logObject.put("TABLENAME", sTableName);
		    	 logObject.put("G2_ID", sG2Id);
		    	 
		    	 EgovMap preData = bookService.bookDetail(logObject);	    			    	 
		    	 editLog.setG2Data(EgovMapToString(preData));    	
			
			}else {
				editLog.setG2Data(sData);
			}
			
			
			editLog.setSvcName(className);
			editLog.setMethodName(methodName);
			editLog.setProcessTime(processTime);
			editLog.setEditType("INSERT"); 	    	
			editLog.setUserId(userId);			    	
	    	editLog.setUserName(userName);	    	
	    	editLog.setUserIp(ip);
	    	
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

			SysLog sysLog = new SysLog();
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCode = "U";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String userId = "";
			String userName = "";
			String ip = "";
						
			String sTableName = "";
			String sG2Id = "";
			String sData = "";
			
			EditLog editLog = new EditLog();
			
		    for (Object obj : joinPoint.getArgs()) {

		    	sData = obj.toString();
		    	
				if (obj instanceof HashMap) {
					HashMap map = (HashMap) obj;
					
					sTableName = map.get("TABLENAME").toString();
	                sG2Id = map.get("G2_ID").toString();
	                
	                editLog.setG2Id(sG2Id);
	                editLog.setG2TableName(sTableName);
	               
				}
	        }
				    	
	    	/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				userId = user.getUSER_ID();
				userName = user.getUSER_NAME();
	    	}

			sysLog.setSrvcNm(className);
			sysLog.setMethodNm(methodName);
			sysLog.setProcessSeCode(processSeCode);
			sysLog.setProcessTime(processTime);
			sysLog.setRqesterId(userId);
			sysLog.setRqesterIp(ip);

			sysLogService.logInsertSysLog(sysLog);
			
			
			if( sTableName != null && !sTableName.equals("") && sG2Id != null &&  !sG2Id.equals("") ){
				 HashMap logObject =  new HashMap();
		    	 logObject.put("TABLENAME", sTableName);
		    	 logObject.put("G2_ID", sG2Id);
		    	 
		    	 EgovMap preData = bookService.bookDetail(logObject);	    			    	 
		    	 editLog.setG2Data(EgovMapToString(preData));
			
			}else {
				editLog.setG2Data(sData);
			}
			
			editLog.setSvcName(className);
			editLog.setMethodName(methodName);
			editLog.setProcessTime(processTime);
			editLog.setEditType("UPDATE"); 	    	
			editLog.setUserId(userId);			    	
	    	editLog.setUserName(userName);	    	
	    	editLog.setUserIp(ip);
	    	
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

			SysLog sysLog = new SysLog();
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCode = "D";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String userId = "";
			String userName = "";
			String ip = "";			
			
			String sTableName = "";
			String sG2Id = "";
			String sData = "";
			
			EditLog editLog = new EditLog();
			for (Object obj : joinPoint.getArgs()) {

				sData = obj.toString();			
				
				if (obj instanceof HashMap) {
					HashMap map = (HashMap) obj;
					
					sTableName = map.get("TABLENAME").toString();
	                sG2Id = map.get("G2_ID").toString();
	                	                
	                editLog.setG2Id(sG2Id);
	                editLog.setG2TableName(sTableName);
	                
				}
		  }
			  
	    	/* Authenticated  */
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				userId = user.getUSER_ID();
				userName = user.getUSER_NAME();
	    	}

			sysLog.setSrvcNm(className);
			sysLog.setMethodNm(methodName);
			sysLog.setProcessSeCode(processSeCode);
			sysLog.setProcessTime(processTime);
			sysLog.setRqesterId(userId);
			sysLog.setRqesterIp(ip);

			sysLogService.logInsertSysLog(sysLog);
			
			editLog.setSvcName(className);
			editLog.setMethodName(methodName);
			editLog.setProcessTime(processTime);
			editLog.setEditType("DELETE"); 	    	
			editLog.setG2Data(sData);			
			editLog.setUserId(userId);			    	
	    	editLog.setUserName(userName);	    	
	    	editLog.setUserIp(ip);
	    	
	    	EditLogService.logInsertEditLog(editLog);

		}

	}

	/**
	 * 시스템 로그정보를 생성한다.
	 * sevice Class의 select로 시작되는 Method
	 *
	 * @param ProceedingJoinPoint
	 * @return Object
	 * @throws Exception
	
	public Object logSelect(ProceedingJoinPoint joinPoint) throws Throwable {

		StopWatch stopWatch = new StopWatch();

		try {
			stopWatch.start();

			Object retValue = joinPoint.proceed();
			return retValue;
		} catch (Throwable e) {
			throw e;
		} finally {
			stopWatch.stop();

			SysLog sysLog = new SysLog();
			String className = joinPoint.getTarget().getClass().getName();
			String methodName = joinPoint.getSignature().getName();
			String processSeCode = "R";
			String processTime = Long.toString(stopWatch.getTotalTimeMillis());
			String uniqId = "";
			String ip = "";
			
			  for (Object obj : joinPoint.getArgs()) {
		            if (obj instanceof HttpServletRequest ) {
		                HttpServletRequest request = (HttpServletRequest) obj;
		                ip = EgovClntInfo.getClntIP(request);
		                
		            }
		        }
			  
	    	// Authenticated  
	        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
	    	if(isAuthenticated.booleanValue()) {
				LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
				uniqId = user.getUSER_ID();
	    	}

			sysLog.setSrvcNm(className);
			sysLog.setMethodNm(methodName);
			sysLog.setProcessSeCode(processSeCode);
			sysLog.setProcessTime(processTime);
			sysLog.setRqesterId(uniqId);
			sysLog.setRqesterIp(ip);

			sysLogService.logInsertSysLog(sysLog);

		}

	}
	 */
	
	public static String ObjectToString(HashMap parameterObject){
		
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
