		/**
		* @memberof  js/usolver/book
		* @method 
		* @description  출력 양식에서 인쇄버튼 클릭시 처리
		* @author 김수예(2016. 9. 6.)
		* @returns {Boolean}
		*/
		function fn_book_print()
		{
			document.getElementById("divPrint").style.display = "none";
			window.print();			
			document.getElementById("divPrint").style.display = "inline";
			return false;
		}
		
		/**
		* @memberof  js/usolver/book
		* @method 
		* @description 출력창 오픈시 세로로 보이게 처리
		* @author 김수예(2016. 9. 6.)
		*/
		function fn_resize_heightWindow(){
			window.resizeTo(900,1024);
		}
		

		/**
		* @memberof  js/usolver/book
		* @method 
		* @description 출력창 오픈시 가로로 보이게 처리
		* @author 김수예(2016. 9. 6.)
		*/
		function fn_resize_widthWindow(){
			window.resizeTo(1200,800);
		}
		
