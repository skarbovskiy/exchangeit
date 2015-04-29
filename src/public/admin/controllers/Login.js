define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller('Login', ['$scope', '$location', 'User', 'token', function ($scope, $location, User, token) {

        if (token && token.user && token.user.phone) {
            return $location.path('/');
        }

        $scope.Base.authenticated = false;

        var Service = {
            phone: null,
            password: null,
            alerts: [],
            closeAlert: function (index) {
                $scope.Login.alerts.splice(index, 1);
            },
            authenticate: function () {
                if (!$scope.Login.phone || !$scope.Login.password) {
                    return;
                }
                $scope.Core.loading = true;
                User.login('+' + this.phone, this.password)
                    .then(function () {
                        $scope.Login.alerts = [{type: 'success', msg: 'Авторизация прошла успешно!'}];
                        $scope.Base.authenticated = true;
                        $location.path('/');
                    }, function (reason) {
                        $scope.Core.loading = false;
                        $scope.Login.alerts = [{type: 'danger', msg: reason.message.error}];
                    });
            }
        };
        $scope.Login = Service;
    }]);
});