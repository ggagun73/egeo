/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/SLD/v1_1.js
 * @requires OpenLayers/Format/Filter/v1_1_0.js
 */

/**
 * Class: OpenLayers.Format.SLD.v1_1_0
 * Write SLD version 1.1.0.
 * 
 * Inherits from:
 *  - <OpenLayers.Format.SLD.v1_1>
 */

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
