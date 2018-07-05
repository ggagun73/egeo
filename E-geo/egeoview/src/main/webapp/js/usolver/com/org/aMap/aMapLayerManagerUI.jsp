<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<style>
   <!--
      .layerNameLabel {color:black;font-size:12px;font-family:Malgun Gothic;}
      .subLyrLi {float: left; width: 160px;}
      -->
</style>
<!-- 최규용  추가 레이어관리창 div  -->
<div id="dvLayerManager" class="popup mapManager" style="display:none;">
   <span class="popupTitle">레이어관리</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기"">
   <section class="contents">
      <section class="left">
         <ul class="entries">
            <li>
               <div id="myGroupLayerSelect">
                  <select id="myGroupLyrSelectBox" style="width:200px;" onchange="fnGroupLayersBind();">
                  </select>
               </div>
            </li>
            <li class="address">
               <input type="button" value="그룹 저장" style="width:95px;" onclick="fnGroupDivShow();"/>
               <input type="button" value="그룹삭제" style="width:95px;" onclick="fnGroupDelete();"/>
            </li>
            <li>
               <!--input type="checkbox" value="전체선택" onclick="javascript:setMyListAllcheck(this);"/>&nbsp;전체 선택&nbsp;&nbsp;&nbsp;&nbsp;-->
               <!--input type="button" value="삭제" style="width:95px;" onclick="javascript:setMyLyrListDelete();"/-->
            </li>
         </ul>
         <ul class="entries">
            <li>
               <div class="view" style="height:300px; overflow-y: scroll; padding-top: 5px;">
                  <dl>
                     <dt></dt>
                     <dd class="itemNumber"></dd>
                     <dd>
                        <ul>
                           <div id="myLayerList">
                           </div>
                        </ul>
                     </dd>
                  </dl>
               </div>
            </li>
         </ul>
         <div class="btns" style="padding-left:50px;">
            <strong><a href="javascript:fnLayerManagerApply();"><input type="button" value="확인"></a></strong>
            <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
            <!--a href="javascript:setReOrder();"><input type="button" value="재정렬"></a-->
         </div>
      </section>
      <section class="right" style="width: 550px;">
         <div class="btns">
            <div>
               분류 &nbsp;
               <select id="sel_GroupLayer" style="width:200px;" onchange="fnBindLayerList(this.value);">
                  <option value="all">전체</option>
               </select>
            </div>
         </div>
         <div class="wrap">
            <div class="data">
               <ul id="ulLayerList">
               </ul>
            </div>
         </div>
      </section>
   </section>
</div>
<!-- 최규용 그룹명 저장 추가   -->
<div id="dvGroup" class="popup" draggable="true" style="display:none; top:190px; left: 580px;">
   <span class="popupTitle">그룹명 저장하기</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기"">
   <section class="contents">
      그룹명:<input id="txt_groupname" type="text" style="width:100px" value=""/>
      <strong><a href="javascript:fnGroupSave();"><input type="button" value="저장"></a></strong>
      <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
   </section>
</div>
