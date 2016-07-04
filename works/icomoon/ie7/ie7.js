/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-Circle-Dollar': '&#xe900;',
		'icon-Solid-Dollar': '&#xe901;',
		'icon-360-solid': '&#xe600;',
		'icon-360-open': '&#xe601;',
		'icon-apply-credit-solid': '&#xe602;',
		'icon-apply-credit-open': '&#xe603;',
		'icon-build-price-solid': '&#xe604;',
		'icon-build-price-open': '&#xe605;',
		'icon-certified-pre-owned-solid': '&#xe606;',
		'icon-certified-pre-owned-open': '&#xe607;',
		'icon-change-location-solid': '&#xe608;',
		'icon-change-location-open': '&#xe609;',
		'icon-check-inventory-solid': '&#xe60a;',
		'icon-check-inventory-open': '&#xe60b;',
		'icon-compare-competitors-solid': '&#xe60c;',
		'icon-compare-competitors-open': '&#xe60d;',
		'icon-estimate-payments-solid': '&#xe60e;',
		'icon-estimate-payments-open': '&#xe60f;',
		'icon-find-dealer-solid': '&#xe610;',
		'icon-find-dealer-open': '&#xe611;',
		'icon-ford-credit-solid': '&#xe612;',
		'icon-ford-credit-open': '&#xe613;',
		'icon-get-brochure-solid': '&#xe614;',
		'icon-get-brochure-open': '&#xe615;',
		'icon-get-updates-solid': '&#xe616;',
		'icon-get-updates-open': '&#xe617;',
		'icon-images-solid': '&#xe618;',
		'icon-images-open': '&#xe619;',
		'icon-incentives-solid': '&#xe61a;',
		'icon-incentives-open': '&#xe61b;',
		'icon-request-quote-solid': '&#xe61c;',
		'icon-request-quote-open': '&#xe61d;',
		'icon-send-to-phone-solid': '&#xe61e;',
		'icon-send-to-phone-open': '&#xe61f;',
		'icon-trade-in-solid': '&#xe620;',
		'icon-trade-in-open': '&#xe621;',
		'icon-view-map-solid': '&#xe622;',
		'icon-view-map-open': '&#xe623;',
		'icon-wheels-solid': '&#xe624;',
		'icon-wheels-open': '&#xe625;',
		'icon-m-circled-plus': '&#xe626;',
		'icon-youtube': '&#xe627;',
		'icon-d-unchecked': '&#xe628;',
		'icon-d-checked': '&#xe629;',
		'icon-d-close-solid': '&#xe62a;',
		'icon-d-details': '&#xe62b;',
		'icon-d-details-hover': '&#xe62c;',
		'icon-d-filter': '&#xe62d;',
		'icon-d-minus': '&#xe62e;',
		'icon-d-plus': '&#xe62f;',
		'icon-d-info': '&#xe630;',
		'icon-d-info-hover': '&#xe631;',
		'icon-d-get-location': '&#xe632;',
		'icon-d-search': '&#xe633;',
		'icon-d-warning': '&#xe634;',
		'icon-d-question': '&#xe635;',
		'icon-d-question-hover': '&#xe636;',
		'icon-m-circled-minus': '&#xe637;',
		'icon-fc-phone-circled': '&#xe638;',
		'icon-fc-change-location': '&#xe639;',
		'icon-fc-view-map': '&#xe63a;',
		'icon-icon-m-phone-hover': '&#xe63b;',
		'icon-icon-fc-change-location-hover': '&#xe63c;',
		'icon-d-send-to': '&#xe63d;',
		'icon-d-close': '&#xe63e;',
		'icon-d-close-hover': '&#xe63f;',
		'icon-d-email': '&#xe640;',
		'icon-d-email-hover': '&#xe641;',
		'icon-d-directions': '&#xe642;',
		'icon-d-directions-hover': '&#xe643;',
		'icon-d-link': '&#xe644;',
		'icon-d-link-hover': '&#xe645;',
		'icon-d-phone': '&#xe646;',
		'icon-d-plus-hollow': '&#xe647;',
		'icon-d-plus-hollow-hover': '&#xe648;',
		'icon-d-search2': '&#xe649;',
		'icon-d-search2-hover': '&#xe64a;',
		'icon-d-sendto': '&#xe64b;',
		'icon-d-sendto-hover': '&#xe64c;',
		'icon-m-unchecked': '&#xe64d;',
		'icon-m-checked': '&#xe64e;',
		'icon-m-close-solid': '&#xe64f;',
		'icon-m-details': '&#xe650;',
		'icon-m-filter': '&#xe651;',
		'icon-m-minus': '&#xe652;',
		'icon-m-plus': '&#xe653;',
		'icon-m-info': '&#xe654;',
		'icon-m-get-location': '&#xe655;',
		'icon-m-question': '&#xe656;',
		'icon-m-search': '&#xe657;',
		'icon-m-warning': '&#xe658;',
		'icon-m-phone-circled': '&#xe659;',
		'icon-m-chevron-hollow': '&#xe65a;',
		'icon-m-close': '&#xe65b;',
		'icon-m-email': '&#xe65c;',
		'icon-m-directions': '&#xe65d;',
		'icon-m-play': '&#xe65e;',
		'icon-m-plus-hollow': '&#xe65f;',
		'icon-m-search2': '&#xe660;',
		'icon-new-window': '&#xe661;',
		'icon-chevron-thin-left': '&#xe662;',
		'icon-chevron-thin-right': '&#xe663;',
		'icon-vehicle-stripped-chassis': '&#xe664;',
		'icon-vehicle-chassis': '&#xe665;',
		'icon-vehicle-van': '&#xe666;',
		'icon-vehicle-people-mover': '&#xe667;',
		'icon-vehicle-truck': '&#xe668;',
		'icon-vehicle-sedan': '&#xe669;',
		'icon-vehicle-hatch': '&#xe66a;',
		'icon-vehicle-coupe': '&#xe66b;',
		'icon-vehicle-estate': '&#xe66c;',
		'icon-vehicle-convertible': '&#xe66d;',
		'icon-vehicle-suv': '&#xe66e;',
		'icon-vehicle-crossover': '&#xe66f;',
		'icon-vehicle-manual': '&#xe670;',
		'icon-vehicle-performance': '&#xe671;',
		'icon-vehicle-hybrid': '&#xe672;',
		'icon-icon-m-chevron-hover': '&#xe673;',
		'icon-nav-vehicle': '&#xe674;',
		'icon-shop': '&#xe675;',
		'icon-chat-now': '&#xe676;',
		'icon-primary-applicant': '&#xe677;',
		'icon-finance': '&#xe678;',
		'icon-joint-applicant': '&#xe679;',
		'icon-chevron-fat': '&#xe67a;',
		'icon-print': '&#xe67b;',
		'icon-owner': '&#xe67c;',
		'icon-calendar': '&#xe67d;',
		'icon-chevron-thin-up': '&#xe67e;',
		'icon-delete': '&#xe67f;',
		'icon-chevron-thin-down': '&#xe680;',
		'icon-locate-a-dealer': '&#xe681;',
		'icon-social': '&#xe682;',
		'icon-profile': '&#xe683;',
		'icon-snail-mail': '&#xe684;',
		'icon-open-mail': '&#xe685;',
		'icon-globe': '&#xe686;',
		'icon-navigation': '&#xe687;',
		'icon-twitter': '&#xe688;',
		'icon-test-drive-rev': '&#xe689;',
		'icon-select-a-vehicle': '&#xe68a;',
		'icon-calendar-rev': '&#xe68b;',
		'icon-send-to-dealer': '&#xe68c;',
		'icon-delete-rev': '&#xe68d;',
		'icon-drive-rev': '&#xe68e;',
		'icon-drive': '&#xe68f;',
		'icon-explore-special-programs-rev': '&#xe690;',
		'icon-explore-special-programs': '&#xe691;',
		'icon-extended-service-plan-rev': '&#xe692;',
		'icon-test-drive': '&#xe693;',
		'icon-extended-service-plan': '&#xe694;',
		'icon-exterior-rev': '&#xe695;',
		'icon-exterior': '&#xe696;',
		'icon-extras-rev': '&#xe697;',
		'icon-extras': '&#xe698;',
		'icon-finance-finder-rev': '&#xe699;',
		'icon-finance-finder': '&#xe69a;',
		'icon-view-shoppers-guide': '&#xe69b;',
		'icon-globe-2': '&#xe69c;',
		'icon-generic-article-rev': '&#xe69d;',
		'icon-generic-article': '&#xe69e;',
		'icon-send-to-dealer-rev': '&#xe69f;',
		'icon-hamburger': '&#xe6a0;',
		'icon-interior-rev': '&#xe6a1;',
		'icon-interior': '&#xe6a2;',
		'icon-joint-applicant-rev': '&#xe6a3;',
		'icon-primary-applicant-rev': '&#xe6a4;',
		'icon-print-rev': '&#xe6a5;',
		'icon-see-commercial-fin-opts-rev': '&#xe6a6;',
		'icon-see-commercial-fin-opts': '&#xe6a7;',
		'icon-select-a-vehicle-rev': '&#xe6a8;',
		'icon-select-a-vehicle2': '&#xe6a9;',
		'icon-tech-rev': '&#xe6aa;',
		'icon-tech': '&#xe6ab;',
		'icon-twitter-rev': '&#xe6ac;',
		'icon-view-shoppers-guide-rev': '&#xe6ad;',
		'icon-mobile-nav-tech': '&#xe6ae;',
		'icon-extras-bp': '&#xe6af;',
		'icon-packages': '&#xe6b0;',
		'icon-payload': '&#xe6b1;',
		'icon-models-transit': '&#xe6b2;',
		'icon-close': '&#xe6b3;',
		'icon-emergency-call-number-25px': '&#xe6b4;',
		'icon-emergency-call-number-50px': '&#xe6b5;',
		'icon-color': '&#xe6b6;',
		'icon-emergency-call-number-rev-50px': '&#xe6b7;',
		'icon-emergency-call-number-125px': '&#xe6b8;',
		'icon-flat-tire-change-25px': '&#xe6b9;',
		'icon-flat-tire-change-50px': '&#xe6ba;',
		'icon-flat-tire-change-rev-50px': '&#xe6bb;',
		'icon-flat-tire-change-125px': '&#xe6bc;',
		'icon-fuel-delivery-25px': '&#xe6bd;',
		'icon-fuel-delivery-50px': '&#xe6be;',
		'icon-fuel-delivery-rev-50px': '&#xe6bf;',
		'icon-fuel-delivery-125px': '&#xe6c0;',
		'icon-have-questions-faqs-25px': '&#xe6c1;',
		'icon-have-questions-faqs-50px': '&#xe6c2;',
		'icon-have-questions-faqs-rev-50px': '&#xe6c3;',
		'icon-have-questions-faqs-125px': '&#xe6c4;',
		'icon-lock-out-assistance-25px': '&#xe6c5;',
		'icon-lock-out-assistance-50px': '&#xe6c6;',
		'icon-lock-out-assistance-rev-50px': '&#xe6c7;',
		'icon-lock-out-assistance-125px': '&#xe6c8;',
		'icon-maintenance-schedule-25px': '&#xe6c9;',
		'icon-maintenance-schedule-50px': '&#xe6ca;',
		'icon-maintenance-schedule-rev-50px': '&#xe6cb;',
		'icon-maintenance-schedule-125px': '&#xe6cc;',
		'icon-manuals-25px': '&#xe6cd;',
		'icon-manuals-50px': '&#xe6ce;',
		'icon-manuals-rev-50px': '&#xe6cf;',
		'icon-manuals-125px': '&#xe6d0;',
		'icon-owner-advantage-rewards-25px': '&#xe6d1;',
		'icon-owner-advantage-rewards-50px': '&#xe6d2;',
		'icon-owner-advantage-rewards-rev-50px': '&#xe6d3;',
		'icon-owner-advantage-rewards-125px': '&#xe6d4;',
		'icon-post-a-message-25px': '&#xe6d5;',
		'icon-post-a-message-50px': '&#xe6d6;',
		'icon-post-a-message-rev-50px': '&#xe6d7;',
		'icon-post-a-message-125px': '&#xe6d8;',
		'icon-power-and-engine-25px': '&#xe6d9;',
		'icon-power-and-engine-50px': '&#xe6da;',
		'icon-power-and-engine-rev-50px': '&#xe6db;',
		'icon-power-and-engine-125px': '&#xe6dc;',
		'icon-roadside-assistance-25px': '&#xe6dd;',
		'icon-roadside-assistance-50px': '&#xe6de;',
		'icon-roadside-assistance-rev-50px': '&#xe6df;',
		'icon-roadside-assistance-125px': '&#xe6e0;',
		'icon-schedule-service-25px': '&#xe6e1;',
		'icon-schedule-service-50px': '&#xe6e2;',
		'icon-schedule-service-rev-50px': '&#xe6e3;',
		'icon-schedule-service-125px': '&#xe6e4;',
		'icon-tire-finder-25px': '&#xe6e5;',
		'icon-tire-finder-50px': '&#xe6e6;',
		'icon-tire-finder-rev-50px': '&#xe6e7;',
		'icon-tire-finder-125px': '&#xe6e8;',
		'icon-towing-25px': '&#xe6e9;',
		'icon-towing-50px': '&#xe6ea;',
		'icon-towing-rev-50px': '&#xe6eb;',
		'icon-towing-125px': '&#xe6ec;',
		'icon-dashboard-indicator-25px': '&#xe6ed;',
		'icon-dashboard-indicator-50px': '&#xe6ee;',
		'icon-dashboard-indicator-rev-50px': '&#xe6ef;',
		'icon-dashboard-indicator-125px': '&#xe6f0;',
		'icon-battery-jump-start-25px': '&#xe6f1;',
		'icon-battery-jump-start-50px': '&#xe6f2;',
		'icon-battery-jump-start-rev-50px': '&#xe6f3;',
		'icon-battery-jump-start-125px': '&#xe6f4;',
		'icon-chat-now-open': '&#xe6f5;',
		'icon-app-link-125': '&#xe6f6;',
		'icon-app-link-25px': '&#xe6f7;',
		'icon-app-link-50px': '&#xe6f8;',
		'icon-app-link-rev-50px': '&#xe6f9;',
		'icon-basic-warranty-125': '&#xe6fa;',
		'icon-basic-warranty-25px': '&#xe6fb;',
		'icon-basic-warranty-50px': '&#xe6fc;',
		'icon-basic-warranty-rev-50px': '&#xe6fd;',
		'icon-coupons-and-offers-125': '&#xe6fe;',
		'icon-electrical-125-125': '&#xe6ff;',
		'icon-electrical-50px': '&#xe700;',
		'icon-electrical-rev-50px': '&#xe701;',
		'icon-engine-50px': '&#xe702;',
		'icon-engine-rev-50px': '&#xe703;',
		'icon-field-service-action-125': '&#xe704;',
		'icon-field-service-action-25px': '&#xe705;',
		'icon-field-service-action-50px': '&#xe706;',
		'icon-field-service-action-rev-50px': '&#xe707;',
		'icon-fixed-and-capped-price-servicing-125': '&#xe708;',
		'icon-fixed-capped-price-servicing-25px': '&#xe709;',
		'icon-fixed-capped-price-servicing-50px': '&#xe70a;',
		'icon-fixed-capped-price-servicing-rev-50px': '&#xe70b;',
		'icon-ford-custom-accessories-125': '&#xe70c;',
		'icon-ford-custom-accessories-25px': '&#xe70d;',
		'icon-ford-custom-accessories-50px': '&#xe70e;',
		'icon-ford-custom-accessories-rev-50px': '&#xe70f;',
		'icon-ford-magazine-125': '&#xe710;',
		'icon-ford-magazine-25px': '&#xe711;',
		'icon-ford-magazine-50px': '&#xe712;',
		'icon-ford-magazine-rev-50px': '&#xe713;',
		'icon-ford-merchandise-125': '&#xe714;',
		'icon-ford-merchandise-store-25px': '&#xe715;',
		'icon-ford-merchandise-store-50px': '&#xe716;',
		'icon-ford-merchandise-store-rev-50px': '&#xe717;',
		'icon-ford-parts-125': '&#xe718;',
		'icon-ford-parts-25px': '&#xe719;',
		'icon-ford-parts-50px': '&#xe71a;',
		'icon-ford-parts-rev-50px': '&#xe71b;',
		'icon-getrebates-125': '&#xe71c;',
		'icon-get-rebates-125': '&#xe71d;',
		'icon-get-rebates-25px': '&#xe71e;',
		'icon-get-rebates-50px': '&#xe71f;',
		'icon-get-rebates-rev-50px': '&#xe720;',
		'icon-hands-free-calling-125': '&#xe721;',
		'icon-hands-free-calling-25px': '&#xe722;',
		'icon-hands-free-calling-50px': '&#xe723;',
		'icon-hands-free-calling-rev-50px': '&#xe724;',
		'icon-music-and-media-125': '&#xe725;',
		'icon-music-and-media-25px': '&#xe726;',
		'icon-music-and-media-50px': '&#xe727;',
		'icon-music-and-media-rev-50px': '&#xe728;',
		'icon-owner-app-125': '&#xe729;',
		'icon-owner-app-25px': '&#xe72a;',
		'icon-owner-app-50px': '&#xe72b;',
		'icon-owner-app-rev-50px': '&#xe72c;',
		'icon-roadside-assistance-50px2': '&#xe72d;',
		'icon-roadside-assistance-rev-50px2': '&#xe72e;',
		'icon-service-history-125': '&#xe72f;',
		'icon-service-history-25px': '&#xe730;',
		'icon-service-history-50px': '&#xe731;',
		'icon-service-history-rev-50px': '&#xe732;',
		'icon-settings-125': '&#xe733;',
		'icon-settings-25px': '&#xe734;',
		'icon-settings-50px': '&#xe735;',
		'icon-settings-rev-50px': '&#xe736;',
		'icon-step-by-step-125': '&#xe737;',
		'icon-step-by-step-25px': '&#xe738;',
		'icon-step-by-step-50px': '&#xe739;',
		'icon-step-by-step-rev-50px': '&#xe73a;',
		'icon-support-how-tos-125': '&#xe73b;',
		'icon-support-how-tos-25px': '&#xe73c;',
		'icon-support-how-tos-50px': '&#xe73d;',
		'icon-support-how-tos-rev-50px': '&#xe73e;',
		'icon-sync-how-tos-125': '&#xe73f;',
		'icon-sync-how-tos-25px': '&#xe740;',
		'icon-sync-how-tos-50px': '&#xe741;',
		'icon-sync-how-tos-rev-50px': '&#xe742;',
		'icon-update-your-sync-125': '&#xe743;',
		'icon-update-your-sync-25px': '&#xe744;',
		'icon-update-your-sync-50px': '&#xe745;',
		'icon-update-your-sync-rev-50px': '&#xe746;',
		'icon-vehicle-health-report-125': '&#xe747;',
		'icon-vehicle-health-report-25px': '&#xe748;',
		'icon-vehicle-health-report-50px': '&#xe749;',
		'icon-vehicle-health-report-rev-50px': '&#xe74a;',
		'icon-vehicle-report-card-125': '&#xe74b;',
		'icon-vehicle-report-card-25px': '&#xe74c;',
		'icon-vehicle-report-card-50px': '&#xe74d;',
		'icon-vehicle-report-card-rev-50px': '&#xe74e;',
		'icon-voice-commands-125': '&#xe74f;',
		'icon-voice-commands-25px': '&#xe750;',
		'icon-voice-commands-50px': '&#xe751;',
		'icon-voice-commands-rev-50px': '&#xe752;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
