define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Base', ['$rootScope', '$timeout', function ($rootScope) {
        console.log('base loaded');
    }]);
});