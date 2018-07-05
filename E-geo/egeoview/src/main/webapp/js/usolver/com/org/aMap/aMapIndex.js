function indexMapSet(){
    indexExtent = new esri.geometry.Extent({
        "xmin":168654.28322115057,
        "ymin":538814.3026086797,
        "xmax":195392.0700300575,                    
        "ymax":551057.1270943286,
        "spatialReference":{"wkid":_wkid}
    });
    
    indexMap = new esri.Map("overviewDiv", {
        extent : indexExtent,
        logo : false,
        slider: false,
        fitExtent:true
    });
    
    baseIndexMap500 = new esri.layers.ArcGISDynamicMapServiceLayer(urlIndexMap,{id:"bcuis_index",visible:true});
    indexMap.addLayer(baseIndexMap500);
    indexMap.setScale(280000);
}