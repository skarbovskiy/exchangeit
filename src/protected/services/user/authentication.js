'use strict';

var sessionHandler = require('../../modules/core/sessionHandler');
var userModel = require('../../modules/user/index');

var Service = {
    /**
     * session generation service needed for every (even non-authenticated) requests
     * @param request
     * @param response
     */
    get_token: function (request, response) {
        sessionHandler.create(request.ip, {}, function (error, token) {
            response(error, {token: token});

        });
    },
    /**
     * authenticate user via given login and password and store data in session
     * @param request
     * @param response
     */
    login: function (request, response) {
        if (request.session.user && request.session.user.id) {
            var error = new Error('already authenticated');
            error.status = 409;
            return response(error);
        }
        userModel.login(request.body.phone, request.body.password, function (error, user) {
            if (error) {
                return response(error);
            }
            request.session.set({user: user}, function (error) {
                response(error);
            })
        });
    },

    test: function (request, response) {
        response(null, request.session);
    },

    register: function (request, response) {
        if (request.session.user && request.session.user.id) {
            var error = new Error('already authenticated');
            error.status = 409;
            return response(error);
        }
        userModel.register(request.body.phone, request.body.password, function (error) {
            response(error);
        });
    }
};

module.exports = Service;