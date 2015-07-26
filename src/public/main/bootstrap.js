requirejs([
    'angular',
    'jquery',
    'moment',
    'angularRoute',
    'angularAnimate',
    'angularAria',
    'angularMaterial',
    'angularMessages',
    'angularSEO',
    'lodash',
    'main.module',
    'deps'
], function (angular, jquery, moment) {
    'use strict';

    $(function () {
        window.moment = moment;
        angular.bootstrap(document, ['main']);
    });
});