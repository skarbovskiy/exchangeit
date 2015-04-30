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

                var Categories = {
                    list: categories,
                    parent: parent,
                    create: function () {
                        var modalInstance = $modal.open({
                            templateUrl: '/admin/views/modals/create.html',
                            controller: 'CreateModal',
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
                            Catalog.createCategory(
                                item.name.value,
                                $scope.Categories.parent ? $scope.Categories.parent.id : null
                            )
                                .then(function () {
                                    return Catalog.getCategories($route.current.params.parent_id);
                                })
                                .then(function (response) {
                                    $scope.Categories.list = response;
                                    $scope.Core.loading = false;
                                }, function (reason) {
                                    $scope.Core.loading = false;
                                    toastr.error(reason.message.error, 'Произошла ошибка');
                                });
                        });
                    }
                };

                $scope.Categories = Categories;
            }
        ]
    );
});