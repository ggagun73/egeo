/**************************************************************************************************************
 * Feature draw 클래스
 * @namespace {Object} NUTs.Control.DrawFeature
 * @description feature의 공간정보와 특정 속성정보를 표출하는데 사용하는 클래스
 * 
 *  * 수정일			수정자				version				수정내역
 * --------------------------------------------------------------------------------
 * 2016.12.02			연구개발센터		0.1					최초 생성 
 **************************************************************************************************************/

NUTs.Control.DrawFeature = OpenLayers.Class(OpenLayers.Control.DrawFeature, {
	
	/**
	* 
	* @memberof NUTs.Control.DrawFeature
	* @member {NUTs.Popup} feature정보를 표출할 팝업 개체
	*/
	inputTextPopup : null,
	
	seq : 0,
	
	drawFeature: function(geometry, attributes) {
		if (attributes && attributes.featureType && attributes.featureType == 'Text') {
			this.removeInputTextPopup();
		}
		
		attributes.seq = this.seq;
		this.seq++;
		
        var feature = new OpenLayers.Feature.Vector(geometry, attributes);
        var proceed = this.layer.events.triggerEvent(
            "sketchcomplete", {feature: feature}
        );
        if(proceed !== false) {
            feature.state = OpenLayers.State.INSERT;
            this.layer.addFeatures([feature]);
            this.featureAdded(feature);
            this.events.triggerEvent("featureadded",{feature : feature});
        }
		
		if (attributes && attributes.featureType && attributes.featureType == 'Text') {
			this.addInputTextPopup(feature);
		}
		
    },
	
	addInputTextPopup : function(feature) {
		var contentHtml = "";
		contentHtml += 	"<div class='olControlDrawInputText'>";
		contentHtml += 		"<textarea class='olControlDrawInputTextArea'></textarea>";
		contentHtml += 		"<img class='olControlDrawInputTextConfirm' src='/images/usolver/com/map/btn_submit.gif' alt='확인' title='확인' />";
		contentHtml += 		"<img class='olControlDrawInputTextCancel' src='/images/usolver/com/map/btn_close.gif' alt='닫기' title='닫기' />";
		contentHtml +=	"</div>";
		
		var lonlat = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
		this.inputTextPopup = new NUTs.Popup("drawInputText", lonlat, new OpenLayers.Size(500, 200), contentHtml, new OpenLayers.Pixel(0,0));
		
		this.map.addPopup(this.inputTextPopup);

		this.inputTextPopup.updateSize();
		this.inputTextPopup.type = "draw";
		
		$(".olControlDrawInputTextArea").focus();
		
		$(".olControlDrawInputTextConfirm").click(this, function() {
			arguments[0].data.addTextPopup();
		});
		
		$(".olControlDrawInputTextCancel").click(this, function() {
			arguments[0].data.removeInputTextPopup();
		});
	},
	
	removeInputTextPopup : function() {
		if (this.inputTextPopup) {
			this.map.removePopup(this.inputTextPopup);
			this.inputTextPopup = null;
		}
		
		var len = this.layer.features.length;
		for(var i=len-1; i >=0; i--) {
			if(this.layer.features[i].attributes.featureType == "Text") {
				this.layer.removeFeatures(this.layer.features[i]);	
			}
		}
	},
	
	addTextPopup : function() {
		var str = $(".olControlDrawInputTextArea").val();
		
		if(NUTs.Util.fn_trim(str) == "") return;
		
		str = str.replace(/\x20/gi, "&nbsp;");
		str = str.replace(/\x0D\x0A/gi, "<br/>");
		str = str.replace(/\x0D/gi, "<br/>");
		str = str.replace(/\n/gi, "<br/>");
		
		var contentHtml = "";
		contentHtml += "<div class='olControlDrawText off' id='drawText" + this.seq + "'>" + str + "</div>";
		
		var lonlat = this.inputTextPopup.getLonLat();

		var popup = new NUTs.Popup("drawPopup" + this.seq, lonlat, null, contentHtml, new OpenLayers.Pixel(0,0));
		
		this.map.addPopup(popup);

		popup.updateSize();
		popup.type = "draw";
		
		popup.attributes = {
			'featureType' : 'Text',
			'fontFamily' : $("#drawText"+this.seq).css('font-family'),
			'fontSize' : $("#drawText"+this.seq).css('font-size').replace("px", ""),
			'fontColor' : $("#drawText"+this.seq).css('color'),
			'seq' : this.seq,
			'text' : $(".olControlDrawInputTextArea").val(),
			'print' : true
		};
		
		this.seq++;
		
		$(".olControlDrawText").unbind();
		$(".olControlDrawText").click(this.map, function() {
			var map = arguments[0].data;
			if(map.getControl("drawSelect") && map.getControl("drawSelect").active) {
				map.getControl("drawSelect").selectTextPopup(this);
			}
			else if(map.getControl("drawEdit") && map.getControl("drawEdit").active) {
				map.getControl("drawEdit").selectTextPopup(this);
			}
		});
		
		this.removeInputTextPopup();
	},
	
	removeTextPopup : function() {
		var id;
		
		$(".olControlDrawText").each(function() {
			$(this).hasClass("on");
			id = $(this).attr("id");
			return;
		});
		
		for(var i in this.map.popups) {
			if(this.map.popups[i].id == id) {
				this.map.removePopup(this.map.popups[i]);
			}
		}
	},
	
	CLASS_NAME: "NUTs.Control.DrawFeature"
});