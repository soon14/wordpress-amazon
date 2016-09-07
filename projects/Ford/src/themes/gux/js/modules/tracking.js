/*
 * A place for Tracking code when there is no other.
 */
var ND = (function(module, $, window, document) {
	
	trackWebtrendFields = function() {
		/*
         * Tracking that implement by DOM ready.
         */
        var _da = window._da;
        if(_da === undefined) {
        	return;
        }
        var trackFields = _da.trackFields;
        if(trackFields !== undefined){
            var fields = [], key;
            for(key in trackFields){
                fields.push({
                    name: key,
                    value: trackFields[key]
                });
            }

            $.publish('/analytics/field/', { field : fields });
        }
	}	
	
	module.analyticsBinder = {
			
		/*
		 * Create instance of webtrends wrapper
		 */
		bind: function() {
			$(document).ready(function(){
				
				// Localise a grabber function. Grabber function helps with content values and urls
				var grabber = ND.analytics.grabber();
				
				/*
				 * <meta name="dfy.title" content="Focus" />
				 */
				master = grabber( { meta: "meta[name='dfy.title']" } );
			
				/*
				 * Social Links
				 */
				$('.socialmedia-wrapper').delegate('.socialmedia a', 'click', function(e){
				
					var link = grabber( { link: this } ),
						data = { 
							title: 'Follow ' + master.value + ' on ' + link.value,
							uri: '/follow/' +  link.url
						};
						
					$.publish('/analytics/social/', data);
					
				});
	
				
				/*
				 * When an Overlay opens.. 
				 * It is not based on the <A> tag because overlays are a complex beast.
				 * It's based on the overlay itself regardless of what trigger the event that opened it.
				 * See Unit Tests for example variations
				 */
				$.subscribe( "overlay.done", function( e, eventData ){
					var heading, link, name, data = {}, 
						blind = true,
						excludeClass = ".country-overlay"; //exclude select country overlay.
	
					if( eventData && eventData.contents && $(excludeClass, eventData.contents).size() < 1) {
	
						//Grab content
						heading = eventData.contents ? grabber( { link: eventData.contents.find(".head h1") } ) : {};
						link = grabber( { link: eventData.anchor } )
						name = grabber( { name: eventData.name } )
						
						//If no values are usable, then we are Blind tracking this overlay
						blind = !heading.value && !link.value && !name.value && !eventData.assetid;
						
						data = { 
							title: master.value + ' | ' + (name.value || heading.value || link.value || eventData.assetid),
							uri: '/' + master.url + '/overlay/' +  (name.url || heading.url || link.url || eventData.assetid)
						};
	
						if ( blind ) {
							data = { 
								title: master.value + ' | Overlay',
								uri: '/' + master.url + '/overlay'
							};
						}
						
						$.publish('/analytics/event/', data);
					
					}
				}); 
	
				/* 
				 * TBD: RSS
				 */
				$(".rss").delegate("a", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: 'RSS',
							uri: link.url
						};
	
					$.publish('/analytics/event/', data);
				});
	
				/* 
				 * AddThis: 
				 * When click on AddThis link
				 * The add this layout is insert to body by script.
				 * Create a delegate event on document.
				 */
				$(document).delegate(".at_item", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: ' Send to ' + link.value,
							uri: '/share/' + link.url,
							socialId: link.value
						};
	
					$.publish('/analytics/social/', data);
	
				});
	
				/*
				 * AddThis China
				 */
				$(document).delegate(".addlist a", "click", function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: ' Send to ' + link.value,
							uri: '/share/' + link.url,
							socialId: link.value
						};
	
					$.publish('/analytics/social/', data);
	
				});
	
				/* 
				 * TBD: Like button 
				 */
				/*
				$(".fb-like").mouseover(function(e){
					var target = e.target; 
					if(e.tagName == "IFRAME"){
						
					}
				})
				*/;
	
				/*
				 * TBD: Google Plus Button
				 */
				/*
				$(".addthis_button_google_plusone").mouseover(function(e){
					var target = e.target; 
					if(e.tagName == "IFRAME"){
						
					}
				});
				*/
	
				/*
				 * TBD: Form Field Drop Off
				 */
				$('#dragonflyform').delegate('.ff-track-drop-off', 'focusout', function(e) {
	
					var field = $(this),
						data = {
							field: {
								name: field.attr('name') || this.id,
								value: field.val()
							}
						};
	
					//TBD: "parameters about the prefix "DCSext.xxx"
					$.publish('/analytics/field/', data);
				});
	
				/*
				 * VOI
				 */
				$('#dragonflyform').submit(function(e){
					var $model = $("#VOI_ModelSeries_Model", form);
					var $services = $("#VOI_ModelSeries_Series", form);
	
					if(!$model.size() && !$services.size()){
						return;
					}
	
					var form = $(this),
						data = {
							field: [
								{
									name: "model",
									value: $model.val()
								},
								{
									name: "series",
									value: $services.val()
								}
							]
						};
	
					$.publish('/analytics/field/', data);
				});
	
				/*
				 * View 360 Button: 2.8.1
				 */ 
				$('.view360-button a').click(function(e){
					
					var link = grabber( { link: this } ),			
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/360-view'
						};
						
					$.publish('/analytics/event/', data);
					
				});
	
				/* 
				 * Switch(Flash): 2.8.2
				 * */ 
				$("#car-swapper a").click(function(e){
					var link = grabber( { link: this } ),
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/switch-to-super-cab'
						};
	
					$.publish('/analytics/event/', data);
				});
	
				/*
				 * Switcher(banner): 2.8.3
				 */
				$('.slider .next, .slider .prev').click(function(e){
	
					var link = grabber( { link: this } ),
						data = { 
							title: master.value + ' | ' + link.value,
							uri: '/' + master.url + '/switch-to-banner'
						};
	
					$.publish('/analytics/event/', data);
				});
				
				/*
				 */ 
				$('.download').click(function(e){
					data = { 
						title: 'this is my link',
						link: this,
						type: 'd'
					};
	
					$.publish('/analytics/link/', data);			
				});
				var publishTrackData = function(elem,e){
					
					if ($(elem).hasClass("mobile") && guxApp.viewport.view !== "mobile") {
						return;
					}
					/*
					if(!$(elem).hasClass("noprevent")){
						e.preventDefault();
					}*/
					var $link = $(elem);
					var img, name, type, onclick, trigger = false, nameplate, leadtype, tool, events, year, pname,intcmp,hier,tooldesc,content,freq,moduletype,modulename,moduleaction,
					totalresult,resultnumber,titleNameplate,cat,subcat,referred,search;
					//link has omniture tracking data, capture the data and publish to pubsub
					if ((name = $link.attr('data-name')) && 
						(type = $link.attr('data-type'))) {
						onclick = $link.attr("data-onclicks");
						nameplate = $link.attr("data-nameplate");
						year = $link.attr("data-nameplate-year");
						leadtype = $link.attr("data-leadtype");
						tool = $link.attr("data-tool");
						tooldesc = $link.attr("data-tooldesc");
						events = $link.attr("data-events");
						pname = $link.attr("data-pname");
						intcmp = $link.attr("data-intcmp");
						hier = $link.attr("data-hier"); 
						content = $link.attr("data-content"); 
						freq = $link.attr("data-freq"); 
						moduletype = $link.attr("data-moduletype");
						modulename = $link.attr("data-modulename");
						moduleaction = $link.attr("data-moduleaction");
						totalresult = $link.attr("data-totalresult");
						resultnumber = $link.attr("data-resultnumber");
						titleNameplate = $link.attr("data-titlenameplate");	
						cat = $link.attr("data-cat");	
						subcat = $link.attr("data-subcat");
						referred= $link.attr("data-referred");
						search= $link.attr("data-search");
					} 
					//look for images inside the link, if the img has any omniture tracking data, publish to pubsub
					else if ((img = $link.find('img').first()) &&
								(name = img.attr('data-name')) && 
								(type = img.attr('data-type'))){
						onclick = img.attr("data-onclicks");
						nameplate = img.attr("data-nameplate");
						year = img.attr("data-nameplate-year");
						leadtype = img.attr("data-leadtype");
						tool = img.attr("data-tool");
						tooldesc = img.attr("data-tooldesc");
						events = img.attr("data-events");
						pname = img.attr("data-pname");
						intcmp = img.attr("data-intcmp");
						hier = img.attr("data-hier"); 
						content = img.attr("data-content"); 
						freq = img.attr("data-freq"); 
						moduletype = img.attr("data-moduletype");
						modulename = img.attr("data-modulename");
						moduleaction = img.attr("data-moduleaction");
						totalresult = img.attr("data-totalresult");
						resultnumber = img.attr("data-resultnumber");	
						titleNameplate = img.attr("data-titlenameplate");	
						cat = img.attr("data-cat");
						subcat = img.attr("data-subcat");
						referred= img.attr("data-referred");
						search= img.attr("data-search");
					}
					
					//check the type
					if ($link.hasClass('external-disclaimer')) { type = 'e'};
					//if name not set by data-name attribute, get the link name
					if (!name) {
						var link = grabber( { link: elem } )
						name = link.value;
					}
					//check personalisation click
					if (typeof moduleaction == 'undefined' 
						&& !($(elem).hasClass("open-video-flip")) 
						&& ($link.closest("section").hasClass('personalisation') 
						|| $link.closest("section").hasClass('smartnextsteps'))
						|| $link.hasClass('open-media-overlay')){						
						moduleaction = 'click';
					} else if (typeof moduleaction !== 'undefined'  && moduleaction=="none"){						
						moduleaction = undefined;
					}
					//gux Popular Accessories /Get to Know Your Vehicles			
					if ($link.closest("section").data('psn-module')=='knowvehicle' || $link.closest("section").data('psn-module')=='accessories'){						
						if(typeof $.cookie('dfy.u') !== "undefined" && typeof $.cookie('dfy.u') !== "function") {
							cookieUser = JSON.parse($.cookie('dfy.u'));
						}
						if (cookieUser != null) {
							modulename = cookieUser.now;
						 }
					}
					
					//gux showroom -- no longer needed
					//if($link.closest(".section-cars").data("sort-total") && $link.closest(".vehicle-data").data("sort-index")){
					//	totalresult = $link.closest(".section-cars").data("sort-total");
					//	resultnumber = $link.closest(".vehicle-data").data("sort-index");
					//}
					
					//for nameplate year and video carousel omniture
					var $section = $link.closest("section");
					if(_da.nameplate){
						if($section.hasClass("video-carousel") || $section.hasClass("reveal-slider")) {
							modulename = _da.nameplate.name;
						}
						if(!year) year = _da.nameplate.year;
					}
					
					//moduleaction
					$.publish('/analytics/link/', { 
						title: name,
						link: this,
						type: type,
						onclicks: onclick,
						leadtype: leadtype,
						tool: tool,
						tooldesc: tooldesc,
						events: events,
						year: year,
						nameplate: nameplate,
						pname: pname,
						intcmp: intcmp,
						hier1:hier,
						content:content,
						freq:freq,
						moduletype:moduletype,
					    modulename:modulename,
					    moduleaction:moduleaction,
					    totalresult:totalresult,
						resultnumber:resultnumber,
						titleNameplate: titleNameplate,
						cat:cat,
						subcat:subcat,
						referred:referred,
						search:search
					});	
				};
				/*$wait(function(){
					$(".trackable,.external-disclaimer").live({mouseover:function(e){},mousedown:function(){alert("live-mousedown")}});
					//$(".trackable,.external-disclaimer").on('click',function(e){alert('on')});
				})*/
				
				//$('.trackable,.external-disclaimer').click(function(e){
				//$(document).delegate(".trackable,.external-disclaimer","click",function(e){
				//$(document).on("click",'.trackable,.external-disclaimer',function(e){
				$(".trackable,.external-disclaimer").live('click',function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					publishTrackData($(this),e);
				});
				//quick lane share
				$("#content-tooltip").on("click",'.trackable',function(e){
					publishTrackData($(this),e);
				});
				
				
				//needed to use .on method to fire omniture tag for mini-dealer locator expand
				$(".mini-dealer .revealer-vertical .revealer-open.trackable").on('click',function(e){
					publishTrackData($(this),e);
				});
				
				// add omniture on gux billboard next/prev,billboard bullet
				$(".flex-direction-nav .flex-next, .flex-direction-nav .flex-prev, .flex-control-nav.flex-control-paging a,.alt-controls span.alt-prev,.alt-controls span.alt-next").live("click",function(e){		
					var $link = $(this);
					var $section = $link.closest("section");
					
					if(guxApp.viewport.view === "mobile" &&($(this).hasClass("flex-prev")||$(this).hasClass("flex-next"))) return;
					else if(guxApp.viewport.view !== "mobile" && $section.hasClass("hotspots")) return;
					
					if(!$section) return;
					publishTrackData($section,e);
				});				
				
				//gux nameplate colorizer
				//this is added because adding trackable on colorized module will not trigger omniture click event propagation
				$(".color-palette li a").on("click",function(e){
					var $link = $("#colorizer_data_analytics");
					publishTrackData($link,e);
				});
				
				//for nameplate reveal-slider module
				$(".imageReveal").on('mouseover',function(e) {
					$(".reveal-slider .imageReveal-drag").on('mousedown',function(e) {
						var $link = $(this);
						var $section = $link.closest("section");
						if(!$section) return;
						publishTrackData($section,e);
					});
					
					$(".imageReveal").off('mouseover');
				});
				
				//gux dealer omniture
				$(".view-all-dealers",$("section.dealer-locator")).live("mouseup",function(e){
					e.preventDefault();
					$(this).trigger('click');
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='results';
						_da.events = "event1,event43".split(',');	
						_da.dealer = {};
					}
				});
				$.subscribe('dealers-done', (function(){
					if (window._da && window._da.om && ND && ND.omniture) {
						//each dealer search will init the dealer freq
						$.each(ND.omniture.pageClicks, function(key, value){
							if(key.match("^dealer")){
								ND.omniture.pageClicks[key] =  undefined;
							}
						});
						var data_tool = "event:find dealer";
						_da.funnel.stepname='results';
						//fire once per visit
						if(typeof _da.events == "undefined"){
							_da.events = "event1,event43".split(',');
							//data_tool = "event:find dealer";
						}else {
							_da.events = '';
							//data_tool = '';
						}							
						_da.dealer = {};
						
						var totalNum = $('.dealer-result-container .count .num').text();
						var vehicleData,$analyticsData = $("#vehilcesdata"),analyticsData;
						if($(".vehicle-search .nested-options select[name='vehicle']").length > 0 && $analyticsData && $analyticsData.length > 0){
							nameplateIndex = $(".vehicle-search .nested-options select[name='vehicle']").get(0).selectedIndex;
							analyticsData = JSON.parse($analyticsData.html());
							if (nameplateIndex && analyticsData && analyticsData["vehiclesdata"]) {
								vehicleData = analyticsData["vehiclesdata"][nameplateIndex - 1];
							}
						}
						if(totalNum){
							var totalResult = Number(totalNum);
							var perPage = 5;
							var totalPage = Math.floor((totalResult + perPage - 1 ) / perPage);
							var postcode = $('.dealer-result-container .result-list .dealer-result:first-child').data("postcode");
							_da.region = postcode;
							if(vehicleData){
								_da.nameplate ={"name":vehicleData.name,"year":vehicleData.year,'id':vehicleData.id};
							}else{
								_da.nameplate = undefined;
							}
							// the c49/v49 is not fired,c48/v48 should be fired every time
//							ND.analyticsTag.trackOmniturePage({
//								tool: data_tool,
//								tooldesc:'find dealer:1 of '+totalPage
//							});	
							ND.analyticsTag.trackOmniturePage({
								tool: data_tool
							});	
						}
						//only track once
						//$.unsubscribe('dealers-done');
					}
				}));
				$("section.dealer-locator .dealer-result .dealer-heading a,section.dealer-locator .dealer-result .details").live("click",function(e){					
					var dealerId = $(this).closest(".dealer-result").data("dealerid");
					var postcode = $(this).closest(".dealer-result").data("postcode");
					if (window._da && window._da.om && ND && ND.omniture) {
						_da.funnel.stepname='dealer:info';
						_da.events = '';
						_da.dealer = {code:dealerId};
						_da.region = postcode;
						_da.tool = {};
						ND.analyticsTag.trackOmniturePage();
					}
				});
				//add ominture on per 360 movement
				$("#overlay .vr-container .360trackable").live("slide",function(e){
					if($('.staging-wrap .trackable').size()>0){
						return;
					}
					e.preventDefault();
					$(this).trigger('click');
					publishTrackData($(this),e);
					$("#overlay .vr-container .360trackable").die("slide");//only need to trigger once
				})
				
				/* for B515 experience tracking */
				$('.staging-wrap .trackable').live("click",function(e){
					var $link = $(this);
					publishTrackData($link,e);
				});
				
				/* for Service Calculator */
				$('.service-calc #service-dropdowns').on("change","select",function(e){
					var $link = $(this);
					var $section = $link.closest("section");
					var year = $("#year option:selected" ).text();
					var model = $("#model option:selected" ).text();
					var style = $("#style option:selected" ).text();
					var engine = $("#engine option:selected" ).text();	

					if(year !== guxApp.sc.selectTexts["select.year.text"] && model !== guxApp.sc.selectTexts["select.model.text"]
						&& style !== guxApp.sc.selectTexts["select.style.text"] && engine !== guxApp.sc.selectTexts["select.engine.text"]){

						publishTrackData($section,e);
					}
				});
				
		        /*
		         * Email tracking: Email Link Tracking Handler
		         * Attach an event (on click) to all emailto links. [ Design P12 ]
		        */
		        var mailHandler = function(e){
		            var anchorHref = e.target.href || '';
		                anchorFormat = anchorHref.toLowerCase();
	
		            if(anchorHref && anchorFormat.indexOf("mailto:") > -1){
		                anchorFormat = anchorFormat.replace(/[^\w]+/g, '-');
		                var data = { 
		                        title: anchorHref + ' | Email',
		                        uri: '/' + master.url + '/email/' + anchorFormat
		                    };
	
		                $.publish('/analytics/event/', data);
		            }
		        };
	
		        /*
		         * External dealer website tracking:
		         * Attach an event to all external links(click out). [ Design P12 ]
		        */
		        var externalHandler = function(e){
		            var anchor = e.target, anchorClass = anchor.className;
	
		            //There will be 2 case: 1) It's in the external-disclaimer overlay. 2) It's an external link whout popup overlay
		            if(anchorClass && typeof(anchorClass)==="string" &&
		                (anchorClass.indexOf("external") > -1 || anchorClass.indexOf("external-disclaimer ") > -1)){
	
		                var href = $(anchor).attr("href"),
		                	hrefFormat ="";
		                if(typeof(href)!="undefined"){
		                	hrefFormat = href.replace(/[^\w]+/g, '-');
		                }
		                var data = {
		                        title: "Offsite:" + href,
		                        uri: '/' + master.url + '/external/' + hrefFormat
		                    };
	
		                $.publish('/analytics/event/', data);
		            }
		        };
	
		        //Handles all Omniture tracking links in an overlay
		        var trackingHandler = function(e) {
		        	var anchor = e.target, anchorClass = anchor.className;
	
		            //fullscreen button
					 if(anchorClass && typeof(anchorClass)==="string" && anchorClass.indexOf("btn-fullscreen") > -1) {
		            	//gallery view full screen button
		        		var linkName = s.eVar11 + ':full screen' //link name from a page name
		        		$.publish('/analytics/link/', { 
		        			title: linkName,
		        			link: this,
		        			type: 'o',
		        			onclicks: 'view full screen'
		        		});		
		        	}
		        }
		        
		        if ((_da.nameplate !== undefined && _da.nameplate.id !== undefined) || 
		        	(_da.derivative !== undefined && _da.derivative.id !== undefined)) {
		        	//delegate to context
		        	ND.Context.addContextToLinks();
		        } 
		        	
	
		        /*
		         * Global Click Tracking Listener
		         * One event listener intead of binding on every link, 
		         * In order to let it work on dynamic anchors that injected by Javascript.
		         */
		        $(document).bind("click", "a", function(e){
		        	//some listener may prevent/cancel the event listener.
		            if(e && e.target){
		                externalHandler(e);
		                mailHandler(e);
		                trackingHandler(e);
		            }
		        });
		        
		        trackWebtrendFields();
		        
			})
		}			
	}
	
	return module;
	
	
}(window.ND || {}, jQuery, window, document));
