package usolver.admin.board.service;

import java.util.List;

import usolver.admin.board.vo.NoticeVO;


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



/**  
 * @Class Name : SwlAodpAsService.java
 * @Description : SwlAodpAsService Class
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
public interface NoticeService {
	
	// ========== 공지사항 ==========
	
	List getBoardList(NoticeVO noticeVO) throws Exception;

	NoticeVO getBoardView(NoticeVO noticeVO) throws Exception;

	void insertBoard(NoticeVO noticeVO) throws Exception;

	int maxBoard() throws Exception;

	int selectBoardListCnt(NoticeVO noticeVO) throws Exception;

	NoticeVO getBoardEdit(NoticeVO noticeVO) throws Exception;
	
	void editBoard(NoticeVO noticeVO) throws Exception;

	void delete(NoticeVO noticeVO) throws Exception;

	void hitCnt(NoticeVO noticeVO) throws Exception;

	void insertBoardFile(NoticeVO noticeVO) throws Exception;

	void deleteFileBoard(NoticeVO noticeVO) throws Exception;

	Object boardFileCnt(NoticeVO noticeVO) throws Exception;

	List boardFileDetail(NoticeVO noticeVO) throws Exception;

	
	// ========== 자료실 ==========
	
	List getReferList(NoticeVO noticeVO) throws Exception;

	NoticeVO getReferView(NoticeVO noticeVO) throws Exception;

	void insertRefer(NoticeVO noticeVO) throws Exception;

	int maxRefer() throws Exception;

	int selectReferListCnt(NoticeVO noticeVO) throws Exception;

	NoticeVO getReferEdit(NoticeVO noticeVO) throws Exception;
	
	void editRefer(NoticeVO noticeVO) throws Exception;

	void deleteRefer(NoticeVO noticeVO) throws Exception;

	void hitCntRefer(NoticeVO noticeVO) throws Exception;

	void insertReferFile(NoticeVO noticeVO) throws Exception;

	void deleteFileRefer(NoticeVO noticeVO) throws Exception;

	Object referFileCnt(NoticeVO noticeVO) throws Exception;

	List referFileDetail(NoticeVO noticeVO) throws Exception;

	List getLatesBbs(NoticeVO noticeVO) throws Exception;

	List getLatesRef(NoticeVO noticeVO) throws Exception;

	void insertReply(NoticeVO noticeVO) throws Exception;

	int maxReply() throws Exception;

	NoticeVO getReplyView(NoticeVO noticeVO) throws Exception;

}


