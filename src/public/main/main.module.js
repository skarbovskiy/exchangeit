'use strict';
define([
    'angular'
], function (angular) {
    var main = angular.module('main', ['ngRoute', 'ngMaterial', 'ngMessages', 'seo', 'core'])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('!');
        }])
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('deep-purple');
        }])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'Catalog',
                    templateUrl: '/main/views/catalog.html',
                    reloadOnSearch: false,
                    resolve: {
                        categories: [
                            '$location', 'Session', 'Categories',
                            function ($location, Session, Categories) {
                                var filters = $location.search();
                                var routeFilters = JSON.parse(filters.topFilters || '{}');
                                return Session.getToken().then(function () {
                                    return Categories.getList(routeFilters.category, routeFilters.attribute);
                                });
                            }
                        ]
                    }
                })
                .when('/profile', {
                    controller: 'Profile',
                    templateUrl: '/main/views/user/profile.html',
                    reloadOnSearch: false,
                    resolve: {
                        items: [
                            'Session', 'Profile',
                            function (Session, Profile) {
                                return Session.getToken().then(function () {
                                    return Profile.getItems();
                                });
                            }
                        ]
                    }
                })
        }]);

    return main;
});

/*teal
 brown
 purple
 deep-purple
 indigo
*/
