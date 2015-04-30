define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Dashboard', ['$scope', 'toastr', 'user', function ($scope, toastr, user) {
        $scope.Base.setActiveMenu('dashboard');
    }]);
});