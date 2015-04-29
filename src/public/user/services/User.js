define([
    'angular',
    '../user.module'
], function (angular, user) {
    'use strict';

    user.factory('User', [
        'Http',
        '$window',
        function (Http, $window) {

            function _checkToken () {
                return Http.post('/user/authentication/check_token');
            };

            function _retrieveToken () {
                return Http.post('/user/authentication/get_token')
                    .then(function (response) {
                        $window.localStorage.setItem('session', response.token);
                    });
            }

            var Service = {
                getToken: function () {
                    var existingToken = $window.localStorage.getItem('session') || undefined;
                    if (existingToken) {
                        return _checkToken()
                            .then(function (response) {
                                return response;
                            }, function () {
                                $window.localStorage.setItem('session', '');
                                return _retrieveToken();
                            });
                    } else {
                        return _retrieveToken();
                    }
                },
                login: function (phone, password) {
                    return Http.post('/user/authentication/register', {phone: phone, password: password});
                },
                register: function (phone, password) {
                    return Http.post('/user/authentication/register', {phone: phone, password: password});
                },
                getUser: function () {
                    return Http.post('/user/info/get');
                }
            };
            return Service;
        }
    ]);
});