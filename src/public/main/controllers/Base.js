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
                    setLoader: function () {
                        $scope.Base.loadingProcess = 0;
                        $scope.Base.loadingSubProcess = 0;
                        $scope.Base.loading = true;
                        var intervalHandler = $interval(function () {
                            $scope.Base.loadingProcess += 2;
                            $scope.Base.loadingSubProcess += 4;
                        }, 50, 0, true);
                        $timeout(function () {
                            $scope.Base.loading = 0;
                            $interval.cancel(intervalHandler);
                        }, 3000);
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