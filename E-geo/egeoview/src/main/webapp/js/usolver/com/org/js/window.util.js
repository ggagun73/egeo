$.window.prepare({
		   dock: 'bottom',       // change the dock direction: 'left', 'right', 'top', 'bottom'
		   animationSpeed: 200,  // set animation speed
		   minWinLong: 180       // set minimized window long dimension width in pixel
		});

function dialogOpen( div_title, call_url, width, height, modal, opener_id ) {
	var allw = $.window.getAll();
	var exist_id = "";

	for( var i=0; i<allw.length; i++ ) {
		if( allw[i].getTitle()==div_title )
			exist_id = allw[i].getWindowId();
	}
	
	if( exist_id=="" ) {
		try {
			// 오프너 뒤로 이동 시킴
			if( opener_id!='' ) {
				 $.window.getWindow( opener_id ).unselect();
			}

			var minimize_tf = true;
			if( modal)
				minimize_tf = false;
			
			var wnd = $.window({
				   title: div_title,
				   url: call_url,
				   width: width,
				   height: height,
				   maxWidth: width,
				   maxHeight: height,
				   showModal: modal,
				   bookmarkable: false,
				   checkBoundary: true,
				   withinBrowserWindow : true,
				   minimizable: minimize_tf,
				   maximizable: false,
				   
				   onIframeEnd: function(wnd, url) {	// 현재 생성된 윈도우 아이디를 팝업창에 등록
					   try {
						   wnd.getContainer().find("iframe").contents().find("#wnd_id").val( wnd.getWindowId() );
						   wnd.getContainer().find("iframe").contents().find("#opener_id").val( opener_id );
						   // 포커스 IN
						   wnd.getContainer().find("iframe").contents().find("input[type='text']").first().focus();
					   } catch(E) {}
				   }
			});
			
			/*// 오프너가 앞으로 오도록 지정
			if( opener_id!='' ) {
				$.window.getWindow( opener_id ).setzindex(2001);
			}*/
		} catch(E) {
			alert('오류가 발생하였습니다. : ' +E);
		}
	}
	else {
		var wnd = $.window.getWindow( exist_id );
		if (wnd.getUrl() != call_url) {
			wnd.setUrl(call_url);
		}
		if (wnd.isMinimized()) {
			wnd.restore();
		}
		wnd.getContainer().mousedown();
		
		/*// 오프너가 앞으로 오도록 지정
		if( opener_id!='' ) {
			$.window.getWindow( opener_id ).setzindex(2001);
		}*/
	}
}

function windowOpen( div_title, call_url, width, height, modal, opener_id ) {
	var allw = $.window.getAll();
	var exist_id = "";

	for( var i=0; i<allw.length; i++ ) {
		if( allw[i].getTitle()==div_title )
			exist_id = allw[i].getWindowId();
   }
	
	if( exist_id=="" ) {
		var wh = $(window).height() - 5;
		var ypos = wh-height-20;
		var ww = $(window).width() - 10;
		
		try {
			var wnd = $.window({
				   title: div_title,
				   url: call_url,
				   width: ww,
				   height: height,
				   maxWidth: ww,
				   minWidth: width,
				   minHeight: height,
				   showModal: modal,
				   bookmarkable: false,
				   checkBoundary: true,
				   withinBrowserWindow : true,
				   y: ypos,
				   onIframeEnd: function(wnd) {	// 현재 생성된 윈도우 아이디를 팝업창에 등록
					   try {
						   wnd.getContainer().find("iframe").contents().find("#wnd_id").val( wnd.getWindowId() );
						   wnd.getContainer().find("iframe").contents().find("#opener_id").val( opener_id );
						   // 포커스 IN
						   wnd.getContainer().find("iframe").contents().find("input[type='text']").first().focus();
					   } catch(E) {}
				   }
			});
		} catch(E) {
			alert('오류가 발생하였습니다. : ' +E);
		}
	}
	else {
		var wnd = $.window.getWindow( exist_id );
		if (wnd.getUrl() != call_url) {
			wnd.setUrl(call_url);
		}
		if (wnd.isMinimized()) {
			wnd.restore();
		}
		wnd.getContainer().mousedown();
	}
}