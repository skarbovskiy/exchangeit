requirejs([
    'angular',
    'jquery',
    'angularRoute',
    'angularAnimate',
    'angularAria',
    'angularMaterial',
    'lodash',
    'main.module',
    'deps'
], function (angular) {
    'use strict';

    $(function () {
        angular.bootstrap(document, ['main']);
    });
});