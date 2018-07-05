<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="wndSplyLs" class="popup" style="display:none;">
   <span class="popupTitle">관말시설물 확인</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="editorEnd();">
   <section class="contents">
      <div>
         <ul>
            <li>
               <label>
               <input id="addFeatureMetaPs" type="checkbox" name="chkSplyLs" />급수전계량기</label>
            </li>
            <li>
               <label>
               <input id="addFeatureFirePs118" type="checkbox" name="chkSplyLs" />급수탑</label>
            </li>
            <li>
               <label>
               <input id="addFeatureFirePs119" type="checkbox" name="chkSplyLs" />소화전</label>
            </li>
         </ul>
      </div>
      <button onclick="fnMapInsertWtlSplyLsAttribute3();">확인</button>
      <button class="btnClose" onclick="editorEnd();">취소</button>
   </section>
</div>
<div id="wndConnectRdtInchDtByRdlRdarAs" class="popup" style="display:none;">
   <span class="popupTitle">IC위치편집</span>
   <input type="image" class="close" src="../images/popup/btn_close.gif" alt="X" title="닫기" onclick="fnConnectRdtInchDtByRdlRdarAsClose();">
   <section class="contents">
      <div>
         <ul id="wndConnectRdtInchDtByRdlRdarAs_ul" style="height: 100px;overflow-y:auto;">
         </ul>
      </div>
      <br />
      <button onclick="fnRemoveInchCheckBox();">목록삭제</button>
      <button onclick="fnSaveIchIdnInRdlRdarAs();">확인</button>
      <button class="btnClose" onclick="fnConnectRdtInchDtByRdlRdarAsClose();">취소</button>
   </section>
</div>