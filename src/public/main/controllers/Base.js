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
            '$mdDialog',
            '$mdToast',
            '$route',
            'User',
            function ($rootScope, $timeout, $scope, $interval, $mdDialog, $mdToast, $route,  User) {
                $scope.Base = {
                    currentUser: null,
                    loading: false,
                    loadingUser: false,
                    loadingProcess: 0,
                    loadingSubProcess: 0,
                    loadingHandler: null,
                    setLoader: function () {
                        if ($scope.Base.loading) {
                            return;
                        }
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
                            .then(function () {
                                $scope.Base.loadingUser = true;
                                return User.getCurrentUser();
                            })
                            .then(function (response) {
                                $scope.Base.currentUser = response;
                                $scope.Base.loadingUser = false;
                                $route.reload();
                            })
                            .catch(function (e) {
                                $scope.Base.loadingUser = false;
                                if (!e) {
                                    return;
                                }
                                var toast = $mdToast.simple()
                                    .content('Пользователь не найден');
                                $mdToast.show(toast);
                            });
                    }
                };

                $rootScope.$on('$routeChangeStart', function () {
                    $scope.Base.setLoader();
                });

                $rootScope.$on('$routeChangeSuccess', function () {
                    $scope.Base.removeLoader();
                    $timeout(function () {
                        angular.element('html, body').animate({scrollTop: 0}, 200);
                    });
                });

                $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                    console.log(rejection);
                });

                $scope.Base.loadingUser = true;
                User.getCurrentUser().then(function (response) {
                    $scope.Base.currentUser = response;
                }).finally(function () {
                    $scope.Base.loadingUser = false;
                });
            }
        ]
    );
});