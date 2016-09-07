/*
Author: Jessie Biros
File name: textExpand.js
Description: 1. add see more and less
             2. expand and collapse text (hide and show)

             how to use:
             1.put the text that you want to be hide inside a span tag with a class of 'hiddenContent'.
             2. add a jquery object in your html then place it at the bottom of the html file with an id of 'controlTexts'

             example:
             //this is an example of the jquery object:
                <script id="controlTexts" type="text/x-json">
                  {
                    //this will be the text while the text is hidden
                    "more":" ...More", 
                    //this will be the text when the text is visible 
                    "less":"Less&#9652;"
                  }
                </script>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita porro <span class="hiddenContent">recusandae obcaecati libero deserunt debitis cumque aspernatur autem odit quas fugit ex modi, optio quidem similique ipsa dicta repellendus.</span>
                </p>

                //the text inside the span.hiddenContent will be hidden and can be visible by clicking the more / less.

                // this will only work on screens small and medium

Dependencies: jQuery, underscore
*/

var qlApp = qlApp || {};

(function($){
    qlApp.textExpand = {
        init: function(){
            var controlTexts = qlApp.tools.getEmbeddedData("#controlTexts");
          
            if (!($(".hiddenContent").length > 0 && controlTexts != null)) {return;}

            var hidden = $(".hiddenContent");

            hidden.each(function() {
                    var controlTemplate = $("<a href='#' class='control'></a>"),
                    self = $(this);

                if (window.innerWidth < 780){
                    qlApp.textExpand.contentToggle($(this),controlTexts,controlTemplate);
                }
            });

            qlApp.textExpand.resizeToggle();
        },
        resizeToggle: function(){
            if(!qlApp.tools.isIE(8)) {
                var debounceResize = _.debounce(function(){
                     if (window.innerWidth < 780){
                         qlApp.textExpand.init();
                      } else{
                        $('.control').remove();
                        $(".hiddenContent").show();
                      }
                },200);

                $(window).on('resize', debounceResize);
            }
        },

        contentToggle: function(hidden,controlTexts,controlTemplate){
            
            qlApp.textExpand.controlsInit(hidden,controlTexts,controlTemplate);

            hidden.parent().unbind('click').on('click', 'a.control', function(){
                var self = $(this),
                parentContainer = self.parent();
                if (hidden.is(':visible')) {
                    self.html(controlTexts.more);
                } else {
                    self.html(controlTexts.less);
                }
                hidden.toggle();
                return false;
            });
        },

        controlsInit: function(hidden,controlTexts,controlTemplate){
            if (hidden.next('.control').length == 0){
                hidden.hide();
                controlTemplate.html(controlTexts.more);
                hidden.parent().append(controlTemplate);
            }
        }
    }

    $(function(){
        qlApp.textExpand.init();        
    });

})(jQuery);

