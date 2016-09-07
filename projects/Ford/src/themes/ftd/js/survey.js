(function($){
	
	//menu
	var Survey = function() {
		var survey = this;
		
		survey.intercept = function() {
			$(document).ready(function() {
				
				var config = $("#page-config").embeddedData();//get config
				
				if (typeof config !== 'undefined' && typeof config.survey !== 'undefined' && config.survey === 'true') {

					//check if have Omniture page name set
					if (typeof s !== 'undefined' && typeof s.pageName !== 'undefined') {
						
						//get current user id
						var sessionId = ND.personaliser.getUserId();
						
						$wait(function(){
							runInterceptRules(sessionId, s.pageName, window.location.hostname)
						});
					} else {
						//console.log("NO omniture NO survey.");
					}
				}
			});
		};
	};
	
	
	$(function() {
		var survey = new Survey();
		survey.intercept();
	});
	
})(jQuery);