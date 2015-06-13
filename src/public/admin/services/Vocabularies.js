define([
    'angular',
    '../admin.module'
], function (angular, admin) {
    'use strict';

    admin.factory('Vocabularies', [
        'Http',
        function (Http) {
            var Service = {
                getList: function () {
                    return Http.get('/admin/vocabularies');
                },
                create: function (name) {
                    return Http.post('/admin/vocabularies/', {
                        name: name
                    });
                },
                update: function (id, name) {
                    return Http.put('/admin/vocabularies/' + id, {
                        name: name
                    });
                },
                remove: function (id) {
                    return Http.delete('/admin/vocabularies/' + id);
                }
            };
            return Service;
        }
    ]);
});