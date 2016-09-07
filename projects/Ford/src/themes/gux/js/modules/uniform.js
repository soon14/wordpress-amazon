/*
Author: 		Ray Huang
File name: 		uniform.js
Description: 	bind uniform UI to specified element
Dependencies: 	jQuery, jquery.uniform.min.js
Usage: 			
*/

var guxApp = guxApp || {};

(function($){
	var uniform = {
		/**
		 * bind uniform UI for existing dom element goes here.
		 * for those delegated elements, please use "bindTo" function
		 */
		init: function(){
			var self = this;
				//to exclude those non custom uniform elements
				wrapper = ".uniform",
				elementObj = {
					//type 	:  element
					"select" : "select",
					"checkbox" : "input[type=checkbox]",
					"radio-round" : "input[type=radio].round",
					"radio-square" : "input[type=radio].square"
				}
			
			for (var i in elementObj){
				self.bindTo($(wrapper + " " + elementObj[i]),i);
			}
			
			$.subscribe("uniform", function(ev, obj, c, d) {
				self.bindTo(obj.el, obj.el_type);
			});
			
		},
		/**
		 * bind uniform UI to specified element,
		 * @param el, jquery Object, the specified element
		 * @param type, string, the type to define what option should be passed to uniform UI
		 */
		bindTo: function(el, type) {

			var self = this,
				option = {};
			
			switch (type)
			{
				case "select" :
					option.selectAutoWidth = false;
					option.selectClass = "dropdown";
					break;
				case "radio-square" :
					option.radioClass = "radio square";
					break;
				/* custom option example:
				case "checkbox" :
					option.checkboxClass = "checkbox";
					option.checkedClass = "selected";
					break;
				*/
			}
				
			el.uniform(self.isEmptyObject(option)?null:option);
		},
		/*
		* check whether the object is empty
		* @param obj, object need to be checked
		*/
		isEmptyObject: function(obj) {
			for (var n in obj) {
				return false
			}
			return true;
		}	
	}

	$(function(){
		uniform.init();
	});

})(jQuery);