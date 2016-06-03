/*! logging.js version 1.0 */
/*jslint onevar: true, undef: true, eqeqeq: true, regexp: true, newcap: true, immed: true */
/*globals jQuery, console, window */
(function($){
	// make it safe to use console.log always
	(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
	{console.log();return window.console;}catch(err){return window.console={};}})());
	
	$.fn.log = function (msg) {
		console.log("%s: %o", msg, this); 
		return this;
	};
}(jQuery));