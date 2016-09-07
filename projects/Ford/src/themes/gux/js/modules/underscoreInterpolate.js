/*
Source: 		http://stackoverflow.com/questions/5771742/underscore-js-templates-within-jsp
File name: 		underscoreInterpolate.js
Description: 	Change Underscore's template settings to use different symbols to set off interpolated code that doesn't conflict with jsp
Usage: 			Use <@ @> instead of Underscore's default <% %>
*/

var guxApp = guxApp || {};

(function($){
	guxApp.interpolate = {
		init: function(){
			_.templateSettings = {
				interpolate: /\<\@\=(.+?)\@\>/gim,
				evaluate: /\<\@([\s\S]+?)\@\>/gim,
				escape: /\<\@\-(.+?)\@\>/gim
			};
		}
	}

	$(function(){
		guxApp.interpolate.init();
	});

})(jQuery);