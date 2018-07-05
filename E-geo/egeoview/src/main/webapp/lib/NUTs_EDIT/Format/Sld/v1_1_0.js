/**************************************************************************************************************
 * SLD.v1_1_0 클래스
 * @namespace {Object} NUTs.Format.SLD.v1_1_0 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Format.SLD.v1_1_0 = OpenLayers.Class(
		NUTs.Format.SLD.v1_1, {
    
    /**
     * Constant: VERSION
     * {String} 1.1.0
     */
    VERSION: "1.1.0",
    
    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/sld
     *   http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd
     */
    schemaLocation: "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd",

    initialize: function(options) {
    	NUTs.Format.SLD.v1_1.prototype.initialize.apply(
            this, [options]
        );
    },

    CLASS_NAME: "NUTs.Format.SLD.v1_1_0" 

});
