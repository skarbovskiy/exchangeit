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
                        return Http.post('/user/authentication/check_token')
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
                getCurrentUser: function (checkType) {
                    var promise = Http.post('/user/info/getCurrent');
                    if (!checkType) {
                        return promise;
                    }
                    return promise.then(function (response) {
                        if (response.type === checkType) {
                            return response;
                        } else {
                            $window.localStorage.setItem('session', '');
                            return $q.reject(new Error('user don\'t have permission to access'));
                        }
                    }, function (reason) {
                        return $q.reject(reason);
                    });
                },
                getList: function () {
                    return Http.post('/user/info/getList');
                },
                update: function (id, phone, status, type, first_name, last_name, email, comment) {
                    return Http.post('/user/info/update', {
                        id: id,
                        phone: phone,
                        status: status,
                        type: type,
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        comment: comment
                    });
                }
            };
            return Service;
        }
    ]);
});