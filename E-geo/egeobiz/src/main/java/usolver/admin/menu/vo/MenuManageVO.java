package usolver.admin.menu.vo;

/** 
 * 메뉴목록관리 처리를 위한 VO 클래스르를 정의한다
 * @author 개발환경 개발팀 이용
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.20  이  용          최초 생성
 *
 * </pre>
 */

public class MenuManageVO{

	private	String	menuNm;
	private	int		menuOrdr;
	private	int		menuNo;
	private	String	menuId;
	private	String	menuDc;
	private	String	menuType;
	private	String	width;
	private	String	height;
	private	String	insertHeight;
	private	String	call;
	private	String	keyColumn;
	private	int		upperMenuNo;
	private	String	relateImagePath;
	private	String	relateImageNm;
	private	String	functionList;
	private	String	progrmFileNm;
	private 	String userId;

   /** 사이트맵 */
   /** 생성자ID **/
   private   String   creatPersonId;

   /** 권한정보설정 */
   /** 권한코드 */
   private   String   authorCode;

   /** 기타VO변수 */
   private   String   tempValue;
   private   int      tempInt; 
   

   /** Login 메뉴관련 VO변수 */
   /** tmp_Id */
   private   String   tmpId;
   /** tmp_Password */
   private   String   tmpPassword;
   /** tmp_Name */
   private   String   tmpName;
   /** tmp_UserSe */
   private   String   tmpUserSe;
   /** tmp_Email */
   private   String   tmpEmail;
   /** tmp_OrgnztId */
   private   String   tmpOrgnztId;
   /** tmp_UniqId */
   private   String   tmpUniqId;
   /** tmp_Cmd */
   private   String   tmpCmd;
      
	/**
	 * menuAuthorList 값을 설정한다.
	 * @param authorList String[]
	 */   
   private  String[]  authorList;
   
	
	public String getMenuNm() {
		return menuNm;
	}
	public void setMenuNm(String menuNm) {
		this.menuNm = menuNm;
	}
	public int getMenuOrdr() {
		return menuOrdr;
	}
	public void setMenuOrdr(int menuOrdr) {
		this.menuOrdr = menuOrdr;
	}
	public int getMenuNo() {
		return menuNo;
	}
	public void setMenuNo(int menuNo) {
		this.menuNo = menuNo;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getMenuDc() {
		return menuDc;
	}
	public void setMenuDc(String menuDc) {
		this.menuDc = menuDc;
	}
	public String getMenuType() {
		return menuType;
	}
	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getInsertHeight() {
		return insertHeight;
	}
	public void setInsertHeight(String insertHeight) {
		this.insertHeight = insertHeight;
	}
	public String getCall() {
		return call;
	}
	public void setCall(String call) {
		this.call = call;
	}
	public String getKeyColumn() {
		return keyColumn;
	}
	public void setKeyColumn(String keyColumn) {
		this.keyColumn = keyColumn;
	}
	public int getUpperMenuNo() {
		return upperMenuNo;
	}
	public void setUpperMenuNo(int upperMenuNo) {
		this.upperMenuNo = upperMenuNo;
	}
	public String getRelateImagePath() {
		return relateImagePath;
	}
	public void setRelateImagePath(String relateImagePath) {
		this.relateImagePath = relateImagePath;
	}
	public String getRelateImageNm() {
		return relateImageNm;
	}
	public void setRelateImageNm(String relateImageNm) {
		this.relateImageNm = relateImageNm;
	}
	public String getFunctionList() {
		return functionList;
	}
	public void setFunctionList(String functionList) {
		this.functionList = functionList;
	}
	public String getProgrmFileNm() {
		return progrmFileNm;
	}
	public void setProgrmFileNm(String progrmFileNm) {
		this.progrmFileNm = progrmFileNm;
	}
	public String getCreatPersonId() {
		return creatPersonId;
	}
	public void setCreatPersonId(String creatPersonId) {
		this.creatPersonId = creatPersonId;
	}
	public String getAuthorCode() {
		return authorCode;
	}
	public void setAuthorCode(String authorCode) {
		this.authorCode = authorCode;
	}
	public String getTempValue() {
		return tempValue;
	}
	public void setTempValue(String tempValue) {
		this.tempValue = tempValue;
	}
	public int getTempInt() {
		return tempInt;
	}
	public void setTempInt(int tempInt) {
		this.tempInt = tempInt;
	}
	public String getTmpId() {
		return tmpId;
	}
	public void setTmpId(String tmpId) {
		this.tmpId = tmpId;
	}
	public String getTmpPassword() {
		return tmpPassword;
	}
	public void setTmpPassword(String tmpPassword) {
		this.tmpPassword = tmpPassword;
	}
	public String getTmpName() {
		return tmpName;
	}
	public void setTmpName(String tmpName) {
		this.tmpName = tmpName;
	}
	public String getTmpUserSe() {
		return tmpUserSe;
	}
	public void setTmpUserSe(String tmpUserSe) {
		this.tmpUserSe = tmpUserSe;
	}
	public String getTmpEmail() {
		return tmpEmail;
	}
	public void setTmpEmail(String tmpEmail) {
		this.tmpEmail = tmpEmail;
	}
	public String getTmpOrgnztId() {
		return tmpOrgnztId;
	}
	public void setTmpOrgnztId(String tmpOrgnztId) {
		this.tmpOrgnztId = tmpOrgnztId;
	}
	public String getTmpUniqId() {
		return tmpUniqId;
	}
	public void setTmpUniqId(String tmpUniqId) {
		this.tmpUniqId = tmpUniqId;
	}
	public String getTmpCmd() {
		return tmpCmd;
	}
	public void setTmpCmd(String tmpCmd) {
		this.tmpCmd = tmpCmd;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String[] getAuthorList() {
		return authorList;
	}
	public void setAuthorList(String[] authorList) {
		this.authorList = authorList;
	}
   
   
}