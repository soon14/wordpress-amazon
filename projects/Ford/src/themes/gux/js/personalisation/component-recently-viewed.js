/*
Author: 		Randell Quitain
File name: 		component-recently-viewed.js
Description: 	Display or suppress recently viewed component
Dependencies: 	jQuery
Usage: 			
*/

var guxPersonalisation = guxPersonalisation || {};

(function($){

	guxPersonalisation.recentlyviewed = {

		// each component requires an init function 
		init: function(element) {
			this.ruleEngine(element);
		},
		ruleEngine: function(element) {

			if (guxPersonalisation.psn.profile.authState === "OW") {
				
				element.hide();
				
			} else {

				if (guxPersonalisation.psn.profile.authState === "AN") {
					
					var success = function (value, status, jqXHR) {

						var recentlyViewedVehicles = value[0]['RecentlyViewedVehicles'],
							viewed = {};

						// console.log(recentlyViewedVehicles);

						// check if data is available
						if((recentlyViewedVehicles && recentlyViewedVehicles != null && !_.isEmpty(recentlyViewedVehicles))) {

							// PHASE 1 -  Get unique rvv ids
							var rvvURL = guxPersonalisation.rest.getURL('rvv'),
								total = guxApp.tools.getObjectLength(recentlyViewedVehicles),
								rvvId = [],
								uniqueRVVData = {};

							// push all viewed 
							for (var i = 0; i <= (total-1); i++) {
								viewed[i] = recentlyViewedVehicles[i];
							};

							var viewedLength = guxApp.tools.getObjectLength(viewed);

							// list all gathered id of FPS rvv
							for (var i = viewedLength - 1; i >= 0; i--) {

								// get/push valid nameplate
								if(typeof viewed[i] != 'undefined' && viewed[i]._nameplate != ':' && viewed[i]._on != '') {
									var viewedId = viewed[i]._nameplate.split(':')[0],
										viewedOn = viewed[i].on;
									rvvId.push({ 'rid': viewedId, 'on': viewedOn });
								}

							};

							// get only the unique id from FPS RecentlyViewedVehicle
							var uniqueRVVId = _.uniq(rvvId, function(item){ return JSON.stringify(item.rid) });

							// sort unique id's by most recent
							var sort = _.sortBy(uniqueRVVId, function(item) { return JSON.stringify(item.on); }),
								nextMostRecently = sort.reverse();

							// console.log(nextMostRecently);

							// get rvv data
							guxPersonalisation.rest.getData(rvvURL).done(function (data) {

								// check if data is available
								if(data && data != null && !_.isEmpty(data)) {

									var element = guxPersonalisation.components.componentItems["recentlyviewed"],
										trueIndex = 0;

									// compare uniqueRVVId from FPS to RVV data
									for (var r = nextMostRecently.length - 1; r >= 0; r--) {

										for (var p = data.length - 1; p >= 0; p--) {

											// check if FPS RVV id is equal to RVV data id
											if(nextMostRecently[r].rid === data[p].id) {
												
												var dataRVV = {
													"id": data[p].id,
													"on": nextMostRecently[r].on,
													"modelPageUrl": data[p].modelPageUrl,
													"modelSmobPageUrl": data[p].modelSmobPageUrl,
													"imageMidResURL": data[p].imageMidResURL,
													"modelYear": data[p].modelYear,
													"vehicleName": data[p].name,
													"price": guxApp.priceFormatter.format(data[p].price)
												}

												// push the data of the unique id's to object
												uniqueRVVData[trueIndex] = dataRVV;

												trueIndex++;

											}

										};

									};

									// console.group('Unique recently viewed vehicles fetched data:');
									var sort = _.sortBy(uniqueRVVData, function(item) { return JSON.stringify(item.on); }),
										finalRVVData = sort.reverse();
									
									// console.log(finalRVVData);

									// PHASE 2 - Check total number of nextMostRecently and display proper content
									// default set limit - zero-based
									var viewedUniqueRVVData = guxApp.tools.getObjectLength(finalRVVData),
										limit = 0,
										rvvData = {};

									if(viewedUniqueRVVData > 1) {

										// return data equals to 2-3
										if(viewedUniqueRVVData >= 2 && viewedUniqueRVVData <= 3) {

											// console.group('2 to 3 (viewedUniqueRVVData: '+viewedUniqueRVVData+')');

											// rvv length is equal to 2, display next 1 recently viewed vehicle
											if(viewedUniqueRVVData === 2) {
												// console.log('display 1 next recently viewed vehicles:');
												limit = 2;
											}

											// rvv length is equal to 3, display next 2 recently viewed vehicle
											if(viewedUniqueRVVData === 3) {
												// console.log('display 2 next recently viewed vehicles:');
												limit = 3;
											}

											// console.group('1 - 2 most recently viewed vehicles:');
										
										} else if (viewedUniqueRVVData >= 4) {

											// console.group('4 and up (viewedUniqueRVVData: '+viewedUniqueRVVData+')');

											// rvv length is equal to 4 and up, display next 3 recently viewed vehicle
											// console.group('3 most recently viewed vehicles:');
											limit = 4;
											
										}

										// populate final rvvData with next recent data
										for (var i = 1; i <= limit; i++) {
											if(i != limit) rvvData[i] = finalRVVData[i];
										};

										// console.log(rvvData);

										element.show();

										// render content
										guxPersonalisation.rest.renderTemplate(element, rvvData);

										// reinit billboardCarousel
										guxApp.billboardCarousel.init(element);	

										// image preloader
										guxPersonalisation.rest.imageLoader(element, function() {
											// loader
											guxPersonalisation.rest.loader(element);
										});

									} else {
				
										// return data equal less than 1
										// console.log('0 to 1 returned data. Hide the component.');
										element.hide();
										
									}

								} else {
									// console.log('No Build and Price model');
									element.hide();
								}
								
							}).fail(function (jqXHR, textStatus, errorThrown) {
								// console.log('Not able to fetch ' + rvvURL + ' (' + errorThrown + ')');
								element.hide();
							});
							
						} else {

							// console.log('No RVV!');
							element.hide();

						}

					};

					var error = function (value, status, jqXHR) {
						// console.log("FPS isn't loaded. Hide component.");
						element.hide();
					};

					// get RVV
					guxPersonalisation.fps.get([{ 'RecentlyViewedVehicles': {} }], success, error);

				} else {

					element.hide();
					
				}

			}
		}

	};

})(jQuery);