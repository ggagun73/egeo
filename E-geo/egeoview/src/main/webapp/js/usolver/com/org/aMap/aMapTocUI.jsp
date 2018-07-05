<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<style type="text/css">
	.tocSelected {border: 1px solid red; background-color: #E6B9B8;}
	.tocLayerName {color:black;font-size:12px;font-family:Malgun Gothic;}
	.subTypeLabel {color:black;font-size:11px;font-family:Malgun Gothic;}
	.uniqueSymbol {float: left;width: 160px;margin-left: 10px;}
	.uniqueSymbol .entries {background: none!important; border-bottom: none!important; box-shadow:none!important;}
	.dv_uniqueSymbolList .dojoDndItem {float: left;width: 130px;text-align: left;}
</style>
 <div id="symbol_progress" style="width: 62px;height: 21px;z-index: 999999;display: none;">
     <img alt="loading" src="/images/popup/loading2.gif">
 </div>
<!-- 유효축척 설정 창 -->
<div id="dvLayerScale" class="popup" draggable="true" style="display:none; width:320px;">
   <span class="popupTitle" id="dvLayerScaleTitle"></span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <nav class="_tab">
         <ul>
            <li class="_tab1 on"><input type="button" value="유효축척"></li>
         </ul>
      </nav>
      <div class="_tabContents">
         <div class="_tab1 on">
            <ul class="entries">
               <li>
                  1 : <input type="text" id="txt_LayerMaxScale" value="0" onkeypress="util.checkNumber(this);" style="width:60px;"/>
                  &lt;= 유효축척 &lt;=  
                  1 : <input type="text" id="txt_LayerMinScale" value="0" onkeypress="util.checkNumber(this);" style="width:60px;"/>
               </li>
               <li>(0을 입력하면 제한이 없음을 의미합니다.)</li>
            </ul>
         </div>
      </div>
      <div class="btns">
         <input type="checkbox" id="chkScaleSave" /><label for="chkScaleSave">설정저장</label>
         <strong><a href="javascript:fnLayerScaleApply();"><input type="button" value="확인" class="btnClose"></a></strong>
         <strong><a href="#"><input type="button" value="닫기" class="btnClose"></a></strong>
      </div>
   </section>
</div>
<!-- 주석 설정 창 -->
<div id="dvLabel" class="popup" draggable="true" style="display:none; width:400px;">
   <span class="popupTitle" id="dvLabelTitle"></span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <nav class="_tab">
         <ul>
            <li class="_tab1 on"><input type="button" value="유효축척"></li>
            <li class="_tab2"><input type="button" value="필드"></li>
            <li class="_tab3"><input type="button" value="글꼴"></li>
            <!-- <li class="_tab4"><input type="button" value="글자정렬"></li>
               <li class="_tab5"><input type="button" value="배경"></li> -->
         </ul>
      </nav>
      <div class="_tabContents">
         <div class="_tab1 on">
            <ul class="entries" style="height: 90px;">
               <li>
                  <input type="radio" id="rdo_LabelInVisible" name="rdo_LabelIsVisible" checked="checked" /><label for="rdo_LabelInVisible">표시하지 않음</label>
               </li>
               <li>
                  <input type="radio" id="rdo_LabelVisible" name="rdo_LabelIsVisible" /><label for="rdo_LabelVisible">유효축척에서만 보임</label>
               </li>
               <li></li>
               <div id="LabelScaleDiv">
                  <li>
                     1 : <input type="text" id="txt_LabelMaxExtent" value="0" onkeypress="alert('d');util.checkNumber(this);" style="width:60px;"/>
                     &lt;= 유효축척 &lt;=  
                     1 : <input type="text" id="txt_LabelMinExtent" value="0" onkeypress="util.checkNumber(this);" style="width:60px;"/>
                  </li>
                  <li>(0을 입력하면 제한이 없음을 의미합니다.)</li>
               </div>
            </ul>
         </div>
         <div class="_tab2">
            <ul class="entries" style="height: 90px;">
               <li>
                  주석필드 : <select id="sel_LabelField" ></select>
                  <input type="checkbox" id="chk_LabelNewLine"><label for="chk_LabelNewLine">새로운 줄</label>
                  <a href="javascript:fnLabelExpressionAdd();"><input type="button" value="추가"></a>
               </li>
               <li>
                  연결자(앞) : <input type="text" id="txt_LabelPrefix" style="width:50px;"/>&nbsp;&nbsp;&nbsp;&nbsp;
                  연결자(뒤) : <input type="text" id="txt_LabelSuffix" style="width:50px;"/> 
               </li>
               <li>표현 : <input type="text" id="txt_LabelExpression" style="width:250px;"/></li>
            </ul>
         </div>
         <div class="_tab3">
            <ul class="entries" style="height: 90px;">
               <li>
                  이름 : 
                  <select id="sel_LabelFontFamily">
                     <option value="Batang">바탕</option>
                     <option value="Gulim">굴림</option>
                     <option value="Dotum">돋음</option>
                     <option value="Gungsuh">궁서</option>
                     <option value="NanumGothic">나눔고딕</option>
                     <option value="Malgun Gothic">맑은고딕</option>
                  </select>
                  &nbsp;&nbsp;
                  크기 :
                  <select id="sel_LabelFontSize" style="width: 50px;">
                     <option value="8">8</option>
                     <option value="9">9</option>
                     <option value="10">10</option>
                     <option value="11">11</option>
                     <option value="12">12</option>
                     <option value="13">13</option>
                     <option value="14">14</option>
                     <option value="15">15</option>
                     <option value="16">16</option>
                     <option value="17">18</option>
                     <option value="19">19</option>
                     <option value="20">20</option>
                     <option value="24">24</option>
                     <option value="26">26</option>
                     <option value="32">32</option>
                     <option value="35">35</option>
                     <option value="36">36</option>
                     <option value="37">37</option>
                     <option value="38">38</option>
                     <option value="40">40</option>
                     <option value="42">42</option>
                     <option value="45">45</option>
                     <option value="48">48</option>
                  </select>
                  &nbsp;pixel
               </li>
               <li>
                  색상 : 
                  <input type="text" id="txt_LabelFontColor" class="ip_color" value="#000000" style="width:60px;"/>
                  <input type="checkbox" id="chk_LabelFontBold" /><label for="chk_LabelFontBold">굵게</label>
                  <!-- 기울임꼴 안됨 -->
                  <!-- <input type="checkbox" id="chk_LabelFontOblique" /><label for="chk_LabelFontOblique">기울임꼴</label> -->
               </li>
            </ul>
         </div>
         <!-- <div class="_tab4">
            <ul class="entries">          	
            </ul>		
            </div>
            <div class="_tab5">
            <ul class="entries">           	
            </ul>		
            </div> -->
      </div>
      <div class="btns">
         <input type="checkbox" id="chkLabelSave" /><label for="chkLabelSave">설정저장</label>
         <strong><a href="javascript:fnLabelApply();"><input class="btnClose" type="button" value="확인"></a></strong>
         <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
      </div>
   </section>
</div>
<!-- 심볼 설정 창 -->
<div id="dvSymbol" class="popup" draggable="true" style="display:none; width:420px;height: 507px;">
   <span class="popupTitle" id="dvSymbolTitle"></span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <nav class="_tab">
         <ul>
            <li class="_tab1 on"><input type="button" value="단일심볼" onclick="fnSimpleSymbol();"></li>
            <li class="_tab2"><input type="button" value="확장심볼" onclick="fnUniqueSymbol();"></li>
         </ul>
      </nav>
      <div class="_tabContents">
         <div class="_tab1 on">
            <div id="dv_simplemarkersymbol" class="simpleSymbol">
               <ul class="entries">
                  <li><label><span>점 속성</span></label></li>
                  <li>유형						    
                     <select id="sel_SimpleMarkerSymbolStyle" style="width:120px">
                        <option value="circle" data-image="/images/map/marker/circle.png"></option>
                        <option value="cross"  data-image="/images/map/marker/cross.png"></option>
                        <option value="diamond" data-image="/images/map/marker/diamond.png"></option>
                        <option value="square" data-image="/images/map/marker/square.png"></option>
                        <option value="x" data-image="/images/map/marker/ximg.png"></option>
                     </select>
                  </li>
                  <li>색상
                     <input type="text" id="txt_SimpleMarkerSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
                  </li>
                  <li>크기
                     <input id="txt_SimpleMarkerSymbolSize" style="width: 50px;" />&nbsp;pixel
                  </li>
               </ul>
            </div>
            <div id="dv_picturemarkersymbol" class="simpleSymbol">
               <ul class="entries">
                  <li><label><span>이미지 속성</span></label></li>
                  <li style="display: none;">유형						    
                     <select id="sel_PictureMarkerSymbolStyle" style="width:120px">
                        <option value="custom">사용자정의</option>
                     </select>
                  </li>
                  <li>색상
                     <input type="text" id="txt_PictureMarkerSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
                  </li>
                  <li>가로
                     <input id="txt_PictureMarkerSymbolSizeW" style="width: 50px;" />&nbsp;pixel
                  </li>
                  <li>세로
                     <input id="txt_PictureMarkerSymbolSizeH" style="width: 50px;" />&nbsp;pixel
                  </li>
               </ul>
            </div>
            <div id="dv_simplelinesymbol" class="simpleSymbol">
               <ul class="entries">
                  <li><label><span>선 속성</span></label></li>
                  <li>유형
                     <select id="sel_SimpleLineSymbolStyle" style="width:120px">
                        <option value="none">없음</option>
                        <option value="solid" data-image="/images/map/solid.png"></option>
                        <option value="dot"  data-image="/images/map/dot.png"></option>
                        <option value="dash" data-image="/images/map/dash.png"></option>
                        <option value="dashdot" data-image="/images/map/dashdot.png"></option>
                        <option value="longdashdotdot" data-image="/images/map/dashdotdot.png"></option>
                     </select>
                  </li>
                  <li>색상
                     <input type="text" id="txt_SimpleLineSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
                  </li>
                  <li>크기
                     <input id="txt_SimpleLineSymbolSize" style="width: 50px;" />&nbsp;pixel
                  </li>
                  <li id="li_SimpleArrowHead">방향표시
                  	<input type="checkbox" id="chkSimpleArrowHead" />(1:3000 이상에서만 표시) 
                  </li>
               </ul>
            </div>
            <div id="dv_simplefillsymbol" class="simpleSymbol">
               <ul class="entries">
                  <li><label><span>면 속성</span></label></li>
                  <li>
                     유형
                     <select id="sel_SimpleFillSymbolStyle" style="width:120px">
                        <option value="none">없음</option>
                        <option value="solid" data-image="/images/map/hatch/solid.png"></option>
                        <option value="backwarddiagonal" data-image="/images/map/hatch/backwarddiagonal.png"></option>
                        <option value="cross" data-image="/images/map/hatch/cross.png"></option>
                        <option value="diagonalcross" data-image="/images/map/hatch/diagonalcross.png"></option>
                        <option value="forwarddiagonal" data-image="/images/map/hatch/forwarddiagonal.png"></option>
                     </select>
                  </li>
                  <li>색상
                     <input type="text" id="txt_SimpleFillSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
                  </li>
               </ul>
            </div>
         </div>
         <div class="_tab2">
            <ul class="entries">
            	<li>
            		<label><span>항목</span></label>
            		<select id="sel_UniqueSymbolDomain" style="width:150px"></select>
            		<label id="lbl_Unique_ArrowHead">
	            		<span>방향표시</span>
	            		<input type="checkbox" id="chkUniqueArrowHead" />
            		</label>
           		</li>
            </ul>
   			<section class="contents">
	            <div style="overflow-y: auto;height: 291px;width: 160px;border: 1px solid #1e67d9;float: left;">
	            	<div id="dv_uniqueSymbolList" class="dv_uniqueSymbolList"></div>
	            </div>
	            <div id="dv_unique_simplemarkersymbol" class="uniqueSymbol">
	               <ul class="entries">
	                  <li><label><span>점 속성</span></label></li>
	                  <li>유형						    
	                     <select id="sel_Unique_SimpleMarkerSymbolStyle" style="width:120px">
	                        <option value="custom">사용자정의</option>
	                        <option value="circle" data-image="/images/map/marker/circle.png"></option>
	                        <option value="cross"  data-image="/images/map/marker/cross.png"></option>
	                        <option value="diamond" data-image="/images/map/marker/diamond.png"></option>
	                        <option value="square" data-image="/images/map/marker/square.png"></option>
	                        <option value="x" data-image="/images/map/marker/ximg.png"></option>
	                     </select>
	                  </li>
	                  <li>색상
	                     <input type="text" id="txt_Unique_SimpleMarkerSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
	                  </li>
	                  <li>크기
	                     <input id="txt_Unique_SimpleMarkerSymbolSize" style="width: 50px;" />&nbsp;pixel
	                  </li>
	               </ul>
	            </div>
	            <div id="dv_unique_picturemarkersymbol" class="uniqueSymbol">
	               <ul class="entries">
	                  <li style="display: none;"><label><span>이미지 속성</span></label></li>
	                  <li style="display: none;">유형						    
	                     <select id="sel_Unique_PictureMarkerSymbolStyle" style="width:120px">
	                        <option value="custom">사용자정의</option>
	                     </select>
	                  </li>
	                  <li>색상
	                     <input type="text" id="txt_Unique_PictureMarkerSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
	                  </li>
	                  <li>가로
	                     <input id="txt_Unique_PictureMarkerSymbolSizeW" style="width: 50px;" />&nbsp;pixel
	                  </li>
	                  <li>세로
	                     <input id="txt_Unique_PictureMarkerSymbolSizeH" style="width: 50px;" />&nbsp;pixel
	                  </li>
	               </ul>
	            </div>
	            <div id="dv_unique_simplelinesymbol" class="uniqueSymbol">
	               <ul class="entries">
	                  <li><label><span>선 속성</span></label></li>
	                  <li>유형
	                     <select id="sel_Unique_SimpleLineSymbolStyle" style="width:120px">
	                        <option value="none">없음</option>
	                        <option value="solid" data-image="/images/map/solid.png"></option>
	                        <option value="dot"  data-image="/images/map/dot.png"></option>
	                        <option value="dash" data-image="/images/map/dash.png"></option>
	                        <option value="dashdot" data-image="/images/map/dashdot.png"></option>
	                        <option value="longdashdotdot" data-image="/images/map/dashdotdot.png"></option>
	                     </select>
	                  </li>
	                  <li>색상
	                     <input type="text" id="txt_Unique_SimpleLineSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
	                  </li>
	                  <li>크기
	                     <input id="txt_Unique_SimpleLineSymbolSize" style="width: 50px;" />&nbsp;pixel
	                  </li>
	               </ul>
	            </div>
	            <div id="dv_unique_simplefillsymbol" class="uniqueSymbol">
	               <ul class="entries">
	                  <li><label><span>면 속성</span></label></li>
	                  <li>
	                     유형
	                     <select id="sel_Unique_SimpleFillSymbolStyle" style="width:120px">
	                        <option value="none">없음</option>
	                        <option value="solid" data-image="/images/map/hatch/solid.png"></option>
	                        <option value="backwarddiagonal" data-image="/images/map/hatch/backwarddiagonal.png"></option>
	                        <option value="cross" data-image="/images/map/hatch/cross.png"></option>
	                        <option value="diagonalcross" data-image="/images/map/hatch/diagonalcross.png"></option>
	                        <option value="forwarddiagonal" data-image="/images/map/hatch/forwarddiagonal.png"></option>
	                     </select>
	                  </li>
	                  <li>색상
	                     <input type="text" id="txt_Unique_SimpleFillSymbolColor" class="ip_color" value="#000000" style="width:60px;"/>
	                  </li>
	               </ul>
	            </div>
	            <div id="dv_UniqueItemApply">
	            	<a href="javascript:fnUniqueItemSymbolApply();"><input type="button" value="       적 용       "></a>
	            </div>
            </section>
         </div>
      </div>
      <div class="btns">
         <input type="checkbox" id="chkSymbolSave" /><label for="chkSymbolSave">설정저장</label>
         <strong><a href="javascript:fnSymbolApply();"><input class="btnClose" type="button" value="확인"></a></strong>
         <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
      </div>
   </section>
</div>