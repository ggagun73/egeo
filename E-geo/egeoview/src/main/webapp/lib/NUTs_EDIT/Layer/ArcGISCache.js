/**************************************************************************************************************
 * ArcGISCache Layer 클래스 
 * @namespace {Object} NUTs.Layer.ArcGISCache
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/  

NUTs.Layer.ArcGISCache = OpenLayers.Class(OpenLayers.Layer.XYZ, {  

   /**
    * Method: getURL
    * Determine the URL for a tile given the tile bounds.  This is should support
    *     urls that access tiles through an ArcGIS Server MapServer or directly through
    *     the hex folder structure using HTTP.  Just be sure to set the useArcGISServer
    *     property appropriately!  This is basically the same as 
    *     'OpenLayers.Layer.TMS.getURL',  but with the addition of hex addressing,
    *     and tile rounding.
    *
    * Parameters:
    * bounds - {<OpenLayers.Bounds>}
    *
    * Returns:
    * {String} The URL for a tile based on given bounds.
    */
    getURL: function (bounds) {
        var res = this.getResolution(); 

        // tile center
        var originTileX = (this.tileOrigin.lon + (res * this.tileSize.w/2)); 
        var originTileY = (this.tileOrigin.lat - (res * this.tileSize.h/2));

        var center = bounds.getCenterLonLat();
        var point = { x: center.lon, y: center.lat };
        var x = (Math.round(Math.abs((center.lon - originTileX) / (res * this.tileSize.w)))); 
        var y = (Math.round(Math.abs((originTileY - center.lat) / (res * this.tileSize.h)))); 
        var z = this.map.getZoom();

        // this prevents us from getting pink tiles (non-existant tiles)
        if (this.lods) {        
            var lod = this.lods[this.map.getZoom()];
            if ((x < lod.startTileCol || x > lod.endTileCol) 
                || (y < lod.startTileRow || y > lod.endTileRow)) {
                    return null;
            }
        }
        else {
            var start = this.getUpperLeftTileCoord(res);
            var end = this.getLowerRightTileCoord(res);
            if ((x < start.x || x >= end.x)
                || (y < start.y || y >= end.y)) {
                    return null;
            }        
        }

        // Construct the url string
        var url = this.url;
        var s = '' + x + y + z;

        if (OpenLayers.Util.isArray(url)) {
            url = this.selectUrl(s, url);
        }

        // Accessing tiles through ArcGIS Server uses a different path
        // structure than direct access via the folder structure.
        if (this.useArcGISServer) {
            // AGS MapServers have pretty url access to tiles
            url = url + '/tile/${z}/${y}/${x}';
        } else {
            // The tile images are stored using hex values on disk.
            x = 'C' + this.zeroPad(x, 8, 16);
            y = 'R' + this.zeroPad(y, 8, 16);
            z = 'L' + this.zeroPad(z, 2, 16);
            url = url + '/${z}/${y}/${x}.' + this.type;
        }

        // Write the values into our formatted url
        url = OpenLayers.String.format(url, {'x': x, 'y': y, 'z': z});

        return OpenLayers.Util.urlAppend(
            url, OpenLayers.Util.getParameterString(this.params)
        );
    },

    /**
     * Method: zeroPad
     * Create a zero padded string optionally with a radix for casting numbers.
     *
     * Parameters:
     * num - {Number} The number to be zero padded.
     * len - {Number} The length of the string to be returned.
     * radix - {Number} An integer between 2 and 36 specifying the base to use
     *     for representing numeric values.
     */
    zeroPad: function(num, len, radix) {
        var str = num.toString(radix || 10);
        while (str.length < len) {
            str = "0" + str;
        }
        return str;
    },

    CLASS_NAME: 'NUTs.Layer.ArcGISCache' 
}); 
