	//Modal Window (Dinamic Create DIV)
    var body = document.getElementsByTagName("body")[0];

	/* Example
		<div id="jqmModalWindow" class="jqmWindow">
			<div id="jqmTitle" class="jqmTitle">
				<span id="jqmTitleText" class="jqmTitleText">111</span>
				<a href="#" class="jqmClose"><img src="/jquery/jqmodal/images/btn_close.gif" border="0"/></a>
			</div>
			<iframe id="jqmContent" class="jqmIFrame" frameborder="0" scrolling="no"></iframe>
		</div>
	*/
	//Create Dynamic Element
	var modalDiv = document.createElement("font");
	modalDiv.setAttribute("id","jqmModalWindow"); 
	modalDiv.setAttribute("class","jqmWindow");

	var titleDiv = document.createElement("div");
	titleDiv.setAttribute("id","jqmTitle"); 
	titleDiv.setAttribute("class","jqmTitle");
	
	var modalTitle = document.createElement("span");
	modalTitle.setAttribute("id","jqmTitleText");
	modalTitle.setAttribute("class","jqmTitleText");
	
	var modalBtnA = document.createElement("a");
	modalBtnA.setAttribute("href","#"); 
	modalBtnA.setAttribute("class","jqmClose");

	var modalBtnImg = document.createElement("img");
	modalBtnImg.setAttribute("src", "/jquery/jqmodal/images/btn_close.gif");
	modalBtnImg.setAttribute("border","0");

	var modalIFrame = document.createElement("iframe");
	modalIFrame.setAttribute("id","jqmContent");
	modalIFrame.setAttribute("class","jqmIFrame");
	modalIFrame.setAttribute("frameborder","0");
	modalIFrame.setAttribute("scrolling","no");
	
	modalBtnA.appendChild(modalBtnImg);	
	titleDiv.appendChild(modalTitle);
	titleDiv.appendChild(modalBtnA);
	modalDiv.appendChild(titleDiv);
	modalDiv.appendChild(modalIFrame);
	
	body.appendChild(modalDiv);

	/* Example <link rel="stylesheet" type="text/css" href="/jquery/jqmodal/jqModalCustom.css" /> */
	//Create Dynamic CSS StyleSheet
	var styleSheet = '/jquery/jqmodal/jqModalCustom.css';
	var head = document.getElementsByTagName("head")[0];
	var linkElement = document.createElement("link");
	linkElement.setAttribute("rel","stylesheet");
	linkElement.setAttribute("type","text/css");
	linkElement.setAttribute("href",styleSheet);
	head.appendChild(linkElement);


	
	$('#jqmModalWindow').jqm({
		overlay: 70,
		modal: true,
		target: '#jqmContent'
		//onHide: closeJqModal
	});
	
	//$('#jqmModalWindow').jqm().jqDrag('#jqmTitle');
	 		

function closeJqModal()
{
	$('#jqmModalWindow').jqmHide();
}
	

/** jqModal : pop modal
 *  url : iframe URL
 *  title : modal window title 
 *  width : modal window Width
 *  height : modal window Height
 */
function ShowModalWindow(url, title, width, height)
{
    var popUpUrl = url;

	$('#jqmTitleText').text(title);
 	$('#jqmModalWindow').jqm({
 	 	onShow: function(hash) {
 	 		var $modal = $(hash.w);
 	 		var $modalContent = $("iframe", $modal);
 	 		$modalContent.html('').attr('src',url);
 	 		if(height>0) $modal.height(height);
 	 		if(width>0) $modal.width(width);
 	 		hash.w.show();
 		}
 	}).jqmShow();    
    
}
 
 function ShowModalWindow2(url, title, width, height)
 {
     var popUpUrl = url;

 	$('#jqmTitleText').text(title);
  	$('#jqmModalWindow').jqm({
  	 	onShow: function(hash) {
  	 		var $modal = $(hash.w);
  	 		var $modalContent = $("body", $modal);
  	 		$modalContent.html('').attr('src',url);
  	 		if(height>0) $modal.height(height);
  	 		if(width>0) $modal.width(width);
  	 		hash.w.show();
  		}
  	}).jqmShow();    
     
 }
