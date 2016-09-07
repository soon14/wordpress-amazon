/*
 * Description: Change select option, doesn't have depandence of jQuery 
 */
(function(){
	var ND = window.ND = window.ND || {};

	var selectOption = ND.selectOption = {

		init : function(cities){
			var mainOption = $("#select-state")[0];
			var subOption = $("#select-city");
			var isSelectRegionOnly = false;
			if ($("body div[data-role='page']").length>0) {
			    isSelectRegionOnly = $("body div[data-role='page']").hasClass("select-region-only") || $("body div[data-role='content']").hasClass("select-region-only");
			}

			if(!mainOption){
				return;
			}

			//create states option list
			var states = cities.list[0].states,
				optionObj = {}, i, len;

			selectOption.clearOption(mainOption);
			//selectOption.addOption(mainOption, "Select", "");
			for(i=0, len=states.length;i<len;i++){
				var val = states[i][0];
				var txt = val;
				optionObj[val] = states[i][1].cities;
				if (isSelectRegionOnly) {
				    txt = (val === optionObj[val][0][0]) ? val : (val + '/' + optionObj[val][0][0]);
				}
				selectOption.addOption(mainOption, txt, val);
			}

			if (isSelectRegionOnly) {
			    subOption[0].parentNode.parentNode.parentNode.remove();
			}
			else {
			    //create cities option list
			    mainOption.onchange = function (e) {
			        var city = optionObj[mainOption.value];
			        if (!city) {
			            return;
			        }

			        selectOption.clearOption(subOption[0]);
			        //selectOption.addOption(subOption[0], "Select", "");
			        for (i = 0, len = city.length; i < len; i++) {
			            selectOption.addOption(subOption[0], city[i][0], city[i][0]);
			        }

			        //jQuery Mobile: refresh the select options.
			        if ($.mobile) {
			            subOption.selectmenu('refresh');
			        }
			    };
			}
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
		}
	};

})();