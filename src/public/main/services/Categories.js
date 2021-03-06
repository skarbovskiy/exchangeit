define([
    'angular',
    '../main.module'
], function (angular, main) {
    'use strict';

    main.factory('Categories', [
        'Http',
        function (Http) {
            return {
                getList: function (filterCategories, filterAttributes) {
                    filterCategories = filterCategories || '';
                    return Http.get(
                        '/categories?categories=' + filterCategories + '&attributes=' + JSON.stringify(filterAttributes)
                    );
                },
                getOne: function (id) {
                    return Http.get('/categories/' + id);
                },
                getItems: function (filterCategories, filterAttributes) {
                    filterCategories = filterCategories || '';
                    return Http.get(
                        '/categories/items?categories=' + filterCategories +
                        '&attributes=' + JSON.stringify(filterAttributes)
                    );
                }
            }
        }
    ]);
});