define([
    'angular',
    '../main.module'
], function (angular, main) {
    'use strict';

    main.factory('Profile', [
        'Http',
        function (Http) {
            return {
                getItems: function () {
                    return Http.get('/profile/items');
                }
            }
        }
    ]);
});