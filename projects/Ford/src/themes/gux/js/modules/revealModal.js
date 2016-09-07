/*
Author: Ruiwen Qin
File name: revealModal.js
Description: AJAX loading for foundation reveal modal
            "reveal-content-modal" class needs to be added, and the clicking event will be handeled here.

            The HTML structure for reveal modal needs to be put on the page as following

            <!-- Foundation Reveal Content Modal -->
            <div id="content-modal" class="reveal-modal">
                <div class="content"></div>
                <a class="close-reveal-modal" href="#">Close</a>
            </div>            
            sizing(foundation default):
            .tiny: 30% wide
            .small: 40% wide
            .medium: 60% wide
            .large: 80% wide - default, if no class is selected, this is the size that gets applied.
            .xlarge: 90% wide
            .full: 100% width and height, defaults the escClose option to true, as well as creates a close button.
            default .full on mobile size ( $(window).size<=751) and .large on desktop size( $(window).size > 751)
            use dataset to change default size on desktop size. e.g. data-reveal-sizing="medium"

            sizing(customized):
            .fixed-tiny: 490px
            .fixed-small: 655px
            .fixed-medium: 980px
            .fixed-large: 1310px
            .fixed-xlarge: 1470px

Dependencies: jQuery, foundation.reveal.js
*/

(function($){
    revealModal = {
        init: function(){
            if (!$(".reveal-content-modal").length) {return;}



            $(".reveal-content-modal").on('click', function(e){
                e.preventDefault();
                
                var modalContent = $(this).attr("href"),
                    elem = $(this),
                    modalContainer = $("#content-modal");



                $.ajax({
                    url: modalContent,
                    success: function(data) {
                        revealModal.modalSuccess(data,elem,modalContainer);
                    }
                });



                $(window).resize(function(){
                    if(modalContainer.is(":visible")){
                        revealModal.modalResize(elem,modalContainer);
                    }
                    
                });

            });

            revealModal.modalClose();
        },
        modalResize: function(elem,modalContainer){
            if($(window).width() > 767){
                //$(".reveal-modal-bg").show();
                $("body").removeClass("no-scroll has-scroll");
                modalContainer.removeClass("full").addClass(elem.data("reveal-sizing")).css({"top":$(window).scrollTop() + modalContainer.data('css-top') +'px'});
            }
            else {
                //$(".reveal-modal-bg").hide();
                $("body").addClass("no-scroll has-scroll");
                modalContainer.removeClass(elem.data("reveal-sizing")).addClass("full");
            }
        },
        modalSuccess: function(data,elem,modalContainer) {
            //fix reveal close not working
            $(".reveal-modal-bg").show();
            $("#content-modal").show();
            $("#content-modal .content").html(data);
            
            $("#content-modal").foundation("reveal", "open", {
                animationSpeed: 100,
                animation: "fade"
            });

            revealModal.modalResize(elem,modalContainer);
            $.publish('foundation-reveal-modal-open',[elem]);
            
        },
        modalClose: function(){
            $("#content-modal .close-reveal-modal").on("click", function(e) {
                e.preventDefault();
                $(".reveal-modal").foundation("reveal", "close");
                //fix reveal close not working
                $(".reveal-modal-bg").hide();
                $("#content-modal").hide();
                setTimeout(function() {
                    $("#content-modal .content").html("");
                }, 500);

                // ensure focus onto document body after overlay is closed - IE has focus issues
                $("body").focus();

                $.publish('foundation-reveal-modal-close');
                $("body").removeClass("no-scroll has-scroll");
            });
        }
        
    };

    $(function(){
        revealModal.init();
    });

})(jQuery);