(function($) {

	var formValidation = {

		init : function() {
			// HTML forms shim
			$.webshims.setOptions("extendNative", false);
			$.webshims.setOptions("waitReady", false);
			$.webshims.debug = true;
			if ( typeof SiteConf !== 'undefined' && SiteConf.dev) {
				// local path
				$.webshims.setOptions({
					basePath : "../../../FTD2010/themes/ftd/js/lib/shims/"
				});
			} else {
				// server path

				$.webshims.setOptions({
					basePath : "/themes/ftd/js/lib/shims/"
				});
			}
			$.webshims.polyfill('forms');
			$.webshims.setOptions('forms', {
				iVal : {
					handleBubble : 'hide'
				},
				addValidators : true
			});

			this.customValidity();
			this.elements();
		},

		customValidity : function() {

			$.webshims.ready("form-validators", function() {
				//define rest url for captcha
				var urls = $("#rest-services").embeddedData();
					commonConfig = $("#common-config").embeddedData();
					targetUrl = "";
				if(urls["captcha.validation"]){
					targetUrl = urls["captcha.validation"];
					if(commonConfig["site"]){
						targetUrl = targetUrl.replace("{site}", commonConfig.site);
					}
					if(commonConfig["locale"]){
						targetUrl = targetUrl.replace("{locale}", commonConfig.locale);
					}
				}

				//captcha ajax validation, due to the incorrect response data structure already set, have to use "addCustomValidityRule" to define an cusotm ajax validation
				//for other ajax validations, please use webshim "data-ajaxvalidate" which require response data structure as the same as webshim defined data structure
				$.webshims.addCustomValidityRule("captcha-validation", function(elem, value, data) {
					var element = $(elem), submitBtn = $(elem.form).find("#submit");
					if (!element.hasClass("captcha")) {
						return;
					}
					//instead of setting pattern to html tag, set rules here to avoid webshim combination(html5 validation+ custom validation) validation issue
					//put validation all together as custom
					var reg = /^[0-9]{5}$/;

					//set default value
					//_ajaxvalidation, true to allow sending ajax validation
					if ( typeof data._ajaxvalidation !== "boolean") {
						data._ajaxvalidation = true;
					}
					//_validRs, result of validation. in webshim, false represent valid, true represent invalid
					if ( typeof data._validRs !== "boolean") {
						data._validRs = false;
					}
					//_lastValue, use to compare current value and last value, sending ajax validation again only when new value entered
					if ( typeof data._lastValue !== "string") {
						data._lastValue = "";
					}
					//store value of submit button
					if (submitBtn.length > 0 && submitBtn.attr("data-pleasewait")) {
						var submitBtnVal = submitBtn.val(), waitingText = submitBtn.attr("data-pleasewait");
					}

					//ajax validtion will only be sent after pass regular validation
					if (reg.test(value)) {
						if (data._ajaxvalidation && data._lastValue != value) {
							//pass json string to server
							var posData = JSON.stringify({
								captcha : value
							});
							//set ajax loading status
							element.addClass("pending").prop("disabled", true);
							//set submit button disabled, prevent submit action happened while waiting the result of ajax validation
							if (submitBtnVal) {
								submitBtn.val(waitingText);
								submitBtn.prop("disabled", true);
							}
							$.ajax({
								type : "POST",
								url : targetUrl,
								//local test url
								//url: "/lincoln2014carve/RAD2013/rest/forms/validate-captcha.js",
								contentType : "application/json; charset=UTF-8",
								data : posData,
								dataType : "json",
								success : function(response) {
									//remove ajax loading status after response returned
									element.removeClass("pending").prop("disabled", false);

									if (submitBtnVal) {
										submitBtn.val(submitBtnVal);
										submitBtn.prop("disabled", false);
									}
									//will run validation again after ajax validation, turn off the ajaxvalidation to prevent sending duplicated ajax call
									data._ajaxvalidation = false;
									if (response.valid == "false") {
										//if "false" recieved, set the validation result to true, represent invalid value
										data._validRs = true;
										//due to change of the value, sometimes webshim will not change the status, refresh it to have the correct ui status
										element.trigger("refreshvalidityui");
										//invalid flag "_validRs" already saved, so trigger validation again to tell webshim the value is invalid
										element.trigger("refreshCustomValidityRules");
									} else if (response.valid == "true") {
										//change the ui status manually
										element.removeClass("user-error").addClass("user-success");
										//pass the ajax validation will do nothing, but tell webshim the value is valid
										data._validRs = false;
										data._ajaxvalidation = true;
									} else {
										data._validRs = false;
									}
								},
								error : function() {
									//remove ajax loading status after response returned
									element.removeClass("pending").prop("disabled", false);

									if (submitBtnVal) {
										submitBtn.val(submitBtnVal);
										submitBtn.prop("disabled", false);
									}
									data._validRs = true;
									element.trigger("refreshvalidityui");
								}
							});
						} else {
							//as _ajaxvalidation already been set false, trigger("refreshCustomValidityRules") will not do ajax validation for current value
							//but turn _ajaxvalidation on to allow new value ajax validation
							data._ajaxvalidation = true;
						}
					} else {
						//save current value as last value
						data._lastValue = value;
						return true;
					}
					//save current value as last value
					data._lastValue = value;
					return data._validRs;
				});
				//on "reload" captcha button click, reset captcha input field as empty
				$("#captchareload").on("click", function() {
					$(this).siblings(".captcha").val("").trigger("refreshvalidityui");
				});

			});
		},

		elements : function() {
			//page load to refresh the captcha image. fixed image load cache issue
			var image = document.getElementById("captchaimage");
			if (image) {
				image.src = "/servlet/captcha.png?a=" + (new Date().getTime());
			}
		}
	};
	// formValidationInstance = null;

	$(function() {

		formValidation.init();
	});

})(jQuery);
