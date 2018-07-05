/**
 * nJDesktop Virtual Desktop demo application JS
 * Copyright (C) 2012 Nagy Ervin
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by    
 * the Free Software Foundation, either version 3 of the License, or    
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * -----------------------------------------------------------------------
 * Nagy Ervin
 * nagyervin.bws@gmail.com
 * 
 * License: GPL v.3, see COPYING
 * 
 * If you wish to fork this, please let me know: nagyervin.bws@gmail.com.
 * 
 * Please leave this header intact
 * 
 * -----------------------------------------------------------------------
 * Insert your name below, if you have modified this project. If you wish 
 * that change become part of this project (aka i will endorse it), please 
 * send it to me.
 * 
 * I must remind you, that your changes will be subject to the GPL v.3.
 * 
 */

var nJDSKApp = (function(w,d,$){
	return{
		/**
		 * Creates the top menus (This is the demo for the built-in menu helper plugin)
		 */
		createMenus:function(){
			/*addMenu params: parent, id, title, href, icon, function(optional)*/
			/*nJDSK.menuHelper.addMenu('','linksmenu','Links','#','');
			This menu item creates a dialog when clicked
			nJDSK.menuHelper.addMenu('linksmenu','linksmenu-1','Link with icon and callback','#','/extLib/jdesktop/images/icons/silk/link.png',function(){
				nJDSK.customHeaderDialog(
						'Callback for Links &gt; Link with icon and callback',
						'Callback',
						'This dialog popped up after you clicked on that menu item',
						[
						 	{
						 		type:'ok_yes',
						 		value:'OK',
						 		callback:function(win)
						 		{
						 			win.close();
						 		}
						 	},
						 	{
						 		type:'no_cancel',
						 		value:'Cancel',
						 		callback:function(win)
						 		{
						 			win.close();
						 		}
						 	}
						]
				);
				return false;
			});*/
			/*dummy menus to fill up the menu*/
			/*nJDSK.menuHelper.addMenu('','othermenu','Other','#','');
			nJDSK.menuHelper.addMenu('othermenu','othermenu-1','Other SubMenu item','#','');
			nJDSK.menuHelper.addMenu('othermenu','othermenu-2','Other SubMenu item','#','');
			
			// demo menus for nJDSK extra functions
			nJDSK.menuHelper.addMenu('','windowmenu','Window','#','');
			// tile menu
			nJDSK.menuHelper.addMenu('windowmenu','tile-1','Tile','#','',function(){
				nJDSK.tile();
				return false;
			});
			// cascade menu
			nJDSK.menuHelper.addMenu('windowmenu','cascade-1','Cascade','#','',function(){
				nJDSK.cascade();
				return false;
			});*/
		},
		
		// Pad string function for the updateClock function (demo widget)
		// added by gyorgysagi@gmail.com
		padDigits: function(number, digits) {
		    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
		},
		
		// This is the clock updater function for the demo widget
		updateClock:function(x_id){
			var wdgDate = new Date();
			hours = wdgDate.getHours();
			minutes = wdgDate.getMinutes();
			year = wdgDate.getFullYear();
			month = wdgDate.getMonth()+1;
			day = wdgDate.getDate();
			$('#'+x_id+' .widget-content').html('<div class="wdg_clock">'+this.padDigits(hours,2)+':'+this.padDigits(minutes,2)+'</div><div class="wdg_cal">'+this.padDigits(month,2)+'/'+this.padDigits(day,2)+'/'+year);
			setTimeout("nJDSKApp.updateClock('"+x_id+"')",60000);
		},
		
		// create icons on the desktop, load the menu and the widgets
		init: function()
		{
			// load top menu (see top)
			nJDSKApp.createMenus();
			
			// Create an icon (params: id, title, icon image, click callback)
			/*nJDSK.iconHelper.addIcon('iconTest','About','/extLib/jdesktop/images/bws_logo2k9.png',function(e){
				e.preventDefault();
				
				// create an about box by using a dialog (dialog params: window title, dialog heading, dialog content, buttons array(button type(css class), text, click function ))
				nJDSK.customHeaderDialog(
					'About',
					'About nJDesktop',
					'Created by Nagy Ervin<br />Colorful HQ background image by <a href="http://www.superhqwallpapers.com/2012/02/07/hq-random-backgrounds/colorful-hq-background-1920x1200/">Super Hq Wallpapers</a><br />Menu Silk Icons by <a href="http://famfamfam.com/">FAMFAMFAM</a>',
					[
					 	{
					 		type:'ok_yes',
					 		value:'OK',
					 		callback:function(win){
					 			win.close();
					 		}
					 	}
					]
				);
				
				return false;
			});*/
			
			// this icon creates a glassy resizable window (content area is translucent)
			/*nJDSK.iconHelper.addIcon('resIconFormWindow1','Basic HTML Form elements','/extLib/jdesktop/images/bws_logo2k9.png',function(e){
				e.preventDefault();
				$.get('/html/usolver/form.html',function(msg){
					var newWindow = new nJDSK.Window(640,520,'Form elements','',msg, nJDSK.uniqid());
					// create a radio button group
					$('#radio').buttonset();
					// checkbox
					$('#item4').button();
					// Select menu
					$('#item2').selectmenu({width:150});
					newWindow.setFooter('This is a dynamic footer');
					// find the form in the new window. We can use the window's base property, it holds the window's main wrapper div
					$(newWindow.base).find('#test_form').submit(function(e){
						e.preventDefault();
						// we close the window with submit button
						newWindow.close();
						
						// and show an alert
						nJDSK.alert(
								'Form submitted',
								'The form has been submitted.',
								[
								 	{
								 		type:'ok_yes',
								 		value:'OK',
								 		callback:function(win){
								 			win.close();
								 		}
								 	}
								 ]
							);
						return false;
					});
				});
				
				return false;
			});*/
			
			// this icon creates a glassy resizable window (content area is translucent)
			/*nJDSK.iconHelper.addIcon('resIconFormWindow2','지도','/extLib/jdesktop/images/bws_logo2k9.png',function(e){
				e.preventDefault();
				$.get('/map/map.do',function(msg){
					var newWindow = new nJDSK.Window(1280,600,'지도메인','',msg, nJDSK.uniqid());
					var resizeId = null;
					
					newWindow.onResize=function(win){ 
						  //win.setFooter($(win.base).width()+':'+$(win.base).height() + '/' + $("#map").width()+':'+$("#map").height());
						  clearTimeout(resizeId);
						  resizeId = setTimeout(resizeEnd, 100);
						};
					
					function resizeEnd(){
						map.updateSize();
					}
				});
				
				return false;
			});*/
			
			// this icon creates a glassy resizable window (content area is translucent)
			/*nJDSK.iconHelper.addIcon('resIconFormWindow3','급수관로 대장','/extLib/jdesktop/images/bws_logo2k9.png',function(e){
				e.preventDefault();
				$.get('/water/wtlSplyLsList.do',function(msg){
					var newWindow = new nJDSK.Window(1300,500,'급수관로 대장','',msg, nJDSK.uniqid());
				});
				
				return false;
			});*/
			
			
			// Show/hide windows on desktop
	        $('a#loginmenu').click(function(e){
	        	e.preventDefault();
				$.get('/login.do?DIRECT=Y',function(msg){
					var newWindow = new nJDSK.Window(400,250,'Login','',msg, nJDSK.uniqid());
					newWindow.setFooter('This is a loginpage footer');
					//newWindow.setFullGlass();
				});
				
				return false;
	        });
	        
	        //요기에 메인메뉴 생성함수 추가 
		       mainMenuCreate();
		        
		     // Menu's Tab
		    	$(".TabBx1 ul a").click(function(){
		    		$(".TabBx1 ul  a").each(function() {		
		    			$(this).removeClass("D2_TabM_selected");	
		    			if($(this).attr("class") == "")
		    				$(this).addClass("D2_TabM");
		    			$("#"+$(this).attr("id").replace("tab", "div")).hide();
		    		});			
		    		$(this).addClass("D2_TabM_selected");
		    		$("#"+$(this).attr("id").replace("tab", "div")).show();
		    	});
		    	
		    	//메뉴클릭시.. 
		    	$(".TabBx2>a").click(function(){
		    		
		    		var oMenuInfo =  jQuery.parseJSON(REGISTER.fn_get_menuInfo($(this).attr('id')));
		    		
		    		//alert( oMenuInfo.url +"/"+ oMenuInfo.width +"/"+ oMenuInfo.height);
		    		
		    		var sUrl = oMenuInfo.url+"List.do?page=1&rows=50&TABLENAME="+$(this).attr('id');
		    		if( oMenuInfo.url.indexOf(".do") > 0 ){
		    			 sUrl = oMenuInfo.url+"?&page=1&rows=50&MenuId="+$(this).attr('id');
		    		}		

		    		var sWidth  = $('#desktop').width()-50;
		    		var sHeight = $('#desktop').height()-50;
		    		if($("#ifrMap").length !== 0) {
		    			sHeight = 340;
		    		}
		    				
		    		if( $(this).attr('id').indexOf("TOTAL") != -1  ||  $(this).attr('id').indexOf("ANA") != -1){
		    			sWidth = oMenuInfo.width;
		    			sHeight =oMenuInfo.height;
		    		}

		    		REGISTER.fn_open_nJDSKWindow(oMenuInfo.title, sUrl, sWidth, sHeight,'registerOnHome');	
		    	});

		}
	};
})(window, document, jQuery);

$(document).ready(function(){
	// initialize desktop
	nJDSK.init();
	// load and initialize our demo app
	nJDSKApp.init();
	// load optional background image for the desktop environment
	//nJDSK.setBackground('/extLib/jdesktop/images/colorful-hq-background-1920x1200.jpg');
	nJDSK.setBackground('/extLib/jdesktop/images/bg01.png');
	
	//initSystem();
});