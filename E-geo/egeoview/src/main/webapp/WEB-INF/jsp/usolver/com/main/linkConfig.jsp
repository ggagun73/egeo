<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>     
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>테마변경</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/usolver/com/map/popup02.css'/>" />
</head>
<body>


<div id="W_350Bx">
<div class="Top_arrow" style="padding-left:170px;"><img src="/images/usolver/com/map/top/top_arrow.png" alt="arrow"/></div>
<div id="W_350">

	<!-- header -->
	<div id="P2_Header">
    	<div class="Ico"><img src="/images/usolver/com/map/top/top2_ico_2.png" alt="위치검색아이콘"/></div>
    	<div class="Title">연계</div>
    	<div class="Close"><a href="#"><img src="/images/usolver/com/map/top/top_btn_close.png" onMouseOver="this.src='images/top/top_btn_close_on.png'" onMouseOut="this.src='images/top/top_btn_close.png'"  alt="닫기"/></a></div>
    </div>
    <!-- // header -->
    
    
    
    
    <div id="Link">
    	<div class="PTab">
        	<ul>
            	<li><a href="#" class="Tab2_selected">국공</a></li>
            	<li><a href="#" class="Tab3">시도행정</a></li>
            	<li><a href="#" class="Tab3">건축행정</a></li>
            </ul>
        </div>
        
        <div class="PBx1">
        	<div class="PBx_s1">
            	<div class="Tx01">연계대상 레이어:</div>
                <div class="ListBx">
                <select name="select" class="input2" multiple style="width:99%; height:60px;">
                            <option>새주소</option>
                            <option>지적</option>
                            <option>도로</option>
                            <option>ddd</option>
                            <option>ddd</option>
               </select>
                </div>
            </div>
            
            
            
            
            
            
        	<div class="PBx_s1">
            	<div class="Tx02">동기화 주기 설정</div>
                <div class="BgBx">
                	<div class="LCon">
                    	<ul>
                        	<li><input type="radio" name="cycle" /> 한번(N)</li>
                        	<li><input type="radio" name="cycle" /> 매일(D)</li>
                        	<li><input type="radio" name="cycle" /> 매주(W)</li>
                        	<li><input type="radio" name="cycle" /> 매월(M)</li>
                        </ul>
                    </div>
                    <div class="RCon">
                    	<div class="Bx1">
                        	시작 : <select name="select" class="select"  style="width:95px;"><option></option></select> <select name="select" class="select"  style="width:98px;"><option></option></select>
                        </div>
                        <div class="Bx2">
                        	매(C) : <input type="text" style="width:40px;" class="input" value="" />
                        </div>
                        <div class="Bx3">
                        	<div class="Tx1">주마다 다음 요일에 :</div>
                        	<div class="Tx2">
                            	<dl>
                                	<dd><input type="checkbox" /> 일요일(U) </dd>
                                    <dd><input type="checkbox" /> 월요일(A) </dd>
                                    <dd><input type="checkbox" /> 화요일(T) </dd>
                                    <dd><input type="checkbox" /> 목요일(H) </dd>
                                    <dd><input type="checkbox" /> 금요일(F) </dd>
                                    <dd><input type="checkbox" /> 토요일(R) </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        	<div class="PBx_s1" style="padding-bottom:0px;">
            	<div class="Tx02">갱신 이력</div>
                <div class="Table">
                            <div class="Table_list3">
                                <table>
                                <colgroup>
                                    <col width="15%" />
                                    <col width="45%" />
                                    <col width="40%" />
                                </colgroup>
                                <thead>
                                    <tr> 
                                        <th>순번</th>
                                        <th>날짜 및 시간</th>
                                        <th>레이어</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr> 
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr> 
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr> 
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                </table>
                                </div>

                </div>
            </div>
            
            
            
        </div>
        
        
        
        
        <div class="BtBx">
            <div class="Btn"><a href="#" class="Btn_02">확인</a></div>
        </div>
    </div>
    
    
    


</div>    
</div>

</body>



<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-1.11.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/extLib/jquery/jquery-ui-1.11.4.js'/>"></script>


</html>