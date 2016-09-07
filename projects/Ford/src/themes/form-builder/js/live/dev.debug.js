
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


/* formbuilder-dealer-postcode.js */
/**
 * @author Sohrab Zabetian
 * @project formbuilder
 * @description
 * If #dealer-by-postcode-postcode exists, attach to on blur.
		The on blur handler should populate the  #dealer-by-postcode-dealer select based on the REST call (see Dealers (location)). The postcode is passed as a location param.
		The REST service result handling should be:
			Case										Displayed																Value
		No results returned 			?no dealer for postcode? message displayed (from DFYTranslation)			Empty string  to prevent submission (when field is required)
		Single dealer returned			Single option preselected displayed.
		Multiple results returned		?please select a dealer? message displayed (from DFYTranslation)		Empty string  for ?please select a dealer? to prevent submission (when field is required).
																											dealerInfo returned in the REST response for each dealer

 */
(function($){
	var widget = {
		//default translations
		translations: {
		  selectDealer: 'Please select a dealer',
		  selectCity: 'Please select a city',
		  selectState: 'Please select a state',
		  selectStateOrCity: 'Please select a city or state',
		  pleaseWait: 'Please wait for dealers to load',
		  noDealersFound: 'No dealers found'
		},

		restServices : {

		},

		$dealerSelect : null,
		$stateSelect : null,
		$citySelect : null,
        $formSalesStateSelect : null,
        $formSalesCitySelect : null,
        $formSalesDealerSelect : null,

		stateCityMap : {},

		types : {
			address : 'ad',
			city : 'ct',
			region : 'rgn',
			regionCity : 'rgnCt'
		},

		constructDealerUrl : function(type, data) {
			switch (type) {
				case widget.types.city:
					return widget.restServices['dealer.byCityUrl'].replace('{city}', encodeURIComponent(data.city));

				case widget.types.region:
					return widget.restServices['dealer.byRegionUrl'].replace('{region}', encodeURIComponent(data.region));
                    //return '../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-region.js';

				case widget.types.regionCity:
					return widget.restServices['dealer.byRegionCityUrl'].replace('{region}', encodeURIComponent(data.region)).replace('{city}', encodeURIComponent(data.city));
                    //return '../../../../latest-offers-2014-client/carve/RAD2013/rest/dealer-city.js';

				case widget.types.address:
					return widget.restServices['dealer.byAddressUrl'].replace('{location}', encodeURIComponent(data.address));
			}
			return null;
		},

		createOption: function(text, value) {
			return '<option value="' + (value || '') + '">' + text + '</option>';
		},

		populateStateDropDown : function(stateSelect, citySelect, hasFirstOption) {
			var cityStateData = $('#cityDropdownData');
			if (cityStateData.length > 0) {
				cityStateData = JSON.parse(cityStateData.html());
				var i,
					j,
					state,
					cityLength = 0,
					statesLength = 0;

				for(i = 0 ; i < cityStateData.list.length; i++){
	                states = cityStateData.list[i].states;
	                statesLength = states.length;
	                cityLength = states.length;
	                for(j=0; j < cityLength; j++){
	                    if (states[j][1] != null) {
                            widget.stateCityMap[states[j][0]] = states[j][1];
                        }
	                }
	            }

                var firstOptionMsg = hasFirstOption?widget.translations.selectState: undefined;
				widget.populateDropDown(statesLength, stateSelect, firstOptionMsg, function(options) {

					for (state in widget.stateCityMap) {
						var stateText = widget.stateCityMap[state].name,
							city = widget.stateCityMap[state].cities[0][0];
						//only "ford Korean" and state name not equal city name
						if($("body").hasClass("koreanstate")&&stateText!=city){
							stateText = stateText + " - " + city;
						}
                        var stateCode = (window.ND.FORMBUILDER && window.ND.FORMBUILDER.LOCATIONMAP[state])?window.ND.FORMBUILDER.LOCATIONMAP[state].code : undefined;
                        if(stateCode){
                            options.push(widget.createOption(stateText, stateCode));
                        }else{
                            options.push(widget.createOption(stateText, (!!widget.stateCityMap[state].code)? (widget.stateCityMap[state].code.length>0?widget.stateCityMap[state].code:widget.stateCityMap[state].name):widget.stateCityMap[state].name));
                        }
					}
				});
				//we want the city field to hint to the user that state need to be selected first.
				widget.populateDropDown(2, citySelect, firstOptionMsg);

			}
		},

		populateDropDown: function(dataLength, $select, firstOptionMsg,  dataIteratorCallback) {

			var i, options = [], isRequired = $select.is("[required]");

            var firstOptionValue = firstOptionMsg? firstOptionMsg : $select.find(':first').html();
	        options.push(widget.createOption(firstOptionValue));

			if (typeof dataIteratorCallback !== 'undefined') {
				dataIteratorCallback(options);
			}

			$select.html(options.join(''));

			if (dataLength === 1 && isRequired) {
				$select.val($select.val());
			}

			if (ND.FormBuilder && ND.FormBuilder.styleSelectOptions) {
				ND.FormBuilder.styleSelectOptions($select);
			}
		},

		handleAjaxResponse : function(jqXHR, isDropDown) {
			if (typeof jqXHR !== 'undefined'  && jqXHR != null && jqXHR.length > 0) {

				widget.clearAjaxError();

				if(isDropDown){
                    widget.populateDropDown(jqXHR.length, widget.$dealerSelect, widget.translations.selectDealer, function(options) {

                        for (i = 0; i < jqXHR.length; i++) {
                        	if($("body").hasClass("dealerNameOnly")){
								 var specialities = jqXHR[i].specialities;
								// var withService = "Service";
								// specialities = jQuery.grep(specialities, function (dealrLst) {
								// 	return dealrLst != withService;
								// });
								
								
								 // $.each(specialities, function (value) {
								 //    console.log(value);
								 //    if (specialities.indexOf("Service") !== -1) {
									//     if (value.length > 1){
									//  		options.push(widget.createOption(jqXHR[i].dealershipName, jqXHR[i].dealerInfo));	
									//  	 }
								 // 	}
								 // });
								
								 if (specialities.indexOf("Sales") !== -1) {
								 //	if (Object.keys(specialities).length > 1){ 
										options.push(widget.createOption(jqXHR[i].dealershipName, jqXHR[i].dealerInfo));	
								 //}
								 }								 
                        	}else{
                            	options.push(widget.createOption(jqXHR[i].dealershipName + '(' + jqXHR[i].addressLine1 + ')', jqXHR[i].dealerInfo));
                        	}
                        }
                    });
                }else{
                    var locationStr = '';
                    if(widget.$formSalesStateSelect.get(0).selectedIndex !== 0){
                        locationStr = widget.$formSalesStateSelect.find(':selected').text();
                    }
                    if(widget.$formSalesCitySelect.get(0).selectedIndex !== 0){
                        var cityStr = widget.$formSalesCitySelect.find(':selected').text() + ' - ';
                        locationStr = cityStr + locationStr;
                    }

                    widget.$formSalesDealerSelect.find('.dealer-container').empty();

                    for(var idx = 0; idx < jqXHR.length; idx++){
                        var html = '<div style="margin-bottom: 1em;"><input name="distrib-radio" type="radio" value="'+jqXHR[idx].dealerInfo+'">' +
                            '<div class="dealer-item">' +
                            '<p style="font-weight: bold; margin-bottom:0;">'+jqXHR[idx].dealershipName+'</p>' +
                            '<p style="margin-bottom: 0;">' +
                            '<span class="dealer-place-font">'+locationStr+'</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>';
                        widget.$formSalesDealerSelect.find('.dealer-container').append(html);
                    }
                    widget.attachFormSalesDealerListener();
                }

			} else {
				widget.handleAjaxError();

			}
		},

		clearAjaxError : function() {
			widget.$dealerSelect.removeClass('user-error');

			var $errorSibling = widget.$dealerSelect.next('span.error-box');
			if ($errorSibling.length > 0) {
				$errorSibling.remove();
			}
		},

		handleAjaxError : function() {

			widget.$dealerSelect.removeClass('user-success').addClass('user-error');
			//display error message
			if (widget.$dealerSelect.next('span.error-box').length === 0) {
				$('<span class="error-box"><span>' + widget.translations.noDealersFound + '</span></span>').insertAfter(widget.$dealerSelect);
			}
			widget.populateDropDown(2, widget.$dealerSelect, widget.translations.noDealersFound);

		},

		attachPostcodeListener : function($dealerByPostcode) {
			$dealerByPostcode.on('blur', function(e) {
				var val = $dealerByPostcode.val();
				if (val != null && $.trim(val).length > 0) {
					widget.fetchData(widget.types.address,{address : $.trim(val) }, true, widget.handleAjaxResponse);
				}
			});
			//first time page loads check to see if the value has already been set or not
			//if set, load values in dealer postcode
			$dealerByPostcode.trigger('blur');
		},

		attachStateCityListeners : function(stateSelect, citySelect, isDropDown) {

			stateSelect.on('change', function(e) {
                widget.$formSalesDealerSelect.parent().css('display', 'none');
                var dealerHiddenInput = widget.$formSalesDealerSelect.next();
                dealerHiddenInput.val('');

                var stateCode = stateSelect.val(),
				state = stateSelect.find('[value="'+stateCode+'"]').text(),
					i,
					cities = widget.stateCityMap[state]?widget.stateCityMap[state].cities || []:[],
					citiesLength = cities.length;
                var firstOptionMsg = isDropDown? widget.translations.selectCity: undefined;
				widget.populateDropDown(citiesLength, citySelect,firstOptionMsg, function(options) {

					for (i = 0;  i < citiesLength; i++) {
                        var cityName = cities[i][1].name;
                        var cityCode = (window.ND.FORMBUILDER && window.ND.FORMBUILDER.LOCATIONMAP[state])?window.ND.FORMBUILDER.LOCATIONMAP[state].cities[cityName] : undefined;
                        if(cityCode){
                            options.push(widget.createOption(cities[i][1].name, cityCode));
                        }else{
                            options.push(widget.createOption(cities[i][1].name, cityName));
                        }
					}
				});
                if(stateSelect.get(0).selectedIndex === 0){
                    citySelect.html(citySelect.find(':first'));
                }

				var city = citySelect.val();
				//debugger
				widget.retrieveDealersForCityState(state, city, isDropDown);

			});

            citySelect.on('change', function(e) {
                var dealerHiddenInput = widget.$formSalesDealerSelect.next();
                dealerHiddenInput.val('');
                if(citySelect.get(0).selectedIndex !== 0){
                    widget.$formSalesDealerSelect.parent().css('display', 'block');
                }else{
                    widget.$formSalesDealerSelect.parent().css('display', 'none');
                }
                var stateCode = stateSelect.val(),
                    cityCode = citySelect.val(),
                    state = stateSelect.find('[value="'+stateCode+'"]').text(),
                    city = citySelect.find('[value="'+cityCode+'"]').text();

				widget.retrieveDealersForCityState(state, city, isDropDown);

			});

		},

		attachDealerListener : function() {
			var $dealerInfoHiddenInput = $('#dealer-by-postcode-dealerinfo');
			if ($dealerInfoHiddenInput.length > 0) {
				widget.$dealerSelect.on('change', function(e) {
					$dealerInfoHiddenInput.val(widget.$dealerSelect.val());
				});
			}
		},

        attachFormSalesDealerListener : function(){
            var $formSalesDealerHiddenInput = widget.$formSalesDealerSelect.next();
            var $formSalesRadioGrp = widget.$formSalesDealerSelect.find('.dealer-container input[type="radio"]');
            $formSalesRadioGrp.click(function(){
                $formSalesDealerHiddenInput.val($(this).val());
            });
        },
		//ie8 doesn't have a trim function, use jQuery's instead
		retrieveDealersForCityState : function(state, city, isDropDown) {
			var hasState = state != null && $.trim(state).length > 0,
				hasCity = city != null && $.trim(city).length > 0;

			if (hasState && hasCity) {
				widget.fetchData(widget.types.regionCity,{region : $.trim(state), city : $.trim(city) }, isDropDown, widget.handleAjaxResponse);
			} else if (hasState) {
				widget.fetchData(widget.types.region, {region : $.trim(state)}, isDropDown, widget.handleAjaxResponse);
			} else if (hasCity) {
				widget.fetchData(widget.types.city,{city : $.trim(city) }, isDropDown, widget.handleAjaxResponse);
			} else if(isDropDown) {
				widget.populateDropDown(2, widget.$dealerSelect, widget.translations.selectStateOrCity);
			}
		},

		fetchData : function(type, data, isDropDown, callback) {
			var url = widget.constructDealerUrl(type, data);
			if (url != null) {
				widget.addLoader();
				$.ajax({
					url: url,
					dataType: 'json',
					success: function(jqXHR, textStatus, textResponse) {
						widget.removeLoader();
						callback(jqXHR, isDropDown);
					},
					error : function(jqXHR, textStatus, textResponse) {
						widget.removeLoader();
						widget.handleAjaxError();
					}
				});
			}
		},

		addLoader: function() {
			widget.$dealerSelect.attr('readonly', true)
								.html(widget.createOption(widget.translations.pleaseWait));
		},

		removeLoader: function() {
			widget.$dealerSelect.removeAttr('readonly').empty();
		},

//        addFormSalesValidation: function(){
//            var formSalesValidationElem = $('#formsales-validation-json');
//            if(formSalesValidationElem.length > 0){
//                var formSalesValidationConf = JSON.parse(formSalesValidationElem.html());
//                for(fieldName in formSalesValidationConf){
//                    var fieldConf = formSalesValidationConf[fieldName];
//                    var regexStr = fieldConf['CustomRegex'];
//                    var msg = fieldConf['CustomMsg'];
//                    var fieldElem = $('div.group input[name="'+fieldName+'"]');
//                    fieldElem.data('pattern',regexStr);
//                    fieldElem.data('errormsg', msg);
//                    fieldElem.on('blur', function(){
//                        var fieldValue = $(this).val();
//                        var fieldPattern = $(this).data('pattern');
//                        var fieldErrorMsg = $(this).data('pattern');
//                        var patternObj = new RegExp(fieldPattern);
//                        if(!patternObj.test(fieldValue)){
//                            alert(fieldErrorMsg);
//                        }
//                    });
//                }
//            }
//        },

		init : function() {
		    var $dealerByPostcode = $('#dealer-by-postcode-postcode'),
				$dealerTranslations = $('#dealer-translations'),
				$restServicesConfig = $('#rest-services'),
				$commonConfig = $('#common-config'),
                $dealerLabel = $('#dealer-label-json'),
                dealerLabelValue = {};

				widget.$dealerSelect = $('#dealer-by-postcode-dealer');
				widget.$stateSelect = $('#dealer-by-statecity-state');
				widget.$citySelect = $('#dealer-by-statecity-city');

                widget.$formSalesStateSelect = $('#FormSales_State');
                widget.$formSalesCitySelect = $('#FormSales_City');
			    widget.$formSalesDealerSelect = $('#FormSales_Dealer');

			    if ($dealerLabel.length) {
			        dealerLabelValue = JSON.parse($dealerLabel.html());

			        widget.$formSalesDealerSelect.append('<div class="ax-paragraph"><p style="font-weight: bold;margin-left:.5em;width:auto;">' + dealerLabelValue.dealerTitle + '</p></div><div class="dealer-container"></div>');

			    }
			    else {
			        widget.$formSalesDealerSelect.append('<div class="ax-paragraph"><p style="font-weight: bold;margin-left:.5em;width:auto;">Select a distributor</p></div><div class="dealer-container"></div>');
			    }

            //widget.addFormSalesValidation()
            widget.$formSalesDealerSelect.parent().css('display', 'none');

			if ($restServicesConfig.length > 0) {
				widget.restServices = JSON.parse($restServicesConfig.html());
				var commonConfig = JSON.parse($commonConfig.html());
				for (key in widget.restServices) {
					widget.restServices[key] = widget.restServices[key].replace('{site}',commonConfig.site);
				}

				if ($dealerTranslations.length > 0) {
					$.extend(widget.translations, JSON.parse($dealerTranslations.html()));
				}
				if (widget.$dealerSelect.length > 0) {

					widget.attachDealerListener();

					if ($dealerByPostcode.length > 0) {
						widget.attachPostcodeListener($dealerByPostcode);

					}

					if (widget.$stateSelect.length > 0 && widget.$citySelect.length > 0) {
						widget.populateStateDropDown(widget.$stateSelect, widget.$citySelect, true);
						widget.attachStateCityListeners(widget.$stateSelect, widget.$citySelect, true);

						widget.$stateSelect.trigger('change');
					}
                    if (widget.$formSalesStateSelect.length > 0 && widget.$formSalesCitySelect.length > 0) {
                        widget.populateStateDropDown(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);
                        widget.attachStateCityListeners(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);
                    }
				}else{
					//add only city and state logic
					if (widget.$stateSelect.length > 0 && widget.$citySelect.length > 0) {
                        widget.populateStateDropDown(widget.$stateSelect, widget.$citySelect, true);
                        widget.attachStateCityListeners(widget.$stateSelect, widget.$citySelect, true);

						widget.$stateSelect.trigger('change');
					}
                    if (widget.$formSalesStateSelect.length > 0 && widget.$formSalesCitySelect.length > 0) {
                        widget.populateStateDropDown(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);
                        widget.attachStateCityListeners(widget.$formSalesStateSelect, widget.$formSalesCitySelect, false);

                        widget.$formSalesStateSelect.trigger('change');
                    }

				}

		   }
		}
	};


	$(document).ready(function(){
		widget.init();
	});
})(jQuery);

;


/*
Author: Ivy
Description: hidden dealer information if the dealer isn't selected
*/

(function($){	
	$(function(){
		if(!$(".form-dealer-info").size()){return;}
		if($(".form-dealer-info").html()){
			if($(".form-dealer-info").parents(".section").is(":hidden")){
				$(".form-dealer-info").parents(".section").next(".row").hide();
				$(".form-dealer-info").parents(".section").show();
			}
		}
	});
})(jQuery);


(function($) {

	var formValidation = function() {

		this.init = function() {
			// HTML forms shim
			$.webshims.setOptions("extendNative", false);
			$.webshims.setOptions("waitReady", false);
			$.webshims.debug = true;
			if ( typeof SiteConf !== 'undefined' && SiteConf.dev) {
				// local path
				$.webshims.setOptions({
					basePath : "../../src/themes/ftd/js/lib/shims/"
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
		};

		this.customValidity = function() {
			// group check phone numbers
			
			// webshim group checking has a bug please use this.groupValidation method to avoid this issue happen
			$.webshims.ready('form-validators', function() {
				// group check phone numbers
				$.webshims.addCustomValidityRule('group-required-phone', function(elem, value) {
					var groupTimer = {};
					var name = elem.name;

					if (!name || !$(elem).hasClass('group-required-phone')) {
						return;
					}
					var textelements = $((elem.form && elem.form[name]) || document.getElementsByName(name));

					var isValid = textelements.filter(function() {
						return $(this).val() !== "";
					});

					if (isValid[0]) {
						textelements.each(function() {
							$("input[type=tel]").removeClass("user-error").addClass("user-success");
							$("input[type=tel]").parent().removeClass("ws-invalid").addClass("ws-success");
							$("input[type=tel]").attr("aria-invalid", "false");
						});
						return false;
					}

					var valid = $(".group-required-phone").filter(function() {
						return $(this).val() !== "";
					});

					if (valid.length == 0) {
						return true;
					}

				});

				// group check dealer locator search
				
				// webshim group checking has a bug please use this.groupValidation method to avoid this issue happen
				$.webshims.addCustomValidityRule('group-required-dealer-location', function(elem, value) {
					
					var name = elem.name,
						form = elem.form;

					if (!name || !$(elem).hasClass('group-required-dealer-location')) {
						return;
					}
					var textelements = $((form && form[name]) || document.getElementsByName(name));

					var isValid = textelements.filter(function() {
						return $(this).val() !== "";
					});
					
					if(isValid.length==0){
					    $(form).find(".group-required-dealer-location").each(function () {
					        if ($(this).val() !== "") {
					            isValid.push($(this));
					        }
					    });
					}
					
					if (isValid[0]) {
					    textelements.each(function () {
					        $("input[type=text]").removeClass("user-error").addClass("user-success");
					        $("input[type=text]").parent().removeClass("ws-invalid").addClass("ws-success");
					        $("input[type=text]").attr("aria-invalid", "false");

					        $('select.group-required-dealer-location').removeClass("user-error").addClass("user-success");
					        $("select.group-required-dealer-location").parent().removeClass("ws-invalid").addClass("ws-success");
					        $("select.group-required-dealer-location").attr("aria-invalid", "false");

					    });
					    return false;
					}
                    
					
					return true;
				});
				
				// check passwords match
				$.webshims.addCustomValidityRule('passwords-match', function(elem, value) {
					if (!value || !$(elem).hasClass('passwords-match')) {
						return;
					}
					var passwords = $(".passwords-match");

					if (passwords[0].value !== passwords[1].value && passwords[1].value !== '') {
						return true;
					}
					return false;
				});
				
				//captcha ajax validation, due to the incorrect response data structure already set, have to use "addCustomValidityRule" to define an cusotm ajax validation
				//for other ajax validations, please use webshim "data-ajaxvalidate" which require response data structure as the same as webshim defined data structure
				$.webshims.addCustomValidityRule("captcha-validation", function(elem, value, data) {
					var element = $(elem),
						submitBtn = $(elem.form).find("#submit");
					if (!element.hasClass("captcha")) {return;}
					//instead of setting pattern to html tag, set rules here to avoid webshim combination(html5 validation+ custom validation) validation issue
					//put validation all together as custom
					var reg = /^[0-9]{5}$/;
					
					//set default value
					//_ajaxvalidation, true to allow sending ajax validation
					if(typeof data._ajaxvalidation !== "boolean"){
						data._ajaxvalidation = true;
					}
					//_validRs, result of validation. in webshim, false represent valid, true represent invalid
					if(typeof data._validRs !== "boolean"){
						data._validRs = false;
					}
					//_lastValue, use to compare current value and last value, sending ajax validation again only when new value entered
					if(typeof data._lastValue !== "string"){
						data._lastValue = "";
					}
					//store value of submit button
					if(submitBtn.length>0 && submitBtn.attr("data-pleasewait")){
						var submitBtnVal = submitBtn.val(),
							waitingText = submitBtn.attr("data-pleasewait");
					}
					
					//ajax validtion will only be sent after pass regular validation
					if(reg.test(value)){
						if(data._ajaxvalidation&&data._lastValue!=value){
							//pass json string to server
							var posData = JSON.stringify({
								captcha : value
							});
							//set ajax loading status
							element.addClass("pending").prop("disabled",true);
							//set submit button disabled, prevent submit action happened while waiting the result of ajax validation
							if(submitBtnVal){
								submitBtn.val(waitingText);
								submitBtn.prop("disabled",true);
							}
							$.ajax({
				                type: "POST",
				                url: instance.serviceLocator("captcha.validation"),
				                //local test url
				                //url: "/carve/RAD2013/rest/forms/validate-captcha.js",
				                contentType: "application/json; charset=UTF-8",
				                data: posData,
				                dataType: "json",
				                success: function (response) {
				                	//remove ajax loading status after response returned
				                	element.removeClass("pending").prop("disabled",false);
				                	
				                	if(submitBtnVal){
				                		submitBtn.val(submitBtnVal);
				                		submitBtn.prop("disabled",false);
			                		}
				                	//will run validation again after ajax validation, turn off the ajaxvalidation to prevent sending duplicated ajax call
				                	data._ajaxvalidation = false;
				                	if(response.valid=="false"){
				                		//if "false" recieved, set the validation result to true, represent invalid value
				                		data._validRs = true;
				                		//due to change of the value, sometimes webshim will not change the status, refresh it to have the correct ui status
				                		element.trigger("refreshvalidityui");
				                		//invalid flag "_validRs" already saved, so trigger validation again to tell webshim the value is invalid
				                		element.trigger("refreshCustomValidityRules");
				                	}else if(response.valid=="true"){
				                		//change the ui status manually
				                		element.removeClass("user-error").addClass("user-success");
				                		//pass the ajax validation will do nothing, but tell webshim the value is valid
				                		data._validRs = false;
				                		data._ajaxvalidation = true;
				                	}else{
				                		data._validRs = false;
				                	}
				                },
				                error: function () {
				                   //remove ajax loading status after response returned
				                   element.removeClass("pending").prop("disabled",false);
				                   
				                   if(submitBtnVal){
				                		submitBtn.val(submitBtnVal);
				                		submitBtn.prop("disabled",false);
			                		}
				                   data._validRs = true;
				                   element.trigger("refreshvalidityui");
				                }
				            });
						}else{
							//as _ajaxvalidation already been set false, trigger("refreshCustomValidityRules") will not do ajax validation for current value
							//but turn _ajaxvalidation on to allow new value ajax validation
							data._ajaxvalidation = true;
						}
					}else{
						//save current value as last value
						data._lastValue = value;
						return true;
					}
					//save current value as last value
					data._lastValue = value;
					return data._validRs;
				});
				//on "reload" captcha button click, reset captcha input field as empty
				$("#captchareload").on("click",function(){
					$(this).siblings(".captcha").val("").trigger("refreshvalidityui");
				});
				
				
			});
			
			//add groupValidation
			this.groupValidation([
				"#dragonflyform .group fieldset > .column",
				".opt-inout-survey"
			]);
		};

		this.elements = function() {
			var scope = this;
			// forms - replace checkbox with an image
			var select = $('select'), fbForm = $('.fbform');

			//Only for FOA to load default value for first name and last name
			var $FoaConfig = $('#FoaConfig');
			
			$(".opt-inout-checkbox").show();//hidden in css, display while js ready - fixed default checkbox displayed and clicked by user when the js hasnt finish loading yet
			
			// Selects
			fbForm.on('focus', 'select', function() {
				$(this).parent().addClass('focus');
			});

			fbForm.on('blur', 'select', function() {
				$(this).parent().removeClass('focus');
			});

			$('form select[autofocus]').trigger('focus');

			// Remove ws-errorboxes from DOM
			$('input, select').on('blur', function() {
				$('.ws-errorbox').remove();
			});

			// ie select focus highlight fix
			if ($.browser.msie) {
				$(document).on('change', 'select', function() {
					$(this).blur();
				});
			}

			// Checkboxes
			var checkbox = $('input[type="checkbox"]').not('.uniform-checkbox').filter(function() {
				if (!$(this).parent().hasClass("hidden-options-checkbox")) {
					return $(this);
				}
			});

			checkbox.each(function() {
				var $this = $(this);

				$this.before($('<div class="checkbox-image" />'));

				if ($this.prop('checked')) {
					$this.prev().addClass('checked');
				}

			});

			$('.checkbox-image').on('click', function() {
				var self = $(this);
				
				if (self.hasClass('checked')) {
					self.removeClass('checked');
					self.parent().removeClass('ws-success');
					self.parent().addClass('ws-invalid');
					self.next().removeAttr("aria-invalid");
					self.next().removeClass("user-error");
					self.next().prop('checked', false);
					self.next().removeClass('user-sucess');
					self.next().addClass('user-error');
					self.next().attr('aria-invalid', true);
				} else {
					self.addClass('checked');
					self.parent().removeClass('ws-invalid');
					self.parent().addClass('ws-success');
					self.next().prop('checked', true);
					self.next().removeClass('user-error');
					self.next().addClass('user-success');
					self.next().removeAttr('aria-invalid');
				}

				if (self.siblings(".hidden-options-checkbox").length > 0) {
					var hiddenOptions = self.siblings(".hidden-options-checkbox").find("input[type='checkbox']");
					if (self.is('.checked')) {
						hiddenOptions.prop('checked', true);
					} else {
						hiddenOptions.prop('checked', false);
					}
				}
				
				scope.applyToShowHideFunc(self,scope);
				
			});

			$('.regform [type=submit]').on('click', function() {
				if ($FoaConfig.length > 0) {
					var FoaConfig = JSON.parse($FoaConfig.html());
					if ( typeof FoaConfig.firstname !== 'undefined' && typeof FoaConfig.lastname !== 'undefined' && $('#firstname').val().length == 0 && $('#lastname').val().length == 0) {
						$('#firstname').val(FoaConfig.firstname);
						$('#lastname').val(FoaConfig.lastname);
					}
				}
			});

			$("label").on('click', function() {
				var self = $(this);

				var pretarget = self.parent();
				// $(".checkbox-image",pretarget).trigger("click");
				var checkboxImg = $(".checkbox-image", pretarget);

				if (checkboxImg.hasClass('checked')) {
					checkboxImg.removeClass('checked');
				} else {
					checkboxImg.addClass('checked');
				}
				
				scope.applyToShowHideFunc(self,scope);
				
			});

			// Hide registration form sections on page load, except for the first one 'Account Information'
			if (!$('.regform').hasClass("form-invalid")) {
				$('.regform > .section').slice(1).find('.row.form-bg > .columns').hide();
			}

			$('.section').on('click', '.next-btn', function(e) {

				e.preventDefault();
				$(this).parents('.section').next().find('.row.form-bg > .columns').slideDown(300, function() {

					$(this).parents('.section').prev().find('.next-btn').animate({
						opacity : 0
					}, 200, function() {
						$(this).hide();
					});
					$('html, body').animate({
						scrollTop : $(this).parents('.section').offset().top
					}, 600);

				});

			});

			if ($(".hint").length > 0) {
				var hint = $(".hint");
				hint.click(function() {
					$(this).siblings(".hint-content").slideToggle();
					return false;
				});
			}

			// 'Enter' keyboard action for form
			// Added by Jennie Ji 2014/4/2
			if ($('.regform .next-btn').length > 0) {
				$(document).on('keypress', function(e) {

					if (e.which !== 13) {
						return;
					}
					if ($('.section .next-btn:visible').size() > 0) {
						$('.section .next-btn:visible').click();
					} else {
						$(".regform #submit").click();
					}
				});
			}

			//fixed enter key doesnt trigger under ie8
			if ($(".ie8 .fbform").length > 0) {
				$(document).on("keypress", function(e) {
					if (e.which == 13) {
						$(e.target).closest("fieldset").find("input[type='submit']").trigger("click");
					}
				});
			}
			
			//page load to refresh the captcha image. fixed image load cache issue, will be good if JSP can add timestamp
			var image = document.getElementById("captchaimage");
			if (image) {
				image.src = "/servlet/captcha.png?a=" + (new Date().getTime());
			}
			
			//page load to initalise the option group status
			var optGroup = $(".opt-inout-checkbox .option-group input[type=checkbox]");
			if(optGroup.length>0){
				optGroup.each(function(){
					if($(this).prop("checked")){
						$(this).closest(".option-group").show();
						scope.groupValidation([".opt-inout-checkbox"]);
						return;
					}
				})
			}

			if ($(".two-inputs").length > 0) {

				var inputOne = $(".two-inputs input").eq(0),
					inputTwo = $(".two-inputs input").eq(1);

				inputTwo.on("blur, change", function() {

					if (inputOne.checkValidity() && inputTwo.checkValidity()) {
						// do nothing
					} else {
						$(this).parent().removeClass("ws-success").addClass("ws-invalid");
					}
				});
				
			}
			
			//prevent page scroll to top
			$("a.submitForm").on("click",function(e){
				e.preventDefault();
			});


		}
		
		
		/**
		 * as we are using custom checkbox which contains "checkbox-image" and "label" ,we need to bind the func on both of them
		 * this func here to remove duplicated coding
		 * 
		 * @param self, jQuery object
		 * @param scope, formValidation object
		 */
		this.applyToShowHideFunc = function (self,scope){
			var chkbox = self.siblings("input[type=checkbox]");
			if(chkbox.length==0){return;}
			var chkboxId = chkbox.attr("id").toLowerCase();
			
			//add show/hide functionality to specified element
			//bind to "opt-inout-checkbox"
			if(self.siblings("#opt-inout-checkbox").length>0){
				scope.bindShowHidefunc(self,".option-group","checked",".opt-inout-checkbox",true);
			}
			if(chkboxId.indexOf("other")!=-1){
				//as the structure of CRM form is fixed (can not add any different class), we can only address the specific element by using structure. the structure cannot be changed for sure.
				var identityWrapper = chkbox.parent().parent();
				//bind to "#testOpsurveydebug_Option_Other"
				if(identityWrapper.hasClass("opt-inout-survey")){
					scope.bindShowHidefunc(self,".survey-group","checked",".opt-inout-survey");
				}
				//bind to "#testOpsurveydebug_Option_Other"
				if(identityWrapper.hasClass("survey-group")){
					scope.bindShowHidefunc(self,".textare","checked",".survey-group");
				}
			}
			//enable alternative selection. toggle selection between 2 groups
			scope.alternativeSel(self,"category-one","category-two",".opt-inout-checkbox");
			scope.alternativeSel(self,"category-one","category-two",".opt-inout-survey");
		}
	
		/**
		 * click element to show/hide specified element
		 * it's designed as reusable functionality
		 * 
		 * this functionality : 
		 * 1. can put targetField(field you want to show/hide) anywhere of clicked element no matter it's child, sibeling or parent
		 * 2. can accept checkbox, radio
		 * @param thisObj, jQueryObject, current element jQuery object. eg. $(this) of click event
		 * @param targetField, String, the show/hide field
		 * @param activatedCls, String, optional, default "checked", if there is no activatied class required, pass Boolean false. you can pass any string value as custom activated class.
		 * @param parentEl, String, optional, parent string. if not specified, will assume targetField located within triggerElment
		 * @param reversed, Boolean, optional, default false, only work on checkbox/radio. true means "check" to hide fields. false means "uncheck" to hide fields
		 */
		this.bindShowHidefunc = function(thisObj,targetField,activatedCls,parentEl,reversed) {
			var _self = this,
				_targetFieldObj = thisObj.find(targetField),//default targetField assumed located under clicked element
				_activatedCls = activatedCls,
				_parentEl = parentEl,
				_reversed = reversed,
				_optChkbox = thisObj.siblings(".option-group").find("INPUT[type=checkbox]");
			//set default activatedCls class if not specified
			if(typeof(_activatedCls)!=="string"||(typeof(_activatedCls)==="string"&&_activatedCls.length==0)){
				_activatedCls = "checked";
			}
			//set default reversed value if not specified
			if(typeof(_reversed)!=="boolean"){
				_reversed = false;
			}
			//if the targetField is not nested field, then find it by the parent of both triggerEl and targetField
			if(typeof(_parentEl)==="string"&&_parentEl.length>0){
				_targetFieldObj = thisObj.closest(_parentEl).find(targetField);
			}
			//address targetField, remove all the values within
			var _removeValue = function() {
				_targetFieldObj.find("INPUT,TEXTAREA").each(function(){
					var _thisObj = $(this);
					if(_thisObj.prop("type")=="checkbox"||_thisObj.prop("type")=="radio"){
						_thisObj.prop("checked",false);
					}else{
						_thisObj.val("");
					}
				});
				_targetFieldObj.find(".textare").slideUp();
				//remove the checked state
				_targetFieldObj.find(".checkbox-image").removeClass(_activatedCls);
				//to remove "option check box" mandatory
				_targetFieldObj.find(".altOpt").prop("required",false);
				_targetFieldObj.closest(".opt-inout-checkbox").removeClass("showErr").removeClass("ws-invalid");
				_targetFieldObj.closest(".opt-inout-checkbox").find(".ws-invalid").removeClass("ws-invalid");
			}
			
			//senario for default checkbox/radio
			if(thisObj.prop("type")=="checkbox"||thisObj.prop("type")=="radio"){
				if(thisObj.prop("checked")&&!_reversed){
					_targetFieldObj.slideDown(function(){
						//to set "option check box" mandatory
						if(_targetFieldObj.closest(".opt-inout-checkbox").length>0){
							_self.groupValidation([".opt-inout-checkbox"]);
						}
					});
				}else{
					_targetFieldObj.slideUp(function(){
						//remove all values after hide targetfield
						_removeValue();
					});
				}
			//senario for other types
			}else{
				//senario for custom checkbox
				if(thisObj.hasClass(_activatedCls)){
					//reverse to switch show/hide
					if(_reversed){
						_targetFieldObj.slideUp(function(){
							//remove all values after hide targetfield
							_removeValue();
						});
					}else{
						_targetFieldObj.slideDown(function(){
							//to set "option check box" mandatory
							if(_targetFieldObj.closest(".opt-inout-checkbox").length>0){
								_self.groupValidation([".opt-inout-checkbox"]);
							}
						});
					}
				//senario for non activatedCls
				}else{
					_targetFieldObj.slideToggle(function(){
						//to detect whether it's slideDown/slideup, hidden means slideUp
						if(_targetFieldObj.is(":hidden")){
							//only when reversed
							if(_reversed){
								//tick checkbox if reversed ()
								var checkBoxIcon = thisObj.siblings(".checkbox-image"),
									inputField = thisObj.siblings("INPUT");
								//if has "checkbox-image" slibling
								if(checkBoxIcon.length>0){
									checkBoxIcon.addClass(_activatedCls);
								}
								//if has input field
								if(inputField.length>0){
									inputField.prop("checked",true);
								}
							}
						//in some cases, the checkbox will be selected by click label. to prevent this, will remove the checked state on both slideup and slideDown
						_removeValue();
						//visible means slideDown
						}else{
							//to set "option check box" mandatory
							if(_targetFieldObj.closest(".opt-inout-checkbox").length>0){
								_targetFieldObj.siblings("input[type=checkbox]").prop("checked",false);
								_self.groupValidation([".opt-inout-checkbox"]);
							}
						}
					});
				}
			}
			
		};
		
		/**
		 * enable alternative selection. toggle selection between 2 groups
		 * 
		 * @param thisObj, jQuery element object
		 * @param firstCatCls, string, class name(not css selector) of one of the group
		 * @param secondCatCls, string, class name(not css selector) of one of the group
		 * @param bindUnderElCls, string, class name (css selector). as the click event bind to all element "eg $('label').click ", need to identify specific target elements by their parents 
		 */
		this.alternativeSel = function (thisObj,firstCatCls,secondCatCls,bindUnderElCls){
			//as the click event bind to all element "eg $('label').click ", need to identify specific target elements by their parents 
			if(thisObj.closest(bindUnderElCls).length>0){
				var inputField = thisObj.siblings("INPUT"),
					bindUnderObj = $(bindUnderElCls),
					firstCatObj = bindUnderObj.find("."+firstCatCls),
					secondCatObj = bindUnderObj.find("."+secondCatCls);
				
				var switchSelection = function(catObj){
					catObj.siblings(".checkbox-image").removeClass("checked");
					catObj.prop("checked",false);
					//"testOpsurveydebug_Option_Other" field has expandable fields, need to remove all values after slideUp to prevent those values submit
					if(catObj.attr("id").toLowerCase().indexOf("other")!=-1 && catObj.parent().parent().hasClass("opt-inout-survey")){
						var hiddenFields = catObj.closest(".opt-inout-survey").find(".survey-group");
						hiddenFields.slideUp(function(){
							hiddenFields.find("INPUT").siblings(".checkbox-image").removeClass("checked");
							hiddenFields.find("INPUT").prop("checked",false);
							hiddenFields.find(".textare").slideUp();
							hiddenFields.find("TEXTAREA").val("");
						});
					}
				}
				if(inputField.hasClass(firstCatCls)){
					var catObj = secondCatObj;
					switchSelection(catObj);
				}else if(inputField.hasClass(secondCatCls)){
					var catObj = firstCatObj;
					switchSelection(catObj);
				}
			}
		};
		/**
		 * group check specified elements, must fill at least one element to submit the form
		 * checking types: 
		 * 					textfield
		 * 					checkbox
		 * 					selection
		 * 
		 * webshims has a bug for group required (we previously use $.webshims.addCustomValidityRule to add) validation (submit button has to be clicked twice to submit the form)
		 * use this custom validation to avoid group checking issue
		 * 
		 * This custom validation require:
		 * 1. webshims (in order to work properly under IE8)
		 * 2. specified element must add class "altOpt"
		 * 
		 * @param wrapper, Array, each of them are css seletor to specify the container of the group.
		 * 		  this.groupValidation("#dragonflyform") can be used to check all specified element under form.
		 */
		this.groupValidation = function(wrapper) {
			if(wrapper instanceof Array && wrapper.length>0){
				var numberOfGroups = wrapper.length;
				for(var i=0; i<numberOfGroups; i++){
				    var groupEls = $(wrapper[i] + " INPUT.altOpt" + "," + wrapper[i] + " SELECT.altOpt"),
						form = groupEls.closest("FORM"),
						wrapperObj = $(wrapper[i]);
					if(groupEls.length>0 && form.length>0){
						//delegate change event on "checkbox-image" as it added by js and excuted later.
						//extra class to identify whether event been binded, to prevent bind duplicated event
						if(!$(wrapper[i]).hasClass("eventBinded")){
							form.on("click", wrapper[i]+" .checkbox-image",function(){
								var inputEl = $(this).siblings("INPUT");
								inputEl.trigger("change");
							});
							$(wrapper[i]).addClass("eventBinded");
						}
						/**
						 * recursive function, check groupValidation on every:
						 * 1. page loading
						 * 2. event triggered
						 * 
						 * @param groupEls, jquery obj, group elements
						 * @param wrapperObj, current group container
						 * @param init, boolean, true means the checkValidity is running first time.
						 */
						var checkValidity = function(groupEls,wrapperObj,init,actionELE) {
							var count = 0,
								curForm = groupEls.closest("FORM");
							
							//first time running to bind click event for submit buttom
							if(init){
								curForm.find("INPUT[type=submit]").on("click",function(){
									if(!wrapperObj.hasClass("showErr")&&wrapperObj.find(".altOpt").prop("required")){
										wrapperObj.addClass("showErr");
									}
								});
								curForm.find("a.submitForm").on("click",function(e){
									if(!wrapperObj.hasClass("showErr")&&wrapperObj.find(".altOpt").prop("required")){
										wrapperObj.addClass("showErr");
									}
								});
							}
							
							groupEls.each(function(){
								var curEl = $(this),
									e = "change";
								if(curEl.prop("type")=="text"){
									if(curEl.val()!=""){
										count++;
									}
									e = "blur";
								}else if(curEl.prop("type")=="checkbox"){
									if(curEl.prop("checked")){
										count++;
									}
								}
								else if (curEl.is("select")) {
								    if (curEl.val() != "") {
								        count++;
								    }
								}
								//first time running to bind event on element
								if(init&&!curEl.hasClass("eventBinded")){
									curEl.on(e,function(){
										checkValidity(groupEls,wrapperObj,false,curEl);
									});
									//extra class to identify whether event been binded, to prevent bind duplicated event
							        curEl.addClass("eventBinded");
								}
							});
							if(count>0){
								groupEls.prop("required",false);
								//set valid status , same as replaced validation function 
								groupEls.removeClass("user-error").addClass("user-success");
								groupEls.parent().removeClass("ws-invalid").addClass("ws-success");
								groupEls.attr("aria-invalid", "false");
								if(!init){
									wrapperObj.removeClass("showErr").removeClass("ws-invalid");
									wrapperObj.find(".ws-invalid").removeClass("ws-invalid");
								}
							}else{
								groupEls.prop("required",true);
								if (!init) {
								    wrapperObj.addClass("showErr");
								    if (actionELE && actionELE.length > 0 && actionELE.is('select')) {
								        actionELE.removeClass("user-success").addClass("user-error");
								        actionELE.parent().removeClass("ws-success").addClass("ws-invalid");
								        actionELE.attr("aria-invalid", "true");
								    }
								}
							}
						}
						checkValidity(groupEls,wrapperObj,true);
					}
				}
			}
		}
	};

	$(function() {
		formValidationInstance = new formValidation();
		formValidationInstance.init();
	});

})(jQuery);



/**
 * @author Ivy
 * @project formbuilder
 * @description 
 * if there is a valid fbdata parameter, then set the value for hidden inputs, text, textarea, select, radio and checkbox.
 * Every  field which is needed to set default value has a class "prepopulate".
 * valid fbdata as below:
 * fbdata=title_ff=5.0^^^Dr||firstname_ff=Ma''ciej||lastname_ff=Kunc||ff_Personal=asd'asd
   fbdata=title_ff=5.0^^^Dr;;firstname_ff=Ma''ciej;;lastname_ff=Kunc;;ff_Personal=asd'asd
   Each field is separated by "||" or ";;"
 * 
 */
(function($){
	var prepopulate = {
			
			data :{},
			type:{
				"hidden":"input",
				"text":"input",
				"textarea":"input",
				"tel":"input",
				"email":"input",
				"text":"input",
				"select":"select",
				"radio":"check",
				"checkbox":"check"
			},
			parseData:function(fbdata){
				var array = fbdata.split(/\|\||;;/);
				//parse fbdata to store in data,data ={name1:[value1,value2..],name2:[]...}
				for(i=0;i<array.length;i++){
					var item =array[i];					
					var index = item.indexOf("=");
					if (index != -1) {           	
						var key = item.substring(0, index);						
						var value = item.substring(index+1);				
						if(prepopulate.data && prepopulate.data[key]){
							prepopulate.data[key].push(value);
						}else{
							var dataValue = [];
							dataValue.push(value);
							prepopulate.data[key] = dataValue;
						}
					}
				}
				
			},
			setInput:function(elem,elemName){
				$(elem).attr("value",prepopulate.data[elemName][0]);							
			},
			setCheck:function(elem,elemName){
				for(x in prepopulate.data[elemName]){					
					var value = $(elem).attr("value");
					if(value === prepopulate.data[elemName][x]){
						if($(elem).prev(".checkbox-image")){
							$(elem).prev(".checkbox-image").addClass("checked");
						}
						$(elem).attr("checked",true);
						break;
					}
				}				
			},
			setSelect:function(elem,elemName){														
				for(x in prepopulate.data[elemName]){										
					if ($(elem).find("option[value="+prepopulate.data[elemName][x]+"]")){
						$(elem).find("option[value="+prepopulate.data[elemName][x]+"]").attr("selected", true);
					}											
				}		
			},
			setValue:function(){
				$(".prepopulate").each(function(){
					var $elem = $(this);
					var elemName = $elem.attr("name");
					//text,hidden,radio,checkbox,tel,email
					var inputType = $elem.attr("type");
					//select,texteare
					var tagname = $elem.get(0).tagName;
					var populateType = prepopulate.type[inputType] || prepopulate.type[tagname.toLowerCase()];
					if(populateType  && prepopulate.data[elemName] && prepopulate.data[elemName][0]){						
						switch(populateType){
							case "input":
								prepopulate.setInput(this,elemName);
								break;
							case "check":
								prepopulate.setCheck(this,elemName);
								break;
							case "select":
								prepopulate.setSelect(this,elemName);
								break;
						}
					}
				});
				
			},
			queryString : function(val){
				//"http://foa.ndprod.corp.nextdigital.com/rad/quote-request/1248854622187?sitetype=web&site=FOA&fbdata=rad=two||First_Name_PP=Maciej||Opt_InOut=1||Opt_InOut=2||Cust_Title_PP=Ms";		         		        
		        //add decodeURIComponent
				 var uri = decodeURIComponent(window.location.search);
		         var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		         return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);			  
			},
			init:function(){
				var fbdata = prepopulate.queryString("fbdata");
				if (!fbdata) return;
				prepopulate.parseData(fbdata);
				if (!prepopulate.data) return;
				prepopulate.setValue();
			}
		};
	$(document).ready(function(){		
		prepopulate.init();		
	});
})(jQuery);


/*
Author: Jennie Ji
Description: Owners dashboard SYNC widget. 
			 1. 'Save change' alert for register form when click 'close' button
			 2. 'Save change' alert for edit profile form when click 'close' button

Modified by York...
*/

(function($){
	var confirmAlert = {
			init: function () {
				this.popup( 'body.confirm-alert .close.formbuilder-close' );
			},
			// btn: 		String. Selector of the object which will trigger the confirm popup
			
			popup: function( btn ){
				
				var $btn = $(btn);

				if( $btn.length<1 ) { return this; }
				
				$btn.each(function() {
					var $this = $(this);
					var $popup = $("#confirmPopup" || $this.data('confirm') );

					if( $popup.length < 1 ) { return; }

					$this.on('click', function(e){
						e.preventDefault();
						
						if( $('.state-edit').length > 0 && $('.state-edit:visible').length < 1 ) {

							$("#confirmPopup .formbuilder-close")[0].click();
						}else{
							
							$popup.foundation('reveal', 'open', {
								animationSpeed: 110
							});
						}
					});

					$(".close-reveal-modal, .cancel", $popup).live("click", function(e){
						e.preventDefault();
						$popup.foundation('reveal', 'close');
					});
					$(".reveal-modal-bg").live("click", function() {
						if( !$popup.is(":visible") ) { return; }
						$popup.foundation('reveal', 'close');
					});

				});

				return this;
			}
	};

	

	$(function(){

		confirmAlert.init();
		
	});

})(jQuery);


/* 
 Author: Doris Zhang
 Description: Populate next 12 months based on current time in form
*/

(function($){
	var timePopulation = {
		init: function(){
			var monthNames = $("#InMarketDateMonthName").embeddedData();		
			var dateList=timePopulation.getDate();
			//console.log(monthNames);
			//console.log(dateList);
			$.each(dateList,function(i,item){	
				var id=item[0]+""+item[1];
				var value=monthNames[item[0]]+" "+item[1];
				$("#InMarketDate").append("<option value='"+id+"'>"+value+"</option>");
			});
			if (monthNames["unknown"] != '' && monthNames["unknown"] != undefined) {
			    $("#InMarketDate").append("<option value='unknown'>" + monthNames["unknown"] + "</option>");
			}
		},
		getDate: function(){
			var curDate=new Date();
			var month_count=12;
			var curMonth=curDate.getMonth();
			var curYear=curDate.getFullYear();
			var results=new Array();
			for(var i=0;i<month_count;i++)
			{
				curMonth+=1;
				if(curMonth>12){curMonth=1;curYear+=1;}				
				results[i]=new Array(curMonth,curYear);
			}						
			return results;
		}
	}
	
	$(function(){		
		timePopulation.init();		
	});
})(jQuery);




/*
Author: Ruiwen Qin
File name: brochure-request.js
Description: 1. Retrieve the models information and render the models selection carousel by using bxslider
			 2. digital download and mail form switch
*/

(function($){
	var brochures = {
		
		activeVehicle:0,

		modelData:{},

		filteredData:{},

		currentPage:0,

		formTypeStore:Object.create(ND.cacheStore),

		init: function(){
			if (!$("body.brochure-request").size()) {return;}
// window.history.pushState(null,"test","?ctx=m:1212121193819");
			var dataUrl = '',
				container = $(".brochure-request .models"),
				formType = 'digital';

			var formSwitchBtn = $(".brochure-request .delivery");

			// form.type cookie for saving the form selection type
			brochures.formTypeStore.key = "form.type";
			brochures.formTypeStore.expires = 365;
			brochures.formTypeStore.domin = instance.commonConfig().cookieDomain;

			//retrieve the rest call url
			dataUrl = brochures.getDataUrl();

			if (dataUrl){
				$.ajax({
					type: "GET",
					url: dataUrl,
					dataType: "json",
					success: function(data){
						brochures.modelData.items = data;
						brochures.modelData.isMobile = instance.isMobile();

						//retrieving the form type selection
						if (brochures.formTypeStore.is()){
							formType = $.trim($.cookie(brochures.formTypeStore.key));
						}

						brochures.renderContent(container,formType);

					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						$(".loading",container).hide();
						$(".alert-text",container).show();
					}
				});
			}
			
			//switch forms and carousel by clicking the delivery buttons
			$(".select-icon",formSwitchBtn).click(function(){
				var btn = $(this);
					// digitalForm = formSwitch.first(),
					// mailForm = formSwitch.last();

				if (btn.hasClass("active")){
					return;
				}
				else{
					btn.parent().siblings().children(".select-icon").removeClass("active");
					btn.addClass("active");

					if(btn.hasClass("digital")){
						brochures.renderContent(container,"digital");
						
					}

					if (btn.hasClass("mail")){
						brochures.renderContent(container,"mail");
						
					}
				}
			});

			//mobile/tablet/desktop view switch when resizing window
			var timer;
			if (!$("html").hasClass("lt-ie9")){
				$(window).bind('resize',function(){
					timer && clearTimeout(timer);
					timer = setTimeout((function(){
						if ($(window).width() < 768){
							var type = $(".active",formSwitchBtn).data("type");
							brochures.modelData.isMobile = true;
							brochures.renderContent(container,type);
							
						}

						if ($(window).width() >= 768){
							var type = $(".active",formSwitchBtn).data("type");
							brochures.modelData.isMobile = false;
							brochures.renderContent(container,type);
							
						}
					}),100);
				});
			}

			

		},
		formSwitch: function(type){
			var formSwitchBtn = $(".brochure-request .delivery"), 
				forms = $(".brochure-request .form-switch .section"),
				digitalForm = forms.first(),
				mailForm = forms.last();
			
			$(".select-icon",formSwitchBtn).removeClass("active");
			$("."+type,formSwitchBtn).addClass("active");

			brochures.formTypeStore.set(type);

			if (type === "digital"){
				digitalForm.show();
				mailForm.hide();
			}
			else {
				mailForm.show();
				digitalForm.hide();
			}


		},
		getVehicleInfo: function(){
			//retrieve model/derivative id from url parameters
			var paramIndex = location.href.search("ctx=");
			
			if (paramIndex == -1){
				return false;
			}
			else {
				var params = location.href.substring(paramIndex);
				var index = params.indexOf("&");
				if (index == -1){
					//ctx parameter is the last parameter in url
					return params.substring(4);
				}
				else {
					return params.substring(4,index);
				}
			}
			
			
		},
		getDataUrl: function(){
			//retrieve the url set in common config 
			var config = instance.commonConfig();
			var url = instance.serviceLocator("brochure.request");
			if (url){
				url = url.replace('{tooltype}',config.tooltype).replace('{site}',config.site).replace('{priceZone}',config.priceZone);
			}
			
			return url;
		},
		clearSelection: function(container){
			$(".loading",container).show();
			$(".wrapper",container).remove();
			$(".vehicle",container).remove();
			$(".model-list",container).remove();
			
		},
		renderContent: function(container,type){
			//render the template with the data returned and trigger the bxslider
			var markup = $("#model-select").html(),
			    options = {};

			brochures.clearSelection(container);
			

			brochures.filteredData.items = [];
			brochures.filteredData.isMobile = brochures.modelData.isMobile;

			if (type === "mail"){
				if (brochures.modelData.items){
					for (var i = 0; i < brochures.modelData.items.length; i++){
						if (brochures.modelData.items[i].hasPaperBrochure){
							brochures.filteredData.items.push(brochures.modelData.items[i]);
						}
					}
				}

			}
			else{
				
				if (brochures.modelData.items){
					for (var i = 0; i < brochures.modelData.items.length; i++){
						
						if (typeof brochures.modelData.items[i].brochureUrl !== 'undefined'){
							brochures.filteredData.items.push(brochures.modelData.items[i]);
						}
					}
				}
			}

			$(".loading",container).show();


			//render jQuery template
			if (brochures.filteredData.items.length > 0){
				$.template("modelsTemplate",markup);
				$.tmpl("modelsTemplate",brochures.filteredData).appendTo(container);
			}
			
			brochures.formSwitch(type);

			if (!brochures.filteredData.isMobile){
				var vehicleItems = $("li",container);
				
				if ($(window).width() <= 1024){
					options.minSlides = 4;
					options.maxSlides = 4;
					options.moveSlides = 4;
				}
				else {
					options.minSlides = 5;
					options.maxSlides = 5;
					options.moveSlides = 5;
				}

				brochures.initialSlider(options,container);

				// handler of vehicle item clicking
				vehicleItems.click(function(){
					var item = $(this);
					brochures.activeVehicle = item.index();

					item.siblings().removeClass("active");
					item.addClass("active");

					//update the values of hidden fields
					brochures.updateFormFields();

					return false;
				});

			}

			if (brochures.filteredData.isMobile){
				
				// $(".loading",container).hide();

				var changeVehicle = $(".model-list .select",container),
				    dropdown = $(".dropdown",container),
				    vehicle = $(".vehicle",container),
				    image = $("img",vehicle),
				    title = $("h3 span",vehicle),
				    vehicleItems = $("li",dropdown);

				dropdown.jScrollPane({
					autoReinitialise:true
				});

				brochures.preSelectVehicle(container);

				//toggle dropdown
				changeVehicle.click(function(){
					dropdown.toggleClass("dropdownOn");
				});

				//update hidden fields values in form
				vehicleItems.click(function(){
					var item = $(this),
						imgUrl = $("img",item).attr("src"),
						itemTitle = $("span",item).text();

					brochures.activeVehicle = item.index();
					
					image.attr("src","");
					$(".loading",container).show();

					image.attr("src",imgUrl);
					title.text(itemTitle);
					dropdown.toggleClass("dropdownOn");

					$(".loading",container).hide();

					brochures.updateFormFields();
				});
				
			}
			
		},
		updateFormFields: function(){
			var brochureDid = $("form .Brochure_dId"),
				brochureDyear = $("form .Brochure_dYear"),
				brochureDckscode = $("form .Brochure_dCksCode"),
				brochureDbrochurecode = $("form .Brochure_dBrochureCode"),
				brochureDtestdrivecode = $("form .Brochure_dTestDriveCode"),
				brochureDquotecode = $("form .Brochure_dQuoteCode"),
				brochureDname = $("form .Brochure_dName"),
				brochureMid = $("form .Brochure_mId"),
				brochureMname = $("form .Brochure_mName"),
				brochureMckscode = $("form .Brochure_mCksCode"),
				brochureUrl = $("form .Brochure_brochureUrl"),
				brochureMakeName = $("form .Brochure_makeName"),
				brochureMakeckscode = $("form .Brochure_makeName");

			var activeVehicleData = brochures.filteredData.items[brochures.activeVehicle];

			brochureDid.val(activeVehicleData.dId);
			brochureDyear.val(activeVehicleData.dYear);
			brochureDckscode.val(activeVehicleData.dCksCode);
			brochureDbrochurecode.val();
			brochureDtestdrivecode.val();
			brochureDquotecode.val();
			brochureDname.val(activeVehicleData.dName);
			brochureMname.val(activeVehicleData.mName);
			brochureMid.val(activeVehicleData.mId);
			brochureMckscode.val(activeVehicleData.mCksCode);
			brochureUrl.val(activeVehicleData.brochureUrl);
			brochureMakeName.val();
			brochureMakeckscode.val();

		},
		initialSlider: function(options,container){
			brochureSlider = $(".bxslider",container).bxSlider({
				minSlides: options.minSlides,
				maxSlides: options.maxSlides,
				moveSlides: options.moveSlides,
				slideWidth: 155,
				hideControlOnEnd: false,
				infiniteLoop: false,
				slideMargin:4,
				useCSS:false,
				pager: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				controls: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				onSliderLoad: function(currentIndex){
					brochures.preSelectVehicle(options,container);
				}
			});
			
		},
		reTriggerSlider: function(options,container,found){
			brochureSlider.reloadSlider({
				minSlides: options.minSlides,
				maxSlides: options.maxSlides,
				moveSlides: options.moveSlides,
				slideWidth: 155,
				hideControlOnEnd: false,
				infiniteLoop: false,
				slideMargin:4,
				useCSS:false,
				startSlide:brochures.currentPage,
				pager: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				controls: ($(".bxslider",container).children().length > options.minSlides) ? true : false,
				onSliderLoad: function(currentIndex){
					$(".wrapper",container).animate({
						"opacity":1,
						"filter":"alpha(opacity=100)"
					},500);
					$(".loading",container).hide();
				}
			});


		},
		preSelectVehicle: function(options,container){
			var vehicleId = brochures.getVehicleInfo();

			//pre-select vehicle item
			if (vehicleId){
				var splitIndex = vehicleId.search(";");
				var mid = '';
				var did = '';
				var found = false;
				var sliderWidth = $(".bx-viewport",container).width();

				if (splitIndex == -1){
					mid = vehicleId.substring(2);
				}
				else{
					did = vehicleId.substring(vehicleId.search("d")+2);
				}


				$(".model-items li",container).each(function(index,elem){
					var _this = $(this);

					if (did !== ''){
						if (_this.data("did") == did){
							_this.addClass("active");
							found = true;
							brochures.activeVehicle = index;
							
							if (!brochures.modelData.isMobile){
								//scroll to the selected vehicle page
								$(".bxslider").animate({
									left:-_this.position().left + sliderWidth - _this.width() +"px"
								},function(){
									brochures.currentPage = Math.floor(_this.position().left / sliderWidth);
									brochures.reTriggerSlider(options,container,found);
								});
								
							}
							else{
								var primaryImg = $(".vehicle img",container),
									primaryTitle = $(".vehicle h3 span",container);

								primaryImg.attr("src",$("img",_this).attr("src"));
								primaryTitle.text($("span",_this).text());

								$(".loading",container).hide();
							}
							

							brochures.updateFormFields();
							
						}
					}
					else{

						if (_this.data("mid") == mid && _this.data("did") == ''){
							_this.addClass("active");
							found = true;
							brochures.activeVehicle = index;
							
							
							if (!brochures.modelData.isMobile){
								//scroll to the selected vehicle page
									$(".bxslider").animate({
										left:-_this.position().left + sliderWidth - _this.width() +"px"
									},function(){
										brochures.currentPage = Math.floor(_this.position().left / sliderWidth);
										brochures.reTriggerSlider(options,container,found);
									});

							}
							else{
								var primaryImg = $(".vehicle img",container),
									primaryTitle = $(".vehicle h3 span",container);

								primaryImg.attr("src",$("img",_this).attr("src"));
								primaryTitle.text($("span",_this).text());

								$(".loading",container).hide();
							}

							brochures.updateFormFields();
						}
					}
					
				});

				if (!found){
					if (!brochures.modelData.isMobile){
						var _this = $(".bxslider li:first",container);
						_this.addClass("active");

						$(".bxslider").animate({
							// left:-_this.position().left + sliderWidth - _this.width() +"px"
						},function(){
							brochures.currentPage = 0;
							brochures.reTriggerSlider(options,container,found);
						});
					}
					else{
						var primaryImg = $(".vehicle img",container),
							primaryTitle = $(".vehicle h3 span",container);

						primaryImg.attr("src",$(".model-items li:first img").attr("src"));
						primaryTitle.text($(".model-items li:first span").text());

						$(".loading",container).hide();
					}

					brochures.updateFormFields();
				}
			}
			else{
				if (!brochures.modelData.isMobile){
						var _this = $(".bxslider li:first",container);
						_this.addClass("active");

						$(".bxslider").animate({
							left:-_this.position().left + sliderWidth - _this.width() +"px"
						},function(){
							brochures.currentPage = 0;
							brochures.reTriggerSlider(options,container,found);
						});
					}
					else{
						var primaryImg = $(".vehicle img",container),
							primaryTitle = $(".vehicle h3 span",container);

						primaryImg.attr("src",$(".model-items li:first img").attr("src"));
						primaryTitle.text($(".model-items li:first span").text());

						$(".loading",container).hide();
					}

					brochures.updateFormFields();
			}
		}
	};

	$(function(){
		brochures.init();
	});

})(jQuery);


/*
Author: Ruiwen Qin
File name: quote-request.js
Description: 1. 
			 2. 
*/

(function($){
	var quote = {
		
		init: function(){
			if (!$("body.quote-request").size()) {return;}

			var container = $(".quote-request .content-banner .content-wrap");

			var data = quote.getData();

			if (data){
				quote.renderContent(container,data);
			}
			else {
				quote.error(container);
			}

			//mobile/tablet/desktop view switch
			var timer;
			if (!$("html").hasClass("lt-ie9")){
				$(window).bind('resize',function(){
					timer && clearTimeout(timer);
					timer = setTimeout((function(){
						if ($(window).width() < 768){
							data = quote.getData();
							quote.renderContent(container,data);
						}

						if ($(window).width() >= 768){
							data = quote.getData();
							quote.renderContent(container,data);
						}
					}),100);
				});
			}

			
		},
		clearContent: function(container){

			$(".loading",container).show();
			$(".vehicle",container).remove();
			$(".specs",container).remove();
			$(".spec-list",container).remove();

		},
		getData: function(){
			var data = $("#bnp-vehicle-config").embeddedData();
			if($.isEmptyObject(data)){
				return false;
			}
			else{
				data.isMobile = instance.isMobile();
				return data;
			}
		},
		error: function(container){
			$(".loading",container).hide();
			$(".alert-text",container).show();
		},
		renderContent: function(container,data){
			quote.clearContent(container);
			var markup = $("#model-specs").html();
			$.template("modelTemplate",markup);
			$.tmpl("modelTemplate",data).appendTo(container);

			$(".loading",container).hide();

			/* Add hidden field in form for padding data*/
			var vehicleInfo = $("<input/>",{
                id: "vehicleInfo",
                name: "vehicleInfo",
                type: "hidden",
                value:JSON.stringify(data)
            });

			if ($("#dragonflyform #vehicleInfo").length > 0){
				$("#dragonflyform #vehicleInfo").remove();
			}

            // vehicleInfo.prependTo("#dragonflyform");

			// $("#vehicleInfo").val(JSON.stringify(data));

			if (!data.isMobile){
				$(".specs .detail",container).jScrollPane();
			}
			else {
				var dropdown = $(".dropdown",container),
					select = $(".select",container);
					
				dropdown.jScrollPane({
					autoReinitialise:true
				});

				select.click(function(){
					dropdown.toggleClass("dropdownOn");
				});
			}

		}
	};

	$(function(){
		quote.init();
	});

})(jQuery);


/**
 * Created by bjie on 11/17/2014.
 */
(function($){
    var formSalesController = {
        init: function(){
            this.type = $('#FormSales_Selected_Type');
            this.typeName = this.type.attr('name');
            this.companyName = $('#FormSales_Company_Name');
            this.type.parent().css('display','none');
            this.companyName.parent().css('display','none');
            this.selectionElem = $('#FormSales_Selection');
            this.modelElem = $('#FormSales_Model');
            this.stateElem = $('#FormSales_State');
            var compNameElem = $('#FormSales_Company_Name');
            this.compName = compNameElem.attr('name');
            this.observeElem = $('#FormSales_Observation');
			this.telElem = $('#FormSales_Tel');
			this.singleInputWithCheck = $('.fbform input[type=text][data-check]');
			this._switchable = false;
			this.ctrlCode = [108,112,113,114,115,116,117,118,119,120,121,122,123,8,9,12,13,16,17,18,20,27,32,33,34,35,36,37,38,39,40,45,46,144,175,174,179,173,172,180,170,171];
			this._formatConfig = {
				"CNPJ": {
					"pattern": new RegExp(/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/),
					"formatMap": {
						"2": ".",
						"6": ".",
						"10": "/",
						"15": "-",
						"last": "18"
					}
				},
				"CPF": {
					"pattern": new RegExp(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/),
					"formatMap": {
						"3": ".",
						"7": ".",
						"11": "-",
						"last": "14"
					}
				}
			};
            this.addEventListener();
        },
		
		dynmCheck: function($elem, fieldType, msg){
			var self = this;
			this._fieldType = fieldType;
			var maxlength = parseInt(this._formatConfig[this._fieldType].formatMap.last, 10);
			$elem.on('blur', function(){
				var inputValue = $(this).val();
				var isMatch = self._formatConfig[self._fieldType].pattern.test(inputValue);
				if(!isMatch){
					if (msg) {
				        msg.length && alert(msg);
				    } else {
				        alert(a_messages[self.typeName]['r']);
				    }
				}
			});
			$elem.on('keydown', function(event){
				var keyCode = event.keyCode;
				if(keyCode === 8){
					var inputValue = $(this).val();
					var inputLen = inputValue.length;
					if(self._switchable && self._fieldType === 'CNPJ' && inputLen === 15){
						inputValue = self.switchPattern(inputValue, 'CPF');
						inputLen = inputValue.length;
						$(this).val(inputValue);
					}
				}
							
				if($.inArray(keyCode, self.ctrlCode) === -1){
					var inputValue = $(this).val();
					var inputLen = inputValue.length;
					
					if(self._switchable && self._fieldType === 'CPF' && inputLen === 14){
						inputValue = self.switchPattern(inputValue, 'CNPJ');
						inputLen = inputValue.length;
						maxlength = parseInt(self._formatConfig[self._fieldType].formatMap.last, 10);
						$(this).val(inputValue);
					}
					
					if(inputLen >= maxlength){
						inputValue = inputValue.slice(0, maxlength-1);
						$(this).val(inputValue);
						return true;
					}
					
					var splitSymbol = self._formatConfig[self._fieldType].formatMap[''+inputLen];
					
					if(splitSymbol){
						inputValue = inputValue + splitSymbol;
						$(this).val(inputValue);
					}
				}
			});
		},
		switchPattern: function(inputValue, type){
			inputValue = inputValue.replace(/(\.)|(\-)|(\/)/g,'');
			this._fieldType = type;
			if(type === 'CNPJ'){
				inputValue = inputValue.replace(/^(.{2})(.{3})(.{3})(.{3})$/,'$1.$2.$3/$4');
			}else if(type === 'CPF'){
				inputValue = inputValue.replace(/^(.{3})(.{3})(.{3})(.{2})/,'$1.$2.$3-$4');
			}
			return inputValue;
		},
        addEventListener: function(){
            var self = this;
            this.selectionElem.change(function(){
                var selectedValue = $(this).val();
                self.type.val('');
				self.type.off();
                self.companyName.val('');
                var typeLabelElem = self.type.prev();
                switch(selectedValue){
                    case 'CNPJ':
                        self.type.attr({'placeholder':'__.___.___/____-__'}).removeAttr('maxlength');
                        typeLabelElem.html(selectedValue);
                        self.companyName.parent().css('display', 'none');
                        self.type.parent().css('display','block');
                        a_fields[self.compName]['r'] = false;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_a'];
						self._switchable = false;
						self.dynmCheck(self.type, selectedValue);
                        break;
                    case 'CPF':
                        self.type.attr({'placeholder':'___.___.___-__'}).removeAttr('maxlength');
                        typeLabelElem.html(selectedValue);
                        self.companyName.parent().css('display', 'none');
                        self.type.parent().css('display','block');
                        a_fields[self.compName]['r'] = false;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_b'];
						self._switchable = false;
						self.dynmCheck(self.type, selectedValue);
                        break;
                    case 'CPF/CNPJ':
						self.type.removeAttr('maxlength placeholder');
                        typeLabelElem.html(selectedValue);
                        self.companyName.parent().css('display', 'none');
                        self.type.parent().css('display','block');
                        a_fields[self.compName]['r'] = false;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_c'];
						self._switchable = true;
						self.dynmCheck(self.type, 'CPF');
                        break;
                    case 'CPFB':
                        self.type.attr({'placeholder':'___.___.___-__'}).removeAttr('maxlength');
                        typeLabelElem.html('CPF');
                        self.type.parent().css('display', 'block');
                        self.companyName.parent().css('display', 'block');
                        a_fields[self.compName]['r'] = true;
                        a_messages[self.typeName]['r'] = a_messages[self.typeName]['message_d'];
						self._switchable = false;
						self.dynmCheck(self.type, 'CPF');
                        break;
                    default:
                        self.type.parent().css('display', 'none');
                        self.companyName.parent().css('display', 'none');
                        a_fields[self.compName]['r'] = false;
                        break;
                }
            });
            $('#FormSales_Observation').keydown(function(e){
                var keyCode = e.keyCode;
                
                if($.inArray(keyCode, self.ctrlCode) === -1){
                    var maxlength = self.observeElem.attr('maxlength');
                    if(self.observeElem.val().length >= maxlength){
                        var name = self.observeElem.attr('name');
                        alert(a_messages[name]['r']);
                    }
                }
            });
            $('.fbform input[type="reset"]').click(function(){
                self.selectionElem.find('option[value=""]').prop('selected', true);
                self.selectionElem.trigger("change");
                self.modelElem.find('option[value=""]').prop('selected', true);
                self.modelElem.trigger('change');
                self.stateElem.find('option[value=""]').prop('selected', true);
                self.stateElem.trigger('change');
            });
			if (self.singleInputWithCheck && self.singleInputWithCheck.length > 0) {
                self.singleInputWithCheck.each(function () {
                    var ftype = $(this).attr('data-check');
                    ftype = ftype ? ftype.toUpperCase() : '';
                    var msg = (a_messages[$(this).attr('name')] && a_messages[$(this).attr('name')]['r']) ? a_messages[$(this).attr('name')]['r'] : '';
                    switch (ftype) {
                        case 'CNPJ':
                            $(this).attr({ 'placeholder': '__.___.___/____-__' }).removeAttr('maxlength');
                            self.dynmCheck($(this), ftype, msg);
                            break;
                        case 'CPF':
                            $(this).attr({ 'placeholder': '___.___.___-__' }).removeAttr('maxlength');
                            self.dynmCheck($(this), ftype, msg);
                            break;
                    }
                });
            }
			
			this.telElem.on('keydown', function(event){
				var keyCode = event.keyCode;
				var inputVal = $(this).val();
				var inputLen = inputVal.length;
				if(keyCode === 8){
					if(inputLen === 5){
						inputVal = inputVal.replace(/\(([0-9]{2})\)/, '$1');
						$(this).val(inputVal);
					}else if(inputLen === 10){
						inputVal = inputVal.slice(0, 9);
						$(this).val(inputVal);
					}
				}
				if($.inArray(keyCode, self.ctrlCode) === -1){
					if(inputLen === 2){
						inputVal = '('+inputVal+')';
						$(this).val(inputVal);
					}else if(inputLen === 8){
						inputVal = inputVal + '-';
						$(this).val(inputVal);
					}
				}
			});
        }
    };
    $(function(){
        formSalesController.init();
    });
})(jQuery);


/* 
 Author: Biao 
 Description: Gifts Radio 
*/

(function($){
	var giftsRadio = {
		init: function(){
				
		giftsRadio.evtControl();
		},
		evtControl:function(){
		 $(".giftsradio #giftsImage").click(function(){
			$(this).next("label").trigger("click");
		 })
		 $(".giftsradio .gift label").click(function(){
			$(".giftsradio #gifttag").removeClass("checked");
			$(".giftsradio #giftsImage").removeClass("checked");
			$(".giftsradio .gift").removeClass("ws-invalid");
			$(this).siblings("#gifttag").addClass("checked");
			$(this).siblings("#giftsImage").addClass("checked");
		 })
		}
	}
	
	$(function(){		
		giftsRadio.init();		
	});
})(jQuery);

