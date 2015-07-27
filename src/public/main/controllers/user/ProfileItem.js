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
            clearCategory: function () {
                $scope.ProfileItem.itemCategory = null;
            },
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
            },
            submitItem: function () {
                $scope.Base.setLoader();
                $scope.ProfileItem.item.categoryId = $scope.ProfileItem.itemCategory.id;

                var attributes = _.cloneDeep($scope.ProfileItem.itemCategory.CategoryAttributes);
                attributes.forEach(function (attribute) {
                    attribute.Vocabulary = undefined;
                });
                Profile.addItem($scope.ProfileItem.item, attributes)
                    .then(function () {
                        $scope.Base.removeLoader();
                        $location.path('/profile');
                    })
                    .catch(function () {
                        $scope.Base.removeLoader();
                        var toast = $mdToast.simple()
                            .content('Ошибка при сохранении лота');
                        $mdToast.show(toast);
                    });
            }
        };
    }]);
});