function toggleLiveResizing () {
		$.each('north,south,west,east'.split(','), function (i, pane) {
			var opts = myLayout.options[ pane ];
			opts.resizeWhileDragging = !opts.resizeWhileDragging;
		});
	};
	
	function toggleStateManagement ( skipAlert ) {
		var enable = !myLayout.options.useStateCookie; // OPPOSITE of current setting
		myLayout.options.useStateCookie = enable; // toggle option

		if (!enable) { // if disabling state management...
			myLayout.deleteCookie(); // ...clear cookie so will NOT be found on next refresh
			if (!skipAlert)
				alert( 'This layout will reload as options specify \nwhen the page is refreshed.' );
		}
		else if (!skipAlert)
			alert( 'This layout will save & restore its last state \nwhen the page is refreshed.' );

		// update text on button
		var $Btn = $('#btnToggleState'), text = $Btn.html();
		if (enable)
			$Btn.html( text.replace(/Enable/i, "Disable") );
		else
			$Btn.html( text.replace(/Disable/i, "Enable") );
	};

	// set EVERY 'state' here so will undo ALL layout changes
	// used by the 'Reset State' button: myLayout.loadState( stateResetSettings )
	var stateResetSettings = {
			north__size:		"auto"
		,	north__initClosed:	true
		,	north__initHidden:	false
		,	south__size:		"auto"
		,	south__initClosed:	false
		,	south__initHidden:	false
		,	west__size:			"auto"
		,	west__initClosed:	false
		,	west__initHidden:	false
		,	east__size:			"auto"
		,	east__initClosed:	true
		,	east__initHidden:	true
	}; 

	