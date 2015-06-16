define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'CategoryAttributes',
        ['$scope', '$modal', 'toastr', 'Categories', 'content', 'vocabularies', 'path', function ($scope, $modal, toastr, Categories, content, vocabularies, path) {
            $scope.Base.setActiveMenu('categories');

            var fieldsList = {
                id: {
                    type: 'hidden'
                },
                categoryId: {
                    type: 'hidden'
                },
                name: {
                    title: 'Название',
                    type: 'text',
                    required: true
                },
                type: {
                    title: 'Тип',
                    type: 'select',
                    options: ['text', 'date', 'checkbox', 'select'],
                    required: true
                },
                vocabularyId: {
                    title: 'Словарь',
                    type: 'select',
                    options: vocabularies,
                    depends: {'type': 'select'}
                }
            };

            function updateList (promise) {
                promise.then(function () {
                    return Categories.attributes.getList(Controller.category.id);
                })
                    .then(function (response) {
                        $scope.CategoryAttributes.list = response.CategoryAttributes;
                        $scope.Core.loading = false;
                    }, function (reason) {
                        $scope.Core.loading = false;
                        toastr.error(reason.message.error || reason.message, 'Произошла ошибка');
                    });
            }

            var Controller = {
                path: path,
                category: content,
                vocabularies: vocabularies,
                list: content.CategoryAttributes,

                create: function () {
                    var modalInstance = $modal.open({
                        templateUrl: '/admin/views/modals/create.html',
                        controller: 'DefaultModal',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return {
                                    title: 'Создание атрибута',
                                    fields: _.cloneDeep(fieldsList)
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Categories.attributes.create(
                                Controller.category.id,
                                item.fields.name.value,
                                item.fields.type.value,
                                item.fields.vocabularyId.value
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
                                    title: 'Редактирование атрибута',
                                    fields: _.cloneDeep(fieldsList),
                                    values: item
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Categories.attributes.update(
                                item.fields.categoryId.value,
                                item.fields.id.value,
                                item.fields.name.value,
                                item.fields.type.value,
                                item.fields.vocabularyId.value
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
                            Categories.attributes.remove(
                                Controller.category.id,
                                item.id
                            )
                        );
                    });
                }
            };

            $scope.CategoryAttributes = Controller;
        }]
    );
});