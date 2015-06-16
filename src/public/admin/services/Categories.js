define([
    'angular',
    '../admin.module'
], function (angular, admin) {
    'use strict';

    admin.factory('Categories', [
        'Http',
        function (Http) {
            return {
                getList: function (parentId) {
                    return Http.get('/admin/categories/' + parentId);
                },
                getPath: function (id) {
                    return Http.get('/admin/categories/' + id + '/path');
                },
                getPrices: function (id) {
                    return Http.get('/admin/categories/' + id + '/prices');
                },
                update: function (id, name, active, parentId, canHaveProducts, minPrice, maxPrice) {
                    return Http.put('/admin/categories/' + id, {
                        name: name,
                        active: active,
                        //parent_id: parentId,
                        canHaveProducts: canHaveProducts,
                        minPrice: minPrice,
                        maxPrice: maxPrice
                    });
                },
                create: function (name, active, parentId, canHaveProducts, minPrice, maxPrice) {
                    return Http.post('/admin/categories/', {
                        name: name,
                        active: active,
                        parentId: parentId,
                        canHaveProducts: canHaveProducts,
                        minPrice: minPrice,
                        maxPrice: maxPrice
                    });
                },
                remove: function (id) {
                    return Http.delete('/admin/categories/' + id);
                },
                attributes: {
                    getList: function (categoryId) {
                        return Http.get('/admin/categories/' + categoryId + '/attributes/');
                    },
                    create: function (categoryId, name, type, vocabularyId) {
                        return Http.post('/admin/categories/' + categoryId + '/attributes/', {
                            name: name,
                            type: type,
                            vocabularyId: vocabularyId
                        });
                    },
                    update: function (categoryId, id, name, type, vocabularyId) {
                        return Http.put('/admin/categories/' + categoryId + '/attributes/' + id, {
                            name: name,
                            type: type,
                            vocabularyId: vocabularyId
                        });
                    },
                    remove: function (categoryId, id) {
                        return Http.delete('/admin/categories/' + categoryId + '/attributes/' + id);
                    }
                }
            }
        }
    ]);
});