define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Base', ['$rootScope', '$timeout', function ($rootScope) {
        var Base = {};
        $rootScope.$on('$routeChangeStart', function () {
            Base.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            Base.loading = false;
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            console.log(rejection);
        });

        $rootScope.Base = Base;
    }]);
});