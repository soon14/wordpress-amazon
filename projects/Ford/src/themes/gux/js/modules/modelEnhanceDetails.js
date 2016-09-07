/*
Author: 		George Ejr
File name: 		modelEnhanceDetails.js
Description: 	Model Enhance Details
Dependencies: 	jQuery
*/

var guxApp = guxApp || {};

(function($){ 

	$(function(){
		 var configInfo = guxApp.tools.commonConfigData(),
         modelDetailsConfig = guxApp.tools.getEmbeddedData('#modelDetails-config'),
         site = (configInfo != null && configInfo.site) ? configInfo.site : null,
         formattedDate = (modelDetailsConfig != null && modelDetailsConfig.formattedDate) ? modelDetailsConfig.formattedDate : null;
         var getFormattedDate = function(){
            var today = new Date(),
                yyyy = today.getFullYear(),
                mm = ('0' + (today.getMonth() + 1)).slice(-2),
                dd = ('0' + today.getDate()).slice(-2);
            return yyyy + mm + dd;
        };
		guxApp.ModelEnhanceDetails = {
			init: function() {
                 
				//var container = $(".model-enhance-detail");
                //if (!container.length) {return;}
				
				 this.initConfig();
                 this.getPriceDate();
				// this.fetchDate();
				// this.fetchModelList();
				// this.resizeModelHandler();
			},
            initConfig: function(){
                this.config = {
                    site: site,
                    formattedDate: formattedDate,
                };
            },
            getPriceDate: function(){
                
                this.fetchDate();

            },
            fetchDate: function(){
                if(formattedDate != null) {
                    formattedDate = formattedDate.replace('{site}', guxApp.tools.encode(site));
                    formattedDate = formattedDate.replace('{yyyyMMdd}', getFormattedDate());
                    var self = this;
                    $.ajax({
                        url: formattedDate,
                        type: "GET",
                        dataType: "json"
                    }).done(function (data) {
                        self.config.formattedDate = data['formatted-date'];
                        $('.priceDate').html(self.config.formattedDate);
                    }).fail(function(xhr, textStatus){
                        if(textStatus == "timeout"){
                            throw new Error(textStatus, "Fetch Date timeout");
                        } else if (xhr.status == 500){
                            throw new Error(xhr.status, "Server error when fetching Date");
                        }
                    });
                }
            },
            fetchModelList: function(){
     //        	if(modelData!=null){ 
     //          		var request = $.ajax({
					// url: modelData,
					// method: "GET", 
					// dataType: "json"
					// });
					// request.done(function(data){
					// 	$.each(data.derivatives, function(index, md) {
					// 		var modLst = "<div class='model-container small-12 large-4 xlarge-3 columns'><div class='model-data'>"+
					// 							"<div class='model-placeholder'>"+
					// 			                    "<a href=''><img class='show-for-large-up' src='" + md.showroomImageThumbnailURL + "' alt='image 1' itemprop='image' /></a>"+
					// 			                "</div>"+
					// 			                "<div class='model-name'>"+
					// 			                    "<h2><a href=''>"+md.name+"</a></h2>"+
					// 			                "</div>"+
					// 			                "<div class='model-price'>"+
					// 			                    "<p>Drive away price from <span itemprop='price'>$"+Number(md.price).toLocaleString('en')+"</span> <span class='citation'><sup data-disclosure='1'>2</sup></span></p>"+
					// 			                "</div>"+
					// 			                "<div class='model-cta'>"+
					// 			                    "<a href='"+modelDetailsUrl+md.derivativeId+"' class='button btn-det'>"+
					// 			                        "<span class='label-link'>Model Details</span>"+
					// 			                    "</a>"+
					// 			                    "<a href='#' class='button btn-com'>"+
					// 			                        "<span class='label-link'>Compare Model</span>"+
					// 			                    "</a>"+
					// 			                "</div>"+
					// 			            "</div>"+
					// 			        "</div>";
					// 		$(".model-list .mw-wrapper .mw-content").append(modLst);
					// 	});
					// 	guxApp.ModelList.equalizeModelHeight(); 
					// });
					// request.fail(function(xhr, textStatus){
					// 	console.log(textStatus);
					// });
     //        	}
				
            }
		}
		guxApp.ModelEnhanceDetails.init();


	});
})(jQuery);