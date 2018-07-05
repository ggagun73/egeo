/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 편집룰 적용 레이어 정의
 * 
 * 		[Object 구조]
 * 
 * 		레이어명 : {
 * 			mainlayer : {Array} 룰 정의 레이어명,
 * 			onlayer 	:  {Array} mainlayer 위에 존재하는 레이어,
 * 			connectedlayer : {Array or Object} mainlayer와 연결된 레이어 혹은 객체 
 * 		}
 * 
 * @author 윤은희(2016.04.19)
 */
var EditRuleRelatedLayer = {
		
		//=====================================================================
		// 													■ 상수시설물 ■
		//=====================================================================
		
		/**
		 * 변류시설
		 */
		WTL_VALV_PS : {
			mainlayer : ['WTL_VALV_PS'],
			onlayer : [],
			connectedlayer : []
		},
		
		/**
		 * 상수맨홀
		 */
		WTL_MANH_PS : {
			mainlayer : ['WTL_MANH_PS'],
			onlayer : [],
			connectedlayer : []
		},
		
		/**
		 * 소방시설
		 */
		WTL_FIRE_PS : {
			mainlayer : ['WTL_FIRE_PS'],
			onlayer : [],
			connectedlayer : []
		},
		
		/**
		 * 급수관로
		 */
		WTL_SPLY_LS : {
			mainlayer : ['WTL_SPLY_LS'],
			onlayer : ['WTL_META_PS', 'WTL_FIRE_PS'],
			connectedlayer : []
		},	
		
		/**
		 * 상수관로
		 */
		WTL_PIPE_LM : {			
			mainlayer : ['WTL_PIPE_LM'],
			// 스탠드파이프(X), 변류시설(O), 유량계(O), 수압계(O), 수원지(X), 취수장(O), 가압장(O), 배수지(O), 상수관로심도(O), 누수지점 및 복구내역(O), 신축관실(-상수맨홀종류임)
			// onlayer : ['WTL_STPI_PS', 'WTL_VALV_PS', 'WTL_FLOW_PS', 'WTL_PRGA_PS', 'WTL_STPI_PS', 'WTL_GAIN_PS', 'WTL_PRES_PS', 'WTL_SERV_PS', 'WTL_PIPE_PS', 'WTL_LEAK_PS', 'WTL_MANH_PS'],
			// 현재 DB에 구축된 레이어로만 걸러냄.
			onlayer : ['WTL_VALV_PS', 'WTL_FLOW_PS', 'WTL_PRGA_PS', 'WTL_GAIN_PS', 'WTL_PRES_PS', 'WTL_SERV_PS', 'WTL_PIPE_PS', 'WTL_LEAK_PS', 'WTL_MANH_PS'],
			connectedlayer : []
		},		
		
		
		
		//=====================================================================
		// 													■ 하수시설물 ■
		//=====================================================================
		
		/**
		 * 면형하수관거
		 */
		SWL_PIPE_AS : {
			mainlayer : ['SWL_PIPE_AS'],
			onlayer : [],
			connectedlayer : []
		},		
		
		/**
		 * 하수관거
		 */
		SWL_PIPE_LM : {			
			mainlayer : ['SWL_PIPE_LM'],
			// 현재 DB에 구축된 레이어로만 걸러냄.
			// 하수관거심도(O)/하수맨홀(O)/환기구(X)/하수펌프장(O)/유수지(X)/역사이펀(X)/토구(O)/하수처리장(O)/측구(O)/우수토실(X)
			onlayer : ['SWL_DEPT_PS', 'SWL_MANH_PS', 'SWL_PUMP_PS', 'SWL_SPEW_PS', 'SWL_DRAN_PS', 'SWL_SIDE_LS'],
			connectedlayer : []
		},
		
		/**
		 * 하수연결관
		 */
		SWL_CONN_LS : {
			mainlayer : ['SWL_CONN_LS'],
			onlayer : [],
			connectedlayer : ['SWL_SPOT_PS']
		},
		
		
		
		//=====================================================================
		// 													■ 도로시설물 ■
		//=====================================================================
	
		/**
		 * 가로수
		 */
		RDL_TREE_PS : {
			mainlayer : ['RDL_TREE_PS'],
			onlayer : [],
			connectedlayer : []
		},

		/**
		 * 도로면
		 */
		RDL_RDAR_AS : {
			mainlayer : ['RDL_RDAR_AS'],
			onlayer : [],
			connectedlayer : []
		}
};
EditRuleRelatedLayer.WTL_PIPE_LM.connectedlayer =  EditRuleRelatedLayer.WTL_SPLY_LS;
EditRuleRelatedLayer.SWL_PIPE_LM.connectedlayer =  EditRuleRelatedLayer.SWL_CONN_LS;










/**
 * @memberof USV.MAP_EDITOR
 * @method 
 * @description 레이어별 편집룰 정의
 * 
 * 		[Object 구조]
 * 
 * 		레이어명 : {
 * 			Operation종류 : [{
							operType : {String} Operation 종류-소문자(종류 : add, del, modify),
							label : {String} 편집 룰 UI에 표시할 룰 명칭,
							rule : {String} 룰
							htmlType : {String} 편집 룰 UI에 적용되는 HTML Element 요소 종류(checkbox, textbox, selectbox)
							errorMsg : {String} 룰 적용 편집 수행 실패시 화면에 표시할 에러 메시지
							option : [{	{Array{Object}} 	'add' Operation에만 정의되며, HTML UI의 Selectbox를 생성하게 됨.
									label : {String} HTML Selectbox의 기본 타이틀
									valueType : {String} HTML Selectbox에 표시하는 항목이 '레이어' 인지 '속성'인지 정의(layer, attr) 
									value : {Array} HTML Selectbox 에 표시할 실제 값 
								}]
			}],
 * 		},
 * 	
 * 		[★★★★★★★★ 참고사항-중요 ★★★★★★★★]
 * 		'modify' Operation 설정시, checkRelationGeometryMove 와 checkRelationGeometryMoveEndPoint 룰은 같이 사용될 수 없음. 둘 중 하나만 지정.
 * 
 * @author 윤은희(2016.04.19)
 */
var EditRuleDefinition = {
		
		//=====================================================================
		// 													■ 상수시설물 ■
		//=====================================================================
		
		/**
		 * 가압장
		 */
		WTL_PRES_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 급수전계량기
		 */
		WTL_META_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 급수관로와 연결확인',
				rule : 'EditRule.checkRelationGeometryEnd(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_SPLY_LS.mainlayer, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer)',
				htmlType : 'checkbox',
				errorMsg : '급수관로의 끝점과 연결되어야합니다.' 
			}],
			del : [],			
			modify : [{
				operType : 'modify',
				label : '급수관로와 연결지점 동시 이동',
				rule : 'EditRule.checkRelationGeometryMoveEndPoint(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_SPLY_LS.mainlayer)',
				htmlType : 'checkbox',
				errorMsg : '연결된 급수관로가 존재하지 않습니다.'
			},
			{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 누수지점 및 복구내역
		 */
		WTL_LEAK_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 배수지
		 */
		WTL_SERV_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 변류시설
		 */
		WTL_VALV_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			},
			{
				operType : 'add',
				label : '',
				rule : '',
				htmlType : '',
				errorMsg : '',
				option : [{
						label : '추가시, 적용할 변류종류 ',
						valueType : 'attr',
						value : {
							field : 'FTR_CDE',
							attr : ['SA200', 'SA201', 'SA202', 'SA203', 'SA204', 'SA205'] //['제수변', '역지변', '이토변', '배기변', '감압변', '안전변', '지수전']
						}
					}]
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 상수관로 심도
		 */
		WTL_PIPE_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 상수맨홀
		 */
		WTL_MANH_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			},
			{
				operType : 'add',
				label : '',
				rule : '',
				htmlType : '',
				errorMsg : '',
				option : [{
						label : '추가시, 적용할 맨홀종류 ',
						valueType : 'attr',
						value : {
							field : 'FTR_CDE',
							attr : ['SA100', 'SA991'] 	// ['상수맨홀', '신축관실']
						}
					}]
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 소방시설
		 */
		WTL_FIRE_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 급수관로와 연결확인',
				rule : 'EditRule.checkRelationGeometryEnd(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_SPLY_LS.mainlayer, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer)',
				htmlType : 'checkbox',
				errorMsg : '급수관로의 끝점과 연결되어야합니다.' 
			},
			{
				operType : 'add',
				label : '',
				rule : '',
				htmlType : '',
				errorMsg : '',
				option : [{
						label : '추가시, 적용할 소방시설종류 ',
						valueType : 'attr',
						value : {
							field : 'FTR_CDE',
							attr : ['SA119', 'SA118'] 	// ['소화전', '급수탑']
						}
					},
					{
						label : '추가시, 적용할 소화전 형식',
						valueType : 'attr',
						value : {
							field : 'MOF_CDE',
							attr : ['MOF000', 'MOF200','MOF201','MOF202','MOF203'] 	// [미분류,지상단구,지상쌍구,지하단구,지하쌍구]
						}
					}]
			}],
			del : [],			
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 수압계
		 */
		WTL_PRGA_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 급수관로
		 */
		WTL_SPLY_LS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.TOUCHES)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			},
			{
				operType : 'add',
				label : '추가시, 관말에 시설추가',
				rule : 'EditRule.checkRelationAddPointOnGeometryEnd(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer)',
				htmlType : 'checkbox',
				errorMsg : '관말에 추가되어야 합니다.',
				option : [{
						label : '추가시, 적용할 관말시설 ',
						valueType : 'layer',
						value : EditRuleRelatedLayer.WTL_SPLY_LS.onlayer
					}]
			}],
			del : [{
				operType : 'del',
				label : '삭제시, 연결된 계량기 존재시 삭제불가',
				rule : 'EditRule.checkRelationGeometryDeleteForSuwon(EditRule.editingGeometry)',
				htmlType : 'checkbox',
				errorMsg : '연결된 급수전계량기 존재시 급수관로 삭제 불가'
			}],			
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',
				htmlType : 'textbox',
				errorMsg : ''
			},
			{
				operType : 'modify',
				label : '관로상의 시설 동시 이동',
				rule : 'EditRule.checkRelationGeometryMove(EditRule.editingGeometry, EditRule.offset)',
				htmlType : 'checkbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 상수관로
		 */
		WTL_PIPE_LM : {
			add : [{
				operType : 'add',
				label : '추가시, 기존관로와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.TOUCHES)',
				htmlType : 'checkbox',
				errorMsg : '기존관로와 연결되어 있어야 합니다.'
			}],
			del : [{		
				operType : 'del',
				label : '삭제시, 관로상의 시설 삭제',
				rule : 'EditRule.checkRelationGeometryDeleteForSuwon(EditRule.editingGeometry)',
				htmlType : 'checkbox',
				errorMsg : ''
			}],			
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			},
			{
				operType : 'modify',
				label : '관로상의 시설 동시 이동',
				rule : 'EditRule.checkRelationGeometryMove(EditRule.editingGeometry, EditRule.offset)',
				htmlType : 'checkbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 유량계
		 */
		WTL_FLOW_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},

		/**
		 * 저수조
		 */
		WTL_RSRV_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 취수장
		 */
		WTL_GAIN_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		//=========================== [시작] DB에 미구축된 시설물들임 ==================
		/**
		 * 스탠드파이프
		 */
		WTL_STPI_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 상수관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.WTL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '상수관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},	
		//=========================== [끝] DB에 미구축된 시설물들임 ===================
		
		
		
		
		
		//=====================================================================
		// 													■ 하수시설물 ■
		//=====================================================================
		
		/**
		 * 물받이
		 */
		SWL_SPOT_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수연결관 말과 연결확인',
				rule : 'EditRule.checkRelationGeometryEnd(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_CONN_LS.mainlayer, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer)',
				htmlType : 'checkbox',
				errorMsg : '연결관 말의 끝점과 연결되어야합니다.' 
			}],
			del : [],			
			modify : [{
				operType : 'modify',
				label : '하수연결관과 연결지점 동시 이동',
				rule : 'EditRule.checkRelationGeometryMoveEndPoint(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_CONN_LS.mainlayer)',
				htmlType : 'checkbox',
				errorMsg : '연결된 하수연결관이 존재하지 않습니다.'
			},
			{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 토구
		 */
		SWL_SPEW_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 하수관거심도
		 */
		SWL_DEPT_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 하수맨홀
		 */
		SWL_MANH_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 하수처리장
		 */
		SWL_DRAN_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 하수펌프장
		 */
		SWL_PUMP_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 면형하수관거
		 */
		SWL_PIPE_AS : {
			add : [{
				operType : 'add',
				label : '',
				rule : '',
				htmlType : '',
				errorMsg : '',
				option : [{
						label : '추가시, 적용할 면형하수관종류 ',
						valueType : 'attr',
						value : {
							field : 'FTR_CDE',
							attr : ['SB901', 'SB902'] 	// ['면형암거', '면형개거']
						}
					}]
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 측구
		 */
		SWL_SIDE_LS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.TOUCHES)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 하수관거
		 */
		SWL_PIPE_LM : {
			add : [{
				operType : 'add',
				label : '추가시, 기존관로와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.TOUCHES)',
				htmlType : 'checkbox',
				errorMsg : '기존관로와 연결되어 있어야 하거나 교차하지 않아야 합니다.'
			},
			{
				operType : 'add',
				label : '',
				rule : '',
				htmlType : '',
				errorMsg : '',
				option : [{
						label : '추가시, 적용할 하수관 종류 ',
						valueType : 'attr',
						value : {
							field : 'FTR_CDE',
							attr : ['SB001','SB002'] 	// ['암거','개거']
						}
					},
				    {
				    	label : '추가시, 적용할 하수관 용도 ',
						valueType : 'attr',
						value : {
							field : 'SBA_CDE',
							attr : ['SBA000','SBA001','SBA002','SBA003','SBA004'] 	// ['미분류','합류관','차집관','우수관','오수관']
						}
					}]
			}],
			del : [{		
				operType : 'del',
				label : '삭제시, 관로상의 시설 삭제',
				rule : 'EditRule.checkRelationGeometryDelete(EditRule.editingGeometry)',
				htmlType : 'checkbox',
				errorMsg : ''
			}],			
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			},
			{
				operType : 'modify',
				label : '관로상의 시설 동시 이동',
				rule : 'EditRule.checkRelationGeometryMove(EditRule.editingGeometry, EditRule.offset)',
				htmlType : 'checkbox',
				errorMsg : ''
			}]
		},		
		
		/**
		 * 하수연결관
		 */
		SWL_CONN_LS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.TOUCHES)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		//=========================== [시작] DB에 미구축된 시설물들임 ==================
		/**
		 * 역사이펀
		 */
		SWL_RSPH_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 우수토실
		 */
		SWL_CLAY_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수연결관과 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_CONN_LS.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수연결관과 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 유수지
		 */
		SWL_PRES_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		
		/**
		 * 환기구
		 */
		SWL_VENT_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 하수관거와 연결확인',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.SWL_PIPE_LM.mainlayer, EditRule.spatialOperType.INTERSECTS)',
				htmlType : 'checkbox',
				errorMsg : '하수관거와 연결되어 있어야 합니다.'
			}],
			del : [],
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		},
		//=========================== [끝] DB에 미구축된 시설물들임 ====================
		
		
		
		
		//=====================================================================
		// 													■ 도로시설물 ■
		//=====================================================================
		
		/**
		 * 가로수
		 */
		RDL_TREE_PS : {
			add : [{
				operType : 'add',
				label : '추가시, 도로면내에 위치',
				rule : 'EditRule.checkRelationGeometry(EditRule.editingGeometry, EditRuleRelatedLayer.RDL_RDAR_AS.mainlayer, EditRule.spatialOperType.CONTAINS,' + CONFIG.fn_get_wfsServiceUrl() + ',' + CONFIG.fn_get_dataHouseName() + ')',
				htmlType : 'checkbox',
				errorMsg : '도로면 내에 위치해야 합니다.'
			}],
			del : [],			
			modify : [{
				operType : 'modify',
				label : '이격거리로 이동(m)',
				rule : 'EditRule.checkRelationGeometryMoveToByOffset(EditRule.editingGeometry, EditRule.offset, true)',				
				htmlType : 'textbox',
				errorMsg : ''
			}]
		}
		
};


