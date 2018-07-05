<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<style>
   <!--
      .PropTitle {text-align: left;}
      .esriSymbolEditor {display: none !important;} /* 텍스트를 회전/크기 날리면 이상한게 나옴 */
      -->
</style>
<div id="dvUserGraphicsIcon" class="toolpopup" draggable="true" style="display:none;">
   <img src="../images/map/bg_toolpop.png" alt="" class="point"/>
   <div class="tbody">
      <section class="contents">
         <a href="javascript:fnUserGraphicToolbarSet('');"><img id="mapCtrl101" src="../images/popup/btn_drawStyle.png" overSrc="../images/popup/btn_drawStyle_ov.png" normalSrc="../images/popup/btn_drawStyle.png" selectCtrl="on" alt="도형기본" title="도형기본" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('point');"><img id="mapCtrl102" src="../images/popup/btn_point.png" overSrc="../images/popup/btn_point_ov.png" normalSrc="../images/popup/btn_point.png" selectCtrl="on" alt="점 그리기" title="점 그리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('polyline');"><img id="mapCtrl103" src="../images/popup/btn_polyline.png" overSrc="../images/popup/btn_polyline_ov.png" normalSrc="../images/popup/btn_polyline.png" selectCtrl="on" alt="선 그리기" title="선 그리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('polygon');"><img id="mapCtrl104" src="../images/popup/btn_polygon.png" overSrc="../images/popup/btn_polygon_ov.png" normalSrc="../images/popup/btn_polygon.png" selectCtrl="on" alt="면 그리기" title="면 그리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('freehandpolyline');"><img id="mapCtrl105" src="../images/popup/btn_freehand_polyline.png" overSrc="../images/popup/btn_freehand_polyline_ov.png" normalSrc="../images/popup/btn_freehand_polyline.png" selectCtrl="on" alt="자유선 그리기" title="자유선 그리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('freehandpolygon');"><img id="mapCtrl106" src="../images/popup/btn_freehand_polygon.png" overSrc="../images/popup/btn_freehand_polygon_ov.png" normalSrc="../images/popup/btn_freehand_polygon.png" selectCtrl="on" alt="자유면 그리기" title="자유면 그리기" />
         </a>
         <!-- a href="javascript:fnUserGraphicToolbarSet('multi_point');"><img id="mapCtrl107" src="../images/popup/btn_doublearrow_next.gif" overSrc="../images/popup/btn_doublearrow_next.gif"  normalSrc="../images/popup/btn_doublearrow_next.gif"   selectCtrl="off" alt="다음" title="다음"/></a>                                      
            <a href="javascript:fnUserGraphicToolbarSet('triangle');"><img id="mapCtrl108" src="../images/popup/btn_doublearrow_next.gif" overSrc="../images/popup/btn_doublearrow_next.gif"  normalSrc="../images/popup/btn_doublearrow_next.gif"   selectCtrl="off" alt="다중점형" title="다중점형"/></a-->
         <a href="javascript:fnUserGraphicToolbarSet('circle');"><img id="mapCtrl109" src="../images/popup/btn_circle.png" overSrc="../images/popup/btn_circle_ov.png" normalSrc="../images/popup/btn_circle.png" selectCtrl="on" alt="원 그리기" title="원 그리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('ellipse');"><img id="mapCtrl110" src="../images/popup/btn_ellipse.png" overSrc="../images/popup/btn_ellipse_ov.png" normalSrc="../images/popup/btn_ellipse.png" selectCtrl="on" alt="타원 글리기" title="타원 글리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('rectangle');"><img id="mapCtrl111" src="../images/popup/btn_rectangle.png" overSrc="../images/popup/btn_rectangle_ov.png" normalSrc="../images/popup/btn_rectangle.png" selectCtrl="on" alt="사각형 그리기" title="사각형 그리기" />
         </a>
         <a href="javascript:fnUserGraphicToolbarSet('text');"><img id="mapCtrl112" src="../images/popup/btn_text.png" overSrc="../images/popup/btn_text_ov.png" normalSrc="../images/popup/btn_text.png" selectCtrl="on" alt="글자입력" title="글자입력" />
         </a>
         <a href="javascript:fnUserGraphicClear();"><img id="mapCtrl113" src="../images/popup/btn_eraser.png" overSrc="../images/popup/btn_eraser_ov.png" normalSrc="../images/popup/btn_eraser.png" selectCtrl="off" alt="전체 도형지우기" title="전체 도형지우기" />
         </a>
         <a href="javascript:fnUserGraphicSaveToFile();"><img id="mapCtrl114" src="../images/popup/btn_drawSave.png" overSrc="../images/popup/btn_drawSave_ov.png" normalSrc="../images/popup/btn_drawSave.png" selectCtrl="off" alt="도형을 파일로 저장" title="도형을 파일로 저장" />
         </a>
         <!-- following information Only IE10+ -->
         <!-- <a href="javascript:fnFileOpenUserGraphics();">
            <span id="fileInputForm" style="float:right; top:42px; width:22px; height:21px; overflow:hidden; cursor:pointer; background-image:url('../images/popup/btn_drawList.png');">
            <input type="file" style="position：absolute; margin-left:-10px; width:22px; height:18px; filter:alpha(opacity=0); opacity:0; -moz-opacity:0; cursor:pointer;"" onChange="fnFileOpenUserGraphics(event);">
            </span>
            </a> -->
         <a href="#">
         <img id="mapCtrl115" src="../images/popup/btn_drawList.png" overSrc="../images/popup/btn_drawList.png" normalSrc="../images/popup/btn_drawList.png" selectCtrl="off" alt="도형저장된 파일 열기" title="도형저장된 파일 열기" />
         </a>
      </section>
   </div>
</div>
<div id="dvUserGraphicsProp" class="popup" draggable="true" style="display:none; top:30px; left: 52px; width:300px;">
   <span class="popupTitle">도형 스타일설정</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <ul id="graphic_pointStyleSet" class="entries">
         <li>
            <label>
            <span class="PropTitle">점속성</span>
            </label>
         </li>
         <li>
            <label>
            <span>색상</span>
            <input type="text" id="graphic_pointColorPicker" class="ip_color" value="#000000" style="width:50px;height:20px;">
            </label>
         </li>
         <li>
            <label>
               <span>모양</span>
               <select id="graphic_pointStyle" class="tech" style="width:120px">
                  <option value="circle" data-image="/images/map/marker/circle.png"></option>
                  <option value="cross"  data-image="/images/map/marker/cross.png"></option>
                  <option value="diamond" data-image="/images/map/marker/diamond.png"></option>
                  <option value="square" data-image="/images/map/marker/square.png"></option>
                  <option value="x" data-image="/images/map/marker/ximg.png"></option>
               </select>
            </label>
         </li>
         <li>
            <label>
            <span>크기</span>
            <input id="graphic_pointSize" onkeypress="util.checkNumber(this);" type="text" style="width:50px" value="1">
            </label>
         </li>
         <li>
            <label>
               <span>투명도</span>
               <input id="graphic_pointTransparency" readonly="readonly" type="text" style="width:50px" value="100" /> %
               <br/>
               <div id="graphic_pointTransparency_slider" sytle="width:50px;"></div>
            </label>
         </li>
      </ul>
      <ul id="graphic_polylineStyleSet" class="entries">
         <li>
            <label>
            <span class="PropTitle">선속성</span>
            </label>
         </li>
         <li>
            <label>
            <span>색상</span>
            <input type="text" id="graphic_lineColorPicker" class="ip_color" value="#000000" style="width:50px;height:20px;">
            </label>
         </li>
         <li>
            <label>
               <span>모양</span>
               <select name="graphic_lineStyle" class="tech" id="graphic_lineStyle" style="width:120px">
                  <option value="solid" data-image="/images/map/solid.png"></option>
                  <option value="dot"  data-image="/images/map/dot.png"></option>
                  <option value="dash" data-image="/images/map/dash.png"></option>
                  <option value="dashdot" data-image="/images/map/dashdot.png"></option>
                  <option value="dashdotdot" data-image="/images/map/dashdotdot.png"></option>
               </select>
            </label>
         </li>
         <li>
            <label>
            <span>두께</span>
            <input id="graphic_lineWeight" onkeypress="util.checkNumber(this);" type="text" style="width:50px" value="1">
            </label>
         </li>
         <li>
            <label>
               <span>투명도</span>
               <input id="graphic_lineTransparency" readonly="readonly" type="text" style="width:50px" value="100" /> %
               <br/>
               <div id="graphic_lineTransparency_slider" sytle="width:50px;"></div>
            </label>
         </li>
      </ul>
      <ul id="graphic_polygonStyleSet" class="entries">
         <li>
            <label>
            <span class="PropTitle">채우기속성</span>
            </label>
         </li>
         <li>
            <label>
               <span>모양</span>
               <select name="graphic_polygonFillStyle" class="tech" id="graphic_polygonFillStyle" style="width:120px">
                  <option value="solid" data-image="/images/map/hatch/solid.png"></option>
                  <option value="backwarddiagonal" data-image="/images/map/hatch/backwarddiagonal.png"></option>
                  <option value="cross" data-image="/images/map/hatch/cross.png"></option>
                  <option value="diagonalcross" data-image="/images/map/hatch/diagonalcross.png"></option>
                  <option value="forwarddiagonal" data-image="/images/map/hatch/forwarddiagonal.png"></option>
                  <!--option value="HORIZONTAL" data-image="../images/map/hatch/horizontal.png></option-->
                  <!--option value="VERTICAL" data-image="../images/map/hatch/vertical.png"></option-->
               </select>
            </label>
         </li>
         <li>
            <label>
            <span>색상</span>
            <input type="text" id="graphic_polygonColorPicker" class="ip_color" value="#000000" style="width:50px;height:20px;">
            </label>
         </li>
         <li>
            <label>
               <span>투명도</span>
               <input id="graphic_polygonTransparency" readonly="readonly" type="text" style="width:50px" value="100" /> %
               <br/>
               <div id="graphic_polygonTransparency_slider" sytle="width:50px;"></div>
            </label>
         </li>
      </ul>
      <input type="checkbox" id="chkUserGraphicSave" /><label for="chkUserGraphicSave">저장</label>
      <strong><a href="javascript:fnGraphicStyleApply();"><input type="button" value="확인"></a></strong>
      <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
      <p class="note">
      </p>
   </section>
</div>
<div id="dvUserGraphicsTextProp" class="popup" draggable="true" style="display:none; top:30px; left: 52px; width:300px;">
   <span class="popupTitle">주석설정</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <ul id="graphic_textStyleSet" class="entries">
         <li>
            <label><span class="PropTitle">주석내용</span></label>
         </li>
         <li>
            <label>
            <span>문자열</span>
            <input type="text" id="graphic_textContent" style="width:100px;height:20px;">
            </label>
         </li>
         <li>
            <label><span class="PropTitle">주석심볼</span></label>
         </li>
         <li>
            <label>
               <span>폰트</span>
               <select id="graphic_textFamily">
                  <option value="Batang">바탕</option>
                  <option value="Gulim">굴림</option>
                  <option value="Dotum">돋음</option>
                  <option value="Gungsuh">궁서</option>
                  <option value="NanumGothic">나눔고딕</option>
                  <option value="Malgun Gothic" selected="selected">맑은고딕</option>
               </select>
            </label>
         </li>
         <li>
            <label>
            <span>크기</span>
            <input type="text" id="graphic_textSize" onkeypress="util.checkNumber(this);" value="20" style="width:50px;height:20px;">
            </label>
         </li>
         <li>
            <label>
            <span>색상</span>
            <input type="text" id="graphic_textColor" class="ip_color" value="#000000" style="width:50px;height:20px;background-color: #000000;color: #000000;">
            </label>
         </li>
         <li>
            <label>
               <span>수평정렬</span>
               <select id="graphic_textHorizontalAlignment">
                  <option value="left">왼쪽 정렬</option>
                  <option value="right">오른쪽 정렬</option>
                  <option value="center" selected="selected">가운데 정렬</option>
               </select>
            </label>
         </li>
         <li id="li_graphic_textVerticalAlignment">
            <label>
               <span>수직정렬</span>
               <select id="graphic_textVerticalAlignment">
                  <option value="top">위쪽 정렬</option>
                  <option value="bottom">아래쪽 정렬</option>
                  <option value="middle" selected="selected">가운데 정렬</option>
                  <option value="baseline">기준선 정렬</option>
               </select>
            </label>
         </li>
         <li>
            <label>
            <span>회전각도</span>
            <input type="text" id="graphic_textAngle" maxlength="3" onkeypress="util.checkNumber(this);" value="0" style="width:50px;height:20px;">
            </label>
         </li>
      </ul>
      <input type="checkbox" id="chkUserGraphicTextSave" /><label for="chkUserGraphicTextSave">저장</label>
      <strong><a href="javascript:fnGraphicTextApply();"><input type="button" value="확인"></a></strong>
      <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
      <p class="note">
      </p>
   </section>
</div>
<!-- 도형 저장 -->
<div id="dvUserGraphicsSave" class="popup" style="display:none; top:155px; left: 600px;">
   <span class="popupTitle">도형 파일저장</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      파일명:
      <input id="draw_name" type="text" style="width:100px" value="" />
      <strong><a><input class="btnClose" type="button" value="저장하기" onclick="fnFileSaveUserGraphics();"></a></strong>
   </section>
</div>