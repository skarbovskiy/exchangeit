define([
    '../core.module'
], function (core) {
    'use strict';

    core.controller('Core', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        var Core = {};
        $rootScope.$on('$routeChangeStart', function () {
            Core.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            Core.loading = false;
            $timeout(function () {
                $('html, body').animate({scrollTop: 0}, 200);
            });
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            console.log(rejection);
        });

        $rootScope.$on('error', function (event, error) {
            alert('Fatal:' + error.message);
        });

        $rootScope.Core = Core;
    }]);
});