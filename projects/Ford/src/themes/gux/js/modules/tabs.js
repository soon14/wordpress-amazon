/*
Author: Ruiwen Qin
File name: tabs.js
Description: Tab switch
             Tabs become dropdown under mobile view.

             contentSwitch: display the active tab content body
             tabEvent: tab navigation items click event bind and handler

             ## HTML structure example ##
             <div class="tabs-wrap">
                <div class="tabs-switch">
                    <div class="tab-options">
                        <ul class="options">
                            <li data-tab="interior" class="active">
                                <a href="#">Interior</a>
                            </li>
                            <li data-tab="exterior">
                                <a href="#">Exterior</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tabs-content">
                    <div data-tab="interior" class="tab-content active">...</div>
                    <div data-tab="exterior" class="tab-content">...</div>
                </div>
            </div>

Dependencies: jQuery
*/


(function($){
    tabSwitch = {
        init: function(){
            if (!$(".tabs-switch").length) {return;}

            var container = $(".tabs-wrap"),
                options = $(".tabs-switch .options", container),
                currentTab = $(".active", options),
                contentContainer = $(".tabs-content", container);

            tabSwitch.contentSwitch(currentTab);
            tabSwitch.tabEvent(options);
            tabSwitch.iconRemover(options);

            
            if(!guxApp.tools.isIE(8)) {
                window.onresize = function() {
                     if(window.innerWidth >= 768){
                         options.parent().removeClass("open");
                     }
                }
            }

        },
        contentSwitch: function(currentTab){
            var currentCategory = currentTab.data("tab"),
                tabContent = $('.tab-content[data-tab="' + currentCategory + '"]');

            tabContent.siblings().removeClass('active');
            tabContent.addClass("active");

            // when tabs are switched, publish the event
            $.publish('tab-switched');
        },
        tabEvent: function(options){
            var tabItems = $("li", options);

            tabItems.click(function(e){
                e.preventDefault();
                var self = $(this);
                tabItems.removeClass("active");
                self.addClass("active");
                tabSwitch.contentSwitch(self);


            });

            
            options.click(function(){
                if (window.innerWidth < 768){
                    $(this).parent().toggleClass("open");
                }
            });            
        },

        // this will check if there's only 1 tab then it will remove the icon for dropdown.
        iconRemover: function(options){
            var tab = $('li',options);
            if(!tab.eq('1').length){
                tab.find('.icon').hide();
            }
        }
    };

    $(function(){
        tabSwitch.init();
    });

})(jQuery);