'use strict';

var sessionHandler = require('../../modules/core/sessionHandler');
var userModel = require('../../modules/user/index');
var helper = require('../../modules/user/helper');

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

    check_token: function (request, response) {
        var session = request.session;
        session.set = undefined;
        session.user = helper.cleanDataForResponse(session.user);
        response(null, request.session);
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

    logout: function (request, response) {
        if (!request.session.user || !request.session.user.id) {
            var error = new Error('no user authenticated');
            error.status = 409;
            return response(error);
        }
        request.session.set({user: null}, function (error) {
            response(error);
        });
    },

    register: function (request, response) {
        if (request.session.user && request.session.user.id) {
            var error = new Error('already authenticated');
            error.status = 409;
            return response(error);
        }
        userModel.register(request.body.phone, request.body.password, function (error, user) {
            if (error) {
                return response(error);
            }
            request.session.set({user: user}, function (error) {
                response(error);
            });
        });
    }
};

module.exports = Service;