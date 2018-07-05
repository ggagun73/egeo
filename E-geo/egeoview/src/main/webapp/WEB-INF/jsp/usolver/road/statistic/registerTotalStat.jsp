<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
  /**
  * @Class Name : 
  * @Description : 
  * @Modification Information
  * 
  *   수정일           수정자                수정내용
  *  ----------    --------    ---------------------------
  *  2014.08.05      임상수        최초 생성
  *
  
  * author 지노
  * since 2014.07.10
  *  
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html>
<html lang="UTF-8">
<head>

<script type="text/javascript">
$( document ).ready(function() {
	
	//조건세팅
	fn_change_conditionVal();
	
	// 화면 초기화. 그리드 사이즈 조정 
	BOOK.fn_init_main();	
});

function fn_search_statistic() {
	
	var vWhere = "";
	switch($("#COLUMN").val()) {
	case "ALL" : // 시
		break;
	case "HJG_CDE" : // 구
		vWhere = $("#HJD_CD").val();
		break;
	case "HJD_CDE" : // 행정동
		vWhere = $("#HJD_CDE").val();
		break;
	}
	
	$.ajax({
		type: "get",
		dataType: "json",
		data: {
			COLUMN : $("#COLUMN").val(),
			WHERE : vWhere
		},
		contentType : "application/json; charset=utf-8",
		url: "/book/rdlTotalStatXml.do",
		success: function(data) {
			//도로현황
			$("#rdlCtlrLs").html(data.r.rdlCtlrLs + " M");	//도로
			$("#rdtRdwyDt").html(data.r.rdtRdwyDt + " 개");	// 차도RDT_RDWY_DT		
			$("#rdtSdwkDt").html(data.r.rdtSdwkDt + " 개");	// 보도 RDT_SDWK_DT
			$("#rdtRoutDt").html(data.r.rdtRoutDt + " 개");	//노선RDT_ROUT_DT
			$("#rdtIpcrDt").html(data.r.rdtIpcrDt + " 개");	// RDT_IPCR_DT
			$("#rdtRndwDt").html(data.r.rdtRndwDt + " 개");	//우회도로 RDT_RNDW_DT
			$("#rdtClbmDt").html(data.r.rdtClbmDt + " 개");	//오르막차로 RDT_CLBM_DT				
			$("#rdlBycpAs").html(data.r.rdlBycpAs + " 개");		//자전거도로
			//도로시설물	
			$("#rdlBrdgAs").html(data.r.rdlBrdgAs + " 개");		//교량	
			$("#rdlTrnlAs").html(data.r.rdlBrdgAs + " 개");		//터널  RDL_TRNL_AS
			$("#rdlUgrdAs").html(data.r.rdlUgrdAs + " 개");		//지하차도
			$("#rdlSbwyAs").html(data.r.rdlSbwyAs + " 개");	//지하보도
			$("#rdlOvpsAs").html(data.r.rdlOvpsAs + " 개");		//육교
			$("#rdlCrosPs").html(data.r.rdlCrosPs + " 개");		//교차시설
			$("#rdlEvrdAs").html(data.r.rdlEvrdAs + " 개");		//고가도로			
			//도로부속물
			$("#rdlProtLs").html(data.r.rdlProtLs + " 개");		// 방호울타리
			$("#rdlSmrwLs").html(data.r.rdlSmrwLs + " 개");		//석축/옹벽
			$("#rdlSqarAs").html(data.r.rdlSqarAs + " 개");		//교통광장
			$("#rdlMdstAs").html(data.r.rdlMdstAs + " 개");		//중앙분리대
			$("#rdlBystPs").html(data.r.rdlBystPs + " 개");		//자전거보관소  RDL_BYST_PS
			$("#rdlCmdtAs").html(data.r.rdlCmdtAs + " 개");		//공동구  RDL_CMDT_AS
			$("#rdlRdsnPs").html(data.r.rdlRdsnPs + " 개");		//도로표지판
			$("#rdlSlopAs").html(data.r.rdlSlopAs + " 개");		//절개면/성토면
			$("#rdlTreePs").html(data.r.rdlTreePs + " 개");		//가로수
			$("#rdlStltPs").html(data.r.rdlStltPs + " 개");			//가로등
			$("#rdlScltPs").html(data.r.rdlScltPs + " 개");			//보안등
			//교통시설물
			$("#rdlTrsnPs").html(data.r.rdlTrsnPs + " 개");		//신호등
			$("#rdlPdcrAs").html(data.r.rdlPdcrAs + " 개");		//횡단보도
			$("#rdlPakpAs").html(data.r.rdlPakpAs + " 개");		//주차장
			$("#rdlTfsnPs").html(data.r.rdlTfsnPs + " 개");		//교통표지판
			$("#rdlStatPs").html(data.r.rdlStatPs + " 개");			//정류장
			$("#rdlNspvAs").html(data.r.rdlNspvAs + " 개");	//미끄럼방지시설   RDL_NSPV_AS
			$("#rdlSdhpAs").html(data.r.rdlSdhpAs + " 개");	//과속방지턱						
			//도로굴착점용관리 
			$("#rdtExdsDt").html(data.r.rdtExdsDt + " 개");   //도로관리심의	RDT_EXDS_DT
			$("#rdtExalDt").html(data.r.rdtExalDt + " 개");		//도로굴착허가	"RDT_EXAL_DT
			$("#rdtOcalDt").html(data.r.rdtOcalDt + " 개");  		// 도로점용허가	RDT_OCAL_DT
			
			$("#rdlOcupLs").html(data.r.rdlOcupLs + " 개");		//점용시설(선)
			$("#rdlOcupPs").html(data.r.rdlOcupPs + " 개");		//점용시설(선)
			$("#rdlOcupAs").html(data.r.rdlOcupAs + " 개");	//점용시설(선)
		
			$("#rdtRserMa").html(data.r.rdtRserMa + " 개");   	//도로민원	RDT_RSER_MA
			$("#rdtConsMa").html(data.r.rdtConsMa + " 개");	//RDT_CONS_MA
			$("#rdlPaveAs").html(data.r.rdlPaveAs + " 개");		//도로포장
			
			$("#rdlRblnLs").html(data.r.rdlRblnLs + " 개");   	//도로경계
			$("#rdlRdarAs").html(data.r.rdlRdarAs + " 개");
			$("#rdlEtctAs").html(data.r.rdlEtctAs + " 개");   		//기타시설(면)
			$("#rdlEtctPs").html(data.r.rdlEtctPs + " 개");			//기타시설(점)		
			$("#msg").html("");
		},
		error: function(xhr, status, error) {
			alert(status);
			alert(error);
		}
	});
}

function fn_change_conditionVal(obj) {
	var item = $(obj).val(); // 선택된 값을 가져옴
	$("#divHJG_CDE").hide();
	$("#divHJD_CDE").hide();
	switch(item) {
		case "HJG_CDE" : // 구			
			$("#divHJG_CDE").show();
			break;
		case "HJD_CDE" : // 행정동
			$("#divHJD_CDE").show();
			$("#HJD_CDE option:eq(0)").attr("selected","selected");
			break;
	}
};
</script>
</head>
<body>
<div id="W_700">
<form id="frm_statistic" name="frm_statistic" method="post" action="">
<!-- 필수 파라메터(START) -->
<input type="hidden" id="nJDSKMasterId" name="nJDSKMasterId" value="<c:out value="${nJDSKMasterId}"/>"/><!-- nJDSK window창(검색목록)의 Sub창들 관리를 위해-->
<input type="hidden" id="CALL_TYPE" name="CALL_TYPE" value="<c:out value="${CALL_TYPE}"/>"/><!-- nJDSK window창을 시스템 메인 혹은 지도 어디에서 호출하는지 판단을 위해-->
<!-- 필수 파라메터(END) -->
 <div>
        <div class="user_content">
            <div class="schbx">
                <div class="FR" >
                	<div class="Bx1">
	                    <select id="COLUMN" name="COLUMN" onchange="fn_change_conditionVal(this);"  class="select"  style="width:100px;">
							<option value="ALL" selected="selected">시</option>
							<option value="HJG_CDE">구</option>
							<option value="HJD_CDE">행정동</option>
						</select>
					</div>
					<div class="Bx1" id="divHJG_CDE" >					        		
			        	 <select name="HJD_CD" id="HJD_CD"  class="select">
	                    	<option value=""></option>
	                        <c:forEach var="selectData" items="${hjd_cd_list}">
							<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CD}"> selected="selected" </c:if> >${selectData.VAL}</option>
							</c:forEach>
	                    </select>
					</div>
					<div class="Bx1" id="divHJD_CDE" >
			       		<select name="HJD_CDE" id="HJD_CDE"   class="select" >
							<c:forEach var="selectData" items="${hjd_cde_list}">
							<option value="${selectData.CODE}" <c:if test = "${selectData.CODE == param.HJD_CDE}"> selected="selected" </c:if> >${selectData.VAL}</option>
							</c:forEach>
						</select>
					</div>
					<div class="SBtn"><a href="#" class="Btn_sch" onclick="fn_search_statistic()">검색</a></div>
                </div>
            </div>
            <table class="tbview2" summary="종합현황">
				<caption>종합현황</caption>
				<colgroup>
					<col width="15%" />
				    <col width="85%" />
				</colgroup>
				<tbody>
					<tr>
                        <th scope="row">도로현황</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="도로현황">
				                <caption>도로현황</caption>
				                <colgroup>
					                <col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" />
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>도로</th>
                                        <th>차도</th>
                                        <th>보도</th>
                                        <th>노선</th>
                                        <th>우회도로</th>
                                        <th>오르막차로</th>
                                        <th  class="brnone2">자전거도로</th>
                                    </tr>
                                    <tr>
                                       <td id="rdlCtlrLs" >m</td>
					                    <td id="rdtRdwyDt" >개</td>
					                    <td id="rdtSdwkDt" >개</td>
					                    <td id="rdtRoutDt" >개</td>
					                    <td id="rdtRndwDt">개</td>
					                    <td id="rdtClbmDt" >개</td>
					                    <td id="rdlBycpAs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
                   <tr>
                        <th scope="row">도로시설물</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="도로시설물">
				                <caption>도로시설물</caption>
				                <colgroup>
					                 <col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" />
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>교량</th>
                                        <th>터널</th>
                                        <th>지하차도</th>
                                        <th>지하보도</th>
                                        <th>육교</th>
                                        <th>교차시설</th>
                                        <th  class="brnone2">고가도로</th>
                                    </tr>
                                    <tr>
					                    <td id="rdlBrdgAs">개</td>
								        <td id="rdlTrnlAs">개</td>
								        <td id="rdlUgrdAs">개</td>
								        <td id="rdlSbwyAs">개</td>
								        <td id="rdlOvpsAs">개</td>
								        <td id="rdlCrosPs">개</td>
					                    <td id="rdlEvrdAs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">도로부속물</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="도로부속물">
				                <caption>도로부속물</caption>
				                <colgroup>
					                <col width="16%" />
				                    <col width="16%" />
				                    <col width="16%" />
                                    <col width="16%" />	
                                    <col width="16%" />
                                    <col width="16%" />		 
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>방호울타리</th>
                                        <th>석축/옹벽</th>
                                        <th>교통광장</th>
                                        <th>중앙분리대</th>
                                        <th colspan="2" class="brnone2">자전거보관소</th>
                                    </tr>
                                    <tr>
								        <td id="rdlProtLs">개</td>
								        <td id="rdlSmrwLs">개</td>
								        <td id="rdlSqarAs">개</td>
								        <td id="rdlMdstAs">개</td>
								        <td colspan="2"  id="rdlBystPs" class="brnone2">개</td>								        
                                    </tr>
                                    <tr>
                                        <th>공동구</th>
                                        <th>도로표지판</th>
                                        <th>절개면/성토면</th>
                                        <th>가로수</th>
                                        <th>가로등</th>
                                        <th class="brnone2">보안등</th>
                                      </tr>
                                      <tr>
                                      	<td id="rdlCmdtAs">개</td>
								        <td id="rdlRdsnPs">개</td>
								        <td id="rdlSlopAs">개</td>
								        <td id="rdlTreePs">개</td>
								        <td id="rdlStltPs">개</td>
								        <td id="rdlScltPs" class="brnone2">개</td>
                                      </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">교통시설물</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="교통시설물">
				                <caption>교통시설물</caption>
				                <colgroup>
					                <col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" /><col width="14%" />               
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>신호등</th>
                                        <th>횡단보도</th>
                                        <th>주차장</th>
                                        <th>교통표지판</th>
                                        <th>정류장</th>
                                        <th>미끄럼방지시설</th>
                                        <th class="brnone2">과속방지턱</th>
                                    </tr>
                                    <tr>
								        <td id="rdlTrsnPs">개</td>
								        <td id="rdlPdcrAs">개</td>
								        <td id="rdlPakpAs">개</td>
								        <td id="rdlTfsnPs">개</td>
								        <td id="rdlStatPs">개</td>
								        <td id="rdlNspvAs">개</td>
								        <td id="rdlSdhpAs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">도로굴착점용</th>
                        <td class="tbview2_tdpad">
                            <table class="tbin" summary="도로굴착점용">
				                <caption>도로굴착점용</caption>
				                <colgroup>
					                <col width="16%" />
				                    <col width="16%" />
				                    <col width="16%" />
                                    <col width="16%" />	
                                    <col width="16%" />
                                    <col width="16%" />		                    
				                </colgroup>
				                <tbody>
					                <tr>
                                        <th>관리심의</th>
										<th>굴착허가</th>
										<th>점용허가</th>
										<th>점용시설(점)</th>
										<th>점용시설(선)</th>
										<th class="brnone2">점용시설(면)</th>										 
                                    </tr>
                                    <tr>
								        <td id="rdtExdsDt">건</td>
								        <td id="rdtExalDt">건</td>
								        <td id="rdtOcalDt">건</td>
								        <td id="rdlOcupLs">개</td>
								        <td id="rdlOcupPs">개</td>
								        <td id="rdlOcupAs" class="brnone2">개</td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </td>
                    </tr>
				</tbody>
			</table>            
        </div>
    </div>
    <!-- // favorite -->  
</form>  
</div>    
</body>
</html>