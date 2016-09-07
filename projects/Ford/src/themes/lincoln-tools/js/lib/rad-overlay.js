/*
 * 
 * RAD overlay plugin for Lincoln B&P responsive site
 * Author: York Zhang
 * 
 */

;(function($){

	var defaults = {
		// STYLE CLASS -- Using this additional class to style the overlay which is in a responsive page, the benifit is that we can use pure CSS( in media queres) to style the overlay
		additionalClass: "",

		//OPTIONS
		closeBtnText:"X",

		// CALLBACK
		afterContentLoad: function(){}
	};

	var F = $.radOverlay = function(){
		F.open.apply(this, arguments);
	};

	$.extend(F, {
		open:function(target, options){

			var overlay = {};
			overlay.settings = $.extend({}, defaults, options);

			overlay.content = target.html();

			//console.log(overlay.content);

			var createContainer = function(){
				var additionalClass = (typeof overlay.settings.additionalClass) === "string" ? overlay.settings.additionalClass : "";
				var pms = $("body").append("<div class='rad-overlay-bg'><div class='rad-overlay-wrap " + additionalClass + "'><span class='close-btn'>" + overlay.settings.closeBtnText + "</span></div></div>").promise();
				return pms;
			};

			var closeOverlay = function(){
				var $overlayContainer = $(".rad-overlay-bg");

				$(".rad-overlay-wrap > span.close-btn").click(function(){
					$overlayContainer.fadeOut(300,function(){
						$overlayContainer.remove();
						$("body").removeClass("noscroll");
					});


				});

				$overlayContainer.on('click',function(){
					$overlayContainer.fadeOut(300,function(){
						$overlayContainer.remove();
						$("body").removeClass("noscroll");
					});
				}).children().on('click',function(e){
					e.stopPropagation();
				});
			};

			createContainer().done(function(){
				$("body").addClass("noscroll");
				closeOverlay();
				$("div.rad-overlay-wrap").append(overlay.content);
				overlay.settings.afterContentLoad();
			});
		}
	})

	$.fn.radOverlay = function(options){

		if(this.length == 0) return this;

		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){
				$(this).radOverlay(options);
			});

			return this;
		}

		// create a namespace to be used throughout the plugin
		var overlay = {};

		// set a reference to the element which triggered the overlay
		var el = this;

		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

		var init = function(){
			// merge user-supplied options with the defaults
			overlay.settings = $.extend({}, defaults, options);

			el.on('click',function(e){
				e.preventDefault();

				var $this = $(this);

				var required_url = $this.attr("href");

				var containerPms = createContainer();

				containerPms.done(function(){
					
					$("body").addClass("noscroll");
					closeOverlay();
					var dataPromise = getDataPromise(required_url);
					dataPromise.done(function(data){
						//console.log(data);
						$(".rad-overlay-wrap").append(data);

						overlay.settings.afterContentLoad();
					});
				});

			});

		};

		var getDataPromise = function(url){
			return $.ajax({
				dataType: 'html',
				url: url
			});
		};

		var createContainer = function(){
			var additionalClass = (typeof overlay.settings.additionalClass) === "string" ? overlay.settings.additionalClass : "";
			var pms = $("body").append("<div class='rad-overlay-bg'><div class='rad-overlay-wrap " + additionalClass + "'><span class='close-btn'>" + overlay.settings.closeBtnText + "</span></div></div>").promise();
			return pms;
		};

		var closeOverlay = function(){
			var $overlayContainer = $(".rad-overlay-bg");

			$(".rad-overlay-wrap > span.close-btn").click(function(){
				$overlayContainer.fadeOut(300,function(){
					$overlayContainer.remove();
					$("body").removeClass("noscroll");
				});


			});

			$overlayContainer.on('click',function(){
				$overlayContainer.fadeOut(300,function(){
					$overlayContainer.remove();
					$("body").removeClass("noscroll");
				});
			}).children().on('click',function(e){
				e.stopPropagation();
			});
		};

		init();
		// returns the current jQuery object
		return this;
	}

})(jQuery);

