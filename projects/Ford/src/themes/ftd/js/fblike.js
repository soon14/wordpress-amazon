//create the fblike button
(function($, window, document){

	//callback function
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '277451909039945', // App ID
			channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
			status     : false, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});

		// Localise a grabber function. Grabber function helps with content values and urls
		var grabber = ND.analytics.grabber();
		master = grabber({meta:"meta[name='dfy.title']"});

		/*
		Tracking like event
		api: https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/
		edge.remove,  comment.create,  comment.remove
		*/
		FB.Event.subscribe('edge.create', function(href, widget) {
			var	data = { 
					title: 'Facebook',
					uri: '/like/facebook',
					socialId: 'Facebook'
				};

			$.publish('/analytics/social/', data);
		});
	};

	var fbLike = ND.fbLike = {
		init: function(){
			if(document.getElementById("facebook-jssdk")) return;
			var api = $(".fb-like").eq(0).attr("title");
			if(!api || api=="") return;

			var js, fjs = document.getElementsByTagName("script")[0];
			js = document.createElement("script");
			js.id = "facebook-jssdk";
			js.src = api;
			fjs.parentNode.insertBefore(js, fjs);
		}
	};

	$(document).ready(function(){
		fbLike.init();
	});

})(jQuery, window, document);