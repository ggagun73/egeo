/**************************************************************************************************************
 * TileCache Layer 클래스 
 * @namespace {Object} NUTs.Layer.TileCache
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  

NUTs.Layer.TileCache = OpenLayers.Class(OpenLayers.Layer.TileCache, {

	version : null,
	

	transitionEffect: 'resize',
	

	buffer: 0,

	/**
	* @memberof NUTs.Layer.TileCache
	* @method
	* @description 생성자 함수
	*/
	initialize: function(name, url, layername, options) {
		//필수 파라미터 체크
		if(NUTs.Util.debug) this.chkParams(name, url, layername, options);
		
		this.layername = layername;
        OpenLayers.Layer.Grid.prototype.initialize.apply(this,
                                                         [name, url, {}, options]);
        this.extension = this.format.split('/')[1].toLowerCase();
        //this.extension = (this.extension == 'jpg') ? 'jpeg' : this.extension;
    },

	/**
	* @memberof NUTs.Layer.TileCache
	* @method
	* @auth
	* @description URL 생성 함수
	*/
	getURL: function(bounds) {
    
        var res = this.map.getResolution();
        var bbox = this.maxExtent;
        var size = this.tileSize;
        /*
        var tileX = Math.round((bounds.left - bbox.left) / (res * size.w));
        var tileY = Math.round((bounds.bottom - bbox.bottom) / (res * size.h));
        var tileZ = this.serverResolutions != null ?
        */
        var tileX = bounds.bottom;
        var tileY = bounds.left;
        var tileZ = this.serverResolutions != null ?
            OpenLayers.Util.indexOf(this.serverResolutions, res) :
            this.map.getZoom();
             
        /**
         * Zero-pad a positive integer.
         * number - {Int} 
         * length - {Int} 
         *
         * Returns:
         * {String} A zero-padded string
         */
        
        function zeroPad(number, length) {
            number = String(number);
            var zeros = [];
            for(var i=0; i<length; ++i) {
                zeros.push('0');
            }
            return zeros.join('').substring(0, length - number.length) + number;
        }
        var components = [
            this.layername,
            zeroPad(tileZ, 2),
            /**
            zeroPad(parseInt(203676.18 / 1000000), 3),
            zeroPad((parseInt(203676.18 / 1000) % 1000), 3),
            zeroPad((parseInt(203676.18) % 1000), 3),
            zeroPad(parseInt(197361.87 / 1000000), 3),
            zeroPad((parseInt(197361.87 / 1000) % 1000), 3),
            zeroPad((parseInt(197361.87 ) % 1000), 3) + '.' + this.extension
            */
            zeroPad(parseInt(tileX / 1000000), 3),
            zeroPad((parseInt(tileX / 1000) % 1000), 3),
            zeroPad((parseInt(tileX) % 1000), 3),
            zeroPad(parseInt(tileY / 1000000), 3),
            zeroPad((parseInt(tileY / 1000) % 1000), 3),
            zeroPad((parseInt(tileY ) % 1000), 3) + '.' + this.extension
        ]; 
        var path = components.join('/');  
		/*
		 * 버전정보가 설정 되어 있을 경우 버전 정보에 맞게 수정
		 */
		if(this.version) path += "?v=" + this.version;
        var url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        } 
        url = (url.charAt(url.length - 1) == '/') ? url : url + '/';
        return url + path;
    },	
	
	/**
	* @memberof NUTs.Layer.TileCache
	* @method
	* @auth
	* @description options 을 체크 하고 변형 생성한다
	* @param {String} name : 레이어 명
	* @param {String} url : 타일 서비스 주소
	* @param {String} layername : 타일 레이어 이름
	* @param {Object} options : Layer options
	*/
	chkParams : function(name, url, layername, options){
		//name 체크
		if(!name) {
			NUTs.Util.create_obj(this, "Layer Name(레이어 명)");
		}
		if(!url) {
			NUTs.Util.create_obj(this, "Url (서비스 주소)");
		}
		if(!layername) {
			NUTs.Util.create_obj(this, "TileCache Layer Name (타일 서비스 이름)");
		}
	},

	CLASS_NAME: "NUTs.Layer.TileCache"
});
