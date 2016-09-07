/*
* to toggle a row between expanded/collapsed
* align for specific col and title
* Author: Ray Huang
*/

//globals jQuery, ND, window
var ND = ( function(ND, $) {
		ND.rowExpander = function() {
			return {
				/*
				 * @param sWrapper, wrapper contains all rows in, use to address rows
				 * @param sRow, single row wrapper, apply "active" class on it
				 * @param sTitle, title of the row, trigger click event to expand/collapsed row
				 * @param callback, trigger after slideup/slidedown animation
				 */
				init : function(sWrapper, sRow, sTitle,callback) {
					var maxColHeight = 0;
					var maxWidth = 0;
					var rowTitle = $(sWrapper + ">" + sRow + " .title");
					
					$(sWrapper).find(sTitle).click(function() {
						var rowTitle = $(this).parent("li").length > 0 ? $(this).parent("li") : $(this).parent("div");
						var currentRow = rowTitle.closest(sRow);
						var rows = $(sWrapper).find(sRow);
						if (currentRow.length == 0) {
							return;
						}
						if (currentRow.hasClass("active")) {
							currentRow.children(".comparator_content").slideUp(400, function() {
								currentRow.removeClass("active");
								if(callback){
									callback(this);
								}
							});
						} else {
							currentRow.children(".comparator_content").slideDown(400, function() {//slide down the activated row
								currentRow.addClass("active");
								if(callback){
									callback(this);
								}
							});
							
							$("html,body").animate({scrollTop:$(this).parent(sRow).offset().top},500,"swing",function(){});//scroll to the expanded row
						}
					});
				}
			}
		}
		return ND;
		// Return ND after it's been augmented
	}(window.ND || {}, jQuery)); ( function($) {
		$(function() {
			ND.rowExpander().init(".row-content-wrapper", ".expanddiv", ".head",function(scope){//call back function to automatically add checked/check class while row expander expanded/collasped
				var currentExpandRow =  $(scope).parent(".expanddiv");
				var index = currentExpandRow.index();
				var comparisonChart = $(scope).parents("#c-comparison-chart:eq(0)");
				var currentQuickLinkRow = comparisonChart.find("#c-first-row ul > li:eq("+index+")");
				var rowList = comparisonChart.find("#c-vehicles-to-compare ul > li");
				if(currentExpandRow.hasClass("active")){
					if(!currentQuickLinkRow.hasClass("checked")){
						currentQuickLinkRow.addClass("checked");
					}
				}else{
					if(currentQuickLinkRow.hasClass("checked")){
						currentQuickLinkRow.removeClass("checked");
					}
				}
			});
		});
	}(jQuery));
