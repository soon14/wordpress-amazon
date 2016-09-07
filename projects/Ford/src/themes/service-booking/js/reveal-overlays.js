var SB = SB || {};

(function($) {

	SB.overlay = {

		init: function() {

			// Reveal overlay/modal click events
			$(".service-booking-overlay").not("#content-modal").on("click", function(e) {
				e.preventDefault();
				SB.overlay.scrollToTop();
				
				var modalContent = $(this).attr("href");

				// Attach the keyword and Xtime URL to the SB object associated with this link
				SB.keyword 		= $(this).data("sb-keyword");
				SB.serviceURL 	= $(this).data("sb-url");

				$.ajax({
					url: modalContent,
					success: function(data) {
						SB.overlay.modalSuccess(data);
					},
					error: function() {
						SB.overlay.modalError();
					}
				});
			});

			SB.overlay.modalClose();

		},

		modalSuccess: function(data) {

			$("#content-modal .content").html(data);
			SB.templateWrap = $(".content-col");
			SB.dealers.init();
			$("#content-modal").foundation("reveal", "open", {
				animationSpeed: 100,
				animation: "fade"
			});

		},

		modalError: function() {

			$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
			$("#content-modal").foundation("reveal", "open", {
				animationSpeed: 100,
				animation: "fade"
			});

		},

		modalClose: function() {

			$("#content-modal .close-reveal-modal").on("click", function(e) {
				e.preventDefault();
				$(".reveal-modal").foundation("reveal", "close");

				setTimeout(function() {
					$("#content-modal .content").html("");
				}, 500);

				// ensure focus onto document body after overlay is closed - IE has focus issues
				$("body").focus();
			});

		},

		scrollToTop: function() {
			$("html, body").animate({
				 scrollTop:0
			},400);
		}

	};

	$(function() {
		SB.overlay.init();
	});

})(jQuery);