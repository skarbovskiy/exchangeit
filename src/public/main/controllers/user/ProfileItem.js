define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('ProfileItem', ['$scope', '$mdToast', '$location', 'Categories', 'Profile', 'categories', 'item', function ($scope, $mdToast, $location, Categories, Profile, categories, item) {
        $scope.ProfileItem = {
            categories: categories,
            item: item,
            autocompleteCategory: null,
            itemCategory: null,
            loadingAttributes: false,
            changeCategory: function () {
                $scope.ProfileItem.loadingAttributes = true;
                Categories.getOne($scope.ProfileItem.autocompleteCategory.id)
                    .then(function (category) {
                        $scope.ProfileItem.itemCategory = category;
                        $scope.ProfileItem.loadingAttributes = false;
                    })
                    .catch(function () {
                        var toast = $mdToast.simple()
                            .content('Ошибка при получении атрибутов категории');
                        $mdToast.show(toast);
                        $scope.ProfileItem.loadingAttributes = false;
                    });
            }
        };
    }]);
});