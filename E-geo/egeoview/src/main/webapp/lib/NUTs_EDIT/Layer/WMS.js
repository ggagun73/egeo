/**************************************************************************************************************
 * WMS Layer 클래스 
 * @namespace {Object} NUTs.Layer.WMS
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  

NUTs.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.WMS, {
	
	/**
	 * MUHAN 설정에 맞게 Default 값 정의
	 */
	DEFAULT_PARAMS: { 
		service: "WMS",
		version: "1.3.0",
		request: "GetMap",
		styles: "",
		exceptions: "application/vnd.ogc.se_inimage",
		format: "image/jpeg",
		crs : "SR_ORG:6640",
		transparent: true
    },
	
	/**
	 * 싱글 타일 사용 여부
	 * 디폴트로 싱글 타일 사용 (현재 싱글 타일이 속도가 빠름)
	 */
	singleTile: true,
	
	/**
	 * 싱글 타일 시 지도 객체 화면 대비 불러올 이미지 비율
	 * 비율이 높을 수록 이동 시 속도는 빠르지만 호출 속도가 느려짐 (1:1 비율 default)
	 */
	ratio : 1,
	
	/**
	 * 타일 서비스 시에 불러올 타일의 비율
	 */
	buffer : 0,
	
	/**
	 * 화면 조작 시 이벤트
	 */
	transitionEffect : "resize",

    yx : {},
    
	/**
	* @memberof NUTs.Layer.WMS
	* @method
	* @description 생성자 함수
	* @param {String} name : 레이어 명
	* @param {String} url : 타일 서비스 주소
	* @param {String} layername : 타일 레이어 이름
	* @param {Object} options : Layer options
	*/
	initialize: function(name, url, params, options) {
		//필수 파라미터 체크
		if(NUTs.Util.debug) this.chkParams(name, url, params, options);
		
		if(params.yx){
			this.yx = params.yx;	
		}
		
        var newArguments = [];
        //uppercase params
        params = OpenLayers.Util.upperCaseObject(params);
        if (parseFloat(params.VERSION) >= 1.3 && !params.EXCEPTIONS) {
            params.EXCEPTIONS = "INIMAGE";
        } 
        delete params.yx;
        
        newArguments.push(name, url, params, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
        OpenLayers.Util.applyDefaults(
                       this.params, 
                       OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS)
                       );


        //layer is transparent        
        if (!this.noMagic && this.params.TRANSPARENT && 
            this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            
            // unless explicitly set in options, make layer an overlay
            if ( (options == null) || (!options.isBaseLayer) ) {
                this.isBaseLayer = false;
            } 
            
            // jpegs can never be transparent, so intelligently switch the 
            //  format, depending on teh browser's capabilities
            if (this.params.FORMAT == "image/jpeg") {
                this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif"
                                                                 : "image/png";
            }
        }

    },
	

	/**
	* @memberof NUTs.Layer.WMS
	* @method
	* @description WMS 호출 파라미터 반환
	* @param {String} property : 반환할 프로퍼티 명 
	*/
	getParam: function(property) {
		if(property) {
			for(var i in this.params) {
				if(i.toUpperCase() == property.toUpperCase()) {
					return this.params[i];
				}
			}
			/* 에러 처리 방안 후 일괄 처리
			alert('GWMS 레이어 : 현재 레이어에 지정한 Property 가 없습니다.');
			*/
			return false;
		}
		else {
			/* 에러 처리 방안 후 일괄 처리
			alert('GWMS 레이어 : property를 지정하여 주십시오.');
			*/
		}
	},
	

	/**
	* @memberof NUTs.Layer.WMS
	* @method
	* @description WMS 호출 파라미터들 반환 
	*/
	getParams: function() {
		return this.params;
	},
	

	/**
	* @memberof NUTs.Layer.WMS
	* @method
	* @auth
	* @description options 을 체크 하고 변형 생성한다
	* @param {String} name : 레이어 명
	* @param {String} url : 타일 서비스 주소
	* @param {String} layername : 타일 레이어 이름
	* @param {Object} options : Layer options
	*/
	chkParams : function(name, url, params, options){
		//name 체크
		if(!name) {
			NUTs.Util.create_obj(this, "Layer Name(레이어 명)");
		}
		else if(!url) {
			NUTs.Util.create_obj(this, "Url (서비스 주소)");
		}
		else if(!(params && params.layers)) {
			NUTs.Util.create_obj(this, "Parameter layers (요청 레이어 명 리스트)");
		}
	},
						
	CLASS_NAME: "NUTs.Layer.WMS"
});