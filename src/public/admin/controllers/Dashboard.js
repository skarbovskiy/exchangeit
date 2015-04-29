define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Dashboard', ['$scope', 'toaster', 'user', function ($scope, toaster, user) {
        console.log(toaster);
        toaster.pop('success', "title", "text");
        console.log('Dashboard admin loaded', user);
    }]);
});