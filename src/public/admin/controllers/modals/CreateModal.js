define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'CreateModal',
        [
            '$scope', '$modalInstance', 'item',
            function ($scope, $modalInstance, item) {
                $scope.item = item;

                $scope.submit = function () {
                    $modalInstance.close($scope.item.fields);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        ]
    );
});