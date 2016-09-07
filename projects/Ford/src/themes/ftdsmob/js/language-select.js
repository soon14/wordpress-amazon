/*
 * Author:      Brett Chaney
 * Description: Language/Country select on landing page
 */

(function($) {
	
	$(function(){
		
	    var

		landingClass = $(".landing"),
		languageSel = $("#select-language"),
		countrySel = $("#select-country"),
		countrySelLabel = $(".country-selection label"),
        $language = $('#select-country-language-json'),
        		
		changeCountrySel = function() {

			function disableCountrySel() {
				countrySel.selectmenu("disable");
				countrySelLabel.css('opacity','0.3');
			}

			function enableCountrySel() {
				countrySel.selectmenu("enable");
				countrySelLabel.css('opacity','1');
			}

			disableCountrySel();

			languageSel.change(function() {
				var currVal = languageSel.val();
				if (currVal !== "") {
				    enableCountrySel();
                    //fetch country options according to json data
				    if ($language.length > 0) {
				        var languageList = JSON.parse($language.html());
				        var cityList = null;
				        $.each(languageList.languages, function (i, item) {
				            if (item.language === currVal) {
				                cityList = item.items;
				            }
				        });
				        if (cityList && cityList.length>0 && countrySel.length > 0 && countrySel.children('option').length > 0) {
				            var defaultOpt = countrySel.children('option')[0];
				            countrySel.empty();
				            countrySel.append(defaultOpt);
				            $.each(cityList, function (i, city) {
				                var val = '', txt = '';
				                for (var x in city) {
				                    if (x) {
				                        val = x;
				                        txt = city[x];
				                    }
				                }
				                countrySel.append("<option value='"+val+"'>"+txt+"</option>");
				            });
				            if ($.mobile) {
				                countrySel.selectmenu('refresh');
				            }
				        }
				    }

				} else {
					disableCountrySel();
				}
			});

		};

		// run country select function if "landing" class is found
		if (landingClass.length > 0) {
		    changeCountrySel();
		}
		
	});

})(jQuery);