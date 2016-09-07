(function($){
	var AccessData = function (accessContainer, dropdown) {
		var accessData = this;
		accessData.container = accessContainer;
		accessData.dropdown = dropdown;
		accessData.modelAccessoryClass = "model-accessory-container";
		accessData.modelHeadingClass = "model-heading";
		accessData.cookie = {
			name: "accessData"
		};
		
		accessData.init = function () {
			var selection = accessData.findSelected();
			accessData.showSelectedOption(selection)
		//	accessData.loadSelectedContainer(selection);
			accessData.showSelectedContainer(selection);
			accessData.removeHeadings();
			accessData.wireEvents();
		};
		
		accessData.findSelected = function () {
			var selection;
			if ($.cookie(accessData.cookie.name) !== null) {
				selection = $.cookie(accessData.cookie.name);
			}
			else {
				selection = $("option:selected", accessData.dropdown).attr("value");
			}
			
			return selection;
		};
		
		accessData.removeHeadings = function () {
			$("." + accessData.modelAccessoryClass + " DIV." + accessData.modelHeadingClass, accessData.container).remove();
		};
		
		accessData.showSelectedOption = function (selection) {
			if ($.cookie(accessData.cookie.name) !== null) {
				$("option", accessData.dropdown).each(function () {
					if ($(this).attr("value") === selection) {
						$(this).attr("selected", "selected");
					}
				});
			}
		};
		
		accessData.showSelectedContainer = function (selection) {
			$("#" + selection).find("IMG").lazyLoadImages();
			
			$("." + accessData.modelAccessoryClass, accessData.container).hide();
			$("#" + selection).show();
		};
		
		accessData.updateCookie = function (selection) {
			//session cookie
			$.cookie(accessData.cookie.name, selection, {path:'/', expires:-1});
		};
		
		accessData.wireEvents = function () {
			$(accessData.dropdown).bind("change", function () {
				var selection = $("option:selected", this).attr("value");
				accessData.updateCookie(selection);
				accessData.showSelectedContainer(selection);
			});
		};
	};
	
	$(function(){
		var accessContainer = $(".accessories-container");
		var dropdown = $("#modelName");

		if($(accessContainer).children("DIV").size() > 0 && $(dropdown).size() > 0) {
			var accessData = new AccessData(accessContainer, dropdown);
			accessData.init();
			accessData.dropdown.trigger("change");
		}
	});
	
})(jQuery);