/**
 * @author: szabetian
 * @project: polk
 * @description: helper methods for ND.calcprice
 * 
 * 
 * getprice.js (ND.calcPrice) uses methods in this file to perform various tasks
 * 
 */

ND.polk = {
	/**
	 * Updates the region in the DOM where vehicle prices are displayed.
	 * That subtle color fadding when a panel updates.
	 * 
	 * @param elem
	 * 
	 */
	showChangeVisually : function(elem) {
//			console.logpubsub("showChangeVisually()");
		
		var time = 1250,
			bgColor = ['#cbe6f2', 'transparent' ];
		
		//Run the animation, start with a solid background colour
		elem.css('backgroundColor', bgColor[0] )
			.delay(time)
			.animate({
					'backgroundColor' : bgColor[1]								
				}, time,  function() {
					$(this).css('backgroundColor', 'transparent');
				});		
	},
	
	bindAdditionalListeners: function() {},
	
	/**
	 * Placeholder callback function after postcode is changed
	 * Do not delete
	 */
	templateUpdated: function() {
		
	}
};