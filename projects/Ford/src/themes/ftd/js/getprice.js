// Requires json2.js 
/*globals window, document, jQuery, ND, SiteConf */
(function($, undefined){

	var // Conf
		config = {},
		
		// Pubsub
		suffix = ".calculateprice.dfy",
		
		// Module exports 
		exports = {},
		exportsAPI = {},
		
		//not to be exposed
		internalAPI = {overlayLaunched : false};
		

		/*
		 * Object: priceUpdater
		 * 
		 * Managers the derivatives on the page that need a price.
		 *
		 * <div class="derivative-price {'derivativeid':'123412341234'}">
		 * 		<span class="price">$$$$$</span>
		 * </div>
		 */
		priceUpdater = exports.PriceUpdater = (function(){

		    var derivatives,
				defaults = {
				    priceClass: '.price',
				    hotDealClass: '.latest-offer',
				    loanCalcClass:'.loan-calc',
				    priceContainer: ".derivative-price",
				    tmpl: "#tmpl-price-main",
				    hotDealTmpl: '#tmpl-price-hotdeal-main',
				    noPriceTmpl: "#tmpl-noprice-main"
				},
                modelId = null;
			
			//Private Function
			//Store the derivative DOM elements for later recall
			function mapDerivatives( elements, priceHTML ){
			    derivatives = {};
				$( elements ).each(function( i, e ){
					var elem = $(e),
						metadata = elem.data('derivativeid');
					    
					//Read meta data and use derivativeid as key for storage
					if( metadata ) {
						derivatives[metadata] = elem;
					}
					if (!modelId && elem.data('modelid')) {
					    modelId = elem.data('modelid');
					}
				});
				return derivatives;
			}
			
			function getPriceFormatter(callback) {
			    if (config.priceformatter !== null) {
			        if (typeof callback !== 'undefined') {

			            if ($.isFunction(callback)) {
			                callback();
			            }
			        }
			    }
			    else {
			        priceUserDataManager.initPriceFormatter();
			        if ($.isFunction(callback)) {
			            callback();
			        }
			    }
			}

			//Return Obj with public methods
			return {
				init:function(elements, options){
					var that = this; 
					
					this.options = options = $.extend({}, defaults, options);
					//Store the derivative DOM elements for later recall
					mapDerivatives(this.options.priceContainer);

					//Compile main price template
					this.tmpl = $(this.options.tmpl).template();
					var $hotdealTemplate = $(this.options.hotDealTmpl);
					if ($hotdealTemplate.length > 0) {
						this.hotDealTmpl = $(this.options.hotDealTmpl).template();
					}
					//Listen to change postcode event
					$.subscribe('userchange' + suffix, function(){
						//Notify the price updater that there is impending change to prices.
						that.notifyChange();
					});
					
				},
				list: function(){
					var ret = [];
					//Create a arr of derivative ids (posted to the server web service eventually)
					$.each(derivatives, function(key, obj){
						ret.push(key);
					});
					return ret;
				},
				update:function(prices, visual){
//					console.log('priceUpdater.update()');
					var that = this;
					
					visual = visual === undefined || visual;
					
					if(derivatives) {
						
						//Just in case
						that.notifyChange();
						
					    //Loop prices returned from web service
						getPriceFormatter(function () {
						    $.each(prices, function (id, derivative) {
						        var housing = derivatives[id],
                                    prevPrice,
                                    hotDealLocationToAppend,
                                    render;

						        //Ensure the id from the prices array matches an id in the derivatives DOM storage 
						        //and that there is a displayPrice to inject
						        if (housing && derivative.displayPrice) {

						            prevPrice = housing.find(that.options.priceClass);

						            //Format price for each derivative for GUX
						            if (typeof guxApp !== 'undefined') {
						            	derivative.price = guxApp.priceFormatter.format(derivative.price);
						            }

						            //Render the template with the price data
						            render = $.tmpl(that.tmpl, derivative);


						            //for mobile we need to render the dom differently.
						            if (typeof ND.polk.renderDerivative !== 'undefined') {

						                var $liParent = housing.parents('li').filter(':visible');
						                if ($liParent != null && $liParent.length > 0) {
						                    hotDealLocationToAppend = $($liParent[0]);
						                } else {
						                    hotDealLocationToAppend = housing.parent().parent();
						                }
						                renderHotdeals = $.tmpl(that.hotDealTmpl, derivative);
						                ND.polk.renderDerivative(housing, prevPrice, hotDealLocationToAppend, render, renderHotdeals, that.options.hotDealClass);

						                if (typeof ND.polk.registerLoanBtn !== 'undefined') {
						                    ND.polk.registerLoanBtn(hotDealLocationToAppend, derivative.price, config.priceformatter, priceUserDataManager.locationValue());
						                }

						            } else {

						                //Either replace or inject a new price
						                if (prevPrice.size()) {
						                    prevPrice.replaceWith(render);
						                } else {
						                    if (housing.find('style').length>0) {
						                        housing.find('style').remove();
						                    }
						                    if (housing.find(that.options.loanCalcClass).length > 0) {
						                        housing.find(that.options.loanCalcClass).parent().remove();
						                    }
						                    housing.prepend(render);
						                }

						                $(that.options.loanCalcClass, housing).off('click').on('click', function (e) {
						                    e.preventDefault();
						                    $(this).loanCalculatorOverlay({
						                        price: derivative.price,
						                        priceformatter: config.priceformatter,
						                        location: priceUserDataManager.locationValue()
						                    });
						                });
						            }

						            if (visual) {
						                //console.log('init-> ND.polk.showChangeVisually');
						                ND.polk.showChangeVisually(housing.find(that.options.priceClass));
						            }
						            
						        }
						    });

						    if ($(that.options.noPriceTmpl).length) {
						        var nopricerender = $(that.options.noPriceTmpl).html();
						        $('.body.derivative-price').each(function (i, de) {
						            if ($(de).find('.price').length === 0) {
						                $(de).prepend(nopricerender);
						            }
						        });
						    }
							//latest offer img be publishable in model enhance detail page
							var container = $(".model-enhance .attribute-bar"),
									urls=$('#price-urls').embeddedData();
							if(container.length&&$("a.offers", container).length&&urls&&urls['latest-offer-backimg']) {
								$("a.offers", container).attr("style","background-image:url("+urls['latest-offer-backimg']+")");							
							}
							//extent model content if hot deal exists
							if($(".model-content.body.derivative-price").length && $(".model-content.body.derivative-price a.offers").length) {
								$(".model-content.body.derivative-price").addClass("extend");
							}

						});
						
					} else {
						$.publish('error' + suffix, "ND.PriceUpdater: Could not update Dom");
					}			
				},
				notifyChange: function() {
					var that = this;
					
					if( derivatives ) {
						//OMG get them prices down incase there is a timeout or an error or sometrihngf.asd fasdf !!!!! ARGH!.
					    $.each(derivatives, function (id, housing) {
					        if (typeof ND.polk.notifyChange !== 'undefined') {
					            ND.polk.notifyChange(housing);
					        }
					        else {
					            housing.find(that.options.priceClass).remove();
					            housing.find(that.options.loanCalcClass).parent().remove();
					        }
						});
					}
				},
				modelId: function () {
				    return modelId;
				}
			};
		}()),
		
		/*
		 * Object: priceUserDataManager
		 * 
		 * Managers the overlay and events around the user entering there postcode to get prices.
		 *
		 * <div class="derivative-price {'derivativeid':'123412341234'}">
		 * 		<span class="price">$$$$$</span>
		 * </div>
		 */
		priceUserDataManager = exports.userDataManager = (function(){
			
			//Private Variables
			var userData,
				defaults,			
				derivativeList,
                regionalPriceData,
				formError,
				$form = null,
				defaultFormErrorMsg = null,
				fromCookie;
		
			//Module defaults
			defaults = {
			    formid: '#calc-price-user',
			    regionformid:'#regional-price-user',
				needprice:'.need-price',
				getpostcodeusage:'.get-postcode-usage',
				tmpl:'#tmpl-price-links'
			};
			
			//Private Functions
			
			//Get Prices from web service
			function getPrices() {
				var payload = $.extend( userData, { "derivatives": derivativeList } );
				$.publish('userchange' + suffix, { "payload": payload });				
			}
			
			//Check for persistant user userData, this function is only used on page Load.
			function checkData() {
				userData = loadData();
				
				if (userData && (userData.postcode || userData.pricezone) && userData.usage) {
					fromCookie = true;
					getPrices();
				} else {
					userData = null;
				}
				return userData;
			}

			//Clear for persistant user userData (usaually because of an error)
			function clearData() {
				$.publish( "shopping.pref.clear" );
				userData = null;
			}
			
			function storeData() {
				$.publish( "shopping.pref.save", userData );
			}
			
			function loadData() {
				function userDataPubSubHandler(e, retrieveData) {
					userData = retrieveData;
				}
				// Right now
				$.publish( "shopping.pref.retrieve", userDataPubSubHandler); 
				
				return userData;
			}
			
			//Function to get and set the user userData
			function getterSetterData(postcode, usage, usageLabel, pricezone,pricezoneLabel,priceformatData) {
				if(arguments.length >= 2) {
					userData = {
						"postcode":postcode,
						"usage":usage,
						"usageLabel": usageLabel,
						"pricezone": pricezone,
						"pricezoneLabel": pricezoneLabel,
						"priceformatData": priceformatData
					};
				}
				return userData;
			}
			
			function overlaySuccessPopulateForm(options) {
			    var form = $(options.formid);
			    if (config.isPricezone) {
			        if (!regionalPriceData) {
			            var regiondata = $('#regional-price-json');
			            if (regiondata.length > 0) {
			                regionalPriceData = regiondata.embeddedData();
			            }
			        }
			        //console.log(regionalPriceData);

				    if (form.size() && typeof userData !== 'undefined' && userData != null &&
                        userData.pricezone != null && userData.pricezone !== '' && userData.usage != null && userData.usage !== '') {


				        //form.find('select[name=pricezone]').val(userData.pricezoneLabel).select();
				        for (var regionName in regionalPriceData) {
				            if (regionName && regionalPriceData[regionName]) {
				                var gotRegion = false;
				                $.each(regionalPriceData[regionName], function (i, region) {
				                    if (region.id === userData.pricezone) {
				                        form.find('select[name=pricezone]').val(regionName).select();
				                        gotRegion = true;
				                        return false;
				                    }
				                });
				                if (gotRegion) {
				                    break;
				                }
				            }
				        }
				        
				        var $usage = form.find('input[name=usage]');
				        if ($usage.length) {
				            $usage.filter('[value=' + userData.usage + ']')[0].checked = true;
				        }

				        if ($.mobile) {
				            form.find('select[name=pricezone]').selectmenu('refresh');
				            $usage.checkboxradio('refresh');
				        }
				    }				    
				}
				else {				    
				    if (form.size() && typeof userData !== 'undefined' && userData != null &&
                        userData.postcode != null && userData.postcode !== '' && userData.usage != null && userData.usage !== '') {
				        form.find('input[name=postcode]').val(userData.postcode).select();
				        var $usage = form.find('input[name=usage]');
				        if ($usage.length) {
				            $usage.filter('[value=' + userData.usage + ']')[0].checked = true;
				        }


				    }
				}
			}
            			
			//Function to get and set the user userData
			function asyncUserData(options, change) {
				var userDataChangeEvent = 'userchangesuccess' + suffix,
					userCancelOverlay = 'overlay.usercancel',
					callbacks = [],
					doneCallback;						
				
				//This function is called during events other than page load.
				fromCookie = false;
				
				//Special for Flash
				if( $.isPlainObject( options ) ) {  
					
					if( $.isFunction( options.complete ) ) {
						callbacks.push(options.complete);					
					}
					
					//isFlash implied
					if( options.flashid ) {
										
						callbacks.push(function() {
							//Line of code mutated original from jQuery.swfobject
							var toSend, elem = $('#'+options.flashid).find('object').andSelf().filter('object').get(0);
							
							try {
								//Use External JavaScript API which should be exposed by the Flash Application
								toSend = $.extend({}, userData);
								if( toSend.derivatives ) {
									delete toSend.derivatives;
								}
								elem.message('postcode', JSON.stringify(toSend));							
							} catch( e ) {
								//console.log( "Error messaging flash id = " + options.flashid );						
							}
						});
						
					}
				}

				if ((config.formURL || config.regionformURL) && (change || !userData)) {
					
					//Complete
					doneCallback = function() {
						$.unsubscribe(userDataChangeEvent, doneCallback);
						$.unsubscribe(userCancelOverlay, doneCallback);
						$.each(callbacks, function(i, fn) {
							fn.apply(fn, [loadData()]);
						});
					};				
					$.subscribe(userDataChangeEvent, doneCallback);
					$.subscribe(userCancelOverlay, doneCallback);
						
					//Launch overlay for GUX
					if (typeof guxApp !== 'undefined') {
						$.publish('overlay.launchgux', {
						    url: config.isPricezone?config.regionformURL:config.formURL,
							positionType:'window',
							name: "POLK Select Postcode", 
							success : function() {
								internalAPI.overlayLaunched = true;
							}
						});
					} else {
						$.publish('overlay.launch', {
						    url: config.isPricezone?config.regionformURL:config.formURL,
							positionType:'window',
							name: "POLK Select Postcode", 
							success : function() {
								internalAPI.overlayLaunched = true;
							}
						});
					}
					
				} else {
					$.each(callbacks, function(i, fn) {
						fn.apply(fn, [loadData()]);
					});
				}
				
			}
			
			/* Expose API method to Flash
			 * 
			 * Default usage 
			 * requestChangePriceUserData( {
			 * 		flashid:'flashid',
			 * 		complete: function() { .. }
			 * );
			 * 
			 * From Flash
			 * requestChangePriceUserData( 'flashid', true, function() { .. })
			 */
			exportsAPI.requestPriceUserData = function(optionsOrString, isFlash, complete, change) {
				
				if( isFlash && typeof optionsOrString == "string" ) {
					optionsOrString = {"flashid":optionsOrString};
					optionsOrString.complete = complete;
				}
				
				asyncUserData(optionsOrString, change);
			};

			/*
			 * Add some curry, Expose another API method to Flash
			 */
			exportsAPI.requestChangePriceUserData = function(optionsOrString, isFlash, complete) {
				exportsAPI.requestPriceUserData(optionsOrString, isFlash, complete, true);
			};
			
			/*
			 * Sohrab: Add some soup, Expose another API method for build and price
			 * 
			 * must pass a callback function as options.complete to handle result
			 */
			exportsAPI.requestChangePriceBuildAndPrice = function(options, change) {
				exportsAPI.isBuildAndPrice = ND.API.isBuildAndPrice = true;
				config.isPricezone=false;
				asyncUserData(options, change);
			};
			
			/*
			 * Sohrab: Ask the service to read the cookie and return the values
			 * 
			 */
			exportsAPI.requestCookieValuesBuildAndPrice = function(options) {
				if (options.complete) {
					$.publish( "shopping.pref.retrieve", function(e, userData) {
						options.complete.apply(options.complete, [userData]);
					}); 
				}
			};
			
			function listenForm(form){
				
				ND.polk.bindAdditionalListeners(form);
				
				//Listen for form events
				$( document ).off( 'submit', form).on( 'submit', form,  function(e) {

					var $form = $(this), postcode, usage, jUsage, usageLabel, pricezone, pricezoneLabel, pricezoneValue;
					
					working = false;
					e.preventDefault();
					//console.log('listenForm-> form submit');
					//grab local 
					postcode = $form.find('[name=postcode]').val();
					jUsage = $form.find('[name=usage]:checked');
					usage = jUsage.val();
					pricezoneValue = $form.find('[name=pricezone]').val();
					pricezoneLabel = $form.find('[name=pricezone]').find('option:selected').text();

					
				    //Validate Form
					if (config.isPricezone) {
					    if ($.trim(pricezoneValue).length > 0 && usage && regionalPriceData && regionalPriceData[pricezoneValue]) {
					        var priceformatData;
					        $.each(regionalPriceData[pricezoneValue], function (i, region) {
					            if (region.type === usage) {
					                pricezone = region.id;
					                config.priceformatter = ND.PriceFormatter;
					                config.priceformatter.initialise({
					                    data: region.priceFormat,
					                    formatString: region.currencySymbol,
					                    centsSeparator: region.monetaryDecimalSeparator,
					                    thousandsSeparator: region.groupingSeparator
					                });
					                priceformatData = region.priceFormat + "|" + region.currencySymbol + "|" + region.monetaryDecimalSeparator + "|" + region.groupingSeparator;
					                return false;
					            }
					        });
					        usageLabel = $("[for=" + jUsage.attr("id") + "]").attr('title');
					        getterSetterData(postcode, usage, usageLabel, pricezone, pricezoneLabel,priceformatData);
					        getPrices();
					    } else {
					        $.publish('usererror' + suffix);
					    }
					}
					else {
					    if ($.trim(postcode).length === 4 && !isNaN(postcode) && usage) {


					        usageLabel = $("[for=" + jUsage.attr("id") + "]").attr('title');

					        getterSetterData(postcode, usage, usageLabel);
					        getPrices();

					    } else {
					        $.publish('usererror' + suffix);
					    }
					}


					return false;
				});
				
				
			}
			
			
			//Clear for persistant user userData on error
			//$.subscribe('error' + suffix, clearData);
			
			
			//Return Obj with public methods
			return {
				init:function(dlist, options){
					var that = this;
					
					userData = null;
				
					that.options = options = $.extend({}, defaults, options, { formid: config.isPricezone ? defaults.regionformid : defaults.formid });
					
					//The housing for Need Price
					that.needprice = $(options.needprice);
					
					//Setup click events
					that.needprice.on( 'click', options.getpostcodeusage, function(e){
						e.preventDefault();
						asyncUserData(null, true);
					});
					
					//Store derivative array
					derivativeList = dlist;
					
					
					//Enable listening to the form submit events
					listenForm( options.formid );
					
					//Compile main price template
					that.tmpl = $(options.tmpl).template();

					//Listen to change postcode event
					$.subscribe('userchange' + suffix, function(event, data){
						//Notify the price updater that there is impending change to prices.
//						console.log('load in progress');
//						that.update({
//							loading:'true'
//						});
					});
			
						
					//Listening for the if the form is existing, the data will popup
					$.subscribe('overlay.success', function(){
						//overlaySuccessPopulateForm(options.formid);
						overlaySuccessPopulateForm(options);
						ND.polk.bindAdditionalListeners(options.formid);
					});
					
					//used for mobile to unsubscribe events and remove listeners
					$.subscribe('destroy' + suffix, function() {
						//console.log('ND.CalcPrice.destroy');
						for( var channel in that.pubsub ) {
							$.unsubscribe( channel + suffix, that.pubsub[channel] );
						}
						
						$( document ).off('submit', $(that.options.formid));
						that.needprice.off( 'click', that.options.getpostcodeusage);
						that.needprice.empty();
						
					});
					
					
					if (derivativeList.length === 0) {
						return;
					}
					//Check if the page load data exists
					if(!checkData()) {
						//There was no data so initialise the "Want to see prices"
						that.update();
					}

			
				},
				initPriceFormatter: function () {
				    if (userData && userData.priceformatData && config && !config.priceformatter && ND.PriceFormatter) {
				        var pfdata = userData.priceformatData.split('|');
				        if (pfdata.length === 4) {
				            config.priceformatter = ND.PriceFormatter;
				            config.priceformatter.initialise({
				                data: pfdata[0],
				                formatString: pfdata[1],
				                centsSeparator: pfdata[2],
				                thousandsSeparator: pfdata[3]
				            });
				        }
				    }
				},

				update:function(otherData, visual){
//					console.log('priceUserDataManager.update()');
					var that = this, render,
						//Use the error data or the postcode data in the tmpl
						tmplData = otherData || userData;
					
					if( that.needprice ) {
						
						//Render the tempalte with user data
						render = $.tmpl(that.tmpl, tmplData);
						
						if( that.previousLinks && that.previousLinks.length ) {

							//Replace It (had an issue with $.fn.replaceWith function)
							that.previousLinks.remove();
							that.needprice.append(render);
							that.previousLinks = render;
							
						} else {
							
							//Inject a new element
							if (typeof guxApp !== 'undefined') {
								that.needprice.html(render);
							} else {
								that.needprice.append(render);
							}
							that.previousLinks = render;
							
						}
						
						if( visual && !fromCookie) {
							// Was getting the following error. "Error: uncaught exception: [Exception... "Could not convert JavaScript argument arg 0 [nsIDOMViewCSS.getComputedStyle]"  nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"  location: "JS frame :: http://ftd-trunk-carve.local/themes/ftd/js/live/dev.debug.js :: anonymous :: line 5491"  data: no]"
							// So I get the element in a new jQuery selection
							ND.polk.showChangeVisually($(that.previousLinks.get(0)));
						}
						
						ND.polk.templateUpdated(that.needprice);
					}				
				},
				visualUpdate: function( otherData ) {
//					console.log('priceUserDataManager.visualUpdate()');
					this.update( otherData, true );
				},
				fromCookie: function() {
					return !!fromCookie;
				},
				//error validation
				displayMsg: function(msg) {
					$form = $(priceUserDataManager.options.formid);
					formError = $form.find('.error');
					

					
					
					if (defaultFormErrorMsg == null) {
						defaultFormErrorMsg = $form.find('#standard-error').text();
					}
					formError.text(msg ? msg : defaultFormErrorMsg);
					formError.filter(":hidden").slideDown('fast');
				},
				loading: function(show) {
					$form = $(priceUserDataManager.options.formid);
					if (show) {
						$form.find('.error').hide();
						$form.find('.loading').filter(":hidden").slideDown('fast');
						$form.find('button[type=submit]').attr('disabled', true);
					} else {
						$form.find('.loading').hide();
						$form.find('button[type=submit]').removeAttr('disabled');
					}
					
				},
				locationValue: function () {
				    if (userData) {
				        if (config.isPricezone) {
				            return userData.pricezoneLabel + ' ' + userData.usageLabel;
				        }
				        else {
				            return userData.postcode + ' ' + userData.usageLabel;
				        }
				    }
				    return '';
				},
				getData: loadData,
				setData: storeData
			};
		
		}()),	// end priceUserDataManager
		
	
		/*
		 * Global Pubsub channels for this module
		 */
		pubsub = {
		
			/* Subscribe
			 * @input Object - {"postcode": "3000","usage": "p"}
			 * eg. $.publish('userchange.calculateprice.dfy', {"postcode": "3000","usage": "p"});
			 */	
			userchange: function(event, data){
				
				//Integritry Check
			    if (!config.dataURL && !config.isPricezone) {
					$.publish('error' + suffix, 'There was a problem.');
					//console.log("Missing config.dataURL");
					return;
				}
				
				
				function error( text ) {
					$.publish('change' + suffix, {error:true, errorMessage:'System error.'});
					$.publish('error' + suffix, text);
				}

				
				if( data && data.payload ) {
					priceUserDataManager.loading(true);
					//If there is no derivatives on the page. Skip the AJAX call
//					if ( data.payload.derivatives && data.payload.derivatives.length ) {
				    //We have enough information to calculate the prices

					if (config.isPricezone) {
					    
					    if ($('#rest-services').length > 0) {
					        var dataURL = $('#rest-services').embeddedData()['pricezone.derivatives'];
					        if (dataURL) {
					            $.ajax({
					                type: 'GET',
					                url: dataURL.replace('{site}', config.site).replace('{pricezoneId}', data.payload.pricezone).replace('{modelId}', priceUpdater.modelId()),
					                dataType: 'json',
					                complete: function (xhr, text) {
					                    $.publish('get' + suffix, text);
					                },
					                success: function (data) {
					                    var results = {};
					                    if (data && data.length > 0) {
					                        if (!config.priceformatter) {
					                            priceUserDataManager.initPriceFormatter();
					                        }
					                        var list = $.map(data, function (d) {
					                            if (!d.displayPrice) {
					                                if (config.priceformatter) {
					                                    d.displayPrice = config.priceformatter.format(d.price);
					                                }
					                            }
					                            return d;
					                        });
					                        results.error = false;
					                        results.derivatives = list;
					                    }
					                    else {
					                        results.error = true;
					                        results.errorMessage = $('form.calc-price-user p.error').html();
					                    }
					                    $.publish('change' + suffix, results);
					                },
					                error: function (xhr, text) {
					                    error(text);
					                }
					            });
					        }
					    }
					}
					else {

					    $.ajax({
					        type: 'POST',
					        url: config.dataURL,
					        cache: false,
					        headers: {
						        'Cache-Control': 'no-cache'
						    },
					        data: {
					            "data": JSON.stringify(data.payload)
					        },
					        complete: function (xhr, text) {
					            $.publish('get' + suffix, text);
					        },
					        success: function (data) {
					            $.publish('change' + suffix, data);
					        },
					        error: function (xhr, text) {
					            error(text);
					        },
					        dataType: 'json'
					    });
					}


//					} else {
//						$.publish('change' + suffix);
//					}
			
				} else {
					error("no payload");
				}
			},
			
			/*
			 * Subscribe Price changes
			 */
			change: function(event, data){
				data = data || {};
				priceUserDataManager.loading(false);
				//Data Integrity check
				if( !data.error ) {
					
					$.publish('userchangesuccess' + suffix, data);

					//hide the overlay only if polk overlay is open.
					if (internalAPI.overlayLaunched) {
						//Hide overlay for GUX
						if (typeof guxApp !== 'undefined') {
							$.publish('overlay.hidegux');
						} else {
							$.publish('overlay.hide');
						}
					}
					
				} else {
					
					//Update with the error data (Normalise the error).
					//priceUserDataManager.visualUpdate({error:data.errorMessage});
					//priceUpdater.notifyChange();
					$.publish('usererror' + suffix, data.errorMessage || 'Error');
				}
				
			},
			
			userchangesuccess: function(event, data) {
				//Normalise the prices object for ND.priceUpdater
				var prices = {};
				$.each(data.derivatives || [], function(i, obj){
					prices[obj.id] = obj;
				});
				
				//Update the disclaimer links
				priceUserDataManager.visualUpdate();
				
				//Update the prices on the page
				priceUpdater.update(prices, !priceUserDataManager.fromCookie());
				priceUserDataManager.setData();
			},
			
			usererror: function(event, data){
				//console.log('usererror: ' + data);
				priceUserDataManager.displayMsg(data );
				
			},
			
			loading: function(event, data) {
				//console.log('loading: show: ' + data);
				priceUserDataManager.loading(data);
			}
			
		};			

	// Initalise pubsub!
	for( var channel in pubsub ) {
		$.subscribe( channel + suffix, pubsub[channel] );
	}
	
	// Dynamic confi URLs
	exports.conf = function(obj) {
		var urls = obj || $('#price-urls').embeddedData();
		config.dataURL = urls['xhr-calcprice-data'] || config.dataURL;
		config.formURL = urls['xhr-calcprice-form'] || config.formURL;

		config.regionformURL = urls['xhr-regionalprice-form'] || config.regionformURL;
		config.isPricezone = (config.regionformURL && config.regionformURL.length > 0);

		config.site = $('#common-config').embeddedData().site;
		config.priceformatter = null;
	};
	
	// Constructor of sorts
	exports.init = function() {
		//console.log('ND.CalcPrice.init()');
		this.conf();
		// Init Dynamic URLs AND (Check make sure not in test suite);
		if ((!config.isPricezone && !config.dataURL && !config.formURL) || (config.isPricezone && !config.regionformURL)) {
			return; 
		}
		
		//Objects are singleton (single-use-only)
		priceUpdater.init();
		var derivativeList = priceUpdater.list();
		priceUserDataManager.init(derivativeList);
	};
	
	/* end */
	
	//Expose Price Calculator
	ND.CalcPrice = exports;

	//Expose Price Calculator API methods
	ND.API = $.extend(ND.API, exportsAPI);
	
}(jQuery));
