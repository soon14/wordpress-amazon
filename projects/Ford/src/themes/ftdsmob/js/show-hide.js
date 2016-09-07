/*
 * Author:      Brett Chaney
 * Description: Simple show/hide
 */

(function($) {
	
	$(function(){
		
		var 

		showHideClass	= $(".show-hide"),
		selectMenu		= $(".select-menu > select"),
		
		showHide = function() {

			// hide all sections with "show-hide" class
			showHideClass.hide();

			// show only section that is selected in select menu
			$("#" + selectMenu.val()).show();

			selectMenu.change(function() {
				showHideClass.hide();   
				$("#" + this.value).show();

			});
		};

		// run show/hide function if "show-hide" class is found
		if (showHideClass.length > 0) {
			showHide();
		}
		//expand/collaspe the row 
		$(".section-wrap .section .head").click(function(){
			var scope = $(this),
				sectionWrap = scope.closest(".row"),
				animationField = sectionWrap.find(".comparator_content");
			
			if(sectionWrap.hasClass("active")){
				animationField.slideUp(400,function(){
					sectionWrap.removeClass("active");
				});
			}else{
				animationField.slideDown(400,function(){
					sectionWrap.addClass("active");
				});
			}
		})
		
		/*
		 * as data of mobile specification page is read from brandsite, it will add <a href=".."></a> to some of data which does not require a link in mobile page
		 * the following code is to banned default link behaviour by adding class "banned-link"
		 */
		var elementWrap = $(".specification-table td .banned-link");
		if(elementWrap.length>0){
			elementWrap.on("click",function(e){
				e.preventDefault();
			})
		}
	});

})(jQuery);