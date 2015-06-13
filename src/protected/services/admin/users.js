'use strict';
var User = require('../../modules/models/user');
var Service = {
    getList: function (request) {
        return User.findAll({
            raw: true
        }).then(function (data) {
            return [200, data];
        });
    },

    update: function (request) {
        var id = request.params.id;
        return User.update(request.body, {where: {id: id}})
            .then(function () {
                return [200, undefined];
            });
    }
};

module.exports = Service;