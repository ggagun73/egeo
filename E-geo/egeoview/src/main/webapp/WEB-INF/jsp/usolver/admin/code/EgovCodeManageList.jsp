<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%

/**
 * @Class Name : EgovDeptManageList.java
 * @Description : EgovDeptManageList jsp
 * @Modification Information
 * @
 * @  수정일                    수정자                수정내용
 * @ ---------     --------    ---------------------------
 * @ 2009.02.01    lee.m.j     최초 생성
 *
 *  @author lee.m.j
 *  @since 2009.03.21
 *  @version 1.0
 *  @see
 *  
 *  Copyright (C) 2009 by MOPAS  All right reserved.
 */
 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<title>코드조회</title>
<script type="text/javaScript" language="javascript" defer="defer">
<!--
$( document ).ready(function() {
	
	// 중복체크 확인용 플래그
	idCheckFlag = "N";
	
	// 변경되면 중복체크여부 N으로 변경
	$("#g2NewCode").keyup(function(){
		idCheckFlag = "N";
	});
	
	<c:if test="${codeManageVO.TABLENAME ne null}">
		$("#<c:out value="${codeManageVO.TABLENAME}"/>_<c:out value="${codeManageVO.g2DomainId}"/>").focus();
	</c:if>
});

//도메인 트리에서 + 버튼 선택시 
function fn_tree_plus(id){
	
	if( $("#"+id).is(":visible")  ){		
		$("#"+id).hide();
		$("#img_"+id).attr("src","/images/usolver/admin/tree_plus.gif");
	}else {		
	 	$("#"+id).show();
	 	$("#img_"+id).attr("src","/images/usolver/admin/tree_minus.gif");
	}
}

//도메인트리에서 해당 코드를 선택했을 경우.. 
function fn_tree_data(_sTableName, _sG2Id, _sG2Name){
	document.frm_manage.pageIndex.value = "1";
	document.frm_manage.TABLENAME.value = _sTableName;
	document.frm_manage.g2DomainId.value = _sG2Id;
	document.frm_manage.g2Name.value = _sG2Name;
	document.frm_manage.action = "<c:url value='/admin/code/selectCodeManageList.do'/>";
	document.frm_manage.submit();
}

// 도메인옆에 편집버튼 클릭했을 경우.. 
function fn_open_domainEdit(){		
	
	if( $("#g2DomainId").val() === "" ||  $("#g2DomainId").val() === null ){
		//선택된 도메인이 없어 신규 등록화면으로.. 
		$("#g2DomainName").val("");
		$("#action_flag").attr('value',"DOMAIN_INSERT");
		$("#btnDomainInsert").hide();
		$("#btnDomaindelete").hide();
		
	}else {
		//선택된 도메인이 있으니.. 수정 또는 신규등록할 수 있도록..		
		$("#btnDomainInsert").show();
		$("#action_flag").attr('value',"DOMAIN_UPDATE");
		$("select[id=DOMAINTABLE]").attr("disabled",true);
	}
	
	$("#domainEdit").show();
}

//도메인 편집 팝업창에서 신규버튼 클릭했을때.. 
function fn_new_domainEdit(){
	$("select[id=DOMAINTABLE]").attr("disabled",false);	
	$("#g2DomainName").val("");
	$("#btnDomainInsert").hide();
	$("#btnDomaindelete").hide();
	$("#action_flag").attr('value',"DOMAIN_INSERT");
}

//도메인 편집 팝업창에서 저장버튼 클릭했을때..
function fn_save_domainEdit(){
	
	if( $("#DOMAINTABLE").val() === "" ||  $("#DOMAINTABLE").val() === null ) { alert("테이블을 선택해주세요"); return false; }
	if( $("#g2DomainName").val() === "" ||  $("#g2DomainName").val() === null ) { alert("도메인명을 입력해 주세요"); return false; }

	document.frm_manage.action = "<c:url value='/admin/code/CodeManageProc.do'/>";
    document.frm_manage.submit();
}

//도메인 편집 팝업창에서 삭제버튼 클릭했을때.. 
function fn_delete_domainEdit(){
	
	if(confirm("도메인 삭제시 업무에 지장을 미칠 수도 있습니다. \n 또한 도메인 삭제시 하위 코드들도 같이 삭제됩니다. \n 삭제하시겠습니까?")) {
        document.frm_manage.action =  "<c:url value='/admin/code/deleteDomainManageProc.do'/>";
        document.frm_manage.submit();
    }	
}

//코드 등록/수정버튼 클릭시.. 
function fn_open_codeEdit(_sType){
	
	var checkField =  $('input:checkbox[name="checkField"]:checked').length;
	
	$("#action_flag").attr('value',_sType);
	
	if( $("#g2DomainId").val() === ""){
		alert("선택된 코드가 없습니다. 트리에서 코드를 선택하세요.");
		return false;
	}	
	
	if(_sType === 'CODE_UPDATE'){
		
		if( checkField > 1) {
			
			alert("수정시 다중선택하실 수 없습니다.");
			return false;
			
		}else if(fnManageChecked()){
			
			var editCode = $("#checkList").val().split(":");
			 
		    $("#CODETABLE").attr('value',editCode[0]);
			$("#g2NewCode").attr('value', editCode[1]);
			$("#g2Code").attr('value', editCode[1]);
			$("#g2Value").attr('value', editCode[2]);	
		}   	
				
	}else {
		
		var editCode = $("#checkList").val().split(":");
		 
	    $("#CODETABLE").attr('value',editCode[0]);
	    
		$("#g2NewCode").attr('value', '');
		$("#g2Value").attr('value', '');		
	}

	$("#codeEdit").show();
	
}

//코드팝업창에서 저장버튼 클릭했을 때.. 
function fn_save_codeEdit(){
	
	if( $("#CODETABLE").val() === "" ||  $("#CODETABLE").val() === null ) { $("#CODETABLE").attr('value',$("#TABLENAME").val().substring(0,4)+"CODEDDOMAINS"); }	
	if( $("#g2NewCode").val() === "" ||  $("#g2NewCode").val() === null ) { alert("코드ID를 입력해 주세요"); return false; }
	if( $("#g2Value").val() === "" ||  $("#g2Value").val() === null ) { alert("코드명을 입력해 주세요"); return false; }
	if( !($("#g2Code").val() === $("#g2NewCode").val()) && idCheckFlag=="N" ) { alert("중복체크를 해주세요."); return false; }
	
	document.frm_manage.action = "<c:url value='/admin/code/CodeManageProc.do'/>";
	document.frm_manage.submit();	
}

//코드 저장시 반드시 중복체크하자.. 
function fn_idCheked(){
	
	if( $("#CODETABLE").val() === "" ||  $("#CODETABLE").val() === null ) { $("#CODETABLE").attr('value',$("#TABLENAME").val().substring(0,4)+"CODEDDOMAINS"); }	
	
	var nCode = $("#g2NewCode").val();
	
	if( nCode == "" || nCode == null ) {
		alert("코드ID를 입력해주세요.");
		$("#g2NewCode").focus();
		return false;
	}
	//alert(nCode);
	
	$.ajax({
		url:'/admin/code/CodeManageDCheck.do'
		,data:{CODETABLE:$("#CODETABLE").val(), G2CODE: nCode, G2DOMAIN:$("#g2DomainId").val() }
		,dataType:'text'
		,type:'post'
		,success:function(msg){
			if( msg == "ERROR") {
				alert("중복된 코드입니다. 다시 입력해주세요.");
				$("#userId").focus();					
			} else {
				alert("사용 가능한 코드입니다.");
				idCheckFlag = "Y";
			}
		}
		,error:function(request,status,error){
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);		    
		}
	});
}

//코드에서 삭제버튼 클릭했을 때.. 
function fn_delete_codeEdit() {
	if(fnManageChecked() > 0) {
				
	    var editCode = $("#checkList").val().split(":");
	    $("#CODETABLE").attr('value',editCode[0]);
		$("#g2NewCode").attr('value', editCode[1]);
		$("#g2Code").attr('value', editCode[1]);
		$("#g2Value").attr('value', editCode[2]);		
			
        if(confirm("삭제하시겠습니까?")) {
            document.frm_manage.action =  "<c:url value='/admin/code/deleteCodeManageProc.do'/>";
            document.frm_manage.submit();
        }
    }
}
-->
</script>
</head>
<body>
<div id="W_900">
	<!-- favorite -->
    <div id="admin">
    	<!-- menu -->
    	 <%@ include file="/common/include/include_admin.jsp" %>
        <!--  menu end -->
        <!-- content start -->
		<form id="frm_manage"  name="frm_manage" method="post">
		<input type="hidden" id="action_flag" name="action_flag"  value="<c:out value="${action_flag}"/>"/>
		<input type="hidden" id="TABLENAME" name="TABLENAME"  value="<c:out value="${codeManageVO.TABLENAME}"/>"/>
		<input type="hidden" id="checkList" name="checkList" value="<c:out value="${checkList}"/>"/>
        <div class="admin_content">
        	<div class="TitBx">코드관리</div>                
            <div class="ContBx">                
                 <!-- Tree_left -->
                 <div class="admintree">
                    <div class="Tree_left bg" style="height:458px;width:180px;overflow-x:hidden;">     
                    	<!-- Map 에 값 넣기 -->
                    	<c:set var="codeTable" value="<%=new java.util.HashMap()%>" />
						<c:set target="${codeTable}" property="G2S_DOMAINS" value="공통코드" />
						<c:set target="${codeTable}" property="USV_DOMAINS" value="관리코드" />
                    	<c:forEach  var="tableList"  items="${codeTable}" >
                    	  <div class="TreePd">
      	                		<div class="Tree1">    
		                        <div class="Tree_Tx1"><a href="#"  id="treePlus"  name="treePlus"  onClick="fn_tree_plus('<c:out value="${tableList.key}"/>')">
		                        	<!--  선택한 항목이 있으면 펼쳐주자..  -->
		                        	<c:if test="${tableList.key eq codeManageVO.TABLENAME}">
		                        		<img id="img_<c:out value="${tableList.key}"/>" src="/images/usolver/admin/tree_minus.gif" /></a><span><c:out value="${tableList.value}"/></span></div>		                        	
		                        		<div id="<c:out value="${tableList.key}"/>"   style="display:block;">
		                        	</c:if>
		                        	<c:if test="${tableList.key ne codeManageVO.TABLENAME}">
		                        		<img id="img_<c:out value="${tableList.key}"/>" src="/images/usolver/admin/tree_plus.gif" /></a><span><c:out value="${tableList.value}"/></span></div>		                        	
		                        		<div id="<c:out value="${tableList.key}"/>"   style="display:none;">
		                        	</c:if>
			                        <c:forEach var="domainList"  items="${domainList}"  varStatus="status"> 
	        	                		<c:if test="${tableList.key eq domainList.tableName}">	
			                            	<%-- <c:if test="${not status.last }"><div class="Tree_Tx2"></c:if>
			                            	<c:if test="${status.last }"></c:if>			 --%>                            	
											<div class="Tree_Tx3"><a href="#"  id='<c:out value="${domainList.tableName}"/>_<c:out value="${domainList.g2Id}"/>'   onClick="fn_tree_data('<c:out value="${domainList.tableName}"/>','<c:out value="${domainList.g2Id}"/>','<c:out value="${domainList.g2Name}"/>')">
											<c:if test="${codeManageVO.g2DomainId eq domainList.g2Id}"><span class="TreeC"><c:out value="${domainList.g2Name}"/></span></c:if>
											<c:if test="${codeManageVO.g2DomainId ne domainList.g2Id}"><c:out value="${domainList.g2Name}"/></c:if></a></div>
			                           </c:if>                  
			                        </c:forEach>
		                        </div>
                        	</div>
                          </div>      
                      </c:forEach>
                    </div>                    
                  </div>
                 <!-- //Tree_left --> 
                <div class="FR" style="width:430px">
               <%--  <div class="schbx">
                	<div class="FR" >
                	 코드명 : 
                        <input type="text" style="height:19px;" id="searchKeyword" name="searchKeyword" value="${codeManage.searchKeyword}"  class="input" />
                        <a href="#" class="Btn_sch" onClick="javascript:doSearch()">검색</a>
                    </div>
                </div> --%>
                <div class="stit2">
                	<c:if test="${codeManageVO.g2Name ne null and !codeManageVO.g2Name ne ''}"><c:out value="${codeManageVO.g2Name}"/>(<c:out value="${codeManageVO.g2DomainId}"/>)</c:if>
                	<c:if test="${codeManageVO.g2Name eq null or codeManageVO.g2Name eq ''}">도메인명</c:if>
                <div class="FR" style="height:30px">
	                 <div class="Btn"><a href="#" class="Btn_gray2"  onclick="fn_open_domainEdit(); return false;">편집</a></div>
	             </div>
                </div>
                <table class="tblist" summary="부서코드관리">
				    <caption>코드관리</caption>
				    <colgroup>
					    <col width="15%" />
				        <col width="15%" />
				        <col width="20%" />
				        <col width="50%" />
				    </colgroup>
                    <thead>
                        <tr> 
				  	        <th>번호</th>
				  	        <th><input name="checkAll" type="checkbox" title="Check All" onclick="javascript:fnCheckAll();"/></th>
				  	        <th>코드ID</th>
				  	        <th>코드명</th>
				        </tr>
                    </thead>
				    <tbody>
				    	<c:forEach var="resultList" items="${resultList}" varStatus="status">
					    <tr>
                            <td><c:out value="${(codeManageVO.pageIndex-1) * codeManageVO.pageSize + status.count}"/></td>
                            <td><input name="checkField"  id="checkField"  title="Check <c:out value="${status.count}"/>" type="checkbox"/>
                        		<input name="checkId"  id="checkId"  type="hidden" value="<c:out value='${resultList.codeTable}'/>:<c:out value='${resultList.g2Code}'/>:<c:out value="${resultList.g2Value}"/>"/></td>
                            <td><c:out value="${resultList.g2Code}"/></td>
                            <td class="al"><c:out value="${resultList.g2Value}"/></td>
                        </tr>
                        </c:forEach>
                         <c:if test="${paginationInfo.totalRecordCount eq 0}">
                         <tr>
                         	<td colspan="4">조회된 데이터가 없습니다. </td>
                         </tr>
                         </c:if>
				    </tbody>
			    </table>
                <div class="PagingBx">
            	    <div class="Paging_tx">총 건수 : <span><c:out value="${paginationInfo.totalRecordCount}"/></span>건</div> 
                    <c:if test="${paginationInfo.totalRecordCount ne 0}">
						<ul class="pages">
							<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fnLinkPage" />
						</ul>
					</c:if> 
					 <input type="hidden" id="pageIndex" name="pageIndex"  value="<c:out value="${paginationInfo.currentPageNo}"/>"/>                  
                </div>
                <div class="TreeBtBx">
                	<div class="Btn"><a href="#" class="Btn_blue" onClick="fn_open_codeEdit('CODE_INSERT')">등록</a></div>
                	<div class="Btn"><a href="#" class="Btn_blue" onClick="fn_open_codeEdit('CODE_UPDATE')">수정</a></div>
                    <div class="Btn"><a href="#" class="Btn_blue" onClick="fn_delete_codeEdit('CODE_DELETE')">삭제</a></div>
                </div>
            </div>
        </div>
        <!-- content end -->
    </div>
    <!-- // favorite -->
	<div id="domainEdit"  class="layer_pop" style="width:400px;top:150px;left:150px;display:none">
		<div class="stit">도메인편집</div>
		<table class="tbview" summary="코드편집정보">
			<caption>도메인편집</caption>
			<colgroup>
				<col width="30%" /><col width="70%" />
			</colgroup>
		 	<tbody>
			  <tr>
		   		<th>테이블</th>
		   		<td><select name="DOMAINTABLE"  id="DOMAINTABLE"  class="select" >
						<c:forEach var="codeTable" items="${codeTable}">
						<option value="${codeTable.key}" <c:if test = "${codeTable.key == codeManageVO.TABLENAME}"> selected="selected" </c:if> >${codeTable.value}</option>
						</c:forEach>
					 </select>
			  </tr>
			  <tr>
		  		<th>도메인명</th>
		   		<td><input  type="text"  name="g2DomainName"  id="g2DomainName" class="input"  title="도메인명"  value='<c:out  value="${codeManageVO.g2Name}"/>'/></td>
			  </tr>
			 </tbody>
		</table>
		<div class="TreeBtBx">
			<div class="Btn"><a href="#" class="Btn_blue"  id="btnDomainInsert"  onClick="fn_new_domainEdit()">신규</a></div>
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_save_domainEdit()">저장</a></div>
			<div class="Btn"><a href="#" class="Btn_blue"  id="btnDomaindelete"  onClick="fn_delete_domainEdit()">삭제</a></div>
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_layer_close('domainEdit')">닫기</a></div>
		</div>
	</div>
	<div id="codeEdit"  class="layer_pop" style="width:400px;top:150px;left:150px;display:none">
		<div class="stit">코드편집</div>
		<input type="hidden"  name="CODETABLE"  id="CODETABLE"  class="input"  title="코드테이블"  value='<c:out  value="${resultList[0].codeTable}"/>'/>
		<input type="hidden"  name="g2Code"  	   id="g2Code"  class="input"  value=""/>
		<table class="tbview" summary="코드편집정보">
			<caption>코드편집</caption>
			<colgroup>
				<col width="30%" /><col width="70%" />
			</colgroup>
		 	<tbody>
			  <tr>
		   		<th>상위코드명 </th>
		   		<td><input type="text"  name="g2DomainId"  id="g2DomainId"  class="input"  style="width:60px" title="상위코드ID"  readonly value='<c:out  value="${codeManageVO.g2DomainId}"/>'/>
		   			<input type="text"  name="g2Name"  id="g2Name"  class="input"  title="상위코드명"  value='<c:out  value="${codeManageVO.g2Name}"/>'/></td>
			  </tr>
			  <tr>
		   		<th>코드ID</th>
		   		<td><input type="text"  name="g2NewCode"  id="g2NewCode"  class="input"  title="코드ID"  value='<c:out  value="${codeManageVO.g2Code}"/>'/>&nbsp;&nbsp;
		   		      <a href="#" id="idCheck"  onClick="fn_idCheked()"><img src="/images/usolver/com/cmm/login/check.gif" /></a>
		   		</td>
			  </tr>
			  <tr>
		  		<th>코드명</th>
		   		<td><input type="text"  name="g2Value"  id="g2Value""  class="input"  title="코드명" value='<c:out  value="${codeManageVO.g2Value}"/>'/></td>
			  </tr>
			 </tbody>
		</table>
		<div class="TreeBtBx">
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_save_codeEdit()">저장</a></div>
			<!-- <div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_codeEdit_delete()">삭제</a></div> -->
			<div class="Btn"><a href="#" class="Btn_blue"  onClick="fn_layer_close('codeEdit')">닫기</a></div>
		</div>
	</div>
</form>
</div> 
</body>
</html>
