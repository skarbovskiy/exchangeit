'use strict';
define([
    'angular'
], function (angular) {
    var admin = angular.module('admin', ['ngRoute', 'ui.bootstrap', 'toaster', 'core', 'user'])
        .config(['$routeProvider', function ($routeProvider) {

            function getUser ($rootScope, User) {
                return User.getUser('admin').then(function (response) {
                    $rootScope.Base.user = response;
                    return response;
                })
            }

            $routeProvider
                .when('/', {
                    controller: 'Dashboard',
                    templateUrl: '/admin/views/controllers/dashboard/index.html',
                    resolve: {
                        user: [
                            '$rootScope',
                            'User',
                            function ($rootScope, User) {
                                return getUser($rootScope, User);
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
                .when('/logout', {
                    controller: 'Logout',
                    templateUrl: '/admin/views/controllers/login/index.html'
                })
        }]);

    return admin;
});