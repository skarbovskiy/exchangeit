define([
    'angular',
    '../catalog.module'
], function (angular, catalog) {
    'use strict';

    catalog.factory('Catalog', [
        'Http',
        function (Http) {
            return {
                getCategories: function (parentId) {
                    return Http.post('/catalog/categories/getList', {parent_id: parentId});
                },
                getCategory: function (id) {
                    return Http.post('/catalog/categories/get', {id: id});
                },
                createCategory: function (name, parentId, minPrice, maxPrice) {
                    return Http.post('/catalog/categories/create', {
                        name: name,
                        parent_id: parentId,
                        min_price: minPrice,
                        max_price: maxPrice
                    });
                },
                removeCategory: function (id) {
                    return Http.post('/catalog/categories/remove', {id: id});
                }
            }
        }
    ]);
});