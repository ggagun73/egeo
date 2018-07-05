/**************************************************************************************************************
 * SLD.v1_0_0 클래스
 * @namespace {Object} NUTs.Format.SLD.v1_0_0 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Format.SLD.v1_0_0 = OpenLayers.Class(
		NUTs.Format.SLD.v1, {
    
    /**
     * Constant: VERSION
     * {String} 1.0.0
     */
    VERSION: "1.0.0",
    
    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/sld
     *   http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd
     */
    schemaLocation: "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd",

    /**
     * Constructor: OpenLayers.Format.SLD.v1_0_0
     * Instances of this class are not created directly.  Use the
     *     <OpenLayers.Format.SLD> constructor instead.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    CLASS_NAME: "OpenLayers.Format.SLD.v1_0_0" 

});
