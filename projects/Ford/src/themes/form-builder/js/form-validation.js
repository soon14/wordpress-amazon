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

