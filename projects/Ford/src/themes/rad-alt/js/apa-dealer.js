/*
Author: Ruiwen Qin
Description: 1. Triggerring bxSlider for contents
			 2. Searching and showing up results in the widget
*/

(function($){

	var widgets = {
		dealerInit: function(){

			$.subscribe('apa-dealer', (function(_,container,widgetData,markup){
				widgets.formViewSwitch(container,widgetData,markup);
			}));

			$.subscribe('apa-dealer-notLoggedIn', (function(_,container){
				formValidationInstance.elements();
				widgets.queryForm(container);
				dealer.fetchSelectOptions();
			}));
			
		},

		formViewSwitch: function(container,data,markup){
			$(container).on("click", "a.search", function(e){
				e.preventDefault();
				container.children().not(".loading",".alert-text").remove();
				$(".loading", container).show();

				widgets.notLoggedInTemp();

				dealer.fetchSelectOptions();

				return false;
			});
		},

		notLoggedInTemp: function(){
			var container = $(".widgets .dealer");
			var markup = $("#dealer-template-not-loggedin").html();
			$(markup).appendTo(container);
			$(".loading", container).hide();
			formValidationInstance.elements();
			if(!instance.isMobile()){
				instance.widgetsInit();
			}

			widgets.queryForm(container);
		},

		queryForm: function(container){
			var form = $("form", container);
			
			form.submit(function(){
				var location = $("#dealerlocation").val(),
					name = $("#dealername").val();
				if (location === "" && name === "") {
				    $("p.error", container).show();
				    return false;
				}
			});

			$(".btn.dealers-query").click(function (e) {
			    e.preventDefault();
			    if ($("#dealerlocation").val() || $("#dealername").val() || $("#dl_state").val()) {
			        form.submit();
			    }
			    else {
			        $(".widget-dealer form .onerow select,.widget-dealer form .onerow input").removeClass("user-success").addClass("user-error");
			        $(".widget-dealer form .onerow select,.widget-dealer form .onerow input").parent().removeClass("ws-success").addClass("ws-invalid");
			        $(".widget-dealer form .onerow select,.widget-dealer form .onerow input").attr("aria-invalid", "true");
			        return false;
			    }
			});
			
		}
		
		
	};

	var dealer = {
	    fetchSelectOptions: function () {

	        var ddlState = $('#dl_state');
	        var ddlCity = $('#dl_city');
	        var cityData = $("#cityDropdownData");

	        if (ddlState.length == 0 || cityData.length == 0) return;

	        //console.log(cityData.embeddedData());

	        var states = cityData.embeddedData().list[0].states,
                optionObj = {},
                defaultStateOpt = ddlState.find('option').first(),
                defaultCityOpt = ddlCity.find('option').first();

	        //create states option list
	        ddlState.empty();
	        ddlState.append(defaultStateOpt);
	        for (var i = 0; i < states.length; i++) {
	            var val = states[i][0];
	            var txt = val;
	            optionObj[val] = states[i][1].cities;
	            ddlState.append("<option value='" + val + "'>" + txt + "</option>");
	        }

	        //create cities option
	        ddlState.bind('change', function () {
	            ddlCity.empty();
	            ddlCity.append(defaultCityOpt);
	            //ddlCity.val('');
	            //ddlCity.change();
	            var city = optionObj[ddlState.val()];
	            if (!city) { return; }
	            for (var i = 0; i < city.length; i++) {
	                var val = city[i][0];
	                var txt = val;
	                ddlCity.append("<option value='" + val + "'>" + txt + "</option>");
	            }
	        });

            //preselect
	        if (ddlState.attr('data') && ddlState.attr('data').length > 0) {
	            ddlState.val(ddlState.attr('data'));
	            var city = optionObj[ddlState.attr('data')];
	            if (city) {
	                ddlCity.empty();
	                ddlCity.append(defaultCityOpt);
	                for (var i = 0; i < city.length; i++) {
	                    var val = city[i][0];
	                    var txt = val;
	                    ddlCity.append("<option value='" + val + "'>" + txt + "</option>");
	                }
	                if (ddlCity.attr('data') && ddlCity.attr('data').length > 0) {
	                    ddlCity.val(ddlCity.attr('data'));
	                }
	            }
	        }

	        //validate
	        dealer.checkValidate(true);

	        //event
	        ddlCity.on('blur', function () {
	            if (!ddlState.val() && !$('input#dealername').val() && !ddlCity.val()) {
	                $(this).removeClass("user-success").addClass("user-error");
	                $(this).parent().removeClass("ws-success").addClass("ws-invalid");
	                $(this).attr("aria-invalid", "true");
	            }
	        });
	        ddlState.on('blur', function () {
	            if (!ddlState.val() && !$('input#dealername').val() && !ddlCity.val()) {
	                $(this).removeClass("user-success").addClass("user-error");
	                $(this).parent().removeClass("ws-success").addClass("ws-invalid");
	                $(this).attr("aria-invalid", "true");
	            }
	        });
	        $('form.dealer-form-siderbar input#dealer-search-button').on('click', function (e) {
	            if (!$("#dl_state").val() && !$("#dl_city").val() && !$("#dl_name").val() && !$('#dl_location').val()) {
	                $('form.dealer-form-siderbar .onerow select,form.dealer-form-siderbar .onerow input').removeClass("user-success").addClass("user-error");
	                $('form.dealer-form-siderbar .onerow select,form.dealer-form-siderbar .onerow input').parent().removeClass("ws-success").addClass("ws-invalid");
	                $('form.dealer-form-siderbar .onerow select,form.dealer-form-siderbar .onerow input').attr("aria-invalid", "true");
	                return false;
	            }
	        });

	    },

	    checkValidate: function (init, actionELE) {
	        var groupEls = $(".widget-dealer #dragonflyform .onerow input.altOpt,.widget-dealer #dragonflyform fieldset select.altOpt");
	        if (groupEls.length) {
	            var count = 0;
	            var wrapperObj = $(".widget-dealer #dragonflyform fieldset");
	            if (init) {
	                $(".widget-dealer #dragonflyform").find("INPUT[type=submit]").on("click", function () {
	                    if (!wrapperObj.hasClass("showErr") && wrapperObj.find(".altOpt").prop("required")) {
	                        wrapperObj.addClass("showErr");
	                    }
	                });
	            }
	            groupEls.each(function () {
	                var curEl = $(this),
                        e = "change";
	                if (curEl.val() != "") {
	                    count++;
	                }
	                if (init && !curEl.hasClass("eventBinded")) {
	                    curEl.on(e, function () {
	                        dealer.checkValidate(false, curEl);
	                    });
	                    curEl.addClass("eventBinded");
	                }
	            });
	            if (count > 0) {
	                groupEls.prop("required", false);
	                groupEls.removeClass("user-error").addClass("user-success");
	                groupEls.parent().removeClass("ws-invalid").addClass("ws-success");
	                groupEls.attr("aria-invalid", "false");
	                if (!init) {
	                    wrapperObj.removeClass("showErr").removeClass("ws-invalid");
	                    wrapperObj.find(".ws-invalid").removeClass("ws-invalid");
	                }
	            }
	            else {
	                groupEls.prop("required", true);
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
	    }
	};

	$(function(){
	    widgets.dealerInit();
	    dealer.fetchSelectOptions();
	});

})(jQuery);


