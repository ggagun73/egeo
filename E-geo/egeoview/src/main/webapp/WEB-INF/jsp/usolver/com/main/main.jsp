<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<title>부천시 도시기반시설물 관리시스템</title>
<script src="<c:url value='/extLib/ginno/js/html5shiv.js'/>"></script>
<script src="<c:url value='/extLib/jquery/jquery-1.11.1.js'/>"></script>
<script src="<c:url value='/extLib/jquery/jquery-ui-1.10.4.custom.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/functions.js'/>"></script>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/reset.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/style.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/authority.css'/>"/>
<script src="<c:url value='/extLib/jquery/jquey.dynatree/jquery.dynatree.min.js'/>"></script>
<link type="text/css" rel="stylesheet" href="<c:url value='/extLib/jquery/jquey.dynatree/skin/ui.dynatree.css'/>"/>
<script src="<c:url value='/extLib/ginno/js/common.util.js'/>"></script>
<script src="<c:url value='/extLib/ginno/js/init.util.js'/>"></script>
<script type="text/javascript"> 
$( document ).ready(function() {
	<c:if test="${sessionScope.system_user.SYS_ROAD eq 0}">
		<c:if test="${sessionScope.system_user.SYS_WATER eq 0}">
			<c:if test="${sessionScope.system_user.SYS_SEWER eq 0}">
				alert("처음 방문하신 분은 우측 상단의 권한요청 버튼을 이용하여\n권한을 신청하여 주시기 바랍니다.");
			</c:if>
		</c:if>
	</c:if>
});

function fnGoSystem(sysType, role, tagNam, oid, tagAls) {
	var sysName = "";
	switch (sysType) {
		case "road":
			sysName = "도로";
			break;
		case "water":
			sysName = "상수도";
			break;
		case "sewer":
			sysName = "하수도";
			break;
	}
	//0 : 권한없음, 1:신청중, 2: 권한있음, 3: 권한철회
	switch (role) {
		case 0:
			alert(sysName + "관리시스템에 대한 권한이 없습니다.");
			break;
		case 1:
			alert(sysName + "관리시스템에 대한 권한이 신청중입니다.");
			break;
		case 2:
			var w = screen.availWidth;
			var h = screen.availHeight;
			var url = "<c:url value='/main/goSystem.do'/>?SYS_TYPE=" + sysType;
			//저장이력정보로 대장 바로 띄우기
			if (tagNam != undefined && tagNam != "" && oid != undefined && oid != "") {
				url += "&TAG_NAM=" + tagNam + "&OID=" + oid + "&TAG_ALS=" + tagAls;
			}
			var newWin = window.open(url, sysType, "width=" + w + ",height=" + h + ",resizable=yes,status=yes");
			newWin.focus();
			/* $(newWin).unload = function() {
				alert('d');
			}; */
			//location.href = "<c:url value='/main/goSystem.do'/>?SYS_TYPE=" + sysType;
			break;
		default:
			break;
	}
}

function fnGoManage() {
	location.href = "/board/list.do";
}
function fnWndHide() {
	$("#requestUserSystemView").hide();
	$("#requestUserSystemEdit").hide();
	$("#requestUserComponent").hide();
	$("#requestType").hide();
}
function fnRequestType() {
	fnWndHide();
	$("#requestType").center();
	$("#requestType").show();
}
function fnRequestUserSystemView() {
	fnWndHide();
	$("#requestUserSystemView").center();
	$("#requestUserSystemView").show();
}
function fnRequestUserSystemViewOK(Edit) {
	var requestSystem = [];
	if (Edit) {
		$("#requestUserSystemEdit input:checkbox[name='chkSystems']").each(function(){
			if ($(this).is(":checked") && !$(this).attr("disabled")) requestSystem.push($(this).attr("id"));
		});	
	} else {
		$("#requestUserSystemView input:checkbox[name='chkSystems']").each(function(){
			if ($(this).is(":checked") && !$(this).attr("disabled")) requestSystem.push($(this).attr("id"));
		});	
	}
	if (requestSystem.length == 0) {
		alert("1개 이상의 권한 신청을 체크하여 주시기바랍니다.");
	} else {
		$.ajax({
			type: "get",
			dataType: "json",
			data: {
				REQUEST_USER_SYSTEMS : requestSystem.join(),
				SYS_AUTH : 1
			},
			contentType : "application/json; charset=utf-8",
			url: "/main/UsvUserSystemProcWrite.do",
			success: function(data) {
				if (Edit) {
					alert("관리 권한 신청이 완료되었습니다.\n관리 대장을 선택하여 권한을 신청하시기 바랍니다.");
				} else {
					alert("조회 권한 신청이 완료되었습니다.");	
				}
			},
			error: function(xhr, status, error) {
				alert(status);
				alert(error);
			},
			complete: function(data) {
				if (Edit) {
					fnRequestUserComponent();
				} else {
					location.reload(true);	
				}
			}
		});
	}
}
function fnRequestUserSystemEdit() {
	fnWndHide();
	
	$("#requestUserSystemEdit").center();
	$("#requestUserSystemEdit").show();
}
function fnRequestUserComponent() {
	fnWndHide();
	
	$("#requestUserComponent").center();
	$("#requestUserComponent").show();
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			USER_ID : "${sessionScope.system_user.USER_ID}"
		},
		contentType : "application/json; charset=utf-8",
		url: "/main/GetUsvUserComponent.do",
		success: function(data) {
			if (data.treeRoad != undefined) fnSetTree("treeRoad", data.treeRoad);
			if (data.treeWater != undefined) fnSetTree("treeWater", data.treeWater);
			if (data.treeSewer != undefined) fnSetTree("treeSewer", data.treeSewer);
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete: function(data) {
		}
	});
}
function fnSetTree(treeId, data) {
	$("#" + treeId).dynatree({
		imagePath : null,
	    checkbox: true,
	    selectMode: 3,
	    children: data,			    
	    onSelect: function(select, node) {
	      // Get a list of all selected nodes, and convert to a key array:
	      var selKeys = $.map(node.tree.getSelectedNodes(), function(node){
	        return node.data.key;
	      });

	      // Get a list of all selected TOP nodes
	      var selRootNodes = node.tree.getSelectedNodes(true);
	      // ... and convert to a key array:
	      var selRootKeys = $.map(selRootNodes, function(node){
	        return node.data.key;
	      });
	      //$("#echoSelectionRootKeys3").text(selRootKeys.join(", "));
	      //$("#echoSelectionRoots3").text(selRootNodes.join(", "));
	    },
	    onDblClick: function(node, event) {
	      node.toggleSelect();
	    },
	    onKeydown: function(node, event) {
	      if( event.which == 32 ) {
	        node.toggleSelect();
	        return false;
	      }
	    },
	    // The following options are only required, if we have more than one tree on one page:
//	      initId: "treeData",
	    cookieId: "dynatree-Cb3",
	    idPrefix: "dynatree-Cb3-"
	  });
}
function fnRequestUserComponentOK() {
	if (!confirm("선택하신 내용으로 관리권한을 신청하시겠습니까?")) return;
	var selKeyss = [];
	var selKeys = [];
	var sys = ["treeRoad", "treeWater", "treeSewer"];
	for ( var i = 0; i < sys.length; i++) {
		if ($("#" + sys[i]).children().length > 0) {
		    selKeys = $.map($("#" + sys[i]).dynatree("getSelectedNodes"), function(node) {
		        return node.data.key;
		    });
		    selKeys = $.grep(selKeys, function(value){
		    	return value.indexOf("_") < 0; //root는 앞에 "_" 붙음
		    });
		    $.merge(selKeyss, selKeys);
		}
	}
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			SEQS : selKeyss.join()
		},
		contentType : "application/json; charset=utf-8",
		url: "/main/UsvUserComponentProcWrite.do",
		success: function(data) {
			alert("관리권한 신청이 완료되었습니다.");	
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete: function(data) {
			location.reload(true);	
		}
	});
}
var opt = "width= 800, height= 620, resizable=no, status=yes, scrollbars=yes";
function fnGoNotice() {
	var popUrl = "board/popNoticeList.do";
	var w = window.open(popUrl,"bc_notice", opt);
	w.focus();
}
function fnGoNoticeDetail(idx) {
	var popUrl = "board/popNoticeView.do?IDX=" + idx;
	var w = window.open(popUrl,"bc_notice", opt);
	w.focus();
}

function fnGoRefer() {
	var popUrl = "refer/popReferList.do";
	var w = window.open(popUrl,"bc_refer", opt);
	w.focus();
}
function fnGoReferDetail(idx) {
	var popUrl = "refer/popReferView.do?IDX=" + idx;
	var w = window.open(popUrl,"bc_refer", opt);
	w.focus();	
}
function fnGoReplyDetail(idx) {
	var popUrl = "refer/popViewReply.do?IDX=" + idx;
	var w = window.open(popUrl,"bc_refer", opt);
	w.focus();	
}

function fnGoBookByLog(sysType, tagNam, tagAls, tagIdn) {
	switch (sysType) {
		case "도로": sysType = "road";break;
		case "상수": sysType = "water";break;
		case "하수": sysType = "sewer";break;
	}
	var tmp = tagNam.split("_");
	var sId = tmp[0].toLowerCase();
	
	for(var i=1; i<tmp.length; i++) {
		sId += tmp[i].substring(0,1).toUpperCase() + tmp[i].substring(1).toLowerCase();
	}
	
	var data = {CNT_NUM : tagIdn, page : "1", rows : "1"};
	if (tagNam.indexOf("CONS_MA") < 0) {
		data = {FTR_IDN : tagIdn, page : "1", rows : "1"};
	}
	
	var oid = "";
	$.ajax({
		type: "get",
		dataType: "xml",
		data: data,
		contentType : "application/json; charset=utf-8",
		url: "/"+sysType+"/"+sId+"ListXml.do",
		success: function(xml) {
			oid = $(xml).find("OBJECTID").first().text();
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		},
		complete: function(data) {
			if (oid == null || oid == "") {
				alert("해당하는 대장이 없습니다.");
			} else {
				//대장 수정이력이 있으니, 권한이 있다고 봄
				fnGoSystem(sysType, 2, sId, oid, tagAls);	
			}
		}
	});
}

window.onbeforeunload = function() {
	$.get("/logoutWrite.do");
};

$(window).data('beforeunload',window.onbeforeunload); 
$('a[href^="javascript:"]').hover(
	function(){window.onbeforeunload=null;},
    function(){window.onbeforeunload=$(window).data('beforeunload');}
);
</script>
</head>
<body class="main">
    <header style="height: 75px;" >    
        <h1></h1>      
        <section class="menu" style="margin-top: 25px;">
        	<span>
                <strong>${sessionScope.system_user.USER_NAME}</strong>님 안녕하세요
                <!-- 둘 중 선택하여 사용 -->
                <!-- <a href="#none" target="_self">로그아웃</a> -->
                <!-- <input type="button" value="로그아웃"> -->
                <!-- 둘 중 선택하여 사용 -->
            </span>
            <nav>
                <ul>
	   				<c:if test="${sessionScope.system_user.SYS_ADMIN ne 2}">
                  	  <li><a href="javascript:fnRequestType();" target="_self"><span>권한요청</span></a></li>
	   				</c:if>
                	<c:if test="${sessionScope.system_user.SYS_EDITOR eq 2}">
                  	  <li><a href="/filestorage/Editor/prjEditSetup.exe" target="_self"><span>편집시스템</span></a></li>
	   				</c:if>
                	<c:if test="${sessionScope.system_user.SYS_ADMIN eq 2}">
                  	  <li><a href="javascript:fnGoManage();"><span>관리자</span></a></li>
	   				</c:if>
                </ul>
            </nav>
        </section>
    </header>    
    <section class="body">
        <nav style="height: 290px;">
            <ul class="_over">
               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 0}">
                 	  <li><a href="javascript:fnGoSystem('road', 0);" target="_self"><img src="../images/common/main_body_link_road.png" style="opacity:0.5;" alt="도로관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 1}">
                 	  <li><a href="javascript:fnGoSystem('road', 1);" target="_self"><img src="../images/common/main_body_link_road.png" style="opacity:0.5;" alt="도로관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 2}">
                 	  <li><a href="javascript:fnGoSystem('road', 2);" target="_self"><img src="../images/common/main_body_link_road.png" alt="도로관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_WATER eq 0}">
                 	  <li><a href="javascript:fnGoSystem('water', 0);" target="_self"><img src="../images/common/main_body_link_water.png" style="opacity:0.5;" alt="상수관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_WATER eq 1}">
                 	  <li><a href="javascript:fnGoSystem('water', 1);" target="_self"><img src="../images/common/main_body_link_water.png" style="opacity:0.5;" alt="상수관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_WATER eq 2}">
                 	  <li><a href="javascript:fnGoSystem('water', 2);" target="_self"><img src="../images/common/main_body_link_water.png" alt="상수관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 0}">
                 	  <li><a href="javascript:fnGoSystem('sewer', 0);" target="_self"><img src="../images/common/main_body_link_sewer.png" style="opacity:0.5;" alt="하수관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 1}">
                 	  <li><a href="javascript:fnGoSystem('sewer', 1);" target="_self"><img src="../images/common/main_body_link_sewer.png" style="opacity:0.5;" alt="하수관리시스템"></a></li>
   				</c:if>
               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 2}">
                 	  <li><a href="javascript:fnGoSystem('sewer', 2);" target="_self"><img src="../images/common/main_body_link_sewer.png" alt="하수관리시스템"></a></li>
   				</c:if>
            </ul>
        </nav>
        <section class="recentList notice">
            <dl>
                <dt><img src="../images/common/main_title_notice.png" alt="공지사항"></dt>
                <dd>
                    <ul>
                    	<c:forEach var="bbsList" items="${bbsList}">
	                        <li>
	                            <a href="javascript:fnGoNoticeDetail(${bbsList.IDX});">${bbsList.TITLE_TEXT}</a>
	                            <span class="date">
	                            	<fmt:parseDate var="date" value="${bbsList.REGIST_DATE}" pattern="yyyy-MM-dd HH:mm:ss.S"/>
									<fmt:formatDate value="${date}" pattern="yyyy-MM-dd"/> 
	                            </span>
	                        </li>
                        </c:forEach>
                    </ul>
                </dd>
                <dd class="more"><a href="javascript:fnGoNotice();"><img src="../images/common/more.png" alt="더보기"></a></dd>
            </dl>
        </section>
        <section class="recentList file">
            <dl>
                <dt><img src="../images/common/main_title_file.png" alt="자료실"></dt>
                <dd>
                    <ul>
                        <c:forEach var="refList" items="${refList}">
                        	<c:if test = "${refList.REFNUM eq 0}">
		                        <li>
		                            <a href="javascript:fnGoReferDetail(${refList.IDX});">${refList.TITLE_TEXT}</a>
		                            <span class="date">
		                            	<fmt:parseDate var="date" value="${refList.REGIST_DATE}" pattern="yyyy-MM-dd HH:mm:ss.S"/>
										<fmt:formatDate value="${date}" pattern="yyyy-MM-dd"/> 
		                            </span>
		                        </li>
	                        </c:if>
	                        <c:if test = "${refList.REFNUM ne 0}">
		                        <li style="text-indent: 7px;">
		                            <a href="javascript:fnGoReplyDetail(${refList.IDX});"><img src="../images/common/re1.png" style="height: 10px;"><label style="font-weight: bold;">Re: </label>${refList.TITLE_TEXT}</a>
		                            <span class="date">
		                            	<fmt:parseDate var="date" value="${refList.REGIST_DATE}" pattern="yyyy-MM-dd HH:mm:ss.S"/>
										<fmt:formatDate value="${date}" pattern="yyyy-MM-dd"/> 
		                            </span>
		                        </li>
	                        </c:if>
                        </c:forEach>
                    </ul>
                </dd>
                <dd class="more"><a href="javascript:fnGoRefer();"><img src="../images/common/more.png" alt="더보기"></a></dd>
        	</dl>
        </section>
        <section class="recentList my">
            <dl>
                <dt><img src="../images/common/main_title_myoff.png" alt="마이오피스"></dt>
                <dd>
                	<h2>금월 변경 건수 : ${bookLogListCnt}</h2>
                	<h2>최근 작업 내역 </h2>
                    <ul>                    
                        <c:forEach var="bookLogList" items="${bookLogList}">
	                        <li>
	                            <a href="javascript:fnGoBookByLog('${bookLogList.SYS_TYP}', '${bookLogList.TAG_NAM}', '${bookLogList.TAG_ALS}', '${bookLogList.TAG_IDN}');">${bookLogList.TAG_ALS}(${bookLogList.TAG_IDN})</a>
	                            <span class="date">${bookLogList.CHG_YMD}</span>
	                        </li>
                        </c:forEach>
                    </ul>
                </dd>
        	</dl>
        </section>
    </section> 
    <div id="requestType" class="popup property" draggable="true" style="width: 1000px;height: 535px;display: none;">
	    <span class="popupTitle">▶ 도시기반시설물 관리시스템 권한 신청</span>
	    <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="$('#requestType').hide();">
	    <section class="contents">
	        <ol>
	            <li><h2><img src="../images/authority/step1_on.png" alt="사용자 권한 타입 선택"></h2></li>
	            <li><img src="../images/authority/step2.png" alt="사용자 권한 신청"></li>
	            <li><img src="../images/authority/step3.png" alt="사용자 권한 신청 완료"></li>
	        </ol>   
		    <section class="step1">
		        <a href="javascript:fnRequestUserSystemView();" target="_self" class="facility">
		            <h3>도시기반시설물 관리시스템 정보 조회 권한 신청</h3>
		            <p>도로관리시스템, 상수관리시스템, 하수관리시스템의 정보 조회만을 필요로 하는 사용자 권한 신청</p>
		            <p>신청하기</p>
		        </a>
		        <a href="javascript:fnRequestUserSystemEdit();" target="_self" class="system">
		            <h3>도시기반시설물 관리시스템 정보 관리 권한 신청</h3>
		            <p>도록관리시스템, 상수관리시스템, 하수관리시스템의 시설물 관리자로서 시설물 데이터 관리 권한을 필요로 하는 사용자 권한 신청</p>
		            <p>신청하기</p>
		        </a>
		    </section>
	    </section>
	</div>
    <div id="requestUserSystemView" class="popup property" draggable="true" style="width: 1000px;height: 580px;display: none;">
	    <span class="popupTitle">▶ 도시기반시설물 관리시스템 권한 신청</span>
	    <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="$('#requestUserSystemView').hide();">
	    <section class="contents">
	        <ol>
	            <li><img src="../images/authority/step1.png" alt="사용자 권한 타입 선택"></li>
	            <li><h2><img src="../images/authority/step2_on.png" alt="사용자 권한 신청"></h2></li>
	            <li><img src="../images/authority/step3.png" alt="사용자 권한 신청 완료"></li>
	        </ol>    
		    <section class="step2">
		        <div class="wrap">
		            <p><img src="../images/authority/application_text_system.png" alt="정보 조회를 원하는 시스템을 1개 이상 체크 후 하단의 권한 신청 버튼을 클릭하여 주시기 바랍니다."></p>
		            <ul>
		                <li>
		                    <dl>
		                        <dt><label for="chkRoad"><img src="../images/authority/icon_roadmanage.png" alt="도로관리시스템"></label></dt>
		                        <dd>
		                        	<label>
						               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 0}">
					   						권한신청 <input id="chkRoad" type="checkbox" name="chkSystems" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 1}">
						                 	신청중 <input id="chkRoad" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 2}">
						                 	신청완료 <input id="chkRoad" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" />
						   				</c:if>
	                        		</label>
                        		</dd>
		                    </dl>
		                </li>
		                <li>
		                    <dl>
		                        <dt><label for="chkWater"><img src="../images/authority/icon_watermanage.png" alt="상수관리시스템"></label></dt>
		                        <dd>
		                        	<label>
						               	<c:if test="${sessionScope.system_user.SYS_WATER eq 0}">
					   						권한신청 <input id="chkWater" type="checkbox" name="chkSystems" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_WATER eq 1}">
					   						신청중 <input id="chkWater" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_WATER eq 2}">
					   						신청완료 <input id="chkWater" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" />
						   				</c:if>
	                        		</label>
                       			</dd>
		                    </dl>
		                </li>
		                <li>
		                    <dl>
		                        <dt><label for="chkSewer"><img src="../images/authority/icon_sewermanage.png" alt="하수관리시스템"></label></dt>
		                        <dd>
		                        	<label>
						               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 0}">
					   						권한신청 <input id="chkSewer" type="checkbox" name="chkSystems" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 1}">
					   						신청중 <input id="chkSewer" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 2}">
					   						신청완료 <input id="chkSewer" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" />
						   				</c:if>
	                        		</label>
                       			</dd>
		                    </dl>
		                </li>
		            </ul>
		        </div>
		    </section>
   			<a href="javascript:fnRequestUserSystemViewOK(false);" target="_self">
   				<img src="../images/authority/btn_application.png" alt="권한 신청">
 			</a>
	    </section>
	</div>
    <div id="requestUserSystemEdit" class="popup property" draggable="true" style="width: 1000px;height: 610px;display: none;">
	    <span class="popupTitle">▶ 도시기반시설물 관리시스템 권한 신청</span>
	    <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="$('#requestUserSystemEdit').hide();">
	    <section class="contents">
	        <ol>
	            <li><img src="../images/authority/step1.png" alt="사용자 권한 타입 선택"></li>
	            <li><h2><img src="../images/authority/step2_on.png" alt="사용자 권한 신청"></h2></li>
	            <li><img src="../images/authority/step3.png" alt="사용자 권한 신청 완료"></li>
	        </ol>
		    <section class="step2">
		        <div class="wrap">
		            <p><img src="../images/authority/application_text_system.png" alt="정보 조회를 원하는 시스템을 1개 이상 체크 후 하단의 권한 신청 버튼을 클릭하여 주시기 바랍니다."></p>
		            <ul>
		                <li>
		                    <dl>
		                        <dt><label for="chkRoad"><img src="../images/authority/icon_roadmanage.png" alt="도로관리시스템"></label></dt>
		                        <dd>
		                        	<label>
						               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 0}">
					   						권한신청 <input id="chkRoad" type="checkbox" name="chkSystems" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 1}">
						                 	신청중 <input id="chkRoad" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" /><br />
	   										<input type="button" value="관리권한 추가신청" onclick="fnRequestUserComponent();" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_ROAD eq 2}">
						                 	신청완료 <input id="chkRoad" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" /><br />
	   										<input type="button" value="관리권한 추가신청" onclick="fnRequestUserComponent();" />
						   				</c:if>
	                        		</label>
                        		</dd>
		                    </dl>
		                </li>
		                <li>
		                    <dl>
		                        <dt><label for="chkWater"><img src="../images/authority/icon_watermanage.png" alt="상수관리시스템"></label></dt>
		                        <dd>
		                        	<label>
						               	<c:if test="${sessionScope.system_user.SYS_WATER eq 0}">
					   						권한신청 <input id="chkWater" type="checkbox" name="chkSystems" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_WATER eq 1}">
					   						신청중 <input id="chkWater" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" /><br />
	   										<input type="button" value="관리권한 추가신청" onclick="fnRequestUserComponent();" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_WATER eq 2}">
					   						신청완료 <input id="chkWater" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" /><br />
	   										<input type="button" value="관리권한 추가신청" onclick="fnRequestUserComponent();" />
						   				</c:if>
	                        		</label>
                       			</dd>
		                    </dl>
		                </li>
		                <li>
		                    <dl>
		                        <dt><label for="chkSewer"><img src="../images/authority/icon_sewermanage.png" alt="하수관리시스템"></label></dt>
		                        <dd>
		                        	<label>
						               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 0}">
					   						권한신청 <input id="chkSewer" type="checkbox" name="chkSystems" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 1}">
					   						신청중 <input id="chkSewer" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" /><br />
	   										<input type="button" value="관리권한 추가신청" onclick="fnRequestUserComponent();" />
						   				</c:if>
						               	<c:if test="${sessionScope.system_user.SYS_SEWER eq 2}">
					   						신청완료 <input id="chkSewer" type="checkbox" name="chkSystems" checked="checked" disabled="disabled" /><br />
	   										<input type="button" value="관리권한 추가신청" onclick="fnRequestUserComponent();" />
						   				</c:if>
	                        		</label>
                       			</dd>
		                    </dl>
		                </li>
		            </ul>
		        </div>
		    </section>
   			<a href="javascript:fnRequestUserSystemViewOK(true);" target="_self">
   				<img src="../images/authority/btn_application.png" alt="권한 신청">
 			</a>  		
	    </section>
	</div>
    <div id="requestUserComponent" class="popup property" draggable="true" style="width: 1000px;height: 800px;display: none;">
	    <span class="popupTitle">▶ 도시기반시설물 관리시스템 권한 신청</span>
	    <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="$('#requestUserComponent').hide();">
	    <section class="contents">
	        <ol>
	            <li><img src="../images/authority/step1.png" alt="사용자 권한 타입 선택"></li>
	            <li><h2><img src="../images/authority/step2_on.png" alt="사용자 권한 신청"></h2></li>
	            <li><img src="../images/authority/step3.png" alt="사용자 권한 신청 완료"></li>
	        </ol>   
		    <section class="step2-1">
		        <p>
		            <img src="../images/authority/application_text_facility.png" alt="정보 조회를 원하는 시스템을 1개 이상 체크 후 하단의 권한 신청 버튼을 클릭하여 주시기 바랍니다."><br>
		            <span class="note">기본적으로 해당 시스템의 정보 조회 및 통계 기능은 자동으로 권한 신청이 됩니다.</span>
		        </p>
		        <div class="wrap" style="height: 440px;">
		            <table>
		                <colgroup>
		                    <col>
		                    <col>
		                    <col>
		                </colgroup>
		                <thead>
		                    <tr>
		                        <th>도로관리시스템</th>
		                        <th>상수관리시스템</th>
		                        <th>하수관리시스템</th>
		                    </tr>
		                </thead>
		                <tbody>
		                    <tr style="vertical-align: top;height: 420px;">
		                        <td><div id="treeRoad"></td>
		                        <td><div id="treeWater"></td>
		                        <td><div id="treeSewer"></td>
		                    </tr>
		                </tbody>
		            </table>
		        </div>
		    </section>
    		<a href="javascript:fnRequestUserComponentOK();" target="_self"><img src="../images/authority/btn_application.png" alt="권한 신청"></a>
	    </section>
	</div>
    <%@ include file="/common/include/footer.jsp" %>
</body>
</html>