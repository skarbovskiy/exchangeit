define([
    'angular',
    '../core.module'
], function (angular, core) {
    'use strict';

    core.factory('Http', [
        '$http',
        '$q',
        '$rootScope',
        '$timeout',
        '$location',
        function ($http, $q, $rootScope, $timeout, $location) {

            var HTTP = {
                baseURL: '/',
                useSubDomains: false,
                possibleString: 'abcdefghijklmnopqrstuvwxyz',
                sessionLength: 15 * 60 * 1000,
                expireTimeout: null
            };


            var getServiceUrl = function () {
                var getSubDomainString = function () {
                    var string = '';
                    if (HTTP.useSubDomains === true) {
                        for (var i = 0; i < 5; i++) {
                            string += HTTP.possibleString.charAt(
                                Math.floor(Math.random() * HTTP.possibleString.length)
                            );
                        }
                        string += '.';
                    }
                    return string;
                };
                return $location.protocol() + '://' +
                    getSubDomainString() +  $location.host() + ':' + $location.port() + HTTP.baseURL;
            };

            HTTP.post = function (url, data) {
                data = data || {};

                var defer = $q.defer();

                return (function () {
                    $http.post(getServiceUrl() + url, data)
                        .success(function (response, status, headers) {
                            defer.resolve(response);
                        })
                        .error(function (response) {
                            defer.reject(response);
                        });

                    return defer.promise;
                }());
            };
            return HTTP;
        }
    ]);
});