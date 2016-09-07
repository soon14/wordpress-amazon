/*
Author: Ruiwen Qin | Gianfranco del Mundo
File name: colorizer.js
Description: Color picker

Dependencies: jQuery
*/


(function($){
    colorizer = {
        init: function(){
            if (!$(".colorizer").length) {return;}

            var container = $(".colorizer"),
                vehicleImg = $(".vehicle-image", container),
                colorName = $(".color-name", container),
                colors = $(".color-palette li", container);

            colorizer.colorSwap(vehicleImg,colors,colorName);
            colorizer.imageSwap(colors);

            var debouncedImageSwap = _.debounce(function(){colorizer.imageSwap(colors);},500);

            $(window).on('resize', debouncedImageSwap);
        },
        colorSwap: function(vehicleImg,colors,colorName){
            var colorLinks = $("a",colors);

            colorLinks.click(function(){
                var self = $(this),
                    citation = self.find('.citation').length > 0 ? self.find('.citation').clone() : null;
                if (!self.hasClass("active")){
                    colorLinks.removeClass("active");
                    self.addClass("active");

                //pictureFill Fix for IOS, IE9 lte and IE10
                if(guxApp.tools.detectIE() || guxApp.tools.isIOS()){
                    $('img',vehicleImg).attr("src", self.attr("href"));
                } else {
                    $('source',vehicleImg).first().attr("srcset", self.attr("href"));
                    $('source',vehicleImg).last().attr("srcset", self.attr("data-smob"));
                }

                    colorName.html(self.text());
                    
                    if (citation){
                        colorName.append(citation);
                    }
                }

                //On Click iOS patch for pictureFill
                $(window).scroll();
                
                return false;
            });
        },
        imageSwap: function(colors){
            var imgUrl = guxApp.viewport.view == "mobile" ? "smob" : "desktop";

            $(colors).each(function(){
                var self = $('a',this);
                self.attr("href",self.data(imgUrl));
            });
        }
        
    };

    $(function(){
        colorizer.init();
    });

})(jQuery);