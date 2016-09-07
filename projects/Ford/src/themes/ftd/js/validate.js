/* Validate User Profile */
(function(window, document){
	
	var ND = window.ND = window.ND || {};

	/*
	 * ExpandBox: When user click on an anchor,
	 * Expand/Close the closet element of ".group", via add/remove the class of ".add";
	 */
	var ExpandBox = ND.ExpandBox = function($btns){
		/*Expose the api to other application*/
		ExpandBox.expand = function($btn, flag){
			var $group = $btn.closest(".group");
			if(arguments.length < 2){
				$group.toggleClass("close");
			}else{
				flag ? $group.removeClass("close") : $group.addClass("close");
			}
		};

		$btns.live("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			ND.ExpandBox.expand($(this));
		});
	};

	var Validate =  ND.Validate = function(){

		var validate = this, $form;

		//validate result
		validate.result = true;
		//validate fields
		validate.array = [];

		/*
		 * Check username is existing via ajax
		 * Etc. <a class="icon-check" target="#uaername" href="SYNC-User-data.js"></a>
		 * Post the data: username =  $("#username").val();
		 * Handle the callback: $("#msg-username").text(callbackdata);
		 */
		validate.isExist = function($inputs){
			$inputs.each(function(){
				var $input = $(this),
					$tip = $input.data("vtip"),
					$chk = $input.data("vchk"),
					$msg = $input.data("vamsg"),
					json = $input.data("vjson");

				//When target field changed, change the icon back to "check" state.
				$input.keyup(function(e){
					$chk.removeClass("hide")
						.addClass("icon-check");
					$msg.addClass("hide");
				});

				var exist = function(e){
					//If other error message aviliable, skip the ajax check.
					if($(".alert:visible", $input.parent()).size() > 0){
						return;
					}

					var //$field = $(this).parent().find("input"),
						//$chk = $field.data("vchk"),
						//$tip = $input.data("vtip"),
						data = {},
						href = $chk.attr("href");

					var dataAry = json.data.split(',');
					for(var i in dataAry){
						data[dataAry[i]] = $("[name='" + dataAry[i] + "']", $form).val();
					}

					if (href) {
						$.ajax({
							type: "POST",
							url: href,
							data: data,
							dataType: 'json',
							success: function(msg){
								if (msg){
									if(msg.valid) {
										$chk.addClass("hide");
										//$chk.removeClass("icon-check icon-wrong").addClass("icon-right");
										$msg.addClass("hide");
									} else {
										$chk.removeClass("hide");
										$tip.addClass("icon-wrong");
										//$chk.removeClass("icon-check icon-right").addClass("icon-wrong");
										validate.result = false;
										ND.ExpandBox.expand($input, true);

										if(msg.message){
											$msg.removeClass("hide")
												.addClass("tips")
												.text(msg.message);
										}
									}
								}
							},
							error: function(e){
								//console.log("error", data);
							}
						});
					}
				};

				//delay some time to execute the validate progress, in order to let other validation complete.
				var delay = function(e){
					e.preventDefault();
					setTimeout(function(){
						exist(e);
					}, 100);
				};

				//When user click the "check" btn,  or jump from the input fields
				$input.focusout(delay);
				$chk.click(delay);
				//we will not check aajax on submit event
				//validate.array.push([$btns, "click"]);
			});
		};
		
		/*
		 * Etc: <input type="text" id="email" name="email" />
		 * Alert Msg: <p id="msg-email">Alert Information</p>
		 */
		validate.isMatch = function($fields){
			$fields.focusout(function(e){
				var $field = $(this),
					json = $field.data("vjson"),
					$tip = $field.data("vtip"),
					$msg = $field.data("vmsg");

				var regExp = new RegExp(json.reg);

				if($field.val() !="" && !regExp.test($field.val()) || json.required =="true" && $field.val() =="" ){
					$tip.removeClass("icon-right hide")
						.addClass("icon-wrong");
					$msg.removeClass("hide");
					$msg.html(json.regmsg);
					$field.css('border','1px solid red');
					validate.result = false;
					ND.ExpandBox.expand($field, true);
				}else{
					$tip.removeClass("icon-wrong hide")
						.addClass("icon-right");
					$msg.addClass("hide");
					$field.css('border','');
				}
			});
			validate.array.push([$fields, "focusout"]);
		};

		/*
		 * Etc: Check 2 password is equal
		 * or Check new password and old password should not be equal.
		 */
		validate.isEqual = function($repasswords){
			$repasswords.focusout(function(e){
				var $repassword = $(this),
					json = $repassword.data("vjson"),
          tags = $repassword.data("tags") || [],
					$password = $repassword.closest("form").find("input[name='" + json.target + "']"),
					$tip = $repassword.data("vtip"),
					$msg = $repassword.data("vmsg");

				//If other error message aviliable, skip the ajax check.
				if($(".alert:visible", $repassword.parent()).size() && tags.join().indexOf("fields") >= 0 ){
					return;
				}

				var condition = function(){
					if(json.different){
						return $repassword.val() == $password.val();
					}
					return $repassword.val() != $password.val();
				};

				if(condition() || $password.val() == ""){
					$tip.removeClass("icon-right hide")
						.addClass("icon-wrong");
					$msg.removeClass("hide");
					$msg.html(json.eqmsg);

					validate.result = false;
					ND.ExpandBox.expand($repassword, true);
				}else{
					$tip.removeClass("icon-wrong hide")
						.addClass("icon-right");
					$msg.addClass("hide");
				}

			});
			validate.array.push([$repasswords, "focusout"]);
		};

		/*
		 * Etc: Check if user accept the terms and privacy.
		 */
		validate.isAccepted = function($items){
			$items.change(function(e){
				var $item = $(e.target),
					$msg = $item.data("vmsg"),
					json = $item.data("vjson");

				if($item.attr("checked") == "checked"){
					$msg.addClass("hide");
				}else{
					$msg.html(json.acpmsg);
					$msg.removeClass("hide");
					validate.result = false;
				}
			});
			validate.array.push([$items, "change"]);
		};

		validate.flexfield = function(json){

			//event handler
			var handler = function(e){
				e.preventDefault();

				var cfg = {}, data={}, paraname, href;
				for(paraname in json){
					cfg = json[paraname];
					href = cfg.url;
				}
				var $container = $(this).closest(".flexfield")
					, $field = $("input[name^='" + cfg.data + "']", $container)
					, $msg = $("p.alert", $container)
					, $chk = $(".icon-check", $container)
					, $tip = $(".icon-wrong, .icon-right", $container);

				data[paraname] = $field.val();

				if (href && $field.val()) {
					$.ajax({
						type: "POST",
						url: href,
						data: data,
						dataType: 'json',
						success: function(msg){
							if (msg){
								if(msg.valid) {
									$chk.addClass("hide");
									$tip.removeClass("icon-wrong hide")
										.addClass("icon-right");
									$msg.addClass("hide");
									//$field.attr({"readonly":"readonly"});
								} else {
									$chk.removeClass("hide");
									$tip.removeClass("icon-right hide")
										.addClass("icon-wrong");
									validate.result = false;

									if(msg.message){
										$msg.removeClass("hide")
											.addClass("tips")
											.text(msg.message);
									}
								}
							}
						},
						error: function(e){
							//console.log("error", data);
						}
					});
				}
			};

			//delegate event
			//$(".double", $form).delegate("input", "focusout", handler);
			$(".double", $form)
				.delegate(".icon-check", "click", handler)
				.delegate("input[name^='vehicle_vin']", "focusout", handler);
		};

		/*
		* Check All the validations in Array, by trigger the validate event.
		*/
		validate.check = function(){
			validate.result = true;
			for(var len = validate.array.length; len--;){
				validate.array[len][0].trigger(validate.array[len][1]);
			}
			return validate.result;
		};

		/*
		  * Add tip information and
		  * 0001 : has the msg icon
		  * 0010 : has the right/wrong icon, this is hidden by default
		  * 0100 : has the refresh icon, this is visibility by default
		  * 1000 : has the ajax msg icon
		  * <a class="tip icon-check"></a>
		  * <a class="tip hide"></a>
		  */
		var MESSAGE = 1,
			TIP = 10,
			CHECK = 100,
			AJAXMSG = 1000;

		validate.prepare = function(jsoncfg, flag, fuc, tag){
			//store the json configration
			//$input.data({ validate:cfg });

			for(var i in jsoncfg){
				//console.log(i);
				var $input = $("[name='" + i + "']", $form),
					$vtip = $input.data("vtip"),
					$vmsg = $input.data("vmsg"),
					$vchk = $input.data("vchk"),
					$vamsg = $input.data("vamsg"),
					$temp;

				if($input.size()){
					//merge the former validations.
					var vjson = $input.data("vjson") || {},
              		tags = $input.data("tags") || [];


					$.extend(vjson, jsoncfg[i]);
					tags.push(tag);
					$input.data({"vjson" : vjson, "tags" : tags});

					if(typeof $vchk == "undefined"){
						if(flag & CHECK){
							$temp = $('<a class="icon-check" href="{0}"></a>'.replace('{0}', jsoncfg[i].url));
							$input.after($temp);
							$input.data({ vchk: $temp });
						}
					}
					if(typeof $vtip == "undefined"){
						if(flag & TIP){
							$temp = $('<a class="icon-wrong hide"></a>');
							$input.after($temp);
							$input.data({ vtip: $temp });
						}
					}
					if(typeof $vmsg == "undefined"){
						if(flag & MESSAGE){
							$temp = $('<p class="alert hide"></p>');
							$input.parent().append($temp);
							$input.data({ vmsg: $temp });
						}
					}
					if(typeof $vamsg == "undefined"){
						if(flag & AJAXMSG){
							$temp = $('<p class="alert hide"></p>');
							$input.parent().append($temp);
							$input.data({ vamsg: $temp });
						}
					}

					//validate function
					fuc($input);
				};
			}
		};

		/*praw json interface*/
		validate.parseJson = function(formjson){
			/*validate configuration from the json*/
			if(formjson.ajax){
				validate.prepare(formjson.ajax, "1110", validate.isExist, "ajax");
			}
			if(formjson.fields){
				validate.prepare(formjson.fields, "0011", validate.isMatch, "fields");
			}
			if(formjson.equal){
				validate.prepare(formjson.equal, "0011", validate.isEqual, "equal");
			}
			if(formjson.accept){
				validate.prepare(formjson.accept, "0001", validate.isAccepted, "accept");
			}
			if(formjson.flexfield){
				validate.flexfield(formjson.flexfield);
			}
		};

		validate.parseConfig = function(config){
			switch(typeof config){
				//if it's a json object
				case "object":
					validate.parseJson(config);
					break;
				//if it's a string url
				case "string":
					$.ajax({
						type: "GET",
						data: {},
						url: config,
						dataType: 'json',
						success: function(data){
							validate.parseJson(data);
						},
						error: function(e){
							//console.log("error", e);
						}
					});
					break;
			}
		};

		/*checked all matched fields*/
		validate.init = function(form){
			$form = $(form);
			var cancel = false;

			var config = window[$form.attr("name")];
			//console.log($form.attr("name"));
			if(config){
				validate.parseConfig(config);

				//when user click on the submit button, one error message displayed by "focusout", the position moved, 
				//so user will not release on that button, so the submit event canceled in IE.
				$("input[type='submit']", $form).mousedown(function(e){
					validate.check();
					//If no error message submit the form
					if($(".alert:visible", $form).size() < 1){
						//remove grey options before submit.
						$(".flexfield.grey:visible").remove();
						//submit manually
						cancel =  false;
						$form.submit();
					}

					cancel = true;
				});

				$form.submit(function(e){
					if(cancel){
						//152786	Bug	Start	User Profile - QA FOA - Reset Password Request page - On the browser IE9, the request email will sent twice when user clicks the "reset my password" button.
						//cancel the submit event by stopping propup the mousedown event.
						e.preventDefault();
						e.stopPropagation();
						return false;
					}else{
						return true;
					}
				});

				//clear all the error messages.
				$("input[type='reset']", $form).mousedown(function(e){
					$(".alert:visible", $form).each(function(){
						$(this).addClass("hide");
					});

					//#152753 User Profile - QA FOA - Reset button - If the registration form has a error message and some input data then user clicks the reset buton, the error message is disappeared but the data is still there.
					$form[0].reset && $form[0].reset();
				});
			}
		};

	};


	/*
	* Add add/remove button on fields
	*/
	var FlexField = ND.FlexField = function(){
		var flexField = this;

		flexField.defaults = {
			container: "form .double",
			fieldsTmpl: ".flexfield.tmpl",
			addBtn: ".icon-add",
			removeBtn: ".icon-remove"
		};

		flexField.init = function(options){
			var settings = $.extend(flexField.defaults, options);

			var $fieldsTmpl = $(settings.fieldsTmpl).first(),
				$container = $(settings.container);

			//$(htmlRemove).appendTo($fieldsGroup);
			var $fieldsTemp = $fieldsTmpl.clone().removeClass("tmpl");

			var $btnAdd = $(settings.addBtn).click(function(e){
					e.preventDefault();
					var $flexFields = $(this).closest(".double").find(".flexfield");

					if($flexFields.size() < 10){
						$fieldsTemp.clone().insertBefore($btnAdd.parent());
					}

					//rename the queue, skip the template,  retain the flexfield group first
					$flexFields = $(this).closest(".double").find(".flexfield");
					for(var i=2;i <= $flexFields.size(); i++){
						//+1 of the name
						$("input", $flexFields.eq(i-1)).each(function(){
							var $input = $(this);
							$input.attr({
								"name": $input.attr("name").replace(/\d+$/g, i)
							});
						});
					}
				});

			/*remove the grey tips*/
			$container.delegate("input", "click", function(e){
				var $flexField = $(this).closest(".flexfield");
				if($flexField.hasClass("grey")){
					$flexField.removeClass("grey");
					$("input", $flexField).val("");
				}
			});

			$container.delegate(settings.removeBtn, "click", function(e){
				e.preventDefault();
				$(this).parents(".flexfield").remove();
			});
		}
	};

	$(function(){

        
          
		new ExpandBox($(".ibtn"));
        (new FlexField()).init();

		/*validate each form*/
		$(document).ready(function(){
			$(".validate").each(function(){
				var validate = new Validate();
				validate.init($(this));
			});
		});
	});

})(window, document);
