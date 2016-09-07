/*
Author: 		Doris Zhang
File name: 		commonMapController.js
Description: 	common method of mapcontroller
Dependencies: 	jQuery 
Usage: 			
*/


var guxApp = guxApp || {};

(function($) {

	guxApp.commonMapController = {
		
		searchDealersByKeyword: function(keyword, container, callback, errmessage) {

			var self = this,
				map = this.map,
				is_postcode = /^\d/.test(keyword),
				is_invalidAd = /[@#$%^*()_+]+/.test(keyword),
				moduleContainer = $('dealer-locator,mini-dealer');

			if (is_postcode) {

				self.searchDealersByLocation(keyword, container, null, null, callback, errmessage);

			} else {
				
				if(is_invalidAd){keyword="@";}
				self.searchDealersByProperties( {}, { DealerNameSearch: keyword.toLowerCase() }, function(dealer) {
					if (!dealer.length) {
						//search by property of country if address is country level 
						map.geocodeLocation(keyword, function(locations) {
							var currLocation = locations[0];
							if (currLocation&&_.contains(currLocation.types,'country')) {
								self.searchDealersByProperties({}, {Country:currLocation.description}, function(dealer) {
									if(!dealer.length){
										setTimeout(function() {
											self.searchDealersByLocation(keyword, container, null, null, callback, errmessage);
										}, 1000);
										return;
									} 
									else {
										callback(dealer);											
									}						
								});
							}
							else {
								setTimeout(function() {
											self.searchDealersByLocation(keyword, container, null, null, callback, errmessage);
										}, 1000);
										return;
							}
						});
						
					}
					else {
						callback(dealer);
					}
				});
			}	

		},
		makeDealerURL: function(dealer) {
			
			var params = dealer.DealerID,
				domain = this.config.lad_url || location.href,
				has_query_string = _.contains(domain, '?'),
				has_dealer_param = /(\?|\&)+(dealer)+\=/.test(domain);
			var dealerTrans = $("#dealer-translations").embeddedData();
			var pathRootUrl = dealerTrans.pathRootUrl;
			//if usePathUrl exist and true
			if (dealerTrans.usePathUrl && dealerTrans.usePathUrl == "true"){
				//console.log("usePathUrl is true");
				if (guxApp.tools.isAutoNaviMap()) {
				params = guxApp.tools.slugify(dealer._name) + "-" + params;
				params = ((dealer._address)? guxApp.tools.slugify(dealer._address)+"/":"") + params;
				params = ((dealer.Province)? guxApp.tools.slugify(dealer.Province)+"/":"") + params;
				
				}
				else {
				params = guxApp.tools.slugify(dealer.DealerName) + "-" + params; 
				params = ((dealer.Locality)? guxApp.tools.slugify(dealer.Locality)+"/":"") + params;
				params = ((dealer.AdministrativeArea)? guxApp.tools.slugify(dealer.AdministrativeArea)+"/":"") + params;
				
				}

				// if the domain has query string, this will insert the dealer param (<dealer code>/<dealer city>/<dealer name>)  between domain and query string 
				if (has_query_string) {
					var domainArr = domain.split("?");					
					return domainArr[0]  + "/" + params + "?" + domainArr[1];		
				};
			
				return domain  + "/" + params;
			}else {
				
				//console.log("usePathUrl is false");
				if (guxApp.tools.isAutoNaviMap()) {
				params = guxApp.tools.slugify(dealer._name) + "-" + params;
				params = ((dealer._address)? guxApp.tools.slugify(dealer._address)+"-":"") + params;
				params = ((dealer.Province)? guxApp.tools.slugify(dealer.Province)+"-":"") + params;

				}
				else {
				params = guxApp.tools.slugify(dealer.DealerName) + "-" + params;
				params = ((dealer.Locality)? guxApp.tools.slugify(dealer.Locality)+"-":"") + params;
				params = ((dealer.AdministrativeArea)? guxApp.tools.slugify(dealer.AdministrativeArea)+"-":"") + params;

				}
				if (has_query_string && has_dealer_param) {
					domain = domain.split(/(\?|\&)+(dealer)+\=/)[0];
					has_query_string=_.contains(domain, '?');
				};
				//repalce ominiture data
				if(_da&&_da.module&&_da.module.template&&domain.indexOf("intcmp")!=-1){
					if(domain.indexOf("STATUS")!=-1){
						domain = domain.replace(/STATUS/,_da.module.template);
					}
				}
				return domain + (has_query_string?"&":"?") + "dealer=" + params;
			}
			

			// dealership_url = location.href.split('?')[0]+"?dealer=";

		},

		makeDealerAddress: function(dealer, format) {

			var self = this,
				address = (format || "a l L A C p").split(/\s/),
				address_obj = {
					"a": _.reduce([
						dealer.AddressLine1,
						dealer.AddressLine2,
						dealer.AddressLine3
					], function(memo, a) { return memo + ((a)?" "+a:""); }),
					"l": (dealer.SubLocality?dealer.SubLocality:""),
					"L": (dealer.Locality?dealer.Locality:""),
					"A": (dealer.AdministrativeArea?dealer.AdministrativeArea:""),
					"C": (dealer.Country?dealer.Country: ""),
					"p": (dealer.PostCode?dealer.PostCode:"")
				};

			_.each(address, function(value, i) {

				var key_name = value.replace(/\W/g, ''),
					key_value = address_obj[key_name];

				if (!key_value) {
					address.splice(i, 1, " ");
					return;
				}
				//seperate each address info by ","   except the last address info
				if(i < address.length-1){
					key_value = key_value + ","
				}
				//as required country name such as "New Zealand" should not be displayed
				if(self.config.display_country && self.config.display_country == "N" && key_name == "C" ) {
					key_value = "";
				}
				
				value = value.replace(key_name.toString(), key_value);
				address.splice(i, 1, value);

			});

			return address.join(" ");

		},
        		
		open_dept: function(dept_hours) {
			
			var open_dept = false;

			for (key in dept_hours) {
				open_dept = dept_hours[key];
				break;
			}

			return open_dept;

		},

		capitalize: function(string) {
			if (string){
				return string.charAt(0).toUpperCase()+string.slice(1);
			}
		},

		is_dealerOpen: function(dealer, day) {
			var self = this,
				is_open = false,
				now = new Date();

			if (dealer.hours) {
				
				var dept = self.open_dept(dealer.hours),
					dept_name = self.capitalize(dept.key);
				
				if (!!parseInt(dealer[dept_name+day+"Open"]) || dealer[dept_name+day+"Open"] === "Y") {
					var dealer_time = self.strTotime(dealer[dept_name+day+"CloseTime"], true);
					is_open = Date.parse(now) <= Date.parse(dealer_time);
				}
			}

			return is_open;

		},

		filterData: function(obj, filter) {
			/*
			 * filter objects with specified filter pattern
			 * return: object of filtered objects
			 */

			var filtered_objects = false;

			for (var key in obj) {
				if (filter.test(key) && obj[key] != "") {
					
					if (!filtered_objects) filtered_objects = {};

					filtered_objects[key] = obj[key];

				}
			}

			return filtered_objects;

		},

		getDeptSchedule: function (obj, mapController) {

			var self = this,
				dept = {
					"sales": {
						pattern: /^Sales+\w+(Time|Open|Comments)$/,
						keys: ["HasSalesDepartmentPV", "HasSalesDepartmentCV","Used","ApprovedUsed"]
					},
					"service": {
						pattern: /^Service+\w+(Time|Open|Comments)$/,
						keys: ["HasServiceDepartmentPV", "HasServiceDepartmentCV"]
					},
					"parts": {
						pattern: /^Parts+\w+(Time|Open|Comments)$/,
						keys: ["HasPartsDepartment"]
					}
				},
				hours = false,
				displayHours = false;

			//this code is easy for tester to use mock api data to test
			if($("#mocked-api").length == 1){
				obj = $("#mocked-api").embeddedData();
			}	
			
			for (var key in dept) {

				displayHours = false;
				$.each(dept[key].keys,function(i,value) {
					displayHours = (obj[value]=="Y"||obj[value]=="1")? true:displayHours;
				})
				if (!displayHours) continue;

				// if (obj[dept[key].keys[0]] === "N" || obj[dept[key].keys[0]] === "0" || !obj[dept[key].keys[0]]) continue;

				
				var deptHours = self.filterData(obj, dept[key].pattern);

				if (!hours) hours = {};
				for (var deptDay in deptHours) {
					if (!hours.hasOwnProperty(key)) {
						hours[key] = {
							"name": self.config.translation[key],
							"key": key
						};
					}

					hours[key][deptDay] = (deptDay.indexOf("OpenTime")!=-1||deptDay.indexOf("CloseTime")!=-1)&&(/^\d{4}$/.test(deptHours[deptDay]) || /\d{2}\:\d{2}/.test(deptHours[deptDay]))? mapController.strTotime(deptHours[deptDay]) : deptHours[deptDay];
				}

			}

			return hours;
		},

		strTotime: function(timeStr, return_time_obj) {

			if (!timeStr) return;

			timeStr = timeStr.replace(':','');

			var self = this,
				date = new Date(),
				hours = parseInt(timeStr,10)/100,
				minutes = parseInt(timeStr,10)%100
				time = null;

			time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 00, 00);

			if (return_time_obj) return time;

			hours = time.getHours();
			minutes = time.getMinutes().toString();

			return ((hours>12)?hours-12:((hours==0)?12:hours))+":"+((minutes.length<=1)?"0"+minutes:minutes)+((hours>=12)? self.config.translation.evening_suffix: self.config.translation.morning_suffix);

		},

		getCloseTime: function (dealer, day) {
			var self = this,
				closeTime = false;

			if (dealer.hours) {
				var dept = self.open_dept(dealer.hours);
				closeTime = self.strTotime( dealer[ self.capitalize(dept.key) +day+"CloseTime"])
			}

			return closeTime;
		},

		getNextOpenTime: function (dealer) {

			var self = this,
				day = (new Date()).getDay(),
				next_open = "";

			if (dealer.hours) {
				var dept = self.open_dept(dealer.hours),
					dept_name = self.capitalize(dept.key);

				for (var i = day+1, counter=0; counter < 7; counter++) {
					if (!!parseInt(dealer[dept_name+dealer.day_str[i]+"Open"]) || dealer[dept_name+dealer.day_str[i]+"Open"] === "Y") {
						next_open = dealer.day_str_translated[i] + " " + self.strTotime(dealer[dept_name+dealer.day_str[i]+"OpenTime"]);
						break;
					}
					i = (i >= 6)?0:i+1;
				};
			}

			return next_open;
		},

		scheduleString: function(dealer, hours, day) {

			var self = this,
				date = new Date(),
				curTime = parseInt(date.getHours().toString()+date.getMinutes().toString()),
				scheduleString = {
					type : "",
					description: self.config.translation.closed_str
				};

			if (dealer.hours) {
				
				var dept = self.open_dept(hours),
					dept_name = self.capitalize(dept.key),
					dept_val = self.capitalize(dept.name),
					closeTime = dealer[dept_name+day+"CloseTime"]?parseInt(dealer[dept_name+day+"CloseTime"],10):2459;


				if ((!!parseInt(dealer[dept_name+day+"Open"]) || dealer[dept_name+day+"Open"] === "Y") && (curTime < closeTime)) {

					if (!dealer.closeTime) {
						scheduleString.description = "";
					} else {
						scheduleString.type = dept_val + " ";
						scheduleString.description = self.config.translation.open_until + dealer.closeTime;
					}
				} else if (dealer.nextOpenTime) {
					scheduleString.type = dept_val + " ";
					scheduleString.description = self.config.translation.reopen_on + dealer.nextOpenTime;
				}
				
			}


			return scheduleString;
		}

	};

	

})(jQuery);