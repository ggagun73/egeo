package usolver.com.cmm.vo;
/**
 * @file Name : FileInfoVO.java
 * @Description : FileInfoVO class
 * @Modification Information
 * @
 * @  수정일         수정자                   수정내용
 * @ -------    --------    ---------------------------
 * @ 2009.03.05      이동도          최초 생성
 *
 *  @author 실행환경 개발팀 이동도
 *  @since 2009.03.05
 *  @version 1.0
 *  @see
 *  
 *  Copyright (C) 2009 by MOPAS  All right reserved.
 */
import java.io.Serializable;

public class FileInfoVO implements Serializable {

	private static final long serialVersionUID = -2334475343466662506L;

	private String FILE_NM;
	private String FILE_COURS;

	public String getFILE_NM() {
		return FILE_NM;
	}
	public void setFILE_NM(String fILE_NM) {
		FILE_NM = fILE_NM;
	}
	public String getFILE_COURS() {
		return FILE_COURS;
	}
	public void setFILE_COURS(String fILE_COURS) {
		FILE_COURS = fILE_COURS;
	}

}
