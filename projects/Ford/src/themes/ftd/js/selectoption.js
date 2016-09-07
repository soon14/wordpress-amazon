(function(window, document){
	var ND = window.ND = window.ND || {};

	var selectOption = ND.selectOption = {

		init : function(json, options){
			var mainOption = $(options.parentSelector)[0];
			var subOption = $(options.childrenSelector);

			var cities = window[json];

			if(!mainOption || !cities){
				return;
			}

			var optionObj = {}, i, len;

			//create country options list
			//selectOption.clearOption(mainOption);
			var countries = cities.list;
			for(i=0, len=countries.length;i<len;i++){
				var key = countries[i].name,
					val = countries[i].code;
				optionObj[val] = countries[i].states;
				//selectOption.addOption(mainOption, key, val);
			}

			//create cities option list
			mainOption.onchange = function(e){
				selectOption.clearOption(subOption[0]);
				var city = optionObj[mainOption.value];
				if(!city){
					return;
				}

				
				//selectOption.addOption(subOption[0], "Select", "");
				for(i=0, len=city.length;i<len;i++){
					var key = city[i].name,
						val = city[i].code;
					selectOption.addOption(subOption[0], key, val);
				}
			};
		},

		addOption : function(select, txt, value){
			if (select && select.options) {
				var opts = select.options;
				opts[opts.length] = new Option(txt, value);
			}
		},

		//clear all the options except the first one
		clearOption : function(select){
			if (select && select.options) {
				select.options.length = 1;
			}
		}
	};

	$(document).ready(function(){
		selectOption.init("countryStates", 
			{
				parentSelector:"#country",
				childrenSelector:"#state"
			}
		);
	});
})(window, document);