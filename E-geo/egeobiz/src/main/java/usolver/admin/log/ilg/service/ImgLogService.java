package usolver.admin.log.ilg.service;

import java.util.Map;

import usolver.admin.log.ilg.vo.ImgLog;

public interface ImgLogService {
	public Map getImgLogInfo(ImgLog imgLog) throws Exception;
	public ImgLog getImgLogImg(int imgLogId) throws Exception;
	public int intsertImgLog(ImgLog imgLog) throws Exception;
	public int deleteImgLog(int imgLogId) throws Exception;
}
