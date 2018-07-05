
NUTs.GeoServer.Tool.SaveTool = OpenLayers.Class(NUTs.Tool.SaveTool, {

	parseMap : function() {
		this.xml += "<MAP>";
		var params;

			params = {
					left : this.map.getExtent().bottom,
					bottom : this.map.getExtent().left,
					right : this.map.getExtent().top,
					top : this.map.getExtent().right,
					width : this.map.getSize().w,
					height : this.map.getSize().h,
					resolution : this.map.getResolution()
				};
	
		this.write(params);

		this.xml += "</MAP>";
	},

	CLASS_NAME : "NUTs.GeoServer.Tool.SaveTool"
});