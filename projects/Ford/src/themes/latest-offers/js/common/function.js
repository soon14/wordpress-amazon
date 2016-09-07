//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.addCommas.								//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.addCommas = function(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1))
	{
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};// End of ND.LO.Functions.addCommas.



//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.OfferDetailPageUrlsLocator.		    	//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.OfferDetailPageUrlsLocator = function(derRegion) {
	if (typeof ND.LO.OfferDetailPageUrls === 'undefined') {
		var $offerDetailPageUrlsData = $('#Offer-Detail-Page-Urls');
		if ($offerDetailPageUrlsData.length > 0) {
			//console.log('Latest Offers config was found');
			ND.LO.OfferDetailPageUrls = JSON.parse($offerDetailPageUrlsData.html());
		} else {
			//console.log('offerDetailPageUrlsData was NOT found');
		}
	}
	return ND.LO.OfferDetailPageUrls[derRegion];
};// End of OfferDetailPageUrlsLocator.

//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.serviceLocator.							//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.serviceLocator = function(service) {
	if (typeof ND.LO.Config === 'undefined') {
		
		var $configData = $('#rest-services');
		if ($configData.length > 0) {
			//console.log('Latest Offers config was found');
			ND.LO.Config = JSON.parse($configData.html());
		} else {
			//console.log('Latest Offers config was NOT found');
		}
	}
	//{site}/{priceZone}{categoryids}
	// if checks.
	var url = ND.LO.Config[service];

	if ( url.indexOf('{site}') > -1 )
	{
		url = url.replace('{site}', ND.LO.Functions.commonConfig().site);
	}

	if ( url.indexOf('{priceZone}') > -1 )
	{
		url = url.replace('{priceZone}', ND.LO.Functions.commonConfig().priceZone);
		//url = url.replace('{priceZone}', '1137384063721');
	}

	if ( url.indexOf('{region}') > -1 )
	{
		var region = ND.LO.Functions.loadRegion();
		if (region)
		{
			url = url.replace('{region}', region);
		}
	}

	if ( url.indexOf('{categoryids}') > -1 )
	{
		url = url.replace('{categoryids}', ND.LO.Functions.derivativeCategory());
	}

	if ( url.indexOf('{tools}') > -1 )
	{
		url = url.replace('{tools}', ND.LO.Functions.commonConfig().tools);
	}
	if ( url.indexOf('{postcode}') > -1 )
	{
		if(JSON.stringify(ND.LO.Functions.getCookie()) != "{}" && typeof ND.LO.Functions.getCookie()["region"] !== 'undefined')
		{
			url = url.replace('{postcode}', ND.LO.Functions.getCookie()["postcode"]);
		}
	}
	
	return url;
};

//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.commonConfig.							//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.commonConfig = function() {
	if (typeof ND.LO.Variables.commonConfig === 'undefined') {
		
		var $commonConfigData = $('#common-config');
		if ($commonConfigData.length > 0) {
			//console.log('Latest Offers config was found');
			ND.LO.Variables.commonConfig = JSON.parse($commonConfigData.html());
		} else {
			//console.log('Latest Offers common-config was NOT found');
		}
	}
	return ND.LO.Variables.commonConfig;
};

//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.getErrorMessages.							//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.getErrorMessages = function() {

	var msg = {notFoundMessage: "No Record Found."};
	var $errorMessagesData = $('#error-messages');
	if ($errorMessagesData.length > 0) {
		//console.log('Latest Offers error-messages was found');
		msg = JSON.parse($errorMessagesData.html());
	} else {
		//console.log('Latest Offers error-messages was NOT found');
	}
	return msg;
};// End of function:getErrorMessages

//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.derivativeCategory.						//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.derivativeCategory = function() {

	if (typeof ND.LO.Variables.categoryids === 'undefined') {
		var $derivativeCategoryData = $('#derivative-category');
		if ($derivativeCategoryData.length > 0) {
			//console.log('Latest Offers config was found');
			ND.LO.Variables.categoryids = JSON.parse($derivativeCategoryData.html());
		} else {
			//console.log('Latest Offers derivative-category was NOT found');
		}
	}
	
	var categoryid = [];
	for (var i in ND.LO.Variables.categoryids)
	{
		 categoryid.push(ND.LO.Variables.categoryids[i]['id']);
	}
	return categoryid.join(",");
};

//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.loadRegion.								//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.loadRegion = function() {
	if (typeof ND.LO.Variables.regionId === 'undefined')
	{
		//debugger;
		if(JSON.stringify(ND.LO.Functions.getCookie()) != "{}" && typeof ND.LO.Functions.getCookie()["regionId"] !== 'undefined')
		{
			//var postcode = ND.LO.Functions.getCookie()["postcode"];
			//alert(postcode);
			ND.LO.Variables.regionId = ND.LO.Functions.getCookie()["regionId"];
		}
		else
		{
			var regionVar = ND.LO.Functions.loadUrlRegion();
			if (regionVar && typeof regionVar['regionId'] !== 'undefined')
			{
				ND.LO.Variables.regionId = regionVar['regionId'];
			}
			else
			{
				ND.LO.Variables.regionId = false;
			}
		}
	}
	return ND.LO.Variables.regionId;
}; // End of ND.LO.Functions.loadRegion.

ND.LO.Functions.loadUrlRegion = function() {
	if (typeof ND.LO.Variables.urlRegion === 'undefined')
	{
		var params = {
					url: window.location.href,
					latestoffers2flag: 'Y'
				};
		$.ajax({
			url: ND.LO.Functions.serviceLocator("xhr-hotdeals-data"),
			//crossDomain: true,
			//contentType:"application/json; charset=UTF-8",
			dataType: "json",
			cache: true,
			data: params,
			success: function(data) {
				//debugger;
				if (data.url && data.regionId)
				{
					if (window.location.href != data.url)
					{
						window.location.href = data.url;
					}
					ND.LO.Variables.urlRegion = data;
				}
				else
				{
					if (data.error)
					{
						ND.LO.Variables.urlRegion = false;
					}
				}
			},
			error: function(e) {
				ND.LO.Variables.urlRegion = false;
			},
			statusCode: {
			404: function() {
					ND.LO.Variables.urlRegion = false;
				}
			},
			async: false
		})
	}
	return ND.LO.Variables.urlRegion;
}; // End of loadUrlRegion.


ND.LO.Functions.loadCookie=function(completeCallback){
	var loCookie = $.cookie(ND.LO.Constants.COOKIE_NAME);
	var loData=((typeof loCookie === 'undefined') || (loCookie == null)) ? {}  : JSON.parse(loCookie);
	var spData={};

	function spDataPubSubHandler(e,retriveData){
		spData=retriveData;
	}
	$.publish( "shopping.pref.retrieve", spDataPubSubHandler); 

	if(!$.isEmptyObject(spData) && spData && spData.postcode){
		if(!$.isEmptyObject(loData) && loData.postcode!=spData.postcode){
			loData.postcode=spData.postcode;
			ND.LO.Functions.saveInCookie(loData);
			if(completeCallback && $.isFunction(completeCallback)){
				completeCallback();
			}
		}
		else if($.isEmptyObject(loData)){
			var params={
				url: window.location.href,
				latestoffers2flag:'Y',
				postcode:spData.postcode
			};
			$.ajax({
				url: ND.LO.Functions.serviceLocator("xhr-hotdeals-data"),
				dataType: "json",
				data: params,
				success: function(data) {
					if(data.url){
						ND.LO.Functions.saveInCookie($.extend(data, {postcode: spData.postcode}));						
					}
					if(completeCallback && $.isFunction(completeCallback)){
						completeCallback();
					}
				},
				error:function(){
					if(completeCallback && $.isFunction(completeCallback)){
						completeCallback();
					}
				}
			});
		}
		else{
			if(completeCallback && $.isFunction(completeCallback)){
				completeCallback();
			}
		}
	}
	else{
		if(completeCallback && $.isFunction(completeCallback)){
			completeCallback();
		}
	}	
};
//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.getCookie.								//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.getCookie = function() {
	//debugger;
	var loCookie = $.cookie(ND.LO.Constants.COOKIE_NAME);
	return ((typeof loCookie === 'undefined') || (loCookie == null)) ? {}  : JSON.parse(loCookie);	
};

//////////////////////////////////////////////////////////////////////
//function: ND.LO.Functions.saveInCookie.								//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.saveInCookie = function(object) {
	//debugger;
	//var loCookie = this.getCookie();
	//$.cookie(ND.LO.Constants.COOKIE_NAME, JSON.stringify($.extend(loCookie, object)), { path: '/', expires: 30 });
	$.cookie(ND.LO.Constants.COOKIE_NAME, JSON.stringify(object), { path: '/', expires: 30 });
	if(object && object.postcode){
		$.publish( "shopping.pref.save", {postcode:object.postcode} );
	}
};
//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.loadOfferDetailsOffers.    		        //
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.loadOfferDetailsOffers = function() {
	//console.log('Function Call: ND.LO.Functions.loadOfferDetailsOffers');
	//debugger;
	var $isOffersDetail = $('#offers-detail-area-template');
	if ($isOffersDetail.length > 0) 
	{//debugger;
		if (ND.LO.Variables.offerDetailsOffers.length == 0)
		{//debugger;
			$.ajax({
				url: ND.LO.Functions.serviceLocator("offersURL"),
				//crossDomain: true,
				contentType:"application/json; charset=UTF-8",
				dataType: "json",
				cache: true,
				success: function(data) {
					//debugger;
					//var retJSONArray = jQuery.parseJSON( JSON.stringify(data) );
					//var viewOffersMarkup = $("#offers-detail-area-template").html();
					//var viewOffersTemplate= _.template($('#offers-detail-area-template').html());
					//$.template("viewOffersTemplate", viewOffersMarkup);
					//$.tmpl("viewOffersTemplate",data).appendTo( "#offersDetailContainer");

					var template = _.template($('#offers-detail-area-template').html());
					//$('#offersDetailContainer').html( template( _.extend( {}, data.HotDeals) ) );
					//$('#offersDetailContainer').html( template( data) );

					var $hotDealDetail = $('#hot-deal-detail');
					if ($hotDealDetail.length > 0) 
					{
						var hotDeal = JSON.parse($hotDealDetail.html());
						//alert(hotDeal["HotDealId"]);
						//ND.LO.Variables.offerDetailsOffers = _.filter(data.HotDeals, function(item) {return item.id !== "'+hotDeal['HotDealId']+'"});
						var currentOfferFilter = _.filter(data.HotDeals, function(item) {return item.id !== ''+hotDeal['HotDealId']+''});
						var nameplateFilter = _.filter(currentOfferFilter, function(item) {if (typeof item.nameplatename != 'undefined'){return item.nameplatename === ''+hotDeal['nameplatename']+'';}});
						//debugger;
						if (nameplateFilter.length < 5)
						{
							var vehicleCategoryFilter = _.filter(currentOfferFilter, function(item) {if (typeof item.vehicleCategory != 'undefined'){return item.vehicleCategory === ''+hotDeal['vehicleCategory']+'';}});
							
							if (vehicleCategoryFilter.length < 5)
							{
								ND.LO.Variables.offerDetailsOffers = currentOfferFilter;
							}
							else
							{
								ND.LO.Variables.offerDetailsOffers = vehicleCategoryFilter;
							}
							
							
						}
						else
						{
							ND.LO.Variables.offerDetailsOffers = nameplateFilter;
						}
						//
						//ND.LO.Variables.offerDetailsOffers = data.HotDeals;
					}
					else
					{
						ND.LO.Variables.offerDetailsOffers = data.HotDeals;
					}
					var tempOffers = ND.LO.Functions.loadOffers(ND.LO.Variables.offerDetailsOffers);

					//ND.LO.Variables.offerDetailsOffers = [data.HotDeals[0], data.HotDeals[1]];
					$('#offersDetailContainer').html(template({HotDeals: _.extend( {}, tempOffers)}));
					$("#defaultSort").addClass("active");

					//var tempObj = {HotDeals: [{nameplatename:'dawood', indexImageThumbnailUrl:'media/img9.png', differentiatorlabel1:'asdasdsd', differentiatorlabel2:'dadasd', differentiatorlabel3:'dad', offerprice:'6556'}, {nameplatename:'dawood2', indexImageThumbnailUrl:'media/img9.png', differentiatorlabel1:'asdasdsd', differentiatorlabel2:'dadasd', differentiatorlabel3:'daddddd', offerprice:'6555556'}, {nameplatename:'dawood2', indexImageThumbnailUrl:'media/img9.png', differentiatorlabel1:'asdasdsd', differentiatorlabel2:'dadasd', differentiatorlabel3:'dad', offerprice:'6555556'}]};
					//$('#offersDetailContainer').html(template(tempObj));
				},
				error: function(e) {
				   //console.log('error');
				},
				statusCode: {
				404: function() {
						//console.log('404');
					}
				}
			})// End of AJAX call.
		}
		else
		{
			var template = _.template($('#offers-detail-area-template').html());
			var tempOffers = ND.LO.Functions.loadOffers(ND.LO.Variables.offerDetailsOffers);
			//ND.LO.Variables.offerDetailsOffers = [data.HotDeals[0], data.HotDeals[1]];
			$('#offersDetailContainer').html(template({HotDeals: _.extend( {}, tempOffers)}));
			$("#defaultSort").addClass("active");
		}
	}
	
	//////////////////////////////////
	$("#priceSort").on("click", function(){
		//console.log('priceSort');
		/////////////
		var sortedOffers = [];
		if (ND.LO.Variables.priceSortDirection === "ASC")
		{
			//debugger;
			ND.LO.Variables.priceSortDirection = 'DESC';
			sortedOffers = _.sortBy(ND.LO.Variables.offerDetailsOffers, 'offerprice');
			$("#priceSort").addClass("downarrow");
			
			////////////////////////
			$("#defaultSort").removeClass('active');
			$("#priceSort").addClass("active");
			////////////////////////

		}
		else if (ND.LO.Variables.priceSortDirection === "DESC")
		{
			ND.LO.Variables.priceSortDirection = 'ASC';
			sortedOffers = _.sortBy(ND.LO.Variables.offerDetailsOffers, 'offerprice').reverse();
			$("#priceSort").removeClass('downarrow');
			
			////////////////////////
			$("#defaultSort").removeClass('active');
			$("#priceSort").addClass("active");
			////////////////////////

			
		}
		/////////////
		//$('#offersDetailContainer').html('');
		var template = _.template($('#offers-detail-area-template').html());
		var tempOffers = ND.LO.Functions.loadOffers(sortedOffers);
		//ND.LO.Variables.offerDetailsOffers = [data.HotDeals[0], data.HotDeals[1]];
		$('#offersDetailContainer').html(template({HotDeals: _.extend( {}, tempOffers)}));
	});	

	$("#defaultSort").on("click", function(){
		//console.log('defaultSort');
		/////////////
		var sortedAsc = _.sortBy(ND.LO.Variables.offerDetailsOffers, 'order');
		//var sortedDesc = _.sortBy(ND.LO.Variables.offerDetailsOffers, 'order').reverse();
		/////////////
		//$('#offersDetailContainer').html('');
		var template = _.template($('#offers-detail-area-template').html());
		var tempOffers = ND.LO.Functions.loadOffers(sortedAsc);
		//ND.LO.Variables.offerDetailsOffers = [data.HotDeals[0], data.HotDeals[1]];
		$('#offersDetailContainer').html(template({HotDeals: _.extend( {}, tempOffers)}));
		////////////////////////
		$("#priceSort").removeClass('active');
		$("#defaultSort").addClass("active");
		////////////////////////
	});
	
	
	
};// ND.LO.Functions.loadOfferDetailsOffers.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.loadDealer. 	            			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.loadDealer = function() {
	//console.log('Function Call: ND.LO.Functions.loadDealer');
	//debugger;
	if(JSON.stringify(ND.LO.Functions.getCookie()) != "{}" && typeof ND.LO.Functions.getCookie()["postcode"] !== 'undefined')
		{
			//var postcode = ND.LO.Functions.getCookie()["postcode"];
			///////////////////////////////////////////////////
			var $isdealer = $('#dealer-area-template');
			if ($isdealer.length > 0) 
			{
				if (ND.LO.Variables.offerDetailsDealer.length == 0)
				{
					$.ajax({
						url: ND.LO.Functions.serviceLocator("dealer"),
						//crossDomain: true,
						contentType:"application/json; charset=UTF-8",
						dataType: "json",
						cache: true,
						success: function(data) {
							//debugger;
							var template = _.template($isdealer.html());
							if (
									typeof data.length !== 'undefined'
									&& data.length > 0 
									&& typeof data[0] !== 'undefined'
									)
							{
								ND.LO.Variables.offerDetailsDealer = data[0];
								//debugger;
								ND.LO.Variables.dealerCode = ND.LO.Variables.offerDetailsDealer['dealerCode'];
							}
							else
							{
								//ND.LO.Variables.offerDetailsDealer = data;
								ND.LO.Variables.offerDetailsDealer = [];
							}
		//<span class="no-dealer-found">Input your postcode to see offers in your local market.</span>
							$('#dealerContainer').html( template( ND.LO.Variables.offerDetailsDealer ) );
							$(document).foundation();
							ND.LO.Functions.dealerDisclaimerClicked();
						},
						error: function(e) {
						   //console.log('error');
						},
						statusCode: {
						404: function() {
								//console.log('404');
							}
						}
					})// End of AJAX call.
				}
				else
				{
					var template = _.template($isdealer.html());
					ND.LO.Variables.dealerCode = ND.LO.Variables.offerDetailsDealer['dealerCode'];
					$('#dealerContainer').html( template( ND.LO.Variables.offerDetailsDealer ) );
					$(document).foundation();
					ND.LO.Functions.dealerDisclaimerClicked();
				}
			}
			///////////////////////////////////////////////////
		}
		else
		{
			var template = _.template($('#no-dealer-found-template').html());
			$('#dealerContainer').html(template({noDealerMessage: ND.LO.Functions.getErrorMessages()['noPostcodeDealerMessage']}));
		}
		
		
	
};// ND.LO.Functions.loadDealer.


//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.hrefRedirect. 				//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.hrefRedirect = function() {
	//return;
	ND.LO.Variables.loCookie = ND.LO.Functions.getCookie();
	if(JSON.stringify(ND.LO.Variables.loCookie) != "{}")
	{
		//debugger;
		//var urlRegion = ND.LO.Functions.loadUrlRegion();
		if ( typeof ND.LO.Variables.loCookie["postcode"] != 'undefined'
			 && ND.LO.Variables.loCookie["postcode"] != ""
			 )
		{
			$('.post-code .text').html('Your Postcode: '+ND.LO.Variables.loCookie["postcode"]);
			var params = {
					url: window.location.href,
					latestoffers2flag: 'Y'
				};
			params.postcode = ND.LO.Variables.loCookie["postcode"];
			
			$.ajax({
				url: ND.LO.Functions.serviceLocator("xhr-hotdeals-data"),
				//crossDomain: true,
				//contentType:"application/json; charset=UTF-8",
				dataType: "json",
				cache: true,
				data: params,
				success: function(data) {
					//debugger;
					if (data.url)
					{
						if (window.location.href != data.url)
						{
							window.location.href = data.url;
						}
					}
					/*else
					{
						if (data.error)
						{
							
						}
						
					}*/
				},
				error: function(e) {
				},
				statusCode: {
				404: function() {
						
					}
				}//,async: false
			})
			
		}
	}
	else
	{
		ND.LO.Variables.isOpenPostCode = true;
		//$('#myModal').foundation('reveal', 'open');
	}
};// ND.LO.Functions.hrefRedirect.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.viewOfferDetailsOffers. 				//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.viewOfferDetailsOffers = function() {
	//console.log('Function Call: ND.LO.Functions.viewOfferDetailsOffers');
	ND.LO.Functions.loadOfferDetailsOffers();
	ND.LO.Functions.loadDealer();
	ND.LO.Functions.isShow();

	ND.LO.Functions.trackOmniturePage();
	//if (_da && _da.nameplate && _da.nameplate.name) {
	//    var mDCollection = new ND.LO.Collections.ModelsDerivativs();
	//    mDCollection.fetch({
	//        failure: function (model, response) {
	//            console.error("mDCollection.fetch ERROR");
	//            console.log(response);
	//        }
	//    }).done(function () {
	//        $(mDCollection.toJSON()).each(function (key, val) {
	//            if ($.trim(val.name).replace(/\s/g, '-').toLowerCase() == $.trim(_da.nameplate.name).toLowerCase()) {
	//                _da.nameplate.name = val.analyticsName.toLowerCase();
	//                _da.nameplate.cat = val.analyticsCategory.toLowerCase();
	//                return false;
	//            }
	//        });
	//        ND.LO.Functions.trackOmniturePage();
	//    });
	//} else {
	//    ND.LO.Functions.trackOmniturePage();
	//}
	
	//////////////////////////////
	$('.flexslider').flexslider();
	$(document).foundation();
	ND.LO.Functions.registerEventsOfferDetails();

	//update price format of price link
	if($('.offer-feature .hotspot span.price-link').length){
		var origionalContent=$('.offer-feature .hotspot span.price-link').html();
		var execContent = /([\w\W]+)(\<span[\w\W]+|\<SPAN[\w\W]+)/.exec(origionalContent);
		if (execContent) {
		    var priceStr = execContent[1].indexOf('.') > 0 ? execContent[1].substring(0, execContent[1].indexOf('.')) : execContent[1];
		    var finalContent = ND.LO.Functions.addCommas(priceStr) + execContent[2];
		    $('.offer-feature .hotspot span.price-link').html(finalContent);
		}
		else {
		    $('.offer-feature .hotspot span.price-link').html(ND.LO.Functions.addCommas(origionalContent));
		}
	}
	
};// ND.LO.Functions.viewOfferDetailsOffers.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.registerEventsOfferDetails. 						//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.registerEventsOfferDetails = function() {
	$(".menu-button").on("click", function(){
		$(".menu-button").toggleClass("bg-white");
		$("#nav").toggleClass("show");
	});
	
	 /*$(document).foundation({
		tab: {
		  callback : function (tab) {
			console.log(tab);
		  }
		}
	  });*/
	
	  
	$(".watch-video").on("click", function(){
		//console.log('Watch Video - Clicked.');
		////////////////////////
		//Omniture
		var _da = window._da || {};
		if (typeof _da.nameplate !== 'undefined')
		{
			var omTitle = "hot deals:latest offers:features:video:popup";
			var mediaName = "view video";
			var  data ={
					'link':true,
					'type':'lnk_o',
	
					////////++c5++/////////
					//onclicks:content
					'onclicks':'latest offers',
					'content':mediaName, //c56,v56
					////////--c5--/////////
	
					////////++pev2++/////////
					//title:nameplate
					'title':omTitle,
					'nameplate':_da.nameplate.name, //c16, v16
					////////--pev2--/////////
	
					//'pname':_da.pname, //pageName, c11, v11, c19
					'hier1':'shopping tools:hot deals:latest offer' //h1
					//'events':omEvents
			};
			ND.LO.Functions.trackLink(data);
		}
		
		////////////////////////
	});
  $("#omni-dealer").on("click", function(){
	//console.log('Ford Dealer - Clicked.');
	if (window.matchMedia("only screen and (max-width: 760px)").matches)
	{
		//console.log('Ford Dealer - Clicked - Mob View.');
		////////////////////////
		//Omniture
		////////////////////////////////
		/*var  data ={
						"link":true,
						"onclicks":omTitle,
						"type":"lnk_o",
						"content":mediaName,
						"title":omTitle
				};*/
		var _da = window._da || {};
		_da.pname="hot deals:latest offers:dealer";
		var params = {type: "o"};
		params.link = params.title = "hot deals:latest offers:dealer";
		params.onclicks = "hot deals:latest offers:dealer";
		params.hier1 = "shopping tools:hot deals";
		//params.pname = "hot deals:latest offers:dealer";
		//
		if (typeof ND.LO.Variables.dealerCode !== 'undefined')
		{
			//s.eVar1 = ND.LO.Variables.dealerCode;
			var _da = window._da || {};
			_da.dealer = {};
			_da.dealer = {code:ND.LO.Variables.dealerCode};
		}
		//s.eVar16 = _da.nameplate.name;
		//s.eVar18 = _da.derivative;
		//debugger;
		ND.LO.Functions.trackLink(params);
		 ////////
		 ////////////////////////
	}
  });
  ///
	$("#omni-offers").on("click", function(){
	//console.log('More Offers - Clicked.');
	if (window.matchMedia("only screen and (max-width: 760px)").matches)
	{
		//console.log('More Offers - Clicked - Mob View.');
		////////////////////////
		  //Omniture
		  var params = {type: "o"};
		//_da.pname = "hot deals:latest offers";
		//_da.hier = "tools:hot deals:latest offer:<model year>:<vehicle category>:<nameplate>";
		//params.link = params.title = _da.pname + ":more offers";
		//params.onclicks = _da.pname;
		//params.pname = _da.pname;
		
		var _da = window._da || {};
		_da.pname="hot deals:latest offers:more offers";
		
		params.link = params.title = "hot deals:latest offers:more offers";
		params.onclicks = "hot deals:latest offers:more offers";
		//params.pname = "hot deals:latest offers:more offers";
		params.hier1 = "shopping tools:hot deals";
		
		//
		if (typeof ND.LO.Variables.dealerCode !== 'undefined')
		{
			//s.eVar1 = ND.LO.Variables.dealerCode;
			var _da = window._da || {};
			_da.dealer = {};
			_da.dealer = {code:ND.LO.Variables.dealerCode};
		}
		//s.eVar16 = _da.nameplate.name;
		//s.eVar18 = _da.derivative;
		//debugger;
		ND.LO.Functions.trackLink(params);
		 ////////
		 ////////////////////////
	}
  });

  $("#tab-offer-details, #offerDetailTab").on("click", function(){
	  //console.log('Tab:Offer Detail - Clicked.');
	   ///////////
	 var _da = window._da || {};
	 /*if (typeof _da.nameplate !== 'undefined')
	 {*/
		var params = {type: "o"};

		var _da = window._da || {};
		_da.pname="hot deals:latest offers:details";
		
		params.link = params.title = "hot deals:latest offers:details:"+_da.nameplate.name;
		params.onclicks = "hot deals:latest offers:details:"+_da.nameplate.name;
		//params.pname = "hot deals:latest offers:details:"+_da.nameplate.name;
		//
		if (typeof ND.LO.Variables.dealerCode !== 'undefined')
		{
			//s.eVar1 = ND.LO.Variables.dealerCode;
			var _da = window._da || {};
			_da.dealer = {};
			_da.dealer = {code:ND.LO.Variables.dealerCode};
		}
		ND.LO.Functions.trackLink(params);
	 //}
	 ////////
  });

  $("#tab-features, #featuresTab").on("click", function(){
	  //console.log('Tab:Features - Clicked.');
	  /*var  data ={
			"link":true,
			"onclicks":omTitle,
			"events":omEvents,
			"type":"o",
			"content":mediaName,
			"title":omTitle
	 };*/
	 //ND.omniture.trackLink(data);
	 ///////////
	 var _da = window._da || {};
	 if (typeof _da.nameplate !== 'undefined')
	 {
		var params = {type: "o"};
		//_da.pname = "hot deals:latest offers:details:<nameplate>";
		//_da.hier = "tools:hot deals:latest offer:<model year>:<vehicle category>:<nameplate>";
		//params.link = params.title = _da.pname + ":features";
		//params.link = params.title = _da.hier;
		//params.onclicks = _da.pname;
		//params.pname = _da.pname;

		var _da = window._da || {};
		_da.pname="hot deals:latest offers:features";
		
		params.link = params.title = "hot deals:latest offers:features";
		params.onclicks = "hot deals:latest offers:features:"+_da.nameplate.name;;
		//params.pname = "hot deals:latest offers:features:"+_da.nameplate.name;
		//
		if (typeof ND.LO.Variables.dealerCode !== 'undefined')
		{
			//s.eVar1 = ND.LO.Variables.dealerCode;
			var _da = window._da || {};
			_da.dealer = {};
			_da.dealer = {code:ND.LO.Variables.dealerCode};
		}
		/*s.eVar2 = _da.region;
		s.eVar4 = _da.om.lang;
		s.eVar14 = _da.om.client;*/
		//s.eVar11 = "hot deals:latest offers:features";
		//s.eVar16 = _da.nameplate.name;
		//s.eVar18 = _da.derivative;
		//_da.radui="ui:rad:|pc|tablet|mobile";
		/*if (typeof _da.radui !== 'undefined')
		{
			var raduiTag=_da.radui,windowWidth=$(window).width();
			raduiTag=raduiTag.split("|");
			if (windowWidth > 976) {
				//desktop
				s.eVar54=raduiTag[0]+raduiTag[1];
			} else if (windowWidth < 977 && windowWidth > 767) {
				//tablet
				s.eVar54=raduiTag[0]+raduiTag[2];
			} else if (windowWidth < 768) {
				//smobile
				s.eVar54=raduiTag[0]+raduiTag[3];
			}
		}
		s.eVar54 = */
		//debugger;

		ND.LO.Functions.trackLink(params);
	 }
	 ////////
  });
	
	$(".hotspot .disclaimer").on("click", function(){
		//console.log('Detail Page - DERIVATIVE Disclaimer clicked.');
		////////////////////////
		//Omniture
		var _da = window._da || {};
		_da.pname="hot deals:latest offers:details";
		if (typeof _da.pname !== 'undefined')
		{
			var omTitle = "hot deals:latest offers:disclaimer";
			var mediaName = "disclaimer";
			var  data ={
					'link':true,
					'type':'lnk_o',

					////////++c5++/////////
					//onclicks:content
					'onclicks':'latest offers',
					'content':mediaName, //c56,v56
					////////--c5--/////////

					////////++pev2++/////////
					//title:nameplate
					'title': omTitle,
			        'titleNameplate':'none',
					//'nameplate':_da.nameplate.name, //c16, v16
					////////--pev2--/////////

					'pname':_da.pname //pageName, c11, v11, c19
					//'hier1':h1, //h1
					//'events':omEvents
			};
			//s.eVar1
			//s.eVar11
			//s.eVar14
			//s.eVar15
			//s.eVar16
			//s.eVar54
			//debugger;
			ND.LO.Functions.trackLink(data);
		}
		////////////////////////
	});
	/*if (!window.matchMedia("only screen and (max-width: 760px)").matches)
	{
		ND.LO.Functions.youtubePlayerEvents();
	}*/
	$('.loadmask').hide();
	if (typeof ND.LO.Variables.isOpenPostCode != 'undefined' && ND.LO.Variables.isOpenPostCode)
	{
		$('#myModal').foundation('reveal', 'open');
	}
	/*$(window).resize(function(e) {
		ND.LO.Functions.isShow();
	});*/
	$(".aside div.accordion-active > UL > LI > DIV.tab-area").click(function(){
		if($(this).next().hasClass('dropdown') && $(this).parent("li").hasClass("active")){
			$('html, body').animate({
				scrollTop : $(this).parent("li").offset().top
			}, 200);
		}
	});
};// ND.LO.Functions.registerEventsOfferDetails.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.youtubePlayerEvents. 						//
//////////////////////////////////////////////////////////////////////
/*ND.LO.Functions.youtubePlayerEvents = function() {
	// This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');
	
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	// This function creates an <iframe> (and YouTube player)
	if ($("#player1").length > 0)
	{
		var player1;
	}
	if ($("#player2").length > 0)
	{
		var player2;
	}

	function onYouTubeIframeAPIReady() {
		if ($("#player1").length > 0)
		{
			player1 = new YT.Player('player1', {
			  events: {
				'onStateChange': onPlayerStateChange
			  }
			});
		}

		if ($("#player2").length > 0)
		{
			player2 = new YT.Player('player2', {
				events: {
					'onStateChange': onPlayerStateChange
				}
			});
		}
	}

	// The API calls this function when the player's state changes.
	// The function indicates that when playing a video (state=1),
	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PLAYING) {
		   //alert('YT.PlayerState.PLAYING');
		   ////////////////////////
			//Omniture
			var _da = window._da || {};
			if (typeof _da.nameplate !== 'undefined')
			{
				var omTitle = "hot deals:latest offers:features:video:popup";
				var mediaName = "view video";
				//video start
				var  data ={
						'link':true,
						'type':'lnk_o',
		
						////////++c5++/////////
						//onclicks:content
						'onclicks':'latest offers',
						'content':mediaName, //c56,v56
						////////--c5--/////////
		
						////////++pev2++/////////
						//title:nameplate
						'title':omTitle,
						'nameplate':_da.nameplate.name //c16, v16
						////////--pev2--/////////
		
						//'pname':_da.pname, //pageName, c11, v11, c19
						//'hier1':h1, //h1
						//'events':omEvents
				};
				ND.LO.Functions.trackLink(data);
			}
			////////////////////////
		}
		if (event.data == YT.PlayerState.ENDED) {
		  //alert('YT.PlayerState.ENDED');
		  ////////////////////////
			//Omniture
			var _da = window._da || {};
			if (typeof _da.nameplate !== 'undefined')
			{
				var omTitle = "hot deals:latest offers:features:video:popup";
				var mediaName = "view video";
				//video finish
				var  data ={
						'link':true,
						'type':'lnk_o',
			
						////////++c5++/////////
						//onclicks:content
						'onclicks':'latest offers',
						'content':mediaName, //c56,v56
						////////--c5--/////////
			
						////////++pev2++/////////
						//title:nameplate
						'title':omTitle,
						'nameplate':_da.nameplate.name //c16, v16
						////////--pev2--/////////
			
						//'pname':_da.pname, //pageName, c11, v11, c19
						//'hier1':h1, //h1
						//'events':omEvents
				};
				ND.LO.Functions.trackLink(data);
			}
			////////////////////////
		}
	}
};*/// ND.LO.Functions.youtubePlayerEvents.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.trackOmniturePage. 						//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.trackOmniturePage = function(data) {
	//debugger;
	//var stepName, events;
	if( window._da && window._da.om && ND && ND.omniture )
	{
		if (ND.analyticsTag.isSinglePageAppOmnitureConfigured())
		{
			//initialize your analytics module
			//To track a page once all variables are set
			/////////////////////////////
			//ND.LO.Functions.resetOmnitureVars();
            //analytics.constructTabPageName(data);
			//all data manupulation will be here.

            //ND.LO.Functions.setupOmnitureVars();
			//////////////////////////////
			//debugger;
			ND.analyticsTag.trackOmnitureSinglePageApp();
		}
		else
		{
			
		}
	}
};// ND.LO.Functions.trackOmniturePage.
//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.setupOmnitureVars. 						//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.setupOmnitureVars = function(data) {
	/*_da.funnel.stepname = data.state + data.stepName;
	this.setupNameplateVars(data);
	if (typeof data.events !== 'undefined' && data.events != null)
	{
		_da.events = data.events.split(',');
	}*/

	/*_da.tool = '';
	_da.der = '';
	_da.nameplate.name = '';
	_da.events = '';
	_da.region = '';
	_da.funnel.stepname = '';*/
	
	
	
};// ND.LO.Functions.setupOmnitureVars.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.trackLink. 				     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.trackLink = function(data) {
	//debugger;
	if( window._da && window._da.om && ND && ND.omniture )
	{
		if (ND.analyticsTag.isSinglePageAppOmnitureConfigured())
		{
			/*var  data ={
					"link":true,
					"onclicks":omTitle,
					"events":omEvents,
					"type":"o",
					"content":mediaName,
					"title":omTitle
			 };*/
			//To track a link
			ND.omniture.trackLink(data);	
		}
		else
		{
			/*var  data ={
					'link':true,
					'onclicks':omTitle,
					'events':omEvents,
					'type':'o',
					'content':clip_n,
					'title':omTitle,
					'nameplate':'none',
					'pname':pname,
					'hier1':hier
			 };*/
			$.publish('/analytics/link',data);
		}
	}
}; // End of ND.LO.Functions.trackLink.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.resetOmnitureVars. 						//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.resetOmnitureVars = function() {
	//_da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
	_da.tool = _da.der = _da.events = undefined;
	_da.funnel.stepname = undefined;
};// ND.LO.Functions.resetOmnitureVars.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.isShow. 								//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.isShow = function() {
	//debugger;
	if (window.matchMedia("only screen and (max-width: 760px)").matches)
	{
		//$('.watch-video').hide();
		//$(".ford-dealer").removeClass('active');
		//$("#offerLi").removeClass('active');
		//debugger;
		$('#offerDetailTab').trigger( "click" );
	}
	else
	{
		//$('.watch-video').show();
	}
};// ND.LO.Functions.isShow.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.loadOffers. 				//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.loadOffers = function(allOffers) {
	var tempOffers = [];
	if (allOffers != null)
	{
		if (allOffers.length > 0)
		{
			for (var i in allOffers)
			{
				if (i > 4)
				{
					break;
				}
				tempOffers.push(allOffers[i]);
			}
		}
	}
	return tempOffers;
};// ND.LO.Functions.loadOffers.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.handlePostcodeRegion. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.handlePostcodeRegion = function() {
	//debugger;
	//console.log('ND.LO.Functions.handlePostcodeRegion');
	///////////input[type="number"]
	/*$('#postcode').keyup(function(event) {
		if (!this.value) {
			this.value = '';
		}
		else if (isNaN(this.value)) {
			//ND.LO.Variables.formPostcode = this.value;
			this.value = '';
		}
		else {
			ND.LO.Variables.formPostcode = this.value;
		}
		//if (this.value)
//		{
//			ND.LO.Variables.formPostcode = this.value;
//		}
	});*/
	//});
	//////////////
	$('.error').hide();

	$("form.postcode-form .submit").click(function(event) {
		//debugger;
		event.preventDefault();
		//var isPost = false;
		//debugger;
		//console.log(ND.LO.Variables.formPostcode);
		//////////
		var params = {
					url: window.location.href,
					latestoffers2flag: 'Y'
				};
		/*if(ND.LO.Variables.formPostcode != 0)
		{
			params.postcode = ND.LO.Variables.formPostcode;
		}*/
		//params.postcode = ND.LO.Variables.formPostcode;
		params.postcode = $('#postcode').val();
		if ($.trim($('#postcode').val()) === '')
		{
			$('.error').show();
			$("#myModal .error").html(ND.LO.Functions.getErrorMessages()[ND.LO.Constants.MISSING_POSTCODE]);
		}
		else
		{
			//debugger;
			$.ajax({
				url: ND.LO.Functions.serviceLocator("xhr-hotdeals-data"),
				//crossDomain: true,
				//contentType:"application/json; charset=UTF-8",
				dataType: "json",
				cache: true,
				data: params,
				success: function(data) {
					//debugger;
					if (data.url)
					{
						$('.error').hide();
						ND.LO.Functions.saveInCookie($.extend(data, {postcode: params.postcode.toString()}));
						if (window.location.href != data.url)
						{
							window.location.href = data.url;
						}
						else
						{
							var $isLanding  = $('#filters-data');
							if ($isLanding.length > 0)
							{
								$('.post-code .text').html('Your Postcode: '+params.postcode.toString());
								$('#myModal').foundation('reveal', 'close');
								$('#postcode').val('');
								//$('.error').show();
								//$("#myModal .error").html('You are already on '+data.region+' region.');
								//$("form.postcode-form").submit();
							}
							else
							{
								//if deatil page
								//window.location.reload();
								window.location.href = data.url;
							}
						}
						//isPost = true;
						//alert(JSON.stringify(data));
					}
					else
					{
						/*if (data.error)
						{
							$('.error').show();
							$("#myModal .error").html(data.error);
						}*/
						if (data.errorCode)
						{
							$('.error').show();
							$("#myModal .error").html(ND.LO.Functions.getErrorMessages()[data.errorCode]);
						}
						
					}
				},
				error: function(e) {
					$("#myModal .error").html(e);
					event.preventDefault();
				},
				statusCode: {
				404: function() {
						$("#myModal .error").html('404: Regionator API.');
						
					}
				}
			})
		}
		///////////
		/*if (!isPost)
		{
			event.preventDefault();
		}*/
		//$('formpostcode-form .submit').attr('onclick','').unbind('click');
	});
}; // End of ND.LO.Functions.handlePostcodeRegion.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.getFilterJSON. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.getFilterJSON = function() {
	//debugger;
	//console.log('getFilterJSON');
	var $filtersData = $('#filters-data');
	if ($filtersData.length > 0)
	{
		if (typeof JSON.parse($filtersData.html()).filters !== 'undefined')
		{
			return JSON.parse($filtersData.html()).filters;
		}
	}
	return {};
}; // End of ND.LO.Functions.getFilterJSON.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.toggleShowAllOffers. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.toggleShowAllOffers = function() {
	var isAllCheck = true;
	var filters = ND.LO.Functions.getFilterJSON();
	for (var filter in filters)
	{
		var id = filters[filter].label.split(' ').join('').split('/').join('-').split('&').join('-').toLowerCase();
			//ND.LO.Variables.FilteringAnswers[id] = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange];

			if(filters[filter].type == 'HotDeals')
			{
				$('input[name=offers\\[\\]]').each(function() { //loop through each checkbox
					if ($(this).parent().hasClass("selected"))
					{
						isAllCheck = false;
						return false;
					}
				});
			}
			else if(filters[filter].type == 'price')
			{}
			else if(filters[filter].type == 'Models')
			{
				$('input[name=models\\[\\]]').each(function() { //loop through each checkbox
					if ($(this).parent().hasClass("selected"))
					{
						isAllCheck = false;
						return false;
					}
				});
			}
			else
			{
				$('input[name='+id+'\\[\\]]').each(function() { //loop through each checkbox
					if ($(this).parent().hasClass("selected"))
					{
						isAllCheck = false;
						return false;
					}
				});
			}
	}
	
	/////////////////////////////////////
	/*
	*/
	/////////////////////////////////////
	
	if (isAllCheck)
	{
		//debugger;
		if ($( "#range-slider" ).slider( "values", 0 ) == ND.LO.Variables.minRange && $( "#range-slider" ).slider( "values", 1 ) == ND.LO.Variables.maxRange)
		{
			$("#alloffers").prop("checked", true);
			$("#alloffers").parent().addClass('selected');
			$("#alloffers").attr("disabled", true);
		}
		else
		{
			$("#alloffers").prop("checked", false);
			$("#alloffers").parent().removeClass('selected');
			$("#alloffers").attr("disabled", false);
		}
		
		///////////////////////////////////////////
		/*ND.LO.Variables.FilteringAnswers.Offer = [];
		ND.LO.Variables.FilteringAnswers.BodyType = [];
		ND.LO.Variables.FilteringAnswers.FuelType = [];
		ND.LO.Variables.FilteringAnswers.Towing = [];
		ND.LO.Variables.FilteringAnswers.Price = [ND.LO.Variables.minRange, ND.LO.Variables.maxRange];
		ND.LO.Variables.FilteringAnswers.Models = [];
		this.clearSessionStorage();*/
		///////////////////////////////////////////
	}
}; // End of ND.LO.Functions.toggleShowAllOffers.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.getPriceJSON. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.getPriceJSON = function() {
	//debugger;
	//console.log('getPriceJSON');
	var $filtersData = $('#filters-data');
	if ($filtersData.length > 0)
	{
		if (typeof JSON.parse($filtersData.html()).filters !== 'undefined')
		{
			if (
				typeof _.findWhere(JSON.parse($filtersData.html()).filters, {type: 'price'})['Min'] != 'undefined'
				&& _.findWhere(JSON.parse($filtersData.html()).filters, {type: 'price'})['Max'] != 'undefined'
				)
			{
				return _.findWhere(JSON.parse($filtersData.html()).filters, {type: 'price'});
			}
		}
	}
	return {Min: "$5000", Max: "$50000"};
}; // End of ND.LO.Functions.getPriceJSON.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.time24into12. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.time24into12 = function(time24String) {
	// Check correct time format and split into components
	
	if (time24String.split("-").length == 2)
	{
		//oTimeArray = time24String.split("-")[0].trim().split("");
		oTimeArray = $.trim(time24String.split("-")[0]).split("");
		//cTimeArray = time24String.split("-")[1].trim().split("");
		cTimeArray = $.trim(time24String.split("-")[1]).split("");
		
		if (oTimeArray.length === 4)
		{
			oTimeString = oTimeArray[0]+''+oTimeArray[1]+':'+oTimeArray[2]+''+oTimeArray[3];
		}
		else
		{
			oTimeString = oTimeArray.join("");
		}
		
		if (cTimeArray.length === 4)
		{
			cTimeString = cTimeArray[0]+''+cTimeArray[1]+':'+cTimeArray[2]+''+cTimeArray[3];
		}
		else
		{
			cTimeString = cTimeArray.join("");
		}
		//return time24String;
		//return oTimeString+' - '+cTimeString;
		return ND.LO.Functions.timeConvert(oTimeString)+' - '+ND.LO.Functions.timeConvert(cTimeString);
	}
	else
	{
		return time24String;
	}
}; // End of ND.LO.Functions.time24into12.

//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.timeConvert. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.timeConvert = function(time) {

	time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
	if (time.length > 1)
	{ // If time format correct
		time = time.slice (1);  // Remove full string match value
		time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join (''); // return adjusted time or original string
}; // End of ND.LO.Functions.timeConvert.


//////////////////////////////////////////////////////////////////////
//Function: ND.LO.Functions.dealerDisclaimerClicked. 	     			//
//////////////////////////////////////////////////////////////////////
ND.LO.Functions.dealerDisclaimerClicked = function() {
	$(".disclaimer-area .disclaimer").on("click", function(){
		//console.log('Detail Page - Dealer Disclaimer clicked.');
		////////////////////////
		//Omniture
		var _da = window._da || {};
		//if (typeof _da.nameplate !== 'undefined')
		//{
		//    _da.pname="hot deals:latest offers:details:"+_da.nameplate;
		//}
		_da.pname = "hot deals:latest offers:details";
		if (typeof _da.pname !== 'undefined')
		{
			var omTitle = "hot deals:latest offers:disclaimer";
			var mediaName = "disclaimer";
			var  data ={
					'link':true,
					'type':'lnk_o',

					////////++c5++/////////
					//onclicks:content
					'onclicks':'latest offers',
					'content':mediaName, //c56,v56
					////////--c5--/////////

					////////++pev2++/////////
					//title:nameplate
					'title': omTitle,
					'titleNameplate': 'none',
					//'nameplate':_da.nameplate.name, //c16, v16
					////////--pev2--/////////

					'pname':_da.pname,

					//'pname':_da.pname, //pageName, c11, v11, c19
					'hier1':'shopping tools:hot deals' //h1
					//'events':omEvents
			};
			//s.eVar1
			//s.eVar11
			//s.eVar14
			//s.eVar15
			//s.eVar16
			//s.eVar54
			//debugger;
			ND.LO.Functions.trackLink(data);
		}
		////////////////////////
	});
}; // End of ND.LO.Functions.dealerDisclaimerClicked


ND.LO.Functions.goToLandingPage=function(){	
	var locHref=window.location.href.toString();
	var qsValue=window.location.search.match(new RegExp('[\?\&]'+ND.LO.Variables.urlFilterType+'=[^\&]+','i'));
	if(qsValue.length>0){
		if(qsValue[0][0]==='&'){
			locHref=locHref.replace(qsValue[0],'');
		}
		else if(qsValue[0][0]==='?'){
			var qsList=window.location.search.match(/[\?\&]\w+=[^\&]+/g);
			if(qsList.length>1){
				//locHref.substring(locHref.indexOf(qsStr[0])+1,locHref.indexOf(qsStr[0])+1+qsStr[0].length);
				var qsStr=qsValue[0].substring(1)+'&';
				locHref=locHref.replace(qsStr,'');
			}
			else{
				locHref=locHref.replace(qsValue[0],'');
			}
		}
	}
	window.location.href=locHref;
};

/*(function(str) {
    if (typeof(str.prototype.trim) === 'undefined') {
        str.prototype.trim = function() {
            return $.trim(this);
        };
    }
})(String);*/
/*String.prototype.trim = function() {
    //return this.replace(/^\s+|\s+$/g, '');
	return $.trim(this);
}*/