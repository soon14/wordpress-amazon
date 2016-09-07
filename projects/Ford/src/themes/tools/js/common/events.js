/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Events = (function(undefined) {	
	
	var eventBus = {context : null};
	_.extend(eventBus, Backbone.Events);
	
	return {
		
		eventList: {},
		
		/**
		 * When an a view triggers an event, generally the model listens to that event
		 * and update itself. model may decide it needs to trigger another event and
		 * notify the controller(router) via the eventBus to perform other tasks.
		 *   
		 * @param listener that listens to an event
		 * @param viewEventName event listener is listening to
		 * @param modelEventName event listener will trigger via the eventBus
		 * @param arg
		 * @returns
		 */
		bindToEvent : function(listener, viewEventName, modelEventName, globalArg) {
			listener.bind(viewEventName, 
			function(arg) {
				eventBus.trigger(modelEventName, arg ? arg : globalArg );
			}, 
			eventBus.context);
		},
		
		fireEvent : function(eventName, arg) {
			eventBus.trigger(eventName, arg, eventBus.context);
		},
		
		bind: function(eventName, callback, context) {
			eventBus.on(eventName, callback, context);
		},
		
		unbind: function(eventName, context) {
			eventBus.off((typeof eventName === 'undefined') ? null : eventName, null, context);
		},
		
		bindOnce: function(eventName, callback, context) {
			eventBus.once(eventName, callback, context);
		},
		
		eventBus : eventBus
	};
		
})();