/*
Author: Gianfranco del Mundo
File name: paymentPresenter.js
Description: 

Dependencies: 
*/

(function($) {
	
	var pp = {
		init : function (){
			this.ppBlock = $('.payment-presenter');
			if(!this.ppBlock.length){return;}
			
			 _.templateSettings.variable = "pp";
			
			//jQuery code snippet to get the dynamic variables stored in the url as parameters and store them as JavaScript variables ready for use with your scripts
			var self = this;


			$.urlParam = function(name){
			    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    if (results==null){
			       return null;
			    }
			    else{
			       return results[1] || 0;
			    }
			}

			self.nameplateId = '';
			self.initRevealModel();
			self.registerCloseShowroom();	
			self.initMiniShowroom();
			self.initConfig();
			self.initDropdown();
			self.updateBox(".change-model li", "value");
			self.updateBox("#terms-dropdown .dropdown-list li", "terms");
			self.initRestService();
			self.initPriceFormatter();
			guxApp.innerPopup.init();

			//Subscribe done template compile
			$.subscribe('template-compiled', function(){
				//Show or Hide Standard or Subvented Block whichever is available
				if(self.config.derivativeData.terms[self.config.termIndex]){
					var standardBool = _.has(self.config.derivativeData.terms[self.config.termIndex], 'standard');

					if(standardBool){
						$('.payment-carousel .slides .item.standard',self.ppBlock).parent().css({'display':'inline-block'});
					} else {
						$('.payment-carousel .slides .item.standard',self.ppBlock).parent().css({'display':'none'});
					}
				}

				if(self.config.derivativeData.terms[self.config.termIndex]){
					var subventedBool = _.has(self.config.derivativeData.terms[self.config.termIndex], 'subvented');

					if(subventedBool){
						$('.payment-carousel .slides .item.subvented',self.ppBlock).parent().css({'display':'inline-block'});
					} else {
						$('.payment-carousel .slides .item.subvented',self.ppBlock).parent().css({'display':'none'});
					}
				}

				$('.loading-icon',self.ppBlock).hide();
				//Show Carousel block after html is rendered.
				$('.payment-carousel').slideDown();
				//To recalculate sizing in FlexSlider.
				$('.flexslider').trigger('resize');
			});
			
			
		},
		initConfig : function(){
			if(!$('#payment-block').length){return;}
        	this.config = {
	        	modelData:{},
	        	derivativeData:{},
	        	modelId:'',
	        	derivativeId:'',
	        	derivativeIndex:0,
	        	termIndex:0,
	        	site:'',
	        	emailBody:'',
	        	emailSender:'',
	        	groupingSep:'',
	        	currencySymbol:'',
	        	templateModel: _.template($('#payment-block').html()),
	        	templateTerms: _.template($('#terms-block').html()),
	        	templateCarousel: _.template($('#carousel-block').html()),
	        	templateSubvented: _.template($('#subvented-block').html()),
	        	templateAccordion: _.template($('#accordion-temp').html()),
	        	templateActionBar: _.template($('#action-bar').html())
        	}
        },
		initRestService : function(){
			//load configuration from template and get the urls ready
			var urls = $('#payment-services').embeddedData(),
				siteConfig = guxApp.tools.commonConfigData(),
				selectTexts = $('#payment-text').embeddedData(),
				mpzConfig = $('#mpz-config').embeddedData();

			var urlModel = urls['pp.model'],
				urlDerivatives = urls['pp.derivative'],
				site = siteConfig.site;
				this.config.site = site;
			// Check if theURL if it's coming from the BnP if not then show miniShowroom
			var bnpModelId = $.urlParam('ctx');

			this.config.emailBody = selectTexts['email.body'];
			this.config.emailSender = selectTexts['email.sender'];

			this.config.groupingSep = mpzConfig['groupingSeparator'];
			this.config.currencySymbol = mpzConfig['currencySymbol'];

			pp.urlModel = urlModel.replace('{site}', site);	
			pp.urlDerivatives = urlDerivatives.replace('{site}', site);

			if(bnpModelId){
				this.populateModelSelect(pp.urlModel.replace('{modelid}',bnpModelId.substring(4)));
				this.config.modelId = bnpModelId.substring(4);

			} else {
				$('#mini-showroom').foundation('reveal', 'open');
			}
		},
		/*
		* Add event listener to handle reveal modal behavior
		*/
		initRevealModel: function(){
			$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
				guxApp.innerPopup.init({
					container:'.vehicle-list',
					popup:'.inner-popup'
				});
			});

			$(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
				guxApp.innerPopup.init({
					container:'#page-wrapper',
					popup:'.inner-popup'
				});

				guxApp.innerPopup.init();
			});


			$(document).on('close.fndtn.reveal', '[data-reveal]', function () {
				$('.inner-popup.active .close-popup').trigger('click');
			});

			$(document).on('open.fndtn.reveal', '[data-reveal]', function () {
				$('.inner-popup.active .close-popup').trigger('click');
			});

			if(!$('.mini-showroom').length){return;}
			$('.vehicle-footer').contents().remove();
		},
		/*
		* Populate the Nameplate SelectBox
		*/
		populateModelSelect: function(nameplateId) {

			var self = this;

			// show loading gif - Placeholder for Loading later
			
			// AJAX call - populate Nameplate selectbox
			pp.getData(nameplateId, function(data) {
				// cache the results
				self.config.modelData = data.nameplate;
				self.populateTermsSelect(self.config.modelData.derivatives[self.config.derivativeIndex].id);
				//omniture
				 if( window._da && window._da.om && ND && ND.omniture ) {
					 _da.nameplate = {year: self.config.modelData.year, name: self.config.modelData.analyticsName, cat: self.config.modelData.analyticsCategory, id: self.config.modelId};
				 }
			},
				function(e, extStatus) {
					// hide loading gif - Placeholder
					
					// on AJAX error...
					// pp.vehicles.wrapper.prepend('<p class="error">' + pp.selectTexts['error.url.vehicles'] + '</p>');

					// disable first select
					// $('select#year', self.wrapper).attr('disabled', 'disabled').parents('.group').addClass('disabled');
			});
			

		},
		
		/*
		* A function the fills up the terms based on the modelId
		*/
		populateTermsSelect: function(modelId) {
			// show loading gif - Placeholder for Loading later
			// AJAX call - populate Terms selectbox
			if(!modelId){return;}
			var self = this;

			self.config.derivativeId = modelId;

			pp.getData(pp.urlDerivatives.replace('{derivativeid}',modelId), function(data) {

				// cache the results
				//pp.cacheTerms = data.derivative;
				self.config.derivativeData = data.derivative;
				if (guxApp.viewport.view === "mobile" && self.config.derivativeData.hotDealSmobUrl !=null) {
					self.config.derivativeData.latestOfferUrl = self.config.derivativeData.hotDealSmobUrl;
				}else{
					self.config.derivativeData.latestOfferUrl = self.config.derivativeData.hotDealUrl;
				}

				$('.model-container',self.ppBlock).html(self.config.templateModel( self.config ));
				$('#terms-dropdown .group .terms-container',self.ppBlock).html(self.config.templateTerms( self.config ));

				//Hide if no property (Standard or Subvented Published)
				$('.payment-carousel .slides .item.standard',self.ppBlock).html(self.config.templateCarousel( self.config ));
				$('.payment-carousel .slides .item.subvented',self.ppBlock).html(self.config.templateSubvented( self.config ));
				$('.accordion-block .payment-details',self.ppBlock).html(self.config.templateAccordion( self.config ));
				$('.action-holder',self.ppBlock).html(self.config.templateActionBar( self.config ));

				$.publish('template-compiled');

				},
				function(e, extStatus) {
					// hide loading gif - Placeholder
					// on AJAX error...
					// pp.vehicles.wrapper.prepend('<p class="error">' + pp.selectTexts['error.url.vehicles'] + '</p>');

					// disable first select
					// $('select#year', self.wrapper).attr('disabled', 'disabled').parents('.group').addClass('disabled');
			});

		},
		/*
			A reusable function to get the data using AJAX
		*/
		getData: function(url, onSuccess, onError) {
			$.ajax({
				url: url,
				dataType: 'json',
				success: function(data) {				
					onSuccess(data);
				},
				error: function(e, extStatus) {
					onError(url, e, extStatus);
				}
			});
			
		},
		initMiniShowroom : function(){
			var showroomBlock = $('.mini-showroom'),
				self = this;

			$('.section-cars',showroomBlock).on("click","a",function(e){
				if(!($(e.target).data('disclosure'))){
					e.preventDefault();
					//Get Nameplate ID from mini showroom then cache it 
					self.nameplateId = $(this).closest('.vehicle').find('.vehicle-content').data().nameplateid;
					self.config.modelId = self.nameplateId;
					$('#mini-showroom .showroom-error').fadeOut();
					$('#mini-showroom').foundation('reveal', 'close');
					//Re-Init Rest URLs
					self.populateModelSelect(pp.urlModel.replace('{modelid}',self.config.modelId));	
					self.resetIndexes();
				} else {

				}
			});

			//Update inner-popup position based on mini-showroom
			$.subscribe('popup-opened', function(){
				if(guxApp.innerPopup.setting.container == ".vehicle-list"){
					var popupPosX = $('.inner-popup.active').css('top'),
						computedPosX = popupPosX.substr(0,popupPosX.length-2) - $(window).height()/4 + 'px';
						console.log(computedPosX);
						$('.inner-popup.active').css({top:computedPosX});
				}
			});

		},
		initDropdown : function(){
			$('.payment-presenter').on("click",".sort-dropdown",function(e){
				e.preventDefault();
				$(this).toggleClass("active");
			});
		},
		resetIndexes : function(){
			this.config.termIndex = 0;
			this.config.derivativeIndex = 0;
		},
		updateBox : function(elem, prop) {
			var self = this;

			$('.payment-presenter').on("click",elem, function(e){
				e.preventDefault();
				//active current option
				$(".sort-dropdown li",self.container).removeClass("active");
				$(this).addClass("active");
				$(this).parent().prev().html('<span></span><a href="#">' + $("> a",this).text() + '</a>');
				if(prop === "value"){	
					self.config.termIndex = 0;
					self.config.derivativeIndex = $(".change-model .sort-dropdown li",self.container).index(this);
					$('.model-container',self.ppBlock).html(self.config.templateModel( self.config ));
					$('#terms-dropdown .group .terms-container',self.ppBlock).html(self.config.templateTerms( self.config ));
					self.populateModelSelect(pp.urlModel.replace('{modelid}',self.config.modelId));	
					self.renderPartials();
				} else {
					self.config.termIndex = $("#terms-dropdown .sort-dropdown li",self.container).index(this);
					self.renderPartials();
				}

				$.publish('template-compiled');
			});
		},
		renderPartials : function(){	
			var self = this;

			$('.payment-carousel .slides .item.standard',self.ppBlock).html(self.config.templateCarousel( self.config ));
			$('.payment-carousel .slides .item.subvented',self.ppBlock).html(self.config.templateSubvented( self.config ));
			$('.accordion-block .payment-details',self.ppBlock).html(self.config.templateAccordion( self.config ));
			$('.action-holder',self.ppBlock).html(self.config.templateActionBar( self.config ));
		},
		registerCloseShowroom : function(){
			var showroomCont = $('#mini-showroom'),
				self = this;

			$('.heading .icon-close', showroomCont).click(function(){

				// check if a derivative has already been selected
				// if not then show error
				if (typeof self.config.derivativeId === 'string') {
					self.showroomError();
				} else {
					$(showroomCont).foundation('reveal', 'close');
				}
				
			});

			$('body').on('click', '.reveal-modal-bg', function() {

				// check if a derivative has already been selected
				// if not then show error
				if (typeof self.config.derivativeId === 'string') {
					self.showroomError();
					return false;
				}
				
			});
		},
		showroomError : function(){
			$('#mini-showroom .showroom-error').fadeIn();
		},
		initPriceFormatter : function(){
			var self = this;
			guxApp.priceFormatter.initialise({
				formatString: self.config.currencySymbol,
				thousandsSeparator: self.config.groupingSep
			});
		}
	};

	$(function(){
		pp.init();
	});

	//jQuery mobile will add "ui-link" to "a" tag which cause style issue.
	$(document).on("pageinit", function(){
		$(".showroom-container .ui-link").removeClass('ui-link');
	});

}(jQuery));
