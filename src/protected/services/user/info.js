'use strict';
var helper = require('../../modules/user/helper');
var Service = {
    get: function (request, response) {
        if (!request.session.user || !request.session.user.id) {
            var error = new Error('no user authenticated');
            error.status = 401;
            return response(error);
        }
        response(null, helper.cleanDataForResponse(request.session.user));
    }
};

module.exports = Service;