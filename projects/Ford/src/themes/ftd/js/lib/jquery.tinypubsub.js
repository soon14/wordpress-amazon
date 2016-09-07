
(function($){
  
  $.pubsubLogging = false;
  
  var o = $({});
  
  $.subscribe = function() {
    o.bind.apply( o, arguments );
  };
  
  $.subscribeOnce = function() {
    o.one.apply( o, arguments );
  };
  
  $.unsubscribe = function() {
    o.unbind.apply( o, arguments );
  };
  
  $.publish = function() {
    if( $.pubsubLogging ) { console.log.apply( console, arguments ); }
	o.trigger.apply( o, arguments );
  };
  
}(jQuery));