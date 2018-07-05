<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link type="text/css" rel="stylesheet" href="/css/usolver/book/reset.css"/>
<link type="text/css" rel="stylesheet" href="/css/usolver/book/popup.css"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/usolver/com/cmm/admin.css'/>"/>
<!--  달력을 위해서 이렇게 많은 css가 필요하다니.. 나중에 정리하시려나?  -->
<link rel="stylesheet" type="text/css" href="<c:url value='/extLib/jdesktop/css/jquery-ui/jquery-ui.structure.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/extLib/jdesktop/css/jquery-ui/jquery-ui.min.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/extLib/jdesktop/css/jquery-ui/jquery-ui.theme.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/extLib/jqgrid/css/ui.jqgrid.css'/>"/>
<!--  달력 CSS 끝 -->
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.10.4.custom.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/namespace.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/usolver/com/cmm/common.js'/>"></script>

<script type="text/javaScript" language="javascript" defer="defer">
$(document).ready(function() {	
	<c:if test="${!empty resultMsg}"> 
		//alert('<c:out value="${resultMsg}"/>');
		COMMON.showMessage('<c:out value="${resultMsg}"/>');
	</c:if>	
	
	$(document).on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
	//GetStyle용
	$("#serviceLayer").attr("href","/admin/layer/selectLayerList.do?url="+encodeURIComponent(window.parent.CONFIG.fn_get_serviceUrl()));
	
	$("#W_900").width("98%");
	$("#W_900").height("98%");
});

function fn_go_List(pageNo){
	document.frm_manage.searchKeyword.value = "";
    document.frm_manage.pageIndex.value = pageNo;
    document.frm_manage.submit();
}

function fnLinkPage(pageNo){
    document.frm_manage.pageIndex.value = pageNo;
    document.frm_manage.submit();
}

function press() {
    if (event.keyCode==13) {
    	fn_search_list(1);
    }
}

function fn_layer_close(id){
	 $("form").each(function() {  
         this.reset();  
      });  
	$("#"+id).hide();
}

function fnCheckAll() {
    var checkField = document.frm_manage.checkField;
    if(document.frm_manage.checkAll.checked) {
        if(checkField) {
            if(checkField.length > 1) {
                for(var i=0; i < checkField.length; i++) {
                    checkField[i].checked = true;
                }
            } else {
                checkField.checked = true;
            }
        }
    } else {
        if(checkField) {
            if(checkField.length > 1) {
                for(var j=0; j < checkField.length; j++) {
                    checkField[j].checked = false;
                }
            } else {
                checkField.checked = false;
            }
        }
    }
}

function fnManageChecked() {

    var checkField = document.frm_manage.checkField;
    var checkId = document.frm_manage.checkId;
    var returnValue = "";

    var returnBoolean = false;
    var checkCount = 0;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked) {
                    checkField[i].value = checkId[i].value;
                    if(returnValue == "")
                        returnValue = checkField[i].value;
                    else
                	    returnValue = returnValue + ";" + checkField[i].value;
                    checkCount++;
                }
            }
            if(checkCount > 0)
                returnBoolean = true;
            else {
                alert("선택한 항목이 없습니다.");
                returnBoolean = false;
            }
        } else {
            if(document.frm_manage.checkField.checked == false) {
                alert("선택한 항목이 없습니다.");
                returnBoolean = false;
            }
            else {
                returnValue = checkId.value;
                returnBoolean = true;
            }
        }
    } else {
        alert("조회된 결과가 없습니다.");
    }

    document.frm_manage.checkList.value = returnValue;

    return returnBoolean;
}

/**
 * @method 
 * @description 달력 생성용
 * @author 김수예(2016.04.01)
 * @param {String} _sFormId 선택된 form의 ID
 * @param {String} _sStartDtId 	시작날짜가 지정된 input ID
 * @param {String} _sEndDtId 	종료날짜가 지정된 input ID
 * @param {number} _nSize	날짜의 SIZE
 */ 
fn_create_datepickerLinked = function(_sFormId, _sStartDtId, _sEndDtId, _nSize) {

	$('#'+_sFormId).find("input[id='"+_sStartDtId+"']").datepicker({
		changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/book/p_btn_calendar.gif",buttonImageOnly: true,dateFormat: "yy-mm-dd",
		onClose: function( selectedDate ) {
			$('#'+_sFormId).find("input[id='"+_sEndDtId+"']").datepicker( "option", "minDate", selectedDate );
		}
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
            $('#'+_sFormId).find("input[id='"+_sEndDtId+"']").datepicker( "option", "minDate", "" );
        }
    });
	$('#'+_sFormId).find("input[id='"+_sEndDtId+"']").datepicker({
		changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/book/p_btn_calendar.gif",buttonImageOnly: true,dateFormat: "yy-mm-dd",
		onClose: function( selectedDate ) {
			$('#'+_sFormId).find("input[id='"+_sStartDtId+"']").datepicker( "option", "maxDate", selectedDate );
		}
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
            $('#'+_sFormId).find("input[id='"+_sStartDtId+"']").datepicker( "option", "maxDate", "" );
        }
    });
	
	fn_click_datepicker(_sFormId, _sStartDtId);
	fn_click_datepicker(_sFormId, _sEndDtId);	
	
}

/**
 * @method 
 * @description 달력 생성용
 * @author 김수예(2016.04.01)
 * @param {String} _sFormId 선택된 form의 ID
 * @param {String} _sDtId 	선택된 날짜가 지정된 input ID
 * @param {number} _nSize	날짜의 SIZE
 */ 
fn_create_datepicker = function(_sFormId, _sDtId, _nSize) {
	$('#'+_sFormId).find("input[id='"+_sDtId+"']").width(_nSize*8).datepicker({
		changeMonth: true,changeYear: true,numberOfMonths: 1,showOn: "button",buttonImage: "/images/usolver/com/book/p_btn_calendar.gif",buttonImageOnly: true,dateFormat: "yy-mm-dd"
  });
	
	fn_click_datepicker(_sFormId,_sDtId);
}

/**
 * @method 
 * @description datepicker 필드 클릭시 달력 확성화
 * @author 김수예(2016.04.01)
 * @param {String} _sFormId 선택된 form의 ID
 * @param {String} _sDtId 	선택된 날짜가 지정된 input ID
 */ 
fn_click_datepicker = function(_sFormId,_sDtId) {
	$('#'+_sFormId).find("input[id='"+_sDtId+"']").click(function(){
		$('#'+_sFormId).find("input[id='"+_sDtId+"']").each(function(){
			$('#'+_sFormId).find($(this)).datepicker("show");
		});
	});
	$('#'+_sFormId).find("input[id='"+_sDtId+"']").each(function(){
		$('#'+_sFormId).find($(this)).datepicker();
	});
}

 
 /**
	 * @method 
	 * @description 폼 내의 모든 객체에 대한 변경 처리
	 * @author 김수예(2016.04.01)
	* @param {String} _sFormId 선택된 form의 ID
	 */
	fn_init_formObject = function(_sFormId) {

		
/*		$(_sFormId).find(".SPINNER").each(function(){
			$(_sFormId).find($(this)).spinner();
			$(_sFormId).find($(this)).val(new Date().getFullYear());
		});*/

		 $(_sFormId).find("input[type='text'],  select,  textarea").each(function(i){
			 		 
					var inputObj = this;
					var cs = $(this).getClasses();
					var MX = "";
					var DT = "";
					var DD = "";

					$.each( cs, function(index,value){
						try {
							var class_nm = value;
							if( class_nm!='' ) {
								// CS_ 로 시작될 경우, 자리수 크기 지정
								if( class_nm.match(/CS_/) ) {
									//	$(inputObj).width( size*8 );
									//$(inputObj).width( 80 );
								}
								// 타입
								if( class_nm.match(/DT_/) ) {
									DT = class_nm.substr(3);
								}
								// 최대 자리수
								if( class_nm.match(/MX_/) ) {
									MX = parseInt(class_nm.substr(3));
								}
								// 소수점 자리수
								if( class_nm.match(/DD_/) ) {
									DD = parseInt(class_nm.substr(3));
								}
							}
						}catch(E){ alert(E); }
					});
					
					if( DT=='DATE' ) {
						$(inputObj).mask("0000-00-00");
					}
					else if( DT=='INT' || DT=='DOUBLE' || DT=='FLOAT' ) {
						// 숫자 타입 마스크 처리
						// 소숫점 입력 가능인 경우
						if( DD>0 ) {
							MX = MX-DD;
							$(inputObj).keyup(function (e) {
								//if( event.keyCode!=8 && event.keyCode!=46 && event.keyCode!=37 && event.keyCode!=39 ) {
								if( event.keyCode!=37 && event.keyCode!=39 ) {
									var cur_val = this.value.replace(/[^0-9\.\-]/g,'');
									var x = cur_val.split('.'); 
									var x1 = x[0];
									
									if( x1.length>MX )		x1 = x1.substr(0,MX);
									if( x.length > 1 ) {
										var x2 = x[1];
										
										if( x2.length>DD )			x2 = x2.substr(0,DD);
		
										this.value = x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + x2;
									}
									else {
										this.value = x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
									}
								}
							});
							
							// --------------------------------------
							// 초기 값에 콤마 추가
							var init_val = $(inputObj).val();
							var cur_val = init_val.replace(/[^0-9\.\-]/g,'');
							var x = cur_val.split('.'); 
							var x1 = x[0];
							
							if( x.length > 1 ) {
								var x2 = x[1];
								 $(inputObj).val( x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + x2 );
							}
							else {
								 $(inputObj).val( x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
							}
							// --------------------------------------
						}
						else {
							$(inputObj).keyup(function () {
								if( event.keyCode!=37 && event.keyCode!=39 ) {
									var cur_val = this.value.replace(/[^0-9\.\-]/g,'');
									var x = cur_val.split('.'); 
									var x1 = x[0];
									
									if( x1.length>MX )		x1 = x1.substr(0,MX);
									this.value = x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
								}
							});
							
							// --------------------------------------
							// 초기 값에 콤마 추가
							var init_val = $(inputObj).val();
							var cur_val = init_val.replace(/[^0-9\.\-]/g,'');
							var x = cur_val.split('.'); 
							var x1 = x[0];
							 $(inputObj).val( x1.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
							// --------------------------------------
						}
						$(inputObj).css("text-decoration", "underline");
					}
					else if(MX>0) {
						$(inputObj).attr('maxlength', MX);
					}
				}
		);
		$(_sFormId).find("input[type='text']:enabled").first().focus();
	}
		 
</script>
<div class="admin_left">
    <div class="TitBx">
    	관리자
    </div>
    <div class="menu_list">
        <ul>
            <li <c:if test = "${menu eq 'board'}">class="on"</c:if>><a href="/admin/board/boardList.do" target="_self">공지사항관리</a></li>
            <%-- <li <c:if test = "${menu eq 'user'}">class="on"</c:if>><a href="/admin/user/EgovUserList.do" target="_self">사용자관리</a></li> --%>
            <li <c:if test = "${menu eq 'user' || menu eq 'userMenu' || menu eq 'userData' }">class="on"</c:if>><a href="#">사용자관리</a>
            	<ul  class="depth2">
		             <li <c:if test = "${menu eq 'user'}">class="on"</c:if>><a href="/admin/user/EgovUserList.do" target="_self"><span>- 사용자 정보관리</span></a></li>
		             <li <c:if test = "${menu eq 'userMenu'}">class="on"</c:if>><a href="/admin/user/EgovUserMenuCreat.do" target="_self"><span>- 사용자 메뉴관리</span></a></li>
		             <li <c:if test = "${menu eq 'userData'}">class="on"</c:if>><a href="/admin/user/EgovUserDataList.do" target="_self"><span>- 사용자 데이터관리</span></a></li>                    
		        </ul>
            </li>
            <li <c:if test = "${menu eq 'code'}">class="on"</c:if>><a href="/admin/code/selectCodeDomain.do" target="_self">코드관리</a></li>
            <li <c:if test = "${menu eq 'layer' || menu eq 'refLayer' || menu eq 'snapLayer'}">class="on"</c:if>><a href="#">레이어 관리</a>
            	<ul  class="depth2">
		             <li <c:if test = "${menu eq 'layer'}">class="on"</c:if>><a id="serviceLayer" href="" target="_self"><span>- 서비스 레이어 관리</span></a></li>
		             <li <c:if test = "${menu eq 'refLayer'}">class="on"</c:if>><a id="refLayer" href="/admin/layer/selectRefLayerList.do" target="_self"><span>- 참조 레이어 관리</span></a></li>
		             <li <c:if test = "${menu eq 'snapLayer'}">class="on"</c:if>><a id="snapLayer" href="/admin/layer/selectSnapLayerList.do" target="_self"><span>- 스내핑 레이어 관리</span></a></li>
		        </ul>
            </li>
            <li <c:if test = "${menu eq 'loginLog' || menu eq 'webLog' || menu eq 'editLog' ||  menu eq 'layerLog' || menu eq 'imgLog'}">class="on"</c:if>><a href="#">로그관리</a>
            	<ul  class="depth2">
		             <li <c:if test = "${menu eq 'loginLog'}">class="on"</c:if>><a href="/admin/log/clg/SelectLoginLogList.do" target="_self"><span>- 접속 로그관리</span></a></li>
		             <li <c:if test = "${menu eq 'webLog'}">class="on"</c:if>><a href="/admin/log/wlg/SelectWebLogList.do" target="_self"><span>- 웹 로그관리</span></a></li>
		             <li <c:if test = "${menu eq 'editLog'}">class="on"</c:if>><a href="/admin/log/elg/SelectEditLogList.do" target="_self"><span>- 편집 로그관리</span></a></li>   
		             <li <c:if test = "${menu eq 'layerLog'}">class="on"</c:if>><a href="/admin/log/elg/SelectLayerLogList.do" target="_self"><span>- 레이어 로그관리</span></a></li>                     
		             <li <c:if test = "${menu eq 'imgLog'}">class="on"</c:if>><a href="/admin/log/ilg/SelectImgLogList.do" target="_self"><span>- 이미지 로그관리</span></a></li>                     
		        </ul>
            </li>
            <li <c:if test = "${menu eq 'menuList' || menu eq 'menuManage' || menu eq 'menuCreate'}">class="on"</c:if>><a href="#"> 메뉴관리</a>
            	<ul  class="depth2">
            		<li <c:if test = "${menu eq 'menuList'}">class="on"</c:if>><a href="/admin/menu/EgovMenuListSelect.do" target="_self"><span>- 메뉴 리스트관리</span></a></li>
		            <%-- <li <c:if test = "${menu eq 'menuManage'}">class="on"</c:if>><a href="/admin/menu/EgovMenuManageSelect.do" target="_self"><span>- 메뉴관리리스트</span></a></li> --%>
		            <%-- <li <c:if test = "${menu eq 'menuCreate'}">class="on"</c:if>><a href="/admin/menu/EgovMenuCreatManageSelect.do" target="_self"><span>- 권한별 메뉴관리</span></a></li> --%>
		            <li <c:if test = "${menu eq 'menuCreate'}">class="on"</c:if>><a href="/admin/menu/EgovMenuCreatSelect.do?systemType=DEFAULT" target="_self"><span>- 권한별 메뉴관리</span></a></li>
               </ul>
            </li>
            <li <c:if test = "${menu eq 'program'}">class="on"</c:if>><a href="/admin/program/EgovProgramList.do" target="_self"> 프로그램관리</a></li>
           <li <c:if test = "${menu eq 'role' || menu eq 'author'}">class="on"</c:if>><a href="#">  롤 & 권한관리</a>
            	<ul  class="depth2">
            		<li <c:if test = "${menu eq 'role'}">class="on"</c:if>><a href="/admin/role/EgovRoleList.do" target="_self"><span>- 롤관리</span></a></li>        
            		<li <c:if test = "${menu eq 'author'}">class="on"</c:if>><a href="/admin/author/EgovAuthorList.do" target="_self"><span>- 권한관리</span></a></li>   
<%-- 		            <li <c:if test = "${menu eq 'authorRole'}">class="on"</c:if>><a href="/admin/author/EgovAuthorRoleList.do" target="_self">롤&권한 관계관리</a></li>  --%>
		          <%--   <li <c:if test = "${menu eq 'roleHierarchy'}">class="on"</c:if>><a href="/admin/role/EgovRoleHierarchyList.do" target="_self">권한상하 관계관리</a></li>     --%>
<%-- 		            <li <c:if test = "${menu eq 'authorGroup'}">class="on"</c:if>><a href="/admin/author/EgovAuthorGroupList.do" target="_self">권한별 사용자 관리</a></li>        --%>          
               </ul>
            </li>            
        </ul>	            	
    </div>
</div>