define([
    'angular',
    '../core.module'
], function (angular, core) {
    'use strict';

    core.factory('User', [
        'Http',
        '$q',
        '$window',
        function (Http, $q, $window) {
            var Service = {
                login: function (phone, password) {
                    return Http.post('/core/user/login', {phone: phone, password: password});
                },
                logout: function () {
                    return Http.post('/core/user/logout');
                },
                getCurrentUser: function (checkType) {
                    var promise = Http.get('/core/user');
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
                }
            };
            return Service;
        }
    ]);
});