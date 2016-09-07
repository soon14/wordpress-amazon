/*
Author: 		Brett Chaney
File name: 		option-packs.js
Description: 	Pre Delivery Phase 3 welcome page
				Inject option packs for selected vehicle
Dependencies: 	jQuery, underscorejs
*/

var PD = PD || {};

(function($){

PD.optionsPacks = {

	init: function() {
		
		// go no further if option pack template is not found on page
		if (!$('#optionpack-template').length) {return;}

		var self = this;

		this.wrapper = $('#page-wrapper');

		// lets find some option packs...
		self.getOptions();

	},

	getData: function(url, onSuccess, onError) {

		$.ajax({
			url: url,
			async: true,
			cache: false,
			dataType: 'json',
			headers: {
				'Cache-Control': 'no-cache'
			},
			beforeSend: function(){
				if (!$('.ajax-loader').length) {

					// display ajax loading gif if not already displayed
					$("#Ford_Make").closest(".section").append('<div class="ajax-loader"></div>');
				}
			},
			success: function(data) {				
				onSuccess(data);
			},
			error: function(e, extStatus) {
				onError(url, e, extStatus);
			}
		});
		
	},

	getOptions: function() {

		var self = this,
			restServices = $('#rest-services').embeddedData(),
			commonConfig = $('#common-config').embeddedData(),
			site = commonConfig.site,
			priceZone = commonConfig.priceZone,
			derivative = $('#voi-derivatveid').val(),
			// LOCAL rest return
			//featuresURL = 'rest/predelivery/option-packs.js';
			featuresURL	= restServices.colorUrl.replace('{site}', site).replace('{priceZone}', priceZone).replace('{derivative}', derivative).replace('colours-trims', 'categories');

		this.getData(featuresURL, function(data) {

			var optionsData;

			$('.ajax-loader').remove();

			// loop through payload
			$.each(data, function(index) {
				if (data[index].name === 'Option Packages') {
					// create object with option packages to use for (underscore) template in PD.optionsPacks.appendOptions() method
					optionsData = $.grep(data[index].categories[0].features, function(o){
						return o.featuretype === "Option" && o.groupType === "Option Pack";
					});
				}
			});

			// now time to add the option packs found to the view/template
			self.appendOptions(optionsData);

		}, function(e, extStatus) {

			$('.ajax-loader').remove();
			$('.option-packs', self.wrapper).hide();

		});

	},

	appendOptions: function(optionsData) {
		var self = this,
			optionsView = $('#optionpack-template', self.wrapper).html(),
			predelModel = $("#predel-model-translation").embeddedData(),
			selectedOptionPacks; 
		
		selectedOptionPacks = predelModel.optionalPackages !== undefined ? predelModel.optionalPackages : [];
		// if there are no additional options hide the options DIV
		// otherwise display the additional options through the underscore template
		if (typeof optionsData !== 'object' || optionsData.length === 0) {
			$('.option-packs', self.wrapper).hide();
		} else {
			$('.option-packs ul', self.wrapper).html(_.template(optionsView, {options:optionsData, selectedOptionPacks:selectedOptionPacks}));
			$('.option-packs', self.wrapper).fadeIn(300);
		}

		// re-init uniformjs for each option pack checkbox that has just been inject into the DOM
		$('#page-wrapper .option-packs input').uniform();

	}

};

})(jQuery);