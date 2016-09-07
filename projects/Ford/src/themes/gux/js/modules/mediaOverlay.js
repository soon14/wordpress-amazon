/*
Author:         Brett Chaney
File name:      mediaOverlay.js
Description:    initiates Bootstrap modals
Dependencies:   jQuery, jquery.flexslider.js, carousel.js and bootstrap.modal.js
Usage:          add class="open-media-overlay" to anchor that will open the modal. The href of the modal content needs to be in the href of the link.
                For an image carousel modal, group images like this: class="overlay-groupx". Where "x" is the number of the group.
                An example: <a href="modal-media-image1.html" class="open-media-overlay overlay-group1" data-media-type="image" itemprop="contentUrl">
                                <img src="media/gallery/gallery-exterior2.jpg" alt="gallery exterior" itemprop="thumbnailUrl">
                            </a>
*/

var guxApp = guxApp || {};

(function($){
    guxApp.mediaOverlay = {
        overlayHTML: "<section class='image-carousel'><div class='row fullwidth'><div class='large-12 columns'><div class='carousel carousel-main flexslider'><ul class='slides'></ul></div><div class='carousel carousel-fader flexslider'><ul class='slides'></ul></div></div></div></section>",

        init: function(){
            var self = this;

            // this will fetch the json value from gux/common/json/mediaOverlay-config.html
            self.slideText = guxApp.tools.getEmbeddedData("#media-overlay-services");

            
            if (!$(".open-media-overlay").length){return;}

            guxApp.mediaOverlay.hideDetailsClick = false;
            guxApp.mediaOverlay.overlayOpen = false;

            // this is for the external disclaimer overlay
            // move close button
            $(".buzz a.external-disclaimer").on("click", function() {
                setTimeout(function(){
                    $(".overlay-box.external-disclaimer .close-button").clone().prependTo($(".ext-disc")).show();
                },200);
            });

            $("#modalWrap .modal-body").append(this.overlayHTML);

            $(".open-media-overlay").on("click", function(e) {
                e.preventDefault();

                var elem            = $(this),
                    mediaType       = elem.data("media-type"),
                    reg             = /overlay-[^\s$]+/,
                    overlayGroup    = elem.attr("class").match(reg),
                    videoType       = elem.data("video-type");

                $(this).addClass("active-overlay");

                self.updateMobileCarousel($(this));

                if (mediaType === "video") {
                    $(".modal-body").addClass("loading-video");
                }

                guxApp.mediaOverlay.appendAssetID(elem);

                if (guxApp.mediaOverlay.overlayOpen === false) {
                    guxApp.mediaOverlay.openOverlay(elem, overlayGroup, mediaType, videoType);
                }
            });

            $(".open-media-overlay").on('touchstart', function() {
                $(this).parent().addClass('hover');
            }).on('touchend',function(){
                $(this).parent().removeClass('hover');
            });

            function triggerOverlay() {
                if (window.location.toString().indexOf("#overlay") != -1) {
                    var assetIDClass = "asset-" + guxApp.mediaOverlay.getOverlayID();
                
                    $("a[data-overlay-id="+ assetIDClass + "]").eq(0).trigger("click");
                }
            }

            window.onhashchange = triggerOverlay;

            triggerOverlay();
        },

        
        updateMobileCarousel: function($curSpot){
            var sliderIndex = $curSpot.parent().index() - 1;
            var mobHook = $curSpot.parents('.hs-triggers').next('.flexslider').find('.flex-control-nav li').eq(sliderIndex).find('a');
            mobHook.click();
        },

        getOverlayID: function(){
            var hash = window.location.hash,
                overlayId;

            if (hash.indexOf("?")!=-1) {
                hash =  hash.substring(0, hash.indexOf("?"));
            }

            overlayId = hash.substring(9);          
            
            return overlayId;
        },

        appendAssetID: function(elem) {
            if (!elem.data("overlay-id")){return;}

            var overlayID   = elem.data("overlay-id"),
                idxAsset = overlayID.indexOf("-"),
                assetStr = overlayID.substring(idxAsset + 1);

            $(".modal").addClass(assetStr);

            if (Modernizr.history) {
                window.history.pushState(null, null, "#overlay=" + assetStr);
            } else {
                window.location.hash="#overlay=" + assetStr;
            }
        },

        openOverlay: function(elem, overlayGroup, mediaType, videoType){
            $("#modalWrap").addClass("media-overlay").prepend("<div class='loading-overlay' />").modal({
                    "backdrop" : false,
                    "keyboard" : false
                });

            if (mediaType === "video") {
                $(".modal").attr("itemtype", "http://schema.org/VideoGallery");
                $(".modal .modal-content").addClass("video");
            }

            guxApp.mediaOverlay.overlayOpen = true;
            
            this.populateSlides(elem, overlayGroup, mediaType, videoType);
        },

        applyVideosStrategy: function(videoType){
            if(videoType === 'jwplayer'){
                
                if ($(".BrightcoveExperience").length) {
                    $(".BrightcoveExperience").remove();
                }
                guxApp.video.init();           

            }else if(videoType === 'brightcove'){
                
                if(brightcove){
                    $(".modal-body").removeClass("loading-video");
                    brightcove.createExperiences();            
                }

            }
            return;
        },

        populateSlides: function(elem, overlayGroup, mediaType, videoType) {
            if(mediaType === "video"){

                var videoLink = elem.attr("href");

                $(".media-overlay .carousel-main .slides").load(videoLink, function() {

                    $(".modal .content").parent().prependTo(".modal .carousel-fader .slides");              

                    $(".modal .modal-body").addClass("single-slide").find(".carousel-main .slides > li").css("display", "list-item");

                    guxApp.mediaOverlay.applyVideosStrategy(videoType);
                    guxApp.mediaOverlay.videoInit();
                    guxApp.mediaOverlay.hideDetails();
                    guxApp.mediaOverlay.sharePanelInit();
                    guxApp.mediaOverlay.closeOverlay();
                });

            } else {                

                var groupArr    = [],
                    requests    = [],
                    link        = elem.attr("href"),
                    thisSlide,
                    i;

                // create an array of URL's for each slides content
                if (overlayGroup !== null) {
                    thisSlide = $("." + overlayGroup.toString()).index(elem);
                    
                    elem.parents(".gallery-category").find("." + overlayGroup.toString()).each(function (i, e) {
                        groupArr.push($(e).attr("href"));
                    });
                } else {
                    thisSlide = 0;
                    groupArr.push(link);
                }    

                for (i = 0; i < groupArr.length; i++) {
                    var getURL = groupArr[i].toString();
                    requests.push( $.ajax({url: getURL}) );
                }

                $.when.apply(undefined, requests).then(function() {

                    var slideImg,
                        slideContent,
                        j;

                    if (requests.length > 1) {
                        for (j = 0; j < arguments.length; j++){
                            slideImg        = $(".carousel-slide", arguments[j][0]).parent();
                            slideContent    = $(".content", arguments[j][0]).parent();

                            $(".media-overlay .carousel-main .slides").append(slideImg);
                            $(".media-overlay .carousel-fader .slides").append(slideContent);

                        }
                    } else {
                            slideImg        = $(".carousel-slide", arguments[0]).parent();
                            slideContent    = $(".content", arguments[0]).parent();

                        $(".media-overlay .carousel-main .slides").append(slideImg);
                        $(".media-overlay .carousel-fader .slides").append(slideContent);
                    }
                    
                    // when the slides are populated, do the following...

                    // re-initialise flexslider in modal
                    if ($(".media-overlay .flexslider").length) {                   
                        guxApp.billboardCarousel.init();
                    }

                    // add "single-slide" class
                    if ($(".media-overlay .carousel-main li").length === 1) {
                        $(".modal .modal-body").addClass("single-slide");
                    }

                    if ($(".modal .modal-content").hasClass("video")) {
                        guxApp.mediaOverlay.videoInit();
                    } else {
                        guxApp.mediaOverlay.imagesInit(thisSlide);
                    }

                    if (guxApp.mediaOverlay.hideDetailsClick === false) {
                        guxApp.mediaOverlay.hideDetails();
                    }
                    guxApp.mediaOverlay.sharePanelInit();
                    guxApp.mediaOverlay.closeOverlay();
                });

            }
            
        },

        centerOverlay: function() {
            if (guxApp.viewport.view === "tablet") {
                var screenH = $(window).height(),
                    overlayH = 760;

                $(".modal-dialog").css({"top": (screenH - overlayH) / 2});
            } else {
                $(".modal-dialog").css({"top": ""});
            }
        },

        videoInit: function() {
            $(".containing-block").attr("tabindex", 1).css("outline","none");

            // extra focus for iOS
            $(".modal-body").click(function() {
                $(".containing-block").focus();
            });
        },

        imagesInit: function(thisSlide) {
            // jump to image/description in sliders the user initially clicked on
            if ($(".media-overlay .flexslider").data("flexslider") !== undefined) {

                var slider1         = $(".media-overlay .carousel-main.flexslider").data("flexslider"),
                    slider2         = $(".media-overlay .carousel-fader.flexslider").data("flexslider"),
                    animationSpeed  = slider1.vars.animationSpeed = guxApp.viewport.view === "mobile" ? 300 : 600;

                slider1.vars.animationSpeed = 0;
                slider2.vars.animationSpeed = 0;
                slider1.flexAnimate(thisSlide);
                slider2.flexAnimate(thisSlide);
                slider1.vars.animationSpeed = animationSpeed;
                slider2.vars.animationSpeed = 0;

                $(".media-overlay .mobile-buttons").prepend("<span class='slide-count'></span>");
                $(".media-overlay .title .large-9").append("<span class='slide-count'></span>");

                guxApp.mediaOverlay.updateSlideCount();
                
                slider1.vars.after = function() {
                    // update slide counter ("1 of 3") after slide change event
                    guxApp.mediaOverlay.updateSlideCount();
                    guxApp.mediaOverlay.sharePanelInit();
                    
                    // update hash
                    guxApp.mediaOverlay.currentElem();
                    guxApp.mediaOverlay.appendAssetID($(".open-media-overlay.active-overlay"));

                    // update share panel with latest URL
                    $(".share-panel.cloned input").val(location.href);
                };
            }

            guxApp.mediaOverlay.expandedView();     
        },

        currentElem: function() {
            var currSlide   = $(".media-overlay .carousel-main.flexslider li:has(.flex-active)").index(".media-overlay .flex-control-nav li"),
                reg             = /overlay-[^\s$]+/,
                overlayGroup    = $(".active-overlay").attr("class").match(reg);

            $(".active-overlay").parent().parent().find($("." + overlayGroup.toString())).removeClass("active-overlay").eq(currSlide).addClass("active-overlay");           
        },

        updateSlideCount: function() {
            var currSlide   = $(".media-overlay .carousel-main.flexslider li:has(.flex-active)").index(".media-overlay .flex-control-nav li") + 1,
                totalSlides = $(".media-overlay .carousel-main.flexslider .flex-control-nav li").length,
                slideText = guxApp.mediaOverlay.slideText;

            if($('body').hasClass('rtl')){
                $(".media-overlay .slide-count").html((((totalSlides) - currSlide) + 1) + " " + slideText.slider_count + " " + totalSlides);
            } else {
                $(".media-overlay .slide-count").html(currSlide + " " + slideText.slider_count + " " + totalSlides);
            }    
        },

        checkVisible: function(elm, evalType) {
            evalType = evalType || "visible";

            var vpH = $(window).height(),
                st  = $(window).scrollTop(),
                y   = $(elm).offset().top,
                elementHeight = $(elm).height();

            if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
            if (evalType === "above") return ((y < (vpH + st)));             
        },

        closeOverlay: function() {
            $(".modal").on("click", ".icon-close", function(e) {
                e.preventDefault();    

                $(".modal .loading-overlay").remove();

                $(".modal-body").removeClass("loading-video");    

                // move modal close icon back to original position
                $(".modal .icon-close").prependTo(".modal-content");

                $("#modalWrap.media-overlay").modal("hide").removeClass("expanded media-overlay").find(".modal-dialog").css("max-width","");
                $(".modal .modal-body").html("").append(guxApp.mediaOverlay.overlayHTML).removeClass("single-slide");
                $(".modal .modal-content").removeClass("video");
                $("#modalWrap").removeClass().addClass("modal");

                $(".open-media-overlay").removeClass("active-overlay");

                $(".modal").attr("itemtype", "http://schema.org/ImageGallery");

                if (Modernizr.history) {
                    window.history.pushState(null, null, "#");
                } else {
                    window.location.hash="#";
                }

                // reset variables
                guxApp.mediaOverlay.hideDetailsClick = false;
                guxApp.mediaOverlay.overlayOpen = false;

                $(".modal").off("click", ".icon-close");
            });

            $(".modal .modal-content").mouseup(function (e) {
                if (e.which != 1) return false; // Stops all non-left-clicks
                $(this).focus();
            });

            $(document).keydown(function(e) {
                if(e.keyCode == 27 && $("#video-inner").css("position") !== "fixed") {
                    if (guxApp.mediaOverlay.checkVisible($(".modal"))) {
                        $(".modal .icon-close").trigger("click");
                    }
                } else {
                    $(".modal .icon-close").show();
                }
            });
        },

        hideDetails: function() {
            guxApp.mediaOverlay.hideDetailsClick = true;

            var hideDetailsBtn  = $(".hide-details-btn"),
                hideHTMLText    = hideDetailsBtn.data("hidedetailstext"),
                showHTMLText    = hideDetailsBtn.data("showdetailstext"),
                arrowHTML       = "<span class='icon arrow'></span>";

            // set text Details toggle button
            hideDetailsBtn.html(showHTMLText).append(arrowHTML);

            $(".hide-details-btn").on("click", function(e) {
                e.preventDefault();

                if ($(this).parent().hasClass("active")) {
                    $(this).html(showHTMLText).append(arrowHTML).parent().removeClass("active");
                    $(this).parents(".content").find(".details").removeClass("show").addClass("hide");
                } else {
                    $(this).html(hideHTMLText).append(arrowHTML).parent().addClass("active");
                    $(this).parents(".content").find(".details").removeClass("hide").addClass("show");
                    guxApp.mediaOverlay.scrollToTop();
                }
            });
        },

        sharePanelInit: function() {
            var carouselWidth = $(".image-carousel").width();

            this.cloneSharePanel();

            if (guxApp.viewport.view === "mobile") {
                guxApp.mediaOverlay.mobileShareEvents();
                guxApp.mediaOverlay.initShareBtn();
            } else {            
                guxApp.mediaOverlay.desktopShareEvents();
                guxApp.mediaOverlay.initShareBtn();
            }

            $(window).on("resize", function () {

                var newCarouselWidth = $(window).width();

                if (newCarouselWidth !== carouselWidth) {

                    if ($(".media-overlay")[0]) {
                        if (guxApp.viewport.view === "mobile") {
                            guxApp.mediaOverlay.initShareBtn();
                        } else {
                            // move modal close icon back to original position
                            $(".modal .icon-close").prependTo(".modal-content");
                            guxApp.mediaOverlay.initShareBtn();
                        }

                    }

                }

                carouselWidth = $(window).width();
                    
            });
        },

        cloneSharePanel: function() {
            var shareHTML;

            if ($(".media-overlay .flexslider").data("flexslider") !== undefined) {
                shareHTML = $(".media-overlay .flex-active-slide .share-panel");
            } else {
                shareHTML = $(".media-overlay .carousel-fader .share-panel");
            }

            $(".media-overlay .share-panel.cloned").remove();
            shareHTML.clone().prependTo(".media-overlay .image-carousel").addClass("cloned");
        },      

        mobileSharePosition: function() {
            var screenH = $(window).height(),
                topMargin = (screenH / 2) - 100;

            if (!$(".share-bg").length) {
                $("<div class='share-bg' />").insertBefore(".media-overlay .share-panel.cloned");
            }

            $(".media-overlay .share-panel.cloned").css({"top": topMargin});
        },

        mobileShareEvents: function() {
            $(".media-overlay .mobile-buttons").on("click", ".share-btn", function(e) {
                e.stopPropagation();
                e.preventDefault();
                guxApp.mediaOverlay.mobileSharePosition();
                $(".media-overlay .share-panel.cloned").show();
                $(".share-bg").show();
                
                // move modal close icon otherwise it'll be above the share BG
                $(".modal .icon-close").prependTo(".image-carousel > .row");
            });

            $(".media-overlay .share-panel.cloned").on("click", ".close", function(e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).parents(".share-panel.cloned").hide();
                $(".share-bg").hide();

                // move modal close icon back to original position
                $(".modal .icon-close").prependTo(".modal-content");
            });

            $(".media-overlay .share-panel.cloned").on("click", function(e){
                e.stopPropagation();
            });
            
            //This should trigger omniture which uses .live click listener for share buttons
            $(".media-overlay .share-panel.cloned").on("click", ".trackable", function(e){
                e.stopPropagation();
                
                $(document).triggerHandler({ 
                   type:   'click',
                   target: $(this)[0]
                });
            });

            $(".media-overlay .mobile-buttons").on("click", ".download-btn", function(e) {
                e.stopPropagation();
                
                //This should trigger omniture which uses .live click listener for download button
                $(document).triggerHandler({ 
                   type:   'click',
                   target: $(this)[0]
                });
            });
        },

        desktopShareEvents: function() {
            $(".media-overlay .desktop-buttons .share-btn").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                guxApp.mediaOverlay.desktopSharePosition();
                $(".media-overlay .share-panel.cloned").show();
            });

            $(".media-overlay .share-panel.cloned").on("click", ".close", function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).parents(".share-panel.cloned").hide();
            });
        },

        desktopSharePosition: function() {
            var topPos      = $(".modal .carousel-fader").position().top,
                leftOffset  = $(".modal .modal-body").offset().left,
                leftPos     = $(".modal .flex-active-slide").length > 0 ? $(".modal .flex-active-slide .desktop-buttons .share-btn").offset().left : $(".modal .desktop-buttons .share-btn").offset().left,
                panelOffset = $(".media-overlay .share-panel.cloned").width() - (($(".modal .flex-active-slide").length > 0 ? $(".modal .flex-active-slide .desktop-buttons .share-btn").width() : $(".modal .desktop-buttons .share-btn").width()) / 2);

            if ($(".modal").hasClass("expanded")) {
                $(".media-overlay .share-panel.cloned").css({"top": topPos - 202, "left": (leftPos - leftOffset) - panelOffset});
            } else {
                $(".media-overlay .share-panel.cloned").css({"top": topPos - 90, "left": (leftPos - leftOffset) - panelOffset});
            }
        },

        initShareBtn: function() {
            guxApp.shareWidget.init(".media-overlay .share-panel.cloned");
        },

        checkOrientation: function() {
            var currW = $(".modal").width(),
                currH = $(".modal").height();

            if (currW > currH) {
                return "landscape";
            } else {
                return "portrait";
            }
        },

        expandedView: function() {

            function openExpandedView() {
            
                $(".image-carousel").resize();

                var viewportH   = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                    currentW    = $(".modal-dialog").width(),
                    currentH    = $(".modal-dialog").height(),
                    ratio       = currentW / currentH,
                    slider1     = $(".media-overlay .carousel-main.flexslider").data("flexslider");
            
                $(".expanded .modal-dialog").css("max-width", ratio * viewportH);

                if ($(".media-overlay .flexslider").data("flexslider") !== undefined) {
                    slider1.resize();

                    // this is required to fix ipad resize issues
                    slider1.vars.after = function() {
                        slider1.resize();
                        guxApp.mediaOverlay.updateSlideCount();

                        // update hash
                        guxApp.mediaOverlay.currentElem();
                        guxApp.mediaOverlay.appendAssetID($(".open-media-overlay.active-overlay"));

                        // update share panel with latest URL
                        $(".share-panel.cloned input").val(location.href);
                    };
                }

                if (guxApp.viewport.view === "mobile") {
                    $(".expanded .carousel-main").css({"margin-top": -($(".carousel-slide").height() / 2)}).parent().css({"height": $(window).height()});
                } else {
                    $(".expanded .carousel-main").css({"margin-top": ""}).parent().css({"height": ""});
                }
            }

            function hideUiEvent(firstClick) {
                
                if (guxApp.viewport.view === "mobile") {
                    $(".modal .image-carousel").on("click", function() {
                        if (firstClick) {
                            firstClick = false;
                        } else {

                            var imgCarousel = $(".modal .image-carousel");
                            
                            if (imgCarousel.hasClass("hide-ui")) {
                                imgCarousel.removeClass("hide-ui");
                            } else {
                                imgCarousel.addClass("hide-ui");
                            }
                        }
                    });

                } else {
                    $(".modal .image-carousel").off("click");
                }       
                
            }

            $(".modal .icon-expand").on("click", function(){
                $(".modal").addClass("expanded");
                $(".modal .image-carousel").removeClass("hide-ui");
                $(".media-overlay .share-panel.cloned").hide();

                guxApp.mediaOverlay.zoomImage();

                openExpandedView();
                hideUiEvent(true);

                $(".modal").off("click", ".icon-close");
                $(document).off("keydown");

                $(window).on("resize", function() {
                    if (guxApp.viewport.view === "mobile") {
                        $(".expanded .carousel-main").css({"margin-top": -($(".carousel-slide").height() / 2)}).parent().css({"height": $(window).height()});
                    } else {
                        $(".expanded .carousel-main").css({"margin-top": ""}).parent().css({"height": ""});
                    }
                });
                
                guxApp.mediaOverlay.closeExpandedView();
            });
        },

        closeExpandedView: function() {
            $(".modal.expanded").on("click", ".icon-close", function(e) {
                e.preventDefault();

                // reset inline syles
                $(".modal .modal-dialog").css("max-width","");
                $(".expanded .carousel-main").css({"margin-top": ""}).parent().css({"height": ""});
                
                $(".media-overlay .share-panel.cloned").hide();
                $(".modal .carousel-main article").removeClass("zoomedin").css({"height": "", "width":""});
                $(".image-carousel").find(".loading, img.large-image").remove().end().find(".carousel-slide img").show();

                $(".modal").removeClass("expanded");

                $(".modal .title, .modal .mobile-buttons").css({"height": ""});

                $(".modal .icon-zoom").off("click");

                $(".modal .image-carousel").off("click").resize();

                guxApp.mediaOverlay.closeOverlay();
            });

            $(document).keydown(function(e) {
                if(e.keyCode == 27) {
                    $(".media-overlay .share-panel.cloned").hide();
                    $(".modal.expanded .icon-close").trigger("click");
                } 
            });
        },

        zoomImage: function() {         

            if (guxApp.viewport.view === "tablet") {

                $(".modal .icon-zoom").on("click", function() {

                    var imageParent     = $(this).parent(),
                        zoomedImage     = imageParent.find("img").data("zoom-src"),
                        containerH      = imageParent.parent().height(),
                        containerW      = imageParent.parent().width(),
                        slider          = $(".media-overlay .carousel-main.flexslider").data("flexslider"),
                        imageCarousel   = $(".image-carousel");

                    if ($(".media-overlay .flexslider").data("flexslider") !== undefined) {
                        slider.vars.after = function() {
                            $(".modal .carousel-main article").removeClass("zoomedin").css({"height": "", "width":""});
                            imageCarousel.find(".loading").remove();
                            imageCarousel.find("img.large-image").remove();
                            imageParent.find("img").show();
                            guxApp.mediaOverlay.updateSlideCount();
                        };
                    }

                    if (imageParent.hasClass("zoomedin")) {

                        imageParent.removeClass("zoomedin").css({"height": "", width: ""});
                        imageCarousel.find(".loading").remove();
                        imageCarousel.find("img.large-image").remove();
                        imageParent.find("img").css("display", "block");
                        $(".modal .carousel-slide").unbind("mousedown mousemove mouseleave");

                    } else {

                        imageParent.addClass("zoomedin").css({"height": containerH, "width": containerW});
                        $(this).after("<span class='loading'></span><img src='' alt='' class='large-image' />");

                        imageCarousel.find(".large-image").attr("src", zoomedImage);

                        $(".large-image").imagesLoaded( function() {
                            setTimeout(function() {

                                var zoomedImageH = imageCarousel.find(".large-image").height(),
                                    zoomedImageW = imageCarousel.find(".large-image").width(),
                                    differenceH  = (zoomedImageH - containerH) / 2,
                                    differenceW  = (zoomedImageW - containerW) / 2;

                                imageCarousel.find(".large-image").css({"height":zoomedImageH, "width":zoomedImageW}).siblings("img").hide();
                                imageParent.find(".loading").hide();

                                $(".modal .zoomedin").scrollLeft(differenceW);
                                $(".modal .zoomedin").scrollTop(differenceH);

                                guxApp.mediaOverlay.dragImage();
                            },200);
                            
                        });
                    }

                });

            }

        },

        dragImage: function() {
            var clicking = false,
                previousX,
                previousY;

            $(".modal .zoomedin").mousedown(function(e) {
                e.preventDefault();
                previousX = e.clientX;
                previousY = e.clientY;
                clicking = true;
            });

            $(document).mouseup(function() {
                clicking = false;
            });

            $(".modal .zoomedin").mousemove(function(e) {
                if (clicking) {
                    e.preventDefault();

                    $(".modal .zoomedin").scrollLeft($(".modal .zoomedin").scrollLeft() + (previousX - e.clientX));
                    $(".modal .zoomedin").scrollTop($(".modal .zoomedin").scrollTop() + (previousY - e.clientY));
                    previousX = e.clientX;
                    previousY = e.clientY;
                }
            });

            $(".modal .zoomedin").mouseleave(function() {
                clicking = false;
            });
        },

        scrollToTop: function() {
            var topPosition = ($(".hide-details").length) ? $(".hide-details").offset().top : 0;

            setTimeout(function() {
                $(".modal").animate({
                    scrollTop:topPosition
                },800);
            }, 150);
        }
    };


    $(function() {
        // if "Owner" user is logged in the mediaOverlay.init will be executed in the component-know-vehicle.js file
        // otherwise run mediaOverlay.init
        if ($.cookie("dfy.u") && $(".showroom.personalisation").length) {
            return;
        } else {
            guxApp.mediaOverlay.init();
        }
    });

})(jQuery);