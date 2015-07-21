define([
    'angular'
], function (angular) {
    var main = angular.module('main', ['ngRoute', 'ngMaterial', 'ngMessages', 'core'])
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
                                    return Categories.getList(routeFilters.category, routeFilters.attribute);
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
