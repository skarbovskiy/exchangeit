define([
    'angular',
    '../core.module'
], function (angular, core) {
    'use strict';

    core.factory('Session', [
        '$window',
        'Http',
        function ($window, Http) {

            function _retrieveToken () {
                return Http.post('/core/session')
                    .then(function (response) {
                        $window.localStorage.setItem('session', response.token);
                        return response;
                    });
            }

            var Service = {
                getToken: function () {
                    var existingToken = $window.localStorage.getItem('session') || undefined;
                    if (existingToken) {
                        return Http.get('/core/session')
                            .then(function (response) {
                                return response;
                            })
                            .catch(function () {
                                $window.localStorage.setItem('session', '');
                                return _retrieveToken();
                            });
                    } else {
                        return _retrieveToken();
                    }
                }
            };
            return Service;
        }
    ]);
});