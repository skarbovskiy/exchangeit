'use strict';
define([
    'angular'
], function (angular) {
    var main = angular.module('main', ['ngRoute', 'ngMaterial', 'ngMessages', 'seo', 'core'])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
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
                                    return Categories.getList(routeFilters.category, routeFilters.attribute || {});
                                });
                            }
                        ],
                        items: [
                            '$location', 'Session', 'Categories',
                            function ($location, Session, Categories) {
                                var filters = $location.search();
                                var routeFilters = JSON.parse(filters.topFilters || '{}');
                                return Session.getToken().then(function () {
                                    return Categories.getItems(routeFilters.category, routeFilters.attribute || {});
                                });
                            }
                        ]
                    }
                })
                .when('/profile', {
                    controller: 'Profile',
                    templateUrl: '/main/views/user/profile.html',
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
                .when('/profile/items/:id', {
                    controller: 'ProfileItem',
                    templateUrl: '/main/views/user/item.html',
                    resolve: {
                        categories: [
                            'Session', 'Categories',
                            function (Session, Categories) {
                                return Session.getToken().then(function () {
                                    return Categories.getList();
                                });
                            }
                        ],
                        item: [
                            '$route', 'Session', 'Profile',
                            function ($route, Session, Profile) {
                                var id = $route.current.params.id;
                                if (!id || id === 'null') {
                                    return {};
                                }
                                return Session.getToken().then(function () {
                                    return Profile.getItem(id);
                                });
                            }
                        ]
                    }
                })
                .when('/404', {
                    controller: 'Error',
                    templateUrl: '/main/views/errors/404.html',
                    resolve: {}
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }]);

    return main;
});

/*teal
 brown
 purple
 deep-purple
 indigo
*/
