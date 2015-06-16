'use strict';
define([
    'angular'
], function (angular) {
    var admin = angular.module('admin', ['ngRoute', 'ui.bootstrap', 'toastr', 'core'])
        .config(['$routeProvider', function ($routeProvider) {

            function getCurrentUser ($rootScope, User) {
                return User.getCurrentUser('admin').then(function (response) {
                    $rootScope.Base.user = response;
                    return response;
                })
            }

            $routeProvider
                .when('/', {
                    controller: 'Dashboard',
                    templateUrl: '/admin/views/controllers/dashboard/index.html',
                    resolve: {
                        user: [
                            '$rootScope',
                            'User',
                            function ($rootScope, User) {
                                return getCurrentUser($rootScope, User);
                            }
                        ]
                    }
                })
                .when('/login', {
                    controller: 'Login',
                    templateUrl: '/admin/views/controllers/login/index.html',
                    resolve: {
                        token: [
                            'Session',
                            function (Session) {
                                return Session.getToken();
                            }
                        ]
                    }
                })
                .when('/logout', {
                    controller: 'Logout',
                    templateUrl: '/admin/views/controllers/login/index.html'
                })
                .when('/categories/:parent_id', {
                    controller: 'Categories',
                    templateUrl: '/admin/views/controllers/categories/index.html',
                    resolve: {
                        user: [
                            '$rootScope',
                            'User',
                            function ($rootScope, User) {
                                return getCurrentUser($rootScope, User);
                            }
                        ],
                        categories: [
                            '$route',
                            'Categories',
                            function ($route, Categories) {
                                return Categories.getList($route.current.params.parent_id);
                            }
                        ],
                        path: [
                            '$route',
                            'Categories',
                            function ($route, Categories) {
                                var id = $route.current.params.parent_id;
                                if (id && id !== 'null') {
                                    return Categories.getPath(id);
                                } else {
                                    return null;
                                }
                            }
                        ]
                    }
                })
                .when('/users', {
                    controller: 'Users',
                    templateUrl: '/admin/views/controllers/users/index.html',
                    resolve: {
                        user: [
                            '$rootScope',
                            'User',
                            function ($rootScope, User) {
                                return getCurrentUser($rootScope, User);
                            }
                        ],
                        users: [
                            'Users',
                            function (Users) {
                                return Users.getList();
                            }
                        ]
                    }
                })
                .when('/vocabularies', {
                    controller: 'Vocabularies',
                    templateUrl: '/admin/views/controllers/vocabularies/index.html',
                    resolve: {
                        user: [
                            '$rootScope',
                            'User',
                            function ($rootScope, User) {
                                return getCurrentUser($rootScope, User);
                            }
                        ],
                        list: [
                            'Vocabularies',
                            function (Vocabularies) {
                                return Vocabularies.getList();
                            }
                        ]
                    }
                })
                .when('/vocabulary/:vocabularyId/content', {
                    controller: 'VocabularyContent',
                    templateUrl: '/admin/views/controllers/vocabularies/content.html',
                    resolve: {
                        user: [
                            '$rootScope',
                            'User',
                            function ($rootScope, User) {
                                return getCurrentUser($rootScope, User);
                            }
                        ],
                        content: [
                            '$route',
                            'Vocabularies',
                            function ($route, Vocabularies) {
                                return Vocabularies.content.getList($route.current.params.vocabularyId);
                            }
                        ]
                    }
                })
        }]);

    return admin;
});