/* mobile-overlay.js */
ND.mobileOverlay = (function($) {
	var $popup=  null;
	var paramData = {};
	var cache = {};
	var overlay = {
		
		init : function(initOptions) {
//			console.log('ND.mobileOverlay');
			var self = this;
			$.subscribe('overlay.launch', function(event, args) {
				paramData = $.extend({}, args);
				self.open();
			});
		},
		
		open : function() {
			
//			console.log('open');
			var self = this;
			
			if (typeof paramData.url !== 'undefined' && paramData.url != '') {
				if (cache[paramData.url] != null) {
					$popup = cache[paramData.url];
					self.launch();
				} else {
//					console.log('found xhr-mobile-hotdeals-form');
					$.mobile.loading('show');
					$.ajax({ url: paramData.url,
					   success: function(data) {
					   	  self.appendToBodyAndCreate(data, paramData);
					   },
					   error: self.error 
				    });
				}
			} else if (typeof paramData.contentId !== 'undefined' && paramData.contentId != null) {
				$popup = $(paramData.contentId);
				if ($popup.length) {
					self.create();
				} else {
					//console.log('cannot find ' + paramData.contentId ); 
				}
				
			}
		},
		
		launch: function() {
			$popup.popup('open');
		},
		
		create: function() {
			var self = this;
//			console.log('create');
			$popup.trigger('create');
			$popup.popup({ history: false });
//				$popup.one('popupafteropen', function( event, ui ) {
//					console.log('popupafteropen.once');
//					
//					if( options.success ) {
//						options.success.call();
//					}
//				});
			
			$popup.on('popupafteropen', function( event, ui ) {
//				console.log('popupafteropen');
				
				//Callback too
				if( paramData.success ) {
//					console.log('$popup.popupafteropen - > call success callback');
					paramData.success.call();
				}
				
				$.subscribeOnce('overlay.hide', self.close);
				//Publish.
				$.publish('overlay.success');
				
				$popup.one('click', '.cancel', function(e) {
					e.preventDefault();
//					console.log('overlay.cancel');
					$.publish('overlay.usercancel');
					return false;
				});
				
			});
			
//			console.log('overlay.success -> popup.open');
			self.launch();
		},
		appendToBodyAndCreate: function(data) {
//			console.log('ND.mobileOverlay.create() -> overlay.success');
			
//			console.log('overlay.success -> create new dom');
			$popup = cache[paramData.url] = $(data);
			$('body').append($popup);
			this.create(data);
			$.mobile.loading('hide');
		},
		
		error: function() {
			cache[paramData.url] = null;
			delete cache[paramData.url];
			$.mobile.loading('hide');
		},
		
		close : function() {
			$popup.popup('close');
//			console.log('overlay.close');
			
		},
		
		destroy: function() {
			$.unsubscribe('overlay.hide');
			if ($popup) {
				$popup.remove();
			}
			$popup = cache = null;
		}
		
	
	};
	
	overlay.init();
	
})(jQuery);