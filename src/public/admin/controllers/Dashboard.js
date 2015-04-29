define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Dashboard', ['user', function (user) {
        console.log('Dashboard admin loaded', user);
    }]);
});