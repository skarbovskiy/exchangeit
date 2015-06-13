define([
    'angular',
    '../core.module'
], function (angular, core) {
    'use strict';

    core.factory('Http', [
        '$http',
        '$q',
        '$rootScope',
        '$window',
        '$location',
        function ($http, $q, $rootScope, $window, $location) {

            if (!$window.localStorage) {
                $rootScope.$emit('error', new Error('client storage not available'));
            }

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

            function makeRequest (type, url, data) {
                data = data || {};

                var defer = $q.defer();

                return (function () {
                    var token = $window.localStorage.getItem('session') || undefined;
                    data = data || {};
                    var request = {
                        method: type,
                        url: url,
                        headers: {
                            'auth-token': token
                        },
                        data: data
                    };
                    $http(request)
                        .success(function (response) {
                            defer.resolve(response);
                        })
                        .error(function (response, status) {
                            var newResponse = {
                                message: response,
                                status: status
                            };
                            defer.reject(newResponse);
                        });

                    return defer.promise;
                }());
            }

            HTTP.post = function (url, data) {
                return makeRequest ('POST', url, data);
            };

            HTTP.put = function (url, data) {
                return makeRequest ('PUT', url, data);
            };

            HTTP.delete = function (url) {
                return makeRequest ('DELETE', url);
            };

            HTTP.get = function (url) {
                return makeRequest ('GET', url);
            };
            return HTTP;
        }
    ]);
});