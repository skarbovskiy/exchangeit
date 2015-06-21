define([
    'angular'
], function (angular) {
    var main = angular.module('main', ['ngRoute', 'ngMaterial', 'core'])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
        }])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('deep-purple')
                //.accentPalette('orange');
        }])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'Catalog',
                    templateUrl: '/main/views/catalog.html'
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
