
$(document).ready(function () {
    //gnb
    $("#gnb > ul").accessibleDropDown();
    style();
    storyShow();
    storyHide();
    resize();
    $(window).resize(function () {
        resize();
    });
    
    $('#msilder').sliderPro({
        width: '100%',
        height: 550,
        arrows: true,
        buttons: false,
        waitForLayers: true,
        thumbnailPointer: false,
        autoplay: true,
        autoScaleLayers: false,
        responsive:false
        
    });

    $('#hero-slider ul a').click(function () {

        //reset all the items
        $('#hero-slider ul a').removeClass('active');

        //set current item as active
        $(this).addClass('active');

        //scroll it to the right position
        $('.mask').scrollTo($(this).attr('rel'), 300);

        //disable click event
        return false;

    });

    //    $(".img-swap").on('mouseenter mouseleave', function( e ){
    //        var mE = e.type=='mouseenter';
    //        var c = ['_on','_off'];
    //        this.src = this.src.replace( mE?c[1]:c[0] , mE?c[0]:c[1] );
    //        $(this).hide().stop().fadeTo(1000,1);

    //      });

    $('#sys1').on('mouseenter', function () {
        $('#sys1_on').fadeIn('slow');
        $('#sys2_on').fadeOut('slow');
        $('#sys3_on').fadeOut('slow');
        $('#sys4_on').fadeOut('slow');
        $('#sysbx1').fadeIn('slow');
        $('#sysbx2').fadeOut('slow');
        $('#sysbx3').fadeOut('slow');
        $('#sysbx4').fadeOut('slow');
    });
    $('#sys2').on('mouseenter', function () {

        $('#sys1_on').fadeOut('slow');
        $('#sys2_on').fadeIn('slow');
        $('#sys3_on').fadeOut('slow');
        $('#sys4_on').fadeOut('slow');
        $('#sysbx1').fadeOut('slow');
        $('#sysbx2').fadeIn('slow');
        $('#sysbx3').fadeOut('slow');
        $('#sysbx4').fadeOut('slow');
    });
    $('#sys3').on('mouseenter', function () {
        $('#sys1_on').fadeOut('slow');
        $('#sys2_on').fadeOut('slow');
        $('#sys3_on').fadeIn('slow');
        $('#sys4_on').fadeOut('slow');
        $('#sysbx1').fadeOut('slow');
        $('#sysbx2').fadeOut('slow');
        $('#sysbx3').fadeIn('slow');
        $('#sysbx4').fadeOut('slow');
    });
    $('#sys4').on('mouseenter', function () {
        $('#sys1_on').fadeOut('slow');
        $('#sys2_on').fadeOut('slow');
        $('#sys3_on').fadeOut('slow');
        $('#sys4_on').fadeIn('slow');
        $('#sysbx1').fadeOut('slow');
        $('#sysbx2').fadeOut('slow');
        $('#sysbx3').fadeOut('slow');
        $('#sysbx4').fadeIn('slow');
    });
    
});

function leftTabChange(element) {
	
	$("div.leftTab li a").each(function(index, data) {
//		var src = $("img", data).attr("src");
//		src = src.replace("selected", "off");
//		$(data).attr("src", src);
	});
	
	var index = $(element).data('index');
	
	var ctx = $("#ctx").data("ctx");
	
	switch(index) {
		case 1 : // 레이어 관리
//			$(element).attr("src", ctx + "/css/usolver/com/images/left/tab_01_selected.gif");
			$("#layerTab").show();
			$("#legendTab").hide();
			$("#editToolTab").hide();
			$("#decisionTab").hide();
			$("#divSymbolEditTotal").hide();
			$('#tabLayerTree').trigger('click');
			break;
		case 2 : // 범례
			$("#layerTab").hide();
			$("#legendTab").show();
			$("#editToolTab").hide();
			$("#decisionTab").hide();
			break;
		case 3 : // 편집도구
			$("#layerTab").hide();
			$("#legendTab").hide();
			$("#editToolTab").show();
			$("#decisionTab").hide();
			$('#tabEditTool').trigger('click');
			break;
		case 4 : // 의사결정지원
			$("#layerTab").hide();
			$("#legendTab").hide();
			$("#editToolTab").hide();
			$("#decisionTab").show();
			break;
	}
}


//gnb
$.fn.accessibleDropDown = function () {

	$('#gnb > ul > li').mouseenter(function(){
		$(this).addClass('active');
		$('#gnb li.active div').show();
		}).mouseleave(function(){
			$(this).removeClass('active');
			$('.submenu').hide();
		});

	$("#gnb > ul > li > a").focus(function() {
		$(this).parents('li').addClass('active');
		$('#gnb li.active div').show();
		if($(this).hasClass('top')){
			$('.submenu').not($(this).parent("li").find(".submenu")).hide();
		}
	});

	$('#gnb > ul > li > a').focusout(function() {
		$(this).parents('li').removeClass('active');
			if($(this).hasClass('top')){
		$('.submenu').not($(this).parent("li").find(".submenu")).hide();
			}else{
		$('.submenu').not($(this).parents('.submenu')).hide(); 
		}
	});

	$('li:last-child > div > ul > li > a:last ').focusout(function(){
		$('.submenu').hide();
	}); 
	
	$('div.submenu > ul > li:last-child > a').addClass('bgnone');

}


function slide() {
    var pos = 0;
    var li_width = 100;
    var totalWidth = $(".scroll li").width() * $(".scroll li").length;
    $(".scroll ul").width(totalWidth)
    $(".right").click(function () {
        if (pos == totalWidth - 400) { return false; }
        pos += li_width;
        $(".scroll").animate({ scrollLeft: pos }, 500);
    });
    $(".left").click(function () {
        if (pos == 0) { return false; }
        pos -= li_width;
        $(".scroll").animate({ scrollLeft: pos }, 500);
    });
}

function leftOpen() {
    $('#leftCloseBt').removeClass('hidden');
    $('#leftOpenBt').addClass('hidden');
	// $("#map").css("left", "276px");
	$('#left').css("width", "315px");
	$('.leftCont').css("width", "276px");
	$('#timeLinBx').css("width", $(window).width() - (315+55));
	var sEHsrc = $('#btnEditHis').children('.onoffimg').attr('src');
	if(sEHsrc.substring(sEHsrc.lastIndexOf('_')+1) == 'selected.png') MAP_EDITOR.fn_create_timeLine(null, 0);
}
function leftClose() {
    $('#leftCloseBt').addClass('hidden');
    $('#leftOpenBt').removeClass('hidden');
//	$("#map").css("left", "0px");
    $('#left').css("width", "39px");
    $('.leftCont').css("width", "0px");
    $('#timeLinBx').css("width", $(window).width()-(39+55));
    var sEHsrc = $('#btnEditHis').children('.onoffimg').attr('src');
	if(sEHsrc.substring(sEHsrc.lastIndexOf('_')+1) == 'selected.png') MAP_EDITOR.fn_create_timeLine(null, 0);
}

function indexOpen() {
    $('#indexOffBt').removeClass('hidden');
    $('#indexOnBt').addClass('hidden');
    $('.indexmap').removeClass('hidden');
}
function indexClose() {
    $('#indexOffBt').addClass('hidden');
    $('#indexOnBt').removeClass('hidden');
    $('.indexmap').addClass('hidden');

}

function layerOpen() {
    $('#layerOffBt').removeClass('hidden');
    $('#layerOnBt').addClass('hidden');
    $('.layerbx').removeClass('hidden');
}
function layerClose() {
    $('#layerOffBt').addClass('hidden');
    $('#layerOnBt').removeClass('hidden');
    $('.layerbx').addClass('hidden');

}

function style() {
    $('.tblist thead th:last-child, .tblist tbody td:last-child, .tblist tfoot td:last-child').addClass('brnone');
	$('.tbview tbody th:last-child, .tbview tbody td:last-child').addClass('brnone');
	$('.tbview tbody tr:last-child th, .tbview tbody tr:last-child td').addClass('btcolor');

}

function storyShow() {
    $('#stOpen').click(function () {
        $('.stArea').show();
        $('#stOpen').hide();
        $('#stClose').show();
    });
}
function storyHide() {
    $('#stClose').click(function () {
        $('.stArea').hide();
        $('#stClose').hide();
        $('#stOpen').show();
    });
}



/* 지도팝업 리사이즈
-----------------------------------------------*/
function resize() {
	
	resizeTab();

        var doc_height = $(window).height();
        var mb_height; //검색결과영역
        var mbtn_height = ($('#map').height()/2) + 17;

        if (doc_height < 780) { mb_height = 780 - 200; }
        else {
            mb_height = doc_height - 200; //브라우저 - (상단메뉴+하단카피)
        }
        $('.resultBx').css("height", mb_height + "px");
       // $('#closeArea').show();
        $('#resultBx').css("height", mb_height - 60 + "px");

        $('.leftBtArea').css("top", mbtn_height - "px");

        $('.introimg').css("margin-top", (doc_height/2)-312 + "px");
}

function resizeTab() {
	var h = $(window).height();
	$('#layerTab .Left_SBx1').css('maxHeight', h - 131);
	$("#divLayerTree").css('maxHeight', h - 264);
}



function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}
function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}


function MM_preloadImages() { //v3.0
 var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
   var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
   if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//오직 숫자만을 입력받는지를 체크..
function onlynumber()
{
	var len=window.event.keyCode;
	if(len==13)
	{
		openPicwindow();
		return;
	}
	if((len>47 && len<60) || len == 8 || (len>95 && len<106) || len == 37 || len == 39 || len==46)
	{
	}
	else
	{			
		event.returnValue=false;
	}
}

//모든 레이어 숨기기
function hideAll()
{
	MM_showHideLayers('Layer1','','hide');
	MM_showHideLayers('Layer2','','hide');
	MM_showHideLayers('Layer3','','hide');
	MM_showHideLayers('Layer4','','hide');
	MM_showHideLayers('Layer5','','hide');
	MM_showHideLayers('Layer6','','hide');	
}

/*$(function () {
    $("dd:not(:first)").css("display", "none");
    $("dt:first").addClass("selected");
    $("dl dt").click(function () {
        if ($("+dd", this).css("display") == "none") {
            $("dd").slideUp("slow");
            $("+dd", this).slideDown("slow");
            $("dt").removeClass("selected");
            $(this).addClass("selected");
        }
    }).mouseover(function () {
        $(this).addClass("over");
    }).mouseout(function () {
        $(this).removeClass("over");
    });
});*/