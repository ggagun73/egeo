OpenLayers.Tile.Image.IFrame = OpenLayers.Class(OpenLayers.Tile.Image, {
    
    /**
     * Property: layerAlphaHack
     * {Boolean} Always false for an instance.
     */

    /**
     * Constructor: OpenLayers.Tile.Image.IFrame
     * Constructor for a new <OpenLayers.Tile.Image.IFrame> instance.
     * 
     * Parameters:
     * layer - {<OpenLayers.Layer>} layer that the tile will go in.
     * position - {<OpenLayers.Pixel>}
     * bounds - {<OpenLayers.Bounds>}
     * size - {<OpenLayers.Size>}
     */   
    initialize: function(layer, position, bounds, url, size) {
        OpenLayers.Tile.Image.prototype.initialize.apply(this, arguments);
        this.layerAlphaHack = false;
    },

    /** 
     * Method: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        if(this.imgDiv != null) {
            // unregister the "load" handler
            OpenLayers.Event.stopObservingElement(this.imgDiv.firstChild);
        }
        OpenLayers.Tile.Image.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: clear
     * Removes the iframe from DOM (avoids back-button problems).
     */
    clear: function() {
        if(this.imgDiv) {
            var iFrame = this.imgDiv.firstChild;
            OpenLayers.Event.stopObservingElement(iFrame);
            //this.imgDiv.removeChild(iFrame);
        }
    },

    /**
     * Method: clone
     *
     * Parameters:
     * obj - {<OpenLayers.Tile.Image.IFrame>} The tile to be cloned
     *
     * Returns:
     * {<OpenLayers.Tile.Image.IFrame>} An exact clone of this 
     * <OpenLayers.Tile.Image.IFrame>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Tile.Image.IFrame(
                this.layer, this.position, this.bounds, this.url, this.size);
        } 
        
        //pick up properties from superclass
        obj = OpenLayers.Tile.Image.prototype.clone.apply(this, [obj]);
        
        return obj;
    },

    /**
     * Method: renderTile
     */
     renderTile: function() {
        if(OpenLayers.Tile.Image.prototype.renderTile.apply(this, arguments)) {
            // create a html form and add it temporary to the layer div
            var form = this.createRequestForm();
            this.imgDiv.appendChild(form);

            // submit the form (means fetching the image)
            form.submit();
            this.imgDiv.removeChild(form);
        
        }
    },

    /**
     * Method: initImgDiv
     * Creates the imgDiv property on the tile.
     */
    initImgDiv: function() {
        this.imgDiv = this.createImgDiv();

        OpenLayers.Util.modifyDOMElement(this.imgDiv, this.id, null,
            this.layer.getImageSize(), "relative");
        this.imgDiv.className = 'olTileImage';

        this.frame.appendChild(this.imgDiv); 
        this.layer.div.appendChild(this.frame); 

        if(this.layer.opacity != null) {
            
            OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, null,
                                             null, null, null, 
                                             this.layer.opacity);
        }

        // we need this reference to check back the viewRequestID
        this.imgDiv.map = this.layer.map;

        //bind a listener to the onload of the iframe so that we 
        // can register when a tile has finished loading.
        var onload = function() {
            this.show();
            //normally isLoading should always be true here but there are some 
            // right funky conditions where loading and then reloading a tile
            // with the same url *really*fast*. this check prevents sending 
            // a 'loadend' if the msg has already been sent
            //
            if (this.isLoading) { 
                this.isLoading = false; 
                this.events.triggerEvent("loadend"); 
               
            }
        };
    },

    /**
     * Method: createImgDiv
     * Creates a div with iframe.and eventPane
     *
     * Returns:
     * {DOMElement}
     */
    createImgDiv: function() {
        var eventPane = document.createElement("div");

        if(OpenLayers.Util.getBrowserName() == "msie") {
            // IE cannot handle events on elements without backgroundcolor. So we
            // use this little hack to make elements transparent
            eventPane.style.backgroundColor = '#FFFFFF';
            eventPane.style.filter          = 'chroma(color=#FFFFFF)';
        }

        OpenLayers.Util.modifyDOMElement(eventPane, null,
            new OpenLayers.Pixel(0,0), this.layer.getImageSize(), "absolute");

        var imgDiv = document.createElement("div");
        imgDiv.appendChild(eventPane);
        return imgDiv;
    },

    /**
     * Method: createIFrame
     * Create the IFrame which shows the image.
     *
     * Returns:
     * {DOMElement} Iframe
     */
    createIFrame: function() {
        var id = this.id+'_iFrame';
        var iframe;
        if(OpenLayers.Util.getBrowserName() == "msie" && navigator.userAgent.toLowerCase().indexOf("9.0") < 0) {
            // InternetExplorer does not set the name attribute of an iFrame 
            // properly via DOM manipulation, so we need to do it on our own with
            // this hack.
            iframe = document.createElement('<iframe name="'+id+'">');

            // IFrames in InternetExplorer are not transparent, if you set the
            // backgroundColor transparent. This is a workarround to get 
            // transparent iframes.
            //iframe.style.backgroundColor = '#FFFFFF';
            //iframe.style.filter          = 'chroma(color=#FFFFFF)';
            iframe.allowTransparency="true";
        }
        else {
            iframe = document.createElement('iframe');
            iframe.style.backgroundColor = 'transparent';
        
            // iframe.name needs to be an unique id, otherwise it 
            // could happen that other iframes are overwritten.
            iframe.name = id;
        }
        iframe.id = id;

        // some special properties to avoid scaling the images and scrollbars 
        // in the iframe
        iframe.scrolling             = 'no';
        iframe.marginWidth           = '0px';
        iframe.marginHeight          = '0px';
        iframe.frameBorder           = '0';

        OpenLayers.Util.modifyDOMElement(iframe, id, 
            new OpenLayers.Pixel(0,0), this.layer.getImageSize(), "absolute");
        
        var onload = function() { 
        	var iframs = this.imgDiv.getElementsByTagName("iframe");
        	
        	for(var i=iframs.length-1; i > 0; i--) {
        		this.imgDiv.removeChild(iframs[i]);
        	}
        	
        	//추가된 부분
        	if(!this.layer.map.zoomChanged) this.positionImage();
        	
        	this.show();  
        	//normally isLoading should always be true here but there are some  
        	// right funky conditions where loading and then reloading a tile  
        	// with the same url *really*fast*. this check prevents sending  
        	// a 'loadend' if the msg has already been sent  
        	
        	if (this.isLoading) {  
        	    this.isLoading = false;  
        	    //BackBuffer 사용으로 지도를 3번 그리는 것을 수정 
        	    this.layer.events.unregister("loadend", this, this.resetBackBuffer);
        	    this.events.triggerEvent("loadend");  
        	  }  
        	 };  
        	 OpenLayers.Event.observe(iframe, 'load',  
        	 OpenLayers.Function.bind(onload, this));  

        return iframe;
    },
    /**
     * Method: draw
     * Set useIFrame in the instance, and operate the image/iframe switch.
     * Then call Tile.Image.draw.
     *
     * Returns:
     * {Boolean}
     */
    draw: function() {
    	if(this.layer) {
    		var draw = OpenLayers.Tile.Image.prototype.shouldDraw.call(this);
            if(draw) {

                // this.url isn't set to the currect value yet, so we call getURL
                // on the layer and store the result in a local variable
                var url = this.layer.getURL(this.bounds);

                var usedIFrame = this.useIFrame;
                this.useIFrame = this.maxGetUrlLength !== null &&
                                 !this.layer.async &&
                                 url.length > this.maxGetUrlLength;

                var fromIFrame = usedIFrame && !this.useIFrame;
                var toIFrame = !usedIFrame && this.useIFrame;

                if(fromIFrame || toIFrame) {

                    // Switching between GET (image) and POST (iframe).

                    // We remove the imgDiv (really either an image or an iframe)
                    // from the frame and set it to null to make sure initImage
                    // will call getImage.

                    if(this.imgDiv && this.imgDiv.parentNode === this.frame) {
                        this.frame.removeChild(this.imgDiv);
                    }
                    this.imgDiv = null;

                    // And if we had an iframe we also remove the event pane.

                    if(fromIFrame) {
                        this.frame.removeChild(this.frame.firstChild);
                    }
                }
            }
            return OpenLayers.Tile.Image.prototype.draw.apply(this, arguments);
    	}
        
    },
    /**
     * Method: createRequestForm
     * Create the html <form> element with width, height, bbox and all 
     * parameters specified in the layer params.
     *
     * Returns: 
     * {DOMElement} The form element which sends the HTTP-POST request to the
     *              WMS. 
     */
    createRequestForm: function() {
        // creation of the form element
        var form = document.createElement('form');
        form.method = 'POST';
        // call getFullRequestString in a scope without params
        var cacheId = this.layer.params["_OLSALT"];
        cacheId = (cacheId ? cacheId + "_" : "") + this.bounds.toBBOX();
        form.action = OpenLayers.Util.urlAppend(this.layer.url, cacheId);

        // insert the iframe, which has been removed to avoid back-button
        // problems
        this.imgDiv.insertBefore(this.createIFrame(), this.imgDiv.firstChild);

        form.target = this.id+'_iFrame';

        // adding all parameters in layer params as hidden fields to the html
        // form element
        var imageSize = this.layer.getImageSize();
        var params = OpenLayers.Util.extend(
            {
                "BBOX": this.encodeBBOX ? this.bounds.toBBOX() :
                        this.bounds.toArray(),
                "WIDTH": imageSize.w,
                "HEIGHT": imageSize.h
            }, this.layer.params);
            
        for(var par in params) {
            var field = document.createElement('input');
            field.type  = 'hidden';
            field.name  = par;
            field.value = params[par];
            form.appendChild(field);
        }   

        return form;
    },
    
    CLASS_NAME: "OpenLayers.Tile.Image.IFrame"
  }
);