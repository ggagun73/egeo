
/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package usolver.admin.board.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.board.service.NoticeService;
import usolver.admin.board.vo.NoticeVO;
import usolver.com.cmm.dao.CommonMapper;
import egovframework.rte.fdl.cmmn.AbstractServiceImpl;

/**  
 * @Class Name : SwlAodpAsServiceImpl.java
 * @Description : Sample Business Implement Class
 * @Modification Information  
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.07.24           최초생성
 * 
 * @author 지노시스템
 * @since 2014. 07.24
 * @version 1.0
 * @see
 * 
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service("noticeService")
public class NoticeServiceImpl extends AbstractServiceImpl implements
        NoticeService {
	
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
    
    /** ID Generation */
    @Resource(name="noticeService")    
    private NoticeService noticeService;

    
    // ========== 공지사항 ==========
    
	public List getBoardList(NoticeVO noticeVO) throws Exception {

		 return commonMapper.getSelectList("admin.selectNoticeBoardList", noticeVO);
	}

	public NoticeVO getBoardView(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return (NoticeVO) commonMapper.getSelect("admin.selectNoticeBoardView", noticeVO);
	}

	public void insertBoard(NoticeVO noticeVO) throws Exception {
		
		commonMapper.insertData("admin.insertNoticeBoard", noticeVO);
	}

	public int maxBoard() throws Exception {

		NoticeVO noticeVO = new NoticeVO();
		
		return commonMapper.getSelectCnt("admin.selectNoticeBoardMaxIdx",noticeVO);
	}

	public int selectBoardListCnt(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.getSelectCnt("admin.selectNoticeBoardCount",noticeVO);
	}
	
	public NoticeVO getBoardEdit(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return (NoticeVO) commonMapper.getSelect("admin.selectNoticeBoardView", noticeVO);
	}
	
	public void editBoard(NoticeVO noticeVO) throws Exception {
		
		commonMapper.updateData("admin.updateNoticeBoard", noticeVO);
	}

	public void delete(NoticeVO noticeVO) throws Exception {

		commonMapper.updateData("admin.updateNoticeBoardDel", noticeVO);
	}

	public void hitCnt(NoticeVO noticeVO) throws Exception {
		
		commonMapper.updateData("admin.updateNoticeBoardHit", noticeVO);
	}

	public void insertBoardFile(NoticeVO noticeVO) throws Exception {
		
		commonMapper.insertData("admin.insertAttachment", noticeVO);
	}

	public void deleteFileBoard(NoticeVO noticeVO) throws Exception {
		
		commonMapper.updateData("admin.updateAttachmentDel", noticeVO);
	}

	public Object boardFileCnt(NoticeVO noticeVO) throws Exception {

		return commonMapper.getSelectCnt("admin.selectAttachmentCount", noticeVO);
	}

	public List boardFileDetail(NoticeVO noticeVO) throws Exception {

		return commonMapper.getSelectList("admin.selectAttachmentView", noticeVO);
	}

	
	// ========== 자료실 ==========
	
	public List getReferList(NoticeVO noticeVO) throws Exception {

		 return commonMapper.getSelectList("admin.selectReferRoomList", noticeVO);
	}

	public NoticeVO getReferView(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return (NoticeVO) commonMapper.getSelect("admin.selectReferRoomView", noticeVO);
	}

	public void insertRefer(NoticeVO noticeVO) throws Exception {
		
		commonMapper.insertData("admin.insertReferRoom", noticeVO);
	}

	public int maxRefer() throws Exception {

		NoticeVO noticeVO = new NoticeVO();
		
		return commonMapper.getSelectCnt("admin.selectReferRoomMaxIdx",noticeVO);
	}

	public int selectReferListCnt(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.getSelectCnt("admin.selectReferRoomCount",noticeVO);
	}
	
	public NoticeVO getReferEdit(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return (NoticeVO) commonMapper.getSelect("admin.selectReferRoomView", noticeVO);
	}
	
	public void editRefer(NoticeVO noticeVO) throws Exception {
		
		commonMapper.updateData("admin.updateReferRoom", noticeVO);
	}

	public void deleteRefer(NoticeVO noticeVO) throws Exception {

		commonMapper.updateData("admin.updateReferRoomDel", noticeVO);
	}

	public void hitCntRefer(NoticeVO noticeVO) throws Exception {
		
		commonMapper.updateData("admin.updateReferRoomHit", noticeVO);
	}

	public void insertReferFile(NoticeVO noticeVO) throws Exception {
		
		commonMapper.insertData("admin.insertReferRoomAttachment", noticeVO);
	}

	public void deleteFileRefer(NoticeVO noticeVO) throws Exception {
		
		commonMapper.updateData("admin.updateAttachmentDel", noticeVO);
	}

	public Object referFileCnt(NoticeVO noticeVO) throws Exception {

		return commonMapper.getSelectCnt("admin.selectAttachmentCount", noticeVO);
	}

	public List referFileDetail(NoticeVO noticeVO) throws Exception {

		return commonMapper.getSelectList("admin.selectAttachmentView", noticeVO);
	}

	public List getLatesBbs(NoticeVO noticeVO) throws Exception {
		
		return commonMapper.getSelectList("admin.selectNoticeBoardIntro", noticeVO);
	}

	public List getLatesRef(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return commonMapper.getSelectList("admin.selectReferRoomIntro", noticeVO);
	}

	public void insertReply(NoticeVO noticeVO) throws Exception {
		
		commonMapper.insertData("admin.insertReferRoomReply", noticeVO);
		
	}

	public int maxReply() throws Exception {
		
		NoticeVO noticeVO = new NoticeVO();
		
		return commonMapper.getSelectCnt("admin.selectReferRoomMaxIdx",noticeVO);
	}
	
	public NoticeVO getReplyView(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return (NoticeVO) commonMapper.getSelect("admin.selectReferRoomView", noticeVO);
	}

	// ========== 공 통 ==========
	
	/*public List getFileList(NoticeVO noticeVO) throws Exception {
		// TODO Auto-generated method stub
		return commonDAO.getSelectList("content.board.fileList", noticeVO);
	}*/
			
	
}

