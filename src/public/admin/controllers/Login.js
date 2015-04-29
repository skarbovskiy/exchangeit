define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Login', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
        var Service = {};
        //$timeout(function () {
        //    $scope.Base.authenticated = true;
        //    //$location.path('/');
        //}, 5000);
        $scope.Login = Service;
    }]);
});