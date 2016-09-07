/*
Author: Ruiwen Qin
File name: textExpand.js
Description: 1. add more and less controls onto articles
             2. expand and collapse text (hide and show)

             Publish JSON data on the page such as (common\json\textexpand-config.html)

             <script id="textexpand-config" type="text/x-json">
                {
                    "more":" ...more", 
                    "less":"Less&#9652;",
                    "auto":true, //add read more button automatically by counting the textLength
                    "textLength":120
                }
            </script>

            If manually publish the read more button, wrap the hidden text inside <span class='hiddenContent'></span>

Dependencies: jQuery, underscore
*/

var guxApp = guxApp || {};

(function($){
    guxApp.textExpand = {
        init: function(){
            var controlTexts = guxApp.tools.getEmbeddedData("#textexpand-config");

            if (controlTexts == null || $('.model-walk').length) {return;}

          
            //Will automatically wrap paragraphs if the text expand class is set to auto.
            this.wrapText(controlTexts);
            
         

            guxApp.textExpand.resizeToggle();
        },
        wrapText:function(controlTexts){
            if(controlTexts.auto){
                //Select paragraphs without the read more to avoid redundancy.
                var article = $('p').filter(':not(:has(".hiddenContent"))').not('.noReadMore'),
                    textLength = parseInt(controlTexts.textLength);

                // to find out the position of all the children elements
                var locations = function (substring,string){
                    var i=-1;
                    i = string.indexOf(substring,i+1);
                    return i;
                }

 
                
              

                //Loop in the paragraph in the page and wrap it with the 'Read More' feature
                article.each(function(i,e){
                    var elem = $(e),
                        positions = [],
                        locationIndex = -1,
                        childrenElems = {},
                        startPoint = 0,
                        newElem = '';
                    
                    
                // to prevent (GUX-1303) bug
                // if the location of citation element is equals to textLength then textLength - 1
                    var arThis = $(this);
                    $(this).children('.citation').each(function() { 
                        if (arThis.text().indexOf($(this).text()) == textLength){ 
                            textLength = parseInt(textLength - 1); 
                        } 
                    });
                    if(elem.text().length > controlTexts.textLength){
                        if (elem.children().length > 0){

                            elem.children().each(function(i,e){ 
                                locationIndex = locations(String($(this).prop('outerHTML')), String(elem.html()));
                                childrenElems[locationIndex] = $(this).prop('outerHTML'); //save the children elements for restoring later
                                $(this).remove();//remove the current children elements for calculating the break point
                                positions.push(locationIndex);
                                startPoint = locationIndex; 
                            });

                            positions.push(textLength);
                            
                            positions.sort(function(a,b){return a-b});

                            startPoint = 0;

                            for (var i=0; i < positions.length; i++){

                                var position = positions[i];
                                if (position == textLength){
                                    newElem += elem.html().substring(startPoint,position);
                                    newElem += "<span class='hiddenContent'>";
                                }
                                else {
                                    newElem += elem.html().substring(startPoint,position);
                                    newElem += childrenElems[position] + ' ';
                                   
                                }
                                startPoint = position;
                            }

                            newElem += elem.html().substring(startPoint);

                            newElem += "</span>";

                            elem.html(newElem);

                            
                        }
                        else {

                            elem.html(function(){
                                return $(this).text().substring(0,textLength)+"<span class='hiddenContent'>"+ $(this).text().substring(textLength) +"</span>"
                            });
                        }

               
                    }

                });

            }

            var hidden = $(".hiddenContent");
            hidden.each(function() {
                var controlTemplate = $("<a href='#' class='control'></a>"),
                self = $(this);

                if (window.innerWidth < 780){
                    guxApp.textExpand.contentToggle($(this),controlTexts,controlTemplate);
                }
            });
        },
        resizeToggle: function(){
            if(!guxApp.tools.isIE(8)) {
                var debounceResize = _.debounce(function(){
                     if (window.innerWidth < 780){
                         guxApp.textExpand.init();
                      } else{
                        $('.control').remove();
                        $(".hiddenContent").show();
                      }
                },200);

                $(window).on('resize', debounceResize);
            }
        },

        contentToggle: function(hidden,controlTexts,controlTemplate){
            
            guxApp.textExpand.controlsInit(hidden,controlTexts,controlTemplate);

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
        guxApp.textExpand.init();        
    });



})(jQuery);

