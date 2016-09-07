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

Dependencies: jQuery, foundation.reveal.js
*/

(function($){
    revealModal = {
        init: function(){
            if (!$(".reveal-content-modal").length) {return;}

            $(".reveal-content-modal").on('click', function(e){
                e.preventDefault();
                
                var modalContent = $(this).attr("href"),
                    elem = $(this);

                $.ajax({
                    url: modalContent,
                    success: function(data) {
                        revealModal.modalSuccess(data,elem);
                    }
                });
            });

            revealModal.modalClose();
        },
        modalSuccess: function(data, elem) {
            //fix reveal close not working
            $(".reveal-modal-bg").show();
            $("#content-modal").show();
            $("#content-modal .content").html(data);
            
            $("#content-modal").foundation("reveal", "open", {
                animationSpeed: 100,
                animation: "fade"
            });

            $.publish('foundation-reveal-modal-open',[elem]);

        },
        modalClose: function(){
            $("#content-modal .close-reveal-modal").on("click", function(e) {
                e.preventDefault();
                revealModal.close();
            });
        },

        close: function(){
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
        }        
    };

    $(function(){
        revealModal.init();
    });

})(jQuery);