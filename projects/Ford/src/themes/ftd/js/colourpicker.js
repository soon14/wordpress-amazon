(function($){
	
	var ColourPicker = function (banner, bannerCloneId, coloriser, swapper, foregroundCar, backgroundCar) {
		var picker = this;
		picker.banner = banner;
		picker.bannerCloneId = bannerCloneId;
		picker.coloriser = coloriser;
		picker.swapper = swapper;
		picker.foregroundCar = foregroundCar;
		picker.backgroundCar = backgroundCar;
		picker.items = [];
		picker.selectedClassname = "current";
		picker.loaderMarkup = '<div id="pickerLoader"></div>',
		picker.tooltipMarkup = function(colorName) {
			return "<span class='tooltip'><span>" + colorName + "</span></span>";
		};
		
		picker.init = function () {
			picker.defineItems();
			picker.wireEvents();
		};
		
		picker.defineItems = function () {
			picker.items = $("li:not(.label)", picker.coloriser);
			(picker.items).each(function() {
				var colorName = $(this).find("span").html();
				$(this).append(picker.tooltipMarkup(colorName));
			});
		};
		
		picker.updateBanner = function (imagePath) {
			var done = false,
				loader = setTimeout(function(){
					if(!done) {picker.loader("show");}
				},100);
			
			picker.preLoadImage(imagePath, function () {
				done = true;
				picker.loader("hide");
				picker.bannerClone = $(picker.banner).clone().attr("id", picker.bannerCloneId);
				$(picker.banner).after(picker.bannerClone);
				picker.bannerClone.animate({opacity:0}, 400, function() {
					$(this).remove();
				});
				$(picker.banner).css('background-image', 'url(' + imagePath + ')');
			});
		};
		
		picker.updateSelected = function (anchor) {
			$(picker.items).removeClass(picker.selectedClassname);
			$(anchor).parent().addClass(picker.selectedClassname);
		};
		
		picker.preLoadImage = function (imagePath, callback) {
			$("<img src='" + imagePath + "' />").bind("load", function() {
				callback();
			});
			};
		
		picker.loader = function (state) {
			if (state === "show") {
				$(picker.coloriser).before(picker.loaderMarkup);
			}
			else if (state === "hide"){
				$("#pickerLoader").remove();
			}
		};
		
		picker.wireEvents = function () {
			if ( /iPhone|iPad|iPod/.test( navigator.platform ) ) {
				$("li a", picker.coloriser).on("mouseover", function(e) {
					//console.log("Derp");
					var imagePath = $(this).attr("href");
					picker.updateBanner(imagePath);
					picker.updateSelected(this);
					//return e.preventDefault();
				});
			}
			$("li a", picker.coloriser).bind("click", function (e) {
				//console.log("click");
				var imagePath = $(this).attr("href");
				picker.updateBanner(imagePath);
				picker.updateSelected(this);
				return e.preventDefault();
			});
			// swapper clicked
			$("li", picker.swapper).bind("click", function(e) {
				var carType = $(this).attr("class");
				var firstAnchor = $("." + carType + " a", picker.coloriser).first();
				var imagePath = firstAnchor.attr("href");
				
 				$("li:not(:visible)", coloriser).hide();
				$("ul", coloriser).toggle();
				picker.updateSelected(firstAnchor);
				$("ul:visible li", coloriser).fadeIn(300);
				$("li", picker.swapper).slideToggle("fast");
				picker.updateBanner(imagePath);
				e.preventDefault();
			});
			// foreground car clicked - same as clicking on the next color on the coloriser
			picker.foregroundCar.bind("click", function(e) {
				var currentLI = picker.items.filter("." + picker.selectedClassname);
				if (!currentLI.is(":last-child"))
					currentLI.next().find("a").trigger("click");
				else{
					//picker.items.filter(":visible").first().find("a").trigger("click");
					
					currentLI.parent().children(":first").find("a").trigger("click");
				}
					
			});
			// background car clicked - same behaviour as when swapper clicked
			picker.backgroundCar.bind("click", function(e) {
				$("li:visible", picker.swapper).trigger("click");
			});
		};
		
	};
	
	
	// On Load
	$(function(){
		var banner = $("#banner");
		var bannerCloneId = "banner-clone";
		var coloriser = $("#coloriser");
		var swapper = $("#car-swapper");
		var backgroundCar = $("#background-car");
		var foregroundCar = $("#foreground-car");
		
		if ($(banner).size() > 0 && $(coloriser).size() > 0) {
			var colourPicker = new ColourPicker(banner, bannerCloneId, coloriser, swapper, foregroundCar, backgroundCar);
			colourPicker.init();
		}
	});
	
})(jQuery);