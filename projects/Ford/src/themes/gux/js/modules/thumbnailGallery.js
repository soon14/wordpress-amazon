/*
Author: 		Brett Chaney
File name: 		thumbnailGallery.js
Description: 	Toggle thumbnail category images on mobile view
Dependencies: 	jQuery 	
*/


(function($){
	var thumbGallery = {

		init: function(){

			thumbGallery.thumbnailsTotal();
			thumbGallery.toggleGallery();

			var windowWidth = $(window).width();

			$(window).on("resize", function() {

				var newWindowWidth = $(window).width();

				if (newWindowWidth !== windowWidth) {
					if ($(window).width() > 767){
						// reset content DIV height
						$("#content").css("height","");

						$(".gallery-category .thumbnails").css({"width": "100%", "max-width": "100%"});
						$('body').css('overflow','visible');
					} else {
						var thumbnailsW 	= $(".gallery-category.open").width();
						$(".gallery-category.open .thumbnails").css({"width": thumbnailsW, "max-width": "none"});
					}
				}

                windowWidth = $(window).width();
				
			});

			if (guxApp.viewport.view === "mobile") {
				thumbGallery.expandBar(9);
			} else {
				thumbGallery.expandBar(6);
			}

		},
		thumbnailsTotal: function(){

			$(".gallery-category").each(function() {

				var imagesTotal = $(this).find(".thumbnails img").length;
				$(this).find(".overlay-text span.num").html(imagesTotal).fadeIn(800).parent().fadeIn(800);

				var thumbnailsHeight = $(this).find(".thumbnails").height();
				$(this).data("thumbsheight", thumbnailsHeight);

			});

		},
		toggleGallery: function(){
			
			$(".category-title").on("click", function(e) {
				e.preventDefault();

				if (guxApp.viewport.view === "tablet") {return;}

				var galleryEl 		= $(this).parents(".gallery-category"),
					thumbnailsEl 	= $(this).parents(".gallery-category").children(".thumbnails"),
					thumbnailsW 	= galleryEl.width();
	
					thumbnailsEl.css({"width":thumbnailsW, "max-width": "none"});
					$('body').css('overflow','hidden');
					galleryEl.addClass("open").siblings().children(".thumbnails").animate({ left: "100%" }, 300, function() {
			            galleryEl.siblings().removeClass("open");
			        });

					thumbnailsEl.animate({ left: -3 }, 400, function() {
						var contentH 	= $("#content").height(),
							leftOverH 	= (galleryEl.data("thumbsheight") + 60) - contentH;

						if (leftOverH > 0) {
							//$("#content").css("height", contentH + leftOverH);
						}
					});
					$(window).trigger('resize');
			});

			$(".mobile-title").on("click", function(e) {
				e.preventDefault();
				
				// reset content DIV height
				$("#content").css("height","");

				var galleryEl 		= $(this).parents(".gallery-category"),
					thumbnailsEl 	= $(this).parents(".gallery-category").children(".thumbnails");
				$('body').css('overflow','visible');
				thumbnailsEl.animate({ left: "100%" }, 300, function() {
		            galleryEl.removeClass("open");
		        });
		        $(window).trigger('resize');
			});

		},
		expandBar: function(numItems){

			$(".gallery-category").each(function() {

				var imagesTotal = $(this).find(".thumbnails img").length;

				$(this).find(".thumbnails .item:gt(" + numItems + ")").hide();
				
				if (imagesTotal > (numItems + 1)) {
					$(this).find(".expandbar").show();
				}

			});


			$(".gallery-category").on("click", ".expandbar", function(){

				var thumbnailsEl = $(this).parent();
				
				thumbnailsEl.find(".item:hidden").slice(0, numItems + 1).fadeIn(350);

				if (thumbnailsEl.find(".item:hidden").length === 0) {
					thumbnailsEl.find(".expandbar").hide();
				}

			});

		}
	
	};

	$(function(){
		if (!$(".gallery-category").length) {return;}
		thumbGallery.init();
	});

})(jQuery);