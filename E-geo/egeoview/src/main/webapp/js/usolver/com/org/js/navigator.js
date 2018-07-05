function navigatorHeight() {
	if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //Firefox/x.x
		var ffversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		if (ffversion>=3) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		}else if (ffversion>=2) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		}else if (ffversion>=1) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		}
	}else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //MSIE x.x;
		var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		if (ieversion>=8) {
			$(".tableHead_Master TR").css("height","21px");
			$(".tableBody_Master TR").css("height","20px");
		}else if (ieversion>=7) {
			$(".tableHead_Master TR").css("height","21px");
			$(".tableBody_Master TR").css("height","20px");
		}else if (ieversion>=6) {
			$(".tableHead_Master TR").css("height","22px");
			$(".tableBody_Master TR").css("height","21px");
		} else{
			$(".tableHead_Master TR").css("height","22px");
			$(".tableBody_Master TR").css("height","21px");
		}
	} else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //Opera/x.x
		var oprversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		if (oprversion>=10) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		} else if (oprversion>=9) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		} else if (oprversion>=8) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		} else if (oprversion>=7) {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		} else {
			$(".tableHead_Master TR").css("height","26px");
			$(".tableBody_Master TR").css("height","25px");
		}
	} else {
		$(".tableHead_Master TR").css("height","26px");
		$(".tableBody_Master TR").css("height","25px");
	}
}


function navigatorHeightRtms() {
	if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //Firefox/x.x
		var ffversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		if (ffversion>=3) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		}else if (ffversion>=2) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		}else if (ffversion>=1) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		}
	}else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //MSIE x.x;
		var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		if (ieversion>=8) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");

		}else if (ieversion>=7) {
			$(".tableBox").css("height","21px");
			$(".tableLeft").css("height","21px");
			$(".tableTop").css("height","21px");

		}else if (ieversion>=6) {
			$(".tableBox").css("height","21px");
			$(".tableLeft").css("height","21px");
			$(".tableTop").css("height","21px");
		} else{
			$(".tableBox").css("height","21px");
			$(".tableLeft").css("height","21px");
			$(".tableTop").css("height","21px");
		}
	} else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //Opera/x.x
		var oprversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		if (oprversion>=10) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		} else if (oprversion>=9) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		} else if (oprversion>=8) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		} else if (oprversion>=7) {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		} else {
			$(".tableBox").css("height","25px");
			$(".tableLeft").css("height","25px");
			$(".tableTop").css("height","25px");
		}
	} else {
		$(".tableBox").css("height","25px");
		$(".tableLeft").css("height","25px");
		$(".tableTop").css("height","25px");
	}
}