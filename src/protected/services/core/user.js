'use strict';
var User = require('../../modules/models/user');
var helper = require('../../modules/core/helper');
var salt = 'wef*(&hfwjekfh*0flm';
var Service = {
    login: function (request) {
        return User.findOne({
            where: {
                phone: request.body.phone,
                password: helper.md5(request.body.password + salt),
                status: 'active'
            },
            raw: true
        }).then(function (data) {
            return request.session.set({user: data});
        }).then(function () {
            return [200, undefined];
        });
    },
    logout: function (request) {

    }
};

module.exports = Service;