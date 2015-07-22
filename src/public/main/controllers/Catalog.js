define([
    'main.module'
], function (main) {
    'use strict';

    main.controller(
        'Catalog',
        [
            '$scope', '$route', '$location', '$timeout', '$mdSidenav', '$mdToast', 'Categories', 'categories',
            function ($scope, $route, $location, $timeout, $mdSidenav, $mdToast, Categories, categories) {
                $scope.Catalog = {
                    categories: buildCategoriesTree(categories),
                    selectedCategories: {},
                    topFilters: [
                        {
                            name: 'для мальчиков',
                            selected: false,
                            type: 'attribute',
                            attributeName: 'Пол',
                            value: '1'
                        },
                        {
                            name: 'для девочек',
                            selected: false,
                            type: 'attribute',
                            attributeName: 'Пол',
                            value: '2'
                        },
                        {
                            name: 'одежда',
                            selected: false,
                            type: 'category',
                            value: '1'
                        },
                        {
                            name: 'обувь',
                            selected: false,
                            type: 'category',
                            value: '2'
                        },
                        {
                            name: 'игрушки',
                            selected: false,
                            type: 'category',
                            value: '3'
                        }
                    ],
                    openSideNav: function () {
                        $mdSidenav('left').open();
                    },
                    closeSideNav: function () {
                        $mdSidenav('left').close();
                    },
                    toggleSubCategories: function (categories) {
                        categories.forEach(function (category) {
                            $scope.Catalog.selectedCategories[category.id] =
                                !$scope.Catalog.selectedCategories[category.id];
                        })
                    },
                    updateCategories: function () {
                        $timeout(function () {
                            var filterCategories = [];
                            var filterAttributes = {};
                            $scope.Catalog.topFilters.forEach(function (filter) {
                                if (filter.type === 'category' && filter.selected) {
                                    filterCategories.push(filter.value);
                                }
                                if (filter.type === 'attribute' && filter.selected) {
                                    if (!filterAttributes[filter.attributeName]) {
                                        filterAttributes[filter.attributeName] = [];
                                    }
                                    filterAttributes[filter.attributeName].push(filter.value);
                                }
                            });
                            $location.search(
                                'topFilters',
                                JSON.stringify({category: filterCategories, attribute: filterAttributes})
                            );
                            $location.search(
                                'sideFilters',
                                JSON.stringify($scope.Catalog.selectedCategories)
                            );
                            $scope.Base.setLoader();
                            Categories.getList(filterCategories, filterAttributes).then(function (response) {
                                $scope.Catalog.categories = buildCategoriesTree(response);
                                $scope.Base.removeLoader();
                            }).catch(function (e) {
                                $scope.Base.removeLoader();
                                $route.reload();
                                var toast = $mdToast.simple()
                                    .content('Ошибка при получении списка категорий');
                                $mdToast.show(toast);
                            });
                        });
                    }
                };
                $scope.hasKeys = function (object) {
                    return _.keys(object).length > 0;
                };

                var search = $location.search();
                if (search.topFilters) {
                    try {
                        var routeFilters = JSON.parse(search.topFilters);
                        $scope.Catalog.topFilters.forEach(function (filter) {
                            if (
                                routeFilters.category && filter.type === 'category' &&
                                routeFilters.category.indexOf(filter.value) >= 0
                            ) {
                                filter.selected = true;
                            }

                            if (
                                routeFilters.attribute && filter.type === 'attribute' &&
                                routeFilters.attribute[filter.attributeName] &&
                                routeFilters.attribute[filter.attributeName].indexOf(filter.value) >= 0
                            ) {
                                filter.selected = true;
                            }
                        })
                    } catch (e) {}
                }
                if (search.sideFilters) {
                    try {
                        $scope.Catalog.selectedCategories = JSON.parse(search.sideFilters);
                    } catch (e) {}
                }
                $scope.htmlReady();
            }
        ]
    );


    function buildCategoriesTree (data, parentId) {
        parentId = parentId || null;
        var response = [];
        data.forEach(function (category) {
            if (category.parentId === parentId) {
                var object = category;
                object.children = buildCategoriesTree(data, category.id);
                if (object.children.length === 0) {
                    delete object.children;
                }
                response.push(object);
            }
        });
        return response;
    }
});