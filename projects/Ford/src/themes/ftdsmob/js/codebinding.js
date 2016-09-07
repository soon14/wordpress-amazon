/* Code Binding */
(function($) {
	$(document).on("pageinit", function() {
		//go previous history
		$(".back").historyBack();

		//switch images
		$(".colors li a").switchImage();

		$(".article").fullArticle();

		//update addthis button
		var $share = $(".share .btns a");
		if($share.size()) {
			ND.share.init($share);
		}
		///bqu smart version select
		$(".vsersion_content_gray_bg").click(function() {

			var $this = $(this);
			$(".vsersion_content_blue_bg").removeClass("vsersion_content_blue_bg");

			$this.toggleClass("vsersion_content_blue_bg");
		})
		///end bqu

		///bqu user guide
		$(".bq_spsc_next").click(function() {

			var $this = $(this);

			var sindex = Number($this.parent().parent().attr("id").substring(1));

			var next_dvi = sindex + 1;
			var nextdvN = "div#p" + next_dvi;
			if($(nextdvN).attr("id") != undefined) {
				$("[data-role='split_screen']").hide();
				$(nextdvN).fadeIn();
			}

		})

		$(".bq_spsc_pre").click(function() {

			var $this = $(this);

			var sindex = Number($this.parent().parent().attr("id").substring(1));

			var next_dvi = sindex - 1;
			var nextdvN = "div#p" + next_dvi;
			if($(nextdvN).attr("id") != undefined) {
				$("[data-role='split_screen']").hide();
				$(nextdvN).fadeIn();
			}

		})

		$("[data-role='split_screen']").hide();
		$("div[data-role='split_screen']:first").show();
		checkUGHasImg();


		// dropdown
		// $('.dropdown>A').click(function(){
		// 	$(this).parent().toggleClass('active');
		// });

		// $('.slider').touchSlider({
		// 	mouseTouch:true,
		// 	autoplay:true
		// });
		
		$(document).on("pagechange", function() {
			//Bind linkState
			$("div[data-role='header'] .ui-controlgroup a").linkState();

			$(".hint").hintText();
			

			var $cities = $('#cityDropdownData'), 
				cityList;
			//console.log('cities pagechange ' + $cities.length);
			if($cities.length > 0) {
				cityList = JSON.parse($cities.html());
				ND.selectOption.init(cityList);
			}

			var syncTable = new SyncTable($(".tabcde"));
			syncTable.sync();
		});
	});

	function checkUGHasImg() {

		// user guide btns
		
		//imges nav div
		
		
		var $thisall = $("[data-role='split_screen'] .imgnav");
		var $thishave = $("[data-role='split_screen'] .imgnav:has(img)");
		
		

		$thisall.addClass("noimagebtns");
		$thishave.removeClass("noimagebtns");
		
		///pre btns

		var $thisallpre = $("[data-role='split_screen'] .imgnav .bq_spsc_pre");
		var $thishavepre = $("[data-role='split_screen'] .imgnav:has(img) .bq_spsc_pre");

		$thisallpre.removeClass("prev");
		$thisallpre.addClass("noimagebtns_prev");
		
		$thishavepre.removeClass("noimagebtns_prev");
		$thishavepre.addClass("prev");
		
		///next btn
		
		var $thisallnext = $("[data-role='split_screen'] .imgnav .bq_spsc_next");
		var $thishavenext = $("[data-role='split_screen'] .imgnav:has(img) .bq_spsc_next");

		$thisallnext.removeClass("next");
		$thisallnext.addClass("noimagebtns_next");
		
		$thishavenext.removeClass("noimagebtns_next");
		$thishavenext.addClass("next");

	}

})(jQuery);
