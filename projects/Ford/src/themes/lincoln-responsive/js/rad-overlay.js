/*
 *
 * RAD overlay plugin for Lincoln B&P responsive site
 * Author: York Zhang
 *
 */

;(function($){

	var _radOverlayOpenedFlag = false;

	var defaults = {
		// STYLE CLASS -- Using this additional class to style the overlay which is in a responsive page, the benifit is that we can use pure CSS( in media queres) to style the overlay
		additionalClass: "",

		//OPTIONS
		closeBtnText:"X",

		greyoutClickable: true,

		// CALLBACK
		afterContentLoad: function(){},

		afterOverlayClosed: function(){}
	};

	var F = $.radOverlay = function(){
		F.open.apply(this, arguments);
	};

	$.extend(F, {
		open:function(target, options){
			//console.log("target", target);

			if(_radOverlayOpenedFlag == true) {return;}

			_radOverlayOpenedFlag = true;

			var overlay = {};
			overlay.settings = $.extend({}, defaults, options);

			overlay.content = target.html();
			//empty the target in case there is ID attribute in it.
			target.empty();

			// console.log(overlay.content);
			var additionalClass = (typeof overlay.settings.additionalClass) === "string" ? overlay.settings.additionalClass : "";
			var $overlayWrap = $("<div class='rad-overlay-bg'><div class='rad-overlay-wrap " + additionalClass + "'><span class='close-btn'>" + overlay.settings.closeBtnText + "</span></div></div>");

			var createContainer = function(){
				var pms = $("body").append($overlayWrap).promise();
				return pms;
			};

			var closeOverlay = function(){
				//var $overlayWrap = $(".rad-overlay-bg");

				$overlayWrap.find("span.close-btn").click(function(){
					$overlayWrap.fadeOut(300,function(){
						$overlayWrap.remove();
						$("body").removeClass("noscroll");
						target.html(overlay.content);

						_radOverlayOpenedFlag = false;

						overlay.settings.afterOverlayClosed();
					});


				});

				if(overlay.settings.greyoutClickable){

					$overlayWrap.on('click',function(){
						$overlayWrap.fadeOut(300,function(){
							$overlayWrap.remove();
							$("body").removeClass("noscroll");
							target.html(overlay.content);

							_radOverlayOpenedFlag = false;
							overlay.settings.afterOverlayClosed();
						});
					}).children().on('click',function(e){
						e.stopPropagation();
					});
				}
			};

			createContainer().done(function(){
				$("body").addClass("noscroll");
				closeOverlay();
				$overlayWrap.find("div.rad-overlay-wrap").append(overlay.content);
				overlay.settings.afterContentLoad();
			});
		}
	});

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
			var additionalClass = (typeof overlay.settings.additionalClass) === "string" ? overlay.settings.additionalClass : "";

			el.on('click',function(e){

				e.preventDefault();

				if(_radOverlayOpenedFlag == true) {return;}

				_radOverlayOpenedFlag = true;



				var $overlayWrap = $("<div class='rad-overlay-bg'><div class='rad-overlay-wrap " + additionalClass + "'><span class='close-btn'>" + overlay.settings.closeBtnText + "</span></div></div>");

				var $this = $(this);

				var required_url = $this.attr("href");

				var containerPms = createContainer($overlayWrap);

				containerPms.done(function(){

					$("body").addClass("noscroll");
					closeOverlay($overlayWrap);
					var dataPromise = getDataPromise(required_url);
					dataPromise.done(function(data){
						//console.log(data);
						$overlayWrap.find("div.rad-overlay-wrap").append(data);

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


		var createContainer = function($overlayWrap){

			var pms = $("body").append($overlayWrap).promise();
			return pms;
		};

		var closeOverlay = function($overlayWrap){
			//var $overlayContainer = $(".rad-overlay-bg");

			$overlayWrap.find("span.close-btn").click(function(){
				$overlayWrap.fadeOut(300,function(){
					$overlayWrap.remove();
					$("body").removeClass("noscroll");
					_radOverlayOpenedFlag = false;
				});


			});

			$overlayWrap.on('click',function(){
				$overlayWrap.fadeOut(300,function(){
					$overlayWrap.remove();
					$("body").removeClass("noscroll");
					_radOverlayOpenedFlag = false;
				});
			}).children().on('click',function(e){
				e.stopPropagation();
			});



		};

		init();
		// returns the current jQuery object
		return this;
	};

})(jQuery);

