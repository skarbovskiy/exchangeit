'use strict';
var Promise = require('bluebird');
var lodash = require('lodash');
var User = require('../../../modules/models/user');
var helper = require('../../../modules/core/helper');
var HttpError = require('../../../modules/core/errors').HttpError;
var orm = require('../../../modules/core/bootstrap').get('orm');

var Service = {
    updateInfo: function (request) {
        var id = request.session.user.id;
        var allowedFields = ['firstName', 'lastName', 'email'];
        var updateObject = {};
        lodash.keys(request.body).forEach(function (key) {
            if (allowedFields.indexOf(key) < 0) {
                return;
            }
            updateObject[key] = request.body[key];
        });
        return User.update(updateObject, {where: {id: id}})
            .then(function () {
                return [200, undefined];
            });

    },
    updatePassword: function (request) {
        var id = request.session.user.id;
        var newPassword = request.body.password;
        if (!newPassword) {
            throw new HttpError(400, 'bad data passed');
        }
        return User.findById(id)
            .then(function (user) {
                user.password = helper.hashPassword(newPassword, user.salt);
                return user.save();
            })
            .then(function () {
                return [200, undefined];
            });
    }
};

module.exports = Service;