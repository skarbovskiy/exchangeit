requirejs([
    'angular',
    'jquery',
    'angularAnimate',
    'angularToaster',
    'angularRoute',
    'angularUIBootstrap',
    'lodash',
    'admin.module',
    'deps'
], function (angular) {
    'use strict';

    $(function () {
        angular.bootstrap(document, ['admin']);
    });
});