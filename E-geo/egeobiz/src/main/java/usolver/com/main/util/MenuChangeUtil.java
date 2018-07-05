package usolver.com.main.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import egovframework.let.utl.fcc.service.EgovStringUtil;
import usolver.com.cmm.util.StringUtil;

public class MenuChangeUtil {
	
	 public static JSONObject selectMenuList(List list_menu) throws Exception{
	    	
		    JSONObject return_menu = new JSONObject();
		 	JSONArray json_menu = new JSONArray();
		 	JSONObject json_object = new JSONObject();
		   
		   // 메뉴생성을 위해 json_menu를 메뉴 클릭을 위해 json_object를 생성하기 
		   for( int i=0; i < list_menu.size(); i++){
			  
			  JSONObject json_obj1 = new JSONObject();
			  JSONObject json_obj2 = new JSONObject();
			  Map	 aMenu = (Map) list_menu.get(i);
			  
			  json_obj1.put("menuNo", aMenu.get("menuNo"));
			  json_obj1.put("upperMenuNo", aMenu.get("upperMenuNo"));
			  json_obj1.put("menuNm", aMenu.get("menuNm"));
			  json_obj1.put("imageNm", aMenu.get("relateImageNm"));
			  json_obj1.put("imagePath", aMenu.get("relateImagePath"));
			  json_obj1.put("menuId", aMenu.get("menuId"));
			  
			  //System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>> json_obj="+json_obj1);
			  
			  if( aMenu.get("menuType") != null && !aMenu.get("menuType").equals("INFO") ){
				  json_menu.add(json_obj1);
			  }
			  
			  json_obj2.put("menuId", aMenu.get("menuId"));
			  json_obj2.put("title", aMenu.get("menuNm"));
			  json_obj2.put("url", aMenu.get("url"));
			  json_obj2.put("width", aMenu.get("width"));
			  json_obj2.put("height", aMenu.get("height"));
			  json_obj2.put("instHeight", aMenu.get("insertHeight"));
			  json_obj2.put("call", aMenu.get("call"));
			  json_obj2.put("keyColumn", aMenu.get("keyColumn"));			  
			  json_obj2.put("functionList", aMenu.get("functionList"));			  
			  
			  // menuInfo에 넣기 위해 ID만 있는 것을 추출.. 
			  if( aMenu.get("menuId") != null ){
				  json_object.put(aMenu.get("menuId"), json_obj2);
			  }
		   }
		   
		   return_menu.put("menuList", json_menu);
		   return_menu.put("menuObject", json_object);
   	      	
   	  return return_menu;
   	
   }
  
}
