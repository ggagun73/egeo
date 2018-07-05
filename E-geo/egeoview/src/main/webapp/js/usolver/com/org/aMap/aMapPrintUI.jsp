<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!--고급인쇄 신규 버전-->
<div id="dvSaveToPDF" class="popup" style="display:none; width:380px;">
   <span class="popupTitle">지도출력</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기">
   <section class="contents">
      <ul class="entries">
         <li>
            <label>
            <span>지도제목</span>
            <input type="text" id="txt_Title" style="width:222px" />
            </label>
         </li>
         <li>
            <label>
               <span>출력 형식</span>
               <select id="sel_Template" style="width:150px;">
                  <option value="A0L">A0-가로</option>
                  <option value="A0P">A0-세로</option>
                  <option value="A1L">A1-가로</option>
                  <option value="A1P">A1-세로</option>
                  <option value="A2L">A2-가로</option>
                  <option value="A2P">A2-세로</option>
                  <option value="A3L">A3-가로</option>
                  <option value="A3P">A3-세로</option>
                  <option value="A4L">A4-가로</option>
                  <option value="A4P" selected="selected">A4-세로</option>
               </select>
            </label>
         </li>
         <li>
             <label><span>축척설정</span></label>
             <input id="chk_scale" type="checkbox" onchange="fnIsScale(this);" />
             1 : <input id="txt_scale" onkeypress="util.checkNumber(this);" type="text" style="width:123px" disabled="disabled">
         </li>
         <!-- <li>
            <label><span>표시설정</span></label>
            <span><label for="chkCompass">방위표</label></span>
            <input type="checkbox" id="chkCompass" checked="checked" />&nbsp;
            <span><label for="chkCompass">축척바</label></span>
            <input type="checkbox" id="chkScalebar" checked="checked" />
         </li> -->
      </ul>
      <div class="btns" style="text-align: center;">
	      <strong><a href="javascript:fnSaveToPDF();"><input type="button" value="PDF생성"></a></strong>
	      <strong><a href="#"><input class="btnClose" type="button" value="닫기"></a></strong>
      </div>
      <p class="note">
      	<strong>고품질 출력</strong>을 위해 <strong>PDF파일로 저장</strong>합니다.<br />
      	용지사이즈가 A2 이상 일 경우 시간이 오래 걸릴 수 있습니다.
      </p>
   </section>
</div>
<!-- 최규용 고급인쇄 다이얼로그창  추가   -->
<!--div  id="dialog" title="Save to PDF" style="width: 350px"></div-->
<div dojoType="dijit.Dialog" id="dialog" title="Save to PDF" style="width: 350px"></div>