define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Catalog', ['$scope', '$mdSidenav', '$timeout', function ($scope, $mdSidenav, $timeout) {
        console.log('catalog loaded');
        var Catalog = {};
        $scope.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        }
        $scope.Catalog = Catalog;
    }]);
});