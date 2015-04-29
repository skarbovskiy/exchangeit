define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Base', ['$rootScope', '$location', '$scope', function ($rootScope, $location, $scope) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection.status && (rejection.status === 401 || rejection.status === 403)) {
                $location.path('/login');
            }
        });

        var Base = {
            authenticated: false
        };

        $scope.Base = Base;
    }]);
});