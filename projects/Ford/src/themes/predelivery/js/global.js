/*
 * Author: Brett Chaney
 * Description: Pre-delivery global JS
 */

(function($){

	$(document).ready(function(){

		// Force checkbox to be checked before form is submitted on the simple and pre-populated welcome pages
		$("#welcomeSubmit").on("click", function(e) {
			e.preventDefault();

			$(this).closest("form.fbform").checkValidity();

			if(!$(this).closest("form.fbform").checkValidity()) {return;}

			var isChecked = $("#isPrivacyChecked").is(":checked");

			if (isChecked) {
				$(this).closest("form.fbform").submit();
			}
		});

		// Checkbox grouping
		$("tr td:not(.select-col1, .select-col2, .select-col3) .checkbox").click(function() {

			var $this 			= $(this),
				checkedState 	= $this.prop("checked");

			$this.parents("tr").find(".checkbox:checked").prop("checked", false);
			$this.parents("tr").find(".checked").removeClass("checked");

			if ($("#page-wrapper").length) {
				$this.parents("table").find(".number.checked").removeClass("checked");
			}

			$this.prop("checked", checkedState);

			if (!$this.parent().hasClass("select-col1")) {
				$this.closest("table").find(".select-col1 .checkbox").prop("checked", false);
			}

			if (!$this.parent().hasClass("select-col2")) {
				$this.closest("table").find(".select-col2 .checkbox").prop("checked", false);
			}

			if (!$this.parent().hasClass("select-col3")) {
				$this.closest("table").find(".select-col3 .checkbox").prop("checked", false);
			}

			$("#page-wrapper input[type=checkbox]").uniform();

		});

		// Select all column checkboxes
		function checkColumn(elem, column) {

			if ($("#page-wrapper").length) {
				elem.hasClass("checked") ? elem.removeClass("checked") : elem.addClass("checked");
			}

			var isChecked = elem.hasClass("number") ? elem.hasClass("checked") : elem.prop("checked");


			elem.closest("table").find(".checkbox").prop("checked", false);
			elem.closest("table").find("tr td:nth-child(" + column + ") input[type=checkbox]").prop("checked", isChecked);

			$("#page-wrapper input[type=checkbox]").uniform();
		}

		$("table .select-col1 .checkbox, .featured-table tbody .select-col1 .number").click(function() {
			if ($("#page-wrapper").length){
				$("table .select-col2 .number, table .select-col3 .number").removeClass("checked");

				checkColumn($(this), 4);
			} else {
				checkColumn($(this), 5);
			}
		});

		$("table .select-col2 .checkbox, .featured-table tbody .select-col2 .number").click(function() {
			if ($("#page-wrapper").length){
				$("table .select-col1 .number, table .select-col3 .number").removeClass("checked");
				checkColumn($(this), 5);
			} else {
				checkColumn($(this), 6);
			}
		});

		$("table .select-col3 .checkbox, .featured-table tbody .select-col3 .number").click(function() {
			if ($("#page-wrapper").length){
				$("table .select-col1 .number, table .select-col2 .number").removeClass("checked");
				checkColumn($(this), 6);
			} else {
				checkColumn($(this), 7);
			}
		});

		// remove event listener of .number check all select box on click
		$('.featured-table').find('tbody').find('.number').off();



		// Steps next button check
		$(".feature-buttons .accordion-next").click(function() {

			$(this).closest(".dropdown").find(".featured-table > tbody > tr:gt(0)").each(function() {

				var isChecked = $(".checkbox", this).is(":checked");

				if (!isChecked) {
					// check all checkboxes in this step
					$(this).find(".col3 .checkbox").prop("checked", true);
					$("#page-wrapper input[type=checkbox]").uniform();
				}
			});
		});

		$("#page-wrapper .accordion-next.btn, #page-wrapper .accordion-prev.btn").click(function() {

			// hide 'save and continue' text
			$(".save-text").hide();

		});

		// Steps h2 tab check
		$(".tab-area h2").click(function() {

			$(".save-text").hide();

			$(this).closest("li").prevAll().find(".featured-table > tbody > tr:gt(0)").each(function() {

				var isChecked = $(".checkbox", this).is(":checked");

				if (!isChecked) {
					// check all checkboxes in previous step
					$(this).find(".col3 .checkbox").prop("checked", true);
					$("#page-wrapper input[type=checkbox]").uniform();
				}
			});
		});


		// Unbind click event for button/link to summary
		$(".summary-btn").unbind("click");


		// Steps page back button to welcome page
		$(".accordion-prev.islink").on("click", function() {
			$("input[type='hidden'][name='back']").val("true");
		});


		// Add "selected" class to radio button parent DIV
		$(".panel-content input[type=radio]").on("click", function() {

			$(this).parents(".panel-content").find(".radio").removeClass("selected");

			$(this).parents(".radio").addClass("selected");
		});

		// loop through radio buttons in personalisation section and add class to already selected ones
		$('.last-step input:radio:checked').each(function() {
			$(this).parents(".radio").addClass("selected");
		});


		// Reveal overlay/modal click events
		$(".open-modal").on("click", function(e) {
			e.preventDefault();

			var infoLink = $(this).attr("href");
			$.ajax({
					url: infoLink,
					success: function(data){
						$("#content-modal .content").html(data);
						$('#content-modal').foundation('reveal', 'open',{
							animationSpeed: 100,
							animation: "fade"
						});
					},
					error: function(){
						$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
						$('#content-modal').foundation('reveal', 'open',{
							animationSpeed: 100,
							animation: "fade"
						});
					},
					complete: function() {
						if ($("#content-modal iframe").length > 0) {
							$("#content-modal iframe").parent().addClass("flex-video");
						}
					}
			});
		});

		$(".open-vid").on("click", function(e) {
			e.preventDefault();

			var vidLink = $(this).attr("href");
			var featureName = $(this).data("featurename");
			var pagename= $(this).data("pagename");
			$.ajax({
				url: vidLink,
				success: function(data){
					//for omniture tracking full screen with dynamic name based on current step
					$("#video-modal .content").attr("data-title","ford owners:predelivery:"+ featureName +":video:full screen");
					$("#video-modal .content").attr("data-pname","ford owners:predelivery:"+ pagename);
					
					$("#video-modal .content").html(data);
					$('#video-modal').foundation('reveal', 'open',{
						animationSpeed: 100,
						animation: "fade"
					});
					
				},
				error: function(){
					$("#content-modal .content").html('<div class="row"><div class="columns"><div class="content-col"><h3>An Error Occurred</h3><p>There seems to be a problem.</p></div></div></div>');
					$('#content-modal').foundation('reveal', 'open',{
						animationSpeed: 100,
						animation: "fade"
					});
				}
			});

			setTimeout(function() {
				$("#video-modal.reveal-modal .content").addClass("no-loader");
			},500);

		});

		$("#content-modal .close-reveal-modal").click(function(e) {
			e.preventDefault();

			$('.reveal-modal').foundation('reveal', 'close');

			setTimeout(function() {
				$("#content-modal .content").html("");
			},500);

			// ensure focus onto document body after overlay is closed - IE has focus issues
			$("body").focus();
		});

		$("#video-modal .close-reveal-modal").click(function(e) {
			e.preventDefault();

			$('.reveal-modal').foundation('reveal', 'close');

			setTimeout(function() {
				$("#video-modal.reveal-modal .content").removeClass("no-loader");
				$("#video-modal .content").html("");
			},1000);

			// ensure focus onto document body after overlay is closed - IE has focus issues
			$("body").focus();
		});


		// Close window function
		$(".close-window").on("click", function(e) {
			e.preventDefault();

			var formConfig = JSON.parse($('#form-config').html());
			window.location.href = formConfig.homepage;
			//var newWindow = window.open("", "_self", "");
			//window.close();
		});


		// Equal height columns
		var equalCols = function() {

			$(".equal-cols").each(function() {

				var $this 		= $(this),
					heighestCol = null;

				// get highest column value
				$this.find(">.columns .equal-col").each(function() {

					$(this).css("height","");

					var currentColH = $(this).outerHeight();

					if (currentColH > heighestCol) {
						heighestCol = currentColH;
					}

				});

				// add height to each column
				$this.find(">.columns .equal-col").each(function() {
					if ($(window).width() > 752) {
						$(this).css("height", heighestCol);
					} else {
						$(this).css("height", "");
					}
				});

			});

		};

		if ($(".equal-cols").length > 0) {

			$(window).on("load", function() {
				equalCols();
			});

		}

		$(window).on("resize", function() {
			equalCols();
			verticalImgs();
		});


		// Vertically aligned images
		var verticalImgs = function() {

			$(".image > img").each(function() {

				var $this 		= $(this),
					imageH 		= $(this).height(),
					parentH 	= $this.parent().height(),
					topPadding 	= (parentH - imageH) / 2;

					if ($(window).width() > 767) {
						$this.css("padding-top", parseInt(topPadding, 10));
					}

			});

		};

		if ($(".image").length > 0) {

			$(window).on("load", function() {
				verticalImgs();
			});

		}


		var dealershipDD = function() {

			var dealership 			= this,
				dealershipSelect 	= $("#Dealership"),
				stateSelect 		= $("#Dealership_State"),
				commonConfig 		= $("#common-config").embeddedData(),
				site 				= commonConfig.site,
				restServices 		= $("#rest-services").embeddedData(),
				predelServices 		= $("#predel-config").embeddedData();

			// setup global ajax settings
			$.ajaxSetup({
				type: "GET",
				cache: true,
				dataType: "json"
			});

			dealership.setHiddenValue = function(dealerEmail, dealerCode) {

				var $hiddenInputEmail = $("#dealer-email"),
					$hiddenInputCode = $("#dealer-code");

				if ($hiddenInputEmail.length > 0) {
					$hiddenInputEmail.val(dealerEmail);
					$hiddenInputCode.val(dealerCode);
				}

			};

			dealership.populateDealership = function(selectedUrl){

				$.ajax({
					url: selectedUrl,
					statusCode: {
						404: function() {
							$('.ajax-loader').remove();
							$("#Dealership_State").closest(".columns").find(".error-box").addClass("forced-error").children("span").html("Error finding Dealers. Please try again.");
						}
					},
					beforeSend: function(){

						// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
						if ($("#page-wrapper").length === 0) {
							dealershipSelect.find("option").remove().end()
											.append("<option>Loading dealers</option>")
											.after('<div class="ajax-loader2"></div>');
						} else {
							dealershipSelect.find("option").slice(1).remove();
							$(".dealers").after('<div class="ajax-loader2"></div>');
						}

					},
					success: function(data){

						$(".ajax-loader2").remove();

						// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
						if ($("#page-wrapper").length === 0) {
							dealershipSelect.find("option").remove().end()
											.append("<option value=''>Please select dealership</option>");
						} else {
							dealershipSelect.find("option").slice(1).remove();
						}

						jQuery.each(data, function(index,value){

							var dealerName 		= value.dealershipName,
								dealerCity 		= value.city,
								dealerNameCity 	= dealerName + " (" + dealerCity + ")",
								dealerCode 		= value.dealerCode,
								dealerEmail 	= value.email;

							dealershipSelect.append('<option data-dcode="' + dealerCode +'" data-email="' + dealerEmail +'">'+ dealerNameCity +'</option>');

						});

						ND.prepopulate("Dealership");

						// reset uniformjs selects
						$("#page-wrapper select").uniform();

					},
					complete: function() {

						// Add first dealership email address of selected state to email hidden input
						dealership.setHiddenValue($("#Dealership option:first-child").data("email"), $("#Dealership :selected").data("dcode"));

					},
					error: function() {
						$(".ajax-loader2").remove();
					}

				});

				dealershipSelect.on("change", function() {
					dealership.setHiddenValue($("#Dealership :selected").data("email"), $("#Dealership :selected").data("dcode"));
				});

			};

			dealership.stateSelectChange = function(){
				var state = stateSelect.val(),
					functionFilter 	= (predelServices["functionfilter"] !== undefined) ? predelServices["functionfilter"] : "",
					encodeFilter 	= encodeURIComponent(functionFilter),
					// LOCAL rest return
					// dealerRegionUrl	= "rest/predelivery/dealers-region-"+ state +".js?functionfilter=" + encodeFilter;
					dealerRegionUrl	= restServices["dealer.byRegionUrl"].replace('{site}', site).replace('{region}', state)+"?functionfilter=" + encodeFilter;
					
					if (stateSelect.val() !== "") {
						// Enable Dealership select
						// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
						if ($("#page-wrapper").length === 0) {
							dealershipSelect.attr("disabled",false).css("opacity","1");
						}
						dealership.populateDealership(dealerRegionUrl);
					} else if ($("#page-wrapper").length === 0) {
						// Disable Dealership select
						dealershipSelect.attr("disabled","disabled").css("opacity",".5").removeClass("user-success").children("option").remove();
					} else {
						dealershipSelect.removeClass("user-success").children("option").slice(1).remove();
						// reset uniformjs selects
						$("#page-wrapper select").uniform();
					}
			};

			dealership.init = function(){

				// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
				if (!$(".pre-populated")[0] && $("#page-wrapper").length === 0) {
					// Disable Dealership select
					dealershipSelect.attr("disabled","disabled").css("opacity",".5");
				}

				var stateSelectChange = _.debounce(function(){
					var state = stateSelect.val(),
						functionFilter 	= (predelServices["functionfilter"] !== undefined) ? predelServices["functionfilter"] : "",
						encodeFilter 	= encodeURIComponent(functionFilter),
						// LOCAL rest return
						// dealerRegionUrl	= "rest/predelivery/dealers-region-"+ state +".js?functionfilter=" + encodeFilter;
						dealerRegionUrl	= restServices["dealer.byRegionUrl"].replace('{site}', site).replace('{region}', state)+"?functionfilter=" + encodeFilter;
						
						if (stateSelect.val() !== "") {
							// Enable Dealership select
							// check for phase 1/2 pre-delivery. Phase 3 only has #page-wrapper DIV
							if ($("#page-wrapper").length === 0) {
								dealershipSelect.attr("disabled",false).css("opacity","1");
							}
							dealership.populateDealership(dealerRegionUrl);
						} else if ($("#page-wrapper").length === 0) {
							// Disable Dealership select
							dealershipSelect.attr("disabled","disabled").css("opacity",".5").removeClass("user-success").children("option").remove();
						} else {
							dealershipSelect.removeClass("user-success").children("option").slice(1).remove();
							// reset uniformjs selects
							$("#page-wrapper select").uniform();
						}
				}, 2000);	

				stateSelect.on("change", stateSelectChange);

				ND.prepopulate("Dealership_State");
			};

		};

		// initialise dealer dropdown
		if ($('#Dealership').length > 0) {
			var dealership = new dealershipDD();
			dealership.init();
		}

		// START - Derivative-specific vehicle image
		var $modelVal, $seriesVal, $colourVal,

			updateImg = function() {

				var restService 	= $("#rest-services").embeddedData(),
					commonConfig 	= $("#common-config").embeddedData(),
					site 			= commonConfig.site,
					priceZone 		= commonConfig.priceZone,
					derivative 		= $("#voi-derivatveid").val(),
					colourTrimsURL	= restService.colorUrl.replace('{site}', site).replace('{priceZone}', priceZone).replace('{derivative}', derivative),
					selIdx 			= $("#Colour")[0].selectedIndex - 1,
					$carImage 		= $("img.welcome-image"),
					defaultImg 		= $carImage.attr("src"),
					$carDiv 		= $("#page-wrapper .vehicle-image");

				$.ajax({
					url: colourTrimsURL,
					type: "GET",
					cache: true,
					dataType: "json",
					statusCode: {
						404: function() {
							$carDiv.show();
							$carImage.attr("src", defaultImg);
						}
					},
					beforeSend: function(){
						$("#Ford_Make").closest(".section").append('<div class="ajax-loader"></div>');
					},
					success: function(data){

						function searchStringInArray (str, strArray) {
							for (var j=0; j<strArray.length; j++) {
								if (strArray[j].match(str)) return j;
							}
							return -1;
						}

						$carDiv.show();

						if (data[selIdx].imageURL !== undefined) {

							var vehicleImg 		= data[selIdx].imageURL,
								imgPath 		= vehicleImg,
								vehicleImgId 	= imgPath,
								vehicleImgArr 	= vehicleImgId.split("&"),
								arrayPos 		= searchStringInArray("blobwhere",vehicleImgArr),
								vehicleIDtoStr 	= vehicleImgArr[arrayPos];
								vehicleImgId 	= vehicleIDtoStr.match(/\d+$/)[0];

							if (vehicleImg !== undefined) {
								$carImage.attr("src", imgPath).error(function(){
									$carImage.attr("src", defaultImg);
								});
							} else {
								$carImage.attr("src", defaultImg);
							}

							// update vehicleImage hidden field with vehicle image ID
							$("input[name=vehicleImage]").val(vehicleImgId);
						} else {
							$carDiv.hide();
							$carImage.attr("src", defaultImg);
						}

						$('.ajax-loader').remove();

					},
					error: function(jqXHR, textStatus, textResponse) {
						$carDiv.hide();
						$('.ajax-loader').remove();
					}
				});

			},

			getSelValues = function() {
				$modelVal 	= $("#Ford_Make").val();
				$seriesVal 	= $("#Ford_Model").val();
				$colourVal 	= $("#Colour").val();
			},

			checkSelValues = function() {

				var defaultImg = $("img.welcome-image").attr("src");

				$("input[name=vehicleImage]").val("");
				getSelValues();

				$("#Ford_Make, #Ford_Model").on("change", function() {

					$(".option-packs ul").empty();
					$(".option-packs").hide();

					$("#page-wrapper .vehicle-image").hide();
					$("img.welcome-image").attr("src", defaultImg);
					$("input[name=vehicleImage]").val("");

					setTimeout(function() {
						$("#page-wrapper select").uniform();
					},100);

				});

				$("#Colour").on("change", function() {

					getSelValues();

					if ($modelVal === "" || $seriesVal === "" || $colourVal === "") {
						$("img.welcome-image").attr("src", defaultImg);
						$("input[name=vehicleImage]").val("");
					} else if ($modelVal !== "" && $seriesVal !== "" && $colourVal !== ""){
						updateImg();
					}
				});

			};

		if ($("#Ford_Make").length > 0) {
			checkSelValues();
		}
		// END - Derivative-specific vehicle image

	});

}(jQuery));