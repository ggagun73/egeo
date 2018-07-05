package usolver.admin.layer.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import usolver.admin.layer.service.LayerManageService;
import usolver.com.cmm.dao.CommonMapper;

@Service("layerManageService")
public class LayerManageServiceImpl implements LayerManageService{
	@Resource(name = "commonMapper")
	private CommonMapper commonMapper;
	
	public List<Map> selectLayer() {
		return (List<Map>)commonMapper.getSelectList("admin.selectLayer", null);
	}
	
	public List<Map> selectGroupLayer() {
		return (List<Map>)commonMapper.getSelectList("admin.selectLayerGroup", null);
	}
	
	public String searchSpatialtype(String layerName) {
		return (String) commonMapper.getSelect("admin.searchSpatialtype", layerName);
	}
	
	public int insertServiceLayer(Map layer) {
		return commonMapper.insert("admin.insertServiceLayer", layer);
	}
	
	public int updateServiceLayer(Map layer) {
		return commonMapper.update("admin.updateServiceLayer", layer);
	}
	
	public List<Map> selectServiceGroup() {
		return commonMapper.getSelectList("admin.selectServiceGroup", null);
	}
	
	public List<Map> selectServiceLayer(Map map) {
		return commonMapper.getSelectList("admin.selectServiceLayer", map);
	}
	
	public int deleteServiceLayer(Map layer) {
		return commonMapper.delete("admin.deleteServiceLayer", layer);
	}
	
	public String checkLayerName(String layerName) {
		return (String) commonMapper.getSelect("admin.checkLayerName", layerName);
	}
	
	public List<Map> selectEditLayer() {
		return commonMapper.getSelectList("admin.selectEditLayer", null);
	}
	
	public List<Map> selectRefLayer(String layerName) {
		return commonMapper.getSelectList("admin.selectRefLayer", layerName);
	}
	
	public int insertRefLayer(Map layerList) {
		return commonMapper.insert("admin.insertRefLayer", layerList);
	}
	
	public int deleteRefLayer(Map layerList) {
		return commonMapper.delete("admin.deleteRefLayer", layerList);
	}
	
	public List<Map> selectSnapLayer(String layerName) {
		return commonMapper.getSelectList("admin.selectSnapLayer", layerName);
	}
	
	public int insertSnapLayer(Map layerList) {
		return commonMapper.insert("admin.insertSnapLayer", layerList);
	}
	
	public int updateSnapLayer(Map layerList) {
		return commonMapper.update("admin.updateSnapLayer", layerList);
	}
	
	public int deleteSnapLayer(Map layerList) {
		return commonMapper.delete("admin.deleteSnapLayer", layerList);
	}
}
