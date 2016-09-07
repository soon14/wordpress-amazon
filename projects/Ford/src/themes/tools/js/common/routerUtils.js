/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Constants = {
			
	storage: {	
		nameplateCollection:	'nameplateCollection',
		packageCollection: 'packageCollection',
		derivativeDetailsModel: 'derivativeDetailModel',
		colorCollection: 'colorCollection',
		categoryGrpCollection: 'categoryGroupCollection',
		galleryCollection: 'galleryCollection',
		pricezoneCollection: 'pricezoneCollection',
		footerModel: 'footerModel',
		headerCollection: 'headerCollection',
		panelCollection: 'panelCollection', //mobile
		headerModel: 'headerModel', //mobile
		pathCollection:'pathCollection',
		derivativeCollection: 'derivativeCollection',
		hotdealCollection: 'hotdealCollection'
	},
	
	state: {
		//DO NOT MESS WITH THESE NUMBERS
		SELECT_NAMEPLATE: 0,
		SELECT_PATH: 1,
		SELECT_PACKAGE: 2,
		SELECT_DERIVATIVE: 2,
		SELECT_ENGINE: 3,
		CUSTOMIZE_DERIVATIVE: 4,
		SUMMARY: 5,
		NO_STATE : -99
	},
	
	analytics: {
		colorTrim : 'colour trim'
	},
	
	postcode: {
		hd: 'hotDeals',
		ot: 'other',
		non: 'none'
	},
	
	view: {
		exterior: 'exterior',
		interior: 'interior'
	},
	
	attr : {
		feats: 'features',
		catgs: 'categories'
	},
	
	values : {
		standard: 'Standard',
		optionPack : 'Option Pack',
		mutuallyExclusiveOptions : 'Mutually Exclusive Options'
	},
	
	header: {
		spa: Translator.translate('bpt-step-path'),
		sm : Translator.translate('bpt-step-model'),
		sp : Translator.translate('bpt-step-package'),
		selectEngine : Translator.translate('bpt-step-engine'), //mobile
		selectColor : Translator.translate('bpt-step-color'), //mobile
		sc: Translator.translate('bpt-step-customize'),
		ss: Translator.translate('bpt-step-summary'),
		sl: Translator.translate('bpt-your-location'),
		c:	Translator.translate('bpt-customize'),
		p:	Translator.translate('bpt-path-sel')
	},
	
	cookie : {
		pzid : 'priceZoneId'
	},
	
	bpt : {
		s1:Translator.translate('bpt-step1'),
		s2:Translator.translate('bpt-step2'),
		s3:Translator.translate('bpt-step3'),
		s4:Translator.translate('bpt-step4'),
		ct: Translator.translate('bpt-colors-trims'),
		av: Translator.translate('bpt-all-vehicles'),
		ssm: Translator.translate('bpt-step-select-model'),
		pc: Translator.translate('bpt-postcode'),
		cp: Translator.translate('bpt-choose-package'),
		chp: Translator.translate('bpt-choose-path'),
		chm: Translator.translate('bpt-choose-model'),
		chooseEngine: Translator.translate('bpt-choose-engine'),
		czp: Translator.translate('bpt-customized-pkg'),
		sczp:Translator.translate('bpt-start-customised-package'),
		summary:Translator.translate('bpt-summary'),
		ppi: Translator.translate('bpt-path-package-instruction'),
		byon:Translator.translate('bpt-build-your-own'),
		byot: Translator.translate('bpt-byo'),
		f: (Translator.translate('bpt-from') + ' '),
		pbyoi: Translator.translate('bpt-path-byo-instruction'),
		sv: Translator.translate('bpt-no-vehicle-aval'),
		cl: Translator.translate('bpt-select-vehicle-location'),
		czpk: Translator.translate('bpt-customize-package'),
		czm: Translator.translate('bpt-customize-model'),
		et: Translator.translate('bpt-error-title'),
        close: Translator.translate('bpt-close'),
		noCostOption: Translator.translate('bpt-no-cost-option'),
		latestOffersInstructions: Translator.translate('bpt-latest-offer-inst'),
		errorCalcPrice: Translator.translate('bpt-error-calc-price'),
		postcodeMisMatch: Translator.translate('bpt-postcode-mismatch'),
		selectRegionToViewPrices: Translator.translate('bpt-select-region-to-view-prices'),
		regionNotSpecified: Translator.translate('bpt-region-not-specified'),
		yourRegionNotSpecified: Translator.translate('bpt-your-region-not-specified'),
		mlp: Translator.translate('bpt-mlp'),
		rrp: Translator.translate('bpt-rrp'),
		featurePartOfOptionPack :  Translator.translate('bpt-feature-partof-optionpack'),
		featurePartOfDependentFeature :  Translator.translate('bpt-feature-partof-depenendent-feature'),
		featurePartOfMutualExclusive :  Translator.translate('bpt-same-featuretype-selected'),
		derivativeSelect: Translator.translate('bpt-derivative-sel'),
		packageSelect: Translator.translate('bpt-package-sel'),
		errorProcessingData : Translator.translate('bpt-error-processing-data'),
		showDisclaimer:  Translator.translate('bpt-show-summary-disclaimer'),
		hideDisclaimer:  Translator.translate('bpt-hide-summary-disclaimer')
	},
	
	priceSuffix : {
//		nameplate : Translator.translate('btp-nameplate-price-suffix'),
//		derivative : Translator.translate('btp-derivative-price-suffix'),
//		engine : Translator.translate('btp-engine-price-suffix'),
//		hotdeal : Translator.translate('btp-hotdeal-price-suffix'),
//		pkg : Translator.translate('btp-package-price-suffix'),
		colour : Translator.translate('btp-colour-price-suffix'),
//		trim : Translator.translate('btp-trim-price-suffix'),
		featureRRP : Translator.translate('btp-feature-rrp-price-suffix'),
		featureMLP : Translator.translate('btp-feature-mlp-price-suffix')
	},
	
	path: {
		pkg: 'package',
		drv: 'derivative',
		pth: 'path',
		nxt: 'next'
	},
	
	comparatorStorage: {	
		nameplateCollection: 'nameplateCollection',
		pricezoneCollection: 'pricezoneCollection',
		derivativeCollection:'derivativeCollection',
		comparisonChart: 'comparisonChart',
		comparableDerivativeCollection : 'comparableDerivativeCollection',
		nameplateContainer: 'nameplateContainer'
	}, 
	
	ct : {
		limitReached : Translator.translate('ct-limit-reached')
	}
};

var Util = {
	
	cookie : {
		root: 'build.n.price',
		expiry: 14,
		
		save: function(key, value) {
			if ($.cookie) {
				//Util.log('saving [' + key + ' : ' + value + '] to cookie ');
				$.cookie(Util.cookie.root + key, value, {expires: 14});
			}
		},
		
		load: function(key) {
			var value = null;
			if ($.cookie) {
				value = $.cookie(Util.cookie.root + key);
				//Util.log('found value [' + value + ' for key: ' + key + ']');
			}
			return value;
		},
		
		remove : function(key) {
			if ($.cookie) {
				$.cookie(Util.cookie.root + key, null);
				//Util.log('found value [' + value + ' for key: ' + key + ']');
			}
		}
	},
	
	log : function(msg) {
		if (SiteConf.dev) {
			console.log(msg);
		}
	},
	
	dir : function(obj) {
		if (SiteConf.dev) {
			console.dir(obj);
		}
	}
	
};

var ConfigUtil = {
	isShortPath: function() {
		return Config.buildAndPriceType === 'short';
	},
	
	showPostcodeSelect: function() {
		return Config.showPostcodeSelect && !ConfigUtil.isShortPath();
	},
	
	usePolkPricing: function(path) {
		return this.showPostcodeSelect() && Constants.path.drv === path;
	},
	
	showPrices: function() {
		return Config.showPrices === true;
	},
	
	showNameplateSegments : function() {
		return Config.buildAndPriceShowVehicleSegments;
	},
	
	showPricezones: function() {
		return Config.showPriceZoneSelect === true;
	}
};