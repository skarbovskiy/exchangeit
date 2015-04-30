'use strict';
var helper = require('../../modules/user/helper');
var Service = {
    get: function (request, response) {
        response(null, helper.cleanDataForResponse(request.session.user));
    }
};

module.exports = Service;