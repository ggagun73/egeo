$(document).ready(function () {
		
	//같은 창이 여러개라도 활성화된 창에서만 탭처리.. 
	$('.activeWindow').find('ul.Tabs > li').bind('click', function () {
		
		// sting 비교를 해서 class name 비교가 제대로 안됬던거 같음, boolean으로 수정
		var vTabBt = $('.activeWindow').find($(this)).hasClass('TabBt');
		
		if( !$('.activeWindow').find($(this)).hasClass('on') && !vTabBt ){
			
			$('.activeWindow').find($(this)).parents('ul').find('.on').removeClass('on');
			$('.activeWindow').find($(this)).parents('ul').contents().find('.Tab_selected').removeClass('Tab_selected');
			
			// 지도 호출시 같음 class 이름의 css규칙이 존재함,
			// 현재 class를 사용하지 않는것으로 보임, 다른 부분에서 사용한다면 수정해야됨
			/*if(!$('.activeWindow').find($(this)).children('a').hasClass('Tab_selected')){
				$('.activeWindow').find($(this)).children('a').addClass('Tab_selected');
			} */
			
			$('.activeWindow').find($(this)).closest('.TabArea').find('.PSection').hide();
			$('.activeWindow').find("#"+$(this).attr('class')).fadeIn();
			
			$('.activeWindow').find($(this)).addClass('on');	
			$('.activeWindow').find($(this)).contents().addClass('Tab_selected');
		}
	});

	$(".searchCntNum input[type=text]").on(function(e) { 
		alert(e.keyCode);
	    if (e.keyCode == 13){
	    	alert(1);
	    	fn_search_cntnum();
	    }    
	});
	
	$('.TabBt').find("img").on('mouseover', function() { 
	      $(this).attr( 'src', '/images/usolver/com/book/p_btn_view_on.gif');
	    } );
	$('.TabBt').find("img").on('mouseout', function() {
	      $(this).attr( 'src', '/images/usolver/com/book/p_btn_view.gif');
	    } );	
	
});

