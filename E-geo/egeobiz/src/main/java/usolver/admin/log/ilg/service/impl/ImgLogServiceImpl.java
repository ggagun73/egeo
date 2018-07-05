package usolver.admin.log.ilg.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.log.ilg.service.ImgLogService;
import usolver.admin.log.ilg.vo.ImgLog;
import usolver.com.cmm.dao.CommonMapper;

@Service("imgLogService")
public class ImgLogServiceImpl implements ImgLogService {
	/** common Mapper */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
	
	public int intsertImgLog(ImgLog imgLog) throws Exception {
		return commonMapper.insert("admin.insertImgLog", imgLog);
	}
	
	public int deleteImgLog(int imgLogId) throws Exception {
		return commonMapper.delete("admin.deleteImgLog", imgLogId);
	}
	
	public Map getImgLogInfo(ImgLog imgLog) throws Exception {
		List<?> _result = commonMapper.getSelectList("admin.getImgLogInfo", imgLog);
		int _cnt = commonMapper.getSelectCnt("admin.selectImgLogCnt", imgLog);
		
		Map<String, Object> _map = new HashMap<String, Object>();
		_map.put("resultList", _result);
		_map.put("resultCnt", Integer.toString(_cnt));
		
		return _map;
	}
	public ImgLog getImgLogImg(int imgLogId) throws Exception {
		return (ImgLog) commonMapper.getSelect("admin.getImgLogImg", imgLogId);
	}
}
