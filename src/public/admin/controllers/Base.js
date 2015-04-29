define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Base', ['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (
                (rejection.status && (rejection.status === 401 || rejection.status === 403)) ||
                rejection.message === 'user don\'t have permission to access'
            ) {
                $rootScope.Base.authenticated = false;
                $location.path('/login');
            }
        });

        var Base = {
            authenticated: true,
            user: null
        };

        $rootScope.Base = Base;
    }]);
});