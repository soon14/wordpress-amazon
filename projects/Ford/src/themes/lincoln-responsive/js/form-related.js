//Lincoln Form Related
//Author: York Zhang
//JS file: form-related.js

/*globals jQuery, ND, window */
var getParameterByName = function(name, decode) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : (typeof decode !== 'undefined' && decode === false ? results[1].replace(/\+/g, " ") : decodeURIComponent(results[1].replace(/\+/g, " ")));
};

var updateQueryStringParameter = function(uri, key, value) {
  var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i"),
  separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
};


var ND = (function(ND, $) {

	//The create function creates the module object; It does no initialise the object
	ND.lincolnForm = function () {

		var element;
		var w = $(window);


		return {

			init: function( elem ) {

				element = $(elem || "form");

				//if( !element || !element.size() ) { return this; }
				//jQuery.support.cors = true;

				var self = this;

                self.updateUsername();
				self.captchaLoad();
				self.elements();
				self.customValidity();
				self.signIn();
				self.editProPage();
				self.passwordsMatch();
				self.socialLogin();
				self.changeLocation();
				self.groupValidation([
					".phone-group",
                    ".dob-group"
				]);
                self.dropdownCtrl();
				self.updateProfile();


				return this;

			},

            updateUsername: function(){
                var currentUsernameElem = $('.row div#currentUsername');
                var currentUsername = $.cookie('LH-CURRENT-USERNAME');
                if(currentUsernameElem.length > 0){
                    if(!currentUsername){
                        var upConfig = $("#up-config").embeddedData();
                        var loginPage = upConfig["loginPage"];
                        window.location = loginPage;
                    }else{
                        currentUsernameElem.text(currentUsername);
                        $('form input[name="username"]').val(currentUsername);
                        $.cookie('LH-CURRENT-USERNAME', null, {path: '/'});
                    }
                }
            },

            dropdownCtrl: function(){
                var modelSelectEl = $('#voi-model-name');
                var modelSeriesEl = $('#voi-series-name');
                var dropdownListHtml = modelSeriesEl.html();
                modelSelectEl.change(function(){
                    modelSeriesEl.empty().append(dropdownListHtml);
                    var selectedEl = $(this).find('option:first-child').nextAll(':selected');
                    if(selectedEl.length > 0){
                        var selectedValue = selectedEl.text();
                        var seriesOpts = modelSeriesEl.find('option:first-child').nextAll();
                        seriesOpts.each(function(){
                            var targetValue = $(this).text();
                            if (targetValue.indexOf(selectedValue) === -1 && $(this).val() !== 'YZDCD') {
                                $(this).remove();
                            }
                        });
                    }
                });
            },

			captchaLoad:function(){
				var reload_captcha = function() {
					var image = document.getElementById("captchaimage");
					if (image !== undefined) {
						image.src = "/servlet/captcha.png?a=" + (new Date().getTime());
					}
				}

				$("#captchareload").on("click", function(e){
					e.preventDefault();

					reload_captcha();

					return false;
				});

			},
			
			updateProfile:function(){
				var $updateBtn = $("#owner-edit-profile-submit");
				if( !$updateBtn.size() ) { return; }
				$updateBtn.on("click",function(e){
					$("#user-profile-action").attr('value','update-user');
					$(this).closest('form').submit();
				});
			},

			signIn:function(){
				var $loginBtn = $("#user-login-btn");
				if( !$loginBtn.size() ) { return; }

				var loginEnable = true;

				var upConfig = $("#up-config").embeddedData();
				//console.log(upConfig);

				$loginBtn.on("click", function(e){
					e.preventDefault();

					var $thisBtn = $(this),
                        btnOriginalTxt = $thisBtn.val(),
                        btnWaitTxt = !!$thisBtn.attr("data-pleasewait") ? $thisBtn.attr("data-pleasewait") : "Wait...",
                        $thisForm = $thisBtn.closest("form");


					if(loginEnable == false || !$thisForm.checkValidity()) {return;}

					loginEnable = false;

					//console.log($thisForm.checkValidity());

					var requesturl = ((upConfig["eai.server"] && upConfig["eai.server"].length > 0) ? upConfig["eai.server"] : "" ) + upConfig["eai.login.api"],
					// Note REFERER is the name used by LH when redirecting to a different target
					targeturl = getParameterByName("REFERER", false),
                    encodeWelcomeParam = true;

                    if (targeturl == null || targeturl == '') {
                        targeturl = upConfig["url.welcome"] ;
                        encodeWelcomeParam = false;
                    }

                    //REFERRER is already encoded, so we need to check for encoded user action
					if(targeturl.indexOf("user-profile-action") < 0){
                        if (encodeWelcomeParam) {
                            targeturl = targeturl.indexOf("%3F") < 0 ? targeturl + "%3Fuser-profile-action%3Dwelcome" : targeturl + "%26user-profile-action%3Dwelcome";
                        } else {
                            targeturl = targeturl.indexOf("?") < 0 ? targeturl + "?user-profile-action=welcome" : targeturl + "&user-profile-action=welcome";
                        }
					}

					var str = $thisForm.serialize();

					//set the textbox disabled after serializing the form
					$thisBtn.val(btnWaitTxt);
					$thisForm.find("input[type=text], input[type=password]").prop("disabled",true);

					//console.log(str);
					//console.log(targeturl);

					if ($.cookie("PD-S-SESSION-ID")) {
						// remove cookie if exists
						
						// Below line is removed, as it does not remove the cookie as expected.
						// PD-S-SESSION-ID session cookie always uses .ford.com domain, 
						// so calling $.cookie("PD-S-SESSION-ID", null, { path:"/" })
						// without specifying the domain actually creates a NEW cookie with 
						// current domain(for example wwwqa.akamaitest.dragonfly.ford.com)
						
						// https://track.nextdigital.com/browse/RGP-52
						
						// The original code was added during Lincoln China project, to make sure the cookies 
						// are cleared after logout - to help mitigate the problem with cookie clash between 
						// QA and DEV environments - which both are .ford.com yet use different junctions
						
						//$.cookie("PD-S-SESSION-ID", null, { path:"/" });
						
						$.cookie("PD-S-SESSION-ID", null, { domain:".ford.com", path:"/" });
					}

					if ($.cookie("BIGIP")) {
						// remove cookie if exists
						$.cookie("BIGIP", null, { path:"/" });
					}


					$.ajax({
						url:requesturl,
						type:"POST",
						dataType:"text",
						data:str,
						crossDomain:false,
						cache:false,
						timeout:30000,
						xhrFields: {
							withCredentials: true
						}
					})
				    .done(function(data,textStatus,jqXHR){
						//console.log(data,textStatus,jqXHR);
						var loginData = $.parseJSON(data);

						//console.log(loginData);
						//Authenticate success
						if(jqXHR.status == 200){

							_da.user = _da.user || {};
							_da.user.loggedin = "x";

							ND.analyticsTag.trackOmniturePage({
								pname: 'my lincoln:login:complete'
							});

							window.location.href = decodeURIComponent(targeturl);
						}

					})
					.fail(function(xhr, textStatus, errorThrown){

						//console.log(xhr, xhr.status, textStatus, errorThrown);

						var responseData = $.parseJSON(xhr.responseText);

						var errorContainer = "<div class='row errormsg'><p style='color: #f00'></p></div>";


						if($("form div.large-centered > div.columns div.row.errormsg p").size() < 1){
						    if ($("form div.large-centered > div.columns:first-child > fieldset").length)
						        $(errorContainer).insertBefore($("form div.large-centered > div.columns:first-child > fieldset"));
						    else
						        $(errorContainer).insertBefore($("form div.large-centered > div.columns:first-child > .row:first-child"));
						}

						if(textStatus == "timeout"){
							var errorMsg = upConfig["timeout"].length > 0 ? upConfig["timeout"] : "Sorry, timeout! Please try it later.";

							$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);

						}else if(responseData && responseData.errorKeys && responseData.errorKeys[0] === 'UserProfile/Messages/AccountTemporarilyLocked') {
                            var errorMsg = upConfig['loginLocked'];
                            $("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);
                        }else if(responseData && responseData.errorCode == "PASS"){
                        	var errorMsg = upConfig['loginFailed'];
                        	$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);
                        }else if(responseData && responseData.errorCode == "NACT"){
                        	var resendActTmpl = $("#resend-act-tmpl");
                        	var column = $("#resend-activation").closest(".columns");
                        	column.height(column.height() + 112);
                        	$("#resend-activation").replaceWith(resendActTmpl.html());
                        	var $resendActBtn = $("#resend-activation-btn");
                        	$resendActBtn.parent().css({
                        		 "position": "absolute",
                        		 "bottom": "42px",
                        		 "width": column.width()
                        		 });
                        	$resendActBtn.on("click", function(e){
                        		var resendActivationUrl = upConfig['lighthouse.resend.activation'];
                        		var $form=$(document.createElement('form')).css({display:'none'}).attr("method","POST").attr("action",resendActivationUrl);
                        		var $input=$(document.createElement('input')).attr('name','data').val(responseData.data);
                        		var $input2=$(document.createElement('input')).attr('name','isLH').val("true");
                        		$form.append($input);
                        		$form.append($input2);
                        		$("body").append($form);
                        		$form.submit();

//                            	window.location.replace(resendActivationUrl + "?data=" + responseData.data);
            				});
                        }else if(xhr.status == 401){
							//console.log(xhr.status);

							var errorMsg = upConfig["loginFailed"];

                            var lightHouseStatusUrl = JSON.parse($('#rest-services').html())['owner.migration-status'];
                            var userName = $('#username').val();
                            var reqUrl = lightHouseStatusUrl.replace('{username}',userName);
                            $.ajax({
                                url: reqUrl,
                                type: 'GET',
                                async: false
                            }).done(function(data){
                                    var failedMigration = data['failedMigration'];
                                    if(failedMigration == 'true'){
                                        $.cookie('LH-CURRENT-USERNAME', userName, {path: '/'});
                                        var nominateUsernameUrl = upConfig['lighthouse.usernameupdate'];
                                        var $form=$(document.createElement('form')).css({display:'none'}).attr("method","POST").attr("action",nominateUsernameUrl);
                                		var $input=$(document.createElement('input')).attr('name','data').val(responseData.data);
                                		$form.append($input);
                                		$("body").append($form);
                                		$form.submit();
//                                        window.location.replace(nominateUsernameUrl + "?data=" + responseData.data);
                                    }
                                    else{
                                    	$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);
                                    }
                                })
                                .fail(function(){
                                	$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);
                                });
						}else{
							// console.log(textStatus);
							//var errorMsg = errorThrown;
							var errorMsg = upConfig["loginFailed"];
							$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);
						}

						//reset the flag
						loginEnable = true;
						$thisBtn.val(btnOriginalTxt);
						$thisForm.find("input[type=text], input[type=password]").prop("disabled",false);
					});

				});

				/* set referer URL to the register link */

				//var refererURL = encodeURI(decodeURI(getParameterByName("REFERER")));
				var refererURL = getParameterByName("REFERER",false);
//
//				//refererURL = encodeURI(refererURL);
//
//				refererURL = encodeURIComponent(refererURL);

				//console.log(refererURL);


				if(refererURL.length > 0){

					var $navLinks = $(".nav-links"),
                        $regLink = $navLinks.find("a.register-link"),
                        $loginLink = $navLinks.find('a.login-link'),
                        regLinkHref = $regLink.attr("href"),
                        loginLinkHref = typeof $loginLink == 'undefined' ?  $loginLink.attr('href') : null;

                    if (regLinkHref && regLinkHref.indexOf('REFERER') < 0) {
                        $regLink.attr("href", regLinkHref + "?REFERER=" +refererURL);
                    }
                    if (loginLinkHref != null && loginLinkHref.indexOf('REFERER') < 0) {
                        $loginLink.attr('href', loginLinkHref + "?REFERER=" +refererURL);
                    }



				}

			},

			changeLocation:function(){
				if( !$("#provinceCityData").size() ) { return; }

				var provinceCityData = $("#provinceCityData").embeddedData();
				var locationData = provinceCityData.province;
				//console.log(provinceCityData, locationData);

				var currentProvince = provinceCityData.initProvinceCode;
				var currentCity = provinceCityData.initCityCode;

				var $provinceList = $("#province");
				var $citylist = $("#city");
				var citylistDefaultValue = $citylist.html();
				var cityInitOptions = citylistDefaultValue;

				var changeCity = function(activeProvince){

					var cityOptions = cityInitOptions;

					if(activeProvince != ""){

						$.each(locationData, function(index, provinceData){

							//console.log(provinceData);
							if(provinceData.provinceCode == activeProvince){
								var cityData = provinceData.city;
								//console.log(cityData);

								$.each(cityData, function(index, cityData){

									cityOptions = cityOptions + "<option value='" + cityData.cityCode + "'>" + cityData.cityName + "</option>";

								});
							}

						});
					}

					//console.log(cityOptions);
					$citylist.html(cityOptions);
				};

				//initialize the province & cities dropdown
				$provinceList.val(currentProvince);
                if(currentProvince !== ''){
                    changeCity(currentProvince);
                }
				$citylist.val(currentCity);

				//binding onchange event
				$provinceList.on("change",function(){
					var $this = $(this);
					var activeProvince = $this.val();

					changeCity(activeProvince);

				});


			},

			editProPage:function(){
				if($("form.lcn-edit-form").size() === 0 && $("form.lcnforms").find('.service-form').size() > 0){

                    $(".submit-form").on("click",function(){
                        var serviceInfoContainer = $('.lcnforms > .service-form .service-info');
                        var serviceInfoCheckboxes = serviceInfoContainer.find('input[type="checkbox"]');
                        if(serviceInfoCheckboxes.length > 0){
                            var isChecked = false;
                            for(var idx = 0; idx < serviceInfoCheckboxes.length; idx++){
                                if($(serviceInfoCheckboxes[idx]).prop('checked')){
                                    isChecked = true;
                                }
                            }
                            if(!isChecked){
                                serviceInfoContainer.removeClass("ws-success").addClass('ws-invalid');
                            }
                        }
                        var form = $(this).closest("form");
                        if(!form.checkValidity() || !isChecked) {return;}
						ND.analyticsTag.trackOmniturePage({
                            pname: 'service:request appointment:confirm'
                        });
                    });
                }else if( !$("form.lcn-edit-form").size() ){
                    return;
                }else {
                    var self = this;
                    // self.changeLocation();
                    self.showPostSuccessMsg();
                    self.changeMandatory();

                    $("body").append("<div class='scn-cover'><div class='loading-gif'></div></div>");

                    //switch btn
                    $("form.lcnforms a.edit-btn").each(function(index){
                        var $this = $(this);
                        $this.on("click",function(e){
                            e.preventDefault();

                            var $thisBtn = $(this);
                            var $thisForm = $thisBtn.closest("form");
                            $thisBtn.hide();
                            $thisForm.find(".state-readonly").hide();
                            $thisForm.find(".state-edit").show();
                            $("div.success-info").hide();
                            $("div.state-readonly div.error-info").remove();
                        });
                    });

                    $("form.lcnforms INPUT.cancel").on("click",function(){// click on "cancel" btn back to previous page
                        $(this).parents(".state-edit").hide();
                        $(this).parents("form.lcnforms").find(".state-readonly").show();
                        $(this).parents("form.lcnforms").find("A.edit-btn").show();
                        $(this).parents("form.lcnforms").find("div.error-info").remove();
                    })

                    //submit btn
                    $(".submit-form").on("click",function(e){
                        e.preventDefault();

                        var $thisBtn = $(this);
                        var $thisForm = $thisBtn.closest("form");

                        $thisForm.find("div.error-info").remove();

                        // check if selects have a value, if not add ws-invalid class.
                        if ($("#offers_via_direct_mail").is(":checked") && $("#province").val() === "") {
                            $("#province").parent().addClass("ws-invalid");
                        }

                        if ($("#offers_via_direct_mail").is(":checked") && $("#city").val() === "") {
                            $("#city").parent().addClass("ws-invalid");
                        }

                        if ($("#preferredcommunicationtime").hasClass("required-field") && $("#preferredcommunicationtime").val() === "") {
                            $("#preferredcommunicationtime").parent().addClass("ws-invalid");
                        }

                        if(!$thisForm.checkValidity()) {return;}

                        $("div.scn-cover").show();

                        var fieldsData = {};
                        var inputs = $("input, select, textarea", $thisForm);


                        //set the userMarketingProfile field
                        var interest_str = "";


                        // var inputs = $("input[type=hidden]", $thisForm);
                        $.each(inputs, function(index, field){
                            var $this = $(this);
                            var fieldValue = $this.val();

                            if($this.hasClass("no-post") || $this.attr("type") == "submit" || $this.attr("type") == "reset") return;

                            if($this.attr("type") == "radio"){ //radio btn condition - so that it only get the checked one's value, otherwise it will grab the last one's value after looping.

                                if($this.is(":checked")){

                                    fieldsData[$this.attr("name")] = fieldValue;

                                }

                            }else if($this.attr("type") == "checkbox"){

                                if($this.hasClass("interest") && $this.val() != "on"){
                                    if($this.is(":checked")){
                                        if(interest_str == ""){
                                            interest_str = $this.val();
                                        }else{
                                            interest_str = interest_str + "," + $this.val();
                                        }
                                    }
                                }else{

                                    if($this.is(":checked")){
                                        fieldsData[$this.attr("name")] = true;
                                    }else{
                                        fieldsData[$this.attr("name")] = false;
                                    }

                                }


                                if($this.hasClass("channel")){

                                    if($this.is(":checked")){
                                        fieldsData[$this.attr("id")] = "Y";
                                    }else{
                                        fieldsData[$this.attr("id")] = "N";
                                    }

                                }else if($this.is(":checked")){

                                    fieldsData[$this.attr("name")] = fieldValue;

                                }

                            }else{

                                fieldsData[$this.attr("name")] = fieldValue;

                            }

                        });

                        //set userMarketingProfile

                        if($thisForm.find(".interest").size() > 0){

                            fieldsData["interests"] = interest_str;

                        }

                        //console.log(fieldsData);
                        self.sendFormData($thisBtn, $thisForm, fieldsData);

                    });
                }
			},

			changeMandatory:function(){

				var emailField = $("#email");
				var mobileField = $("#min");
				var addressFields = $("#province, #city, #district, #street");
				var preferredTime = $("#preferredcommunicationtime");

				if($("#offers_via_email").is(':checked')){
					//TODO: york : this statement is repeated many times, create a method and reuse to reduce size of JS
					emailField.addClass("init-required required-field").prop("required", true);
				}

				if($("#offers_via_sms").is(':checked')){
					mobileField.addClass("init-required required-field").prop("required", true);

				}

				if($("#offers_via_direct_mail").is(':checked')){
					addressFields.addClass("init-required required-field").prop("required", true);
				}

				if($("#offers_via_mobile").is(':checked')){
					mobileField.addClass("init-required required-field").prop("required", true);
					preferredTime.addClass("init-required required-field").prop("required", true);
					preferredTime.prop("disabled",false);
				}

				$("input[name='preferChannel']").on("change", function(){
					var current_channel = $(this).attr("id");


					$(".required-field").parents(".row").removeClass("ws-invalid");
					$(".required-field").parent(".styled-select").removeClass("ws-invalid");

					if(current_channel == "offers_via_email"){

						if ($("#offers_via_email").is(':checked')) {
							emailField.addClass("init-required required-field").prop("required", true);
						} else {
							emailField.removeClass("required-field user-error").prop("required",false);
						}


					}else if(current_channel == "offers_via_sms"){

						if ($("#offers_via_sms").is(':checked')) {
							mobileField.addClass("init-required required-field").prop("required", true);
						} else if ($("#offers_via_mobile").is(':checked')) {
							mobileField.addClass("init-required required-field").prop("required", true);
						} else {
							mobileField.removeClass("required-field user-error").prop("required",false);
						}

					}else if(current_channel == "offers_via_direct_mail"){

						if ($("#offers_via_direct_mail").is(':checked')) {
							addressFields.addClass("init-required required-field").prop("required", true);
						} else {
							addressFields.removeClass("required-field user-error").prop("required",false);
						}

					}else if(current_channel == "offers_via_mobile"){

						if ($("#offers_via_mobile").is(':checked')) {
							mobileField.addClass("init-required required-field").prop("required", true);
							preferredTime.addClass("required-field").prop("required", true);
						} else if ($("#offers_via_sms").is(':checked')) {
							mobileField.addClass("init-required required-field").prop("required", true);
							preferredTime.removeClass("required-field").prop("required", false);
						} else {
							mobileField.removeClass("required-field").prop("required",false);
							preferredTime.removeClass("required-field user-error").prop("required",false);
						}

					}

				});

				$("#edit-pro-cancel").on("click", function(){
					//TODO York: cache jQuery object
					$(".required-field").parents(".row").removeClass("ws-invalid");
					$(".required-field").parent(".styled-select").removeClass("ws-invalid");
					$(".required-field").removeClass("required-field").prop("required",false);

					$(".init-required").addClass("init-required required-field").prop("required", true);

				});

				preferredTime.on("blur", function() {
					if ($(this).val() === "") {
						$(this).parent().addClass("ws-invalid");
					}
				});

			},

			sendFormData:function(btn,form,json){

				if(form.find(".ws-invalid").length > 0) return;
				//var postData = json;
				var postData = JSON.stringify(json);
				var upConfig = $("#up-config").embeddedData();

				var formIndex = $("form.lcnforms").index(form[0]);

				$.ajax({
					type:"post",
					url: form.attr("action"),
					contentType:"application/json; charset=UTF-8",
					data: postData,
					dataType: "json"
				})
				.done(function(result){
					//console.log(result);
					if(!!result){

						if (result.success ==="true"){
							$.cookie("postsuccess",formIndex);

							if(btn.attr("id") == "edit-pro-submit"){
			                    ND.analyticsTag.trackOmniturePage({
									pname: 'my lincoln:edit profile:complete'
			                    });
							}else if(btn.attr("id") == "submit-psw-submit"){
			                    ND.analyticsTag.trackOmniturePage({
									pname: 'my lincoln:change password'
			                    });
							}

							location.reload(true);
						}else if(result.errors.length > 0){
							$("div.scn-cover").hide();
							var errorMsg = "";
							$.each(result.errors,function(idx,item){
								var label = $("[name="+item.field+"]").prev("label").text();
								if(!label){label = item.field;}
								if(item.translation){
									errorMsg += item.translation +"<br/>";
								}else{
									errorMsg += label +": " +item.translationKey +"<br/>";
								}
							});
							//console.log(errorMsg);

							if(form.children(".error-info").size() > 0){
								form.children(".error-info p").text(errorMsg);
							}else{
								form.find(".state-edit").before("<div class='error-info'><p>" + errorMsg + "</p></div>");
							}
						}
					}else{

						//for IE8...
						var loginURL = upConfig["loginPage"];
						window.location.href = loginURL;
					}
				})
				.fail(function(xhr, textStatus, errorThrown){
					//console.log("fail");
					$("div.scn-cover").hide();
					form.find(".success-info").hide();

					var loginURL = upConfig["loginPage"];
					//console.log(xhr, textStatus, errorThrown);
					//console.log(xhr.status);

					//window.location.href = loginURL;

					if(xhr.status == 200 || xhr.status == 0){

						window.location.href = loginURL;

					}else{

						//var errorMsg = textStatus;
						var errorMsg = upConfig["saveFailed"];

						if(form.children(".error-info").size() > 0){
							form.children(".error-info p").text(errorMsg);
						}else{
							form.find(".state-edit").before("<div class='error-info'><p>" + errorMsg + "</p></div>");
						}
					}


				});


			},

			showPostSuccessMsg:function(){

				if($.cookie("postsuccess") != null){
					var formIndex = $.cookie("postsuccess");

					$("form.lcnforms").eq(formIndex).find("div.success-info").show();

					$.cookie("postsuccess",null);
				}
			},

			passwordsMatch:function(){
				if($(".passwords-match").size() < 1){return;}

				var confirmPassword = $("#confirmpassword");
				var firstPassword = $("#password");

				firstPassword.on("keyup", function(){

					if(firstPassword.val() !== confirmPassword.val() && confirmPassword.val() !== '') {

						confirmPassword.addClass("user-error");
						confirmPassword.parent(".row").removeClass("ws-success").addClass("ws-invalid");
					}else{

						confirmPassword.removeClass("user-error");
						confirmPassword.parent(".row").removeClass("ws-invalid").addClass("ws-success");
					}
				});

				$("#register_submit").on("click", function(e){

					var $thisForm = $(this).closest("form");

					//console.log($thisForm.find(".user-error").size() > 0);

					if($thisForm.find(".user-error").size() > 0){

						e.preventDefault();
					}
				})
			},

			customValidity:function(){
				$.webshims.ready('form-validators', function(){
					// check passwords match
					$.webshims.addCustomValidityRule('passwords-match', function(elem, value){

						if(!value || !$(elem).hasClass('passwords-match')){return;}
						var confirmPassword = $("#confirmpassword");
						var firstPassword = $("#password");

						//console.log("fp", firstPassword.val());
						//console.log("cp", confirmPassword.val());
						if (firstPassword.val() !== confirmPassword.val() && confirmPassword.val() !== ''){
							//console.log("true");
							return true;
						}

						//console.log("false");
						confirmPassword.removeClass("user-error");
						confirmPassword.parent(".row").removeClass("ws-invalid").addClass("ws-success");
						return false;
					});
					//password cannot match username
					$.webshims.addCustomValidityRule('passwords-username-match', function(elem, value){
						if(!value || !$(elem).hasClass('passwords-username-match')){return;}
						var passwords = $(".passwords-username-match");

						if (passwords[0]&&passwords[1]&&passwords[0].value == passwords[1].value){
							return true;
						}
						return false;
					});
				});
			},

			groupValidation : function(wrapper) {
				if(wrapper instanceof Array && wrapper.length>0){
					var numberOfGroups = wrapper.length;
					for(var i=0; i<numberOfGroups; i++){
					    var groupEls = $(wrapper[i] + " INPUT.altOpt, " + wrapper[i] + " SELECT.altOpt"),
							form = groupEls.closest("FORM"),
							wrapperObj = $(wrapper[i]);
						if(groupEls.length>0 && form.length>0){
							//delegate change event on "checkbox-image" as it added by js and excuted later.
							form.on("click", wrapper[i]+" .checkbox-image",function(){
								$(this).siblings("INPUT").trigger("change");
							});
							/**
							 * recursive function, check groupValidation on every:
							 * 1. page loading
							 * 2. event triggered
							 *
							 * @param groupEls, jquery obj, group elements
							 * @param wrapperObj, current group container
							 * @param init, boolean, true means the checkValidity is running first time.
							 */
							var checkValidity = function (groupEls, wrapperObj, init) {
							    var count = 0,
									curForm = groupEls.closest("FORM"),
                                    isEmptyOrBoth = wrapperObj.hasClass('empty-both');

								//first time running to bind click event for submit buttom
								if(init){
									curForm.find("INPUT[type=submit]").on("click",function(){
										if(!wrapperObj.hasClass("showErr")&&wrapperObj.find(".altOpt").prop("required")){
											wrapperObj.addClass("showErr");
										}
									});
								}

								groupEls.each(function(){
									var curEl = $(this);
									if(curEl.prop("type")=="text" || curEl.prop("type")=="tel"){
										if(curEl.val()!=""){
											count++;
										}
										//first time running to bind event on textfield
										if(init){
											curEl.on("blur",function(){
												checkValidity(groupEls,wrapperObj,false);
											});
										}
									}else if(curEl.prop("type")=="checkbox"){
										if(curEl.prop("checked")){
											count++;
										}
										//first time running to bind event on checkbox
										if(init){
											curEl.on("change",function(){
												checkValidity(groupEls,wrapperObj,false);
											});
										}
									} else if (curEl.prop("type") == "select-one") {
									    if (curEl.val() != "") {
									        count++;
									    }
									    //first time running to bind event on textfield
									    if (init) {
									        curEl.on("change", function () {
									            checkValidity(groupEls, wrapperObj, false);
									        });
									    }
									}
								});
							    //console.log(count);
								if (isEmptyOrBoth) {
								    if (count == 0 || count == groupEls.length) {
								        groupEls.prop("required", false);
								        //set valid status , same as replaced validation function
								        groupEls.removeClass("user-error").addClass("user-success");
								        groupEls.parent().removeClass("ws-invalid").addClass("ws-success");
								        groupEls.attr("aria-invalid", "false");
								        if (!init) { wrapperObj.removeClass("showErr"); }
								    }
								    else {
								        groupEls.prop("required", true);
								        if (!init) { wrapperObj.addClass("showErr"); }
								    }
								}
								else {
								    if (count > 0) {
								        groupEls.prop("required", false);
								        //set valid status , same as replaced validation function
								        groupEls.removeClass("user-error").addClass("user-success");
								        groupEls.parent().removeClass("ws-invalid").addClass("ws-success");
								        groupEls.attr("aria-invalid", "false");
								        if (!init) { wrapperObj.removeClass("showErr"); }
								    } else {
								        groupEls.prop("required", true);
								        if (!init) { wrapperObj.addClass("showErr"); }
								    }
								}
							}
							checkValidity(groupEls,wrapperObj,true);
						}
					}
				}
			},
			elements:function(){
				if($("body").hasClass("forms")){ $("form .columns input[type='checkbox']").addClass("css-checkbox") }// dynamically add 'css-checkbox' on checkbox as existed template cannot be changed
				//radio btns
				var isDealerContactRadio = $('.opt-radio').length;

				var radiobtn = $("input[type='radio']").filter(function(){
					var $this = $(this);

					if ($this.hasClass("css-radio") || isDealerContactRadio) {
						if ($this.prop("checked")) {
							$this.addClass("checked");
						}

						return $this;
					}
				});

				// Fix for IE8 label click not triggering radio change
				radiobtn.next('label').click(function(ev) {
					ev.preventDefault();
					$(this).prev('input[type="radio"]').click();
				});

				radiobtn.on("change", function() {
					var $this = $(this);
					if($this.attr("id")=="rad1"||$this.attr("id")=="rad2"){//enable/disable certain field on switch radio btn
						var targetField = $("#car-brand,#car-model,#car-model-year");
						if($this.val()=="yes"){
							targetField.prop("disabled",false);
							targetField.prop("required",true);
							$("#car-brand").parent(".styled-select").removeClass("disabled-style");

						}else{
							targetField.prop("disabled",true);
							targetField.prop("required",false);
							targetField.removeClass("user-error").parent().removeClass("ws-invalid");
							$("#car-brand").parent(".styled-select").addClass("disabled-style");
							targetField.each(function(){
								$(this).val("");
							});
						}
					}

					var radioname = $this.attr("name");
					//console.log(radioname);
					$("input[type='radio'][name="+ radioname +"]").removeClass("checked");
					//console.log($this);
					$this.addClass("checked");
					// var x = $this.attr("class");
					// console.log('class:', x);

				});

			  	// Checkboxes
			  	var checkbox = 	$('input[type="checkbox"]').filter(function(){
			  		var $this = $(this);
					if($this.hasClass("css-checkbox")){
						if($this.prop("checked")){
							$this.addClass("checked");
						}

						return $this;
					}
			  	});

			  	checkbox.on("change",function(){
			  		var $this = $(this);
			  		if($this.attr("id")=="other-interest"){
			  			var targetField = $("INPUT[name=otherInterests]");
			  			if($this.prop("checked")){
							targetField.prop("disabled",false);
							targetField.prop("required",true);
						}else{
							targetField.prop("disabled",true);
							targetField.prop("required",false);
							targetField.removeClass("user-error").parent().removeClass("ws-invalid");
							targetField.each(function(){
								$(this).val("");
							})
						}
			  		}else if($this.attr("name") == "preferChannel"){

						if (!$("input#offers_via_mobile").is(':checked')) {
							//TODO York: cache jQuery object
							$("#preferredcommunicationtime").prop("disabled",true).val("");
							$("#preferredcommunicationtime").parent(".styled-select").addClass("disabled-style");
						} else {
							//TODO York: cache jQuery object
							$("#preferredcommunicationtime").prop("disabled",false);
							$("#preferredcommunicationtime").parent(".styled-select").removeClass("disabled-style");
						}





						/*if($this.attr("id") == "offers_via_mobile" && !$this.hasClass("checked")){
							$("#preferredcommunicationtime").prop("disabled",false);
							$("#preferredcommunicationtime").parent(".styled-select").removeClass("disabled-style");
						}else if (!$("input#offers_via_mobile").hasClass("checked")) {
							$("#preferredcommunicationtime").prop("disabled",true).val("");
							$("#preferredcommunicationtime").parent(".styled-select").addClass("disabled-style");
						}*/

					}

					//console.log($this.prop("checked"));
					if($this.is(":checked")){
						$this.addClass("checked");
					}else{
						$this.removeClass("checked");
					}
				});

				//decode URI ,get params from url and prefill them to related form field
				if($("body").hasClass("forms")){
					var _url = decodeURI(window.location.href);
					var _paramArr = _url.substring(_url.indexOf("?")+1,_url.length).split("&");
					var _paramArrLength = _paramArr.length;
					for (var i=0; i < _paramArrLength; i++) {
						var _elementId = _paramArr[i].substring(0,_paramArr[i].indexOf("="));
						var _elementVal = _paramArr[i].substring(_paramArr[i].indexOf("=")+1,_paramArr[i].length);
						var _element = $("#"+_elementId);
						if(_element.length > 0){
							_element.val(_elementVal);
							_element.trigger("change");
						}
					}
				}

				// Fix IE10 & IE11 validation on submit not working.
				if ($('.kmi-ie-validate').length && $.browser.msie ||
					!!window.navigator.userAgent.match(/Trident\/7\./)) {
					$('#dragonflyform').find('#submit').attr('formnovalidate', 'formnovalidate');
				}

			},


			socialLogin: function () {

				var upConfig = $("#up-config").embeddedData();
				var commonConfig = $("#common-config").embeddedData();

				var $loginBtn = $("#user-login-btn");

				var socialName = '';
				var appID = '';
				var socialLoginAPI = '';
				if (upConfig["lh.weibo.callback"] == 'true') {
				    socialName = 'weibo';
				    appID = upConfig["weiboLhAppId"];
				    socialLoginAPI = upConfig['eai.weibo.login.api'];
				}
				else if (upConfig['lh.qq.callback'] == 'true') {
				    socialName = 'qq';
				    appID = upConfig["qqLhAppId"];
				    socialLoginAPI = upConfig['eai.qq.login.api'];
				}

				//var weiboAuthorisation = upConfig["lh.weibo.callback"];

				//if(weiboAuthorisation != "true") { return; }

				var accessCode = getParameterByName("code");

				//console.log(accessCode);

				if(accessCode != "" && socialName.length>0 && appID.length>0){
					//console.log(accessCode);
					var socialAccesscode = upConfig["social.accesscode"];
					var site = commonConfig["site"];


					var socialAccessUrl = socialAccesscode.replace("{site}",site).replace("{accessCode}",accessCode).replace('{social}',socialName);
					//console.log(socialAccessUrl);

					//page details handle (loading icon, etc)

					$("body").append("<div class='scn-cover'><div class='loading-gif'></div></div>");
					$("div.scn-cover").show();


					$.ajax({
						url:socialAccessUrl,
						type:"GET",
						dataType: "text",
						cache:false
					})
					.done(function(data){
						//console.log(data);

						var accessData = $.parseJSON(data);
						//console.log(accessData);
						var userAuth = accessData.accessToken;

						var requesturl = ((upConfig["eai.server"] && upConfig["eai.server"].length > 0) ? upConfig["eai.server"] : "") + socialLoginAPI;

						var post = {"token": userAuth, "appId": appID};
						var postStr	= JSON.stringify(post);

						var targeturl = upConfig["url.welcome"].replace("?user-profile-action=welcome","?user-profile-action=welcome-social&social="+socialName);

						// Ajax call
						$.ajax({
							url: 			requesturl,
							type: 			"POST",
							contentType: 	"application/json",
							data: 			postStr,
							crossDomain: 	false,
							timeout:30000,
							cache:false,
						   	xhrFields: {
						      	withCredentials: true
						   	}
						})
						.done(function(data,textStatus,jqXHR){
							//console.log(data,textStatus,jqXHR);
							var loginData = data;

							// Authenticate success
							if(jqXHR.status == 200) {
								//console.log(jqXHR.status);
								window.location.href = targeturl;
							}
						})
						.fail(function(xhr, textStatus, errorThrown){
							//console.log(xhr, textStatus, errorThrown);

							var errorContainer = "<div class='row errormsg'><p></p></div>";


							if($("form div.large-centered > div.columns div.row.errormsg p").size() < 1){

								$(errorContainer).insertBefore($("form div.large-centered > div.columns:first-child > .row:first-child"));
							}

							$("div.scn-cover").remove();


							var errorMsg = upConfig["socialLoginFailed"].length > 0 ? upConfig["socialLoginFailed"] : "login failed, please try again later...";

							$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);

						});

					})
					.fail(function(xhr, textStatus, errorThrown){
						//console.log(xhr, textStatus, errorThrown);

						var errorContainer = "<div class='row errormsg'><p></p></div>";


						if($("form div.large-centered > div.columns div.row.errormsg p").size() < 1){

							$(errorContainer).insertBefore($("form div.large-centered > div.columns:first-child > .row:first-child"));
						}

						$("div.scn-cover").remove();

						var errorMsg = upConfig["socialLoginFailed"].length > 0 ? upConfig["socialLoginFailed"] : "login failed, please try again later...";

						$("form div.large-centered > div.columns div.row.errormsg p").text(errorMsg);

					});

				}



			}
		};
	};

	/* Return ND after it's been augmented */
	return ND;

}(window.ND || {}, jQuery));


(function(ND, $){
	$(function(){

		ND.lincolnForm().init();

	});
})(window.ND || {}, jQuery);

/* End File */
