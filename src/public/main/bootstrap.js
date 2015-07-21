requirejs([
    'angular',
    'jquery',
    'angularRoute',
    'angularAnimate',
    'angularAria',
    'angularMaterial',
    'angularMessages',
    'angularSEO',
    'lodash',
    'main.module',
    'deps'
], function (angular) {
    'use strict';

    $(function () {
        angular.bootstrap(document, ['main']);
    });
});