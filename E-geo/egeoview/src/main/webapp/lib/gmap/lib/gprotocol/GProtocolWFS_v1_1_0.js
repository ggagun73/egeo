GProtocolWFS = function(options){
	options = OpenLayers.Util.applyDefaults(
	        options, OpenLayers.Protocol.WFS.DEFAULTS
	    );
	options.url = "/gmap/proxyPost.do?url="+encodeURIComponent(options.url);
	return new GProtocolWFS_v1_1_0(options);
}