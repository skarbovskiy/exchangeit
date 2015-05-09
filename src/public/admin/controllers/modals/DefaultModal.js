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
                    $modalInstance.close(transferFields($scope.item));
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.findDependency = function (name) {
                    var link = null;
                    $scope.item.fields instanceof Array && $scope.item.fields.forEach(function (field) {
                        if (field.name === name) {
                            link = field;
                        }
                    });
                    return link;
                };

                function transferFields (item) { //make object from array
                    var fields = {};
                    if (item.fields) {
                        item.fields.forEach(function (field) {
                            fields[field.name] = field;
                        });
                        item.fields = fields;
                    }
                    return item;
                }
            }
        ]
    );
});