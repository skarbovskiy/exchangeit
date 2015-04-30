define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'DefaultModal',
        [
            '$scope', '$modalInstance', 'item',
            function ($scope, $modalInstance, item) {
                $scope.item = item;

                $scope.submit = function () {
                    $modalInstance.close($scope.item);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        ]
    );
});