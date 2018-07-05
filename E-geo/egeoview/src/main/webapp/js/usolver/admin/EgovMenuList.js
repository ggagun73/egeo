/****************************************************************
 *
 * 파일명 : EgovMenuList.js
 * 설  명 : 전자정부 공통서비스 메뉴 JavaScript
 *
 *   수정일         수정자           Function 명
 * ------------    ---------    ----------------------------
 * 2011.09.01	    이기하			imgpath 변수는 js를 호출하는
 * 								    jsp에서 입력받도록 수정
 *
 *
 */

/*
 * 노드 , 트리 구성 정보 선언
 */
var treeNodes		= new Array();
var openTreeNodes= new Array();
var treeIcons			= new Array(6);
var imgpath 			= "/images/usolver/admin/";
var treeYeobu       = false;
var treeCheck		= false;
var addDiv			=""; 
/*
 * 노드 , 트리 구성 이미지 정보
 */
function preloadIcons() {
	treeIcons[0] = new Image();
	treeIcons[0].src = imgpath+"tree_plus.gif";
	treeIcons[1] = new Image();
	treeIcons[1].src = imgpath+"tree_plus.gif";
	treeIcons[2] = new Image();
	treeIcons[2].src = imgpath+"tree_minus.gif";
	treeIcons[3] = new Image();
	treeIcons[3].src = imgpath+"tree_minus.gif";
	treeIcons[4] = new Image();
	treeIcons[4].src = imgpath+"menu_folder.gif";
	treeIcons[5] = new Image();
	treeIcons[5].src = imgpath+"menu_folderopen.gif";
}
/*
* 트리생성함수
*/
function createTree(arrName, vYeobu) {

	var startNode, openNode;
	treeNodes = arrName;
	treeYeobu = vYeobu;
	if (treeNodes.length > 0) {
		preloadIcons();
		if (startNode == null) startNode = 0;
		if (openNode != 0 || openNode != null) setOpenTreeNodes(openNode);
		if (startNode !=0) {
			var nodeValues = treeNodes[getTreeArrayId(startNode)].split("|");
			
			document.write("<a href='" + nodeValues[3] + "' onmouseover='window.status='" + nodeValues[3] + "';return true;' onmouseout='window.status=' ';return true;'><img src='"+imgpath+"menu_folderopen.gif' border='0' align='absbottom' alt=''>" + nodeValues[2] + "</a><br>");
		} //else document.write("<img src='"+imgpath+"menu_base.gif' border='0' align='absbottom' alt='' >root<br>");
		var recursedNodes = new Array();
		
		if(vYeobu == 'checkBox') treeCheck = true;
		
		addTreeNode(startNode, recursedNodes);
	}
	treeCheck = false;
}
/*
* 신규 트리노드 추가
*/
function addTreeNode(parentNode, recursedNodes) {
	for (var i = 0; i < treeNodes.length; i++) {
		
		var nodeValues = treeNodes[i].split("|");
		
		if(nodeValues[0] < 9000000 || 9999939 < nodeValues[0]){
			if (nodeValues[1] == parentNode) {
	
				var lastSibling	= lastTreeSibling(nodeValues[0], nodeValues[1]);
				var hasChildNode = hasChildTreeNode(nodeValues[0]);
				var isNodeOpen = isTreeNodeOpen(nodeValues[0]);
				
				
				for (g=0; g<recursedNodes.length; g++) {		// deeps 같은데~~ 최상위 [1], 그다음꺼 추가되면 [1, 1]
					if (recursedNodes[g] == 1) document.write("<img src='"+imgpath+"menu_line.gif' border='0' align='absbottom' alt='' >");
					//else  document.write("<img src='"+imgpath+"menu_empty.gif' border='0' align='absbottom' alt='' >");
				}
				if (lastSibling){	//최 하위 노드 이면
					if(nodeValues[0] == '1000000' || nodeValues[0] == '3000000' || nodeValues[0] == '5000000'){
						lastSibling = false;
						recursedNodes.push(1);
					}
					else recursedNodes.push(0);
				}
				else recursedNodes.push(1);
				if (hasChildNode) {  //하위 트리노드 존재 하면
					if (lastSibling) {
						document.write("<a href='javascript: openCloseEx(" + nodeValues[0] + ", 1);'><img id='join" + nodeValues[0] + "' src='"+imgpath);
						 	if (isNodeOpen) document.write("tree_minus");
							else document.write("tree_plus");
						document.write(".gif' border='0' align='absbottom' alt='Open/Close node' ></a>");
					} else {
						document.write("<a href='javascript: openCloseEx(" + nodeValues[0] + ", 0);'><img id='join" + nodeValues[0] + "' src='"+imgpath);
							if (isNodeOpen) document.write("tree_minus");
							else document.write("tree_plus");
						document.write(".gif' border='0' align='absbottom' alt='Open/Close node' /></a>");
					}
				} else {
					if (lastSibling) document.write("<img src='"+imgpath+"menu_joinbottom.gif' border='0' align='absbottom' alt='' >");
					else document.write("<img src='"+imgpath+"menu_join.gif' border='0' align='absbottom' alt='' >");
				}
				
				if(treeCheck == true) document.write("<input type='checkbox' name='functionTree' value='"+ nodeValues[0] +"'/><a href=javascript:choiceNodes('" + i + "');>");
				else document.write("<a href=javascript:choiceNodes('" + i + "');>");
				
				if (hasChildNode) {
					document.write("&nbsp;&nbsp;");
					//document.write("<img id='icon" + nodeValues[0] + "' src='"+imgpath+"menu_folder");
					//	if (isNodeOpen) document.write("open");
					//document.write(".gif' border='0' alt='Folder' >");
				} else document.write("&nbsp;"); //document.write("<img id='icon" + nodeValues[0] + "' src='"+imgpath+"menu_page.gif' border='0' align='absbottom' alt='Page'>");
	
				document.write(nodeValues[2]); // 한글 이름
				
				document.write("</a><br>");
				if (hasChildNode) {			// 하위 노드 있으면 nodeValues[0] 1000000 그룹 아이디로 div 생성
					document.write("<div id='div" + nodeValues[0] + "'");
						if (!isNodeOpen) document.write(" style='display: none;'");
					document.write(">");
					addTreeNode(nodeValues[0], recursedNodes);
					document.write("</div>");
				}
				recursedNodes.pop();	// deeps [1, 1, 1] 에서 하나 뺌 [1, 1]
			}
		}
	}
}

function createTree2(arrName, view) {
	var parentTree = [];
	var treeData = new Array();
	var temp, bool=true;
	var test = [];
	var basic, water, sewer, road;
	
	if(view !== 'none') view = '';
	
	treeNodes = arrName;
	preloadIcons();

	for(var i = 0; i < treeNodes.length; i++){
		temp =  treeNodes[i];
		treeData[i] = temp.split("|");
			
		if(parentTree.indexOf(treeData[i][1]) == -1){
			
			parentTree.push(treeData[i][1]);

			if(treeData[i][2] == '기본도') basic = treeData[i][1];
			else if(treeData[i][2] == '상수') water = treeData[i][1];
			else if(treeData[i][2] == '하수') sewer = treeData[i][1];
			else if(treeData[i][2] == '도로') road = treeData[i][1];
			
			document.write("<div id='top" + treeData[i][1] + "' style='display:"+view+"'>");
			
			document.write("<a href='javascript: openCloseEx(" + treeData[i][1] + ", 0);'><img id='join" + treeData[i][1] + "' src='"+imgpath);
			document.write("tree_minus");
			document.write(".gif' border='0' align='absbottom' alt='Open/Close node' /></a>");
			document.write("<input type='checkbox' name='functionTree' value='"+ treeData[i][1] +"'/><a href=javascript:choiceNodes('" + i + "');>");
			document.write("&nbsp;");
			
			document.write(treeData[i][2]); // 한글 이름
			
			document.write("</a><br>");
			document.write("</div>");
			document.write("<div id='div" + treeData[i][1] + "' style='display:"+view+"'></div>");
		}
		
		$('#div'+ treeData[i][1]).append("<img src='"+imgpath+"menu_line.gif' border='0' align='absbottom' alt='' >");
		$('#div'+ treeData[i][1]).append("<img src='"+imgpath+"menu_join.gif' border='0' align='absbottom' alt='' >");
		$('#div'+ treeData[i][1]).append("<input type='checkbox' class='upperTree' name='functionTree' value='"+ treeData[i][3] +"'/><a href=javascript:choiceNodes('" + i + "');>");
		$('#div'+ treeData[i][1]).append("&nbsp;&nbsp;");
		$('#div'+ treeData[i][1]).append(treeData[i][6]); // 한글 이름
		$('#div'+ treeData[i][1]).append("</a><br>");
	}

	return {BASIC:basic, WATER:water, SEWER:sewer, ROAD:road};
}


/*
* 트리생성함수 DIV 아래에 추가해 보장.. 
*/
function createTreeDiv(arrName, vYeobu, divId ) {
	addDiv = divId;
	var startNode, openNode;
	treeNodes = arrName;
	treeYeobu = vYeobu;
	if (treeNodes.length > 0) {
		preloadIcons();
		if (startNode == null) startNode = 0;
		if (openNode != 0 || openNode != null) setOpenTreeNodes(openNode);
		if (startNode !=0) {
			var nodeValues = treeNodes[getTreeArrayId(startNode)].split("|");			
			$("#"+addDiv).append("<a href='" + nodeValues[3] + "' onmouseover='window.status='" + nodeValues[3] + "';return true;' onmouseout='window.status=' ';return true;'><img src='"+imgpath+"menu_folderopen.gif' border='0' align='absbottom' alt=''>" + nodeValues[2] + "</a><br>");
		} 
		var recursedNodes = new Array();
		
		if(vYeobu == 'checkBox') treeCheck = true;
		
		subHtml = addTreeNodeDiv(startNode, recursedNodes);
		
		$("#"+addDiv).append(subHtml);
	}
	treeCheck = false;	
}

/*
* 신규 트리노드 추가
*/
function addTreeNodeDiv(parentNode, recursedNodes) {
	
	var subimg = "";
	
	for (var i = 0; i < treeNodes.length; i++) {
		
		var nodeValues = treeNodes[i].split("|");
		
		if(nodeValues[0] < 9000000 || 9999939 < nodeValues[0]){
			if (nodeValues[1] == parentNode) {
	
				var lastSibling	= lastTreeSibling(nodeValues[0], nodeValues[1]);
				var hasChildNode = hasChildTreeNode(nodeValues[0]);
				var isNodeOpen = isTreeNodeOpen(nodeValues[0]);
								
				for (g=0; g<recursedNodes.length; g++) {		// deeps 같은데~~ 최상위 [1], 그다음꺼 추가되면 [1, 1]
					if (recursedNodes[g] == 1) subimg +="<img src='"+imgpath+"menu_line.gif' border='0' align='absbottom' alt='' >";
				}
				if (lastSibling){	//최 하위 노드 이면
					if(nodeValues[0] == '1000000' || nodeValues[0] == '3000000' || nodeValues[0] == '5000000'){
						lastSibling = false;
						recursedNodes.push(1);
					}
					else recursedNodes.push(0);
				}
				else recursedNodes.push(1);
				if (hasChildNode) {  //하위 트리노드 존재 하면
					if (lastSibling) {
							subimg += "<a href='#' onClick='javascript:openCloseExDiv(" + nodeValues[0] + ", 1);'><img id='join" + nodeValues[0] + "' src='"+imgpath;
						 	if (isNodeOpen) subimg += "tree_minus";
							else subimg += "tree_plus";
						 	subimg +=".gif' border='0' align='absbottom' alt='Open/Close node' ></a>";
						
					} else {
						    subimg += "<a href='#' onClick='javascript:openCloseExDiv(" + nodeValues[0] + ", 0);'><img id='join" + nodeValues[0] + "' src='"+imgpath;
							if (isNodeOpen)subimg += "tree_minus";
							else subimg += "tree_plus";
							subimg += ".gif' border='0' align='absbottom' alt='Open/Close node' /></a>";
					}
				} else {
					if (lastSibling) subimg +="<img src='"+imgpath+"menu_joinbottom.gif' border='0' align='absbottom' alt='' >";
					else subimg +="<img src='"+imgpath+"menu_join.gif' border='0' align='absbottom' alt='' >";
				}
				
				
				if(treeCheck == true) subimg +="<input type='checkbox' name='functionTree' value='"+ nodeValues[0] +"'/><a href='#' onClick='javascript:choiceNodes(" + nodeValues[0] + ")'>";
				else subimg +="<a href='#' onClick='javascript:choiceNodes(" + nodeValues[0] + ");' >";
				
				if (hasChildNode) {
					subimg +="&nbsp;&nbsp;";
				} else subimg +="&nbsp;"; 

				subimg +=nodeValues[2]; // 한글 이름				
				subimg +="</a><br>";
				
				if (hasChildNode) {			// 하위 노드 있으면 nodeValues[0] 1000000 그룹 아이디로 div 생성
					subimg += "<div id='div" + nodeValues[0] + "' ";		
					if (!isNodeOpen) subimg += "style='display: none;'";
					subimg += ">";					
					subimg += addTreeNodeDiv(nodeValues[0], recursedNodes);			
					subimg += "</div>";					
				}				
				recursedNodes.pop();	// deeps [1, 1, 1] 에서 하나 뺌 [1, 1]
			}
		}
	}
	
	return subimg;
}
/*
* 노드위치 확인
*/
function getTreeArrayId(node) {
	for (i=0; i<treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[0]==node) return i;
	}
	return 0;
}
/*
* 트리 노드 열기
*/
function setOpenTreeNodes(openNode) {
	for (i=0; i<treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[0]==openNode) {
			openTreeNodes.push(nodeValues[0]);
			setOpenTreeNodes(nodeValues[1]);
		}
	}
}
/*
* 트리노드 오픈 여부 확인
*/
function isTreeNodeOpen(node) {
   if (treeYeobu){ return true; }
   for (i=0; i<openTreeNodes.length; i++){
	   if (openTreeNodes[i]==node){ return true; }
   }
   return false;
}
/*
* 하위 트리노드 존재여부 확인
*/
function hasChildTreeNode(parentNode) {
	for (i=0; i< treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[1] == parentNode) return true;
	}
	return false;
}
/*
* 트리노드 최하위 여부 확인
*/
function lastTreeSibling (node, parentNode) {
	var lastChild = 0;
	
	for (i=0; i< treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[1] == parentNode)
			lastChild = nodeValues[0];
	}
	if (lastChild==node) return true;
	return false;
}
/*
* 트리노드 액션(열기,닫기)
*/
function openCloseEx(node, bottom) {
	var treeDiv = document.getElementById("div" + node);
	var treeJoin	= document.getElementById("join" + node);
	var treeIcon = document.getElementById("icon" + node);

	if (treeDiv.style.display == 'none') {
		if (bottom==1) treeJoin.src = imgpath+"tree_minus.gif";
		else treeJoin.src =  imgpath+"tree_minus.gif";
		//treeIcon.src = treeIcons[5].src;
		treeDiv.style.display = '';
	} else {
		if (bottom==1) treeJoin.src = imgpath+"tree_plus.gif";
		else treeJoin.src = imgpath+"tree_plus.gif";
		//treeIcon.src = treeIcons[4].src;
		treeDiv.style.display = 'none';
	}
}


/*
* 트리노드 액션(열기,닫기)
*/
function openCloseExDiv(node, bottom) {

	$("#"+addDiv).find("#div" + node).toggle();
	if ($("#"+addDiv).find("#div" + node).css("display") == "none"){
		$("#"+addDiv).find("#join" + node).attr("src",imgpath+"tree_plus.gif");
	}else {		
		$("#"+addDiv).find("#join" + node).attr("src",imgpath+"tree_minus.gif");
	}	
}

if(!Array.prototype.push) {
	function fnArrayPush() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
	Array.prototype.push = fnArrayPush;
}
if(!Array.prototype.pop) {
	function fnArrayPop(){
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
	Array.prototype.pop = fnArrayPop;
}

