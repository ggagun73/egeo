/**********************************************
 * 클래스명 : OpenLayers.Editor.Control.EditorCustomPanel
 * 설  명 : 커스터마이징 Editor Panel .
 * 인  자 : -
 * 사용법 : -
 *
 * 수정일        수정자      수정내용
 * ------        ------     -------------------
 * 2015.08.03    최재훈      신규작업
 *
 */

NUTs.Edit.Control.EditPanel = OpenLayers.Class(OpenLayers.Editor.Control.EditorPanel, {
    /*
     * {boolean} Whether to show by default. Leave value FALSE and show by starting editor's edit mode.
     */
    autoActivate: false,
    
    /**
     * Constructor: OpenLayers.Editor.Control.EditorPanel
     * Create an editing toolbar for a given editor.
     *
     * Parameters:
     * editor - {<OpenLayers.Editor>}
     * options - {Object}
     */
    initialize: function (editor, options) {
        OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);
    },
    
    draw: function() {
        OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
        if (!this.active) {
            this.div.style.display = 'none';
        }
        return this.div;
    },
    
    redraw: function(){
        if (!this.active) {
            this.div.style.display = 'none';
        }
        
        OpenLayers.Control.Panel.prototype.redraw.apply(this, arguments);
        
        if (this.active) {
            this.div.style.display = '';
        }
    },
    
       
    /**********************************************
     * 함수명 : activateControl
     * 설  명 : EditPanel상의 control클릭 시 수행.
     * 인  자 : 활성화할 control
     * 사용법 : activateControl(control)
     *
     * 수정일        수정자      수정내용
     * ------        ------     -------------------
     * 2015.07.27    최재훈      신규작업
     *
     */
    activateControl: function (control) {

    	//alert('OpenLayers.Editor.Control.EditorPanel.Custom - activateControl');
    	map.deActiveAllControls();
    	
        if (!this.active) { return false; }
        if (control.type == OpenLayers.Control.TYPE_BUTTON) {
            control.trigger();
            return;
        }
        if (control.type == OpenLayers.Control.TYPE_TOGGLE) {
            if (control.active) {
                control.deactivate();
            } else {
                control.activate();
            }
            return;
        }
        if (this.allowDepress && control.active) {
            control.deactivate();
        } else {
            var c;
            for (var i=0, len=this.controls.length; i<len; i++) {
                c = this.controls[i];
                if (c != control &&
                   (c.type === OpenLayers.Control.TYPE_TOOL || c.type == null)) {
                    c.deactivate();
                }
            }
            control.activate();
        }
    },
    CLASS_NAME: 'NUTs.Edit.Control.EditPanel'
});