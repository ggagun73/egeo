package usolver.com.cmm.map.service.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class MultipartFileVO {
	private List<MultipartFile> files;

	public List<MultipartFile> getFiles() {
		return files;
	}

	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
	
	public MultipartFile getFile(int index) {
		return files.get(index);
	}

}
