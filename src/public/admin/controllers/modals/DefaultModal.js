define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'DefaultModal',
        [
            '$scope', '$modalInstance', 'item',
            function ($scope, $modalInstance, item) {
                $scope.item = transferFieldsToArray(processDefaultValues(item));

                $scope.submit = function () {
                    $modalInstance.close(transferFieldsToObject($scope.item));
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

                function processDefaultValues (item) {
                    if (!item.fields || !item.values) {
                        return item;
                    }
                    for (var key in item.values) {
                        if (item.fields[key]) {
                            item.fields[key].value = item.values[key];
                        }
                    }
                    return item;
                }

                function transferFieldsToArray (item) {
                    var fields = [];
                    if (item.fields) {
                        for (var key in item.fields) {
                            var field = item.fields[key];
                            field.name = key;
                            fields.push(field);
                        }
                        item.fields = fields;
                    }
                    return item;
                }

                function transferFieldsToObject (item) { //make object from array
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