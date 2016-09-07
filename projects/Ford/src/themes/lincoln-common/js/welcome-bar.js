/*
	Author: 		Brett Chaney
	Description: 	Detects if user is signed in (via cookie) and display "Welcome Bar"
*/


(function($) {
	$(function() {

		var showWelcomeBar = function() {
			// get user cookie data
			var userCookie 			= $.cookie("dfy.lh.u"),
			 	userCookieParsed 	= JSON.parse(decodeURIComponent(userCookie)),
			 	userTitle 			= userCookieParsed["t"],
			 	userName 			= userCookieParsed["u"],
			 	welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{title}', userTitle).replace('{user}', userName);
			
			//if title is Chinese then show name first
			if(userTitle.match(/[\u3400-\u9FBF]/)){
				welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{titleName}', userName + ' ' + userTitle);
			}
			else{
				welcomeMsg			= $(".welcome-bar .user-name").data("msg").replace('{titleName}', userTitle + ' ' + userName);
			}
			
			
			// inject welcome message
			$(".welcome-bar .user-name").html(welcomeMsg);

			// display welcome bar
			$(".welcome-bar").show();
			
			//hide "login/register" btn after login
			$("#header UL#eyebrow > LI.text > A, #header UL#toolbar > LI.menu-item > A").each(function(){
				if($(this).prop("href").indexOf("/register")!=-1){//if exist
					$(this).hide();
				}
			})
		};

		if ($.cookie("dfy.lh.u") && $(".welcome-bar")[0]) {
			// if user cookie exists display welcome bar
			showWelcomeBar();
		}

	});
})(jQuery);