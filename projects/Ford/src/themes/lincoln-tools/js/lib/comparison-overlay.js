/*
 * Comparison overlay for Lincoln BnP
 * Author: York Zhang
 *
 */

/*globals jQuery, ND, window */
var ND = (function(ND, $) {
	
	ND.comparisonOverlay = function () {
	
		var element;
		
		return {

			init: function( elem ) { 

				element = $(elem || ".comparison-overlay");
					
				/* Check this module needs to be initalised for this page */
				if( !element || !element.size() ) { return this; }
			
				$(".comparison-overlay").radOverlay({
					additionalClass: "test",
					afterContentLoad: function(){
						$(".comparison-wrap table tr").each(function(){
							var $this = $(this);
							$this.find("td").eq(0).addClass("always-appear");
							$this.find("td").eq(1).addClass("appear");
						});

						var tableWidth = $(".comparison-wrap .details table").eq(0).width();
						var containerWidth = $(".comparison-wrap .details").width();
						var scrollbarWidth = containerWidth - tableWidth;
						var $dropdown = $(".comparison-wrap .series-dropdown");
						$(".comparison-wrap .header").css({"padding-right":scrollbarWidth});
						
						$(".comparison-wrap .header table td").each(function(i,item){
							var $this = $(this);
							$(this).click(function(){
								if(i!=0){
									if($dropdown.hasClass("active")){
										$dropdown.removeClass("active");
									}else{
										$dropdown.addClass("active");
									}
								}
							})
						})

						$dropdown.find("li").each(function(index,item){
							var $this = $(this);
							$this.click(function(){
								var column_index = index + 1;
								$(".comparison-wrap table td.appear").removeClass("appear");
								$(".comparison-wrap table tr").each(function(){
									$(this).find("td").eq(column_index).addClass("appear");
								});

								$dropdown.removeClass("active");
							});
							
						});
					}
				});
				
				/* Return this so it can be chained / assigned
				 * eg. var myModule = ND.myModuleName().init();
				 */
				return this;
			
			}
			

		
		
		};	
	};
	//console.log(ND);
	
	/* Return ND after it's been augmented */ 
	return ND;	

}(window.ND || {}, jQuery));

