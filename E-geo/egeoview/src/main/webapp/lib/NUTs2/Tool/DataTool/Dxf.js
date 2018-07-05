
NUTs.Tool.DataTool.Dxf = OpenLayers.Class(NUTs.Tool.DataTool, {
		 /**
	     * Property: maxFeatureLength
	     * {String}: 로딩할 Dxf파일의 최대 feature 수
	     */
		layer : null,
		maxFeatureLength :500,
		initialize: function(name, options) {

	        // allow user-set renderer, otherwise assign one
	        if (options.maxFeatureLength) {  
	            this.maxFeatureLength = options.maxFeatureLength;
	        } 

	    },
	    CLASS_NAME: "NUTs.Tool.DataTool.Dxf"
});