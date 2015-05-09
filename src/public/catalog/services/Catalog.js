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
                getCategoryPath: function (id) {
                    return Http.post('/catalog/categories/getPath', {id: id});
                },
                getPrices: function (id) {
                    return Http.post('/catalog/categories/getCategoryPrices', {id: id});
                },
                createCategory: function (name, active, parentId, canHaveProducts, minPrice, maxPrice) {
                    return Http.post('/catalog/categories/create', {
                        name: name,
                        active: active,
                        parent_id: parentId,
                        can_have_products: canHaveProducts,
                        min_price: minPrice,
                        max_price: maxPrice
                    });
                },
                updateCategory: function (id, name, active, parentId, canHaveProducts, minPrice, maxPrice) {
                    return Http.post('/catalog/categories/update', {
                        id: id,
                        name: name,
                        active: active,
                        parent_id: parentId,
                        can_have_products: canHaveProducts,
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