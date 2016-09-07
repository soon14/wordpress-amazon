/*
 * functionalities of dealerlocator
 * author : Ray
 * dependencies: jquery, underscorejs, uniformjs, googleMapController, lib/googleMaps, tinypubsub, cookie, jquery-cookie
 
 * History
 * 2015/12/11, Steven Xue, SMW - INC000015398018 - REQ #6689341 - Dragonfly Front end issue about dealer telephone number not display the sam, Line 706, remove .replace(/\s/g, '')
 */
var guxApp = guxApp || {};

(function($) {

	guxApp.dealerLocator = {
		
		init : function() {

			// check if component exists
			var dealerLocator = $('.dealer-locator');
			if (!dealerLocator.length || $('.dealer-unaware',dealerLocator).hasClass('search-panel')) return;

			// container
			var dealerLocatorContainer = $('.dealer-locator'),
				self = this;

			self.colorLengend = self.colorLengend || $();
			

			// utility apps
			var cookie = guxApp.cookie,
				locatorConfig = $("#locator-config").embeddedData();
			
			self.mapController = guxApp.googleMapController;
			/* if(guxApp.tools.isBingMap()){
				self.mapController = guxApp.bingMapController;
			}
			else  */if(guxApp.tools.isAutoNaviMap()) {
				self.mapController = guxApp.autonaviMapController;
			}
			
			// data holders
			self.filters = [];
			self.container = dealerLocatorContainer;
			self.mapContainer = $('.dealer-map-field', self.container);
			self.dealerResultHolder = $('.dealer-list', dealerLocatorContainer);
			self.config = self.mapController.config;
			self.is_mobile = guxApp.viewport.view == "mobile";
			self.is_autoDetection = false;
			self.is_selectLocation = false;
			self.hideDistanceByLocation = !!self.config.hideDistanceByLocation;
			self.errorContainer = $(".error", self.container);
			
			//will not show the landing img if it visited by SEO url directly
			if(self.config.dealerId.length==0){$('.dealer-map-landing').removeClass('hide');}
			
			$('.btn-search', dealerLocatorContainer).on('click', function(e) {
				if ($(this).is('.trackable') && !e.originalEvent) return false;
			});

			// filter button
			$('.filter-toggler', dealerLocatorContainer).on('click', function(e) {
				e.preventDefault();
				//$('.result-list').toggle();
				var	filterBar = $(this).closest(".dealer-filter-bar"),
					resultLists = filterBar.siblings(".result-list");
				if(filterBar.hasClass("active")){//hiding now
					if(self._LastHasCls){
						filterBar.siblings(".result-list.selected").show();
					}else{
						filterBar.siblings(".result-list.selected").siblings(".result-list").show();
					}
				}else{
					self._LastHasCls = filterBar.siblings(".result-list:visible").hasClass("selected")?true:false;
					resultLists.hide();
				}
				
				//gux omniture
				if($(".dealer-filter-bar").hasClass('active')){
					$(this).removeClass('trackable');
				}

				var view_saved_cta = $('.viewSaved', dealerLocatorContainer);
				if (self.getSavedDealer()) {
					view_saved_cta.show();
				} else {
					view_saved_cta.hide();
				}

				// popove launcher
				$('.view-details', dealerLocatorContainer).on('click', self.togglePopInfo);
				
				$(".dealer-filter-bar").toggleClass('active');

			});

			// filter group accordion
			$('.filter-accordion', dealerLocatorContainer).find('.control').on('click', self.toggleAccordion);
			
			// distance dropdown trigger
			$('.filter-distance', dealerLocatorContainer).find('dt a').on('click', self.showOptions);

			// // popove launcher

			// close popover
			$('.group-list', dealerLocatorContainer).on('click', '.close-info', self.closePopInfo);
					

			// remove selected filter
			$('.filter-clear', dealerLocatorContainer).on('click', function(e) {
				var groupList = $('.group-list', dealerLocatorContainer);
				groupList.find('input:checked').removeAttr('checked');
				groupList.find('span[class="checked"]').removeClass('checked');
			});

			$('.input-panel input[type=text]', dealerLocatorContainer).on('focus', function() {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();

				if ($(elem).attr('placeholder')) {
					$(elem).data('placeholder', placeholder);
					$(elem).removeAttr('placeholder');
				}

			});

			$('.input-panel input[type=text]', dealerLocatorContainer).on('blur', function(e) {
				var elem = this,
					placeholder = $(elem).attr('placeholder'),
					value = $(elem).val();

				if (!value) {
					$(elem).attr('placeholder', $(elem).data('placeholder'));
				}

			});

			$('.dealer-filter-bar', dealerLocatorContainer).on('submit', '.filter-accordion', function(e) {
				e.preventDefault();

				var form_data = $(this).serialize(),
					dealers = self.dealers || [],
					filters = {};
				
				self.filters = [];
				self.is_autoDetection = false;
				
				self.closeTabs();

				if (!!form_data) {
					
					form_data = form_data.split("&");

					$.each(form_data, function(i, filter) {
						var filter_obj = filter.split('=');

						self.filters.push(filter_obj[0]);

						filters[filter_obj[0]] = true;

					});

					dealers = _.where(self.dealers, filters);

					if (!dealers.length) {

						self.loadedDealers = [];
						self.mapController.cleanMap();

						$('.dealer-result-container .count .num').text("");
						$('.dealer-result-container .count .msg').text("");
						$('.result-list ul').empty()
							.append($('<li class="error" />').text(self.config.error_message.filtered_dealer_not_found));
						$('.result-list').not('.selected').find('.dealer-view-more').hide();
						return;
					}
					
					
				}
				
				self.loadedDealers = [];

				self.mapController.cleanMap();

				self.processResults(dealers, '', true);

				return false;

			});

			// show saved dealer on list
			$('.viewSaved', dealerLocatorContainer).on('click', function(e) {
				e.preventDefault();
				self.closeTabs();
				self.showSavedDealer();
			});

			$('.show-list', dealerLocatorContainer).on('click', function() {
				self.closeTabs();
			});

			$('.dealer-result-container', dealerLocatorContainer).on('click', '.view-all-dealers', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var dealerTrans = $("#dealer-translations").embeddedData(); 
				var pathRootUrl = dealerTrans.pathRootUrl;
				if (window.history.pushState && !self.is_mobile) {
					var domain = location.href,
						has_query_string = _.contains(domain, '?'),
						has_dealer_param = /(\?|\&)+(dealer)+\=/.test(domain);

					if (has_dealer_param) {
						domain = domain.split(/(\?|\&)+(dealer)+\=/)[0];
					}else {
						//if usePathUrl  
						if (dealerTrans.usePathUrl && dealerTrans.usePathUrl == "true"){
							var newURI = domain;
							var parts = domain.split('/'); 
							var toRemove = parts[parts.length-3];
							if ($(".dealer-result-container").hasClass("detailed")) {
								domain = domain.split(toRemove)[0];
							}
						}
					}
					window.history.pushState("", "", domain);
				}

				$(this).parents('.dealer-result-container').removeClass('detailed');
				$(this).parents('.dealer-result-container').find(".filter-toggler").addClass('trackable');

				if ($('.dealer-filter-bar').is('.active')) $('.filter-toggler', self.container).triggerHandler('click');
				$('.result-list', dealerLocatorContainer).show().siblings('.selected').hide();

			});

			// get user location via current location
			$('.dealer-unaware .btn-current', dealerLocatorContainer).on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				self.getDealersFromCurrentLocation();
				self.is_selectLocation = false;
			});

			$('.search-panel', dealerLocatorContainer).on('submit', function(e) {
				e.preventDefault();
				self.getDealersByKeyword($('.input-panel input[type=text]').val(), false);
				return false;
			});

			// search dealer
			$('.input-panel input[type=text]', dealerLocatorContainer).on('keyup', self.autoCompleteTrigger);			
			var self = this;
			/*$.urlParam = function(name){
			    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			    if (results==null){
			       return null;
			    }
			    else{
			       return results[1] || 0;
			    }
			};
			var specialitiesID = !!$.urlParam('specialities')?decodeURI($.urlParam('specialities')):'';*/
			if (sessionStorage['dealers']) {
			    self.processResults(JSON.parse(sessionStorage['dealers']), sessionStorage['error_message']);


				if (sessionStorage['search_keyword']) {
					$('.input-panel input[type=text]', self.container).val(sessionStorage['search_keyword']).blur();
				}

				sessionStorage.removeItem('dealers');
				sessionStorage.removeItem('search_keyword');
				sessionStorage.removeItem('error_message');

			} else {
				//SEO dealer Search 1st
				if(locatorConfig.dealerId.length!=0){
					//var waitMap = setInterval(function() {
						//if(guxApp.googleMapController.map){//issue
							//clearInterval(waitMap);
							self.mapController.searchDealersByProperties({DealerID: locatorConfig.dealerId}, {}, function(dealers) {
								if (dealers.length) {
									self.processResults(dealers, null, null, true);
									
									$('.result-list.selected').show().siblings('.result-list').hide();
									$('.dealer-result-container').addClass('detailed').find(".filter-toggler").removeClass('trackable');
									self.showDealerCard($('.dealer-result-container li.dealer-result'), true);
									if (guxApp.tools.isAutoNaviMap()) self.mapController.map.panTo(dealers[0].location);									
								}
							});
						//}
					//},1000);
				}
				/*else if(guxApp.tools.isAutoNaviMap()&&specialitiesID.length!=0){
							self.mapController.searchDealersByProperties({}, {DealerNewVehicle:specialitiesID}, function(dealers) {
								if (dealers.length) {
									self.processResults(dealers);								
								}
							});
				}*/else{// location aware 2nd
					guxApp.locationAware.locationDetection(function(addressInfo,isAutoDetection){
						if(addressInfo){
	
							self.mapController.searchDealersByLocation(addressInfo, $('.input-panel input[type=text]', dealerLocatorContainer),{},{}, function(results, response) {
	
								// location not found
								if (!results) {
									// self.showError( (response)?response:self.config.error_message.location_not_found);
									return false;
								}
	
								self.is_autoDetection = isAutoDetection;
	
								self.processResults(results);
	
							},"",isAutoDetection);
							
						}
					});
				}
			}
		},
		showNotification: function(e) {
			
			var self = guxApp.dealerLocator,
				notification = $('.save-dealer', self.container);

			notification.stop().slideDown();

			setTimeout(function() {
				notification.stop().slideUp();
			}, 5000);

		},
		hideNotification: function(e) {
			var self = guxApp.dealerLocator,
				notification = $('.save-dealer', self.container);

			notification.stop().slideUp();
		},
		toggleAccordion: function(e) {
			e.preventDefault();
			
			if ($(this).is('.trackable') && !e.originalEvent) return false;

			var control = $(this);
			control.parent().toggleClass('active')
				.siblings().removeClass('active');

			//gux omniture
			$(":first-child", control).toggleClass('trackable');

		},

		showOptions: function(e) {
			e.preventDefault();
			$(this).parents('.values').toggleClass('active').siblings().removeClass('active');

		},

		togglePopInfo: function(e) {
			e.preventDefault();

			var btn = $(this),
				popover = btn.siblings('.popover');

			if (!btn.is('.active')) {
				$('.popover').hide();
				$('.view-details').removeClass('active');
			}

			btn.toggleClass('active');
			popover.toggle();
			
			// TODO position of popover

		},

		closePopInfo: function(e) {
			e.preventDefault();

			guxApp.dealerLocator.togglePopInfo(e);

		},

		getDealerServices: function(obj) {

			var services = $('#services-config').embeddedData(),
				fetched_services = [];

			$.each(services, function(service, info) {
				if (obj[service]) fetched_services.push(info);
			});
			
			//sort service list (service in detail tab) in order
			fetched_services.sort(function(a,b){
				return parseInt(a.order) - parseInt(b.order);
			});

			return (fetched_services.length)?fetched_services:false;
		},

		


		showSavedDealer: function() {

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				dealers = [];

			var dc = self.getSavedDealer();

			self.loadedDealers = [];
			self.mapController.cleanMap();

			if (_.contains(_.pluck(self.dealers, "DealerID"), dc)) {
				self.processResults(self.dealers,null, null, null,true);
			} else {
				self.mapController.searchDealersByProperties({DealerID: dc}, {}, function(dealers) {
					self.processResults(_.union(dealers,self.dealers),null, null, null,true);
				});
			}

			// self.closeTabs();

		},

		removeSavedDealer: function() {

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				dealers = [];

			var dc = self.getSavedDealer();

			self.loadedDealers = [];
			self.mapController.cleanMap();
			if (_.contains(_.pluck(self.dealers, "DealerID"), dc)) {
				self.dealers.splice(_.indexOf(self.dealer, dc), 1);
			}

			self.processResults(self.dealers,null, null, null,true);

			// self.closeTabs();
		},

		is_loggedin: function() {
			return guxPersonalisation.psn.profile.authState === "OW";
		},

		getSavedDealer: function() {

			var self = this,
				dc;

			if (self.is_loggedin()) {
				dc = guxApp.cookie.get('dfy.dl') || JSON.parse(sessionStorage['dfy.p']).dc;
			} else {
				dc = guxApp.cookie.get('dfy.dl');
			}

			return dc;
		},
		
		is_savedDealer: function(dealer) {
			return (dealer.DealerID == this.getSavedDealer());
		},
		showDealerCard: function(container, is_dealer) {	
			
			var self = this,
				dealer = $(container).data(),
				services = guxApp.dealerLocator.getDealerServices(dealer),
				personalisation = guxPersonalisation.psn,
				cookie = guxApp.cookie,
				is_favdealer = false,
				is_dealer = is_dealer || false;

			$.extend(dealer, {
				services: services
			});

			if (window.history.pushState && !self.is_mobile && !is_dealer) window.history.pushState(dealer, dealer.DealerName, dealer.dealershipURL);
			// if ($.bbq.pushState && !self.is_mobile && !is_dealer) 	$.bbq.pushState({dealer:decodeURIComponent(dealer.dealershipURL.split('?')[1]||'')});

			// show card template
			$('.result-list.selected .dealer-result').html(_.template($('#dealer-detail').html(), dealer)).data(dealer);
			if (self.is_selectLocation && self.hideDistanceByLocation) {
			    $('.distance', $('.result-list.selected .dealer-result')).hide();
			}
			
			// bind uniform event to customize select elements - uniform.js
			$.publish('uniform', {
				el: $('.select-dept', self.container),
				el_type: "select"
			});

			// check if the saved dealer
			if (self.is_savedDealer(dealer)) {
				$('.save-dealer-btn', $(".result-list.selected")).addClass('saved');
				is_favdealer = true;
			}

			$('.save-dealer-btn em', self.container).html( (is_favdealer)?self.config.translation.saved:self.config.translation.save);
			if(guxApp.tools.isAutoNaviMap()) $('.dealer-locator .dealer-result-container .result-list.selected .dealer-result .dealer-num').addClass(dealer['DealerAffiliation']);
			$('.dealer-accordion').find('.control').on('click', self.toggleAccordion);


			$('.save-dealer-btn').on('click', function(e) {

				e.preventDefault();
				//for omniture
				var omName = $(this).attr('data-name');
				var omType = $(this).attr('data-type');
				var freq = $(this).attr('data-freq');
				var omOnClick = "dealer info:save";
				//end for omniture
				var save_btn = this,
					view_all_btn = $('.view-all-dealers', self.container);

				var queued_event = function(e) {
					if (!$('.input-panel', self.container).is('.active')) view_all_btn.data('dealerEvent')();
					view_all_btn.unbind('click', queued_event);
				}

				view_all_btn.on('click', queued_event);

				// init personalisation
				personalisation_data = JSON.parse(sessionStorage['dfy.p']);

				// change state
				if ($(this).is('.saved')) {

					$(this).removeClass('saved');
					omOnClick = "dealer info:unsave";
					// remove dealer
					$.publish('/analytics/event/', {
						"type": "fav-dealer",
						"code": ""
					});

					// remove from cookie
					personalisation_data.dc = "";

					personalisation.profile = personalisation_data;
					sessionStorage['dfy.p'] = JSON.stringify(personalisation_data);

					if (cookie.hasItem('dfy.dl')) cookie.del('dfy.dl');

					$('.dealer-result.preferred').removeClass('preferred');

					$('em', save_btn).html(self.config.translation.save);
					self.hideNotification();

					view_all_btn.data('dealerEvent', self.removeSavedDealer);
					
					$.publish('/analytics/link/', { 
	        			title: omName,
	        			link: this,
	        			type: omType,
	        			onclicks: omOnClick,
	        			freq:freq
	        			
	        		});	
					return false;

				}

				// show notification
				self.showNotification();
				
				$.publish('/analytics/event/', {
					"type": "fav-dealer",
					"code": dealer.DealerID
				});

				if (self.is_loggedin()) {

					// halt to warn for overwrite
					personalisation_data.dc = dealer.DealerID;
					personalisation.profile = personalisation_data;
					sessionStorage['dfy.p'] = JSON.stringify(personalisation_data);
				}
				
				cookie.set('dfy.dl', dealer.DealerID, Infinity);
				$(save_btn).addClass('saved');
				$('em', save_btn).html(self.config.translation.saved);
				view_all_btn.data('dealerEvent', self.showSavedDealer);
				$.publish('/analytics/link/', { 
        			title: omName,
        			link: this,
        			type: omType,
        			onclicks: omOnClick,
        			freq:freq
        		});		
				
			});


			$('.save-dealer .view-details').on('click', function(e) {
				e.preventDefault();
				$(this).parent().find('.popover').toggle();
			});

			// change hours for specified dept
			$('.select-dept', self.container).on('change', function(e) {
				var key = $(this).val(),
					schedList = $(this).closest(".dropdown").siblings(".hours-wrap").children(".sched");
				
				schedList.each(function(){
					if($(this).hasClass(key)){
						$(this).show();
					}else{
						$(this).hide();
					}
				});
			});
			$('.result-list.selected', self.container).show().siblings('.result-list').hide();
			$('.dealer-result-container', self.container).addClass('detailed');
			$(".filter-toggler", self.container).removeClass('trackable');

		},

		scrollToDealer: function(i, marker, isIcon, isPin) {

			var self = this,
				index = i-1,
				container = $('.result-list').not('.selected'),
				dealer = $('li', container).eq(index),
				map = self.mapController.map,
				pos = {};

			// pan to
			if (guxApp.tools.isAutoNaviMap()) {
				map.panTo(marker.marker.getPosition());
			}
			else {
				map.panTo(marker.getPosition());
			}
			if (dealer.is('.active')) return;

			if(self.is_mobile){
				if(isIcon){
					$("html,body").animate({
						scrollTop: $('.dealer-locator .dealer-unaware').offset().top
					});
				}
				if(isPin&&!$('.dealer-result-container .result-list:visible').hasClass('selected')){
					$("html,body").animate({
						scrollTop: dealer.offset().top - parseInt(dealer.css("margin-top"))
					});
				}
			} else {
				$('.result-list').not('.selected').animate({
					scrollTop: dealer.position().top
				});
			}
			if (map.markers.length) {
				map.deselectMarkers();
			}

			if(!guxApp.tools.isAutoNaviMap()) marker.select(3000);
			if (!self.is_mobile) marker.showInfoWindow();
			
			if(!guxApp.tools.isAutoNaviMap()) dealer.addClass('active').siblings().removeClass('active');

			window.setTimeout(function () {
			    $('.alt-theme .info-window .dealer-name').off('click').on('click', function (e) {
			        e.preventDefault();
			        self.showDealerCard(dealer);
			    });
			}, 500);
			

		},
		addDealerToList: function(dealer, container, index, self, map, mapController, is_preferred) {
			
			//this code is easy for tester to use mocked api data to test
			/*if($("#mocked-api").length == 1){
				var mockedData = $("#mocked-api").embeddedData();
				for(var i in mockedData){
					if(dealer.hasOwnProperty(i)){
						dealer[i] = mockedData[i]
					}
				}
			}*/
			
			dealer['hours'] = mapController.getDeptSchedule(dealer);
			
			$.extend(dealer, {
				address: mapController.makeDealerAddress(dealer, self.config.addressFormat),
				dealershipURL: mapController.makeDealerURL(dealer),
				index: index,
				is_preferred: self.is_savedDealer(dealer),
				is_mobile: self.is_mobile,
				is_open: mapController.is_dealerOpen(dealer, self.day),//false
				closeTime: mapController.getCloseTime(dealer, self.day),//undefinded
				govtTaxIDName: self.config.govtTaxIdName,
				mapURL: mapController.makeMapURL(dealer.location, mapController.currentLocationCoords)
			});
			
			dealer['day_str'] = [];
			dealer['day_str_translated'] = [];
			for (var i in self.config.translation.day_str) {
				dealer['day_str'].push(i);
				dealer['day_str_translated'].push(self.config.translation.day_str[i])
			}
			
			dealer['nextOpenTime'] = mapController.getNextOpenTime(dealer);//""
			var schedule = mapController.scheduleString(dealer, dealer.hours, self.day);//"Closed"
			dealer['schedule'] = schedule.description;
			dealer['scheduleType'] = schedule.type;
			dealer['vehicleOffer'] = self.getVehiOffer(dealer);
			dealer['phoneNumbers'] = (dealer['PrimaryPhone'] && dealer['PrimaryPhone'].length) ? dealer['PrimaryPhone'].split(/[;,]/g) : [];
			dealer['DealerAffiliation'] = dealer['DealerAffiliation'] || '';
			dealer['entityText'] = getDealerEntityTextByCategory(dealer['DealerAffiliation']);
			dealer['dealerNewVehicle'] = (dealer['DealerNewVehicle'] && dealer['DealerNewVehicle'].length) ? dealer['DealerNewVehicle'].replace(/\s/g, '').split(/[;,]/g) : [];

			function getDealerEntityTextByCategory(category) {
			    var text = '';
			    if (category) {
			        if ($('.color-lengend .' + category).length) {
			            text = $('.color-lengend .' + category).parent().text();
			        }
			    }
			    return text;
			}

			// checking if url is properly formatted
			if (guxApp.tools.isAutoNaviMap()) {
				if ((dealer.dealershipURL != "") && (dealer.dealershipURL.indexOf("http://") != 0)) {
					dealer.dealershipURL = "http://" + dealer.dealershipURL;
				}
			}
			else {
				if ((dealer.PrimaryURL != "") && (dealer.PrimaryURL.indexOf("http://") != 0)) {
					dealer.PrimaryURL = "http://" + dealer.PrimaryURL;
				}
			}
			

			var dealerElem = $(_.template($('#dealer-results').html(), dealer)),
				markerImages = {};
			if(self.config.markerImages && self.config.markerImagesAttribute){
				markerImages = self.config.markerImages[dealer[self.config.markerImagesAttribute]];
			}
			// add marker to map
			var marker = map.addGuxMarker(dealer.location, dealer.index, _.template($('#infobox-template').html(), dealer).toString(), function(dealer) {
				return function() {	
				    self.scrollToDealer(index, marker, false, true);
				}
			}(dealer),markerImages);

			$(container).append(dealerElem);
			if (self.is_selectLocation && self.hideDistanceByLocation) {
			    $('.distance', dealerElem).hide();
			}

			// embed data to element
			dealerElem.data(dealer);

			// scroll to dealer
			$('.dealer-icon .dealer-num', dealerElem).on('click', function() {
				if ($(dealerElem).is('.active')) return;
				self.scrollToDealer(index, marker,$(this).hasClass('dealer-num')?true:false);
			});
			
			// show detailed
			$('.details, .dealer-heading a', dealerElem).on('click', function(e) {
				e.preventDefault();
				self.scrollToDealer(index, marker);
				self.showDealerCard(dealerElem);
			});

			//init select 1st dealer by default
			if (is_preferred) {
				var _event = 'idle';
				/* if(guxApp.tools.isBingMap()){
					_event = 'viewchangeend';
				} */
				if(guxApp.tools.isAutoNaviMap()){
					_event = 'moveend';
				} 
				var handler = map.addListener(map.map, _event, function() {
					// geolocation.getCurrentPosition();
					// geolocation.watchPosition();
					self.scrollToDealer(index, marker);
					map.removeListener(handler);
				});

				$('.save-dealer-btn.saved em', dealerElem).text(self.config.translation.saved);
			}			

		},
		loadDealers: function(dealers) {

			var self = this,
				map = self.mapController.map,
				dealer_list = $('.result-list').find("> ul"),
				loadedDealers = self.loadedDealers || [],
				loadedDealersCount = loadedDealers.length,
				cached_dealers = dealers.slice(loadedDealersCount,loadedDealersCount+5),
				origin = {
					lat: self.mapController.currentLat,
					lng: self.mapController.currentLong
				};

			loadedDealers = _.union(loadedDealers, cached_dealers);
			self.loadedDealers = loadedDealers;

			// map.displayDealers(dealers);
			$.each(cached_dealers, function(i, dealer) {
				
				var index = i+loadedDealersCount+1;
				self.addDealerToList(dealer, dealer_list, index, self, map, self.mapController, index==1);

			});

			// add to view
			$('.dealer-result-container').show();
			if (guxApp.tools.isAutoNaviMap()) {
				var dealerBonds = [];
				$.each(loadedDealers,function(i,value){dealerBonds[i]=value._location});
				map.setBounds(dealerBonds,1);
			}
			else {
				map.setBounds(loadedDealers, 1);
			}
			if(_.size(dealers) < 5){
				map.setZoom(10);
			}

			if (dealers.length > loadedDealers.length) {
				$('.result-list').not('.selected').find('.dealer-view-more').show();
			} else {
				$('.result-list').not('.selected').find('.dealer-view-more').hide();
			}
		},

		autoCompleteTrigger: function(e) {

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				searchKey = $(this).val(),
				strlen = searchKey.length,
				search_panel = $('.search-panel'),
				location_limit = self.config.auto_suggest_limit,
				user_intent_delay = null,
				key = !e.charCode ? e.which : e.charCode;

			var keys_regex = new RegExp("^[a-zA-Z0-9]+$");
		    var str = String.fromCharCode(key).valueOf();

		    // prevent trigger if ctrl/alt key is pressed
		    if (e.altKey || e.ctrlKey || key == 17 || key == 18) return false;


		    if (user_intent_delay) {
		    	clearTimeout(user_intent_delay);
		    	user_intent_delay = null;
		    }


		    // arrow keys
		    if (key == 38 || key == 40) {

		    	switch(key) {
		    		case 38:
		    			var direction = true;
		    			break;
		    		case 40:
		    			var direction = false;
		    			break;
		    	}

		    	if ($('.dealer-disambiguation', self.container).is(':visible')) self.selectSuggestion(this, direction);

		    	return;
		    } 

			// enable predictive search
			if (!!searchKey && (/[A-Z]{2,}/.test(searchKey) || strlen >= self.config.autocomplete_char_count)) {
				// keys_regex.test(str) &&	

				user_intent_delay = setTimeout(function() {

		    		if ($('.input-panel', self.container).is('.active')) return false;

					guxApp.googleMapController.map.autocomplete(searchKey, location_limit, function(results) {//issue

						var locations = results.locations,
							dealers = _.pluck(results.dealers, "DealerName");

						if (locations.length || dealers.length) {
							guxApp.dealerLocator.showSuggestions(_.union(dealers, locations), search_panel);
						}

					});

				}, 300);

			}
		},

		selectSuggestion: function(field, up) {

			var suggestion_holder = $('.search-panel .dealer-disambiguation'),
				current_selected = $('li.active', suggestion_holder),
				next = (current_selected.next().length)?current_selected.next():$('li', suggestion_holder).eq(0),
				prev = (current_selected.prev().length)?current_selected.prev():$('li', suggestion_holder).eq($('li', suggestion_holder).length-1);

			current_selected = next;

			if (up) {
				current_selected = prev
			}
			
			current_selected.addClass('active').siblings().removeClass('active');
			$(field).val($('a', current_selected).text());

		},

		showSuggestions: function(suggestions, container) {

			$('.search-panel .error').hide();
			$('.dealer-result-container').hide();

			if (suggestions.length) {

				$('.dealer-disambiguation', container).show();
				$(".dealer-disambiguation ul", container).html(_.template($("#dealer-disambiguation").html(), {suggestions:suggestions}));
				$('.dealer-disambiguation a', $(container)).on("click", function(e) {
					
					e.preventDefault();

					$(".input-panel input[type=text]", container).val($(this).text());
					$('.dealer-disambiguation', container).hide();
					$(container).trigger('submit');

				});
			} else {
				$('.dealer-disambiguation', container).hide();
			}
		},

		getDealersByKeyword: function(keyword, matchParams) {

			var self = this,
				map = self.mapController.map,
				errmessage = self.config.error_message.dealer_not_found,
				matchParams = matchParams || {},
				containsParams = {},
				origin = {
					lat: self.mapController.currentLat,
					lng: self.mapController.currentLong
				};


			self.is_autoDetection = false;
			self.filters = [];

			$('.error', self.container).hide();

			if (keyword == "" || !keyword) {
				self.showError(self.config.error_message.blank_field);
				return;
			}

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			clearTimeout(map.autocompleteTimeout);
			map.autocompleteTimeout = null;
			
			self.mapController.searchDealersByKeyword(keyword, $('.input-panel input[type=text]', self.container), self.processResults, errmessage)

			self.loadedDealers = [];

			$('.input-panel input[type=text]', self.container).blur();
			
			self.closeTabs();

		},

		showError: function(errorText) {
			this.closeTabs();
			$('.dealer-result-container').hide();
			this.errorContainer.addClass("active").show().find('.text').text(errorText);//issue
		},

		getDealersFromCurrentLocation: function() {
			var self = this,
				map = self.mapController.map || null,
				searchField = $('.input-panel input[type=text]', self.container),
				errmessage = self.config.error_message.nearest_dealer_not_found,
				geoLocationTimeout = null;

			self.is_autoDetection = false;
			self.filters = [];
			self.closeTabs();
			self.mapController.cleanMap();

			$('.error', self.container).hide();

			if ($('.input-panel', self.container).is('.active')) return false;
			$('.input-panel', self.container).addClass('active');

			geoLocationTimeout = setTimeout(function() {
				self.showError(self.config.error_message.geolocation_error_timeout);
				$('.input-panel', self.container).removeClass('active');	
			}, 10000);

			if (!!navigator.geolocation) {
				
				navigator.geolocation.getCurrentPosition(function(position) {
					
					var lat = position.coords.latitude,
						lng = position.coords.longitude;

					self.loadedDealers = [];

					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					self.mapController.getAddressStringFromCoord({ "lat":lat, "lng":lng}, function(result, status) {
							searchField.val(result);
							self.mapController.searchDealersByLocation(result, searchField, {},{},self.processResults, self.config.error_message.location_not_found);					

					});
												
				}, function(err) {
					
					clearTimeout(geoLocationTimeout);
					geoLocationTimeout = null;

					switch (err.code) {
						case err.PERMISSION_DENIED:
							self.showError(self.config.error_message.geolocation_error_denied);
							break;
						case err.POSITION_UNAVAILABLE:
							self.showError(self.config.error_message.geolocation_error);
							break;
						case err.TIMEOUT:
							self.showError(self.config.error_message.geolocation_error_timeout);
							break;
					}

					$('.input-panel', self.container).removeClass('active');

				}, { timeout:7000 });

			} else {
				clearTimeout(geoLocationTimeout);
				geoLocationTimeout = null;
				
				self.showError(self.config.error_message.geolocation_error_denied);
				$('.input-panel', self.container).removeClass('active');
			}

		},
		// 23/11/2015 : added is_hideTrack, if save/remove prefer dealers, will not track
		processResults: function(dealers, errmessage, is_filtered_results, is_detailed,is_hideTrack) {
			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				subOpts = $(".sub-options",self.searchContainer),
				filterBar = $(".dealer-result-container .filter-header"),
				origin = {
					lat: self.mapController.currentLat,
					lng: self.mapController.currentLong
				};
				
			//detect whether it is url opened dealer
			if(is_detailed){
				filterBar.hide();
			} else {
				filterBar.show();
			}

			$('.input-panel', self.container).removeClass('active');

			if (!dealers || !dealers.length) {
				self.hasResults = false;
				self.colorLengend.removeClass("active");
				//auto detection dont need error message
				if (!self.is_autoDetection) { self.showError(errmessage); }
				subOpts.show();
				return false;
			}
			if(subOpts.length > 0){
				self.hasResults = true;
				subOpts.hide();
				$(".wrap .title",self.container).removeClass("active");
				self.colorLengend.addClass("active");
				self.errorContainer.removeClass("active");
				self.resultsContainer.removeClass("detailed");
				self.selResContainer.hide();
			}
			$('.dealer-map-field').addClass("show");
			$('.dealer-map-landing').addClass("hide");
			self.mapController.displayMap();
			
			// map.setCenter({ lat: origin.lat, lng: origin.lng });
			_.each(dealers, function(dealer, i) {
				_.defaults(dealer, { "distance":"", "ABN":"" });
			});

			if ($('.result-list.selected', self.container).is(':hidden')) $('.result-list').not('.selected').show();
			$('.dealer-disambiguation').hide();
			$('.search-panel .error').hide();
			$('.result-list > ul').empty();

			// guxApp.dealerLocator.cachedDealers = _.sortBy(dealers, "distance"); /* refactor this part*/
			if(!is_filtered_results) self.dealers = _.sortBy(dealers, "distance");

			// make the fave dealer appear as the first item of the list
			var saved_dealer = _.find(dealers, function(dealer) { return self.is_savedDealer(dealer); });
			

			if (_.size(saved_dealer)) {
				new_dealers = _.reject(dealers, function(dealer) { return self.is_savedDealer(dealer); });
				dealers = _.union(saved_dealer, new_dealers);
			}
			
			var	dealer_count = "", 
				dealer_count_text = self.config.dealer_count_message.no_dealer;
			if(dealers.length == 1){
				dealer_count = dealers.length;
				dealer_count_text = " "+self.config.dealer_count_message.single_dealer;
			}else if (dealers.length > 1) {
				dealer_count = dealers.length;
				dealer_count_text = " "+self.config.dealer_count_message.multiple_dealer;
			}
			$('.dealer-result-container .count .num').text(dealer_count);
			$('.dealer-result-container .count .msg').text(dealer_count_text);
			
			self.loadDealers(dealers);
			//gux omniture
			is_hideTrack = is_hideTrack || false;
			if(!is_hideTrack){
				$.publish('dealers-done');
			}
			
			var services_config = $('#services-config').embeddedData(),
				filters = self.filters || [];

			if (!is_filtered_results) {
				self.services = {};
				$.each(dealers, function(i, dealer) {

					_.each(services_config, function(service, key) {

						if (!!parseInt(dealer[key]) || dealer[key] === "Y" || dealer[key] === true) {
							self.services[key] = service;
						}
					});
				});
			}
			
			//hide filter tab if no filter
			if(!guxApp.tools.isEmpty(self.services)){
				//convert to array
				var services = [];
				for (var i in self.services){
					services.push(self.services[i]);
					services[services.length-1].key = i;
				}
				//sort service list (service in filter tab) in order
				services.sort(function(a,b){
					return parseInt(a.order) - parseInt(b.order);
				});
	
				$('.filter-services .group-list').html(_.template($('#services-template').html(), {services:services, filters:filters}));
				if($('.filter-header .filter-toggler').is(':hidden')){
					$('.filter-header .filter-toggler').show();
				}
			}else{
				$('.filter-header .filter-toggler').hide();
			}
			
			$.publish('uniform', {
				el: $('.filter-services input:checkbox', self.container),
				el_type: "rounded-checkbox"
			});

			// load more dealers
			$('.dealer-view-more', $('.result-list', self.container).not('.selected')).unbind().on('click', '.button', function(e) {
				
				var existing_dealers = $('.dealer-result').length;

				e.preventDefault();
				self.loadDealers(dealers);

			});

			$('.input-panel', self.container).removeClass('active');

		},

		displayRouteToDealerTrigger: function(e) {
			// event handler

			e.preventDefault();

			var self = guxApp.dealerLocator,
				map = self.mapController.map,
				dealer = $(this).parents('.dealer-result').data();

			map.displayRouteToDealer({lat: self.mapController.currentLat, lng: self.mapController.currentLong}, dealer);

		},

		closeTabs: function() {
			var self = this;

			$('.view-all-dealers', self.container).trigger('click');
			if ($('.dealer-filter-bar').is('.active')) $('.filter-toggler', self.container).triggerHandler('click');
			$('.dealer-disambiguation', self.container).hide();
			$('.error', self.container).removeClass("active");

		}
	};

	$(function(){

		// check if component exists
		if (!$('.dealer-locator').length) return;
		
		guxApp.dealerLocator.loading = true;

		var date = new Date();
		guxApp.dealerLocator.date = date;
		guxApp.dealerLocator.day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];

		$.subscribe('api-done', function() {
			guxApp.dealerLocator.init();
		});

	});
	
	//jQuery mobile will add "ui-link" to "a" tag which cause style issue.
	$(document).on("pageinit", function() {
		if (!$('.dealer-locator').length) return;
		
		$('.dealer-locator .ui-link').removeClass('ui-link');
		
		var self = this;

		if (!guxApp.dealerLocator.loading) {
			
			if ($('.dealer-map-field').is(":hidden")) $('.dealer-map-field').show();
			$.subscribe('api-done', function() {
				guxApp.dealerLocator.init();
			});

			//self.mapController.map = null;
			//self.mapController.mapContainer = null;
			//self.mapController.currentLocationCoords = null;

		}
		
	});

	$(document).on('pageshow', function() {
		//if (!guxApp.dealerLocator.loading) guxApp.googleMapController.init();
		guxApp.dealerLocator.loading = false;
	});

}(jQuery));

