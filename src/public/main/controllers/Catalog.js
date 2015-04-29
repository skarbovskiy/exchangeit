define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Catalog', ['$scope', function ($scope) {
        console.log('catalog loaded');
        var Catalog = {};

        $scope.Catalog = Catalog;
    }]);
});