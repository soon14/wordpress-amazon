/*
Author:         Brett Chaney
File name:      serviceCalculator.js
Description:    Calculator to estimate service price
Dependencies:   jQuery, tinypubsub, underscorejs, jquery.uniform
*/

// namespaces for general GUX and Service Booking methods (required for service calculator)
var guxApp = guxApp || {},
	SB = SB || {};

(function($) {

// namespace for service calculator (sc) methods
guxApp.sc = {};

// methods that handle the four select dropdowns
guxApp.sc.vehicles = {

	init: function() {

		// this object will hold all the results after the ajax calls
		guxApp.sc.cache = {};

		// lets get this calculator cracking, starting with setting up the rest services
		this.setupRestServices();

		// add iphone-ios class for iPhone to fix unwanted input zooming behaviour
		if (guxApp.tools.isIOS() == 'iPhone') {
			$('.service-calc').addClass('iphone-ios');
		}

	},

	setupRestServices: function() {

		//load configuration from template and get the urls ready
		var urls = $('#service-calc-services').embeddedData(),
			siteConfig = $('#common-config').embeddedData(),
			selectTexts = $('#service-calc-text').embeddedData();

		var urlVehicles = urls['sc.allvehicles'],
			urlServices = urls['sc.vehicleservices'],
			urlPdf = urls['sc.pdf'],
			site = siteConfig.site;

		// assign URL's to guxApp.sc namespace for future reference
		guxApp.sc.urlVehicles = urlVehicles.replace('{site}', site);
		guxApp.sc.urlServices = urlServices.replace('{site}', site);
		guxApp.sc.urlPdf = urlPdf.replace('{site}', site);
		guxApp.sc.selectTexts = selectTexts;

		// get vehicle data and populate year select
		this.populateYearSelect();

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
			success: function(data) {				
				onSuccess(data);
			},
			error: function(e, extStatus) {
				onError(url, e, extStatus);
			}
		});
		
	},

	resetSelects: function(elem) {

		// disable select boxes and unbind change event
		$(elem).parents('.group').nextAll().addClass('disabled').find('select').attr('disabled', 'disabled').off('change');

		$(elem).parents('.group').nextAll().find('option:not(:first-child)').remove();

		// reset uniformjs selects
		$('select', this.wrapper).uniform();

	},

	resetErrors: function() {

		// remove any error messages
		$('.error', this.wrapper).remove();
	
	},

	deactivateResults: function() {

		// deactivate service results when the user goes back to select a new vehicle
		if ($('.service-calc.service-results').hasClass('active')) {
			$('.service-calc.service-results').removeClass('active').addClass('deactive');
			$('button.calculate', guxApp.sc.services.wrapper).removeClass('ready').attr('disabled', true);
		}

		// reset uniformjs selects
		$('select', this.wrapper).uniform();

	},

	populateSelectsDefault: function() {

		var self = this,
			firstSelect = $('select', self.wrapper)[0];

		// loop through each of the four selects and append its relevant default text
		$('select', self.wrapper).each(function(){
			var type = $(this).attr('id');
			
			$('select#' + type + ' > option:first-child', self.wrapper).text(guxApp.sc.selectTexts['select.' + type + '.text']);
		});

		guxApp.sc.vehicles.resetSelects(firstSelect);

	},

	populateYearSelect: function() {

		var self = this;

		// show loading gif
		$('.service-calc .loading').show();

		// wrapper for the four vehicle select dropdowns
		guxApp.sc.vehicles.wrapper = $('form#service-dropdowns');

		// AJAX call - populate year selectbox
		guxApp.sc.vehicles.getData(guxApp.sc.urlVehicles, function(data) {

			self.populateSelectsDefault();

			// cache the results
			guxApp.sc.cache = data.data;

			var yearSelect = $('select#year', self.wrapper);

			$.each(guxApp.sc.cache.years, function(i, value){
				yearSelect.append('<option value="' + value + '">' + value + '</option>');
			});

			// reset uniformjs on this select
			$('select', self.wrapper).uniform();

			// hide loading gif
			$('.service-calc .loading').hide();

			// bind event for year selectbox
			guxApp.sc.vehicles.yearChangeEvent();

		}, function(e, extStatus) {

			// hide loading gif
			$('.service-calc .loading').hide();

			// on AJAX error...
			guxApp.sc.vehicles.wrapper.prepend('<p class="error">' + guxApp.sc.selectTexts['error.url.vehicles'] + '</p>');

			// disable first select
			$('select#year', self.wrapper).attr('disabled', 'disabled').parents('.group').addClass('disabled');
		});

	},

	yearChangeEvent: function() {

		var self = this;

		$('select#year', self.wrapper).on('change', function() {

			var elem = $(this),
				yearVal = $(this).val();

			self.resetSelects(elem);
			self.resetErrors();

			if (yearVal !== 'default') {

				$('select#model', self.wrapper).attr('disabled', false).parents('.group').removeClass('disabled');
				
				// populate model selectbox with cached ajax results
				$.each(guxApp.sc.cache.models, function(i, value) {

					// only add models that match the year selected
					if (yearVal >= value.startyear && yearVal <= value.endyear) {
						$('select#model', self.wrapper).append('<option value="' + value.name + '">' + value.name + '</option>');
					}

				});

				// display error message if no models are found for that year
				if ($('select#model option', self.wrapper).length === 1) {
					guxApp.sc.vehicles.wrapper.prepend('<p class="error">There are no models produced for this year. Please select another year.</p>');
					self.resetSelects(elem);
				}

				// bind event for model selectbox
				self.modelChangeEvent();

			}

			// grey out/deactivate service results
			self.deactivateResults();
			
		});

	},

	modelChangeEvent: function() {

		var self = this;

		$('select#model', self.wrapper).on('change', function() {

			var elem = $(this),
				modelVal = $(this).val(),
				modelYear = parseInt($('select#year', self.wrapper).val(), 10);

			self.resetSelects(elem);

			if (modelVal !== 'default') {

				$('select#style', self.wrapper).attr('disabled', false).parents('.group').removeClass('disabled');
				
				// populate style selectbox with cached ajax results
				$.each(guxApp.sc.cache.models, function(i, value) {

					if (value.name === modelVal) {

						$.each(value.years, function(i, value) {

							if (value.year === modelYear) {

								guxApp.sc.cache.style = value.style;

								$.each(value.style, function(i, value) {
									$('select#style', self.wrapper).append('<option value="' + value.name + '">' + value.name + '</option>');
								});

							}

						});

					}

				});

				// reset uniformjs on this select
				elem.uniform();

				// bind event for style selectbox
				self.styleChangeEvent();

			}

			// grey out/deactivate service results
			self.deactivateResults();

		});

	},

	styleChangeEvent: function() {

		var self = this;

		$('select#style', self.wrapper).on('change', function() {

			var elem = $(this),
				styleVal = $(this).val();

			self.resetSelects(elem);

			if (styleVal !== 'default') {

				$('select#engine', self.wrapper).attr('disabled', false).parents('.group').removeClass('disabled');
				
				// populate engine selectbox with cached ajax results
				$.each(guxApp.sc.cache.style, function(i, value) {

					if (value.name === styleVal) {

						guxApp.sc.cache.engines = value.engines;

						$.each(value.engines, function(i, value) {
							$('select#engine', self.wrapper).append('<option value="' + value.type + '" id="' + value.id + '">' + value.type + '</option>');
						});
					
					}

				});

				// reset uniformjs on this select
				elem.uniform();

				// bind event for engine selectbox
				self.engineChangeEvent();

			}

			// grey out/deactivate service results
			self.deactivateResults();

		});

	},

	engineChangeEvent: function() {

		var self = this;

		$('select#engine', this.wrapper).on('change', function() {

			var elem = $(this),
				engineVal = $(this).val();

			if (engineVal !== 'default') {

				// empty fields 
				$('.service-results select option').remove();

				guxApp.sc.selectedVehicle = $('select#engine option:selected', this.wrapper).attr('id');

				// reset uniformjs on this select
				elem.uniform();

				// load service/additional options data for selected vehicle
				guxApp.sc.services.loadVehicleData();

			}

			// grey out/deactivate service results
			self.deactivateResults();

		});

	}

};

// methods for the selected vehicles service section 
guxApp.sc.services = {

	// months Array for 'first registration to date' select
	monthsArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

	unbindEvents: function() {

		// prevent duplicate event handlers
		$('input#estimatedkm', this.wrapper).off('keypress blur');
		$('select#regyear', this.wrapper).off('change');
		$('button.calculate', this.wrapper).off('click');
		$('.show-roadside-assist', this.wrapper).off('click');
		$('.xtime-mobile-link', this.wrapper).off('click');

	},

	loadVehicleData: function() {

		var self = this,
			originalServicesURL = guxApp.sc.urlServices,
			amendedServicesURL;

		// wrapper for vehicle registration fields and service UI for the selected vehicle
		guxApp.sc.services.wrapper = $('form#recommended-service');

		// unbind already bound form elements
		self.unbindEvents();

		// show loading gif
		$('.service-calc .loading').show();

		amendedServicesURL = originalServicesURL + guxApp.sc.selectedVehicle;

		// ajax call for the services/additional options for the selected vehicle
		guxApp.sc.vehicles.getData(amendedServicesURL, function(data) {

			// hide loading gif
			$('.service-calc .loading').hide();

			// cache the results
			guxApp.sc.cache.services = data.data;

			guxApp.sc.cache.services.serviceinterval.push({
				'km': '> ' + guxApp.sc.cache.services.serviceinterval[guxApp.sc.cache.services.serviceinterval.length - 1].km,
				'number': guxApp.sc.cache.services.serviceinterval.length + 1,
				'agetext': '> ' + guxApp.sc.cache.services.serviceinterval[guxApp.sc.cache.services.serviceinterval.length - 1].agetext
			});

			self.populateRegDate();
			self.bindXtimeMobile();

			// reset total price and options
			$('.js-totalprice', self.wrapper).empty();
			$('.options-list li', self.warpper).removeClass('option-checked');
			$('.options-list li span', self.warpper).removeClass('checked');

			// force calculate button to be disabled on page refresh
			$('button.calculate', self.wrapper).attr('disabled', true);

			$('.service-calc.service-results').removeClass('deactive').fadeIn(350, function() {$(this).addClass('active');});

			// bind number only function to 'estimated kms' input
			self.numbersOnly();

			// service links equal height
			self.serviceLinksHeight();
			
			$(window).on('resize', function() {
				self.serviceLinksHeight();
			});

			// bind smooth scroll to 'Roadside Assistance' div
			$('.view-roadside-assist a', self.wrapper).on('click', function(e) {
				e.preventDefault();
				self.scrollToElem($('.roadside-assistance'));
			});

			$('.service-calc .book-service').fadeOut(350, function() {
				self.scrollToElem($('.vehicle-registration'));		
			});

		}, function(e, extStatus) {

			// on AJAX error...
			var yearSelect = $('select#year', guxApp.sc.vehicles.wrapper);

			guxApp.sc.vehicles.wrapper.prepend('<p class="error">' + guxApp.sc.selectTexts['error.url.services'] + '</p>');

			// hide loading gif
			$('.service-calc .loading').hide();

			// reset all selects
			guxApp.sc.vehicles.resetSelects(yearSelect);
		});

	},

	serviceLinksHeight: function() {

		var self = this;

		// reset heights for prev, next and active links
		$('.service-links .columns a', self.wrapper).css('height', '');

		var prevHeight = $('.service-links .prev').outerHeight(true),
			nextHeight = $('.service-links .next').outerHeight(true),
			activeHeight = $('.service-links .active').outerHeight(true),
			maxHeight = Math.max(prevHeight, nextHeight, activeHeight);

		$('.service-links .columns a', self.wrapper).css('height', maxHeight);

	},

	bindXtimeMobile: function() {

		// event handler for SMOB Xtime link
		// add Service Booking keyword as a parameter to URL 
		this.wrapper.on('click', '.xtime-mobile-link', function() {

			var thisHref 	= $(this).attr('href'),
				separator 	= (thisHref.indexOf('?') == -1) ? '?' : '&';
				SB.keyword 	= $(this).data('sb-keyword');

			// if keyword does not exist as a parameter then attach it to the URL
			if (thisHref.indexOf('keyword') == -1) {
				$(this).attr('href', thisHref + separator + 'keyword=' + SB.keyword);
			}			
			
		});

	},

	showCalcBtn: function() {

		// enable button that calculates the recommended service
		var self = this,
			calcBtn = $('button.calculate', self.wrapper);

		calcBtn.addClass('ready').attr('disabled', false);

		calcBtn.on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			// go to calculate recommended service method based on the changes made by the user
			self.calcRecService();
		});

	},

	populateRegDate: function() {

		var self = this,
			startMonth = guxApp.sc.cache.services.startdatebreak - 1,
			currentMonth = guxApp.tools.getMonth() - 1,
			currentYear = guxApp.tools.getYear(),
			startProdYear = guxApp.sc.cache.services.year,
			vehicleYear = parseInt($('select#year option:selected', guxApp.sc.vehicles.wrapper).val(), 10);

		// populate month select
		if (startMonth === '') {

			$('#regmonth', self.wrapper).append('<option value="' + self.monthsArr[0]+ '">' + self.monthsArr[0]+ '</option>');

		} else {


			if (startProdYear === vehicleYear) {

				// populate month select with months starting from the start month break
				$.each(self.monthsArr, function(index, value) {

					if (index >= startMonth) {
						$('#regmonth', self.wrapper).append('<option value=' + value + '>' + value + '</option>');
					}

				});

			} else if (currentYear === vehicleYear) {

				// populate month select with months already gone by of the current year
				$.each(self.monthsArr, function(index, value) {

					if (index <= currentMonth) {
						$('#regmonth', self.wrapper).append('<option value=' + value + '>' + value + '</option>');
					}
					
				});

			} else {

				// populate month select with all months in array
				$.each(self.monthsArr, function(index, value) {

					$('#regmonth', self.wrapper).append('<option value=' + value + '>' + value + '</option>');

				});

			}			

		}

		// populate year select
		for (var i = (vehicleYear - 1); i < currentYear; i++) {
			$('#regyear', self.wrapper).append('<option value=' + (i + 1) + '>' + (i + 1) + '</option>');
		}

		// go to method to estimate the vehicles KM done just after user finishes selecting the vehicle
		this.initialEstimateKM();

		this.yearChangeEvent();
		this.monthsChangeEvent();

	},

	scrollToElem: function(elem) {

		$('html, body').animate({
			scrollTop: (elem.offset().top - ((guxApp.viewport.view === 'mobile') ? 65 : 75))
		},350);

	},

	numbersOnly: function() {

		var self = this;

		// method to force 'estimated KM' input to accept number input only, no other characters allowed
		// when the user focuses outside (on blur) of the input the method to add commas to a number is executed
		$('input#estimatedkm', self.wrapper).on({
			'keypress': function(e) {

				// if the character is not a digit then don't type anything
				if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
					return false;
				}				

				$(this).parent().removeClass('error-wrap');

			},

			'focus': function() {
				if (!$('button.calculate', self.wrapper).hasClass('ready')) {
					self.showCalcBtn();
				}
			},

			'blur': function() {
				this.value = guxApp.tools.numberCommas(this.value);
			}
		});			

	},

	addZero: function(num) {

		// if a number has only one zero after a decimal point this method will add an extra zero
		// i.e. from 150.0 to 150.00
		if (num % 1 !== 0) {
			
			num = parseFloat(num).toFixed(2);
			return num;
		} else {
			return num;
		}
	},

	getVehicleAge: function() {

		// calculate the age in total number of months of the current vehicle selected
		var self = this,
			selectedYear = $('select#regyear option:selected', self.wrapper).val(),
			selectedMonth = $('select#regmonth option:selected', self.wrapper).val(),
			currentMonth = self.monthsArr.indexOf(selectedMonth),
			
			remainingStartMonths = 12 - currentMonth,
			remainingEndMonths = guxApp.tools.getMonth() - 1,

			yearsWithFullMonths = (guxApp.tools.getYear() - selectedYear) - 1,
			monthsTotal = remainingStartMonths + remainingEndMonths + (yearsWithFullMonths * 12);

		return monthsTotal;

	},

	initialEstimateKM: function() {

		// estimated KM for selected vehicle and update the estimatedkm input with the result
		var self = this,
			vehicleInterval = guxApp.sc.cache.services.interval === 10000 ? 1666.67 : 1250,
			estimatedKM = Math.round(self.getVehicleAge() * vehicleInterval);

		// print result for 'estimated km' to input
		$('input#estimatedkm', self.wrapper).val(guxApp.tools.numberCommas(estimatedKM));

		// calculate recommended service
		self.calcRecService();

	},

	yearChangeEvent: function() {

		var self = this,
			firstYear = $('select#regyear option:first-child', self.wrapper).val(),
			currentMonth = guxApp.tools.getMonth() - 1,
			currentYear = guxApp.tools.getYear();

		// event handler for 'first registration to date' year select
		$('select#regyear', self.wrapper).on('change', function() {

			var selectedYear = $('select#regyear option:selected', self.wrapper).val(),
				selectedMonth = $('select#regmonth option:selected', self.wrapper).val(),
				startMonth = guxApp.sc.cache.services.startdatebreak - 1;

			// the following check is for populating the 'first registration to date' month select when the vehicle selected has a start month break
			// if not, populate the 'first registration to date' month select with all the months found in the months Array
			if (selectedYear === firstYear && startMonth >= 1) {

				$('select#regmonth option', self.wrapper).remove();

				$.each(self.monthsArr, function(index, value) {

					if (index >= startMonth) {
						$('#regmonth', self.wrapper).append('<option value=' + value + '>' + value + '</option>');
					}

				});

			} else {

				$('select#regmonth option', self.wrapper).remove();

				$.each(self.monthsArr, function(index, value) {
					$('#regmonth', self.wrapper).append('<option value=' + value + '>' + value + '</option>');
				});

				$('#regmonth option[value=' + selectedMonth + ']', self.wrapper).attr('selected', 'selected');

			}

			// the following check is for when the user selects the current year and then populates the 'first registration to date' month select accordingly
			if (currentYear === parseInt(selectedYear, 10)) {
				
				$('select#regmonth option', self.wrapper).remove();

				$.each(self.monthsArr, function(index, value) {

					if (index <= currentMonth) {
						$('#regmonth', self.wrapper).append('<option value=' + value + '>' + value + '</option>');
					}
					
				});

				$('#regmonth option[value=' + selectedMonth + ']', self.wrapper).attr('selected', 'selected');

			}

			if (!$('button.calculate', self.wrapper).hasClass('ready')) {
				self.showCalcBtn();
			}

			// reset uniformjs for month and year selects
			$('.vehicle-registration select', self.wrapper).uniform();

		});

	},

	monthsChangeEvent: function() {

		var self = this;

		// event handler for 'first registration to date' month select
		$('select#regmonth', self.wrapper).on('change', function() {

			if (!$('button.calculate', self.wrapper).hasClass('ready')) {
				self.showCalcBtn();
			}

		});

	},

	inputError: function() {

		var self = this;

		// scroll screen to 'estimated KM to date' input
		self.scrollToElem($('.estimated-km'));

		// add error class for input
		$('input#estimatedkm', self.wrapper).parent().addClass('error-wrap');

	},

	calcRecService: function() {

		var self = this,
			vehicleKM = guxApp.tools.removeCommas($('input#estimatedkm', self.wrapper).val());

		// error check for empty value
		// if value found then calculate recommended service otherwise show error
		if ($('input#estimatedkm', self.wrapper).val() === '') {

			self.inputError();

		} else {

			$('input#estimatedkm', self.wrapper).parent().removeClass('error-wrap');

			self.scrollToElem($('.vehicle-services'));

			// get step one result for service interval - KM (distance)
			// get step two result for service interval - months (age)
			var stepOneResult = self.stepOneKM(),			
				stepTwoResult = self.stepTwoMonths();

			// get recommend service and cache it (the recommended service is the highest result from step one (KM) and step two (months))
			if (stepOneResult.km >= stepTwoResult.km) {
				guxApp.sc.cache.recommended = stepOneResult;
			} else {
				guxApp.sc.cache.recommended = stepTwoResult;
			}

			// reset uniform selects
			$('select', self.wrapper).uniform();

			// unbind prev and next buttons
			$('.service-links .prev a', self.wrapper).off('click');
			$('.service-links .next a', self.wrapper).off('click');

			// cache active service as the recommended
			guxApp.sc.cache.services.activeService = guxApp.sc.cache.recommended;

			// add options for the selected vehicle to the UI
			self.appendOptions();

			// if the vehicle KM is more than 510,000 km, display the '> 510,000 km' service section
			// if vehicle is 510,000 km or under display the recommended service
			if (vehicleKM > 510000) {
				var lastInterval = guxApp.sc.cache.services.serviceinterval.length - 1;
				guxApp.sc.cache.recommended = guxApp.sc.cache.services.serviceinterval[lastInterval];

				self.populateActiveService(guxApp.sc.cache.recommended);
			} else {
				self.populateActiveService(guxApp.sc.cache.recommended);
			}

			// go to method that binds the prev/next service links
			self.bindServiceLinks();

			// display quote valid date
	        $('.valid-date', self.wrapper).html(Date.today().addDays(30).toString('dd MMMM yyyy'));
	    }

	},

	stepOneKM: function() {

		// this method calculates the recommended service in KM
		var self = this,
			vehicleKM = guxApp.tools.removeCommas($('input#estimatedkm', self.wrapper).val()),
			serviceIntervals = guxApp.sc.cache.services.serviceinterval,
			firstService = (Math.floor(vehicleKM / guxApp.sc.cache.services.interval)) - 1,
			secondService = firstService + 1,
			withinFirstService,
			withinSecondService,
			stepOneResult;

		if (firstService < 0) {
			firstService = 0;
		} else if (firstService > 33) {
			firstService = 33;
		}

		if (secondService > (serviceIntervals.length - 1)) {
			secondService = serviceIntervals.length - 1;
		}

		// calculate the recommended service in KM that is within the service tolerance of 5,000 km
		if (vehicleKM >= (serviceIntervals[firstService].km - 5000) && vehicleKM <= (serviceIntervals[firstService].km + 5000)) {
			withinFirstService = true;
		}

		if (vehicleKM >= (serviceIntervals[secondService].km - 5000) && vehicleKM <= (serviceIntervals[secondService].km + 5000)) {
			withinSecondService = true;
		}

		if (withinFirstService && withinSecondService) {
			stepOneResult = serviceIntervals[firstService];
		} else if (withinFirstService) {
			stepOneResult = serviceIntervals[firstService];
		} else if (withinSecondService) {
			stepOneResult = serviceIntervals[secondService];
		} else {
			stepOneResult = serviceIntervals[secondService];
		}

		// return result for recommended service in KM (distance)
		return stepOneResult;

	},

	stepTwoMonths: function() {
		
		// this method calculates the recommended service in months
		
		var self = this,
			vehicleAge = self.getVehicleAge(),
			serviceIntervals = guxApp.sc.cache.services.serviceinterval,
			serviceIntMonths = guxApp.sc.cache.services.interval === 10000 ? 6 : 12,
			firstService = (Math.floor(vehicleAge / serviceIntMonths)) - 1,
			secondService = firstService + 1,
			withinFirstService,
			withinSecondService,
			stepTwoResult;

		if (firstService < 0) {
			firstService = 0;
		} else if (firstService > 33) {
			firstService = 33;
		}

		if (secondService > (serviceIntervals.length - 1)) {
			secondService = serviceIntervals.length - 1;
		}

		// calculate the recommended service in months that is within the service tolerance of 6 months
		if (vehicleAge >= (serviceIntervals[firstService].months - 6) && vehicleAge <= (serviceIntervals[firstService].months + 6)) {
			withinFirstService = true;
		}

		if (vehicleAge >= (serviceIntervals[secondService].months - 6) && vehicleAge <= (serviceIntervals[secondService].months + 6)) {
			withinSecondService = true;
		}

		if (withinFirstService && withinSecondService) {
			stepTwoResult = serviceIntervals[firstService];
		} else if (withinFirstService) {
			stepTwoResult = serviceIntervals[firstService];
		} else if (withinSecondService) {
			stepTwoResult = serviceIntervals[secondService];
		} else {
			stepTwoResult = serviceIntervals[secondService];
		}

		// return result for recommended service in months (age)
		return stepTwoResult;

	},

	bindServiceLinks: function() {

		var self = this,
			prevBtn = $('.service-links .prev', self.wrapper),
			activeBtn = $('.service-links .active', self.wrapper),
			nextBtn = $('.service-links .next', self.wrapper);

			guxApp.sc.firstlink = false;

		$('a', prevBtn).on('click', function(e) {
			e.preventDefault();

			// if user clicks on empty space where prev link is then don't do anything
			// (it'll be the 'empty' one before the first service)
			if (guxApp.sc.firstlink) {
				return false;
			}
			
			guxApp.sc.lastlink = false;

			guxApp.sc.cache.services.activeService = guxApp.sc.cache.services.prevService;

			// go to method that populates the active/current service that's just been selected
			self.populateActiveService(guxApp.sc.cache.services.prevService);
		});

		// active service (the current service displayed) has no click event
		$('a', activeBtn).on('click', function(e) {
			e.preventDefault();
		});

		$('a', nextBtn).on('click', function(e) {
			e.preventDefault();

			// if user clicks on empty space where prev link is then don't do anything
			// (it'll be the 'empty' one before the first service)
			if (guxApp.sc.lastlink) {
				return false;
			}

			// cache active service as the next service
			guxApp.sc.cache.services.activeService = guxApp.sc.cache.services.nextService;

			// go to method that populates the active/current service that's just been selected
			self.populateActiveService(guxApp.sc.cache.services.nextService);
		});

	},

	populateActiveService: function(activeService) {
		
		// this method ultimately populates all the content for the active/current service selected
		var self = this,
			serviceIntervals = guxApp.sc.cache.services.serviceinterval,
			prevService = ((activeService.number - 2) >= 0) ? serviceIntervals[activeService.number - 2] : serviceIntervals[0],
			nextService = serviceIntervals[activeService.number],
			activeBtn = $('.service-links .active', self.wrapper),
			prevBtn = $('.service-links .prev', self.wrapper),
			nextBtn = $('.service-links .next', self.wrapper),
			contentWrap = $('.active-service', self.wrapper);

		guxApp.sc.cache.services.prevService = prevService;
		guxApp.sc.cache.services.nextService = nextService;

		if (activeService.number == serviceIntervals.length) {
			guxApp.sc.finalservice = true;
		} else {
			guxApp.sc.finalservice = false;
		}

		// populates the final service for the selected vehicle
		if (guxApp.sc.finalservice) {

			var finalfired = false;

			$('.service-links a .wrap', self.wrapper).fadeOut(250, function() {

				if (!finalfired) {

					guxApp.sc.lastlink = true;

					// remove all instances of the recommended class
					// it will be re-added to the correct link very soon
					$('.service-links > div', self.wrapper).removeClass('recommended');

					nextBtn.addClass('no-service');

					// populate service links
					$('.js-kms', prevBtn).text(guxApp.tools.numberCommas(prevService.km));
					$('.js-years', prevBtn).text(prevService.agetext);

					$('.js-kms', activeBtn).text(guxApp.tools.numberCommas(activeService.km));
					$('.js-years', activeBtn).text(activeService.agetext);

					// add recommended class to the previous link
					if (guxApp.sc.cache.services.prevService.km === guxApp.sc.cache.recommended.km) {
						prevBtn.addClass('recommended');
					}

					// add recommended class to the active link
					if (activeService.km === guxApp.sc.cache.recommended.km) {
						activeBtn.addClass('recommended');
					}

					finalfired = true;

				}

			});

			$('.active-service', self.wrapper).fadeOut(250, function() {

				// force 'roadside assist' to be hidden
				$('.roadside-assistance', self.wrapper).hide();

				$('.last-service', self.wrapper).fadeIn(350);

				$('.service-links a .wrap', self.wrapper).fadeIn(350);

			});

		} else {

			var fired = false;

			$('.service-links a .wrap', self.wrapper).fadeOut(250, function() {

				if (!fired) {

					// remove all instances of the recommended class
					// it will be re-added to the correct link very soon
					$('.service-links > div', self.wrapper).removeClass('recommended');

					guxApp.sc.lastlink = false;
					nextBtn.removeClass('no-service');

					// populate service links
					if (activeService.number < 2) {
						prevBtn.addClass('no-service');
						guxApp.sc.firstlink = true;
					} else {
						prevBtn.removeClass('no-service');
						guxApp.sc.firstlink = false;

						$('.js-kms', prevBtn).text(guxApp.tools.numberCommas(prevService.km));
						$('.js-years', prevBtn).text(prevService.agetext);
					}

					$('.js-kms', activeBtn).text(guxApp.tools.numberCommas(activeService.km));
					$('.js-years', activeBtn).text(activeService.agetext);

					$('.js-kms', nextBtn).text(guxApp.tools.numberCommas(nextService.km));
					$('.js-years', nextBtn).text(nextService.agetext);

					// add recommended class to the previous link
					if (guxApp.sc.cache.services.prevService.km === guxApp.sc.cache.recommended.km) {
						prevBtn.addClass('recommended');
					}

					// add recommended class to the active link
					if (activeService.km === guxApp.sc.cache.recommended.km) {
						activeBtn.addClass('recommended');
					}

					// add recommended class to the next link
					if (typeof guxApp.sc.cache.services.nextService != 'undefined' && guxApp.sc.cache.services.nextService.km === guxApp.sc.cache.recommended.km) {
						nextBtn.addClass('recommended');
					}

					// this boolean is to stop multiple callbacks/execution of the above code
					fired = true;

				}

			}).fadeIn(350);

			$('.last-service', self.wrapper).fadeOut(250);

			// fade out the active/current service, populate the content and then fade it all back in
			$('.active-service', self.wrapper).fadeOut(250, function() {

				// populate active/current service content
				$('.js-kms', contentWrap).text(guxApp.tools.numberCommas(activeService.km));
				$('.js-years', contentWrap).text(activeService.agetext);
				$('.js-baseprice', contentWrap).text(guxApp.tools.numberCommas(self.addZero(activeService.price)));

				// methods for that apply to the active service
				// see each method for more detail
				self.roadsideAssistToggle(activeService);
				self.optionsCheckboxEvent();
				self.calcTotalPrice();
				self.buildURLforPDF();

				$('.active-service', self.wrapper).fadeIn(350);

			}).fadeIn(350);

		}

	},

	appendOptions: function() {

		// render additional options with underscore templating
		var self = this,
			optionsData = guxApp.sc.cache.services.additionaloptions,
			optionsView = $('#options-template', self.wrapper).html(),
			updatedData = optionsData;

		// loop through each price and add commas
		$.each(optionsData, function(index, value) {
			var priceStr = guxApp.tools.numberCommas(optionsData[index].price);
			updatedData[index].price = priceStr;
		});
		
		// if there are no additional options hide the options DIV
		// otherwise display the additional options through the underscore template
		if (typeof optionsData !== 'object' || optionsData.length === 0) {
			$('.options-wrap', self.wrapper).hide();
		} else {
			$('.options-wrap', self.wrapper).show();
			$('.options-list', self.wrapper).html(_.template(optionsView, {options:updatedData}));
		}

		// reset uniform inputs
		$('input', self.wrapper).uniform();

	},

	roadsideAssistToggle: function(activeService) {

		var self = this,
			roadsideAssistEl = $('.roadside-assistance', self.wrapper),
			roadsideServicesNum = roadsideAssistEl.data('services-shown');

		// simple toggle to show roadside assistance link if the service active is within the service number limit
		if (activeService.number > roadsideServicesNum) {
			$('.view-roadside-assist', self.wrapper).add(roadsideAssistEl).hide();
		} else {
			$('.view-roadside-assist', self.wrapper).add(roadsideAssistEl).show();
		}

	},

	optionsCheckboxEvent: function() {

		var self = this;

		$('.js-totalprice', self.wrapper).text(guxApp.tools.numberCommas(guxApp.sc.cache.services.activeService.price));

		// update total price when additional options are selected
		$('.options-list input', self.wrapper).on('click', function() {

			self.calcTotalPrice();
			self.buildURLforPDF();

			// add class for parent so option price can be styled when checked
			if ($(this).parent().hasClass('checked')) {
				$(this).parents('li').addClass('option-checked');
			} else {
				$(this).parents('li').removeClass('option-checked');
			}

		});		

	},

	calcTotalPrice: function() {

		var self = this,
			boxes = $('.options-list li .checked'),
			optionPrices = [],
			optionsTotal = 0,
			total;

		// loop through each option and add price to 'optionPrices' array with removed commas
		boxes.each(function() {
			var price = $(this).parents('li').find('.js-price').text(),
				cleanPrice = guxApp.tools.removeCommas(price);

			optionPrices.push(parseFloat(cleanPrice));
		});

		// loop through additional option price array and add the price to the running total
		$.each(optionPrices, function() {
		    optionsTotal += this;
		});

		// add selected additional total to standard base price
		total = optionsTotal + guxApp.sc.cache.services.activeService.price;

		// inject total service price into HTML with added commas
		$('.js-totalprice', self.wrapper).text(guxApp.tools.numberCommas(self.addZero(total)));

	},

	buildURLforPDF: function() {

		var self = this,
			vehicleID = guxApp.sc.cache.services.id,
			intervalID = guxApp.sc.cache.services.activeService.id,
			selOptionsStr,
			otherOptionsStr,
			allOptions = $('.options-list', self.wrapper).find('li'),
			url = guxApp.sc.urlPdf,
			validDateStr = Date.today().addDays(30).toString('ddMMyyyy');

		// loop through the options of the active service and build two strings
		// one string for the selected options (selOptionsStr)
		// another string for the non-selected options (otherOptionsStr)
		$.each(allOptions, function(index, value) {

			if (allOptions[index].firstChild.firstChild.className === 'checked') {

				if (typeof selOptionsStr !== 'undefined') {
					selOptionsStr = selOptionsStr + '!' + allOptions[index].firstChild.id.replace('uniform-option', '');
				} else {
					selOptionsStr = allOptions[index].firstChild.id.replace('uniform-option', '');
				}

			} else {

				if (typeof otherOptionsStr !== 'undefined') {
					otherOptionsStr = otherOptionsStr + '!' + allOptions[index].firstChild.id.replace('uniform-option', '');
				} else {
					otherOptionsStr = allOptions[index].firstChild.id.replace('uniform-option', '');
				}

			}

		});

		// if no options are selected create an empty string
		if (typeof selOptionsStr == 'undefined') {
			selOptionsStr = '';
		}

		// if there are no options not selected, create an empty string
		if (typeof otherOptionsStr == 'undefined') {
			otherOptionsStr = '';
		}

		// create a URL for the PDF based on the options selected and not selected for the current vehicle and service
		url = url.replace('{vehicleid}', vehicleID).replace('{intervalid}', intervalID).replace('{selectedoptions}', selOptionsStr).replace('{otheroptions}', otherOptionsStr).replace('{currentdate}', validDateStr);

		// encode url
		var encodedURL = encodeURI(url);

		if ($('form[name=pdfForm]', self.wrapper)[0]) {
			$('form[name=pdfForm]', self.wrapper).attr('action', encodedURL);
		} else {
			$('.button.print-pdf', self.wrapper).wrap('<form action="' + encodedURL + '" method="post" name="pdfForm"></form>');
		}

		$('.button.print-pdf', self.wrapper).off('click').on('click', function(e) {
			e.preventDefault();

			if (guxApp.viewport.view === 'tablet') {
				$('form[name=pdfForm]', self.wrapper).attr('target', '_blank');
			}
			// submit form which directs user to the PDF
			document.forms.pdfForm.submit();
		});

	}

};

$(function() {

	// run service calculator init function if "service-calc" class found on page load
	if ($('.service-calc')[0]) {
		guxApp.sc.vehicles.init();
	}

});

})(jQuery);
