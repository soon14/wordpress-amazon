/**
 * @author Sohrab Zabetian
 * @description service responsible for caching and retrieving data from server
 * @project Financial calculator
 */
ND.LFC.financialCalculator.factory('webAPI', ['$http', '$q', 'appValue', function ($http, $q, appValue) {

    var cache = {

    },
        services = {
            get: function (url, appValueAttrName) {
                if (services.isCached(url)) {
                    var defer = $q.defer();
                    //                      console.log('data is cached for url ' + url);
                    var cachedData = services.cached(url);
                    //  console.log('data for url ' + cachedData);

                    appValue[appValueAttrName] = cachedData;
                    defer.resolve(cachedData);

                    return defer.promise;
                }
                return $http.get(url).then(function (data) {
                    //                        console.log('get data from the server');
                    //    console.log(data.data);
                    services.store(url, data.data);
                    appValue[appValueAttrName] = data.data;
                    return data.data;
                });
            },

            store: function (url, value) {
                //   console.log('store url ' + url );
                //   console.log(value );
                cache[url] = value;

                //   console.dir(cache);
            },

            cached: function (url) {
                return cache[url];
            },

            isCached: function (url) {
                return angular.isDefined(cache[url]) && cache[url] != null;
            },

            reset: function (appValueAttrName) {
                appValue[appValueAttrName] = null;
            }
        },

        publicServices = {

            getModels: function () {
                return services.get(ND.LFC.configJSON.modelsUrl, 'models');
            },

            getSeries: function (model) {
                return services.get(ND.LFC.configJSON.derivativesUrl.replace(':model', model.id), 'series');
            },

            resetSeries: function () {
                services.reset('series');
            },

            getGMFV: function (modelID,seriesID,userSelectedIDs) {
                var gmfvPriceUrl = ND.LFC.configJSON
                                        .gmfvPriceUrl
                                        .replace('{modelID}', modelID)
                                        .replace('{seriesID}', seriesID)
                                        .replace('{userselectedIDs}', userSelectedIDs);

                return services.get(gmfvPriceUrl, 'gmfv');
            }
        };

    //console.dir(apiConstants);

    return publicServices;
}]);