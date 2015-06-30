define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Catalog', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        var Catalog = {};
        $scope.openSideNav = function () {
            $mdSidenav('left').open();
        };
        $scope.closeSideNav = function () {
            $mdSidenav('left').close();
        };
        $scope.Catalog = Catalog;
    }]);
});