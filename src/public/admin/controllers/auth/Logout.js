define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Logout', ['$scope', '$location', 'User', function ($scope, $location, User) {
        User.logout().finally(function () {
            $scope.Base.authenticated = false;
            $scope.Base.user = null;
            $location.path('/login');
        });
    }]);
});