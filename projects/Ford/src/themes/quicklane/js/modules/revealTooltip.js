/*
Author: 		Roy Anonuevo
File name: 		revealTooltip.js
Description: 	Reveal tooltip for specific target element
                To use: 
                qlApp.revealTooltip.show(targetElem, content, verticalMargin, horizontalMargin);

Dependencies: 	jQuery, Underscore, TinyPubSub
*/

var qlApp = qlApp || {};

(function($){

	qlApp.revealTooltip = {

		init: function(){
			 if(!$("#content-tooltip").length){
			 	// append content tooltip once
			 	$('body').append('<div id="content-tooltip"></div>');
			 }

			// cache dom
            this.$window = $(window);
            this.$document = $(document);
			this.$tooltip = $('#content-tooltip');
            this.verticalMargin = 0;
            this.horizontalMargin = 0;

            // hide tooltip first
            this.$tooltip.hide();

            var winResize = _.debounce(this.winResize, 100);

            // bind listener
            this.$tooltip.on('click', this.stopPropagation.bind(this)); 
            this.$document.on('click', this.documentHandler.bind(this)); 
            this.$window.on("resize", winResize);
		},

        stopPropagation: function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
        },

        documentHandler: function(e){
            $.publish('revealtooltip-document-click', [$(e.target)]);
        },

        winResize: function(){
            $.publish('revealtooltip-window-resize');
        },

		show: function(targetElem, content, verticalMargin, horizontalMargin){
            this.reposition(targetElem, content, verticalMargin, horizontalMargin);

            $.subscribe('revealtooltip-window-resize', function(){
                var self = qlApp.revealTooltip;
                self.reposition(targetElem, content, verticalMargin, horizontalMargin);
            });


            // Check if document is clicked
            $.subscribe('revealtooltip-document-click', (function(e, elem){
                if(elem[0] !== targetElem[0]){
                    this.$tooltip.hide().html("");
                    $.publish('revealtooltip-hidden', this.$tooltip);
                    $.unsubscribe('revealtooltip-document-click');
                    $.unsubscribe('revealtooltip-window-resize');
                }
            }).bind(this));
		},


        reposition: function(targetElem, content, verticalMargin, horizontalMargin){
            if(verticalMargin){
                this.verticalMargin = verticalMargin;
            }

            if(verticalMargin){
                this.horizontalMargin = horizontalMargin;
            }

            this.$tooltip.hide().html(content);

            var targetElemOffset = targetElem.offset(),
                targetElemHeight = targetElem.outerHeight(),
                targetElemWidth = targetElem.outerWidth(),

                tooltipWidth = this.$tooltip.outerWidth(),  
                tooltipHeight = this.$tooltip.outerHeight(),

                tooltipTop = targetElemHeight + targetElemOffset.top + this.verticalMargin,
                tooltipTotalTop =  tooltipTop + tooltipHeight,

                tooltipLeft = targetElemWidth + targetElemOffset.left - (this.horizontalMargin + tooltipWidth),
                tooltipTotalLeft =  tooltipLeft;                    


            // VERTICAL
            if(tooltipTotalTop < this.$document.height()){
                $.publish('revealtooltip-tip-position-on-top');
            }else{
                tooltipTop = targetElemOffset.top - tooltipHeight - this.verticalMargin;
                $.publish('revealtooltip-tip-position-on-bottom');
            }


            // HORIZONTAL
            if(tooltipWidth < targetElemOffset.left){
               $.publish('revealtooltip-tip-position-on-right');
            }else{
                tooltipLeft = targetElemOffset.left;
                $.publish('revealtooltip-tip-position-on-left');
            }

            // console.log("document height: "+ this.$document.height());
            // console.log("tooltipHeight: "+ tooltipHeight); 
            // console.log("tooltipTop: "+ tooltipTop);
            // console.log("tooltipTotalTop: " + tooltipTotalTop);

            // console.log("tooltipWidth: "+ tooltipWidth);   
            // console.log("tooltipLeft: "+ tooltipLeft);
            // console.log("tooltipTotalLeft: "+ tooltipTotalLeft);   
            // console.log("-----------------------------------");

            // Set CSS Position
            this.$tooltip.css({'position': 'absolute', 'top':tooltipTop, 'left':tooltipLeft}).show();
            $.publish('revealtooltip-show');
        }
	}

	$(function(){
		qlApp.revealTooltip.init();
	});

})(jQuery);
