define([
    '../core.module'
], function (core) {
    'use strict';

    core.controller('Core', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $('html, body').animate({scrollTop: 0}, 200);
            });
        });
    }]);
});