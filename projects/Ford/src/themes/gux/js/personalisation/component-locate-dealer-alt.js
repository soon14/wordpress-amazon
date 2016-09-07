/*
Author: 		Doris
File name: 		component-locate-dealer-alt.js
Description: 	Display or suppress Locate a Dealer component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){

    guxPersonalisation.locatedealeralt = {

        init: function (locatedealer) {
            var self = this;
            self.locatedealer = locatedealer;
            self.altThemeContainer = self.locatedealer.container.hasClass('alt-theme') ? self.locatedealer.container : [];
            self.searchbtn = $('.actions-bar .button', self.altThemeContainer);
            self.searchContainer = $('.search-panel', self.altThemeContainer);
            self.vehicle = $("select[name='vehicle']", self.searchContainer);
            self.location = $("input[name='location']", self.searchContainer);
            if (!self.altThemeContainer.length) return;

            self.vehicle && self.vehicle.length && self.vehicle.val('') && self.vehicle.uniform.update();
            self.location && self.location.length && self.location.val('');
            
            //self.locatedealer.container.show();

            self.getOptData();
            self.searchbtn.on('click', function (e) {
                e.preventDefault();
                
                var formDataArr = $("select, input", self.searchContainer).serializeArray(),
				    province = $("select[name='province']", self.searchContainer),
				    city = $("select[name='city']", self.searchContainer),
                    vehicle = $("select[name='vehicle']", self.searchContainer),
                    location = $("input[name='location']", self.searchContainer),
                    keywordStr = "",
					matchParams = {},
					containParams = {};

                self.searchbtn.siblings('.error').removeClass('active');

                if (province.val().length && city.val().length) {
                    $.each(formDataArr, function (key, val) {
                        if (val.value != "") {
                            keywordStr = keywordStr + val.value;
                        }
                    });
                    self.locatedealer.loadedDealers = [];
 					if (guxApp.tools.isAutoNaviMap()) 
                        {
							matchParams={AdministrativeArea: province.val()||"", Locality: city.val()||""};
							containParams={_name:location.val()||"",DealerNewVehicle:vehicle.val()||""};
							self.locatedealer.mapController.searchDealersByLocation(keywordStr, false , matchParams , containParams, function(dealers,errorMsg) {
								errorMsg = errorMsg||((!!guxPersonalisation.locatedealer.config.error_message)?guxPersonalisation.locatedealer.config.error_message.dealer_not_found:"No results were Found. Please try a different search."),
								sessionStorage['dealers'] = JSON.stringify(dealers);
								sessionStorage['search_province'] = province.val();
								sessionStorage['search_city'] = city.val();
								sessionStorage['error_message'] = errorMsg;
								location.length && location.val().length && (sessionStorage['search_location'] = location.val());
								vehicle.length && vehicle.val().length && (sessionStorage['search_vehicle'] = vehicle.val());
								if (window.history.pushState) {
									window.history.pushState('', '', window.location.href);
								}
								window.location.href = self.searchContainer.attr('action');
							});	
                        }
						else {
							self.locatedealer.mapController.searchDealersByProperties({AdministrativeArea: province.val(), Locality: city.val()}, {}, function(dealers,errorMsg) {
								errorMsg = errorMsg||((!!guxPersonalisation.locatedealer.config.error_message)?guxPersonalisation.locatedealer.config.error_message.dealer_not_found:"No results were Found. Please try a different search."),
								sessionStorage['dealers'] = JSON.stringify(dealers);
								sessionStorage['search_province'] = province.val();
								sessionStorage['search_city'] = city.val();
								sessionStorage['error_message'] = errorMsg;
								location.length && location.val().length && (sessionStorage['search_location'] = location.val());
								vehicle.length && vehicle.val().length && (sessionStorage['search_vehicle'] = vehicle.val());
								if (window.history.pushState) {
									window.history.pushState('', '', window.location.href);
								}
								window.location.href = self.searchContainer.attr('action');
							});	
						}
                        					
                }
                else {
                    self.searchbtn.siblings('.error').addClass('active').find('.text').text(self.locatedealer.mapController.config.error_message.isMandatory);
                }
                
                return false;
            });
            $('.btn-current', self.searchContainer).off('click').on('click', function (e) {
                e.preventDefault();
                self.locatedealer.searchByPosition($("input[name='location']", self.searchContainer), function (dealers, status) {
                    if (dealers) {
                        sessionStorage['dealers'] = JSON.stringify(dealers);
                        window.location.href = self.searchContainer.attr('action');
                    }
                })
            });

        },
        getOptData: function () {
            var self = this,
                dataConfig = $("#cityDropdownData"),
			    dataArr = [],
			    province = $("select[name='province']", self.altThemeContainer),
			    city = $("select[name='city']", self.altThemeContainer);
            //self.searchbtn.addClass('disabled').attr("disabled", "disabled");
            //initial disable city
            city.prop("disabled", "disabled").closest(".dropdown").addClass("disabled");
            province.uniform.update();
            city.uniform.update();
            if (dataConfig.length > 0 && dataConfig.embeddedData().list && dataConfig.embeddedData().list.length) {
                dataArr = dataConfig.embeddedData().list[0].states;
            }
            //import Province data
            if (dataArr.length > 0) {
                $.each(dataArr, function (key, val) {
                    $("<option value='" + val[1].name + "'>" + val[1].name + "</option>").appendTo(province);
                });                
            }
            //import City data
            province.on("change", function () {
                var provinceVal = $(this).val(),
                    endLoop = false;
                city.val("");//select the default value
                city.uniform.update();//update select val in uniform
                $.each(dataArr, function (key, val) {
                    if (provinceVal == val[1].name) {
                        city.children("option:gt(0)").remove();
                        $.each(val[1].cities, function (key, val) {
                            $("<option value='" + val[1].name + "'>" + val[1].name + "</option>").appendTo(city);
                        });
                        endLoop = true;
                    }
                    if (endLoop) { return false; }
                });
                //enable city
                province.val() == "" ? city.prop("disabled", "disabled").closest(".dropdown").addClass("disabled") : city.prop("disabled", false).closest(".dropdown").removeClass("disabled");
                //city.val().length ? self.searchbtn.removeClass('disabled').attr("disabled", false) : self.searchbtn.addClass('disabled').attr("disabled", "disabled");
            });
            //city.on('change', function () {
            //    city.val().length ? self.searchbtn.removeClass('disabled').attr("disabled", false) : self.searchbtn.addClass('disabled').attr("disabled", "disabled");
            //});
        }

    };
    

})(jQuery);