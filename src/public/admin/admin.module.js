'use strict';
define([
    'angular'
], function (angular) {
    var admin = angular.module('admin', ['ngRoute', 'ui.bootstrap', 'core', 'user'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'Dashboard',
                    templateUrl: '/admin/views/controllers/dashboard/index.html',
                    resolve: {
                        user: [
                            'User',
                            function (User) {
                                return User.getUser();
                            }
                        ]
                    }
                })
                .when('/login', {
                    controller: 'Login',
                    templateUrl: '/admin/views/controllers/login/index.html',
                    resolve: {
                        token: [
                            'User',
                            function (User) {
                                return User.getToken();
                            }
                        ]
                    }
                })
        }]);

    return admin;
});