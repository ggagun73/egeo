package usolver.com.cmm.util;

import java.util.*;

public class StringUtil {
	// NULL 필터링
	public static String nvl(Object str) {
		if( str==null )
			return "";
		else
			return ((String)str).trim();
	}
	// Zero 필터링
	public static String zero(Object str) {
		if( str==null )
			return "0";
		else
			return str.toString();
	}
	// int로 변경
	public static int parseInt(Object str) {
		int result = 0;
		if( str!=null ) {
			try {
				result = Integer.parseInt((String)str);
			} catch(Exception e) {}
		}		
		
		return result;
	}
	// 배열을 List 로 변경
	public static List<String> parseList(String str) {
		List<String> list = Arrays.asList(str.split(","));
		
		return list;
	}
	
	//XML 파싱 못하는 것들
	public static String stripNonValidXMLCharacters(Object o){
		if (null == o) {
		    return "";
		}
		if (o.equals("")) {
			return "";
		}
		String text = o.toString();
		final int len = text.length();
		char current = 0;
		int codePoint = 0;
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < len; i++) {
		    current = text.charAt(i);
		    boolean surrogate = false;
		    if (Character.isHighSurrogate(current)
		            && i + 1 < len && Character.isLowSurrogate(text.charAt(i + 1))) {
		        surrogate = true;
		        codePoint = text.codePointAt(i++);
		    } else {
		        codePoint = current;
		    }
		    if ((codePoint == 0x9) || (codePoint == 0xA) || (codePoint == 0xD)
		            || ((codePoint >= 0x20) && (codePoint <= 0xD7FF))
		            || ((codePoint >= 0xE000) && (codePoint <= 0xFFFD))
		            || ((codePoint >= 0x10000) && (codePoint <= 0x10FFFF))) {
		        sb.append(current);
		        if (surrogate) {
		            sb.append(text.charAt(i));
		        }
		    }
		}
		return "<![CDATA[" + sb.toString() + "]]>";
	} 
}
