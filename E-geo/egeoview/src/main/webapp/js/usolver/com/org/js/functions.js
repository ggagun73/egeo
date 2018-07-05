$(document).ready(function () {
	/* _over : Rollover */
	$('._over > li').bind('mouseover', function () {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			$(this).children('a').children('img').attr('src', $(this).children('a').children('img').attr('src').replace('.png', '_on.png'));
		}
	});

	$('._over > li').bind('mouseout', function () {
		$(this).removeClass('on');
		$(this).children('a').children('img').attr('src', $(this).children('a').children('img').attr('src').replace('_on.png', '.png'));
	});

	/* _over : Rollover 이미지 확장자가 gif로 변경*/
	$('._over_menu > li').bind('mouseover', function () {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			$(this).children('img').attr('src', $(this).children('img').attr('src').replace('.gif', '_on.gif'));
		}
	});

	$('._over_menu > li').bind('mouseout', function () {
		$(this).removeClass('on');
		$(this).children('img').attr('src', $(this).children('img').attr('src').replace('_on.gif', '.gif'));
	});

	/* _tab, _tabContents */
	$('._tab input[type=button]').bind('click', function () {
		if (!$(this).parents('li').hasClass('on')) {
			$(this).parents('ul').find('.on').removeClass('on');
			$(this).parents('nav').next().find('.on').removeClass('on');
			$(this).parents('nav').next().find('div.' + $(this).parents('li').attr('class')).addClass('on');
			$(this).parents('li').addClass('on');
		}
	});

	$('.function > li').bind('mouseover', function () {
		if ($(this).children('a').children('img').length == 0)
			return;
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			$(this).children('a').children('img').attr('src', $(this).children('a').children('img').attr('src').replace('_on.gif', '_over.gif'));
		}
	});

	$('.function > li').bind('mouseout', function () {
		if ($(this).children('a').children('img').length == 0)
			return;
		//if($(this).hasClass('on')){
		$(this).removeClass('on');
		$(this).children('a').children('img').attr('src', $(this).children('a').children('img').attr('src').replace('_over.gif', '_on.gif'));
		//}
	});

	/* _tab, _tabContents */
	$('._tab input[type=button]').bind('click', function () {
		if (!$(this).parents('li').hasClass('on')) {
			$(this).parents('ul').find('.on').removeClass('on');
			$(this).parents('nav').next().find('.on').removeClass('on');
			$(this).parents('nav').next().find('div.' + $(this).parents('li').attr('class')).addClass('on');
			$(this).parents('li').addClass('on');
		}
	});

	/* map search handle */
	$('input#searchWindow.handle').bind('click', function () {
		if ($(this).parents('._hiding').hasClass('on')) {
			$(this).parents('._hiding').removeClass('on');
			$(this).parent().animate({
				width : 0
			}, 500);
			$(this).attr('src', $(this).attr('src').replace('toclose', 'toopen'));
		} else {
			$(this).parents('._hiding').addClass('on');
			$(this).parent().animate({
				width : 245
			}, 500);
			$(this).attr('src', $(this).attr('src').replace('toopen', 'toclose'));
		}
	});

	/* map search handle */
	$('input#legendWindow.handle').bind('click', function () {
		if ($(this).parents('._hiding').hasClass('on')) {
			$(this).parents('._hiding').removeClass('on');
			$(this).parent().animate({
				width : 0
			}, 500);
			$(this).attr('src', $(this).attr('src').replace('toclose', 'toopen'));
			$('.legend').css("right", "-2px");
			/*축척바 우측으로 이동*/
			$('.nav_control').animate({
				width : 0
			}, 500);
			$('.nav_control').css("right", "40px");

		} else {
			$(this).parents('._hiding').addClass('on');
			$(this).parent().animate({
				width : $(this).next().width()
			}, 500);
			$(this).attr('src', $(this).attr('src').replace('toopen', 'toclose'));

			/*축척바 좌측으로 이동*/
			$('.nav_control').animate({
				width : 0
			}, 500);
			$('.nav_control').css("right", "262px");
		}
	});

	/* 최규용 추가 위치검색 메뉴 이벤트 추가 */
	$('#locationSearch').bind('click', function () {

		if ($('input#searchWindow.handle').parents('._hiding').hasClass('on')) {

			$('input#searchWindow.handle').parents('._hiding').removeClass('on');
			$('input#searchWindow.handle').parent().animate({
				width : 0
			}, 500);
			$('input#searchWindow.handle').attr('src', $('input#searchWindow.handle').attr('src').replace('toclose', 'toopen'));

		} else {

			$('input#searchWindow.handle').parents('._hiding').addClass('on');
			$('input#searchWindow.handle').parent().animate({
				width : 245
			}, 500);
			$('input#searchWindow.handle').attr('src', $('input#searchWindow.handle').attr('src').replace('toopen', 'toclose'));
		}
	});

	/* 최규용 추가 위치검색 닫은상태로 세팅
	$('input#searchWindow.handle').parents('._hiding').removeClass('on');
	$('input#searchWindow.handle').parent().animate({ width : 0 }, 500);
	$('input#searchWindow.handle').attr('src', $('input#searchWindow.handle').attr('src').replace('toclose', 'toopen'));*/

	/* 최규용 추가 인덱스 박스*/
	$('.minimap').bind('change', function () {
		//이전 인덱스맵 방식
		//var mapScale = document.getElementById('minimap').value;
		//indexMapChage(mapScale);
	});

	$('.popup').draggable({
		handle : '.popupTitle',
		zIndex : 600,
		containment : 'parent'
	});

    $("#lefttab li").click(function(){
		$("#lefttab li").removeClass();
		$(this).addClass("on");
	});
    
	resize();
	$(window).resize(function () {
		resize();
	});
});

function resize() {
	var doc_height = $(window).height();
	var doc_width = $(window).width();
	var mb_height; //지도영역
	var tool_left; //툴 left좌표

	mb_height = doc_height - 66; //브라우저 - (상단메뉴+하단카피)
	$('.legend').css("top", (mb_height / 2) - 340 + "px");
	$('.legend > .handle').css("top", (680 / 2) - 23 + "px");
	$('.search > .handle').css("top", (mb_height / 2) - 22 + "px");

	$('.top > .tool').css("left", (doc_width / 2) - 200 + "px");

	tool_left = parseInt($('.top > .tool').css('left'));

	$('#dvAreaSearch').css("left", tool_left + 320 + "px");
	$('#dvAnalysisIcon').css("left", tool_left + 400 + "px");
	$('#dvBookmarks').css("left", tool_left + 260 + "px");
	$('#dvUserGraphicsIcon').css("left", tool_left + 303 + "px");
}

function fnOpenSearchIframe(flag) {
	$("#searchWindow").css("display", "");
	var obj = $("input#searchWindow.handle");
	obj.parents("._hiding").addClass("on");
	obj.parent().animate({
		width : 245
	}, 500);
	obj.attr("src", obj.attr("src").replace("toopen", "toclose"));
	
	switch (flag) {
		case 1:
			$("#searchIfr").attr("src", "/etc/etcBuildSearchList.do");
			break;
		case 2:
			$("#searchIfr").attr("src", "/etc/etcRoadSearchList.do");
			break;
		case 3:
			$("#searchIfr").attr("src", "/etc/etcJibunSearchList.do");
			break;
		case 4:
			$("#searchIfr").attr("src", "/etc/etcNewAddressSearchList.do");
			break;
	}
}