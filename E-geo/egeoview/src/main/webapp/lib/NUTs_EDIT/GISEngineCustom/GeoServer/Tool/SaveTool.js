/**************************************************************************************************************
 * GeoServer.Tool.SaveTool 클래스
 * @namespace {Object} NUTs.GeoServer.Tool.SaveTool
 * @description GeoServer의 이미지 저장에 맞도록 customizing처리한 클래스
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.11			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

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