/*
Author: York Zhang
Description: Owner Avatar Icon login/logout dropdown
*/

(function($){

	var avatar = {
		init: function(){
			if(!$(".account-menu").size() || !$("#avatar-dropdown").size()) {return;}
			
			var loggedInPromise = instance.checkUserLogin();
			loggedInPromise.success(function (data) {
				//console.log("login",data.loggedin);
				if (data.loggedin === "true"){
					var $listItem = $("div.account-menu.list-items");
					var markup = $("#avatar-dropdown");

					$listItem.html("");

					$.template("avatarDropdown",markup);
					$.tmpl("avatarDropdown",data).appendTo($listItem);

					if ($("#toolbar .signup").length > 0){
						$("#toolbar .signup").hide();
					}
				}
				
			});
		}
	};

	$(function(){
		avatar.init();
	});

})(jQuery);


