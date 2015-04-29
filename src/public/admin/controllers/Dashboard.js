define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Dashboard', ['$scope', 'user', function ($scope, user) {
        $scope.Base.user = user;

        console.log('Dashboard admin loaded', user);
    }]);
});