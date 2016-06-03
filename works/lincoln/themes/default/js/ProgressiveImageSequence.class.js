/**
 * Created by Hinderling Volkart AG.
 * User: sev
 * Date: 23.06.11
 * Time: 17:02
 * Copyright 2011, Hinderling Volkart AG. All rights reserved.
 */


function ProgressiveImageSequence( imgpath , count ,  options ) {
	var myself = this;

	var images = [];
	var numLoaded = 0;
	var isComplete = false;
	this.length = count;


	var defaultOptions = {
		indexSize: 4 ,
		initialStep: 64 ,
		onComplete: null ,
		onProgress: null ,
		stopAt: 1
	};
	var pref = {};
	$.extend(pref,defaultOptions,options);

	var step = pref.initialStep;
	var current = 0;
	var hasRestepped = false;

	function callback( f , o ) {
		if ( !!f ) f.apply(o);
	}

	this.stop = function() {
		step = pref.stopAt / 2;
	};

	this.reset = function() {
		isComplete = false;
		numLoaded = 0;
		step = pref.initialStep;
		current = 0;
		hasRestepped = false;
		this.nearestIndex = -1;
	};

	this.getAt = function( index ) {
		return images[index];
	};

	this.nearestIndex = -1;

	this.getNearest = function( index ) {
		index = Math.floor(index);
		var diff = 0;
		var i,img;
		for ( diff = 0; diff <images.length ; diff++ ) {
			i = index+diff;
			if ( i>=0 && i<images.length) {
				img = images[i];
				if ( img ) {
					this.nearestIndex = i;
					return img;
				}
			}
			i = index-diff;
			if ( i>=0 && i<images.length) {
				img = images[i];
				if ( img ) {
					this.nearestIndex = i;
					return img;
				}
			}
		}
		return null;
	};


	// Loading

	this.getLoadProgress = function() {
		return numLoaded * pref.stopAt / myself.length;
	};

	this.isLoaded = function(index) {
		if ( index === undefined ) {
			return numLoaded == myself.length;
		} else {
			return images[index].isLoaded();
		}
	};

	this.loadPosition = function( position , complete ) {
		position = Math.min( 1 , Math.max(0, position) );
		var index = position * (myself.length-1);
		index = Math.round(index);
		myself.loadIndex(index, complete);
	};
	
	this.loadIndex = function(index, complete) {
		if ( index < 0 || index >= myself.length || index != Math.floor(index)  ) return false;

		var img = images[index];
		if ( img == null ) {
			images[index] = getSrcAt(index);
		}
		numLoaded++;
		if ( !isComplete ) {
			callback(pref.onProgress,this);
		}
		callback(complete,this);
	};

	this.loadNext = function(/* complete */) {
		if ( step < pref.stopAt ) return;
		current+=step;
		if ( current >= myself.length ) {
			if ( hasRestepped ) step /= 2;
			hasRestepped = true;
			current = step/2;
			if ( current >= pref.stopAt ) {
				myself.loadIndex(current,myself.loadNext);
			} else {
				finished();
			}
		} else {
			myself.loadIndex(current,myself.loadNext);
		}
	};


	function finished() {
		isComplete = true;
		callback(pref.onComplete,this);
	}


	function getSrcAt( index ) {
		var str = (index+1+Math.pow(10,pref.indexSize)).toString(10).substr(1);
		return imgpath.replace( '{index}' , str );
	}


	this.load = function() {
		myself.loadIndex(0,myself.loadNext);
	}
}