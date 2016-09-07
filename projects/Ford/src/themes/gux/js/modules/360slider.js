/*
Author: Ruiwen Qin
File name: 360slider.js
Description: 

Dependencies: jQuery
*/

var guxApp = guxApp || {};

(function($){
    threesixtySlider = {
        init: function(){
            if (!$(".threesixty-slider").length) {return;}

            var module = $(".threesixty-slider");
            threesixtySlider.slider(module);
        },
        slider: function(module){
            module.each(function(){
                var container = $(this),
                    vrData = $(".vr-data",container),
                    imgData = guxApp.tools.getEmbeddedData(vrData),
                    imgLocation = guxApp.viewport.view == "mobile" && imgData.vrImages.smobLocation ? imgData.vrImages.smobLocation : imgData.vrImages.location,
                    vrImg = $(".vr-image",container),
                    images = [];
    

                vrImg.attr("src", imgLocation + imgData.vrImages.filenamePrefix + threesixtySlider.pad(0, imgData.vrImages.counterFormat.length) + "." + imgData.vrImages.extension);

                for (var i = imgData.vrImages.start; i < imgData.vrImages.end; i++){
                    images.push(imgLocation + imgData.vrImages.filenamePrefix + threesixtySlider.pad(i, imgData.vrImages.counterFormat.length) + "." + imgData.vrImages.extension);
                }
                
                

                if(images.length) {
                    vrImg.reel({
                        revolution: 500,
                        frames: images.length,
                        images: images,
                        responsive: true
                    });

                    $(".arrow-left", container).on("click", function(e){
                        vrImg.trigger('stepLeft');
                    });
                    
                    $(".arrow-right", container).on("click", function(e){
                        vrImg.trigger('stepRight');
                    });
                }

                // trigger the resize event when tabs are switched for fixing non-draggable issue
                $.subscribe('tab-switched', (function(){
                    vrImg.trigger('resize');
                }));
                
            });
        },
        pad: function(num,size){
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        }
    };

    $(function(){
        threesixtySlider.init();
    });

})(jQuery);