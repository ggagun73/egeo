/**************************************************************************************************************
 * Request 클래스  
 * @namespace {Object} NUTs.Request 
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/ 

OpenLayers.Util.extend(NUTs.Request,OpenLayers.Request);

NUTs.Request.POST = function(config) {
	config = OpenLayers.Util.extend(config, {method: "POST"});
    // set content type to application/xml if it isn't already set
    config.headers = config.headers ? config.headers : {};
    if(!("CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(config.headers))) {
        config.headers["Content-Type"] = "application/xml";
    }
    return NUTs.Request.issue(config);
};

NUTs.Request.issue = function(config) {
	
    var defaultConfig = OpenLayers.Util.extend(
        this.DEFAULT_CONFIG,
        {proxy: OpenLayers.ProxyHost}
    );
    config = config || {};
    config.headers = config.headers || {};
    config = OpenLayers.Util.applyDefaults(config, defaultConfig);
    config.headers = OpenLayers.Util.applyDefaults(config.headers, defaultConfig.headers);
    
    var customRequestedWithHeader = false,
        headerKey;
    for(headerKey in config.headers) {
        if (config.headers.hasOwnProperty( headerKey )) {
            if (headerKey.toLowerCase() === 'x-requested-with') {
                customRequestedWithHeader = true;
            }
        }
    }
    if (customRequestedWithHeader === false) {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    // create request, open, and set headers
    var request = new OpenLayers.Request.XMLHttpRequest();
   /* var url = OpenLayers.Util.urlAppend(config.url, 
        OpenLayers.Util.getParameterString(config.params || {}));
    url = OpenLayers.Request.makeSameOrigin(url, config.proxy);*/
    var url = config.url+"&params="+encodeURIComponent(config.data);
    request.open(
        config.method, url, config.async, config.user, config.password
    );
    for(var header in config.headers) {
        request.setRequestHeader(header, config.headers[header]);
    }

    var events = this.events;

    // we want to execute runCallbacks with "this" as the
    // execution scope
    var self = this;
    
    request.onreadystatechange = function() {
        if(request.readyState == OpenLayers.Request.XMLHttpRequest.DONE) {
            var proceed = events.triggerEvent(
                "complete",
                {request: request, config: config, requestUrl: url}
            );
            if(proceed !== false) {
                self.runCallbacks(
                    {request: request, config: config, requestUrl: url}
                );
            }
        }
    };
    
    // send request (optionally with data) and return
    // call in a timeout for asynchronous requests so the return is
    // available before readyState == 4 for cached docs
    if(config.async === false) {
        request.send(config.data);
    } else {
        window.setTimeout(function(){
            if (request.readyState !== 0) { // W3C: 0-UNSENT
                request.send(config.data);
            }
        }, 0);
    }
    return request;
};
