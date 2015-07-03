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
            '$interval'
            , '$mdDialog',
            function ($rootScope, $timeout, $scope, $interval, $mdDialog) {
                var Controller  = {
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
                $scope.Base = Controller;
            }
        ]
    );
});