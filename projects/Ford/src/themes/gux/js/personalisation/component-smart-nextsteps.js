/*
Author: 		Randell Quitain
File name: 		component-smart-nextsteps.js
Description: 	Display or suppress Smart Next Steps component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){

	guxPersonalisation.smartnextsteps = {

		// each component requires an init function
		init: function() {
			this.ruleEngine();
		},
		ruleEngine: function() {

			var configInfo = guxApp.tools.commonConfigData(),
				country = (configInfo != null && configInfo.iso2country) ? configInfo.iso2country : null,
				fstools = (configInfo != null && configInfo.fsTools) ? $.map( configInfo.fsTools.split('#'), function(v){ return v === "" ? null : v; }) : null,
				antools = (configInfo != null && configInfo.anTools) ? $.map( configInfo.anTools.split('#'), function(v){ return v === "" ? null : v; }) : null,
				owtools = (configInfo != null && configInfo.owTools) ? $.map( configInfo.owTools.split('#'), function(v){ return v === "" ? null : v; }) : null,
				fstoolsMob = (configInfo != null && configInfo.smobFsTools) ? $.map( configInfo.smobFsTools.split('#'), function(v){ return v === "" ? null : v; }) : null,
				antoolsMob = (configInfo != null && configInfo.smobAnTools) ? $.map( configInfo.smobAnTools.split('#'), function(v){ return v === "" ? null : v; }) : null,
				owtoolsMob = (configInfo != null && configInfo.smobOwTools) ? $.map( configInfo.smobOwTools.split('#'), function(v){ return v === "" ? null : v; }) : null,
				kbas = $.map( guxPersonalisation.psn.profile.kba.split('#'), function(v){ return v === "" ? null : v; }),
				steps;
			
			if(guxApp.viewport.view === 'mobile'){
				if (guxPersonalisation.psn.profile.authState === "OW") {
						steps = owtoolsMob;
				} else {
					if (guxPersonalisation.psn.profile.authState === "FS") {
						//checked what step is next in depending on published sns component - FS
						steps = fstoolsMob;
					} else if (guxPersonalisation.psn.profile.authState === "AN"){
						steps = antoolsMob;
					}
				}
			} else {
				if (guxPersonalisation.psn.profile.authState === "OW") {
						steps = owtools;
				} else {
					if (guxPersonalisation.psn.profile.authState === "FS") {
						//checked what step is next in depending on published sns component - FS
						steps = fstools;
					} else if (guxPersonalisation.psn.profile.authState === "AN"){
						steps = antools;
					}
				}
			}
				this.snsArbiter(steps, kbas);
		},
		snsArbiter: function(steps, kbas) {

			// save in arr the Steps got from dfytranslations
			var arr = steps;

			// Check if a step is already done and remove it from the array.
			for(var key in kbas){
				var _kba = kbas[key];
				var indexHolder  = $.inArray(_kba.toString().slice(0,-1), steps);
				if(indexHolder != -1 && _kba != null) {
					steps.splice(indexHolder, 1);
				} else {
				} 
			}

			if(steps != undefined || steps != null){
				if(steps[0] != "" && steps[0] != undefined && steps[0] != null){
					//Show the current Step
					this.showNextStep($('.' + steps[0].toLowerCase()), true, true);
				} else {
					// If owner's registration is available for the market. Show it after all the steps is completed.
					if ( $( ".smartnextsteps.owner-reg" ).length ) {
						this.showNextStep($('.smartnextsteps.owner-reg'), true, true);
					}
				}
			}
		},
		showNextStep: function(element, isResponsiveImg, isCarousel) {

			// hide all smart next steps component
			$('.smartnextsteps').hide();

			// show specific component
			element.show();

			if(typeof picturefill !== "undefined" && isResponsiveImg === true) {
				picturefill();
			}
			
			if(isCarousel === true) {
				// reinit billboardCarousel
				guxApp.billboardCarousel.init(element);

				if(guxApp.viewport.view !== "mobile" && $('.flex-direction-nav', element).length > 0) { $('.flex-direction-nav', element).show(); }
			}

			// image preloader
			guxPersonalisation.rest.imageLoader(element, function() {
				// loader
				guxPersonalisation.rest.loader(element);
			});

		}

	};

})(jQuery);