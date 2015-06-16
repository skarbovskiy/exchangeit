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
                },
                content: {
                    getList: function (vocabularyId) {
                        return Http.get('/admin/vocabularies/' + vocabularyId + '/content');
                    },
                    create: function (vocabularyId, value) {
                        return Http.post('/admin/vocabularies/' + vocabularyId + '/content', {value: value});
                    },
                    update: function (vocabularyId, id, value) {
                        return Http.put('/admin/vocabularies/' + vocabularyId + '/content/' + id, {value: value});
                    },
                    remove: function (vocabularyId, id) {
                        return Http.delete('/admin/vocabularies/' + vocabularyId + '/content/' + id);
                    }
                }
            };
            return Service;
        }
    ]);
});