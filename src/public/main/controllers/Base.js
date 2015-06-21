define([
    'main.module'
], function (main) {
    'use strict';

    main.controller('Base', ['$rootScope', '$timeout', '$scope', '$interval', function ($rootScope, $timeout, $scope, $interval) {
        console.log('base loaded');
        var Controller  = {
            loading: false,
            loadingProcess: 0,
            loadingSubProcess: 0,
            setLoader: function () {
                $scope.Base.loadingProcess = 0;
                $scope.Base.loadingSubProcess = 0;
                $scope.Base.loading = true;
                var intervalHandler = $interval(function () {
                    $scope.Base.loadingProcess += 1;
                    $scope.Base.loadingSubProcess += 2;
                }, 100, 0, true);
                $timeout(function () {
                    $scope.Base.loading = 0;
                    $interval.cancel(intervalHandler);
                }, 3000);
            }
        };

        $scope.Base = Controller;

       // $scope.Base.setLoader();
    }]);
});