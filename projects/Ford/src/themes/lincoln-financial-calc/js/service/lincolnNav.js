
(function() {
    'use strict';

    /**
     * @author Ocampo Ronnel
     * @description Fix lincoln navigation
     * @project Financial calculator
     */
    ND.LFC.financialCalculator
        .factory('lincolnNav', lincolnNav);

    lincolnNav.$inject = ['$window'];

    function lincolnNav($window) {

        return {
            init: init
        };

        /////////////////////////////////////////////

        function init(elem) {

            var element = $(elem || "#menu");

            // Check this module needs to be initalised for this page
            if (!element || !element.size()) {
                return;
            }

            $("span.menu-icon").on("click", function(e) {
                e.preventDefault();

                if (element.hasClass("active")) {
                    element.removeClass("active");
                } else {
                    element.addClass("active");
                }
            });

            $("#nav").find(".nav-item").on("click", function(e) {
                e.preventDefault();

                var $this = $(this);
                var $thisContainer = $this.parent("li");

                if (($window.width() >= 768) && ($window.width() < 977)) {
                    if ($thisContainer.hasClass("active")) {
                        $thisContainer.removeClass("active");
                    } else {
                        $("#nav > li").removeClass("active");
                        $thisContainer.addClass("active");
                    }
                } else if ($window.width() < 768) {
                    var subMenu = $thisContainer.find('.sub-menu');
                    var arrow = $this.find('span');
                    if (subMenu.hasClass('clps-nav')) {
                        subMenu.removeClass('clps-nav').addClass('expand-nav');
                        arrow.removeClass('arrow').addClass('expand-arrow');
                    } else if (subMenu.hasClass('expand-nav')) {
                        subMenu.removeClass('expand-nav').addClass('clps-nav');
                        arrow.removeClass('expand-arrow').addClass('arrow');
                    }
                }
            });

            colCalulator();
        }

        function colCalulator() {

            var colWarp = $("#nav").find(".sub-menu.fat-menu");
            var colNum = colWarp.children("li").size();

            var classAdd = "col-" + colNum;

            colWarp.addClass(classAdd);

        }

    }

})();
