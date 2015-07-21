define([
    'main.module'
], function (main) {
    'use strict';

    main.controller(
        'Base',
        [
            '$rootScope',
            '$timeout',
            '$scope',
            '$interval',
            '$mdDialog','$mdToast',
            'User',
            function ($rootScope, $timeout, $scope, $interval, $mdDialog,$mdToast,  User) {
                var toast = $mdToast.simple()
                    .content('Пользователь не найден')
                    .hideDelay(0)
                    .position('bottom left top right');
                $mdToast.show(toast);
                $scope.Base = {
                    currentUser: null,
                    loading: false,
                    loadingProcess: 0,
                    loadingSubProcess: 0,
                    loadingHandler: null,
                    setLoader: function () {
                        $scope.Base.loadingProcess = 0;
                        $scope.Base.loadingSubProcess = 0;
                        $scope.Base.loading = true;
                        $scope.Base.loadingHandler = $interval(function () {
                            if ($scope.Base.loadingProcess >= 100) {
                                $scope.Base.loadingProcess = 0;
                                $scope.Base.loadingSubProcess = 0;
                            }
                            $scope.Base.loadingProcess += 2;
                            $scope.Base.loadingSubProcess += 4;
                        }, 50, 0, true);
                    },
                    removeLoader: function () {
                        $scope.Base.loading = false;
                        $interval.cancel($scope.Base.loadingHandler);
                    },
                    login: function (event) {
                        $mdDialog.show({
                            clickOutsideToClose: true,
                            focusOnOpen: false,
                            controller: 'Login',
                            templateUrl: '/main/views/user/loginModal.html',
                            parent: angular.element(document.body),
                            targetEvent: event
                        })
                            .then(function (answer) {
                                $scope.alert = 'You said the information was "' + answer + '".';
                            }, function () {
                                $scope.alert = 'You cancelled the dialog.';
                            });
                    }
                };

                $scope.Base.setLoader();
                User.getCurrentUser().then(function (response) {
                    $scope.Base.currentUser = response;
                }).finally(function () {
                    $scope.Base.removeLoader();
                });
            }
        ]
    );
});