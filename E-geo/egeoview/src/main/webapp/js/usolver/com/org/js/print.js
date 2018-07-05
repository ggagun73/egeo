		function jsPrint()
		{
			document.getElementById("divPrint").style.display = "none";
			window.print();
			document.getElementById("divPrint").style.display = "inline";
			return false;
		}
		
		
		//세로열림
		function resizeWindow(){
			window.resizeTo(900,1024);
		}
		
		
		//가로열림
		function resizeWindow2(){
			window.resizeTo(1200,800);
		}