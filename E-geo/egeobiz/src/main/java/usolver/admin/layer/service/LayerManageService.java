package usolver.admin.layer.service;

import java.util.List;
import java.util.Map;

public interface LayerManageService {
	
	public List<Map> selectLayer();
	
	public List<Map> selectGroupLayer();
	
	public String searchSpatialtype(String layerName);
	
	public int insertServiceLayer(Map layer);
	
	public int updateServiceLayer(Map layer);
	
	public List<Map> selectServiceLayer(Map map);
	
	public List<Map> selectServiceGroup();
	
	public int deleteServiceLayer(Map layer);

	public String checkLayerName(String layerName);
	
	public List<Map> selectEditLayer();
	
	public List<Map> selectRefLayer(String layerName);
	
	public int insertRefLayer(Map layerList);

	public int deleteRefLayer(Map layerList);
	
	public List<Map> selectSnapLayer(String layerName);
	
	public int insertSnapLayer(Map layerList);

	public int updateSnapLayer(Map layerList);
	
	public int deleteSnapLayer(Map layerList);
}
