/**************************************************************************************************************
 * ProtocolWFS_v1_1_0 클래스  
 * @namespace {Object} NUTs.Protocol.ProtocolWFS_v1_1_0 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  

NUTs.Protocol.ProtocolWFS_v1_1_0 = OpenLayers.Class(OpenLayers.Protocol.WFS.v1_1_0,{
	read: function(options) {
        OpenLayers.Protocol.prototype.read.apply(this, arguments);
        options = OpenLayers.Util.extend({}, options);
        OpenLayers.Util.applyDefaults(options, this.options || {});
        var response = new OpenLayers.Protocol.Response({requestType: "read"});

        var data = OpenLayers.Format.XML.prototype.write.apply(
            this.format, [this.format.writeNode("wfs:GetFeature", options)]
        );

        response.priv = NUTs.Request.POST({
            url: options.url,
            callback: this.createCallback(this.handleRead, response, options),
            params: options.params,
            headers: options.headers,
            data: data,
        });

        return response;
    },
	CLASS_NAME: "NUTs.Protocol.ProtocolWFS_v1_1_0"
});