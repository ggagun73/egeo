<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="dvIdentify" class="popup property" draggable="true" style="display:none;left: 52px;top: 30px;">
   <span class="popupTitle">속성조회</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <div class="view">
         <dl>
            <dt>조회결과</dt>
            <!--dd class="itemNumber"><strong>131</strong> 건</dd-->
            <dd>
               <ul>
                  <div id="identifyList"></div>
               </ul>
            </dd>
         </dl>
      </div>
      <section class="detail">
         <div class="wrap">
            <div class="btns" id="viewSearchBtn">
            </div>
            <table>
               <colgroup>
                  <col>
                  <col>
               </colgroup>
               <tbody>
                  <div id="identifyContent"></div>
               </tbody>
            </table>
         </div>
      </section>
   </section>
</div>