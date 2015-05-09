define([
    'admin.module'
], function (admin) {
    'use strict';

    admin.controller(
        'Users',
        ['$scope', '$modal', 'toastr', 'User', 'users', function ($scope, $modal, toastr, User, users) {
            $scope.Base.setActiveMenu('users');

            function updateList (promise) {
                promise.then(function () {
                    return User.getList();
                })
                    .then(function (response) {
                        $scope.Users.list = response;
                        $scope.Core.loading = false;
                    }, function (reason) {
                        $scope.Core.loading = false;
                        toastr.error(reason.message.error, 'Произошла ошибка');
                    });
            }

            var Users = {
                list: users,
                edit: function (item) {
                    var modalInstance = $modal.open({
                        templateUrl: '/admin/views/modals/create.html',
                        controller: 'DefaultModal',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return {
                                    title: 'Редактирование пользователя',
                                    fields: {
                                        id: {
                                            type: 'hidden'
                                        },
                                        phone: {
                                            type: 'text',
                                            title: 'Телефон',
                                            required: true
                                        },
                                        status: {
                                            type: 'select',
                                            options: ['not-activated', 'active', 'blocked', 'deleted'],
                                            title: 'Статус',
                                            required: true
                                        },
                                        type: {
                                            type: 'select',
                                            options: ['normal', 'admin'],
                                            title: 'Роль',
                                            required: true
                                        },
                                        first_name: {
                                            type: 'text',
                                            title: 'Имя',
                                            required: false
                                        },
                                        last_name: {
                                            type: 'text',
                                            title: 'Фамилия',
                                            required: false
                                        },
                                        email: {
                                            type: 'text',
                                            title: 'E-mail',
                                            required: false
                                        },
                                        comment: {
                                            type: 'textarea',
                                            title: 'Комментарий',
                                            required: false
                                        }
                                    },
                                    values: item
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (item) {
                        $scope.Core.loading = true;
                        updateList(
                            User.update(
                                item.fields.id.value,
                                item.fields.phone.value,
                                item.fields.status.value,
                                item.fields.type.value,
                                item.fields.first_name.value,
                                item.fields.last_name.value,
                                item.fields.email.value,
                                item.fields.comment.value
                            )
                        );
                    });
                }
            }

            $scope.Users = Users;
        }]
    );
});