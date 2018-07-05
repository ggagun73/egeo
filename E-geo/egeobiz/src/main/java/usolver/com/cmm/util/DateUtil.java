package usolver.com.cmm.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateUtil {

	public static String getCurrentTime(){
		
		SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ( "yyyy.MM.dd HH:mm:ss", Locale.KOREA );
		Date date = new Date ( );
		String currentTime = mSimpleDateFormat.format ( date );

		return currentTime;
	}
	
}
