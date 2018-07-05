/*********************************************************************************************************************
 * 
 *  Description : 페이지 레이아웃 세팅
	Modification Information
	수정일        수정자       수정내용
	-------    --------    ---------------------------
	2011.06.28   최재훈        최초 생성 
	
 * 용어정의
 * 1. pane : 레이아웃의 구성요소로 탑메뉴를 north, 좌측메뉴를 west..흔히 사용하는 top, bottom, left,right 대신 동/서/남/북 식으로 명명함
 *           ★ pane(north,south,east,west,center)중 사용할 부분은 _allPains에 정의
 * 2. toggler : 각 pane을 구분하는 slide bar의 event를 받아 처리하는 부분으로 default로는 slide bar의 중앙부분에 위치함 	  
 *********************************************************************************************************************/

var myLayout;

$(document).ready(function () {
	
	var _allPains = "north,south,west,center";
	
	myLayout = $('body').layout({

	//	enable showOverflow on west-pane so CSS popups will overlap north pane
		west__showOverflowOnHover: true
	/*************************************************************************************************************************
	* closable : 각 pane을 열고 닫을 수 있도록 할 것인지의 여부
	* resizable : 각 pane을 resize할 수 있도록 할 것인지의 여부
	* slidable : pane이 닫혀있는 상황에서 toggler가 아닌 부분을 클릭했을 경우 마우스오버 시 원래 상태로 돌아가능 기능을 사용할 것인지의 여부
	*************************************************************************************************************************/
	,	closable:				true	// pane can open & close
	,	resizable:				true	// when open, pane can be resized 
	,	slidable:				false	// when closed, pane can 'slide' open over other panes - closes on mouse-out
	
	/*********************************************************************************************
	* jquery.layout-latest.js의 options를 재정의(override)해 커스터마이징 처리가 가능함. 
	* var options = { }
	* pane명 + "__" + options 으로 overriding 처리하며 pane명 + "__"가 생략될 경우 모든 pane에 적용됨
	*********************************************************************************************/
	//	some resizing/toggling settings

	,	togglerLength_open: 		35	// toggle-button is full-width of resizer-bar
	,	togglerLength_closed: 		35	// 아래(south) pane만 적용할 경우 south_togglerLength_closed 값 지정
	,	togglerTip_open:			""	
	,	togglerTip_closed:			""	
	,	north__size:				77
	,	north__spacing_open:		5		// north pane이 열린 상태에서 슬라이드 바의 폭 너비 값
	,	north__spacing_closed:		8		// north pane이 닫힌 상태에서 슬라이드 바의 폭 너비 값
	,	north__togglerContent_open:		"<img src='/images/egovframework/ginnoframework/com/layout/btn/btn_mini_top.gif'>"
	,	north__togglerContent_closed:	"<img src='/images/egovframework/ginnoframework/com/layout/btn/btn_mini_bottom.gif'>"

	,	south__size:				240
	,	south__spacing_open:		5		// south pane이 열린 상태에서 슬라이드 바의 폭 너비 값
	,	south__spacing_closed:		8		// south pane이 닫힌 상태에서 슬라이드 바의 폭 너비 값
	,	south__togglerContent_open:		"<img src='/images/egovframework/ginnoframework/com/layout/btn/btn_mini_bottom.gif'>"
	,	south__togglerContent_closed:	"<img src='/images/egovframework/ginnoframework/com/layout/btn/btn_mini_top.gif'>" 
		

	,	west__size:					237
	,	west__spacing_open:			5		// south pane이 열린 상태에서 슬라이드 바의 폭 너비 값
	,	west__spacing_closed:		8		// south pane이 닫힌 상태에서 슬라이드 바의 폭 너비 값
	//,	south__resizable:			false	// OVERRIDE the pane-default of 'resizable=true'
	//	some pane-size settings **********************************************************
	//,	west__minSize:				100
	//,	east__size:					300
	//,	east__minSize:				200
	//,	east__maxSize:			Math.floor(screen.availWidth / 2) // 1/2 screen width
	//,	center__minWidth:			100
	,	useStateCookie:				false //사용자가 조정한 pane의 위치등을 기억하는 옵션 설정
	});

	var cookieExists = false;
	for (var key in myLayout.getCookie()) {
		cookieExists = true;
		break
	}
	if (!cookieExists) toggleStateManagement( true );
	 
	myLayout._create(_allPains);


});