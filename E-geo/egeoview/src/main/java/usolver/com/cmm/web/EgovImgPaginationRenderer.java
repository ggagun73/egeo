/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package usolver.com.cmm.web;

import egovframework.rte.ptl.mvc.tags.ui.pagination.*;

/**  
 * @Class Name : ImagePaginationRenderer.java
 * @Description : ImagePaginationRenderer Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */
public class EgovImgPaginationRenderer extends AbstractPaginationRenderer {
	
    /**
    * PaginationRenderer
	* 
    * @see 개발프레임웍크 실행환경 개발팀
    */
	public EgovImgPaginationRenderer() {

		//String strWebDir = "/egovframework.guideprogram.basic/images/egovframework/cmmn/"; // localhost
		/*String strWebDir = "/###ARTIFACT_ID###/images/egovframework/cmmn/";

		firstPageLabel = "<a href=\"#\" onclick=\"{0}({1}); return false;\">" +
							"<image src='" + strWebDir + "btn_page_pre10.gif' border=0/></a>&#160;"; 
        previousPageLabel = "<a href=\"#\" onclick=\"{0}({1}); return false;\">" +
        						"<image src='" + strWebDir + "btn_page_pre1.gif' border=0/></a>&#160;";
        currentPageLabel = "<strong>{0}</strong>&#160;";
        otherPageLabel = "<a href=\"#\" onclick=\"{0}({1}); return false;\">{2}</a>&#160;";
        nextPageLabel = "<a href=\"#\" onclick=\"{0}({1}); return false;\">" +
        					"<image src='" + strWebDir + "btn_page_next10.gif' border=0/></a>&#160;";
        lastPageLabel = "<a href=\"#\" onclick=\"{0}({1}); return false;\">" +
        					"<image src='" + strWebDir + "btn_page_next1.gif' border=0/></a>&#160;";*/

		String strWebDir = "/images/usolver/admin/";

		firstPageLabel = "<li><a href=\"javascript:{0}({1});\" target=\"_self\"><img src=\"" + strWebDir + "btn_first.gif\" alt=\"<<\" title=\"첫 페이지로\"></a></li>";
        previousPageLabel = "<li><a href=\"javascript:{0}({1});\" target=\"_self\"><img src=\"" + strWebDir + "btn_previous.gif\" alt=\"<<\" title=\"이전 페이지로\"></a></li>";
        currentPageLabel = "<li class=\"pages_tx\"><a href=\"#none\" target=\"_self\">{0}</a></li>";
        otherPageLabel = "<li class=\"num\"><a href=\"javascript:{0}({1});\" target=\"_self\">{2}</a></li>";
        nextPageLabel = "<li><a href=\"javascript:{0}({1});\" target=\"_self\"><img src=\"" + strWebDir + "btn_next.gif\" alt=\"<<\" title=\"다음 페이지로\"></a></li>";
        lastPageLabel = "<li><a href=\"javascript:{0}({1});\" target=\"_self\"><img src=\"" + strWebDir + "btn_last.gif\" alt=\"<<\" title=\"마지막 페이지로\"></a></li>";
	}
}
