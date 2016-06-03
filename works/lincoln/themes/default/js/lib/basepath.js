/*! basepath.js version 1.0 gbaker */
/*jslint onevar: true, undef: true, eqeqeq: true, regexp: true, newcap: true, immed: true */
/*globals jQuery, document , window */
(function(lib, undefined){
	var lb = window[lib] = window[lib] || {}, forcePath;
	if(lb.basepath !== undefined) {return;}
	lb.basepath = function(value){
		var domBase = document.getElementsByTagName('base'),
			basePath = (forcePath !== undefined ? forcePath : (domBase.length > 0 ? domBase[0].href : "/"));
		return value === undefined ? basePath : basePath + value;
	};
	lb.basepathOverride = function(value){forcePath = value;};
	
	jQuery.fn.attrBasePath = function( name, value ) {
		return arguments.length === 2 ? this.attr(name, lb.basepath(value)) : this.attr(name);		
	};
	
}("ND"));

