package usolver.book.service.impl;

import java.util.*;

import javax.annotation.*;

import org.springframework.stereotype.*;

import usolver.book.service.StatisticService;
import usolver.book.vo.StatisticVO;
import usolver.com.cmm.dao.*;
import egovframework.rte.fdl.cmmn.*;

@Service("statisticService")
public class StatisticServiceImpl extends AbstractServiceImpl implements StatisticService {
	
	/** common DAO */
    @Resource(name="commonMapper")
    private CommonMapper commonMapper;
	
    
    /*    상수도대장 총괄부 현황 : 상수관로 : 취수관, 도수관, 송수관, 배수관, 공업용수관 */
    public List wtlPipeLmStatList(StatisticVO searchVO) throws Exception {
        return commonMapper.getSelectList("statistic.wtlPipeLmStatList", searchVO);
    }
/*    상수도대장 총괄부 현황 : 급수관로 : 급수관, 소방관*/
    public List wtlSplyLsStatList(StatisticVO searchVO) throws Exception {
        return commonMapper.getSelectList("statistic.wtlSplyLsStatList", searchVO);
    }
/*    상수도대장 총괄부 현황 : 변류시설*/
    public List wtlValvPsStatList(StatisticVO searchVO) throws Exception {
        return commonMapper.getSelectList("statistic.wtlValvPsStatList", searchVO);
    }
    
    
    public int registerTotalStat(StatisticVO searchVO) throws Exception {
    	 return commonMapper.getSelectCnt("statistic.registerTotalStat", searchVO);
    }
    
/* 시설물 현황*/
    public List registerStatList(StatisticVO searchVO) throws Exception {
        return commonMapper.getSelectList("statistic.registerStatList", searchVO);
    }
      
}
   