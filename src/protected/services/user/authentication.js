'use strict';

var sessionHandler = require('../../modules/core/sessionHandler');

var Service = {
    get_token: function (request, response) {
        sessionHandler.create(request.ip, {}, function (error, token) {
            response(error, {token: token});

        });
    },
    get_token2: function (request, response) {
        var session = request.session;
        console.log(session);
        request.session.set({testdat2a: null}, function (error) {
            response(error, {test2: true});
        });
    }
};

module.exports = Service;