define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'VocabularyContent',
        ['$scope', '$modal', 'toastr', 'Vocabularies', 'content', function ($scope, $modal, toastr, Vocabularies, content) {
            $scope.Base.setActiveMenu('vocabularies');

            var fieldsList = {
                id: {
                    type: 'hidden'
                },
                vocabularyId: {
                    type: 'hidden'
                },
                value: {
                    title: 'Значение',
                    type: 'text',
                    required: true
                }
            };

            function updateList (promise) {
                promise.then(function () {
                    return Vocabularies.content.getList(Controller.vocabulary.id);
                })
                    .then(function (response) {
                        $scope.VocabularyContent.list = response.VocabularyContents;
                        $scope.Core.loading = false;
                    }, function (reason) {
                        $scope.Core.loading = false;
                        toastr.error(reason.message.error, 'Произошла ошибка');
                    });
            }

            var Controller = {
                vocabulary: content,
                list: content.VocabularyContents,

                create: function () {
                    var modalInstance = $modal.open({
                        templateUrl: '/admin/views/modals/create.html',
                        controller: 'DefaultModal',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return {
                                    title: 'Создание значения',
                                    fields: _.cloneDeep(fieldsList)
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Vocabularies.content.create(
                                Controller.vocabulary.id,
                                item.fields.value.value
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
                                    title: 'Редактирование значения',
                                    fields: _.cloneDeep(fieldsList),
                                    values: item
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            Vocabularies.content.update(
                                item.fields.vocabularyId.value,
                                item.fields.id.value,
                                item.fields.value.value
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
                            Vocabularies.content.remove(
                                Controller.vocabulary.id,
                                item.id
                            )
                        );
                    });
                }
            };

            $scope.VocabularyContent = Controller;
        }]
    );
});