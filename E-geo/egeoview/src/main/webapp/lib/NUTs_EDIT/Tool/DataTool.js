/**************************************************************************************************************
 * DataTool 클래스  
 * @author jhchoi
 * @namespace {Object} NUTs.Tool.DataTool 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Tool.DataTool = OpenLayers.Class({


	/**
	 * Property: shp
	 * {Array(<NUTs.Tool.DataTool.Shp>)}: 로딩된 shp 목록
	 */
	shps : null,
	
	/**
	 * Property: dxf
	 * {Array(<NUTs.Tool.DataTool.Dxf>)}: 로딩된 dxf 목록
	 */
	dxfs : null,
	
	mode : null,
	
	initialize: function() {
        this.shps = [];
        this.dxfs = [];
    },
    
    setMode : function(mode){
    	this.mode = mode;
    },
    
    getMode : function(){
    	return this.mode;
    },
	/**********************************************************************************
	* @memberof NUTs.Tool.DataTool
	* @method
	* @description DataTool 개체 초기화
	* @param {String} type 	: "shp", "dxf"
	* @author  ggash(2017.02.20)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	initShp : function() { 
		this.shps = null;			
	},
	
	initDxf : function() { 
		this.dxfs = null;			
	},
	
	/**********************************************************************************
	* @memberof NUTs.Tool.DataTool
	* @method
	* @description 타입("shp", "dxf")에 따른 데이터 추가
	* @param {String} type 	: "shp", "dxf"
	* @param {Object} data 	: NUTs.Tool.DataTool.Shp 개체 또는 NUTs.Tool.DataTool.Dxf 개체
	* @author  ggash(2017.02.20)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	addShp : function( shp ) {		

		for(var i = 0, len = this.shps.length; i < len ; i++){
			if(this.shps == shp || this.shps[i].name == shp.name){
				 return false;
			}
		}
		
		this.shps.push(shp);
 		 
	},
	
	addDxf : function(dxf) {		

		for(var i = 0, len = this.dxfs.length; i < len ; i++){
			if(this.dxfs == dxf || this.dxfs[i].name == dxf.name){
				 return false;
			}
		}
		
		this.dxfs.push(dxf);
	},
	
	removeShp : function (shp) {
		
		for(var i = 0, len = this.shps.length; i < len ; i++){
			if(this.shps == shp || this.shps[i].name == shp.name){
				 this.shps.splice(i,1);
				 break;
			}
		}
	},
	
	removeDxf : function (dxf) {
		
		for(var i = 0, len = this.dxfs.length; i < len ; i++){
			if(this.dxfs == dxf || this.dxfs[i].name == dxf.name){
				 this.dxfs.splice(i,1);
				 break;
			}
		}
	},
	
	/**********************************************************************************
	* @memberof NUTs.Tool.DataTool
	* @method
	* @description 타입("shp", "dxf")에 따른 데이터 추출
	* => id가 지정되지 않은 경우 마지막 추가된 개체 리턴
	* @param {String} type 	: "shp", "dxf"
	* @param {Object} id 	: NUTs.Tool.DataTool.Shp 개체의 id 또는 NUTs.Tool.DataTool.Dxf 개체의 id
	* @author  ggash(2017.02.20)
	* @logs 
	* 수정일				수정자			수정내용
	* ----------------------------------------------------------------------
	*  
	**********************************************************************************/
	getShp : function(name) {
		var shp; 
		var shpLen = this.shps.length;  
				
		if(name){
			for(var i = 0; i < shpLen ; i++){
				var tmpShp = this.shps[i];
				if(tmpShp.name == name){
					shp = tmpShp;
					break;
				}
			}
		}
		else{
			
			if(shpLen === 0){
				var tmpShp = new NUTs.Tool.DataTool.Shp("empty_shp");
				this.addShp(tmpShp);
			}
			
			shp = this.shps[shpLen-1]
		} 
		return shp;
	},
	
	getDxf : function(name) {
		var dxf; 
		var dxfLen = this.dxfs.length;  
			
		if(name){
			for(var i = 0; i < dxfLen ; i++){
				var tmpDxf = this.dxfs[i];
				if(tmpDxf.name == name){
					dxf = tmpDxf;
					break;
				}
			}
		}
		else{
			dxf = this.dxfs[dxfLen-1]
		} 
		return dxf;
	},
	
	CLASS_NAME: "NUTs.Tool.DataTool"
});