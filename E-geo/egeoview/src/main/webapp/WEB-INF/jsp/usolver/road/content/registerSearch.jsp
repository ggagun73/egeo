<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
  /**
  * @Class Name : 
  * @Description :  공사번호 검색 외  번호 검색 상세화면
  * @Modification Information
  * 
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 지노
  * since 2014.07.10
  *  
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<script src="<c:url value='/js/usolver/book/init.js'/>"></script><!-- List Form init.js 랑 구분해야겠당..  -->
	<script type="text/javascript">
		
		var sTableName ='<c:out value="${TABLENAME}"/>';	
		var sKeyColumn ='<c:out value="${KEY_COLUMN}"/>';	
		
		// 페이지 로딩 초기 설정
		$( document ).ready(function() {
			
			// 2) input, select 항목 init
			BOOK.fn_init_formObject("frm");	
			BOOK.fn_edit_mode('frm');
			
			data = {tableName : sTableName};
			$.ajax({
				type: 'get',
				dataType: 'json',
				data: data,
				url: '/book/AddInfoList.do',
				success: function(data) {
					
					var sColNames = [],
					sColModel = [],
					sColMap = [],
					sColModels = [];
					var sUrl;
					
					var newWith, count;
					count = data["addList"].length;
					if(count<5) count=10;
					
					newWith = $(".Table_list .ui-widget-content").width()/count;
					//공사일 경우 공사번호, 공사명, 도급업체, 계약일자, 착공일자, 준공일자만 보여주자~ 
					
					var j = 0; 
					//시설물일 경우에는 구냥다~~~ 
					for(var i=0; i<data["addList"].length; i++){
						var sList, sListAlias;
	
						sList = data["addList"][i].g2Name;
						sListAlias = data["addList"][i].g2Alias;
					
						var sStrList, sXmlMap;
						
						if( sTableName.indexOf("CONS_MA") != -1 ){
							
							if( sList == "cntNum" || sList == "cntNam" || sList == "gcnNam" || sList == "cttYmd" || sList == "begYmd" || sList == "rfnYmd" ){
								sColNames[j] = sListAlias;
								sColModel[j] = sList;
								
								sList = sList.substring(0,3).toUpperCase()+"_"+sList.substring(3).toUpperCase();  //검색을 위해 변경
								var sWidth = "100px";
								if( sList == "CNT_NAM" )  sWidth = "250px";								
								
								sColModels[j] = {name:sList,index:sList,xmlmap:sColModel[j], width:sWidth, align:'center'};
								j++;
							}
						}else {
							sColNames[i] = sListAlias;
							if(sList.substring(3) == "Cde" || sList.substring(3) == "Mop" || sList.substring(3) == "Mof" || sList.substring(3) == "Chk") sColModel[i] = sList+"Nm";
							else sColModel[i] = sList;
							
							sList = sList.substring(0,3).toUpperCase()+"_"+sList.substring(3).toUpperCase();
							
							sColModels[i] = {name:sList,index:sList,xmlmap:sColModel[i], width:'100px', align:'center'};	
						}
					}
					
					sColNames.push("g2Id", "ftrCde");
					sColModels.push({name:'FID',index:'FID',xmlmap:'fid', hidden: true},{name:'FTR_CDE',index:'FTR_CDE',xmlmap:'ftrCde', hidden: true});
					
					jQuery("#gridSearchIdn").GridUnload();
					
					$('.activeWindow').find("#gridSearchIdn").jqGrid({
						url:  "/register/registerListXml.do?TABLENAME="+sTableName		
						,datatype: "local"
						,colNames:sColNames
					   	,colModel:sColModels
						,sortname: 'FID'
					    ,sortorder: "DESC"
					    ,rowNum: 100
						,rowList:  [100,500,1000,100000000]
						,viewrecords: true
						,xmlReader: { root : "rows",row: "Item",repeatitems: false }
						,rownumbers: false
					    ,loadtext: "검색 중입니다."
						,emptyrecords: "<div class='Paging_tx'>검색된 데이터가 없습니다.</div>"
						,recordtext: "<div class='Paging_tx'>총 <span> {2}</span>건 데이터 ({0}-{1})</div>"
						,ondblClickRow: function(rowId) {	// 더블클릭 처리				
							fn_set_relateNum();
						}
					   	,loadComplete: function() { $("option[value=100000000]").text("ALL"); }
						,height: 400
						,width: 560
						,shrinkToFit:false
						,pager: jQuery('#gridSearchIdnPager')
					}).navGrid('#gridSearchIdnPager',{edit:false,add:false,del:false,search:false,refresh:false});
					
					$("#gridSearchIdnPager_left").width(240);
					
					fn_search_relateNum();
				},
				error: function(xhr, status, error) {
					alert(status);
					alert(error);
				}
			});
			
		});
		
		// 검색 처리
		function fn_search_relateNum() {						
			
			//alert( $("#gridSearchIdn").jqGrid('getGridParam','url') );	
			$("#gridSearchIdn").jqGrid("setGridParam",{
				datatype: "xml"
				,page: 1
				,postData: BOOK.fn_get_serialize("frm")
				,mtype: "POST"
			}).trigger("reloadGrid");			
		}

		// 선택된 공사 정보 표시
		function fn_set_relateNum() {
			
			var sOpenerId = $(".activeWindow").find("#openerId").val();		
			var sRowId = $("#gridSearchIdn").getGridParam( "selrow" );
			
			if( sRowId != null ) {
				var sRowData =$("#gridSearchIdn").getRowData(sRowId); 				
				
				var sKeyNum = sRowData[sKeyColumn];		
				//alert(sOpenerId+"||"+sKeyNum+"||"+sKeyColumn);					
				$("#win_"+sOpenerId).find("#"+sKeyColumn).val( sKeyNum );
				
				BOOK.fn_close_window(sOpenerId);
			}
			else
				alert('<spring:message code="info.nodata.msg" />');
		}
	</script>
</head>
<body>
<form id="frm" name="frm" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<input type="hidden" id="callBackFunction" name="callBackFunction" value=""/>
<input type="hidden" id="openerId" name="openerId" value="<c:out value="${openerId}"/>"/>
<!-- 필수 파라메터(END) -->
<!--   <div id="container2"> -->
   <div class="TxtBg2">
       	<div class="SearchBx">
           	<div class="STxt">검색</div>
               <div class="SBgBx">
               	<dl>
                   	<dt><input type="text"  name="@SEARCHNAM" id="@SEARCHNAM" value="<c:out value="${result.SEARCHNAM}"/>"  class="searchCntNum"  onkeydown="javascript: if (event.keyCode == 13){fn_search_relateNum();  return false; };"/></dt>
                       <dd><a href="#" onClick="fn_search_relateNum()"><img src="<c:url value='/images/usolver/com/book/p_btn_search3_on.png'/>"   class="onoffimg" alt="검색" /></a></dd>
                </dl>
           </div>
        </div>
        <div class="PSection3">              
          <div class="TableBx2" >    
	          <div class="Table_list2">
	            	<table id='gridSearchIdn'></table>
	            	<div id="gridSearchIdnPager"></div>
	            </div>
			</div>
			<div class="btnTline"><!--버튼구분자--></div>		
			<div class="Btn_R">
	            <div class="Btn"><a href="#" class="Btn_02" onclick="fn_set_relateNum();">확인</a></div>
	            <div class="Btn"><a href="#" class="Btn_02" onclick="BOOK.fn_close_window('<c:out value="${openerId}"/>');">취소</a></div>
	        </div>
		</div>
	</div>
</form>
</body>
</html>