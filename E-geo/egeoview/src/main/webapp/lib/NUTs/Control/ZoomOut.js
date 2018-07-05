/**********************************************************************************
 * 파일명 : GZoomOut.js
 * 설 명 : OpenLayers.Control.ZoomBox 를 상속 받아 수정
 * 필요 라이브러리 : OpenLayers
 * 
 * 수정일				수정자				version				Function 명
 * --------------------------------------------------------------------------------
 * 2011.04.19		최원석				0.1					최초 생성
 * 
 * 
 * 
 * 참고 자료
 * --------------------------------------------------------------------------------
 * OpenLayers
 * 출처 : http://openlayers.org/
 * 
 * 
**********************************************************************************/
NUTs.Control.ZoomOut = OpenLayers.Class(OpenLayers.Control.ZoomBox, {
	
	/**
	 * 축소
	 */
	out : true,
	
	/**********************************************************************************
	 * 함수명 : draw
	 * 설 명 : 영역 박스를 그림
	 * 사용법 : draw()
	 * 작성일 : 2011.04.21
	 * 작성자 : 기술개발팀 최원석
	 * 수정일				수정자			수정내용
	 * ----------------------------------------------------------------------
	 * 2011.04.21		최원석		핸들러로 Box 에서 NUTs.Handler.Box를 등록 하도록 수정
	 * 								
	 **********************************************************************************/
	draw: function() {
        this.handler = new NUTs.Handler.Box( this,
                            {done: this.zoomBox}, {keyMask: this.keyMask} );
    },
	
	CLASS_NAME: "NUTs.Control.ZoomOut"
});