/**
 * 
 */
var BnP = BnP || {};

/*******************************START OF DATA LOADER*********************/
BnP.SummaryModule = function(dataLoader, viewManager, options) {
	//modelId, options.path, derivativeId, footer, options.isLoadingConfig, showPricesLater
	
	Events.eventList.buildandprice.model.SaveAsPDFEvent.handler =  function () {
			
		var inclusionList = ['modelId',
		 					'derivativeId',
		 					'packageId',
		 					'colourId',
		 					'postcode',
		 					'usage',
		 					'priceZoneId',
		 					'site',
		 					'trimId',
		 					'engineId',
		 					'features'];
		var params = '?';
		var value = null;
		_.each(inclusionList, function(key) {
			value = dataLoader.userPref.get(key);
			if (value !== undefined && value != null) {
				if (key !== 'features') {
					params += (key + '=');
					params += (value + '&');
				} else {
					params += ('features=');
					params += (value.join(',') + '&');
				}
			}
		}, this);
		if (params.length > 1 && (params.charAt(params.length - 1) === '&')) {
			params = params.substring(0,params.length - 1 );
		}
		
		var vehicleName = '';
		var path;
		dataLoader.getSelectedPackageDerivative(
			 {
				pkgCallback: function(pkg) {
					vehicleName = pkg.get('name');
					path = Constants.path.pkg;
				},
				drvCallback : function(drv) {
					vehicleName = drv.get('name');
					path = Constants.path.drv;
				}
			});
//				var nameplateCollection = this.storage.get(Constants.storage.nameplateCollection);
//				var nameplate = nameplateCollection.getSelected();
		//Events.fireEvent(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, {storage: this.storage});
		window.open(Config.buildandprice.urls.viewPDFURL + vehicleName + params);
	};

	Events.eventList.buildandprice.model.ShareConfigEvent.handler = function() {
		dataLoader.userPref.url = Config.buildandprice.urls.shareURL;
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
                  
		dataLoader.userPref.save().done(function(model, response) {
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			Events.fireEvent(Events.eventList.buildandprice.router.ShareReadyEvent, model.url);
		}).fail(function() {
			Events.fireEvent(Events.eventList.buildandprice.model.ErrorOccuredEvent.name);
		});
	};

	Events.eventList.buildandprice.model.RequestAQuoteEvent.handler = function(formId) {
		var colorCollection = dataLoader.colors();
		var color = colorCollection.getSelected();
		var trim = color.get('trims').getSelected();
		
		var nameplateCollection = dataLoader.nameplates();
		var nameplate = nameplateCollection.getSelected();
		
		var derivative = dataLoader.derivativeDetails();
		var engineName = '';
		var engineId  = '';
		var packageId = '';
		dataLoader.getSelectedPackageDerivative(
		 {
			pkgCallback:function(pkg) {
				engineName = derivative.get('engineTransmission');
				engineId = derivative.get('engineId');
				packageId = derivative.get('id');
			}, 
			drvCallback : function(drv) {
				var derivativeCollection = dataLoader.derivatives();
				var engine = derivativeCollection.getSelected().get('engines').getSelected();
				engineName = engine.get('name');
				engineId = engine.get('id');
			}
		});
		
		var data = {
			makeckscode : nameplate.get('makeCode'),
			makeid : nameplate.get('makeId'),
			makename: nameplate.get('makeName'),
			
			modelckscode: nameplate.get('modelCode'),
			modelid: nameplate.get('id'),
			modelname: nameplate.get('name'),
			
			pricezoneid: dataLoader.userPref.get('priceZoneId'),
			
			derivativeyear: derivative.get('year'),
			
			derivativeckscode: derivative.get('derivativeCode'),
			derivativename: derivative.get('name'),
			
			enginename: engineName,
			engineid: engineId,
			
			colourname: color.get('name'),
			trimname: trim.get('name'),
			colourid: color.get('id'),
			trimid: trim.get('id'),
			//[SOHRAB] why do we need to check for uniqueness of features. if they are not unique, then there is a bug somewhere
			//and we should fix it.
			//features: _.uniq(dataLoader.userPref.get('features')).join(',')
			features: dataLoader.userPref.get('features').join(',')
		};
		//construct the ctx parameter.
		var ctx = 'm:' + data.modelid + ';';
		if (packageId !== '') {
			data.packageid = packageId;
		} else {
			data.derivativeid = derivative.get('id');
			ctx += 'd:' + data.derivativeid;
		}
		var postcode = dataLoader.userPref.get('postcode');
		if (ConfigUtil.showPostcodeSelect() && postcode !== '') {
			data.postcode = postcode;
			data.usage = dataLoader.userPref.get('usage');
		}
		
		$.each(data, function(key) {
			$('#bp-rq-' + key).val(data[key]);
		});
		var site = dataLoader.userPref.get('site');
		var form = $(formId);
		if (site && site === 'FMX') {
			var action = form.attr('action');
			action += ('&cat=' + data.derivativeckscode + 
					   '&opc=Color Exterior - ' + data.colourname + ', Color Interior -' + data.trimname);
			form.attr('action', action);
		}
		//append ctx parameter
		form.attr('action', form.attr('action') + '&ctx=' + ctx);
		
		form.submit();
			
	};

	if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
		Events.eventList.buildandprice.model.PresentPaymentEvent.handler = function(formId) {

			var nameplateCollection = dataLoader.nameplates();
			var nameplate = nameplateCollection.getSelected();
			
			//construct the ctx parameter.
			var submitBtn = $("#bp-payment-presenter-btn");
			var currentUrl = submitBtn.data("url");
			var separator = (currentUrl.indexOf("?")===-1)?"?":"&";
			var ctx = 'm:' + nameplate.get('id');
			
			var newUrl = currentUrl + separator + "ctx=" + encodeURIComponent(ctx);
			
			window.location.href = newUrl;
		};
	}
	

	Events.eventList.buildandprice.model.ShareLinkClickedEvent.handler = function(provider) {
	//				Analytics.trackOmnitureAction.call(this, 'ShareLink', provider);
	//				Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ShareLink', value: provider});
	    Events.fireEvent(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, { provider: provider, storage: dataLoader.storage.storageModel });
	};
	
	var registerEvents = function() {
		
		Events.bind(Events.eventList.buildandprice.model.SaveAsPDFEvent.name,
				Events.eventList.buildandprice.model.SaveAsPDFEvent.handler, this);
		
		Events.bind(Events.eventList.buildandprice.model.ShareConfigEvent.name,  
				Events.eventList.buildandprice.model.ShareConfigEvent.handler, this);
		
		
		Events.bind(Events.eventList.buildandprice.model.RequestAQuoteEvent.name, 
				Events.eventList.buildandprice.model.RequestAQuoteEvent.handler, this);
		
		if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
			Events.bind(Events.eventList.buildandprice.model.PresentPaymentEvent.name, 
					Events.eventList.buildandprice.model.PresentPaymentEvent.handler, this);
		}


		Events.bind(Events.eventList.buildandprice.view.ShareLinkClickedEvent, 
				Events.eventList.buildandprice.model.ShareLinkClickedEvent.handler, this);
		
		return publicMethods;
	};
	
	var fetchPolkPrice = function(data) {
		//console.log('fetchPolkPrice()');
		$.ajax({
			dataType: 'json',
			url:Config.buildandprice.urls.driveawayURL + '&data=' + JSON.stringify(data),
			success: function(result, textStatus, jqXHR) {
				if (result.error === false) {
					if (result.derivatives && result.derivatives.length > 0) {
						var polkPrice = dataLoader.userPref.totalWithPOLK(result.derivatives[0].price);
						dataLoader.userPref.set('unformattedPolkPrice', polkPrice);
						dataLoader.userPref.set('polkPrice', ND.PriceFormatter.format(polkPrice.toString()));
						options.footer.set('hasError', false);
					}
				} else {
					options.footer.set('hasError', true);
					dataLoader.userPref.set('unformattedPolkPrice', null);
					dataLoader.userPref.set('polkPrice', result.errorMessage);
				}
				
				data.callback();
			},
			error: function (request, error) {
				//ignore?	
				options.footer.set('hasError', true);
				dataLoader.userPref.set('polkPrice', Constants.bpt.errorCalcPrice);
				dataLoader.userPref.set('unformattedPolkPrice', null);
				data.callback();
			}
		});
	};
	
	var go = function() {
		
		Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
		options.isLoadingConfig = (typeof options.isLoadingConfig !== 'undefined') ? options.isLoadingConfig : false;
		options.showPricesLater = (typeof options.showPricesLater !== 'undefined') ? options.showPricesLater : false;
		options.step = Constants.state.SUMMARY;
		options.footer = dataLoader.footer(options);
		
		//console.log('usePolkPricing for path: ' + options.path + ' ' + ConfigUtil.usePolkPricing(options.path));
		if (ConfigUtil.usePolkPricing(options.path)) {
			
			var tmpPostcode= dataLoader.userPref.get('tempPostcode');
			var tmpUsage = dataLoader.userPref.get('tempUsage');
			var postcode = dataLoader.userPref.get('postcode');
			var usage = dataLoader.userPref.get('usage');
			if (tmpPostcode != postcode || tmpUsage != usage) {
				
				var postcodeHint = Constants.bpt.postcodeMisMatch;
				if (tmpPostcode === undefined || tmpPostcode == null || tmpUsage === undefined ||
					tmpUsage == null || tmpPostcode === '') {
					postcodeHint = postcodeHint.replace(/%1/g, Constants.bpt.regionNotSpecified)
					.replace(/%2/g, '');
				} else {
					postcodeHint = postcodeHint
					.replace(/%1/g, tmpPostcode)
					.replace(/%2/g, BnP.CommonHelper.getUsageLabelFromLabel(tmpUsage));
				}
				if (postcode === undefined || usage === undefined || 
					postcode == null || usage == null || postcode === '') {
					postcodeHint = postcodeHint.replace(/%3/g, Constants.bpt.yourRegionNotSpecified).replace(/%4/g, '');
				} else {
					postcodeHint = postcodeHint
					.replace(/%3/g, postcode)
					.replace(/%4/g, BnP.CommonHelper.getUsageLabelFromLabel(usage));
				}
				
				options.footer.set("postcodeHint", postcodeHint);
			}
			
			if (typeof tmpPostcode === 'undefined') {
				options.footer.set("postcodeHint", null);
			}
			
			var userJSON = dataLoader.userPref.toJSON();
			tmpPostcode = (typeof tmpPostcode !== 'undefined')  ? tmpPostcode : null;
			tmpUsage = (typeof tmpUsage !== 'undefined') ? tmpUsage : null;
			var data = {
				'postcode' : userJSON.postcode,
				'usage' : userJSON.usage,
				'options' : dataLoader.userPref.totalOptionsForPOLK(),
				'engineid' : userJSON.engineId,
				'derivatives' : new Array(userJSON.derivativeId)
			};
			if (tmpPostcode != null && tmpUsage != null) {
				data.postcode = tmpPostcode;
				data.usage = tmpUsage;
			}
			dataLoader.userPref.unset('tempPostcode'); //remove these attributes
			dataLoader.userPref.unset('tempUsage');
			
			if (data.postcode != null && data.postcode !== '' && data.usage != null && data.usage !== '') {
				data.callback = display;
				fetchPolkPrice(data);
			} else {
				options.footer.set('hasError', true);
				dataLoader.userPref.set('polkPrice', Constants.bpt.selectRegionToViewPrices);
				dataLoader.userPref.set('unformattedPolkPrice', null);
				display();
			}
			
		} else {
			display();
		}
	};
	
	var display = function() {
		options.footer.set('id', options.derivativeId);
		options.footer.set('priceZoneId', dataLoader.pricezoneId());
		options.footer.set('isPackage', options.path === Constants.path.pkg);
		var color = dataLoader.colors().getSelected();
		options.footer.set('vehicleThumbnailUrl', color.get('thumbnailUrl'));
//		var nameplateId = dataLoader.nameplates().getSelected().get('id');
//		this.updateHeader(Constants.state.CUSTOMIZE_DERIVATIVE, Helper.constructStepUrl.call(this,
//				{step: Constants.state.CUSTOMIZE_DERIVATIVE,
//				 modelId : modelId,
//				 path: path,
//				 derivativeId : derivativeId}));
//		this.updateHeader(Constants.state.SUMMARY, Helper.constructStepUrl.call(this, 
//				{step : Constants.state.SUMMARY, 
//				 modelId : modelId,
//				 path: path,
//				 derivativeId: derivativeId}));
		
//		this.updateFooter();
		var summaryCategories = new collections.SummaryCategoryCollection();
		var categoryGroupCollection = dataLoader.categoryGroups();
		var trim = color.get('trims').getSelected();
		var colorTrimPrice = parseFloat(color.get('price')) + parseFloat(trim.get('price'));
		var categorySummary = new models.SummaryCategory({category : Constants.bpt.ct, 
													  categoryTotal : ND.PriceFormatter.format(colorTrimPrice.toString()), 
													  order : 1});
		var summaryFeatures = new collections.SummaryFeatureCollection();
		summaryFeatures.add(new models.SummaryFeature({name : color.get('name'), price : ND.PriceFormatter.format(color.get('price')), nameSuffix : Constants.priceSuffix.colour}));
		summaryFeatures.add(new models.SummaryFeature({name : trim.get('name'), price : ND.PriceFormatter.format(trim.get('price'))}));
		categorySummary.set(Constants.attr.feats, summaryFeatures);
		summaryCategories.add(categorySummary);
		BnP.CommonHelper.postProcessCategoryGroups(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, dataLoader.userPref.get(Constants.attr.feats));
		updateFooter();
		
		var panelData = dataLoader.panel({state: Constants.state.SUMMARY, modelId: options.modelId,  path: options.path,
			 derivativeId : options.derivativeId, 
			 engineId: options.engineId});
		
		var gallery = dataLoader.gallery();
		if (dataLoader.currentGalleryView() !== Constants.view.exterior) {
			var colorCollection = dataLoader.colors(),
			selectedColor = colorCollection.getSelected();
			gallery.get('gallery').toggleLayer(selectedColor.id);
		}
		
		var headerCollection = BnP.CommonHelper.isPackagePath(options.path) ? dataLoader.packages() : dataLoader.derivatives();

		viewManager.page()
		.summary(options.footer, summaryCategories, gallery, dataLoader.hotdeal())
		.panel(panelData)
		.header(dataLoader.header({
			name: headerCollection.getSelected().get('name'),
			panel: panelData
		})).go();
		
//		viewManager.displayParentView(views.Summary, footer);
//		displayHeadersView(nameplateId, options.path);
//		viewManager.displayTitleView(new models.PageTitleModel({title: null,
//				showLatestOffersBtn: (ConfigUtil.showPostcodeSelect() && (options.path !== Constants.path.pkg))}));
		
		//update customize derivative header as well to fix reload configuration navigation error.
		
//		viewManager.displayChildView(views.BackButtonView, footer);
//		viewManager.displayChildView(views.PriceCategoryBreakdownListView, summaryCategories);
		
		
		
		
		Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent, 
				{ state: Constants.state.SUMMARY, path: options.path, storage: dataLoader.storage.storageModel, userPref: dataLoader.userPref });
		if (options.askForPostcodeLater && ConfigUtil.showPostcodeSelect()) {
			Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, true);
		}
		if (options.showPricesLater && ConfigUtil.showPrices()) {
			Events.fireEvent(Events.eventList.buildandprice.router.ShowPricesLaterEvent);
		}
		Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
	};
	
	var updateFooter = function(){
//		switch(step) {
//			case Constants.state.SELECT_ENGINE:
//				if (engines && engines != null) {
//					selectedEngine = engines.getSelected();
//					engineSelected = selectedEngine != null;
//					if (engineSelected) {
//						engineName = selectedEngine.get('name');
//					}
//				}
//				//NO break;
//			case Constants.state.SELECT_DERIVATIVE: 
//			case Constants.state.SELECT_PACKAGE: 
//				var self = this;
//				this.getSelectedPackageDerivative(
//					this.storage,{
//					pkgCallback: function(pkg) {
//						nextButtonPath = Helper.constructStepUrl.call(self,
//																	 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
//																	  path: Constants.path.pkg, 
//																	  derivativeId : pkg.get('id'),
//																	  modelId : modelId});
//						engineName = pkg.get('engineTransmission');
//						engineSelected = true;
//						//price has to match the selected package and need to say from x price
//						price = Constants.bpt.f + pkg.get('displayPrice');
//						vehicleName = pkg.get('name');
//					}, 
//					drvCallback : function(drv) {
//						nextButtonPath = Helper.constructStepUrl.call(self,
//																	 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
//							 										  path: Constants.path.drv, 
//							 										  derivativeId : drv.get('id'),
//																	  modelId : modelId});
//						vehicleName = drv.get('name');
//						//price has to match the selected derivative and need to say from x price
//						if (engineSelected) {
//							price = Constants.bpt.f + ND.PriceFormatter.format(selectedEngine.get('price').toString());
//						} else {
//							price = Constants.bpt.f + drv.get('displayPrice');
//						}
//					}
//				});
//				var prevPageLabel = null;
//				var prevButtonPath = null;
//				if (!ConfigUtil.isShortPath()) {
//					prevPageLabel = 'bpt-path-sel';
//					prevButtonPath = Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PATH, modelId: modelId});
//				}
////				Util.log('prevButtonPath: ' + prevButtonPath + ' prevPageLabel:' + prevPageLabel);
//				footer.update(vehicleName,
//						  price,
//						  engineName,
//						  engineSelected,
//						  nextButtonPath,
//						  prevButtonPath,
//						  Constants.header.c, 
//						  prevPageLabel);
//				break;	
//			case Constants.state.CUSTOMIZE_DERIVATIVE: 
//			case Constants.state.SUMMARY:	
				
//				var models = nameplates();
				var engines = null;
				var price = ND.PriceFormatter.format('0');
				var path;
				dataLoader.getSelectedPackageDerivative({
					pkgCallback:function(pkg) {
						path = Constants.path.pkg;
					}, 
					drvCallback: function(drv) {
						engines = drv.get('engines');
						path = Constants.path.drv;
					}
					});
				price = ND.PriceFormatter.format(dataLoader.userPref.total().toString());
				
				//console.log('userPref price is ' + price);
				
//				var selectedEngine = null, 
				var selectedModel = dataLoader.nameplates().getSelected();
				var engineName = '';
//				var nextButtonPath = '';
//				var engineSelected = false;
//				var vehicleName = '';
//				var selectedPathValue;
				var modelId = selectedModel.get('id');
//				Util.log('updateFooter: ' + step);
				
				var selectedDerivative,	isEngineSelected = false,
					//nextTabLabel = null,
//					prevTabLabel = null;
					//,nextTabHref = null,prevTabHref = null;
				selectedPathValue = Constants.path.pkg;
				prevTabLabel = Constants.bpt.packageSelect;
				dataLoader.getSelectedPackageDerivative({
					pkgCallback: function(pkg) {
						isEngineSelected = true;
						selectedDerivative = pkg;
						engineName = selectedDerivative.get('engineTransmission');
					}, 
					drvCallback: function(drv) {
						selectedPathValue = Constants.path.drv;
						var selectedEngine = engines.getSelected();
						isEngineSelected = (selectedEngine != null);
						selectedDerivative = drv;
						prevTabLabel = Constants.bpt.derivativeSelect;
						engineName = isEngineSelected ? selectedEngine.get('name') : '';
					}
				});
				
//				var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
//				if (step === Constants.state.CUSTOMIZE_DERIVATIVE) {
//					var currentTab = parseInt(categoryGroups.getSelected().get('order'));
//					
//					var nextTab = null;
//					var prevTab = null;
//					if ((currentTab + 1) < categoryGroups.length) {
//						nextTab = (currentTab + 1);
//						nextTabLabel = categoryGroups.at(nextTab).get('categoryGrouping');
//						nextTabHref = 'cat-group-' + nextTab;
//					} else {
//						nextTabHref = Helper.constructStepUrl.call(this,
//									{step: Constants.state.SUMMARY,
//									path: selectedPathValue,
//									derivativeId: selectedDerivative.get('id'),
//									modelId: modelId});
//						nextTabLabel = 'bpt-summary';
//					}
//					
//					if ((currentTab - 1) >= 0) {
//						prevTab = (currentTab - 1);
//						prevTabLabel = categoryGroups.at(prevTab).get('categoryGrouping');
//						prevTabHref = 'cat-group-' + prevTab;
//					} else {
//						prevTabHref = Helper.constructStepUrl.call(this,
//								{step: Constants.state.SELECT_PACKAGE, 
//								 path: selectedPathValue,
//								 modelId: modelId});
//								
//					}
////				} else { //Constants.state.SUMMARY
//					prevTabLabel = categoryGroups.at(0).get('categoryGrouping');
//					prevTabHref = Helper.constructStepUrl.call(this,
//							{step: Constants.state.CUSTOMIZE_DERIVATIVE, 
//							 path: selectedPathValue, 
//							 derivativeId : selectedDerivative.get('id'),
//							 modelId: modelId});
					if (ConfigUtil.showPostcodeSelect() && Constants.path.drv === path) {
						price = dataLoader.userPref.get('polkPrice');
						//console.log('polkPrice in userPref is ' + price);
					};
//				}
					
				options.footer.update(selectedDerivative.get('name'),
					  price,
					  engineName,
					  isEngineSelected
//					  ,
//					  nextTabHref,
//					  prevTabHref,
//					  nextTabLabel,
//					  prevTabLabel
					  );
//				break;
//			case Constants.state.SELECT_PATH:
//				break;
//			default : 
//				console.log('unknown step ' + step);
//		}
	};
	
	var updateOptions = function(newOptions) {
		options = newOptions;
	};
	
	var publicMethods = {
		registerEvents: registerEvents,
		updateOptions: updateOptions,
		go: go
	};
	
	return publicMethods;
	
};