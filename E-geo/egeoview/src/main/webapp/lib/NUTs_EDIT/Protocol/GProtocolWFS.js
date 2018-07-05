/**************************************************************************************************************
 * ProtocolWFS 클래스  
 * @namespace {Object} NUTs.Protocol.ProtocolWFS 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  

NUTs.Protocol.ProtocolWFS = function(options){
	options = OpenLayers.Util.applyDefaults(
	        options, OpenLayers.Protocol.WFS.DEFAULTS
	    );
	options.url = "/gmap/proxyPost.do?url="+encodeURIComponent(options.url);
	return new NUTs.Protocol.ProtocolWFS_v1_1_0(options);
}