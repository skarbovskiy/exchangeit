define([
    'angular',
    '../core.module'
], function (angular, core) {
    'use strict';


    var INTEGER_REGEXP = /^\-?\d+$/;
    core.directive('phone', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.phone = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    return /^[0-9]{10,13}$/.test(modelValue);
                };
            }
        };
    });
});