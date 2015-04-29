define([
    'angular',
    '../user.module'
], function (angular, user) {
    'use strict';

    user.factory('User', [
        'Http',
        '$window',
        '$q',
        function (Http, $window, $q) {

            function _checkToken () {
                return Http.post('/user/authentication/check_token');
            };

            function _retrieveToken () {
                return Http.post('/user/authentication/get_token')
                    .then(function (response) {
                        $window.localStorage.setItem('session', response.token);
                        return response;
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
                    return Http.post('/user/authentication/login', {phone: phone, password: password});
                },
                logout: function () {
                    return Http.post('/user/authentication/logout');
                },
                register: function (phone, password) {
                    return Http.post('/user/authentication/register', {phone: phone, password: password});
                },
                getUser: function (checkType) {
                    var promise = Http.post('/user/info/get');
                    if (!checkType) {
                        return promise;
                    }
                    var defer = $q.defer();
                    promise.then(function (response) {
                        if (response.type === checkType) {
                            return defer.resolve(response);
                        } else {
                            $window.localStorage.setItem('session', '');
                            return defer.reject(new Error('user don\'t have permission to access'));
                        }
                    }, function (reason) {
                        defer.reject(reason);
                    });
                    return defer.promise;
                }
            };
            return Service;
        }
    ]);
});