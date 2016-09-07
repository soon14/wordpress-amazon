/* Tiny promise */
function tinyDeferred() {
	var callbacks = [], 
		resolved,
		run = function() {
			for( var i = 0, length = callbacks.length; i < length; i++){
				callbacks[i] && callbacks[i].call();
			}
		};

	return {
		resolve: function() {
			if( !resolved ) {
				resolved = true;
				run();
			}			
		},
		done: function( fn ) {
			if( !resolved ) {
				callbacks.push(fn);
			} else {
				fn();
			};
		}
	};  

}
/* App load */
function appLoader( scriptUrl , waitName, context ) {
	var deferred = tinyDeferred(),
		resolve = function() {
			deferred.resolve();
		};
	context = context || window;
	waitName = waitName || '$wait';
	$LAB
		.script( scriptUrl )
		.wait( resolve );
	context[waitName] = function(fn) {
		deferred.done(fn);
	};
	/* Expose a function for the main script to resolve (IE issue) */
	context['resolve'+waitName] = resolve;
}

/*! Old School load listener. See https://github.com/getify/LABjs/issues/3 for reasons. */
var isWindowLoaded = false;

(function(){
	var onload = function(fn){
		if(typeof window.addEventListener!='undefined'){
			window.addEventListener('load',fn,false);
		} else if(typeof document.addEventListener!='undefined'){
			document.addEventListener('load',fn,false);
		} else if(typeof window.attachEvent!='undefined'){
			window.attachEvent('onload',fn);
		} else {
			var oldfn = window.onload;
			if(typeof window.onload!='function'){
				window.onload = fn;
			} else {
				window.onload = function(){oldfn();fn();};
			}
		}
	};
	onload(function(){
		isWindowLoaded = true;
	});
}());
