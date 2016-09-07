/**
 * Created by bjie on 1/31/2015.
 */
var guxApp = guxApp || {};

/*
 Author: 		Jie Bao
 File name:     shareWidget.js
 Description: 	Add ahare button widget according to addthis library.
                Use addthis api to send shared url from input box and title from data-title attribute.
 Usage:         pass in the css class for the share bar
                eg.
                 <div class="share-panel cloned">
                    <ul>
                        <li><a href="#" data-share="" data-title="" data-country="en|cn"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                    </ul>
                    <label>URL</label>
                    <input value="11111">
                    <a class="close">Close</a>
                 </div>
                 guxApp.shareWidget.init('.share-panel.cloned')
 Dependencies: 	jQuery and addthis(http://www.addthis.com/)
 */

(function($) {
    guxApp.shareWidget = {
        init: function(parentClass){
            var parentClass = parentClass || '.media-overlay .share-panel.cloned';
            this._shareBtnContainer = $(parentClass);
            this._shareBtns = this._shareBtnContainer.find('li');
            this._setDefaultUrl();
            this._addEventListener();
        },
        _setDefaultUrl: function(){
            var urlInput = this._shareBtnContainer.find('input');
            urlInput.val(location.href);
        },
        _addEventListener: function(){
            var self = this;
            this._shareBtns.off('click').on('click',function(e){
                e.preventDefault();
                var sharedUrl = (self._shareBtnContainer.find('input').val()) ? self._shareBtnContainer.find('input').val() : location.href;
                var sharedTitle = $(this).find('a').data('title');
                var sharedSite = $(this).find('a').data('share');
                var shareCountry = $(this).find('a').data('country');

                if((shareCountry === 'en') && (typeof addthis_sendto === 'function')){
                    addthis.update('share','url', sharedUrl);
                    addthis.update('share','title', sharedTitle);
                    addthis_sendto(sharedSite);
                }else if((shareCountry === 'cn') && (typeof jiathis_sendto === 'function')){
                    jiathis_config.url = sharedUrl;
                    jiathis_config.title = sharedTitle;
                    jiathis_sendto(sharedSite);
                }
            });
        }
    }
})(jQuery);