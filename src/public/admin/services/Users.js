define([
    'angular',
    '../admin.module'
], function (angular, admin) {
    'use strict';

    admin.factory('Users', [
        'Http',
        function (Http) {
            var Service = {
                getList: function () {
                    return Http.get('/admin/users');
                },
                update: function (id, phone, status, type, firstName, lastName, email, comment) {
                    return Http.put('/admin/users/' + id, {
                        phone: phone,
                        status: status,
                        type: type,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        comment: comment
                    });
                }
            };
            return Service;
        }
    ]);
});