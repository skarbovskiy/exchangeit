'use strict';
var Promise = require('bluebird');
var sessionHandler = require('../../modules/core/sessionHandler');
var helper = require('../../modules/core/helper');

var Service = {
    createToken: function (request) {
        return sessionHandler.create(request.ip, {})
            .then(function (token) {
                return [201, {token: token}];
            });
    },

    getToken: function (request) {
        var session = request.session;
        session.set = undefined;
        session.user = helper.cleanDataForResponse(session.user);
        return Promise.resolve([200, request.session]);
    }
};

module.exports = Service;