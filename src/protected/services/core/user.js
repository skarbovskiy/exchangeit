'use strict';
var Promise = require('bluebird');
var User = require('../../modules/models/user');
var helper = require('../../modules/core/helper');
var HttpError = require('../../modules/core/errors').HttpError;
var Service = {
    login: function (request) {
        return User.findOne({
            where: {
                phone: request.body.phone,
                status: 'active'
            },
            raw: true
        }).then(function (data) {
            if (!data || data.password !== helper.hashPassword(request.body.password, data.salt)) {
                throw new HttpError(401, 'no user found');
            }
            return request.session.set({user: data});
        }).then(function () {
            return [200, undefined];
        });
    },

    getCurrent: function (request) {
        return Promise.resolve([200, helper.cleanDataForResponse(request.session.user)]);
    },

    logout: function (request) {
        return request.session.set({user: null}).then(function () {
            return [200, undefined];
        });
    }
};

module.exports = Service;