/*
Author: 		Wendelle Alimbubuyog
File name: 		mcLanguageSelect.js
Description: 	Dynamic language selection based on available language in a certain country
Dependencies: 	jQuery, uniform.js
Usage: 			- add class="uniform" to the container of the form
				- add id="country-select" to the select dropdown of country
				- add id="language-select" to the select dropdown of language
				- add id="redirect-btn" to the button that will redirect the page
*/


(function($){
	mcLanguageSelect = {			
		init: function(){	
			var self = this; 

			// check if the module is already existing 
			if(!typeof mcLanguageSelect){return;}

			self.countrySelectEl  = $('#country-select');
			self.langeSelectEl 	  = $('#language-select');	
			self.redirectButtonEl = $('#redirect-btn');
			self.languageList 	  = $("#language-list").embeddedData();
			self.homepageUrl 	  = $("#rest-services").embeddedData()['homepage.byLanguage'];

			// render the options for country select
			self.populateCountry(self.languageList);

			// when the country select is changed, the language select 
			self.countrySelectEl.on('change', self.countryChange.bind(self));

			// when the language select is changed, the link in the button is updated 
			self.langeSelectEl.on('change', self.languageChange.bind(self));

			// reset link href
			self.removeLink();

			$.uniform.update();

			//forces the span of uniform.js to render the text on clicking the back browser
			var cst = this.findFirstOption(this.langeSelectEl);
			this.langeSelectEl.siblings('span').text(cst); 
		},
		setCookie : function(cc, ln) {  //cc = country code , lc = language
			guxApp.cookie.set('dfy.locale', ln+"-"+cc);
		},
		populateCountry: function(list){
			// reset the options of country  select	
			var items = '<option value="0" selected>'+ this.findFirstOption(this.countrySelectEl) +' </option>';
			// var items = '<option value="0" selected> Select Country </option>';

			// add the options to the select dropdown 
			items += this.renderOption('country', list)

			//  append the option items to the country select
			this.countrySelectEl.html(items);
		},
		populateLanguage: function(list, item){
			// reset the options of country  select	
			var items = '<option value="0" selected>'+ this.findFirstOption(this.langeSelectEl) +' </option>';
			// var items = '<option value="0" selected> Select Language </option>';

			// add the options to the select dropdown 
			items += this.renderOption('language', list[item].lang)

			// enable the button
			this.langeSelectEl.html(items).prop('disabled', false);
			this.langeSelectEl.parent().removeClass('disabled');
		},
		countryChange: function(e){
			var self = this,
				el = e.target,
				elVal = $(el).val();

			this.removeLink();

			// check if selected option has value	
			if(elVal != "0") {
				this.populateLanguage(this.languageList, elVal);
			} else {
				this.langeSelectEl.find('option:first').attr('selected','selected');
				this.langeSelectEl.parent().addClass('disabled');
				this.langeSelectEl.prop('disabled', true);
			}


		  	// remove error text
		  	self.redirectButtonEl.find('span').remove();

			// update the text of dropdown
			$.uniform.update();
		},
		languageChange: function(e){
			var el = e.target,
				elVal = $(el).val();

			// check if selected option has value		
			if(elVal != "0") { 
				this.updateLink();
			} else {
				this.removeLink();
			} 

			// $.uniform.update() ;
		},
		findFirstOption: function(elem){
			return elem.find("option[value='0']").text();
		},
		updateLink: function() {
			var self = this,
				country = self.countrySelectEl.val(),
				lang = self.langeSelectEl.val(),
				site = self.languageList[country].lang[lang].site;

			// replace the variables from rest service
			var restService = this.homepageUrl.replace('{site}', site)
											  .replace('{country}', country)
											  .replace('{language}', lang);
			
			

			console.log(restService);	
								  			
			//calls the rest service to get the JSON return value
			$.ajax({
			  url: restService,
			  beforeSend: function( xhr ) {
			    mcLanguageSelect.removeLink();
			  }
			}).done(function(redirectLink) {

			 	// add link to href and disable the button	
			 	mcLanguageSelect.redirectButtonEl.removeClass("disabled")
			 	  					 .prop('disabled', false )
			 	  					 .attr("href", redirectLink.url);

			 	//update coookie upon clicking the button				 
			 	mcLanguageSelect.redirectButtonEl.on('click', function(){
			 		self.setCookie(country, lang)
			 	}) ; 					 
			}).fail(function() {
			    mcLanguageSelect.redirectButtonEl.append('<span> Error </span>')
			})	

		}, 
		removeLink: function() {

			// remove link to href and enable the button
			this.redirectButtonEl.addClass("disabled")
								 .attr("href", "#")
								 .prop('disabled', true );
		},
		renderOption: function( type, list){
		   // var option = "";
		   var option;

		   $.each( list, function( key, val ) {
	   	 		option += '<option value="'+ key +'"> '+ val.name +' </option>';
	   	 	 });
		   return option;

		}	
	}

	$(function(){
		mcLanguageSelect.init();
	});

})(jQuery);