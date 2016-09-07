/**
 * @author Sohrab Zabetian
 * @description Utils used in Lincoln Build and price
 * @project Lincoln Build and Price
 */

ND.LBP.Utils = (function () {
    return {
        /**
         *  convert strings with / to some random text
         *  for instance convert B/C to BAZXXZAC
         * @param str
         * @returns {string}
         */
        removeDotSlash: function (str) {

            return str.split('/').join('AZX').split('.').join('XZA');
        },

        /**
         *  undo the steps in removeDotSlash
         * @param str
         * @returns {string}
         */
        addDotSlash: function (str) {
            return str.split('AZX').join('/').split('XZA').join('.');
        },

        pad2: function (number) {  // always returns a string
            return (number < 10 ? '0' : '') + number;
        }



    };
})();