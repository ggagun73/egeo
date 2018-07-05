<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%
  /**
  * @Class Name : 
  * @Description :  하수도관리 대장 목록
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
	<script type="text/javascript">
		
		var sAuthor = false;
 		<security:authorize ifAllGranted="ROLE_SEWER_BOOK_VIEW">
			sAuthor = true;
		</security:authorize> 
	
		$( document ).ready(function() {			

			BOOK.fn_create_datepickerLinked("frm_mst", "@IST_YMD_S", "@IST_YMD_E" , 10);
			
			// input 항목 초기화
			BOOK.fn_init_formObject("frm_mst");
			
			//사용자 검색항목 조회항목 생성..
			MAKELIST.fn_create_userList(g_userId, sAuthor, "${param.CALL_TYPE}");		
			
			//메뉴생성 $.parseJSON(json_MenuInfo); 		
			if( json_MenuInfo  != ""){
				var oGridInfo =$.parseJSON(json_MenuInfo); 		
				$.each(oGridInfo, function(key, value){			    
					if( key == '<c:out value="${TABLENAME}"/>'){
						//alert('key:' + key + ' / ' + 'value:' + value);
						var functionList = value.functionList;
	
						if( functionList != null ){
							var funButton = functionList.split(',');
							for ( var i in funButton ) {
								$("#"+funButton[i]).css("display", "block");   //.css("display", "none");   block
						    }
						}
					}
				});
			}else {
				$(".Btn").css("display", "block");
			}
			
			// 지도에서 넘어온 경우.. 
			if('<c:out value="${param.CALL_TYPE}"/>' == 'registerOnMap') {
				var oIframe;
				try {
					oIframe = ifrMap.contentWindow || ifrMap.contentDocument || ifrMap;
				} catch (e) {
					oIframe = null;
				}
				if(oIframe.REGISTER.fn_get_searchLayerMap().callFunctionType == 'searchSpace') {
					
					$("#btnReScan").on('click',function() {
						oIframe.REGISTER.fn_rescan_searchData('<c:out value="${TABLENAME}"/>');
					});
					
					$("#btnReScan").css("display", "block");
				}
			}
		});
	</script>
</head>
<body scroll="no">
<form id="frm_mst"  name="frm_mst"  method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="action_flag" name="action_flag" value="<c:out value="${action_flag}"/>"/>
<!-- 필수 파라메터(END) -->
<input type="hidden" id="FID" name="FID" value="<c:out value="${param.FID}"/>"/><!-- FID 검색용-->
<input type="hidden" id="LAYER_MAP" name="LAYER_MAP" value="<c:out value="${param.LAYER_MAP}"/>"/><!-- 복수개 레이어 및 FID 검색용-->
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${param.nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE"  value="<c:out value="${param.CALL_TYPE}"/>"/><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<input type="hidden" id="@@SYS_CHK" name="SYS_CHK"  value=""/> <!--신규추출(SYS_CHK=0) 용-->
<input type="hidden" id="TABLENAME" name="TABLENAME"  value="<c:out value="${TABLENAME}"/>"/> <!--신규추출(SYS_CHK=0) 용-->
<div id="wrap_b">         
	<!-- container start -->
	<div id="container_b">
    <div id="left">
    	<div class="leftBtArea">
            <a href="#" id="leftCloseBt"  onclick="BOOK.fn_close_leftSearch()"><img src="<c:url value='/images/usolver/com/book/left/btn_close2.gif'/>"  class="onoffimg"  alt="닫기" /></a>
            <a href="#" class="hidden" id="leftOpenBt" onclick="BOOK.fn_open_leftSearch()"><img src="<c:url value='/images/usolver/com/book/left/btn_open2.gif'/>"  class="onoffimg" alt="열기" /></a>
        </div>
        <!-- leftCont -->        
            <div class="leftCont">
                <!-- LeftBox -->
                <div class="LeftBx">
                	<div class="Left_TitBx">
                    	<dl>
                        	<dd><img src="/images/usolver/com/book/left/tit_ico1.png" alt="검색조건아이콘"/></dd>
                        	<dt>검색조건</dt>
                        </dl>
                    </div>
                    
                    <div class="SBx1">
                        <div class="standard">
                    	<dl>
                        	<dt>관리번호</dt>
                            <dd><input type="text" name="FTR_IDN" id="@FTR_IDN" value="<c:out value="${param.FTR_IDN}"/>" class="input" /></dd>
                        </dl>
                         <dl>
                        	<dt>관리기관</dt>
                            <dd>
	                            <select class="select" style="width:88%;" name="MNG_CDE" id="@MNG_CDE" >
									<option value=""></option>
									<c:forEach var="selectData" items="${mng_cde_list}">
									<option value="${selectData.CODE}"  <c:if test = "${selectData.CODE == param.MNG_CDE}"> selected="selected" </c:if>  >${selectData.VAL}</option>
									</c:forEach>
								</select>
                            </dd>
                        </dl>
                         <dl>
                        	<dt>행정읍/면/동</dt>
                            <dd>
	                            <select class="select" style="width:88%;" name="HJD_CDE" id="@HJD_CDE" >
									<option value=""></option>
									<c:forEach var="selectData" items="${hjd_cde_list}">
									<option value="${selectData.CODE}"  <c:if test = "${selectData.CODE == param.HJD_CDE}"> selected="selected" </c:if>  >${selectData.VAL}</option>
									</c:forEach>
								</select>
                            </dd>
                        </dl>
                        <dl>
                        	<dt>설치일자</dt>
                            <dd><input type="text"  style="width:70%" name="IST_YMD_S"  id="@IST_YMD_S" value="<c:out value='${param.IST_YMD_S}'/>"  class="input DT_DATE"/> ~ </dd>
                        </dl>
                        <dl>
                        	<dt> </dt>
                            <dd><input type="text"  style="width:70%" name="IST_YMD_E" id="@IST_YMD_E" value="<c:out value='${param.IST_YMD_E}'/>"  class="input DT_DATE"/></dd>
                        </dl>                        
                 	</div>
             		<div class="Left_botBt">
                    	<a href="#" onclick="BOOK.fn_reset_form();"><img src="<c:url value='/images/usolver/com/book/left/btn_reset_off.png'/>"  class="onoffimg" alt="초기화" /></a>
                    	<a href="#" onclick="BOOK.fn_search_mainGrid(sAuthor);"><img src="<c:url value='/images/usolver/com/book/left/btn_search_off.png'/>"  class="onoffimg" alt="검색" /></a>
                    </div>
               	</div>
                <!-- // LeftBox -->
		    </div>
            <!-- // leftCont -->        
        </div>
          <!-- //left -->
          </div>
        <!-- content -->
        <div id="content_b">  
        	<div class="content_pd">
            <div class="content_bx">
            	<div class="table_top1">
                	<select name="cbEditLayerList" class="cbEditLayerList" id="cbEditLayerList" onchange="REGISTER.fn_change_selectRegister(this.value)" style="height: 30px;margin-top: 3px"></select>
                	<div class="TopBx" id="TopFunction">
                		<security:authorize ifAllGranted ="ROLE_SEWER_BOOK_VIEW" >
                		<div class="Btn"><a href="#" class="Btn_no"></a></div>
                		<div class="Btn"  id="btnReScan" style="display :none;"><a href="#" class="Btn_01">결과내재검색</a></div>
                		</security:authorize>
                		<security:authorize ifAllGranted ="ROLE_SEWER_BOOK_PRINT" >                		
                    	<div class="Btn"  id="btnExcel"  style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_save_excel('<c:out value="${TABLENAME}"/>');">엑셀출력</a></div>
                    	</security:authorize>
                    	<security:authorize ifAllGranted ="ROLE_SEWER_MAP_VIEW" >
                    	<div class="Btn" id="btnMoveTo" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_check_moveToFeature('<c:out value="${TABLENAME}"/>');">위치확인</a></div>
                    	</security:authorize>
                    	<security:authorize ifAllGranted ="ROLE_SEWER_MAP_EDIT" >
            			<div class="Btn" id="btnEditShpe" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_check_editShpae('<c:out value="${TABLENAME}"/>');">도형편집</a></div>
            			</security:authorize>
            			<security:authorize ifAllGranted ="ROLE_SEWER_BOOK_VIEW" >
                    	<div class="Btn" id="btnRegisterView" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_view_register('','<c:out value="${TABLENAME}"/>','VIEW');">대장조회</a></div>                    	
                    	<div class="Btn" id="btnNewSearch" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_search_newFeature('<c:out value="${TABLENAME}"/>');">신규추출</a></div>
                    	</security:authorize>
                    	<security:authorize ifAllGranted ="ROLE_SEWER_BOOK_EDIT" >
                    	<div class="Btn" id="btnRegisterInsert" style="display:none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_view_register('','<c:out value="${TABLENAME}"/>','INSERT');">신규등록</a></div>
                    	<div class="Btn" id="btnRegisterDelete" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_delete_register('<c:out value="${TABLENAME}"/>','gridArea','frm_mst');">대장삭제</a></div>
                 		<div class="Btn" id="btnRegisterBatch" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_update_pluralRegister('<c:out value="${TABLENAME}"/>');">대장일괄</a></div>
                    	<div class="Btn" id="btnMaintenance" style="display :none;"><a href="#" class="Btn_01" onclick="REGISTER.fn_insert_maintenance('SWT_SUTL_HT');">보수일괄</a></div>
                    	</security:authorize> 
                    	<security:authorize ifAllGranted ="ROLE_SEWER_BOOK_VIEW" >
                    	<div id="searchFilterBtn" class="FilterBx" onclick="MAKELIST.fn_open_userList();" style="display :block;"><!-- 검색항목 설정 -->
                        <div class="Filter"></div>
                        </div>           
                        </security:authorize>                                  
                    </div>
                </div>	
	            <div class="TableBx">    
		            <div class="Table_list">
		            	<table id="gridArea"></table>
		            	<div id="gridPager"></div>
		            </div>
				</div>
            </div>
            </div>              
        </div>
        <!-- //content -->
	</div>
	<!-- container end -->
</div>
<!-- wrap end -->
</form>
<!-- 사용자 검색항목 설정 -->
<div id="searchFilterPane" class="facilityBx" style="display:none;">
	<div class="Top_arrow" style="padding-left:350px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
	<div id="B_600">
		<!-- header -->
		<div id="P2_Header">
			<div class="Ico"><img src="/images/usolver/com/map/top/top2_ico_1.png" alt="속성조회아이콘" /></div>
			<div class="Title">사용자 환경 설정</div>
			<div class="Close"><a href="#"><img id="popup_searchFilter_close" onclick="MAKELIST.fn_close_userList();" src="<c:url value='/images/usolver/com/map/top/top_btn_close.png'/>"  alt="닫기" /></a></div>
		</div>
		<!-- // header -->
		<div class="fcont" id="fcont">    
			<div class="FL" style="width:180px">
				<h2><img src="/images/usolver/com/map/step01.png" alt="단계01"/> 설정 가능 항목</h2>
				<div class="treebx">
					<ul id="make_lst" class="make_lst">
                    </ul>
    			</div>
			</div>
			<div>
			<a href="#" id="addFindBtn" onclick="MAKELIST.fn_add_userList(this.id)"><img src="<c:url value='/images/usolver/com/book/left/btn_open2.gif'/>" style="width:15px; margin-left:-7px; margin-top:86px; position:absolute;" alt="추가" /></a>
			<a href="#" id="addListBtn" onclick="MAKELIST.fn_add_userList(this.id)"><img src="<c:url value='/images/usolver/com/book/left/btn_open2.gif'/>" style="width:15px; margin-left:-7px; margin-top:240px; position:absolute;" alt="추가" /></a>
			</div>
			<div class="FL" style="margin-left:10px; width:160px">
				<div>
    				<h2><img src="/images/usolver/com/map/step02.png" alt="단계02"/> 설정된 항목</h2>
    				<div>
        				<div class="fsch">
            				<dl class="mr5">
                				<dt>검색항목</dt>
               	 				<dd><div style="width:160px; height:100px"><ul class="make_lst" id="addFind_column"></ul></div></dd>
            				</dl>   
        				</div>
        				<div class="fsch"> 
            				<dl class="mr6">
                				<dt>조회항목</dt>
                				<dd><div style="width:160px; height:160px"><ul class="make_lst" id="addList_column"></ul></div></dd>
            				</dl>
        				</div>
    				</div>
				</div>
			</div>	
			<div class="Btn_R" id="fcont2_btn" style="margin-top:10px;">
				<div class="Btn"><a id="btn_reset_searchFilter" href="#" class="Btn_02" onclick="MAKELIST.fn_clear_userList();">초기화</a></div>
				<div class="Btn"><a id="btn_save_searchFilter"  href="#" class="Btn_02" onclick="MAKELIST.fn_save_userList(g_userId, sAuthor);">저장</a></div>
				<div class="Btn"><a id="btn_reset_searchFilter" href="#" class="Btn_02" onclick="MAKELIST.fn_delete_userList(g_userId);">기본설정</a></div>
				<div class="Btn"><a id="btn_close_searchFilter" href="#" class="Btn_02" onclick="MAKELIST.fn_close_userList();">닫기</a></div> 				
			</div>
		</div>
	</div>
</div>
<%@ include file="/common/include/common.jsp" %>
</body>
</html>
