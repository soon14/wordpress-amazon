/*
Author: Ruiwen Qin
Description: User login/logout panel in header 
			 1. Rendering the jQuery template based on user login status
			 2. Toggle the panel by clicking the avatar icon
*/

(function($){
	var widgets = {
			
			avatarInit: function(){
				var container = $("#toolbar-dropdown");
				var markup = $("#toolbar-mobile-template").html();

				var loggedInPromise = instance.checkUserLogin();

				loggedInPromise.success(function (data) {
					var userInfo = $('#user').embeddedData();
					$.extend(userInfo,data);
					widgets.renderTemplate(markup,userInfo,container);
					widgets.togglePanel(container);
				});
				widgets.element();
			},
			renderTemplate: function(markup,userInfo,container){
				$.template("avatarTemplate",markup);
				$.tmpl("avatarTemplate",userInfo).appendTo(container);
			},
			togglePanel: function(container){
				$("#toolbar-mobile a").click(function(){
					var displayEl = "",
						curEl = $(this),
						curElContainer = curEl.parent(".item-wrap"),
						curElList = curEl.closest("li"),
						elListArray = curEl.closest("#toolbar-mobile").children("li");
					
					//more than 1 item exist, eg. if language bar been added
					if(elListArray.length>1){
						//to control which dropdown list should be show
						if(curElContainer.hasClass("sign-up")){
							displayEl = ".btngroup";
						}else if(curElContainer.hasClass("language-bar")){
							displayEl = ".lang-group";
						}else{
							container.children("div").show();
						}
						var displayObj = container.children(displayEl);
						if(displayObj.length > 0){displayObj.show();}
						//if specified dropdown field already displayed
						if(displayObj.hasClass("active")){
							container.slideUp(function(){
								displayObj.removeClass("active");
								curElList.removeClass("active");
							});
						}else{
							container.hide();
							//hide all other dropdown fields and show specified dropdown field
							container.children("div").removeClass("active").hide();
							displayObj.addClass("active").show();
							//remove "active" status for all other elements and add to current one
							elListArray.removeClass("active");
							curElList.addClass("active");
							container.slideDown();
						}
					}else{
						//keep previous logic to avoid risks on existing site
						container.slideToggle();
						curEl.toggleClass("active");
					}
				});
			},
			element: function(){
				//bind event on hidden field. this fixed redirect will not trigger while click on nested radio button under "a" tag
				$("#header").on("click","#toolbar-dropdown .lang-group .lang-list",function(){
					var url = $(this).attr("href");

					$(this).find("input").attr("checked", "checked");
					if(url){window.location.href = url;}
				});

			}
	};

	

	$(function(){

		widgets.avatarInit();
		
	});

})(jQuery);