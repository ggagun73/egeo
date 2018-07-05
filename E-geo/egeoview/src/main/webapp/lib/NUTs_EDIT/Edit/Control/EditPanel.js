/**************************************************************************************************************
 * EditPanel 클래스
 * @author jhchoi 
 * @namespace {Object} NUTs.Edit.Control.EditPanel
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/


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
    
       
    /**
	* @memberof NUTs.Edit.Control.EditPanel
	* @method
	* @description   EditPanel상의 control클릭 시 활성화 처리.
	* @param {Object} control :  활성화할 control
	*/
    activateControl: function (control) {

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