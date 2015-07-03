define([
    'angular',
    '../main.module'
], function (angular, main) {
    'use strict';

    main.factory('Categories', [
        'Http',
        function (Http) {
            return {
                getList: function (filterCategories) {
                    filterCategories = filterCategories || '';
                    return Http.get('/categories?categories=' + filterCategories);
                }
            }
        }
    ]);
});