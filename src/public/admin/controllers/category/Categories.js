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
            'Categories',
            'categories',
            'path',
            function ($scope, $route, $modal, toastr, Categories, categories, path) {
                $scope.Base.setActiveMenu('categories');

                var categoryFieldsList = {
                    id: {
                        type: 'hidden'
                    },
                    name: {
                        title: 'Название',
                        type: 'text',
                        placeholder: 'Тапки',
                        required: true
                    },
                    active: {
                        title: 'Активна',
                        type: 'checkbox'
                    },
                    canHaveProducts: {
                        title: 'Может содержать товары',
                        type: 'checkbox'
                    },
                    minPrice: {
                        title: 'Минимальная цена товара',
                        type: 'number',
                        depends: {'canHaveProducts': true}
                    },
                    maxPrice: {
                        title: 'Максимальная цена товара',
                        type: 'number',
                        depends: {'canHaveProducts': true}
                    }
                };

                function updateList (promise) {
                    promise.then(function () {
                        return Categories.getList($route.current.params.parentId);
                    })
                        .then(function (response) {
                            $scope.Categories.list = response;
                            $scope.Core.loading = false;
                        }, function (reason) {
                            $scope.Core.loading = false;
                            toastr.error(reason.message.error || reason.message, 'Произошла ошибка');
                        });
                }
                var Controller = {
                    list: categories,
                    path: path,
                    prices: {},
                    create: function () {
                        var modalInstance = $modal.open({
                            templateUrl: '/admin/views/modals/create.html',
                            controller: 'DefaultModal',
                            size: 'lg',
                            resolve: {
                                item: function () {
                                    var obj = {
                                        title: 'Создание категории',
                                        fields: _.cloneDeep(categoryFieldsList)
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
                                Categories.create(
                                    item.fields.name.value,
                                    item.fields.active.value,
                                    $scope.Categories.path ?
                                        $scope.Categories.path[$scope.Categories.path.length - 1].id : null,
                                    item.fields.canHaveProducts.value,
                                    item.fields.minPrice.value,
                                    item.fields.maxPrice.value
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
                                        title: 'Редактирование категории',
                                        fields: _.cloneDeep(categoryFieldsList),
                                        values: item
                                    };
                                }
                            }
                        });

                        modalInstance.result.then(function (item) {
                            $scope.Core.loading = true;
                            updateList(
                                Categories.update(
                                    item.fields.id.value,
                                    item.fields.name.value,
                                    item.fields.active.value,
                                    $scope.Categories.path ?
                                        $scope.Categories.path[$scope.Categories.path.length - 1].id : null,
                                    item.fields.canHaveProducts.value,
                                    item.fields.minPrice.value,
                                    item.fields.maxPrice.value
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
                                Categories.remove(
                                    item.id
                                )
                            );
                        });
                    }
                };

                Controller.list.forEach(function (category) {
                    Categories.getPrices(category.id)
                        .then(function (prices) {
                            $scope.Categories.prices[category.id] = prices;
                        });
                });

                $scope.Categories = Controller;
            }
        ]
    );
});