define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Login', ['$scope', '$mdDialog', '$timeout', 'User', function ($scope, $mdDialog, $timeout, User) {
        $scope.Login = {
            loading: false,
            phone: null,
            password: null,
            submit: function () {
                if (!$scope.Login.phone || !$scope.Login.password) {
                    return;
                }
                $scope.Login.loading = true;
                User.login('+38' + $scope.Login.phone, $scope.Login.password)
                    .then(function (response) {
                        $scope.Login.loading = false;
                        $mdDialog.hide(response);
                    })
                    .catch(function (e) {
                        $mdDialog.cancel(e);
                    });

            }
        };
        $timeout(function () {
            angular.element('#phone-input').focus();
        });
    }]);
});