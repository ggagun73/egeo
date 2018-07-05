/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 고급편집 정의
 * @author 윤은희(2016.06.03)
 */
var AdvancedEditType = {	
	Blank : {
		id : '',
		src : '/images/usolver/com/map/left/advancedEditBlank.png',
		alt : '빈 이미지',
		title : '빈 이미지'
	},
	LineCut : {
		id : 'btnLineCut',
		src : '/images/usolver/com/map/left/left_b01_off.png',
		alt : '선분할',
		title : '선분할'
	},
	LineMerge : {
		id : 'btnLineMerge',
		src : '/images/usolver/com/map/left/left_b02_off.png',
		alt : '선병합',
		title : '선병합'
	},
	DirectChg : {
		id : 'btnDirectChg',
		src : '/images/usolver/com/map/left/left_b03_off.png',
		alt : '방향전환',
		title : '방향전환'
	},
	OverSignRemove : {
		id : 'btnOverSignRemove',
		src : '/images/usolver/com/map/left/left_b04_off.png',
		alt : '상월표시제거',
		title : '상월표시제거'
	},
	CrossPointMng : {
		id : 'btnCrossPointMng',
		src : '/images/usolver/com/map/left/left_b05_off.png',
		alt : '교차지점관리',
		title : '교차지점관리'
	},
	HoleEdit : {
		id : 'btnHoleEdit',
		src : '/images/usolver/com/map/left/left_b06_off.png',
		alt : '홀편집',
		title : '홀편집'
	},
	PolygonCut : {
		id : 'btnPolygonCut',
		src : '/images/usolver/com/map/left/left_b07_off.png',
		alt : '면분할',
		title : '면분할'
	},
	PolygonMerge : {
		id : 'btnPolygonMerge',
		src : '/images/usolver/com/map/left/left_b08_off.png',
		alt : '면병합',
		title : '면병합'
	},
	CopyPaste : {
		id : 'btnCopyPaste',
		src : '/images/usolver/com/map/left/left_b09_off.png',
		alt : '도형 + 속성 복사 및 붙여넣기',
		title : '도형 + 속성 복사 및 붙여넣기'
	},
	SectionCut : {
		id : 'btnSectionCut',
		src : '/images/usolver/com/map/left/left_b01_off.png',
		alt : '구간분할',
		title : '구간분할'
	},
	SectionMerge : {
		id : 'btnSectionMerge',
		src : '/images/usolver/com/map/left/left_b02_off.png',
		alt : '구간병합',
		title : '구간병합'
	},
	SideWalkAdd : {
		id : 'btnSideWalkAdd',
		src : '/images/usolver/com/map/left/left_b01_off.png',
		alt : '보도입력',
		title : '보도입력'
	},
	MidOfRoadAssign : {
		id : 'btnMidOfRoadAssign',
		src : '/images/usolver/com/map/left/left_b02_off.png',
		alt : '중용구간지정',
		title : '중용구간지정'
	}	
}


/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 시설물별 고급편집 정의
 * @author 윤은희(2016.06.03)
 */
var AdvancedEditDefinition = {
		
		/**
		 * BLANK형이며, 이 속성은 삭제하지 마시오.
		 */
		BLANK  : [AdvancedEditType.Blank],
		
		/**
		 * 여기서부터는 시설물별 고급편집 정의 : 추가 정의가 필요한 시설물 및 고급편집 옵션을 추가하여 사용하시기 바랍니다.
		 */		
		WTL_SPLY_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.DirectChg, AdvancedEditType.CopyPaste],
		WTL_PIPE_LM : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.DirectChg, AdvancedEditType.CopyPaste],	
		WTL_PURI_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.HoleEdit, AdvancedEditType.CopyPaste],
		WTL_FIRE_PS : [AdvancedEditType.CopyPaste],
		SWL_PIPE_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		SWL_DODR_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		BML_RIVR_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge],
		SWL_AODP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		SWL_DODP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		SWL_SIDE_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.DirectChg, AdvancedEditType.CopyPaste],
		SWL_PIPE_LM : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.DirectChg, AdvancedEditType.CopyPaste],
		SWL_AODR_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		SWL_CONN_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.DirectChg, AdvancedEditType.CopyPaste],
		RDL_EVRD_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_CMDT_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_SDHP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_BRDG_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_SQAR_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_ETCT_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_RBLN_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.CopyPaste],
		RDL_RDAR_AS : [AdvancedEditType.SectionCut, AdvancedEditType.SectionMerge, AdvancedEditType.SideWalkAdd, AdvancedEditType.MidOfRoadAssign, AdvancedEditType.CopyPaste],
		RDL_CTLR_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.CopyPaste],
		RDL_PROT_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.CopyPaste],
		RDL_SMRW_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.CopyPaste],
		RDL_OCUP_LS : [AdvancedEditType.LineCut, AdvancedEditType.LineMerge, AdvancedEditType.CopyPaste],
		RDL_NSPV_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_OVPS_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_BYCP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_SLOP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_OCUP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_PAKP_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_MDST_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_SBWY_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_UGRD_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_TRNL_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_PAVE_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste],
		RDL_PDCR_AS : [AdvancedEditType.PolygonCut, AdvancedEditType.PolygonMerge, AdvancedEditType.CopyPaste]		
}