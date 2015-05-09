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
            'path',
            function ($scope, $route, $modal, toastr, Catalog, categories, path) {
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
                                        fields: [
                                            {
                                                name: 'name',
                                                title: 'Название',
                                                type: 'text',
                                                placeholder: 'Тапки',
                                                required: true
                                            },
                                            {
                                                name: 'active',
                                                title: 'Активна',
                                                type: 'checkbox'
                                            },
                                            {
                                                name: 'can_have_products',
                                                title: 'Может содержать товары',
                                                type: 'checkbox'
                                            },
                                            {
                                                name: 'min_price',
                                                title: 'Минимальная цена товара',
                                                type: 'number',
                                                depends: 'can_have_products'
                                            },
                                            {
                                                name: 'max_price',
                                                title: 'Максимальная цена товара',
                                                type: 'number',
                                                depends: 'can_have_products'
                                            }
                                        ]
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
                                    item.fields.active.value,
                                    $scope.Categories.path ?
                                        $scope.Categories.path[$scope.Categories.path.length - 1].id : null,
                                    item.fields.can_have_products.value,
                                    item.fields.min_price.value,
                                    item.fields.max_price.value
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

                Categories.list.forEach(function (category) {
                    Catalog.getPrices(category.id)
                        .then(function (prices) {
                            $scope.Categories.prices[category.id] = prices;
                        });
                });

                $scope.Categories = Categories;
            }
        ]
    );
});