define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Base', ['$rootScope', '$location', 'toastr', function ($rootScope, $location, toastr) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (
                (rejection.status && (rejection.status === 401 || rejection.status === 403)) ||
                rejection.message === 'user don\'t have permission to access'
            ) {
                $rootScope.Base.authenticated = false;
                $location.path('/login');
            }
            toastr.error(rejection.message, 'Ошибка');
        });

        var Base = {
            authenticated: true,
            user: null
        };

        $rootScope.Base = Base;
    }]);
});