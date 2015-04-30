define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Dashboard', ['$scope', 'toastr', 'user', function ($scope, toastr, user) {
        var toast = toastr.success('Hello world!', 'Toastr fun!', {timeOut: 0});
        setTimeout(function () {
            toastr.clear(toast);
        }, 5000);
    }]);
});