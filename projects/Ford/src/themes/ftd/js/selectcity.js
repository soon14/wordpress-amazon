/*
 * Description: Change select option, doesn't have depandence of jQuery 
 */
(function(window, document){
	var ND = window.ND = window.ND || {};

	var selectOption = ND.selectCity = {

		init : function(citieName, mainSelector, subSelector ){
			var mainOption = $(mainSelector)[0],
                subOption = $(subSelector);
                // cities = window[citieName];

            var $cities = $("#cityDropdownData");
            var cities;

			if($cities.length > 0) {
                  cities = JSON.parse($cities.html());
            }

			if(!cities || !mainOption){
				return;
			}

			//create states option list
			var states, optionObj = {}, i, j, len;

			selectOption.clearOption(mainOption);
            for(i=0, leni = cities.list.length; i<leni; i++){
                states = cities.list[i].states;
                for(j=0, lenj = states.length; j<lenj; j++){
                    var val = states[j][0];
                    optionObj[val] = states[j][1].cities;
                    selectOption.addOption(mainOption, val, val);
                }
            }

			//create cities option list
			mainOption.onchange = function(e){
				var city = optionObj[mainOption.value];
				
				selectOption.clearOption(subOption[0]);
				
				if(!city){
					return;
				}
				
				for(i=0, len=city.length;i<len;i++){
					selectOption.addOption(subOption[0], city[i][0] , city[i][0]);
				}
			};

            //Trigger change in order to set default option.
            selectOption.selected(mainOption);
            window.setTimeout(function(){
                selectOption.selected(subOption);
            }, 300);
		},

		addOption : function(select, txt, value){
			if (select && select.options) {
				var opts = select.options;
				opts[opts.length] = new Option(txt, value);
			}
		},

		clearOption : function(select){
			if (select && select.options) {
				select.options.length = 1;
			}
		},

        /*Set selected option by value in the data*/
        selected : function(select){
            var $select = $(select),
                value = $select.attr('data');

            if(value != $select.val()){
                $select.val(value).trigger("change");
            }
        }
	};

    //the jason data may rednered very slow, so init it after DOM is ready.
    $(document).ready(function(){
        selectOption.init("cities", "#state", "#city");
    });

})(window, document);