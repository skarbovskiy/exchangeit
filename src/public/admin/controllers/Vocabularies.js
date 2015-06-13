define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'Vocabularies',
        ['$scope', '$modal', 'toastr', 'Vocabularies', 'list', function ($scope, $modal, toastr, Vocabularies, list) {
            $scope.Base.setActiveMenu('vocabularies');

            var fieldsList = {
                id: {
                    type: 'hidden'
                },
                name: {
                    title: 'Название',
                    type: 'text',
                    placeholder: 'Размеры обуви',
                    required: true
                }
            };

            function updateList (promise) {
                promise.then(function () {
                    return Vocabularies.getList();
                })
                    .then(function (response) {
                        $scope.Vocabularies.list = response;
                        $scope.Core.loading = false;
                    }, function (reason) {
                        $scope.Core.loading = false;
                        toastr.error(reason.message.error, 'Произошла ошибка');
                    });
            }

            var Controller = {
                list: list,

                create: function () {
                    var modalInstance = $modal.open({
                        templateUrl: '/admin/views/modals/create.html',
                        controller: 'DefaultModal',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return {
                                    title: 'Создание словаря',
                                    fields: _.cloneDeep(fieldsList)
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Vocabularies.create(
                                item.fields.name.value
                            )
                        );
                    });
                },

                edit: function (item) {
                    var modalInstance = $modal.open({
                        templateUrl: '/admin/views/modals/create.html',
                        controller: 'DefaultModal',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return {
                                    title: 'Редактирование словаря',
                                    fields: _.cloneDeep(fieldsList),
                                    values: item
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Vocabularies.update(
                                item.fields.id.value,
                                item.fields.name.value
                            )
                        );
                    });
                },

                remove: function (item) {
                    var modalInstance = $modal.open({
                        templateUrl: '/admin/views/modals/delete.html',
                        controller: 'DefaultModal',
                        size: '',
                        resolve: {
                            item: function () {
                                return item;
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Vocabularies.remove(
                                item.id
                            )
                        );
                    });
                }
            }

            $scope.Vocabularies = Controller;
        }]
    );
});