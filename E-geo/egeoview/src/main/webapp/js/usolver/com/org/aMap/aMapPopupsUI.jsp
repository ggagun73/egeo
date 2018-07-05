<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="dvAnalysisIcon" class="toolpopup" draggable="true" style="display:none;">
   <img src="../images/map/bg_toolpop.png" alt="" class="point"/>
   <div class="tbody">
      <section class="contents">
         <a href="#"><img id="mapCtrl18" src="../images/popup/btn_cross.png" overSrc="../images/popup/btn_cross_ov.png" normalSrc="../images/popup/btn_cross.png" selectCtrl="on" alt="횡단면도" title="횡단면도" />
         </a>
         <a href="#"><img id="mapCtrl19" src="../images/popup/btn_topo.png" overSrc="../images/popup/btn_topo_ov.png" normalSrc="../images/popup/btn_topo.png" selectCtrl="on" alt="지형단면도" title="지형단면도" />
         </a>
         <a href="#"><img id="mapCtrl20" src="../images/popup/btn_watercon.png" overSrc="../images/popup/btn_watercon_ov.png" normalSrc="../images/popup/btn_watercon.png" selectCtrl="on" alt="차단제수변" title="차단제수변" />
         </a>
      </section>
   </div>
</div>
<div id="dvBookmarks" class="popup" draggable="true" style="display:none; width:250px;top: 30px;">
   <span class="popupTitle">관심영역</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <div id="bookmarks" class="esriBookmarks"></div>
      <!--button id="clear-storage">북마크 삭제</button-->
   </section>
</div>
<!-- 최규용 차단제수변분석결과  추가   -->
<div id="attrSearch" class="popup property" draggable="true" style="display:none;  top:300px; left:150px;">
   <span class="popupTitle">차단제수변분석결과</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="$('#attrSearch').hide();">
   <section class="contents">
      <div class="view">
         <dl>
            <dt>조회</dt>
            <dd class="itemNumber"></dd>
            <dd>
               <ul>
                  <li><a href="javascript:waterworksPipeList();" target="_self">상수관로</a>
                  </li>
                  <li><a href="javascript:waPipeCloseList();" target="_self">제수변</a>
                  </li>
                  <li><a href="javascript:waterPipeList();" target="_self">급수관</a>
                  </li>
                  <li><a href="javascript:waterPipeMeterList();" target="_self">급수관계량기</a>
                  </li>
               </ul>
            </dd>
         </dl>
      </div>
      <section class="detail" style="width:800px; height:300px; overflow-y:auto; overflow-x:auto;">
         <input type="button" value="위치확인" style="width:95px; float: left; padding-left:16px; margin-bottom: 10px;" onclick="javascript:waPipeLocationSearch();" />
         <div class="wrap" id="wworkPipeListBox">
            <div id="wworksPipeList">
            </div>
         </div>
      </section>
   </section>
</div>