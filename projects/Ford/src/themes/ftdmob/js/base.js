/*
 * Description: JS library reference to jQuery.
*/
(function(window){


var d = document,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	concat = Array.prototype.concat;

var $ = function(selector, context){
		if( arguments.length < 2 ){
			context = d;
		}
		return new $.fn.init(selector, context);
	};

/*
 * Event: PreventDefault event behavior & target;
 * Method: e.preventDefault(e), so far it doesn't support currentTarget
*/
$.Event = function(e){
	var event = this;
	if(!e) e = window.event;

	event.target = e.target || e.srcElement || document;
	event.preventDefault = function(){
		if (e.preventDefault) {
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	};
	event.stopPropagation = function(){
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		e.cancelBubble = true;
	};
};


$.fn = $.prototype = {
	$ver: 1,
	length: 0,
	//make its behavior like array
	push: push,
	slice: slice,
	concat: concat,
	sort: [].sort,
	splice: [].splice,
	init: function(selector, context){
		var r = this, i, nodes;

		//Build a new $ object using current object
		push.call(r);

		if(!selector || !context){
			return r;
		}

		//check parameters
		if(selector.$ver){
			//console.log("1",selector);
			return selector;
		}else if(typeof selector !="string"){
			//console.log("2",selector);
			r.push(selector);
			return r;
		} else if(context && context.$ver){		//context is an $ object?
			//console.log("4",selector);
			for(i = context.length; i-->0;){
				r = r.merge($(selector, context[i]));
			}
			return r;
		}

		//console.log("5",selector, context);	
		if (selector === d || !(nodes = context.childNodes) || !selector || selector.length < 1) {
			return r;
		}

		if(selector.charAt(0) == "#"){
			var el = d.getElementById(selector.slice(1));
			if(el){
				r.push(el);
			}
			return r;
		};

		//console.log("6",selector, nodes);
		for(i = nodes.length; i-->0;){
			if(selector.charAt(0)=="." && nodes[i].className && nodes[i].className.indexOf(selector.slice(1))>=0
				|| nodes[i].tagName && nodes[i].tagName == selector.toUpperCase()){
				r.push(nodes[i]);
			}else{
				r = r.merge($(selector, nodes[i]));
			}
		}
		return r;
	},

	//clean merge
	merge: function( second ) {
		var first = this;
		var i = first.length, j = 0;

		for ( var l = second.length; j < l; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;
		return first;
	}
};

//create an reference to itself.
$.fn.init.prototype = $.fn;

/*
 * Find the closest element
 * Method:
 * 1) $("#abc").closest();
 * 2) $("#abc").closest("A");
 */
$.fn.closest = function(selector){
	var nodes = this, r = new $.fn.init(), prefix = selector.charAt(0), parent, i;

	for(i = nodes.length; i-->0;){
		parent = nodes[i];
		while(parent = parent.parentNode){
			if (prefix == "." && parent.className && parent.className.indexOf(selector.slice(1)) >= 0 ||
				prefix == "#" && parent.id && parent.id == selector.slice(1) ||
				parent.tagName && parent.tagName == selector.toUpperCase() ) {
				r.push(parent);
				break;
			}
		};
	}
	return r;
};


/*
 * Document ready event,
 * There should be only one
 * Method: 
 * 1) $.ready(function(){  codes...  });
 * 2) $(document).ready(function(){  });
*/
$.fn.ready = function(fun) {
	var isReady = 0;
	function ready(){
		if (!isReady) {
			fun();
		}
		isReady = 1;
	}

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( d.addEventListener ) {
		d.addEventListener( "DOMContentLoaded", ready, false );
		w.addEventListener( "load", ready, false );
	// If IE event model is used
	} else if ( d.attachEvent ) {
		d.attachEvent( "onreadystatechange", ready );
		w.attachEvent( "onload", ready );
	}
}

/*
 * Bind event to Elements.
 */
$.fn.bind = function(evt, fun){
	//This is an Array object
	var $ary = this, i;
	//Re-created the event object
	var eventHandle = function(e){
		fun(new $.Event(e));
	};

	for(i=$ary.length;i-->0;){
		var $this = $ary[i];
		if ( d.addEventListener ) {				// FF
			$this.addEventListener( evt, eventHandle, false );
		} else if ( d.attachEvent ) {			// IE
			$this.attachEvent( "on" + evt, eventHandle );
		}
	}

};

/*
 * Add Class
 */
$.fn.addClass = function(className){
	//This is an Array object
	var $ary = this, i;
	for(i=$ary.length;i-->0;){
		var $this = $ary[i];
		if ($this.className.indexOf(className)<0) {
			$this.className = $this.className + " " + className;
		}
	}
};

/*
 * Remove Class
 */
$.fn.removeClass = function(className){
	//This is an Array object
	var $ary = this, i;
	for(i=$ary.length;i-->0;){
		var $this = $ary[i];
		if ($this.className && $this.className.length > 0) {
			$this.className = $this.className.replace(className, "");
		}
	}
};

/*
 * has Class
 */
$.fn.hasClass = function(className){
	//This is an Array object
	var $ary = this, i;
	for(i=$ary.length;i-->0;){
		var $this = $ary[i];
		if (!$this.className || $this.className.indexOf(className)<0) {
			return 0;
		}
	}
	return 1;
};


window.$ = $;

})(window);