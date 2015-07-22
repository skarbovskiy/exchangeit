define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Profile', ['$scope', '$mdToast', '$location', 'User', 'Profile', 'items', function ($scope, $mdToast, $location, User, Profile, items) {
        $scope.Profile = {
            loadingItems: false,
            items: items,
            firstLoad: true,
            logout: function () {
                $scope.Base.setLoader();
                User.logout().then(function () {
                    $scope.Base.currentUser = null;
                    $location.path('/');
                }).catch(function () {
                    var toast = $mdToast.simple()
                        .content('Ошибка при выходе из сессии');
                    $mdToast.show(toast);
                });
            },
            loadItems: function () {
                if ($scope.Profile.firstLoad) {
                    $scope.Profile.firstLoad = false;
                    return;
                }
                $scope.Profile.loadingItems = true;
                Profile.getItems().then(function (items) {
                    $scope.Profile.items = items;
                    $scope.Profile.loadingItems = false;
                })
            }
        };
    }]);
});