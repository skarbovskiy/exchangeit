define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'Categories',
        [
            '$scope',
            '$route',
            '$modal',
            'toastr',
            'Catalog',
            'categories',
            'parent',
            function ($scope, $route, $modal, toastr, Catalog, categories, parent) {
                $scope.Base.setActiveMenu('categories');

                function updateList (promise) {
                    promise.then(function () {
                        return Catalog.getCategories($route.current.params.parent_id);
                    })
                        .then(function (response) {
                            $scope.Categories.list = response;
                            $scope.Core.loading = false;
                        }, function (reason) {
                            $scope.Core.loading = false;
                            toastr.error(reason.message.error, 'Произошла ошибка');
                        });
                }
                var Categories = {
                    list: categories,
                    parent: parent,
                    create: function () {
                        var modalInstance = $modal.open({
                            templateUrl: '/admin/views/modals/create.html',
                            controller: 'DefaultModal',
                            size: '',
                            resolve: {
                                item: function () {
                                    var obj = {
                                        title: 'Создание категории',
                                        fields: {
                                            name: {
                                                title: 'Название',
                                                placeholder: 'Тапки',
                                                required: true
                                            }
                                        }
                                    };
                                    if ($scope.Categories.parent) {
                                        obj.title = 'Создание подкатегории (' + $scope.Categories.parent.name + ')';
                                    }
                                    return obj;
                                }
                            }
                        });

                        modalInstance.result.then(function (item) {
                            $scope.Core.loading = true;
                            updateList(
                                Catalog.createCategory(
                                    item.fields.name.value,
                                    $scope.Categories.parent ? $scope.Categories.parent.id : null
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
                                Catalog.removeCategory(
                                    item.id
                                )
                            );
                        });
                    }
                };

                $scope.Categories = Categories;
            }
        ]
    );
});